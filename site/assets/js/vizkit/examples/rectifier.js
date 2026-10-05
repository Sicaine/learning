// Gleichrichter mit Siebkondensator: Einweg oder Brücke, Welligkeit gegen die Näherung I/(f·C).
// Der Schaltplan läuft in Zeitlupe nach (Stromfluss + Potenzial). params: { maxRipple?: Volt } — Ziel: Welligkeit unter maxRipple (Standard 0,5 V).
// Einbinden: export { default } from '../../../assets/js/vizkit/examples/rectifier.js';
import { transient } from '../circuit.js';
import { layouts } from '../schematic-layouts.js';
import { drawSchematic } from '../schematic.js';
import { timePlot } from '../plot.js';
import { controls, readout, goals } from '../controls.js';
import { animate } from '../anim.js';
import { fmt } from '../si.js';
import { h } from '../base.js';

export default function mount(stage, { params = {}, complete }) {
  const maxRipple = params.maxRipple ?? 0.5;
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const holder = h('div'), plotBox = h('div');
  root.append(holder, plotBox);
  const p = timePlot(plotBox, { h: 280, legend: true, y: { include: [0] } });
  let sch, res, ids, cur = 0;
  const ui = controls(root, [
    { id: 'type', type: 'seg', options: [['halfWave', 'Einweg'], ['bridge', 'Brücke']], value: 'halfWave' },
    { id: 'C', label: 'Siebkondensator C', unit: 'F', min: 47e-6, max: 4.7e-3, value: 470e-6, scale: 'log', snap: 'E6' },
    { id: 'RL', label: 'Last R_L', unit: 'Ω', min: 47, max: 2.2e3, value: 330, scale: 'log', snap: 'E12' },
  ], (v, id) => { if (id === 'type') build(); run(); });
  const out = readout(root, [{ id: 'hi', label: 'Spitze' }, { id: 'rip', label: 'Welligkeit ΔU', hl: true }, { id: 'th', label: 'Näherung I/(f·C)' }, { id: 'avg', label: 'Mittelwert' }]);
  const g = goals(root, [{ id: 'r', label: `Welligkeit < ${fmt(maxRipple, 'V')}` }], () => complete?.());
  const anim = animate(root, (dt) => {
    if (!res) return;
    cur = (cur + dt * 0.02 / 1) % 0.04;   // 20 ms pro Sekunde Echtzeit-Zeitlupe
    const k = Math.min(res.n - 1, Math.round(res.n - 1 - (0.04 - cur) / 50e-6));
    sch.setState({ v: Object.fromEntries(Object.entries(res.v).map(([n, a]) => [n, a[k]])), i: Object.fromEntries(Object.entries(res.i).map(([n, a]) => [n, a[k]])) });
    p.vline('now', res.t[k], { color: 'var(--ink-2)', dash: '2 3', width: 1.2 });
  });
  anim.controls(root, { speeds: [[1, '1×'], [0.25, '¼×'], [0.05, '0,05×']] });
  let net;
  function build() {
    holder.replaceChildren();
    const L = layouts[ui.values.type]({ C: ui.values.C, RL: ui.values.RL, adjust: false });
    net = L.net; sch = drawSchematic(holder, L.spec);
    ids = ['C1', 'RL'];
  }
  function run() {
    const v = ui.values;
    net.set('C1', v.C); net.set('RL', v.RL); sch.set('C1', { value: v.C }); sch.set('RL', { value: v.RL });
    res = transient(net, { tstop: 0.3, dt: 50e-6 });
    const k0 = res.n - 801, ts = res.t.subarray(k0), uin = res.v[v.type === 'bridge' ? 'a' : 'in'].subarray(k0), uo = res.v.out.subarray(k0);
    let lo = Infinity, hi = -Infinity, sum = 0;
    for (const x of uo) { lo = Math.min(lo, x); hi = Math.max(hi, x); sum += x; }
    const I = sum / uo.length / v.RL, th = I / (50 * (v.type === 'bridge' ? 2 : 1) * v.C);
    p.line('in', ts, v.type === 'bridge' ? Float64Array.from(uin, (x, i) => x - res.v.b[k0 + i]) : uin, { color: 'var(--accent)', label: 'u₁', opacity: 0.55, width: 1.6 });
    p.line('out', ts, uo, { color: 'var(--accent-2)', label: 'u₂ (Last)', fill: lo });
    out.set({ hi: fmt(hi, 'V'), rip: fmt(hi - lo, 'V'), th: fmt(th, 'V'), avg: fmt(sum / uo.length, 'V') });
    if (hi - lo < maxRipple) g.reach('r');
    anim.once();
  }
  build(); run();
}
