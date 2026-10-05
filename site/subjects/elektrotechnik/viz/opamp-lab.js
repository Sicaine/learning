// Operationsverstärker-Labor mit Modus-Presets (Netzliste + Schaltplan + Messung).
// params: { modes?: ['open','follower','inv','noninv','sum','integ'], mode?, goals?: ['cmp','lin','follow','limit','inv10','noninv11'], rails?: 12 }
// Modi ohne Zeitverlauf (open, follower, sum): Gleichspannungen + Übertragungskennlinie. Modi mit Zeitverlauf (inv, noninv, integ): Oszilloskop.
import { Netlist, dcSolve, transient, waves } from '../../../assets/js/vizkit/circuit.js';
import { drawSchematic } from '../../../assets/js/vizkit/schematic.js';
import { plot } from '../../../assets/js/vizkit/plot.js';
import { scope } from '../../../assets/js/vizkit/scope.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { fmt } from '../../../assets/js/vizkit/si.js';
import { h } from '../../../assets/js/vizkit/base.js';

const NAMES = { open: 'Ohne Rückkopplung', follower: 'Spannungsfolger', inv: 'Invertierend', noninv: 'Nichtinvertierend', sum: 'Summierer', integ: 'Integrator' };
const GOAL_TXT = {
  cmp: 'Ausgang an beiden Anschlägen gesehen (+ und −)',
  lin: 'Den linearen Bereich getroffen (Ausgang zwischen 1 und 5 V)',
  follow: 'Folger: Ausgang = Eingang bei mehr als 2 V',
  limit: 'Eingang über die Versorgung treiben: Ausgang bleibt stehen',
  inv10: 'Verstärkung −10 (±5 %)',
  noninv11: 'Verstärkung +11 (±5 %)',
};

// ── Schaltpläne (OA bei [8,6]: m (8,6), p (8,8), o (12,7)) ──
const OA = { id: 'OA1', type: 'OA', at: [8, 6] };
const outT = { id: 'out', type: 'TERM', at: [17, 7], label: 'u₂', labelPos: 'r' };
const feedbackTop = (el) => [{ ...el, at: [9, 2] }];
function specFor(mode, v) {
  switch (mode) {
    case 'open': return {
      parts: [OA, { id: 'tm', type: 'TERM', at: [3, 6], label: 'U₋', labelPos: 'l' }, { id: 'tp', type: 'TERM', at: [3, 8], label: 'U₊', labelPos: 'l' }, outT],
      wires: [{ pts: ['tm.a', 'OA1.m'], net: 'm' }, { pts: ['tp.a', 'OA1.p'], net: 'p' }, { pts: ['OA1.o', 'out.a'], net: 'out' }] };
    case 'follower': return {
      parts: [OA, { id: 'tp', type: 'TERM', at: [3, 8], label: 'u₁', labelPos: 'l' }, outT],
      wires: [{ pts: ['tp.a', 'OA1.p'], net: 'p' }, { pts: ['OA1.o', [14, 7], [14, 4], [6, 4], [6, 6], 'OA1.m'], net: 'out' }, { pts: [[14, 7], 'out.a'], net: 'out' }] };
    case 'inv': case 'integ': return {
      parts: [OA, { id: 'in', type: 'TERM', at: [0, 6], label: 'u₁', labelPos: 'l' }, { id: 'Rin', type: 'R', at: [2, 6], value: v.Rin, adjust: false },
        mode === 'inv' ? { id: 'Rf', type: 'R', at: [9, 3], value: v.Rf } : { id: 'C1', type: 'C', at: [9, 3], value: v.C },
        { id: 'g1', type: 'GND', at: [6, 8] }, outT],
      wires: [{ pts: ['in.a', 'Rin.a'], net: 'in' }, { pts: ['Rin.b', 'OA1.m'], net: 'm' }, { pts: [[7, 6], [7, 3], mode === 'inv' ? 'Rf.a' : 'C1.a'], net: 'm' },
        { pts: [mode === 'inv' ? 'Rf.b' : 'C1.b', [14, 3], [14, 7], 'OA1.o'], net: 'out' }, { pts: [[14, 7], 'out.a'], net: 'out' }, { pts: ['OA1.p', 'g1.a'], net: '0' }] };
    case 'noninv': return {
      parts: [OA, { id: 'tp', type: 'TERM', at: [0, 8], label: 'u₁', labelPos: 'l' }, { id: 'R1', type: 'R', at: [2, 6], value: v.R1 }, { id: 'g1', type: 'GND', at: [2, 6] },
        { id: 'Rf', type: 'R', at: [9, 3], value: v.Rf }, outT],
      wires: [{ pts: ['tp.a', 'OA1.p'], net: 'p' }, { pts: ['R1.b', 'OA1.m'], net: 'm' }, { pts: [[7, 6], [7, 3], 'Rf.a'], net: 'm' },
        { pts: ['Rf.b', [14, 3], [14, 7], 'OA1.o'], net: 'out' }, { pts: [[14, 7], 'out.a'], net: 'out' }] };
    case 'sum': return {
      parts: [OA, { id: 'i1', type: 'TERM', at: [0, 3], label: 'u₁', labelPos: 'l' }, { id: 'i2', type: 'TERM', at: [0, 6], label: 'u₂', labelPos: 'l' },
        { id: 'Ra', type: 'R', at: [2, 3], value: v.Ra }, { id: 'Rb', type: 'R', at: [2, 6], value: v.Rb }, { id: 'Rf', type: 'R', at: [9, 2], value: v.Rf },
        { id: 'g1', type: 'GND', at: [6, 8] }, outT],
      wires: [{ pts: ['i1.a', 'Ra.a'], net: 'u1' }, { pts: ['i2.a', 'Rb.a'], net: 'u2' }, { pts: ['Rb.b', 'OA1.m'], net: 'm' }, { pts: ['Ra.b', [7, 3], [7, 6]], net: 'm' },
        { pts: [[7, 3], [7, 2], 'Rf.a'], net: 'm' }, { pts: ['Rf.b', [14, 2], [14, 7], 'OA1.o'], net: 'out' }, { pts: [[14, 7], 'out.a'], net: 'out' }, { pts: ['OA1.p', 'g1.a'], net: '0' }] };
  }
}

export default function mount(stage, { params = {}, complete, md }) {
  const modes = params.modes ?? ['open', 'follower'];
  const rail0 = params.rails ?? 12;
  const goalIds = params.goals ?? (modes.includes('open') ? ['cmp', 'lin', 'follow', 'limit'] : ['inv10', 'noninv11']);
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  let mode = params.mode && modes.includes(params.mode) ? params.mode : modes[0];
  const seg = modes.length > 1 ? controls(root, [{ id: 'mode', type: 'seg', options: modes.map(m => [m, NAMES[m]]), value: mode }], v => { mode = v.mode; build(); }) : null;
  const body = h('div'); root.append(body);
  const g = goals(root, goalIds.map(id => ({ id, label: GOAL_TXT[id] })), () => complete?.());
  const seen = { pos: false, neg: false };
  let sch, ui, out, sc, pl, net, ctx;

  const sat = (A0, rails, ud) => { const c = (rails[0] + rails[1]) / 2, hh = (rails[1] - rails[0]) / 2; return c + hh * Math.tanh(A0 * ud / hh); };

  function build() {
    body.replaceChildren(); sc = pl = null;
    const holder = h('div'), mid = h('div'); body.append(holder, mid);
    const R = n => ({ id: n, unit: 'Ω', scale: 'log', snap: 'E12' });
    let defs;
    if (mode === 'open') defs = [
      { id: 'um', label: 'U₋', unit: 'V', min: -5, max: 5, step: 0.05, value: 2.5 },
      { id: 'up', label: 'U₊ (grob)', unit: 'V', min: -5, max: 5, step: 0.05, value: 2.5 },
      { id: 'fine', label: 'U₊ Feinregler', unit: 'V', min: -1e-3, max: 1e-3, step: 1e-5, value: 0 },
      { id: 'A0', label: 'Leerlaufverstärkung A₀', min: 1e3, max: 1e6, value: 1e5, scale: 'log', format: v => fmt(v, '', 2) },
      { id: 'rail', label: 'Versorgung ±', unit: 'V', min: 5, max: 15, step: 1, value: rail0 },
    ];
    else if (mode === 'follower') defs = [
      { id: 'up', label: 'Eingang u₁', unit: 'V', min: -12, max: 12, step: 0.1, value: 1 },
      { id: 'rail', label: 'Versorgung ±', unit: 'V', min: 5, max: 15, step: 1, value: 5 },
    ];
    else if (mode === 'inv') defs = [
      { ...R('Rin'), label: 'R₁', min: 100, max: 1e5, value: 2.2e3 }, { ...R('Rf'), label: 'R₂', min: 1e3, max: 1e6, value: 10e3 },
      { id: 'A', label: 'Eingangsamplitude', unit: 'V', min: 0.05, max: 3, step: 0.05, value: 0.5 }, { id: 'f', label: 'Frequenz', unit: 'Hz', min: 100, max: 5e3, value: 1e3, scale: 'log' },
    ];
    else if (mode === 'noninv') defs = [
      { ...R('R1'), label: 'R₁ (nach Masse)', min: 100, max: 1e5, value: 10e3 }, { ...R('Rf'), label: 'R₂ (Rückkopplung)', min: 1e3, max: 1e6, value: 47e3 },
      { id: 'A', label: 'Eingangsamplitude', unit: 'V', min: 0.05, max: 3, step: 0.05, value: 0.5 }, { id: 'f', label: 'Frequenz', unit: 'Hz', min: 100, max: 5e3, value: 1e3, scale: 'log' },
    ];
    else if (mode === 'sum') defs = [
      { ...R('Ra'), label: 'R₁', min: 1e3, max: 1e5, value: 10e3 }, { ...R('Rb'), label: 'R₂', min: 1e3, max: 1e5, value: 10e3 }, { ...R('Rf'), label: 'R_f', min: 1e3, max: 1e5, value: 10e3 },
      { id: 'u1', label: 'u₁', unit: 'V', min: -3, max: 3, step: 0.1, value: 1 }, { id: 'u2', label: 'u₂', unit: 'V', min: -3, max: 3, step: 0.1, value: 0.5 },
    ];
    else defs = [
      { ...R('Rin'), label: 'R', min: 1e3, max: 1e5, value: 10e3 }, { id: 'C', label: 'C', unit: 'F', min: 1e-9, max: 1e-6, value: 100e-9, scale: 'log', snap: 'E12' },
      { id: 'A', label: 'Rechteck-Amplitude', unit: 'V', min: 0.1, max: 3, step: 0.1, value: 1 }, { id: 'f', label: 'Frequenz', unit: 'Hz', min: 100, max: 5e3, value: 1e3, scale: 'log' },
    ];
    const init = Object.fromEntries(defs.map(d => [d.id, d.value]));
    sch = drawSchematic(holder, specFor(mode, { Rin: init.Rin ?? 1e3, Rf: init.Rf ?? 10e3, R1: init.R1, C: init.C ?? 1e-7, Ra: init.Ra, Rb: init.Rb }));
    if (mode === 'open' || mode === 'follower') {
      pl = plot(mid, { h: 260, x: { unit: 'V', label: mode === 'open' ? 'U_diff = U₊ − U₋' : 'u₁', min: mode === 'open' ? -1e-3 : -12, max: mode === 'open' ? 1e-3 : 12 }, y: { unit: 'V', label: 'U_aus', min: -16, max: 16 } });
    } else if (mode !== 'sum') {
      sc = scope(mid, { channels: [{ id: 'in', label: 'u₁', vdiv: 1 }, { id: 'out', label: 'u₂', vdiv: 5 }], trigger: { source: 'in', level: 0 }, timeDiv: 0.5e-3 });
    }
    ui = controls(body, defs, run);
    const items = { open: [['uo', 'U_aus', 1], ['ud', 'U_diff'], ['st', 'Zustand']], follower: [['uo', 'U_aus', 1], ['st', 'Zustand']],
      inv: [['g', 'Verstärkung −R₂/R₁', 1], ['gm', 'gemessen'], ['st', 'Ausgang']], noninv: [['g', 'Verstärkung 1 + R₂/R₁', 1], ['gm', 'gemessen'], ['st', 'Ausgang']],
      sum: [['uo', 'U_aus', 1], ['th', 'Soll −(R_f/R₁·u₁ + R_f/R₂·u₂)']], integ: [['pp', 'Ausgang Spitze-Spitze', 1], ['th', 'Theorie A·T/(2RC)'], ['st', 'Ausgang']] }[mode];
    out = readout(body, items.map(([id, label, hl]) => ({ id, label, hl: !!hl })));
    run();
  }

  const num = x => x.toFixed(1).replace('.', ',');
  function run() {
    const v = ui.values, rails0 = [-(v.rail ?? rail0), v.rail ?? rail0];
    if (mode === 'open') {
      const ud = v.up + v.fine - v.um;
      const n = new Netlist().V('Vp', 'p', '0', v.up + v.fine).V('Vm', 'm', '0', v.um).OA('OA1', 'p', 'm', 'out', { rails: rails0, gain: v.A0 });
      const r = dcSolve(n), uo = r.v.out;
      const xs = Array.from({ length: 201 }, (_, k) => -1e-3 + k * 1e-5);
      pl.line('k', xs, xs.map(x => sat(v.A0, rails0, x)), { color: 'var(--accent)' });
      pl.marker('op', Math.max(-1e-3, Math.min(1e-3, ud)), uo, { label: 'jetzt' });
      sch.setState({ v: { p: v.up, m: v.um, out: uo, '0': 0 }, i: {} });
      const st = Math.abs(uo) > 0.97 * v.rail ? (uo > 0 ? 'oberer Anschlag' : 'unterer Anschlag') : 'linearer Bereich';
      out.set({ uo: fmt(uo, 'V'), ud: fmt(ud, 'V'), st });
      if (uo > 0.97 * v.rail) seen.pos = true; if (uo < -0.97 * v.rail) seen.neg = true;
      if (seen.pos && seen.neg) g.reach('cmp');
      if (Math.abs(uo) >= 1 && Math.abs(uo) <= 5 && Math.abs(ud) < 1e-3) g.reach('lin');
    } else if (mode === 'follower') {
      const rails = [-v.rail, v.rail];
      const n = new Netlist().V('Vp', 'p', '0', v.up).OA('OA1', 'p', 'out', 'out', { rails });
      const r = dcSolve(n), uo = r.v.out;
      const xs = Array.from({ length: 121 }, (_, k) => -12 + k * 0.2);
      pl.line('k', xs, xs.map(x => Math.max(-v.rail, Math.min(v.rail, x))), { color: 'var(--accent)' });
      pl.marker('op', v.up, uo, { label: 'jetzt' });
      sch.setState({ v: { p: v.up, out: uo, '0': 0 }, i: {} });
      const lim = Math.abs(v.up) > v.rail + 0.3;
      out.set({ uo: fmt(uo, 'V'), st: lim ? 'begrenzt durch Versorgung' : 'folgt dem Eingang' });
      if (Math.abs(v.up) > 2 && !lim && Math.abs(uo - v.up) < 0.01 * Math.abs(v.up)) g.reach('follow');
      if (lim && Math.abs(uo) < Math.abs(v.up) - 0.3) g.reach('limit');
    } else if (mode === 'sum') {
      const n = new Netlist().V('V1', 'a', '0', v.u1).V('V2', 'b', '0', v.u2).R('Ra', 'a', 'm', v.Ra).R('Rb', 'b', 'm', v.Rb).R('Rf', 'm', 'out', v.Rf).OA('OA1', '0', 'm', 'out', { rails: [-12, 12] });
      const r = dcSolve(n), th = -(v.Rf / v.Ra * v.u1 + v.Rf / v.Rb * v.u2);
      ['Ra', 'Rb', 'Rf'].forEach(k => sch.set(k, { value: v[k] }));
      sch.setState({ v: { u1: v.u1, u2: v.u2, m: r.v.m, out: r.v.out, '0': 0 }, i: {} });
      out.set({ uo: fmt(r.v.out, 'V') + (Math.abs(th) > 11.5 ? ' (begrenzt)' : ''), th: fmt(th, 'V') });
    } else {
      const f = v.f, T = 1 / f, dt = T / 100;
      let n, gain, extra = {};
      if (mode === 'inv') { n = new Netlist().V('V1', 'in', '0', { wave: waves.sine(v.A, f) }).R('Rin', 'in', 'm', v.Rin).R('Rf', 'm', 'out', v.Rf).OA('OA1', '0', 'm', 'out', { rails: [-rail0, rail0] }); gain = -v.Rf / v.Rin; }
      else if (mode === 'noninv') { n = new Netlist().V('V1', 'in', '0', { wave: waves.sine(v.A, f) }).R('R1', 'm', '0', v.R1).R('Rf', 'm', 'out', v.Rf).OA('OA1', 'in', 'm', 'out', { rails: [-rail0, rail0] }); gain = 1 + v.Rf / v.R1; }
      else {
        const pp = v.A * T / (2 * v.Rin * v.C);
        n = new Netlist().V('V1', 'in', '0', { wave: waves.square(v.A, f) }).R('Rin', 'in', 'm', v.Rin).C('C1', 'm', 'out', v.C, -Math.min(pp, 2 * rail0) / 2).OA('OA1', '0', 'm', 'out', { rails: [-rail0, rail0] });
        extra = { pp };
      }
      const tr = transient(n, { tstop: 6 * T, dt, uic: mode === 'integ' }), k0 = 200;
      const ts = tr.t.subarray(k0), vin = tr.v.in.subarray(k0), vo = tr.v.out.subarray(k0);
      sc.setSignal('in', { t: ts, v: vin }); sc.setSignal('out', { t: ts, v: vo });
      const tdivs = [1e-4, 2e-4, 5e-4, 1e-3, 2e-3, 5e-3];
      sc.set({ timeDiv: tdivs.reduce((b, x) => Math.abs(Math.log(x / (T / 3))) < Math.abs(Math.log(b / (T / 3))) ? x : b) });
      let hi = -Infinity, lo = Infinity; for (const x of vo) { hi = Math.max(hi, x); lo = Math.min(lo, x); }
      let hiI = -Infinity, loI = Infinity; for (const x of vin) { hiI = Math.max(hiI, x); loI = Math.min(loI, x); }
      const clip = Math.max(hi, -lo) > rail0 * 0.97;
      ['Rin', 'Rf', 'R1', 'C'].forEach(k => { if (v[k] != null && sch.get(k)) sch.set(k, { value: v[k] }); });
      const kk = tr.n - 1 - 50; sch.setState({ v: Object.fromEntries(Object.entries(tr.v).map(([nm, a]) => [nm, a[kk]])), i: Object.fromEntries(Object.entries(tr.i).map(([nm, a]) => [nm, a[kk]])) });
      if (mode === 'integ') out.set({ pp: fmt(hi - lo, 'V'), th: fmt(extra.pp, 'V'), st: clip ? 'übersteuert' : 'linear' });
      else out.set({ g: num(gain), gm: num((hi - lo) / (hiI - loI) * (gain < 0 ? -1 : 1)) + (clip ? ' (begrenzt)' : ''), st: clip ? 'übersteuert' : 'linear' });
      if (mode === 'inv' && Math.abs(gain / -10 - 1) < 0.05 && !clip) g.reach('inv10');
      if (mode === 'noninv' && Math.abs(gain / 11 - 1) < 0.05 && !clip) g.reach('noninv11');
    }
  }
  build();
}
