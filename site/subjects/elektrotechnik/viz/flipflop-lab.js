// Flipflop-Labor: SR-Latch, D-Latch, D-/T-/JK-Flipflop mit Zeitdiagramm (Zeitlupe).
// params: { mode?: 'sr'|'dlatch'|'dff'|'t'|'jk', modes?: [...], goals?: ['hold','edge','divide'] }
//   hold   – SR-Latch: Q setzen, dann S=R=0: Q bleibt 1 (gespeichert)
//   edge   – D-Flipflop: zwei Taktflanken, bei denen Q den Wert von D übernimmt und dabei wechselt
//   divide – T-Flipflop mit T=1: 6 Taktflanken beobachten (Q-Frequenz = halbe Taktfrequenz)
import { h } from '../../../assets/js/vizkit/base.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { animate } from '../../../assets/js/vizkit/anim.js';
import { fmt } from '../../../assets/js/vizkit/si.js';
import { digitalStyle, switchBtn, stripChart } from './_digital-helper.js';

const MODES = { sr: 'SR-Latch (NOR)', dlatch: 'D-Latch (Pegel)', dff: 'D-Flipflop (Flanke)', t: 'T-Flipflop', jk: 'JK-Flipflop' };
const INPUTS = { sr: ['S', 'R'], dlatch: ['D'], dff: ['D'], t: ['T'], jk: ['J', 'K'] };
const COLORS = { CLK: 'var(--ink-2)', Q: 'var(--accent)', Qn: 'var(--accent-2)' };
const GOALTXT = {
  hold: 'SR-Latch: Q setzen und mit S = R = 0 festhalten',
  edge: 'D-Flipflop: 2× Wert an der Taktflanke übernommen',
  divide: 'T-Flipflop (T = 1): 6 Taktflanken beobachtet',
};

export default function mount(stage, { params = {}, complete }) {
  digitalStyle();
  const modes = (params.modes ?? Object.keys(MODES)).filter(m => MODES[m]);
  const goalIds = params.goals ?? ['hold', 'edge', 'divide'];
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  let mode = modes.includes(params.mode) ? params.mode : modes[0];
  let now = 0, clk = 0, q = 0, qn = 1, undef = false, clkMode = 'auto', phase = 0, freq = 0.5;
  let inp = {}, chart = null, lastSet = false, edgeHits = 0, divEdges = 0;
  const risesClk = [], risesQ = [];

  const ui = controls(root, [
    { id: 'mode', type: 'seg', label: 'Baustein', options: modes.map(m => [m, MODES[m]]), value: mode },
    { id: 'clkMode', type: 'seg', label: 'Takt', options: [['auto', 'automatisch'], ['hand', 'von Hand']], value: 'auto' },
    { id: 'f', label: 'Taktfrequenz (Zeitlupe)', unit: 'Hz', min: 0.25, max: 2, value: 0.5, scale: 'log' },
  ], (v, id) => { if (id === 'mode') { mode = v.mode; resetMode(); } clkMode = v.clkMode; freq = v.f; paintClkUi(); });

  const stat = h('div', { class: 'dg-swrow', style: 'margin:8px 0' });
  const swBox = h('div', { class: 'dg-swrow' });
  const lampQ = h('span', { class: 'dg-lamp' }, h('i'), 'Q'), lampQn = h('span', { class: 'dg-lamp' }, h('i'), 'Q̄');
  const handBtn = h('button', { type: 'button', class: 'dg-btn', text: 'Takt-Taster (gedrückt halten)' });
  const press = on => { if (clkMode !== 'hand') return; setClk(on ? 1 : 0); };
  handBtn.addEventListener('pointerdown', e => { e.preventDefault(); handBtn.setPointerCapture?.(e.pointerId); press(true); handBtn.classList.add('on'); });
  for (const ev of ['pointerup', 'pointercancel', 'lostpointercapture']) handBtn.addEventListener(ev, () => { press(false); handBtn.classList.remove('on'); });
  handBtn.addEventListener('keydown', e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); if (!e.repeat) { press(true); handBtn.classList.add('on'); } } });
  handBtn.addEventListener('keyup', e => { if (e.key === ' ' || e.key === 'Enter') { press(false); handBtn.classList.remove('on'); } });
  stat.append(lampQ, lampQn, handBtn);
  const chartBox = h('div'); root.append(swBox, stat, chartBox);
  const warn = h('div', { class: 'dg-note', style: 'min-height:1.3em' });
  root.append(warn);
  const out = readout(root, [{ id: 'fc', label: 'f Takt' }, { id: 'fq', label: 'f Q', hl: true }, { id: 'info', label: 'Verhältnis' }]);
  const gl = goalIds.length ? goals(root, goalIds.map(g => ({ id: g, label: GOALTXT[g] })), () => complete?.()) : null;

  const paintClkUi = () => { handBtn.style.display = clkMode === 'hand' && mode !== 'sr' ? '' : 'none'; };

  function resetMode() {
    q = 0; qn = 1; undef = false; inp = {}; clk = 0; phase = 0; lastSet = false; divEdges = 0;
    risesClk.length = 0; risesQ.length = 0;
    for (const n of INPUTS[mode]) inp[n] = 0;
    swBox.replaceChildren(); INPUTS[mode].forEach(n => { const sw = switchBtn(n, 0, v => { inp[n] = v ? 1 : 0; evalLevel(); rec(); }); swBox.append(sw.el); });
    const rows = [...(mode === 'sr' ? [] : [{ id: 'CLK', label: 'CLK', color: COLORS.CLK }]), ...INPUTS[mode].map(n => ({ id: n, label: n, color: 'var(--good)' })), { id: 'Q', label: 'Q', color: COLORS.Q }, { id: 'Qn', label: 'Q̄', color: COLORS.Qn }];
    chartBox.replaceChildren();
    chart = stripChart(chartBox, { rows, span: 10, init: { Qn: 1 } });
    rec(); paintClkUi(); paint();
  }
  function rec() {
    if (mode !== 'sr') chart.event('CLK', now, clk);
    for (const n of INPUTS[mode]) chart.event(n, now, inp[n]);
    chart.event('Q', now, q); chart.event('Qn', now, qn);
    paint();
  }
  function paint() {
    lampQ.classList.toggle('on', !!q); lampQn.classList.toggle('on', !!qn);
    warn.textContent = mode === 'sr' && inp.S && inp.R ? 'S = R = 1: verbotener Zustand — beide Ausgänge sind 0, Q̄ ist nicht mehr das Gegenteil von Q!' :
      undef ? 'Beide Eingänge gleichzeitig zurückgenommen: der Latch kippt zufällig — Q ist undefiniert.' : '';
  }
  // Pegelempfindliche Logik (SR, D-Latch)
  function evalLevel() {
    if (mode === 'sr') {
      const S = inp.S, R = inp.R;
      if (S && R) { q = 0; qn = 0; undef = false; }
      else if (S) { q = 1; qn = 0; undef = false; lastSet = true; }
      else if (R) { q = 0; qn = 1; undef = false; }
      else if (q === 0 && qn === 0) { q = Math.random() < 0.5 ? 0 : 1; qn = q ^ 1; undef = true; }
      else undef = false;
      if (!S && !R && q === 1 && lastSet && !undef) gl?.reach('hold');
      if (R) lastSet = false;
    } else if (mode === 'dlatch') { if (clk) { q = inp.D; qn = q ^ 1; } }
  }
  function setClk(v) {
    if (v === clk) return;
    clk = v;
    if (v) {   // steigende Flanke
      risesClk.push(now);
      const old = q;
      if (mode === 'dff') { q = inp.D; if (q !== old) { edgeHits++; if (edgeHits >= 2) gl?.reach('edge'); } }
      else if (mode === 't') { if (inp.T) { q ^= 1; divEdges++; if (divEdges >= 6) gl?.reach('divide'); } else divEdges = 0; }
      else if (mode === 'jk') { const J = inp.J, K = inp.K; if (J && K) q ^= 1; else if (J) q = 1; else if (K) q = 0; }
      qn = q ^ 1;
      if (q && !old) risesQ.push(now);
    } else if (mode === 'dlatch') { /* hält */ }
    if (mode === 'dlatch') { const old = q; evalLevel(); if (q && !old) risesQ.push(now); }
    rec();
  }
  animate(root, (dt, t) => {
    now = t;
    if (clkMode === 'auto' && mode !== 'sr') {
      phase += dt; const hp = 0.5 / freq;
      while (phase >= hp) { phase -= hp; setClk(clk ? 0 : 1); }
    }
    chart.draw(now);
    const win = 10, fresh = a => { while (a.length && a[0] < now - win) a.shift(); return a; };
    const f = a => { fresh(a); return a.length >= 2 ? (a.length - 1) / (a[a.length - 1] - a[0]) : NaN; };
    const fc = f(risesClk), fq = f(risesQ);
    out.set({ fc: Number.isFinite(fc) ? fmt(fc, 'Hz', 2) : '–', fq: Number.isFinite(fq) ? fmt(fq, 'Hz', 2) : '–', info: Number.isFinite(fc) && Number.isFinite(fq) && fq > 0 ? `${(fc / fq).toFixed(1)} : 1` : '–' });
  });
  resetMode();
  stage.__ff = { get q() { return q; }, get mode() { return mode; }, setMode(m) { ui.set({ mode: m }); }, setInput(n, v) { inp[n] = v; evalLevel(); rec(); }, clock(v) { setClk(v); }, setClkMode(m) { ui.set({ clkMode: m }); } };
}
