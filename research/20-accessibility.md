# 20 — Accessibility (WCAG 2.2 AA + Apple) под экраны Decode

> Трек: a11y под конкретные экраны Decode (decode-result, overview, scan, ask).
> Цель — не абстрактный чек-лист, а правила для НАШИХ компонентов: `AhaNumber`,
> `CreditFileBadge`, `TrapCard`, `ConfidenceTag`, `CalculatedBadge`, `StageProgress`,
> `CitationChip`, `CommitmentRow`. Стек: Expo / React Native, iPhone, последняя iOS,
> аудитория S1 (BNPL 18–25). Дата: июнь 2026.
>
> Почему это не «потом, после дизайна»: для нас a11y — это снижение продуктового и
> регуляторного риска. Пользователь в стрессе (долг, BNPL) + VoiceOver + крупный
> шрифт + дальтонизм — наш реальный сегмент. Если aha-число или бейдж credit-file
> не читается VoiceOver или ломается на Dynamic Type XL — продукт не выполняет свой
> единственный job. Плюс: грейскейл-вайрфреймы уже colorblind-safe по построению
> (статусы передаются иконкой/весом, см. [docs/guidelines/design-system.md] §wireframe),
> то есть мы НЕ должны потерять это при переходе на цвет.

---

## 1. Целевой стандарт и зачем именно он

**Базовая планка: WCAG 2.2, уровень AA + Apple Human Interface Guidelines (Accessibility).**

- WCAG 2.2 — действующая W3C Recommendation; AA — общепринятый юридический и индустриальный минимум для потребительских приложений ([W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/)). Для UK-финтеха (наш рынок) AA — де-факто стандарт, на который ориентируются ревью App Store и accessibility-аудиты.
- WCAG писался для web, но **критерии-смыслы переносятся на native** (контраст, не-цвет, target size, motion, понятный screen-reader-вывод). Технические реализации — через RN accessibility props (см. §6) и Apple-механики (Dynamic Type, VoiceOver traits).
- Apple HIG Accessibility — это то, что проверяется при ревью и чего ждёт iOS-аудитория: VoiceOver-метки, Dynamic Type, контраст, tap-targets, Reduce Motion ([Apple HIG — Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility)).

**Что из WCAG 2.2 нас касается напрямую (по приоритету для Decode):**

| Критерий | Уровень | Норма | Где у нас критично |
|---|---|---|---|
| 1.4.3 Contrast (Minimum) | AA | текст **4.5:1**, крупный **3:1** | aha-число, бейджи, trap-карточки |
| 1.4.11 Non-text Contrast | AA | UI-компоненты и графика **3:1** | бордеры карточек, иконки статуса, шаттер |
| 1.4.1 Use of Color | A | статус не только цветом | severity, confidence, credit-file YES/NO |
| 1.4.4 Resize Text / 1.4.10 Reflow | AA | масштаб без потери контента | Dynamic Type XL на всех экранах |
| 2.5.8 Target Size (Minimum) | AA | **24×24** CSS px (WCAG); Apple → **44pt** | citation-чипы, toggle, thumbs |
| 2.4.11 Focus Not Obscured | AA | фокус не перекрыт sticky-CTA | sticky `[Ask][Save]`, клавиатура в Ask |
| 2.3.3 Animation from Interactions | AAA* | отключаемая анимация | scan-line, стриминг aha-числа |

\* 2.3.3 — формально AAA, но мы берём его как обязательный: у нас есть motion (scan-line, стриминг), а Apple Reduce Motion — стандартная iOS-настройка, игнорировать её нельзя ([W3C 2.3.3](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html)).

---

## 2. Контраст: требования и как удержать при переходе grayscale → цвет

### 2.1 Нормы (verified)

- **1.4.3 Contrast (Minimum), AA:** текст и изображения текста — **≥ 4.5:1**; крупный текст — **≥ 3:1**. Крупный текст = **18pt (24px) обычный** или **14pt (≈18.66px) bold** ([W3C 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum), [WebAIM Contrast](https://webaim.org/articles/contrast/)).
- **1.4.11 Non-text Contrast, AA:** UI-компоненты (границы, состояния, иконки, нужные для идентификации) и значимые части графики — **≥ 3:1** к соседнему цвету ([W3C 1.4.11](https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html)).
- **Пороги — это пороги, без округления:** 2.999:1 НЕ проходит 3:1; 4.49:1 НЕ проходит 4.5:1 ([W3C 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum)).
- **Исключения:** неактивные (disabled) компоненты не обязаны проходить контраст; фото, логотипы, «эссенциальная» презентация — тоже ([W3C 1.4.11](https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html)). Это важно: наш миниатюрный thumbnail документа в шапке result и затемнённое фото на SC-4 — фото, контраст-требование к ним не применяется, но текст ПОВЕРХ них — применяется.

### 2.2 Конкретные пары контраста Decode (что проверять)

Наш дизайн-токен-слой уже двухуровневый: примитивы → семантические роли, и каждая роль имеет `*-foreground` ([docs/guidelines/design-system.md]). Контраст надо валидировать **на уровне токенов**, не компонентов — определить foreground-токен, проходящий по контрасту против КАЖДОГО фонового токена, задокументировать валидные пары, тогда компоненты accessible автоматически ([ColorArchive — token-level contrast](https://colorarchive.org/guides/color-contrast-accessibility-guide/)).

Обязательные пары для Decode (для каждой — light И dark, т.к. тёмная тема планируется):

1. **aha-число** (`AhaNumber`, display-размер) на `background` — крупный, минимум 3:1, но я бы держал 4.5:1: это главное число, оно должно читаться при ярком солнце на улице (наш юзер платит в магазине).
2. **`CreditFileBadge` YES/NO** — текст бейджа на его заливке ≥ 4.5:1; **граница/заливка бейджа** к фону экрана ≥ 3:1 (1.4.11), иначе бейдж «растворяется».
3. **`TrapCard` severity** (HIGH/MED/INFO) — текст ≥ 4.5:1; иконка severity и левая полоса/бордер ≥ 3:1. ВАЖНО: severity передаётся НЕ «кроваво-красной типографикой» (это и FCA-тон, см. [decode-result.md] §5), значит цвет HIGH должен быть спокойным, но всё равно проходить контраст — отдельная проверка.
4. **`ConfidenceTag`** «Check this» (жёлтый) — жёлтый на белом печально известен низким контрастом. Текст тега ≥ 4.5:1 (часто требует тёмного текста на жёлтом, не белого), иконка ⚠ ≥ 3:1.
5. **`CalculatedBadge`** «Calculated, not AI» — текст ≥ 4.5:1 (этот бейдж снижает риск F3 «ошибка в числах = снос», его обязаны читать).
6. **`StageProgress`** (SC-4) — текст этапов ≥ 4.5:1; индикаторы done/active/pending различимы по контрасту ≥ 3:1 И не только цветом (см. §4).
7. **`CitationChip`** «p.2 §4» — текст ≥ 4.5:1; бордер чипа ≥ 3:1.
8. **`CommitmentRow`** (overview) — относительная дата «Due in 4 days», £-сумма (tabular-nums), `TrapBadge` ⚠ — все ≥ 4.5:1 для текста.
9. **Disclaimer/signpost** в футере result и `SignpostCard` (Ask) — это юридически значимый текст (FCA-граница), он НЕ должен быть «серым мелким» ниже контраста. Держать ≥ 4.5:1 несмотря на то, что визуально это «вторичный» текст.

### 2.3 Как НЕ потерять доступность при переходе grayscale → цвет

Наша ловушка специфична: вайрфреймы грейскейл и colorblind-safe (статус = иконка + вес + заливка/обводка, [design-system.md] §wireframe). При покраске легко «съехать» на цвет-как-единственный-сигнал. Правила:

- **Цвет ДОБАВЛЯЕТСЯ, не ЗАМЕНЯЕТ.** Иконка/вес/паттерн, заложенные в грейскейле, остаются и в цветной версии. Цвет — усиление, не носитель смысла (см. §4).
- **Перекраска = смена ссылок ролей, экраны не трогаем** ([design-system.md] §цвета). Значит контраст-валидация делается один раз на наборе ролей, при смене палитры — повторяется автоматически.
- **Каждая новая цветная пара прогоняется через контраст-чекер ДО мёржа.** Инструменты: [Contrast Checker (Accessibility.build, WCAG 2.2)](https://accessibility.build/tools/contrast-checker), [colorcontrast.app](https://colorcontrast.app/), [InclusiveColors](https://www.inclusivecolors.com/) (генерит WCAG-aware палитру под токены/Tailwind/Figma). Это надо встроить в DESIGN.md-флоу (у нас уже есть «Контраст ключевых пар ≥ 4.5:1» в финальной сверке DESIGN.md).
- **Severity-палитра — отдельная боль.** Красный HIGH должен быть достаточно тёмным, чтобы белый текст на нём прошёл 4.5:1, ИЛИ использовать тёмный текст. Жёлтый MED/«Check this» почти всегда требует тёмного текста. Не брать «дефолтные» bootstrap-цвета — проверять каждый.
- **Dark mode — отдельный набор пар.** Контраст в light не гарантирует контраст в dark; iOS-аудитория ждёт обе темы ([design-system.md] §тёмная тема). Каждая пара валидируется дважды.
- **APCA — на будущее, не сейчас.** WCAG 3.0/APCA (Lc-значения, учитывает вес и размер шрифта) — следующее поколение, но ещё draft. Базируемся на WCAG 2.2 (ratio), APCA можно использовать как доп-сигнал для крупного aha-числа ([Capellic — WCAG to APCA](https://capellic.com/insights/accessible-colors), [apcacontrast.com](https://apcacontrast.com/)).

---

## 3. VoiceOver: как озвучивать decode-result (и другие экраны)

Это самый сложный и самый ценный для нас трек: result — экран, где плотно лежат «aha-число + бейдж + traps + confidence», и при наивной разметке VoiceOver «разбредётся» и прочитает мусор. iOS строг: сломанное/замусоренное accessibility-дерево пользователь прочувствует полностью ([RN Accessibility Guide 2026](https://reactnativerelay.com/article/react-native-accessibility-guide-building-inclusive-apps-expo)).

### 3.1 Порядок чтения result — наш аха-приоритет = приоритет VoiceOver

VoiceOver читает в порядке дерева элементов; порядок задаётся массивом (на iOS — `accessibilityElements`/в RN — экспериментальный `experimental_accessibilityOrder`, либо просто порядок в JSX) ([createwithswift — sort priority](https://www.createwithswift.com/preparing-your-app-for-voiceover-customizing-the-sort-priority/), [RN docs](https://reactnative.dev/docs/accessibility)). Наш визуальный приоритет (aha-число №1, credit-file бейдж №2) ДОЛЖЕН совпасть с порядком чтения:

1. Шапка: имя оффера + провайдер (одной группой).
2. **Aha-число** — первым после шапки. При стриминге оно приходит первым (≤8c, [decode-result.md]) → когда долетело, объявить через `announceForAccessibility` (см. §6.4), чтобы VoiceOver-юзер узнал, что появился результат.
3. **CreditFileBadge** — вторым.
4. Key terms (каждый — группа).
5. Trap-карточки в порядке severity (HIGH→MED→INFO) — порядок чтения = порядок важности.
6. Summary (AI).
7. Футер: disclaimer + signpost.
8. Sticky `[Ask]` `[Save]` — в конце основного контента (но достижимы; не должны перекрывать, см. §5.2).

### 3.2 Группировка (главное правило для плотных карточек)

Группировать связанные элементы в один accessibility-элемент — критично для хорошего VoiceOver-опыта; иначе пользователь свайпает по каждому кусочку отдельно ([thoughtbot — grouping on iOS](https://thoughtbot.com/blog/grouping-elements-for-better-accessibility-on-ios), [Kin+Carta — accessibility containers](https://medium.com/kinandcartacreated/accessibility-containers-284fff08480c)). В RN: на контейнере `accessible={true}` + единый `accessibilityLabel`, дочерние тексты тогда читаются как одно.

Как озвучивать наши компоненты (готовые строки):

- **`AhaNumber`** — НЕ читать «£412» и «£64 more» как два отдельных свайпа. Группа, один label:
  `accessibilityLabel="True cost: 412 pounds. 64 pounds more than the headline price."`
  (форматирование числа — см. §3.4: писать «412 pounds», не «£412»). `accessibilityRole="text"` или `header` (это заголовок секции).
- **`CreditFileBadge`** — бинарность YES/NO обязана звучать недвусмысленно. Не «галочка, да». А:
  `accessibilityLabel="Goes on your credit file: Yes. Reported to Experian."` (для Priya это make-or-break, [decode-result.md] §персоны). Tap раскрывает источник → `accessibilityHint="Double tap to see where this is stated in the document."`. Если данных нет — `"Credit file impact: not stated in this document."` (честно, не догадка).
- **`TrapCard`** — группа: severity + факт + £ + действие. Label:
  `accessibilityLabel="High importance. Late fee up to 6 pounds per missed payment."`
  severity передаётся **словом** в начале label (не цветом, не только иконкой), потому что VoiceOver цвет не озвучивает — см. §4/§5. `[Why this matters]` — отдельная кнопка внутри: `accessibilityRole="button"`, `accessibilityState={{expanded}}`, label «Why this matters», hint «Double tap to expand the explanation».
- **`ConfidenceTag`** — три регистра:
  - `✓ from document` — `accessibilityLabel="Confirmed from your document."`
  - `Check this` — `accessibilityLabel="Check this value. Tap to correct it."` + `accessibilityRole="button"` (это интерактив → RS-c).
  - `Couldn't read` — `accessibilityLabel="Couldn't read this value. Tap to retake this page."`
  НЕ озвучивать проценты (у нас confidence категориальный, не %, [decode-result.md] §confidence — это уже a11y-дружелюбно).
- **`CalculatedBadge`** — `accessibilityLabel="Calculated, not AI."` рядом с числом, в той же группе, чтобы юзер слышал происхождение числа сразу (анти-F3).
- **`CitationChip`** «p.2 §4» — `accessibilityLabel="Source: page 2, section 4."` + `accessibilityRole="button"` + hint «Double tap to see this in the document.» (НЕ читать «p точка 2 §» — расшифровать сокращения в label).
- **`StageProgress`** (SC-4) — каждый этап как `accessibilityRole="text"` со state busy/done; при смене этапа — `announceForAccessibility("Calculating true cost")`, иначе VoiceOver-юзер не узнает, что процесс идёт (RN не объявляет смену состояния сам, [RN screen reader support](https://oneuptime.com/blog/post/2026-01-15-react-native-screen-reader-support/view)).
- **`CommitmentRow`** (overview) — группа, один label: `"Klarna. Due in 4 days, 28 November. 42 pounds. 1 trap flagged."` Не свайпать по иконке/имени/дате/сумме отдельно ([grouping financial cards](https://thoughtbot.com/blog/grouping-elements-for-better-accessibility-on-ios)).
- **`SignpostCard`** (QA-sign, debt-distress) — спокойный тон в т.ч. в озвучке: `accessibilityLabel="If you're worried about debt, free, confidential help is available."` кнопки StepChange/MoneyHelper — `accessibilityRole="link"`, hint «Opens StepChange in your browser.»

### 3.3 Роли и трейты (RN → iOS VoiceOver)

`accessibilityRole` маппится в нативные UIAccessibilityTraits ([RN docs](https://reactnative.dev/docs/accessibility)). Для Decode:

- Заголовки секций result (Key terms, Traps, Summary) → `accessibilityRole="header"` — тогда VoiceOver-юзер прыгает по ним ротором (Headings rotor), не слушая всё подряд ([Penn State — VoiceOver rotor](https://accessibility.psu.edu/screenreaders/voiceover/)). Это огромный выигрыш на длинном result.
- Всё, что тапается (бейдж credit-file, citation, «Check this», `[Why this matters]`, thumbs) → `button`.
- Внешние ссылки (StepChange/MoneyHelper, signpost) → `link`.
- `RangeToggle` 7/30/60, Auto/Manual → сегменты как `tab`/`tablist` или кнопки с `accessibilityState={{selected}}`.
- `RadarToggle` (SV) → `accessibilityRole="switch"` + `accessibilityState={{checked}}`.
- AI-тег на summary/Q&A → читается частью label («AI summary: …»), не отдельным мусорным элементом.

### 3.4 Форматирование чисел и валюты для VoiceOver (UK-специфика)

Мы — финтех с £, это прямое попадание в известный баг.

- **VoiceOver на iOS неправильно/непоследовательно произносит «£» перед суммой** — может прочитать «pound sign 412» вместо «412 pounds» ([AppleVis — pound symbol bug](https://www.applevis.com/bugs/ios/prices-preceded-british-pound-symbol-are-not-spoken-correctly-voiceover), [Apple Developer Forums](https://developer.apple.com/forums/thread/720432)).
- **Решение — расхождение визуала и accessibilityLabel:** на экране показываем «£412» (tabular-nums), а в `accessibilityLabel` пишем «412 pounds» словом ([TPGi — Money Talks](https://www.tpgi.com/money-talks-formatting-currency-in-web-content/), [Vispero — currency formatting](https://vispero.com/resources/money-talks-formatting-currency-in-web-content/)). Это штатный паттерн «display one format, accessibilityLabel another».
- **Большие суммы с разделителями** («£1,234,567.89») — без явного label VoiceOver может прочитать по частям; в label писать «1,234,567 pounds 89 pence» или хотя бы убрать неоднозначность. Прогнать через VoiceOver на реальном устройстве (наши edge-cases уже включают £1,234,567.89 — [decode-result.md] §edge).
- **Проценты/APR** («39.9% APR (variable)») — в label «39.9 percent A P R, variable» (расшифровать APR по буквам или «annual percentage rate»; «variable» словом).
- **Даты UK** («28 Nov», «29 May 2026») — VoiceOver обычно читает корректно, но проверить «Due in 4 days» + абсолютную дату как одну осмысленную фразу, не два куска.
- Утилита: единый хелпер `currencyForA11y(amount)` и `percentForA11y(value)` — один источник правды для всех label, чтобы не разъехалось по экранам.

---

## 4. Не-цветовая передача статуса (severity / confidence / credit-file) — почему критично и как

### 4.1 Норма и кто страдает

**1.4.1 Use of Color (A):** «Color is not used as the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element» ([W3C 1.4.1, exact wording](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html)). Это уровень **A** — самый базовый, не AA; провал = грубое нарушение.

Страдают: дальтоники (≈8% мужчин — а наш сегмент BNPL 18–25 сильно перекошен; среди молодых мужчин это заметная доля), low-vision, **и VoiceOver-юзеры** (цвет вообще не озвучивается). Для Decode добавляется: пользователь в стрессе хуже различает тонкие цветовые сигналы.

Способы передать статус помимо цвета: **иконка, текстовая метка, паттерн, форма, вес шрифта** ([W3C 1.4.1](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html), [WebAIM](https://webaim.org/articles/contrast/)). Плюс: когда цвет — единственное различие между соседними элементами, эти цвета должны иметь между собой **3:1** ([W3C 1.4.1 intent](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html)).

### 4.2 Почему для Decode это не «галочка комплаенса», а ядро продукта

Весь продукт построен на статусах (severity traps, confidence, credit-file YES/NO, overview-секции needs_attention/renewing). Если статус читается только цветом — половина наших ключевых сигналов невидима части аудитории И невидима VoiceOver. У нас уже заложено правильно ([design-system.md] §wireframe: «различимость статусов через иконку/вес/заливку, НЕ цвет»; [decode-result.md]: «severity передаётся порядком/иконкой/весом, НЕ кроваво-красной типографикой»). Задача — НЕ растерять это при покраске.

### 4.3 Правила по компонентам (двойное/тройное кодирование)

| Статус | Цвет (после покраски) | + Не-цветовой сигнал (обязателен) |
|---|---|---|
| **Trap HIGH** | red-токен (спокойный, не алармный) | иконка severity + слово «High» в карточке + позиция (вверху списка) + вес |
| **Trap MED** | warning-токен | иконка + слово «Medium» |
| **Trap INFO** | neutral/info | иконка ℹ + слово «Info» |
| **Confidence ✓ from document** | нейтральный | галочка ✓ + (молча, без алармизма) |
| **Confidence Check this** | warning/жёлтый | иконка ⚠ + текст «Check this» + это кнопка |
| **Confidence Couldn't read** | muted | текст «Couldn't read» + «retake» |
| **CreditFile YES** | акцент | **слово YES** крупно + иконка |
| **CreditFile NO** | нейтральный | **слово NO** крупно + иконка |
| **CreditFile only-if-collections** | warning | полный текст, не цвет |
| **Overview ⚠ Needs attention** | акцент | иконка ⚠ + заголовок секции + позиция вверху |
| **StageProgress done/active/pending** | разные | разные иконки/формы (✓ / спиннер / пусто), не только цвет |

Ключевое: **severity-слово ВСЕГДА в тексте/label**, не выводится «из красноты». Это одновременно: 1.4.1-комплаенс, VoiceOver-дружелюбность (§3.2), и совпадает с FCA-требованием спокойного тона (severity передаётся фактом, не «кровью»).

Дополнительно: иконки severity не должны полагаться только на форму, если форма сама неоднозначна — лучше иконка + текст. Для charts/breakdown true_cost (если появятся) — паттерны + подписи, не только цветные сегменты ([W3C 1.4.1 — charts](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html)).

---

## 5. Dynamic Type, tap targets, focus order, reduced motion

### 5.1 Dynamic Type — не сломать layout при XL/AX-размерах

**Факты:**
- iOS Dynamic Type: 7 стандартных размеров (xSmall…xxxLarge) + **5 accessibility-размеров AX1…AX5** при включении «Larger Accessibility Sizes» ([Medium — designer's guide to Dynamic Type](https://medium.com/design-bootcamp/a-product-designers-guide-to-dynamic-type-in-ios-a105dda39a95), [Deque — supporting Dynamic Type](https://docs.deque.com/devtools-mobile/2024.9.18/en/supports-dynamic-type/)). Например `.body` 17pt при large → существенно крупнее на AX5; `.headline` 17pt → 23pt при xxxLarge.
- WCAG 1.4.4 Resize Text (AA): текст масштабируется до 200% без потери контента/функции ([W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/)). Apple: layout адаптируется без обрезки и наложения ([Apple HIG](https://developer.apple.com/design/human-interface-guidelines/accessibility)).

**RN-механика:**
- Текст по умолчанию масштабируется (`allowFontScaling=true`). **Не отключать `allowFontScaling=false` глобально** — это плохая практика, юзеры полагаются на системный размер ([Ignite Cookbook — accessibility font sizes](https://ignitecookbook.com/docs/recipes/AccessibilityFontSizes/), [Medium — font scaling in RN](https://medium.com/@runawaytrike/font-scaling-in-react-native-apps-8d38a48fdf26)).
- Вместо отключения — **ограничивать `maxFontSizeMultiplier`** (RN 0.59+): даём щедрый скейл body-тексту, ограничиваем заголовки/UI-элементы. **Не ставить ниже 1.2** — иначе бьём по доступности ([oneuptime — dynamic font scaling](https://oneuptime.com/blog/post/2026-01-15-react-native-dynamic-font-scaling/view)).
- Layout без поломок: **flexbox, избегать фиксированных высот** ([Medium — font scaling](https://medium.com/@runawaytrike/font-scaling-in-react-native-apps-8d38a48fdf26)).

**Правила для Decode (по компонентам):**
- **`AhaNumber`** (display) — самый большой риск переполнения. Разрешить умеренный скейл, но число «£1,234,567.89» при AX5 не должно вытолкнуть «£64 more» за экран. Решение: aha-блок вертикальный (число над подписью), wrap, без фиксированной высоты. Прогон edge-case: большое число × AX5 (наш edge-list уже требует «Dynamic Type XL → aha-число масштабируется, не наезжает», [decode-result.md]).
- **`CreditFileBadge`** — слово YES/NO + named CRA при XL: бейдж растёт по высоте, не обрезает текст; «Reported to Experian» переносится.
- **`TrapCard`** — severity-слово + факт + £ при XL: карточка растёт, кнопка `[Why this matters]` не выезжает.
- **`CommitmentRow`** (overview) — самая хрупкая строка: иконка · name · «Due in 4 days · 28 Nov» · £ · ⚠. При XL она ДОЛЖНА переходить в многострочную/вертикальную раскладку, а не сжимать £ в нечитаемое. TabBar при XL не наезжает на контент.
- **`StageProgress`, `CitationChip`, `ConfidenceTag`** — короткий текст, но при XL чипы wrap-ом, не уезжают за край.
- **Body минимум 17px-эквивалент** (iOS-норма, уже в [design-system.md] §типографика); размеры в rem/scaled units, tabular-nums для всех сумм.
- **Тест:** прогнать каждый ключевой экран на крупнейшем AX-размере на устройстве, не только в дефолте. Включить в Playwright/визуальный прогон как отдельный «extreme content» сценарий.

### 5.2 Tap targets, focus order, обструкция фокуса

**Tap target:**
- WCAG 2.2 **2.5.8 Target Size (Minimum), AA: 24×24 CSS px**; исключения — инлайновые ссылки, достаточный отступ (24px свободного пространства вокруг засчитывается), эквивалентная альтернатива ([W3C 2.5.8 / TestParty](https://testparty.ai/blog/wcag-22-new-success-criteria), [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/)).
- **Apple HIG: минимум 44×44 pt** — это наша рабочая планка (строже WCAG), исследования: меньшие цели → ≥25% ошибок тапа, особенно при моторных нарушениях ([Apple HIG](https://developer.apple.com/design/human-interface-guidelines/accessibility), [LogRocket — touch target sizes](https://blog.logrocket.com/ux-design/all-accessible-touch-target-sizes/)). У нас уже в screen-contracts: «tap-targets ≥ 44×44».
- **RN:** где визуально меньше 44 — использовать `hitSlop` для расширения зоны без изменения layout (но предпочтительно реальный padding — предсказуемее по плотностям) ([RN issue 32089 / Medium a11y strategies](https://medium.com/@mayurkadampro/make-your-app-inclusive-accessibility-strategies-that-every-react-native-developer-should-know-aaab1fad4228)).
- **Decode-риски:** `CitationChip` «p.2 §4» (мелкий, но тапается → highlight); `ConfidenceTag` «Check this»; `thumbs up/down` и `[Wrong?]`; collapse-стрелка «6 terms look standard ⌃»; bell/gear в шапке overview; `RadarToggle`. Каждый — ≥44pt или hitSlop до 44. `ShutterButton` уже заложен ≥64pt ([scan.md]) — хорошо.

**Focus order:**
- Порядок фокуса = логический порядок (§3.1). На модалках (Ask sheet, SV sheet, RS-c) — `accessibilityViewIsModal={true}` (iOS), чтобы VoiceOver не уходил на элементы под шторкой ([RN docs](https://reactnative.dev/docs/accessibility)).
- При открытии sheet/modal — перевести фокус на заголовок: `AccessibilityInfo.setAccessibilityFocus(node)` ([Medium — a11y strategies](https://medium.com/@mayurkadampro/make-your-app-inclusive-accessibility-strategies-that-every-react-native-developer-should-know-aaab1fad4228)).
- Escape-жест (two-finger Z) на модалках → `onAccessibilityEscape` закрывает sheet (наш `[Cancel]`/свайп-вниз).

**2.4.11 Focus Not Obscured (AA):** компонент в фокусе не должен быть полностью скрыт автор-контентом ([W3C 2.4.11](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum)). Наши риски:
- **Sticky `[Ask][Save]`** на result — не должны перекрывать последнюю trap-карточку (наш edge-case «8+ traps … sticky-CTA не перекрывает последнюю» [decode-result.md] — это ровно 2.4.11). Нижний паддинг контента = высота sticky + safe-area.
- **Клавиатура в Ask** — поле ввода и последнее сообщение видны при открытой клавиатуре ([ask.md] edge-case) — это тоже 2.4.11/обструкция.
- Safe-area: нижние CTA/TabBar не перекрыты home-indicator (уже в screen-contracts).

### 5.3 Reduced Motion

- **2.3.3 Animation from Interactions:** дать отключить motion, запущенный взаимодействием, если он не эссенциальный; нужно людям с вестибулярными расстройствами ([W3C 2.3.3](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html)).
- **RN:** `AccessibilityInfo.isReduceMotionEnabled()` + событие `reduceMotionChanged` — читает системную iOS-настройку Reduce Motion ([RN AccessibilityInfo / PR 23839](https://github.com/facebook/react-native/pull/23839), [reactnative.dev](https://reactnative.dev/docs/accessibility)). В дизайн-токенах motion уже обязан иметь `prefers-reduced-motion`-фолбэк ([design-system.md] §animation).
- **Наши анимации под этот гейт:**
  - **`scan-line`** на SC-4 (анимированная линия поверх документа) — при Reduce Motion заменить на статичный/плавный fade прогресса, не бегающую линию.
  - **Стриминг aha-числа** (появление ≤8c) — при Reduce Motion: без «прыжка»/count-up, просто появление готового числа.
  - **Переходы sheet/модалок, collapse секций** — упростить (fade вместо слайда) при Reduce Motion.
  - Длительности — из токенов (fast/normal/slow), не хардкод ([design-system.md]).

---

## 6. RN-имплементация: справочник props под Decode

Полный список верифицирован по [reactnative.dev/docs/accessibility](https://reactnative.dev/docs/accessibility).

### 6.1 Базовые props
- `accessible={true}` — пометить контейнер как один элемент (iOS → `isAccessibilityElement`). Использовать для группировки `AhaNumber`, `TrapCard`, `CommitmentRow`.
- `accessibilityLabel="..."` — что это (см. готовые строки §3.2). Обязателен на icon-only кнопках.
- `accessibilityHint="..."` — что произойдёт при активации. iOS: читается после label, если включены hints; не дублировать label.
- `accessibilityRole="header|button|link|switch|tab|text|image|adjustable"` — см. §3.3.
- `accessibilityState={{ disabled, selected, checked, busy, expanded }}` — для toggle, сегментов, collapse, StageProgress (busy), `[Why this matters]` (expanded).
- `accessibilityValue={{ min, max, now, text }}` — для прогресса/слайдеров (StageProgress, если как progressbar: `text:"Step 3 of 4"`).

### 6.2 Скрытие/группировка
- `accessibilityElementsHidden={true}` (iOS) — спрятать декоративное (фон scan-line, чисто визуальные иконки рядом с уже-озвученным текстом) от VoiceOver.
- `accessibilityViewIsModal={true}` (iOS) — на Ask/SV/RS-c sheet, чтобы фокус не утекал под шторку.
- Группировка: `accessible={true}` на контейнере + единый label (RN не имеет прямого `accessibilityElements`-массива как UIKit; группировка через `accessible` на родителе).

### 6.3 iOS-жесты
- `onAccessibilityEscape` — на модалках → закрыть (наш свайп-вниз/Cancel).
- `onMagicTap` — двухпальцевый двойной тап → «самое релевантное действие». Кандидат: на result → `[Scan another]` или `[Save]`; на scan → shutter. Опционально, но приятный штрих для power-VoiceOver-юзеров.

### 6.4 Динамические объявления (критично для стриминга/процессинга)
- `AccessibilityInfo.announceForAccessibility("...")` — объявить событие, которого VoiceOver сам не заметит:
  - aha-число долетело при стриминге → «True cost ready: 412 pounds».
  - смена этапа StageProgress → «Checking for traps».
  - после RS-c пересчёта → «Recalculated. New true cost: 398 pounds» (у нас уже тост «Recalculated»).
  - сохранение в Vault → «Saved. Watching 2 dates.» (у нас тост «Saved · watching 2 dates»).
  - debt-distress signpost появился → объявить, что показана помощь.
- `AccessibilityInfo.setAccessibilityFocus(reactTag)` — увести фокус на заголовок открывшейся шторки / на error-карточку quality-fail.
- `AccessibilityInfo.isScreenReaderEnabled()` / `isReduceMotionEnabled()` + слушатели — ветвление поведения.
- Примечание: `accessibilityLiveRegion` — **только Android**; на iOS для динамики используем `announceForAccessibility` ([RN docs](https://reactnative.dev/docs/accessibility)).

### 6.5 Прочее
- `accessibilityLanguage="en-GB"` (iOS) — корректное произношение UK-контента.
- `accessibilityIgnoresInvertColors={true}` — на фото документа (миниатюра, SC-4 backdrop), чтобы Smart Invert не инвертировал само изображение скана.
- `maxFontSizeMultiplier` — на заголовках/UI-элементах (§5.1).
- Тест ОБЯЗАТЕЛЕН на реальном устройстве: VoiceOver **не работает в симуляторе** (использовать Accessibility Inspector + VoiceOver на macOS, но финально — на iPhone) ([RN docs](https://reactnative.dev/docs/accessibility), [oneuptime](https://oneuptime.com/blog/post/2026-01-15-react-native-screen-reader-support/view)).

---

## 7. Камера/скан (SC-1…4) — отдельная боль

Камерные экраны традиционно «дыра» в a11y; для нас важно, т.к. это вход в продукт.

- **`ShutterButton`** — `accessibilityRole="button"`, label «Capture page», hint «Takes a photo of the current page». Уже ≥64pt ([scan.md]) — хорошо.
- **Авто-capture при детекции края** — VoiceOver-юзер не видит, что край пойман. Объявлять: `announceForAccessibility("Document detected. Capturing.")` или дать явный manual-режим (наш `AutoManualToggle`). Инструкция «Position the document in frame» — должна быть accessibilityLabel, не только визуальный оверлей.
- **`EdgeOverlay`** — чисто визуальный → `accessibilityElementsHidden`, но факт детекции озвучивать словами.
- **`PageCounter`** «1/24» → label «Page 1 of 24».
- **`StageProgress`** (SC-4) — §3.2/§6.4: объявлять смену этапов; не оставлять VoiceOver-юзера в тишине дольше ~3с (наш бюджет «пустой спиннер дольше ~3c запрещён» совпадает).
- **quality-fail карточка** (blur/glare) — `setAccessibilityFocus` на неё при появлении; «плохо ✗ / хорошо ✓» картинки сопроводить текстом («Photo is blurry. Try again in better light.»), т.к. ✗/✓ и сравнение фото — визуальные. Уже заложено «✗/✓ иконки + вес, не цвет» ([scan.md]) — добавить текст для VoiceOver.
- Ориентация камеры заблокирована в portrait ([scan.md]) — ок, но проверить, что Dynamic Type не ломает инструкцию и счётчики поверх viewfinder.
- Библиотеки сканера (`react-native-document-scanner-plugin` / Vision Camera) дают мало встроенной a11y камеры — метки/объявления на нас ([react-native-document-scanner](https://github.com/tony-xlh/react-native-document-scanner), [Scanbot + Expo](https://scanbot.io/techblog/how-to-use-react-native-document-scanner-plugin-with-expo/)).

---

## 8. Процесс и тестирование

- **Контраст — на уровне токенов, не компонентов.** Валидные foreground/background-пары задокументированы, прогоняются чекером при каждой смене палитры; в DESIGN.md уже есть пункт «Контраст ключевых пар ≥ 4.5:1» — расширить до полной матрицы пар × (light/dark). Инструменты: [accessibility.build](https://accessibility.build/tools/contrast-checker), [colorcontrast.app](https://colorcontrast.app/), [InclusiveColors](https://www.inclusivecolors.com/).
- **«Если a11y не тестировали — её нет.»** Метки/props могут выглядеть идеально, но пока не включил VoiceOver — не знаешь ([RN guide](https://reactnativerelay.com/article/react-native-accessibility-guide-building-inclusive-apps-expo)). Обязательный ручной прогон на iPhone: VoiceOver-проход по result/overview/scan/ask + Dynamic Type на крупнейшем AX + Reduce Motion ON + Smart Invert.
- **Добавить в существующий verification-флоу** ([screen-contracts.md] §верификация): к Playwright-прогону на 4 ширинах — добавить «Dynamic Type AX5» и «Reduce Motion» как extreme-content сценарии; к grep-проверкам — линт на icon-only кнопки без `accessibilityLabel`.
- **Авто-линт:** ESLint-плагины RN a11y / react-native-accessibility-engine как ранний сигнал (не замена ручному тесту) ([Medium — RN a11y engine](https://medium.com/reactbrasil/introducing-react-native-accessibility-engine-fcf78f2a3805)).

---

## Key takeaways for Decode

1. **A11y у нас уже встроена грейскейлом — задача не растерять её при покраске.** Вайрфреймы colorblind-safe по построению (статус = иконка + вес + текст, [design-system.md]/[decode-result.md]). Правило на фазу дизайна: **цвет ДОБАВЛЯЕТСЯ к иконке/слову/весу, никогда не ЗАМЕНЯЕТ их.** Severity-слово (High/Medium/Info) и credit-file YES/NO всегда в тексте, а не «выводятся из красноты» — это одновременно 1.4.1 (A), VoiceOver-дружелюбность и FCA-тон.

2. **Контраст валидируем на уровне токенов, дважды (light+dark), перед каждым мёржем палитры.** Нормы: текст 4.5:1, крупный/UI 3:1, без округления. Зоны риска именно наши: жёлтый `ConfidenceTag` «Check this» (нужен тёмный текст), спокойный-но-проходящий red HIGH, disclaimer/signpost (юридический текст — не делать его «серым мелким» ниже 4.5:1). Расширить пункт DESIGN.md до полной матрицы пар.

3. **VoiceOver-контракт result = наш аха-приоритет.** Порядок чтения: aha-число → CreditFileBadge → traps (по severity) → summary → disclaimer. Каждый ключевой блок — ОДНА группа (`accessible` + единый label), не россыпь свайпов. Заголовки секций → `role="header"` (навигация ротором). Готовые label-строки — в §3.2.

4. **£ ломает VoiceOver — расходим визуал и label.** Показываем «£412», в `accessibilityLabel` пишем «412 pounds» словом (известный iOS-баг с «£»). Единый хелпер `currencyForA11y`/`percentForA11y`, `accessibilityLanguage="en-GB"`. Прогнать наш edge-case £1,234,567.89 через реальный VoiceOver.

5. **Стриминг и процессинг требуют `announceForAccessibility` — иначе VoiceOver-юзер в тишине.** Объявлять: «aha-число готово», смену этапов StageProgress (SC-4), «Recalculated» после RS-c, «Saved · watching 2 dates», появление debt-distress signpost. RN сам смену состояния не озвучивает.

6. **Dynamic Type до AX5 — отдельный тест-сценарий, не «авось».** Не отключать `allowFontScaling`; ограничивать `maxFontSizeMultiplier` на заголовках/UI (не ниже 1.2); flexbox без фиксированных высот. Самые хрупкие: `AhaNumber` (большое число × AX5), `CommitmentRow` (иконка+name+дата+£+⚠ → переход в многострочность). Добавить «AX5» и «Reduce Motion» в существующий Playwright/extreme-content прогон.

7. **Tap targets 44pt (Apple, строже WCAG-24px), focus не перекрыт.** Поднять до 44pt/hitSlop: `CitationChip`, `ConfidenceTag`, thumbs/`[Wrong?]`, collapse-стрелка, bell/gear, `RadarToggle`. Sticky `[Ask][Save]` не перекрывают последнюю trap-карточку; клавиатура в Ask не прячет поле ввода (2.4.11). Модалки — `accessibilityViewIsModal` + `setAccessibilityFocus` на заголовок + `onAccessibilityEscape`.

8. **Reduce Motion — обязательный гейт для scan-line, стриминга aha-числа, переходов sheet.** Читать `AccessibilityInfo.isReduceMotionEnabled()`; при ON — fade/статика вместо бегущей линии и count-up. Длительности из токенов, не хардкод.

9. **«A11y не тестировали — её нет»: ручной прогон на iPhone обязателен** (VoiceOver не работает в симуляторе). Минимум перед билд-вехой: VoiceOver-проход result/overview/scan/ask + AX5 + Reduce Motion + Smart Invert. Встроить в наш verification-флоу из [screen-contracts.md].

10. **Камера/скан — не забыть:** ShutterButton/PageCounter с label, авто-capture и quality-fail озвучивать словами (не только ✗/✓ и оверлей), `accessibilityIgnoresInvertColors` на фото документа. Это вход в продукт — нельзя терять VoiceOver-юзера на первом шаге.
