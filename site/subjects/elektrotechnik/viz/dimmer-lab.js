// Dimmer-Labor (L43): Phasenanschnitt mit Triac an ohmscher Last + Relais-Treiber mit/ohne Freilaufdiode.
// Phasenanschnitt: P/P_max = 1 − α/π + sin(2α)/(2π), U_eff = U·√(P/P_max).
// Relais: 12 V / 400 Ω-Spule, L = 0,5 H (typisch), 1 nF Streukapazität am Schalter; Abschalten bei t = 20 µs (Schaltung per MNA-Engine simuliert).
// params: { U?: 230 (V_eff), pTarget?: 0.5, tol?: 0.03, maxSpike?: 15 (V) }
import { Netlist, transient } from '../../../assets/js/vizkit/circuit.js';
import { plot } from '../../../assets/js/vizkit/plot.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { fmt } from '../../../assets/js/vizkit/si.js';
import { h } from '../../../assets/js/vizkit/base.js';

const pRel = a => 1 - a / Math.PI + Math.sin(2 * a) / (2 * Math.PI);

export default function mount(stage, { params = {}, complete, md }) {
  const U = params.U ?? 230, pT = params.pTarget ?? 0.5, tol = params.tol ?? 0.03, maxSpike = params.maxSpike ?? 15;
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const boxA = h('div'), boxB = h('div'); root.append(boxA, boxB);
  const pa = plot(boxA, { h: 270, x: { unit: 's', label: 't', min: 0, max: 0.04 }, y: { unit: 'V', label: 'Spannung', min: -U * 1.5, max: U * 1.5 }, legend: true });
  const pb = plot(boxB, { h: 270, x: { unit: 's', label: 't', min: 0, max: 80e-6, format: v => (+(v * 1e6).toFixed(0)) + ' µs' }, y: { unit: 'V', label: 'Spannung am Schalttransistor (Kollektor)', min: -20, include: [0, 15] }, y2: { unit: 'A', label: 'Spulenstrom', min: 0, max: 0.04 }, legend: true });
  pb.hline('lim', 40, { label: 'Transistor hält ca. 40 V aus', color: 'var(--bad)' });

  const ui = controls(root, [
    { id: 'tab', type: 'seg', options: [['dimmer', 'Triac-Dimmer'], ['relay', 'Relais-Treiber']], value: 'dimmer' },
    { id: 'alpha', label: 'Zündwinkel α', unit: '°', min: 0, max: 180, value: 30, step: 1, format: v => Math.round(v) + ' °' },
    { id: 'diode', type: 'toggle', label: 'Freilaufdiode parallel zur Spule', value: false },
  ], run);
  const el = id => ui.el.querySelector(`[data-id="${id}"]`);
  const outA = readout(root, [{ id: 'ueff', label: 'U_eff an der Last', hl: true }, { id: 'p', label: 'P / P_max' }, { id: 'um', label: 'Spitzenspannung' }]);
  const outB = readout(root, [{ id: 'peak', label: 'Spannungsspitze am Transistor', hl: true }, { id: 'i', label: 'Spulenstrom vor dem Abschalten' }, { id: 'e', label: 'Gespeicherte Energie ½·L·I²' }]);
  const note = h('p', { class: 'vz-note' }); root.append(note);
  const g = goals(root, [{ id: 'p', label: `Dimmer: ${Math.round(pT * 100)} % Leistung (± ${Math.round(tol * 100)} %)` }, { id: 'd', label: `Relais: Spitze unter ${maxSpike} V mit Freilaufdiode` }], () => complete?.());

  const cache = {};
  function relay(diode) {
    if (cache[diode]) return cache[diode];
    const n = new Netlist().V('V1', 'vcc', '0', 12).L('L1', 'vcc', 'x', 0.5).R('Rc', 'x', 'c', 400).C('Cp', 'c', '0', 1e-9)
      .SW('S1', 'c', '0', { schedule: [[0, true], [20e-6, false]], ron: 0.5, roff: 1e9 });
    if (diode) n.D('D1', 'c', 'vcc');
    return cache[diode] = transient(n, { tstop: 80e-6, dt: 40e-9 });
  }

  function run() {
    const v = ui.values, dim = v.tab === 'dimmer';
    boxA.style.display = outA.el.style.display = dim ? '' : 'none';
    boxB.style.display = outB.el.style.display = dim ? 'none' : '';
    el('alpha').style.display = dim ? '' : 'none';
    el('diode').style.display = dim ? 'none' : '';
    if (dim) {
      const a = v.alpha * Math.PI / 180, P = pRel(a), up = U * Math.SQRT2, N = 800;
      const xs = new Float64Array(N + 1), us = new Float64Array(N + 1), uo = new Float64Array(N + 1);
      for (let i = 0; i <= N; i++) {
        const t = 0.04 * i / N, wt = (2 * Math.PI * 50 * t) % Math.PI; xs[i] = t;
        us[i] = up * Math.sin(2 * Math.PI * 50 * t);
        uo[i] = wt >= a ? us[i] : 0;
      }
      pa.line('u', xs, us, { color: 'var(--muted)', label: 'Netzspannung', dash: '5 4', width: 1.4 });
      pa.line('o', xs, uo, { color: 'var(--accent)', label: 'Spannung an der Last', width: 2.2, fill: 0 });
      outA.set({ ueff: fmt(U * Math.sqrt(Math.max(0, P)), 'V', 4), p: (100 * P).toFixed(1).replace('.', ',') + ' %', um: v.alpha >= 90 ? fmt(up * Math.sin(a), 'V', 3) : fmt(up, 'V', 3) });
      note.innerHTML = md(`$\\dfrac{P}{P_{\\max}} = 1-\\dfrac{\\alpha}{\\pi}+\\dfrac{\\sin 2\\alpha}{2\\pi} = ${(100 * P).toFixed(1).replace('.', ',')}\\,\\%$ — die Spannung wird erst ab dem Zündwinkel $\\alpha$ durchgeschaltet; der Triac löscht von selbst im Nulldurchgang des Stroms. Die steilen Flanken sind der Grund für Funkstörungen.`);
      if (Math.abs(P - pT) <= tol) g.reach('p');
    } else {
      const r = relay(v.diode), k0 = 0, step = 3;
      const xs = [], uc = [], il = [];
      for (let k = k0; k < r.t.length; k += step) { xs.push(r.t[k]); uc.push(r.v.c[k]); il.push(r.i.L1[k]); }
      let peak = 0; for (const x of r.v.c) peak = Math.max(peak, x);
      pb.line('uc', xs, uc, { color: 'var(--accent)', label: 'u_CE am Schalter', width: 2 });
      pb.line('il', xs, il, { color: 'var(--accent-2)', label: 'Spulenstrom', axis: 'y2', width: 1.8, dash: '5 4' });
      outB.set({ peak: fmt(peak, 'V', 3), i: fmt(r.i.L1[0], 'A', 3), e: fmt(0.5 * 0.5 * r.i.L1[0] ** 2, 'J', 3) });
      note.innerHTML = md(v.diode
        ? `Mit Freilaufdiode fließt der Spulenstrom beim Abschalten weiter durch die Diode, die Spannung am Transistor bleibt bei etwa $12\\,\\text{V}+0{,}7\\,\\text{V}$.`
        : `Ohne Diode muss der Spulenstrom plötzlich in die winzige Streukapazität: $U = I\\sqrt{L/C} = 0{,}03\\,\\text{A}\\cdot\\sqrt{0{,}5\\,\\text{H}/1\\,\\text{nF}} \\approx 670\\,\\text{V}$ — weit über dem, was der Transistor aushält (in Wirklichkeit schlägt er durch).`);
      if (v.diode && peak < maxSpike) g.reach('d');
    }
  }
  run();
}
