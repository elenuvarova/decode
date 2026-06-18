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
- **Jump anywhere** — the sidebar lists all 26 screens.
- **Back** — top-left, walks navigation history.

## Flows (8)
`first-decode` (J1) · `ask` (J4) · `watch` (J3) · `vault` (J6) · `monetize` · `trust` · `onboarding` · `errors`.

## Playwright
Every control has a stable `data-testid`:
- `flow-<id>` (e.g. `flow-first-decode`), `flow-next`, `flow-prev`, `flow-exit`
- `screen-<id>` (sidebar), `nav-back`, `toggle-hotspots`
- `action-<slug>` on each on-phone hotspot (also carries `data-to`)
- `current-screen` (the phone) exposes `data-screen="<id>"`; `window.PROTO.state` returns `{current, flowId, flowIdx, historyLen}` for assertions.

Integrity-checked via Playwright: **26 screens, 8 flows, 63 hotspots, 0 broken flow steps / hotspot targets, 0 missing images, 0 orphan screens.**

## Files
`index.html` · `proto.css` (uses `../design/wireframes/tokens.css`) · `app.js` (screen + flow + hotspot data). Previews in `previews/`.

> The prototype reflects the wireframe PNGs. When a screen changes in Figma, re-export its PNG to `../design/wireframes/figma/` and the prototype updates automatically.
