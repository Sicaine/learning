// Sporadic-E (E-Region, ≈ 105 km) gegen F2-Region (≈ 350 km): geometrische Sprungdistanz in Abhängigkeit vom Abstrahlwinkel.
// Kugelgeometrie: Einfallsgrößen an der brechenden Region der Höhe h:  Mittelpunktswinkel je Hälfte = acos(R·cos α / (R + h)) − α,  Sprung = 2·R·dieser Winkel.
// Höhen im Bild 4-fach überzeichnet. Die Brechung selbst (Frequenz gegen Ionisation) ist hier vorausgesetzt.
import { h, s } from '../../../assets/js/vizkit/base.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';

const R = 6371, D2R = Math.PI / 180;
const REG = { es: { name: 'Sporadic-E (E-Region)', h: 105, col: 'var(--warn)', short: 'Es' }, f2: { name: 'F2-Region', h: 350, col: 'var(--accent)', short: 'F2' } };
const de = (x, d = 0) => (+x.toFixed(d)).toString().replace('.', ',');
const hop = (al, hk) => 2 * R * (Math.acos(R * Math.cos(al * D2R) / (R + hk)) - al * D2R);

export default function mount(stage, { complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const W = 360, H = 205, RP = 420, EX = 4, CX = W / 2, CY = 148 + RP;
  const svg = s('svg', { class: 'vz-svg', viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': 'Sprung einer Funkwelle an der E- oder F2-Region', style: 'max-width:620px;margin:0 auto;background:var(--surface-2);border:1px solid var(--line);border-radius:12px' });
  root.append(svg);
  const ui = controls(root, [
    { id: 'reg', type: 'seg', label: 'Brechende Region', options: [['es', 'Sporadic-E (≈ 105 km)'], ['f2', 'F2 (≈ 350 km)']], value: 'f2' },
    { id: 'al', label: 'Abstrahlwinkel über dem Horizont', min: 1, max: 40, step: 1, value: 25, format: v => v + '°' },
  ], run);
  const out = readout(root, [{ id: 'hk', label: 'Höhe der Region' }, { id: 'hop', label: 'Sprungdistanz', hl: true }, { id: 'tz', label: 'Tote Zone reicht bis' }, { id: 'cmp', label: 'Dieselbe Antenne, andere Region' }]);
  const g = goals(root, [
    { id: 'short', label: 'Short Skip: mit Sporadic-E einen Sprung unter 1000 km erzielen' },
    { id: 'far', label: 'Mit der F2-Region einen Sprung über 3000 km erzielen (flacher Strahl)' },
    { id: 'both', label: 'Beide Regionen angesehen' },
  ], () => complete?.());
  root.append(h('div', { class: 'vz-note', text: 'Flacher Strahl und höhere Region ergeben den längeren Sprung. Bis zum Aufsetzpunkt ist es still (ohne Bodenwelle): die Es-Region liegt tiefer, deshalb ist ihre tote Zone kleiner und die maximale Sprungdistanz kleiner (etwa 2200 km, F2: bis etwa 4000 km). Höhen im Bild überzeichnet.' }));

  const P = (psi, rk) => { const r = RP * (1 + EX * (rk - R) / R); return [CX + r * Math.sin(psi), CY - r * Math.cos(psi)]; };
  const arc = (rk, a0, a1) => { let d = ''; for (let i = 0; i <= 50; i++) { const [x, y] = P(a0 + (a1 - a0) * i / 50, rk); d += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1); } return d; };
  const seg = (psi0, r0, psi1, r1) => {
    const ax = r0 * Math.sin(psi0), ay = r0 * Math.cos(psi0), bx = r1 * Math.sin(psi1), by = r1 * Math.cos(psi1); let d = '';
    for (let i = 0; i <= 30; i++) { const t = i / 30, x = ax + (bx - ax) * t, y = ay + (by - ay) * t; const [px, py] = P(Math.atan2(x, y), Math.hypot(x, y)); d += (i ? 'L' : 'M') + px.toFixed(1) + ' ' + py.toFixed(1); }
    return d;
  };
  const seen = new Set(); let live = false;
  function run() {
    const { reg, al } = ui.values, r = REG[reg], D = hop(al, r.h), half = D / R / 2;
    const A0 = -0.30, A1 = A0 + 2 * half, kids = [];
    kids.push(s('path', { d: arc(R, -0.45, 0.45) + ` L ${W} ${H} L 0 ${H} Z`, fill: 'color-mix(in oklab, var(--good) 18%, var(--surface))', stroke: 'var(--ink-2)', 'stroke-width': 1.5 }));
    for (const k of ['es', 'f2']) kids.push(s('path', { d: arc(R + REG[k].h, -0.45, 0.45), fill: 'none', stroke: REG[k].col, 'stroke-width': k === reg ? 5 : 2.5, opacity: k === reg ? .55 : .25, 'stroke-linecap': 'round' }), s('text', { x: W - 6, y: P(0.37, R + REG[k].h)[1] - 5, 'text-anchor': 'end', 'font-size': 10, 'font-weight': 700, fill: REG[k].col }, REG[k].name));
    const [ax] = P(A0, R), [bx] = P(A1, R);
    kids.push(s('path', { d: seg(A0, R, A0 + half, R + r.h) + seg(A0 + half, R + r.h, A1, R).replace('M', 'L'), fill: 'none', stroke: r.col, 'stroke-width': 2.8, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }));
    const yg = H - 18;
    kids.push(s('rect', { x: ax, y: yg, width: Math.max(2, bx - ax), height: 7, fill: 'var(--bad)', opacity: .8 }), s('text', { x: (ax + bx) / 2, y: yg + 16, 'text-anchor': 'middle', 'font-size': 9, 'font-weight': 800, fill: 'var(--bad)' }, `tote Zone · ${de(D)} km`));
    const [tx, ty] = P(A0, R), [rx, ry] = P(A1, R);
    kids.push(s('line', { x1: tx, y1: ty, x2: tx, y2: ty - 11, stroke: 'var(--ink)', 'stroke-width': 3 }), s('circle', { cx: tx, cy: ty - 13, r: 3, fill: r.col }), s('circle', { cx: rx, cy: ry - 1, r: 3.5, fill: r.col }));
    svg.replaceChildren(...kids);
    const other = reg === 'es' ? 'f2' : 'es', Do = hop(al, REG[other].h);
    out.set({ hk: `${r.h} km`, hop: `${de(D)} km`, tz: `${de(D)} km`, cmp: `${REG[other].short}: ${de(Do)} km` });
    seen.add(reg);
    if (!live) return;
    if (reg === 'es' && D < 1000) g.reach('short');
    if (reg === 'f2' && D > 3000) g.reach('far');
    if (seen.size === 2) g.reach('both');
  }
  run(); live = true;
}
