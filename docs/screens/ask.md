# Экран-контракт: Ask (QA + QA-src + QA-sign)

**Route:** `(app)/result/:docId/ask` (sheet) · **Flow:** [F3](../ux/jtbd-to-flows.md#f3) · **Шаг loop:** Decide · **Job:** J4 (+ J5 как под-ветка)
**Персоны:** все; Callum (debt-distress → signpost, граница) · **Доступ:** автор документа
**Sitemap:** [QA / QA-src / QA-sign](../ux/screen-sitemap.md#группа-d--decide--ask) · **Pre-mortem:** PM5 (detect-and-signpost)
**Инварианты:** чат **скоуплен на документ** (не general assistant, модель NotebookLM); честное «not specified» вместо галлюцинации; на «what should I do?» → options + signpost, НЕ совет (FCA, [research/09b](../../research/09b-fca-boundary-verified.md)); citations детерминированные (span/bbox), не генеративные.

---

## Логика

### Данные
- `qa_session`: `doc_id`, `messages[]` (`role`, `text`, `citations[]`, `intent_class`).
- `citation`: `{ page, section_ref («p.2 §4»), span/bbox }` — детерминированная привязка к документу.
- `suggested_chips[]`: 3 чипа из найденных trap-флагов (seed-вопросы сегмента).
- `intent_class` каждого вопроса: `info_request` | `recommendation_request` | `debt_distress` — классификатор (PM5).

### Состояния
- **default:** sheet с 3 чипами-подсказками, поле ввода.
- **streaming:** ответ стримится (SSE), citation-чипы появляются по мере.
- **not-specified:** честное «This isn't specified in your agreement» (фича доверия).
- **debt-distress (QA-sign):** intent=`debt_distress` → НЕ ответ-совет, а signpost-карточка.
- **error:** AI/сеть fail → retry; не выдавать пустой/выдуманный ответ.
- **empty:** первый вход — только чипы (это и есть «пустое» осмысленное состояние).

### Действия
**QA:**
- Tap чип / ввод вопроса → отправка.
- `info_request` → plain-English ответ + двухуровневая citation «p.2 §4» → tap → **QA-src**.
- `recommendation_request` («should I pay off early?», «which debt first?», «switch to X?») → НЕ прямой ответ; шаблон: generic options + «the choice is yours» + signpost MoneyHelper/StepChange (FCA-граница: post-signature рекомендация = debt counselling, [research/09b](../../research/09b-fca-boundary-verified.md)).
- `debt_distress` («can I ignore the collector?», «I can't pay») → **QA-sign**.
- **J5 под-ветка** («как отменить/выйти?») → канал + дедлайн отказа ИЗ документа как ФАКТ («Cancel by calling X before 14 Nov [source]»), не совет.

**QA-src:** подсветка фрагмента в документе (zoom + highlight) + `PageRef`; `[back]` к чату.

**QA-sign (PM5):** `SignpostCard` — StepChange / MoneyHelper (внешние ссылки) + «the choice is yours» + «free help is available». Без ответа-совета. Это и UX-, и комплаенс-требование.

### Инварианты вывода (промпт + output-фильтр)
- Запрещённые паттерны в выводе LLM И в UI: «you should», «we recommend», «don't sign», «switch to», «best/worst deal».
- Verbalized uncertainty («I think… — double-check the highlighted line»), НЕ проценты.
- Каждый фактический ответ имеет citation ИЛИ честное «not specified».
- intent-классификатор — двойной гейт (на входе вопроса и на выходе ответа).

### Связи
QA ← [decode-result](decode-result.md) (`[Ask]` или long-press term). QA-src ↔ документ. QA-sign → внешние (StepChange/MoneyHelper).

---

## Визуал

**Референсы:** ElevenReader (Q&A-шторка с именем документа), ChatGPT/Gemini (citations/Evidence), Grok (follow-up чипы) ([research/14](../../research/14-mobbin-ai-explanation.md)).

### Layout Mobile (основной)
- **QA sheet:** bottom-sheet, выезжает поверх документа/result; в шапке — имя оффера (скоуп виден); grabber сверху.
- Сообщения: пузырьки чат-стиля; ответ AI с `AI`-тегом; citation как inline-чип «p.2 §4» под релевантной фразой.
- 3 `SuggestChip` над полем ввода при пустом состоянии: «Will this affect my credit score?» · «What if I miss a payment?» · «Can they take money if I cancel my card?».
- Поле ввода снизу (над safe-area), с правильным `inputmode`, не перекрывается клавиатурой (клавиатура поднимает поле).

### QA-src
- Bottom-sheet поверх QA: zoom исходной страницы + подсвеченный span; `PageRef` («Page 2, section 4»); кнопка back.

### QA-sign
- `SignpostCard`: иконка-«помощь» (не тревожная) + текст «If you're worried about debt, free, confidential help is available» + кнопки StepChange / MoneyHelper + строка «The choice is yours». Спокойный регистр, без алармизма.

### Компоненты → UI-кит
Доменные: `QAMessage`, `CitationChip`, `SuggestChip`, `SignpostCard`, `DocViewerHighlight`. Базовые: `Sheet`, `Input`, `Button`, `Chip`.

### Edge cases (визуально)
- Очень длинный ответ AI → скроллится в пузыре, не ломает sheet; citation-чип остаётся кликабелен.
- Вопрос не по документу → «This isn't specified in your agreement» как обычный, не ошибочный, регистр.
- Несколько citations в одном ответе → чипы wrap-ом, не уезжают за край.
- Длинный `section_ref` («Schedule 2, clause 4.3.1(b)») → не распирает чип, truncate с полным по tap.
- Клавиатура открыта + длинная история → поле ввода и последнее сообщение видны.
- debt-distress ложно-сработал на info-вопрос → пользователь может «Ask anyway / I just want to understand» (не запирать в signpost, но не давать совет).

### Открытые вопросы / TODO
- TODO(юрист): формулировки options-шаблона и signpost — где точно проходит грань information/advice ([research/09b](../../research/09b-fca-boundary-verified.md) §остаточная неопределённость).
- TODO: для фото-пути citations работают через подсветку поверх транскрипции (не нативные PDF-citations) — заложить разницу в QA-src ([research/06](../../research/06-tech-claude-vision-extraction.md)).
- TODO: red-team intent-классификатора на кейсе Callum (ложные срабатывания в обе стороны).
- TODO: лимит Q&A-тёрнов на free-тире (unlimited Q&A — кандидат за пейволл, F8).
