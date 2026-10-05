// Die drei Transistor-Grundschaltungen im Vergleich: Emitter-, Kollektor- (Emitterfolger) und Basisschaltung.
// Kleinsignalrechnung bei 1 kHz am DC-Arbeitspunkt (AC-Analyse der Schaltungs-Engine) mit Quellwiderstand R_S und Last R_L.
// params: { questions?: [...] } — Standard: drei Aufgaben (kleinster Ausgangswiderstand / Phasendrehung 180° / kleinster Eingangswiderstand).
import { Netlist, acSweep } from '../../../assets/js/vizkit/circuit.js';
import { controls, goals } from '../../../assets/js/vizkit/controls.js';
import { fmt } from '../../../assets/js/vizkit/si.js';
import { h, s } from '../../../assets/js/vizkit/base.js';

const BIG = 100e-6, F = 1e3, VCC = 12;
const KINDS = [['E', 'Emitterschaltung'], ['C', 'Kollektorschaltung'], ['B', 'Basisschaltung']];

/** Netzliste einer Grundschaltung inkl. Quelle (R_S) und Last (R_L); Knoten in, out, src. */
export function configNet(kind, RS, RL) {
  const n = new Netlist().V('Vcc', 'vcc', '0', VCC).V('Vs', 'src', '0', { ac: 1 }).R('RS', 'src', 'in', RS);
  if (kind === 'E') n.C('C1', 'in', 'b', BIG).R('R1', 'vcc', 'b', 47e3).R('R2', 'b', '0', 10e3).R('Rc', 'vcc', 'c', 2.2e3).R('Re', 'e', '0', 680).C('CE', 'e', '0', BIG).Q('Q1', 'c', 'b', 'e', { bf: 150 }).C('C2', 'c', 'out', BIG);
  if (kind === 'C') n.C('C1', 'in', 'b', BIG).R('R1', 'vcc', 'b', 15e3).R('R2', 'b', '0', 18e3).Q('Q1', 'vcc', 'b', 'e', { bf: 150 }).R('Re', 'e', '0', 2.2e3).C('C2', 'e', 'out', BIG);
  if (kind === 'B') n.C('C1', 'in', 'e', BIG).R('R1', 'vcc', 'b', 47e3).R('R2', 'b', '0', 10e3).C('CB', 'b', '0', BIG).R('Rc', 'vcc', 'c', 2.2e3).R('Re', 'e', '0', 680).Q('Q1', 'c', 'b', 'e', { bf: 150 }).C('C2', 'c', 'out', BIG);
  return n.R('RL', 'out', '0', RL);
}

/** Kenngrößen bei 1 kHz: { av (komplex re/im von u_out/u_in), rin, rout, tot (|u_L/u_q|) } */
export function analyse(kind, RS, RL) {
  const a = acSweep(configNet(kind, RS, RL), [F]);
  const hv = a.h('out', 'in'), vin = a.mag('in')[0], iin = a.i('RS').mag[0], tot = a.mag('out')[0];
  const open = acSweep(configNet(kind, RS, 1e9), [F]).mag('out')[0];
  return { re: hv.re[0], im: hv.im[0], av: hv.mag[0], rin: vin / iin, rout: Math.max(0, RL * (open / tot - 1)), tot };
}

const QUESTIONS = [
  { id: 'rout', text: 'Welche Schaltung hat den kleinsten Ausgangswiderstand (Impedanzwandler)?', pick: r => argmin(r, k => r[k].rout), ok: 'Richtig: Der Emitterfolger hat einen sehr niedrigen Ausgangswiderstand (≈ r_e plus der durch β geteilte Quellwiderstand).' },
  { id: 'phase', text: 'Welche Schaltung dreht die Phase des Signals um 180°?', pick: r => argmin(r, k => r[k].re), ok: 'Richtig: Die Emitterschaltung invertiert — mehr Basisstrom bedeutet mehr Kollektorstrom, also weniger Kollektorspannung.' },
  { id: 'rin', text: 'Welche Schaltung hat den kleinsten Eingangswiderstand?', pick: r => argmin(r, k => r[k].rin), ok: 'Richtig: In der Basisschaltung speist man in den Emitter ein — dort sieht man nur r_e ≈ U_T/I_C, einige 10 Ω.' },
];
function argmin(r, f) { let b = 'E'; for (const k of ['E', 'C', 'B']) if (f(r[k]) < f(r[b])) b = k; return b; }

export default function mount(stage, { complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const ui = controls(root, [
    { id: 'RS', label: 'Quellwiderstand R_S', unit: 'Ω', min: 50, max: 100e3, value: 1e3, scale: 'log', snap: 'E12' },
    { id: 'RL', label: 'Lastwiderstand R_L', unit: 'Ω', min: 100, max: 100e3, value: 10e3, scale: 'log', snap: 'E12' },
  ], run);
  root.append(h('style', { text: `.vk-cmp{border:1px solid var(--line);border-radius:12px;background:var(--surface);overflow:hidden;margin:10px 0}
.vk-cmp-row{display:grid;grid-template-columns:minmax(78px,1.15fr) repeat(3,1fr);gap:6px;align-items:center;padding:6px 8px;border-top:1px solid var(--line);font-size:.86rem}
.vk-cmp-row:first-child{border-top:0}.vk-cmp-row.hl{background:var(--surface-2)}.vk-cmp-l{color:var(--muted);font-size:.78rem}
.vk-cmp-c{text-align:center;font-family:var(--mono);font-variant-numeric:tabular-nums}.vk-cmp-btn{width:100%;padding:6px 2px;font-size:.78rem}` }));
  const tbl = h('div', { class: 'vk-cmp' }); root.append(tbl);
  const qbox = h('div', { class: 'vz-note' }), fb = h('p', { class: 'vz-note' });
  root.append(qbox);
  const g = goals(root, QUESTIONS.map(q => ({ id: q.id, label: q.id === 'rout' ? 'kleinster R_aus' : q.id === 'phase' ? '180° gedreht' : 'kleinster R_ein' })), () => complete?.());
  root.append(fb);
  let qi = 0, res = {};

  const sine = (amp, phaseInv, col, clip) => { const A = Math.min(amp, clip); let d = ''; for (let k = 0; k <= 40; k++) { const x = 4 + k * 3, y = 30 - (phaseInv ? -1 : 1) * A * Math.sin(k / 40 * 4 * Math.PI); d += (k ? 'L' : 'M') + x + ' ' + y.toFixed(1); } return s('path', { d, fill: 'none', stroke: col, 'stroke-width': 2 }); };
  const ohm = v => v >= 1e5 ? '> 100 kΩ' : fmt(v, 'Ω', 3);

  function pick(kind) {
    if (qi >= QUESTIONS.length) return;
    const q = QUESTIONS[qi];
    if (q.pick(res) === kind) { g.reach(q.id); fb.textContent = q.ok; qi++; if (qi < QUESTIONS.length) qbox.textContent = 'Frage ' + (qi + 1) + ' von 3: ' + QUESTIONS[qi].text; else qbox.textContent = 'Alle drei Fragen beantwortet.'; }
    else fb.textContent = 'Nicht ganz — vergleiche die Zeilen der Tabelle noch einmal und probiere andere R_S/R_L aus.';
  }
  function run() {
    const { RS, RL } = ui.values;
    res = {}; for (const [k] of KINDS) res[k] = analyse(k, RS, RL);
    tbl.replaceChildren();
    const row = (label, cells, hl) => h('div', { class: 'vk-cmp-row' + (hl ? ' hl' : '') }, h('span', { class: 'vk-cmp-l', text: label }), ...cells.map(c => h('span', { class: 'vk-cmp-c' }, c)));
    tbl.append(h('div', { class: 'vk-cmp-row head' }, h('span', { class: 'vk-cmp-l', text: 'Frage antippen:' }), ...KINDS.map(([k, name]) => h('button', { type: 'button', class: 'btn small vk-cmp-btn', title: name, onclick: () => pick(k) }, k === 'E' ? 'Emitter' : k === 'C' ? 'Kollektor' : 'Basis'))));
    tbl.append(row('Kurvenform', KINDS.map(([k]) => { const svg = s('svg', { viewBox: '0 0 128 60', width: '100%', height: 44, role: 'img', 'aria-label': 'Eingang grau, Ausgang farbig' }); svg.append(sine(8, false, 'var(--line-2)', 28), sine(8 * res[k].av, res[k].re < 0, 'var(--accent)', 27)); return svg; })));
    tbl.append(row('Phase u₂ zu u₁', KINDS.map(([k]) => (res[k].re < 0 ? '180°' : '0°'))));
    tbl.append(row('|v_U| = u₂/u₁', KINDS.map(([k]) => res[k].av.toFixed(res[k].av < 10 ? 2 : 0).replace('.', ',')), true));
    tbl.append(row('Eingangswiderstand', KINDS.map(([k]) => ohm(res[k].rin))));
    tbl.append(row('Ausgangswiderstand', KINDS.map(([k]) => ohm(res[k].rout))));
    tbl.append(row('u_Last / u_Quelle', KINDS.map(([k]) => res[k].tot.toFixed(res[k].tot < 10 ? 3 : 1).replace('.', ','))));
    if (!qbox.textContent) qbox.textContent = 'Frage 1 von 3: ' + QUESTIONS[0].text;
    root.insertBefore(qbox, g.el);
  }
  run();
}
