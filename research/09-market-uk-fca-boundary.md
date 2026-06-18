# UK regulatory boundary для Decode: FCA perimeter, BNPL-регулирование и guardrails для копирайта

**Трек:** market-fca · **Дата ресёрча:** 10 июня 2026 · **Рынок:** UK
**Контекст:** Decode — iOS-приложение: AI-декодер финансовых документов (wedge: credit/BNPL offers) + commitments guardian (Vault, Renewal Radar). Без bank connection, без продажи продуктов (на старте).

> Дисклеймер ресёрча: это product/market-анализ, не юридическое заключение. Перед запуском нужен compliance-review у UK-юриста (особенно перед P3 Act-фичами).

---

## TL;DR

1. В UK **нет общей регулируемой деятельности "advising on consumer credit"** — в отличие от инвестиций. Для кредитов реально опасны три зоны: **debt counselling** (RAO art. 39E), **credit broking** (RAO art. 36A) и **financial promotions** (s. 21 FSMA).
2. **Debt counselling касается только ликвидации существующих долгов.** Анализ кредитного оффера ДО подписания — про "incurring debt", и PERG 17 прямо говорит, что это не debt counselling (пример 4 в PERG 17.7). Это означает: wedge Decode (scan offer → understand → decide) лежит **в основном вне периметра**. Рисковая зона — Vault/Q&A по уже заключённым договорам ("should I pay this off early / switch?").
3. **Граница advice vs information** (PERG 17.5): information = "statements of facts or figures", поданные "balanced and neutral"; advice = "an opinion as a guide to action… explicitly or implicitly steers the customer". Ключевой тест: "any element of evaluation, value judgment or persuasion is likely to mean that advice is being given". Персонализированный вывод приложения НЕ защищён "газетным" исключением: "advice given to a particular debtor over the Internet may be regulated" (PERG 17.4).
4. **BNPL: с 15 июля 2026 (т.е. через ~5 недель от даты ресёрча) BNPL становится регулируемым** "Deferred Payment Credit" (DPC). Финальные правила — PS26/1 от 11 февраля 2026. Это усиливает ценность Decode (новые обязательные disclosures = структурированные данные + регуляторные "крючки" для trap detector), но и означает, что после 15.07.2026 интродукции к BNPL-лендерам = credit broking.
5. **Конкуренты** живут на двух моделях: (а) "мы журналисты/информация, не advice" (MoneySavingExpert, Nous) и (б) "мы авторизованы как credit broker / AISP, но advice всё равно не даём" (ClearScore, Snoop). Decode на старте должен жить в модели (а) с дисциплиной копирайта; для P3 Act-фич с кредитными продуктами понадобится модель (б).

---

## 1. Регуляторная карта: какие FCA-активности вообще касаются Decode

База: s. 19 FSMA 2000 ("general prohibition") — нельзя вести regulated activity by way of business без авторизации. Список деятельностей — в Regulated Activities Order 2001 (RAO). Обзор кредитных активностей — [PERG 2.7](https://handbook.fca.org.uk/handbook/PERG/2/7.html).

Релевантные Decode зоны:

| Активность | RAO | Когда триггерится для Decode |
|---|---|---|
| **Debt counselling** | art. 39E | Советы конкретному должнику о том, как «ликвидировать» долг по credit/hire agreement (погасить, рефинансировать, реструктурировать, приоритизировать) — см. §2 |
| **Credit broking** | art. 36A | Интродукции к лендерам/брокерам, «presenting or offering» кредитных договоров, «preparatory work» для заключения договора — см. §3 |
| **Financial promotion restriction** | s. 21 FSMA + CONC 3 | Любое «invitation or inducement» заключить кредитный договор (ссылки «apply here», промо конкретных продуктов) — см. §3 |
| **Debt adjusting** | art. 39D | Переговоры с кредитором от имени должника об условиях погашения — прямой риск для P3 negotiation/cancel-switch assist по кредитным продуктам |
| **Advising on / arranging insurance** | art. 53(1), 25, IDD; PERG 5 | Будущие insurance-фичи: рекомендация сменить страховку = insurance distribution (регулируется!) |

Чего в списке НЕТ: общей активности «advising on credit agreements». Советовать «возьми эту кредитку» — само по себе не regulated activity (в отличие от «advising on investments», art. 53). Но такой совет почти всегда тянет за собой financial promotion и/или credit broking, если есть линк или вознаграждение. Источники: [PERG 2.7](https://handbook.fca.org.uk/handbook/PERG/2/7.html), [FCA "Consumer credit permissions: common misunderstandings" (PDF)](https://www.fca.org.uk/publication/consumer-credit-information/consumer%20credit%20-%20understanding%20cc%20-%20permissions-web.pdf), [LexisNexis: Regulated activities — credit broker](https://www.lexisnexis.co.uk/legal/guidance/regulated-activities-credit-broker).

Важно: тест **"by way of business"** (PERG 2.3) — Decode как коммерческое приложение однозначно действует by way of business, на это исключение рассчитывать нельзя.

---

## 2. Debt counselling и граница advice vs information (PERG 17)

Первоисточник: [PERG 17 "Consumer credit debt counselling"](https://www.handbook.fca.org.uk/handbook/PERG/17/) (текст в силе с 01/04/2014; полный текст получен через архивную серверную версию Handbook, ноябрь 2022 — глава с тех пор не менялась по существу).

### 2.1 Определение и охват

- Debt counselling = "giving advice to a borrower about the liquidation of a debt due under a credit agreement" (RAO art. 39E; PERG 17.1 Q1.2).
- "Liquidation" — широко: полное/досрочное погашение, rescheduling, уменьшение платежей, перевод долга, insolvency-процедуры (PERG 17.3 Q3.1).
- Долг **не обязан быть просроченным**: "Debt counselling is not limited to debts that are overdue. It also covers debts that are not overdue" (Q3.2). То есть советы по «здоровому» действующему кредиту в Vault — тоже в зоне.
- Если совет покрывает смесь долгов (кредитные + некредитные, например, utility) — регулируется весь совет (Q3.3).

### 2.2 Ключевая асимметрия для Decode: до подписания vs после

PERG 17.7, пример (4): *Adviser: "I recommend you do not borrow more than you can comfortably afford" — **"This is not debt counselling as it is about incurring debts, not liquidating them."***

Вывод: **анализ оффера до подписания (wedge Decode) — вне debt counselling**, потому что долга ещё нет; речь о принятии долга, а не о его ликвидации. Рисковая зона начинается, когда документ — уже заключённый договор, и пользователь спрашивает «как мне с этим долгом поступить» (погасить досрочно? рефинансировать? какой долг платить первым?).

### 2.3 Advice vs information — рабочие формулы FCA (PERG 17.5)

- **Advice**: "giving an opinion as a guide to action to be taken… It either explicitly or implicitly steers the customer to a particular course of action" (Q5.1). Тест «беспристрастного наблюдателя»: "whether an impartial observer… would conclude that advice had been given".
- Совет не обязан быть точным: даже «выбери один из этих вариантов» (без указания какой) может быть debt counselling (Q5.1).
- **Recommendation** = advice; и даже без явной рекомендации: *"Any element of evaluation, value judgment or persuasion is likely to mean that advice is being given"* (Q5.2).
- **Information**: "statements of facts or figures"; *"simply giving balanced and neutral information without making any comment or value judgement… is not advice"*; и критично для Decode: *"The provision of purely factual information does not become regulated advice merely because it feeds into the debtor's own decision-making process"* (Q5.3).
- **Ловушка селекции**: информация становится advice, если она "the product of a process of selection involving a value judgment so that the information will tend to influence the decision" (Q5.3). Для AI-продукта это главный риск: если модель «выбирает, что подсветить» так, что это де-факто толкает к действию по ликвидации долга — это уже advice.
- **Контекст запроса**: "If a debtor asks for a recommendation, any response is likely to be regarded as advice" (Q5.3) → Q&A-фича обязана уметь распознавать вопрос-рекомендацию и переформулировать ответ. Помогает и то, "whether the adviser makes it clear that it does not give advice".

### 2.4 «Газетное» исключение НЕ спасает приложение

PERG 17.4 Q4.1: совет должен относиться к "particular debt and debtor". Общий контент в газете/на открытом сайте — не debt counselling, **но**: *"advice given to a particular debtor over the Internet may be regulated"*. А PERG 17.5 Q5.7 прямо называет "the provision of an interactive software system" одним из медиумов advice. Decode анализирует конкретный документ конкретного пользователя → персонализация полная, прятаться за «мы просто контент» нельзя.

### 2.5 Decision trees / scripted questioning (Q5.5–5.6) — прямой шаблон для app-логики

FCA разбирает сценарии скриптованных вопросов (применимо к флоу Decode «Decide»):

- ✅ Безопасный паттерн (1): вопросы только о фактах → показать **несколько** подходящих вариантов "presented in a balanced and neutral way (for example, they identify all the possible courses of action, without making a recommendation as to a particular one)" — "need not, of itself, involve debt counselling".
- ❌ Паттерн (2): «советуем по merits один вариант против другого» — debt counselling.
- Факторы оценки (Q5.6): что заявлено в начале флоу, контекст, **сколько вариантов на выходе и насколько они точны**, помогает ли сервис исполнить действие, есть ли связанная третья сторона, и чьи это скрипты (если вопросы/опции составлены независимой стороной, например, самим FCA/MoneyHelper — безопаснее).

### 2.6 Примеры из PERG 17.7, прямо мапящиеся на фичи Decode

| Пример FCA | Вердикт FCA | Маппинг на Decode |
|---|---|---|
| (4) "don't borrow more than you can afford" | НЕ debt counselling (incurring, not liquidating) | Pre-signature анализ оффера — ок |
| (5) "explore the pros and cons of all the different debt solutions" | НЕ регулируется (generic advice) | Допустимая формула для Q&A-ответов |
| (7)–(8) нейтральное объяснение/сравнение вариантов работы с долгом | Information, не advice | Объяснение опций в договоре — ок при нейтральности |
| (13) «обратись к фирме X за debt advice» | Не debt counselling, **если** фирма не «одно-решение» | Signposting на MoneyHelper/StepChange — безопасен |
| (14) «плати сначала за электричество, потом остальные долги» | Debt counselling (имплицитный совет отложить кредитные платежи) | ⚠️ Renewal Radar/priority-подсказки: нельзя ранжировать, какой платёж важнее |
| (15) budget planner, организующий данные пользователя | Не debt counselling ("just puts into a convenient form information that the consumer has himself supplied") | True cost engine на данных документа — ок |
| (16) «сократи дискреционные траты до £X, чтобы гасить кредитку» | Debt counselling | ⚠️ Q&A не должен давать план погашения |

### 2.7 Контекст: advice/guidance boundary шире (инвестиции) и куда движется FCA

Для инвестиций граница описана в [FG15/1 Retail Investment Advice](https://www.fca.org.uk/publication/finalised-guidance/fg15-01.pdf) (personal recommendation vs generic advice vs information) — те же принципы FCA применяет по аналогии. Сейчас идёт [Advice Guidance Boundary Review](https://www.fca.org.uk/firms/advice-guidance-boundary-review): новый режим **"targeted support"** (policy statement с near-final rules 11 декабря 2025, подтверждены Board 26 февраля 2026 — [FCA](https://www.fca.org.uk/firms/advice-guidance-boundary-review), [Osborne Clarke](https://www.osborneclarke.com/insights/uk-fca-progresses-next-phase-advice-guidance-boundary-review)). Важно: targeted support — про **pensions/investments и только для авторизованных фирм**; на consumer credit он не распространяется. Т.е. для Decode никакого нового «среднего» режима нет — граница information/advice остаётся бинарной.

И сигнал в сторону AI: в **Perimeter Report (26 марта 2026)** FCA отдельно отмечает быстрый рост general-purpose AI-инструментов, дающих финансовые советы/рекомендации, как зону риска на краю периметра ([FCA Perimeter Report](https://www.fca.org.uk/publications/corporate-documents/fca-perimeter-report), [Lewis Silkin: key takeaways](https://www.lewissilkin.com/en/insights/2026/04/09/fca-perimeter-report-2026-key-takeaways-102mp5d), [Money Marketing](https://www.moneymarketing.co.uk/news/fca-ramps-up-ai-as-client-use-raises-advice-risks/)). Подход FCA к AI — "technology-agnostic": никаких специальных AI-правил, но существующие рамки (включая периметр и Consumer Duty) применяются к AI-выводам так же, как к человеческим ([FCA: AI approach](https://www.fca.org.uk/firms/innovation/ai-approach)). Практический вывод: «это сказал AI, а не мы» — не защита; копирайт AI-выводов должен проходить те же guardrails.

---

## 3. Credit broking и financial promotions: граница для «switch to product Z»

### 3.1 Credit broking (RAO art. 36A)

Текст статьи ([legislation.gov.uk](https://www.legislation.gov.uk/uksi/2001/544/article/36A)) — credit broking включает:

- (a)–(c) "effecting an introduction" заёмщика к лендеру или к другому брокеру;
- (d) "presenting or offering an agreement which would (if entered into) be a regulated credit agreement";
- (e) **"assisting an individual… by undertaking preparatory work with a view to that person entering into a regulated credit agreement"**;
- (f) заключение договора от имени лендера.

Для Decode это значит:

- **Безопасно (не broking):** показать факт «typical market late fee is £10–12» без ссылок на продукты; назвать категорию альтернатив («0% balance transfer cards exist — see MoneyHelper») без конкретного лендера и без линка.
- **Серая зона → риск:** именованный конкретный продукт/лендер + кнопка/deep link «посмотреть» — это уже похоже на "effecting an introduction" (особенно при affiliate-комиссии; вознаграждение — классический индикатор broking, см. [FCA credit broking rules](https://www.fca.org.uk/firms/credit-broking-rules)).
- **Точно broking:** pre-filled заявка, передача данных пользователя лендеру, «мы подберём и оформим» — это (a)+(e). Для P3 cancel/switch assist по **кредитным** продуктам это означает: либо авторизация (credit broking permission), либо статус Appointed Representative авторизованного principal, либо white-label партнёр.
- ⚠️ С **15 июля 2026** BNPL-договоры становятся regulated credit agreements → интродукции к BNPL-лендерам впервые попадают под art. 36A. Исключение сделано для **мерчантов**, предлагающих BNPL как способ оплаты, — но не для финансовых приложений ([Reed Smith](https://www.reedsmith.com/our-insights/blogs/viewpoints/102mmmf/new-fca-regulation-of-buy-now-pay-later-what-you-need-to-know/), [Lewis Silkin](https://www.lewissilkin.com/insights/2026/03/02/buy-now-pay-later-regulation-what-gcs-of-businesses-offering-bnpl-need-to-know-102mlmo)).

### 3.2 Financial promotions (s. 21 FSMA, CONC 3)

Любое "invitation or inducement" к заключению кредитного договора — financial promotion; неавторизованная фирма не может его коммуницировать без approval авторизованной фирмой. Режим media-neutral — применяется к приложениям и push-уведомлениям так же, как к рекламе; обновлённый гайд по соцсетям — FG24/1 ([FCA: financial promotions and adverts](https://www.fca.org.uk/firms/financial-promotions-adverts)).

Практическое следствие: **нейтральный benchmarking — не промо; «вот продукт получше, тапни» — промо.** Пока Decode не показывает конкретные продукты с CTA, s. 21 не триггерится.

---

## 4. Статус BNPL-регулирования (на 10 июня 2026)

Хронология (всё подтверждено первоисточниками):

| Дата | Событие |
|---|---|
| 14 июля 2025 | HM Treasury принял order (FSMA 2000 (Regulated Activities etc.) (Amendment) Order 2025), вводящий DPC в периметр с 15.07.2026 ([Global Fin Reg Blog](https://www.globalfinregblog.com/2025/05/uk-government-sets-out-next-steps-on-bnpl-regulation/), [Hogan Lovells](https://www.hoganlovells.com/en/publications/uk-consumer-credit-reform-and-buynow-paylater-regulation-may-2025-developments)); позже дополнен (No 2) Order 2025, laid ноябрь 2025 ([Lewis Silkin](https://www.lewissilkin.com/en/insights/2025/11/14/fsma-regulated-activities-etc-amendment-no-2-order-2025-laid-before-parliam-102lue5)) |
| 18 июля 2025 | FCA публикует консультацию CP25/23 по правилам для DPC ([Skadden](https://www.skadden.com/insights/publications/2025/07/fca-publishes-new-proposals)) |
| **11 февраля 2026** | **FCA публикует PS26/1 — финальные правила** ([FCA press release](https://www.fca.org.uk/news/press-releases/new-protections-confirmed-buy-now-pay-later-borrowers)) |
| 15 мая – 1 июля 2026 | Окно нотификаций **Temporary Permissions Regime** (fee £280; затем 6 месяцев на полную заявку; на дату ресёрча 9 лендеров уже в TPR) ([FCA: Regulating BNPL](https://www.fca.org.uk/firms/regulating-buy-now-pay-later)) |
| **15 июля 2026 — "Regulation Day"** | DPC становится regulated credit agreement; применяются CONC-правила ([FCA](https://www.fca.org.uk/firms/regulating-buy-now-pay-later), [Hogan Lovells](https://www.hoganlovells.com/en/publications/bnpl-fca-publishes-final-rules-for-15-july-2026-golive)) |

**Что такое DPC и кто в скоупе:** interest-free кредит на покупку товаров/услуг, до 12 платежей в пределах 12 месяцев, от **third-party lenders**; мерчанты, дающие рассрочку сами, — вне периметра ([Reed Smith](https://www.reedsmith.com/articles/fca-confirms-final-rules-for-regulation-of-buy-now-pay-later-sector-or-deferred-payment-credit-ahead-of-new-regime/)). Договоры, заключённые до 15.07.2026, не попадают под новый режим ретроспективно ([FCA](https://www.fca.org.uk/firms/regulating-buy-now-pay-later)).

**Что меняется по существу (PS26/1):**
- **Creditworthiness/affordability** проверки на каждую транзакцию, включая <£50 (CONC 5.2A, пропорционально) ([Reed Smith](https://www.reedsmith.com/articles/fca-confirms-final-rules-for-regulation-of-buy-now-pay-later-sector-or-deferred-payment-credit-ahead-of-new-regime/)).
- **Обязательные pre-contract disclosures**: "key product information" — сумма, график платежей, cash price, ключевые риски, последствия пропуска платежа, практики CRA; отдельно — права на withdrawal, early repayment, доступ к ombudsman (там же).
- **Missed payments (новый CONC 7.20)**: связаться с клиентом «as soon as possible», объяснить последствия, дать reasonable notice до enforcement, **signpost на бесплатный debt advice** (там же).
- **Section 75 CCA** (солидарная ответственность лендера за качество товара при покупках £100–£30k) и **доступ к FOS** распространяются на DPC ([Hogan Lovells, May 2025](https://www.hoganlovells.com/en/publications/uk-consumer-credit-reform-and-buynow-paylater-regulation-may-2025-developments), [Addleshaw Goddard](https://www.addleshawgoddard.com/en/insights/insights-briefings/2025/financial-regulation/financial-regulation-in-the-know-consumer-finance-august-2025/regulation-buy-now-pay-later-fca-consultation/)).
- Consumer Duty применяется к авторизованным DPC-лендерам ([FCA press release](https://www.fca.org.uk/news/press-releases/new-protections-confirmed-buy-now-pay-later-borrowers)).

**Масштаб рынка (для деки):** BNPL вырос с £0.06 млрд (2017) до **£13 млрд (2024)**; за 12 месяцев до мая 2024 BNPL пользовались **20% взрослых UK (~10.9 млн человек)** ([FCA press release](https://www.fca.org.uk/news/press-releases/new-protections-confirmed-buy-now-pay-later-borrowers)).

**Что это значит для Decode:**
1. **Идеальный timing для wedge.** Июль 2026 = момент, когда у каждого BNPL-юзера появляются новые права (s.75, FOS, disclosures) — о которых почти никто не знает. Decode может стать «переводчиком нового режима»: trap detector получает объективные нормативные «крючки» («у этого договора нет X, который обязателен с 15.07.2026», «по этому договору у вас есть право пожаловаться в FOS»).
2. Новые стандартизированные disclosures упрощают парсинг/extraction (структура документов станет предсказуемее).
3. Договоры до 15.07.2026 — без новых защит: Decode может фактологично показывать «этот договор заключён до Regulation Day, новые защиты на него не распространяются».
4. ⚠️ После 15.07.2026 любые интродукции к BNPL-лендерам = credit broking (см. §3.1).

---

## 5. Что Decode МОЖЕТ говорить vs что НЕЛЬЗЯ — по фичам

Принцип: **факт о документе + факт о рынке + объяснение значения термина = information. Оценка «хорошо/плохо для вас» + «сделай X» = advice.** И помним про «ловушку селекции» (PERG 17.5 Q5.3): даже факты, отобранные так, чтобы подтолкнуть, становятся advice.

| Фича | ✅ Можно (information) | ❌ Нельзя без авторизации (advice / broking / promo) |
|---|---|---|
| **3-sentence summary** | "This is a credit agreement for £400 over 6 payments. Late payments incur a £12 fee. Missed payments may be reported to credit reference agencies." | "This is a bad deal", "We wouldn't sign this", любые оценочные эпитеты risk/quality о решении пользователя |
| **Key terms extraction** | Термины + plain-English определения ("APR means…") | Селективный показ только «плохих» термов с оценочной рамкой «вот почему это плохо для вас» |
| **True cost engine** | Детерминированный расчёт: "Total you will repay: £X. That's £Y more than the cash price." (= example 15: организация данных самого документа) | "You can't afford this", "This will hurt your finances" (оценка персональной affordability) |
| **Trap detector** | "This contract contains a £12 late fee; typical market range is £5–10 [source]". "This clause allows the rate to change without notice — here's what that means." Нейтральная подача КАЖДОГО найденного пункта по одинаковой методологии | "Don't sign because of this clause", "This lender is predatory"; скоринг «ловушек», который читается как рекомендация отказаться (особенно по уже заключённому договору) |
| **Benchmarking** | Агрегированные рыночные факты с источником и датой: "Average late fee across major UK BNPL providers is £X (as of …)" | "Provider Z charges less — switch" (steer + потенциально promo); именованные альтернативы с CTA |
| **Ask-anything Q&A** | Ответы фактами из документа с source highlighting; объяснение опций "balanced and neutral"; на вопрос "what should I do?" — generic-рамка ("the pros and cons of the options are… the choice is yours") + signposting на MoneyHelper/StepChange (= examples 5, 7, 8, 13) | Прямые ответы на "should I pay this off early?", "which debt do I pay first?" (= examples 14, 16 — debt counselling), "should I switch to Z?" |
| **Renewal Radar / Vault** | "Payment of £X due on [date]". "Your fixed rate ends on [date] — after that the rate becomes Y%." | Приоритизация платежей между долгами ("pay this one first" = example 14); "cancel this subscription, it's not worth it" для финансовых продуктов |
| **P3: cancel/switch assist** | Для **энергии/телекома/подписок** — вне периметра FCA (Ofgem/Ofcom-территория, модель Nous): инструкции, шаблоны, "here's how to cancel" | Для **кредитных продуктов**: подбор и оформление замены = credit broking (art. 36A (a)+(e)); для **страховых** — insurance distribution (PERG 5). Нужна авторизация/AR/партнёр |
| **P3: negotiation scripts** | Шаблон письма для самого пользователя по некредитным биллам; фактологический "you have the right to complain to the FOS" | Переговоры с кредитором ОТ ИМЕНИ пользователя об условиях долга = debt adjusting (art. 39D); скрипт «проси у лендера reschedule» по конкретному долгу ≈ debt counselling |

Дополнительные правила для всех фич:
- Один и тот же detector-вывод подавать **симметрично**: показывать и нейтральные/хорошие пункты, не только «ловушки» — это снижает риск «селекции с value judgment».
- На pre-signature документах режим свободнее (см. §2.2), на post-signature (Vault) — строже. Имеет смысл сделать **в продукте явные два режима копирайта**.
- Никогда не использовать слова "advice", "recommend", "you should" в UI/выводах модели; системный промпт + output-фильтр на эти паттерны.

---

## 6. Как формулируют дисклеймеры существующие игроки

**MoneySavingExpert** ([About the site](https://www.moneysavingexpert.com/site/about-the-site/)) — модель «журналистика, не advice»:
- *"It's important to let you know that information on this site does not constitute financial advice."*
- *"All information is based on journalistic research and analysis rather than tailored advice aimed at individuals."*
- *"…always do your own research on top to ensure it's right for your specific circumstances."*
- Плюс оговорка о том, что условия продуктов могут меняться: "price and terms of products and deals can always be changed by the provider afterwards, so double check first."

**ClearScore** ([Terms](https://www.clearscore.com/terms)) — модель «авторизованный брокер, но не advisor»:
- *"ClearScore acts as a credit broker, not a lender"* — везде, включая App Store-листинг.
- *"We don't have all the information about you or your individual financial situation and are not providing you with financial advice."*
- *"You need to make your own decision about whether any offers are right for you… purely your own choice."*
- Authorised and regulated by the FCA (как credit broker); честно раскрывают комиссию, подчёркивая, что выдача не ранжируется по размеру комиссии.

**Snoop** ([snoop.app](https://snoop.app/)) — модель «регулируемый AISP, advice не даём»: FCA-registered Account Information Service Provider под Payment Services Regulations 2017, FRN 911638 ([Money to the Masses review](https://moneytothemasses.com/banking/snoop-app-review), [FinTech Futures](https://www.fintechfutures.com/venture-capital-funding/ex-virgin-money-execs-venture-snoop-gets-fca-approval)); read-only доступ, «не можем двигать деньги». Примечание: Decode без bank connection AISP-статус не нужен — это лицензионное преимущество перед Snoop/Emma.

**Nous.co** ([Terms of use](https://www.nous.co/terms-of-use)) — модель «делаем switching вне FCA-периметра (энергия/телеком), осторожный язык об оценках»:
- Оценки экономии: *"a good faith estimate of future savings"*, tools "on an 'as is' basis".
- Лимиты: *"we exclude liability for failure to achieve any particular saving or benefit"; "We do not guarantee that our choice of service provider is the best possible"; "we do not compare every supplier in the energy market"; "Prices can change quickly so we cannot promise that the chosen tariff will be the cheapest available."*
- В terms нет заявлений об FCA-статусе — потому что энергия/broadband/mobile switching не FCA-регулируемая деятельность (это территория Ofgem/Ofcom) — важный прецедент для P3 Act-фич Decode по НЕкредитным биллам.

Паттерн для Decode: комбинировать (1) MSE-стиль «information, not advice; check your circumstances», (2) ClearScore-стиль «you make your own decision», (3) Nous-стиль для оценок («estimates, not guarantees; market data as of [date]»), плюс обязательный signposting на бесплатные источники (MoneyHelper — для money guidance, StepChange/National Debtline — при признаках проблемного долга; сам signposting безопасен per PERG 17.7 example 13).

---

## 7. Direction of travel: что мониторить

1. **AI на краю периметра.** Perimeter Report (26.03.2026) поднимает тему general-purpose AI-инструментов, дающих финансовые рекомендации ([FCA](https://www.fca.org.uk/publications/corporate-documents/fca-perimeter-report), [Money Marketing](https://www.moneymarketing.co.uk/news/fca-ramps-up-ai-as-client-use-raises-advice-risks/)). Плюс запущен **Mills Review** о влиянии AI на retail financial services ([FCA](https://www.fca.org.uk/news/press-releases/mills-review-consider-how-ai-will-reshape-retail-financial-services)), рекомендации AI Live Testing ожидаются к FCA Board летом 2026 ([Covington/Inside Global Tech](https://www.insideglobaltech.com/2026/04/09/uk-financial-services-regulators-approach-to-artificial-intelligence-in-2026/)). Возможное ужесточение/уточнение периметра для AI-«советчиков» — главный регуляторный риск горизонта 12–24 мес.
2. **AGBR / targeted support** (final rules фев 2026) — пока только pensions/investments; если режим со временем расширят на кредит, у Decode появится легальный «средний» путь давать более направленные подсказки — но только став авторизованной фирмой ([FCA AGBR](https://www.fca.org.uk/firms/advice-guidance-boundary-review)).
3. **Consumer Credit Act reform** — HMT параллельно реформирует CCA (перенос информационных требований в FCA rulebook), что в ближайшие годы изменит сам формат кредитных документов, которые парсит Decode ([PwC](https://www.pwc.co.uk/industries/financial-services/understanding-regulatory-developments/hmt-confirms-bnpl-regulation-and-outlines-cca-reform.html)).
4. **BNPL go-live 15.07.2026** — следить за тем, как лендеры реализуют новые disclosures (форматы документов изменятся прямо на запуске wedge).

---

## Key takeaways for Decode

**Стратегические:**
1. **Wedge легален без FCA-авторизации.** Pre-signature анализ кредитных/BNPL офферов — про "incurring", не "liquidating" долг → вне debt counselling (PERG 17.7 ex. 4); без линков на продукты нет ни broking, ни financial promotion. Это надо зафиксировать как design-инвариант MVP: *no product links, no affiliate revenue, no "apply" CTAs*.
2. **Главная рисковая зона — Vault + Q&A по заключённым договорам.** Любой ответ в духе «гаси досрочно / плати сначала это / рефинансируй» = debt counselling. Нужен intent-классификатор «вопрос-рекомендация о существующем долге» с безопасным шаблоном ответа (факты + balanced options + «the choice is yours» + signpost MoneyHelper/StepChange).
3. **15 июля 2026 — продуктовый момент.** Запуск/маркетинг wedge стоит привязать к BNPL Regulation Day: «ваши новые права в ваших BNPL-договорах». Trap detector получает нормативные эталоны (обязательные disclosures, CONC 7.20, s.75, FOS) для фактологичных флагов.
4. **P3 Act-фичи требуют развилки:** (а) кредит/страховки → нужна авторизация (credit broking / debt adjusting / insurance distribution) или AR-статус, или white-label партнёр; (б) энергия/телеком/подписки → вне FCA-периметра, можно строить по модели Nous уже сейчас. В roadmap P3 закладывать compliance-затраты только для ветки (а).

**Guardrails для копирайта (wireframes/промпты):**
5. Формула безопасного вывода: **[факт из документа] + [рыночный факт с источником и датой] + [объяснение термина] + [нейтральные опции] + [decision is yours]**. Запрещённые паттерны в UI и LLM-выводе: "you should", "we recommend", "don't sign", "switch to", "pay X first", "best/worst deal".
6. Trap detector: флаг = сравнение с фактом, не вердикт. ✅ "This contract contains a £12 late fee. Typical late fees at major UK providers are £5–10 (as of June 2026)." ❌ "This late fee is a rip-off — avoid." Показывать и «зелёные» пункты (симметрия против «selection involving a value judgment», PERG 17.5 Q5.3).
7. Benchmarking — только агрегаты ("typical market rate", "average across major providers") с датой и источником; никаких именованных альтернативных продуктов с CTA до получения разрешений.
8. Q&A: если пользователь просит рекомендацию — "If a debtor asks for a recommendation, any response is likely to be regarded as advice" → ответ обязан переключаться в режим generic options + signposting. Это требование к системному промпту И к output-фильтру (FCA technology-agnostic: AI-вывод = вывод фирмы).
9. Стандартный дисклеймер (паттерн MSE+ClearScore): "Decode explains what's in your documents. It doesn't give financial advice and doesn't know your full financial situation. Decisions are yours. If you're struggling with debt, free help is available at MoneyHelper / StepChange." Размещение: onboarding, футер каждого scan-результата, перед каждым Q&A-тредом.
10. Расчёты true cost подавать как организацию данных самого документа (PERG 17.7 ex. 15 — безопасно) и со словами "estimate"/"based on the figures in your document"; не переходить в оценку affordability пользователя.
11. Renewal Radar: только даты и суммы ("£X due on [date]"), без приоритизации между обязательствами (PERG 17.7 ex. 14 — приоритизация = debt counselling).
12. Зафиксировать перименный анализ письменно (документация «почему мы вне периметра» по каждой фиче) — это первая линия защиты при вопросах FCA, и обновлять её при каждом релизе фич (практика, рекомендуемая компл-юристами; см. [Practical Law PERG overview](https://uk.practicallaw.thomsonreuters.com/5-527-3506)).
