// D22 transformer-lab — Transformator: Windungszahlen, Primärspannung, Last und Kopplung; Spannung, Ströme, Eingangsimpedanz, Leistungsbilanz.
// Die Zahlen kommen aus der Wechselstromrechnung des Schaltungssimulators (50 Hz), der Trafo mit Hauptinduktivität
// L_p = A_L·N_p² (A_L = 100 µH/Windung²) und Kupferwiderstand R = 50 µΩ·N² je Wicklung und Kopplungsfaktor k.
//
// params: { goals?: ['power', 'match'], uMax?: 230, f?: 50 (Hz) }
//   power — aus 230 V ~ etwa 12 V ~ bei 2 A erzeugen (±10 %)
//   match — eine Last von 450 Ω so „übersetzen", dass die Quelle 50 Ω sieht (Z_P = ü²·Z_S, ±8 %)
import { Netlist, acSweep } from '../../../assets/js/vizkit/circuit.js';
import { drawSchematic } from '../../../assets/js/vizkit/schematic.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { fmt } from '../../../assets/js/vizkit/si.js';
import { h } from '../../../assets/js/vizkit/base.js';

const AL = 100e-6;    // H pro Windung² (Hauptinduktivität, Eisenkern)
const RW = 5e-5;      // Ω pro Windung² (Kupferwiderstand je Wicklung)
const pct = x => Math.round(x * 100) + ' %';

export default function mount(stage, { params = {}, complete }) {
  const want = params.goals ?? ['power', 'match'], f0 = params.f ?? 50;
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const spec = {
    potential: { range: 1 }, iScale: 1,
    parts: [
      { id: 'V1', type: 'VAC', at: [2, 2], rot: 90, value: 230, label: 'U_P', labelPos: 'l' },
      { id: 'T1', type: 'T', at: [8, 2], label: 'Trafo', valueText: '' },
      { id: 'RL', type: 'R', at: [16, 2], rot: 90, value: 6.2, label: 'R_L', adjust: { min: 1, max: 10e3, scale: 'log', snap: 'E24' } },
    ],
    wires: [
      { pts: ['V1.a', 'T1.p1'], net: 'in' }, { pts: ['V1.b', 'T1.p2'], net: '0' },
      { pts: ['T1.s1', 'RL.a'], net: 'out' }, { pts: ['T1.s2', 'RL.b'], net: '0' },
    ],
    onChange: (id, v) => { if (id === 'RL') ui.set({ RL: v }); },
  };
  const schHost = h('div'); root.append(schHost);
  const sch = drawSchematic(schHost, spec);

  const ui = controls(root, [
    { type: 'presets', items: [
      { label: 'Netztrafo 230 V → 12 V', values: { Np: 1150, Ns: 60, U: 230, RL: 6.2 } },
      { label: '1 : 3 aufwärts', values: { Np: 200, Ns: 600, U: 10, RL: 450 } },
    ] },
    { id: 'Np', label: 'Windungen primär N_P', min: 100, max: 2000, step: 10, value: 1150, format: v => Math.round(v) + '' },
    { id: 'Ns', label: 'Windungen sekundär N_S', min: 10, max: 600, step: 5, value: 60, format: v => Math.round(v) + '' },
    { id: 'U', label: 'Primärspannung U_P', unit: 'V', min: 5, max: 230, step: 5, value: 230 },
    { id: 'RL', label: 'Lastwiderstand R_L', unit: 'Ω', min: 1, max: 10e3, scale: 'log', snap: 'E24', value: 6.2 },
    { id: 'k', label: 'Kopplungsfaktor k', values: [0.5, 0.7, 0.9, 0.95, 0.98, 0.99, 0.995, 0.999], value: 0.999, format: v => String(v).replace('.', ',') },
  ], run);
  const out = readout(root, [
    { id: 'ue', label: 'Übersetzung ü = N_P/N_S', hl: true }, { id: 'us', label: 'U_S (sekundär)', hl: true }, { id: 'is', label: 'I_S' }, { id: 'ip', label: 'I_P' },
    { id: 'zp', label: 'Z_P = U_P/I_P' }, { id: 'zid', label: 'ü²·R_L (ideal)' }, { id: 'pin', label: 'P_ein' }, { id: 'pout', label: 'P_aus' }, { id: 'eta', label: 'Wirkungsgrad' },
  ]);
  const gl = [];
  if (want.includes('power')) gl.push({ id: 'power', label: '≈ 12 V bei ≈ 2 A aus 230 V (±10 %)' });
  if (want.includes('match')) gl.push({ id: 'match', label: 'Last ≈ 450 Ω so übersetzen, dass die Quelle 50 Ω sieht (Z_P = 50 Ω ±8 %)' });
  const g = gl.length ? goals(root, gl, () => complete?.()) : null;
  const note = h('p', { class: 'vz-note', 'aria-live': 'polite' }); root.append(note);

  function run() {
    const v = ui.values, ue = v.Np / v.Ns;
    const net = new Netlist().V('V1', 'in', '0', { ac: v.U }).R('Rp', 'in', 'p', RW * v.Np * v.Np)
      .add('T', 'T1', ['p', '0', 's', '0'], { lp: AL * v.Np * v.Np, ratio: ue, k: v.k })
      .R('Rs', 's', 'out', RW * v.Ns * v.Ns).R('RL', 'out', '0', v.RL);
    let r;
    try { r = acSweep(net, [f0]); } catch (e) { note.textContent = e.message; return; }
    const us = r.v('out').mag[0], is = us / v.RL, ip = r.i('V1').mag[0], zp = ip > 0 ? v.U / ip : Infinity;
    const pin = Math.abs(v.U * r.i('V1').re[0]), pout = us * us / v.RL;   // Wirkleistung ein / aus
    out.set({
      ue: ue.toFixed(2).replace('.', ','), us: fmt(us, 'V'), is: fmt(is, 'A'), ip: fmt(ip, 'A'),
      zp: fmt(zp, 'Ω'), zid: fmt(ue * ue * v.RL, 'Ω'), pin: fmt(pin, 'W'), pout: fmt(pout, 'W'), eta: pct(Math.min(1, pout / Math.max(pin, 1e-12))),
    });
    sch.set('RL', { value: v.RL }); sch.set('V1', { value: v.U });
    note.textContent = ue > 1
      ? `Abwärts: Spannung ÷ ${ue.toFixed(1).replace('.', ',')}, Strom × ${ue.toFixed(1).replace('.', ',')} (Leistung bleibt, bis auf Verluste). Die Last R_L erscheint der Quelle als ü²·R_L = ${fmt(ue * ue * v.RL, 'Ω')}.`
      : `Aufwärts: Spannung × ${(1 / ue).toFixed(1).replace('.', ',')}, Strom ÷ ${(1 / ue).toFixed(1).replace('.', ',')}. Die Last erscheint der Quelle als ü²·R_L = ${fmt(ue * ue * v.RL, 'Ω')}.`;
    if (g) {
      if (Math.abs(us / 12 - 1) <= 0.10 && Math.abs(is / 2 - 1) <= 0.10 && v.U >= 220) g.reach('power');
      if (Math.abs(v.RL / 450 - 1) <= 0.08 && Math.abs(zp / 50 - 1) <= 0.08) g.reach('match');
    }
  }
  run();
}
