# Decode — wireframes (lo-fi, Figma)

Ч/б-серые lo-fi wireframes. **Собираются в Figma** через Figma MCP (не HTML).

## Figma-файл
- **Decode — Wireframes (lo-fi)** · file key `ZR4wMSgGSbdckASvpiFwIP`
- https://www.figma.com/design/ZR4wMSgGSbdckASvpiFwIP
- Команда: «Elena Uvarova's team» (единственная с Full-seat / правом редактирования).

## Компонентная библиотека (страница «Components»)
Экраны собираются из **инстансов**, не detached-фреймов (методология figma-build). Библиотека организована по **Atomic Design** (имена `Atoms/… · Molecules/… · Organisms/…`, разложены тремя колонками на странице Components), всё на токенах/auto-layout:

- **Atoms (6):** `IconBox`, `InputField`, `Pill`, `Chip` (Default/Active), `Dots` (Step 1–3), `Button` (Primary/Secondary/Quiet).
- **Molecules (12, инстансят атомы):** `StatusBar`, `ScreenHeader`, `SectionHeader`, `HeadlineStat`, `KeyValueRow`, `NoteBlock`, `FeatureRow`, `ListRow`, `CommitmentRow`, `TrapCard`, `CreditFileBadge`, `SheetHeader`.
- **Organisms (3, инстансят молекулы+атомы):** `TabBar`, `AlertCard`, `StateScaffold` (шаблон ошибок/пустых: иконка+заголовок+текст+кнопки).

Правка компонента → обновляются все инстансы; переименование/перекатегоризация инстансы не ломает (связь по узлу). **Все экраны собраны из инстансов** — кроме Scan-Camera/Scan-Processing (намеренно кастомные: тёмный viewfinder и скан-анимация почти не пересекаются с библиотекой).

## Что внутри Figma
- **Переменные (токены)** из [docs/DESIGN.md](../../docs/DESIGN.md): коллекции `Primitives` (grayscale + 12 цветных), `Spacing` (+radius), `Theme` (29 ролей) с режимами **Wireframe** (ч/б) и **Light** (hi-fi-кандидат). Переключение режима фрейма перекрашивает экран токенами — экраны не трогаются. Dark — следующим.
- **Hi-fi палитра-кандидат** ([research/19](../../research/19-design-ios-hifi.md), [25](../../research/25-deep-research-2-summary.md)): brand **teal #0E7C72**, success #157A4C, + amber/red/blue (AA-кандидаты). ⚠️ всю палитру (light+dark) прогнать через WebAIM/Stark до финала. Дубли `*-Light` (Foundations/Cockpit/Decode-Result) показывают цвет; grayscale-оригиналы целы. Превью: `figma/*-light.png`.
- **Текстовые стили** `Decode/display…figures` (9 шт, Inter) — типографика-рампа как переиспользуемый слой ДС.
- **Foundations — Wireframe** (фрейм на холсте, `figma/foundations-wireframe.png`): видимая дизайн-система — примитивы + семантические роли свотчами (привязаны к переменным), типографика стилями, spacing, radii. Это «ДС и токены в Figma».
- **Экраны** (**402×874 pt — iPhone 17 Pro**, 6.3″ @3×, 2622×1206 px), auto-layout, заливки привязаны к Theme-ролям, текст в Inter (lo-fi). Превью — в `figma/`. ⚠️ safe-area по 17 Pro: Dynamic Island сверху (~59 pt) и home-indicator снизу (~34 pt) — статус-бар 50 px и нижние бары это грубо учитывают, на hi-fi уточнить точные инсеты. Все P0-флоу из [docs/screens/](../../docs/screens/):
  - ✅ **Cockpit** (Home) — shell: статус-бар, шапка, headline £214 + range-toggle, traps-строка, секции с CommitmentRow, TabBar.
  - ✅ **Decode-Result** (hero) — aha-число, credit-file YES бейдж, 3 языка достоверности (Calculated/from document/AI), key terms + confidence, trap-карточки, AI-summary, дисклеймер, Ask/Save.
  - ✅ **Ask** — Q&A-шит: chat + citations (p.2 §4), честный «not specified», suggest-chips, input.
  - ✅ **Scan-Camera** — тёмный viewfinder, edge-overlay, auto-capture, shutter, page-counter, Upload fallback.
  - ✅ **Scan-Processing** — doc + scan-line, 4 этапа (Reading/Extracting/Calculating/Checking), result-skeleton.
  - ✅ **Onboarding-1-Welcome** — product mock + промис + Scan/Apple CTA + dots.
  - ✅ **Onboarding-2-Trust** — trust-список + AI-consent с Anthropic + toggle + Continue (Apple 5.1.2(i)).
  - ✅ **Onboarding-3-NoDoc** (PM2) — «нет документа»: sample Klarna + scan-old варианты.
  - ✅ **Alerts-Inbox** (Radar) — watch-contract, Coming up (renewal + price-increase), Coming later.
  - ✅ **Alert-Detail** — анатомия алерта: £294-герой + due-pill, что/когда/последствие, overlap-callout, source, Review/Snooze.
  - ✅ **Vault-List** — поиск, фильтр-чипы, список decoded-документов (ListRow), TabBar.
  - ✅ **Vault-Detail** — sheet: key-value (£/credit-file/late-fee) с источниками, notes, Ask/Stop-watching.
  - ✅ **Settings** — 5 секций (Subscription/Your data/Notifications/Help/Legal), cancel-в-Apple, delete-everything, free debt help, дисклеймер (F9, VoC-гигиена).
  - ✅ **Paywall** — новая упаковка ([research/21](../../research/21-pricing-monetization.md)): «5 of 5 free decodes used», фичи-чеклист, планы Yearly(−30%)/Monthly, trial-таймлайн, «Billed by Apple» (F8, Apple 3.1.2).
  - ✅ **Scan-Capture** (SC-1) — bottom-sheet: Take photo / Choose library / Forward email + recent-strip.
  - ✅ **Scan-Review** (SC-3) — preview + blurry-quality-warning + pages-strip, Retake/Use.
  - ✅ **QA-Signpost** (PM5) — debt-distress: безоценочный signpost к StepChange/National Debtline/MoneyHelper + граница «не даём совет».
  - ✅ **Trust-Repair** (находка [research/31](../../research/31-behavioral-trust-design.md)) — «корона доверия»: флаг-фигура, без-защитный тон, цитата-источник, поле коррекции, re-check.
  - ✅ **Cockpit-Empty** — first-run: «nothing to watch yet» + Scan / Try-sample.
  - ✅ **Result-Error** — «we couldn't read this» + «Decode won't guess» + tips, Retake/Choose-file.
  - ✅ **Onboarding-4-Register** — опциональный аккаунт: 3×FeatureRow (sync/restore Pro/Face ID), Sign in with Apple / email / skip (Apple 5.1.2).
  - 🎞 **Scan-Camera / Scan-Processing** — намеренно кастомные (тёмный viewfinder + скан-анимация), не инстансы.
- **Экраны состояний** (`StateScaffold` = StatusBar + ScreenHeader + StateScaffold, почти 100% из компонентов):
  - ✅ **Error-Offline** — оффлайн, Vault работает; Try again / Open Vault.
  - ✅ **Error-DecodeFailed** — «на нас, decode не списан»; Try again / Send to support.
  - ✅ **Error-LimitReached** — 5/5 free decodes, reset 1 Jul; See Pro / Maybe next month.
  - ✅ **Error-CameraDenied** — доступ к камере off; Open Settings / Choose from library.
  - ✅ **Empty-NoResults** — поиск Vault пуст; Clear search (одна кнопка — quiet скрыт).
  - ✅ **Error-PurchaseFailed** — Apple не провёл оплату, не списано; Try again / Not now.

## Токен-референс (для прототипа)
- [tokens.css](tokens.css) — те же токены как CSS-переменные; портируются 1:1 в `src/app/globals.css` при scaffold web-прототипа.
- [foundations.html](foundations.html) — витрина токенов (открыть через `python3 -m http.server` → localhost). Это reference, не вайрфрейм.

## Заметки по Figma MCP (на будущее)
- Текст строить в **Inter** (SF Pro даёт 0-ширину в headless-рендере); свапать на SF Pro в самом конце при необходимости.
- `layoutAlign='STRETCH'` иногда не растягивает HORIZONTAL-фреймы со SPACE_BETWEEN (TabBar, section headers) → задавать явную ширину (`primaryAxisSizingMode='FIXED'` + `resize`).
- `get_screenshot` лагает/кешируется — доверять данным узла, перезапрашивать через паузу.

## Дальше
- Экраны состояний ошибок/пустых (offline, decode-failed, limit-reached, camera-denied, no-results, purchase-failed) — собираются из компонента `StateScaffold`.
- Прототип-связи между фреймами; точные safe-area-инсеты iPhone 17 Pro на hi-fi.
- Цвет/Dark — позже (Light-режим уже доказан на токенах), палитру через WebAIM.
