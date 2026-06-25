---
name: Decode
stage: wireframe-grayscale          # значения ЦВЕТА — плейсхолдеры; структура/архитектура — финальная
platform: iOS (iPhone-first), последняя iOS
theme: [light, dark]                # обе планируются → каждый цветовой токен парой
token-sync-target: Tailwind v4 @theme (web-прототип) → позже Expo TS-theme (нативный shell)
density: spacious                   # рабочая гипотеза Apple/Things; подтвердить на фазе дизайна

# ─────────────────────────────────────────────────────────────────────────────
# COLORS — два уровня. Уровень 1 (примитивы) на wireframe-стадии = ТОЛЬКО grayscale.
# Уровень 2 (семантические роли) — финальная архитектура: роли ссылаются на примитивы.
# Перекраска на фазе дизайна = смена ссылок ролей, НЕ переписывание экранов.
# Различимость статусов в ч/б — через иконку/вес/заливку-обводку, НЕ цвет (colorblind-safe by construction).
# ─────────────────────────────────────────────────────────────────────────────
colors:
  # ── Уровень 1: ПРИМИТИВЫ (уникальные hex живут только здесь) ──
  primitives:
    light:
      gray-0:   "#FFFFFF"
      gray-50:  "#F7F7F8"
      gray-100: "#EFEFF1"
      gray-200: "#E2E2E6"
      gray-300: "#CACAD0"
      gray-400: "#A6A6AE"
      gray-500: "#7C7C85"
      gray-600: "#5A5A62"
      gray-700: "#3F3F46"
      gray-900: "#1A1A1E"
      gray-950: "#0E0E11"
    dark:
      gray-0:   "#0E0E11"
      gray-50:  "#16161A"
      gray-100: "#1D1D22"
      gray-200: "#26262C"
      gray-300: "#33333A"
      gray-400: "#4C4C55"
      gray-500: "#7C7C85"
      gray-600: "#A6A6AE"
      gray-700: "#CACAD0"
      gray-900: "#EDEDF0"
      gray-950: "#FFFFFF"
    accent-placeholder:                  # brand-акцент: на wireframe = серый; на дизайне → brand hue
      light: "{gray-900}"
      dark:  "{gray-900}"

  # ── Уровень 2: СЕМАНТИЧЕСКИЕ РОЛИ (ссылки на примитивы; в коде используются ТОЛЬКО они) ──
  roles:
    # Surface (ожидает shadcn/UI-кит)
    background:          { light: "{gray-0}",   dark: "{gray-0}" }
    foreground:          { light: "{gray-900}", dark: "{gray-900}" }
    muted:               { light: "{gray-50}",  dark: "{gray-50}" }
    muted-foreground:    { light: "{gray-500}", dark: "{gray-500}" }
    border:              { light: "{gray-200}", dark: "{gray-200}" }
    card:                { light: "{gray-0}",   dark: "{gray-50}" }
    card-foreground:     { light: "{gray-900}", dark: "{gray-900}" }
    popover:             { light: "{gray-0}",   dark: "{gray-100}" }
    popover-foreground:  { light: "{gray-900}", dark: "{gray-900}" }
    input:               { light: "{gray-200}", dark: "{gray-300}" }
    ring:                { light: "{gray-400}", dark: "{gray-500}" }     # focus-ring
    # Brand
    primary:             { light: "{accent-placeholder}", dark: "{accent-placeholder}" }
    primary-foreground:  { light: "{gray-0}",   dark: "{gray-0}" }
    # Semantic (статусы продукта; на wireframe — grayscale + иконка/вес, на дизайне → hue)
    success:             { light: "{gray-700}", dark: "{gray-700}" }     # → green на дизайне
    success-foreground:  { light: "{gray-0}",   dark: "{gray-0}" }
    warning:             { light: "{gray-600}", dark: "{gray-600}" }     # → amber
    warning-foreground:  { light: "{gray-0}",   dark: "{gray-0}" }
    danger:              { light: "{gray-900}", dark: "{gray-900}" }     # → red (error/trap-high)
    danger-foreground:   { light: "{gray-0}",   dark: "{gray-0}" }
    info:                { light: "{gray-500}", dark: "{gray-500}" }
    info-foreground:     { light: "{gray-0}",   dark: "{gray-0}" }
    # ── ДОМЕННЫЕ роли Decode (выведены из docs/screens/*) ──
    trap-high:           { light: "{danger}",   dark: "{danger}" }       # severity HIGH (+ иконка ⚠, вес)
    trap-med:            { light: "{warning}",  dark: "{warning}" }      # MED
    trap-info:           { light: "{info}",     dark: "{info}" }         # INFO
    credit-file-yes:     { light: "{danger}",   dark: "{danger}" }       # бейдж «goes on file: YES»
    credit-file-no:      { light: "{success}",  dark: "{success}" }      # «NO»
    credit-file-cond:    { light: "{warning}",  dark: "{warning}" }      # «only if collections»
    confidence-ok:       { light: "{success}",  dark: "{success}" }      # ✓ from document
    confidence-check:    { light: "{warning}",  dark: "{warning}" }      # «Check this»
    confidence-unread:   { light: "{muted-foreground}", dark: "{muted-foreground}" } # «Couldn't read»
    calculated:          { light: "{foreground}", dark: "{foreground}" } # бейдж «Calculated, not AI»
    ai-tag:              { light: "{muted-foreground}", dark: "{muted-foreground}" }  # тег «AI»
    renewal-due:         { light: "{warning}",  dark: "{warning}" }
    overdue:             { light: "{danger}",   dark: "{danger}" }

# ─────────────────────────────────────────────────────────────────────────────
# TYPOGRAPHY — iOS системный стек; уровни, реально нужные продукту. ФИНАЛЬНОЕ (не плейсхолдер).
# Размеры в rem (уважение к Dynamic Type). mono-figures (tabular-nums) — для £/%/дат.
# ─────────────────────────────────────────────────────────────────────────────
typography:
  fontFamily:
    sans:   '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif'
    figures: '"SF Pro Text", -apple-system, system-ui, sans-serif'    # с font-variant-numeric: tabular-nums
  scale:
    display:  { size: 2.125rem, weight: 700, line: 2.5rem,  use: "aha-число True cost" }   # ~34px
    h1:       { size: 1.625rem, weight: 700, line: 2rem,    use: "заголовок экрана" }       # ~26px
    h2:       { size: 1.25rem,  weight: 600, line: 1.625rem, use: "секции, имя оффера" }     # ~20px
    body:     { size: 1.0625rem, weight: 400, line: 1.5rem, use: "основной текст (iOS 17px)" } # 17px
    body-strong: { size: 1.0625rem, weight: 600, line: 1.5rem, use: "акцент в теле" }
    caption:  { size: 0.8125rem, weight: 400, line: 1.125rem, use: "мета, даты, сноски" }    # ~13px
    label:    { size: 0.8125rem, weight: 600, line: 1rem, tracking: 0.06em, transform: uppercase, use: "секционные ярлыки (NEEDS ATTENTION / TRUE COST), eyebrow" } # ~13px caps — есть на Foundations-борде
    figures-lg: { size: 2.125rem, weight: 700, line: 2.5rem, numeric: tabular, use: "крупные £-суммы" }
    figures-md: { size: 1.0625rem, weight: 600, line: 1.5rem, numeric: tabular, use: "£/APR/% в строках" }

# ─────────────────────────────────────────────────────────────────────────────
# SPACING — контракт с usage. base 4px, шкала кратна. ФИНАЛЬНОЕ. Density = spacious (Apple/Things).
# ─────────────────────────────────────────────────────────────────────────────
spacing:
  unit: 4px
  xs:  4px    # иконка ↔ текст внутри компонента
  sm:  8px    # между близкими элементами
  md:  16px   # между элементами в блоке; боковые поля экрана (iOS)
  lg:  24px   # padding карточки, между блоками
  xl:  32px   # между секциями экрана
  "2xl": 48px # крупные разрывы (онбординг, empty states)
  screen-padding: 16px       # боковые поля экрана (iOS-стандарт)
  safe-top: env(safe-area-inset-top)      # Dynamic Island
  safe-bottom: env(safe-area-inset-bottom) # home-indicator (TabBar, нижние CTA)
  tap-min: 44px              # минимальный tap-target (HIG)

# ─────────────────────────────────────────────────────────────────────────────
# SHAPES (rounded) — рабочая гипотеза «мягкие» (Apple/Things). Подтвердить на дизайне.
# ─────────────────────────────────────────────────────────────────────────────
rounded:
  none: 0
  sm:   8px       # инпуты, мелкие чипы
  DEFAULT: 12px   # кнопки, карточки
  lg:   16px      # крупные карточки, sheets
  xl:   20px      # bottom-sheet верхние углы
  full: 9999px    # pills, бейджи, аватары

# ─────────────────────────────────────────────────────────────────────────────
# ELEVATION & DEPTH — на wireframe минимальные/flat; реальные тени на фазе дизайна.
# Уровни заданы под организмы продукта.
# ─────────────────────────────────────────────────────────────────────────────
elevation:
  flat:    none
  card:    "0 1px 2px rgba(0,0,0,0.04)"       # карточки cockpit/result (wireframe: почти flat)
  sheet:   "0 -2px 16px rgba(0,0,0,0.08)"     # bottom-sheets (Capture, Q&A, SV)
  popover: "0 4px 16px rgba(0,0,0,0.10)"      # dropdown, alert detail
  modal:   "0 8px 32px rgba(0,0,0,0.16)"      # полноэкранные modal-пайплайны

# ─────────────────────────────────────────────────────────────────────────────
# Z-INDEX — явные слои ровно под организмы Decode.
# ─────────────────────────────────────────────────────────────────────────────
zIndex:
  base: 0
  sticky: 10        # TabBar, шапка cockpit
  dropdown: 20
  sheet: 30         # bottom-sheets
  modal: 40         # scan/result pipeline
  toast: 50

# ─────────────────────────────────────────────────────────────────────────────
# MOTION — длительности/easing. prefers-reduced-motion обязателен. iOS-native spring на дизайне.
# ─────────────────────────────────────────────────────────────────────────────
motion:
  duration-fast:   150ms    # press, мелкие переходы
  duration-normal: 250ms    # появление sheets, схлопывание
  duration-slow:   400ms    # processing scan-line, крупные transitions
  easing: cubic-bezier(0.2, 0.8, 0.2, 1)   # iOS-подобный ease-out
  reduced-motion: respect   # @media (prefers-reduced-motion: reduce) → near-instant

# ─────────────────────────────────────────────────────────────────────────────
# COMPONENTS — ключевые, на токенах. Полный кит — на фазе UI-кита (manifest).
# ─────────────────────────────────────────────────────────────────────────────
components:
  button-primary:
    bg: "{primary}"; fg: "{primary-foreground}"; rounded: "{rounded.DEFAULT}"
    padding: "{spacing.sm} {spacing.md}"; min-height: "{spacing.tap-min}"; cursor: pointer
  card:
    bg: "{card}"; fg: "{card-foreground}"; border: "{border}"
    rounded: "{rounded.DEFAULT}"; padding: "{spacing.lg}"; shadow: "{elevation.card}"
  sheet:
    bg: "{popover}"; rounded-top: "{rounded.xl}"; shadow: "{elevation.sheet}"; z: "{zIndex.sheet}"
  credit-file-badge:                 # геройский элемент result (PM3)
    yes: "{credit-file-yes}"; no: "{credit-file-no}"; cond: "{credit-file-cond}"
    fg: "{primary-foreground}"; rounded: "{rounded.full}"; типографика: "{typography.h2}"
  trap-card:
    high: "{trap-high}"; med: "{trap-med}"; info: "{trap-info}"
    severity-via: [icon, weight, order]   # НЕ только цвет (ч/б + colorblind-safe)
  calculated-badge:
    fg: "{calculated}"; rounded: "{rounded.full}"; типографика: "{typography.caption}"
  confidence-tag:
    ok: "{confidence-ok}"; check: "{confidence-check}"; unread: "{confidence-unread}"
---

# Decode — DESIGN.md

## Overview

Дизайн-система продукта **Decode** (AI-декодер финансовых документов, iOS, UK, сегмент BNPL 18–25). Это **контракт визуальной правды**: любая правка дизайна = правка этого файла в том же коммите; каждый цвет/отступ/шрифт в коде ссылается на токен отсюда, не на «голое» значение.

**Стадия — wireframe (grayscale).** Значения **цвета** сейчас — серые плейсхолдеры. Но **архитектура токенов финальная**: примитивы → семантические роли. Когда придёт визуальный дизайн (сильно позже), меняются только ссылки ролей на примитивы (`primary → blue-600` вместо `primary → gray-900`) — ни один экран и компонент не переписывается. Типографика, spacing, радиусы, z-index, motion, safe-area — **настоящие с первого дня**, это и есть скелет wireframes.

**Характер (рабочая гипотеза, подтвердить на дизайне):** спокойный «банковский» Apple/Things — просторная плотность, мягкие радиусы, лёгкие тени, выраженная иерархия типографики. Тон продукта безоценочный; визуал не алармистский даже на trap-флагах (severity через порядок/иконку/вес, не кроваво-красным).

## Colors

Палитра строится в **два уровня** (это и есть «правильная сборка»):

1. **Примитивы** — сырые именованные значения (`gray-0…gray-950`). Уникальные hex живут ТОЛЬКО здесь. На wireframe-стадии — только grayscale + один `accent-placeholder` (тоже серый, но именованный, чтобы роль `primary` существовала с первого дня).
2. **Семантические роли** — ссылки на примитивы по смыслу, без дублирования hex. Компоненты используют **только роли** (`bg-primary`, `text-foreground`, `trap-high`), никогда примитивы напрямую.

**Тёмная тема** планируется → каждая роль задана парой light/dark (ссылается на разные примитивы; см. YAML).

**Различимость статусов в ч/б — не цветом.** На wireframe trap-severity, credit-file YES/NO, confidence различаются **иконкой + весом шрифта + заливкой/обводкой**, не оттенком. Бонус: это делает систему colorblind-safe по построению — когда добавится цвет, он станет усилением, а не единственным носителем смысла.

**Доменные роли Decode** (выведены из [поэкранных контрактов](screens/)): `trap-high/med/info`, `credit-file-yes/no/cond` (геройский бейдж), `confidence-ok/check/unread`, `calculated` (бейдж «Calculated, not AI»), `ai-tag`, `renewal-due`, `overdue`. На дизайне они переотобразятся на hue (trap-high → red, credit-file-no → green и т.д.) сменой ссылок.

Контраст: каждая пара текст/фон обязана давать **WCAG AA** — 4.5:1 для текста <18px, 3:1 для крупного и UI-элементов. Все `*-foreground` роли заданы.

## Typography

Системный стек **SF Pro** (`-apple-system, …`) — не подключаем шрифты с CDN; кастомный (если появится) — через `next/font`/нативно. Уровни — только реально нужные продукту:

- `display` — aha-число «True cost: £412» на result.
- `h1` — заголовок экрана; `h2` — секции, имя оффера.
- `body` (17px, iOS-норма) + `body-strong`; `caption` — мета/даты/сноски/дисклеймер.
- `label` — секционные ярлыки в caps (`NEEDS ATTENTION`, `TRUE COST`, `KEY TERMS`) и eyebrow-надписи. Реально используется на экранах и на Foundations-борде.
- **`figures-lg` / `figures-md` с `tabular-nums`** — для всех денежных сумм, процентов и дат (финансовые числа обязаны выравниваться по разрядам). Размеры в rem — уважение к Dynamic Type.

> **Канон рампы:** источник правды — этот файл + **Foundations-борд** (`design/wireframes/figma/foundations-wireframe.png`), они совпадают (`display / h1 / h2 / body / body-strong / caption / label / figures-*`). Старый `design-system-board.png` показывает иллюстративную iOS-лесенку с другими именами (Large title / Title / Callout / Subhead) — это НЕ контракт; при расхождении выигрывает рампа отсюда.

## Layout

**Spacing — контракт с usage** (не одно число): `xs` иконка↔текст · `sm` между близкими · `md` поля экрана / между элементами в блоке · `lg` padding карточки / между блоками · `xl` между секциями · `2xl` крупные разрывы. База 4px, всё кратно. Плотность **spacious** (Apple/Things).

**iOS-каркас:**
- Боковые поля экрана = `screen-padding` 16px.
- `safe-top` (Dynamic Island) и `safe-bottom` (home-indicator) — TabBar и нижние CTA всегда над `safe-bottom`.
- Нижний **TabBar** (3 пункта: Home · ⊕Scan · Vault) — навигация в thumb-zone.
- Модальные потоки (scan→result→ask) — bottom-sheets и полноэкранные modal, не центр-модалки.
- `tap-min` 44px на каждом интерактивном элементе.

Примеры контракта: карточка result — `padding: lg`, `gap` между полями `md`; секции cockpit разделяются `xl`; онбординг-разрывы `2xl`.

## Elevation & Depth

На wireframe — почти flat (лёгкие тени или их отсутствие); реальные тени включаются на фазе дизайна. Уровни заданы под организмы продукта: `card` (cockpit/result), `sheet` (Capture/Q&A/SV), `popover` (dropdown/alert-detail), `modal` (scan-пайплайн). Z-index — явные слои: `sticky` (TabBar/шапка) `10` → `sheet` `30` → `modal` `40` → `toast` `50`.

## Shapes

Радиусы — **мягкие** (рабочая гипотеза Apple/Things): `sm` 8 (инпуты) · `DEFAULT` 12 (кнопки/карточки) · `lg` 16 (крупные карточки/sheets) · `xl` 20 (верх bottom-sheet) · `full` 9999 (pills/бейджи — credit-file, calculated, trap). Границы — `border` роль, тонкие.

## Components

Ключевые компоненты на токенах (полный кит — на фазе UI-кита, манифест): `button-primary`, `card`, `sheet`, `credit-file-badge` (геройский, PM3 — three states), `trap-card` (severity через icon+weight+order, не только цвет), `calculated-badge` (PM6), `confidence-tag` (ok/check/unread). Доменные виджеты (`CommitmentRow`, `AlertCard`, `TrapCard`, `CreditFileBadge`…) знают про сущности → живут в `entities/`, не в `shared/ui/`. Базовые (`Button`, `Card`, `Sheet`, `Toggle`, `Chip`, `Input`, `SegmentedToggle`, `EmptyState`, `ErrorState`, `ProgressStages`) — в `shared/ui/`.

Состояния каждого интерактива (press вместо hover для iOS, focus-visible, disabled, loading) — внутри компонента. На интерактиве обязателен `cursor-pointer` (web-прототип), `disabled:cursor-not-allowed`.

## Do's and Don'ts

**Do:**
- Использовать только семантические роли в компонентах (`bg-primary`, `trap-high`), не примитивы и не «голые» hex/px.
- Различать статусы иконкой + весом + формой, не только цветом (работает в ч/б и для дальтоников).
- Денежные суммы/проценты/даты — `figures` с tabular-nums.
- Нижние CTA и TabBar — над `safe-bottom`; tap-targets ≥ 44px.
- Тон визуала спокойный; severity trap — порядком/иконкой, не кроваво-красной типографикой.

**Don't:**
- ❌ Хардкодить hex/px в экранах или компонентах (даже «временно»).
- ❌ Сочинять токены на лету при сборке экранов — нужен новый → сначала сюда, потом в код.
- ❌ Делать цвет единственным носителем смысла (trap/credit-file/confidence).
- ❌ Полагаться на hover (нет на iOS); центр-модалки для потоков (используем bottom-sheets).
- ❌ Глобальная плашка «AI may be wrong» (RCT-бесполезна) — вместо неё контекстный путь к источнику.

---

### Sync-таргет и валидация (примечания процесса)

- **Wireframe/прототип (web, Next.js+Tailwind v4):** токены → `src/app/globals.css` (`:root` + `.dark` + `@theme inline`), цепочка примитив → роль → класс. ⚠ В Tailwind v4 конфиг живёт в CSS, не в `tailwind.config.ts` (см. [guidelines/design-system.md](guidelines/design-system.md)).
- **Нативный shell (позже, Expo):** этот же DESIGN.md портируется в TS-theme модуль (роли = ключи объекта), компоненты RN читают роли. Структура та же.
- **Lint:** `npx @google/design.md lint docs/DESIGN.md` — проверка ссылок между переменными и порядка разделов (запускать при правках).
- **Что меняется на фазе дизайна:** только примитивы (grayscale → реальная палитра) и ссылки ролей на них + подтверждение density/radii/референса. Роли, типографика, spacing, z-index, motion, экраны — без изменений.
