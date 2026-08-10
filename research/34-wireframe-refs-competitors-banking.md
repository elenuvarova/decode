# Decode — Референсы мобильных экранов (под wireframes) + конкуренты + банковские приложения

**Дата:** 2026-08 · **Цель:** консолидированная карта референсов для wireframe/hi-fi фазы — **простые** мобильные интерфейсы по каждому типу экрана Decode, плюс UI-разбор конкурентов и банковских приложений.
**Оговорка:** Mobbin MCP-коннектор в этой сессии был недоступен (скриншоты не тянулись программно) — ниже курируемая карта «куда идти и что смотреть» с конкретными поисковыми запросами по галереям + разбор по вебу. Дополняет уже собранное: [12-mobbin-capture](12-mobbin-capture-flows.md), [13-mobbin-fintech-home](13-mobbin-fintech-home.md), [14-mobbin-ai-explanation](14-mobbin-ai-explanation.md), [15-mobbin-onboarding](15-mobbin-onboarding.md), [16-mobbin-alerts](16-mobbin-alerts-reminders.md), [17-refero](17-refero-references.md), [18-competitor-teardowns](18-competitor-teardowns.md).

---

## 0. Принцип «простого интерфейса» для wireframes (что искать и что НЕ копировать)

Тренд fintech-UI 2026, релевантный Decode: **3–5 первичных интентов на экран, а не feature-heavy дашборды** — Monzo/Revolut осознанно строят интерфейс вокруг немногих намерений сегмента, а не десятков функций ([Lollypop](https://lollypop.design/blog/2026/june/banking-app-ui-design/), [Velmie](https://www.velmie.com/post/top-banking-apps-with-the-best-ux)). Для Decode-вайрфреймов это значит: **одно hero-число, явные секции, крупные тап-таргеты, максимум воздуха** — референсить самые СПОКОЙНЫЕ экраны, а не самые насыщенные.

**Где брать (галереи, по убыванию пригодности для wireframes):**
| Галерея | Что даёт | Осторожно |
|---|---|---|
| **Mobbin** (mobbin.com, нужен логин) | Реальные production iOS-флоу и экраны, по шагам; лучший источник паттернов | Требует аккаунт; наш прошлый майнинг — в 12–16 |
| **Refero.design** ([refero.design](https://refero.design)) | Тысячи скринов с продвинутым поиском по компонентам/экранам; сайты + приложения | Смешаны web и mobile — фильтровать |
| **Page Flows** ([pageflows.com/ios](https://pageflows.com/ios/)) | Записанные iOS user-flow (онбординг, checkout, settings) — хорошо для целых потоков | Меньше объём |
| **AppShots** ([appshots.design](https://appshots.design)) | Курируемые скрин-сеты конкретных апп (напр. Klarna) | Маркетинговые, не всегда полный флоу |
| **Dribbble** | Идеи стиля | ⚠️ КОНЦЕПТЫ, не production — для wireframes опасно (over-polished, нереальные паттерны). Не брать как эталон структуры |

---

## 1. Референсы по типам экранов Decode

Формат: экран → какие приложения смотреть → какой конкретный паттерн тянуть. Поисковые запросы даны под Mobbin/Refero.

### Onboarding (ON-1…4)
- **Смотреть:** Wise, Plum, Monzo, Revolut welcome; Plazo (trust). Уже разобрано в [15](15-mobbin-onboarding.md).
- **Паттерн:** value-first, ≤3 слайда до первого действия, мок продукта на welcome (не иллюстрация ради иллюстрации), trust-consent отдельным экраном.
- **Поиск:** Mobbin «Onboarding · Finance»; Refero «fintech onboarding», «welcome screen».

### Scan / Capture (SC-1…4)
- **Смотреть:** документ-сканеры — **Apple Notes scan, Adobe Scan, Genius Scan, Microsoft Lens**; банковские **cheque/mobile deposit** флоу (простейший «наведи-сними-подтверди»). Разобрано в [12](12-mobbin-capture-flows.md).
- **Паттерн:** capture sheet с 2–3 входами (камера / файл / фото) → авто-детект края → review (retake/crop как fallback) → processing со стадиями. **Наш инсайт (2026-08):** показать **все входы равноправно** — камера · upload (Files/iCloud) · share-in — не доминировать камерой ([research/33](33-scope-and-input-strategy.md)).
- **Поиск:** Mobbin «Scan / Camera / Document»; Refero «scanner», «document capture», «upload».

### Decode-result (RS) — главный экран
- **Смотреть:** **Yuka** (скан → результат: большая оценка + разбор), **Plum/Cleo** insights, кредитные апы со score-бейджем. Разобрано в [14](14-mobbin-ai-explanation.md).
- **Паттерн:** hero-число первым (True cost) → бинарный бейдж (credit file) → схлопнутые key terms → trap-карточки → source-подсветка. Провенанс на каждой цифре.
- **Поиск:** Mobbin «Result / Detail · Finance»; Refero «score», «breakdown», «insights».

### Overview / Home (бывш. Cockpit) — HM
- **Смотреть:** **Starling** («простота с глубиной» — ближе всего к спокойному тону Decode), **Monzo** (color-coded категории, реалтайм-уведомления), Afterpay/Orbit (headline + срезы). **НЕ** копировать Revolut-home (usage-adaptive виджеты — слишком сложно для нашего кейса). Разобрано в [13](13-mobbin-fintech-home.md).
- **Паттерн:** «Committed this month £214» + срезы 7/30/60 + секции по статусу + all-clear состояние. Один hero-блок, остальное — спокойный список.
- **Поиск:** Mobbin «Home / Dashboard · Banking»; Refero «finance dashboard», «spending overview».

### Vault / List (VA) + Alerts/Radar (AL)
- **Смотреть:** **Rocket Money** (list + calendar view подписок, two-layer reminders), Uber One (анатомия алерта), Apple Wallet (all-clear). Разобрано в [16](16-mobbin-alerts-reminders.md).
- **Паттерн:** список-строки с иконкой-типом/суммой/датой; алерт = [что]+[когда]+[£]+одна CTA; двухслойный inbox «Coming up / later».
- **Поиск:** Mobbin «List / Reminders / Notifications»; Refero «subscription list», «calendar view».

### Paywall (PW) + Settings (ST)
- **Смотреть:** чистые multi-plan селекторы (без dark-pattern), стандартные iOS grouped-lists для Settings.
- **Паттерн:** цена+лимиты на одном экране без сносок, trial-timeline; Settings — нативные группы, «Manage in Apple Subscriptions».
- **Поиск:** Refero «paywall», «subscription plans»; Mobbin «Paywall · Finance».

---

## 2. Конкуренты — UI-разбор (линза «что тянуть / где наш зазор»)

Полный конкурентный разбор — [18](18-competitor-teardowns.md), [01](01-competitors-subscription-trackers.md), [03](03-competitors-ai-document-tools.md). Здесь — UI-акцент + свежая проверка 2026.

| Конкурент | Категория | UI-паттерн (тянуть) | Зазор Decode |
|---|---|---|---|
| **Snoop** (UK) | Money app / трекер | Проактивные «saving»-карточки, флаги роста цены, renewal-напоминания | **Требует open banking** (сканит транзакции). Decode — без банка, document-first ([search](https://orbitmoney.io/compare/best-subscription-trackers)) |
| **Emma** (UK) | Трекер подписок | Категоризация, dashboard трат | Open-banking-based; нет true-cost math по документу |
| **Orbit** (UK) | Трекер подписок | Count/total, детальный sheet | Open-banking; ручной ввод как альтернатива |
| **Rocket Money** (US) | Трекер + bill negotiation | **List + calendar** подписок, bill reminders, negotiation | **Не работает в UK** ([Rocket UK](https://orbitmoney.io/compare/rocket-money-uk)); банковский коннект |
| **Bobby** | Manual трекер | Ручной ввод, простые карточки | Нет объяснения/trap-детекции; чистый tracker |
| **Klarna app** | BNPL | Payment-schedule UI, «pay in 3» таймлайн ([AppShots](https://appshots.design/apps/easy-shopping-easy-payments-app-shot-klarna/), [Page Flows](https://pageflows.com/ios/products/klarna/)) | Мотивирован скрывать true cost; нет cross-provider обзора |
| **ChatGPT/Claude** | Horizontal LLM | «Объясни этот PDF» бесплатно | Нет детерминизма чисел, UK-trap-базы, персистентности, no-bank ([research/33](33-scope-and-input-strategy.md)) |

**Сквозной вывод:** все UK-трекеры (Snoop/Emma/Orbit) сидят на **open banking** — а ~80% в UK банк не подключают. **«No bank connection» + document-first + true-cost math** — незанятая позиция. Это подтверждает и усиливает клин ([research/33](33-scope-and-input-strategy.md)).

---

## 3. Банковские приложения — паттерны (для Overview/home, trust, уведомлений)

Разбор 2026 ([Lollypop](https://lollypop.design/blog/2026/june/banking-app-ui-design/), [Wavespace](https://www.wavespace.agency/blog/banking-app-ux), [Velmie](https://www.velmie.com/post/top-banking-apps-with-the-best-ux)):

| Банк | Что тянуть для Decode | Осторожно |
|---|---|---|
| **Starling** | «Простота с глубиной» — эталон спокойного, не перегруженного дашборда. Наш ориентир для Overview | — |
| **Monzo** | Color-coded категории; **реалтайм push после каждой операции** = benchmark для Renewal Radar; approachable-тон (Hot Coral, playful, но не детский) | Не тянуть яркость в grayscale-фазу; брать структуру, не цвет |
| **Revolut** | Управление сложностью в целом хорошо | ⚠️ usage-adaptive home (виджеты переставляются) — избыточно для Decode, НЕ копировать |
| **N26 / Chime** | Минималистичные балансы-first экраны, чистые состояния ошибок | — |

**Тренды 2026 для нашего чеклиста:** mobile-first, **биометрия** (Face ID на Vault ✓ у нас заложено), микро-интеракции, inclusive design, AI-insights (у нас — но детерминизм на числах). Био/приватность — это и trust-слой Decode.

---

## Key takeaways для Decode (wireframe/hi-fi фаза)

1. **Референс-эталон тона = Starling** (спокойная простота), НЕ Revolut (сложность). Для уведомлений/Radar — паттерн реалтайм-пушей Monzo.
2. **Держать «3–5 интентов на экран»** — тренд 2026; наши wireframes уже минималистичны, свериться, что не расползлись.
3. **Capture-экран показать 3 равных входа** (камера · upload · share-in) — новый акцент из [research/33](33-scope-and-input-strategy.md); сейчас в вайрфреймах камера доминирует.
4. **UI-зазор подтверждён:** ни один UK-конкурент не даёт document-first + no-bank + true-cost — это и есть визуальный/продуктовый дифференциатор, отражать в hero-подаче.
5. **Для скринов идти на Mobbin (по логину) + Refero** по запросам из §1; Dribbble не брать как структурный эталон (концепты). При возврате Mobbin MCP — стянуть конкретные скрин-сеты в `design/references/` по этой карте.

## Скриншоты-референсы уже в проекте (из ресёрч-спринта)

Картинки лежат в **`research/references/`** — эту карту читать вместе с ними:
- **`research/references/competitors/`** — домашние экраны конкурентов (Plum, Zilch, Nous, Cleo, Klarna UK, Emma, Snoop, Clearpay UK, Monzo Flex, Bobby, Adobe AI) + README-индекс.
- **`research/references/hifi/`** — банковские/финтех (Starling, Mercury, Quicken, Toss, ubank, crypto.com, Revolut, Dime, Kin) + decode-релевантные AI-объяснялки (ChatGPT, Gemini, Google, Speechify) + README.
- **`research/references/refero/`** — Refero-скрины (Claude, Subo, ElevenReader, Klarna, OnSkin, Copilot).

## Скриншоты стянуты (2026-08, Mobbin вернулся) — покрыты ВСЕ типы экранов

Пул пополнен на **~48 скринов Mobbin** по 22 типам экранов Decode — навигационный индекс с матчами и ссылками: **[research/references/README.md](references/README.md)**. Покрыто: onboarding · register · consent · scan-capture · processing · result · source-highlight · ask · signpost · home · vault · vault-detail · alerts · calendar · success · paywall · subscription · settings · errors · empty · permission · confirm. Топ-совпадения (близко к нашим экранам): Ubank Bill Planner (home), Orbit detail (vault-detail), Binance Positives/Risks (result), Monese стадии (processing), Deezer «remind 7 days before» (paywall), Prime Video «Edit in App Store» (subscription), Fabric «Ask about this item» (Q&A).

## Открытые (по желанию)
- Compare-offers (сравнение двух офферов бок-о-бок) и Multi-page scan — узкие паттерны, не искал; докинуть при надобности.
- Refero: собрать board «Decode refs» по запросам scanner / finance dashboard / paywall / subscription list (в дополнение к Mobbin).

## Sources
- Banking UI 2026: [Lollypop](https://lollypop.design/blog/2026/june/banking-app-ui-design/) · [Wavespace top-15](https://www.wavespace.agency/blog/banking-app-ux) · [Velmie](https://www.velmie.com/post/top-banking-apps-with-the-best-ux) · [ProCreator](https://procreator.design/blog/banking-app-ui-top-best-practices/)
- Трекеры: [Rocket Money best-apps](https://www.rocketmoney.com/learn/personal-finance/best-subscription-management-apps) · [Orbit: Rocket не в UK](https://orbitmoney.io/compare/rocket-money-uk) · [Orbit: best trackers](https://orbitmoney.io/compare/best-subscription-trackers)
- Галереи: [Refero](https://refero.design) · [AppShots Klarna](https://appshots.design/apps/easy-shopping-easy-payments-app-shot-klarna/) · [Page Flows Klarna iOS](https://pageflows.com/ios/products/klarna/)
- Внутренние: [12](12-mobbin-capture-flows.md) · [13](13-mobbin-fintech-home.md) · [14](14-mobbin-ai-explanation.md) · [15](15-mobbin-onboarding.md) · [16](16-mobbin-alerts-reminders.md) · [17](17-refero-references.md) · [18](18-competitor-teardowns.md) · [33](33-scope-and-input-strategy.md)
