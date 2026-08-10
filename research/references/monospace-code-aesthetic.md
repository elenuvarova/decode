# Код / ASCII / monospace-эстетика — есть ли она и подходит ли Decode (2026-08-02)

**Вопрос:** «поищи мобильный дизайн с код/ASCII-стилистикой — есть вообще такие?»
**Короткий ответ:** на **мобильных app-экранах — почти нет** (семантика Refero отдаёт dark-mode/минимал/кейпады, а не «код»); ближайшее реальное «код на мобиле» — просто dark monospace **code-block** внутри обычного UI (Gemini, Comet). Полноценная code/ASCII/terminal-эстетика живёт на **вебе** (dev-tool/crypto лендинги). Скриншоты — в `refero/` и `refero/styles/`.

## Что реально есть (веб-стили Refero)

Два семейства:

### A. Dark terminal / devtools (near-black + monospace + неоновый акцент)
- **099.supply** — полностью monospace, near-black, каталог как командная строка («Menu ☰ / 099 / Cart⁰», тайлы «C 000 · Theme Toggle»). Самый «ASCII».
- **Warp**, **Trigger.dev**, **Supabase**, **Resend**, **Linear Changelog**, **React Email**, **Monologue** (retro-terminal + scan-lines).
- Ощущение: инженерное, премиальное, но **холодное / «для разработчиков»**.

### B. Light «typeset technical document» / blueprint (белый холст + monospace-акценты + hairline)
- **SST** — белый холст, monospace-hero, code-card с подсветкой, `> npm i sst`. Технично, но спокойно и доступно.
- **cntrl.site (Control)** — белый холст, огромный bold-sans + **monospace мелкие лейблы** («CREATE WEBSITES…»), неон-зелёный/оранжевый функциональные акценты, sharp corners, grid-оверлей.
- **mono.frm.fm**, **19-86.fr**, **Operate** (ledger-стиль на mint-сетке), **imgs.so** (monospace beta-тег на светлом sign-in).
- Ощущение: **точное, «инженерный документ / чертёж / ведомость»**, но не холодное.

## POV: подходит ли Decode

**Нет — если полный dark-terminal (099/Warp/Trigger).** Для тревожного сегмента 18–25 с BNPL это **холодно и отпугивающе**, читается «это не для тебя, это для программистов». Против нашего non-judgemental/спокойного тона.

**Да — если выборочный monospace в light «ledger / verified-document» духе (семейство B).** Это прямо усиливает ядро Decode — **«Calculated, not AI»**, детерминированный true-cost, цитаты, верификация. И это **совместимо с текущими grayscale-вайрфреймами** (белый холст, hairline, монохром — у нас уже так).

### Как это выглядело бы на Decode (перевод в нашу DS)
- **Inter — для человечного:** заголовки, объяснения, тон («We spotted this before it cost you»).
- **Monospace — как функциональный акцент, только для «точного/машинного»:**
  - деньги-математика: `£412.00`, `39.9% APR`, `£5.00 late fee`, `£68.67 × 6`;
  - цитаты-провенанс: `p.2 §4`, `line 12`;
  - бейджи/мета: `CREDIT FILE: YES`, `CALCULATED`, section-eyebrow'ы `NEEDS ATTENTION`;
  - тех-детали: даты дедлайнов, reference ID.
- Радиусы/сетка — наши (не sharp-0 брутализм). Никаких scan-lines/неона.
- Результат: «квитанция/ведомость, которой можно доверять» — доверие через **точность**, а не через холод.

**НЕ брать:** near-black terminal-фон, сплошной monospace для body, неон-акценты, brutalist sharp-0 + гигантский bold, ASCII-арт ради арта.

## Вердикт
Полноценной ASCII/terminal-мобилки почти нет и Decode она не нужна. Но **monospace-ledger-акцент** (семейство B: SST / cntrl.site / mono / Operate) — сильное, дифференцирующее направление для **hi-fi**, идеально рифмуется с «Calculated, not AI» и ложится на наш светлый тайт-каркас. Кандидат №1 на hi-fi-эксперимент: одним экраном (Decode-Result) проверить monospace для чисел/цитат/бейджей.
