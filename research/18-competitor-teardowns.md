# 18 — Глубокие teardowns конкурентов (для входа в wireframes)

**Дата:** 2026-06-14 · **Метод:** WebSearch + WebFetch (без браузера) · **Контекст:** Decode — iOS-приложение (UK), AI-декодер финансовых документов + commitments guardian, БЕЗ bank connection, для BNPL-аудитории 18–25.

**Дыра Decode:** «понимание документа → отслеживаемое обязательство, без bank link».

Этот документ — углубление к трекам 01–03: фича-за-фичей, флоу по шагам, перепроверенный pricing, позиционирование, app-store рейтинги. Каждый существенный факт — со ссылкой.

---

## 1. Nous (nous.co) — ближайший по духу

**Positioning.** «Save £££s with AI for your bills» — AI-помощник, который читает счета домохозяйства (energy, broadband, mobile, mortgage; insurance — скоро), категоризирует/суммирует их, следит за датами окончания контрактов и автоматически переключает провайдеров ради экономии. Заявленная средняя экономия при переключении — £534. ([nous.co](https://www.nous.co/), [scotsman.com review](https://www.scotsman.com/recommended/nous-billswitching-energy-broadband-savings-ai-5607984), [nous blog](https://www.nous.co/blog/nous-launches-new-ai-assistant-to-make-sense-of-household-bills))

**Core flow (по шагам).**
1. Onboarding: пользователь **загружает счёт ИЛИ подключает email-инбокс** (пересылка релевантных счетов в Nous «в момент прихода»).
2. Generative-AI ассистент **автоматически категоризирует и суммирует** счёт, вытаскивает текущего провайдера, дату окончания контракта и возможности сэкономить.
3. Мгновенный алерт: «можешь сэкономить, если переключишься».
4. Nous **берёт на себя админ переключения** провайдера «в пару кликов».
5. Дальше — мониторинг: smart reminders о концах контрактов, WhatsApp-чат поддержки (на Premium). ([nous blog](https://www.nous.co/blog/nous-launches-new-ai-assistant-to-make-sense-of-household-bills), [examinerlive](https://www.examinerlive.co.uk/whats-on/shopping/nous-co-household-bills-33740054))

**Как добавляются обязательства:** **scan документа (upload) + email-инбокс-коннект.** НЕ bank link — это ключевое родство с Decode. Безопасность — 256-bit «bank-grade» шифрование, ICO-compliant.

**Pricing (перепроверено на nous.co/pricing).**
- **Free £0/мес:** до 2 services, 1 householder login, «typical savings £310», smart reminders, email support.
- **Premium £6.99/мес** (RECOMMENDED): unlimited services, unlimited logins, «typical savings £960», WhatsApp chat, cash rewards (комиссии от провайдеров возвращаются юзеру). Эквивалент «23p в день». ([nous.co/pricing](https://www.nous.co/pricing), [examinerlive](https://www.examinerlive.co.uk/whats-on/shopping/nous-co-household-bills-33740054))

**AI-объяснение документов:** ДА — это сердцевина. Generative-AI читает и суммирует счёт, объясняет «важные детали», вытаскивает даты. Но: фокус строго на **household bills** (энергия/бродбенд/мобайл/ипотека), НЕ на произвольных контрактах/BNPL.

**UK-доступность:** Да, UK-native, FCA/ICO-контекст.

**App-store рейтинг:** прямую карточку App Store по ID вытащить не удалось (404 на пробном URL); публичный рейтинг в выдаче не зафиксирован — нужно перепроверить вручную на App Store GB перед финалом wireframes.

**Что перенять:** (а) email-инбокс как способ «впитывать» обязательства без bank link; (б) «contract end date» как трекаемая сущность с reminder; (в) экономия в £ как hero-метрика на pricing.
**Чего избегать:** привязка ценности к **switching/affiliate-комиссии** — Decode для 18–25 BNPL это не релевантно (у них нет ипотек/энергоконтрактов на переключение). Ниша Nous = взрослые домохозяйства, не Gen Z с BNPL.

---

## 2. Emma

**Positioning.** «Budget Planner & Tracker» — комплексный budgeting/субскрипшн-трекер на Open Banking. «Track bills, cancel unwanted subscriptions, free up money instantly… Never miss a payment again.» 3+ млн пользователей в 2026. ([apps.apple.com GB](https://apps.apple.com/gb/app/emma-budget-planner-tracker/id1270062373), [moneytothemasses](https://moneytothemasses.com/banking/emma-review-is-it-the-best-budgeting-app))

**Core flow.** Подключение банков через Open Banking → агрегация транзакций → авто-детект подписок и регулярных платежей → бюджеты, категории, напоминания об оплате, инструменты отмены подписок.

**Как добавляются обязательства:** **bank link (Open Banking)** — детект подписок из транзакций. (Противоположность Decode.)

**Pricing (перепроверено в help-центре Emma).** Free + 3 платных тарифа, 7-дневный триал:
- **Emma Plus** — £4.99/мес (£41.99/год)
- **Emma Pro** — £9.99/мес (£83.99/год) — custom categories, offline accounts, split transactions
- **Emma Ultimate** — £14.99/мес (£124.99/год) — несколько spaces (личн./бизнес/совм.), приглашение до 4 человек по £5.99/мес каждый
Годовая оплата ≈ −30%. ([help.emma-app.com pricing](https://help.emma-app.com/en/article/how-much-does-emma-plusproultimate-cost-1ywhulq/), [emma-app.com/plans](https://emma-app.com/plans/compare-emma-plans))

**AI-объяснение документов:** НЕТ объяснения документов. AI используется для категоризации транзакций, не для чтения PDF/контрактов.

**UK-доступность:** Да, UK-first.

**App-store рейтинг:** **4.7★, ~25 000 ratings** (App Store GB). ([apps.apple.com GB](https://apps.apple.com/gb/app/emma-budget-planner-tracker/id1270062373), [moneytothemasses](https://moneytothemasses.com/banking/emma-review-is-it-the-best-budgeting-app))

**Что перенять:** «Never miss a payment» + cancel-flow для подписок — сильная боль, релевантна BNPL. Чистая иерархия тарифов.
**Чего избегать:** полная завязка на Open Banking; перегруженность фич (бюджеты/инвест/нетворс) размывает фокус — Decode выигрывает узостью.

---

## 3. Snoop

**Positioning.** Бесплатное UK money-management приложение на Open Banking: трекает spending, bills и подписки по всем счетам, флагует забытые подписки и более дешёвые тарифы. Принадлежит **Vanquis Banking Group** (поглощён в июле 2023; **жив и развивается**, в 2024 добавлен free credit score через Equifax). ([getsmartsaver review](https://getsmartsaver.co.uk/snoop-uk-review-2026/), [Wikipedia Snoop](https://en.wikipedia.org/wiki/Snoop_(company)), [openbanking.org.uk](https://www.openbanking.org.uk/apps/snoop/))

**Core flow.** Подключить счета через Open Banking → разбивка трат → персональные «insights» на основе транзакций → флаги подписок и savings (например, бродбенд дешевле / неиспользуемый стриминг).

**Как добавляются обязательства:** **bank link (Open Banking, AISP)**. Snoop регулируется FCA как AISP, не может двигать деньги.

**Pricing (перепроверено в обзорах 2026).** Free покрывает большинство юзеров. **Snoop Plus ≈ £5.99/мес или £39.99/год** — custom budgets, multi-card cashback, unlimited account connections. Монетизация: affiliate-комиссии за переключения + Plus. ([getsmartsaver](https://getsmartsaver.co.uk/snoop-uk-review-2026/), [slowmoneymovement](https://www.slowmoneymovement.com/platform-spotlights/snoop-review))

**AI-объяснение документов:** НЕТ. «AI/personalised insights» = инсайты по транзакциям, не объяснение документов.

**UK-доступность:** Да, UK-native, FCA-regulated.

**App-store рейтинг:** конкретное число в этой сессии не зафиксировано (перепроверить вручную); репутация стабильно «хорошая» в обзорах 2026.

**Что перенять:** «забытая подписка» как навязчивый, понятный триггер; бесплатный core. **Чего избегать:** affiliate-switching-модель + Open Banking — не для no-bank Gen Z позиционирования.

---

## 4. Cleo — ВЕРНУЛСЯ В UK (фев 2026) ⚠️

**Positioning.** «Первый в мире AI financial assistant» — чат-бот, который вместо дашборда **разговаривает** с тобой о деньгах: spending insights простым языком, savings, bills, «Roast Mode»/«Hype Mode». Изначально Gen-Z бренд (sassy tone), но UK-релонч таргетит исследование на **взрослых 28–40** — не чисто Gen Z. ([cfotech.co.uk](https://cfotech.co.uk/story/cleo-relaunches-uk-ai-money-app-to-ease-cash-anxiety), [prnewswire UK](https://www.prnewswire.co.uk/news-releases/cleo-brings-ai-powered-money-management-back-to-the-uk-302679663.html))

**КРИТИЧНО ДЛЯ DECODE:** Cleo **вернулся в UK 5 февраля 2026** после лет фокуса только на США. Staged rollout + waitlist через App Store. Это самый свежий конкурентный сдвиг с момента трека 01. ([prnewswire UK](https://www.prnewswire.co.uk/news-releases/cleo-brings-ai-powered-money-management-back-to-the-uk-302679663.html), [financialit.net](https://financialit.net/news/infrastructure/cleo-brings-ai-powered-money-management-back-uk))

**Core flow.** Connect bank (read-only) → чат с AI вместо дашборда → инсайты по тратам/сбережениям/счетам plain-language → находит забытые подписки и повторяющиеся списания → spending summaries.

**Как добавляются обязательства:** **bank link (read-only Open Banking)** + чат. НЕ document scan.

**Pricing (перепроверено по help-центру Cleo, цены в USD — UK GBP-эквивалент уточнить на месте).** Free (мощный) + платные: **Cleo Grow $2.99/мес**, **Cleo Plus $5.99/мес ($44.99/год)**, **Cleo Pro $8.99/мес**, **Cleo Builder $14.99/мес** (secured credit-builder card). Plus открывает cash advance, credit score, Debt Reset. ([web.meetcleo.com/pricing](https://web.meetcleo.com/pricing), [thepennyhoarder](https://www.thepennyhoarder.com/budgeting/cleo-app-review/))

**AI-объяснение документов:** НЕТ объяснения документов — но ЕСТЬ **conversational AI** (главная угроза по форме: тот же «разговорный» UX, который Decode мог бы считать своим дифференциатором).

**UK-доступность:** ДА (с фев 2026, поэтапно).

**App-store рейтинг:** **~4.7★, ~2 621 ratings** (Cleo AI Ltd, синк ~май 2026); Trustpilot 4.1/5 (3 713 отзывов). ([apps.apple.com](https://apps.apple.com/us/app/cleo-ai-cash-advance-budget/id1447274646), [uk.trustpilot](https://uk.trustpilot.com/review/meetcleo.com))

**Что перенять:** разговорный, эмоциональный тон («cash anxiety», Roast/Hype) — резонирует с молодой аудиторией. **Чего избегать:** cash-advance/credit-builder монетизация = долговая модель, конфликтует с «guardian»-этикой Decode; и Cleo завязан на bank link.

---

## 5. Plum

**Positioning.** «AI» savings & investing app — авто-сбережения, инвестиции, плюс budgeting. Менее про «обязательства», больше про «отложить и вложить».

**Core flow.** Connect bank → авто-правила сбережений → инвест-портфели → budgeting-инструменты.

**Как добавляются обязательства:** **bank link** (Open Banking).

**Pricing (перепроверено, реструктуризация июль 2025).** Новые тарифы: **Boost £7.99/мес**, **Max £14.99/мес** (Plum Visa debit на Boost+). Легаси (до 7 июля 2025): Basic/Pro £2.99 / Ultra £4.99 / Premium £9.99. ([investing-reviews](https://investing-reviews.co.uk/reviews/plum-savings/), [compareandinvest Premium](https://compareandinvest.co.uk/robo-adviser/plum-premium/))

**AI-объяснение документов:** НЕТ.

**UK-доступность:** Да.

**App-store рейтинг:** в этой сессии чистое iOS-число не зафиксировано; Trustpilot 4/5 (9 143 отзыва). ([uk.trustpilot withplum](https://uk.trustpilot.com/review/withplum.com))

**Вывод:** наименее близкий из «budgeting»-кластера — Plum про savings/investing, не про обязательства/документы. Релевантен лишь как ценовой ориентир (£7.99–14.99).

---

## 6. Little Birdie — МЁРТВ (как независимый продукт) ✝

**Статус:** приостановил операции **17 мая 2024** (сайт, app, расширение выключены). В августе 2024 поглощён **Cashrewards** (ANZ-связанный), планировали релонч к Black Friday как часть платформы Cashrewards. Это **австралийский e-commerce price/deal-aggregator**, не UK и не финдокументы. ([startupdaily](https://www.startupdaily.net/topic/business/fowl-play-cba-backed-ecommerce-site-little-birdie-shuts-down/), [smartcompany](https://www.smartcompany.com.au/retail/little-birdie-suspends-operations-promises-ai-future/), [powerretail](https://powerretail.com.au/cashrewards-acquires-little-birdie/))

**Вывод для Decode:** нерелевантен (AU, e-commerce deals, не финдоки, не UK). Из watch-list можно снять. Урок: даже с $30M от CBA price-aggregator-модель не выжила соло — подтверждает, что «дилы/экономия» сами по себе — слабый retention-крючок.

---

## 7. Adobe Acrobat AI Assistant — contract intelligence + citations

**Positioning.** Generative-AI поверх PDF/документов: для контрактов — **contract intelligence** (анонс фев 2025). Авто-распознаёт, что документ — контракт (включая сканы), даёт overview, вытаскивает key terms в один клик, суммирует и **рекомендует вопросы**, специфичные для документа. ([businesswire](https://www.businesswire.com/news/home/20250204672701/en/Adobe-Acrobat-AI-Assistant-Introduces-New-Generative-AI-Features-to-Make-Understanding-Contracts-Easier-for-Everyone), [Adobe blog](https://blog.adobe.com/en/publish/2025/02/04/adobe-acrobat-ai-assistant-helps-quickly-confidently-manage-contracts-reviews-business-professionals-say), [computerworld](https://www.computerworld.com/article/3816432/adobe-enhances-acrobat-ai-with-contract-intelligence-to-streamline-enterprise-workflows.html))

**Ключевые фичи.**
- AI-summary контракта **простым языком с кликабельными, верифицируемыми citations** (тыкаешь — прыгаешь к месту в документе). ← **это образцовый паттерн для Decode.**
- Сравнение **до 10 контрактов** одновременно для поиска расхождений.
- Извлечение key terms, детект discrepancies.
- Mobile: Acrobat работает на телефоне (review/sign «tap of a phone»), но **iOS-специфичных contract-intelligence фич на 2026 в выдаче не подтверждено** — фокус анонса был desktop/enterprise.

**Как добавляются обязательства:** **scan/upload документа** (включая сканы). Никакого bank link.

**AI-объяснение документов:** ДА — лучший в классе по «document → plain-language + citations». Но: **enterprise/professional фокус**, не consumer-finance, не «трекаемое обязательство с напоминанием», не BNPL, не UK-специфика.

**Pricing:** часть подписки Acrobat/AI Assistant add-on (не consumer-finance ценник; вне прямого сравнения).

**Что перенять (ГЛАВНОЕ):** **citations-паттерн** — каждое AI-утверждение кликабельно ведёт к исходной строке документа = доверие + проверяемость. Авто-распознавание типа документа → подстройка интерфейса. «Recommended questions» к конкретному документу.
**Чего избегать:** enterprise-тон, multi-contract-сравнение (overkill для 18–25), отсутствие «обязательство-как-сущность-с-датой».

---

## 8. Bobby — эталон no-bank manual

**Positioning.** Минималистичный **manual** subscription-трекер для iOS (с ~2016). Красивый UI, локальное хранение, без bank link.

**Core flow.** Вручную добавляешь подписку (название, цена, цикл, иконка) → видишь month/year total → получаешь payment reminders. **Данные не покидают устройство.** ([apps.apple.com Bobby](https://apps.apple.com/us/app/bobby-track-subscriptions/id1059152023), [hulry](https://hulry.com/track-subscriptions/))

**Как добавляются обязательства:** **100% manual entry.** Никакого bank link, email, scan.

**Pricing:** Free + **разовая** IAP «all-in-one pack» ~$1.99 (обычно $3) для unlimited. Без подписки. ([hulry](https://hulry.com/track-subscriptions/))

**AI-объяснение документов:** НЕТ (это намеренно «тупой» красивый трекер).

**UK-доступность:** Да (глобально на App Store).

**Что перенять:** доказательство, что **no-bank + manual + privacy + красивый UI** = жизнеспособный, любимый продукт. Разовая оплата как анти-фрикшн. Иконки/визуал подписок.
**Чего избегать:** отсутствие AI и «понимания» — ровно тот gap, который закрывает Decode (manual-ввод утомителен; Decode заменяет его scan→AI-extract). Bobby — это «floor», который Decode должен перепрыгнуть умом.

---

## 9. Rocket Money (ex-Truebill) — НЕ в UK

**Статус:** **только США, только US-банки.** Построен на Plaid + US-инфраструктуре отмены/негоциации. Никакой UK-версии, анонсов экспансии в UK/Европу нет (на 2026). ([orbitmoney compare](https://orbitmoney.io/compare/rocket-money-uk), [Rocket Money help](https://help.rocketmoney.com/en/articles/79778-does-rocket-money-support-international-banks))

**Вывод:** прямой угрозы в UK НЕТ. Но это эталон модели «bill negotiation + cancellation concierge» — если кто-то клонирует её в UK, угроза вырастет. Пока окно открыто.

---

## Сравнительная таблица: механика входа × pricing × AI-объяснение × no-bank × UK

| Продукт | Механика входа обязательств | Pricing (перепроверено) | AI-объяснение **документов** | No-bank? | UK? | iOS рейтинг |
|---|---|---|---|---|---|---|
| **Decode (мы)** | **scan/upload → AI-extract + manual** | TBD | **ДА (ядро)** | **ДА** | **ДА** | — |
| **Nous** | upload + email-инбокс | Free / £6.99 мес | ДА (только bills) | **ДА** | ДА | n/a (перепроверить) |
| **Emma** | bank link (Open Banking) | £4.99 / £9.99 / £14.99 мес | Нет | Нет | ДА | 4.7★ ~25k |
| **Snoop** | bank link (AISP) | Free / ~£5.99 мес | Нет | Нет | ДА | «хорошо» (перепроверить #) |
| **Cleo** ⚠️ | bank link (read-only) + чат | Free / $2.99–14.99 мес | Нет (но conversational AI) | Нет | **ДА (с фев 2026)** | 4.7★ ~2.6k |
| **Plum** | bank link | Boost £7.99 / Max £14.99 мес | Нет | Нет | ДА | Trustpilot 4/5 |
| **Little Birdie** ✝ | — (e-commerce deals) | — | Нет | — | Нет (AU) | мёртв 2024 |
| **Adobe Acrobat AI** | scan/upload документа | Acrobat-подписка/add-on | **ДА (best-in-class, citations)** | **ДА** | глобально | enterprise |
| **Bobby** | **100% manual** | Free + разовый ~$1.99 | Нет | **ДА** | ДА | высокий |
| **Rocket Money** | bank link (Plaid) | $6–12 мес (US) | Нет | Нет | **Нет (US-only)** | — |

**Чтение таблицы:** в правом верхнем квадранте «no-bank × AI-объяснение документов × UK × consumer-finance × обязательство-с-датой» — **пусто**. Nous близко (no-bank + AI-doc), но только bills и не Gen-Z/BNPL. Adobe близко (AI-doc + citations + no-bank), но enterprise и без трекинга обязательств. Bobby close на no-bank, но без AI. **Никто не стоит ровно в дыре Decode.**

---

## Кто приблизился к дыре Decode с момента трека 01 (watch-list угроз)

Ранжировано по близости к дыре «понимание документа → отслеживаемое обязательство, без bank link».

### 🔴 Высокая близость / появилось за ~6 мес

1. **Cleo вернулся в UK (5 фев 2026).** Самый свежий сдвиг. Conversational-AI UX, который Decode мог бы считать своим, теперь активно в UK с waitlist-моментумом. НО: bank-linked, без document-scan, без contract-explanation, таргет сместился на 28–40. **Угроза форме (разговорный AI), не сути (no-bank doc-decoding).** Мониторить: не добавят ли scan/contract-фичи. ([prnewswire UK](https://www.prnewswire.co.uk/news-releases/cleo-brings-ai-powered-money-management-back-to-the-uk-302679663.html))

2. **ReSubs** (Subscription Manager, iOS/Android). **Прямой no-bank конкурент с AI-входом:** добавление вручную ИЛИ **AI-extract из скриншотов и billing-email**, CSV-импорт, Gmail-receipt scan; states (active/paused/cancelled/trial), reminders, **30+ cancel-гайдов**, multi-currency, календарь продлений, аналитика. Free + Premium (unlimited). **Самый близкий по механике «AI вытаскивает обязательство без bank link».** Но: только про подписки, без «понимания документа/контракта» и без BNPL-фокуса. ([apps.apple.com ReSubs](https://apps.apple.com/us/app/subscription-manager-resubs/id6740457603), [resubs.app](https://resubs.app/resources/best-subscription-tracker-apps), [trackallsubs](https://trackallsubs.com/blog/best-free-subscription-tracker-no-bank))

3. **Revolut AIR** (запуск 9 апр 2026, 13 млн UK-юзеров). In-app conversational AI: spending analysis, **subscription oversight**, card-freeze, инвест-трекинг, тревел. Бесплатно, все тарифы. **Огромный дистрибуционный риск** — нормализует «поговори с AI о деньгах» для всей UK-аудитории. НО: bank-locked (только то, что юзер уже видит в Revolut), без document-scan/contract-decoding. ([fintechweekly](https://www.fintechweekly.com/news/revolut-air-ai-assistant-uk-customers-launch-2026), [ai2.work](https://ai2.work/blog/revolut-s-air-assistant-can-freeze-cards-and-decode-your-spending))

### 🟠 Средняя близость / контекстная угроза

4. **Starling Bank AI-ассистент** (март 2026) и **NatWest agentic assistant** (март 2026) — incumbent-банки добавляют conversational AI. Bank-locked, не doc-decoding, но нормализуют AI-чат о финансах. ([useorigin](https://useorigin.com/resources/blog/10-breakthrough-ways-ai-is-transforming-your-finances-in-2026))

5. **SnapBill: AI Receipt Scanner** (iOS). AI читает чеки/билинги: категоризация, извлечение items/totals/taxes, печатные и рукописные, любой язык, без bank link. Близко по «scan→AI-extract», но это **expense/receipt-трекер**, не contract-decoder и не commitment-guardian. ([apps.apple.com SnapBill](https://apps.apple.com/us/app/snapbill-ai-receipt-scanner/id6759326743))

6. **BNPL-регуляция (FCA, с 15 июля 2026).** Не конкурент, а **рыночное окно**: с 15 июля 2026 FCA регулирует Deferred Payment Credit (Klarna/Clearpay/PayPal Pay-in-3). Юзеров призывают «проверять все BNPL-приложения и суммировать обязательства за 6 недель» — **но дедицированного кросс-провайдерного BNPL-трекера НЕТ**; управление разбросано по апам провайдеров. Это **подтверждает дыру Decode** и создаёт regulatory-tailwind/PR-момент. ([globenewswire BNPL report](https://www.globenewswire.com/news-release/2026/02/03/3230813/0/en/United-Kingdom-Buy-Now-Pay-Later-Business-Report-2026-A-106-45-Billion-Market-by-2031-from-48-56-Billion-in-2026-Klarna-Leads-App-Engagement-Monzo-Revolut-Barclays-Expand-Instalmen.html), [pocketwise Klarna](https://pocketwise.co.uk/debt/buy-now-pay-later/klarna-guide-uk/), [herm.io BNPL reg](https://www.herm.io/shopping-tips/bnpl-regulation-uk-2026-klarna-clearpay-paypal/))

### 🟢 Не угроза / снять с радара
- **Little Birdie** ✝ — мёртв/поглощён, AU, e-commerce deals.
- **Rocket Money** — US-only, нет UK-планов.
- **Adobe Acrobat AI** — enterprise/pro, не consumer-finance, без commitment-tracking.

**Итог watch-list:** **никто не стоит ровно в дыре.** Ближайшая прямая угроза по механике — **ReSubs** (AI-extract без bank link), но она про подписки, без «понимания контракта/документа» и без BNPL-позиционирования. Главный системный риск — **нормализация conversational-AI о деньгах** (Cleo UK + Revolut AIR + Starling + NatWest) — поднимает планку ожиданий к UX и может «съесть» разговорный дифференциатор. **Дверь Decode = doc-decoding + commitment-as-tracked-object + no-bank + BNPL/18–25 + UK** остаётся открытой, но окно закрывается; вход в wireframes своевременен.

---

## Что перенять в wireframes / чего избегать

### Перенять
1. **Citations-паттерн Adobe** — каждое AI-утверждение («твой платёж £40 каждые 2 недели до 14 авг») кликабельно ведёт к исходной строке/месту в документе. Это ядро доверия для no-bank AI. ([Adobe](https://blog.adobe.com/en/publish/2025/02/04/adobe-acrobat-ai-assistant-helps-quickly-confidently-manage-contracts-reviews-business-professionals-say))
2. **«Обязательство как сущность с датой» (Nous)** — извлечённая дата (конец контракта / следующий платёж) = трекаемый объект с reminder. Сделать первый-классным citizen в UI.
3. **Email-инбокс-коннект как no-bank источник (Nous)** — опциональная пересылка билингов/подтверждений → авто-впитывание обязательств без bank link. Дешевле фрикшн, чем чисто-manual Bobby.
4. **AI-extract из скриншота/фото (ReSubs/SnapBill)** — для 18–25 «сфоткай BNPL-экран Klarna» проще, чем ручной ввод. Camera-first capture.
5. **«Забытая подписка/платёж» как навязчивый триггер (Emma/Snoop)** — мощная, понятная боль; вынести в эмпти-стейт/онбординг.
6. **Эмоциональный, разговорный тон (Cleo)** — «cash anxiety», поддержка, не нравоучение — но БЕЗ долговой монетизации. «Guardian», а не «roast».
7. **Разовая оплата / щедрый free (Bobby)** — анти-фрикшн для молодой аудитории; рассмотреть разовую разблокировку vs подписку.
8. **«Recommended questions» к документу (Adobe)** — после скана предлагать «А есть ли поздняя комиссия?», «Когда последний платёж?» — снижает порог входа в чат.

### Избегать
1. **Bank-link-онбординг** (Emma/Snoop/Cleo/Plum) — главный фрикшн и недоверие у 18–25; это и есть наш дифференциатор. Никаких Open Banking-экранов в core-flow.
2. **Affiliate-switching/негоциация как ценность** (Nous/Snoop/Rocket Money) — нерелевантно BNPL-юзеру (нет энергоконтрактов на переключение); создаёт конфликт интересов.
3. **Долговая монетизация** (Cleo cash-advance/credit-builder, Plum-инвест) — противоречит «guardian»-этике; BNPL-аудитория уже в долговом риске.
4. **Фич-перегруз** (Emma: бюджеты+инвест+нетворс) — размывает «decode → track». Узость = преимущество.
5. **Enterprise-тон и multi-doc-сравнение** (Adobe) — overkill для одного BNPL-договора у 18-летнего.
6. **Чисто-manual ввод** (Bobby) — утомляет; заменить scan→AI-extract, manual оставить как fallback.
7. **Pure price-aggregator / deals-модель** (Little Birdie ✝) — доказанно слабый retention, не выжила даже с CBA-деньгами.

---

## Summary (5–7 предложений)

Карта подтверждает: **никто не стоит ровно в дыре Decode** (понимание документа → трекаемое обязательство, без bank link, для BNPL 18–25, UK). Ближайшие по духу — **Nous** (AI читает счета без bank link, но только household bills и для взрослых домохозяйств, £6.99/мес) и **Adobe Acrobat AI** (эталонный AI-doc-explanation с кликабельными citations, но enterprise и без commitment-tracking); **Bobby** доказывает жизнеспособность no-bank-manual-privacy-модели, но без AI. Главный свежий сдвиг с трека 01 — **Cleo вернулся в UK 5 фев 2026** (4.7★/~2.6k), плюс **Revolut AIR** (9 апр 2026, 13 млн UK), Starling и NatWest добавили conversational AI: они нормализуют «разговор с AI о деньгах» и поднимают UX-планку, но все **bank-locked и без document-decoding**. Прямейшая угроза по механике — **ReSubs** (AI-extract обязательств из скриншотов/email без bank link), однако она только про подписки, без «понимания контракта» и без BNPL-фокуса. Сильный попутный ветер: **FCA регулирует BNPL с 15 июля 2026**, юзеров призывают суммировать обязательства по всем провайдерам — а дедицированного кросс-провайдерного BNPL-трекера НЕТ. Для wireframes: перенять citations-паттерн, «обязательство-как-сущность-с-датой», email/scan/AI-extract как no-bank-входы и эмоциональный guardian-тон; избегать bank-link-онбординга, affiliate-switching, долговой монетизации и фич-перегруза. Окно открыто, но закрывается — вход в wireframes своевременен.

---

### Открытые пункты для ручной перепроверки (не было прямого доступа к карточкам App Store GB)
- Точный iOS-рейтинг и кол-во ratings для **Nous**, **Snoop**, **Plum** на App Store GB.
- **UK-GBP**-ценник Cleo (в выдаче — USD-тарифы; UK может отличаться).
- Подтвердить, нет ли у Cleo/Revolut AIR анонсов document-scan/contract-фич после июня 2026.
