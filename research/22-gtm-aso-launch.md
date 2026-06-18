# 22 · GTM / ASO / Launch для Decode (UK, 18–25, запуск к 15.07.2026)

**Трек:** 22 gtm-aso-launch · **Дата:** 18 июня 2026 · **Рынок:** UK · **Сегмент:** S1 — BNPL-пользователи 18–25
**Продукт:** Decode — iOS-приложение, AI-декодер финансовых документов + commitments guardian. Wedge: фото/шеринг BNPL-оффера → plain-English summary + детерминированный true cost + trap detector + Q&A с citations; Vault + Renewal Radar. НЕТ bank connection. Цена ~£4.99/мес freemium.
**Метод:** WebSearch (углы: ASO, каналы, launch, метрики, регуляторика) + WebFetch до первоисточников (FCA, App Store-листинги, TikTok Ads policy, YouGov, ASA/CAP). Каждый существенный факт с URL. Где не нашёл — помечено «не найдено».

> ⚠️ Это GTM/маркетинг-анализ, НЕ юридическое заключение. Финансовая реклама в UK регулируется FCA (s21 FSMA), ASA/CAP и Consumer Duty. Перед запуском платной рекламы и любых партнёрств — обязательный compliance-review у UK-юриста (см. также трек 09b по перимиметру). Ниже отмечены зоны остаточной неопределённости.

---

## TL;DR (для занятого читателя)

1. **Регуляторный «зелёный коридор» Decode — главный GTM-актив, а не препятствие.** Маркетинг Decode (платный SaaS-инструмент за £4.99/мес, без кредита, без bank connection) сам по себе НЕ является «financial promotion» по s21 FSMA: реклама приглашает скачать/подписаться на приложение, а не «engage in investment activity / controlled activity». Это значит: НЕ нужна s21-аппрувка и НЕ нужна FCA-авторизация, чтобы рекламироваться — в отличие от BNPL-конкурентов. Но остаются ASA/CAP-правила (legal, decent, honest, truthful) и риск **выйти** в перимиметр через формулировки, обещающие «advice»/«improve your credit score»/«clear your debt» (см. §5).
2. **15.07.2026 — это ваш PR-хук №1, и он подлинный.** «BNPL Regulation Day» — реальная дата вступления в силу FCA-регулирования Deferred Payment Credit ([FCA](https://www.fca.org.uk/news/press-releases/new-protections-confirmed-buy-now-pay-later-borrowers)). Decode = «инструмент, который делает за пользователя то, что новые правила обязывают делать лендеров: показывает clear, upfront details». Это новостной крючок для PR и контента.
3. **ASO-стратегия — «перехват намерения», а не «лобовая конкуренция с Klarna».** По брендам (klarna, clearpay) вы не победите. Цельтесь в **проблемные/вопросительные ключи**: «what does X do to my credit», «buy now pay later explained», «late payment fee», «check before you buy». Заголовок/субтайтл — §1.
4. **Каналы 18–25: органический TikTok + Reddit (осторожно) + микро-финфлюенсеры.** CAC платных каналов для finance в UK высокий (Apple Search Ads CPA ~$13, TikTok finance CPM $11+), поэтому ставка на органику и контент. Ориентиры — §2.
5. **Метрики запуска: не гонитесь за инсталлами — гоните activation (первый «декод») и D1.** Finance-apps теряют ~87% за 24 ч. KPI — §4.

---

## 1. ASO: реальные поисковые ключи, конкуренты, заголовок/субтайтл

### 1.1 Как устроена выдача App Store (механика, чтобы строить гипотезы правильно)

- **Индексируемые поля:** App Name (**30 симв.**), Subtitle (**30 симв.**), Keywords-поле (**100 симв.**, через запятую, БЕЗ пробелов). Описание (description) НЕ индексируется в App Store (в отличие от Google Play) — это про конверсию, не про ранжирование ([Apptamin](https://www.apptamin.com/blog/app-store-optimization-aso-app-name-and-keywords/), [App Radar](https://appradar.com/academy/app-subtitle)).
- **Не дублировать ключи** между Name / Subtitle / Keywords — для алгоритма одного упоминания достаточно, повтор не усиливает «вес» ([ASOMobile](https://asomobile.net/en/blog/lesson-3-text-optimization-for-the-app-store/)).
- **Известный баг:** если занять все 30 символов субтайтла, последнее слово может не проиндексироваться — оставляйте «воздух» ([ASOMobile](https://asomobile.net/en/blog/lesson-3-text-optimization-for-the-app-store/)).
- **Объёмов поиска Apple публично не даёт.** Есть только относительный **Search Popularity score 1–100** в Apple Search Ads / App Store Connect; абсолютные оценки дают платные ASO-инструменты (AppTweak, MobileAction, Appradar) проприетарными моделями ([AppTweak](https://www.apptweak.com/en/aso-blog/app-store-keyword-research-aso), [Appalize](https://www.appalize.com/blog/aso-strategies/app-store-keyword-search-volume-how-to-measure-use-it)). **→ Точные UK-объёмы ключей не найдены в открытом доступе; ниже — приоритизация по логике намерения, перед запуском проверить в AppTweak/Apple Search Ads (free Search Popularity).**

### 1.2 Реальные листинги конкурентов (UK App Store, verbatim)

| Приложение | App Name | Subtitle | Категория | Рейтинги (UK) |
|---|---|---|---|---|
| **Klarna** | `Klarna: Smarter everyday money` | (не подтверждён verbatim) | Finance / Shopping | — |
| **Clearpay** (Afterpay UK) | `Clearpay - Buy Now, Pay Later` | `Shop & split payments in 4` | Shopping | 146k, 4.9★ |
| **ClearScore** | `ClearScore: Check Credit Score` | `Compare Finance, Cards & Loans` | Finance | 73k, 4.8★ |

Источники: [Clearpay App Store](https://apps.apple.com/gb/app/clearpay-buy-now-pay-later/id1474022186), [ClearScore App Store](https://apps.apple.com/gb/app/clearscore-check-credit-score/id1056640628), [Klarna App Store](https://apps.apple.com/gb/app/klarna-shop-now-pay-later/id1115120118).

**Выводы по конкурентам:**
- Бренды BNPL живут в **Shopping**, а credit-tools (ClearScore) — в **Finance**. Decode — **Finance** (инструмент понимания/управления, не покупки).
- Klarna/Clearpay владеют брендовыми и категорийными ключами с десятками-сотнями тысяч отзывов → **лобовая ASO-конкуренция по «buy now pay later» бессмысленна** для нового приложения. Ваша ниша — «понять / проверить / не попасть в ловушку», которую НИ ОДИН из них не занимает (они стороны сделки, не нейтральный декодер).
- Klarna уже сместила позиционирование на «Smarter everyday money» — сигнал, что «pay later» как ключ перегрет даже для них.

### 1.3 Карта ключей для Decode (по интенту, сгруппировано)

**A. Категорийно-проблемные (средний объём, средняя конкуренция) — ядро:**
`buy now pay later`, `pay later`, `klarna` (как ключ в keywords-поле — нельзя в Name/Subtitle: чужой бренд = риск отклонения App Review), `bnpl`, `instalments`, `split payments`.

**B. Вопросительно-намеренческие (низкий объём, низкая конкуренция, высокая конверсия) — дифференциатор:**
`what does klarna do to my credit`, `does buy now pay later affect credit score`, `late payment fee`, `hidden fees`, `read before you buy`, `understand contract`, `terms and conditions explained`, `is it safe to use`.

**C. Финздоровье/контроль (пересечение с credit-tools):**
`credit score` (перегрет, ClearScore/Credit Karma доминируют — брать только в keywords), `subscription tracker`, `renewal reminder`, `cancel subscription`, `money management`, `spending`, `commitments`.

**D. AI/инструмент:**
`scan document`, `explain document`, `summarise`, `ai assistant`, `decode`, `jargon`.

> Приоритет для нового приложения: **B + (узкие) A**. Это низкоконкурентный «long tail», где можно реально ранжироваться на старте, и где интент совпадает с wedge (человек уже подозревает ловушку).

### 1.4 Гипотезы Name / Subtitle (на A/B-тест через Apple Product Page Optimization)

App Name (≤30) — кандидаты:
1. `Decode: Pay Later & Contracts` (29) — связывает бренд + BNPL-интент + расширяемость.
2. `Decode — Pay Later Decoder` (26).
3. `Decode: Read Before You Buy` (27) — самый «намеренческий», но без BNPL-ключа.

Subtitle (≤30) — кандидаты (НЕ дублировать слова из Name):
1. `Spot fees & traps before you sign` — 31, чуть длинно, урезать до `Spot fees & traps before signing` (32→ нет). Вариант: `See the fees & traps first` (26).
2. `Understand BNPL, fees, renewals` (31→) → `Understand fees & renewals` (26).
3. `AI summary of any money offer` (29).

Keywords-поле (100 симв., пример-черновик, без пробелов):
`bnpl,klarna,clearpay,instalments,truecost,latefee,hiddenfees,creditscore,contract,renewal,scan,explain`

> ⚠️ Использование чужих брендов (`klarna`, `clearpay`) в **keywords-поле** распространено и обычно проходит App Review, НО Apple может отклонить за «using third-party trademarks». Безопаснее: держать 1–2 самых важных, мониторить отклонения, не ставить в видимые поля (Name/Subtitle). Не найдено: актуальный официальный запрет Apple именно на competitor-brand-keywords в 2026 — **проверить в App Review Guidelines перед сабмитом.**

### 1.5 Иконка / скриншоты / конверсия (CRO листинга)

- iOS-конверсия finance-приложений выше Android: **CR ~32.8% (iOS) vs 19.7% (Google Play)** ([CleverTap](https://clevertap.com/blog/improve-conversion-rate-fintech-apps/)) — iOS-only фокус Decode здесь играет в плюс.
- Первый скриншот = «before/after»: фото мутного BNPL-договора → чистый plain-English summary + «true cost £X». Это и есть демонстрация wedge.
- Использовать **Apple Product Page Optimization (PPO)** для A/B иконки/скриншотов/субтайтла без релиза.

---

## 2. Каналы привлечения 18–25 UK + ориентиры CAC

### 2.1 Бенчмарки стоимости (почему органика, а не «зальём деньги»)

| Канал / метрика | Значение | Источник |
|---|---|---|
| Средний CPI (iOS, все категории, 2025) | **$4.70** | [Business of Apps](https://www.businessofapps.com/marketplace/user-acquisition/research/user-acquisition-costs/) |
| Fintech CPI (iOS) | часто **>$10**, диапазон **$10–$35** | [Adapty](https://adapty.io/blog/customer-acquisition-cost/) |
| Apple Search Ads — Finance CPT (2025) | **$6.06** | [AppTweak](https://www.apptweak.com/en/aso-blog/apple-ads-benchmarks) |
| Apple Search Ads — Finance CPA (2025) | **$13.28** | [AppTweak](https://www.apptweak.com/en/aso-blog/apple-ads-benchmarks) |
| Apple Search Ads — Conversion Rate (tap→install) | **~67%** | [App Developer Mag](https://appdevelopermagazine.com/apple-ads-search-results-benchmarks-report-2025/) |
| TikTok CPM — Finance/SaaS (самый дорогой вертикал) | **$11+** | [Stackmatix](https://www.stackmatix.com/blog/tiktok-ads-cost-per-result-by-industry) |

**Вывод:** при цене £4.99/мес (≈$6.3) и реалистичном LTV freemium-подписки CAC $13+ через платные каналы съедает unit-экономику на месяцы. → **Старт = органика + контент + микро-инфлюенсеры; платку (Apple Search Ads на B-ключи) включать узко и позже, когда есть activation/retention-данные.**

### 2.2 TikTok (главный органический канал для 18–25)

- **Органика дешевле платки в 3–8×** через локализованные аккаунты vs Spark Ads ([Tokportal](https://www.tokportal.com/post/tiktok-for-businesses-a-2025-global-starter-playbook)).
- Тактика «velocity over perfection»: **4–7 видео на рынок** до попадания в product-market-creative fit; «fluency в TikTok-культуре», а не погоня за разовым виралом ([new/day studio](https://www.newdaystudio.co/blog/tiktok-brands-that-went-viral), [Tokportal](https://www.tokportal.com/post/tiktok-for-businesses-a-2025-global-starter-playbook)).
- **Контент-форматы под Decode:** «I scanned my Klarna terms so you don't have to», «POV: the fee they don't show you», «3 traps in BNPL contracts», live-декод реального оффера на экране. Образовательный + «exposé»-тон попадает в Gen Z-запрос на финграмотность.
- ⚠️ Платные TikTok-ads для finance в UK требуют **FCA-авторизации рекламодателя** — TikTok вручную сверяет с FCA-реестром (см. §5). **Органический контент бренда — НЕ paid ad**, но если он «inviting/inducing engage in controlled activity» — может попасть в s21. Для Decode (инструмент, не кредит) риск низкий, НО формулировки контролировать (см. §5).

### 2.3 Reddit (r/UKPersonalFinance и смежные)

- r/UKPersonalFinance — крупное UK-сообщество (~1.8M, по вторичным данным [Conbersa](https://www.conbersa.ai/learn/reddit-self-promotion-rules); точную цифру и rules **проверить на самом сабреддите** — wiki rules не отдаётся в открытом фетче, [UKPF Wiki](https://ukpersonal.finance/community/)).
- **Прямой self-promo почти везде запрещён** и карается баном; работает только нативное участие — отвечать на вопросы по существу, упоминать продукт изредка и к месту ([Conbersa](https://www.conbersa.ai/learn/reddit-self-promotion-rules)). Реальный кейс провала прямого постинга UK-finance-приложения: «the space is crowded», скепсис ([WealthR](https://wealthr.co.uk/blog/uk-personal-finance-app-reddit)).
- **Тактика для Decode:** не постить рекламу. Вместо этого — (а) AMA/launch-post в более лояльных нишах (r/UKstudents, r/beermoneyuk, r/povertyfinanceuk — проверить rules каждого), (б) полезные комментарии-ответы, где Decode органично решает вопрос, (в) при желании — оплачиваемая Reddit Ads-кампания (отдельно от органики).

### 2.4 Финфлюенсеры (микро) — финграмотность 18–25

- Тренд: Gen Z активно ищет советы у создателей контента/сообществ, которым доверяет (TikTok-финфлюенсеры, YouTube-эдьюкаторы, Reddit) ([Adjust](https://www.adjust.com/blog/how-fintech-apps-can-acquire-the-coveted-gen-z/)).
- Кейс: UK-финтех **Plum** партнёрился с финфлюенсерами на TikTok («52-week savings challenge») — успех ([Adjust](https://www.adjust.com/blog/how-fintech-apps-can-acquire-the-coveted-gen-z/)).
- **Ориентиры ставок (UK, micro 10k–50k):** Instagram **£100–£500/пост**; TikTok обычно на 30–40% дешевле Instagram за тот же охват; finance-ниша — премиум-надбавка ([Limelight Digital](https://www.limelightdigital.co.uk/how-much-do-influencers-make/), [Influencer Marketing Hub](https://influencermarketinghub.com/influencer-rates/)). **→ Тестовый пул: 5–10 микро-финфлюенсеров, бюджет £1–3k на пилот.**
- ⚠️ **КРИТИЧНО (см. §5):** любой оплаченный пост финфлюенсера = (1) обязательная пометка **#ad** ДО контента (ASA/CAP) И (2) если контент «inviting/inducing» в регулируемый продукт — без s21-аппрувки это **уголовное преступление до 2 лет** ([FCA FG24/1](https://www.fca.org.uk/publication/finalised-guidance/fg24-1.pdf)). Для Decode-как-инструмента риск ниже, но **бриф для инфлюенсера должен запрещать**: обещания по кредитному рейтингу, советы «гасить ли долг», слова «advice», сравнение конкретных кредитных продуктов.

### 2.5 Двусторонние рефералы / waitlist

- Личная рекомендация в ~50× эффективнее обычной рекламы; реферальные юзеры на 18% лояльнее ([Prefinery](https://www.prefinery.com/blog/fintech-app-launch-marketing-how-to-build-a-waitlist-that-converts/)).
- Pre-launch waitlist с double-sided reward / tiered / exclusivity-механикой — стандарт финтех-запусков ([Prefinery](https://www.prefinery.com/blog/fintech-app-launch-marketing-how-to-build-a-waitlist-that-converts/)).
- ⚠️ Денежные реферальные награды для finance-продукта — проверить на «financial promotion» / inducement-риск; безопаснее — премиум-фичи/free month, а не cash.

---

## 3. Launch-playbook вокруг 15.07.2026 (BNPL Regulation Day)

### 3.1 Почему дата — настоящий PR-хук

15 июля 2026 — официальная дата, с которой Deferred Payment Credit (BNPL) входит в перимиметр FCA. Новые обязанности лендеров: **clear, upfront details** (даты платежей, полная сумма, что будет при пропуске), affordability-проверки, поддержка при трудностях, доступ к Financial Ombudsman, Consumer Duty ([FCA press](https://www.fca.org.uk/news/press-releases/new-protections-confirmed-buy-now-pay-later-borrowers), [FCA](https://www.fca.org.uk/news/press-releases/protections-help-buy-now-pay-later-borrowers-navigate-financial-lives)). Temporary Permissions Regime: регистрация **15.05–01.07.2026**, full authorisation — в течение 6 мес после Regulation Day ([Hogan Lovells](https://www.hoganlovells.com/en/publications/bnpl-fca-publishes-final-rules-for-15-july-2026-golive)).

**PR-angle Decode:** *«Регулирование заставляет лендеров показывать условия яснее — Decode уже делает это за пользователя, на любом договоре, нейтрально».* Decode = «потребительская сторона» новой прозрачности. Это даёт повод журналистам money-desk (а тема горячая) и легитимизирует продукт.

### 3.2 Тайминг (T = 15.07.2026)

| Фаза | Окно | Действия |
|---|---|---|
| **T-8…T-6 нед** (с ~20.05) | Pre-launch | Waitlist + лендинг; начать TikTok-аккаунт (накопить 4–7 видео, найти «свой голос»); закрытый beta-пул из waitlist; согласовать compliance-чек копий. |
| **T-4…T-2 нед** | Прогрев | Pitching журналистам под эмбарго (Regulation Day explainer + «как защититься» с Decode как инструментом); договорённости с 5–10 микро-финфлюенсерами на T-week; App Store-листинг готов, PPO-тесты иконки/скринов. |
| **T-day (15.07)** | Launch | Релиз/снятие waitlist; синхронный «Regulation Day» контент-залп (TikTok + инфлюенсеры + Reddit AMA в лояльных нишах); Product Hunt-лонч; рассылка по waitlist. |
| **T+1…T+4 нед** | Импульс | Реакция на реальные истории пользователей («декодни мой договор»); UGC-репосты; первая узкая Apple Search Ads-кампания на B-ключи; замер activation/D1/D7. |

> Замечание по риску: запуск ровно в Regulation Day = пик внимания, но и пик нагрузки на compliance/инфру. Held-out план: если App Review задержит релиз, T-day делать «soft» (waitlist→ early access), а Regulation Day отыграть контентом, не блокируясь на сторе.

### 3.3 Партнёрства: Citizens Advice / MoneyHelper — что допустимо

- **MoneyHelper (MaPS, government-backed):** **можно свободно ссылаться и републиковать их гайды без разрешения и бесплатно** — «you don't need permission to link from your website to MoneyHelper content» ([MoneyHelper Partnerships](https://www.moneyhelper.org.uk/en/about-us/partnerships/overview)). → Decode может **сигнпостить** пользователей в MoneyHelper/бесплатный долговой совет (это и Consumer-Duty-дружественно, и снижает регуляторный риск: «не даём совет — направляем к официальному»). Это НЕ равно официальному партнёрству/co-branding (для этого нужен контакт с MaPS Partnerships team).
- **Citizens Advice:** публичная благотворительность; ссылаться/сигнпостить — норм. Формальное партнёрство/использование логотипа — только по согласованию с ними (не найдено публичной self-serve-программы для коммерческих приложений — **уточнять напрямую**).
- **Безопасная модель на старте:** односторонний **signposting** (Decode → ссылки на MoneyHelper/Citizens Advice/National Debtline) без заявлений о партнёрстве. Это укрепляет доверие и попадает в «support to customers in financial difficulty»-нарратив регулятора, не создавая обязательств.
- ⚠️ НЕ заявлять «in partnership with» / «endorsed by» без письменного согласия — это и репутационный, и потенциально ASA-риск (misleading).

### 3.4 Product Hunt / органический буст

- PH-лонч в T-day усиливает «tech-press» охват; финтех — активный топик на PH ([Product Hunt Fintech](https://www.producthunt.com/topics/fintech)). Готовить за 1–2 нед: галерея, первый коммент основателя, hunter, «ship»-апдейты.

---

## 4. Метрики запуска

### 4.1 Бенчмарки fintech/finance (с чем сравнивать)

| Метрика | Бенчмарк | Источник |
|---|---|---|
| **D1 retention** (fintech) | ~22–30% | [GetStream](https://getstream.io/blog/app-retention-guide/) |
| **D7 retention** | ~17.6% | [GetStream](https://getstream.io/blog/app-retention-guide/) |
| **D30 retention** (finance) | слабый ~4.2%; сильный 10–15% | [GetStream](https://getstream.io/blog/app-retention-guide/), [Pushwoosh](https://www.pushwoosh.com/blog/fintech-app-growth/) |
| Открыли finance-app в первые 24ч | только **13.55%** (т.е. ~87% риск мгновенного churn) | [CleverTap](https://clevertap.com/blog/improve-conversion-rate-fintech-apps/) |
| Завершили регистрацию в 24ч | 60% (к D14 — 90%) | [CleverTap](https://clevertap.com/blog/improve-conversion-rate-fintech-apps/) |
| Полная activation к D30 | ~14% | [CleverTap](https://clevertap.com/blog/improve-conversion-rate-fintech-apps/) |
| Конверсия в платёж (fintech) в 7 дней | 76% из конвертящих делают это в 7 дн; средний CR 3.4–5% | [CleverTap](https://clevertap.com/blog/improve-conversion-rate-fintech-apps/) |
| Листинг CR (просмотр→инсталл) | iOS 32.8% vs Google Play 19.7% | [CleverTap](https://clevertap.com/blog/improve-conversion-rate-fintech-apps/) |

### 4.2 KPI-дерево Decode (приоритет сверху вниз)

1. **North Star: # успешных «декодов» / неделя** (юзер сфоткал/зашарил оффер → получил summary). Это и activation, и доказательство ценности.
2. **Activation rate** = % новых юзеров, сделавших ≥1 декод в первые 24ч (цель: бить «13.55% открыли заново» — т.е. >25% сделали декод в D1).
3. **D1 / D7 / D30 retention** против бенчмарков выше (цель D1 ≥30%, D30 ≥12%).
4. **Free→Paid conversion** (£4.99): цель в верхней части 3.4–5%; следить за «trigger to pay» (какая фича упирает в paywall — вероятно Q&A/Vault/Renewal Radar).
5. **CAC по каналам** vs ориентиры §2 (органика → near-zero; ASA → держать <$13 CPA finance-бенчмарка).
6. **Виральность:** K-factor / referral-rate (реферал в 50× эффективнее рекламы — §2.5).
7. **ASO health:** ранжирование по B-ключам, листинг CR, рейтинг (конкуренты на 4.8–4.9★ — планировать review-prompt после успешного декода).
8. **Launch-spike метрики (T-day):** инсталлы/час, PH-rank, share-of-voice по «BNPL regulation» в соцсетях.

> Антипаттерн: гордиться инсталлами. При 87% мгновенного churn инсталлы без activation — деньги в трубу. Инструментировать **activation-воронку** (capture → summary shown → first Q&A) с первого дня (см. трек метрик/инструментации).

---

## 5. Риски маркетинга финпродукта (FCA s21 / ASA-CAP / Consumer Duty)

### 5.1 Ключевой вывод: Decode НЕ обязан быть FCA-авторизованным, чтобы рекламироваться — но легко может «выпасть» в перимиметр формулировками

- **Что такое financial promotion (s21 FSMA):** «an invitation or inducement to engage in **investment activity** [/controlled activity], communicated in the course of business». **Чисто фактическая информация — НЕ financial promotion**; нужен (а) промо-элемент И (б) связь с **контролируемой активностью/инвестицией** ([Practical Law](https://uk.practicallaw.thomsonreuters.com/0-201-8913), [ICAEW](https://www.icaew.com/regulation/dpb-investment-business-licence/financial-promotions-the-right-side-of-the-rules)).
- **Реклама приложения за £4.99/мес** (скачай/подпишись на decoder-tool) — приглашение к покупке SaaS, НЕ к «engage in a controlled activity». → реклама самого Decode, как правило, **вне s21** и НЕ требует s21-аппрувки. (Сверяется с треком 09b: pre-signature decoding вне регулируемого debt counselling.)
- **НО Decode выходит в перимиметр / нарушает CAP, если маркетинг:** обещает «improve / fix your credit score», «clear your debt», «we'll tell you whether to take this deal», «financial advice», сравнивает конкретные кредитные продукты с рекомендацией, или индуцирует к конкретному регулируемому продукту/лендеру (особенно если когда-нибудь появятся affiliate-ссылки на кредит — тогда это **точно** financial promotion и нужна s21-аппрувка/авторизация).

### 5.2 Что НЕЛЬЗЯ обещать / делать (чек-лист для копирайтинга и брифов инфлюенсерам)

- ❌ Гарантии/обещания по **credit score** («raise your score», «approved guaranteed»).
- ❌ «**Advice**» на принятие конкретного финрешения (брать/не брать BNPL, что гасить первым) — это debt counselling/advising, регулируемая зона (трек 09b).
- ❌ Сравнение/рекомендация **конкретных** кредитных продуктов или лендеров без авторизации (credit broking-риск).
- ❌ Чужие бренды (Klarna/Clearpay) в **видимых** местах листинга и в creative так, чтобы подразумевать аффилиацию/одобрение (ASA misleading + trademark).
- ❌ «In partnership with / endorsed by MoneyHelper/Citizens Advice/FCA» без письменного согласия.
- ❌ Финфлюенсер-пост без **#ad** до контента (ASA/CAP; для finance дисклоуз обязателен) ([ASA](https://www.asa.org.uk/advice-online/recognising-ads-social-media.html)).
- ❌ Таргет на **at-risk** аудитории / эксплуатация финансовой уязвимости (CAP §14 financial products; Consumer Duty) ([CAP §14](https://www.asa.org.uk/type/non_broadcast/code_section/14.html)).

### 5.3 Что МОЖНО / безопасный язык

- ✅ Фактическое, нейтральное: «understand your agreement», «see the true cost», «spot fees & late-payment terms», «get a plain-English summary», «keep your contracts in one place».
- ✅ Signposting в MoneyHelper / Citizens Advice / National Debtline (free, government-backed) — укрепляет доверие и Consumer-Duty-нарратив.
- ✅ Образовательный контент о BNPL-регулировании 15.07.2026 (фактический explainer).
- ✅ «#ad» + честный, не-misleading посыл во всех paid-партнёрствах.

### 5.4 Платформенные правила рекламы (paid)

- **TikTok (UK/EMEA):** paid finance-ads требуют **FCA-авторизации рекламодателя** (ручная сверка с FCA-реестром), 18+, раскрытие APR/fees где применимо ([TikTok Financial Services Policy](https://ads.tiktok.com/help/article/tiktok-ads-policy-financial-services), [Benly](https://benly.ai/learn/tiktok-ads/tiktok-ads-finance-fintech)). **Запрещены:** payday loans, credit repair, P2P-lending, get-rich-quick и пр. Категории «budgeting/money-management/financial-education apps» в политике **прямо не упомянуты** → статус неоднозначен, **уточнять у TikTok-представителя перед paid-кампанией.** Decode-как-tool: вероятно НЕ требует FCA-авторизации для рекламы, но TikTok-модерация может запросить подтверждение — заложить время.
- **Apple Search Ads:** платформенных FCA-ограничений как у TikTok нет, но App Review-правила и местное право применяются. Finance CPA ~$13 (§2.1).
- **FCA finfluencer-режим (FG24/1, 26.03.2024):** unauthorised лица, продвигающие регулируемый продукт без s21-аппрувки, **могут совершать уголовное преступление (до 2 лет / неогр. штраф)**; FCA уже ведёт уголовные преследования финфлюенсеров ([FCA FG24/1](https://www.fca.org.uk/publications/finalised-guidance/fg24-1-finalised-guidance-financial-promotions-social-media), [Freshfields](https://www.freshfields.com/en/our-thinking/blogs/risk-and-compliance/fca-takes-further-steps-to-crackdown-on-finfluencers-following-issuing-guidance-102jmhr)). → Брифы инфлюенсерам должны строго держать их в «информационном» поле (см. 5.2/5.3) и проходить ваш compliance-review.
- **CONC 3 / CP26/15:** для consumer-credit-промо действует CONC 3 (clear, fair, not misleading); идёт пересмотр через Consumer-Duty-линзу (CP26/15, комментарии до 17.06.2026 — трек 09b). Релевантно, если Decode когда-либо добавит affiliate-ссылки на кредит.

### 5.5 Остаточная неопределённость (verify before launch)

- Точный статус «budgeting/education app» в TikTok paid-политике — **не найдено**, уточнять у TikTok.
- Можно ли держать competitor-бренды в keywords-поле в 2026 без отклонения — **не найдено** актуального явного правила Apple, проверить App Review Guidelines.
- Точные rules r/UKPersonalFinance по self-promo и subscriber count — **wiki не отдаётся фетчем**, проверить на сабреддите.
- UK App Store search-volume по ключам — публично **не найдено**, мерить через Apple Search Ads Search Popularity / AppTweak.

---

## 6. Сегмент S1: данные, бьющие в позиционирование

- **42% взрослых UK** пользовались BNPL (2025); рынок прогнозно >£29 млрд ([Credit Strategy](https://www.creditstrategy.co.uk/cs-regulation/regulation/42-of-people-using-bnpl-services-as-of-2025)).
- **56% Gen Z (18–27)** пользовались BNPL; **25% всех BNPL-юзеров — 18–24** ([Empower](https://www.empower.com/the-currency/money/buy-now-pay-later-statistics)).
- **32% людей 18–29 пропускали BNPL-платёж** (vs 12% у 60+); **43% Gen Z считают BNPL «risk-free»** ([Empower](https://www.empower.com/the-currency/money/buy-now-pay-later-statistics), [Business Manchester](https://www.businessmanchester.co.uk/2025/07/25/43-of-gen-z-unaware-of-the-financial-pitfalls-of-bnpl-schemes/)).
- **+58% год к году** обращений за помощью с BNPL-долгом; средний остаток £711 ([Empower](https://www.empower.com/the-currency/money/buy-now-pay-later-statistics)).
- BNPL-юзеры: моложе, **68% частых юзеров — женщины**, финансово напряжены (только 15% «comfortable» vs 29% non-users) ([YouGov, окт.2024–окт.2025](https://yougov.com/en-gb/articles/53194-britains-bnpl-users-younger-female-and-financially-strained)).

**Что это даёт GTM:**
- «43% считают BNPL risk-free» + «32% 18–29 пропускали платёж» = **разрыв осознания**, который Decode закрывает. Это и контент-ось TikTok, и core-месседж: «You think it's free. Decode shows you what it really costs.»
- Перекос на женщин (68% частых) → кастинг финфлюенсеров и креатив с учётом аудитории (но без таргета по уязвимости — CAP §14).
- Рост обращений за долговой помощью → signposting-фича (§3.3) попадает прямо в боль.

---

## Key takeaways for Decode

1. **Регуляторика — это ваш моат и ваш PR, а не только риск.** Decode (платный decoder-tool, без кредита/bank connection) рекламируется **вне s21 FSMA** — не нужна FCA-авторизация для маркетинга, в отличие от BNPL/credit-конкурентов. Превратите 15.07.2026 в PR-хук №1: «регулятор заставляет лендеров показывать условия яснее — Decode уже делает это за тебя, нейтрально, на любом договоре».
2. **ASO: перехват намерения, не лобовая война с Klarna.** В Name держите бренд + 1 BNPL-ключ (`Decode: Pay Later & Contracts`); основной трафик ловите long-tail B-ключами интента («does buy now pay later affect credit score», «late payment fee», «read before you buy»). Брендовые ключи конкурентов — максимум в keywords-поле, с риском App Review. A/B иконку/скрины/субтайтл через Apple PPO. Первый скриншот = before/after «мутный договор → true cost £X».
3. **Каналы 18–25: органика вперёд платки.** Платный finance-CAC высокий (ASA CPA ~$13, TikTok CPM $11+, fintech CPI >$10). Старт: органический TikTok (4–7 видео, educational/exposé-тон), нативный Reddit (без прямого self-promo), пилот 5–10 микро-финфлюенсеров (£100–500/пост, бюджет £1–3k), двусторонние рефералы (нематериальные награды). Платку (узкий Apple Search Ads на B-ключи) — только после activation-данных.
4. **Метрики: North Star = успешные декоды/нед, не инсталлы.** ~87% finance-юзеров рискуют отвалиться за 24ч → проектируйте onboarding на «первый декод в первые минуты». Цели: D1 ≥30%, D30 ≥12%, free→paid 3.4–5%. Инструментируйте воронку capture→summary→Q&A с дня один.
5. **Compliance-гардрейлы в дизайн и копирайтинг с самого начала.** В UI/маркетинге НИКОГДА не обещать «improve credit score», не давать «advice» (что гасить/брать), не сравнивать конкретные кредитные продукты, не заявлять о партнёрстве с MoneyHelper/FCA. Можно: «understand your agreement», «see the true cost», «spot fees & traps», signposting в MoneyHelper/Citizens Advice. Любой оплаченный пост = #ad + бриф, держащий инфлюенсера в фактическом поле (нарушение = уголовка до 2 лет по FG24/1).
6. **Сегмент-инсайт в продукт:** «43% Gen Z считают BNPL risk-free, при этом 32% 18–29 пропускали платёж» — это центральная боль и месседж. Добавьте signposting-фичу (free debt help) — она и в боль попадает, и регуляторный/Consumer-Duty-нарратив усиливает.
7. **Перед запуском проверить (open items):** точные UK search-volume ключей (Apple Search Ads/AppTweak), статус budgeting-app в TikTok paid-политике (у представителя), допустимость competitor-брендов в keywords (App Review Guidelines), правила r/UKPersonalFinance, и общий compliance-review копий у UK consumer-credit-юриста.
