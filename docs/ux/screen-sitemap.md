# Decode — Screen sitemap

**Фаза:** UX architecture · **Дата:** 2026-06-12 · **Обновлено:** 2026-07-02 — синхронизация с построенным (Figma + прототип; закрывает finding H6 из [audit-2026-07-02-full.md](../../design/audit-2026-07-02-full.md)) · **Платформа:** iPhone, последняя iOS
**Вход:** [jtbd-to-flows.md](jtbd-to-flows.md) (flows F1–F9), [task4-personas-premortem.md](../research-sprint/task4-personas-premortem.md) (требования PM1–6)
**Выход:** на каждый экран — поэкранный контракт `docs/screens/<url>.md` перед ч/б wireframes.

Полная карта экранов с переходами и navigation-моделью. ID сверены с flow-документом.

---

## 1. Navigation-модель

**Shell — нижний TabBar, 3 пункта** (iOS HIG, thumb-zone):

```
┌─────────────────────────────────────────┐
│                                         │
│            активный таб                  │
│                                         │
├──────────┬───────────────┬──────────────┤
│   Home    │   ⊕ Scan      │    Vault     │   ← TabBar (safe-area bottom)
│ (Overview) │  (центр, акцент)│  (Документы) │
└──────────┴───────────────┴──────────────┘
```

- **Home (Overview)** — дефолтный таб `[PM1]`. Не последний result.
- **⊕ Scan** — центральный акцентный пункт; не экран-назначение, а презентует модально `{Capture sheet}` поверх текущего таба.
- **Vault** — список всех decoded-документов/обязательств.
- **Settings** — НЕ таб; push из шестерёнки в шапке Home (редкий доступ).
- **Alerts** — НЕ таб; bell в шапке Home → **полноэкранный Renewal Radar** (обновлено 2026-07-02: не sheet — объём контента + Pro-upsell блок) + push-нотификации (Radar = следствие скана, не отдельная навигация).

**Слои навигации:**
- **Onboarding stack** — pre-auth, показывается один раз, без TabBar (route-группа `(public)` при сборке).
- **Main tabs** — `(app)`-группа с TabBar.
- **Modal pipeline** — Scan→Result→Ask презентуются модально поверх табов (полноэкранные modal + bottom-sheets), чтобы loop не зависел от текущего таба.
- **Detail sheets** — commitment / alert / source как bottom-sheets.

Переходы — нативные (push в стеках, modal-present для pipeline, sheet для деталей). Возврат — свайп-назад/закрытие шита. Без hover-зависимостей.

---

## 2. Инвентаризация экранов

`[F]` полноэкранный · `{S}` bottom-sheet · `(P)` системный диалог · ★ = ключевой для активации

### Группа A · Onboarding (F1, pre-auth) — обновлено 2026-07-02 под построенное

| ID | Экран | Тип | Из | В | Ключевые компоненты (UI-кит) | Состояния | Job/PM |
|---|---|---|---|---|---|---|---|
| ON-1 | Welcome + value mock | [F] | launch | ON-2 · ON-4a («already have an account») | Hero, ResultMock прямо на welcome: карточка «TRUE COST £412» + чип «Credit file: YES», Button, PageDots | default · returning user | актив. · F4-риск |
| ON-2 | Trust & AI consent (`Onboarding-2-Trust`) | [F] | ON-1 | ON-3 | TrustList, ConsentToggle (Anthropic), Button | consent-required | VoC T-3, Apple 5.1.2 |
| ON-3 | No-document / entry choice ★ (`Onboarding-3-NoDoc`) | [F] | ON-2 | RS(demo) · SC-1 · ON-4 | OptionCard ×4: «Try a sample» / «Decode something you signed» / «Forward an email» / «Skip for now» | — | **PM2** |
| ON-4 | Register (`Onboarding-4-Register`) | [F] | ON-3 | HM(empty) · ON-4a | AppleSignInButton (primary), Button «Continue with email», тихий «Skip — keep on device» (гость/локальный режим) | loading · error | откр. вопрос №1 → решён |
| ON-4a | Email auth (`email-auth`) | [F] | ON-4 · ON-1 | HM(empty) | EmailField, PasswordField, «Forgot password», «Create account» | error | — |

> **Изменения против плана 2026-06-12 (обновлено 2026-07-02):**
>
> - Бывший отдельный экран «Value mock» (старый ON-2) **слит в ON-1** — сознательное решение: продукт виден с первого экрана, до любого действия.
> - Ветка «нет документа» — **полноэкранный ON-3, не sheet**, и это общий entry-choice шаг на 4 опции, а не боковая ветка.
> - Регистрация (ON-4) — **три опции**; старый контракт «Sign in with Apple — единственный auth» отменён: Apple — primary, плюс email-auth, плюс «Skip — keep on device» = гостевой/локальный режим (ценность до регистрации).
> - Отдельный экран camera pre-permission (бывший ON-5) в построенный онбординг не вошёл: камера запрашивается в scan-флоу; отказ покрыт экраном Error · Camera-denied + fallback «Upload from Photos».
>
> Push-permission — НЕ онбординг-экран: системный `(P)` после первого result, на данных свежего документа.

### Группа B · App shell (tabs)

| ID | Экран | Тип | Из | В | Компоненты | Состояния | Job/PM |
|---|---|---|---|---|---|---|---|
| HM | Home / Overview ★ | [F] | TabBar · post-save | VA-d · SC-1 · AL | Headline, RangeToggle(7/30/60·mo/yr), SectionList, CommitmentRow, TrapBadge, EmptyState | empty · 1 · many · all-clear | **J2 · PM1** |
| VA | Vault list | [F] | TabBar | VA-d · SC-1 | SearchBar, FilterChips, CommitmentRow, EmptyState | empty · 1 · many | J6 |

### Группа C · Scan & Decode pipeline (F2, modal)

| ID | Экран | Тип | Из | В | Компоненты | Состояния | Job/PM |
|---|---|---|---|---|---|---|---|
| SC-1 | Capture sheet | {S} | ⊕Scan · empty-state · ON-3 («Decode something you signed») | SC-2 / Photos / Files | ActionList(3), RecentPhotosStrip | — | J1 |
| SC-2 | Camera | [F] | SC-1 | SC-3 | Viewfinder, EdgeOverlay, AutoManualToggle, ShutterButton, PageCounter | scanning · multi-page · low-light | J1 |
| SC-3 | Review / confirm | [F] | SC-2 | SC-4 / retake | PagePreview, Retake/AddPage, CropHandles(fallback) | ok · quality-fail(✗/✓) | J1 |
| SC-4 | Processing | [F] | SC-3 | RS | DocThumb+ScanLine, StageProgress(4), ResultSkeleton | streaming · slow · fail | J1 |
| RS | Decode-result ★ | [F] | SC-4 · VA-d | QA · QA-src · SW · SC-1 | AhaNumber, **CreditFileBadge**, KeyTermList, RiskLabel, TrapCard, TrustSourceTag, ConfidenceTag, CalculatedBadge | success · partial(couldn't read) · error | **J1 · PM3 · PM6** |
| RS-c | Inline correction | {S} | RS (tap «Check this») | RS (recalc) | ZoomDoc, GuidedCorrectField, RecalcToast | — | PM6 |
| SW | Save-Watch success (обновлено 2026-07-02) | [F] | RS «Save & watch» | HM · VA · RD-set | «Saved & watching», строка-подтверждение даты «Watching the 28 May payment — we'll remind you 2 days before.», Button(Back to Overview), Link(View in Vault), тихий Link(Adjust reminders) | — | J3 шов Scan→Watch |

> **Обновлено 2026-07-02:** конфигурационный шит `SV` (AutoNameField + DateSuggestionList + RadarToggle) **не строился** — вместо него zero-config save: тап «Save & watch» на RS сразу ведёт на success-экран `SW`; авто-имя и даты Radar ставятся автоматически. Конфигурация живёт за тихим «Adjust reminders» → RD-set.

### Группа D · Decide / Ask (F3, sheets)

| ID | Экран | Тип | Из | В | Компоненты | Состояния | Job/PM |
|---|---|---|---|---|---|---|---|
| QA | Q&A sheet ★ | {S} | RS · long-press term | QA-src · QA-sign | DocHeader, SuggestChip ×3, ChatStream, CitationLink, UncertaintyNote | default · streaming · «not specified» | **J4 · J5** |
| QA-src | Source highlight (фрейм «Source-Highlight», обновлено 2026-07-02: построен) | {S} | RS (tap «from your document ›» / citation) · QA (tap citation-пилюли) | Done → back · «Report a mismatch» → Trust-repair | SourceHeader (имя оффера + «p.2 §4»), DocExcerpt с одной подсвеченной строкой, Caption «This is the exact line from your document», тихий CTA «Report a mismatch» | — | **PM6 ✅** |
| QA-sign | Debt-distress signpost | {S} | QA (intent-detect) | external (MoneyHelper/StepChange) | SignpostCard, «choice is yours» note | — | **PM5** · FCA |

### Группа E · Watch / Radar (F6)

| ID | Экран | Тип | Из | В | Компоненты | Состояния | Job/PM |
|---|---|---|---|---|---|---|---|
| AL | Renewal Radar (Alerts, обновлено 2026-07-02: полноэкранный, не sheet) | [F] | HM bell | AL-d · RD-set · PW | UpcomingCalendar, ComingLaterList, WatchContract(«4 dates·checked today»), ProUpsellBlock(«Watching 2 of 6 · Unlock with Pro») | all-clear · upcoming · overdue · no-permission | J3 · PM4 |
| AL-d | Alert detail | {S} | AL · (P) notification | RS / VA-d | AlertCard([что]+[когда]+[£+дата]+1 CTA), WhyLink+SourceHighlight | renewal · price-rise · overdue(CPA double) | J3 |
| RD-set | Reminder settings | {S} | SW («Adjust reminders») · AL | back | LeadTimePicker(by category), LockedToggle(renewals), OffToggle(tips) | — | PM4(free/paid lead) |

### Группа F · Monetization (F8)

| ID | Экран | Тип | Из | В | Компоненты | Состояния | Job/PM |
|---|---|---|---|---|---|---|---|
| PW | Paywall | {S} | после 1-го decode (Day-0) · лимит N/мес · Watch-gate | (P) Apple IAP | MultiPlanSelector(£4.99·−30% yr)+TrialTimeline, FreeLimitLine, FeatureList(no footnotes) | free-active · near-limit · purchased · restore | **PM4** · VoC T-1/2 · Apple 3.1.2 |

### Группа G · Settings & trust (F9)

| ID | Экран | Тип | Из | В | Компоненты | Состояния | Job/PM |
|---|---|---|---|---|---|---|---|
| ST | Settings | [F] | HM gear | под-экраны | SettingsList | — | гигиена |
| ST-sub | Subscription | [F] | ST | (P) Apple Subscriptions | StatusRow, «Manage in Apple Subscriptions»(2 тапа) | free · paid · cancelled | VoC T-1 |
| ST-priv | Privacy & data | [F] | ST | confirm | DataFlowList, RetentionRow, DeleteAllButton | — | VoC T-3 |
| ST-notif | Notifications | [F] | ST | (P) iOS settings | CategoryToggles, LeadTime | granted · denied-banner | VoC T-7 |
| ST-help | Help | [F] | ST | mail compose | «Email a human · 24h», FAQ | — | VoC T-6 |
| ST-legal | Legal & disclaimer | [F] | ST | external | DisclaimerText, MoneyHelper/StepChange links | — | FCA · PM5 |

### Группа H · Shared system states

| ID | Экран | Тип | Где | Компоненты | Покрывает |
|---|---|---|---|---|---|
| SY-empty | Empty state | компонент | HM, VA | EmptyState(icon+text+ScanCTA) | анти-тупик (всегда кнопка Scan) |
| SY-error | Error state | компонент | SC-3/4, RS, сеть | ErrorState(диагностика ✗/✓ + retry + ручной fallback) | F3-риск, capture-quality |
| SY-perm | Permission primers | [F]/(P) | SC-2(камера — системный `(P)` в scan-флоу, обновлено 2026-07-02: бывш. ON-5), post-result(push), VA(Face ID) | PermissionPrimer | trust, retention |

**Итого (обновлено 2026-07-02):** планировалось ~28 уникальных экранов/шитов + 3 системных состояния-компонента. Построено: **64 экранных фрейма в Figma** (63 + новый Source-Highlight) и **49 экранов / 14 флоу в кликабельном прототипе** (добавлены: source-highlight; subscription-management — заведён из Settings → «Manage subscription»; result-error — заведён из scan-processing при partial-fail). **15 фреймов сознательно не заведены в прототип:** 4 AppStore-артефакта + Account, Privacy-Policy, Legal-Disclaimer, Notifications-Settings, Trial-Expired, Vault-Search-Results, Vault-Sort-Filter, Document-History, Force-Update, Maintenance, Rate-Feedback.

---

## 3. Карта переходов

```
                         ┌─────────────── ONBOARDING (один раз, обновлено 2026-07-02) ───────────────┐
   launch ─► ON-1(+value mock) ─► ON-2 ─► ON-3 ─┬─ «Try a sample» ──────────► RS(demo)                │
                                                ├─ «Decode something signed» ► SC-1 …                 │
                                                ├─ «Forward an email» ──────► ON-4                    │
                                                └─ «Skip for now» ──────────► ON-4                    │
   ON-4: Sign in with Apple (primary) · «Continue with email» ─► ON-4a · «Skip — keep on device»(гость)
                                                └──────────────► HM(empty)
   ══════════════════════════ MAIN (TabBar) ═════════════════════════════════════

   [Home/Overview HM]★ ──gear──► ST ─► {ST-sub·priv·notif·help·legal}
      │  ├─ bell ─► [AL Renewal Radar] ─► {AL-d} ─► RS / VA-d
      │  └─ row ──► {VA-d}
      │
   [⊕ Scan] ─► {SC-1} ─► SC-2 ─► SC-3 ─► SC-4 ─► [RS]★
                                          │        ├─► {QA}★ ─► {QA-src} («Report a mismatch» ─► Trust-repair)
                                          │        │     └─► {QA-sign}─►StepChange
                                          │        ├─► {QA-src} (tap «from your document ›» / citation)
                                          │        ├─► {RS-c}
                                          │        ├─► [SW «Saved & watching»] ─► HM / VA / {RD-set}(Adjust reminders)
                                          │        └─► {SC-1} (scan another)
                                          │
   [Vault VA] ─► {VA-d} ─► RS

   Watch-gate / «2 scans left» ─► {PW} ─► (P)Apple IAP
   (P)notification ─► {AL-d}
   share-extension (Mail) ─► {SC-1}
```

Сквозной шов **Scan → Watch** (обновлено 2026-07-02): SC-4→RS→SW (zero-config save) →HM; настройка напоминаний — за тихим «Adjust reminders» на SW → RD-set. Overview (HM) — постоянная точка возврата.

---

## 4. Coverage-check

**Flows → экраны (все flows материализованы):**

| Flow | Экраны | OK |
|---|---|---|
| F1 Onboarding | ON-1…4 + ON-4a (обновлено 2026-07-02) | ✅ |
| F2 Scan & Decode | SC-1…4, RS, RS-c, SW (обновлено 2026-07-02) | ✅ |
| F3 Ask | QA, QA-src, QA-sign | ✅ |
| F5 Overview | HM | ✅ |
| F6 Radar | AL, AL-d, RD-set | ✅ |
| F7 Vault | VA, VA-d | ✅ |
| F8 Upgrade | PW | ✅ |
| F9 Settings | ST, ST-sub/priv/notif/help/legal | ✅ |

**Jobs достижимы:** J1→RS · J2→HM · J3→AL/RD-set · J4→QA · J5→QA(под-ветка) · J6→VA-d. ✅
**Требования pre-mortem:** PM1→HM(дефолт-таб) · PM2→ON-3 · PM3→RS(CreditFileBadge) · PM4→PW/RD-set/AL(Pro-upsell) · PM5→QA-sign · PM6→RS(TrustSourceTag/ConfidenceTag/CalculatedBadge) **+ QA-src(Source-Highlight — tap-to-source построен, ✅ полностью, обновлено 2026-07-02)**. ✅
**Каждый экран имеет вход и выход** (нет orphan/тупиков); empty-states содержат ScanCTA. ✅
**TabBar ≤5 (iOS HIG):** 3 пункта. ✅

**Открытые вопросы — все резолвлены в построенном (обновлено 2026-07-02):**
1. Guest-scan до Sign in — **да**: на ON-4 есть «Skip — keep on device» (гостевой/локальный режим) → ценность до регистрации (критерий найма №1). Старый контракт «Sign in with Apple — единственный auth» отменён: Apple — primary из трёх опций (+ email-auth, + гость).
2. Vault — **отдельный таб**, overview не дублирует: overview = обзор списаний/статусов, vault = архив документов.
3. Alerts — **полноэкранный Renewal Radar**, не sheet: объём контента + Pro-upsell блок («Watching 2 of 6 · Unlock with Pro»).
4. Demo-документ — **захардкоженный sample**: «Try a sample» на ON-3 ведёт сразу на decode-result, без скан-флоу.

---

## 5. Сборка UI-кита (предварительный инвентарь)

Из колонки «Компоненты» — кандидаты в `shared/ui/` (атомы/молекулы) и доменные виджеты (`entities/`). Полный инвентарь и манифест — на фазе UI-кита ([guidelines/architecture.md](../guidelines/architecture.md) §UI-кит). Доменные (знают про `Commitment`/`TrapFlag` → не в `shared/ui/`): `CommitmentRow`, `TrapCard`, `TrapBadge`, `CreditFileBadge`, `AlertCard`, `ResultMock`, `WatchContract`. Базовые (`shared/ui/`): `Button`, `Card`, `Sheet`, `SegmentedToggle`, `Chip`, `SearchBar`, `EmptyState`, `ErrorState`, `PermissionPrimer`, `List/Row`, `Toggle`, `ProgressStages`.
