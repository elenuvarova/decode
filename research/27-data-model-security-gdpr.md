# Decode — Data-model, безопасность и UK GDPR (под билд)

**Трек:** data-model · **Дата ресёрча:** 2026-06-18 · **Рынок:** UK · **Сегмент:** S1 BNPL 18–25 · **Стек:** Expo/RN + FastAPI + Supabase (Postgres/Storage/Auth) eu-west-2 (London) + Claude API · **Контекст:** соло-PM-разработчик, запуск к 15.07.2026 (BNPL Regulation Day).

> **Предшественники:** [08 — backend/RAG/хранение](08-tech-rag-backend.md) (база по encryption/retention/RLS, на ней надстраиваю), [09b — FCA boundary verified](09b-fca-boundary-verified.md) (advice vs information — влияет на lawful basis и DPIA), [23 — AI-eval extraction](23-ai-eval-extraction.md) (формат extraction JSON, citations, `not_found`/`confidence`).
>
> **Юридическая оговорка:** это product/engineering-анализ по первоисточникам, не юридическое заключение. DPIA, privacy policy и App Store-декларации перед запуском должен подписать UK-практик по data protection (как и compliance-review по FCA из 09b).

---

## TL;DR

1. **Финансовые данные Decode — НЕ special category data** (Art. 9). Это обычные персональные данные → нужен только **Art. 6 lawful basis** (а не Art. 6 + Art. 9 condition). Это сильно упрощает комплаенс, но не отменяет DPIA.
2. **DPIA нужен — почти наверняка.** Срабатывают сразу несколько ICO-триггеров: **innovative technology (AI)**, **vulnerable individuals** (молодёжь + финансовая уязвимость/credit rating прямо названы ICO), **data matching** (cross-vault), потенциально **denial-of-service-подобная оценка** через trap detector. Комбинация ≥2 факторов = DPIA обязателен.
3. **Lawful basis: Contract (Art. 6(1)(b))** для core-функции (сканировать/декодировать/хранить документы юзера — он сам просит) + **Legitimate interests** для аналитики/безопасности + **Consent** только для опциональных вещей (хранение оригиналов фото, маркетинг). Для AI-обработки фото отдельный consent **не нужен** (это часть исполнения договора), но нужна прозрачность.
4. **ZDR с Anthropic возможен и бесплатен по сути, но с условиями:** `/v1/messages` + inline PDF/vision **ZDR-eligible**; **Files API и Batch API — НЕ ZDR-eligible** (это ломает паттерн «загрузить PDF один раз, спрашивать много» — для ZDR придётся слать документ заново или хранить у себя). **CORS не поддерживается под ZDR** → обязателен backend-прокси (у Decode он и так есть — FastAPI). По умолчанию (даже без ZDR) Anthropic **не тренирует** модели на API-входах/выходах.
5. **Privacy-by-design по оригиналам фото:** дефолт MVP — **не хранить оригинал** после извлечения (хранить только extraction JSON + thumbnail/первую страницу для UI), опция «Keep originals» — explicit consent. Это и приватность, и меньше поверхность App Store-декларации.
6. **App Store privacy labels:** декларировать как минимум **Financial Info → Other Financial Info / Credit Info**, **User Content → Photos** (если храним), **Contact Info → Email/Name** (Apple relay), **Identifiers → User ID**, **Usage Data**, **Diagnostics**. «Регулируемое финансовое» исключение из декларирования **к Decode НЕ применяется** (Decode не authorised и фото — это primary functionality). Data Used to **Track** = **None** (no ad SDKs, no data brokers).
7. **Supabase eu-west-2 (London) подтверждён** как доступный регион (authoritative: `packages/shared-data/regions.ts`). AES-256 at rest всегда включено, SOC 2 Type II / ISO 27001 / HIPAA. Главный риск Supabase — **RLS off by default** (CVE-2025-48757: 170+ апп слили данные через anon-key без RLS); для Decode RLS обязателен на каждой user-таблице и каждом Storage-бакете, anon-key безопасен только за RLS.

---

## 1. Reference-схема сущностей (Postgres / Supabase)

Дизайн-принципы: (1) каждая user-таблица несёт `user_id uuid references auth.users` и закрыта RLS-политикой `auth.uid() = user_id`; (2) extraction хранится как `jsonb` (schema-on-read — соответствует structured-output-формату из [23](23-ai-eval-extraction.md), где есть `not_found`/`confidence`/`verbatim`); (3) детерминированные поля (суммы, даты, APR) дублируются в типизированные колонки для SQL-аналитики Cockpit и Renewal Radar (cross-vault кейс из [08](08-tech-rag-backend.md) закрывается SQL, а не вектором); (4) privacy-by-design — оригинал файла отделён от извлечённых данных и удаляем независимо.

### 1.1 ER-обзор (связи)

```
auth.users (Supabase Auth, managed)
   │ 1
   │
   ├─< profiles            (1:1  публичный профиль/настройки/тариф)
   ├─< documents           (1:N  один скан = одна запись)
   │      │ 1
   │      ├─< extractions   (1:1/1:N  версии извлечения; provider, model, JSON)
   │      ├─< commitments   (1:N  финансовые обязательства, выведенные из документа)
   │      │      └─< reminders     (1:N  напоминания Renewal Radar по обязательству)
   │      ├─< traps         (1:N  сработавшие trap-флаги по документу)
   │      ├─< doc_chunks    (1:N  чанки текста + эмбеддинги для cross-vault Q&A)
   │      └─< qa_sessions   (1:N  диалоги Q&A по документу)
   │              └─< qa_messages  (1:N  реплики + citations)
   └─< processing_jobs     (1:N  async-статус пайплайна для SSE)

trap_catalog               (shared, без user_id — справочник 14 trap-типов из [10b])
consumer_rights_kb         (shared, RAG-база CCA/CRA/FCA из [08])
audit_log / consent_log    (служебные, append-only)
```

### 1.2 Таблицы — поля и обоснование

#### `profiles` (1:1 к `auth.users`)
| Поле | Тип | Назначение |
|---|---|---|
| `id` (PK) | `uuid` = `auth.users.id` | связь с Auth |
| `display_name` | `text null` | имя (может быть пустым — Apple relay) |
| `plan` | `text` enum `free`/`pro` | freemium-гейт (лимит сканов из [21](21-pricing-monetization.md)) |
| `scans_used_this_period` | `int` | счётчик для месячного лимита free |
| `period_resets_at` | `timestamptz` | сброс лимита |
| `keep_originals` | `bool default false` | **privacy-toggle**: хранить ли исходные фото (см. §6) |
| `vault_biometric_lock` | `bool default false` | Face ID на Vault (из jtbd.md) |
| `created_at`/`updated_at` | `timestamptz` | аудит |

> Чувствительные платёжные данные подписки **не храним** — Apple IAP/StoreKit держит биллинг; в БД только `plan`.

#### `documents`
| Поле | Тип | Назначение |
|---|---|---|
| `id` (PK) | `uuid` | |
| `user_id` (FK) | `uuid` | RLS-ключ |
| `doc_type` | `text` enum `bnpl`/`credit`/`insurance`/`utility`/`subscription`/`other` | маршрутизация trap-набора и chunking |
| `provider_name` | `text null` | лендер/страховщик/сервис (извлекается; для группировки и Radar) |
| `source` | `text` enum `camera`/`photo_library`/`share_extension`/`pdf` | App Store «как собрано» |
| `storage_path` | `text null` | путь в Storage-бакете `documents/` (NULL, если оригинал не храним) |
| `original_retained` | `bool` | хранится ли оригинал (для erasure/декларации) |
| `page_count` | `int` | |
| `captured_at` | `timestamptz` | когда юзер снял |
| `status` | `text` enum `uploaded`/`processing`/`done`/`failed` | UI |
| `purge_after` | `timestamptz null` | **retention-таймер оригинала** (см. §4.3) |
| `created_at`/`deleted_at` | `timestamptz` | soft-delete + retention |

#### `extractions` (результат AI-пайплайна; 1:N — версии при ре-анализе)
| Поле | Тип | Назначение |
|---|---|---|
| `id` (PK) | `uuid` | |
| `document_id` (FK)/`user_id` (FK) | `uuid` | RLS |
| `provider` | `text` | `anthropic` (для аудита/мультивендор) |
| `model` | `text` | напр. `claude-haiku-4-5` (версионирование для eval из [23]) |
| `prompt_version` | `text` | для регресс-евала промптов |
| `summary_plain` | `text` | plain-English summary (wedge) |
| `extracted` | `jsonb` | весь structured output: `{fields:[{key,value,verbatim,confidence,not_found,page,bbox}], …}` ([23] формат) |
| `true_cost` | `jsonb` | результат детерминированного движка (не AI): principal, total_repayable, fees[], APR_calc |
| `extraction_started_at`/`completed_at` | `timestamptz` | latency-метрика |
| `created_at` | `timestamptz` | |

Денормализованные типизированные поля для SQL (берутся из `extracted` после валидации `verbatim`):
`apr numeric`, `monthly_payment numeric`, `total_repayable numeric`, `term_months int`, `first_payment_date date`, `renewal_date date`, `currency text default 'GBP'`.

#### `commitments` (выведенное обязательство — питает Cockpit «Committed this month» и Radar)
| Поле | Тип | Назначение |
|---|---|---|
| `id` (PK)/`user_id` (FK)/`document_id` (FK null) | `uuid` | commitment может быть и ручным |
| `kind` | `text` enum `bnpl_plan`/`loan`/`insurance_policy`/`subscription`/`utility` | |
| `provider_name` | `text` | |
| `amount` | `numeric` | сумма платежа |
| `cadence` | `text` enum `weekly`/`monthly`/`annual`/`one_off`/`instalments` | для «Committed this month» |
| `next_due_date` | `date null` | |
| `renewal_date` | `date null` | Renewal Radar |
| `auto_renew` | `bool null` | trap-флаг auto-renewal |
| `goes_on_credit_file` | `bool null` | бейдж из jtbd.md |
| `status` | `text` enum `active`/`closed`/`cancelled` | |

#### `traps` (сработавшие флаги; справочник — `trap_catalog`)
| Поле | Тип | Назначение |
|---|---|---|
| `id` (PK)/`user_id` (FK)/`document_id` (FK) | `uuid` | |
| `trap_code` | `text` FK→`trap_catalog.code` | один из 14 типов ([10b]) |
| `severity` | `text` enum `info`/`warn`/`high` | |
| `evidence_verbatim` | `text` | дословная цитата из документа (citations) |
| `evidence_page`/`bbox` | `int`/`jsonb` | source highlighting |
| `explanation_plain` | `text` | объяснение на простом языке |
| `created_at` | `timestamptz` | |

> `trap_catalog` (shared, без `user_id`): `code`, `title`, `description`, `default_severity`, `consumer_right_ref` (ссылка в `consumer_rights_kb`). RLS: read-only для `authenticated`.

#### `reminders` (Renewal Radar)
| Поле | Тип | Назначение |
|---|---|---|
| `id` (PK)/`user_id` (FK)/`commitment_id` (FK) | `uuid` | |
| `remind_at` | `timestamptz` | когда пушить |
| `channel` | `text` enum `push`/`in_app` | (email опционально) |
| `lead_days` | `int` | за сколько до renewal/cancellation-окна |
| `status` | `text` enum `scheduled`/`sent`/`dismissed`/`actioned` | |
| `payload` | `jsonb` | текст уведомления |

#### `qa_sessions` / `qa_messages` (Ask-anything по документу — Q&A с citations)
`qa_sessions`: `id`, `user_id`, `document_id (null = cross-vault)`, `created_at`, `last_message_at`.
`qa_messages`: `id`, `session_id`, `user_id`, `role` (`user`/`assistant`), `content text`, `citations jsonb` (массив `{cited_text, page, document_id}` — нативные Claude citations из [23]), `model`, `tokens_in/out int`, `created_at`.

> **Privacy-нюанс Q&A:** вопросы пользователя про долги/просрочки — потенциально debt-counselling-зона ([09b]); это не делает данные special category, но повышает чувствительность → хранить минимально, дать удаление сессии, и **в Q&A по уже подписанным договорам держать дисклеймер** (MSE-стиль).

#### `processing_jobs` (async-статус для SSE из [08])
`id`, `user_id`, `document_id`, `stage` (`uploaded`/`parsing`/`extracting`/`traps`/`done`), `status`, `error`, `created_at`, `updated_at`.

#### `doc_chunks` (pgvector — только для cross-vault Q&A и KB; не для single-doc)
`id`, `user_id`, `document_id`, `section_title`, `chunk_text`, `embedding vector(1536)`, `page`. RLS обязателен + всегда `WHERE user_id = auth.uid()` до ANN ([08] §2.2). `consumer_rights_kb` — shared-аналог без `user_id`.

#### Служебные (комплаенс)
- `consent_log` (append-only): `user_id`, `consent_type` (`keep_originals`/`marketing`/`analytics`), `granted bool`, `policy_version`, `created_at` — доказательная база под Art. 7 (демонстрация согласия) и accountability.
- `audit_log` / `deletion_log`: фиксировать факты удаления аккаунта/документов и обработку erasure-запросов (Art. 17 accountability, в т.ч. отметка о бэкапах).

---

## 2. Supabase: безопасность и конфигурация

### 2.1 RLS — единственный слой авторизации (и главный риск)

Supabase авто-генерирует REST/Storage API из схемы; **anon-key публичен по дизайну**, безопасность держится на RLS, а **RLS выключен по умолчанию** на новых таблицах. Именно это вызвало **CVE-2025-48757** — у 170+ приложений таблицы читались неаутентифицированным anon-key, утекли emails/API-keys/платёжные данные ([byteiota](https://byteiota.com/supabase-security-flaw-170-apps-exposed-by-missing-rls/), [vibeappscanner](https://vibeappscanner.com/supabase-security)). 83% инцидентов Supabase — RLS-мисконфиг.

Правила для Decode (official docs — [Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)):

- **Включить RLS на КАЖДОЙ таблице в exposed-схеме** (`alter table … enable row level security;`), плюс project-toggle «Enable RLS on new tables». «RLS must always be enabled on any tables stored in an exposed schema.»
- Owner-only паттерн (с **обёрткой `(select auth.uid())`** — оптимизатор кэширует на statement, +94–99% к скорости; голый `auth.uid()` вызывается per-row):
  ```sql
  alter table documents enable row level security;

  create policy "own_select" on documents for select
    to authenticated using ( (select auth.uid()) = user_id );
  create policy "own_insert" on documents for insert
    to authenticated with check ( (select auth.uid()) = user_id );
  create policy "own_update" on documents for update
    to authenticated using ( (select auth.uid()) = user_id )
                          with check ( (select auth.uid()) = user_id );
  create policy "own_delete" on documents for delete
    to authenticated using ( (select auth.uid()) = user_id );
  ```
- **`service_role` обходит RLS** — использовать **только** на сервере (FastAPI). Никогда не класть service_role в RN-клиент. FastAPI ходит в Postgres под service_role и сам проверяет `user_id` из verified JWT (или — безопаснее — прокидывает пользовательский JWT, чтобы RLS оставалась активной как defense-in-depth).
- `anon` vs `authenticated` роли: политики Decode таргетят `to authenticated`; для anon — никакого доступа к user-данным.

### 2.2 Auth — Sign in with Apple (обязателен для iOS)

- Supabase нативно поддерживает Sign in with Apple: **native flow внутри iOS** через Apple AuthenticationServices (рекоменд. для RN/Expo) и OAuth-flow ([Login with Apple](https://supabase.com/docs/guides/auth/social-login/auth-apple), [Native Mobile Auth](https://supabase.com/blog/native-mobile-auth)).
- **Apple Private Email Relay:** многие юзеры скроют email (`@privaterelay.appleid.com`) — UI и `profiles.display_name` должны это переживать (имя может быть пустым после первого входа). Транзакционные письма (Renewal Radar email-канал) шлются на relay-адрес.
- **Эксплуатационная ловушка OAuth-flow:** Apple требует **перегенерировать client secret (.p8) каждые 6 месяцев** — иначе логин падает. Для native-flow этого нет → ещё аргумент за native.
- App Store-требование: если есть сторонний соц-логин, **Sign in with Apple обязателен** (актуально, если добавим Google).

### 2.3 Storage — фото документов

- Бакет `documents/` — **private**, доступ только через **короткоживущие signed URLs**; RLS-политики на `storage.objects` гейтят доступ так же, как таблицы (`(select auth.uid()) = owner` / по `user_id` в path) — [Storage docs](https://supabase.com/docs/guides/storage).
- Путь-конвенция `documents/{user_id}/{document_id}.jpg` + RLS по префиксу.
- На устройстве — iOS Data Protection (`NSFileProtectionComplete`) для локального кэша ([08] §5.1).

### 2.4 Шифрование, регион, сертификации

- **At rest:** Supabase шифрует БД и бэкапы **AES-256** всегда; in transit — TLS 1.2+ ([Security at Supabase](https://supabase.com/security)).
- **Регион:** **`eu-west-2` «West Europe (London)»** — подтверждён как доступный регион Supabase (authoritative: [`packages/shared-data/regions.ts`](https://github.com/supabase/supabase/blob/master/packages/shared-data/regions.ts), также Ireland `eu-west-1`, Paris `eu-west-3`, Frankfurt `eu-central-1`). Регион выбирается при создании проекта и **не меняется** потом → выбрать London сразу. (Если London окажется недоступен по capacity — Frankfurt `eu-central-1` как fallback, всё ещё EU/UK-adequate.)
- **Сертификации:** SOC 2 Type II, ISO 27001, HIPAA, PCI DSS ([SOC 2](https://supabase.com/docs/guides/security/soc-2-compliance), [blog](https://supabase.com/blog/supabase-soc2-hipaa)). DPA с UK-addendum доступен self-service.
- **Бэкапы и residency:** учесть, что бэкап-локация привязана к региону; PITR/бэкапы тоже в EU — но **erasure должен учитывать бэкапы** (см. §3.4).

---

## 3. UK GDPR

### 3.1 Финансовые данные — НЕ special category (ключевой вывод)

Art. 9 special categories (ICO, [What are the rules on special category data](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/lawful-basis/special-category-data/what-are-the-rules-on-special-category-data/)): расовое/этническое происхождение, политические взгляды, религиозные/философские убеждения, членство в профсоюзе, генетика, биометрия (для идентификации), здоровье, сексуальная жизнь/ориентация. **Финансовых данных в списке нет.** ICO/практика прямо: «Financial data does not constitute special category data … whilst it may be sensitive, it does not raise the same fundamental issues.»

**Следствие для Decode:** достаточно **Art. 6 lawful basis** (а не Art. 6 + Art. 9 condition). НО: (а) если в документ случайно попадёт special-категория (напр. медстраховка → данные о здоровье; членство в профсоюзе в utility-документе) — это уже Art. 9 → политика «не извлекать и не хранить special-категории, минимизировать»; (б) **App Store-понятие «Sensitive Info» ≠ GDPR special category** — у Apple финансы отдельная категория, «Sensitive Info» — это раса/ориентация/религия и т.п.

### 3.2 Lawful basis — рекомендация

Семь оснований Art. 6 (ICO, [A guide to lawful basis](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/lawful-basis/a-guide-to-lawful-basis/), обновлено 02.04.2026 под Data (Use and Access) Act). Для Decode:

| Активность | Основание | Обоснование |
|---|---|---|
| Сканирование, OCR/AI-декод, хранение документов и извлечённых данных, Vault, Q&A, Radar | **Contract — Art. 6(1)(b)** | юзер сам просит обработать его документ; это исполнение договора об оказании услуги. Не нужен отдельный consent. |
| Хранение **оригинала** фото после извлечения, маркетинг, доп. аналитика поведения | **Consent — Art. 6(1)(a)** | опциональные, отделимые цели; toggle «Keep originals», opt-in; логировать в `consent_log` |
| Безопасность, fraud-prevention, агрегированная продуктовая аналитика, debugging | **Legitimate interests — Art. 6(1)(f)** | нужен LIA (legitimate interests assessment), особенно с учётом уязвимого сегмента |

> **Почему не consent для core?** ICO: consent даёт юзеру право в любой момент отозвать → если core построен на consent, отзыв ломает услугу. Contract устойчивее для функции, которую юзер прямо запросил. (При этом нельзя «свопать» основания задним числом — фиксируем сразу, документируем в privacy policy.)
>
> **Связь с FCA ([09b]):** Decode даёт *information, not advice* и не authorised. Lawful basis это не меняет, но усиливает требование прозрачности и дисклеймеров, особенно в Q&A по подписанным договорам (debt-counselling-зона).

### 3.3 DPIA — нужен (вывод: ДА, делать)

Art. 35(1): DPIA обязателен, если обработка «likely to result in a high risk». ICO ([When do we need to do a DPIA](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/accountability-and-governance/data-protection-impact-assessments-dpias/when-do-we-need-to-do-a-dpia/)) даёт 3 авто-триггера (Art. 35(3)) + список из 10 (Art. 35(4)) + 9 EU-критериев. **В большинстве случаев комбинация ≥2 факторов = DPIA.** У Decode срабатывают:

- ✅ **Innovative technology** — «processing involving the use of innovative technologies … (including AI)». Фото→AI-извлечение это прямо оно. DPIA нужен, если в комбинации с другим критерием — и он есть.
- ✅ **Vulnerable individuals** — ICO прямо: уязвимость может возникать «due to an individual's financial situation (e.g. credit rating)» и у молодёжи; сегмент Decode S1 = 18–25 + финансовая тревожность. Сильный триггер.
- ✅ **Data matching / combining** — cross-vault Q&A объединяет данные из множества документов одного юзера.
- ⚠️ **Denial-of-service-подобная оценка** — trap detector/«goes on your credit file» это не automated decision с legal effect (Decode ничего не решает за юзера), но «similarly significant effect» затрагивает «financial status … access to services» → пограничная зона, лучше отразить в DPIA.
- ⚠️ **Large-scale special category** — НЕ применяется (финансы не Art. 9), **кроме** случайного захвата здоровья/профсоюза → митигировать минимизацией.

**Вывод:** даже одного «innovative technology + vulnerable» достаточно. **DPIA делать до запуска.** Что включить (ICO-структура):
1. Описание обработки (data flow: камера → RN → FastAPI → Claude API (US, под ZDR) → Supabase eu-west-2), цели, объём, контекст.
2. Necessity & proportionality (почему AI, почему храним то, что храним; минимизация — §6).
3. Идентификация рисков для прав/свобод (утечка финдокументов, ре-идентификация, ошибочный AI-вывод по уязвимому юзеру, transfer в US).
4. Меры снижения: RLS, AES-256, eu-west-2, ZDR с Anthropic, «don't keep originals» по умолчанию, citations/`not_found` против галлюцинаций ([23]), дисклеймеры ([09b]), retention-политика, erasure.
5. Остаточный риск + ревью. Консультация UK-DP-практика.

> **DPO:** обязателен, только если core-деятельность — large-scale обработка **special category**. У Decode core — обычные финданные → **DPO формально не обязателен**, но назначить ответственного за DP — best practice.

### 3.4 Retention, право на удаление, бэкапы

- **Storage limitation (Principle (e))** — UK GDPR не задаёт фиксированных сроков; «не дольше, чем нужно» + **задокументированная retention policy** ([08] §5.3, [ICO storage limitation](https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/principles/storage-limitation/)).
- **Right to erasure (Art. 17)** — удаление аккаунта = каскадное удаление `documents`, `extractions`, `commitments`, `traps`, `reminders`, `qa_*`, `doc_chunks`, файлов Storage. ICO ([Right to erasure](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/individual-rights/right-to-erasure/)): нужно учитывать **бэкапы** — live-данные удаляются сразу; в бэкапах могут жить до следующего цикла перезаписи, при условии что бэкап не используется ни для чего иного и юзеру это раскрыто. Зафиксировать в privacy policy + `deletion_log`.
- **Рекомендуемая retention-политика Decode:**
  | Данные | Retention | Триггер удаления |
  |---|---|---|
  | Оригинал фото/PDF (`storage`) | **по умолчанию: удалять сразу после успешного извлечения** (`keep_originals=false`); если opt-in — до отзыва/удаления документа | `purge_after`, отзыв consent |
  | Extraction JSON, commitments, traps | пока активен аккаунт (core-ценность Vault) | удаление документа/аккаунта |
  | Q&A сессии | до удаления юзером или N мес. неактивности | per-session delete |
  | `processing_jobs` | TTL 30–90 дней | cron-purge |
  | `audit_log`/`deletion_log`/`consent_log` | дольше (accountability) — обосновать срок | — |
  | Inactive account | предложить экспорт + удаление после X мес. неактивности | политика |
- **Data subject rights:** access/portability (экспорт Vault в JSON/PDF), rectification (правка извлечённого поля), erasure, objection. Под каждое — endpoint в FastAPI.

### 3.5 Transfer в США (Anthropic) и residency

- Данные «в покое» — в UK (Supabase London). **Вызовы Claude API = transfer персональных данных в US** (Anthropic — processor). Легитимизировать через **Anthropic DPA + SCC/UK IDTA** (Anthropic предоставляет DPA с SCC; см. §5). Отразить в privacy policy: «documents are processed by Anthropic (US) under a DPA with EU SCCs / UK Addendum».
- Опция `inference_geo` (data residency у Claude API, ZDR-eligible — см. таблицу §5) может снизить географию инференса — проверить EU-routing при настройке.

---

## 4. App Store Privacy Nutrition Labels

Источник: [App Privacy Details — Apple Developer](https://developer.apple.com/app-store/app-privacy-details/).

### 4.1 «Collect» — определение (важно для ZDR-стори)

Apple: *"'Collect' refers to transmitting data off the device and storing it in a readable form for longer than the time it takes … to service the request. … if data is sent to your servers then immediately discarded after servicing the request, you do not need to disclose this."* И: данные, обработанные **только на устройстве**, не «collected».

**Следствие:** фото, ушедшее в Claude API **под ZDR** и сразу отброшенное, в теории может не считаться «collected» через этот канал. НО Decode **хранит извлечённые данные (и опц. оригинал) на своих серверах** → это «collected» и **должно быть задекларировано**.

### 4.2 «Регулируемое финансовое» исключение — к Decode НЕ применяется

Apple даёт optional-disclosure для апп, которые «facilitate regulated financial services» при наборе условий (сбор опционален, не часть primary functionality, есть legal privacy notice, нет шеринга с data brokers кроме fraud/credit). **Decode не подходит:** (1) не authorised regulated financial provider ([09b]); (2) сканирование документов — это **primary functionality**, не «infrequent». → Decode **обязан декларировать**.

### 4.3 Что декларировать (минимум для Decode MVP)

| Категория Apple | Тип | Декларировать? | Linked to user? | Used to track? |
|---|---|---|---|---|
| **Financial Info** | Other Financial Info (debts/income — из документов), Credit Info (если «goes on credit file») | **Да** | Да | Нет |
| **User Content** | Photos or Videos (если `keep_originals` / при загрузке) | **Да** (если храним) | Да | Нет |
| **Contact Info** | Email Address, Name | **Да** (Apple relay) | Да | Нет |
| **Identifiers** | User ID (account id) | **Да** | Да | Нет |
| **Usage Data** | Product Interaction | **Да** (если меряем) | зависит | Нет |
| **Diagnostics** | Crash/Performance Data | **Да** (если SDK крашей) | обычно Not Linked | Нет |
| **Sensitive Info** (Apple) | — | **Нет** (не собираем расу/ориентацию/религию; financial ≠ Apple Sensitive) | — | — |
| Health, Location, Contacts, Browsing/Search History | — | **Нет** | — | — |

- **Payment Info:** если подписка через Apple IAP и Decode «never has access to payment information» — **не декларируется** (Apple: payment вне аппа → not collected).
- **Data Used to Track You = None:** у Decode нет ad-SDK, нет data brokers, нет шеринга для рекламы → сильный privacy-маркер (App Tracking Transparency prompt не нужен). Это согласуется с privacy-стори «no bank connection».
- **Privacy manifests / Required Reason APIs:** с iOS-обновлениями нужен `PrivacyInfo.xcprivacy` (декларация data types + reasons для «required reason APIs») и privacy-манифесты для third-party SDK; Expo/RN SDK должны его поставлять — проверить при сборке.

---

## 5. Anthropic — ZDR, обучение, DPA

Источники: [API and data retention](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention), [ZDR scope](https://privacy.claude.com/en/articles/8956058-i-have-a-zero-data-retention-agreement-with-anthropic-what-products-does-it-apply-to), [Is my data used for training](https://privacy.claude.com/en/articles/7996868-is-my-data-used-for-model-training).

### 5.1 Обучение моделей

- **По умолчанию (даже без ZDR):** *"By default, we will not use your inputs or outputs from our commercial products (e.g. Claude for Work, **Anthropic API**, Claude Gov, etc.) to train our models."* Исключение — если сам нажмёшь thumbs-up/down или opt-in. → Decode **не должен** включать feedback-фичи, которые шлют контент в Anthropic, без явного решения.

### 5.2 ZDR — что покрывает и чего не покрывает (для Decode)

- **ZDR:** «Customer data is not stored at rest after the API response is returned, except where needed to comply with law or combat misuse.» Под ZDR всё равно хранятся **User Safety classifier results** (для enforcement Usage Policy).
- **ZDR-eligible (нужны Decode):** **Messages API `/v1/messages`** ✅, **Token counting** ✅, **PDF support (inline через Messages API)** ✅, **Citations** ✅, **Prompt caching** ✅ (промпты/выходы не хранятся; KV-кэш в памяти на TTL), **Structured outputs** ✅ (qualified — кэшируется только JSON-схема ≤24ч), **1M context** ✅, **Data residency `inference_geo`** ✅.
- **НЕ ZDR-eligible (важные грабли):**
  - **Files API** ❌ — «Files retained until explicitly deleted». Паттерн «загрузить PDF один раз → `file_id` → спрашивать много» ([08] §1.2) **несовместим с ZDR**. Под ZDR: либо слать документ заново каждый запрос (дороже токенами, но prompt caching сглаживает), либо хранить документ у себя (Supabase) и подкладывать inline.
  - **Batch API** ❌ — 29-day retention.
  - Code execution / MCP connector / Agent skills / Managed Agents ❌ — Decode их не использует.
- **CORS не поддерживается под ZDR** → нельзя звать Claude из браузера/клиента напрямую; обязателен **backend-прокси**. У Decode он есть (FastAPI) ✅ — заодно прячет API-key.
- **Как получить ZDR:** заявка через Anthropic Sales, **per-organization**, ревью. Не включается автоматически на новые org. → Подать заявку заранее; на одну org для Decode.
- **Где-required-by-law оговорка:** при флаге за нарушение Usage Policy Anthropic может хранить ввод/вывод **до 2 лет** даже под ZDR.

### 5.3 DPA / GDPR / субпроцессоры

- Anthropic Commercial Terms: данные обрабатываются по **Anthropic DPA** (incorporated by reference); обязательства передаются субпроцессорам; **15 дней нотиса** на нового субпроцессора (право возразить); Anthropic «не продаёт/не шарит» персональные данные. SCC/UK-addendum для transfer.
- Сертификации Anthropic: SOC 2 Type II, ISO 27001, **ISO 42001** (AI management), GDPR ([Trust Center](https://trust.anthropic.com/)). Субпроцессоры — AWS (primary), GCP.
- **HIPAA-ready** Decode не нужен (не PHI), но полезно знать: PDF inline ZDR/HIPAA-eligible, через Files API — нет.

---

## 6. Хранить ли оригинал фото или только извлечённый текст (privacy-by-design)

**Рекомендация: дефолт — НЕ хранить оригинал.** После успешного extraction:
- хранить: `extraction.extracted` (JSON), `true_cost`, `summary_plain`, denormalized-поля, `doc_chunks` (текст для Q&A/Radar), опц. **только первую страницу/thumbnail** для UI-карточки;
- удалять: исходный файл (`storage_path`→NULL, `original_retained=false`), `purge_after`.
- **opt-in «Keep originals»** (`profiles.keep_originals`, лог в `consent_log`) — для тех, кому нужен ре-анализ/просмотр оригинала.

Почему:
1. **Data minimisation (Principle (c)) + storage limitation** — оригинал не нужен для core-ценности (ценность в извлечённых числах/трапах), значит хранить его — слабее обоснование.
2. **Сужает App Store-декларацию** — без хранения оригиналов можно не декларировать User Content → Photos (или декларировать как опциональное).
3. **Снижает поверхность утечки** — фото паспорта/договора с лишними PII (имена, адреса, иногда здоровье) — самый «токсичный» актив; нет файла — нет утечки.
4. **Маркетинг privacy** ([jtbd.md] «куда уходят фото?»): «We don't keep your photos — only the numbers you need» + «processed under zero-data-retention with Anthropic» + «no bank connection» — три privacy-крючка для onboarding/paywall.

Компромисс: source-highlighting трапов требует bbox/page → хранить **координаты + verbatim-цитаты** в `traps`/`extractions` (не сам файл) достаточно для подсветки в reconstructed-view; полноценный re-render страницы — только при `keep_originals`.

---

## 7. Чек-лист (под билд)

**Supabase / data layer**
- [ ] Проект создан в **eu-west-2 (London)** (регион не меняется → сразу верно).
- [ ] `Enable RLS on new tables` включён project-wide.
- [ ] RLS включён + owner-policy `(select auth.uid()) = user_id` на **всех** user-таблицах (`documents`, `extractions`, `commitments`, `traps`, `reminders`, `qa_*`, `doc_chunks`, `profiles`, `processing_jobs`).
- [ ] RLS на `storage.objects` для бакета `documents/`; бакет private; доступ только signed URLs.
- [ ] `service_role` только на сервере (FastAPI); никогда в RN-клиенте; anon-key — только за RLS.
- [ ] Sign in with Apple через **native flow** (избегаем 6-мес. ротации .p8); UI переживает Apple relay email / пустое имя.
- [ ] Подписан Supabase DPA (UK addendum).

**UK GDPR**
- [ ] **DPIA** написан и подписан (innovative AI + vulnerable + data matching) — до запуска.
- [ ] Lawful basis зафиксирован: Contract (core) / Consent (originals, marketing) / LI (security, analytics) + LIA; задокументирован в privacy policy.
- [ ] Privacy policy: цели, основания, retention, transfer в US (Anthropic DPA + SCC/IDTA), права субъекта.
- [ ] Retention policy задокументирована; `purge_after` + cron-purge работают.
- [ ] Erasure: каскадное удаление аккаунта (вкл. Storage) + обработка бэкапов раскрыта; `deletion_log`.
- [ ] DSAR/export/rectification endpoints в FastAPI.
- [ ] `consent_log` (append-only) + версия политики.
- [ ] Политика «не извлекать special-category» (здоровье/профсоюз) при случайном попадании.

**Anthropic**
- [ ] Заявка на **ZDR** подана (Sales, на org Decode); подтверждено в контракте.
- [ ] Документ передаётся **inline через `/v1/messages`** (НЕ Files API — несовместим с ZDR).
- [ ] Backend-прокси (FastAPI) — все вызовы Claude через него (CORS под ZDR недоступен; API-key скрыт).
- [ ] Никаких feedback-фич, отправляющих контент в Anthropic, без явного opt-in.
- [ ] Anthropic DPA подписан/принят; субпроцессоры учтены в privacy policy.

**App Store**
- [ ] Privacy labels: Financial Info, User Content→Photos (если храним), Contact Info, Identifiers, Usage Data, Diagnostics — Linked, **Track = None**.
- [ ] Payment Info НЕ декларируется (Apple IAP вне аппа).
- [ ] `PrivacyInfo.xcprivacy` + privacy-манифесты third-party SDK; Required Reason APIs обоснованы.
- [ ] App-facing privacy-стори: «no bank connection · we don't keep your photos by default · zero-data-retention with Anthropic · UK data residency».

**Privacy-by-design**
- [ ] `keep_originals=false` по умолчанию; удаление оригинала после extraction; opt-in toggle.
- [ ] Хранить verbatim-цитаты + page/bbox в `traps`/`extractions` (для подсветки без файла).
- [ ] Vault biometric lock (Face ID) — опция.

---

## Key takeaways for Decode

1. **Финансовые данные ≠ special category** (Art. 9) → только Art. 6 lawful basis, без Art. 9 condition; DPO формально не обязателен. Это заметно упрощает комплаенс. Но «Apple Sensitive Info» — другое понятие (раса/ориентация/религия), к Decode не относится.
2. **DPIA обязателен** — сходятся ICO-триггеры innovative AI + vulnerable individuals (ICO прямо называет «credit rating» и молодёжь уязвимостью) + data matching (cross-vault). Сделать до 15.07.2026; структура — в §3.3.
3. **Lawful basis: Contract для core** (сканирование/декод/хранение — юзер сам просит), Consent только для опций (хранение оригиналов, маркетинг), Legitimate interests для безопасности/аналитики. Не строить core на consent (отзыв ломает услугу).
4. **ZDR реален, но Files API и Batch API его ломают** — документ слать inline через `/v1/messages`; паттерн «file_id один раз» несовместим с ZDR. CORS под ZDR недоступен → FastAPI-прокси обязателен (он и так есть). По умолчанию Anthropic не тренирует на API-данных.
5. **Supabase eu-west-2 (London) подтверждён** (authoritative regions.ts); AES-256 always-on, SOC2/ISO27001/HIPAA. Главный риск — RLS off by default (CVE-2025-48757): RLS на каждой таблице/бакете, `(select auth.uid())`-обёртка, service_role только на сервере.
6. **Privacy-by-design = не хранить оригинал фото по умолчанию** (хранить только extraction JSON + thumbnail + verbatim/bbox для подсветки). Это и data-minimisation, и меньше App Store-декларации, и тройной privacy-крючок для маркетинга («no bank connection · no photo storage · ZDR»).
7. **App Store:** декларировать Financial Info + (опц.) User Content→Photos + Contact + Identifiers + Usage + Diagnostics; **Track = None**; регулируемо-финансовое исключение к Decode НЕ применяется (не authorised + фото = primary functionality).
8. **US-transfer (Anthropic) легитимизировать** через Anthropic DPA + SCC/UK IDTA; отразить в privacy policy; рассмотреть `inference_geo` для EU-routing.

---

## Источники (первоисточники)

**ICO / UK GDPR**
- When do we need to do a DPIA — https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/accountability-and-governance/data-protection-impact-assessments-dpias/when-do-we-need-to-do-a-dpia/
- What are the rules on special category data — https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/lawful-basis/special-category-data/what-are-the-rules-on-special-category-data/
- A guide to lawful basis (обновл. 02.04.2026) — https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/lawful-basis/a-guide-to-lawful-basis/
- Right to erasure — https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/individual-rights/right-to-erasure/
- Storage limitation — https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/principles/storage-limitation/

**Anthropic**
- API and data retention (ZDR/HIPAA feature-eligibility table) — https://platform.claude.com/docs/en/manage-claude/api-and-data-retention
- ZDR scope (Privacy Center) — https://privacy.claude.com/en/articles/8956058-i-have-a-zero-data-retention-agreement-with-anthropic-what-products-does-it-apply-to
- Is my data used for model training — https://privacy.claude.com/en/articles/7996868-is-my-data-used-for-model-training
- Trust Center — https://trust.anthropic.com/

**Supabase**
- Row Level Security — https://supabase.com/docs/guides/database/postgres/row-level-security
- Login with Apple — https://supabase.com/docs/guides/auth/social-login/auth-apple · Native Mobile Auth — https://supabase.com/blog/native-mobile-auth
- Available regions — https://supabase.com/docs/guides/platform/regions · authoritative codes — https://github.com/supabase/supabase/blob/master/packages/shared-data/regions.ts
- Security — https://supabase.com/security · SOC 2 — https://supabase.com/docs/guides/security/soc-2-compliance
- CVE-2025-48757 / RLS exposure — https://byteiota.com/supabase-security-flaw-170-apps-exposed-by-missing-rls/ · https://vibeappscanner.com/supabase-security

**Apple**
- App Privacy Details — https://developer.apple.com/app-store/app-privacy-details/
