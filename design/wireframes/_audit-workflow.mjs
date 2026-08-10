export const meta = {
  name: 'decode-wireframe-audit',
  description: 'Audit Decode lo-fi wireframes for alignment, componentization, content/FCA/pricing and cross-screen consistency; verify each finding; synthesize a prioritized report',
  phases: [
    { title: 'Review', detail: 'visual groups + componentization + content + cross-screen' },
    { title: 'Verify', detail: 'adversarially re-check each finding' },
    { title: 'Synthesis', detail: 'dedup and prioritize' },
  ],
}

const FIG = '/Users/elenauvarova/git projects/decode/design/wireframes/figma'
const AUDIT = '/Users/elenauvarova/git projects/decode/design/wireframes/audit-input.md'
const DOCS = '/Users/elenauvarova/git projects/decode'
const png = (f) => FIG + '/' + f

const FINDINGS = {
  type: 'object',
  properties: {
    findings: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          screen: { type: 'string' },
          area: { type: 'string' },
          issue: { type: 'string' },
          severity: { type: 'string', enum: ['critical', 'should-fix', 'nit'] },
          source: { type: 'string' },
        },
        required: ['screen', 'area', 'issue', 'severity', 'source'],
      },
    },
  },
  required: ['findings'],
}

const VERDICT = {
  type: 'object',
  properties: {
    real: { type: 'boolean' },
    severity: { type: 'string', enum: ['critical', 'should-fix', 'nit', 'not-an-issue'] },
    note: { type: 'string' },
  },
  required: ['real', 'severity', 'note'],
}

const REPORT = {
  type: 'object',
  properties: {
    summary: { type: 'string' },
    critical: { type: 'array', items: { type: 'string' } },
    shouldFix: { type: 'array', items: { type: 'string' } },
    nits: { type: 'array', items: { type: 'string' } },
    aligned_ok: { type: 'string' },
  },
  required: ['summary', 'critical', 'shouldFix', 'nits', 'aligned_ok'],
}

const VINTRO = 'You are reviewing LO-FI GRAYSCALE iPhone 17 Pro wireframes (402x874 pt) for the app Decode. Grayscale and lo-fi (no color, placeholder icon boxes) are INTENTIONAL: never flag needs-color, placeholder-icons, or low-fidelity. Read each PNG with the Read tool and judge ONLY: element alignment, clipped or overflowing text/shapes, inconsistent padding/margins, vertical rhythm, status-bar at top, bottom safe-area (tab bar / home-indicator room), button width consistency, centering, and anything that looks broken or unintended. Be precise and conservative. Return findings (empty array if clean), source = the PNG path.'

const VGROUPS = [
  { label: 'visual:core', files: ['overview-wireframe.png', 'decode-result-wireframe.png', 'ask.png', 'scan-capture.png', 'scan-review.png'] },
  { label: 'visual:onboarding', files: ['scan-camera-wireframe.png', 'scan-processing-wireframe.png', 'onboarding-1-welcome.png', 'onboarding-2.png', 'onboarding-3-nodoc.png', 'onboarding-4-register.png'] },
  { label: 'visual:watch-vault', files: ['alerts-inbox.png', 'alert-detail.png', 'vault-list.png', 'vault-detail.png', 'overview-empty.png'] },
  { label: 'visual:monetize-states', files: ['settings.png', 'paywall.png', 'qa-signpost.png', 'trust-repair.png', 'result-error.png'] },
  { label: 'visual:errors', files: ['error-offline.png', 'error-decode-failed.png', 'error-limit-reached.png', 'error-camera-denied.png', 'empty-no-results.png', 'error-purchase-failed.png'] },
]

phase('Review')

const thunks = []
for (const g of VGROUPS) {
  const list = g.files.map((f) => '- ' + png(f)).join('\n')
  thunks.push(() => agent(VINTRO + '\n\nReview these screens:\n' + list, { label: g.label, phase: 'Review', schema: FINDINGS }))
}

const compPrompt = 'Read ' + AUDIT + '. Audit COMPONENTIZATION and STRUCTURE of the Decode Figma wireframes. The user requirement (repeated) is that screens must MAXIMALLY consist of components (Atomic Design). Using the structural table and the Known build-order gap note: flag every screen using INLINE frames where a library component already exists (KeyValueRow, NoteBlock, FeatureRow, HeadlineStat, Chip, Dots, SectionHeader). Also flag: Overview overflowRight pill +10px; Settings overflowBelow bottom rows clipped; any non-402x874 screen (Decode-Result is 1070 tall, judge if acceptable as a scrolling screen); and the Light clones being detached non-instances. severity: critical=broken/clipped, should-fix=inline-where-component-exists, nit=minor. source=' + AUDIT
thunks.push(() => agent(compPrompt, { label: 'componentization', phase: 'Review', schema: FINDINGS }))

const contentPrompt = 'Audit CONTENT / FCA / PRICING / NAMING consistency of the Decode wireframes. Read ' + DOCS + '/research/21-pricing-monetization.md, ' + DOCS + '/research/26-naming-brand-trademark.md, ' + DOCS + '/research/31-behavioral-trust-design.md, ' + DOCS + '/docs/product/jtbd.md. Then Read PNGs: ' + png('paywall.png') + ', ' + png('decode-result-wireframe.png') + ', ' + png('qa-signpost.png') + ', ' + png('trust-repair.png') + ', ' + png('error-limit-reached.png') + ', ' + png('onboarding-2.png') + ', ' + png('settings.png') + '. Verify: (1) pricing matches research/21 (free = 5 decodes per month capped not unlimited, paywall after value, 4.99/mo or 41.99/yr, Billed by Apple); flag contradictions. (2) FCA explain-not-advise boundary present (Decode-Result disclaimer; QA-Signpost signposts StepChange/MoneyHelper/National Debtline; no you-should language). (3) Calculated-not-AI, credit-file badge and citations present on Decode-Result. (4) Naming: app shows Decode; research/26 says bare Decode wordmark is a trademark risk (class 9 taken) - note as known risk, not a wireframe bug. (5) currency/number and terminology consistency. source = the doc or PNG path.'
thunks.push(() => agent(contentPrompt, { label: 'content-fca-pricing', phase: 'Review', schema: FINDINGS }))

const crossPrompt = 'Audit CROSS-SCREEN CONSISTENCY and FLOW COVERAGE. Read ' + DOCS + '/docs/ux/screen-sitemap.md and ' + DOCS + '/docs/ux/jtbd-to-flows.md. Then Read PNGs: ' + png('overview-wireframe.png') + ', ' + png('vault-list.png') + ', ' + png('overview-empty.png') + ', ' + png('alerts-inbox.png') + ', ' + png('settings.png') + ', ' + png('scan-capture.png') + ', ' + png('onboarding-1-welcome.png') + ', ' + png('onboarding-4-register.png') + ', ' + png('decode-result-wireframe.png') + ', ' + png('ask.png') + '. Check: (1) TabBar (Home / + Scan / Vault) consistent and present on tab-level screens (Overview, Overview-Empty, Vault-List); is the ACTIVE tab indicated? (2) header patterns consistent (back chevron vs X for modals). (3) terminology consistent. (4) every P0 JTBD flow (J1 scan-decode, J2 overview, J3 radar, J4 ask) has its screens. source = doc or PNG path.'
thunks.push(() => agent(crossPrompt, { label: 'cross-screen', phase: 'Review', schema: FINDINGS }))

const reviews = (await parallel(thunks)).filter(Boolean)
const allFindings = reviews.flatMap((r) => (r && r.findings) ? r.findings : [])
log('Collected ' + allFindings.length + ' raw findings, verifying')

phase('Verify')
const verifyThunks = allFindings.map((f) => () => {
  const p = 'Adversarially verify this wireframe audit finding. Re-open the source and check carefully; DEFAULT to real=false unless confirmed. Grayscale, lo-fi and placeholder icon-boxes are INTENTIONAL and never an issue.\n\nFinding: screen=' + f.screen + '; area=' + f.area + '; issue=' + f.issue + '; claimed severity=' + f.severity + '.\nSource to re-check: ' + f.source + '\n\nReturn real (genuine fixable problem?), corrected severity (or not-an-issue), and a one-line note.'
  return agent(p, { label: 'verify:' + f.screen, phase: 'Verify', schema: VERDICT }).then((v) => Object.assign({}, f, { verdict: v }))
})
const verified = (await parallel(verifyThunks)).filter(Boolean)
const confirmed = verified.filter((f) => f.verdict && f.verdict.real && f.verdict.severity !== 'not-an-issue')
log(confirmed.length + '/' + verified.length + ' findings confirmed')

phase('Synthesis')
const payload = JSON.stringify(confirmed.map((f) => ({ screen: f.screen, area: f.area, issue: f.issue, severity: f.verdict.severity, note: f.verdict.note })), null, 2)
const synthPrompt = 'You are the synthesis lead for a Decode wireframe audit. Confirmed findings (after adversarial verification) as JSON:\n' + payload + '\n\nDedupe near-identical findings, group by severity, and write a crisp prioritized fix list. Each item: "Screen - concrete issue -> suggested fix". Also write one short paragraph on what is correct/well-aligned (audit confirmed: all fills token-bound, frames grid-aligned, error states fully component-composed). Be honest and concise.'
const report = await agent(synthPrompt, { label: 'synthesis', phase: 'Synthesis', schema: REPORT })

return { rawCount: allFindings.length, confirmedCount: confirmed.length, report }
