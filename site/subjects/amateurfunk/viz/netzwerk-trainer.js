// Netzwerk-Trainer: Gesamtwiderstand bzw. Gesamtkapazität gemischter Reihen-/Parallelschaltungen berechnen (Muster wie im Katalog).
// params: { need?: Serie richtiger Antworten (Standard 4) }
import { h, s } from '../../../assets/js/vizkit/base.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';

const pick = a => a[Math.floor(Math.random() * a.length)];
const de = (x, d = 3) => { const t = (+x.toPrecision(d)).toString(); return t.replace('.', ','); };
const E = (name, v) => ({ t: 'e', name, v });
const S = (...k) => ({ t: 's', k }), P = (...k) => ({ t: 'p', k });
const val = (n, kind) => {
  if (n.t === 'e') return n.v;
  const xs = n.k.map(c => val(c, kind)), sum = a => a.reduce((p, q) => p + q, 0), rec = a => 1 / sum(a.map(x => 1 / x));
  return (n.t === 's') === (kind === 'R') ? sum(xs) : rec(xs);
};
const bw = 64, bh = 26;
const size = n => {
  if (n.t === 'e') return { w: bw + 36, h: bh + 22 };
  const z = n.k.map(size);
  if (n.t === 's') return { w: z.reduce((p, q) => p + q.w, 0), h: Math.max(...z.map(q => q.h)) };
  return { w: Math.max(...z.map(q => q.w)) + 30, h: z.reduce((p, q) => p + q.h, 0) };
};
function draw(n, x, yc, kind, unit, out) {
  const W = { stroke: 'var(--ink)', 'stroke-width': 1.8, fill: 'none', 'stroke-linecap': 'round' };
  const ln = (x1, y1, x2, y2) => out.push(s('line', { x1, y1, x2, y2, ...W }));
  const z = size(n);
  if (n.t === 'e') {
    const cx = x + z.w / 2;
    ln(x, yc, cx - bw / 2 + (kind === 'C' ? bw / 2 - 5 : 0), yc); ln(cx + bw / 2 - (kind === 'C' ? bw / 2 - 5 : 0), yc, x + z.w, yc);
    if (kind === 'R') out.push(s('rect', { x: cx - bw / 2, y: yc - bh / 2, width: bw, height: bh, ...W }));
    else out.push(s('line', { x1: cx - 5, y1: yc - 16, x2: cx - 5, y2: yc + 16, ...W, 'stroke-width': 3 }), s('line', { x1: cx + 5, y1: yc - 16, x2: cx + 5, y2: yc + 16, ...W, 'stroke-width': 3 }));
    out.push(s('text', { x: cx, y: yc - 20, 'text-anchor': 'middle', 'font-size': 11.5, fill: 'var(--ink)', 'font-weight': 600 }, `${n.name} = ${de(n.v / (unit === 'Ω' ? 1 : 1e-9))} ${unit === 'Ω' ? 'Ω' : 'nF'}`));
    return;
  }
  if (n.t === 's') { let cx = x; for (const c of n.k) { draw(c, cx, yc, kind, unit, out); cx += size(c).w; } return; }
  const zs = n.k.map(size), tot = zs.reduce((p, q) => p + q.h, 0);
  let y0 = yc - tot / 2; const ys = zs.map(q => { const c = y0 + q.h / 2; y0 += q.h; return c; });
  const xl = x + 8, xr = x + z.w - 8;
  ln(x, yc, xl, yc); ln(xr, yc, x + z.w, yc); ln(xl, ys[0], xl, ys[ys.length - 1]); ln(xr, ys[0], xr, ys[ys.length - 1]);
  n.k.forEach((c, i) => { const cz = size(c); const pad = (z.w - 30 - cz.w) / 2; ln(xl, ys[i], xl + 7 + pad, ys[i]); draw(c, xl + 7 + pad, ys[i], kind, unit, out); ln(xl + 7 + pad + cz.w, ys[i], xr, ys[i]); });
}

export default function mount(stage, { params = {}, complete, md }) {
  const need = params.need ?? 4;
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const ui = controls(root, [{ id: 'kind', type: 'seg', label: 'Bauteile', options: [['R', 'Widerstände'], ['C', 'Kondensatoren']], value: 'R' }], () => next());
  const svg = s('svg', { class: 'vz-svg', viewBox: '0 0 420 200', role: 'img', 'aria-label': 'Netzwerk aus drei bis vier Bauteilen' });
  root.append(svg);
  const inp = h('input', { type: 'text', inputmode: 'decimal', 'aria-label': 'Gesamtwert', placeholder: 'Ergebnis', style: 'font:600 1.1rem var(--mono);padding:8px 12px;border:1px solid var(--line-2);border-radius:10px;width:9em;max-width:100%' });
  const unitEl = h('span', { style: 'font:600 1.1rem var(--mono);margin:0 8px' });
  const ok = h('button', { type: 'button', class: 'btn primary', text: 'Prüfen' });
  const nx = h('button', { type: 'button', class: 'btn ghost', text: 'Weiter', style: 'display:none' });
  const fb = h('div', { class: 'vz-note', style: 'margin-top:8px;min-height:3em' });
  root.append(h('div', { style: 'display:flex;flex-wrap:wrap;align-items:center;gap:6px 0;margin-top:8px' }, inp, unitEl, ok, nx), fb);
  const out = readout(root, [{ id: 'streak', label: 'Serie', hl: true }, { id: 'n', label: 'Aufgaben' }]);
  const g = goals(root, [{ id: 'g', label: `${need} Gesamtwerte in Folge richtig` }], () => complete?.());
  let q, streak = 0, n = 0, locked = false;

  function next() {
    const kind = ui.values.kind, RV = [100, 200, 300, 400, 500, 600, 1000, 1200, 1500, 2000], CV = [2, 4, 5, 8, 10, 20, 40];
    const v = () => (kind === 'R' ? pick(RV) : pick(CV) * 1e-9), unit = kind === 'R' ? 'Ω' : 'nF';
    const a = v(), b = v(), c = v(), d = v();
    const shape = pick([0, 1, 2, 3]);
    const tree = [S(E('R1', a), P(E('R2', b), E('R3', c))), P(S(E('R1', a), E('R2', b)), E('R3', c)), S(P(E('R1', a), E('R2', b), E('R3', c)), E('R4', d)), P(E('R1', a), E('R2', b), E('R3', c))][shape];
    const rename = (nd) => nd.t === 'e' ? E(nd.name.replace('R', kind), nd.v) : { ...nd, k: nd.k.map(rename) };
    const T = rename(tree); const ans = val(T, kind);
    const z = size(T); const els = []; draw(T, 40, 100, kind, unit, els);
    const wl = [s('circle', { cx: 12, cy: 100, r: 4, fill: '#fff', stroke: 'var(--ink)', 'stroke-width': 1.8 }), s('line', { x1: 16, y1: 100, x2: 40, y2: 100, stroke: 'var(--ink)', 'stroke-width': 1.8 }),
      s('line', { x1: 40 + z.w, y1: 100, x2: 400, y2: 100, stroke: 'var(--ink)', 'stroke-width': 1.8 }), s('circle', { cx: 404, cy: 100, r: 4, fill: '#fff', stroke: 'var(--ink)', 'stroke-width': 1.8 })];
    const vb = Math.max(420, 40 + z.w + 40);
    svg.setAttribute('viewBox', `0 ${100 - Math.max(70, z.h / 2 + 12)} ${vb} ${Math.max(140, z.h + 24)}`);
    wl[2].setAttribute('x2', vb - 20); wl[3].setAttribute('cx', vb - 16);
    svg.replaceChildren(s('rect', { x: 0, y: -400, width: vb, height: 900, fill: '#fff' }), ...els, ...wl);
    q = { ans, unit, kind, shape, T };
    unitEl.textContent = unit; inp.value = ''; locked = false; inp.disabled = false;
    fb.textContent = kind === 'R' ? 'Fasse zuerst die Teilschaltungen zusammen: Reihe = addieren, parallel = Kehrwerte addieren (bei zwei Widerständen Produkt durch Summe).' : 'Bei Kondensatoren ist es umgekehrt: parallel = addieren, Reihe = Kehrwerte addieren.';
    ok.style.display = ''; nx.style.display = 'none';
  }
  function check() {
    if (locked) return;
    const x = parseFloat(inp.value.replace(',', '.')); if (Number.isNaN(x)) return;
    locked = true; n++;
    const ans = q.unit === 'Ω' ? q.ans : q.ans * 1e9;
    const good = Math.abs(x / ans - 1) < 0.02; streak = good ? streak + 1 : 0;
    fb.innerHTML = (good ? '<b>Richtig.</b> ' : '<b>Nicht ganz.</b> ') + `Ergebnis: <b>${de(ans)} ${q.unit}</b>. ` + ['Erst die Parallelschaltung von 2 und 3, dann in Reihe mit 1.', 'Erst die Reihenschaltung von 1 und 2, dann parallel zu 3.', 'Erst die Parallelschaltung von 1, 2 und 3, dann in Reihe mit 4.', 'Alle drei liegen parallel.'][q.shape].replace(/(\d)/g, d => d) + (q.kind === 'C' ? ' (Kondensatorregeln: Reihe = Kehrwerte, parallel = Summe.)' : '');
    out.set({ streak, n }); if (streak >= need) g.reach('g');
    ok.style.display = 'none'; nx.style.display = '';
  }
  ok.onclick = check; nx.onclick = next; inp.onkeydown = e => { if (e.key === 'Enter') (locked ? next : check)(); };
  root.__ans = () => (q.unit === 'Ω' ? q.ans : q.ans * 1e9);
  out.set({ streak, n }); next();
}
