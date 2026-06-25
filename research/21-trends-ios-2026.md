# iOS app design trends — 2026 (research for Decode)

**Дата:** 2026-06-25 · **Источники:** Mobbin (реальные текущие экраны), веб (iOS 26 / fintech 2026), Refero.
**Зачем:** определить направление визуала Decode (особенно вопрос «мало воздуха») по актуальным трендам, а не на глаз.

## Источники

**Mobbin — finance / subscription (прямые конкуренты Decode):**
- Homes/дашборды: [Up](https://mobbin.com/screens/f74de08d-881e-46b4-bb44-1715b802d238) · [Monarch](https://mobbin.com/screens/c768c818-330e-4598-bd2e-fe2af92f48e4) · [Ubank](https://mobbin.com/screens/cdb43016-3430-492e-a5b9-f65727f3083b) · [Affirm (BNPL)](https://mobbin.com/screens/377a2f54-2fdb-4879-aac7-b6d17d5e92fa) · [Quicken](https://mobbin.com/screens/32ae27b5-b0d4-4b14-909c-b5ca5865534a)
- Recurring/трекеры: [Origin](https://mobbin.com/screens/3441dd7a-d41e-4406-950a-299684f6dc02) · [Copilot Money](https://mobbin.com/screens/525e2e2a-bdb8-4871-bfb1-c7db46d2cf59) · [Rocket Money](https://mobbin.com/screens/c0278332-1359-4d05-bacc-d84692fc14f1) · [Truebill](https://mobbin.com/screens/ac285c0b-dd92-4969-82b3-4f22f12502a3) · [Monarch Recurring](https://mobbin.com/screens/73dbe2e1-4a9d-4663-a192-acbb5f3b6186)
- Paywalls: [Linktree](https://mobbin.com/screens/2f512d2a-850b-48b3-85a0-1e63f07ba813) · [Atoms](https://mobbin.com/screens/5a57b74f-c49a-4125-910b-60055fe9108c) · [Brave](https://mobbin.com/screens/8c24c78b-1ecc-485b-b355-0316eb310003) · [Tolan](https://mobbin.com/screens/bbd76014-dfc6-473f-816b-46a270738aa3) · [Craft](https://mobbin.com/screens/0d8ba841-a14c-4915-82c6-f4077139c8e7)

**Web:** [iOS 26 Liquid Glass trends](https://ravi6997.medium.com/liquid-glass-ui-revolution-how-ios-26-changes-app-ui-ux-best-practices-08215b4108b2) · [iOS UX trends 2026 (ASAP)](https://asappstudio.com/ios-ux-design-trends-2026/) · [Fintech UX 2026 (Onething)](https://www.onething.design/post/top-10-fintech-ux-design-practices-2026) · [Fintech design guide (Eleken)](https://www.eleken.co/blog-posts/modern-fintech-design-guide) · [UI trends 2026 (Tubik)](https://blog.tubikstudio.com/ui-design-trends-2026/)
**Refero:** [refero.design/apps](https://refero.design/apps) (галерея JS-gated; есть свой [MCP](https://refero.design/mcp), к сессии не подключён). Тренды fintech по Refero: soft gradients, bold typography, neutral palettes, minimal borders, smooth shadows, light+dark.

## Тренды и что они значат для Decode

1. **Просторные, карточно-сгруппированные, «число-первые» лейауты — доминируют.**
   У ВСЕХ конкурентов (Monarch, Copilot, Origin, Rocket Money, Ubank, Up): светлый фон, карточки = группы, крупные display-числа как фокус, секции с заголовками + щедрый воздух между ними.
   → **Вывод по «мало воздуха»: твоё направление ВЕРНОЕ и в тренде.** 24px между секциями — норма; можно уверенно даже чуть просторнее (Things/Monarch-like). Hero-числа крупнее + больше воздуха вокруг.

2. **iOS 26 «Liquid Glass»** (новый материал Apple; поддержка обязательна к сент. 2026). Полупрозрачный преломляющий материал для **навигации** (TabBar/nav-bars «парят» над контентом); контент остаётся чистым/непрозрачным. Практика: стекло ТОЛЬКО в навигации, не везде.
   → На фазе hi-fi/цвета: **translucent floating TabBar + nav-bars (Liquid Glass), карточки контента — матовые/чистые.** Перспективное и скоро-обязательное.

3. **Жирная типографика + ledger/tabular-цифры.** Высокий контраст; тренд на характерные (порой serif) заголовки и «бухгалтерские» выровненные цифры. Light+dark — уже не фича, а ожидание.
   → Decode: `tabular-nums` уже заложены; усилить bold display-числа; на фазе цвета — рассмотреть более характерную подачу hero-числа. Light-first + dark (уже план).

4. **Primary-действия в thumb-zone + bottom-sheets + жесты.** → Decode уже прибил CTA к низу и использует sheets ✓.

5. **Paywall-паттерн (текущий стандарт):** выбранный план = **radio + бейдж «Save %/Best value»** + Free-vs-Pro чеклист + крупный нижний CTA + прозрачный таймлайн триала (Linktree, Brave, Atoms, Tolan).
   → **Decode paywall: добавить состояние выбора плана (radio + save-бейдж)** — это норма, не опция (то, что я раньше пометил «на твоё усмотрение» — по трендам нужно сделать).

6. **Цвет (когда придёт):** нейтральная/светлая база + ОДИН brand-акцент + опц. мягкий градиент в шапке/hero; минимальные границы; мягкие тени; семантические токены.
   → Decode grayscale→цвет (один primary + semantic) — в тренде. Добавить: мягкий градиент hero/шапки, тонкие границы, мягкие тени.

7. **Доверие (fintech/AI):** провенанс, простой язык, без дарк-паттернов. → Decode уже силён (Calculated-not-AI, ссылки на источник, signposting).

## Итог для Decode
- **Воздух: идём просторно** — 24px между секциями (как на пилоте cockpit) попадает в тренд; можно смелее.
- **Сейчас (вайрфрейм):** раскатать спейсинг/группировку + добавить selected-plan на paywall.
- **Фаза цвета/hi-fi:** Liquid-Glass навигация, светлая база + 1 акцент + мягкий градиент hero, bold tabular hero-числа, dark mode парно.
