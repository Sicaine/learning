// Kennlinien des Bipolartransistors: Eingangskennlinie I_B(U_BE), Ausgangskennlinienfeld I_C(U_CE) mit Lastgerade und Arbeitspunkt.
// params: { ucc?: 12 (Betriebsspannung), rc?: 220 (Kollektorwiderstand Ω), targetIc?: 0.02 (Ziel-Kollektorstrom A) }
import { characteristic } from '../../../assets/js/vizkit/plot.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { fmt } from '../../../assets/js/vizkit/si.js';
import { h } from '../../../assets/js/vizkit/base.js';
import { VT, isT } from './_5b-helper.js';

const VA = 100;   // Early-Spannung (V)

export default function mount(stage, { params = {}, complete }) {
  const ucc = params.ucc ?? 12, target = params.targetIc ?? 0.02;
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const boxIn = h('div'), boxOut = h('div');
  root.append(boxIn, boxOut);
  const pin = characteristic(boxIn, { h: 230, x: { unit: 'V', label: 'U_BE', min: 0.4, max: 0.9, include: [] }, y: { unit: 'A', label: 'I_B', min: 0, max: 0.8e-3 }, title: 'Eingangskennlinie' });
  const pout = characteristic(boxOut, { h: 300, x: { unit: 'V', label: 'U_CE', min: 0, max: 15 }, y: { unit: 'A', label: 'I_C', include: [0, 0.06] }, title: 'Ausgangskennlinienfeld' });

  const ui = controls(root, [
    { id: 'ib', label: 'Basisstrom I_B', unit: 'A', min: 0, max: 600e-6, step: 5e-6, value: 100e-6 },
    { id: 'b', label: 'Stromverstärkung B (Exemplar)', min: 50, max: 300, step: 10, value: 100, format: v => String(v) },
    { id: 'rc', label: 'Kollektorwiderstand R_C', unit: 'Ω', min: 47, max: 1e3, value: params.rc ?? 220, scale: 'log', snap: 'E12' },
    { id: 'T', label: 'Temperatur', min: -20, max: 100, step: 5, value: 25, format: v => v + ' °C' },
  ], run);
  const out = readout(root, [
    { id: 'ic', label: 'I_C', hl: true }, { id: 'uce', label: 'U_CE' }, { id: 'ube', label: 'U_BE' }, { id: 'B', label: 'B = I_C/I_B' }, { id: 'zone', label: 'Bereich' },
  ]);
  const g = goals(root, [
    { id: 'act', label: `I_C ≈ ${fmt(target, 'A', 2)} im aktiven Bereich (±8 %)` },
    { id: 'sat', label: 'Sättigung erzeugen (U_CE < 0,3 V)' },
    { id: 'temp', label: 'Transistor auf ≥ 75 °C erwärmen' },
  ], () => complete?.());

  // I_C aus I_B und U_CE: Stromverstärkung · Early-Effekt · Sättigungsabfall bei kleinem U_CE
  const icOf = (ib, uce, B, T) => B * (1 + 0.005 * (T - 25)) * ib * (1 + Math.max(uce, 0) / VA) * (1 - Math.exp(-Math.max(uce, 0) / 0.12));
  const grid = []; for (let u = 0; u <= 15.001; u += 0.1) grid.push(u);
  const ugrid = Float64Array.from(grid);

  function run() {
    const { ib, b, rc, T } = ui.values;
    // Eingangskennlinie
    const ube = [], ibc = [];
    for (let u = 0.4; u <= 0.9001; u += 0.005) { ube.push(u); ibc.push(isT(T) / b * (Math.exp(u / VT(T)) - 1)); }
    pin.set('in', Float64Array.from(ube), Float64Array.from(ibc)) ;
    const uBE = ib > 0 ? VT(T) * Math.log(ib * b / isT(T) + 1) : 0;
    pin.hline('ibsel', ib, { color: 'var(--accent-2)', dash: '4 4' });
    if (uBE <= 0.9 && ib > 0) pin.marker('op', uBE, ib, { label: 'Arbeitspunkt', color: 'var(--accent-2)' });
    else pin.removeAnn('op');
    // Ausgangskennlinienfeld: graue Kurvenschar + gewählter Basisstrom
    for (let k = 0; k <= 6; k++) {
      const ibk = k * 100e-6;
      pout.line('c' + k, ugrid, Float64Array.from(grid, u => icOf(ibk, u, b, T)), { color: 'var(--line-2)', width: 1.4, label: k ? undefined : undefined });
    }
    pout.line('sel', ugrid, Float64Array.from(grid, u => icOf(ib, u, b, T)), { color: 'var(--accent)', width: 2.6 });
    // Lastgerade U_CE = U_cc − R_C·I_C
    pout.line('load', Float64Array.from([0, ucc]), Float64Array.from([ucc / rc, 0]), { color: 'var(--accent-2)', dash: '6 4', width: 2 });
    // Arbeitspunkt: Schnittpunkt Kennlinie × Lastgerade (Bisektion)
    let lo = 0, hi = ucc;
    for (let k = 0; k < 50; k++) { const mid = (lo + hi) / 2; if (ucc - rc * icOf(ib, mid, b, T) - mid > 0) lo = mid; else hi = mid; }
    const uce = (lo + hi) / 2, ic = icOf(ib, uce, b, T);
    pout.marker('op', uce, ic, { label: 'Arbeitspunkt', color: 'var(--accent-2)' });
    const sat = uce < 0.3, off = ib < 1e-6;
    out.set({ ic: fmt(ic, 'A', 3), uce: fmt(uce, 'V', 3), ube: ib > 0 ? fmt(uBE, 'V', 3) : '0 V', B: ib > 0 ? (ic / ib).toFixed(0) : '–', zone: off ? 'gesperrt' : sat ? 'Sättigung' : 'aktiv' });
    if (!sat && !off && Math.abs(ic / target - 1) < 0.08) g.reach('act');
    if (sat) g.reach('sat');
    if (T >= 75) g.reach('temp');
  }
  run();
}
