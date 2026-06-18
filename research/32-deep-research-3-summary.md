# 32 — Deep Research Wave 3: синтез (треки 26–31)

**Дата синтеза:** 2026-06-18 · **Источник:** 6 отчётов третьей волны [26](26-naming-brand-trademark.md)–[31](31-behavioral-trust-design.md) · **Назначение:** закрыть «обвязочные» риски перед билдом — **имя/бренд/ТЗ**, **data-model + UK GDPR**, **метрики/инструментирование** (резолв открытого вопроса №7 из [00](00-executive-summary.md)), **retention/нотификации Watch-слоя**, **doc-type #2 для trap-каталога**, **behavioral/trust/copy** для уязвимого сегмента. Платформа: последняя iOS, iPhone-first, Expo/RN + FastAPI + Supabase eu-west-2 (London) + Claude API. Freemium ~£4.99/мес. Запуск к 15.07.2026 (BNPL Regulation Day).

> **Предшественники:** [00 — Executive Summary](00-executive-summary.md) (волна 1, треки 01–18) и [25 — Deep Research Wave 2](25-deep-research-2-summary.md) (треки 19–24). Эта сводка не повторяет волны 1–2, а закрывает риски, которые до сих пор оставались невзятыми: главный из них — **юридический риск имени «Decode»** (был «невзятым риском проекта» в [00]), а также data-model/комплаенс, метрики-резолв и тон для уязвимой аудитории.

> **⚠️ ОПРОВЕРГНУТЫЙ факт (учтён ниже, не опираться на исходную формулировку трека 28):**
> Трек [28 §5.1](28-metrics-instrumentation.md) дал «PostHog free tier = 1M событий/мес (включая session replay, feature flags, surveys), ~$0.00031/event после free». Перепроверка по [posthog.com/pricing](https://posthog.com/pricing): free tier — это **отдельные помесячные метрики по продуктам, а не один общий пул 1M**: Product Analytics 1M событий, **Session Replay 5 000 записей**, Feature Flags 1M requests, Surveys 1 500 ответов, error-tracking ~100K исключений — каждая метрика биллится своей единицей и сбрасывается помесячно. Overage по product-analytics — **usage-based от $0.0000500/событие** (1–2M) и **дешевле с объёмом** (до ~$0.0000090 на 250M+), а НЕ ~$0.00031/событие. Вывод трека 28 (PostHog free покрывает MVP) **сохраняется** — но при планировании session replay помнить про лимит 5 000 записей и перепроверить тарифы перед билдом.

---

## 1. TL;DR — 10 буллетов

1. **Имя «Decode» как чистый словесный товарный знак в UK почти наверняка не пройдёт** — класс 9 (software, обязателен для приложения) уже занят несколькими живыми знаками «DECODE», включая свежий словесный знак Mipwr Limited (`UK00004214578`, заявка 2025-06-05). Класс 36 (financial) свободен, но недостаточен. Это был «главный невзятый риск проекта» — теперь он подтверждён и количественно очерчен ([26](26-naming-brand-trademark.md)).
2. **Рекомендация по имени: либо составной знак «DecodeFi» (чистый просвет — ни ТЗ, ни домена `decodefi.app`), либо сохранить «Decode» + сильный фигуративный/комбинированный знак (логотип+слово), а не голый словесный.** Все чистые домены `decode.*` заняты, `.app` = $95k, `.money` продаётся ([26](26-naming-brand-trademark.md)).
3. **Финансовые данные — НЕ special category** (Art. 9 UK GDPR) → достаточно Art. 6 lawful basis, DPO формально не обязателен. Но **DPIA обязателен** (сходятся innovative AI + vulnerable individuals + data matching) — сделать до запуска ([27](27-data-model-security-gdpr.md)).
4. **Lawful basis: Contract для core** (скан/декод/хранение — юзер сам просит), Consent только для опций (хранение оригиналов, маркетинг), Legitimate interests для безопасности/аналитики. Не строить core на consent — отзыв ломает услугу ([27](27-data-model-security-gdpr.md)).
5. **Privacy-by-design: по умолчанию НЕ хранить оригинал фото** (только extraction JSON + thumbnail + verbatim/bbox для подсветки), «Keep originals» — opt-in. Это data-minimisation + меньше App Store-декларации + тройной privacy-крючок («no bank connection · no photo storage · ZDR») ([27](27-data-model-security-gdpr.md)).
6. **ZDR реален, но Files API и Batch API его ломают** — документ слать inline через `/v1/messages` (паттерн «file_id один раз» из [08] несовместим с ZDR). CORS под ZDR недоступен → FastAPI-прокси обязателен (он и так есть). По умолчанию Anthropic не тренирует на API-данных ([27](27-data-model-security-gdpr.md)).
7. **Activation — двухступенчатая:** ступень 1 (aha) = **`true_cost_revealed` в Day-0** (момент пейволла, 80–90% решений); ступень 2 (loop-closed) = **`commitment_saved`/`reminder_set` за 7 дней**. North Star = **«Weekly Active Watched Commitments»**, НЕ «decoded docs» (vanity) и НЕ «£ предотвращённых потерь» (недоказуемо + FCA/PII-риск) ([28](28-metrics-instrumentation.md)).
8. **Renewal Radar строить на LOCAL-нотификациях, а не серверном push** — отсутствие bank connection делает дедлайны детерминированными, а local-доставка обходит проблемы наблюдаемости APNs. Архитектурный риск №1 — **iOS 64-pending limit** (дальние дедлайны молча пропадают): горизонт 30–45 дней + rebuild при каждом запуске + серверная страховка ([29](29-retention-notifications.md)).
9. **Doc-type #2 = Insurance renewal letters (НЕ subscription):** FCA ICOBS 6.5 по закону кладёт в одно письмо last-year-vs-this-year премию + auto-renew флаг + дословный «shop around» текст → детерминированный true-cost diff почти из коробки. Subscription — №3, завязать на DMCC-2027 (режим отложен до весны 2027) ([30](30-trap-catalog-expansion.md)).
10. **Главный конкурент удержания — avoidance, не другое приложение** (~43% Gen Z с money dysmorphia избегают «смотреть на деньги»). Дизайн-цель — снизить тревогу настолько, чтобы юзер досмотрел плохую новость. Тон = StepChange + FCA non-judgmental, reading age 9; детерминированный true-cost — «корона доверия» (одна ошибка обрушивает trust, η²=0.141) ([31](31-behavioral-trust-design.md)).

---

## 2. Выжимка решений по областям

### 2.1 Нейминг / бренд / товарный знак ([26](26-naming-brand-trademark.md))

**Что выяснено и решено:**

- **ТЗ-блокер реален.** Словесный знак «DECODE» в классе 9 (software) в UK занят: Mipwr Limited (`UK00004214578`, заявка 2025-06-05, кл. 9/35/41/42), HAL Robotics (`UK00004024817`), K&S Technology, EUIPO-знаки Atomic Austria (`019200392`) и KS Distribution (`018660718`). Любое приложение подаётся в кл. 9 → бареовый словесный «Decode» столкнётся с relative-grounds возражением. Источник — TMview API (агрегатор UKIPO/EUIPO/USPTO).
- **Класс 36 (financial) чист** от бареового «Decode» (только слоган Moody's «DECODE RISK. UNLOCK OPPORTUNITY.» `UK00003992765`), но кл. 36 без кл. 9 недостаточен.
- **App Store GB чист в Finance** — нет финансового «Decode» (есть только QR/Morse/lifestyle в смежных категориях) → слот в Finance и брендовый поиск свободны, но это не юридическая защита и создаёт шум.
- **Домены:** `decode.com` locked до 2033, `decode.app` = $95 000 (Spaceship), `decode.money` выставлен на продажу (Afternic/GoDaddy), `decode.finance`/`decode.ai` заняты. Свободны только составные: **`getdecode.money`, `trydecode.app`, `decodefi.app`** (RDAP 404).
- **Риск дескриптивного отказа** (TMA 1994 s.3(1)): «Decode» для продукта, который буквально расшифровывает документы, examiner для финуслуг может счесть descriptive. Снижается комбинированным/фигуративным знаком вместо словесного.
- **ASO от имени не зависит:** «Decode» в финансах поискового объёма не даёт. Name (30, макс. вес) = бренд + 1 ключ (`Decode: Money & BNPL Decoder`), Subtitle (30) = выгода-фраза без дублей (`Scan offers, see the true cost`), скрытый keyword field (100) несёт весь BNPL/fees/credit-объём. Не дублировать слова между полями.
- **Бренд-направление «спокойный финансовый страж»:** tone of voice спокойный/прямой/без алармизма для 18–25 BNPL («честный старший друг, не банк»); сильный фигуративный знак полезен вдвойне — снижает ТЗ-риск + отстраивает от Decode-кластера (Decoded Ltd edtech, decode.agency, Decode Fintech).

> **Дисклеймер трека:** это аналитика по реестрам через TMview (официальные формы UKIPO/EUIPO отдавали 403 боту), не юрзаключение — перед подачей нужен clearance у UK-поверенного по ТЗ.

### 2.2 Data-model / безопасность / UK GDPR ([27](27-data-model-security-gdpr.md))

**Что решено для билда (надстройка над [08](08-tech-rag-backend.md)/[09b](09b-fca-boundary-verified.md)/[23](23-ai-eval-extraction.md)):**

- **Reference-схема сущностей** (Postgres/Supabase): `profiles`, `documents`, `extractions` (jsonb structured output + денормализованные типизированные поля для SQL), `commitments`, `traps`, `reminders`, `qa_sessions`/`qa_messages` (с citations jsonb), `doc_chunks` (pgvector только для cross-vault), `processing_jobs` (SSE-статус), shared `trap_catalog`/`consumer_rights_kb`, служебные append-only `consent_log`/`audit_log`/`deletion_log`. Принцип: каждая user-таблица несёт `user_id` и закрыта RLS `auth.uid() = user_id`.
- **Финансовые данные ≠ special category** (Art. 9 список их не содержит) → только Art. 6, не Art. 6 + Art. 9 condition; DPO формально не обязателен. «Apple Sensitive Info» (раса/ориентация/религия) — другое понятие, к Decode не относится. Политика «не извлекать special-category» при случайном попадании (медстраховка → здоровье).
- **DPIA обязателен** — сходятся ICO-триггеры innovative AI + vulnerable individuals (ICO прямо называет «credit rating» и молодёжь) + data matching (cross-vault). Структура DPIA: описание data-flow (камера → RN → FastAPI → Claude US под ZDR → Supabase London) → necessity/proportionality → риски → меры → остаточный риск + ревью UK-DP-практика.
- **Lawful basis:** Contract (Art. 6(1)(b)) для core, Consent (Art. 6(1)(a)) только для опций (Keep originals, маркетинг), Legitimate interests (Art. 6(1)(f)) для безопасности/аналитики + LIA. Нельзя свопать основания задним числом.
- **Supabase:** eu-west-2 (London) подтверждён authoritative `regions.ts` (регион не меняется → выбрать сразу; fallback Frankfurt); AES-256 always-on; SOC2/ISO27001/HIPAA. **Главный риск — RLS off by default** (CVE-2025-48757: 170+ апп слили данные через anon-key): RLS на каждой таблице/бакете, обёртка `(select auth.uid())` (+94–99% к скорости), `service_role` только на сервере. Sign in with Apple через **native flow** (избегаем 6-мес. ротации .p8), UI переживает relay-email/пустое имя. Бакет `documents/` private + signed URLs.
- **Anthropic:** ZDR-eligible — `/v1/messages`, inline PDF/vision, citations, prompt caching, structured outputs, 1M context, `inference_geo`; **НЕ ZDR-eligible — Files API (ломает «file_id один раз» из [08]) и Batch API**. CORS под ZDR недоступен → FastAPI-прокси обязателен. По умолчанию Anthropic не тренирует на API-данных. US-transfer легитимизировать через Anthropic DPA + EU SCC / UK IDTA (15-дн. нотис на субпроцессора; AWS/GCP).
- **Privacy-by-design:** дефолт `keep_originals=false`, оригинал удаляется после extraction; хранить verbatim-цитаты + page/bbox в `traps`/`extractions` (для подсветки без файла); полный re-render страницы только при opt-in.
- **App Store privacy labels:** декларировать Financial Info, User Content→Photos (если храним), Contact Info (Apple relay), Identifiers, Usage Data, Diagnostics — Linked, **Track = None** (нет ad-SDK/брокеров → ATT-prompt не нужен). Payment Info НЕ декларируется (Apple IAP вне аппа). «Регулируемо-финансовое» исключение к Decode НЕ применяется (не authorised + фото = primary functionality).

### 2.3 Метрики / инструментирование ([28](28-metrics-instrumentation.md))

**Что решено — резолв открытого вопроса №7 из [00](00-executive-summary.md):**

- **Activation двухступенчатая.** Ступень 1 (aha) = **`true_cost_revealed` в Day-0** — «experiencing the value» в чистой форме wedge'а, совпадает с моментом пейволла (80–90% решений); time-to-value целимся в секунды (vs SaaS-бенчмарк <15 мин). Ступень 2 (loop-closed) = **`commitment_saved`/`reminder_set` за 7 дней** — переход к Watch-слою (за это платят, H5). «First result viewed» отвергнут (recognition, не value); «first reminder» в одиночку — ловушка Little Birdie. Цели MVP (гипотезы): aha ≥40%, loop-closed ≥50% от активированных.
- **North Star = «Weekly Active Watched Commitments» (WAWC).** Прогнан через критерии Amplitude (выражает ценность / leading / не vanity). Отвергнуты «decoded docs» (vanity/input-метрика) и «£ предотвращённых потерь» (недоказуемый контрфактуал + FCA-запрет обещать экономию + PII-риск). Input-метрики: activated users, decode→save conversion, reminder-set rate, multi-commitment rate. Anti-NSM (зафиксировать): total scans, DAU, downloads, MRR.
- **Event-таксономия** в `object_action` past-tense snake_case: воронка `app_opened → signed_up → capture_started → decode_completed → true_cost_revealed (ACTIVATION) → commitment_saved → reminder_set → paywall_viewed → subscription_started` + Watch-слой (`reminder_opened` = главный return-триггер, `cockpit_viewed`, `price_rise_detected`). Биллинг-события серверные через RevenueCat webhooks (иначе теряются отмены вне сессии). **Минимум для Day-0 — 11 событий.**
- **Стек: PostHog Cloud EU (Frankfurt) + RevenueCat**, единый источник, без двойного инструментирования; EU-резидентность совпадает с Supabase eu-west-2 / UK GDPR (см. опровержение во врезке про free-tier — лимиты раздельные, но MVP покрывают). Серверные продуктовые события (decode_completed/failed, latency, price_rise) из FastAPI.
- **Жёсткий PII-фильтр:** ноль содержимого документов, имён/email; суммы £ только бакетами (`true_cost_bucket`). Конфиг PostHog: `host=eu.i.posthog.com`, `defaultOptIn=false` (consent переиспользует Apple 5.1.2(i) AI-consent), `disableGeoip=true`, session replay выкл (или только онбординг/пейволл с маскированием), `before_send`-страховка. Privacy Manifest: tracking=NO ⇒ ATT-prompt не нужен.
- **Retention — НЕ N-day, а unbounded помесячно + ценностное return-событие** (`decode_completed`/`reminder_opened`/`cockpit_viewed`, не голый `app_opened`), т.к. Decode — low-frequency utility (Airbnb-кейс Amplitude). Day-7 7%-правило — только ранний PMF-предохранитель на 15.07. Главная когорта: **loop-closed vs scan-only** (её расхождение доказывает, что Watch-слой = моат).
- **Инструментировать в первом TestFlight-билде до 15.07.2026** — запуск на инфоповоде BNPL Regulation Day = единственный шанс снять baseline всплеска.

### 2.4 Retention / нотификации (Watch-слой / Renewal Radar) ([29](29-retention-notifications.md))

**Что решено для билда:**

- **LOCAL-first архитектура.** Дедлайны BNPL детерминированы (нет bank connection → известны заранее) → Renewal Radar на `expo-notifications` local schedule (`DateTriggerInput`/`CalendarNotificationTrigger`), а не на APNs push. Серверный push подтверждает только приём, не доставку; silent push не гарантирован iOS; протухшие токены — тихая потеря. Серверный push оставить для win-back, T&C-предупреждений, broadcast и страховки дальних дедлайнов.
- **iOS 64-pending limit — архитектурный риск №1:** система держит max 64 запланированных local-нотификации, оставляет 64 ближайших и **молча отбрасывает остальные** (повтор = 1). Несколько планов × платежей × ремайндеров мгновенно упираются → дальние (самые ценные) дедлайны пропадают. Решение: горизонт 30–45 дней + rebuild расписания при каждом запуске + логировать `getAllScheduledNotificationsAsync().length` + серверная страховка.
- **Тайминг разрешения — НЕ на первом запуске, а сразу после первого успешного скана** с кастомным pre-prompt (контекстный запрос почти утраивает opt-in; промпт даётся один раз). Provisional authorization (`allowProvisional`) — тихий ramp-up без промпта (только Notification Center) как fallback. Дефолт: запросить полное разрешение после первого скана.
- **Формула возвращающей нотификации = сумма + последствие + дедлайн + действие.** Каскад на платёж T-3 / T-1 / day-of-утро (макс 2–3); trial-expiry T-2д + T-24ч. Последствие реально: late fee + отметка в Experian/TransUnion, BNPL под FCA с 15.07.2026 — легитимная, не fake срочность. Тон supportive-without-shame для 18–25.
- **Anti-Bobby** (из App Store changelog Bobby): отменять нотификации при удалении/закрытии плана; проверять разрешение на каждом запуске + in-app индикатор статуса с deep-link в Settings; rebuild против неконсистентности на длинном горизонте.
- **Over-notification caps:** Tier-1 (дедлайны) всегда; Tier-2/3 (streak/промо) ≤3/день, ≤5/неделю, suppress при silent opt-out (5 без открытия). Главная метрика — **push-to-action completion**, не open-rate. Interruption level: `timeSensitive` для платёжных дедлайнов (с entitlement), `active/passive` для остального. Тест только на реальном iPhone.
- **Retention-апсайд:** opted-in iOS почти вдвое выше retention; weekly push +440%, daily+ +820%; контекстные кампании open-rate 14.4% vs 4.19% generic; finance — лидер по opt-in.

### 2.5 Trap-каталог: doc-type #2 ([30](30-trap-catalog-expansion.md))

**Что решено — расширение [10b](10b-trap-tc-corpus.md) после BNPL:**

- **Doc-type #2 = Insurance renewal letters (auto + home + pet/health), НЕ subscription.** Три причины: (1) FCA ICOBS 6.5 + PS21/5 по закону структурируют письмо так, что last-year-vs-this-year премия + auto-renew флаг + дословный prescribed-текст лежат в одном документе → детерминированный true-cost diff без вендор-зависимости, переиспользует BNPL-движок; (2) самая измеримая боль — loyalty penalty £708M/год (home insurance), до 100% прибыли страховщиков; (3) регуляторика стабильна (GIPP с 01.01.2022), тогда как subscription-режим DMCC отложен до весны 2027.
- **Verbatim insurance-маркеры готовы для парсера:** (a) auto-renew statement; (b) «Last year you paid £X» vs «Your renewal price is £Y»; (c) prescribed-текст **«You have been with us a number of years. You may be able to get the insurance cover you want at a better price if you shop around.»** (флаг 4+ ренью = loyalty penalty, severity HIGH — сам регулятор говорит «ты переплачиваешь»); (d) CPA/recurring-card mandate; (e) cancellation/admin fee. Цена ошибки: cancel fee £25 (cooling-off) / £64 (после).
- **Subscription = №3, завязать на DMCC-2027.** Боль крупнее (£1.6млрд/год ненужные подписки, 3.6M trial-rollover + 1.3M auto-renew) и ближе 18–25, НО маркеры в чекаут-флоу, а не в одном документе, и защитный DMCC-режим отложен до весны 2027 (DBT response 02.04.2026). Триггер roadmap: как только DMCC вводит durable-medium reminders — у подписок появляется парсимая структура.
- **Telecom (#4):** inflation-linked «CPI + 3.9%» trap Ofcom прибил для новых контрактов с 17.01.2025, но НЕ ретроспективно (~6/10 старых контрактов всё ещё содержат); exit fees £25–£75/fuel (energy), ETC £100–£300 (broadband). **Gym (#5):** David Lloyd 12-мес minimum + 3-мес notice + 50% early fee; PureGym 4-working-days notice; OFT/High Court признал unfair notice-to-payment-provider и CRA-debt-threat (держать как high-severity для 18–25 — удар по кредитному рейтингу перед арендой/кредитами).
- **Кросс-тип таксономия для AI-eval trap-детектора** (повторяется во всех doc-type): **auto-renewal-by-default**, **lock-in/minimum-term**, **asymmetric-exit (fee/notice/phone-only)**, **silent-price-escalation**. Переиспользуемая поверх BNPL → insurance → subscription → telecom → gym.

### 2.6 Behavioral / trust / copy ([31](31-behavioral-trust-design.md))

**Что решено (дополняет [04](04-ux-ai-trust-patterns.md) — механику UI-доверия; здесь эмоция/поведение/тон):**

- **Главный конкурент удержания — avoidance, не другое приложение.** ~43% Gen Z / ~41% millennials имеют money dysmorphia, типичная защита — «not checking accounts to avoid panic». Дизайн-цель Decode — снизить тревогу настолько, чтобы юзер досмотрел плохую новость и сделал безопасный следующий шаг. Тревога — не побочка, а главный конкурент удержания.
- **Снять вину с пользователя by design:** ошибка скана = «We couldn't read this clearly — try better light» (вина на продукт), не «Invalid document»; дорогой оффер = «This plan would cost you £X more» (плохой объект — план), не «You're about to make a bad decision». Self-Determination Theory (autonomy/relatedness/competence) — антидот к беспомощности; pull-based помощь > push-туториал.
- **Детерминированный true-cost — «корона доверия».** В финансовом human-AI контексте одна видимая ошибка обрушивает trust (η²=0.141), объяснение чинит лишь частично (η²=0.086). «Calculated, not AI» стартует с кредитом доверия (AI trust 4.79 > human 4.44), но кредит сгорает от первой ошибки → готовить trust-repair экран заранее. Лёгкий cognitive-forcing на high-stakes («tap to see why») снижает слепое over-reliance.
- **Этичная loss-aversion = посчитанная потеря на плане, короткий горизонт, без ранжирования.** «£42 more by Christmas» — да; «ты тратишь хуже 80%» — нет (social rank демотивирует money-dysmorphic). Fear appeals дают малый эффект (d=0.29) и работают только с efficacy/конкретным шагом — голая угроза бесполезна. Избегать extrinsic-геймификации (подрывает intrinsic motivation). Decode = nudge, не sludge; собственный UX обязан быть чист от dark patterns.
- **Тон = StepChange + FCA: non-judgmental, plain English, risk с equal prominence, но без CAPS/устрашения.** Word-swaps («money» не «funds»), «a lot of people miss this», «the choice is yours», сигнпостинг к помощи вместо dead-end. Готовые do/don't таблицы для summary / trap / Q&A (§4.3 трека) → перенести в копи-гайд. Q&A: verbalized uncertainty + citation + автономия («Based on page 2, looks like yes — double-check the highlighted line. The choice is yours.»).
- **Reading age = 9 (GOV.UK), Flesch 60–70 — измеримо** (18% взрослых UK ≤ Level 1). Онбординг: прогрессивное раскрытие, pull-based помощь, value-first («выдох» от первого скана до запроса данных/подписки), icons+labels, автономия темпа («Skip» доступен).

---

## 3. Что меняется для билда / запуска / бренда

### 3.1 Для билда

- **Data-layer ставить сразу по reference-схеме [27](27-data-model-security-gdpr.md):** Supabase-проект в **eu-west-2 (London)** (регион не меняется); `Enable RLS on new tables` project-wide + owner-policy `(select auth.uid()) = user_id` на ВСЕХ user-таблицах и `storage.objects`; `service_role` только в FastAPI, anon-key только за RLS; Sign in with Apple native-flow.
- **Anthropic-интеграция под ZDR:** документ передаётся **inline через `/v1/messages`**, НЕ через Files API (несовместим с ZDR) — это корректирует паттерн «file_id один раз» из [08](08-tech-rag-backend.md); все вызовы через FastAPI-прокси (CORS под ZDR недоступен); заявку на ZDR подать заранее (per-organization, Sales). Никаких feedback-фич, шлющих контент в Anthropic, без opt-in.
- **Privacy-by-design в схеме:** `keep_originals=false` по умолчанию, удалять оригинал после extraction, хранить verbatim+page/bbox в `traps`/`extractions` для подсветки без файла; `consent_log`/`deletion_log` append-only; каскадное erasure (вкл. Storage) + бэкапы раскрыты; DSAR/export/rectification endpoints.
- **Инструментирование в первом TestFlight-билде (до 15.07.2026):** PostHog Cloud EU (Frankfurt) + RevenueCat; 11 событий минимум; биллинг-события серверные через RevenueCat webhooks; жёсткий PII-фильтр (суммы только бакетами); `defaultOptIn=false`/`disableGeoip=true`/replay выкл; activation = `true_cost_revealed` (Day-0), NSM-инструменты = `commitment_saved`/`reminder_set`.
- **Renewal Radar — local-first:** `expo-notifications` для всех известных дедлайнов; **64-pending guard** (горизонт 30–45 дней + rebuild-on-launch + логирование счётчика); запрос разрешения после первого скана с pre-prompt; anti-Bobby (отмена нотификаций при удалении плана + проверка статуса на каждом запуске); каскад T-3/T-1/day-of; `timeSensitive` для дедлайнов; тест на реальном iPhone.
- **Trap-движок: заложить insurance как doc-type #2** с готовым набором verbatim-маркеров (§2.5), переиспользуя BNPL true-cost-движок; trap-детектор строить на кросс-тип таксономии (auto-renewal / lock-in / asymmetric-exit / silent-price-escalation), а не на отдельных правилах per-type — это вход и для AI-eval-гейта [23](23-ai-eval-extraction.md).
- **Trust-repair экран как штатное состояние, не ошибка:** если расчёт/скан ошибся — экран с объяснением «почему» (он реально чинит доверие, η²=0.086). Readability-чекер на ключевых строках в CI (целевой Flesch 60–70).

### 3.2 Для запуска / GTM

- **DPIA + privacy policy подписаны до 15.07.2026** (innovative AI + vulnerable + data matching); App Store privacy labels с **Track = None** как явный privacy-маркер; privacy-стори в онбординге/ASO: «no bank connection · we don't keep your photos by default · zero-data-retention with Anthropic · UK data residency».
- **North Star для лендинга/портфолио = WAWC и activation-rate с time-to-value в секундах**, НЕ «£ предотвращённых потерь» на дашборде/лендинге (FCA не разрешает обещать экономию; формулировка для кейса — «traps detected with potential cost £X», описывает обнаруженное, не сэкономленное).
- **Нотификации = retention-двигатель запуска:** каждый платёжный цикл BNPL — легитимный повод вернуть юзера; opted-in iOS почти вдвое выше retention. Запрос разрешения после первого скана (не на cold-старте) — выровнено с тем же Day-0-моментом, что и пейволл [21](21-pricing-monetization.md).

### 3.3 Для бренда

- **Рекомендация по имени (см. §4):** при сохранении «Decode» — обязателен сильный фигуративный/комбинированный знак (логотип+слово), а не голый словесный; домен — составной (`trydecode.app`/`getdecode.money`) либо покупка `decode.money`. Альтернатива с чистым просветом — «DecodeFi». Любое решение → clearance у UK-ТЗ-поверенного перед подачей.
- **Tone of voice бренда = трек [31] do/don't:** «спокойный финансовый страж / честный старший друг, не банк» — конкретизирован: non-judgmental, plain English (reading age 9), risk с equal prominence без CAPS/устрашения, нормализация вместо ранжирования, автономия в конце («the choice is yours»), ноль confirmshaming/dark patterns в самом продукте.
- **Визуальное направление:** иконография «декодирования» (шумный текст → чистый) предпочтительнее буквальных замков/щитов; спокойная палитра (deep teal из [19](19-design-ios-hifi.md)) согласуется с «calm financial guardian»; цвет «дорого» — янтарь/нейтраль, не агрессивный красный.

---

## 4. Рекомендации: имя и doc-type #2

### 4.1 Имя

**Проблема:** бареовый словесный знак «Decode» в классе 9 в UK почти наверняка не пройдёт (Mipwr + др.), а все чистые домены `decode.*` заняты/дороги. Это был «главный невзятый риск проекта» из [00] — теперь подтверждён ([26](26-naming-brand-trademark.md)).

**Три пути по убыванию надёжности:**

1. **«DecodeFi» (самый чистый просвет).** Ни ТЗ «DECODEFI», ни домена `decodefi.app` не найдено; «-Fi» читается как финтех и отстраивает от плотного DECODE-кластера в кл. 9. Минус — слом текущей узнаваемости имени «Decode» в материалах волн 1–2.
2. **Сохранить «Decode» + сильный фигуративный/комбинированный знак** (логотип+слово), регистрировать в кл. 36 (свободен) и, с принятием риска, кл. 9. Комбинированный знак снижает и ТЗ-риск, и риск дескриптивного отказа, и идеально ложится на позицию «спокойного финансового стража». Домен — `trydecode.app`/`getdecode.money` (свободны) или покупка `decode.money`.
3. **«Decode» как маркетинговое имя без сильного ТЗ** — самый дешёвый, но самый рискованный (коллизия с Mipwr/Decoded, размывание). Не рекомендуется.

**Рекомендация синтеза:** если приоритет — минимизировать юридический риск, брать **DecodeFi**; если приоритет — сохранить наработанную узнаваемость «Decode», идти путём **2** (комбинированный знак + кл. 36 + составной/купленный домен), но обязательно с clearance у UK-поверенного до подачи и до больших трат на бренд-ассеты.

### 4.2 Doc-type #2

**Рекомендация: Insurance renewal letters** (не subscription) — единственный кандидат, где регулятор (FCA ICOBS 6.5) *по закону* кладёт в один документ всё для wedge (last-year-vs-this-year премия, auto-renew флаг, prescribed «shop around» сигнал) → детерминированный true-cost diff почти из коробки, минимальная доработка BNPL-движка, самая измеримая боль (£708M/год), стабильная регуляторика (GIPP с 01.01.2022). **Порядок каталога:** BNPL (есть) → **Insurance renewal (#2)** → Subscription/SaaS (#3, к DMCC-2027) → Telecom/Utility (#4) → Gym (#5) ([30](30-trap-catalog-expansion.md)).

---

## 5. Открытые вопросы (verify before / during фазы)

1. **Clearance имени у UK-ТЗ-поверенного не проведён** — данные [26] получены через TMview (UKIPO/EUIPO web-формы отдавали 403 боту); номера заявок проверяемы вручную, но это аналитика по реестрам, не юрзаключение. Решение «DecodeFi vs Decode+фигуратив» и подачу финализировать после clearance ([26](26-naming-brand-trademark.md)).
2. **Решение по имени блокирует бренд-ассеты и домен** — пока не выбрано (DecodeFi vs Decode), не покупать дорогой домен и не финализировать логотип/иконку; ASO Name-кандидаты зависят от выбора ([26](26-naming-brand-trademark.md)).
3. **PostHog free-tier — раздельные помесячные лимиты, не один пул** (см. опровержение во врезке): session replay 5 000 записей, overage product-analytics от $0.0000500/событие. Перепроверить тарифы на [posthog.com/pricing](https://posthog.com/pricing) перед билдом, особенно если планируется replay ([28](28-metrics-instrumentation.md)).
4. **Activation/loop-closed цели (aha ≥40%, loop-closed ≥50%) — гипотезы**, перекалибровать на живых данных первого TestFlight; финансовая активация традиционно низкая (~5%), но wedge снимает главный барьер — реальная планка неизвестна до запуска ([28](28-metrics-instrumentation.md)).
5. **ZDR — заявка per-organization, ревью Anthropic, не включается автоматически** — подать заранее и подтвердить в контракте до того, как продакшен-трафик пойдёт через Claude; проверить EU-routing через `inference_geo` ([27](27-data-model-security-gdpr.md)).
6. **ICO-guidance под пересмотром** из-за Data (Use and Access) Act (закон 19.06.2025; lawful-basis guide обновлён 02.04.2026) — DPIA и privacy policy писать по актуальной редакции; подписать у UK-DP-практика ([27](27-data-model-security-gdpr.md)).
7. **64-pending overflow на реальных нагрузках** — нужно протестировать на iPhone с реалистичным числом планов × платежей × ремайндеров, что rebuild-on-launch + горизонт 30–45 дней реально удерживают дальние дедлайны; серверная страховка — обязательный backstop ([29](29-retention-notifications.md)).
8. **DMCC subscription-режим (весна 2027) — триггер для doc-type #3:** мониторить DBT/legislation.gov.uk; до введения durable-medium reminders subscription-парсинг не имеет жёсткой структуры — не строить #3 раньше ([30](30-trap-catalog-expansion.md)).

---

## 6. Индекс файлов 26–31

| # | Файл | Трек | Суть |
|---|---|---|---|
| 26 | [26-naming-brand-trademark.md](26-naming-brand-trademark.md) | naming / brand / trademark | ТЗ-риск «Decode» реален (кл. 9 занят Mipwr и др., кл. 36 чист); домены `decode.*` заняты/дороги; App Store Finance чист; рекомендация DecodeFi или Decode+фигуративный знак; ASO Name/Subtitle/keyword-стратегия; бренд-направление «calm guardian» |
| 27 | [27-data-model-security-gdpr.md](27-data-model-security-gdpr.md) | data-model / security / GDPR | Reference-схема Postgres/Supabase + RLS; финданные ≠ special category, DPIA обязателен; lawful basis Contract/Consent/LI; Supabase eu-west-2 + RLS-риск (CVE-2025-48757); ZDR с Anthropic (Files API/Batch несовместимы); privacy-by-design (не хранить оригиналы); App Store labels Track=None |
| 28 | [28-metrics-instrumentation.md](28-metrics-instrumentation.md) | metrics / instrumentation | Резолв вопроса №7: activation двухступенчатая (`true_cost_revealed` Day-0 + loop-closed 7д); North Star = WAWC; event-таксономия (11 событий Day-0); PostHog Cloud EU + RevenueCat; PII-фильтр; retention unbounded loop-closed vs scan-only; инструментировать до 15.07 |
| 29 | [29-retention-notifications.md](29-retention-notifications.md) | retention / notifications | Renewal Radar на LOCAL-нотификациях (нет bank connection → детерминированные дедлайны); iOS 64-pending limit = риск №1 (горизонт 30–45д + rebuild); разрешение после первого скана + provisional; формула сумма+последствие+дедлайн+действие; anti-Bobby; over-notification caps; push-to-action метрика |
| 30 | [30-trap-catalog-expansion.md](30-trap-catalog-expansion.md) | trap-expand | Doc-type #2 = Insurance renewal letters (FCA ICOBS 6.5 → true-cost diff из коробки, £708M/год), НЕ subscription (#3, к DMCC-2027); verbatim-маркеры insurance/subscription/telecom/gym; кросс-тип таксономия (auto-renewal/lock-in/asymmetric-exit/silent-price-escalation) |
| 31 | [31-behavioral-trust-design.md](31-behavioral-trust-design.md) | behavioral-trust | Avoidance (money dysmorphia ~43% Gen Z) — главный конкурент удержания; true-cost = корона доверия (одна ошибка η²=0.141, trust-repair экран); этичная loss-aversion (посчитанная потеря, короткий горизонт, без ранжирования); тон StepChange+FCA non-judgmental; reading age 9; do/don't для summary/trap/Q&A |

**Связанные файлы волн 1–2 (для контекста):** [00-executive-summary.md](00-executive-summary.md) (вопрос №7 — резолвлен треком 28; «риск имени» — закрыт треком 26) · [25-deep-research-2-summary.md](25-deep-research-2-summary.md) (волна 2) · [04-ux-ai-trust-patterns.md](04-ux-ai-trust-patterns.md) (механика UI-доверия — успешник 31) · [08-tech-rag-backend.md](08-tech-rag-backend.md) (база, скорректирована 27 по Files API/ZDR) · [09b-fca-boundary-verified.md](09b-fca-boundary-verified.md) (FCA-граница — вход для 27 lawful basis и 31 copy) · [10b-trap-tc-corpus.md](10b-trap-tc-corpus.md) (BNPL trap-корпус — расширен 30) · [21-pricing-monetization.md](21-pricing-monetization.md) (Day-0 пейволл — выровнен с 28/29) · [23-ai-eval-extraction.md](23-ai-eval-extraction.md) (extraction-схема — вход для 27 и 30 trap-taxonomy). Дизайн-токены: [../docs/DESIGN.md](../docs/DESIGN.md); JTBD: [../docs/product/jtbd.md](../docs/product/jtbd.md).
