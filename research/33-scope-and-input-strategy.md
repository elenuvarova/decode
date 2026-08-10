# Decode — Пересмотр клина: скоуп документов + модель ввода/интеграций

**Дата:** 2026-08 · **Статус:** research-мемо к пересмотру MVP-клина (по запросу «пересматриваем сам wedge»)
**Вопросы:** (Q1) объяснять *любые* документы, а не только кредитные/финансовые? (Q2) как загружать файл / какие интеграции, учитывая, что люди не любят давать доступ к банковским приложениям?
**Метод:** синтез внутреннего корпуса (сегментация, JTBD, [07-tech-input](07-tech-ios-pwa-vs-native.md), [21-pricing](21-pricing-monetization.md)) + внешняя проверка (8 web-поисков: open-banking adoption/доверие UK, wedge-vs-breadth, AI-moat vs ChatGPT, читаемость контрактов).
**Вход в оговорку:** это НЕ защита текущего решения — вопрос ставился «пересматриваем». Ниже — что выдержало проверку, а что уточняем.

---

## TL;DR — вердикт после пересмотра

1. **Скоуп (Q1): узкий финансовый клин ВЫДЕРЖАЛ проверку — расширять до «любого документа» на MVP не надо.** Но не потому, что боль узкая (она как раз универсальна), а потому, что **«объясняю что угодно» = generic LLM-обёртка без рва**, а весь ров Decode (детерминированные числа, UK-trap-база, citations, credit-file, Watch-слой) физически строится только на *определённом* типе документа. Уточнение: переформулировать **потолок** — не «финансовые», а «**документы с асимметричным даунсайдом**» (ошибка стоит денег/необратима). Это шире BNPL, но уже «любого документа».
2. **Ввод (Q2): «no bank connection» ВЫДЕРЖАЛ и усилился.** Аверсия к передаче банковского доступа количественно подтверждена; для тревожного долгового сегмента 18–25 «не просим банк» — это снятие главного барьера установки, а не ограничение. Модель ввода: **«принеси документ, а не аккаунт»** — камера + share-in + upload + email-forward. Интеграции — с **OS share-слоем и почтой**, НЕ с банками. Open banking — опционально и позже, как Pro-фича с прогрессивным доверием, никогда как вход.

---

## Q1 · Скоуп: «любые документы» vs финансовый клин

### Что тянет к расширению (аргументы «за» — честно)
Боль «не понимаю, что подписываю» **не финансовая, а универсальная**, и данные это подтверждают:
- **65% британцев** подписывают договоры, не зная деталей; **68%** либо не читают, либо не понимают контракты (ЖКХ, подписки) ([London Daily News](https://www.londondaily.news/news-65-of-brits-signs-contracts-without-knowing-whats-in-them/), [University of Law](https://www.law.ac.uk/about/press-releases/more-than-two-thirds-of-people-dont-read-their-contracts/)).
- Категорийные read-rates мизерные: **festival tickets 5% · Klarna 9% · автокредит 19% · мобильный контракт 31% · кредитка 33%** ([i-agree.io](https://i-agree.io/blog/why-nobody-reads-terms-and-conditions-anymore)).
- FCA Financial Lives 2024: **6,3 млн** взрослых с ограниченным пониманием своих продуктов, **10,3 млн** с низкой уверенностью в бытовой математике ([i-agree/FCA](https://i-agree.io/resources/consumer-understanding-reduces-disputes-and-complaints)).

Соблазн: раз болит у всех и везде — сделаем «сканер-объяснялку любого документа», рынок в разы больше.

### Почему это ловушка (аргументы «против» — решающие)
1. **Горизонтальные LLM уже объясняют любой документ бесплатно.** ChatGPT/Claude/Gemini «объясни этот PDF» — существующая, бесплатная, растущая привычка (habit-конкурент из [JTBD §3](../docs/product/jtbd.md)). «Объясняю что угодно» ставит Decode в прямую конкуренцию с моделью, которая дешевле и умнее в общем случае.
2. **Экономика обёрток жёсткая: 60–70% AI-wrapper'ов дают ноль выручки, только 3–5% берут $10K/мес** ([Medium: AI Moat Map](https://medium.com/@adhiguna.mahendra/the-ai-moat-map-7-strategies-to-build-a-defensible-ai-startup-in-the-era-of-llms-be86d9528db9)). Выживают те, у кого **проприетарные компаундящиеся данные + регуляторные/комплаенс-барьеры + вертикальные фидбэк-циклы** ([Insignia](https://review.insignia.vc/2025/04/15/moats-ai/), [Forbes](https://www.forbes.com/sites/josipamajic/2026/03/31/vcs-rethink-startup-moats-as-ai-compresses-time-to-build/)) — то есть ровно то, что даёт **вертикаль**, и что «любой документ» уничтожает.
3. **Ров Decode не в «объяснении», а в вертикальном стеке**, который нельзя построить на «любом документе»:
   - **детерминированный true-cost-движок** (числа считает код, не LLM) — нужен известный тип документа с известной математикой;
   - **UK trap-каталог** (14 типов ловушек) — доменная база под конкретные продукты;
   - **credit-file бейдж YES/NO** — специфичен для кредитных продуктов;
   - **Watch-слой** (Radar/Vault) — обязательства с датами, а не разовое объяснение;
   - **комплаенс-поза** (FCA-граница, «explains, not advises») — регуляторный барьер как ров.
   «Любой документ» регрессирует всё это к generic-объяснению = ChatGPT-с-лишними-шагами.
4. **Wedge-теория прямо против «для всех»:** «„AI для всех“ — не GTM-стратегия»; без чёткого клина продукт расползается слишком рано ([MKT1](https://newsletter.mkt1.co/p/wedge-marketing-strategy), [NFX](https://www.nfx.com/post/finding-your-killer-wedge)). Даже горизонтальная амбиция стартует с узкого клина.
5. **Сами данные боли усиливают финансовый клин:** самые низкие read-rates и самый асимметричный даунсайд — именно финансовые (Klarna 9%, автокредит 19%) — деньги на кону + необратимость (credit file 6 лет). Это acute pain, а не «в целом длинно».

### Рекомендация Q1
- **НЕ расширять до «любого документа» на MVP.** Клин остаётся: S1 BNPL 18–25, позиционирование «any *financial* document», лестница сегментов ([segmentation §5](../docs/product/segmentation.md)).
- **Переформулировать ПОТОЛОК** платформы честнее, чем «финансовые»: **«документы, где есть числа, ловушки и дедлайн, и где ошибиться — дорого/необратимо»** (asymmetric-downside documents). Это естественно расширяет лестницу: BNPL → страховые продления → подписки/telecom → аренда/lease/PCP → (позже) медсчета, госписьма о долгах/штрафах. Объединяющая нить — не «финансы», а **асимметричный даунсайд + возможность детерминированного слоя доверия**. Так дотягиваемся до широкого видения, не попадая в graveyard обёрток.
- **Тактика «graceful any-doc» без размытия позиционирования:** технически НЕ блокировать скан не-финансового документа. Если человек сканирует, например, договор аренды — дать best-effort объяснение простым языком, но честно: «полный decode (true cost + traps + credit-file) мы пока делаем для money-документов — вот что тут можно объяснить». Дверь открыта, обещание не размыто, и это бесплатный сигнал спроса на следующие ступени лестницы (какие не-money доки люди суют — данные для роадмапа).

---

## Q2 · Ввод / интеграции: файл + аверсия к банковскому доступу

### Аверсия подтверждена количественно
Твой инсайт («люди не любят делиться доступами к банку») — не гипотеза, а измеренный барьер:
- **Open banking в UK: ~13,3 млн активных (март 2025) → 15,16 млн (июль 2025)** ([openbanking.org.uk](https://www.openbanking.org.uk/news/open-banking-surges-to-15-million-uk-users-as-july-marks-record-adoption/)).
  ⚠️ **Исправлено 2026-08-07:** здесь стояло «~1 из 5, то есть ~80% сознательно НЕ подключают банк» — **цифра завышена**. 15,16 млн это примерно **треть взрослого населения UK**, а не пятая часть, и рост быстрый. Аргумент «без банка» остаётся, но обосновывается не «никто не подключает», а порогом входа, доверием к новому приложению и тем, что с 15.07.2026 документ обязателен по закону. Разбор — [research/35](35-lead-review-open-questions.md) §4.
- Топ-страхи по open banking: **кража личности 69%, злоупотребление данными 60%**; **<1/3** потребителей чувствуют, что контролируют свои финансовые данные ([Zendata](https://www.zendata.dev/post/data-privacy-in-open-banking), [PYMNTS](https://www.pymnts.com/news/banking/2025/14000-open-banking-rule-comments-highlight-deep-divides-over-privacy-and-access/)).
- Доверие/безопасность — топ-фактор: **55% ушли бы**, если фрод не обрабатывается ([sqmagazine](https://sqmagazine.co.uk/open-banking-adoption-statistics/)); среди не-пользователей финтеха **32%** прямо боятся за сохранность данных ([sqmagazine](https://sqmagazine.co.uk/open-banking-adoption-statistics/)).

**Но:** open banking растёт (было 1 из 17 в 2021 → 1 из 5 сейчас) — он не мёртв. Вывод не «банки-зло навсегда», а: **для тревожного долгового сегмента 18–25 требование банк-логина на входе убивает конверсию установки; «не просим банк» — это wedge-преимущество, а не ограничение.**

### Дополнительный аргумент против bank-link (из внутреннего трека)
- **Регуляторно:** аггрегация банковских аккаунтов = AISP-регулируемая деятельность (отдельный FCA-периметр), плюс App Store 5.1.1(ix) «highly regulated → юрлицо» ([07-tech §2.5](07-tech-ios-pwa-vs-native.md)). Bank-link кратно усложняет комплаенс до запуска.
- **Позиционирование:** «no bank connection» уже вшито в критерии найма (#2), онбординг-trust и differentiator ([JTBD](../docs/product/jtbd.md)). Bank-link противоречит собственному УТП.

### Модель ввода: «принеси документ, а не аккаунт»
Это и есть ответ на «какая интеграция»: **интегрируемся с OS-share-слоем и почтой, а не с банками.** Каналы (все — zero bank access, высокий trust):
| Канал | Что закрывает | Статус |
|---|---|---|
| **Камера / скан** | «оффер на бумаге / на другом экране» | MVP, `expo-camera` ([07 §2.2](07-tech-ios-pwa-vs-native.md)) |
| **Share-in из Mail/Files/Photos** | «пришёл PDF/скрин BNPL-оффера» — push-флоу | MVP first-class, `expo-share-intent`; на iOS работает ТОЛЬКО нативно (не PWA) |
| **Upload PDF/фото** | «файл лежит в телефоне/облаке» | MVP |
| **Email-forwarding адрес** (`scan@…`) | «выписка/письмо пришли на почту» — переслал и всё | P2, снимает даже трение открытия приложения |

Ключевая рамка: **интеграция «с другими приложениями» = системный Share Sheet.** Любое приложение (Klarna, Gmail, банк-апп, Files) уже умеет «Поделиться → Decode». Это универсальная интеграция без единого account-link. Плюс email-forward как второй универсальный «API для людей».

### Что делать с open banking, раз он всё-таки растёт
Не хоронить, но и не ставить на вход. **Прогрессивное доверие:**
- **MVP и дефолт навсегда:** no bank connection. Лид-сообщение онбординга.
- **Позже, опционально, за Pro:** open banking как *power-фича автоматизации* («хочешь, чтобы Decode сам замечал новые списания — подключи read-only, в любой момент отключишь»), с тяжёлой consent-рамкой и явным «мы не видим логин/пароль, это регулируемый read-only доступ». Только для тех, кто уже доверяет продукту (не на входе). Апселл, а не барьер.
- Это же снимает ложную дилемму «либо ручной ввод, либо банк»: ручной ввод — вход и ядро; банк — опциональная надстройка для меньшинства, готового к автоматизации.

### Рекомендация Q2
Оставить **«bring the document, not the account»** ядром. Проектировать share-in и email-forward как первоклассные входы (не только камеру). Bank-link — вне MVP; если и появится — как опциональная Pro-надстройка с прогрессивным доверием, никогда как условие входа.

---

## Что это меняет в продукте (actionable)

1. **Позиционирование-строка обновляется:** внутренний потолок — не «financial documents», а «**money documents where getting it wrong costs you**» (asymmetric-downside). Влияет на лестницу сегментов и на то, как формулируем App Store / лендинг (не «money management» — см. 3.2.1(viii)).
2. **Онбординг-ввод:** показать 3 равноправных входа (Scan · Forward/Share · Upload), а не только камеру — сейчас в wireframes камера доминирует.
3. **Graceful any-doc состояние** на Decode-result: честный partial-ответ для не-money документа + сбор сигнала «что несут» (роадмап-данные) — новый экран-состояние.
4. **Email-forwarding** (`scan@decode…`) — добавить в роадмап P2 как второй универсальный вход.
5. **Open banking** — вынести из «никогда» в «опциональная Pro-автоматизация, прогрессивное доверие» в docs (сейчас в позиционировании звучит как абсолютный запрет; смягчить до «не на входе»).

## Открытые вопросы к discovery-интервью
- H (скоуп): какие НЕ-BNPL документы сегмент реально хочет объяснять первыми (страховка? аренда? телеком?) — определяет вторую ступень лестницы.
- H (ввод): что чаще — «сфоткать» или «переслать из Mail/приложения»? (влияет на приоритет share-in vs камеры на MVP; [07](07-tech-ios-pwa-vs-native.md) гипотезирует равнозначность).
- H (банк): для меньшинства, готового к автоматизации — сработает ли read-only open banking как Pro-фича, или аверсия абсолютна даже при явном «без логина/пароля».

---

## Sources
- Open banking UK adoption/trust: [openbanking.org.uk 2025](https://www.openbanking.org.uk/insights/open-banking-in-2025-now-part-of-the-uks-everyday-financial-life/) · [Statista penetration](https://statista.com/statistics/1446274/uk-estimated-open-banking-penetration) · [sqmagazine stats](https://sqmagazine.co.uk/open-banking-adoption-statistics/) · [Zendata privacy](https://www.zendata.dev/post/data-privacy-in-open-banking) · [PYMNTS 14k comments](https://www.pymnts.com/news/banking/2025/14000-open-banking-rule-comments-highlight-deep-divides-over-privacy-and-access/)
- Читаемость/понимание контрактов: [London Daily News 65%](https://www.londondaily.news/news-65-of-brits-signs-contracts-without-knowing-whats-in-them/) · [University of Law 68%](https://www.law.ac.uk/about/press-releases/more-than-two-thirds-of-people-dont-read-their-contracts/) · [i-agree read-rates](https://i-agree.io/blog/why-nobody-reads-terms-and-conditions-anymore) · [i-agree/FCA Consumer Duty](https://i-agree.io/resources/consumer-understanding-reduces-disputes-and-complaints)
- Wedge / focus: [MKT1 wedge](https://newsletter.mkt1.co/p/wedge-marketing-strategy) · [NFX killer wedge](https://www.nfx.com/post/finding-your-killer-wedge) · [LogRocket product wedge](https://blog.logrocket.com/product-management/what-is-a-product-wedge-driving-market-success/)
- AI-moat vs ChatGPT: [AI Moat Map](https://medium.com/@adhiguna.mahendra/the-ai-moat-map-7-strategies-to-build-a-defensible-ai-startup-in-the-era-of-llms-be86d9528db9) · [Insignia moats](https://review.insignia.vc/2025/04/15/moats-ai/) · [Forbes VCs rethink moats](https://www.forbes.com/sites/josipamajic/2026/03/31/vcs-rethink-startup-moats-as-ai-compresses-time-to-build/)
- Внутренние: [07-tech-ios-pwa-vs-native](07-tech-ios-pwa-vs-native.md) · [segmentation](../docs/product/segmentation.md) · [jtbd](../docs/product/jtbd.md) · [21-pricing](21-pricing-monetization.md)
