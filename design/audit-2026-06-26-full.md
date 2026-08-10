# Decode — Full Design Audit (2026-06-26)

Scope: the whole Figma file (file key `ZR4wMSgGSbdckASvpiFwIP`) — 63 screen frames + the component library + DS docs — reviewed from **five viewpoints**: design-system consistency, visual / graphic design + Apple HIG, UX / flows / IA, accessibility, and content/copy + build-readiness. Method: quantified structural pull (type ramp, off-grid spacing, tap targets, tokens) + visual review of 12 representative screens + three specialist passes (design-system-lead, ux-product-designer, accessibility-specialist). Grayscale lo-fi wireframe, iPhone 402×874, UK BNPL audience 18–25.

## Remediation status (updated 2026-06-26, after fix pass)

**✅ Fixed + verified this pass (the systemic / Blocker core):**
- **B1** — broken Ask suggestion chip + the library-wrap `szV=FILL` stretch regression (SuggestionChip 150→32, StepRow 150→54). Verified.
- **B3** — off-grid spacing: **468 values snapped to the 4/8 grid** across 1028 frames (6→8 ×113, 14→16 ×107, 15→16 ×94, 10→12 ×68, 9→8, 5→4, 3→4, 13→12, 18→20, 11→12…). Verified on overview / add-commitment / decode-result / vault-detail — no breaks.
- **B2** — type ramp: **194 text nodes snapped to a 6-step ramp (12 / 15 / 17 / 20 / 26 / 34)**; 20 distinct sizes → 6; sub-12 (10/11) raised to the 12 floor. Verified on result / paywall / settings / vault-detail — hierarchy intact, small text now more legible.
- Earlier this session: InputField clipped-icon, StageRow icons, ListItem/Bubble consolidation.

**✅ Fixed + verified — pass 2 (product/copy + remaining structural):**
- **H9** honest verbs — AlertCard "Move money" → "See what to do"; alert-detail → "Open in Klarna".
- **H6** Scan = distinct centre action — TabBar middle tab is now a dark circular FAB (white camera-viewfinder glyph + "Scan"), across all 3 variants. Verified.
- **H10** Compare decision CTA — added Primary "Save the cheaper one" above the (now Secondary) "Add another to compare"; wired in prototype. Verified.
- **M8** overview differentiator — trap-figure line "3 traps cost you £180/year" bumped 12→17px.
- **H7** onboarding trust hooks — explicit sub-line "No bank login, ever · Every number calculated, not AI" added to slide 1 (body already had "No bank login"; mock already shows the credit-file chip). Verified.
- **M3** radius — 20 mid off-token radii snapped to tokens.

**↩︎ Re-assessed as NOT defects (defensible variation — would be wrong to "unify"):**
- **H3** — decode-result is genuinely 402px with 34px display text; the "different scale" was a render artifact (I exported it at 1× vs others at 2×). No fix.
- **M1** pills — `Atoms/Pill` is used where badge text is static; CommitmentRow uses a raw pill *because its Badge is a component property* (nested Pill text can't be a top-level prop). Justified, not a defect.
- **M2** list-separation + **H2** headers — cards-vs-bare lists and large-title / inline-nav / sheet headers are legitimate iOS context variation. NavBar is already one shared component. Forcing rigid unification would reduce fidelity.

**⏳ Genuinely remaining (bigger product additions, deferred):**
- **H8** Save-&-watch success state — needs a new success frame + prototype wiring (a real addition, not a tweak).
- **M7** promote Compare to the result / vault list (a new entry point).
- **Re-export PNGs + commit** — all the above (incl. the systemic type/spacing snap) changed the rendered frames, so the committed `design/wireframes/figma/*.png` are now stale vs Figma.

**Build / colour phase (intentionally not touched per request):** H4 secondary-gray contrast, M4 icon a11y labels, M5 form validation, M9 reduced-motion/focus, M10 colour-not-alone, dark mode, + the "verify at colour" list.

## Overall verdict

**Strong thinking, mid-level execution — roughly a v0.4 system.** The hard, senior-level parts are done right: a 3-tier token architecture (primitive→semantic→theme, Wireframe/Light modes), a colour-blind-safe-by-construction status system, genuinely good information hierarchy and trust design on the money screens, and a freshly-consolidated ListItem/Bubble component layer. The gap to "professional/shippable" is **enforcement, not architecture**: the screens don't yet consume the tokens (type and most spacing are hardcoded), so the system *looks* slightly inconsistent (20 font sizes, pervasive off-grid spacing, 3 header / 3 pill / 3 divider patterns). A focused mechanical pass — bind type to a 7-step ramp, snap spacing to the 4/8 grid, unify headers/pills/dividers — moves it from "inconsistent" to "shippable." No rework, just enforcement.

## Already strong — keep (cross-lens)

- **Token architecture** — primitive(24) → semantic Theme(29, Wireframe+Light) → spacing(13). Textbook M3/Carbon layering, dark-mode-ready.
- **Colour-blind / grayscale-safe status** — YES/NO, £-values, "2 traps", Overlap/Auto-renew all spelled out in text + icon + weight, never hue alone. Survives grayscale and *strengthens* at colour.
- **Result-screen information hierarchy** (the product's core payoff) — true cost → credit-file → what-you-can-do → key terms → traps → AI summary → debt help. Textbook priority.
- **Trust/transparency engine** — "Calculated, not AI", provenance on every figure ("from your document ›", "p.2 §4 ›"), "Does a number look wrong?" repair, StepChange/MoneyHelper signposting in result + Ask + settings. Exactly right for a debt-anxious cohort.
- **Paywall** — "5 of 5 used" context, yearly-default + "Best value −30%", and an anti-dark-pattern trial explainer ("Today £0 · Day 5 reminder · Day 7 billing").
- **Tap targets** — 0 interactive elements < 44pt.
- **ListItem + Bubble consolidation** — on-grid, single-responsibility, correct variant-vs-component reasoning; 106 rows migrated this session.
- **Documentation discipline** — versioned DESIGN.md, spacing-rhythm guide, 7-system principles doc, per-component descriptions, a DS docs page.

## Quantified facts
- **Type ramp:** 20 distinct font sizes in use (12 ×351, 15 ×240, 17 ×98, 16 ×91, 11 ×83, 14 ×55, 13 ×49, + 18/20/22/24/26/27/28/30/32/34/36/40/10) vs ~9 defined vs 6–8 professional target.
- **Off-grid spacing:** paddings 15 ×146 + 14 ×98 (systemic source), gaps 6 ×149 + 3 ×67 + 10 ×43; ~506 off-grid instances total. Newest component (ListItem) is on-grid; older scaffolds are not.
- **Tap targets:** 0 under 44pt. **Tokens:** sound 3-tier, but type + most spacing not bound. **Colour violations:** 0 (grayscale clean).

---

## Master findings — prioritized (deduped across all lenses)

Severity: **Blocker** (broken / unprofessional now) · **High** · **Med** · **Low**. Lens in brackets.

### Blockers
| # | Finding | Fix | Status |
|---|---|---|---|
| B1 | **Broken Ask suggestion chip** — first "Try asking" chip rendered as a giant gray oval over clipped text (regression from the library wrap stretching `szV=FILL` masters; also stretched StepRow 150px). [UX, a11y] | Set FILL-height masters → HUG; fixed SuggestionChip (150→32) + StepRow (150→54) + Ask instances. | ✅ **Fixed this session** |
| B2 | **Type not bound; 20-size ramp.** [DS, a11y] | Collapse to ~7 named steps and bind to `typography.scale`. Map: 40/36/34→display(34); 32/30/28/27/26→h1(26); 24/22/20→h2(20); 17/16→body(17); 15/14/13→caption(13); 11/10→label(13, floor). No sub-12 text. | Pending |
| B3 | **Off-grid spacing pervasive** (4/8 grid not enforced). [DS] | Snap: padding 15/14→16 (`md`) / 20 (hero); gap 6→8, 3→4, 10→8/12. The 15/14 padding cluster (244 instances, 48% of violations) is the highest-leverage single fix. | Pending |

### High
| # | Finding | Fix | Lens |
|---|---|---|---|
| H1 | Section rhythm violates the 1:3 rule (sections at 14–18, should be 24). Only Overview was piloted. | Between-section gap → 24 (`lg`); within-group → 8 (`sm`), across all 11 other screens. | DS |
| H2 | **3 header patterns + inconsistent back affordance** (bare `‹`, `‹ Home`, `‹ Settings`; large-title vs inline vs sheet). | Keep NavBar/SheetHeader/SectionHeader separate but unify: one title style, one trailing Action slot, one back rule (chevron-only). Consider NavBar `variant=Large/Inline`. | DS, HIG |
| H3 | **decode-result frame authored/exported at a different scale/width** than the 402 standard (smaller chrome/type). | Re-author/normalize the result frame to 402px; re-verify its type maps to the ramp. | DS, visual |
| H4 | **Low tonal contrast** on secondary/placeholder/overline gray text — likely fails 4.5:1. | Darken secondary/overline grays (token fix); flag every gray-on-white pairing to measure at colour phase. | a11y |
| H5 | **Sub-12px text heavy** (12px ×351, 11px ×83, 10px ×1) — below legibility floor. | Body/secondary floor 15px; smallest caption ≥12–13; kill 10/11. (Same fix as B2.) | a11y |
| H6 | **"+ Scan" is a flat tab label** mixing a create-action with two nav destinations; the product's core verb is the weakest of three. | Make Scan a distinct raised/center action (camera glyph), not a flat tab; drop the "+". Activation lever must be unmistakable. | UX, HIG |
| H7 | **Onboarding slide 1 buries the trust hooks** ("Calculated, not AI" + "No bank login" only appear on slide 3). | Surface both as a sub-line/micro-badges on slide 1. | UX |
| H8 | **"Save & watch" has no success confirmation** — jumps straight to Overview; the activation payoff isn't confirmed. | Add a toast/success state ("Saved to Vault · Watching the 28 May payment"), land on Overview with the item present. | UX |
| H9 | **Action verbs over-promise** — "Move money"/"Review" only navigate, never act. Trust gap for a debt audience. | Relabel to the honest action ("See what to do" / "Open in Klarna" only if it deep-links). | UX |
| H10 | **Compare has no decision CTA** + unclear column data source. | Add a primary action on the verdict ("Save Clearpay & watch"); label each column's source. | UX |

### Med
| # | Finding | Fix | Lens |
|---|---|---|---|
| M1 | 3 pill/badge treatments (status dot-pills, solid filter chips, plain pills). | One Pill/Badge atom with a shared `tone` enum + optional leading-dot bool; Chip (filter) stays separate. | DS |
| M2 | 3 list-separation models (cards / hairline dividers / bare rows). | One per context: list rows = inset divider (ListItem `Show divider`); grouped = card+border. | DS |
| M3 | Corner-radius binding unconfirmed across cards/pills/inputs/sheet. | Audit each radius → `rounded.*` token (inputs 8, cards/buttons 12, hero/sheet 16, sheet-top 20, pills full). | DS |
| M4 | Icon-only controls (bell, sort, search, close, compose, Scan) need accessibility labels at build. | Add `accessibilityLabel`/`aria-label` + expose toggle state. | a11y |
| M5 | Add-commitment form: no validation/disabled/required cues; placeholder-only fields (titles exist — confirm association). | Disable "Add to Radar" until Name+Date valid; mark required; native date picker; associate visible titles with inputs. | UX, a11y |
| M6 | "Stop watching · Delete" — two verbs in one tap target (one destructive). | Split into two controls; route Delete via the existing confirm. | UX, a11y |
| M7 | Compare buried one level deep (only in doc detail). | Promote Compare to the result and/or vault list. | UX |
| M8 | Overview demotes the differentiator — leads with "£214 committed" (budgeting) while "traps cost you £180/yr" is a small chip. | Give the traps/overpay figure equal weight on home. | UX |
| M9 | Reduced-motion + focus management unspecified (carousel, sheets, chat autoscroll, async decode). | Spec `prefers-reduced-motion`, focus-into-sheet + trap + Escape, live-region announce on async results. | a11y, build |
| M10 | Status / switch / severity may rely on tone alone once colour lands. | Keep text labels (present); ensure icon/text differentiation at colour phase. | a11y |
| M11 | The "10px gap" (×43) is an ambiguous tier between 8 and 12. | Resolve each to 8 or 12; don't keep 10 as a de-facto tier. | DS |

### Low
- Onboarding pager dots convey position by tone only — expose "Page 1 of 3" (a11y).
- Compare table needs real header/row semantics + reflow at 200% zoom (a11y, build).
- Settings has a large dead vertical gap before HELP (reads as a layout bug) (UX) — partly the off-grid/section-rhythm fix.
- Vault list lacks sort + status pills for triage at scale (UX).
- Naming hygiene: confirm slash-naming 1:1 with code props + Leading/Trailing on retirement of old molecules (DS).

---

## Deliberate, defensible decisions (NOT defects)
- **CommitmentRow / StepRow / StageRow / TipRow kept separate from ListItem.** The principles doc's B1 mapping listed them under ListItem, but the variant-vs-component RULE (A2) supports separation: CommitmentRow has a stacked Amount+Badge trailing, StepRow a numbered-badge leading, TipRow a bullet — genuinely different anatomy. This matches how real systems keep ResourceItem ≠ ActionListItem. Optional to revisit only if a unified row is wanted.

## Recommended remediation sequence
1. **(done)** B1 — Ask chip + stretched masters fixed.
2. **Systemic token-binding pass (B2 + B3 + H1 + H5)** — define the 7-step ramp + 4/8 spacing snap in DESIGN.md, then bind across the file (highest leverage; clears ~5 findings at once). Start with the 15/14-padding and gap 6/3 clusters.
3. **Header + pill + divider unification (H2, M1, M2, M3)** — one pass.
4. **Normalize the result frame to 402 (H3)** + re-export.
5. **UX polish (H6–H10, M5–M8)** — Scan affordance, onboarding trust, save-success, honest verbs, compare CTA, form validation.
6. **Colour phase** — clear the a11y "verify at colour" list (contrast, dark mode, focus).
7. **Build phase** — a11y labels, focus/reduced-motion, table semantics, Dynamic Type.

Counts to re-measure after the fix pass: distinct font sizes (20→≤8), off-grid spacing instances (~506→0), header patterns (3→1 system), pill treatments (3→1).
