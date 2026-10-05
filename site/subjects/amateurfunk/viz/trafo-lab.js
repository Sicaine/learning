// Trafo-Labor: Übersetzungsverhältnis, Spannungen und Ströme eines idealen Transformators, mit Windungsbild und Kurvenform.
// params: { Up?: V (Start 230), Np?: 600 }
import { h, s } from '../../../assets/js/vizkit/base.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { fmt } from '../../../assets/js/vizkit/si.js';

export default function mount(stage, { params = {}, complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const svg = s('svg', { class: 'vz-svg', viewBox: '0 0 460 210', role: 'img', 'aria-label': 'Transformator mit Primär- und Sekundärwicklung und Kurvenverlauf' });
  root.append(svg);
  const ui = controls(root, [
    { id: 'Up', type: 'seg', label: 'Primärspannung U_P (eff)', options: [[12, '12 V'], [45, '45 V'], [230, '230 V']], value: params.Up ?? 230 },
    { id: 'Np', label: 'Primärwindungen N_P', min: 10, max: 1000, step: 10, value: params.Np ?? 600, digits: 4 },
    { id: 'Ns', label: 'Sekundärwindungen N_S', min: 5, max: 1000, step: 5, value: 100, digits: 4 },
    { id: 'RL', label: 'Lastwiderstand R_L', unit: 'Ω', min: 1, max: 1000, value: 100, scale: 'log', snap: 'E12' },
  ], run);
  const out = readout(root, [
    { id: 'u', label: 'Übersetzung ü = N_P/N_S' }, { id: 'us', label: 'Sekundärspannung U_S', hl: true },
    { id: 'is', label: 'Sekundärstrom I_S' }, { id: 'ip', label: 'Primärstrom I_P' }, { id: 'p', label: 'Leistung (ideal)' },
  ]);
  const g = goals(root, [
    { id: 'down', label: '230 V → 11,5 V (±5 %) herunter transformieren' },
    { id: 'up', label: '45 V → 180 V (±5 %) herauf transformieren' },
  ], () => complete?.());
  root.append(h('p', { class: 'vz-note', html: 'Ein idealer Transformator überträgt die Leistung verlustfrei: $U_P/U_S = N_P/N_S$ und $I_P/I_S = N_S/N_P$. Hochspannung heißt kleiner Strom.' }));

  const coil = (x, n, label) => {
    const loops = Math.max(2, Math.min(14, Math.round(Math.sqrt(n) / 2.2)));
    const els = [s('text', { x, y: 18, 'text-anchor': 'middle', 'font-size': 13, 'font-weight': 700, fill: 'var(--ink)' }, `${label} = ${n}`)];
    let d = `M${x},30`; const step = 130 / loops;
    for (let i = 0; i < loops; i++) d += ` a${x < 230 ? -14 : 14},${step / 2} 0 0 ${x < 230 ? 0 : 1} 0,${step}`.replace('0 0 0', '0 0 0');
    els.push(s('path', { d, fill: 'none', stroke: 'var(--accent)', 'stroke-width': 2.5 }));
    return els;
  };
  function run() {
    const { Up, Np, Ns, RL } = ui.values;
    const ue = Np / Ns, Us = Up / ue, Is = Us / RL, Ip = Is / ue, P = Us * Is;
    out.set({ u: ue >= 1 ? `${fmt(ue, '').trim() || ue.toFixed(2)}:1`.replace(' ', '') : `1:${(1 / ue).toFixed(2).replace('.', ',')}`, us: fmt(Us, 'V'), is: fmt(Is, 'A'), ip: fmt(Ip, 'A'), p: fmt(P, 'W') });
    const amp = Math.min(70, 28 * Us / Up * Math.sqrt(1) + 8);
    const wave = (y0, a) => { let d = ''; for (let i = 0; i <= 60; i++) { const x = 300 + i * 2.6, y = y0 - a * Math.sin(i / 60 * 4 * Math.PI); d += (i ? 'L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1); } return d; };
    const aP = 26, aS = Math.min(48, 26 * Us / Up);
    svg.replaceChildren(
      s('rect', { x: 0, y: 0, width: 460, height: 210, fill: '#fff', rx: 10 }),
      s('rect', { x: 205, y: 36, width: 8, height: 120, fill: 'var(--ink-2)' }), s('rect', { x: 227, y: 36, width: 8, height: 120, fill: 'var(--ink-2)' }),
      ...coil(110, Np, 'N_P'), ...coil(330 - 90, Ns, 'N_S'),
      s('text', { x: 40, y: 192, 'font-size': 12, fill: 'var(--ink)' }, `U_P = ${Up} V`), s('text', { x: 240, y: 192, 'font-size': 12, fill: 'var(--ink)' }, `U_S = ${fmt(Us, 'V')}`),
      s('line', { x1: 300, y1: 60, x2: 440, y2: 60, stroke: 'var(--line-2)' }), s('path', { d: wave(60, aP * 0.9), fill: 'none', stroke: 'var(--accent)', 'stroke-width': 2 }),
      s('line', { x1: 300, y1: 140, x2: 440, y2: 140, stroke: 'var(--line-2)' }), s('path', { d: wave(140, aS), fill: 'none', stroke: 'var(--accent-2)', 'stroke-width': 2 }),
      s('text', { x: 440, y: 28, 'text-anchor': 'end', 'font-size': 11, fill: 'var(--accent)' }, 'primär'), s('text', { x: 440, y: 105, 'text-anchor': 'end', 'font-size': 11, fill: 'var(--accent-2)' }, 'sekundär'));
    if (Up === 230 && Math.abs(Us / 11.5 - 1) < 0.05) g.reach('down');
    if (Up === 45 && Math.abs(Us / 180 - 1) < 0.05) g.reach('up');
  }
  run();
}
