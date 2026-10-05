// Gleichrichter-Labor (L37) und Netzteil-Siebung (L38, über viz/psu-ripple-lab.js).
// params.mode: 'plain' (ungeglättet, Vorhersage-Aufgabe) | 'psu' (mit Ladekondensator, Welligkeit, Diodenstrom, Einschalten).
// Eigenes Modell: Trafo-Sekundärspule als Sinusquelle mit Innenwiderstand R_i, Dioden aus der Engine (Si / Schottky).
import { Netlist, transient, waves } from '../../../assets/js/vizkit/circuit.js';
import { layouts } from '../../../assets/js/vizkit/schematic-layouts.js';
import { drawSchematic } from '../../../assets/js/vizkit/schematic.js';
import { timePlot } from '../../../assets/js/vizkit/plot.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { animate } from '../../../assets/js/vizkit/anim.js';
import { fmt } from '../../../assets/js/vizkit/si.js';
import { h } from '../../../assets/js/vizkit/base.js';

const F = 50, DT = 100e-6, RULE_UF = { si: 0.7, schottky: 0.3 };

function makeSpec(type, withC, schottky) {
  const L = layouts[type === 'bridge' ? 'bridge' : 'halfWave']({ adjust: false });
  const sp = JSON.parse(JSON.stringify(L.spec));
  if (!withC) {
    sp.parts = sp.parts.filter(p => p.id !== 'C1');
    sp.wires = sp.wires.map(w => ({ ...w, pts: w.pts.filter(p => !(typeof p === 'string' && p.startsWith('C1.'))) })).filter(w => w.pts.length >= 2);
  }
  if (schottky) for (const p of sp.parts) if (p.type === 'D') p.type = 'SD';
  const u1 = sp.parts.find(p => p.id === 'V1'); if (u1) u1.label = 'u₁';
  const rl = sp.parts.find(p => p.id === 'RL'); if (rl) rl.label = 'R_L';
  return sp;
}

function makeNet({ type, model, Ueff, RL, C, ic, Ri }) {
  const n = new Netlist();
  const w = waves.sine(Ueff * Math.SQRT2, F);
  if (type === 'bridge') {
    n.V('V1', 's', 'b', { wave: w }).R('Ri', 's', 'a', Ri);
    n.D('D1', 'a', 'out', { model }).D('D2', '0', 'a', { model }).D('D3', 'b', 'out', { model }).D('D4', '0', 'b', { model }).R('Rref', 'b', '0', 1e6);
  } else {
    n.V('V1', 's', '0', { wave: w }).R('Ri', 's', 'in', Ri);
    n.D('D1', 'in', 'out', { model });
  }
  if (C) n.C('C1', 'out', '0', C, ic);
  n.R('RL', 'out', '0', RL);
  return n;
}

export default function mount(stage, { params = {}, complete }) {
  const psu = params.mode === 'psu';
  const Ri = params.Ri ?? (psu ? 0.4 : 0.1);
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const schBox = h('div'), plotBox = h('div'), plotBox2 = h('div');
  root.append(schBox, plotBox);
  if (psu) root.append(plotBox2);
  const p1 = timePlot(plotBox, { h: 250, legend: true, y: { include: [0] } });
  const p2 = psu ? timePlot(plotBox2, { h: 190, legend: true, y: { unit: 'A', label: 'i', include: [0] } }) : null;

  const defs = psu ? [
    { id: 'type', type: 'seg', options: [['bridge', 'Brücke'], ['half', 'Einweg']], value: 'bridge' },
    { id: 'C', label: 'Ladekondensator C', unit: 'F', min: 100e-6, max: 22e-3, value: 1e-3, scale: 'log', snap: 'E6' },
    { id: 'I', label: 'Laststrom I', unit: 'A', min: 0.05, max: 3, value: 0.5, scale: 'log', digits: 2 },
    { id: 'view', type: 'seg', options: [['steady', 'eingeschwungen'], ['start', 'Einschalten (C leer)']], value: 'steady' },
  ] : [
    { id: 'type', type: 'seg', options: [['bridge', 'Brücke'], ['half', 'Einweg']], value: 'half' },
    { id: 'model', type: 'seg', options: [['si', 'Si-Dioden'], ['schottky', 'Schottky']], value: 'si' },
    { id: 'Ueff', label: 'Trafo-Spannung U_eff', unit: 'V', min: 5, max: 24, value: 12, snap: 1 },
    { id: 'RL', label: 'Last R_L', unit: 'Ω', min: 10, max: 1000, value: 100, scale: 'log', snap: 'E12' },
  ];
  let res, win = [0, 0], sch, schKey = '', net;
  const ui = controls(root, defs, (v, id) => { if (!psu) { fb.textContent = ''; shown = false; } run(); });
  let shown = psu;   // plain: Spitzenwert erst nach der Vorhersage zeigen
  const items = psu
    ? [{ id: 'hi', label: 'Spitze U_aus' }, { id: 'rip', label: 'Welligkeit ΔU', hl: true }, { id: 'th', label: 'Näherung I/(f·C)' }, { id: 'ipk', label: 'Diodenspitzenstrom' }, { id: 'iavg', label: 'Laststrom (Mittel)' }]
    : [{ id: 'hi', label: 'Spitze U_aus', hl: true }, { id: 'avg', label: 'Mittelwert' }, { id: 'fr', label: 'Welligkeitsfrequenz' }, { id: 'ur', label: 'Sperrspannung Diode' }, { id: 'uf', label: 'U_F (Diode)' }];
  const out = readout(root, items);
  let fb, inp, btn;
  const seen = new Set();
  const g = goals(root, psu ? [
    { id: 'r', label: 'Brücke, 1 A: ΔU < 1 V' },
    { id: 'p', label: 'Diodenstrom ≥ 5 · Laststrom' },
  ] : [{ id: 'a', label: '3 richtige Vorhersagen' }], () => complete?.());
  if (!psu) {
    const row = h('div', { class: 'vz-controls vk-row', style: 'align-items:center;gap:8px;flex-wrap:wrap' });
    inp = h('input', { type: 'number', step: '0.1', id: 'rl-pred', 'aria-label': 'Vorhersage Spitzenspannung in Volt', placeholder: 'z. B. 15,6', style: 'width:8em;padding:6px 8px;border:1px solid var(--line-2);border-radius:8px;font:inherit' });
    btn = h('button', { type: 'button', class: 'btn small', id: 'rl-check', text: 'Prüfen' });
    fb = h('div', { class: 'vz-note', 'aria-live': 'polite' });
    row.append(h('span', { text: 'Deine Vorhersage der Ausgangs-Spitzenspannung (V):' }), inp, btn);
    root.insertBefore(row, out.el); root.insertBefore(fb, out.el);
    btn.onclick = () => {
      const v = ui.values, pred = parseFloat(String(inp.value).replace(',', '.'));
      if (Number.isNaN(pred)) { fb.textContent = 'Gib erst eine Zahl ein.'; return; }
      const nD = v.type === 'bridge' ? 2 : 1, rule = v.Ueff * Math.SQRT2 - nD * RULE_UF[v.model];
      const hi = peak();
      shown = true; showOut();
      const ok = Math.abs(pred - hi) <= 0.6, key = [v.type, v.model, v.Ueff, v.RL].join('|');
      fb.innerHTML = ok
        ? `✓ Gemessen ${fmt(hi, 'V')} — deine ${fmt(pred, 'V')} liegt nah dran (Faustformel: ${fmt(rule, 'V')}).`
        : `✗ Gemessen ${fmt(hi, 'V')}, du sagtest ${fmt(pred, 'V')}. Faustformel: û − ${nD}·U_F = ${fmt(v.Ueff * Math.SQRT2, 'V')} − ${nD}·${fmt(RULE_UF[v.model], 'V')} = ${fmt(rule, 'V')}.`;
      if (ok && !seen.has(key)) { seen.add(key); if (seen.size >= 3) g.reach('a'); }
      if (ok) { g.el.dataset.n = seen.size; g.el.querySelector('.vz-stat').textContent = (g.has('a') ? '✓ ' : '○ ') + `3 richtige Vorhersagen (${Math.min(3, seen.size)}/3, verschiedene Einstellungen)`; }
    };
  }
  const anim = animate(root, dt => {
    if (!res || !sch) return;
    const len = win[1] - win[0];
    cur = (cur + dt * 0.02 / (len * DT)) % 1;     // 20 ms Simulationszeit pro Sekunde
    const k = win[0] + Math.min(len, Math.floor(cur * len));
    sch.setStateAt(res, k);
    p1.vline('now', res.t[k] - t0, { color: 'var(--ink-2)', dash: '2 3', width: 1.2 });
    p2?.vline('now', res.t[k] - t0, { color: 'var(--ink-2)', dash: '2 3', width: 1.2 });
  });
  let cur = 0, t0 = 0;
  anim.controls(root, { speeds: [[1, '1×'], [0.25, '¼×'], [0.05, '0,05×']] });

  const peak = () => { let m = -Infinity; for (let k = win[0]; k < win[1]; k++) m = Math.max(m, res.v.out[k]); return m; };
  const showOut = () => { if (!psu && !shown) out.set({ hi: '?' }); else if (!psu) out.set({ hi: fmt(peak(), 'V') }); };

  function run() {
    const v = ui.values, bridge = v.type === 'bridge';
    let cfg;
    if (psu) {
      const model = 'si', Ueff = params.Ueff ?? 12, up = Ueff * Math.SQRT2 - (bridge ? 1.4 : 0.7), R = Math.max(1, up / v.I);
      const est = Math.min(up * 0.4, v.I / ((bridge ? 2 : 1) * F * v.C));
      cfg = { type: v.type, model, Ueff, RL: R, C: v.C, ic: v.view === 'start' ? 0 : Math.max(0, up - est / 2), Ri };
    } else cfg = { type: v.type, model: v.model, Ueff: v.Ueff, RL: v.RL, C: 0, Ri };
    const key = v.type + (psu ? 'c' : '') + (cfg.model === 'schottky' ? 's' : '');
    if (key !== schKey) { schBox.replaceChildren(); sch = drawSchematic(schBox, makeSpec(v.type, psu, cfg.model === 'schottky')); schKey = key; }
    if (psu) sch.set('RL', { value: cfg.RL, valueText: fmt(cfg.RL, 'Ω', 3) });
    else sch.set('RL', { value: cfg.RL });
    if (psu) sch.set('C1', { value: v.C });
    net = makeNet(cfg);
    const start = psu && v.view === 'start';
    const tstop = start ? 0.1 : psu ? 0.2 : 0.06;
    res = transient(net, { tstop, dt: DT, uic: psu });
    const per = 1 / F / DT, k1 = res.n, k0 = start ? 0 : k1 - Math.round(2 * per) - 1;
    win = [k0, start ? Math.min(k1, Math.round(0.1 / DT)) : k1];
    t0 = res.t[k0];
    const ts = Float64Array.from(res.t.subarray(k0, win[1]), x => x - t0), uo = res.v.out.subarray(k0, win[1]);
    const usec = bridge ? Float64Array.from(ts, (_, i) => res.v.a[k0 + i] - res.v.b[k0 + i]) : res.v.in.subarray(k0, win[1]);
    p1.line('in', ts, usec, { color: 'var(--accent)', label: 'u₁ (Trafo, nach R_i)', opacity: 0.55, width: 1.6 });
    let lo = Infinity, hi = -Infinity, sum = 0, n = 0;
    const kw0 = start ? win[1] - Math.round(per) : win[0];   // Mittelwerte über die letzte(n) Periode(n)
    for (let k = kw0; k < win[1]; k++) { const x = res.v.out[k]; lo = Math.min(lo, x); hi = Math.max(hi, x); sum += x; n++; }
    p1.line('out', ts, uo, { color: 'var(--accent-2)', label: 'u₂ (Ausgang)', fill: Math.min(lo, 0) });
    const dn = ['D1', 'D2', 'D3', 'D4'].filter(d => res.i[d]);
    let ur = 0;
    for (const d of dn) { const e = net.get(d); for (let k = win[0]; k < win[1]; k++) ur = Math.max(ur, res.v[e.n[1]][k] - res.v[e.n[0]][k] || 0); }
    if (psu) {
      let ipk = 0; for (let k = kw0; k < win[1]; k++) ipk = Math.max(ipk, res.i.D1[k]);
      const ids = res.i.D1.subarray(k0, win[1]);
      p2.line('d', ts, ids, { color: 'var(--accent)', label: 'i_D1 (Diodenstrom)', fill: 0 });
      const iavg = sum / n / cfg.RL;
      p2.hline('av', iavg, { label: 'Ø Laststrom', color: 'var(--muted)', dash: '4 4' });
      out.set({ hi: fmt(hi, 'V'), rip: start ? '—' : fmt(hi - lo, 'V'), th: fmt(v.I / ((bridge ? 2 : 1) * F * v.C), 'V'), ipk: fmt(ipk, 'A'), iavg: fmt(iavg, 'A') });
      if (!start) {
        if (bridge && v.I >= 0.99 && hi - lo < 1) g.reach('r');
        if (ipk >= 5 * iavg) g.reach('p');
      }
    } else {
      const imid = res.i.D1[Math.floor((win[0] + win[1]) / 2)];
      void imid;
      // U_F bei Spitzenstrom
      let ipk = 0, kp = win[0]; for (let k = win[0]; k < win[1]; k++) if (res.i.D1[k] > ipk) { ipk = res.i.D1[k]; kp = k; }
      const e1 = net.get('D1'), uf = res.v[e1.n[0]][kp] - res.v[e1.n[1]][kp];
      out.set({ avg: fmt(sum / n, 'V'), fr: fmt(bridge ? 2 * F : F, 'Hz'), ur: fmt(ur, 'V'), uf: fmt(uf, 'V') });
      showOut();
    }
    anim.once();
  }
  run();
}
