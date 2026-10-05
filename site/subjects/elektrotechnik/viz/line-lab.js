// Leitungslabor (L58): Impuls läuft über eine verlustfreie Leitung, wird an der Last reflektiert; TDR-Anzeige (Spannung am Leitungsanfang über der Zeit).
// Wellenmodell: hin- und rücklaufende Impulse mit Reflexionsfaktoren Γ_L (Last) und Γ_Q (Quelle), Laufzeit T = ℓ·√ε_r / c.
// params: { z0?: 50, len?: 20 (m), er?: 2.29, rl?: 'open'|Ω, secretLen?: 37 (m) }  Modus „Messaufgabe“: Länge unbekannt, aus der Echo-Laufzeit bestimmen.
import { plot } from '../../../assets/js/vizkit/plot.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { animate } from '../../../assets/js/vizkit/anim.js';
import { fmt } from '../../../assets/js/vizkit/si.js';
import { h } from '../../../assets/js/vizkit/base.js';
import { comma } from './_9-helper.js';

const C0 = 299792458, V0 = 10;
const OPEN = 1e9;
const RL_LIST = [0, 10, 25, 50, 75, 100, 200, 500, OPEN];
const rlName = v => (v === 0 ? 'Kurzschluss' : v >= OPEN ? 'offen' : fmt(v, 'Ω'));

export default function mount(stage, { params = {}, complete, md }) {
  const secret = params.secretLen ?? 37;
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const lineBox = h('div'); root.append(lineBox);
  const lp = plot(lineBox, { h: 230, x: { unit: 'm', label: 'Ort auf der Leitung', min: 0, max: 20 }, y: { unit: 'V', min: -8, max: 8, ticks: [-5, 0, 5] }, legend: true, cursor: false });
  const tdrBox = h('div'); root.append(tdrBox);
  const tp = plot(tdrBox, { h: 200, x: { unit: 's', label: 't (am Leitungsanfang gemessen: TDR)' }, y: { unit: 'V', min: -8, max: 8, ticks: [-5, 0, 5] }, legend: true, cursor: true });
  const modeUi = controls(root, [{ id: 'mode', type: 'seg', options: [['free', 'Experimentieren'], ['task', 'Messaufgabe: Länge unbekannt']], value: 'free' }], () => { applyMode(); build(); });
  const ui = controls(root, [
    { id: 'z0', label: 'Wellenwiderstand Z₀', unit: 'Ω', min: 25, max: 300, step: 5, value: params.z0 ?? 50, format: v => fmt(v, 'Ω') },
    { id: 'er', label: 'Dielektrikum ε_r', min: 1, max: 4, step: 0.01, value: params.er ?? 2.29, format: v => comma(v, 2) },
    { id: 'rl', label: 'Abschluss R_L', min: 0, max: OPEN, values: RL_LIST, value: params.rl === 'open' ? OPEN : (params.rl ?? OPEN), format: rlName },
    { id: 'src', type: 'seg', label: 'Quelle', options: [['match', 'R_Q = Z₀'], ['fifty', 'R_Q = 50 Ω']], value: 'match' },
  ], () => build());
  const lenUi = controls(root, [{ id: 'len', label: 'Leitungslänge ℓ', unit: 'm', min: 1, max: 100, scale: 'log', value: params.len ?? 20, format: v => fmt(v, 'm') }], () => build());
  const loop = animate(root, tick, { speed: 1 });
  loop.controls(root);
  const out = readout(root, [
    { id: 'v', label: 'Ausbreitungsgeschw. v = c/√ε_r' }, { id: 'T', label: 'Laufzeit T (einfach)', hl: true }, { id: 'echo', label: 'Echo kommt nach 2T' },
    { id: 'gl', label: 'Reflexionsfaktor Γ_L' }]);
  const ans = h('div', { class: 'vz-controls vk-row', style: 'display:none;align-items:center;gap:10px;flex-wrap:wrap' });
  const inp = h('input', { type: 'text', inputmode: 'decimal', placeholder: 'ℓ in m', 'aria-label': 'geschätzte Leitungslänge in Metern', style: 'width:110px;padding:6px 8px;border:1px solid var(--line);border-radius:8px;font:inherit' });
  const btn = h('button', { type: 'button', class: 'btn small', text: 'Prüfen' }); const msg = h('span', { class: 'vz-note' });
  ans.append(h('span', { text: 'Deine Länge:' }), inp, btn, msg); root.append(ans);
  const g = goals(root, [
    { id: 'match', label: 'Leitung anpassen: R_L = Z₀ → kein Echo' },
    { id: 'short', label: 'Kurzschluss: Echo mit umgekehrtem Vorzeichen' },
    { id: 'task', label: 'Messaufgabe: Länge aus der Echo-Laufzeit bestimmen (±5 %)' },
  ], () => complete?.());

  let xScale = 1, T = 1e-7, GL = 1, GS = 0, Vi = 5, len = 20, sig = 1e-8, tEnd = 6e-7, v = C0 / 1.5, tcur = 0;
  function applyMode() {
    const task = modeUi.values.mode === 'task';
    lenUi.el.style.display = task ? 'none' : ''; ans.style.display = task ? 'flex' : 'none';
    if (task) ui.set({ er: 2.29, rl: OPEN }, { silent: true });
  }
  const pulse = tau => Math.exp(-(((tau - 2.6 * sig) / sig) ** 2));
  function build() {
    const { z0, er, rl, src } = ui.values, task = modeUi.values.mode === 'task';
    len = task ? secret : lenUi.values.len; v = C0 / Math.sqrt(er); T = len / v;
    const rq = src === 'match' ? z0 : 50;
    GL = rl >= OPEN ? 1 : (rl - z0) / (rl + z0); GS = (rq - z0) / (rq + z0); Vi = V0 * z0 / (z0 + rq);
    sig = T / 14; tEnd = Math.max(6 * T, 12 * sig);
    // TDR-Kurve am Leitungsanfang
    const N = 700, ts = new Float64Array(N), vs = new Float64Array(N);
    for (let i = 0; i < N; i++) { const t = tEnd * i / (N - 1); ts[i] = t; vs[i] = at(0, t).total; }
    tp.range({ x: [0, tEnd] }); tp.line('tdr', ts, vs, { color: 'var(--accent)', width: 2.2, label: 'Spannung am Leitungsanfang', hover: true });
    xScale = task ? 100 : len; lp.ax.x.unit = task ? '%' : 'm'; lp.ax.x.label = task ? 'Ort (Länge unbekannt, in % der Länge)' : 'Ort auf der Leitung'; lp.range({ x: [0, xScale] });
    const echoAmp = Vi * GL; const mark = Vi + Vi * GL;
    out.set({ v: comma(v / C0, 3) + ' · c', T: task ? '?' : fmt(T, 's'), echo: task ? 'aus dem Bild ablesen' : fmt(2 * T, 's'), gl: rl >= OPEN ? '+1 (offen)' : comma(GL, 2) });
    void echoAmp; void mark;
    if (!task) { if (Math.abs(GL) < 0.02 && GS === 0 || (Math.abs(GL) < 0.02)) g.reach('match'); if (GL <= -0.999) g.reach('short'); }
    tcur = Math.min(tcur, tEnd); draw();
  }
  function at(x, t) {   // x in 0..1; Summe aus Hin- und Rücklauf
    let f = 0, b = 0, q = 1;
    for (let k = 0; k < 8; k++) {
      f += q * pulse(t - x * T - 2 * k * T);
      b += q * GL * pulse(t - (2 - x) * T - 2 * k * T);
      q *= GL * GS; if (Math.abs(q) < 1e-3) break;
    }
    return { f: Vi * f, b: Vi * b, total: Vi * (f + b) };
  }
  function draw() {
    const N = 220, xs = new Float64Array(N), fw = new Float64Array(N), bw = new Float64Array(N), tot = new Float64Array(N);
    for (let i = 0; i < N; i++) { const x = i / (N - 1), r = at(x, tcur); xs[i] = x * xScale; fw[i] = r.f; bw[i] = r.b; tot[i] = r.total; }
    lp.line('f', xs, fw, { color: 'var(--accent)', width: 2, label: 'hinlaufende Welle', hover: false });
    lp.line('b', xs, bw, { color: 'var(--bad)', width: 2, label: 'rücklaufende Welle (Echo)', hover: false });
    lp.line('t', xs, tot, { color: 'var(--ink)', width: 1.2, dash: '3 3', label: 'Summe (messbar)', hover: false });
    tp.vline('now', tcur, { color: 'var(--accent-2)', label: '' });
  }
  function tick(dt) { tcur += dt * tEnd / 6; if (tcur > tEnd) tcur = 0; draw(); }
  btn.onclick = () => {
    const val = parseFloat(inp.value.replace(',', '.')); if (!Number.isFinite(val)) { msg.textContent = 'Bitte eine Zahl eingeben.'; return; }
    if (Math.abs(val / secret - 1) <= 0.05) { msg.textContent = `Richtig: ℓ ≈ ${comma(secret, 0)} m (T = ${fmt(T, 's')}).`; g.reach('task'); }
    else msg.textContent = val > secret ? 'Zu lang — denke daran: Das Echo läuft hin und zurück (2T).' : 'Zu kurz — v = c/√ε_r, ε_r = 2,29 (PE).';
  };
  void md; applyMode(); build();
}
