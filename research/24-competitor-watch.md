# 24 — Competitor watch (адверсариальное обновление с момента трека 18)

**Дата:** 2026-06-18 · **Метод:** WebSearch (×12 углов) + WebFetch к первоисточникам (App Store, TechCrunch, Finextra, вендоры, регулятор-контекст) · **Контекст:** Decode — iOS-приложение (UK, последняя iOS), AI-декодер финансовых документов + commitments guardian, **БЕЗ bank connection**, для BNPL-аудитории 18–25.

**Дыра Decode (тестируемое утверждение трека 18):** «понимание фин-документа → отслеживаемое обязательство, без bank link, для BNPL 18–25 в UK».

Этот трек **адверсариально** перепроверяет: не закрыл ли кто-то эту дыру с трека 18 (14 июня). Цель — не подтвердить, а опровергнуть гипотезу «дыра пуста». Каждый существенный факт — со ссылкой; чего не нашёл — помечено «не найдено».

---

## 0. TL;DR — что изменилось с трека 18

| Игрок | Статус на 18.06.2026 | Сдвиг с трека 18 |
|---|---|---|
| **Cleo** | Вернулся в UK (фев 2026), bank-linked, conversational, без doc-scan | Подтверждено; **новых doc/scan-фич не появилось** |
| **Revolut AIR** | Запущен 9 апр 2026, 13M UK, execution-engine внутри Revolut | Подтверждено; document upload = только KYC-верификация, **не объяснение** |
| **Nous** | Bills/switching, $9M seed (2022), **новых раундов и credit-пивота не найдено** | **НЕ ушёл в credit** — гипотеза трека 18 о возможном дрейфе не подтвердилась |
| **ReSubs / Finny** | AI-extract из скриншота/билинга, no-bank, только подписки | **Не доросли** до «понимания документа/контракта»; механика capture усилилась |
| **ChatGPT Personal Finance** | Запущен 15 мая 2026, **US-only, Pro-tier, Plaid bank-connect** | НОВОЕ; пока не угроза в UK, но стратегически крупнейшее событие |
| **Adobe Acrobat AI / ChatPDF-класс** | Acrobat Studio (янв 2026) + productivity-agent (май 2026); finance = balance sheets/инвест-презентации | Продвинулись в B2B-финдомен, **не в consumer BNPL** |
| **«AI Contract Analyzer & Scan» (App Store)** | НОВОЕ: scan кредитных/ипотечных договоров, risk-флаги, deadline-reminders, UK-available, $49.99/год | **Ближайшая по механике новая угроза** — но без BNPL-фокуса, citations/Q&A, детерминированного true-cost |

**Вердикт (вынесен в конец):** дыра **по-прежнему пуста ровно в центре**, но периметр сжался с двух сторон — снизу подползает generic «document scanner» класс (App Store), сверху нависает «conversational-AI о деньгах» (Revolut/Cleo/ChatGPT). Окно открыто, но закрывается; launch к 15.07 своевременен.

---

## 1. Статус игроков из задания

### 1.1 Cleo — вернулся в UK, но не в дыру

**Статус.** Cleo относанчился в UK в феврале 2026 (staged rollout + App Store waitlist) после лет фокуса на США. ([finextra](https://www.finextra.com/newsarticle/47264/ai-personal-banking-assistant-cleo-relaunches-in-uk), [cfotech.co.uk](https://cfotech.co.uk/story/cleo-relaunches-uk-ai-money-app-to-ease-cash-anxiety), [PR Newswire UK](https://www.prnewswire.co.uk/news-releases/cleo-brings-ai-powered-money-management-back-to-the-uk-302679663.html))

**Что предлагает в UK (перепроверено).** Conversational-AI: spending analysis по активности счёта, проактивные алерты о предстоящих счетах и cash-flow-давлении, бюджеты, **детект подписок/регулярных платежей**, спендинг-саммари, «Roast Mode»/«Hype Mode», базовые вопросы про финансовые термины простым языком. ([cfotech.co.uk](https://cfotech.co.uk/story/cleo-relaunches-uk-ai-money-app-to-ease-cash-anxiety))

**КРИТИЧНО:** Cleo в UK **НЕ предлагает credit, lending, savings или interest-bearing продукты** (в отличие от US-версии) — UK-оффер урезан. ([cfotech.co.uk](https://cfotech.co.uk/story/cleo-relaunches-uk-ai-money-app-to-ease-cash-anxiety), [financialit.net](https://financialit.net/news/infrastructure/cleo-brings-ai-powered-money-management-back-uk))

**Чего у Cleo НЕТ (релевантно дыре):** объяснения загруженного документа, скана BNPL-оффера, decoding контракта, детерминированного true-cost, citations. Cleo завязан на account-activity (bank-linked модель). Таргет UK-релонча — взрослые **28–40**, не чистый Gen Z (исследование «one in four Britons face money anxiety»). ([cfotech.co.uk](https://cfotech.co.uk/story/cleo-relaunches-uk-ai-money-app-to-ease-cash-anxiety))

**Вывод:** Cleo — **угроза форме (разговорный AI-тон), не сути (no-bank doc-decoding).** С трека 18 doc/scan-фичи **не добавлены**. Мониторить продолжаем.

### 1.2 Revolut AIR — execution-engine, не doc-explainer

**Статус.** Revolut начал раскатку in-app AI-ассистента **AIR (AI by Revolut)** на 13 млн UK-юзеров с **9 апреля 2026**. Открывается свайпом вниз с центра home-экрана или Profile → Chats → AIR. ([revolut.com/news](https://www.revolut.com/news/revolut_enters_new_era_of_money_intelligence_with_launch_of_ai_assistant/), [fintechweekly](https://www.fintechweekly.com/news/revolut-air-ai-assistant-uk-customers-launch-2026), [finextra](https://www.finextra.com/newsarticle/47551/revolut-introduces-ai-assistant-for-money-management))

**Что делает AIR.** Spending insights, card controls (заморозка карты), investment tracking, **subscription management** — всё через разговор. Это «execution engine» внутри экосистемы Revolut. ([progressiverobot](https://www.progressiverobot.com/2026/04/17/what-is-air-by-revolut/), [mena-fintech](https://mena-fintech.org/news/revolut-rolls-out-ai-assistant-for-daily-financial-tasks/))

**Приватность:** AIR видит **только данные, уже видимые юзеру в приложении**; третьи-стороны-AI-партнёры не хранят персональные данные и не обучаются на них. ([revolut.com/news](https://www.revolut.com/news/revolut_enters_new_era_of_money_intelligence_with_launch_of_ai_assistant/))

**Document upload?** В Revolut «upload document» существует **только для KYC/верификации аккаунта** (proof of address: utility bills, банковские/кредитные выписки), не для объяснения содержимого. AIR не позиционируется как «сфоткай оффер — объясню». ([help.revolut.com](https://help.revolut.com/help/sign-up/how-do-i-upload-a-document/))

**Контекст-индустрия:** Starling запустил аналог в марте 2026, NatWest — agentic-ассистент тогда же. **Вся UK-аудитория сейчас приучается «говорить с AI о деньгах».** ([fintechweekly](https://www.fintechweekly.com/news/revolut-air-ai-assistant-uk-customers-launch-2026))

**Вывод:** Огромный **дистрибуционный/нормализационный риск** (поднимает планку UX-ожиданий, может «съесть» разговорный дифференциатор), но **bank-locked, без document-scan/contract-decoding.** Не в дыре.

### 1.3 ReSubs / Finny — capture усилился, «понимание документа» не появилось

**ReSubs.** Privacy-first subscription tracker, **никогда не подключается к банку**. Добавление: вручную, CSV, scan Gmail-чеков, **AI-extract из скриншотов и billing-email**. Фичи: states (active/paused/cancelled/trial), reminders до продления, **30+ cancel-гайдов**, multi-currency, виджеты, календарь продлений, аналитика, AI-savings-tips. Free + Premium. ([resubs.app — best trackers](https://resubs.app/resources/best-subscription-tracker-apps), [apps.apple.com ReSubs](https://apps.apple.com/us/app/subscription-manager-resubs/id6740457603), [resubs.app/faq](https://resubs.app/faq))

> Ограничения по отзывам: проблемы синка между устройствами, «track unlimited for free» оспаривается юзерами (просят оплату до поиска подписок), качество AI-детекта «зависит от доступных данных». ([resubs.app/faq](https://resubs.app/faq))

**Finny.** AI-expense-tracker; подписки — частный случай recurring. **AI-input из текста/голоса/скриншота billing-email**, **Tap to Track** (ловит Apple Pay-транзакции в момент оплаты), Batch Snap & Log (до 5 чеков). Privacy-focused, без обязательного bank-link. ([getfinny.app — best subscription trackers](https://getfinny.app/blog/best-subscription-tracker-apps-2026), [getfinny.app — privacy-focused](https://getfinny.app/blog/privacy-focused-subscription-trackers-2026))

**Доросли ли до «объяснения документов»?** **Нет.** Оба делают **extract** (вытащить сумму/дату/имя сервиса из скриншота/письма) — это OCR+классификация, **не «объясни мне условия / найди ловушку / true cost / Q&A с цитатами».** Доменно — только подписки, нет BNPL-позиционирования, нет понимания договора.

**Вывод:** ReSubs/Finny — **самые близкие по механике** «AI вытаскивает обязательство без bank link», но застряли на capture-слое. Зазор между «extract» и «decode + explain + trap-detect + cited Q&A» — это и есть продукт Decode.

### 1.4 Nous — НЕ ушёл в credit

**Статус.** Nous остаётся **bills/switching-сэйвингс-платформой** (energy, broadband, mobile, mortgage): generative-AI читает счета, вытаскивает дату конца контракта, переключает провайдера ради экономии. ([nous.co](https://www.nous.co/), [nous.co/landing/save-with-ai](https://www.nous.co/landing/save-with-ai))

**Финансирование/пивот.** Последний публичный раунд — **$9M seed, февраль 2022** (Mosaic Ventures, Chalfen Ventures, ангелы — Tom Blomfield/Monzo, Brent Hoberman и др.). **Новых раундов 2025–2026 не найдено; пивота в credit не найдено.** ([TechCrunch 2022](https://techcrunch.com/2022/02/18/nous-seed/), [Crunchbase](https://www.crunchbase.com/organization/nous-8cff)) (NB: «Nous Research», поднявший $50M в апр 2025, — другая компания, не bills-апп.)

**Вывод:** Гипотеза трека 18 «возможный дрейф Nous в credit» **не подтвердилась**. Nous остаётся в своей нише (взрослые домохозяйства, не Gen Z/BNPL). Угрозы дыре не прибавилось.

---

## 2. Новые игроки 2026 (App Store / Product Hunt / новости)

### 2.1 «AI Contract Analyzer & Scan» (App Store) — НОВАЯ ближайшая угроза по механике

**Что это.** Consumer-апп в App Store (UK-available в списке регионов). «Scan or upload any contract, lease, NDA or employment agreement» — обрабатывает в т.ч. **credit card agreements, mortgage documents, tax notices, insurance policies, utility disconnection warnings, medical bills, pension letters**. ([apps.apple.com — AI Contract Analyzer & Scan](https://apps.apple.com/us/app/ai-contract-analyzer-scan/id6757685548))

**Фичи (перепроверено по карточке):**
- Извлекает clauses и **флагует риски по шкале low→critical**;
- Генерит actionable checklists по обязательствам и платежам;
- **Автодетект дедлайнов + push-reminders**;
- Plain-English объяснение «dense legal jargon → clear next steps»;
- **On-device privacy:** текст извлекается на устройстве, анализируется только текст, не оригинал-изображение (у вариантов класса).
- Pricing: free + IAP, **Weekly $5.99 / Yearly $49.99**.

**Чего НЕТ (зазор):** не purpose-built под BNPL; **нет Q&A с citations** (карточка их не упоминает); **нет «ongoing renewal / long-term commitment tracking»** (есть только разовый deadline-detect); нет детерминированного true-cost; не Gen Z-позиционирование; generic-«любой документ», а не финансовый guardian.

**Почему это важно для Decode.** Это **первый consumer-апп, который одновременно: (a) scan документа, (b) plain-English, (c) risk-флаги, (d) платёж-чеклист с reminders, (e) UK-доступен.** То есть нижняя граница дыры поднялась. Decode уже **не первый «сфоткай договор → объясню»**, и часть фичей пересекается. Differentiator Decode сужается до: **BNPL-нишевание + детерминированный true-cost + trap-detector именно под BNPL-паттерны + cited Q&A + Vault/Renewal Radar как трекаемые обязательства во времени** (а не разовый deadline).

### 2.2 Дедицированный кросс-провайдерный BNPL-трекер — НЕ найден

Поиск по «BNPL tracker app UK», «buy now pay later manager iOS», Product Hunt — **дедицированного агрегатора обязательств по Klarna/Clearpay/PayPal не найдено.** Управление по-прежнему разбросано по апам провайдеров; юзерам советуют «вручную проверять Klarna, Clearpay, PayPal и банк перед новой покупкой» (риск debt-stacking). ([herm.io — BNPL reg 2026](https://www.herm.io/shopping-tips/bnpl-regulation-uk-2026-klarna-clearpay-paypal/), [pocketwise — Klarna guide](https://pocketwise.co.uk/debt/buy-now-pay-later/klarna-guide-uk/)) Внутри Klarna-аппа есть управление покупками/возвратами/репеймент, но это **single-provider, внутри стен Klarna.** ([herm.io](https://www.herm.io/shopping-tips/bnpl-regulation-uk-2026-klarna-clearpay-paypal/))

**Вывод:** ключевая часть дыры — **кросс-провайдерное «summary всех BNPL-обязательств без bank link»** — пуста. Это подтверждает wedge и совпадает с регуляторным окном 15.07.

### 2.3 Klarna AI — не лезет в дыру

Klarna AI = customer-support automation (две трети чатов) + shopping-search (в т.ч. в ChatGPT) + внутри-Klarna напоминания о балансах/графике платежей и объяснение purchase power. Это **shopping-ассистент и саппорт**, не decoder офферов других провайдеров и не понимание произвольного документа. ([klarna.com — AI assistant](https://www.klarna.com/international/press/klarna-ai-assistant-handles-two-thirds-of-customer-service-chats-in-its-first-month/), [klarna.com — ChatGPT shopping](https://www.klarna.com/international/press/klarna-launches-ai-powered-shopping-search-app-in-chatgpt/))

### 2.4 Спрос на «AI выбирает Pay Later» растёт (рыночный сигнал)

Опрос PYMNTS (март–апр 2026, 2 034 потребителя): **39%** использовали AI для платёжной активности за 3 мес (бюджет, мониторинг кредит-здоровья, выбор метода оплаты, **сравнение Pay Later-опций**); **61%** допустили бы, чтобы AI-ассистент рекомендовал Pay Later-опцию. ([pymnts](https://www.pymnts.com/bnpl/2026/61percent-of-consumers-would-let-ai-pick-pay-later-options/)) → Спрос на «AI + Pay Later understanding» валидируется; но это про **рекомендацию метода оплаты**, не про decoding оффера. Окно есть, но и крупные игроки видят тот же спрос.

---

## 3. ChatGPT / Adobe / ChatPDF-класс — продвинулись ли в финдомен

### 3.1 ChatGPT Personal Finance — крупнейшее событие, но пока не в UK и bank-linked

**Запуск 15 мая 2026.** OpenAI запустил personal finance в preview **только для ChatGPT Pro в США**. Подключение счетов через **Plaid** (12 000+ институтов: Chase, Amex, Robinhood, Schwab…); дашборд: portfolio performance, spending, **subscriptions, upcoming payments**; вопросы grounded в финконтексте. ChatGPT видит балансы/транзакции/инвестиции/liabilities, **не** полные номера счетов и не делает изменений. ([TechCrunch](https://techcrunch.com/2026/05/15/openai-launches-chatgpt-for-personal-finance-will-let-you-connect-bank-accounts/), [openai.com](https://openai.com/index/personal-finance-chatgpt/), [9to5mac](https://9to5mac.com/2026/05/15/openai-just-released-new-personal-finance-features-for-chatgpt-customers/))

**Релевантно дыре:**
- **US-only, Pro-tier, bank-connect (Plaid)** — три барьера, которые сейчас держат это вне модели Decode (UK / freemium £4.99 / no-bank). ([TechCrunch](https://techcrunch.com/2026/05/15/openai-launches-chatgpt-for-personal-finance-will-let-you-connect-bank-accounts/))
- Объяснение **загруженного финдокумента** (BNPL-оффер/кредит-договор) в анонсе **не упоминается** — модель строится на автосинке через Plaid, а не на «сфоткай документ». ([TechCrunch](https://techcrunch.com/2026/05/15/openai-launches-chatgpt-for-personal-finance-will-let-you-connect-bank-accounts/))

**НО стратегически:** базовый ChatGPT/Claude уже сегодня умеют «загрузи PDF договора — объясню». То есть **generic-LLM — это «floor» угрозы**: технически любой может сфоткать BNPL-T&C в ChatGPT и получить объяснение. Defensibility Decode — НЕ в «LLM объясняет текст», а в: **детерминированный true-cost (не галлюцинирующий счёт), BNPL-специфичный trap-corpus, citations к строке документа, и превращение разбора в трекаемое обязательство (Vault/Renewal Radar).**

### 3.2 Adobe Acrobat — глубже в B2B-финдомен, не в consumer BNPL

**Acrobat Studio** (анонс янв 2026) + новый **productivity agent** (май 2026): chat с PDF, presentations/подкаст-саммари, инсайты. Для финансов — «extract key metrics, trends or risks from **balance sheets, income statements, investor presentations**». Add-on AI Assistant **$4.99/мес**, Acrobat Pro $19.99, Studio $24.99. ([adobe.com — Studio](https://news.adobe.com/news/2026/01/adobe-acrobat-studio-transforms), [adobe.com — productivity agent](https://news.adobe.com/news/2026/05/adobes-new-productivity-agent), [adobe.com — generative-ai-pdf](https://www.adobe.com/acrobat/generative-ai-pdf.html))

**Вывод:** Adobe ушёл в **профессиональный/инвест-финдомен** (отчётность, презентации), а не в **consumer BNPL/кредит-договоры с трекингом обязательств**. Citations-паттерн (excerpt-to-source) — остаётся эталоном для копирования, не прямой угрозой. ChatPDF-класс (paperguide и др.) — generic chat-with-PDF, без финспециализации и без commitment-tracking. ([paperguide](https://paperguide.ai/blog/ai-tools-to-chat-with-pdf/))

---

## 4. Карта угроз на 18.06.2026 (квадрант дыры)

Координаты дыры: **no-bank × AI-объяснение документа × consumer-finance × BNPL-фокус × обязательство-как-трекаемый-объект × UK.**

| Игрок | No-bank | AI-объясн. документа | Trap/true-cost | Трекинг обязательств | BNPL-фокус | UK | Q&A+citations |
|---|---|---|---|---|---|---|---|
| **Decode (цель)** | ✅ | ✅ | ✅ детерм. | ✅ Vault/Radar | ✅ | ✅ | ✅ |
| AI Contract Analyzer & Scan | ✅ (on-device) | ✅ generic | частично (risk-флаг) | разовый deadline | ❌ | ✅ | ❌ |
| ReSubs / Finny | ✅ | ❌ (только extract) | ❌ | ✅ (подписки) | ❌ | ✅ | ❌ |
| Nous | ✅ (upload+email) | ✅ (только bills) | ❌ | ✅ (даты контрактов) | ❌ | ✅ | ❌ |
| Cleo (UK) | ❌ bank-linked | ❌ | ❌ | детект подписок | ❌ (Gen-Z тон) | ✅ | ❌ |
| Revolut AIR | ❌ within-Revolut | ❌ | ❌ | внутри Revolut | ❌ | ✅ | ❌ |
| ChatGPT Pers. Finance | ❌ Plaid | ❌ (в анонсе) | ❌ | subscriptions/payments | ❌ | ❌ (US) | n/a |
| Adobe Acrobat AI | ✅ scan | ✅ (B2B/инвест) | ❌ | ❌ | ❌ | глоб. | ✅ |
| Klarna AI | ❌ within-Klarna | ❌ | ❌ | single-provider | n/a | ✅ | ❌ |

**Чтение карты:** **ни одна строка не закрывает все колонки одновременно.** Самое опасное приближение — **«AI Contract Analyzer & Scan»** (закрыл no-bank + AI-объяснение + risk-флаг + deadline-reminder + UK), но провалил BNPL-фокус, citations/Q&A, детерминированный true-cost и трекинг-во-времени. Центр дыры **пуст.**

---

## 5. Кто ближайшая угроза и насколько близко (ранжировано)

1. **«AI Contract Analyzer & Scan» (App Store, UK).** *Близость: высокая по механике, низкая по нишеванию.* Закрыл scan+plain-English+risk+reminders+UK. Не закрыл: BNPL-фокус, citations, true-cost, ongoing-tracking. **Decode уже не первый «сфоткай договор».** Differentiator сместить в нишу + доверие + трекинг. ([apps.apple.com](https://apps.apple.com/us/app/ai-contract-analyzer-scan/id6757685548))
2. **ReSubs / Finny.** *Близость: высокая по «no-bank capture», средняя в целом.* Лучшая механика «AI вытаскивает обязательство из скриншота». Не понимают документ/контракт, нет BNPL. ([resubs.app](https://resubs.app/resources/best-subscription-tracker-apps), [getfinny.app](https://getfinny.app/blog/best-subscription-tracker-apps-2026))
3. **Generic LLM (ChatGPT/Claude upload-PDF).** *Близость: системный «floor».* Любой может загрузить BNPL-T&C и получить объяснение уже сегодня. Defensibility Decode — true-cost+trap-corpus+citations+трекинг, не «LLM читает текст».
4. **Revolut AIR + Cleo UK + Starling/NatWest.** *Близость: низкая по сути, высокая по нормализации.* Приучают UK «говорить с AI о деньгах» → поднимают UX-планку и грозят разговорному дифференциатору, но bank-locked и без doc-decode. ([revolut.com/news](https://www.revolut.com/news/revolut_enters_new_era_of_money_intelligence_with_launch_of_ai_assistant/), [cfotech.co.uk](https://cfotech.co.uk/story/cleo-relaunches-uk-ai-money-app-to-ease-cash-anxiety))
5. **ChatGPT Personal Finance.** *Близость: пока низкая (US/Pro/bank-link), стратегически высокая.* Если выйдет в UK + добавит document-upload — крупнейшая будущая угроза. Мониторить ежемесячно. ([TechCrunch](https://techcrunch.com/2026/05/15/openai-launches-chatgpt-for-personal-finance-will-let-you-connect-bank-accounts/))
6. **Nous, Adobe, Klarna AI.** *Близость: низкая, не дрейфуют в дыру.* Nous — bills/adult; Adobe — B2B/инвест; Klarna — shopping/single-provider.

**Регуляторный фон (не конкурент, а окно):** FCA регулирует Deferred Payment Credit (Klarna/Clearpay/PayPal Pay-in-3) с **15 июля 2026** — affordability checks, FCA-authorisation, Consumer Duty на каждом чекауте. Это PR/regulatory-tailwind ровно под launch Decode. ([herm.io](https://www.herm.io/shopping-tips/bnpl-regulation-uk-2026-klarna-clearpay-paypal/))

---

## Key takeaways for Decode

**Вердикт по дыре:** **Дыра ещё пуста в центре.** За 4 дня с трека 18 ни Cleo, ни Revolut, ни Nous, ни ReSubs/Finny не вошли в неё. Но периметр сжался: снизу — generic «AI document scanner» класс (новый App Store-апп с scan+risk+reminders+UK), сверху — нормализация conversational-AI о деньгах (Revolut AIR/Cleo/Starling/NatWest) и тень ChatGPT Personal Finance (пока US/bank-linked). Окно открыто, но launch к 15.07 — своевременен, не с запасом.

**Что это меняет в приоритетах MVP:**

1. **Differentiator-сдвиг: Decode уже НЕ «первый сканер договоров».** Появление UK-доступного «AI Contract Analyzer & Scan» означает, что «scan → plain-English → risk-флаг → reminder» больше не уникально. **Не продавать generic «scan any document».** Hero-нарратив = **«BNPL guardian»**: BNPL-нишевание + детерминированный true-cost + BNPL-trap-detector + кросс-провайдерное обязательство-во-времени.

2. **Детерминированный true-cost — главный защитный ров (build).** Generic LLM и сканеры дают plain-English; чего у них нет — **не-галлюцинирующего, посчитанного по правилам true-cost** (сумма платежей, поздние комиссии, эффективная стоимость vs цена). Сделать движок true-cost **вне LLM** (deterministic calc поверх извлечённых полей), LLM — только извлечение+объяснение. Это и точность, и маркетинговое «we don't guess your numbers».

3. **Citations к строке документа — обязательны для доверия (build, P0).** Adobe и Cardo показывают excerpt-to-source как стандарт. Для no-bank AI это ядро доверия: каждое утверждение («£40 каждые 2 недели до 14 авг», «late fee £6») кликабельно ведёт к месту в загруженном оффере. Сканер-конкурент этого НЕ даёт — это видимый зазор.

4. **Обязательство-как-трекаемый-объект во времени, не разовый deadline (build, P0).** Конкуренты-сканеры делают разовый deadline-detect; ReSubs/Finny трекают, но только подписки. Decode-дифференциатор = **Vault + Renewal Radar**: распарсенный оффер становится живым обязательством с графиком платежей и кросс-провайдерным summary. Приоритизировать Vault выше «красивого разбора одного документа».

5. **Camera-first / screenshot capture — must-have паритет (build).** ReSubs/Finny и сканер уже сделали «сфоткай/скриншоть → AI вытащит» нормой для молодых. Для 18–25 «сфоткай Klarna-экран» должно быть дефолтным инпутом, ручной ввод — fallback. Не отстать по фрикшну capture.

6. **Кросс-провайдерное «все мои BNPL за 6 недель» — уникальный незанятый слот (build + GTM).** Дедицированного multi-provider BNPL-трекера в UK НЕТ; FCA-нарратив (debt-stacking, «проверь все апы») создаёт спрос. Это **острие позиционирования к 15.07** — «один экран: все твои Pay-in-3 обязательства, без подключения банка».

7. **No-bank — держать как принцип, это растущий контр-тренд (GTM).** ChatGPT Personal Finance (Plaid), Cleo, Revolut — все bank-linked. ReSubs/Finny явно рекламируют «no bank access, data on device» как фичу приватности. Для 18–25 (недоверие к bank-link) это дифференциатор; выносить «no bank connection needed» в App Store-описание и onboarding как явное обещание.

8. **Тон: guardian, не roast; и не долговая монетизация (design + GTM).** Cleo даёт эмоциональный тон, но в UK урезал credit; долговые модели (cash-advance/credit-builder) конфликтуют с «guardian»-этикой. Decode занимает позицию «на твоей стороне против ловушек», без upsell в долг — отдельно от Cleo и от самих BNPL-провайдеров.

9. **Watch-list на ежемесячный ре-чек (приоритет мониторинга):** (a) ChatGPT Personal Finance → UK + document-upload; (b) добавит ли Cleo/Revolut AIR document-scan/contract-explanation; (c) запустит ли кто-то дедицированный UK BNPL-трекер; (d) не добавит ли «AI Contract Analyzer» класс BNPL-нишевание/citations. Любой из (a)/(c)/(d) — сигнал сузить окно.
