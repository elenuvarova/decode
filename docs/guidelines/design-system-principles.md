<!-- Source: parallel research workflow across Material 3, Polaris, Carbon, Primer, Apple HIG, Atomic Design + Figma best-practices. Generated 2026-06-26. -->

# Decode Design System — Principles & Upgrade Plan

## PART A — PRINCIPLES

These rules are distilled from seven reference systems (Material Design 3, Shopify Polaris, IBM Carbon, GitHub Primer, Apple HIG/UIKit-SwiftUI, Atomic Design + Figma best-practices, and the cross-system list-item synthesis). Each rule cites the systems that back it.

### A1. Atomic structure & definitions

Use Atomic Design as a **non-linear mental model**, not a rigid five-step pipeline. Frost himself says the stage labels are renameable — "establish naming and categorization most effective for your team." (*Atomic Design ch.2*)

But every mature production system **layers** rather than purely tiers: **Foundations/Elements (rules + tokens) → Styles/Primitives (the theme) → Components → Patterns.** Design *decisions* (color, type, shape, elevation) live in the shared theme layer; components only *consume* them via tokens. (*M3 three-pillar split Foundations/Styles/Components; Carbon Elements vs Components vs Patterns; Polaris Foundations/Tokens/Components/Patterns; Primer Foundations/Primitives/Components/Patterns; Apple Foundations vs role-based Components.*)

Working definitions for Decode:
- **Atom / base component** — a single-responsibility building block (button shape, icon frame, switch, chip, dot). Often **unpublished base components** that higher components nest with overrides, so one edit propagates everywhere. (*Figma "base component" = single source of truth.*)
- **Molecule** — one small unit doing one job (a list row, a chat bubble). When it grows into a distinct, more complex section, promote it to an organism rather than overloading the molecule. (*Atomic Design single-responsibility rule.*)
- **Organism** — a composed, standalone section (TabBar, NavBar, a full card).
- **Pattern** — a multi-component solution to a recurring problem (empty/loading/error scaffolds, a settings list, a chat thread). Documented separately from component reference. (*Primer Patterns; Carbon Patterns; Polaris Patterns.*)

### A2. The RULE: variant/property vs separate component

All seven systems converge on one heuristic, stated almost identically:

> **Keep it ONE component (a variant/property/slot) when the anatomy, semantic role, footprint, and interaction model are the same and only emphasis, visual treatment, state, size, or which optional region is filled changes. Split into a SEPARATE component when the anatomy, the a11y role tree, the data scale, or the job-to-be-done fundamentally changes.**

Backing and worked examples:
- M3: the 5 common buttons are *variants* of one Button (same affordance, differ only in emphasis); FAB / Icon button / Segmented are *separate* (different anatomy + purpose). When behavior shifted enough, M3 *promoted* segmented → Connected button group rather than overloading it. (*M3*)
- Polaris: "changing a prop should never change what the thing fundamentally IS." Button has `variant`+`tone`+`size`; ResourceItem vs ActionListItem are separate (different content model). (*Polaris*)
- Carbon: read-only vs selectable Structured List = one component + `selection` prop; but >25 rows / multi-select / sorting crosses to Data Table — and the docs *say so explicitly*. (*Carbon*)
- Primer: same a11y role + same keyboard model = a prop; different role / overlay / href-navigation / nesting = a new component composed from the same base (NavList, ActionMenu, SelectPanel all derive from ActionList). (*Primer*)
- Apple: trailing accessory / selection / editing = *variants/state* of one row; plain vs grouped vs inset-grouped vs sidebar = separate list *styles*. (*Apple*)
- Figma: combine into a variant set only for "multiple versions of a SIMILAR component sharing the same properties." Avoid-signals: if variants would explode → use slots/base components; if it's a theme/color axis → use variables, not variants. (*Figma best-practices.*)

Practical test for the build: **if swapping the thing keeps the row the same height and the same tappable target, it's a property; if it changes the row's structure or the list's selection model, it's a separate component.** (*cross-system list synthesis.*)

### A3. Slots & composition

Three mechanisms on a rigidity→flexibility spectrum (*Figma "slots vs instance-swap vs variants"*):
1. **Instance-swap** — rigid, exactly one nested instance, position locked. Use for single-element substitution: the icon in a button, the **leading accessory** of a row. Curate via *preferred values*. (*Figma; M3 leadingContent; Primer LeadingVisual; Polaris media.*)
2. **Slot** — flexible free-form area for add/remove/reorder without detaching. Use for cards, sheets, chat bodies, repeating lists.
3. **Base component** — unpublished foundational shape all real components nest with overrides.

Naming convention for composition: **slot names ARE the anatomy vocabulary, and use Leading/Trailing — never left/right (RTL-safe).** (*M3 leadingContent/trailingContent; Primer Leading/TrailingVisual + TrailingAction; cross-system.*)

Trailing accessories split by **interactivity**: a non-interactive **Visual** (icon OR value OR badge) vs an interactive **Action** (a separately-focusable control). Name decorative slots `…Visual`, interactive ones `…Action`. (*Primer's two-name rule.*)

Encode the three row axes correctly (*Figma + cross-system synthesis*):
- **STATE & size** → variant properties.
- **WHICH accessory/content** → instance-swap (leading) or a small variant enum (trailing).
- **Optional regions / second line** → boolean (layer visibility).

This keeps a row at ~4 state variants instead of dozens. Reach for a slot or base component **before** adding another variant.

### A4. Token tiers

Adopt a strict **3-tier pipeline; components reference ONLY semantic tokens, never raw values** (*M3 ref→sys→comp; Figma primitive→semantic→component; Primer base→functional; Polaris primitive→semantic; Carbon palette→semantic; Apple system→semantic — unanimous*):

1. **Primitive / reference** — raw scale values (grayscale ramp, spacing scale, radius, type ramp). No semantics.
2. **Semantic / system** — intent-named roles components consume: `color.text.primary/secondary`, `color.bg.surface`, `color.border`, `color.separator`, `control`, surface/layer hierarchy. **Modes (Wireframe/Light/Dark/density) live on THIS collection** — flip a mode and everything re-themes with zero component edits.
3. **Component (optional)** — last-mile aliases (`listrow.divider`, `button.bg`).

Color-role grammar to standardize on (*M3 + Carbon + Polaris*):
- A fill role + its paired `on-*` text/icon role.
- `-container`/tinted-fill roles (don't put text on them); `-variant` for a lower-emphasis sibling.
- A **numbered surface/layer hierarchy** for nested surfaces (Carbon's layer-01/02/03 + contextual `$layer` solves card-on-card-on-sheet legibility — directly relevant to the Decode prototype's nested sheets).
- State suffixes `-hover/-pressed/-selected/-disabled/-inverse`.

Theming = re-pointing semantic→primitive per mode. **Never multiply variants for color/theme — use variables.** (*Figma explicit avoid-signal.*)

### A5. Component-API / naming conventions

- **`variant`** = visual style; **`tone`** = semantic color intent (reuse ONE tone enum — `critical/success/subdued/base` — across Button/Chip/Badge/Banner); **`size`** = density. Separate "what it looks like" from "what it means." (*Polaris.*)
- Boolean props are **positive adjective flags** (`selected`, `disabled`, `loading`, `showSubtitle`). (*Polaris/Carbon/Primer.*)
- Callbacks `on<Event>`; data-arrays carry `{content/label, onAction, url}` descriptors. (*Polaris/Primer.*)
- A **small, named, reused state set** on every interactive component: `default / pressed / hover / selected / disabled / loading(skeleton)` — identical names everywhere. Carbon ships skeleton as first-class. (*Primer + Carbon.*)
- **Figma slash-naming maps 1:1 to code props**, equal slash counts per set (`Molecules/ListItem/Chevron/Default`). Name values to mirror code (`size=sm/md/lg`, `state=default/pressed/disabled`). Use *Expose nested instances*. (*Figma.*)
- **Accessibility is API, not afterthought:** `aria-label` is a real prop; icon-only controls require a label; selection uses radio/checkbox semantics with arrow/Enter/Space; whole row is the target; **≥44pt tap target**, row height grows with Dynamic Type. (*Apple + Carbon + Primer + M3.*)

### A6. Documentation conventions

Every component gets the **same fixed spine** (*M3 Overview/Guidelines/Specs/Accessibility; Carbon Usage/Style/Code/Accessibility; Polaris purpose/examples/props/best-practices/content/related/a11y; Primer anatomy/examples/do-don't/a11y/props+status*):
1. **Purpose** — one line, what/when.
2. **Anatomy** — a numbered callout diagram with a required/optional legend, each part mapped to its tokens. (*M3's 10-part list item; Primer/Carbon lead with this.*)
3. **Examples / variant matrix** — one example per feature; the state matrix shown as the visible Figma variant grid.
4. **Guidelines** — side-by-side **Do/Don't** pairs; "when NOT to use" with explicit redirects to the right component. (*Carbon ">25 → data table"; Primer "danger items go last".*)
5. **Accessibility** — roles, keyboard, labels, touch target.
6. **Status badge** — Draft/Alpha/Beta/Stable/Deprecated (or Experimental/Ready/Deprecated), with migration path on deprecation. (*Primer lifecycle.*)

In Figma specifically: write a **component Description** (renders as tooltip in Assets + Inspect) with searchable keywords and a doc link, plus an on-canvas doc block per family. Document worst-case/empty/error states, not just the happy path. (*Figma + Frost.*)

### A7. File / page organization

Organize **guidance vs building-blocks**, grouped by **function**, NOT atomic-tier labels for users (*Polaris 12 functional categories; Carbon Foundations/Components/Patterns; Primer; M3*). For a single Figma file (*Figma best-practice*):

**Cover/Docs → Foundations (color/type/spacing/elevation/icons) → Components → Patterns.**

Within Components, give each component **family its own frame** (Figma surfaces same-frame components as "related" and keeps names short). Start as one library; split only when unwieldy. Tokens/themes live in Foundations so components reference only semantic names.

---

## PART B — CONCRETE DECODE BUILD PLAN

> **Статус реализации (2026-07-02):** в lo-fi Figma-ките реализовано подмножество спеки — ListItem: только ось Trailing×6 (Lines/State отложены до build-фазы; в коде State обязателен per A5); Bubble: Sender×2; Patterns-band и Stepper-rail — deferred. Полная спека ниже остаётся target build-фазы.

### B1. `Molecules/ListItem` — exact spec

**One** component replaces the entire row family. Model: **`[Leading swap] — [text block, grows] — [Trailing]`** in a horizontal auto-layout. Rule honored: a row may be text-only but **never leading-only or trailing-only**; leading+text are center-left, trailing center-right. (*eBay/M3 row rule; cross-system "one ListItem" verdict.*)

#### Variant properties (the component set)

| Property | Values | Notes / backing |
|---|---|---|
| **Trailing** | `None`, `Chevron`, `Switch`, `Checkmark`, `Value`, `Badge`, `Action` | Small fixed enum, each needs slightly different internal layout → textbook variant (not slot). Chevron = row navigates; Switch = settings toggle; Checkmark = selection indicator (no own tap target); Value = right-aligned secondary text; Badge = status pill; Action = tappable trailing control (`…`/button). (*Apple accessoryType; M3 trailingContent; Primer TrailingVisual vs TrailingAction.*) |
| **Lines** *(deferred to build, 2026-07-02)* | `1`, `2`, `3` | Sets row min-height (~44 / 60 / 76pt iOS feel) and gates subtitle/overline; height = tallest element. (*M3 one/two/three-line.*) |
| **State** *(deferred to build, 2026-07-02)* | `Default`, `Pressed`, `Selected`, `Disabled` | Reused state set for prototyping taps. Selection *mode* (single/multi) is decided at the List container, not here. (*Primer + Carbon.*) |

> Total ≈ 7 × 3 × 4 = up to 84 cells; in practice author the realistic subset (e.g. not every Trailing needs all 3 Lines). Keep Trailing×State complete for the common Lines=2.

#### Boolean props (layer visibility, wired conditionally)

- `Show subtitle` (shown when Lines ≥ 2)
- `Show overline`
- `Show leading` (or rely on empty swap)
- `Show divider` (inset divider, stops at leading-content edge — iOS native)
- `On` (drives the Switch visual on/off; only meaningful when Trailing=Switch)

#### Text props

- `Title` (primary, ink/near-black)
- `Subtitle` (secondary, mid-gray ≈ secondaryLabel)
- `Overline` (optional, above title)
- `Value` (drives Trailing=Value; mid-gray, right-aligned)
- `Badge` (text/number; drives Trailing=Badge)

#### Slot (instance-swap)

- **`Leading`** — default empty/none; swap in `Icon / Avatar / Image / leading-control (checkbox/radio)`. Curated preferred values. (*M3 leadingContent, Polaris media, Primer LeadingVisual.*)

#### Conditional wiring

Value text layer visible only when `Trailing=Value`; badge pill only when `Trailing=Badge`; Switch only when `Trailing=Switch` (and reads `On`); Checkmark only when `Trailing=Checkmark`; chevron only when `Trailing=Chevron`. Subtitle gated by `Show subtitle` AND `Lines≥2`.

#### Migration mapping — current components → ListItem config

| Current component | Maps to | ListItem config |
|---|---|---|
| **Molecules/ListRow** (icon+Title+Subtitle+Show-subtitle) | ✅ ListItem | Leading=Icon, Lines=1/2, Show subtitle, Trailing=None or Chevron |
| **OptionRow** (Label+Selected) | ✅ ListItem | Lines=1, Trailing=Checkmark, State=Selected when chosen; (or Leading=radio for single-select list) |
| **ToggleRow** (Title+Subtitle+nested Switch) | ✅ ListItem | Lines=2, Trailing=Switch, `On` boolean. The nested Switch atom is reused inside the Trailing variant. |
| **KeyValueRow** | ✅ ListItem | Lines=1, Trailing=Value, `Value` text |
| **CommitmentRow** (icon+Title+Subtitle+Amount+Badge+Show-badge) | ✅ ListItem | Leading=Icon, Lines=2, Trailing=Value (`Amount`) + a Badge. ⚠️ **risk:** needs *both* a value and a badge on the trailing edge — see flag below. |
| **HistoryRow** | ✅ ListItem | Lines=2, Trailing=Value (timestamp/amount) or Badge (status) |
| **StepRow** | ✅ ListItem | Leading=Icon/number, Lines=1/2, Trailing=Checkmark (done) or None. ⚠️ if it carries a connecting progress line, that's structural — see flag. |
| **StageRow** | ⚠️ likely ListItem | Same as StepRow; if it renders a vertical stepper rail between rows, the rail belongs to a **StageList/Stepper pattern**, not the row. |
| **TipRow** | ✅ ListItem | Leading=Icon, Lines=2, Trailing=None; or keep as content if it has a distinct callout background → then it's closer to AlertCard. |
| **FeatureRow** | ✅ ListItem | Leading=Icon, Lines=1/2, Trailing=None/Checkmark |
| **StatTile** | ❌ **stays separate** | Different anatomy/footprint: a **tile/card** (big number + label, vertical, grid-placed), not a horizontal row. Fails the same-height/same-target test. → `Molecules/StatTile` (or Organisms). |
| **SuggestionChip** | ❌ stays separate | It's a Chip, already an atom variant set — not a row. |
| **AlertCard / TrapCard** | ❌ stay separate | Card anatomy (container + emphasis + body), different role. |

**Net:** ListRow, OptionRow, ToggleRow, KeyValueRow, CommitmentRow, HistoryRow, StepRow, FeatureRow, TipRow → **one ListItem**. StageRow → ListItem **+ a Stepper pattern** for the rail. StatTile, SuggestionChip, Alert/TrapCard → separate (correctly).

#### Risky migrations — FLAG

1. **CommitmentRow's value + badge on the same trailing edge.** Current Trailing is a single-choice enum. Options: (a) add a boolean `Show badge` that lets a Badge co-exist with `Trailing=Value` (small layout exception), or (b) compose the badge into the trailing region as an instance. Pick (a) for fidelity; document it as the one trailing exception. **Verify every CommitmentRow instance after migration** — amount alignment is the likely breakage.
2. **StepRow/StageRow progress rail.** A connecting vertical line between rows is **list-level structure**, not row content. Do NOT bake it into ListItem — build a `Patterns/Stepper` (or list container) that draws the rail. Migrating naively will lose or misalign the rail.
3. **OptionRow selection semantics.** Decide single (radio/checkmark) vs multi (checkbox) at the **List container**, per Primer — don't encode mode in the item, or selection behavior will drift.
4. **TipRow vs AlertCard.** If TipRow has a tinted callout background it's a card, not a row — migrating it to ListItem will drop the background. Audit visually before converting.
5. **Auto-layout direction on instances.** Many current rows likely have bespoke padding; after swap, re-check `Show divider` inset and leading inset tokens so dividers stop at the leading edge (iOS native).

### B2. `Molecules/Bubble` — spec

Consolidate ChatBubble + AgentBubble into **one** Bubble (same anatomy — a text container with tail/alignment — differing only by sender; textbook variant case). (*A2 rule.*)

| Property | Values |
|---|---|
| **Sender** (variant) | `User`, `Agent` |
| **State** (variant) | `Default`, `Pending`/`Sending`, `Error` *(optional; for chat states)* |

- **Text prop:** `Message`.
- **Booleans:** `Show timestamp`, `Show avatar` (Agent only), `Tail` (on/off for grouped consecutive bubbles).
- **Slot (optional):** `Body` slot so a bubble can hold a non-text instance (a suggestion-chip row, a mini-card) — reach for slot before adding variants. (*Figma slots.*)
- Sender variant drives alignment (User = trailing/right, Agent = leading/left), fill token (`bubble.user.bg` vs `bubble.agent.bg`), and `on-*` text color via semantic tokens. Avatar shows only for Agent.

### B3. Header components — what to do

Current: NavBar + Screen/Section/Sheet headers (3 separate). Apply A2: these have **different anatomy and role** (a nav bar with back/title/actions vs a section label vs a sheet header with grabber/close), so **keep them as distinct components** — do NOT force one "Header" with a Type variant if their anatomy genuinely differs.

But **standardize** them:
- Group all under one **`Organisms/Headers`** frame (Figma "related").
- Reuse the **same title/subtitle text styles, the same action-slot (instance-swap for trailing buttons), and the same semantic tokens.**
- Each gets a **trailing Action slot** (instance-swap) instead of hardcoded buttons. (*Primer TrailingAction; Polaris action-as-data.*)
- If Screen-header and NavBar turn out to share anatomy (back + title + action), **merge** them into `Organisms/NavBar` with a `variant=Large/Inline`. Decide by inspecting anatomy — this is the one merge worth checking.

### B4. Descriptions to write (one line each)

- **Atoms/Button** — Tappable action. `Style` = emphasis (primary/secondary/tertiary/destructive), `State` = interaction state. Use one per screen for the primary action.
- **Atoms/Chip** — Compact, single-tap filter/selection token; `State` toggles selected.
- **Atoms/Switch** — Binary on/off control for a setting; lives inside a ListItem's Switch trailing.
- **Atoms/Dots** — Step/progress indicator; `Step` sets the active dot.
- **Molecules/ListItem** — The universal list row: Leading slot + text block + Trailing accessory variant (Chevron/Switch/Checkmark/Value/Badge/Action). One row for navigation, settings, selection, detail, and status — configure, don't duplicate.
- **Molecules/Bubble** — Chat message; `Sender` = User/Agent sets alignment, fill, and avatar.
- **Molecules/AlertCard** — Inline contextual message (info/warning) with emphasis container.
- **Molecules/TrapCard** — Decode-specific cautionary callout highlighting a risk/"trap."
- **Molecules/StatTile** — Compact metric tile (big number + label) for grids; not a row.
- **Organisms/TabBar** — Bottom navigation; `Active` marks the current tab.
- **Organisms/NavBar** — Top navigation bar: back + title + trailing action slot.
- **Organisms/Headers (Section/Sheet)** — Screen/section/sheet titling with optional trailing action.
- **Organisms/StateScaffold** — Empty/loading/error pattern wrapper.
- **Icons/** — Monochrome 24pt symbol set; drop into Leading slots and Action slots.

### B5. DS cover / documentation page layout

A dedicated **`📐 Decode DS — Cover & Docs`** page, top of file, sections top-to-bottom:

1. **Cover band** — system name, version, last-updated, owner, a one-line philosophy ("grayscale iOS wireframe DS; consolidate to the max").
2. **How to read this file** — the page order, the Foundations→Components→Patterns layering, the variant-vs-component rule (A2) stated in 2 sentences.
3. **Status legend** — Draft/Alpha/Beta/Stable/Deprecated badges and what each means. (*Primer.*)
4. **Token map** — the 3-tier pipeline diagram (Primitives 24 → Semantic/Theme 29 → component aliases) and the Wireframe/Light modes; how to add Dark. (*M3/Carbon/Figma.*)
5. **Component index** — table: component · status · description · link to its frame.
6. **Changelog / migration notes** — record the row-family consolidation and the CommitmentRow trailing exception, so future editors know.
7. **Contribution rules** — naming (slash 1:1 to code props), "reach for slot/base before a new variant," "components reference semantic tokens only."

### B6. Components-page organization (section bands + order)

One **`🧩 Components`** page, horizontal/vertical **section bands**, each band a labeled frame that **shows the live variant grid** (the state matrix *is* the documentation):

1. **Foundations preview** (optional band) — token swatches, type ramp, spacing scale, icon sheet (or its own Foundations page).
2. **Atoms** — Button (Style×State grid), Chip, Switch, Dots. Each as its own sub-frame showing every variant.
3. **Molecules** — **ListItem first** (full Trailing×Lines×State matrix + an intent→config recipe table: navigation=Leading icon+Chevron; settings=Switch; selection=Checkmark; detail=Value; status=Badge — *don't ship a component per recipe*), then Bubble (User/Agent), AlertCard, TrapCard, StatTile.
4. **Organisms** — NavBar, Headers (Section/Sheet) grouped in one frame, TabBar, StateScaffold.
5. **Patterns** (band or separate page) — Settings list, Chat thread, Stepper (the StageRow rail), Empty/Loading/Error scaffolds — multi-component recipes.
6. **Deprecated** — graveyard band holding the old row components during migration, badged Deprecated with "→ replaced by ListItem", removed once all instances migrate. (*Primer/Polaris deprecation discipline.*)

Order reflects atomic build-up (atoms→molecules→organisms→patterns) for editors, while the per-family frames keep names short and surface related components together. (*Figma + Frost A7.*)

---

**Migration sequence (safe order):** build ListItem + Bubble masters → publish → add component Descriptions → migrate instances family-by-family (start with the simplest: KeyValueRow/ListRow; do CommitmentRow/StageRow last and verify each) → move old masters to the Deprecated band → delete once instance count hits zero → write the Cover/Docs page → reorganize Components page into bands.
