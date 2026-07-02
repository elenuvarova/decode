# Decode

AI decoder for UK financial documents — BNPL (Buy Now, Pay Later) first.

Scan or share in a document (a BNPL offer, checkout T&Cs, a scary letter) and get, in ~30 seconds:

- **Deterministic true cost** — calculated by code, not by the LLM ("Calculated, not AI")
- **Trap flags** — late fees, CPA quirks, auto-renewal, lock-ins, from a verified UK trap catalog
- **Binary credit-file badge** — "Goes on your credit file: YES / NO", the segment's #1 fear
- **Tappable citations** — every claim links to the exact line in *your* document
- Decoded documents become **saved commitments in the Vault**, and **Renewal Radar** sends local reminders with the exact amount and the consequence of missing it

**No bank connection, ever.** That is a core positioning invariant, not a missing feature.

**Primary segment:** UK BNPL users aged 18–25 ("accidental borrowers" — several plans across Klarna/Clearpay/PayPal, unclear dates, fear of irreversible credit-file consequences).

## Status (July 2026)

Done:

- **Research** — 32 verified tracks (`research/`): competitors, UK BNPL market and FCA regulatory boundary, user pains with verbatim sources, tech feasibility, pricing, GDPR, naming
- **Product analysis** — segmentation, JTBD, product invariants (`docs/product/`)
- **UX architecture** — flows, sitemap, screen contracts (`docs/ux/`, `docs/screens/`)
- **Lo-fi wireframes** — 64 Figma frames, 3-tier tokenized design system, clickable prototype

Next: hi-fi visual design, then the Expo build.

## Repository structure

```text
research/          32 research tracks + executive summary (00) — adversarially verified
docs/
  DESIGN.md        the token contract — single source of visual truth
  product/         segmentation, JTBD, invariants
  ux/              flows, sitemap, UX decisions
  guidelines/      methodology: design-system rules, spacing rhythm,
                   DS principles, architecture (FSD)
  screens/         per-screen contracts
design/
  audit-*.md       design audits, benchmark and enforcement reports (flat)
  wireframes/figma 2x PNG exports of all wired frames + boards (51 files)
prototype/         clickable prototype (PNG exports + hotspots) —
                   open prototype/index.html in a browser, no build needed
prototype-app/     coded prototype experiment (Apple HIG conventions)
frontend/          template stub — placeholder for the build phase
backend/           template stub — placeholder for the build phase
```

## Design source of truth

The **Figma file** (key `ZR4wMSgGSbdckASvpiFwIP`) is the source of truth: token variables, components, and all frames live there. PNGs in `design/wireframes/figma/` and in `prototype/` are exports.

## Planned build stack

Per the research phase (`research/00-executive-summary.md`):

- **App:** Expo (React Native), iPhone-first — PWA rejected (no Web Share Target / Face ID / reliable push on iOS; share-in is half the wedge)
- **Backend:** FastAPI proxy + Supabase (eu-west-2, London)
- **AI:** Claude API for extraction and Q&A; all money math done deterministically in code
- **Reminders:** local notifications (no server push needed — no bank connection means deadlines are deterministic)

## Trying the prototype

```bash
open prototype/index.html
```

Click through the hotspots — 49 screens and 14 flows wired to the final Figma geometry.
