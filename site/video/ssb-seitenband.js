// Explainer video: "Vom Sprachsignal zum SSB-Signal" (Amateurfunk Klasse E, Modulation).
// The speech spectrum (0,3 … 2,7 kHz, falling) is shifted to the carrier; AM keeps both mirrored copies, SSB keeps one.
import { defineVideo, E, seg, clamp, lerp, COLORS as C, setA, text } from './engine.js';

const NS = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const n = document.createElementNS(NS, tag); setA(n, a); p.append(n); return n; };
const opacity = (n, v) => { n.style.opacity = v; };
const chipBox = (ctx, html, style) => ctx.h(`<span class="chip">${html}</span>`, style);

const PX = 130, XC = 640, YB = 440;                  // px per kHz, carrier x, baseline y
const amp = f => 170 * (1 - 0.72 * (f - 0.3) / 2.4); // speech spectrum: strong low, weak high (lesson: 0,3 kHz high → 2,7 kHz low)
// polygon of the speech band placed at x0 (position of 0 Hz), dir +1 (copy) or -1 (mirrored)
function band(x0, dir, grow = 1) {
  const n = 24, pts = [];
  for (let i = 0; i <= n; i++) { const f = 0.3 + 2.4 * i / n; pts.push([x0 + dir * f * PX, YB - amp(f) * grow]); }
  const a = pts.map(p => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' L');
  return `M${x0 + dir * 0.3 * PX} ${YB} L${a} L${x0 + dir * 2.7 * PX} ${YB} Z`;
}
function axisKHz(svg, x0, labelCarrier = true, cap = 'Frequenz in kHz (Abstand zum Träger)') {
  mk(svg, 'line', { x1: 80, y1: YB, x2: 1200, y2: YB, stroke: C.ink2, 'stroke-width': 3 });
  for (let k = -4; k <= 4; k++) { const x = x0 + k * PX; if (x < 90 || x > 1190) continue; mk(svg, 'line', { x1: x, y1: YB, x2: x, y2: YB + 10, stroke: C.ink2, 'stroke-width': 2 }); if (k !== 0 || !labelCarrier) text(svg, x, YB + 34, `${k > 0 ? '+' : k < 0 ? '−' : ''}${Math.abs(k)}`, { 'text-anchor': 'middle', 'font-size': 18, fill: C.muted, 'font-weight': 600 }); }
  text(svg, 1200, YB + 62, cap, { 'text-anchor': 'end', 'font-size': 17, fill: C.muted, 'font-weight': 600 });
}
const bracket = (svg, a, b, y, col, label) => { const g = mk(svg, 'g', {}); mk(g, 'path', { d: `M${a} ${y + 12} V${y} H${b} V${y + 12}`, fill: 'none', stroke: col, 'stroke-width': 4 }); text(g, (a + b) / 2, y - 12, label, { 'text-anchor': 'middle', 'font-weight': 700, 'font-size': 22, fill: col }); g.style.opacity = 0; return g; };

export default defineVideo({
  id: 'ssb-seitenband',
  out: 'ssb-seitenband',
  brand: 'Learning · Amateurfunk',
  poster: 3.2,
  scenes: [
    // ======================================================= 1 Sprache auf den Träger schieben
    {
      id: 'sprache', kicker: 'Modulation', title: 'Sprache braucht einen Träger',
      lines: [
        { say: 'Sprache besteht aus Frequenzen zwischen ungefähr dreihundert und siebenundzwanzighundert Hertz.', cap: 'Sprache: etwa 300 bis 2700 Hz.' },
        { say: 'Alle Sprecher hätten denselben Frequenzbereich und würden einander stören.', cap: 'Alle Sprecher hätten denselben Frequenzbereich und würden einander stören.' },
        { say: 'Darum schiebt man die Sprache mit einem Träger auf eine eigene Frequenz.', cap: 'Darum schiebt man die Sprache mit einem Träger auf eine eigene Frequenz.' },
      ],
      init(ctx) {
        axisKHz(ctx.svg, 140, false, 'Frequenz in kHz');
        const sp = mk(ctx.svg, 'path', { fill: 'rgba(3,105,161,0.25)', stroke: C.forward, 'stroke-width': 3.5, 'stroke-linejoin': 'round' });
        const lab = text(ctx.svg, 0, 0, 'Sprachspektrum', { 'text-anchor': 'middle', 'font-weight': 700, 'font-size': 22, fill: C.forward });
        const car = mk(ctx.svg, 'g', {}); mk(car, 'line', { x1: XC, y1: YB, x2: XC, y2: YB - 230, stroke: C.accent, 'stroke-width': 7, 'stroke-linecap': 'round' }); text(car, XC, YB - 244, 'Träger', { 'text-anchor': 'middle', 'font-weight': 700, 'font-size': 22, fill: C.accent });
        const hz = ctx.h('<div class="chip">0 Hz</div>', 'left:110px;top:488px;');
        const stor = chipBox(ctx, 'alle gleichzeitig auf 0,3 bis 2,7 kHz?', 'left:520px;top:140px;');
        return { sp, lab, car, hz, stor };
      },
      update(ctx, { t, at, state: s }) {
        const x0 = lerp(140, XC, E.io(seg(t, at(2) + 0.2, at(2) + 2.2)));
        const show = seg(t, at(0) + 0.3, at(0) + 1.2);
        s.sp.setAttribute('d', band(x0, 1, show)); opacity(s.sp, show);
        setA(s.lab, { x: x0 + 1.5 * PX, y: YB - amp(0.3) - 26 }); opacity(s.lab, show);
        opacity(s.stor, seg(t, at(1) + 0.2, at(1) + 0.9) * (1 - seg(t, at(2), at(2) + 0.5)));
        opacity(s.car, seg(t, at(2), at(2) + 0.8)); opacity(s.hz, 0);
      },
    },
    // ======================================================= 2 AM: zwei Seitenbänder
    {
      id: 'am', kicker: 'Modulation', title: 'AM: zwei Seitenbänder',
      lines: [
        { say: 'Bei Amplitudenmodulation entstehen beiderseits des Trägers zwei Seitenbänder.', cap: 'Bei AM entstehen beiderseits des Trägers zwei Seitenbänder.' },
        { say: 'Das obere Seitenband ist eine Kopie des Sprachspektrums, das untere ein gespiegeltes Abbild.', cap: 'Oberes Seitenband: Kopie · unteres Seitenband: gespiegeltes Abbild.' },
        { say: 'Beide enthalten dieselbe Information, und der Träger enthält gar keine.', cap: 'Beide Seitenbänder tragen dieselbe Information, der Träger keine.' },
        { say: 'Die belegte Bandbreite ist das Doppelte der höchsten Sprachfrequenz: etwa fünf Komma vier Kilohertz.', cap: '2 · 2,7 kHz = 5,4 kHz belegte Bandbreite' },
      ],
      init(ctx) {
        axisKHz(ctx.svg, XC);
        const usb = mk(ctx.svg, 'path', { fill: 'rgba(3,105,161,0.25)', stroke: C.forward, 'stroke-width': 3.5, 'stroke-linejoin': 'round', d: band(XC, 1) });
        const lsb = mk(ctx.svg, 'path', { fill: 'rgba(124,58,237,0.20)', stroke: C.violet, 'stroke-width': 3.5, 'stroke-linejoin': 'round', d: band(XC, -1) });
        const car = mk(ctx.svg, 'g', {}); mk(car, 'line', { x1: XC, y1: YB, x2: XC, y2: YB - 230, stroke: C.accent, 'stroke-width': 7, 'stroke-linecap': 'round' }); text(car, XC, YB - 244, 'Träger', { 'text-anchor': 'middle', 'font-weight': 700, 'font-size': 22, fill: C.accent });
        const lu = text(ctx.svg, XC + 1.5 * PX, YB - 200, 'oberes Seitenband', { 'text-anchor': 'middle', 'font-weight': 700, 'font-size': 21, fill: C.forward });
        const ll = text(ctx.svg, XC - 1.5 * PX, YB - 200, 'unteres Seitenband', { 'text-anchor': 'middle', 'font-weight': 700, 'font-size': 21, fill: C.violet });
        const br = bracket(ctx.svg, XC - 2.7 * PX, XC + 2.7 * PX, 130, C.reflect, '5,4 kHz');
        const noinfo = chipBox(ctx, 'Träger: keine Information', 'left:660px;top:150px;');
        const fT = text(ctx.svg, XC, YB + 34, 'fT', { 'text-anchor': 'middle', 'font-size': 20, fill: C.accent, 'font-weight': 700 });
        return { usb, lsb, car, lu, ll, br, noinfo };
      },
      update(ctx, { t, at, state: s }) {
        opacity(s.car, seg(t, at(0) - 0.2, at(0) + 0.6));
        const u = seg(t, at(0) + 0.3, at(0) + 1.2), l = seg(t, at(0) + 1.0, at(0) + 1.9);
        s.usb.setAttribute('d', band(XC, 1, u)); s.lsb.setAttribute('d', band(XC, -1, l)); opacity(s.usb, u); opacity(s.lsb, l);
        opacity(s.lu, seg(t, at(1) - 0.1, at(1) + 0.5)); opacity(s.ll, seg(t, at(1) + 0.8, at(1) + 1.5));
        opacity(s.noinfo, seg(t, at(2) + 0.6, at(2) + 1.3) * (1 - seg(t, at(3), at(3) + 0.4)));
        opacity(s.br, seg(t, at(3) + 0.2, at(3) + 1.0));
      },
    },
    // ======================================================= 3 SSB
    {
      id: 'ssb', kicker: 'Modulation', title: 'SSB: nur ein Seitenband',
      lines: [
        { say: 'Bei Einseitenbandmodulation lässt man den Träger und ein Seitenband weg.', cap: 'SSB: Träger und ein Seitenband werden weggelassen.' },
        { say: 'Übrig bleibt ein Seitenband mit der Bandbreite der Sprache, bei Sprechfunk etwa zweikommavier Kilohertz.', cap: 'Übrig bleibt ein Seitenband: etwa 2,4 kHz Bandbreite.' },
        { say: 'Die ganze Sendeleistung steckt dann in der Information, nichts geht in den Träger.', cap: 'Die ganze Sendeleistung steckt in der Information.' },
        { say: 'Im oberen Seitenband liegt ein Ton von einem Kilohertz bei einundzwanzig Komma zwei fünf null Megahertz Träger einen Kilohertz darüber.', cap: 'USB: 21,250 MHz + 1 kHz = 21,251 MHz (Träger selbst fehlt)' },
        { say: 'Im unteren Seitenband liegt ein Ton von zwei Kilohertz bei drei Komma sechs fünf Megahertz Träger zwei Kilohertz darunter.', cap: 'LSB: 3,650 MHz − 2 kHz = 3,648 MHz (gespiegelt)' },
      ],
      init(ctx) {
        axisKHz(ctx.svg, XC);
        const usb = mk(ctx.svg, 'path', { fill: 'rgba(3,105,161,0.25)', stroke: C.forward, 'stroke-width': 3.5, 'stroke-linejoin': 'round', d: band(XC, 1) });
        const lsb = mk(ctx.svg, 'path', { fill: 'rgba(124,58,237,0.20)', stroke: C.violet, 'stroke-width': 3.5, 'stroke-linejoin': 'round', d: band(XC, -1) });
        const car = mk(ctx.svg, 'g', {}); mk(car, 'line', { x1: XC, y1: YB, x2: XC, y2: YB - 230, stroke: C.accent, 'stroke-width': 7, 'stroke-linecap': 'round' }); const ct = text(car, XC, YB - 244, 'Träger', { 'text-anchor': 'middle', 'font-weight': 700, 'font-size': 22, fill: C.accent });
        const ghost = mk(ctx.svg, 'line', { x1: XC, y1: YB, x2: XC, y2: YB - 230, stroke: C.accent, 'stroke-width': 3, 'stroke-dasharray': '7 7' });
        const br = bracket(ctx.svg, XC + 0.3 * PX, XC + 2.7 * PX, 150, C.good, '2,4 kHz');
        const tone = mk(ctx.svg, 'g', {}); const tl = mk(tone, 'line', { y1: YB, y2: YB - 120, stroke: C.reflect, 'stroke-width': 6, 'stroke-linecap': 'round' }); const tt = text(tone, 0, YB - 134, '', { 'text-anchor': 'middle', 'font-weight': 700, 'font-size': 22, fill: C.reflect });
        const pwr = chipBox(ctx, 'alles in der Information', 'left:100px;top:150px;');
        const mode = chipBox(ctx, 'USB', 'left:1050px;top:150px;');
        const fT = text(ctx.svg, XC, YB + 34, 'fT', { 'text-anchor': 'middle', 'font-size': 20, fill: C.accent, 'font-weight': 700 });
        return { usb, lsb, car, ct, ghost, br, tone, tl, tt, pwr, mode };
      },
      update(ctx, { t, at, state: s }) {
        const drop = seg(t, at(0) + 0.5, at(0) + 1.8);
        const toLsb = seg(t, at(4) - 0.2, at(4) + 0.6);                 // switch the display to LSB in the last line
        opacity(s.car, 1 - drop); opacity(s.ghost, drop * 0.7 * (1 - 0));
        opacity(s.lsb, (1 - drop) * 1 + toLsb * drop); opacity(s.usb, 1 - toLsb * drop);
        s.usb.setAttribute('d', band(XC, 1)); s.lsb.setAttribute('d', band(XC, -1));
        opacity(s.br, seg(t, at(1) + 0.3, at(1) + 1.0) * (1 - toLsb));
        opacity(s.pwr, seg(t, at(2) + 0.2, at(2) + 0.9) * (1 - seg(t, at(3), at(3) + 0.4)));
        // tone marker: line 3 at +1 kHz (USB), line 4 at −2 kHz (LSB)
        const f = lerp(1, -2, toLsb), x = XC + f * PX;
        setA(s.tl, { x1: x, x2: x }); setA(s.tt, { x, y: YB - 134 });
        s.tt.textContent = toLsb < 0.5 ? '1 kHz' : '2 kHz';
        opacity(s.tone, seg(t, at(3) + 1.0, at(3) + 1.8));
        opacity(s.mode, seg(t, at(3), at(3) + 0.6)); s.mode.firstChild.textContent = toLsb < 0.5 ? 'USB' : 'LSB';
      },
    },
    // ======================================================= 4 Bandbreiten
    {
      id: 'vergleich', kicker: 'Modulation', title: 'Wer belegt wie viel Platz?',
      lines: [
        { say: 'Vergleichen wir die belegte Bandbreite.', cap: 'Vergleichen wir die belegte Bandbreite.' },
        { say: 'CW braucht bei zwanzig Wörtern pro Minute nur etwa dreihundert Hertz.', cap: 'CW (20 Wörter/min): etwa 300 Hz' },
        { say: 'SSB mit Sprache belegt etwa zweikommavier Kilohertz.', cap: 'SSB mit Sprache: etwa 2,4 kHz' },
        { say: 'AM belegt mit fünf Komma vier Kilohertz mehr als das Doppelte.', cap: 'AM mit Sprache: 5,4 kHz' },
      ],
      init(ctx) {
        const S = 120, X = 280, rows = [['CW', 0.3, C.good, '≈ 0,3 kHz'], ['SSB', 2.4, C.forward, '≈ 2,4 kHz'], ['AM', 5.4, C.reflect, '5,4 kHz']];
        mk(ctx.svg, 'line', { x1: X, y1: 190, x2: X, y2: 480, stroke: C.ink2, 'stroke-width': 3 });
        const bars = rows.map(([n, bw, col, lab], i) => {
          const y = 210 + i * 100, g = mk(ctx.svg, 'g', {});
          text(g, X - 24, y + 36, n, { 'text-anchor': 'end', 'font-weight': 700, 'font-size': 30, fill: C.ink });
          const r = mk(g, 'rect', { x: X, y, width: 0, height: 52, rx: 8, fill: col, 'fill-opacity': 0.85 });
          const l = text(g, X + 10, y + 36, lab, { 'font-weight': 700, 'font-size': 24, fill: C.ink });
          return { g, r, l, bw, y };
        });
        return { bars, S, X };
      },
      update(ctx, { t, at, state: s }) {
        const st = [at(1), at(2), at(3)];
        s.bars.forEach((b, i) => { const v = seg(t, st[i] - 0.1, st[i] + 1.1, E.out); setA(b.r, { width: Math.max(2, b.bw * s.S * v) }); setA(b.l, { x: s.X + 14 + b.bw * s.S * v }); opacity(b.g, v > 0 ? 1 : 0); });
      },
    },
    // ======================================================= 5 merken
    {
      id: 'merken', kicker: 'Zum Merken', title: 'Vier Sätze zum Mitnehmen',
      lines: [
        { say: 'Zum Merken: Modulation schiebt die Information auf einen Träger.', cap: 'Modulation schiebt die Information auf einen Träger.' },
        { say: 'AM überträgt zwei gleiche Seitenbänder plus Träger, SSB nur ein Seitenband.', cap: 'AM: zwei Seitenbänder + Träger · SSB: nur ein Seitenband.' },
        { say: 'Im oberen Seitenband rechnest du Träger plus Ton, im unteren Träger minus Ton.', cap: 'USB: fT + fNF · LSB: fT − fNF' },
        { say: 'Die passenden Prüfungsfragen findest du in der Lektion zu Morsen, AM, SSB und Bandbreite. Viel Erfolg beim Üben!', cap: 'Die passenden Prüfungsfragen findest du in der Lektion zu Morsen, AM, SSB und Bandbreite.' },
      ],
      init(ctx) {
        const bs = String.fromCharCode(92);
        const items = [[`f_{HF}=f_T${bs}pm f_{NF}`, 'Modulation verschiebt auf den Träger'], [`B_{AM}=2${bs}cdot f_{NF,max}`, 'AM: doppelte Bandbreite'], [`B_{SSB}${bs}approx f_{NF,max}-f_{NF,min}`, 'SSB: nur das Seitenband'], [`USB:${bs}quad f_T+f_{NF}${bs}qquad LSB:${bs}quad f_T-f_{NF}`, 'Die Frequenz im Seitenband']]
          .map(([f, label], i) => ctx.h(`<div style="display:flex;gap:26px;align-items:center;width:1100px"><div class="chip" style="width:560px;box-sizing:border-box;text-align:center;font-size:28px;padding:8px 20px">${ctx.tex(f)}</div><div style="font-size:26px;font-weight:600;color:#3b3b55">${label}</div></div>`, `left:90px;top:${150 + i * 110}px;`));
        return { items };
      },
      update(ctx, { t, at, state: s }) {
        const st = [at(0) + 0.2, at(1) + 0.1, at(1) + 2.0, at(2) + 0.6];
        s.items.forEach((n, i) => { const v = seg(t, st[i], st[i] + 0.7, E.out); opacity(n, v); n.style.transform = `translateX(${(1 - v) * 40}px)`; });
      },
    },
  ],
});
