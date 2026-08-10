# Decode wireframes — audit input (machine snapshot)

Target device: **iPhone 17 Pro**, logical **402×874 pt** (6.3″ @3×). Grayscale lo-fi. Figma file `ZR4wMSgGSbdckASvpiFwIP`.
All screen PNGs live in `/Users/elenauvarova/git projects/decode/design/wireframes/figma/` (current as of this snapshot).

## Structural facts (from Figma API traversal)

Notes: `instances` = component instances; `frames` = plain (detached/inline) frames; overflowRight/Below = child nodes whose bounds extend past the frame edge (clipping risk). `unboundFills` = solid fills NOT bound to a token. **Every screen reported `unboundFills: []`** (all fills token-bound). **Frames are grid-aligned**: rows at y=0/940/2100/3100/4100/5100, columns step by 460px.

| Screen | size | instances | frames | overflowRight | overflowBelow | PNG |
|---|---|---|---|---|---|---|
| Overview | 402×874 | 11 | 35 | **pill +10px** | — | overview-wireframe.png |
| Decode-Result | 402×1070 | 11 | 31 | — | — | decode-result-wireframe.png |
| Ask | 402×874 | 4 | 24 | — | — | ask.png |
| Scan-Camera | 402×874 | 0 (bespoke) | 7 | — | — | scan-camera-wireframe.png |
| Scan-Processing | 402×874 | 0 (bespoke) | 25 | — | — | scan-processing-wireframe.png |
| Onboarding-1-Welcome | 402×874 | 3 | 12 | — | — | onboarding-1-welcome.png |
| Onboarding-2-Trust | 402×874 | 2 | 22 | — | — | onboarding-2.png |
| Onboarding-3-NoDoc | 402×874 | 8 | 12 | — | — | onboarding-3-nodoc.png |
| Onboarding-4-Register | 402×874 | 7 | 11 | — | — | onboarding-4-register.png |
| Alerts-Inbox | 402×874 | 11 | 16 | — | — | alerts-inbox.png |
| Alert-Detail | 402×874 | 4 | 14 | — | — | alert-detail.png |
| Vault-List | 402×874 | 11 | 22 | — | — | vault-list.png |
| Vault-Detail | 402×874 | 3 | 18 | — | — | vault-detail.png |
| Settings | 402×874 | 28 | 20 | — | **bottom rows +27px (clipped)** | settings.png |
| Paywall | 402×874 | 3 | 40 | — | — | paywall.png |
| Scan-Capture | 402×874 | 7 | 13 | — | — | scan-capture.png |
| Scan-Review | 402×874 | 3 | 19 | — | — | scan-review.png |
| QA-Signpost | 402×874 | 9 | 15 | — | — | qa-signpost.png |
| Trust-Repair | 402×874 | 5 | 12 | — | — | trust-repair.png |
| Overview-Empty | 402×874 | 4 | 13 | — | — | overview-empty.png |
| Result-Error | 402×874 | 3 | 13 | — | — | result-error.png |
| Error-Offline | 402×874 | 5 | 4 | — | — | error-offline.png |
| Error-DecodeFailed | 402×874 | 5 | 4 | — | — | error-decode-failed.png |
| Error-LimitReached | 402×874 | 5 | 4 | — | — | error-limit-reached.png |
| Error-CameraDenied | 402×874 | 5 | 4 | — | — | error-camera-denied.png |
| Empty-NoResults | 402×874 | 5 | 4 | — | — | empty-no-results.png |
| Error-PurchaseFailed | 402×874 | 5 | 4 | — | — | error-purchase-failed.png |

## Component library (Atomic Design, page "Components")
- Atoms(6): IconBox, InputField, Pill, Chip(Default/Active), Dots(Step1-3), Button(Primary/Secondary/Quiet)
- Molecules(12): StatusBar, ScreenHeader, SectionHeader, HeadlineStat, KeyValueRow, NoteBlock, FeatureRow, ListRow, CommitmentRow, TrapCard, CreditFileBadge, SheetHeader
- Organisms(3): TabBar, AlertCard, StateScaffold

**Known build-order gap to verify:** KeyValueRow, NoteBlock, FeatureRow, HeadlineStat, Chip, Dots were added AFTER several screens were built, so those screens may use INLINE equivalents instead of the component. Suspected: Decode-Result (terms→KeyValueRow, £412→HeadlineStat, summary→NoteBlock), Overview (£214→HeadlineStat), Vault-Detail & Alert-Detail (kv→KeyValueRow, £→HeadlineStat), Paywall (feature list→FeatureRow, timeline→NoteBlock), Onboarding-1/2/3 (pager dots→Dots, trust rows→FeatureRow), Vault-List & Ask (chips→Chip).

## Reference docs (for content/consistency review)
- /Users/elenauvarova/git projects/decode/docs/product/jtbd.md
- /Users/elenauvarova/git projects/decode/docs/ux/jtbd-to-flows.md
- /Users/elenauvarova/git projects/decode/docs/ux/screen-sitemap.md
- /Users/elenauvarova/git projects/decode/research/21-pricing-monetization.md
- /Users/elenauvarova/git projects/decode/research/26-naming-brand-trademark.md
- /Users/elenauvarova/git projects/decode/research/31-behavioral-trust-design.md
- /Users/elenauvarova/git projects/decode/docs/DESIGN.md
