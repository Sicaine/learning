// D19 magnet-field-lab — Magnetfeld um einen geraden Leiter, in einer Zylinderspule und in einem Ringkern.
// Feldlinienbild (schematisch), H = I·N/l, B = μ₀μ_r·H mit Sättigungsknick des Kerns und ein kleines B(H)-Diagramm.
//
// params: { goals?: ['b50', 'sat'], geom?: 'wire' | 'coil' | 'toroid', Bgoal?: 0.05 (T) }
//   b50 — im Ringkern (mittlerer Umfang l_m = π·2,6 cm ≈ 8,2 cm) eine Flussdichte von 50 mT (±5 %) erzeugen
//   sat — einen Kern (Ferrit oder Eisen) in die Sättigung treiben (B erreicht B_s)
// Kerne: Luft μ_r = 1; Ferrit μ_r = 800, B_s = 0,35 T; Eisen μ_r = 4000, B_s = 1,6 T (typische Richtwerte, keine Norm).
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { plot } from '../../../assets/js/vizkit/plot.js';
import { fmt } from '../../../assets/js/vizkit/si.js';
import { h, s, boxWidth } from '../../../assets/js/vizkit/base.js';

const MU0 = 4 * Math.PI * 1e-7;
const CORES = { air: { label: 'Luft', mur: 1, Bs: Infinity }, ferrit: { label: 'Ferrit', mur: 800, Bs: 0.35 }, eisen: { label: 'Eisen', mur: 4000, Bs: 1.6 } };
const L_COIL = 0.10;                    // Länge der Zylinderspule (m)
const L_TOR = Math.PI * 0.026;          // mittlerer Umfang des Ringkerns (m), d_m = 2,6 cm wie in der Prüfungsaufgabe
const bOf = (H, c) => { const lin = MU0 * c.mur * H; return lin <= c.Bs ? lin : c.Bs + MU0 * (H - c.Bs / (MU0 * c.mur)); };

export default function mount(stage, { params = {}, complete }) {
  const want = params.goals ?? ['b50', 'sat'], Bgoal = params.Bgoal ?? 0.05;
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const W = boxWidth(root, 300, 640), Hh = Math.round(W * 0.56), cx = W / 2, cy = Hh / 2;
  const svg = s('svg', { viewBox: `0 0 ${W} ${Hh}`, class: 'vz-svg', role: 'img', 'aria-label': 'Magnetfeldlinien', style: 'width:100%;height:auto;display:block;background:var(--surface-2);border:1px solid var(--line);border-radius:12px' });
  const defs = s('defs', {}, s('marker', { id: 'mf-arr', viewBox: '0 0 10 10', refX: 6, refY: 5, markerWidth: 7, markerHeight: 7, orient: 'auto' }, s('path', { d: 'M0 0L10 5L0 10z', fill: 'var(--accent)' })));
  const gBack = s('g'), gLines = s('g'), gFront = s('g');
  svg.append(defs, gBack, gLines, gFront); root.append(h('div', {}, svg));

  const defsCtl = [
    { id: 'geom', type: 'seg', label: 'Anordnung', options: [['wire', 'Gerader Leiter'], ['coil', 'Zylinderspule'], ['toroid', 'Ringkern']], value: params.geom ?? 'toroid' },
    { id: 'I', label: 'Strom I', unit: 'A', min: 0, max: 5, step: 0.05, value: 1 },
    { id: 'N', label: 'Windungen N', min: 1, max: 500, scale: 'log', snap: 1, value: 10, format: v => Math.round(v) + '' },
    { id: 'core', type: 'seg', label: 'Kern', options: Object.entries(CORES).map(([k, c]) => [k, c.label]), value: 'air' },
    { id: 'r', label: 'Abstand r vom Leiter', unit: 'm', min: 1e-3, max: 5e-2, scale: 'log', value: 1e-2, format: v => fmt(v, 'm', { prefix: 'm' }) },
    { id: 'dir', type: 'seg', label: 'Stromrichtung', options: [['out', 'aus der Zeichenebene ⊙'], ['in', 'in die Zeichenebene ⊗']], value: 'out' },
  ];
  const ui = controls(root, defsCtl, draw);
  const out = readout(root, [{ id: 'H', label: 'H', hl: true }, { id: 'B', label: 'B', hl: true }, { id: 'mu', label: 'μ_r (wirksam)' }, { id: 'st', label: 'Kern' }]);
  const pBox = h('div'); root.append(pBox);
  const P = plot(pBox, { h: 190, x: { unit: 'A/m', label: 'H', min: 0 }, y: { unit: 'T', label: 'B', min: 0 } });
  const gl = [];
  if (want.includes('b50')) gl.push({ id: 'b50', label: `Ringkern: B = ${fmt(Bgoal, 'T')} (±5 %)` });
  if (want.includes('sat')) gl.push({ id: 'sat', label: 'Kern in die Sättigung treiben' });
  const g = gl.length ? goals(root, gl, () => complete?.()) : null;
  const note = h('p', { class: 'vz-note', 'aria-live': 'polite' }); root.append(note);

  // Pfeil in der Mitte eines Pfades: kurzes Zusatzstück mit marker-end
  const arrowAt = (x, y, ang, op) => s('path', { d: `M${(x - 6 * Math.cos(ang)).toFixed(1)} ${(y - 6 * Math.sin(ang)).toFixed(1)}L${(x + 0.5 * Math.cos(ang)).toFixed(1)} ${(y + 0.5 * Math.sin(ang)).toFixed(1)}`, stroke: 'var(--accent)', 'stroke-width': 2, opacity: op, 'marker-end': 'url(#mf-arr)', fill: 'none' });

  function draw() {
    const v = ui.values, core = CORES[v.geom === 'wire' ? 'air' : v.core], N = v.geom === 'wire' ? 1 : Math.round(v.N);
    ['N', 'core'].forEach(id => ui.el.querySelector(`[data-id="${id}"]`)?.style.setProperty('display', v.geom === 'wire' ? 'none' : ''));
    ui.el.querySelector('[data-id="r"]')?.style.setProperty('display', v.geom === 'wire' ? '' : 'none');
    ui.el.querySelector('[data-id="dir"]')?.style.setProperty('display', v.geom === 'toroid' ? 'none' : '');
    const I = v.I;
    let Hf = 0;
    if (v.geom === 'wire') Hf = I / (2 * Math.PI * v.r);
    else if (v.geom === 'coil') Hf = N * I / L_COIL;
    else Hf = N * I / L_TOR;
    const B = v.geom === 'wire' ? MU0 * Hf : bOf(Hf, core);
    const sat = core.Bs !== Infinity && B > core.Bs * 1.0001 - 1e-12 && MU0 * core.mur * Hf > core.Bs;
    const strength = Math.min(1, 0.25 + 0.75 * Math.min(1, I / 3));
    gBack.replaceChildren(); gLines.replaceChildren(); gFront.replaceChildren();
    const sgn = v.dir === 'out' ? 1 : -1;
    if (v.geom === 'wire') drawWire(v, strength, sgn);
    else if (v.geom === 'coil') drawCoil(v, N, core, strength, sgn);
    else drawToroid(v, N, core, strength);
    out.set({ H: fmt(Hf, 'A/m'), B: fmt(B, 'T'), mu: Hf > 0 ? Math.round(B / (MU0 * Hf)) + '' : '–', st: v.geom === 'wire' ? 'Luft' : core.label + (sat ? ' – gesättigt' : '') });
    out.hl('st', sat);
    // B(H)-Diagramm
    if (v.geom === 'wire') { pBox.style.display = 'none'; }
    else {
      pBox.style.display = '';
      const Hsat = core.Bs === Infinity ? 0 : core.Bs / (MU0 * core.mur), Hmax = Math.max(Hf * 1.25, Hsat * 3, 50);
      const xs = [0, ...(Hsat && Hsat < Hmax ? [Hsat] : []), Hmax];
      P.clear();
      P.line('bh', xs, xs.map(x => bOf(x, core)), { color: 'var(--accent)', width: 2.2, label: 'B(H) ' + core.label });
      P.marker('op', Hf, B, { label: sat ? 'Arbeitspunkt (gesättigt)' : 'Arbeitspunkt' });
      P.range({ x: [0, Hmax] });
    }
    note.textContent = v.geom === 'wire'
      ? `Rechte-Hand-Regel: Daumen in Stromrichtung, die Finger zeigen die Feldrichtung. Bei ${v.dir === 'out' ? 'Strom aus der Zeichenebene (⊙) laufen die Feldlinien gegen den Uhrzeigersinn' : 'Strom in die Zeichenebene (⊗) laufen die Feldlinien im Uhrzeigersinn'}. B = μ₀·I/(2π·r).`
      : v.geom === 'coil'
        ? `Im Inneren einer langen Zylinderspule ist das Feld nahezu homogen, H = N·I/l (hier l = 10 cm). Von N = ${N} Windungen sind nur einige gezeichnet. ${sat ? 'Der Kern ist gesättigt: Mehr Strom bringt kaum mehr B.' : ''}`
        : `Im Ringkern verlaufen die Feldlinien als geschlossene Kreise im Kern, H = N·I/l_m mit l_m = π·2,6 cm ≈ 8,2 cm. Von N = ${N} Windungen sind nur einige gezeichnet. ${sat ? 'Der Kern ist gesättigt: Der Knick im B(H)-Diagramm ist erreicht.' : ''}`;
    if (g) {
      if (v.geom === 'toroid' && Math.abs(B / Bgoal - 1) <= 0.05) g.reach('b50');
      if (v.geom !== 'wire' && core.Bs !== Infinity && sat) g.reach('sat');
    }
  }

  function drawWire(v, strength, sgn) {
    const maxR = Hh * 0.46, rv = 26 + (maxR - 26) * Math.log10(v.r / 1e-3) / Math.log10(50);
    const radii = [34, 56, 80, 106, 134].filter(r => r < maxR + 10);
    for (const r of radii) {
      gLines.append(s('circle', { cx, cy, r, fill: 'none', stroke: 'var(--accent)', 'stroke-width': 1.6, opacity: 0.55 * strength + 0.1 }));
      for (const a0 of [0.8, 2.9, 5.0]) {   // Pfeile tangential: ⊙ → gegen den Uhrzeigersinn (in Bildschirmkoordinaten: Winkel nimmt ab)
        const a = a0 + r * 0.01, x = cx + r * Math.cos(a), y = cy + r * Math.sin(a), ang = a + (sgn > 0 ? -Math.PI / 2 : Math.PI / 2);
        gLines.append(arrowAt(x, y, ang, 0.5 * strength + 0.35));
      }
    }
    // Messkreis
    gFront.append(s('circle', { cx, cy, r: rv, fill: 'none', stroke: 'var(--warn)', 'stroke-width': 1.4, 'stroke-dasharray': '4 4' }));
    const px = cx + rv, py = cy;
    gFront.append(s('circle', { cx: px, cy: py, r: 5, fill: 'var(--warn)' }), s('text', { x: px + 9, y: py - 8, style: 'font:600 12px var(--mono)', fill: 'var(--warn)' }, 'r'));
    gFront.append(s('line', { x1: cx, y1: cy, x2: px - 5, y2: py, stroke: 'var(--warn)', 'stroke-width': 1.2 }));
    // Leiter
    gFront.append(s('circle', { cx, cy, r: 13, fill: 'var(--surface)', stroke: 'var(--ink-2)', 'stroke-width': 2.2 }));
    if (sgn > 0) gFront.append(s('circle', { cx, cy, r: 3.2, fill: 'var(--ink-2)' }));
    else gFront.append(s('path', { d: `M${cx - 6} ${cy - 6}L${cx + 6} ${cy + 6}M${cx + 6} ${cy - 6}L${cx - 6} ${cy + 6}`, stroke: 'var(--ink-2)', 'stroke-width': 2.2 }));
    // Kompassnadeln
    for (const [a, r] of [[Math.PI * 1.25, 56], [Math.PI * 0.25, 80], [Math.PI * 0.75, 106]]) {
      const x = cx + r * Math.cos(a), y = cy + r * Math.sin(a), ang = a + (sgn > 0 ? -Math.PI / 2 : Math.PI / 2), dx = Math.cos(ang), dy = Math.sin(ang);
      gFront.append(s('line', { x1: x - dx * 9, y1: y - dy * 9, x2: x, y2: y, stroke: 'var(--ink-2)', 'stroke-width': 4, 'stroke-linecap': 'round' }),
        s('line', { x1: x, y1: y, x2: x + dx * 9, y2: y + dy * 9, stroke: 'var(--bad)', 'stroke-width': 4, 'stroke-linecap': 'round' }));
    }
    gFront.append(s('text', { x: 10, y: Hh - 10, style: 'font:500 12px var(--sans)', fill: 'var(--muted)' }, 'Draufsicht auf den Leiterquerschnitt; rote Nadelspitze = Nordpol'));
  }

  function drawCoil(v, N, core, strength, sgn) {
    const x0 = W * 0.2, x1 = W * 0.8, ch = Hh * 0.22, n = Math.min(N, 14), dxw = (x1 - x0) / n;
    // Kern
    if (v.core !== 'air') gBack.append(s('rect', { x: x0 - 8, y: cy - ch * 0.7, width: x1 - x0 + 16, height: ch * 1.4, rx: 4, fill: v.core === 'eisen' ? 'var(--ink-2)' : 'var(--muted)', opacity: 0.35, stroke: 'var(--ink-2)', 'stroke-width': 1 }));
    // Feldlinien: innen gerade, außen als Bögen zurück
    const op = 0.35 + 0.55 * strength, fl = sgn;
    const ys = [-0.5, -0.17, 0.17, 0.5].map(k => cy + k * ch);
    ys.forEach((y, i) => {
      const loop = Hh * (0.2 + 0.05 * Math.abs(i - 1.5)) * (i < 2 ? -1 : 1);
      const xa = x0 - 18, xb = x1 + 18, top = cy + loop * (1.0 + (Math.abs(i - 1.5) > 1 ? 0.35 : 0));
      const d = fl > 0 ? `M${xa} ${y}H${xb}C${xb + 70} ${y} ${xb + 70} ${top} ${(xa + xb) / 2} ${top}C${xa - 70} ${top} ${xa - 70} ${y} ${xa} ${y}` : `M${xb} ${y}H${xa}C${xa - 70} ${y} ${xa - 70} ${top} ${(xa + xb) / 2} ${top}C${xb + 70} ${top} ${xb + 70} ${y} ${xb} ${y}`;
      gLines.append(s('path', { d, fill: 'none', stroke: 'var(--accent)', 'stroke-width': 1.6, opacity: op, 'stroke-linecap': 'round' }));
      for (const fx of [0.3, 0.7]) { const xx = xa + (xb - xa) * fx; gLines.append(arrowAt(xx, y, fl > 0 ? 0 : Math.PI, op)); }
      const xm = (xa + xb) / 2; gLines.append(arrowAt(xm, top, fl > 0 ? Math.PI : 0, op));
    });
    // Windungen
    for (let k = 0; k < n; k++) {
      const xc = x0 + dxw * (k + 0.5);
      gFront.append(s('ellipse', { cx: xc, cy, rx: dxw * 0.28, ry: ch * 0.82, fill: 'none', stroke: 'var(--warn)', 'stroke-width': 2.4, opacity: 0.9 }));
    }
    gFront.append(s('text', { x: fl > 0 ? x1 + 28 : x0 - 28, y: cy + 5, 'text-anchor': 'middle', style: 'font:700 16px var(--sans)', fill: 'var(--bad)' }, 'N'),
      s('text', { x: fl > 0 ? x0 - 28 : x1 + 28, y: cy + 5, 'text-anchor': 'middle', style: 'font:700 16px var(--sans)', fill: 'var(--accent)' }, 'S'),
      s('text', { x: 10, y: Hh - 10, style: 'font:500 12px var(--sans)', fill: 'var(--muted)' }, `Schnitt durch die Spule: ${n} von ${N} Windungen gezeichnet`));
  }

  function drawToroid(v, N, core, strength) {
    const Ro = Hh * 0.4, Ri = Hh * 0.21, Rm = (Ro + Ri) / 2, n = Math.min(N, 28);
    gBack.append(s('circle', { cx, cy, r: Rm, fill: 'none', stroke: v.core === 'air' ? 'var(--line-2)' : v.core === 'eisen' ? 'var(--ink-2)' : 'var(--muted)', 'stroke-width': Ro - Ri, opacity: v.core === 'air' ? 0.35 : 0.4 }));
    const op = 0.35 + 0.55 * strength;
    for (const r of [Ri + (Ro - Ri) * 0.25, Rm, Ro - (Ro - Ri) * 0.25]) {
      gLines.append(s('circle', { cx, cy, r, fill: 'none', stroke: 'var(--accent)', 'stroke-width': 1.7, opacity: op }));
      for (const a of [0.4, 2.5, 4.6]) gLines.append(arrowAt(cx + r * Math.cos(a), cy + r * Math.sin(a), a + Math.PI / 2, op));
    }
    for (let k = 0; k < n; k++) {
      const a = (k / n) * Math.PI * 2, c = Math.cos(a), sn = Math.sin(a);
      gFront.append(s('line', { x1: cx + (Ri - 5) * c, y1: cy + (Ri - 5) * sn, x2: cx + (Ro + 5) * c, y2: cy + (Ro + 5) * sn, stroke: 'var(--warn)', 'stroke-width': 2.6, 'stroke-linecap': 'round', opacity: 0.85 }));
    }
    gFront.append(s('text', { x: cx, y: cy + 4, 'text-anchor': 'middle', style: 'font:600 12px var(--mono)', fill: 'var(--muted)' }, 'l_m ≈ 8,2 cm'),
      s('text', { x: 10, y: Hh - 10, style: 'font:500 12px var(--sans)', fill: 'var(--muted)' }, `Ringkern von oben: ${n} von ${N} Windungen gezeichnet`));
  }

  draw();
}
