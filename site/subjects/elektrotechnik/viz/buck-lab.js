// Schaltregler-Labor (L40): Tiefsetzsteller (Buck) und Hochsetzsteller (Boost) im eingeschwungenen Zustand.
// Eigenes Mittelwert-/Zeitverlaufsmodell (kein Netzlisten-Transient: bei 100 kHz wären Tausende Perioden bis zum Einschwingen nötig).
// Verluste: R_DS(on) 50 mΩ, Spulenwiderstand 50 mΩ, Freilaufdiode (Schottky) U_F = 0,4 V, Schaltverluste (40 ns Flanken), Gate- und Steuerverlust.
// params: { uin?: Volt (Standard 12), target?: 5 } — Ziel (Buck): 5 V bei ≥ 0,8 A, Welligkeit < 50 mV, η ≥ 90 %.
import { plot } from '../../../assets/js/vizkit/plot.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { fmt } from '../../../assets/js/vizkit/si.js';
import { h } from '../../../assets/js/vizkit/base.js';

const RDS = 0.05, RC = 0.05, UF = 0.4, ESR = 0.02, TSW = 40e-9, QG = 10e-9, VG = 10, IQ = 2e-3;

/** Eingeschwungener Zustand. top: 'buck' | 'boost' */
export function solve(top, uin, D, L, C, f, R) {
  const T = 1 / f;
  let uo, il, ccm, pk, vl;           // il: mittlerer Spulenstrom
  const K = 2 * L * f / R;
  if (top === 'buck') {
    uo = (D * uin - (1 - D) * UF) / (1 + (D * RDS + RC) / R);
    ccm = K >= (1 - D) || uo <= 0;
    if (!ccm) { const M = 2 / (1 + Math.sqrt(1 + 4 * K / (D * D))); uo = M * uin; }
    uo = Math.max(0, uo); il = uo / R;
  } else {
    const a = (D * RDS + RC) / (R * (1 - D));
    uo = (uin - (1 - D) * UF) / ((1 - D) + a);
    ccm = K >= D * (1 - D) ** 2;
    if (!ccm) { const M = (1 + Math.sqrt(1 + 4 * D * D / K)) / 2; uo = M * uin; }
    il = top === 'boost' ? uo / (R * (1 - D)) : 0;
    if (!ccm) il = uo * uo / (R * uin);       // Pein ≈ Paus (ideal)
  }
  const iout = uo / R;
  // Spulenstrom-Verlauf: Stützpunkte über eine Periode (t, i)
  const up = top === 'buck' ? uin - uo : uin, dn = top === 'buck' ? uo + UF : Math.max(1e-3, uo + UF - uin);
  let dI, pts, d2 = 0;
  if (ccm) {
    dI = top === 'buck' ? (uo + UF) * (1 - D) / (L * f) : uin * D / (L * f);
    pts = [[0, il - dI / 2], [D * T, il + dI / 2], [T, il - dI / 2]];
  } else {
    const ipk = Math.max(0, up * D / (L * f)); dI = ipk;
    const t2 = top === 'buck' ? ipk * L / Math.max(1e-6, uo) : ipk * L / Math.max(1e-6, uo - uin);
    d2 = Math.min(1 - D, t2 * f);
    pts = [[0, 0], [D * T, ipk], [(D + d2) * T, 0], [T, 0]];
  }
  // Verluste
  const idAvg = top === 'buck' ? il * (1 - D) : iout;
  const pcond = il * il * (D * RDS + RC) + UF * idAvg;
  const isw = top === 'buck' ? il : il;
  const psw = 0.5 * uin * isw * 2 * TSW * f * (top === 'buck' ? 1 : uo / uin);
  const pgate = QG * VG * f, pctl = uin * IQ;
  const pout = uo * iout, ploss = pcond + psw + pgate + pctl, eta = pout / (pout + ploss);
  return { uo, iout, il, dI, ccm, pts, D, d2, T, eta, pout, ploss, pcond, psw, pgate, pctl, top, L, C, f, R, uin };
}

const iAt = (m, t) => { const x = t % m.T, p = m.pts; for (let k = 1; k < p.length; k++) if (x <= p[k][0] + 1e-18) { const a = p[k - 1], b = p[k]; return b[0] === a[0] ? b[1] : a[1] + (b[1] - a[1]) * (x - a[0]) / (b[0] - a[0]); } return p[p.length - 1][1]; };
const swAt = (m, t) => {
  const x = (t % m.T) / m.T, on = x < m.D;
  if (m.top === 'buck') return on ? m.uin - RDS * m.il : (m.ccm || x < m.D + m.d2 ? -UF : m.uo);
  return on ? RDS * m.il : (m.ccm || x < m.D + m.d2 ? m.uo + UF : m.uin);
};
/** Ausgangs-Welligkeit u~(t): Kondensatorstrom integrieren + ESR */
function ripple(m, ts) {
  const n = ts.length, dt = ts[1] - ts[0], out = new Float64Array(n);
  let acc = 0;
  for (let k = 0; k < n; k++) {
    const i = iAt(m, ts[k]);
    const ic = m.top === 'buck' ? i - m.iout : ((ts[k] % m.T) / m.T >= m.D ? i : 0) - m.iout;
    acc += ic * dt / m.C; out[k] = acc + ESR * ic;
  }
  let mean = 0; for (const x of out) mean += x; mean /= n;
  for (let k = 0; k < n; k++) out[k] -= mean;
  return out;
}

export default function mount(stage, { params = {}, complete }) {
  const target = params.target ?? 5;
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const b1 = h('div'), b2 = h('div'), b3 = h('div'); root.append(b1, b2, b3);
  const W = 620, N = 600;
  const p1 = plot(b1, { h: 210, legend: true, x: { unit: 's', label: 't' }, y: { unit: 'V', include: [0] } });
  const p2 = plot(b2, { h: 180, x: { unit: 's', label: 't' }, y: { unit: 'A', label: 'i_L', include: [0] } });
  const p3 = plot(b3, { h: 160, x: { unit: 's', label: 't' }, y: { unit: 'V', label: 'u~', format: v => (v * 1000).toFixed(Math.abs(v) < 0.01 ? 1 : 0) + ' mV' } });
  void W;
  const ui = controls(root, [
    { id: 'top', type: 'seg', options: [['buck', 'Tiefsetzsteller (Buck)'], ['boost', 'Hochsetzsteller (Boost)']], value: 'buck' },
    { id: 'uin', label: 'Eingangsspannung U_ein', unit: 'V', min: 5, max: 24, value: params.uin ?? 12, step: 0.5 },
    { id: 'D', label: 'Tastverhältnis D', unit: '', min: 0.05, max: 0.95, value: 0.5, step: 0.005, format: v => (v * 100).toFixed(1).replace('.', ',') + ' %' },
    { id: 'L', label: 'Spule L', unit: 'H', min: 22e-6, max: 470e-6, value: 100e-6, scale: 'log', snap: 'E6' },
    { id: 'C', label: 'Ausgangskondensator C', unit: 'F', min: 10e-6, max: 1e-3, value: 100e-6, scale: 'log', snap: 'E6' },
    { id: 'f', label: 'Schaltfrequenz f', unit: 'Hz', min: 20e3, max: 1e6, value: 100e3, scale: 'log', snap: 'E6' },
    { id: 'R', label: 'Last R_L', unit: 'Ω', min: 2.5, max: 50, value: 5, scale: 'log', snap: 'E12' },
  ], draw);
  const out = readout(root, [
    { id: 'uo', label: 'U_aus', hl: true }, { id: 'io', label: 'I_aus' }, { id: 'mode', label: 'Betrieb' },
    { id: 'dI', label: 'Spulenstrom-Welligkeit ΔI' }, { id: 'du', label: 'Ausgangswelligkeit ΔU', hl: true }, { id: 'eta', label: 'Wirkungsgrad η' }, { id: 'pv', label: 'Verlustleistung' },
  ]);
  const g = goals(root, [
    { id: 'u', label: `${fmt(target, 'V')} ± 0,1 V bei ≥ 0,8 A (Buck)` },
    { id: 'r', label: 'Welligkeit ΔU < 50 mV' },
    { id: 'e', label: 'η ≥ 90 %' },
  ], () => complete?.());
  const reached = { u: false, r: false, e: false };

  function draw() {
    const v = ui.values, m = solve(v.top, v.uin, v.D, v.L, v.C, v.f, v.R);
    const ts = Array.from({ length: N }, (_, k) => 3 * m.T * k / (N - 1));
    const usw = ts.map(t => swAt(m, t)), il = ts.map(t => iAt(m, t)), ur = ripple(m, ts);
    p1.line('sw', ts, usw, { color: 'var(--accent)', label: 'u_Schalter (Schaltknoten)', width: 1.8 });
    p1.line('uo', ts, ts.map(() => m.uo), { color: 'var(--accent-2)', label: `U_aus = ${fmt(m.uo, 'V', 3)}`, width: 2.2 });
    p2.line('il', ts, il, { color: 'var(--accent)', width: 2 });
    p2.hline('avg', m.il, { label: 'Ø ' + fmt(m.il, 'A', 3), color: 'var(--muted)', dash: '4 4' });
    p3.line('ur', ts, Array.from(ur), { color: 'var(--accent-2)', width: 2 });
    let lo = Infinity, hi = -Infinity; for (const x of ur) { lo = Math.min(lo, x); hi = Math.max(hi, x); }
    const du = hi - lo;
    out.set({ uo: fmt(m.uo, 'V', 3), io: fmt(m.iout, 'A', 3), mode: m.ccm ? 'durchgehend (CCM)' : 'Lückbetrieb (DCM)', dI: fmt(m.dI, 'A', 3), du: fmt(du, 'V', 3), eta: (m.eta * 100).toFixed(1).replace('.', ',') + ' %', pv: fmt(m.ploss, 'W', 3) });
    if (v.top === 'buck' && v.uin === 12 && Math.abs(m.uo - target) <= 0.1 && m.iout >= 0.8) { if (du < 0.05) g.reach('r'); if (m.eta >= 0.9) g.reach('e'); g.reach('u'); }
    void reached;
  }
  draw();
}
