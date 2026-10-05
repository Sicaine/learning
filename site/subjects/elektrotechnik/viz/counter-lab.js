// Zähler-Labor: 4-Bit-Ripple-Zähler (Modulo einstellbar, Zwischenzustände sichtbar) und Teilerkette (10 MHz → 1 Hz).
// params: { mode?: 'counter'|'chain', goals?: ['wrap16','mod10','hz1'], f0?: 10e6, target?: 1 }
import { h } from '../../../assets/js/vizkit/base.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { animate } from '../../../assets/js/vizkit/anim.js';
import { fmt } from '../../../assets/js/vizkit/si.js';
import { digitalStyle, stripChart, bin } from './_digital-helper.js';

const GOALTXT = {
  wrap16: 'Zähler läuft von 15 auf 0 über (Modulo 16)',
  mod10: 'Modulo 10 einstellen: Zähler springt von 9 auf 0',
  hz1: 'Teilerkette: aus 10 MHz genau 1 Hz machen',
};

/** Zwischenzustände eines asynchronen (Ripple-)Zählers beim Schritt s → s+1 (4 Bit). */
export function rippleSteps(s, mod, bits = 4) {
  const seq = [s]; let cur = s, b = 0;
  while (b < bits) { cur ^= 1 << b; seq.push(cur); if (((cur >> b) & 1) === 0) b++; else break; }
  if (cur === mod && mod < 2 ** bits) seq.push(0);
  return seq;
}

export default function mount(stage, { params = {}, complete }) {
  digitalStyle();
  const f0 = params.f0 ?? 10e6, target = params.target ?? 1;
  const goalIds = params.goals ?? ['wrap16', 'mod10', 'hz1'];
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  let mode = params.mode === 'chain' ? 'chain' : 'counter';
  const gl = goals(root, goalIds.map(g => ({ id: g, label: GOALTXT[g] })), () => complete?.());
  gl.el.remove();   // unten einhängen
  const tabs = controls(root, [{ id: 'mode', type: 'seg', options: [['counter', 'Zähler'], ['chain', 'Teilerkette']], value: mode }], v => { mode = v.mode; show(); });
  const pCounter = h('div'), pChain = h('div');
  root.append(pCounter, pChain, gl.el);

  // ───────── Zähler ─────────
  let count = 0, mod = 16, clk = 0, now = 0, phase = 0, freq = 1, clkMode = 'auto', sawWrap16 = false;
  const cui = controls(pCounter, [
    { id: 'mod', label: 'Modulo (Zählumfang)', min: 2, max: 16, value: 16, step: 1, format: v => String(Math.round(v)) },
    { id: 'clkMode', type: 'seg', label: 'Takt', options: [['auto', 'automatisch'], ['hand', 'von Hand']], value: 'auto' },
    { id: 'f', label: 'Takt (Zeitlupe)', unit: 'Hz', min: 0.5, max: 4, value: 1, scale: 'log' },
  ], v => { mod = Math.round(v.mod); clkMode = v.clkMode; freq = v.f; if (count >= mod) count = 0; paintBits(); handBtn.style.display = clkMode === 'hand' ? '' : 'none'; });
  const bitsRow = h('div', { class: 'dg-bits', 'aria-hidden': 'true' });
  const bitEls = [3, 2, 1, 0].map(i => { const b = h('span', { class: 'b', text: '0' }), w = h('span', { class: 'w', text: `Q${i} · ${2 ** i}` }); const c = h('div', { class: 'dg-bit' }, w, b); bitsRow.append(c); return c; });
  const big = h('div', { class: 'dg-big' });
  const trans = h('div', { class: 'dg-trans', 'aria-live': 'polite' });
  const handBtn = h('button', { type: 'button', class: 'dg-btn', text: 'Takt-Taster (gedrückt halten)', style: 'display:none' });
  const rstBtn = h('button', { type: 'button', class: 'dg-btn', text: 'Reset (Zähler = 0)', onclick: () => { count = 0; rec(); paintBits(); trans.replaceChildren(); } });
  handBtn.addEventListener('pointerdown', e => { e.preventDefault(); handBtn.setPointerCapture?.(e.pointerId); handBtn.classList.add('on'); setClk(1); });
  for (const ev of ['pointerup', 'pointercancel', 'lostpointercapture']) handBtn.addEventListener(ev, () => { handBtn.classList.remove('on'); setClk(0); });
  handBtn.addEventListener('keydown', e => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); handBtn.classList.add('on'); setClk(1); } });
  handBtn.addEventListener('keyup', e => { if (e.key === ' ' || e.key === 'Enter') { handBtn.classList.remove('on'); setClk(0); } });
  pCounter.append(bitsRow, big, h('div', { class: 'dg-actions' }, handBtn, rstBtn));
  pCounter.append(h('div', { class: 'dg-note', text: 'Letzter Zählschritt mit allen Zwischenzuständen (asynchroner Zähler — die Stufen schalten nacheinander):' }), trans);
  const chartBox = h('div'); pCounter.append(chartBox);
  const chart = stripChart(chartBox, { rows: [{ id: 'clk', label: 'CLK', color: 'var(--ink-2)' }, ...[0, 1, 2, 3].map(i => ({ id: 'q' + i, label: 'Q' + i, color: ['var(--accent)', 'var(--accent-2)', 'var(--good)', 'var(--warn)'][i] }))], span: 10 });
  const out = readout(pCounter, [{ id: 'fc', label: 'Takt f' }, { id: 'fo', label: 'Überlauf f/N', hl: true }, { id: 'n', label: 'Teilerverhältnis' }]);

  function rec() {
    chart.event('clk', now, clk);
    for (let i = 0; i < 4; i++) chart.event('q' + i, now, (count >> i) & 1);
  }
  function paintBits() {
    bitEls.forEach((c, k) => { const i = 3 - k, on = (count >> i) & 1; c.classList.toggle('on', !!on); c.querySelector('.b').textContent = on; });
    big.innerHTML = `<span><small>Zählerstand</small><b>${count}</b></span><span><small>dual</small><b>${bin(count, 4)}</b></span>`;
    out.set({ fc: fmt(freq, 'Hz', 2), fo: fmt(freq / mod, 'Hz', 3), n: `${mod} : 1` });
  }
  function setClk(v) {
    if (v === clk) return; clk = v;
    if (v) {
      const seq = rippleSteps(count, mod), next = (count + 1) % mod;
      trans.replaceChildren(...seq.map((x, i) => h('span', { class: i === 0 ? '' : i === seq.length - 1 ? 'fin' : 'gl', text: bin(x, 4) + ' (' + x + ')' })));
      if (seq[seq.length - 1] !== next) trans.append(h('span', { text: '…' }));
      if (count === 15 && next === 0 && mod === 16) { sawWrap16 = true; gl.reach('wrap16'); }
      if (count === 9 && next === 0 && mod === 10) gl.reach('mod10');
      count = next;
    }
    rec(); paintBits();
  }

  // ───────── Teilerkette ─────────
  let stages = [];
  const DIVS = [2, 5, 10];
  const chainBtns = h('div', { class: 'dg-actions' },
    ...DIVS.map(d => h('button', { type: 'button', class: 'dg-btn', text: '+ ÷' + d, onclick: () => { if (stages.length < 12) { stages.push(d); renderChain(); } } })),
    h('button', { type: 'button', class: 'dg-btn', text: 'Letzte entfernen', onclick: () => { stages.pop(); renderChain(); } }),
    h('button', { type: 'button', class: 'dg-btn', text: 'Neu', onclick: () => { stages = []; renderChain(); } }));
  const chainView = h('div', { class: 'dg-trans', style: 'margin:10px 0' });
  const chainNote = h('div', { class: 'dg-note' });
  pChain.append(h('div', { class: 'dg-note', text: `Quarznormal: ${fmt(f0, 'Hz', 3)}. Baue eine Kette aus Teilerstufen, bis ${fmt(target, 'Hz', 3)} herauskommt. Eine ÷10-Stufe ist ein BCD-Zähler (4 Flipflops, Modulo 10).` }), chainBtns, chainView, chainNote);
  const cout = readout(pChain, [{ id: 'tot', label: 'Gesamtteiler' }, { id: 'f', label: 'Ausgangsfrequenz', hl: true }, { id: 'ff', label: 'Flipflops (ca.)' }]);
  function renderChain() {
    let f = f0, tot = 1, ff = 0;
    const els = [h('span', { class: 'fin', text: fmt(f, 'Hz', 3) })];
    for (const d of stages) { f /= d; tot *= d; ff += d === 2 ? 1 : d === 5 ? 3 : 4; els.push(h('span', { text: '→ ÷' + d }), h('span', { class: Math.abs(f - target) < target * 1e-9 ? 'fin' : '', text: fmt(f, 'Hz', 3) })); }
    chainView.replaceChildren(...els);
    cout.set({ tot: tot.toLocaleString('de-DE') + ' : 1', f: fmt(f, 'Hz', 4), ff: String(ff) });
    chainNote.textContent = stages.length ? `Periodendauer des Ausgangs: ${fmt(1 / f, 's', 3)}` : 'Noch keine Stufe.';
    if (Math.abs(f - target) <= target * 1e-9) gl.reach('hz1');
  }

  function show() { pCounter.style.display = mode === 'counter' ? '' : 'none'; pChain.style.display = mode === 'chain' ? '' : 'none'; if (mode === 'chain') renderChain(); }

  animate(root, (dt, t) => {
    now = t;
    if (mode === 'counter') {
      if (clkMode === 'auto') { phase += dt; const hp = 0.5 / freq; while (phase >= hp) { phase -= hp; setClk(clk ? 0 : 1); } }
      chart.draw(now);
    }
  });
  rec(); paintBits(); show();
  void sawWrap16;
  stage.__cl = { get count() { return count; }, setMode(m) { tabs.set({ mode: m }); }, clock() { setClk(1); setClk(0); }, setMod(m) { cui.set({ mod: m }); }, setClkMode(m) { cui.set({ clkMode: m }); }, chain: d => { stages.push(d); renderChain(); } };
}
