# Decode — FCA Register check (проверка авторизации фирмы)

**Фаза:** Product/Tech · **Дата:** 2026-08-02 · **Входы:** [integrations.md](integrations.md), [defensibility.md](defensibility.md)
**Экран:** Decode-Result → компонент `Molecules/FirmCheck` (Figma set `750:3537`, варианты Status=Authorised / NotFound), инстанс на Decode-Result сразу после CreditFileBadge.

## Зачем
Новый trust-момент под страх сегмента («это вообще настоящий, авторизованный кредитор?»): проверяем фирму из документа в **FCA Financial Services Register**. Новый тип сигнала в курируемом каталоге. Дифференцирует — ни generic-LLM, ни трекеры этого не дают.

## Область
**Только UK** (FCA — британский регулятор). Для UK-first клина — ровно то, что нужно; часть курируемой UK-вертикали ([research/33](../../research/33-scope-and-input-strategy.md)). Гео-экспансия = отдельная интеграция под регулятора страны (ASIC/AU, Central Bank of Ireland, NMLS/US), P3+.

## Механизм
1. При decode извлекаем **имя фирмы и/или FRN** из документа. Регулируемые фирмы **обязаны** печатать «authorised and regulated by the FCA» + FRN в потребительских документах → часто FRN прямо в футере → **точный lookup**.
2. Есть FRN → exact-запрос к **FCA Register API** (`register.fca.org.uk`, бесплатный API-ключ). Нет FRN → fuzzy-поиск по имени + порог доверия.
3. Кэшируем результат (не звать на каждый рендер).

## Состояния (компонент FirmCheck)
| Status | Заголовок | Значение | Provenance-pill |
|---|---|---|---|
| **Authorised** | On the FCA register | YES | This product is currently unregulated › |
| **NotFound** | Not on the FCA register | NO | How to check › |

- **NotFound** дополнительно всплывает как **trap-тип** в списке TRAPS (сигнал «проверь, прежде чем платить»), не как вердикт «скам».

## Guardrails формулировок (критично)
Разделяем три РАЗНЫЕ вещи, никогда не смешиваем:
1. **Фирма в реестре** (да/нет + статус) — факт из API.
2. **Тип продукта регулируется** (да / сейчас exempt) — напр. **BNPL Pay-in-3/4 в UK сейчас вне регулирования** до BNPL-регуляции 2026. Klarna Bank AB **в реестре**, но Pay-in-3 — exempt.
3. **Безопасно/скам** — этого вердикта **НЕ выдаём**. `regulated ≠ safe`, `unregulated ≠ scam`, `not-found = сигнал, не приговор` (учитываем clone-firms + FCA warning list).

Поэтому Authorised показывает «YES + this product is currently unregulated ›», а не «безопасно»; NotFound — «check before you pay», а не «скам». Согласуется с FCA-инвариантом (факт + канал, не совет).

## Стоимость / реализуемость
Бесплатно (FCA Register API, ключ + кэш). Сложность не в API, а в **резолвинге сущности** (FRN-из-документа → exact; иначе fuzzy) + **точной раздельной формулировке**. Реализуемо.

## Статус в макетах
Готово в lo-fi: компонент `Molecules/FirmCheck` (2 варианта) + инстанс Authorised на Decode-Result. NotFound-вариант — в компоненте (для scam/«страшное письмо» кейса). Всё через DS-переменные/стили, ч/б, статус кодируется текст+вес (colorblind-safe). Hi-fi не трогали.
