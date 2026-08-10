# Decode — конкурентная матрица

**Фаза:** Product analysis · **Дата:** 2026-08-02 · **Входы:** [defensibility.md](defensibility.md), [watch-architecture.md](../ux/watch-architecture.md), [research/33](../../research/33-scope-and-input-strategy.md), [research/references/competitors-by-logic.md](../../research/references/competitors-by-logic.md)

Сравнение Decode с классами конкурентов по осям, которые формируют ров. `✓` = сильно · `~` = частично/со звёздочкой · `✗` = нет.

## Матрица

| Класс продукта | Decode-глубина (объясняет fine-print на *этом* документе) | Детерм. true-cost (math в коде) | UK trap-база + credit-file YES/NO | Citations / провенанс | Watch / Renewal Radar | Без bank-link на входе | FCA-safe / безоценочный | Момент / низкое трение |
|---|---|---|---|---|---|---|---|---|
| **Decode** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Generic LLM** (ChatGPT, Claude, Grok, Gemini) | ✓ | ✗ (генеративный) | ✗ (generic/US-centric) | ~ (цитата в док) | ✗ (stateless) | ✓ | ✗ (даёт советы) | ~ (destination, промпт) |
| **Doc-AI / vault** (Fabric, Notion AI, Speechify) | ✓ | ✗ | ✗ | ~ | ~ (vault без фин-радара) | ✓ | ~ | ~ |
| **Bill/sub-трекеры** (Rocket Money, Subo, Copilot, Monarch, Emma, Snoop, Cleo) | ✗ (нет decode документа) | ~ (суммы, не true-cost из док) | ✗ | ✗ | ✓✓ (их ядро) | ✗ (нужен bank-link) | ~ (часть — broking/negotiation) | ✗ (сначала подключи банк) |
| **BNPL-native** (Klarna, Clearpay, PayPal) | ✗ (сами кредитор → не флажат свои traps) | ~ (показывают график) | ✗ (конфликт интересов) | ✗ | ~ (только свои планы) | N/A | регулятор | ✗ (только свои продукты) |
| **Credit-apps** (ClearScore, Credit Karma, Experian) | ✗ | ✗ | ~ (скор, не per-document) | ✗ | ~ (алерты по скору) | ✗ (нужна привязка) | ~ (broking-модель) | ✗ |
| **Comparison / switching** (MSE, агрегаторы) | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | broking | ✗ (решают «найти дешевле») |

## Чтение матрицы

- **Строка Decode — единственная сплошь `✓`.** Не потому что мы «лучше по каждой клетке», а потому что мы — **единственное пересечение** этих осей.
- **Два ближайших соседа делят мир пополам:**
  - **LLM** имеют decode, но нет Watch, нет детерминизма, нет UK-базы, не FCA-safe.
  - **Трекеры** имеют Watch, но нет decode документа и **требуют bank-link** (наш анти-паттерн).
  - Decode = **decode × Watch без bank-link, с детерминизмом и проверяемостью**. Этой комбинации нет ни у кого.
- **BNPL-native структурно не могут** быть Decode: конфликт интересов (кредитор не флажит собственные traps).
- **Comparison/switching — анти-сегмент:** решают «найти дешевле», а не «понять этот документ и поймать дедлайн»; уводят в broking-риск ([segmentation §4](segmentation.md)).

## Почему пересечение защищено (не копируется за квартал)
1. **Детерминизм + UK trap/credit-file база** — курируемый вертикальный актив, не свойство модели ([defensibility.md](defensibility.md), [knowledge-base-and-rag.md](knowledge-base-and-rag.md)).
2. **Watch на детерминированных локальных пушах без банка** — архитектурно вне чат-интерфейса ([watch-architecture.md](../ux/watch-architecture.md)).
3. **FCA-периметр + безоценочный тон** — встроены, а не прикручены; generic-LLM их системно нарушает.
4. **Момент/трение** — one-tap в чекауте/при письме; трекеры требуют онбординг банка, LLM требует промпт.

## Одной строкой
> У LLM есть decode, но нет Watch. У трекеров есть Watch, но нужен bank-link и нет decode. **Decode — единственное, где скан рождает проверяемое объяснение И живущий дальше Radar, без привязки банка.**
