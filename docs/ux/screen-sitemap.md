# Decode — Screen sitemap

**Фаза:** UX architecture · **Дата:** 2026-06-12 · **Платформа:** iPhone, последняя iOS
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
│ (Cockpit) │  (центр, акцент)│  (Документы) │
└──────────┴───────────────┴──────────────┘
```

- **Home (Cockpit)** — дефолтный таб `[PM1]`. Не последний result.
- **⊕ Scan** — центральный акцентный пункт; не экран-назначение, а презентует модально `{Capture sheet}` поверх текущего таба.
- **Vault** — список всех decoded-документов/обязательств.
- **Settings** — НЕ таб; push из шестерёнки в шапке Home (редкий доступ).
- **Alerts** — НЕ таб; bell в шапке Home → `{Alerts inbox}` + push-нотификации (Radar = следствие скана, не отдельная навигация).

**Слои навигации:**
- **Onboarding stack** — pre-auth, показывается один раз, без TabBar (route-группа `(public)` при сборке).
- **Main tabs** — `(app)`-группа с TabBar.
- **Modal pipeline** — Scan→Result→Ask презентуются модально поверх табов (полноэкранные modal + bottom-sheets), чтобы loop не зависел от текущего таба.
- **Detail sheets** — commitment / alert / source как bottom-sheets.

Переходы — нативные (push в стеках, modal-present для pipeline, sheet для деталей). Возврат — свайп-назад/закрытие шита. Без hover-зависимостей.

---

## 2. Инвентаризация экранов

`[F]` полноэкранный · `{S}` bottom-sheet · `(P)` системный диалог · ★ = ключевой для активации

### Группа A · Onboarding (F1, pre-auth)

| ID | Экран | Тип | Из | В | Ключевые компоненты (UI-кит) | Состояния | Job/PM |
|---|---|---|---|---|---|---|---|
| ON-1 | Welcome | [F] | launch | ON-2 / Sign in | Hero, Button, PageDots | default · returning user | актив. |
| ON-2 | Value mock | [F] | ON-1 | ON-3 | ResultMock(card), Button | — | F4-риск |
| ON-3 | Trust & AI consent | [F] | ON-2 | ON-4 | TrustList, ConsentToggle (Anthropic), Button | consent-required | VoC T-3, Apple 5.1.2 |
| ON-4 | Sign in with Apple | [F] | ON-3 | ON-5 | AppleSignInButton | loading · error | — |
| ON-5 | Camera pre-permission | [F] | ON-4 | ON-6 / SC-2 | PermissionPrimer, Button(Upload fallback) | granted · denied→upload | — |
| ON-6 | No-document branch ★ | {S} | ON-5 | SC-1(demo) / SC-1(old letter) | OptionCard ×2 | — | **PM2** |

> Push-permission — НЕ онбординг-экран: системный `(P)` после первого result, на данных свежего документа.

### Группа B · App shell (tabs)

| ID | Экран | Тип | Из | В | Компоненты | Состояния | Job/PM |
|---|---|---|---|---|---|---|---|
| HM | Home / Cockpit ★ | [F] | TabBar · post-save | VA-d · SC-1 · AL | Headline, RangeToggle(7/30/60·mo/yr), SectionList, CommitmentRow, TrapBadge, EmptyState | empty · 1 · many · all-clear | **J2 · PM1** |
| VA | Vault list | [F] | TabBar | VA-d · SC-1 | SearchBar, FilterChips, CommitmentRow, EmptyState | empty · 1 · many | J6 |

### Группа C · Scan & Decode pipeline (F2, modal)

| ID | Экран | Тип | Из | В | Компоненты | Состояния | Job/PM |
|---|---|---|---|---|---|---|---|
| SC-1 | Capture sheet | {S} | ⊕Scan · empty-state · ON-6 | SC-2 / Photos / Files | ActionList(3), RecentPhotosStrip | — | J1 |
| SC-2 | Camera | [F] | SC-1 | SC-3 | Viewfinder, EdgeOverlay, AutoManualToggle, ShutterButton, PageCounter | scanning · multi-page · low-light | J1 |
| SC-3 | Review / confirm | [F] | SC-2 | SC-4 / retake | PagePreview, Retake/AddPage, CropHandles(fallback) | ok · quality-fail(✗/✓) | J1 |
| SC-4 | Processing | [F] | SC-3 | RS | DocThumb+ScanLine, StageProgress(4), ResultSkeleton | streaming · slow · fail | J1 |
| RS | Decode-result ★ | [F] | SC-4 · VA-d | QA · SV · SC-1 | AhaNumber, **CreditFileBadge**, KeyTermList, RiskLabel, TrapCard, TrustSourceTag, ConfidenceTag, CalculatedBadge | success · partial(couldn't read) · error | **J1 · PM3 · PM6** |
| RS-c | Inline correction | {S} | RS (tap «Check this») | RS (recalc) | ZoomDoc, GuidedCorrectField, RecalcToast | — | PM6 |
| SV | Save & Watch | {S} | RS | HM · RD-set | AutoNameField, DateSuggestionList, RadarToggle | — | J3 шов Scan→Watch |

### Группа D · Decide / Ask (F3, sheets)

| ID | Экран | Тип | Из | В | Компоненты | Состояния | Job/PM |
|---|---|---|---|---|---|---|---|
| QA | Q&A sheet ★ | {S} | RS · long-press term | QA-src · QA-sign | DocHeader, SuggestChip ×3, ChatStream, CitationLink, UncertaintyNote | default · streaming · «not specified» | **J4 · J5** |
| QA-src | Source highlight | {S} | QA citation · RS term tap | back | DocViewer+Highlight, PageRef | — | PM6 |
| QA-sign | Debt-distress signpost | {S} | QA (intent-detect) | external (MoneyHelper/StepChange) | SignpostCard, «choice is yours» note | — | **PM5** · FCA |

### Группа E · Watch / Radar (F6)

| ID | Экран | Тип | Из | В | Компоненты | Состояния | Job/PM |
|---|---|---|---|---|---|---|---|
| AL | Alerts inbox | {S} | HM bell | AL-d · RD-set | UpcomingCalendar, ComingLaterList, WatchContract(«4 dates·checked today») | all-clear · upcoming · overdue · no-permission | J3 |
| AL-d | Alert detail | {S} | AL · (P) notification | RS / VA-d | AlertCard([что]+[когда]+[£+дата]+1 CTA), WhyLink+SourceHighlight | renewal · price-rise · overdue(CPA double) | J3 |
| RD-set | Reminder settings | {S} | SV · AL | back | LeadTimePicker(by category), LockedToggle(renewals), OffToggle(tips) | — | PM4(free/paid lead) |

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
| SY-perm | Permission primers | [F]/(P) | ON-5(камера), post-result(push), VA(Face ID) | PermissionPrimer | trust, retention |

**Итого:** ~28 уникальных экранов/шитов + 3 системных состояния-компонента.

---

## 3. Карта переходов

```
                         ┌─────────────── ONBOARDING (один раз) ───────────────┐
   launch ─► ON-1 ─► ON-2 ─► ON-3 ─► ON-4 ─► ON-5 ─┬─► SC-2 …                   │
                                                   └─► ON-6 ─► SC-1(demo/old)   │
                                                                                │
   ══════════════════════════ MAIN (TabBar) ═════════════════════════════════════
                                                                                
   [Home/Cockpit HM]★ ──gear──► ST ─► {ST-sub·priv·notif·help·legal}            
      │  ├─ bell ─► {AL} ─► {AL-d} ─► RS / VA-d                                  
      │  └─ row ──► {VA-d}                                                       
      │                                                                         
   [⊕ Scan] ─► {SC-1} ─► SC-2 ─► SC-3 ─► SC-4 ─► [RS]★                           
                                          │        ├─► {QA}★ ─► {QA-src}         
                                          │        │     └─► {QA-sign}─►StepChange
                                          │        ├─► {RS-c}                    
                                          │        ├─► {SV} ─► {RD-set} ─► HM     
                                          │        └─► {SC-1} (scan another)     
                                          │                                      
   [Vault VA] ─► {VA-d} ─► RS / {SV}                                             
                                                                                
   Watch-gate / «2 scans left» ─► {PW} ─► (P)Apple IAP                           
   (P)notification ─► {AL-d}                                                     
   share-extension (Mail) ─► {SC-1}                                             
```

Сквозной шов **Scan → Watch**: SC-4→RS→SV→RD-set→HM. Cockpit (HM) — постоянная точка возврата.

---

## 4. Coverage-check

**Flows → экраны (все flows материализованы):**

| Flow | Экраны | OK |
|---|---|---|
| F1 Onboarding | ON-1…6 | ✅ |
| F2 Scan & Decode | SC-1…4, RS, RS-c, SV | ✅ |
| F3 Ask | QA, QA-src, QA-sign | ✅ |
| F5 Cockpit | HM | ✅ |
| F6 Radar | AL, AL-d, RD-set | ✅ |
| F7 Vault | VA, VA-d | ✅ |
| F8 Upgrade | PW | ✅ |
| F9 Settings | ST, ST-sub/priv/notif/help/legal | ✅ |

**Jobs достижимы:** J1→RS · J2→HM · J3→AL/RD-set · J4→QA · J5→QA(под-ветка) · J6→VA-d. ✅
**Требования pre-mortem:** PM1→HM(дефолт-таб) · PM2→ON-6 · PM3→RS(CreditFileBadge) · PM4→PW/RD-set · PM5→QA-sign · PM6→RS(TrustSourceTag/ConfidenceTag/CalculatedBadge). ✅
**Каждый экран имеет вход и выход** (нет orphan/тупиков); empty-states содержат ScanCTA. ✅
**TabBar ≤5 (iOS HIG):** 3 пункта. ✅

**Открытые вопросы к поэкранным контрактам:**
1. Guest-scan до Sign in — да/нет? (влияет на порядок ON-4 vs SC-1; ускоряет «ценность до регистрации», но усложняет персистентность). → решить в контракте ON/SC.
2. Vault как таб vs секция Home — сейчас отдельный таб; проверить на wireframes, не дублирует ли cockpit.
3. Alerts — sheet из Home vs полноэкранный; зависит от объёма (мало алертов → sheet достаточно).
4. Demo-документ — захардкоженный sample или реальный скан-флоу на тестовом PDF? → контракт ON-6/SC.

---

## 5. Сборка UI-кита (предварительный инвентарь)

Из колонки «Компоненты» — кандидаты в `shared/ui/` (атомы/молекулы) и доменные виджеты (`entities/`). Полный инвентарь и манифест — на фазе UI-кита ([guidelines/architecture.md](../guidelines/architecture.md) §UI-кит). Доменные (знают про `Commitment`/`TrapFlag` → не в `shared/ui/`): `CommitmentRow`, `TrapCard`, `TrapBadge`, `CreditFileBadge`, `AlertCard`, `ResultMock`, `WatchContract`. Базовые (`shared/ui/`): `Button`, `Card`, `Sheet`, `SegmentedToggle`, `Chip`, `SearchBar`, `EmptyState`, `ErrorState`, `PermissionPrimer`, `List/Row`, `Toggle`, `ProgressStages`.
