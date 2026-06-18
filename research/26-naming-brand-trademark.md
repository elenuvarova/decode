# 26 — Нейминг, бренд и товарный знак «Decode»

Трек: жизнеспособность имени **Decode** для iOS-приложения (UK, сегмент BNPL 18–25; AI-декодер финансовых документов + commitments guardian; freemium ~£4.99/мес; запуск к 15.07.2026).
Дата актуальности данных: июнь 2026.

Метод: прямые запросы к первоисточникам — реестр товарных знаков **TMview** (объединяет UKIPO + EUIPO + USPTO), **iTunes Search API** (App Store GB), **RDAP** реестров доменов (Verisign для `.com`, Google Registry для `.app`, Identity Digital для `.money/.finance/.ai`), маркетплейсы доменов (GoDaddy/Afternic/Spaceship). Каждый факт — с источником; где не нашлось — помечено «не найдено».

> Важная оговорка по методу: официальные веб-формы UKIPO (`trademarks.ipo.gov.uk`) и EUIPO (`euipo.europa.eu`) отдают `403` боту. Поэтому данные по знакам получены через публичный API **TMview** (`tmdn.org/tmview/api/search/results`) — это агрегатор EUIPO, питающийся напрямую из национальных реестров (UKIPO в т.ч.). Номера заявок вида `UK00004214578` и `0186xxxxx` ниже проверяемы вручную в самих реестрах (см. «claims to verify»).

---

## 1. Конфликты: приложения «Decode» в UK App Store

Запрос к iTunes Search API (`country=gb`, `entity=software`, `term=decode`) — приложения, начинающиеся с «Decode»:

| Приложение | Разработчик | Категория | Финтех? |
|---|---|---|---|
| **Decode – QR Code Scanner** | Cole Duclos | Food & Drink | нет |
| **Decode – Know the Truth** | Bloomrise Studios Inc. | Lifestyle | нет |
| Decoding Word Puzzle / Crack The Code \| Decode Word | разные | Games | нет |
| Morse Code – Learn & Decode | Yogesh Dhakal | Games | нет |

Источник: [iTunes Search API, GB/software/«decode»](https://itunes.apple.com/search?term=decode&country=gb&entity=software&limit=30).

**Вывод:** в UK App Store **нет приложения в категории Finance, которое называется просто «Decode»**. Прямого продуктового конфликта по имени в сторе нет — слот «Decode» в финансах свободен. Целевых запросов по «Decode» как UK-финтеху/BNPL-приложению тоже не найдено ([WebSearch: BNPL/debt finance apps UK](https://www.clearfi.app/) — выдаёт ClearFi, Klarna, Emma и т.п., но не «Decode»). Это плюс для ASO-видимости в финансах, но **не** защищает от ТЗ-конфликтов (см. §3) и не гарантирует уникальности в восприятии (несколько «Decode» в смежных категориях стора создают шум при брендовом поиске).

---

## 2. Домены

RDAP-проверка реестров (статус и дата регистрации — первоисточник, не whois-перекупщик):

| Домен | Статус | Детали (источник) |
|---|---|---|
| **decode.com** | занят, «премиум-сейф» | рег. 1994-07-22, продлён до **2033-12-09**, все client-locks, NS = `ns1/ns2.decode.is` — действующий владелец. [Verisign RDAP](https://rdap.verisign.com/com/v1/domain/decode.com). Практически недоступен. |
| **decode.app** | занят, **продаётся за $95,000** | рег. 2022, NS `launch*.spaceship.net` (паркинг). Лендинг Spaceship: «Domain for sale … $95,000 … Buy now / Make offer». [decode.app](https://decode.app) |
| **decode.money** | занят, **выставлен на продажу** | рег. 2025-11-06, NS `ns5/ns6.afternic.com` (маркетплейс Afternic). Редиректит на GoDaddy forsale-паркинг. [Identity Digital RDAP](https://rdap.identitydigital.services/rdap/domain/decode.money) → [GoDaddy forsale](https://forsale.godaddy.com/forsale/decode.money). Цену через бота вытащить не удалось (`403`), но домен **покупаемый**. |
| **decode.finance** | занят | рег. 2024-03-13, NS AWS, отдаёт `403` (есть инфраструктура). [RDAP](https://rdap.identitydigital.services/rdap/domain/decode.finance) |
| **decode.ai** | занят | рег. 2017-12-16, client-locks. [RDAP](https://rdap.identitydigital.services/rdap/domain/decode.ai) |
| getdecode.com | занят | рег. 2015. [RDAP](https://rdap.verisign.com/com/v1/domain/getdecode.com) |
| getdecode.app | занят | рег. **2026-04-29** (свежий — кто-то «греет» имя). [RDAP](https://pubapi.registry.google/rdap/domain/getdecode.app) |
| decodeapp.com | занят | рег. 2013. [RDAP](https://rdap.verisign.com/com/v1/domain/decodeapp.com) |
| usedecode.com | занят | рег. **2026-03-24** (свежий). [RDAP](https://rdap.verisign.com/com/v1/domain/usedecode.com) |
| decodefi.com | занят | рег. 2025-01-08. |
| decodepay.com / decodely.com / decodr.com / getdecoded.com | заняты | разные годы (RDAP, Verisign). |
| **getdecode.money** | **свободен** | RDAP `404`. [Identity Digital RDAP](https://rdap.identitydigital.services/rdap/domain/getdecode.money) |
| **trydecode.app** | **свободен** | RDAP `404`. [Google RDAP](https://pubapi.registry.google/rdap/domain/trydecode.app) |
| **decodefi.app** | **свободен** | RDAP `404`. |

**Вывод по доменам.** Все «чистые» короткие домены `decode.*` (`.com/.app/.money/.finance/.ai`) — заняты; два из них (`.app`, `.money`) **активно продаются** (`.app` за пятизначную сумму). Бесплатно остались только составные/нишевые формы (`getdecode.money`, `trydecode.app`, `decodefi.app`). Это типичный профиль «дорогого дженерик-слова»: имя само по себе сигнализирует ценность, поэтому и домены, и ТЗ уже расхватаны. Для прод-домена под лендинг придётся либо **покупать** `decode.money` (вероятно дешевле `.app`, т.к. на Afternic) / `decode.app` ($95k), либо брать модификатор (`getdecode.*`, `decodefi.app`) — но модификатор-домен в связке с дженерик-именем в сторе усиливает риск размывания.

---

## 3. Товарные знаки (главный риск)

Поиск по TMview, офисы **GB + EM (EUIPO)**, классы **9 (software) / 36 (financial) / 42 (SaaS/tech)** — всего 57 результатов, содержащих «decode». Релевантные **живые** знаки:

### Класс 9 (software) — ЗАНЯТ, это блокер

| Знак | Тип | Офис / № | Статус | Классы | Владелец |
|---|---|---|---|---|---|
| **DECODE** | словесный | GB `UK00004214578` | **Registered** | 9, 35, 41, 42 | **Mipwr Limited** (заявка 2025-06-05) |
| deCODE | фигуративный | GB `UK00004214592` | **Registered** | 9, 35, 41, 42 | **Mipwr Limited** (2025-06-05) |
| **DECODE** | словесный | GB `UK00004024817` | **Registered** | 9 | HAL Robotics Ltd (2024-03-12) |
| **DECODE** | словесный | GB `UK00003660892` | **Registered** | 9, 28 | K & S Technology Ltd (2021) |
| **DECODE** | словесный | EM `018660718` | **Registered** | 9, 28 | KS Distribution GmbH (2022) |
| **DECODE** | словесный | EM `019200392` | **Registered** | 9, 28 | Atomic Austria GmbH (2025-06-10) |
| DECODE LAB | фигуративный | GB `UK00801361599` | Registered | 5, 9, 10, 38, 42, 44 | ECS Screening |

Источник: [TMview API, decode / GB+EM / cls 9,36,42](https://www.tmdn.org/tmview/api/search/results) (запрос `basicSearch=decode`, `fOffices=[GB,EM]`, `fNiceClass=[9,36,42]`).

> **Самый острый конфликт — Mipwr Limited.** У них **словесный** UK-знак «DECODE» в **классе 9** (плюс 35/41/42), зарегистрирован, заявлен ровно за год до планируемого запуска Decode (5 июня 2025). Словесный знак (а не фигуративный) — это широкая защита: покрывает само слово в любом написании/стилизации для ПО. Финтех-приложение неизбежно подаётся в **классе 9** (downloadable software / mobile application). Чем занимается продукт Mipwr под «Decode» — публично установить не удалось (**не найдено**; поиск выдаёт шум про робота WowWee MiP), но для ТЗ-риска это вторично: при подаче своей заявки «DECODE» в кл. 9 в UK она почти наверняка столкнётся с **relative grounds** возражением/уведомлением правообладателя (UKIPO уведомляет ранних владельцев об идентичных/похожих заявках).

### Класс 36 (financial services) — почти ЧИСТО

Единственные «decode» в кл. 36 — это **слоганы**, не само слово:

- **DECODE RISK. UNLOCK OPPORTUNITY.** — GB `UK00003992765` Registered, кл. 35/36, владелец **MIS Quality Management Corp.** (структура Moody's). [TMview cls 36](https://www.tmdn.org/tmview/api/search/results)
- integro COMPLEXITY DECODED — кл. 36, **Expired**.

**Бареовое словесное «DECODE» в классе 36 в UK/EU не зарегистрировано.** То есть финансовый класс свободен, но это не спасает: приложение — это ещё и ПО (кл. 9), а кл. 9 занят.

### Близкие знаки (повышают «шум» и риск смешения)

- **DECODED** (словесный) — GB `UK00911502226` Registered, кл. 35/41/42, **Decoded Ltd.** (известная UK edtech/«learn to code» компания). [TMview](https://www.tmdn.org/tmview/api/search/results)
- DECODEU `UK00811218186`, DECODER `UK00003813981`, RhodeCode, PICDECODE, DECODEX (EM `019239444`, кл. 9/35/42/45) — все Registered.
- Свежие однокоренные заявки 2026: «PERI. YOUR BODY, DECODED.» (identifyHer, кл. 9), «DECODE THE WORLD» (EM, кл. 9/42) — показывают, что слово остаётся популярным у заявителей.

### США (для контекста экспансии)

USPTO через TMview: «DECODE» в кл. 9 — множество живых регистраций (DECODE Learning Systems, Atomic Austria, American Society of Agronomy «DECODE 6», заявки Amrt Agro, Saddleback Educational и др.). [TMview US](https://www.tmdn.org/tmview/api/search/results). Бареовое «DECODE» в кл. 9 в США тоже плотно занято — будущая экспансия за пределы UK столкнётся с теми же ограничениями.

### Риск «дженерик/descriptive» отказа

Отдельно от чужих знаков есть риск **абсолютных оснований** (Trade Marks Act 1994, s.3(1)): «Decode» для продукта, который буквально «декодирует/расшифровывает» документы, может быть сочтён **descriptive** (описывает назначение услуги) или недостаточно distinctive. UK IPO отказывает знакам, которые лишь описывают вид/назначение товара ([Jamieson Law: descriptive trade marks](https://jamiesonlaw.legal/resources/blog/trade-mark-is-descriptive/); [Corsearch: distinctiveness vs descriptiveness](https://corsearch.com/content-library/blog/distinctiveness-v-descriptiveness-in-trademark-law/); [GOV.UK guidance на distinctiveness](https://www.gov.uk/government/publications/common-practice-on-distinctiveness-figurative-marks-containing-descriptive-non-distinctive-words)). На практике «Decode» — это **suggestive** (намекает, но не описывает дословно «summary of BNPL offers»), что обычно регистрируемо; и сам факт многочисленных регистраций «DECODE» в кл. 9 доказывает, что слово в принципе проходит. Но для **финансового** продукта examiner может придраться, что слово описывает функцию. **Чистый словесный знак — рискован сразу с двух сторон** (чужие права + дескриптивность); **фигуративный/комбинированный** (логотип + слово) снижает оба риска.

**Итог §3:** имя «Decode» **как самостоятельный словесный товарный знак в классе 9 в UK получить будет крайне трудно** — класс занят несколькими действующими владельцами, включая свежий словесный знак Mipwr. Это **главный невзятый риск проекта**. Класс 36 свободен, но недостаточен. Дисклеймер: это аналитика по реестрам, не юридическое заключение; перед подачей нужен формальный clearance-поиск у UK-поверенного по ТЗ.

---

## 4. Альтернативы-модификаторы и их доступность

Поскольку бареовое «Decode» проблемно и в кл. 9, и по доменам, реалистичны модификаторы. Сводно (домен / ТЗ-просвет):

| Вариант | Домены | ТЗ-картина (кл. 9/36) | Оценка |
|---|---|---|---|
| **Decode** (bare) | `.com/.app/.money/.finance/.ai` все заняты, `.app`=$95k, `.money` продаётся | кл.9 занят (Mipwr и др.); кл.36 чисто | Высокий риск; домен дорогой |
| **Decode.money** (как бренд-написание) | сам домен покупаем (Afternic) | то же, что bare | Красиво для финтеха, но не снимает ТЗ-риск кл.9 |
| **GetDecode / Get Decode** | `getdecode.com` занят, `getdecode.app` занят (2026), **`getdecode.money` свободен** | «GET DECODE» как фраза в реестрах не найдено | Снижает доменный, не снижает риск смешения с «DECODE» кл.9 |
| **Decode AI** | домена `decode.ai` нет (занят); `decodeai.*` не проверялся детально | «DECODE» + дескриптор «AI» (AI — неохраноспособный элемент) → по сути тот же «DECODE» | Слабо помогает юридически |
| **DecodeFi** | `decodefi.com` занят (2025), **`decodefi.app` свободен** | «DECODEFI» в реестрах не найдено (просвет) | Отстройка от «DECODE»-кластера; «-Fi» читается как финтех |
| **TryDecode** | **`trydecode.app` свободен**, trydecode.com занят | фразовых ТЗ не найдено | Маркетинговый префикс, бренд всё равно «Decode» |
| **Claro / ClearFi и т.п. (ребрендинг)** | `clarofi.com` занят (2025-11) | — | Запасной путь, если «Decode» забракуют юристы |

**Принцип:** модификатор-домен (`getdecode.*`, `decodefi.app`) решает проблему URL, но если в сторе и в маркетинге продукт всё равно зовётся просто «Decode», юридический риск кл.9 и риск смешения с Mipwr/Decoded **сохраняется**. По-настоящему риск снимает либо (а) **уникальный составной знак** («Decode» + отличительный элемент, регистрируемый целиком, напр. «DecodeFi» или «Decode» + сильный логотип-фигуратив), либо (б) смена корня.

---

## 5. App Store: стратегия name + subtitle (ASO)

Правила Apple и веса полей (первоисточники-практики):
- **App Name** — 30 символов, **наибольший** вес в ранжировании; **Subtitle** — 30 символов, второй по весу; **Keyword field** — 100 символов, невидимое поле, только для алгоритма. ([Adapty: app title](https://adapty.io/glossary/app-title/); [ASOMobile 2026 guide](https://asomobile.net/en/blog/aso-in-2026-the-complete-guide-to-app-optimization/); [Appfollow title playbook](https://appfollow.io/blog/app-store-optimization-title))
- **Не дублировать** слова между Name / Subtitle / Keyword field — повтор не усиливает вес, а тратит символы. ([passion.io 2026](https://passion.io/blog/app-store-keyword-optimization-best-practices-for-2026))
- Экономия символов: `:` вместо `-`, `&` вместо «and»; важные ключи — в начало (обрезаются на маленьких экранах). ([Apptweak ASO checklist](https://www.apptweak.com/aso-resources/apple-app-store-aso-checklist))
- Тренд 2026 — **long-tail**: длинные точные фразы, меньше конкуренции. ([ASOMobile](https://asomobile.net/en/blog/aso-in-2026-the-complete-guide-to-app-optimization/))

Поскольку «Decode» в финансах не несёт поискового объёма (никто не ищет «decode» как финтех-задачу), бренд-слово работает на узнаваемость, а высоковолюмные ключи нужно вынести в subtitle и keyword field.

**Рекомендация (под лимит 30/30):**

- **App Name:** `Decode: Money & BNPL Decoder` (28) — бренд впереди, дескриптор и BNPL-ключ внутри лимита. Альтернатива при ребренде/модификаторе: `DecodeFi: BNPL & Money` .
- **Subtitle (30):** `Scan offers, see the true cost` (29) — глагол-выгода + ключи «offers/true cost», без повтора слов из Name.
- **Keyword field (100, невидимый):** `buy now pay later,klarna,clearpay,debt,fees,contract,terms,subscriptions,renewal,credit,budget` — без пробелов после запятых, без дублей с Name/Subtitle.

Принцип: имя «Decode» само по себе ASO-нейтрально, поэтому subtitle и keyword field должны нести весь поисковый объём BNPL/fees/credit. Бренд-defense: занять выдачу по брендовому запросу «Decode» в Finance (там сейчас пусто) до запуска.

---

## 6. Краткое направление бренд-идентичности («спокойный финансовый страж»)

Что имя «Decode» должно сигнализировать и как тон-оф-войс поддерживает позицию «calm financial guardian»:

- **Смысл имени:** «расшифровать сложное → ясность». Это попадает в job-to-be-done («что я подписываю?»), но **рискует звучать как утилита/декодер** (см. конфликт с QR/Morse/«learn to code» Decoded). Бренд-задача — сместить акцент с «инструмент-декодер» на «**спокойный союзник, который переводит мелкий шрифт в понятный язык и стоит на страже обязательств**».
- **Tone of voice:** спокойный, прямой, не патронизирующий, без финансового жаргона и без алармизма. Для аудитории 18–25 с BNPL — «честный старший друг, а не банк»: короткие фразы, plain English, объясняет, не пугает. Trap-detector подаётся как «вот на что обратить внимание», а не «ВНИМАНИЕ ОПАСНОСТЬ».
- **Что имя должно обещать:** ясность (clarity), контроль без подключения банка (privacy/trust — «мы не лезем в ваш счёт»), детерминированность («true cost» — точная цифра, не оценка). «Guardian» = проактивность (Renewal Radar), но мягкая.
- **Визуальное направление (намёк, детали — в треке color-system/brand-identity):** спокойная палитра (не «банковский синий» и не «тревожный красный»; скорее тёплый нейтральный + один спокойный акцент), мягкие формы, выраженный фигуративный знак — он же **снижает ТЗ-риск** (комбинированный знак регистрируемее словесного). Иконография «декодирования» (превращение шумного текста в чистый) лучше, чем буквальные «замки/щиты».
- **Соседи по нейму, от которых надо отстроиться тоном/визуалом:** Decoded Ltd. (edtech «learn to code»), Decode-агентство разработки (Германия/Хорватия, обслуживает в т.ч. fintech — [decode.agency](https://decode.agency/)), Decode Fintech (африканский медиа-ньюслеттер — [decodefintech.com](https://decodefintech.com/)). Ни один не является UK-B2C-финтех-приложением, но все занимают «decode + tech/finance» ассоциативно — ещё один аргумент за сильный собственный визуальный знак и, возможно, уникальный суффикс.

---

## Key takeaways for Decode

1. **Главный риск — товарный знак в классе 9, и он реален.** В UK уже есть **зарегистрированный словесный знак «DECODE» в классе 9** у **Mipwr Limited** (`UK00004214578`, заявка 2025-06-05), плюс ещё «DECODE» кл.9 у HAL Robotics, K&S, и EUIPO-знаки Atomic Austria/KS Distribution. Финтех-приложение обязано регистрироваться в кл. 9 → **бареовый словесный знак «Decode» в UK почти наверняка не пройдёт** (relative grounds). Класс 36 (financial) при этом **свободен** от бареового «Decode» (есть только слоган Moody's «DECODE RISK…»). Источник: [TMview API](https://www.tmdn.org/tmview/api/search/results). Нужен формальный clearance у UK-поверенного перед любой подачей.

2. **App Store сам по себе чист, но это не защита.** В UK App Store **нет финансового приложения «Decode»** ([iTunes Search API](https://itunes.apple.com/search?term=decode&country=gb&entity=software&limit=30)) — слот в Finance свободен, ASO-видимость по бренду берётся легко. Но в сторе уже 3–4 «Decode» в смежных категориях (QR/Morse/lifestyle) → брендовый поиск «Decode» шумный.

3. **Все чистые домены `decode.*` заняты; два продаются дорого.** `decode.app` — **$95,000** ([Spaceship](https://decode.app)), `decode.money` — **выставлен на продажу** через Afternic/GoDaddy ([RDAP](https://rdap.identitydigital.services/rdap/domain/decode.money)), `decode.com` практически недоступен (locked до 2033). Бесплатны только составные: **`getdecode.money`, `trydecode.app`, `decodefi.app`** (RDAP `404`).

4. **Рекомендация по риску.** Снять давний риск имени можно тремя путями, по убыванию надёжности: (а) **сменить/усилить корень** на регистрируемый составной знак — самый чистый просвет у **«DecodeFi»** (ни ТЗ «DECODEFI», ни занятого `decodefi.app` не найдено) — это и отстраивает от «DECODE»-кластера, и читается как финтех; (б) сохранить имя «Decode», но регистрировать **комбинированный (фигуративный) знак** «логотип + Decode» и **только в классе 36** (+ возможно 9 с риском), приняв возражения; (в) оставить «Decode» как маркетинговое имя без сильного ТЗ — самый дешёвый, но самый рискованный путь (коллизия с Mipwr/Decoded, размывание). Для «спокойного финансового стража» сильный фигуративный знак полезен вдвойне — он и снижает ТЗ-риск, и несёт визуальную отстройку.

5. **ASO-стратегия от имени не зависит:** «Decode» поискового объёма в финансах не даёт, поэтому Name = бренд + 1 ключ (`Decode: Money & BNPL Decoder`), Subtitle (30) = выгода-фраза без дублей (`Scan offers, see the true cost`), Keyword field (100, скрытый) = весь BNPL/fees/credit-объём. Источники: [Adapty](https://adapty.io/glossary/app-title/), [ASOMobile 2026](https://asomobile.net/en/blog/aso-in-2026-the-complete-guide-to-app-optimization/), [passion.io](https://passion.io/blog/app-store-keyword-optimization-best-practices-for-2026).
