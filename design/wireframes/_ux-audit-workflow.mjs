export const meta = {
  name: 'decode-ux-audit',
  description: 'Full UX audit of Decode wireframes: Nielsen heuristics, JTBD/flow friction, onboarding/activation, error recovery, accessibility, trust/FCA tone, IA/cognitive load, pre-mortem PM1-6 coverage; verify and synthesize',
  phases: [
    { title: 'Evaluate', detail: '8 expert UX lenses over the wireframes + docs' },
    { title: 'Verify', detail: 'adversarially confirm each finding and severity' },
    { title: 'Synthesis', detail: 'prioritized UX report' },
  ],
}

const REPO = '/Users/elenauvarova/git projects/decode'
const FIG = REPO + '/design/wireframes/figma'
const png = (f) => FIG + '/' + f
const AUDIT = REPO + '/design/wireframes/audit-input.md'

const ALL_PNGS = ['onboarding-1-welcome.png','onboarding-2.png','onboarding-3-nodoc.png','onboarding-4-register.png','scan-capture.png','scan-camera-wireframe.png','scan-processing-wireframe.png','scan-review.png','decode-result-wireframe.png','ask.png','qa-signpost.png','trust-repair.png','overview-wireframe.png','overview-empty.png','vault-list.png','vault-detail.png','alerts-inbox.png','alert-detail.png','settings.png','paywall.png','error-offline.png','error-decode-failed.png','error-limit-reached.png','error-camera-denied.png','empty-no-results.png','error-purchase-failed.png']
const list = (arr) => arr.map((f) => '- ' + png(f)).join('\n')

const FINDINGS = {
  type: 'object',
  properties: {
    findings: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          lens: { type: 'string' },
          screen: { type: 'string' },
          issue: { type: 'string' },
          why: { type: 'string', description: 'user impact / why it matters' },
          severity: { type: 'string', enum: ['critical', 'major', 'minor'] },
          recommendation: { type: 'string' },
          source: { type: 'string' },
        },
        required: ['lens', 'screen', 'issue', 'why', 'severity', 'recommendation', 'source'],
      },
    },
  },
  required: ['findings'],
}

const VERDICT = {
  type: 'object',
  properties: {
    real: { type: 'boolean' },
    severity: { type: 'string', enum: ['critical', 'major', 'minor', 'not-an-issue'] },
    note: { type: 'string' },
  },
  required: ['real', 'severity', 'note'],
}

const REPORT = {
  type: 'object',
  properties: {
    summary: { type: 'string' },
    topThemes: { type: 'array', items: { type: 'string' } },
    critical: { type: 'array', items: { type: 'string' } },
    major: { type: 'array', items: { type: 'string' } },
    minor: { type: 'array', items: { type: 'string' } },
    premortem_coverage: { type: 'string', description: 'how well PM1-6 are covered' },
    strengths: { type: 'string' },
  },
  required: ['summary', 'topThemes', 'critical', 'major', 'minor', 'premortem_coverage', 'strengths'],
}

const CTX = 'Context: Decode is an iOS app (iPhone 17 Pro) that decodes financial documents (BNPL offers, contracts, renewal/insurance letters) for UK users aged 18-25. Core loop Scan -> Understand -> Decide -> Watch. No bank connection. Freemium ~4.99/mo (free = 5 decodes/month). FCA boundary: explain, do not advise. These are LO-FI GRAYSCALE wireframes (402x874) - judge UX/interaction/flow/copy/IA, NOT visual polish or color. Read the relevant PNGs with the Read tool. Return findings with concrete, actionable recommendations; empty array if a lens finds nothing.'

phase('Evaluate')

const lenses = [
  { label: 'ux:nielsen', type: 'ux-product-designer',
    p: CTX + '\n\nLENS: Nielsen 10 usability heuristics. Evaluate visibility of system status, match to real world, user control & freedom, consistency & standards, error prevention, recognition over recall, flexibility, minimalist design, error recovery, help. Screens:\n' + list(['overview-wireframe.png','decode-result-wireframe.png','ask.png','scan-capture.png','scan-review.png','scan-processing-wireframe.png','vault-list.png','settings.png','paywall.png']) },
  { label: 'ux:jtbd-friction', type: 'ux-product-designer',
    p: CTX + '\n\nLENS: JTBD fulfilment & flow friction. Read ' + REPO + '/docs/product/jtbd.md and ' + REPO + '/docs/ux/jtbd-to-flows.md. For each P0 job (J1 scan->true cost+traps+credit-file, J2 overview overview, J3 radar reminders, J4 ask with citations) judge whether the screens let the user accomplish it with minimal friction; flag dead-ends, missing steps, unclear next actions, redundant taps. Screens:\n' + list(['overview-wireframe.png','decode-result-wireframe.png','scan-capture.png','scan-review.png','ask.png','alerts-inbox.png','alert-detail.png','vault-list.png','vault-detail.png']) },
  { label: 'ux:onboarding-activation', type: 'ux-product-designer',
    p: CTX + '\n\nLENS: Onboarding & activation (time-to-value, drop-off, first-run). The wedge promise is value in <30s before signup/paywall. Read ' + REPO + '/docs/research-sprint/task4-personas-premortem.md. Judge onboarding for friction, premature asks, clarity of the no-document branch (PM2), and the empty/first-run state. Screens:\n' + list(['onboarding-1-welcome.png','onboarding-2.png','onboarding-3-nodoc.png','onboarding-4-register.png','overview-empty.png','scan-capture.png']) },
  { label: 'ux:error-recovery', type: 'ux-product-designer',
    p: CTX + '\n\nLENS: Error recovery & edge states. Judge whether errors are recoverable, preserve user work, avoid blame, and offer a clear path forward; whether the decode-limit/offline/decode-failed/camera-denied/purchase-failed/no-results states are reassuring and actionable. Screens:\n' + list(['error-offline.png','error-decode-failed.png','error-limit-reached.png','error-camera-denied.png','empty-no-results.png','error-purchase-failed.png','result-error.png','trust-repair.png']) },
  { label: 'ux:accessibility', type: 'accessibility-specialist',
    p: CTX + '\n\nLENS: Accessibility (WCAG 2.2 / iOS HIG). Grayscale lo-fi so do NOT score final color contrast (note it must be checked at hi-fi). DO judge: tap-target sizes (>=44pt), text legibility/size, hit-area spacing, reliance on color alone for meaning (e.g. credit-file/trap status — is there a text label too?), Dynamic Type resilience (will copy overflow at large sizes?), screen-reader structure/labelling intent, focus order, and that icon-only controls would need labels. Read ' + REPO + '/docs/DESIGN.md for the token/type scale. Screens:\n' + list(['overview-wireframe.png','decode-result-wireframe.png','ask.png','scan-camera-wireframe.png','alerts-inbox.png','paywall.png','vault-list.png']) },
  { label: 'ux:trust-fca-tone', type: 'ux-product-designer',
    p: CTX + '\n\nLENS: Trust, FCA boundary & behavioural tone. Read ' + REPO + '/research/31-behavioral-trust-design.md and ' + REPO + '/docs/product/jtbd.md. Judge: non-judgemental tone (reading age ~9, no you-should), the trust crown (deterministic numbers + Calculated-not-AI + citations + a trust-repair path), debt-distress signposting (PM5), credit-file framing without inducing panic, fear-with-efficacy. Screens:\n' + list(['decode-result-wireframe.png','qa-signpost.png','trust-repair.png','ask.png','overview-wireframe.png','onboarding-2.png','error-limit-reached.png']) },
  { label: 'ux:ia-cognitive-load', type: 'ux-product-designer',
    p: CTX + '\n\nLENS: Information architecture, navigation & cognitive load. Read ' + REPO + '/docs/ux/screen-sitemap.md. Judge the overview information hierarchy (headline number, range toggle, sections), the 3-tab model (Home/Scan/Vault) vs where Radar/Settings live, findability, and whether any screen overloads the user. Screens:\n' + list(['overview-wireframe.png','overview-empty.png','vault-list.png','vault-detail.png','alerts-inbox.png','settings.png','decode-result-wireframe.png']) },
  { label: 'ux:premortem', type: 'ux-product-designer',
    p: CTX + '\n\nLENS: Pre-mortem requirement coverage. Read ' + REPO + '/docs/research-sprint/task4-personas-premortem.md (requirements PM1-PM6). For each PM requirement, judge whether the wireframes satisfy it and flag gaps. PM1 Home=Overview; PM2 onboarding no-doc branch; PM3 credit-file badge as hero; PM4 paywall gated on the Watch layer; PM5 Q&A debt-distress signpost; PM6 three trust languages. Screens:\n' + list(['overview-wireframe.png','onboarding-3-nodoc.png','decode-result-wireframe.png','paywall.png','qa-signpost.png','onboarding-2.png','alerts-inbox.png']) },
]

const thunks = lenses.map((l) => () => agent(l.p, { label: l.label, phase: 'Evaluate', schema: FINDINGS, agentType: l.type }))
const evals = (await parallel(thunks)).filter(Boolean)
const all = evals.flatMap((r) => (r && r.findings) ? r.findings : [])
log('Collected ' + all.length + ' UX findings, verifying')

phase('Verify')
const vThunks = all.map((f) => () => {
  const p = 'Adversarially verify this UX audit finding for a LO-FI GRAYSCALE iPhone wireframe. DEFAULT to real=false unless you can confirm a genuine UX problem by re-reading the source. Do NOT count missing visual polish, color, or hi-fi detail as issues.\n\nLens: ' + f.lens + '\nScreen: ' + f.screen + '\nIssue: ' + f.issue + '\nWhy: ' + f.why + '\nClaimed severity: ' + f.severity + '\nRecommendation: ' + f.recommendation + '\nSource: ' + f.source + '\n\nReturn real, corrected severity (or not-an-issue), and a one-line note.'
  return agent(p, { label: 'verify:' + f.lens, phase: 'Verify', schema: VERDICT }).then((v) => Object.assign({}, f, { verdict: v }))
})
const verified = (await parallel(vThunks)).filter(Boolean)
const confirmed = verified.filter((f) => f.verdict && f.verdict.real && f.verdict.severity !== 'not-an-issue')
log(confirmed.length + '/' + verified.length + ' UX findings confirmed')

phase('Synthesis')
const payload = JSON.stringify(confirmed.map((f) => ({ lens: f.lens, screen: f.screen, issue: f.issue, why: f.why, severity: f.verdict.severity, recommendation: f.recommendation })), null, 2)
const synthPrompt = 'You are the UX research lead synthesizing a full UX audit of the Decode wireframes (lo-fi grayscale iPhone app for UK BNPL users 18-25; core loop Scan-Understand-Decide-Watch; FCA explain-not-advise). Confirmed findings (post adversarial verification) as JSON:\n' + payload + '\n\nProduce a prioritized UX audit: a 3-4 sentence executive summary; topThemes (recurring patterns across lenses); critical / major / minor lists where each item is "Screen/area - issue (why it hurts the user) -> recommendation"; a premortem_coverage paragraph (how well PM1-6 are met and any gaps); and a strengths paragraph (what the UX already does well). Dedupe overlapping findings across lenses. Be concrete and honest.'
const report = await agent(synthPrompt, { label: 'ux-synthesis', phase: 'Synthesis', schema: REPORT })

return { rawCount: all.length, confirmedCount: confirmed.length, report }
