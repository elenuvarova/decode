# `ios-wireframes` Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Собрать user-level скилл `ios-wireframes` — владельца темы «вайрфрейм как артефакт под iOS», который ведёт пайплайн от инвентаря экранов до приёмки и делегирует чужие фазы соседним скиллам.

**Architecture:** Дирижёр по модели `spec-pipeline`: `SKILL.md` держит метод (5 фаз), границы, чеклист-суждение и 9 проверяемых инвариантов; два файла в `reference/` подключаются по времени обращения (числа на фазах 2–3, канон на 1/3/5); `assets/audit-workflow.mjs` — генерализованный многоагентный аудит-проход, который скилл предлагает, но не запускает сам.

**Tech Stack:** Markdown + YAML frontmatter (формат Claude Code skills), JavaScript (ESM) для Workflow-скрипта, bash для проверок.

**Источник истины:** [`docs/superpowers/specs/2026-08-09-ios-wireframes-skill-design.md`](../specs/2026-08-09-ios-wireframes-skill-design.md) (коммит `1005358`). Везде, где план говорит «по §N спеки», имеется в виду этот файл — он закоммичен, читать его при выполнении задачи.

## Global Constraints

- Корень скиллов: `~/.claude/skills/` (переменная `$SK` в командах ниже). Скилл создаётся в `$SK/ios-wireframes/`.
- Имя скилла ровно `ios-wireframes` — по платформе, не по устройству (решение D3 спеки): iPad-глава дописывается позже без переименования.
- Охват — **только iPhone**. iPad, HTML-вывод, цветовая палитра и правки в самом Decode вне охвата (§12 спеки).
- Скилл **делегирует**, а не дублирует: инвентарь → `wireframe-planner`, сценарные дыры → `ux-flow-review`, сборка в Figma → `figma-build` + `figma-autolayout-hygiene`, ревью hi-fi → `apple-hig-review`.
- **Каждое число** в `reference/canvas-and-metrics.md` помечено происхождением: `[kit]` · `[measured]` · `[derived]` · `[nominal]`. Без пометки числа не добавлять.
- Правила разделены на **суждение** (§8 спеки → чеклист) и **проверяемый инвариант** (§9 спеки → аудит). Не смешивать в одном списке.
- Новый скилл получает строку в `_INDEX.md` **в том же изменении**, что создаёт его. `check-skills-indexed.sh` обязан оставаться зелёным.
- Язык файлов скилла — английский (как у остальных скиллов библиотеки: `apple-hig-review`, `wireframe-planner`, `figma-build`). Русские триггеры — внутри `description`, рядом с английскими.
- Коммиты — в репозиторий Decode только для файлов плана/спеки. Файлы скилла лежат в `~/.claude/skills/`, который под git не находится: там коммитов нет, проверка — запуском команд.

---

### Task 1: `SKILL.md` + регистрация в индексе

**Files:**
- Create: `~/.claude/skills/ios-wireframes/SKILL.md`
- Modify: `~/.claude/skills/_INDEX.md` (вставка после строки 97, `illustrator`)

**Interfaces:**
- Consumes: ничего (первая задача).
- Produces: каталог `$SK/ios-wireframes/` и файл `SKILL.md` с секциями, на которые ссылаются задачи 2–4: `## Reference` (ссылки на два файла в `reference/`), `## Phase 5 — Acceptance` (куда задача 4 добавит предложение запустить воркфлоу).

- [ ] **Step 1: Написать провальную проверку индексации**

Проверка уже существует в библиотеке — используем её как тест. Сначала создаём только каталог, без записи в индекс:

```bash
SK=~/.claude/skills
mkdir -p "$SK/ios-wireframes"
printf -- '---\nname: ios-wireframes\ndescription: placeholder\n---\n' > "$SK/ios-wireframes/SKILL.md"
```

- [ ] **Step 2: Запустить проверку и убедиться, что она падает**

Run: `bash ~/.claude/skills/check-skills-indexed.sh`
Expected: FAIL — `BLIND: ios-wireframes not in _INDEX.md`, код возврата 1.

- [ ] **Step 3: Написать `SKILL.md` целиком**

Frontmatter ровно такой (одна строка `description`, без переносов):

```markdown
---
name: ios-wireframes
description: Use when drawing or fixing WIREFRAMES for an iPhone app — choosing and declaring the fidelity stage, the device canvas and safe areas, scroll behaviour, platform component blanks, state coverage, the annotation layer, and wireframe acceptance. Trigger on "wireframe an iOS app", "draw the screens", "what canvas size for iPhone", "is this lo-fi or mid-fi", "the wireframes look cramped", "you can't tell what's a button", "нарисуй вайры под iOS", "собери экраны приложения", "какой канвас у айфона", "это лоу-фай или мид-фай", "вайры выглядят тесно", "непонятно где кнопка". Distinct from wireframe-planner (device-agnostic screen inventory), figma-build (Figma MCP assembly) and apple-hig-review (reviewing finished hi-fi UI).
---
```

Тело файла — следующие секции в этом порядке. Содержание берётся из спеки, указанной в шапке плана; ниже перечислено, что обязано быть в каждой:

1. `# iOS Wireframes` — абзац о том, чем скилл владеет (§4 спеки, блок «Владеет»).
2. `## When to use / When NOT to use` — таблица делегирования из §4 спеки целиком (5 строк: `wireframe-planner`, `ux-flow-review`, `figma-build`, `figma-autolayout-hygiene`, `apple-hig-review`) плюс блок «Явно НЕ делает» (4 пункта).
3. `## Reference` — две ссылки: `reference/canvas-and-metrics.md` (числа — нужны на фазах 2–3) и `reference/craft-canon.md` (канон и метод доказательства — фазы 1, 3, 5). Явно написать, что числа не выдумывать, а брать оттуда, и что каждое несёт пометку происхождения.
4. `## Phase 1 — Inventory` — §5 фаза 1 спеки: делегирование, список iOS-специфичных экранов, матрица покрытия состояний (поток × загрузка/пусто/ошибка/край), таксономия дыр A/B/C, правило «дыры только из собственных документов», «молчаливые действия» как самый дешёвый класс.
5. `## Phase 2 — Stage and frame` — §5 фаза 2: осознанный выбор fidelity и его объявление; канвас объявляется один раз; кадр по высоте устройства + клип + скролл; лист до нижней кромки с индикатором оверлеем; один базовый радиус.
6. `## Phase 3 — Blanks` — §5 фаза 3: поведенческий словарь платформы; список запретов (5 пунктов); измеримая иерархия кнопок и правило «контейнер — действие, текст — отказ»; метрики строки списка; шеврон только для навигации вглубь; одно семейство иконок; метрики символов из шрифта.
7. `## Phase 4 — Assembly` — §5 фаза 4: делегирование + словарь имён слоёв + рефлоу от фактической высоты + аннотационный слой с правилом «одно правило подписи на файл».
8. `## Phase 5 — Acceptance` — чеклист-суждение из §8 спеки (14 пунктов) и ссылка на `## Invariants`.
9. `## Invariants` — все 9 инвариантов из §9 спеки **дословно, вместе с оговорками про ложные срабатывания** (особенно №4 про горизонтальную пару — без неё проверка даёт ложные срабатывания).
10. `## Common pitfalls` — 5–8 пунктов, каждый одной строкой: длинный кадр вместо кадра по устройству · лист, обрывающийся полосой фона · попытка нарисовать деструктив в сером · обводка вторым уровнем иерархии · шеврон на строке, открывающей системный лист · подгонка символов под квадрат бокса · капс в заголовках групп · внешний лейбл над полем.
11. `## Related skills` — обратные ссылки на `wireframe-planner`, `ux-flow-review`, `figma-build`, `figma-autolayout-hygiene`, `apple-hig-review`, `accessibility-review`.

- [ ] **Step 4: Вставить строку в `_INDEX.md`**

Строка идёт в направлении `design`, после `illustrator` (строка 97) и перед `kling-cli`:

```markdown
- **ios-wireframes** — draw/fix WIREFRAMES for an iPhone app → declare the fidelity stage, device canvas & safe areas, device-height frames with scroll, platform blanks, measurable button ladder, state-coverage matrix, annotation layer, acceptance checklist + 9 checkable invariants; "нарисуй вайры под iOS", "это лоу-фай или мид-фай", "непонятно где кнопка"
```

- [ ] **Step 5: Запустить проверку и убедиться, что она проходит**

Run: `bash ~/.claude/skills/check-skills-indexed.sh`
Expected: PASS — `OK: every skill indexed`, код возврата 0.

- [ ] **Step 6: Проверить frontmatter и триггеры**

```bash
SK=~/.claude/skills
head -1 "$SK/ios-wireframes/SKILL.md" | grep -qx -- '---' && echo "frontmatter открыт"
grep -q '^name: ios-wireframes$' "$SK/ios-wireframes/SKILL.md" && echo "name ок"
for t in "wireframe an iOS app" "lo-fi or mid-fi" "нарисуй вайры" "непонятно где кнопка"; do
  grep -q "$t" "$SK/ios-wireframes/SKILL.md" && echo "триггер ок: $t" || echo "ТРИГГЕР ПОТЕРЯН: $t"
done
```

Expected: пять строк «ок», ни одной «ПОТЕРЯН».

- [ ] **Step 7: Проверить, что все 9 инвариантов доехали**

```bash
grep -c '^[0-9]\.' ~/.claude/skills/ios-wireframes/SKILL.md
```

Expected: не меньше 9 (нумерованный список инвариантов).

---

### Task 2: `reference/canvas-and-metrics.md`

**Files:**
- Create: `~/.claude/skills/ios-wireframes/reference/canvas-and-metrics.md`

**Interfaces:**
- Consumes: `SKILL.md` из задачи 1 (секция `## Reference` уже ссылается на этот файл).
- Produces: таблицы чисел, на которые ссылаются фазы 2–3 в `SKILL.md`. Формат каждой строки: `| что | значение | происхождение |`, где происхождение — ровно один из тегов `[kit]` / `[measured]` / `[derived]` / `[nominal]`.

- [ ] **Step 1: Написать провальную проверку происхождения**

Создать файл-заглушку с одной непомеченной строкой, чтобы проверка сработала:

```bash
SK=~/.claude/skills
mkdir -p "$SK/ios-wireframes/reference"
printf '# Canvas and metrics\n\n| what | value | source |\n|---|---|---|\n| iPhone frame | 402 x 874 | |\n' \
  > "$SK/ios-wireframes/reference/canvas-and-metrics.md"
```

- [ ] **Step 2: Запустить проверку и убедиться, что она падает**

Run:

```bash
awk '/^\|/ && /[0-9]/ && !/^\|[- :|]*\|$/ && !/\[кит\]|\[замер\]|\[выведено\]|\[номинал\]/ { print FILENAME": "FNR": "$0; n++ } END { exit (n>0) }' \
  ~/.claude/skills/ios-wireframes/reference/canvas-and-metrics.md
```

Expected: FAIL (код 1) и печать строки `| iPhone frame | 402 x 874 | |` — число без пометки происхождения.

- [ ] **Step 3: Написать файл целиком**

Шапка файла: версия кита и дата извлечения (Apple Design Resources iOS 26, файл `pL2Suk43Ua44Cwld1vTAtb`), легенда тегов, и предупреждение — при новой major-версии iOS перепроверять `[kit]`-строки.

**Таблица «Канвас и safe area»:**

| что | значение | тег |
|---|---|---|
| Кадр экрана iPhone | 402 × 874 (16/17 Pro) | `[kit]` |
| Кадров шириной 402 в ките — ровно по 874 | 43 из 43 | `[kit]` |
| Боковой инсет экрана → ширина контента | 16 / 16 → 370 | `[kit]` |
| Слой home-индикатора | 402 × 34, y = 840 | `[kit]` |
| Полоса индикатора | 144 × 5, 8 от нижней кромки | `[kit]` |
| Dynamic Island сверху | ≈ 59 | `[nominal]` |
| Минимальный тач-таргет | 44 × 44 | `[nominal]` |

**Таблица «Лист (modal sheet)»:**

| вариант | верх → низ | примечание | тег |
|---|---|---|---|
| Fullscreen | 62 → 874 | до нижней кромки | `[kit]` |
| Fullscreen Stack | 62 → 874 | до нижней кромки | `[kit]` |
| Inspector (врезной, iOS 26) | 500 → 874, подложка врезана 6 слева/справа, кончается на 868 | меньшинство: 3 приложения из 20 | `[kit]` + `[measured]` |
| Home-индикатор | брат листа **поверх**, не ребёнок под ним | во всех трёх вариантах | `[kit]` |

Отдельной строкой записать замер живых приложений: у 4 промеренных по пикселям лист белый до самой кромки, ни у одного он не обрывается полосой фона `[measured]`.

**Таблица «Строка списка»:**

| что | значение | тег |
|---|---|---|
| Боковой инсет строки | 0/16/0/16 | `[kit]` |
| Ведущий бокс символа | 28 × 20 | `[kit]` |
| Ведущий глиф | SF Pro 17 Regular, центр/центр | `[kit]` |
| Зазор символ → текст | 8 | `[kit]` |
| Начало текстовой колонки от края карточки | 16 + 28 + 8 = 52 | `[kit]` |
| Зазор между трейлинг-элементами | 16 | `[kit]` |
| Разделитель | внутри контентной колонки: от 52 и не доходит 16 до правого края | `[kit]` |
| Шеврон drill-in | SF Pro 17 Semibold, ширина адванса 8; фактический ink при 17 pt = 8,69 × 14,91 | `[kit]` |
| Инсет до иконки у 7 промеренных приложений | 16, без исключений (1 px ≈ 1,31 pt, ±1,5 pt) | `[measured]` |
| Зазор иконка → текст в живых | 12–16 | `[measured]` |
| Размер символа: голый / в плашке | 18–24 / 28–32 — **вкусовщина**, источники разошлись | `[measured]` |

⚠ **Ловушка, записать явно:** ранняя оценка шеврона в 11,4 была получена из пропорции нарисованного вектора и оказалась занижена; правильные метрики берутся из шрифта. Это образец правила «метрики символов из шрифта, а не подгонка под бокс».

**Таблица «Кнопки»:**

| что | значение | тег |
|---|---|---|
| Высота крупной CTA | 48 | `[kit]` |
| Secondary — заливка | `#787880` @ 16 % (= `#E9E9EB` на белом) | `[kit]` |
| Destructive — заливка | та же нейтральная, подпись красная | `[kit]` |
| Обводочная CTA | **отсутствует в ките во всех наборах** | `[kit]` |
| Нейтральная заливка в живых приложениях | (228,228,228) · (233,239,244) · (242,248,242) — кучно вокруг `#E9E9EB` | `[measured]` |
| Обводка как третий уровень | наше расширение ради читаемости в сером; на hi-fi схлопывается в текстовую с тинтом | `[derived]` |

**Таблица «Прочие компоненты»:**

| что | значение | тег |
|---|---|---|
| Поле формы (Text Field) | строка 52, инсет 16, текст 17 | `[kit]` |
| Поле поиска | 370 × 44, капсула | `[kit]` |
| Алерт | окно 300, радиус 34, паддинг 14, текст слева 17/22, кнопки в ряд капсулами 48 | `[kit]` |
| Радиусы листа | верх 34, низ 58 | `[kit]` |
| Радиусы клавиатуры | верх 27, низ 62 | `[kit]` |
| Панель ввода (композер) | высота капсулы 44 — взята у поля поиска, **в ките такого компонента нет** | `[derived]` |

**Таблица «Типографика (SF Pro — размер / интерлиньяж / трекинг)»:** Large Title Emphasized Bold 34/41/+0.40 · Title 3 Regular 20/25/−0.45 · Headline Semibold 17/22/−0.43 · Body Regular 17/22/−0.43 · Subheadline Regular 15/20/−0.23 · Caption 2 Regular 11/13/+0.06 — все `[kit]`.

**Таблица «Семантические цвета, Light»:** BG Primary `#ffffff` · BG Grouped Primary `#f2f2f7` · Label Primary `#000000` · Label Secondary `#3c3c4399` · Label Tertiary `#3c3c434d` · Separator Opaque `#c6c6c8` · Separator Non-opaque `#0000001f` — все `[kit]`.

- [ ] **Step 4: Запустить проверку и убедиться, что она проходит**

Run:

```bash
awk '/^\|/ && /[0-9]/ && !/^\|[- :|]*\|$/ && !/\[кит\]|\[замер\]|\[выведено\]|\[номинал\]/ { print FILENAME": "FNR": "$0; n++ } END { exit (n>0) }' \
  ~/.claude/skills/ios-wireframes/reference/canvas-and-metrics.md
```

Expected: PASS (код 0), вывода нет — ни одной строки таблицы с числом без пометки происхождения.

- [ ] **Step 5: Проверить, что все четыре тега реально используются**

```bash
for t in кит замер выведено номинал; do
  c=$(grep -o "\[$t\]" ~/.claude/skills/ios-wireframes/reference/canvas-and-metrics.md | wc -l | tr -d ' ')
  echo "$t: $c"
done
```

Expected: у всех четырёх счётчик больше нуля. Если `[derived]` или `[measured]` = 0 — файл потерял различение между китом и нашими выводами, вернуться к шагу 3.

---

### Task 3: `reference/craft-canon.md`

**Files:**
- Create: `~/.claude/skills/ios-wireframes/reference/craft-canon.md`

**Interfaces:**
- Consumes: `SKILL.md` (секция `## Reference` ссылается на этот файл).
- Produces: раздел `## Method of proof` — на него ссылается промпт ревьюера в задаче 4.

- [ ] **Step 1: Написать проверку наличия обязательных разделов**

```bash
F=~/.claude/skills/ios-wireframes/reference/craft-canon.md
for s in "Fidelity ladder" "One accent" "Button ladder" "Row density" "Section headers" "One fact — one layer" "Financial screens" "Annotation layer" "Method of proof" "Already matches practice"; do
  grep -q "$s" "$F" 2>/dev/null && echo "ок: $s" || echo "НЕТ РАЗДЕЛА: $s"
done
```

- [ ] **Step 2: Запустить и убедиться, что падает**

Run: команду из шага 1.
Expected: десять строк «НЕТ РАЗДЕЛА» — файла ещё нет.

- [ ] **Step 3: Написать файл**

Девять разделов, содержание из §7 и §10 спеки:

1. **`## Fidelity ladder and the stage trap`** — lo-fi / mid-fi / hi-fi и правило «ревьюер судит артефакт по тому, как тот выглядит, а не по имени папки»; два честных пути (признать стадию либо опустить фиделити).
2. **`## One accent`** — серая шкала + один акцент, тратится только на первичное действие, текущее состояние и аннотации; провал — акцент, привязанный к цвету текста.
3. **`## Button ladder — declared vs distinguishable`** — объявить уровни мало, надо проверить различимость; вторичная = нейтральная заливка; обводка работает только третьим уровнем; «контейнер — действие, текст — отказ»; вес убывает только в вертикальной стопке.
4. **`## Row density`** — вторая строка только если несёт решение или состояние; разделитель по текстовой колонке; шеврон только для навигации вглубь; одно семейство иконок в карточке.
5. **`## Section headers`** — обычный регистр серым, не капс.
6. **`## One fact — one layer`** — находка / свидетельство / последствие; если фактов меньше, чем слоёв, лишний слой исчезает, а не заполняется пересказом; причина «мишуры» структурная — шаблон под одну форму документа переиспользован для другой; и правило «не называть в копии то, что не доказывается из источника».
7. **`## Financial screens`** — крупное число как якорь, дата в левый рельс, немного блоков на экран.
8. **`## Annotation layer`** — пронумерованные выноски акцентом; одно правило подписи на файл; независимые состояния не рисовать линейной цепочкой.
9. **`## Method of proof`** — четыре пункта §10 спеки дословно: три независимых источника с разделением «правило vs вкусовщина» · замер вместо мнения (с примером, где первичное впечатление было опровергнуто) · расхождение руководств и практики объясняется форматом · считать, а не описывать.
10. **`## Already matches practice`** — что не надо переделывать: safe area и статус-бар, 44 pt таргеты, grouped-карточки с инсетом и разделителями, правое выравнивание сумм, крупная сумма как якорь, отдельные экраны состояний.

- [ ] **Step 4: Запустить проверку и убедиться, что проходит**

Run: команду из шага 1.
Expected: десять строк «ок», ни одной «НЕТ РАЗДЕЛА».

⚠ **Переносимость.** Скилл user-level и живёт вне любого проекта: источники в нём называются **типом свидетельства** («кит платформы», «выборка живых экранов», «пиксельный обмер»), а не путями к файлам конкретного репозитория. Ни одной ссылки вида `research/36-...` или `/Users/...` в файлах скилла быть не должно — иначе он сломается в первом же другом проекте. Проверяется в задаче 6.

- [ ] **Step 5: Проверить, что раздел про метод не выродился в заголовок**

```bash
awk '/^## Method of proof/,/^## Already matches practice/' ~/.claude/skills/ios-wireframes/reference/craft-canon.md | wc -l
```

Expected: больше 12 строк (четыре пункта с объяснениями, а не список из четырёх слов).

---

### Task 4: `assets/audit-workflow.mjs`

**Files:**
- Create: `~/.claude/skills/ios-wireframes/assets/audit-workflow.mjs`
- Modify: `~/.claude/skills/ios-wireframes/SKILL.md` (в `## Phase 5 — Acceptance` добавить абзац про запуск)

**Interfaces:**
- Consumes: `SKILL.md` и `reference/craft-canon.md` (промпт ревьюера ссылается на `## Method of proof`).
- Produces: Workflow-скрипт, принимающий через глобальный `args` объект `{ pngDir, screens, docs, stage }`, где `pngDir` — папка с экспортами, `screens` — массив имён файлов, `docs` — массив путей к докам-источникам, `stage` — строка стадии fidelity (например `"grayscale mid-fi"`).

- [ ] **Step 1: Написать проверку «нет Decode-специфики и файл парсится»**

⚠ **Не проверять `node --check` напрямую по файлу.** Workflow-скрипт — не самостоятельный ES-модуль: рантайм исполняет тело в async-контексте, поэтому завершающий top-level `return` там законен, а `node --check` по сырому файлу выдаст `SyntaxError: Illegal return statement` на корректном коде. Проверять надо в той форме, в которой скрипт исполняется:

```bash
F=~/.claude/skills/ios-wireframes/assets/audit-workflow.mjs
T=$(mktemp -d)
{ echo 'async function __wf(){'; sed 's/^export const meta/const meta/' "$F"; echo '}'; } > "$T/wrapped.mjs"
node --check "$T/wrapped.mjs" && echo "синтаксис ок"
grep -niE 'decode|elenauvarova|/Users/|git projects' "$F" && echo "НАЙДЕНА СПЕЦИФИКА" || echo "специфики нет"
rm -rf "$T"
```

- [ ] **Step 2: Запустить и убедиться, что падает**

Run: команду из шага 1.
Expected: FAIL — `sed` сообщает, что файла нет, `node --check` не находит что проверять.

- [ ] **Step 3: Написать скрипт**

```javascript
export const meta = {
  name: 'ios-wireframe-audit',
  description: 'Audit a set of iOS wireframe screens for geometry, platform correctness, invariants and cross-screen consistency; adversarially verify each finding; synthesize a prioritized report',
  phases: [
    { title: 'Review', detail: 'visual groups + invariants + platform correctness + cross-screen' },
    { title: 'Verify', detail: 'adversarially re-check each finding' },
    { title: 'Synthesis', detail: 'dedup and prioritize' },
  ],
}

// args: { pngDir, screens: string[], docs?: string[], stage?: string, groupSize?: number }
const cfg = args || {}
const pngDir = String(cfg.pngDir || '').replace(/\/+$/, '')
const screens = Array.isArray(cfg.screens) ? cfg.screens : []
const docs = Array.isArray(cfg.docs) ? cfg.docs : []
const stage = cfg.stage || 'grayscale mid-fi'
const groupSize = cfg.groupSize || 6

if (!pngDir || screens.length === 0) {
  throw new Error('audit-workflow needs args: { pngDir, screens: [...] }')
}

const png = (f) => pngDir + '/' + f

const FINDINGS = {
  type: 'object',
  properties: {
    findings: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          screen: { type: 'string' },
          area: { type: 'string' },
          issue: { type: 'string' },
          severity: { type: 'string', enum: ['critical', 'should-fix', 'nit'] },
          source: { type: 'string' },
        },
        required: ['screen', 'area', 'issue', 'severity', 'source'],
      },
    },
  },
  required: ['findings'],
}

const VERDICT = {
  type: 'object',
  properties: {
    real: { type: 'boolean' },
    severity: { type: 'string', enum: ['critical', 'should-fix', 'nit', 'not-an-issue'] },
    note: { type: 'string' },
  },
  required: ['real', 'severity', 'note'],
}

const REPORT = {
  type: 'object',
  properties: {
    summary: { type: 'string' },
    critical: { type: 'array', items: { type: 'string' } },
    shouldFix: { type: 'array', items: { type: 'string' } },
    nits: { type: 'array', items: { type: 'string' } },
    aligned_ok: { type: 'string' },
  },
  required: ['summary', 'critical', 'shouldFix', 'nits', 'aligned_ok'],
}

const STAGE_NOTE =
  'You are reviewing iPhone wireframes at the declared stage: ' + stage + '. ' +
  'The absence of colour and of production polish is INTENTIONAL at this stage: never flag ' +
  '"needs colour", "looks low fidelity" or "add real imagery". Judge only what the stage is ' +
  'responsible for. Read each PNG with the Read tool. Be precise and conservative. ' +
  'Return findings (empty array if clean); source = the PNG path.'

const VISUAL = STAGE_NOTE +
  '\n\nJudge: element alignment; clipped or overflowing text and shapes; inconsistent padding ' +
  'and margins; vertical rhythm; status bar present at top; bottom safe area (room for tab bar / ' +
  'home indicator); button width consistency; centring; anything that looks broken or unintended.'

const INVARIANTS = STAGE_NOTE +
  '\n\nCheck these INVARIANTS. Each has a known false-positive trap — respect it:\n' +
  '1. Every screen frame is exactly the device height; overflow means "there is scrolling here", ' +
  'not "the frame grew". A frame taller than the device draws pinned chrome where it cannot exist.\n' +
  '2. A modal sheet reaches the bottom edge of the frame; the home indicator sits OVER the sheet, ' +
  'not as a strip of page background beneath it.\n' +
  '3. A destructive button and a primary button never appear on the same screen. ' +
  '(In greyscale, destructiveness is not visually expressible — the carrier is colour. The ' +
  'invariant replaces the missing signal: on a confirmation screen the single filled button IS ' +
  'the destructive one, and the label says what it does.)\n' +
  '4. Button weight decreases top to bottom — ONLY inside a VERTICAL stack. In a horizontal pair ' +
  'iOS puts the main action on the RIGHT, so secondary-then-primary left to right is correct. ' +
  'Group buttons by their parent container and only check order for vertical layouts. ' +
  'Flagging a horizontal pair is a FALSE POSITIVE.\n' +
  '5. Touch targets are at least 44 x 44.\n' +
  '6. One base corner radius across the file.\n' +
  '7. A row separator starts at the text column, not at the card edge.\n' +
  '8. A chevron appears only where navigation goes deeper in the hierarchy — not on a row that ' +
  'opens a system sheet, a picker or the camera.\n' +
  '9. One icon family per card (all outline or all filled).'

const PLATFORM = STAGE_NOTE +
  '\n\nCheck PLATFORM CORRECTNESS — things that do not exist in iOS:\n' +
  '- an external label above a form field (that is a web pattern; a field is a grouped-list row);\n' +
  '- all-caps group headers (iOS uses sentence case in grouped lists);\n' +
  '- an outlined primary/secondary CTA (the Apple kit has no outlined CTA in any set; ' +
  'the secondary button is a neutral fill);\n' +
  '- a hand-drawn camera where the system document scanner would be used;\n' +
  '- an alert drawn to pre-26 iOS specs (centred text, full-width buttons).\n' +
  'Also check that symbols mean what they mean in SF Symbols, and that a dashed border is used ' +
  'only for "an image goes here", never for a button.'

const CROSS = STAGE_NOTE +
  '\n\nCheck CROSS-SCREEN CONSISTENCY: header patterns (back chevron vs close for modals); ' +
  'tab bar present and consistent on root screens with the active tab indicated; terminology and ' +
  'number/currency formatting consistent across screens; every declared state (loading, empty, ' +
  'error, edge) has a screen, and every screen has a way out. ' +
  'A silent action — a button that leads to no visible result — is a finding.'

const groups = []
for (let i = 0; i < screens.length; i += groupSize) {
  groups.push(screens.slice(i, i + groupSize))
}

phase('Review')

const thunks = []
groups.forEach((files, i) => {
  const list = files.map((f) => '- ' + png(f)).join('\n')
  thunks.push(() =>
    agent(VISUAL + '\n\nReview these screens:\n' + list, {
      label: 'visual:' + (i + 1),
      phase: 'Review',
      schema: FINDINGS,
    })
  )
})

const allList = screens.map((f) => '- ' + png(f)).join('\n')
thunks.push(() =>
  agent(INVARIANTS + '\n\nScreens:\n' + allList, { label: 'invariants', phase: 'Review', schema: FINDINGS })
)
thunks.push(() =>
  agent(PLATFORM + '\n\nScreens:\n' + allList, { label: 'platform', phase: 'Review', schema: FINDINGS })
)

const docList = docs.length ? '\n\nSource documents to read first:\n' + docs.map((d) => '- ' + d).join('\n') : ''
thunks.push(() =>
  agent(CROSS + docList + '\n\nScreens:\n' + allList, { label: 'cross-screen', phase: 'Review', schema: FINDINGS })
)

if (docs.length) {
  const contentPrompt = STAGE_NOTE +
    '\n\nCheck CONTENT against the product\'s own source documents. Read them first:\n' +
    docs.map((d) => '- ' + d).join('\n') +
    '\n\nThen read the screens below and flag: any claim on a screen that the source documents ' +
    'do not support; any label that states a conclusion the underlying data cannot prove ' +
    '(a qualification presented as an observed fact is a design defect, not a copy nit); ' +
    'any fact repeated in more than one layer of the same screen — a finding belongs in one ' +
    'layer only (finding / evidence / consequence), and a layer with nothing of its own should ' +
    'disappear rather than restate a neighbour.\n\nScreens:\n' + allList
  thunks.push(() => agent(contentPrompt, { label: 'content', phase: 'Review', schema: FINDINGS }))
}

const reviews = (await parallel(thunks)).filter(Boolean)
const allFindings = reviews.flatMap((r) => (r && r.findings ? r.findings : []))
log('Collected ' + allFindings.length + ' raw findings, verifying')

phase('Verify')
const verifyThunks = allFindings.map((f) => () => {
  const p =
    'Adversarially verify this wireframe audit finding. Re-open the source and check carefully; ' +
    'DEFAULT to real=false unless confirmed. The declared stage is ' + stage + ' — the absence of ' +
    'colour and production polish is intentional and never a finding. Before confirming, ask ' +
    'whether the rule being applied is a rule (sources agree) or taste (sources diverge); ' +
    'taste is not a finding.\n\n' +
    'Finding: screen=' + f.screen + '; area=' + f.area + '; issue=' + f.issue +
    '; claimed severity=' + f.severity + '.\nSource to re-check: ' + f.source + '\n\n' +
    'Return real (a genuine fixable problem?), corrected severity (or not-an-issue), and a one-line note.'
  return agent(p, { label: 'verify:' + f.screen, phase: 'Verify', schema: VERDICT }).then((v) =>
    Object.assign({}, f, { verdict: v })
  )
})
const verified = (await parallel(verifyThunks)).filter(Boolean)
const confirmed = verified.filter((f) => f.verdict && f.verdict.real && f.verdict.severity !== 'not-an-issue')
log(confirmed.length + '/' + verified.length + ' findings confirmed')

phase('Synthesis')
const payload = JSON.stringify(
  confirmed.map((f) => ({
    screen: f.screen,
    area: f.area,
    issue: f.issue,
    severity: f.verdict.severity,
    note: f.verdict.note,
  })),
  null,
  2
)
const synthPrompt =
  'You are the synthesis lead for an iOS wireframe audit. Confirmed findings (after adversarial ' +
  'verification) as JSON:\n' + payload +
  '\n\nDedupe near-identical findings, group by severity, and write a crisp prioritized fix list. ' +
  'Each item: "Screen - concrete issue -> suggested fix". Put cheap high-visibility fixes first — ' +
  'silent actions and clipped content before subtle spacing. Also write one short paragraph on ' +
  'what is correct and should NOT be touched. Be honest and concise: if a whole dimension came ' +
  'back clean, say so.'
const report = await agent(synthPrompt, { label: 'synthesis', phase: 'Synthesis', schema: REPORT })

return { screens: screens.length, rawCount: allFindings.length, confirmedCount: confirmed.length, report }
```

- [ ] **Step 4: Запустить проверку и убедиться, что проходит**

Run: команду из шага 1.
Expected: `синтаксис ок` и `специфики нет`. Grep не должен найти ни одного совпадения.

- [ ] **Step 5: Проверить, что `meta` — чистый литерал**

Workflow требует, чтобы `meta` не содержал переменных, вызовов и интерполяции. ⚠ Grep по символам `+` и `(` для этого не годится: он ловит их **внутри строковых литералов** (`'visual groups + invariants'`) и даёт ложное срабатывание на корректном коде. Настоящее требование — что блок ни на что не ссылается, а это проверяется вычислением его в пустой области видимости:

```bash
F=~/.claude/skills/ios-wireframes/assets/audit-workflow.mjs
T=$(mktemp -d)
awk '/^export const meta/,/^}$/' "$F" | sed 's/^export //' > "$T/meta.mjs"
echo 'console.log(JSON.stringify(meta))' >> "$T/meta.mjs"
node "$T/meta.mjs" >/dev/null 2>&1 && echo "meta — чистый литерал ок" || { echo "META НЕ ЛИТЕРАЛ:"; node "$T/meta.mjs"; }
rm -rf "$T"
```

Expected: `meta — чистый литерал ок`. Если блок ссылается на переменную или зовёт функцию — node упадёт с `ReferenceError`, и это настоящий провал, а не артефакт проверки.

- [ ] **Step 6: Дописать в `SKILL.md` абзац о запуске**

В `## Phase 5 — Acceptance`, после чеклиста:

> For sets larger than ~20 screens a by-eye pass degrades. `assets/audit-workflow.mjs` runs the same checks as a multi-agent pass — Review (visual groups, invariants, platform correctness, cross-screen, and content against source docs) → adversarial Verify → Synthesis. It needs `args: { pngDir, screens, docs, stage }`. **Offer it; never launch it without the user saying yes** — Workflow spends a lot of tokens and requires explicit opt-in.

- [ ] **Step 7: Проверить, что абзац на месте**

```bash
grep -q 'audit-workflow.mjs' ~/.claude/skills/ios-wireframes/SKILL.md && echo "ссылка на воркфлоу ок"
grep -q 'never launch it without' ~/.claude/skills/ios-wireframes/SKILL.md && echo "opt-in оговорка ок"
```

Expected: обе строки «ок».

---

### Task 5: Обратные кросс-ссылки в четырёх соседних скиллах

**Files:**
- Modify: `~/.claude/skills/wireframe-planner/SKILL.md` (секция `## When NOT to use this skill`, после строки 23)
- Modify: `~/.claude/skills/ux-flow-review/SKILL.md` (секция `## When NOT to use this skill`, после строки 23)
- Modify: `~/.claude/skills/figma-build/SKILL.md` (добавить строку в блок границ рядом с упоминанием `figma-to-frontend` / `apple-hig-review`)
- Modify: `~/.claude/skills/apple-hig-review/SKILL.md` (секция `## Related skills`, последний абзац)

**Interfaces:**
- Consumes: существующий `$SK/ios-wireframes/SKILL.md` из задачи 1.
- Produces: ничего для следующих задач; закрывает критерий приёмки «кросс-ссылки в обе стороны» из §11 спеки.

- [ ] **Step 1: Написать проверку обратных ссылок**

```bash
SK=~/.claude/skills
for s in wireframe-planner ux-flow-review figma-build apple-hig-review; do
  grep -q 'ios-wireframes' "$SK/$s/SKILL.md" && echo "ок: $s" || echo "НЕТ ССЫЛКИ: $s"
done
```

- [ ] **Step 2: Запустить и убедиться, что падает**

Run: команду из шага 1.
Expected: четыре строки «НЕТ ССЫЛКИ».

- [ ] **Step 3: Внести четыре правки**

`wireframe-planner` — добавить пунктом в `## When NOT to use this skill`:

```markdown
- The screens are for an iPhone app and the question is the artefact itself — canvas, safe areas, scroll behaviour, platform blanks, fidelity stage → use `ios-wireframes`; it calls this skill for the inventory and owns the iOS-specific craft.
```

`ux-flow-review` — добавить пунктом в `## When NOT to use this skill`:

```markdown
- The flow is fine and the question is how the iPhone wireframe itself is drawn → use `ios-wireframes`; it delegates the scenario-gap pass back to this skill.
```

`figma-build` — добавить строкой в блок, где перечислены смежные скиллы:

```markdown
Deciding *what* to draw on an iPhone screen — canvas, safe areas, device-height frames, platform blanks, fidelity stage — belongs to `ios-wireframes`, which calls this skill for the assembly itself.
```

`apple-hig-review` — дописать в конец абзаца `## Related skills`:

```markdown
For the stage before this one — while the iPhone screens are still being drawn as wireframes — use `ios-wireframes`; this skill takes over once the UI is built.
```

- [ ] **Step 4: Запустить проверку и убедиться, что проходит**

Run: команду из шага 1.
Expected: четыре строки «ок».

- [ ] **Step 5: Убедиться, что ничего не сломано в соседях**

```bash
bash ~/.claude/skills/check-skills-indexed.sh
SK=~/.claude/skills
for s in wireframe-planner ux-flow-review figma-build apple-hig-review ios-wireframes; do
  head -1 "$SK/$s/SKILL.md" | grep -qx -- '---' || echo "СЛОМАН FRONTMATTER: $s"
done
echo "frontmatter всех пяти проверен"
```

Expected: `OK: every skill indexed`, ни одной строки «СЛОМАН».

---

### Task 6: Финальная приёмка по критериям спеки

**Files:**
- Modify: `docs/superpowers/plans/2026-08-11-ios-wireframes-skill.md` (отметить чекбоксы)

**Interfaces:**
- Consumes: результаты задач 1–5.
- Produces: отчёт о соответствии §11 спеки.

- [ ] **Step 1: Прогнать все проверки разом**

```bash
SK=~/.claude/skills
echo "--- 1. индекс ---"; bash "$SK/check-skills-indexed.sh"
echo "--- 2. структура файлов ---"
for f in SKILL.md reference/canvas-and-metrics.md reference/craft-canon.md assets/audit-workflow.mjs; do
  [ -s "$SK/ios-wireframes/$f" ] && echo "есть: $f" || echo "НЕТ ИЛИ ПУСТ: $f"
done
echo "--- 3. происхождение чисел ---"
awk '/^\|/ && /[0-9]/ && !/^\|[- :|]*\|$/ && !/\[кит\]|\[замер\]|\[выведено\]|\[номинал\]/ { n++ } END { print (n>0 ? "НЕПОМЕЧЕННЫХ: " n : "все числа помечены") }' \
  "$SK/ios-wireframes/reference/canvas-and-metrics.md"
echo "--- 4. воркфлоу ---"
T=$(mktemp -d)
{ echo 'async function __wf(){'; sed 's/^export const meta/const meta/' "$SK/ios-wireframes/assets/audit-workflow.mjs"; echo '}'; } > "$T/wrapped.mjs"
node --check "$T/wrapped.mjs" && echo "парсится"
awk '/^export const meta/,/^}$/' "$SK/ios-wireframes/assets/audit-workflow.mjs" | sed 's/^export //' > "$T/meta.mjs"
echo 'console.log(JSON.stringify(meta))' >> "$T/meta.mjs"
node "$T/meta.mjs" >/dev/null 2>&1 && echo "meta литерал ок" || echo "META НЕ ЛИТЕРАЛ"
rm -rf "$T"
echo "--- 4b. переносимость всего скилла ---"
grep -rniE 'decode|elenauvarova|/Users/|git projects|research/3[0-9]|design/wireframes' "$SK/ios-wireframes/" \
  && echo "ЕСТЬ ПРИВЯЗКА К ПРОЕКТУ" || echo "скилл переносим"
echo "--- 5. обратные ссылки ---"
for s in wireframe-planner ux-flow-review figma-build apple-hig-review; do
  grep -q 'ios-wireframes' "$SK/$s/SKILL.md" && echo "ок: $s" || echo "НЕТ: $s"
done
```

Expected: `OK: every skill indexed` · четыре «есть» · «все числа помечены» · «парсится» + «скилл переносим» · четыре «ок».

- [ ] **Step 2: Проверить срабатывание скилла вживую**

В новой сессии Claude Code написать: `нарисуй вайры под айфон для экрана настроек`.
Expected: поднимается `ios-wireframes`. Если не поднимается — расширить `description` в frontmatter недостающей формулировкой и повторить.

- [ ] **Step 3: Сверить с §11 спеки**

Открыть [`docs/superpowers/specs/2026-08-09-ios-wireframes-skill-design.md`](../specs/2026-08-09-ios-wireframes-skill-design.md) §11 и отметить все восемь критериев. Любой неотмеченный — вернуться в соответствующую задачу.

- [ ] **Step 4: Закоммитить план с отметками**

```bash
cd "/Users/elenauvarova/git projects/decode"
git add docs/superpowers/plans/2026-08-11-ios-wireframes-skill.md
git commit -m "docs(plan): ios-wireframes — план выполнен, критерии приёмки закрыты"
```

---

## Заметки для исполнителя

- **Скилл лежит вне git.** `~/.claude/skills/` не под контролем версий, поэтому «коммит» после каждой задачи невозможен — роль коммита играет прогон проверок. Если нужна откатываемость, перед задачей 1 сделать `cp -R ~/.claude/skills/_INDEX.md /tmp/_INDEX.md.bak`.
- **Три файла из четырёх — проза.** «Тест» для прозы это структурная проверка (разделы на месте, теги происхождения проставлены, раздел не выродился в заголовок). Это не формальность: именно потеря пометок происхождения и схлопывание метода в список из четырёх слов — те два способа, которыми этот скилл может незаметно обесцениться.
- **Не переписывать спеку по ходу.** Если при написании обнаружится, что правило из §7 спеки неверно или неполно — остановиться и сказать об этом, а не чинить молча: спека утверждена и служит источником истины для будущих правок.
