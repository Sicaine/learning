// Funkhorizont: geometrischer (optischer) Horizont d ≈ 3,57·√h km (h in m, Erdradius 6371 km), Funkhorizont etwa 15 % weiter (≈ 4,12·√h km).
// Die Wellen folgen der Erdkrümmung ein wenig (Brechung in der Atmosphäre, Rechenmodell mit 4/3 Erdradius).
import { h, s } from '../../../assets/js/vizkit/base.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';

const R = 6371;                                   // km
const geo = hm => Math.sqrt(2 * R * hm / 1000);    // km
const rad = hm => Math.sqrt(2 * (4 / 3) * R * hm / 1000);
const de = (x, d = 1) => (+x.toFixed(d)).toString().replace('.', ',');

export default function mount(stage, { complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const svg = s('svg', { class: 'vz-svg', viewBox: '0 0 360 200', role: 'img', 'aria-label': 'Erdkrümmung, Antennenhöhen und Horizont', style: 'max-width:560px;margin:0 auto;background:var(--surface-2);border:1px solid var(--line);border-radius:12px' });
  root.append(svg);
  const ui = controls(root, [
    { id: 'h1', label: 'Antennenhöhe Station A', min: 1, max: 1000, scale: 'log', step: 1, value: 10, format: v => de(v, 0) + ' m' },
    { id: 'h2', label: 'Antennenhöhe Station B', min: 1, max: 1000, scale: 'log', step: 1, value: 10, format: v => de(v, 0) + ' m' },
    { type: 'presets', label: 'Beispiele', items: [{ label: 'Handfunke 2 m', values: { h1: 2, h2: 2 } }, { label: 'Dachantenne 12 m', values: { h1: 12, h2: 12 } }, { label: 'Berg 600 m ↔ Tal 10 m', values: { h1: 600, h2: 10 } }] },
  ], run);
  const out = readout(root, [
    { id: 'da', label: 'Funkhorizont A' }, { id: 'db', label: 'Funkhorizont B' }, { id: 'tot', label: 'Reichweite A ↔ B (Funkhorizont)', hl: true }, { id: 'opt', label: 'optische Sicht A ↔ B' }, { id: 'plus', label: 'Funk weiter als Sicht' },
  ]);
  const g = goals(root, [
    { id: 'quad', label: 'Beide Antennen auf mindestens die vierfache Höhe (10 m → 40 m): doppelte Reichweite' },
    { id: 'berg', label: 'Reichweite von mehr als 100 km (Berg und Dachantenne)' },
  ], () => complete?.());
  root.append(h('div', { class: 'vz-note', text: 'Faustformel: Funkhorizont ≈ 4,1·√h km mit h in Metern (optische Sicht ≈ 3,6·√h km). Hindernisse (Berge, Gebäude, Wald) und Geländeprofil kommen in der Praxis hinzu: im 2-m- und 70-cm-Band braucht man meist eine Sichtverbindung.' }));

  let live = false;
  function run() {
    const v = ui.values;
    const ga = geo(v.h1), gb = geo(v.h2), ra = rad(v.h1), rb = rad(v.h2);
    out.set({ da: `${de(ra)} km`, db: `${de(rb)} km`, tot: `${de(ra + rb)} km`, opt: `${de(ga + gb)} km`, plus: `+${de(((ra + rb) / (ga + gb) - 1) * 100, 0)} %` });
    // Zeichnung: Balken
    const kids = [];
    const mx = Math.max(ra + rb, 1), sx = d => 20 + d / mx * 320;
    const bar = (y, d, col, label, val) => kids.push(s('rect', { x: 20, y, width: sx(d) - 20, height: 20, rx: 4, fill: col, opacity: .88 }), s('text', { x: 24, y: y + 14, 'font-size': 11, fill: 'var(--surface)', 'font-weight': 700 }, label), s('text', { x: Math.min(sx(d) + 4, 300), y: y + 14, 'font-size': 11, fill: 'var(--ink)', 'font-weight': 700 }, val));
    kids.push(s('text', { x: 20, y: 14, 'font-size': 11, fill: 'var(--muted)', 'font-weight': 600 }, 'Entfernung bis zum Horizont'));
    const tx = (y, d, label) => bar(y, d, label.col, label.t, `${de(d)} km`);
    tx(24, ga, { col: 'var(--ink-2)', t: 'A optisch' }); tx(48, ra, { col: 'var(--accent)', t: 'A Funk' });
    tx(80, gb, { col: 'var(--ink-2)', t: 'B optisch' }); tx(104, rb, { col: 'var(--accent)', t: 'B Funk' });
    tx(140, ga + gb, { col: 'var(--warn)', t: 'A↔B optisch' }); tx(164, ra + rb, { col: 'var(--good)', t: 'A↔B Funk' });
    svg.replaceChildren(...kids);
    if (!live) return;
    if (v.h1 >= 38 && v.h2 >= 38 && Math.abs(v.h1 - v.h2) < 3) g.reach('quad');
    if (ra + rb > 100) g.reach('berg');
  }
  run();
  live = true;
}
