# Mobbin research: Notifications & Reminders для Decode

Тема: renewal reminders, price increase alerts, trial ending, alert cards в приложении, notification settings.
Платформа: iOS. Источник: Mobbin MCP (search_screens + search_flows), 10 успешных запросов. Дата: 2026-06-10.

Контекст продукта: Decode — AI-декодер финансовых документов + commitments guardian (Vault + Renewal Radar). Этот отчёт — сырьё для wireframes экранов Renewal Radar, alert-карточек и настроек уведомлений.

---

## 1. Renewal reminders (напоминания о продлении)

- [Uber Eats – Uber One renewal banner](https://mobbin.com/screens/187ba480-60f6-4c72-ade2-8dd72fd53e55) — эталонная анатомия alert-баннера: жёлтая карточка вверху экрана, заголовок «Uber One expires in 20 days. Renew to keep saving», подстрока с точной суммой и датой «You'll be charged $9.99 on Mar 31, 2026 when you renew» + ссылка «See terms», CTA-пилюля «Renew» прямо в карточке. Всё в одном блоке: что случится + когда + сколько + одно действие.
- [Rocket Money – Recurring (Upcoming)](https://mobbin.com/screens/01d9cc58-851a-4e29-9b1b-a6f0bef3b85d) — двухслойная модель «радара»: вверху карточка «Coming Up» с 2-недельным мини-календарём (точки под датами с платежами) и empty-копirайтом «You do not have any recurring charges within the next 7 days»; ниже секция «COMING LATER» — список карточек: иконка сервиса, название, относительный срок «in 9 days», сумма справа, kebab-меню. Подтверждение действия — зелёный toast «Trial Reminder Added».
- [Rocket Money – flow «Adding a free trial reminder»](https://mobbin.com/flows/faab3421-b2a9-4148-8a1e-0aac1dd6564f) — 8 экранов: «+» в навбаре → шит с двумя вариантами «Add a Bill or Subscription / Missing a bill? Add it here» и «Track a Free Trial / Get reminded before the trial ends» → форма (Name с привязкой к сервису и «Detach from service», Bill Date, Schedule «Every month») с календарём-пикером → возврат на радар + toast. Ручное добавление обязательства за ~3 шага.
- [Nutmeg – flow «Setting a reminder»](https://mobbin.com/flows/34cf0cfb-649b-4ca5-a91c-247cefbed3df) — UK-приложение (релевантно рынку Decode): шит «Set a reminder» — цель, Amount (optional), Date and time двумя чипами, Repeat колесом (Daily / Weekly / Fortnightly / Monthly / Every 3 months / Every 6 months / Yearly), большая зелёная CTA «Set reminder»; затем экран «Reminders» со списком карточек (название, дата-время, «Repeats monthly») и кнопкой «New Reminder».
- [Orbit – Subscriptions calendar](https://mobbin.com/screens/954dab6c-e3ed-4104-aae0-e5039bd5012f) — месячный календарь, иконки сервисов прямо в ячейках дат, в шапке агрегаты «$15.10 Total / $5.10 Upcoming». Хорош как альтернативный «calendar view» радара.
- [Orbit – flow «Notifications»](https://mobbin.com/flows/a3574999-0421-43fa-8c19-43b5c28e90bf) — настройки: тумблер «Enable Notifications» с подписью «Get reminders before your subscriptions renew», «Send Test Notification» (задизейблен, пока уведомления выключены — честный disabled-state) и «Send Notification Logs» для отладки.
- [Forest – Manage subscription](https://mobbin.com/screens/66fede2c-593c-4e0a-914c-a1c8859f883e) — карточка плана с «Next renewal date: 1/15/2027» + текст-обещание «you won't be charged if you cancel at least 24 hours before the next renewal date». Дата продления как атрибут карточки плана.
- [Calm – Manage Subscription](https://mobbin.com/screens/2f6d3ea2-ada3-4cf1-9836-a9f1713632ff) — лаконичный блок «Plan Length: 1 year / Renews on: 2025 Dec 18» + ссылка «Cancel Plan» сразу под ним: дата и выход — рядом, без закапывания.

## 2. Price increase alerts (рост цены)

Главный вывод: выделенного паттерна «цена выросла» на Mobbin почти нет — два разных запроса вернули в основном upsell-экраны. Это whitespace: у Decode паттерн придётся собирать из соседних.

- [BlaBlaCar – price change info](https://mobbin.com/screens/541c81db-c5c5-40aa-8730-ddc92da1c080) — полноэкранное info-сообщение «We've updated the price…» с иконкой ⓘ и единственной кнопкой «Got it!» — минимальный acknowledge-паттерн для нефатального изменения.
- [SHEIN – «Why does the price increase?»](https://mobbin.com/screens/240a1c47-8433-4e55-b193-9eca7a98212f) — объяснение роста цены: табы «Reason 01 / 02 / 03 / Other», заголовок-причина, успокаивающий копирайт («Don't worry — your total coupon savings haven't changed»), визуальный пример «было/стало» в две колонки. Образец того, как объяснять разницу цифр.
- [Hyundai Card – asset briefing insight cards](https://mobbin.com/screens/f64b6e51-4d25-45c2-909b-a54721feedac) и [insight card detail](https://mobbin.com/screens/27eb92dd-a4d0-4455-85ec-7f4929ad78f2) — проактивные insight-карточки в ежемесячном «брифинге»: «есть карта, которой вы не пользуетесь 2+ месяца» + годовая комиссия 20 000 KRW + вопрос-CTA «планируете ли пользоваться дальше?». Формат «мы заметили → вот цифра → прими решение» — прямой прототип price-increase alert для Decode.
- [Uber Eats – Uber One banner](https://mobbin.com/screens/187ba480-60f6-4c72-ade2-8dd72fd53e55) — шаблон «сумма + дата + CTA» переиспользуется и для роста цены («с 31 марта будет £X вместо £Y»).

## 3. Payment due reminders (платёж скоро)

- [State Farm – Billing account](https://mobbin.com/screens/eca357fc-99b4-4fcb-a64d-2f9fda264563) — иерархия идеальна: крупная сумма «$178.68», под ней «Due Jan 28, 2026», кнопка «Pay in advance», ниже разбивка «Bill details» по полисам, «Total due», «View bill PDF» (связь с исходным документом!) и статус «AutoPay: Yes / Due date: 28th».
- [Apple Wallet – Autopay](https://mobbin.com/screens/8ff7f827-93e3-461d-8edf-0d5efdee2c19) — контекстная карточка-исключение «February payment will be skipped» с объяснением причины («because you have already paid your monthly balance») прямо внутри настроек автоплатежа. Паттерн «система сама говорит, что платить не надо» — снижает тревожность.
- [Plazo – Próximo pago mensual](https://mobbin.com/screens/ed758320-9a9a-496c-8552-01df80ce7f57) — шит «следующий платёж»: строки «долг всего / минимальный платёж / дата платежа», ниже нумерованный список 1-2-3 «способы оплаты» простым языком. Образец прогрессивного раскрытия условий кредита.
- [Rocket Money – transaction detail](https://mobbin.com/screens/8ce06d32-8b26-4078-bdd8-fd4ea6692428) — тумблер «Is Recurring? Monthly» прямо в карточке транзакции + toast «Manual Bill Added» + кнопка «See Subscription (1)»: пользователь сам помечает обязательство, система подтверждает и даёт переход.
- [ANZ Plus – Ready to pay?](https://mobbin.com/screens/2af4bfce-e01a-43e2-af96-dae8abd6e380) — confirm-карточка платежа с тройкой «Pay On / Recurs / Ends» и inline «Edit» — компактная сводка повторяющегося платежа.

## 4. Trial ending (конец триала)

- [Nibble – trial reminder promise](https://mobbin.com/screens/fb296b02-4eb7-4ecd-926a-077cd88c30b8) — «We'll remind you **2 days** before your free trial ends» + зелёный чип с колокольчиком и конкретной датой «January 24». Конкретная дата в чипе — сильнее абстрактного обещания.
- [Deepstash – reminder promise](https://mobbin.com/screens/a365dfdf-b748-4288-b197-a9a12b8da4e1) — тот же паттерн: «You'll get a reminder 2 days before your trial ends» с большой иллюстрацией колокольчика перед CTA «Try for Free». Снимает страх «забуду отменить» до покупки.
- [Calm – paywall с reminder-тумблером](https://mobbin.com/screens/d3a2e8d0-30b8-461f-8941-093453cc209a) — inline-тумблер «Remind me 2 days before renewal» прямо на пейволле + fallback-блок «Enable notifications in Settings to receive your reminder before renewal» со ссылкой «Open Settings», когда разрешения нет. Редкий пример честной обработки denied-state в месте действия.
- [Mimo – permission priming](https://mobbin.com/screens/34cb07f4-244d-46c6-acab-91ac13a98e3b) — модалка «Your 14 Day trial has started!» с value-объяснением «get notified when your trial is about to end» и кнопками «Remind me / Maybe later»: запрос пуш-разрешения привязан к выгоде, не к запуску приложения.
- [foodpanda – trial end day](https://mobbin.com/screens/d46917e5-0b4b-46e4-b7b2-5c9d6a76e7da) — модалка «Your benefits will end today» поверх «Manage plan & payment», где в плане видно «Trial ends on 10 Jun 2026»; кнопки «Stay pro» (primary) vs «Cancel free trial» (secondary) — пример давления в сторону удержания.
- [Yazio – cancel flow retention](https://mobbin.com/screens/fc420109-4578-4886-80fd-93e41d7bccaa) — «Going so soon? We'll remind you before your plan renews» + чип «Still time to use your Pro perks — 87 days»: обещание напоминания используется как аргумент не отменять сейчас.

## 5. Alert cards / In-app inbox

- [Revolut Business – Inbox](https://mobbin.com/screens/edb54f3a-aa75-4aa4-a6d1-189780851ff9) — карточки, сгруппированные по датам (Nov 20 / Nov 13 / Nov 7), внутри карточки: иконка, заголовок-событие, 2 строки объяснения, инлайн-кнопка действия («Refer a business», «Go to security»). Карточка = событие + следующее действие.
- [Revolut Business – deadline alert](https://mobbin.com/screens/9d3ef00a-ccf1-452b-8da0-7056da578a04) — полноэкранный алёрт «We can't switch your plan yet» с дедлайном («complete the following before 7 Jan 2026 otherwise the switch will be cancelled») и карточкой-чеклистом, что сделать; две кнопки «сделать сейчас / I'll complete them later». Паттерн «дедлайн + чеклист + право отложить».
- [Chime – Inbox](https://mobbin.com/screens/d53aaa1a-6782-45d6-93d4-db937ed5eecc) — лента событий простым человеческим языком: «Upcoming expense», «All paid up!», «Your first message!» — каждая запись: заголовок-итог, 1–2 предложения, дата. Tone of voice: разговорный, без банковского жаргона — близко к голосу Decode.
- [Linear Mobile – Inbox со snooze](https://mobbin.com/screens/3d9ccfd8-2425-49e9-a00b-27189140d3a3) — уведомления с контекстом причины («You asked to be reminded about this issue») и toast «Notification snoozed — Undo»: snooze + мгновенная отмена.
- [Booking.com – inline enable banner](https://mobbin.com/screens/f680d9fc-6ab3-4e75-82e2-e4094b75eae4) — голубой dismissible-баннер в инбоксе «Don't miss important messages…» + ссылка «Turn message notifications on»: ре-актив permission там, где пользователь чувствует ценность.

## 6. Notification settings (настройки уведомлений)

- [Tabby – Notification preferences](https://mobbin.com/screens/9a6c728b-eb31-441d-8f57-23bc238a2d36) — лучший референс для финтеха/BNPL: вверху фиолетовый banner-state «Allow push notifications / Get reminders for payment due dates…» с кнопкой «Go to phone settings» (видно, что системное разрешение выключено); категория «Payments — Stay on top of your purchases and upcoming payments» помечена замком «On» (критичные уведомления нельзя отключить); категория «Deals & offers» — гранулярные тумблеры по каналам SMS / WhatsApp / Push / Email (все off по умолчанию).
- [Runna – Notification Settings](https://mobbin.com/screens/99d89993-3a37-48b3-97d6-95c204d978a4) — у категории «Workout Reminders» есть вложенная строка «Reminder time → 9pm (night before)»: выбор lead-time/времени напоминания прямо в настройках категории. Email Marketing вынесен в отдельный выделенный блок сверху (off).
- [Setel – Notifications](https://mobbin.com/screens/da782010-b01e-4d87-82e6-00f38d36943c) — чистое разделение секций «Push notification» и «Email»; в email транзакционные (receipts, statement — on) отделены от промо (off). Минимальная, понятная IA.
- [Finch – Notifications](https://mobbin.com/screens/fe843928-3466-49b8-ac6b-b4a11f841dc1) — каждый reminder-тумблер показывает своё время («Morning check in — 8:00am»); «Email Notifications — Not Set ›» как явное пустое состояние канала.
- [Spotify for Creators – flow «Updating push notifications»](https://mobbin.com/flows/5a112b18-4fef-4b12-86d6-756b930db161) — серый баннер «Allow push notifications» над списком категорий → кнопка «Allow notifications» → системный диалог → баннер исчезает, тумблеры активны. Состояния экрана до/после разрешения.
- [Angi – flow «Notifications»](https://mobbin.com/flows/9f7cbc56-e95b-4140-b7bf-b5af1e8e078e) — обработка отказа: модалка «Please allow notifications» с инструкцией и кнопкой «Settings» (deep link в iOS Settings) / «Cancel»; настройки сообщений по каналам: email, телефон, push — отдельными тумблерами.
- [Acorns – priming modal](https://mobbin.com/screens/e0ed825e-47d3-4532-b3ee-cd5d00925402) — модалка с иконкой приложения и красным бейджем, копирайт про «important updates to your account», кнопки «Not Now / Enable» — pre-permission перед системным диалогом в финтех-контексте.
- [Udemy – Learning reminders](https://mobbin.com/screens/2d12d2a8-003f-4b02-abf2-b7a73774d206) — reminder-карточка «время + дни недели + статус „Not added to calendar"» и «+ Add a learning reminder»: интеграция напоминания с календарём как опция.

---

## Паттерны-кандидаты для Decode

### Копируем

1. **Анатомия alert-карточки = Uber One banner.** Одна карточка: [что случится] + [через сколько дней] + [точная сумма и дата списания] + [одна CTA]. Для Decode: «Boiler cover renews in 14 days — you'll be charged £312 on 24 Jun» + CTA «Review terms». Цвет фона по severity: amber — дедлайн, red — trap/рост цены, neutral — info.
2. **Двухслойный Renewal Radar = Rocket Money Recurring.** Верх: мини-календарь «Coming Up» на 1–2 недели с точками; низ: «Coming Later» — карточки (иконка документа/категории, имя, «in N days», сумма). Обязателен empty-копирайт в духе «No renewals in the next 7 days» — это позитивное состояние, не пустота. Месячный calendar-view (Orbit) — вторая вкладка, не дефолт.
3. **Trial/intro-rate tracking = Rocket Money «Track a Free Trial».** В «+» радара два пути: «Add from document» (основной, через скан) и «Track manually» (имя, дата, периодичность — шит как у Nutmeg: Date + Repeat-колесо Daily…Yearly). Для wedge Decode это «Intro APR ends» / «0% period ends» — тот же механизм.
4. **Value-first permission priming = Mimo + Nibble.** Просим пуш-разрешение только в момент создания первого reminder, с конкретикой: «Напомним за 2 дня — 22 June» (чип с датой, как у Nibble). Кнопки «Remind me / Maybe later». Никогда не просим на первом запуске.
5. **Настройки = Tabby + Runna.** Категории: «Renewals & deadlines» и «Payment due» — locked On (это ядро продукта-«guardian»), «Tips & product news» — off по умолчанию. У категории Renewals — параметр lead-time как у Runna: «Remind me → 2 days before / 1 week before / evening before». Вверху экрана — banner-state системного разрешения с «Go to phone settings» (Tabby) и денied-flow как у Angi.
6. **Inbox-карточка = Revolut Business + tone of voice Chime.** Группировка по датам, карточка = событие + 1–2 предложения простым языком + инлайн-CTA («Open document», «Set reminder»). Плюс snooze с Undo-toast (Linear) — «напомнить позже» без чувства вины.

### Адаптируем

7. **Price increase alert собираем сами — на Mobbin паттерна нет (whitespace = differentiator).** Конструкция: insight-карточка Hyundai Card («мы заметили → цифра → решение») + сравнение «было £9.99 → стало £12.99 (+30%)» + SHEIN-подобное «Why?» с объяснением причины; у Decode причина подкрепляется source highlighting — подсветкой строки исходного письма/документа. CTA: «See what changed» → diff условий.
8. **Payment due detail = State Farm.** Сумма крупно → «Due [дата]» → разбивка → «View original document» (аналог «View bill PDF») — связывает alert с Vault. Плюс «exception-карточки» как у Apple Wallet («January payment skipped — already covered»): говорить и когда платить НЕ надо.
9. **Обещание напоминания до подписки = Deepstash/Calm — переносим в момент скана.** Когда Decode распознал документ с датой продления, сразу показываем «We'll remind you 2 days before…» с inline-тумблером (Calm) — reminder как побочный продукт скана, нулевое усилие.

### Избегаем

- **Дарк-паттернов foodpanda/Yazio:** модалки-перехваты «Your benefits will end today» с primary-кнопкой удержания и guilt-копирайтом. Decode — на стороне пользователя; в наших алёртах primary-действие = информированное решение пользователя, не наша выручка.
- **Простыни одноуровневых тумблеров (Lex/Hevy):** 10+ переключателей без группировки. У Decode категорий мало — держим 3–4 смысловые группы.
- **Алёрт без следующего шага:** карточка обязана иметь CTA и ссылку на исходный документ; «голые» уведомления (Taco Bell-стиль промо-инбокса) не наш случай.
- **Запроса push-разрешения на onboarding** до того, как пользователь увидел первую ценность (скан → summary).
