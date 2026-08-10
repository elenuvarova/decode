# Decode — JTBD ↔ user flows

**Фаза:** UX architecture · **Дата:** 2026-06-12 · **Обновлено:** 2026-07-02 — F1/F2/F3/F6 синхронизированы с построенным (Figma + прототип; audit H6) · **Платформа:** iPhone, последняя iOS
**Входы:** [jtbd.md](../product/jtbd.md) (jobs J1–J6, гипотезы), [task4-personas-premortem.md](../research-sprint/task4-personas-premortem.md) (6 требований), [research/00 §6](../../research/00-executive-summary.md) (UX-паттерны + референсы), [task5 VoC](../research-sprint/task5-voc-action-points.md) (инварианты)

Каждый core-job сегмента явно привязан к flow, экранам и сигналу успеха. Это редкий senior-артефакт: показывает, что каждый экран существует ради работы пользователя, а не «потому что так бывает».

---

## 0. Как это собрано

**Core loop продукта:** `Scan → Understand → Decide → Watch`.
**6 требований pre-mortem встроены в flows** (помечены `[PMx]`):
- `[PM1]` Home = Overview (не последний result)
- `[PM2]` Онбординг-ветка «нет документа сейчас» (demo + скан старого письма)
- `[PM3]` Бейдж credit-file — геройский элемент result
- `[PM4]` Пейволл: free = N decodes/мес (полный wedge, но лимит) · Pro = unlimited + полный Vault + Watch/Radar; пейволл **после первого decode** *(ревизия по [research/21](../../research/21-pricing-monetization.md))*
- `[PM5]` Q&A detect-and-signpost для debt-distress
- `[PM6]` Три языка достоверности на result (From document / Calculated / AI)

**Инварианты VoC/комплаенс на всех flows:** no bank connection **на входе** (ввод = share sheet / камера / upload / email-forward — не account-link; опциональный read-only open banking возможен позже как Pro-автоматизация, не как условие входа — [research/33](../../research/33-scope-and-input-strategy.md)); биллинг Apple-IAP-only без карты на free; отмена в 2 тапа; тон без осуждения; запрещены «you should / recommend / switch» (FCA).

Легенда экранов: `[Screen]` = полноэкранный, `{Sheet}` = bottom-sheet, `(System)` = системный диалог. ID экранов сверены с [screen-sitemap.md](screen-sitemap.md).

---

## 1. Карта: job → flow → core-loop шаг

| Job | Pri | Flow | Шаг loop | Главный сигнал успеха (activation) |
|---|---|---|---|---|
| J1 Понять, что подписываю | P0 | **F2 Scan & Decode** | Scan→Understand | Первый decode + просмотр aha-числа и credit-file бейджа |
| J2 Всё в одном месте | P0 | **F5 Overview** | Watch | ≥2 документа в Vault, возврат в overview |
| J3 Напоминание с суммой+последствием | P0 | **F6 Radar** | Watch | Включён первый reminder; открыт alert |
| J4 Спросить простым языком | P0 | **F3 Ask** | Decide | Первый заданный вопрос с переходом к источнику |
| J5 Как выйти/отменить | P1 | **F3 Ask** (под-ветка) | Decide | Просмотр «cancel channel + deadline» |
| J6 Глазами кредитора | P2 | **F7 Vault detail** | Watch→Act | Открыт commitment-detail / export «for lender» |
| (активация) | — | **F1 Onboarding** | вход в loop | Дошёл до первого result (вкл. ветку «нет документа») |
| (монетизация) | — | **F8 Upgrade** | gate Watch | trial→paid на Watch-границе |
| (доверие/гигиена) | — | **F9 Settings & Cancel** | — | отмена в 2 тапа найдена |

---

## 2. Flows (диаграммы + контракты)

### F1 · Onboarding → активация (служит входу в loop, `[PM2]`) — обновлено 2026-07-02 под построенное

```
[Welcome + value mock]  одно обещание: «Understand any financial document in 30 seconds»
   │       + мок result прямо на welcome: карточка «TRUE COST £412» + чип «Credit file: YES»
   │         (бывший отдельный слайд Value mock слит сюда — сознательно: продукт виден с первого экрана)
   │       sub: «Built for the UK · No bank connection required»   ← снимает VoC T-3
   ▼
[Trust & AI consent]  (Onboarding-2-Trust)  no bank link · encrypted · «we never sell data»
   │              + AI-consent с именем Anthropic (Apple 5.1.2(i))   ← обязателен
   ▼
[No-doc / entry choice] [PM2]  (Onboarding-3-NoDoc — полноэкранный, не шит):
   │    • «Try a sample» ──────────────► сразу decode-result на demo-доке (захардкоженный sample)
   │    • «Decode something you signed» ► F2 Scan & Decode
   │    • «Forward an email» ──────────► share-in путь, дальше к Register
   │    • «Skip for now» ──────────────► дальше без документа
   ▼
[Register]  (Onboarding-4-Register) — три опции:
   │    • Sign in with Apple (primary)
   │    • «Continue with email» ─► [email-auth]
   │    • «Skip — keep on device» ─► гостевой/локальный режим (ценность до регистрации)
   ▼
   Overview (empty) → guided first scan
   (push-permission — НЕ здесь, а после первого result, на данных этого документа)
```
**Состояния:** default; «уже есть аккаунт» → email-auth; отказ камеры → upload-путь (в scan-флоу; отдельный camera-праймер в онбординг не вошёл).
**Контракт (обновлено 2026-07-02):** ≤3 слайда до первого действия; первая ценность до регистрации/пейволла — закреплена гостевым режимом «Skip — keep on device»; прежний контракт «Sign in with Apple — единственный auth» отменён (Apple — primary из трёх опций); push спрашиваем после первого скана.
**Успех:** % новичков, дошедших до первого result (включая demo-ветку) — главный activation-gate против F5 pre-mortem.
**Референсы:** Wise/Plum welcome, Fabric value-mock, Plazo trust ([research/15](../../research/15-mobbin-onboarding.md)).

---

### F2 · Scan & Decode — ядро (J1, Scan→Understand)

```
ВХОД: TabBar центр [Scan] · share-extension из Mail · empty-state CTA · demo-ветка онбординга
   ▼
{Capture sheet}  «Снять на камеру / Выбрать фото / Выбрать файл (PDF)» + recent photos
   ▼
[Camera]  авто-capture + live-подсветка края · multi-page (один договор = один документ)
   ▼
[Review]  превью · Retake / Add page · crop ТОЛЬКО как fallback
   │  quality-гейт: blur/glare → диагностика «плохо ✗ / хорошо ✓» + Try again   ← до AI
   ▼
[Processing]  фото остаётся + scan-line + skeleton result
   │  реальные этапы (SSE): Reading → Extracting terms → Calculating cost → Checking traps
   ▼
[Decode-result]  ← ГЛАВНЫЙ ЭКРАН
   │  ① aha-число первым: «True cost: £412 — £64 more than headline»   (Plum-паттерн)
   │  ② [PM3] бейдж-герой: «Goes on your credit file: YES / NO / only if collections»
   │  ③ key terms с риск-лейблами; безопасные схлопнуты («6 terms look standard ⌃»)
   │  ④ [PM6] три языка достоверности:
   │       • «From your document» — tap «from your document ›» / citation → {Source-Highlight} (построен)
   │       • «Calculated, not AI» — бейдж на true cost
   │       • «AI» — на summary/Q&A
   │  ⑤ trap-карточки: факт + £ + 1–2 next step, тон спокойный
   │  ⑥ confidence: «✓ from document» / «Check this» (tap→zoom+правка→пересчёт) / «Couldn't read»
   ▼
   ├──► [Ask] (F3)         спросить по документу
   ├──► [Save & watch] ─► [Saved & watching]  (Save-Watch-Success — обновлено 2026-07-02)
   │       zero-config save: авто-имя «Klarna BNPL offer — 14 May 2026» и даты Radar — автоматически, без шита
   │       строка-подтверждение: «Watching the 28 May payment — we'll remind you 2 days before.»
   │       CTA: Back to Overview · View in Vault · тихий «Adjust reminders» → {Reminder settings}
   └──► [Scan another]     возврат в F2 (Jordan сканирует 4 оффера)
```
**Состояния:** loading (этапы); success (result); partial («couldn't read» секции — честно, экран Result-Error заведён из processing); error (capture-quality / сеть / AI-fail → retake/retry/ручной ввод).
**Контракт (обновлено 2026-07-02):** числа считает детерминированный движок (бейдж «Calculated, not AI»); каждый extracted term тапается в источник — экран {Source-Highlight} построен, PM6 закрыт полностью; правка значения мгновенно пересчитывает true cost; сохранение — zero-config (конфигурационный шит Save+Watch не строился, настройка — за «Adjust reminders»); никаких «you should».
**Успех:** первый decode завершён И просмотрены aha-число + credit-file бейдж (J1 activation).
**Покрывает риски:** F3 (ошибка в числах → 3 языка достоверности), F5 (demo-вход).
**Референсы:** Yuka result-схема, Plum aha, Yazio processing, Docusign/Apple Notes capture, Chime/Starling errors.

---

### F3 · Ask — вопросы и выход (J4 + J5, Decide)

```
ВХОД: кнопка [Ask] на result · долгое нажатие на термин
   ▼
{Q&A sheet}  шторка поверх документа, в шапке — имя оффера (скоуп на документ, не general)
   │  3 чипа-подсказки из найденных trap-флагов:
   │    «Will this affect my credit score?» · «What if I miss a payment?» · «Can they take money if I cancel my card?»
   │
   ├─ обычный вопрос ──► ответ простым языком
   │                     + двухуровневая citation «p.2 §4» → {Source-Highlight} (построен, обновлено 2026-07-02):
   │                       шапка «имя оффера + p.2 §4» · выдержка документа с одной подсвеченной строкой
   │                       · «This is the exact line from your document» · тихий CTA «Report a mismatch»
   │                       → Trust-repair · Done → назад
   │                     + честное «This isn't specified in your agreement» вместо галлюцинации
   │                     + verbalized uncertainty «double-check the highlighted line» (не проценты)
   │
   ├─ J5 «как отменить/выйти» ──► канал + дедлайн отказа из документа (факт, не совет)
   │                              «Cancel by calling X before 14 Nov» + источник
   │
   └─ [PM5] detect debt-distress («should I pay this or that first?», «can I ignore the collector?»)
         ──► НЕ ответ-совет, а {Signpost card}: StepChange / MoneyHelper + «the choice is yours»
             (intent-классификатор + safe-template; запрещённые паттерны в промпте И output-фильтре)
```
**Состояния:** default (чипы); streaming-ответ; «не указано в документе»; debt-distress signpost.
**Контракт `[PM5]`+FCA:** на «what should I do?» — generic options + signposting, не прямой совет; чат всегда скоуплен на документ; дисклеймер «explains, doesn't advise» в футере.
**Успех:** первый вопрос задан И совершён переход к источнику (J4 activation).
**Референсы:** ElevenReader Q&A-шторка, ChatGPT/Gemini citations, Grok follow-ups.

---

### F5 · Overview — обзор `[PM1]` (J2, Watch) — это HOME

```
[Home / Overview]  ← дефолтный таб, не последний result
   │  headline: «Committed this month: £214»  +  срезы «Due in 7 / 30 / 60 days»  (считается без банка)
   │  тоггл month ⇄ year: «6 commitments — £86/mo ⇄ £1,032/yr»
   │  секции по статусу с субтоталами:
   │    «⚠ Needs attention» (trap/overlap) · «Renewing soon» · «Active» · «Decoded, no action»
   │  анатомия строки: иконка типа · имя · «Due in 4 days · 28 Nov» · £ · слот ⚠ trap
   │  savings-фрейминг: «Detected 3 traps costing you £180/year»
   │  «all clear»-состояние: «Nothing needs attention until 28 June ✓»
   ▼
   ├──► строка ──► F7 Vault detail
   ├──► [Scan] ──► F2
   └──► bell/Alerts ──► [Renewal Radar] (F6, полноэкранный)
```
**Состояния:** empty (0 документов → guided «Scan your first document — true cost in 30s» + кнопка Scan, антипаттерн-тупик закрыт); 1 документ; many; all-clear.
**Контракт:** home всегда overview (`[PM1]`); никаких bank-link механик, промо-баннеров, перегруза графиками; спокойный «банковский» тон.
**Успех:** возврат в overview при ≥2 документах (J2 + retention против F1 pre-mortem).
**Референсы:** Afterpay headline+срезы, Orbit count/total, Rocket Money копирайт, Apple Wallet all-clear.

---

### F6 · Radar — наблюдение (J3, Watch)

```
СОЗДАНИЕ (обновлено 2026-07-02): zero-config — даты Radar ставятся автоматически при «Save & watch» (F2);
   успех-экран подтверждает: «Watching the 28 May payment — we'll remind you 2 days before.»,
   настройка — тихий «Adjust reminders» → {Reminder settings}   (Radar = следствие скана)
   ▼
[Local notification]  «Boiler cover renews in 14 days — you'll be charged £312 on 24 Jun» → tap
   ▼
{Alert detail}  [что] + [через сколько] + [точная сумма и дата] + ОДНА CTA «Review terms» → F7/F2
   │  для price-increase: «было £9.99 → стало £12.99 (+30%)» + «Why?» → source-подсветка
   │
[Renewal Radar]  (полноэкранный, не шит — обновлено 2026-07-02) двухслойно: «Coming up» (мини-календарь) + «Coming later»
   │  reliability contract: «Watching 4 dates · last checked today» + тест-нотификация в онбординге
   │  + Pro-upsell блок «Watching 2 of 6 · Unlock with Pro»  (шов с F8)
   ▼
{Reminder settings}  lead-time по категории · «Renewals & deadlines» locked-On · «Tips» off by default
```
**Состояния:** all-clear; upcoming; overdue (CPA-«сдвоенный» платёж показываем явно); permission-not-granted баннер.
**Контракт `[PM4]` (free/paid):** базовый Radar по сосканированному — во free; Radar по всем датам/множеству обязательств — Watch-слой за пейволлом. Локальные нотификации (офлайн) + серверный дубль — анти-Bobby (VoC T-7).
**Успех:** включён первый reminder; открыт alert (J3 activation).
**Референсы:** Uber One alert-анатомия, Rocket Money двухслойный, Apple Wallet all-clear, Opal/Calm пикеры, Hyundai price-rise.

---

### F7 · Vault detail — досье обязательства (J6, Watch→Act)

```
[Vault list]  все decoded-документы (= таб)  ·  поиск/фильтр по статусу
   ▼
{Commitment detail}  bottom-sheet:
   │  key-value строки (каждая → source highlight)  ·  Notes («cancel before renewal»)
   │  Price History с дельтой  ·  даты Radar
   │  J6: «View as a lender would» / export — сводка обязательств (P2/P3)
   │  CTA-пара: основное действие + тихий деструктив (Delete/Stop watching)
```
**Состояния:** default; пустой Vault (= empty overview, guided scan); single; many.
**Контракт:** Face ID на Vault (`expo-local-authentication`) — дешёвый trust-сигнал; авто-именование, не «Scan 47.pdf».
**Успех:** открыт detail / использован export (J6).
**Референсы:** Orbit detail-sheet, Fabric empty-state.

---

### F8 · Upgrade — монетизация на Watch-границе `[PM4]`

```
ТРИГГЕР (в момент ценности, не на входе):
   • сразу после ПЕРВОГО decode (Day-0 — где принимается 80–90% решений о подписке)
   • «N scans left this month» в камере при приближении к лимиту (Lovi-паттерн)
   • попытка Watch-действия сверх free (Radar по всем датам / полный Vault / unlimited Q&A)
   ▼
{Paywall sheet}  MultiPlanSelector (£4.99/мес · годовой −30%) + trial timeline · цена+лимиты на одном экране БЕЗ footnotes
   │  free = N полных decodes/мес (wedge не урезан, но лимит); Pro = unlimited + полный Vault + Watch/Radar   ← анти-Emma/Cleo, но wedge не даром
   ▼
(System) Apple IAP  ← только IAP, без карты, без обхода App Store (VoC T-1/T-2)
```
**Состояния:** free-active; near-limit; paywall; purchased; restore.
**Контракт (ревизия [research/21](../../research/21-pricing-monetization.md)):** free = N полных decodes/мес; Pro = unlimited + полный Vault + Watch/Radar; пейволл **после первого decode** (Day-0). **Apple build-gate:** НЕ trial-toggle (Guideline 3.1.2 реджектит с янв 2026) → multi-plan selector + trial timeline; триал не 3 дня. Подать **Apple Small Business Program** (15% с дня 1) до запуска. £4.99 — anchor, финализировать Van Westendorp PSM по S1/S2. Апселл редкий, контекстный; «express and informed consent» (планка FTC-settlement).
**Успех:** trial→paid на Watch-границе (против F2 pre-mortem).

---

### F9 · Settings & Cancel — гигиена доверия (VoC-инварианты)

```
[Settings]
   ├─ Subscription ──► «Manage in Apple Subscriptions» (отмена в 2 тапа) + статус
   ├─ Privacy ──────► что на сервер / на устройстве · retention · «Delete everything» (1 тап)
   ├─ Notifications ─► категории, lead-time
   ├─ Help ─────────► «Email a human · reply in 24h»  (анти-VoC T-6: не бот)
   └─ Legal ────────► «Decode explains, doesn't give financial advice» + MoneyHelper/StepChange
```
**Контракт:** отмена в 2 тапа без лабиринтов/ID; поддержка с человеком; дисклеймер не мелким шрифтом.
**Успех:** отмена находится без friction (защита рейтинга — главный VoC-вывод).

---

## 3. Связка flows (как пользователь течёт между работами)

```
                     ┌────────────────────── F1 Onboarding ──────────────────────┐
                     ▼                                                            │
   share-in ───► F2 Scan & Decode ──► Decode-result ──► SW-success ──► F6 Radar   │
                     ▲   │                   │  │              │          │       │
                     │   │                   │  └─► F3 Ask     │          ▼       │
                     │   └── Scan another ◄──┘     (J4/J5)     │     [notification]
                     │                                          ▼          │
   [Scan tab] ───────┘                              F5 Overview (HOME) ◄────┘
                                                       │  [PM1]
                                                       ├─► F7 Vault detail (J6)
                                                       └─► F8 Upgrade (Watch-gate) ─► Apple IAP
   [Settings] ─────────────────────────────────────────────► F9 Cancel/Privacy
```
Сквозной шов продукта — **Scan → Watch** (обновлено 2026-07-02): каждый завершённый decode сохраняется в один тап — zero-config, имя и даты наблюдения ставятся автоматически (SW-success = «Saved & watching»); overview — постоянная причина возврата. В кликабельном прототипе связка материализована как 49 экранов / 14 флоу.

---

## 4. Активационная воронка (что мерить)

```
Install → Onboarding complete → First scan started → First result viewed*  ← АКТИВАЦИЯ (J1)
        → Saved to Vault → Radar reminder set → Return to Overview (≥2 docs)  ← RETENTION (J2/J3)
        → Watch-limit hit → Upgrade                                          ← MONETIZATION
```
`*` включая demo-ветку `[PM2]` для пользователей без документа.
**North Star кандидаты (открытый вопрос ресёрча №7):** watched commitments · £ предотвращённых потерь · decoded documents. Решается метриками-фазой; здесь фиксируем, что activation = **first result viewed**, не install.

## 5. Покрытие jobs и требований (самопроверка)

| Job/Требование | Flow | Закрыто |
|---|---|---|
| J1 | F2 | ✅ |
| J2 | F5 | ✅ |
| J3 | F6 | ✅ |
| J4 | F3 | ✅ |
| J5 | F3 под-ветка | ✅ |
| J6 | F7 | ✅ (P2-глубина) |
| PM1 Home=Overview | F5 — дефолтный таб | ✅ |
| PM2 ветка «нет документа» | F1 | ✅ |
| PM3 credit-file бейдж-герой | F2 result ② | ✅ |
| PM4 пейволл на Watch | F8 / F6 | ✅ |
| PM5 Q&A signpost | F3 | ✅ |
| PM6 три языка достоверности | F2 result ④ + {Source-Highlight} (tap-to-source построен) | ✅ полностью (обновлено 2026-07-02) |
| VoC T-1/T-2 биллинг | F8/F9 | ✅ |
| VoC T-3 no bank link | F1 trust | ✅ |
| VoC T-7 radar reliability | F6 | ✅ |

Каждый flow раскладывается в экраны в [screen-sitemap.md](screen-sitemap.md), оттуда — в поэкранные контракты `docs/screens/<url>.md` перед wireframes.
