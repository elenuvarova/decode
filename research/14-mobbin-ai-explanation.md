# Mobbin-исследование: AI explanation UX (для Decode)

Тема: AI summary контента, чат с AI о документе, AI insights cards, citations/confidence.
Платформа: iOS. Источник: Mobbin MCP (search_screens + search_flows), 8 запросов.

---

## 1. AI summary документа (Scan → Understand)

### Grok — flow "Asking a question (docs)"
[Grok – flow: Asking a question (docs)](https://mobbin.com/flows/1fdf3416-da7c-49f1-b9be-8f481dc6f586) и ключевой экран [Grok – Summary of the document](https://mobbin.com/screens/45c49df0-24e1-4a4c-ba11-23e2720c7f3d)

Что хорошо:
- Вход через чип "Analyze Docs" прямо над композером — функция анализа документов вынесена как first-class сценарий, а не спрятана в скрепку.
- Прикреплённый PDF показан карточкой-чипом с превью и подписью "PDF" + крестик для удаления; пре-филл запроса "Summarize the document".
- Ответ начинается с жирного заголовка-якоря "Summary of the document:", дальше факты о файле (имя файла моноширинным шрифтом, размер) — даёт уверенность, что AI смотрел именно этот файл.
- Под ответом панель действий (copy, share, like/dislike, озвучка) + 2 предложенных follow-up вопроса со стрелками "↳" — продолжение разговора без печатания.

### ChatGPT — flow "Asking ChatGPT (file)"
[ChatGPT – flow: Asking ChatGPT (file)](https://mobbin.com/flows/b5eb62d0-2ce2-4dfe-b52e-4ad53b667d5b)

Что хорошо:
- Файл-чип в композере (иконка PDF + имя файла + крестик) — минимальный паттерн attach-and-ask.
- Summary структурировано нумерованными пунктами с жирным lead-in ("7. **Green and Care Economies**:") и вложенными буллетами — сканируемость длинного ответа.
- Ответ заканчивается приглашением: "If you'd like a more detailed summary of a specific section…, let me know!" — копирайт, который превращает summary в начало диалога.

### Speechify — flow "Summarizing a text"
[Speechify – flow: Summarizing a text](https://mobbin.com/flows/01c02e1e-b03e-44b7-994c-ca007a72ad23)

Что хорошо:
- Кнопка "AI" прямо в тулбаре читалки документа — AI-слой живёт поверх документа, а не в отдельном табе.
- Конфигуратор перед генерацией: Length (Short/Medium/Long), Mode (Paragraph/Bullet Points), Pages (All/Select) + большая CTA "Generate Summary" — пользователь контролирует глубину объяснения.
- Экран "Select pages" с миниатюрами страниц и чекбоксами ("1 of 10 pages selected").
- Карточка summary с градиентной AI-рамкой, внизу thumbs up/down + copy + share, под карточкой постоянный инпут "Or ask anything" со sparkle-иконкой.

### Deepstash — структура "summary → main ideas"
[Deepstash – Book summary](https://mobbin.com/screens/a8dbbde4-cebc-4919-bbe7-5b12998db808)

Что хорошо:
- Сверху мета-чипы (Key ideas: 13, Time per idea: 4–5 min), затем Description простым языком в 2 абзаца, затем секция "Main Ideas" — разборные карточки-чанки с иконкой, названием и оценкой времени.
- Это ровно структура "3-sentence summary → key terms": краткий нарратив + кликабельные атомы.

### Microsoft Outlook — handoff в AI
[Microsoft Outlook – Open in M365 Copilot](https://mobbin.com/screens/fbb0e2fa-ca6f-4534-9b6d-6b13f2de53da)

- Превью документа на весь экран + единственная плавающая CTA "Open in M365 Copilot" внизу — паттерн «документ открыт → один очевидный шаг к AI».

---

## 2. Чат с AI о документе (Ask-anything Q&A)

### ElevenReader — "Ask me anything" о книге
[ElevenReader – Ask me anything](https://mobbin.com/screens/6820bde5-a6b5-490d-a172-8cb16463f97b)

Что хорошо:
- Шторка поверх контента с заголовком "Ask me anything…" + подзаголовком-контекстом (название книги) — пользователь всегда видит, О ЧЁМ этот чат.
- Ответ AI рендерится как обычный текст без «пузыря», вопрос пользователя — в сером пузыре; визуально ответ читается как контент, а не как переписка.
- Тёплый первый месседж "Hey there, what can I help answer today?" + поле "Start typing…" с голосовым вводом.

### Google Gemini — ask about selection / контекстный вопрос
[Google Gemini – Ask about document with highlights](https://mobbin.com/screens/d027d21d-ea39-4b6c-9a40-cc131dbb4dc8) и [Fabric – Ask AI about current selection](https://mobbin.com/screens/5937ea72-79a8-4d1f-aa0a-c18c3620d063)

Что хорошо:
- В Gemini поверх ответа — зелёная подсветка ключевых пассажей (визуальный аналог source highlighting), нумерованные термины с жирным lead-in и эмодзи-якорями; в композере чип-превью приложенного изображения.
- В Fabric плейсхолдер инпута меняется на "Ask AI about current selection…" с бейджем "1 item" — чат явно привязан к выделенному фрагменту. Под каждым ответом кнопки "Copy" и "Save as note".

### Linktree — состояние «думает» и шаги анализа
[Linktree – Thinking](https://mobbin.com/screens/e9c6c041-97b2-4850-92ca-d8a1f5131588) и [Linktree – Analysis steps](https://mobbin.com/screens/7e370793-4b21-4992-8738-e417d3ce22dc)

Что хорошо:
- Сначала компактное "✦ Thinking" (sparkle + слово), затем разворачиваемый блок "Analysis ⌄" с чек-листом шагов: "Loading your links → Fetching your analytics → Checking your social integrations…" — прогресс как нарратив, снижает тревогу ожидания и продаёт глубину анализа.
- Кнопка остановки генерации прямо в композере (квадрат в круге).

### Meta AI — время размышления
[Meta AI – Thought for 5.9 sec](https://mobbin.com/screens/87770f07-d7e4-4b3d-a837-d72859df7521)

- Серая строка "Thought for 5.9 sec" перед ответом + буллеты с жирными lead-in и инлайн-иконкой источника — дешёвый сигнал «ответ не с потолка».

### ChatGPT — пустое состояние чата
[ChatGPT – Starter prompts](https://mobbin.com/screens/fce32b52-522f-425d-b193-dc00895ee187) и [Anything – What can I help you build today?](https://mobbin.com/screens/60cdd1ec-8ec7-4986-a0cf-2274b9e2f3aa)

- Над композером 2–3 starter-карточки формата «жирное действие + светлая строка контекста» ("Write a report / based on my data") — решают проблему «не знаю, что спросить».

---

## 3. AI insights cards

### Linktree — insights-репорт с inline-действиями
[Linktree – AI insights report](https://mobbin.com/screens/f73db0a6-11b9-4f04-afef-28a50d8c7e45)

Что хорошо:
- Длинный AI-ответ разбит секциями с H2-заголовками ("The Bright Side"), ключевые фразы выделены жирным ("your **click-through rate is excellent**").
- Внутрь текста встроена интерактивная карточка-действие с иконками и шевроном ("Connect more socials to get more insights →") — insight сразу конвертируется в действие.
- Финал — вопрос-развилка ("Want me to look at which specific links…?") вместо тупика.

### Yuka — скан-результат с risk-флагами (лучший аналог Trap Detector)
[Yuka – Scan result with score and risks](https://mobbin.com/screens/3e160990-7c3e-4f13-bf1b-25ca9f60b2c7)

Что хорошо:
- Шапка: фото отсканированного продукта + название + общий скор "47/100" с цветной точкой и словесной меткой "Poor" — число + цвет + слово, тройное кодирование.
- Список "Ingredients": каждый пункт с цветным риск-уровнем ("Moderate risk" оранжевый, "Low risk" жёлтый, "Risk-free" зелёный) и кнопкой (i) для объяснения.
- Безопасные пункты схлопнуты в "8 others ingredients — Risk-free ⌃" — внимание только на проблемном.

### Hyundai Card — AI-карточки про паттерны трат
[Hyundai Card – flow: AI spending patterns](https://mobbin.com/flows/047c7f22-5479-44a8-a8d0-a698c56bbe56), экран [AI shortcut card](https://mobbin.com/screens/9eda0b14-b89d-4791-b577-18051ad7e331)

- AI-фича упакована в карточку с градиентной рамкой и заголовком-выгодой («AI заметил паттерн твоих трат») + два entry-чипа с конкретными вопросами; внизу дисклеймер о поддерживаемых устройствах.

### Lovi — confidence на карточке инсайта
[Lovi – 89% fit for you](https://mobbin.com/screens/89a3980e-0e72-4f40-9927-ea3c7b411e84)

- Зелёный бейдж "89% fit for you" с иконкой прямо на карточке результата сканера — процентная уверенность как понятный потребительский лейбл, а не ML-жаргон.

### pliability — объяснение скора + дисклеймер
[pliability – Thresholds for Mobility Scores](https://mobbin.com/screens/4e0a7beb-3216-43df-8c88-4334ee3278ca)

- Таблица порогов скора (Top 10% = 82+ … Bottom 25% = 61-) с цветовой шкалой + мелкий дисклеймер «informational purposes only, not medical advice» — прямой шаблон для FCA-style дисклеймера Decode («не финансовый совет»).

---

## 4. Citations / sources / confidence

### ChatGPT — инлайн-чип источника + шторка Sources
[ChatGPT – inline source chip](https://mobbin.com/screens/a4030d26-a7d6-4f91-8277-8a15b8dabae6) и [ChatGPT – Sources sheet](https://mobbin.com/screens/3eaf4e44-fdce-48bc-965b-b194ed9c43ac)

Что хорошо:
- В конце абзаца — маленький серый чип "Mobbin +2"; тап открывает bottom sheet "Sources" со списком: favicon + имя источника, жирный заголовок, 2 строки сниппета.
- Двухуровневая модель: чип не загромождает текст, шторка даёт полную проверяемость. Плюс тапабельная строка "Thought for a couple of seconds >".

### HYPE — полноэкранный список источников
[HYPE – Sources sheet](https://mobbin.com/screens/4ab94a70-e75e-41c0-a0ca-90fde4edfd6d)

- Шторка с grabber-полосой, "Sources" + "Close"; каждый источник: издатель капителью сверху, жирный заголовок, сниппет. Чистая типографская иерархия без карточек.

### Google Gemini — "Evidence:" под каждым утверждением
[Google Gemini – Evidence per claim](https://mobbin.com/screens/449ffd04-1038-4da5-b590-0ebedb5b60ce)

Что хорошо:
- Каждое утверждение AI сопровождается вложенным буллетом "Evidence: …" с дословной цитатой/основанием — самый прямой паттерн «claim → подтверждение из источника».
- AI честно пишет "The user's name is not explicitly stated in the stored records" — модель того, как признавать отсутствие данных вместо галлюцинации (для Decode: «в документе это не указано»).

### Google Gemini (NotebookLM-паттерн) — источники как сущности
[Google Gemini – Add sources notebook](https://mobbin.com/screens/5200e103-a772-41cd-b0dc-39ce4bec5397)

- Ноутбук с кнопкой "+ Add sources": чат жёстко скоупится на загруженные источники — ментальная модель «AI отвечает только по твоим документам».

---

## Паттерны-кандидаты для Decode (в wireframes)

### Копируем как есть
1. **Результат скана по схеме Yuka**: фото документа + имя оффера + общий вердикт (число/цвет/слово, напр. "True cost: £412 — High"), ниже список key terms, каждый с цветным риск-лейблом и (i); безопасные термины схлопнуты ("6 terms look standard ⌃"). Trap Detector = оранжевые/красные строки наверху списка.
2. **Двухуровневые citations как у ChatGPT**: в 3-sentence summary каждая фраза заканчивается чипом "p.2 §4"; тап → bottom sheet с фрагментом документа и подсвеченной строкой (формат списка как у HYPE: источник капителью → жирная цитата → контекст).
3. **Follow-up подсказки как у Grok**: под summary 2–3 строки "↳ Why is the APR variable?", "↳ What happens if I miss a payment?" — генерируются из найденных trap-флагов.
4. **Шаги анализа как у Linktree**: при обработке скана чек-лист "Reading document → Extracting key terms → Calculating true cost → Checking for traps" — продаёт работу детерминированного движка и заполняет ожидание.
5. **Панель действий под AI-ответом** (Fabric/Speechify): Copy, Share, thumbs up/down — фидбек-сигнал для качества AI обязателен с первой версии.

### Адаптируем
6. **Confidence как у Lovi, но честнее**: бейдж на ответе Q&A — "High confidence · found in document" / "Low confidence · not stated in document". Процент скрываем за словесными уровнями; паттерн признания отсутствия данных берём у Gemini ("Evidence: no data found" → "This isn't specified in your agreement").
7. **Чат поверх документа как у ElevenReader**: шторка "Ask about this document" с названием оффера в подзаголовке; ответы — текстом без пузырей, вопросы — пузырём. Вход в чат — постоянный инпут под summary ("Or ask anything", как у Speechify), не отдельный таб.
8. **Структура Deepstash для экрана документа**: мета-чипы (тип документа, дата, true cost), 3-sentence summary, затем "Key terms" карточками-чанками — каждая раскрывается в объяснение простым языком.
9. **Evidence-якорь в самом документе (Gemini highlights)**: тап по citation скроллит к скану с подсветкой строки — наш differentiator "source highlighting" в буквальном виде.
10. **Дисклеймер как у pliability**: на каждом экране вердикта мелкий футер "Decode explains documents, it doesn't give financial advice" + при первом trap-флаге.

### Избегаем
- **Свободный чат как главный экран** (ChatGPT/Grok home): у Decode вход — скан, чат всегда скоуплен на документ (модель NotebookLM "Add sources", не general assistant). Пустой композер «спроси что угодно» без контекста = паралич и галлюцинации.
- **Голые проценты уверенности** без слов и без источника — пользователь не знает, что делать с "73%".
- **Длинные нумерованные простыни как у ChatGPT** для summary первого экрана: 8 пунктов с подбуллетами — это для аналитиков; у Decode жёсткий формат 3 предложений, детали — по тапу.
- **"Thought for 5.9 sec" без содержания**: для финансовых решений показываем ЧТО проверено (шаги как у Linktree), а не сколько секунд думали.
- **Конфигуратор summary как у Speechify** (length/mode/pages) на wedge-этапе — лишний шаг перед ценностью; один правильный формат лучше настроек.
