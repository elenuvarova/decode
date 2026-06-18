# Decode — Tech track: PWA vs React Native/Expo на iOS (2025–2026)

Дата ресёрча: 10 июня 2026. Рынок: UK, iOS-first. Core loop Decode: **Scan → Understand → Decide → Watch** — т.е. критичны (1) камера/получение документа, (2) share-sheet вход из Mail/Files, (3) push для Renewal Radar, (4) хранение Vault.

---

## TL;DR — вердикт

- **PWA на iOS в 2026 — НЕ может быть share-sheet target.** `Web Share Target API` не реализован в Safari/WebKit и нет публичных планов ([WebKit standards-positions #11](https://github.com/WebKit/standards-positions/issues/11), [WebKit bug 194593](https://bugs.webkit.org/show_bug.cgi?id=194593)). Флоу «переслал кредитный оффер из Mail → Decode» в PWA невозможен — это убивает половину wedge-сценария.
- **Web Push в PWA работает, но только после установки на Home Screen** (classic Web Push с iOS 16.4, Declarative Web Push с iOS/iPadOS 18.4 — тоже только для installed web apps) ([webkit.org](https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/), [webkit.org/16535](https://webkit.org/blog/16535/meet-declarative-web-push/)). Renewal Radar в PWA = только для тех, кто прошёл ручную установку.
- **Камера в PWA работает** (`getUserMedia` в standalone-режиме починен ещё в iOS 13.4, [WebKit bug 185448 — RESOLVED FIXED](https://bugs.webkit.org/show_bug.cgi?id=185448)), но permission не персистится — re-prompt при каждом запуске/иногда при навигации ([WebKit bug 215884](https://bugs.webkit.org/show_bug.cgi?id=215884), [Apple Community](https://discussions.apple.com/thread/256081579)). Надёжный fallback — `<input type="file" capture>` (нативный камера-UI без WebRTC).
- **Expo/React Native закрывает всё:** share extension через `expo-share-intent` (PDF/изображения из Mail/Files), камера (expo-camera / vision-camera), push через APNs (`expo-notifications`), бесплатный тир EAS Build (15 iOS-сборок/мес) достаточен для capstone.
- **Рекомендация: Expo (React Native) и для demo, и для production.** Для production учесть App Store-риски финансовой категории: guideline **5.1.1(ix)** (legal entity, не individual developer), **5.1.2(i)** (явное согласие на шаринг данных с third-party AI, провайдер по имени — обновление ноября 2025), и границу **3.2.1(viii)** «money management» ([developer.apple.com](https://developer.apple.com/app-store/review/guidelines/), [TechCrunch](https://techcrunch.com/2025/11/13/apples-new-app-review-guidelines-clamp-down-on-apps-sharing-personal-data-with-third-party-ai/)).

---

## 1. PWA на iOS сегодня (июнь 2026)

### 1.1 Установка: friction и что изменил iOS 26

- На iOS по-прежнему **нет install prompt** (`beforeinstallprompt` не поддерживается). Установка: Share icon → проскроллить share sheet → "Add to Home Screen" → подтвердить. Большинство пользователей не знает, что так можно; конверсия кастомных «инструкций по установке» низкая ([MobiLoud, гайд 2026](https://www.mobiloud.com/blog/progressive-web-apps-ios), [SimiCart](https://simicart.com/blog/pwa-add-to-home-screen/)).
- **iOS 26 (вышла в сентябре 2025) сделала шаг навстречу:** теперь *любой* сайт, добавленный на Home Screen, по умолчанию открывается как web app (standalone), даже без манифеста; пользователь может отключить toggle "Open as Web App" ([iDownloadBlog](https://www.idownloadblog.com/2025/06/17/apple-ios-26-safari-web-apps-home-screen-bookmarks/), [MacRumors](https://www.macrumors.com/how-to/save-safari-bookmark-web-app-iphone-home-screen/), [heise](https://www.heise.de/en/news/iOS-26-and-iPadOS-26-Changed-web-app-behaviour-on-the-home-screen-10749652.html)). Это унификация поведения, но **сам флоу установки (ручной, через share sheet) не изменился** — friction остался.
- Данные по выгоде для тех, кто всё же установил: +50% conversion на iOS после add-to-home-screen в кейсах PWA Stats ([pwastats.com](https://www.pwastats.com/tags/home-screen)) — но это survivorship: до Home Screen доходит малая доля.

### 1.2 Web Push

- **Classic Web Push (Service Worker + Push API): с iOS 16.4 (март 2023), ТОЛЬКО для web apps, добавленных на Home Screen.** Из вкладки Safari на iOS подписаться на push нельзя; даже у установленного PWA подписка работает только при открытии с иконки, не из браузера ([webkit.org](https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/), [Pushpad](https://pushpad.xyz/blog/ios-special-requirements-for-web-push-notifications), [MagicBell 2026](https://www.magicbell.com/blog/pwa-ios-limitations-safari-support-complete-guide)).
- Permission prompt — только в ответ на user gesture (тап по кнопке), не на page load ([Pushpad](https://pushpad.xyz/blog/ios-special-requirements-for-web-push-notifications)).
- **Declarative Web Push — с iOS/iPadOS 18.4 (март 2025):** push без Service Worker (JSON-формат уведомления), энергоэффективнее, абсорбирован в W3C Push API draft (декабрь 2025). На iOS — **по-прежнему только для Home Screen web apps**; в табах Safari push доступен только на macOS ([webkit.org/16535](https://webkit.org/blog/16535/meet-declarative-web-push/), [WWDC25 session 235](https://developer.apple.com/videos/play/wwdc2025/235/), [WebKit Features in Safari 18.4](https://webkit.org/blog/16574/webkit-features-in-safari-18-4/), [Aimtell: State of Declarative Web Push 2026](https://aimtell.com/blog/state-of-declarative-web-push-2026)).
- Вывод для Decode: **Renewal Radar на PWA достижим технически, но только для установивших** — т.е. ядро retention-механики ставится в зависимость от самого слабого места iOS-PWA (ручная установка).

### 1.3 Share-sheet target (критичный пункт для Decode)

- **`Web Share Target API` на iOS НЕ поддерживается.** PWA не может зарегистрироваться как получатель в системном share sheet — ни для PDF, ни для фото, ни для URL. Статус WebKit: запрошено в 2019, не реализовано, позиции «under consideration» без коммитов ([WebKit bug 194593](https://bugs.webkit.org/show_bug.cgi?id=194593), [WebKit standards-positions #11](https://github.com/WebKit/standards-positions/issues/11), [MDN share_target](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/share_target)).
- Не путать с `Web Share API` (исходящий шаринг ИЗ веба) — он на iOS работает ([caniuse](https://caniuse.com/web-share)).
- Workaround в PWA: пользователь сам открывает Decode и выбирает файл через `<input type="file">` (Files app / Photos / камера). Работает, но это «pull», а не «push»-флоу: сценарий «получил BNPL-оффер в Mail → Share → Decode» недоступен.

### 1.4 Камера

- `getUserMedia` в standalone home-screen web apps **работает с iOS 13.4** (баг 2018 года закрыт как RESOLVED FIXED; подтверждено репортером в iOS 13.4 beta 1) ([WebKit bug 185448](https://bugs.webkit.org/show_bug.cgi?id=185448)).
- Ограничения: **permission на камеру не персистится** — запрос повторяется при каждом запуске приложения, плюс известные re-prompts при смене hash/маршрута в SPA ([WebKit bug 215884](https://bugs.webkit.org/show_bug.cgi?id=215884), [Scandit FAQ](https://support.scandit.com/hc/en-us/articles/360008443011-Why-does-iOS-keep-asking-for-camera-permissions), [Apple Community](https://discussions.apple.com/thread/256081579)). Нет доступа к продвинутому контролю (torch на iOS ограничен, нет нативного document-detection оверлея).
- Практичный паттерн для скана документов в PWA: `<input type="file" accept="image/*" capture="environment">` — открывает нативную камеру, без WebRTC-головной боли ([SimiCart PWA camera guide](https://simicart.com/blog/pwa-camera-access/)). Минус: нет live-оверлея «наведи на документ», нет автодетекции краёв.

### 1.5 Хранение (Vault offline)

- ITP в Safari стирает script-writable storage (IndexedDB, localStorage, Service Worker registrations) после **7 дней неиспользования сайта** — но **home-screen web apps исключены**: их данные изолированы от Safari и счётчик дней сбрасывается реальным использованием ([webkit.org tracking prevention](https://webkit.org/tracking-prevention/), [The Register](https://www.theregister.com/2020/03/26/apple_relax_were_not_totally/), [MDN storage quotas](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria)). Для Decode это означает: локальный Vault в неустановленной PWA ненадёжен; в установленной — приемлемо, но primary storage всё равно лучше держать на сервере.

### 1.6 EU DMA: статус после разворота

- Apple в начале 2024 анонсировала **удаление Home Screen web apps в EU** (iOS 17.4) в рамках DMA-комплаенса, затем **отменила решение** после жалоб: web apps в EU продолжают работать, но строятся только на WebKit ([developer.apple.com/support/dma-and-apps-in-the-eu](https://developer.apple.com/support/dma-and-apps-in-the-eu/), [9to5Mac](https://9to5mac.com/2024/03/01/apple-home-screen-web-apps-ios-17-eu/), [The Register](https://www.theregister.com/2024/03/02/apple_reverses_pwa_decision/)).
- Важно для UK: **UK не в EU, DMA на UK не распространяется** — британские пользователи Decode под эти изменения не попадали вовсе. Но эпизод показал ключевой платформенный риск PWA-стратегии на iOS: Apple может в одностороннем порядке менять статус web apps, и единственный «суд» — регулятор. EC закрыла investigation по user choice в апреле 2025 ([digital-markets-act.ec.europa.eu](https://digital-markets-act.ec.europa.eu/commission-closes-investigation-apples-user-choice-obligations-and-issues-preliminary-findings-rules-2025-04-23_en)).
- Альтернативные браузерные движки в EU (DMA) на share-target/push для PWA пока не влияют: установка web apps по-прежнему через Safari/WebKit.

---

## 2. React Native / Expo на iOS

### 2.1 Share extension — приём PDF/фото из Mail, Files, Photos

- Библиотека **`expo-share-intent`** (config plugin + native module): приём text/URL/изображений/видео/**файлов (включая PDF)** через `NSExtensionActivationSupportsFileWithMaxCount`; share extension редиректит в основное приложение через deep link, контент приходит с MIME-типом ([github.com/achorein/expo-share-intent](https://github.com/achorein/expo-share-intent), [npm](https://www.npmjs.com/package/expo-share-intent)). Поддержка Expo SDK 49+ (актуальная v7 под SDK 56).
- Альтернатива с кастомным UI прямо в share sheet: **`expo-share-extension`** (отдельный React Native bundle в extension) ([github.com/MaxAst/expo-share-extension](https://github.com/MaxAst/expo-share-extension)).
- Ограничения: **не работает в Expo Go** — нужен custom dev client (`expo prebuild` + `expo run:ios`) или EAS Build; UI-обработка контента в основной аппке (вариант achorein), кастомный view в extension осознанно не поддерживается ([README](https://github.com/achorein/expo-share-intent)).
- Вывод: нативный сценарий «Share из Mail → Decode» полностью реализуем в Expo, это стандартная, документированная практика.

### 2.2 Камера и сканирование документов

- **`expo-camera`** — простой захват фото/видео, barcode из live-фида; достаточно для «сфоткай документ» ([docs.expo.dev/versions/latest/sdk/camera](https://docs.expo.dev/versions/latest/sdk/camera/)).
- **`react-native-vision-camera`** — frame processors с real-time ML: автодетекция краёв документа, live-оверлей, OpenCV-пайплайны; рекомендован для кастомного scanning experience ([Scanbot comparison](https://scanbot.io/blog/react-native-vision-camera-vs-expo-camera/), [Medium: real-time document detection](https://medium.com/@lukasz.kurant/real-time-document-detection-using-the-camera-in-react-native-b0cc0af3bbd9), [PkgPulse 2026](https://www.pkgpulse.com/blog/react-native-vision-camera-vs-expo-camera-vs-expo-image-picker-2026)).
- Permission запрашивается один раз и персистится системно (стандартное iOS-поведение нативных приложений) — в отличие от PWA.
- Для MVP: `expo-camera` (+ серверный deskew/OCR) достаточно; vision-camera — апгрейд на этапе полировки UX скана.

### 2.3 Push

- **`expo-notifications`** + Expo Push Service поверх APNs: токены, каналы, scheduling; APNs-ключ генерируется/управляется через `eas credentials` ([docs.expo.dev/push-notifications/push-notifications-setup](https://docs.expo.dev/push-notifications/push-notifications-setup/), [overview](https://docs.expo.dev/push-notifications/overview/)).
- Требуется **платный Apple Developer Program ($99/год)** для push-credentials и вообще для TestFlight/App Store. Также возможна прямая интеграция с APNs без Expo-сервиса ([docs](https://docs.expo.dev/push-notifications/sending-notifications-custom/)).
- Плюс для Renewal Radar: **local scheduled notifications** работают офлайн без сервера — напоминание «cooling-off period кончается через 2 дня» можно ставить локально при сохранении документа в Vault.

### 2.4 EAS Build / дистрибуция

- **Free tier: 15 iOS + 15 Android билдов/мес, EAS Update до 1,000 MAU, 100 GiB bandwidth** — достаточно для MVP/capstone; Starter $19/мес ($45 build-кредитов, 3,000 MAU), Production $199/мес ([expo.dev/pricing](https://expo.dev/pricing), [docs.expo.dev/billing/plans](https://docs.expo.dev/billing/plans/)). Free tier имеет 45-минутный таймаут билда ([Applighter calculator](https://www.applighter.com/blog/expo-eas-build-cost-calculator)).
- Сам Expo SDK/CLI бесплатны; локальные билды (`expo run:ios` на Mac) не тратят квоту.
- Для demo без App Store: dev client на собственном устройстве (бесплатный Apple ID — 7-дневные provisioning profiles, неудобно; с $99 аккаунтом — TestFlight).

### 2.5 App Store review: финансовое приложение с AI

Актуальные guidelines ([developer.apple.com/app-store/review/guidelines](https://developer.apple.com/app-store/review/guidelines/)):

- **3.2.1(viii):** "Apps used for financial trading, investing, or money management should be submitted by the financial institution performing such services and must have necessary licensing and permissions in the locations where you make them available." Decode **не** торгует/не инвестирует/не двигает деньги — позиционирование «document understanding tool / informational» важно удерживать и в метаданных App Store, чтобы не попасть в эту категорию. Граница трактуется ревьюером.
- **5.1.1(ix):** apps in highly regulated fields (banking and financial services, healthcare, crypto exchanges — крипта добавлена в 2025) "should be submitted by a legal entity that provides the services, and not by an individual developer" ([guidelines](https://developer.apple.com/app-store/review/guidelines/), [Apple Developer Forums — кейсы реджектов](https://developer.apple.com/forums/thread/683829)). Для production это означает: организация + D-U-N-S number, не личный аккаунт.
- **5.1.2(i), обновление ноября 2025:** "clearly disclose where personal data will be shared with third parties, **including with third-party AI**, and obtain explicit permission before doing so" — раскрытие должно называть AI-провайдера по имени (OpenAI/Anthropic/Google), generic-формулировки недостаточны ([TechCrunch](https://techcrunch.com/2025/11/13/apples-new-app-review-guidelines-clamp-down-on-apps-sharing-personal-data-with-third-party-ai/), [dev.to разбор](https://dev.to/arshtechpro/apples-guideline-512i-the-ai-data-sharing-rule-that-will-impact-every-ios-developer-1b0p)). Для Decode (финансовые документы → LLM API) это прямое требование к onboarding-консенту.
- Ноябрь 2025 также ужесточил правила про loan apps (APR cap 36% в 3.2.2(ix)) — к Decode не относится напрямую, но показывает усиленное внимание ревью к финансовой категории ([How2Shout](https://www.how2shout.com/news/apple-app-store-guidelines-update-november-2025-clone-apps-ai-privacy.html)).
- Privacy labels + аккуратный disclaimer «not financial advice» — обязательная гигиена (UK: граница с FCA-regulated «financial advice» — отдельный трек, не технический).

---

## 3. Матрица возможностей (iOS, июнь 2026)

| Возможность (для Decode) | PWA (Home Screen web app) | PWA (вкладка Safari) | Expo / React Native |
|---|---|---|---|
| Share-sheet target: принять PDF/фото из Mail | ❌ нет (Web Share Target не реализован) | ❌ | ✅ share extension (`expo-share-intent`) |
| Камера: live-сканер документа с оверлеем | ⚠️ `getUserMedia` работает, re-prompt каждый запуск, нет edge-detection | ⚠️ то же | ✅ vision-camera / expo-camera, персистентный permission |
| Камера: простой снимок | ✅ `<input capture>` | ✅ | ✅ |
| Push (Renewal Radar) | ⚠️ только после ручной установки (iOS 16.4+/18.4 declarative) | ❌ | ✅ APNs + local scheduled notifications |
| Установка / дистрибуция | ⚠️ ручной "Add to Home Screen", нет install prompt; iOS 26: любой сайт → web app | ✅ просто URL | ⚠️ App Store review, $99/год, но: TestFlight, доверие |
| Надёжность локального хранилища (Vault) | ✅ exempt от 7-day ITP cap | ❌ 7-day eviction | ✅ полный доступ (SQLite/FS, Keychain) |
| Face ID / биометрия для Vault | ❌ только WebAuthn-passkeys, не lock-screen | ❌ | ✅ `expo-local-authentication` |
| Badging, фоновая синхронизация | ⚠️ Badging есть, Background Sync нет | ❌ | ✅ |
| Скорость итераций / стоимость | ✅ deploy = git push | ✅ | ⚠️ EAS free tier 15 билдов/мес + OTA-апдейты EAS Update |
| Платформенный риск | ⚠️ Apple может менять правила (прецедент EU 17.4) | ⚠️ | ⚠️ App Store review (финкатегория, 5.1.1(ix)) |

---

## 4. Вердикт

### Для MVP / capstone demo
**Expo (React Native), управляемый workflow + EAS Build free tier.** Причины:
1. Оба входа wedge-флоу — «сфотографируй» И «пошэрь из Mail» — работают только нативно; demo без share-in показывает половину продукта и прячет differentiator.
2. Renewal Radar демонстрируется локальными notifications без серверной инфраструктуры.
3. Free tier EAS (15 iOS-билдов/мес) + dev client покрывают capstone бесплатно (кроме $99/год Apple Developer для TestFlight-шаринга демо).
4. Допустимый гибрид для скорости: маркетинговый сайт + интерактивный прототип — веб; продуктовая оболочка — Expo.

Если бюджет времени совсем мал и demo показывается «с руки» на одном устройстве: можно начать с web-прототипа (React) для скриншотов/флоу и параллельно держать Expo-shell — кодовая база на React переносится частично (логика, дизайн-токены), но это компромисс, а не рекомендация.

### Для production
**Тоже React Native/Expo.** PWA-путь для Decode закрыт не «полировкой», а тремя жёсткими фактами: нет Web Share Target, push только после ручной установки, нет биометрии для Vault. Plus: доверие (финансовые документы загружают охотнее в App Store-приложение с Face ID), и App Store как канал дистрибуции в UK.
Production-чеклист по review: организация-аккаунт (5.1.1(ix)), named-AI-provider consent (5.1.2(i)), позиционирование «document decoder», не «money management» (3.2.1(viii)), privacy labels, on-device pre-processing где возможно.

---

## Key takeaways for Decode

1. **Share-in — нативная фича, проектировать как первый класс.** Wireframes должны включать share-extension флоу: Mail → Share → Decode → (мгновенный переход в основное приложение) → Scan-результат. В PWA этого флоу не существует на iOS; значит платформа MVP — Expo.
2. **Два равноправных входа в Scan:** (a) share-in PDF/скриншот, (b) камера. Для камеры на MVP хватит `expo-camera`; live edge-detection (vision-camera) — в backlog полировки, не блокер.
3. **Renewal Radar строить на local scheduled notifications** (ставятся в момент сохранения документа в Vault) + серверный push как второй слой. Это работает офлайн, не требует push-инфраструктуры на demo и снимает зависимость от opt-in rate на пуши.
4. **Onboarding обязан содержать AI-consent экран:** «документы обрабатываются [Anthropic/OpenAI — по имени]», explicit permission ДО первого скана — это требование guideline 5.1.2(i) (ноябрь 2025), а заодно trust-фича для финансового продукта. Заложить в wireframes.
5. **Vault + Face ID** (`expo-local-authentication`) — дешёвый и сильный trust-сигнал, недоступный в PWA; включить в MVP-скоуп.
6. **App Store позиционирование:** описывать Decode как «understand your financial documents», избегать формулировок «manage your money/finances» — чтобы не триггерить 3.2.1(viii)/3.1.5-категорию ревью. Для публикации в production нужен organization-аккаунт (юрлицо + D-U-N-S), на этапе portfolio-demo достаточно TestFlight с personal-аккаунта.
7. **Веб не выбрасывать:** landing + «попробуй на одном документе» web-демо (upload, без камеры/share) — хороший acquisition-верх воронки, тем более что iOS 26 сделал web apps на Home Screen дефолтом. Но продукт — нативный.

## Что не найдено / открытые вопросы
- Публичных сигналов о планах Apple реализовать Web Share Target API — не найдено (последняя активность в standards-positions без коммитов).
- Статистики install-rate PWA на iOS конкретно для finance-категории — не найдено; есть только общие кейсы конверсии после установки ([pwastats.com](https://www.pwastats.com/tags/home-screen)).
- Прецедентов реджекта именно «AI document explainer» финансовых приложений — не найдено; риск-оценка по 3.2.1(viii)/5.1.1(ix) построена на тексте guidelines и форумных кейсах смежных категорий.
