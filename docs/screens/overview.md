# Экран-контракт: Overview / Home (HM)

**Route:** `(app)/` — **дефолтный таб** · **Flow:** [F5](../ux/jtbd-to-flows.md#f5) · **Шаг loop:** Watch · **Job:** J2
**Персоны:** все; Jordan (всё в одном месте, retention-якорь) · **Доступ:** авторизован
**Sitemap:** [HM](../ux/screen-sitemap.md#группа-b--app-shell-tabs) · **Pre-mortem:** PM1 (home = overview, не последний result); митигирует F1 (retention)
**Инварианты:** никаких bank-link механик; без промо-баннеров на главной; без перегруза графиками; спокойный «банковский» тон (Wise/Apple Wallet); суммы считаются детерминированно, без банка.

---

## Логика

### Данные
- `commitments[]`: каждое — `{ id, doc_id, name, provider, type, next_date, next_amount, status, trap_flags[], cadence }`.
- `headline`: `committed_this_month: £` (сумма ближайших списаний в текущем месяце) — детерминированно из дат/сумм коммитментов.
- `ranges`: `due_in_7 / due_in_30 / due_in_60` (£ + count).
- `toggle`: month ⇄ year (count + total: «6 commitments — £86/mo ⇄ £1,032/yr»).
- `sections`: статусные группы с субтоталами — `needs_attention` (trap/overlap), `renewing_soon`, `active`, `decoded_no_action`.
- `traps_summary`: «Detected N traps costing you £X a year» (savings-фрейминг).
- `alerts_count` (для bell-индикатора).

### Состояния
- **empty (0 документов):** guided — «Scan your first document — see its true cost in 30 seconds» + крупная `[Scan]`. НЕ пустой экран (анти-тупик). Каждый empty содержит Scan-CTA.
- **1 commitment:** headline + одна строка + подсказка добавить ещё.
- **many:** полный overview с секциями.
- **all-clear:** есть коммитменты, но ничего не требует внимания → «Nothing needs attention until 28 June ✓» (Apple Wallet-паттерн).
- **loading:** skeleton строк (первый заход/refresh).
- **error:** данные не подгрузились → ErrorState + retry (но коммитменты локальны/кешированы → офлайн показывает последнее).

### Действия
- Tap строки `CommitmentRow` → [Vault detail](../ux/screen-sitemap.md) (bottom-sheet).
- `[Scan]` (центр-таб всегда) → [scan](scan.md) SC-1.
- Tap bell (шапка) → [alerts](alerts.md) inbox.
- Tap gear (шапка) → Settings.
- `RangeToggle` 7/30/60 → фильтр среза (mock-state: пересчёт видимого списка).
- month⇄year toggle → пересчёт headline/субтоталов.
- Tap секция-заголовок → схлопнуть/раскрыть.
- Pull-to-refresh → перепроверка дат/сумм (и Radar-статусов).

### Связи
HM → Vault detail, [scan](scan.md), [alerts](alerts.md), Settings. Вход: дефолтный таб; после SV (Save) — возврат сюда с тостом.

---

## Визуал

**Референсы:** Afterpay (headline + срезы), Orbit (count/total toggle, структура списка), Rocket Money (копирайт traps), Apple Wallet (all-clear) ([research/13](../../research/13-mobbin-fintech-home.md)).

### Layout Mobile (основной)
- **Шапка:** заголовок «Your commitments» + gear (справа) + bell с бейджем-счётчиком (справа). Safe-area top.
- **Headline-блок:** крупно «Committed this month: £214»; под ним `RangeToggle` сегменты «Due in 7 · 30 · 60 days» (£ + count в каждом); month⇄year переключатель.
- **Traps-строка (savings-фрейминг):** «Detected 3 traps costing you £180/year» — тап → фильтр needs_attention.
- **Секции** (`SectionList` с субтоталами): «⚠ Needs attention» (вверху) → «Renewing soon» → «Active» → «Decoded, no action». Каждая строка `CommitmentRow`: иконка типа · name · «Due in 4 days · 28 Nov» (относительная И абсолютная дата) · £ · слот ⚠ `TrapBadge`.
- **Низ:** TabBar (Home активен · ⊕Scan центр · Vault). Safe-area bottom.

### Layout Desktop (вторичный)
- Не приоритет (shell = Expo). Web-версия overview — только если делаем web-демо; центр-колонка max-width.

### Компоненты → UI-кит
Доменные: `Headline`, `CommitmentRow`, `TrapBadge`, `SectionList`. Базовые: `SegmentedToggle` (RangeToggle, month/year), `EmptyState`, `Skeleton`, `ErrorState`, `Badge` (bell-счётчик).

### Визуальные состояния
- **empty:** иллюстрация + «Scan your first document…» + `[Scan]` крупная по центру.
- **all-clear:** спокойная карточка «Nothing needs attention until 28 June ✓» вместо тревожных секций.
- **needs_attention присутствует:** секция вверху, в grayscale выделена весом/иконкой ⚠, не цветом.
- **loading:** 3–4 skeleton-строки.

### Edge cases (визуально, финансовые форматы)
- Большой headline «£12,847/yr» → tabular-nums, не ломает блок.
- Длинное имя коммитмента («Frasers Plus store card — 0% promo») → truncate в строке, полное в detail.
- 50+ коммитментов → список виртуализируется/скроллится, секции-заголовки sticky, субтоталы корректны.
- 1 коммитмент → не выглядит «сломанно-пусто», есть подсказка добавить.
- Дата сегодня/просрочено → «Due today» / «Overdue» осмысленно (не «Due in -2 days»).
- Накладка платежей (Jordan) → needs_attention показывает «£500 due this week across 3 plans» — ключевая ценность.
- Dynamic Type XL → headline и строки масштабируются, TabBar не наезжает.
- Нулевые значения / «—» → «Nothing due in 7 days» осмысленно.

### Открытые вопросы / TODO
- TODO: Vault — отдельный таб vs секция Home? (sitemap §4.2) — проверить на wireframes, не дублирует ли overview.
- TODO: что показывает headline, если все коммитменты — без дат списания (decoded_no_action many) — не должно быть «£0» как дыра.
- TODO: North Star метрика на главной (watched commitments / £ saved / decoded docs) — открытый вопрос ресёрча §9.7; влияет, что выносим в headline.
- TODO: «traps costing you £X/year» — формулировка должна быть фактом-агрегатом, не оценкой (FCA).
