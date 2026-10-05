// Gleichstrommotor- und Generator-Labor (L50): Anlaufstrom, Gegen-EMK, Kennlinien n(M) und I(M), Umschalter Motor/Generator.
// Modell (fremderregt/Permanentmagnet): U = I·R_A + k·ω, M = k·I, k = 0,05 V·s (= N·m/A), Trägheit J = 2·10⁻⁴ kg·m², konstantes Lastmoment.
// params: { k?: 0.05, J?: 2e-4 }
import { plot } from '../../../assets/js/vizkit/plot.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { fmt } from '../../../assets/js/vizkit/si.js';
import { h } from '../../../assets/js/vizkit/base.js';

export default function mount(stage, { params = {}, complete }) {
  const K = params.k ?? 0.05, J = params.J ?? 2e-4;
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const ui = controls(root, [
    { id: 'mode', type: 'seg', options: [['motor', 'Motor'], ['gen', 'Generator']], value: 'motor' },
    { id: 'U', label: 'Quellenspannung U_q', unit: 'V', min: 3, max: 24, step: 0.5, value: 12, digits: 3 },
    { id: 'R', label: 'Ankerwiderstand R_A', unit: 'Ω', min: 0.1, max: 2, step: 0.1, value: 0.5, digits: 2 },
    { id: 'M', label: 'Lastmoment M', unit: 'N·m', min: 0, max: 1, step: 0.01, value: 0.12, digits: 3 },
    { id: 'nd', label: 'Antriebsdrehzahl (Generator)', unit: 'min⁻¹', min: 200, max: 3000, step: 50, value: 1500, format: v => Math.round(v) + ' min⁻¹' },
    { id: 'RL', label: 'Lastwiderstand R_L (Generator)', unit: 'Ω', min: 1, max: 50, step: 1, value: 10, digits: 3 },
  ], run);
  const el = id => ui.el.querySelector(`[data-id="${id}"]`);
  const btnRow = h('div', { class: 'dg-actions', style: 'display:flex;gap:8px;justify-content:center;margin:6px 0' });
  const start = h('button', { type: 'button', class: 'btn small', text: 'Motor einschalten (Anlauf zeigen)' });
  btnRow.append(start); root.append(btnRow);
  const boxA = h('div'), boxB = h('div'), boxC = h('div');
  root.append(boxA, boxB, boxC);
  const pa = plot(boxA, { h: 250, legend: true, x: { unit: 's', label: 't', min: 0, max: 0.3, format: v => Math.round(v * 1000) + ' ms' }, y: { label: 'I, U', min: 0, format: v => +v.toFixed(1) } });
  const pb = plot(boxB, { h: 250, legend: true, x: { unit: 'N·m', label: 'Lastmoment M', min: 0, max: 1 }, y: { label: 'n (1/min)', min: 0, format: v => Math.round(v) }, y2: { label: 'I', unit: 'A', min: 0 } });
  const pc = plot(boxC, { h: 250, legend: true, x: { unit: 'min⁻¹', label: 'Antriebsdrehzahl n', min: 0, max: 3000, format: v => Math.round(v) + ' min⁻¹' }, y: { unit: 'V', label: 'U', min: 0 } });
  const out = readout(root, [
    { id: 'a', label: 'Anlaufstrom U/R_A', hl: true }, { id: 'e', label: 'Gegen-EMK U_i' }, { id: 'i', label: 'Betriebsstrom I', hl: true },
    { id: 'n', label: 'Drehzahl n' }, { id: 'u', label: 'Klemmenspannung' }, { id: 'p', label: 'Wirkungsgrad η' },
  ]);
  const note = h('div', { class: 'vz-note', 'aria-live': 'polite' }); root.append(note);
  const g = goals(root, [
    { id: 'start', label: 'Anlauf starten: Spitzenstrom = U_q / R_A' },
    { id: 'load', label: 'Last erhöhen: Gegen-EMK sinkt, Strom steigt' },
    { id: 'gen', label: 'Generator: Welle antreiben, Spannung erzeugen' },
  ], () => complete?.());
  
  function runup(U, R, M) {
    const dt = 2e-4, N = 1500, ts = new Float64Array(N), is = new Float64Array(N), es = new Float64Array(N);
    let w = 0;
    for (let k = 0; k < N; k++) {
      const I = (U - K * w) / R, T = K * I - (w > 0.5 ? M : Math.min(M, K * I));
      w = Math.max(0, w + T / J * dt); ts[k] = k * dt; is[k] = I; es[k] = K * w;
    }
    return { ts, is, es };
  }
  function run() {
    const { mode, U, R, M, nd, RL } = ui.values;
    pa.clear(); pb.clear(); pc.clear();
    const isGen = mode === 'gen';
    for (const id of ['U', 'M']) el(id).style.display = isGen ? 'none' : '';
    for (const id of ['nd', 'RL']) el(id).style.display = isGen ? '' : 'none';
    start.style.display = isGen ? 'none' : '';
    boxA.style.display = boxB.style.display = isGen ? 'none' : ''; boxC.style.display = isGen ? '' : 'none';
    if (!isGen) {
      const stall = K * U / R, Mmax = Math.min(1, stall);
      const Ia = U / R, Mn = Math.min(M, stall * 0.999), I = Mn / K, Ui = U - I * R, w = Ui / K, n = w * 60 / (2 * Math.PI);
      const eta = I > 0 ? (Mn * w) / (U * I) : 0;
      out.set({ a: fmt(Ia, 'A', 3), e: fmt(Ui, 'V', 3), i: fmt(I, 'A', 3), n: Math.round(n) + ' min⁻¹', u: fmt(Ui + I * R, 'V', 3), p: (eta * 100).toFixed(0) + ' %' });
      const xs = [], ns = [], is = [];
      for (let k = 0; k <= 100; k++) { const m = Math.min(stall, k / 100); xs.push(k / 100); const mm = Math.min(m, stall); ns.push(Math.max(0, (U - mm / K * R) / K * 60 / (2 * Math.PI))); is.push(mm / K); }
      pb.line('n', xs, ns, { color: 'var(--accent)', label: 'n(M) (fällt linear)', width: 2.4 });
      pb.line('i', xs, is.map((v, k) => k / 100 <= stall ? v : NaN), { color: 'var(--warn)', label: 'I(M) (rechte Achse, steigt linear)', axis: 'y2', width: 2.4, dash: '6 4' });
      pb.marker('op', M, n, { label: 'Betriebspunkt' });
      void Mmax;
      const r = runup(U, R, M);
      pa.line('i', r.ts, r.is, { color: 'var(--warn)', label: 'Strom I(t)', width: 2.4 });
      pa.line('e', r.ts, r.es, { color: 'var(--accent)', label: 'Gegen-EMK U_i(t)', width: 2.4 });
      pa.hline('u', U, { label: 'U_q', color: 'var(--muted)', dash: '5 4' });
      note.textContent = M > stall ? 'Lastmoment über dem Kippmoment: der Motor bleibt stehen (Blockierstrom U/R_A!).' : `Im Betrieb begrenzt die Gegen-EMK den Strom auf ${fmt(I, 'A', 3)}; im Stillstand wären es ${fmt(Ia, 'A', 3)}.`;
      if (Ui < U * 0.95 && M >= 0.4) g.reach('load');
    } else {
      const w = nd * 2 * Math.PI / 60, E = K * w, I = E / (R + RL), Uk = I * RL, Pel = Uk * I, Pmech = (K * I) * w;
      out.set({ a: '–', e: fmt(E, 'V', 3), i: fmt(I, 'A', 3), n: nd + ' min⁻¹', u: fmt(Uk, 'V', 3), p: Pmech > 0 ? (Pel / Pmech * 100).toFixed(0) + ' %' : '–' });
      const xs = [], es = [], uk = [];
      for (let k = 0; k <= 60; k++) { const nn = k * 50; xs.push(nn); es.push(K * nn * 2 * Math.PI / 60); uk.push(K * nn * 2 * Math.PI / 60 * RL / (R + RL)); }
      pc.line('e', xs, es, { color: 'var(--accent)', label: 'Induzierte Spannung E = k·ω (Leerlauf)', width: 2.4 });
      pc.line('u', xs, uk, { color: 'var(--warn)', label: 'Klemmenspannung unter Last', width: 2.4, dash: '6 4' });
      pc.marker('op', nd, Uk, { label: 'Betriebspunkt' });
      note.textContent = `Dieselbe Maschine als Generator: Drehzahl ${nd} min⁻¹ induziert ${fmt(E, 'V', 3)} (E = k·ω, proportional zur Drehzahl). Unter Last fällt an R_A ${fmt(I * R, 'V', 2)} ab.`;
      if (Uk > 2) g.reach('gen');
    }
  }
  start.onclick = () => {
    const { U, R } = ui.values;
    run(); g.reach('start');   // Hochlaufkurve ist bereits im Plot; Spitze = U/R
    note.textContent = `Anlaufstrom: im ersten Moment ist die Gegen-EMK null, also I = U_q/R_A = ${fmt(U / R, 'A', 3)}. Nach ca. ${Math.round(J * R / (K * K) * 3000)} ms ist der Motor hochgelaufen.`;
  };
  run();
}
