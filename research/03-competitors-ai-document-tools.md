# Decode — Competitive research, трек "competitors-ai-doc"
## AI document-understanding инструменты: насколько занята ниша "snap financial doc → plain English + traps"

Дата ресёрча: 10 июня 2026. Метод: ~19 веб-поисков + проверка первоисточников (официальные сайты, App Store, FTC, Adobe newsroom, Trustpilot). Все существенные факты — с inline URL. Цены актуальны на дату ресёрча, если не указано иное.

---

## TL;DR — вердикт

**Прямой конкурент Decode не найден.** Нет mobile-first consumer-приложения, которое: (а) фотографирует именно *финансовый* документ (credit/BNPL offer, страховка, utility), (б) даёт plain-English summary, (в) считает true cost детерминированным движком, (г) флагует ловушки по доменной библиотеке, и (д) затем ведёт документ в Vault с напоминаниями о renewal. Ниша занята **по краям**:

1. **Generic AI-PDF чаты** (Adobe AI Assistant, ChatPDF, Humata, AskYourPDF) — мощные, дешёвые, но web-first, без финансовой математики, без trap-библиотеки, без lifecycle (документ "умирает" после чата).
2. **Consumer contract-explainers** (Legalese Decoder, AI Lawyer, DoNotPay) — generic legal, репутация подпорчена dark-pattern биллингом и регуляторными исками; ни у кого нет true-cost расчёта.
3. **App Store long tail** — десятки тонких GPT-wrapper "Contract Analyzer" приложений с weekly-подписками и нулевой трекшн (4 оценки у лидера выдачи).
4. **B2B (Kira, Luminance)** — enterprise, другой канал, но доказывают ценность "anomaly detection" в документах.
5. **UK-сосед Nous.co** — ближайший по духу к Renewal Radar (следит за renewal-датами счетов, £6.99/мес Premium), но работает от подключения счетов, а не от понимания произвольных документов, и не объясняет условия.

**Главные угрозы:** (1) Adobe — contract intelligence за $4.99/мес add-on уже на mobile; (2) бесплатный ChatGPT/Gemini как "default tool" — пользователь может просто сфотографировать документ в ChatGPT. Защита Decode — то, что LLM-чаты не дают: детерминированный расчёт, структурированная trap-библиотека под UK-кредитные продукты, Vault + Renewal Radar, и trust-UX (citations, confidence, on-device обработка).

---

## 1. Generic AI-PDF инструменты ("понять любой документ")

### 1.1 Adobe Acrobat AI Assistant — самый опасный сосед

- **Pricing:** add-on **$4.99/мес** к бесплатному Reader или любому платному Acrobat-плану для individuals ([CNBC, апрель 2024](https://www.cnbc.com/2024/04/15/adobe-releases-acrobat-ai-assistant-starting-at-4point99-a-month.html); подтверждено в [Adobe newsroom, февраль 2025](https://news.adobe.com/news/2025/02/acrobat-ai-assistant-contracts)). Также входит в Acrobat Studio ([adobe.com/acrobat/pricing](https://www.adobe.com/acrobat/pricing.html)).
- **Формат:** desktop, web и **mobile** (iOS/Android Reader), worldwide English ([Adobe newsroom](https://news.adobe.com/news/2025/02/acrobat-ai-assistant-contracts)).
- **Что умеет (релиз Contract Intelligence, февраль 2025):** автоматически распознаёт, что документ — контракт (включая **сканы**), генерирует overview, извлекает key terms; "verified explanations" — кликабельные citations к месту в источнике; сравнение до 10 контрактов; e-sign в том же приложении ([news.adobe.com](https://news.adobe.com/news/2025/02/acrobat-ai-assistant-contracts)).
- **Данные из их же анонса (полезны для питча Decode):** "nearly 70% of consumers have signed contracts or agreements without knowing all the terms"; 64% SMB-владельцев избегали подписывать контракт из-за неуверенности в понимании ([news.adobe.com](https://news.adobe.com/news/2025/02/acrobat-ai-assistant-contracts)).
- **Ограничения vs Decode:** generic (любой контракт, не финансовый домен), нет расчёта true cost, нет trap-библиотеки, нет renewal-напоминаний, UX — "PDF-инструмент с чатом", а не "наведи камеру → решение за 30 секунд". Privacy-плюс: Adobe заявляет, что не тренирует genAI на данных клиентов.
- **Вывод:** Adobe валидировал и спрос, и паттерны (citations!), но его юнит — *документ*, а юнит Decode — *финансовое обязательство во времени*.

### 1.2 ChatPDF

- **Pricing:** Free — 2 документа/день, до 120 страниц, ограничение на вопросы (~50/день); **Plus ~$19.99/мес или $139.99/год** по свежим обзорам 2026 ([tenorshare review](https://ai.tenorshare.com/pdf-chatgpt/chatpdf-review.html), [elephas.app](https://elephas.app/blog/chatpdf-review)). Внимание: в старых обзорах фигурируют $5–6.99/мес — цена росла; официальная страница цен не публикует число в статике ([chatpdf.com](https://www.chatpdf.com/)).
- **Формат:** web-first, "all you need is a web browser"; нативного официального iOS-приложения не обнаружено (в App Store — клоны).
- **Фичи:** чат с PDF, summary, **кликабельные cited sources**, multi-file folders, GPT-4o routing, SOC2 Type II ([chatpdf.com](https://www.chatpdf.com/)).
- **Ограничения:** никакой финансовой специфики, никакой персистентности обязательств, нет камеры/скана как первичного входа.

### 1.3 Humata

- **Pricing:** Free — **60 страниц/мес**; Expert **$9.99/мес** (500 стр./мес, overage $0.02/стр.); Team $49/user/мес (5,000 стр., OCR); Enterprise custom ([humata.ai/pricing](https://www.humata.ai/pricing)).
- **Формат:** web. **Фичи:** Q&A по файлам с citations на релевантные секции ([humata.ai](https://www.humata.ai/)).
- **Ограничения:** позиционирование — research/knowledge base (студенты, команды), не consumer-финансы; страничные лимиты — основной freemium-рычаг.

### 1.4 AskYourPDF

- **Pricing:** Basic free (100 chats/мес, до 100 стр./документ); Premium **$11.99/мес**; Pro **$14.99/мес** (до 6,000 стр./документ); Enterprise custom ([askyourpdf.com/pricing](https://askyourpdf.com/pricing)).
- **Формат:** web + **mobile app** + Chrome extension + ChatGPT/Zotero plugins ([askyourpdf.com](https://askyourpdf.com/)).
- **Ограничения:** то же — generic PDF-чат, лимиты по chats/страницам, без финансового домена.

**Сводно по сегменту:** ценовой коридор consumer AI-doc инструментов — **$5–20/мес**, freemium-рычаг — количество документов/страниц в месяц. Планируемые £3–8/мес Decode сидят внутри коридора и ниже ChatPDF Plus. Ни один игрок сегмента не делает: детерминированную математику стоимости, trap detection, времЕнную составляющую (renewal/payments).

---

## 2. Consumer contract-explainer сервисы

### 2.1 Legalese Decoder

- **Что это:** web-приложение "AI Lawyer Translate Legal Docs To Plain English"; free-переводчик без регистрации + подписки: Home **$9.95/мес** (промо, regular $29.95; 5,000 слов / 10 страниц), Professional $49.95/мес, Business $149.95/мес ([legalesedecoder.com](https://legalesedecoder.com/)).
- **Формат:** только web; нативные iOS/Android заявлены как "future" ([legalesedecoder.com](https://legalesedecoder.com/)).
- **Отзывы:** Trustpilot **3.8/5 при ~25 отзывах**; повторяющиеся жалобы: двойные списания, продолжение биллинга после отмены, списание $10 при попытке пользоваться free-версией, логин-баги ([trustpilot.com/review/legalesedecoder.com](https://www.trustpilot.com/review/legalesedecoder.com)). Позитив — точность "перевода" жаргона ([10web.io review](https://10web.io/ai-tools/legalese-decoder/)).
- **Вывод:** спрос на "plain English" подтверждён, но исполнение (web-only, словесные лимиты, биллинг-практики) оставляет нишу открытой.

### 2.2 DoNotPay — регуляторный прецедент

- **Статус:** FTC финализировала order **16 января 2025**: запрет заявлений, что сервис работает "like a real lawyer" без доказательств, **$193,000** monetary relief, обязательное уведомление подписчиков 2021–2023 ([ftc.gov, пресс-релиз февраль 2025](https://www.ftc.gov/news-events/news/press-releases/2025/02/ftc-finalizes-order-donotpay-prohibits-deceptive-ai-lawyer-claims-imposes-monetary-relief-requires)). FTC установила: продукт не тестировался юристами и не обучался на корпусе законов ([abajournal.com](https://www.abajournal.com/news/article/robot-lawyer-website-donotpay-settles-ftc-claims-it-couldnt-deliver-on-promises)).
- **Сейчас:** подписка **$36 / 3 месяца** (~$12/мес), 100+ consumer-инструментов (cancel subscriptions, appeal fees, complaint letters); доступен в US и UK ([donotpay.com](https://donotpay.com/), [opentools.ai](https://opentools.ai/tools/donotpay)); хронические жалобы на opaque billing и сложную отмену.
- **Вывод для Decode:** (1) не позиционироваться как "AI adviser" — формулировки про advice в UK дополнительно упираются в FCA-периметр финансового совета; (2) "consumer champion" — востребованная, но репутационно-хрупкая позиция: биллинг должен быть безупречным.

### 2.3 AI Lawyer (ailawyer.pro)

- **Формат:** web + **iOS + Android** ([App Store](https://apps.apple.com/us/app/ai-lawyer/id6449912521)).
- **Pricing:** источники расходятся: ~$9.99/нед, $19.99/мес, $99.99/год ([elephas review](https://elephas.app/blog/ai-lawyer-pro)); встречается сетка $5.99/нед "Just Ask" / $11.99/мес / $59.99/год ([scribehow](https://scribehow.com/page/AI_Lawyer_Pricing_2026_All_Plans_Broken_Down_So_You_Pick_the_Right_One__CthhicAcQLeMgGHE7_8GFw)).
- **Отзывы:** хвалят подсветку ограничительных клауз (NDA, non-compete); ругают **weekly-биллинг как ловушку** и несуществующую кнопку отмены ([trustpilot.com/review/ailawyer.pro](https://www.trustpilot.com/review/ailawyer.pro)).

### 2.4 Web-сервисы lease/contract review (consumer)

- **goHeather** — "AI contract review, free to try", отдельные лендинги под rental agreement review ([goheather.io](https://www.goheather.io/ai-document-review/rental-agreement-ai-review)); **Justee** — free lease agreement review ([justee.ai](https://justee.ai/compliance-review/lease-agreement)). Оба — web, lead-gen к юристам/платным отчётам, не mobile-first, не финансы.
- **ByteBeam AI Insurance Policy Analyzer** — бесплатный web-инструмент разбора страховых полисов ([bytebeam.co/tools/policy-analyzer](https://www.bytebeam.co/tools/policy-analyzer)); в US появляются consumer-инструменты вокруг health insurance (Sheer Health — [stateline.org](https://stateline.org/2025/11/20/patients-deploy-bots-to-battle-health-insurers-that-deny-care/)). Подтверждает: insurance — валидный второй документ-тип для Decode.
- **T&C-читалки** (Fine Print, Terms & Policies Summarizer — Chrome extensions; ToS;DR-стиль) — browser-only, про сайты, не про бумажные/PDF финансовые документы ([Chrome Web Store](https://chromewebstore.google.com/detail/fine-print/aeliiloebnjffccdjiejgjjnafffmmch?hl=en)).

---

## 3. App Store long tail: "Contract Analyzer" микро-приложения

Поиск `site:apps.apple.com` показывает **десятки** тонких приложений-обёрток. Ключевые:

| App | Pricing | Фичи | Трекшн |
|---|---|---|---|
| **Contract Analyzer AI** (PaoApps) | free + IAP: $7.99/нед (trial), $19.99/мес, $34.99–69.99/год | plain English, red flags: auto-renewals, penalties, vague terms; чат по документу | **5.0 из 4 (!) оценок**, v1.0.12, июнь 2025 ([App Store](https://apps.apple.com/us/app/contract-analyzer-ai/id6742789139)) |
| **Clarivo — AI Contract Analyzer & Scan** (соло-разработчик) | $5.99/нед, $49.99/год | скан камерой/фото/PDF; plain English; **risk scoring low/medium/high/critical**; **извлечение дедлайнов + push-напоминания**; action-item чеклисты; "text extraction happens on your device… never the original image" | отзывов недостаточно для рейтинга, v1.0.5, апрель 2025 ([App Store](https://apps.apple.com/us/app/ai-contract-analyzer-scan/id6757685548)) |
| DocSpy, Legalyzer, Contract AI и др. | аналогично, weekly IAP | hidden clauses, summaries | минимальный ([поиск App Store](https://apps.apple.com/us/app/docspy-ai-document-checker/id6738056515)) |

**Паттерн сегмента:** GPT-wrapper + weekly-подписка $6–8/нед (дark pattern), generic "legal", нулевая дистрибуция, нет доменной глубины, нет детерминированных расчётов. **Clarivo — самый близкий по фиче-сету к loop Decode** (Scan → plain English → risk score → deadline reminders), но это generic-legal приложение без трекшна и без финансовой математики. Важно: сам факт, что соло-разработчики собирают этот loop, подтверждает техническую реализуемость MVP — и то, что выигрыш будет не в фичах, а в доменной глубине + доверии + дистрибуции.

---

## 4. B2B contract AI — только positioning (кратко)

- **Kira (Litera):** extraction-движок для M&A due diligence; "1,400+ lawyer-trained" моделей, 90%+ точность извлечения провизий; юнит — массив контрактов ([litera.com/products/kira](https://www.litera.com/products/kira)).
- **Luminance (UK):** anomaly detection — подсвечивает документы, отклоняющиеся от нормы; proprietary legal-specific модели, сильна в due diligence и redlining ([luminance.com](https://www.luminance.com/press/legal-teams-become-value-creators-with-luminance39s-ai/); сравнение: [aivortex.io](https://www.aivortex.io/legal/guides/kira-vs-luminance-vs-spellbook/)).
- **Релевантность для Decode:** канал и pricing (enterprise per-seat) не пересекаются. Но "Kira extracts, Luminance flags anomalies" — это ровно пара "key terms extraction + trap detector" Decode, доказанная на enterprise-рынке. Луминансовский фрейминг "focus on the contracts that actually need attention" — хорошая модель для UI приоритизации ловушек.

---

## 5. UK-соседи и контекст

### Nous.co — ближайший сосед Renewal Radar
- UK-сервис: следит за household bills (energy, broadband, mobile), ловит price rises, **мониторит renewal-даты** и сам переключает на лучшие тарифы. Free tier (до 2 сервисов) + **Premium £6.99/мес** ("23p в день") с WhatsApp-апдейтами ([nous.co](https://www.nous.co/), [examinerlive.co.uk](https://www.examinerlive.co.uk/whats-on/shopping/nous-co-household-bills-33740054)). Trustpilot ~500 отзывов, преимущественно позитивные ([uk.trustpilot.com/review/nous.co](https://uk.trustpilot.com/review/nous.co)).
- **Отличия от Decode:** Nous — "сделаем за вас" (switching-агент по подключённым счетам), Decode — "поймите, что подписываете, до подписания + следите после". Не конкурент по wedge (credit/BNPL offers Nous не трогает), но валидирует UK willingness-to-pay **£6.99/мес** за "guardian of bills" — прямо в середине вилки Decode £3–8.

### Регуляторный тайминг (контекст wedge)
- **BNPL входит под FCA-регулирование с 15 июля 2026**: обязательные affordability/creditworthiness checks, "clearer terms" — упрощённая информация о repayment plans, распространение Section 75-защиты ([creditstrategy.co.uk](https://www.creditstrategy.co.uk/cs-regulation/regulation/bnpl-comes-under-uk-regulation-from-july-2026-what-shoppers-and-merchants-need-to-know), [harperjames.co.uk](https://harperjames.co.uk/article/buy-now-pay-later-regulation/)). Момент для wedge "понять BNPL/credit offer" — идеальный: тема в новостях, у потребителей появятся новые право-ожидания, а ловушки никуда не денутся.
- Прямого UK-приложения "сфотографируй credit agreement → plain English" в ходе ресёрча **не найдено** (искал по нескольким формулировкам; выдача — только регуляторные статьи и generic-инструменты).

### ChatGPT как нулевой конкурент
Любой пользователь может бесплатно сфотографировать документ в ChatGPT/Gemini. Это не нашлось в "продуктовой" выдаче, но это главный default-вариант поведения. Контр-позиция Decode: LLM-чат (а) галлюцинирует числа — у Decode числа считает детерминированный движок; (б) не имеет UK-trap-библиотеки; (в) не хранит и не напоминает; (г) не даёт source-citations/confidence в проверяемом виде.

---

## 6. Карта ниши: итоговая матрица

| Игрок | Формат | Цена | Plain English | True cost math | Trap detection | Vault/Renewal | Finance-домен | Mobile-first |
|---|---|---|---|---|---|---|---|---|
| Adobe AI Assistant | desktop/web/mobile | $4.99/мес add-on | да + citations | нет | нет (key terms) | нет | нет | нет |
| ChatPDF | web | free / ~$19.99/мес | да + citations | нет | нет | нет | нет | нет |
| Humata | web | free / $9.99/мес | да + citations | нет | нет | нет | нет | нет |
| AskYourPDF | web + app | free / $11.99/мес | да | нет | нет | нет | нет | частично |
| Legalese Decoder | web | $9.95–149.95/мес | да | нет | нет | нет | нет | нет |
| AI Lawyer | web+iOS+Android | ~$10/нед–$100/год | да | нет | клаузы | нет | нет | да |
| DoNotPay | web+app | ~$12/мес | n/a | нет | нет | отмена подписок | частично | частично |
| Clarivo и App Store long tail | iOS | $5.99–7.99/нед | да | нет | risk score | deadlines+push | нет | да |
| Kira / Luminance | enterprise | per-seat | n/a | нет | anomaly | нет | нет | нет |
| Nous | web+app (UK) | free / £6.99/мес | нет | частично (savings) | price rises | **да** | bills | да |
| **Decode (план)** | **iOS** | **£3–8/мес** | **да** | **да** | **да** | **да** | **да** | **да** |

Колонка "True cost math" пуста у всех — это самый чистый differentiator.

---

## Key takeaways for Decode

**Позиционирование**
1. **Прямого конкурента нет — но и категория не доказана.** Никто не делает "финансовый decoder + commitments guardian" в одном loop. Риск не "нас задавят", а "придётся самим объяснять категорию". В онбординге вести от боли, валидированной Adobe-данными: ~70% потребителей подписывали не понимая условий ([Adobe](https://news.adobe.com/news/2025/02/acrobat-ai-assistant-contracts)) — готовая цифра для лендинга/питча.
2. **Дифференцироваться от "PDF-чатов" и ChatGPT через детерминизм:** "числа считает калькулятор, не нейросеть". Ни один сосед не делает true-cost math — закрепить это в первом экране результата (total cost of credit, £X переплаты, сравнение с альтернативой).
3. **Тайминг wedge подтверждён:** UK BNPL уходит под FCA с 15.07.2026 — строить контент/ASO вокруг "что значит новое BNPL-письмо от Klarna/Clearpay".

**Фичи — позаимствовать**
4. **Clickable citations / "verified explanations" (Adobe, ChatPDF, Humata):** отраслевой стандарт доверия. Source highlighting в Q&A Decode — обязателен с MVP, плюс кликабельный возврат к месту в фото документа.
5. **Risk scoring уровнями (Clarivo: low/medium/high/critical):** trap detector должен выдавать не список, а приоритизированные severity-уровни — "focus on what actually needs attention" (фрейминг Luminance).
6. **Дедлайны → push (Clarivo) и renewal-мониторинг с outcome-метрикой (Nous):** Renewal Radar показывать через сэкономленные деньги ("этот renewal поднимет цену на £X"), а не просто календарь. Nous доказал UK-готовность платить £6.99/мес именно за это.
7. **Privacy-паттерн Clarivo:** "text extraction happens on your device; only the extracted text is analyzed, never the original image" — дословно хорошая формулировка для trust-экрана Decode (финансовые документы = максимальная чувствительность). Adobe-паттерн "we never train AI on your documents" — тоже.
8. **Freemium-рычаг сегмента — документы/месяц** (ChatPDF 2/день, Humata 60 стр./мес, AskYourPDF 100 chats). Для Decode логичен лимит N сканов/мес бесплатно, безлимит + Vault/Radar — в подписке. Цена £3–8/мес конкурентна: ниже ChatPDF Plus ($19.99), на уровне Nous (£6.99) и Humata ($9.99).

**Чего избегать**
9. **Weekly-подписки и трудная отмена** — главный анти-паттерн сегмента (AI Lawyer, App Store long tail, жалобы на Legalese Decoder и DoNotPay). Для продукта, продающего *защиту от ловушек*, биллинг-ловушка фатальна. Только monthly/annual, отмена в 2 тапа, прозрачный trial.
10. **Не overclaim'ить "AI adviser/lawyer":** прецедент FTC против DoNotPay ($193k, запрет недоказанных claims, [ftc.gov](https://www.ftc.gov/news-events/news/press-releases/2025/02/ftc-finalizes-order-donotpay-prohibits-deceptive-ai-lawyer-claims-imposes-monetary-relief-requires)). В UK — следить за периметром FCA financial advice: Decode объясняет документ и считает стоимость, но не рекомендует "брать/не брать" (формулировки "information, not advice" + confidence-индикаторы в Q&A).
11. **Не строить "ещё один PDF-чат":** generic Q&A — коммодити с ценой $0 (ChatGPT). Q&A в Decode — поддерживающая фича после структурированного результата (summary → terms → true cost → traps), а не точка входа.
