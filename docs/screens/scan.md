# Экран-контракт: Scan pipeline (SC-1…4)

**Route:** `(app)/scan` (модально поверх табов) · **Flow:** [F2](../ux/jtbd-to-flows.md#f2) часть 1 · **Шаг loop:** Scan · **Job:** J1
**Персоны:** все; Jordan (multi-doc подряд), Maya (demo/upload-путь) · **Доступ:** авторизован ИЛИ guest (см. onboarding)
**Sitemap:** [SC-1…4](../ux/screen-sitemap.md#группа-c--scan--decode-pipeline)
**Инварианты:** quality-гейт ДО отправки в AI (фейл по фото пользователь спишет на «тупой AI»); multi-page = один документ (кредитный договор); no bank connection.

---

## Логика

### Данные
- `capture_session`: `pages: Image[]`, `source: camera|photos|files|share|demo`, `doc_id` (черновик).
- `quality_check` на каждую страницу: `blur`, `glare`, `edges_detected`, `is_readable: bool`.
- Вход через share-extension: `shared_file` (PDF/image из Mail) → сразу SC-1 с превью.
- Лимит free-тира: `scans_used_this_month` / `scan_limit` — для индикатора «N scans left» (апселл в камере, F8; не блок до камеры).

### Состояния
- **default:** SC-1 capture sheet.
- **loading:** SC-4 processing (стриминг этапов).
- **empty:** н/п (нет данных-списка); если share-вход без файла → fallback на SC-1.
- **error:** (а) quality-fail на SC-3 (blur/glare/обрезан край) → диагностика + retake; (б) сеть/AI-fail на SC-4 → retry + «ввести вручную» fallback; (в) неподдерживаемый файл → понятное сообщение + поддерживаемые форматы.
- **success:** SC-4 → переход на [decode-result](decode-result.md).

### Экраны и действия

**SC-1 Capture sheet** (bottom-sheet).
- `[Снять на камеру]` → SC-2 (или pre-permission ON-5, если ещё не granted).
- `[Выбрать фото]` → системный Photos picker → SC-3.
- `[Выбрать файл (PDF)]` → Files picker → (PDF многостраничный → сразу SC-4, без камеры).
- `RecentPhotosStrip` — тап на недавнее фото → SC-3.
- Если `scans_used >= scan_limit` (free) → перед камерой показать `[PW]` paywall (F8), НО только на превышении, не на входе.

**SC-2 Camera** (полноэкранный).
- Авто-capture при стабильной детекции края (по умолчанию) ИЛИ ручной shutter.
- `AutoManualToggle` — переключение режима.
- `ShutterButton` (ручной) → добавить страницу в `pages`.
- `[Add page]` / `PageCounter` — multi-page: каждая страница в один `capture_session` (договор = один документ).
- `[Done]` → SC-3. Свайп-вниз/`[Cancel]` → закрыть pipeline, вернуться на исходный таб.

**SC-3 Review / confirm** (полноэкранный).
- Превью страниц. `[Retake]` (страницу) / `[Add page]` (→SC-2) / `[Decode it]` (→SC-4).
- `quality_check`: если `is_readable=false` → блокирующая карточка диагностики (см. error) ДО `[Decode it]`.
- `CropHandles` — **только fallback**, если авто-детекция не уверена; иначе скрыты.

**SC-4 Processing** (полноэкранный).
- Запуск пайплайна (FastAPI SSE): отправка → этапы.
- `StageProgress` 4 этапа (реальные SSE-события): `Reading document → Extracting key terms → Calculating true cost → Checking for traps`.
- Бюджеты: первый осмысленный кадр ≤ 8 c; полный разбор ≤ 20 c; пустой спиннер дольше ~3 c запрещён.
- success → decode-result. fail (timeout/AI-error) → error-карточка: `[Try again]` + `[Enter manually]`.

### Действия-инварианты
- Каждый интерактив имеет handler (нет пустых onClick).
- `[Cancel]`/свайп на любом шаге → подтверждение, если есть несохранённые страницы.

### Связи
SC-1 ← Scan-таб · share-extension · empty-state Vault/Cockpit · ON-6 demo. SC-4 → [decode-result](decode-result.md).

---

## Визуал

**Референсы:** Apple Notes/Docusign (камера, auto-capture), Alan (capture sheet, crop), Yazio/Lovi (processing), Chime/Starling (errors) ([research/12](../../research/12-mobbin-capture-flows.md), [research/05](../../research/05-ux-document-capture.md)).

### Layout Mobile (основной)
- **SC-1 sheet:** bottom-sheet ~55% высоты; 3 крупных `ActionList`-строки с иконкой слева; под ними горизонтальная `RecentPhotosStrip`; ручка-grabber сверху; safe-area снизу.
- **SC-2 камера:** полноэкранный тёмный viewfinder; `EdgeOverlay` подсветка края документа; одна строка инструкции над шаттером («Position the document in frame»); `ShutterButton` по центру снизу (≥64pt, в thumb-zone); `AutoManualToggle` справа; `PageCounter`-миниатюра слева от шаттера.
- **SC-3 review:** превью страницы крупно; нижняя панель `[Retake] [Add page] [Decode it]` (основная — акцентная, full-width-ish); миниатюры страниц лентой при multi-page.
- **SC-4 processing:** фото документа остаётся на экране (затемнённое) + анимированная `scan-line` поверх + `StageProgress` снизу (4 этапа со state «done/active/pending») + `ResultSkeleton`-намёк под ним.

### Layout Desktop (вторичный)
- Только upload-путь (drag-drop зона) для web-demo; камера — н/п на десктопе. Не приоритет.

### Компоненты → UI-кит
`Sheet`, `ActionList`/`Row`, `RecentPhotosStrip` (доменный), `Viewfinder`+`EdgeOverlay` (доменные, нативная камера), `AutoManualToggle` (`SegmentedToggle`), `ShutterButton`, `PageCounter`, `Button`, `CropHandles`, `ProgressStages` (`StageProgress`), `ResultSkeleton`, `ErrorState`.

### Визуальные состояния
- **quality-fail (SC-3):** карточка с парой картинок «плохо ✗ / хорошо ✓» (glare/blur/обрезанный край) + `[Try again]` + escape «Enter manually». В grayscale: ✗/✓ иконки + вес, не цвет.
- **processing slow (>20c):** честное «Still working… large document» вместо зависшего спиннера.
- **AI/сеть error (SC-4):** `ErrorState` с диагностикой + `[Try again]` + `[Enter manually]`.
- **near-limit:** баннер «2 scans left this month» в SC-2 (не блок).

### Edge cases (визуально)
- Очень длинный многостраничный PDF (20+ стр.) → `PageCounter` показывает «1/24», лента скроллится, не ломает layout.
- Тёмное/яркое освещение в камере → `EdgeOverlay` остаётся видимым (контурный, не заливка).
- Файл с очень длинным именем → truncate в превью.
- Поворот устройства в камере — заблокировать в portrait (iOS-конвенция для скана) или корректно адаптировать overlay.
- Share-in пустой/битый файл → fallback на SC-1 с тостом «Couldn't open that file».

### Открытые вопросы / TODO
- TODO: demo-документ (из ON-6) проходит реальный SC-4 пайплайн или показывает заранее готовый result? (sitemap §4.4).
- TODO: лимит free-сканов N/мес — точное число (открытый вопрос ресёрча §9.3).
- TODO: предел страниц на документ (UX + cost-per-doc из [research/06](../../research/06-tech-claude-vision-extraction.md)).
- TODO: vision-camera (live edge-detection) vs expo-camera (shutter) — решение зависит от Expo-возможностей ([research/07](../../research/07-tech-ios-pwa-vs-native.md)).
