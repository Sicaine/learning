// FM-Hub-Labor: Mikrofonpegel → Frequenzhub → Bandbreite (Carson-Näherung B ≈ 2·(Δf + f_NF,max)); die Amplitude bleibt konstant.
// params: { } – Ziele: lauter = mehr Hub (Begrenzer aus), B ≤ 12 kHz durch leiser sprechen, durch kleineren Hub, Pegel 0.
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { chart, h, txt, line, rect, poly, fmtF, dec, trimDec } from './_funk.js';

const J = (n, x) => { let sum = 0; for (let k = 0; k < 60; k++) { const t = (k % 2 ? -1 : 1) * (x / 2) ** (2 * k + n); let f = 1; for (let i = 2; i <= k; i++) f *= i; let g = 1; for (let i = 2; i <= k + n; i++) g *= i; sum += t / (f * g); } return sum; };   // Bessel J_n(x)

export default function mount(stage, { complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const tp = chart(root, { h: 190, x: [0, 2], y: [-12, 12], xticks: [0, 0.5, 1, 1.5, 2], xfmt: v => dec(v, 1) + ' ms', yticks: [-10, -5, 0, 5, 10], yfmt: v => (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(v), ylabel: 'Δf in kHz', aria: 'Momentane Frequenzabweichung des Trägers über der Zeit' });
  const sp = chart(root, { h: 190, x: [-14, 14], y: [0, 1.1], xticks: [-12, -8, -4, 0, 4, 8, 12], xfmt: v => (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(v) + ' kHz', aria: 'Spektrum des FM-Signals um die Trägerfrequenz' });
  const ui = controls(root, [
    { id: 'fm', label: 'höchste NF-Frequenz', unit: 'Hz', min: 300, max: 3000, step: 100, value: 3000 },
    { id: 'lvl', label: 'Mikrofonpegel (Lautstärke)', min: 0, max: 150, step: 5, value: 100, format: v => v + ' %', digits: 0 },
    { id: 'hub', label: 'Hub bei Vollaussteuerung', min: 1, max: 8, step: 0.5, value: 5, format: v => trimDec(v, 1) + ' kHz', digits: 1 },
    { id: 'lim', type: 'toggle', label: 'Begrenzerverstärker im Sender', value: true },
  ], run);
  const out = readout(root, [{ id: 'df', label: 'Hub Δf' }, { id: 'bw', label: 'Bandbreite B ≈ 2·(Δf + f_NF)', hl: true }, { id: 'amp', label: 'HF-Amplitude / Leistung' }]);
  const g = goals(root, [
    { id: 'loud', label: 'Begrenzer aus: lauter sprechen vergrößert den Hub' },
    { id: 'quiet', label: 'B ≤ 12 kHz (bei 3 kHz NF) durch leiser sprechen' },
    { id: 'hub', label: 'B ≤ 12 kHz bei voller Aussteuerung durch kleineren Hub' },
    { id: 'zero', label: 'Pegel 0: Träger bleibt, Hub 0' },
  ], () => complete?.());
  let lowB = null, highB = null;

  function run(v, id) {
    const amp = Math.min(v.lvl / 100, v.lim ? 1 : 1.5);
    const df = v.hub * amp, fm = v.fm / 1000, B = df > 0 ? 2 * (df + fm) : 0;
    tp.clear(); sp.clear();
    // Zeit: Δf(t) = Δf · sin(2π f_m t)
    const pts = []; for (let i = 0; i <= 300; i++) { const t = 2 * i / 300; pts.push([tp.X(t), tp.Y(df * Math.sin(2 * Math.PI * fm * t))]); }
    tp.add(rect(tp.m.l, tp.Y(Math.min(12, df)), tp.W - tp.m.l - tp.m.r, tp.Y(-Math.min(12, df)) - tp.Y(Math.min(12, df)), { fill: 'var(--accent)', fo: 0.07 }),
      line(tp.X(0), tp.Y(0), tp.X(2), tp.Y(0), { color: 'var(--line-2)', w: 1 }), poly(pts, { color: 'var(--accent)', w: 2 }),
      txt(tp.X(1.98), tp.Y(11), 'Frequenz folgt dem NF-Signal, Amplitude bleibt konstant', { anchor: 'end', fill: 'var(--ink-2)', size: 11 }));
    // Spektrum: Bessel-Linien mit Hubindex β = Δf / f_m
    const beta = fm > 0 ? df / fm : 0, N = Math.min(40, Math.ceil(beta + 4));
    for (let n = -N; n <= N; n++) {
      const a = Math.abs(J(Math.abs(n), beta)), x = n * fm;
      if (a < 0.02 || Math.abs(x) > 14) continue;
      sp.add(line(sp.X(x), sp.Y(0), sp.X(x), sp.Y(a), { color: n === 0 ? 'var(--accent)' : 'var(--accent-2)', w: 3 }));
    }
    sp.add(rect(sp.X(-B / 2), sp.m.t, sp.X(B / 2) - sp.X(-B / 2), sp.Y(0) - sp.m.t, { fill: 'var(--accent)', fo: 0.06, stroke: 'var(--accent)', sw: 1 }),
      line(sp.X(-B / 2), sp.Y(1.02), sp.X(B / 2), sp.Y(1.02), { color: 'var(--ink)', w: 1.5 }),
      txt(sp.X(0), sp.Y(1.02) - 5, B > 0 ? 'B ≈ ' + fmtF(B * 1000, 2) : 'unmoduliert: nur Träger', { anchor: 'middle', fill: 'var(--ink)', bold: true }));
    out.set({ df: fmtF(df * 1000, 2), bw: B === 0 ? 'nur Träger (0 Hz)' : fmtF(B * 1000, 2) + (B <= 12 ? '  (≤ 12 kHz)' : ''), amp: 'konstant · 2 W' });
    if (!id) return;
    if (!v.lim && v.lvl <= 30) lowB = B;
    if (!v.lim && v.lvl >= 100) highB = B;
    if (lowB != null && highB != null && highB > lowB) g.reach('loud');
    if (v.fm === 3000 && B > 0 && B <= 12 + 1e-9 && v.hub >= 5 && v.lvl > 0 && v.lvl < 100) g.reach('quiet');
    if (v.fm === 3000 && B > 0 && B <= 12 + 1e-9 && v.lvl === 100 && v.hub < 5) g.reach('hub');
    if (v.lvl === 0) g.reach('zero');
  }
  run(ui.values);
}
