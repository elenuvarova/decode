# Экран-контракт: Decode-result (RS + RS-c + SV) — ГЛАВНЫЙ ЭКРАН

**Route:** `(app)/result/:docId` · **Flow:** [F2](../ux/jtbd-to-flows.md#f2) часть 2 · **Шаг loop:** Understand · **Job:** J1 (+ шов к Watch)
**Персоны:** все; Priya (бейдж credit-file = make-or-break), Maya (язык простой) · **Доступ:** автор документа
**Sitemap:** [RS / RS-c / SV](../ux/screen-sitemap.md#группа-c--scan--decode-pipeline) · **Pre-mortem:** PM3 (бейдж-герой), PM6 (три языка достоверности); митигирует F3 (ошибка в числах = снос)
**Инварианты:** числа считает детерминированный движок (не LLM); каждый extracted term тапается в источник; **explain, don't advise** (FCA, [research/09b](../../research/09b-fca-boundary-verified.md)); никаких «you should / switch / best deal»; честный отказ лучше уверенной ошибки.

---

## Логика

### Данные (из пайплайна)
- `document`: `id`, `auto_name` («Klarna BNPL offer — 14 May 2026»), `provider` (detected), `doc_type`, `pages`, `signed_date` (если есть — критично: до/после 15.07.2026 для s75/FOS).
- `extraction[]`: каждое поле — `{ label, value, verbatim_span (page+bbox), confidence: high|check|unreadable, source: document }`.
- `true_cost`: `{ headline_price, total_repayable, delta, breakdown[], engine: deterministic }` — **считается кодом**, не LLM. Каждая строка breakdown → формула.
- `credit_file`: `{ status: YES | NO | ONLY_IF_COLLECTIONS, cra_named?: [Experian|Equifax|TransUnion], source_span }` — бинарный бейдж (PM3). Из [research/10b](../../research/10b-trap-tc-corpus.md): провайдер-специфично (PayPal→TransUnion поимённо; Klarna не называет CRA; Zilch Pay-in-4 vs Pay-over-3 различаются).
- `traps[]`: `{ type, severity: HIGH|MED|INFO, £_cost, marker_verbatim, explanation, source_span, next_steps[] }` — из trap-каталога ([research/00 §3](../../research/00-executive-summary.md) + [10b](../../research/10b-trap-tc-corpus.md) few-shot).
- `s75_status`: regulated (есть s75) | exempt (Art.60F, нет s75) — главный разделитель severity ([10b](../../research/10b-trap-tc-corpus.md)).
- `summary`: AI 3-sentence plain-English (помечен как AI).
- `green_terms[]`: безопасные пункты (показывать для симметрии против «селекции с value judgment» — FCA-требование).

### Состояния
- **default (success):** полный result.
- **partial:** часть полей `confidence=unreadable` → честные «Couldn't read» вместо догадки; true_cost помечен «incomplete — N values missing».
- **loading:** н/п (приходим после SC-4); но aha-число стримится первым (≤8c), детали догружаются секциями.
- **error:** extraction провалилась целиком → не показывать пустой result, вернуть на SC-4 error («Couldn't read this document — retake»).
- **empty:** н/п.

### Действия
**RS (result):**
- Tap на любой extracted term / trap-маркер → `[QA-src]` подсветка места в документе (детерминированно, span/bbox).
- `[Ask]` → [ask](ask.md) (QA-sheet).
- Tap бейдж credit-file → раскрыть пояснение + source.
- Tap «Check this» (confidence) → **RS-c** inline-коррекция.
- `[6 terms look standard ⌃]` → раскрыть/схлопнуть green_terms.
- Trap-карточка `[Why this matters]` → раскрыть explanation + £ + next_steps (нейтральные, не «откажись»).
- `thumbs up/down` + `[Wrong?]` на trap/term → feedback (eval-сигнал).
- `[Save]` → **SV**. `[Scan another]` → [scan](scan.md) SC-1.

**RS-c (inline correction):**
- Открывает zoom исходного места + `GuidedCorrectField` (правка значения).
- На submit → **мгновенный пересчёт true_cost** (детерминированный) + закрыть sheet + тост «Recalculated».

**SV (save & watch):**
- `AutoNameField` (предзаполнен, редактируем).
- `DateSuggestionList`: предложенные даты для Radar из извлечённых дедлайнов («Promo rate ends 14 Nov», «Payment 2 due 28 May»).
- `RadarToggle` per-date (inline-обещание наблюдения = шов Scan→Watch).
- Если guest → здесь предложить Sign in with Apple для сохранения.
- `[Save to Vault]` → Home (cockpit) с тостом «Saved · watching 2 dates».

### FCA-инварианты копирайта ([research/09b](../../research/09b-fca-boundary-verified.md), [research/00 §5](../../research/00-executive-summary.md))
- Summary/trap: факт + рыночный бенчмарк С ДАТОЙ («typical UK range is £5–10, as of June 2026»), НЕ оценка решения.
- True cost: «Total you will repay: £X — £Y more than the cash price» (организация данных документа), НЕ «you can't afford this».
- Показывать green_terms (симметрия). Запрещено: «bad deal», «predatory», «don't sign», скоринг, читающийся как «откажись».
- Футер result: дисклеймер «Decode explains what's in your documents. It doesn't give financial advice…» + signpost MoneyHelper/StepChange.

### Связи
RS → [ask](ask.md), [scan](scan.md), SV → [cockpit](cockpit.md)/[alerts](alerts.md). Вход: SC-4, а также из [Vault detail](../ux/screen-sitemap.md) (повторный просмотр).

---

## Визуал

**Референсы:** Yuka (структура result), Plum (aha-число), Adobe AI (clickable citations — [research/references/competitors/adobe-ai-assistant.png](../../research/references/competitors/adobe-ai-assistant.png)), Lovi (feedback) ([research/14](../../research/14-mobbin-ai-explanation.md), [research/04](../../research/04-ux-ai-trust-patterns.md)).

### Layout Mobile (основной, скролл сверху вниз)
1. **Шапка:** миниатюра фото документа + `auto_name` + provider; кнопка закрытия/назад.
2. **Aha-число (герой №1):** крупно «True cost: £412» + одна строка «£64 more than the headline price» (Plum-паттерн — приходит первым при стриминге).
3. **Бейдж credit-file (герой №2, PM3):** крупная плашка «Goes on your credit file: **YES** / NO / only if collections» + (если есть) named CRA; tap → пояснение+источник. Не пункт списка — отдельный акцентный блок сразу под aha-числом.
4. **Key terms:** список строк `label · value · (i) · confidence-tag`; рисковые с `RiskLabel`; `[6 terms look standard ⌃]` схлопывает безопасные.
5. **Trap-карточки:** `TrapCard` по severity-порядку (HIGH→MED→INFO); каждая — факт + £ + `[Why this matters]`; тон спокойный, severity передаётся порядком/иконкой/весом, НЕ кроваво-красной типографикой.
6. **Summary (AI):** 3 предложения, помечены `AI`-тегом.
7. **Футер:** дисклеймер + signpost-ссылки.
- Sticky снизу: `[Ask]` + `[Save]` (над safe-area).

### Три языка достоверности (PM6) — три визуальных регистра
- **«From your document»** — extraction; tap → подсветка в документе. Нейтральный регистр, иконка «document».
- **«Calculated, not AI»** — `CalculatedBadge` на true_cost и £-числах traps. Отдельный визуальный маркер (митигирует F3).
- **«AI»** — summary + Q&A; `AI`-тег. Глобальной плашки «AI may be wrong» НЕ делаем (RCT-доказано бесполезна) — вместо неё контекстный «tap any term to see it in your document».

### Confidence — категориально (не проценты)
- `✓ from document` — молча (нейтральная галочка).
- `Check this` — `ConfidenceTag` жёлтый (в grayscale: ⚠ + вес); tap → RS-c.
- `Couldn't read` — честный missing + «retake this page».

### Компоненты → UI-кит
Доменные: `AhaNumber`, `CreditFileBadge`, `TrapCard`, `RiskLabel`, `CalculatedBadge`, `TrustSourceTag`, `ConfidenceTag`, `KeyTermList`. Базовые: `Card`, `Button`, `Sheet` (RS-c, SV), `Toggle` (RadarToggle), `Chip`, collapse/`Accordion`.

### Edge cases (визуально, с финансовыми форматами)
- Большая сумма: «£1,234,567.89» — tabular-nums, не ломает aha-блок.
- Representative APR: «39.9% APR (variable)» — помещается в строку term.
- Длинное имя провайдера/мерчанта в шапке → truncate с tooltip-по-tap.
- Документ без credit-file данных → бейдж показывает «Not stated in this document» (честно), не догадку.
- Много traps (8+) → список скроллится, sticky-CTA не перекрывает последнюю карточку.
- partial (несколько unreadable) → true_cost с явной пометкой «incomplete», не фейковая точность.
- Отрицательная дельта/£0/«—» → осмысленно («No extra cost vs headline»), не пустая дыра.
- Dynamic Type XL → aha-число и бейдж масштабируются, не наезжают.

### Открытые вопросы / TODO
- TODO: точная визуальная иерархия aha-число vs credit-file бейдж (оба «герои») — проверить на wireframes, что №1 считывается первым (likely aha-число для всех, бейдж — для Priya). A/B-кандидат.
- TODO(юрист): финальные формулировки trap-explanations и дисклеймера (FCA-граница).
- TODO: как показывать s75 regulated/exempt — отдельный бейдж или внутри credit-file блока?
- TODO: feedback thumbs/«Wrong?» — куда пишется (eval-set pipeline, [research/06](../../research/06-tech-claude-vision-extraction.md)).
