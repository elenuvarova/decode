# Refero-ресёрч под wireframes (2026-08-02)

**Задача:** «поресёрчь через Refero — может что-то подойдёт для wireframes». Платформа iOS.
**Метод:** `refero_search_screens` по нашим типам экранов (decode-результат, овервью, скан, ask) + визуальная проверка топ-кандидатов через `refero_get_screen_image`. Скриншоты — в `refero/`.
**Фокус:** структура/плотность под наш example3-тайт-курс, НЕ визуальный стиль (мы в grayscale-вайрфреймах).

## Топ-находки

### 1. Subo (Finance — «Bills, renewals & reminders») — наш прямой конкурент ⭐
Самое близкое к Decode из всего, что есть. Стоит держать как эталон паттернов Vault/Radar.
- **`subo-subscription-detail`** → наш **Vault-Detail / Subscription-Management**. Ключевое:
  - **3-колоночная стат-полоса** (Plan | £13.99 | Active) сразу под шапкой — очень скан-friendly, плотно. У нас в Decode-Result стек key-value; полоска из 3 значений (напр. `Total | Next | Credit-file`) читается быстрее и тайтовее.
  - **Key-value строки с ведущим icon-box** (📅 Next bill · in 30 days / 🔔 Renewal reminder · 3 days before): иконка в скруглённом квадрате + лейбл слева + значение справа. Это наш ListItem, но с icon-box-трактовкой — чисто и плотно.
  - **Двухуровневая иерархия действий**: обратимое primary «Mark as cancelled» (чёрная заливка) отдельно от деструктивного «Delete Subscription» (красный текст на белой карточке). Чётче нашей текущей пары равнозначных кнопок в Vault-Detail («Stop watching / Delete document»).
- **`subo-add-subscription`** → наш **Add-Commitment**: чёрная карточка-превью + сегмент paid/free-trial + стек полей (amount/date/billing-cycle/category/payment) + reminder-toggle + notes + full-width disabled CTA до валидности.
- **`subo-delete-confirm`** → наш **Delete-*-Confirm**: protected-delete через tooltip-подтверждение.

### 2. Copilot (Finance) → **Overview / Overview-Empty / Vault-Detail**
- **`copilot-overview-empty`**: секции-карточки `заголовок + крупная цифра + inline empty-текст + футер-ссылка «Review in detail →»`. Хорошая структура для нашего Overview (домены: Commitments / Renewing / Active). ВАЖНО: у Copilot карточки ОЧЕНЬ воздушные — берём структуру, но с нашим тайт-паддингом (16), не их.
  - Компактная сводная строка сверху: «9 accounts being tracked · add →».
  - Честные empty-состояния внутри карточек («No recurring payments being tracked») → наш Overview-Empty.
- **`copilot-recurring-sheet`**: bottom-sheet рекуррентного платежа (name + next payment + мини-график + recent transactions + rename/edit/delete) → альтернативная компоновка нашего Vault-Detail.

### 3. Claude / ChatGPT / Comet → **Ask (Q&A по документу)**
- **`claude-ask-pdf-summary`** ⭐: **чип-вложение документа** (иконка файла + имя + бейдж PDF) → prompt-бабл юзера → структурированный ответ (нумерация + вложенные буллеты). Ровно наш Ask: скоуп на документ виден через чип сверху треда. Берём СТРУКТУРУ (вложение → вопрос → структурированный ответ), не серифный стиль Claude.
- **`comet-ask-suggestions`**: welcome с пилюлями-подсказками + нижний input-трей → наш Ask-empty + suggestion-chips.
- ChatGPT: ответ + строка «Sources» + фидбэк-иконки → наш source/citations-паттерн.

### 4. Прочее приложимое
- **`copilot-privacy-table`** (Pi/Hims-стиль): двухколоночная таблица «категория данных → Yes/No» на скан → наш **Consent-Center / Privacy** («что мы храним») — плотный, честный, легко-сканируемый формат.
- Скан: Bear («Investor Agreement» review + crop/filter-тулбар), Freeform (legal-doc в рамке-видоискателе, grayscale), Dropbox (arrange-режим) → **Scan-Capture / Scan-Review / Multi-Page-Scan**.
- LookUp: camera-permission primer (close + текст + primary CTA) → **AppStore-Perm-Camera**.

## Decision ledger — что берём

| Паттерн | Источник | Наш экран | Вердикт |
|---|---|---|---|
| 3-колоночная стат-полоса под шапкой | Subo detail | Decode-Result, Vault-Detail | **Взять** — тайтовее нашего стека, скан-friendly |
| Icon-box key-value строки | Subo detail | Vault-Detail, Result key-terms | **Взять** — плотно, наш ListItem + leading icon-box |
| Двухуровневая иерархия действий (обратимое ≠ деструктивное) | Subo detail | Vault-Detail, Confirm | **Взять** — чётче пары равных кнопок |
| Карточка `title + figure + «Review →»` | Copilot | Overview | Взять СТРУКТУРУ, наш тайт-паддинг (не их воздух) |
| Ask: чип-вложение документа → структурированный ответ | Claude | Ask | **Взять** — делает скоуп на документ явным |
| Suggestion-пилюли + нижний трей | Comet | Ask-empty | Взять |
| Двухколоночная Yes/No таблица приватности | Pi/Copilot | Consent-Center | Рассмотреть |

**НЕ берём:** воздушные карточки Copilot (против нашего тайт-курса), серифную типографику Claude, цветные бренд-шапки Subo (мы grayscale-вайрфрейм).

## Рекомендация
Самый ценный и низкорисковый апгрейд — **3-колоночная стат-полоса + icon-box строки + двухуровневые действия** из Subo на Decode-Result и Vault-Detail: делает ключевые экраны плотнее и сканируемее, ровно в духе example3. Ask можно усилить видимым чипом-документом (скоуп). Всё — через наши DS-компоненты/переменные, не хардкод.
