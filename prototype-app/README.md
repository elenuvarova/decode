# Decode — interactive HIG prototype (coded)

A **real, interactive** clickable prototype: every screen is live HTML/CSS (not a screenshot), built on a grayscale **Apple HIG** component kit. Tap real nav bars, tab bars, sheets, switches, segmented controls; navigate by tapping the actual UI.

> Sibling to `../prototype/` (which is a PNG-hotspot click-through of the Figma frames). This one is the *coded* version the user asked for — genuinely interactive + a living design system.

## Run
```bash
# from repo root
python3 -m http.server 8765
# open:
http://localhost:8765/prototype-app/index.html
```

## What's interactive
- **Tap the UI itself** — nav-bar back/Done, tab bar, list rows, sheet options all navigate.
- **Onboarding consent** — switch defaults **OFF**; *Continue* stays disabled until you turn it on (Apple 5.1.2 / GDPR fix).
- **Cockpit range** — segmented control (7d / 30d / 60d) live-updates the headline £.
- **Scan-processing** — steps through Reading→Extracting→Calculating→Checking, then auto-advances.
- **Ask** — shows a typing indicator that resolves into the answer.
- **Renewal Radar** — reachable from the cockpit **bell** (UX-audit fix) and shows the free/Pro gate.

## Design system (`hig.css`) — with states
Components carry real **states**, viewable on the **◆ Design system** screen: buttons (filled/gray/plain/destructive/apple × default/pressed/disabled/loading), switch on/off, segmented, text field (default/focus/filled/error), chips (default/selected/disabled), list rows, severity **glyphs** (▲ high / i info / ✓ ok / ƒx calc — shape not colour), 3 provenance languages, grayscale ramp. Monochrome (tint = ink) until colour lands later.

## Files
`index.html` (device shell + sidebar) · `hig.css` (HIG kit + states) · `screens.js` (`window.HIG` helpers + **36 screens** + 11 flows) · `app.js` (router + flow runner + interaction wiring).

**Parity with Figma:** includes the App-Store P0 screens (camera/notifications/Face-ID permission primers, Account, Delete-account, Privacy choices/consent, Privacy Policy, Legal disclaimer) and the **insurance** decode (doc-type #2), all reachable from Settings / Scan / flows.

## Playwright
`data-testid` on every control (`flow-*`, `screen-*`, `tab-*`, `nav-*`, `range-*`, `consent-switch`, `result-ask`, `paywall-cta`, …). `#screen-root[data-screen]` = current screen; `window.PROTO.info` returns `{current, flowId, flowIdx, historyLen, screens, flows}`. Verified: **36 screens render, 0 errors, 0 broken nav targets**, consent-gate + segmented + flow-runner all drive correctly.
