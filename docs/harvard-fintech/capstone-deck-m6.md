# Капстоун M6 — скелет колоды

**Задание модуля:** «Recommend a solution to a problem encountered in the FinTech sector, based on what you have learned from the cases» + «Present a slide deck that proposes a plan of action for overcoming challenges in the FinTech space».

**Главное отличие от питча инвестору:** рубрика M6 требует не только решения, но и разбора **регуляторной дилеммы** и вывода **кто выигрывает — инкумбенты, стартапы или оба**. Обычная product-колода эти два outcome не закрывает. Поэтому структура ниже — «политика → продукт → план», а не «проблема → продукт → деньги».

⚠️ Количество слайдов и формат сдачи сверить с handbook. Ниже 14 слайдов + приложение — типовой объём для такого капстоуна.

---

## Слайды

### 1 · Title
**Что на слайде:** Decode. Одна строка тезиса: *«BNPL is the first mass consumer credit where the consumer is not the customer.»* Имя, дата, курс.
**Зачем:** тезис задаёт весь дальнейший разбор. Не «приложение для сканирования документов».

### 2 · Проблема: чей это продукт
**Что:** схема потока денег — мерчант платит провайдеру за конверсию; потребитель получает кредит бесплатно и не читает условия. Вывод: индустрия оптимизирует чекаут, не понимание.
**Цифра:** 72% не читают/не понимают T&C (Baringa) · ~70% подписывали контракты, не зная всех условий (Adobe).
**Источник:** [research/00](../../research/00-executive-summary.md) §4, [11](../../research/11-users-pain-points.md).

### 3 · Масштаб и кто страдает
**Что:** сегмент и цена ошибки. Не «люди путаются», а «ошибка стоит £».
**Цифры:** FCA Financial Lives 2024 — **10.9 млн / 20%** взрослых UK пользовались BNPL; легко гасят только **37% в 18–34** против **60% в 35–54**; профиль — моложе, менее кредитоспособны, вдвое чаще в финансовом стрессе.
**Формулировка-осторожность:** «связан с / непропорционально представлен среди уязвимых» — FCA (OP69) каузальность не подтверждает.
**Источник:** [research/11b](../../research/11b-user-pains-verified.md).

### 4 · Why now: 15 июля 2026
**Что:** таймлайн регулирования. FCA начинает регулировать Deferred Payment Credit: pre-contract disclosures, Section 75, доступ к FOS, Consumer Duty.
**Ключевой поворот:** правила **не ретроспективны** — договоры, заключённые до Reg Day, остаются exempt. Значит на руках у людей одновременно два режима → непонимание не уменьшается, а растёт.
**Источник:** PS26/1 (11.02.2026), [research/09b](../../research/09b-fca-boundary-verified.md).

### 5 · Дилемма регулятора *(M6 outcome 1–2)*
**Что:** почему это тяжело для государства — три силы: доступ к кредиту для thin-file, риск вреда, темп продуктовых изменений быстрее темпа правил. Живой пример смены подхода: **CP26/15** — FCA пересматривает CONC 3 (financial promotions), опираясь на consumer-understanding outcome из Consumer Duty вместо части предписывающих правил.
**Вывод слайда:** регулятор смещается от «предпиши форму» к «докажи, что поняли» — и это создаёт спрос на слой понимания, который сам регулятор поставить не может.
**Источник:** [research/09b](../../research/09b-fca-boundary-verified.md) (CP26/15, comments due 17.06.2026).

### 6 · Чего регулирование не чинит
**Что:** обязательное раскрытие ≠ понимание. Раскрытие даётся в момент максимальной спешки (чекаут), на языке договора, без арифметики. Остаточная проблема: **потребитель не знает полной стоимости и необратимых последствий до подписи**.
**Опора:** каталог 14 типов ловушек с ценой ошибки — отсутствие s75 (до **£30 000**), deferred interest, конверсия 0% → 29% APR, CPA, late fees (**£39 млн/год** по сектору, Citizens Advice 2021).
**Источник:** [research/00](../../research/00-executive-summary.md) §3, [10b](../../research/10b-trap-tc-corpus.md).

### 7 · Решение: core loop
**Что:** один экран результата + четыре элемента: детерминированная **true cost**, **trap flags** с ценой в £, бинарный бейдж **«Goes on your credit file: YES / NO»**, сохранение в **Vault** + **Renewal Radar**. Вход: камера / share sheet / файл. **Никакого подключения банка.**
**Визуал:** реальный экран из прототипа (`prototype/index.html`), не мокап-заглушка.
**Одна фраза:** *«Understand & watch your commitments — no bank connection needed.»*

### 8 · Почему это легально *(самый недооценённый слайд)*
**Что:** линия периметра, дословно. PERG 17.7 ex.(4): *«This is not debt counselling as it is about incurring debts, not liquidating them»* → **до подписи = вне регулируемой деятельности**. Ex.(14)/(16) → «какой долг гасить первым», «гасить ли досрочно» = debt counselling, внутрь не заходим.
**Дизайн-инварианты как следствие:** no product links, no affiliate, no «apply» CTA, запрещены формулировки *you should / we recommend / don't sign / best deal*; Q&A на «what should I do?» отдаёт варианты + signposting MoneyHelper/StepChange.
**Оговорка на слайде:** product/market-analysis, не юрзаключение; compliance-review до запуска.
**Источник:** [research/09b](../../research/09b-fca-boundary-verified.md), [research/00](../../research/00-executive-summary.md) §5.

### 9 · Почему это защитимо
**Что:** таблица конкурентов по 4 осям: bank link / понимание vs экстракция / true-cost math / lifecycle-трекинг.
**Факт:** из 25+ разобранных продуктов колонка **true cost math пуста у всех**. Ближайшие соседи и их зазор: Nous £6.99 (household bills, без credit), Snoop £5.99 (bank link), Adobe AI Assistant $4.99 (generic contracts, без финматематики), ChatGPT (без персистентности, детерминизма и проверяемых citations).
**Рвы:** детерминированный расчёт («Calculated, not AI»), citations к строке документа, UK trap-корпус, Vault/Radar, no-bank.
**Источник:** [research/00](../../research/00-executive-summary.md) §2, [18](../../research/18-competitor-teardowns.md), [24](../../research/24-competitor-watch.md).

### 10 · Кто выигрывает *(M6 outcome «incumbents, startups, or both»)*
**Что:** прямой ответ на вопрос модуля, с доказательством из своего же ресёрча.
- **Инкумбенты** выигрывают дистрибуцию: Revolut AIR (09.04.2026, 13 млн UK), conversational AI у Starling и NatWest, возвращение Cleo в UK (05.02.2026) — но все **bank-locked** и ни один не декодирует документы.
- **Стартапы** выигрывают в зонах, где инкумбент структурно не может играть: продукт, который не подключается к банку, невозможен внутри банка.
- **Вердикт:** оба — но по разным осям; проигрывает тот, кто ставит на нейтральный AI-чат поверх банковского фида, потому что там инкумбент побеждает дистрибуцией.

### 11 · Экономика
**Что:** юнит-экономика и упаковка.
**Цифры:** $0.05–0.09 за документ (Claude Sonnet 4.6), ~$0.01 за Q&A-тёрн, $0.6–1.3 cost-per-paid-user-month → **COGS 10–30%** от £3–8/мес. Цена-якорь **£4.99/мес** (коридор UK: £2.99 … £5.99 … £9.99). Бенчмарк конверсии: freemium медиана **2.1%**, hard paywall **10.7%** (RevenueCat 2026); план Decode — 2–5%.
**Гейты билда:** Apple Small Business Program (15% с первого дня) подать до запуска; **не** использовать toggle-триал (Guideline 3.1.2, массовые реджекты с января 2026).
**Источник:** [research/06](../../research/06-tech-claude-vision-extraction.md), [21](../../research/21-pricing-monetization.md).

### 12 · План действий
**Что:** четыре фазы с датами и гейтом выхода из каждой — это и есть «plan of action», которого требует задание.
1. **Compliance & clearance** — юр-ревью периметра и копирайта, DPIA, clearance имени (словесный знак DECODE в кл. 9 в UK занят → «DecodeFi» или комбинированный знак в кл. 36). *Гейт: письменный периметр-анализ по каждой фиче.*
2. **Build MVP** — Expo (iPhone-first), FastAPI-прокси + Supabase eu-west-2, Claude inline через `/v1/messages` (ZDR ломается на Files/Batch API). *Гейт: eval — `hallucination_rate` ≤2%, `numeric_exact_match` толеранс 0 на golden-сете 30–50 UK-документов.*
3. **Launch к 15.07.2026** — Regulation Day как PR-хук №1; маркетинг вне s21 FSMA (платный SaaS без кредита и bank connection), избегать «improve credit score» и сравнений кредитных продуктов.
4. **Расширение типа документа №2 — insurance renewals**, не подписки: FCA **ICOBS 6.5** по закону кладёт прошлогоднюю и новую премию в одно письмо → детерминированный diff из коробки; таксономия ловушек переиспользуется.
**Измерение:** North Star — **Weekly Active Watched Commitments**; активация двухступенчатая: aha `true_cost_revealed` в Day-0 + loop-closed `commitment_saved`/`reminder_set` за 7 дней. Не «decoded docs» (vanity) и не «£ предотвращённых потерь» (недоказуемо + PII/FCA-риск).
**Источник:** [research/22](../../research/22-gtm-aso-launch.md), [26](../../research/26-naming-brand-trademark.md), [27](../../research/27-data-model-security-gdpr.md), [28](../../research/28-metrics-instrumentation.md), [30](../../research/30-trap-catalog-expansion.md).

### 13 · Риски и что с ними делать
| Риск | Митигация |
|---|---|
| Регуляторный дрейф (Q&A по заключённым договорам заходит в debt counselling) | Output-фильтр на запрещённые формулировки + signposting; юр-ревью до запуска; мониторинг CP26/15 |
| Одна видимая ошибка в расчёте обрушивает доверие (η²=0.141; объяснение чинит лишь частично) | Детерминированная математика в коде, citations к строке, экран trust-repair, категориальный confidence вместо процентов |
| Пропущенные напоминания (лимит iOS в 64 pending-нотификации) | Горизонт 30–45 дней + перестроение при запуске + серверная страховка |
| Биллинговые 1★ (болезнь категории: Cleo — иск FTC $17 млн, Emma — £83.99 мимо Apple) | Только Apple IAP, free без карты, напоминание до конца триала, отмена в 2 тапа |
| Периметр сжимается (новые сканеры-конкуренты в App Store) | Рвы P0: true-cost, citations, Vault/Radar, no-bank — их не копируют за спринт |
| Избегание как поведение (~43% Gen Z, money dysmorphia) | Тон StepChange/FCA non-judgmental, reading age 9, fear только со шагом-выходом |

**Источник:** [research/31](../../research/31-behavioral-trust-design.md), [29](../../research/29-retention-notifications.md), [02](../../research/02-competitor-review-mining.md), [24](../../research/24-competitor-watch.md).

### 14 · Закрытие
**Что:** возврат к тезису слайда 1 + один вывод для сектора, а не для продукта: *регулирование делает раскрытие обязательным, но понимание остаётся незакрытым — и это устойчивая продуктовая ниша, а не временный зазор.*

### Приложение (не показывать, держать для вопросов)
Каталог 14 типов ловушек с ценой ошибки · верифицированные цитаты PERG · таблица конкурентов целиком · eval-архитектура · экраны прототипа.

---

## Как слайды ложатся в рубрику M6

| Learning outcome | Слайды |
|---|---|
| Challenges posed to governments in regulating FinTech | 4, 5 |
| Issues around government intervention as firms innovate | 5, 6, 8 |
| How FinTech and incumbents change strategies as adoption matures | 9, 10 |
| Who benefits most — incumbents, startups, or both | 10 |
| Recommend a solution to a problem in the FinTech sector | 6, 7, 8 |
| Present a plan of action | 12, 13 |

---

## Чего не делать

- **Не превращать в питч инвестору.** Слайды 5 и 10 — половина рубрики; без них колода «продаёт», но не отвечает на задание.
- **Не грузить 40 треков ресёрча.** Максимум 3 цифры на слайд, остальное в приложение.
- **Не заявлять каузальность** «BNPL → долговая спираль» и не давать недатированную статистику 2021 года как сегодняшнюю.
- **Не изображать юридическую уверенность.** Формулировка «вероятно вне периметра, подтверждено первоисточниками, юр-ревью до запуска» сильнее, чем «это легально».
- **Не финалить логотип и имя** до clearance — на слайдах пока wordmark-заглушка ([research/26](../../research/26-naming-brand-trademark.md)).
