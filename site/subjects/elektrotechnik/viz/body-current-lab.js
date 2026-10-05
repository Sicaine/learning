// Körperstrom-Labor (L52): Lehrmodell zur Größenordnung des Körperstroms I = U / R_K und seiner qualitativen Wirkung.
// Kein Messwert, kein medizinischer Grenzwert! Quelle der Größenordnungen: Wikipedia „Stromunfall" (u. a. nach IEC/TS 60479-1),
// Prüfungsbezug: Katalog NK301 (50 V AC / 120 V DC).
// Modell: R_K = R_innen (1 kΩ, Körperinneres/Muskulatur) + R_Haut(U); R_Haut = R_Haut,0 / (1 + U/50 V) – die Haut „bricht" bei höherer Spannung durch.
//   R_Haut,0: trocken 10 kΩ, feucht 2 kΩ, nass 0,5 kΩ (Annahmen). Spannung = Wechselspannung 50 Hz, Einwirkdauer > 1 s.
// params: { goalU?: 12 }
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { fmt } from '../../../assets/js/vizkit/si.js';
import { h, s } from '../../../assets/js/vizkit/base.js';

const SKIN = { dry: 10000, wet: 2000, soaked: 500 };
const R_IN = 1000;
const PATHS = {
  hf: { label: 'Hand – Fuß', flim: 40 },
  hh: { label: 'Hand – Hand', flim: 50 },
  bl: { label: 'Brust – linke Hand', flim: 27 },
};
// Zonen (Wechselstrom 50 Hz): Untergrenze in mA, Text, Farbe
const zones = flim => [
  { a: 0, t: 'kaum oder nicht spürbar', c: 'var(--good)' },
  { a: 1, t: 'Wahrnehmung: Kribbeln', c: 'var(--accent-2)' },
  { a: 10, t: 'Loslassgrenze überschritten: Verkrampfung', c: 'var(--warn)' },
  { a: 25, t: 'Herzrhythmusstörungen / Atemmuskeln möglich', c: 'var(--warn)' },
  { a: flim, t: 'Herzkammerflimmern möglich (bei > 1 s)', c: 'var(--bad)' },
  { a: 100, t: 'Herzkammerflimmern, Verbrennungen', c: 'var(--bad)' },
].sort((x, y) => x.a - y.a);

export default function mount(stage, { params = {}, complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const row = h('div', { style: 'display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:12px;align-items:start' }); root.append(row);
  const figBox = h('div', { class: 'vk-plot' });
  const svg = s('svg', { viewBox: '0 0 300 320', role: 'img', 'aria-label': 'Menschenfigur mit Stromweg' });
  figBox.append(svg);
  const barBox = h('div', { class: 'vk-plot' });
  const bsvg = s('svg', { viewBox: '0 0 300 320', role: 'img', 'aria-label': 'Körperstrom auf logarithmischer Skala' });
  barBox.append(bsvg);
  row.append(figBox, barBox);

  const ui = controls(root, [
    { id: 'U', type: 'seg', label: 'Wechselspannung', options: [[12, '12 V'], [24, '24 V'], [50, '50 V'], [120, '120 V'], [230, '230 V'], [400, '400 V']], value: params.U0 ?? 230 },
    { id: 'skin', type: 'seg', label: 'Haut', options: [['dry', 'trocken'], ['wet', 'feucht'], ['soaked', 'nass']], value: 'dry' },
    { id: 'path', type: 'seg', label: 'Stromweg', options: Object.entries(PATHS).map(([k, v]) => [k, v.label]), value: 'hf' },
  ], run);
  const out = readout(root, [{ id: 'r', label: 'Körperwiderstand R_K' }, { id: 'i', label: 'Körperstrom I = U/R_K', hl: true }, { id: 'z', label: 'Einstufung (qualitativ)', hl: true }]);
  const note = h('div', { class: 'vz-note', 'aria-live': 'polite' }, 'Lehrmodell mit groben Größenordnungen – keine medizinischen Grenzwerte. Wirklich gefährlich wird es durch den Strom; die Spannung bestimmt ihn nur zusammen mit dem Widerstand.'); root.append(note);
  const g = goals(root, [
    { id: 'safe', label: '12 V, nasse Haut: unter 10 mA (Loslassgrenze)' },
    { id: 'danger', label: '230 V, feuchte oder nasse Haut: Flimmerbereich' },
    { id: 'selv', label: '50 V einstellen: Grenze der Schutzkleinspannung (AC)' },
  ], () => complete?.());

  function model(U, skin) {
    const R = R_IN + SKIN[skin] / (1 + U / 50);
    return { R, I: U / R * 1000 };   // I in mA
  }
  function run() {
    const { U, skin, path } = ui.values, m = model(U, skin), Z = zones(PATHS[path].flim);
    let zone = Z[0]; for (const z of Z) if (m.I >= z.a) zone = z;
    out.set({ r: fmt(m.R, 'Ω', 3), i: fmt(m.I / 1000, 'A', 3), z: zone.t });
    // Figur
    let f = `<rect x="0" y="0" width="300" height="320" fill="none"/>
      <circle cx="150" cy="52" r="22" fill="var(--surface)" stroke="var(--ink-2)" stroke-width="3"/>
      <path d="M150 74 V190 M150 92 L108 150 M150 92 L192 150 M150 190 L124 290 M150 190 L176 290" fill="none" stroke="var(--ink-2)" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M150 74 V190 M150 92 L108 150 M150 92 L192 150 M150 190 L124 290 M150 190 L176 290" fill="none" stroke="var(--surface-2)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`;
    const pts = { hf: '192,150 150,92 150,190 124,290', hh: '108,150 150,92 192,150', bl: '150,128 150,92 108,150' }[path];
    f += `<polyline points="${pts}" fill="none" stroke="${zone.c}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="9 7"><animate attributeName="stroke-dashoffset" from="32" to="0" dur="${Math.max(0.25, 1.6 - Math.log10(1 + m.I) * 0.5).toFixed(2)}s" repeatCount="indefinite"/></polyline>`;
    const hand = (x, y) => `<circle cx="${x}" cy="${y}" r="9" fill="${U >= 50 ? 'var(--bad)' : 'var(--accent)'}" opacity=".9"/>`;
    if (path === 'hf') f += hand(192, 150) + `<rect x="108" y="290" width="110" height="8" rx="3" fill="var(--ink-2)"/>`;
    if (path === 'hh') f += hand(108, 150) + hand(192, 150);
    if (path === 'bl') f += hand(108, 150) + `<circle cx="150" cy="130" r="7" fill="var(--bad)" opacity=".8"/>`;
    f += `<text x="150" y="20" text-anchor="middle" font-size="12" font-weight="600" fill="var(--ink-2)">${PATHS[path].label}: ${fmt(U, 'V', 3)} an ${fmt(m.R, 'Ω', 3)}</text>`;
    svg.innerHTML = f;
    // Skala (log, 0,1 mA … 1000 mA)
    const x0 = 58, x1 = 288, yTop = 24, yBot = 292, lg = v => Math.log10(Math.max(0.1, v));
    const yy = v => yBot - (lg(v) + 1) / 4 * (yBot - yTop);
    let b = `<text x="150" y="16" text-anchor="middle" font-size="12" font-weight="600" fill="var(--ink-2)">Strom auf logarithmischer Skala</text>`;
    for (let k = 0; k < Z.length; k++) {
      const a = Math.max(0.1, Z[k].a), c = k + 1 < Z.length ? Z[k + 1].a : 1000;
      b += `<rect x="${x0}" y="${yy(c).toFixed(1)}" width="${x1 - x0}" height="${Math.max(0, yy(a) - yy(c)).toFixed(1)}" fill="${Z[k].c}" opacity="${Z[k] === zone ? '.55' : '.22'}"/>`;
    }
    for (const v of [0.1, 1, 10, 100, 1000]) b += `<line x1="${x0}" x2="${x1}" y1="${yy(v).toFixed(1)}" y2="${yy(v).toFixed(1)}" stroke="var(--line-2)"/><text x="${x0 - 4}" y="${(yy(v) + 4).toFixed(1)}" text-anchor="end" font-size="10" font-family="var(--mono)">${v >= 1 ? v : '0,1'} mA</text>`;
    const my = yy(m.I);
    b += `<line x1="${x0}" x2="${x1}" y1="${my.toFixed(1)}" y2="${my.toFixed(1)}" stroke="var(--ink)" stroke-width="3"/><circle cx="${x1 - 14}" cy="${my.toFixed(1)}" r="6" fill="var(--ink)"/>
      <text x="${x0 + 6}" y="${(my - 6).toFixed(1)}" font-size="12" font-weight="700" fill="var(--ink)">${fmt(m.I / 1000, 'A', 3)}</text>`;
    for (const z of Z.slice(1)) b += `<text x="${x1 - 4}" y="${(yy(z.a) - 3).toFixed(1)}" text-anchor="end" font-size="9.5" fill="var(--muted)">ab ≈ ${z.a} mA</text>`;
    bsvg.innerHTML = b;
    if (U === 12 && skin === 'soaked' && m.I < 10) g.reach('safe');
    if (U === 230 && skin !== 'dry' && m.I >= PATHS[path].flim) g.reach('danger');
    if (U === 50) g.reach('selv');
  }
  run();
}
