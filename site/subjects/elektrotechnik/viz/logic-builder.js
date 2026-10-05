// Logik-Baukasten: Gatter ziehen, per Antippen/Ziehen verdrahten, automatische Prüfung gegen die Wahrheitstabelle.
// params: { allow?: ['nand'] (Gatterarten im Baukasten), targets?: ['not','and','or','xor','halfadder'], required?: ['xor'] (zu lösende Aufgaben) }
// Bedienung: Schalter A/B antippen; Ausgangspunkt (●) eines Gatters/Eingangs antippen oder ziehen, dann Eingangspunkt (○) antippen;
// belegten Eingangspunkt antippen = Leitung aufnehmen; Gatter ziehen = verschieben; „Löschen“ entfernt das markierte Gatter.
import { h, s, boxWidth } from '../../../assets/js/vizkit/base.js';
import { goals } from '../../../assets/js/vizkit/controls.js';
import { digitalStyle, GATES, drawGate } from './_digital-helper.js';

const TARGETS = {
  not: { label: 'NICHT', ins: ['A'], outs: ['Y'], f: a => [a ^ 1], min: 1, hint: 'Beide Eingänge eines NAND mit A verbinden: NAND(A, A) = ¬A.' },
  and: { label: 'UND', ins: ['A', 'B'], outs: ['Y'], f: (a, b) => [a & b], min: 2, hint: 'UND = NICHT(NAND). Hinter ein NAND noch ein NAND mit verbundenen Eingängen setzen.' },
  or: { label: 'ODER', ins: ['A', 'B'], outs: ['Y'], f: (a, b) => [a | b], min: 3, hint: 'De Morgan: A + B = ¬(¬A · ¬B). Erst A und B einzeln invertieren, dann beide in ein NAND.' },
  xor: { label: 'XOR', ins: ['A', 'B'], outs: ['Y'], f: (a, b) => [a ^ b], min: 4, hint: 'g1 = NAND(A, B). g2 = NAND(A, g1). g3 = NAND(B, g1). Y = NAND(g2, g3). Das Ergebnis g1 wird dreimal gebraucht.' },
  halfadder: { label: 'Halbaddierer', ins: ['A', 'B'], outs: ['S', 'C'], f: (a, b) => [a ^ b, a & b], min: 5, hint: 'Summe S = XOR wie in der XOR-Aufgabe (4 NAND). Übertrag C = A · B = ¬g1: ein fünftes NAND mit verbundenen Eingängen an g1.' },
};

export default function mount(stage, { params = {}, complete }) {
  digitalStyle();
  const allow = params.allow ?? ['nand'];
  const tlist = (params.targets ?? ['not', 'and', 'or', 'xor', 'halfadder']).filter(k => TARGETS[k]);
  const required = params.required ?? ['xor'];
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const states = Object.fromEntries(tlist.map(k => [k, { gates: [], conn: {}, next: 1 }]));
  let tid = tlist.includes('xor') ? 'xor' : tlist[0];
  let sel = null, pending = null, drag = null, rubber = null, msg = '';
  const inVal = [0, 0];
  const solved = new Set();

  // Aufgabenwahl
  const seg = h('div', { class: 'vz-seg vk-seg', role: 'group', 'aria-label': 'Aufgabe' });
  const sbtn = {};
  for (const k of tlist) { sbtn[k] = h('button', { type: 'button', text: TARGETS[k].label, onclick: () => { tid = k; sel = pending = null; msg = ''; paintSeg(); render(); } }); seg.append(sbtn[k]); }
  root.append(h('div', { class: 'vk-segbox', style: 'margin-bottom:8px' }, h('span', { class: 'vk-seglabel', text: 'Baue:' }), seg));
  const paintSeg = () => { for (const k of tlist) { sbtn[k].classList.toggle('on', k === tid); sbtn[k].textContent = TARGETS[k].label + (solved.has(k) ? ' ✓' : ''); } };

  const W = boxWidth(root, 320, 720), H = 330;
  const wrap = h('div', { class: 'dg-stage' }); root.append(wrap);
  const svg = s('svg', { viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': 'Logik-Baukasten' });
  svg.style.touchAction = 'pan-y';
  wrap.append(svg);
  const layer = s('g'); svg.append(layer);

  const bar = h('div', { class: 'dg-actions' });
  for (const t of allow) bar.append(h('button', { type: 'button', class: 'dg-btn', text: '+ ' + GATES[t].name, onclick: () => addGate(t) }));
  const delBtn = h('button', { type: 'button', class: 'dg-btn', text: 'Löschen', onclick: () => delGate() });
  bar.append(delBtn,
    h('button', { type: 'button', class: 'dg-btn', text: 'Neu beginnen', onclick: () => { states[tid] = { gates: [], conn: {}, next: 1 }; sel = pending = null; msg = ''; render(); } }),
    h('button', { type: 'button', class: 'dg-btn', text: 'Tipp', onclick: () => { msg = 'Tipp: ' + TARGETS[tid].hint; render(); } }));
  root.append(bar);
  const status = h('div', { class: 'dg-note', 'aria-live': 'polite' }); root.append(status);
  const tblBox = h('div'); root.append(tblBox);
  const gl = goals(root, required.map(k => ({ id: k, label: `${TARGETS[k].label} nur aus ${allow.map(a => GATES[a].name).join('/')} gebaut` })), () => complete?.());

  // ── Modell ──
  const ST = () => states[tid];
  const gateById = id => ST().gates.find(g => g.id === id);
  function addGate(type, x, y) {
    const st = ST(), n = st.gates.length;
    const colW = Math.min(104, (W - 150) / 3), g = { id: 'g' + st.next++, type, x: x ?? (96 + (n % 3) * colW), y: y ?? (30 + Math.floor(n / 3) * 76 + (n % 3) * 14) };
    g.y = Math.min(g.y, H - 76);
    st.gates.push(g); sel = g.id; msg = ''; render(); return g;
  }
  function delGate() {
    if (!sel) return;
    const st = ST(); st.gates = st.gates.filter(g => g.id !== sel);
    for (const k of Object.keys(st.conn)) if (k.startsWith(sel + ':') || st.conn[k] === sel) delete st.conn[k];
    sel = null; render();
  }
  const dependsOn = (src, gid, seen = new Set()) => {   // hängt Quelle src (direkt/indirekt) vom Gatter gid ab?
    if (!src.startsWith('g')) return false; if (src === gid) return true; if (seen.has(src)) return false; seen.add(src);
    const g = gateById(src); return GATES[g.type].n === 1 ? dependsOn(ST().conn[src + ':0'] ?? '', gid, seen) : [0, 1].some(p => dependsOn(ST().conn[src + ':' + p] ?? '', gid, seen));
  };
  function connect(src, sink) {
    const gid = sink.startsWith('g') ? sink.split(':')[0] : null;
    if (gid && dependsOn(src, gid)) { msg = 'Das würde eine Schleife bilden (Rückkopplung) — hier ist nur Kombinationslogik erlaubt.'; return false; }
    ST().conn[sink] = src; msg = ''; return true;
  }
  function value(src, inputs, memo = {}) {
    if (!src) return 0;
    if (src[0] === 'i') return inputs[+src.slice(2)];
    if (src in memo) return memo[src];
    const g = gateById(src), n = GATES[g.type].n, a = value(ST().conn[src + ':0'], inputs, memo), b = n === 2 ? value(ST().conn[src + ':1'], inputs, memo) : 0;
    return memo[src] = GATES[g.type].f(a, b);
  }

  // ── Geometrie ──
  const T = () => TARGETS[tid];
  const inPos = k => [58, T().ins.length === 1 ? H / 2 : 90 + k * (H - 180) / Math.max(1, T().ins.length - 1) + (T().ins.length === 2 ? 0 : 0)];
  const outPos = k => [W - 58, T().outs.length === 1 ? H / 2 : 100 + k * 130];
  const gw = 46, gh2 = 46;
  const gateGeom = g => { const d = GATES[g.type]; const hh = d.n === 1 ? 36 : gh2; const tmp = s('g'); const sym = drawGate(tmp, g.type, g.x, g.y, { w: gw, h: hh, pin: 12 }); return { sym, tmp, hh }; };

  function point(e) { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); }
  function srcPos(src) { if (src[0] === 'i') return inPos(+src.slice(2)); const g = gateById(src); return gateGeom(g).sym.out; }
  function sinkPos(sink) {
    if (sink.startsWith('out:')) return outPos(+sink.slice(4));
    const [id, p] = sink.split(':'), g = gateById(id); return gateGeom(g).sym.ins[+p];
  }
  const allSinks = () => { const r = []; for (const g of ST().gates) for (let p = 0; p < GATES[g.type].n; p++) r.push(`${g.id}:${p}`); T().outs.forEach((_, k) => r.push('out:' + k)); return r; };
  const nearestSink = (pt, maxd = 22) => { let best = null, bd = maxd; for (const k of allSinks()) { const [x, y] = sinkPos(k); const d = Math.hypot(x - pt.x, y - pt.y); if (d < bd) { bd = d; best = k; } } return best; };

  // ── Zeichnen ──
  function wirePath(a, b) { const dx = Math.max(28, Math.abs(b[0] - a[0]) / 2); return `M${a[0]} ${a[1]}C${a[0] + dx} ${a[1]} ${b[0] - dx} ${b[1]} ${b[0]} ${b[1]}`; }
  function render() {
    layer.replaceChildren();
    const st = ST(), memo = {}, inputs = inVal.slice(0, T().ins.length);
    const col = v => v ? 'var(--accent)' : 'var(--muted)';
    // Leitungen
    const gW = s('g'), gG = s('g'), gP = s('g'); layer.append(gW, gG, gP);
    for (const [sink, src] of Object.entries(st.conn)) {
      let p1, p2; try { p1 = srcPos(src); p2 = sinkPos(sink); } catch { continue; }
      gW.append(s('path', { d: wirePath(p1, p2), fill: 'none', stroke: col(value(src, inputs, memo)), 'stroke-width': 3.2, 'stroke-linecap': 'round', opacity: 0.95 }));
    }
    if (rubber && pending) gW.append(s('path', { d: wirePath(srcPos(pending), [rubber.x, rubber.y]), fill: 'none', stroke: 'var(--accent-2)', 'stroke-width': 2.5, 'stroke-dasharray': '6 5' }));
    // Eingangsknoten
    T().ins.forEach((name, k) => {
      const [px, py] = inPos(k), v = inputs[k];
      const sw = s('g', { style: 'cursor:pointer;touch-action:none', role: 'switch', 'aria-label': 'Schalter ' + name, 'aria-checked': !!v });
      sw.append(s('rect', { x: 12, y: py - 15, width: 30, height: 30, rx: 8, style: `fill:${v ? 'var(--accent)' : 'var(--surface)'};stroke:${v ? 'var(--accent)' : 'var(--line-2)'}`, 'stroke-width': 2 }));
      sw.append(s('text', { x: 27, y: py + 5, 'text-anchor': 'middle', 'font-size': 14, 'font-weight': 700, class: 'dg-mono', style: `fill:${v ? '#fff' : 'var(--muted)'}` }, String(v)));
      sw.addEventListener('pointerdown', e => { e.preventDefault(); inVal[k] ^= 1; render(); });
      gG.append(sw, s('text', { x: 27, y: py - 21, 'text-anchor': 'middle', 'font-size': 12, 'font-weight': 700 }, name));
      gG.append(s('line', { x1: 42, x2: px, y1: py, y2: py, stroke: col(v), 'stroke-width': 3.2 }));
      port(gP, 'i:' + k, px, py, true);
    });
    // Ausgangsknoten
    T().outs.forEach((name, k) => {
      const [px, py] = outPos(k), src = st.conn['out:' + k], v = src ? value(src, inputs, memo) : 0;
      gG.append(s('line', { x1: px, x2: W - 38, y1: py, y2: py, stroke: src ? col(v) : 'var(--line-2)', 'stroke-width': 3.2 }));
      gG.append(s('circle', { cx: W - 24, cy: py, r: 14, style: `fill:${v ? 'var(--good)' : 'var(--surface)'};stroke:${v ? 'var(--good)' : 'var(--line-2)'}`, 'stroke-width': 2 }));
      gG.append(s('text', { x: W - 24, y: py + 5, 'text-anchor': 'middle', 'font-size': 14, 'font-weight': 700, style: `fill:${v ? '#fff' : 'var(--muted)'}` }, String(v)));
      gG.append(s('text', { x: W - 24, y: py - 21, 'text-anchor': 'middle', 'font-size': 12, 'font-weight': 700 }, name));
      port(gP, 'out:' + k, px, py, false, !!src);
    });
    // Gatter
    for (const g of st.gates) {
      const grp = s('g', { style: 'cursor:grab;touch-action:none', 'data-id': g.id });
      const d = GATES[g.type], hh = d.n === 1 ? 36 : gh2;
      const sym = drawGate(grp, g.type, g.x, g.y, { w: gw, h: hh, pin: 12 });
      sym.rect.setAttribute('stroke', g.id === sel ? 'var(--accent)' : 'var(--ink)'); sym.rect.setAttribute('stroke-width', g.id === sel ? 3 : 2);
      const hit = s('rect', { x: g.x - 6, y: g.y - 6, width: gw + 12, height: hh + 12, rx: 8, fill: 'transparent' });
      grp.prepend(hit);
      grp.append(s('text', { x: g.x + gw / 2, y: g.y - 7, 'text-anchor': 'middle', 'font-size': 10, style: 'fill:var(--muted)' }, g.id));
      grp.addEventListener('pointerdown', e => {
        if (e.target.closest('[data-port]')) return;
        e.preventDefault(); sel = g.id; const p = point(e); drag = { id: g.id, dx: p.x - g.x, dy: p.y - g.y, moved: false }; svg.setPointerCapture(e.pointerId); render();
      });
      gG.append(grp);
      for (let p = 0; p < d.n; p++) port(gP, `${g.id}:${p}`, sym.ins[p][0], sym.ins[p][1], false, !!st.conn[`${g.id}:${p}`]);
      port(gP, g.id, sym.out[0], sym.out[1], true);
    }
    paintInfo(); delBtn.disabled = !sel;
  }
  function port(g, id, x, y, isSource, wired) {
    const grp = s('g', { 'data-port': id, style: 'cursor:crosshair;touch-action:none' });
    grp.append(s('circle', { cx: x, cy: y, r: 16, fill: 'transparent' }));
    const active = pending === id;
    if (isSource) grp.append(s('circle', { cx: x, cy: y, r: active ? 7.5 : 5.5, style: `fill:${active ? 'var(--accent-2)' : 'var(--ink-2)'}` }));
    else grp.append(s('circle', { cx: x, cy: y, r: 5.5, style: `fill:${wired ? 'var(--ink-2)' : 'var(--surface)'};stroke:${wired ? 'var(--ink-2)' : 'var(--warn)'}`, 'stroke-width': 2 }));
    grp.addEventListener('pointerdown', e => {
      e.preventDefault(); e.stopPropagation();
      const pt = point(e);
      if (isSource) { const was = pending === id; pending = id; drag = { port: id, start: pt, moved: false, was }; rubber = pt; svg.setPointerCapture(e.pointerId); render(); return; }
      // Eingangspunkt
      if (pending) { if (connect(pending, id)) pending = null; rubber = null; render(); return; }
      const cur = ST().conn[id];
      if (cur) { delete ST().conn[id]; pending = cur; drag = { port: cur, start: pt, moved: false }; rubber = pt; svg.setPointerCapture(e.pointerId); render(); }
    });
    g.append(grp);
  }
  svg.addEventListener('pointermove', e => {
    if (!drag) return; const p = point(e);
    if (drag.id) { const g = gateById(drag.id); g.x = Math.max(78, Math.min(W - 78 - gw - 22, p.x - drag.dx)); g.y = Math.max(14, Math.min(H - 60, p.y - drag.dy)); render(); return; }
    if (Math.hypot(p.x - drag.start.x, p.y - drag.start.y) > 8) drag.moved = true;
    if (drag.moved) { rubber = p; render(); }
  });
  const end = e => {
    if (!drag) return;
    const d = drag; drag = null;
    if (d.port && d.moved && pending) {
      const sink = nearestSink(point(e));
      if (sink) { if (connect(pending, sink)) pending = null; } else pending = null;
    }
    if (d.port && !d.moved && d.was) pending = null;
    rubber = null; render();
  };
  svg.addEventListener('pointerup', end); svg.addEventListener('pointercancel', end);
  svg.addEventListener('pointerdown', e => { if (e.target === svg || e.target.tagName === 'svg') { sel = null; pending = null; render(); } });

  // ── Prüfung ──
  function paintInfo() {
    const st = ST(), T_ = T(), nIn = T_.ins.length, combos = [...Array(2 ** nIn).keys()].map(i => nIn === 1 ? [i] : [i >> 1, i & 1]);
    let ok = true; const cur = nIn === 1 ? inVal[0] : inVal[0] * 2 + inVal[1];
    const tbl = h('table', { class: 'dg-tbl' });
    tbl.append(h('thead', {}, h('tr', {}, ...T_.ins.map(n => h('th', { text: n })), ...T_.outs.map(n => h('th', { text: n + ' soll' })), ...T_.outs.map(n => h('th', { text: n + ' dein' })))));
    const tb = h('tbody');
    combos.forEach((c, i) => {
      const want = T_.f(...c), memo = {}, got = T_.outs.map((_, k) => st.conn['out:' + k] ? value(st.conn['out:' + k], c, memo) : null);
      const row = h('tr', { class: i === cur ? 'cur' : '' }, ...c.map(v => h('td', { text: String(v) })), ...want.map(v => h('td', { text: String(v) })),
        ...got.map((v, k) => { const good = v === want[k]; if (!good) ok = false; return h('td', { class: v == null ? '' : good ? 'ok' : 'bad', text: v == null ? '–' : String(v) }); }));
      tb.append(row);
    });
    tbl.append(tb); tblBox.replaceChildren(tbl);
    const n = st.gates.length;
    const allOut = T_.outs.every((_, k) => st.conn['out:' + k]);
    const open = st.gates.reduce((a, g) => a + [...Array(GATES[g.type].n).keys()].filter(p => !st.conn[`${g.id}:${p}`]).length, 0);
    if (ok && allOut && n > 0) {
      status.innerHTML = `<b style="color:var(--good)">✓ Alle Zeilen stimmen</b> — mit ${n} Gatter${n === 1 ? '' : 'n'}` + (n <= T_.min ? ' (das ist das Minimum).' : `. Es geht mit ${T_.min}.`);
      if (!solved.has(tid)) { solved.add(tid); paintSeg(); gl.reach?.(tid); }
    } else {
      status.textContent = msg || `${n} Gatter · ${open} offene Eingänge${open ? ' (offene Eingänge werden als 0 gewertet)' : ''}. Tippe einen Ausgangspunkt (●), dann einen Eingangspunkt (○).`;
    }
  }
  paintSeg(); render();
  stage.__lb = { addGate, connect, get state() { return ST(); }, render, setInput(k, v) { inVal[k] = v; render(); }, select(k) { tid = k; paintSeg(); render(); }, solved };
}
