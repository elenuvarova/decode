# 29 — Retention & Notifications для Watch-слоя Decode (Renewal Radar)

> Трек: retention + нотификации. Дата актуальности: **2026-06-18**.
> Контекст Decode: iOS (UK, последняя iOS), сегмент BNPL 18–25, **НЕТ bank connection** → нет транзакционного фида, нет авто-детекта платежей. Watch-слой (Renewal Radar + Vault) строится на данных, которые пользователь занёс сам (фото BNPL-оффера → распарсенные суммы/даты платежей). Это определяет всю архитектуру нотификаций: **источник правды — локальное расписание на устройстве, а не серверный push**.
> Метод: WebSearch (15+ запросов) + WebFetch до первоисточников (Apple-ориентированные dev-референсы, Expo docs, FCA, App Store changelog, Airship benchmarks). Каждый факт — с URL. Где первоисточник Apple отдавал только заголовок краулеру — использованы авторитетные dev-референсы (Use Your Loaf, nilcoalescing), это помечено.

---

## 0. Главный вывод для архитектуры (читать первым)

Поскольку у Decode **нет bank connection**, у Renewal Radar есть редкое преимущество: **все дедлайны известны заранее и детерминированы** (дата платежа BNPL = поле, извлечённое из документа). Значит нотификации можно строить на **local notifications** (`expo-notifications`, `CalendarNotificationTrigger`/`DateTriggerInput`), а не на серверном push через APNs.

Это устраняет целый класс «болезней надёжности» серверного push:
- APNs/Expo подтверждает только **приём** нотификации сервером, а не **доставку** на устройство — после приёма наблюдаемость почти нулевая ([Apple Developer Forums](https://developer.apple.com/forums/thread/71315), [Bugfender](https://bugfender.com/blog/advanced-ios-push-notifications/)).
- silent push (`content-available`) **не гарантируется** iOS — система дросселит по батарее/сети ([Pushwoosh](https://www.pushwoosh.com/blog/silent-push-notifications/)).
- протухшие токены — главный источник тихих потерь доставки ([Bugfender](https://bugfender.com/blog/advanced-ios-push-notifications/)).

Local-нотификация срабатывает на устройстве по часам — её «доставка» детерминирована, пока приложение установлено и разрешение дано. **Это критично для финтех-обещания «мы не дадим тебя списать врасплох».** Серверный push нужен Decode только для того, что нельзя вычислить локально (Renewal Radar по новым T&C, win-back неактивных, продуктовые анонсы) — см. §6.

---

## 1. Local vs Push: best practices 2026, лимиты, тайминг разрешения

### 1.1. Когда что использовать

| | Local notification | Remote / push (APNs) |
|---|---|---|
| Источник | планируется самим приложением, без сервера и сети | сервер → APNs → устройство, нужна сеть |
| Применение Decode | **дедлайны платежей BNPL, free-trial expiry, Renewal Radar по известным датам, streak-напоминания** | win-back неактивных, новые T&C-предупреждения, рассчитанные на сервере, broadcast |
| Надёжность | детерминирована (часы устройства) | подтверждается только приём сервером |

Источники: [Medium — iOS Notifications 2026 guide](https://medium.com/@thakurneeshu280/the-complete-guide-to-ios-notifications-from-basics-to-advanced-2026-edition-48cdcba8c18c), [Magicbell](https://www.magicbell.com/blog/implementing-push-notifications-in-ios-apps).

Общий принцип 2026 года: *«A successful push strategy in 2026 isn't about getting attention, but about providing timely, contextual value and earning the right to interrupt. If users wouldn't thank you for a notification, it probably shouldn't be sent»* ([Appbot, 2026 best practices](https://appbot.co/blog/app-push-notifications-2026-best-practices/)).

### 1.2. Тайминг запроса разрешения — НЕ на первом запуске

Это самый высоковажный рычаг. Данные:

- Pre-permission / «soft» prompt после high-value события (завершение онбординга или первая покупка) может **почти утроить opt-in** против промпта на первом запуске ([CleverTap Push Primer](https://docs.clevertap.com/docs/register-for-push), [Hurree](https://blog.hurree.co/ios-push-notification-permissions-best-practises)).
- Пользователи **на 89% вероятнее** дают согласие, когда сами триггерят промпт ([Valere/Medium](https://valerelabs.medium.com/mastering-the-art-of-push-notifications-how-context-timing-drive-opt-in-success-99d143e16f61)).
- iOS up-front opt-in обычно **40–45%**, и средний iOS opt-in **~56%** против Android 67% ([OneSignal](https://onesignal.com/blog/how-to-create-more-compelling-opt-in-messages-for-ios-push/), [Pushwoosh benchmarks](https://www.pushwoosh.com/blog/push-notification-benchmarks/)). При этом **finance — лидер по opt-in среди всех индустрий** ([Pushwoosh fintech](https://www.pushwoosh.com/blog/push-notifications-fintech/)).

**Правило для Decode:** системный промпт показывать **сразу после первого успешного скана**, когда пользователь увидел true cost и трапы и понимает ценность Watch-слоя. Перед нативным промптом — кастомный «pre-prompt» экран («Хочешь, мы напомним за N дней до каждого платежа, чтобы тебя не списали врасплох?»). Если откажется — нативный промпт НЕ показывать (см. §1.4: второго шанса не будет).

Fintech best practice прямо это формулирует: *«Earn the right to notify before you ask for the right to notify. Delay system permission prompts until after demonstrating value»* ([Plotline](https://www.plotline.so/blog/push-notification-best-practices-fintech-apps)).

### 1.3. iOS 64-pending limit — жёсткое ограничение, прямо бьёт по Renewal Radar

iOS держит максимум **64 запланированных (pending) local-нотификаций на приложение**. Система оставляет 64 ближайших по времени и **молча отбрасывает остальные**; повторяющаяся нотификация считается за одну ([Apple Developer Forums #811171](https://developer.apple.com/forums/thread/811171), [#682509](https://developer.apple.com/forums/thread/682509)).

Почему это опасно для Decode: у активного BNPL-пользователя может быть несколько планов × несколько платежей × несколько напоминаний (T-3, T-1, day-of). 5 планов × 4 платежа × 3 ремайндера = 60 → почти упёрлись, и **самые дальние дедлайны (которые и есть «не дам списать врасплох») молча пропадут**. Это та же категория багов, что утопила Bobby (§4).

**Правила:**
1. Планировать только «горизонт» (например, ближайшие 30–45 дней), не все будущие платежи разом.
2. **Перепланировать при каждом запуске приложения** (рекомендация Apple-форума) — открытие приложения = окно для rebuild расписания.
3. Серверный push как страховка для дальних дедлайнов вне локального горизонта (см. §6).
4. Бюджет ремайндеров на план держать малым (1–2 на платёж), иначе 64 кончаются мгновенно.

### 1.4. Промпт показывается один раз

На iOS системный промпт появляется **один раз на установку**. Отказался — повторно не спросишь, только Settings → App → Notifications вручную ([Codes of Phoenix — Expo local notifications 2026](https://www.codesofphoenix.com/articles/expo/local-notifications-expo), [Medium/gligor99](https://medium.com/@gligor99/making-expo-notifications-actually-work-even-on-android-12-and-ios-206ff632a845)). Поэтому беречь единственный выстрел — см. §1.2 и §1.5.

### 1.5. Provisional authorization — «тихая» опция без промпта (мощно для Decode)

`requestAuthorization` с опцией `.provisional` (`UNAuthorizationOptions`) даёт **trial-режим без промпта вообще**: нотификации доставляются «quietly» — только в Notification Center, **минуя lock screen, баннеры и звук**; у каждой кнопки «Keep» / «Turn Off», пользователь может апгрейднуть до prominent delivery ([Use Your Loaf](https://useyourloaf.com/blog/provisional-authorization-of-user-notificatons/), [nilcoalescing](https://nilcoalescing.com/blog/TrialNotificationsWithProvisionalAuthorizationOnIOS/); Apple-страница [`provisional`](https://developer.apple.com/documentation/usernotifications/unauthorizationoptions/provisional) и [Asking permission](https://developer.apple.com/documentation/usernotifications/asking-permission-to-use-notifications) отдают краулеру только заголовок — поведение подтверждено dev-референсами).

Проверять статус надо так: `authorizationStatus == .authorized || authorizationStatus == .provisional` ([Use Your Loaf](https://useyourloaf.com/blog/provisional-authorization-of-user-notificatons/)).

Трейд-офф: provisional = только тихая доставка (нет баннера/звука/badge), пока пользователь не апгрейднет.

**Стратегия для Decode (двухступенчатая):**
- На раннем этапе можно стартовать с `.provisional`, чтобы первые Radar-напоминания **молча** легли в Notification Center и пользователь увидел их пользу без интеррапта.
- В момент реальной ценности (например, пользователь сам тапнул по тихому ремайндеру и успел отменить подписку) — апгрейд до полного `.alert + .sound + .badge` через in-app объяснение и `UIApplication.openSettingsURLString` ([nilcoalescing](https://nilcoalescing.com/blog/TrialNotificationsWithProvisionalAuthorizationOnIOS/)).
- **Важный нюанс для финтеха:** дедлайн платежа — time-sensitive; тихая доставка может «потеряться» в Notification Center. Поэтому provisional хорош как *ramp-up*, но критичные дедлайны должны в итоге идти **prominent** (полное разрешение) либо как `timeSensitive` interruption level (см. §6.3). Рекомендуемый дефолт: запросить **полное** разрешение сразу после первого скана (§1.2), а provisional держать как fallback-паттерн, если первый запрос отклонят.

---

## 2. Renewal Radar как retention-движок: какие нотификации возвращают, частота, тон

### 2.1. Анатомия нотификации, которая реально возвращает

Из требований к renewal/trial-напоминаниям (FTC consumer guidance + практика): эффективное напоминание содержит **3 элемента — что, сколько, когда** ([FTC](https://consumer.ftc.gov/articles/getting-and-out-free-trials-auto-renewals-and-negative-option-subscriptions), [Resubs](https://resubs.app/resources/how-to-manage-free-trials)):

1. **Сумма**, которую спишут, если ничего не сделать.
2. **Последствие/дедлайн** — когда именно спишут и что произойдёт (для BNPL: late fee, отметка в Experian/TransUnion).
3. **Действие** — что сделать сейчас (открыть план, проверить, отменить/подготовить деньги).

Это ровно формула из задачи: **сумма + последствие + дедлайн**. Подтверждается рекомендацией ставить напоминание **за 2 дня до** ([Resubs](https://resubs.app/resources/how-to-manage-free-trials)) и платформенным дедлайном Apple/Google **отменять минимум за 24 часа** ([то же](https://resubs.app/resources/how-to-manage-free-trials)).

Renewal notice **не должен запрашивать платёжные данные** (это не счёт) — иначе выглядит как фишинг ([FTC](https://consumer.ftc.gov/articles/getting-and-out-free-trials-auto-renewals-and-negative-option-subscriptions)). Для Decode: ремайндер ведёт в Vault/план, не к оплате.

### 2.2. Конкретные правила частоты для Radar (каскад на платёж)

Опираясь на fintech win-back-каскад ([Plotline](https://www.plotline.so/blog/push-notification-best-practices-fintech-apps)) и FTC-тайминг, рекомендованный каскад **на один предстоящий платёж BNPL**:

| Триггер | Когда | Тип | Тон | Цель |
|---|---|---|---|---|
| **T-3 дня** | за 3 дня до платежа | local | нейтрально-полезный | «через 3 дня Klarna спишет £X — деньги есть?» |
| **T-1 день** | за 1 день | local | чуть настойчивее | «завтра списание £X. Если не хватает — вот что можно» |
| **Day-of (утро)** | в день платежа, 9–10 утра | local | прямой | «сегодня £X. После просрочки — late fee + отметка в Experian» |
| (опц.) **T+1 если просрочка** | через день, только если пользователь отметил «не оплатил» | local | поддержка, без стыда | «пропустил платёж? вот шаги, без паники» |

**Не больше 2–3 ремайндеров на платёж** — иначе упрёшься в 64-pending (§1.3) и в frequency cap (§3).

**Free-trial expiry (Renewal Radar по подпискам/trial):** один ремайндер **за 2 дня** + один **за 24 часа** (платформенный дедлайн отмены).

### 2.3. Тайм-слоты

Из fintech-практики ([Plotline](https://www.plotline.so/blog/push-notification-best-practices-fintech-apps)): утро **9–10** для финансовых check-in, день **13–14** для транзакционных алертов, вечер **19–21** для сводок/обзоров. Day-of дедлайн ставить **утром**, чтобы остался весь день на реакцию.

### 2.4. Тон для 18–25 (BNPL, money anxiety)

- **73% Gen Z** говорят, что money anxiety влияет на повседневную жизнь — тон критичен ([PYMNTS](https://www.pymnts.com/credit-cards/2026/issuers-use-alerts-to-win-gen-z-card-loyalty)).
- Работает **supportive accountability без стыда**: «Alex could use a check-in», а не «Alex failed» ([PYMNTS](https://www.pymnts.com/consumer-insights/2026/gen-z-turns-mobile-apps-and-credit-into-financial-discipline/)).
- Gen Z ценит **authenticity и отвергает financial shame**; zero-judgment ([PYMNTS](https://www.pymnts.com/consumer-insights/2026/gen-z-turns-mobile-apps-and-credit-into-financial-discipline/), [Braze](https://www.braze.com/resources/articles/how-to-engage-with-gen-z)).
- **Осторожно с loss aversion:** искусственная срочность бьёт по доверию — *«apps that constantly bombard users with fake urgency notifications undermine trust… short-term engagement spikes come at the cost of destroying user trust»* ([We Are Affective](https://weareaffective.com/learning-centre/how-can-loss-aversion-psychology-transform-app-retention)). Для Decode дедлайны **реальны** (фактическая дата списания) — это легитимная срочность, не fake. Главное не раздувать её фразами-страшилками.

**Правило тона Radar:** факт + помощь, без обвинения. «£32 спишут в четверг — на счету хватает?» вместо «Не пропусти платёж, иначе штраф!».

### 2.5. Почему Radar = retention-движок (данные)

- **iOS-retention у opted-in пользователей почти вдвое выше**, чем у opted-out ([Airship benchmark report PDF](https://grow.urbanairship.com/rs/313-QPJ-195/images/airship-how-push-notifications-impact-mobile-app-retention-rates.pdf)).
- Получающие **weekly** push — **+440%** к retention, **daily+** — **+820%** против нуля нотификаций ([Airship PDF](https://grow.urbanairship.com/rs/313-QPJ-195/images/airship-how-push-notifications-impact-mobile-app-retention-rates.pdf)).
- Бренды, вообще не шлющие push, могут поднять 90-дневный retention на **+190%**, начав ([Airship](https://www.airship.com/blog/7-mobile-engagement-statistics-that-show-how-push-notifications-boost-roi/)).
- Контекстные кампании: open rate **14.4%** против **4.19%** у generic ([Pushwoosh fintech](https://www.pushwoosh.com/blog/push-notifications-fintech/)). Сегментированные fintech-push — CTR до **9.35%**, в ~14× выше несегментированных ([Sashido](https://www.sashido.io/en/blog/fintech-push-notification-ctr-6-proven-ways)).

Вывод: для Decode без bank connection именно **дедлайн-ремайндеры** — это и есть «daily/weekly relevant push», который вытягивает retention. Каждый платёжный цикл BNPL даёт легитимный повод вернуть пользователя — и каждый возврат подтверждает ценность Watch-слоя.

---

## 3. Антипаттерны: over-notification → uninstall, и сломанные нотификации (Bobby)

### 3.1. Цифры over-notification (почему 18–25 особенно жёстки)

- **71%** удаляют приложение из-за раздражающих нотификаций ([WiserNotify](https://wisernotify.com/blog/push-notification-stats/)).
- **64%** перестают пользоваться приложением, если шлёт **>5 push/неделю** ([WiserNotify](https://wisernotify.com/blog/push-notification-stats/)).
- **32%** удаляют при **>6 нотификаций**; **46%** отключают нотификации ([WiserNotify](https://wisernotify.com/blog/push-notification-stats/)).
- **28%** удаляют, потому что «чувствуют себя заспамленными» ([CleverTap](https://clevertap.com/blog/uninstall-apps/)).
- **62%** считают, что слишком много нотификаций = спам ([WiserNotify](https://wisernotify.com/blog/push-notification-stats/)).

### 3.2. Frequency caps — конкретные правила

- Sweet spot для финтеха: **2–5 push/неделю**; за 5+ uninstall-rate резко растёт ([Plotline](https://www.plotline.so/blog/push-notification-best-practices-fintech-apps), [EngageLab](https://www.engagelab.com/blog/fintech-push-notifications-best-practices-use-cases)).
- Hard cap: **3 нотификации/день максимум** (кроме транзакционных Tier-1), и **global cap через все каналы** (push+email+SMS считать вместе) ([Plotline](https://www.plotline.so/blog/push-notification-best-practices-fintech-apps)).
- **Silent opt-out детект:** 5 нотификаций подряд без открытия → пользователь в «silent opt-out», подавлять весь Tier 2/3, иначе ускоряешь uninstall ([Plotline](https://www.plotline.so/blog/push-notification-best-practices-fintech-apps)).
- Per-category тогглы (платежи vs промо), quiet hours, частотные preferences ([Plotline](https://www.plotline.so/blog/push-notification-best-practices-fintech-apps)).

**Правило для Decode:** Radar-дедлайны = Tier-1 (всегда), промо/тиrange/streak = Tier-2/3 под global cap 3/день и подавлением при silent opt-out.

### 3.3. Bobby — кейс сломанных нотификаций (primary source: App Store changelog)

Bobby (топовый subscription-tracker, [App Store id1059152023](https://apps.apple.com/us/app/bobby-track-subscriptions/id1059152023)) годами чинил именно те баги нотификаций, которые для Decode были бы фатальны. Из changelog:

- **v3.10.2 (2024-10-11):** *«Bug fix: Notifications sent for disabled subscriptions»* и *«Bobby sometimes not requesting permission to send notifications leading to notifications not being delivered»*.
- **v3.10.1 (2024-08-30):** *«Fixed notifications being sent for deleted subscriptions»*, *«Improved notification consistency»*, добавили выбор времени отправки.
- **v3.10.4 (2025-09-12):** *«Improved notifications for long-running subscriptions… now delivers more consistent notifications»*.

(источник: [App Store version history](https://apps.apple.com/us/app/bobby-track-subscriptions/id1059152023); агрегатор подтверждает те же фиксы — [JustUseApp reviews](https://justuseapp.com/en/app/1059152023/bobby-track-subscriptions/reviews)).

**Уроки для Decode (anti-patterns to engineer against):**
1. **Нотификации для удалённых/отключённых сущностей** — когда пользователь закрыл/удалил план BNPL, отменить все запланированные local-нотификации этого плана. Каждый раз при изменении плана пересобирать расписание (`cancelScheduledNotificationAsync` по id + reschedule).
2. **Permission не запрашивается → тихая недоставка** — самый коварный баг: пользователь думает, что подписан на ремайндеры, а их нет. Всегда проверять `getPermissionsAsync` перед планированием и иметь in-app индикатор статуса разрешения + deep-link в Settings, если отозвано.
3. **Неконсистентность на длинном горизонте** — ровно проблема 64-pending (§1.3): дальние дедлайны теряются. Решается rebuild-on-launch + серверная страховка.
4. Пользователи Bobby также **просили несколько ремайндеров на подписку** ([JustUseApp](https://justuseapp.com/en/app/1059152023/bobby-track-subscriptions/reviews)) — но это надо балансировать против 64-лимита и frequency cap (§2.2).

---

## 4. Lifecycle / re-engagement для финтеха (что работает на 18–25)

### 4.1. Каскад по стадиям жизненного цикла ([Plotline](https://www.plotline.so/blog/push-notification-best-practices-fintech-apps))

- **Onboarding (день 0–7):** ≤1/день, привязка к действиям. Для Decode: «доскань ещё один оффер», «у тебя 1 план в Vault — добавь остальные, чтобы Radar видел всё».
- **Activation (день 7–30):** **+76% lift** в конверсии, если пользователь получил push в первую неделю. Инсайты-сводки («ты в этом месяце на 40% больше потратил на подписки»), milestone-празднования.
- **Retention (день 30+):** ceiling 5/неделю через каналы; gamification — streak-механики, варьируемые награды; rich push (countdown, прогресс-бары) дают +56% engagement.
- **Win-back (дормантность 7–14 дней):** 3-тач каскад за 21 день: Day 7 soft re-engage → Day 14 incentive → Day 21 social proof; после 3-го без ответа — снизить до monthly.

### 4.2. Окно реактивации очень узкое

Окно возврата уходящих пользователей закрывается за **3–7 дней**; авто-триггеры ранней дормантности дают **2–3× выше** return-rate, чем ожидание недели+ ([Kard](https://www.getkard.com/blog/lifecycle-marketing-strategy-a-complete-guide-to-customer-retention-and-revenue-growth)). Своевременный nudge обыгрывает дорогой стимул, выданный поздно ([Kard](https://www.getkard.com/blog/lifecycle-marketing-strategy-a-complete-guide-to-customer-retention-and-revenue-growth)).

### 4.3. Что заходит именно Gen Z

- **~70%** Gen Z хотят персонализированные real-time spending-обновления; **>75%** держат нотификации включёнными в банковских приложениях ([PYMNTS](https://www.pymnts.com/credit-cards/2026/issuers-use-alerts-to-win-gen-z-card-loyalty)).
- Push для re-engage, in-app для feature-discovery, SMS для high-urgency ([PYMNTS](https://www.pymnts.com/credit-cards/2026/issuers-use-alerts-to-win-gen-z-card-loyalty)).
- Функциональная ценность (fraud, low balance, upcoming payment) держит вовлечённость лучше, чем маркетинг ([PYMNTS](https://www.pymnts.com/credit-cards/2026/issuers-use-alerts-to-win-gen-z-card-loyalty)). **Для Decode это идеально совпадает с Radar.**

### 4.4. UK-регуляторный контекст — usable как легитимный re-engagement-повод

FCA начинает регулировать BNPL (Deferred Payment Credit) **15 июля 2026** — ровно дата запуска Decode ([FCA](https://www.fca.org.uk/firms/regulating-buy-now-pay-later)). Klarna репортит пропуски платежей в Experian и TransUnion (с июня 2023) — пропуск = derogatory mark ([PocketWise](https://pocketwise.co.uk/debt/buy-now-pay-later/bnpl-debt-cant-pay-uk/)). Это даёт Radar-нотификациям **реальное, не выдуманное последствие** в формулировке (см. §2.1 элемент «последствие»): «после просрочки — late fee + отметка в кредитном файле». Использовать как факт, не как страшилку.

---

## 5. Метрики надёжности нотификаций (что мониторить)

Воронка, которую надо инструментировать ([Plotline](https://www.plotline.so/blog/push-notification-best-practices-fintech-apps), [CleverTap metrics](https://clevertap.com/blog/push-notification-metrics-ctr-open-rate/)):

**sent → delivered → displayed → tapped → action completed**

- **Самая важная метрика — push-to-action completion rate, а не open rate** ([Plotline](https://www.plotline.so/blog/push-notification-best-practices-fintech-apps)). Для Decode action = открыл план / подготовил деньги / отметил «оплачено».
- Мониторить delivery, **token freshness, failures, time-to-deliver** рядом с CTR — иначе при падении CTR неясно, релевантность это или проблема доставки ([Pushwoosh benchmarks](https://www.pushwoosh.com/blog/push-notification-benchmarks/)).
- Бенчмарки fintech (для сверки): opt-in iOS ~**56%** (finance — выше среднего); CTR iOS ~**2.09%** базово, у CleverTap fintech ~**6%** на iOS; транзакционный push open-rate ~**69%** ([Pushwoosh fintech](https://www.pushwoosh.com/blog/push-notifications-fintech/), [Sashido](https://www.sashido.io/en/blog/fintech-push-notification-ctr-6-proven-ways), [MessageFlow](https://messageflow.com/blog/transactional-push-notifications-examples/)).

### 5.1. Надёжность серверного push (если используется) — ограничения наблюдаемости

- APNs/Expo errors говорят только о **приёме сервером**, не о доставке на устройство ([Apple Forums](https://developer.apple.com/forums/thread/71315), [Klaviyo](https://help.klaviyo.com/hc/en-us/articles/15594685536539)).
- Bounced-события создаются при отклонении токена — **чистить базу токенов** критично для reliability ([Bugfender](https://bugfender.com/blog/advanced-ios-push-notifications/), [Klaviyo](https://help.klaviyo.com/hc/en-us/articles/15594685536539)).
- silent push не гарантирован ([Pushwoosh silent](https://www.pushwoosh.com/blog/silent-push-notifications/)).

### 5.2. Надёжность local-нотификаций (основной путь Decode) — что отслеживать

- Доставка детерминирована, **но**: статус разрешения может быть отозван в Settings (мониторить `getPermissionsAsync` на каждом запуске); 64-pending overflow (логировать `getAllScheduledNotificationsAsync().length`); сценарии terminated-app (см. §6.2). Эти три — основные точки отказа local-пути.

---

## 6. expo-notifications: возможности и ограничения (SDK актуальный, 2026)

Источники: [Expo Notifications SDK docs](https://docs.expo.dev/versions/latest/sdk/notifications/), [What you need to know](https://docs.expo.dev/push-notifications/what-you-need-to-know/), [FAQ](https://docs.expo.dev/push-notifications/faq/), [Codes of Phoenix 2026](https://www.codesofphoenix.com/articles/expo/local-notifications-expo).

### 6.1. Возможности (релевантные Renewal Radar)

- **Триггеры планирования:** `DateTriggerInput` (one-time на timestamp — для конкретного дедлайна платежа), `DailyTriggerInput` (hour+minute), `CalendarNotificationTrigger` с `dateComponents` (recurring — недельные/месячные паттерны выражаются через него; отдельных weekly/yearly-типов на iOS нет), `TimeIntervalNotificationTrigger` (`seconds` + `repeats`), `LocationNotificationTrigger`.
- **Repeating:** свойство `repeats: boolean` на calendar/interval-триггерах. **Лимит:** repeating interval на iOS — минимум **60 секунд** ([Codes of Phoenix](https://www.codesofphoenix.com/articles/expo/local-notifications-expo)).
- **Badge:** `getBadgeCountAsync()` / `setBadgeCountAsync()` (требует `allowBadge: true`).
- **Permissions:** `requestPermissionsAsync({ ios: { allowAlert, allowBadge, allowSound, allowProvisional, allowCriticalAlerts, … }})` — **`allowProvisional` поддержан** (это и есть путь §1.5). Обязательно интерпретировать `ios.status` (`PROVISIONAL`/`EPHEMERAL`).
- **Категории/действия:** `setNotificationCategoryAsync(identifier, actions)` — интерактивные кнопки (`NotificationAction` с `buttonTitle`/`identifier`/опц. `textInput`). Полезно: кнопка «Отметить оплаченным» / «Напомнить позже» прямо в ремайндере.
- **Foreground handling:** `setNotificationHandler` (`shouldShowBanner`, `shouldShowList`, `shouldPlaySound`, `shouldSetBadge`) — **обязателен**, иначе в открытом приложении нотификация не покажется.
- **Interruption levels (iOS):** `passive`, `active`, `timeSensitive`, `critical` — управляют срочностью показа. Для дедлайн-платежей рассмотреть `timeSensitive` (пробивает Focus/уведомления) — см. §6.3.
- **Инспекция:** `getAllScheduledNotificationsAsync()` (контроль 64-лимита), `cancelScheduledNotificationAsync(id)` / `cancelAllScheduledNotificationsAsync()` (anti-Bobby reschedule).

### 6.2. Ограничения (критичные)

- **iOS-terminated app не может реагировать на тап** local-нотификации ([поиск/Expo issue #28027](https://github.com/expo/expo/issues/28027)). Deep-link обработку строить на cold-start через `getLastNotificationResponseAsync`.
- **Системный промпт — один раз** на установку; отказ → только Settings (§1.4).
- **Тестировать только на реальном устройстве** — симулятор и Expo Go не воспроизводят background/killed сценарии ([Codes of Phoenix](https://www.codesofphoenix.com/articles/expo/local-notifications-expo), [Courier](https://www.courier.com/blog/expo-notifications)).
- **Серверный push в Expo:** `getExpoPushTokenAsync` может долго резолвиться при плохой сети; нужен dev build (Expo Go ограничен для push на новых SDK). Доставка через Expo Push Service → APNs наследует все ограничения наблюдаемости §5.1.
- **64-pending** (§1.3) — лимит iOS, не Expo, но Expo его не обходит.

### 6.3. Рекомендация по interruption level

Дедлайн платежа BNPL — кандидат на `timeSensitive` (пользователь сам выбрал получать предупреждения о деньгах; пробивает Focus). НО требует entitlement `com.apple.developer.usernotifications.time-sensitive` и осторожного применения — только для реальных дедлайнов, не для промо. Промо/streak — `active` или `passive`.

---

## 7. Конкретные правила для Renewal Radar (свод, готов к спеке)

1. **Local-first.** Все известные дедлайны (платежи BNPL, trial-expiry) — через `expo-notifications` local schedule. Серверный push только для: win-back неактивных, Radar по новым/изменённым T&C, broadcast-анонсов, и страховки дальних дедлайнов вне 64-горизонта.
2. **Разрешение — после первого скана**, с кастомным pre-prompt; при отказе native-промпт не жечь; держать provisional как fallback-рамп.
3. **Каскад на платёж:** T-3 / T-1 / day-of-утро (макс 2–3), формула **сумма + последствие + дедлайн**; trial — T-2д + T-24ч.
4. **64-pending guard:** планировать только горизонт ~30–45 дней, **rebuild расписания при каждом запуске**, логировать `getAllScheduledNotificationsAsync().length`.
5. **Anti-Bobby:** при удалении/закрытии плана отменять его нотификации; проверять статус разрешения на каждом запуске + in-app индикатор «ремайндеры включены/выключены» с deep-link в Settings.
6. **Frequency caps:** Tier-1 (дедлайны) всегда; Tier-2/3 (streak/промо) под global cap **≤3/день**, **≤5/неделю**, подавление при silent opt-out (5 без открытия).
7. **Тон:** факт + помощь, zero-judgment, реальная (не fake) срочность; утренний слот для day-of.
8. **Метрика-цель:** push-to-action completion (открыл/подготовил/отметил), не open-rate; мониторить permission-revocation и 64-overflow как reliability-инциденты.
9. **Interruption level:** `timeSensitive` для платёжных дедлайнов (с entitlement), `active/passive` для остального.
10. **Тест только на реальном iPhone** (background/killed/terminated сценарии).

---

## Key takeaways for Decode

1. **Renewal Radar нужно строить на LOCAL-нотификациях, а не на серверном push.** Отсутствие bank connection — не минус, а структурное преимущество: дедлайны детерминированы, а local-доставка не страдает от проблем APNs-наблюдаемости (приём ≠ доставка), протухших токенов и недетерминированного silent push. Серверный push оставить для win-back, T&C-предупреждений и страховки дальних дедлайнов. ([Apple Forums](https://developer.apple.com/forums/thread/71315), [Pushwoosh silent](https://www.pushwoosh.com/blog/silent-push-notifications/))

2. **Разрешение запрашивать сразу после первого успешного скана**, с кастомным pre-prompt о ценности Radar. Контекстный запрос почти утраивает opt-in vs первый запуск; промпт на iOS даётся один раз — беречь. Provisional authorization (`allowProvisional`) — мощный fallback для тихого ramp-up. ([CleverTap](https://docs.clevertap.com/docs/register-for-push), [Use Your Loaf](https://useyourloaf.com/blog/provisional-authorization-of-user-notificatons/))

3. **iOS 64-pending limit — это архитектурный риск №1 для Radar.** Несколько планов × платежей × ремайндеров мгновенно упираются в 64, и дальние дедлайны (самые ценные) молча пропадают. Решение: горизонт 30–45 дней + rebuild расписания при каждом запуске + серверная страховка. ([Apple Forums #811171](https://developer.apple.com/forums/thread/811171))

4. **Формула возвращающей нотификации = сумма + последствие + дедлайн + действие**, T-3/T-1/day-of каскад, тон supportive-without-shame. Последствие реально: late fee + отметка в Experian/TransUnion, а с 15.07.2026 BNPL под FCA. Это легитимная (не fake) срочность. ([FTC](https://consumer.ftc.gov/articles/getting-and-out-free-trials-auto-renewals-and-negative-option-subscriptions), [PYMNTS](https://www.pymnts.com/consumer-insights/2026/gen-z-turns-mobile-apps-and-credit-into-financial-discipline/), [FCA](https://www.fca.org.uk/firms/regulating-buy-now-pay-later))

5. **Bobby — готовый список багов, которые нельзя повторить:** нотификации для удалённых/отключённых планов, тихая недоставка из-за незапрошенного разрешения, неконсистентность на длинном горизонте. Все три прямо относятся к Decode → инженерить против них с первого дня. ([App Store changelog](https://apps.apple.com/us/app/bobby-track-subscriptions/id1059152023))

6. **Over-notification убивает быстро:** 64% бросают приложение при >5 push/неделю, 71% удаляют из-за раздражающих нотификаций. Caps: Tier-1 дедлайны всегда; всё остальное ≤3/день, ≤5/неделю, suppress при silent opt-out. Push-to-action completion — главная метрика, не open-rate. ([WiserNotify](https://wisernotify.com/blog/push-notification-stats/), [Plotline](https://www.plotline.so/blog/push-notification-best-practices-fintech-apps))

7. **Retention-апсайд большой:** opted-in iOS-пользователи удерживаются почти вдвое лучше; weekly push +440%, daily+ +820% к retention. Каждый платёжный цикл BNPL — легитимный повод вернуть пользователя и подтвердить ценность Watch-слоя. ([Airship benchmark PDF](https://grow.urbanairship.com/rs/313-QPJ-195/images/airship-how-push-notifications-impact-mobile-app-retention-rates.pdf))
