# UX-паттерны доверия к AI для Decode (трек: ux-ai-trust)

Дата ресёрча: 2026-06-10. Фокус: confidence indicators, source citation, дисклеймеры, streaming UX, progressive disclosure, explainability + финтех-специфика (UK). Все существенные факты — с inline-URL. Где данные получены из вторичных источников или не найдены — это указано явно.

---

## 1. Базовая рамка: calibrated trust, а не «максимум доверия»

Главный консенсус первоисточников (Google PAIR, Apple HIG, NN/g): цель — **не максимизировать доверие, а откалибровать его**. Пользователь должен «trust the system in some situations, but to double-check it when needed» — формулировка из главы Explainability + Trust гайдбука Google PAIR (https://pair.withgoogle.com/chapter/explainability-trust/).

Ключевые положения PAIR (проверено fetch'ем первоисточника):
- «Explaining predictions, recommendations, and other AI output to users is critical for building trust».
- Доверие строится по фазам: **initial** (объяснить capabilities/limitations заранее, «Focus on the benefit, not the technology»), **early use** (дать попробовать в low-stakes режиме), **ongoing** (постепенно повышать автоматизацию под контролем пользователя), **after errors** (recovery-план + возможность «научить» систему правильному ответу).
- Рекомендуются **partial explanations** — раскрывать только то, что влияет на решение пользователя, а не «как устроена модель»: объяснение конкретного вывода, указание источников данных, counterfactuals, интерактивное объяснение.

NN/g (State of UX 2026, research agenda по GenAI) фиксирует, что доверие — главная дизайн-проблема AI-продуктов: «AI adoption growing but trust falling» (https://www.nngroup.com/articles/genai-ux-research-agenda/). Часто цитируемые цифры «63% пользователей охотнее полагаются на AI с confidence/reasoning» и «72% — язык интерфейса напрямую влияет на доверие» встречаются во вторичных пересказах NN/g-исследований 2024 (https://www.uxmatters.com/mt/archives/2025/11/the-design-psychology-of-trust-in-ai-crafting-experiences-users-believe-in.php, https://www.parallelhq.com/blog/designing-interfaces-ai-products); **первоисточник этих процентов на nngroup.com мной не подтверждён — использовать как направление, не как цифру в дек**.

---

## 2. Confidence indicators: как показывать и когда НЕ показывать

### 2.1 Четыре способа отображения (Google PAIR)

Источник: https://pair.withgoogle.com/chapter/explainability-trust/ (содержимое получено напрямую):

1. **Categorical** — бакеты High/Medium/Low. PAIR: «your team will determine cutoff points for the categories, so it's important to think carefully about their meaning and about how many there should be».
2. **N-best alternatives** — вместо score показать несколько вариантов; «especially useful in low-confidence situations», помогает пользователю «rely on their own judgement».
3. **Numeric (проценты)** — рискованно: «presume[s] your users have a good baseline understanding of probability»; без контекста человек не знает, 80% — это много или мало.
4. **Data visualizations** (error bars, shaded ranges) — только для экспертных аудиторий.

Когда НЕ показывать confidence (PAIR, дословно): «If it doesn't make an impact on user decision making, consider not showing it»; «If the confidence level could be misleading for less-savvy users, reconsider how it's displayed, or whether to display it at all».

### 2.2 Apple HIG (Machine Learning): confidence ≠ качество

Источник (получен через JSON-эндпоинт документации): https://developer.apple.com/design/human-interface-guidelines/machine-learning

- «Confidence indicates the measure of certainty for a result… You need to verify that your confidence values correspond to the quality of your results».
- «In general, translate confidence values into concepts that people already understand. Simply displaying a confidence value doesn't necessarily help people understand how it relates to a result».
- «When you know that confidence values correspond to result quality, you generally want to avoid showing results when confidence is low» — т.е. при низкой уверенности лучше **не показывать результат вовсе** (или показать варианты/попросить пересканировать), чем показывать с пометкой «35%».
- Attribution (объяснение «почему такой результат»): «Keep attributions factual and based on objective analysis… you don't want to provoke an emotional response»; «In general, avoid technical or statistical jargon. In most situations, using percentages, statistics, and other technical jargon doesn't help people assess the results».

### 2.3 Исследования: мискалиброванный confidence вреден, словесная неуверенность работает

- **Miscalibration**: пользователи не умеют детектировать расхождение между confidence и реальной точностью; over-confident AI ведёт к over-reliance (misuse), under-confident — к disuse; оба снижают эффективность решений (arXiv 2402.07632, «Understanding the Effects of Miscalibrated AI Confidence on User Trust, Reliance, and Decision Efficacy», https://arxiv.org/abs/2402.07632).
- **Verbalized uncertainty**: pre-registered исследование с 404 участниками (FAccT 2024, «I'm Not Sure, But…») — перволичные формулировки неуверенности («I'm not sure, but…») снижают слепое согласие с ответом и **повышают итоговую точность решений** пользователя (https://dl.acm.org/doi/10.1145/3630106.3658941).
- Исследование в Intl. Journal of Human-Computer Studies: **средний** уровень вербализованной неуверенности («I think…») даёт более высокие trust/satisfaction/performance, чем крайности «I'm confident that» и «I'm not sure that» (https://www.sciencedirect.com/science/article/pii/S1071581925000126).

**Практический вывод для consumer-финтеха**: не показывать сырые проценты на главном экране. Категориальные бейджи (например, «Verified from document / Check this / Couldn't read») + словесные хеджи в Q&A («Based on page 2, I think… — double-check the highlighted line») калибруют доверие лучше, чем «85%».

---

## 3. Source citation / highlight источника в документе

### 3.1 Паттерн Citations (Shape of AI)

Источник: https://www.shapeof.ai/patterns/citations (+ общий каталог https://www.shapeof.ai/):
- Определение: citations «connect AI outputs back to their sources… to create transparency and help users verify information».
- «Let context guide specificity. Point to exact passages, timestamps, or assets rather than broad documents when information is being presented as factual and specific» — для фактов цитировать **точный фрагмент, не документ целиком**.
- Inline-цитаты — для claims на уровне предложения; панель references — для длинного изучения; hover/tap preview для скорости; **сломанные/ненайденные привязки показывать явно**, а не прятать.
- Смежные паттерны каталога: **Footprints** («Let users trace the AI's steps from prompt to result»), **Caveat** («Inform users about shortcomings or risks in the model»), **Disclosure** («Clearly mark content and interactions guided or delivered by AI»), **Verification** («Allow users to confirm AI decisions and actions before proceeding»).

### 3.2 Эталонная реализация для документов: Adobe Acrobat AI Assistant

Прямой аналог сценария Decode (вопросы к документу): нумерованные кликабельные ссылки в ответе; «when you select one of the numbered links in the chat answer, the AI PDF tool instantly highlights the related source content in your document» (https://helpx.adobe.com/acrobat/desktop/explore-pdf-spaces/view-citations.html, мобильная версия: https://helpx.adobe.com/acrobat/using/view-citations-on-mobile.html). Adobe строит это на отдельном «custom attribution engine» и честно дисклеймит, что «rarely, the AI Assistant may provide incorrect attributions» (https://news.adobe.com/news/news-details/2024/adobe-brings-conversational-ai-to-trillions-of-pdfs-with-the-new-ai-assistant-in-reader-and-acrobat).

Perplexity — образец inline-цитат в потоке ответа: номерные сноски на уровне утверждения, иерархия «answer → sources → next steps» (teardown: https://assets.nextleap.app/submissions/Perplexity-Citations-and-Follow-ups1-e626319c-87d9-4e5f-8338-4aabe2921dc6.pdf).

### 3.3 Жёсткая правда от NN/g: цитаты почти не кликают

NN/g «Explainable AI in Chat Interfaces» (https://www.nngroup.com/articles/explainable-ai/):
- В исследовании пользователи верили, что «могут проверить при необходимости», но «never clicked on any of the citations presented during the session» — цитата работает как **сигнал доверия по виду**, а не как реальная проверка.
- «Citations are often hallucinated and point to nonexistent URLs» (для web-LLM; у Decode источник — сам документ, так что привязка должна быть детерминированной: точная подсветка строки, которую extraction реально распарсил).
- Рекомендации: стилизовать цитаты отлично от основного текста; ставить источник **рядом с конкретным утверждением**; осмысленные подписи ссылок вместо «Source»; chain-of-thought-«объяснения» не показывать как «прозрачное рассуждение» — «explanations are often unfaithful to the model's actual computation».

**Вывод**: ценность citation — не в клике, а в (а) видимом сигнале проверяемости и (б) мгновенной подсветке в самом документе при tap'е. Для Decode привязка «term → строка в скане» должна делаться экстрактором (bounding box / span), а не генеративно — тогда хальцинированные цитаты исключены по построению.

---

## 4. Дисклеймеры «AI may be wrong»: что показали исследования

- **RCT (186 студентов-медиков)**: плашка «ChatGPT can make mistakes. Check important info» не изменила поведение — доля пересмотра решений 15.3% без предупреждения vs 15.9% с ним; вывод авторов: «simple disclaimers are insufficient for calibrating trust» (https://pubmed.ncbi.nlm.nih.gov/40998694/).
- Royal Society Open Science: generic-дисклеймер «AI может ошибаться» не повлиял на reliance на дезинформацию; работали только source-focused inoculation и явный debunking конкретного контента (https://royalsocietypublishing.org/rsos/article/12/6/242148/235451/Countering-AI-generated-misinformation-with-pre).
- Препринт «"Can Make Mistakes": AI Chatbot Disclaimers as Failed Explainability Surfaces»: текущие дисклеймеры «vague, unactionable, and inconsistent with actual system behavior» (https://zenodo.org/records/20387079).
- Практика дизайна: глобальные плашки «AI can make mistakes» «trained-out of user attention by day two»; работают **маленькие inline-хинты ровно там, где показан AI-контент** (https://www.designkey.studio/post/designing-for-trust-ux-ai-features).

Apple HIG Generative AI (verbatim, получено через JSON-эндпоинт https://developer.apple.com/design/human-interface-guidelines/generative-ai):
- «Communicate where your app uses AI… Never trick someone into thinking they're interacting with or viewing content authored by a human».
- «Generative models sometimes get details wrong… so it's important to clearly communicate that AI-generated content may contain errors».
- «Avoid using AI-generated content in situations where a possible hallucination could misinform and harm someone» — для финансовых цифр это аргумент за **детерминированный калькулятор** (как и задумано в Decode) вместо генеративных расчётов.
- «Set clear expectations about what your AI-powered feature can and can't do… If your feature has known limitations, let people know up front, show them how to get good results, and explain why inferior results occur».
- «Let people share feedback on outputs… Consider offering a quick and easy way to give positive and negative feedback, like simple thumbs-up and thumbs-down buttons… Always make providing feedback voluntary».

**Как делать дисклеймеры, не убивая доверие (синтез):**
1. Не глобальная плашка, а **контекстный caveat у конкретного типа контента**: у AI-summary — «AI summary — tap any term to see it in your document»; у детерминированного расчёта — наоборот, бейдж «Calculated, not AI-generated».
2. Дисклеймер должен быть **actionable**: не «может ошибаться», а «что сделать, чтобы проверить» (tap → подсветка в документе). Это согласуется с выводом Royal Society: работает конкретика, а не общая осторожность.
3. Дифференцировать слои по источнику истины: extraction (проверяемо по документу) ≠ расчёт (детерминированный) ≠ интерпретация/Q&A (генеративная, хеджи + цитаты). Один общий дисклеймер на всё — антипаттерн.

---

## 5. Streaming response UX и состояния обработки скана

- Пороговые значения отзывчивости (классика NN/g, пересказ в https://redis.io/blog/streaming-llm-responses/): <0.1 c — мгновенно, <1 c — не рвёт поток мысли, ~10 c — предел удержания внимания. Streaming сокращает **воспринимаемую** задержку: пользователь видит прогресс сразу (TTFT важнее полного времени ответа).
- Рекомендации для стриминга: «Stream early, even if you can't answer yet; acknowledge instantaneously; make partial output useful; use progressive disclosure for long answers; give users control during generation» (https://redis.io/blog/streaming-llm-responses/, https://redis.io/blog/how-to-improve-llm-ux-speed-latency-and-caching/).
- Для этапа «скан обрабатывается» (не chat): **step-based progress** («Reading document → Extracting terms → Checking for traps») работает лучше спиннера для многостадийных AI-операций; skeleton screens снижают воспринимаемое время загрузки (в одном тесте — на ~40% vs пустой экран со спиннером) и убирают реакцию «is this broken?» (https://www.telerik.com/blogs/loading-ui-ux-patterns-ai-applications, https://www.nngroup.com/articles/skeleton-screens/).
- Нюанс для Decode Q&A: inline-цитаты при стриминге обычно дорисовываются по мере генерации — нужно резервировать место/стили, чтобы текст не «прыгал» (вывод из паттернов Shape of AI Controls/Citations, https://www.shapeof.ai/patterns/citations).

---

## 6. Progressive disclosure: summary → detail → ask anything

- Базовый принцип (Jakob Nielsen, 1995; https://www.nngroup.com/articles/skeleton-screens/ и обзор https://www.uxpin.com/studio/blog/what-is-progressive-disclosure/): показывать только то, что нужно сейчас, остальное — по запросу; снижает cognitive load и страх ошибки.
- Для AI-результатов иерархия «answer → sources → next steps» (паттерн Perplexity, https://www.makebttr.com/insights/how-perplexity-chooses-sources) переносится на документы как «3-sentence summary → key terms → full breakdown → ask anything».
- **Wayfinders** (Shape of AI, https://www.shapeof.ai/pattern-types/wayfinders): Suggestions (готовые вопросы против «blank canvas»), Follow-up («prompts, questions, or inline actions that help users refine or extend their initial interaction»; «Anchor follow ups in what just happened»; «Visually separate follow ups from the model's main output»), Nudges. Follow-ups особенно важны в начале пользовательского пути.
- Apple HIG GenAI: «For open-ended features like a search bar or generation prompt, consider offering curated suggestions that make it easy to get started» (https://developer.apple.com/design/human-interface-guidelines/generative-ai).
- Apple HIG ML про множественные варианты: «List the most likely option first… avoid providing too many options. People must evaluate each option before making a choice» (https://developer.apple.com/design/human-interface-guidelines/machine-learning).

---

## 7. Финтех-специфика: деньги, паника и «not financial advice» (UK)

### 7.1 Как показывать инсайты о деньгах без паники

- «Financial anxiety arises from confusion, unpredictability, and the fear of making irreversible mistakes»; «when money is involved, trust is the primary user interface» (https://medium.com/@design.sphere/designing-for-financial-anxiety-why-fintech-ux-must-feel-safe-not-just-look-clean-0ee61b5418b0; общие принципы calm design: https://www.uxmatters.com/mt/archives/2025/05/designing-calm-ux-principles-for-reducing-users-anxiety.php; банк-UX-аудит: https://www.theuxda.com/blog/top-20-financial-ux-dos-and-donts-to-boost-customer-experience).
- Apple HIG ML напрямую про tone: attributions должны быть «factual and based on objective analysis… you don't want to provoke an emotional response» — т.е. trap detector должен называть факт («Rate jumps to 39.9% after month 3 — that's £312 more over the year»), а не пугать («DANGER!»).
- **Cleo** — пример работы тоном: «If someone overspends, Cleo doesn't scold; it jokes, contextualizes, and helps them recover» (https://web.meetcleo.com/blog/how-we-taught-cleo-to-talk-back, https://web.meetcleo.com/blog/building-a-financial-agent-on-top-of-commodified-llms); там же инженерная деталь — Cleo даунгрейдит восклицательные знаки в точки ради консистентности тона. Но часть пользователей находит такой тон «too informal for serious financial planning» (https://financebuzz.com/cleo-review) — для документов о кредитах уместнее «спокойный эксперт», чем «sassy friend».
- Практика: плохая новость всегда в связке с **next step** (PAIR: after errors → recovery plan): «вот ловушка → вот что она стоит в фунтах → вот 1–2 действия (вопрос кредитору, сравнить, поставить напоминание)».

### 7.2 «Not financial advice»: регуляторная рамка UK

- FCA не вводит отдельный AI-регламент: подход «principles-based and focused on outcomes», опора на существующие рамки, включая **Consumer Duty** (https://www.fca.org.uk/firms/innovation/ai-approach, https://www.fca.org.uk/firms/ai-financial-services). Где AI генерирует customer communications — фирма отвечает за outcomes по Consumer Duty (https://www.kennedyslaw.com/en/thought-leadership/article/2026/deploying-ai-in-financial-services-in-the-uk-fca-and-data-protection-considerations/).
- **Критичная граница для Decode — debt counselling**: «giving advice to a borrower about the liquidation of a debt due under a credit agreement» — регулируемая деятельность, требующая FCA-авторизации (FCA Handbook glossary «debt counsellor»: https://www.handbook.fca.org.uk/handbook/glossary/G3319.html; обзор кредитных regulated activities: https://www.icaew.com/-/media/corporate/files/regulations/consumer-credit-regulation/a-guide-to-credit-related-regulated-activity.ashx; PERG 2.7: https://handbook.fca.org.uk/handbook/perg2/perg2s7). **Объяснение условий документа и расчёт стоимости — информирование; «вам стоит погасить X раньше / не берите этот кредит» — уже потенциально advice.** Формулировки в UI должны держать продукт на стороне information/guidance: «This offer costs £X over 2 years» — ок; «You should decline it» — риск.
- **PS25/22 Targeted Support**: FCA опубликовала policy statement 11 декабря 2025; финальные правила приняты Board 26 февраля 2026; новая регулируемая деятельность «providing targeted support» (ready-made suggestions для сегментов потребителей) стартует **6 апреля 2026** (https://www.fca.org.uk/publications/policy-statements/ps25-22-consumer-pensions-investment-decisions-rules-targeted-support, https://www.hoganlovells.com/en/publications/targeted-support-update-fca-publishes-nearfinal-rules-on-new-form-of-advice). Прямо касается pensions/retail investments, но задаёт направление «advice gap»-режимов; для roadmap Decode — сигнал, что «персонализированные подсказки» в UK движутся к отдельному разрешительному режиму.
- Оформление «not financial advice» в UI: не мелкий шрифт в футере, а честная рамка ожиданий в onboarding + контекстная строка на result-экране в духе «Decode explains your documents — it doesn't tell you what to do with your money» (паттерн «capability boundaries up front» — Apple HIG GenAI + PAIR initial trust phase). Это одновременно дисклеймер и позиционирование agency: решение остаётся за пользователем (Apple: «AI should augment human decision-making, not replace it», пересказ HIG: https://digitalthriveai.com/en-us/resources/web-design/redesigning-with-apple-hig-and-ai/).

### 7.3 Паттерн для extraction-конвейера (document AI)

Индустриальный стандарт human-in-the-loop: confidence-based routing — высокая уверенность идёт автоматом, низкая подсвечивается для проверки человеком; интерфейс ревью показывает оригинал документа + извлечённое значение + альтернативы (Azure Document Intelligence: https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/concept/accuracy-confidence?view=doc-intel-4.0.0; практика: https://dev.to/iterationlayer/extracting-structured-data-from-scanned-documents-ocr-plus-field-validation-1i30). Для B2C-версии это значит: поля с низким confidence не прячем и не «угадываем», а помечаем «Couldn't read this — tap to check» с зумом на фрагмент скана. Apple HIG ML: «use guided corrections instead of freeform corrections» и «Provide immediate value when people make a correction».

---

## 8. Конкретные паттерны для экранов Decode

### 8.1 Decode-result экран (после скана)

1. **Processing**: step-based progress «Reading → Extracting terms → Calculating true cost → Checking for traps» + skeleton будущего layout (Telerik/NN/g, §5). Стримить summary, как только готов, не дожидаясь trap-скана.
2. **Слоистая структура (progressive disclosure)**: (a) 3-sentence summary → (b) key terms карточками → (c) true cost (развёртка расчёта) → (d) traps → (e) «Ask anything». На первом экране — только (a)+(b)+вердикт-уровень.
3. **Разделить «источники истины» визуально** (главный паттерн всего ресёрча):
   - Extracted terms — бейдж/иконка «From your document», tap → **подсветка строки на скане** (паттерн Adobe Acrobat, §3.2). Привязка детерминированная (span/bbox из экстрактора), не генеративная.
   - True cost — бейдж «Calculated» + footprints-развёртка формулы («Footprints», Shape of AI): APR × срок × fees = £X. Это НЕ AI-контент — и это надо сказать явно, доверие к числам выше.
   - Summary и trap-объяснения — маркировка «AI» (Disclosure-паттерн) + контекстный caveat с действием: «Tap any underlined term to see it in your document».
4. **Confidence — категориально, не в процентах**: три состояния поля — «✓ from document» (молча, по умолчанию), «Check this» (жёлтое, low-confidence extraction, tap → zoom на фрагмент + guided correction с вариантами), «Couldn't read» (честное missing-состояние, просьба пересканировать страницу). Сырые проценты не показывать (PAIR + Apple HIG ML + arXiv 2402.07632, §2).
5. **Trap detector — факты + цена + next step, без алармизма**: нейтральная формулировка ловушки, её стоимость в £, и 1–2 действия. Severity показывать порядком и количеством, а не кроваво-красной типографикой (Apple: «don't provoke an emotional response»).
6. **Feedback**: thumbs up/down на summary и каждый trap («Was this right?») — добровольно, мгновенная реакция на correction (Apple HIG GenAI/ML, §4).
7. **Guidance, not advice**: микрострока на result: «Decode explains — the decision is yours» + расчёты как факты, рекомендации формулировать как вопросы/опции, не императивы (§7.2).

### 8.2 Q&A («Ask anything»)

1. **Suggestions против blank canvas**: 3–4 готовых вопроса, сгенерированных из конкретного документа («What happens if I miss a payment?», «Can I repay early without a fee?») — Wayfinders/Apple curated suggestions (§6).
2. **Ответ с inline-цитатами**: номерные/подчёркнутые фрагменты, tap → скролл+подсветка в документе (Acrobat-паттерн). Источник всегда «page 2, clause 4.1», не «Source».
3. **Streaming** с мгновенным acknowledgment; цитаты дорисовываются без «прыжков» layout (§5).
4. **Вербализованная неуверенность вместо процентов**: при средней уверенности — «I think… based on clause 4 — double-check the highlighted line»; при отсутствии ответа в документе — честный отказ: «Your document doesn't mention this. You could ask the lender: …» (FAccT 2024 + IJHCS, §2.3; «make broken citations explicit», Shape of AI §3.1).
5. **Follow-ups** после ответа, визуально отделённые от ответа, заякоренные на последний ответ («Anchor follow ups in what just happened»), максимум 2–3 (Hick's Law, §6).
6. **Границы домена**: на вопросы «что мне делать с деньгами» — мягкий redirect к объяснению + «not advice»-рамка (§7.2), чтобы не пересекать debt counselling / advice boundary.

---

## 9. Что не нашлось / ограничения

- Полные тексты NN/g-статей за пейволлом местами недоступны; цифры «63%/72%» подтверждены только вторичными источниками (§1) — в публичных материалах Decode их лучше не использовать без проверки.
- web.archive.org из этого окружения недоступен; Apple HIG получен через официальный JSON-эндпоинт документации (цитаты verbatim, надёжно).
- ScienceDirect-статья о дисклеймерах («Always check important information!») вернула 403 — использована только аннотация из поисковой выдачи (https://www.sciencedirect.com/science/article/pii/S294988212500026X).
- Специализированных teardown'ов «AI-объяснителя кредитных документов» (прямых аналогов Decode) не найдено — ближайшие образцы: Adobe Acrobat AI Assistant (документы+цитаты) и Cleo (деньги+тон).

---

## Key takeaways for Decode

1. **Цель — calibrated trust**: дать пользователю инструменты проверить, а не убедить верить. Каждый AI-вывод обязан иметь однотапный путь к источнику в документе (PAIR, NN/g).
2. **Три источника истины — три визуальных языка**: «From your document» (extraction, детерминированная подсветка), «Calculated» (true cost engine — подчеркнуть, что это НЕ генеративный AI), «AI» (summary/Q&A, с маркировкой и хеджами). Это главный каркас decode-result экрана.
3. **Никаких процентов уверенности в B2C UI**: категориальные состояния («Check this» / «Couldn't read») + verbalized uncertainty в Q&A. Исследования: мискалиброванные numeric scores вредят, «I'm not sure, but…» повышает точность пользовательских решений.
4. **Глобальный дисклеймер «AI may be wrong» не работает** (RCT-доказано). Заменить контекстными actionable-каверами: «AI summary — tap to verify in your document». Дисклеймер = приглашение проверить, а не отписка.
5. **Citation-паттерн брать у Adobe Acrobat**: tap по утверждению → мгновенная подсветка точного фрагмента скана. Привязку строить детерминированно из экстрактора — тогда «hallucinated citations» исключены архитектурно. Помнить: цитаты почти не кликают — они работают как видимый сигнал проверяемости, поэтому показывать их дёшево и всегда.
6. **Honest fallbacks — фича доверия**: «документ это не упоминает», «не смог прочитать страницу 2» + что сделать дальше. Apple: при низкой уверенности лучше не показывать результат, чем показывать сомнительный.
7. **Scan-обработка**: step-based progress с называнием этапов + skeleton результата; стримить summary первым. TTFT решает восприятие скорости.
8. **Progressive disclosure как core-структура**: 3 предложения → key terms → расчёт → ловушки → ask anything; suggested questions из самого документа против blank canvas; 2–3 follow-up'а после каждого ответа.
9. **Тон trap detector — «спокойный эксперт»**: факт + цена в £ + next step, без красной паники и императивов (Apple: attributions не должны «provoke an emotional response»; Cleo — образец эмпатии, но для кредитных документов нужен более серьёзный регистр).
10. **Регуляторная красная линия (UK)**: объяснение документа = информирование (не регулируется), но «advice about the liquidation of a debt» = регулируемый debt counselling, а персональные «ready-made suggestions» движутся в режим targeted support (PS25/22, live с 6 апреля 2026). Все формулировки UI-копирайтинга держать в зоне «explain, don't advise» + рамка ожиданий в onboarding вместо мелкого шрифта.
