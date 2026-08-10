# Decode iOS — Master UX Audit Report

**Date:** 2026-06-23
**Target device:** iPhone 17 Pro, iOS 26
**Target user:** UK consumers 18–25 (segment S1, BNPL-primary)
**Scope:** All lo-fi wireframes across 7 flow sections (50+ screens)

---

## 1. Executive Summary

### Key themes

- **No exits on the critical path.** The scan camera, scan-processing screen, and Ask screen all lack back/cancel/dismiss affordances. A user who enters the core loop on a bad connection or with the wrong document is completely trapped.
- **Destructive actions have zero friction.** "Delete everything" (Consent Center), "Delete" (vault-detail), and × close on scan-review all fire with a single tap and no confirmation. Three separate data-loss paths with no recovery.
- **Legal and App Store compliance gaps.** The onboarding consent toggle defaults ON (GDPR), the Paywall has no "Restore purchases" button (App Store Guideline 3.1.1), and the billing disclosure may fall below the home-indicator safe area (also 3.1.1). These block submission.
- **State coverage is near-zero outside the happy path.** Across all 50+ screens, loading skeletons are universally absent, error recovery paths are sporadically defined, and empty states exist on only a handful of screens. The product looks complete in the happy path and breaks invisibly everywhere else.
- **Navigation graph has orphaned and disconnected screens.** payment-calendar, compare-offers, and the Appearance settings screen have no confirmed entry points in the wireframe set. Several screens (alerts-inbox, overview-wireframe) have tappable elements whose destinations are undefined.

### Top 3 blockers

1. **scan-processing: no cancel and no error recovery** — user is trapped with zero navigation affordance if the network fails or processing hangs (scan-B2).
2. **Paywall: no "Restore purchases" + billing disclosure below safe area** — causes App Store rejection before the product reaches users (settings-B4, settings-B5).
3. **consent-center "Delete everything": no confirmation, no destructive styling** — irreversible data deletion with one accidental tap (settings-B1).

---

## 2. Per-Section Findings

---

### Section A — Onboarding (screens: onboarding-1-welcome, onboarding-2, onboarding-3-nodoc, onboarding-4-register)

**Navigation model is ambiguous.** Screens 1–3 use page-indicator dots suggesting a swipeable carousel, but screen 4 (Register) does not fit that model. The nav model (push stack vs carousel vs hybrid) must be defined before hi-fi because it governs back-button placement, swipe-back gesture behaviour, and transition animations.

**"Continue with Apple" on screen 1 may bypass consent (screens 1–2).** If tapping "Continue with Apple" on the welcome screen triggers auth immediately, the user never sees the consent toggle on screen 2. Sending documents to Claude AI without explicit consent is a GDPR/UK GDPR breach.

**"Skip for now" (screen 3) vs "Skip — keep it on this device" (screen 4) have different semantics** that are not surfaced to the user. The distinction between skipping the no-doc options and skipping registration is invisible.

**"Forward an email" (screen 3) fails silently for non-Mail.app users.** The target demographic (18–25 UK) predominantly uses Gmail or Outlook on iPhone. A `mailto:` link either prompts to configure Mail.app or silently does nothing. No copy-to-clipboard or share-sheet fallback is shown.

**"Continue with email" on screen 4 leads to an unspecified flow.** No wireframe or spec exists for the email auth path. This is a build blocker.

**No error or permission-denied states exist anywhere in onboarding.** Camera permission denial (the most likely failure on first launch), Apple Sign-In failure, and network error have no recovery screens.

---

### Section B — Scan Flow (screens: scan-capture, scan-camera, scan-review, multi-page-scan, scan-processing)

**scan-camera has no back/cancel affordance.** A user who opens the camera accidentally, or whose auto-capture fires on the wrong object, cannot exit without force-quitting. The top-right white circle appears to be ~40 pt — below the 44 pt HIG minimum — and its purpose is ambiguous.

**scan-processing has zero navigation affordances.** No back, no cancel. If the network fails, OCR times out, or processing hangs, the user is completely trapped. There is also no error state defined on this screen despite error-decode-failed being a documented destination.

**multi-page-scan has no per-page delete.** Once a page is captured it cannot be removed. The only recovery is abandoning the entire session.

**scan-review × close discards the captured image without confirmation.** No confirmation sheet is shown before permanently discarding captured media (HIG requirement for destructive actions).

**Auto-capture has no visual feedback on document detection.** The "Auto-capture ON" pill is static. There is no highlight, countdown, or haptic to signal the document has been detected and capture is imminent. Users tap the shutter manually anyway, defeating the feature.

**"Forward an email" in scan-capture offers no confirmation or latency expectation.** The user context-switches to another app with no indication of what happens next.

---

### Section C — Decode Result & Ask (screens: decode-result-wireframe, decode-result-insurance, share-decode, ask, ask-wireframe, qa-signpost, trust-repair)

**"Done" on both result screens dismisses without save confirmation.** Tapping Done discards the result with no warning. The result is the entire value of the product. Auto-save on view, or an intercept confirmation, is required.

**Trust Repair has no post-submission state.** After tapping "Re-check with my correction" there is no loading state, no success confirmation, and no navigation target. The user submits a correction and receives zero feedback.

**Ask screen has no error or unavailable state.** No fallback is shown for network failure, AI unavailability, or rate-limiting.

**Share Decode has no success or failure state for any action.** After "Save as PDF", "Send to someone", or "Save to Files", there is no confirmation. The sheet presumably dismisses but the user has no feedback.

**"Send to someone" in the share sheet is undefined.** Does it open the iOS share sheet? A contacts picker? An in-app recipient field? The behaviour is unspecified.

**Phone numbers in qa-signpost are static text, not tappable `tel:` links.** A user in financial distress must memorise or write down the number. Each service row needs an explicit "Call" or "Copy number" affordance.

**Four competing bottom actions on the result screen reduce focus.** "Ask", "Save & watch", "Does a number look wrong?", and trap chevrons are all present simultaneously with no clear primary action. "Save & watch" should be the single filled primary CTA.

**Renewal urgency date on the insurance result is not visually surfaced.** The auto-renew date "24 Jun" appears in a standard table row with no colour treatment, no countdown, and no urgency signal. Given the audience and that this date is actionable today, this is a significant friction point.

**Citation tap targets in Ask are below 44 pt.** References like "Goes on credit file · p.1 ›" and "p.2 §4 ›" appear as small inline chips inside answer bubbles. They need pill-button rendering at ≥44 pt height.

---

### Section D — Overview & Vault (screens: overview-empty, overview-wireframe, payment-calendar, vault-list, vault-detail, compare-offers)

**vault-detail "Delete" has no confirmation.** "Stop watching · Delete" is a single line of ~22 pt grey text. Both are tap targets well below 44 pt minimum. "Delete" fires with one tap and no confirmation sheet. This is irreversible data loss with zero recovery.

**compare-offers has no entry point defined.** There is no "Compare" button on vault-list or vault-detail. The screen exists in isolation. The entire Compare flow is unreachable.

**payment-calendar has no entry point from the Overview.** overview-wireframe shows date-bucketed amounts (£86/7d, £214/30d) but no clearly labelled tappable element leading to the calendar view. The screen is orphaned.

**The Overview "3 traps cost you £180/year — Tap to see what to do →" row has no destination.** It is explicitly labelled as tappable but its destination is not in the wireframe set.

**"Try a sample first" on overview-empty has no defined destination.** For a high-anxiety first-time user (the core segment), this is the primary exploration path. It must navigate to a pre-loaded read-only vault-detail.

**"Stop watching" has no explanation of what it does.** The label is ambiguous: does it delete? mute? archive? It should explain the consequence inline ("document stays in Vault, removed from Home") or at minimum via a confirmation bottom sheet.

**"Overlap" and "Auto-renew" badges on Overview rows are unexplained jargon.** No tooltip, no popover. The term "Overlap" is particularly opaque for a financially anxious 18–25 user. Each badge should be tappable with a one-sentence explanation.

**No loading skeletons or error states exist on any of the 6 screens.** overview-wireframe and vault-list aggregate all user documents from an async source; at minimum these two screens need defined skeleton and error states.

---

### Section E — Radar & Alerts (screens: alerts-inbox, alert-detail, add-commitment, radar-settings)

**alert-detail has no "mark as handled" action.** The user taps "Move money / open Klarna" and is taken to another app. When they return, the alert in Decode is still unresolved with no way to close the loop. This erodes trust in the Radar.

**add-commitment has no post-save state.** After "Add to Radar" the destination is undefined. The user has no confirmation the save succeeded and may submit duplicates.

**radar-settings has no visible entry point to add-commitment.** The flow spec calls for this path, but there is no "+ Add" button visible on the radar-settings screen. Users who navigate here to add a manual commitment are stranded.

**add-commitment "< Settings" back silently discards the in-progress form.** No discard confirmation is shown. HIG requires an action sheet before navigating away from an unsaved form ("Discard changes?" with destructive confirm + cancel).

**alerts-inbox has no empty state.** A first-time user with no commitments lands on a blank screen with no onboarding prompt or "Add your first commitment" CTA.

**"Coming Later (PRO)" rows show a disclosure chevron but cannot be navigated.** HIG: do not show a navigation affordance for rows that cannot be navigated. Replace the chevron with a lock icon + "Pro" badge.

**"Snooze 3 days" is hardcoded with no custom-date option.** A user whose payment is due in 10 days must snooze twice. No way to snooze to a chosen date.

**radar-settings interactive rows have no tap affordance.** "Remind me · 3 days before", "Reminder horizon · 45 days", and "Quiet hours · 22:00–08:00" look like static labels. Users cannot discover they are editable.

---

### Section F — Settings & Support (screens: settings, paywall, consent-center, help-faq, contact-support, how-it-works, appearance, about, error-purchase-failed, radar-settings)

**consent-center "Delete everything" has no confirmation dialog and no destructive styling.** Irreversible data destruction with one tap. HIG requires a UIAlertController confirmation with a `.destructive` action. The row must also use red/danger styling to signal danger before the tap.

**Turning off "AI document reading" (the required toggle) has no warning dialog.** The user can silently disable the core feature without understanding the consequence.

**contact-support shows no success state after "Send message".** The user taps the CTA and receives zero confirmation that the message was submitted.

**Paywall has no "Restore purchases" button.** App Store Review Guideline 3.1.1 requires a restore button on every paywall screen. Absence causes App Store rejection.

**Paywall billing disclosure ("Then £41.99/year…") appears at or below the home-indicator safe area.** This disclosure must be visible above the 34 pt safe area clearance. Failure to show it violates Guideline 3.1.1 and will cause rejection.

**Appearance screen is missing from the Settings row list.** The Appearance screen exists in the wireframe set but has no entry row in Settings — it is unreachable.

**settings "Delete everything" row uses standard chevron styling with no destructive colour.** A user who is about to destroy all their data sees no visual danger signal.

**help-faq FAQ item destinations are not defined.** Tapping a FAQ row has no shown outcome.

**Paywall plan selector has no visible selection state.** The Yearly/Monthly toggle has no radio button, checkmark, or fill indicator. It is ambiguous which plan is active.

---

### Section G — Errors & Empty States (screens: error-offline, error-decode-failed, error-limit-reached, error-camera-denied, error-purchase-failed, empty-no-results, result-error)

**error-camera-denied has no auto-recheck on app resume.** After "Open Settings" the user toggles camera permission and returns. If the app does not call `AVCaptureDevice.authorizationStatus` on `sceneDidBecomeActive`, the error screen persists on a valid permission state. The user sees a stale error and has no way to proceed.

**result-error has no escalation after repeated scan failure.** After a second or third failed retake the screen offers no "Send to support", "Enter details manually", or document-format-change escape. The user loops indefinitely.

**error-decode-failed "Send to support" destination is undefined.** If the action fails silently or opens a broken `mailto:`, the user has no recovery path and no confirmation state.

**empty-no-results copy says "scan something new" but provides no CTA for it.** The text suggestion is not backed by a button. The user must navigate manually via the tab bar.

**result-error does not reassure the user that no decode credit was consumed.** error-decode-failed explicitly says "You haven't used a decode." The same reassurance is absent here, causing anxiety in free-tier users who know their quota.

**No loading/spinner state is shown after "Try again" on error-offline or error-decode-failed.** The button appears unresponsive; users tap it multiple times and trigger duplicate requests.

**All 7 error and empty screens use identical grey circle icon placeholders.** No semantic differentiation between offline, permission-denied, scan-failed, and no-results. In hi-fi each state needs a distinct contextual icon.

---

## 3. Master Findings Table

Sorted by severity: BLOCKER → FRICTION → POLISH.

| # | Section | Screen | Finding | Fix | Severity |
|---|---|---|---|---|---|
| 1 | Scan | scan-processing | No cancel button, no error recovery, no timeout — user is completely trapped | Add Cancel text button; define error state; add 30 s client timeout | BLOCKER |
| 2 | Settings | paywall | No "Restore purchases" button — App Store Guideline 3.1.1 violation | Add "Restore purchases" text link below CTA | BLOCKER |
| 3 | Settings | paywall | Billing disclosure ("Then £41.99/year") may be below 34 pt home-indicator safe area | Move disclosure above home indicator; enforce safe area padding | BLOCKER |
| 4 | Settings | consent-center | "Delete everything" has no confirmation dialog and no destructive styling | UIAlertController with `.destructive` action; red row label | BLOCKER |
| 5 | Settings | consent-center | Turning off required "AI document reading" toggle has no warning dialog | Intercept toggle-off with a confirmation bottom sheet | BLOCKER |
| 6 | Settings | contact-support | No success state after "Send message" | Show success screen or toast; define error state for send failure | BLOCKER |
| 7 | Settings | settings | "Delete everything" row uses standard chevron style — no destructive colour | Apply `.destructive` / red label styling | BLOCKER |
| 8 | Settings | settings | Appearance row missing from Settings — screen is orphaned/unreachable | Add "Appearance" row in Settings list | BLOCKER |
| 9 | Settings | radar-settings | "Remind me", "Reminder horizon", "Quiet hours" rows have no tap affordance | Add trailing chevron or inline stepper/control to each row | BLOCKER |
| 10 | Settings | help-faq | FAQ item destination not defined — tapping a row has no shown outcome | Wireframe FAQ detail (accordion expansion or push screen) | BLOCKER |
| 11 | Onboarding | onboarding-2 | No back button on pushed view — HIG violation; user is trapped | Add back chevron in navigation bar | BLOCKER |
| 12 | Onboarding | onboarding-3 | No back button on pushed view | Add back chevron in navigation bar | BLOCKER |
| 13 | Onboarding | onboarding-4 | No back button on pushed view | Add back chevron in navigation bar | BLOCKER |
| 14 | Onboarding | onboarding-1, onboarding-2 | "Continue with Apple" on screen 1 may bypass consent on screen 2 — GDPR risk | Enforce screen 2 consent before any auth or document processing | BLOCKER |
| 15 | Onboarding | onboarding-4 | "Continue with email" leads to unspecified flow — no wireframe exists | Design and wireframe the email auth path | BLOCKER |
| 16 | Scan | scan-camera | No back/cancel affordance on full-screen modal | Add × or chevron-back top-left, min 44×44 pt | BLOCKER |
| 17 | Scan | multi-page-scan | No per-page delete — wrong page cannot be removed without aborting entire session | Add swipe-to-delete or long-press → "Remove page" per thumbnail | BLOCKER |
| 18 | Scan | scan-review | × close discards captured image with no confirmation | Confirmation sheet: "Discard this scan?" with destructive + cancel | BLOCKER |
| 19 | Result/Ask | decode-result-wireframe, decode-result-insurance | "Done" dismisses without save confirmation — result is lost | Auto-save on view with persistent indicator, or intercept Done with save prompt | BLOCKER |
| 20 | Result/Ask | trust-repair | No post-submission state after "Re-check" — zero feedback | Loading overlay → success state returning to updated Decode Result | BLOCKER |
| 21 | Result/Ask | ask, ask-wireframe | No error/unavailable state for network failure or AI unavailability | Inline error message ("Couldn't connect") with retry chip | BLOCKER |
| 22 | Result/Ask | share-decode | No success or failure state for any share action | Success toast per action; error state for storage-full / permission-denied | BLOCKER |
| 23 | Overview/Vault | vault-detail | "Delete" fires with one tap, no confirmation, no destructive styling | Separate "Stop watching" (outlined) and "Delete" (red, danger token); add action sheet confirmation | BLOCKER |
| 24 | Overview/Vault | compare-offers | No entry point to Compare screen exists anywhere in the flow | Add multi-select mode to vault-list or "Compare" CTA on vault-detail | BLOCKER |
| 25 | Overview/Vault | payment-calendar | No entry point from Overview — screen is orphaned | Make 7d/30d/60d strip tappable with chevron, or add "Coming up" row | BLOCKER |
| 26 | Overview/Vault | overview-wireframe | "Tap to see what to do →" insight row has no destination | Define destination (trap bottom sheet or filtered vault-list) | BLOCKER |
| 27 | Radar/Alerts | alert-detail | No "mark as handled" action — alert persists after user acts externally | Add "Mark as done" primary CTA; show resolved state | BLOCKER |
| 28 | Radar/Alerts | add-commitment | No post-save state after "Add to Radar" | Navigate to radar-settings or alerts-inbox with success toast | BLOCKER |
| 29 | Radar/Alerts | radar-settings | No entry point to add-commitment visible on this screen | Add "+ Add commitment" button or row | BLOCKER |
| 30 | Radar/Alerts | add-commitment | "< Settings" back silently discards in-progress form | Discard confirmation action sheet on unsaved back-navigation | BLOCKER |
| 31 | Errors | error-camera-denied | No auto-recheck permission on app resume after "Open Settings" | Call `AVCaptureDevice.authorizationStatus` on `sceneDidBecomeActive` | BLOCKER |
| 32 | Errors | result-error | No escalation path after repeated scan failure | Add "Send to support" and/or "Enter manually" after second failure | BLOCKER |
| 33 | Errors | error-decode-failed | "Send to support" destination is undefined | Define destination (in-app ticket or confirmed mailto); add confirmation state | BLOCKER |
| 34 | Onboarding | onboarding-2 | UISwitch used for legal consent — non-standard, potentially invalid UK consent pattern | Replace with explicit "I Agree" button or checkbox + button pattern | FRICTION |
| 35 | Onboarding | onboarding-3 | "Forward an email" fails silently for non-Mail.app users | Add share-sheet fallback and "Copy address" affordance | FRICTION |
| 36 | Onboarding | onboarding-3 | Three equal-weight options, no primary emphasis — high cognitive load | Make "Try a sample" visually primary (filled card or button) | FRICTION |
| 37 | Onboarding | onboarding-1, onboarding-3 | Page-control dots not tappable/accessible — VoiceOver cannot navigate slides | Make dots tappable or add explicit Next/Back button | FRICTION |
| 38 | Onboarding | all onboarding screens | No loading/transition feedback on any CTA — causes double-tap | Add skeleton or spinner between tap and next screen | FRICTION |
| 39 | Scan | scan-camera | Auto-capture has no visual feedback on document detection | Green frame highlight + 3-2-1 countdown or haptic when document is in frame | FRICTION |
| 40 | Scan | scan-camera | "Upload from Photos" tap target is a small label below a thumbnail | Use clearly labelled button with min 44 pt height | FRICTION |
| 41 | Scan | scan-capture | "Forward an email" offers no confirmation, latency expectation, or return path | Add sub-label ("Usually under 1 minute") and post-tap confirmation | FRICTION |
| 42 | Scan | multi-page-scan | Drag-to-reorder is non-obvious without handle icons | Add ≡ reorder handle per thumbnail | FRICTION |
| 43 | Scan | scan-review | Warning banner shows equal-weight CTAs — should steer toward better outcome | Make "Retake" primary (filled) when quality warning is active; "Use anyway" as text link | FRICTION |
| 44 | Scan | multi-page-scan | "Add page" destination is undefined — camera or capture sheet? | Wire destination explicitly; direct to camera if in physical-document context | FRICTION |
| 45 | Result/Ask | ask, ask-wireframe | No typing/loading indicator while answer generates | Three-dot typing indicator in assistant bubble immediately on question submit | FRICTION |
| 46 | Result/Ask | ask, ask-wireframe | Empty-state on first open not defined — what does fresh Ask look like? | Define first-open empty state with 3–4 chips and one-line prompt | FRICTION |
| 47 | Result/Ask | qa-signpost | Phone numbers are static text, not tappable `tel:` links | Each row: "Call" CTA; "Copy number" secondary action | FRICTION |
| 48 | Result/Ask | decode-result-insurance | Renewal urgency date not visually surfaced | Amber/red label if within 7 days; add "Shop around before [date]" nudge card | FRICTION |
| 49 | Result/Ask | share-decode | "Send to someone" is undefined | Label as "Share via…" (native iOS share sheet) or define behaviour explicitly | FRICTION |
| 50 | Result/Ask | decode-result-wireframe | Four competing bottom actions without visual priority | "Save & watch" = filled primary; "Ask" = outlined secondary; "number wrong?" = inline text link | FRICTION |
| 51 | Result/Ask | trust-repair | Input field missing visible persistent label — VoiceOver/accessibility failure | Add label "Your corrected value" above the field; retain placeholder as hint | FRICTION |
| 52 | Overview/Vault | overview-empty | "Try a sample first" destination undefined | Navigate to pre-loaded read-only vault-detail showing sample Klarna BNPL decode | FRICTION |
| 53 | Overview/Vault | vault-detail | "Stop watching" label is ambiguous | Rename to "Remove from Home" with one-line subtitle explaining the consequence | FRICTION |
| 54 | Overview/Vault | compare-offers | No post-verdict action — VERDICT is a dead-end | Add "Open [winning offer]" primary and "Dismiss [losing offer]" secondary CTAs | FRICTION |
| 55 | Overview/Vault | vault-list | No empty state for Vault tab (first-use) | Add vault-specific empty state with "Scan your first document" CTA | FRICTION |
| 56 | Overview/Vault | vault-list | No empty-results state for filtered chips | Inline empty-no-results with message "No [filter] documents yet" + "Scan one" shortcut | FRICTION |
| 57 | Overview/Vault | overview-wireframe | "Overlap" and "Auto-renew" badges are unexplained jargon | Make each badge tappable with a one-sentence popover explanation | FRICTION |
| 58 | Overview/Vault | payment-calendar | Nudge bubble has no action — informational dead-end | Add "Set reminder" or "Share" action; or "Got it" dismiss | FRICTION |
| 59 | Overview/Vault | vault-detail | "from your document ›" provenance links have no destination | Define destination (bottom sheet with highlighted document excerpt) | FRICTION |
| 60 | Radar/Alerts | alerts-inbox | No empty state for first-time user with no commitments | Add empty state with "Add your first commitment" CTA | FRICTION |
| 61 | Radar/Alerts | alerts-inbox | "Coming Later (PRO)" rows show disclosure chevron but cannot be navigated | Replace chevron with lock icon + "Pro" badge | FRICTION |
| 62 | Radar/Alerts | alert-detail | "Snooze 3 days" is hardcoded — no custom-date option | Add date picker or at minimum "3 days / 7 days / custom" options | FRICTION |
| 63 | Radar/Alerts | radar-settings | No delete/remove action for watched commitments | Add swipe-to-delete or edit mode with remove action | FRICTION |
| 64 | Radar/Alerts | add-commitment | £0.00 placeholder indistinguishable from a filled value | Use "£" with empty value or greyed "e.g. £29.99" | FRICTION |
| 65 | Radar/Alerts | radar-settings | Greyed Pro items have no confirmation they route to Paywall on tap | Confirm tap → Paywall navigation; annotate in wireframe | FRICTION |
| 66 | Settings | paywall | Yearly/Monthly plan selector has no visible selection state | Add checkmark or filled-border indicator on selected plan | FRICTION |
| 67 | Settings | paywall | No "Continue free" / "Maybe later" escape on paywall for zero-decode users | Add neutral "Not now" below CTA; ensure user can always reach Vault offline | FRICTION |
| 68 | Settings | consent-center | "Export my data" destination not defined | Wire to export flow or define behaviour (email, Files, share sheet) | FRICTION |
| 69 | Settings | help-faq | FAQ search has no empty/zero-results state | Add inline empty-no-results with "Email us" fallback | FRICTION |
| 70 | Settings | help-faq | External links (MoneyHelper, StepChange) carry internal-nav chevron | Use external-link icon (arrow.up.right.square) to signal leaving the app | FRICTION |
| 71 | Settings | contact-support | Subject field uses search-bar visual style instead of text input | Use standard UITextField / RN TextInput styling | FRICTION |
| 72 | Settings | contact-support | No discard-draft confirmation on back navigation with unsaved text | Action sheet: "Discard message?" with destructive confirm + cancel | FRICTION |
| 73 | Settings | radar-settings | Master toggle OFF state not shown — dependent controls presumably stay active | Wireframe Radar-OFF state with dependent rows visually disabled/greyed | FRICTION |
| 74 | Settings | radar-settings | Quiet hours editing path is undefined | Define edit UI (time picker sheet or inline pickers) and wire it | FRICTION |
| 75 | Settings | appearance | Text size slider likely maps to a custom scale — may diverge from iOS Dynamic Type | Map to iOS system Dynamic Type size categories | FRICTION |
| 76 | Errors | error-purchase-failed | No direct "Manage Payment" deeplink — body copy mentions it but no button | Add third CTA: "Manage payment method" → `itms-apps://` deeplink | FRICTION |
| 77 | Errors | empty-no-results | Copy says "scan something new" but no button for it | Add secondary "Scan a document" CTA | FRICTION |
| 78 | Errors | error-offline, error-decode-failed | No spinner/feedback after "Try again" tap — button appears unresponsive | Disable button + show loading indicator after tap | FRICTION |
| 79 | Errors | error-limit-reached | "Maybe next month" label implies waiting is the only option | Rename to "Not now" (consistent with error-purchase-failed) | FRICTION |
| 80 | Errors | empty-no-results | First-use Vault empty state not designed (different from search-no-results) | Create separate Vault empty-state screen with onboarding CTA | FRICTION |
| 81 | Errors | result-error | Missing decode-credit reassurance | Add "You haven't used a decode" line below the instructional card | FRICTION |
| 82 | Onboarding | onboarding-1 | Hero card has no "Sample result" caption | Add small caption label under the preview card | POLISH |
| 83 | Onboarding | onboarding-2 | Consent screen lacks a tappable link on "Anthropic's Claude AI" | Add tappable link to Anthropic privacy policy | POLISH |
| 84 | Onboarding | onboarding-4 | Benefit bullet icons are solid dark circles (placeholders) | Replace with semantic SF Symbols (arrow.triangle.2.circlepath, externaldrive, faceid) | POLISH |
| 85 | Scan | scan-capture | "RECENT" section empty state has no label | Add "Your recent scans will appear here" in the empty state | POLISH |
| 86 | Scan | scan-camera | No flash/torch toggle | Add torch icon to camera UI (standard iOS camera pattern) | POLISH |
| 87 | Scan | scan-review | No pinch-to-zoom on captured image | Support pinch-to-zoom so users can inspect quality before deciding | POLISH |
| 88 | Scan | scan-processing | Progress steps should show elapsed time or "Usually under 10 seconds" hint | Add time hint below the step list | POLISH |
| 89 | Scan | scan-processing | Skeleton result card must match actual decode-result layout | Keep both in sync; update when result layout changes | POLISH |
| 90 | Result/Ask | qa-signpost | Service logos are blank placeholder squares | Use real logos (StepChange, National Debtline, MoneyHelper) | POLISH |
| 91 | Result/Ask | ask, ask-wireframe | "Try asking" chips behaviour after first use not specified | Define whether chips update contextually after each answer | POLISH |
| 92 | Result/Ask | trust-repair | "Calculated, not AI" provenance label has low visual weight | Match visual weight to "AI summary" badge on result screen | POLISH |
| 93 | Result/Ask | share-decode | Privacy notice below action list — most users will tap before reading | Move privacy notice above the action rows | POLISH |
| 94 | Result/Ask | decode-result-wireframe | "Calculated, not AI" vs "AI summary" labelling is visually inconsistent | Standardise provenance badges across the result screen | POLISH |
| 95 | Overview/Vault | overview-wireframe | "3 traps" insight row uses "→" in-text instead of trailing "›" chevron | Replace with trailing DS chevron to match all other tappable rows | POLISH |
| 96 | Overview/Vault | payment-calendar | Boiler cover row mixes renewal semantics into a payment-due list | Separate into a distinct "RENEWING SOON" section or add a "renewal" tag | POLISH |
| 97 | Overview/Vault | compare-offers | Table cells for missing data are undefined | Show "—" or "N/A" in cells where data was not extractable | POLISH |
| 98 | Overview/Vault | overview-wireframe, vault-list | Avatar circle top-right has no labelled destination | Ensure it links to Settings; add gear overlay or annotation | POLISH |
| 99 | Overview/Vault | vault-detail | "Calculated, not AI" and "from your document" labels lack a legend | Add one-time tooltip or "How we calculate this" bottom-sheet link | POLISH |
| 100 | Overview/Vault | compare-offers | "Add another to compare" disabled state undefined when no more docs exist | Disable or relabel when all documents are already in the comparison | POLISH |
| 101 | Radar/Alerts | alerts-inbox | Two different CTA labels ("Move money" vs "Review") with no pattern rationale | Define a consistent verb pattern for alert CTAs | POLISH |
| 102 | Radar/Alerts | alert-detail | "WHY IT MATTERS" all-caps label reads as overly formal | Rename to "What this means" or add a warning icon | POLISH |
| 103 | Radar/Alerts | radar-settings | "(PRO UNLOCKS ALL)" in section header is a marketing message | Move to a dedicated upsell inline row below the list | POLISH |
| 104 | Radar/Alerts | add-commitment | "Repeats" field shows no picker affordance | Add dropdown chevron or picker-style control | POLISH |
| 105 | Settings | error-purchase-failed | X and "Not now" are redundant dismiss affordances | Consolidate to one (keep "Not now") | POLISH |
| 106 | Settings | error-purchase-failed | Grey circle placeholder illustration needs meaningful art | Design a contextual illustration for payment failure | POLISH |
| 107 | Settings | how-it-works | No forward CTA at end of informational screen | Add "Start scanning" nudge for new users landing here | POLISH |
| 108 | Settings | about | Legal document destinations (Terms, Privacy, Licences, Complaints) not wireframed | Plan web-view or in-app PDF viewer for each; annotate in wireframe | POLISH |
| 109 | Settings | appearance | No "Reset to defaults" option for theme + text size | Add reset affordance | POLISH |
| 110 | Settings | contact-support | No character counter on Message textarea | Add character limit counter | POLISH |
| 111 | Errors | all error/empty screens | Identical grey circle icon across all states | Each state needs a distinct contextual SF Symbol icon | POLISH |
| 112 | Errors | error-limit-reached | "Renewal Radar" used in upsell without prior context | Replace with plain description or add inline tooltip | POLISH |
| 113 | Errors | result-error | "FOR A CLEAN SCAN" instructional card not in DS | Define as reusable `InlineGuide` component | POLISH |

---

## 4. Friction Scorecard Per Major Flow

Scale: 1 (nearly frictionless) to 10 (severely broken). Score reflects the worst-case on the happy path and the probability a real user hits a blocker.

---

### Flow 1 — First Decode (onboarding → scan → result → save)

| Step | Tap count (happy path) | Friction issues | Blockers hit |
|---|---|---|---|
| Welcome → consent | 1 tap + toggle | Consent default ambiguous; no back button | B: consent bypass, no back |
| Consent → camera | 2 taps | No permission-denied recovery | B: camera permission |
| Camera → capture | 0 (auto) or 1 (manual) | No document-detected feedback; no cancel | B: no exit from camera |
| Capture → processing | 1 tap | No spinner on transition | — |
| Processing → result | 0 (auto) | If network fails: trapped | B: no cancel on processing |
| Result → save | 1 tap | "Done" discards without save confirmation | B: Done = data loss |

**Score: 3/10.** Two hard blockers (camera no-exit, processing trap) and two data-loss risks (consent bypass, Done dismiss) mean a significant proportion of first-time users will not complete the flow.

---

### Flow 2 — Returning User Scan

| Step | Tap count | Friction issues | Blockers hit |
|---|---|---|---|
| Overview → scan sheet | 1 tap | — | — |
| Scan sheet → camera | 1 tap | No torch; auto-capture feedback missing | — |
| Camera → review | 0 or 1 | No back button | B: no exit from camera |
| Review → processing | 1 tap | No discard confirmation on × | B: discard without confirm |
| Processing → result | 0 | If network fails: trapped | B: processing trap |
| Result → save | 1 tap | No save confirmation | B: Done = data loss |

**Score: 5/10.** Happy path is lean (4–5 taps total). But the same structural blockers as Flow 1 persist; experienced users just encounter them later.

---

### Flow 3 — Ask a Question

| Step | Tap count | Friction issues | Blockers hit |
|---|---|---|---|
| Result → Ask | 1 tap | — | — |
| Ask opens | 0 | First-open empty state undefined | F: empty state |
| Tap chip / type question | 1 tap / keyboard | No typing indicator | F: no loading feedback |
| Answer appears | 0 | Citation tap targets below 44 pt | F: hit targets |
| Ask follow-up | 1 tap | — | — |
| Distress trigger → QA Signpost | 0 (auto) | Phone numbers not tappable | F: tel: links |
| Exit Ask | 1 tap | Non-standard dismiss (no back chevron) | — |

**Score: 7/10.** No blockers on the happy path. The main friction is the missing loading state (causes double-taps) and the citation hit targets. The non-standard dismiss (floating circle vs back chevron) is a HIG issue but not a trap.

---

### Flow 4 — Vault Browse

| Step | Tap count | Friction issues | Blockers hit |
|---|---|---|---|
| Vault tab | 1 tap | No empty state for first-time user | F: empty state |
| Filter chips | 1 tap | No empty-results state for filter | F: filter empty |
| Tap document row | 1 tap | — | — |
| vault-detail | 0 | "from your document" links have no destination | F: dead links |
| Delete | 1 tap | One-tap delete, no confirmation, wrong styling | B: delete no confirm |
| Compare | N/A | No entry point | B: orphaned screen |

**Score: 4/10.** The vault browse happy path is clean for existing documents, but the Delete blocker and the orphaned Compare screen are serious gaps. The vault has no empty state for a first-time user.

---

### Flow 5 — Settings / Account

| Step | Tap count | Friction issues | Blockers hit |
|---|---|---|---|
| Settings root | 0 | Appearance row missing; Delete row no danger styling | B: orphaned screen, B: no danger |
| Consent Center | 1 tap | AI toggle has no guard | B: silent feature break |
| Delete everything | 1 tap | One tap destroys all data | B: no confirmation |
| Paywall | 1 tap | No Restore button; billing may be clipped; plan selector unclear | B: App Store rejection ×2 |
| Contact Support | 1 tap | No success state after Send | B: no confirmation |
| radar-settings | 1 tap | No tap affordance on 3 rows; no add entry point | B: undiscoverable settings |

**Score: 2/10.** Settings has the highest blocker concentration of any flow: two App Store rejection risks, a silent data-destruction path, and multiple orphaned or non-functional screens.

---

## 5. Quick Wins (top 5 fixes under 1 hour in Figma)

These are purely Figma changes with no flow/logic implications.

| # | Fix | Screen(s) | Why now |
|---|---|---|---|
| QW1 | Add back chevron to onboarding-2, onboarding-3, onboarding-4 | onboarding-2, onboarding-3, onboarding-4 | Fixes 3 HIG violations in 3 identical nav-bar edits. NavBar component already exists — swap to the "with back" variant. |
| QW2 | Apply destructive/red styling to every "Delete" action | vault-detail ("Delete" text), consent-center ("Delete everything" row), settings ("Delete everything" row) | Existing `danger` colour token is in the DS. Change text colour of these labels to `danger`. Zero design system changes needed. |
| QW3 | Add "Restore purchases" text link below "Start 7-day free trial" CTA on Paywall | paywall | One text element added below the existing CTA button. Fixes an App Store rejection blocker in under 5 minutes. |
| QW4 | Add × close button to scan-camera top-left | scan-camera | Drag the existing `Icons/xmark.circle.fill` DS component to the scan-camera nav area, top-left, 44×44 pt. Fixes the camera-trap blocker. |
| QW5 | Set onboarding-2 consent toggle to default OFF and disable "Continue" button | onboarding-2 | Toggle component already has an OFF variant. Swap the instance. The "Continue" button already has a Disabled state — set State=Disabled. Fixes the GDPR default-on issue. |

---

## 6. Deferred to Implementation

These findings cannot be fixed in Figma and must be addressed in code.

| # | Finding | Screen(s) | Notes |
|---|---|---|---|
| I1 | Auto-recheck camera permission on `sceneDidBecomeActive` | error-camera-denied | Call `AVCaptureDevice.authorizationStatus` when the app returns to foreground; re-navigate automatically if now granted. |
| I2 | 44 pt minimum tap targets via `hitSlop` | All screens with ghost text CTAs (error-*, share-decode, vault-detail) | Visual size of secondary text links can remain small; add `hitSlop={{ top: 10, bottom: 10, left: 16, right: 16 }}` (React Native) to each. |
| I3 | `tel:` links for phone numbers in qa-signpost and radar-settings | qa-signpost, contact-support footer | `Linking.openURL('tel:08001381111')` wrapped in a Pressable with accessible label. |
| I4 | Keyboard-aware layout for contact-support Send button | contact-support | `KeyboardAvoidingView` or `useKeyboardHeight` hook to ensure "Send message" button stays above keyboard on all devices. |
| I5 | Loading skeletons for async screens | overview-wireframe, vault-list, vault-detail, alerts-inbox, radar-settings | All five screens aggregate async document data. Implement shimmer skeleton using the StateScaffold DS component or a library like `react-native-skeleton-placeholder`. |
| I6 | Client-side timeout on scan-processing (30 s) | scan-processing | After 30 s, auto-navigate to error-decode-failed. Prevents the processing-trap blocker without requiring a Cancel tap. |
| I7 | StoreKit "Restore purchases" flow | paywall | `IAP.restorePurchases()` call; success state navigates to Overview with Pro unlocked; failure shows error toast. |
| I8 | Dynamic Type / iOS system text size compliance | appearance | Map the text-size slider to `UIContentSizeCategory` values rather than a custom scale. Ensures 3rd-party accessibility tools work correctly. |
| I9 | `UIActivityViewController` for "Share via…" in share-decode | share-decode | Replace the undefined "Send to someone" with the native iOS share sheet. Zero custom UI needed. |
| I10 | Discard confirmation on back navigation for unsaved forms | add-commitment, contact-support | Listen to the navigation `beforeRemove` event (React Navigation); present action sheet if form is dirty. |
| I11 | Deep link to iOS app permissions from error-camera-denied | error-camera-denied | `Linking.openURL('app-settings:')` for the "Open Settings" button. Confirm this works on iOS 26. |
| I12 | `itms-apps://` deeplink for "Manage payment method" in error-purchase-failed | error-purchase-failed | `Linking.openURL('itms-apps://apps.apple.com/account/subscriptions')` or similar. Verify URL scheme on iOS 26. |
| I13 | Dark mode token collection | All screens | A Dark token collection does not yet exist in the Figma DS (noted in audit-findings.md section C). Required for App Store submission. Must be built in Figma first, then mapped in code. |
| I14 | iOS 26 floating tab bar | All tab-bar screens | The current tab bar is a custom component. iOS 26 introduces a floating tab bar pattern. Evaluate `expo-router` tab bar configuration or native `UITabBarController` behaviour changes. |
| I15 | VoiceOver accessibility labels for icon-only controls | scan-camera (× button), overview bell, avatar circle, paywall plan selector | Each icon-only tap target needs an `accessibilityLabel` and `accessibilityRole`. The greyed Pro toggles in radar-settings need `accessibilityHint: "Requires Pro subscription"`. |
| I16 | Progressive decode-credit counter on Overview | overview-wireframe | No visible "3 of 5 decodes used" indicator between scans. Users have no warning before hitting the limit screen. A small counter in the Overview header or the scan-capture sheet reduces the surprise. |
| I17 | Partial-result state for scan-processing | scan-processing | When only some pages of a multi-page document are readable, the current flow has no "partial result" state. Define a success-with-caveats response in the decode API and surface it in the result screen. |
