// Leistungsdreieck: Wirk-, Blind- und Scheinleistung als rechtwinkliges Dreieck, optional mit Blindleistungskompensation.
// params: { mode?: 'triangle' (Standard) | 'comp', U?: V, f?: Hz (nur comp), P?, cos?, goals? }
//  - triangle: U, I, φ frei einstellen; Ziele: P = S (φ = 0), rein reaktiv (|φ| ≈ 90°), kapazitiv (φ < −30°).
//  - comp: Last mit festem P an U, f; Kompensationskondensator C_k parallel; Ziele: cos φ ≥ 0,95, Leitungsstrom < 5 A, Überkompensation erkennen.
// Vorzeichen: φ > 0 induktiv (Q > 0, nach oben), φ < 0 kapazitiv (Q < 0, nach unten).
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { fmt } from '../../../assets/js/vizkit/si.js';
import { h, s } from '../../../assets/js/vizkit/base.js';

const DEG = 180 / Math.PI, f1 = x => +x.toFixed(1);
const comma = (x, d = 2) => x.toFixed(d).replace('.', ',').replace('-', '−');

function arrow(x1, y1, x2, y2, col, w = 3, dash) {
  const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy);
  if (L < 2) return '';
  const ux = dx / L, uy = dy / L, hl = Math.min(11, L * 0.4), bx = x2 - ux * hl, by = y2 - uy * hl;
  return `<path d="M${f1(x1)} ${f1(y1)}L${f1(bx)} ${f1(by)}" stroke="${col}" stroke-width="${w}" fill="none" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>` +
    `<path d="M${f1(x2)} ${f1(y2)}L${f1(bx - uy * hl * .42)} ${f1(by + ux * hl * .42)}L${f1(bx + uy * hl * .42)} ${f1(by - ux * hl * .42)}Z" fill="${col}"/>`;
}

export default function mount(stage, { params = {}, complete }) {
  const mode = params.mode ?? 'triangle';
  const comp = mode === 'comp';
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const W = 460, H = 270, ox = 54, oy = H / 2;
  const svg = s('svg', { viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': 'Leistungsdreieck', style: 'width:100%;max-width:560px;display:block;margin:0 auto' });
  root.append(svg);

  const Ufix = params.U ?? 230, ffix = params.f ?? 50;
  const defs = comp ? [
    { id: 'P', label: 'Wirkleistung P', unit: 'W', min: 100, max: 3000, step: 50, value: params.P ?? 1000 },
    { id: 'cos', label: 'cos φ vorher (induktiv)', min: 0.5, max: 1, step: 0.01, value: params.cos ?? 0.7, format: v => comma(v) },
    { id: 'Ck', label: 'Kompensations-C parallel', unit: 'F', min: 0, max: 200e-6, step: 0.5e-6, value: 0, format: v => fmt(v, 'F') },
    { type: 'presets', items: [{ label: 'ohne C_k', values: { Ck: 0 } }, { label: 'C_k = 41,6 µF', values: { Ck: 41.5e-6 } }], reset: true },
  ] : [
    { id: 'U', label: 'Spannung U (eff.)', unit: 'V', min: 1, max: 400, step: 1, value: params.U ?? 230 },
    { id: 'I', label: 'Strom I (eff.)', unit: 'A', min: 0.1, max: 20, step: 0.1, value: params.I ?? 2 },
    { id: 'phi', label: 'Phasenwinkel φ', unit: '°', min: -90, max: 90, step: 1, value: params.phi ?? 37, format: v => (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(v) + '°' },
  ];
  const ui = controls(root, defs, run);
  const out = readout(root, comp ? [
    { id: 'c2', label: 'cos φ nachher', hl: true }, { id: 'i1', label: 'Leitungsstrom vorher' }, { id: 'i2', label: 'Leitungsstrom nachher', hl: true },
    { id: 'q1', label: 'Q vorher' }, { id: 'qc', label: 'Q des Kondensators' }, { id: 'q2', label: 'Q nachher' }, { id: 's2', label: 'S nachher' },
  ] : [
    { id: 's', label: 'S = U·I', hl: true }, { id: 'p', label: 'P = S·cos φ', hl: true }, { id: 'q', label: 'Q = S·sin φ', hl: true }, { id: 'cos', label: 'cos φ' }, { id: 'kind', label: 'Last' },
  ]);
  const gd = comp
    ? { target: 'cos φ ≥ 0,95 erreichen (noch induktiv)', current: 'Leitungsstrom unter 5 A drücken', over: 'Überkompensieren: Q wird kapazitiv' }
    : { pS: 'P = S: φ = 0° (reiner Wirkwiderstand)', pure: 'P ≈ 0: |φ| ≈ 90° (reine Blindlast)', cap: 'Kapazitive Last: φ < −30°' };
  const want = params.goals ?? Object.keys(gd);
  const g = goals(root, want.map(id => ({ id, label: gd[id] })), () => complete?.());

  const label = (x, y, t, col, anchor = 'middle') => `<text x="${f1(x)}" y="${f1(y)}" text-anchor="${anchor}" style="font:700 12px var(--sans);fill:${col}">${t}</text>`;
  function draw(P, Q1, Q2) {
    // Maßstab: P waagerecht, Q senkrecht (gleicher Maßstab)
    const Qm = Math.max(Math.abs(Q1), Math.abs(Q2), 1e-9);
    const k = Math.min((W - ox - 90) / Math.max(P, 1e-9), (H / 2 - 34) / Qm);
    const X = ox + P * k, Y1 = oy - Q1 * k, Y2 = oy - Q2 * k;
    let t = `<line x1="${ox - 20}" x2="${W - 16}" y1="${oy}" y2="${oy}" stroke="var(--line-2)"/><line x1="${ox}" x2="${ox}" y1="14" y2="${H - 14}" stroke="var(--line-2)"/>`;
    t += `<text x="${W - 16}" y="${oy + 16}" text-anchor="end" style="font:11px var(--mono);fill:var(--muted)">P (Wirk)</text><text x="${ox + 6}" y="22" style="font:11px var(--mono);fill:var(--muted)">Q induktiv ↑</text><text x="${ox + 6}" y="${H - 8}" style="font:11px var(--mono);fill:var(--muted)">Q kapazitiv ↓</text>`;
    const colQ = q => q >= 0 ? 'var(--accent-2)' : 'var(--warn)';
    if (comp) {
      t += arrow(ox, oy, X, Y1, 'var(--muted)', 2, '5 4') + arrow(X, oy, X, Y1, 'var(--muted)', 2, '5 4');
      t += label(X + 8, (oy + Y1) / 2 + 4, 'Q vorher', 'var(--muted)', 'start');
    }
    t += arrow(ox, oy, X, oy, 'var(--accent)', 3.4) + arrow(X, oy, X, Y2, colQ(Q2), 3.4) + arrow(ox, oy, X, Y2, 'var(--ink)', 3.4);
    const S = Math.hypot(P, Q2), phi = Math.atan2(Q2, P);
    t += label((ox + X) / 2, oy + (Q2 >= 0 ? 17 : -8), `P ${fmt(P, 'W')}`, 'var(--accent)');
    if (Math.abs(Q2) * k > 12) t += label(X + 8, (oy + Y2) / 2 + (comp ? -6 : 4), `Q ${fmt(Q2, 'var')}`, colQ(Q2), 'start');
    t += label((ox + X) / 2 - 8, (oy + Y2) / 2 - (Q2 >= 0 ? 10 : -20), `S ${fmt(S, 'VA')}`, 'var(--ink)', 'end');
    if (Math.abs(phi) > 0.02 && P * k > 40) {
      const r = 34;
      t += `<path d="M${ox + r} ${oy}A${r} ${r} 0 0 ${Q2 > 0 ? 0 : 1} ${f1(ox + r * Math.cos(phi))} ${f1(oy - r * Math.sin(phi))}" fill="none" stroke="var(--ink-2)" stroke-width="1.5"/>`;
      t += `<text x="${ox + r + 8}" y="${oy + (Q2 > 0 ? -7 : 16)}" style="font:600 11px var(--mono);fill:var(--ink)">φ ${comma(phi * DEG, 1)}°</text>`;
    }
    svg.innerHTML = t;
  }

  function run() {
    const v = ui.values;
    if (!comp) {
      const S = v.U * v.I, phi = v.phi / DEG, P = S * Math.cos(phi), Q = S * Math.sin(phi);
      draw(Math.max(P, S * 1e-6), Q, Q);
      out.set({ s: fmt(S, 'VA'), p: fmt(P, 'W'), q: fmt(Q, 'var'), cos: comma(Math.cos(phi)), kind: Math.abs(v.phi) < 1 ? 'ohmsch' : v.phi > 0 ? 'induktiv' : 'kapazitiv' });
      if (Math.abs(v.phi) <= 1) g.reach('pS');
      if (Math.abs(v.phi) >= 89) g.reach('pure');
      if (v.phi < -30) g.reach('cap');
    } else {
      const P = v.P, Q1 = P * Math.tan(Math.acos(v.cos)), QC = 2 * Math.PI * ffix * v.Ck * Ufix ** 2, Q2 = Q1 - QC;
      const S1 = Math.hypot(P, Q1), S2 = Math.hypot(P, Q2), c2 = P / S2, I1 = S1 / Ufix, I2 = S2 / Ufix;
      draw(P, Q1, Q2);
      out.set({ c2: comma(c2) + (Q2 < -1 ? ' (kapazitiv)' : Q2 > 1 ? ' (induktiv)' : ''), i1: fmt(I1, 'A'), i2: fmt(I2, 'A'), q1: fmt(Q1, 'var'), qc: fmt(QC, 'var'), q2: fmt(Q2, 'var'), s2: fmt(S2, 'VA') });
      if (c2 >= 0.949 && Q2 >= 0) g.reach('target');
      if (I2 < 5 && P >= 800) g.reach('current');
      if (Q2 < -50) g.reach('over');
    }
  }
  run();
}
