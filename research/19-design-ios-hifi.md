# 19 — iOS Hi-Fi Design Reference (grayscale → цвет)

> **Трек:** ios-hifi. **Дата:** 2026-06-18. **Цель:** дать дизайн-фактуру для перехода Decode из ч/б wireframes в hi-fi (цвет, тема, типографика, иконки, материалы iOS 26).
> **Продукт-контекст:** Decode — iOS-приложение (UK, последняя iOS), shell на Expo / React Native, AI = Claude. Сегмент S1 (BNPL 18–25). Запуск к 15.07.2026.
> **Важная оговорка про источники:** официальные страницы Apple HIG (`developer.apple.com/design/...`) — JS-rendered SPA и не отдаются через WebFetch как текст; ниже факты Apple подтверждены через зеркала HIG, developer-форумы Apple, документацию Expo и качественные вторичные разборы. Все существенные факты — с URL. Где не нашёл первоисточника с числом — помечено «не найдено / проверить на устройстве».

---

## 1. Apple HIG актуальное: iOS 26, Liquid Glass, навигация, sheets, safe areas, concentric corners

### 1.1 Что такое iOS 26 и Liquid Glass

В июне 2025 на WWDC25 Apple выпустила крупнейший визуальный редизайн со времён iOS 7 — **Liquid Glass**, единый язык across iOS 26, iPadOS 26, macOS Tahoe 26, watchOS, tvOS, visionOS ([Superdesign — Apple Design System 2026](https://www.superdesign.dev/blog/apple-design-system); [createwithswift](https://www.createwithswift.com/liquid-glass-redefining-design-through-hierarchy-harmony-and-consistency/)). Liquid Glass — полупрозрачный динамический материал, который преломляет (lensing) и отражает контент под собой, даёт specular highlights на движение устройства, адаптивные тени и морфинг-переходы ([theusefulapps](https://www.theusefulapps.com/news/exploring-apple-liquid-glass-ui-ios26); [mobivery](https://mobivery.com/en/liquid-glass-effect/)).

Базовые принципы HIG не изменились: **Clarity, Deference, Depth**; новизна — «иерархия через глубину» (прозрачность/преломление/вес вместо только контраста и размера) ([Superdesign](https://www.superdesign.dev/blog/apple-design-system)).

### 1.2 Где Liquid Glass уместен, а где — НЕТ (ключевое правило для Decode)

Главное архитектурное правило (из подробного [Liquid Glass Reference, conorluddy/GitHub](https://github.com/conorluddy/LiquidGlassReference)):

> «Liquid Glass is **exclusively for the navigation layer** that floats above app content… **Never apply to content itself** (lists, tables, media). Content = Primary; Glass controls = Secondary functional layer.»

То есть стекло — это **только слой управления** (tab bar, nav bar, кнопки, toolbars, sheets, popovers, menus), а контент (карточки decode-результата, суммы, текст summary) остаётся плоским и читаемым. **Anti-pattern: glass-on-glass** — нельзя класть стеклянный элемент на стеклянный, это ломает иерархию.

**Два варианта материала:**
| Вариант | Свойства | Когда применять |
|---|---|---|
| **Regular** | средняя прозрачность, полная адаптивность к любому фону, дефолт | большинство UI / навигация |
| **Clear** | высокая прозрачность | только для media-rich фонов, **требует dimming-слоя** под собой и жирного, контрастного foreground-контента |

Источник: [Liquid Glass Reference](https://github.com/conorluddy/LiquidGlassReference). SwiftUI-API (для справки, в Expo напрямую не нужны): `.glassEffect()`, `.glassEffect(.regular, in: .capsule)`, `GlassEffectContainer`, `.glassEffectID(_:in:)` для морфинга.

### 1.3 Навигация и Tab Bars в iOS 26

- Tab bar теперь **плавающая капсула, вписанная (inset) от краёв** экрана, с фоном Liquid Glass ([learnui.design — iOS 26 patterns](https://www.learnui.design/blog/ios-design-guidelines-templates.html); [Donny Wals](https://www.donnywals.com/exploring-tab-bars-on-ios-26-with-liquid-glass/)).
- **Search** может выноситься в отдельный круглый «island» из стекла справа от таб-бара ([learnui.design](https://www.learnui.design/blog/ios-design-guidelines-templates.html)).
- HIG напоминает: tab bar — для **переключения между крупными разделами** приложения (top-level), не для действий ([Donny Wals](https://www.donnywals.com/exploring-tab-bars-on-ios-26-with-liquid-glass/)). Для Decode это значит: tab bar = крупные зоны (напр. Overview / Scan / Vault / Ask), а не «кнопки-действия».
- Размеры tab bar в iOS 26 **адаптивные** (height/padding зависят от устройства и safe area), фиксированных чисел Apple не публикует — проверять на устройстве ([Medium — iOS 26 UI changes](https://medium.com/@bharathibala21/ios-26-ui-changes-what-developers-must-know-about-tab-bars-and-navigation-bars-524b80f116de)). Практические ориентиры из разбора: tab bar inset ≈ **21pt** слева/справа/снизу, home indicator ≈ **21pt** ([learnui.design](https://www.learnui.design/blog/ios-design-guidelines-templates.html)).

### 1.4 Sheets, modals

- Liquid Glass рекомендован для sheets, popovers, menus ([mobivery](https://mobivery.com/en/liquid-glass-effect/)).
- Полноэкранные modals в iOS 26 просто перекрывают экран; визуальный «стек» (карточки друг за другом) появляется только когда поверх modal открывается ещё один modal ([designfornative](https://designfornative.com/ui-changes-in-ios-26-thats-not-about-liquid-glass/)).
- Decode уже использует sheet-паттерн (см. `docs/screens/*`) — это конвенционально.

### 1.5 Concentric corners (важно для карточек-в-карточках)

iOS 26 ввёл **concentric** corner radius: радиус вложенного элемента вычисляется как `radius_родителя − padding`, чтобы концентрические скругления были идеальными (кнопка в карточке, bottom sheet под скругление экрана) ([designfornative](https://designfornative.com/ui-changes-in-ios-26-thats-not-about-liquid-glass/)). SwiftUI: `RoundedRectangle(cornerRadius: .containerConcentric)`. В RN/Expo нет нативной формулы — реализуем вручную тем же правилом: **внутренний радиус = внешний − внутренний padding**. У Decode уже есть лесенка радиусов (`--r-sm 8 / --r-default 12 / --r-lg 16 / --r-xl 20`) — concentric-логику накладываем поверх неё.

### 1.6 Safe areas

Safe-area insets в iOS 26 могли немного измениться; для кастомных tab bar их надо переоценивать ([Medium — iOS 26 UI changes](https://medium.com/@bharathibala21/ios-26-ui-changes-what-developers-must-know-about-tab-bars-and-navigation-bars-524b80f116de)). В Expo/RN — использовать `react-native-safe-area-context` (`useSafeAreaInsets`), не хардкодить отступы.

### 1.7 Liquid Glass и доступность — предостережение (прямо влияет на Decode)

Liquid Glass получил критику за читаемость: в ранних бетах замеряли контраст **до 1.5:1** при норме 4.5:1; текст поверх размытого/движущегося фона часто проваливается ниже WCAG 2.2 AA ([Infinum](https://infinum.com/blog/apples-ios-26-liquid-glass-sleek-shiny-and-questionably-accessible/); [NN/g — «Liquid Glass Is Cracked»](https://www.nngroup.com/articles/liquid-glass/); [letsdev](https://letsdev.de/en/blog/ios-26-in-detail-liquid-glass-ui-between-usability-and-accessibility.php)).

Система **автоматически** реагирует на accessibility-настройки пользователя (без кода): **Reduce Transparency** → усиливает фрост/непрозрачность; **Increase Contrast** → жёсткие цвета и границы; **Reduce Motion** → гасит анимации и elastic-эффекты; **Tinted Mode** (iOS 26.1+) → пользователь сам поднимает непрозрачность ([Liquid Glass Reference](https://github.com/conorluddy/LiquidGlassReference)).

**Вывод для Decode:** для финтех-приложения, где главное — точность чисел и доверие, стекло применять **дозированно и только на навигации**; критичный контент (true cost, trap-severity, citations) — на плоских непрозрачных surfaces с гарантированным контрастом. Не класть суммы/severity-бейджи поверх blur.

---

## 2. Dynamic Type — рампа и как поддерживать

### 2.1 Что это и зачем

iOS-стили текста (Body, Title, Caption…) масштабируются по шкале пользователя: 7 стандартных размеров (xSmall→xxxLarge) + 5 accessibility-размеров (**AX1–AX5**) при включении «Larger Accessibility Sizes» → 12 ступеней размера на 11 стилей ([Lickability](https://lickability.com/blog/dynamic-type-and-in-app-font-scaling/); [Medium — designer's guide](https://medium.com/design-bootcamp/a-product-designers-guide-to-dynamic-type-in-ios-a105dda39a95)). Правило HIG: **использовать text styles, а не хардкод pt** — стиль сам пересчитывается под настройку пользователя.

### 2.2 Рампа на размере **Large (Default)** — точка отсчёта дизайна

Канонические значения (size / weight / leading) на дефолтном размере, из зеркала HIG-таблицы ([codershigh — HIG Typography](https://codershigh.github.io/guidelines/ios/human-interface-guidelines/visual-design/typography/index.html); largeTitle 34pt и Headline 17pt подтверждены отдельно — [iphonelife/Apple](https://developer.apple.com/videos/play/wwdc2020/10175/), [Lickability](https://lickability.com/blog/dynamic-type-and-in-app-font-scaling/)):

| Стиль | Weight | Size (pt) | Leading (pt) |
|---|---|---|---|
| Large Title | Regular/Bold | **34** | 41 |
| Title 1 | Regular (Light в старых версиях) | **28** | 34 |
| Title 2 | Regular | **22** | 28 |
| Title 3 | Regular | **20** | 24 |
| Headline | **Semibold** | **17** | 22 |
| Body | Regular | **17** | 22 |
| Callout | Regular | **16** | 21 |
| Subhead | Regular | **15** | 20 |
| Footnote | Regular | **13** | 18 |
| Caption 1 | Regular | **12** | 16 |
| Caption 2 | Regular | **11** | 13 |

> Caption 2 имеет встроенный минимум **11pt** даже на самых мелких настройках — система не даёт тексту упасть ниже читаемого ([Medium — designer's guide](https://medium.com/design-bootcamp/a-product-designers-guide-to-dynamic-type-in-ios-a105dda39a95)).

**Сопоставление с текущими токенами Decode** (`docs/DESIGN.md`, в rem) — почти 1:1 с iOS-рампой, что хорошо:
- `--text-display 2.125rem` = **34px** → iOS Large Title;
- `--text-h1 1.625rem` = 26px → между Title 1 (28) и Title 2 (22);
- `--text-h2 1.25rem` = **20px** → Title 3;
- `--text-body 1.0625rem` = **17px** → Body/Headline;
- `--text-caption 0.8125rem` = **13px** → Footnote.

Рекомендация: на hi-fi оставить эту рампу (она уже «iOS-native»), но **назвать уровни именами iOS-стилей** в theme, чтобы дизайнеры и RN-код говорили одним языком.

### 2.3 Как поддерживать Dynamic Type (практика для Expo/RN)

- В RN системный шрифт масштабируется через `allowFontScaling` (по умолчанию `true`) — не отключать его глобально для контента.
- Не верстать по фиксированной высоте текстовых контейнеров: **разрешать перенос строк, не truncate**; на AX-размерах разрешать вертикальный скролл; иконки масштабировать вместе с текстом ([Medium — designer's guide](https://medium.com/design-bootcamp/a-product-designers-guide-to-dynamic-type-in-ios-a105dda39a95)).
- Тестировать ключевые экраны (decode-result, overview) на AX1–AX5 — там длинные суммы/лейблы рвут лейаут.
- WWDC24 «Get started with Dynamic Type» — методика ([Apple Developer](https://developer.apple.com/videos/play/wwdc2024/10074/)).

### 2.4 Tabular figures для денег (важно для Decode)

San Francisco по умолчанию использует **пропорциональные** цифры — суммы «прыгают» по ширине. Для £/%/дат включать **tabular (моноширинные) цифры**: CSS `font-variant-numeric: lining-nums tabular-nums` (web-прототип), в RN — `fontVariant: ['tabular-nums']` ([Medium — readable money](https://medium.com/design-bootcamp/the-elements-of-fintech-typography-part-1-readable-money-b6c1226acbde); [Sebastian De Deyne](https://sebastiandedeyne.com/tabular-numbers/)). У Decode это уже заложено: токен `--font-figures` + комментарий «tabular-nums для £/%/дат» — на hi-fi только проверить, что включено везде, где есть суммы (true cost, missed-payment fee).

---

## 3. SF Pro / SF Symbols — использование и лицензия в Expo/RN-приложении

### 3.1 Лицензия — суть

Apple лицензирует SF Pro и SF Symbols **только для разработки приложений под платформы Apple** (iOS/iPadOS/macOS/tvOS) и для UI-мокапов под эти ОС. Использование на не-Apple-платформах, как обычный шрифт/PNG/SVG в web или Android — **запрещено** ([Apple — Fonts](https://developer.apple.com/fonts/); [Apple Developer Forums — SF Pro в приложениях](https://developer.apple.com/forums/thread/719561); [Wikipedia — San Francisco typeface](https://en.wikipedia.org/wiki/San_Francisco_(sans-serif_typeface))).

SF Symbols дополнительно: нельзя использовать символы (или «substantially or confusingly similar» глифы) **в иконке приложения, логотипе или как товарный знак**; часть символов защищены копирайтом (значок info-badge в инспекторе) — их нельзя воспроизводить в кастомных символах ([Apple Developer Forums](https://developer.apple.com/forums/thread/724523)).

### 3.2 Что это значит конкретно для Decode (вывод, снимающий риск)

Decode — **нативное iOS-приложение** (Expo/RN компилируется в нативный iOS-бинарь). Это «зелёная зона» лицензии:

- **SF Pro:** на iOS его **не надо встраивать/редистрибутировать** — это системный шрифт, доступный через `fontFamily: 'System'` (а скруглённый вариант — `'ui-rounded'`) ([Arpith Siromoney — SF in RN](https://medium.com/@arpith/san-francisco-in-react-native-d83207418280); [Samuel Kraft](https://samuelkraft.com/blog/using-sf-pro-rounded-with-react-native)). Нет файла шрифта в репозитории → нет нарушения редистрибуции. Текущий токен Decode `-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui` корректен для web-прототипа; в нативном shell использовать `System`.
  - Нюанс оптических размеров: исторически **SF Text** до 19pt, **SF Display** от 20pt; система сама подбирает оптический размер на iOS, в RN при необходимости задаётся явно ([Arpith Siromoney](https://medium.com/@arpith/san-francisco-in-react-native-d83207418280); [learnui.design](https://www.learnui.design/blog/ios-font-size-guidelines.html)).
- **SF Symbols:** легальный путь — рендерить **нативные системные символы**, а не экспортировать их в SVG/PNG. В Expo это `expo-symbols` (`SymbolView`): на iOS/tvOS рендерит нативные SF Symbols; если передать строкой имя символа — **рендерится только на iOS** ([Expo — Symbols SDK](https://docs.expo.dev/versions/latest/sdk/symbols/)). Так символ остаётся в рамках ОС → лицензия соблюдена.
- **Кросс-платформенный нюанс:** на Android/web SF Symbols использовать нельзя; библиотеки (react-native-sfsymbols / навигация) подменяют их на **Material Symbols** ([ITNEXT](https://itnext.io/sf-symbols-in-react-navigation-nitro-powered-grids-and-howard-carters-archaeological-android-dig-aa0654e8cf07)). Для Decode (iOS-only на старте) это не блокер, но: **в маркетинге, на лендинге, в App Store-скриншотах вне симуляции iOS-устройства — SF Symbols/SF Pro не использовать**; для бренд-иконки приложения SF Symbols запрещены прямо лицензией.

> **Дизайн-решение:** для in-app иконок — SF Symbols через `expo-symbols` (родной вид iOS 26, бесплатно, масштабируется с Dynamic Type). Для бренд-логотипа Decode и веб/маркетинга — собственная иконка + не-Apple icon-set (напр. Lucide/Material) как fallback на Android/web.

---

## 4. Тёмная тема в финтехе

### 4.1 Базовые правила dark-палитры (консенсус)

- **Не чистый чёрный** для фона: брать очень тёмно-серый (#121212 / #1E1E1E) — меньше усталости глаз и видна глубина ([JPN Fintech](https://www.jpnfintech.com/designing-for-dark-mode-in-fintech-dos-and-donts/); [saasfactor](https://www.saasfactor.co/blogs/fintech-mobile-app-design)). У Decode база dark уже #0E0E11 (почти чёрный, но не #000) + elevated #16161A — это правильно.
- **Не чистый белый текст** на тёмном: чистый #FFF на #000 даёт halation (свечение) у людей с астигматизмом; брать off-white #E0E0E0–#F0F0F0 → контраст ~12–15:1 ([web-accessibility-checker](https://web-accessibility-checker.com/en/blog/color-contrast-wcag-guide)). У Decode `--gray-900` в dark = #EDEDF0 (off-white) — корректно.
- **Десатурировать акценты** на тёмном: насыщенные цвета «вибрируют» на тёмном даже при проходящем контрасте; снижать насыщенность на **20–40%** (Material Design) ([web-accessibility-checker](https://web-accessibility-checker.com/en/blog/color-contrast-wcag-guide)).
- **Elevated vs base:** iOS в dark использует два набора фонов — base (тусклее, «уходит») и elevated (светлее, «выходит вперёд») для глубины при наложении поверхностей ([Sarunw — dark color cheat sheet](https://sarunw.com/posts/dark-color-cheat-sheet/); [prototypr](https://blog.prototypr.io/designing-a-dark-mode-for-your-ios-app-the-ultimate-guide-6b043303b941)). Decode это уже моделирует: `card` в dark = gray-50, `popover` = gray-100 (поднятые поверхности светлее фона).
- **Семантические, не инвертированные цвета:** dark — это **отдельный набор**, а не инверсия light; задавать через семантические токены ([prototypr](https://blog.prototypr.io/designing-a-dark-mode-for-your-ios-app-the-ultimate-guide-6b043303b941)). Архитектура Decode (роли → примитивы, dark переопределяет только примитивы) — ровно этот паттерн.

### 4.2 Как показывают крупные суммы/числа на тёмном

- Баланс/сумма — **доминанта визуальной иерархии**, отвечает на «сколько у меня» за <3 сек ([saasfactor](https://www.saasfactor.co/blogs/fintech-mobile-app-design); [procreator](https://procreator.design/blog/best-fintech-ux-practices-for-mobile-apps/)).
- Крупный кегль (Large Title 34pt+) попадает под WCAG «large text» → достаточно **3:1** (против 4.5:1 для обычного), так что большие суммы легче провести по контрасту ([web-accessibility-checker](https://web-accessibility-checker.com/en/blog/color-contrast-wcag-guide)). Но для финтеха лучше держать запас.
- Цвет числа = смысл: рост/положительное — зелёное + стрелка вверх, негативное — красное + вниз (паттерн Copilot Money) ([designli](https://designli.co/blog/how-the-app-copilot-is-designed-to-help-users-keep-track-of-their-money/)). Decode: true cost / fee → нейтральный foreground (это факт, не «плохо/хорошо»), а severity/overdue → красный.
- Цифры — **tabular-nums** (см. §2.4), выровнять по правому краю в таблицах/списках платежей.

### 4.3 Примеры палитр (для калибровки бренд-хью)

- **Copilot Money:** редизайн под стиль iOS 26, light+dark; визуальный язык «зелёное/стрелка вверх = хорошо, красное/вниз = плохо», ставка на простые графики «для не-финансистов», «one beautiful interface» ([copilot changelog](https://changelog.copilot.money/); [designli](https://designli.co/blog/how-the-app-copilot-is-designed-to-help-users-keep-track-of-their-money/)). Точные hex не опубликованы — проверить в Mobbin/на устройстве.
- **Revolut:** на тёмном холсте — кобальт-фиолет (≈ `#494FDF`) как primary + широкая палитра насыщенных продуктовых цветов (teal, light-blue, deep pink, light-green, warning orange) для категорий; pill-кнопки, карточки radius 12/20 ([Mobbin — Revolut brand](https://mobbin.com/colors/brand/revolut); dark-набор `#0B84F6 / #F08389 / #0F4C8E / #649A97 / #AECCD4 / #25463E` — [ColorsWall](https://colorswall.com/palette/6595)).
- **N26:** dark = white-on-dark-grey пониженного контраста для ночи; бренд — Cod Gray + **Keppel** (teal/сине-зелёный) + White ([N26 blog](https://n26.com/en-eu/blog/dark-mode-is-now-available-to-all-n26-customers); [N26 — building dark mode](https://medium.com/insiden26/building-the-n26-dark-mode-2fc18c2ccdd5); [Mobbin — N26](https://mobbin.com/colors/brand/n26)). N26 — хороший референс «спокойного» dark.
- **Общий принцип сильных финтех-палитр:** нейтральная основа + высококонтрастные данные + акцент «с точностью», не хаотично ([eleken](https://www.eleken.co/blog-posts/trusted-fintech-ui-examples)).

### 4.4 Цвет и доверие для аудитории 18–25

- **Синий** = доверие/стабильность/спокойствие — самый «безопасный» выбор в финтехе EU/US ([billcut](https://www.billcut.com/blogs/color-psychology-in-fintech-ui-why-green-dominates/); [windmill](https://windmill.digital/psychology-of-color-in-financial-app-design/)).
- **Зелёный** доминирует в платёжных/бюджетных продуктах: «go / safe / success», рост, деньги; одновременно спокойный ([billcut](https://www.billcut.com/blogs/color-psychology-in-fintech-ui-why-green-dominates/)).
- **Deep teal** прямо рекомендуют для финтех-стартапов и брендов финграмотности для **younger audiences** — попадает в «calm/organized» ([inordo](https://inordo.com/shades-of-trust-how-color-psychology-influences-fintech-ui-design/)).
- Gen Z (digital-native) ждёт мгновенности, прозрачности, mobile-first; «персональные» цветовые системы (Monzo/Revolut/Chime) строят узнаваемость, оставаясь при этом спокойными ([personalone](https://personalone.org/fintech-gen-z-banking-2025/); [inordo](https://inordo.com/shades-of-trust-how-color-psychology-influences-fintech-ui-design/)).
- (Со ссылкой на исследование, повторенное вторичным источником) пользователи на 34% чаще завершают платёж, когда цвета «спокойные и привычные» — Nielsen India 2025, по [billcut](https://www.billcut.com/blogs/color-psychology-in-fintech-ui-why-green-dominates/). Цифру стоит перепроверить у первоисточника.

---

## 5. Рекомендация палитры-кандидата для Decode

### 5.1 Логика выбора

Decode = «commitments guardian» / декодер: тон должен быть **спокойно-банковский, доверительный, не алармистский** (продукт и так показывает ловушки и просрочки — интерфейс не должен добавлять тревоги). Для 18–25 нужен чуть «свежее», чем legacy-банк, но без игривости. Это указывает на **deep teal** как brand hue (доверие синего + рост/спокойствие зелёного, прямо рекомендован для молодёжной финграмотности — §4.4), при этом teal **не конфликтует** с обязательной семантикой success=green / danger=red (он смещён в сине-зелёную зону).

Палитра проектируется так, чтобы **встать в существующую токен-архитектуру Decode без переписывания экранов**: меняется только `--accent-placeholder` (становится brand-hue) и семантические hue (success/warning/danger/info), grayscale-рампа остаётся как есть.

### 5.2 Brand hue — Decode Teal (кандидат)

| Роль | Light | Dark | Назначение |
|---|---|---|---|
| `brand-600` (primary, light) | **#0E7C72** | — | основной акцент на светлом (кнопки/ссылки/выделение) |
| `brand-500` (primary, dark) | — | **#3BB7AC** | десатур./осветлённый teal под dark (см. §4.1) |
| `brand-700` (hover/pressed) | #0A625A | #2E9890 | состояние нажатия |
| `brand-50` (tint фон) | #E6F4F2 | `rgba(59,183,172,0.14)` | подложки/чипы выбранного таба |

Принцип: на dark акцент **светлее и менее насыщен**, чем на light (десатурация 20–40% по Material) — иначе «вибрирует» на #0E0E11.

### 5.3 Семантические hue (поверх grayscale, в дополнение к иконке/весу)

DESIGN.md уже зафиксировал намерения (`success → green, warning → amber, danger → red`). Кандидаты, подобранные под dark-читаемость:

| Роль | Light | Dark (осветл./десатур.) | Где |
|---|---|---|---|
| success | #1E8E5A | #34C77B | credit-file «NO», confidence ✓, рост |
| warning | #B8730A | #E0A23C | trap-MED, renewal-due, «Check this» |
| danger | #C4322B | #FF6B61 | trap-HIGH, overdue, credit-file «YES» |
| info | #2D6FE0 | #6BA4FF | trap-INFO, нейтральные подсказки |

> Severity/credit-file бейджи Decode по DESIGN.md уже различимы **без цвета** (иконка + вес + заливка/обводка) → colorblind-safe by construction. Цвет здесь — усиление, не единственный носитель смысла. Это правильно сохранить.

### 5.4 Контраст-проверка (на токенах Decode)

Foreground/background пары (на проходимость WCAG AA = 4.5:1 текст / 3:1 крупный текст и UI):

| Пара | Light | Dark | Оценка |
|---|---|---|---|
| Body text `gray-900` на `background` | #1A1A1E на #FFFFFF → ~16:1 | #EDEDF0 на #0E0E11 → ~15:1 | ✅ обе с большим запасом |
| Brand primary text на фоне | #0E7C72 на #FFF → ~4.6:1 | #3BB7AC на #0E0E11 → ~7.5:1 | ✅ AA (light — на грани для мелкого; для текста <17pt брать `brand-700`) |
| Белый текст на brand-кнопке | #FFF на #0E7C72 → ~4.6:1 | #0E0E11 на #3BB7AC (тёмный текст на светлой кнопке) → ~9:1 | ✅ (light — держать кегль/вес кнопки ≥ Headline) |
| danger на фоне | #C4322B на #FFF → ~5.0:1 | #FF6B61 на #0E0E11 → ~6.8:1 | ✅ |
| success на фоне | #1E8E5A на #FFF → ~3.6:1 | #34C77B на #0E0E11 → ~9:1 | ⚠️ light: 3.6:1 < 4.5 — годен только как крупный текст/иконка/заливка, не для мелкого текста; для мелкого взять #157A4C |

> Числа контраста — расчётные (по формуле WCAG relative luminance) и должны быть подтверждены инструментом (Stark / WebAIM Contrast Checker) на этапе hi-fi; помечаю как «проверить», т.к. это load-bearing для accessibility-гейта. Метод проверки и пороги — по [WCAG 1.4.3 / web-accessibility-checker](https://web-accessibility-checker.com/en/blog/color-contrast-wcag-guide) и [W3C Understanding 1.4.3](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html).

### 5.5 Где применять цвет, а где держать нейтраль (для «банковского» спокойствия)

- **Brand teal** — только акцентно: primary-кнопка, активный таб, ссылки, прогресс. Не заливать им крупные поверхности (иначе теряется «спокойствие»).
- **Суммы/true cost** — нейтральный `foreground` + tabular-nums; цветом красить только знаковые отклонения (overdue, штраф).
- **Liquid Glass (iOS 26)** — на tab bar / nav bar / sheets (вариант Regular), **не** под критичным контентом (§1.7). Tint стекла можно слегка увести в brand-hue, но проверить контраст лейблов.
- **Фон** — base #0E0E11 (dark) / #FFFFFF (light); поверхности по лесенке elevated (gray-50/100).

---

## Key takeaways for Decode

1. **Стекло — только на навигации, контент плоский.** Liquid Glass (iOS 26) применять к tab bar / nav bar / sheets (вариант **Regular**), и **никогда** к карточкам decode-результата, суммам, severity-бейджам и citations. У стекла реальная проблема контраста (замеры до 1.5:1) — для финтеха это риск доверия. Система сама уважает Reduce Transparency / Increase Contrast / Reduce Motion — на это можно положиться, но не строить на стекле читаемость данных. [Liquid Glass Ref](https://github.com/conorluddy/LiquidGlassReference), [NN/g](https://www.nngroup.com/articles/liquid-glass/)

2. **Типографику не трогаем — она уже iOS-native.** Текущая рампа Decode (display 34 / h2 20 / body 17 / caption 13) совпадает с Dynamic Type. На hi-fi: переименовать уровни в имена iOS-стилей, не отключать `allowFontScaling`, протестировать decode-result и overview на AX1–AX5 (длинные суммы рвут лейаут), всюду где есть £/%/даты — включить **tabular-nums** (токен уже есть).

3. **Лицензия SF Pro / SF Symbols — для Decode «зелёная зона», но с границами.** Т.к. Decode компилируется в нативный iOS: SF Pro = системный шрифт через `fontFamily:'System'` (не встраивать файл); SF Symbols = рендерить нативно через **`expo-symbols`** (не экспортировать в SVG/PNG). **Запрещено:** SF Symbols в иконке приложения/логотипе и любое использование SF Pro/Symbols на Android/web/в маркетинге — там Material Symbols + кастомная бренд-иконка. [Apple Fonts](https://developer.apple.com/fonts/), [Expo Symbols](https://docs.expo.dev/versions/latest/sdk/symbols/)

4. **Перекраска = смена ссылок токенов, не экранов.** Архитектура DESIGN.md (роли → примитивы; dark переопределяет только примитивы; статусы различимы без цвета) — ровно индустриальный best practice. Hi-fi сводится к: задать `--accent-placeholder` = brand teal + назначить hue у success/warning/danger/info. Экраны не переписываются.

5. **Dark-палитра у Decode уже почти правильная.** База #0E0E11 (не чистый чёрный), текст #EDEDF0 (off-white, без halation), elevated-поверхности светлее фона — всё по канону. Добавить только: **десатурировать акценты на 20–40%** под dark (brand teal #0E7C72 light → ~#3BB7AC dark; danger #C4322B → #FF6B61 и т.д.).

6. **Brand hue — deep teal — обоснован под сегмент и тон.** Teal = доверие синего + спокойствие/рост зелёного, прямо рекомендован для финграмотности younger audiences, не конфликтует с обязательным success=green / danger=red. Спокойный «банковский» тон достигается дисциплиной: teal только акцентно, суммы нейтральные, цвет = смысл (отклонение), а не декор. [inordo](https://inordo.com/shades-of-trust-how-color-psychology-influences-fintech-ui-design/), [billcut](https://www.billcut.com/blogs/color-psychology-in-fintech-ui-why-green-dominates/)

7. **Контраст-гейт перед билдом.** Расчётные пары проходят AA с запасом, **кроме** двух пограничных в light-теме: brand teal и success как **мелкий текст** дают ~4.6:1 и ~3.6:1 → для мелкого текста брать затемнённые варианты (`brand-700`, `#157A4C`); как крупный текст/иконка/заливка — годны. Прогнать всю палитру через Stark/WebAIM до hi-fi (это load-bearing). [W3C 1.4.3](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
