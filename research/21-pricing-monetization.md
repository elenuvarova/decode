# 21 — Pricing & монетизация Decode

> Трек: **Pricing/монетизация Decode углублённо.** Дата: 2026-06-18.
> Продукт: Decode — iOS-приложение (UK, последняя iOS), AI-декодер финансовых документов + commitments guardian для BNPL-пользователей 18–25. Wedge: фото/шеринг BNPL-оффера → plain-English summary + детерминированный true cost + trap detector + Q&A с citations; Vault + Renewal Radar. НЕТ bank connection. Shell: Expo/React Native. AI: Claude. Цена-гипотеза ~£4.99/мес freemium. Запуск к 15.07.2026 (BNPL Regulation Day).
> Метод: каждый существенный факт — с inline-ссылкой на первоисточник или вендорский отчёт. Где не нашлось — помечено "не найдено".

---

## 0. TL;DR (для тех, кто читает один абзац)

- **Цена £4.99/мес правдоподобна как "anchor", но это нужно проверить через Van Westendorp PSM раздельно по сегментам** (S1 18–25 BNPL и S2 35–60 renewal) — у них разный willingness-to-pay (WTP). Метод даёт коридор приемлемых цен (PMC↔PME) и оптимальную точку (OPP); добавить Newton-Miller-Smith extension, чтобы из WTP получить кривую выручки. Нужно 100–300 респондентов **на сегмент**.
- **Чистый freemium конвертит медианно ~2.1% download→paid; hard paywall — ~10.7% (5×)**, но через год retention почти одинаков ([RevenueCat 2026](https://www.revenuecat.com/state-of-subscription-apps/)). Реалистичный план для Decode freemium: **2–5% free→paid** (финансовые/utility — у верхнего края диапазона).
- **Trial-to-paid сильно зависит от длины триала**: 17–32 дня → медиана 42.5%; ≤4 дней → 25.5%. Но **3-дневные триалы недо-конвертят именно в finance/education**, где value требует нескольких сессий ([RevenueCat 2026](https://www.revenuecat.com/state-of-subscription-apps/)).
- **КРИТИЧНО для билда:** с января 2026 Apple **массово отклоняет "toggle paywall"** (тумблер «включить free trial») по Guideline 3.1.2 как misleading. Decode **не должен** использовать toggle-триал; нужен multi-plan selector или timeline-paywall ([RevenueCat](https://www.revenuecat.com/blog/growth/rip-toggle-paywall/), [Adapty](https://adapty.io/blog/your-toggle-paywall-is-about-to-get-rejected/)).
- **Apple Small Business Program: 15% с первого дня** при <$1M proceeds/год — Decode почти наверняка квалифицируется, надо **подать заявку до запуска** ([Apple](https://developer.apple.com/app-store/small-business-program/)).
- Предложенная упаковка (free = полный single decode; paid = Watch-слой) **логична**, но "полный single decode бесплатно" размывает основной wedge. Ниже — реалистичная переработка пейволла.

---

## 1. Van Westendorp / PSM — как провести на S1 и S2

### 1.1 Что это и зачем

Van Westendorp Price Sensitivity Meter (PSM) — метод, разработанный Peter Van Westendorp (1976), который через 4 вопроса об «открытой цене» строит кривые восприятия цены и выдаёт психологически значимые ценовые точки ([SurveyMonkey](https://www.surveymonkey.com/market-research/resources/van-westendorp-price-sensitivity-meter/), [Sawtooth](https://sawtoothsoftware.com/resources/blog/posts/van-westendorp-pricing-sensitivity-meter)). Это **не** замена тесту реальной готовности платить, но дешёвый и быстрый способ найти **коридор цен** до запуска — что для Decode идеально на текущей фазе (нет ещё платящих пользователей).

### 1.2 Четыре вопроса (формулировки на английском, под Decode)

Респонденту сначала показывается ясное описание продукта + 1–2 скриншота ключевого экрана (decode summary / Renewal Radar), затем 4 вопроса об **открытой** цене (не выбор из списка). Формулировки ([SurveyMonkey](https://www.surveymonkey.com/market-research/resources/van-westendorp-price-sensitivity-meter/), [Conjointly](https://conjointly.com/products/van-westendorp/)):

1. **Too cheap** — *"At what monthly price would Decode be so cheap that you'd question whether it actually works / is trustworthy?"*
2. **Bargain (cheap / good value)** — *"At what monthly price would Decode be a great deal — good value for what it does?"*
3. **Getting expensive** — *"At what monthly price would Decode start to feel expensive, so you'd think twice before subscribing?"*
4. **Too expensive** — *"At what monthly price would Decode be so expensive you definitely wouldn't subscribe?"*

Для подписки в инструментах (SurveyMonkey/Qualtrics) выбирается product type = "Subscription"/"monthly subscription", задаётся валюта **GBP (£)** и мин/макс лимиты + валидация ответов (нельзя ввести бессмыслицу вроде "too cheap" > "too expensive") ([SurveyMonkey help](https://help.surveymonkey.com/en/surveymonkey/solutions/van-westendorp/)).

### 1.3 Что считаем (ценовые точки)

Кривые накопленных долей пересекаются в 4 точках ([Wikipedia](https://en.wikipedia.org/wiki/Van_Westendorp's_Price_Sensitivity_Meter), [Resonio](https://www.resonio.com/market-research/van-westendorp/)):

| Точка | Пересечение кривых | Смысл |
|---|---|---|
| **PMC** (Point of Marginal Cheapness) | "too cheap" × "expensive" | **Нижняя граница** приемлемого коридора; ниже — растёт сомнение в качестве |
| **PME** (Point of Marginal Expensiveness) | "too expensive" × "cheap" | **Верхняя граница** коридора; выше — теряем много покупателей |
| **OPP** (Optimal Price Point) | "too cheap" × "too expensive" | Точка, где доли «слишком дёшево» и «слишком дорого» равны — минимизирует сопротивление с обеих сторон |
| **IPP** (Indifference Price Point) | "cheap" × "expensive" | Цена, которую равное число считает дешёвой/дорогой; обычно ≈ средняя рыночная / то, что «привыкли платить» |

**Range of Acceptable Prices = [PMC; PME]** — внутри него выбираем финальную цену ([businessinitiative.org](https://www.businessinitiative.org/tools/guide/price-sensitivity-meter/)). Если OPP заметно выше IPP — есть премиальная надбавка; если OPP сильно ниже PME — продукт скорее переоценён, премиум не возьмут.

### 1.4 Newton-Miller-Smith extension (обязательно добавить)

Голый PSM не даёт **выручку** — только восприятие. Newton/Miller/Smith (1993) добавляют **два вопроса о purchase intent** (5-балльная шкала «насколько вероятно купите») на «cheap» и «expensive» ценах респондента. Это позволяет оценить trial/reach rate и построить **кривую выручки** (доля купивших × цена), чтобы найти не «психологически удобную», а **revenue-maximizing** цену ([Sawtooth](https://sawtoothsoftware.com/resources/blog/posts/van-westendorp-pricing-sensitivity-meter), [Umbrex](https://umbrex.com/resources/frameworks/pricing-frameworks/van-westendorp-price-sensitivity-meter/)). Для Decode это критично: «удобная» и «зарабатывающая» цены могут расходиться, особенно у S2.

### 1.5 Семплинг и сегментация — конкретно под Decode

- **Рекомендуемый размер выборки: 100–300 респондентов на сегмент** ([Umbrex](https://umbrex.com/resources/frameworks/pricing-frameworks/van-westendorp-price-sensitivity-meter/)). Для двух сегментов → **минимум ~200–300 суммарно, лучше 150+ на каждый**.
- **Строить кривые ОТДЕЛЬНО по S1 и S2** — PSM-кривые сегментируются (student vs professional и т.п.), у каждого свой коридор и якоря ([Umbrex](https://umbrex.com/resources/frameworks/pricing-frameworks/van-westendorp-price-sensitivity-meter/)). Объединять нельзя: 18–25 BNPL и 35–60 renewal-guardian имеют разный доход и разную «привычную» цену.
- **Рекрутинг:** S1 — через каналы 18–25 (TikTok/Reddit UK, студенческие сообщества, panel-вендоры с таргетингом по возрасту/использованию BNPL). S2 — panel с фильтром «платит ≥1 подписку, 35–60». Можно докупать ответы в SurveyMonkey/панелях с таргетингом демографии ([SurveyMonkey](https://www.surveymonkey.com/market-research/resources/van-westendorp-price-sensitivity-meter/)).
- **Где провести:** нативная поддержка PSM есть в SurveyKing, SurveyMonkey, Qualtrics, Conjointly (авто-чарты PMC/PME/OPP/IPP) — не нужно считать вручную ([SurveyKing](https://www.surveyking.com/help/van-westendorp-analysis), [Conjointly](https://conjointly.com/products/van-westendorp/)).

### 1.6 Ограничения метода (честно)

PSM показывает **намерение**, не поведение; люди склонны занижать «too expensive» в опросе. Поэтому PSM — для **сужения коридора до запуска**, а финальную цену валидировать A/B-тестом реального пейволла (price tests в RevenueCat/Adapty) уже на живом трафике. Категорийная заметка: в финансах triala мало для оценки → PSM полезен именно потому, что не требует продукта в руках.

---

## 2. Бенчмарки freemium-конверсии (UK финтех/utility/subscription apps)

> Все цифры — медианы из вендорских отчётов на агрегированных данных. UK-специфичных разрезов «free→paid именно для UK fintech» в публичных отчётах **не найдено** в чистом виде; ниже — ближайшие релевантные срезы (geo Western Europe, категории Finance/Business/Utilities) + общие SaaS-бенчмарки.

### 2.1 Freemium vs hard paywall (главная развилка модели)

RevenueCat State of Subscription Apps 2026 (данные по ~$16B+ выручки, 115k+ приложений) ([RevenueCat 2026](https://www.revenuecat.com/state-of-subscription-apps/), [саммари](https://www.revenuecat.com/blog/growth/subscription-app-trends-benchmarks-2026/)):

| Метрика | Freemium | Hard paywall |
|---|---|---|
| Медиана download→paid (D35) | **2.1%** | **10.7%** (5×) |
| Топ-10% download→paid | — | **38.7%** |
| Retention через 1 год | ≈ паритет | ≈ паритет |

Вывод RevenueCat: hard paywall забирает выручку быстрее, но **не удерживает лучше** в долгую. Это значит, что выбор freemium vs paywall для Decode — выбор скорости монетизации vs ширины воронки/виральности, а не выбор «лучшего LTV».

### 2.2 Реалистичные free→paid для freemium

- Общий стандарт freemium: **2–5% free→paid** — «хорошо»; **6–8%** — «отлично»; топ >10% ([Appcues](https://www.appcues.com/blog/free-to-paid-conversion), [First Page Sage](https://firstpagesage.com/seo-blog/saas-freemium-conversion-rates/)).
- **Personal finance / accounting tools — у верхнего края**: freemium-модели 5–8%, потому что у инструмента высокая практическая ценность (compliance/деньги) ([Appcues](https://www.appcues.com/blog/free-to-paid-conversion)).
- Traditional freemium в среднем: 13.3% visitor→free, но только **2.6% free→paid** ([поиск/Crazyegg](https://www.crazyegg.com/blog/free-to-paid-conversion-rate/)).

**Планка для Decode (freemium):** закладывать **3–5% free→paid** как «success», 2% как «floor», 6%+ как stretch. Для финансового utility это оправданно.

### 2.3 Trial-to-paid (если выбираем триал-модель)

RevenueCat 2026, медианы trial→paid по гео ([RevenueCat 2026](https://www.revenuecat.com/state-of-subscription-apps/)):

| Регион | Медиана trial→paid |
|---|---|
| North America | 34.2% (топ-квартиль 47.9%+) |
| Asia-Pacific | 31.9% |
| **Western Europe (вкл. UK)** | **29.7%** |
| IN/SEA | 15.2% |

По длине триала ([RevenueCat 2026](https://www.revenuecat.com/state-of-subscription-apps/)):

| Длина триала | Медиана trial→paid |
|---|---|
| 17–32 дня | **42.5%** |
| 5–9 дней | 37.4% |
| ≤4 дня | 25.5% |

**Важная категорийная оговорка:** RevenueCat прямо отмечает, что **3-дневные триалы недо-конвертят в education и finance**, где нужно несколько сессий, чтобы понять ценность — длину триала надо калибровать под «time to value» категории ([RevenueCat 2026](https://www.revenuecat.com/state-of-subscription-apps/)). Для Decode «time to value» = первый decode оффера, который у пользователя реально на руках → может прийти не в день 1.

Adapty 2025/2026 ([Adapty State 2025 PDF](https://uploads.adapty.io/state_of_in_app_subscriptions_2025.pdf), [Adapty trial 2026](https://adapty.io/blog/trial-conversion-rates-for-in-app-subscriptions/)):

- Sweet spot 5–9 дней (>половины приложений), медиана ~45%.
- **Opt-out триалы (с картой вперёд)** конвертят в ~2.5–3× выше opt-in: opt-out ~31.4% vs opt-in ~8.9% (2026 данные). Причина — карта вперёд фильтрует high-intent.

### 2.4 Категорийные срезы выручки (Finance / Utilities)

- **Finance/fintech: ~9% месячного churn** (ниже среднего — выше switching costs), **медианный subscriber lifetime ~10.5 мес** ([RevenueCat 2026 саммари](https://www.revenuecat.com/blog/growth/subscription-app-trends-benchmarks-2026/)). Это **хороший знак** для Decode: финансовые подписки «прилипают».
- **Utilities — 73.6% выручки от weekly-планов** (Adapty) — категория тяготеет к коротким циклам ([Adapty 2025 саммари](https://adapty.io/blog/state-of-in-app-subscriptions-2025-in-10-minutes/)). Decode стоит на стыке finance + utility.
- Download→paid (D35) по категориям (RevenueCat 2026): Health&Fitness 2.9%, Business 2.6%, Gaming 1.0% — Finance публично не выделен отдельной строкой, но логически рядом с Business.

### 2.5 Realized LTV (Year 1) — Western Europe

- Western Europe: медиана **$25 RLTV/payer** за год 1; North America $32; глобально $23 ([RevenueCat 2026](https://www.revenuecat.com/state-of-subscription-apps/)).
- По прайс-тиру (Month 1 RLTV): high-priced $35.89 / mid $15.78 / low $6.67 — **высокая цена даёт мультипликативно больше LTV** ([RevenueCat 2026](https://www.revenuecat.com/state-of-subscription-apps/)). Подтверждается и Adapty: high-priced apps зарабатывают **3× LTV** низкоценовых ([Adapty 2026](https://adapty.io/blog/high-performing-paywall-2026/)).

> Следствие для Decode: £4.99/мес — это «mid/low» тир. LTV-математика говорит «не бойся ставить выше», но WTP сегмента 18–25 (низкий доход) тянет вниз → именно поэтому PSM раздельно по S1/S2 решает спор.

---

## 3. Paywall UX best practices 2026

### 3.1 Hard vs soft vs trial — что выбрать

- **Hard paywall**: блокирует всё до оплаты; конвертит выше (~10.7%) и даёт +21% LTV, но ~50% ниже конверсия в смысле ширины и подходит для high-intent ([Adapty 2026](https://adapty.io/blog/high-performing-paywall-2026/), [funnelfox](https://blog.funnelfox.com/effective-paywall-screen-designs-mobile-apps/)).
- **Soft paywall / free trial**: ниже барьер входа, шире воронка; «подписка с free trial часто — лучший баланс» ([funnelfox](https://blog.funnelfox.com/effective-paywall-screen-designs-mobile-apps/)).
- **Рекомендация вендоров — тестировать оба, не выбирать догматически** ([Adapty 2026](https://adapty.io/blog/high-performing-paywall-2026/)).

### 3.2 Тайминг показа пейволла

- **Показывать ПОСЛЕ онбординга, который продемонстрировал ценность**, не до ([Adapty 2026](https://adapty.io/blog/high-performing-paywall-2026/)).
- Onboarding-paywall конвертит **1.35% (с триалом) vs 0.89% in-app** ([Adapty 2026](https://adapty.io/blog/high-performing-paywall-2026/)).
- **80–90% trial starts происходят в Day 0** → онбординг и первый «aha» решают всё ([RevenueCat 2025](https://www.revenuecat.com/state-of-subscription-apps-2025/), [Adapty 2026](https://adapty.io/blog/high-performing-paywall-2026/)).
- Для Decode «aha» = пользователь видит plain-English summary + true cost своего реального оффера. Лучший момент пейволла — **сразу после первого успешного decode**, а не на cold-старте.

### 3.3 Структура и копирайт высоко-конвертящего пейволла 2026

Из [Adapty 2026](https://adapty.io/blog/high-performing-paywall-2026/), [Superwall](https://superwall.com/blog/5-paywall-patterns-used-by-million-dollar-apps), [funnelfox](https://blog.funnelfox.com/effective-paywall-screen-designs-mobile-apps/):

- **Single-screen, без скролла**; ясно видны все планы сразу (не прятать за тапами/тумблерами).
- **Free vs Pro comparison table** — один из самых частых элементов у топ-приложений; снимает возражение «за что я плачу».
- **Trial timeline (Today → Day X reminder → charge)** — Apple-endorsed паттерн; показывает, когда спишут и как отменить → меньше рефандов и тревоги.
- **Benefit-driven CTA** > generic («Start understanding my BNPL deals» > «Subscribe»).
- **Trust-сигналы**: рейтинги/Trustpilot, число пользователей, отзывы; «Cancel anytime» / «No commitment» рядом с CTA; «We'll remind you before the trial ends» нейтрализует страх внезапного списания ([funnelfox](https://blog.funnelfox.com/effective-paywall-screen-designs-mobile-apps/)).
- **Clarity > persuasion**: Duolingo подняли конверсию, убрав неопределённость процесса покупки, а не «продавая сильнее» ([поиск/RevenueCat](https://www.revenuecat.com/blog/growth/how-top-apps-approach-paywalls/)).
- **Anchoring annual via monthly-equivalent**: показывать годовой план как «£X/мес при годовой оплате» рядом с месячным ([Adapty 2026](https://adapty.io/blog/high-performing-paywall-2026/)). Типичная скидка годового vs месячного — **15–30%** (часто маркетируют как «save 30–50%») ([appdrift](https://appdrift.co/blog/app-store-subscription-pricing-strategy), [funnelfox app pricing](https://blog.funnelfox.com/app-pricing-models-guide/)).

### 3.4 Free trial без карты (opt-in) vs с картой (opt-out)

- **Без карты (opt-in)**: шире воронка, ниже конверсия (~8.9% в 2026 по Adapty) — но больше людей попробуют.
- **С картой (opt-out)**: конверсия в ~2.5–3× выше (фильтр high-intent), но входит меньше людей.
- На iOS «free trial» технически реализуется как introductory offer на подписке — пользователь **подтверждает покупку подписки** (карта/Apple ID привязаны), а списание идёт после триала. То есть «совсем без платёжного метода» в нативном StoreKit-триале не бывает; «без карты» в маркетинговом смысле = пользователь видит £0 сейчас и понятную дату списания.

### 3.5 КРИТИЧНО: toggle-paywall запрещён Apple (2026)

С **середины января 2026** Apple начала массово отклонять приложения с «toggle paywall» — тумблером «включить/выключить free trial» — по **Guideline 3.1.2**, формулировка Apple: *"The purchase screen includes a toggle to add or remove a free trial... This design is confusing and may prevent users from understanding that they are committing to an auto-renewing subscription"* ([RevenueCat RIP toggle](https://www.revenuecat.com/blog/growth/rip-toggle-paywall/), [Adapty](https://adapty.io/blog/your-toggle-paywall-is-about-to-get-rejected/)).

- Аппеляции **не работают**; даже ранее одобренные приложения не могут пушить апдейты, пока не уберут тумблер ([RevenueCat](https://www.revenuecat.com/blog/growth/rip-toggle-paywall/)).
- **Разрешённые альтернативы**: multi-package selector (weekly/monthly/annual, триал бейджем на одном плане); timeline-paywall (Today→Day 7→charge); value-first; персонализированные пейволлы; отдельный «14-day free trial plan» вместо тумблера (одобренный паттерн Flo Health) ([RevenueCat](https://www.revenuecat.com/blog/growth/rip-toggle-paywall/)).
- Запрет — только iOS; на Android/web тумблер ещё жив.

**Это требование к билду Decode: не проектировать пейволл с trial-toggle.** Использовать multi-plan selector + trial timeline.

### 3.6 Discount / win-back механика

- «9 из 10 подписок продаются по полной цене» — скидку давать не всем, а **post-close welcome offer только не-конвертнувшимся** (24-часовое окно), ожидаемый лифт ARPU 10–15% ([Adapty 2026](https://adapty.io/blog/high-performing-paywall-2026/)).
- Эксперименты приносят деньги: топ-приложения делают ~14.7 экспериментов/год; win-rate локализационных тестов 62.3%, trial-structure 59.6%, visual/copy 34.6% ([Adapty 2026](https://adapty.io/blog/high-performing-paywall-2026/)).

---

## 4. Apple IAP / StoreKit 2 — биллинг-гигиена

Источник раздела — [Apple: Auto-renewable Subscriptions](https://developer.apple.com/app-store/subscriptions/), [Apple: Implementing introductory offers](https://developer.apple.com/documentation/storekit/implementing-introductory-offers-in-your-app), [Apple: Small Business Program](https://developer.apple.com/app-store/small-business-program/).

### 4.1 Subscription groups (фундамент)

- Подписка **обязана** принадлежать subscription group; пользователь может иметь **только одну активную подписку в группе** одновременно.
- Для большинства приложений рекомендована **одна группа** (избегаем случайных двойных покупок). Внутри группы — ранги (Level 1 = высший) для upgrade/downgrade/crossgrade.
- Для Decode: **одна группа** с планами monthly + annual (+ возможный lifetime отдельным IAP вне группы, если решат).

### 4.2 Introductory offers (3 типа)

1. **Free Trial** — бесплатно N дней, затем стандартная цена. *Free trial НЕ засчитывается в "days of paid service".*
2. **Pay as You Go** — сниженная цена за период N (напр. £0.99/мес ×3), потом полная.
3. **Pay Up Front** — единая сниженная сумма за длительный период (напр. £9.99 за первые 6 мес), потом стандарт.

**Ключевое правило:** customer может погасить **ровно один introductory offer на subscription group**. Один intro-offer на подписку на территорию ([Apple subscriptions](https://developer.apple.com/app-store/subscriptions/)). То есть «free trial второй раз тому же юзеру» — нельзя (для повторного захода используют **promotional / win-back offers**, отдельный механизм).

### 4.3 Отмена, billing retry, grace period

- **Отмена**: юзер управляет в настройках Apple Account; внутри приложения — `showManageSubscriptions(in:)`. Отмена действует до конца оплаченного периода.
- **Billing retry (involuntary churn)**: при неудачном продлении Apple пытается восстановить **60 дней**; days of paid service «на паузе»; если восстановилось — счётчик не сбрасывается; если нет за 60 дней — подписка истекает, счётчик days-of-paid-service сбрасывается ([Apple subscriptions](https://developer.apple.com/app-store/subscriptions/)).
- **Billing grace period** (опция, включается в App Store Connect; 3/7/16/28 дней): пользователь сохраняет доступ во время grace, пока Apple чинит платёж — снижает «случайный» churn. **Рекомендуется включить** для Decode (финансовый guardian не должен внезапно «выключаться» из-за просроченной карты).
- Уведомления о статусе — через App Store Server Notifications (`DID_FAIL_TO_RENEW` и т.п.) + App Store Server API.

### 4.4 Комиссии — что реально платит Decode

| Сценарий | Доля разработчика | Apple берёт |
|---|---|---|
| Стандарт, год 1 подписки | 70% | **30%** |
| Стандарт, год 2+ (тот же подписчик ≥12 мес paid service) | 85% | **15%** |
| **Small Business Program (<$1M proceeds/год)** | **85% с дня 1** | **15%** | 
| EU alt-terms, SBP, подписка после 1-го года | 90% | 10% |

- «Один год paid service» считается **по группе**; free trial и $0-офферы **не** засчитываются; upgrade/downgrade внутри группы **не сбрасывают** счётчик ([Apple subscriptions](https://developer.apple.com/app-store/subscriptions/)).
- Все проценты — **после вычета налогов**.

### 4.5 Small Business Program — Decode почти наверняка подходит

- **15% с первого дня** для разработчиков с **≤$1M proceeds** (выручка за вычетом комиссии и налогов, в USD) в прошлом календарном году; новые разработчики квалифицируются сразу ([Apple SBP](https://developer.apple.com/app-store/small-business-program/), [RevenueCat SBP guide](https://www.revenuecat.com/blog/engineering/small-business-program/)).
- Если в текущем году перешагнул $1M → стандартная ставка на будущие продажи; если в будущем году снова <$1M → можно ре-квалифицироваться год спустя.
- **Действие для запуска:** подать заявку на SBP в App Store Connect (принять Schedule 2, перечислить associated accounts) **до запуска** — экономит половину комиссии (30%→15%). Это прямой буст unit-экономики при £4.99/мес.

### 4.6 Налоги/VAT (UK)

- Apple действует как агент: собирает и **ремитит VAT сам** (B2B с разработчиком, B2C с конечником); разработчик VAT не возвращает ([поиск/Apple tax](https://developer.apple.com/news/?id=yo2104n5)).
- Apple **не меняет цену подписки автоматически** при изменении налога/курса — но при изменении ставки VAT твои **proceeds** пересчитываются (комиссия и доля считаются после вычета VAT). То есть UK VAT уже «зашит» в цену для пользователя; задача — выбрать price point, понимая, что net получаешь после VAT и после 15%/30%.
- Доступно ~800 price points (+100 по запросу) на подписку ([поиск/App Store Connect pricing](https://developer.apple.com/help/app-store-connect/reference/pricing-and-availability/in-app-purchase-and-subscriptions-pricing-and-availability/)).

### 4.7 Свежее (апрель 2026): monthly-paid annual commitment

Apple ввела новый формат: подписка **с помесячной оплатой, но обязательством на 12 месяцев** — даёт «годовую» сниженную цену при ежемесячных платежах, понижая ценовой барьер ([MacRumors](https://www.macrumors.com/2026/04/27/app-store-monthly-subscriptions-12-month-commitment/), [TechCrunch](https://techcrunch.com/2026/04/28/apple-introduces-a-cheaper-option-for-app-store-subscriptions/)). Для S1 (низкий доход 18–25) это **прямо релевантно**: можно предложить £3.49/мес × 12 мес-commitment вместо £4.99 monthly без commitment.

### 4.8 Регуляторный контекст (UK steering — следить, не блокер)

- Apple получила Strategic Market Status в UK (окт 2025); первые CMA-обязательства (честный ревью, прозрачность ранжирования) — с 1 апреля 2026; **комиссии пока не затронуты**, steering-меры ожидаются в H1 2026 ([поиск/funnelfox EU fees](https://blog.funnelfox.com/apple-app-store-fees-2026-eu-dma/), [GOV.UK CMA](https://www.gov.uk/guidance/the-cmas-programme-of-work-across-mobile-platforms)).
- В US суд (Epic) с апреля 2025 заставил пускать external purchase links без комиссии, но апелляция (дек 2025) разрешает Apple брать «fee, covering its costs» в будущем ([MacRumors external links](https://www.macrumors.com/2025/12/11/apple-app-store-fees-external-payment-links/)). **Для UK на дату отчёта external-steering пока не разблокирован** — закладываться на 15% IAP, не на web-checkout.

---

## 5. Что именно за пейволл у Decode — реалистичная упаковка и цена

### 5.1 Анализ исходной гипотезы (free = полный single decode; paid = Watch-слой)

**Логика гипотезы:** дать бесплатно «магию» (decode оффера на руках) для виральности и доверия → монетизировать «постоянную бдительность» (Watch: Vault + Renewal Radar + alerts).

**Риски, которые видны из бенчмарков:**

1. **«Полный single decode бесплатно навсегда» отдаёт основной wedge даром.** Для разовых пользователей (взял decode → решил → ушёл) ценность Watch-слоя неочевидна на момент пейволла. Это толкает в нижние 2.1% freemium-конверсии.
2. **Watch-слой = задержанная ценность** (renewal сработает через месяцы) → плохой «time to value» именно там, где Apple-данные говорят, что 80–90% решений принимаются в Day 0. Юзер не дождётся, чтобы увидеть пользу Renewal Radar до оплаты.
3. **3-дневный триал на Watch бесполезен** — Renewal Radar нечего показать за 3 дня (категорийная проблема finance из §2.3).

### 5.2 Рекомендованная переработка пейволла

Сохранить «free single decode» как **acquisition hook**, но сделать **free лимитированным по объёму**, а paid — раскрыть так, чтобы ценность была видна в Day 0:

| Слой | Free | Pro (£/мес) |
|---|---|---|
| **Decode (wedge)** | **N decodes/мес** (напр. 1–2/мес) — полный summary + true cost + trap detector + Q&A с citations | **Unlimited decodes** |
| **Vault** | хранит только последние N | Unlimited Vault + поиск/история |
| **Renewal Radar / Watch** | — (или 1 отслеживаемый commitment) | Полный Watch: unlimited tracked commitments + alerts + Renewal Radar |
| **Q&A** | базовый | расширенный (follow-ups, экспорт) |

Почему так:
- **Лимит по числу decodes** (а не полное закрытие) сохраняет вирусность и доверие («попробуй на своём реальном оффере»), но создаёт естественный апселл у активных пользователей — это и есть «well-timed upsell», который вытаскивает freemium из 2% в 4–6% ([RevenueCat 2026 саммари](https://www.revenuecat.com/blog/growth/subscription-app-trends-benchmarks-2026/)).
- **Ценность Pro видна в Day 0** (unlimited + полный Vault), а не через месяцы.
- Watch остаётся «sticky» дифференциатором Pro (finance churn низкий — §2.4), удерживающим LTV.

### 5.3 Цена и план — рекомендация (до PSM, как гипотеза для теста)

- **£4.99/мес monthly** — валидный anchor для S1; держать.
- **Annual £34.99–£39.99/год** (≈£2.92–£3.33/мес-equiv, скидка ~30–40% к месяцу) — анкорить как «£2.9/мес billed annually». Adapty/RevenueCat: annual подписчики дают существенно больший LTV; типичная скидка 15–30%(маркетинг 30–50%).
- **Опц. monthly-paid 12-mo commitment** (новый Apple-формат, §4.7): **£3.49/мес × 12** — снижает барьер для безденежных 18–25, сохраняя годовой LTV.
- **Модель входа:** для finance не делать ≤3-дн триал. Варианты: **(a) freemium с лимитом decodes (без триала)** — проще, шире воронка, лучше под «decode на руках»; **(b) 7-дневный free trial на Pro** как A/B-альтернатива. Тестировать обе (вендоры советуют не выбирать догматически).
- **Не использовать toggle-trial** (§3.5) — multi-plan selector: [ Monthly £4.99 ] / [ **Annual £34.99 — save 42%** ] (+опц. trial badge на одном плане) + trial timeline.

### 5.4 S2 (renewal 35–60) — отдельная упаковка/цена

S2 имеет выше WTP и для них Watch/Renewal Radar — **основная** ценность (а не decode). Под них логичнее **Watch-first позиционирование** и потенциально **выше цена** (PSM покажет коридор). Возможен один и тот же price point с разным онбордингом/мессенджингом, либо отдельный тир — решается после PSM по §1.

### 5.5 Метрики, которые завести с дня 1 (для price-теста)

- download→free→paid (отдельно), trial→paid (если триал), Day-0 conversion, ARPU/RLTV по тиру/плану, monthly churn (цель ≤ ~9% как finance-бенчмарк), refund rate, decode→upgrade корреляция. Использовать RevenueCat/Adapty price experiments на живом трафике для финальной цены (PSM сужает, A/B решает).

---

## Key takeaways for Decode

1. **Провести Van Westendorp PSM раздельно по S1 и S2 до hi-fi пейволла**, 100–300 респондентов на сегмент, с Newton-Miller-Smith extension (purchase-intent → кривая выручки). Взять коридор [PMC; PME] и сверить OPP/IPP. Инструмент: SurveyMonkey/Qualtrics/Conjointly (нативный PSM). £4.99 держать как гипотезу-anchor, но не финализировать без PSM. ([SurveyMonkey](https://www.surveymonkey.com/market-research/resources/van-westendorp-price-sensitivity-meter/), [Sawtooth](https://sawtoothsoftware.com/resources/blog/posts/van-westendorp-pricing-sensitivity-meter), [Umbrex](https://umbrex.com/resources/frameworks/pricing-frameworks/van-westendorp-price-sensitivity-meter/))

2. **Реалистичная планка конверсии для freemium-Decode: 3–5% free→paid** (finance/utility — верхний край), floor 2%, stretch 6%+. Чистый freemium медианно 2.1%, hard paywall 10.7% — но retention через год паритетен, так что freemium-с-лимитом + хорошо подобранный апселл оправдан под виральный wedge. ([RevenueCat 2026](https://www.revenuecat.com/state-of-subscription-apps/), [Appcues](https://www.appcues.com/blog/free-to-paid-conversion))

3. **БИЛД-ГЕЙТ: не проектировать пейволл с trial-toggle** — Apple с янв 2026 массово реджектит по Guideline 3.1.2. Использовать multi-plan selector + trial timeline (Today→reminder→charge). Это hard-requirement к hi-fi дизайну пейволла. ([RevenueCat](https://www.revenuecat.com/blog/growth/rip-toggle-paywall/), [Adapty](https://adapty.io/blog/your-toggle-paywall-is-about-to-get-rejected/))

4. **Подать заявку в App Store Small Business Program до запуска** → 15% комиссии с дня 1 вместо 30% (Decode <$1M proceeds). Прямой ×2 буст net-выручки при £4.99/мес. ([Apple SBP](https://developer.apple.com/app-store/small-business-program/))

5. **Тайминг пейволла = сразу после первого успешного decode реального оффера** (момент «aha»/Day-0), не на cold-старте онбординга. 80–90% решений о подписке — в Day 0. ([Adapty 2026](https://adapty.io/blog/high-performing-paywall-2026/), [RevenueCat 2025](https://www.revenuecat.com/state-of-subscription-apps-2025/))

6. **Если делать триал — НЕ 3 дня.** Finance недо-конвертит на коротких триалах (нужно несколько сессий). Либо freemium-с-лимитом-decodes без триала, либо 7-дневный триал на Pro. Тестировать A/B обе модели. ([RevenueCat 2026](https://www.revenuecat.com/state-of-subscription-apps/))

7. **Переупаковать пейволл: free = N decodes/мес (полный, но лимитированный), Pro = unlimited decodes + полный Vault + Watch/Renewal Radar.** «Полный single decode бесплатно навсегда» отдаёт wedge даром и прячет ценность Pro за отложенный Watch; лимит по объёму сохраняет вирусность и создаёт Day-0-видимый апселл.

8. **План-структура: Monthly £4.99 + Annual ~£34.99–39.99 (анкорить как ~£2.9/мес, save ~40%); опц. новый Apple monthly-paid 12-mo commitment ~£3.49/мес под безденежных 18–25.** Включить billing grace period (7–16 дн), чтобы guardian не «отключался» из-за просроченной карты. ([Apple subscriptions](https://developer.apple.com/app-store/subscriptions/), [MacRumors monthly-commit](https://www.macrumors.com/2026/04/27/app-store-monthly-subscriptions-12-month-commitment/))

9. **Завести с дня 1 метрики:** Day-0 conversion, free/trial→paid, RLTV по плану, monthly churn (цель ≤9% finance-бенчмарк), refund rate, decode→upgrade. Финальную цену добивать price-A/B в RevenueCat/Adapty — PSM сужает коридор, живой тест решает.

10. **S2 (35–60) — отдельный онбординг/мессенджинг (Watch-first) и, вероятно, более высокая цена**; решается по результатам отдельной PSM-кривой S2.
