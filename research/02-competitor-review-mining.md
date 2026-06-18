# Decode — Mining негативных отзывов конкурентов (Rocket Money, Cleo, Emma, Snoop, Bobby)

**Трек:** competitors-reviews | **Дата:** 2026-06-10
**Метод:** Trustpilot (1-звёздочные фильтры, выгрузка verbatim через браузер), компиляции App Store отзывов (justuseapp.com), FTC press releases, обзорные сайты. Reddit и прямой App Store API заблокированы для краулера — Reddit-цитаты получить не удалось (помечено ниже честно); тематика Reddit-жалоб реконструирована через вторичные источники.

---

## 1. Сводка по конкурентам

| Продукт | Платформа отзывов | Рейтинг | Ключевая боль |
|---|---|---|---|
| Rocket Money (US) | Trustpilot 3.5★ (~4,100 отзывов, янв. 2026) | App Store 4.5–4.6 vs Trustpilot 3.5 — разрыв | Невозможно отменить Premium; bill negotiation fee 35–60% от «сэкономленного» |
| Cleo (US/UK) | Lifetime 4.5★, но ноябрь 2025 — 2.9★ | FTC-иск, $17M settlement (март 2025) | Списания после отмены; «подписка, чтобы получить $30» |
| Emma (UK) | Trustpilot ~24 стр. отзывов | волна 1★ в 2026 | £83.99 (годовой Pro) списывается с карты МИМО Apple-подписок после «бесплатного» триала |
| Snoop (UK) | Trustpilot 3.2★ (120 отзывов; ~24% — 1★) | — | Bank link не подключается / подключает не тот счёт; ощущение слежки |
| Bobby (iOS) | App Store 4.7★ | негатив концентрированный | Ручной ввод («app does nothing»), нотификации не работают даже в платной версии |

Источники: [Trustpilot Rocket Money](https://www.trustpilot.com/review/rocketmoney.com), [CheckThat.ai Rocket Money](https://checkthat.ai/brands/rocket-money/reviews), [cashadvanceapps.com Cleo complaints](https://www.cashadvanceapps.com/reviews-complaints/cleo-reviews-complaints/), [Trustpilot Emma](https://uk.trustpilot.com/review/emma-app.com), [Trustpilot Snoop](https://uk.trustpilot.com/review/snoop.app), [justuseapp Bobby](https://justuseapp.com/en/app/1059152023/bobby-track-subscriptions/reviews).

---

## 2. Цитаты по продуктам (verbatim)

### Rocket Money — [Trustpilot, фильтр 1★](https://www.trustpilot.com/review/rocketmoney.com?stars=1)

1. **Cancellation hell:** "Impossible to quit. I've had it for two years and haven't used it once… They've sent me through a byzantine process involving my ID and all sorts of other information. Just stop taking my money you hypocrites. I originally downloaded your app to get rid of leaches JUST LIKE YOU." (19 May 2026)
2. **Cancellation hell:** "I tried to cancel my subscription 4 times via email and once via call — all unsuccessful… As I am writing this, I AM STILL TRYING TO CANCEL MY SUBSCRIPTION because the ai they put me in touch with now thinks I should talk to a human... madness" (5 Apr 2026)
3. **Неточность действия + AI-поддержка:** "RocketMoney cancelled the wrong subscription. When I tried to use chat feature, all employees are out for multiple days… and the AI assistant told me I likely did it wrong, which I didn't… Don't waste your time connecting all your accounts for this pile of rubish." (19 May 2026)
4. **Злоупотребление доверенными данными:** "You give Rocket Money a TON of personal information and a lot of trust. So how is it that you will use that information ILLEGALLY… on a second line is someone impersonating me, cursing out the ATT reps" (1 May 2026, про bill negotiation)
5. **Bank link не работает:** "Was never able to connect to my credit union, just get a message that 'they're working on it'." (3 Apr 2026)
6. **Удержание денег + ID-friction:** "…when I attempted to withdraw my own funds, Rocket Money imposed additional verification requirements that were never disclosed upfront. Even after linking my Bank of America account through Plaid and providing a bank statement, I was asked to upload a copy of my government-issued photo ID" (4 Jun 2026)
7. **Core-фича не работает:** "I primarily wanted it to keep an eye on my subscriptions. Did not work… Everytime I tried to get into the site, I had to change my password" (24 Mar 2026)

Контекст: Premium — sliding scale ($6–$12, по другим данным $7–$14/мес), bill negotiation fee — **35–60% от сэкономленного за первый год**, по выбору пользователя ([rocketmoney.com pricing](https://www.rocketmoney.com/learn/personal-finance/how-much-does-rocket-money-cost), [Rocket Money Help Center](https://help.rocketmoney.com/en/articles/2217739-how-much-does-rocket-money-cost), [thewaystowealth.com review](https://www.thewaystowealth.com/rocket-money-review/)). Жалобы на surprise-charges $100+ за negotiation — частый паттерн ([ComplaintsBoard](https://www.complaintsboard.com/rocket-money-b133631), [marksinsights.com](https://marksinsights.com/rocket-money-review/)).

### Cleo — [Trustpilot, фильтр 1★](https://www.trustpilot.com/review/meetcleo.com?stars=1) + [компиляция cashadvanceapps.com](https://www.cashadvanceapps.com/reviews-complaints/cleo-reviews-complaints/)

8. **Подписка вызвала овердрафт:** "they took a monthly fee of 8.99 from my bank which was 20 cents in it so I got a overdraft. Then said I owed them…" (6 Jun 2026)
9. **Bait-and-switch:** "this company took 21.00 off my card for subscription lol to only turn around to give me 30 dollars… it's all lies" (5 Jun 2026)
10. **Plaid ≠ разрешение списывать:** "Cleo withdrew money from my daughter's Social Security account, which I never authorized for payments. Just because the account was visible through Plaid does not mean Cleo had permission to take funds from it." (4 Jun 2026)
11. **Списания после отмены:** "going on 6 months I have cancelled them thru email and called… the same one who steals from My bank account after numerous times cancelling them!" (28 May 2026)
12. **Отмена для уязвимых пользователей:** "I tried to cancel which wasn't easy. I explained that I was a senor [senior] and did not intend to sign up" (24 May 2026)
13. **Account closure:** "I tried to close my account it won't let me and still charging me…" ([cashadvanceapps compilation](https://www.cashadvanceapps.com/reviews-complaints/cleo-reviews-complaints/))
14. **Нет живой поддержки:** "you can't speak to a live representative…" (там же)

**Регуляторный факт (load-bearing):** в марте 2025 FTC подала иск против Cleo AI; компания согласилась выплатить **$17M** (возвраты потребителям) за завышенные обещания cash advance, скрытые условия подписки и препятствование отмене; settlement обязывает Cleo «clearly and conspicuously disclose» условия подписки, получать «express and informed consent» до списания и дать «simple and straightforward way to cancel» — [FTC press release](https://www.ftc.gov/news-events/news/press-releases/2025/03/cash-advance-company-cleo-ai-agrees-pay-17-million-result-ftc-lawsuit-charging-it-deceives-consumers), [материалы дела FTC v. Cleo AI](https://www.ftc.gov/legal-library/browse/cases-proceedings/cleo-ai-inc-ftc-v). FTC отдельно указала на pre-selected планы и «tiny footnotes» ([getoutofdebt.org разбор](https://getoutofdebt.org/174037/cleo-ai-ordered-to-pay-17-million-after-ftc-smackdown-heres-the-dirty-truth-behind-the-helpful-money-app)).

### Emma — [Trustpilot UK, фильтр 1★](https://uk.trustpilot.com/review/emma-app.com?stars=1)

15. **Годовое списание после триала, мимо Apple:** "£83.99 effectively stolen out of my bank account without permission… Emma, where do you take bank details from as this was not a subscription shown in my Apple subscriptions?" (4 Jun 2026) — £83.99 = годовой Emma Pro ([официальный прайс Emma](https://help.emma-app.com/en/article/how-much-does-emma-plusproultimate-cost-1ywhulq/))
16. **Триал без предупреждения:** "I downloaded the app, tried it for 10 minutes & decided it didn't offer what I required, so deleted it… no emails advising me that my free trial was about to run out (7 days apparently)… the robbing swines have stolen £83 quid from me!!!" (25 May 2026)
17. **Механика обхода App Store:** "…because it charges you because it's got all your banking information already it doesn't go through the Apple subscription service so you can't cancel… then it's next to impossible to find where to cancel it in the app" (1 May 2026)
18. **Cancel friction:** "takes £83 a month!! Cannot cancel with ease didn't even sign up and agree subscription fuming!!" (13 May 2026)
19. **Ирония позиционирования:** "Do you pay too many subscriptions? How about pay this subscription to find out. What a load of donkey." (20 Apr 2026)
20. **Неточность категоризации (от платящего лоялиста):** "Month after month still have to recategorise regular transactions or relabel them" (20 Nov 2025)
21. **Образ «sneaky»:** "Turned out they were the sneakiest subscription of them all… Basically a legit scam. Avoid" (10 May 2026)

Контекст по апселлам: Plus £4.99/мес (£41.99/год), Pro £9.99/мес (£83.99/год), Ultimate £14.99/мес (£124.99/год); обзоры отмечают, что Emma «relentless» в прокачке на следующий тир, free-план ограничен 2 подключёнными аккаунтами ([coolcuration.com review](https://coolcuration.com/emma-app-review-uk), [help.emma-app.com](https://help.emma-app.com/en/article/how-much-does-emma-plusproultimate-cost-1ywhulq/)).

### Snoop — [Trustpilot UK, фильтр 1★](https://uk.trustpilot.com/review/snoop.app?stars=1)

22. **Неточность данных:** "My credit score went down by two thirds and my already approved credit builder card vanished! Very poor service and inaccurate spending data." (11 Jan 2026)
23. **Bank link не работает:** "Unable to connect to current account despite doing many times. Waste of time!" (26 Nov 2025)
24. **Onboarding-кошмар Open Banking:** "…tried to link our joint account with natwest it couldn't manage it… this time it wanted photo i/d so gave up… on the fourth and final attempt I realised it had linked to MY Lloyds bank credit card. What a nightmare" (18 Oct 2025)
25. **Страх слежки / over-broad доступ:** "…with this app the whole account is transferred over and all your transactions can be seen. I didn't need my account managed… Didn't feel safe and an invasion of privacy. Snoop is a good name for it! Closed and deleted the app." (11 Aug 2025)

Контекст: Trustpilot 3.2★, ~24% отзывов — 1★; обзоры фиксируют «hesitant to enter their bank details… lack of trust in the security of the data» ([Money To The Masses](https://moneytothemasses.com/banking/snoop-app-review), [upthegains.co.uk](https://upthegains.co.uk/blog/snoop-app-review)). Snoop Plus: £5.99/мес или £47.99/год ([Snoop help](https://snoopadmin.zendesk.com/hc/en-gb/articles/4584733957661-How-much-does-it-cost)).

### Bobby — App Store отзывы через [justuseapp.com](https://justuseapp.com/en/app/1059152023/bobby-track-subscriptions/reviews)

26. **Ручной ввод = «app does nothing»:** "as far as I can tell Bobby does Nothing. It's a series of forms letting you manually enter data about your subscriptions. I sent them email asking: 'Is there a chance Bobby will ever populate the data automatically…?'" (Auliya)
27. **Сломанные нотификации в платной версии:** "After purchasing the full paid version it stopped sending me notifications to remind me of the payments for my subscriptions, which is literally the sole reason for getting Bobby. Its been like this for months." (Vurgy)
28. **Заброшенность:** "The Notifications feature, which is really essential for most of us, is non-functional… it's been 7 months since there has been an update. Wrote to them, but no reply." (Bayotter)
29. **Ненадёжность напоминаний:** "I'll only get a notification for maybe 1 of 12 subscriptions every other month or so." (Bat Mayne)
30. **Потеря данных:** пользователь потерял все подписки при переустановке; другой просит «desktop version or at least a way to use it on multiple different phone devices» (Heycacti) — нет синка.

**Позитив Bobby = прямое подтверждение wedge Decode (no-bank-link как ценность):**
- "One thing I love about it is that it doesn't ask for personal info or bank info like a lot of similar apps" (Ruthless Aj)
- "Every other app I've found has you link accounts and the user interface is difficult and muddy. Bobby is exactly what I have been looking for." (Otakugirl1990)

**Не найдено:** прямые Reddit-цитаты — reddit.com блокирует доступ (и поиск, и браузерную сессию: "You've been blocked by network security"). Reddit-настроения здесь представлены только через вторичные обзоры, прямых verbatim-цитат с Reddit в отчёте нет.

---

## 3. Кластеризация по темам (частота в собранном корпусе из ~27 негативных цитат)

| # | Тема | Частота | Продукты | Суть |
|---|---|---|---|---|
| 1 | **Cancellation hell / dark patterns отмены** | ~10 цитат — №1 тема | Rocket Money, Emma, Cleo (FTC) | Отмена требует email/звонков/ID; «cancel» не срабатывает; списания продолжаются месяцами; AI-бот вместо человека на пути отмены |
| 2 | **Surprise charges: триал → крупное (часто годовое) списание мимо App Store** | ~7 | Emma (£83.99), Cleo ($8.99 → овердрафт), Rocket Money (negotiation fee $100+) | Карта/банк заряжаются напрямую, подписка не видна в Apple Subscriptions; нет письма-предупреждения об окончании триала |
| 3 | **Bank link: страх + поломки + over-broad доступ** | ~6 | Snoop, Rocket Money, Cleo, (Emma — лимит 2 счёта free) | Не подключается / подключает чужой счёт; «вся история транзакций видна» = invasion of privacy; Plaid-доступ трактуется как право списывать |
| 4 | **Неточность данных / действий** | ~4 | Emma (recategorise каждый месяц), Snoop ("inaccurate spending data"), Rocket Money (отменил не ту подписку), Cleo (неверный баланс) | Ошибки в данных, на которых человек принимает финансовые решения, мгновенно убивают доверие |
| 5 | **Paywall-ирония и relentless upsell** | ~4 | Emma (3 тира + постоянные prompts), Snoop (волна негатива после ввода Plus, 2023), Cleo (подписка ради advance), Rocket Money (35–60% fee) | «Плати подписку, чтобы разобраться с подписками» — пользователи чувствуют, что приложение само стало той проблемой, которую обещало решить |
| 6 | **Поддержка = AI-бот, нет человека** | ~4 | Rocket Money, Cleo | Бот обвиняет пользователя, нет эскалации, "no customer service to speak to" |
| 7 | **Ненадёжные нотификации / ручной труд** | ~4 | Bobby (core), Emma | Напоминания — единственная job, и она не работает; ручной ввод воспринимается как «приложение ничего не делает» |

---

## 4. Анти-паттерны, которые Decode обязан избежать

1. **Карта при онбординге free-тира.** Триал, который молча конвертируется в ГОДОВОЕ списание (£83.99 у Emma) — самый яростный класс отзывов в корпусе. Decode: free-тир без платёжных данных вообще.
2. **Биллинг мимо Apple IAP.** Emma списывает с карты напрямую → подписка не видна/не отменяема в Apple Subscriptions → "scam"-отзывы. Decode: только App Store IAP (Apple-managed cancel — это фича доверия, не потеря маржи).
3. **Friction на отмене (ID, email, бот, retention-экраны).** FTC-кейс Cleo формализовал стандарт: «simple and straightforward way to cancel». Decode: отмена в 2 тапа из Settings + ссылка на Apple-подписку.
4. **Процент от «сэкономленного» и любые скрытые success-fees** (Rocket Money 35–60%). Decode: одна понятная цена £3–8/мес, без процентов и доп. сборов.
5. **Тихий перенос бесплатных фич за paywall** (волна 1★ у Snoop в 2023 после ввода Plus). Decode: зафиксировать free-обещание публично (например, «scan + summary всегда бесплатны N раз/мес») и не отступать.
6. **Relentless upsell-prompts** (Emma). Контекстный, редкий апселл в момент ценности (после расчёта true cost), не в каждом экране.
7. **Молчаливые ошибки данных.** Неверная цифра без указания источника = мгновенная потеря доверия (тема №4). Decode уже закладывает правильное: deterministic true-cost engine + source highlighting + confidence. Критично: при низкой уверенности показывать «не уверен, проверь страницу 2», а не галлюцинировать.
8. **Нотификации как лотерея** (Bobby). Renewal Radar — это обещание-сердцевина; нужен видимый «контракт»: экран «what I'm watching for you», тест-нотификация при онбординге, локальные нотификации не зависящие от сервера.
9. **AI-бот как единственная поддержка, обвиняющий пользователя** (Rocket Money). Хотя бы email с человеком и SLA.
10. **Просьба ID/лишних данных для базовых операций** (Rocket Money withdrawal, Snoop onboarding). Decode по дизайну не имеет денег пользователя — не вводить KYC-подобный friction вообще.

## 5. Доверительные сигналы, которые стоит встроить

1. **«No bank connection. Ever.» как первый экран онбординга** — прямо подтверждено похвалой Bobby ("it doesn't ask for personal info or bank info like a lot of similar apps"). Это не просто differentiator, это снимает целиком кластер №3.
2. **Privacy-карточка до первого скана:** что уходит на сервер, что остаётся на устройстве, retention, «удалить всё» в 1 тап. (Анти-Snoop: "the whole account is transferred over… invasion of privacy".)
3. **Apple IAP + «Manage in Apple Subscriptions» прямо в Settings** + push/email за 48ч до конца триала и до renewal самого Decode (Emma не прислала — получила "stolen £83").
4. **Source highlighting + confidence как видимый UI-элемент** каждого извлечённого term'a: «tap to see where in the document this came from». Это ответ на кластер №4 и главный аргумент против «AI выдумал».
5. **Дет-движок отдельно от LLM в коммуникации:** «The maths is deterministic, not AI» — в UI и в маркетинге (true cost считается формулой, AI только читает документ).
6. **Честный пустой результат:** «Couldn't read this section» лучше неверного значения — пользователи прощают «не смог», не прощают «соврал».
7. **Renewal Radar reliability contract:** список наблюдаемых дат + последняя проверка + тестовое уведомление; локальные iOS-нотификации как fallback.
8. **Цена и free-лимиты на одном экране без footnotes** (анти-Cleo/FTC: «clearly and conspicuously disclose», «express and informed consent» — это теперь буквально регуляторная планка категории, заданная settlement'ом).
9. **Человеческая поддержка:** хотя бы «email a human, reply in 24h» в Settings.
10. **UK-тон:** Decode не даёт regulated financial advice — явный дисклеймер («understand, not advise») снижает и регуляторный риск, и ожидания.

---

## Key takeaways for Decode

1. **Wedge подтверждён отзывами:** пользователи Bobby хвалят именно отсутствие bank link, а пользователи Snoop/Rocket Money/Cleo ненавидят именно его (страх, поломки, злоупотребление доступом). «Скан документа вместо подключения банка» — это решение боли №3 целиком; выносить в hero-message онбординга и ASO.
2. **Биллинг — главное минное поле категории.** Все три крупных конкурента (Rocket Money, Cleo, Emma) тонут в 1★ из-за отмены/списаний, Cleo довела это до FTC-иска с $17M. Decode: Apple IAP only, без карты на free, напоминание до конца триала, отмена в 2 тапа. Это дёшево в реализации и дороже любой фичи по эффекту на рейтинг.
3. **Не повторить иронию Emma** ("pay this subscription to find out [about subscriptions]"): free-тир должен давать завершённый акт ценности (скан → summary → true cost хотя бы для N документов/мес), paywall — на Vault-историю, Renewal Radar для многих документов, unlimited Q&A.
4. **Точность = доверие = retention.** Жалобы на miscategorisation (Emma), inaccurate data (Snoop) и «отменил не ту подписку» (Rocket Money) показывают: одна заметная ошибка в цифрах — удаление приложения. Wireframes должны включать: source-highlight на каждый extracted term, confidence-бейдж, состояние «couldn't read — please check manually».
5. **Renewal Radar обязан быть демонстративно надёжным** (анти-Bobby): экран «watching 4 dates», тестовая нотификация в онбординге, локальные нотификации + серверный дубль. Сломанное напоминание = сломанное core-обещание продукта.
6. **Ценовой потолок UK-рынка:** Emma Plus £4.99, Snoop Plus £5.99, Emma Pro £9.99/мес — план Decode £3–8/мес ложится в рынок; годовой план продавать явно (не авто-конверсией из триала) и со скидкой ~30% как принято (Emma -30%).
