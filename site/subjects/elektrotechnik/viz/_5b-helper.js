// Gemeinsame Helfer der Transistor-Demos (Etappe 5, Lektionen L31–L33).
import { Netlist, waves } from '../../../assets/js/vizkit/circuit.js';
import { layouts } from '../../../assets/js/vizkit/schematic-layouts.js';

/** Temperaturabhängiger Transistor (vereinfachtes Gummel-Poon): Sättigungsstrom wächst mit T, U_BE sinkt ≈ 2 mV/K. */
export const VT = T => 8.617333e-5 * (T + 273.15);
export const IS0 = 1e-14;
export const isT = T => IS0 * Math.pow((T + 273.15) / 298.15, 3) * Math.exp(1.12 / 8.617333e-5 * (1 / 298.15 - 1 / (T + 273.15)));

/** Nächster „schöner“ 1-2-5-Wert ≥ x */
export function nice125(x) {
  const e = Math.floor(Math.log10(x)), f = x / 10 ** e;
  return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10) * 10 ** e;
}

/** Fourier-Koeffizienten (Betrag) der Harmonischen 1..nh eines Signals, das genau `periods` Perioden über [k0, k0+len) abdeckt. */
export function harmonics(sig, k0, len, periods, nh = 8) {
  const out = [];
  for (let h = 1; h <= nh; h++) {
    let re = 0, im = 0;
    for (let k = 0; k < len; k++) { const a = 2 * Math.PI * h * periods * k / len; re += sig[k0 + k] * Math.cos(a); im += sig[k0 + k] * Math.sin(a); }
    out.push(2 * Math.hypot(re, im) / len);
  }
  return out;
}
/** Klirrfaktor k = √(U₂²+U₃²+…)/√(U₁²+U₂²+…) aus harmonics() */
export function thd(h) { const s2 = h.slice(1).reduce((a, b) => a + b * b, 0), s = Math.sqrt(s2 + h[0] * h[0]); return s > 0 ? Math.sqrt(s2) / s : 0; }

/**
 * Emitterschaltung mit Basisspannungsteiler (Netzliste passend zum Schaltplan von layouts.bjt).
 * p: { Vcc, R1, R2, Rc, Re, Ce (Bypass, 0 = keiner), Ck (Koppel-C), A (Spitzenwert), f, RL, bf }
 */
export function ampNet(p) {
  const { Vcc = 12, R1 = 47e3, R2 = 10e3, Rc = 2.2e3, Re = 470, Ce = 0, Ck = 10e-6, A = 0.02, f = 1e3, RL = 10e3, bf = 150 } = p;
  const n = new Netlist().V('Vcc', 'vcc', '0', Vcc).V('Vin', 'in', '0', { wave: waves.sine(A, f), ac: 1 })
    .C('C1', 'in', 'b', Ck).R('R1', 'vcc', 'b', R1).R('R2', 'b', '0', R2).R('Rc', 'vcc', 'c', Rc).R('Re', 'e', '0', Re)
    .Q('Q1', 'c', 'b', 'e', { bf }).C('C2', 'c', 'out', Ck).R('RL', 'out', '0', RL);
  if (Ce > 0) n.C('CE', 'e', '0', Ce);
  return n;
}

/** Schaltplan der Emitterschaltung (layouts.bjt), optional mit Emitter-Bypass CE. */
export function ampSpec(p, onChange) {
  const { spec } = layouts.bjt({ Vcc: p.Vcc, R1: p.R1, R2: p.R2, Rc: p.Rc, Re: p.Re, Vin: p.A, f: p.f });
  spec.parts.forEach(q => { if (q.id === 'C1' || q.id === 'C2') q.value = p.Ck; });
  if (p.Ce > 0) {
    spec.parts.push({ id: 'CE', type: 'CPOL', at: [17, 11], rot: 90, value: p.Ce });
    spec.wires.push({ pts: [[14, 11], 'CE.a'], net: 'e' }, { pts: ['CE.b', [17, 15]], net: '0' });
  }
  spec.onChange = onChange;
  return spec;
}
