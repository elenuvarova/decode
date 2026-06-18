# Экран-контракт: Onboarding (ON-1…6)

**Route:** `(public)/onboarding` · **Flow:** [F1](../ux/jtbd-to-flows.md#f1) · **Шаг loop:** вход в loop (активация) · **Job:** активация перед J1
**Персоны:** все, критично для Maya (нет документа) и Priya (доверие) · **Доступ:** pre-auth, показывается один раз
**Sitemap:** [ON-1…6](../ux/screen-sitemap.md#группа-a--onboarding) · **Pre-mortem:** PM2 (ветка «нет документа»)
**Инварианты:** no bank connection (VoC T-3); AI-consent с именем Anthropic до первого скана (Apple 5.1.2(i)); free без карты; тон без осуждения; ≤3 слайда до первого действия.

---

## Логика

### Данные
- `onboarding_completed: bool` (локально) — гейт показа.
- `auth_state` — Sign in with Apple (Supabase Auth).
- `ai_consent_granted: bool` + `consent_timestamp` — требование Apple, хранить с версией текста.
- `camera_permission`, `push_permission` — статусы (push спрашиваем НЕ здесь).
- **Открытый вопрос (sitemap §4.1):** guest-scan до Sign in — да/нет? Влияет на порядок ON-4↔SC. Рабочее решение контракта: **guest-scan разрешён** (ценность до регистрации сильнее), Sign in предлагается на сохранении результата (SV). Если решим иначе — ON-4 встаёт перед ON-5.

### Состояния
- **default:** линейная последовательность ON-1→ON-6.
- **returning user** (`onboarding_completed=true`): пропуск, сразу `(app)` Home; на ON-1 ссылка «Already have an account → Sign in».
- **loading:** только ON-4 (Apple auth round-trip) — спиннер на кнопке.
- **error:** ON-4 auth fail → inline-ошибка + retry; ON-5 camera denied → не тупик, ветка Upload from Photos.
- **empty / success:** н/п (это последовательность, не список).

### Экраны и действия

**ON-1 Welcome.** Одно обещание + саб-обещание no-bank.
- `[Continue]` → ON-2. `[Already have an account]` → Sign in (ON-4) → Home.

**ON-2 Value mock.** Мокап result (продукт виден до регистрации) — снимает риск F4 «зачем это».
- `[Continue]` → ON-3. Свайп-назад → ON-1.

**ON-3 Trust & AI consent.** no bank link · encrypted · «we never sell your data» + **AI-consent toggle с именем Anthropic**.
- `ConsentToggle` обязателен: `[Continue]` disabled, пока не включён; при включении — записать `ai_consent_granted=true` + timestamp + версия текста.
- Копирайт consent (точная формулировка — TODO с юристом): «To decode your documents, Decode sends them to our AI provider, **Anthropic (Claude)**. We never sell your data. [Learn how your data is handled]».

**ON-4 Sign in with Apple.** Единственный auth.
- `[Sign in with Apple]` → системный флоу → success: создать/войти, `onboarding_completed=true` после ON-6 → ON-5. Fail → inline error + retry.
- (Если guest-scan включён — этот экран можно отложить до SV; см. открытый вопрос.)

**ON-5 Camera pre-permission.** Зачем камера + fallback.
- `[Enable camera]` → системный `(P)` → granted → SC-2; denied → ветка Upload.
- `[Upload from Photos instead]` → SC-1 (Photos-путь). Всегда видим — отказ камеры не тупик.

**ON-6 No-document branch `[PM2]`.** Если у пользователя нет оффера прямо сейчас (Maya).
- Показывается, если пользователь не пошёл сразу в камеру / тапнул «I don't have a document right now».
- `[Try a sample Klarna offer]` → SC→RS на **demo-документе** (sample, помечен «Example»).
- `[Scan an old letter or statement]` → SC-1.
- **Push-permission НЕ здесь** — системный `(P)` после первого result (F2→SV), на данных свежего документа.

### Связи
ON-6 → [scan](scan.md) (demo или реальный) · ON-4 → Home, если returning · выход из онбординга → первый result = точка активации.

---

## Визуал

**Скриншоты-референсы:** Wise/Plum welcome, Fabric value-mock, Plazo trust ([research/15](../../research/15-mobbin-onboarding.md), [research/00 §6.7](../../research/00-executive-summary.md)).

### Layout Mobile (iPhone 393×852, основной)
- Полноэкранные слайды, контент в safe-area (top: под Dynamic Island; bottom: CTA над home-indicator с `env(safe-area-inset-bottom)`).
- Вертикаль ON-1/2/3/6: верх — иллюстрация/мокап (≈45% высоты), центр — заголовок + 1–2 строки, низ — основная CTA full-width + вторичная text-button под ней.
- `PageDots` индикатор прогресса (3–4 точки) — только для ON-1→ON-3.
- ON-5/ON-6 — без точек (это решения, не слайды): заголовок-вопрос + варианты `OptionCard`.

### Layout Desktop (вторичный)
- Web-онбординг — только для landing/demo (shell = Expo); центрированная колонка max-width ≈ 480px, та же вертикаль. Не приоритет.

### Компоненты → UI-кит
`Hero` (иллюстрация+заголовок), `Button` (primary full-width, `size=lg`), text-`Button` (`variant=ghost`), `PageDots`, `ConsentToggle` (доменный — знает про consent-запись), `AppleSignInButton`, `PermissionPrimer`, `OptionCard` (ON-6), `ResultMock` (ON-2, доменный — мокап result).

### Визуальные состояния
- **ON-4 loading:** спиннер внутри Apple-кнопки, остальное disabled.
- **ON-4 error:** красная inline-строка под кнопкой + retry (в grayscale — иконка ⚠ + жирный вес, не цвет).
- **ON-5 denied:** primer остаётся, акцент смещается на `[Upload from Photos]`.
- **ON-3 consent off:** `[Continue]` в disabled-стиле (приглушён), подсказка «Tap the toggle to continue».

### Edge cases (визуально)
- Длинный заголовок локали → перенос в 2 строки, не обрезка.
- Очень маленький экран (375×667, iPhone SE) → иллюстрация ужимается, CTA остаётся в safe-area, без скролла на ON-1/3.
- Текст consent длинный → скроллится внутри своего блока, CTA не уезжает за экран.
- Dynamic Type XL → шрифты тянутся (rem), CTA не наезжает на текст.

### Открытые вопросы / TODO
- TODO(юрист): финальная формулировка AI-consent (ON-3) и privacy-копирайта.
- TODO: guest-scan до Sign in — подтвердить (влияет на порядок ON-4 ↔ ON-5/SC).
- TODO: demo-документ ON-6 — захардкоженный sample-decode или реальный scan-флоу на тестовом PDF? (sitemap §4.4).
- TODO: нужен ли отдельный слайд «как это работает» (3 шага loop) — проверить на wireframes, не раздувает ли >3 слайдов.
