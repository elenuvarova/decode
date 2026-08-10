# Экран-контракт: Vault detail (VA-d)

**Route:** `(app)/vault/:docId` (bottom-sheet) · **Flow:** [F7](../ux/jtbd-to-flows.md#f7) · **Шаг loop:** Watch→Act · **Job:** J6 (+ J5: cancel-канал виден в Notes)
**Персоны:** все; Jordan (досье обязательства из overview-строки); J6 «глазами кредитора» — P2-глубина · **Доступ:** автор документа; **Face ID-гейт на входе в Vault** (`expo-local-authentication`) — дешёвый trust-сигнал
**Sitemap:** [VA-d](../ux/screen-sitemap.md#группа-b--app-shell-tabs) · **Pre-mortem:** PM6 (каждый факт тапается в источник)
**Инварианты:** каждая key-value строка имеет source-тег (Calculated ИЛИ ссылка в документ) — язык достоверности, не декорация; авто-именование («Klarna BNPL offer — 14 May 2026»), никогда «Scan 47.pdf»; деструктив тихий и разнесён — Delete только через confirm; никаких советов — факты документа + опции.

---

## Логика

### Данные
- `commitment`: `{ id, doc_id, auto_name, provider, type, status, next_date, next_amount, trap_flags[], cadence }` — та же сущность, что строка overview.
- `fields[]` (key-value): `{ label, value, source }`, где `source` = `calculated` | `doc_span { page, section_ref («p.2 §4»), span/bbox }` — детерминированная привязка (не генеративная).
- `notes`: свободный блок (например «Cancel by calling before renewal» — J5-канал как факт из документа).
- `watch`: Radar-даты, статус watching (on/off).
- `history_ref`: ссылка на Document-History (версии/re-decode, price-delta).
- `compare_ref`: данные для Compare offers (сопоставимые офферы в Vault).

### Состояния
- **default:** полное досье (fields + notes + действия).
- **empty vault:** нет документов → guided empty (= empty overview): «Scan your first document…» + `[Scan]` — анти-тупик, detail недостижим.
- **single:** один документ — detail полный, Compare offers обоснованно скрыт/disabled («nothing to compare yet»).
- **many:** дефолт-путь из Vault list / overview-строки.

### Действия
- **Tap source-тег строки** («from your doc ›», «p.2 §4 ›») → **Source-Highlight sheet**: zoom страницы + подсвеченный span + `PageRef` (тот же механизм, что QA-src в [ask.md](ask.md)). `Calculated` — тег без перехода (бейдж «Calculated, not AI»).
- **Compare offers** (строка) → сравнение с сопоставимыми офферами из Vault.
- **`[Ask about this document]`** → [Ask](ask.md) QA-sheet, скоуп = этот документ.
- **«Stop watching»** — тихий ОТДЕЛЬНЫЙ контрол → снимает Radar-даты (не трогает документ); мгновенно, с undo-тостом.
- **«Delete document»** — тихий ОТДЕЛЬНЫЙ контрол → диалог `delete-document-confirm` → удаление документа + отписка Radar/алертов. (Разнесены 02.07.2026 — закрыт M1/M6 аудита: раньше два глагола, один деструктивный, жили в одном tap-target.)
- **Document-History** (ссылка) → история версий/re-decode.
- Вход в Vault → Face ID-гейт (permission primer SY-perm), fallback — passcode.

### Связи
VA-d ← [overview](overview.md) строка `CommitmentRow` · Vault list (VA) · [alert detail](alerts.md) «Review terms». VA-d → [decode-result](decode-result.md) (re-open) · [Ask](ask.md) · Source-Highlight · `delete-document-confirm` · Document-History. После delete → возврат в Vault list.

---

## Визуал

**Референсы:** Orbit detail-sheet, Fabric empty-state (F7, [research/13](../../research/13-mobbin-fintech-home.md)).

### Layout Mobile (основной)
- **Bottom-sheet** поверх Vault/overview; grabber; в шапке — авто-имя «Klarna BNPL offer — 14 May 2026» + provider/type.
- **Key-value строки:** label слева, значение справа, под/рядом — `SourceTag`: «Calculated» (без стрелки) · «from your doc ›» · «p.2 §4 ›» (со стрелкой — тапается в Source-Highlight).
- **NOTES-блок:** отдельная секция, спокойный регистр (здесь живёт cancel-канал J5 как факт).
- **Compare offers** — строка-переход.
- **`[Ask about this document]`** — заметная, но не кричащая кнопка.
- **Низ:** два **раздельных тихих** контрола — «Stop watching» и «Delete document» (destructive-регистр весом/иконкой, не алым баннером); между ними явный зазор — не один tap-target. Safe-area bottom.

### Компоненты → UI-кит
Доменные: `KeyValueRow` + `SourceTag` (варианты: calculated / doc-link), `NotesBlock`, `CompareOffersRow`, `DocHistoryLink`, `DocViewerHighlight` (shared с QA-src). Базовые: `Sheet`, `ListItem` (нужна State-ось — M6 аудита), `Button` (quiet / quiet-destructive), `ConfirmDialog` (`delete-document-confirm`), `PermissionPrimer` (Face ID).

### Визуальные состояния
- **default:** полное досье.
- **empty vault:** `EmptyState` с иллюстрацией + Scan-CTA (на уровне Vault list).
- **single:** Compare offers → «nothing to compare yet», не выглядит сломанным.
- **watching off:** «Stop watching» ⇄ «Watch this document» — состояние читается без входа в настройки.

### Edge cases (визуально)
- Длинное авто-имя («Frasers Plus store card — 0% promo — 14 May 2026») → truncate в шапке, полное по tap/expand.
- Много key-value строк → sheet скроллится, действия внизу достижимы, не перекрыты.
- Длинный `section_ref` («Schedule 2, clause 4.3.1(b)») → тег не распирает строку, truncate + полный в Source-Highlight.
- Поле без источника в принципе невозможно: минимум «Calculated» — дырявых строк нет (PM6).
- Delete при активных Radar-датах → confirm явно говорит «reminders for this document will stop».
- Stop watching при ближайшем платеже через N дней → подтверждение показывает, ЧТО перестанем отслеживать («the 28 May payment»).
- Face ID fail/отказ → passcode fallback, не запирать пользователя от его данных.
- Фото-путь: подсветка работает поверх транскрипции, не нативных PDF-координат (см. [research/06](../../research/06-tech-claude-vision-extraction.md)).

### Открытые вопросы / TODO
- ~~TODO(H5 аудита 02.07)~~ ✅ закрыто 2026-07-02: Source-Highlight sheet построен в Figma («Source-Highlight — Wireframe») и заведён в прототип (`source-highlight`) — citations отсюда и из Ask ведут на него; «Report a mismatch» → Trust-repair.
- TODO: «View as a lender would» / export (J6, P2/P3) — в flow заявлен, не построен; держать в roadmap явно как «Mortgage-ready view» (второй aha для стареющего сегмента), не как хвост Vault.
- TODO: VA-d нет отдельной строкой в sitemap-таблице (только в колонках Из/В) — добавить при обновлении sitemap (H6).
- ~~TODO: Vault — таб vs секция Home~~ ✅ резолвлено 2026-07-02 (sitemap §4.2): Vault остаётся отдельным табом — overview = обзор списаний/статусов, vault = архив документов.
- TODO: Document-History фрейм есть в Figma, но не заведён в прототип (M5) — решить судьбу.
