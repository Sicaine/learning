// Fourier-Labor (L55): Signal aus Sinus-Oberwellen zusammensetzen, Tiefpass im Spektrum, Verzerrer erzeugt Oberwellen.
// Teil 1: 15 Harmonische per Ziehen im Spektrum einstellen (Grundwelle fest = 100 %), Presets Rechteck/Dreieck/Säge/Impuls,
//         Phasenversatz der Oberwellen, idealer Tiefpass (Grenze n_g). Teil 2: Sinus durch Begrenzer (hart/weich) → Spektrum + THD.
// params: { f0?: 1000 (Hz, Grundfrequenz nur für Beschriftung), distortGoal?: 20 (% THD) }
import { plot, spectrum } from '../../../assets/js/vizkit/plot.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { fmt } from '../../../assets/js/vizkit/si.js';
import { h, s, boxWidth } from '../../../assets/js/vizkit/base.js';
import { comma } from './_9-helper.js';

const NH = 15, TAU = 2 * Math.PI;
// Relative Amplitude (Grundwelle = 1) und Phase (Grad, sin-Basis) der n-ten Harmonischen
const SERIES = {
  square: n => (n % 2 ? [1 / n, 0] : [0, 0]),
  triangle: n => (n % 2 ? [1 / (n * n), ((n - 1) / 2) % 2 ? 180 : 0] : [0, 0]),
  saw: n => [1 / n, n % 2 ? 0 : 180],
  pulse: n => { const d = 0.2, v = Math.sin(n * Math.PI * d) / (n * Math.sin(Math.PI * d)); return [Math.abs(v), v >= 0 ? 90 : 270]; },
};
const PULSE_DC = 0.2 * Math.PI / (2 * Math.sin(Math.PI * 0.2));
const NAMES = { free: 'Eigenbau', square: 'Rechteck', triangle: 'Dreieck', saw: 'Sägezahn', pulse: 'Impulsfolge (20 %)' };

function load(mode) {
  const amp = new Array(NH + 1).fill(0), ph = new Array(NH + 1).fill(0);
  if (mode === 'free') { amp[1] = 1; return { amp, ph, dc: 0 }; }
  for (let n = 1; n <= NH; n++) { const [a, p] = SERIES[mode](n); amp[n] = a; ph[n] = p; }
  return { amp, ph, dc: mode === 'pulse' ? PULSE_DC : 0 };
}
function limitCurve(mode, ts, f0) {   // „unendliche“ Reihe als Zielkurve
  const m = mode === 'free' ? 'square' : mode, dc = m === 'pulse' ? PULSE_DC : 0, y = new Float64Array(ts.length).fill(dc), NN = 301;
  for (let n = 1; n <= NN; n++) { const [a, p] = SERIES[m](n); if (!a) continue; for (let i = 0; i < ts.length; i++) y[i] += a * Math.sin(TAU * n * f0 * ts[i] + p * Math.PI / 180); }
  return y;
}

export default function mount(stage, { params = {}, complete, md }) {
  const f0 = params.f0 ?? 1000, thdGoal = params.distortGoal ?? 20;
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const st = { mode: 'free', ...load('free'), shift: 0, lp: NH, helped: false, showTarget: false };
  const heads = t => h('p', { class: 'vz-note', html: t });

  // ── Teil 1 ──
  root.append(heads('<b>Teil 1 — Signal aus Sinus-Schwingungen zusammensetzen.</b> Ziehe im Spektrum die Balken der Oberwellen (Grundwelle = 100 %, fest).'));
  const tpBox = h('div'); root.append(tpBox);
  const tp = plot(tpBox, { h: 240, x: { unit: 's', label: 't', min: 0, max: 2 / f0, format: v => comma(v * f0, 1) + ' T' }, y: { unit: 'V', min: -1.6, max: 1.6, ticks: [-1.5, -1, -0.5, 0, 0.5, 1, 1.5] }, legend: true, cursor: false });
  const spBox = h('div', { class: 'vz-plotbox' }); root.append(spBox);
  const W = boxWidth(spBox), H = 210, ml = 40, mr = 8, mt = 14, mb = 36, cw = (W - ml - mr) / NH, yOf = a => mt + (H - mt - mb) * (1 - Math.min(1, a));
  const svg = s('svg', { viewBox: `0 0 ${W} ${H}`, class: 'vz-svg', style: 'touch-action:none;cursor:ns-resize;width:100%;height:auto;display:block', role: 'img', 'aria-label': 'Spektrum: Amplituden der Oberwellen, per Ziehen einstellbar' });
  spBox.append(svg);
  function drawSpec() {
    let g = '';
    for (const a of [0, 0.5, 1]) g += `<line x1="${ml}" x2="${W - mr}" y1="${yOf(a)}" y2="${yOf(a)}" stroke="var(--line)" stroke-width="1"/><text x="${ml - 6}" y="${yOf(a) + 4}" text-anchor="end" font-size="11" fill="var(--muted)">${a * 100} %</text>`;
    for (let n = 1; n <= NH; n++) {
      const x = ml + cw * (n - 0.5), a = st.amp[n], off = n > st.lp, y = yOf(a), bw = Math.min(26, cw * 0.66);
      g += `<rect x="${x - bw / 2}" y="${y}" width="${bw}" height="${Math.max(0, yOf(0) - y)}" rx="3" fill="${off ? 'var(--muted)' : 'var(--accent)'}" opacity="${off ? 0.35 : 0.88}"/>`;
      if (st.showTarget) { const [ta] = st.mode === 'free' ? SERIES.square(n) : SERIES[st.mode](n); g += `<line x1="${x - bw / 2 - 2}" x2="${x + bw / 2 + 2}" y1="${yOf(ta)}" y2="${yOf(ta)}" stroke="var(--accent-2)" stroke-width="2.4"/>`; }
      if (a > 0.015) g += `<text x="${x}" y="${y - 4}" text-anchor="middle" font-size="10.5" fill="var(--ink-2)">${Math.round(a * 100)}</text>`;
      g += `<text x="${x}" y="${H - mb + 15}" text-anchor="middle" font-size="11.5" fill="var(--ink)">${n}</text>`;
    }
    g += `<text x="${ml + (W - ml - mr) / 2}" y="${H - 6}" text-anchor="middle" font-size="11" fill="var(--muted)">Harmonische n (n · f₀, f₀ = ${fmt(f0, 'Hz')}) — ziehen</text>`;
    svg.innerHTML = g;
  }
  let dragging = false;
  const pick = e => {
    const r = svg.getBoundingClientRect(), x = (e.clientX - r.left) * W / r.width, y = (e.clientY - r.top) * H / r.height;
    const n = Math.floor((x - ml) / cw) + 1; if (n < 2 || n > NH) return;
    const a = Math.max(0, Math.min(1, 1 - (y - mt) / (H - mt - mb)));
    if (st.mode !== 'free') { const keep = st.amp.slice(), kp = st.ph.slice(); st.mode = 'free'; st.amp = keep; st.ph = kp; st.dc = 0; }
    st.amp[n] = Math.round(a * 100) / 100; update();
  };
  svg.addEventListener('pointerdown', e => { dragging = true; svg.setPointerCapture(e.pointerId); pick(e); });
  svg.addEventListener('pointermove', e => { if (dragging) pick(e); });
  svg.addEventListener('pointerup', () => { dragging = false; });
  svg.addEventListener('pointercancel', () => { dragging = false; });

  const MODES = ['free', 'square', 'triangle', 'saw', 'pulse'];
  const applyMode = m => { Object.assign(st, load(m), { mode: m }); st.helped = m !== 'free'; };
  const ui = controls(root, [
    { type: 'presets', label: 'Vorlage', items: [
      { label: 'Eigenbau (leer)', values: { mode: 0 } }, { label: 'Rechteck', values: { mode: 1 } }, { label: 'Dreieck', values: { mode: 2 } },
      { label: 'Sägezahn', values: { mode: 3 } }, { label: 'Impulsfolge', values: { mode: 4 } }] },
    { id: 'shift', type: 'seg', label: 'Phase der Oberwellen', options: [[0, '0°'], [45, '+45°'], [90, '+90°']], value: 0 },
    { id: 'lp', label: 'Tiefpass: Grenze n_g', min: 1, max: NH, step: 1, value: NH, format: v => (v >= NH ? 'aus' : 'n ≤ ' + v) },
    { id: 'target', type: 'toggle', label: 'Sollwerte (Hilfe) zeigen', value: false },
  ], (v, id) => {
    if (id === 'preset') applyMode(MODES[v.mode] ?? 'free');
    st.shift = +v.shift; st.lp = v.lp; st.showTarget = !!v.target; if (v.target) st.helped = true;
    update();
  });
  const out = readout(root, [
    { id: 'name', label: 'Signalform', hl: true }, { id: 'err', label: 'Abweichung vom Ziel' }, { id: 'thd', label: 'Klirrfaktor k (bis n_g)' }, { id: 'p3', label: 'n=3 relativ zu n=1' }]);
  const g1 = goals(root, [
    { id: 'build', label: 'Rechteck nachbauen: n=3…13 (ungerade) ≈ 100/n % (±4), gerade ≈ 0, ohne Hilfe' },
    { id: 'lp', label: 'Tiefpass n_g ≤ 5 auf ein Rechteck anwenden: Ecken werden rund' },
  ], () => maybeDone());

  // ── Teil 2: Verzerrer ──
  root.append(heads('<b>Teil 2 — Verzerrung erzeugt Oberwellen.</b> Ein Sinus (Frequenz f₀) läuft durch einen Verstärker, der bei ±1 V begrenzt.'));
  const dpBox = h('div'); root.append(dpBox);
  const dp = plot(dpBox, { h: 200, x: { unit: 's', label: 't', min: 0, max: 3 / f0, format: v => comma(v * f0, 1) + ' T' }, y: { unit: 'V', min: -3, max: 3, ticks: [-3, -1, 0, 1, 3] }, legend: true, cursor: false });
  const dsBox = h('div'); root.append(dsBox);
  const ds = spectrum(dsBox, { h: 190, fmin: 0, fmax: 10.6 * f0, unit: 'V', x: { min: 0, max: 10.6 * f0, ticks: Array.from({ length: 10 }, (_, i) => (i + 1) * f0) } });
  const ui2 = controls(root, [
    { id: 'drive', label: 'Eingangsamplitude (Begrenzung bei 1 V)', unit: 'V', min: 0.5, max: 6, step: 0.1, value: 0.8, digits: 2, format: v => comma(v, 1) + ' V' },
    { id: 'kind', type: 'seg', options: [['hard', 'hart (Clipping)'], ['soft', 'weich (tanh)']], value: 'hard' },
  ], run2);
  const out2 = readout(root, [{ id: 'thd2', label: 'Klirrfaktor k', hl: true }, { id: 'h3', label: '3. Oberwelle' }, { id: 'state', label: 'Zustand' }]);
  const g2 = goals(root, [{ id: 'dist', label: `übersteuern, bis der Klirrfaktor über ${thdGoal} % liegt` }], () => maybeDone());
  let doneFired = false;
  function maybeDone() { if (!doneFired && g1.all && g2.all) { doneFired = true; complete?.(); } }

  function update() {
    const N = 480, ts = new Float64Array(N), yIn = new Float64Array(N).fill(st.dc), yOut = new Float64Array(N).fill(st.dc);
    for (let i = 0; i < N; i++) ts[i] = 2 * i / (N - 1) / f0;
    let nz = 0, p2 = 0;
    for (let n = 1; n <= NH; n++) {
      const a = st.amp[n]; if (!a) continue; nz++;
      const ph = (st.ph[n] + (n > 1 ? st.shift : 0)) * Math.PI / 180;
      if (n > 1) p2 += a * a * (n <= st.lp ? 1 : 0);
      for (let i = 0; i < N; i++) { const v = a * Math.sin(TAU * n * f0 * ts[i] + ph); yIn[i] += v; if (n <= st.lp) yOut[i] += v; }
    }
    const tgt = limitCurve(st.mode, ts, f0), tgtFull = new Float64Array(N);
    for (let i = 0; i < N; i++) tgtFull[i] = tgt[i];
    tp.line('tgt', ts, tgtFull, { color: 'var(--muted)', dash: '5 4', width: 1.6, label: 'Ziel: ' + (st.mode === 'free' ? 'Rechteck' : NAMES[st.mode]), hover: false });
    if (st.lp < NH) tp.line('in', ts, yIn, { color: 'var(--accent-2)', width: 1.4, label: 'vor dem Tiefpass', hover: false }); else tp.remove('in');
    tp.line('out', ts, yOut, { color: 'var(--accent)', width: 2.4, label: st.lp < NH ? 'nach dem Tiefpass' : 'Summe der Sinus-Schwingungen' });
    // Abweichung (ohne Tiefpass, ohne Phasenversatz-Bewertung)
    let e2 = 0, r2 = 0; for (let i = 0; i < N; i++) { e2 += (yIn[i] - tgt[i]) ** 2; r2 += (tgt[i] - st.dc) ** 2; }
    const err = Math.sqrt(e2 / r2) * 100;
    drawSpec();
    const thd = Math.sqrt(p2) / Math.max(st.amp[1], 1e-9) * 100;
    out.set({ name: st.mode === 'free' ? `Eigenbau (${nz} Harmonische)` : NAMES[st.mode], err: comma(err, 0) + ' %', thd: comma(thd, 1) + ' %', p3: comma(st.amp[3] * 100, 0) + ' %' });
    // Ziele
    if (st.mode === 'free' && !st.helped && st.shift === 0) {
      let ok = true; for (let n = 2; n <= 13; n++) { const t = n % 2 ? 1 / n : 0, tol = n % 2 ? 0.04 : 0.04; if (Math.abs(st.amp[n] - t) > tol) ok = false; }
      if (ok) g1.reach('build');
    }
    const sq = []; let all = true; for (let n = 1; n <= NH; n += 2) if (Math.abs(st.amp[n] - 1 / n) > 0.05) all = false; for (let n = 2; n <= NH; n += 2) if (st.amp[n] > 0.05) all = false;
    if (all && st.lp <= 5) g1.reach('lp'); void sq;
  }

  function run2() {
    const { drive, kind } = ui2.values, N = 360, ts = new Float64Array(N), yi = new Float64Array(N), yo = new Float64Array(N);
    const clip = x => (kind === 'hard' ? Math.max(-1, Math.min(1, x)) : Math.tanh(x));
    for (let i = 0; i < N; i++) { ts[i] = 3 * i / (N - 1) / f0; yi[i] = drive * Math.sin(TAU * f0 * ts[i]); yo[i] = clip(yi[i]); }
    dp.line('in', ts, yi, { color: 'var(--muted)', dash: '5 4', width: 1.4, label: 'Eingang', hover: false });
    dp.line('out', ts, yo, { color: 'var(--accent)', width: 2.4, label: 'Ausgang' });
    dp.hline('c1', 1, { color: 'var(--bad)', dash: '4 4' }); dp.hline('c2', -1, { color: 'var(--bad)', dash: '4 4' });
    const M = 2048, b = []; for (let n = 1; n <= 10; n++) { let sum = 0; for (let k = 0; k < M; k++) { const th = TAU * k / M; sum += clip(drive * Math.sin(th)) * Math.sin(n * th); } b.push(Math.abs(2 * sum / M)); }
    ds.set(Array.from({ length: 10 }, (_, i) => (i + 1) * f0), b, { labels: (x, y) => comma(y, 2) + ' V', labelMin: 0.02 });
    ds.range({ y: [0, Math.max(1.4, b[0] * 1.15)] });
    const thd = Math.sqrt(b.slice(1).reduce((a, v) => a + v * v, 0)) / b[0] * 100;
    out2.set({ thd2: comma(thd, 1) + ' %', h3: comma(b[2] / b[0] * 100, 1) + ' % von f₀', state: drive <= 1 ? 'linear (keine Begrenzung)' : (kind === 'hard' ? 'übersteuert' : 'sättigt') });
    if (kind === 'hard' && thd > thdGoal) g2.reach('dist');
  }
  void md;
  update(); run2();
}
