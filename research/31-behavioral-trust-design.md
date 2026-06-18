# Behavioral design, доверие и тон для Decode (трек: behavioral-trust)

Дата ресёрча: 2026-06-18. Сегмент: BNPL-пользователи 18–25 (UK), низкая фин-грамотность, высокая фин-тревожность («please no judgements»). Фокус: (1) снижение финансовой тревоги в UX, (2) behavior change для молодёжи (этичные nudges/framing/loss-aversion), (3) доверие к AI-выводам о деньгах, (4) безоценочный копирайт (do/don't для summary/trap/Q&A), (5) онбординг-психология для low-literacy.

Каждый существенный факт — с inline-URL первоисточника. Где первоисточник не подтверждён или цифра гуляет по вторичным пересказам — это указано явно. Этот файл дополняет, а не дублирует `research/04-ux-ai-trust-patterns.md` (там — confidence indicators, citations, дисклеймеры, streaming, explainability как UI-механика). Здесь — **эмоция, поведение, тон, копирайт**.

---

## 0. Почему этот трек критичен именно для Decode

Сегмент Decode имеет три накладывающихся уязвимости, которые превращают «обычный» финтех-UX в источник вреда:

1. **Money dysmorphia как массовое явление.** По данным, которые широко цитируются по опросу Intuit Credit Karma, ~43% Gen Z и ~41% millennials испытывают «money dysmorphia» — искажённое восприятие своего финансового положения, и >40% «чувствуют себя отстающими», даже имея сбережения выше среднего ([Global Wellness Institute](https://globalwellnessinstitute.org/global-wellness-institute-blog/2024/02/27/37336/), [Salon](https://www.salon.com/2024/11/30/money-dysmorphia-affects-gen-z-millennials-more/)). Первоисточник цифр — пресс-релиз Credit Karma; в академических работах не отрефакчено, использовать как направление.
2. **Avoidance как защитное поведение.** Симптомы money dysmorphia / финансовой травмы — «avoidance of financial planning, looking at bank statements» и «avoid checking accounts to avoid triggering panic» ([ICANotes](https://www.icanotes.com/2025/07/08/the-psychology-behind-money-dysmorphia-when-self-worth-gets-tied-to-net-worth/), [Embodied Wellness & Recovery](https://www.embodiedwellnessandrecovery.com/blog/youre-not-bad-with-moneyyoure-in-a-trauma-response-the-psychology-behind-overspending-avoidance-and-financial-shame)). **Это прямой риск для Decode: продукт, который показывает «плохие новости о деньгах», конкурирует не с другим приложением, а с желанием пользователя закрыть его и не открывать.**
3. **Present bias молодёжи усиливает уязвимость к BNPL.** Present bias и hyperbolic discounting напрямую связаны с прокрастинацией погашения BNPL у молодых пользователей ([IJSREM](https://ijsrem.com/download/hyperbolic-discounting-and-consumer-debt-behaviour-in-buy-now-pay-later-financial-products/)). Низкая friction чек-аута усиливает импульс: «the initial payment hurts less… diminishes the perceived risk of indulgence» ([ScienceDirect, digital traps BNPL+соцсети](https://www.sciencedirect.com/science/article/pii/S1544612326001674)).

Вывод-рамка: **дизайн-цель Decode — не «честно напугать», а снизить avoidance, чтобы пользователь вообще досмотрел плохую новость и сделал безопасный следующий шаг.** Тревога — это не побочка, это главный конкурент удержания.

---

## 1. Снижение финансовой тревоги в UX

### 1.1 Базовая рамка: деньги — высокоэмоциональный домен, и ошибка важнее успеха

UXDA (агентство, специализирующееся на финтех-UX) формулирует консенсус домена: «Money triggers deep emotions — anxiety, fear, greed, trust, regret. Users often approach financial interfaces with stress or skepticism» и, ключевое для Decode, **«the error screen often matters more than the success screen»** — управление ожиданиями в момент проблемы напрямую влияет на сохранение доверия ([UXDA, Traditional UX Fails in Finance](https://www.theuxda.com/blog/traditional-ux-fails-in-finance-systemic-ux-for-digital-banking)). Там же: 70% потребителей бросают бренд после двух негативных взаимодействий, 25% — после одного (UXDA приводит как индустриальную статистику; первичный замер не атрибутирован — направление, не цифра в дек).

Don Norman / NN/g: эмоция работает на трёх уровнях — **visceral / behavioral / reflective** ([NN/g, 3 Levels of Emotional Processing](https://www.nngroup.com/videos/3-levels-emotional-processing/)). Для Decode это значит: первый экран после скана задаёт visceral-реакцию (паника или «выдох»), а формулировки и контроль — reflective-оценку («можно ли этому доверять, не осудят ли меня»).

### 1.2 Снять вину с пользователя «by design»

Сильнейший прикладной паттерн для тревоги — **shift responsibility away from the user**. UXDA: традиционные интерфейсы используют нейтрально-обвиняющий язык («Invalid input», «Operation failed»), который имплицитно винит пользователя; правильный дизайн заставляет систему «take responsibility by design — by explaining what happened, why it happened, what will happen next» ([UXDA](https://www.theuxda.com/blog/traditional-ux-fails-in-finance-systemic-ux-for-digital-banking)).

Для Decode: если скан не распознался — это «**We couldn't read this clearly — try better light**», а не «Invalid document» (вина на продукте, не на пользователе). Если BNPL-оффер реально дорогой — фрейм «**This plan would cost you £X more**», а не «You're about to make a bad decision» (плохой объект — план, а не человек).

### 1.3 Self-Determination Theory: autonomy / relatedness / competence снижают стресс и растят мотивацию

NN/g раскладывает мотивацию и благополучие на три психологические потребности ([NN/g, Autonomy, Relatedness, and Competence](https://www.nngroup.com/articles/autonomy-relatedness-competence/)):

- **Autonomy** — «Design that incorporates autonomy lets users have control»: несколько путей вместо одного навязанного, контроль темпа. Для Decode: пользователь сам решает, раскрыть детали расчёта или нет; «плохая новость» не форсит немедленное действие.
- **Relatedness** — «develops over longer periods of time, but is influenced by many small interactions»; только релевантные, своевременные сообщения; нерелевантные пуши сигнализируют «мы тебя не знаем» (кейс Peel: 4 промо-смс сразу после покупки разрушили доверие). Для Decode: Renewal Radar должен слать только то, что реально касается этого пользователя — иначе разрушает relatedness.
- **Competence** — «If it is easy to become competent… the system is very usable»; **pull-based помощь (тултип, когда нужно) лучше push-based туториалов**; избегать длинного онбординга, показывать фичи контекстно. Прямо ложится на low-literacy онбординг (см. §5).

Связь с тревогой: автономия и ощущение компетентности — прямые антидоты к беспомощности, которая лежит в основе money dysmorphia («never feeling financially enough» → shame, avoidance — [ICANotes](https://www.icanotes.com/2025/07/08/the-psychology-behind-money-dysmorphia-when-self-worth-gets-tied-to-net-worth/)).

### 1.4 Что усиливает стресс (анти-паттерны)

- **Скорость без ясности.** Финтех-UX-консенсус: пользователь стерпит более медленный опыт, если он ощущается безопаснее, но бросит быстрый опыт, оставляющий неопределённость ([UXDA-guide / fintech UX 2026 пересказы](https://fuselabcreative.com/fintech-ux-design-guide-2026-user-experience/)). Для Decode: лучше честный 4-секундный «reading your document…» с прогрессом, чем мгновенный ответ, которому не верят.
- **Сырые проценты/числа без интерпретации** — см. `04-ux-ai-trust-patterns.md` §2 (Apple HIG, PAIR): «avoid technical or statistical jargon… doesn't help people assess the results».
- **Dark patterns** напрямую снижают доверие (см. §3.3) и для тревожной аудитории читаются как «меня снова разводят».

### 1.5 Прикладные паттерны снижения тревоги для Decode

| Паттерн | Источник-обоснование | Применение в Decode |
|---|---|---|
| **Calm state после тяжёлого действия** | fintech UX 2026 ([fuselab](https://fuselabcreative.com/fintech-ux-design-guide-2026-user-experience/)) | После true-cost reveal — спокойный экран «Here's what you can do», без красного алярма по всему экрану |
| **Система берёт вину на себя** | UXDA | Ошибки скана и формулировки traps — объект «план/оффер/документ», не «ты» |
| **Predictable, не паникующий показ «волатильности»** | fintech UX 2026 ([Design Sphere](https://medium.com/@design.sphere/designing-for-financial-anxiety-why-fintech-ux-must-feel-safe-not-just-look-clean-0ee61b5418b0)) | Цвет «дорого» — янтарь/нейтраль, не агрессивный красный (красный = срочность/паника, [Pixflow](https://pixflow.net/blog/ui-visual-cues-in-fintech-apps-decision-making/)) |
| **Autonomy: details on demand** | NN/g SDT | Прогрессивное раскрытие расчёта (см. §5) |
| **Reassurance прежде action** | fear-appeal research (§2.2) | «You've got time to sort this» / «Most people miss this — now you've seen it» перед «next step» |

---

## 2. Behavior change для молодёжи: nudges, framing, этичная loss-aversion

### 2.1 Что реально работает на 14–25 (developmental sensitivity)

Системный обзор по применению поведенческой экономики к подросткам и молодым взрослым (AYA) в Journal of Adolescent Health ([PMC8175460](https://pmc.ncbi.nlm.nih.gov/articles/PMC8175460/)):

- **Социальные нормы и относительный социальный ранг** — «emerged as the most promising behavioral economics phenomena for further exploration in AYA», т.к. опираются на развивающуюся социальную когницию. Подростковый мозг «highly responsive to social context».
- **Loss-framing работает на молодёжи** — пример: подростки с диабетом 1 типа улучшили мониторинг при ежедневном loss-framed стимуле $2.
- **Present bias → подчёркивать краткосрочные эффекты, а не долгосрочные риски** — студенты, которым показали краткосрочный вред (UV-фото кожи), сильнее меняли поведение, чем при долгосрочных угрозах.
- **Пик чувствительности к вознаграждению 14–21** — усиливает эффект интервенций, но это обоюдоострое.

### 2.2 Этические границы и риски (критично — это «этичная» loss-aversion из ТЗ)

Тот же обзор даёт прямые предостережения:

- **Extrinsic motivators подрывают intrinsic motivation** — «financial or social incentives… could undermine intrinsic motivation, which is critical for long-term behavior change» ([PMC8175460](https://pmc.ncbi.nlm.nih.gov/articles/PMC8175460/)). Для Decode: геймификация/баллы могут краткосрочно поднять метрику, но убить долгую привычку «проверять перед тем как взять».
- **Социальный ранг может демотивировать** — «some may be discouraged rather than motivated by social ranking information». Для Decode: «ты тратишь больше, чем 80% сверстников» рискует усилить shame у money-dysmorphic пользователя. Безопаснее — нормализующий фрейм («many people miss this clause»), а не ранжирующий.
- **Подсветка нежелательного поведения может его поощрять** — «highlighting unhealthful behaviors may inadvertently promote them». Для Decode: не превращать «ловушки» в каталог трюков; фокус на защите, не на «вот как можно обойти».

**Fear appeals: нюанс, который меняет всё.** Мета-анализ Tannenbaum et al. 2015 (Psychological Bulletin, 141(6)) на основе диверсной выборки: средний эффект fear appeals положителен, но **малый — random-effects d = 0.29 (fixed-effects d = 0.27)** ([Tannenbaum et al. 2015, PDF](https://socialactionlab.org/wp-content/uploads/2024/01/Tannenbaum_Appealing-to-Fear-A-Meta-Analysis-of-Fear-Appeal-Effectiveness-and-Theories_2015.pdf), [Illinois Experts](https://experts.illinois.edu/en/publications/appealing-to-fear-a-meta-analysis-of-fear-appeal-effectiveness-an/)). Ключевой модератор: **эффективность fear appeal растёт, когда сообщение содержит efficacy statements** (что конкретно сделать). Их формулировка гипотезы: fear appeals **без** efficacy дают более слабый (менее положительный/нулевой), а не отрицательный эффект — т.е. «страх без выхода» не столько вредит, сколько не работает. Для тревожной аудитории это значит: **страх допустим только в связке с конкретным, выполнимым следующим шагом**; голая угроза бесполезна.

Подтверждается отдельно: «precautionary information or reassurance… is likely to have the greatest impact on behavior… fear may inhibit the establishment of precautionary motivation»; loss-framed сообщения могут вызывать guilt/shame → psychological reactance (отторжение) ([APA fear-appeal meta-обзор](https://www.apa.org/pubs/journals/releases/bul-a0039729.pdf); [Marketing Management Journal, gain vs loss framing](https://marketingmanagementjournal.scholasticahq.com/article/154848-gain-vs-loss-framing-in-rational-and-emotional-appeals-effects-on-consumer-attitudes-reactance-and-brand-choice)). Практичный гибрид из исследований framing: **риск называть в негативных терминах, а решение подавать в позитивном фрейме**.

### 2.3 Choice architecture без потери автономии (этичный nudge vs sludge)

- Различие nudge / sludge: «sludge manipulates the same cognitive biases for profit» — тот же механизм, но во вред пользователю ([Etonomics](https://etonomics.com/2025/02/14/nudges-a-dive-into-behavioural-economics/)). Decode по позиционированию — anti-sludge инструмент, и его собственный UX обязан быть чистым, иначе лицемерие читается мгновенно.
- Автономия-сохраняющий nudge (adaptive nudge framework): «transparency that the highlight is system-generated and why, adaptivity… and negotiability through opt-out» ([Emerald, adaptive nudge framework](https://www.emerald.com/jsibr/article/1/2/3/1298218/The-adaptive-nudge-framework-advancing-ethical)). Default-ы переставляют, но не удаляют опции (auto-enrolment как образец — [Decision Lab](https://thedecisionlab.com/reference-guide/psychology/choice-architecture)).
- **«Future self» / «Save More Tomorrow»** — обещание будущему себе работает лучше, чем требование жертвы сейчас ([Psychology Today, self-nudging](https://www.psychologytoday.com/us/blog/curiosity-code/202505/never-make-a-bad-choice-again-by-embracing-self-nudging)). Для Decode: Renewal Radar — это и есть «future self» nudge («heads-up before this renews»), а не пост-фактум обвинение.

### 2.4 Прикладные правила nudge для Decode

1. **Nudge = heads-up + выбор, никогда не блокировка.** «This renews in 3 days — want a reminder, or to review it?» (autonomy сохранена).
2. **Loss-aversion этично:** показывать конкретную, посчитанную потерю («£42 more over 6 months»), а не абстрактный страх. Loss-frame — на деньгах/плане, не на личности.
3. **Краткосрочный, не долгосрочный горизонт** (present bias): «by Christmas you'd have paid £X extra», а не «in 5 years…».
4. **Нормализация вместо ранжирования:** «This clause catches a lot of people» > «You're worse than 80% of users».
5. **Никакой геймификации, подрывающей intrinsic motivation:** не баллы за «проверки», а ощущение контроля/компетентности как награда.

---

## 3. Доверие к AI-выводам о деньгах: что повышает, что разрушает

> Механику UI доверия (confidence-бейджи, citations, highlight источника, дисклеймеры, «calculated not AI») детально см. в `research/04-ux-ai-trust-patterns.md`. Здесь — поведенческая/динамическая сторона: как доверие формируется, ломается и чинится во времени.

### 3.1 Алгоритм-appreciation на старте, но хрупкость к одной ошибке

Экспериментальное исследование Han & Ko, «Trust Formation, Error Impact, and Repair in Human–AI Financial Advisory» (Behavioral Sciences, окт. 2025) — прямой первоисточник по динамике доверия в **финансовом** контексте ([PMC12561693](https://pmc.ncbi.nlm.nih.gov/articles/PMC12561693/), [MDPI](https://www.mdpi.com/2076-328X/15/10/1370)):

- **Стартовое доверие к AI выше, чем к человеку-эксперту**: trust M = 4.79 vs 4.44 (p = 0.006), satisfaction 4.89 vs 4.53 (p = 0.020), reliance intention 4.63 vs 4.12 (p < 0.001). То есть «calculated by an algorithm» в Decode стартует с кредитом доверия.
- **Одна видимая ошибка обрушивает доверие** — Round × Accuracy interaction большой: **η² = 0.141**, «single advisory errors resulted in substantial trust decline»; «acute sensitivity to performance failures». **Для детерминированного true-cost это аргумент №1: один неверный расчёт стоит больше, чем десять правильных.**
- **Объяснение после ошибки чинит доверие (частично):** Round × Explanation interaction **η² = 0.086 (p < 0.001)**; получившие объяснение восстанавливались сильнее, но recovery «partial rather than complete».
- **Финансово грамотные сильнее реагируют** в обе стороны: «sharper decline after errors and stronger recovery following explanations».
- Любопытный эффект: к 3-му раунду доверие превысило базовое во всех условиях — «structured exposure effects»: систематичный, повторяемый процесс сам по себе растит уверенность.

### 3.2 Над-доверие — отдельный риск (особенно для low-literacy)

- Люди склонны over-rely: «accept an AI's suggestion even when that suggestion is wrong» ([Buçinça et al. 2021, Cognitive Forcing Functions, CSCW](https://dl.acm.org/doi/10.1145/3449287) / [PDF](https://iis.seas.harvard.edu/papers/2021/bucinca21trust.pdf)).
- **Cognitive forcing functions** (заставить пользователя на секунду подумать, прежде чем принять ответ) снижают over-reliance сильнее, чем обычный explainable-AI. Но: «people assigned the least favorable subjective ratings to the designs that reduced the overreliance the most» — то, что лучше всего защищает, нравится меньше всего. Trade-off, который Decode должен решать осознанно: для high-stakes («это дорогой план») — лёгкий forcing («tap to see why»), для рутины — нет.
- Калибровка важнее максимизации (см. `04` §1, PAIR): цель — пользователь доверяет, но перепроверяет важное.

### 3.3 Что разрушает доверие к AI о деньгах

- **Dark patterns / confirmshaming.** Эксперимент: «dark» версия дала reliability 3.26 vs 3.55 в чистой и intentionality 3.07 vs 3.42 ([Deceptive by Design, ResearchGate](https://www.researchgate.net/publication/392519249_Deceptive_by_Design_Assessing_the_Impact_of_UX_Dark_Patterns_on_Engagement_and_Trust_in_Digital_Products)). Confirmshaming («No, I don't want to save money») — guilt-инъекция, особенно токсична для anti-traps продукта ([UXDA dark patterns в банкинге](https://www.theuxda.com/blog/dark-patterns-in-digital-banking-compromise-financial-brands)).
- **Нерелевантные сообщения** (нарушение relatedness) — сигнал «мы тебя не знаем» (NN/g, кейс Peel).
- **Сырые проценты уверенности**, мискалиброванный confidence → over/under-reliance (см. `04` §2.3).
- **Скрытые/«битые» citations** — паттерн Citations требует показывать ненайденную привязку явно, а не прятать (`04` §3.1).

### 3.4 Прикладные правила доверия для Decode

1. **Защищать детерминированный расчёт как «корону»** — одна ошибка дороже всего (η² = 0.141). «Calculated, not AI» + видимая формула расчёта (PAIR: partial explanation на конкретный вывод).
2. **Готовить trust-repair заранее:** если расчёт/скан ошибся — экран с объяснением «почему» (η² = 0.086 говорит, что это реально чинит доверие), а не просто «sorry».
3. **Лёгкий cognitive-forcing на high-stakes:** перед «это хороший план» дать «see how we worked this out» — снижает слепое over-reliance, не убивая UX.
4. **Citations + verbalized uncertainty в Q&A** («Based on page 2, looks like… — double-check the highlighted line») вместо «85%» (`04`).
5. **Ноль dark patterns в самом Decode** — для anti-traps продукта это не «nice to have», а условие правдоподобия.

---

## 4. Безоценочный копирайт: do/don't для summary / trap / Q&A

### 4.1 Принципы из FCA (нормативная база UK — обязательна для BNPL-аудитории)

FCA, «Delivering good outcomes for customers in vulnerable circumstances» (опубл. 7 марта 2025, обновл. 3 дек 2025) — good vs poor practice ([FCA](https://www.fca.org.uk/publications/good-and-poor-practice/delivering-vulnerable-customers)):

- **Good:** «communications are clear and written in plain English»; реальный пример — фирма переписала 140 материалов «in clear and intelligible language»; «accessible fonts/font size, bullet points, short sentences»; несколько каналов на выбор.
- **Poor:** перегруз generic-информацией; отсутствие сигнпостинга к помощи; медленные ответы.
- FCA-определение vulnerable: «someone who, due to their personal circumstances, is especially susceptible to detriment, particularly when a firm is not acting with appropriate levels of care» — **значительная часть BNPL 18–25 попадает под это**.

Consumer Duty / consumer understanding: давать «risks equal prominence to benefits, avoid jargon and test that key messages are properly understood», коммуникации тестировать на vulnerable-когортах ([FCA, consumer understanding good/poor practice](https://www.fca.org.uk/publications/good-and-poor-practice/consumer-understanding-good-practice-areas-improvement)). Для Decode: trap-warning и summary должны проходить comprehension-тест на реальных 18–25, а риск нельзя прятать мелким шрифтом «равная prominence».

### 4.2 Принципы из практики debt-charity и compassionate copywriting

StepChange (крупнейшая UK debt-charity) строит весь бренд на «free, impartial and **non-judgmental** advice»; пользователи в отзывах отдельно отмечают «understanding, and non-judgmental approach» ([StepChange](https://www.stepchange.org/), [Trustpilot](https://www.trustpilot.com/review/stepchange.org)). Это эталон тона для Decode.

Конкретные приёмы (Stratton Craig, compassionate financial copywriting — [источник](https://www.strattoncraig.com/insight/the-compassionate-side-of-financial-services-copywriting/)):

- **Word swaps:** «money» вместо «funds»; «easier to manage»; «it can be difficult»; «we understand».
- **Избегать:** юр-жаргона без объяснения; threatening/«thuggish» языка; bold/CAPS-предупреждений «для устрашения».
- **Структура Q&A** (вопросы пользователя как заголовки → ответы ниже) — снижает тревогу, ровно формат Decode Q&A.
- **Цель тона:** оставить человека «okay about things rather than riled up or hopeless».
- Под FCA-направлением: «threatening language… is being discouraged» ([fueler пересказ практики](https://fueler.io/blog/financial-copywriting-made-simple-a-practical-guide)).

### 4.3 Конкретные do/don't для трёх поверхностей Decode

**SUMMARY (plain-English разбор оффера)**

| ❌ Don't | ✅ Do | Почему |
|---|---|---|
| «You signed up for a risky plan.» | «This is a Pay-in-3 plan. Here's how it works for you.» | вина на человеке → reactance (§2.2) |
| «Invalid document.» | «We couldn't read this clearly — a brighter photo will help.» | система берёт вину (§1.2) |
| «APR 39.9%» (голый термин) | «It costs £X extra on top of the price — that's the 'interest'.» | plain English, jargon с объяснением (FCA §4.1) |
| «Funds will be debited.» | «£25 leaves your account on the 1st.» | word swap money/funds (§4.2) |

**TRAP DETECTOR (предупреждение о ловушке)**

| ❌ Don't | ✅ Do | Почему |
|---|---|---|
| «WARNING! You'll be charged!» (CAPS/красный/восклицания) | «Heads-up: a late fee kicks in if you miss the date.» | CAPS/устрашение разрушает доверие, растит тревогу (§4.2, §1.4) |
| «You should have read the small print.» | «This clause is easy to miss — a lot of people don't spot it.» | нормализация vs обвинение (§2.2) |
| Страх без выхода: «This could ruin your credit.» | «Missing this could affect your credit — here's how to avoid it: …» | fear работает только с efficacy/next step (§2.2) |
| Ранжирование: «You're worse than most.» | «This catches a lot of people — now you've seen it.» | social rank демотивирует money-dysmorphic (§2.2) |

**Q&A (ответы с citations)**

| ❌ Don't | ✅ Do | Почему |
|---|---|---|
| «The answer is: yes, definitely.» (over-confident) | «Based on page 2, it looks like yes — double-check the line I've highlighted.» | verbalized uncertainty калибрует доверие (`04` §2.3) |
| «I can't help with that.» (dead-end) | «I couldn't find that in this document. Want me to point you to where to ask?» | сигнпостинг к помощи (FCA §4.1) |
| «Obviously, you owe £X.» | «From what I can read, you owe £X. Here's where that comes from.» | без снисхождения + citation |
| Финсовет: «You should cancel this.» | «Here's what this means for your money. The choice is yours.» | автономия + FCA-граница (не регулируемый совет) |

### 4.4 Тон-чеклист Decode (одной строкой)

Plain English (reading age 9, см. §5) · вина на план/документ/продукт, не на человека · risk = equal prominence, но без CAPS/устрашения · страх только с выполнимым next step · нормализация, не ранжирование · «we understand», «a lot of people» · автономия в конце («the choice is yours») · ноль confirmshaming.

---

## 5. Онбординг-психология для low-literacy 18–25

### 5.1 Реальный уровень читаемости в UK (это не «удобство», это охват)

- **18% взрослых 16–65 в Англии — на уровне Level 1 или ниже** (functional literacy низкая); средний reading age взрослых UK ~12–13 лет ([National Literacy Trust, adult literacy](https://literacytrust.org.uk/parents-and-families/adult-literacy/), [what literacy levels mean](https://literacytrust.org.uk/parents-and-families/adult-literacy/what-do-adult-literacy-levels-mean/)).
- **GOV.UK content design: писать на reading age 9 лет** (≈ UK Year 4–5) ([Typeface Group пересказ GOV.UK guidance](https://thetypefacegroup.co.uk/reading-age-accessible-communication/)). Flesch Reading Ease 60–70 ≈ Grade 7–8, доступно ~85% взрослых UK = «plain English». WCAG 3.1.5 (AAA): если текст требует reading age > 12, дать упрощённую версию.
- Никто не читает T&Cs, и это структурная проблема, а не лень пользователя ([Oxera, who can read T&Cs](https://www.oxera.com/insights/agenda/articles/interminable-who-can-read-tcs/)) — что и есть рынок Decode.

**Вывод:** целевой reading age копии Decode — **9 лет** (GOV.UK), минимум — Flesch 60–70. Это поддаётся измерению (readability-чекер в CI на ключевых строках).

### 5.2 Прогрессивное раскрытие как способ снять когнитивную перегрузку

- Progressive disclosure «reveals information and options as needed, preventing users from feeling overwhelmed» — идеален для онбординга ([UXPin](https://www.uxpin.com/studio/blog/what-is-progressive-disclosure/), [IxDF](https://ixdf.org/literature/topics/progressive-disclosure)).
- Финтех-специфика: «ask only for what's needed, when it's needed, and explain why»; иначе «cognitive load becomes taxing» ([Webstacks fintech UX](https://www.webstacks.com/blog/fintech-ux-design)).
- NN/g (SDT, §1.3): **pull-based помощь > push-based туториал**; не грузить длинным онбордингом, показывать фичи контекстно. Это снимает competence-тревогу.

### 5.3 Конкретика онбординг-копи (CleverTap fintech onboarding + общая практика)

- «Write in plain language and avoid assumptions about financial literacy or technical skill»; «use icons with labels»; «keep the copy actionable and supportive» ([CleverTap, fintech onboarding](https://clevertap.com/blog/onboarding-fintech-app-users/)).
- Объяснять понятия примерами, а не определениями.

### 5.4 Прикладные правила онбординга для Decode

1. **Reading age 9 / Flesch 60–70** на всех первичных экранах; термины («APR», «Pay-in-3») вводить через пример, не определение.
2. **Одна мысль — один экран**, прогрессивное раскрытие; не объяснять Vault/Renewal Radar до первого скана (контекстно, pull-based).
3. **Show, don't tell value first:** дать «выдох» от первого скана (time-to-value) до запроса данных/подписки — competence через успех (NN/g; CleverTap).
4. **Icons + labels**, короткие предложения, bullet points (FCA accessible-format good practice §4.1).
5. **Безоценочная рамка с первого экрана:** онбординг сам должен сказать «no judgement» делом — не спрашивать «насколько ты плох с деньгами», а «paste/snap an offer and we'll decode it».
6. **Автономия темпа:** «Skip» доступен; ничего не заблокировано туром.

---

## Key takeaways for Decode

1. **Главный конкурент удержания — avoidance, не другое приложение.** ~43% Gen Z имеют money dysmorphia, и типичная защита — «not checking accounts to avoid panic» ([GWI](https://globalwellnessinstitute.org/global-wellness-institute-blog/2024/02/27/37336/), [ICANotes](https://www.icanotes.com/2025/07/08/the-psychology-behind-money-dysmorphia-when-self-worth-gets-tied-to-net-worth/)). Дизайн-цель — снизить тревогу настолько, чтобы пользователь досмотрел плохую новость. → calm states, вина на продукт/план, не на человека ([UXDA](https://www.theuxda.com/blog/traditional-ux-fails-in-finance-systemic-ux-for-digital-banking)).

2. **Детерминированный true-cost — это «корона» доверия: защищать ценой всего.** В финансовом human-AI контексте одна видимая ошибка обрушивает доверие (η² = 0.141), а объяснение чинит лишь частично (η² = 0.086) ([Han & Ko 2025, PMC12561693](https://pmc.ncbi.nlm.nih.gov/articles/PMC12561693/)). «Calculated, not AI» стартует с кредитом доверия (AI trust 4.79 > human 4.44) — но кредит сгорает от первой ошибки. Готовить trust-repair экран заранее.

3. **Страх без выхода бесполезен; страх + конкретный шаг работает (слабо).** Fear appeals дают малый эффект (d = 0.29) и усиливаются только efficacy-сообщением ([Tannenbaum et al. 2015](https://socialactionlab.org/wp-content/uploads/2024/01/Tannenbaum_Appealing-to-Fear-A-Meta-Analysis-of-Fear-Appeal-Effectiveness-and-Theories_2015.pdf)). Правило trap-копи: **risk named negatively + solution framed positively + выполнимый next step**. Никогда — голая угроза.

4. **Этичная loss-aversion = посчитанная потеря на плане, в коротком горизонте, без ранжирования.** «£42 more by Christmas» — да; «ты тратишь хуже 80%» — нет (social rank демотивирует money-dysmorphic, [PMC8175460](https://pmc.ncbi.nlm.nih.gov/articles/PMC8175460/)). Избегать extrinsic-геймификации — она подрывает долгую привычку. Decode = nudge, не sludge; собственный UX обязан быть чист от dark patterns (которые сами по себе роняют доверие: reliability 3.26 vs 3.55, [Deceptive by Design](https://www.researchgate.net/publication/392519249_Deceptive_by_Design_Assessing_the_Impact_of_UX_Dark_Patterns_on_Engagement_and_Trust_in_Digital_Products)).

5. **Тон = StepChange + FCA: non-judgmental, plain English, risk с equal prominence, но без CAPS/устрашения.** Word-swaps («money» не «funds»), «a lot of people miss this», «the choice is yours», сигнпостинг к помощи вместо dead-end ([FCA vulnerable customers](https://www.fca.org.uk/publications/good-and-poor-practice/delivering-vulnerable-customers), [Stratton Craig](https://www.strattoncraig.com/insight/the-compassionate-side-of-financial-services-copywriting/)). См. таблицы do/don't §4.3 — готовы к переносу в копи-гайд.

6. **Целевой reading age = 9 (GOV.UK), Flesch 60–70 — измеримо и попадает в реальную UK-аудиторию** (18% взрослых ≤ Level 1, [National Literacy Trust](https://literacytrust.org.uk/parents-and-families/adult-literacy/)). Онбординг: прогрессивное раскрытие, pull-based помощь, value-first (дать «выдох» от первого скана до запроса данных), icons+labels, автономия темпа ([NN/g SDT](https://www.nngroup.com/articles/autonomy-relatedness-competence/), [CleverTap](https://clevertap.com/blog/onboarding-fintech-app-users/)).

7. **Q&A: verbalized uncertainty + citation + автономия** — «Based on page 2, looks like yes — double-check the highlighted line. The choice is yours.» Калибрует доверие, не даёт регулируемого совета, не звучит снисходительно (связка §3 + §4 + `04`).

---

### Связанные файлы ресёрча
- `research/04-ux-ai-trust-patterns.md` — механика UI-доверия (confidence, citations, дисклеймеры, streaming).
- `research/09b-fca-boundary-verified.md` — FCA-граница регулируемого совета (важно для §4.3 Q&A «the choice is yours»).
- `research/11b-user-pains-verified.md` / `research/10b-trap-tc-corpus.md` — боли пользователей и корпус ловушек (вход для копи trap-detector).
- `research/20-accessibility.md` — a11y, пересекается с §5 (reading age, контраст цвета «дорого»).
