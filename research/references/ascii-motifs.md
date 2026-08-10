# ASCII-мотивы в мобильных приложениях — что реально существует (2026-08-10)

**Вопрос:** «а приложения с ASCII-мотивами? поресёрчь».
**Метод:** Mobbin `search_screens` (6 запросов под разные проявления мотива), Refero `search_screens` (iOS), веб-поиск по тренду. Скрины — в [`ascii-motifs/`](ascii-motifs/).
**Продолжение:** [monospace-code-aesthetic.md](monospace-code-aesthetic.md) (тот проход искал «код/терминал» и нашёл почти пусто) и [moodboard-match.md](moodboard-match.md) (пиксель/dot-matrix/glitch).

---

## Главный вывод: мотив есть, но он расслаивается на 4 разных приёма

Прошлый проход спрашивал «есть ли терминал на мобиле» и получил «почти нет». Это был неправильный вопрос. ASCII на мобиле живёт не как терминал, а **четырьмя несводимыми приёмами** — и только один из них действительно «нарисован символами».

### Приём 1. Настоящий ASCII: интерфейс, нарисованный символами с клавиатуры ⭐⭐⭐

Единственный найденный **потребительский** пример — **Co–Star**. И это подарок, потому что аудитория у него ровно наша: Gen Z, эмоционально нагруженный контент, тревожность.

- [`costar-mash-ascii-box.webp`](ascii-motifs/costar-mash-ascii-box.webp) — заголовок как ASCII-линейка `——+—+—+— WANT TO PLAY? +—+—+—`, рамка игры нарисована из `|` и `-`, кнопка «START PLAYING» — двойная рамка из символов. [Mobbin](https://mobbin.com/screens/981f7e86-a42e-4e37-a1b3-ef370ec2aece)
- [`costar-2025-in-love-report.webp`](ascii-motifs/costar-2025-in-love-report.webp) — годовой отчёт как **машинописный документ**: секции капслоком (`NUMBER OF CRUSHES:`), пунктирная рамка вокруг вопроса, разделитель `---`, и внизу провенанс списком с обратными слэшами: `\ Aquarius Sun / \ Capricorn Venus / \ Leo Mars`. [Mobbin](https://mobbin.com/screens/70fd94a9-85cc-46fc-b2f2-05b90d9e0352)
- [`costar-ask-answer-boxed.webp`](ascii-motifs/costar-ask-answer-boxed.webp) — ответ на вопрос сложен в **сетку из hairline-рамок**: блок «YOU ASKED», блок диаграммы + подпись транзита, блок текста, блок «HOW WAS THIS ANSWER?» с дисклеймером. Ровно наша структура «ответ + источник + фидбек». [Mobbin](https://mobbin.com/screens/b093ef6b-4f3a-4b0d-823e-d5902bb280d7)
- [`costar-transit-provenance.webp`](ascii-motifs/costar-transit-provenance.webp) — **предложение, собранное из цитат-чипов**: «Recent conversations `MERCURY NOW` / are amplifying `CONJUNCTION (0°)` / your steadfast dedication `YOUR CAPRICORN VENUS`». Каждое утверждение подписано машинным источником прямо в строке. [Mobbin](https://mobbin.com/screens/a6ddd89f-9e58-41b5-8dc0-81b96297eed8)
- [`costar-home-do-dont.webp`](ascii-motifs/costar-home-do-dont.webp) — главный экран: serif-заголовок + две колонки `Do` / `Don't`, всё на белом. Тёплое, не холодное. [Mobbin](https://mobbin.com/screens/fbed7524-127f-4a1f-833c-bdb6b186aca9)

**Почему это ключевая находка.** Прошлая записка вынесла вердикт «ASCII = dark terminal = холодно = не для нашего сегмента». Co–Star показывает **третий путь, который мы пропустили: ASCII на белой бумаге.** Не терминал, а *машинопись* — телеграмма, распечатка, служебная записка. Тон получается не «для программистов», а «документ, который кто-то напечатал для тебя лично». Для Decode это снимает главное возражение.

### Приём 2. Dot-matrix / split-flap — символы как физическое табло ⭐⭐

- **raum.** ([`raum-manifest-dotmatrix.jpg`](ascii-motifs/raum-manifest-dotmatrix.jpg)) — лучшее из найденного технически. Таблица поездок как **аэропортовое табло**: янтарные dot-matrix глифы на чёрном, колонки `cc / start / end / nights`, значения `08.07.26`, `002`, погашенные ячейки-заготовки на пустых строках, статус-строка `● LIVE. · 11 TRIPS · 7 DEST · DATE SORT`. Заголовок «YOUR TRIPS» — split-flap. [Refero](https://refero.design/screens/37d35768-1a11-47ba-a02a-7c0d89324930) · также [`raum-sort-dropdown.jpg`](ascii-motifs/raum-sort-dropdown.jpg), [`raum-trip-detail-sheet.jpg`](ascii-motifs/raum-trip-detail-sheet.jpg)
- **Orb Social**, **one year**, **Poolsuite FM** (`DYNAMIC STEREO` кнопка-решётка) — уже были в [moodboard-match.md](moodboard-match.md).

Приём даёт «прибор, который считает» — но требует тёмного фона, поэтому у нас применим только точечно.

### Приём 3. ASCII-прогресс: индикатор, набранный блоками ⭐⭐

- **alias** ([`alias-ascii-progressbar.webp`](ascii-motifs/alias-ascii-progressbar.webp)) — «Linking Your Seller Data**_**» с настоящим курсором-подчёркиванием в заголовке, внизу `LINKING…` / `64%` и полоса из **отдельных вертикальных блоков в рамке** — буквально `[||||||||||    ]`. [Mobbin](https://mobbin.com/screens/232a745a-3603-4650-90e9-d489f7cfbb8b)

Это самый переносимый приём: один компонент, не требует перестройки экрана.

### Приём 4. Код-блок как контент — «машина за работой» ⭐⭐

Самая распространённая форма на мобиле (и самая близкая к нашему processing-экрану):

- **Vibecode** ([`vibecode-agent-log-codeblock.webp`](ascii-motifs/vibecode-agent-log-codeblock.webp)) — «Generating your app»: список задач с **зачёркиванием выполненных**, лог `Read file (1 file)` / `Wrote file`, и внутри — mono-блок `bash → bunx tsc --noEmit`. Показывает работу, а не спиннер. [Mobbin](https://mobbin.com/screens/e7551a59-574c-4ac0-b05a-4d18ea30bea7)
- **Manus** ([`manus-executing-command.webp`](ascii-motifs/manus-executing-command.webp)) — шаги-аккордеоны с чекмарками, внутри строки `>_ Executing command  find /home/ubuntu…`. [Mobbin](https://mobbin.com/screens/1aa6ea9b-8f16-49e5-91a6-cc20794ddff2)
- **Mimo** ([`mimo-console-output.webp`](ascii-motifs/mimo-console-output.webp)) — вкладки `script.py / Console`, вывод `Hello, World` моноширинным на белом. [Mobbin](https://mobbin.com/screens/748ea2e8-0fff-4f3e-8325-8ef3c1f36dc5)

---

## Соседние семейства, которые оказались полезнее прямого ASCII

### `+`-сетка: структура ASCII-таблицы без единого ASCII-символа ⭐⭐⭐

**Hyundai Card** ([`hyundaicard-plus-junction-grid.webp`](ascii-motifs/hyundaicard-plus-junction-grid.webp)) — меню в две колонки, где hairline-разделители **пересекаются плюсиками на стыках**, как углы ASCII-таблицы. Белый фон, крупный корейский sans, полная читаемость. Это финансовое приложение. [Mobbin](https://mobbin.com/screens/b4e00d81-f3c3-4da8-b92e-081053bc4fff) · [ещё экран](https://mobbin.com/screens/07235c01-b633-4c8c-b01a-c29e90368e79)

Приём даёт **весь смысл ASCII-таблицы (расчерченность, инженерность, «это ведомость») ноль-ценой по доступности** — потому что `+` здесь нарисован, а не набран. Для Decode это, вероятно, самая сильная находка после Co–Star.

### Термочек: настоящий предок ASCII в финансах ⭐⭐

- **PocketCU** ([`pocketcu-thermal-receipt.webp`](ascii-motifs/pocketcu-thermal-receipt.webp)) — корейский чек внутри приложения: моноширинный, разделители `--------`, `********* CU Pay 머니 *********`, выравнивание сумм по правому краю символами. [Mobbin](https://mobbin.com/screens/a8a5dc8f-e1e2-4c3d-baec-9a804cb3246b)
- **GoPay** ([`gopay-receipt-mono.webp`](ascii-motifs/gopay-receipt-mono.webp)) — распознанный чек: пунктирные разделители, `Total : 79.66` моноширинным. [Mobbin](https://mobbin.com/screens/93fb92f2-7443-48cc-9ff6-ab03a244bcca)
- **(Not Boring) Weather** ([`notboring-weather-ledger-table.webp`](ascii-motifs/notboring-weather-ledger-table.webp)) — блок `ILLUMINATION 0% / PHASE NEW / MOONRISE 7:00A` как key-value ведомость с инвертированной шапкой. [Mobbin](https://mobbin.com/screens/c6072cf1-10ee-4f85-b50d-f22657746399)

Чек — это культурно **самая доверяемая** форма моноширинного набора и единственная, которую наш сегмент видит каждый день. Для «Calculated, not AI» это точнее, чем терминал.

### Пиксель-игра (для полноты)
**Babbel / Phrase Maze** ([`babbel-phrase-maze-pixel.webp`](ascii-motifs/babbel-phrase-maze-pixel.webp)) — пиксельный интерлюд внутри обычного обучающего приложения. [Mobbin](https://mobbin.com/screens/7d85cf2e-c1ea-4656-adb9-a03f65955138) Подтверждает вывод прошлой записки: пиксель в приложениях = дозированный эпизод, не каркас.

---

## ⚠️ Инженерное ограничение, из-за которого нельзя набирать ASCII буквально

Если рамку/линейку **набрать символами** (`|`, `-`, `+`), ломаются сразу три вещи:

1. **VoiceOver** прочитает `——+—+—+—` как поток мусора («тире тире плюс тире…»). Нужен `accessibilityHidden` на каждый декоративный узел — то есть отдельная дисциплина в вёрстке.
2. **Dynamic Type** — ASCII-рамка держится только на фиксированной ширине глифа. На увеличенном шрифте она рвётся по переносам, на уменьшенном не сходится. Наши вайры собраны под Dynamic Type.
3. **Локализация и ширина** — ASCII-линейка, посчитанная под 402 pt, не переживёт другую ширину экрана.

**Отсюда правило для Decode: ASCII — это язык формы, а не способ вёрстки.** Рисуем hairline-рамки, `+`-стыки и пунктиры **графикой и токенами** (как Hyundai Card), а моноширинный шрифт применяем к **настоящему тексту-данным** (числа, даты, ссылки на источник). Буквально набранные символы допустимы ровно в одном месте — короткий декоративный акцент, помеченный как декоративный (например `_`-курсор после заголовка processing, как в alias).

---

## POV: что из этого берём в Decode

Прошлый вердикт («monospace-ledger — да, dark-terminal — нет») подтверждается, но **уточняется в трёх местах**:

| Экран Decode | Приём | Источник |
|---|---|---|
| **Processing** («декодируем») | лог-стадии с зачёркиванием + `_`-курсор + блочный прогресс `64%` вместо спиннера | Vibecode + alias |
| **Decode-Result** | секции капслоком, hairline-рамки вокруг блоков, ловушка в пунктирной рамке | Co–Star (ask-answer, 2025-report) |
| **Провенанс / цитаты** | утверждение + машинный источник чипом **в строке текста** | Co–Star transit |
| **True-cost / математика** | ведомость: моно-числа справа, пунктир между лейблом и суммой | PocketCU, GoPay, Not Boring Weather |
| **Vault / список** | `+`-стыки на пересечениях hairline вместо сплошных разделителей | Hyundai Card |
| **Сплэш / бренд-слой** | dot-matrix заголовок, янтарь на чёрном — **только тут**, дальше не пускаем | raum., Orb Social |

**НЕ берём:** тёмный фон в транзакционных потоках, неон, набранные символами рамки, ASCII-арт как иллюстрацию.

---

## Вердикт

Ответ на «есть ли приложения с ASCII-мотивами» — **да, но их единицы, и главный из них Co–Star**, который делает ровно то, что мы считали невозможным: ASCII-эстетика в светлом, тёплом, эмоционально мягком продукте для Gen Z. Это снимает возражение «холодно для нашего сегмента» и меняет статус направления с «рискованного эксперимента» на **обоснованный курс**: машинопись/ведомость, а не терминал.

Практический следующий шаг не изменился, но стал конкретнее: собрать **Decode-Result** в hi-fi по связке Co–Star (структура секций и провенанс в строке) + Hyundai Card (`+`-сетка) + чековая математика — и рядом **Processing** по связке Vibecode + alias, потому что именно там мотив «декодирования» окупается буквально.

---

## Источники (вне Mobbin/Refero)
- [Aesthetics in the AI era: visual + web design trends for 2026](https://medium.com/design-bootcamp/aesthetics-in-the-ai-era-visual-web-design-trends-for-2026-5a0f75a10e98) — Technical Mono как мейнстрим-тренд 2026, ASCII-арт и wireframe-диаграммы как штатные украшения.
- [aigoodies: aesthetics 2026](https://aigoodies.beehiiv.com/p/aesthetics-2026) — фиксированная сетка и plain monospace как осознанное ограничение.
- Отдельный класс — ASCII-**генераторы** ([ASCII Art Generator](https://apps.apple.com/lu/app/ascii-art-generator-image-text/id6753155579), Textpics): там ASCII это контент, а не интерфейс, поэтому для нас нерелевантно.
