// Decode interactive prototype — router, flow runner, interaction wiring.
const S = window.SCREENS, F = window.FLOWS;

let current = null, history = [], flowId = null, flowIdx = 0, timer = null;
const state = Object.assign({}, window.DEFAULT_STATE);
const $ = (s) => document.querySelector(s);
const root = $('#screen-root');

const ctx = {
  state,
  go: (id) => go(id),
  back: () => back(),
  rerender: () => render(),
  get current() { return current; },
  set timer(t) { timer = t; },
  get timer() { return timer; },
};

function clearTimer() { if (timer) { clearInterval(timer); timer = null; } }

function go(id, fromHistory) {
  if (!S[id]) return;
  clearTimer();
  if (current && !fromHistory) history.push(current);
  current = id;
  render();
}
function back() { if (!history.length) return; exitFlow(); clearTimer(); current = history.pop(); render(); }
function startFlow(id) { flowId = id; flowIdx = 0; history = []; clearTimer(); current = F[id].steps[0]; render(); }
function exitFlow() { flowId = null; }
function flowStep(d) {
  if (!flowId) return;
  const steps = F[flowId].steps;
  const n = Math.min(steps.length - 1, Math.max(0, flowIdx + d));
  if (n === flowIdx) return;
  flowIdx = n; clearTimer(); current = steps[flowIdx]; render();
}

function render() {
  const s = S[current];
  if (!s) return;
  root.innerHTML = s.html(ctx);
  root.dataset.screen = current;
  if (s.mount) s.mount(root, ctx);

  $('#tt').textContent = current;
  const inFlow = !!flowId;
  ['btn-prev', 'flowst', 'btn-next', 'btn-exit'].forEach((id) => { $('#' + id).hidden = !inFlow; });
  if (inFlow) {
    const steps = F[flowId].steps;
    $('#flowst').textContent = F[flowId].name + ' · ' + (flowIdx + 1) + '/' + steps.length;
    $('#btn-prev').disabled = flowIdx === 0;
    $('#btn-next').disabled = flowIdx === steps.length - 1;
  }
  $('#btn-back').disabled = history.length === 0;
  document.querySelectorAll('#flow-list .sb-btn').forEach((b) => b.classList.toggle('active', b.dataset.flow === flowId));
  document.querySelectorAll('#screen-list .sb-btn').forEach((b) => b.classList.toggle('current', b.dataset.screen === current));
}

// ---- navigation via delegation (any [data-nav] inside the phone) ----
root.addEventListener('click', (e) => {
  const nav = e.target.closest('[data-nav]');
  if (nav && root.contains(nav)) { exitFlow(); go(nav.dataset.nav); }
});

// ---- sidebar ----
function buildSidebar() {
  const fl = $('#flow-list'); fl.innerHTML = '';
  Object.entries(F).forEach(([id, f]) => {
    const b = document.createElement('button');
    b.className = 'sb-btn flow'; b.dataset.flow = id; b.dataset.testid = 'flow-' + id;
    b.innerHTML = '<span></span><small></small>';
    b.children[0].textContent = f.name; b.children[1].textContent = f.sub;
    b.onclick = () => startFlow(id);
    fl.appendChild(b);
  });
  const sl = $('#screen-list'); sl.innerHTML = '';
  Object.entries(S).forEach(([id, s]) => {
    const b = document.createElement('button');
    b.className = 'sb-btn'; b.dataset.screen = id; b.dataset.testid = 'screen-' + id;
    b.textContent = s.title;
    b.onclick = () => { exitFlow(); go(id); };
    sl.appendChild(b);
  });
}

// ---- chrome ----
$('#btn-back').onclick = back;
$('#btn-prev').onclick = () => flowStep(-1);
$('#btn-next').onclick = () => flowStep(1);
$('#btn-exit').onclick = () => { exitFlow(); render(); };

// ---- test hook ----
window.PROTO = {
  SCREENS: S, FLOWS: F, go, startFlow, flowStep, back, state,
  get info() { return { current, flowId, flowIdx, historyLen: history.length, screens: Object.keys(S).length, flows: Object.keys(F).length }; },
};

buildSidebar();
go('onboarding-1');
