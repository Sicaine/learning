// D21 flyback-lab — Spule (L mit Wicklungswiderstand R) wird mit einem Schalter abgeschaltet: Abschaltspitze, Funke, Freilaufdiode, RC-Glied.
// Der Strom I₀ = U/R fließt vor dem Öffnen. Beim Öffnen muss die Spule ihren Strom weitertreiben: u = L·di/dt. Das Schaltergehäuse hat
// eine parasitäre Kapazität C_p = 200 pF; die Schaltstrecke schlägt bei 300 V durch (Funke, als Z-Diode modelliert).
// Gerechnet wird mit einem kleinen eigenen Zeitschritt-Modell (Runge-Kutta): Spule, Wicklungswiderstand, C_p, Funkenstrecke als Spannungsbegrenzer.
// Die Zeitachse des Diagramms beginnt im Moment des Öffnens und ist auf den jeweiligen Vorgang zugeschnitten.
//
// params: { goals?: ['spark', 'tame'], Uarc?: 300 (V), Utame?: 50 (V), U?: 12 (V) }
//   spark — ohne Schutz die Funkenspannung (≈ 300 V) erzeugen
//   tame  — mit Freilaufdiode oder RC-Glied die Spitze unter Utame halten (bei einem Strom von mindestens 100 mA)
import { drawSchematic } from '../../../assets/js/vizkit/schematic.js';
import { plot } from '../../../assets/js/vizkit/plot.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { fmt } from '../../../assets/js/vizkit/si.js';
import { h } from '../../../assets/js/vizkit/base.js';

const CP = 200e-12, RS = 47, CS = 1e-6;

export default function mount(stage, { params = {}, complete }) {
  const want = params.goals ?? ['spark', 'tame'], Uarc = params.Uarc ?? 300, Utame = params.Utame ?? 50;
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const schHost = h('div'); root.append(schHost);
  let sch = null, schKind = '';
  function drawSch(kind, v) {
    if (kind === schKind && sch) { sch.set('V1', { value: v.U }); sch.set('L1', { value: v.L }); sch.set('R1', { value: v.R }); return; }
    schKind = kind; schHost.replaceChildren();
    const parts = [
      { id: 'V1', type: 'VBAT', at: [2, 4], rot: 90, value: v.U, label: 'U', labelPos: 'l' },
      { id: 'L1', type: 'L', at: [6, 2], value: v.L, label: 'L' },
      { id: 'R1', type: 'R', at: [12, 2], value: v.R, label: 'R' },
      { id: 'S1', type: 'SW', at: [18, 2], rot: 90, closed: false, label: 'S', labelPos: 'r' },
      { type: 'GND', at: [10, 10] },
    ];
    const wires = [
      { pts: ['V1.p', [2, 2], 'L1.a'] }, { pts: ['L1.b', 'R1.a'] }, { pts: ['R1.b', 'S1.a'] },
      { pts: ['V1.n', [2, 10], [18, 10], [18, 6]] },
    ];
    if (kind === 'diode') {
      parts.push({ id: 'D1', type: 'D', at: [14, 6], rot: 180, label: 'D', labelPos: 'b' });
      wires.push({ pts: [[4, 2], [4, 6], 'D1.k'] }, { pts: ['D1.a', [16, 6], [16, 2]] });
    }
    if (kind === 'rc') {
      parts.push({ id: 'RS', type: 'R', at: [22, 2], rot: 90, value: RS, label: 'R_S', labelPos: 'r' }, { id: 'CS', type: 'C', at: [22, 6], rot: 90, value: CS, label: 'C_S', labelPos: 'r' });
      wires.push({ pts: [[18, 2], 'RS.a'] }, { pts: ['RS.b', 'CS.a'] }, { pts: ['CS.b', [22, 10], [18, 10]] });
    }
    sch = drawSchematic(schHost, { parts, wires });
  }

  const ui = controls(root, [
    { id: 'prot', type: 'seg', label: 'Schutzbeschaltung', options: [['none', 'ohne Schutz'], ['diode', 'Freilaufdiode'], ['rc', 'RC-Glied (47 Ω + 1 µF)']], value: 'none' },
    { id: 'L', label: 'Induktivität L', unit: 'H', min: 1e-4, max: 0.1, scale: 'log', snap: 'E12', value: 10e-3 },
    { id: 'R', label: 'Wicklungswiderstand R', unit: 'Ω', min: 10, max: 1e3, scale: 'log', snap: 'E12', value: 47 },
    { id: 'U', label: 'Spannung U', unit: 'V', min: 5, max: 24, step: 1, value: params.U ?? 12 },
  ], run);
  const out = readout(root, [{ id: 'I0', label: 'Strom vor dem Öffnen I₀ = U/R', hl: true }, { id: 'W', label: 'Energie ½·L·I₀²' }, { id: 'pk', label: 'Spitze an der Schaltstrecke', hl: true }, { id: 'tau', label: 'τ = L/R' }]);
  const plotBox = h('div'); root.append(plotBox);
  const P1 = plot(plotBox, { h: 210, x: { unit: 's', label: 't (ab Öffnen)', min: 0 }, y: { unit: 'V', label: 'Spannung an S', include: [0] } });
  const P2 = plot(plotBox, { h: 160, x: { unit: 's', label: 't (ab Öffnen)', min: 0 }, y: { unit: 'A', label: 'Spulenstrom i', include: [0] } });
  const gl = [];
  if (want.includes('spark')) gl.push({ id: 'spark', label: `Ohne Schutz: Funke bei ${fmt(Uarc, 'V')}` });
  if (want.includes('tame')) gl.push({ id: 'tame', label: `Mit Schutz: Spitze unter ${fmt(Utame, 'V')} (bei ≥ 100 mA)` });
  const g = gl.length ? goals(root, gl, () => complete?.()) : null;
  const note = h('p', { class: 'vz-note', 'aria-live': 'polite' }); root.append(note);

  function run() {
    const v = ui.values, I0 = v.U / v.R, tau = v.L / v.R, W0 = 0.5 * v.L * I0 * I0;
    drawSch(v.prot, v);
    let tstop, dt;
    if (v.prot === 'diode') { tstop = 5 * tau; dt = tau / 400; }
    else if (v.prot === 'rc') { const t0 = Math.sqrt(v.L * CS); tstop = Math.max(12 * t0, 8 * RS * CS); dt = tstop / 1500; }
    else { const tarc = v.L * I0 / Math.max(1, Uarc - v.U), t0 = Math.sqrt(v.L * CP); tstop = Math.max(3 * tarc, 8 * t0); dt = Math.min(tstop / 2500, t0 / 25); }
    const nSteps = Math.min(40000, Math.ceil(tstop / dt)); dt = tstop / nSteps;
    const stride = Math.max(1, Math.floor(nSteps / 1500)), nOut = Math.floor(nSteps / stride) + 1;
    const t = new Float64Array(nOut), vy = new Float64Array(nOut), il = new Float64Array(nOut);
    // Zustände: i (Spulenstrom), y (Spannung am Schalterknoten, nur ohne RC), vc (C_S)
    let i = I0, y = 0, vc = 0, o = 0, done = false, arcOn = false;
    const withC = v.prot !== 'rc';
    const f = (i_, y_, vc_) => {
      const yy = withC ? y_ : vc_ + RS * i_;           // mit RC-Glied trägt R_S + C_S den ganzen Strom (C_p vernachlässigt)
      return [(v.U - i_ * v.R - yy) / v.L, withC ? i_ / CP : 0, withC ? 0 : i_ / CS];
    };
    for (let k = 0; k <= nSteps; k++) {
      const yv = withC ? y : vc + RS * i;
      if (k % stride === 0 && o < nOut) { t[o] = k * dt; vy[o] = yv; il[o] = i; o++; }
      if (k === nSteps) break;
      if (done) continue;
      const k1 = f(i, y, vc), k2 = f(i + dt / 2 * k1[0], y + dt / 2 * k1[1], vc + dt / 2 * k1[2]), k3 = f(i + dt / 2 * k2[0], y + dt / 2 * k2[1], vc + dt / 2 * k2[2]), k4 = f(i + dt * k3[0], y + dt * k3[1], vc + dt * k3[2]);
      i += dt / 6 * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]); y += dt / 6 * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]); vc += dt / 6 * (k1[2] + 2 * k2[2] + 2 * k3[2] + k4[2]);
      if (v.prot === 'diode') { if (y > v.U + 0.7) y = v.U + 0.7; if (y < -0.7) y = -0.7; if (i <= 0) { i = 0; y = v.U; done = true; } }
      else if (withC) { if (y >= Uarc && i > 0) { y = Uarc; arcOn = true; } if (arcOn && i <= 0) { i = 0; y = v.U; done = true; } }
    }
    let pk = 0; for (let q = 0; q < o; q++) pk = Math.max(pk, vy[q]);
    for (let q = o; q < nOut; q++) { t[q] = tstop; vy[q] = vy[o - 1]; il[q] = il[o - 1]; }
    P1.clear(); P2.clear();
    P1.line('u', t, vy, { color: 'var(--accent)', width: 2, label: 'u an der Schaltstrecke' });
    P1.hline('u0', v.U, { label: 'U', color: 'var(--muted)', dash: '3 5', width: 1 });
    if (pk > 0.5 * Uarc) P1.hline('arc', Uarc, { label: 'Durchschlag (Funke)', color: 'var(--bad)', dash: '5 4', width: 1.2 });
    P2.line('i', t, il, { color: 'var(--warn)', width: 2, label: 'i(t) in der Spule' });
    P1.range({ x: [0, tstop] }); P2.range({ x: [0, tstop] });
    const spark = v.prot !== 'diode' && pk >= 0.98 * Uarc;
    out.set({ I0: fmt(I0, 'A'), W: fmt(W0, 'J'), pk: fmt(pk, 'V'), tau: fmt(tau, 's') });
    out.hl('pk', pk > 2 * v.U);
    note.textContent = v.prot === 'none'
      ? (spark ? `Ohne Schutz: Die Spule will ihren Strom von ${fmt(I0, 'A')} weitertreiben; da die Schaltstrecke offen ist, steigt die Spannung, bis die Luftstrecke bei ${fmt(Uarc, 'V')} durchschlägt (Funke). Die Energie ${fmt(W0, 'J')} verbrennt im Lichtbogen.` : `Ohne Schutz: Spitze ${fmt(pk, 'V')} — die Energie ½·L·I₀² reicht hier nicht für einen Funken, aber die Spannung liegt weit über U = ${fmt(v.U, 'V')}.`)
      : v.prot === 'diode'
        ? `Mit Freilaufdiode: Der Strom fließt durch Spule, R und Diode weiter und klingt mit τ = L/R = ${fmt(tau, 's')} ab. Die Spannung an S steigt nur auf U + 0,7 V = ${fmt(v.U + 0.7, 'V')}.`
        : `Mit RC-Glied: Der Strom lädt zunächst C_S (${fmt(CS, 'F')}) und fließt dann über R_S ab; die Energie der Spule landet in C_S und R_S. Je größer C_S, desto kleiner die Spitze.`;
    if (g) {
      if (v.prot === 'none' && spark) g.reach('spark');
      if (v.prot !== 'none' && I0 >= 0.1 && pk < Utame) g.reach('tame');
    }
  }
  run();
}
