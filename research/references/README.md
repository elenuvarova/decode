# Decode — Референсы экранов (индекс)

Скриншоты реальных iOS-приложений под wireframe/hi-fi фазу, стянуты с Mobbin (+ Refero/App Store из ресёрч-спринта). Карта «зачем какой» — [research/34](../34-wireframe-refs-competitors-banking.md). Принцип: **простые интерфейсы, «3–5 интентов на экран»** (тренд 2026), эталон спокойного тона — Starling.

> ⚠️ Картинки — референс для вдохновения/паттернов, НЕ для копирования 1:1. При сборке в Figma — только через DS-компоненты и переменные (ListItem/Button/Card + Theme/Spacing), не хардкод.

## Карта: экран Decode → папка → лучший матч

| Экран Decode | Папка | Лучший матч (почему) | Mobbin |
|---|---|---|---|
| Onboarding / Welcome | `onboarding/` | **Lovi** — сканер + «делаем ресёрч за тебя» + мок в рамке; Rocket Money | [Lovi](https://mobbin.com/screens/71c7edc8-409b-453b-a32b-b9677e07b3a3) |
| Register / Sign-in | `register/` | **Cal AI** — «Sign in with Apple / Skip» = наш Apple+guest; Slopes | [Cal AI](https://mobbin.com/screens/8a2c0faf-61ab-4b84-b833-c80c3aeb19de) |
| Trust / AI-consent | `consent/` | **Fabric** — privacy commitment (store little, AES, never hand over); Tabby (fintech) | [Fabric](https://mobbin.com/screens/8eea0b7a-c69e-45d7-a105-0abab2396e59) |
| Scan / Capture | `scan-capture/` | **Apple Notes / Google Drive** — рамка-видоискатель; DoorDash (ID-frame); Docusign | [Apple Notes](https://mobbin.com/screens/5cd8064c-c8c7-4be0-b342-ddc364ab9fae) |
| Processing (стадии) | `processing/` | **Monese/Veriff** — «Photos processed · Document inspected · Finalizing» = наши стадии; Lovi «Building a scan report» | [Monese](https://mobbin.com/screens/2c41541b-7189-4107-8b92-de7f6e2698d4) |
| Decode-result | `result/` | **Binance** — «Positives / Risks» с source-чипами = наши trap-карточки+провенанс; Quizlet (score-ring) | [Binance](https://mobbin.com/screens/ecac2ce9-4b02-4cba-8f7c-fe75420b90fb) |
| Source-highlight | `source-highlight/` | **Matter** — подсвеченный пассаж + тулбар; Pocket (жёлтый highlight) | [Matter](https://mobbin.com/screens/058e54c1-2c6e-4568-939e-72ca0bd6ef85) |
| Ask (Q&A) | `ask/` | **Fabric** — «Ask about this item» + чипы, скоуп на документ; ChatGPT (Sources-панель) | [Fabric](https://mobbin.com/screens/a2bfb928-8466-4f5b-99f2-8137d3e84179) |
| Signpost / Help | `signpost/` | **Woolworths** — FAQ/Message/Call + часы; adidas («email a human») | [Woolworths](https://mobbin.com/screens/8f864c78-afeb-4c5e-96e1-5b7a0208fb4f) |
| Overview / Home | `home/` | **Ubank** — Bill Planner «Spotify · Due in 29 days · £13.99» = наши предстоящие списания; Up | [Ubank](https://mobbin.com/screens/cdb43016-3430-492e-a5b9-f65727f3083b) |
| Vault (список) | `vault/` | **Revolut** (чистый logo+name список); KakaoBank (карточки с ценой/каденсом) | [Revolut](https://mobbin.com/screens/c59012f9-7113-47b3-9938-b063e110402b) |
| Vault-detail | `vault-detail/` | **Orbit** — key-value + Notes + «Mark as Cancelled»/«Delete» = точный наш detail; Saily | [Orbit](https://mobbin.com/screens/25f56dfb-f2d5-41cf-94c9-14cd6c8c5d40) |
| Alerts / Radar inbox | `alerts/` | **Cleo** — Promotions/Alerts табы + bell; Alexa (по датам) | [Cleo](https://mobbin.com/screens/a4d7c5bf-fd3f-4f4b-855c-1030f40182e5) |
| Payment calendar | `calendar/` | **Rocket Money** — суммы на датах + футер «1 Bill £3 · 2 Subs £31»; Orbit (Total/Upcoming) | [Rocket Money](https://mobbin.com/screens/0fe3af19-4929-4cff-b324-2929d7ddc5a2) |
| Success (Save-watch) | `success/` | **Bevel** — «You're all set» + check + дисклеймер; Monese (success+toast) | [Bevel](https://mobbin.com/screens/e9385ef8-9990-4afa-b7a0-6fe17ef160c9) |
| Paywall | `paywall/` | **Deezer** («remind you 7 days before» = анти-dark-pattern); Paired («no payment due today»); Public; Atlantic | [Deezer](https://mobbin.com/screens/dd07a5ae-9389-4f73-95c0-ccd56420977f) |
| Subscription-management | `subscription/` | **Prime Video** — «Apple IAP · Edit in App Store» = наш паттерн; Blackbird (key-value+cancel) | [Prime Video](https://mobbin.com/screens/504ea364-1669-424c-acf6-72a0456d7f3e) |
| Settings | `settings/` | **Paired** — Account/Subscription/Help c Crisis helplines = наш Settings+signposting; NYTimes | [Paired](https://mobbin.com/screens/df7b84fb-5c70-43a6-ab2a-39f89f237319) |
| Error state | `errors/` | **PayPal** — минимальный honest «try later» + Try Again/Not Now; Freenow («something went wrong» + причина) | [PayPal](https://mobbin.com/screens/305815a1-eb96-4544-bde7-c1342b7e15ce) |
| Empty state | `empty/` | **Ubank** — «0 bills / You don't have any bills / + Track new bill» = наш empty Vault; Runna | [Ubank](https://mobbin.com/screens/0f38d793-9dc5-4c87-b22f-c4c0290797fa) |
| Permission primer | `permission/` | **Craft** — «Photo Library · Required to upload · we don't scan/store»; LINE (pre-permission primer) | [Craft](https://mobbin.com/screens/e7a3a849-0418-4622-8ffa-262b60847564) |
| Destructive confirm | `confirm/` | **Quo** — «What you should know / What you can do instead» = honest+альтернатива; Mindvalley | [Quo](https://mobbin.com/screens/4cba74e0-11a0-43d1-b7e6-9e7b3469b002) |

## Уже было (ресёрч-спринт)
- `competitors/` — домашние экраны конкурентов (Plum, Zilch, Nous, Cleo, Klarna UK, Emma, Snoop, Clearpay UK, Monzo Flex, Bobby, Adobe AI).
- `hifi/` — банки/финтех (Starling, Mercury, Quicken, Toss, ubank, crypto.com, Revolut, Dime, Kin) + AI-объяснялки (ChatGPT, Gemini, Google, Speechify).
- `refero/` — Refero-скрины (Claude, Subo, ElevenReader, Klarna, OnSkin, Copilot).

## Refero deep-dive (2026-08)

- [refero-scan.md](refero-scan.md) — screen-паттерны под наши экраны (Subo=прямой конкурент: 3-колоночная стат-полоса, icon-box строки, двухуровневые действия; Copilot=overview; Claude=Ask). Скрины в `refero/`.
- [monospace-code-aesthetic.md](monospace-code-aesthetic.md) — есть ли код/ASCII-стилистика: на мобиле почти нет, на вебе 2 семейства (dark-terminal vs light-ledger). Вердикт: dark-terminal Decode не подходит (холодно для сегмента), но light monospace-ledger-акцент рифмуется с «Calculated, not AI» — кандидат на hi-fi. Веб-превью в `refero/styles/`.
- [angular-sharp-buttons.md](angular-sharp-buttons.md) — **(2026-08-11)** угловатость и квадратные кнопки. Dropbox радиус-0 насквозь **на вебе** (прайсинг, «Create», «Share folder», даже поле поиска), скруглён только iOS-клиент — платформа глушит бренд-язык. На iOS радиус 0 = код фэшн-ретейла (H&M, ZARA, SSENSE, HBX, Zalando, adidas), в потребительском финтехе не встретился ни разу; на вебе такой привязки нет. Риск не в радиусе, а в связке «чёрная + во всю ширину + 0 + внизу» = «ADD TO BAG» — разомкнуть любой элемент. Скрины в `angular-sharp/`. ⚠️ Содержит правку: первая версия судила о Dropbox по одной платформе и ошиблась.
- [ascii-motifs.md](ascii-motifs.md) — **(2026-08-10)** прицельно по ASCII-мотивам в приложениях. Мотив расслаивается на 4 приёма; главная находка — **Co–Star** (настоящий ASCII на белом, Gen Z, тёплый тон) снимает возражение «холодно для сегмента». Плюс `+`-сетка Hyundai Card, dot-matrix табло raum., ASCII-прогресс alias, лог-processing Vibecode/Manus, чековая математика PocketCU/GoPay. Ограничение: ASCII — язык формы, а не способ вёрстки (VoiceOver + Dynamic Type). Скрины в `ascii-motifs/`.

## Как пополнять
Mobbin MCP: `search_screens` / `search_flows` → `image_url` → `curl` в нужную папку. Именование: `mobbin-<app>-<screen>.webp`. Каждый скрин цитировать по его `mobbin_url`.
