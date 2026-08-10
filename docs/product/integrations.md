# Decode — внешние API / интеграции

**Фаза:** Product/Tech · **Дата:** 2026-08-02 · **Входы:** [defensibility.md](defensibility.md), [watch-architecture.md](../ux/watch-architecture.md), [knowledge-base-and-rag.md](knowledge-base-and-rag.md)

**Принцип:** API привязываем только если добавляет ценность и **не ломает инварианты** (нет bank-link на входе; нет broking/«тебе стоит переключиться»; privacy-first). Большая часть ценности — курируемая логика, не «побольше интеграций».

## Карта интеграций

| API | Слой loop | Ценность | Комплаенс-риск | Фаза | Стоимость |
|---|---|---|---|---|---|
| **FCA Financial Services Register** ⭐ | Understand/Trust | фирма авторизована? → trust-бейдж + флаг скам/rogue-lender = **новый trap-тип** | низкий | Wedge | **бесплатно** (ключ, rate-limit → кэш) |
| **Companies House** | Understand/Trust | верификация юрлица — кто за документом | низкий | Wedge | **бесплатно** (ключ, ~600/5мин) |
| **Apple Vision (OCR)** | Scan | on-device распознавание, данные не уходят | нет | Wedge | **бесплатно** (on-device) |
| **EventKit** | Watch | «добавить дедлайн в Apple Calendar» | нет | Wedge | **бесплатно** |
| **APNs (silent push)** | Watch | долив rolling-window локальных пушей (не банк) | нет | Wedge (опц.) | **бесплатно** |
| **Cloudflare Email Workers** | Scan (forward-in) | вход «forward an email» (парс вложения) | низкий | Wedge | **free-tier** |
| **legislation.gov.uk** | KB | корпус статутов для регуляторного KB (build-time) | нет | Phase 2 | **бесплатно** |
| **Supabase** | Infra | БД/auth/storage/pgvector | — | Wedge | 🟡 free-tier → платно |
| **Claude API** | Understand | извлечение + объяснение + Q&A | — | Wedge | ❌ **платно (per-token) — основная переменная стоимость** |
| Google Document AI / Textract | Scan | структурное извлечение | — | — | ❌ платно → **не берём** (есть Vision) |
| **Open banking** (TrueLayer/Plaid/Yapily) | Watch | авто-детект оплаты / авто-импорт (решает «а он заплатил?») | высокий (AISP) | **Pro/позже** | ❌ платно |
| **Credit-bureau** (Experian/ClearScore) | Understand | реальный скор / что отчитано | высокий | **Pro/позже** | ❌ платно |
| Comparison / switching / broking | Decide | — | **broking = FCA + против инварианта + анти-сегмент** | **не берём** | — |

Фикс-стоимость: **Apple Developer $99/год** (публикация), не per-call.

## Экономика
- **Wedge-интеграции ≈ $0** (FCA/Companies House/legislation/Vision/EventKit/Email Workers — free или on-device). Весь **trust/scam-слой** почти бесплатен.
- **Реальная переменная стоимость — токены Claude.** Жмём:
  - **математику делаем кодом** → не платим токенами за арифметику (это и «Calculated, not AI», и дешевле);
  - **model-tiering** (Haiku на дешёвых шагах: классификация/извлечение; Sonnet/Opus где надо);
  - **prompt-caching** (UK-trap-база/системный промпт) + кэш повторных документов.
- **Дорогое/регулируемое** (open banking, бюро) = ровно то, что отложено в **Pro**, перекрывается Pro-выручкой.

## Топ-рекомендация
Самый высокоплечий новый API — **FCA Register (scam/authorisation-чек)**: добавляет доверие и **новый момент ценности** («это вообще легальный, авторизованный кредитор?»), ровно под тревогу сегмента, ничего из инвариантов не ломает, и бесплатен. Остальное — хирургически: capture (Vision), forward-in (email), calendar (EventKit), KB (legislation.gov.uk). Банк и бюро — только Pro/позже, добровольно.
