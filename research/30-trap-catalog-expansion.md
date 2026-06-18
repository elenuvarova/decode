# 30 — Расширение trap-каталога: doc-type #2 (после BNPL)

> Трек **trap-expand**. Цель: собрать verbatim trap-маркеры из реальных UK-документов четырёх типов (insurance renewal, subscription/SaaS, utility/telecom, gym/membership), для каждого — маркеры + цена ошибки £ + severity, и обосновать, какой doc-type брать **№2** после BNPL.
> Дата актуальности: июнь 2026. Метод: WebSearch + WebFetch до первоисточников (FCA Handbook, legislation.gov.uk, Ofcom, Citizens Advice, реальные T&C вендоров). Термины и цитаты — EN.
> Связано с: `research/10b-trap-tc-corpus.md` (BNPL trap-корпус), `research/00-executive-summary.md`.

---

## TL;DR (для нетерпеливых)

**Doc-type #2 = Insurance renewal letters (auto + home + pet/health).** Не subscription.

Три причины кратко:
1. **Формат идеален под wedge.** Renewal — это *одно письмо в год* с жёстко регулируемой структурой (FCA ICOBS 6.5): на странице обязаны быть прошлогодняя и новая премия рядом, флаг auto-renew и (с 4-го года) предписанный «shop around» текст. Это детерминированный true-cost diff «из коробки» — ровно та механика, что уже построена для BNPL.
2. **Цена ошибки самая высокая и измеримая.** Loyalty penalty в home insurance — **£708 млн/год** ([Citizens Advice](https://www.citizensadvice.org.uk/about-us/media-centre/press-releases/citizens-advice-issues-super-complaint-as-loyal-customers-continue-to-be-penalised-by-over-4-billion-a-year/)). На одного юзера это десятки–сотни £ за один невнимательный авто-ренью.
3. **Регуляторика стабильна и работает на нас.** Правила FCA действуют **с 1 января 2022** ([FCA PS21/5](https://www.fca.org.uk/publication/policy/ps21-5.pdf)) — в отличие от subscription-режима DMCC, который **отложен до весны 2027** ([Taylor Wessing, апрель 2026](https://www.taylorwessing.com/en/insights-and-events/insights/2026/04/subscription-contracts)).

Subscription/SaaS — сильный **№3**: боль массовая (£1.6 млрд/год на ненужные подписки), но маркеры размазаны по экранам/чекаутам, а не лежат в одном документе → хуже ложится на «сфоткай документ» wedge до прихода DMCC-режима.

---

## 1. Insurance renewal letters

### Контекст и регуляторная рамка
UK-страховщики обязаны присылать **renewal notice** по правилам **FCA ICOBS 6.5** ([FCA Handbook ICOBS 6.5](https://handbook.fca.org.uk/handbook/ICOBS/6/5.html)). Ключевое для нас: с **1 января 2022** действует пакет General Insurance Pricing Practices (GIPP) — запрет «price walking» + обязательная прозрачность ренью ([FCA PS21/5](https://www.fca.org.uk/publication/policy/ps21-5.pdf)).

Это даёт **уникальное для UK свойство**: само письмо по закону структурировано так, что в нём *рядом* стоят прошлогодняя и новая цена. Decode не нужно угадывать diff — он напечатан в документе.

### Verbatim trap-маркеры

| Маркер (что искать в письме) | Verbatim / regulator-prescribed формулировка | Что это значит для юзера |
|---|---|---|
| **Auto-renewal flag** | Renewal notice по ICOBS обязан содержать «a statement informing the consumer whether the contract will automatically renew or whether the consumer needs to take action to accept the renewal offer» ([FCA Handbook ICOBS 6.5](https://handbook.fca.org.uk/handbook/ICOBS/6/5.html)). Практические формулировки в письмах: *"Your policy will automatically renew on [date] unless you tell us otherwise"*, *"We'll renew your policy automatically using the card details we hold."* | Деньги спишут сами, если не отменить до renewal date. |
| **Last year vs this year премия** | По правилам firms «are required to disclose last year's premium at each renewal, so that it can be easily compared to the new premium offered» ([GoCompare / FCA transparency rules](https://www.fca.org.uk/firms/transparency-insurance-renewals)). В письме это строки *"Last year you paid £X"* / *"Your renewal price is £Y"*. | Прямой year-on-year price hike — главный сигнал loyalty penalty. |
| **Prescribed «shop around» message (4+ renewals)** | Дословно: **«You have been with us a number of years. You may be able to get the insurance cover you want at a better price if you shop around.»** Требуется с 4-го последовательного ренью ([FCA PS21/5, ICOBS 6.5.2](https://www.fca.org.uk/publication/policy/ps21-5.pdf)). | Сам регулятор сигналит: ты переплачиваешь за лояльность. Decode может это подсветить как red flag. |
| **CPA / recurring card mandate** | *"We will collect your premium from the payment card you used"* — это **Continuous Payment Authority (CPA)**. Юзер вправе отменить в любой момент: *"you have the right to cancel a continuous payment authority at any time"*, и банк обязан остановить по запросу ([FCA — Recurring card payments](https://www.fca.org.uk/consumers/recurring-card-payments)). | Списание идёт даже если юзер «забыл» — и многие не знают, что CPA можно убить через банк (reg. 67 Payment Services Regulations 2017). |
| **Cancellation / admin fee** | *"An administration/cancellation fee may apply if you cancel."* | Скрытая стоимость выхода (см. цену ошибки ниже). |
| **Cooling-off vs renewal date deadline** | 14-day cooling-off после ренью существует, но fee всё равно могут взять. | Юзер думает «у меня есть 14 дней», но платит admin fee + pro-rata. |

### Цена ошибки £

- **Loyalty penalty, home insurance: £708 млн/год** по всему рынку ([Citizens Advice super-complaint](https://www.citizensadvice.org.uk/about-us/media-centre/press-releases/citizens-advice-issues-super-complaint-as-loyal-customers-continue-to-be-penalised-by-over-4-billion-a-year/)). Citizens Advice: home-страховщики делают **до 100% прибыли** на loyalty penalty ([CA](https://www.citizensadvice.org.uk/about-us/media-centre/press-releases/home-insurance-companies-make-100-of-their-profits-from-the-loyalty-penalty-reveals-citizens-advice/)).
- **До-реформенный масштаб:** 6 млн клиентов переплатили **£1.2 млрд за 2018 год**; FCA оценил экономию от реформы в **£4.2 млрд за 10 лет** ([FCA press release](https://www.fca.org.uk/news/press-releases/fca-confirms-measures-protect-customers-loyalty-penalty-home-motor-insurance-markets)).
- **Cancellation fee:** в среднем **£25** в cooling-off и **£64** после; диапазон до **£100–£125** в зависимости от страховщика ([NimbleFins](https://www.nimblefins.co.uk/cheap-car-insurance/average-cost-cancel-uk-car-insurance)).
- **На одного юзера 18–25:** типичный year-on-year hike по motor — десятки–сотни £; молодые водители платят самые высокие премии в UK, поэтому % переплаты бьёт сильнее.

### Severity: **HIGH**
Реальные деньги (десятки–сотни £ за один невнимательный авто-ренью), высокая частота (раз в год, у каждого есть хотя бы один полис), и — критично — **диагностируемо из одного документа** благодаря FCA-структуре.

---

## 2. Subscription / SaaS T&C

### Контекст и регуляторная рамка
Ключевая будущая рамка — **subscription contracts regime** в составе **Digital Markets, Competition and Consumers Act 2024 (DMCC Act)**, Part 4 Chapter 2 ([legislation.gov.uk](https://www.legislation.gov.uk/ukpga/2024/13/part/4/chapter/2)). **Важно: режим ещё НЕ в силе** — на апрель 2026 запуск отложен до **весны 2027** ([Taylor Wessing](https://www.taylorwessing.com/en/insights-and-events/insights/2026/04/subscription-contracts); [Hogan Lovells](https://www.hoganlovells.com/en/publications/uk-subscription-law-shakeup-new-rules-pushed-to-autumn-2026)). DBT опубликовал ответ на консультацию **2 апреля 2026** ([Lexology / TLT](https://www.tlt.com/insights-and-events/insight/dmcca-subscription-contracts-rules---whats-the-latest)).

До 2027 действуют общие нормы (Consumer Rights Act 2015 + CMA-гайды по dark patterns), но **жёсткой структуры документа, как у insurance, нет** — маркеры размазаны по чекаутам и app-store-флоу, а не лежат в одном письме.

### Verbatim trap-маркеры

| Маркер | Verbatim / типовая формулировка | Что это значит |
|---|---|---|
| **Free-trial auto-convert** | *"Your free trial will automatically convert to a paid subscription unless you cancel before [date]. You will be charged £X."* Failing to disclose это прозрачно — dark pattern, незаконный под CMA-гайдами + Consumer Rights Act 2015 ([Adlex Solicitors](https://adlexsolicitors.co.uk/new-uk-online-subscription-rules-and-regulations/)). | Молчаливый переход trial → платно. **3.6 млн** ненужных подписок в UK — прямой результат trial-rollover ([gov.uk consultation](https://www.gov.uk/government/consultations/consultation-on-the-implementation-of-the-new-subscription-contracts-regime/consultation-on-the-implementation-of-the-new-subscription-contracts-regime-web-accessible-version)). |
| **Auto-renew по умолчанию** | *"Your subscription will automatically renew at the then-current price unless cancelled."* ~**1.3 млн** ненужных подписок — от авто-ренью ([gov.uk](https://www.gov.uk/government/consultations/consultation-on-the-implementation-of-the-new-subscription-contracts-regime/consultation-on-the-implementation-of-the-new-subscription-contracts-regime-web-accessible-version)). | Цена может расти на ренью; списание без напоминания. |
| **No-warning charge** | Отсутствие reminder перед списанием. *"this was stated at sign-up is not sufficient if no reminder or durable notice was provided before the charge"* ([Adlex](https://adlexsolicitors.co.uk/new-uk-online-subscription-rules-and-regulations/)). | Юзер забывает — платит. DMCC введёт обязательный reminder, но только с 2027. |
| **Cancel-only-by-phone / friction** | *"To cancel, you must call our customer service line."* Convoluted cancellation — мишень DMCC: businesses must allow ending «in a single communication and without ... steps which are not reasonably necessary» ([White & Case](https://www.whitecase.com/insight-alert/click-cancel-uks-new-subscription-contract-regime)). | Намеренный friction удерживает в подписке. |
| **Durable-medium фокус (будущее)** | DMCC: reminder/cooling-off notices — «in writing on a durable medium»; SMS/email/WhatsApp ок, «a fleeting in-app notification that cannot be retained ... will not» ([Travers Smith](https://www.traverssmith.com/knowledge/knowledge-container/the-uks-new-subscription-contracts-regime-what-when-and-why/)). | После 2027 отсутствие durable-reminder = нарушение. |

### Цена ошибки £
- **£1.6 млрд/год** тратится UK-потребителями на **ненужные** подписки ([gov.uk consultation](https://www.gov.uk/government/consultations/consultation-on-the-implementation-of-the-new-subscription-contracts-regime/consultation-on-the-implementation-of-the-new-subscription-contracts-regime-web-accessible-version)).
- Состав: ~3.6 млн от trial-rollover + ~1.3 млн от auto-renew.
- На одного юзера: типично £5–£15/мес × месяцы незамеченной подписки = £60–£180/год на одну забытую подписку.

### Severity: **MEDIUM–HIGH**
Боль огромная и очень близка сегменту 18–25 (стриминг, fitness-app, AI-tools). **НО** маркеры не живут в одном «документе, который можно сфоткать» — они в чекаут-флоу и app-store-настройках. До DMCC-2027 нет жёсткой структуры, на которую опереться для детерминированного diff.

---

## 3. Utility / Telecom

### Контекст и регуляторная рамка
Главная свежая интервенция — **Ofcom ban на inflation-linked mid-contract price rises**, объявлен в июле 2024, в силе **с 17 января 2025** ([Ofcom](https://www.ofcom.org.uk/phones-and-broadband/bills-and-charges/ofcom-bans-mid-contract-price-rises-linked-to-inflation)). Энергетику регулирует **Ofgem** (exit fees, 49-day rule).

Критично для trap-каталога: **ban не ретроспективен**. Старые контракты, подписанные до 17 января 2025, **сохраняют** «CPI + 3.9%»-формулу ([MoneySavingExpert](https://www.moneysavingexpert.com/news/2024/07/ofcom-bans-mid-contract-price-rises-linked-to-inflation/)). На апрель 2024 ~**6 из 10** broadband/mobile клиентов были на inflation-linked контрактах ([Ofcom](https://www.ofcom.org.uk/phones-and-broadband/bills-and-charges/ofcom-bans-mid-contract-price-rises-linked-to-inflation)). Значит, миллионы старых документов всё ещё содержат этот trap.

### Verbatim trap-маркеры

| Маркер | Verbatim / типовая формулировка | Что это значит |
|---|---|---|
| **Inflation-linked rise (старые контракты)** | *"Your monthly price will increase each March by the rate of CPI inflation plus 3.9%."* (телеком-стандарт до бана). | Непредсказуемый рост в середине контракта. Только **16%** broadband и **12%** mobile клиентов понимали, что это inflation-linked с надбавкой ([Ofcom](https://www.ofcom.org.uk/phones-and-broadband/bills-and-charges/ofcom-bans-mid-contract-price-rises-linked-to-inflation)). |
| **Minimum term** | *"This is a 12/18/24-month minimum term contract."* ([broadbandswitch.uk](https://broadbandswitch.uk/exit-fees-and-setup-fees.html)). | Лок-ин; ранний выход штрафуется. |
| **Early Termination Charge (broadband/mobile)** | *"If you end your contract before the end of the minimum term, an Early Termination Charge applies"* = months remaining × monthly cost. | Реальный пример BT: £35/мес, выход за 4 мес до конца → ETC **£67.32** (из £140) ([broadbandswitch.uk](https://broadbandswitch.uk/exit-fees-and-setup-fees.html)). |
| **Energy exit fee (Ofgem)** | *"An exit fee of £X per fuel applies if you leave before your fixed term ends."* | Обычно **£25–£75 per fuel**; Octopus — до £75/fuel на новых fixed-контрактах с марта 2026 ([energyplus.co.uk](https://www.energyplus.co.uk/news/exit-fee)). Dual fuel → ×2. |
| **49-day exemption (защита)** | Ofgem: нельзя брать exit fee при switch в последние **49 дней** контракта ([energyplus.co.uk](https://www.energyplus.co.uk/news/exit-fee)). | Маркер «когда выход бесплатный». |
| **Mid-contract rise → exit window** | Undisclosed mid-contract price rise даёт **30-day penalty-free exit window** (broadband) ([broadbandswitch.uk](https://broadbandswitch.uk/exit-fees-and-setup-fees.html)). | Право выхода, о котором юзеры не знают. |

### Цена ошибки £
- **Broadband/mobile ETC:** £100–£300 типично ([broadbandswitch.uk](https://broadbandswitch.uk/exit-fees-and-setup-fees.html)).
- **Energy exit fee:** £25–£75 per fuel × 2 (dual fuel) = до ~£150 ([energyplus.co.uk](https://www.energyplus.co.uk/news/exit-fee)).
- **Inflation-linked rise:** на старом контракте £30/мес при CPI+3.9% ≈ +£2–£4/мес = £24–£48/год сверх, незаметно.

### Severity: **MEDIUM**
Деньги реальны, но: (а) самый болезненный trap (inflation-rise) Ofcom **уже прибил** для новых контрактов — окно сужается; (б) документы разнородны (energy vs broadband vs mobile — разные форматы, разные регуляторы) → дороже строить детерминированный парсер; (в) частота решения — раз в 1–2 года.

---

## 4. Gym / Membership

### Контекст и регуляторная рамка
Историческая база — **OFT** (предшественник CMA) кейс против gym-контрактов: High Court признал ряд стандартных терминов unfair под Unfair Terms in Consumer Contracts Regulations 1999 ([Practical Law](https://uk.practicallaw.thomsonreuters.com/3-506-4863)). CMA продолжает линию: контракт unfair, если не даёт отменить при serious injury/illness ([What Consumer](https://whatconsumer.co.uk/gym-membership-rights/)). Cooling-off 14 дней + защита от unfair terms — текущая рамка.

### Verbatim trap-маркеры (из реальных UK T&C)

| Маркер | Verbatim из реальных T&C | Что это значит |
|---|---|---|
| **Minimum term lock-in** | David Lloyd: *"The minimum contract term of most ... memberships remains at least 12 months"* ([davidlloydmembershipcostguide.co.uk](https://davidlloydmembershipcostguide.co.uk/how-to-cancel-david-lloyd-membership/)). Историч.: 12-месячный minimum «absolutely ties them in to making the monthly payments for that period» ([What Consumer](https://whatconsumer.co.uk/gym-memberships/)). | Платишь весь срок, даже если не ходишь. |
| **Длинный notice period** | David Lloyd: Standard Monthly/Annual «usually require **three full calendar months' notice**»; Flexible — один месяц ([davidlloydmembershipcostguide.co.uk](https://davidlloydmembershipcostguide.co.uk/how-to-cancel-david-lloyd-membership/)). PureGym/The Gym Group (rolling): **4 working days** до billing date ([PureGym T&C](https://www.puregym.com/membership-terms-conditions/)). | 3-месячный notice = ещё 3 платежа после решения уйти. |
| **Late-notice → ещё списание** | PureGym: *"...up to 4 working days before your payment date"*; иначе *"your Monthly Membership will remain in force until the day before your next payment is due, at which point it will automatically terminate"* — т.е. **следующий платёж всё равно уйдёт** ([PureGym T&C](https://www.puregym.com/membership-terms-conditions/)). | Промахнулся на день → лишний месяц. |
| **Early cancellation fee** | David Lloyd: «Early cancellation fee: **usually 50% of remaining monthly fees**» ([davidlloydmembershipcost.org](https://davidlloydmembership-price.co.uk/membership-cancellation/)). PureGym fixed-term: refund только 50% pro-rata остатка ([PureGym T&C](https://www.puregym.com/membership-terms-conditions/)). | Выход стоит половину остатка контракта. |
| **Notice к платёжному провайдеру, не к gym (unfair)** | OFT/High Court: term, требующий уведомлять **payment provider вместо gym**, признан unfair — юзер уведомляет gym, отмена «ineffective», и остаётся liable ([Practical Law](https://uk.practicallaw.thomsonreuters.com/3-506-4863)). | Намеренная путаница в канале отмены. |
| **Debt-collection / CRA threat** | High Court рассматривал, нарушает ли practice угроз «report members as defaulters to credit reference agencies» Consumer Protection from Unfair Trading Regs 2008 ([Practical Law](https://uk.practicallaw.thomsonreuters.com/3-506-4863)). | Передача коллекторам + удар по кредитному рейтингу за «недоплату». |

### Цена ошибки £
- **Minimum term lock-in:** 12 мес × £20–£60/мес = **£240–£720** обязательств.
- **Notice period miss:** 1–3 лишних платежа = £20–£180.
- **Early cancellation fee:** 50% остатка — на 12-мес контракте при выходе в середине ≈ **£120–£360**.
- **Скрытый ущерб:** CRA-маркер → удар по кредитному рейтингу (для 18–25 особенно болезненно — впереди аренда/кредиты).

### Severity: **MEDIUM**
Высокая релевантность сегменту 18–25 и реальные деньги. **НО:** маркеры сильно зависят от конкретного вендора (PureGym 4 дня vs David Lloyd 3 месяца — нет единого стандарта), документ часто не выдаётся юзеру на руки в полном виде, и частота — низкая (один-два gym-контракта за период).

---

## 5. Сравнительная матрица и выбор doc-type #2

| Критерий | Insurance renewal | Subscription/SaaS | Utility/Telecom | Gym/Membership |
|---|---|---|---|---|
| **Цена ошибки (рынок)** | £708M/год loyalty penalty (home) | £1.6млрд/год ненужные подписки | exit fees £25–£300 | lock-in £240–£720 |
| **Цена ошибки (на юзера)** | десятки–сотни £/ренью | £60–£180/забытая подписка | £24–£300 | £120–£720 |
| **Частота для юзера** | ежегодно, ≥1 полис у всех | очень часто (мн-во подписок) | раз в 1–2 года | редко |
| **Релевантность 18–25** | средняя–высокая (motor дорог) | **очень высокая** | средняя | высокая |
| **Жёсткая структура документа** | **ДА (FCA ICOBS 6.5)** | нет (флоу, не док) | частично, разнородно | зависит от вендора |
| **Один документ под «сфоткай»** | **ДА (renewal letter)** | нет | да, но 3 формата | частично |
| **Регуляторика стабильна сейчас** | **ДА (с 01.01.2022)** | нет (DMCC → весна 2027) | частично (ban не ретро) | да (давняя) |
| **Сложность парсера** | низкая (структура задана) | высокая | средняя–высокая | средняя |
| **Итог severity** | **HIGH** | MEDIUM–HIGH | MEDIUM | MEDIUM |

### Рекомендация: **Insurance renewal letters — doc-type #2**

**Обоснование по 4 осям задачи:**

1. **Боль (£).** Самая большая *измеримая и атрибутируемая* переплата: £708M/год только в home insurance, до 100% прибыли страховщиков ([Citizens Advice](https://www.citizensadvice.org.uk/about-us/media-centre/press-releases/home-insurance-companies-make-100-of-their-profits-from-the-loyalty-penalty-reveals-citizens-advice/)). На юзера — конкретный year-on-year hike, который Decode покажет цифрой.

2. **Частота.** Ровно один renewal letter в год на каждый полис, у каждого взрослого UK-резидента есть минимум motor/home/contents/pet. Предсказуемый ежегодный trigger → естественный hook для Renewal Radar (уже в продукте).

3. **Регуляторика.** Правила FCA **в силе и стабильны** (GIPP с 01.01.2022). Это сильный контраст с subscription: DMCC-режим **отложен до весны 2027** — строить продукт на ещё-не-действующих правилах рискованно.

4. **Сложность.** **Самая низкая** среди кандидатов. FCA по закону заставила страховщиков печатать last-year-vs-this-year премию + auto-renew флаг + (с 4-го года) дословный «shop around» текст в одном письме. Это превращает trap-detection и true-cost diff в *детерминированную* задачу — переиспользует ровно ту механику, что построена для BNPL, без зависимости от вендора.

**Почему НЕ subscription первым:** боль массовее и ближе 18–25, но (а) нет единого документа — маркеры в чекаут-флоу/app-store, что ломает «сфоткай документ» wedge; (б) ключевая защитная регуляторика (DMCC) не заработает до 2027; (в) парсинг разнородных T&C-страниц дороже. Subscription — логичный **№3**, и его стоит закладывать в roadmap под Q1–Q2 2027 (к моменту DMCC), когда у документов появится обязательная durable-medium структура reminder'ов.

**Порядок trap-каталога:** BNPL (есть) → **Insurance renewal (#2)** → Subscription/SaaS (#3, к DMCC-2027) → Telecom/Utility (#4) → Gym (#5).

---

## Key takeaways for Decode

1. **Брать insurance renewal letters как doc-type #2.** Это единственный кандидат, где регулятор (FCA ICOBS 6.5) *по закону* кладёт в один документ всё для wedge: last-year-vs-this-year премию, auto-renew флаг и дословный «shop around» сигнал. Детерминированный true-cost diff почти из коробки — минимальная доработка BNPL-движка.

2. **Готовый набор verbatim trap-маркеров для insurance-парсера:** (a) auto-renew statement; (b) "Last year you paid £X" vs "Your renewal price is £Y"; (c) prescribed-текст **«You have been with us a number of years. You may be able to get the insurance cover you want at a better price if you shop around.»** (флаг 4+ ренью = loyalty penalty); (d) CPA/recurring-card mandate; (e) cancellation/admin fee. Подсветить (c) как severity-HIGH red flag — это сам регулятор говорит «ты переплачиваешь».

3. **True-cost для insurance = year-on-year delta + cancellation fee.** Якорить на реальных цифрах: loyalty penalty £708M/год (home), средний cancel fee £25 (cooling-off) / £64 (после). Renewal Radar + Vault уже покрывают «ежегодный trigger» — insurance ложится без новой механики.

4. **Subscription — №3, не №2, и завязать на DMCC-2027.** Боль крупнее (£1.6млрд/год, 3.6M trial-rollover + 1.3M auto-renew), но маркеры не в одном документе и защитная регуляторика (DMCC subscription regime) **отложена до весны 2027**. Заложить в roadmap триггер: как только DMCC вводит обязательные durable-medium reminder'ы — у подписок появляется парсимая структура, и Decode заходит с готовым trap-набором (free-trial auto-convert, no-warning charge, cancel-only-by-phone).

5. **Telecom/gym — №4–5, фоном.** Их главные traps либо сужаются регулятором (Ofcom inflation-ban не ретроспективен — окно закрывается для новых контрактов), либо вендор-зависимы (gym notice: PureGym 4 дня vs David Lloyd 3 месяца). Но gym-маркер «debt-collection / CRA threat» стоит держать в каталоге как высоко-severity для 18–25 — удар по кредитному рейтингу перед арендой/кредитами.

6. **Кросс-тип паттерн для AI-eval.** Четыре общих trap-класса повторяются во ВСЕХ doc-type и должны стать базовыми категориями trap-детектора: **auto-renewal-by-default**, **lock-in/minimum-term**, **asymmetric-exit (fee/notice/phone-only)**, **silent-price-escalation**. Это переиспользуемая таксономия поверх BNPL → insurance → subscription → telecom → gym, а не отдельный набор правил на каждый тип.

---

### Источники (первоисточники жирным)

- **[FCA Handbook — ICOBS 6.5 Renewals](https://handbook.fca.org.uk/handbook/ICOBS/6/5.html)** — правила renewal notice, auto-renew disclosure.
- **[FCA PS21/5 — General insurance pricing practices](https://www.fca.org.uk/publication/policy/ps21-5.pdf)** — price-walking ban, prescribed «shop around» текст.
- **[FCA — measures to protect from loyalty penalty (press release)](https://www.fca.org.uk/news/press-releases/fca-confirms-measures-protect-customers-loyalty-penalty-home-motor-insurance-markets)** — £1.2млрд/2018, £4.2млрд/10 лет.
- **[FCA — Transparency in insurance renewals](https://www.fca.org.uk/firms/transparency-insurance-renewals)** — last-year premium disclosure.
- **[FCA — Recurring card payments (CPA)](https://www.fca.org.uk/consumers/recurring-card-payments)** — право отмены CPA.
- **[Citizens Advice — super-complaint £4.1bn loyalty penalty](https://www.citizensadvice.org.uk/about-us/media-centre/press-releases/citizens-advice-issues-super-complaint-as-loyal-customers-continue-to-be-penalised-by-over-4-billion-a-year/)** — £708M home insurance.
- **[Citizens Advice — home insurers 100% profit from loyalty penalty](https://www.citizensadvice.org.uk/about-us/media-centre/press-releases/home-insurance-companies-make-100-of-their-profits-from-the-loyalty-penalty-reveals-citizens-advice/)**.
- **[NimbleFins — average car insurance cancellation cost](https://www.nimblefins.co.uk/cheap-car-insurance/average-cost-cancel-uk-car-insurance)** — £25/£64.
- **[legislation.gov.uk — DMCC Act 2024 Part 4 Ch.2](https://www.legislation.gov.uk/ukpga/2024/13/part/4/chapter/2)** — subscription contracts regime.
- **[gov.uk — subscription contracts regime consultation](https://www.gov.uk/government/consultations/consultation-on-the-implementation-of-the-new-subscription-contracts-regime/consultation-on-the-implementation-of-the-new-subscription-contracts-regime-web-accessible-version)** — £1.6млрд, 3.6M+1.3M.
- [Taylor Wessing — subscription regime delayed to Spring 2027](https://www.taylorwessing.com/en/insights-and-events/insights/2026/04/subscription-contracts).
- [Hogan Lovells — rules pushed to autumn 2026](https://www.hoganlovells.com/en/publications/uk-subscription-law-shakeup-new-rules-pushed-to-autumn-2026); [TLT — what's the latest (DBT response 2 Apr 2026)](https://www.tlt.com/insights-and-events/insight/dmcca-subscription-contracts-rules---whats-the-latest).
- [White & Case — click-to-cancel regime](https://www.whitecase.com/insight-alert/click-cancel-uks-new-subscription-contract-regime); [Travers Smith — durable medium](https://www.traverssmith.com/knowledge/knowledge-container/the-uks-new-subscription-contracts-regime-what-when-and-why/); [Adlex Solicitors — free-trial dark patterns](https://adlexsolicitors.co.uk/new-uk-online-subscription-rules-and-regulations/).
- **[Ofcom — ban on inflation-linked mid-contract price rises](https://www.ofcom.org.uk/phones-and-broadband/bills-and-charges/ofcom-bans-mid-contract-price-rises-linked-to-inflation)** — в силе 17.01.2025, 6/10 на inflation-linked, 16%/12% понимали.
- [MoneySavingExpert — Ofcom ban, не ретроспективен](https://www.moneysavingexpert.com/news/2024/07/ofcom-bans-mid-contract-price-rises-linked-to-inflation/).
- [broadbandswitch.uk — exit fees, BT ETC £67.32 пример](https://broadbandswitch.uk/exit-fees-and-setup-fees.html); [energyplus.co.uk — energy exit fees £25–£75/fuel, 49-day rule](https://www.energyplus.co.uk/news/exit-fee).
- **[PureGym — Membership Terms & Conditions (UK)](https://www.puregym.com/membership-terms-conditions/)** — verbatim 4-working-days notice, late-notice → ещё платёж.
- [David Lloyd cancellation guide — 12-мес minimum, 3-мес notice, 50% early fee](https://davidlloydmembershipcostguide.co.uk/how-to-cancel-david-lloyd-membership/); [David Lloyd cancellation cost](https://davidlloydmembership-price.co.uk/membership-cancellation/).
- **[Practical Law — High Court: gym terms unfair (OFT case)](https://uk.practicallaw.thomsonreuters.com/3-506-4863)** — notice-to-payment-provider unfair, CRA-threat под CPUT 2008.
- [What Consumer — gym membership rights / unfair terms](https://whatconsumer.co.uk/gym-membership-rights/); [What Consumer — gym memberships 12-мес lock-in](https://whatconsumer.co.uk/gym-memberships/).
