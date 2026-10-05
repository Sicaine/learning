// Mikrofonpegel am SSB-Transceiver: zu leise (wenig Leistung), richtig (ALC zuckt gerade), zu laut (Splatter auf Nachbarfrequenzen).
// Optional ein Sprachkompressor. Modell vereinfacht: ALC greift ab Aussteuerung 0,7, die Endstufe ist bei ≈ 1,2 voll ausgesteuert.
// params: { gain?: Startwert in %, goals?: ['quiet','splatter','opt','comp'] }
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { chart, h, txt, line, rect, poly, hash, dec, clamp } from './_funk.js';

const N = 48;
const speech = (() => { const raw = Array.from({ length: N }, (_, i) => 0.1 + 0.9 * hash(i + 3) ** 2.3); const mx = Math.max(...raw); return raw.map(v => v / mx); })();
const PMAX = 100;   // W PEP (z. B. 80 m, Klasse E)
const outAmp = d => (d <= 0.7 ? d : d <= 1.2 ? 0.7 + 0.3 * (1 - Math.exp(-(d - 0.7) / 0.25)) : 1.0);

export default function mount(stage, { params = {}, complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const tp = chart(root, { h: 190, x: [0, N], y: [0, 1.6], yticks: [0, 0.7, 1.2], yfmt: v => ({ 0: '0', 0.7: 'ALC', 1.2: 'voll' }[v]), aria: 'Aussteuerung der Sendeendstufe über einige Silben Sprache' });
  const sp = chart(root, { h: 190, x: [-4, 8], y: [-70, 5], xticks: [-3, 0, 3, 6], xfmt: v => (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(v) + ' kHz', yticks: [0, -20, -40, -60], yfmt: v => v + ' dB', aria: 'Spektrum des SSB-Signals (USB) mit möglichen Nebenaussendungen' });
  const ui = controls(root, [
    { id: 'gain', label: 'Mikrofonverstärkung', min: 0, max: 100, step: 1, value: params.gain ?? 50, format: v => v + ' %', digits: 0 },
    { id: 'comp', type: 'toggle', label: 'Sprachkompressor (Dynamic Compressor)', value: false },
  ], run);
  const out = readout(root, [{ id: 'pep', label: 'Spitzenleistung', hl: true }, { id: 'avg', label: 'mittlere Leistung' }, { id: 'alc', label: 'ALC-Anzeige' }, { id: 'sp', label: 'Nachbarstation (±3 kHz)', hl: true }]);
  const all = [
    { id: 'quiet', label: 'Zu leise: unter 20 W Spitzenleistung' },
    { id: 'splatter', label: 'Zu laut: Nachbarstation wird gestört' },
    { id: 'opt', label: 'Richtig: ≥ 85 W ohne Splatter' },
    { id: 'comp', label: 'Kompressor: mittlere Leistung steigt' },
  ];
  const g = goals(root, all.filter(d => !params.goals || params.goals.includes(d.id)), () => complete?.());
  const reach = id => { if (!params.goals || params.goals.includes(id)) g.reach(id); };

  function model(G, comp) {
    const drive = speech.map(s => G * (comp ? s ** 0.55 : s));
    const amps = drive.map(outAmp);
    const dp = G;   // Spitzenaussteuerung (lauteste Silbe hat s = 1)
    const pep = PMAX * outAmp(dp) ** 2, avg = PMAX * amps.reduce((a, b) => a + b * b, 0) / N;
    const alc = clamp((dp - 0.7) / 0.5, 0, 1);
    const over = clamp((dp - 1.0) / 0.8, 0, 1);
    const skirt = -55 + 45 * over;   // dBc im Nachbarkanal
    return { drive, pep, avg, alc, skirt, dp };
  }
  function run(v, id) {
    const G = v.gain / 100 * 2, M = model(G, v.comp), M0 = model(G, false);
    tp.clear(); sp.clear();
    const bw = (tp.W - tp.m.l - tp.m.r) / N;
    tp.add(rect(tp.m.l, tp.m.t, tp.W - tp.m.l - tp.m.r, tp.Y(1.2) - tp.m.t, { fill: 'var(--bad)', fo: 0.08 }),
      line(tp.m.l, tp.Y(0.7), tp.W - tp.m.r, tp.Y(0.7), { color: 'var(--warn)', w: 1.4, dash: '5 4' }), line(tp.m.l, tp.Y(1.2), tp.W - tp.m.r, tp.Y(1.2), { color: 'var(--bad)', w: 1.4, dash: '5 4' }),
      txt(tp.W - tp.m.r - 4, tp.Y(1.2) - 5, 'Übersteuerung', { anchor: 'end', fill: 'var(--bad)', size: 10.5 }));
    M.drive.forEach((d, i) => {
      const y = Math.min(d, 1.58), col = d > 1.2 ? 'var(--bad)' : d > 0.7 ? 'var(--warn)' : 'var(--accent)';
      tp.add(rect(tp.X(i) + 1, tp.Y(y), Math.max(1, bw - 2), tp.Y(0) - tp.Y(y), { fill: col, fo: 0.8 }));
    });
    tp.add(txt(tp.m.l + 6, tp.m.t + 12, 'Aussteuerung der Endstufe je Silbe', { fill: 'var(--ink-2)', size: 11 }));
    // Spektrum (USB): Nutzband 0,3–2,7 kHz, Flanken, Nebenaussendungen
    const lv = x => { if (x >= 0.3 && x <= 2.7) return -1; const d = x < 0.3 ? 0.3 - x : x - 2.7; return Math.max(-70, -1 - 200 * d, M.skirt - 3 * Math.max(0, d - 0.3)); };
    const pts = []; for (let x = -4; x <= 8.001; x += 0.05) pts.push([sp.X(x), sp.Y(lv(x))]);
    const area = [[sp.X(-4), sp.Y(-70)], ...pts, [sp.X(8), sp.Y(-70)]];
    sp.add(s2('polygon', area, 'var(--accent)'), poly(pts, { color: 'var(--accent)', w: 1.8 }),
      rect(sp.X(2.7), sp.m.t, sp.X(5.4) - sp.X(2.7), sp.Y(-70) - sp.m.t, { fill: 'var(--ink)', fo: 0.035 }),
      txt(sp.X(4.05), sp.m.t + 14, 'Nachbarstation', { anchor: 'middle', fill: 'var(--ink-2)', size: 11 }),
      txt(sp.X(1.5), sp.Y(-1) - 6, 'USB 0,3 … 2,7 kHz', { anchor: 'middle', fill: 'var(--accent)', size: 11 }));
    const bad = M.skirt > -40;
    out.set({ pep: dec(M.pep, 0) + ' W', avg: dec(M.avg, 0) + ' W', alc: M.alc < 0.02 ? 'ruht' : M.alc < 0.85 ? 'zuckt (grün)' : 'zu hoch (rot)', sp: bad ? 'gestört: Splatter ' + dec(M.skirt, 0) + ' dB' : 'nicht gestört (' + dec(M.skirt, 0) + ' dB)' });
    if (!id) return;
    if (M.pep < 20) reach('quiet');
    if (bad) reach('splatter');
    if (M.pep >= 85 && !bad) reach('opt');
    if (v.comp && M.avg > M0.avg * 1.3) reach('comp');
  }
  function s2(tag, pts, col) { const e = document.createElementNS('http://www.w3.org/2000/svg', tag); e.setAttribute('points', pts.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ')); e.setAttribute('fill', col); e.setAttribute('fill-opacity', '0.18'); return e; }
  run(ui.values);
}
