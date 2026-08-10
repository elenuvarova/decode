# Decode — Full Audit (2026-07-11)

**Scope:** весь Figma-файл `ZR4wMSgGSbdckASvpiFwIP` — все **6 страниц** и все **64 экранных фрейма**, впервые отсмотренные визуально целиком (2x-рендеры), плюс живые переменные/стили (`get_variable_defs`, текст-стили), свипы Plugin API (клиппинг, фактическая рампа), прототип (`prototype/app.js`, 49 экранов / 14 флоу) и доки — механически.
**Метод:** 10 параллельных адверсариальных аудиторов (~600k токенов): 8 экранных батчей — A Onboarding+auth · B Scan→Result core · C Watch-слой · D Vault · E Monetize+Settings core · F Settings-сателлиты · G Errors+empty+permissions · H Destructive+system+success — плюс DS-аудитор (Foundations / Library / Cover / переменные) и механический (прототип+доки+git). Каждый батч кросс-чекал копирайт, арифметику и демо-данные **между** экранами, не только внутри. Часть рендеров из-за rate-limit Figma MCP снята через figma-desktop / репо-экспорты (помечено ниже). Предыдущие аудиты: [audit-2026-07-02-full.md](audit-2026-07-02-full.md), [audit-2026-06-26-full.md](audit-2026-06-26-full.md).

---

## Inventory — что изменилось с 02.07

- **64 экранных фрейма** (63 из аудита 02.07 + Source-Highlight, построенный в тот же fix-пасс) — **новых экранов с 02.07 нет; hi-fi не начинался.**
- Полный листинг страниц (6): помимо «Screens — Wireframe» и продуктовых/DS-страниц обнаружены **«refs»** (1 картинка), **«SF Symbols»** (71 источник иконок) и **«📐 DS — Docs»** (Cover-фрейм) — см. поправку записи ниже.
- **Annotation-слой** (12 JTBD-джоб-стеков, FlowLabel'ы, борд Segment & JTBD) — мета-документация вне DS; из DS-проверок исключён корректно.
- **Токены: дрейфа с 02.07 нет** — Primitives 24 / Spacing 15 / Theme 35 (режимы Wireframe + Light), 9 text-стилей, рампа живая.
- **Свипы Plugin API:** 0 видимых текст-клипов на продуктовых экранах; фактическая продуктовая рампа: **12×492 / 13×3 / 17×496 / 20×46 / 26×14 / 34×17** — чистая (три 13px-ноды — см. DS-7).
- **Git:** HEAD `79ac64e`; uncommitted — только `docs/product/jtbd.md` (§8 карта работ); untracked — `docs/case-study/` и `prototype-check.png`.

---

## Поправка записи 02.07

Аудит 02.07 ошибочно зафиксировал «Cover/Docs-страницы нет» — листинг страниц тогда вернул только 2. **Страница «📐 DS — Docs» с Cover-фреймом существовала**; запись исправлена этим аудитом. Замечание «Page 1» остаётся закрытым (страница переименована в «Screens — Wireframe»).

---

## Вердикт одной строкой

**Системный слой держится: enforcement стабилен, 0 клипов, рампа чистая, токены без дрейфа, механика 4/4 PASS. Аудит впервые прошёл ВСЕ 64 экрана — и главный новый класс находок уже не система, а (а) когерентность демо-данных/копирайта МЕЖДУ экранами и (б) микро-UX-деталировка. Честная оценка: v0.6 → v0.65.** Перед hi-fi нужны два пасса: **контент-пасс** (один связный демо-датасет на весь файл) и **микро-UX-пасс** (навбары/Done/back, TabBar-инсеты, деструктивные веса).

---

## Что удержалось с 02.07

Проверено на живом файле и рендерах, не по отчётам:

- ✅ **Все фиксы 02.07 на месте:** 0 текст-клипов по файловому свипу (B1 + 5 сопутствующих не вернулись); Paywall — **CLEAN**, selected-state читается, арифметика верифицирована (£41.99/12 = £3.50/mo; −30% честные; цена в футере соответствует выбранному Yearly); Settings — секция GENERAL существует; Source-Highlight построен и вшит во флоу; Save-Watch-Success с «Adjust reminders»; Vault-Detail — деструктив разнесён (не всплыл ни у одного аудитора).
- ✅ **DS-значения — ноль расхождений в обе стороны:** все 11 primitives, все 35 ролей (включая 13 доменных), радиусы 8/12/16/20/9999, все 9 text-стилей (метрики совпадают с YAML до пикселя); счётчики секций точные (Atoms 8 / Molecules 18 / Organisms 5 / Icons 70); шкала спейсинга на борде полная 4/8/12/16/20/24/32/48; роль `icon` на борде и живая; «figures-md» нигде не всплывает.
- ✅ **Механика 4/4 PASS** (см. блок ниже): 64/51/49/14 сходятся во всех доках, 0 битых img/hotspot/flow-step/orphan.
- ✅ **Кросс-экранная сшивка местами образцовая:** late fee £5 / «14 days after due date» / p.2 §4 идеально совпадают через Decode-Result → Ask → Source-Highlight; £348+£64=£412 на hero ✓; 294+62+40=396 на Alert-Detail и Calendar ✓; 412−389=£23 на Compare ✓; quiet hours 22:00–08:00, hello@/privacy@decode.app, «v0.1 · made in the UK» — согласованы.
- ✅ **FCA-свип почти чистый:** ни одного «you should / we recommend / switch to», честный signposting (MoneyHelper · StepChange · National Debtline, телефоны реальные), дисклеймеры на месте. Исключения — 4 находки ниже (I-6, I-7, теневые I-24-bullets).

---

## Findings — консолидировано и дедуплицировано (10 отчётов)

Severity: **Blocker · High · Med · Low**. Verdict: **C** = CONFIRMED (аудитор цитирует видимое свидетельство/арифметику), **P** = PLAUSIBLE (нужна проверка в файле). Пометка `*` — экран ревьюился по репо-экспорту 26.06/02.07 (тот же 2x-пайплайн); перепроверить, если фрейм правился после.

### I. Когерентность демо-датасета и копирайта

Демо-данные писались поэкранно — и на первом же полном проходе разошлись: суммы, даты, счётчики трапов и имя продукта не сходятся между экранами одного флоу.

| # | Sev | V | Находка | Где | Фикс |
|---|---|---|---|---|---|
| I-1 | **Blocker** | C | Summary-чип «Due 7d **£86**» и «30 days **£214**» противоречат строкам того же экрана: «Klarna · 3 plans **£294** due this week» (£86 < £294), а Payment-Calendar даёт этой неделе £396 (£708 с бойлером). Ни одно прочтение не сшивает summary-карту со списком | Overview `99:603` ↔ Payment-Calendar | Пересчитать демо-датасет один раз и переиспользовать (напр. Due 7d £396 / 30d £708 / 60d £770) |
| I-2 | High | C | AI-summary «A credit agreement for £348 over 6 payments of £58. **Pay on time and it costs nothing extra**» противоречит hero того же экрана: TRUE COST **£412**, «£64 more than the £348 headline price», APR **39.9%**. Если «nothing extra» — true cost £348 и APR ~0%; если £412/39.9% — платежи ~£68.67, не £58 | Decode-Result `99:528` | Выбрать ОДИН сценарий: 0% Pay-in-N (£348, только late fee £5) или interest-bearing (£412, 6×£68.67, summary переписать) |
| I-3 | High | C | Заголовок цитируемого документа «Klarna **Pay in 3** — Terms · page 2, section 4» — Pay in 3 = 3 беспроцентных платежа, а весь флоу говорит про **6** instalments (Trust-Repair цитирует «£412.00 — Total amount payable over 6 instalments»). Один вымышленный документ — три разных продукта | Source-Highlight `567:3512` | «Klarna Financing — Terms» (если остаётся 39.9%) или весь датасет → честный Pay-in-3 |
| I-4 | High | C | Невозможная дата-математика: «Klarna payment due · **In 4 days · 28 Jun**» (⇒ сегодня 24 Jun) рядом с «Boiler cover auto-renews · **In 14 days · 24 Jun**» (⇒ сегодня 10 Jun) — у более ранней даты больше дней до срока. Пара повторяется на трёх экранах | Alerts-Inbox `100:546` + Overview + Alert-Detail | Зафиксировать одно «сегодня» (напр. 24 Jun), бойлер → 8 Jul или «Renews today» |
| I-5 | High | C | Один и тот же Klarna-док на £412: Compare — «Traps **2**», Document-History (Current) — «£412 total · **3 traps**», Vault-List — «£412 · **3 plans**». Два числа и два существительных для одного факта | Compare-Offers / Document-History / Vault-List | Одно число (3) и один термин («traps») во всех трёх местах |
| I-6 | High | C | Primary-CTA «**Save the cheaper one**» — функционально рекомендация (FCA-инвариант) и прямо противоречит вердикту двумя блоками выше: «Decode shows the facts; **the choice is yours**». Бонус: «cheaper one» (Clearpay · Sofa) — уже активный договор, уже в Vault, «сохранять» его бессмысленно | Compare-Offers | Нейтральный CTA: «Save comparison» / «Save Clearpay decode to Vault» |
| I-7 | High | C | «The same cover is quoted elsewhere from **~£240** — switching or haggling before 24 Jun could **save ~£70**» — несорсированный рыночный клейм в advice-обёртке, противоречит футеру того же экрана «it doesn't give advice» | Decode-Result-Insurance `107:700` | Оставить факт shop-around, убрать/атрибутировать £240/£70 письму («Your renewal letter must show last year's price…») |
| I-8 | High | C | CTA «**Start Pro · £3.50/mo**» — цена £3.50/mo существует только как £41.99 billed yearly (Paywall); на экране нет ни «billed yearly», ни footnote. Misleading price (ASA / App Review риск) | Trial-Expired | «Start Pro · £3.50/mo billed yearly» + footnote «£41.99/year», либо CTA «See plans» → Paywall |
| I-9 | High | C | Футноут «Sign in with Apple is offered as required **(App Store 5.1.2)**. We only store what's needed to sync» — внутренняя ссылка на App-Review-guideline утекла в юзер-копию; для 18–25 бессмысленно/тревожно | Onboarding-4-Register | Убрать первое предложение целиком |
| I-10 | High | C | Privacy-Policy: «or write to the address in **Settings → About**»; Legal-Disclaimer: «(Settings → About)» — (а) в Settings **нет строки About** (только футер «Decode v0.1…»), (б) на About **нет почтового адреса** (только «Operator: Decode Ltd (UK)») — обещание без адреса где-либо в продукте | Privacy-Policy + Legal-Disclaimer + About | Добавить About-строку в Settings и адрес на About, либо переписать обе ссылки |
| I-11 | Med | C | Provenance-лейблы перевёрнуты: Result — «Total repayable — **Calculated**», «Representative APR — **Calculated**»; Trust-Repair про те же £412 — «**WE READ THIS FROM PAGE 1**: '£412.00 — Total amount payable…'» — значит read, не calculated (а representative APR всегда раскрыт в доке). Ядро trust-механики противоречит само себе | Decode-Result ↔ Trust-Repair `74:215` | Total repayable и APR → «From your doc»; «Calculated» — только для TRUE COST-дельты |
| I-12 | Med | C | Обещание удаления фото безусловно: Perm-Camera «…and **delete the photo afterwards**», Error-CameraDenied* «…and **don't keep the photo**» — противоречит Vault (сохранённые сканы хранятся). Фальсифицируемый trust-клейм на privacy-праймящих экранах | AppStore-Perm-Camera `102:555` + Error-CameraDenied | «…deleted unless you save the decode» в обоих местах |
| I-13 | Med | C | «£294 — **3rd of 3 overlapping**» (одна выплата одного плана) vs Overview/Calendar «Klarna · **3 plans £294**» (сумма трёх). Одно из двух неверно | Alert-Detail `95:480` ↔ Overview/Calendar | «£294 across 3 overlapping plans» везде |
| I-14 | Med | C | Заголовок «**£396** leaving your account by 28 Jun» игнорирует £312 boiler auto-renewal от 24 Jun (раньше 28-го) ⇒ фактически £708; бойлер и в THIS WEEK-сумму не входит | Payment-Calendar `117:1071` | Само разрешится фиксом I-4 (перенос renewal на июль) |
| I-15 | Med | C | PayPal · Headphones (£40, 28 Jun) и Clearpay 28 Jun £62 — оба в Calendar и в окне «next 14 days» — отсутствуют и в COMING UP, и в COMING LATER (PRO), при этом более поздние (28 Jul, 2 Sep) показаны. Pro-tease пропускает именно ближайшие невотченные | Alerts-Inbox | Добавить обе 28-Jun строки в COMING LATER (PRO) |
| I-16 | Med | C | Settings-строка «Manage subscription — **Free · 3 of 5 decodes used**» открывает Subscription-Management с «**Decode Pro · Active · Yearly**» — противоречивые состояния на прямо связанных экранах | Settings ↔ Subscription-Management | Выровнять на Pro-состояние (или Free-вариант деталь-экрана) |
| I-17 | Med | C | Одна метрика £412 в одном тапе: Vault-Detail «**Total repayable**» vs Compare «**True cost**» | Vault-Detail ↔ Compare-Offers | Один термин (FCA-безопасный «Total repayable») в обоих |
| I-18 | Med | C | Имя документа дрейфует: «Klarna BNPL offer» (Vault-List, Search) vs «Klarna offer» (Vault-Detail-шит, Ask-сабтайтл, Source-Highlight) | Vault-Detail / Ask / Vault-List | Одно имя дока везде |
| I-19 | Med | C | Onboarding-1 «Every number **calculated, not AI**» → на следующем шаге «Decode sends them to **Anthropic's Claude AI**» — читается как противоречие и подрывает trust-экран | Onboarding-1 ↔ Onboarding-2 | «AI reads, maths calculates» (или аналог) на шаге 1 |
| I-20 | Med | C | CTA «**Continue with email**» приводит нового юзера на экран «**Sign in with email**» с «Create account» серым линком — онбординг-новичка маршрутизируют в форму входа | Onboarding-4-Register → Email-Auth | Create-account-вариант или нейтральный тайтл «Continue with email» + mode switch |
| I-21 | Med | C | Overview-Empty*: «…30 seconds, **no sign-up**» на залогиненном home при существующем шаге регистрации (onb4-register/email-auth); та же семья — Perm-Notifications «no account needed» | Overview-Empty | Скоупить: «no sign-up needed to decode» — и держать оба клейма взаимно согласованными |
| I-22 | Med | C | «…delete your data at any time from **Settings → Privacy**» — пункта «Privacy» в Settings нет (секция называется YOUR DATA) | Privacy-Policy | «from Settings → Your Data» |
| I-23 | Med | C | Интро обещает «Plain-English summary first; **full legal text follows** in each section» — ни полного текста, ни «Read full text ›» на странице нет | Privacy-Policy | Убрать предложение или добавить пер-секционные линки |
| I-24 | Med | C | Голос копирайта дрейфует: «This **can't** be undone» vs «It **cannot** be undone»; «**We will** remind you» vs «**we'll** remind you» | AppStore-Delete-Account / Delete-Everything-Confirm / Add-Commitment-Success / Save-Watch-Success | Контракции везде (тон 18–25) + одна undo-формула |

**Low (I):** Vault-Detail NOTES «Cancel before the next payment if returning the item.» — императив в системной обёртке (FCA-серая зона; либо «MY NOTES», либо факт-рефрейз) · Document-History «14 May 2026 · 9:41» — единственный экран с годом+временем (Vault-List: «Decoded 14 May») · «Pro» vs «Decode Pro» + «COMING LATER (PRO)» — единственный заголовок с скобками вместо «·» · Error-LimitReached «unlimited **scanning**» vs термин «decodes» · Где отменять: «Cancel anytime in Settings» (Paywall) vs «in the App Store» (Sub-Mgmt) vs двусмысленное «in Settings» (Purchase-Failed) · Сабтайтл «Delete everything»: «Can't undo» (Consent-Center) vs «Removes all documents & data — can't undo» (Settings) · «within 24 hours / 24 h / 24h» — три формата + два разных обещания на одном Contact-Support · Perm-Notifications «**Never miss a payment**» — абсолютная гарантия исхода · QA-Signpost «The services above can, and **it's** free» → «they're» · «›» vs «→» на одном Decode-Result · Legal-Disclaimer: тайтл «Important» ≠ ни один из его entry-лейблов (три имени одного экрана) · How-It-Works «WHAT'S AI VS CODE» — грамматика · Notifications-футер «Decode has no server pushing to you» — кривой EN · Appearance-капшен «Every screen reflows — nothing clips…» — внутренний QA-критерий в юзер-копии · Account «user@example.com» — плейсхолдер вместо persona-данных · Add-Commitment-Success «before it **renews**» — BNPL-платежи не «renew» · Add-Commitment-Discard «Discard **changes**?» / body «**entries**» в create-флоу · Scan-Review-Discard «You need to take or upload a new photo» — требование вместо следствия · Payment-Calendar: headline и футноут дублируют «£396 · 28 Jun», футноут «make sure» — самая директивная фраза батча · Дрейф dismiss-лейблов «Maybe next month / Maybe later / Not now» (если сознательно — оставить) · Sub-Mgmt: summary-карта дублирует обе detail-строки на коротком экране.

### II. Микро-UX / лейаут

| # | Sev | V | Находка | Где | Фикс |
|---|---|---|---|---|---|
| II-1 | High | C | Consent-контрол противоречит сам себе трижды: копия «Turn on the **toggle** to continue», контрол — **check-circle** (не тоггл), галочка выглядит уже включённой — а Continue disabled | Onboarding-2-Trust | Либо реальный switch + та же копия, либо пустой checkbox + «Tick the box to continue» |
| II-2 | High | C | «**Done**» в NavBar по всей группе A — неоверрайднутый дефолт компонента: на Trust **обходит обязательный consent-гейт** (который enforce'ит disabled Continue), на Email-Auth не имеет завершаемого действия, на Onboarding-3 дублирует «Skip for now» (два одинаковых выхода) | Onboarding-2/3/4 + Email-Auth | Убрать с Email-Auth; на шагах с гейтом убрать/переименовать в «Skip» |
| II-3 | High | C | TabBar: панель на Overview обрывается на ~x=361 из 402 (фон виден справа), **home-indicator перечёркивает лейбл «Scan»**, чей baseline ниже «Home»/«Vault» — и это вшито в компонент: то же на Vault-List | Overview `99:603` + Vault-List | TabBar на всю ширину 402, три лейбла на один baseline, home-indicator ниже строки лейблов |
| II-4 | High | C | Литеральный плейсхолдер «**source ›**» виден в UI: под «Plan» И «Renews» на Subscription-Management, и под «Operator» на About (единственный inline-«›» батча) | Subscription-Management + About | Удалить сабтайтл или осмысленный оверрайд («Billed by Apple», «Company record ›») |
| II-5 | High | C | Два разных деструктива с идентичным тайтлом «**Delete everything?**» и идентичным CTA «Delete everything»: `102:597` сносит Vault+доки+**аккаунт**, `382:1941` — только данные. Из диалога нельзя понять, что подтверждаешь; entry-строка «Delete account & data» на конфирме вообще не появляется | AppStore-Delete-Account `102:597` ↔ Delete-Everything-Confirm `382:1941` | `102:597` → «Delete your account?» / CTA «Delete account & data» |
| II-6 | Med | C | Back/dismiss-аффорданс — системный хаос: группы A, D, F, H — chevron+**label**; B — пять вариантов на пяти модалках (X слева/справа, grabber+X, chevron+Done); C — 4 labelled + Insurance bare-chevron+Done (двойной dismiss); E — три паттерна, включая «‹» вклеенный в large-title на Settings-root; G — Result-Error* единственный с X. Заявленная конвенция DS — chevron-only | весь файл (~20 экранов) | Одно правило: sheets = grabber + X справа; pushed = chevron-only, без Done; конвенцию — в DESIGN.md |
| II-7 | Med | C | «**‹ Settings**» как back на поиске, вход в который — из Vault-List: неверный родитель; туда же Add-Commitment с back «Settings» при интро-копии про Radar | Vault-Search-Results + Add-Commitment | «‹ Vault» (или Cancel) / «‹ Radar» |
| II-8 | Med | C | Пейджер-доты прыгают по высоте (y≈710/758/786) — у трёх шагов разная нижняя мебель (CTA+линк / disabled CTA+helper / линк) | Onboarding-1/2/3 | Зафиксировать слот пейджера и CTA на одном Y |
| II-9 | Med | C | Все 5 звёзд залиты по умолчанию — читается как предвыбранный 5-star (dark-pattern риск + App Review), противоречит «An honest review helps people find us» | Rate-Feedback | Пустые/outline звёзды в дефолте |
| II-10 | Med | C | Rate-Feedback ломает шаблон message-экрана: primary «Write a review» на всю ширину (~369pt при инсетных ~300pt у всех остальных), нет ведущего глифа, контент-блок ниже | Rate-Feedback | Инсетная ширина + глиф + общий шаблон |
| II-11 | Med | C | «A newer version is **required**» + «Update now to keep decoding» — но экран предлагает «**Go back**». Либо hard gate (убрать secondary), либо «Update available» + «Not now» | Force-Update | Выбрать одно |
| II-12 | Med | C | На всех 4 деструктивных экранах деструктивный глагол — единственная filled-кнопка, safe-действие — малоконтрастный текст-линк: инверсия vs HIG; в связке с II-5 делает случайный снос аккаунта правдоподобным | все confirm-экраны батча H | Равновесные кнопки или деэмфаза деструктива минимум на account-deletion |
| II-13 | Med | C | Тоггл «Renewal alerts» (Notifications) пересекается с мастер-тогглом «Renewal Radar» (Radar-Settings) — прецедент при рассинхроне не определён; «Quiet hours 22:00–08:00» существует и в Settings-root, и в Radar-Settings | Notifications-Settings ↔ Radar-Settings | Один источник правды: Notifications = мастер-тогглы, Radar = расписание/watch-list; Quiet hours — в одном месте |
| II-14 | Med | C | Заголовок «WATCHED · **2 OF 6** (PRO UNLOCKS ALL)» — а в списке только **3** строки; остальных 3 из заявленных 6 нет и нет «show more» | Radar-Settings | Показать все 6 (4 locked) или «2 OF 3» |
| II-15 | Med | C | Иконка viewfinder отрисована **в строке StatusBar** (на baseline «9:41»), системный кластер signal/wifi/battery отсутствует — контрол в системной зоне | Scan-Camera `59:2` | StatusBar не трогать, тоггл — в ряд X-кнопки |
| II-16 | Med | C | Грид миниатюр: вертикальный gap схлопнут — «Add page» вплотную к тайлу 1 (≈0–6px) при горизонтальном ~24px | Multi-Page-Scan | Равные 24px gaps |
| II-17 | Med | C | Фильтры разошлись: пилюли листа All/Renewing/BNPL/**Active** vs FILTER в шите All/Renewing/BNPL/**Credit file** — один контрол, две таксономии | Vault-List ↔ Vault-Sort-Filter | Один канонический набор в обоих |
| II-18 | Med | C | Document-глиф перегружен: одна иконка на всех рядах Onboarding-3 (вкл. «Forward an email»), Scan-Capture (все 3 действия), QA-Signpost (helpline-ряды!), Share-Decode (вкл. «Send to someone»), Help-FAQ (все 6, при том что Settings даёт тем же строкам envelope/hand); туда же «Restore purchases»: refresh-иконка в Settings vs doc-иконка в Sub-Mgmt | 5+ экранов | Пер-действие глифы (envelope/phone/share…); одинаковые строки = одинаковые иконки между экранами |
| II-19 | Med | C | Плейсхолдер-глифы в проде: сплошной серый круг вместо лупы в поле поиска (Vault-Search), серый круг у «Appearance» (Settings), крупный чёрный blob в футноуте Calendar | Vault-Search-Results / Settings / Payment-Calendar | Реальные глифы |
| II-20 | Med | C | «Manage in Apple Subscriptions **↗**» несёт одновременно inline-↗ и trailing-«›» — две конкурирующие аффордансы одного действия | Subscription-Management | Оставить ↗ (external), убрать chevron |
| II-21 | Med | C | Бейдж колокольчика — чёрная точка **снизу по центру** под серым bell (читается как оторванный blob); iOS-конвенция — top-trailing | Overview | Точку в правый верхний угол bell |
| II-22 | Med | C | Result-Error*: navbar «Couldn't read this» дублирует H1 «We couldn't read this one» (все соседи в navbar носят контекст: Connection/Decoding/Camera/Vault); плюс пересечение с Error-DecodeFailed — два «couldn't read» экрана с близкими тонами/глаголами восстановления | Result-Error ↔ Error-DecodeFailed | Navbar → «Decoding»; H1-ы развести явно: DecodeFailed = «our side», Result-Error = «the photo» |

**Low (II):** Overview «3 traps cost you £180/year» — единственный не-full-width блок батча · «ACTIVE» — единственный секц-заголовок без правой суммы · Add-Commitment: дефолт «Monthly» стилизован как плейсхолдер (filled ≠ empty неразличимы) · Scan-Review: пунктирный слот с глифом страницы при «Page 1 of 1» — призрачная вторая страница · Scan-Processing: 4 шага без состояний done/current/pending + безымянный skeleton-блок · Perm-Camera: контент кончается на ~40% фрейма, низ пустой · Email-Auth: inline-тайтл + large-title + кнопка «Sign in» одновременно · Password-плейсхолдер дублирует лейбл · Trust-helper в ~12pt от низа (зона home-indicator) · Vault-Detail «Done» на ≈10pt инсете вместо 16 · Compare: числовые колонки по центру, не right-aligned tabular · Trial-Expired без NavBar (сосед Error-LimitReached с NavBar; блок выше на ~80px) — нужен общий interstitial-шаблон · Три вертикальных ритма одного «centered message»-паттерна (perm ~115pt / error ~153pt / Result-Error ~260pt) · Overview-Empty*: активная лупа над пустым списком · TabBar-лейбл «+ Scan» — единственный с префиксом · Empty-NoResults*: body предлагает «scan something new», а CTA только «Clear search» · Save-Watch-Success: интервал до «Adjust reminders» ~2× больше соседнего — третье действие «отвязано» · Account: chevrons на action-строках (Sign out, Restore purchases) + Share-Decode: «›» на мгновенных Copy/Save · Maintenance «Go back» — назад в только что упавший экран («Try again» честнее) · Radar: value-строки (Remind me / Horizon / Quiet hours) выглядят тапабельными без disclosure · Contact-Support: центрированный и flush-left футеры вперемешку · Home-indicator есть только на Overview и Vault-List — решить глобально (везде или нигде).

### III. DS-гигиена (Foundations · Library · Cover · переменные)

| # | Sev | V | Находка | Где | Фикс |
|---|---|---|---|---|---|
| DS-1 | High | C | Cover: «Theme (**29** semantic colours)» — факт 35 (12 surface + 10 brand/semantic + 13 domain); `icon` + 5 `*-foreground` добавлены 02.07 | DS Cover `503:3461` | «Theme (35 semantic colours)» |
| DS-2 | High | C | Cover: «updated **2026-06-26**», в changelog единственная запись 26.06 — фиксы 02.07 (токены) и компонентизация отсутствуют. Молча отстающий DS-индекс подрывает доверие ко всему на нём | DS Cover `503:3452`/`503:3465` | Дата + записи за 02.07 и component-property-пасс |
| DS-3 | Med | C | Foundations показывает 27 из 35 ролей: нет `card-foreground`, `popover`, `popover-foreground`, `primary-foreground` (живой, используется Button), `success/warning/danger/info-foreground` | Foundations `8:2` | Ряд «Roles — Foreground pairs» + popover/card-foreground в Surface |
| DS-4 | Med | C | Changelog говорит «consolidated into **Molecules**/ListItem» и «**Molecules**/Bubble» — вживую это **Organisms**/ListItem `482:3440` и Organisms/Bubble `499:3871` (собственный индекс Cover это подтверждает) | DS Cover changelog | Поправить два пути |
| DS-5 | Med | C | Компонент-индекс Cover называет 17 молекул из 18 — пропущен `Molecules/PageThumb` `471:3263` | DS Cover `503:3463` | Добавить в строку MOLECULES |
| DS-6 | Med | C | 5 мест showcase Foundations не привязаны к токенам: бары `space-20/space-xl/space-2xl` и спесимены `Decode/caption`/`Decode/figures` захардкожены (defs на 8:2 их не возвращают, на 505:3462 — возвращают) — поменяешь токен, борд молча соврёт | Foundations `8:2` | Забиндить ширины баров на переменные, переприменить 2 стиля |
| DS-7 | Med | **P** | `Decode/caption`, возможно, не применён нигде в файле — ни одна нода defs его не возвращает (все прочие Decode/* всплывают); свип даёт ровно **13×3** — если это raw-13px, клейм «9-стилевая рампа» сломан на уровне файла | text-styles всего файла | Проверить панель стилей; пересоздать/перелинковать |
| DS-8 | Med | C | `CreditFileBadge` `68:24` — один мастер (только YES) без оси Level=Yes/No/Cond; `TrapCard` `68:18` — без оси Severity=High/Med/Info; DESIGN.md специфицирует оба через доменные токены. Ручные оверрайды не каскаднутся при цвет-фазе | Component Library | Добавить вариантные оси, потребляющие домен-токены |
| DS-9 | Low | **P** | Подписи борда «trap-high → gray-900», «calculated → gray-900» — DESIGN.md требует цепочку через семантические роли (trap-high → {danger}). MCP отдаёт только resolved hex — цепочка не верифицируема; если алиасы бьют в примитивы, ремап danger→red не распространится | переменные Theme | Проверить alias-цели в панели переменных; минимум — переподписать борд |
| DS-10 | Low | C | Button-грид: 12 вариантов стопкой без единой подписи; Quiet/Disabled — белое-на-белом, читается как дыры | Component Library | Подписи рядов Style×State или чекер-фон |
| DS-11 | Low | C | `Icons/circle.lefthalf.filled` `402:2335` = 24.258×23.918; остальные 69 — ровно 24×24 | Icons | Нормализовать фрейм |
| DS-12 | Low | C | Три диалекта одного словаря: `r-sm` (борд) / `radius-sm` (переменные) / `rounded.sm` (YAML); спейсинг: YAML мешает `xs/sm/md` с `space-12/space-20`, Figma — единообразно `space-*`; на борде нет `rounded.none (0)`. Любому token-sync-скрипту нужна mapping-таблица | борд ↔ Figma ↔ DESIGN.md | Один диалект или задокументированная карта в DESIGN.md |
| DS-13 | Low | C | Cover-секция «Tokens» не упоминает type-рампу (только цвета+спейсинг) | DS Cover | Дописать «9 text styles (Decode/display…figures-lg)» |

### IV. Файловая гигиена

| # | Sev | V | Находка | Где | Фикс |
|---|---|---|---|---|---|
| F-1 | Med | C | **Дубликат борда**: «Segment & JTBD — Board» существует дважды — оригинал `572:3525` на «Product — Segment & JTBD» и копия `580:3702` на «Screens — Wireframe» (x=−2710). Содержимое сейчас идентично (вкл. SO1-фикс и about-блок), но это два независимых объекта → риск дивергенции | обе страницы | Выбрать ОДНУ каноничную копию (рекомендация: оставить на Screens рядом с флоу, вторую заменить ссылкой-заметкой — или наоборот, но одну) |
| F-2 | Low | C | Страница «refs» — lowercase-нейминг вне конвенции остальных страниц (1 картинка) | страницы файла | Переименовать по конвенции или влить в annotation-слой |
| F-3 | Low | C | Straight apostrophes по всему файлу («you're», «don't», «couldn't»…) — консистентно, но до hi-fi → типографские (') | все экраны | Пакетная замена в типографик-пасс |
| F-4 | Low | C | `screen-padding` (16) и `tap-min` (44) существуют только в DESIGN.md — Figma-переменных нет (elevation/motion — code-only по дизайну) | DESIGN.md ↔ Spacing-коллекция | Пометить «code-side only» или добавить в коллекцию |
| F-5 | Low | C | Git-хвосты: uncommitted `docs/product/jtbd.md` (§8 — закоммитить), untracked `docs/case-study/` (закоммитить/игнорить) и `prototype-check.png` в корне (удалить/gitignore) | репо | Разобрать три хвоста |

---

## Механика: 4/4 PASS (HEAD `79ac64e`)

- **Прототип:** SCREENS = 49 ✓, FLOWS = 14 ✓; 0 битых img (все в `design/wireframes/figma/`), 0 битых hotspot-целей и flow-шагов, вся геометрия в 0..100 с валидными суммами, 0 orphan-экранов от `onboarding-1`. Нюанс (не дефект): 5 экранов достижимы только как flow-шаги, без входящих hotspot'ов — share-decode, error-offline, error-limit-reached, error-camera-denied, error-purchase-failed.
- **Счётчики доков:** README «64 Figma frames» = факт ✓; 51 PNG на диске = 51 в git = «51 files» ✓; «49 экранов / 14 флоу» совпадает в README, prototype/README и sitemap ✓; 49 + 15 незаведённых = 64 ✓; jtbd.md §8 — ровно 13 flow-рядов ①–⑬ ✓.
- **Git-гигиена:** PASS с заметками (см. F-5); риска broken-on-checkout нет — ни один закоммиченный файл не ссылается на untracked-пути.
- **jtbd.md §8:** ID-инвентарь ровно J1–J6 / E1–E4 / SO1–SO3 / A1–A2, без строёв; SO1-ряд без «родителей» ✓.

---

## Counts summary

| Тема | Blocker | High | Med | Low | Σ |
|---|---|---|---|---|---|
| I. Демо-датасет и копирайт | 1 | 9 | 14 | 21 | **45** |
| II. Микро-UX / лейаут | — | 5 | 17 | 22 | **44** |
| III. DS-гигиена | — | 2 | 6 | 5 | **13** |
| IV. Файловая гигиена | — | — | 1 | 4 | **5** |
| **Итого** | **1** | **16** | **38** | **52** | **107** |

Verdict-раскладка: **105 CONFIRMED / 2 PLAUSIBLE** (DS-7 caption, DS-9 alias-цепочка). Находки по 4 экранам батча G и Save-Watch-Success подтверждены по репо-экспортам того же пайплайна (помечены `*`) — перепроверить только если фреймы правились после 02.07.

**Что мерить на ре-аудите:**
- противоречий чисел/дат/счётчиков в демо-данных: **9 → 0** (Overview-summary · date-math · Calendar-тоталы · Alerts-пропуски · trap-count · £294-семантика · Pay-in-3 · Result-summary · subscription-state)
- сосуществующих back/dismiss-паттернов: **≥4 → 1** (и правило в DESIGN.md)
- «Done» без функции в NavBar: **4 экрана → 0**
- placeholder-артефактов в UI («source ›» ×3, серые круги/blob ×3, user@example.com): **7 → 0**
- stale-клеймов на DS Cover: **5 → 0** · незабинженных мест Foundations: **5 → 0**
- дубликатов бордов: **1 → 0** · straight apostrophes: **→ 0 до hi-fi**
- механика: удержать 4/4 PASS и 0 клипов

---

## Рекомендованная последовательность фиксов

1. **Контент-пасс — один связный демо-датасет.** Зафиксировать легенду «Klarna offer £348, 6×£58, true cost £412» (либо сознательно упростить до честного Pay-in-3) и прогнать её по ВСЕМ экранам: Overview-summary, Alerts-даты (одно «сегодня»), Calendar-тоталы, trap-count=3, «£294 across 3 plans», Pay-in-3→Financing, provenance-лейблы From-your-doc/Calculated, Free↔Pro-состояние, имя дока. Сюда же копирайт-инварианты: убрать «(App Store 5.1.2)», Trial-Expired «billed yearly», photo-deletion-клеймы, «Save the cheaper one», £240/£70 на Insurance, битые Settings→About/Privacy-ссылки + адрес, contractions-голос. Закрывает I-1…I-24 одним проходом.
2. **Микро-UX-пасс группами, не поэкранно:** (а) навбары — одно правило back/dismiss + снять дефолтный «Done» (II-2, II-6, II-7); (б) TabBar-компонент — ширина/baseline/home-indicator, чинится один раз в компоненте (II-3); (в) пейджер-слот онбординга (II-8); (г) деструктивы — развести «Delete everything?»-двойняшек + веса кнопок по HIG (II-5, II-12); (д) плейсхолдер-глифы и «source ›» (II-4, II-18, II-19); (е) точечные: consent-контрол, Rate-Feedback (звёзды+ширина), Force-Update, Notifications↔Radar, Radar «2 OF 6», Scan-Camera StatusBar, Multi-Page-грид, фильтры.
3. **DS Cover / Foundations sync:** 29→35, дата+changelog, Organisms-пути, PageThumb, 8 ролей-своотчей, 5 биндингов, проверка `Decode/caption` и alias-цепочки, оси CreditFileBadge/TrapCard, подписи Button-грида, иконка 24×24, словарь имён.
4. **Дубликат борда** — оставить одну каноничную копию Segment & JTBD (+ «refs»-нейминг, git-хвосты).
5. **Потом — hi-fi** (палитра, типографские апострофы в том же заходе, WebAIM-прогон) — начинать только после пассов 1–2, иначе контент-противоречия переедут в цветной дек.

---

## Remediation status (2026-07-11, fix-пасс в тот же день)

**Применено:**

- **Контент-пасс (тема I) — применён.** Канонический демо-датасет зафиксирован в [docs/guidelines/demo-dataset.md](../docs/guidelines/demo-dataset.md) (single source of truth: TODAY = 10 Jun 2026, hero-док «Klarna Financing offer» £348 / 6×£68.67 / APR 39.9% / £412, Watch-слой £294 · £668 · £702, канонические Alerts/Vault-меты, арифметическая сверка) и прогнан по экранам; правило «меняешь демо-число → правишь этот файл в том же коммите» — в самом доке.
- **TabBar-мастер:** ширина 402 + home-indicator — починено в компоненте (II-3): панель на всю ширину, лейблы на одном baseline, индикатор ниже строки лейблов; каскадится на Overview и Vault-List.
- **Борд дедуплицирован (F-1):** оставлена копия «Segment & JTBD — Board» на «Screens — Wireframe»; страница «Product — Segment & JTBD» удалена. Страница «refs» → «🗂 Refs» (F-2).
- **Микро-UX / DS / системные фиксы по группам W1–W6:**
  - **W1 — навбары/back:** дефолтный «Done» снят с группы A + Email-Auth (II-2); неверные back-родители исправлены — Vault-Search-Results и Add-Commitment (II-7).
  - **W2 — TabBar-компонент** (II-3, см. выше).
  - **W3 — онбординг:** consent-контрол согласован с копией (II-1), пейджер/CTA-слот зафиксированы на одном Y (II-8), маршрут «Continue with email» (I-20).
  - **W4 — деструктивы:** «Delete everything?»-двойняшки разведены — account-версия → «Delete your account?» / CTA «Delete account & data» (II-5); инверсия весов кнопок применена к Delete-Account (II-12 — остальные экраны см. «Отложено»).
  - **W5 — плейсхолдеры/глифы:** «source ›» ×3 (II-4), серые круги/blob (II-19), пер-действие иконки + согласование одинаковых строк между экранами (II-18), user@example.com → persona-данные.
  - **W6 — системные/точечные + DS-синк:** Rate-Feedback — пустые звёзды и общий шаблон (II-9, II-10); Force-Update (II-11); Notifications ↔ Radar — один источник правды (II-13); Radar «2 OF 6» (II-14); Scan-Camera StatusBar (II-15); Multi-Page-грид (II-16); фильтры Vault (II-17); ↗/› (II-20); bell-бейдж top-trailing (II-21); Result-Error navbar (II-22). DS: Cover 35 ролей + дата/changelog + Organisms-пути + PageThumb (DS-1/2/4/5), Foundations-своотчи и биндинги (DS-3/6), `Decode/caption` перелинкован (DS-7), оси CreditFileBadge/TrapCard (DS-8), подписи Button-грида (DS-10), иконка 24×24 (DS-11), radius-словарь един — `radius-*` на борде = имена переменных, карта в DESIGN.md (DS-12), Cover-Tokens упоминает type-рампу (DS-13); `screen-padding`/`tap-min` помечены code-side only (F-4).
- **Свип апострофов/voice:** contractions везде + единая undo-формула «This can't be undone.» (I-24), straight → типографские апострофы (F-3, сделано раньше плана).
- **Ре-экспорт PNG:** все затронутые фреймы переэкспортированы в `design/wireframes/figma/` тем же 2x-пайплайном.

**Отложено осознанно:**

- **hi-fi/colour-фаза** (палитра, WebAIM-прогон) — после пассов, как и планировалось.
- **Деструктив-инверсия (II-12)** — применена только к Delete-Account; остальные confirm-экраны — при hi-fi.
- **«›» vs «→»-конвенция** (Low I) — не унифицирована.
- **Back/dismiss (II-6):** вместо переделки ~20 экранов под chevron-only принят **новый канон — «chevron + название родительского экрана»** (iOS-native), sheets закрываются «×» справа сверху; канон зафиксирован в DESIGN.md (Layout + Do's). Полный свип остаточных вариантов — следующим пассом.

---

## Наезд экранов на канвасе (поднято 2026-07-11 после fix-пасса)

Детектор bounding-box нашёл **3 реальных пересечения** фреймов: Foundations-борд (1040×2182) под Result-Error; Settings (вырос до 1476 после добавления секции GENERAL 02.07) наезжал на Help-FAQ на −196px; Decode-Result-Insurance (1232) на Error-LimitReached на −85px. Причина: строки сетки не были рассчитаны на высокие скроллящиеся фреймы (Decode-Result 1532 / Settings 1476 / Insurance 1232).

**Фикс:** полный вертикальный рефлоу страницы «Screens — Wireframe» — каждой строке дан зазор под её самый высокий фрейм + 180px; джоб-стеки и FlowLabel'ы сдвинуты синхронно (JTBD-выравнивание job→flow сохранено); Foundations-борд вынесен в отдельную зону внизу. Повторный детектор: **0 пересечений**; свип клиппинга после всех правок: **0**. Рефлоу меняет только позиции на холсте — контент фреймов и PNG-экспорты не затронуты.
