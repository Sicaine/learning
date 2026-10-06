// Explainer video: "Superhet, Mischer und Spiegelfrequenz" (Amateurfunk Klasse E, Empfänger).
// Everything is drawn from frequencies: positions follow f -> x, brackets show the mixing distance.
import { defineVideo, E, seg, clamp, lerp, COLORS as C, pathFn, setA, text } from './engine.js';

const opacity = (n, v) => { n.style.opacity = v; };
const eqBox = (ctx, tex, style, disp = true) => ctx.h(`<div class="eq">${ctx.tex(tex, disp)}</div>`, style);
const chipBox = (ctx, html, style) => ctx.h(`<span class="chip">${html}</span>`, style);
const NS = 'http://www.w3.org/2000/svg';
const mk = (p, tag, a) => { const n = document.createElementNS(NS, tag); setA(n, a); p.append(n); return n; };
const fmt = f => f.toFixed(3).replace('.', ',');

// ---- zoomed band axis (scenes 3 and 4): 13,6 … 15,8 MHz
const FA = 13.6, FB = 15.8, XA = 110, XB = 1170, YB = 430;
const xf = f => lerp(XA, XB, (f - FA) / (FB - FA));
const ZF = 0.455, FE = 14.2, FO = FE + ZF, FS = FE + 2 * ZF;

function axis(svg, y = YB) {
  mk(svg, 'line', { x1: XA - 20, y1: y, x2: XB + 20, y2: y, stroke: C.ink2, 'stroke-width': 2.5 });
  for (let f = 13.8; f <= 15.61; f += 0.2) {
    const x = xf(f); mk(svg, 'line', { x1: x, y1: y, x2: x, y2: y + 9, stroke: C.ink2, 'stroke-width': 2 });
    text(svg, x, y + 32, fmt(f).replace(/0+$/, '').replace(/,$/, ''), { 'text-anchor': 'middle', 'font-size': 18, fill: C.muted, 'font-weight': 600 });
  }
  text(svg, XB + 20, y + 62, 'Frequenz in MHz', { 'text-anchor': 'end', 'font-size': 19, fill: C.muted, 'font-weight': 600 });
}
function spike(svg, f, h, color, label, w = 8) {
  const g = mk(svg, 'g', {});
  const l = mk(g, 'line', { 'stroke-linecap': 'round', stroke: color, 'stroke-width': w });
  const t = text(g, 0, 0, label, { 'text-anchor': 'middle', 'font-weight': 700, 'font-size': 20, fill: color });
  const set = (hh, op = 1, col) => { const x = xf(f); setA(l, { x1: x, x2: x, y1: YB - 3, y2: YB - 3 - hh, ...(col ? { stroke: col } : {}) }); setA(t, { x, y: YB - 14 - hh, ...(col ? { fill: col } : {}) }); g.style.opacity = op; };
  set(h, 0);
  return { g, l, t, set, f, h };
}

export default defineVideo({
  id: 'superhet-spiegel',
  out: 'superhet-spiegel',
  brand: 'Learning · Amateurfunk',
  poster: 3.2,
  scenes: [
    // ======================================================= 1 intro: filtern ist schwer, also verschieben
    {
      id: 'intro', kicker: 'Empfänger', title: 'Warum der Superhet so heißt',
      lines: [
        { say: 'Ein Empfänger muss aus unzähligen Signalen genau eines herausfischen.', cap: 'Ein Empfänger muss aus unzähligen Signalen genau eines herausfischen.' },
        { say: 'Ein Filter, das bei jeder Frequenz gleich scharf ist, lässt sich kaum bauen.', cap: 'Ein Filter, das bei jeder Frequenz gleich scharf ist, lässt sich kaum bauen.' },
        { say: 'Der Trick des Überlagerungsempfängers: Man stimmt nicht das Filter ab, sondern verschiebt das Signal.', cap: 'Der Trick: Man stimmt nicht das Filter ab, sondern verschiebt das Signal.' },
        { say: 'Das Filter bleibt fest auf einer einzigen Frequenz, der Zwischenfrequenz.', cap: 'Das Filter bleibt fest auf einer einzigen Frequenz – der Zwischenfrequenz (ZF).' },
      ],
      init(ctx) {
        const Y0 = 300, N = 26, pos = [];
        mk(ctx.svg, 'line', { x1: 90, y1: Y0, x2: 1190, y2: Y0, stroke: C.ink2, 'stroke-width': 2.5 });
        const hs = [];
        for (let i = 0; i < N; i++) { const x = 120 + i * 41 + ((i * 37) % 11), h = 30 + ((i * 53) % 90); hs.push(mk(ctx.svg, 'line', { x1: x, x2: x, y1: Y0, y2: Y0 - h, stroke: i === 11 ? C.accent : '#9aa3b8', 'stroke-width': i === 11 ? 7 : 5, 'stroke-linecap': 'round' })); pos.push(x); }
        const win = mk(ctx.svg, 'rect', { y: 140, width: 70, height: 175, rx: 12, fill: 'rgba(14,165,233,0.15)', stroke: C.accent2, 'stroke-width': 3 });
        const hard = chipBox(ctx, 'bei jeder Frequenz neu abstimmen → schwierig', 'left:380px;top:104px;');
        // block diagram
        const g = mk(ctx.svg, 'g', {}); const by = 470;
        const boxes = [['Antenne', 100, 120], ['Eingangs-<tspan>', 0, 0]];
        const B = [['Antenne', 70, 120], ['Mischer', 330, 120], ['ZF-Filter', 560, 140], ['Demodulator', 800, 160], ['NF', 1060, 90]];
        B.forEach(([lab, x, w], i) => {
          mk(g, 'rect', { x, y: by - 40, width: w, height: 80, rx: 14, fill: '#fff', stroke: i === 1 ? C.accent : i === 2 ? C.accent2 : C.ink, 'stroke-width': 3 });
          text(g, x + w / 2, by + 8, lab, { 'text-anchor': 'middle', 'font-weight': 700, 'font-size': 22 });
        });
        mk(g, 'circle', { cx: 330 + 120 + 0, cy: by, r: 0 });
        [[190, 330], [450, 560], [700, 800], [960, 1060]].forEach(([a, b]) => { mk(g, 'line', { x1: a, y1: by, x2: b, y2: by, stroke: C.ink, 'stroke-width': 3 }); mk(g, 'path', { d: `M${b - 12} ${by - 7} L${b} ${by} L${b - 12} ${by + 7}`, fill: 'none', stroke: C.ink, 'stroke-width': 3 }); });
        const vfo = mk(g, 'g', {});
        mk(vfo, 'rect', { x: 330, y: by + 100, width: 120, height: 56, rx: 12, fill: '#fff', stroke: C.violet, 'stroke-width': 3 });
        text(vfo, 390, by + 136, 'VFO', { 'text-anchor': 'middle', 'font-weight': 700, 'font-size': 22, fill: C.violet });
        mk(vfo, 'line', { x1: 390, y1: by + 100, x2: 390, y2: by + 42, stroke: C.violet, 'stroke-width': 3 });
        const zfl = text(g, 630, by - 56, '455 kHz fest', { 'text-anchor': 'middle', 'font-weight': 700, 'font-size': 20, fill: C.accent2 });
        return { g, vfo, win, hs, pos, hard, zfl, Y0 };
      },
      update(ctx, { t, at, state: s }) {
        opacity(s.win, seg(t, at(1) - 0.2, at(1) + 0.5) * (1 - seg(t, at(2) - 0.1, at(2) + 0.5)));
        const sweep = (t - at(1)) * 0.7; s.win.setAttribute('x', 110 + 500 * (0.5 + 0.5 * Math.sin(sweep)));
        opacity(s.hard, seg(t, at(1) + 0.4, at(1) + 1.2) * (1 - seg(t, at(2), at(2) + 0.5)));
        const d = seg(t, at(2) + 0.2, at(2) + 1.2); opacity(s.g, d);
        opacity(s.vfo, seg(t, at(2) + 1.8, at(2) + 2.6)); opacity(s.zfl, seg(t, at(3), at(3) + 0.8));
        s.hs.forEach((h, i) => { h.style.opacity = i === 11 ? 1 : 1 - 0.5 * seg(t, at(2), at(2) + 1); });
      },
    },
    // ======================================================= 2 Mischer: Summe und Differenz
    {
      id: 'mischer', kicker: 'Empfänger', title: 'Der Mischer: Summe und Differenz',
      lines: [
        { say: 'Das Herzstück ist der Mischer. Er multipliziert zwei Signale miteinander.', cap: 'Das Herzstück ist der Mischer: Er multipliziert zwei Signale.' },
        { say: 'Aus Empfangsfrequenz und Oszillatorfrequenz entstehen dabei Summe und Differenz.', cap: 'Aus Empfangs- und Oszillatorfrequenz entstehen Summe und Differenz.' },
        { say: 'Beispiel: Vierzehn Komma zwei Megahertz und vierzehn Komma sechs fünf fünf Megahertz ergeben eine Differenz von nur vierhundertfünfundfünfzig Kilohertz.', cap: '14,200 MHz und 14,655 MHz → Differenz 455 kHz, Summe 28,855 MHz.' },
        { say: 'Ein festes Filter lässt nur diese Zwischenfrequenz durch. Alles andere bleibt hängen.', cap: 'Ein festes Filter lässt nur die Zwischenfrequenz (455 kHz) durch.' },
      ],
      init(ctx) {
        const X = f => 90 + f / 30 * 1100, Y = 440, sp = [];
        mk(ctx.svg, 'line', { x1: 70, y1: Y, x2: 1210, y2: Y, stroke: C.ink2, 'stroke-width': 2.5 });
        for (let f = 0; f <= 30; f += 5) { mk(ctx.svg, 'line', { x1: X(f), y1: Y, x2: X(f), y2: Y + 9, stroke: C.ink2, 'stroke-width': 2 }); text(ctx.svg, X(f), Y + 32, String(f), { 'text-anchor': 'middle', 'font-size': 18, fill: C.muted, 'font-weight': 600 }); }
        text(ctx.svg, 1210, Y + 62, 'Frequenz in MHz', { 'text-anchor': 'end', 'font-size': 19, fill: C.muted, 'font-weight': 600 });
        const S = (f, h, col, lab, anc = 'middle', dx = 0) => { const g = mk(ctx.svg, 'g', {}); mk(g, 'line', { x1: X(f), x2: X(f), y1: Y - 3, y2: Y - 3 - h, stroke: col, 'stroke-width': 9, 'stroke-linecap': 'round' }); text(g, X(f) + dx, Y - 16 - h, lab, { 'text-anchor': anc, 'font-weight': 700, 'font-size': 20, fill: col }); g.style.opacity = 0; return g; };
        const sFe = S(14.2, 110, C.forward, 'Empfang 14,200', 'end', -12), sFo = S(14.655, 160, C.violet, 'VFO 14,655', 'start', 12);
        const sD = S(0.455, 110, C.good, 'Differenz 0,455'), sS = S(28.855, 110, C.warn, 'Summe 28,855');
        const zf = mk(ctx.svg, 'rect', { x: X(0.455) - 38, y: Y - 160, width: 76, height: 170, rx: 10, fill: 'rgba(14,165,233,0.14)', stroke: C.accent2, 'stroke-width': 3 });
        const zfl = text(ctx.svg, X(0.455) + 60, Y - 175, 'ZF-Filter', { 'font-weight': 700, 'font-size': 20, fill: C.accent2 });
        const mixer = ctx.h('<div class="eq"></div>', 'left:140px;top:170px;font-size:27px'); mixer.innerHTML = ctx.tex('\\cos(\\omega_e t)\\cdot\\cos(\\omega_o t)=\\tfrac12\\left[\\cos((\\omega_o-\\omega_e)t)+\\cos((\\omega_o+\\omega_e)t)\\right]', true);
        const arrow = mk(ctx.svg, 'path', { fill: 'none', stroke: C.muted, 'stroke-width': 3, 'stroke-dasharray': '8 7' });
        return { X, Y, sFe, sFo, sD, sS, zf, zfl, mixer, arrow };
      },
      update(ctx, { t, at, state: s }) {
        opacity(s.mixer, seg(t, at(0) + 0.8, at(0) + 1.6));
        opacity(s.sFe, seg(t, at(1) - 0.2, at(1) + 0.5)); opacity(s.sFo, seg(t, at(1) + 0.5, at(1) + 1.2));
        s.mixer.style.top = '130px'; s.mixer.style.left = '140px';
        const o = seg(t, at(2) + 1.0, at(2) + 1.8); opacity(s.sD, o); opacity(s.sS, o);
        const z = seg(t, at(3), at(3) + 0.7); opacity(s.zf, z); opacity(s.zfl, z);
        const dim = seg(t, at(3) + 1.0, at(3) + 1.8); s.sS.style.opacity = o * (1 - 0.65 * dim);
        s.arrow.setAttribute('d', `M${s.X(14.2) - 20} ${s.Y - 150} Q ${s.X(7)} ${s.Y - 250} ${s.X(0.455) + 30} ${s.Y - 175}`); opacity(s.arrow, seg(t, at(2) + 0.6, at(2) + 1.4) * 0.8);
      },
    },
    // ======================================================= 3 Abstimmen
    {
      id: 'tune', kicker: 'Empfänger', title: 'Abstimmen heißt: den Oszillator drehen',
      lines: [
        { say: 'Der Oszillator, kurz V F O, schwingt um die Zwischenfrequenz neben der Empfangsfrequenz.', cap: 'Der Oszillator (VFO) schwingt um die Zwischenfrequenz neben dem Empfangssignal.' },
        { say: 'Nur ein Sender, dessen Abstand zum V F O genau der Zwischenfrequenz entspricht, landet im Filter.', cap: 'Nur ein Sender mit genau dem ZF-Abstand zum VFO landet im Filter.' },
        { say: 'Drehst du am Abstimmknopf, wandert der V F O, und ein anderer Sender rutscht hinein.', cap: 'Du drehst am Knopf: Der VFO wandert, ein anderer Sender rutscht hinein.' },
        { say: 'So arbeitet der Empfänger immer mit demselben Filter. Du stimmst nur den Oszillator ab.', cap: 'Das Filter bleibt gleich – du stimmst nur den Oszillator ab.' },
      ],
      init(ctx) {
        axis(ctx.svg);
        const stations = [13.8, 14.0, 14.2, 14.4].map((f, i) => spike(ctx.svg, f, [90, 105, 120, 80][i], '#7a859e', fmt(f).slice(0, 5)));
        const vfo = spike(ctx.svg, FO, 175, C.violet, 'VFO', 9);
        const br = mk(ctx.svg, 'g', {}); const brl = mk(br, 'path', { fill: 'none', stroke: C.good, 'stroke-width': 4 }); const brt = text(br, 0, 0, 'ZF = 0,455', { 'text-anchor': 'middle', 'font-weight': 700, 'font-size': 22, fill: C.good });
        const out = chipBox(ctx, 'im ZF-Filter ✓', 'left:100px;top:150px;');
        return { stations, vfo, br, brl, brt, out };
      },
      update(ctx, { t, at, end, state: s }) {
        const shown = seg(t, at(0) - 0.2, at(0) + 0.6);
        s.stations.forEach(st => st.set(st.h, shown));
        // VFO: appears at 14,655; moves to 14,855 during line 2
        const mv = E.io(seg(t, at(2) + 0.4, end(2) - 0.4));
        const fo = lerp(FO, FO + 0.2, mv);
        const v = s.vfo; v.f = fo; setA(v.l, { x1: xf(fo), x2: xf(fo), y1: YB - 3, y2: YB - 178 }); setA(v.t, { x: xf(fo), y: YB - 190 }); v.g.style.opacity = seg(t, at(0) + 0.4, at(0) + 1.1);
        let best = null;
        s.stations.forEach(st => { const hit = Math.abs(fo - st.f - ZF) < 0.012; st.set(st.h, shown, hit ? C.accent : '#7a859e'); if (hit) best = st; });
        const b = seg(t, at(1) + 0.2, at(1) + 0.9);
        if (best) { const a = xf(best.f), bb = xf(fo), y = YB - 215; s.brl.setAttribute('d', `M${a} ${y - 10} V${y} H${bb} V${y - 10}`); setA(s.brt, { x: (a + bb) / 2, y: y - 18 }); opacity(s.br, b); opacity(s.out, b); s.out.firstChild.textContent = `${fmt(best.f)} MHz → ZF ✓`; }
        else { opacity(s.br, 0); opacity(s.out, 0); }
        s.out.style.left = '100px'; s.out.style.top = '150px';
      },
    },
    // ======================================================= 4 Spiegelfrequenz
    {
      id: 'spiegel', kicker: 'Empfänger', title: 'Die Spiegelfrequenz',
      lines: [
        { say: 'Doch der Mischer hat eine Falle: Es gibt zwei Frequenzen mit demselben Abstand zum Oszillator.', cap: 'Die Falle: Zwei Frequenzen haben denselben Abstand zum Oszillator.' },
        { say: 'Neben dem Nutzsignal liegt auf der anderen Seite des V F O die Spiegelfrequenz.', cap: 'Auf der anderen Seite des VFO liegt die Spiegelfrequenz.' },
        { say: 'Sie liegt um die doppelte Zwischenfrequenz höher: vierzehn Komma zwei plus null Komma neun eins gleich fünfzehn Komma eins eins Megahertz.', cap: 'f_S = f_E + 2·f_ZF = 14,200 + 0,910 = 15,110 MHz' },
        { say: 'Ein Sender dort wird genauso auf die Zwischenfrequenz gemischt und stört den Empfang.', cap: 'Ein Sender dort landet ebenfalls im ZF-Filter und stört.' },
        { say: 'Deshalb steht vor dem Mischer ein Eingangsfilter, das die Spiegelfrequenz dämpft.', cap: 'Ein Eingangsfilter vor dem Mischer dämpft die Spiegelfrequenz.' },
        { say: 'Je höher die Zwischenfrequenz, desto weiter weg liegt die Spiegelfrequenz, und desto leichter ist sie zu filtern.', cap: 'Höhere ZF → größerer Abstand der Spiegelfrequenz → leichter zu filtern.' },
      ],
      init(ctx) {
        axis(ctx.svg);
        const fe = spike(ctx.svg, FE, 130, C.accent, '14,200 Nutz'); const vfo = spike(ctx.svg, FO, 175, C.violet, 'VFO', 9);
        const img = spike(ctx.svg, FS, 130, C.reflect, '15,110 Spiegel');
        const sub = (a, b, y, col) => { const g = mk(ctx.svg, 'g', {}); mk(g, 'path', { d: `M${a} ${y - 10} V${y} H${b} V${y - 10}`, fill: 'none', stroke: col, 'stroke-width': 4 }); text(g, (a + b) / 2, y - 18, 'ZF', { 'text-anchor': 'middle', 'font-weight': 700, 'font-size': 22, fill: col }); return g; };
        const b1 = sub(xf(FE), xf(FO), YB - 225, C.good), b2 = sub(xf(FO), xf(FS), YB - 225, C.good);
        const bp = mk(ctx.svg, 'path', { fill: 'rgba(4,120,87,0.10)', stroke: C.accent, 'stroke-width': 3, 'stroke-dasharray': '9 7' });
        const bpl = text(ctx.svg, xf(FE) - 200, YB - 140, 'Eingangsfilter', { 'text-anchor': 'middle', 'font-weight': 700, 'font-size': 20, fill: C.accent });
        const eq = eqBox(ctx, 'f_S=f_E+2\\,f_{ZF}', 'left:90px;top:130px;');
        const c1 = chipBox(ctx, 'ZF 455 kHz: Abstand 910 kHz', 'left:110px;top:545px;'), c2 = chipBox(ctx, 'ZF 9 MHz: Abstand 18 MHz', 'left:640px;top:545px;');
        return { fe, vfo, img, b1, b2, bp, bpl, eq, c1, c2 };
      },
      update(ctx, { t, at, state: s }) {
        s.fe.set(130, 1); s.vfo.set(175, 1);
        opacity(s.b1, seg(t, at(0) + 0.3, at(0) + 1.0));
        const im = seg(t, at(1) - 0.1, at(1) + 0.7);
        const atten = seg(t, at(4) + 0.6, at(4) + 1.6);
        const bpv = x => Math.exp(-Math.pow((x - xf(FE)) / 105, 2));
        s.img.set(130 * (1 - 0.88 * atten), im, atten > 0.5 ? '#c9a09a' : undefined);
        opacity(s.b2, seg(t, at(1) + 0.5, at(1) + 1.2));
        s.bp.setAttribute('d', `M${xf(FE) - 330} ${YB} ` + pathFn(x => YB - 230 * bpv(x), xf(FE) - 330, xf(FE) + 330, 80).replace(/^M[^L]*/, '') + ` L${xf(FE) + 330} ${YB} Z`);
        const bo = seg(t, at(4), at(4) + 0.8); opacity(s.bp, bo); opacity(s.bpl, bo);
        opacity(s.eq, seg(t, at(2), at(2) + 0.8));
        const hot = seg(t, at(3), at(3) + 0.6) * (1 - atten); s.img.t.style.fontSize = '20px';
        s.b2.style.opacity = Math.max(0, seg(t, at(1) + 0.5, at(1) + 1.2)) ; s.img.g.style.filter = hot > 0.1 ? 'drop-shadow(0 0 6px rgba(212,81,61,0.6))' : 'none';
        opacity(s.c1, seg(t, at(5), at(5) + 0.8)); opacity(s.c2, seg(t, at(5) + 1.6, at(5) + 2.4));
        s.eq.style.left = '90px'; s.eq.style.top = '125px';
      },
    },
    // ======================================================= 5 merken
    {
      id: 'merken', kicker: 'Zum Merken', title: 'Vier Sätze zum Mitnehmen',
      lines: [
        { say: 'Zum Merken: Der Mischer setzt das Empfangssignal auf die feste Zwischenfrequenz um.', cap: 'Der Mischer setzt das Empfangssignal auf die feste Zwischenfrequenz um.' },
        { say: 'Das Filter bleibt fest, und du stimmst den Oszillator ab. Darum ist die Trennschärfe überall gleich gut.', cap: 'Filter fest, Oszillator abgestimmt – Trennschärfe überall gleich gut.' },
        { say: 'Die Spiegelfrequenz liegt auf der anderen Seite des Oszillators und muss vor dem Mischer gedämpft werden.', cap: 'Die Spiegelfrequenz muss vor dem Mischer gedämpft werden.' },
        { say: 'Die passenden Prüfungsfragen findest du in der Lektion zum Überlagerungsempfänger. Viel Erfolg beim Üben!', cap: 'Die passenden Prüfungsfragen findest du in der Lektion zum Überlagerungsempfänger.' },
      ],
      init(ctx) {
        const items = [
          ['f_{ZF}=|f_E-f_O|', 'Der Mischer setzt auf die feste ZF um'],
          ['\\text{ZF-Filter fest} \\;+\\; \\text{VFO drehen}', 'Trennschärfe hängt am ZF-Filter'],
          ['f_S=f_E+2\\,f_{ZF}', 'Spiegelfrequenz (Vertiefung)'],
          ['\\text{Eingangsfilter vor dem Mischer}', 'dämpft die Spiegelfrequenz'],
        ].map(([f, label], i) => ctx.h(`<div style="display:flex;gap:26px;align-items:center;width:1100px"><div class="chip" style="width:560px;box-sizing:border-box;text-align:center;font-size:28px;padding:8px 20px">${ctx.tex(f)}</div><div style="font-size:26px;font-weight:600;color:#3b3b55">${label}</div></div>`, `left:90px;top:${150 + i * 110}px;`));
        return { items };
      },
      update(ctx, { t, at, state: s }) {
        const starts = [at(0) + 0.2, at(1) + 0.1, at(2) + 0.1, at(2) + 2.4];
        s.items.forEach((n, i) => { const v = seg(t, starts[i], starts[i] + 0.7, E.out); opacity(n, v); n.style.transform = `translateX(${(1 - v) * 40}px)`; });
      },
    },
  ],
});
