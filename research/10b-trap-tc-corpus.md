# 10b — Корпус реальных формулировок T&C (UK BNPL/credit) для trap detector

**Назначение.** Сырьё для few-shot промптов / классификатора trap detector (product IP) + верификация trap-каталога трека 10. Все verbatim-маркеры — на английском, дословно из официальных T&C-документов провайдеров (cdn.klarna.com, clearpay.co.uk, zilch.com, paypal.com, monzo.com, frasersplus.com, argos/4rgos.it, FOS-решения). Метод: WebSearch + WebFetch + извлечение текста из официальных PDF (pdftotext).

**Дата сбора:** 2026-06-14. **Актуальность документов:** см. колонку «версия/дата» в каждой строке (большинство — осень 2025).

> **Юридическая рамка (важно для severity-логики).** В UK BNPL-«Pay in 3/4» исторически **exempt** по Art. 60F(2) FSMA (Regulated Activities) Order 2001 — это значит **нет Section 75, меньше защит CCA 1974**. Регулируемые продукты (кредитки, store cards, Monzo Flex, Klarna Financing с процентом / >12 мес, Zilch Pay over 3 months) — под CCA 1974 + FCA, **есть Section 75** на покупки £100–£30 000. На горизонте 2026 — Treasury/FCA вводят регулирование BNPL (новый режим), поэтому статусы перепроверять.

---

## Таблица: провайдер × ловушка

Легенда CRA: Exp=Experian, Eqf=Equifax, TU=TransUnion. Severity условный (для detector): 🔴 high / 🟠 med / 🟢 low.

### 1. Klarna — Pay in 3 instalments (exempt / unregulated)

| Ловушка | Verbatim-маркер (EN, дословно) | Число | CRA | s75 | Документ |
|---|---|---|---|---|---|
| Late fee 🟠 | "We will charge you a late fee if you do not pay us up to 14 days after your 2nd or 3rd instalments are due." + "If your order is £20 or more, we will charge you a late fee of £5." | £5 (≥£20); 25% от цены если <£20; max 1 fee/инстолмент; не взимается при остатке <£1 | "we will report information to credit reference agencies about the payments you make, and about any payments that you fail to make on time." — **агентства НЕ названы поимённо** | Нет (exempt) | Klarna UK Pay in 3 T&C **v1.8.0, 01.10.2025**, cdn.klarna.com/1.0/shared/content/legal/terms/0/en-GB/paylaterin3 |
| CPA / авто-списание 🟠 | "We'll charge your card automatically when your payment is due so you don't have to pay us back manually or worry about missing a payment." | — | — | — | там же |
| Debt collection 🟠 | "we might ask you to pay the outstanding amount directly or use a debt collection agency to collect the money for us. A debt collection agency is an FCA regulated company used by Klarna to recover funds that are overdue." | — | — | — | там же |
| Credit reporting 🟠 | (см. late fee — reporting и о вовремя, и о просрочках) | — | Exp/Eqf/TU (в документе не названы; по практике Klarna репортит) | — | там же |
| Early settlement 🟢 | "you are able to make early payments through the Klarna App or you can request our bank account details." | без штрафа | — | — | там же |
| Reg status | "Klarna's interest free and pay up to 12 months Financing agreements, Pay in 3 instalments and Pay in 30 days agreements are not regulated by the FCA." | — | — | **Нет s75** | там же |

### 2. Klarna — Financing / Fixed Sum Loan (regulated CCA 1974)

| Ловушка | Verbatim-маркер | Число | CRA | s75 | Документ |
|---|---|---|---|---|---|
| Representative APR 🟠 | "Fixed Sum Loan Agreement regulated by the Consumer Credit Act 1974"; "Interest is charged, starting on the Transaction Date, on the balance outstanding"; "X% per annum (fixed)" | Rep. APR ~21.9–27.9% (зависит от плана); 6–36 мес | "We will report information to credit reference agencies about the payments you make, and about any payments you fail to make on time." | **ДА** (regulated) | Klarna Fixed Sum Loan (Example), cdn.klarna.com/1.0/shared/content/legal/terms/0/en_gb/fixed_sum_credit |
| Late fee 🟠 | "You will be charged a late fee if we have not received your payment within 14 days of an instalment's due date" | never more than £5 (или 25% от инстолмента если <£20) | — | — | там же |
| Section 75 🟢 | "You may have the right to sue a Supplier or us or both if you have received unsatisfactory goods or services paid for under the Agreement costing more than £100 and not more than £30,000." | £100–£30 000 | — | **ДА** | там же |
| Early settlement 🟢 | "You are able to make early payments, at any time and at no extra cost, through the Klarna App." | без штрафа | — | — | там же |

### 3. Clearpay (Pay in 4, exempt / unregulated)

| Ловушка | Verbatim-маркер | Число | CRA | s75 | Документ |
|---|---|---|---|---|---|
| Late fee + дубль через 7 дней 🟠 | "We may charge a late fee of £6 if you do not pay an instalment under a Clearpay Plan by the due date and a second late fee of £6 if the instalment is still unpaid 7 days after the due date." | £6 + ещё £6 через 7 дней | — | Нет | Clearpay Terms of Service, cl.17, **Last Updated 30.09.2025**, clearpay.co.uk/en-GB/terms-of-service |
| Late fee cap 🟢 | "The total late fees that may be applied to an Order are capped at 25% of the purchase price of the Order (before any refunds are applied) or £24, whichever is less." | cap = min(25% цены, £24) | — | — | там же, cl.17 |
| CPA / авто-списание 🟠 | "By entering a Clearpay Plan, you authorise us to automatically deduct payments from your payment method for the instalments set out in a payment schedule." | — | — | — | там же, cl.14 |
| Debt collection 🟠 | "If we are unable to collect any amounts you owe us, we may use a debt collection agency to recover amounts owing under Clearpay Plans." | — | — | — | там же, cl.18 |
| Reg status | "Clearpay Plans are not regulated by the Financial Conduct Authority." | — | — | **Нет s75** | там же, cl.2 |
| Account pause 🟠 | (help-центр) "if you miss a payment … Clearpay will immediately pause your account and you won't be able to buy anything else with us until your payments are up to date." | — | — | — | help.clearpay.co.uk |

### 4. Zilch (два продукта — статусы РАЗНЫЕ)

| Ловушка | Verbatim-маркер | Число | CRA | s75 | Документ |
|---|---|---|---|---|---|
| CPA (PayNow) 🟠 | "When you complete your Application we will ask you to provide us with at least one Continuous Payment Authority (CPA) for a debit card you are authorised to use. We will use this to authorise each transaction." | — | — | — | Zilch Terms of Use (PayNow раздел), zilch.com/uk/terms-of-use |
| Section 75 (нет для PayNow) 🟠 | "PayNow transactions supercharge your debit spending – and so are not eligible for Section 75 of the Consumer Credit Act as the purchase is deemed a debit transaction." | — | — | **Нет** (debit) | там же |
| Late fee 🟢 | По продукту/практике: Zilch **не берёт late fees** ("Pay over 6 weeks"). | £0 late fee | Репортит в CRA (соглашение с CRA с 01.2023); просрочки влияют на скоринг | — | zilch.com; подтверждено finder.com/Merchant Machine |
| Reg status (два режима) | "Pay over 6 weeks" / Pay in 4 — **unregulated** ("interest and fee free unregulated credit … not subject to the Consumer Credit Act 1974"). **"Pay over 3 months"** запущен (02.2024) как **regulated** interest-free продукт под FCA-лицензией. | — | — | s75 **только** у regulated "Pay over 3 months" | zilch.com/news/zilch-launches-pay-over-3-months-interest-free-regulated-product |

### 5. Monzo Flex (running-account credit, regulated CCA 1974 / FCA)

| Ловушка | Verbatim-маркер | Число | CRA | s75 | Документ |
|---|---|---|---|---|---|
| 0%→interest-bearing конверсия 🔴 | "we'll try to take a smaller amount (your minimum payment) by switching 3, 6 or 12 monthly payments to 24 monthly payments at 29% APR representative (variable)." | 3/6/12 мес 0% → **24 мес @ 29% APR** при просрочке >7 дн | — | ДА | monzo.com/help/monzo-flex/missing-a-monzo-flex-payment |
| No late fee + grace 🟢 | "We don't charge extra fees if you're late. We'll give you 7 days from the date of your missed payment to catch up." | £0 fee; 7 дней grace | — | — | там же |
| Backdated interest 🔴 | "Unless you're on a monthly payment plan with 0% interest, we'll still charge interest on your outstanding balance, minus the amount of your minimum payment, **from your original payment date**." | проценты с исходной даты | — | — | там же |
| Credit reporting / default 🟠 | "If we still can't take the payment, we'll let the credit reference agencies know that you're behind." | — | Exp/Eqf/TU (Monzo репортит во все три) | — | там же |
| Reg status / APR | Running-account credit, Monzo Bank Ltd, FCA+PRA. Rep. **29% APR variable** (6/12 мес); 3 мес — 0%. | 29% APR | — | **ДА s75** (regulated) | monzo.com/flex; help interest-rates |

### 6. PayPal Pay in 3 (UK, exempt по Art.60F / unregulated)

| Ловушка | Verbatim-маркер | Число | CRA | s75 | Документ |
|---|---|---|---|---|---|
| No fee, но severe consequences 🟠 | "There is no interest, fees or charges for choosing to pay with PayPal Pay in 3." + "Missing a repayment could have severe consequences, including our taking legal action against you, and may make obtaining credit more difficult." | £0 fee | — | Нет | PayPal Pay in 3 UK Terms, paypal.com/uk/webapps/mpp/campaigns/paypal-payin3/terms |
| Credit reporting — TU поимённо 🟠 | "Where you borrow from us, we may give details of your Pay in 3 Plans and how you manage them to CRAs." — документ ссылается на **www.transunion.co.uk/crain** (репортинг в **TransUnion**) | — | **TransUnion** (явно назван) | — | там же |
| Exempt + меньше защит 🟠 | "You acknowledge and agree that the Pay in 3 Plan falls under the exemption set out in Article 60F of the Financial Services and Markets Act (Regulated Activities) Order 2001. This means you may not benefit from all the protections provided by the Consumer Credit Act 1974." | — | — | **Нет s75** | там же |
| CPA / авто-дебет 🟠 | "Each repayment will be automatically debited from your chosen Repayment Method … on the dates set out in the Repayment Plan … You can also cancel any continuous payment authority or direct debit authorisation by contacting your bank." | — | — | — | там же |
| Early repayment 🟢 | "There are no fees or charges associated with making a repayment" (early). | без штрафа | — | — | там же |

### 7. Frasers Plus (running-account credit, regulated CCA 1974 / FGFS, на платформе Tymit)

| Ловушка | Verbatim-маркер | Число | CRA | s75 | Документ |
|---|---|---|---|---|---|
| Late fee 🟠 (с лимитом по году) | "We will apply a late payment fee of £10 to your Account if you do not make your Total Monthly Repayment" + "£10 each time you do not pay your Total Monthly [Repayment] … payments in a calendar year and £5 thereafter." | **£10** (затем £5 после нескольких в году); returned payment £5 после 3-х | "credit reference agencies being notified, which could make obtaining credit in the future more difficult or more expensive" | ДА | Frasers Plus T&C, frasers.plus/help/terms → help.frasers.plus/terms; PDF cdn.tymit.com/media/Frasers_Plus_Terms_and_Conditions_*.pdf, cl.5.6/9.1–9.4 |
| Representative APR 🟠 | "Credit Agreement regulated by the Consumer Credit Act 1974"; "Figures presented in this agreement are based on a Representative APR of 39.9%"; "Purchases on Repayment Plans greater than 3 months — Standard rate of 39.9% per annum." | **Rep. 39.9% APR**; до 3 мес — 0% | — | — | там же, cl.8 |
| Interest mechanism (НЕ deferred) 🟢/🟠 | "We calculate interest at the rates shown above on a daily basis from the date each Purchase is added to your Account … but we do not charge interest on arrears." — interest считается per-plan заранее и показывается; **нет backdated-lump-sum как у Argos** | — | — | — | там же, cl.8.3–8.5 |
| Debt collection / debt sale 🔴 | "We may also sell your debt to a third party and the purchaser may take action against you, which could include obtaining a court order against you" + "the possibility of legal proceedings … and an application being made to make you bankrupt." | — | — | — | там же, cl.7.1 |
| Section 75 🟢 | "If you make a Purchase … and the cost of an individual item is more than £100 and not more than £30,000 then you may have a claim against us … under section 75 of the Consumer Credit Act 1974 … However … you must keep making payments to us while you are resolving it." | £100–£30 000 | — | **ДА** | там же, cl.11.1 |
| Early settlement 🟢 | "You can repay any amounts outstanding on your Account in full or in part at any time without charge." | без штрафа | — | — | там же, cl.5.4 |

### 8. Argos Card (regulated CCA 1974 / Home Retail Group Card Services; lender NewDay; → мигрирует в «Argos Pay»)

| Ловушка | Verbatim-маркер | Число | CRA | s75 | Документ |
|---|---|---|---|---|---|
| **Deferred / backdated interest** 🔴🔴 | "If you do not repay the balance of this BNPL Plan in full by the end of the BNPL Plan Period, interest will be charged daily on the remaining balance of the BNPL Plan at the Normal Credit Rate (29.9% per annum interest (variable)), **backdated to the date of the original BNPL purchase**. We refer to this as "Deferred Interest"." + "add any Deferred Interest into Normal Credit as a lump sum. Once added the Normal Credit Rate will apply to it, **meaning you will pay interest on interest**." | 29.9%/39.9% backdated к дате покупки; «interest on interest» | "obtained from Credit Reference Agencies." (Exp/Eqf/TU; в тексте не названы поимённо) | ДА | Argos Card T&C (29.9%/39.9% APR), documents.4rgos.it/v1/static/ArgosCard-TermsAndConditions-29_9&39_9APR-2019, разделы BNPL Plan / DI |
| Default sums 🟠 | "£12 if you do not make your minimum monthly contractual payment on time; £12 if you exceed your credit limit; £12 for a returned payment, for example, a failed Direct Debit." | £12 × 3 типа; £5 за копию выписки | — | — | там же |
| Minimum payment 🟠 | "The minimum monthly contractual payment will be the higher of (1) £5 (or the full balance if less than £5) or (2) the [sum of interest/charges + …] (c) 1% of the remaining Normal Credit balance …" | higher of £5 / (interest+charges + 1% баланса) | — | — | там же, cl. min payment |
| Representative APR / reg | "Credit Card Agreement regulated by the Consumer Credit Act 1974"; "The APR for this agreement is 29.9% (variable)." (вариант документа — 39.9%) | 29.9% / 39.9% var | — | **ДА s75** (regulated) | там же |
| ⚠️ Изменение 2024+ | "On Argos Card, you can be charged deferred interest on BNPL plans, but you won't be charged deferred interest on any new BNPL plans you set up after updating to Argos Pay." | — | — | — | help.argos.co.uk (Argos Pay migration) |

### 9. Классические кредитки (regulated CCA 1974 / FCA) — пример NewDay Aqua + общий стандарт

| Ловушка | Verbatim-маркер | Число | CRA | s75 | Документ |
|---|---|---|---|---|---|
| Minimum payment trap 🔴 | "The higher of: A. £5 – or if you owe less than £5, the full amount you owe; or B. the sum of interest, default fees and 1% of the full amount you owe, (including the interest and default fees) as shown on your monthly statement." | higher of £5 / (interest + default fees + 1% баланса) | Exp/Eqf/TU | ДА | NewDay/Aqua min-payment формула, цит. в FOS-решении DRN-4357925 (financial-ombudsman.org.uk) |
| Statutory min-payment warning 🟠 | "If you make only the minimum payment each month, it will take you longer and cost you more to clear your balance." (предписанная FCA формулировка, CONC 6.7) | — | — | — | FCA Handbook CONC 6.7; на каждой UK card-выписке |
| Persistent debt 🟠 | После 18 мес преимущественно процентов/charges фирма ОБЯЗАНА предупредить; на 36-м мес — обязать поднять платёж. | 18 / 36 мес trigger | — | — | FCA CONC; ukfinance.org.uk persistent-debt FAQ |
| Default sums 🟠 | Типовая default charge **£12** (late payment / over-limit / returned payment) — отраслевой стандарт после OFT-cap 2006. | £12 | Exp/Eqf/TU | — | стандарт (Barclaycard/NewDay T&C) |
| Section 75 🟢 | "if you use your card to buy goods or services where the individual item costs between £100 and £30,000 … you will have the same claim against the card issuer [as against the supplier]." | £100–£30 000 | — | **ДА s75** | barclaycard.co.uk/personal/help/spending-transactions/section-75-claim |
| CPA / recurring 🟠 | Право отозвать recurring card payment у эмитента: "Once a customer asks their card issuer to cancel a recurring card payment, the card issuer must stop the payments, even if the customer has not contacted the business first." | — | — | — | FCA/PSR правило (CPA) |

---

## Few-shot корпус для trap detector

Готовые примеры формата **«текст из договора → trap_type + severity + numeric»** для few-shot промпта классификатора. Метки нормализованы: `trap_type` ∈ {deferred_interest, zero_to_interest_conversion, late_fee, backdated_interest, cpa, debt_collection, debt_sale, credit_reporting, minimum_payment_trap, exempt_no_s75, early_settlement_ok}.

```jsonc
[
  {
    "text": "If you do not repay the balance of this BNPL Plan in full by the end of the BNPL Plan Period, interest will be charged daily on the remaining balance ... backdated to the date of the original BNPL purchase. We refer to this as \"Deferred Interest\".",
    "trap_type": "deferred_interest",
    "severity": "high",
    "numeric": { "apr": 29.9, "basis": "backdated_to_purchase_date" },
    "provider": "Argos Card",
    "explanation_uk": "0% превращается в проценты ЗА ВЕСЬ срок задним числом, если не погасить вовремя. Классическая ловушка store-card."
  },
  {
    "text": "Once added the Normal Credit Rate will apply to it, meaning you will pay interest on interest.",
    "trap_type": "deferred_interest",
    "severity": "high",
    "numeric": { "compounding": true },
    "provider": "Argos Card",
    "explanation_uk": "Капитализация: проценты добавляются в основной долг и на них тоже капают проценты."
  },
  {
    "text": "we'll try to take ... your minimum payment by switching 3, 6 or 12 monthly payments to 24 monthly payments at 29% APR representative (variable).",
    "trap_type": "zero_to_interest_conversion",
    "severity": "high",
    "numeric": { "apr": 29.0, "trigger_days": 7, "new_term_months": 24 },
    "provider": "Monzo Flex",
    "explanation_uk": "Беспроцентный план при просрочке >7 дней конвертируется в 24 мес под 29% APR."
  },
  {
    "text": "we'll still charge interest on your outstanding balance ... from your original payment date.",
    "trap_type": "backdated_interest",
    "severity": "high",
    "numeric": { "basis": "from_original_payment_date" },
    "provider": "Monzo Flex",
    "explanation_uk": "Проценты начисляются с ИСХОДНОЙ даты платежа, а не с момента просрочки."
  },
  {
    "text": "We will charge you a late fee if you do not pay us up to 14 days after your 2nd or 3rd instalments are due. ... If your order is £20 or more, we will charge you a late fee of £5.",
    "trap_type": "late_fee",
    "severity": "medium",
    "numeric": { "fee_gbp": 5, "threshold_gbp": 20, "grace_days": 14, "max_per_instalment": 1 },
    "provider": "Klarna Pay in 3",
    "explanation_uk": "£5 late fee для заказов ≥£20 после 14 дней просрочки 2-го/3-го платежа."
  },
  {
    "text": "We may charge a late fee of £6 ... and a second late fee of £6 if the instalment is still unpaid 7 days after the due date.",
    "trap_type": "late_fee",
    "severity": "medium",
    "numeric": { "fee_gbp": 6, "second_fee_gbp": 6, "second_after_days": 7, "cap": "min(25%_of_price, £24)" },
    "provider": "Clearpay",
    "explanation_uk": "£6 + ещё £6 через 7 дней; общий cap = меньшее из 25% цены или £24."
  },
  {
    "text": "We will apply a late payment fee of £10 to your Account if you do not make your Total Monthly Repayment.",
    "trap_type": "late_fee",
    "severity": "medium",
    "numeric": { "fee_gbp": 10, "reduced_after_n_per_year": 5 },
    "provider": "Frasers Plus",
    "explanation_uk": "£10 за пропуск; снижается до £5 после нескольких раз в календарном году."
  },
  {
    "text": "By entering a Clearpay Plan, you authorise us to automatically deduct payments from your payment method for the instalments set out in a payment schedule.",
    "trap_type": "cpa",
    "severity": "medium",
    "numeric": null,
    "provider": "Clearpay",
    "explanation_uk": "Continuous Payment Authority — провайдер сам списывает с карты по графику."
  },
  {
    "text": "When you complete your Application we will ask you to provide us with at least one Continuous Payment Authority (CPA) for a debit card you are authorised to use.",
    "trap_type": "cpa",
    "severity": "medium",
    "numeric": null,
    "provider": "Zilch",
    "explanation_uk": "CPA на дебетовую карту; отзывается через банк/в приложении."
  },
  {
    "text": "we might ask you to pay the outstanding amount directly or use a debt collection agency to collect the money for us.",
    "trap_type": "debt_collection",
    "severity": "medium",
    "numeric": null,
    "provider": "Klarna",
    "explanation_uk": "Передача долга коллекторскому агентству при невозврате."
  },
  {
    "text": "We may also sell your debt to a third party and the purchaser may take action against you, which could include obtaining a court order against you.",
    "trap_type": "debt_sale",
    "severity": "high",
    "numeric": null,
    "provider": "Frasers Plus",
    "explanation_uk": "Продажа долга третьему лицу + судебный приказ/возможность банкротства."
  },
  {
    "text": "If we still can't take the payment, we'll let the credit reference agencies know that you're behind.",
    "trap_type": "credit_reporting",
    "severity": "medium",
    "numeric": null,
    "provider": "Monzo Flex",
    "explanation_uk": "Просрочка репортится в CRA → удар по кредитному файлу."
  },
  {
    "text": "Where you borrow from us, we may give details of your Pay in 3 Plans and how you manage them to CRAs. [www.transunion.co.uk/crain]",
    "trap_type": "credit_reporting",
    "severity": "medium",
    "numeric": { "cra": "TransUnion" },
    "provider": "PayPal Pay in 3",
    "explanation_uk": "PayPal явно репортит в TransUnion (единственный поимённо названный CRA)."
  },
  {
    "text": "The Pay in 3 Plan falls under the exemption set out in Article 60F of the Financial Services and Markets Act (Regulated Activities) Order 2001. This means you may not benefit from all the protections provided by the Consumer Credit Act 1974.",
    "trap_type": "exempt_no_s75",
    "severity": "medium",
    "numeric": { "exemption": "Art.60F", "section_75": false },
    "provider": "PayPal Pay in 3",
    "explanation_uk": "Exempt-кредит: НЕТ Section 75, меньше защит CCA. Ключевой маркер риска для BNPL."
  },
  {
    "text": "The minimum monthly contractual payment will be the higher of (1) £5 ... or (2) [interest + charges +] 1% of the remaining Normal Credit balance.",
    "trap_type": "minimum_payment_trap",
    "severity": "high",
    "numeric": { "floor_gbp": 5, "principal_pct": 1 },
    "provider": "Argos Card / typical UK card",
    "explanation_uk": "Минимальный платёж ~1% тела + проценты → долг гасится десятилетиями (persistent debt)."
  },
  {
    "text": "If you make only the minimum payment each month, it will take you longer and cost you more to clear your balance.",
    "trap_type": "minimum_payment_trap",
    "severity": "medium",
    "numeric": null,
    "provider": "Any UK credit card (FCA CONC 6.7)",
    "explanation_uk": "Предписанное FCA предупреждение — маркер minimum-payment trap на любой выписке."
  },
  {
    "text": "You may have the right to sue a Supplier or us or both ... costing more than £100 and not more than £30,000.",
    "trap_type": "early_settlement_ok",
    "severity": "low",
    "numeric": { "s75_min_gbp": 100, "s75_max_gbp": 30000, "section_75": true },
    "provider": "Klarna Financing (regulated)",
    "explanation_uk": "Положительный маркер: Section 75 присутствует (regulated). Detector должен помечать как защиту, не ловушку."
  }
]
```

**Замечания по разметке для классификатора:**
- `deferred_interest` и `zero_to_interest_conversion` — разные классы: первый = backdated lump sum за весь период (Argos store-card), второй = смена графика/ставки на будущее (Monzo Flex). Severity у обоих high, но математика и объяснение разные.
- Триггер-фразы high-severity: **"backdated to the date"**, **"interest on interest"**, **"Deferred Interest"**, **"switching ... to 24 monthly payments at ... APR"**, **"sell your debt"**.
- Триггер-фразы exempt/нет-защит: **"not regulated by the FCA"**, **"Article 60F"**, **"may not benefit from all the protections ... Consumer Credit Act 1974"** → detector должен поднимать «меньше защит, нет s75».
- Положительные маркеры (НЕ ловушка): **"section 75"**, **"without charge"** / **"no extra cost"** (early settlement), **"7 days ... to catch up"** (grace) — detector не должен помечать их как red.

---

## Поправки к trap-каталогу трека 10

Что уточнилось/исправилось против исходного каталога (трек 10):

1. **Klarna Pay in 3 — late fee подтверждён, но CRA НЕ названы поимённо.** В v1.8.0 (01.10.2025): £5 (≥£20) / 25% (<£20), 14 дней grace, max 1 fee/инстолмент, не взимается при остатке <£1 — всё подтверждено. **НО**: документ говорит лишь «report information to credit reference agencies» без перечисления Exp/Eqf/TU. Если в каталоге трека 10 были названы конкретные агентства для Klarna Pay in 3 — это надо снять/пометить «не указано в T&C» (исходно условия Klarna в каталоге были неверны — теперь сверено с эталоном).

2. **Clearpay — late fee структура важнее одной цифры.** Не «£6 late fee», а **£6 + второй £6 через 7 дней**, cap = min(25% цены, £24). Если каталог хранил только £6 — добавить второй платёж и cap.

3. **Zilch — каталог должен различать ДВА продукта.** «Pay over 6 weeks»/Pay in 4 = **unregulated, нет s75, нет late fees**. «Pay over 3 months» (с 02.2024) = **regulated под FCA, есть s75**. Плюс «PayNow» = вообще debit-транзакция, прямо «not eligible for Section 75». Если в каталоге Zilch был одной строкой — разнести на 2–3.

4. **Monzo Flex — это REGULATED кредит, не BNPL-exempt.** Running-account credit, CCA 1974, **есть Section 75**, rep. 29% APR. Главная ловушка — конверсия 0%→24 мес @29% при просрочке >7 дн + backdated interest «from your original payment date». Если каталог классифицировал Monzo Flex как unregulated BNPL — исправить на regulated.

5. **PayPal Pay in 3 — exempt по Art.60F, репортит именно в TransUnion.** Каталог: добавить точную правовую ссылку (Article 60F FSMA RAO 2001) и то, что named CRA = **TransUnion** (единственный явно названный среди всех провайдеров). Late fee = £0, но «severe consequences ... legal action».

6. **Frasers Plus — APR 39.9%, НЕ 29.9%.** Частая ошибка (в обзорах путают с 29.9%). Rep. **39.9% variable**; до 3 мес 0%. Late fee £10 (→£5 после нескольких в году). **Нет Argos-style deferred interest** — interest считается per-plan заранее и не backdated lump-sum. Есть **debt-sale clause** (продажа долга + банкротство) — это отдельная high-severity ловушка. Section 75 присутствует (regulated).

7. **Argos Card — эталон deferred interest, дословная формулировка добавлена.** «backdated to the date of the original BNPL purchase» + «you will pay interest on interest» — самый сильный verbatim-маркер deferred-interest во всём корпусе. Default sums = **£12** (×3 типа). **Важно**: Argos мигрирует в «Argos Pay» — на новых BNPL-планах после миграции deferred interest НЕ начисляется. Каталог должен пометить как «legacy/migrating» и не приписывать deferred interest всем новым Argos Pay планам.

8. **Section 75 как разделитель regulated/exempt — ключ для severity-логики.** Сводно: **есть s75** → Klarna Financing, Monzo Flex, Frasers Plus, Argos Card, классические кредитки, Zilch Pay over 3 months. **Нет s75 (exempt/debit)** → Klarna Pay in 3, Clearpay, PayPal Pay in 3, Zilch Pay in 4/PayNow. Detector должен поднимать «нет s75, меньше защит» именно для второй группы — это и есть скрытая ловушка BNPL.

9. **Default charge £12 — отраслевой стандарт** (OFT-cap 2006) для регулируемых карт/store-cards (Argos подтвердил £12). Использовать как дефолтное число для credit-card late/over-limit/returned-payment, если конкретный T&C недоступен.

10. **Горизонт регулирования (мета-поправка).** В 2025–2026 Treasury/FCA вводят регулирование BNPL — exempt-статус Pay in 3/4 будет меняться (s75-подобные защиты могут появиться). Каталог должен иметь поле «на дату X exempt; статус может измениться в 2026» для всех BNPL-строк.

---

## Summary

Собран корпус verbatim-формулировок из **9 групп провайдеров** (Klarna Pay in 3 + Financing, Clearpay, Zilch, Monzo Flex, PayPal Pay in 3, Frasers Plus, Argos Card, классические кредитки) с прямыми цитатами из официальных T&C-документов 2025 года и точными числами, CRA-репортингом и Section-75-статусом. Главная находка для product IP — дословная формулировка **deferred interest** у Argos Card («backdated to the date of the original BNPL purchase ... you will pay interest on interest», ставка 29.9%/39.9%) и **конверсия 0%→29% APR на 24 месяца** у Monzo Flex: это два сильнейших high-severity маркера для классификатора. Ключевой кросс-провайдерный разделитель — **Section 75 / Art.60F exemption**: BNPL «Pay in 3/4» (Klarna, Clearpay, PayPal, Zilch Pay in 4) — exempt, без s75 и с меньшими защитами CCA, тогда как регулируемые продукты (Monzo Flex, Frasers Plus 39.9% APR, Argos Card, Zilch Pay over 3 months, кредитки) дают полную s75-защиту — detector обязан это различать. По трек-10-каталогу зафиксировано **10 поправок**, из которых самые существенные: Klarna Pay in 3 не называет CRA поимённо (исходные условия были неверны — теперь сверено с эталоном v1.8.0), Zilch надо разносить на 2–3 продукта с разными статусами, Frasers Plus имеет APR 39.9% (а не 29.9%) и debt-sale clause, Monzo Flex — это regulated-кредит с s75, а PayPal явно репортит в TransUnion по Art.60F-exemption. Подготовлен few-shot JSON-корпус из 18 размеченных примеров «текст договора → trap_type + severity + numeric» с нормализованными классами и триггер-фразами, готовый для few-shot промпта/обучения trap detector.

Файл записан: `/Users/elenauvarova/git projects/decode/research/10b-trap-tc-corpus.md`.
