// Gemeinsame Diodenphysik für die Demos der Lektionen L28–L30 (pn-junction, diode-iv-lab, led-driver-lab, zener-lab).
// Modell wie in vizkit/circuit.js (Shockley, Parameter bei 300 K), hier zusätzlich mit Temperaturabhängigkeit.
// Alle Größen in SI (V, A, K).

export const KB_EV = 8.617333e-5;                 // Boltzmann-Konstante in eV/K (k/q → U_T = k·T/q in V)
export const vt = T => KB_EV * T;                 // Temperaturspannung U_T
export const K0 = 300;                            // Bezugstemperatur der Parameter

/** Diodentypen: is = Sättigungsstrom bei 300 K, n = Emissionskoeffizient, eg = Energielücke/Barriere in eV (für T-Abhängigkeit) */
const ledIs = (vf, n = 2) => 1e-2 * Math.exp(-vf / (n * vt(K0)));
export const LED_COLORS = {
  rot:   { label: 'LED rot',   vf: 1.9, css: '#dc2626' },
  gelb:  { label: 'LED gelb',  vf: 2.1, css: '#ca8a04' },
  gruen: { label: 'LED grün',  vf: 2.2, css: '#16a34a' },
  blau:  { label: 'LED blau',  vf: 3.0, css: '#2563eb' },
  weiss: { label: 'LED weiß',  vf: 3.1, css: '#64748b' },
};
export const DIODES = {
  si:       { label: 'Si-Diode',    is: 1e-14, n: 1,    eg: 1.12, xmax: 1.0 },
  ge:       { label: 'Ge-Diode',    is: 1e-6,  n: 1,    eg: 0.66, xmax: 0.6 },
  schottky: { label: 'Schottky',    is: 1e-8,  n: 1.05, eg: 0.55, xmax: 0.6 },
  ...Object.fromEntries(Object.entries(LED_COLORS).map(([k, c]) => [k, { label: c.label, is: ledIs(c.vf), n: 2, eg: c.vf, led: true, vf: c.vf, css: c.css, xmax: Math.ceil((c.vf + 0.6) * 2) / 2 }])),
};

/** Sättigungsstrom bei Temperatur T (K): I_S ∝ T³·exp(−E_g/(n·k)·(1/T − 1/300 K)) */
export const isT = (d, T) => d.is * (T / K0) ** 3 * Math.exp(d.eg / (d.n * KB_EV) * (1 / K0 - 1 / T));
/** Strom bei Spannung U */
export const idiode = (d, U, T = K0) => { const x = U / (d.n * vt(T)); return isT(d, T) * (Math.exp(Math.min(x, 700)) - 1); };
/** Spannung bei Strom I (I > 0) */
export const udiode = (d, I, T = K0) => d.n * vt(T) * Math.log(I / isT(d, T) + 1);

/** Arbeitspunkt: Quelle Uq – Vorwiderstand R – N gleiche Dioden in Reihe. Gibt { I, Ud } (Ud je Diode). */
export function loadPoint(d, Uq, R, N = 1, T = K0) {
  const f = I => Uq - N * udiode(d, I, T) - I * R;
  const imax = Math.max(Uq / R, 1e-15);
  if (!(Uq > 0) || f(1e-15) <= 0) return { I: 0, Ud: Math.max(0, Uq) / N };
  let lo = Math.log(1e-15), hi = Math.log(imax);
  for (let k = 0; k < 80; k++) { const mid = (lo + hi) / 2; if (f(Math.exp(mid)) > 0) lo = mid; else hi = mid; }
  const I = Math.exp((lo + hi) / 2);
  return { I, Ud: udiode(d, I, T) };
}

/** Komma-Zahl mit fester Nachkommastellenzahl, mit echtem Minus */
export const num = (x, dp = 2) => (x < 0 ? '−' : '') + Math.abs(x).toFixed(dp).replace('.', ',');
