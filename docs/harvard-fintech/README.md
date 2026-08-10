# Decode × Harvard VPAL FinTech — карта курса

Привязка продукта **Decode** к курсу [FinTech (Harvard VPAL / GetSmarter)](https://www.getsmarter.com/products/harvard-vpal-fintech-online-short-course): 7 модулей, непрерывный ассессмент, финал — **капстоун-колода** («Recommend a solution to a problem encountered in the FinTech sector» + «Present a slide deck that proposes a plan of action»).

Та же логика, что в [research-sprint](../research-sprint/README.md): не переделывать продукт под курс, а показать, какой уже сделанный артефакт закрывает какой learning outcome. Двойное назначение — (1) сдать ассессмент, (2) вынуть из этого второй портфолио-кейс (регуляторно-продуктовый, в дополнение к ресёрч-кейсу).

**Продукт:** AI-декодер финансовых документов, UK, iPhone-first. **Сегмент:** S1 «accidental borrowers» — BNPL-пользователи 18–25 ([segmentation.md](../product/segmentation.md)). **Инвариант:** no bank connection.

⚠️ Handbook курса на руках нет — объёмы работ, рубрики и дедлайны здесь **не учтены**. Всё ниже калибровано под типовой формат GetSmarter (короткие письменные задания по модулям + колода на 12–15 слайдов) и подлежит сверке с handbook в первую неделю.

---

## Карта: 7 модулей → deliverables Decode

| Модуль | Learning outcome, под который заходит Decode | Что уже есть | Фит |
|---|---|---|---|
| **M1** Reshaping banking & payments | «how FinTech startups are revolutionizing payment methods and undermining traditional mechanisms»; «how incumbent payment ecosystems are resisting»; «how competing interests may influence the way FinTech reshapes banking» | [research/10](../../research/10-market-uk-bnpl-credit.md) рынок UK BNPL; [research/18](../../research/18-competitor-teardowns.md) ответ инкумбентов (Revolut AIR 09.04.2026 · 13m UK, Cleo вернулся 05.02.2026, conversational AI у Starling/NatWest); [10b](../../research/10b-trap-tc-corpus.md) verbatim-корпус T&C | 🟢 |
| **M2** Raising money with FinTech | «new forms of capital access in disrupting financial institutions»; «correct course of action for a large company when diversifying its FinTech functionality» | BNPL как доступ к капиталу для thin-file 18–25 мимо банка; реальные кейсы диверсификации инкумбентов в [10b](../../research/10b-trap-tc-corpus.md): **Frasers Plus 39.9% APR**, миграция Argos Card → «Argos Pay», Monzo Flex (0% → принудительные 24 мес @29% APR) | 🟡 |
| **M3** AI/ML и данные | «problems in trying to monetize data for financial services»; «potential of cloud-based applications in financial services» | [research/06](../../research/06-tech-claude-vision-extraction.md) юнит-экономика ($0.05–0.09/док, ~$0.01/Q&A-тёрн, COGS 10–30%); [research/23](../../research/23-ai-eval-extraction.md) eval-контур (`numeric_exact_match` толеранс 0, `hallucination_rate` ≤2%, golden 30–50 UK-док); [research/08](../../research/08-tech-rag-backend.md) + [27](../../research/27-data-model-security-gdpr.md) архитектура под ZDR/GDPR | 🟢 |
| **M4** Blockchain | «predict how uses of blockchain may succeed or fail»; «impact of blockchain on trade and development finance» | Прямого пересечения нет → эссе-разбор, см. §«Мосты для M4/M5» | 🔴→🟡 |
| **M5** Crypto & CBDC | «predict how uses of blockchain and other cryptocurrencies may succeed or fail» | Прямого пересечения нет → эссе-разбор, см. §«Мосты для M4/M5» | 🔴→🟡 |
| **M6** Forging the future of FinTech | «challenges posed to governments in regulating FinTech»; «recommend a solution»; **«present a slide deck»** | [research/09b](../../research/09b-fca-boundary-verified.md) — PERG 17.7 verbatim, RAO art 36FB (SI 2025/859), CP26/15 (due 17.06.2026), PS26/1 (11.02.2026), **Regulation Day 15.07.2026**; [research/22](../../research/22-gtm-aso-launch.md) s21 FSMA и границы маркетинга | 🟢 |
| **M7** Conference week | презентация капстоуна | Колода ([capstone-deck-m6.md](capstone-deck-m6.md)) + кликабельный прототип (49 экранов, 14 флоу): `open prototype/index.html` | 🟢 |

---

## Сквозной тезис (одна мысль на весь курс)

> **BNPL — первый массовый потребительский кредит, где потребитель не является клиентом.** Продукт оплачивает мерчант, поэтому вся индустрия оптимизирует конверсию на чекауте, а не понимание условий. Регулятор входит 15.07.2026, но только для новых договоров — значит «зоопарк» условий станет **больше**, а не меньше. Дыра, которую закрывает Decode: понимание до подписи, вне регулируемого периметра debt counselling.

Этот тезис работает в M1 (competing interests), M2 (новая форма доступа к капиталу), M3 (данные как отказ, а не как актив), M6 (регулирование) — и держит все задания как один кейс, а не пять разрозненных эссе.

Проверяемые опоры тезиса:
- **Дыра пуста:** из 25+ разобранных продуктов колонка «true cost math» пуста **у всех** ([research/00](../../research/00-executive-summary.md) §1, [01](../../research/01-competitors-subscription-trackers.md), [03](../../research/03-competitors-ai-document-tools.md)).
- **Асимметрия легальна и подтверждена дословно:** PERG 17.7 ex.(4) *«This is not debt counselling as it is about incurring debts, not liquidating them»* → pre-signature анализ вне периметра; ex.(14)/(16) → post-signature советы внутри ([09b](../../research/09b-fca-boundary-verified.md)).
- **Тайминг:** Regulation Day 15.07.2026, подтверждён PS26/1 от 11.02.2026; договоры до этой даты остаются exempt (не ретроспективно).
- **Сегмент:** FCA Financial Lives 2024 — 10.9 млн / 20% взрослых UK пользовались BNPL; только 37% в 18–34 гасят легко против 60% в 35–54 ([11b](../../research/11b-user-pains-verified.md)).

---

## Мосты для M4/M5 (где продукта нет)

Не изобретать блокчейн в Decode. Оба модуля закрываются **аналитически**, на своём же материале — это ровно то, что просят outcome-формулировки («predict … may succeed or fail»).

**M4 — «Shared ledger потребительских обязательств: почему не взлетит».**
Проблема настоящая и своя: сегмент боится необратимого следа в кредитном файле, а видимость BNPL-обязательств между провайдерами исторически неровная — отсюда наш бинарный бейдж **«Goes on your credit file: YES / NO»**, которого нет ни у кого ([research/00](../../research/00-executive-summary.md) §3). Тезис эссе: распределённый реестр обязательств решает проблему видимости технически и проваливает её институционально — CRA-инфраструктура, право на исправление и стирание по UK GDPR ([research/27](../../research/27-data-model-security-gdpr.md)), отсутствие стимула у мерчант-фандед-игроков делиться данными. Вывод «мы это сознательно не строим, вот почему» — валидный ответ на outcome.

**M5 — «Programmable money vs ловушка в договоре».**
У нас есть таксономия ловушек, переиспользуемая между типами документов: `auto-renewal-by-default` / `lock-in-minimum-term` / `asymmetric-exit` / `silent-price-escalation` ([research/30](../../research/30-trap-catalog-expansion.md)). Вопрос эссе: если условие исполняется кодом (CBDC / стейблкоин-рельсы), ловушка исчезает или переезжает из T&C в смарт-контракт, который потребитель читает ещё хуже? Кандидат в вывод: программируемость меняет **носитель** асимметрии, а не саму асимметрию → спрос на слой объяснения растёт, а не падает. Это прямо усиливает капстоун.

---

## Адаптации под контекст (честно)

1. **M2 — не подмена, а разворот.** Модуль про P2P-лендинг и краудфандинг; Decode — не P2P. Заходим через outcome «new forms of capital access» (BNPL = встроенный в чекаут кредит для тех, кому не дают карту) и через кейс диверсификации инкумбента (Frasers, Argos, Monzo). Если задание жёстко про краудфандинг — берём кейс курса, Decode не притягиваем.
2. **M4/M5 — эссе, а не фича.** Явно помечать: это анализ применимости, а не заявка на roadmap. Натянутый «блокчейн в Decode» убивает достоверность и капстоуна, и портфолио.
3. **Цифры датировать.** Часть статистики болей — 2021 год (1 из 10 у коллекторов, 5.7 млн «не считали это настоящим займом»); «51% 18–24» — вендорский опрос Creditspring, только с атрибуцией; **отдельной FCA-цифры именно по 18–24 в открытом доступе нет** ([11b](../../research/11b-user-pains-verified.md)). В академической работе это ловится рецензентом первым.
4. **Каузальность не заявлять.** FCA (OP69) **не подтверждает** причинность «BNPL → долговая спираль». Формулировка: «связан с / непропорционально представлен среди уязвимых».
5. **Юридический статус.** Весь регуляторный анализ — product/market-analysis, **не юрзаключение**; compliance-review у UK-юриста до запуска обязателен. В колоде это отдельная строка в рисках, а не сноска мелким шрифтом.
6. **Две версии капстоуна.** Академическая (под рубрику, с цитированием материалов курса) и портфолио-версия (под работодателя). Контент один, различаются первый и последний слайды + плотность ссылок. Дешевле, чем писать дважды.

---

## Что читать под какой модуль (короткий список)

Не отдавать в задания весь `research/` — 40 треков утопят читателя. Минимальный набор:

| Модуль | Файлы |
|---|---|
| M1 | [00 §1–2](../../research/00-executive-summary.md), [10](../../research/10-market-uk-bnpl-credit.md), [18](../../research/18-competitor-teardowns.md) |
| M2 | [10b](../../research/10b-trap-tc-corpus.md), [24](../../research/24-competitor-watch.md), [21](../../research/21-pricing-monetization.md) |
| M3 | [06](../../research/06-tech-claude-vision-extraction.md), [23](../../research/23-ai-eval-extraction.md), [08](../../research/08-tech-rag-backend.md), [27](../../research/27-data-model-security-gdpr.md) |
| M4 | [27](../../research/27-data-model-security-gdpr.md), [00 §3](../../research/00-executive-summary.md) (trap catalog, credit-file badge) |
| M5 | [30](../../research/30-trap-catalog-expansion.md), [31](../../research/31-behavioral-trust-design.md) |
| M6 | [09b](../../research/09b-fca-boundary-verified.md), [22](../../research/22-gtm-aso-launch.md), [00 §5](../../research/00-executive-summary.md) |

---

## Статус и следующие шаги

| Шаг | Статус |
|---|---|
| Карта модулей → артефакты | ✅ этот файл |
| Скелет капстоун-колоды M6 | ✅ [capstone-deck-m6.md](capstone-deck-m6.md) |
| Сверка с handbook (объёмы, рубрики, дедлайны, формат сдачи) | ○ первая неделя курса |
| Эссе-брифы M4 и M5 | ○ по факту заданий модулей |
| Дизайн колоды (после hi-fi фазы Decode) | ○ переиспользовать токены [DESIGN.md](../DESIGN.md) |
| Портфолио-версия для Notion | ○ после сдачи |
