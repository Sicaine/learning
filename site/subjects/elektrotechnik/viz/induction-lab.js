// D20 induction-lab — Ein Stabmagnet fährt durch eine Spule: Fluss Φ(t), Induktionsspannung u(t) = −N·dΦ/dt, Lenzsche Bremswirkung.
// Modell: Der Fluss durch die Spule folgt einer Glockenkurve Φ(x) = ±Φ_m·exp(−(x/w)²) mit w = 2 cm (Magnet an der Spulenmitte: Maximum).
// Die Zeit läuft 1 : (T/3 s) gedehnt ab, damit auch ein schneller Durchgang (0,07 s) zu sehen ist; die Diagramme tragen die echte Zeit.
//
// params: { goals?: ['peak', 'pol'], Upeak?: 5 (V) }
//   peak — eine Spitzenspannung über Upeak erzeugen (mehr Windungen, schnellerer Magnet, stärkerer Magnet)
//   pol  — beide Polungen erleben: den Magnet einmal umdrehen (N rechts / N links) und jeweils durchfahren lassen
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { plot } from '../../../assets/js/vizkit/plot.js';
import { animate } from '../../../assets/js/vizkit/anim.js';
import { fmt } from '../../../assets/js/vizkit/si.js';
import { h, s, boxWidth } from '../../../assets/js/vizkit/base.js';

const WID = 0.02, XR = 0.1, NS = 400, SHOW = 3;      // Breite der Flussglocke (m), halbe Fahrstrecke (m), Stützstellen, Anzeigedauer (s)

export default function mount(stage, { params = {}, complete }) {
  const want = params.goals ?? ['peak', 'pol'], Upk = params.Upeak ?? 5;
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const W = boxWidth(root, 300, 640), Hh = Math.round(W * 0.42), cx = W / 2, cy = Hh * 0.52, SC = W * 0.4 / XR;   // px pro m
  const svg = s('svg', { viewBox: `0 0 ${W} ${Hh}`, class: 'vz-svg', role: 'img', 'aria-label': 'Magnet bewegt sich durch eine Spule', style: 'width:100%;height:auto;display:block;background:var(--surface-2);border:1px solid var(--line);border-radius:12px' });
  const defs = s('defs', {}, s('marker', { id: 'ind-f', viewBox: '0 0 10 10', refX: 8, refY: 5, markerWidth: 6, markerHeight: 6, orient: 'auto' }, s('path', { d: 'M0 0L10 5L0 10z', fill: 'var(--warn)' })),
    s('marker', { id: 'ind-v', viewBox: '0 0 10 10', refX: 8, refY: 5, markerWidth: 6, markerHeight: 6, orient: 'auto' }, s('path', { d: 'M0 0L10 5L0 10z', fill: 'var(--ink-2)' })));
  const gCoilBack = s('g'), gMag = s('g'), gCoilFront = s('g'), gArrows = s('g'), gText = s('g');
  svg.append(defs, gCoilBack, gMag, gCoilFront, gArrows, gText); root.append(h('div', {}, svg));

  const ui = controls(root, [
    { id: 'v', label: 'Geschwindigkeit v', unit: 'm/s', min: 0.1, max: 3, scale: 'log', value: 1, digits: 2 },
    { id: 'N', label: 'Windungen N', min: 10, max: 1000, scale: 'log', snap: 10, value: 200, format: v => Math.round(v) + '' },
    { id: 'phi', type: 'seg', label: 'Magnetstärke (Fluss Φ_m)', options: [[0.2e-3, 'schwach 0,2 mWb'], [0.5e-3, 'mittel 0,5 mWb'], [1e-3, 'stark 1 mWb']], value: 0.5e-3 },
    { id: 'ori', type: 'seg', label: 'Magnet', options: [[1, 'N-Pol rechts'], [-1, 'N-Pol links']], value: 1 },
    { id: 'dir', type: 'seg', label: 'Bewegung', options: [[1, 'nach rechts →'], [-1, '← nach links']], value: 1 },
    { type: 'button', label: '▶ Nochmal durchfahren', onClick: () => restart() },
  ], () => restart());
  const out = readout(root, [{ id: 'u', label: 'u(t) jetzt', hl: true }, { id: 'pk', label: 'Spitzenwert |u|', hl: true }, { id: 'T', label: 'Dauer des Durchgangs' }, { id: 'f', label: 'Fluss Φ jetzt' }]);
  const pBox = h('div'); root.append(pBox);
  const P1 = plot(pBox, { h: 150, x: { unit: 's', label: 't', min: 0 }, y: { unit: 'Wb', label: 'Φ', include: [0] } });
  const P2 = plot(pBox, { h: 190, x: { unit: 's', label: 't', min: 0 }, y: { unit: 'V', label: 'u', include: [0] } });
  const gl = [];
  if (want.includes('peak')) gl.push({ id: 'peak', label: `Spitzenspannung über ${fmt(Upk, 'V')} erzeugen` });
  if (want.includes('pol')) gl.push({ id: 'pol', label: 'beide Polungen erlebt (Magnet umdrehen)' });
  const g = gl.length ? goals(root, gl, () => complete?.()) : null;
  const note = h('p', { class: 'vz-note', 'aria-live': 'polite' }); root.append(note);

  let D = null, prog = 0, lastK = -1, seen = { 1: false, '-1': false };
  function compute() {
    const v = ui.values, T = 2 * XR / v.v, t = new Float64Array(NS), x = new Float64Array(NS), phi = new Float64Array(NS), u = new Float64Array(NS);
    for (let k = 0; k < NS; k++) {
      t[k] = T * k / (NS - 1); x[k] = -v.dir * XR + v.dir * v.v * t[k];
      phi[k] = v.ori * v.phi * Math.exp(-((x[k] / WID) ** 2));
    }
    for (let k = 0; k < NS; k++) {   // u = −N·dΦ/dt (Zählpfeil in +x-Richtung des Flusses)
      const kk = Math.min(NS - 2, Math.max(1, k)), dphi = (phi[kk + 1] - phi[kk - 1]) / (t[kk + 1] - t[kk - 1]);
      u[k] = -v.N * dphi;
    }
    let pk = 0; for (const q of u) pk = Math.max(pk, Math.abs(q));
    return { t, x, phi, u, pk, T };
  }
  function restart() {
    D = compute(); prog = 0; lastK = -1;
    P1.clear(); P2.clear();
    const t = D.t;
    P1.line('phi0', t, D.phi, { color: 'var(--accent)', width: 2, opacity: 0.25, hover: false, dash: '2 4' });
    P1.line('phi', t.subarray(0, 1), D.phi.subarray(0, 1), { color: 'var(--accent)', label: 'Φ(t)' });
    P2.line('u0', t, D.u, { color: 'var(--warn)', width: 2, opacity: 0.25, hover: false, dash: '2 4' });
    P2.line('u', t.subarray(0, 1), D.u.subarray(0, 1), { color: 'var(--warn)', label: 'u(t) = −N·dΦ/dt' });
    P1.range({ x: [0, D.T] }); P2.range({ x: [0, D.T] });
    out.set({ pk: fmt(D.pk, 'V'), T: fmt(D.T, 's') });
    note.textContent = 'Der Magnet nähert sich: Der Fluss in der Spule wächst, es entsteht eine Spannung, die dem Anwachsen entgegenwirkt (Lenz). Beim Entfernen kehrt sich die Polung um — die Fläche unter dem ersten und dem zweiten Puls ist gleich groß.';
    drawFrame(); anim.once?.(); anim.play?.();
  }

  function drawScene(k) {
    const v = ui.values, x = D.x[k], u = D.u[k];
    gCoilBack.replaceChildren(); gMag.replaceChildren(); gCoilFront.replaceChildren(); gArrows.replaceChildren(); gText.replaceChildren();
    const nw = Math.min(10, Math.max(3, Math.round(Math.log10(v.N) * 3))), cw = 0.06 * SC, ch = Hh * 0.2;
    for (let q = 0; q < nw; q++) {
      const xc = cx - cw / 2 + cw * (q + 0.5) / nw;
      gCoilBack.append(s('path', { d: `M${xc} ${cy - ch}A${cw / nw * 0.8} ${ch} 0 0 0 ${xc} ${cy + ch}`, fill: 'none', stroke: 'var(--warn)', 'stroke-width': 2.4, opacity: 0.6 }));
      gCoilFront.append(s('path', { d: `M${xc} ${cy + ch}A${cw / nw * 0.8} ${ch} 0 0 0 ${xc} ${cy - ch}`, fill: 'none', stroke: 'var(--warn)', 'stroke-width': 2.4 }));
    }
    // Magnet (Länge 4 cm)
    const mx = cx + x * SC, ml = 0.04 * SC, mh = Hh * 0.13;
    const nCol = 'var(--bad)', sCol = 'var(--accent)', left = v.ori > 0 ? sCol : nCol, right = v.ori > 0 ? nCol : sCol;
    gMag.append(s('rect', { x: mx - ml / 2, y: cy - mh / 2, width: ml / 2, height: mh, fill: left, rx: 2 }), s('rect', { x: mx, y: cy - mh / 2, width: ml / 2, height: mh, fill: right, rx: 2 }),
      s('text', { x: mx - ml / 4, y: cy + 5, 'text-anchor': 'middle', style: 'font:700 14px var(--sans)', fill: '#fff' }, v.ori > 0 ? 'S' : 'N'),
      s('text', { x: mx + ml / 4, y: cy + 5, 'text-anchor': 'middle', style: 'font:700 14px var(--sans)', fill: '#fff' }, v.ori > 0 ? 'N' : 'S'));
    // Bewegungspfeil
    gArrows.append(s('line', { x1: mx, y1: cy - mh - 16, x2: mx + v.dir * 34, y2: cy - mh - 16, stroke: 'var(--ink-2)', 'stroke-width': 2.4, 'marker-end': 'url(#ind-v)' }),
      s('text', { x: mx + v.dir * 17, y: cy - mh - 22, 'text-anchor': 'middle', style: 'font:600 12px var(--mono)', fill: 'var(--ink-2)' }, 'v'));
    // Lenzsche Bremskraft: entgegen der Bewegung, ∝ |u|
    const a = D.pk > 0 ? Math.abs(u) / D.pk : 0;
    if (a > 0.04) gArrows.append(s('line', { x1: mx, y1: cy + mh + 18, x2: mx - v.dir * (8 + 44 * a), y2: cy + mh + 18, stroke: 'var(--warn)', 'stroke-width': 3, 'marker-end': 'url(#ind-f)' }),
      s('text', { x: mx - v.dir * (8 + 44 * a) / 2, y: cy + mh + 36, 'text-anchor': 'middle', style: 'font:600 12px var(--sans)', fill: 'var(--warn)' }, 'Bremskraft (Lenz)'));
    // Spannungsanzeige
    gText.append(s('rect', { x: W - 134, y: 10, width: 124, height: 34, rx: 8, fill: 'var(--surface)', stroke: 'var(--line-2)' }),
      s('text', { x: W - 122, y: 25, style: 'font:500 11px var(--sans)', fill: 'var(--muted)' }, 'Voltmeter'),
      s('text', { x: W - 20, y: 39, 'text-anchor': 'end', style: 'font:600 15px var(--mono)', fill: u < 0 ? 'var(--accent)' : 'var(--warn)' }, fmt(u, 'V')));
    gText.append(s('text', { x: 10, y: Hh - 8, style: 'font:500 12px var(--sans)', fill: 'var(--muted)' }, `Spule mit N = ${Math.round(v.N)} Windungen (gezeichnet: ${nw})`));
  }

  function drawFrame() {
    if (!D) return;
    const k = Math.max(0, Math.min(NS - 1, Math.round(prog * (NS - 1))));
    if (k === lastK) return; lastK = k;
    const sub = a => a.subarray(0, k + 1);
    P1.set('phi', sub(D.t), sub(D.phi)); P2.set('u', sub(D.t), sub(D.u));
    P1.vline('now', D.t[k], { color: 'var(--ink)', dash: '', width: 1.4 }); P2.vline('now', D.t[k], { color: 'var(--ink)', dash: '', width: 1.4 });
    drawScene(k);
    out.set({ u: fmt(D.u[k], 'V'), f: fmt(D.phi[k], 'Wb') });
    if (g) {
      if (want.includes('peak') && Math.abs(D.u[k]) >= Upk) g.reach('peak');
      // erste Spitze (k am Maximum der ersten Halbwelle) bestimmt die Polung dieses Durchgangs
      const kFirst = D.u.findIndex(q => Math.abs(q) >= D.pk * 0.9);
      if (k >= kFirst && kFirst >= 0) { seen[Math.sign(D.u[kFirst])] = true; if (seen[1] && seen[-1]) g.reach('pol'); }
    }
  }
  const anim = animate(root, dt => { if (!D || prog >= 1) return; prog = Math.min(1, prog + dt / SHOW); drawFrame(); });
  restart();
}
