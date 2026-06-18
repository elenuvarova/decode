# 23 · AI extraction + eval-методология для Decode

**Трек:** ai-eval (AI-PM course) · **Дата ресёрча:** 18 июня 2026 · **Первоисточник:** официальная документация platform.claude.com (проверена live на 2026-06-18), Anthropic claude-api skill, arXiv, PyMuPDF docs.

> Этот документ — углублённый успешник к [`06-tech-claude-vision-extraction.md`](06-tech-claude-vision-extraction.md) (модели/токены/цены). Здесь — **архитектура structured output для извлечения полей, дизайн eval-сета, citation-привязка span/bbox, guards против числовых галлюцинаций и двухвызовная архитектура**. Где 06 устанавливал «что умеет платформа», 23 отвечает «как это спроектировать и как мерить, что оно работает».

---

## TL;DR — пять выводов для билда

1. **Двухвызовная архитектура подтверждена и актуальна на 2026-06-18.** Citations и Structured Outputs **нельзя** комбинировать в одном запросе — API возвращает **400** (официальное предупреждение в [Citations docs](https://platform.claude.com/docs/en/build-with-claude/citations), проверено live). Поэтому: **Вызов A** — extraction через `output_config.format` (детерминированный JSON), **Вызов B** — Q&A через `citations: {enabled: true}`. Это не временный workaround, а архитектурное ограничение по дизайну (citations чередуют citation-блоки с текстом, что несовместимо с grammar-constrained JSON).
2. **Structured Outputs теперь GA** (не beta) на Opus 4.8/4.7/4.6/4.5, Sonnet 4.6/4.5, Haiku 4.5, Fable 5 — старый `output_format` + header `structured-outputs-2025-11-13` депрекейтнуты, новый shape — `output_config.format`. Грамматика гарантирует валидный JSON, но **числовые/строковые ограничения схемы (`minimum`/`maximum`/`minLength`) НЕ поддерживаются** — диапазонную валидацию (APR 0–199%, дата в будущем) делаем на бэкенде поверх ответа.
3. **Числа — отдельная метрика и отдельный guard.** Field-level F1 по всем полям маскирует то, что важнее всего: точность чисел и денежных единиц (по бенчмарку FinCriticalED — самый хрупкий тип факта). Eval-сет должен мерить **числовую точность отдельно** (exact-match по нормализованному значению), а архитектура — извлекать числа как **verbatim-строки с self-reported confidence**, а считать true cost детерминированным движком, а не моделью.
4. **Honest refusal встроен в схему, а не только в промпт.** Каждое поле возвращается с `value`, `verbatim`, `confidence`, `not_found`. «Не нашёл/не уверен» — это валидное штатное состояние (`not_found: true`, `confidence: "low"`), а не пустая строка. Это прямое попадание в pre-mortem-требования UX-фазы и в FCA-границу (не выдумывать цифры = не давать ложный «совет»).
5. **Citation-привязка различается по пути ввода.** PDF с текстовым слоем → нативные citations (page_location, 1-indexed) + PyMuPDF `search_for()` по `cited_text` → точный bbox для подсветки. Фото/скан без текстового слоя → image citations **не поддерживаются**; путь: транскрипция → Q&A по транскрипции как `plain text document` → `char_location` (символьные диапазоны) → подсветка поверх **транскрипции**, не поверх фото.

---

## 1. Архитектура structured output: схема извлечения полей

### 1.1 Механизм: `output_config.format` (GA)

Источник: [Structured outputs docs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs), проверено live 2026-06-18.

Два механизма, для Decode-extraction нужен первый:

- **JSON outputs** — `output_config.format` с `{"type": "json_schema", "schema": {...}}`. Constrained sampling: грамматика компилируется из схемы и **ограничивает генерацию токенов на уровне инференса** — ответ гарантированно валидный JSON по схеме, без `JSON.parse`-ретраев. В Python SDK — `client.messages.parse()` с Pydantic-моделью; `response.parsed_output` уже типизирован.
- **Strict tool use** — `strict: true` на tool-схеме, гарантированные аргументы инструментов. Для Decode избыточно (extraction проще как JSON output, не как tool-calling).

Статус: **GA**, не beta. Старый `output_format` + `anthropic-beta: structured-outputs-2025-11-13` работают в переходный период, но депрекейтнуты — пишем новый код на `output_config.format`.

### 1.2 Что важно знать о грамматике и кэше

- **Первая компиляция схемы добавляет 100–300 мс latency**; скомпилированная грамматика **кэшируется 24 часа** от последнего использования. Изменение `description`-полей кэш НЕ сбрасывает; изменение **структуры схемы или набора strict-tools** — сбрасывает. → Держать схему extraction-вызова стабильной (версионировать намеренно, см. §3.6).
- Изменение `output_config.format` **инвалидирует prompt cache** для треда — поэтому extraction-вызов и Q&A-вызов и так логически разделены (разные конфиги, разный кэш).
- Лимиты сложности на запрос: **≤20 strict-tools, ≤24 optional-параметра, ≤16 union (`anyOf`)-параметров**; timeout компиляции 180 с; ошибка «Schema is too complex for compilation» — превышены внутренние лимиты размера грамматики. Схема Decode (десятки полей, плоская) — глубоко в пределах.
- **Property ordering:** required-поля идут первыми, optional — после. Если порядок важен для парсинга — либо всё required, либо парсить по имени, не по позиции.

### 1.3 Ограничения схемы — что НЕ поддерживается (критично для дизайна)

Источник: [Structured outputs docs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs), live.

| НЕ поддерживается | Последствие для Decode |
|---|---|
| Числовые ограничения `minimum`/`maximum`/`multipleOf` | Диапазон APR (0–199%), сумма ≥ 0 — **валидировать на бэкенде**, не в схеме |
| Строковые `minLength`/`maxLength` | Длину verbatim-полей не ограничить схемой |
| `additionalProperties` ≠ `false` | Обязан быть `false` на каждом object |
| Рекурсивные схемы | Вложенность traps делать плоским массивом, не деревом |
| Сложные типы в `enum` | enum только из примитивов (строки/числа/bool/null) |
| Регекс: backreferences, lookahead/lookbehind, `\b`, сложные `{n,m}` | Формат-валидацию (UK postcode и т.п.) — на бэкенде |
| Массив `minItems` только 0 или 1 | «минимум 2 ставки» не выразить схемой |

**Архитектурный вывод:** схема Structured Outputs гарантирует только *структурную* валидность (типы, обязательность, enum). **Семантическая валидация (диапазоны, форматы, кросс-полевые инварианты) — отдельный детерминированный слой на бэкенде поверх parsed JSON.** Это не баг, а правильная граница ответственности (та же, что «LLM извлекает, движок считает»).

### 1.4 Предлагаемая схема извлечения для Decode

Принципы дизайна схемы:
- **Каждое decision-critical поле — объект, а не скаляр.** Минимальный конверт поля: `{ value, verbatim, confidence, not_found }`.
  - `value` — нормализованное машинное значение (число/строка/дата ISO) для движка true-cost.
  - `verbatim` — точная строка как в документе («£249.99», «24.9% APR»), для верификации и подсветки (см. §1.5).
  - `confidence` — `enum: ["high","medium","low"]`, self-reported моделью (API confidence не возвращает).
  - `not_found` — `boolean`; `true` = поля в документе нет (штатное состояние, не ошибка). См. §4.
- **Числа извлекаем как verbatim-строку, парсим на бэкенде.** Не просим модель посчитать; не доверяем `value` без проверки против `verbatim`.
- **Traps — плоский массив объектов** (рекурсия запрещена схемой): `type` (enum из trap-таксономии из [`10b-trap-tc-corpus.md`](10b-trap-tc-corpus.md)), `verbatim` (точная цитата условия), `plain_english` (объяснение), `severity` (enum), `confidence`.

Эскиз (сокращённо; полная — в билд-спеке):

```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "doc_type": { "enum": ["bnpl_offer","loan_agreement","credit_card_tc","subscription","other"] },
    "provider_name": { "$ref": "#/$defs/field_string" },
    "total_amount":   { "$ref": "#/$defs/field_money" },
    "apr":            { "$ref": "#/$defs/field_percent" },
    "num_instalments":{ "$ref": "#/$defs/field_int" },
    "instalment_amount": { "$ref": "#/$defs/field_money" },
    "first_payment_date":{ "$ref": "#/$defs/field_date" },
    "late_fee":       { "$ref": "#/$defs/field_money" },
    "traps": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "type": { "enum": ["deferred_interest","auto_renew","late_fee_escalation","balloon_payment","hidden_apr","autopay_required","credit_report_impact","other"] },
          "verbatim": { "type": "string" },
          "plain_english": { "type": "string" },
          "severity": { "enum": ["info","caution","warning"] },
          "confidence": { "enum": ["high","medium","low"] }
        },
        "required": ["type","verbatim","plain_english","severity","confidence"]
      }
    },
    "summary_plain_english": { "type": "string" }
  },
  "required": ["doc_type","provider_name","total_amount","apr","summary_plain_english","traps"],
  "$defs": {
    "field_money":   { "type":"object","additionalProperties":false,"properties":{"value":{"type":["number","null"]},"currency":{"enum":["GBP","EUR","USD","other",null]},"verbatim":{"type":["string","null"]},"confidence":{"enum":["high","medium","low"]},"not_found":{"type":"boolean"}},"required":["value","verbatim","confidence","not_found"] },
    "field_percent": { "type":"object","additionalProperties":false,"properties":{"value":{"type":["number","null"]},"verbatim":{"type":["string","null"]},"confidence":{"enum":["high","medium","low"]},"not_found":{"type":"boolean"}},"required":["value","verbatim","confidence","not_found"] },
    "field_date":    { "type":"object","additionalProperties":false,"properties":{"value":{"type":["string","null"],"format":"date"},"verbatim":{"type":["string","null"]},"confidence":{"enum":["high","medium","low"]},"not_found":{"type":"boolean"}},"required":["value","verbatim","confidence","not_found"] },
    "field_string":  { "type":"object","additionalProperties":false,"properties":{"value":{"type":["string","null"]},"verbatim":{"type":["string","null"]},"confidence":{"enum":["high","medium","low"]},"not_found":{"type":"boolean"}},"required":["value","verbatim","confidence","not_found"] },
    "field_int":     { "type":"object","additionalProperties":false,"properties":{"value":{"type":["integer","null"]},"verbatim":{"type":["string","null"]},"confidence":{"enum":["high","medium","low"]},"not_found":{"type":"boolean"}},"required":["value","verbatim","confidence","not_found"] }
  }
}
```

> `format: "date"` — единственный поддерживаемый строковый формат, который можно оставить в схеме (поддерживаются `date-time/time/date/duration/email/hostname/uri/ipv4/ipv6/uuid`). `["number","null"]` union считается в лимит 16 union-параметров — у нас их ~6, в пределах.

### 1.5 Как маркировать verbatim + confidence

- **`verbatim` — это якорь для трёх вещей сразу:** (1) human-verifiable provenance в UI («мы прочитали именно это»), (2) string-match для citation-подсветки на фото-пути (§5.2), (3) cross-check движка: `value` принимается, только если парсинг `verbatim` даёт то же число (catch для row-misalignment и десятичных сдвигов).
- **`confidence` — self-reported, не калибрована.** API не возвращает logprobs/confidence по полям; модель оценивает себя. Используем как **сигнал для UX-градации** (low → показать «проверьте это значение» + предложить ручной ввод), не как вероятность. Калибровка проверяется на eval-сете (§3.5): если при `confidence:"high"` числовая точность <95% — промпт переусердствовал в уверенности.
- **Числа всегда сопровождаются `verbatim`.** Запрет в системном промпте: «Никогда не вычисляй и не округляй значения. Извлекай ровно как написано в `verbatim`. Если значения нет — `not_found: true`, не угадывай.»

---

## 2. Двухвызовная архитектура (extraction ⊥ citations) — подтверждение актуальности

Источник: [Citations docs → Feature compatibility](https://platform.claude.com/docs/en/build-with-claude/citations), проверено live 2026-06-18. Дословное предупреждение в доках:

> **Citations and Structured Outputs are incompatible.** Citations cannot be used together with Structured Outputs. If you enable citations on any user-provided document (Document blocks or RequestSearchResultBlock) and also include the `output_config.format` parameter (or the deprecated `output_format` parameter), the API will return a 400 error. This is because citations require interleaving citation blocks with text output, which is incompatible with the strict JSON schema constraints of structured outputs.

**→ Это не временно. Ограничение по дизайну, и на 2026-06-18 оно действует.** Архитектура Decode из этого:

| Вызов | Цель | Конфиг | Результат |
|---|---|---|---|
| **A. Extraction** | Поля + traps + summary для true-cost engine и карточек | `output_config.format` (схема §1.4), citations **выключены** | Детерминированный JSON |
| **B. Q&A** | «Ask anything» с подсветкой источника | `citations: {enabled: true}` на document-блоке, `output_config` **отсутствует** | text-блоки + привязанные citations |

Дополнительные подтверждения паттерна (вторичные, для контекста): two-pass extraction рекомендуется и сообществом — сначала факты в natural language, затем строгий JSON ([renezander.com](https://renezander.com/blog/claude-api-structured-output/), [thomas-wiegold.com](https://thomas-wiegold.com/blog/claude-api-structured-output/)).

**Стоимость двух вызовов амортизируется prompt caching'ом:** document-блок кэшируется при extraction (вызов A, cache write 1.25x), Q&A-вызовы (B) читают тот же документ из кэша за 0.1x — при условии что мы не меняем `output_config` между ними (меняем — но это разные треды, см. §1.2; document-блок как cacheable-префикс переиспользуется). Практически: extraction и первый Q&A в одной сессии «скан → вопросы за пару минут» укладываются в 5-минутный TTL.

---

## 3. Eval-методология: golden set + field-level метрики + регрессионный гейт

### 3.1 Golden set: состав

- **30–50 UK-документов** (минимум; цель — 50, чтобы хватило на стратификацию). Каждый golden = `{input, expected}`: входной документ (PDF и/или фото одного и того же оффера) + эталонный JSON по схеме §1.4, размеченный руками.
- **Стратификация — обязательна**, иначе средние метрики обманывают. Оси:
  - **Тип ввода:** нативный PDF / фото с камеры / скан без текстового слоя (≥10 фото — там числовые галлюцинации концентрируются).
  - **Провайдер BNPL:** Klarna, Clearpay, PayPal Pay in 3, Zilch, и т.п. (разные layout'ы) — из сегмента S1.
  - **Тип документа:** BNPL-оффер / loan agreement / credit card T&C / subscription.
  - **Trap-наличие:** документы с известными ловушками (deferred interest, auto-renew) и чистые — чтобы мерить и precision, и recall на trap-детекции.
  - **Качество фото:** чистое / блик-на-сумме / перекос / низкий свет — целенаправленные «hard negatives» для honest-refusal (§4).
- Источник реальных trap-формулировок для разметки — [`10b-trap-tc-corpus.md`](10b-trap-tc-corpus.md); UK-граница того, что мы НЕ должны интерпретировать как совет — [`09b-fca-boundary-verified.md`](09b-fca-boundary-verified.md).

### 3.2 Метрики — field-level, с разделением по типу поля

Базовые формулы IE: `Precision = TP/(TP+FP)`, `Recall = TP/(TP+FN)`, `F1 = 2PR/(P+R)`; для дисбаланса классов — **macro-F1** (усреднение по полям/классам, не по примерам) ([обзор IE-метрик](https://medium.com/online-inference/evaluating-large-language-models-llms-9c45c7ead425), [DeepEval datasets](https://deepeval.com/docs/evaluation-datasets)).

Что есть TP/FP/FN на уровне поля:
- **TP** — поле извлечено и совпало с эталоном (по правилу матчинга для типа поля, §3.3).
- **FP** — поле извлечено, но значение неверно ИЛИ поле «выдумано» (в эталоне `not_found`, в выводе значение). **Выдуманное значение — худший FP, штрафуется отдельно (§3.4).**
- **FN** — поле есть в эталоне, но модель вернула `not_found` или пропустила.

### 3.3 Числа меряем ОТДЕЛЬНО и строже

Field-level F1 по всем полям сглаживает самое опасное. По [FinCriticalED](https://arxiv.org/abs/2511.14998) (fact-level OCR-бенчмарк по финдокументам, 9,481 факт) «numeric values and monetary units — наиболее уязвимые типы фактов», и высокая поверхностная точность их не гарантирует. Поэтому:

- **Отдельный метрик-срез: `numeric_exact_match`** — по нормализованному значению (валюта/разделители/десятичные приведены к канону), **exact match, без частичного кредита**. Для денег: decimal-нормализация перед сравнением ([VAREX](https://arxiv.org/pdf/2603.15118), [Invoice IE eval](https://arxiv.org/pdf/2510.15727) — «currency fields need decimal normalization»).
- **Tolerance window — осознанно, узко.** Для дат — допускаем формат-варианты (DD/MM/YYYY vs ISO) но не само значение; для сумм — толеранс 0 (£100.00 ≠ £1,000.00 — это разные деньги, а не «округление»).
- **Текстовые/строковые поля (provider name, plain-english) — relaxed match / ANLS.** ANLS (Average Normalized Levenshtein Similarity) даёт частичный кредит за near-match и отличает полный промах от OCR-варианта ([Invoice IE eval](https://arxiv.org/pdf/2510.15727)). Применять ТОЛЬКО к текстовым полям, НЕ к числам.

Сводка матчинга по типу поля:

| Тип поля | Правило матча | Метрика |
|---|---|---|
| Деньги, проценты, целые (instalments) | Нормализация → **exact**, толеранс 0 | `numeric_exact_match` (отдельный срез) |
| Даты | Нормализация формата → exact по значению | в числовом срезе |
| Provider name, plain-english summary | ANLS / fuzzy ≥ порог | field-F1 (текстовый срез) |
| `doc_type`, trap `type`, `severity` (enum) | exact | accuracy + macro-F1 по классам |
| Traps (наличие) | по типу+overlap verbatim | precision/recall/F1 на trap-детекции |

### 3.4 Hallucination rate — первоклассная метрика

Отдельно от F1 считаем **`hallucination_rate`** = доля полей, где эталон `not_found:true`, а модель вернула непустое `value`. Это самый дорогой класс ошибки для Decode (выдуманная цифра в финансовом контексте = регуляторный и доверительный риск). Источник риска подтверждён: VLM плохо распознают собственную неуверенность на деградированных входах и «дорисовывают» правдоподобное из языковых приоров вместо отказа ([«Seeing is Believing?», NeurIPS 2025](https://arxiv.org/abs/2506.20168)). Целевой порог — близко к нулю на «hard negatives» (блик-на-сумме и т.п.).

### 3.5 Confidence calibration check

Поскольку `confidence` self-reported, проверяем его полезность: на golden set считаем числовую точность **в разрезе заявленной confidence**. Здоровый профиль: `high` → ≥95% точность, `low` → существенно ниже (тогда low-флаг реально предупреждает). Если точность при `high` низкая — промпт навязал ложную уверенность, чинить промптом (см. §4).

### 3.6 Регрессионный гейт (CI)

Цель — ловить деградацию при смене промпта/модели/схемы, прежде чем доедет до прода.

- **Прогон golden-сета через Batch API** — −50% к стоимости input/output, до 100k запросов на батч, обычно <1 ч ([Batch docs](https://platform.claude.com/docs/en/build-with-claude/batch-processing)). Дёшево гонять 50 документов при каждом изменении.
- **Гейт = пороги по срезам, не одно число:**
  - `numeric_exact_match` ≥ baseline − 1pp (числа не имеют права просесть).
  - `hallucination_rate` ≤ baseline (и абсолютный потолок, напр. ≤2%).
  - macro-F1 по полям ≥ baseline − 2pp.
  - trap-recall ≥ baseline − 2pp (пропущенная ловушка = провал продуктового обещания).
- **Что гейтить:** изменение системного промпта, схемы (грамматика рекомпилируется → 24h cache сбрасывается), модели (Haiku-cost-down vs Sonnet), few-shot примеров.
- **Goldens переживают версии.** Golden = `{input, expected}` как «pending test case», переисполняемый на новых версиях модели/промпта — чистое regression-сравнение ([DeepEval](https://deepeval.com/docs/evaluation-datasets)).
- **LLM-as-judge — только для нечисловых полей** (качество plain-english summary, уместность trap-объяснения). Числа и enum судит детерминированный матчер, не модель (судья сам галлюцинирует на цифрах).

---

## 4. Guards против числовых галлюцинаций + honest refusal

Сводя официальные техники Anthropic ([Reduce hallucinations docs](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations), live) к архитектуре Decode:

1. **Разрешить «I don't know» явно — и закодировать это в схему.** Anthropic: «Allow Claude to say "I don't know" … can drastically reduce false information.» В Decode это `not_found:true` + `confidence:"low"` как штатные значения, а не пустая строка. Системный промпт: «Если значение не присутствует в документе явно — поставь `not_found:true` и `value:null`. Никогда не выводи правдоподобное значение по догадке.»
2. **Verbatim-grounding перед использованием.** Anthropic: «ask Claude to extract word-for-word quotes first.» У нас `verbatim` обязателен для каждого числового поля; движок true-cost принимает `value`, только если оно консистентно с `verbatim` (string→number parse совпадает) — иначе поле флагается на ручную проверку.
3. **External knowledge restriction.** «Only use information from provided documents and not its general knowledge.» Для BNPL критично: не подставлять «типичный APR Klarna 0%» из общих знаний, если в этом документе его нет.
4. **Chain-of-thought на числах.** Адаптивное thinking (`thinking:{type:"adaptive"}`) на extraction-вызове — модель reasoning'ом проверяет извлечение чисел перед финальным JSON; CoT улучшает извлечение числовых значений (подтверждено в практике извлечения чисел).
5. **Детерминированный движок считает, модель — извлекает.** Прямое следствие: арифметика LLM — слабое место (extraction ~90%+, расчёт поверх — заметно хуже; рекомендация «LLM extracts, deterministic system computes» — [Daloopa](https://daloopa.com/blog/analyst-best-practices/exploratory-financial-data-analysis-using-large-language-models), [arXiv 2511.10659](https://arxiv.org/html/2511.10659v2)). True cost Decode считает движок на бэкенде из extracted `value`, не модель.
6. **Honest-refusal как UX-контракт.** Low-confidence / not_found / inconsistent verbatim → UI показывает «не смогли уверенно прочитать X — проверьте/введите вручную», а не молчаливо подставляет 0. Это и FCA-безопасно (не выдаём выдуманную цифру за факт), и снимает доверительный риск из pre-mortem.

> Чек-лист типовых числовых ошибок vision-моделей для разметки «hard negatives» (из [`06`](06-tech-claude-vision-extraction.md) §9): `0/O`, `1/l/7`, `5/S`, `8/B`; сдвиг десятичной (£1,000 vs £100); перенос значения из соседней строки таблицы; UK vs US дата; APR vs monthly rate; «0% for 6 months, then 24.9%» — извлечение одной ставки из двух.

---

## 5. Citation-архитектура: привязка span/bbox по двум путям

Источник: [Citations docs](https://platform.claude.com/docs/en/build-with-claude/citations) + [PyMuPDF](https://pymupdf.readthedocs.io/en/latest/recipes-text.html), live.

Общее: citations включаются `citations:{enabled:true}` на document-блоке (всё или ничего — нельзя на части документов). Ответ — чередование text-блоков с привязанным массивом `citations`. `cited_text` (точная цитата) **не тарифицируется как output-токены** и при передаче назад в диалог — не как input-токены. По оценке Anthropic citations значимо точнее и надёжнее prompt-based цитирования (cited_text гарантированно указывает на реальный фрагмент). Поддерживают все активные модели **кроме Haiku 3**. Только **text citations** — image citations пока невозможны. В streaming — приходят как `citations_delta` на текущем text-блоке.

### 5.1 PDF-нативный путь (есть текстовый слой)

- Document-блок: `{"type":"document","source":{"type":"base64"|"url"|"file","media_type":"application/pdf",...},"citations":{"enabled":true}}`.
- Тип citation в ответе — **`page_location`**:
  ```json
  {"type":"page_location","cited_text":"...","document_index":0,"document_title":"...","start_page_number":1,"end_page_number":2}
  ```
  `start_page_number` 1-indexed, `end_page_number` **exclusive**.
- **Привязка к bbox для подсветки:** API даёт только номер страницы, не координаты. Для точной подсветки фрагмента — PyMuPDF на бэкенде: `page.search_for(cited_text)` возвращает **точный** bounding box (`Rect`/quads) этого текста в координатах страницы — «not an approximation: exact bounding box in unrotated page space» ([PyMuPDF grounding](https://pymupdf.io/blog/grounding-in-document-extraction)). Pattern: взять `cited_text` → `page = doc[start_page_number-1]` → `rects = page.search_for(cited_text)` → отрисовать оверлей по `rects` (или `page.add_highlight_annot(rects)` для аннотированного PDF). Координаты: origin (0,0) — top-left, y вниз.
- **Гранулярность.** PDF чанкуется по предложениям → можно цитировать предложение или цепочку. Если нужна более тонкая (буллеты, строки таблицы платежей) — заворачивать чанки в **custom content document** (`source.type:"content"` с массивом блоков); тогда citation — `content_block_location` (`start_block_index`/`end_block_index`, 0-indexed, exclusive), и подсветка идёт по нашему собственному блочному разбиению, а не по предложениям.

### 5.2 Фото-путь (нет текстового слоя)

- **Image citations не поддерживаются.** Фото-документ (image-блок) и сканы без текстового слоя нецитируемы напрямую — нет текста, на который указывать.
- Архитектура в два шага:
  1. **Транскрипция** фото моделью (vision) → полный текст документа (это уже часть extraction-вызова A — модель видит изображение).
  2. **Q&A по транскрипции как `plain text document`** с `citations:{enabled:true}`. Тип citation — **`char_location`**:
     ```json
     {"type":"char_location","cited_text":"...","document_index":0,"start_char_index":0,"end_char_index":50}
     ```
     `start_char_index` 0-indexed, `end_char_index` exclusive.
- **Подсветка идёт поверх ТРАНСКРИПЦИИ, а не поверх фото.** UI на фото-пути показывает читаемую транскрипцию и подсвечивает в ней символьный диапазон `[start_char_index, end_char_index)`. Связать обратно с пикселями фото можно только если на шаге транскрипции мы дополнительно сохранили bbox каждого токена (vision-модель их по дефолту не отдаёт надёжно) — это отдельная сложность; **дешёвый и честный MVP — подсветка по транскрипции**.
- Альтернативный якорь: `verbatim` из extraction-схемы (§1.4) служит ключом string-match для подсветки нужного поля в транскрипции даже вне Q&A-контекста.

### 5.3 Сводка привязки

| Путь | document type | citation type | индексация | подсветка |
|---|---|---|---|---|
| PDF с текстом | PDF | `page_location` | страницы 1-idx, end exclusive | PyMuPDF `search_for(cited_text)` → bbox поверх PDF |
| PDF, нужна тонкая гранулярность | custom content | `content_block_location` | блоки 0-idx | по нашим блокам |
| Фото / скан без текста | plain text (транскрипция) | `char_location` | символы 0-idx, end exclusive | по транскрипции, не по фото |

---

## 6. Совместимость фич — карта (на 2026-06-18)

| Комбинация | Статус | Источник |
|---|---|---|
| Structured Outputs + Citations | ❌ **400 error** (несовместимы by design) | [Citations docs](https://platform.claude.com/docs/en/build-with-claude/citations) |
| Citations + Prompt Caching | ✅ (кэшировать document-блок; citation-блоки сами не кэшируются) | Citations docs |
| Citations + Batch + Token counting | ✅ | Citations docs |
| Structured Outputs + Batch + streaming | ✅ | [Structured outputs docs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs) |
| Structured Outputs + max_tokens cutoff / refusal | ⚠️ вывод может НЕ соответствовать схеме (`stop_reason: max_tokens`/`refusal`) — проверять `stop_reason` до парсинга | Structured outputs docs |
| Citations: image citations | ❌ не поддерживаются (только text) | Citations docs |
| Citations: модели | все активные **кроме Haiku 3** | Citations docs |

---

## Key takeaways for Decode

**Дизайн / архитектура:**
- **Закрепить двухвызовную архитектуру в билде:** Вызов A (extraction, `output_config.format`, citations off) ⊥ Вызов B (Q&A, `citations:{enabled:true}`, без output_config). Комбинировать = 400. Это не обойти — проектировать сразу как два пути.
- **Схема извлечения — поля как объекты `{value, verbatim, confidence, not_found}`, не скаляры.** verbatim — якорь для provenance, подсветки и cross-check движка; not_found — штатное «не нашёл».
- **Семантическую валидацию (диапазоны APR, даты, неотрицательность сумм) делать на бэкенде** — схема Structured Outputs `minimum/maximum/minLength` не поддерживает, гарантирует только структуру.
- **True cost считает детерминированный движок из `value`, модель только извлекает.** Арифметика LLM — слабое место; это и архитектурный, и FCA-аргумент.

**Citation-привязка:**
- PDF с текстом → `page_location` + **PyMuPDF `search_for(cited_text)`** для точного bbox (координаты точные, не приблизительные). Фото/скан → транскрипция → `char_location` → подсветка **поверх транскрипции**, не поверх фото (image citations не существуют).
- Нужна тонкая гранулярность (буллеты, строки таблицы) → custom content document → `content_block_location`.

**Eval / гейт (трек ai-eval курса):**
- Golden set **30–50 UK-документов, стратифицированный** по типу ввода / провайдеру / типу документа / наличию trap / качеству фото; включить «hard negatives» (блик-на-сумме) для honest-refusal.
- **Числа меряем отдельной метрикой** (`numeric_exact_match`, нормализация + exact, толеранс 0); текст — ANLS/fuzzy; trap-детекцию — precision/recall/F1; `hallucination_rate` (выдуманное value при эталонном not_found) — первоклассная метрика с потолком ≤2%.
- **Регрессионный гейт через Batch API** (−50% стоимость) на каждое изменение промпта/модели/схемы; гейт = пороги по срезам (числа не имеют права просесть), не одно усреднённое F1. LLM-as-judge только для нечисловых полей.
- **Confidence-калибровка** проверяется на golden-сете (high → ≥95% числовой точности), иначе low-флаг бесполезен для UX.

**Guards:**
- Системный промпт: явное разрешение `not_found`, запрет вычислять/угадывать числа, external-knowledge restriction, verbatim-grounding, adaptive thinking для CoT-проверки чисел. Low-confidence/not_found → UX-контракт «проверьте вручную», не тихий 0.

**Cost / ops (из [06](06-tech-claude-vision-extraction.md), для полноты):**
- Sonnet 4.6 как основная (точность чисел продуктово-критична), Haiku 4.5 — cost-down только после прохождения eval-гейта. Держать схему extraction-вызова стабильной (24h grammar cache; смена структуры сбрасывает кэш и должна проходить регрессию).
