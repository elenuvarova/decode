# Decode — AI Research Sprint

Применение методологии [Roots AI Research Sprint](https://rootsproduct.ru/ai-research-sprint) к продукту Decode. Курс — 6 задач в 3 модулях: AI-ускоренный продуктовый ресёрч (Claude / Gemini / NotebookLM), где «AI убирает рутину, но не заменяет исследователя».

Эта папка — case-study-структура поверх уже сделанного ресёрча: каждая задача курса → конкретный deliverable Decode. Двойное назначение: (1) валидировать продуктовые решения до wireframes, (2) готовый скелет портфолио-кейса для Notion.

**Платформа продукта:** iPhone, последняя iOS. **Сегмент:** S1 «Accidental borrowers» — BNPL-пользователи 18–25, UK ([../product/segmentation.md](../product/segmentation.md)).

---

## Карта: 6 задач курса → deliverables Decode

| Модуль · Задача | Output курса | Deliverable Decode | Статус |
|---|---|---|---|
| **M1·T1** Рынок и конкуренты | market map + гипотезы; adv: NotebookLM-репозиторий | [research/01–03](../../research/), конкурентная карта и гипотеза «дыры» в [research/00](../../research/00-executive-summary.md). Adv → T6 ниже | ✅ Сделано сверх базового уровня (+ адверсариальная верификация фактов) |
| **M1·T2** Проверка гипотез на пользователях | interview guide + анализ → сегменты; adv: Sheets→Gemini auto-coding | Сегменты: [segmentation.md](../product/segmentation.md), [jtbd.md](../product/jtbd.md). Гайд + план анализа: [task2-discovery-interviews.md](task2-discovery-interviews.md) | ✅ Артефакты готовы; интервью — к проведению (recruit) |
| **M2·T3** Ценность + AI UX-ревью | валидированный оффер + friction-отчёт; adv: reusable UX-review ассистент | Оффер-формулировки в JTBD §3; reusable UX-review промпт: [assets/ux-review-assistant.md](assets/ux-review-assistant.md) | ◑ Промпт готов, запуск — после wireframes |
| **M2·T4** Симуляция беты через AI-персоны → pre-mortem | pre-mortem карта рисков; adv: persona library | [task4-personas-premortem.md](task4-personas-premortem.md) — 4 персоны S1 × core loop → drop-off heatmap + risk register | ✅ Сделано |
| **M3·T5** Анализ фидбэка (150+ отзывов, VoC) | размеченный массив + action-points; adv: semi-automated VoC | [task5-voc-action-points.md](task5-voc-action-points.md) — VoC-синтез из 1★-отзывов конкурентов ([research/02](../../research/02-competitor-review-mining.md)) → темы + действия | ✅ Аналог под pre-launch (VoC конкурентов вместо своих отзывов) |
| **M3·T6** База знаний с AI-интерфейсом | shared AI-queryable KB; adv: NotebookLM | [task6-knowledge-base.md](task6-knowledge-base.md) — corpus manifest + seed-вопросы + инструкция загрузки в NotebookLM | ◑ Корпус и сетап готовы; загрузка в NotebookLM — действие пользователя |

**Reusable AI-ассеты** («продвинутый уровень» нескольких задач) собраны в [assets/](assets/): UX-review ассистент, шаблоны промптов для генерации персон и VoC-разметки.

---

## Адаптации под контекст (честно)

Курс рассчитан на 4 недели с живым продуктом и командой; Decode — pre-launch solo-портфолио. Отсюда три осознанные адаптации, зафиксированы, чтобы кейс не выглядел натянутым:

1. **T2 интервью:** гайд и план анализа готовы, но реальные 5–8 интервью требуют рекрута UK BNPL-юзеров 18–25 — это следующий шаг пользователя. Пока пробел закрыт техникой курса T4 (AI-персоны как прокси).
2. **T4 персоны — не замена интервью, а де-риск перед экранами.** Явно помечено: выводы pre-mortem — гипотезы для проверки, а не факты. Это соответствует посылу курса «AI не заменяет исследователя».
3. **T5 VoC:** у pre-launch продукта нет своих 150+ отзывов → размечаем 1★-отзывы прямых конкурентов (Voice of the *competitor's* customer) — это валидный pre-launch-аналог: чужие провалы = наши требования.
4. **T6 / adv-pipelines (NotebookLM, Sheets→Gemini):** это инструменты, которые оператор (пользователь) запускает у себя. Мой deliverable — готовый входной корпус, схема разметки и пошаговая инструкция, а не симуляция «живого пайплайна».

---

## Как это читается как кейс (спайн для Notion)

> **Problem → Research → Segment → JTBD → De-risk → Build.**
> 1. **Сжатый ресёрч за дни, а не недели** (M1·T1): 17 отчётов + верификация фактов → карта рынка и единственная незанятая «дыра».
> 2. **От desk-research к сегменту** (M1·T2): 4 сегмента → скоринг → выбор S1 + JTBD с 5 гипотезами под проверку.
> 3. **De-risk до единой строки кода** (M2·T4): AI-персоны проходят core loop → где отвалятся и почему → pre-mortem.
> 4. **Чужие провалы → наши инварианты** (M3·T5): VoC конкурентов → анти-паттерны, которые продукт обязан избежать.
> 5. **Знание переиспользуемо** (M3·T6 + assets): корпус опрашиваемый, промпты-ассеты готовы к следующим итерациям.

Каждый шаг кейса показывает *решение + обоснование + цифру* — то, что нужно senior-PM-портфолио.
