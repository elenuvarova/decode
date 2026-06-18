# Mobbin-исследование: Fintech home / dashboard для Decode

**Тема:** subscriptions overview, upcoming payments, headline numbers, commitments cockpit
**Дата:** 2026-06-10 · **Платформа:** iOS · **Источник:** Mobbin MCP (search_screens + search_flows)
**Примечание о методе:** режим `deep` стабильно отдавал таймаут, все запросы выполнены в режиме `fast` (8 запросов, переформулировки относительно исходного списка — исходные формулировки давали нерелевантные «manage my app subscription» экраны).

---

## 1. Subscriptions overview (трекеры подписок)

- [Orbit – Subscriptions home (flow, 4 экрана)](https://mobbin.com/flows/e0d2902c-4de8-4584-856f-c2972b802519) — эталонный «commitments cockpit» без bank connection (как у Decode). Иерархия: вверху hero-визуал (планета с орбитами = подписки), ниже **двойная headline-метрика**: слева счётчик «3» с переключателем сегмента (Personal ⌄), справа «$240.00 Total yearly» с переключателем периода. Список секционирован по статусу: **Free Trials** (с собственным субтоталом $5.05) и **Active**, у секции — сортировка «Next ↑↓». Анатомия строки: логотип сервиса + название + подпись «Renews in 4 days • 28 Nov 2025» (относительная И абсолютная дата вместе) + цена + chevron. Empty state — не пустота, а guided action: карточка «Get started guide — Find your subscriptions». Tab bar: Subscriptions / Calendar / Settings.
- [Orbit – Subscription detail (flow, 3 экрана)](https://mobbin.com/flows/d7c17e15-d253-4903-b667-ca73cc24eae0) — деталка обязательства как bottom sheet: логотип, имя, крупная цена; затем key-value строки (Billing, Free Trial, Next payment, Payment Method, Category, URL); блок **Notes** («Cancel before free trial period ends» — пользовательская заметка-намерение); блок **Price History** с датами и дельтой «↑ $0.05» красным. Два уровня действий: основной CTA «Mark as Cancelled» (фиолетовая кнопка) и тихий деструктив «Delete subscription» текстом.
- [Rocket Money – Subscription overview (flow)](https://mobbin.com/flows/4ba37e27-0d46-4505-8129-8f6c4e2377d9) и экран [Rocket Money – Your Subscription Overview](https://mobbin.com/screens/301a0b9c-d67a-4a7b-b154-23a57f864940) — лучший копирайт-паттерн категории: «We detected **2 subscriptions** costing you a total of **$121 a year**» + строка-мотиватор «Save up to **$96 annually** by canceling just 1 subscription». Деньги выражены как годовая сумма (шокирует сильнее месячной) + конкретное обещание экономии. Во flow также экран «Ready to start saving right away?» с меню задач (Review Subscriptions / Create A Budget / Save For A Goal / Lower A Bill) — превращает обзор в действия.
- [Orbit – выбор стриминговых сервисов в онбординге](https://mobbin.com/screens/deac87fe-f7ef-4452-8deb-f233aada237f) — чек-лист популярных сервисов с логотипами и средними ценами, CTA «See my yearly total»: пользователь получает первую «wow-цифру» до какого-либо ручного ввода.

## 2. Upcoming payments / bills (предстоящие платежи)

- [Afterpay – Your orders](https://mobbin.com/screens/1256bb0e-c477-4d46-80b6-29be1cc9f12b) — лучший headline-паттерн для «сколько я должен»: гигантское «$38.28» с подписью «Total you owe», под ним **три временных среза в колонках**: «$12.76 Due in 15 days / $25.52 Due in 30 days / $38.28 Due in 60 days» (кумулятивно). Ниже segmented-чипы «Upcoming payments / Active orders / History» и список с подписью прогресса «2 of 4 • Sun, Mar 22».
- [Afterpay – Payment schedule](https://mobbin.com/screens/896a8f02-33b2-45e2-8d85-2d30cba028b8) — вертикальный **timeline платежей** с тремя состояниями точек: закрашенная (Paid), контурная («Next payment: Sun, Apr 5 — 3 of 4»), серая (будущий/Cancelled). Сверху честный fee-disclosure: «Includes $0.45 finance fee». Внизу Manage payments + зелёный CTA «Make a payment».
- [Tabby – Pay later purchases (flow)](https://mobbin.com/flows/c6df0267-6180-49bd-8768-4152f524792e) — header-карточка: big number «Due in 30 days», под ним пара вторичных метрик «Due in 7 days / Total to pay», два quick action («View history / Make payment»). Список сгруппирован по датам («5 November»), в каждой строке прогресс «Payment 2 of 6» и **inline-действия «Extend / Pay»** прямо в ячейке.
- [Affirm – Manage (flow, 4 экрана)](https://mobbin.com/flows/e84dd6b7-cd55-4812-b09e-0f9bcdd7e401) — вкладки Active / Past payments + **фильтр-чипы по горизонту: «All / Due this week / Due this month»**; headline «$0.00 TOTAL BALANCE». Empty state не пустой: подсказка «Tip: As you use Affirm and make consistent on-time payments, your spending limit may go up!» — позитивная мотивация вместо вакуума.
- [State Farm – Billing account](https://mobbin.com/screens/eca357fc-99b4-4fcb-a64d-2f9fda264563) — счёт страховой: «$178.68 / Due Jan 28, 2026», CTA «Pay in advance», ниже «Bill details» с построчной разбивкой (Auto $168.51, Renters $10.17) и «Total due», статусные key-value «AutoPay: Yes / Due date: 28th». Хорошая модель для разбора утилит/страховок в Decode.
- [Revolut Business – Bills](https://mobbin.com/screens/99318770-c0d8-4209-a2a4-00a28d75725f) — список счетов со **статусными мини-бейджами поверх аватаров** (часики = «Ready to pay» оранжевым, галочка = «Paid») + search + Filters. Компактная индикация статуса без отдельной колонки.
- [Hyundai Card – блок фиксированных расходов на home](https://mobbin.com/screens/f01a7a05-e733-4a52-a81b-926cdd86529e) — секция «고정비» (fixed costs) на главном экране: сумма + строка платежа с **countdown-бейджем «D-17»** (17 дней до списания) и датой «30일». Лаконичный паттерн срочности для Renewal Radar.

## 3. Home / headline numbers (главный экран, ключевые цифры)

- [Chime – Home](https://mobbin.com/screens/b3938201-b968-4234-babb-205374a8542a) — цветной hero-блок: label «Available» + крупное «$533.23 >» (вся цифра — tap target), под ним контекстная строка-ссылка «$20.00 overdraft coverage ›». Дальше белые карточки (Savings + APY), баннер-карусель, грид «Financial tools». Чёткая трёхуровневая иерархия: одна главная цифра → вторичные карточки → инструменты.
- [Plazo – Home](https://mobbin.com/screens/805bd63f-132c-49f9-bd6f-db184c813c9d) — центрированная композиция: над цифрой мелкий label «Crédito • Disponible», гигантское «1987,18€», под ним вторичная строка «Saldo utilizado: 12,82€». Ниже **ровно три круглых quick action** с подписями, затем «Últimas transacciones» со ссылкой «Ver más». Минимальная, спокойная модель для финансового дома.
- [ANZ Plus – My Accounts](https://mobbin.com/screens/ffef05df-fd86-4a29-b8f4-f914771ced73) — сверху total «$1,784.69» с поясняющим тултипом «Amounts Displayed ⓘ», ниже карточки, сгруппированные секциями по источнику. Паттерн группировки пригоден для Vault (группировка по типу документа).
- [Revolut Business – Home c виджетами](https://mobbin.com/screens/8c5050da-f68f-449d-983f-3c4773ed86f3) — секция «Widgets +»: пользователь сам собирает дашборд из блоков («Total assets» и т.п.). Для MVP Decode — overkill, но идея «cockpit = настраиваемые блоки» полезна на роадмапе.

## 4. Monthly summary / insights (месячная сводка)

- [Wise – Spending](https://mobbin.com/screens/b2d58d78-50f9-45bc-98ba-daa46314b5c2) — селектор месяцев точками-«ягодами» по горизонтали (Sep…Mar, активный залит), пара противопоставленных метрик «0 SGD Avg monthly spend ⓘ» vs «149.36 SGD Spent this month», список категорий: иконка в цветном круге + мини-progress-bar + сумма + % от целого. Сравнение «обычно vs сейчас» — готовый паттерн для «твои обязательства выросли в этом месяце».
- [Apple Wallet – Spending summary](https://mobbin.com/screens/82a32fee-bf5f-4c39-b4b8-0e002de68d4c) — segmented «Week / Month / Year» в navbar, карточка «Total Spending US$12.94» с бар-чартом по дням, toggle «By Category / By Merchant», и внизу — карточка-состояние **«Nothing to Pay — US$0.00 ✓»**: позитивный «all clear» вместо пустого блока. Идеален для Renewal Radar без событий.
- [Chime – February spending](https://mobbin.com/screens/97ed1539-b4e3-4bce-a31b-df0756f97cac) — headline «February spending $2.00», бар-чарт последних 6 месяцев (тап по месяцу = переключение), чипы «Categories / Merchants», строки с progress-bar.
- [Hyundai Card – месячный отчёт расходов](https://mobbin.com/screens/2ccbb302-fd87-4620-8d4f-6bcf2fe2fdec) — отчёт с дисклеймером-«сноской» о методике подсчёта и блоком оценки «насколько полезен инсайт?» (5 звёзд) — паттерн сбора фидбека на AI-выводы.

## 5. Renewal reminders (для Renewal Radar)

- [Opal – выбор времени напоминания](https://mobbin.com/screens/9abbc18a-1b2a-4f57-8e1f-755f50951135) — «When should we remind you before your trial ends?» с радио-опциями, где у каждой указана **конкретная дата**: «2 days before — March 7» / «3 days before — March 6», плюс сноска «Enable notifications to receive this reminder» прямо над CTA. Снимает абстракцию «за N дней».
- [Deepstash – обещание напоминания](https://mobbin.com/screens/a365dfdf-b748-4288-b197-a9a12b8da4e1) — один экран, одна мысль: «You'll get a reminder **2 days** before your trial ends.» — снижение тревоги перед подпиской; та же логика работает для «Decode напомнит до автопродления».

---

## Паттерны-кандидаты для Decode

### Копируем (почти как есть)

1. **Headline «сколько я должен» + временные срезы** (Afterpay): на home Decode — «Committed this month: £214» и под ним три колонки «Due in 7 / 30 / 60 days». Это и есть «commitments cockpit» одним блоком; считается детерминированным движком, без банка.
2. **Двойная метрика count + total с переключателем периода** (Orbit): «6 commitments — £86/mo ⇄ £1,032/yr». Тап по сумме переключает month/year — годовая цифра продаёт ценность.
3. **Секции списка по статусу с субтоталами** (Orbit Free Trials/Active): для Decode — «Trials ending», «Renewing soon», «Active», «Decoded, no action». Субтотал на секции «Trials ending» — главный крючок.
4. **Анатомия строки обязательства** (Orbit): логотип/иконка типа документа + имя + «Renews in 4 days • 28 Nov 2025» (относительная И абсолютная дата) + сумма + chevron. Добавляем слот для trap-флага (⚠︎) — это уже дифференциатор Decode.
5. **Вертикальный timeline платежей с состояниями + fee disclosure** (Afterpay Payment schedule): для деталки BNPL-оффера — точки paid/next/future, «Next payment:» label и строка «Includes £X.XX in fees» как визуализация true cost.
6. **Savings/выгода-framing в копирайте** (Rocket Money): «Decode нашёл 3 ловушки в этом документе. Потенциальная переплата: £96/год». Формула: «detected N … costing you £X a year» + «save up to £Y by doing 1 thing».
7. **«All clear» карточка** (Apple Wallet «Nothing to Pay £0.00 ✓»): когда Renewal Radar пуст — позитивное состояние «Ничего не требует внимания до 28 июня ✓», а не пустой экран.
8. **Reminder-пикер с конкретными датами** (Opal): при добавлении документа в Vault — «Напомнить за 3 дня — 12 июля / за 7 дней — 8 июля» + сноска про разрешение на уведомления.

### Адаптируем

9. **Empty state = guided action** (Orbit «Get started guide», Affirm tip): первый запуск home Decode — не нули, а карточка «Scan your first document — see its true cost in 30 seconds» + список примеров документов (как чек-лист сервисов Orbit, дающий «wow-цифру» до ручного ввода).
10. **Фильтр-чипы по горизонту** (Affirm «All / Due this week / Due this month»): для вкладки Radar/Watch. Адаптация: добавить чип «Has traps» — фильтр по флагам.
11. **Деталка обязательства как bottom sheet** (Orbit detail): key-value строки (источник: извлечённые AI terms — со ссылкой на место в документе, наш source highlighting), блок Notes для намерения пользователя («cancel before renewal»), Price History → у Decode «история версий документа/цены». CTA-пара: основное действие + тихий деструктив.
12. **Сравнение «обычно vs сейчас»** (Wise Avg monthly spend vs Spent this month): «Your usual commitments £86/mo → this month £104/mo» — сигнал, что что-то подорожало/добавилось.

### Избегаем

- **Всё, что предполагает bank linking** (Rocket Money «Linked Accounts», ANZ «Connect accounts») — противоречит ключевому дифференциатору Decode; берём только копирайт-framing, не механику.
- **Home как витрина промо** (Affirm Home с «Shop Dyson», карусель баннеров Chime) — рекламные блоки на главной убивают доверие к «декодеру ловушек», который сам должен быть на стороне пользователя.
- **Перегруз аналитикой** (Revolut Business Analytics: 3+ графика подряд) — cockpit Decode держим на одном headline-блоке + списке; графики максимум один и по тапу.
- **Геймифицированная тёмная эстетика Orbit** (планета/орбиты) — паттерны информации у Orbit отличные, но визуальный язык для UK-аудитории финансового доверия лучше спокойный, светлый, «банковский» (ближе к Wise/Apple Wallet).
- **Скрытие сумм за процентами**: показывать всегда £-цифры (как Afterpay/Tabby), проценты — вторично; пользователь Decode принимает решения в фунтах.
