# Decode — Backend-архитектура: RAG, pgvector, FastAPI, Supabase, хранение финансовых документов

**Трек:** tech-rag-backend · **Дата ресёрча:** 2026-06-10 · **Рынок:** UK · **Контекст:** соло-PM-разработчик, iOS-клиент, core loop "Scan → Understand → Decide → Watch"

---

## TL;DR

Для wedge-сценария Decode (один короткий финансовый документ → summary + key terms + traps + Q&A) **RAG не нужен вообще**: контекст-окна 2026 года (1M токенов у Claude Opus 4.x / Sonnet 4.6) вмещают любой кредитный договор целиком, а "PDF support" в Claude API обрабатывает документ как text+vision без OCR-пайплайна. RAG (pgvector) становится нужен ровно в двух местах: (1) cross-vault Q&A ("сколько я всего плачу за подписки?") и (2) база знаний по UK consumer rights (CCA 1974, Consumer Rights Act 2015, FCA CONC). Для MVP рекомендуемый стек: **Supabase (Auth + Storage + Postgres/pgvector + RLS, регион eu-west-2 London) + FastAPI на отдельном хосте (SSE-стриминг + фоновая обработка) + Claude API (Haiku/Sonnet) + детерминированный true-cost движок на Python**. Очередь (ARQ + Redis) — не для MVP; для задачи 10–30 сек достаточно async-задачи с job-статусом, стримящей этапы пайплайна по SSE.

---

## 1. Когда RAG НЕ нужен: контекст-окна 2026 и "single short doc"

### 1.1 Что вмещают модели (состояние на середину 2026)

По актуальному каталогу моделей Anthropic (кэш скилла claude-api от 2026-05-26; проверяется живьём через `GET /v1/models`):

| Модель | Контекст | Input $/1M | Output $/1M |
|---|---|---|---|
| Claude Opus 4.8 | **1M токенов** | $5.00 | $25.00 |
| Claude Sonnet 4.6 | **1M токенов** | $3.00 | $15.00 |
| Claude Haiku 4.5 | 200K токенов | $1.00 | $5.00 |

Источник: каталог моделей в официальном скилле Anthropic claude-api (cached 2026-05-26); живые данные — https://platform.claude.com/docs/en/about-claude/models/overview.md

**Вывод №1:** типичный документ Decode — BNPL-оферта (1–3 страницы), кредитное соглашение (5–15 страниц), письмо о продлении страховки (2–4 страницы) — это **5K–50K токенов**. Даже 100-страничный договор ипотеки (~200–300K токенов с учётом vision-токенов) влезает в 1M-окно Sonnet/Opus. Никакого retrieval для сценария "понять ЭТОТ документ" не требуется — документ кладётся в контекст целиком.

### 1.2 PDF support в Claude API — нативный мультимодальный парсинг

Официальная документация (https://platform.claude.com/docs/en/build-with-claude/pdf-support.md, fetched 2026-06-10):

- Лимиты: **32 MB на запрос, 600 страниц** (100 страниц для моделей с 200K-окном, т.е. Haiku).
- Каждая страница конвертируется в изображение + извлекается текст; модель видит и таблицы, и графики, и верстку — критично для финансовых документов с табличными fee-структурами.
- Стоимость: **~1,500–3,000 текстовых токенов на страницу** + image-токены за каждую страницу; отдельной платы за PDF нет.
- Поддерживаются три способа передачи: URL, base64, `file_id` через Files API (для повторных вопросов к одному документу — загрузить один раз, спрашивать много раз).
- **Фича eligible для Zero Data Retention (ZDR)** — при ZDR-соглашении с Anthropic данные не хранятся после ответа API. Это важный аргумент в privacy-story Decode.
- Фото документа (не PDF) — обычный vision-вход (base64 image), та же механика.

**Экономика одного скана** (расчёт по официальным ценам): 5-страничная кредитная оферта ≈ 5 × (~2,000 текстовых + ~1,500 image-токенов) ≈ 17.5K input-токенов. На Haiku 4.5 (~$1/MTok input) — **~$0.02 за документ**; на Sonnet 4.6 — ~$0.06. При freemium £3–8/мес юнит-экономика сходится даже на Sonnet: 30 сканов/мес ≈ $1.8 COGS. Q&A по уже отсканированному документу с prompt caching (cache read ≈ 0.1× цены input) — доли цента за вопрос.

### 1.3 Консенсус 2026 по "RAG vs long context"

Дискуссия "RAG is dead" в 2026 устаканилась в виде правила: **малый корпус (<100K токенов, <100 документов) + разговорные запросы → long context; большой/динамичный корпус, cross-document синтез, traceability → RAG**:

- "Если корпус маленький (<100K токенов), стабильный, а паттерн запросов разговорный — long context реально выигрывает" — https://markaicode.com/vs/rag-vs-long-context/
- "Naive RAG is dead, sophisticated RAG is thriving; знать, когда что применять — и есть скилл" — https://byteiota.com/rag-vs-long-context-2026-retrieval-debate/
- RAG сохраняет преимущество там, где нужны: точность на больших корпусах, real-time обновления, **audit trail retrieval-логов для regulated-индустрий** — https://www.dataiku.com/stories/blog/is-rag-obsolete, https://www.sitepoint.com/long-context-vs-rag-1m-token-windows/

### 1.4 Решение для Decode: трёхуровневая схема

| Сценарий | Механика | RAG? |
|---|---|---|
| **Scan → Understand → Decide** (один документ) | Документ целиком в контекст (PDF/vision) + structured outputs (`output_config.format`, JSON schema) для key terms → детерминированный true-cost движок | ❌ Нет |
| **Ask-anything по одному документу** | Документ в контексте + **citations API** (`citations: {enabled: true}` на document-блоке) — нативный source highlighting с привязкой к фрагментам документа; prompt caching на документ | ❌ Нет |
| **Cross-vault Q&A** ("все мои commitments", "где у меня auto-renewal?") | Гибрид: структурированные SQL-запросы по таблице `extracted_terms` (даты, суммы — детерминированно) + pgvector-поиск по чанкам всех документов юзера | ✅ Да |
| **KB consumer rights UK** (CCA 1974 s.66A right of withdrawal, CRA 2015, FCA CONC, Which?/MoneyHelper-контент) | Классический RAG: hybrid search по курируемой базе → контекст для ответа с source-ссылками | ✅ Да |

Важный нюанс: для cross-vault кейса значительная часть вопросов закрывается **не вектором, а SQL** — extraction-пайплайн уже положил структурированные поля (APR, дата продления, ежемесячный платёж) в таблицы. Вектор нужен для свободных вопросов по тексту "хвоста" документов.

---

## 2. pgvector: chunking, hybrid search, метрики качества

### 2.1 Chunking для финансовых/юридических документов

Ключевые выводы из исследований 2025–2026:

1. **Structure-aware chunking бьёт фиксированный**: юридические/финансовые документы имеют доменную структуру (клаузулы, секции "Fees", "Termination", "Your right to cancel") — резать надо по ней, а не по 512 токенов. Адаптивный chunking по логическим границам тем показал 87% accuracy против 13% у fixed-size в клиническом кейсе — https://community.databricks.com/t5/technical-blog/the-ultimate-guide-to-chunking-strategies-for-rag-applications/ba-p/113089, https://www.firecrawl.dev/blog/best-chunking-strategies-rag
2. **Семантический chunking — переоценён**: NAACL 2025 Findings показал, что вычислительная цена semantic chunking не оправдана — фиксированные ~200-словные чанки догоняют или обгоняют его по retrieval и answer generation — https://www.firecrawl.dev/blog/best-chunking-strategies-rag (со ссылкой на paper). Для arXiv-обзора по финдокументам: https://arxiv.org/pdf/2404.07221
3. **Contextual Retrieval (Anthropic)** — самый сильный документированный приём: к каждому чанку LLM приписывает 50–100 токенов контекста ("Этот фрагмент — из раздела о штрафах за досрочное погашение договора X от лендера Y"), затем чанк эмбеддится и индексируется в BM25 уже с контекстом. Результаты Anthropic: **contextual embeddings −35% retrieval failure rate (top-20), + contextual BM25 −49%, + rerank −67% (5.7% → 1.9%)** — https://www.anthropic.com/news/contextual-retrieval, практический гайд: https://platform.claude.com/cookbook/capabilities-contextual-embeddings-guide. Контекст-генерация дешёвая: Haiku + prompt caching (документ кэшируется, меняется только чанк).

**Рекомендация для Decode:** чанк = клаузула/секция документа (LLM и так делает structured extraction — пусть заодно возвращает разбиение по секциям с заголовками), ~200–400 слов, + contextual prefix по Anthropic-рецепту. Метаданные чанка: `document_id`, `doc_type` (credit/BNPL/insurance/utility/subscription), `section_title`, `page`. Для KB consumer rights — chunking по статьям/параграфам законов и гайдов.

### 2.2 Hybrid search в Postgres

Финансовые запросы полны точных терминов ("APR", "Section 75", "balloon payment", суммы, даты) — чистый вектор их промахивает, нужен hybrid:

- **Базовый вариант (достаточен для MVP):** pgvector (semantic) + встроенный Postgres FTS `tsvector`/`ts_rank` (keyword), слитые через **Reciprocal Rank Fusion (RRF)**: `score = Σ 1/(k + rank_i)`, k≈60. RRF не требует нормализации скоров и реализуется одним SQL с FULL JOIN — https://www.paradedb.com/blog/hybrid-search-in-postgresql-the-missing-manual, пример на ~100 строк: https://dev.to/gabrielanhaia/hybrid-search-in-100-lines-bm25-pgvector-with-rrf-58cn. У Supabase есть готовый гайд по hybrid search (semantic + keyword) — https://supabase.com/docs/guides/ai
- **Если ts_rank не хватит:** настоящий BM25 в Postgres теперь есть нативно — `pg_textsearch` (Tiger Data): https://www.tigerdata.com/blog/introducing-pg_textsearch-true-bm25-ranking-hybrid-retrieval-postgres, либо ParadeDB `pg_search`, либо VectorChord — https://docs.vectorchord.ai/vectorchord/use-case/hybrid-search.html. На Supabase из этого списка доступность ограничена — проверять список расширений; для MVP ts_rank + RRF достаточно.
- **Индексы:** HNSW (`vector_cosine_ops`), а с pgvector ≥0.7.0 — тип **halfvec** (float16): −50% памяти/диска при том же качестве, HNSW-индексация до 4,096 измерений (у `vector` лимит 2,000) — https://github.com/pgvector/pgvector, https://aws.amazon.com/blogs/database/load-vector-embeddings-up-to-67x-faster-with-pgvector-and-amazon-aurora/, https://www.crunchydata.com/blog/hnsw-indexes-with-postgres-and-pgvector. На объёмах Decode (тысячи чанков на юзера, сотни тысяч суммарно) pgvector — с большим запасом; никакой выделенной vector DB не нужно.
- **Эмбеддинги:** дефолт — OpenAI `text-embedding-3-small` (1,536 dim, **$0.02/1M токенов**) — "good enough для 90% приложений"; для legal/financial-домена опционально Voyage (`voyage-4-lite` $0.02/MTok, premium `voyage-3-large` $0.18/MTok лидирует на benchmarks по legal) — https://pecollective.com/tools/text-embedding-models-compared/, https://www.buildmvpfast.com/blog/best-embedding-model-comparison-voyage-openai-cohere-2026. С `text-embedding-3-small` можно резать размерность (Matryoshka) до 512–768 — для масштаба Decode не критично.
- **Мультитенантность:** обязательный `WHERE user_id = ...` (+ RLS-политика) — pgvector-запрос фильтруется до ANN-поиска; на per-user объёмах это и быстрее, и безопаснее. KB consumer rights — общая (shared) таблица без user_id.

### 2.3 Метрики retrieval quality

Минимальный eval-каркас (запускается скриптом в CI, не нужен сервис):

| Слой | Метрики | Как |
|---|---|---|
| Retrieval | **recall@k** (главная: попал ли нужный чанк в top-k), precision@k, **MRR**, nDCG@k | Golden set 50–150 пар "вопрос → документ/чанк" из реальных UK-доков (кредитные соглашения, BNPL T&C, страховые renewal-письма). Цель MVP: recall@5 ≥ 0.9 |
| Generation | **faithfulness** (доля утверждений ответа, подтверждаемых retrieved-контекстом), answer relevance, citation coverage | RAGAS / LLM-as-judge; "RAG Triad": context relevance + faithfulness + answer relevance |

Источники: https://langcopilot.com/posts/2025-09-17-rag-evaluation-101-from-recall-k-to-answer-faithfulness, https://www.comet.com/site/blog/rag-evaluation/, https://towardsdatascience.com/how-to-evaluate-retrieval-quality-in-rag-pipelines-part-3-dcgk-and-ndcgk/

Для Decode faithfulness — продуктово-критичная метрика (финансовые советы!): ответ Q&A должен (а) ссылаться на конкретный фрагмент (source highlighting), (б) показывать confidence, (в) при низком confidence — честный отказ "в документе этого нет". Это же — основа trap detector evals.

---

## 3. FastAPI: SSE-стриминг на мобильный клиент и фоновая обработка

### 3.1 SSE — правильный транспорт для Decode

Почему SSE, а не WebSocket: однонаправленный поток server→client, обычный HTTP (дружит с nginx/Cloudflare), auto-reconnect с `Last-Event-ID` в спеке. Для LLM-стриминга это де-факто стандарт (сам Claude API стримит SSE).

Реализация на FastAPI:
- `StreamingResponse(generator, media_type="text/event-stream")` либо `sse-starlette` (`EventSourceResponse`) — https://fastapi.tiangolo.com/tutorial/server-sent-events/, https://hassaanbinaslam.github.io/posts/2025-01-19-streaming-responses-fastapi.html
- Формат: `event: <type>\ndata: <json>\n\n`. Decode-события: `stage` (uploaded→parsing→extracting→traps→done), `summary_delta`, `term`, `trap`, `qa_delta`, `done`, `error`.
- **Heartbeat каждые ~15 сек** (комментарий `: ping`) — иначе прокси режут "тихие" соединения; в nginx перед uvicorn — `proxy_buffering off` / заголовок `X-Accel-Buffering: no`, `Cache-Control: no-cache` — https://medium.com/@2nick2patel2/fastapi-server-sent-events-for-llm-streaming-smooth-tokens-low-latency-1b211c94cff5
- **Disconnect detection:** `await request.is_disconnected()` в цикле генератора (StreamingResponse сам не сообщает генератору о разрыве) — чтобы не жечь токены Claude на отвалившегося клиента.
- Серверная сторона: `async with client.messages.stream(...)` (Anthropic SDK) → переупаковка `text_stream` в свои SSE-события.

iOS-клиент: нативного EventSource в URLSession нет, но есть зрелые библиотеки — **mattt/EventSource** (spec-compliant, AsyncSequence, auto-reconnect: https://github.com/mattt/EventSource), **LaunchDarkly swift-eventsource** (https://github.com/launchdarkly/swift-eventsource), либо вручную `URLSession.bytes(for:)` + парсинг строк. Нюансы мобильного клиента: (а) Q&A-запрос — это POST с телом, т.е. "data-only SSE поверх POST" (библиотеки это умеют, как у OpenAI-клиентов — https://github.com/Recouse/EventSource); (б) при уходе приложения в фон соединение умрёт — нужен reconnect-on-foreground + идемпотентный `GET /jobs/{id}` для дотягивания состояния.

### 3.2 Фоновая обработка 10–30 сек: очередь или async?

Сравнение вариантов (https://davidmuraya.com/blog/fastapi-background-tasks-arq-vs-built-in/, https://medium.com/@rameshkannanyt0078/fastapi-background-tasks-celery-vs-arq-vs-rq-2026-benchmarks-decision-guide-f99598aa21eb, https://dangquan1402.github.io/llm-engineering-notes/2026/04/02/lightweight-task-queues-for-llm-apps.html):

| Вариант | Плюсы | Минусы | Вердикт для Decode |
|---|---|---|---|
| Держать HTTP-коннект и стримить весь пайплайн по SSE | Лучший UX (этапы видны живьём), нет инфраструктуры | Разрыв сети = потеря прогресса, если нет job-состояния | ✅ **Основной путь MVP** в связке с job-записью |
| `BackgroundTasks` (встроенный) | Ноль зависимостей | In-process: нет retries, статуса, переживания рестарта; задача умирает с деплоем | Ок только как fire-and-forget (отправка push) |
| **ARQ + Redis** | Async-native, лёгкий, retries, таймауты, сотни конкурентных I/O-джоб на одном воркере | +Redis, +процесс воркера | ✅ Этап 2 (когда появятся ночные Renewal Radar-джобы и ретраи) |
| Celery | Battle-tested, всё умеет | Тяжёлый, sync-first, для async-LLM-нагрузок избыточен | ❌ Не для соло-разработчика |

**Рекомендуемый паттерн MVP (LLM-задача 10–30 сек — это I/O-bound, не CPU):**
1. `POST /documents` → создаётся запись `jobs(id, status, stage, result_json)` → запускается `asyncio.create_task` (или BackgroundTasks) → мгновенный ответ `202 {job_id}`.
2. Клиент открывает `GET /documents/{job_id}/events` (SSE) — сервер стримит stage-события и дельты прямо из пайплайна; каждое смена этапа также пишется в `jobs`.
3. Разрыв соединения → клиент переподключается / делает `GET /jobs/{id}` и продолжает. Push-уведомление "Документ разобран" — на случай ухода в фон.
4. Периодика Renewal Radar (проверка дат, push) — на MVP обычный cron/APScheduler; при росте — ARQ scheduled jobs.

Это снимает главный риск "нужна ли очередь": **для 10–30-сек I/O-задачи очередь не нужна, нужна персистентная job-модель + SSE**; очередь добавляется позже без смены контракта API.

---

## 4. Supabase vs self-hosted Postgres — для соло-PM-разработчика

### 4.1 Что даёт Supabase из коробки

- **Auth** (email, Apple Sign-In — обязателен для iOS), **Storage** (файлы документов с RLS-политиками доступа), **Postgres + pgvector** (semantic/keyword/hybrid search — официальные гайды: https://supabase.com/docs/guides/ai), **RLS** как единый слой авторизации "юзер видит только свои документы" на уровне БД.
- **Цены** (https://supabase.com/pricing, обзоры: https://uibakery.io/blog/supabase-pricing): Free — $0: 500 MB БД, 1 GB file storage, 50K MAU, **пауза проекта после 1 недели неактивности**, 2 проекта. **Pro — $25/мес**: 8 GB БД, 100 GB storage, 100K MAU, daily backups, spend cap по умолчанию. Team ($599) — SOC 2-репорт на руки, 14-дневные бэкапы.
- **Безопасность/комплаенс:** AES-256 at rest (БД, индексы, WAL, бэкапы), TLS in transit, **SOC 2 Type 2 + ISO 27001** — https://supabase.com/security, https://supabase.com/docs/guides/security/soc-2-compliance
- **UK GDPR:** регион **AWS eu-west-2 (London)** доступен при создании проекта — https://supabase.com/docs/guides/platform/regions; self-service **DPA со Standard Contractual Clauses + UK addendum, одобренным ICO** — https://supabase.com/legal/dpa

### 4.2 Trade-offs (https://solodevstack.com/blog/postgresql-vs-supabase-solo-developers, https://leanware.co/insights/postgresql-vs-supabase-deployment-guide-startups)

- Supabase = обычный Postgres (любой клиент, raw SQL, миграция дампом), lock-in минимален по данным, но реален по Auth/Storage/Edge Functions API.
- Self-hosted дешевле ($5–10 VPS) и даёт полный контроль (версии, расширения, бэкап-стратегия), но соло-разработчик сам строит auth, storage, политику доступа, бэкапы, обновления — недели работы и площадь атаки. Self-hosted *Supabase* (docker-compose всего стека) общепризнанно болезненный в поддержке — https://github.com/orgs/supabase/discussions/39820
- RLS-логика в БД мощная, но дебажится тяжелее middleware — держать политики простыми (`auth.uid() = user_id`).

### 4.3 Рекомендация

Для Decode-MVP: **Supabase (managed, eu-west-2) как data-плоскость + лёгкий FastAPI-сервис как AI-плоскость**. FastAPI верифицирует Supabase JWT (JWKS), ходит в Postgres через connection pooler, читает файлы из Storage по signed URL. AI-сервис деплоится туда, где уже отлажен пайплайн соло-разработчика (Docker-контейнер; у владельца проекта есть готовый Hetzner+Coolify-паттерн — подходит 1:1, см. Chroma-pattern: nginx + uvicorn в одном контейнере). Альтернатива "всё на Edge Functions" отвергается: 10–30-сек LLM-пайплайн со стримингом удобнее и дешевле жить в долгоживущем Python-процессе с Anthropic SDK, prompt caching и job-моделью.

---

## 5. Хранение финансовых документов: encryption, UK GDPR, retention

### 5.1 Шифрование

- ICO: UK GDPR **не требует шифрования буквально, но называет его примером "appropriate technical measure"** (Art. 5(1)(f), Art. 32) и ясно даёт понять, что шифрование at rest для хранимых персональных данных — ожидаемая практика; за утечки незашифрованных данных применялись regulatory actions — https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/security/encryption/encryption-and-data-protection/, https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/security/encryption/encryption-and-data-storage/
- Практика Decode: AES-256 at rest на стороне Supabase (включено всегда) + TLS 1.2+; на устройстве — iOS Data Protection (`NSFileProtectionComplete`) для локального кэша; доступ к файлам Storage только по короткоживущим signed URL за RLS.
- Опционально (дифференциатор приватности, этап 2): client-side / application-level шифрование самих файлов (ключ в Keychain/Secure Enclave) — но это ломает server-side AI-пайплайн, поэтому реалистичный вариант — шифровать только "сырые" файлы после извлечения данных, либо вовсе их не хранить (см. 5.3).

### 5.2 UK GDPR — ключевые аспекты для Decode

- **Финансовые данные ≠ special category** (Art. 9 — это здоровье, биометрия и т.п.), но это high-risk данные; систематическая обработка финансовых документов + AI-профилирование платёжных обязательств — повод сделать **DPIA** перед запуском (ICO ожидает DPIA для innovative tech + financial data).
- **Lawful basis:** contract (Art. 6(1)(b)) для core-функции; consent для опциональных вещей (обучение/аналитика). Decode даёт информацию, а не автоматизированные решения с правовым эффектом → Art. 22 не триггерится, но дисклеймер "not financial advice" нужен (это и FCA-периметр).
- **Right to erasure (Art. 17):** удаление аккаунта = удаление документов, эмбеддингов, извлечённых полей **и учёт бэкапов** — ICO явно требует продумывать erasure применительно к бэкапам и retention - https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/security/encryption/encryption-and-data-storage/
- **Storage limitation (Principle (e)):** UK GDPR **не задаёт фиксированных сроков** — "хранить не дольше, чем нужно, и уметь обосновать срок"; нужна задокументированная retention policy — https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-protection-principles/a-guide-to-the-data-protection-principles/storage-limitation/
- **Процессоры:** Supabase (DPA + UK addendum к SCC — https://supabase.com/legal/dpa), Anthropic (DPA; PDF-фича eligible для Zero Data Retention — https://platform.claude.com/docs/en/build-with-claude/pdf-support.md). API-данные Anthropic по умолчанию не используются для обучения; для финансового продукта стоит зафиксировать ZDR.
- **Data residency:** проект Supabase в eu-west-2 (London) закрывает вопрос локации данных; вызовы Claude API — это transfer в US по SCC/IDTA через DPA Anthropic (отразить в privacy policy).

### 5.3 Retention-дизайн (продуктовое решение, не только комплаенс)

Vault — ценность продукта, поэтому "хранить вечно пока юзер не удалил" — законно при обосновании "пользователь хранит свои документы как сервис-функцию". Но data minimization даёт более сильную схему:

1. **Сырой файл (фото/PDF):** хранить опционально. Дефолт MVP: хранить (re-analysis, source highlighting по странице); настройка "Don't keep originals" — privacy-фича: после извлечения terms файл удаляется, остаются только структурированные данные + чанки текста.
2. **Извлечённые terms + чанки/эмбеддинги:** живут, пока жив документ в Vault (это и есть Renewal Radar).
3. **Auto-expiry:** документы с истёкшим сроком действия (закрытый кредит, истёкшая страховка) — напоминание "архивировать/удалить?" через N месяцев; неактивный аккаунт — email-уведомление → удаление по политике (например, 24 мес неактивности).
4. **Удаление аккаунта:** каскадное удаление в Postgres (FK ON DELETE CASCADE) + Storage + указание срока вычистки из бэкапов (у Supabase бэкапы Pro — 7 дней → реалистично заявить "из бэкапов — в течение 30 дней").

---

## 6. Reference-архитектура Decode MVP

```
┌─────────────────────────── iOS App (SwiftUI) ───────────────────────────┐
│  Camera/Share-ext → upload   ·   SSE-клиент (mattt/EventSource)         │
│  Supabase Swift SDK: Auth (Sign in with Apple) + Storage upload         │
└───────────────┬──────────────────────────────┬──────────────────────────┘
                │ JWT                          │ HTTPS + JWT
                ▼                              ▼
┌─────────── Supabase (eu-west-2, London) ─────────┐   ┌── FastAPI AI-service (Docker) ──┐
│ Auth (JWT/JWKS)                                  │   │ POST /documents  → 202 job_id    │
│ Storage: bucket docs/ (RLS, signed URLs,         │◄──│ GET  /documents/{id}/events  SSE │
│          AES-256 at rest)                        │   │ POST /qa (doc | vault | rights)  │
│ Postgres 15 + pgvector (halfvec, HNSW):          │   │ GET  /jobs/{id}                  │
│   users, documents, jobs,                        │   │----------------------------------│
│   extracted_terms(apr, fees, renewal_date...),   │   │ Pipeline (async, 10–30s):        │
│   doc_chunks(embedding, tsv, section, page),     │   │  1. fetch file (signed URL)      │
│   kb_chunks (consumer-rights KB, shared),        │   │  2. Claude: PDF/vision in-context│
│   reminders                                      │   │     → structured outputs (JSON)  │
│ RLS: auth.uid() = user_id  на всех user-таблицах │   │  3. true-cost engine (Python,    │
└──────────────────────────────────────────────────┘   │     детерминированный)           │
                                                       │  4. trap detector (rules + LLM)  │
   ┌─ Anthropic Claude API (ZDR) ─┐                    │  5. chunk + contextual prefix    │
   │ Haiku 4.5  — extraction,     │◄───────────────────│     → embeddings → pgvector      │
   │   contextual prefixes        │                    │  6. stage-события → SSE          │
   │ Sonnet 4.6 — summary, Q&A,   │                    │ Cron/APScheduler: Renewal Radar  │
   │   traps; prompt caching      │                    │   → APNs push                    │
   └──────────────────────────────┘                    └──────────────────────────────────┘
   ┌─ OpenAI embeddings API ─┐                          ┌─ APNs ─┐   ┌─ Sentry ─┐
   │ text-embedding-3-small  │                          └────────┘   └──────────┘
   └─────────────────────────┘
```

**Список технологий MVP:**

| Слой | Выбор | Зачем |
|---|---|---|
| Клиент | SwiftUI + Supabase Swift SDK + mattt/EventSource | Auth/Storage из коробки, SSE-стриминг |
| BaaS | Supabase Pro $25/мес, регион eu-west-2 | Auth + Storage + Postgres/pgvector + RLS + DPA/UK addendum |
| AI-сервис | Python 3.12 + FastAPI + uvicorn, Docker (nginx+uvicorn single-container) | SSE, async-пайплайн, Anthropic SDK |
| LLM | Claude Haiku 4.5 (extraction/prefixes) + Sonnet 4.6 (summary/Q&A/traps), prompt caching, structured outputs, citations | ~$0.02–0.06/скан; source highlighting нативно |
| Embeddings | OpenAI text-embedding-3-small ($0.02/MTok), halfvec(1536) | Дёшево, стандартно |
| Retrieval | pgvector HNSW + tsvector + RRF; contextual retrieval-префиксы | Hybrid для финансовой терминологии |
| Фон. обработка | async task + jobs-таблица + SSE; cron для Renewal Radar; (этап 2: ARQ+Redis) | 10–30 c — без очереди |
| True cost | Чистый Python-модуль (без LLM): APR/total cost/late fees формулы + unit-тесты | Детерминизм = доверие |
| Evals | Golden set + recall@5 / faithfulness (RAGAS-style) в CI | Качество retrieval/ответов |
| Наблюдаемость | Sentry + structured logs (без содержимого документов в логах!) | GDPR-безопасный мониторинг |

---

## Key takeaways for Decode

1. **Не строить RAG для wedge-кейса.** Один документ = весь документ в контекст Claude (1M-окно, PDF support: 32MB/600 стр., text+vision). Это упрощает MVP на порядок: пайплайн "файл → structured JSON → true-cost → traps" без chunking/индексации вообще. RAG включается только для cross-vault Q&A и KB consumer rights — и это фичи этапа 2, их можно вырезать из первого релиза без потери wedge-ценности.
2. **Юнит-экономика сходится:** ~\$0.02 (Haiku) – \$0.06 (Sonnet) за полный разбор 5-страничного документа; Q&A по закэшированному документу — доли цента (prompt caching ≈ 0.1× input). При £3–8/мес подписке можно позволить Sonnet на summary/traps и Haiku на extraction.
3. **Source highlighting и confidence — нативные фичи Claude API** (citations на document-блоках + structured outputs), их не надо изобретать. Это ровно UI-механика "Ask anything → ответ с подсветкой фрагмента" из концепта; в wireframes можно закладывать page+quote-якоря.
4. **Для будущего RAG: contextual retrieval + hybrid (вектор + keyword + RRF) в обычном Postgres.** Никакой выделенной vector DB; pgvector(halfvec)+HNSW+tsvector на Supabase достаточно на годы вперёд. Финансовые term-запросы требуют keyword-составляющей — чистый вектор промахивает "APR"/"Section 75".
5. **Очередь не нужна в MVP.** 10–30-сек пайплайн — async-задача + персистентная job-запись + SSE со stage-событиями (`parsing → extracting → traps → done`) — это одновременно и архитектура, и UX-сценарий процесс-экрана сканирования (этапы прогресса для wireframe). ARQ+Redis — когда появятся ретраи и ночные джобы Renewal Radar.
6. **Supabase (Pro, eu-west-2 London) — правильный выбор для соло-PM:** Auth+Storage+Postgres+RLS за \$25/мес, AES-256 at rest, SOC 2 Type 2/ISO 27001, self-service DPA с UK addendum (ICO-approved). Free-tier годится только для прототипа (пауза через неделю неактивности). AI-сервис — отдельный FastAPI-контейнер (деплой по уже отлаженному паттерну Hetzner+Coolify).
7. **Privacy = продуктовый дифференциатор, и он дешёвый:** "no bank connection" дополняется "ZDR с Anthropic (данные не хранятся после ответа), данные в UK-регионе, опция Don't keep originals, удаление аккаунта = полное удаление". Это пункты для onboarding/paywall-экранов, а не только для privacy policy. Обязательная домашка перед запуском: DPIA + задокументированная retention policy (ICO не задаёт сроков — задать свои и обосновать).
8. **Trap detector и true-cost держать детерминированными** (правила + формулы + тесты), LLM — только как extraction-слой и "объяснитель". Это и качество (нет галлюцинаций в цифрах), и регуляторная защита (FCA-периметр: information, not advice), и материал для evals.

---

## Источники (основные)

- Anthropic PDF support: https://platform.claude.com/docs/en/build-with-claude/pdf-support.md
- Anthropic models/pricing (через официальный skill, cached 2026-05-26; live: https://platform.claude.com/docs/en/about-claude/models/overview.md)
- Anthropic Contextual Retrieval: https://www.anthropic.com/news/contextual-retrieval · cookbook: https://platform.claude.com/cookbook/capabilities-contextual-embeddings-guide
- RAG vs long context 2026: https://markaicode.com/vs/rag-vs-long-context/ · https://byteiota.com/rag-vs-long-context-2026-retrieval-debate/ · https://www.dataiku.com/stories/blog/is-rag-obsolete · https://www.sitepoint.com/long-context-vs-rag-1m-token-windows/
- Chunking: https://www.firecrawl.dev/blog/best-chunking-strategies-rag · https://community.databricks.com/t5/technical-blog/the-ultimate-guide-to-chunking-strategies-for-rag-applications/ba-p/113089 · https://arxiv.org/pdf/2404.07221
- Hybrid search в Postgres: https://www.paradedb.com/blog/hybrid-search-in-postgresql-the-missing-manual · https://dev.to/gabrielanhaia/hybrid-search-in-100-lines-bm25-pgvector-with-rrf-58cn · https://www.tigerdata.com/blog/introducing-pg_textsearch-true-bm25-ranking-hybrid-retrieval-postgres
- pgvector/halfvec/HNSW: https://github.com/pgvector/pgvector · https://aws.amazon.com/blogs/database/load-vector-embeddings-up-to-67x-faster-with-pgvector-and-amazon-aurora/ · https://www.crunchydata.com/blog/hnsw-indexes-with-postgres-and-pgvector
- Embeddings pricing: https://pecollective.com/tools/text-embedding-models-compared/ · https://www.buildmvpfast.com/blog/best-embedding-model-comparison-voyage-openai-cohere-2026
- RAG evals: https://langcopilot.com/posts/2025-09-17-rag-evaluation-101-from-recall-k-to-answer-faithfulness · https://www.comet.com/site/blog/rag-evaluation/
- FastAPI SSE: https://fastapi.tiangolo.com/tutorial/server-sent-events/ · https://medium.com/@2nick2patel2/fastapi-server-sent-events-for-llm-streaming-smooth-tokens-low-latency-1b211c94cff5 · https://hassaanbinaslam.github.io/posts/2025-01-19-streaming-responses-fastapi.html
- Background tasks: https://davidmuraya.com/blog/fastapi-background-tasks-arq-vs-built-in/ · https://medium.com/@rameshkannanyt0078/fastapi-background-tasks-celery-vs-arq-vs-rq-2026-benchmarks-decision-guide-f99598aa21eb · https://dangquan1402.github.io/llm-engineering-notes/2026/04/02/lightweight-task-queues-for-llm-apps.html
- iOS SSE: https://github.com/mattt/EventSource · https://github.com/launchdarkly/swift-eventsource · https://github.com/Recouse/EventSource
- Supabase: https://supabase.com/pricing · https://supabase.com/security · https://supabase.com/docs/guides/security/soc-2-compliance · https://supabase.com/docs/guides/platform/regions · https://supabase.com/legal/dpa · https://supabase.com/docs/guides/ai · https://solodevstack.com/blog/postgresql-vs-supabase-solo-developers
- ICO (UK GDPR): https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/security/encryption/encryption-and-data-protection/ · https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/security/encryption/encryption-and-data-storage/ · https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-protection-principles/a-guide-to-the-data-protection-principles/storage-limitation/
