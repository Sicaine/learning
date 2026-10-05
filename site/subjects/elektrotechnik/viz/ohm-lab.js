// D04 Ohm-Labor: U, R einstellen, I/P/R ablesen, U-I-Kennlinie mit Arbeitspunkt; Bauteil: Widerstand | Glühlampe | Diode.
// params: { targets?: [A, A, A] (Standard 5 mA, 20 mA, 100 mA), tol?: relative Toleranz (0,03) }
import { Netlist, dcSolve } from '../../../assets/js/vizkit/circuit.js';
import { characteristic } from '../../../assets/js/vizkit/plot.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { fmt, linspace } from '../../../assets/js/vizkit/si.js';
import { h } from '../../../assets/js/vizkit/base.js';

const lampI = u => 0.6 * Math.pow(Math.max(u, 0) / 12, 0.6);       // Nennwert 12 V / 0,6 A, I ∝ U^0.6 (Modell)
const IS = 1e-14, VT = 0.025852;
const diodeI = u => IS * (Math.exp(u / VT) - 1);

export default function mount(stage, { params = {}, complete }) {
  const targets = params.targets ?? [5e-3, 20e-3, 100e-3], tol = params.tol ?? 0.03;
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const p = characteristic(root, { h: 250, x: { unit: 'V', label: 'U am Bauteil', min: 0, max: 20 }, y: { unit: 'A', label: 'I', min: 0 } });
  const ui = controls(root, [
    { id: 'dev', type: 'seg', label: 'Bauteil', options: [['R', 'Widerstand'], ['lamp', 'Glühlampe 12 V'], ['diode', 'Si-Diode + Vorwiderstand']], value: 'R' },
    { id: 'U', label: 'Quellenspannung U', unit: 'V', min: 0, max: 20, step: 0.1, value: 10 },
    { id: 'R', label: 'Widerstand R', unit: 'Ω', min: 10, max: 10e3, value: 470, scale: 'log', snap: 'E24' },
  ], run);
  const rBox = ui.el.querySelector('[data-id=R]'), rLabel = rBox.querySelector('label span');
  const out = readout(root, [{ id: 'I', label: 'Strom I', hl: true }, { id: 'UB', label: 'U am Bauteil' }, { id: 'P', label: 'Leistung P' }, { id: 'Rd', label: 'R = U/I' }]);
  const g = goals(root, [
    ...targets.map((t, k) => ({ id: 't' + k, label: `Widerstand: I = ${fmt(t, 'A')}` })),
    { id: 'lamp', label: 'Lampe: R bei ≈ 2 V und bei ≈ 12 V vergleichen' },
  ], () => complete?.());
  const note = h('p', { class: 'vz-note' }); root.append(note);
  const seen = {};

  function run() {
    const { dev, U, R } = ui.values;
    rBox.style.display = dev === 'lamp' ? 'none' : '';
    rLabel.textContent = dev === 'diode' ? 'Vorwiderstand R' : 'Widerstand R';
    let I, UB, xs, ys;
    p.clear();
    if (dev === 'R') {
      I = U / R; UB = U;
      p.range({ x: [0, 20], y: [0, 20 / R] });
      p.line('k', [0, 20], [0, 20 / R], { color: 'var(--accent)', label: 'Kennlinie' });
      note.innerHTML = 'Eine <b>Gerade durch den Nullpunkt</b>: Verdoppelst du U, verdoppelt sich I — der Widerstand ist konstant, das Ohmsche Gesetz gilt.';
    } else if (dev === 'lamp') {
      I = lampI(U); UB = U;
      xs = linspace(0, 20, 80); p.range({ x: [0, 20], y: [0, 0.9] });
      p.line('k', xs, xs.map(lampI), { color: 'var(--accent)', label: 'Kennlinie' });
      if (U > 0) p.line('s', [0, 20], [0, 20 * I / U], { color: 'var(--muted)', dash: '5 4', width: 1.5 });
      note.innerHTML = 'Die Kennlinie <b>biegt ab</b>: Der heiße Wolframfaden hat einen größeren Widerstand als der kalte. Die gestrichelte Gerade (Steigung 1/R) gilt nur für diesen einen Punkt.' + (U > 13 ? ' <b>Über 12 V ist die Lampe überlastet</b> (Modell).' : '');
    } else {
      const net = new Netlist().V('V1', 'in', '0', U).R('R1', 'in', 'a', R).D('D1', 'a', '0', { model: 'si' });
      const r = dcSolve(net); I = r.i.R1; UB = r.v.a;
      xs = linspace(0, 1, 120); const ymax = Math.max(1e-3, 1.15 * U / R);
      p.range({ x: [0, 1], y: [0, ymax] });
      p.line('k', xs, xs.map(diodeI), { color: 'var(--accent)', label: 'Dioden-Kennlinie' });
      p.line('l', [0, 1], [U / R, Math.max(0, (U - 1) / R)], { color: 'var(--muted)', dash: '5 4', width: 1.5 });
      note.innerHTML = 'Die Diode leitet erst ab etwa <b>0,6 … 0,7 V</b> — dann steigt der Strom steil, die Spannung bleibt fast konstant. Der <b>Vorwiderstand</b> (gestrichelte Lastgerade) begrenzt den Strom; ohne ihn würde die Diode zerstört.';
    }
    p.marker('op', UB, I, { label: fmt(I, 'A') });
    out.set({ I: fmt(I, 'A'), UB: fmt(UB, 'V'), P: fmt(UB * I, 'W'), Rd: I > 0 ? fmt(UB / I, 'Ω') : '—' });
    if (dev === 'R' && U > 0) targets.forEach((t, k) => { if (Math.abs(I / t - 1) <= tol) g.reach('t' + k); });
    if (dev === 'lamp') {
      if (Math.abs(U - 2) <= 0.5) seen.lo = UB / I;
      if (Math.abs(U - 12) <= 0.5) seen.hi = UB / I;
      if (seen.lo && seen.hi && Math.abs(seen.hi / seen.lo - 1) > 0.3) g.reach('lamp');
    }
  }
  run();
}
