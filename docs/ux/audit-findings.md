# Decode — аудиты вайрфреймов (2026-06-18)

Два многоагентных аудита по текущим lo-fi вайрам (Figma `ZR4wMSgGSbdckASvpiFwIP`, превью в `design/wireframes/figma/`). Оба: ревью по нескольким линзам → adversarial-проверка каждого findings → синтез.

## A. Технический аудит вайрфреймов (65 raw → 26 подтверждённых, 0 critical)
Линзы: визуальное выравнивание ×5 групп, компонентизация, контент/FCA/прайсинг, кросс-экранная консистентность.

**Что хорошо (подтверждено):** все заливки привязаны к токенам (0 hard-coded), фреймы выровнены в сетку, error-states целиком из компонентов; privacy/trust-костяк онбординга-2 верный.

**Should-fix:**
- **Клиппинг (исправлено):** Paywall H1 «limits» и Trust-repair caption — ⚠️ оба **уже починены** (UX-аудит подтвердил, что не воспроизводится).
- **Settings** — нижние ряды (HELP + «Decode v0.1») обрезаются на дне фрейма 874 → сделать скролл-фрейм/выше.
- **Paywall** — карточки планов не закрывают правый инсет (£41.99/£4.99 у края) → симметричный отступ.
- **HIG-навигация:** Decode-result (full-screen) и Ask не имеют X/Done/Close → добавить dismiss в навбар.
- **Компонентизация (inline → существующий компонент):** Paywall feature-rows → FeatureRow; Onboarding-2 trust-rows → FeatureRow; Vault-Detail kv → KeyValueRow; Alert-Detail £-герой → HeadlineStat, kv → KeyValueRow; Vault-List чипы → Chip(Default/Active).
- **Прайсинг:** Yearly £41.99 vs research/21 рекомендует £34.99–39.99 / ~−40% → подтвердить намеренность.

**Nits:** Onboarding-1 / Onboarding-3 dots → Dots-инстанс; Cockpit £214 → HeadlineStat; терминология входа в скан («+ Scan» / «Add a document» / «Scan a document»); «Renewal Radar» vs «Alerts inbox» нейминг; consent-toggle default-on; «Scan another» exit на decode-result; Cockpit-Empty копи сэмпла.

## B. Полный UX-аудит (81 raw → 53 подтверждённых, 0 critical)
Линзы: Nielsen, JTBD-фрикшн, онбординг/активация, восстановление после ошибок, доступность (a11y-спец), trust/FCA/тон, IA/когнагрузка, покрытие pre-mortem PM1–6.

**Сквозные темы:**
1. **Фрагментированный словарь происхождения** — 6 ярлыков («check/document/calc» vs «Calculated, not AI» vs «from your document» vs «AI») для 3 языков доверия, без легенды. Бьёт по PM6 и анти-trust-collapse.
2. **Страх без efficacy-пути** — cockpit-стек угроз, безоговорочный credit-file «YES», первый ответ Ask называют страх без «вот что делать» (нарушает fear+efficacy для avoidance-сегмента).
3. **Нет выходов / in-progress** — нет back/close на decode-result и Ask; нет cancel/timeout/error на scan-processing; нет индикатора «печатает» в Ask; нет «всё ещё оффлайн»; нет resume-after-permission на camera-denied.
4. **Renewal Radar структурно противоречив** — нет входа с Home (J3 недостижим вхолодную) И показан бесплатно без Pro-гейта (ломает PM4-монетизацию с обоих концов).
5. **Онбординг смешивает модели и просит обязательства до ценности** — карусель + терминальный CTA на слайде 1; pre-ticked consent (риск Apple 5.1.2/GDPR); сэмпл закопан; account-wall до первого decode.
6. **Quality-gate/CTA противоречат себе** — scan-review предупреждает «blurry», но «Use this scan» — primary; alert-CTA «Review the plan» ведёт к условиям, а работа — «перекинуть деньги вовремя».

**Major:**
- Onboarding-2 consent default-ON → **default OFF, Continue disabled пока не включено** (копи оставить).
- Onboarding-1 карусель+терминальный CTA → одна модель (CTA только на финальном слайде после consent, либо один welcome + inline-consent при первом скане).
- Renewal Radar без Pro-гейта → показать free/Pro-границу (Radar на 1–2 items + «unlock all with Pro»).
- Renewal Radar orphaned → **вход с cockpit** (bell с badge / «Coming up» полоса), 1 тап независимо от пушей.
- Color-alone severity → различимые **глифы на состояние** (▲ HIGH, i INFO, разные формы ok/check/calc), текст-лейбл всегда; цвет — лишь усиление.
- Credit-file hero order (PM3) → рассмотреть credit-file как первый/крупнейший блок (для Priya, высший WTP), напр. свитчабельный порядок/персонализация.

**Подтверждено хорошим:** тон и провенанс-мышление, error-state проработка, privacy-якоря.

> Эти findings заведены в работу: кодовый HIG-прототип строится с уже учтёнными фиксами (back/Done, consent-OFF, Radar-вход+гейт, severity-глифы); Figma-вайры правятся отдельно (компонентизация + выравнивание + HIG).
