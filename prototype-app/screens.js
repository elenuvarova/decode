/* Decode interactive prototype — HIG components + screen definitions.
   Each screen: { title, group, html(ctx) -> string, mount?(root, ctx) }.
   ctx = { go, back, state, rerender, openSheet }. Grayscale lo-fi, HIG chrome. */

// ---------- HIG component helpers ----------
const H = {
  status: () => `<div class="statusbar"><span>9:41</span><div class="dynamic-island"></div><div style="display:flex;gap:6px;align-items:center"><span style="font-size:12px">5G</span><div class="battery"></div></div></div>`,
  nav: ({ title = '', left = '', right = '' } = {}) =>
    `<div class="navbar"><div class="nav-left">${left}</div><div class="nav-title">${title}</div><div class="nav-right">${right}</div></div>`,
  backBtn: (to, label = 'Back') => `<button class="nav-btn chevron" data-nav="${to}" data-testid="nav-bar-back">${label}</button>`,
  doneBtn: (to, label = 'Done') => `<button class="nav-btn bold" data-nav="${to}" data-testid="nav-done">${label}</button>`,
  closeBtn: (to) => `<button class="nav-btn" data-nav="${to}" data-testid="nav-close" style="font-size:22px">✕</button>`,
  tabbar: (active) => `<nav class="tabbar" data-testid="tabbar">
    ${['home:Home:⌂', 'scan:Scan:＋', 'vault:Vault:▤'].map((t) => { const [id, lbl, g] = t.split(':');
      const to = id === 'home' ? 'overview' : id === 'scan' ? 'scan-capture' : 'vault-list';
      return `<button class="tab ${id === 'scan' ? 'scan' : ''} ${active === id ? 'active' : ''}" data-nav="${to}" data-testid="tab-${id}"><span class="glyph">${g}</span>${lbl}</button>`; }).join('')}
  </nav>`,
  group: (rows) => `<div class="list-group">${rows.join('')}</div>`,
  row: ({ icon = '', title, sub = '', value = '', chevron = false, nav = '', action = '', danger = false, testid = '' }) =>
    `<div class="list-row ${nav || action ? 'tappable' : ''} ${danger ? 'danger' : ''}" ${nav ? `data-nav="${nav}"` : ''} ${action ? `data-action="${action}"` : ''} ${testid ? `data-testid="${testid}"` : ''}>
      ${icon ? `<span class="lr-icon">${icon}</span>` : ''}
      <div class="lr-main"><div class="lr-title">${title}</div>${sub ? `<div class="lr-sub">${sub}</div>` : ''}</div>
      ${value ? `<span class="lr-value">${value}</span>` : ''}${chevron ? `<span class="lr-chevron">›</span>` : ''}
    </div>`,
  btn: ({ label, kind = 'filled', nav = '', action = '', id = '', disabled = false, testid = '' }) =>
    `<button class="btn btn-${kind}" ${id ? `id="${id}"` : ''} ${nav ? `data-nav="${nav}"` : ''} ${action ? `data-action="${action}"` : ''} ${disabled ? 'aria-disabled="true"' : ''} ${testid ? `data-testid="${testid}"` : ''}>${label}</button>`,
  pill: (label, glyph = '') => `<span class="pill">${glyph ? `<span class="glyph-badge ${glyph}"></span>` : ''}${label}</span>`,
  // 3 trust languages — one consistent vocabulary + glyph everywhere
  prov: (kind) => ({
    calc: H.pill('Calculated', 'sev-calc'),
    doc: H.pill('From your doc', 'sev-ok'),
    ai: H.pill('AI summary'),
  }[kind]),
};

// ---------- shared state defaults ----------
const DEFAULT_STATE = { consent: false, overviewRange: 1, isPro: false };
const RANGES = [['Due 7d', '£86'], ['30 days', '£214'], ['60 days', '£402']];

// ---------- state-scaffold (error/empty) ----------
function stateScaffold({ glyph = 'i', title, body, primary, secondary, navTitle }) {
  return (ctx) => `<div class="screen">${H.status()}
    ${H.nav({ title: navTitle || '', left: H.closeBtn(primary.to) })}
    <div class="screen-scroll" style="display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:24px;gap:14px">
      <div style="width:78px;height:78px;border-radius:50%;background:var(--fill-2);display:flex;align-items:center;justify-content:center;font-size:34px">${glyph}</div>
      <div class="title2">${title}</div>
      <div class="footnote" style="max-width:300px">${body}</div>
      <div class="stack gap-8" style="width:100%;max-width:320px;margin-top:8px">
        ${H.btn({ label: primary.label, nav: primary.to, testid: 'state-primary' })}
        ${secondary ? H.btn({ label: secondary.label, kind: 'plain', nav: secondary.to, testid: 'state-secondary' }) : ''}
      </div>
    </div></div>`;
}

// ---------- screens ----------
const SCREENS = {
  // ===== onboarding (carousel/terminal-CTA collision fixed: CTAs only after consent) =====
  'onboarding-1': { title: 'Onboarding · Welcome', group: 'Onboarding', html: () => `<div class="screen">${H.status()}
    <div class="screen-scroll center" style="display:flex;flex-direction:column;justify-content:center;align-items:center;padding:28px;gap:18px">
      <div class="hero-card" style="width:240px"><div class="footnote">TRUE COST</div><div style="font-size:40px;font-weight:800">£412</div>
        <span class="pill" style="margin-top:8px"><span class="glyph-badge sev-high"></span>Credit file: YES</span></div>
      <div class="title1" style="max-width:300px">Know what you're really signing</div>
      <div class="footnote" style="max-width:300px">Scan any money document. Decode shows the true cost, the traps, and whether it hits your credit file — in 30 seconds. No bank login, ever.</div>
    </div>
    <div class="action-bar" style="flex-direction:column;border:none">
      <div class="segmented" style="background:none;justify-content:center;gap:6px;margin-bottom:6px;padding:0">
        ${[0,1,2].map(i=>`<span style="width:${i===0?20:7}px;height:7px;border-radius:4px;background:${i===0?'var(--label)':'var(--separator-opaque)'}"></span>`).join('')}</div>
      ${H.btn({ label: 'Get started', nav: 'onboarding-2', testid: 'ob-get-started' })}
      ${H.btn({ label: 'I already have an account', kind: 'plain', nav: 'onboarding-4', testid: 'ob-signin' })}
    </div></div>` },

  'onboarding-2': { title: 'Onboarding · Trust & consent', group: 'Onboarding',
    html: (ctx) => `<div class="screen grouped">${H.status()}
      <div class="large-title">Your documents<br>stay yours</div>
      <div class="screen-scroll">
        ${H.group([
          H.row({ icon: '⊘', title: 'No bank connection', sub: 'Nothing to link, nothing to breach' }),
          H.row({ icon: '🗑', title: 'Photos deleted after decode', sub: "We don't keep the original image" }),
          H.row({ icon: '🔒', title: 'Face ID locks your Vault', sub: 'Only you can open it' }),
        ])}
        <div class="section-footer">To read your documents, Decode sends them to Anthropic's Claude AI. Your data is never used to train AI models.</div>
        <div class="list-group" style="margin-top:18px">
          <div class="list-row"><div class="lr-main"><div class="lr-title">I understand and agree</div></div>
            <div class="switch" id="consent-switch" role="switch" aria-checked="${ctx.state.consent}" data-action="toggle-consent" data-testid="consent-switch"></div></div>
        </div>
      </div>
      <div class="action-bar" style="border:none">
        ${H.btn({ label: 'Continue', nav: 'onboarding-3', id: 'ob2-continue', disabled: !ctx.state.consent, testid: 'ob-continue' })}
      </div></div>`,
    mount: (root, ctx) => {
      const sw = root.querySelector('#consent-switch');
      const cont = root.querySelector('#ob2-continue');
      sw.addEventListener('click', () => {
        ctx.state.consent = !ctx.state.consent;
        sw.setAttribute('aria-checked', String(ctx.state.consent));
        if (ctx.state.consent) cont.removeAttribute('aria-disabled'); else cont.setAttribute('aria-disabled', 'true');
      });
    } },

  'onboarding-3': { title: 'Onboarding · No document', group: 'Onboarding', html: () => `<div class="screen grouped">${H.status()}
    <div class="large-title">No document<br>to hand?</div>
    <div class="screen-scroll">
      <div class="section-footer" style="padding-bottom:8px">See how Decode works, or decode something you've already signed.</div>
      ${H.group([
        H.row({ icon: '📄', title: 'Try a sample', sub: 'See a real Klarna offer, decoded', chevron: true, nav: 'decode-result', testid: 'ob3-sample' }),
        H.row({ icon: '＋', title: 'Decode something you signed', sub: 'Scan an old letter or BNPL plan', chevron: true, nav: 'scan-capture' }),
        H.row({ icon: '✉', title: 'Forward an email', sub: 'decode-me@inbox.decode.app', chevron: true, nav: 'scan-capture' }),
      ])}
    </div>
    <div class="action-bar" style="border:none">${H.btn({ label: 'Skip for now', kind: 'plain', nav: 'overview-empty' })}</div></div>` },

  'onboarding-4': { title: 'Onboarding · Sign in', group: 'Onboarding', html: () => `<div class="screen grouped">${H.status()}
    <div class="large-title">Save your Vault</div>
    <div class="screen-scroll">
      <div class="section-footer" style="padding-bottom:8px">Optional — an account keeps your documents & reminders safe and syncs across devices.</div>
      ${H.group([
        H.row({ icon: '↻', title: 'Sync across your devices' }),
        H.row({ icon: '⤓', title: 'Restore Pro on a new phone' }),
        H.row({ icon: '🔒', title: 'Still locked with Face ID' }),
      ])}
    </div>
    <div class="action-bar" style="flex-direction:column;border:none">
      ${H.btn({ label: 'Sign in with Apple', kind: 'apple', nav: 'overview-empty', testid: 'apple-signin' })}
      ${H.btn({ label: 'Continue with email', kind: 'gray', nav: 'overview-empty' })}
      ${H.btn({ label: 'Skip — keep on this device', kind: 'plain', nav: 'overview-empty' })}
    </div></div>` },

  // ===== overview (large title + bell→Radar entry + interactive segmented range) =====
  'overview': { title: 'Overview (Home)', group: 'Core',
    html: (ctx) => { const r = ctx.state.overviewRange;
      return `<div class="screen grouped">${H.status()}
      <div class="large-title"><div class="lt-row"><span>Commitments</span>
        <span style="display:flex;gap:8px">
          <button class="icon-btn" data-nav="alerts" data-testid="overview-bell">🔔<span class="badge">2</span></button>
          <button class="icon-btn" data-nav="settings" data-testid="overview-settings">⚙</button></span></div></div>
      <div class="screen-scroll">
        <div class="card outline" style="margin:0 16px 14px">
          <div class="footnote">Committed · ${RANGES[r][0]}</div>
          <div style="font-size:40px;font-weight:800;letter-spacing:.5px" id="overview-total">${RANGES[r][1]}</div>
          <div class="segmented" style="margin-top:12px" data-testid="overview-range">
            ${RANGES.map((x, i) => `<button class="seg ${i === r ? 'active' : ''}" data-action="range-${i}" data-testid="range-${i}">${x[0]}<span class="seg-val">${x[1]}</span></button>`).join('')}
          </div>
        </div>
        <div class="list-group" style="margin-bottom:14px"><div class="list-row tappable" data-nav="alerts"><span class="lr-icon sev-high glyph-badge"></span><div class="lr-main"><div class="lr-title">3 traps cost you £180/yr</div><div class="lr-sub">Tap to see what to do →</div></div><span class="lr-chevron">›</span></div></div>
        <div class="section-header">⚠ Needs attention</div>
        ${H.group([H.row({ icon: 'K', title: 'Klarna · 3 plans', sub: '£294 due this week · overlap', value: '£294', chevron: true, nav: 'vault-detail', testid: 'overview-commitment' })])}
        <div class="section-header">Renewing soon</div>
        ${H.group([H.row({ icon: 'B', title: 'Boiler cover', sub: 'Renews in 14 days · 24 Jun', value: '£312', chevron: true, nav: 'alert-detail' })])}
        <div class="section-header">Active</div>
        ${H.group([H.row({ icon: 'C', title: 'Clearpay · Sofa', sub: 'Payment 2 of 4 · 28 Jun', value: '£62', chevron: true, nav: 'vault-detail' })])}
        <div style="height:16px"></div>
      </div>
      ${H.tabbar('home')}</div>`; },
    mount: (root, ctx) => {
      root.querySelectorAll('[data-action^="range-"]').forEach((el) => el.addEventListener('click', () => {
        ctx.state.overviewRange = +el.dataset.action.split('-')[1]; ctx.rerender();
      }));
    } },

  'overview-empty': { title: 'Overview · Empty', group: 'Core', html: () => `<div class="screen grouped">${H.status()}
    <div class="large-title"><div class="lt-row"><span>Commitments</span><button class="icon-btn" data-nav="settings">⚙</button></div></div>
    <div class="screen-scroll" style="display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:24px;gap:14px">
      <div style="width:96px;height:96px;border-radius:24px;background:var(--fill-2)"></div>
      <div class="title2">Nothing to watch yet</div>
      <div class="footnote" style="max-width:300px">Scan your first document — a BNPL offer, a contract, a scary letter. 30 seconds, no sign-up.</div>
      <div class="stack gap-8" style="width:100%;max-width:320px;margin-top:6px">
        ${H.btn({ label: 'Scan a document', nav: 'scan-capture', testid: 'empty-scan' })}
        ${H.btn({ label: 'Try a sample first', kind: 'plain', nav: 'decode-result' })}</div>
    </div>${H.tabbar('home')}</div>` },

  // ===== scan (sheet) =====
  'scan-capture': { title: 'Scan · Add a document', group: 'Scan', html: () => `<div class="screen grouped" style="background:#00000040">
    <div class="sheet-scrim" style="position:static;flex:1"><div class="sheet">
      <div class="grabber"></div><div class="sheet-title">Add a document</div>
      ${H.group([
        H.row({ icon: '📷', title: 'Take a photo', sub: 'Point at the offer, T&Cs or letter', chevron: true, nav: 'perm-camera', testid: 'scan-photo' }),
        H.row({ icon: '🖼', title: 'Choose from library', sub: 'Screenshots & saved PDFs', chevron: true, nav: 'scan-review' }),
        H.row({ icon: '✉', title: 'Forward an email', sub: 'decode-me@inbox.decode.app', chevron: true, nav: 'scan-review' }),
      ])}
      <div style="padding:16px">${H.btn({ label: 'Cancel', kind: 'gray', nav: 'overview' })}</div>
    </div></div></div>` },

  'scan-camera': { title: 'Scan · Camera', group: 'Scan', html: () => `<div class="screen" style="background:#111;color:#fff">${H.status()}
    <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:space-between;padding:24px 0">
      <div class="footnote" style="color:#fff">Position the document in frame</div>
      <div style="width:300px;height:380px;border:2px dashed #ffffff66;border-radius:14px"></div>
      <div style="display:flex;align-items:center;gap:36px;padding-bottom:env(safe-area-inset-bottom)">
        <button class="footnote" style="color:#fff" data-nav="scan-review">Upload</button>
        <button data-nav="scan-processing" data-testid="shutter" style="width:72px;height:72px;border-radius:50%;background:#fff;border:4px solid #ffffff66"></button>
        <span style="width:44px" class="footnote" style="color:#fff">1/1</span>
      </div></div></div>` },

  'scan-review': { title: 'Scan · Check the scan', group: 'Scan', html: () => `<div class="screen grouped">${H.status()}
    ${H.nav({ title: 'Check the scan', left: H.closeBtn('scan-capture') })}
    <div class="screen-scroll pad-h" style="padding-top:8px">
      <div class="card" style="height:330px;display:flex;flex-direction:column;gap:8px">${Array.from({length:8}).map((_,i)=>`<div style="height:8px;width:${i%3?90:60}%;background:var(--fill-2);border-radius:4px"></div>`).join('')}</div>
      <div class="card" style="margin-top:14px;display:flex;gap:10px;align-items:center"><span class="glyph-badge sev-high"></span><div class="footnote">Looks a bit blurry — text may be misread. Retake in better light for an accurate decode.</div></div>
    </div>
    <div class="action-bar">${H.btn({ label: 'Retake', kind: 'gray', nav: 'scan-camera' })}${H.btn({ label: 'Use anyway', kind: 'plain', nav: 'scan-processing' })}</div></div>` },

  'scan-processing': { title: 'Scan · Processing', group: 'Scan',
    html: () => `<div class="screen grouped">${H.status()}
      ${H.nav({ title: '', left: H.closeBtn('scan-capture') })}
      <div class="screen-scroll" style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;padding:24px">
        <div class="title2" id="proc-stage">Reading your document…</div>
        <div class="footnote" id="proc-sub">This usually takes a few seconds.</div>
        <div class="footnote">Numbers are calculated by code, never guessed.</div>
        ${H.btn({ label: 'Cancel', kind: 'plain', nav: 'scan-capture' })}
      </div></div>`,
    mount: (root, ctx) => {
      const stages = ['Reading your document…', 'Extracting the figures…', 'Calculating the true cost…', 'Checking for traps…'];
      let i = 0; const el = root.querySelector('#proc-stage');
      ctx.timer = setInterval(() => { i++; if (i < stages.length) { el.textContent = stages[i]; } else { clearInterval(ctx.timer); ctx.go('decode-result'); } }, 900);
    } },

  // ===== decode-result (HIG nav with Done · 3-language provenance + legend · severity glyphs · efficacy) =====
  'decode-result': { title: 'Decode result', group: 'Core', html: () => `<div class="screen">${H.status()}
    ${H.nav({ title: 'Klarna offer', left: H.doneBtn('overview', 'Done'), right: `<button class="nav-btn" data-nav="trust-repair" data-testid="flag-number">⚑</button>` })}
    <div class="screen-scroll pad-h" style="padding-top:4px">
      <div class="footnote">TRUE COST &nbsp; ${H.prov('calc')}</div>
      <div style="font-size:44px;font-weight:800;letter-spacing:.5px">£412</div>
      <div class="footnote">£64 more than the £348 headline price</div>

      <div class="hero-card" style="margin-top:16px;display:flex;justify-content:space-between;align-items:flex-start;gap:12px">
        <div><div class="headline">Goes on your credit file</div><div class="footnote">Reported to Experian + TransUnion</div>
          <div style="margin-top:8px">${H.prov('doc')}</div></div>
        <div style="font-size:30px;font-weight:800">YES</div></div>
      <div class="card" style="margin-top:10px;background:var(--fill);display:flex;gap:10px;align-items:flex-start">
        <span class="glyph-badge sev-info" style="margin-top:1px"></span>
        <div class="footnote"><b>What you can do:</b> pay on time and it won't affect your score. Missing a payment is what gets reported — set a reminder when you save this.</div></div>

      <div class="section-header" style="padding-left:0">Key terms</div>
      ${H.group([
        H.row({ title: 'Representative APR', value: '39.9%' }),
        H.row({ title: 'Late fee', value: '£5' }),
        H.row({ title: 'Total repayable', value: '£412' }),
      ])}
      <div class="footnote" style="margin-top:8px;display:flex;gap:8px;flex-wrap:wrap">Legend: ${H.prov('calc')} we computed · ${H.prov('doc')} read verbatim · ${H.prov('ai')} AI-written</div>

      <div class="section-header" style="padding-left:0">Traps (2)</div>
      ${H.group([
        H.row({ icon: '<span class="glyph-badge sev-high"></span>', title: 'Late fee £5', sub: 'If a payment is 14+ days late', chevron: true }),
        H.row({ icon: '<span class="glyph-badge sev-info"></span>', title: 'No Section 75 protection', sub: 'Fewer rights if the retailer fails', chevron: true }),
      ])}

      <div class="card" style="margin-top:14px;background:var(--fill)">
        <div style="margin-bottom:6px">${H.prov('ai')}</div>
        <div class="footnote" style="color:var(--label)">A credit agreement for £348 over 6 payments of £58. Pay on time and it costs nothing extra. Miss one and you face a £5 fee and it may show on your credit file.</div></div>
      <div class="footnote" style="margin:12px 0 16px">Decode explains your documents — it doesn't give financial advice. Free help: MoneyHelper · StepChange.</div>
    </div>
    <div class="action-bar">${H.btn({ label: 'Ask', kind: 'gray', nav: 'ask', testid: 'result-ask' })}${H.btn({ label: 'Save & watch', nav: 'overview', testid: 'result-save' })}</div></div>` },

  // ===== ask (typing indicator + citations + distress signpost) =====
  'ask': { title: 'Ask', group: 'Core',
    html: () => `<div class="screen">${H.status()}
      ${H.nav({ title: 'Ask about this', left: H.backBtn('decode-result') })}
      <div class="screen-scroll pad-h stack gap-12" id="chat" style="padding-top:12px;padding-bottom:12px">
        <div class="chat-bubble me">Will this affect my credit score?</div>
        <div class="stack gap-8" style="align-items:flex-start"><div class="chat-bubble them">Yes — it's reported to Experian & TransUnion, so a missed payment could show for up to 6 years.</div>${H.pill('From your doc · p.1', 'sev-ok')}</div>
        <div class="chat-bubble them typing" id="typing"><span></span><span></span><span></span></div>
      </div>
      <div style="padding:0 12px 8px;display:flex;gap:8px;flex-wrap:wrap">
        <button class="pill" data-nav="qa-signpost" data-testid="ask-distress" style="border:none">I can't pay these →</button>
        <button class="pill" style="border:none">Add interest later?</button></div>
      <div class="input-bar"><div class="text-field">Ask about your document…</div><button class="icon-btn" style="background:var(--label);color:#fff">↑</button></div></div>`,
    mount: (root) => { setTimeout(() => { const t = root.querySelector('#typing'); if (t) { t.classList.remove('typing'); t.innerHTML = "It only mentions a £5 late fee. Cancelling a card usually doesn't stop the agreement — the debt stays."; } }, 1600); } },

  'qa-signpost': { title: 'Ask · Debt signpost', group: 'Core', html: () => `<div class="screen">${H.status()}
    ${H.nav({ title: 'Ask about this', left: H.backBtn('ask') })}
    <div class="screen-scroll pad-h stack gap-12" style="padding-top:12px">
      <div class="chat-bubble me">Honestly I don't think I can pay any of these this month</div>
      <div class="card" style="background:var(--fill)"><div style="margin-bottom:8px">${H.pill("You're not alone in this")}</div>
        <div class="footnote" style="color:var(--label)">That's a really common place to be — and there are free, confidential services whose whole job is to help. No judgement, no selling.</div>
        <div style="margin-top:12px">${H.group([
          H.row({ title: 'StepChange', sub: 'Free debt advice · 0800 138 1111', chevron: true }),
          H.row({ title: 'National Debtline', sub: 'Free advice · 0808 808 4000', chevron: true }),
          H.row({ title: 'MoneyHelper', sub: 'Government-backed guidance', chevron: true }),
        ])}</div>
        <div class="footnote" style="margin-top:10px">Decode explains your documents — it can't give debt advice. These services can, for free.</div></div>
    </div></div>` },

  'trust-repair': { title: 'Trust repair', group: 'Core', html: () => `<div class="screen grouped">${H.status()}
    ${H.nav({ title: 'Does this look wrong?', left: H.closeBtn('decode-result') })}
    <div class="screen-scroll pad-h stack gap-16" style="padding-top:12px">
      <div class="card" style="background:var(--fill);display:flex;justify-content:space-between;align-items:center"><div><div class="footnote">YOU FLAGGED</div><div class="headline">Total repayable</div></div><div class="title2">£412</div></div>
      <div class="footnote" style="color:var(--label)">Thanks for catching this. Decode reads the numbers straight from your document — it doesn't guess — but it can only be as accurate as the scan. Let's check it together.</div>
      <div class="card outline"><div class="footnote">WE READ THIS FROM PAGE 1</div><div style="margin:6px 0">"£412.00 — Total amount payable"</div><button class="btn-plain" style="padding:0">View in your document ›</button></div>
      <div><div class="headline" style="margin-bottom:6px">What should it say?</div><div class="text-field" style="border-radius:10px;height:44px">e.g. £420.00</div></div>
      <div>${H.pill('Calculated', 'sev-calc')} <span class="footnote">Totals are computed by code from what you confirm.</span></div>
    </div>
    <div class="action-bar" style="flex-direction:column">${H.btn({ label: 'Re-check with my correction', nav: 'decode-result' })}${H.btn({ label: 'Actually, it was right', kind: 'plain', nav: 'decode-result' })}</div></div>` },

  // ===== watch / radar (entry from overview bell + free/Pro gate) =====
  'alerts': { title: 'Renewal Radar', group: 'Watch', html: (ctx) => `<div class="screen grouped">${H.status()}
    ${H.nav({ title: 'Renewal Radar', left: H.backBtn('overview') })}
    <div class="screen-scroll">
      <div class="section-header">Coming up · next 14 days</div>
      ${H.group([
        H.row({ icon: '!', title: 'Klarna payment due', sub: 'In 4 days · 28 Jun · £294', chevron: true, nav: 'alert-detail', testid: 'alert-row' }),
        H.row({ icon: '↻', title: 'Boiler cover auto-renews', sub: 'In 14 days · £312 (+18%)', chevron: true, nav: 'alert-detail' }),
      ])}
      <div class="list-group" style="margin-top:14px;opacity:.7">
        <div class="list-row"><span class="lr-icon">🔒</span><div class="lr-main"><div class="lr-title">Watching 2 of 6 commitments</div><div class="lr-sub">Unlock reminders for all with Pro</div></div></div>
        <div class="list-row tappable" data-nav="paywall" data-testid="radar-upgrade"><div class="lr-main"><div class="lr-title" style="font-weight:600">Unlock all with Pro</div></div><span class="lr-chevron">›</span></div>
      </div>
    </div>${H.tabbar('home')}</div>` },

  'alert-detail': { title: 'Alert detail', group: 'Watch', html: () => `<div class="screen grouped">${H.status()}
    ${H.nav({ title: 'Payment reminder', left: H.backBtn('alerts') })}
    <div class="screen-scroll pad-h" style="padding-top:8px">
      <div style="font-size:40px;font-weight:800">£294 <span class="pill" style="vertical-align:middle">In 4 days</span></div>
      <div class="footnote">Klarna · auto-collected on 28 Jun</div>
      <div style="margin-top:14px">${H.group([
        H.row({ title: 'What', value: '3rd of 3 overlapping' }),
        H.row({ title: 'When', value: '28 Jun · auto' }),
        H.row({ title: 'If you miss it', value: '£5 · credit file' }),
      ])}</div>
      <div class="card" style="margin-top:14px;background:var(--fill);display:flex;gap:10px"><span class="glyph-badge sev-high"></span><div class="footnote">This lands the same week as Clearpay (£62) and PayPal (£40) — £396 leaving by 28 Jun.</div></div>
    </div>
    <div class="action-bar" style="flex-direction:column">${H.btn({ label: 'Move money / open Klarna', nav: 'overview' })}${H.btn({ label: 'Snooze 3 days', kind: 'plain', nav: 'alerts' })}</div></div>` },

  // ===== vault =====
  'vault-list': { title: 'Vault · List', group: 'Vault', html: () => `<div class="screen grouped">${H.status()}
    <div class="large-title">Vault</div>
    <div class="pad-h"><div class="text-field" style="margin-bottom:10px" data-nav="empty-no-results" data-testid="vault-search">🔍 Search documents</div>
      <div style="display:flex;gap:8px;margin-bottom:6px">${['All','Renewing','BNPL','Active'].map((c,i)=>`<span class="pill" style="${i===0?'background:var(--label);color:#fff':''}">${c}</span>`).join('')}</div></div>
    <div class="screen-scroll">${H.group([
      H.row({ icon: 'K', title: 'Klarna BNPL offer', sub: 'Decoded 14 May · £412 · 3 plans', chevron: true, nav: 'vault-detail', testid: 'vault-row' }),
      H.row({ icon: 'B', title: 'Boiler cover renewal', sub: 'Renews 24 Jun · £312', chevron: true, nav: 'alert-detail' }),
      H.row({ icon: 'C', title: 'Clearpay · Sofa', sub: 'Payment 2 of 4 · 28 Jun', chevron: true, nav: 'vault-detail' }),
    ])}</div>${H.tabbar('vault')}</div>` },

  'vault-detail': { title: 'Vault · Document detail', group: 'Vault', html: () => `<div class="screen grouped">${H.status()}
    ${H.nav({ title: 'Klarna offer', left: H.backBtn('vault-list', 'Vault') })}
    <div class="screen-scroll">
      ${H.group([
        H.row({ title: 'Total repayable', sub: 'Calculated', value: '£412' }),
        H.row({ title: 'Next payment', sub: 'From your doc', value: '£58 · 28 May' }),
        H.row({ title: 'Goes on credit file', sub: 'From your doc', value: 'YES' }),
        H.row({ title: 'Late fee', sub: 'p.2 §4', value: '£5' }),
      ])}
      <div class="section-footer">Cancel before the next payment if returning the item.</div>
    </div>
    <div class="action-bar" style="flex-direction:column">${H.btn({ label: 'Ask about this document', kind: 'gray', nav: 'ask' })}${H.btn({ label: 'Stop watching · Delete', kind: 'plain', nav: 'vault-list' })}</div></div>` },

  // ===== settings =====
  'settings': { title: 'Settings', group: 'System', html: () => `<div class="screen grouped">${H.status()}
    ${H.nav({ title: 'Settings', left: H.backBtn('overview') })}
    <div class="screen-scroll">
      <div class="section-header">Subscription</div>
      ${H.group([H.row({ title: 'Manage subscription', sub: 'Free · 3 of 5 decodes used', chevron: true, nav: 'paywall', testid: 'settings-sub' }), H.row({ title: 'Account', sub: 'eluvrv@gmail.com', chevron: true, nav: 'account' })])}
      <div class="section-header">Your data & privacy</div>
      ${H.group([H.row({ title: 'Privacy choices', sub: 'AI processing · analytics', chevron: true, nav: 'consent-center' }), H.row({ title: 'What Decode stores', chevron: true, nav: 'privacy-policy' }), H.row({ title: 'Delete everything', sub: "Can't undo", chevron: true, danger: true, nav: 'delete-account' })])}
      <div class="section-header">Notifications</div>
      ${H.group([H.row({ title: 'Reminders & deadlines', sub: 'Renewal Radar · local only', value: 'On', chevron: true, nav: 'perm-notifications' })])}
      <div class="section-header">Help & legal</div>
      ${H.group([H.row({ title: 'Email a human', sub: 'We reply within 24h', chevron: true }), H.row({ title: 'Free debt help', sub: 'MoneyHelper · StepChange', chevron: true }), H.row({ title: "Decode explains, it doesn't advise", chevron: true, nav: 'legal-disclaimer' })])}
      <div class="section-footer">Decode v0.1 · made in the UK · explains, doesn't advise.</div>
      <div style="height:20px"></div>
    </div></div>` },

  // ===== paywall =====
  'paywall': { title: 'Paywall · Decode Pro', group: 'System', html: () => `<div class="screen grouped">${H.status()}
    ${H.nav({ title: 'Decode Pro', left: H.closeBtn('overview') })}
    <div class="screen-scroll pad-h" style="padding-top:4px">
      <div class="title1" style="padding:0">Keep decoding without limits</div>
      <div class="footnote">You've used 5 of 5 free decodes this month.</div>
      <div style="margin-top:14px">${H.group([
        H.row({ icon: '<span class="glyph-badge sev-ok"></span>', title: 'Unlimited decodes' }),
        H.row({ icon: '<span class="glyph-badge sev-ok"></span>', title: 'Full Vault & history' }),
        H.row({ icon: '<span class="glyph-badge sev-ok"></span>', title: 'Renewal Radar for everything' }),
      ])}</div>
      <div style="margin-top:14px">${H.group([
        H.row({ title: 'Yearly', sub: '£3.50/mo · billed yearly', value: '£41.99', testid: 'plan-yearly' }),
        H.row({ title: 'Monthly', sub: 'Billed monthly', value: '£4.99' }),
      ])}</div>
    </div>
    <div class="action-bar" style="flex-direction:column">${H.btn({ label: 'Start 7-day free trial', nav: 'overview', testid: 'paywall-cta' })}<div class="footnote center" style="padding:4px 8px 0">Then £41.99/year. Cancel anytime. Billed by Apple.</div></div></div>` },

  // ===== error / empty states =====
  'error-offline': { title: 'Error · Offline', group: 'States', html: stateScaffold({ glyph: '⚠', navTitle: 'Connection', title: "You're offline", body: 'Decode needs a connection to read new documents. Your saved Vault still works offline.', primary: { label: 'Try again', to: 'overview' }, secondary: { label: 'Open Vault', to: 'vault-list' } }) },
  'error-decode-failed': { title: 'Error · Decode failed', group: 'States', html: stateScaffold({ glyph: '⚠', navTitle: 'Decoding', title: "That didn't work — and it's on us", body: "We couldn't finish reading this. You haven't used a decode. Try again, or send it over.", primary: { label: 'Try again', to: 'scan-processing' }, secondary: { label: 'Send to support', to: 'overview' } }) },
  'error-limit-reached': { title: 'Error · Free limit', group: 'States', html: stateScaffold({ glyph: '✦', navTitle: 'Free limit', title: "You've used your 5 free decodes", body: 'They reset on 1 Jul. Unlock unlimited scanning, the full Vault and Renewal Radar with Pro.', primary: { label: 'See Pro', to: 'paywall' }, secondary: { label: 'Maybe next month', to: 'overview' } }) },
  'error-camera-denied': { title: 'Error · Camera off', group: 'States', html: stateScaffold({ glyph: '📷', navTitle: 'Camera', title: 'Camera access is off', body: "Decode needs the camera to scan. Turn it on in Settings — we only use it while you scan.", primary: { label: 'Open Settings', to: 'settings' }, secondary: { label: 'Choose from library', to: 'scan-review' } }) },
  'empty-no-results': { title: 'Empty · No results', group: 'States', html: stateScaffold({ glyph: '🔍', navTitle: 'Vault', title: 'No documents match', body: 'Nothing in your Vault matches that search. Try a different word, or scan something new.', primary: { label: 'Clear search', to: 'vault-list' } }) },
  'error-purchase-failed': { title: 'Error · Purchase failed', group: 'States', html: stateScaffold({ glyph: '⚠', navTitle: 'Decode Pro', title: "Payment didn't go through", body: "Apple couldn't complete the purchase and you haven't been charged. Try again or change method.", primary: { label: 'Try again', to: 'paywall' }, secondary: { label: 'Not now', to: 'settings' } }) },

  // ===== design-system showcase (component states) =====
  'styleguide': { title: '◆ Design system', group: 'Design system', html: () => {
    const b = (cls, label, extra = '') => `<button class="btn ${cls} btn-sm" ${extra}>${label}</button>`;
    const btnStates = (kind) => `<div class="sg-row">
      ${b('btn-' + kind, 'Default')}${b('btn-' + kind + ' is-pressed', 'Pressed')}${b('btn-' + kind, 'Disabled', 'aria-disabled="true"')}${b('btn-' + kind + ' is-loading', 'Loading')}</div>`;
    return `<div class="screen grouped">${H.status()}
      ${H.nav({ title: 'Design system', left: H.backBtn('overview') })}
      <div class="screen-scroll">
        <div class="sg-section">Type scale</div>
        <div style="padding:2px 16px 8px"><div class="title1">Large title</div><div class="title2">Title 2</div><div class="headline">Headline</div><div>Body 17</div><div class="footnote">Footnote 13</div></div>

        <div class="sg-section">Button · Filled (primary)</div>${btnStates('filled')}
        <div class="sg-section">Button · Gray (secondary)</div>${btnStates('gray')}
        <div class="sg-section">Button · Plain (tinted)</div>
        <div class="sg-row">${b('btn-plain', 'Default')}${b('btn-plain is-pressed', 'Pressed')}${b('btn-plain', 'Disabled', 'aria-disabled="true"')}</div>
        <div class="sg-section">Button · Destructive / Apple</div>
        <div class="sg-row">${b('btn-destructive', '🗑 Delete everything')}${b('btn-apple', 'Sign in with Apple')}</div>

        <div class="sg-section">Switch · off / on</div>
        <div class="sg-row"><div class="switch" role="switch" aria-checked="false"></div><div class="switch" role="switch" aria-checked="true"></div></div>

        <div class="sg-section">Segmented control</div>
        <div style="padding:6px 16px 10px"><div class="segmented">${RANGES.map((x, i) => `<div class="seg ${i === 1 ? 'active' : ''}">${x[0]}<span class="seg-val">${x[1]}</span></div>`).join('')}</div></div>

        <div class="sg-section">Text field · default / focus / filled / error</div>
        <div class="sg-row" style="flex-direction:column;align-items:stretch">
          <div class="text-field" style="border-radius:10px;height:44px">Placeholder</div>
          <div class="text-field focus" style="border-radius:10px;height:44px">Focused…</div>
          <div class="text-field filled" style="border-radius:10px;height:44px">£420.00</div>
          <div class="text-field error" style="border-radius:10px;height:44px">£abc</div><div class="field-error">Enter a valid amount</div></div>

        <div class="sg-section">Chips · default / selected / disabled</div>
        <div class="sg-row"><span class="pill chip">All</span><span class="pill chip selected">Renewing</span><span class="pill chip disabled">BNPL</span></div>

        <div class="sg-section">List rows · states</div>
        ${H.group([
          H.row({ icon: 'K', title: 'Default row', sub: 'with subtitle', chevron: true }),
          H.row({ title: 'Row with value', value: '£294' }),
          `<div class="list-row selected"><span class="lr-icon">B</span><div class="lr-main"><div class="lr-title">Selected row</div></div><span class="lr-check"></span></div>`,
          H.row({ title: 'Destructive row', danger: true }),
        ])}

        <div class="sg-section">Severity glyphs (shape, not colour)</div>
        <div class="sg-row">
          <span class="pill"><span class="glyph-badge sev-high"></span>High</span>
          <span class="pill"><span class="glyph-badge sev-info"></span>Info</span>
          <span class="pill"><span class="glyph-badge sev-ok"></span>OK</span>
          <span class="pill"><span class="glyph-badge sev-calc"></span>Calc</span></div>

        <div class="sg-section">Provenance · 3 trust languages</div>
        <div class="sg-row">${H.prov('calc')}${H.prov('doc')}${H.prov('ai')}</div>

        <div class="sg-section">Grayscale ramp (tokens)</div>
        <div class="sg-row">${['#fff', '#f2f2f7', '#d1d1d6', '#8e8e93', '#3a3a3c', '#1c1c1e'].map((c) => `<div class="swatch" style="background:${c}"></div>`).join('')}</div>
        <div style="height:24px"></div>
      </div></div>`;
  } },

  // ===== App Store P0 + insurance (parity with Figma) =====
  'perm-camera': { title: 'Permission · Camera', group: 'App Store', html: stateScaffold({ glyph: '📷', navTitle: 'Camera', title: 'Scan with the camera', body: 'Decode needs the camera to read your documents. We only use it while you scan — and delete the photo afterwards.', primary: { label: 'Allow camera', to: 'scan-camera' }, secondary: { label: 'Choose from library', to: 'scan-review' } }) },
  'perm-notifications': { title: 'Permission · Notifications', group: 'App Store', html: stateScaffold({ glyph: '🔔', navTitle: 'Notifications', title: 'Never miss a payment', body: 'Renewal Radar reminds you before each due date. Reminders stay on your phone — no account needed.', primary: { label: 'Allow notifications', to: 'overview' }, secondary: { label: 'Maybe later', to: 'overview' } }) },
  'perm-faceid': { title: 'Permission · Face ID', group: 'App Store', html: stateScaffold({ glyph: '🔒', navTitle: 'Face ID', title: 'Lock your Vault with Face ID', body: 'Your documents are private. Face ID makes sure only you can open the Vault.', primary: { label: 'Use Face ID', to: 'overview' }, secondary: { label: 'Use a passcode', to: 'overview' } }) },
  'delete-account': { title: 'Delete account', group: 'App Store', html: stateScaffold({ glyph: '⚠', navTitle: 'Delete account', title: 'Delete everything?', body: "This permanently removes your Vault, every decoded document and your account. This can't be undone.", primary: { label: 'Delete everything', to: 'overview-empty' }, secondary: { label: 'Cancel', to: 'account' } }) },

  'account': { title: 'Account', group: 'App Store', html: () => `<div class="screen grouped">${H.status()}
    ${H.nav({ title: 'Account', left: H.backBtn('settings', 'Settings') })}
    <div class="screen-scroll">
      ${H.group([H.row({ title: 'Email', value: 'eluvrv@gmail.com' }), H.row({ title: 'Subscription', sub: 'Free · 3 of 5 decodes', chevron: true, nav: 'paywall' })])}
      <div style="height:12px"></div>${H.group([H.row({ title: 'Restore purchases', chevron: true })])}
      <div style="height:12px"></div>${H.group([H.row({ title: 'Sign out' })])}
      <div style="height:12px"></div>${H.group([H.row({ title: 'Delete account & data', sub: 'Permanently removes everything', chevron: true, nav: 'delete-account', danger: true })])}
    </div></div>` },

  'consent-center': { title: 'Privacy choices', group: 'App Store', html: () => {
    const sw = (on) => `<div class="switch" role="switch" aria-checked="${on}"></div>`;
    const r = (t, s, on) => `<div class="list-row"><div class="lr-main"><div class="lr-title">${t}</div><div class="lr-sub">${s}</div></div>${sw(on)}</div>`;
    return `<div class="screen grouped">${H.status()}
      ${H.nav({ title: 'Privacy choices', left: H.backBtn('settings', 'Settings') })}
      <div class="screen-scroll">
        <div class="section-header">What Decode processes</div>
        <div class="list-group">${r('AI document reading', 'Sends docs to Anthropic Claude · required', true)}${r('Product analytics', 'Helps us improve · optional', false)}${r('Crash reports', 'Diagnostics only · optional', false)}</div>
        <div class="section-footer">Change these anytime. AI reading is required for decoding — turning it off disables the core feature. Nothing is used to train AI.</div>
        <div style="height:12px"></div>${H.group([H.row({ title: 'Export my data', chevron: true }), H.row({ title: 'Delete everything', sub: "Can't undo", chevron: true, nav: 'delete-account', danger: true })])}
      </div></div>`;
  } },

  'privacy-policy': { title: 'Privacy Policy', group: 'App Store', html: () => `<div class="screen grouped">${H.status()}
    ${H.nav({ title: 'Privacy Policy', left: H.backBtn('settings', 'Settings') })}
    <div class="screen-scroll pad-h" style="padding-top:8px">
      <div class="footnote" style="color:var(--label)">Last updated 19 Jun 2026.</div>
      <div class="headline" style="margin-top:14px">What we collect</div><div class="footnote">The documents you scan, the figures we extract, your reminders, and basic analytics (if you allow). No bank connection, ever.</div>
      <div class="headline" style="margin-top:14px">How documents are read</div><div class="footnote">We send them to Anthropic's Claude over an encrypted connection to produce your result. Not used to train AI. We don't keep the original photo by default.</div>
      <div class="headline" style="margin-top:14px">Retention & deletion</div><div class="footnote">Saved decodes stay until you delete them. Delete everything removes your documents and account permanently.</div>
      <div class="headline" style="margin-top:14px">Your rights (UK GDPR)</div><div class="footnote">Access, export, correct or delete anytime from Settings → Privacy.</div>
      <div style="height:24px"></div>
    </div></div>` },

  'legal-disclaimer': { title: 'Important', group: 'App Store', html: () => `<div class="screen grouped">${H.status()}
    ${H.nav({ title: 'Important', left: H.backBtn('settings', 'Settings') })}
    <div class="screen-scroll pad-h" style="padding-top:8px">
      <div style="color:var(--label)">Decode explains what's in your documents. It does not give financial, debt or legal advice, and is not regulated by the FCA.</div>
      <div class="headline" style="margin-top:14px">What Decode does</div><div class="footnote">Reads your documents, calculates figures by code (not AI guesswork), explains terms in plain English so you can decide for yourself.</div>
      <div class="headline" style="margin-top:14px">What Decode is not</div><div class="footnote">It never tells you what you should do, recommends a product, or replaces regulated advice.</div>
      <div class="headline" style="margin-top:14px">If money is a worry</div><div class="footnote">Free, confidential help: StepChange 0800 138 1111 · National Debtline 0808 808 4000 · MoneyHelper.</div>
      <div style="height:24px"></div>
    </div></div>` },

  'decode-result-insurance': { title: 'Decode · Insurance', group: 'Core', html: () => `<div class="screen">${H.status()}
    ${H.nav({ title: 'Boiler cover renewal', left: H.doneBtn('overview', 'Done') })}
    <div class="screen-scroll pad-h" style="padding-top:4px">
      <div class="footnote">THIS YEAR · RENEWS 24 JUN &nbsp; ${H.prov('calc')}</div>
      <div style="font-size:44px;font-weight:800">£312</div>
      <div class="footnote">Up £47 (+18%) on last year — for the same cover</div>
      <div style="margin-top:14px">${H.group([
        H.row({ title: 'Last year', sub: 'From your letter', value: '£265' }),
        H.row({ title: 'This year', sub: 'From your letter', value: '£312' }),
        H.row({ title: 'Change', sub: 'Calculated', value: '+£47 (+18%)' }),
        H.row({ title: 'Auto-renews', sub: 'From your letter', value: '24 Jun · yes' }),
      ])}</div>
      <div class="card" style="margin-top:14px;background:var(--fill)"><div class="headline">You can shop around</div><div class="footnote" style="margin-top:4px">Your insurer must show last year's price for a reason. The same cover is quoted elsewhere from ~£240 — switching or haggling before 24 Jun could save ~£70.</div></div>
      <div class="section-header" style="padding-left:0">Traps (2)</div>
      ${H.group([
        H.row({ icon: '<span class="glyph-badge sev-high"></span>', title: 'Auto-renews by default', sub: 'Charged £312 on 24 Jun unless you act', chevron: true }),
        H.row({ icon: '<span class="glyph-badge sev-info"></span>', title: 'Price walking', sub: 'Up 18% with no change in cover', chevron: true }),
      ])}
      <div class="footnote" style="margin:12px 0 16px">Decode explains your documents — it doesn't give advice. Free help: MoneyHelper · Citizens Advice.</div>
    </div>
    <div class="action-bar">${H.btn({ label: 'Ask', kind: 'gray', nav: 'ask' })}${H.btn({ label: 'Save & watch', nav: 'overview' })}</div></div>` },
};

const FLOWS = {
  'first-decode': { name: 'First decode (J1)', sub: 'Onboarding → scan → result', steps: ['onboarding-1', 'onboarding-2', 'onboarding-3', 'scan-capture', 'perm-camera', 'scan-camera', 'scan-review', 'scan-processing', 'decode-result', 'overview'] },
  'ask': { name: 'Ask (J4)', sub: 'Result → ask → signpost', steps: ['decode-result', 'ask', 'qa-signpost'] },
  'insurance': { name: 'Insurance renewal (doc #2)', sub: 'Scan → insurance decode', steps: ['scan-capture', 'scan-processing', 'decode-result-insurance', 'overview'] },
  'permissions': { name: 'Permissions', sub: 'Camera · notifications · Face ID', steps: ['perm-camera', 'perm-notifications', 'perm-faceid'] },
  'account-legal': { name: 'Account & legal (App Store)', sub: 'Settings → account/privacy/legal', steps: ['settings', 'account', 'delete-account', 'consent-center', 'privacy-policy', 'legal-disclaimer'] },
  'watch': { name: 'Watch / Radar (J3)', sub: 'Overview → bell → alert', steps: ['overview', 'alerts', 'alert-detail'] },
  'vault': { name: 'Vault (J6)', sub: 'Overview → vault → detail', steps: ['overview', 'vault-list', 'vault-detail'] },
  'monetize': { name: 'Monetize', sub: 'Limit → paywall', steps: ['error-limit-reached', 'paywall', 'overview'] },
  'trust': { name: 'Trust repair', sub: 'Result → flag → re-check', steps: ['decode-result', 'trust-repair', 'decode-result'] },
  'onboarding': { name: 'Onboarding', sub: 'Welcome → consent → sample', steps: ['onboarding-1', 'onboarding-2', 'onboarding-3', 'onboarding-4', 'overview-empty'] },
  'errors': { name: 'Error & empty states', sub: 'All 6 states', steps: ['error-offline', 'error-decode-failed', 'error-limit-reached', 'error-camera-denied', 'empty-no-results', 'error-purchase-failed'] },
};

window.HIG = H;
window.SCREENS = SCREENS;
window.FLOWS = FLOWS;
window.DEFAULT_STATE = DEFAULT_STATE;
