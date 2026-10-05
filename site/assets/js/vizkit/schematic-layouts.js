// vizkit/schematic-layouts.js — fertige Schaltplan-Layouts mit passender Netzliste (gleiche Bauteilnamen!).
//
//   const { spec, net } = layouts.rc({ R: 1e3, C: 100e-9, wave: waves.sine(1, 1e3) });
//   const sch = drawSchematic(stage, spec);                 // Schaltplan
//   const sim = createSim(net, { dt: 2e-6 });               // Simulation
//   sch.setState({ v: sim.voltages(), i: sim.currents() }); // Schaltplan live färben
//
// Verfügbar: divider, rc, tank (Parallelschwingkreis), halfWave, bridge, bjt (Emitterschaltung), opamp (invertierend).
import { Netlist, waves } from './circuit.js';

const adj = (min, max, snap = 'E12') => ({ min, max, scale: 'log', snap });

/** Spannungsteiler: V1, R1, R2; Knoten in, out */
function divider(p = {}) {
  const { V = 10, R1 = 1e3, R2 = 2.2e3, adjust = true } = p;
  const spec = {
    parts: [
      { id: 'V1', type: 'V', at: [2, 3], rot: 90, value: V },
      { id: 'R1', type: 'R', at: [6, 3], value: R1, adjust: adjust && adj(100, 1e5) },
      { id: 'R2', type: 'R', at: [12, 3], rot: 90, value: R2, adjust: adjust && adj(100, 1e5) },
      { type: 'GND', at: [7, 9] },
      { id: 'out', type: 'TERM', at: [15, 3], label: 'U₂', labelPos: 'r' },
    ],
    wires: [
      { pts: ['V1.p', 'R1.a'], net: 'in' }, { pts: ['R1.b', 'R2.a', 'out.a'], net: 'out' }, { pts: ['V1.n', [2, 9], [12, 9], 'R2.b'], net: '0' },
    ],
  };
  const net = new Netlist().V('V1', 'in', '0', V).R('R1', 'in', 'out', R1).R('R2', 'out', '0', R2);
  return { spec, net };
}

/** RC-Glied: V1 (Quelle, optional wave), R1, C1; Knoten in, out */
function rc(p = {}) {
  const { R = 1e3, C = 100e-9, wave = waves.square(1, 1e3, { offset: 1 }), adjust = true } = p;
  const spec = {
    parts: [
      { id: 'V1', type: 'VAC', at: [2, 3], rot: 90, label: 'u₁' },
      { id: 'R1', type: 'R', at: [6, 3], value: R, adjust: adjust && adj(100, 1e5) },
      { id: 'C1', type: 'C', at: [12, 3], rot: 90, value: C, adjust: adjust && adj(1e-9, 1e-5) },
      { type: 'GND', at: [7, 9] },
      { id: 'out', type: 'TERM', at: [15, 3], label: 'u₂', labelPos: 'r' },
    ],
    wires: [
      { pts: ['V1.a', 'R1.a'], net: 'in' }, { pts: ['R1.b', 'C1.a', 'out.a'], net: 'out' }, { pts: ['V1.b', [2, 9], [12, 9], 'C1.b'], net: '0' },
    ],
  };
  const net = new Netlist().V('V1', 'in', '0', { wave, ac: 1 }).R('R1', 'in', 'out', R).C('C1', 'out', '0', C);
  return { spec, net };
}

/** Parallelschwingkreis, über R1 gespeist: V1, R1, L1, C1; Knoten in, n */
function tank(p = {}) {
  const { R = 1e3, L = 10e-3, C = 100e-9, wave = waves.sine(1, 5e3), adjust = true } = p;
  const spec = {
    parts: [
      { id: 'V1', type: 'VAC', at: [2, 3], rot: 90, label: 'u₁' },
      { id: 'R1', type: 'R', at: [5, 3], value: R, adjust: adjust && adj(100, 1e5) },
      { id: 'L1', type: 'L', at: [11, 3], rot: 90, value: L, adjust: adjust && adj(1e-4, 1) },
      { id: 'C1', type: 'C', at: [15, 3], rot: 90, value: C, adjust: adjust && adj(1e-9, 1e-5) },
      { type: 'GND', at: [8, 9] },
    ],
    wires: [
      { pts: ['V1.a', 'R1.a'], net: 'in' }, { pts: ['R1.b', [11, 3], [15, 3]], net: 'n' }, { pts: ['L1.a', [11, 3]], net: 'n' },
      { pts: ['L1.b', [11, 9], [15, 9], 'C1.b'], net: '0' }, { pts: ['V1.b', [2, 9], [11, 9]], net: '0' },
    ],
  };
  const net = new Netlist().V('V1', 'in', '0', { wave, ac: 1 }).R('R1', 'in', 'n', R).L('L1', 'n', '0', L).C('C1', 'n', '0', C);
  return { spec, net };
}

/** Einweggleichrichter mit Siebelko und Last: V1, D1, C1, RL; Knoten in, out */
function halfWave(p = {}) {
  const { Vp = 10, f = 50, C = 470e-6, RL = 330, adjust = true } = p;
  const spec = {
    parts: [
      { id: 'V1', type: 'VAC', at: [2, 3], rot: 90, label: 'u₁' },
      { id: 'D1', type: 'D', at: [6, 3] },
      { id: 'C1', type: 'CPOL', at: [13, 3], rot: 90, value: C, adjust: adjust && adj(10e-6, 4.7e-3) },
      { id: 'RL', type: 'R', at: [18, 3], rot: 90, value: RL, adjust: adjust && adj(47, 10e3) },
      { type: 'GND', at: [10, 9] },
    ],
    wires: [
      { pts: ['V1.a', 'D1.a'], net: 'in' }, { pts: ['D1.k', 'C1.a', [18, 3]], net: 'out' }, { pts: [[18, 3], 'RL.a'], net: 'out' },
      { pts: ['V1.b', [2, 9], [18, 9], 'RL.b'], net: '0' }, { pts: ['C1.b', [13, 9]], net: '0' },
    ],
  };
  const net = new Netlist().V('V1', 'in', '0', { wave: waves.sine(Vp, f) }).D('D1', 'in', 'out').C('C1', 'out', '0', C).R('RL', 'out', '0', RL);
  return { spec, net };
}

/** Brückengleichrichter mit Siebelko und Last: V1, D1–D4, C1, RL; Knoten a, b, out */
function bridge(p = {}) {
  const { Vp = 10, f = 50, C = 470e-6, RL = 330, adjust = true } = p;
  const spec = {
    parts: [
      { id: 'V1', type: 'VAC', at: [2, 9], rot: 90, label: 'u₁' },
      { id: 'D1', type: 'D', at: [8, 9], rot: 270 }, { id: 'D2', type: 'D', at: [8, 13], rot: 270 },
      { id: 'D3', type: 'D', at: [13, 9], rot: 270 }, { id: 'D4', type: 'D', at: [13, 13], rot: 270 },
      { id: 'C1', type: 'CPOL', at: [18, 3], rot: 90, value: C, adjust: adjust && adj(10e-6, 4.7e-3) },
      { id: 'RL', type: 'R', at: [23, 3], rot: 90, value: RL, adjust: adjust && adj(47, 10e3) },
      { type: 'GND', at: [10.5, 13] },
    ],
    wires: [
      { pts: ['V1.a', [8, 9]], net: 'a' }, { pts: ['D1.k', [8, 3], [23, 3], 'RL.a'], net: 'out' }, { pts: ['D3.k', [13, 3]], net: 'out' }, { pts: ['C1.a', [18, 3]], net: 'out' },
      { pts: ['V1.b', [2, 17], [16.5, 17], [16.5, 9], [13, 9]], net: 'b' },
      { pts: ['D2.a', [13, 13], [23, 13], 'RL.b'], net: '0' }, { pts: ['C1.b', [18, 13]], net: '0' },
    ],
  };
  const net = new Netlist().V('V1', 'a', 'b', { wave: waves.sine(Vp, f) })
    .D('D1', 'a', 'out').D('D2', '0', 'a').D('D3', 'b', 'out').D('D4', '0', 'b').C('C1', 'out', '0', C).R('RL', 'out', '0', RL).R('Rref', 'b', '0', 1e6);
  return { spec, net };
}

/** Emitterschaltung mit Basisspannungsteiler: Vcc, R1, R2, Rc, Re, Q1, C1 (Eingang), C2 (Ausgang), RL; Knoten vcc, b, c, e, in, out */
function bjt(p = {}) {
  const { Vcc = 12, R1 = 47e3, R2 = 10e3, Rc = 2.2e3, Re = 470, Vin = 0.02, f = 1e3, adjust = true } = p;
  const spec = {
    parts: [
      { id: 'Vin', type: 'VAC', at: [1, 9], rot: 90, label: 'u₁' },
      { id: 'C1', type: 'C', at: [3, 9], value: 10e-6 },
      { id: 'R1', type: 'R', at: [8, 3], rot: 90, value: R1, adjust: adjust && adj(10e3, 220e3) },
      { id: 'R2', type: 'R', at: [8, 11], rot: 90, value: R2, adjust: adjust && adj(2.2e3, 47e3) },
      { id: 'Rc', type: 'R', at: [14, 3], rot: 90, value: Rc, adjust: adjust && adj(470, 10e3) },
      { id: 'Q1', type: 'Q', at: [12, 9], pol: 'npn' },
      { id: 'Re', type: 'R', at: [14, 11], rot: 90, value: Re, adjust: adjust && adj(100, 2.2e3) },
      { id: 'C2', type: 'C', at: [18, 7], value: 10e-6 },
      { id: 'RL', type: 'R', at: [26, 7], rot: 90, value: 10e3 },
      { type: 'GND', at: [11, 15] },
      { id: 'Vcc', type: 'TERM', at: [8, 3], label: '+Vcc', labelPos: 'l' },
    ],
    wires: [
      { pts: ['Vin.a', [1, 9], 'C1.a'], net: 'in' }, { pts: ['C1.b', [8, 9], 'Q1.b'], net: 'b' }, { pts: [[8, 7], [8, 11]], net: 'b' },
      { pts: [[8, 3], [14, 3]], net: 'vcc' }, { pts: ['Rc.b', 'Q1.c', 'C2.a'], net: 'c' }, { pts: ['Q1.e', 'Re.a'], net: 'e' },
      { pts: ['C2.b', [26, 7]], net: 'out' }, { pts: ['Vin.b', [1, 15], [26, 15], 'RL.b'], net: '0' },
      { pts: ['R2.b', [8, 15]], net: '0' }, { pts: ['Re.b', [14, 15]], net: '0' },
    ],
    texts: [],
  };
  const net = new Netlist().V('Vcc', 'vcc', '0', Vcc).V('Vin', 'in', '0', { wave: waves.sine(Vin, f), ac: 1 })
    .C('C1', 'in', 'b', 10e-6).R('R1', 'vcc', 'b', R1).R('R2', 'b', '0', R2).R('Rc', 'vcc', 'c', Rc).R('Re', 'e', '0', Re)
    .Q('Q1', 'c', 'b', 'e', { bf: 150 }).C('C2', 'c', 'out', 10e-6).R('RL', 'out', '0', 10e3);
  return { spec, net };
}

/** Invertierender OPV-Verstärker: V1, Rin, Rf, OA1; Knoten in, m, out */
function opamp(p = {}) {
  const { Rin = 1e3, Rf = 10e3, wave = waves.sine(0.5, 1e3), rails = [-12, 12], adjust = true } = p;
  const spec = {
    parts: [
      { id: 'V1', type: 'VAC', at: [1, 5], rot: 90, label: 'u₁' },
      { id: 'Rin', type: 'R', at: [3, 5], value: Rin, adjust: adjust && adj(100, 1e5) },
      { id: 'Rf', type: 'R', at: [9, 2], value: Rf, adjust: adjust && adj(1e3, 1e6) },
      { id: 'OA1', type: 'OA', at: [8, 5], label: '' },
      { type: 'GND', at: [6, 7] },
      { id: 'out', type: 'TERM', at: [17, 6], label: 'u₂', labelPos: 'r' },
    ],
    wires: [
      { pts: ['V1.a', 'Rin.a'], net: 'in' }, { pts: ['Rin.b', 'OA1.m'], net: 'm' }, { pts: [[7, 5], [7, 2], 'Rf.a'], net: 'm' },
      { pts: ['Rf.b', [14, 2], [14, 6], 'OA1.o'], net: 'out' }, { pts: [[14, 6], 'out.a'], net: 'out' }, { pts: ['OA1.p', [6, 7]], net: '0' },
    ],
    texts: [{ at: [4.6, 6.2], text: '' }],
  };
  const net = new Netlist().V('V1', 'in', '0', { wave, ac: 1 }).R('Rin', 'in', 'm', Rin).R('Rf', 'm', 'out', Rf).OA('OA1', '0', 'm', 'out', { rails });
  return { spec, net };
}

export const layouts = { divider, rc, tank, halfWave, bridge, bjt, opamp };
