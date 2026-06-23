// Decode clickable prototype — vanilla JS, no build.
// Screens render the lo-fi wireframe PNGs; WORKING tap hotspots are overlaid
// directly on the phone screen (positioned over the real buttons), plus a
// named-flow step runner. Every control has a data-testid so Playwright can
// walk every flow. Hotspot rect = [left%, top%, width%, height%] of the frame.

const IMG = '../design/wireframes/figma/';

const SCREENS = {

  // ── ONBOARDING ──────────────────────────────────────────────────────────────
  'onboarding-1': { title: 'Onboarding · Welcome', img: 'onboarding-1-welcome.png', hotspots: [
    { label: 'Scan a document', to: 'scan-capture',  rect: [12, 76, 76, 7] },
    { label: 'Continue with Apple', to: 'onboarding-2', rect: [22, 86, 56, 5] } ] },

  'onboarding-2': { title: 'Onboarding · Trust', img: 'onboarding-2.png', hotspots: [
    { label: 'How Decode works', to: 'how-it-works', rect: [25, 82, 50, 5] },
    { label: 'Continue', to: 'onboarding-3', rect: [12, 90, 76, 6] } ] },

  'onboarding-3': { title: 'Onboarding · No document', img: 'onboarding-3-nodoc.png', hotspots: [
    { label: 'Try a sample', to: 'decode-result', rect: [4, 22, 92, 9] },
    { label: 'Decode something you signed', to: 'scan-capture', rect: [4, 33, 92, 9] },
    { label: 'Skip for now', to: 'onboarding-4', rect: [12, 90, 76, 6] } ] },

  'onboarding-4': { title: 'Onboarding · Register', img: 'onboarding-4-register.png', hotspots: [
    { label: 'Sign in with Apple', to: 'cockpit-empty', rect: [12, 76, 76, 6] },
    { label: 'Continue with email', to: 'email-auth', rect: [12, 83, 76, 6] },
    { label: 'Skip — keep on device', to: 'cockpit-empty', rect: [22, 90, 56, 5] } ] },

  'email-auth': { title: 'Sign in with email', img: 'onboarding-4-register.png', hotspots: [
    { label: 'Back', to: 'onboarding-4', rect: [1, 6, 16, 5] },
    { label: 'Sign in', to: 'cockpit-empty', rect: [12, 86, 76, 6] },
    { label: 'Create account', to: 'cockpit-empty', rect: [22, 92, 56, 5] },
    { label: 'Forgot password', to: 'email-auth', rect: [55, 80, 40, 4] } ] },

  // ── SCAN FLOW ────────────────────────────────────────────────────────────────
  'scan-capture': { title: 'Scan · Add a document', img: 'scan-capture.png', hotspots: [
    { label: 'Take a photo', to: 'scan-camera',  rect: [4, 52, 92, 8] },
    { label: 'Choose from library', to: 'scan-review', rect: [4, 61, 92, 8] },
    { label: 'Cancel', to: 'cockpit', rect: [25, 92, 50, 5] } ] },

  'scan-camera': { title: 'Scan · Camera', img: 'scan-camera-wireframe.png', hotspots: [
    { label: 'Cancel / close', to: 'scan-capture', rect: [0, 0, 20, 8] },
    { label: 'Capture', to: 'scan-review', rect: [38, 80, 24, 13] },
    { label: 'Upload from Photos', to: 'scan-review', rect: [25, 94, 50, 4] } ] },

  'scan-review': { title: 'Scan · Check the scan', img: 'scan-review.png', hotspots: [
    { label: 'Discard (× close)', to: 'scan-review-discard', rect: [1, 7, 12, 6] },
    { label: '+ page (multi-page)', to: 'multi-page-scan', rect: [23, 65, 24, 8] },
    { label: 'Retake', to: 'scan-camera',    rect: [4, 93, 44, 6] },
    { label: 'Use this scan', to: 'scan-processing', rect: [52, 93, 44, 6] } ] },

  'scan-review-discard': { title: 'Discard scan?', img: 'scan-review.png', hotspots: [
    { label: 'Discard', to: 'scan-capture', rect: [12, 62, 76, 7] },
    { label: 'Keep scanning', to: 'scan-review', rect: [12, 70, 76, 6] } ] },

  'multi-page-scan': { title: 'Scan · Multi-page', img: 'multi-page-scan.png', hotspots: [
    { label: 'Back to scan', to: 'scan-review', rect: [1, 6, 16, 5] },
    { label: 'Decode all 3 pages', to: 'scan-processing', rect: [10, 89, 80, 8] } ] },

  'scan-processing': { title: 'Scan · Processing', img: 'scan-processing-wireframe.png', hotspots: [
    { label: 'Cancel', to: 'scan-capture', rect: [22, 92, 56, 6] },
    { label: 'BNPL / loan result', to: 'decode-result', rect: [10, 76, 80, 9] },
    { label: 'Insurance result', to: 'decode-result-insurance', rect: [10, 86, 80, 7] },
    { label: 'Could not read → error', to: 'error-decode-failed', rect: [70, 3, 28, 6] } ] },

  // ── DECODE RESULT ────────────────────────────────────────────────────────────
  'decode-result': { title: 'Decode result · BNPL', img: 'decode-result-wireframe.png', hotspots: [
    { label: 'Share', to: 'share-decode',  rect: [84, 6, 14, 5] },
    { label: 'This number looks wrong?', to: 'trust-repair', rect: [4, 11, 64, 7] },
    { label: 'Ask', to: 'ask',   rect: [4, 94, 44, 5] },
    { label: 'Save & watch', to: 'cockpit', rect: [52, 94, 44, 5] } ] },

  'decode-result-insurance': { title: 'Decode result · Insurance', img: 'decode-result-insurance.png', hotspots: [
    { label: 'Done', to: 'cockpit',      rect: [78, 6, 20, 5] },
    { label: 'Trap: auto-renews', to: 'vault-detail', rect: [4, 68, 92, 8] },
    { label: 'Trap: price walking', to: 'vault-detail', rect: [4, 76, 92, 8] },
    { label: 'Ask', to: 'ask',           rect: [4, 94, 44, 5] },
    { label: 'Save & watch', to: 'cockpit', rect: [52, 94, 44, 5] } ] },

  'share-decode': { title: 'Share this decode', img: 'share-decode.png', hotspots: [
    { label: 'Save as PDF', to: 'decode-result',         rect: [4, 36, 92, 8] },
    { label: 'Copy plain-text summary', to: 'decode-result', rect: [4, 44, 92, 8] },
    { label: 'Send to someone', to: 'decode-result',     rect: [4, 52, 92, 8] },
    { label: 'Save to Files', to: 'decode-result',       rect: [4, 60, 92, 8] },
    { label: 'Cancel', to: 'decode-result',              rect: [10, 90, 80, 7] } ] },

  'ask': { title: 'Ask', img: 'ask.png', hotspots: [
    { label: 'Back to result', to: 'decode-result', rect: [1, 6, 16, 5] },
    { label: 'I can\'t pay these (distress)', to: 'qa-signpost', rect: [4, 61, 70, 7] } ] },

  'qa-signpost': { title: 'Ask · Debt signpost', img: 'qa-signpost.png', hotspots: [
    { label: 'Back', to: 'ask', rect: [1, 6, 16, 5] } ] },

  'trust-repair': { title: 'Trust repair', img: 'trust-repair.png', hotspots: [
    { label: 'Re-check with my correction', to: 'decode-result', rect: [12, 87, 76, 6] },
    { label: 'Actually it was right', to: 'decode-result', rect: [25, 94, 50, 4] } ] },

  // ── COCKPIT / HOME ───────────────────────────────────────────────────────────
  'cockpit': { title: 'Cockpit (Home)', img: 'cockpit-wireframe.png', hotspots: [
    { label: 'Settings', to: 'settings', rect: [86, 6, 12, 5] },
    { label: 'Coming up this week ›', to: 'payment-calendar', rect: [4, 28, 92, 6] },
    { label: 'Traps / Renewal Radar', to: 'alerts-inbox', rect: [4, 34, 92, 6] },
    { label: 'Open a commitment', to: 'vault-detail', rect: [4, 41, 92, 9] },
    { label: '+ Scan', to: 'scan-capture', rect: [33, 92, 34, 7] },
    { label: 'Vault', to: 'vault-list',  rect: [67, 92, 33, 7] } ] },

  'cockpit-empty': { title: 'Cockpit · Empty (first run)', img: 'cockpit-empty.png', hotspots: [
    { label: 'Scan a document', to: 'scan-capture', rect: [12, 59, 76, 7] },
    { label: 'Try a sample first', to: 'decode-result', rect: [22, 68, 56, 5] },
    { label: '+ Scan', to: 'scan-capture', rect: [33, 92, 34, 7] },
    { label: 'Vault', to: 'vault-list',  rect: [67, 92, 33, 7] } ] },

  'payment-calendar': { title: 'Coming up · Payment calendar', img: 'payment-calendar.png', hotspots: [
    { label: 'Back to Home', to: 'cockpit', rect: [1, 6, 16, 5] },
    { label: 'Klarna · 3 plans', to: 'vault-detail', rect: [4, 22, 92, 7] },
    { label: 'Clearpay · Sofa', to: 'vault-detail', rect: [4, 29, 92, 7] },
    { label: 'PayPal · Headphones', to: 'vault-detail', rect: [4, 36, 92, 7] },
    { label: 'Boiler cover', to: 'vault-detail', rect: [4, 47, 92, 7] } ] },

  // ── VAULT ────────────────────────────────────────────────────────────────────
  'vault-list': { title: 'Vault · List', img: 'vault-list.png', hotspots: [
    { label: 'Search (no results)', to: 'empty-no-results', rect: [4, 13, 92, 6] },
    { label: 'Open document', to: 'vault-detail', rect: [4, 23, 92, 9] },
    { label: 'Home', to: 'cockpit',      rect: [0, 92, 33, 7] },
    { label: '+ Scan', to: 'scan-capture', rect: [33, 92, 34, 7] } ] },

  'vault-detail': { title: 'Vault · Document detail', img: 'vault-detail.png', hotspots: [
    { label: 'Back to Vault', to: 'vault-list', rect: [2, 1, 30, 5] },
    { label: 'Compare offers', to: 'compare-offers', rect: [4, 51, 92, 6] },
    { label: 'Ask about this document', to: 'ask', rect: [12, 58, 76, 6] },
    { label: 'Delete document', to: 'delete-document-confirm', rect: [4, 65, 92, 5] } ] },

  'delete-document-confirm': { title: 'Delete · Confirmation', img: 'vault-detail.png', hotspots: [
    { label: 'Keep it (cancel)', to: 'vault-detail', rect: [4, 72, 92, 6] },
    { label: 'Delete document (confirm)', to: 'vault-list', rect: [4, 80, 92, 7] } ] },

  'compare-offers': { title: 'Compare offers', img: 'compare-offers.png', hotspots: [
    { label: 'Back to Vault', to: 'vault-list', rect: [1, 6, 16, 5] },
    { label: 'Add another to compare', to: 'scan-capture', rect: [4, 72, 92, 8] } ] },

  // ── RENEWAL RADAR / ALERTS ───────────────────────────────────────────────────
  'alerts-inbox': { title: 'Renewal Radar', img: 'alerts-inbox.png', hotspots: [
    { label: 'Back', to: 'cockpit', rect: [1, 6, 16, 5] },
    { label: 'Add manual commitment', to: 'add-commitment', rect: [84, 6, 14, 5] },
    { label: 'Review an alert', to: 'alert-detail', rect: [10, 33, 80, 6] } ] },

  'alert-detail': { title: 'Alert detail', img: 'alert-detail.png', hotspots: [
    { label: 'Back', to: 'alerts-inbox', rect: [1, 6, 16, 5] },
    { label: 'Review the plan', to: 'vault-detail', rect: [12, 86, 76, 6] },
    { label: 'Snooze 3 days', to: 'alerts-inbox', rect: [25, 94, 50, 4] },
    { label: 'Mark as done', to: 'alerts-inbox', rect: [25, 90, 50, 4] } ] },

  'add-commitment': { title: 'Add a commitment', img: 'add-commitment.png', hotspots: [
    { label: 'Back (with changes)', to: 'add-commitment-discard', rect: [1, 6, 16, 5] },
    { label: 'Add to Radar', to: 'add-commitment-success', rect: [10, 82, 80, 9] } ] },

  'add-commitment-discard': { title: 'Discard changes?', img: 'add-commitment.png', hotspots: [
    { label: 'Discard', to: 'alerts-inbox', rect: [12, 62, 76, 7] },
    { label: 'Keep editing', to: 'add-commitment', rect: [12, 70, 76, 6] } ] },

  'add-commitment-success': { title: 'Commitment saved', img: 'add-commitment.png', hotspots: [
    { label: 'Back to Cockpit', to: 'cockpit', rect: [12, 62, 76, 7] },
    { label: 'View in Vault', to: 'vault-list', rect: [12, 70, 76, 6] } ] },

  // ── SETTINGS ─────────────────────────────────────────────────────────────────
  'settings': { title: 'Settings', img: 'settings.png', hotspots: [
    { label: 'Back', to: 'cockpit', rect: [1, 6, 16, 5] },
    { label: 'Manage subscription', to: 'paywall',        rect: [4, 13, 92, 6] },
    { label: 'Restore purchases', to: 'paywall',          rect: [4, 19, 92, 6] },
    { label: 'What Decode stores', to: 'consent-center',  rect: [4, 27, 92, 6] },
    { label: 'Export my data', to: 'consent-center',      rect: [4, 33, 92, 6] },
    { label: 'Delete everything', to: 'delete-everything-confirm', rect: [4, 39, 92, 6] },
    { label: 'Reminders & deadlines', to: 'radar-settings', rect: [4, 47, 92, 8] },
    { label: 'Quiet hours', to: 'radar-settings',         rect: [4, 55, 92, 6] },
    { label: 'Email a human', to: 'contact-support',      rect: [4, 62, 92, 7] },
    { label: 'Free debt help', to: 'qa-signpost',         rect: [4, 69, 92, 6] },
    { label: 'Decode explains, it doesn\'t advise', to: 'how-it-works', rect: [4, 77, 92, 6] },
    { label: 'Privacy policy & terms', to: 'about',       rect: [4, 83, 92, 6] } ] },

  'paywall': { title: 'Paywall · Decode Pro', img: 'paywall.png', hotspots: [
    { label: 'Close', to: 'cockpit',         rect: [4, 6, 11, 6] },
    { label: 'Start free trial', to: 'cockpit', rect: [6, 90, 88, 6] } ] },

  'radar-settings': { title: 'Renewal Radar · Settings', img: 'radar-settings.png', hotspots: [
    { label: 'Back to Settings', to: 'settings', rect: [1, 6, 16, 5] } ] },

  'consent-center': { title: 'Privacy choices', img: 'consent-center.png', hotspots: [
    { label: 'Back to Settings', to: 'settings', rect: [1, 6, 16, 5] },
    { label: 'Export my data', to: 'settings',   rect: [4, 68, 92, 7] },
    { label: 'Delete everything', to: 'settings', rect: [4, 75, 92, 7] } ] },

  'help-faq': { title: 'Help & FAQ', img: 'help-faq.png', hotspots: [
    { label: 'Back to Settings', to: 'settings', rect: [1, 6, 16, 5] },
    { label: 'Will scanning hurt my credit score?', to: 'how-it-works',   rect: [4, 22, 92, 7] },
    { label: 'Is my data safe?', to: 'consent-center', rect: [4, 30, 92, 7] },
    { label: 'What does Pro include?', to: 'paywall',   rect: [4, 38, 92, 7] },
    { label: 'How do reminders work?', to: 'radar-settings', rect: [4, 46, 92, 7] },
    { label: 'Email a human', to: 'contact-support',   rect: [4, 60, 92, 9] },
    { label: 'Free debt help', to: 'qa-signpost',       rect: [4, 69, 92, 9] } ] },

  'contact-support': { title: 'Contact us', img: 'contact-support.png', hotspots: [
    { label: 'Back to Settings', to: 'settings', rect: [1, 6, 16, 5] },
    { label: 'Send message', to: 'settings',     rect: [10, 71, 80, 9] } ] },

  'how-it-works': { title: 'How Decode works', img: 'how-it-works.png', hotspots: [
    { label: 'Back to Settings', to: 'settings', rect: [1, 6, 16, 5] } ] },

  'appearance': { title: 'Appearance', img: 'appearance.png', hotspots: [
    { label: 'Back to Settings', to: 'settings', rect: [1, 6, 16, 5] } ] },

  'about': { title: 'About', img: 'about.png', hotspots: [
    { label: 'Back to Settings', to: 'settings',          rect: [1, 6, 16, 5] },
    { label: 'Privacy Policy', to: 'consent-center',      rect: [4, 39, 92, 7] },
    { label: 'Complaints process', to: 'contact-support', rect: [4, 59, 92, 8] } ] },

  'delete-everything-confirm': { title: 'Delete everything?', img: 'settings.png', hotspots: [
    { label: 'Cancel', to: 'settings', rect: [12, 70, 76, 6] },
    { label: 'Delete everything (confirm)', to: 'cockpit-empty', rect: [12, 62, 76, 7] } ] },

  // ── ERRORS & EMPTY STATES ────────────────────────────────────────────────────
  'error-offline': { title: 'Error · Offline', img: 'error-offline.png', hotspots: [
    { label: 'Try again', to: 'cockpit',    rect: [12, 62, 76, 7] },
    { label: 'Open Vault', to: 'vault-list', rect: [22, 71, 56, 5] } ] },

  'error-decode-failed': { title: 'Error · Decode failed', img: 'error-decode-failed.png', hotspots: [
    { label: 'Try again', to: 'scan-processing', rect: [12, 62, 76, 7] },
    { label: 'Send to support', to: 'contact-support', rect: [22, 71, 56, 5] } ] },

  'error-limit-reached': { title: 'Error · Free limit', img: 'error-limit-reached.png', hotspots: [
    { label: 'See Pro', to: 'paywall',         rect: [12, 62, 76, 7] },
    { label: 'Maybe next month', to: 'cockpit', rect: [22, 71, 56, 5] } ] },

  'error-camera-denied': { title: 'Error · Camera off', img: 'error-camera-denied.png', hotspots: [
    { label: 'Open Settings', to: 'settings', rect: [12, 62, 76, 7] },
    { label: 'Choose from library', to: 'scan-review', rect: [22, 71, 56, 5] } ] },

  'error-purchase-failed': { title: 'Error · Purchase failed', img: 'error-purchase-failed.png', hotspots: [
    { label: 'Try again', to: 'paywall',  rect: [12, 62, 76, 7] },
    { label: 'Not now', to: 'settings',   rect: [22, 71, 56, 5] } ] },

  'empty-no-results': { title: 'Empty · No results', img: 'empty-no-results.png', hotspots: [
    { label: 'Clear search', to: 'vault-list', rect: [12, 62, 76, 7] } ] },

};

// ── FLOWS ─────────────────────────────────────────────────────────────────────

const FLOWS = {
  'first-decode': { name: 'First decode (J1)', sub: 'Onboarding → scan → BNPL result → save',
    steps: ['onboarding-1','onboarding-2','onboarding-3','scan-capture','scan-camera','scan-review','scan-processing','decode-result','cockpit'] },

  'insurance': { name: 'Insurance decode', sub: 'Scan → process → insurance result',
    steps: ['scan-capture','scan-review','scan-processing','decode-result-insurance','cockpit'] },

  'multi-page': { name: 'Multi-page scan', sub: 'Review → add pages → decode',
    steps: ['scan-review','multi-page-scan','scan-processing','decode-result'] },

  'ask': { name: 'Ask a question (J4)', sub: 'Result → ask → debt signpost',
    steps: ['decode-result','ask','qa-signpost'] },

  'share': { name: 'Share a decode', sub: 'Result → share sheet → back',
    steps: ['decode-result','share-decode','decode-result'] },

  'trust': { name: 'Trust repair', sub: 'Result → flag number → re-check',
    steps: ['decode-result','trust-repair','decode-result'] },

  'watch': { name: 'Watch / Radar (J3)', sub: 'Cockpit → radar → alert → plan',
    steps: ['cockpit','alerts-inbox','alert-detail','vault-detail'] },

  'vault': { name: 'Vault (J6)', sub: 'Cockpit → vault → detail → compare',
    steps: ['cockpit','vault-list','vault-detail','compare-offers'] },

  'payment-cal': { name: 'Payment calendar', sub: 'Home → coming up → commitment',
    steps: ['cockpit','payment-calendar','vault-detail'] },

  'monetize': { name: 'Monetize (F8)', sub: 'Hit limit → paywall → cockpit',
    steps: ['error-limit-reached','paywall','cockpit'] },

  'onboarding': { name: 'Onboarding + register', sub: 'Welcome → trust → no-doc → register',
    steps: ['onboarding-1','onboarding-2','onboarding-3','onboarding-4','cockpit-empty'] },

  'settings-tour': { name: 'Settings & help', sub: 'Settings → radar → help → contact',
    steps: ['cockpit','settings','radar-settings','settings','help-faq','contact-support'] },

  'privacy': { name: 'Privacy choices', sub: 'Settings → privacy → export / delete',
    steps: ['settings','consent-center','settings'] },

  'errors': { name: 'Error & empty states', sub: 'Gallery of all 6 states',
    steps: ['error-offline','error-decode-failed','error-limit-reached','error-camera-denied','empty-no-results','error-purchase-failed'] },
};

// ── STATE & RENDER ─────────────────────────────────────────────────────────────

let current = null;
let history = [];
let flowId = null;
let flowIdx = 0;

const $ = (sel) => document.querySelector(sel);
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function buildSidebar() {
  const fl = $('#flow-list'); fl.innerHTML = '';
  Object.entries(FLOWS).forEach(([id, f]) => {
    const b = document.createElement('button');
    b.className = 'flow-btn'; b.dataset.testid = 'flow-' + id;
    b.innerHTML = '<span></span><small></small>';
    b.children[0].textContent = f.name; b.children[1].textContent = f.sub;
    b.onclick = () => startFlow(id);
    fl.appendChild(b);
  });
  const sl = $('#screen-list'); sl.innerHTML = '';
  Object.entries(SCREENS).forEach(([id, s]) => {
    const b = document.createElement('button');
    b.className = 'screen-btn'; b.dataset.testid = 'screen-' + id;
    b.textContent = s.title;
    b.onclick = () => { exitFlow(); go(id); };
    sl.appendChild(b);
  });
}

function render() {
  const s = SCREENS[current];
  if (!s) return;
  const img = $('#screen-img');
  img.src = IMG + s.img; img.alt = current;
  $('#phone').dataset.screen = current;
  $('#screen-title').textContent = s.title;
  $('#screen-id').textContent = current;

  // hotspots overlaid on the phone
  const hs = $('#hotspots'); hs.innerHTML = '';
  (s.hotspots || []).forEach((h) => {
    const d = document.createElement('div');
    d.className = 'hotspot';
    d.dataset.testid = 'action-' + slug(h.label);
    d.dataset.to = h.to;
    const [l, t, w, ht] = h.rect;
    d.style.left = l + '%'; d.style.top = t + '%'; d.style.width = w + '%'; d.style.height = ht + '%';
    const lab = document.createElement('span');
    lab.className = 'hs-label'; lab.textContent = h.label + ' → ' + h.to;
    d.appendChild(lab);
    d.onclick = () => { exitFlow(); go(h.to); };
    hs.appendChild(d);
  });

  // flow controls
  const fc = $('#flow-controls');
  if (flowId) {
    fc.hidden = false;
    const steps = FLOWS[flowId].steps;
    $('#flow-status').textContent = FLOWS[flowId].name + ' · ' + (flowIdx + 1) + '/' + steps.length;
    $('#btn-prev').disabled = flowIdx === 0;
    $('#btn-next').disabled = flowIdx === steps.length - 1;
  } else { fc.hidden = true; }

  document.querySelectorAll('.flow-btn').forEach((b) => b.classList.toggle('active', b.dataset.testid === 'flow-' + flowId));
  document.querySelectorAll('.screen-btn').forEach((b) => b.classList.toggle('current', b.dataset.testid === 'screen-' + current));
  $('#btn-back').disabled = history.length === 0;
}

function back() {
  if (!history.length) return;
  exitFlow();
  go(history.pop(), true);
}

// chrome
$('#btn-back').onclick = back;
$('#btn-prev').onclick = () => flowStep(-1);
$('#btn-next').onclick = () => flowStep(1);
$('#btn-exit-flow').onclick = () => { exitFlow(); render(); };
$('#toggle-hotspots').onchange = (e) => document.body.classList.toggle('hide-hotspots', !e.target.checked);

function go(id, fromHistory) {
  if (!SCREENS[id]) return;
  if (current && !fromHistory) history.push(current);
  current = id; render();
}
function startFlow(id) { flowId = id; flowIdx = 0; history = []; current = FLOWS[id].steps[0]; render(); }
function exitFlow() { flowId = null; }
function flowStep(delta) {
  if (!flowId) return;
  const steps = FLOWS[flowId].steps;
  const next = Math.min(steps.length - 1, Math.max(0, flowIdx + delta));
  if (next === flowIdx) return;
  flowIdx = next; current = steps[flowIdx]; render();
}

// test hook for Playwright / integrity checks
window.PROTO = { SCREENS, FLOWS, go, startFlow, flowStep, back, get state() { return { current, flowId, flowIdx, historyLen: history.length }; } };

buildSidebar();
go('onboarding-1');
