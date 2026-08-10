# T5 — Voice of Customer → action-points

**Задача курса:** анализ фидбэка (150+ отзывов), sentiment, UX-проблемы → размеченный массив + аналитика с action-points; adv: semi-automated VoC.
**Pre-launch адаптация:** у Decode нет своих отзывов. Размечаем **1★-отзывы прямых конкурентов** (Voice of the *competitor's* customer) — чужие провалы = наши обязательные требования. Корпус: ~30 verbatim-цитат из [research/02](../../research/02-competitor-review-mining.md) (Rocket Money, Cleo, Emma, Snoop, Bobby; Trustpilot/App Store/FTC).

> Это валидный pre-launch VoC-аналог: вместо «что ломается у нас» — «что взбесило пользователей у тех, кто решает ту же job». Когда Decode выйдет, этот же пайплайн разметки применяется к своим отзывам (schema и промпт — в [assets/reusable-prompts.md](assets/reusable-prompts.md)).

---

## 1. Схема разметки (как кодировали корпус)

Каждая цитата → строка: `theme · product · sentiment · severity(вред job) · trust-impact · our-requirement`. Семь тем выделены кластеризацией (частота в корпусе ~30 цитат):

| # | Тема | Частота | Где (продукты) | Sentiment-ядро |
|---|---|---|---|---|
| T-1 | **Cancellation hell / dark patterns отмены** | ~10 (№1) | Rocket Money, Emma, Cleo (FTC) | ярость, «scam», «leaches like you» |
| T-2 | **Surprise charge: триал → крупное (часто годовое) списание мимо App Store** | ~7 | Emma £83.99, Cleo→овердрафт, Rocket Money fee $100+ | предательство, «robbing swines» |
| T-3 | **Bank link: страх + поломки + over-broad доступ** | ~6 | Snoop, Rocket Money, Cleo, Emma | «invasion of privacy», «didn't feel safe» |
| T-4 | **Неточность данных/действий** | ~4 | Emma, Snoop, Rocket Money, Cleo | потеря доверия, «inaccurate» |
| T-5 | **Paywall-ирония + relentless upsell** | ~4 | Emma, Snoop, Cleo, Rocket Money | насмешка, «pay this subscription to find out» |
| T-6 | **Поддержка = AI-бот, нет человека** | ~4 | Rocket Money, Cleo | беспомощность, «bot thinks I did it wrong» |
| T-7 | **Ненадёжные нотификации / ручной труд** | ~4 | Bobby, Emma | «app does nothing», core-фича мертва |

**Позитивный сигнал (контр-VoC):** хвалят Bobby ровно за то, что он **не** просит bank link — *«it doesn't ask for personal info or bank info like a lot of similar apps»*. Прямое подтверждение wedge.

---

## 2. Action-points (тема → что делает Decode)

Каждая тема → конкретное продуктовое решение + где это материализуется (вход в wireframes). Sentiment взвешен: T-1/T-2/T-3 = самые яростные кластеры → высший приоритет.

| Тема | Action-point (инвариант продукта) | Где в продукте |
|---|---|---|
| **T-1 Cancellation hell** | Отмена в 2 тапа из Settings + прямая ссылка «Manage in Apple Subscriptions»; никаких retention-лабиринтов и ID | Settings-экран; зафиксировать в [принципах](../../research/00-executive-summary.md) §Б5 |
| **T-2 Surprise charge** | Free-тир **без платёжных данных вообще**; платный — только Apple IAP; push+email за 48ч до конца триала и до renewal самого Decode | Paywall-флоу; онбординг (free без карты) |
| **T-3 Bank link страх** | «No bank connection. Ever.» — первый trust-экран; privacy-карточка (что на сервер / что на устройстве / retention / «удалить всё» в 1 тап) | Онбординг trust-слайд; Settings → Privacy |
| **T-4 Неточность** | Source-highlight на каждый extracted term; confidence-бейдж; состояние «Couldn't read — check manually» вместо галлюцинации; «Calculated, not AI» на числах | Decode-result (три языка достоверности) |
| **T-5 Paywall-ирония** | Free = завершённый акт ценности (полный decode N/мес); paywall на Watch-слой; апселл редкий, в момент ценности, не на каждом экране; цена+лимиты на одном экране без footnotes (планка FTC-settlement) | Paywall; overview |
| **T-6 Бот-поддержка** | «Email a human, reply in 24h» в Settings; не прятать поддержку за ботом | Settings → Help |
| **T-7 Нотификации-лотерея** | Radar reliability contract: экран «what I'm watching for you» + тест-нотификация в онбординге + локальные iOS-нотификации с серверным дублём | Radar-экран; онбординг-шаг после 1-го скана |

---

## 3. Топ-выводы VoC (для кейса и приоритизации)

1. **Биллинг — главный убийца рейтинга категории, не фичи.** Три из пяти крупных конкурентов тонут в 1★ из-за отмены/списаний (Cleo — до FTC-иска $17M). Стоимость защиты — копеечная (Apple IAP only, free без карты), эффект на rating — выше любой фичи. **Это самый дешёвый и самый важный продуктовый инвариант.**
2. **Wedge подтверждён обеими сторонами VoC:** Bobby хвалят за отсутствие bank link, Snoop/Rocket Money/Cleo ненавидят за него. «Скан вместо подключения банка» снимает кластер T-3 целиком → hero-message онбординга и ASO.
3. **Точность = retention.** Miscategorisation (Emma), inaccurate data (Snoop), «отменил не ту подписку» (Rocket Money) — одна заметная ошибка = удаление. Совпадает с риском F3 pre-mortem → требование «трёх языков достоверности» на result.
4. **FTC-settlement Cleo задал регуляторную планку категории:** «clearly and conspicuously disclose», «express and informed consent», «simple way to cancel» — теперь это не best practice, а юрстандарт. Decode проектируется уже над этой планкой.
5. **Renewal Radar обязан быть демонстративно надёжным** (анти-Bobby): сломанное напоминание = сломанное core-обещание. Видимый «контракт наблюдения» + тест-нотификация.

## 4. Связь с другими артефактами

- Анти-паттерны T-1…T-7 совпадают с risk register pre-mortem ([T4](task4-personas-premortem.md) §5): T-4 ↔ F3, T-1/T-2 ↔ F2 (монетизация), T-3 ↔ trust-барьер Priya.
- Доверительные сигналы → требования к онбордингу и result в [UX-паттернах ресёрча](../../research/00-executive-summary.md) §6.
- Когда появятся свои отзывы (post-launch): тот же пайплайн, схема §1, промпт разметки в [assets/](assets/reusable-prompts.md) → этот файл переписывается на own-VoC.
