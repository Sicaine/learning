// Strahlungsdiagramm-Explorer: Kugelstrahler, Halbwellendipol (waagerecht/senkrecht), Groundplane, Yagi-Uda.
// Rechnung: Feld eines Halbwellendipols cos(π/2·cosψ)/sinψ, Spiegelung am ideal leitenden Boden (Faktor 2·sin bzw. 2·cos),
// Yagi als Modell aus N Halbwellenstrahlern (Abstand 0,25 λ, Hansen-Woodyard-Phasen). Gewinn = numerische Richtwirkung D = 4π·Pmax/∮P dΩ.
import { h, s } from '../../../assets/js/vizkit/base.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';

const R2D = 180 / Math.PI, D2R = Math.PI / 180;
const dipoleE = psi => { const sn = Math.sin(psi); return Math.abs(sn) < 1e-4 ? 0 : Math.cos(Math.PI / 2 * Math.cos(psi)) / sn; };
const dbf = x => 10 * Math.log10(x);
const de = (x, d = 1) => x.toFixed(d).replace('.', ',');

// Leistungsdiagramm (unnormiert) in Richtung (az: von Nord, im Uhrzeigersinn; el: Elevation)
function power(c, az, el) {
  const ux = Math.cos(el) * Math.sin(az), uy = Math.cos(el) * Math.cos(az), uz = Math.sin(el);
  const kh = 2 * Math.PI * c.h;
  let E;
  switch (c.ant) {
    case 'iso': return 1;
    case 'dipH': E = dipoleE(Math.acos(Math.max(-1, Math.min(1, ux)))); if (c.gnd) E *= uz > 0 ? 2 * Math.sin(kh * uz) : 0; break;
    case 'dipV': E = dipoleE(Math.acos(Math.max(-1, Math.min(1, uz)))); if (c.gnd) E *= uz > 0 ? 2 * Math.cos(kh * uz) : 0; break;
    case 'gp': E = uz >= 0 ? dipoleE(Math.acos(Math.max(-1, Math.min(1, uz)))) : 0; break;
    case 'yagi': {
      const d = 0.25, k = 2 * Math.PI, ph = -(k * d + Math.PI / c.n);
      let re = 0, im = 0;
      for (let n = 0; n < c.n; n++) { const a = n * (k * d * uy + ph); re += Math.cos(a); im += Math.sin(a); }
      E = dipoleE(Math.acos(Math.max(-1, Math.min(1, ux)))) * Math.hypot(re, im) / c.n;
      if (c.gnd) E *= uz > 0 ? 2 * Math.sin(kh * uz) : 0;
      break;
    }
  }
  return E * E;
}
const cache = new Map();
function stats(c) {
  const key = [c.ant, c.n, c.gnd, c.h].join('|');
  if (cache.has(key)) return cache.get(key);
  let sum = 0, mx = 0;
  const st = 3 * D2R;
  for (let el = -90 + 1.5; el < 90; el += 3) for (let az = 0; az < 360; az += 3) {
    const p = power(c, az * D2R, el * D2R); sum += p * Math.cos(el * D2R); if (p > mx) mx = p;
  }
  const integral = sum * st * st;   // ∮ P dΩ
  const out = { D: 4 * Math.PI * mx / integral, mx };
  cache.set(key, out); return out;
}

const NAMES = { iso: 'Kugelstrahler', dipH: 'Halbwellendipol, waagerecht', dipV: 'Halbwellendipol, senkrecht', gp: 'Groundplane (λ/4)', yagi: 'Yagi-Uda' };

export default function mount(stage, { params = {}, complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const W = 360, C = 180, R = 150;
  const svg = s('svg', { class: 'vz-svg', viewBox: `0 0 ${W} ${W}`, role: 'img', 'aria-label': 'Strahlungsdiagramm in Polardarstellung', style: 'max-width:440px;margin:0 auto;background:var(--surface-2);border:1px solid var(--line);border-radius:12px' });
  root.append(svg);
  const ui = controls(root, [
    { id: 'ant', type: 'seg', label: 'Antenne', options: [['iso', 'Kugelstrahler'], ['dipH', 'Dipol waagerecht'], ['dipV', 'Dipol senkrecht'], ['gp', 'Groundplane'], ['yagi', 'Yagi-Uda']].filter(o => !params.ants || params.ants.includes(o[0])), value: params.ant || (params.ants ? params.ants[0] : 'iso') },
    { id: 'view', type: 'seg', label: 'Schnitt', options: [['top', 'Draufsicht'], ['side', 'Seitenansicht']], value: params.view || 'top' },
    { id: 'n', label: 'Yagi: Elemente', min: 2, max: 9, step: 1, value: 3, format: v => String(v) },
    { id: 'gnd', type: 'toggle', label: 'Idealer Boden unter der Antenne', value: false },
    { id: 'h', label: 'Höhe über Boden', min: 0.25, max: 2, step: 0.05, value: 0.5, format: v => de(v, 2) + ' λ' },
  ], run);
  const out = readout(root, [
    { id: 'g', label: 'Gewinn', hl: true }, { id: 'gd', label: 'bezogen auf Dipol' }, { id: 'hp', label: 'Öffnungswinkel (−3 dB)' }, { id: 'fb', label: 'Vor-Rück' },
  ]);
  const g = goals(root, [
    { id: 'dip', label: 'Dipol in der Draufsicht: Acht mit Nullstellen in Drahtrichtung' },
    { id: 'gp', label: 'Groundplane in der Seitenansicht: flach abgestrahlt' },
    { id: 'dipV', label: 'Senkrechter Dipol: in der Seitenansicht flach, kein Strahl nach oben' },
    { id: 'yagi', label: 'Yagi mit 5 oder mehr Elementen: Gewinn über 9 dBi' },
  ].filter(d => !params.goals || params.goals.includes(d.id)), () => complete?.());
  root.append(h('div', { class: 'vz-note', text: 'Diagramme und Gewinn sind Modellrechnungen für den Freiraum bzw. einen ideal leitenden Boden (Messwerte echter Antennen liegen meist etwas darunter). Der gestrichelte Kreis ist der Kugelstrahler (0 dBi); der Radius zeigt die Feldstärke.' }));

  let live = false;
  function run() {
    const v = ui.values;
    const c = { ant: v.ant, n: v.n, gnd: v.ant === 'gp' ? true : v.gnd, h: v.h };
    const showN = v.ant === 'yagi', showG = v.ant === 'dipH' || v.ant === 'dipV' || v.ant === 'yagi';
    ui.el.querySelector('[data-id=n]').style.display = showN ? '' : 'none';
    ui.el.querySelector('[data-id=gnd]').style.display = showG ? '' : 'none';
    ui.el.querySelector('[data-id=h]').style.display = showG && v.gnd ? '' : 'none';
    if (c.ant === 'dipV' && c.gnd && c.h < 0.25) c.h = 0.25;
    const { D } = stats(c);
    const gain = c.ant === 'iso' ? 1 : D;
    // Schnitt als Folge von Richtungen: top = el 0, az 0..360 | side = Nord-Süd-Ebene (φ: 0 = Nord/Horizont, 90 = oben, 180 = Süd)
    const N = 360, pts = [];
    for (let i = 0; i <= N; i++) {
      const phi = i * Math.PI * 2 / N;
      let p;
      if (v.view === 'top') p = power(c, phi, 0);
      else { const el = Math.cos(phi) >= 0 ? Math.asin(Math.sin(phi)) : Math.asin(Math.sin(phi)); p = power(c, Math.cos(phi) >= 0 ? 0 : Math.PI, el); }
      pts.push(p);
    }
    const Gs = pts.map(p => c.ant === 'iso' ? 1 : p / stats(c).mx * D);
    const gmaxPlane = Math.max(...Gs);
    const scale = R / Math.sqrt(Math.max(gain, 1.2));
    // Koordinaten: top → Nord oben, Ost rechts; side → Nord rechts, oben oben
    const xy = (phi, r) => v.view === 'top' ? [C + r * Math.sin(phi), C - r * Math.cos(phi)] : [C + r * Math.cos(phi), C - r * Math.sin(phi)];
    const d = Gs.map((G, i) => { const [x, y] = xy(i * Math.PI * 2 / N, Math.sqrt(G) * scale); return (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1); }).join('') + 'Z';
    const kids = [];
    // Raster
    for (const f of [0.25, 0.5, 0.75, 1]) kids.push(s('circle', { cx: C, cy: C, r: R * f, fill: 'none', stroke: 'var(--line-2)', 'stroke-width': 1 }));
    kids.push(s('line', { x1: C - R - 6, y1: C, x2: C + R + 6, y2: C, stroke: 'var(--line-2)' }), s('line', { x1: C, y1: C - R - 6, x2: C, y2: C + R + 6, stroke: 'var(--line-2)' }));
    if (v.view === 'side' && c.gnd) kids.push(s('rect', { x: C - R - 10, y: C, width: 2 * R + 20, height: R + 10, fill: 'color-mix(in oklab, var(--warn) 14%, transparent)' }), s('line', { x1: C - R - 10, y1: C, x2: C + R + 10, y2: C, stroke: 'var(--warn)', 'stroke-width': 2 }));
    const lab = (x, y, t, anchor = 'middle') => s('text', { x, y, 'text-anchor': anchor, 'font-size': 11, fill: 'var(--muted)', 'font-weight': 600 }, t);
    if (v.view === 'top') kids.push(lab(C, 12, 'Nord ↑'), lab(C + R + 8, C - 4, 'Ost', 'end'), lab(C, W - 6, 'Süd'), lab(C - R - 8, C - 4, 'West', 'start'));
    else kids.push(lab(C + R + 4, C - 5, 'Nord →', 'end'), lab(C - R - 4, C - 5, '← Süd', 'start'), lab(C, 12, 'oben'), lab(C, C + 14, c.gnd ? 'Boden' : 'Horizont'));
    // Kugelstrahler-Kreis (0 dBi)
    kids.push(s('circle', { cx: C, cy: C, r: scale, fill: 'none', stroke: 'var(--ink-2)', 'stroke-width': 1.2, 'stroke-dasharray': '4 4' }));
    kids.push(s('text', { x: C + scale * 0.71 + 3, y: C - scale * 0.71 - 3, 'font-size': 10, fill: 'var(--ink-2)' }, '0 dBi'));
    // −3-dB-Kreis der Ebene
    const r3 = Math.sqrt(gmaxPlane / 2) * scale;
    kids.push(s('circle', { cx: C, cy: C, r: r3, fill: 'none', stroke: 'var(--accent-2)', 'stroke-width': 1, 'stroke-dasharray': '2 3', opacity: .8 }));
    kids.push(s('path', { d, fill: 'color-mix(in oklab, var(--accent) 16%, transparent)', stroke: 'var(--accent)', 'stroke-width': 2.4, 'stroke-linejoin': 'round' }));
    // Antennensymbol in der Mitte
    const sym = [];
    const A = { stroke: 'var(--ink)', 'stroke-width': 3, 'stroke-linecap': 'round' };
    if (v.view === 'top') {
      if (c.ant === 'dipH') sym.push(s('line', { x1: C - 20, y1: C, x2: C + 20, y2: C, ...A }));
      else if (c.ant === 'yagi') for (let i = 0; i < c.n; i++) { const y = C - ((c.n - 1) / 2 - i) * Math.min(8, 40 / c.n); sym.push(s('line', { x1: C - 12, y1: y, x2: C + 12, y2: y, ...A, 'stroke-width': 2 })); }
      else sym.push(s('circle', { cx: C, cy: C, r: 4, fill: 'var(--ink)' }));
    } else {
      if (c.ant === 'dipV') sym.push(s('line', { x1: C, y1: C - 20, x2: C, y2: C + 20, ...A }));
      else if (c.ant === 'gp') sym.push(s('line', { x1: C, y1: C, x2: C, y2: C - 24, ...A }), s('line', { x1: C - 12, y1: C, x2: C + 12, y2: C, ...A, 'stroke-width': 2 }));
      else if (c.ant === 'dipH' || c.ant === 'yagi') sym.push(s('circle', { cx: C, cy: C, r: 4, fill: 'var(--ink)' }));
      else sym.push(s('circle', { cx: C, cy: C, r: 4, fill: 'var(--ink)' }));
    }
    kids.push(...sym);
    svg.replaceChildren(...kids);

    // Kennwerte
    // Öffnungswinkel um das Maximum der Ebene
    const imax = Gs.indexOf(gmaxPlane);
    let a = 0, b = 0;
    while (a < N && Gs[(imax - a - 1 + N) % N] >= gmaxPlane / 2) a++;
    while (b < N && Gs[(imax + b + 1) % N] >= gmaxPlane / 2) b++;
    const hp = a + b + 1 >= N ? null : a + b + 1;
    const iback = (imax + N / 2) % N;
    const fb = c.ant === 'yagi' && v.view === 'top' ? dbf(gmaxPlane / Math.max(Gs[iback], 1e-6)) : null;
    out.set({
      g: `${de(dbf(gain), 2)} dBi`, gd: `${de(dbf(gain) - 2.15, 2)} dBd`,
      hp: hp ? `${hp}°` : 'rundum (360°)', fb: fb != null ? `${de(fb, 0)} dB` : '–',
    });
    if (!live) return;
    if (v.ant === 'dipH' && v.view === 'top') g.reach('dip');
    if (v.ant === 'gp' && v.view === 'side') g.reach('gp');
    if (v.ant === 'dipV' && v.view === 'side') g.reach('dipV');
    if (v.ant === 'yagi' && v.n >= 5 && dbf(gain) > 9) g.reach('yagi');
  }
  run();
  live = true;
}
export const _test = { power, stats };
