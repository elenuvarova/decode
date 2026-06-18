# 09b · UK FCA-граница для Decode — ВЕРИФИЦИРОВАННЫЙ ресёрч (первоисточники)

**Трек:** 09b market-fca-verified · **Дата:** 12 июня 2026 · **Рынок:** UK
**Метод:** только первоисточники — `handbook.fca.org.uk` (PERG, PRIN), `legislation.gov.uk` (FSMA, RAO), `fca.org.uk` (policy statements, press). Вторичка — только как навигация. Тексты FCA Handbook доступны через рендеренные снапшоты Wayback (JS-версия Handbook отдаёт только оболочку); каждый ключевой пункт сверен с verbatim-цитатой.

> ⚠️ Это product/market-анализ, НЕ юридическое заключение. Перед запуском обязателен compliance-review у UK-юриста по consumer credit (особенно перед Q&A по заключённым договорам и перед любыми P3 Act-фичами с кредитными/страховыми продуктами). Ниже явно отмечены зоны остаточной неопределённости.

---

## TL;DR верификации

**Главный вывод: ключевые выводы трека 09 ПОДТВЕРЖДЕНЫ дословно по первоисточникам.** Центральная гипотеза проекта верна:

1. ✅ **Pre-signature анализ оффера = "incurring debt" → ВНЕ debt counselling.** Подтверждено verbatim: PERG 17.7 пример **(4)**: *"This is not debt counselling as it is about incurring debts, not liquidating them."*
2. ✅ **Post-signature Q&A "гасить ли досрочно / какой долг первым" = регулируемая зона (debt counselling).** Подтверждено: PERG 17.7 примеры **(14)** (приоритизация платежей) и **(16)** (план сокращения трат для погашения кредитки) — оба = debt counselling.
3. ✅ **Граница advice vs information** (PERG 17.5) — все формулы трека 09 дословны и точны.
4. ✅ **s21 FSMA, RAO art 36A (credit broking), art 39D (debt adjusting)** — тексты сверены с legislation.gov.uk, цитаты в треке 09 точны.
5. ✅ **BNPL → 15 июля 2026, PS26/1 от 11.02.2026** — дата и PS-номер подтверждены FCA. s.75, FOS, affordability, disclosures, Consumer Duty — подтверждены. Pre-Reg-Day договоры остаются exempt (не ретроспективно) — подтверждено.
6. 🔧 **Уточнения (не опровержения):** (а) точный артикул DPC-broking-исключения — **новый RAO art 36FB** (SI 2025/859), и он у́же, чем «для мерчантов вообще»: только для **поставщика товара/услуги** (incl. domestic premises supplier), НЕ для сторонних финансовых приложений → вывод трека 09 («не для финансовых приложений») верен и теперь точен. (б) Нумерация примеров PERG 17.7 в треке 09 совпала с РЕАЛЬНОЙ FCA-нумерацией (а не с ICAEW-реструктурированной) — это плюс к достоверности.
7. 🆕 **Новое, чего не было в треке 09:** живая консультация **CP26/15** (FCA, comments due 17.06.2026) — пересмотр CONC 3 (financial promotions для consumer credit), опора на Consumer-Duty consumer-understanding outcome вместо части жёстких правил. Прямо релевантно benchmarking/промо-фичам Decode на горизонте 6–12 мес.

**Вердикт по треку 09: достоверен. Можно использовать как load-bearing — с поправками-уточнениями из §«Что изменилось vs трек 09».**

---

## 1. PERG-граница advice vs information (consumer credit)

### 1.1 Базовая карта периметра — ПОДТВЕРЖДЕНО

Для consumer credit в UK **нет общей регулируемой деятельности «advising on credit agreements»** (в отличие от «advising on investments», RAO art. 53). Реально опасны: **debt counselling** (RAO art. 39E), **credit broking** (art. 36A), **debt adjusting** (art. 39D), **financial promotions** (s.21 FSMA). Совет «возьми эту кредитку» сам по себе — не regulated activity, но почти всегда тянет за собой financial promotion и/или credit broking при наличии линка/вознаграждения.
*Источник: PERG 2.7 «Activities: a broad outline» — https://handbook.fca.org.uk/handbook/perg2/perg2s7 (сверено 12.06.2026). Debt counselling определён как regulated activity именно для liquidation существующего долга.*

### 1.2 Debt counselling — определение и охват (PERG 17.1–17.4) — ПОДТВЕРЖДЕНО verbatim

Источник: PERG 17 «Consumer credit debt counselling», текст в силе; verbatim получен из рендеренного снапшота Handbook (PERG 17.3/17.4 в силе с 01/04/2014; PERG 17.7 версия 02/06/2023, "Updated 04/10/24").
URL: https://www.handbook.fca.org.uk/handbook/PERG/17/3.html · /4.html · /5.html · /7.html

- **«Liquidation» — широко** (PERG 17.3 Q3.1, verbatim): *"paying off the debt in full and in time; agreeing a rescheduling or a temporary halt…; the debtor being released from the debt; agreeing a reduced repayment amount…; a third party taking over the debtor's obligation…; discharging the debt… through personal insolvency procedures."*
- **Долг НЕ обязан быть просроченным** (Q3.2, verbatim): *"Debt counselling is not limited to debts that are overdue. It also covers debts that are not overdue."* + *"it would cover present obligations to make payments in the future."* → советы по «здоровому» действующему кредиту в Vault тоже в зоне.
- **Смешанные долги** (Q3.3, verbatim): если совет покрывает кредитные + некредитные долги, *"the advice on both types of debt is likely to be debt counselling."*
- **«Газетное» исключение НЕ спасает приложение** (PERG 17.4 Q4.1, verbatim): *"General advice open to everyone on a website is unlikely to be debt counselling… On the other hand advice given to a particular debtor over the Internet may be regulated."* Decode анализирует конкретный документ конкретного юзера → персонализация полная.

### 1.3 Advice vs information — рабочие формулы FCA (PERG 17.5) — ПОДТВЕРЖДЕНО verbatim

Все формулы, на которых стоит трек 09, сверены дословно:

- **Q5.1 (что такое advice):** *"Advice means giving an opinion as a guide to action to be taken… It either explicitly or implicitly steers the customer to a particular course of action."* + impartial observer test: *"whether an impartial observer, having due regard to the regulatory regime and guidance, context, timing and what passed between the parties, would conclude that advice had been given."* + *"goes beyond the mere provision of information and is objectively likely to influence the debtor's decision."*
- **Q5.2 (recommendation):** *"Any element of evaluation, value judgment or persuasion is likely to mean that advice is being given."*
- **Q5.3 (information vs advice) — ключевое для AI-продукта:**
  - *"The provision of purely factual information does not become regulated advice merely because it feeds into the debtor's own decision-making process and is taken into account by him."*
  - **Ловушка селекции (verbatim):** *"the adviser may provide information on a selected, rather than balanced and neutral, basis that would tend to influence the decision… A key to the question whether advice is given is whether that information is either accompanied by a comment or value judgment… or is itself the product of a process of selection involving a value judgment so that the information will tend to influence the decision of the recipient. In both these scenarios, the information acquires the character of a recommendation."*
  - **Контекст запроса (verbatim):** *"If a debtor asks for a recommendation, any response is likely to be regarded as advice."* + помогает *"whether the adviser makes it clear that it does not give advice."*
- **Q5.5–5.6 (decision trees / scripted questioning) — прямой шаблон для логики флоу «Decide»:**
  - ✅ Сценарий (1), verbatim: *"identify several courses of action… provided these are presented in a balanced and neutral way (for example, they identify all the possible courses of action, without making a recommendation as to a particular one) this need not, of itself, involve debt counselling."*
  - ❌ Сценарий (2), verbatim: *"advise the debtor on the merits of one particular course of action over another. This would be debt counselling."*
  - Факторы оценки (Q5.6): что заявлено в начале, контекст, **сколько вариантов на выходе и насколько они точны**, помогает ли сервис исполнить действие, связанная третья сторона, и **чьи это скрипты** (если вопросы/опции независимой стороны, напр. самого FCA — безопаснее).
- **Q5.7 (медиум):** verbatim список включает *"through the provision of an interactive software system"* → «это сделал софт/AI» — не защита.

### 1.4 Примеры PERG 17.7 — маппинг на фичи Decode — ПОДТВЕРЖДЕНО verbatim (с правильной нумерацией FCA)

| № (FCA) | Сценарий (verbatim) | Вердикт FCA | Маппинг на Decode |
|---|---|---|---|
| **(4)** | *"I recommend you do not borrow more than you can comfortably afford"* | **НЕ** debt counselling (*"about incurring debts, not liquidating them"*) | ✅ **Pre-signature анализ оффера — wedge легален** |
| **(5)** | *"explore the pros and cons of all the different debt solutions"* | НЕ регулируется (*"unregulated generic advice"*) | ✅ Допустимая формула для Q&A |
| **(7)/(8)** | нейтральное объяснение / сравнение вариантов работы с долгом | *"If… given in a balanced and neutral way it is likely not to be debt counselling as it is just factual information"* | ✅ Объяснение опций в договоре — ок при нейтральности |
| **(6)** | «информал-агримент может быть не лучшим вариантом, но решать вам» | **Likely** debt counselling (*"making a value judgement and giving an opinion and is steering"*) | ⚠️ «soft»-формулировки тоже ловят — нельзя «склонять» даже мягко |
| **(13)** | «обратись за advice в фирму X» | НЕ debt counselling, **если** X не «одно-решение» | ✅ Signposting на MoneyHelper/StepChange (full-range) безопасен |
| **(14)** | *"I recommend you prioritise the repayment of your electricity bill over all other debts"* | **Likely** debt counselling (имплицитная отсрочка кредитных платежей) | ❌ Renewal Radar/priority: нельзя ранжировать, какой платёж важнее |
| **(15)** | budget planner, организующий данные самого юзера | НЕ debt counselling: *"It may not be advice at all, in that it just puts into a convenient form information that the consumer has himself supplied"* | ✅ True cost engine на данных документа — ок |
| **(16)** | budgetary advice: «сократи дискреционные траты до £X, чтобы гасить кредитку» | **debt counselling** | ❌ Q&A не должен давать план погашения |

→ **Нумерация в треке 09 совпала с реальной FCA-нумерацией.** (Для сравнения проверена ICAEW-реструктура «Guidance on consumer credit debt counselling», 2017 — там нумерация сдвинута, но содержание идентично; ICAEW использован только как кросс-чек.)

---

## 2. s21 FSMA — financial promotions — ПОДТВЕРЖДЕНО verbatim

Источник: Financial Services and Markets Act 2000, s.21 — https://www.legislation.gov.uk/ukpga/2000/8/section/21 (сверено 12.06.2026).

- **s21(1), verbatim:** *"A person ('A') must not, in the course of business, communicate an invitation or inducement to (a) engage in investment activity…"*, если только **A не authorised person**, либо **content не approved авторизованной фирмой**.
- «Engage in investment activity» / «controlled activity» (s21(8)–(9)) распространяется через Schedule 2 / Financial Promotion Order на **consumer credit agreements** (вход в кредитный договор — controlled activity). Подтверждение, что промо-режим покрывает потреб-кредит: PERG 8.17-A «Financial promotions concerning consumer credit and consumer hire» — https://www.handbook.fca.org.uk/handbook/PERG/8/17-A.html.
- **Практический смысл для Decode:**
  - **НЕ промо:** нейтральный benchmarking без линка/CTA («typical late fee at major UK BNPL providers is £X»).
  - **Промо (триггерит s21):** *"invitation or inducement"* заключить кредитный договор — кнопка «apply here», deep-link на конкретный продукт, «вот продукт получше, тапни». Неавторизованная фирма не может это коммуницировать без approval.
  - Режим **media-neutral** — применяется к приложениям и push-уведомлениям так же, как к рекламе (актуальный гайд по соцсетям — FG24/1; CONC 3 — основные правила промо для кредита).
- 🆕 **Динамика:** **CP26/15 «Reviewing the financial promotions rules for consumer credit»** (FCA, comments due **17.06.2026**) — FCA предлагает упростить CONC 3, убрать часть прескриптивных требований и опираться на Consumer-Duty consumer-understanding outcome. URL: https://www.fca.org.uk/publications/consultation-papers/cp26-15-reviewing-financial-promotions-rules-consumer-credit. **Мониторить — прямо влияет на то, как Decode сможет подавать cost-of-credit информацию.**

---

## 3. BNPL / Deferred Payment Credit — что вступает в силу 15 июля 2026

### 3.1 Дата и источник — ПОДТВЕРЖДЕНО

- **Policy statement: PS26/1 «Regulation of Deferred Payment Credit (unregulated Buy Now Pay Later): Feedback to CP25/23 and final rules», опубликован 11 февраля 2026.**
  URL: https://www.fca.org.uk/publications/policy-statements/ps26-1-regulation-deferred-payment-credit · PDF: https://www.fca.org.uk/publication/policy/ps26-1.pdf
- **Дата вступления в силу — 15 июля 2026 («Regulation Day»).** Подтверждено FCA дословно: *"From 15 July 2026, lenders who offer a DPC agreement to finance the purchase of goods or services from a merchant will come under FCA regulation. Merchants that offer their own DPC agreements directly will not."*
  URL: https://www.fca.org.uk/firms/regulating-buy-now-pay-later (сверено 12.06.2026).
- **Дата из брифа задачи (15 июля 2026) — ВЕРНА.**

### 3.2 Что такое DPC и кто в скоупе — ПОДТВЕРЖДЕНО

- **DPC, verbatim FCA:** *"an interest-free credit product, repayable in 12 or fewer instalments in 12 months or less and which is currently exempt from regulation."* В скоупе — **third-party lenders** (где *"The lender and the supplier of goods or services are not the same person"*).
- **Вне скоупа:** мерчанты, дающие рассрочку сами; **broking DPC** (см. 3.4); договоры до Regulation Day.
- **Юр. база:** FSMA 2000 (Regulated Activities etc.) (Amendment) Order 2025 — **SI 2025/859** (https://www.legislation.gov.uk/uksi/2025/859/made) + (No. 2) Order 2025 — **SI 2025/1154** (https://www.legislation.gov.uk/uksi/2025/1154/made). Вводит «regulated deferred payment credit agreement» через условия art 60F(2)(a)–(d) + новый art 60F(7A) RAO.

### 3.3 Что меняется по существу — ПОДТВЕРЖДЕНО

- **Affordability/creditworthiness:** *"lenders must carry out proportionate checks to make sure customers can afford to repay"* (включая мелкие транзакции, пропорционально).
- **Pre-contract disclosures:** *"clear, upfront details about their agreement, including when payments will be due and amounts, and what happens if they miss a payment."* В PS26/1 уточнены: (i) key product information; (ii) credit reference agency disclosure; (iii) missed-payment communications; (iv) debt-advice signposting; (v) FOS voluntary jurisdiction.
- **Поддержка при трудностях + signpost на бесплатный debt advice** (forbearance-логика, направление в free debt advice).
- **Section 75 CCA** — ПОДТВЕРЖДЕНО (FCA consumer page): с 15.07.2026 *"if something goes wrong with what you've bought using DPC, you may be able to get a refund from the lender because Section 75 of the Consumer Credit Act will be available."* (солидарная ответственность лендера, покупки £100–£30,000). URL: https://www.fca.org.uk/consumers/buy-now-pay-later.
- **Доступ к FOS** (Financial Ombudsman Service) — ПОДТВЕРЖДЕНО.
- **Consumer Duty применяется к авторизованным DPC-лендерам** — ПОДТВЕРЖДЕНО (PS26/1).
- **Не ретроспективно — ПОДТВЕРЖДЕНО verbatim:** *"Any DPC agreements entered into before regulation day will remain exempt"* + неавторизованные фирмы *"will continue to be able to service DPC agreements that were taken out before regulation day."* → договоры до 15.07.2026 не получают s.75/FOS/новых disclosures.
- **TPR (Temporary Permissions Regime):** окно открылось **15 мая 2026**, последний день нотификации — **1 июля 2026**, fee **£280**, далее 6 мес на полную заявку. URL: https://www.fca.org.uk/firms/regulating-buy-now-pay-later.

### 3.4 ⚠️ Уточнение: DPC-broking exemption — для МЕРЧАНТА, не для приложения

Это самое важное уточнение к §3 трека 09 (вывод трека 09 ВЕРЕН, но теперь с точным основанием):

- SI 2025/859 вводит **новый RAO art 36FB** — исключение из credit broking (art 36A) для **поставщика товаров/услуг**, включая *"domestic premises supplier"* (определение в art 36FB(2): *"a person… who sells, offers to sell or agrees to sell goods; or offers to supply services… to a customer who is an individual while the supplier… is physically present at the dwelling"*). Плюс существующее исключение art 60F(2)-related для мерчантов.
- Цель (verbatim из юр-анализа SI): *"ensuring that most merchants (e.g. e-commerce websites) are not subject to credit broking regulations when they refer customers to third-party BNPL providers."* То есть исключение завязано на **продавца товара/услуги** в данной сделке.
- **Сторонние финансовые приложения / интродьюсеры (как Decode) под это исключение НЕ подпадают** — они не «supplier of the goods or services». Значит, после 15.07.2026 интродукция юзера к BNPL/DPC-лендеру со стороны Decode = credit broking (art 36A) и требует авторизации/AR/партнёра.
- **Остаточная неопределённость (флаг юристу):** точная граница «introduction» vs «нейтральная информация» для third-party app в новом DPC-контексте не разъяснена FCA примерами; нужна юр-оценка конкретного UX (особенно если появятся deep-links/affiliate).

---

## 4. Consumer Duty — релевантность для explain-фич — ПОДТВЕРЖДЕНО

Источник: PRIN 2A «The Consumer Duty» — https://handbook.fca.org.uk/handbook/prin2a (сверено 12.06.2026).

**Важная оговорка о применимости:** Consumer Duty (Principle 12 + PRIN 2A) обязывает **FCA-авторизованные фирмы**. Decode как неавторизованное приложение **напрямую Duty не связан**. Но:
1. Duty связывает **DPC-лендеров**, чьи документы парсит Decode → даёт Decode объективные нормативные «крючки» (что лендер обязан раскрыть/как коммуницировать) для trap detector.
2. Если Decode когда-либо авторизуется (P3-ветка с кредитом), Duty станет напрямую применим.

**Cross-cutting obligations (PRIN 2A.2), verbatim:** фирмы должны *"acting in good faith towards customers, avoiding causing foreseeable harm to customers and enabling and supporting customers to pursue their financial objectives"* + учитывать *"cognitive and behavioural biases"* и *"vulnerability"*.

**Consumer understanding outcome (PRIN 2A.5), verbatim-смысл:** коммуникации *"clear, fair and not misleading"*; *"plain and intelligible language… explain… jargon or technical terms as simply as possible"*; *"make key information prominent"*; equip customers *"to make effective, timely and properly informed decisions"*. → Это, по сути, **дизайн-цель самого Decode** — plain-English explain + prominent key info. Полезно как референс качества explain-копирайта (и как нарратив для кейса: «Decode помогает юзеру получить тот самый consumer-understanding outcome, который FCA требует от лендеров»).

---

## 5. Дисклеймеры легальных UK-сервисов — VERBATIM (сверено 12.06.2026)

**MoneySavingExpert** (модель «журналистика, не advice») — https://www.moneysavingexpert.com/site/about-the-site/
- *"It's important to let you know that information on this site does not constitute financial advice."*
- *"All information is based on journalistic research and analysis rather than tailored advice aimed at individuals."*
- *"Decisions should be taken only after considering the effects on specific circumstances."*
- *"…unfortunately price and terms of products and deals can always be changed by the provider afterwards, so double check first."*
- *"…you use the information at your own risk and we can't accept liability if things go wrong."*

**ClearScore** (модель «авторизованный credit broker, но не advisor») — https://www.clearscore.com/terms (получено через поисковый снапшот; прямой fetch отдал 403 — анти-бот)
- *"We don't have all the information about you or your individual financial situation and we are not providing you with financial advice."*
- *"The key thing to remember is that you need to make your own decision about whether any offers are right for you."*
- Позиционирование: *"ClearScore is an independent credit broker, not a lender"* (авторизованы и регулируются FCA как credit broker).

**Nous.co** (модель «switching вне FCA-периметра: энергия/телеком; осторожный язык об оценках») — https://www.nous.co/terms-of-use
- *"…we are unable to offer anything other than a good faith estimate of future savings."*
- *"These tools are offered on an 'as is' basis."*
- *"we exclude liability for failure to achieve any particular saving or benefit for you."*
- *"We do not guarantee that our choice of service provider is the best possible… nor do we guarantee that you will save any particular sum of money…"*
- *"We do not compare every supplier in the energy market."*
- *"Prices can change quickly so we cannot promise that the chosen tariff will be the cheapest available."*
- (В terms НЕТ заявлений об FCA-статусе — потому что энергия/broadband/mobile switching не FCA-регулируется (Ofgem/Ofcom). Прецедент для P3-фич Decode по НЕкредитным биллам.)

**Паттерн для Decode:** комбинировать (1) MSE «information, not advice; check your circumstances; at your own risk», (2) ClearScore «you make your own decision», (3) Nous-стиль для любых оценок («estimate, not a guarantee; market data as of [date]») + обязательный signposting на MoneyHelper / StepChange / National Debtline.

---

## 6. Практическая таблица: ✅ можно (information) / ❌ нельзя (advice / broking / promo)

Принцип (PERG 17.5 Q5.3): **факт о документе + факт о рынке с источником/датой + объяснение термина + нейтральные опции + «decision is yours» = information.** Оценка «хорошо/плохо для тебя» + «сделай X» = advice. Плюс «ловушка селекции»: даже отобранные так, чтобы подтолкнуть, факты становятся advice.

| Фича Decode | ✅ Можно (information) | ❌ Нельзя без авторизации | Первоисточник |
|---|---|---|---|
| **Summary (3 фразы)** | *"This is a credit agreement for £400 over 6 payments. Late payments incur a £12 fee. Missed payments may be reported to credit reference agencies."* | *"This is a bad deal"*, *"we wouldn't sign this"*, любые оценочные эпитеты о решении юзера | PERG 17.5 Q5.2 (value judgment = advice) |
| **Key terms extraction** | Термины + plain-English определения (*"APR means…"*) | Селективный показ **только** «плохих» термов с рамкой «вот почему это плохо для тебя» | PERG 17.5 Q5.3 (selection w/ value judgment) |
| **True cost engine** | Детерминированный расчёт: *"Total you will repay: £X — that's £Y more than the cash price."* (= organising данных самого документа) | *"You can't afford this"*, *"this will hurt your finances"* (оценка персональной affordability) | PERG 17.7 пример (15) — ✅; (16) — ❌ |
| **Trap detector** | *"This contract has a £12 late fee; typical market range is £5–10 [source, date]."* + *"This clause allows the rate to change without notice — here's what that means."* Нейтрально, КАЖДЫЙ пункт по одной методологии, **показывать и «зелёные» пункты** | *"Don't sign because of this"*, *"this lender is predatory"*; скоринг «ловушек», читающийся как рекомендация отказаться (особенно по заключённому договору) | PERG 17.5 Q5.3 (симметрия против selection); Q5.2 |
| **Ask-anything Q&A** | Факты из документа с source-highlighting; *"balanced and neutral"* объяснение опций; на *"what should I do?"* — generic-рамка (*"the pros and cons are… the choice is yours"*) + signpost MoneyHelper/StepChange | Прямые ответы на *"should I pay this off early?"*, *"which debt first?"*, *"should I switch to Z?"* | PERG 17.7 ✅ (5)(7)(8)(13); ❌ (14)(16); PERG 17.5 Q5.3 («asks for recommendation → advice») |
| **Renewal Radar / Vault** | *"Payment of £X due on [date]."* *"Your fixed rate ends on [date]; after that the rate becomes Y%."* | Приоритизация платежей между долгами (*"pay this first"*); *"cancel this, it's not worth it"* для фин-продуктов | PERG 17.7 пример (14) |
| **Benchmarking** | Агрегаты с источником/датой: *"Average late fee across major UK BNPL providers is £X (as of June 2026)."* | *"Provider Z charges less — switch"* (steer + промо); именованные альтернативы с CTA/линком | s21 FSMA; RAO 36A; мониторить CP26/15 |
| **P3: cancel/switch (энергия/телеком/подписки)** | Инструкции, шаблоны, *"here's how to cancel"* — вне FCA-периметра (модель Nous) | — (по этим категориям FCA не применяется; следить за Ofgem/Ofcom-правилами) | вне FCA |
| **P3: switch (КРЕДИТ / BNPL)** | Фактологичный *"you have the right to complain to the FOS"*; категория альтернатив без линка | Подбор+оформление замены, передача данных лендеру, deep-link к продукту = **credit broking** (36A (a)+(e)); после 15.07.2026 это касается и BNPL-лендеров | RAO 36A; SI 2025/859 art 36FB (исключение НЕ для приложений) |
| **P3: страховки** | — | Рекомендация сменить страховку = insurance distribution | PERG 5 (insurance) |
| **P3: negotiation scripts** | Шаблон письма для самого юзера по НЕкредитным биллам | Переговоры с кредитором ОТ ИМЕНИ юзера об условиях долга = **debt adjusting** (39D: *"negotiating with the creditor, on behalf of the debtor, terms for discharge of the debt"*); скрипт «проси reschedule» по конкретному долгу ≈ debt counselling | RAO 39D; PERG 17.7 (14)(16) |

**Инварианты для всех фич:**
- Подавать detector-выводы **симметрично** (и хорошее, и плохое по одной методологии) — против «selection involving a value judgment» (PERG 17.5 Q5.3).
- **Два режима копирайта:** pre-signature (свободнее — incurring, не liquidating) vs post-signature/Vault (строже — заключённый долг).
- Запрещённые паттерны в UI и LLM-выводе: *"you should"*, *"we recommend"*, *"don't sign"*, *"switch to"*, *"pay X first"*, *"best/worst deal"*. Системный промпт + output-фильтр + intent-классификатор «вопрос-рекомендация» (PERG 17.5 Q5.3: *"If a debtor asks for a recommendation, any response is likely to be regarded as advice"*).
- «Это сказал AI» — НЕ защита (PERG 17.5 Q5.7: interactive software system = медиум advice; FCA technology-agnostic). Те же guardrails к AI-выводу, что к человеческому.

---

## 7. Где остаётся неопределённость (явно — юристу)

1. **Q&A по заключённым договорам** — самая тонкая зона. Граница «нейтральное объяснение опций» (ок) vs «soft steer» (пример (6) — debt counselling даже без явной рекомендации) узкая. Нужен утверждённый юристом шаблон ответа + intent-классификатор.
2. **«Selection» в AI-выводе.** Любой ранкинг/подсветка «что важно» — потенциальный value judgment. Методология detector'а (что и почему флагается) должна быть задокументирована и юридически выверена как «balanced and neutral».
3. **DPC-broking exemption (art 36FB) и third-party apps.** Подтверждено, что исключение для supplier'а, не для приложения; но точная грань «introduction» vs «информация» для third-party app в DPC-контексте FCA-примерами не разъяснена. Любые deep-links/affiliate — красная зона.
4. **Trap detector по заключённому BNPL-договору** может читаться как имплицитный совет «расторгни/жалуйся» → ближе к debt counselling, чем pre-signature. Строгий режим обязателен.
5. **CP26/15 (CONC 3 reform)** ещё консультация (due 17.06.2026) — финальные правила промо для кредита могут сместить границы benchmarking-фичи; не строить на текущем CONC 3 как на финальном.
6. **AI на краю периметра** — FCA Perimeter Report (2026) и Mills Review поднимают тему general-purpose AI-«советчиков». Возможное уточнение периметра под AI — главный регуляторный риск горизонта 12–24 мес.

→ **Всё вышеизложенное требует compliance-review UK-юриста по consumer credit перед запуском.** Особенно: (а) шаблоны Q&A-ответов; (б) методология trap detector; (в) любые P3-фичи с кредитом/страховками; (г) тексты дисклеймеров.

---

## Что изменилось vs трек 09

**Подтверждено (без изменений) — ядро трека 09 достоверно:**
- ✅ Pre-signature = incurring → вне debt counselling (PERG 17.7 ex. 4, verbatim).
- ✅ Post-signature «гасить досрочно/какой долг первым» = debt counselling (ex. 14, 16).
- ✅ Все формулы advice/information (PERG 17.5 Q5.1–5.7) — дословны и точны.
- ✅ RAO 36A (credit broking, incl. «preparatory work»), 39D (debt adjusting), s21 FSMA — тексты сверены, цитаты верны.
- ✅ BNPL → 15.07.2026; PS26/1 от 11.02.2026; s.75, FOS, affordability, disclosures, Consumer Duty к лендерам; не ретроспективно; TPR (15.05–01.07.2026, £280). Рыночные цифры (£13bn 2024; 20% / 10.9m adults) — подтверждены FCA press release.
- ✅ Дисклеймеры MSE / ClearScore / Nous — verbatim совпали.
- ✅ **Нумерация примеров PERG 17.7 в треке 09 оказалась РЕАЛЬНОЙ FCA-нумерацией** (не ICAEW-сдвинутой) — повышает доверие к треку 09.

**Уточнено (детализация, не опровержение):**
- 🔧 DPC-broking exemption: точный артикул — **новый RAO art 36FB** (SI 2025/859), и он завязан на **поставщика товара/услуги** (incl. domestic premises supplier), а НЕ на «мерчантов вообще». Вывод трека 09 «исключение не для финансовых приложений» — ВЕРЕН и теперь подкреплён номером статьи и legislation.gov.uk.
- 🔧 Юр. база BNPL: добавлены точные SI — **2025/859** и **2025/1154** (трек 09 ссылался на них описательно).
- 🔧 Consumer Duty: явно зафиксировано, что Decode (неавторизованный) Duty напрямую НЕ связан — Duty связывает лендеров; это и есть источник «крючков» для trap detector (трек 09 формулировал мягче).

**Новое (не было в треке 09):**
- 🆕 **CP26/15** «Reviewing the financial promotions rules for consumer credit» (FCA, due 17.06.2026) — пересмотр CONC 3, опора на Consumer-Duty consumer-understanding outcome. Прямо релевантно benchmarking/промо Decode — добавить в мониторинг.
- 🆕 **PRIN 2A.5 consumer-understanding outcome** как референс-стандарт качества explain-копирайта Decode (и нарратив для кейса).

**Опровергнуто:** ничего существенного. Трек 09 верен; правки — уточняющие.

---

## Итоговое summary (5–7 предложений)

Независимая верификация по первоисточникам (FCA Handbook PERG/PRIN, legislation.gov.uk, FCA policy statements) **подтвердила ядро трека 09**: pre-signature анализ кредитного/BNPL-оффера — это про «incurring debt», и PERG 17.7 пример (4) дословно выводит его из debt counselling, тогда как post-signature Q&A вида «гасить ли досрочно / какой долг первым» попадает в debt counselling (примеры 14, 16) — то есть wedge Decode легален без FCA-авторизации, а главная рисковая зона — Q&A/Vault по уже заключённым договорам. Все формулы границы advice vs information (PERG 17.5 Q5.1–5.7, включая «ловушку селекции» и «interactive software system» как медиум advice) сверены verbatim и точны. Тексты s21 FSMA, RAO art 36A (credit broking) и art 39D (debt adjusting) подтверждены по legislation.gov.uk. BNPL-регуляция подтверждена: **PS26/1 (11.02.2026), Regulation Day 15 июля 2026**, новые affordability-проверки, обязательные pre-contract disclosures, Section 75 и доступ к FOS, Consumer Duty к лендерам, не ретроспективно (договоры до 15.07.2026 остаются exempt). Главное уточнение к треку 09: DPC-broking-исключение — это новый RAO art 36FB для **поставщика товара/услуги** (не для сторонних финансовых приложений), поэтому интродукции Decode к BNPL-лендерам после Regulation Day = credit broking; дисклеймеры MSE/ClearScore/Nous подтверждены дословно. Новым относительно трека 09 является живая консультация **CP26/15** (пересмотр CONC 3, due 17.06.2026), которую нужно мониторить для benchmarking/промо-фич. **Всё это остаётся product/market-анализом и требует финального compliance-review UK-юриста** — особенно шаблоны Q&A, методология trap detector и любые P3-фичи с кредитными/страховыми продуктами.

**Файл записан:** `/Users/elenauvarova/git projects/decode/research/09b-fca-boundary-verified.md`
