// D33 led-driver-lab — LED mit Vorwiderstand dimensionieren, auch mehrere LEDs in Reihe (L29 dioden).
// params: { iMin?: A (10 mA), iMax?: A (20 mA), pMax?: W (0,25), seriesN?: ≥ N Ziel (3), seriesU?: ≥ U_q Ziel (9 V), color?: Startfarbe ('rot') }
import { drawSchematic } from '../../../assets/js/vizkit/schematic.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { fmt } from '../../../assets/js/vizkit/si.js';
import { h } from '../../../assets/js/vizkit/base.js';
import { DIODES, LED_COLORS, loadPoint } from './_5a-diode.js';

export default function mount(stage, { params = {}, complete }) {
  const iMin = params.iMin ?? 10e-3, iMax = params.iMax ?? 20e-3, pMax = params.pMax ?? 0.25, sN = params.seriesN ?? 3, sU = params.seriesU ?? 9;
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const holder = h('div'); root.append(holder);
  let sch = null, schN = 0;
  const ui = controls(root, [
    { id: 'Uq', label: 'Quellspannung U_q', unit: 'V', values: [3, 3.3, 5, 6, 9, 12, 15, 18, 24], value: 5 },
    { id: 'color', type: 'seg', label: 'LED-Farbe', options: Object.entries(LED_COLORS).map(([k, c]) => [k, c.label.replace('LED ', '')]), value: params.color ?? 'rot' },
    { id: 'N', type: 'seg', label: 'LEDs in Reihe', options: [[1, '1'], [2, '2'], [3, '3'], [4, '4']], value: 1 },
    { id: 'R', label: 'Vorwiderstand R_V', unit: 'Ω', min: 47, max: 2.2e3, value: 1e3, scale: 'log', snap: 'E12' },
  ], run);
  const out = readout(root, [
    { id: 'I', label: 'LED-Strom I', hl: true }, { id: 'Uf', label: 'je LED U_F' }, { id: 'UR', label: 'U am R_V' }, { id: 'PR', label: 'P im R_V' }, { id: 'br', label: 'Helligkeit' }, { id: 'st', label: 'Zustand' },
  ]);
  const g = goals(root, [
    { id: 'ok', label: `${fmt(iMin, 'A')} … ${fmt(iMax, 'A')}, Widerstand ≤ ${fmt(pMax, 'W')}` },
    { id: 'ser', label: `dasselbe mit ≥ ${sN} LEDs an ≥ ${fmt(sU, 'V')}` },
  ], () => complete?.());

  function build(N) {
    if (sch && schN === N) return;
    holder.replaceChildren(); schN = N;
    const parts = [{ id: 'V1', type: 'V', at: [2, 3], rot: 90, label: 'U_q' }, { id: 'R1', type: 'R', at: [6, 3], label: 'R_V' }, { type: 'GND', at: [7, 9] }];
    const wires = [{ pts: ['V1.p', 'R1.a'], net: 'in' }];
    let prev = 'R1.b', net = 'n0';
    for (let k = 0; k < N; k++) {
      parts.push({ id: 'D' + (k + 1), type: 'LED', at: [12 + 5 * k, 3], label: N > 1 ? 'D' + (k + 1) : 'LED' });
      wires.push({ pts: [prev, 'D' + (k + 1) + '.a'], net }); prev = 'D' + (k + 1) + '.k'; net = 'n' + (k + 1);
    }
    const xe = 12 + 5 * (N - 1) + 4;
    wires.push({ pts: [prev, [xe + 1.5, 3], [xe + 1.5, 9], [2, 9], 'V1.n'], net: '0' });
    sch = drawSchematic(holder, { parts, wires, maxWidth: 520 });
  }

  function run() {
    const { Uq, color, N, R } = ui.values, d = DIODES[color];
    build(N);
    const { I, Ud } = loadPoint(d, Uq, R, N);
    const PR = I * I * R, vR = Uq - N * Ud;
    const v = { in: Uq, 0: 0 }; for (let k = 0; k <= N; k++) v['n' + k] = Uq - I * R - k * Ud;
    v.n0 = Uq - I * R;
    const i = { R1: I }; for (let k = 1; k <= N; k++) i['D' + k] = I;
    sch.setState({ v, i });
    for (let k = 1; k <= N; k++) sch.set('D' + k, { color: LED_COLORS[color].css });
    sch.set('R1', { value: R }); sch.set('V1', { value: Uq });
    const pct = Math.round(Math.min(1.5, I / 0.02) * 100);
    const dark = I < 0.2e-3, over = I > iMax * 1.5 || I > 0.03, hot = PR > pMax;
    out.set({
      I: fmt(I, 'A'), Uf: fmt(Ud, 'V'), UR: fmt(vR, 'V'), PR: fmt(PR, 'W'), br: dark ? 'dunkel' : pct + ' %',
      st: dark ? 'dunkel: U_q < N·U_F' : over ? '⚠ LED überlastet' : hot ? '⚠ Widerstand zu heiß' : I < iMin * 0.8 ? 'zu schwach' : '✓ passt',
    });
    const inRange = I >= iMin && I <= iMax && PR <= pMax;
    if (inRange) { g.reach('ok'); if (N >= sN && Uq >= sU) g.reach('ser'); }
  }
  run();
}
