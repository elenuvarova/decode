# Decode — clickable web prototype

Lightweight, no-build prototype to **walk every flow** of the Decode wireframes in a browser (and drive it with Playwright). It renders the lo-fi wireframe PNGs (from `../design/wireframes/figma/`) inside an iPhone 17 Pro frame and overlays **working tap hotspots directly on the phone screen**.

## Run
```bash
# from repo root
python3 -m http.server 8765
# open:
http://localhost:8765/prototype/index.html
```
(Any static server works; relative paths also load via `file://`.)

## How it works
- **Tap hotspots on the phone** — transparent clickable areas positioned over the real buttons/rows in each screen; click to navigate. Toggle **“Show tap areas”** to reveal/hide their outlines; hover shows a `label → target` tooltip.
- **Flow runner** — pick a named flow in the sidebar, then step with **Prev / Next** (status shows `Flow · step/total`). **✕** exits the flow.
- **Jump anywhere** — the sidebar lists all 49 screens.
- **Back** — top-left, walks navigation history.

## Flows (14)
`first-decode` (J1) · `insurance` · `multi-page` · `ask` (J4) · `share` · `trust` · `watch` (J3) · `vault` (J6) · `payment-cal` · `monetize` (F8) · `onboarding` · `settings-tour` · `privacy` · `errors`.

Newly wired in the 2026-07-02 fix pass: `source-highlight` (`source-highlight.png`), `subscription-management` (`subscription-management.png`, from Settings → Manage subscription), `result-error` (`result-error.png`, from the scan-processing partial-fail path). `save-watch-success` was wired in the immediately-preceding uncommitted pass (45→46 vs the last commit), so relative to git HEAD this tree adds **four** screens — all four PNGs are new files. Static-prototype note: `source-highlight` Close/Done always return to `decode-result`, even when entered from an `ask` citation — use the global Back in that path.

## Hotspots
Each screen in `app.js` declares its hotspots as `{ label, to, rect }`, where **`rect = [left%, top%, width%, height%]` of the frame** — percentages, so re-exported PNGs at any scale keep working. Every hotspot renders with `data-testid="action-<slug>"` (slug of its label) plus `data-to`, so Playwright can click any control by a stable id.

## Playwright
Every control has a stable `data-testid`:
- `flow-<id>` (e.g. `flow-first-decode`), `flow-next`, `flow-prev`, `flow-exit`
- `screen-<id>` (sidebar), `nav-back`, `toggle-hotspots`
- `action-<slug>` on each on-phone hotspot (also carries `data-to`)
- `current-screen` (the phone) exposes `data-screen="<id>"`; `window.PROTO.state` returns `{current, flowId, flowIdx, historyLen}` for assertions.

Integrity-checked via Playwright: **49 screens, 14 flows, 0 broken flow steps / hotspot targets, 0 missing images, 0 orphan screens** (2026-07-02 fix pass).

## Not wired (on purpose)
These frames exist in Figma (designed, wiring deferred):
- **App Store artifacts (4)** — Perm-Camera, Perm-Notifications, Perm-FaceID, Delete-Account: launch/review artifacts, not in-app navigation.
- **Deferred screens** — Account, Privacy-Policy, Legal-Disclaimer, Notifications-Settings, Trial-Expired, Vault-Search-Results, Vault-Sort-Filter, Document-History, Force-Update, Maintenance, Rate-Feedback.

## Files
`index.html` · `proto.css` (uses `../design/wireframes/tokens.css`) · `app.js` (screen + flow + hotspot data). Previews in `previews/`.

> The prototype reflects the wireframe PNGs. **Figma is the source of truth.** Screen PNGs in `../design/wireframes/figma/` are **2× exports** of the 402-wide frames (so 804 px wide); wide boards like `foundations` export at 1.5×. When a screen changes in Figma, re-export its PNG at 2× and the prototype updates automatically.
