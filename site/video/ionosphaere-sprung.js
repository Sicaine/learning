// Explainer video: "Ionosphäre, Sprungdistanz und MUF" (Amateurfunk Klasse E, Wellenausbreitung).
// Geometry is computed: reflection at height h, landing distance = 2h / tan(elevation), critical angle sin(a) = foF2 / f.
import { defineVideo, E, seg, clamp, lerp, COLORS as C, pathFn, setA, text } from './engine.js';

const NS = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const n = document.createElementNS(NS, tag); setA(n, a); p.append(n); return n; };
const opacity = (n, v) => { n.style.opacity = v; };
const eqBox = (ctx, tex, style, disp = true) => ctx.h(`<div class="eq">${ctx.tex(tex, disp)}</div>`, style);
const chipBox = (ctx, html, style) => ctx.h(`<span class="chip">${html}</span>`, style);

const GY = 510, X0 = 90, K = 0.38, H = 300;           // ground line, transmitter x, px per km (both axes), F2 height in km
const FOF2 = 6;                                        // example critical frequency, MHz
const rad = d => d * Math.PI / 180;
const critDeg = f => f <= FOF2 ? 90 : Math.asin(FOF2 / f) * 180 / Math.PI;
const skipKm = f => f <= FOF2 ? 0 : 2 * H / Math.tan(rad(critDeg(f)));
const hpx = H * K;

function tx(svg, x = X0) {
  const g = mk(svg, 'g', {});
  mk(g, 'rect', { x: x - 26, y: GY - 34, width: 52, height: 34, rx: 6, fill: '#fff', stroke: C.ink, 'stroke-width': 2.5 });
  mk(g, 'line', { x1: x, y1: GY - 34, x2: x, y2: GY - 74, stroke: C.ink, 'stroke-width': 3 });
  mk(g, 'path', { d: `M${x - 16} ${GY - 74} L${x} ${GY - 52} L${x + 16} ${GY - 74}`, fill: 'none', stroke: C.ink, 'stroke-width': 3 });
  return g;
}
function ground(svg) { mk(svg, 'line', { x1: 40, y1: GY, x2: 1240, y2: GY, stroke: C.ink2, 'stroke-width': 3 }); }
function layerBand(svg, hKm = H, thick = 34, label = 'F2-Schicht') {
  const y = GY - hKm * K;
  mk(svg, 'rect', { x: 40, y: y - thick / 2, width: 1200, height: thick, fill: 'rgba(14,165,233,0.16)', stroke: 'none' });
  mk(svg, 'line', { x1: 40, y1: y, x2: 1240, y2: y, stroke: C.accent2, 'stroke-width': 2, 'stroke-dasharray': '3 9' });
  text(svg, 1236, y - thick / 2 - 8, label, { 'text-anchor': 'end', 'font-weight': 700, 'font-size': 20, fill: C.accent2 });
}
// ray path points for elevation a (deg), frequency f; returns {pts, lands, total}
function rayPath(a, f, x0 = X0) {
  const t = Math.tan(rad(a)), xm = x0 + hpx / t;
  const reflects = f <= FOF2 / Math.sin(rad(a)) + 1e-9;
  const pts = reflects ? [[x0, GY], [xm, GY - hpx], [x0 + 2 * hpx / t, GY]] : [[x0, GY], [xm, GY - hpx], [xm + (xm - x0) * 0.9, GY - hpx - hpx * 0.9]];
  return { pts, reflects, land: x0 + 2 * hpx / t };
}
const dist = pts => pts.slice(1).reduce((s, p, i) => s + Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]), 0);
function pointAt(pts, u) {            // u in 0..1 along polyline
  const L = dist(pts); let d = u * L;
  for (let i = 1; i < pts.length; i++) { const s = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); if (d <= s || i === pts.length - 1) { const k = clamp(d / s); return [lerp(pts[i - 1][0], pts[i][0], k), lerp(pts[i - 1][1], pts[i][1], k)]; } d -= s; }
}
function partial(pts, u) {            // polyline d-string up to fraction u
  const L = dist(pts); let d = u * L, out = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) { const s = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); if (d >= s) { out += ` L${pts[i][0]} ${pts[i][1]}`; d -= s; } else { const k = d / s; out += ` L${lerp(pts[i - 1][0], pts[i][0], k)} ${lerp(pts[i - 1][1], pts[i][1], k)}`; break; } }
  return out;
}
function rayObj(svg, color, w = 3.5) { return { path: mk(svg, 'path', { fill: 'none', stroke: color, 'stroke-width': w, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }), dot: mk(svg, 'circle', { r: 7, fill: color }) }; }
const kmAxis = (svg, y = GY + 28) => { for (let km = 0; km <= 3000; km += 500) { const x = X0 + km * K; mk(svg, 'line', { x1: x, y1: GY, x2: x, y2: GY + 9, stroke: C.ink2, 'stroke-width': 2 }); text(svg, x, y + 6, km === 0 ? '0' : `${km}`, { 'text-anchor': 'middle', 'font-size': 18, fill: C.muted, 'font-weight': 600 }); } text(svg, 1240, y + 34, 'Entfernung in km (vereinfacht, ohne Erdkrümmung)', { 'text-anchor': 'end', 'font-size': 17, fill: C.muted, 'font-weight': 600 }); };

export default defineVideo({
  id: 'ionosphaere-sprung',
  out: 'ionosphaere-sprung',
  brand: 'Learning · Amateurfunk',
  poster: 3.2,
  scenes: [
    // ======================================================= 1 intro
    {
      id: 'intro', kicker: 'Wellenausbreitung', title: 'Der Spiegel am Himmel',
      lines: [
        { say: 'Mit Kurzwelle erreichst du andere Kontinente, obwohl dazwischen der Horizont liegt.', cap: 'Mit Kurzwelle erreichst du andere Kontinente, obwohl dazwischen der Horizont liegt.' },
        { say: 'Der Grund: Die Ionosphäre wirkt wie ein Spiegel für Funkwellen.', cap: 'Die Ionosphäre wirkt wie ein Spiegel für Funkwellen.' },
        { say: 'In hundert bis vierhundert Kilometern Höhe ist die Luft durch Sonnenlicht ionisiert.', cap: 'In 100 bis 400 km Höhe ist die Luft durch Sonnenlicht ionisiert.' },
        { say: 'Wie weit das Signal kommt, hängt von Winkel, Frequenz und Tageszeit ab.', cap: 'Wie weit das Signal kommt, hängt von Winkel, Frequenz und Tageszeit ab.' },
      ],
      init(ctx) {
        ground(ctx.svg); layerBand(ctx.svg, 300, 40, 'Ionosphäre'); tx(ctx.svg);
        const r = rayPath(17, 14), ray = rayObj(ctx.svg, C.forward, 4);
        const rx = mk(ctx.svg, 'g', {}); mk(rx, 'rect', { x: r.land - 22, y: GY - 30, width: 44, height: 30, rx: 6, fill: '#fff', stroke: C.ink, 'stroke-width': 2.5 }); mk(rx, 'line', { x1: r.land, y1: GY - 30, x2: r.land, y2: GY - 66, stroke: C.ink, 'stroke-width': 3 });
        text(ctx.svg, r.land, GY + 30, 'Gegenstelle', { 'text-anchor': 'middle', 'font-weight': 700, 'font-size': 20, fill: C.ink2 });
        const sun = mk(ctx.svg, 'g', {}); mk(sun, 'circle', { cx: 1130, cy: 210, r: 34, fill: '#f6c445' });
        for (let i = 0; i < 10; i++) { const a = i * Math.PI / 5; mk(sun, 'line', { x1: 1130 + 46 * Math.cos(a), y1: 210 + 46 * Math.sin(a), x2: 1130 + 62 * Math.cos(a), y2: 210 + 62 * Math.sin(a), stroke: '#f6c445', 'stroke-width': 5, 'stroke-linecap': 'round' }); }
        const sl = [0, 1, 2].map(i => mk(ctx.svg, 'line', { stroke: '#f6c445', 'stroke-width': 3, 'stroke-dasharray': '6 8', x1: 1090 - i * 40, y1: 250 + i * 10, x2: 1060 - i * 90, y2: 392 }));
        return { r, ray, rx, sun, sl };
      },
      update(ctx, { t, at, end, state: s }) {
        const u = seg(t, at(0) + 0.6, end(1) - 0.2);
        const loop = ((t - at(0)) * 0.22) % 1.6;
        s.ray.path.setAttribute('d', partial(s.r.pts, clamp(u))); const p = pointAt(s.r.pts, clamp(loop > 1 ? 1 : loop)); setA(s.ray.dot, { cx: p[0], cy: p[1] }); opacity(s.ray.dot, u > 0.99 && loop <= 1 ? 1 : (u > 0.99 ? 0 : 0));
        opacity(s.rx, seg(t, at(0) + 0.3, at(0) + 1)); opacity(s.sun, seg(t, at(2) - 0.2, at(2) + 0.8)); s.sl.forEach(l => opacity(l, seg(t, at(2), at(2) + 0.8)));
      },
    },
    // ======================================================= 2 Schichten (true height scale)
    {
      id: 'schichten', kicker: 'Wellenausbreitung', title: 'Die Schichten der Ionosphäre',
      lines: [
        { say: 'Die Ionosphäre besteht aus mehreren Schichten.', cap: 'Die Ionosphäre besteht aus mehreren Schichten.' },
        { say: 'Die D-Schicht liegt in fünfzig bis neunzig Kilometern Höhe. Sie dämpft Funkwellen, tiefe Frequenzen am stärksten, und es gibt sie nur tagsüber.', cap: 'D (50–90 km): dämpft, tiefe Frequenzen am stärksten – nur tagsüber.' },
        { say: 'Die E-Schicht darüber reicht bis etwa einhundertdreißig Kilometer. Sie bricht Wellen bis etwa zehn Megahertz und verschwindet nachts.', cap: 'E (90–130 km): bricht Wellen bis etwa 10 MHz – verschwindet nachts.' },
        { say: 'Die F-Schicht reicht bis etwa vierhundertfünfzig Kilometer. Sie ist für Fernverbindungen am wichtigsten und bleibt auch nachts erhalten.', cap: 'F (130–450 km): wichtigste DX-Schicht – bleibt auch nachts.' },
      ],
      init(ctx) {
        const S = 0.8, gy = 560, y = km => gy - km * S;
        mk(ctx.svg, 'line', { x1: 140, y1: gy, x2: 1100, y2: gy, stroke: C.ink2, 'stroke-width': 3 });
        mk(ctx.svg, 'line', { x1: 140, y1: gy, x2: 140, y2: y(470), stroke: C.ink2, 'stroke-width': 2.5 });
        for (const km of [0, 100, 200, 300, 400]) { mk(ctx.svg, 'line', { x1: 132, y1: y(km), x2: 148, y2: y(km), stroke: C.ink2, 'stroke-width': 2 }); text(ctx.svg, 120, y(km) + 6, String(km), { 'text-anchor': 'end', 'font-size': 18, fill: C.muted, 'font-weight': 600 }); }
        text(ctx.svg, 130, y(470) - 6, 'Höhe in km', { 'text-anchor': 'end', 'font-size': 17, fill: C.muted, 'font-weight': 600 });
        const L = (a, b, col, name, desc) => { const g = mk(ctx.svg, 'g', {}); mk(g, 'rect', { x: 160, y: y(b), width: 700, height: (b - a) * S, fill: col, 'fill-opacity': 0.22, stroke: col, 'stroke-width': 2.5, rx: 4 }); text(g, 180, y(b) + (b - a) * S / 2 + 8, name, { 'font-weight': 700, 'font-size': 24, fill: col }); text(g, 890, y(b) + (b - a) * S / 2 + 7, desc, { 'font-weight': 600, 'font-size': 20, fill: C.ink2 }); g.style.opacity = 0; return g; };
        const d = L(50, 90, C.warn, 'D', 'dämpft'), e = L(90, 130, C.violet, 'E', 'bricht ≤ 10 MHz'), f = L(130, 450, C.accent2, 'F  (F1 und F2)', 'DX, auch nachts');
        const earth = text(ctx.svg, 150, gy + 30, 'Erdboden', { 'font-weight': 600, 'font-size': 19, fill: C.muted });
        const nightchip = chipBox(ctx, 'nachts: D und E lösen sich auf', 'left:860px;top:440px;');
        return { d, e, f, nightchip };
      },
      update(ctx, { t, at, state: s }) {
        opacity(s.d, seg(t, at(1), at(1) + 0.7)); opacity(s.e, seg(t, at(2), at(2) + 0.7)); opacity(s.f, seg(t, at(3), at(3) + 0.7));
        opacity(s.nightchip, seg(t, at(3) + 1.6, at(3) + 2.4));
      },
    },
    // ======================================================= 3 Sprungdistanz und tote Zone
    {
      id: 'sprung', kicker: 'Wellenausbreitung', title: 'Sprungdistanz und tote Zone',
      lines: [
        { say: 'Strahlen, die steil nach oben gehen, durchstoßen die Schicht und verschwinden im Weltraum.', cap: 'Steile Strahlen durchstoßen die Schicht und gehen verloren.' },
        { say: 'Flachere Strahlen werden gebrochen und kommen zur Erde zurück.', cap: 'Flachere Strahlen werden gebrochen und kehren zur Erde zurück.' },
        { say: 'Die Entfernung, in der der erste Strahl wieder landet, ist die Sprungdistanz.', cap: 'Die Entfernung, in der der erste Strahl landet, ist die Sprungdistanz.' },
        { say: 'Zwischen dem Ende der Bodenwelle und der Sprungdistanz hörst du nichts: Das ist die tote Zone.', cap: 'Zwischen Bodenwelle und Sprungdistanz: die tote Zone.' },
      ],
      init(ctx) {
        ground(ctx.svg); layerBand(ctx.svg, H, 34, 'F2-Schicht'); kmAxis(ctx.svg);
        const F = 14, angles = [72, 45, 25, 17, 12.4];
        const rays = angles.map((a, i) => { const r = rayPath(a, F); const o = rayObj(ctx.svg, r.reflects ? C.forward : C.reflect, 3.5); return { a, r, ...o }; });
        const crit = skipKm(F), landX = X0 + crit * K;
        const dead = mk(ctx.svg, 'rect', { x: X0 + 100, y: GY - 12, width: landX - X0 - 70, height: 12, fill: 'rgba(212,81,61,0.55)' });
        const deadL = text(ctx.svg, (X0 + 100 + landX) / 2, GY - 24, 'tote Zone', { 'text-anchor': 'middle', 'font-weight': 700, 'font-size': 22, fill: C.reflect });
        const gw = mk(ctx.svg, 'path', { d: `M${X0 + 30} ${GY - 2} Q ${X0 + 65} ${GY - 22} ${X0 + 100} ${GY - 2}`, fill: 'none', stroke: C.good, 'stroke-width': 4 });
        const gwl = text(ctx.svg, X0 + 75, GY - 34, 'Bodenwelle', { 'text-anchor': 'middle', 'font-weight': 700, 'font-size': 18, fill: C.good });
        const sk = mk(ctx.svg, 'g', {}); mk(sk, 'line', { x1: landX, y1: GY + 8, x2: landX, y2: GY + 74, stroke: C.good, 'stroke-width': 3, 'stroke-dasharray': '6 5' });
        text(sk, landX + 8, GY + 96, `Sprungdistanz ≈ ${Math.round(crit / 10) * 10} km`, { 'font-weight': 700, 'font-size': 21, fill: C.good });
        const cap = chipBox(ctx, '14 MHz, Beispiel: höchste nutzbare Frequenz senkrecht (foF2) = 6 MHz', 'left:90px;top:128px;');
        tx(ctx.svg);
        return { rays, dead, deadL, gw, gwl, sk, cap };
      },
      update(ctx, { t, at, end, state: s }) {
        s.rays.forEach((ry, i) => {
          const t0 = i < 2 ? at(0) + 0.4 + i * 0.5 : at(1) + 0.2 + (i - 2) * 0.55;
          const u = seg(t, t0, t0 + 2.2, E.io);
          ry.path.setAttribute('d', partial(ry.r.pts, u));
          const loop = ((t - t0 - 2.4) * 0.35) % 1.4, vis = u >= 0.999 ? 1 : 0;
          const p = pointAt(ry.r.pts, clamp(loop)); setA(ry.dot, { cx: p[0], cy: p[1] }); opacity(ry.dot, vis && loop >= 0 && loop <= 1 ? 1 : 0);
          opacity(ry.path, u > 0 ? (ry.r.reflects ? 1 : 0.9) : 0);
        });
        opacity(s.sk, seg(t, at(2), at(2) + 0.8)); const dd = seg(t, at(3) - 0.1, at(3) + 0.8);
        opacity(s.dead, dd); opacity(s.deadL, dd); opacity(s.gw, seg(t, at(3) - 0.2, at(3) + 0.5)); opacity(s.gwl, seg(t, at(3) - 0.2, at(3) + 0.5));
        opacity(s.cap, seg(t, at(1), at(1) + 0.8));
      },
    },
    // ======================================================= 4 Frequenz
    {
      id: 'frequenz', kicker: 'Wellenausbreitung', title: 'Je höher die Frequenz, desto größer die tote Zone',
      lines: [
        { say: 'Wie weit die tote Zone reicht, hängt von der Frequenz ab.', cap: 'Wie weit die tote Zone reicht, hängt von der Frequenz ab.' },
        { say: 'Bei tiefen Frequenzen kehrt sogar der senkrechte Strahl zurück. Dann gibt es kaum eine tote Zone.', cap: '3,6 MHz (80 m): Auch der senkrechte Strahl kehrt zurück.' },
        { say: 'Auf vierzig Meter liegt die Sprungdistanz in diesem Beispiel bei etwa dreihundertsechzig Kilometern.', cap: '7 MHz (40 m): Sprungdistanz ≈ 360 km' },
        { say: 'Auf zwanzig Meter sind es rund zwölfhundertfünfzig Kilometer, auf zehn Meter über zweitausendsiebenhundert.', cap: '14 MHz (20 m): ≈ 1250 km · 28 MHz (10 m): über 2700 km' },
        { say: 'Je höher die Frequenz, desto größer die tote Zone.', cap: 'Je höher die Frequenz, desto größer die tote Zone.' },
      ],
      init(ctx) {
        ground(ctx.svg); layerBand(ctx.svg, H, 34, 'F2-Schicht'); kmAxis(ctx.svg); tx(ctx.svg);
        const ray = rayObj(ctx.svg, C.forward, 4), ray2 = rayObj(ctx.svg, C.forward, 4);
        const dead = mk(ctx.svg, 'rect', { x: X0 + 100, y: GY - 12, width: 0, height: 12, fill: 'rgba(212,81,61,0.55)' });
        const sk = mk(ctx.svg, 'line', { y1: GY + 8, y2: GY + 74, stroke: C.good, 'stroke-width': 3, 'stroke-dasharray': '6 5' });
        const ro = ctx.h('<div class="eq"></div>', 'left:90px;top:118px;font-size:30px;line-height:1.4');
        const note = chipBox(ctx, 'foF2 = 6 MHz als Beispielwert, vereinfachte Geometrie', 'left:650px;top:128px;');
        return { ray, ray2, dead, sk, ro, note };
      },
      update(ctx, { t, at, end, state: s }) {
        // frequency keyframes: 3.6 (line1) -> 7 (line2) -> 14 -> 28 (line3), eased
        const key = [[at(1) - 0.6, 3.6], [at(2), 7], [at(3), 14], [at(3) + 4.0, 28]];
        let f = 3.6;
        for (let i = 0; i < key.length - 1; i++) if (t >= key[i][0] && t <= key[i + 1][0]) f = lerp(key[i][1], key[i + 1][1], E.io(clamp((t - key[i][0]) / (key[i + 1][0] - key[i][0]))));
        if (t > key[key.length - 1][0]) f = 28;
        const vis = seg(t, at(0) + 0.4, at(0) + 1.2);
        const a = critDeg(f), sk = skipKm(f);
        const r = rayPath(Math.min(a, 89.9), f);
        s.ray.path.setAttribute('d', partial(r.pts, 1)); opacity(s.ray.path, vis);
        const loop = ((t * 0.28) % 1.4), p = pointAt(r.pts, clamp(loop)); setA(s.ray.dot, { cx: p[0], cy: p[1] }); opacity(s.ray.dot, vis * (loop <= 1 ? 1 : 0));
        const landX = X0 + sk * K; setA(s.dead, { width: Math.max(0, landX - X0 - 70) }); opacity(s.dead, vis * (sk > 0 ? 1 : 0));
        setA(s.sk, { x1: landX, x2: landX }); opacity(s.sk, vis * (sk > 0 ? 1 : 0));
        const fs = f.toFixed(1).replace('.', ','), aD = a >= 89 ? '90°' : `${a.toFixed(0)}°`;
        s.ro.innerHTML = `${ctx.tex(`f=${fs.replace(',', '{,}')}\\,\\text{MHz}`)}<br>${ctx.tex(`\\sin\\alpha_{krit}=\\frac{f_{oF2}}{f}\\quad\\Rightarrow\\quad\\alpha_{krit}=${aD.replace('°', '^\\circ')}`)}<br>${ctx.tex(`\\text{Sprungdistanz}\\approx${Math.round(sk / 10) * 10}\\,\\text{km}`)}`;
        opacity(s.ro, seg(t, at(0) + 0.8, at(0) + 1.6)); 
        opacity(s.note, seg(t, at(0) + 1.0, at(0) + 1.8));
      },
    },
    // ======================================================= 5 MUF
    {
      id: 'muf', kicker: 'Wellenausbreitung', title: 'MUF: Tag und Nacht',
      lines: [
        { say: 'Die höchste Frequenz, die für eine Strecke noch zurückkommt, heißt MUF.', cap: 'Die höchste Frequenz, die für eine Strecke noch zurückkommt: MUF.' },
        { say: 'Sie hängt von der Ionisation ab. Tagsüber ist sie hoch, nachts sinkt sie.', cap: 'Tagsüber ist die MUF hoch, nachts sinkt sie.' },
        { say: 'Beispiel: Für zweitausend Kilometer liegt die MUF tagsüber bei etwa einundzwanzig Megahertz, nachts bei etwa zehn.', cap: '2000 km: MUF tagsüber ≈ 21 MHz, nachts ≈ 10 MHz' },
        { say: 'Tagsüber geht dann zwanzig Meter, nachts nur noch vierzig Meter.', cap: 'Tagsüber 20 m offen, nachts nur noch 40 m.' },
        { say: 'Nach unten begrenzt tagsüber die Dämpfung der D-Schicht: die LUF.', cap: 'Nach unten begrenzt tagsüber die D-Schicht-Dämpfung: die LUF.' },
      ],
      init(ctx) {
        const fx = f => 120 + f / 32 * 1040, Y = 470;
        mk(ctx.svg, 'line', { x1: 100, y1: Y, x2: 1200, y2: Y, stroke: C.ink2, 'stroke-width': 3 });
        for (const [f, b] of [[3.6, '80 m'], [7, '40 m'], [14, '20 m'], [21, '15 m'], [28, '10 m']]) {
          mk(ctx.svg, 'line', { x1: fx(f), y1: Y, x2: fx(f), y2: Y + 12, stroke: C.ink2, 'stroke-width': 3 });
          text(ctx.svg, fx(f), Y + 38, b, { 'text-anchor': 'middle', 'font-weight': 700, 'font-size': 21, fill: C.ink });
          text(ctx.svg, fx(f), Y + 62, `${String(f).replace('.', ',')} MHz`, { 'text-anchor': 'middle', 'font-size': 17, fill: C.muted, 'font-weight': 600 });
        }
        const zone = mk(ctx.svg, 'rect', { y: Y - 120, height: 120, fill: 'rgba(31,157,107,0.20)', stroke: C.good, 'stroke-width': 2.5, rx: 6 });
        const lbl = text(ctx.svg, 0, Y - 134, 'nutzbar', { 'font-weight': 700, 'font-size': 22, fill: C.good });
        const muf = mk(ctx.svg, 'g', {}); const mline = mk(muf, 'line', { y1: Y - 150, y2: Y + 6, stroke: C.reflect, 'stroke-width': 5 }); const mtxt = text(muf, 0, Y - 158, 'MUF', { 'text-anchor': 'middle', 'font-weight': 700, 'font-size': 24, fill: C.reflect });
        const luf = mk(ctx.svg, 'g', {}); const lline = mk(luf, 'line', { y1: Y - 150, y2: Y + 6, stroke: C.warn, 'stroke-width': 5 }); const ltxt = text(luf, 0, Y - 158, 'LUF', { 'text-anchor': 'middle', 'font-weight': 700, 'font-size': 24, fill: C.warn });
        const sun = mk(ctx.svg, 'g', {}); mk(sun, 'circle', { cx: 1150, cy: 200, r: 30, fill: '#f6c445' });
        const moon = mk(ctx.svg, 'g', {}); mk(moon, 'circle', { cx: 1150, cy: 200, r: 30, fill: '#cfd6ea' }); mk(moon, 'circle', { cx: 1162, cy: 192, r: 26, fill: '#f6f7fb' });
        const eq = eqBox(ctx, 'f_{MUF}=\\frac{f_{oF2}}{\\sin\\alpha}', 'left:120px;top:112px;');
        const ex = ctx.h('<div class="eq"></div>', 'left:120px;top:232px;font-size:26px');
        return { fx, Y, zone, lbl, muf, mline, mtxt, luf, lline, ltxt, sun, moon, eq, ex };
      },
      update(ctx, { t, at, end, state: s }) {
        const alpha = Math.atan(2 * H / 2000), sinA = Math.sin(alpha);
        const night = seg(t, at(1) + 0.5, at(1) + 2.0, E.io);
        const dayF = FOF2 / sinA, nightF = 3 / sinA;
        const f = lerp(dayF, nightF, night);
        const show = seg(t, at(2) - 0.3, at(2) + 0.6);
        // the MUF stays hidden until line 2; in lines 0-1 we show the idea with the free band zone
        const lufF = lerp(4.6, 2.2, night);
        const x0 = s.fx(0) , xl = s.fx(lufF), xm = s.fx(f);
        setA(s.zone, { x: xl, width: xm - xl }); const vz = seg(t, at(0) + 0.8, at(0) + 1.6); opacity(s.zone, vz);
        setA(s.lbl, { x: (xl + xm) / 2 - 38, y: s.Y - 134 }); opacity(s.lbl, vz);
        setA(s.mline, { x1: xm, x2: xm }); setA(s.mtxt, { x: xm, y: s.Y - 158 }); opacity(s.muf, seg(t, at(0) + 1.4, at(0) + 2.2));
        const lv = seg(t, at(4), at(4) + 0.8);
        setA(s.lline, { x1: xl, x2: xl }); setA(s.ltxt, { x: xl, y: s.Y - 158 }); opacity(s.luf, lv);
        opacity(s.sun, 1 - night); opacity(s.moon, night); opacity(s.eq, seg(t, at(1) + 2.2, at(1) + 3.0));
        s.ex.innerHTML = night < 0.5 ? ctx.tex('\\alpha=\\arctan\\frac{2h}{d}=17^\\circ\\quad\\Rightarrow\\quad f_{MUF}\\approx\\frac{6\\,\\text{MHz}}{0{,}29}\\approx21\\,\\text{MHz}') : ctx.tex('\\alpha=17^\\circ\\quad\\Rightarrow\\quad f_{MUF}\\approx\\frac{3\\,\\text{MHz}}{0{,}29}\\approx10\\,\\text{MHz}');
        opacity(s.ex, show); 
      },
    },
    // ======================================================= 6 merken
    {
      id: 'merken', kicker: 'Zum Merken', title: 'Vier Sätze zum Mitnehmen',
      lines: [
        { say: 'Zum Merken: D dämpft, E und F brechen die Wellen zurück.', cap: 'D dämpft, E und F brechen die Wellen zurück.' },
        { say: 'Steile Strahlen gehen durch, flache kehren zurück, und die tote Zone wächst mit der Frequenz.', cap: 'Steil → durch, flach → zurück · Tote Zone wächst mit der Frequenz.' },
        { say: 'Die MUF ist tagsüber hoch und nachts niedrig. Darum schließen nachts zuerst die oberen Bänder.', cap: 'MUF: Tag hoch, Nacht niedrig – nachts schließen zuerst die oberen Bänder.' },
        { say: 'Die passenden Prüfungsfragen findest du in der Lektion zu Ionosphäre und Kurzwelle. Viel Erfolg beim Üben!', cap: 'Die passenden Prüfungsfragen findest du in der Lektion zu Ionosphäre und Kurzwelle.' },
      ],
      init(ctx) {
        const items = [['\\text{D dämpft}\\quad\\cdot\\quad\\text{E, F brechen}', 'Die Schichten'], ['\\text{steil: durch}\\quad\\cdot\\quad\\text{flach: zurück}', 'Der Abstrahlwinkel entscheidet'], ['\\text{tote Zone}\\quad\\uparrow\\quad\\text{mit}\\quad f', 'Höhere Frequenz, größere tote Zone'], ['f_{MUF}\\quad\\text{Tag}\\quad>\\quad f_{MUF}\\quad\\text{Nacht}', 'Nachts schließen die oberen Bänder zuerst']]
          .map(([f, label], i) => ctx.h(`<div style="display:flex;gap:26px;align-items:center;width:1100px"><div class="chip" style="width:560px;box-sizing:border-box;text-align:center;font-size:28px;padding:8px 20px">${ctx.tex(f)}</div><div style="font-size:26px;font-weight:600;color:#3b3b55">${label}</div></div>`, `left:90px;top:${150 + i * 110}px;`));
        return { items };
      },
      update(ctx, { t, at, state: s }) {
        const st = [at(0) + 0.2, at(1) + 0.1, at(1) + 2.6, at(2) + 3.5];
        s.items.forEach((n, i) => { const v = seg(t, st[i], st[i] + 0.7, E.out); opacity(n, v); n.style.transform = `translateX(${(1 - v) * 40}px)`; });
      },
    },
  ],
});
