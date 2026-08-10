# Приложения, похожие по ЛОГИКЕ (не по эстетике) — 2026-08-02

**Задача:** найти приложения, близкие Decode по *логике* (что делают), а не по виду.
**Метод:** Mobbin + Refero (iOS) по осям core-loop Decode (Scan→Understand→Decide→Watch). Скрины в `competitors-by-logic/`.
**Логика Decode:** принести фин-документ (скан/upload/forward) → объяснение + детерминированный true-cost + trap-флаги + credit-file + tappable citations → Vault коммитментов + Renewal Radar.

## Ось 1 — Decode документа (Scan → Understand). Наш дифференциатор
Реальные аналоги «приложи документ → ИИ объясняет»:
- **ChatGPT** ⭐⭐ — «Residential Lease Agreement.pdf → *что говорит договор про quiet hours?*» → структурный ответ с **пер-claim цитатами** (тег «…Agreement.pdf» на каждом буллете) + «Easy uploads: instant summaries or analysis by uploading images and documents». Это ровно наш **Ask + source-highlight**, но на юр-документе. [screen](https://mobbin.com/screens/0a59d69f-f9f1-469d-be3b-c3bdcaefd9ec)
- **Fabric** ⭐ — вьюер документа + таб **Ask** (спросить про документ) + Similar/Info. Личный doc-vault + ask ≈ наш Vault + Ask. [screen](https://mobbin.com/screens/d7a52f98-dd61-4b97-ba1f-c3f231b96b26)
- **Grok** — «Summary of the document» (имя/размер/структура). [screen](https://mobbin.com/screens/45c49df0-24e1-4a4c-ba11-23e2720c7f3d)
- **Notion AI** — attach PDF → «Summarize this file» → структурный бриф. [screen](https://mobbin.com/screens/1be86f23-19d6-449e-8aaa-6184bc511294)
- **Speechify** — «Chat with AI about this file» + Summarize Text / Generate Quiz. [screen](https://mobbin.com/screens/ef1b74bd-12b6-4005-9758-2b09e5b7b644)
- **Docusign** — «Add Documents» скан + **AI-Assisted** field suggestions. [screen](https://mobbin.com/screens/41980ec5-544f-4d68-bf46-f392f783a291)

**Стратегический вывод:** «объяснить документ» уже **коммодитизировано** горизонтальными LLM (ChatGPT делает lease-Q&A с цитатами бесплатно). Подтверждает [research/33](../33-scope-and-input-strategy.md): ров Decode — НЕ Q&A, а **вертикаль** (детерминированный true-cost кодом, UK-trap-база, credit-file YES/NO, Watch, FCA-комплаенс). Ask/citations надо делать НЕ хуже ChatGPT, но продавать — вертикалью.

## Ось 2 — Watch (Vault + Renewal Radar). Прямые конкуренты
- **Rocket Money** ⭐⭐ — «Coming Up» календарь + «Premium in 18 days $10 / Spotify in 30 days $21.31» + «Credit Card Payment Removed» (cancel-подтверждение). Ближайший Radar-аналог. [screen](https://mobbin.com/screens/e47323a1-a857-4c5a-b7dc-4cea3fd9f3a8)
- **Subo** ⭐⭐ (из refero-scan) — «Bills, renewals & reminders»: detail-карточка + reminder + protected-delete.
- **Copilot Money** ⭐ — Recurrings (left to pay / paid so far). [screen](https://mobbin.com/screens/eccb138d-eedd-412b-9ba4-905343b3f6e9)
- **Monarch** — Recurring-календарь + income/expenses. [screen](https://mobbin.com/screens/c768c818-330e-4598-bd2e-fe2af92f48e4)
- **Cleo** — bills/budget + chatty-тон. [screen](https://mobbin.com/screens/d1d13fc6-5d1c-4250-8b9a-f9b668d06428)
- **Up** — «Predict your expenses / Know what to safely spend» (upcoming). [screen](https://mobbin.com/screens/5e8ccedd-b014-4715-87d5-c7eedf7694af)
- **Ubank** — Bill Planner (из прошлого ресёрча).

**Вывод:** сегмент плотный (Rocket Money/Subo/Copilot/Monarch). Почти все **требуют bank-link**. Отличие Decode — **decode-first, без bank-link на входе** ([research/33](../33-scope-and-input-strategy.md)), фокус на trap/credit-file, а не на «категоризация трат».

## Ось 3 — BNPL / credit-file специфика
- **Klarna** — инфостраница «deactivating credit options» + эффект на credit score + FAQ. BNPL-native, но объяснение — generic-текст, без true-cost/trap-разбора.
- **PayPal** (Pay Later), **Introspect** («Improve your buying habits»).

## Итог: где Decode реально отличается
1. **Вход:** принеси документ, НЕ bank-link (все трекеры — bank-link).
2. **Decode-глубина:** детерминированный true-cost + UK-trap-база + credit-file YES/NO + citations — ни generic-LLM, ни трекеры этого не дают на конкретном документе.
3. **Связка decode → Watch:** скан рождает коммитмент, который живёт в Radar (у трекеров Watch есть, decode — нет; у LLM decode есть, Watch — нет). **Decode = пересечение, которого нет ни у кого.**

## Что стоит подсмотреть в UX
- ChatGPT — пер-claim цитаты (тег-источник на каждом факте) → усилить наш source-highlight.
- Rocket Money — «Coming Up» календарь + cancel-подтверждение → наш Radar/Calendar.
- Fabric — doc-vault с табом Ask прямо на документе → наш Vault-Detail + Ask.
- Subo — 3-колоночная стат-полоса + двухуровневые действия (см. [refero-scan.md](refero-scan.md)).
