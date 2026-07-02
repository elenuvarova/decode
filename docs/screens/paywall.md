# Экран-контракт: Paywall (PW)

**Route:** `(app)/paywall` (sheet) · **Flow:** [F8](../ux/jtbd-to-flows.md#f8) · **Шаг loop:** gate Watch · **Job:** монетизация (все jobs за free-границей)
**Персоны:** все; S1 BNPL 18–25 — чувствительность к цене + VoC-травма subscription-ловушек · **Доступ:** авторизован и гость (после первого decode)
**Sitemap:** [PW](../ux/screen-sitemap.md#группа-f--monetization-f8) · **Pre-mortem:** PM4 (пейволл на Watch-границе, в момент ценности — не на входе)
**Инварианты:** только Apple IAP — без карты, без обхода App Store (VoC T-1/T-2); free работает без карты и не урезан как wedge (N полных decodes/мес); отмена в 2 тапа через Apple Subscriptions (Settings → Subscription-Management, НЕ обратно на paywall); цена + лимиты на одном экране БЕЗ сносок-звёздочек; **Apple 3.1.2:** multi-plan **selector**, не trial-toggle (реджект с янв 2026), триал не 3 дня.

---

## Логика

### Данные
- `entitlement`: `free | trial | pro`; `decodes_used / decodes_limit` (5/5 free-decodes в месяц).
- `trigger`: `day0_first_decode` (сразу после ПЕРВОГО decode — Day-0, где принимается 80–90% решений о подписке) | `near_limit` («N scans left this month» в камере, Lovi-паттерн) | `watch_gate` (Radar по всем датам / полный Vault / unlimited Ask сверх free) — определяет context-строку.
- `plans[]`: **Yearly £41.99** (`£3.50/mo`, бейдж «Best value −30%», **default-selected**) · **Monthly £4.99**; локализованные цены из App Store products.
- `trial_timeline[3]`: Today £0 → Day 5 reminder → Day 7 billing starts.
- `features[4]`: Unlimited decodes · Full Vault & history · Renewal Radar · Ask, unlimited.
- `iap_state`: idle | purchasing | restoring | purchased | failed.

### Состояния
- **free-active:** дефолт — header + context-строка «You've used 5 of 5 free decodes this month» (варьируется по `trigger`).
- **near-limit:** context-строка «1 of 5 decodes left» — тот же экран, другой заход.
- **purchased:** подтверждение успеха (не повторный пейволл), возврат к прерванному действию.
- **restore:** спиннер + результат восстановления покупок.
- **purchase-failed:** отказ/обрыв IAP → отдельный экран `error-purchase-failed` (retry / not now) — не выглядит ошибкой приложения, контекст не теряется.

### Действия
- **Выбор плана:** tap Yearly/Monthly → видимый selected-state (обводка/чек, State в компоненте плана — фикс M2 аудита 02.07); Yearly предвыбран.
- **CTA `[Start 7-day free trial]`** → (System) Apple IAP sheet → success → `purchased` → dismiss к источнику.
- **Restore purchases** (тихая ссылка) → IAP restore → entitlement обновлён.
- **× / dismiss** → возврат к источнику (result / camera / watch-gate); free остаётся полноценно рабочим — пейволл не тупик.
- Fail/cancel IAP → `error-purchase-failed` → retry или назад без потери документа/результата.

### Инварианты копирайта
- Footnote под CTA — полная честность в одну строку: «Then £41.99/year. Cancel anytime in Settings. Billed by Apple.»
- Никаких «footnote-цен»: то, что спишется, видно ДО тапа (trial timeline = FTC-планка «express and informed consent»).
- Апселл вне этого экрана — редкий и контекстный («Watching 2 of 6 · Unlock with Pro» на Radar), не промо-баннеры.

### Связи
PW ← [decode-result](decode-result.md) (Day-0) · камера SC-2 («N scans left») · Radar/Vault watch-gate. PW → (P) Apple IAP → purchased / `error-purchase-failed`. Отмена НЕ здесь: Settings → Subscription-Management (M4 аудита: «Manage subscription» не должен вести на paywall).

---

## Визуал

**Референсы:** ревизия pricing ([research/21](../../research/21-pricing-monetization.md)): Day-0 paywall, Lovi near-limit, Apple 3.1.2 build-gate (multi-plan selector + trial timeline); анти-Emma/Cleo (wedge не даром, но и не урезан).

### Layout Mobile (основной)
- **Шапка:** заголовок «Keep decoding without limits» + context-строка «You've used 5 of 5 free decodes this month» (`FreeLimitLine`).
- **FeatureList — 4 строки:** Unlimited decodes · Full Vault & history · Renewal Radar · Ask, unlimited. Без сносок.
- **MultiPlanSelector (не trial-toggle):** две карточки-плана. **Yearly £41.99** — «£3.50/mo · Best value −30%», **default-selected** с видимым selected-state (обводка + чек); **Monthly £4.99**. Выбор читается без тапа (Apple 3.1.2: селектор, выбор виден).
- **Секция «HOW THE FREE TRIAL WORKS»:** `TrialTimeline` из 3 точек — «Today £0 · Day 5 reminder · Day 7 billing starts».
- **CTA:** `[Start 7-day free trial]` — крупная, одна.
- **Footnote:** «Then £41.99/year. Cancel anytime in Settings. Billed by Apple.» — обычным читаемым кеглем, не мелким шрифтом.
- **Restore purchases** — тихая текстовая ссылка внизу. Safe-area bottom.

### Компоненты → UI-кит
Доменные: `MultiPlanSelector` / `PlanCard` (State: selected/unselected — обязательная ось), `TrialTimeline`, `FeatureList`, `FreeLimitLine`. Базовые: `Sheet`, `Button`, `Badge` («Best value −30%»), `ErrorState` (purchase-failed).

### Визуальные состояния
- **free-active / near-limit:** различаются только context-строкой — один фрейм, два текста.
- **purchased:** спокойное подтверждение + возврат к действию, без конфетти-перегруза.
- **restore:** спиннер на ссылке, остальной экран не блокируется визуально.
- **purchase-failed:** экран `error-purchase-failed` — нейтральный тон («покупка не прошла», не «вы сделали что-то не так»).

### Edge cases (визуально)
- Локализованная цена длиннее («£41.99» → другие валюты/форматы) → PlanCard не распирает, tabular-nums.
- Смена выбранного плана → footnote синхронно меняется («Then £4.99/month…» для Monthly) — цена в footnote всегда = выбранному плану.
- Dynamic Type XL → 4 feature-строки и timeline читаемы, CTA не уезжает за fold.
- Пользователь уже был в триале (trial consumed) → CTA без «free trial»-обещания («Continue with Pro»), timeline скрыт.
- Отказ Apple IAP (нет способа оплаты) → системный шит Apple, наш экран ждёт, не дублирует ошибку.
- Гость (без аккаунта) → покупка привязана к Apple ID; restore работает без нашего логина.

### Открытые вопросы / TODO
- TODO: £4.99 — anchor; финализировать Van Westendorp PSM по S1/S2 ([research/21](../../research/21-pricing-monetization.md)).
- TODO: подать Apple Small Business Program (15% с дня 1) ДО запуска.
- TODO: фрейм Trial-Expired существует в Figma, но не заведён в прототип (M5 аудита 02.07) — решить судьбу.
- TODO: точная формулировка near-limit в камере («2 scans left this month») и порог показа (за сколько до лимита).
- TODO: лимит Q&A-тёрнов на free (см. [ask.md](ask.md) TODO) — согласовать с FeatureList «Ask, unlimited».
