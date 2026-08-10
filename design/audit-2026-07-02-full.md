# Decode — Full Audit (2026-07-02)

**Scope:** весь стек дизайн-фазы — Figma-файл `ZR4wMSgGSbdckASvpiFwIP` (2 страницы, 63 экрана + Foundations + Component Library), токены/переменные (живая проверка `get_variable_defs`), доки (`docs/DESIGN.md`, `docs/guidelines/*`, `docs/product/jtbd.md`, `docs/ux/jtbd-to-flows.md`, `docs/ux/screen-sitemap.md`), прототип (`prototype/app.js`, 46 экранов / 14 флоу), PNG-экспорты (48 шт.), плюс оценка идеи по ресёрч-базе (`research/00` + волны 2–3).
**Метод:** структурный пул Figma (метаданные всех фреймов + переменные на 3 нодах), свежие рендеры 11 ключевых экранов + Foundations + Component Library прямо из Figma (не из stale-PNG), построчный кросс-чек JTBD → flows → sitemap → фреймы → прототип. Предыдущий аудит: [audit-2026-06-26-full.md](audit-2026-06-26-full.md), бенчмарк: [benchmark-vs-top-companies-2026-06-26.md](benchmark-vs-top-companies-2026-06-26.md), enforcement: [enforcement-2026-06-26.md](enforcement-2026-06-26.md).

---

## Remediation status (2026-07-02, fix-пасс в тот же день)

**✅ Закрыто в Figma (проверено на живом файле):**
- **B1** — trap-чип Overview: `tlc` FILL→HUG, чип 224→279px, «3 traps cost you £180/year» рендерится целиком; слои `tl/tlc` переименованы (trap-chip/text). Файловый свип по видимым клипам дал ещё 5 — все закрыты: Result-Error title (FILL, 340px), Alert-Detail «Mark as done» (ct→HUG, контент 680px, влезает), Paywall «Restore purchases» (cta→HUG + прижат к низу), Privacy-Policy (фрейм вырос до 982 по прецеденту скролл-фреймов), Email-Auth «Forgot password?» (ct→HUG).
- **H4** — Settings: секция **GENERAL** создана, Appearance перенесён из NOTIFICATIONS (фрейм 1436→1476).
- **H5** — построен **«Source-Highlight — Wireframe»** (x=3978, ряд ②): шит с граббером, SheetHeader «Source — Klarna offer / Late fee · p.2 §4», выдержка документа с подсвеченной строкой 4.3 (left-border + body-strong), контекстные пункты 4.2/4.4 приглушены, провенанс-подпись, «Report a mismatch» (quiet) + «Done» (primary). Все заливки/радиусы/отступы привязаны к переменным. PM6 замкнут.
- **H6b** — Save-Watch-Success: body переписан с конкретикой («Watching the 28 May payment — we'll remind you 2 days before…») + quiet-кнопка **Adjust reminders** (→ Reminder settings).
- **M1** — Vault-Detail: «Stop watching · Delete» разнесены на две quiet-кнопки бок-о-бок («Stop watching» / «Delete document»).
- **M2** — Paywall: планы получили видимый selected-state (Yearly — 2px `foreground`-обводка + radius-12, Monthly — 1px `border`), gap 8; strokes привязаны к переменным.
- **M3** — Foundations-борд: добавлены строки `space-12`/`space-20` (шкала на борде теперь полная 4/8/12/16/20/24/32/48), swatch роли `icon`, RU-подзаголовок переведён на EN.
- **Переменные** — «призрачная» переменная `icon` (удалена из коллекции, биндинги остались) заменена локальной `Theme/icon` (Wireframe→gray-400, Light→gray-500), 4 потребителя перепривязаны; добавлены 5 недостающих ролей из DESIGN.md: `success/warning/danger/info-foreground`, `popover-foreground` (алиасы, оба режима).
- **Копи-фиксы** — Onboarding-1: дубль «No bank login, ever» убран из body (остался в trust-строке); Ask: убран задний «‹» (один dismiss — «×»).
- **Гигиена** — страница «Page 1» → **«Screens — Wireframe»**; 4 сиротских лейбла (ATOMS/MOLECULES/ORGANISMS/ICONS) удалены со страницы Components; 6 фреймов приведены к конвенции «X — Wireframe» (включая email-auth → Email-Auth); Save-Watch-Success возвращён на 442-сетку (x=3094).

**✅ Закрыто в репо (workflow, 6 агентов):**
- **H1+H2+H3+M3-doc** — DESIGN.md синхронизирован с живым файлом: label 12/500 (tracking-клейм снят), `figures-md`→`figures`, Inter-как-stand-in задокументирован, `space-12`/`space-20` в YAML + Layout, роль `icon` в YAML, заметка о зарезервированных hi-fi примитивах (teal/green/amber/red/blue); «канон рампы» переформулирован. design-system.md — `mono-figures`→`figures` + Inter-заметка.
- **H6** — sitemap + jtbd-to-flows переписаны под построенное (ON-1+value mock, 4 auth-опции с гостем, zero-config save → SW-success, Source-Highlight, полноэкранный Renewal Radar); **все 4 открытых вопроса sitemap §4 резолвлены**.
- **M6-doc** — в principles добавлен статус реализации (ListItem Trailing×6, Lines/State deferred; Patterns deferred).
- **README** репозитория переписан под Decode (был шаблонный «Full-Stack Template»); prototype/README обновлён (49 экранов/14 флоу, конвенция 2×, список сознательно не заведённых фреймов, механика hotspot'ов).
- **Контракты** — созданы docs/screens/paywall.md и docs/screens/vault-detail.md (в формате существующих).

**✅ Прототип (app.js):** +3 экрана (source-highlight, subscription-management, result-error) → 49; citations на Result и Ask ведут на Source-Highlight; «Move money»→«See what to do»; Settings «Manage subscription»→Subscription-Management; Save-success получил «Adjust reminders»→radar-settings; scan-processing получил ветку partial-fail; errors-флоу = 7 состояний.

**✅ Экспорт и верификация:** 15 PNG ре-экспортированы через `download_assets` (2×, борд 1.5×; get_screenshot не апскейлит — рецепт зафиксирован в памяти проекта); 51 PNG в репо. Финальная адверсариальная верификация (4 агента): **прототип 7/7 PASS** (все img существуют, все hotspot-цели/шаги флоу валидны, геометрия 0..100, 49/14, 0 orphan-экранов), **доки 6/7 → 7/7** (единственный дефект — off-by-one «14→15 фреймов не заведены» — исправлен), **визуал 9/9 PASS** (все 9 фиксов подтверждены пиксельными кропами; косметика «Mark as done» по центру — тоже дожата). `node --check prototype/app.js` — OK. Diff-ревьюер упал по session-limit — покрыт остальными тремя + ручным syntax-check.

---

## Вердикт одной строкой

**Система реально повзрослела: enforcement из «C+» стал живым фактом (проверено на файле), компонентизация завершена, экраны выглядят как wireframe-дек сильной продуктовой команды. Честный уровень — v0.6.** Главный класс проблем сменился: раньше это был «система не применена», теперь — **«документация отстала от файла» + один видимый рендер-баг на главном экране**. Это дешёвые, механические фиксы — не переделка.

---

## Что подтверждено как закрытое (с 26.06)

Проверено на живом файле, не по отчётам:

- ✅ **Enforcement держится.** `get_variable_defs` на Overview / Decode-Result / Foundations возвращает spacing (`xs/sm/12/md/20/lg/xl`), радиусы (`sm/default/lg/xl/full`), text-стили (`Decode/display…figures-lg`) и цветовые роли. Раньше возвращались только цвета. Шкала 4/8/12/16/20/24/32/48 — согласованная.
- ✅ **Рампа снапнута**: на просмотренных экранах нет off-ramp размеров; денежные суммы сидят на `figures/figures-lg` (tabular).
- ✅ **Компонентизация завершена**: библиотека = 8 атомов + 18 молекул + 5 организмов + 70 иконок; Button 3×4 (Style×State), TabBar 3, ListItem 6 trailing-вариантов, Bubble 2. Старое семейство рядов удалено, «Deprecated»-кладбища не осталось.
- ✅ **UX-фиксы прошлого аудита на месте**: Scan = тёмный центральный FAB (H6), trust-хуки на слайде 1 (H7), Save-Watch-Success существует и заведён в прототип (H8), «See what to do» вместо «Move money» на первой алерт-карточке (H9), «Save the cheaper one» на Compare (H10), радиусы на токенах (M3).
- ✅ **Экспорт-пайплайн выровнен по масштабу**: все экранные PNG — единые 2× (804px).
- ✅ **Визуальный уровень выборки (11 экранов)**: иерархия, воздух, секционный ритм, tabular-числа, честные копирайты — консистентно и профессионально. Result, Ask, Radar, Paywall — сильнейшие экраны; Settings избавился от «мёртвой дыры».

---

## Findings — приоритизированно

Severity: **Blocker** (видимый дефект/дезинформация) · **High** · **Med** · **Low**.

### Blocker

| # | Находка | Где | Фикс |
|---|---|---|---|
| B1 | **Trap-чип на Overview клиппится: рендерится «3 traps cost you £18»** вместо «…£180/year». Текст-нода `99:632` (width 221) лежит в фиксированном контейнере `tlc` `99:631` (width 166) — после бампа 12→17px (фикс M8 прошлого аудита) контейнер не вырос, текст обрезается. Для финпродукта это не эстетика: экран **показывает неверное число** на home. | Overview `99:603` → `tl 99:629/tlc 99:631` | Контейнеру `tlc` — HUG/FILL по ширине (рецепт из скилла figma-autolayout-hygiene); перепроверить остальные места бампа M8; ре-экспорт overview PNG |

### High

| # | Находка | Где | Фикс |
|---|---|---|---|
| H1 | **DESIGN.md ≠ Figma по рампе** — а DESIGN.md прямо объявляет «канон: этот файл + Foundations-борд, они совпадают». Факт (уточнён живой проверкой `getLocalTextStylesAsync` в fix-пасс): Figma `label` = 12/Medium/lh16/без tracking vs DESIGN.md `label` = 13/600/tracking 0.06em; имена разошлись: `figures-md` (док) vs `Decode/figures` (Figma). ~~caption = 15~~ — первоначальная оценка по прошлому аудиту оказалась неверной: живой стиль `Decode/caption` = **13**/Regular/lh18 и совпадает с доком (реальная рампа файла: 12/13/17/20/26/34). | `docs/DESIGN.md` typography ↔ text-стили файла | Привести DESIGN.md label/имена к живому файлу в одном коммите (caption не трогать — совпадает) |
| H2 | **DESIGN.md YAML не знает `space-12`/`space-20`** — токены добавлены enforcement-проходом 26.06, задокументированы в `guidelines/design-system.md` и `spacing-rhythm.md`, но канонический YAML в DESIGN.md остался на 6-ступенчатой шкале. Нарушен собственный контракт «правка дизайна = правка DESIGN.md в том же коммите». | `docs/DESIGN.md` spacing | Добавить обе ступени с usage в YAML + в раздел Layout |
| H3 | **Шрифт: Figma = Inter, DESIGN.md = SF Pro** — стенд-ин легитимен, но нигде не задокументирован; на дизайн-ревью это вопрос без ответа. | текст-стили файла | Одна строка в DESIGN.md Typography: «Figma-стенд-ин — Inter; в коде — системный SF Pro» |
| H4 | **Settings: строка «Appearance» лежит в секции NOTIFICATIONS** — видимый IA-баг (Appearance = Text size, theme — не уведомление). | Settings `71:78` | Вынести в отдельную секцию (GENERAL/DISPLAY) или к YOUR DATA; ре-экспорт |
| H5 | **PM6 «каждый термин тапается в источник» не имеет экрана-назначения**: sheet `QA-src / Source highlight` из sitemap так и не построен (нет ни фрейма, ни прототип-хопа). Citations-пилюли на Result/Ask ведут «в никуда». Это ядро trust-механики продукта. | sitemap группа D ↔ Figma | Либо построить один универсальный Source-sheet фрейм (документ + подсветка + «p.2 §4»), либо честно перенести в hi-fi backlog и пометить в sitemap |
| H6 | **Sitemap/flows устарели относительно построенного**: (а) ON-2 Value mock слит в ON-1 — верно по сути, но не отражено; (б) вместо конфигурационного шита `SV` (авто-имя + даты Radar + тоггл) построен zero-config Save → Success, при этом success обещает «We'll remind you before the next payment», хотя напоминание никто не настроил и пуш-пермишен не спрошен; (в) появились email-auth и «Skip — keep on device» (гость) — при контракте «Sign in with Apple — единственный auth». Гость-режим — хорошее решение (криterion найма №1 «ценность до регистрации»), но контракты и открытый вопрос №1 sitemap не резолвлены. | `docs/ux/screen-sitemap.md`, `jtbd-to-flows.md` F1/F2 | Обновить оба дока под реальность; для (б) решить продуктово: либо SV-шит, либо на success добавить строку-подтверждение даты («Watching the 28 May payment») и точку входа в настройку |

### Med

| # | Находка | Где | Фикс |
|---|---|---|---|
| M1 | **M6 из прошлого аудита не закрыт**: «Stop watching · Delete» — два глагола (один деструктивный) в одном tap-target. | Vault-Detail `95:438` | Разнести на два контрола; Delete — через существующий confirm |
| M2 | **Paywall: у планов Yearly/Monthly нет видимого selected-state** (ни рамки, ни radio). Apple 3.1.2 требует multi-plan **selector** — выбор должен читаться. | Paywall `96:478` | Selected-обводка/чек на активном плане + State в компонент плана |
| M3 | **Foundations-борд отстал от переменных**: нет `space-12`/`space-20`; нет роли `icon` (есть в файле, отсутствует и в DESIGN.md — надо добавить в оба); не показаны `*-foreground`-пары и `popover/card-foreground`. | Foundations `8:2` | Догнать борд до фактического набора переменных |
| M4 | **Прототип ↔ Figma разъехались точечно**: (а) hotspot-лейбл «Move money» на alerts — в Figma уже «See what to do»; (б) Settings «Manage subscription» ведёт на paywall, хотя существует фрейм Subscription-Management (важно: отмена в 2 тапа — VoC-инвариант, а её экран не показан в клик-пути); (в) на Result нет hotspot «Scan another» (есть в F2). | `prototype/app.js` | Обновить лейблы, подключить Subscription-Management, добавить hotspot |
| M5 | **17 из 63 фреймов не заведены в прототип**: Account, Subscription-Management, Notifications-Settings, Trial-Expired, Vault-Search-Results, Vault-Sort-Filter, Document-History, Privacy-Policy, Legal-Disclaimer, Result-Error, Force-Update, Maintenance, Rate-Feedback + 4 AppStore-артефакта (эти — осознанно). | prototype ↔ Figma | Решить судьбу каждого: подключить / пометить «Launch-артефакт» / удалить. Result-Error стоит подключить к scan-processing (partial-fail — контракт F2) |
| M6 | **ListItem без осей State и Lines** (только Trailing×6) — против собственной спеки B1 (`design-system-principles.md`); Chip/Button имеют состояния, ListItem — нет (pressed/disabled нужны прототипированию тапов). Patterns-band (Stepper-rail, из B6) тоже не построен. | Component Library | Либо добавить State-ось, либо зафиксировать в принципах «сокращённая спека для lo-fi» — сейчас доки обещают больше, чем есть |
| M7 | **Слоистая гигиена скаффолдов**: криптонейминг `tl/tlc/g2/lab` внутри экранов — на ревью и при генерации кода из Figma это шум; именно в таком фрейме спрятался клип B1. | экранные скаффолды | Переименовать по анатомии (trapChip/content и т.п.) хотя бы на hero-экранах |

### Low

- **«Page 1»** — дефолтное имя единственной экранной страницы; на Components-канвасе остались **сиротские лейблы** ATOMS/MOLECULES/ORGANISMS/ICONS на пустых координатах (компоненты переехали в Component Library-фрейм). Дешёвая полировка «файл как продукт».
- **Нейминг фреймов дрейфует**: 57 — «X — Wireframe», 6 новых — без суффикса, `email-auth` — единственный lowercase; Save-Watch-Success стоит вне 442-px сетки канваса (x=3122 vs 3094).
- **Stale-экспорты**: decode-result PNG = высота 1336 (фрейм уже 1492), foundations PNG тоже отстал; git-status показывает то же. После фикса B1 — ре-экспорт затронутых.
- **Ask-шит: двойной dismiss** — и `‹` слева, и `×` справа. Одно правило закрытия (у шитов — ×).
- **Onboarding-1 дублирует «No bank login, ever» дважды на одном экране** (в body и в trust-строке) — копирайт-полировка.
- **Screen-contracts покрывают 6 экранов из ~28** запланированных sitemap'ом («на каждый экран — контракт»). Либо дописать ключевые (Paywall, Vault-Detail, Radar), либо скорректировать обещание.
- **README репозитория — всё ещё «Full-Stack Template»** (Render, hello-endpoints) — не про Decode. Для портфолио-репо это первое, что видят.
- Foundations-борд смешивает RU/EN в аннотациях — ок для внутренней работы; для портфолио-кейса лучше единый EN.

---

## Design-system checklist (посчитано)

**Источник правды:** `docs/DESIGN.md` (+ живые переменные файла) — конфликт между ними = H1/H2.
**Проверено:** переменные на 3 нодах, рендеры 11 экранов, полная библиотека.

- [x] Spacing на шкале 4/8/12/16/20/24/32/48 — off-scale на выборке: **0** (остаток ≈85 микро-значений задокументирован в enforcement-отчёте как осознанный)
- [x] Рампа 6 ступеней + 2 figures — off-ramp на выборке: **0**; НО док-канон разошёлся (H1)
- [x] Цвета только роли, hex-литералов: **0**; примитивы 11, ролей ~35 (роль `icon` не задокументирована — M3)
- [x] Радиусы на токенах: 8/12/16/20/full — **0** нарушений на выборке
- [x] Компонент-дубликатов: **0** (консолидация ListItem/Bubble удержалась)
- [ ] Вариантные оси по спеке — ListItem урезан (M6)
- [ ] Док-синхрон: **4 расхождения** (H1, H2, H3, M3)

**Счётчики для ре-аудита:** doc↔file расхождений: 4 → цель 0 · клиппинг-багов: 1 → 0 · фреймов вне нейминг-конвенции: 6 → 0 · неподключённых фреймов: 17 → ≤4 (AppStore) · stale PNG: ≥2 → 0.

---

## Флоу и JTBD — сквозная сверка

**Jobs → экраны:** J1→Decode-Result ✅ · J2→Overview ✅ · J3→Radar/Alerts ✅ · J4→Ask ✅ · J5→Ask-подветка ✅ (cancel-канал виден в Vault-Detail notes) · J6→Vault-Detail ✅ (P2-глубина, без «lender view» — план).
**Pre-mortem:** PM1 Home=Overview ✅ · PM2 no-doc ветка ✅ · PM3 credit-file герой ✅ (лучший экран продукта) · PM4 пейволл на Watch-границе ✅ («Watching 2 of 6 · Unlock with Pro» на Radar — образцово) · PM5 signpost ✅ · **PM6 — ⚠️ наполовину**: три языка достоверности на месте, но tap-to-source некуда вести (H5).
**Состояния:** error/empty/discard/confirm/success — редкая для wireframe-стадии полнота (6 error-экранов, 3 confirm-диалога, 2 success). Дыры: Result partial/«couldn't read» (фрейм Result-Error есть, не подключён — M5), push-permission момент (после первого result) не показан в клик-пути.
**Фрикция первого decode:** onboarding(2–3 экрана) → capture → camera → review → processing → result — 6–7 тапов до aha, регистрация не блокирует (guest) — соответствует критерию найма №1 (≤30 сек). ✅

---

## Планка «FAANG-уровня» — калибровка (дельта к бенчмарку 26.06)

| Слой | Было (26.06) | Сейчас | Комментарий |
|---|---|---|---|
| Token-архитектура | A | **A** | 3 тира + доменный слой; без изменений — уровень удержан |
| Enforcement | C+ | **A−** | Привязка живая и проверенная; минус — только за недоснятый хвост (борд/доки) |
| Консистентность экранов | B− | **A−** | Выборка чистая; минус за B1-клип и paywall-selector |
| Методология/процесс | A/A+ | **A** | Но накопился док-долг (H1/H2/H6) — «документы-как-контракт» требуют дисциплины обновления |
| Артефакт-гигиена | C | **B−** | Масштаб единый, но stale PNG, «Page 1», сиротские лейблы, нейминг-дрейф |
| UX/флоу | B+ | **A−** | Полнота состояний выше индустрии; PM6-дыра и SV-шов — оставшиеся |
| Визуал/бренд | N/A | **N/A** | Grayscale-фаза, сознательно; hi-fi не трогаем |

**Итог: v0.4 → v0.6.** На «дек топ-компании» файл уже похож; выдают стадию не экраны, а гигиена (нейминг, stale-экспорты, «Page 1») и рассинхрон доков. Всё это — день механической работы, не редизайн.

---

## Оценка идеи продукта

### Что делает идею сильной (по верифицированной ресёрч-базе)

1. **Дыра реальна и по-прежнему пуста.** Из 25+ разобранных продуктов ни один не делает «фото документа → детерминированный true cost + trap-флаги + citations → наблюдаемое обязательство». Колонка true-cost-math пуста у всех, включая новых соседей (AI Contract Analyzer — без BNPL/citations/true-cost).
2. **Тайминг — редкий подарок**: 15.07.2026 Regulation Day создаёт «зоопарк» старых/новых условий = спрос на объяснение + бесплатный PR-хук.
3. **Позиционирование «no bank connection» подтверждено с двух сторон** (похвала Bobby / ненависть к Open Banking-поломкам) — это и барьер доверия снятый, и техническое упрощение.
4. **Экономика зелёная**: $0.05–0.09/док, COGS 10–30% от £4.99 — inference не ограничивает прайсинг.
5. **Рвы осмысленные**: детерминированный движок («Calculated, not AI»), UK trap-корпус (18 few-shot verbatim-маркеров), citations-к-строке, Vault/Radar-loop. ChatGPT-субституту нужно всё это построить, а не «просто ответить».
6. **Anti-dark-pattern биллинг как фича** — категория тонет в 1★ из-за отмен (Cleo $17M FTC); «отмена в 2 тапа» здесь — конкурентное преимущество, встроенное в дизайн.

### Главные риски идеи (не дизайна)

1. **Частота wedge-события.** BNPL-оффер — эпизодическое событие; J1 сам по себе не создаёт привычку. Вся retention-нагрузка лежит на Watch-слое (Radar) — а его главный враг, по ресёрчу, не конкурент, а **avoidance/money-dysmorphia (~43% Gen Z)**: пользователь боится открывать приложение про долги.
2. **Категорию придётся объяснять** («это не банк-трекер и не ChatGPT») — CAC-риск.
3. **Нейминг — самый конкретный нерешённый бизнес-блокер**: словесный знак DECODE в классе 9 занят; решение (DecodeFi / фигуративный знак кл.36) надо принять до любого бренд-вложения.
4. **FCA-граница Q&A** — pre-signature легально, post-signature Q&A ползёт в debt counselling; intent-классификатор запроектирован, но юр-ревью до запуска обязателен.
5. **iOS 64-pending-notifications лимит** — тихая деградация главного retention-механизма; митигация (30–45-дневный горизонт + rebuild-on-launch) уже в ресёрче, не потерять при билде.

### Что можно улучшить (идеи в порядке ценность/усилие)

1. **Победить avoidance ambient-слоем, а не пушами.** Lock-screen / Home-widget («Next: Klarna £86 · in 4 days») и **.ics-экспорт / Apple Wallet-pass на даты платежей** — ценность доставляется без открытия приложения и без страха. Это прямой ответ на риск №1 и дешёвый для Expo. Стоит добавить в flows как F6-расширение.
2. **Поймать момент лучше камеры: screenshot-детекция.** Сегмент скринит чекауты постоянно; iOS умеет детектить скриншот → предложение «Decode this?». Снимает 15-секундную паузу H3 (главная гипотеза входа) и делает вход привычным жестом. Кандидат в MVP+1.
3. **Виральная петля из trap-карточек.** Share-Decode уже есть (PDF/text) — добавить формат «shareable trap card» (обезличенный трап + £-цена, без документа): аудитория «please no judgements» живёт в Reddit/TikTok-тредах — это её валюта. Совмещается с PR-хуком 15.07.
4. **Возрастной мост J6 → «Mortgage-ready view».** Сегмент 18–25 стареет в первую ипотеку; «глазами кредитора» (P2) может стать вторым aha и причиной года retention — сейчас это самый недоинвестированный job. Держать в roadmap явно, не как хвост Vault.
5. **Не добавлять «Decode Score»** (соблазн категории) — оценочный скоринг = FCA-риск value judgment; текущий выбор «факты + severity порядком» верен, зафиксировать как принцип.
6. **Insurance-renewal как doc-type #2 — правильный выбор** (ICOBS 6.5 кладёт diff в само письмо → детерминизм из коробки); единственное — Radar-настройки уже должны уметь per-category lead-time (в вайрах есть ✅).
7. **Резолвнуть 4 открытых вопроса sitemap** (guest-scan ✓ фактически решён — задокументировать; Vault-таб vs секция; Alerts sheet vs fullscreen; demo-док) — они висят с 12.06.

### Итог по идее

Идея — **сильная, верифицированная и своевременная**: настоящий wedge с пустой нишей, понятным рвом и датой запуска, подаренной регулятором. Ахиллесова пята — не спрос и не конкуренты, а **частота использования** после первого aha. Поэтому лучшие следующие инвестиции продукта — не новые экраны, а ambient-слой Watch (widget/calendar/wallet-pass) и распределение (screenshot-момент, shareable traps). Плюс два невайрфреймовых блокера до любого билда: нейминг-clearance и юр-ревью FCA-периметра.

---

## Рекомендованная последовательность фиксов

1. **B1** — клип trap-чипа на Overview (+ проверка остальных мест M8-бампа) + ре-экспорт.
2. **Док-синхрон одним коммитом (H1+H2+H3+M3)** — DESIGN.md ↔ Figma ↔ Foundations-борд: рампа, space-12/20, Inter-стенд-ин, роль `icon`. После него «канон» снова правда.
3. **H4–H6** — Appearance-секция; Source-highlight sheet (или явный перенос); обновление sitemap/flows под построенное.
4. **M1–M5** — Vault-Detail деструктив, paywall selected-state, прототип-вайринг (лейблы, Subscription-Management, Result-Error).
5. **Гигиена (Low)** — имя страницы, сиротские лейблы, нейминг 6 фреймов, README, ре-экспорт stale PNG.
6. Дальше — hi-fi фаза по плану (палитра teal из research/19, WebAIM-прогон, Liquid Glass только на навигации).
