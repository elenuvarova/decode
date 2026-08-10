# Экран-контракт: Radar / Alerts (AL + AL-d + RD-set)

**Route:** `(app)/alerts` (sheet из Home) + системные нотификации · **Flow:** [F6](../ux/jtbd-to-flows.md#f6) · **Шаг loop:** Watch · **Job:** J3
**Персоны:** все; Jordan (даты+суммы), Maya (ценность радара растёт со временем) · **Доступ:** авторизован
**Sitemap:** [AL / AL-d / RD-set](../ux/screen-sitemap.md#группа-e--watch--radar) · **Pre-mortem:** PM4 (free/paid граница на Watch); митигирует VoC T-7 (ненадёжные нотификации)
**Инварианты:** Radar — следствие скана, не отдельная настраиваемая фича (урок Little Birdie); алерт = дата + СУММА + последствие + источник; локальные нотификации (офлайн) + серверный дубль; никакой приоритизации платежей между долгами (FCA).

---

## Логика

### Данные
- `watched_dates[]`: `{ commitment_id, date, amount, kind: renewal|payment|promo_end|trial_end, lead_time, source_span }`.
- `alerts[]`: сматченные к показу — `{ type, title, due_date, amount, cta, why_source }`.
- `radar_contract`: `{ watching_count, last_checked_at }` — видимый «контракт наблюдения» (анти-Bobby).
- `price_change`: для price-increase алерта — `{ was, now, delta_pct, source_span }`.
- `notif_settings`: per-category lead-time, toggles.
- `push_permission_status`.

### Состояния
- **all-clear:** «Nothing needs attention until 28 June ✓».
- **upcoming:** есть события в lead-time окне → «Coming up».
- **overdue:** просрочка / CPA-«сдвоенный» платёж после фейла — показывать явно («£X due, plus the missed £Y may be taken together»).
- **no-permission:** баннер «Turn on notifications so we can warn you in time» + CTA в системные настройки (но локальные scheduled всё равно работают офлайн).
- **empty (нет watched-дат):** «Nothing being watched yet — scan a document with a date and we'll remind you». Не тупик.
- **loading / error:** skeleton / retry; данные локальны → офлайн показывает последнее.

### Действия
**AL (alerts inbox, полноэкранный таб Radar — 2026-08-11):**
- Двухслойно: `UpcomingCalendar` (мини-календарь «Coming up») + `ComingLaterList` («Coming later»).
- `WatchContract`-строка: «Watching 4 dates · last checked today».
- Tap алерта → **AL-d**. `[Reminder settings]` → **RD-set**.

**AL-d (alert detail):**
- Анатомия (Uber One): [что случится] + [через сколько] + [точная сумма и дата] + ОДНА CTA.
- Пример: «Boiler cover renews in 14 days — you'll be charged £312 on 24 Jun» → `[Review terms]` → [decode-result](decode-result.md)/Vault detail.
- Price-increase вариант: «was £9.99 → now £12.99 (+30%)» + `[Why?]` → source-подсветка строки письма.
- CTA ведёт к пониманию (review/decode), НЕ к действию-совету (не «cancel this», не «pay this first»).

**RD-set (reminder settings):**
- `LeadTimePicker` по категории («2 days before · 1 week before»).
- «Renewals & deadlines» — locked-On (нельзя выключить ключевую защиту); «Tips & news» — off by default.
- Banner системного разрешения, если push denied.

### Создание (шов из скана)
- Radar-даты создаются на [decode-result](decode-result.md) SV — inline `RadarToggle` per-date. Не отдельный flow настройки.
- `[PM4]` free/paid: базовый radar по сосканированному документу — free; radar по всем датам/множеству обязательств + кастомный lead-time — Watch-слой за пейволлом (F8).

### Реализация нотификаций
- Локальные scheduled notifications (`expo-notifications`) как база — работают офлайн, не зависят от сервера (анти-Bobby T-7).
- Серверный push (Supabase + cron) — второй слой (price-change замечен на бэке).
- Тест-нотификация в онбординге после первого скана — доказать надёжность.

### Связи
AL ← таб Radar (2026-08-11). AL-d ← AL / системная нотификация. AL-d → [decode-result](decode-result.md) / Vault detail. RD-set ← SV / AL.

---

## Визуал

**Референсы:** Uber One (alert-анатомия), Rocket Money (двухслойный), Apple Wallet (all-clear), Opal/Calm (reminder-пикер), Hyundai (price-rise), Tabby/Runna (settings) ([research/16](../../research/16-mobbin-alerts-reminders.md)).

### Layout Mobile (основной)
- **AL (sheet):** «Coming up» мини-календарь сверху (горизонтальная лента дат с точками-маркерами); под ним `ComingLaterList`; `WatchContract`-строка вверху или внизу («Watching 4 dates · checked today»).
- **AL-d (sheet/full):** карточка [что]→[когда]→[£+дата] крупным; одна акцентная CTA full-width внизу; `[Why?]`-ссылка ведёт в source-подсветку.
- **RD-set (sheet):** список категорий с `LeadTimePicker`; locked-toggle для renewals (визуально «заблокирован On» с пояснением); off-toggle для tips.
- **Системная нотификация:** текст-шаблон «[Provider] renews in [N] days — £[X] on [date]».

### Компоненты → UI-кит
Доменные: `AlertCard`, `UpcomingCalendar`, `WatchContract`, `PriceChangeRow`. Базовые: `Sheet`, `List/Row`, `Button`, `Toggle` (locked-вариант), `Picker` (LeadTime), `EmptyState`, `Skeleton`.

### Визуальные состояния
- **all-clear:** спокойная «✓ Nothing until 28 June» (Apple Wallet), не тревожно.
- **overdue / CPA-double:** явная карточка «£X due — and a previously missed £Y may be taken at the same time» (предупреждение о ловушке CPA из [research/10b](../../research/10b-trap-tc-corpus.md)). В grayscale: ⚠ + вес.
- **no-permission:** баннер вверху AL + кнопка в Settings; не блокирует просмотр.

### Edge cases (визуально, финансовые форматы/даты)
- Длинная сумма «£1,234.56» в карточке → tabular-nums, не ломает строку.
- Дата UK-формата «24 Jun 2026, 14:30» → помещается, не переносится криво.
- Много алертов в один день → календарь показывает «3 events», тап раскрывает.
- Очень длинный provider-name в нотификации → системный truncate (учесть лимит длины push).
- Lead-time «today»/«overdue» → «Due today» / «Overdue by 2 days» осмысленно, не «-2 days».
- Нет watched-дат, но есть коммитменты → empty с подсказкой, не all-clear-обман.
- Dynamic Type XL → карточка и CTA масштабируются, одна CTA не дробится.

### Открытые вопросы / TODO
- TODO: Alerts — sheet из Home vs полноэкранный таб? (sitemap §4.3) — зависит от объёма; при малом числе sheet достаточно.
- TODO: точная free/paid граница Radar (базовый по 1 доку free; по всем — paid?) — открытый вопрос ресёрча §9.3.
- TODO(юрист): копирайт алертов не должен приоритизировать платежи между долгами (FCA, [research/09b](../../research/09b-fca-boundary-verified.md)).
- TODO: серверное обнаружение price-change требует, чтобы документ/письмо пере-сканировались или пересылались — механика для фазы 2 (email-in).
