# Decode — Метрики и инструментирование (трек 28)

**Дата:** 2026-06-18 · **Назначение:** резолвит [Открытый вопрос №7 из 00-executive-summary.md](00-executive-summary.md) («что считать activation и North Star») + проектирует event-таксономию, retention-когорты и стек аналитики ДО билда, чтобы success-метрики были измеримы с Day 0. Платформа: Expo (RN), iOS-first UK, freemium £4.99/мес, запуск 15.07.2026.
**Метод:** start-from-the-metric (метрика → событие; событие без метрики удаляется), `object_action` past-tense snake_case, не over-instrument на MVP. Источники — первоисточники (PostHog/Amplitude/RevenueCat/Apple) + внутренний ресёрч 01–25.

> **Принцип №1 (из skill `metrics-instrumentation`):** *«Instrumenting after launch — you lose the baseline and can't measure the launch itself».* Запуск привязан к инфоповоду 15.07.2026 (BNPL Regulation Day) — это **единственный шанс** снять baseline всплеска. Инструментирование должно быть в первом TestFlight-билде, не после.

---

## 1. Контекст: какой это продукт с точки зрения метрик

Три факта из ресёрча, определяющие весь дизайн метрик:

1. **Low-frequency utility, не daily-engagement продукт.** Core job (J1) срабатывает «когда у меня в руках BNPL-оффер» ([jtbd.md](../docs/product/jtbd.md)) — это эпизод, а не привычка. По классификации Amplitude natural-usage-frequency: Decode ближе к Airbnb/expense-reporting, чем к TikTok — *«It makes no sense for Airbnb to calculate 30-day retention rates because people don't use Airbnb on a weekly or monthly basis»* ([Amplitude — product usage interval](https://amplitude.com/blog/product-usage-interval)). **Следствие:** DAU/WAU как North Star — vanity-метрика и ловушка; ретеншн надо считать в естественном интервале продукта (≈месяц), а не Day-1/Day-7 буквально.
2. **Wedge — это loop Scan → Understand → Watch.** Ценность реализуется не на скане, а когда обязательство попадает под наблюдение (Vault + Radar). Это смещает и activation, и North Star в сторону «watched commitment», а не «decoded doc».
3. **Решение о монетизации — Day 0.** *«80–90% trial starts происходят в Day 0»*, лучший момент пейволла — сразу после первого успешного decode ([21-pricing-monetization.md](21-pricing-monetization.md) §3.2, [RevenueCat](https://www.revenuecat.com/state-of-subscription-apps/)). Значит воронка install→upgrade почти целиком — это одна сессия Day 0, и инструментировать её надо плотно именно там.

Жёсткие privacy-инварианты, которые ограничивают, ЧТО можно логировать (из [08-tech-rag-backend.md](08-tech-rag-backend.md), [09b](09b-fca-boundary-verified.md), Apple 5.1.2(i)): **никогда не отправлять в аналитику содержимое документов, суммы £ конкретного пользователя как PII, имена/email**. Аналитика видит только структуру поведения (типы событий, категории, severity-бакеты), не контент. Это и комплаенс, и差ifferentiator («no bank connection / we never sell your data» из онбординга — нельзя противоречить ему телеметрией).

---

## 2. Activation-метрика (резолв открытого вопроса)

### 2.1 Развилка: «first result viewed» vs первый «aha» vs первый reminder

Skill-правило: *«The Activation point is when your customers start experiencing the value promised»* — НЕ точка узнавания (aha-recognition), а точка переживания ценности ([Amplitude North Star](https://amplitude.com/books/north-star/about-north-star-framework)). Прогоняю три кандидата через это и через JTBD-критерии найма ([jtbd.md](../docs/product/jtbd.md) §4):

| Кандидат | Что это | За | Против | Вердикт |
|---|---|---|---|---|
| **A. First result viewed** (`decode_completed` + экран открыт) | Пользователь увидел экран результата | Просто мерить; совпадает с «первой ценностью до регистрации» (Принцип 8) | Слишком рано: «увидел экран» ≠ «понял ценность». Может быть пустой/error-результат. Это **aha-recognition**, не activation | Слабый — это leading-сигнал, не activation |
| **B. First aha = true cost number viewed** (`true_cost_revealed`, число развёрнуто) | Пользователь увидел шок-число «True cost: £412 — £319 more than headline» | Это и есть Pull-сила №1 и wow-момент (Plum-паттерн, [00](00-executive-summary.md) §6.3); единый дифференциатор «true cost math»; происходит в Day-0-сессии, где 80–90% решений | Всё ещё одиночный акт, не доказывает, что юзер вернётся; для error/«couldn't read» документов не сработает | **Activation (Day-0 / «Activated»)** |
| **C. First reminder set / commitment watched** (`reminder_set` или `commitment_saved`) | Пользователь сохранил обязательство в Vault и/или включил Radar | Доказывает переход к Watch-слою = к тому, за что платят (H5: WTP за Watch, [jtbd.md](../docs/product/jtbd.md) §7); сильнейший предиктор ретеншна в low-freq продукте | Происходит реже и позже; не у каждого юзера есть «дата» для напоминания | **«Activated-Retained» (настоящая активация loop'а)** |

### 2.2 Рекомендация: двухступенчатая активация

Не выбирать одно — определить **две точки**, потому что у Decode ценность двухфазная (понять → начать наблюдать):

- **Activation (Day-0, «Aha»): `true_cost_revealed` в первой сессии.**
  Метрика: *доля новых пользователей, увидевших true-cost-число своего реального оффера в первые 24 часа.* Это «experiencing the value promised» в самой чистой форме wedge'а и совпадает с моментом пейволла. Time-to-value целимся **< 15 минут** (фактически — секунды; ресёрч обещает «≤30 сек до ценности», [jtbd.md](../docs/product/jtbd.md) §4.1), что в разы лучше SaaS-бенчмарка *«time-to-first-value should be under 15 minutes»* ([digitalapplied](https://www.digitalapplied.com/blog/customer-onboarding-time-to-value-2026-saas-metrics-framework)).
- **Activated-Retained («loop closed»): `commitment_saved` ИЛИ `reminder_set` в первые 7 дней.**
  Метрика: *доля активированных, которые завели хотя бы одно наблюдаемое обязательство.* Это предиктор того, что продукт встроится в жизнь low-freq пользователя.

**Почему не «first reminder» как единственная активация:** ресёрч прямо предупреждает — урок Little Birdie *«standalone-алерты не продаются»* ([00](00-executive-summary.md) §2, [jtbd.md](../docs/product/jtbd.md)); reminder без предшествующего «понял true cost» — это не пережитая ценность, а настройка. Поэтому reminder — вторая ступень, не первая.

**Целевой ориентир.** Бенчмарк активации 2025: средняя по SaaS/AI ~37.5%, FinTech традиционно низко (~5%), AI-tools высоко (~54.8%) ([agilegrowthlabs](https://www.agilegrowthlabs.com/blog/user-activation-rate-benchmarks-2025/)). Decode — гибрид (AI-tool UX, finance-домен), но wedge снимает главный барьер finance-активации (нет bank-link, ценность до регистрации) → разумная цель MVP: **activation (aha) ≥ 40%** от тех, кто открыл камеру/share; loop-closed ≥ 50% от активированных. Это гипотезы под перекалибровку на живых данных, не обещания.

---

## 3. North Star (резолв открытого вопроса)

### 3.1 Критерии (Amplitude) применены к трём кандидатам

Хороший North Star: **(1) выражает реализованную ценность для клиента, (2) leading-индикатор (предсказывает, а не отчитывается о прошлом), (3) выражает миссию**; явно НЕ revenue/DAU/registered users — это lagging/vanity ([Amplitude — product north star metric](https://amplitude.com/blog/product-north-star-metric)).

| Кандидат | Ценность клиента? | Leading? | Vanity-риск | Измеримость без банка/PII | Вердикт |
|---|---|---|---|---|---|
| **Decoded documents / week** | Частично — это «активность», не результат | Да | Высокий: считает действие, а не пользу; можно «накрутить» сканами | Легко (`decode_completed`) | Хорош как **input-метрика**, не North Star |
| **£ предотвращённых потерь (savings)** | Максимально — прямо миссия «spotted before it cost you» | Да | Низкий по смыслу, но **высокий риск достоверности**: «предотвращённое» недоказуемо (контрфактуал), а суммы £ — это и FCA-чувствительно (нельзя обещать экономию как маркетинг, [22-gtm](22-gtm-aso-launch.md)), и PII-чувствительно | Сложно и рискованно | **НЕ North Star** (но → портфолио-нарратив, см. §6) |
| **Watched commitments (актуально наблюдаемые обязательства)** | Да — это и есть Big Job (защита от необратимого через наблюдение) | Да — растёт ⇒ продукт встроился в жизнь ⇒ ретеншн/upgrade | Низкий: нельзя накрутить без реального обязательства; коррелирует с WTP-гипотезой H5 | Легко и приватно (count, без сумм) | **★ North Star** |

### 3.2 Рекомендация

> **North Star Metric: «Weekly Active Watched Commitments» (WAWC)** — суммарное число обязательств, находящихся под активным наблюдением (в Vault с не-прошедшей датой Radar) у пользователей, бывших активными за окно.

Обоснование: это единственный кандидат, который (а) выражает миссию Decode (понять и **наблюдать** обязательства), (б) leading для и ретеншна, и upgrade (Watch-слой = платный, H5), (в) приватен и не-vanity. По типологии Amplitude это «productivity/utility»-игра, где ценность = накопленные под защитой обязательства, аналог «количество объектов под управлением». Сравните с эталоном из источника — Facebook *«# users adding seven friends in the first ten days»* и ритейлер *«number of mobile orders delivered»* ([Amplitude](https://amplitude.com/blog/product-north-star-metric)): NSM Decode так же привязан к повторяемому value-действию.

**Input-метрики (то, чем команда двигает NSM):**
1. New activated users (§2, aha-rate) — приток.
2. Decode → save conversion (`decode_completed` → `commitment_saved`) — превращение скана в наблюдаемое.
3. Reminder-set rate среди сохранённых — глубина наблюдения.
4. Returning-to-add rate — добавил ≥2-й документ (тест гипотезы H1: ≥2 BNPL-плана).

**Anti-NSM (зафиксировать, чтобы не сползти):** total scans, DAU, downloads, MRR — это vanity/lagging; используются только как операционные/бизнес-метрики, не как North Star.

---

## 4. Event-таксономия (event spec)

Соглашение: `object_action`, past tense, snake_case. Значения — в properties, не в имени. Идентичность: один стабильный `user_id` (Supabase Auth UUID, **не** email/Apple-relay-email); до регистрации — `anon_id` (PostHog `$device_id`), `alias` при `signed_up`. Все события несут базовый контекст автоматически (app_version, os_version, locale=`en-GB`, plan), его в таблице не повторяю.

> **PII-фильтр (применять к КАЖДОМУ свойству):** никаких сумм £ как сырых чисел-идентификаторов на уровне пользователя, никакого текста документа, имён, адресов, номеров договоров. Суммы — только бакетами (`true_cost_bucket`: `<100 / 100-500 / 500-2k / 2k+`). Это и комплаенс (UK GDPR DPIA, [08](08-tech-rag-backend.md)), и согласованность с обещанием приватности.

### 4.1 Воронка install → upgrade

| Event | Когда срабатывает | Properties (для срезов, без PII) | Метрика, которой служит |
|---|---|---|---|
| `app_opened` | Холодный/тёплый старт | is_first_open, source (organic/aso/referral) | Воронка шаг 0; baseline запуска 15.07 |
| `onboarding_viewed` | Показан welcome-слайд | slide_index | Drop по слайдам (антипаттерн «карусель >3», [00](00-executive-summary.md) §6.7) |
| `ai_consent_granted` | Подтверждён consent на Anthropic (Apple 5.1.2(i)) | — | Комплаенс-гейт; drop здесь = барьер до ценности |
| `signed_up` | Создан аккаунт (Sign in with Apple) | method=apple | Воронка шаг 1; точка `alias` anon→user |
| `capture_started` | Открыт вход скана (камера/share/upload) | input_method (camera/share_extension/upload), is_first | **Знаменатель activation** (см. §2.2) |
| `capture_quality_failed` | Quality-гейт отклонил фото до AI | reason (glare/blur/edge) | Защита «не списать на тупой AI» ([05](05-ux-document-capture.md)); drop-диагностика |
| `decode_started` | Документ ушёл в пайплайн | doc_type (bnpl/credit_card/insurance/subscription/unknown), input_method | Воронка шаг 2 |
| `decode_completed` | Пайплайн вернул результат | doc_type, trap_count, severity_max (high/med/info), confidence_overall, latency_ms_bucket, has_credit_file_flag | **Input-метрика NSM**; качество (latency бюджеты ≤8с/≤20с, [00](00-executive-summary.md) §6.2) |
| `decode_failed` | Пайплайн не справился | failure_reason (couldnt_read/unsupported/timeout) | Reliability; честный-отказ UX |
| `true_cost_revealed` | Aha-число развёрнуто на экране результата | true_cost_bucket, delta_vs_headline_bucket | **★ ACTIVATION (aha)**, §2.2 |
| `result_term_inspected` | Тап по term → подсветка в документе (citation) | term_category | Доверие-сигнал (Принцип 6); глубина просмотра |
| `qa_question_asked` | Задан вопрос в Q&A-шит | from_chip (bool), question_intent (factual/recommendation_blocked) | J4-активность; FCA: доля заблокированных рекоменд-вопросов |
| `correction_made` | Пользователь исправил «Check this» значение | field_category | Доверие/качество extraction; пересчёт true cost |
| `paywall_viewed` | Показан пейволл (после 1-го decode) | trigger (post_first_decode/quota_hit/feature_lock), plan_options | Воронка шаг 3; **80–90% Day-0** |
| `checkout_started` | Тап на план в пейволле | plan (monthly/annual), has_intro_offer | Промежуток paywall→purchase |
| `subscription_started` | Подтверждена подписка/триал (из StoreKit/RevenueCat webhook) | plan, is_trial, price_tier | Воронка шаг 4 (upgrade); trial-start rate |
| `subscription_converted` | Триал → платно (серверное событие) | plan | Trial→paid (бенчмарк-сравнение) |
| `subscription_cancelled` | Отмена/билинг-фейл (серверное) | reason (user/billing_issue), days_since_start | Churn; биллинг-гигиена |

### 4.2 Watch-слой (питает North Star) и retention-петля

| Event | Когда срабатывает | Properties | Метрика |
|---|---|---|---|
| `commitment_saved` | Обязательство сохранено в Vault | doc_type, auto_named (bool), source (post_decode/manual) | **NSM-компонент**; loop-closed (§2.2 ступень C) |
| `reminder_set` | Включён Radar-reminder с датой | lead_time (2d/7d/14d), category | **NSM-компонент**; «Activated-Retained» |
| `reminder_delivered` | Локальный/серверный пуш доставлен | type (renewal/payment_due/price_rise), amount_bucket | Эффективность Radar (offline-first) |
| `reminder_opened` | Пользователь открыл из пуша | type, days_before_due | **Главный return-триггер** в low-freq продукте |
| `overview_viewed` | Открыт home/overview с обязательствами | committed_bucket, commitments_count | Возвраты к Watch-слою |
| `price_rise_detected` | Radar засёк рост цены при renewal | delta_pct_bucket | Proactive-value (whitespace, [00](00-executive-summary.md) §6.6) |
| `vault_unlocked` | Face ID разблокировал Vault | — | Trust-сигнал использования |
| `push_permission_resolved` | Ответ на запрос пушей (ПОСЛЕ 1-го скана) | granted (bool) | Гейт Radar-ретеншна |

**Воронка (ordered) — главная:**
`app_opened → signed_up → capture_started → decode_completed → true_cost_revealed (ACTIVATION) → commitment_saved → reminder_set → paywall_viewed → subscription_started`

Падение между `capture_started`→`decode_completed` = проблема пайплайна/качества фото; между `decode_completed`→`true_cost_revealed` = проблема результат-экрана; между `true_cost_revealed`→`commitment_saved` = слабая связка «Scan→Watch» (шов авто-сохранения); между `paywall_viewed`→`subscription_started` = пейволл/цена.

**НЕ трекаем намеренно (gaps by design):**
- Содержимое документов, конкретные суммы £, имена/email, номера договоров — **PII/комплаенс**.
- Каждый скролл/тап/page_view — шум без метрики (skill: *«events with no owning metric — noise that rots and inflates your bill»*).
- Точный текст вопросов в Q&A — приватность (логируем только intent-категорию).
- Session replay на экранах результата/Vault/Q&A — там содержимое документа; replay допустим **только** на онбординге/пейволле с маскированием (см. §5).
- IDFA / ad-attribution на MVP — нет рекламных кампаний с атрибуцией; не запрашивать ATT-prompt без нужды.

---

## 5. Инструменты (что реально поставить в Expo, privacy-aware)

### 5.1 Сравнение

| Критерий | PostHog | Amplitude | Mixpanel |
|---|---|---|---|
| Free tier | **1M событий/мес** (включая replay, flags, surveys) ([PostHog](https://posthog.com/blog/best-amplitude-alternatives)) | 10K MTU / до 2M событий (Starter) | 100K MTU |
| Модель цены | per-event (~$0.00031/event после free) | per-MTU | per-MTU |
| EU-хостинг | **Cloud EU — Frankfurt (eu-central-1)**, IP-capture выкл. по умолчанию ([PostHog Cloud EU](https://posthog.com/blog/posthog-cloud-eu)) | EU-регион есть (enterprise-tier) | EU-резидентность есть |
| Expo/RN | Нативный SDK, без native-deps вне Expo-пакетов ([PostHog RN](https://posthog.com/docs/libraries/react-native)) | RN SDK | RN SDK |
| Воронки/ретеншн/replay из коробки | Да, всё в одном | Сильнейшая аналитика, без replay | Да, без replay |
| Feature flags / A/B | Включено в free | Отдельно | Отдельно |

### 5.2 Рекомендация: **PostHog Cloud EU + RevenueCat**, единый источник, без двойного инструментирования

- **PostHog Cloud EU** (Frankfurt) — закрывает аналитику, воронки, ретеншн-когорты, feature flags и A/B (нужны для price-tests пейволла, [21](21-pricing-monetization.md)) в одном free-tier; per-event на low-freq продукте дёшево; **EU-резидентность совпадает с Supabase eu-west-2 / UK GDPR DPIA** ([08](08-tech-rag-backend.md)). PostHog — Data Processor, Decode — Data Controller; есть DPA ([PostHog DPA](https://posthog.com/dpa)).
- **RevenueCat** — обёртка над StoreKit 2; единственный надёжный источник subscription-lifecycle (`trial_started`, `trial_converted`, `subscription_cancelled`) через webhooks, с готовой one-click интеграцией в PostHog/Amplitude ([RevenueCat webhooks](https://www.revenuecat.com/docs/integrations/webhooks/event-types-and-fields)). Биллинг-события **серверные** (не клиентские) — иначе теряются отмены/renewal вне сессии. Это закрывает биллинг-риск №1 категории ([02](02-competitor-review-mining.md)).
- **Серверные продуктовые события** (decode_completed/failed, latency, price_rise_detected) шлём из FastAPI через PostHog backend SDK — клиент не врёт о том, что произошло на бэке.

**Почему не Amplitude/Mixpanel первым:** их аналитика сильнее, но free-tier по MTU тесный, replay/flags/experiments — отдельно, и для MVP это переплата сложностью. PostHog даёт «один инструмент = одно решение» (skill: *«Decide once; don't double-instrument»*). Путь миграции открыт: RevenueCat шлёт в Amplitude в один клик, если позже понадобится.

### 5.3 Privacy-конфиг PostHog (обязательные флаги)

Из [PostHog RN docs](https://posthog.com/docs/libraries/react-native) / [GDPR](https://posthog.com/docs/privacy/gdpr-compliance):

```
host: 'https://eu.i.posthog.com'      // EU residency
defaultOptIn: false                    // явный consent ДО трекинга (после ai_consent + privacy-слайд)
disableGeoip: true                     // не резолвить геолокацию по IP
captureMode: events only               // session replay по умолчанию ВЫКЛ
before_send: (event) => …              // финальный PII-фильтр-страховка: дропнуть запрещённые свойства
```

- `optIn()` вызывать только после `ai_consent_granted` (онбординг-консент уже требует Apple 5.1.2(i) — переиспользуем тот же момент, не плодим второй prompt).
- `reset()` на logout.
- Если когда-нибудь включим replay — **только** на онбординг/пейволл, с `ph-no-capture` на любых view с содержимым документа/суммами; на result/Vault/Q&A — никогда.
- **Apple Privacy Manifest** (`PrivacyInfo.xcprivacy`) обязателен с 2024: задекларировать сбор «Product Interaction / Usage Data», **linked = yes, used for tracking = NO** (мы не делаем cross-app tracking) — тогда ATT-prompt не нужен; PostHog числится ATT-совместимым privacy-preserving инструментом ([FPF](https://fpf.org/blog/two-new-apple-and-google-platform-privacy-requirements-kicking-in-now/)).

---

## 6. Retention-когорты для wedge

### 6.1 Метод: НЕ N-day, а action-based в естественном интервале

Decode — low-frequency: применять буквальный Day-1/Day-7 retention неверно (источник прямо предупреждает про Airbnb-кейс, [Amplitude](https://amplitude.com/blog/product-usage-interval)). Используем:

1. **Activation-предиктор Day-7 (для скорости сигнала, не как продукт-ретеншн):** *«7% of your cohort returning on day 7 ⇒ top-25% activation; 69% of top day-7 performers were also top 3-month performers»* ([Amplitude — 7% rule](https://amplitude.com/blog/7-percent-retention-rule)). Считаем как ранний предохранитель PMF на запуске 15.07, а не как KPI здоровья.
2. **Продуктовый ретеншн — unbounded, помесячно.** Unbounded retention = обратная churn, *«вернулся на день N ИЛИ позже»* ([Lenny/Berezovsky](https://www.lennysnewsletter.com/p/measuring-cohort-retention)) — корректно для эпизодического использования: пользователь, вернувшийся через 5 недель с новым оффером, не «отвалился».
3. **Return-событие = ценностное, не `app_opened`.** Считаем «вернулся» по `decode_completed` ИЛИ `reminder_opened` ИЛИ `overview_viewed` — return по голому открытию приложения завышает картину.

### 6.2 Ключевые когорты для wedge

| Когорта | Делим по | Гипотеза, которую проверяет | Связь с ресёрчем |
|---|---|---|---|
| **Activated vs not** (видел true_cost в Day-0) | `true_cost_revealed` ≤24ч | Активация предсказывает удержание (ждём резкое расхождение кривых) | §2; *«users who activate within 3 days are 90% more likely to continue»* ([digitalapplied](https://www.digitalapplied.com/blog/customer-onboarding-time-to-value-2026-saas-metrics-framework)) |
| **Loop-closed vs scan-only** | есть ≥1 `commitment_saved`/`reminder_set` | H5: WTP и ретеншн живут в Watch-слое, не в разовом decode | [jtbd.md](../docs/product/jtbd.md) §7 H5; урок Little Birdie |
| **Multi-commitment** | ≥2 сохранённых обязательства | H1: у сегмента ≥2 одновременных BNPL-плана ⇒ overview (J2) имеет смысл | [jtbd.md](../docs/product/jtbd.md) §7 H1 |
| **Reminder-driven returns** | вернулся через `reminder_opened` | Radar — главный двигатель возврата в low-freq продукте | [00](00-executive-summary.md) §6.6 |
| **Acquisition source** (15.07 PR-всплеск vs organic) | `source` при `app_opened` | Качество PR-трафика инфоповода 15.07.2026 vs органики | [22-gtm](22-gtm-aso-launch.md) |
| **Free vs paid** | `plan` | Различие ретеншна, обоснование цены/границы free | [21](21-pricing-monetization.md) |

Главная гипотеза ретеншна: **кривая loop-closed должна лежать заметно выше scan-only** — если нет, wedge сужается до разового decode (J1) и под угрозой и ретеншн, и монетизация Watch-слоя.

---

## 7. Что мерить специально для портфолио-кейса

Кейс документируется с прицелом на портфолио ([Notion case study deliverable](.)). Метрики, которые делают нарратив сильным (помимо продуктовых выше):

1. **Activation/aha-rate с time-to-value-числом** — «X% активировались за медиану N секунд» — конкретно и сравнимо с бенчмарком «<15 мин» ([digitalapplied](https://www.digitalapplied.com/blog/customer-onboarding-time-to-value-2026-saas-metrics-framework)). Лучшая одна цифра кейса.
2. **Funnel-водопад install→upgrade** с явными drop-точками и тем, что вы по ним сделали (decision → instrument → fix). Демонстрирует метод «start-from-the-metric».
3. **Loop-closed vs scan-only ретеншн-кривые** — визуально доказывает, что Watch-слой = моат, а не фича. Сильный продуктовый инсайт.
4. **£ предотвращённых потерь — как нарратив, НЕ как метрика дашборда.** Считать агрегированно и осторожно (контрфактуал недоказуем; FCA не разрешает обещать экономию в маркетинге, [22](22-gtm-aso-launch.md), [09b](09b-fca-boundary-verified.md)). Формулировка для кейса: *«traps detected with potential cost £X across N decodes»* — описывает обнаруженное, не «сэкономленное». Не выносить на лендинг.
5. **AI-quality срез как продуктовая метрика:** `confidence_overall`, `correction_made`-rate, `decode_failed`-rate, latency-бюджеты (≤8с first token / ≤20с full, [00](00-executive-summary.md) §6.2) — связывает метрики с AI-eval-треком ([23](23-ai-eval-extraction.md)) и показывает зрелость («мы мерили галлюцинации и честные отказы как фичу доверия»).
6. **Experiment log** (price-test, paywall-copy через PostHog flags) — топ-приложения делают ~14.7 экспериментов/год ([21](21-pricing-monetization.md), [Adapty](https://adapty.io/blog/high-performing-paywall-2026/)); даже 2–3 задокументированных теста усиливают кейс.

---

## 8. Минимальный набор для Day-0 (анти-over-instrumentation)

Если резать до абсолютного минимума для первого TestFlight (skill: *«track decisions, not everything»*), достаточно **11 событий**, покрывающих обе метрики-резолва и всю воронку:

`app_opened` · `signed_up` · `capture_started` · `decode_completed` · `decode_failed` · **`true_cost_revealed`** (activation) · **`commitment_saved`** (NSM) · `reminder_set` · `reminder_opened` (return) · `paywall_viewed` · `subscription_started` (+ серверные `subscription_converted`/`cancelled` из RevenueCat — бесплатно через webhook).

Остальные из §4 добавлять, когда конкретный вопрос потребует среза. Не добавлять событие, под которое нет вопроса.

---

## Key takeaways for Decode

1. **Activation — двухступенчатая.** Ступень 1 (aha) = **`true_cost_revealed` в Day-0** (это «experiencing the value», совпадает с моментом пейволла, где 80–90% решений). Ступень 2 (loop-closed) = **`commitment_saved`/`reminder_set` в 7 дней**. «First result viewed» — слишком рано (recognition, не value); «first reminder» в одиночку — ловушка Little Birdie. Цель MVP: aha ≥40%, loop-closed ≥50% от активированных (гипотезы).
2. **North Star — «Weekly Active Watched Commitments».** Не «decoded docs» (vanity/input-метрика) и не «£ предотвращённых потерь» (недоказуемый контрфактуал + FCA/PII-риск). WAWC выражает миссию (наблюдать обязательства), leading для ретеншна и upgrade, приватен, не накручивается. Input-метрики: activated users, decode→save conversion, reminder-set rate, multi-commitment rate.
3. **Стек: PostHog Cloud EU (Frankfurt) + RevenueCat, один источник, без двойного инструментирования.** PostHog free 1M событий/мес покрывает аналитику+воронки+ретеншн+flags+A/B; EU-резидентность совпадает с Supabase eu-west-2 и UK GDPR. Биллинг-события — серверные через RevenueCat webhooks (иначе теряются отмены вне сессии).
4. **Privacy-by-design — жёсткий PII-фильтр.** Никогда не логировать содержимое документов, суммы £ как PII, имена/email; суммы только бакетами. Конфиг: `host=eu`, `defaultOptIn=false`, `disableGeoip=true`, replay выкл (или только онбординг/пейволл с маскированием), `before_send`-страховка. Privacy Manifest: tracking=NO ⇒ ATT-prompt не нужен.
5. **Ретеншн — НЕ N-day, а unbounded помесячно + ценностное return-событие.** Decode — low-frequency utility (как Airbnb): буквальный Day-7 неверен как KPI; Day-7 7%-правило — только ранний PMF-предохранитель на запуске 15.07. Главная когорта: **loop-closed vs scan-only** — её расхождение доказывает, что Watch-слой = моат.
6. **Инструментировать в первом билде, до 15.07.2026.** Запуск на инфоповоде BNPL Regulation Day — единственный шанс снять baseline всплеска; инструментирование после = потеря baseline. Минимум — 11 событий (§8).
7. **Для портфолио:** одна сильная цифра = activation-rate с time-to-value в секундах (vs бенчмарк «<15 мин»); funnel-водопад с drop→fix-решениями; loop-closed retention-кривые; AI-quality-срез как метрика доверия; experiment log.

---

## Источники

- PostHog — [React Native SDK / Expo install + privacy flags](https://posthog.com/docs/libraries/react-native), [Cloud EU (Frankfurt)](https://posthog.com/blog/posthog-cloud-eu), [GDPR compliance](https://posthog.com/docs/privacy/gdpr-compliance), [DPA](https://posthog.com/dpa), [Amplitude alternatives / free tier](https://posthog.com/blog/best-amplitude-alternatives)
- Amplitude — [North Star Framework](https://amplitude.com/books/north-star/about-north-star-framework), [Every product needs a North Star Metric](https://amplitude.com/blog/product-north-star-metric), [7% retention rule](https://amplitude.com/blog/7-percent-retention-rule), [Product usage interval (natural frequency)](https://amplitude.com/blog/product-usage-interval)
- RevenueCat — [Webhook event types & fields](https://www.revenuecat.com/docs/integrations/webhooks/event-types-and-fields), [State of Subscription Apps 2026](https://www.revenuecat.com/state-of-subscription-apps/)
- Бенчмарки активации/TTV — [agilegrowthlabs activation benchmarks 2025](https://www.agilegrowthlabs.com/blog/user-activation-rate-benchmarks-2025/), [digitalapplied TTV framework 2026](https://www.digitalapplied.com/blog/customer-onboarding-time-to-value-2026-saas-metrics-framework)
- Retention-метод — [Lenny/Olga Berezovsky — measuring cohort retention](https://www.lennysnewsletter.com/p/measuring-cohort-retention)
- Apple privacy — [FPF — Apple/Google platform privacy requirements (Privacy Manifest, ATT)](https://fpf.org/blog/two-new-apple-and-google-platform-privacy-requirements-kicking-in-now/)
- Pricing/paywall (внутр.) — [21-pricing-monetization.md](21-pricing-monetization.md), [Adapty high-performing paywall 2026](https://adapty.io/blog/high-performing-paywall-2026/)
- Внутренний ресёрч — [00-executive-summary.md](00-executive-summary.md), [jtbd.md](../docs/product/jtbd.md), [08-tech-rag-backend.md](08-tech-rag-backend.md), [09b-fca-boundary-verified.md](09b-fca-boundary-verified.md), [22-gtm-aso-launch.md](22-gtm-aso-launch.md), [23-ai-eval-extraction.md](23-ai-eval-extraction.md)
