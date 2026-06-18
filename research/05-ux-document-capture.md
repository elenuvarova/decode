# UX документ-сканирования на мобильных: бенчмарки и чек-лист capture flow для Decode

Трек: ux-doc-capture · Дата ресёрча: 2026-06-10 · Рынок: UK, iOS-first

Метод: 13+ веб-поисков, официальная документация (Adobe, Apple, Onfido/Entrust, Scanbot, Mitek), Mobbin-флоу реальных приложений (Docusign, Microsoft Teams, Google Drive, Apple Notes, Mercury, Fidelity, Starling Bank). Все существенные факты — с URL. Где данных нет — указано явно.

---

## 1. Ландшафт: кто как сканирует (состояние на середину 2026)

### Adobe Scan — эталон consumer-сканера
- **Auto-capture по умолчанию**: пользователь наводит телефон на документ, приложение само захватывает кадр, когда документ в фокусе; live edge detection отмечает углы документа точками/рамкой в реальном времени. Источник: [Adobe Scan iOS docs](https://www.adobe.com/devnet-docs/adobescan/ios/en/scan.html), [обзор](https://www.local.com/scanner-apps/reviews/adobe).
- Edge detection срабатывает за ~2 секунды на стандартном документе; итоговый searchable PDF с OCR — суммарно менее 10 секунд (данные из сравнительного обзора [DroidLore](https://droidlore.com/productivity/productivity-apps-documents); 4.8★ при 100M+ установок).
- **Capture-модель "снимай всё подряд, правь потом"**: страницы копятся (thumbnail-счётчик), затем один шаг "Review and save" → Modify: crop с drag-handles + кнопка **Auto-Detect** (вернуть авто-границы), rotate, resize, фильтры brightness/contrast, **Magic eraser** (затирает пальцы/пятна/складки), reorder страниц через long-press по thumbnail и multi-select. Источники: [Modify your scans (iOS)](https://www.adobe.com/devnet-docs/adobescan/ios/en/modify.html), [TechRadar review 2025](https://www.techradar.com/pro/software-services/adobe-scan-2025-review).
- Отдельные capture-типы: Document, Whiteboard, Book, Business Card, ID Card — пресеты меняют поведение рамки и обработку.

### Microsoft Lens — РИП (важно для конкурентного ландшафта)
- Microsoft Lens **выведен из эксплуатации**: phased retirement с 15 сентября 2025, удалён из сторов к середине ноября 2025, создание новых сканов отключено **после 15 декабря 2025**. Замена — сканирование внутри Microsoft 365 Copilot app, причём с потерей фич (business card → OneNote, прямой экспорт в Word/PowerPoint, Immersive Reader). Источники: [Windows Forum](https://windowsforum.com/threads/microsoft-lens-retirement-migrate-scanning-to-microsoft-365-copilot-by-dec-2025.377066/), [Thurrott](https://www.thurrott.com/mobile/324444/microsoft-lens-is-losing-its-job-to-ai), [Borncity](https://borncity.com/win/2025/08/09/microsoft-lens-app-is-being-discontinued/).
- Вывод для Decode: один из двух главных "бесплатных дефолтов" сканирования ушёл с рынка; паттерн Lens (карусель режимов PHOTO | DOCUMENT | WHITEBOARD + тумблер "Let me adjust border after each scan") живёт в Microsoft Teams — виден на [Mobbin-флоу Teams](https://mobbin.com/flows/075c15ab-217c-40cf-8fcb-fa53466ca76d).

### Apple Notes / Files (VisionKit) — системный стандарт iOS
- UX: entry-point "Scan Documents" из меню вложений; в режиме **Auto** документ захватывается сам, как только определены границы страницы (желтоватый overlay поверх найденного документа); в **Manual** — кнопка затвора или volume buttons, затем drag углов рамки → **Keep Scan / Retake**. Страницы добавляются подряд, в конце "Save" с количеством страниц; результат — PDF в заметке. Источники: [Apple Support](https://support.apple.com/en-us/108963), [iPhone User Guide](https://support.apple.com/guide/iphone/scan-text-and-documents-iph653f28965/ios), [Mobbin-флоу Apple Notes](https://mobbin.com/flows/2e8a3323-9acd-42a7-8514-5ea837aebee2).
- Для разработчика это `VNDocumentCameraViewController` (VisionKit): из коробки — авто-детекция документа, auto-capture, multi-page (автоматически заводит новые страницы), perspective correction, enhancement. **Ограничение: почти нулевая кастомизация UI** (нельзя поменять цвета кнопок, добавить свои подсказки/брендинг). Источники: [Apple Developer](https://developer.apple.com/documentation/visionkit/vndocumentcameraviewcontroller), [разбор fatbobman](https://fatbobman.com/en/posts/docscaner/), [сравнение WeScan vs VisionKit, Scanbot](https://scanbot.io/blog/ios-document-scanners-wescan-vs-visionkit/).
- Тот же системный UI используют Docusign и Google Drive iOS: верхняя панель `Cancel · Flash · Filters · Auto/Manual`, подсказка **"Position the document in view."**, синяя заливка/рамка на найденном документе, thumbnail снятой страницы слева внизу + кнопка Save; review-экран `Done / Retake` с фильтрами (Color, Grayscale, B&W, Photo), crop, rotate, delete. Видно на [Mobbin: Docusign](https://mobbin.com/flows/c97aad30-7ffa-4942-bde1-56a8f83b066a) и [Mobbin: Google Drive](https://mobbin.com/flows/e04d72ef-1994-4969-a34a-b5f5de4873a5).

### Dext (ex-Receipt Bank) — чеки/инвойсы, три режима камеры
- **Single Mode** — один одностраничный документ; **Multiple Mode** — до 50 фото за сессию, каждое фото = отдельный item (пачка чеков); **Combine Mode** — до 50 фото склеиваются в один multi-page item (длинный чек, многостраничный инвойс). Источник: [Dext Help Centre](https://help.dext.com/en/articles/105670-how-to-scan-and-upload-documents-in-the-dext-mobile-app).
- Вывод: разделение "много документов за раз" vs "один документ на много страниц" — критичный выбор, который нельзя прятать; Dext делает его явным переключателем режима камеры.

### Expensify SmartScan — антипаттерн скорости, паттерн асинхронности
- Capture минимальный: открыл приложение → зелёная кнопка камеры → снял → всё. Дальше OCR работает **асинхронно**: официально "от нескольких минут до нескольких часов" в зависимости от качества чека и нагрузки; позиция компании — "SmartScan is optimized for accuracy over speed"; при низкой уверенности OCR результат проверяет живой человек. Источники: [Expensify Community FAQ](https://community.expensify.com/discussion/4715/faq-why-is-smartscan-taking-a-long-time), [SmartScan 101](http://docs.expensify.com/en/articles/2897-smartscan-101).
- Статусные ярлыки на карточке расхода ("Checking" → "SmartScanning") позволяют закрыть приложение и жить дальше — fire-and-forget. Альтернативные входы: форвард на receipts@expensify.com и SMS на 47777. Источник: [How to upload a receipt](https://use.expensify.com/blog/how-to-upload-receipt).
- Вывод: асинхронность приемлема для бухгалтерии, но НЕ для Decode — наш core loop "Scan → Understand → Decide" требует ответа в одной сессии; часы ожидания убьют wow-момент.

### Cheque deposit (банки) — самый "выдрессированный" capture в финтехе
- **Mitek MiSnap** — индустриальный стандарт США (4 из 5 топ-банков): real-time feedback до тех пор, пока не получен пригодный кадр, затем **автоматический захват**; "the entire process takes only seconds"; авто-захват резко снизил долю отклонённых изображений и сделал первый опыт успешным. Источники: [Mitek press](https://www.miteksystems.com/press-releases/mitek-misnaptm-mobile-auto-capture-improves-mobile-depositr-user-experience-at-ten), [Mitek Mobile Deposit](https://www.miteksystems.com/mobile-deposit), [Mitek blog](https://www.miteksystems.com/blog/the-mitek-mobile-depositr-advantage-part-ii-clean-images-in-great-data-out-with-misnap).
- **Fidelity** (US): landscape-капчер с текстом-инструкцией "Center the check on a dark surface, provide ample light. Align check. **We will take the photo for you.**" — авто-захват прямо обещан в подсказке ([Mobbin: Fidelity](https://mobbin.com/flows/ad0e94f5-742c-458b-b3d3-1599f015400e)).
- **Starling Bank** (UK) — лучший образец error recovery: corner brackets + лейбл "Front of cheque"; при неудаче — отдельный экран **"We encountered some problems with the photos. We can't find the edges of the cheque."** с иллюстрированными исправлениями ("Make sure the cheque fits inside the frame", "Place the cheque on a darker background so there is more contrast") и кнопкой **Try again**. Жёсткие правила (cheques >£1,000 must be posted) показаны до съёмки. [Mobbin: Starling](https://mobbin.com/flows/e217c877-6123-48f8-a4e2-9e8765f9bf69).
- **Mercury**: capture встроен в форму депозита (amount → Front/Back слоты с иконкой камеры → инструкции по indorsement → Deposit) — пример "камера как поле формы" ([Mobbin: Mercury](https://mobbin.com/flows/8152317b-5244-47cf-802f-c8c076eed94d)). Контекст по шагам депозита и hold-уведомлениям: [Bank of America](https://info.bankofamerica.com/en/digital-banking/mobile-check-deposit), [Wells Fargo FAQ](https://www.wellsfargo.com/help/mobile-features/mobile-deposit-faqs/).

### ID-скан в финтех-онбординге (Monzo, Revolut, Onfido)
- **Monzo**: двухшаговая верификация — фото ID-документа, затем видео-селфи с фразой "Hi, my name is …, and I want a Monzo Bank account". После accessibility-редизайна (работа с незрячими, BSL-пользователями, нейроотличными) — **снижение ошибок IDV-селфи на 73%**. Источники: [Monzo blog: video selfie](https://monzo.com/blog/2019/08/28/take-a-video-selfie-to-sign-up-for-monzo), [Monzo blog: accessibility](https://monzo.com/blog/making-identity-verification-more-accessible), [Mobbin: Monzo IDV flow](https://mobbin.com/explore/flows/b8ed84b4-a36d-4da2-acf9-7709d5600bd1).
- **Revolut** (на Onfido): выбор типа документа из нативного списка (Passport / Driving licence / National ID / UK BRP) → страна из searchable-списка с флагами → камера с framing guide и ссылкой на photo guidelines → real-time проверка чёткости, blurry captures флагуются сразу → review-экран **"Use this photo / Retake photo"**. Источники: [разбор онбординга](https://craftinnovations.global/banking-onboarding-best-practices-revolut-nubank-monzo/), [PageFlows: Revolut onboarding](https://pageflows.com/post/ios/onboarding/revolut/).
- **Onfido (Entrust) Smart Capture SDK** — цифры, оправдывающие инвестиции в capture-качество: real-time on-device glare/blur detection + auto-capture; **>90% first-time pass rate** и **+20% к успеху захвата документа/селфи с первой попытки**; 95% проверок Atlas — быстрее 10 секунд. Accessibility встроена (screen reader labels, dynamic font scaling, контраст, touch targets). Источники: [Onfido press release](https://onfido.com/press-release/onfido-real-identity-platform-improves-performance-by-12x-with-fully-automated-end-to-end-identity-verification/), [Businesswire](https://www.businesswire.com/news/home/20220525005153/en/Onfidos-Real-Identity-Platform-Improves-Performance-by-12x-with-Fully-Automated-End-to-End-Identity-Verification), [onfido-android-sdk README](https://github.com/onfido/onfido-android-sdk).

---

## 2. Паттерны по темам

### 2.1 Auto-capture vs manual shutter
- Консенсус всех изученных продуктов (Adobe, Apple, Mitek, Onfido, Scanbot): **дефолт — auto-capture, manual — всегда доступный fallback** (тумблер Auto/Manual в системном iOS-сканере; в Scanbot SDK при включённом auto-snapping кнопка затвора остаётся рабочей). Авто-захват снимает главный источник брака — смаз от нажатия и неверный момент съёмки. Источники: [Scanbot docs: auto-snapping](https://docs.scanbot.io/cordova/document-scanner-sdk/features/document-scanner/document-scanner-ui/), [Apple Support](https://support.apple.com/en-us/108963).
- Тонкости из Scanbot SDK: sensitivity авто-захвата 0.66–0.8 (0–1), задержка после автофокуса (`delayAfterFocusComplete`), чтобы не снять до завершения фокусировки. Источник: [Scanbot docs](https://docs.scanbot.io/android/document-scanner-sdk/classic-ui/scanning-ui/).
- Авто-захват + авто-кроп дают измеримый бизнес-эффект: Onfido — >90% first-time pass; Scanbot — правильные форматы/фильтры повышают долю автоматически обработанных документов на **22%+** ([Scanbot insurance case](https://scanbot.io/blog/insurance-mobile-app-development-3-factors-for-a-high-automated-processing-rate/)).

### 2.2 Edge detection overlay и real-time guidance
- Два визуальных языка: (а) **заливка/рамка по контуру найденного документа** (синяя у Google Drive/VisionKit, жёлтая в Apple Notes) — "я тебя вижу"; (б) **статические corner brackets** как цель (Starling cheque) — "помести документ сюда". Для произвольных документов лучше (а), для документов фиксированного формата (cheque, ID) — (б).
- Текстовые live-хинты обязательны: "Position the document in view." (VisionKit), "move closer" / "adjust angle" (Scanbot), "Center the check on a dark surface, provide ample light" (Fidelity). Источник: [Scanbot: best document scanner SDK](https://scanbot.io/blog/best-document-scanner-sdk/).
- Real-time проверка качества до захвата: glare/blur detection on-device (Onfido), Document Quality Analyzer с рейтингом very poor → excellent и принудительным re-scan ниже порога (Scanbot, [quality control](https://scanbot.io/blog/document-scan-quality-control-system/)).

### 2.3 Multi-page документы
- Паттерн VisionKit/Adobe: после захвата страницы камера НЕ закрывается — thumbnail с бейджем-счётчиком копится в углу, пользователь листает документ и снимает дальше; завершение — одна кнопка Save/"Review and save".
- Управление страницами — на review-этапе: reorder через long-press + drag по thumbnail-сетке, удаление, добавление страниц ([Adobe Modify docs](https://www.adobe.com/devnet-docs/adobescan/ios/en/modify.html)).
- Развилка Dext (Multiple vs Combine) важна и для Decode: "5 страниц одного credit agreement" ≠ "5 разных писем". У Decode wedge-документы часто многостраничные (кредитные договоры), поэтому дефолт — Combine-семантика (страницы = один документ), с явной кнопкой "New document".

### 2.4 Review / retake
- Канонический review-экран: полноэкранный превью + `Retake` и `Keep/Done/Use this photo` (VisionKit "Keep Scan / Retake", Revolut/Onfido "Use this photo / Retake photo").
- Две школы: **per-page review** (Lens/Teams: тумблер "Let me adjust border after each scan" — ручная рамка после каждого кадра) vs **batch review** (Adobe: снял всё → правишь пачкой). Adobe-модель быстрее для многостраничных документов; per-page надёжнее для одностраничных критичных (ID, cheque).
- Лучший error-экран — Starling: конкретная диагностика ("can't find the edges") + 2 иллюстрированных совета + Try again. Не "Error", а инструкция.

### 2.5 Crop / rotate / фильтры
- Минимальный набор (системный iOS-сканер): drag-handles по 4 углам + midpoints, rotate, выбор фильтра (Color / Grayscale / B&W / Photo), delete.
- Adobe сверх того: Auto-Detect (вернуть авто-кроп одной кнопкой — снимает страх "испортить"), brightness/contrast, Magic eraser. Для Decode достаточно минимального набора: цель — не красивый PDF, а читаемый для AI документ.

### 2.6 OCR error correction UX
- Базовые паттерны (из enterprise-OCR и патентов):
  1) **Side-by-side / overlay verification** — извлечённое поле показывается рядом с подсвеченным фрагментом оригинального изображения, не закрывая его ([патент US10387742](https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/10387742));
  2) **Confidence-based highlighting** — поля/символы ниже порога уверенности подсвечиваются и флагуются для проверки человеком ([Blue Prism Decipher: field confidence](https://documentation.blueprism.com/decipher-2-4/en-us/user-guide/field-confidence.htm), [Cflow: invoice OCR](https://www.cflowapps.com/invoice-ocr/));
  3) предложение top-2 вариантов распознавания для низкоуверенных значений с выбором tap'ом.
- Consumer-паттерн (Expensify): не показывать пользователю "сырой OCR" вообще — показывать уже извлечённые структурированные поля (merchant, date, amount), редактируемые tap'ом, с фоллбэком на human review.
- Для Decode это сшивается с уже заявленным дифференциатором "source highlighting": tap по key term → подсветка места в скане. Тот же механизм = механизм коррекции: "не так? исправь и посмотри, откуда я это взял".

### 2.7 Состояние "обрабатываем": сколько секунд терпит пользователь
- Классические пороги Nielsen: **0.1 c** — мгновенно; **1 c** — поток мысли сохраняется; **10 c** — предел удержания внимания на диалоге; дольше — пользователь хочет переключиться и ему нужен percent-done индикатор. Looped spinner — для задержек **2–9 c**, **percent-done / этапный progress — от ~10 c**. Источники: [NN/g: Response Time Limits](https://www.nngroup.com/articles/response-times-3-important-limits/), [NN/g: Progress Indicators](https://www.nngroup.com/articles/progress-indicators/).
- Исследование tolerable waiting time: терпимость к веб-ожиданию ~15 c максимум, satisfaction резко падает после ~12 c ([Nah, 2004, ResearchGate](https://www.researchgate.net/publication/220893869_A_Study_on_Tolerable_Waiting_Time_How_Long_Are_Web_Users_Willing_to_Wait)).
- **Labor illusion** (Buell & Norton, HBS, Management Science 2011): при "operational transparency" — показе того, ЧТО система делает ("checking 264 websites…", как Kayak), — пользователи предпочитают сервис с ожиданием 8–30 c мгновенному и больше ему доверяют. Для Decode это подарок: этапы "Reading the document → Extracting key terms → Calculating true cost → Checking for traps" сами по себе продают ценность и повышают доверие к вердикту. Источники: [HBS paper](https://www.hbs.edu/ris/download.aspx?name=Norton_Michael_The+labor+illusion+How+operational.pdf), [Fast Company](https://www.fastcompany.com/3061519/the-ux-secret-that-will-ruin-apps-for-you).
- Бенчмарки конкурентного окружения: Adobe Scan — OCR+PDF < 10 c; Onfido — 95% проверок < 10 c; Expensify — минуты-часы (приемлемо только из-за асинхронной модели). Целевой бюджет Decode: **summary first token ≤ 5–8 c, полный разбор ≤ 15–20 c со стримингом по секциям**, никогда — пустой spinner дольше ~3 c.

### 2.8 Share-sheet вход (PDF из email)
- Второй вход в продукт наравне с камерой: PDF из Mail/WhatsApp/браузера через iOS Share Extension. Требования Apple HIG: extension лёгкий и быстрый (не тормозить share sheet), поддерживать только нужные типы данных (PDF, изображения), не заставлять скроллить, дать минимум нужных опций (превью вложения, выбор папки/типа документа). Источники: [Apple HIG: Sharing and actions](https://developer.apple.com/ios/human-interface-guidelines/extensions/sharing-and-actions/), [App Extension Programming Guide](https://developer.apple.com/library/archive/documentation/General/Conceptual/ExtensibilityPG/Share.html).
- Паттерн "канал на каждый источник" (Expensify): камера + share sheet + email-in адрес (receipts@expensify.com) + SMS. Для Decode на MVP: камера + share sheet + photo library; email-in — фаза 2 (сильно для subscription letters, приходящих почтой).
- Внутри share extension не делать полный разбор — принять файл, показать мгновенное подтверждение ("Added to Decode — analysing…") и продолжить в основном приложении/push.

---

## 3. Идеальный capture flow для Decode — пошаговый чек-лист

Цель: пользователь с бумажным credit/BNPL-оффером получает 3-sentence summary быстрее, чем успевает усомниться. Бюджет: capture ≤ 10 c, понимание ≤ 20 c.

### Шаг 0 — Входы (все ведут в один pipeline)
- [ ] Камера (главная CTA на home, доступна с первого экрана, ≤ 1 tap).
- [ ] Share Extension: принимает PDF + изображения; мгновенный acknowledgment, разбор продолжается в приложении.
- [ ] Photo library / Files picker (скриншоты офферов — частый кейс).
- [ ] Первый запуск: 1–3 свайп-карточки "как снимать" (плоско, контрастный фон, хороший свет) — по рекомендации Scanbot обучать ДО первой съёмки, но с кнопкой Skip.

### Шаг 1 — Камера
- [ ] **Auto-capture по умолчанию + тумблер Auto/Manual** в верхней панели (паттерн VisionKit); manual shutter и volume buttons всегда работают.
- [ ] **Live edge detection overlay**: подсвеченный контур найденного документа (не статические brackets — документы произвольного формата).
- [ ] Текстовые live-хинты одной строкой: "Position the document in view" → "Move closer" → "Hold still…"; сообщения о качестве (glare/blur/low light) ДО захвата, не после.
- [ ] Авто-захват: пауза после автофокуса, лёгкий haptic + звук затвора при срабатывании; sensitivity консервативная (лучше полсекунды дольше, чем смаз).
- [ ] Flash toggle; тёмный фон-виньетка вокруг детекции, чтобы фокусировать взгляд.

### Шаг 2 — Multi-page по умолчанию
- [ ] После захвата камера остаётся открытой; thumbnail с бейджем-счётчиком страниц в углу (паттерн VisionKit/Adobe).
- [ ] Семантика Combine (страницы = один документ); отдельная явная кнопка/жест для "это другой документ".
- [ ] Подсказка после 1-й страницы: "More pages? Keep scanning — or tap Done".

### Шаг 3 — Review (лёгкий, не блокирующий)
- [ ] Batch-review по модели Adobe: сетка thumbnails → Done; per-page рамку не навязывать.
- [ ] На превью: drag-handles crop + **Auto-detect** (восстановить авто-кроп), rotate, delete, retake. Фильтры — максимум авто-enhance; не делать "фотолабораторию".
- [ ] **Авто-проверка качества до отправки в AI** (Scanbot Document Quality Analyzer-паттерн): если страница нечитаемая — экран в стиле Starling: "We can't read page 2" + 2 иллюстрированных совета + "Retake page 2". Никогда не пускать заведомый брак в анализ — фейл AI пользователь спишет на AI, а не на фото.

### Шаг 4 — Processing ("Decoding…")
- [ ] Этапный progress с operational transparency (labor illusion): "Reading document → Extracting key terms → Calculating true cost → Checking for 12 known traps". Этапы — реальные, не фейковые задержки.
- [ ] **Стриминг результата**: 3-sentence summary появляется первым (цель ≤ 8 c), key terms/true cost/traps догружаются секциями ниже. Не держать пользователя перед пустым экраном до полной готовности.
- [ ] Если > 20 c (плохой скан, длинный договор): предложить "We'll notify you when it's ready" + push — но это fallback, не норма.
- [ ] Скелетоны секций вместо второго спиннера.

### Шаг 5 — Результат + коррекция OCR
- [ ] Каждый extracted key term — tap → **подсветка исходного фрагмента в скане** (side-by-side паттерн; он же — source highlighting из core-фичи).
- [ ] **Confidence-based выделение**: поля с низкой уверенностью помечены ("Check this — we're not sure about the APR") и редактируемы inline; правка пересчитывает true cost детерминированным движком мгновенно.
- [ ] Кнопка "Looks wrong? Fix it" у каждого числа — редактирование значения, не пересканирование, как первый уровень исправления.

### Шаг 6 — Сохранение в Vault
- [ ] Авто-сохранение без вопроса "сохранить?"; авто-имя по содержимому ("Klarna BNPL offer — 14 May 2026"), а не "Scan 2026-06-10" (антипаттерн Google Drive "Scanned 6 Jan 2026 at 9:28 AM").
- [ ] Сразу — предложение дат для Renewal Radar, извлечённых из документа ("Promo rate ends 14 Nov — remind you?").

### Технологическая развилка (для команды)
- MVP-вариант A: системный `VNDocumentCameraViewController` — бесплатно, auto-capture/multi-page/crop из коробки, но без кастомных хинтов, брендинга и качества-гейта ([ограничения](https://scanbot.io/blog/ios-document-scanners-wescan-vs-visionkit/)).
- Вариант B (после PMF-сигнала): кастомная камера (VisionKit `VNDetectDocumentSegmentationRequest` / коммерческий SDK типа Scanbot) ради live-хинтов, quality gate и единого бренд-опыта. Onfido-цифры (>90% first-time pass с умным захватом) — аргумент, что capture-качество = конверсия.

---

## Key takeaways for Decode

1. **Auto-capture — дефолт, manual — fallback.** Это консенсус Adobe/Apple/Mitek/Onfido; авто-захват напрямую двигает конверсию первой сессии (Onfido: >90% first-time pass, +20% first-attempt success).
2. **Системный iOS-сканер закрывает MVP, но не дифференцирует.** VisionKit даёт auto-capture, edge detection, multi-page и crop бесплатно — стартовать с него; кастомную камеру строить только ради quality gate + бренд-хинтов.
3. **Качество-гейт до AI-анализа обязателен.** Ошибку анализа по смазанному фото пользователь припишет "тупому AI". Паттерн Starling: конкретная диагностика + иллюстрированный совет + Try again.
4. **Multi-page = Combine-семантика по умолчанию** (кредитный договор — один документ), явная кнопка "новый документ" (урок Dext: Single/Multiple/Combine нельзя прятать).
5. **Processing — главный момент продажи доверия.** Этапный прогресс "Reading → Extracting → Calculating → Checking for traps" (labor illusion, HBS 2011) + стриминг: summary ≤ 8 c, всё остальное секциями ≤ 20 c. Пустой спиннер дольше 3 c запрещён. Антипример — Expensify (минуты-часы).
6. **OCR-коррекция = source highlighting.** Один механизм решает обе задачи: tap по термину → подсветка в скане; low-confidence поля помечены и редактируемы inline; правка мгновенно пересчитывает true cost.
7. **Share sheet — равноправный вход.** PDF из email — половина wedge-кейсов (офферы приходят письмом); extension лёгкий: принял → подтвердил → разбор в приложении. Email-in (паттерн Expensify) — фаза 2.
8. **Рынок сканеров консолидировался:** Microsoft Lens мёртв (скан отключён с 15.12.2025), остались Adobe Scan и системные сканеры. Decode не конкурирует "качеством скана" — конкурирует тем, что происходит ПОСЛЕ захвата; capture должен быть просто беспроблемным и знакомым (= системные паттерны iOS).
9. **Авто-именование и авто-сохранение.** "Klarna BNPL offer — 14 May 2026" вместо "Scan 47.pdf"; из capture сразу тянуть даты в Renewal Radar — это шов между "Scan" и "Watch" в core loop.
