# Apple HIG Review — Decode Wireframes

**Target:** Native iOS app (Expo / React Native)  
**Device:** iPhone 17 Pro — 402 × 874 pt, Dynamic Island, iOS 26  
**Design language:** Lo-fi grayscale wireframes; Liquid Glass will apply at implementation phase  
**Scope:** All 60+ screens reviewed from Figma screenshots (2026-06-22)

---

## Checklist

### Layout & Safe Areas
- [x] Dynamic Island top inset (~59 pt) preserved — status bar sits above content
- [ ] **Home indicator bottom inset (34 pt) not explicit in tab bar** — tab bar items must not sit flush at 874 pt
- [x] Screens with full-bleed CTAs (paywall, onboarding) appear to respect bottom spacing
- [ ] **Bottom sheets (scan_capture, vault_sort) — no explicit safe-area bottom inset on the Apply/Cancel button rows**

### Liquid Glass (iOS 26)
- [ ] **Tab bar is a traditional opaque bar** — iOS 26 tab bar floats as a compact glass pill over content; needs redesign at implementation
- [ ] **NavBar / ScreenHeader are opaque** — should use glass material in iOS 26; content scrolls edge-to-edge underneath
- [x] Bottom sheets are presented modally — correct container pattern
- [ ] No dark mode tokens yet — mandatory for glass adaptation (glass tint changes between light/dark)

### Targets, Type & Input
- [ ] **"Stop watching · Delete" (vault_detail)** — inline text links, estimated ~22 pt tall; needs ≥ 44 pt touch area
- [ ] **"Snooze 3 days" (alert_detail)** — text-only secondary CTA, likely < 44 pt
- [ ] **"Skip for now" (onboarding3), "I already have an account" (onboarding1)** — text links near bottom; need ≥ 44 pt
- [ ] **Star rating (rate_feedback)** — 5 stars in a row; each star glyph must have ≥ 44 × 44 pt tap area or adequate inter-star spacing
- [x] Primary CTA buttons appear full-width ≥ 44 pt — OK
- [x] List row items (ListRow, FeatureRow) appear tall enough — OK
- [ ] Dynamic Type not demonstrable in lo-fi; flag for implementation: use text styles, test at large accessibility sizes

### Navigation & Gestures
- [x] Tab bar has 3 destinations (Home, +Scan, Vault) — within HIG 3–5 range
- [x] Back buttons present on all drill-down screens (ScreenHeader + NavBar pattern)
- [x] Sheets use explicit dismiss (Done / Cancel / X) — correct
- [ ] **Sign in with Apple (onboarding4)** — button must follow Apple's exact brand guidelines (specific aspect ratio ≥ 140 × 44 pt, approved styles: black/white/outlined only, no custom color)
- [ ] Swipe-back must work on all NavBar screens — flag for Expo Navigator implementation (gestureEnabled: true)
- [ ] Bottom sheets must support swipe-down-to-dismiss — not visible in wireframe but required

### Motion, Appearance & Accessibility
- [ ] **Dark mode: no token set defined** — required for App Store submission; all semantic tokens need dark values
- [ ] Reduce Motion: no motion demonstrated in lo-fi — flag for animations (scan_processing progress, onboarding transitions)
- [ ] **rate_feedback**: star icons are filled black — color is the only signal for "rated" state; add size change or label
- [x] Destructive confirmation screens exist (delete_confirm, delete_account) — but see Finding #1 below

---

## Findings (prioritized)

| # | HIG principle | Screen(s) | Finding | Fix | Severity |
|---|---|---|---|---|---|
| H1 | Destructive actions | `delete_confirm`, `delete_account` | "Delete document" and "Delete everything" buttons use black/primary fill — identical to normal primary CTAs. HIG: destructive actions must be visually distinct (red tint, `destructive` role). | Change button color to `danger` token (red); implement as `.buttonStyle(.destructive)` in SwiftUI / `<Button color="danger">` in RN | **HIGH** |
| H2 | Dark mode | Design system | No dark mode token collection. App Store requires dark mode support; glass materials also need dark values for correct rendering. | Add a `Dark` mode to the Theme token collection with dark-appropriate semantic values (bg-primary → gray-950, text-primary → white, etc.) | **HIGH** |
| H3 | Safe areas — home indicator | `overview_empty`, all tab bar screens | Tab bar bottom edge likely sits at 874 pt frame edge with no explicit 34 pt home indicator clearance in wireframe. | Add 34 pt bottom inset below tab bar items in Figma frame; in code: `paddingBottom: insets.bottom` via `useSafeAreaInsets()` | **HIGH** |
| M1 | iOS 26 tab bar | `overview_empty`, all tab bar screens | Tab bar is a solid opaque bottom bar. iOS 26: tab bar becomes a compact floating glass pill that auto-minimizes on scroll, revealing more content. | At implementation, use Expo Router tab bar with `tabBarStyle: { position: 'absolute' }` + glass treatment. Annotate in wireframe as "iOS 26 floating tab bar". | **MEDIUM** |
| M2 | Hit targets ≥ 44 pt | `vault_detail`, `alert_detail`, `onboarding1`, `onboarding3`, `rate_feedback` | "Stop watching · Delete", "Snooze 3 days", "I already have an account", "Skip for now" are text-only inline links with estimated touch area ~22–28 pt tall. Star rating stars may be similarly small. | Wrap each in a container with `minHeight: 44`; or use `hitSlop` in RN to extend tap area without affecting visual size. Each star needs ≥ 44 × 44 pt. | **MEDIUM** |
| M3 | Sign in with Apple | `onboarding4` | "Sign in with Apple" is styled as a generic black button. Apple mandates specific button appearance: correct aspect ratio, Apple logo left-aligned, exact text, approved color variants only. | Use `expo-apple-authentication` `AppleAuthenticationButton` component — handles all guideline requirements automatically. No custom styling of this button. | **MEDIUM** |
| M4 | Search bar | `help_faq`, `vault_search` | Custom search field with gray circle leading icon. iOS users expect the system `UISearchBar` appearance and behavior (cancel button, keyboard dismiss on scroll). | Use React Native's `SearchBar` or `TextInput` styled to match iOS system search bar; consider `SearchBarIOS` props in `@react-navigation/native-stack` for the Vault screen. | **MEDIUM** |
| M5 | Swipe-to-delete | `vault_detail` row list, `alerts_inbox` | Vault items and radar alerts likely support deletion, but no swipe-to-delete affordance is shown. iOS users expect swipe-left-to-delete on list items. | Add a `SwipeableRow` / `ReanimatedSwipeable` with a red "Delete" action on list items. Annotate in Figma. | **MEDIUM** |
| L1 | Bottom sheet drag handle | `scan_capture`, `vault_sort` | No drag-handle pill visible on bottom sheets. iOS standard: sheets have a 36 × 4 pt pill centered at the top. | Add `SheetHandle` component (4 pt tall, 36 pt wide, rounded, gray-300) to top of all bottom sheet components. | **LOW** |
| L2 | force_update ≡ maintenance | `force_update`, `maintenance` | Both screens show identical copy ("Back in a moment") and identical icon. These are distinct states: one is a forced app update (no "Open Vault" escape), the other is scheduled maintenance (vault still accessible). | Differentiate: `force_update` → "Update required" copy + "Update now" → App Store link, no "Open Vault"; `maintenance` keeps current "Back in a moment" + "Open Vault". | **LOW** |
| L3 | Reduce Motion | `scan_processing` | Progress step animation (steps lighting up) and scanning animation are core to the experience. Reduce Motion users must not be left with a static/broken-looking screen. | Implement a static "progress bar" fallback when `prefersReducedMotion` is true; steps still advance, just without animation. | **LOW** |
| L4 | VoiceOver — star rating | `rate_feedback` | 5 individual stars as separate touch targets without accessible labels would be announced as "star, star, star…" with no context. | Add `accessibilityLabel="Rate 1 star"` … `"Rate 5 stars"` + `accessibilityRole="button"` to each star; or use a single `accessibilitySlider` wrapper. | **LOW** |
| L5 | Color-only status | `rate_feedback` | "Selected" star state is filled vs. empty — color/fill is the only signal. | On selection, also increase star size (1.1×) and/or add a brief haptic (HIG: use haptics to confirm selection); add accessible label update. | **LOW** |

---

## Summary

| Severity | Count | Items |
|---|---|---|
| HIGH | 3 | H1 destructive buttons, H2 dark mode, H3 tab bar safe area |
| MEDIUM | 5 | M1 iOS 26 tab bar, M2 hit targets, M3 Sign in with Apple, M4 search bar, M5 swipe-to-delete |
| LOW | 5 | L1 sheet drag handle, L2 force_update, L3 reduce motion, L4 VoiceOver stars, L5 color-only |

**Fixable in Figma now:** H1 (button color), H3 (tab bar inset), L1 (drag handle pill), L2 (force_update copy)  
**Fixable at implementation:** H2 (dark mode tokens), M1 (floating tab bar), M2 (hitSlop), M3 (expo-apple-authentication), M4 (system search bar), M5 (swipe-to-delete), L3 (reduce motion), L4–L5 (VoiceOver)
