// RC-/RL-Labor (D18): Schalter, Quelle, R und C (bzw. L). Laden/Entladen als Verlauf mit τ-Marken, Schaltplan mit Stromfluss, wahlweise am Oszilloskop.
// params: { mode?: 'rc' | 'rl' (Standard 'rc'), target?: Zeitkonstante in s (rc: 1, rl: 0,005), goals?: ['tau', 'charge', 'discharge'], U?: Volt (10) }
//   tau       — τ = R·C (bzw. L/R) auf den Zielwert (±5 %) einstellen
//   charge    — aus dem leeren Zustand laden, bis nur noch ≤ 1 % fehlen (≈ 5 τ abwarten)
//   discharge — danach den Schalter umlegen und bis ≤ 1 % entladen
// Der Verlauf wird mit dem Transientensimulator berechnet (Trapezverfahren), der Cursor läuft mit einem Tempo von „τ pro Sekunde“.
import { Netlist, transient, waves } from '../../../assets/js/vizkit/circuit.js';
import { drawSchematic, components } from '../../../assets/js/vizkit/schematic.js';
import { plot } from '../../../assets/js/vizkit/plot.js';
import { scope } from '../../../assets/js/vizkit/scope.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { animate } from '../../../assets/js/vizkit/anim.js';
import { fmt, seq125 } from '../../../assets/js/vizkit/si.js';
import { h } from '../../../assets/js/vizkit/base.js';

// Umschalter (Wechsler) für den Schaltplan: closed = Kontakt oben (Quelle), sonst unten (Masse)
components.SWC ??= {
  pins: { a: [0, -1.5], b: [0, 1.5], c: [4, 0] }, box: [0, -1.5, 4, 1.5], cur: { c: ['', 1] },
  draw: p => `<path d="M0 -1.5H.8M0 1.5H.8M4 0H3.3"/><circle cx=".8" cy="-1.5" r=".14" class="fillb"/><circle cx=".8" cy="1.5" r=".14" class="fillb"/><circle cx="3.3" cy="0" r=".14" class="fillb"/><path d="M3.3 0L1 ${p.closed ? -1.35 : 1.35}" style="stroke-width:.16"/>`,
};

const CFG = {
  rc: { X: 'C1', xl: 'Kapazität C', xu: 'F', xmin: 1e-9, xmax: 1e-3, xdef: 100e-6, xsnap: 'E12', Rmin: 100, Rmax: 1e6, Rdef: 10e3, target: 1, sym: 'C' },
  rl: { X: 'L1', xl: 'Induktivität L', xu: 'H', xmin: 1e-3, xmax: 1, xdef: 0.1, xsnap: 'E12', Rmin: 1, Rmax: 1e3, Rdef: 100, target: 5e-3, sym: 'L' },
};

export default function mount(stage, { params = {}, complete }) {
  const mode = params.mode === 'rl' ? 'rl' : 'rc', cfg = CFG[mode], rc = mode === 'rc';
  const target = params.target ?? cfg.target, want = params.goals ?? ['tau', 'charge', 'discharge'];
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const schHolder = h('div'), plotBox = h('div', { class: 'vk' }), scopeBox = h('div', { style: 'display:none' });
  root.append(schHolder);

  // Schaltplan
  const spec = {
    potential: { range: params.U ?? 10 }, iScale: 0.01,
    parts: [
      { id: 'V1', type: 'V', at: [2, 2], rot: 90, value: params.U ?? 10 },
      { id: 'SWC', type: 'SWC', at: [5, 3.5], toggle: true, closed: true, label: 'S', valueText: '' },
      { id: 'R1', type: 'R', at: [11, 3.5], value: cfg.Rdef },
      { id: cfg.X, type: rc ? 'C' : 'L', at: [17, 3.5], rot: 90, value: cfg.xdef },
      { type: 'GND', at: [9, 9] },
    ],
    wires: [
      { pts: ['V1.p', 'SWC.a'], net: 'in', i: 'S1' }, { pts: ['SWC.c', 'R1.a'], net: 'a', i: 'R1' }, { pts: ['R1.b', cfg.X + '.a'], net: 'x', i: 'R1' },
      { pts: ['SWC.b', [5, 9]], net: '0', i: 'S2' }, { pts: ['V1.n', [2, 9], [5, 9]], net: '0', i: '-S1' }, { pts: [[5, 9], [17, 9]], net: '0', i: '-' + cfg.X }, { pts: [cfg.X + '.b', [17, 9]], net: '0', i: cfg.X },
    ],
    onChange: (id, v) => { if (id === 'SWC') ui.set({ sw: v ? 'on' : 'off' }, { force: true }); },
  };
  const sch = drawSchematic(schHolder, spec);

  // Diagramme (Verlauf)
  const P1 = plot(plotBox, { x: { unit: 's', label: 't', min: 0 }, y: { unit: 'V', include: [0] }, legend: true, h: 250 });
  const P2 = plot(plotBox, { x: { unit: 's', label: 't', min: 0 }, y: { unit: rc ? 'A' : 'V', include: [0] }, legend: true, h: 200 });
  const sc = scope(scopeBox, { channels: [{ id: 'in', label: 'u₁', vdiv: 2 }, { id: 'a', label: rc ? 'u_C' : 'u_R (∝ i)', vdiv: 2 }].concat(rc ? [] : [{ id: 'b', label: 'u_L', vdiv: 2 }]), trigger: { source: 'in', level: 5 }, timeDiv: 1e-3 });

  const ui = controls(root, [
    { id: 'sw', type: 'seg', label: 'Schalter', options: [['on', 'Laden (Quelle)'], ['off', 'Entladen (Masse)']], value: 'on' },
    { id: 'R', label: 'Widerstand R', unit: 'Ω', min: cfg.Rmin, max: cfg.Rmax, value: cfg.Rdef, scale: 'log', snap: 'E12' },
    { id: 'X', label: cfg.xl, unit: cfg.xu, min: cfg.xmin, max: cfg.xmax, value: cfg.xdef, scale: 'log', snap: cfg.xsnap },
    { id: 'U', label: 'Spannung U', unit: 'V', min: 1, max: 24, value: params.U ?? 10, snap: 1 },
    { id: 'view', type: 'seg', label: 'Ansicht', options: [['plot', 'Verlauf'], ['scope', 'Oszilloskop']], value: 'plot' },
    { id: 'rate', type: 'seg', label: 'Tempo', options: [[1, '1 τ/s'], [0.25, 'Zeitlupe']], value: 1 },
    { type: 'button', label: 'Neu starten', onClick: () => reset() },
  ], (v, id) => {
    if (id === 'sw') return setPhase(v.sw);
    if (id === 'view') return showView();
    if (id === 'rate') return;
    restart(); if (v.view === 'scope') drawScope();
  });
  const out = readout(root, [{ id: 'tau', label: rc ? 'τ = R·C' : 'τ = L/R', hl: true }, { id: 't', label: 'Zeit t' }, { id: 'x', label: rc ? 'u_C(t)' : 'i(t)' }, { id: 'i', label: rc ? 'i(t)' : 'u_L(t)' }, { id: 'p', label: rc ? 'u_C / U' : 'i / I_max' }]);
  root.append(plotBox, scopeBox);
  const gl = [];
  if (want.includes('tau')) gl.push({ id: 'tau', label: `τ = ${fmt(target, 's')} (±5 %)` });
  if (want.includes('charge')) gl.push({ id: 'charge', label: 'aus leerem Zustand voll geladen (≈ 5 τ)' });
  if (want.includes('discharge')) gl.push({ id: 'discharge', label: 'danach auf ≤ 1 % entladen' });
  const g = gl.length ? goals(root, gl, () => complete?.()) : null;
  const note = h('p', { class: 'vz-note', 'aria-live': 'polite' }); root.append(note);

  let phase = 'on', x0 = 0, res = null, tau = 1, tSim = 0, tEnd = 0, xFull = 1, lastK = -1;
  const cur = { x: 0 };

  function simulate() {
    const v = ui.values; tau = rc ? v.R * v.X : v.X / v.R; tEnd = 6 * tau; xFull = rc ? v.U : v.U / v.R;
    const on = phase === 'on';
    const net = new Netlist().V('V1', 'in', '0', v.U).SW('S1', 'in', 'a', { closed: on, ron: 1e-6 }).SW('S2', 'a', '0', { closed: !on, ron: 1e-6 }).R('R1', 'a', 'x', v.R);
    if (rc) net.C('C1', 'x', '0', v.X, x0); else net.L('L1', 'x', '0', v.X, x0);
    res = transient(net, { tstop: tEnd, dt: tau / 120, uic: true });
    const U = v.U;
    sch.set(cfg.X, { value: v.X }); sch.set('R1', { value: v.R }); sch.set('V1', { value: U }); sch.set('SWC', { closed: on });
    spec.iScale = U / v.R; spec.potential.range = U;
    for (const n in res.i) if (rc || n !== cfg.X) res.i[n][0] = res.i[n][1];   // Sprung bei t=0 nicht als Ausreißer zeichnen
    res.v.a[0] = res.v.a[1]; if (!rc) res.v.x[0] = res.v.x[1];
    const t = res.t, i = res.i[cfg.X], ur = Float64Array.from(t, (_, k) => res.v.a[k] - res.v.x[k]), ul = res.v.x;
    const main = rc ? res.v.x : i, xEnd = on ? (rc ? U : U / v.R) : 0;
    // Plot 1
    P1.clear(); P2.clear();
    if (rc) {
      P1.line('uc0', t, res.v.x, { color: 'var(--accent)', width: 2, opacity: 0.28, hover: false, dash: '2 4' });
      P1.line('uc', t.subarray(0, 1), res.v.x.subarray(0, 1), { color: 'var(--accent)', label: 'u_C' });
      P1.line('ur0', t, ur, { color: 'var(--accent-2)', width: 2, opacity: 0.28, hover: false, dash: '2 4' });
      P1.line('ur', t.subarray(0, 1), ur.subarray(0, 1), { color: 'var(--accent-2)', label: 'u_R' });
      P2.line('i0', t, i, { color: 'var(--warn)', width: 2, opacity: 0.28, hover: false, dash: '2 4' });
      P2.line('i', t.subarray(0, 1), i.subarray(0, 1), { color: 'var(--warn)', label: 'i' });
    } else {
      P1.ax.y.unit = 'A';
      P1.line('i0', t, i, { color: 'var(--accent)', width: 2, opacity: 0.28, hover: false, dash: '2 4' });
      P1.line('i', t.subarray(0, 1), i.subarray(0, 1), { color: 'var(--accent)', label: 'i' });
      P2.line('ul0', t, ul, { color: 'var(--warn)', width: 2, opacity: 0.28, hover: false, dash: '2 4' });
      P2.line('ul', t.subarray(0, 1), ul.subarray(0, 1), { color: 'var(--warn)', label: 'u_L' });
      P2.line('ur0', t, ur, { color: 'var(--accent-2)', width: 2, opacity: 0.28, hover: false, dash: '2 4' });
      P2.line('ur', t.subarray(0, 1), ur.subarray(0, 1), { color: 'var(--accent-2)', label: 'u_R' });
    }
    for (const P of [P1, P2]) {
      for (let n = 1; n <= 5; n++) P.vline('tau' + n, n * tau, { label: n === 1 ? 'τ' : n + 'τ', color: 'var(--muted)', dash: '3 5', width: 1 });
      P.range({ x: [0, tEnd] });
    }
    const ref = x0 + (xEnd - x0) * 0.632;
    P1.hline('ref', ref, { label: '63,2 % der Änderung', color: 'var(--ink-2)', dash: '2 4', width: 1.1 });
    note.textContent = rc
      ? (on ? `Laden: u_C strebt gegen U = ${fmt(U, 'V')}; der Strom startet bei U/R = ${fmt(U / v.R, 'A')} und fällt auf 0.` : `Entladen: u_C fällt auf 0; der Strom fließt jetzt in umgekehrter Richtung (negativ).`)
      : (on ? `Einschalten: der Strom steigt langsam auf I = U/R = ${fmt(U / v.R, 'A')}; die Spule bremst zuerst (u_L = U).` : `Ausschalten über den Massekontakt: der Strom fließt weiter und klingt mit τ = L/R ab; u_L kehrt das Vorzeichen um.`);
    lastK = -1;
    drawFrame();
    void main; void xEnd;
  }

  function drawFrame() {
    const k = Math.max(0, Math.min(res.n - 1, Math.round(tSim / (tau / 120))));
    if (k === lastK) return; lastK = k;
    const t = res.t, i = res.i[cfg.X];
    const sub = a => a.subarray(0, k + 1);
    if (rc) {
      P1.set('uc', sub(t), sub(res.v.x)); P1.set('ur', sub(t), sub(Float64Array.from(t, (_, q) => res.v.a[q] - res.v.x[q])));
      P2.set('i', sub(t), sub(i));
    } else {
      P1.set('i', sub(t), sub(i));
      P2.set('ul', sub(t), sub(res.v.x)); P2.set('ur', sub(t), sub(Float64Array.from(t, (_, q) => res.v.a[q] - res.v.x[q])));
    }
    for (const P of [P1, P2]) P.vline('now', t[k], { color: 'var(--ink)', dash: '', width: 1.4 });
    sch.setStateAt(res, k);
    const x = rc ? res.v.x[k] : i[k], U = ui.values.U;
    cur.x = x; cur.k = k;
    out.set({ tau: fmt(tau, 's'), t: `${fmt(t[k], 's')} (${(t[k] / tau).toFixed(1).replace('.', ',')} τ)`, x: fmt(x, rc ? 'V' : 'A'), i: rc ? fmt(i[k], 'A') : fmt(res.v.x[k], 'V'), p: Math.round(x / xFull * 100) + ' %' });
    if (g) {
      if (Math.abs(tau / target - 1) <= 0.05) g.reach('tau');
      if (phase === 'on' && x0 <= 0.02 * xFull && x >= 0.99 * xFull) g.reach('charge');
      if (phase === 'off' && x0 >= 0.9 * xFull && x <= 0.01 * xFull) g.reach('discharge');
    }
    void U;
  }

  const anim = animate(root, dt => {
    if (!res || ui.values.view !== 'plot' && false) return;
    if (tSim >= tEnd) return;
    tSim = Math.min(tEnd, tSim + dt * tau * ui.values.rate); drawFrame();
  });

  function restart() { tSim = 0; simulate(); anim.once?.(); }
  function setPhase(p) { x0 = cur.x ?? 0; phase = p; restart(); if (ui.values.view === 'scope') drawScope(); }
  function reset() { phase = 'on'; x0 = 0; ui.set({ sw: 'on' }, { silent: true }); restart(); }
  function showView() {
    const scopeOn = ui.values.view === 'scope';
    plotBox.style.display = scopeOn ? 'none' : ''; scopeBox.style.display = scopeOn ? '' : 'none';
    sch.svg.parentElement.style.display = scopeOn ? 'none' : '';
    ui.el.querySelector('[data-id="sw"]')?.style.setProperty('display', scopeOn ? 'none' : '');
    ui.el.querySelector('[data-id="rate"]')?.style.setProperty('display', scopeOn ? 'none' : '');
    if (scopeOn) drawScope(); else { lastK = -1; drawFrame(); }
  }
  function drawScope() {
    const v = ui.values, U = v.U, T = 14 * tau, f = 1 / T;
    const net = new Netlist().V('V1', 'in', '0', { wave: waves.square(U / 2, f, { offset: U / 2 }) }).R('R1', 'in', 'x', v.R);
    if (rc) net.C('C1', 'x', '0', v.X); else net.L('L1', 'x', '0', v.X);
    const dt = tau / 100, tr = transient(net, { tstop: 3.2 * T, dt }), k0 = Math.round(T / dt);
    const sig = a => ({ t: tr.t.subarray(k0), v: a.subarray(k0) });
    sc.setSignal('in', sig(tr.v.in));
    if (rc) sc.setSignal('a', sig(tr.v.x));
    else { sc.setSignal('a', sig(Float64Array.from(tr.t, (_, q) => tr.v.in[q] - tr.v.x[q]))); sc.setSignal('b', sig(tr.v.x)); }
    const nice = seq125(1e-8, 50), want1 = U / 4, vd = nice.reduce((b, x) => Math.abs(Math.log(x / want1)) < Math.abs(Math.log(b / want1)) ? x : b);
    const td = seq125(1e-8, 100).reduce((b, x) => Math.abs(Math.log(x / (T / 10))) < Math.abs(Math.log(b / (T / 10))) ? x : b);
    sc.set({ timeDiv: td, trigger: { level: U / 2 }, channels: Object.fromEntries(['in', 'a'].concat(rc ? [] : ['b']).map(c => [c, { vdiv: vd }])) });
    note.textContent = `Oszilloskop: Rechteckquelle mit der Periode T = 14 τ. Mit Cursor (Segment unten am Schirm) lässt sich τ ablesen: die Zeit bis 63 % von ${fmt(U, 'V')} sind ${fmt(0.632 * U, 'V')}.`;
  }

  simulate();
}
