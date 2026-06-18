# Mobbin Research: Document Capture & Processing для Decode

Дата: 2026-06-10. Источник: Mobbin (iOS), инструменты `search_screens` + `search_flows`, ~11 запросов.
Тема: camera scan → crop/confirm → upload/share-sheet → AI processing/loading states.

---

## 1. Камера-сканер: viewfinder и live-guidance

- [Docusign – Scanning a document (flow, 8 экранов)](https://mobbin.com/flows/c97aad30-7ffa-4942-bde1-56a8f83b066a) — эталонная компоновка сканера: верхняя строка `Cancel | flash | filters | Auto/Manual`, подсказка "Position the document in view." сидит НАД шаттером (взгляд и так там), снятая страница появляется миниатюрой слева от шаттера + кнопка `Save` справа — мультистраничность без выхода из камеры.
- [Apple Notes – Scanning a document (flow)](https://mobbin.com/flows/2e8a3323-9acd-42a7-8514-5ea837aebee2) — вход через единое attach-меню (`Scan Text / Scan Documents / Take Photo / Choose Photo / Attach File`); в камере жёлтый overlay в реальном времени заливает найденный документ, авто-шаттер (режим `Auto`), кнопки Flash/Filters/Shutter подписаны словами, не только иконками.
- [Freeform – камера сканера](https://mobbin.com/screens/8230a36d-b509-4c98-b8e1-48e9b617fdc8) — тот же системный VisionKit-паттерн: тёмный полноэкранный viewfinder, одна строка инструкции, подписанные тогглы.
- [Deepstash – scan a book](https://mobbin.com/screens/b97a997b-4e19-41e5-8428-a2262a924953) — corner-bracket рамка + полное предложение-инструкция под рамкой ("Align the book to the marked area, then take a picture to scan it") — копирайт объясняет и «что», и «зачем».
- [Microsoft Outlook – камера](https://mobbin.com/screens/3731a2f2-2022-4d22-b6de-e0282641415b) — карусель режимов `DOCUMENT | PHOTO | WHITEBOARD` над шаттером (паттерн iOS-камеры) + шорткат в галерею в левом нижнем углу.
- [Lovi – Scanning a product (flow)](https://mobbin.com/flows/12e8692d-5da8-40a3-a51d-a48d2d39fa8a) — в камере сверху индикатор квоты "2 scans left" (freemium-механика прямо в момент действия), рядом с шаттером — `How To` (помощь) и галерея; перед камерой — bottom sheet «Make a New Scan» с карточками типов скана (фото + 1 строка описания).
- [Chime – Show the front of the ID](https://mobbin.com/screens/d8106ae5-eec2-478b-8125-e26aa33ddaf9) — плашка-инструкция сверху, постоянная кнопка `HELP` в углу; шаттера нет — чистый авто-захват.
- [ABY Journal – Camera](https://mobbin.com/screens/db5577b5-8a8d-4b2b-9c46-cc631f797f14) — маска в форме документа + заголовок-инструкция "Take a photo of your journal entry"; всего 3 контрола (галерея, шаттер, вспышка).

## 2. Crop / Confirm после захвата

- [Alan – crop scanned page](https://mobbin.com/screens/b4b732bf-6bdb-41a9-83fb-364bc2c54279) — лучший crop: при перетаскивании угла появляется лупа-увеличитель (видно пиксели под пальцем), кнопка `Detect` для повторного авто-определения границ, `Cancel`/`Crop` по углам.
- [Microsoft Outlook – crop](https://mobbin.com/screens/fc6b917c-7715-4469-9f93-6ff572ca485d) — четырёхугольник с угловыми И срединными хэндлами (перспективная коррекция), сбоку — замена фото/повторный скан, внизу миниатюры страниц + галочка-подтверждение.
- [Freeform – crop + confirm](https://mobbin.com/screens/e7cb91e1-8552-430d-bfcf-1c7c21671515) — минимум: рамка с круглыми угловыми хэндлами, `X` слева сверху, цветная галочка справа сверху.
- [Dropbox – Adding a scanned page (flow)](https://mobbin.com/flows/8fee3032-15d4-4621-a66f-ea9a6a815660) — review-экран: счётчик "2 of 2" в навбаре, page-dots под превью, две равные кнопки `Retake` / `+ Add page`, нижний тулбар `Edit / Delete / Arrange`, `Next` — в навбаре.
- [ABY Journal – confirm focus](https://mobbin.com/screens/91c5b49f-97ef-4a80-a225-55e51ccf1fd1) — человеческий копирайт на confirm-шаге: "Lovely writing! Let's confirm it's all in focus." + обнаруженные текстовые блоки подсвечены прямо на превью + одна большая CTA `Scan`.
- [Acorns – Front side captured](https://mobbin.com/screens/5429d052-7fda-4aee-86c2-f8ab05b69e26) — confirm-карточка: превью + вопрос-чеклист качества ("Is all the information ... visible, readable, and glare-free?") + `Submit` (primary) / `Retake` (secondary).

## 3. Upload / share-sheet / альтернативные входы

- [Alan – New claim, upload a first document](https://mobbin.com/screens/567326d5-369b-4876-90fd-d2b46a0410af) — страница с value-копирайтом ("We will thus be able to understand your claim better…"), один dashed-блок `+ Add a document` с примерами типов ("Invoice, prescription, statement, …"), затем bottom sheet `Take a photo / Choose a photo / Choose a file (Image, PDF)` — три входа, камера первая.
- [Fi – Add documents](https://mobbin.com/screens/85873190-10ce-4079-8267-c09316bfb393) — sheet с двумя крупными карточками `Upload files` / `Add photos` (иконка + подзаголовок) + секция "OR USE EMAIL": персональный адрес `smartbox@…` для пересылки документов — третий канал ingestion без приложения.
- [Fabric – Save to… (share extension)](https://mobbin.com/screens/d4e8e186-a1a4-4229-a34e-35500a660741) — входящий share-sheet: пол-экрана, поиск + список папок с чекбоксами, `Cancel`/`Choose`; ещё [компактный Upload-sheet](https://mobbin.com/screens/792e45a6-494e-4f5a-856b-c024bb3d70c9) с указанием destination и `Save`.
- [ChatGPT – Asking with photo (flow)](https://mobbin.com/flows/3c3ad4cf-15fb-49a8-afa0-d396f3605bf8) — «+»-меню композера: плитка-камера + лента последних фото сразу в шите (нулевое трение) + пункт "Add files — Analyze or summarize" с глагольным описанием действия.
- [Expensify – Creating an expense (flow)](https://mobbin.com/flows/96eca170-e2c5-41da-be39-bc51510e7837) — сегментед-контрол `Manual | Scan | Distance` на одном экране создания; permission-state камеры оформлен как иллюстрация + "Take a photo. Camera access is required to take pictures of receipts." + `Continue` — а не голый системный алерт.

## 4. AI processing / loading states

- [Yazio – Analyzing…](https://mobbin.com/screens/8bc58495-13fe-4587-963d-5a3b68553560) — лучший паттерн для Decode: снятое фото остаётся на экране, по нему ходит scan-line, а НИЖЕ уже стоит skeleton будущей карточки результата — пользователь видит и «что анализируем», и «какой формы будет ответ».
- [Lovi – staged progress](https://mobbin.com/screens/d87832ec-d479-4d9a-ab7c-36cee99c6005) — две последовательные строки с чек-иконками и прогресс-барами: "Analysing scan results… → Building a scan report…" — этапность снижает тревожность ожидания.
- [Me+ – Analyzing your risk](https://mobbin.com/screens/9a4176f1-411a-40e3-8c55-da3717676279) — кольцо с процентом (20%) + бегущая строка текущего шага с галочкой ("Analyzing Emotional Well-being ✓").
- [Liven – 54%](https://mobbin.com/screens/9e038bb4-842b-4029-a2a2-e96a809c845d) — крупный процент в кольце + одна строка "Analyzing your test results" на спокойном градиенте.
- [ABY Journal – Analyzing your first entry…](https://mobbin.com/screens/44309c45-156b-4c81-b638-77a7efa96310) — мягкий градиентный «орб» + тонкий прогресс-бар сверху; эмоционально, но без процентов.
- [Splitwise – Importing a receipt (flow)](https://mobbin.com/flows/973eb780-6f72-4489-8bf5-da466a4c4bf3) — "Uploading…" с иллюстрацией-роботом, затем OCR автозаполняет редактируемые поля (HARBOR LANE CAFE / $31.39) и появляется chip `Itemize receipt`.
- [Instagram – Meta AI restyling](https://mobbin.com/screens/3390cde8-e413-4911-b364-b9a3c72535fe) — анимированное поле «звёздочек» + строка статуса внизу; чисто декоративный AI-loading (антипример для финансового контекста — нет ни этапов, ни прогресса).

## 5. Review извлечённых данных (мост к результату)

- [Expensify – Creating an expense using photo (flow)](https://mobbin.com/flows/49a113d4-5959-4b6e-ae99-a4a0a0e917c3) — экран `Confirm details`: фото чека + редактируемые строки Description/Category/Report (chevron'ы) + одна CTA `Create expense`; позже в ленте — оранжевый флаг "Review required", когда AI не уверен.
- [Shell – Transactions summary](https://mobbin.com/screens/91270a8c-25c5-4734-8a77-ee9f9311a8b5) — образец иерархии извлечённых данных: карточка мерчанта сверху, секции с серыми заголовками (Fuel items / Payment method / Total), label слева — значение справа.
- [Airwallex – Receipts ready to review](https://mobbin.com/screens/61307e37-686c-416b-9be2-3faa40622eee) — очередь на ревью: иллюстрация, заголовок, список загруженных файлов с мета (мерчант, дата, сумма) + CTA `Review receipts`.
- [Lovi – результат скана](https://mobbin.com/flows/12e8692d-5da8-40a3-a51d-a48d2d39fa8a) — карточка с badge "80% fit for you ⓘ", три критерия с галочками (High/High/High) и кнопкой `Wrong?` для обратной связи об ошибке AI — паттерн «оценка + объяснение + обжалование».
- [Microsoft Copilot – Asking with image (flow)](https://mobbin.com/flows/87934e7e-23a7-4693-b85a-d8dc75a00c27) — камера с подсказкой "What do you see? Tap below to chat about it"; ответ с нумерованными сносками-источниками [1][2] и списком ссылок под "Learn more" — прообраз Q&A с source highlighting.

## 6. Ошибки и контроль качества скана

- [Chime – Common issues](https://mobbin.com/screens/b5f8b32b-2309-426f-9dbc-5007eaf680ef) — золотой стандарт recovery-экрана: три типовые проблемы (Glare / Blur / Info is not readable), каждая с парой картинок «плохо ✗ / хорошо ✓» и советом-действием; CTA `Ok, try again` + escape hatch "I prefer to capture the photo manually".
- [Alan – Oops! We couldn't find…](https://mobbin.com/screens/714b9f3a-e212-4295-8ca5-85ca0452a47f) — bottom sheet с честным объяснением причины + ДВА выхода: `Try scanning again` (primary) и `Try manual search` (secondary) — всегда есть ручной fallback.
- [Plenty of Fish – Oops, try again](https://mobbin.com/screens/628ee945-209a-403e-8b09-ec4752223c35) — retry-экран с маркированным чеклистом условий хорошего снимка + `Retry verification`.
- [Acorns – Front Capture помощь](https://mobbin.com/screens/dc51018f-6457-4d23-ace9-1aa2f0acb5a5) — обучающая карточка до/во время скана: иллюстрация телефона над документом + 3 буллета («flat surface», «all 4 edges visible») + `Back to Scanning`.

---

## Паттерны-кандидаты для Decode

### Копируем (прямо в wireframes)

1. **Камера = VisionKit-паттерн (Docusign/Apple Notes):** полноэкранный тёмный viewfinder, live-подсветка найденного документа, авто-шаттер с тогглом Auto/Manual, одна строка инструкции над шаттером («Наведите на документ — снимем сами»), миниатюра снятой страницы слева от шаттера + `Done` — кредитные офферы часто многостраничные, мультистраничность обязана жить внутри камеры.
2. **Processing по Yazio:** фото документа остаётся на экране + scan-line + skeleton будущей Decode-карточки (summary / key terms / true cost) под ним. Это одновременно loading и обучение формату результата.
3. **Этапный статус по Lovi/Me+:** 3 шага с галочками — "Читаем документ… → Извлекаем условия… → Считаем реальную стоимость…". Для AI-продукта этапность = доверие; чистый спиннер запрещён.
4. **Confirm details по Expensify/Splitwise:** извлечённые поля (кредитор, сумма, ставка, срок) — редактируемые строки с chevron; пользователь правит ДО того, как движок считает true cost. + флаг "Review required"-типа на полях с низким confidence.
5. **Recovery по Chime:** один экран "Не получилось распознать" с парами плохо/хорошо (блик, размытие, обрезан край) и обязательным escape hatch — «ввести данные вручную» (не теряем пользователя из-за плохой камеры).
6. **Bottom sheet входов по Alan/ChatGPT:** `Снять на камеру / Выбрать фото / Выбрать файл (PDF)` + лента последних фото прямо в шите; под полем — примеры типов документов ("кредитный оффер, письмо о подписке, страховой полис…").

### Адаптируем

7. **Share-extension по Fabric ("Save to…"):** для Decode — упрощаем до «Decode it»: документ прилетел из Mail/WhatsApp/Files → мини-шит с превью + одна CTA «Расшифровать», выбор папки Vault — после результата, не до.
8. **Email-inbox по Fi:** персональный адрес `you@vault.decode…` для пересылки писем от банков/страховых — третий канал ingestion, идеален для subscription letters; в UK много бумажных/email-уведомлений.
9. **Fit-badge + "Wrong?" по Lovi:** их "80% fit for you" превращаем в Decode-вердикт (true cost + trap flags) с ⓘ-объяснением и кнопкой «Нашли ошибку?» — механика доверия и сбора данных для улучшения модели.
10. **Цитирование источников по Copilot:** в Q&A ответы со сносками, но вместо веб-ссылок сноска подсвечивает фрагмент в самом документе (source highlighting) + confidence-метка.
11. **Квота в камере по Lovi ("2 scans left"):** ненавязчивый freemium-счётчик прямо в момент сканирования — лучшая точка апсейла для £3–8/мес, чем paywall до камеры.
12. **Crop по Alan:** лупа при перетаскивании угла + кнопка `Detect` (повторное авто-определение). Но crop показываем только если авто-детекция не уверена — по умолчанию пропускаем шаг.

### Избегаем

- **Декоративный AI-loading без контента (Instagram Meta AI):** красиво, но для финансового решения нужны этапы и предсказуемость, не «магия».
- **Голый системный permission-alert:** делаем pre-permission экран как Expensify (иллюстрация + зачем нужна камера + `Continue`).
- **Обязательный ручной crop на каждом скане (Outlook/Freeform):** для wedge-сценария «сфоткал оффер за 10 секунд» каждый лишний шаг убивает core loop — crop только как fallback.
- **Форма-анкета до захвата (Stake-стиль ID-чеклистов):** не заставляем выбирать тип документа заранее — AI сам классифицирует; выбор типа максимум как подтверждение после анализа.
- **Перегруз камеры контролами:** не больше 3–4 элементов вокруг шаттера (галерея, вспышка, help); режимы — только если появятся реально разные пайплайны.

---

## Карта на core loop Decode

| Шаг loop | Паттерн | Референс |
|---|---|---|
| Scan: вход | Bottom sheet 3 входа + recent photos | Alan, ChatGPT |
| Scan: камера | Авто-захват + live-подсветка + мультистраницы | Apple Notes, Docusign |
| Scan: confirm | Превью + Retake/Add page, crop как fallback | Dropbox, Alan |
| Understand: processing | Фото + scan-line + skeleton + 3 этапа | Yazio, Lovi |
| Understand: данные | Редактируемые извлечённые поля + low-confidence флаг | Expensify, Splitwise |
| Decide | Вердикт-badge + объяснение + "Wrong?" | Lovi, Shell |
| Q&A | Ответ со сносками на фрагменты документа | Microsoft Copilot |
| Ошибки | Плохо/хорошо примеры + ручной ввод | Chime, Alan |
| Альтернативный ingestion | Share-extension + email-inbox | Fabric, Fi |

mobbin_available: true
