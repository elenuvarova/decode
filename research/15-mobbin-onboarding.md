# Mobbin Research: Onboarding для fintech+AI (Decode)

Тема: value prop screens, permission priming (camera, notifications), first-action activation, empty states.
Платформа: iOS. Источник: Mobbin MCP (search_screens + search_flows), 8 успешных запросов. Дата: 2026-06-10.

---

## 1. Value proposition screens

### Найденные паттерны

- [Fabric – value prop с квантифицированным результатом](https://mobbin.com/screens/8e162268-9936-4711-a3a8-97277659f8ac) — заголовок-результат с числом («Fabric helps save 250 hours a year on personal projects») крупно по центру, под ним 4 буллета «иконка слева + 1 строка пользы», один чёрный full-width CTA «Continue» внизу. Никакой иллюстрации-обоев — вся иерархия на типографике. Число в заголовке делает обещание проверяемым.
- [Fabric – «Your AI thinking partner»](https://mobbin.com/screens/602199e5-28cc-41e5-bdb2-d39754852566) — слайд карусели: сверху мокап реального экрана продукта (чат с цитатой источника «I got this from ad_spend_Q3 by Emily»), под ним короткий заголовок + 1 предложение. Продукт показан, а не описан — мокап демонстрирует киллер-фичу (ответ со ссылкой на источник) ещё до регистрации.
- [Wise – onboarding flow](https://mobbin.com/flows/8853035c-aba6-493c-81bf-bb06d2f4f0fc) — после splash сразу один экран: иллюстрация + слоган в одну мысль («One account for all the money in the world») капсом + три кнопки (Log in / Register / Sign in with Apple). Ноль каруселей — value prop за 1 экран, мгновенный вход через Apple.
- [Plum – onboarding flow (UK)](https://mobbin.com/flows/18ade3b7-194a-4f37-a165-67940ccdb8bb) — первый экран: «Less Effort, More Money» + строка social proof «Trusted by 1 million people across the UK» + «Sign up for free». Социальное доказательство с географией — прямо релевантно UK-рынку Decode. Дальше во флоу: экран связки банка объясняет, какие именно данные и зачем («Your transactions — this powers my algorithm…»), с подписью «Your data is held securely by Plum in line with UK data protection requirements».
- [Stake – value prop списком с галочками](https://mobbin.com/screens/77d7457c-f9de-4646-b9ec-66370c4d05ae) — заголовок + подзаголовок, затем 3 пункта с чекмарками (benefit жирным + 1–2 строки пояснения), мелкий футнот с условиями. Хороший шаблон для «честного» финтех-тона: выгода + сразу условия.
- [Plazo – слайд безопасности](https://mobbin.com/screens/e7a16b63-5d32-4a7f-ba73-d756c3bb9266) — отдельный слайд карусели целиком про доверие: иллюстрация замка + «Tu seguridad, lo primero» + 2 предложения. Безопасность подана как самостоятельная ценность, а не строка-дисклеймер.
- [Yazio – value prop через сравнение](https://mobbin.com/screens/dbecd219-25ce-4522-b287-92e36d659a4a) — график «мы vs альтернатива» (Restrictive diet красным против Yazio зелёным) + 2 буллета. Паттерн «покажи альтернативу и почему она хуже» — у Decode альтернатива = «читать 12 страниц мелкого шрифта самому».
- [Pi – позиционирование + примеры использования](https://mobbin.com/screens/fa1be339-90a6-4871-ad50-a054b2c71107) — логотип и одна фраза-позиционирование в центре, вокруг — карточки-сценарии с подписями («Help with a decision», «Untangle…»). Сценарии отвечают на «что мне с этим делать» без текста-простыни.
- [Meta AI – «Explore how you can use…»](https://mobbin.com/screens/1213deaa-d66b-4e0a-b1ca-187af335f0d1) — один абзац с конкретными примерами («identifying a plant or translating a restaurant menu») + ссылка «See what you can say» + Continue/Skip. AI объясняется примерами задач, не технологией; Skip всегда доступен.

### Вывод по теме
Сильные value prop в fintech/AI: (1) одно проверяемое обещание с числом, (2) буллеты «иконка + 1 строка», (3) показанный продукт (мокап) вместо абстрактной иллюстрации, (4) отдельный слайд про безопасность/доверие, (5) social proof с географией.

---

## 2. Permission priming — notifications

### Найденные паттерны

- [Linktree – push priming](https://mobbin.com/screens/3a8a4ec3-2009-438a-944e-cf12384a0647) — верх экрана: стопка из 3 мокапов реальных уведомлений (с настоящим копирайтом и временем), затем заголовок-вопрос «Want tips, updates and early-access discounts on the go?», абзац-reassurance «You can mute them at any time in your device notification settings», CTA «Get push notifications» + текстовая «Not now». Образец структуры: показать → объяснить → успокоить → спросить.
- [ChatGPT – «Stay in the loop»](https://mobbin.com/screens/6ca31203-996b-46c7-abbc-ebc8a7486035) — минимализм: заголовок, 1 предложение о триггерах («when ChatGPT completes a task…»), ОДНА карточка-пример уведомления, «Turn on notifications» + «Maybe later». Дешёвый в производстве и не давит.
- [Fixtured – примеры по типам](https://mobbin.com/screens/fac12af3-b7ad-4ea7-a2ef-ab09e53a3d37) — «NEVER MISS A MOMENT» + подзаголовок «Enable notifications to receive:» + 3 карточки-уведомления, каждая = отдельный тип нотификации («Starting in 15 min — reminders before your events start»). Пользователь видит каталог будущей пользы, а не абстрактное «включите уведомления».
- [Vocabulary – priming + контроль настроек](https://mobbin.com/screens/e992e0e3-bea7-4f37-b9bc-5dd096236d7d) — до системного диалога пользователь сам задаёт частоту (степпер «How many: 11x») и окно времени (Start at / End at), CTA «Allow and Save». Контроль до согласия резко повышает acceptance — пользователь разрешает то, что сам настроил.
- [Recime – туториал системного диалога](https://mobbin.com/screens/ea5a13a4-2bcb-4302-b3d4-e370a1d956c1) — заголовок «Tap Allow to get a reminder» (слово Allow выделено синим, как кнопка в диалоге), под ним мокап нативного iOS-диалога, внизу reassurance «Turn off notifications anytime». Прямо дирижирует действием в системном диалоге.

### Вывод по теме
Все сильные примеры запрашивают пуши через pre-permission экран (не сразу системный диалог), показывают конкретные примеры уведомлений и дают мягкий отказ («Not now»/«Maybe later») без чувства вины.

---

## 3. Permission priming — camera

### Найденные паттерны

- [Alan – pre-permission с fallback](https://mobbin.com/screens/61f5f316-3f0b-4e90-aaa3-729b64df4f34) — до системного диалога: заголовок-выгода («One email and boom, it's sent…»), объяснение «We need your permission to access your camera and scan…», primary «Give permission» + secondary «Enter email manually». Ключ: всегда есть ручной путь без камеры — отказ не блокирует задачу.
- [Yuka – контекстный системный запрос](https://mobbin.com/screens/03674a02-7ef8-4b4c-b3ef-b2498fc15ce3) — диалог камеры появляется только когда юзер сам нажал «Scan» в таб-баре; purpose string предметный: «Access to the camera is required to scan the barcode». Запрос в момент намерения — максимальный acceptance.
- [Apple Books – диалог + ручная альтернатива на экране](https://mobbin.com/screens/a652438f-edfd-4a10-a196-b2aba4d0b384) — под системным диалогом постоянная строка «You can also enter your code manually» — fallback виден прямо в момент решения.
- [Docusign – камера с гайдом](https://mobbin.com/screens/1551d31d-09e7-4754-9787-30c187d5c6ae) — экран съёмки документа: тёмный фон, подсказка «Position the document in view» над кнопкой затвора, режим Auto в углу (авто-захват по детекции краёв).
- [Alan – рамка + подтверждение скана](https://mobbin.com/screens/d46574dd-77a3-45b5-82d7-9fc58669ef3d) — зелёная рамка-мишень с галочкой при успешной детекции + одна строка инструкции внизу. Мгновенный success-фидбек в видоискателе.
- Флоу сканирования документов: [Apple Notes – Scanning a document](https://mobbin.com/flows/2e8a3323-9acd-42a7-8514-5ea837aebee2) (вход из меню: Scan Text / Scan Documents / Take Photo / Choose Photo — несколько способов добавить документ), [Dropbox – Adding a scanned page](https://mobbin.com/flows/8fee3032-15d4-4621-a66f-ea9a6a815660) (после снимка — экран ревью: Retake / Add page / Edit / Delete / Arrange, счётчик «2 of 2»), [Freeform – Scanning documents](https://mobbin.com/flows/d24137b6-b143-42b7-bd35-2d9b17e514d3) (статус «Ready for next scan», превью-стопка снятых страниц у затвора).

### Вывод по теме
Камеру не просят в onboarding-карусели — просят в момент первого скана, с предметной purpose string и видимым fallback («загрузить из Фото/Files»). Сканер обязан иметь: подсказку позиционирования, авто-захват, ревью с Retake/Add page (финансовые письма бывают многостраничными).

---

## 4. AI «how it works» / объяснение продукта

### Найденные паттерны

- [Me+ – чат-туториал «Here's how to use me: 1-2-3»](https://mobbin.com/screens/a7b81fe1-3bb4-42ff-ac61-9a528ca0dc76) — первое сообщение ассистента = нумерованный список из 3 способов использования, под ним 3 чипа-подсказки с готовыми запросами («Remind me to…»). Обучение происходит внутри интерфейса использования, чипы убирают проблему «пустого инпута».
- [Alan – «What can you do, Mo?»](https://mobbin.com/screens/25f1d67f-490a-4f1f-bf73-0de5e485d35b) — лонгрид-ответ ассистента о возможностях и границах («AI assistants know a lot, but they can't do everything… Mo can redirect you to our medical team») — честная коммуникация границ AI + эскалация к человеку.
- [Splitwise – «Here's what to expect»](https://mobbin.com/screens/a07716e4-4880-442f-be65-0c8409a5c09d) — перед подключением данных 3 буллета: что произойдёт, «You're in control. Review purchases before…», «Your data is safe… we do not sell your data». Шаблон: механика → контроль → приватность.
- [ANZ Plus – «Before you begin…»](https://mobbin.com/screens/997b7dd3-b39e-4a8a-9b4e-e4ef8898dc80) — прозрачный data disclosure до старта: карточка со списком «что собираем и зачем» + ссылка на Privacy Notice. Тяжеловесно, но для финансовых данных уместен облегчённый вариант.
- [Acorns – контекстное «почему мы это просим»](https://mobbin.com/screens/490fe6b4-8593-4a84-8b29-2be19db8610f) — рядом с чувствительным полем (SSN) — человеческое объяснение причины + ссылка на документ. Снимает страх в момент его возникновения, а не в FAQ.
- [Dave – onboarding flow](https://mobbin.com/flows/41e148d1-56a4-4851-845b-ff5c547feb6b) — один вопрос на экран, прогресс-бар сверху, под каждым полем причина («Your phone number is used to protect your account with two-factor verification»), Face ID priming со «Skip for now», экран подключения банка с альтернативой «I don't have a bank account».

---

## 5. First-action activation

### Найденные паттерны

- [Plum – персонализированный aha-момент](https://mobbin.com/flows/18ade3b7-194a-4f37-a165-67940ccdb8bb) — после анализа данных экран с одним огромным числом «£20.55» и подписью «Based on your income and spending habits, £20.55 is your perfect first amount» + «Confirm deposit». Первое действие подано как персональный, уже посчитанный за пользователя результат — снижает решение до одного тапа.
- [Linktree – setup checklist](https://mobbin.com/screens/81665091-4921-4301-8526-abc5c80149af) — bottom sheet «Your setup checklist 4/6» с прогресс-баром; выполненные пункты зачёркнуты с зелёной галочкой, активный пункт раскрыт с пояснением, почему это важно («Linktrees with at least three links get more engagement!») + кнопки «Add a link» / «Skip». Чек-лист «довыполнения» вместо принудительного wizard.
- [Google Photos – «Unlock the power» 0 of 3](https://mobbin.com/screens/a81bd5ad-cdc3-43e9-b870-7b2d958560bf) — фрейминг чек-листа как «разблокировки возможностей» (прогресс «0 of 3 unlocked»), каждый пункт = фича с тумблером/переходом.
- [Acorns – интерактивный тур-тултип](https://mobbin.com/screens/d8f6d476-96ff-4ad9-aadc-464518baa517) — тултип «Tour 7/7» поверх живого UI, текст призывает сделать действие самому («Slide the acorn… Push it to the end»), не просто посмотреть. Активное обучение жестом.
- [Meta AI – пошаговый туториал первого использования](https://mobbin.com/screens/11067bb6-1bbd-40a0-9be0-5a6445ba11af) — шаг «1/6», крупное фото контекста, одна инструкция «Press the capture button once», Skip внизу. Один шаг = одно действие.
- [Google Photos – coach mark «Select to edit»](https://mobbin.com/screens/906b83f1-3ddd-49fa-9c44-240356e42fbd) — затемнение вокруг целевого объекта + 1 строка «Tap, circle, or brush anywhere…» + пейджер-точки. Прожектор на одном элементе.

---

## 6. Empty states

### Найденные паттерны

- [Fabric – Tasks empty state](https://mobbin.com/screens/8a7fc6ee-52a6-4b54-843d-d8c540ac5d4a) — по центру: кластер цветных иконок, заголовок-глагол «Create your first task», серый сабтекст с пользой («Plan your goals, todos and set reminders»), инлайн-кнопка «+ Create new task» прямо в empty state (дублирует «+» в навбаре). CTA в точке взгляда, а не только в углу.
- [Recime – CTA первого действия сверху](https://mobbin.com/screens/95277a31-8be9-4f87-a465-126ed7f56014) — full-width оранжевая кнопка «+ Add your first ingredient» в верху пустого списка + счётчик «0 items». Формулировка «your first…» нормализует пустоту.
- [Uber Eats – empty state обучает жесту](https://mobbin.com/screens/52cbfea4-e700-4ff5-861c-dea99bb55e45) — иллюстрация карточек с бейджем закладки, заголовок «Tap the bookmark to save», сабтекст объясняет выгоду заполнения («…to compare prices and find cheaper options»), кнопка «Add items». Empty state = мини-туториал механики + причина ей пользоваться.
- [Reminders – empty state обещает магию](https://mobbin.com/screens/052fe281-a17e-421e-92b7-7dc5222aed38) — «Add Grocery Items» + «Items added to this list are automatically categorized into sections» — пустой экран продаёт автоматическую работу системы, которая случится после первого действия.
- [Yazio – связанный empty state](https://mobbin.com/screens/bf9d7bd7-2a63-4c29-b4d2-1d9f70d8323f) — «Add the first recipe to your grocery lists and it will appear here» — объясняет, из какого действия в другом месте приложения наполнится этот экран. Антипаттерн-предупреждение: CTA нет, тупик — действие надо совершать в другом разделе без ссылки туда.

---

## Паттерны-кандидаты для Decode

### Копируем

1. **Welcome-экран по схеме Wise/Plum**: одна строка обещания с числом + UK social proof + мгновенный старт. Прототип копирайта: «Understand any financial document in 30 seconds» / сабтекст «Built for the UK. No bank connection required.» CTA «Scan your first document» + «Sign in with Apple». ([Wise](https://mobbin.com/flows/8853035c-aba6-493c-81bf-bb06d2f4f0fc), [Plum](https://mobbin.com/flows/18ade3b7-194a-4f37-a165-67940ccdb8bb))
2. **Слайд value prop с мокапом продукта (Fabric)**: показать карточку результата скана — 3-sentence summary + trap-флаг + true cost — как изображение внутри onboarding. Продукт виден до регистрации. ([Fabric](https://mobbin.com/screens/602199e5-28cc-41e5-bdb2-d39754852566))
3. **Отдельный слайд доверия (Plazo + Splitwise-копирайт)**: «Your documents stay yours» — 3 буллета: no bank connection / документы хранятся локально-зашифрованно / «we never sell your data». Для финансовых документов это conversion-критично. ([Plazo](https://mobbin.com/screens/e7a16b63-5d32-4a7f-ba73-d756c3bb9266), [Splitwise](https://mobbin.com/screens/a07716e4-4880-442f-be65-0c8409a5c09d))
4. **Camera priming по схеме Alan**: pre-permission экран непосредственно перед первым сканом — «Decode needs the camera to read your document» + primary «Allow camera» + secondary «Upload from Photos / Files». Системный диалог — только после тапа, purpose string предметная. ([Alan](https://mobbin.com/screens/61f5f316-3f0b-4e90-aaa3-729b64df4f34), [Yuka](https://mobbin.com/screens/03674a02-7ef8-4b4c-b3ef-b2498fc15ce3))
5. **Notification priming по схеме Linktree/Fixtured — ПОСЛЕ первого скана**: показать 2–3 мокапа реальных уведомлений Renewal Radar на данных только что отсканированного документа («Your 0% period on the Barclaycard offer ends in 14 days»). Заголовок-выгода «Never miss a deadline buried in the fine print», reassurance «You can mute these anytime», CTA + «Not now». Запрос пуша до первого документа бессмыслен — нечего охранять. ([Linktree](https://mobbin.com/screens/3a8a4ec3-2009-438a-944e-cf12384a0647), [Fixtured](https://mobbin.com/screens/fac12af3-b7ad-4ea7-a2ef-ab09e53a3d37))
6. **Сканер документов = стандарт Apple Notes/Dropbox**: рамка с детекцией краёв, авто-захват, подсказка «Position the document in view», ревью-шаг Retake / Add page (кредитные письма многостраничные). Не изобретать свой паттерн съёмки. ([Apple Notes](https://mobbin.com/flows/2e8a3323-9acd-42a7-8514-5ea837aebee2), [Dropbox](https://mobbin.com/flows/8fee3032-15d4-4621-a66f-ea9a6a815660), [Docusign](https://mobbin.com/screens/1551d31d-09e7-4754-9787-30c187d5c6ae))
7. **Q&A с чипами-подсказками (Me+)**: на экране результата скана — 3 готовых вопроса-чипа: «What's the true cost?», «What happens if I miss a payment?», «Can I cancel early?». Решает проблему пустого инпута и демонстрирует диапазон Q&A. ([Me+](https://mobbin.com/screens/a7b81fe1-3bb4-42ff-ac61-9a528ca0dc76))
8. **Empty states по формуле Fabric/Uber Eats**: глагольный заголовок + выгода + инлайн-CTA. Vault: «Scan your first document — Every document you decode lives here, searchable and watched». Renewal Radar: по схеме Reminders — «Key dates appear here automatically when you scan documents» + ссылка-CTA на скан (не тупик, как у Yazio). ([Fabric](https://mobbin.com/screens/8a7fc6ee-52a6-4b54-843d-d8c540ac5d4a), [Uber Eats](https://mobbin.com/screens/52cbfea4-e700-4ff5-861c-dea99bb55e45), [Reminders](https://mobbin.com/screens/052fe281-a17e-421e-92b7-7dc5222aed38))

### Адаптируем

9. **Aha-момент Plum (£20.55) → результат первого скана**: после первого скана первый экран — не полный отчёт, а ОДНО число: «True cost: £1,247 — that's £319 more than the headline price», и только потом разворот в полную карточку. Один большой инсайт = эмоциональный пик активации. ([Plum](https://mobbin.com/flows/18ade3b7-194a-4f37-a165-67940ccdb8bb))
10. **Setup checklist Linktree/Google Photos → «Get protected» на home**: после первого скана карточка «2 of 4: Scan a document ✓ / Enable renewal alerts / Ask the AI a question / Add a second document», с объяснением пользы у активного пункта. Не использовать до первого скана — сначала единственный путь «Scan». ([Linktree](https://mobbin.com/screens/81665091-4921-4301-8526-abc5c80149af), [Google Photos](https://mobbin.com/screens/a81bd5ad-cdc3-43e9-b870-7b2d958560bf))
11. **Контекстные «почему» Acorns/Dave**: каждое чувствительное место (доступ к камере, хранение документа, e-mail) сопровождать одной строкой причины в момент запроса, а не экраном-дисклеймером. ([Acorns](https://mobbin.com/screens/490fe6b4-8593-4a84-8b29-2be19db8610f), [Dave](https://mobbin.com/flows/41e148d1-56a4-4851-845b-ff5c547feb6b))
12. **Честные границы AI (Alan)**: короткий блок «What Decode can and can't do» в первом Q&A-контакте — confidence-индикатор и «AI can make mistakes — always check the source highlight». Для финансового продукта это и регуляторная гигиена (FCA), и доверие. ([Alan](https://mobbin.com/screens/25f1d67f-490a-4f1f-bf73-0de5e485d35b))

### Избегаем

- **Карусель > 3 слайдов до первого действия.** Plum и Dave растягивают онбординг на 15–31 экран — у них есть регуляторный KYC-повод, у Decode нет. Цель: welcome → (опц. 2 слайда) → первый скан.
- **Запрос обоих permissions подряд.** Камера — в момент первого скана; пуши — после первого сохранённого документа. Никогда на одном экране и никогда до демонстрации ценности.
- **Empty state-тупик (Yazio)**: пустой экран без CTA, отправляющий искать действие в другом разделе. Каждый пустой экран Decode обязан содержать кнопку «Scan».
- **Мокап системного iOS-диалога (Recime)**: имитация системного UI в маркетинговом экране рискованна для App Review и выглядит манипулятивно для финансового бренда — заменяем честным pre-permission экраном.
- **Wizard-настройки до ценности**: выбор целей в стиле MyFitnessPal («What are your goals?») до первого скана — лишний шаг; персонализация Decode выводится из самих документов.

---

## Источники
Все ссылки — Mobbin (iOS): Fabric, Wise, Plum, Dave, Stake, Plazo, Yazio, Pi, Meta AI, Linktree, ChatGPT, Fixtured, Vocabulary, Recime, Alan, Yuka, Apple Books, Docusign, Apple Notes, Dropbox, Freeform, Me+, Splitwise, ANZ Plus, Acorns, Google Photos, Uber Eats, Reminders, Linktree.
