// Greyline und Long-Path: Weltkarte mit Tag/Nacht-Grenze (Terminator) für Datum und UTC-Zeit, kurzer und langer Weg zu einer DX-Station.
// Sonnenstand aus Deklination (Jahreszeit) und Stundenwinkel: sin(el) = sinφ·sinδ + cosφ·cosδ·cos(H). Greyline = Dämmerungsband |el| < 6°.
// Geodaten: Natural Earth (gemeinfrei) aus dem Plattform-Geodatensatz; Großkreise per Kugelgeometrie.
import { h, s } from '../../../assets/js/vizkit/base.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';

const D2R = Math.PI / 180, RE = 6371;
const de = (x, d = 0) => (+x.toFixed(d)).toString().replace('.', ',');
const HOME = { n: 'Deutschland', lat: 51.0, lon: 10.0 };
const DX = {
  vk: { n: 'Australien (VK)', lat: -33.9, lon: 151.2 },
  zl: { n: 'Neuseeland (ZL)', lat: -41.3, lon: 174.8 },
  ja: { n: 'Japan (JA)', lat: 35.7, lon: 139.7 },
  w: { n: 'Ostküste USA (W)', lat: 40.7, lon: -74.0 },
  py: { n: 'Brasilien (PY)', lat: -23.5, lon: -46.6 },
};
const MONTHS = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
const decl = m => 23.44 * Math.sin(2 * Math.PI * (m - 2.8) / 12);    // m = 0…12, grob: Nulldurchgang um den 21. März (m ≈ 2,7)
const sunEl = (lat, lon, d, utc) => { const lonSub = -(utc - 12) * 15, H = (lon - lonSub) * D2R, p = lat * D2R, dl = d * D2R; return Math.asin(Math.sin(p) * Math.sin(dl) + Math.cos(p) * Math.cos(dl) * Math.cos(H)) / D2R; };
const vec = (lat, lon) => [Math.cos(lat * D2R) * Math.cos(lon * D2R), Math.cos(lat * D2R) * Math.sin(lon * D2R), Math.sin(lat * D2R)];
function greatCircle(a, b, long) {
  const A = vec(a.lat, a.lon), B = vec(b.lat, b.lon);
  const dot = Math.max(-1, Math.min(1, A[0] * B[0] + A[1] * B[1] + A[2] * B[2])), om = Math.acos(dot);
  // Senkrechter Einheitsvektor in der Großkreisebene
  let Pv = [B[0] - dot * A[0], B[1] - dot * A[1], B[2] - dot * A[2]]; const pl = Math.hypot(...Pv); Pv = Pv.map(x => x / pl);
  const tot = long ? om - 2 * Math.PI : om, pts = [];
  for (let i = 0; i <= 120; i++) { const t = tot * i / 120, v = [0, 1, 2].map(k => Math.cos(t) * A[k] + Math.sin(t) * Pv[k]); pts.push([Math.atan2(v[2], Math.hypot(v[0], v[1])) / D2R, Math.atan2(v[1], v[0]) / D2R]); }
  return { pts, km: Math.abs(tot) * RE };
}
const bearing = (a, b) => { const p1 = a.lat * D2R, p2 = b.lat * D2R, dl = (b.lon - a.lon) * D2R; return (Math.atan2(Math.sin(dl) * Math.cos(p2), Math.cos(p1) * Math.sin(p2) - Math.sin(p1) * Math.cos(p2) * Math.cos(dl)) / D2R + 360) % 360; };

export default function mount(stage, { params = {}, complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const W = 720, Hh = 360;
  const svg = s('svg', { class: 'vz-svg', viewBox: `0 0 ${W} ${Hh}`, role: 'img', 'aria-label': 'Weltkarte mit Tag-Nacht-Grenze und Funkwegen', style: 'max-width:760px;margin:0 auto;background:var(--surface);border:1px solid var(--line);border-radius:12px' });
  root.append(svg);
  const ui = controls(root, [
    { id: 'dx', type: 'seg', label: 'Gegenstation', options: Object.entries(DX).map(([k, v]) => [k, v.n]), value: params.dx || 'vk' },
    { id: 'path', type: 'seg', label: 'Weg', options: [['short', 'kurzer Weg'], ['long', 'langer Weg'], ['both', 'beide']], value: 'short' },
    { id: 'utc', label: 'Uhrzeit (UTC)', min: 0, max: 24, step: 0.25, value: params.utc ?? 6.5, format: v => `${String(Math.floor(v) % 24).padStart(2, '0')}:${String(Math.round((v % 1) * 60)).padStart(2, '0')} UTC` },
    { id: 'mon', label: 'Datum (Monat)', min: 0, max: 11.9, step: 0.1, value: params.mon ?? 2.7, format: v => `${MONTHS[Math.floor(v)]} (Sonnendeklination ${de(decl(v), 0)}°)`, wide: true },
  ], run);
  const out = readout(root, [
    { id: 'ds', label: 'kurzer Weg' }, { id: 'dl', label: 'langer Weg' }, { id: 'az', label: 'Antenne drehen auf' }, { id: 'home', label: 'bei dir (DE)', hl: true }, { id: 'far', label: 'bei der Gegenstation', hl: true },
  ]);
  const g = goals(root, [
    { id: 'grey', label: 'Deinen Standort in die Greyline (Dämmerung) bringen' },
    { id: 'dark', label: 'Beide Stationen im Dunkeln (untere Kurzwellenbänder)' },
    { id: 'long', label: 'Den langen Weg zur Gegenstation anzeigen' },
  ], () => complete?.());
  const note = h('div', { class: 'vz-note', text: 'Grau/orange Band = Greyline (Sonne bis 6° unter oder über dem Horizont), dunkel = Nacht. Entfernungen und Richtungen sind Großkreisrechnungen; welcher Weg wirklich trägt, hängt von Ionosphäre, Frequenz und Jahreszeit ab.' });
  root.append(note);

  // Länder als ein Pfad (Natural Earth), Karte equirektangular
  const X = lon => (lon + 180) / 360 * W, Y = lat => (90 - lat) / 180 * Hh;
  const land = s('path', { fill: 'color-mix(in oklab, var(--ink) 9%, var(--surface))', stroke: 'color-mix(in oklab, var(--ink) 25%, var(--surface))', 'stroke-width': .4 });
  const shade = s('g', { opacity: .36 }), lines = s('g'), marks = s('g');
  const grid = s('g'); for (let lo = -150; lo <= 150; lo += 30) grid.append(s('line', { x1: X(lo), y1: 0, x2: X(lo), y2: Hh, stroke: 'var(--line)', 'stroke-width': .5 })); for (let la = -60; la <= 60; la += 30) grid.append(s('line', { x1: 0, y1: Y(la), x2: W, y2: Y(la), stroke: 'var(--line)', 'stroke-width': .5 }));
  svg.append(grid, land, shade, lines, marks);
  import('../../../assets/data/geo/world.js').then(m => {
    let d = '';
    for (const c of m.default.countries) for (const poly of c.p) for (const ring of poly) { for (let i = 0; i < ring.length; i += 2) d += (i ? 'L' : 'M') + X(ring[i]).toFixed(1) + ' ' + Y(ring[i + 1]).toFixed(1); d += 'Z'; }
    land.setAttribute('d', d);
  }).catch(() => {});

  let live = false;
  function run() {
    const v = ui.values, dcl = decl(v.mon), dx = DX[v.dx];
    // Tag/Nacht-Schattierung als Zeilen mit zusammengefassten Spannen
    const kids = [], cell = 3;
    for (let la = 90 - cell / 2; la > -90; la -= cell) {
      let run0 = null, cls0 = null;
      const flush = (x1) => { if (cls0 && cls0 !== 'day') kids.push(s('rect', { x: X(run0), y: Y(la + cell / 2), width: X(x1) - X(run0) + 0.3, height: Hh * cell / 180 + 1.0, fill: cls0 === 'night' ? '#191e46' : '#e0821e' })); };
      for (let lo = -180; lo < 180; lo += cell) {
        const el = sunEl(la, lo + cell / 2, dcl, v.utc), cls = el < -6 ? 'night' : el < 6 ? 'grey' : 'day';
        if (cls !== cls0) { if (run0 !== null) flush(lo); run0 = lo; cls0 = cls; }
      }
      flush(180);
    }
    shade.replaceChildren(...kids);
    // Wege
    const gl = [];
    const draw = (long, col, dash) => {
      const gc = greatCircle(HOME, dx, long);
      let d = '', prev = null;
      for (const [la, lo] of gc.pts) { const x = X(lo), y = Y(la); d += (prev === null || Math.abs(lo - prev) > 180 ? 'M' : 'L') + x.toFixed(1) + ' ' + y.toFixed(1); prev = lo; }
      gl.push(s('path', { d, fill: 'none', stroke: col, 'stroke-width': 2.6, 'stroke-dasharray': dash, 'stroke-linecap': 'round' }));
      return gc.km;
    };
    const ds = greatCircle(HOME, dx, false).km, dl = 2 * Math.PI * RE - ds;
    if (v.path !== 'long') draw(false, 'var(--accent)', '');
    if (v.path !== 'short') draw(true, 'var(--bad)', '7 5');
    lines.replaceChildren(...gl);
    const mk = (st, c) => [s('circle', { cx: X(st.lon), cy: Y(st.lat), r: 6, fill: c, stroke: 'var(--surface)', 'stroke-width': 1.5 }), s('text', { x: X(st.lon) + (st.lon > 100 ? -9 : 9), 'text-anchor': st.lon > 100 ? 'end' : 'start', y: Y(st.lat) - 8, 'font-size': 17, fill: 'var(--ink)', 'font-weight': 700, style: 'paint-order:stroke;stroke:var(--surface);stroke-width:3px' }, st.n)];
    marks.replaceChildren(...mk(HOME, 'var(--accent)'), ...mk(dx, 'var(--accent-2)'));
    // Sonne
    const sunLon = -(v.utc - 12) * 15;
    marks.append(s('circle', { cx: X(((sunLon + 540) % 360) - 180), cy: Y(dcl), r: 9, fill: 'var(--warn)', stroke: 'var(--surface)', 'stroke-width': 1.5 }), s('text', { x: X(((sunLon + 540) % 360) - 180) + 10, y: Y(dcl) + 4, 'font-size': 15, fill: 'var(--warn)', 'font-weight': 800 }, 'Sonne'));
    const elH = sunEl(HOME.lat, HOME.lon, dcl, v.utc), elD = sunEl(dx.lat, dx.lon, dcl, v.utc);
    const cl = el => el < -6 ? 'Nacht' : el < 0 ? 'Greyline (Dämmerung, Sonne unter dem Horizont)' : el < 6 ? 'Greyline (Dämmerung, Sonne gerade über dem Horizont)' : 'Tag';
    const az = bearing(HOME, dx);
    out.set({ ds: `${de(ds)} km`, dl: `${de(dl)} km`, az: `kurz ${de(az)}° / lang ${de((az + 180) % 360)}°`, home: cl(elH), far: cl(elD) });
    if (!live) return;
    if (Math.abs(elH) < 6) g.reach('grey');
    if (elH < -6 && elD < -6) g.reach('dark');
    if (v.path !== 'short') g.reach('long');
  }
  run();
  live = true;
}
