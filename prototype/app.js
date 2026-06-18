// Decode clickable prototype — vanilla JS, no build.
// Screens render the lo-fi wireframe PNGs; WORKING tap hotspots are overlaid
// directly on the phone screen (positioned over the real buttons), plus a
// named-flow step runner. Every control has a data-testid so Playwright can
// walk every flow. Hotspot rect = [left%, top%, width%, height%] of the frame.

const IMG = '../design/wireframes/figma/';

const SCREENS = {
  'onboarding-1': { title: 'Onboarding · Welcome', img: 'onboarding-1-welcome.png', hotspots: [
    { label: 'Scan a document', to: 'scan-capture', rect: [12, 76, 76, 7] },
    { label: 'Continue with Apple', to: 'onboarding-2', rect: [22, 86, 56, 5] } ] },
  'onboarding-2': { title: 'Onboarding · Trust', img: 'onboarding-2.png', hotspots: [
    { label: 'Continue', to: 'onboarding-3', rect: [12, 90, 76, 6] } ] },
  'onboarding-3': { title: 'Onboarding · No document', img: 'onboarding-3-nodoc.png', hotspots: [
    { label: 'Try a sample', to: 'decode-result', rect: [4, 22, 92, 9] },
    { label: 'Decode something you signed', to: 'scan-capture', rect: [4, 33, 92, 9] },
    { label: 'Skip for now', to: 'onboarding-4', rect: [12, 90, 76, 6] } ] },
  'onboarding-4': { title: 'Onboarding · Register', img: 'onboarding-4-register.png', hotspots: [
    { label: 'Sign in with Apple', to: 'cockpit-empty', rect: [12, 76, 76, 6] },
    { label: 'Continue with email', to: 'cockpit-empty', rect: [12, 83, 76, 6] },
    { label: 'Skip — keep on device', to: 'cockpit-empty', rect: [22, 90, 56, 5] } ] },

  'scan-capture': { title: 'Scan · Add a document', img: 'scan-capture.png', hotspots: [
    { label: 'Take a photo', to: 'scan-camera', rect: [4, 52, 92, 8] },
    { label: 'Choose from library', to: 'scan-review', rect: [4, 61, 92, 8] },
    { label: 'Cancel', to: 'cockpit', rect: [25, 92, 50, 5] } ] },
  'scan-camera': { title: 'Scan · Camera', img: 'scan-camera-wireframe.png', hotspots: [
    { label: 'Capture', to: 'scan-processing', rect: [38, 80, 24, 13] },
    { label: 'Upload from Photos', to: 'scan-review', rect: [25, 94, 50, 4] } ] },
  'scan-processing': { title: 'Scan · Processing', img: 'scan-processing-wireframe.png', hotspots: [
    { label: 'Done → result', to: 'decode-result', rect: [10, 78, 80, 12] },
    { label: 'Could not read → error', to: 'error-decode-failed', rect: [70, 3, 28, 6] } ] },
  'scan-review': { title: 'Scan · Check the scan', img: 'scan-review.png', hotspots: [
    { label: 'Retake', to: 'scan-camera', rect: [4, 93, 44, 6] },
    { label: 'Use this scan', to: 'scan-processing', rect: [52, 93, 44, 6] } ] },

  'decode-result': { title: 'Decode result', img: 'decode-result-wireframe.png', hotspots: [
    { label: 'This number looks wrong?', to: 'trust-repair', rect: [4, 11, 64, 7] },
    { label: 'Ask', to: 'ask', rect: [4, 94, 44, 5] },
    { label: 'Save', to: 'cockpit', rect: [52, 94, 44, 5] } ] },
  'ask': { title: 'Ask', img: 'ask.png', hotspots: [
    { label: 'Back to result', to: 'decode-result', rect: [1, 6, 16, 5] },
    { label: 'I can’t pay these (distress)', to: 'qa-signpost', rect: [4, 61, 70, 7] } ] },
  'qa-signpost': { title: 'Ask · Debt signpost', img: 'qa-signpost.png', hotspots: [
    { label: 'Back', to: 'ask', rect: [1, 6, 16, 5] } ] },
  'trust-repair': { title: 'Trust repair', img: 'trust-repair.png', hotspots: [
    { label: 'Re-check with my correction', to: 'decode-result', rect: [12, 87, 76, 6] },
    { label: 'Actually it was right', to: 'decode-result', rect: [25, 94, 50, 4] } ] },

  'cockpit': { title: 'Cockpit (Home)', img: 'cockpit-wireframe.png', hotspots: [
    { label: 'Settings', to: 'settings', rect: [86, 6, 12, 5] },
    { label: 'Traps / Renewal Radar', to: 'alerts-inbox', rect: [4, 34, 92, 6] },
    { label: 'Open a commitment', to: 'vault-detail', rect: [4, 41, 92, 9] },
    { label: '+ Scan', to: 'scan-capture', rect: [33, 92, 34, 7] },
    { label: 'Vault', to: 'vault-list', rect: [67, 92, 33, 7] } ] },
  'cockpit-empty': { title: 'Cockpit · Empty (first run)', img: 'cockpit-empty.png', hotspots: [
    { label: 'Scan a document', to: 'scan-capture', rect: [12, 59, 76, 7] },
    { label: 'Try a sample first', to: 'decode-result', rect: [22, 68, 56, 5] },
    { label: '+ Scan', to: 'scan-capture', rect: [33, 92, 34, 7] },
    { label: 'Vault', to: 'vault-list', rect: [67, 92, 33, 7] } ] },
  'vault-list': { title: 'Vault · List', img: 'vault-list.png', hotspots: [
    { label: 'Search (no results)', to: 'empty-no-results', rect: [4, 13, 92, 6] },
    { label: 'Open document', to: 'vault-detail', rect: [4, 23, 92, 9] },
    { label: 'Home', to: 'cockpit', rect: [0, 92, 33, 7] },
    { label: '+ Scan', to: 'scan-capture', rect: [33, 92, 34, 7] } ] },
  'vault-detail': { title: 'Vault · Document detail', img: 'vault-detail.png', hotspots: [
    { label: 'Back to Vault', to: 'vault-list', rect: [2, 1, 30, 5] },
    { label: 'Ask about this document', to: 'ask', rect: [12, 58, 76, 6] },
    { label: 'Stop watching · Delete', to: 'vault-list', rect: [25, 66, 50, 4] } ] },

  'alerts-inbox': { title: 'Renewal Radar', img: 'alerts-inbox.png', hotspots: [
    { label: 'Back', to: 'cockpit', rect: [1, 6, 16, 5] },
    { label: 'Review an alert', to: 'alert-detail', rect: [10, 33, 80, 6] } ] },
  'alert-detail': { title: 'Alert detail', img: 'alert-detail.png', hotspots: [
    { label: 'Back', to: 'alerts-inbox', rect: [1, 6, 16, 5] },
    { label: 'Review the plan', to: 'vault-detail', rect: [12, 86, 76, 6] },
    { label: 'Snooze 3 days', to: 'alerts-inbox', rect: [25, 94, 50, 4] } ] },

  'settings': { title: 'Settings', img: 'settings.png', hotspots: [
    { label: 'Back', to: 'cockpit', rect: [1, 6, 16, 5] },
    { label: 'Manage subscription', to: 'paywall', rect: [4, 15, 92, 8] },
    { label: 'Account / sign in', to: 'onboarding-4', rect: [4, 24, 92, 7] } ] },
  'paywall': { title: 'Paywall · Decode Pro', img: 'paywall.png', hotspots: [
    { label: 'Close', to: 'cockpit', rect: [4, 6, 11, 6] },
    { label: 'Start free trial', to: 'cockpit', rect: [6, 90, 88, 6] } ] },

  'error-offline': { title: 'Error · Offline', img: 'error-offline.png', hotspots: [
    { label: 'Try again', to: 'cockpit', rect: [12, 62, 76, 7] },
    { label: 'Open Vault', to: 'vault-list', rect: [22, 71, 56, 5] } ] },
  'error-decode-failed': { title: 'Error · Decode failed', img: 'error-decode-failed.png', hotspots: [
    { label: 'Try again', to: 'scan-processing', rect: [12, 62, 76, 7] },
    { label: 'Send to support', to: 'cockpit', rect: [22, 71, 56, 5] } ] },
  'error-limit-reached': { title: 'Error · Free limit', img: 'error-limit-reached.png', hotspots: [
    { label: 'See Pro', to: 'paywall', rect: [12, 62, 76, 7] },
    { label: 'Maybe next month', to: 'cockpit', rect: [22, 71, 56, 5] } ] },
  'error-camera-denied': { title: 'Error · Camera off', img: 'error-camera-denied.png', hotspots: [
    { label: 'Open Settings', to: 'settings', rect: [12, 62, 76, 7] },
    { label: 'Choose from library', to: 'scan-review', rect: [22, 71, 56, 5] } ] },
  'empty-no-results': { title: 'Empty · No results', img: 'empty-no-results.png', hotspots: [
    { label: 'Clear search', to: 'vault-list', rect: [12, 62, 76, 7] } ] },
  'error-purchase-failed': { title: 'Error · Purchase failed', img: 'error-purchase-failed.png', hotspots: [
    { label: 'Try again', to: 'paywall', rect: [12, 62, 76, 7] },
    { label: 'Not now', to: 'settings', rect: [22, 71, 56, 5] } ] },
};

const FLOWS = {
  'first-decode': { name: 'First decode (J1)', sub: 'Onboarding → scan → result',
    steps: ['onboarding-1','onboarding-2','onboarding-3','scan-capture','scan-camera','scan-review','scan-processing','decode-result','cockpit'] },
  'ask':          { name: 'Ask a question (J4)', sub: 'Result → ask → debt signpost',
    steps: ['decode-result','ask','qa-signpost'] },
  'watch':        { name: 'Watch / Radar (J3)', sub: 'Cockpit → radar → alert → plan',
    steps: ['cockpit','alerts-inbox','alert-detail','vault-detail'] },
  'vault':        { name: 'Vault (J6)', sub: 'Cockpit → vault → detail → ask',
    steps: ['cockpit','vault-list','vault-detail','ask'] },
  'monetize':     { name: 'Monetize (F8)', sub: 'Limit → paywall · settings → paywall',
    steps: ['error-limit-reached','paywall','cockpit','settings','paywall'] },
  'trust':        { name: 'Trust repair', sub: 'Result → flag → re-check',
    steps: ['decode-result','trust-repair','decode-result'] },
  'onboarding':   { name: 'Onboarding + register', sub: 'Welcome → trust → no-doc → register',
    steps: ['onboarding-1','onboarding-2','onboarding-3','onboarding-4','cockpit-empty'] },
  'errors':       { name: 'Error & empty states', sub: 'Gallery of all 6 states',
    steps: ['error-offline','error-decode-failed','error-limit-reached','error-camera-denied','empty-no-results','error-purchase-failed'] },
};

// ---- state ----
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

// test hook for Playwright / integrity checks
window.PROTO = { SCREENS, FLOWS, go, startFlow, flowStep, back, get state() { return { current, flowId, flowIdx, historyLen: history.length }; } };

buildSidebar();
go('onboarding-1');
