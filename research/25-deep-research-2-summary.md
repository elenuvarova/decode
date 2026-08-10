# 25 — Deep Research Wave 2: синтез (треки 19–24)

**Дата синтеза:** 2026-06-18 · **Источник:** 6 отчётов второй волны [19](19-design-ios-hifi.md)–[24](24-competitor-watch.md) · **Назначение:** мост от собранных ч/б wireframes к **hi-fi дизайн-фазе** (цвет/тема/типографика/материалы iOS 26) и к **билду** (extraction-архитектура, eval-гейт, пейволл, a11y, GTM). Платформа: последняя iOS, iPhone-first, Expo/RN, AI = Claude. Запуск к 15.07.2026 (BNPL Regulation Day).

> **Предшественник:** [00 — Executive Summary](00-executive-summary.md) (волна 1, треки 01–18). Эта сводка не повторяет волну 1, а надстраивает над ней пять прикладных слоёв (дизайн в цвете, доступность, цена, GTM, AI-eval) + адверсариальное обновление конкурентов.

> **⚠️ ОПРОВЕРГНУТЫЙ факт (учтён ниже, не опираться на исходную формулировку трека 19):**
> Трек [19 §5.4](19-design-ios-hifi.md) дал расчётный контраст brand teal `#0E7C72` на белом ≈ **4.6:1** и success `#1E8E5A` ≈ **3.6:1**. Перепроверка [WebAIM](https://webaim.org/resources/contrastchecker/?fcolor=0E7C72&bcolor=FFFFFF): brand teal `#0E7C72` на белом = **5.06:1** (проходит AA для мелкого текста; AAA только для крупного), success `#1E8E5A` = **4.14:1** (НЕ проходит AA 4.5:1 для обычного/мелкого текста; проходит AA 3:1 для крупного). Вывод сохраняется и **усиливается**: success-зелёный в light-теме нельзя использовать как мелкий текст — для мелкого текста брать затемнённый вариант (`#157A4C`), как и предписывал трек 19. Все расчётные числа палитры — load-bearing → прогнать через WebAIM/Stark до hi-fi, цифры из отчёта не принимать на веру.

---

## 1. TL;DR — 10 буллетов

1. **Перекраска ч/б → цвет = смена ссылок токенов, а НЕ переписывание экранов.** Архитектура DESIGN.md (роли → примитивы; dark переопределяет только примитивы; статусы различимы без цвета) — индустриальный best practice. Hi-fi сводится к: задать brand hue + назначить hue у success/warning/danger/info ([19](19-design-ios-hifi.md), [20](20-accessibility.md)).
2. **Brand hue — deep teal** (`#0E7C72` light / `~#3BB7AC` dark): доверие синего + спокойствие/рост зелёного, рекомендован для финграмотности younger audiences, не конфликтует с обязательным success=green / danger=red. Тон «спокойно-банковский» достигается дисциплиной: teal только акцентно, суммы нейтральные, цвет = смысл, не декор ([19](19-design-ios-hifi.md)).
3. **Liquid Glass (iOS 26) — ТОЛЬКО навигационный слой, НИКОГДА на контенте.** Стекло на tab bar / nav bar / sheets (вариант Regular); критичный контент (true cost, severity, citations) — на плоских непрозрачных surfaces. У стекла реальная проблема контраста (замеры до 1.5:1) = риск доверия для финтеха ([19](19-design-ios-hifi.md)).
4. **A11y у Decode уже встроена грейскейлом — задача не растерять её при покраске.** Цвет ДОБАВЛЯЕТСЯ к иконке/слову/весу, никогда не ЗАМЕНЯЕТ. Severity-слово (High/Medium/Info) и credit-file YES/NO всегда в тексте, а не «выводятся из красноты» — это 1.4.1 (A) + VoiceOver-дружелюбность + FCA-тон одновременно ([20](20-accessibility.md)).
5. **£ ломает VoiceOver:** показываем «£412», в `accessibilityLabel` пишем «412 pounds» словом + `accessibilityLanguage="en-GB"`. Стриминг/процессинг требуют `announceForAccessibility` (на iOS нет live-region). Тест a11y только на реальном iPhone (VoiceOver не работает в симуляторе) ([20](20-accessibility.md)).
6. **БИЛД-ГЕЙТ пейволла: Apple с янв 2026 массово реджектит trial-toggle** по Guideline 3.1.2. Decode НЕ проектировать с тумблером триала — multi-plan selector + trial timeline. Пейволл показывать после первого успешного decode (Day-0), не на cold-старте ([21](21-pricing-monetization.md)).
7. **Упаковка пересобрана:** free = N decodes/мес (полный wedge, но лимит), Pro = unlimited + полный Vault + Watch/Renewal Radar. «Полный single decode навсегда» отдавал wedge даром и прятал ценность Pro за отложенный Watch. Цена £4.99/мес держится как anchor, но финализировать через Van Westendorp PSM раздельно по S1/S2 ([21](21-pricing-monetization.md)).
8. **Регуляторный коридор = GTM-актив, не препятствие.** Маркетинг Decode (платный decoder-tool, без кредита/bank connection) сидит ВНЕ financial promotion s21 FSMA → не нужна FCA-авторизация для рекламы. 15.07.2026 — PR-хук №1. Риск — выпасть в перимиметр формулировками «improve credit score»/«advice»/сравнение кредитных продуктов ([22](22-gtm-aso-launch.md)).
9. **Двухвызовная AI-архитектура подтверждена и неизбежна:** Structured Outputs + Citations в одном запросе = 400 by design. Вызов A = extraction (`output_config.format`, GA), Вызов B = Q&A (`citations:enabled`). Числа извлекаются как verbatim+confidence, true cost считает детерминированный движок, не LLM ([23](23-ai-eval-extraction.md)).
10. **Дыра по-прежнему пуста ровно в центре, но периметр сжался.** Снизу подполз generic «AI Contract Analyzer & Scan» (App Store, UK: scan+plain-English+risk+reminders, но без BNPL/citations/true-cost/трекинга), сверху нависает conversational-AI о деньгах (Revolut AIR/Cleo/ChatGPT). Окно открыто, launch к 15.07 своевременен — не с запасом ([24](24-competitor-watch.md)).

---

## 2. Выжимка решений по областям

### 2.1 iOS hi-fi / палитра ([19](19-design-ios-hifi.md))

**Что решено для Decode:**

- **Палитра встаёт в существующую токен-архитектуру без переписывания экранов.** Меняем `--accent-placeholder` → brand teal и назначаем hue ролям success/warning/danger/info; grayscale-рампа остаётся.
- **Brand teal:** `brand-600 #0E7C72` (primary light) / `brand-500 #3BB7AC` (primary dark, десатур./осветл. на 20–40% по Material — иначе «вибрирует» на `#0E0E11`); hover `#0A625A`/`#2E9890`; tint `#E6F4F2`/`rgba(59,183,172,0.14)`.
- **Семантические hue:** success `#1E8E5A`/`#34C77B`, warning `#B8730A`/`#E0A23C`, danger `#C4322B`/`#FF6B61`, info `#2D6FE0`/`#6BA4FF`. (Контраст-числа из §5.4 трека 19 — расчётные, перепроверить; см. опровержение во врезке выше.)
- **Типографику НЕ трогаем — она уже iOS-native.** Текущая рампа (display 34 / h2 20 / body 17 / caption 13) совпадает с Dynamic Type Large/Default. На hi-fi: переименовать уровни в имена iOS-стилей (Large Title / Title3 / Body / Footnote), не отключать `allowFontScaling`, всюду где £/%/даты — включить `tabular-nums` (токен `--font-figures` уже есть).
- **SF Pro / SF Symbols — «зелёная зона» для нативного iOS-приложения.** SF Pro через `fontFamily:'System'` (не встраивать файл); SF Symbols через `expo-symbols` (нативный рендер, не SVG/PNG). **Запрещено:** SF Symbols в иконке/логотипе приложения; любое использование SF Pro/Symbols на Android/web/в маркетинге (там Material Symbols + кастомная бренд-иконка).
- **Dark-палитра Decode уже почти по канону:** база `#0E0E11` (не чистый чёрный), текст `#EDEDF0` (off-white против halation), elevated-поверхности светлее base. Добавить только десатурацию акцентов под dark.
- **Concentric corners iOS 26:** радиус вложенного = радиус родителя − padding. В RN — вручную тем же правилом поверх лесенки радиусов 8/12/16/20.
- **Где держать цвет:** brand teal только акцентно (primary-кнопка, активный таб, ссылки, прогресс); суммы/true cost — нейтральный foreground + tabular-nums, цветом красить только знаковые отклонения (overdue, штраф).

### 2.2 Accessibility ([20](20-accessibility.md))

**Что решено для Decode (привязано к реальным компонентам):**

- **Стандарт:** WCAG 2.2 AA + Apple HIG. Контраст валидируется **на уровне токенов** (не компонентов), **дважды** (light+dark), перед каждым мёржем палитры. Пороги без округления: текст 4.5:1, крупный/UI 3:1.
- **Не-цветовое кодирование статуса (1.4.1, уровень A) — ядро продукта.** Severity (HIGH/MED/INFO), confidence, credit-file YES/NO дублируются иконкой + словом + весом. Зоны риска: жёлтый `ConfidenceTag` «Check this» (нужен тёмный текст на жёлтом), спокойный-но-проходящий red HIGH, disclaimer/signpost (юридический текст — не делать «серым мелким» ниже 4.5:1).
- **VoiceOver-контракт result = аха-приоритет продукта:** порядок чтения aha-число → `CreditFileBadge` → traps (по severity HIGH→MED→INFO) → summary → disclaimer. Плотные карточки (`AhaNumber`, `TrapCard`, `CommitmentRow`, `CreditFileBadge`) — один accessible-контейнер с единым label, не россыпь свайпов. Заголовки секций → `role="header"` (навигация ротором).
- **£ ломает VoiceOver:** display «£412» / label «412 pounds» словом; единый хелпер `currencyForA11y`/`percentForA11y`; `accessibilityLanguage="en-GB"`. Прогнать edge-case £1,234,567.89.
- **Динамика без live-region:** на iOS `accessibilityLiveRegion` НЕ работает (только Android). Использовать `AccessibilityInfo.announceForAccessibility` для стриминга aha-числа, смены этапов `StageProgress`, «Recalculated», «Saved · watching 2 dates»; `setAccessibilityFocus` на заголовок шторки; `accessibilityViewIsModal` + `onAccessibilityEscape` на модалках.
- **Dynamic Type до AX5 — отдельный тест-сценарий.** Не отключать `allowFontScaling`; `maxFontSizeMultiplier` на заголовках/UI не ниже 1.2; flexbox без фиксированных высот. Хрупкие: `AhaNumber` (большое число × AX5), `CommitmentRow` (→ многострочность).
- **Tap targets 44pt** (Apple строже WCAG-24px), `hitSlop` где визуально меньше. Reduce Motion (`isReduceMotionEnabled`) — гейт для scan-line, count-up aha-числа, переходов sheet.
- **Тест обязателен на реальном iPhone** (VoiceOver не в симуляторе): VoiceOver-проход result/overview/scan/ask + AX5 + Reduce Motion + Smart Invert. Встроить в verification-флоу из screen-contracts.

### 2.3 Pricing / монетизация ([21](21-pricing-monetization.md))

**Что решено для Decode:**

- **Van Westendorp PSM раздельно по S1 (18–25 BNPL) и S2 (35–60 renewal)**, 100–300 респондентов на сегмент, + Newton-Miller-Smith extension (purchase-intent → кривая выручки). Коридор = [PMC; PME]. Инструмент: SurveyMonkey/Qualtrics/Conjointly. £4.99 — anchor-гипотеза, не финал.
- **Конверсия:** реалистичная планка freemium 3–5% free→paid (finance/utility у верхнего края), floor 2%, stretch 6%+. Чистый freemium медианно 2.1% vs hard paywall 10.7%, но retention через год паритетен.
- **БИЛД-ГЕЙТ:** не проектировать пейволл с trial-toggle (Apple Guideline 3.1.2, реджекты с янв 2026, аппеляции не работают). Multi-plan selector + trial timeline (Today → reminder → charge).
- **Тайминг пейволла:** сразу после первого успешного decode реального оффера (момент aha/Day-0). 80–90% trial starts и ~44.5% покупок — в Day 0.
- **Триал:** если делать — НЕ 3 дня (finance недо-конвертит на коротких; нужно несколько сессий до aha). Либо freemium-с-лимитом без триала, либо 7-дневный триал. A/B обе модели.
- **Переупаковка:** free = N decodes/мес (полный summary + true cost + trap detector + Q&A, но лимит), Pro = unlimited + полный Vault + Watch/Renewal Radar. Лимит по объёму сохраняет вирусность и создаёт Day-0-видимый апселл.
- **Планы:** Monthly £4.99 + Annual ~£34.99–39.99 (анкорить как ~£2.9/мес, save ~40%); опц. новый Apple monthly-paid 12-mo commitment ~£3.49/мес под безденежных 18–25. Включить billing grace period (7–16 дн), чтобы guardian не «отключался» из-за просроченной карты.
- **Small Business Program:** подать заявку до запуска → 15% комиссии с дня 1 (вместо 30%) при <$1M proceeds — ×2 net-выручки.

### 2.4 GTM / ASO / launch ([22](22-gtm-aso-launch.md))

**Что решено для Decode:**

- **Регуляторный коридор — моат и PR.** Реклама Decode (платный SaaS, без кредита/bank connection) вне s21 FSMA → не нужна FCA-авторизация для маркетинга (в отличие от BNPL-конкурентов). 15.07.2026 BNPL Regulation Day — PR-хук №1: «регулятор заставляет лендеров показывать условия яснее — Decode уже делает это за пользователя».
- **ASO — перехват намерения, не лобовая война с Klarna** (146k+ отзывов, Shopping-категория). Decode = Finance. Name (≤30) кандидат `Decode: Pay Later & Contracts`; основной трафик — long-tail B-ключи интента («does buy now pay later affect credit score», «late payment fee», «read before you buy»). Бренды конкурентов — максимум в keywords-поле (риск App Review). A/B иконку/скрины/субтайтл через Apple PPO; первый скриншот = before/after «мутный договор → true cost £X».
- **Каналы 18–25 — органика вперёд платки** (Apple Search Ads Finance CPA ~$13.28, TikTok finance CPM $11+, fintech iOS CPI >$10): органический TikTok (4–7 видео, educational/exposé-тон), нативный Reddit (без self-promo), пилот 5–10 микро-финфлюенсеров (£100–500/пост, бюджет £1–3k), двусторонние рефералы (нематериальные награды). Платку (узкий ASA на B-ключи) — после activation-данных.
- **Метрики:** North Star = успешные декоды/нед, не инсталлы (~87% finance-юзеров не открывают повторно за 24ч). Цели D1 ≥30%, D30 ≥12%, free→paid 3.4–5%. Инструментировать воронку capture→summary→Q&A с дня 1.
- **Партнёрства:** MoneyHelper разрешает свободно ссылаться/републиковать без разрешения — одностороннее signposting безопасно и Consumer-Duty-дружественно. «In partnership with / endorsed by» без письменного согласия запрещено.
- **Compliance-гардрейлы в дизайн и копирайтинг:** НИКОГДА «improve credit score», «advice» (что гасить/брать), сравнение конкретных кредитных продуктов, заявления о партнёрстве. Любой оплаченный пост = #ad до контента + бриф в фактическом поле (нарушение FG24/1 = уголовка до 2 лет).
- **Сегмент-инсайт в продукт:** «43% Gen Z считают BNPL risk-free» + «32% 18–29 пропускали платёж» = разрыв осознания = core-месседж + signposting-фича (free debt help).

### 2.5 AI-eval / extraction ([23](23-ai-eval-extraction.md))

**Что решено для Decode (успешник к [06](06-tech-claude-vision-extraction.md), без дублирования):**

- **Двухвызовная архитектура закреплена:** Вызов A extraction (`output_config.format`, citations off) ⊥ Вызов B Q&A (`citations:{enabled:true}`, без output_config). Комбинировать = 400 by design (подтверждено дословно в Citations docs на 2026-06-18). Не обойти — проектировать сразу как два пути.
- **Structured Outputs теперь GA** (не beta) на Opus 4.8/4.7/4.6/4.5, Sonnet 4.6/4.5, Haiku 4.5, Fable 5. Новый shape `output_config.format`; старый `output_format`+beta-header депрекейтнуты. Грамматика компилируется (100–300мс) и кэшируется 24ч.
- **Схема извлечения — поля как объекты `{value, verbatim, confidence(enum), not_found}`, не скаляры.** verbatim — якорь для provenance, citation-подсветки и cross-check движка; not_found — штатное «не нашёл», а не пустая строка.
- **Семантическую валидацию делать на бэкенде:** схема Structured Outputs НЕ поддерживает `minimum/maximum/minLength`/рекурсию → диапазон APR (0–199%), дата в будущем, неотрицательность сумм — детерминированный слой поверх parsed JSON.
- **True cost считает детерминированный движок из `value`, модель только извлекает.** Арифметика LLM — слабое место; это и архитектурный, и FCA-аргумент, и защитный ров против generic-LLM/сканеров.
- **Citation-привязка по пути ввода:** PDF с текстом → `page_location` + PyMuPDF `search_for(cited_text)` для точного bbox (координаты точные, не приблизительные). Фото/скан → транскрипция → `char_location` → подсветка **поверх транскрипции**, не поверх фото (image citations не существуют). Тонкая гранулярность (строки таблицы) → custom content → `content_block_location`.
- **Числа — самый хрупкий тип факта.** Eval мерит `numeric_exact_match` отдельным срезом (нормализация → exact, толеранс 0); текст — ANLS/fuzzy; trap-детекция — precision/recall/F1; `hallucination_rate` (выдуманное value при эталонном not_found) — первоклассная метрика с потолком ≤2%.
- **Eval-гейт:** golden set 30–50 UK-документов, стратифицированный (тип ввода / провайдер / тип документа / наличие trap / качество фото), включая «hard negatives» (блик-на-сумме). Регрессионный прогон через Batch API (−50% стоимость). Гейт = пороги по срезам (числа не имеют права просесть, hallucination ≤ baseline, trap-recall ≥ baseline−2pp), не одно усреднённое F1. LLM-as-judge только для нечисловых полей.
- **Honest-refusal — UX-контракт:** low-confidence/not_found/inconsistent verbatim → «не смогли уверенно прочитать X — проверьте/введите вручную», а не тихий 0. Системный промпт: явное разрешение `not_found`, запрет вычислять/угадывать числа, external-knowledge restriction, verbatim-grounding, adaptive thinking для CoT-проверки чисел.

### 2.6 Competitor-watch ([24](24-competitor-watch.md))

**Что решено для Decode (адверсариальное обновление с трека [18](18-competitor-teardowns.md), +4 дня):**

- **Дыра пуста в центре:** ни Cleo, ни Revolut AIR, ни Nous, ни ReSubs/Finny в неё не вошли. Координаты дыры: no-bank × AI-объяснение документа × consumer-finance × BNPL-фокус × обязательство-как-трекаемый-объект × UK — ни одна строка карты угроз не закрывает все колонки.
- **Новая ближайшая угроза по механике — «AI Contract Analyzer & Scan» (App Store, UK, $49.99/год):** scan + plain-English + risk-флаги (low→critical) + deadline-reminders + on-device. **Зазор:** нет BNPL-фокуса, нет Q&A с citations, нет детерминированного true-cost, только разовый deadline (не трекинг-во-времени). → Decode уже **не первый «сфоткай договор»**; differentiator сужается до BNPL-нишевания + true-cost + BNPL-trap-corpus + cited Q&A + Vault/Renewal Radar.
- **ReSubs / Finny** — самые близкие по «no-bank capture обязательства из скриншота», но застряли на extract-слое (только подписки, без понимания контракта/BNPL).
- **Generic LLM (ChatGPT/Claude upload-PDF)** — системный «floor»: любой может загрузить BNPL-T&C и получить объяснение. Defensibility Decode — true-cost + trap-corpus + citations + трекинг, не «LLM читает текст».
- **Conversational-AI о деньгах (Revolut AIR 13M UK, Cleo, Starling, NatWest)** — bank-locked, без doc-decode, но нормализуют «говорить с AI о деньгах» → дистрибуционный/нормализационный риск, поднимают UX-планку.
- **ChatGPT Personal Finance** (15.05.2026) — US-only, Pro-tier, Plaid bank-connect, без document-upload в анонсе → пока не угроза в UK, но крупнейшее стратегическое событие; ежемесячный watch.
- **Кросс-провайдерный BNPL-трекер в UK НЕ найден** — «все мои BNPL за 6 недель без bank link» — уникальный незанятый слот, острие позиционирования к 15.07.

---

## 3. Что меняется для hi-fi дизайн-фазы и для билда

### 3.1 Для hi-fi дизайн-фазы

- **Палитра как набор токен-ссылок, не редизайн экранов.** Завести brand teal + семантические hue в DESIGN.md; экраны не переписывать ([19](19-design-ios-hifi.md), [20](20-accessibility.md)).
- **Контраст-гейт ДО мёржа палитры:** прогнать ВСЕ пары через WebAIM/Stark, дважды (light+dark). Внимание к опровергнутым числам трека 19: success-зелёный light `#1E8E5A` = 4.14:1 → НЕ для мелкого текста (брать `#157A4C`); brand teal `#0E7C72` = 5.06:1 → ок для мелкого текста. Расширить пункт DESIGN.md до полной матрицы пар × (light/dark) ([19](19-design-ios-hifi.md), [20](20-accessibility.md), врезка-опровержение).
- **Liquid Glass — только tab bar / nav bar / sheets (Regular).** Не класть суммы/severity/citations поверх blur. Тинт стекла можно слегка увести в brand-hue, но проверить контраст лейблов ([19](19-design-ios-hifi.md)).
- **Цвет ДОБАВЛЯЕТСЯ к иконке/слову/весу, не ЗАМЕНЯЕТ.** Severity-слово и credit-file YES/NO остаются в тексте после покраски ([20](20-accessibility.md)).
- **Переименовать типо-уровни в имена iOS-стилей; tabular-nums всюду, где £/%/даты.** Спроектировать `AhaNumber`/`CommitmentRow` под AX5 (wrap, без фиксированных высот) ([19](19-design-ios-hifi.md), [20](20-accessibility.md)).
- **Пейволл-экран без trial-toggle:** multi-plan selector (Monthly / Annual save ~40% / опц. monthly-paid 12-mo) + trial timeline + comparison table free vs Pro + benefit-driven CTA. Показывается после первого decode ([21](21-pricing-monetization.md)).
- **In-app иконки — SF Symbols через expo-symbols.** Бренд-логотип Decode — кастомная иконка (SF Symbols в иконке приложения запрещены лицензией) ([19](19-design-ios-hifi.md)).
- **Hero-нарратив сместить с generic «scan any document» на «BNPL guardian»** (true-cost + BNPL-trap + кросс-провайдерное обязательство). Первый App Store-скриншот = before/after ([24](24-competitor-watch.md), [22](22-gtm-aso-launch.md)).
- **Confidence/honest-refusal как видимое UI-состояние:** «Check this»/«Couldn't read»/«Calculated, not AI» — дизайнить как штатные состояния полей, не как ошибки ([23](23-ai-eval-extraction.md), [20](20-accessibility.md)).
- **Copy-гардрейлы FCA в макетах:** нет «improve credit score», «advice», сравнения кредитных продуктов; есть signposting в MoneyHelper/Citizens Advice ([22](22-gtm-aso-launch.md)).

### 3.2 Для билда

- **Два LLM-вызова, не один:** A=extraction (`output_config.format`, GA), B=Q&A (`citations:enabled`). Схема полей `{value, verbatim, confidence, not_found}`; держать схему стабильной (24h grammar cache) ([23](23-ai-eval-extraction.md)).
- **Детерминированный true-cost движок на бэкенде** поверх extracted `value`; семантическая валидация (диапазоны/форматы/кросс-полевые) тоже на бэкенде (схема SO их не даёт) ([23](23-ai-eval-extraction.md)).
- **Citation-подсветка:** PDF → PyMuPDF `search_for` для bbox; фото → подсветка по транскрипции (image citations не существуют) ([23](23-ai-eval-extraction.md)).
- **Eval-харнесс с регрессионным гейтом** (golden 30–50, Batch API, пороги по срезам, `numeric_exact_match`/`hallucination_rate`/trap-recall) — встроить в CI до смены промпта/модели/схемы ([23](23-ai-eval-extraction.md)).
- **A11y-механика в RN:** `accessibilityLabel` с «pounds»-словами + `currencyForA11y` хелпер; `announceForAccessibility` для стриминга/этапов; `accessibilityViewIsModal`+`setAccessibilityFocus`+`onAccessibilityEscape` на шторках; `maxFontSizeMultiplier` ≥1.2 на заголовках; Reduce Motion-гейт; `accessibilityIgnoresInvertColors` на фото; `accessibilityLanguage="en-GB"` ([20](20-accessibility.md)).
- **StoreKit 2:** одна subscription group (Monthly + Annual), introductory offer (НЕ toggle), billing grace period 7–16 дн, `showManageSubscriptions(in:)`. Подать заявку в Small Business Program до запуска ([21](21-pricing-monetization.md)).
- **Метрики с дня 1:** Day-0 conversion, free/trial→paid, RLTV по плану, monthly churn (цель ≤9%), refund rate, decode→upgrade, activation-воронка capture→summary→Q&A, North Star = успешные декоды/нед ([21](21-pricing-monetization.md), [22](22-gtm-aso-launch.md)).
- **Verification-флоу расширить:** Playwright/extreme-content + «AX5» и «Reduce Motion» сценарии; линт на icon-only кнопки без `accessibilityLabel`; ручной VoiceOver-проход на iPhone перед билд-вехой ([20](20-accessibility.md)).
- **Capture camera-first** (паритет с ReSubs/Finny/сканером): «сфоткай Klarna-экран» — дефолтный инпут, ручной ввод — fallback ([24](24-competitor-watch.md)).
- **Vault/Renewal Radar приоритизировать выше «красивого разбора одного документа»** — обязательство-как-трекаемый-объект во времени = главный дифференциатор против сканеров ([24](24-competitor-watch.md)).

---

## 4. Обновлённый вердикт по «дыре» и угрозам

**Вердикт:** дыра Decode — «no-bank × AI-объяснение документа × BNPL-фокус × обязательство-как-трекаемый-объект × UK» — **по-прежнему пуста в центре** на 2026-06-18. За 4 дня с трека [18](18-competitor-teardowns.md) ни один игрок в неё не вошёл. Но **периметр сжался с двух сторон:**

- **Снизу (механика):** появился UK-доступный consumer-апп **«AI Contract Analyzer & Scan»**, закрывший scan + plain-English + risk-флаги + deadline-reminders. → Decode **уже не первый «сфоткай договор»**. Дифференциатор сместить в нишу + доверие + трекинг: **BNPL-фокус + детерминированный true-cost + BNPL-trap-corpus + cited Q&A + Vault/Renewal Radar (обязательство-во-времени, не разовый deadline).**
- **Сверху (нормализация):** Revolut AIR (13M UK), Cleo (UK relaunch), Starling, NatWest приучают аудиторию «говорить с AI о деньгах» → поднимают UX-планку и грозят разговорному дифференциатору, но все bank-locked, без doc-decode. ChatGPT Personal Finance — US/Pro/Plaid, без document-upload → пока не угроза в UK, но крупнейший стратегический watch.

**Защитные рвы (build-приоритеты P0):** (1) детерминированный true-cost вне LLM — «we don't guess your numbers»; (2) citations к строке документа — сканер-конкурент этого НЕ даёт; (3) Vault/Renewal Radar как кросс-провайдерное обязательство-во-времени; (4) no-bank как явное обещание в onboarding/ASO (растущий контр-тренд приватности).

**Окно:** открыто, но закрывается. Launch к **15.07.2026** своевременен — не с запасом. Ежемесячный re-check: (a) ChatGPT Personal Finance → UK + document-upload; (b) добавит ли Cleo/Revolut AIR doc-scan; (c) запустит ли кто дедицированный UK BNPL-трекер; (d) не добавит ли сканер-класс BNPL-нишевание/citations. ([24](24-competitor-watch.md))

---

## 5. Открытые вопросы (verify before / during фазы)

1. **Контраст-числа палитры** ([19 §5.4](19-design-ios-hifi.md)) — расчётные, частично опровергнуты (success `#1E8E5A` = 4.14:1, не 3.6:1; brand teal `#0E7C72` = 5.06:1, не 4.6:1). Прогнать ВСЮ палитру через WebAIM/Stark до hi-fi; не принимать цифры отчёта на веру.
2. **Van Westendorp PSM по S1 и S2 не проведён** — £4.99 остаётся гипотезой. Нужно 100–300 респондентов/сегмент + Newton-Miller-Smith extension до финализации цены/пейволла ([21](21-pricing-monetization.md)).
3. **Tab bar inset / safe-area iOS 26** — Apple не публикует фиксированных чисел (≈21pt — из вторичных разборов); проверить на устройстве через `useSafeAreaInsets` ([19](19-design-ios-hifi.md)).
4. **Compliance-review копий и брифов у UK consumer-credit-юриста** до запуска платной рекламы и партнёрств (верификация ≠ юрзаключение) ([22](22-gtm-aso-launch.md)).
5. **UK App Store search-volume по ключам** публично не отдаётся — мерить через Apple Search Ads Search Popularity / AppTweak ([22](22-gtm-aso-launch.md)).
6. **Статус «budgeting/education app» в TikTok paid-политике** не найден — уточнить у TikTok-представителя; допустимость competitor-брендов в keywords-поле — проверить актуальные App Review Guidelines; правила r/UKPersonalFinance — проверить на сабреддите ([22](22-gtm-aso-launch.md)).
7. **Confidence-калибровка** (self-reported, не logprobs) — проверить на golden-сете: при `confidence:"high"` числовая точность должна быть ≥95%, иначе low-флаг бесполезен для UX ([23](23-ai-eval-extraction.md)).
8. **Bbox-привязка фото к пикселям** — MVP подсвечивает по транскрипции; привязка к пикселям фото требует сохранения bbox токенов на шаге транскрипции (vision-модель надёжно их не отдаёт) — отложенная сложность ([23](23-ai-eval-extraction.md)).

---

## 6. Индекс файлов 19–24

| # | Файл | Трек | Суть |
|---|---|---|---|
| 19 | [19-design-ios-hifi.md](19-design-ios-hifi.md) | iOS hi-fi / палитра | Apple HIG iOS 26 + Liquid Glass (только навигация), Dynamic Type рампа, лицензия SF Pro/Symbols, dark-финтех, рекомендация палитры deep teal под токен-архитектуру Decode |
| 20 | [20-accessibility.md](20-accessibility.md) | accessibility | WCAG 2.2 AA + Apple HIG под экраны Decode: контраст на токенах, VoiceOver-контракт result, £-баг, не-цветовой статус, Dynamic Type AX5, tap-targets 44pt, Reduce Motion, RN-props |
| 21 | [21-pricing-monetization.md](21-pricing-monetization.md) | pricing | Van Westendorp PSM (S1/S2), freemium-бенчмарки, paywall UX 2026 (toggle-запрет Apple), StoreKit 2 / SBP 15%, переупаковка free=N decodes / Pro=unlimited+Vault+Watch |
| 22 | [22-gtm-aso-launch.md](22-gtm-aso-launch.md) | gtm-aso-launch | Регкоридор вне s21 = моат+PR, ASO long-tail (не лобовая с Klarna), органика 18–25, launch-playbook вокруг 15.07, North Star=декоды, FCA/ASA/FG24-1 риски |
| 23 | [23-ai-eval-extraction.md](23-ai-eval-extraction.md) | ai-eval | Structured Outputs (GA) extraction-схема `{value,verbatim,confidence,not_found}`, двухвызовная архитектура (SO+Citations=400), citation-binding PDF/фото, eval golden-set + регрессионный гейт, guards против числовых галлюцинаций |
| 24 | [24-competitor-watch.md](24-competitor-watch.md) | competitor-watch | Адверсариальное обновление с трека 18: дыра пуста в центре, периметр сжался (новый «AI Contract Analyzer & Scan» снизу, Revolut AIR/ChatGPT сверху), карта угроз по квадранту, watch-list |

**Связанные файлы волны 1 (для контекста):** [00-executive-summary.md](00-executive-summary.md) · [06-tech-claude-vision-extraction.md](06-tech-claude-vision-extraction.md) (модели/токены/цены — успешник 23) · [09b-fca-boundary-verified.md](09b-fca-boundary-verified.md) (FCA-граница) · [10b-trap-tc-corpus.md](10b-trap-tc-corpus.md) (trap-таксономия для extraction/eval) · [18-competitor-teardowns.md](18-competitor-teardowns.md) (baseline для 24). Дизайн-токены: [../docs/DESIGN.md](../docs/DESIGN.md).
