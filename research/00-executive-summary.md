# Decode — Executive Summary ресёрч-фазы (00)

**Дата синтеза:** 2026-06-12 · **Источник:** 16 отчётов [01](01-competitors-subscription-trackers.md)–[16](16-mobbin-alerts-reminders.md) + результаты адверсариальной верификации · **Назначение:** главный вход в фазы product analysis (сегментация, JTBD) → UX (flows, sitemap) → wireframes (ч/б + дизайн-токены). Платформа: последняя iOS, iPhone-first.

> **Поправки верификации, учтённые в этой сводке:**
> 1. **ОПРОВЕРГНУТО** (из [05](05-ux-document-capture.md)): «Microsoft Lens отключил новые сканы после 15.12.2025; замена — Microsoft 365 Copilot app». Факт: Lens удалён из сторов **09.02.2026**, новые сканы отключены **после 09.03.2026**; официальная замена — **OneDrive app** со встроенным сканером (сканы только в облако). [Источник](https://support.microsoft.com/en-us/lens/retirement-of-microsoft-lens). На выводы для Decode не влияет (рынок сканеров консолидировался — верно).
> 2. **ОПРОВЕРГНУТО** (из [10](10-market-uk-bnpl-credit.md)): «Klarna late fee £5 после 7-дневного grace, кап 25% от заказа, максимум 2 fee на заказ». Факт по действующим Klarna UK Pay in 3 Terms (v1.8.0, 01.10.2025): **£5 для заказов от £20 (до £20 — 25% от цены заказа); взимается, если инстолмент не оплачен в течение 14 дней после срока 2-го или 3-го платежа; максимум один fee на инстолмент (эффективно 2 на заказ); не взимается при остатке < £1.** [Источник](https://cdn.klarna.com/1.0/shared/content/legal/terms/0/en-GB/paylaterin3). Исправлено в каталоге trap types ниже.
> 3. **ВЕРИФИЦИРОВАНО углублённым проходом 2026-06-14** (см. §0.5 ниже): ранее непроверенные треки [09](09-market-uk-fca-boundary.md) (FCA-граница) и [11](11-users-pain-points.md) (статистика болей) теперь сверены по первоисточникам — [09b-fca-boundary-verified.md](09b-fca-boundary-verified.md) и [11b-user-pains-verified.md](11b-user-pains-verified.md). Трек 09 **достоверен** (PERG verbatim; опровергнутого нет), трек 11 — **6 из 7 цифр подтверждены дословно**. ⚠️ остаётся: compliance-review у UK-юриста до запуска обязателен (верификация ≠ юрзаключение); часть стат — 2021 года (датировать); отдельной FCA-цифры именно по 18–24 в открытом доступе НЕТ. Статусы по каждой цифре — в Приложении А.

---

## 0.5 · Углублённый ресёрч-проход (2026-06-14)

Второй, более глубокий проход: 4 фоновых агента (web, первоисточники) + competitor-скриншоты. Новые файлы: [09b](09b-fca-boundary-verified.md) (FCA verified), [10b](10b-trap-tc-corpus.md) (T&C-корпус), [11b](11b-user-pains-verified.md) (стат verified), [18](18-competitor-teardowns.md) (teardowns), [references/competitors/](references/competitors/README.md) (11 скриншотов + манифест).

**Что подтвердилось / уточнилось:**
- **FCA-граница ([09b](09b-fca-boundary-verified.md)) — достоверна.** PERG 17.7 ex.(4) verbatim: *"This is not debt counselling as it is about incurring debts, not liquidating them"* → pre-signature wedge легален; post-signature «гасить досрочно / какой долг первым» = debt counselling (ex.14/16). Новое: DPC-broking-исключение = **RAO art 36FB (SI 2025/859)** только для поставщика товара, НЕ для сторонних приложений → интродукции Decode к лендерам = credit broking. Живая консультация **CP26/15** (пересмотр CONC 3 financial promotions, due 17.06.2026) — в мониторинг. Regulation Day **15.07.2026** подтверждён (PS26/1, 11.02.2026).
- **Статистика болей ([11b](11b-user-pains-verified.md)) — 6/7 дословно.** Честные ограничения: «51% 18–24» (Creditspring) — вендорский опрос, только с атрибуцией; «1-in-10 коллекторы» и «5.7m не proper borrowing» — **2021**, датировать; **отдельной FCA-цифры по 18–24 нет** (есть 25–34: 30%, 18–34: 37%); FCA **не подтверждает каузальность** «BNPL→долговая спираль» (OP69) — формулировать «связан с / непропорционально среди уязвимых». Безопасное ядро: FCA Financial Lives 2024 (10.9m/20%; только 37% 18–34 легко гасят vs 60% 35–54; профиль «моложе/менее кредитоспособны/вдвое чаще в фин-стрессе»).
- **Trap T&C-корпус ([10b](10b-trap-tc-corpus.md)) — verbatim из официальных документов.** Поправки к §3: Klarna Pay in 3 **НЕ называет CRA поимённо**; **Zilch разносить на 2–3 продукта** (Pay in 4 unregulated без s75 / Pay over 3 months regulated с s75 / PayNow debit); **Frasers Plus APR 39.9%, не 29.9%**; **Section 75 / Art.60F exemption — главный кросс-провайдерный разделитель severity** (BNPL pay-in-3/4 exempt без s75; Monzo Flex/Frasers/Argos/кредитки regulated с s75); Argos мигрирует в «Argos Pay» (новые планы без deferred interest → legacy). Эталонный high-severity маркер: Argos «interest on interest, backdated to the original purchase date». 18 few-shot примеров готовы для классификатора.

**🟡 Новый competitive watch-list ([18](18-competitor-teardowns.md)) — дыра Decode всё ещё пуста, но рынок сдвинулся:**
- **Cleo вернулся в UK 05.02.2026** (4.7★); **Revolut AIR** (09.04.2026, 13m UK), Starling/NatWest добавили conversational AI — все **bank-locked, без doc-decoding**, но нормализуют «AI о деньгах» и поднимают UX-планку.
- **ReSubs** — прямейшая угроза по механике (AI-extract обязательств из скриншотов без bank link), но только подписки, без понимания контрактов и BNPL-фокуса.
- Nous (перепроверено £6.99) ближайший по духу; Adobe AI — эталон clickable citations; **Little Birdie мёртв (2024), Rocket Money US-only** — сняты с радара.

**Вывод:** ни один существенный вывод первого прохода не опровергнут; правки уточняющие, факты укреплены первоисточниками, выявлены 3 новых угрозы для watch-list. Можно двигаться к wireframes.

---

## 0.6 · Углублённый ресёрч-проход 2 (2026-06-14, под дизайн/билд/GTM)

6 треков [19](19-design-ios-hifi.md)–[24](24-competitor-watch.md) + сводка **[25-deep-research-2-summary.md](25-deep-research-2-summary.md)** (читать перед hi-fi/билдом). Ключевые решения, **ревизующие прежние артефакты**:

1. **Pricing/упаковка пересобрана** ([21](21-pricing-monetization.md)) — ⚠️ ревизует инвариант PM4 «free = полный single decode навсегда» (отдавал wedge даром). Новое: **free = N decodes/мес** (полный wedge, но лимит) · **Pro = unlimited + полный Vault + Watch/Renewal Radar** · пейволл **после первого decode** (Day-0, где 80–90% решений). **БИЛД-ГЕЙТ:** Apple с янв 2026 массово реджектит trial-toggle (Guideline 3.1.2) → multi-plan selector + trial timeline; триал НЕ 3 дня. Подать **Apple Small Business Program** (15% с дня 1) до запуска. £4.99 — anchor, финализировать Van Westendorp PSM по S1/S2.
2. **Hi-fi палитра разблокирована** ([19](19-design-ios-hifi.md)) — brand **teal #0E7C72** (5.06:1 ✓ мелкий текст); **success мелким текстом — #157A4C** (т.к. #1E8E5A = 4.14:1 НЕ проходит AA small). **Liquid Glass (iOS 26) — только навигация (tab/nav/sheets), НИКОГДА на контенте** (суммы/severity/citations на плоских непрозрачных surfaces). Всю палитру (light+dark) прогнать через WebAIM/Stark до hi-fi. Токен-архитектура: покраска = смена ссылок ролей, экраны не трогаем.
3. **Accessibility** ([20](20-accessibility.md)) — цвет ДОБАВЛЯЕТСЯ к иконке/слову/весу, не заменяет (severity-слово High/Med/Info и credit-file YES/NO всегда текстом). £ ломает VoiceOver → `accessibilityLabel "412 pounds"` + `accessibilityLanguage='en-GB'`; стриминг aha-числа/этапов через `announceForAccessibility`; тест только на реальном iPhone.
4. **AI-eval** ([23](23-ai-eval-extraction.md)) — двухвызовная архитектура неизбежна (Structured Outputs ⊥ Citations = 400 by design); `numeric_exact_match` отдельным срезом (толеранс 0), `hallucination_rate` ≤2%, golden 30–50 UK-док + hard-negatives, регрессионный гейт через Batch API.
5. **Competitor-watch** ([24](24-competitor-watch.md)) — дыра в центре пуста, но периметр сжался: новый App Store **«AI Contract Analyzer & Scan»** (UK: scan+plain-English+risk+reminders, но без BNPL/citations/true-cost/трекинга) → Decode уже не первый сканер. Рвы P0: детерминированный true-cost, citations-к-строке, Vault/Radar, no-bank.
6. **GTM** ([22](22-gtm-aso-launch.md)) — реклама Decode (платный SaaS, без кредита/bank connection) **вне s21 FSMA → FCA-авторизация для маркетинга не нужна**; избегать «improve credit score»/«advice»/сравнения кредитных продуктов; 15.07.2026 = PR-хук №1; брифы инфлюенсерам — через s21-комплаенс (FG24/1).

⚠️ Опровергнуто верификацией внутри волны 2: расчётные контраст-числа трека 19 §5.4 (исправлены по WebAIM, см. врезку в [25](25-deep-research-2-summary.md)). Открытые вопросы (Van Westendorp не проведён; вся палитра — через WebAIM; tab-bar inset на устройстве; юр-ревью копий) — в [25](25-deep-research-2-summary.md) §5.

---

## 0.7 · Углублённый ресёрч-проход 3 (2026-06-14, brand/build/launch)

6 треков [26](26-naming-brand-trademark.md)–[31](31-behavioral-trust-design.md) + сводка **[32-deep-research-3-summary.md](32-deep-research-3-summary.md)**. Ключевые решения:

1. **Нейминг — давний риск снят и оцифрован** ([26](26-naming-brand-trademark.md)): словесный знак **DECODE в классе 9 (software) в UK занят** (вкл. свежий Mipwr UK00004214578) → голый «Decode» почти наверняка получит relative-grounds отказ; домены decode.* заняты/дороги. **Рекомендация:** либо составной **«DecodeFi»** (чистый просвет — нет ТЗ, свободен decodefi.app), либо оставить «Decode» + **фигуративный/комбинированный знак в кл.36** (не голый словесный). Оба — через clearance у UK-ТЗ-поверенного до подачи. До выбора имени: не покупать дорогой домен, не финалить логотип/иконку.
2. **Data-model/GDPR/безопасность** ([27](27-data-model-security-gdpr.md)): финансовые данные **НЕ special category** → достаточно Art.6 (Contract для core / Consent для опций / LI для безопасности), DPO формально не нужен, но **DPIA обязателен**. **ZDR с Anthropic ломается на Files API и Batch API** → документ слать **inline через /v1/messages** (корректирует «file_id» из [08](08-tech-rag-backend.md)); CORS под ZDR нет → **FastAPI-прокси обязателен**. Privacy-by-design: по умолчанию НЕ хранить оригинал фото.
3. **Метрики — резолв открытого вопроса №7** ([28](28-metrics-instrumentation.md)): activation двухступенчатая (**aha = `true_cost_revealed` в Day-0** + **loop-closed = `commitment_saved`/`reminder_set` за 7д**); **North Star = «Weekly Active Watched Commitments»** (НЕ decoded docs = vanity, НЕ «£ предотвращённых потерь» = недоказуемо + PII/FCA-риск).
4. **Retention/нотификации** ([29](29-retention-notifications.md)): Renewal Radar на **локальных** нотификациях (`expo-notifications`), не серверном push (без bank connection дедлайны детерминированы). **iOS 64-pending limit = риск №1** (дальние дедлайны молча пропадают) → горизонт 30–45 дней + rebuild-on-launch + серверная страховка. Главный враг удержания — **avoidance/money-dysmorphia (~43% Gen Z)**, не другое приложение.
5. **Doc-type #2 = insurance renewal letters** ([30](30-trap-catalog-expansion.md)), НЕ subscription: FCA **ICOBS 6.5** по закону кладёт last-year-vs-this-year премию + auto-renew флаг + «shop around» в одно письмо → детерминированный true-cost diff из коробки. Subscription = #3 (завязан на DMCC, отложен до весны 2027). Кросс-тип таксономия trap-детектора (`auto-renewal-by-default` / `lock-in-minimum-term` / `asymmetric-exit` / `silent-price-escalation`) переиспользуема BNPL→insurance→subscription→telecom→gym.
6. **Behavioral/trust** ([31](31-behavioral-trust-design.md)): детерминированный true-cost = **«корона доверия»** — одна видимая ошибка обрушивает доверие (η²=0.141), объяснение чинит лишь частично → нужен **trust-repair экран**. Тон = StepChange+FCA non-judgmental, **reading age 9**, fear только с efficacy-шагом.

⚠️ Опровергнуто внутри волны 3: детали PostHog free-tier (раздельные метрики-бакеты; overage от $0.00005/event — не $0.00031) — см. врезку в [32](32-deep-research-3-summary.md). Открытые вопросы (clearance имени; ZDR-заявка; DPIA по обновлённому ICO-guidance после Data (Use and Access) Act; тест 64-pending на устройстве) — в [32](32-deep-research-3-summary.md).

---

## 1. TL;DR — 10 главных фактов для продуктовых решений

1. **Дыра подтверждена и пуста.** Ни один из 25+ разобранных продуктов не делает связку «фото/шеринг финансового документа → понимание (summary + key terms + детерминированный true cost + trap flags + Q&A с source highlighting) → отслеживаемое обязательство (Vault + Renewal Radar)». Колонка "true cost math" пуста у ВСЕХ конкурентов — это самый чистый дифференциатор ([01](01-competitors-subscription-trackers.md), [03](03-competitors-ai-document-tools.md)).
2. **Главный конкурент шага Understand — ChatGPT, а не приложения.** Ответ: детерминированный расчёт (не LLM-математика), UK trap-база, source highlighting + confidence, персистентность (Vault), проактивность (Radar). Один экран результата должен продавать весь loop ([01](01-competitors-subscription-trackers.md), [03](03-competitors-ai-document-tools.md)).
3. **«No bank connection» — позиционирование, подтверждённое и похвалой (Bobby), и ненавистью (Snoop/Rocket Money/Cleo: страх, поломки Open Banking, злоупотребление доступом).** Выносить в hero-message онбординга и ASO: "We never connect to your bank" ([02](02-competitor-review-mining.md)).
4. **Тайминг идеальный: 15 июля 2026 — BNPL Regulation Day.** FCA начинает регулировать Deferred Payment Credit: обязательные pre-contract disclosures, Section 75, доступ к FOS — но только для новых договоров. «Зоопарк» старых/новых условий = спрос на объяснение; запуск/PR привязать к этой дате ([09](09-market-uk-fca-boundary.md) ⚠️, [10](10-market-uk-bnpl-credit.md)).
5. **Wedge, вероятно, легален без FCA-авторизации** (⚠️ не подтверждено независимой проверкой): pre-signature анализ оффера — про "incurring", не "liquidating" долг → вне debt counselling. Design-инвариант MVP: *no product links, no affiliate, no "apply" CTAs, no "you should"*. Рисковая зона — Q&A по уже заключённым договорам ([09](09-market-uk-fca-boundary.md)).
6. **Юнит-экономика зелёная:** ~$0.05–0.09/документ на Claude Sonnet 4.6, ~$0.01/Q&A-тёрн, ~$0.6–1.3 cost-per-paid-user-month → COGS 10–30% от £3–8/мес (≤10% на Haiku-гибриде). Inference не ограничивает прайсинг ([06](06-tech-claude-vision-extraction.md)).
7. **Платформа — Expo (React Native), не PWA.** PWA на iOS убита тремя фактами: нет Web Share Target (флоу «переслал оффер из Mail» невозможен), push только после ручной установки, нет Face ID. Share-in — половина wedge-сценария ([07](07-tech-ios-pwa-vs-native.md)).
8. **RAG для wedge не нужен.** Документ целиком влезает в контекст Claude (1M токенов); pgvector/hybrid search — только для cross-vault Q&A и KB consumer rights (фаза 2). Стек MVP: Supabase (eu-west-2 London) + FastAPI + Claude API ([08](08-tech-rag-backend.md)).
9. **Биллинг — главное минное поле категории.** Rocket Money, Cleo (FTC-иск, $17M), Emma (£83.99 мимо Apple) тонут в 1★ из-за отмены/списаний. Decode: только Apple IAP, free без карты, напоминание до конца триала, отмена в 2 тапа. Цена £4.99/мес — центр UK-коридора (Little Birdie £2.99 < Decode < Snoop £5.99 < Emma Pro £9.99) ([01](01-competitors-subscription-trackers.md), [02](02-competitor-review-mining.md)).
10. **Самая горячая боль — не BNPL, а insurance auto-renewal** (⚠️ не подтверждено): 43% видят рост цены при продлении (в среднем +£35), отключить продление искусственно сложно. Renewal Radar — не «фича при Vault», а равноправный wedge-кандидат; решение по сегменту — задача фазы product analysis ([11](11-users-pain-points.md)).

---

## 2. Конкурентный ландшафт

| Конкурент | Рынок | Как добавляются обязательства/доки | Pricing | Чем Decode отличается |
|---|---|---|---|---|
| **Emma** (лидер UK) | UK | Open Banking, авто-детект recurring | Free (2 банка); Plus £4.99 / Pro £9.99 / Ultimate £14.99/мес | Без bank link; видит условия ДО списания, а не транзакции после |
| **Snoop** (Vanquis) | UK | Open Banking; флаги повышения цены | Free; Plus £5.99/мес | Без bank link; понимает документы, а не bank feed; не switching-рефералки |
| **Little Birdie** | UK | Manual + Open Banking (Plus); renewal/trial/price alerts, click-to-cancel | Free; Plus £2.99/мес (3.7★/39 оценок — нет traction) | Радар как следствие понятого документа, не ручная настройка; урок: standalone-алерты не продаются |
| **Nous** (ближайший по духу) | UK | Email-connect / upload bills; AI-summary счетов; следит за окончаниями контрактов | Free (2 услуги); Premium £6.99/мес | Nous = household bills + switching-комиссии; не трогает credit/BNPL, нет true cost / trap detection. Валидирует UK WTP £6.99/мес |
| **Rocket Money** | US only (нет в UK) | Bank link (Plaid) | Free; Premium ~$7–14/мес; negotiation fee 35–60% от сэкономленного | В UK недоступен; постфактум-модель; у Decode нет скрытых fee |
| **Cleo** | US (UK-founded, «eyes return») | Bank link; AI-чат о транзакциях | Free; $5.99–14.99/мес | AI Cleo говорит о транзакциях, не о документах. Watch item: возврат в UK = риск share of voice «AI + деньги» |
| **Bobby** | глобально, iOS | Только manual | Free до 5; one-time £0.99–2.99 | Privacy Bobby + автоматика через камеру; Bobby = «app does nothing» |
| **Finny / ReSubs** | глобально (крошечные) | AI-вход: фото/скриншот/голос → запись | $1.99–4/мес, lifetime $30 | AI у них = data entry, не понимание (нет summary/true cost/traps/Q&A). Валидируют capture-флоу; скорость выхода имеет значение |
| **Adobe Acrobat AI Assistant** (самый опасный сосед) | глобально, mobile | PDF в Reader; contract intelligence, citations | $4.99/мес add-on | Generic contract, нет финматематики, нет lifecycle; юнит Adobe — документ, юнит Decode — обязательство во времени |
| **ChatPDF / Humata / AskYourPDF** | web | Upload PDF → чат | $9.99–19.99/мес | Документ «умирает» после чата; нет камеры, математики, trap-базы, радара |
| **Legalese Decoder / AI Lawyer / Clarivo / App Store long tail** | web/iOS | Upload/скан → plain English, risk score | $5.99–7.99/нед (dark pattern) | Generic legal, weekly-биллинг-ловушки, ноль traction; Clarivo ближе всех по loop'у, но без финансового домена |
| **ChatGPT** (нулевой конкурент) | глобально | Фото в чат | Free | Нет персистентности, детерминизма, UK trap-базы, radar'а, проверяемых citations |

**Вердикт по позиционированию.** Дыра — пересечение трёх осей, где пусто: (1) **pre-commitment момент** (все включаются ПОСЛЕ подписания), (2) **понимание vs экстракция** (AI-трекеры извлекают «merchant, amount», никто не объясняет и не считает), (3) **no bank link + автоматика** (сегодня «без банка» = «вручную»). Позиционирование: **"Understand & watch your commitments — no bank connection needed"** — в UK ни с кем не сталкивается лоб в лоб. Риск не «задавят», а «придётся объяснять категорию» — вести онбординг от боли (Adobe: ~70% потребителей подписывали контракты, не зная всех условий). Угрозы по убыванию: Nous (если расширится в credit), ReSubs/Finny (могут дорастить «объяснение»), Adobe (mobile + citations уже есть), Cleo (возврат в UK).

---

## 3. Каталог trap types (сырьё для Trap Detector)

Из [10-market-uk-bnpl-credit.md](10-market-uk-bnpl-credit.md), отсортировано по цене ошибки в £. Формулировки-маркеры — как они выглядят в реальных документах (сырьё для few-shot промптов / классификатора). Severity для UI: **HIGH** = красный, **MED** = жёлтый, **INFO** = серый.

| # | Trap | Цена ошибки | Формулировки-маркеры в документе | Severity |
|---|---|---|---|---|
| 1 | **Нет Section 75 protection** (BNPL до 15.07.2026 — и навсегда для merchant-credit) | До **£30,000** (вся стоимость покупки при банкротстве ритейлера/недоставке) | `unregulated credit`, `fewer protections than ... a regulated credit agreement`, `not regulated by the Financial Conduct Authority`, `exempt agreement` (PayPal пишет это прямо) | HIGH |
| 2 | **Credit file reporting** — неравномерно по провайдерам | Missed-marker живёт **6 лет**; ~50–100 пунктов скора; худшая ставка/отказ по ипотеке (тысячи £) | `we may share information ... with credit reference agencies`, `report ... as overdue to the credit reference agencies`, `may affect your credit rating` | HIGH |
| 3 | **Deferred / backdated interest** (Argos Card, каталоги) | **£150–200+** на товаре £600 @34.9% APR — если недоплатить хоть £1 к концу промо | `interest will be charged from the date of purchase`, `deferred interest`, `if you do not pay the full cash price before the end of the plan` | HIGH |
| 4 | **0% конвертируется в interest-bearing** (Monzo Flex) | **+£248** на £1,000/24 мес (Klarna Financing 21.9%); Monzo: пропуск платежа → принудительно 24 мес @29% APR | `switching 3, 6 or 12 monthly payments to 24 monthly payments at 29% APR`, `we may convert your plan` | HIGH |
| 5 | **Minimum payment / persistent debt** | 20+ лет выплат; ~4 млн счетов UK в persistent debt | `minimum payment`, `1% of your balance plus interest`, `if you only make the minimum payment, it will take you longer and cost you more` | HIGH |
| 6 | **Debt collection referral** (молчание checkout'а) | 1 из 10 BNPL-юзеров у коллекторов; 96% — негативные последствия | `we may use a debt collection agency to recover amounts owing`, `passed to a debt recovery agency` | HIGH |
| 7 | **Early settlement: до 58 дней лишнего интереса** | **~£210** на остатке £12,000 @10.9% | `settlement figure`, `rebate on early settlement`, `28 days after`, `58 days' interest` | INFO |
| 8 | **Потеря 0% promo при просрочке** (0%/BT-карты) | Баланс по 25–35% + BT fee 3–5% | `we may withdraw your promotional rate if you miss a payment`, `the promotional rate will end`, `balance transfer fee of 3%` | MED |
| 9 | **Insurance auto-renewal / loyalty penalty** (adjacent wedge) | В среднем **+£35**/renewal; в историях +50–100% (£500+); £1.2 млрд/год переплат до запрета price walking | `your policy will automatically renew`, `unless you tell us otherwise`, `renews for a further 12 months` | MED |
| 10 | **CPA — автосписания с любой карты** (Clearpay, Klarna) | Unarranged overdraft; «сдвоенный» платёж после фейла (Klarna: `the amount due for the missed payment will be added to the next scheduled payment`) | `continuous payment authority`, `automatically deduct payments`, `we may make multiple attempts on each payment method` | MED |
| 11 | **Late fees BNPL** | £5–24/заказ; £39 млн/год по сектору (Citizens Advice, 2021). **Klarna (исправлено верификацией):** £5 для заказов ≥£20, до £20 — 25% от цены заказа; взимается, если инстолмент не оплачен **в течение 14 дней** после срока 2-го/3-го платежа; **max 1 fee на инстолмент** (эффективно 2 на заказ); не взимается при остатке <£1. Clearpay: £6+£6, cap min(25%, £24). Zilch: нет, но Snooze £1.50. PayPal: нет (но банковский NSF) | `late fee`, `a further £6 late fee will apply`, `capped at 25% of the purchase price` | MED |
| 12 | **«Звёздочки» на маленьких заказах** | Late fee 25% от заказа за 2–4 недели = сотни % годовых (Klarna <£20, Clearpay <£24) | производное от условий late fee — показывать fee как % от заказа | MED |
| 13 | **Default charges по картам выше £12** | Бенчмарк OFT 2006: >£12 — potentially unenforceable, можно reclaim за 6 лет | `default charge`, `late payment fee of £12`, `returned payment fee` | INFO |
| 14 | **Representative APR (правило 51%)** | До 49% одобренных получают ставку выше; рынок: кредитки ~36.8% avg, store cards 30–40% (Frasers Plus 39.9%) | `Representative APR ... (variable)`, `Representative example`, `the rate you are offered will depend on your individual circumstances` | INFO |

**Выводы для движка:** (а) trap detector = таблица правил + AI-матчинг формулировок, severity и £ — детерминированно; (б) true cost = три worst-case расчёта: late-fee worst case, deferred interest «если недоплатите £1», конверсия 0%→29% «если пропустите 1 платёж» — шок-эффект (б) и (в) = главный wow; (в) детектор обязан датировать договор (до/после 15.07.2026) и определять кредитора (third-party vs merchant) — от этого зависят s75/FOS; (г) самая дифференцирующая микрофича — бинарный бейдж **"Goes on your credit file: YES / NO / only if collections"** (Klarna → Experian+TransUnion, Clearpay → нет, Zilch → все 3 CRA) — этого не делает никто.

---

## 4. Боли пользователей — топ-5

Из [11-users-pain-points.md](11-users-pain-points.md). *⚠️ Весь раздел не подтверждён независимой проверкой — verbatim-цитаты и статистику перепроверить перед использованием в лендинге/питче.*

| # | Боль | Оценка (частота × сила) | Реальные формулировки | Триггер-момент |
|---|---|---|---|---|
| 1 | **Insurance auto-renewal: рост цены + невозможность отказаться** | 5×5 | *«My renewal price had doubled from last year»*; *«It was already set to auto renew, big mistake»*; *«15 minutes going in circles with the ai voice responses»*; пользователь MSE заявил карту как «lost or stolen», чтобы остановить CPA | Пришло renewal-письмо с новой ценой (календарный, предсказуемый — Decode ловит за 2–4 недели) |
| 2 | **Forgotten subscriptions / trials** (£688 млн/год UK на неиспользуемое — Citizens Advice) | 5×4 | *«Quarterly charges… so I missed it because I don't check every month»* (£316 через budget app); *«this bankrupted me»* (студент, £100); *«There was absolutely no warning the subscription was going to renew»* | Неожиданное списание / незнакомый платёж в выписке → гуглит «how to cancel / refund» |
| 3 | **BNPL surprises: fees, credit score, collectors** | 4×5 | *«I have no idea how any of this works, I'm only a uni student»*; *«£500 due in its entirety this month»* (наложение pay-in-3); *«2+ года ни одного уведомления, потом сразу коллекторы»*; *«I didn't think it was proper borrowing»* (5.7 млн человек) | BNPL-checkout («is this proper borrowing?»); перед mortgage-заявкой; письмо коллектора |
| 4 | **Непонимание contract terms перед подписанием** (72% не читают/не понимают T&C — Baringa) | 5×3 (латентная) | *«I was scared and ignored it for 6 months»* (default в 18 лет → 4 года коллекторам); *«they want you to call them in order to be able to cancel»* (EE) | Момент подписания (gym, lease, PCP, кредит) — Decode как «второе мнение до подписи» |
| 5 | **Price creep mid-contract** | 4×2 | *«every renewal the price goes up»*; лишь 12–16% telecom-клиентов понимали inflation-linked повышения | Сравнение выписки; renewal-письмо |

**Для сегментации:** максимальная боль — молодые (18–25) BNPL-пользователи (для них ценность = защита от необратимого: credit file, коллекторы) и «life admin avoiders» с renewal-болью. **Для тона:** пользователи пишут *«please no judgements»* — копирайт не стыдит, фрейминг «уловили за вас»: *«We spotted this before it cost you anything»*. **Seed-вопросы для Q&A:** «Will this affect my credit score?», «Will this show up on my mortgage application?», «What happens if I miss one payment?», «Can they take money if I cancel my card?».

---

## 5. Regulatory red lines (UK/FCA)

*⚠️ Раздел опирается на [09-market-uk-fca-boundary.md](09-market-uk-fca-boundary.md), ключевые утверждения которого не подтверждены независимой проверкой. Перед запуском обязателен compliance-review у UK-юриста. BNPL-хронология (15.07.2026) согласована независимо в [01](01-competitors-subscription-trackers.md), [03](03-competitors-ai-document-tools.md), [10](10-market-uk-bnpl-credit.md) — ей доверие выше.*

**Рамка:** в UK нет общей регулируемой деятельности «advising on consumer credit». Опасные зоны: **debt counselling** (советы о ликвидации существующего долга), **credit broking** (интродукции к лендерам, "preparatory work"), **financial promotions** (s.21 FSMA: «invitation or inducement»). Ключевая асимметрия: **pre-signature анализ оффера = про "incurring debt" → вне debt counselling** (PERG 17.7 ex.4); post-signature Q&A («гасить ли досрочно?», «какой долг платить первым?») = регулируемая зона. «Это сказал AI» — не защита: FCA technology-agnostic.

**Практические правила копирайта по фичам (в промпты + output-фильтр):**

| Фича | ✅ Можно (information) | ❌ Нельзя (advice/broking/promo) |
|---|---|---|
| Summary | «This is a credit agreement for £400 over 6 payments. Late payments incur a £12 fee.» | «This is a bad deal», оценочные эпитеты о решении |
| True cost | «Total you will repay: £X — that's £Y more than the cash price» (организация данных самого документа) | «You can't afford this» (оценка affordability) |
| Trap detector | Факт + рыночный бенчмарк с датой: «This contract contains a £12 late fee; typical UK range is £5–10 (as of June 2026)». Показывать и «зелёные» пункты (симметрия против «селекции с value judgment») | «Don't sign because of this clause», «predatory», скоринг, читающийся как «откажись» |
| Q&A | Факты с source highlighting; на «what should I do?» — generic options + «the choice is yours» + signposting MoneyHelper/StepChange | Прямые ответы на «should I pay off early?» / «which debt first?» / «switch to Z?» |
| Renewal Radar | «£X due on [date]», «Your fixed rate ends on [date]» | Приоритизация платежей между долгами («pay this one first») |
| Benchmarking | Агрегаты («average across major providers», с датой) | Именованный продукт-альтернатива + CTA = broking/promo |

**Жёсткие инварианты MVP:** no product links, no affiliate, no "apply" CTAs; запрещённые паттерны в UI и LLM-выводе: *"you should", "we recommend", "don't sign", "switch to", "best/worst deal"*. Q&A обязан распознавать вопрос-рекомендацию и переключаться в режим options + signposting. Стандартный дисклеймер (паттерн MSE+ClearScore): *"Decode explains what's in your documents. It doesn't give financial advice and doesn't know your full financial situation. Decisions are yours. If you're struggling with debt, free help is available at MoneyHelper / StepChange"* — onboarding + футер результата, не мелкий шрифт. P3-фичи (cancel/switch assist): для энергии/телекома/подписок — вне FCA-периметра (модель Nous), для кредитов/страховок — нужна авторизация/AR/партнёр. Письменно фиксировать периметр-анализ по каждой фиче.

**Смежные требования платформ:** Apple guideline **5.1.2(i)** (ноябрь 2025) — explicit consent на шеринг данных с third-party AI **с именем провайдера (Anthropic)** до первого скана; **5.1.1(ix)** — production-публикация от юрлица; позиционирование «document decoder», не «money management» (3.2.1(viii)) ([07](07-tech-ios-pwa-vs-native.md)). UK GDPR: DPIA перед запуском, retention policy, Supabase eu-west-2 + DPA/UK addendum, ZDR с Anthropic ([08](08-tech-rag-backend.md)).

---

## 6. UX-паттерны для wireframes (по будущим экранам)

Синтез [04](04-ux-ai-trust-patterns.md), [05](05-ux-document-capture.md), [12](12-mobbin-capture-flows.md)–[16](16-mobbin-alerts-reminders.md).

### 6.1 Capture (камера / share-in / upload)
- **Камера = VisionKit-паттерн:** полноэкранный тёмный viewfinder, live-подсветка найденного документа, **auto-capture по умолчанию + тумблер Auto/Manual**, одна строка инструкции над шаттером, миниатюра-счётчик страниц у шаттера (multi-page = Combine-семантика: кредитный договор — один документ). Референсы: [Docusign](https://mobbin.com/flows/c97aad30-7ffa-4942-bde1-56a8f83b066a), [Apple Notes](https://mobbin.com/flows/2e8a3323-9acd-42a7-8514-5ea837aebee2).
- **Bottom sheet входов:** `Снять на камеру / Выбрать фото / Выбрать файл (PDF)` + лента последних фото + примеры типов документов. Референсы: [Alan](https://mobbin.com/screens/567326d5-369b-4876-90fd-d2b46a0410af), [ChatGPT](https://mobbin.com/flows/3c3ad4cf-15fb-49a8-afa0-d396f3605bf8).
- **Share extension** (равноправный вход, только нативно): мини-шит с превью + одна CTA «Decode it»; выбор папки Vault — после результата. Референс: [Fabric](https://mobbin.com/screens/d4e8e186-a1a4-4229-a34e-35500a660741). Email-in (паттерн [Fi](https://mobbin.com/screens/85873190-10ce-4079-8267-c09316bfb393)) — фаза 2.
- **Crop — только как fallback** (если авто-детекция не уверена): лупа при перетаскивании угла + кнопка `Detect`. Референс: [Alan crop](https://mobbin.com/screens/b4b732bf-6bdb-41a9-83fb-364bc2c54279).
- **Error recovery:** конкретная диагностика + пары картинок «плохо ✗ / хорошо ✓» (glare/blur/край) + Try again + escape hatch «ввести вручную». Референсы: [Chime](https://mobbin.com/screens/b5f8b32b-2309-426f-9dbc-5007eaf680ef), Starling Bank ([05](05-ux-document-capture.md)). Quality-гейт ДО отправки в AI обязателен — фейл по смазанному фото пользователь спишет на «тупой AI».

### 6.2 Processing
- **Паттерн Yazio:** фото документа остаётся на экране + scan-line + **skeleton будущей карточки результата** под ним. Референс: [Yazio](https://mobbin.com/screens/8bc58495-13fe-4587-963d-5a3b68553560).
- **Этапный прогресс (labor illusion, HBS 2011):** «Reading document → Extracting key terms → Calculating true cost → Checking for traps» — этапы реальные (совпадают с SSE-событиями пайплайна). Референсы: [Lovi](https://mobbin.com/screens/d87832ec-d479-4d9a-ab7c-36cee99c6005), [Linktree](https://mobbin.com/screens/7e370793-4b21-4992-8738-e417d3ce22dc).
- **Бюджеты:** summary first token ≤ 8 c (стримится первым), полный разбор ≤ 20 c секциями; пустой спиннер дольше ~3 c запрещён. Антипример — Expensify (минуты-часы) и декоративный AI-loading Instagram.

### 6.3 Decode-result (главный экран продукта)
- **Структура по Yuka:** фото + имя оффера + вердикт (число/цвет/слово: «True cost: £412 — High»), список key terms с цветными риск-лейблами и (i), безопасные термины схлопнуты («6 terms look standard ⌃»). Референс: [Yuka](https://mobbin.com/screens/3e160990-7c3e-4f13-bf1b-25ca9f60b2c7).
- **Три источника истины — три визуальных языка** (главный паттерн всего ресёрча, [04](04-ux-ai-trust-patterns.md)): «From your document» (extraction, детерминированная подсветка по tap), бейдж **«Calculated, not AI»** (true cost engine), «AI» (summary/Q&A — с маркировкой и контекстным actionable-каверком «tap any term to see it in your document»). Глобальная плашка «AI may be wrong» не работает (RCT-доказано).
- **Confidence — категориально, не проценты:** «✓ from document» (молча) / «Check this» (жёлтое, tap → zoom + guided correction) / «Couldn't read» (честный missing + пересканировать). Правка значения мгновенно пересчитывает true cost.
- **Aha-момент по Plum:** после первого скана сначала ОДНО число («True cost: £1,247 — that's £319 more than the headline price»), потом разворот в карточку. Референс: [Plum](https://mobbin.com/flows/18ade3b7-194a-4f37-a165-67940ccdb8bb).
- **Trap-тон «спокойный эксперт»:** факт + цена в £ + 1–2 next step, severity порядком/количеством, не кроваво-красной типографикой. Feedback: thumbs up/down + «Wrong?» ([Lovi](https://mobbin.com/flows/12e8692d-5da8-40a3-a51d-a48d2d39fa8a)).
- **Q&A:** шторка поверх документа с названием оффера ([ElevenReader](https://mobbin.com/screens/6820bde5-a6b5-490d-a172-8cb16463f97b)); 3 чипа-подсказки из найденных trap-флагов ([Grok](https://mobbin.com/flows/1fdf3416-da7c-49f1-b9be-8f481dc6f586), [Me+](https://mobbin.com/screens/a7b81fe1-3bb4-42ff-ac61-9a528ca0dc76)); двухуровневые citations «p.2 §4» → bottom sheet с подсвеченным фрагментом ([ChatGPT](https://mobbin.com/screens/a4030d26-a7d6-4f91-8277-8a15b8dabae6), [Gemini Evidence](https://mobbin.com/screens/449ffd04-1038-4da5-b590-0ebedb5b60ce)); честное «This isn't specified in your agreement» вместо галлюцинации; verbalized uncertainty («I think… — double-check the highlighted line») вместо процентов. Чат всегда скоуплен на документ (модель NotebookLM), не general assistant.

### 6.4 Cockpit / Home
- **Headline «сколько я должен» + временные срезы** ([Afterpay](https://mobbin.com/screens/1256bb0e-c477-4d46-80b6-29be1cc9f12b)): «Committed this month: £214» + колонки «Due in 7 / 30 / 60 days» — считается детерминированно, без банка.
- **Двойная метрика count + total с тогглом month/year** ([Orbit](https://mobbin.com/flows/e0d2902c-4de8-4584-856f-c2972b802519)): «6 commitments — £86/mo ⇄ £1,032/yr».
- **Секции по статусу с субтоталами:** «Trials ending» / «Renewing soon» / «Active» / «Decoded, no action». Анатомия строки: иконка типа + имя + «Renews in 4 days • 28 Nov» (относительная И абсолютная дата) + сумма + слот для ⚠︎ trap-флага.
- **Savings-фрейминг копирайта** ([Rocket Money](https://mobbin.com/screens/301a0b9c-d67a-4a7b-b154-23a57f864940)): «Detected N traps costing you £X a year».
- Избегаем: bank-link механики, промо-баннеров на главной, перегруза графиками, тёмной геймификации (для UK-доверия — спокойный «банковский» стиль Wise/Apple Wallet).

### 6.5 Vault
- **Деталка обязательства как bottom sheet** ([Orbit detail](https://mobbin.com/flows/d7c17e15-d253-4903-b667-ca73cc24eae0)): key-value строки (каждая → source highlight в документе), блок Notes («cancel before renewal»), Price History с дельтой; CTA-пара: основное действие + тихий деструктив.
- **Авто-сохранение и авто-именование:** «Klarna BNPL offer — 14 May 2026», не «Scan 47.pdf»; сразу — предложение дат для Radar («Promo rate ends 14 Nov — remind you?») — шов «Scan → Watch».
- **Empty state = guided action:** «Scan your first document — see its true cost in 30 seconds»; каждый пустой экран обязан содержать кнопку Scan (антипаттерн-тупик Yazio). Референс: [Fabric](https://mobbin.com/screens/8a7fc6ee-52a6-4b54-843d-d8c540ac5d4a).
- Face ID на Vault (`expo-local-authentication`) — дешёвый сильный trust-сигнал ([07](07-tech-ios-pwa-vs-native.md)).

### 6.6 Radar / Alerts
- **Анатомия alert-карточки = Uber One** ([Uber Eats](https://mobbin.com/screens/187ba480-60f6-4c72-ade2-8dd72fd53e55)): [что случится] + [через сколько] + [точная сумма и дата] + [одна CTA]: «Boiler cover renews in 14 days — you'll be charged £312 on 24 Jun» → «Review terms».
- **Двухслойный радар = Rocket Money Recurring** ([flow](https://mobbin.com/screens/01d9cc58-851a-4e29-9b1b-a6f0bef3b85d)): мини-календарь «Coming Up» + список «Coming Later»; **«all clear»-состояние** ([Apple Wallet](https://mobbin.com/screens/82a32fee-bf5f-4c39-b4b8-0e002de68d4c)): «Nothing needs attention until 28 June ✓».
- **Price increase alert — whitespace, собираем сами:** insight-карточка «мы заметили → было £9.99 → стало £12.99 (+30%) → решение» ([Hyundai Card](https://mobbin.com/screens/27eb92dd-a4d0-4455-85ec-7f4929ad78f2)) + «Why?» с source highlighting строки письма.
- **Reminder-пикер с конкретными датами** ([Opal](https://mobbin.com/screens/9abbc18a-1b2a-4f57-8e1f-755f50951135)): «2 days before — March 7»; обещание напоминания в момент скана с inline-тумблером ([Calm](https://mobbin.com/screens/d3a2e8d0-30b8-461f-8941-093453cc209a)).
- **Настройки = Tabby + Runna** ([Tabby](https://mobbin.com/screens/9a6c728b-eb31-441d-8f57-23bc238a2d36)): «Renewals & deadlines» locked-On, «Tips & news» off по умолчанию, lead-time в категории, banner-state системного разрешения. Радар показывает не только дату, но и **сумму списания** (включая удвоенные после фейла — CPA-ловушка) + ссылку на исходный документ. Локальные scheduled notifications как база (работают офлайн), серверный push — второй слой.

### 6.7 Onboarding
- **Welcome по Wise/Plum:** одно обещание («Understand any financial document in 30 seconds»), сабтекст «Built for the UK. No bank connection required.», CTA «Scan your first document» + Sign in with Apple. Максимум 3 слайда до первого действия. Референсы: [Wise](https://mobbin.com/flows/8853035c-aba6-493c-81bf-bb06d2f4f0fc), [Plum](https://mobbin.com/flows/18ade3b7-194a-4f37-a165-67940ccdb8bb).
- **Слайд с мокапом результата** ([Fabric](https://mobbin.com/screens/602199e5-28cc-41e5-bdb2-d39754852566)) — продукт показан до регистрации; **отдельный слайд доверия** ([Plazo](https://mobbin.com/screens/e7a16b63-5d32-4a7f-ba73-d756c3bb9266) + копирайт [Splitwise](https://mobbin.com/screens/a07716e4-4880-442f-be65-0c8409a5c09d)): no bank connection / encrypted / «we never sell your data» + **AI-consent с именем Anthropic** (требование Apple 5.1.2(i)).
- **Permissions раздельно и в момент ценности:** камера — pre-permission экран перед первым сканом с fallback «Upload from Photos» ([Alan](https://mobbin.com/screens/61f5f316-3f0b-4e90-aaa3-729b64df4f34), [Yuka](https://mobbin.com/screens/03674a02-7ef8-4b4c-b3ef-b2498fc15ce3)); пуши — ПОСЛЕ первого скана, с мокапами уведомлений на данных только что отсканированного документа ([Linktree](https://mobbin.com/screens/3a8a4ec3-2009-438a-944e-cf12384a0647), [Fixtured](https://mobbin.com/screens/fac12af3-b7ad-4ea7-a2ef-ab09e53a3d37)).
- **Freemium-квота в камере** («2 scans left», [Lovi](https://mobbin.com/flows/12e8692d-5da8-40a3-a51d-a48d2d39fa8a)) — лучшая точка апсейла, чем paywall до камеры; **setup-чеклист «Get protected»** после первого скана ([Linktree](https://mobbin.com/screens/81665091-4921-4301-8526-abc5c80149af)).
- Избегаем: карусель >3 слайдов, оба permissions подряд, wizard-настройки до ценности, мокапы системных диалогов.

### 6.8 Сводная карта: core loop → экран → паттерн → референс

| Шаг loop | Экран (sitemap-кандидат) | Ключевой паттерн | Главный референс |
|---|---|---|---|
| Scan: вход | Home / «+» | Bottom sheet 3 входа + recent photos | Alan, ChatGPT ([12](12-mobbin-capture-flows.md)) |
| Scan: камера | Camera | Auto-capture + live-подсветка + multi-page внутри камеры | Apple Notes, Docusign ([12](12-mobbin-capture-flows.md)) |
| Scan: confirm | Review | Превью + Retake/Add page; crop только как fallback | Dropbox, Alan ([12](12-mobbin-capture-flows.md)) |
| Understand: ожидание | Processing | Фото + scan-line + skeleton + реальные этапы | Yazio, Lovi ([12](12-mobbin-capture-flows.md)) |
| Understand: результат | Decode-result | Yuka-схема + три источника истины + aha-число | Yuka, Plum ([14](14-mobbin-ai-explanation.md), [15](15-mobbin-onboarding.md)) |
| Understand: коррекция | Decode-result (inline) | Confidence-категории + guided correction + пересчёт | Expensify, Splitwise ([12](12-mobbin-capture-flows.md)) |
| Decide: вопросы | Q&A sheet | Чипы-подсказки + citations + честный отказ | Grok, ChatGPT, Gemini ([14](14-mobbin-ai-explanation.md)) |
| Watch: сохранение | Vault | Авто-имя + предложение дат для Radar | Orbit detail ([13](13-mobbin-fintech-home.md)) |
| Watch: радар | Radar / Alerts | Uber One-карточка + двухслойный список + «all clear» | Uber Eats, Rocket Money, Apple Wallet ([16](16-mobbin-alerts-reminders.md)) |
| Watch: обзор | Home / Cockpit | Headline + срезы 7/30/60 + секции по статусу | Afterpay, Orbit ([13](13-mobbin-fintech-home.md)) |
| Ошибки везде | Error states | Диагностика + плохо/хорошо + ручной fallback | Chime, Starling ([12](12-mobbin-capture-flows.md), [05](05-ux-document-capture.md)) |

---

## 7. Рекомендованный стек

| Слой | Решение | Обоснование |
|---|---|---|
| **Shell** | **Expo (React Native)**, managed workflow + EAS Build free tier (15 iOS-билдов/мес); demo через TestFlight ($99/год Apple Developer) | Вердикт [07](07-tech-ios-pwa-vs-native.md): PWA на iOS закрыта тремя жёсткими фактами — нет Web Share Target (share-in из Mail невозможен), Web Push только после ручной установки, нет Face ID. Share extension (`expo-share-intent`), камера (`expo-camera`, vision-camera в backlog), локальные notifications для Radar — всё закрывается. Web — только landing + upload-демо |
| **AI** | **Claude Sonnet 4.6** (extraction + Q&A), Haiku 4.5 — cost-down после eval, Opus 4.8 — эскалация сложных доков. Structured outputs (extraction) + Citations (Q&A) — **два отдельных вызова** (несовместимы в одном, API 400); prompt caching (system+document); Batch API (−50%) для eval/backfill | [06](06-tech-claude-vision-extraction.md): нативный PDF (text+vision), без OCR-вендора. **$0.05–0.09/документ, ~$0.01/Q&A-тёрн, ~$0.6–1.3/платный юзер/мес** → COGS 10–30% от £3–8/мес. Числа считает НЕ LLM: extraction >90% достижим, арифметика LLM ненадёжна → детерминированный true-cost engine подтверждён исследованиями. Для фото-пути citations не работают → подсветка поверх транскрипции (заложить в дизайн Q&A) |
| **Backend** | **Supabase Pro $25/мес (eu-west-2 London):** Auth (Sign in with Apple) + Storage + Postgres + RLS; **FastAPI** AI-сервис в Docker (Hetzner+Coolify-паттерн); SSE-стриминг этапов пайплайна; async task + jobs-таблица (без очереди); cron для Radar | [08](08-tech-rag-backend.md): **RAG для wedge не нужен** — документ целиком в 1M-контекст; pgvector/hybrid (RRF + contextual retrieval) — только для cross-vault Q&A и KB consumer rights (фаза 2, вырезается из MVP). SOC 2 + DPA/UK addendum (ICO-approved) закрывают UK GDPR; ZDR с Anthropic — privacy-стори |
| **Качество** | Golden set 30–50 размеченных UK-документов, field-level F1, код-assertions (не LLM-judge) для extraction, прогоны через Batch API; детерминированные кросс-проверки (monthly × term ≈ total) | Eval-set = инженерный гейт + артефакт портфолио; решение Haiku vs Sonnet принимается цифрами |
| **Pricing** | Freemium: free = N сканов/мес + 1–2 наблюдаемых обязательства, без карты; paid **£4.99/мес** (годовой −30%), только Apple IAP | Коридор UK: Little Birdie £2.99 < Decode < Snoop £5.99 < Nous £6.99 < Emma Pro £9.99; биллинг-гигиена = анти-паттерны конкурентов ([02](02-competitor-review-mining.md)) |

---

## 8. Риски — топ-5

| # | Риск | Митигация |
|---|---|---|
| 1 | **Регуляторный (FCA): Q&A/Vault сползает в debt counselling; AI-«советчики» на радаре FCA** (Perimeter Report 2026, Mills Review). ⚠️ Сам периметр-анализ не верифицирован | Compliance-review у UK-юриста ДО запуска; intent-классификатор «вопрос-рекомендация» + безопасный шаблон ответа; запрещённые паттерны в промпте И output-фильтре; письменная документация периметра по каждой фиче; design-инвариант: no links/affiliate/CTAs |
| 2 | **Ошибка в числах = мгновенная потеря доверия** (галлюцинации VLM на бликах; numeric values — самый уязвимый тип фактов) | Детерминированный движок отдельно от LLM (+ бейдж «Calculated, not AI»); verbatim+confidence в схеме; кросс-проверки; честный UX «Couldn't read — retake»; quality-гейт до анализа; eval-сет с регрессионным гейтом |
| 3 | **Категорию придётся объяснять; ChatGPT-субститут бесплатен** | Onboarding от боли (70% подписывают не понимая — Adobe); aha-момент = одно шок-число первого скана; дифференциация: детерминизм + UK trap-база + Vault/Radar; запуск на инфоповоде 15.07.2026 |
| 4 | **Конкуренты закрывают дыру:** Nous расширяется в credit; ReSubs/Finny доращивают «объяснение»; Cleo возвращается в UK; Adobe уже на mobile с citations | Скорость выхода wedge; глубина UK trap-базы (right-таблица провайдеров — данные собраны); loop целиком (понимание → обязательство), который соседям нужно строить с нуля; watch-list в product analysis |
| 5 | **App Store review финкатегории:** 5.1.1(ix) юрлицо, 5.1.2(i) named-AI consent, граница 3.2.1(viii) «money management» | Позиционирование «document decoder» в метаданных; AI-consent экран с именем Anthropic в onboarding; для portfolio-demo — TestFlight с personal-аккаунта; organization-аккаунт + D-U-N-S к production |

Биллинг-риск (главный убийца рейтингов категории) снимается дёшево и полностью: Apple IAP only, free без карты, напоминание до конца триала, отмена в 2 тапа — фиксируется как продуктовый принцип ([02](02-competitor-review-mining.md)).

---

## 9. Открытые вопросы к фазе product analysis

1. **Какой wedge первичен для сегментации:** BNPL/credit offers (18–25, защита от необратимого, тайминг 15.07.2026) vs insurance auto-renewal (старше, выше частота и WTP, боль 5×5)? Данные [10](10-market-uk-bnpl-credit.md) и [11](11-users-pain-points.md) тянут в разные стороны — нужен выбор сегмента и primary JTBD.
2. **Renewal Radar: следствие скана или равноправный вход?** Урок Little Birdie (standalone-алерты не продаются) vs боль №1 (renewal-письма). Влияет на sitemap: что на home — cockpit или результат последнего скана.
3. **Free tier: сколько сканов/мес и что именно за paywall** (Vault-объём? Radar по всем датам? unlimited Q&A?), чтобы free давал завершённый акт ценности (анти-Emma), но конвертил.
4. ~~**Верификация опровергнутых/неподтверждённых фактов**~~ → **ЗАКРЫТО проходом 2026-06-14** (§0.5): треки 09/11 верифицированы ([09b](09b-fca-boundary-verified.md), [11b](11b-user-pains-verified.md)), trap-каталог по всем провайдерам прогнан ([10b](10b-trap-tc-corpus.md)). Остаточно: compliance-review у юриста до запуска; мониторинг CP26/15 (due 17.06.2026).
5. **Документ-тип №2 после credit/BNPL:** insurance renewal letters (боль №1, но FCA insurance distribution на P3) vs subscription letters (проще, DMCC-окно до осени 2026)?
6. **Активация без документа в руках:** что показывает первый запуск, если у пользователя нет оффера прямо сейчас (demo-документ? скан старого письма? checklist Orbit-стиля)?
7. **Метрики продукта:** что считать activation (первый скан? первый «aha» true cost? первый reminder?) и North Star (decoded documents? watched commitments? £ предотвращённых потерь?).
8. **Программа пользовательских интервью:** боли собраны из форумов/отзывов (вторично, ⚠️ не верифицировано) — нужны 5–8 discovery-интервью UK-пользователей BNPL/renewal для проверки JTBD до wireframes.

---

## Приложение А. Стат-пакет для лендинга / питча / онбординга

Цифры с указанием источника и статуса верификации. **Обновление 2026-06-14:** все 7 load-bearing цифр сверены по первоисточникам — авторитетные per-stat статусы, точные даты и оговорки в [11b-user-pains-verified.md](11b-user-pains-verified.md) §«Что можно/нельзя публично». Кратко: ⚠️-метки ниже сняты для FCA Financial Lives (10.9m/20%), £688m (CA 2024), 72% (Baringa 2022), 43%/+£35 (Which? 2022) — confirmed; «1-in-10»/«5.7m» — confirmed, но **2021** (датировать); «51% 18–24» — confirmed, но **вендорский опрос Creditspring** (только с атрибуцией). НЕ использовать: отдельную «FCA-цифру по 18–24» (её нет) и каузальность «BNPL→долговая спираль» (FCA не подтверждает).

| Цифра | Формулировка для копирайта | Источник | Статус |
|---|---|---|---|
| 70% | "Nearly 70% of consumers have signed contracts without knowing all the terms" | Adobe newsroom, фев 2025 ([03](03-competitors-ai-document-tools.md)) | ок (первоисточник Adobe, проверен в треке) |
| 10.9 млн / 20% | "10.9m UK adults used BNPL in the last year" | FCA Financial Lives 2024 ([10](10-market-uk-bnpl-credit.md)) | ок (FCA press release) |
| £13 млрд | Рынок BNPL UK 2024 (с £0.06 млрд в 2017) | FCA PS26/1 press release ([09](09-market-uk-fca-boundary.md)) | ⚠️ трек 09 не верифицирован — перепроверить на fca.org.uk |
| £39 млн | "UK shoppers paid £39m in BNPL late fees in a year" | Citizens Advice, 2021 ([10](10-market-uk-bnpl-credit.md), [11](11-users-pain-points.md)) | ⚠️ цифра 2021 года, свежей нет — указывать год |
| 1 из 10 | "1 in 10 BNPL users chased by debt collectors" | Citizens Advice ([10](10-market-uk-bnpl-credit.md)) | ⚠️ перепроверить (двойное цитирование в 10 и 11) |
| 72% / 38 млн | "72% don't fully read or understand financial T&Cs" | Baringa ([11](11-users-pain-points.md)) | ⚠️ трек 11 не верифицирован |
| £688 млн | "UK consumers spent £688m on unused subscriptions last year" | Citizens Advice, 2024 ([11](11-users-pain-points.md)) | ⚠️ трек 11 не верифицирован |
| 43% / +£35 | "43% saw their insurance renewal price rise — £35 on average" | Which? via Insurance Times ([11](11-users-pain-points.md)) | ⚠️ трек 11 не верифицирован |
| 51% | "51% of 18–24s don't know BNPL can lead to debt" | Creditspring ([10](10-market-uk-bnpl-credit.md)) | ⚠️ вендорский опрос — использовать с атрибуцией |
| 15.07.2026 | "From 15 July 2026 BNPL becomes FCA-regulated — your agreements get new rights" | FCA ([01](01-competitors-subscription-trackers.md), [03](03-competitors-ai-document-tools.md), [10](10-market-uk-bnpl-credit.md)) | ок (согласовано тремя независимыми треками) |
| ~£0.05–0.09 | Cost-per-document (Sonnet 4.6) — для P&L, не для лендинга | Расчёт по официальному прайсу Anthropic ([06](06-tech-claude-vision-extraction.md)) | ок (доки проверены live в треке) |
| 63% / 72% (NN/g «доверие к AI») | — | вторичные пересказы ([04](04-ux-ai-trust-patterns.md)) | ❌ НЕ использовать публично — первоисточник не подтверждён |

## Приложение Б. Продуктовые принципы, зафиксированные ресёрчем

Короткий свод инвариантов — чтобы фазы product analysis / UX не пересматривали уже решённое без новых данных:

1. **No bank connection — ever.** Дифференциатор и снятие кластера боли №3 из отзывов конкурентов ([02](02-competitor-review-mining.md)).
2. **Числа считает код, не LLM.** True cost / severity / расчёты — детерминированный движок; LLM — extraction и объяснение ([06](06-tech-claude-vision-extraction.md), [08](08-tech-rag-backend.md)).
3. **Explain, don't advise.** Формула вывода: факт из документа + рыночный факт с датой + объяснение термина + нейтральные опции + «decision is yours» ([09](09-market-uk-fca-boundary.md) ⚠️ — подтвердить юристом, но как принцип безопасен).
4. **No product links, no affiliate, no "apply" CTAs** в MVP — держит продукт вне credit broking / financial promotions ([09](09-market-uk-fca-boundary.md) ⚠️).
5. **Биллинг безупречен по построению:** Apple IAP only, free без карты, напоминание о триале, отмена в 2 тапа ([02](02-competitor-review-mining.md), [03](03-competitors-ai-document-tools.md)).
6. **Каждый AI-вывод имеет однотапный путь к источнику в документе;** привязка детерминированная (span/bbox), не генеративная ([04](04-ux-ai-trust-patterns.md)).
7. **Честный отказ лучше уверенной ошибки:** «Couldn't read» / «Your document doesn't mention this» — фичи доверия, не недостатки ([04](04-ux-ai-trust-patterns.md), [06](06-tech-claude-vision-extraction.md)).
8. **Первая ценность до регистрации и до permissions:** скан → одно aha-число; камера в момент скана, пуши после первого документа ([15](15-mobbin-onboarding.md)).
9. **Radar — следствие понятого документа,** не отдельная настраиваемая фича (урок Little Birdie, [01](01-competitors-subscription-trackers.md)); показывает дату + сумму + источник.
10. **Тон — спокойный безоценочный эксперт:** факт + цена в £ + next step; «We spotted this before it cost you anything», никакого стыжения ([04](04-ux-ai-trust-patterns.md), [11](11-users-pain-points.md) ⚠️).

---

## 10. Индекс отчётов

| Файл | Содержание (одна строка) |
|---|---|
| [01-competitors-subscription-trackers.md](01-competitors-subscription-trackers.md) | 13+ трекеров подписок (Emma, Snoop, Little Birdie, Rocket Money, Bobby, Nous…): механики входа, pricing-лестница UK, карта дыры «doc scan → understanding → commitment» |
| [02-competitor-review-mining.md](02-competitor-review-mining.md) | ~30 verbatim 1★-цитат конкурентов: cancellation hell, биллинг мимо Apple, страх bank link; 10 анти-паттернов и 10 trust-сигналов для Decode |
| [03-competitors-ai-document-tools.md](03-competitors-ai-document-tools.md) | AI-doc инструменты (Adobe AI Assistant, ChatPDF, Legalese Decoder, Clarivo, DoNotPay/FTC): ниша занята по краям, true cost math не делает никто |
| [04-ux-ai-trust-patterns.md](04-ux-ai-trust-patterns.md) | Calibrated trust: confidence без процентов, citations-паттерн Adobe, бесполезность глобальных дисклеймеров (RCT), «три источника истины», FCA-границы в копирайте |
| [05-ux-document-capture.md](05-ux-document-capture.md) | Бенчмарки сканирования (Adobe Scan, VisionKit, Starling, Onfido): auto-capture дефолт, quality-гейт, multi-page, пошаговый чек-лист capture-флоу. ⚠️ Факт о Microsoft Lens исправлен (см. шапку) |
| [06-tech-claude-vision-extraction.md](06-tech-claude-vision-extraction.md) | Claude API: модели/цены, PDF/vision-лимиты, structured outputs ⊥ citations (двухвызовная архитектура), cost-per-document $0.02–0.09, eval-методология |
| [07-tech-ios-pwa-vs-native.md](07-tech-ios-pwa-vs-native.md) | PWA vs Expo на iOS: вердикт Expo (нет Web Share Target, push только после установки, нет Face ID); App Store guidelines финкатегории |
| [08-tech-rag-backend.md](08-tech-rag-backend.md) | Backend: RAG не нужен для wedge (1M-контекст), Supabase eu-west-2 + FastAPI + SSE + jobs, UK GDPR/ICO, retention-дизайн, reference-архитектура MVP |
| [09-market-uk-fca-boundary.md](09-market-uk-fca-boundary.md) | ⚠️ FCA-периметр: debt counselling/broking/promotions, advice vs information (PERG 17), таблица «можно/нельзя» по фичам, дисклеймеры MSE/ClearScore/Nous. Не подтверждено независимой проверкой |
| [10-market-uk-bnpl-credit.md](10-market-uk-bnpl-credit.md) | Каталог 14 trap types с £-ценой и формулировками-маркерами, таблица BNPL-провайдеров, pattern library для промптов. ⚠️ Условия Klarna исправлены (см. шапку) |
| [11-users-pain-points.md](11-users-pain-points.md) | ⚠️ Топ-5 болей с verbatim-цитатами (MSE/Trustpilot/Reddit), триггер-моменты, язык пользователей, кластеризация частота×сила. Не подтверждено независимой проверкой |
| [12-mobbin-capture-flows.md](12-mobbin-capture-flows.md) | Mobbin: камера/crop/processing/ошибки (Docusign, Apple Notes, Yazio, Chime) + карта паттернов на core loop |
| [13-mobbin-fintech-home.md](13-mobbin-fintech-home.md) | Mobbin: home/cockpit (Afterpay headline+срезы, Orbit-структура списка, Rocket Money копирайт, «all clear» Apple Wallet) |
| [14-mobbin-ai-explanation.md](14-mobbin-ai-explanation.md) | Mobbin: AI summary/Q&A/citations/confidence (Yuka-схема результата, ChatGPT sources, Gemini Evidence, Grok follow-ups) |
| [15-mobbin-onboarding.md](15-mobbin-onboarding.md) | Mobbin: value prop (Wise/Plum/Fabric), permission priming (камера/пуши раздельно), aha-момент Plum, empty states |
| [16-mobbin-alerts-reminders.md](16-mobbin-alerts-reminders.md) | Mobbin: alert-карточки (Uber One), двухслойный радар (Rocket Money), trial/price-rise паттерны, notification settings (Tabby/Runna) |
| [17-refero-references.md](17-refero-references.md) | refero.design как источник UI-референсов: что доступно, shortlist приложений, чем дополняет Mobbin |
| **Углублённый проход (2026-06-14):** | |
| [09b-fca-boundary-verified.md](09b-fca-boundary-verified.md) | FCA-граница, верифицированная по первоисточникам (PERG verbatim, RAO art 36FB, CP26/15, PS26/1); посекционная сверка + ✅/❌ таблица по фичам. Трек 09 достоверен |
| [10b-trap-tc-corpus.md](10b-trap-tc-corpus.md) | Корпус verbatim T&C-формулировок (9 групп провайдеров, официальные документы), 18 few-shot примеров для классификатора, 10 поправок к каталогу трека 10 |
| [11b-user-pains-verified.md](11b-user-pains-verified.md) | Верификация 7 load-bearing цифр (6/7 confirmed), свежие FCA-данные по 18–25, секция «можно/нельзя публично» |
| [18-competitor-teardowns.md](18-competitor-teardowns.md) | Глубокие teardowns (Nous, Emma, Snoop, Cleo, Plum, Adobe AI, Bobby), перепроверенный pricing, watch-list угроз (Cleo back, Revolut AIR, ReSubs) |
| [references/competitors/README.md](references/competitors/README.md) | 11 competitor-скриншотов (full-page, 2026-06-14) с манифестом источников и привязкой к teardowns |
