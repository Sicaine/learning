// D05 Drahtwiderstand: R = ρ·l/A mit der ρ-Tabelle der BNetzA-Formelsammlung.
// params: { l?: m (Ziel-Leitungslänge, Standard 20), I?: A (Ziel-Strom, Standard 10), maxDrop?: V (Standard 0,5) }
// Ziel: bei Länge l und Strom I weniger als maxDrop Spannungsabfall einstellen (Durchmesser/Material wählen).
import { plot } from '../../../assets/js/vizkit/plot.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { fmt } from '../../../assets/js/vizkit/si.js';
import { h, s } from '../../../assets/js/vizkit/base.js';

// ρ in Ω·mm²/m (Formelsammlung, Tabelle „Spezifischer Widerstand“); Dichte in g/cm³ (übliche Tabellenwerte, Messing je nach Legierung 8,4–8,7)
const MAT = {
  cu: { name: 'Kupfer', rho: 0.018, dens: 8.96, color: '#c4733a' },
  al: { name: 'Aluminium', rho: 0.028, dens: 2.70, color: '#aab3bd' },
  ag: { name: 'Silber', rho: 0.016, dens: 10.49, color: '#c9ced6' },
  au: { name: 'Gold', rho: 0.022, dens: 19.32, color: '#d9a520' },
  fe: { name: 'Eisen', rho: 0.1, dens: 7.87, color: '#6f7480' },
  ms: { name: 'Messing', rho: 0.07, dens: 8.5, color: '#c9a64a' },
};
const dec = (x, d = 2) => x.toFixed(d).replace('.', ',');

export default function mount(stage, { params = {}, complete, md }) {
  const L0 = params.l ?? 20, I0 = params.I ?? 10, maxDrop = params.maxDrop ?? 0.5;
  const root = h('div', { class: 'vz vk' }); stage.append(root);

  // Drahtbild: Dicke ∝ Durchmesser, Länge nur symbolisch
  const svg = s('svg', { viewBox: '0 0 600 110', class: 'vz-svg', role: 'img', 'aria-label': 'Draht mit einstellbarem Durchmesser' });
  const wire = s('rect', { x: 60, y: 55, width: 480, height: 10, rx: 5, fill: '#c4733a' });
  const cut = s('ellipse', { cx: 540, cy: 60, rx: 4, ry: 10, fill: '#00000022' });
  const cap = s('text', { x: 300, y: 98, 'text-anchor': 'middle', 'font-size': 13, fill: 'var(--ink-2)' });
  svg.append(
    s('path', { d: 'M20 60H60M540 60H580', stroke: 'var(--ink-2)', 'stroke-width': 3, 'stroke-linecap': 'round' }),
    wire, cut, cap,
  );
  root.append(svg);

  const p = plot(root, { h: 230, x: { unit: 'mm', label: 'Durchmesser d', min: 0.2, max: 4, format: v => dec(v, 1) + ' mm' }, y: { scale: 'log', unit: 'V', label: 'Spannungsabfall', min: 1e-3, max: 1e2 } });
  const ds = Array.from({ length: 77 }, (_, i) => 0.2 + i * 0.05);
  p.hline('lim', maxDrop, { label: `Grenze ${fmt(maxDrop, 'V')}`, color: 'var(--good)', dash: '5 4' });

  const ui = controls(root, [
    { id: 'mat', type: 'seg', label: 'Material', options: Object.entries(MAT).map(([k, m]) => [k, m.name]), value: 'cu' },
    { id: 'l', label: 'Länge l', unit: 'm', values: [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000], value: 5 },
    { id: 'd', label: 'Durchmesser d', unit: 'mm', min: 0.2, max: 4, step: 0.1, value: 1, format: v => dec(v, 1) + ' mm' },
    { id: 'I', label: 'Strom I', unit: 'A', values: [0.1, 0.2, 0.5, 1, 2, 5, 10, 16, 20, 30], value: 1 },
  ], run);
  const out = readout(root, [
    { id: 'A', label: 'Querschnitt A' }, { id: 'R', label: 'Widerstand R', hl: true },
    { id: 'U', label: 'Spannungsabfall U' }, { id: 'P', label: 'Verlustleistung P' }, { id: 'm', label: 'Masse' },
  ]);
  const g = goals(root, [{ id: 'g', label: `${fmt(L0, 'm')} bei ${fmt(I0, 'A')}: Abfall unter ${fmt(maxDrop, 'V')}` }], () => complete?.());
  const note = h('p', { class: 'vz-note' }); root.append(note);

  function run() {
    const v = ui.values, m = MAT[v.mat];
    const A = v.d * v.d * Math.PI / 4;              // mm²
    const R = m.rho * v.l / A, U = R * v.I, P = U * v.I;
    const mass = m.dens * A * v.l;                    // g (mm² · m = cm³)
    wire.setAttribute('height', Math.max(2, v.d * 18)); wire.setAttribute('y', 60 - Math.max(2, v.d * 18) / 2);
    wire.setAttribute('fill', m.color); cut.setAttribute('ry', Math.max(2, v.d * 18) / 2); cut.setAttribute('cy', 60);
    cap.textContent = `${m.name}, d = ${dec(v.d, 1)} mm, l = ${fmt(v.l, 'm')}`;
    p.line('u', ds, ds.map(d => m.rho * v.l / (d * d * Math.PI / 4) * v.I), { color: 'var(--accent)', label: 'U(d)' });
    p.marker('op', v.d, U, { label: fmt(U, 'V') });
    out.set({ A: dec(A, A < 1 ? 3 : 2) + ' mm²', R: fmt(R, 'Ω'), U: fmt(U, 'V'), P: fmt(P, 'W'), m: mass >= 1000 ? dec(mass / 1000, 2) + ' kg' : dec(mass, 1) + ' g' });
    note.innerHTML = md ? md(`$R = \\rho\\cdot\\dfrac{l}{A} = ${dec(m.rho, 3)}\\,\\Omega\\,\\mathrm{mm^2/m}\\cdot\\dfrac{${fmt(v.l, '').trim()}\\,\\mathrm{m}}{${dec(A, 3)}\\,\\mathrm{mm^2}} = ${dec(R, R < 1 ? 3 : 2)}\\,\\Omega$`) : '';
    if (Math.abs(v.l / L0 - 1) < 0.05 && Math.abs(v.I / I0 - 1) < 0.05 && U < maxDrop) g.reach('g');
  }
  run();
}
