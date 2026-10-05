// D34 zener-lab — Spannungsstabilisierung mit Z-Diode und Vorwiderstand (L30 z-diode).
// Schaltung: U_ein (mit Brumm) – R_V – [Z-Diode ‖ R_Last]. Zusätzlich prüft die Demo den Entwurf an den vier Eckfällen
// (U_ein ± Toleranz, Laststrom min/max).
// params: { uNom?: V (12), tolU?: (0,1), loadMin?: A (5 mA), loadMax?: A (15 mA), uz?: V (5,1), izMin?: A (5 mA), pzMax?: W (0,5), ripDb?: dB (34) }
import { drawSchematic } from '../../../assets/js/vizkit/schematic.js';
import { timePlot } from '../../../assets/js/vizkit/plot.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { fmt } from '../../../assets/js/vizkit/si.js';
import { h } from '../../../assets/js/vizkit/base.js';

const NZ = 6;   // Demo-Annahme: differenzieller Widerstand der Z-Diode r_z ≈ 30 Ω bei 5 mA

// Ein-Knoten-Netz: (U_ein − U)/R_V = I_Z(U) + U/R_Last + I_Last. Z-Kennlinie im Durchbruch: exponentiell, I_Z(U_Z) ≈ 5 mA.
const S_Z = NZ * 0.025852;
const iZener = (U, Uz) => 5e-3 * (Math.exp(Math.min((U - Uz) / S_Z, 700)) - Math.exp(-Uz / S_Z));
function solve(Ue, R, Uz, RL, IL = 0) {
  const f = U => (Ue - U) / R - IL - (RL ? U / RL : 0) - iZener(U, Uz);
  let lo = 0, hi = Math.max(Ue, 1e-6);
  if (f(lo) <= 0) return { U: 0, Iz: 0, IR: Ue / R, IL: 0 };    // Last nicht lieferbar: Ausgang bricht zusammen
  for (let k = 0; k < 70; k++) { const m = (lo + hi) / 2; if (f(m) > 0) lo = m; else hi = m; }
  const U = (lo + hi) / 2;
  return { U, Iz: iZener(U, Uz), IR: (Ue - U) / R, IL: (RL ? U / RL : 0) + IL };
}

export default function mount(stage, { params = {}, complete }) {
  const P = { uNom: 12, tolU: 0.1, loadMin: 5e-3, loadMax: 15e-3, uz: 5.1, izMin: 5e-3, pzMax: 0.5, ripDb: 34, ...params };
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const holder = h('div'), plotBox = h('div'); root.append(holder, plotBox);
  const sch = drawSchematic(holder, {
    parts: [
      { id: 'V1', type: 'V', at: [2, 3], rot: 90, label: 'U_ein' },
      { id: 'R1', type: 'R', at: [6, 3], label: 'R_V' },
      { id: 'ZD1', type: 'ZD', at: [12, 9], rot: 270, label: 'Z', labelPos: 'l' },
      { id: 'RL', type: 'R', at: [17, 3], rot: 90, label: 'R_Last' },
      { type: 'GND', at: [9, 9] },
      { id: 'out', type: 'TERM', at: [20, 3], label: 'U_aus', labelPos: 'r' },
    ],
    wires: [
      { pts: ['V1.p', 'R1.a'], net: 'in' }, { pts: ['R1.b', [12, 3], [17, 3], 'RL.a', [20, 3]], net: 'out' }, { pts: ['ZD1.k', [12, 3]], net: 'out' },
      { pts: ['V1.n', [2, 9], [17, 9], 'RL.b'], net: '0' }, { pts: ['ZD1.a', [12, 9]], net: '0' },
    ],
    maxWidth: 520,
  });
  const p = timePlot(plotBox, { h: 230, legend: true, x: { label: 't' }, y: { min: 0, label: '' } });
  const ui = controls(root, [
    { id: 'Ue', label: 'Eingangsspannung U_ein', unit: 'V', min: 8, max: 24, step: 0.1, value: P.uNom },
    { id: 'rip', label: 'Brummspannung (±)', unit: 'V', min: 0, max: 2, step: 0.05, value: 1 },
    { id: 'R', label: 'Vorwiderstand R_V', unit: 'Ω', min: 100, max: 2.2e3, value: 1e3, scale: 'log', snap: 'E12' },
    { id: 'Uz', type: 'seg', label: 'Z-Spannung U_Z', options: [[3.3, '3,3 V'], [5.1, '5,1 V'], [6.8, '6,8 V'], [9.1, '9,1 V'], [13, '13 V']], value: 5.1 },
    { id: 'RL', label: 'Last R_Last', unit: 'Ω', values: [100, 220, 330, 470, 680, 1e3, 2.2e3, 4.7e3, 10e3, 1e12], value: 1e12, format: v => v >= 1e12 ? '∞ (Leerlauf)' : fmt(v, 'Ω') },
  ], run);
  const out = readout(root, [
    { id: 'U', label: 'U_aus', hl: true }, { id: 'Iz', label: 'I_Z' }, { id: 'Pz', label: 'P_Z' }, { id: 'IL', label: 'I_Last' }, { id: 'PR', label: 'P_RV' }, { id: 'db', label: 'Brummunterdrückung' }, { id: 'st', label: 'Zustand' },
  ]);
  const wcBox = h('div', { class: 'vz-note' }); root.append(wcBox);
  const g = goals(root, [
    { id: 'design', label: `${P.uz.toString().replace('.', ',')} V stabil bei ${fmt(P.loadMin, 'A')} … ${fmt(P.loadMax, 'A')} aus ${P.uNom} V ± ${Math.round(P.tolU * 100)} %` },
    { id: 'rip', label: `Brumm ≥ ${P.ripDb} dB unterdrücken` },
  ], () => complete?.());

  function run() {
    const { Ue, rip, R, Uz, RL } = ui.values, Rl = RL >= 1e12 ? 0 : RL;
    const N = 48, ts = new Float64Array(N + 1), uin = new Float64Array(N + 1), uo = new Float64Array(N + 1);
    let omin = Infinity, omax = -Infinity;
    for (let k = 0; k <= N; k++) {
      ts[k] = k / N * 20e-3; uin[k] = Ue + rip * Math.sin(2 * Math.PI * 100 * ts[k]);
      uo[k] = solve(uin[k], R, Uz, Rl).U; omin = Math.min(omin, uo[k]); omax = Math.max(omax, uo[k]);
    }
    p.line('in', ts, uin, { color: 'var(--accent)', label: 'u_ein', width: 2 });
    p.line('out', ts, uo, { color: 'var(--accent-2)', label: 'u_aus', width: 2.6 });
    p.range({ y: [0, Math.ceil(Math.max(24, Ue + rip))] });
    const op = solve(Ue, R, Uz, Rl);
    const db = rip > 0 && omax - omin > 1e-9 ? 20 * Math.log10((2 * rip) / (omax - omin)) : Infinity;
    const Pz = op.U * op.Iz, PR = op.IR * op.IR * R;
    sch.setState({ v: { in: Ue, out: op.U, 0: 0 }, i: { R1: op.IR, ZD1: -op.Iz, RL: op.IL } });
    sch.set('R1', { value: R }); sch.set('V1', { value: Ue }); sch.set('ZD1', { value: Uz, unit: 'V' });
    sch.set('RL', RL >= 1e12 ? { valueText: '∞' } : { valueText: undefined, value: RL });
    const low = op.Iz < 1e-3, hot = Pz > P.pzMax;
    out.set({ U: fmt(op.U, 'V'), Iz: fmt(op.Iz, 'A'), Pz: fmt(Pz, 'W'), IL: fmt(op.IL, 'A'), PR: fmt(PR, 'W'), db: Number.isFinite(db) ? fmt(db, 'dB', 3) : '–', st: hot ? '⚠ Z-Diode überlastet' : low ? '⚠ Z-Diode sperrt: keine Stabilisierung' : '✓ stabilisiert' });

    // Entwurfsprüfung: vier Eckfälle mit Konstantstrom-Last
    const lo = P.uNom * (1 - P.tolU), hi = P.uNom * (1 + P.tolU);
    const cs = [[lo, P.loadMax], [lo, P.loadMin], [hi, P.loadMin], [hi, P.loadMax]].map(([u, il]) => solve(u, R, Uz, 0, il));
    const izLo = Math.min(...cs.map(c => c.Iz)), izHi = Math.max(...cs.map(c => c.Iz)), pzHi = Math.max(...cs.map(c => c.Iz * c.U)), uLo = Math.min(...cs.map(c => c.U)), uHi = Math.max(...cs.map(c => c.U));
    const okReg = izLo >= P.izMin, okP = pzHi <= P.pzMax;
    wcBox.innerHTML = `<b>Entwurfsprüfung</b> (U_ein ${fmt(lo, 'V')} … ${fmt(hi, 'V')}, Last ${fmt(P.loadMin, 'A')} … ${fmt(P.loadMax, 'A')}): ` +
      `U_aus ${fmt(uLo, 'V')} … ${fmt(uHi, 'V')} · I_Z ${fmt(izLo, 'A')} … ${fmt(izHi, 'A')} (Minimum ${okReg ? '✓' : '✗'} ≥ ${fmt(P.izMin, 'A')}) · P_Z max ${fmt(pzHi, 'W')} (${okP ? '✓' : '✗'} ≤ ${fmt(P.pzMax, 'W')})`;
    if (Uz === P.uz && okReg && okP) g.reach('design');
    if (db >= P.ripDb) g.reach('rip');
  }
  run();
}
