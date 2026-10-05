// Maidenhead-Locator (QTH-Locator) auf der Weltkarte: Karte antippen → Locator; Locator eintippen → Karte; Felder (20°×10°), Quadrate (2°×1°), Unterquadrate (5′×2,5′).
// Kartendaten: Natural Earth (gemeinfrei), assets/data/geo. params: { goals?: ['jo','sq','typed'] }
import { h, s } from '../../../assets/js/vizkit/base.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import world from '../../../assets/data/geo/world.js';

const REF = { name: 'DARC-Geschäftsstelle Baunatal (JO41RG)', lon: 9.4583, lat: 51.2708 };
const A = 'ABCDEFGHIJKLMNOPQRSTUVWX';
export function toLocator(lon, lat) {
  const x = Math.min(359.9999, Math.max(0, lon + 180)), y = Math.min(179.9999, Math.max(0, lat + 90));
  const f = [Math.floor(x / 20), Math.floor(y / 10)], q = [Math.floor((x % 20) / 2), Math.floor(y % 10)];
  const u = [Math.floor((x % 2) * 12), Math.floor((y % 1) * 24)];
  return { field: A[f[0]] + A[f[1]], square: `${q[0]}${q[1]}`, sub: (A[u[0]] + A[u[1]]).toLowerCase(), f, q, u };
}
export function fromLocator(str) {
  const m = /^([A-R]{2})(\d\d)?([A-X]{2})?$/i.exec(str.trim());
  if (!m) return null;
  const F = m[1].toUpperCase(); let lon = -180 + A.indexOf(F[0]) * 20, lat = -90 + A.indexOf(F[1]) * 10, w = 20, hh = 10;
  if (m[2]) { lon += +m[2][0] * 2; lat += +m[2][1]; w = 2; hh = 1; }
  if (m[3]) { const S = m[3].toUpperCase(); lon += A.indexOf(S[0]) * (2 / 24); lat += A.indexOf(S[1]) * (1 / 24); w = 2 / 24; hh = 1 / 24; }
  if (m[3] && !m[2]) return null;
  return { lon: lon + w / 2, lat: lat + hh / 2, level: m[3] ? 2 : m[2] ? 1 : 0, w, hh, lon0: lon, lat0: lat };
}
const km = (a, b) => { const r = Math.PI / 180, d = Math.acos(Math.min(1, Math.sin(a.lat * r) * Math.sin(b.lat * r) + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.cos((a.lon - b.lon) * r))); return 6371 * d; };

export default function mount(stage, { params = {}, complete }) {
  const need = params.goals ?? ['jo', 'sq', 'typed'];
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  let sel = { lon: -42, lat: 28 }, level = 0, typed = false, touched = false;
  const ui = controls(root, [{ id: 'lv', type: 'seg', label: 'Ansicht', options: [['0', 'Welt'], ['1', 'Region · Felder'], ['2', 'Feld · Quadrate'], ['3', 'Quadrat · Unterquadr.']], value: '0' }], v => { level = +v.lv; draw(); });
  const svg = s('svg', { class: 'vz-svg', role: 'img', 'aria-label': 'Weltkarte mit Locator-Raster', style: 'width:100%;height:auto;display:block;background:#f4f8fb;border:1px solid var(--line);border-radius:10px;touch-action:manipulation;cursor:crosshair' });
  root.append(svg);
  const inp = h('input', { type: 'text', placeholder: 'Locator, z. B. JO41 oder JO41RG', 'aria-label': 'Locator eingeben', autocapitalize: 'characters', spellcheck: 'false', style: 'font:600 1rem var(--mono);padding:7px 11px;border:1px solid var(--line-2);border-radius:10px;width:15em;max-width:100%' });
  const btn = h('button', { type: 'button', class: 'btn small', text: 'Auf Karte zeigen' });
  const msg = h('span', { class: 'vz-note', style: 'margin-left:8px' });
  root.append(h('div', { style: 'margin:10px 0' }, inp, ' ', btn, msg));
  const out = readout(root, [{ id: 'loc', label: 'Locator', hl: true }, { id: 'pos', label: 'Koordinaten' }, { id: 'parts', label: 'Feld · Quadrat · Unterquadrat' }, { id: 'dist', label: 'Entfernung zu Baunatal' }]);
  const g = goals(root, [
    { id: 'jo', label: 'Feld JO antippen (Mitteleuropa)' }, { id: 'sq', label: 'Quadrat JO41 antippen (Kassel/Baunatal)' }, { id: 'typed', label: 'einen Locator eintippen' },
  ].filter(x => need.includes(x.id)), () => complete?.());

  const box = () => {
    const L = toLocator(sel.lon, sel.lat);
    if (level === 0) return [-180, -90, 360, 180];
    if (level === 1) { const x = Math.max(-180, Math.min(60, -180 + (L.f[0] - 2) * 20)), y = Math.max(-90, Math.min(30, -90 + (L.f[1] - 2) * 10)); return [x, -(y + 60), 120, 60]; }
    if (level === 2) return [-180 + L.f[0] * 20, -(-90 + L.f[1] * 10 + 10), 20, 10];
    const lon0 = -180 + L.f[0] * 20 + L.q[0] * 2, lat0 = -90 + L.f[1] * 10 + L.q[1];
    return [lon0, -(lat0 + 1), 2, 1];
  };
  function ring(flat) { let d = '', px = null; for (let i = 0; i < flat.length; i += 2) { const x = flat[i], y = -flat[i + 1]; d += (px === null || Math.abs(x - px) > 180 ? 'M' : 'L') + x + ' ' + y; px = x; } return d; }
  let landPath = null;
  function land() {
    if (landPath) return landPath;
    let d = ''; for (const c of world.countries) for (const poly of c.p) for (const r of poly) d += ring(r) + 'Z';
    return (landPath = d);
  }
  function draw() {
    const [x0, y0, w, hh] = box();
    svg.setAttribute('viewBox', `${x0} ${y0} ${w} ${hh}`);
    svg.replaceChildren();
    const fs = w / 38;                                   // Schriftgröße relativ zur Ansicht
    const sw = (px) => ({ 'vector-effect': 'non-scaling-stroke', 'stroke-width': px });
    svg.append(s('path', { d: land(), fill: '#e5e9dc', stroke: '#9aa38f', ...sw(0.6) }));
    const step = level <= 1 ? [20, 10] : level === 2 ? [2, 1] : [2 / 24, 1 / 24];
    const gx0 = Math.floor((x0 + 180) / step[0]) * step[0] - 180, gy0 = Math.floor((-(y0 + hh) + 90) / step[1]) * step[1] - 90;
    for (let x = gx0; x <= x0 + w + 1e-9; x += step[0]) svg.append(s('line', { x1: x, x2: x, y1: y0, y2: y0 + hh, stroke: 'var(--accent)', 'stroke-opacity': .55, ...sw(0.8) }));
    for (let y = gy0; y <= -y0 + 1e-9 && y < 90 + 1e-9; y += step[1]) svg.append(s('line', { x1: x0, x2: x0 + w, y1: -y, y2: -y, stroke: 'var(--accent)', 'stroke-opacity': .55, ...sw(0.8) }));
    // Zellbeschriftung
    for (let x = gx0; x < x0 + w; x += step[0]) for (let y = gy0; y < -y0 && y < 90; y += step[1]) {
      const i = Math.round((x + 180) / step[0]), j = Math.round((y + 90) / step[1]);
      let lab = '';
      if (level <= 1) lab = A[i] + A[j];
      else if (level === 2) lab = `${i % 10}${j % 10}`;
      else lab = (A[i % 24] + A[j % 24]).toLowerCase();
      if (i < 0 || j < 0) continue;
      svg.append(s('text', { x: x + step[0] / 2, y: -(y + step[1] / 2) + fs * 0.35, 'text-anchor': 'middle', 'font-size': level === 0 ? fs * 0.9 : level === 1 ? fs * 2.6 : level === 2 ? fs * 2.2 : fs * 0.55, fill: 'var(--ink-2)', 'fill-opacity': .75, style: 'pointer-events:none;font-family:var(--mono)' }, lab));
    }
    // Referenz & Auswahl
    const mark = (p, col, r) => svg.append(s('circle', { cx: p.lon, cy: -p.lat, r: w * r, fill: col, stroke: '#fff', ...sw(1.5), style: 'pointer-events:none' }));
    mark(REF, 'var(--accent-2)', 0.006); mark(sel, 'var(--bad)', 0.008);
    const L = toLocator(sel.lon, sel.lat);
    svg.append(s('rect', { x: sel.lon > x0 + w / 2 ? x0 + w * 0.02 : x0 + w * 0.7, y: y0 + hh * 0.03, width: w * 0.28, height: hh * 0.1, rx: w * 0.006, fill: '#fff', 'fill-opacity': .9, stroke: 'var(--line)', ...sw(1), style: 'pointer-events:none' }),
      s('text', { x: (sel.lon > x0 + w / 2 ? x0 + w * 0.02 : x0 + w * 0.7) + w * 0.14, y: y0 + hh * 0.03 + hh * 0.075, 'text-anchor': 'middle', 'font-size': fs * 1.6, 'font-weight': 700, fill: 'var(--ink)', style: 'font-family:var(--mono);pointer-events:none' }, L.field + L.square + L.sub));
    report();
  }
  function report() {
    const L = toLocator(sel.lon, sel.lat);
    out.set({ loc: `${L.field}${L.square}${L.sub}`, pos: `${Math.abs(sel.lat).toFixed(2).replace('.', ',')}° ${sel.lat >= 0 ? 'N' : 'S'}, ${Math.abs(sel.lon).toFixed(2).replace('.', ',')}° ${sel.lon >= 0 ? 'O' : 'W'}`, parts: `${L.field} · ${L.square} · ${L.sub}`, dist: `${Math.round(km(sel, REF)).toLocaleString('de-DE')} km` });
    if (touched && !typed) { if (L.field === 'JO') g.reach('jo'); if (L.field + L.square === 'JO41') g.reach('sq'); }
  }
  svg.addEventListener('pointerdown', e => {
    const pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
    const p = pt.matrixTransform(svg.getScreenCTM().inverse());
    sel = { lon: Math.max(-179.99, Math.min(179.99, p.x)), lat: Math.max(-89.99, Math.min(89.99, -p.y)) };
    typed = false; touched = true; draw();
  });
  function go() {
    const r = fromLocator(inp.value);
    if (!r) { msg.textContent = 'Kein gültiger Locator (Format: 2 Buchstaben A–R, 2 Ziffern, 2 Buchstaben A–X).'; msg.style.color = 'var(--bad)'; return; }
    msg.textContent = ''; sel = { lon: r.lon, lat: r.lat }; level = r.level + 1; typed = true; ui.set({ lv: String(level) }, { silent: true }); draw(); g.reach('typed');
  }
  btn.onclick = go; inp.onkeydown = e => { if (e.key === 'Enter') go(); };
  draw();
  root._test = { get sel() { return sel; }, go, inp, setSel: (lon, lat) => { sel = { lon, lat }; typed = false; touched = true; draw(); } };
}
