# Decode — Ресёрч: UK BNPL / Consumer Credit Trap Catalogue (сырьё для Trap Detector)

Трек: market-bnpl. Дата ресёрча: 10 июня 2026. Все суммы и формулировки — из публичных T&C, help-центров провайдеров и исследований FCA / Citizens Advice / Centre for Financial Capability. Каждый существенный факт снабжён URL. Там, где данные не подтверждены первоисточником, это указано явно.

---

## 1. Регуляторный контекст на июнь 2026 — критично для Trap Detector

Это самый важный временной контекст для продукта: **15 июля 2026 года FCA начинает регулировать BNPL** (официально "Deferred Payment Credit", DPC). Мы находимся за ~5 недель до перелома, который меняет половину trap-каталога.

- FCA начинает регулировать DPC **с 15 июля 2026**; Temporary Permissions Regime для фирм без consumer-credit permissions открыт с 15 мая по 1 июля 2026 ([FCA: Buy Now Pay Later](https://www.fca.org.uk/consumers/buy-now-pay-later), [Hogan Lovells: BNPL final rules for 15 July 2026 go-live](https://www.hoganlovells.com/en/publications/bnpl-fca-publishes-final-rules-for-15-july-2026-golive)).
- **Section 75** Consumer Credit Act (совместная ответственность кредитора с продавцом, покупки >£100 и ≤£30,000) будет применяться к BNPL — но **ТОЛЬКО к новым договорам, заключённым с 15 июля 2026**. Покупки до этой даты не защищены ([MoneySavingExpert, февраль 2026](https://www.moneysavingexpert.com/news/2026/02/buy-now-pay-later-protection/)).
- Новые обязанности фирм: proportionate affordability checks перед каждым займом (включая <£50), ясное раскрытие графика платежей и последствий просрочки, немедленное уведомление о пропущенном платеже, доступ к **Financial Ombudsman Service** — тоже только для договоров с 15.07.2026 ([MSE](https://www.moneysavingexpert.com/news/2026/02/buy-now-pay-later-protection/), [FCA](https://www.fca.org.uk/consumers/buy-now-pay-later)).
- **Дыра в регулировании остаётся**: DPC регулируется, только если кредитор и продавец — разные бизнесы. Рассрочка, выданная самим продавцом (merchant-provided credit), остаётся вне регулирования ([FCA](https://www.fca.org.uk/consumers/buy-now-pay-later)).

**Масштаб рынка (FCA Financial Lives 2024):** 20% взрослых UK (10.9 млн) пользовались BNPL за 12 мес. к маю 2024 (в 2022 — 17% / 8.8 млн); 1.9 млн — частые пользователи (10+ раз/год); 1.1 млн взрослых имели £500+ непогашенного нерегулируемого BNPL-долга ([FCA FLS 2024 press release](https://www.fca.org.uk/news/press-releases/protections-help-buy-now-pay-later-borrowers-navigate-financial-lives), [FCA FLS 2024 Credit & loans PDF](https://www.fca.org.uk/publication/financial-lives/fls-2024-credit-loans.pdf)). Максимальное проникновение — 25–34 года (30%) и жители самых депривированных районов (29%).

---

## 2. Каталог trap types

Формат каждого: **где встречается → цена ошибки в £ → как формулируется в документе (для AI-распознавания) → заметка для Decode**.

### TRAP 1. Late fees в BNPL (просрочка инстолмента)

| Провайдер | Фи | Условия |
|---|---|---|
| **Klarna** (Pay in 3 / Pay in 30) | **£5** за просрочку | После 7-дневного grace period и минимум 4 напоминаний; cap: 25% от стоимости заказа; **не более 2 фи на заказ** (введено 16.03.2023) ([Which?](https://www.which.co.uk/news/article/klarna-to-start-charging-late-fees-an8Qt0V8K3O2), [MSE](https://www.moneysavingexpert.com/news/2023/02/klarna-introduces-late-payment-fees/)) |
| **Clearpay** (Pay in 4) | **£6 + £6** | Первый fee при пропуске due date, второй — если не оплачено через 7 дней; cap: меньшее из 25% цены заказа или **£24** ([Clearpay Terms of Service](https://www.clearpay.co.uk/en-gb/terms-of-service), [Clearpay Help](https://help.clearpay.co.uk/hc/en-gb/articles/360026686231-Why-have-I-been-charged-a-late-fee)) |
| **Zilch** | Нет late fee, но есть **Snooze fee £1.50** | Перенос платежа на 4 дня — бесплатно; дольше — £1.50 ([Finder UK Zilch review](https://www.finder.com/uk/buy-now-pay-later/zilch-review), [Zilch FAQ](https://www.zilch.com/faq/how-does-zilch-make-its-money/)) |
| **PayPal Pay in 3** | **Нет late fee и NSF fee от PayPal**, но банк может взять свой NSF fee | ([PayPal: If I pay late, will I be charged a fee?](https://www.paypal.com/uk/cshelp/article/if-i-pay-late-will-i-be-charged-a-fee-help1012)) |
| **Monzo Flex** | Нет late fee — но есть конверсия в 29% APR (см. TRAP 5) | ([Monzo Help](https://monzo.com/help/monzo-flex/missing-a-monzo-flex-payment)) |

- **Цена ошибки:** £5–£24 на заказ; по сектору — **£39 млн late fees за год** с UK-покупателей (Citizens Advice, исследование сентября 2021 — до введения фи Klarna, т.е. сейчас, вероятно, больше) ([Citizens Advice](https://www.citizensadvice.org.uk/about-us/media-centre/press-releases/one-in-10-buy-now-pay-later-shoppers-have-been-chased-by-debt-collectors/)).
- **Формулировки в документах:** Clearpay: *"We may charge a late fee of £6 if you do not pay an instalment under a Clearpay Plan by the due date and a second late fee of £6 if the instalment is still unpaid 7 days after the due date"*; *"The total late fees... are capped at 25% of the purchase price of the Order... or £24, whichever is less"*. Маркеры: `late fee`, `late payment fee`, `if the instalment is still unpaid X days after the due date`, `capped at 25%`.
- **Decode:** true-cost движок должен считать worst-case: цена + max late fees (например, заказ £80 в Clearpay → до £20 фи = +25%). Эффективная "ставка" late fee на маленьких заказах эквивалентна десяткам % годовых.

### TRAP 2. Credit file reporting (BNPL уже виден кредиторам — но неравномерно)

- **Klarna** репортит Pay in 3 / Pay in 30 в **Experian и TransUnion** (с июня 2022), Financing — давно; просрочки и неоплаченные покупки попадают в файл ([Money to the Masses](https://moneytothemasses.com/news/klarna-payments-to-be-included-on-credit-reports), [MoneyExpert](https://www.moneyexpert.com/news/klarna-to-report-payments-and-debt-to-credit-reference-agencies/)).
- **Zilch** — первый BNPL, репортящий во **все три CRA** (Experian, TransUnion, Equifax) с января 2023: лимит, остаток, статус платежей ([Wikipedia: Zilch](https://en.wikipedia.org/wiki/Zilch_(company)), [Finder](https://www.finder.com/uk/buy-now-pay-later/zilch-review)).
- **Clearpay** — рутинно **НЕ репортит**, только при эскалации в collections ([Checkmyfile / dfmb](https://dfmb.co.uk/articles/does-klarna-show-on-credit-file)).
- **PayPal Pay in 3** — делится историей платежей с CRA; маркетинговая формулировка "does not impact your credit score" маскирует то, что данные **видны другим кредиторам** и могут влиять на их решения ([Checkmyfile](https://www.checkmyfile.com/help-centre/articles/does-paypal-pay-in-3-affect-my-credit-score), [PayPal FAQ](https://www.paypal.com/uk/webapps/mpp/paypal-payin3/faq)).
- **Monzo Flex** — полноценный регулируемый продукт (credit card): просрочки уходят в CRA ([Monzo Help](https://monzo.com/help/monzo-flex/missing-a-monzo-flex-payment)).
- **Цена ошибки:** missed-payment marker живёт в файле **6 лет**; по данным кредитных сервисов одна просрочка может срезать скор на ~50–100 пунктов (ориентир, не нормативная величина) ([Experian UK](https://www.experian.co.uk/consumer/guides/late-payments.html), [Zable](https://zable.co.uk/credit-score/how-long-do-missed-payments-stay-on-credit-report)). Косвенная цена — отказ или худшая ставка по ипотеке ([Online Mortgage Advisor](https://www.onlinemortgageadvisor.co.uk/credit-reports/remove-missed-payments/)).
- **Формулировки:** `we may share information about you and the conduct of your account with credit reference agencies`, `report... as overdue to the credit reference agencies, which could affect your credit rating` (Klarna Credit Card, [klarna.com](https://www.klarna.com/uk/customer-service/what-happens-if-i-cant-pay-on-time/)).
- **Decode:** для каждого документа показывать бинарный флаг "Goes on your credit file: YES/NO/only if collections" — это реально различается между провайдерами и пользователи этого не знают.

### TRAP 3. Нет Section 75 protection (до 15.07.2026 — и навсегда для merchant-credit)

- BNPL-покупка разрывает прямую связь "покупатель–продавец": платишь платформе, а не продавцу, поэтому Section 75 не действует; остаётся только chargeback по карте, которой платил BNPL-провайдеру (не право, а схема Visa/Mastercard/Amex, дедлайн ~120 дней) ([MSE Section 75 guide](https://www.moneysavingexpert.com/reclaim/section75-protect-your-purchases/), [MoneyHelper](https://www.moneyhelper.org.uk/en/everyday-money/credit/how-youre-protected-when-you-pay-by-card)).
- С 15.07.2026 Section 75 (>£100, ≤£30,000) появится для **новых** регулируемых DPC-договоров ([MSE](https://www.moneysavingexpert.com/news/2026/02/buy-now-pay-later-protection/)). Старые договоры и рассрочка от самого магазина — без защиты.
- **Цена ошибки:** при банкротстве ритейлера / недоставке дорогого товара — полная стоимость покупки (£100–£30,000).
- **Формулировка-маркер (золотая для AI):** PayPal прямо пишет: *"Pay in 3 is a form of unregulated credit, so you will have fewer protections under this agreement than you would under a regulated credit agreement"* ([PayPal Pay in 3 FAQ](https://www.paypal.com/uk/webapps/mpp/paypal-payin3/faq)). Маркеры: `unregulated credit`, `fewer protections`, `not regulated by the Financial Conduct Authority`, `exempt agreement`.
- **Decode:** trap detector должен проверять дату договора (до/после 15.07.2026) и кто кредитор (third-party vs сам ритейлер) — от этого зависит, есть ли s75 и доступ к Ombudsman.

### TRAP 4. Deferred / backdated interest ("Buy Now Pay Later" планы store cards и каталогов)

- Классика Argos Card / каталожного кредита (Very и т.п.): 3–12-месячный план, интерес **начисляется с даты покупки, но "заморожен"**; если не погасить ПОЛНОСТЬЮ до конца промо-периода — весь интерес **задним числом с даты покупки** добавляется к долгу. У Argos ставка в источниках — 29.9–34.9% APR ([Argos Help: BNPL plan ends](https://help.argos.co.uk/help/payment/i-set-up-a-buy-now-pay-later-plan-before-my-account-was-updated-to-argos-pay-what-happens-when-the-buy-now-pay-later-period-ends), [Habitat/Argos Card A-Z](https://www.habitat.co.uk/help/argos-card/a-to-z), [Which? об Argos](https://www.which.co.uk/news/article/argos-scraps-6-month-interest-free-payment-option-aOUfO8U6kcpv)).
- **Цена ошибки (иллюстрация):** товар £600 на 12-месячном плане под 34.9% APR, не погашен на £1 к концу периода → начисляется ~£150–200 backdated interest за весь год. Недоплата даже маленького остатка триггерит интерес на всю исходную сумму.
- **Формулировки:** `interest will be charged from the date of purchase`, `deferred interest`, `if you do not pay the full cash price before the end of the plan`, `interest is calculated from the transaction date`, `pay later period`.
- **Decode:** это анти-паттерн №1 для true-cost движка: показать "если погасите вовремя: £0 интереса; если останется хотя бы £1: +£X задним числом". Самый высокий ratio "невинная формулировка / реальный ущерб".

### TRAP 5. Interest-free, который конвертируется в interest-bearing (Monzo Flex)

- Monzo Flex: 3 инстолмента — 0%, 6/12 — 29% APR repr. (variable), до 24 мес. Ловушка: при пропуске платежа — *"If you haven't caught up within 7 days, we'll try to take a smaller amount (your minimum payment) by switching 3, 6 or 12 monthly payments to 24 monthly payments at 29% APR representative (variable)"* — т.е. **беспроцентная покупка принудительно становится 24-месячным кредитом под 29%** ([Monzo Help, точная цитата](https://monzo.com/help/monzo-flex/missing-a-monzo-flex-payment), [Monzo Flex](https://monzo.com/flex)).
- Также: *"We don't charge extra fees if you're late"* + *"we'll let the credit reference agencies know that you're behind"* — "no late fees" в маркетинге ≠ нет последствий.
- **Klarna Financing** (6–36 мес.): representative APR **21.9% fixed**; representative example: £1,000 на 24 мес. → £52/мес., total £1,248 (+£248) ([Klarna UK payments](https://www.klarna.com/uk/payments/), [Stripe support: Klarna Financing UK](https://support.stripe.com/questions/klarna-financing-for-uk-customers?locale=en-GB)).
- **Формулировки:** `switching ... to 24 monthly payments at 29% APR`, `your instalment plan will be changed`, `we may convert your plan`.
- **Decode:** worst-case сценарий для каждого 0%-плана: "что произойдёт с этой покупкой, если вы пропустите 1 платёж".

### TRAP 6. Representative APR — что скрывает слово "representative" (правило 51%)

- По FCA Handbook (CONC / glossary) representative APR — ставка, которую фирма ожидает дать **минимум 51%** клиентов, пришедших по этой рекламе ([FCA Handbook glossary G3354](https://handbook.fca.org.uk/handbook/glossary/G3354.html), [CONC 3.5](https://handbook.fca.org.uk/handbook/CONC/3/5.html)).
- До **49% одобренных** могут получить ставку выше — иногда сильно выше; FCA сама признаёт, что раскрытие representative APR "could be misleading" и обсуждает повышение порога до 66% или обязательное раскрытие максимальной ставки ([Freshfields о консультации FCA](https://www.freshfields.com/en/our-thinking/blogs/risk-and-compliance/a-continued-tale-of-outcomes-based-regulation-fca-consults-on-simplifying-financ-102ms4l), [Compare the Market](https://www.comparethemarket.com/loans/content/representative-vs-guaranteed-apr/)).
- Якорные цифры рынка: средний UK credit card APR ~36.8% (май 2026, с учётом fees; ставка на балансы ~27%) ([NimbleFins](https://www.nimblefins.co.uk/average-credit-card-interest-rate-apr-uk), [Finder](https://www.finder.com/uk/credit-cards/average-credit-card-interest-rate-apr-uk)); store cards — 30–40%; **Frasers Plus T&C: representative APR 39.9%** ([Frasers Plus T&C PDF](https://cdn.tymit.com/media/Frasers_Plus_Terms_and_Conditions_e81d0ec6a2.pdf)).
- **Формулировки:** `Representative APR 39.9% (variable)`, `Representative example:`, `Your rate may differ`, `rate offered depends on your circumstances`.
- **Decode:** глоссарий-подсказка: "Representative = только 51% получат эту ставку. Ваша может быть выше — проверьте precontract information (SECCI), там ваша персональная ставка".

### TRAP 7. Default charges по credit cards / store cards (£12)

- Стандартный late payment fee по UK кредиткам — **£12**: порог, выше которого OFT с 2006 считает default charge несправедливым; фи выше £12 можно reclaim за 6 лет ([Wikipedia: UK default charges controversy](https://en.wikipedia.org/wiki/UK_default_charges_controversy), [OFT report PDF](https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/284445/oft842.pdf), [money.co.uk](https://www.money.co.uk/guides/how-to-reclaim-your-credit-card-charges)).
- **Формулировки:** `default charge`, `late payment fee of £12`, `returned payment fee`, `overlimit fee`.
- **Decode:** £12 — бенчмарк: всё, что выше, — само по себе red flag (potentially unenforceable).

### TRAP 8. Потеря 0% promo rate при просрочке (0% purchase / balance transfer cards)

- Типовое условие UK 0%-карт: при пропуске платежа промо-ставка может быть отозвана, баланс начинает начисляться по стандартной ставке (~25–35%); BT-карты дополнительно берут **balance transfer fee 3–5%** ([Lloyds Bank: 0% credit cards explained](https://www.lloydsbank.com/credit-cards/help-and-guidance/0-percent-credit-cards-explained.html); конкретные проценты fee — из обзорных источников, точное условие зависит от карты).
- **Формулировки:** `we may withdraw your promotional rate if you miss a payment`, `if you do not make your minimum payment... the promotional rate will end`, `balance transfer fee of 3%`.
- **Decode:** при сканировании 0%-оффера выделять: (1) когда кончается промо; (2) условие потери промо; (3) go-to rate после промо. Это и есть "interest after promo period" для wedge.

### TRAP 9. Minimum payment / persistent debt

- Минимальный платёж часто = 1% баланса + интерес; погашение в таком режиме растягивается на 20+ лет, большая часть платежа — интерес ([Debt Camel](https://debtcamel.co.uk/credit-card-minimum-payment/)).
- FCA: **~4 млн счетов в persistent debt** (за 18 мес. уплачено больше интереса и charges, чем тела долга); правила 18/27/36 месяцев; оценка экономии для потребителей от правил — **£310 млн–£1.3 млрд в год** ([UK Finance: FCA persistent debt FAQ](https://www.ukfinance.org.uk/our-expertise/cards/financial-conduct-authority-fca-rules-persistent-credit-card-debt-36-months-actions-frequently), [Barclaycard](https://www.barclaycard.co.uk/personal/customer/persistent-debt)).
- **Формулировки:** `minimum payment`, `1% of your balance plus interest`, `persistent debt`, `if you only make the minimum payment, it will take you longer and cost you more`(обязательный warning в statements).
- **Decode:** калькулятор "minimum-only vs fixed payment": срок и переплата в £ — высокоэмоциональная, легко считаемая детерминированная фича.

### TRAP 10. Continuous Payment Authority — автосписания с любой карты на счету

- Clearpay ToS (точные цитаты): *"you authorise us to automatically deduct payments from your payment method... under a CPA"*; при фейле — *"we may take payment from another payment method listed on your account. We may make multiple attempts on each payment method listed on your account at any time"* ([Clearpay Terms of Service](https://www.clearpay.co.uk/en-gb/terms-of-service)).
- Klarna: при фейле инстолмента сумма **добавляется к следующему платежу** (платёж удваивается): *"the amount due for the missed payment will be added to the next scheduled payment"* ([Klarna UK](https://www.klarna.com/uk/customer-service/what-happens-if-i-cant-pay-on-time/)).
- **Цена ошибки:** непредвиденное списание → unarranged overdraft в банке; "сдвоенный" платёж ломает бюджет следующего месяца.
- **Формулировки:** `continuous payment authority`, `CPA`, `automatically deduct`, `we may make multiple attempts`, `any payment method listed on your account`.
- **Decode:** Renewal Radar должен предупреждать не только о дате, но и о **сумме списания** (включая удвоенные платежи после фейла) и с какой карты.

### TRAP 11. Debt collection referral (без предупреждения на checkout)

- Citizens Advice (2021): **1 из 10** BNPL-покупателей передавался коллекторам (1 из 8 среди молодых); **ни один** из проверенных BNPL-чекаутов ведущих ритейлеров не предупреждал об этом; только 11% сайтов предупреждали, что это кредитный договор; 96% столкнувшихся с коллекторами отметили негативные последствия ([Citizens Advice press release](https://www.citizensadvice.org.uk/about-us/media-centre/press-releases/one-in-10-buy-now-pay-later-shoppers-have-been-chased-by-debt-collectors/)).
- Klarna, Clearpay, Laybuy, Openpay подтвердили использование коллекторов "as a last resort" (там же). Klarna с 2023 предлагает списать 50% долга вместо передачи коллекторам ([Klarna press](https://www.klarna.com/international/press/klarna-launches-customer-first-late-payments-programme-and-financial-support-package-for-those-who-fall-behind/)).
- **Формулировки:** `we may use a debt collection agency to recover amounts owing`, `passed to a debt recovery agency`, `referred to a third party collections agency`.
- **Decode:** trap detector: "This agreement allows referral to debt collectors" — формулировка всегда есть в T&C, но никогда на checkout. Decode закрывает именно этот information gap.

### TRAP 12. Early settlement: до 58 дней лишнего интереса (регулируемые займы)

- По Consumer Credit (Early Settlement) Regulations 2004 кредитор при досрочном погашении вправе рассчитать rebate так, будто settlement date наступает на **28 дней позже** уведомления, +30 дней для договоров длиннее 12 месяцев — итого до ~58 дней лишнего интереса ([legislation.gov.uk SI 2004/1483](https://www.legislation.gov.uk/uksi/2004/1483/schedules/made), [Creative Funding Solutions: Early Settlement PDF](https://creativefundingsolutions.co.uk/wp-content/uploads/2025/06/Early-Settlement.pdf)).
- **Цена ошибки:** на остатке £12,000 под ~10.9% — порядка **£210** дополнительного интереса (расчётный пример из отраслевого источника выше).
- **Формулировки:** `settlement figure`, `rebate on early settlement`, `your settlement date will be 28 days after`, `we will charge up to 58 days' interest`.
- **Decode:** при сканировании loan agreement показывать "early repayment is allowed, but expect up to ~2 months' extra interest in the settlement figure".

### TRAP 13. Автопродления (adjacent wedge: insurance / subscriptions)

- **Insurance:** с 1 января 2022 FCA запретила "price walking" (renewal-цена не выше цены для нового клиента) и обязала делать отказ от auto-renewal лёгким; до запрета 6 млн полисодержателей переплачивали — £1.2 млрд за 2018; оценка экономии — £4.2 млрд за 10 лет ([FCA press release](https://www.fca.org.uk/news/press-releases/fca-confirms-measures-protect-customers-loyalty-penalty-home-motor-insurance-markets)). Auto-renewal сам по себе легален и включён по умолчанию — ловушка в пассивном продлении без шопинга.
- **Subscriptions:** новый режим DMCC Act (reminder notices, двойной 14-дневный cooling-off, easy exit) отложен — **не раньше осени 2026** ([Hogan Lovells](https://www.hoganlovells.com/en/publications/uk-subscription-law-shakeup-new-rules-pushed-to-autumn-2026), [Travers Smith](https://www.traverssmith.com/knowledge/knowledge-container/the-uks-new-subscription-contracts-regime-what-when-and-why/)). До этого "subscription traps" живут.
- **Формулировки:** `your policy will automatically renew`, `unless you tell us otherwise`, `we will continue to charge the payment method on file`, `renews for a further 12 months`.
- **Decode:** Renewal Radar — за 3–4 недели до renewal date пуш "shop around now"; для подписок — дата следующего списания + как отменить.

### TRAP 14. "Звёздочки" на маленьких заказах: эффективные пени в % годовых

- Производный инсайт из caps: у Klarna на заказах **до £30** late fee = до 25% стоимости (а не £5); у Clearpay на заказах до £24 — £6 (тоже 25%+) ([MSE](https://www.moneysavingexpert.com/news/2023/02/klarna-introduces-late-payment-fees/), [Clearpay ToS](https://www.clearpay.co.uk/en-gb/terms-of-service)). 25% за 2–4 недели просрочки — эквивалент сотен % годовых.
- **Decode:** true-cost движок должен показывать late fee как % от заказа, а не только в £.

---

## 3. Сводная таблица провайдеров (состояние на июнь 2026)

| Провайдер | Late fee | Репортинг в CRA | Интерес | Section 75 (сейчас) | Коллекторы |
|---|---|---|---|---|---|
| Klarna Pay in 3/30 | £5, cap 25%/заказ, max 2 | Experian + TransUnion | 0% | Нет (до 15.07.2026) | Да |
| Klarna Financing | — | Да (давно) | 21.9% repr. fixed, 6–36 мес. | Да (регулируемый) | Да |
| Clearpay | £6+£6, cap min(25%, £24) | Нет (только collections) | 0% | Нет (до 15.07.2026) | Да |
| Zilch | Нет; Snooze £1.50 | Все 3 CRA | 0% | Нет (до 15.07.2026) | Да |
| PayPal Pay in 3 | Нет (но банковский NSF) | Делится историей с CRA | 0% | Нет; сам пишет "unregulated credit" | Да |
| Monzo Flex | Нет; конверсия в 24 мес. @29% APR | Да (полный) | 0% (3 мес.) / 29% repr. | Да (credit card) | Да |
| Store cards (Argos/Frasers Plus/каталоги) | ~£12 default charge | Да | 29.9–39.9% repr.; deferred interest задним числом | Да (регулируемые) | Да |

---

## 4. Pattern library: формулировки для AI-распознавания

Фразы-триггеры (как встречаются в реальных документах), сгруппированные по trap type — прямое сырьё для few-shot промптов / классификатора:

- **Late fees:** `late fee`, `late payment fee`, `a further £6 late fee will apply`, `capped at 25% of the purchase price`, `no more than two fees per order`
- **Deferred interest:** `interest will be charged from the date of purchase`, `deferred interest`, `if you do not pay the full cash price before the end of the payment-free period`
- **Конверсия 0%→%:** `switching 3, 6 or 12 monthly payments to 24 monthly payments at 29% APR`
- **Representative APR:** `Representative APR ... (variable)`, `Representative example`, `the rate you are offered will depend on your individual circumstances`
- **Нерегулируемость / нет s75:** `unregulated credit`, `fewer protections than ... a regulated credit agreement`, `not regulated by the Financial Conduct Authority`, `exempt agreement`
- **CPA / автосписания:** `continuous payment authority`, `automatically deduct payments from your payment method`, `we may make multiple attempts on each payment method`
- **Кредитная история:** `share information ... with credit reference agencies`, `report ... as overdue to the credit reference agencies`, `may affect your credit rating / credit score`
- **Коллекторы:** `debt collection agency`, `debt recovery agency`, `recover amounts owing`
- **Потеря промо:** `we may withdraw your promotional rate`, `promotional rate will end if you miss a payment`
- **Min payment:** `minimum payment`, `if you only make the minimum payment it will take longer and cost more`
- **Early settlement:** `settlement figure`, `rebate`, `58 days`, `28 days after the date we receive your notice`
- **Автопродление:** `automatically renew`, `unless you cancel`, `renews for a further period`

---

## 5. Статистика потерь UK-потребителей (для лендинга, питча и severity-скоринга)

- **£39 млн** late fees, заплаченных BNPL-пользователями за год (Citizens Advice, 2021) ([источник](https://www.citizensadvice.org.uk/about-us/media-centre/press-releases/one-in-10-buy-now-pay-later-shoppers-have-been-chased-by-debt-collectors/))
- **1 из 10** BNPL-покупателей передан коллекторам; **89%** ритейл-сайтов прячут факт кредитного договора в мелкий шрифт (там же)
- **22%** BNPL-пользователей пропустили ≥1 платёж за 6 мес. к декабрю 2023; **34%** в 18–24 платили late fees — больше всех возрастных групп (Centre for Financial Capability via [PYMNTS](https://www.pymnts.com/buy-now-pay-later/2024/report-25-of-uk-bnpl-users-hit-with-late-fees/), [Retail Insight Network](https://www.retail-insight-network.com/news/uk-bnpl-users-repayment-fees/))
- **29%** не знают, что BNPL — это заимствование; **51%** в 18–24 не знают, что BNPL может привести к долгу (Creditspring via [Credit Connect](https://www.credit-connect.co.uk/news/consumer-collections/nearly-half-of-young-people-unaware-of-bnpl-debt-potential/))
- **10.9 млн** взрослых UK пользовались BNPL за год; **1.1 млн** должны £500+ ([FCA FLS 2024](https://www.fca.org.uk/news/press-releases/protections-help-buy-now-pay-later-borrowers-navigate-financial-lives))
- **~4 млн** карточных счетов в persistent debt; правила FCA экономят потребителям **£310 млн–£1.3 млрд/год** ([UK Finance](https://www.ukfinance.org.uk/our-expertise/cards/financial-conduct-authority-fca-rules-persistent-credit-card-debt-36-months-actions-frequently))
- Loyalty penalty в страховании до запрета: **£1.2 млрд/год** переплаты 6 млн полисодержателей; экономия от GIPP-правил **£4.2 млрд за 10 лет** ([FCA](https://www.fca.org.uk/news/press-releases/fca-confirms-measures-protect-customers-loyalty-penalty-home-motor-insurance-markets))

Не найдено: свежая (2025–2026) агрегированная цифра суммарных BNPL late fees по UK взамен £39 млн 2021 года; Which?-специфичное исследование "BNPL users don't think of it as borrowing" (ближайший аналог — Creditspring выше).

---

## 6. Key takeaways for Decode

1. **15 июля 2026 — встроить в логику продукта.** Trap detector должен датировать договор и определять кредитора: "agreement before 15 Jul 2026 → no Section 75, no Ombudsman"; "merchant-provided instalments → unregulated даже после". Это автоматически делает Decode актуальнее статичных гайдов — и это готовый момент для запуска/PR.
2. **Trap detector = таблица правил, не магия.** Каталог из 14 trap types выше покрывает wedge почти детерминированно: late fee (сумма/cap), CRA reporting (да/нет/только collections), deferred interest, конверсия 0%→29%, representative APR, CPA, debt collection clause. AI нужен для извлечения и матчинга формулировок (раздел 4 — готовый pattern library для промптов), а severity и £-расчёты — детерминированный движок.
3. **True cost = worst-case сценарии в £.** Три обязательных расчёта: (а) late-fee worst case (Klarna: +£10, Clearpay: +£24, и в % от заказа); (б) deferred interest "если недоплатите £1 — +£X задним числом по 34.9%"; (в) Monzo-style конверсия "пропуск 1 платежа → этот 0%-план станет 24 мес. под 29% = +£Y". Числа маленькие, но шок-эффект от (б) и (в) — основной wow-момент.
4. **Главный information gap — не цифры, а молчание checkout'а.** 89% сайтов прячут кредитную природу BNPL, 0% чекаутов предупреждают о коллекторах, "no late fees" (PayPal/Monzo) маскирует CRA-репортинг и конверсию ставки. Decode-фрейминг для каждого трапа: "что вам не сказали на checkout".
5. **Credit file flag — самая дифференцирующая микрофича.** Один и тот же "Pay in 3" у Klarna идёт в Experian/TransUnion, у Clearpay — нет, у Zilch — во все 3 CRA. Бинарный бейдж "Видно ли это будущему ипотечному кредитору" не делает никто; данные для него собраны в TRAP 2.
6. **Renewal Radar — не только даты, но и суммы.** CPA-ловушка (TRAP 10): после фейла платёж удваивается и может списаться с любой карты на счету. Радар должен показывать next debit: дата + сумма + источник; для insurance — "shop around" за месяц до renewal (price walking запрещён, но пассивное продление всё ещё дороже).
7. **Severity-скоринг трапов для UI:** HIGH = deferred interest, конверсия 0%→29%, debt collection, CRA reporting; MEDIUM = late fees, потеря промо-ставки, CPA; LOW/INFO = representative APR, early settlement 58 days. Это даёт готовую логику для красный/жёлтый/серый флагов в wireframes.
8. **Стат-пакет для лендинга и питча:** "UK shoppers paid £39m in BNPL late fees in a year"; "1 in 10 BNPL users chased by debt collectors"; "51% of 18–24s don't know BNPL can lead to debt"; "10.9m UK adults use BNPL". Целевая аудитория wedge подтверждается данными FCA: 25–34, частые пользователи, низкая financial resilience.
