// Zeigerdiagramm-Labor für R, L und C in Reihe oder parallel: rotierende Zeiger, geometrische Addition, Impedanzdreieck, Z = R + jX.
// params: { mode?: 'series'|'parallel' (gesetzt = keine Umschaltung), use?: 'RL'|'RC'|'RLC', U?: V (Standard 10), R?, L?, C?, f? (Startwerte),
//           goals?: ['phi45','phi0','cap'] }
// Reihe: Strom ist Bezug (Realachse), Spannungen werden Spitze an Fuß addiert. Parallel: Spannung ist Bezug, Ströme werden addiert.
// φ ist stets der Phasenwinkel von Z: positiv = induktiv (Spannung eilt vor), negativ = kapazitiv.
import { phasor, impedanceTriangle } from '../../../assets/js/vizkit/phasor.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { fmt } from '../../../assets/js/vizkit/si.js';
import { h } from '../../../assets/js/vizkit/base.js';

const DEG = 180 / Math.PI;
const comma = (x, d = 1) => x.toFixed(d).replace('.', ',').replace('-', '−');

export default function mount(stage, { params = {}, complete }) {
  const U = params.U ?? 10;
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const phWrap = h('div'); root.append(phWrap);
  const triWrap = h('div', { style: 'display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:center' }); root.append(triWrap);
  const triHost = h('div', { style: 'flex:0 1 340px;min-width:0' }); triWrap.append(triHost);
  const tri = impedanceTriangle(triHost, { unit: 'Ω' });
  const animHost = h('div'); root.append(animHost);

  let ph = null, phMode = null;
  function buildPhasor(unit) {
    ph?.destroy(); phWrap.replaceChildren(); animHost.replaceChildren();
    ph = phasor(phWrap, { unit, wave: true, rotate: true, rps: 0.1 });
    ph.loop.controls(animHost, { speeds: [[1, '1×'], [0.25, '¼×'], [0, 'Stopp']] });
  }

  const fixed = params.mode != null;
  const ui = controls(root, [
    ...(fixed ? [] : [{ id: 'mode', type: 'seg', options: [['series', 'Reihenschaltung'], ['parallel', 'Parallelschaltung']], value: 'series' }]),
    { id: 'use', type: 'seg', options: [['RL', 'R + L'], ['RC', 'R + C'], ['RLC', 'R + L + C']], value: params.use ?? 'RLC' },
    { id: 'f', label: 'Frequenz f', unit: 'Hz', min: 10, max: 1e7, value: params.f ?? 1e3, scale: 'log' },
    { id: 'R', label: 'R', unit: 'Ω', min: 1, max: 1e4, value: params.R ?? 100, scale: 'log', snap: 'E12' },
    { id: 'L', label: 'L', unit: 'H', min: 10e-6, max: 1, value: params.L ?? 10e-3, scale: 'log', snap: 'E12' },
    { id: 'C', label: 'C', unit: 'F', min: 1e-9, max: 1e-3, value: params.C ?? 1e-6, scale: 'log', snap: 'E12' },
    { type: 'presets', items: [
      { label: 'X = R (45°)', values: { use: 'RL', f: 1.6e3, R: 100, L: 10e-3 } },
      { label: 'Resonanz', values: { use: 'RLC', f: 1.59e3, R: 100, L: 10e-3, C: 1e-6 } },
    ], reset: true },
  ], run);
  const cols = [
    { id: 'z', label: '|Z|', hl: true }, { id: 'phi', label: 'φ', hl: true }, { id: 'zc', label: 'Z = R + jX' }, { id: 'i', label: 'I gesamt' },
    { id: 'a', label: '' }, { id: 'b', label: '' }, { id: 'c', label: '' },
  ];
  const out = readout(root, cols);
  const lab = {};
  for (const [i, s] of [...out.el.children].entries()) lab[cols[i].id] = s;
  const setLabel = (id, t) => { const n = lab[id].firstChild; if (n && n.nodeType === 3) n.nodeValue = t; };
  const want = params.goals ?? ['phi45', 'phi0'];
  const gdefs = { phi45: 'φ = +45° einstellen (±3°)', phi0: 'φ = 0° mit L und C: Resonanz (±3°)', cap: 'Kapazitives Verhalten: φ < −30°' };
  const g = goals(root, want.map(id => ({ id, label: gdefs[id] })), () => complete?.());

  function run() {
    const v = ui.values, mode = fixed ? params.mode : v.mode, w = 2 * Math.PI * v.f;
    const useL = v.use.includes('L'), useC = v.use.includes('C'), R = v.R;
    if (phMode !== mode) { buildPhasor(mode === 'series' ? 'V' : 'A'); phMode = mode; }
    let Z, phi, Req, Xeq, I, kind;
    if (mode === 'series') {
      const XL = useL ? w * v.L : 0, XC = useC ? 1 / (w * v.C) : 0, X = XL - XC;
      Z = Math.hypot(R, X); phi = Math.atan2(X, R) * DEG; Req = R; Xeq = X; I = U / Z;
      ph.set([
        { id: 'UR', mag: I * R, phase: 0, label: 'U_R', color: 'var(--accent)' },
        ...(useL ? [{ id: 'UL', mag: I * XL, phase: 90, label: 'U_L', color: 'var(--accent-2)', from: 'UR' }] : []),
        ...(useC ? [{ id: 'UC', mag: I * XC, phase: -90, label: 'U_C', color: 'var(--warn)', from: useL ? 'UL' : 'UR' }] : []),
      ], { sum: { id: 'U', of: ['UR', ...(useL ? ['UL'] : []), ...(useC ? ['UC'] : [])], label: 'U', dashed: true }, arc: 'U' });
      out.set({ i: fmt(I, 'A'), a: fmt(I * R, 'V'), b: useL ? fmt(I * XL, 'V') : '–', c: useC ? fmt(I * XC, 'V') : '–' });
      setLabel('a', 'U_R'); setLabel('b', 'U_L'); setLabel('c', 'U_C');
    } else {
      const G = 1 / R, BL = useL ? 1 / (w * v.L) : 0, BC = useC ? w * v.C : 0, B = BC - BL, Y = Math.hypot(G, B);
      Z = 1 / Y; phi = -Math.atan2(B, G) * DEG; Req = G / (Y * Y); Xeq = -B / (Y * Y); I = U * Y;
      ph.set([
        { id: 'IR', mag: U * G, phase: 0, label: 'I_R', color: 'var(--accent)' },
        ...(useC ? [{ id: 'IC', mag: U * BC, phase: 90, label: 'I_C', color: 'var(--warn)', from: 'IR' }] : []),
        ...(useL ? [{ id: 'IL', mag: U * BL, phase: -90, label: 'I_L', color: 'var(--accent-2)', from: useC ? 'IC' : 'IR' }] : []),
      ], { sum: { id: 'I', of: ['IR', ...(useC ? ['IC'] : []), ...(useL ? ['IL'] : [])], label: 'I', dashed: true }, arc: 'I' });
      out.set({ i: fmt(I, 'A'), a: fmt(U * G, 'A'), b: useL ? fmt(U * BL, 'A') : '–', c: useC ? fmt(U * BC, 'A') : '–' });
      setLabel('a', 'I_R'); setLabel('b', 'I_L'); setLabel('c', 'I_C');
    }
    tri.set({ R: Req, X: Xeq });
    kind = Math.abs(phi) < 3 ? 'ohmsch' : phi > 0 ? 'induktiv' : 'kapazitiv';
    out.set({ z: fmt(Z, 'Ω'), phi: `${comma(phi)}° (${kind})`, zc: `${fmt(Req, 'Ω')} ${Xeq < 0 ? '−' : '+'} j ${fmt(Math.abs(Xeq), 'Ω')}` });
    if (Math.abs(phi - 45) <= 3 && useL) g.reach('phi45');
    if (Math.abs(phi) <= 3 && useL && useC) g.reach('phi0');
    if (phi < -30) g.reach('cap');
  }
  run();
}
