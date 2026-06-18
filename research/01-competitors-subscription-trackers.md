# Конкурентный разбор: subscription/bill-tracker приложения (трек: competitors-trackers)

**Продукт:** Decode — AI financial-document decoder + commitments guardian (iOS, рынок UK)
**Дата ресёрча:** 2026-06-10
**Метод:** ~15 web-поисков + выгрузка первоисточников (официальные сайты, App Store страницы, help-центры, FCA, пресса). Каждый существенный факт — с URL. Где данные не нашлись — указано явно.

---

## 1. Executive summary

Рынок трекеров подписок/счетов делится на три лагеря:

1. **Bank-link автоматика** (Rocket Money, Copilot, Cleo — US; Emma, Snoop, Little Birdie — UK): подписки находятся постфактум из банковских транзакций через Plaid/Open Banking. Видят обязательство только **после** того, как деньги уже ушли.
2. **Manual-трекеры** (Bobby, Goodbudget, TrackMySubs, Tilla): приватность и контроль, но весь ввод руками и ноль интеллекта — никакого понимания документа.
3. **AI-input трекеры нового поколения** (Finny, ReSubs): снижают трение ввода (скриншот/фото/голос → структурированная запись), но используют AI только как **data entry**, не как **понимание** (нет summary, trap detection, true cost, Q&A).

**Никто на рынке не делает связку «понимание финансового документа (summary + key terms + true cost + traps + Q&A) → автоматическое превращение в отслеживаемое обязательство (Vault + Renewal Radar)» без bank link.** Ближе всех концептуально — UK-сервис **Nous** (загрузка счетов / подключение почты + AI-ассистент по bills + отслеживание дат окончания контрактов), но это switching-сервис по household bills (energy/broadband/mobile/mortgage), а не декодер кредитных/BNPL документов. Главный субститут для «понимания» — это не приложение-конкурент, а **ChatGPT** (сфотографировать письмо и спросить), но у него нет персистентности, детерминированного расчёта, Vault и Radar.

Тайминг для wedge подтверждается регуляторикой: **FCA начинает регулировать BNPL (Deferred Payment Credit) с 15 июля 2026** — обязательная pre-contract information и affordability checks ([FCA](https://www.fca.org.uk/consumers/buy-now-pay-later)), то есть у потребителя станет больше документов, которые надо понимать.

---

## 2. Сравнительная таблица

| App | Рынок / UK? | Positioning | Как добавляются подписки/обязательства | Pricing / paywall | App Store рейтинг | Document understanding? |
|---|---|---|---|---|---|---|
| **Rocket Money** | US only, **нет в UK** | Subscription manager + budgeting, cancellation concierge, bill negotiation | Bank link (Plaid), авто-детект recurring | Free tier; Premium — pay-what-you-want sliding scale (~$7–14/мес по обзорам); bill negotiation: 35–60% от сэкономленного за 1-й год | 4.5★ / 359K (US) | Нет |
| **Bobby** | Глобально, есть в UK | Минималистичный manual-трекер подписок (iOS) | Только manual (каталог + custom) | Free до 5 подписок; one-time IAP £0.99–£2.99 | 4.7★ / 986 (GB) | Нет |
| **Copilot Money** | US only, **нет в UK** | Premium Apple-first budgeting (Apple Design Award finalist) | Bank link (Plaid, 10 000+ институтов, только US) | Нет free tier; $13/мес или $95/год | 4.8★ / 29K (US) | Нет |
| **Cleo** | US (UK-founded, ушла из UK ~2022, «eyes return») | Gen Z AI money-чатбот + cash advance + credit builder | Bank link; подписки — побочная фича из транзакций | Free tier; Plus $5.99/мес; Builder/Premium ~$14.99/мес | 4.7★ / 233K (US) | Нет (чат — про транзакции, не документы) |
| **Emma** | **UK core** (+US) | Budget planner: «Track Bills, Manage Subscriptions» | Open Banking, авто-детект recurring; bill reminders; cancellation help | Free (2 bank logins); Plus £4.99/мес (£41.99/год), Pro £9.99 (£83.99/год), Ultimate £14.99 (£124.99/год) | 4.7★ / 25K (GB) | Нет |
| **Snoop** | **UK only** (Vanquis Banking Group) | Free money app: spending + bills, «switch & save» | Open Banking; авто-мониторинг regular payments, флаги повышения цены | Free ядро; Snoop Plus £5.99/мес или £47.99/год | 4.6★ / 7K (GB) | Нет |
| **Little Birdie** | **UK only** | Dedicated subscription manager: alerts + click-to-cancel + price comparison | Manual (free) + «Auto-Subscription finder» через Open Banking (Plus, на инфраструктуре Bud) | Free; Plus £2.99/мес или £23.99/год | 3.7★ / 39 (GB) — почти нет traction | Нет |
| **Finny** | Глобально (US-центричный) | AI money tracker, privacy-first, **no bank link** | Manual + AI: текст, голос, фото чека, скриншот billing email, Apple Pay «Tap to Track» | Free tier; Pro $1.99/мес или $17.99/год | 4.5★ / 13 (US) — очень ранний | Частично: AI-экстракция полей, **без объяснения** |
| **Goodbudget** | Глобально (sync — US banks) | Envelope budgeting, manual-first философия | Manual (Premium добавляет US bank sync) | Free (10+10 envelopes, 1 акк, 2 устройства); Premium $10/мес или $80/год | 4.6★ / 13K (US) | Нет |
| **TrackMySubs** | Web, глобально | Subscription tracker для freelancers/бизнеса | Manual + CSV + Zapier | Free до 10 подписок; Unlimited $10/мес ($99.99/год); Enterprise $30/мес | n/a (web) | Нет |
| **ReSubs** | iOS+Android, глобально | Privacy-first трекер, cross-platform | Manual + CSV + **Gmail import** + **AI-экстракция из фото/скриншота** | Free tier; Premium $4/мес или $30 one-time | не найдено (новое приложение) | Частично: экстракция, без объяснения |
| **Tilla** | Android only | Самый дешёвый manual-трекер | Manual | Free до 5; $2.99 lifetime | 4.3★ / 828 (Google Play) | Нет |
| **Nous** | **UK only** | AI-сервис household bills: отслеживает окончания контрактов, переключает провайдеров | **Email-подключение / загрузка счетов** + Open Banking provider; AI-ассистент категоризирует и суммаризирует bills | Free tier (до 2 услуг); Premium (все услуги, cash rewards) — цена на сайте не раскрыта в FAQ | n/a (web-first) | **Да, ближе всех**: AI-summary счетов, но только утилиты/телеком/ипотека |

Источники по каждой строке — в профилях ниже.

---

## 3. Профили конкурентов

### 3.1 Rocket Money (ex-Truebill, US)

- **Positioning:** «Subscription Manager and Custom Budgeting App» — флагман категории в US ([rocketmoney.com](https://www.rocketmoney.com/)).
- **Core loop:** link bank (Plaid) → авто-детект recurring charges → «Cancel This For Me» (консьерж) / bill negotiation → бюджеты, credit score, net worth.
- **Добавление обязательств:** только bank link; без подключения банка приложение почти бесполезно.
- **Pricing:** free tier (subscription tracking, бюджеты, bill reminders); Premium — **sliding scale «выбери свою цену»**, официальный help center цифры не фиксирует ([How much does Rocket Money cost](https://help.rocketmoney.com/en/articles/2217739-how-much-does-rocket-money-cost)); обзоры 2026 называют $7–14/мес ([The Penny Hoarder](https://www.thepennyhoarder.com/budgeting/rocket-money-review/)); IAP в App Store: $2.99–$9.99. Bill negotiation — success fee **35–60% от сэкономленного за первый год** (help center, там же).
- **Рейтинг:** 4.5★ / 359K ratings (US App Store, [страница](https://apps.apple.com/us/app/rocket-money-bills-budgets/id1130616675)).
- **UK:** **недоступен** — «only available to users located within the United States and with U.S. based banks» ([Rocket Money Help Center](https://help.rocketmoney.com/en/articles/79778-does-rocket-money-support-international-banks)); вся механика построена на Plaid/US-инфраструктуре, планов экспансии не заявлено ([Orbit, обзор UK-альтернатив](https://orbitmoney.io/compare/rocket-money-uk)).
- **Вывод для Decode:** прямого столкновения в UK нет. Rocket Money — это «postfactum»-модель: он не видит оффер до подписания и не объясняет условия.

### 3.2 Bobby (Yummygum → MWM)

- **Positioning:** культовый минималистичный manual-трекер подписок для iOS ([bobbyapp.co](https://bobbyapp.co/)). Страница на [mwm.ai](https://mwm.ai/apps/bobby-track-subscriptions/1059152023) указывает, что приложение сейчас в портфеле MWM.
- **Core loop:** выбрать сервис из каталога сотен пресетов (или custom) → задать цену/цикл/дату → видеть месячный total → получать уведомления о списаниях.
- **Добавление:** **только вручную**; никакого bank link, email или скана ([App Store GB](https://apps.apple.com/gb/app/bobby-track-subscriptions/id1059152023)).
- **Pricing:** free до 5 подписок; разблокировка — **one-time** покупки £0.99–£2.99 (Unlock Subscription Limit £0.99, All-in-one Pack v2 £2.99) — нет recurring-подписки вообще.
- **Рейтинг:** 4.7★ / 986 ratings (GB App Store); последнее обновление: декабрь 2025 (v3.10.4) — развитие медленное.
- **UK:** доступен, мультивалютный.
- **Вывод для Decode:** Bobby доказывает спрос на «без банка», но это «тупой» инструмент: всё трение ввода — на пользователе, ноль понимания. Decode = Bobby-уровень приватности + автоматизация через камеру.

### 3.3 Copilot Money (US)

- **Positioning:** самый «дизайнерский» budgeting для экосистемы Apple, Apple Design Award finalist 2024 ([App Store US](https://apps.apple.com/us/app/copilot-track-budget-money/id1447330651)).
- **Добавление:** bank link (Plaid, 10 000+ институтов); «currently works with US financial institutions only».
- **Pricing:** нет free tier; $13/мес или $95/год (App Store IAP; сайт: [copilot.money/pricing](https://copilot.money/pricing/)). Web-версия добавлена в декабре 2025 ([Money with Katie review](https://moneywithkatie.com/copilot-review-a-budgeting-app-that-finally-gets-it-right/)).
- **Рейтинг:** 4.8★ / 29K (US).
- **UK:** **недоступен**.
- **Вывод для Decode:** бенчмарк качества iOS-дизайна и доказательство, что аудитория платит $95/год за polish. Subscription tracking у него вторичен.

### 3.4 Cleo (UK-founded, US-focused)

- **Positioning:** AI-чатбот про деньги для Gen Z (sass mode), cash advance до $250, credit builder ([web.meetcleo.com](https://web.meetcleo.com/)).
- **Добавление:** bank link; детект подписок — побочная фича из транзакций, «no lifecycle tracking, trial reminders, or cancel guides» ([ReSubs vs Cleo](https://resubs.app/resources/resubs-vs-cleo) — источник аффилирован с ReSubs).
- **Pricing:** free tier; Cleo Plus $5.99/мес; Premium $14.99/мес ([LendEDU review](https://lendedu.com/blog/cleo-app-review/), [pricing](https://web.meetcleo.com/pricing)).
- **Рейтинг:** 4.7★ / 233K (US App Store, [страница](https://apps.apple.com/us/app/cleo-ai-smart-money-manager/id1447274646)).
- **UK:** компания лондонская, но **ушла из UK ~2020–2022** ради US (лучшие banking API/Plaid, регуляторика) — 99%+ выручки в US; при $150M ARR заявляет о намерении **вернуться в UK** ([Sifted](https://sifted.eu/articles/ai-fintech-cleo-return-uk), [Sifted №2](https://sifted.eu/articles/european-fintech-us-problem-cleo-ai)).
- **Вывод для Decode:** главный «AI-голос» категории, но его AI разговаривает о **транзакциях**, не о **документах**. Возвращение Cleo в UK — риск по share of voice («AI + деньги»), не по функционалу wedge. Watch item.

### 3.5 Emma (UK)

- **Positioning:** «Emma Budget App | Track Bills | Manage Subscriptions» — самый близкий к Rocket Money UK-продукт ([emma-app.com](https://emma-app.com/)).
- **Core loop:** подключить банки через Open Banking (read-only) → авто-категоризация, детект recurring/subscriptions → bill reminders, напоминания отменить неиспользуемое, cancellation help ([Finder UK review](https://www.finder.com/uk/budgeting/emma-review)).
- **Добавление:** Open Banking; free tier ограничен **2 bank logins** ([compare plans](https://emma-app.com/plans/compare-emma-plans)).
- **Pricing (GB App Store):** Plus £4.99/мес (£41.99/год), Pro £9.99/мес (£83.99/год), Ultimate £14.99/мес (£124.99/год); годовая оплата ~30% дешевле ([App Store GB](https://apps.apple.com/gb/app/emma-budget-planner-tracker/id1270062373), [help center](https://help.emma-app.com/en/article/how-much-does-emma-plusproultimate-cost-1ywhulq/)).
- **Рейтинг:** 4.7★ / 25K (GB) — лидер категории в UK по traction.
- **Вывод для Decode:** Emma — «дефолтный ответ» на вопрос «как трекать подписки в UK», и главный конкурент за бюджет пользователя £4–8/мес. Но: требует bank link (главное возражение privacy-сегмента), видит только транзакции, не понимает ни офферов, ни писем, ни условий.

### 3.6 Snoop (UK, Vanquis Banking Group)

- **Positioning:** бесплатный UK money app: «Track spending, save money & budget»; мониторит каждый regular payment и флагает повышения цены, предлагает switching deals ([snoop.app](https://snoop.app/), [Snoop review](https://trysnowball.co.uk/library/spend-review-snoop/)). Основана Dame Jayne-Anne Gadhia, куплена Vanquis Banking Group в июле 2023 ([Finextra](https://www.finextra.com/newsarticle/42715/vanquis-banking-group-acquires-money-saving-app-snoop)).
- **Добавление:** Open Banking (free — до 3 счетов по обзорам); manual accounts — только в Plus.
- **Pricing:** ядро free; Snoop Plus **£5.99/мес или £47.99/год** ([snoop.app/plus](https://snoop.app/plus/)); в App Store видны и старые тиры £3.99–£47.99.
- **Рейтинг:** 4.6★ / 7K (GB, [App Store](https://apps.apple.com/gb/app/budget-planner-l-snoop-money/id1495077102)).
- **Вывод для Decode:** Snoop частично закрывает «Watch» (флаги повышения цены до прихода счёта) — но опять только через bank feed, и его бизнес-модель — switching/рефералки, а не понимание документов.

### 3.7 Little Birdie (UK)

- **Positioning:** «UK's Subscription Tracker & Savings App» — единственный UK-продукт, целиком посвящённый подпискам ([littlebirdie.co.uk](https://www.littlebirdie.co.uk/)).
- **Core loop:** добавить подписки (вручную бесплатно / авто-поиск через Open Banking в Plus, инфраструктура [Bud](https://www.thisisbud.com/en-gb/little-birdie-case-study)) → алерты: price rise, free trial end, contract renewal → «Click to Cancel» для ~400 мерчантов → price comparison ([Fintech Times](https://thefintechtimes.com/little-birdie-app-launch-poised-to-free-oversubscribed-uk/)).
- **Pricing:** free; Plus **£2.99/мес или £23.99/год** ([App Store GB](https://apps.apple.com/gb/app/little-birdie/id1623144133)).
- **Рейтинг:** **3.7★ / 39 ratings** (GB App Store) и Trustpilot 4.0 / 23 отзыва ([Trustpilot](https://www.trustpilot.com/review/littlebirdie.co.uk)) — traction почти нулевой при живом продукте.
- **Вывод для Decode:** функционально это ближайший UK-аналог Renewal Radar (renewal/trial/price-rise alerts). Его слабость — нет ни документного входа, ни AI, ни «понимания»; и рынок его пока не заметил. Это и предупреждение (standalone-трекер подписок сам по себе плохо продаётся), и подтверждение, что дыра «alerts без bank link + интеллект» свободна.

### 3.8 Finny (AI money tracker)

- **Positioning:** «AI Money Tracker | Tap to Track, Scan & Go» — privacy-first, offline-first, **без bank link** ([getfinny.app](https://getfinny.app/)).
- **Добавление:** manual + AI-вход: текст («Spotify 11.99 monthly»), голос, фото чека, **скриншот billing email**, импорт скриншотов банковской выписки, Apple Pay «Tap to Track» ([App Store US](https://apps.apple.com/us/app/finny-ai-money-tracker/id6736472735)).
- **Pricing:** free tier (unlimited manual tracking); Pro **$1.99/мес или $17.99/год**.
- **Рейтинг:** 4.5★ / **13 ratings** (US) — продукт очень ранний, по сути indie.
- **Вывод для Decode:** механика входа почти как у Decode (сфотографируй → AI структурирует), но AI используется только для **экстракции полей в expense tracker**. Нет summary, нет true cost, нет trap detection, нет Q&A, нет renewal-логики по кредитным документам. Finny — доказательство технической реализуемости capture-флоу, не конкурент по value prop.

### 3.9 Goodbudget

- **Positioning:** цифровые «конверты», осознанный manual-ввод как философия ([goodbudget.com](https://goodbudget.com/)).
- **Pricing:** free (10 regular + 10 annual envelopes, 1 account, 2 устройства); Premium **$10/мес или $80/год** ([NerdWallet review](https://www.nerdwallet.com/finance/learn/goodbudget-app-review)).
- **Рейтинг:** 4.6★ / 13K (US, [App Store](https://apps.apple.com/us/app/goodbudget-budget-planner/id471112395)).
- **UK:** скачать можно, но bank sync в Premium — только US banks.
- **Вывод для Decode:** не про подписки и не про документы; релевантен только как доказательство сегмента «готовы вести финансы руками ради контроля».

### 3.10 TrackMySubs

- **Positioning:** web-инструмент учёта подписок, скорее для freelancers/SMB ([trackmysubs.com](https://trackmysubs.com/)).
- **Добавление:** manual + CSV + Zapier.
- **Pricing:** Free до 10 подписок; Unlimited $10/мес ($99.99/год); Enterprise $30/мес ([pricing](https://trackmysubs.com/pricing/)).
- **Рейтинг:** мобильного приложения нет; не найдено.
- **Вывод для Decode:** не consumer-конкурент в UK; иллюстрирует потолок «manual + alerts» модели.

### 3.11 Другие найденные

- **ReSubs** (iOS+Android): manual + CSV + **Gmail import** + **AI-экстракция подписки из фото/скриншота счета**; данные on-device, без банка; free tier, Premium $4/мес или **$30 one-time** ([resubs.app](https://resubs.app/), [App Store](https://apps.apple.com/us/app/subscription-manager-resubs/id6740457603)). По механике захвата — самый близкий к Decode трекер, но без слоя понимания.
- **Tilla** (Android only): manual, free до 5 подписок, $2.99 lifetime, 4.3★/828 ([обзор ReSubs](https://resubs.app/resources/best-subscription-tracker-apps) — аффилированный источник).
- **PocketGuard, Monarch Money, YNAB, Origin, WalletHub** (US): bank-link budgeting, подписки — вторичная фича ([Origin: 10 best subscription apps](https://useorigin.com/resources/blog/10-best-subscription-management-tracking-apps-in-2026), [Rob Berger: subscription manager apps](https://robberger.com/subscription-manager-apps/)).
- Отраслевой отчёт (пресс-релиз на openPR, по-видимому от ReSubs; полный текст недоступен — 403): из 14 проанализированных приложений **10 требуют bank access, только 4 позволяют трекать без подключения** к финсервисам ([openPR](https://www.openpr.com/news/4542270/most-subscription-tracking-apps-require-bank-access-new-report)). Цифру использовать с оговоркой об аффилированности, но направление совпадает с нашей таблицей.

### 3.12 Nous (UK) — ближайший по концепции

- **Positioning:** «Save £££s on your bills» — AI-сервис, который отслеживает household-контракты (energy, broadband, mobile, mortgage; insurance «coming soon»), предупреждает об окончаниях/повышениях и **сам переключает** провайдера ([nous.co](https://www.nous.co/), [FAQs](https://www.nous.co/faqs)).
- **Вход данных:** пользователь **загружает счета или подключает email-инбокс**, AI категоризирует и суммаризирует bills, алертит о деталях и экономии ([TechCrunch о GenAI-ассистенте Nous, 2023](https://techcrunch.com/2023/07/20/what-happened-when-nous-co-hooked-up-generative-ai-to-its-users-household-bills/), [блог Nous](https://www.nous.co/blog/nous-launches-new-ai-assistant-to-make-sense-of-household-bills)); также является approved Open Banking provider.
- **Pricing:** Free tier (до 2 услуг); Premium — все услуги, cash rewards, WhatsApp-поддержка; конкретная цена Premium в FAQ не раскрыта — **не найдено**.
- **Вывод для Decode:** Nous реально делает «документ → понимание → watch» — но (а) только household bills, не credit/BNPL/insurance-документы; (б) монетизация через switching-комиссии, т.е. ему нужны категории с переключаемыми провайдерами; (в) web-first сервис, не iOS-камера-в-моменте; (г) не даёт детерминированного расчёта true cost кредитного оффера и trap detection. Это валидация спроса на email/doc-вход и одновременно граница его модели.

---

## 4. Смежная категория: AI document understanding (где живёт wedge Decode)

Прямых «понимателей финансовых документов для потребителя» в App Store почти нет — категория состоит из субститутов:

- **ChatGPT / Google Lens** — главный реальный субститут: «сфотографируй письмо → спроси, что это значит». Кейсы в UK-контенте уже есть ([пример с письмом от Council](https://www.lovepoundbury.org/post/i-photographed-a-letter-from-the-council-ai-explained-it-in-10-seconds)). Слабости: нет персистентности (Vault), нет напоминаний (Radar), нет детерминированной математики true cost, нет UK-специфичной trap-базы, privacy-возражения.
- **Caira** (UK) — consumer legal-AI: читает PDF/скриншоты/фото и объясняет small print, на базе документов England & Wales ([Unwildered](https://www.unwildered.co.uk/legal-blog/best-ai-for-financial-services-in-the-uk)). Юридический, а не финансово-обязательственный фокус.
- **BillDecoder.ai** — AI-анализ медицинских счетов, US-only ([billdecoder.ai](https://billdecoder.ai/)) — показывает паттерн «узкий документный декодер» в соседней вертикали.
- **Contract Analyzer AI** и подобные iOS-утилиты ([App Store](https://apps.apple.com/us/app/contract-analyzer-ai/id6742789139)), **PlainTerms** ([plainterms.ai](https://plainterms.ai/)) — generic contract-review, без commitment-tracking, без UK-финансовой специфики, без loop'а.

**Ни один из них не соединяет понимание документа с жизненным циклом обязательства.** Это и есть продуктовая дыра Decode.

---

## 5. Карта рынка по способу добавления обязательств

| Способ входа | Кто | Что это даёт | Чего не даёт |
|---|---|---|---|
| Bank link (Plaid / Open Banking) | Rocket Money, Copilot, Cleo, Emma, Snoop, Little Birdie (Plus), PocketGuard, Monarch | Автоматика, полнота по факту списаний | Видит только прошлое; privacy-возражение; не видит условий, trial'ов до первого списания, BNPL-расписаний у части провайдеров, бумажных писем |
| Manual | Bobby, Goodbudget, TrackMySubs, Tilla, Little Birdie (free) | Privacy, контроль | Всё трение на пользователе; данные деградируют; ноль интеллекта |
| Email parsing | ReSubs (Gmail import), Nous (inbox connect) | Захват без банка, видит receipts/bills | Покрытие зависит от инбокса; email-privacy возражение; всё ещё экстракция, не понимание |
| Doc scan / фото | Finny (чеки, скриншоты), ReSubs (фото счета), Nous (upload bills) | Захват в моменте, без какого-либо доступа | Сегодня используется ТОЛЬКО как data entry; никто не объясняет документ и не считает true cost |
| **Doc scan → understanding → commitment** | **никто** | — | **дыра Decode** |

---

## 6. Где именно дыра, и кто ближе всех

**Дыра** (пересечение трёх осей, на котором пусто):
1. **Pre-commitment момент.** Все трекеры включаются ПОСЛЕ подписания: bank link видит транзакцию, manual-трекер ждёт ввода. Никто не помогает на шаге «Decide» — когда у пользователя в руках оффер BNPL/кредитки и решение ещё не принято. У Decode здесь нет ни одного конкурента среди разобранных приложений; конкурент — ChatGPT и собственная невнимательность пользователя.
2. **Понимание vs экстракция.** AI-трекеры (Finny, ReSubs) экстрагируют «merchant, amount, cycle». Никто не выдаёт plain-English summary, key terms, deterministic true cost, trap flags, Q&A с подсветкой источника и confidence.
3. **No bank link как принцип + автоматика.** Сегодня «без банка» = «вручную» (Bobby). Decode разрывает эту связку: приватность manual-трекера с автоматикой bank-link-трекера, источником которой служит сам документ.

**Кто ближе всех (по убыванию):**
1. **Nous (UK)** — концептуально ближе всех (doc/email вход + AI-summary + contract-end watching), но заперт в household-bills-switching модели и не трогает credit/BNPL. Если Nous решит расшириться в кредитные документы — станет конкурентом №1.
2. **ReSubs / Finny** — ближе всех по capture-механике (фото/скриншот → AI → запись), оба крошечные; за 6–12 месяцев могут дорастить «объяснение» поверх экстракции. Скорость выхода Decode имеет значение.
3. **Little Birdie (UK)** — ближе всех по Renewal Radar (trial/renewal/price-rise alerts, click-to-cancel), но без документного входа и почти без пользователей.
4. **Emma / Snoop (UK)** — главные конкуренты за кошелёк (£4–6/мес) и за позицию «приложение про мои подписки» в голове UK-пользователя, но их bank-link модель — это то, ОТ чего Decode отстраивается.
5. **ChatGPT** — главный субститут «понимания»; ответ Decode: специализация (UK credit/BNPL trap-база, детерминированный расчёт, structured output), персистентность (Vault), проактивность (Radar).

---

## 7. Регуляторный контекст (тайминг wedge)

- FCA начинает регулировать **Deferred Payment Credit (BNPL) с 15 июля 2026**: обязательные affordability checks, **pre-contract information**, уведомления о пропущенных платежах, доступ к Financial Ombudsman ([FCA: Buy Now Pay Later](https://www.fca.org.uk/consumers/buy-now-pay-later), [FCA press release](https://www.fca.org.uk/news/press-releases/new-protections-confirmed-buy-now-pay-later-borrowers), [AM Online](https://www.am-online.com/news/new-buy-now-pay-later-rules-to-begin-in-july-2026-fca-says)).
- Следствие для Decode: с июля 2026 каждый UK BNPL-пользователь начнёт получать формализованные pre-contract disclosure-документы — ровно тот артефакт, который Decode фотографирует и декодирует. Договоры, заключённые ДО 15.07.2026, останутся нерегулируемыми — то есть «зоопарк» старых и новых условий усилит путаницу и спрос на объяснение.

---

## 8. Pricing-бенчмарк для freemium £3–8/мес

UK-лестница цен за «слежение за подписками/счетами» (на 06.2026):

| Продукт | Цена/мес | Что даёт за деньги |
|---|---|---|
| Little Birdie Plus | £2.99 (£23.99/год) | авто-поиск подписок, unlimited connected accounts |
| Emma Plus | £4.99 (£41.99/год) | unlimited bank logins, bill tracking |
| Snoop Plus | £5.99 (£47.99/год) | custom categories, bill tracking by pay cycle, exports |
| Emma Pro | £9.99 (£83.99/год) | + smart features |
| (US-якоря) Rocket Premium ~$7–14, Copilot $13/$95 год | | |

Вывод: коридор £3–8/мес у Decode соответствует рынку; £4.99/мес (£39–42/год) — «социально привычная» точка в UK между Little Birdie и Snoop. One-time-якоря (Bobby £2.99, ReSubs $30 lifetime) показывают, что privacy-сегмент чувствителен к recurring — аргумент за щедрый free tier на capture и paywall на Vault-объём/Radar/Q&A.

---

## Key takeaways for Decode

1. **Дыра подтверждена и пуста.** Ни одно из 13+ разобранных приложений не делает «фото документа → понимание (summary, terms, true cost, traps, Q&A) → отслеживаемое обязательство». Пересечение document-understanding × commitment-tracking × no-bank-link не занято никем; ближайшие соседи (Nous, ReSubs, Finny, Little Birdie) закрывают по одной грани каждый.
2. **В UK прямого Rocket Money нет, а Copilot/Cleo отсутствуют** — «эталонные» продукты категории недоступны британцам; локальные Emma/Snoop требуют bank link. Позиционирование «understand & watch your commitments — no bank connection needed» в UK ни с кем не сталкивается лоб в лоб. Watch item: Cleo публично «eyes return to the UK».
3. **Главный конкурент шага Understand — ChatGPT, а не приложения.** Wireframes должны подчёркивать то, чего нет у ChatGPT: детерминированный true-cost расчёт (не LLM-математика), trap-флаги по UK-базе, source highlighting + confidence, и автоматический переход «понял → положил в Vault → Radar следит». Один экран должен продавать весь loop, а не только summary.
4. **Capture-флоу технически валидирован рынком** (Finny: фото/скриншот/голос → структурированная запись; ReSubs: AI-экстракция из фото счета; Nous: email/upload). Для wireframes: скан — не фича, а главный onboarding-момент; первая ценность должна появляться до любой регистрации/оплаты.
5. **Renewal Radar — учесть урок Little Birdie.** Standalone «алерты о подписках» (3.7★, 39 оценок) сами по себе не продаются; Radar должен быть следствием понятого документа (выход loop'а), а не отдельной ценностью, которую пользователь настраивает руками.
6. **Pricing: £4.99/мес — центральная точка коридора**, free tier — N сканов/мес + 1–2 наблюдаемых обязательства; paywall — unlimited Vault, Radar по всем датам, ask-anything Q&A. Бенчмарки: Little Birdie £2.99 < Decode < Snoop £5.99/Emma Pro £9.99. Privacy-аудитория не любит подписки (Bobby/ReSubs lifetime) — рассмотреть годовой план со скидкой ~30% как у Emma.
7. **«No bank link» — это позиционирование, подтверждённое поведением рынка**: большинство трекеров требуют bank access (10 из 14 по отчёту на [openPR](https://www.openpr.com/news/4542270/most-subscription-tracking-apps-require-bank-access-new-report), аффилированный источник — но согласуется с нашей таблицей), а растущие privacy-first продукты прямо продают отсутствие банка. В UI прямо писать: «We never connect to your bank».
8. **Тайминг wedge усилен FCA**: с 15.07.2026 BNPL-кредиторы обязаны выдавать pre-contract information — поток документов, которые Decode декодирует, станет регулярным и стандартизованным. В go-to-market и onboarding-копи можно прямо ссылаться на новые права потребителя (Ombudsman, affordability checks).

---

*Оговорки по источникам: материалы resubs.app и getfinny.app — блоги самих вендоров (аффилированы), использованы только для фактов о них самих и перекрёстно проверяемых данных; рейтинги App Store сняты с официальных страниц apps.apple.com 10.06.2026; цены могут меняться, для load-bearing решений перепроверить на дату использования.*
