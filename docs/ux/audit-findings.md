# Decode — аудиты вайрфреймов (2026-06-18)

Два многоагентных аудита по текущим lo-fi вайрам (Figma `ZR4wMSgGSbdckASvpiFwIP`, превью в `design/wireframes/figma/`). Оба: ревью по нескольким линзам → adversarial-проверка каждого findings → синтез.

## A. Технический аудит вайрфреймов (65 raw → 26 подтверждённых, 0 critical)
Линзы: визуальное выравнивание ×5 групп, компонентизация, контент/FCA/прайсинг, кросс-экранная консистентность.

**Что хорошо (подтверждено):** все заливки привязаны к токенам (0 hard-coded), фреймы выровнены в сетку, error-states целиком из компонентов; privacy/trust-костяк онбординга-2 верный.

**Should-fix:**
- **Клиппинг (исправлено):** Paywall H1 «limits» и Trust-repair caption — ⚠️ оба **уже починены** (UX-аудит подтвердил, что не воспроизводится).
- **Settings** — нижние ряды (HELP + «Decode v0.1») обрезаются на дне фрейма 874 → сделать скролл-фрейм/выше.
- **Paywall** — карточки планов не закрывают правый инсет (£41.99/£4.99 у края) → симметричный отступ.
- **HIG-навигация:** Decode-result (full-screen) и Ask не имеют X/Done/Close → добавить dismiss в навбар.
- **Компонентизация (inline → существующий компонент):** Paywall feature-rows → FeatureRow; Onboarding-2 trust-rows → FeatureRow; Vault-Detail kv → KeyValueRow; Alert-Detail £-герой → HeadlineStat, kv → KeyValueRow; Vault-List чипы → Chip(Default/Active).
- **Прайсинг:** Yearly £41.99 vs research/21 рекомендует £34.99–39.99 / ~−40% → подтвердить намеренность.

**Nits:** Onboarding-1 / Onboarding-3 dots → Dots-инстанс; Overview £214 → HeadlineStat; терминология входа в скан («+ Scan» / «Add a document» / «Scan a document»); «Renewal Radar» vs «Alerts inbox» нейминг; consent-toggle default-on; «Scan another» exit на decode-result; Overview-Empty копи сэмпла.

## B. Полный UX-аудит (81 raw → 53 подтверждённых, 0 critical)
Линзы: Nielsen, JTBD-фрикшн, онбординг/активация, восстановление после ошибок, доступность (a11y-спец), trust/FCA/тон, IA/когнагрузка, покрытие pre-mortem PM1–6.

**Сквозные темы:**
1. **Фрагментированный словарь происхождения** — 6 ярлыков («check/document/calc» vs «Calculated, not AI» vs «from your document» vs «AI») для 3 языков доверия, без легенды. Бьёт по PM6 и анти-trust-collapse.
2. **Страх без efficacy-пути** — overview-стек угроз, безоговорочный credit-file «YES», первый ответ Ask называют страх без «вот что делать» (нарушает fear+efficacy для avoidance-сегмента).
3. **Нет выходов / in-progress** — нет back/close на decode-result и Ask; нет cancel/timeout/error на scan-processing; нет индикатора «печатает» в Ask; нет «всё ещё оффлайн»; нет resume-after-permission на camera-denied.
4. **Renewal Radar структурно противоречив** — нет входа с Home (J3 недостижим вхолодную) И показан бесплатно без Pro-гейта (ломает PM4-монетизацию с обоих концов).
5. **Онбординг смешивает модели и просит обязательства до ценности** — карусель + терминальный CTA на слайде 1; pre-ticked consent (риск Apple 5.1.2/GDPR); сэмпл закопан; account-wall до первого decode.
6. **Quality-gate/CTA противоречат себе** — scan-review предупреждает «blurry», но «Use this scan» — primary; alert-CTA «Review the plan» ведёт к условиям, а работа — «перекинуть деньги вовремя».

**Major:**
- Onboarding-2 consent default-ON → **default OFF, Continue disabled пока не включено** (копи оставить).
- Onboarding-1 карусель+терминальный CTA → одна модель (CTA только на финальном слайде после consent, либо один welcome + inline-consent при первом скане).
- Renewal Radar без Pro-гейта → показать free/Pro-границу (Radar на 1–2 items + «unlock all with Pro»).
- Renewal Radar orphaned → **вход с overview** (bell с badge / «Coming up» полоса), 1 тап независимо от пушей.
- Color-alone severity → различимые **глифы на состояние** (▲ HIGH, i INFO, разные формы ok/check/calc), текст-лейбл всегда; цвет — лишь усиление.
- Credit-file hero order (PM3) → рассмотреть credit-file как первый/крупнейший блок (для Priya, высший WTP), напр. свитчабельный порядок/персонализация.

**Подтверждено хорошим:** тон и провенанс-мышление, error-state проработка, privacy-якоря.

> Эти findings заведены в работу: кодовый HIG-прототип строится с уже учтёнными фиксами (back/Done, consent-OFF, Radar-вход+гейт, severity-глифы); Figma-вайры правятся отдельно (компонентизация + выравнивание + HIG).

---

## C. DS + Alignment Audit (2026-06-22)

Третий аудит: дизайн-система целиком + все экраны (60+), фокус на выравнивании, иконках, вертикальном ритме. Все изменения применены напрямую в Figma через Plugin API.

### DS-фиксы (компоненты)

| # | Компонент | Проблема | Фикс |
|---|---|---|---|
| 1 | ListRow | Стрелка `›` — текстовый символ | Заменён на `Icons/chevron.right` SF Symbol |
| 2 | TrapCard | Стрелка `›` — текстовый символ | Заменён на `Icons/chevron.right` SF Symbol |
| 3 | TrapCard | Severity-иконка — серый контейнер пустой | `Icons/exclamationmark.triangle.fill` белая, 16×16 в 28×28 |
| 4 | SheetHeader | Крестик закрытия — нарисованный, не SF Symbol | `Icons/xmark.circle.fill` 30×30 |
| 5 | StatusBar | Сигнал/батарея — не нарисованы | 3 прямоугольника сигнала + корпус батареи + заливка + «лапка» |
| 6 | Primitives | Нет gray-800 (#2C2C32) между gray-700 и gray-900 | Добавлен токен VariableID:274:1262 |
| 7 | FeatureRow | Чекмарк hard-coded белый | Привязан к переменной `success` через `setBoundVariableForPaint` |
| 8 | ScreenHeader | Title LEFT-aligned, x:52 после шеврона | ABSOLUTE позиция, x:0, w:402, `textAlignHorizontal:CENTER` |
| 9 | CommitmentRow | Сумма £294 LEFT в 73pt-фрейме, x:28 (gap слева) | `textAlignHorizontal:RIGHT`, `resize(73, h)`, x:0 |

### HIG-фиксы (экраны)

| # | Экран | Проблема | Фикс |
|---|---|---|---|
| H1 | Delete-Document-Confirm, Delete-Account | Деструктивная кнопка чёрная (= обычный CTA) | Fill `r:0.87 g:0.22 b:0.22` (красный) |
| H3 | TabBar | Нет home-indicator inset | 135×5 пилюля, gray-600, ABSOLUTE y:58 |
| L1 | Scan-Capture, Vault-Sort-Filter | Нет drag-handle на bottom sheets | 36×4 пилюля, gray-300, y:8 по центру |

### Alignment-фиксы (экраны)

| # | Экран / элемент | Проблема | Фикс |
|---|---|---|---|
| A1 | Result-Error | Heading «Couldn't read this» LEFT x:46 w:173 | `w:402, x:0, textAlign:CENTER` |
| A2 | About | «Decode» + «Version…» LEFT (manually positioned) | `w:370, x:0, textAlign:CENTER` (FILL в parent) |
| A3 | Settings | Footer «Decode v0.1 · made in the UK» LEFT x:16 | `layoutGrow:1, FILL, textAlign:CENTER` |
| A4 | Force-Update | Иконка `xmark.circle.fill` (семантически неверно — «закрыть») | Заменена на `Icons/clock.arrow.circlepath` gray-700, 44×44 |

### Screen icon-фиксы

| # | Экран | Проблема | Фикс |
|---|---|---|---|
| I1 | Error-DecodeFailed | Пустой 80×80 контейнер (xmark с пустыми fills) | `Icons/exclamationmark.triangle.fill` 44×44 gray-600 |
| I2 | Delete-Document-Confirm | Пустой 80×80 контейнер | `Icons/trash.fill` 44×44 gray-600 |
| I3 | Trial-Expired | Пустой 80×80 контейнер | `Icons/crown.fill` 44×44 gray-600 |
| I4 | About | Пустой 72×72 app-icon | gray-700 background + «D» Inter Bold 32px белый |

### Что ОК (не трогали)

- NavBar title — уже CENTER (SPACE_BETWEEN + равные left/right frames) ✓
- SheetHeader — title LEFT intentionally (iOS bottom sheet pattern) ✓
- KeyValueRow «source ›» — текстовый › intentional (source citation, не навигация) ✓
- Onboarding-2,3,4 heading — LEFT intentional (content-rich slide, не hero) ✓
- AlertCard amount — LEFT intentional (primary financial figure) ✓
- Vault-List, Ask, Account, Rate-Feedback, Alerts-Inbox — выравнивание корректно ✓

### Что остаётся на имплементацию (не в Figma)

- H2 Dark mode — нет Dark token collection (App Store требует)
- M1 iOS 26 floating tab bar
- M2 Hit targets ≥44pt (hitSlop в RN)
- M3 Sign in with Apple (`expo-apple-authentication`)
- M4 System search bar
- M5 Swipe-to-delete
- L3 Reduce Motion fallback
- L4–L5 VoiceOver stars

---

## D. DS Cleanup + Screen Fixes (2026-06-22, сессия 2)

Все изменения применены через Figma Plugin API.

### DS-фиксы

| # | Что | Проблема | Фикс |
| --- | --- | --- | --- |
| 1 | Icons × 69 | SF Symbol dual-layer (чёрный + белый overlay 85%) — невидимы на белом фоне | Все 183 vector fills → `r:0.18 g:0.18 b:0.18` (single dark gray) |
| 2 | Icons layout | 10 новых иконок разбросаны вне сетки (x:360–879) | Перемещены в сетку: заполнена строка 5 (x:288, y:1480) + строка 6 (y:1512) |
| 3 | NavBar | Компонент плавал на x:1560, вне колонок | → MOLECULES колонка (x:560, y:1360) |
| 4 | Atoms/Switch | Компонент плавал на x:1560 | → ATOMS колонка (x:0, y:1220) |

### Screen-фиксы

| # | Экран | Проблема | Фикс |
| --- | --- | --- | --- |
| S1 | Scan-Review warn | `icon` frame — auto-layout порядок был неверным (иконка на x:336) | `insertChild(0, icon)` → icon first, text fill-width, `counterAxisAlignItems:CENTER` |
| S2 | Ask | Dismiss — `Icons/chevron.left` на правой стороне (x:356) — семантически неверно | `swapComponent` → `Icons/xmark.circle.fill` |
| S3 | Decode-Result TrapCard ×2 | Одинаковая иконка для всех уровней + `⚠`/`ⓘ` в тексте заголовка | Удалены глифы из title; trap2 icon → `Icons/info.circle.fill` |
| S4 | Decode-Result-Insurance TrapCard ×2 | То же | То же |
| S5 | Overview bell | Нет badge — entry в Renewal Radar не очевиден | Добавлен 8×8 dot (dark fill, white stroke) поверх bell icon |
| S6 | Paywall feature rows | 4 inline custom frames вместо DS компонента | Заменены на `Molecules/FeatureRow` instances с корректным title/sub |

### Что уже было OK (проверено, не трогали)

- Decode-Result: "Done" dismiss присутствует ✓
- Settings: h:1140, контент не обрезается ✓
- Onboarding-2: toggle OFF (r:0.89 gray track, thumb x:3), Continue State=Disabled ✓
- Renewal Radar: Pro gate ("Unlock reminders for all with Pro" + "COMING LATER (PRO)") ✓
- AlertDetail: использует `Molecules/HeadlineStat` ✓
- VaultDetail: использует `Molecules/KeyValueRow` ×4 ✓
- Vault-List chips: использует `Atoms/Chip` ×4 ✓
- Onboarding-2 trust rows: используют `Molecules/FeatureRow` (переопределения внутри) ✓

### Что остаётся (не сделано)

- Onboarding-1: реструктура (одна модель CTA, убрать terminal CTA со слайда 1) — требует переработки структуры экрана
- Credit-file hero order на Decode-Result (PM3)
- H1 Destructive button: пользователь запретил красный цвет в вайрах — без реализации до финального дизайна

---

## E. Icon Container Fills Removed (2026-06-23, сессия 3)

Все изменения применены через Figma Plugin API.

### DS-фиксы (компоненты)

| # | Компонент | Проблема | Фикс |
| --- | --- | --- | --- |
| 1 | TrapCard `sev` [68:19] | Тёмный filled circle r:90 под иконкой | `fills = []`; icon vectors → gray-500 |
| 2 | AlertCard `ic` [68:40] | Тёмный filled circle r:90 под иконкой | `fills = []`; icon vectors → gray-500 |
| 3 | FeatureRow `check` [84:350] | Тёмный filled circle r:63 под иконкой | `fills = []`; icon vectors → gray-500 |
| 4 | TabBar active `ic` [67:22] | Тёмный filled circle r:26 под camera icon | `fills = []`; camera vectors → gray-900 (active indicator без фона) |
| 5 | StateScaffold `icon` [83:345] | Светлый filled circle r:247 под иконкой | `fills = []`; icon stays gray-500 |

### Screen-фиксы (Page 1)

| # | Экран / элемент | Фикс |
| --- | --- | --- |
| S1 | Result-Error circle [75:240] | `fills = []`; icon → gray-500 |
| S2 | Trial-Expired crown container [177:1448] | `fills = []`; crown → gray-500 |
| S3 | Delete-Confirm trash container [177:1651] | `fills = []`; trash → gray-500 |
| S4 | All small icon containers on Page 1 | Sweep: 166 frames ≤100pt с fills + icon child → `fills = []`, vectors → gray-500 |

### Состояние после фикса

- TrapCard, AlertCard, StateScaffold, FeatureRow — иконки стоят прямо на белом фоне ✓
- Delete-Confirm, Trial-Expired, Error-DecodeFailed — state иконки без контейнеров ✓
- Overview, Decode-Result — list-row иконки clean ✓
- Permission screens — illustration иконки standalone ✓

---

## F. Icon Scale + Centering (2026-06-23, сессия 3)

Все изменения применены через Figma Plugin API.

| # | Что | Проблема | Фикс |
| --- | --- | --- | --- |
| 1 | Icons × 69 | Группы разного размера (10×15 — 21×24), позиция вручную, без auto-layout | Scale to fit 20×20 (aspect ratio preserved); `layoutMode:HORIZONTAL CENTER+CENTER`; фрейм 24×24 FIXED |
| 2 | StatusBar signal frame [67:6] | `layoutMode:VERTICAL` — иконки стекались вертикально | → `HORIZONTAL AUTO`, `itemSpacing:4` |
| 3 | StatusBar right frame [67:5] | Фиксированный 56×14, лишняя fill r:247 | → `HORIZONTAL AUTO`, fill cleared |
| 4 | `Icons/cellularbars`, `Icons/battery.100percent` | `clipsContent:true` (авто-layout default) клипировал контент внутри малых instances (18×12, 26×12) | `clipsContent = false` |

---

## G. UX-аудит: критические фиксы (2026-06-23, сессия 4)

Продолжение «чини все» — применены через Figma Plugin API + правки `prototype/app.js`.

### Figma-фиксы

| # | Экран | Что исправлено |
| --- | --- | --- |
| 1 | Settings [71:78] | «Photos deleted after decode» → muted-foreground (убран нечаянный danger-цвет) |
| 2 | Paywall [96:478] | Добавлен «Restore purchases» ниже CTA-кнопки; billing text поднят в safe area (y:849→y:850) |
| 3 | Scan-Camera [59:2] | Добавлена × close-кнопка (xmark instance) top-left x:16 y:16 |
| 4 | Scan-Processing [59:15] | Добавлена «Cancel» кнопка bottom y:820 |
| 5 | Settings ct [71:86] | Добавлен ряд «Appearance / Text size, theme» в секцию NOTIFICATIONS |
| 6 | Vault-detail [95:440] | Добавлен ряд «Compare offers ›» между NoteBlock и CTA |
| 7 | Overview hcard [99:615] | Добавлен «Coming up this week ›» → tappable row под seg |
| 8 | Alert-detail ct [95:492] | Добавлена «Mark as done» кнопка под Snooze |
| 9 | Contact-support ct [114:982] | Добавлен success-hint «After sending, we'll confirm by email within 24 h.» |
| 10 | Onboarding-4 | Создан экран `email-auth` (email + password form, Sign in btn, Create account link) |

### Prototype-фиксы (`prototype/app.js`)

| # | Экран | Изменение |
| --- | --- | --- |
| 1 | scan-camera | Добавлен hotspot «Cancel / close» → scan-capture |
| 2 | scan-processing | Добавлен hotspot «Cancel» → scan-capture |
| 3 | vault-detail | Delete → delete-document-confirm (новый экран); Compare offers hotspot |
| 4 | overview | «Coming up this week ›» → payment-calendar |
| 5 | alert-detail | «Mark as done» hotspot → alerts-inbox |
| 6 | onboarding-4 | «Continue with email» → email-auth |
| 7 | email-auth | Новый экран: Sign in → overview-empty, Create account → overview-empty |

**Итог:** 41 экран · 128 hotspots · 0 broken links
