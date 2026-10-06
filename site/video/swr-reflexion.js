// Explainer video: "Reflexion, Stehwellen und SWR" (Amateurfunk Klasse E, Antennen und Leitungen).
// All motion is computed from the formulas (image method for pulses, complex envelope for the standing wave).
// `say` = spoken text (units/symbols spelled out), `cap` = caption on screen.
import { defineVideo, E, seg, win, clamp, lerp, COLORS as C, pathFn, setA, text } from './engine.js';

const X0 = 210, X1 = 1010, LAM = 200, F = 0.6;        // line start/end (px), wavelength (px), animation frequency (Hz)
const K = 2 * Math.PI / LAM, OM = 2 * Math.PI * F;
const Z0 = 50;

// ---------- small drawing helpers ----------
function transmitter(svg, y) {
  const g = setA(svg.ownerDocument.createElementNS('http://www.w3.org/2000/svg', 'g'), {}); svg.append(g);
  setA(g.appendChild(svg.ownerDocument.createElementNS('http://www.w3.org/2000/svg', 'rect')), { x: 70, y: y - 46, width: 110, height: 92, rx: 14, fill: '#fff', stroke: C.ink, 'stroke-width': 2.5 });
  text(g, 125, y + 8, 'Sender', { 'text-anchor': 'middle', 'font-weight': 600, 'font-size': 22 });
  text(g, 125, y - 16, '∿', { 'text-anchor': 'middle', 'font-size': 26, fill: C.accent });
  return g;
}
function cable(svg, y, x0 = 180, x1 = X1) {
  const el = (t, a) => setA(svg.ownerDocument.createElementNS('http://www.w3.org/2000/svg', t), a);
  svg.append(el('rect', { x: x0, y: y - 9, width: x1 - x0, height: 18, rx: 9, fill: '#e3e6ee' }));
  svg.append(el('line', { x1: x0 + 8, y1: y, x2: x1 - 8, y2: y, stroke: '#b8bfce', 'stroke-width': 2 }));
}
function antenna(svg, x, y) {
  const el = (t, a, p = svg) => { const n = setA(svg.ownerDocument.createElementNS('http://www.w3.org/2000/svg', t), a); p.append(n); return n; };
  const g = el('g', {});
  el('line', { x1: x, y1: y, x2: x + 38, y2: y, stroke: C.ink, 'stroke-width': 3 }, g);
  el('line', { x1: x + 38, y1: y + 70, x2: x + 38, y2: y - 40, stroke: C.ink, 'stroke-width': 4, 'stroke-linecap': 'round' }, g);
  el('line', { x1: x + 38, y1: y - 40, x2: x + 8, y2: y - 88, stroke: C.ink, 'stroke-width': 4, 'stroke-linecap': 'round' }, g);
  el('line', { x1: x + 38, y1: y - 40, x2: x + 68, y2: y - 88, stroke: C.ink, 'stroke-width': 4, 'stroke-linecap': 'round' }, g);
  text(g, x + 38, y + 108, 'Antenne', { 'text-anchor': 'middle', 'font-weight': 600, 'font-size': 20, fill: C.ink2 });
  return g;
}
function loadBox(svg, x, y, label) {
  const g = svg.ownerDocument.createElementNS('http://www.w3.org/2000/svg', 'g'); svg.append(g);
  const mk = (t, a) => { const n = setA(svg.ownerDocument.createElementNS('http://www.w3.org/2000/svg', t), a); g.append(n); return n; };
  mk('line', { x1: x, y1: y, x2: x + 26, y2: y, stroke: C.ink, 'stroke-width': 3 });
  mk('rect', { x: x + 26, y: y - 20, width: 58, height: 40, fill: '#fff', stroke: C.ink, 'stroke-width': 3 });
  mk('line', { x1: x + 84, y1: y, x2: x + 110, y2: y, stroke: C.ink, 'stroke-width': 3 });
  mk('line', { x1: x + 110, y1: y, x2: x + 110, y2: y + 30, stroke: C.ink, 'stroke-width': 3 });
  for (let i = 0; i < 3; i++) mk('line', { x1: x + 98 + i * 6, y1: y + 30 + i * 6, x2: x + 122 - i * 6, y2: y + 30 + i * 6, stroke: C.ink, 'stroke-width': 3 });
  const t = text(g, x + 55, y - 32, label, { 'text-anchor': 'middle', 'font-weight': 700, 'font-size': 22, fill: C.ink });
  return { g, t };
}
const opacity = (n, v) => { n.style.opacity = v; };
const eqBox = (ctx, tex, style, disp = true) => ctx.h(`<div class="eq">${ctx.tex(tex, disp)}</div>`, style);
const subTxt = (el, base, sub, rest = '') => { el.textContent = ''; const a = document.createElementNS('http://www.w3.org/2000/svg', 'tspan'); a.textContent = base; const b = document.createElementNS('http://www.w3.org/2000/svg', 'tspan'); b.textContent = sub; b.setAttribute('dy', '6'); b.setAttribute('font-size', '15'); el.append(a, b); if (rest) { const c = document.createElementNS('http://www.w3.org/2000/svg', 'tspan'); c.textContent = rest; c.setAttribute('dy', '-6'); el.append(c); } return el; };
const chipBox = (ctx, html, style) => ctx.h(`<span class="chip">${html}</span>`, style);

// time-harmonic fields on the line
const fwd = (x, t, A = 1) => A * Math.sin(K * (x - X0) - OM * t);
const refl = (x, t, G, A = 1) => G * A * Math.sin(K * (2 * (X1 - X0) - (x - X0)) - OM * t);
const envelope = (x, G) => Math.sqrt(1 + G * G + 2 * G * Math.cos(2 * K * (X1 - x)));

export default defineVideo({
  id: 'swr-reflexion',
  out: 'swr-reflexion',
  brand: 'Learning · Amateurfunk',
  poster: 3.2,
  scenes: [
    // ======================================================= 1 intro
    {
      id: 'intro', kicker: 'Leitungen und Anpassung', title: 'Warum Leistung zurückläuft',
      lines: [
        { say: 'Dein Sender schickt Leistung über ein Koaxkabel zur Antenne.', cap: 'Dein Sender schickt Leistung über ein Koaxkabel zur Antenne.' },
        { say: 'Passt alles zusammen, kommt sie dort vollständig an und wird abgestrahlt.', cap: 'Passt alles zusammen, kommt sie dort vollständig an und wird abgestrahlt.' },
        { say: 'Passt etwas nicht, läuft ein Teil der Leistung zurück.', cap: 'Passt etwas nicht, läuft ein Teil der Leistung zurück.' },
        { say: 'Wie das genau passiert und was das S W R damit zu tun hat, siehst du jetzt.', cap: 'Wie das genau passiert und was das SWR damit zu tun hat, siehst du jetzt.' },
      ],
      init(ctx) {
        const Y = 350; transmitter(ctx.svg, Y); cable(ctx.svg, Y); antenna(ctx.svg, X1, Y);
        const fw = ctx.el('path', { fill: 'none', stroke: C.forward, 'stroke-width': 4, 'stroke-linecap': 'round' }, ctx.svg);
        const rf = ctx.el('path', { fill: 'none', stroke: C.reflect, 'stroke-width': 4, 'stroke-linecap': 'round' }, ctx.svg);
        const arcs = [0, 1, 2].map(() => ctx.el('path', { fill: 'none', stroke: C.accent, 'stroke-width': 3, 'stroke-linecap': 'round' }, ctx.svg));
        const lab = text(ctx.svg, 600, 470, 'hinlaufende Welle →', { 'text-anchor': 'middle', 'font-weight': 600, 'font-size': 22, fill: C.forward });
        const lab2 = text(ctx.svg, 600, 550, '← zurücklaufende Welle', { 'text-anchor': 'middle', 'font-weight': 600, 'font-size': 22, fill: C.reflect });
        return { Y, fw, rf, arcs, lab, lab2 };
      },
      update(ctx, { t, at, state: s }) {
        const a0 = seg(t, at(0) - 0.2, at(0) + 0.8);
        s.fw.setAttribute('d', pathFn(x => s.Y - 40 * a0 * Math.sin(K * (x - X0) - OM * t), X0 + 10, X1 - 6, 200));
        opacity(s.lab, seg(t, at(0) + 0.5, at(0) + 1.2));
        const rad = seg(t, at(1), at(1) + 0.6);
        s.arcs.forEach((p, i) => {
          const ph = ((t * 0.7 + i / 3) % 1), r = 30 + ph * 110;
          const ax = X1 + 86, ay = s.Y;
          p.setAttribute('d', `M${ax + r * Math.cos(-0.9)} ${ay + r * Math.sin(-0.9)} A${r} ${r} 0 0 1 ${ax + r * Math.cos(0.9)} ${ay + r * Math.sin(0.9)}`);
          opacity(p, rad * (1 - ph) * 0.9);
        });
        const back = seg(t, at(2), at(2) + 0.8);
        s.rf.setAttribute('d', pathFn(x => s.Y + 120 - 26 * back * Math.sin(-K * (x - X0) - OM * t + 2.1), X0 + 10, X1 - 6, 200));
        opacity(s.rf, back); opacity(s.lab2, back);
        s.lab.setAttribute('y', 470 - 0); s.lab2.setAttribute('y', 540);
        s.fw.style.opacity = a0;
      },
    },
    // ======================================================= 2 Wellenwiderstand
    {
      id: 'z0', kicker: 'Leitungen und Anpassung', title: 'Das Kabel hat einen Wellenwiderstand',
      lines: [
        { say: 'Eine Welle auf dem Kabel sieht an jeder Stelle denselben Widerstand: den Wellenwiderstand.', cap: 'Eine Welle auf dem Kabel sieht an jeder Stelle denselben Widerstand: den Wellenwiderstand.' },
        { say: 'Er ist das feste Verhältnis von Spannung zu Strom der laufenden Welle, bei Koaxkabeln meist fünfzig Ohm.', cap: 'Er ist das feste Verhältnis von Spannung zu Strom der laufenden Welle, bei Koaxkabeln meist 50 Ω.' },
        { say: 'Er hat nichts mit der Länge zu tun, und mit einem Ohmmeter kannst du ihn nicht messen.', cap: 'Er hat nichts mit der Länge zu tun – und ein Ohmmeter misst ihn nicht.' },
        { say: 'Schließt du die Leitung mit einem Widerstand von ebenfalls fünfzig Ohm ab, verschwindet die Welle dort vollständig. Es gibt keine Reflexion.', cap: 'Abschluss mit 50 Ω = Z₀: Die Welle verschwindet vollständig. Keine Reflexion.' },
      ],
      init(ctx) {
        const Y = 330; cable(ctx.svg, Y, 150, X1); const ld = loadBox(ctx.svg, X1, Y, '50 Ω');
        const u = ctx.el('path', { fill: 'none', stroke: C.forward, 'stroke-width': 4, 'stroke-linecap': 'round' }, ctx.svg);
        const i = ctx.el('path', { fill: 'none', stroke: C.warn, 'stroke-width': 4, 'stroke-linecap': 'round' }, ctx.svg);
        const lu = text(ctx.svg, 160, 168, 'Spannung U', { 'font-weight': 700, 'font-size': 21, fill: C.forward });
        const li = text(ctx.svg, 160, 510, 'Strom I', { 'font-weight': 700, 'font-size': 21, fill: C.warn });
        const eq = eqBox(ctx, 'Z_0=\\frac{U}{I}=50\\,\\Omega', 'left:420px;top:456px;');
        const note = chipBox(ctx, 'nicht mit dem Ohmmeter messbar', 'left:700px;top:520px;');
        const glow = ctx.el('circle', { cx: X1 + 40, cy: Y, r: 40, fill: C.good, opacity: 0 }, ctx.svg);
        const ok = chipBox(ctx, '✓ alles absorbiert', 'left:880px;top:470px;');
        return { Y, u, i, lu, li, eq, note, glow, ok, ld };
      },
      update(ctx, { t, at, state: s }) {
        const on = seg(t, at(0), at(0) + 0.8);
        const Yu = 245, Yi = 440;
        s.u.setAttribute('d', pathFn(x => Yu - 46 * on * Math.sin(K * (x - X0) - OM * t), 160, X1, 220));
        s.i.setAttribute('d', pathFn(x => Yi - 30 * on * Math.sin(K * (x - X0) - OM * t), 160, X1, 220));
        s.u.style.opacity = s.i.style.opacity = on; opacity(s.lu, on); opacity(s.li, on);
        s.u.setAttribute('transform', 'translate(0 0)');
        opacity(s.eq, seg(t, at(1) + 0.6, at(1) + 1.4)); s.eq.style.left = '410px'; s.eq.style.top = '500px';
        opacity(s.note, seg(t, at(2) + 0.3, at(2) + 1)); s.note.style.top = '545px';
        const ab = seg(t, at(3), at(3) + 0.8);
        opacity(s.ld.g, 1);
        s.glow.setAttribute('opacity', ab * (0.18 + 0.12 * Math.sin(OM * t * 2)));
        opacity(s.ok, ab);
      },
    },
    // ======================================================= 3 Reflexion am Leitungsende
    {
      id: 'ende', kicker: 'Reflexion', title: 'Am Leitungsende kehrt die Welle um',
      lines: [
        { say: 'Am offenen Ende kann kein Strom fließen.', cap: 'Am offenen Ende kann kein Strom fließen.' },
        { say: 'Die Welle muss umkehren: Sie wird reflektiert.', cap: 'Die Welle muss umkehren: Sie wird reflektiert.' },
        { say: 'Die Spannung kommt mit gleichem Vorzeichen zurück, der Strom mit umgekehrtem.', cap: 'Spannung: gleiches Vorzeichen – Strom: umgekehrtes Vorzeichen.' },
        { say: 'Beim Kurzschluss ist es genau umgekehrt: Die Spannung kehrt ihr Vorzeichen um, der Strom nicht.', cap: 'Kurzschluss: Spannung kehrt um – Strom bleibt.' },
      ],
      init(ctx) {
        const Yu = 270, Yi = 470;
        for (const y of [Yu, Yi]) ctx.el('line', { x1: X0 - 20, y1: y, x2: X1, y2: y, stroke: '#b8bfce', 'stroke-width': 3 }, ctx.svg);
        text(ctx.svg, 80, Yu - 60, 'Spannung U', { 'font-weight': 700, 'font-size': 21, fill: C.forward });
        text(ctx.svg, 80, Yi - 60, 'Strom I', { 'font-weight': 700, 'font-size': 21, fill: C.warn });
        const pu = ctx.el('path', { fill: 'none', stroke: C.forward, 'stroke-width': 4.5, 'stroke-linejoin': 'round' }, ctx.svg);
        const pi = ctx.el('path', { fill: 'none', stroke: C.warn, 'stroke-width': 4.5, 'stroke-linejoin': 'round' }, ctx.svg);
        const endOpen = ctx.el('g', {}, ctx.svg);
        ctx.el('line', { x1: X1, y1: Yu, x2: X1 + 18, y2: Yu, stroke: C.ink, 'stroke-width': 3 }, endOpen);
        const endShort = ctx.el('g', {}, ctx.svg);
        ctx.el('line', { x1: X1, y1: Yu - 40, x2: X1, y2: Yu + 40, stroke: C.ink, 'stroke-width': 9, 'stroke-linecap': 'round' }, endShort);
        ctx.el('line', { x1: X1, y1: Yi - 40, x2: X1, y2: Yi + 40, stroke: C.ink, 'stroke-width': 9, 'stroke-linecap': 'round' }, endShort);
        const eo = ctx.el('g', {}, ctx.svg);
        ctx.el('circle', { cx: X1 + 6, cy: Yu, r: 6, fill: '#fff', stroke: C.ink, 'stroke-width': 3 }, eo);
        ctx.el('circle', { cx: X1 + 6, cy: Yi, r: 6, fill: '#fff', stroke: C.ink, 'stroke-width': 3 }, eo);
        const tag = text(ctx.svg, X1 + 30, 190, '', { 'font-weight': 700, 'font-size': 26, 'text-anchor': 'end' });
        const gam = eqBox(ctx, '\\Gamma=+1', 'left:1020px;top:150px;');
        const noteU = chipBox(ctx, 'U: gleiches Vorzeichen', 'left:330px;top:560px;');
        const noteI = chipBox(ctx, 'I: umgekehrtes Vorzeichen', 'left:640px;top:560px;');
        return { Yu, Yi, pu, pi, endShort, eo, tag, gam, noteU, noteI };
      },
      update(ctx, { t, at, end, state: s }) {
        const short = t >= at(3) - 0.15;
        const sU = short ? -1 : 1, sI = -sU;
        const tA = short ? at(3) + 0.5 : at(0) + 0.3;
        const V = (X1 - X0) / 2.4;               // px/s: the pulse crosses the line in 2.4 s
        const xStart = X0 - 130, xEnd = 2 * X1 - (X0 - 150);   // until the reflected pulse has left the line again
        const P = (xEnd - xStart) / V + 0.8;      // repeat period: there, back, short pause
        const tt = (t - tA) % P;
        const xf = xStart + V * tt;               // incident pulse centre (continues virtually beyond the end)
        const xr = 2 * X1 - xf;
        const g = x => Math.exp(-Math.pow(x / 44, 2));
        const live = t >= tA - 0.1 && xf < xEnd;
        const A = 92, A2 = 64;
        const fU = x => s.Yu - A * (g(x - xf) + sU * g(x - xr)) * (live ? 1 : 0);
        const fI = x => s.Yi - A2 * (g(x - xf) + sI * g(x - xr)) * (live ? 1 : 0);
        s.pu.setAttribute('d', pathFn(fU, X0 - 20, X1, 260)); s.pi.setAttribute('d', pathFn(fI, X0 - 20, X1, 260));
        opacity(s.endShort, short ? 1 : 0); opacity(s.eo, short ? 0 : 1);
        s.tag.textContent = short ? 'Kurzschluss' : 'offenes Ende'; s.tag.setAttribute('x', X1 - 10); s.tag.setAttribute('y', 175);
        s.tag.setAttribute('fill', short ? C.reflect : C.accent);
        opacity(s.gam, 1); s.gam.firstChild.innerHTML = ctx.tex(short ? '\\Gamma=-1' : '\\Gamma=+1');
        s.gam.style.left = '1040px'; s.gam.style.top = '190px';
        opacity(s.noteU, seg(t, at(2), at(2) + 0.6) * (short ? 0 : 1)); opacity(s.noteI, seg(t, at(2) + 0.7, at(2) + 1.3) * (short ? 0 : 1));
        s.noteU.firstChild.textContent = short ? 'U: Vorzeichen kehrt um' : 'U: gleiches Vorzeichen';
      },
    },
    // ======================================================= 4 Reflexionsfaktor
    {
      id: 'gamma', kicker: 'Reflexion', title: 'Der Reflexionsfaktor Γ',
      lines: [
        { say: 'Dazwischen liegt der Normalfall: ein Abschluss, der weder offen noch kurzgeschlossen ist.', cap: 'Dazwischen liegt der Normalfall: weder offen noch kurzgeschlossen.' },
        { say: 'Der Reflexionsfaktor Gamma sagt, welcher Anteil der Spannung zurückkommt.', cap: 'Der Reflexionsfaktor Γ sagt, welcher Anteil der Spannung zurückkommt.' },
        { say: 'Gamma ist gleich R L minus Z null, geteilt durch R L plus Z null.', cap: 'Γ = (R_L − Z₀) / (R_L + Z₀)' },
        { say: 'Bei fünfzig Ohm ist Gamma null: Nichts wird reflektiert.', cap: 'R_L = 50 Ω:  Γ = 0 – nichts wird reflektiert.' },
        { say: 'Bei hundert Ohm ist es plus ein Drittel, bei fünfundzwanzig Ohm minus ein Drittel.', cap: 'R_L = 100 Ω: Γ = +1/3     R_L = 25 Ω: Γ = −1/3' },
        { say: 'Das Vorzeichen zeigt nur die Phase der zurückkommenden Spannung. Für das S W R zählt allein der Betrag.', cap: 'Das Vorzeichen zeigt nur die Phase. Für das SWR zählt der Betrag |Γ|.' },
      ],
      init(ctx) {
        const eq = eqBox(ctx, '\\Gamma=\\frac{R_L-Z_0}{R_L+Z_0}', 'left:420px;top:150px;');
        const SX0 = 240, SX1 = 1040, SY = 470;
        ctx.el('line', { x1: SX0, y1: SY, x2: SX1, y2: SY, stroke: C.ink2, 'stroke-width': 4, 'stroke-linecap': 'round' }, ctx.svg);
        [-1, -0.5, 0, 0.5, 1].forEach(v => {
          const x = lerp(SX0, SX1, (v + 1) / 2);
          ctx.el('line', { x1: x, y1: SY - 10, x2: x, y2: SY + 10, stroke: C.ink2, 'stroke-width': 3 }, ctx.svg);
          text(ctx.svg, x, SY + 42, v > 0 ? '+' + v : String(v).replace('-', '−'), { 'text-anchor': 'middle', 'font-size': 22, fill: C.ink2, 'font-weight': 600 });
        });
        text(ctx.svg, SX0 - 20, SY - 22, 'Kurzschluss', { 'text-anchor': 'middle', 'font-size': 19, fill: C.muted, 'font-weight': 600 });
        text(ctx.svg, SX1 + 20, SY - 22, 'offen', { 'text-anchor': 'middle', 'font-size': 19, fill: C.muted, 'font-weight': 600 });
        const mk = ctx.el('g', {}, ctx.svg);
        ctx.el('path', { d: 'M0 -2 L-13 -30 L13 -30 Z', fill: C.accent }, mk);
        const rl = text(ctx.svg, 0, 0, '', { 'text-anchor': 'middle', 'font-size': 26, 'font-weight': 700, fill: C.accent });
        const gv = ctx.h('<div class="eq">Γ = 0</div>', 'left:0;top:0;');
        const lab = text(ctx.svg, (SX0 + SX1) / 2, SY + 92, 'Γ', { 'text-anchor': 'middle', 'font-size': 20, fill: C.muted, 'font-weight': 600 });
        lab.textContent = 'Reflexionsfaktor Γ (bei reellem Abschluss)';
        return { SX0, SX1, SY, eq, mk, rl, gv };
      },
      update(ctx, { t, at, state: s }) {
        opacity(s.eq, seg(t, at(2) - 0.3, at(2) + 0.7));
        s.eq.style.left = '420px'; s.eq.style.top = '170px';
        const key = [[0, 0], [at(3) - 0.4, 0], [at(3) + 0.6, 0], [at(4) + 0.2, 0], [at(4) + 1.6, 1 / 3], [at(4) + 3.6, 1 / 3], [at(4) + 5.0, -1 / 3], [at(5), -1 / 3], [at(5) + 1.5, 0.6], [at(5) + 3.5, 0.6]];
        let G = 0;
        for (let i = 0; i < key.length - 1; i++) if (t >= key[i][0] && t <= key[i + 1][0]) G = lerp(key[i][1], key[i + 1][1], E.io(clamp((t - key[i][0]) / Math.max(1e-6, key[i + 1][0] - key[i][0]))));
        if (t > key[key.length - 1][0]) G = key[key.length - 1][1];
        const x = lerp(s.SX0, s.SX1, (G + 1) / 2);
        const show = seg(t, at(3) - 0.5, at(3) + 0.3);
        s.mk.setAttribute('transform', `translate(${x} ${s.SY - 4})`); opacity(s.mk, show);
        const RL = Math.abs(G) > 0.985 ? '' : (Z0 * (1 + G) / (1 - G));
        s.rl.setAttribute('x', x); s.rl.setAttribute('y', s.SY - 52);
        if (RL === '') s.rl.textContent = ''; else subTxt(s.rl, 'R', 'L', ` = ${Math.round(RL)} Ω`); opacity(s.rl, show);
        const gs = (G >= 0 ? '+' : '−') + Math.abs(G).toFixed(2).replace('.', ',');
        s.gv.firstChild ? 0 : 0; s.gv.innerHTML = `Γ = ${gs}`;
        s.gv.style.left = '470px'; s.gv.style.top = '285px'; s.gv.style.fontSize = '44px'; s.gv.style.fontFamily = "'Instrument Serif', serif"; opacity(s.gv, show);
      },
    },
    // ======================================================= 5 stehende Welle
    {
      id: 'stehend', kicker: 'Reflexion', title: 'Hin- und Rücklauf überlagern sich',
      lines: [
        { say: 'Läuft eine Welle hin und eine zurück, überlagern sie sich.', cap: 'Läuft eine Welle hin und eine zurück, überlagern sie sich.' },
        { say: 'An manchen Stellen addieren sich die Spannungen, an anderen löschen sie sich teilweise aus.', cap: 'Manche Stellen: Spannungen addieren sich – andere: sie löschen sich teilweise aus.' },
        { say: 'Das Ergebnis ist ein Muster, das an seinem Ort stehen bleibt: die stehende Welle.', cap: 'Ergebnis: ein Muster, das an seinem Ort stehen bleibt – die stehende Welle.' },
        { say: 'Je größer die Fehlanpassung, desto höher die Berge und desto tiefer die Täler.', cap: 'Je größer die Fehlanpassung, desto höher die Berge – desto tiefer die Täler.' },
        { say: 'Im Extremfall, am offenen Ende, löscht sich die Spannung an den Knoten ganz aus.', cap: 'Extremfall (offenes Ende, |Γ| = 1): An den Knoten ist die Spannung null.' },
      ],
      init(ctx) {
        const Ya = 250, Yb = 470;
        [Ya, Yb].forEach(y => ctx.el('line', { x1: X0 - 10, y1: y, x2: X1, y2: y, stroke: '#cfd4e0', 'stroke-width': 2 }, ctx.svg));
        text(ctx.svg, X0 - 10, Ya - 78, 'hinlaufend', { 'font-weight': 700, 'font-size': 20, fill: C.forward });
        text(ctx.svg, X0 + 130, Ya - 78, 'rücklaufend', { 'font-weight': 700, 'font-size': 20, fill: C.reflect });
        text(ctx.svg, X0 - 10, Yb - 118, 'Summe (was man misst)', { 'font-weight': 700, 'font-size': 20, fill: C.ink });
        const ef = ctx.el('path', { fill: 'none', stroke: C.forward, 'stroke-width': 3.5 }, ctx.svg);
        const er = ctx.el('path', { fill: 'none', stroke: C.reflect, 'stroke-width': 3.5 }, ctx.svg);
        const envU = ctx.el('path', { fill: 'none', stroke: C.muted, 'stroke-width': 2.5, 'stroke-dasharray': '7 6' }, ctx.svg);
        const envL = ctx.el('path', { fill: 'none', stroke: C.muted, 'stroke-width': 2.5, 'stroke-dasharray': '7 6' }, ctx.svg);
        const sum = ctx.el('path', { fill: 'none', stroke: C.ink, 'stroke-width': 4.5, 'stroke-linejoin': 'round' }, ctx.svg);
        const umax = ctx.el('g', {}, ctx.svg), umin = ctx.el('g', {}, ctx.svg);
        subTxt(text(umax, 0, 0, '', { 'font-weight': 700, 'font-size': 22, fill: C.reflect, 'text-anchor': 'middle' }), 'U', 'max');
        subTxt(text(umin, 0, 0, '', { 'font-weight': 700, 'font-size': 22, fill: C.good, 'text-anchor': 'middle' }), 'U', 'min');
        const gam = ctx.h('<div class="eq" style="font-size:30px"></div>', 'left:1010px;top:520px;');
        return { Ya, Yb, ef, er, envU, envL, sum, umax, umin, gam };
      },
      update(ctx, { t, at, state: s }) {
        const G = (() => {
          const k = [[0, 0], [at(1), 0], [at(1) + 2.0, 1 / 3], [at(3), 1 / 3], [at(3) + 2.2, 0.8], [at(4), 0.8], [at(4) + 2.0, 1]];
          let g = 0; for (let i = 0; i < k.length - 1; i++) if (t >= k[i][0] && t <= k[i + 1][0]) g = lerp(k[i][1], k[i + 1][1], E.io(clamp((t - k[i][0]) / Math.max(1e-6, k[i + 1][0] - k[i][0]))));
          return t > k[k.length - 1][0] ? 1 : g;
        })();
        const show = seg(t, at(0) - 0.1, at(0) + 0.8);
        const A = 50, Ya = s.Ya, Yb = s.Yb, B = 62;
        s.ef.setAttribute('d', pathFn(x => Ya - A * show * fwd(x, t), X0, X1, 260));
        s.er.setAttribute('d', pathFn(x => Ya - A * show * refl(x, t, G), X0, X1, 260));
        opacity(s.er, G > 0.001 ? 1 : 0);
        s.sum.setAttribute('d', pathFn(x => Yb - B * show * (fwd(x, t) + refl(x, t, G)), X0, X1, 360));
        const envOn = seg(t, at(2) - 0.2, at(2) + 0.8);
        s.envU.setAttribute('d', pathFn(x => Yb - B * envelope(x, G), X0, X1, 360)); s.envL.setAttribute('d', pathFn(x => Yb + B * envelope(x, G), X0, X1, 360));
        opacity(s.envU, envOn); opacity(s.envL, envOn);
        // markers at the last maximum (load) and the neighbouring minimum (λ/4 away)
        const xMax = X1 - LAM / 2, xMin = X1 - LAM / 4 - LAM / 2;
        s.umax.setAttribute('transform', `translate(${xMax} ${Yb - B * (1 + G) - 14})`); s.umin.setAttribute('transform', `translate(${xMin} ${Yb + B * (1 - G) + 32})`);
        opacity(s.umax, envOn * (G > 0.05 ? 1 : 0)); opacity(s.umin, envOn * (G > 0.05 ? 1 : 0));
        s.gam.innerHTML = ctx.tex(`|\\Gamma|=${G.toFixed(2).replace('.', ',')}`); opacity(s.gam, seg(t, at(1), at(1) + 0.6));
        s.gam.style.left = '1010px'; s.gam.style.top = '575px';
      },
    },
    // ======================================================= 6 SWR
    {
      id: 'swr', kicker: 'Das Stehwellenverhältnis', title: 'SWR: Maximum durch Minimum',
      lines: [
        { say: 'Das Stehwellenverhältnis, kurz S W R, ist das Verhältnis von größter zu kleinster Spannung auf der Leitung.', cap: 'Das Stehwellenverhältnis (SWR) = größte Spannung geteilt durch kleinste Spannung.' },
        { say: 'Es ist immer größer oder gleich eins. Eins bedeutet: perfekt angepasst.', cap: 'Immer ≥ 1.   SWR = 1 bedeutet: perfekt angepasst.' },
        { say: 'Mit dem Reflexionsfaktor ergibt sich S gleich eins plus Betrag Gamma, geteilt durch eins minus Betrag Gamma.', cap: 'S = (1 + |Γ|) / (1 − |Γ|)' },
        { say: 'Bei Gamma gleich ein Drittel ist das vier Drittel durch zwei Drittel, also genau zwei.', cap: 'Γ = 1/3:  S = (4/3) / (2/3) = 2' },
        { say: 'Bei einem rein ohmschen Abschluss geht es noch einfacher: Du teilst den größeren Widerstand durch den kleineren.', cap: 'Rein ohmscher Abschluss: größerer Widerstand ÷ kleinerer Widerstand.' },
        { say: 'Hundert durch fünfzig oder fünfzig durch fünfundzwanzig ergibt in beiden Fällen zwei.', cap: '100 Ω / 50 Ω = 2  und  50 Ω / 25 Ω = 2' },
      ],
      init(ctx) {
        const Yb = 330, B = 70;
        ctx.el('line', { x1: X0 - 10, y1: Yb, x2: X1, y2: Yb, stroke: '#cfd4e0', 'stroke-width': 2 }, ctx.svg);
        const envU = ctx.el('path', { fill: 'none', stroke: C.ink, 'stroke-width': 4 }, ctx.svg);
        const envL = ctx.el('path', { fill: 'none', stroke: C.ink, 'stroke-width': 4 }, ctx.svg);
        const bar = ctx.el('g', {}, ctx.svg);
        const bmax = ctx.el('line', { stroke: C.reflect, 'stroke-width': 7, 'stroke-linecap': 'round' }, bar);
        const bmin = ctx.el('line', { stroke: C.good, 'stroke-width': 7, 'stroke-linecap': 'round' }, bar);
        const lmax = subTxt(text(ctx.svg, 0, 0, '', { 'font-weight': 700, 'font-size': 22, fill: C.reflect }), 'U', 'max', ' = 1,33 U');
        const lmin = subTxt(text(ctx.svg, 0, 0, '', { 'font-weight': 700, 'font-size': 22, fill: C.good }), 'U', 'min', ' = 0,67 U');
        const f1 = eqBox(ctx, 'S=\\frac{U_{max}}{U_{min}}', 'left:90px;top:470px;');
        const f2 = eqBox(ctx, 'S=\\frac{1+|\\Gamma|}{1-|\\Gamma|}', 'left:370px;top:470px;');
        const f3 = eqBox(ctx, '\\frac{1+\\frac13}{1-\\frac13}=2', 'left:690px;top:455px;');
        const f4 = ctx.h(`<div class="eq" style="font-size:30px">${ctx.tex('S=\\frac{R_{groß}}{R_{klein}}\\quad\\frac{100}{50}=\\frac{50}{25}=2')}</div>`, 'left:690px;top:540px;');
        const one = chipBox(ctx, 'S = 1 → perfekt', 'left:960px;top:200px;');
        return { Yb, B, envU, envL, bmax, bmin, lmax, lmin, f1, f2, f3, f4, one };
      },
      update(ctx, { t, at, state: s }) {
        const G = 1 / 3, show = seg(t, at(0) - 0.1, at(0) + 0.9), { Yb, B } = s;
        s.envU.setAttribute('d', pathFn(x => Yb - B * show * envelope(x, G), X0, X1, 360)); s.envL.setAttribute('d', pathFn(x => Yb + B * show * envelope(x, G), X0, X1, 360));
        const xm = 1050, y1 = Yb - B * (1 + G), y2 = Yb - B * (1 - G);
        setA(s.bmax, { x1: xm, x2: xm, y1: Yb, y2: y1 }); setA(s.bmin, { x1: xm + 26, x2: xm + 26, y1: Yb, y2: y2 });
        const bo = seg(t, at(0) + 1.4, at(0) + 2.4); opacity(s.bmax, bo); opacity(s.bmin, bo);
        setA(s.lmax, { x: xm + 50, y: y1 + 8 }); setA(s.lmin, { x: xm + 50, y: y2 + 8 }); opacity(s.lmax, bo); opacity(s.lmin, bo);
        opacity(s.f1, seg(t, at(0) + 1.5, at(0) + 2.4)); opacity(s.f2, seg(t, at(2), at(2) + 0.8));
        opacity(s.f3, seg(t, at(3), at(3) + 0.8)); opacity(s.f4, seg(t, at(5) - 0.2, at(5) + 0.8) * 1);
        s.f4.style.top = '570px'; s.f3.style.top = '478px'; s.f3.style.left = '690px'; s.f1.style.top = '478px'; s.f2.style.top = '478px';
        opacity(s.one, seg(t, at(1) + 0.4, at(1) + 1.2)); s.one.style.left = '860px'; s.one.style.top = '130px';
      },
    },
    // ======================================================= 7 Leistung
    {
      id: 'leistung', kicker: 'Was kommt zurück?', title: 'Zurücklaufende Leistung',
      lines: [
        { say: 'Wie viel Leistung läuft zurück?', cap: 'Wie viel Leistung läuft zurück?' },
        { say: 'Die reflektierte Leistung verhält sich zur hinlaufenden wie Gamma zum Quadrat.', cap: 'P_rück / P_hin = Γ²' },
        { say: 'Bei einem S W R von zwei sind das elf Prozent: Von hundert Watt gehen neunundachtzig in die Antenne, elf laufen zurück.', cap: 'SWR 2: Γ = 1/3 → 11 % kommen zurück: 89 W in die Antenne, 11 W zurück.' },
        { say: 'Bei drei ist es schon ein Viertel, bei fünf fast die Hälfte.', cap: 'SWR 3: 25 %      SWR 5: 44 %' },
        { say: 'Die Leistung ist nicht einfach verschwunden: Sie kommt am Sender an, und moderne Geräte regeln dann herunter, um die Endstufe zu schützen.', cap: 'Die Leistung kommt am Sender an – moderne Geräte regeln dann herunter, um die Endstufe zu schützen.' },
      ],
      init(ctx) {
        const eq = eqBox(ctx, '\\frac{P_{r\\ddot uck}}{P_{hin}}=|\\Gamma|^2', 'left:400px;top:110px;');
        const bars = [1.5, 2, 3, 5].map((sw, i) => {
          const G = (sw - 1) / (sw + 1), x = 250 + i * 190;
          const base = ctx.el('rect', { x, y: 270, width: 120, height: 220, rx: 10, fill: '#fff', stroke: C.line, 'stroke-width': 2 }, ctx.svg);
          const good = ctx.el('rect', { x: x + 4, width: 112, rx: 7, fill: C.good, opacity: 0.85 }, ctx.svg);
          const bad = ctx.el('rect', { x: x + 4, width: 112, rx: 7, fill: C.reflect, opacity: 0.9 }, ctx.svg);
          const l1 = text(ctx.svg, x + 60, 255, `SWR ${String(sw).replace('.', ',')}`, { 'text-anchor': 'middle', 'font-weight': 700, 'font-size': 22 });
          const l2 = text(ctx.svg, x + 60, 525, `${(G * G * 100).toFixed(G * G < 0.1 ? 0 : 0)} %`, { 'text-anchor': 'middle', 'font-weight': 700, 'font-size': 26, fill: C.reflect });
          return { G, x, good, bad, l1, l2, base };
        });
        const cap = ctx.h('<div style="font-size:21px;color:#3b3b55;font-weight:600">Anteil der zurücklaufenden Leistung</div>', 'left:250px;top:560px;');
        const w = ctx.h('<div class="eq" style="font-size:28px">100 W → <span style="color:#1f9d6b">89 W</span> + <span style="color:#d4513d">11 W</span></div>', 'left:900px;top:300px;');
        return { eq, bars, cap, w };
      },
      update(ctx, { t, at, state: s }) {
        opacity(s.eq, seg(t, at(1) - 0.2, at(1) + 0.8)); s.eq.style.left = '470px'; s.eq.style.top = '100px';
        const grow = i => seg(t, at(2) + (i === 1 ? 0 : i === 0 ? 1.6 : i === 2 ? 0 : 0), at(2) + 1.0);
        s.bars.forEach((b, i) => {
          const on = i === 1 ? seg(t, at(1) + 0.4, at(2) + 0.6) : i === 0 ? seg(t, at(3) - 0.6, at(3) + 0.2) * 0 + seg(t, at(2) + 0.6, at(2) + 1.4) : seg(t, at(3), at(3) + 0.8);
          const g = on;
          const h = 220, top = 270 + h * (1 - 1) , used = h * g;
          const badH = used * b.G * b.G, goodH = used - badH;
          setA(b.bad, { y: 270 + 4 + (h - 8 - used) + 0, height: Math.max(0, badH - 2) });
          setA(b.good, { y: 270 + 4 + (h - 8 - used) + badH, height: Math.max(0, goodH - 4) });
          opacity(b.l1, g); opacity(b.l2, g); opacity(b.base, 1);
        });
        s.bars[0].l1.setAttribute('opacity', 1);
        opacity(s.cap, seg(t, at(2), at(2) + 1));
        opacity(s.w, seg(t, at(2) + 1.2, at(2) + 2)); s.w.style.left = '840px'; s.w.style.top = '150px';
      },
    },
    // ======================================================= 8 Kabeldämpfung
    {
      id: 'daempfung', kicker: 'Messen in der Praxis', title: 'Das Kabel verschönert das SWR',
      lines: [
        { say: 'Noch ein Punkt, der in der Praxis täuscht: die Kabeldämpfung.', cap: 'Noch ein Punkt, der in der Praxis täuscht: die Kabeldämpfung.' },
        { say: 'Das Kabel schwächt die hinlaufende Welle, und die reflektierte schwächt es auf dem Rückweg noch einmal.', cap: 'Das Kabel schwächt die hinlaufende Welle – und die reflektierte auf dem Rückweg noch einmal.' },
        { say: 'Hat das Kabel drei Dezibel Dämpfung, wird aus einem Reflexionsfaktor von null Komma fünf an der Antenne am Sender nur noch null Komma zwei fünf.', cap: '3 dB Kabeldämpfung: |Γ| = 0,5 an der Antenne → |Γ| = 0,25 am Sender.' },
        { say: 'Das S W R an der Antenne ist drei, am Sender zeigt das Messgerät nur noch etwa eins Komma sieben.', cap: 'SWR an der Antenne: 3     SWR am Sender: ≈ 1,7' },
        { say: 'Ein gutes S W R am Gerät beweist also nicht, dass die Antenne passt. Je mehr das Kabel dämpft, desto mehr verschleiert es die Fehlanpassung.', cap: 'Ein gutes SWR am Gerät beweist nicht, dass die Antenne passt.' },
      ],
      init(ctx) {
        const Y = 330; transmitter(ctx.svg, Y); cable(ctx.svg, Y); antenna(ctx.svg, X1, Y);
        const fw = ctx.el('path', { fill: 'none', stroke: C.forward, 'stroke-width': 4, 'stroke-linecap': 'round' }, ctx.svg);
        const rf = ctx.el('path', { fill: 'none', stroke: C.reflect, 'stroke-width': 4, 'stroke-linecap': 'round' }, ctx.svg);
        const m1 = ctx.h('<div class="chip" style="font-size:24px">SWR am Sender: <b>≈ 1,7</b></div>', 'left:60px;top:180px;');
        const m2 = ctx.h('<div class="chip" style="font-size:24px">SWR an der Antenne: <b>3</b></div>', 'left:820px;top:180px;');
        const a = ctx.h('<div class="chip" style="font-size:22px">Kabel: 3 dB Dämpfung</div>', 'left:480px;top:225px;');
        const eq = eqBox(ctx, '|\\Gamma_{Sender}|=|\\Gamma_{Antenne}|\\cdot10^{-2a/20}=0{,}5\\cdot0{,}5=0{,}25', 'left:230px;top:520px;');
        return { Y, fw, rf, m1, m2, a, eq };
      },
      update(ctx, { t, at, state: s }) {
        const Y = s.Y, decay = x => Math.pow(10, -(3 * (x - X0) / (X1 - X0)) / 20);   // forward: −3 dB over the whole cable
        const on = seg(t, at(1) - 0.2, at(1) + 0.8);
        s.fw.setAttribute('d', pathFn(x => Y - 46 * on * decay(x) * Math.sin(K * (x - X0) - OM * t) - 0, X0 + 10, X1 - 6, 220)); opacity(s.fw, on);
        const G = 0.5;
        s.rf.setAttribute('d', pathFn(x => Y + 110 - 46 * on * G * decay(X1) * Math.pow(10, -(3 * (X1 - x) / (X1 - X0)) / 20) * Math.sin(-K * (x - X0) - OM * t + 1.4), X0 + 10, X1 - 6, 220)); opacity(s.rf, on);
        opacity(s.a, seg(t, at(2) - 0.3, at(2) + 0.5));
        opacity(s.eq, seg(t, at(2) + 0.8, at(2) + 1.6));
        opacity(s.m2, seg(t, at(3), at(3) + 0.6)); opacity(s.m1, seg(t, at(3) + 0.9, at(3) + 1.6));
        s.a.style.top = '235px'; s.m1.style.top = '170px'; s.m2.style.top = '170px'; s.eq.style.top = '525px';
      },
    },
    // ======================================================= 9 Merksätze
    {
      id: 'merken', kicker: 'Zum Merken', title: 'Vier Sätze zum Mitnehmen',
      lines: [
        { say: 'Zum Merken: Fehlanpassung erzeugt Reflexion.', cap: 'Zum Merken: Fehlanpassung erzeugt Reflexion.' },
        { say: 'Gamma zeigt den Anteil der Spannung, das S W R das Verhältnis von Maximum zu Minimum, und Gamma zum Quadrat ist der Anteil der Leistung.', cap: 'Γ: Anteil der Spannung · SWR: Maximum ÷ Minimum · Γ²: Anteil der Leistung' },
        { say: 'Und ein gutes S W R am Sender garantiert keine gute Antenne.', cap: 'Ein gutes SWR am Sender garantiert keine gute Antenne.' },
        { say: 'Die passenden Prüfungsfragen findest du in der Lektion zu S W R und Anpassung. Viel Erfolg beim Üben!', cap: 'Die passenden Prüfungsfragen findest du in der Lektion zu SWR und Anpassung.' },
      ],
      init(ctx) {
        const items = [
          ['R_L \\ne Z_0 \\;\\Rightarrow\\; \\text{Reflexion}', 'Fehlanpassung erzeugt Reflexion'],
          ['\\Gamma=\\dfrac{R_L-Z_0}{R_L+Z_0}', 'Anteil der Spannung, der zurückkommt'],
          ['S=\\dfrac{1+|\\Gamma|}{1-|\\Gamma|}\\;;\\quad \\dfrac{P_r}{P_v}=|\\Gamma|^2', 'SWR und zurücklaufende Leistung'],
          ['\\text{Kabel dämpft} \\Rightarrow \\text{SWR zu gut}', 'Gutes SWR am Gerät ≠ gute Antenne'],
        ].map(([f, label], i) => ctx.h(`<div style="display:flex;gap:26px;align-items:center;width:1100px"><div class="chip" style="width:560px;box-sizing:border-box;text-align:center;font-size:28px;padding:8px 20px">${ctx.tex(f)}</div><div style="font-size:26px;font-weight:600;color:#3b3b55">${label}</div></div>`, `left:90px;top:${140 + i * 116}px;`));
        return { items };
      },
      update(ctx, { t, at, state: s }) {
        const starts = [at(0) + 0.2, at(1) + 0.1, at(1) + 2.2, at(2) + 0.2];
        s.items.forEach((n, i) => { const v = seg(t, starts[i], starts[i] + 0.7, E.out); opacity(n, v); n.style.transform = `translateX(${(1 - v) * 40}px)`; });
      },
    },
  ],
});
