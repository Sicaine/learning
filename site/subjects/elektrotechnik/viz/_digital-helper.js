// Gemeinsame Bausteine der Digitaltechnik-Demos (Etappe 7): Stil, Bitschalter, Zeitdiagramm (Streifenschreiber).
import { h, s, boxWidth } from '../../../assets/js/vizkit/base.js';

const CSS = `
.dg-bits{display:flex;gap:6px;justify-content:center;flex-wrap:nowrap;margin:6px 0 2px}
.dg-nib{display:flex;gap:4px}
.dg-bit{flex:1 1 0;min-width:0;max-width:64px;display:grid;justify-items:center;gap:3px;padding:0;border:0;background:none;cursor:pointer;font:inherit;touch-action:manipulation;-webkit-tap-highlight-color:transparent}
.dg-bit .w{font:600 .64rem var(--mono);color:var(--muted)}
.dg-bit .b{width:100%;min-width:24px;height:46px;border-radius:10px;border:1.5px solid var(--line-2);background:var(--surface);display:grid;place-items:center;font:700 1.15rem var(--mono);color:var(--muted);transition:background .12s,color .12s,border-color .12s}
.dg-bit.on .b{background:var(--accent);border-color:var(--accent);color:#fff}
.dg-bit:focus-visible .b{outline:3px solid color-mix(in oklab,var(--accent) 35%,transparent);outline-offset:1px}
.dg-big{display:flex;flex-wrap:wrap;gap:8px 18px;justify-content:center;align-items:baseline;margin:8px 0}
.dg-big b{font:700 1.5rem var(--mono);color:var(--ink)}
.dg-big small{font:500 .72rem var(--sans);color:var(--muted);margin-right:5px;text-transform:uppercase;letter-spacing:.04em}
.dg-task{border:1px solid var(--accent-line);background:var(--accent-soft);border-radius:12px;padding:10px 14px;text-align:center;font-weight:600;color:var(--ink)}
.dg-task.ok{border-color:var(--good);background:var(--good-soft)}
.dg-task big{font:700 1.3rem var(--mono);color:var(--accent)}
.dg-sw{display:inline-flex;align-items:center;gap:7px;border:1.5px solid var(--line-2);background:var(--surface);border-radius:10px;padding:4px 10px 4px 5px;font:600 .85rem var(--mono);cursor:pointer;color:var(--ink-2);touch-action:manipulation;min-height:40px}
.dg-sw i{display:grid;place-items:center;width:30px;height:30px;border-radius:8px;background:var(--line);font-style:normal;color:var(--muted)}
.dg-sw.on{border-color:var(--accent-line)}
.dg-sw.on i{background:var(--accent);color:#fff}
.dg-sw:focus-visible{outline:3px solid color-mix(in oklab,var(--accent) 35%,transparent)}
.dg-swrow{display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:center}
.dg-lamp{display:inline-flex;align-items:center;gap:8px;font:600 .85rem var(--mono);color:var(--ink-2)}
.dg-lamp i{width:22px;height:22px;border-radius:50%;background:var(--line);border:1.5px solid var(--line-2);transition:background .1s,box-shadow .1s}
.dg-lamp.on i{background:var(--good);border-color:var(--good);box-shadow:0 0 0 5px color-mix(in oklab,var(--good) 22%,transparent)}
.dg-tbl{border-collapse:collapse;margin:6px auto;font:600 .9rem var(--mono)}
.dg-tbl th,.dg-tbl td{border:1px solid var(--line-2);padding:5px 12px;text-align:center;min-width:34px}
.dg-tbl th{background:var(--surface-2);color:var(--ink-2);font-weight:600}
.dg-tbl tr.cur td{background:var(--accent-soft)}
.dg-tbl td.ok{background:var(--good-soft);color:var(--good)}
.dg-tbl td.bad{background:var(--bad-soft);color:var(--bad)}
.dg-tbl button{font:inherit;border:0;background:none;cursor:pointer;min-width:40px;min-height:30px;color:var(--accent);border-radius:6px}
.dg-tbl button:hover{background:var(--accent-soft)}
.dg-stage{background:var(--surface-2);border:1px solid var(--line);border-radius:14px;padding:8px}
.dg-stage svg{width:100%;height:auto;display:block;user-select:none;-webkit-user-select:none}
.dg-stage text{font-family:var(--sans);fill:var(--ink-2)}
.dg-mono{font-family:var(--mono)}
.dg-note{font-size:.82rem;color:var(--muted);text-align:center;margin:4px 0}
.dg-trans{font:600 .8rem var(--mono);display:flex;flex-wrap:wrap;gap:4px 6px;align-items:center;justify-content:center}
.dg-trans span{padding:2px 7px;border-radius:7px;background:var(--surface-2);border:1px solid var(--line-2)}
.dg-trans span.gl{background:var(--bad-soft);border-color:var(--bad);color:var(--bad)}
.dg-trans span.fin{background:var(--good-soft);border-color:var(--good);color:var(--good)}
.dg-btn{font:600 .85rem var(--sans);border:1px solid var(--line-2);background:var(--surface);border-radius:10px;padding:8px 14px;min-height:40px;cursor:pointer;color:var(--ink);touch-action:manipulation}
.dg-btn:hover{border-color:var(--accent-line);color:var(--accent)}
.dg-btn.on{background:var(--accent);color:#fff;border-color:var(--accent)}
.dg-btn:disabled{opacity:.45;cursor:default}
.dg-actions{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:6px 0}
`;
let done = false;
/** Stil einmalig anhängen. */
export function digitalStyle() {
  if (done || typeof document === 'undefined') return;
  done = true;
  const st = document.createElement('style'); st.id = 'dg-css'; st.textContent = CSS; document.head.appendChild(st);
}

/** Binärdarstellung mit fester Breite. */
export const bin = (n, w) => n.toString(2).padStart(w, '0');
export const hex = (n, w = 2) => n.toString(16).toUpperCase().padStart(w, '0');

/** Schalter-Knopf (A, B, …): { label, value, onChange } → { el, set(v) }. */
export function switchBtn(label, value, onChange) {
  const i = h('i', { text: value ? '1' : '0' });
  const b = h('button', { type: 'button', class: 'dg-sw' + (value ? ' on' : ''), 'aria-pressed': !!value, 'aria-label': 'Eingang ' + label }, i, label);
  let v = !!value;
  const paint = () => { b.classList.toggle('on', v); b.setAttribute('aria-pressed', v); i.textContent = v ? '1' : '0'; };
  b.onclick = () => { v = !v; paint(); onChange?.(v); };
  return { el: b, get value() { return v; }, set(x) { v = !!x; paint(); } };
}

/**
 * Streifenschreiber (Zeitdiagramm) für Digitalsignale. Zeit läuft von rechts nach links vorbei.
 *   const sc = stripChart(root, { rows: [{ id: 'clk', label: 'CLK', color }], span: 8 });
 *   sc.event('clk', t, 1);  sc.draw(now);
 */
export function stripChart(root, o) {
  digitalStyle();
  const span = o.span ?? 8, rows = o.rows, W = o.w ?? boxWidth(root, 320, 760);
  const rh = o.rowH ?? 34, ml = 46, mr = 8, mt = 8, mb = 20, H = mt + rows.length * rh + mb;
  const wrap = h('div', { class: 'dg-stage' });
  const svg = s('svg', { viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': 'Zeitdiagramm' });
  wrap.append(svg); root.append(wrap);
  const pw = W - ml - mr;
  const ev = Object.fromEntries(rows.map(r => [r.id, [[-1e9, o.init?.[r.id] ?? 0]]]));
  const gGrid = s('g'), gSig = s('g'), gLab = s('g');
  svg.append(gGrid, gSig, gLab);
  rows.forEach((r, k) => {
    const y = mt + k * rh + rh / 2;
    gLab.append(s('text', { x: 6, y: y + 4, 'font-size': 12, 'font-weight': 700, style: `fill:${r.color || 'var(--ink-2)'}` }, r.label));
    gGrid.append(s('line', { x1: ml, x2: W - mr, y1: mt + k * rh + rh - 3, y2: mt + k * rh + rh - 3, stroke: 'var(--line)' }));
  });
  const paths = rows.map(r => { const p = s('path', { fill: 'none', 'stroke-width': 2.2, 'stroke-linejoin': 'round', stroke: r.color || 'var(--accent)' }); gSig.append(p); return p; });
  const ticks = []; for (let i = 0; i <= span; i++) { const l = s('line', { y1: mt, y2: mt + rows.length * rh, stroke: 'var(--line)', 'stroke-dasharray': '2 4' }); const t = s('text', { 'text-anchor': 'middle', 'font-size': 10, y: H - 5, style: 'fill:var(--muted)' }); gGrid.append(l); gGrid.append(t); ticks.push([l, t]); }
  const cur = s('line', { x1: W - mr, x2: W - mr, y1: mt - 2, y2: mt + rows.length * rh, stroke: 'var(--ink-2)', 'stroke-width': 1.2 });
  gLab.append(cur);
  const API = {
    svg, el: wrap,
    /** Wert von Signal `id` ab Zeit t. */
    event(id, t, v) { const a = ev[id]; if (a[a.length - 1][1] !== v) a.push([t, v]); },
    value: id => ev[id][ev[id].length - 1][1],
    draw(now) {
      const t0 = now - span, X = t => ml + (t - t0) / span * pw;
      rows.forEach((r, k) => {
        const a = ev[r.id]; while (a.length > 2 && a[1][0] < t0 - 1) a.shift();
        const yTop = mt + k * rh + 5, yLow = mt + k * rh + rh - 8, Y = v => v ? yTop : yLow;
        let d = '', prev = null;
        for (const [t, v] of a) {
          const x = Math.max(ml, Math.min(W - mr, X(t)));
          if (prev === null) d += `M${ml} ${Y(v)}`; else if (t >= t0) d += `H${x.toFixed(1)}V${Y(v)}`;
          prev = v;
          if (t < t0) d = `M${ml} ${Y(v)}`;
        }
        d += `H${W - mr}`;
        paths[k].setAttribute('d', d);
      });
      const first = Math.ceil(t0);
      ticks.forEach(([l, t], i) => { const tt = first + i, x = X(tt); const vis = x >= ml && x <= W - mr; l.style.display = t.style.display = vis ? '' : 'none'; if (vis) { l.setAttribute('x1', x); l.setAttribute('x2', x); t.setAttribute('x', x); t.textContent = tt + ' s'; } });
    },
  };
  return API;
}

// ── Gatter ──────────────────────────────────────────────────────────────────
/** Gattertypen: Funktion über 0/1-Eingänge, Kennzeichen im IEC/DIN-Rechteck-Symbol (DIN EN 60617-12), Negationskreis. */
export const GATES = {
  and: { name: 'UND', en: 'AND', mark: '&', neg: false, n: 2, f: (a, b) => a & b },
  or: { name: 'ODER', en: 'OR', mark: '≥1', neg: false, n: 2, f: (a, b) => a | b },
  not: { name: 'NICHT', en: 'NOT', mark: '1', neg: true, n: 1, f: a => a ^ 1 },
  nand: { name: 'NAND', en: 'NAND', mark: '&', neg: true, n: 2, f: (a, b) => (a & b) ^ 1 },
  nor: { name: 'NOR', en: 'NOR', mark: '≥1', neg: true, n: 2, f: (a, b) => (a | b) ^ 1 },
  xor: { name: 'XOR', en: 'XOR', mark: '=1', neg: false, n: 2, f: (a, b) => a ^ b },
  xnor: { name: 'XNOR', en: 'XNOR', mark: '=1', neg: true, n: 2, f: (a, b) => (a ^ b) ^ 1 },
};

/**
 * Gatter-Symbol in eine SVG-Gruppe zeichnen. Liefert Pin-Koordinaten (absolut).
 * Rechteck x..x+w, Eingangsanschlüsse links (Länge `pin`), Ausgang rechts (mit Negationskreis bei neg).
 */
export function drawGate(g, type, x, y, o = {}) {
  const def = GATES[type], w = o.w ?? 56, hh = o.h ?? (def.n === 1 ? 40 : 56), pin = o.pin ?? 14, r = 5;
  const ys = def.n === 1 ? [y + hh / 2] : [y + hh * 0.27, y + hh * 0.73];
  const body = s('g', { fill: 'none', stroke: 'var(--ink)', 'stroke-width': 2, 'stroke-linecap': 'round' });
  const rect = s('rect', { x, y, width: w, height: hh, rx: 2, style: 'fill:var(--surface)' });
  body.append(rect);
  ys.forEach(py => body.append(s('line', { x1: x - pin, x2: x, y1: py, y2: py })));
  const ox = x + w + (def.neg ? 2 * r : 0);
  if (def.neg) body.append(s('circle', { cx: x + w + r, cy: y + hh / 2, r, style: 'fill:var(--surface)' }));
  body.append(s('line', { x1: ox, x2: ox + pin, y1: y + hh / 2, y2: y + hh / 2 }));
  const t = s('text', { x: x + w / 2, y: y + hh / 2 + 6, 'text-anchor': 'middle', 'font-size': def.mark.length > 1 ? 17 : 21, 'font-weight': 700, style: 'fill:var(--ink);stroke:none' }, def.mark);
  g.append(body, t);
  return { ins: ys.map(py => [x - pin, py]), out: [ox + pin, y + hh / 2], w, h: hh, rect, body, text: t, outX: ox + pin };
}
