# Decode — что ещё нарисовать для реальной выкладки в App Store

Сейчас отрисованы **P0-флоу wedge** (~27 экранов: scan→decode→overview→ask→watch→vault + states + onboarding + paywall). Ниже — что ещё нужно **до сабмита** в App Store, сгруппировано и приоритизировано. Делю на: **A. In-app экраны рисовать**, **B. App Store Connect deliverables (не экраны приложения)**, **C. Регуляторика UK**.

Приоритеты: **P0** = блокирует сабмит/ревью; **P1** = нужно к публичному запуску 15.07; **P2** = быстрый follow-up.

---

## A. In-app экраны, которые ещё надо отрисовать

### A1. Permissions & системные промпты (P0 — Apple реджектит без правильного контекста)
- **Camera permission primer** (пре-промпт «зачем камера» ДО системного диалога) + **denied-state** (есть error-camera-denied, нужен primer).
- **Notifications permission primer** (для Renewal Radar) + состояние «выключены».
- **Face ID / passcode** primer + fallback-passcode экран (Vault-замок).
- **ATT** — скорее НЕ нужен (нет трекинга через IDFA); если PostHog без ATT — подтвердить, иначе экран-контекст.
- **«Save to Photos / Files» share-sheet** контекст (экспорт decode).

### A2. Аккаунт & auth (P0 если есть аккаунт; у нас опционально)
- **Sign in with Apple** — экран-состояния (загрузка/успех/ошибка). Если есть сторонний вход — Apple-вход обязателен (5.1.2).
- **Email sign-up / sign-in** (если оставляем email-ветку): ввод email → **верификация** (magic link/код) → состояние.
- **Account settings**: профиль, сменить email, выйти (+ confirm), **«Удалить аккаунт и данные»** — **обязателен внутри приложения** (Apple Guideline 5.1.1(v)) + confirm + «что удалится».
- **Restore purchases** — состояния (нашёл/не нашёл/ошибка).

### A3. Legal & privacy (P0 — Apple + GDPR)
- **Privacy Policy** (внутри + hosted URL) и **Terms / EULA**.
- **Consent-центр** (управление согласиями: AI-обработка, аналитика) — отдельно от онбординга, редактируемо.
- **Data & privacy detail**: что хранится, retention, экспорт, удаление (раскрытие из Settings).
- **Licences / acknowledgements** (open-source).
- **FCA-дисклеймер экран** «Decode объясняет, не консультирует» (полная версия; короткая уже в decode-result).

### A4. Подписка / монетизация (P1)
- **Paywall-варианты**: hard (лимит исчерпан — есть) и soft (контекстный апселл из Watch — частично).
- **Manage subscription** (диплинк в Apple Subscriptions) + **статус подписки** (план, дата продления).
- **Trial-reminder** экран/нотификация (Day 5) + **expired / win-back**.
- **Redeem promo code**, заметка про **Family Sharing**, **refund/cancel guidance**.

### A5. Settings sub-screens (P1)
- **Renewal Radar settings**: горизонт напоминаний (30–45 дн), quiet hours, какие commitments watch (free/Pro-граница).
- **Notifications detail** (типы пушей, частота).
- **Appearance**: Light/Dark/System + **Dynamic Type** (размер текста) — критично для a11y.
- **Language / region** (валюта £, форматы).
- **Help / FAQ**, **Contact support** (mail composer), **About**, **What's new**, **Rate / feedback**.

### A6. Полнота ядра (P1)
- **Vault**: результаты поиска (populated), фильтры/сортировка, **re-decode/refresh**, история версий документа, **share/export decode** (PDF/summary), добавить заметку/тег, **delete document confirm**.
- **Multi-page scan** (несколько страниц, переупорядочить).
- **Trust-repair** — есть; добавить **«Report a problem»**.
- **Add manual commitment** (если документа нет, но платёж знаешь) — для J2/J3 полноты.
- **Compare two offers** (P2, но сильный для wedge).

### A7. Doc-type #2 — Insurance renewal (P1, по research/30)
- **Decode-result · insurance** (last-year vs this-year премия, auto-renew флаг, «shop around»), его trap-варианты, renewal-radar для страховки.

### A8. Edge / system states (P1)
- **Skeleton/loading** состояния списков (Vault, Radar).
- **Maintenance** / **Force-update** экраны.
- **Session expired**, **network retry «всё ещё оффлайн»** (UX-аудит: нет retry-state).
- **Decode quota meter** (сколько осталось из 5) — видимый счётчик.
- **Scan-processing**: cancel/timeout/ошибка (UX-аудит: нет) — частично есть.

### A9. Trust / transparency (P2)
- **How Decode works / methodology**, **AI transparency** (что AI, что код), **Sources & accuracy**.

---

## B. App Store Connect deliverables (не in-app экраны, но без них не выложить — P0)
- **App icon** (1024 + все размеры).
- **Скриншоты** под 6.9″/6.5″ (iPhone 17 Pro/Plus) + опц. iPad; **App preview video** (опц.).
- **App Privacy «nutrition labels»** (что собираем/связываем) — должно совпасть с Privacy Policy.
- **Age rating** анкета.
- **Описание / subtitle / keywords / promo text**, **Support URL**, **Marketing URL**, **Privacy Policy URL** (hosted).
- **App Review notes**: демо-аккаунт + как тестировать БЕЗ bank-connection (у нас его нет — плюс) + sample-документ.
- **Export compliance** (шифрование), **TestFlight** билд.
- ⚠️ **Guideline 3.1.2** — мульти-план/без trial-toggle (уже учтено в paywall); **Small Business Program** (15%).

---

## C. Регуляторика UK (P0 для финтех-смежного)
- **Финансовые промо-материалы** (financial promotions) — формулировки в App Store-описании и в приложении не должны звучать как реклама кредита/совет.
- **Прозрачный не-регулируемый статус** (FCA «explain, not advise») — заметно.
- **Vulnerable-user signposting** (StepChange/MoneyHelper/National Debtline) — есть в qa-signpost; продублировать в Help.
- **Complaints process** + **company info** (кто оператор, как жаловаться).
- **DPIA** (research/27) — внутренний, но влияет на privacy-экраны.
- **Нейминг/TM** (research/26) — «Decode» как голый словесный знак рискован; имя в сторе/иконке — после clearance (DecodeFi vs Decode+фигуратив).

---

## Оценка объёма
- **Минимум до сабмита (P0):** ~12–16 экранов (permissions×3–4, account+delete, privacy/terms/consent, legal-disclaimer) + все App Store Connect deliverables + UK-регуляторные тексты.
- **До публичного запуска (P1):** ещё ~15–20 (subscription mgmt, Radar/notif settings, appearance/Dynamic Type, vault-полнота, doc-type #2, edge-states).
- **Итого «полное» приложение:** ~55–65 экранов (сейчас ~27 = ядро wedge).

> Рекомендация: следующий спринт рисовать в порядке P0 (permissions → account/delete → legal/consent), т.к. это буквальные блокеры App Review; затем Radar/subscription settings (монетизация) и doc-type #2 (расширение).
