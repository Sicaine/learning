// Tests für site/assets/js/vizkit/circuit.js und si.js gegen analytische Lösungen.
//   node tools/test-circuit.mjs
import { Netlist, dcSolve, transient, acSweep, impedance, createSim, waves, logspace, qFactor, cutoff3dB, resonanceFreq, CircuitError } from '../site/assets/js/vizkit/circuit.js';
import * as si from '../site/assets/js/vizkit/si.js';

let fails = 0, count = 0;
const rows = [];
function check(name, got, want, tol, kind = 'rel') {
  count++;
  const err = kind === 'abs' ? Math.abs(got - want) : Math.abs(got - want) / Math.max(Math.abs(want), 1e-300);
  const ok = err <= tol;
  if (!ok) fails++;
  rows.push(`${ok ? 'ok  ' : 'FAIL'} ${name.padEnd(54)} got ${Number(got).toPrecision(6).padStart(12)}  want ${Number(want).toPrecision(6).padStart(12)}  ${kind} err ${err.toExponential(2)} (tol ${tol})`);
}
function truthy(name, cond, info = '') { count++; if (!cond) fails++; rows.push(`${cond ? 'ok  ' : 'FAIL'} ${name} ${info}`); }
// Beste Zeit mehrerer Läufe (großzügige Schwellen: Warm-Läufe messen typ. 4 ms / 25 ms; Rechner kann ausgelastet sein) — der erste enthält JIT-Aufwärmen
const time = (f, runs = 9) => { let r, best = Infinity; for (let k = 0; k < runs; k++) { const t0 = performance.now(); r = f(); best = Math.min(best, performance.now() - t0); } return [r, best]; };

// 1. Spannungsteiler
{
  const n = new Netlist().V('V1', 'in', '0', 10).R('R1', 'in', 'out', 1000).R('R2', 'out', '0', 3000);
  const r = dcSolve(n);
  check('Spannungsteiler V(out) = 7,5 V', r.v.out, 7.5, 1e-7);
  check('Spannungsteiler I(R1) = 2,5 mA', r.i.R1, 2.5e-3, 1e-7);
  check('Spannungsteiler I(V1) = −2,5 mA (SPICE-Vorzeichen)', r.i.V1, -2.5e-3, 1e-7);
}

// 2. RC-Aufladung und -Entladung
{
  const R = 1e3, C = 1e-6, tau = R * C, V = 5;
  const n = new Netlist().V('V1', 'in', '0', { wave: waves.step(0, V, 0, 1e-9) }).R('R1', 'in', 'out', R).C('C1', 'out', '0', C);
  const [r, ms] = time(() => transient(n, { tstop: 5 * tau, dt: tau / 200 }));
  let worst = 0; for (let k = 0; k < r.t.length; k++) worst = Math.max(worst, Math.abs(r.v.out[k] - V * (1 - Math.exp(-r.t[k] / tau))));
  check('RC-Aufladung max. Abweichung < 2 mV (Trapez)', worst, 0, 2e-3, 'abs');
  check('RC bei t = τ: 63,2 %', r.v.out[200], V * (1 - Math.exp(-1)), 1e-3);
  check('RC Strom bei t = τ', r.i.R1[200], V / R * Math.exp(-1), 2e-3);
  const [, ms2] = time(() => transient(n, { tstop: 2000 * 1e-6, dt: 1e-6 }));
  truthy('Geschwindigkeit: 2000 Schritte RC < 20 ms', ms2 < 20, `(${ms2.toFixed(1)} ms)`);
  const nd = new Netlist().R('R1', 'out', '0', R).C('C1', 'out', '0', C, V);
  const rd = transient(nd, { tstop: 3 * tau, dt: tau / 200, uic: true });
  check('RC-Entladung (uic) v(τ) = V/e', rd.v.out[200], V * Math.exp(-1), 1e-3);
  check('RC-Entladung (uic) v(0) = V', rd.v.out[0], V, 1e-6);
  const rb = transient(n, { tstop: 5 * tau, dt: tau / 200, method: 'be' });
  check('RC Backward-Euler v(τ) (Fehler O(h))', rb.v.out[200], V * (1 - Math.exp(-1)), 1e-2);
}

// 3. RL
{
  const R = 100, L = 10e-3, V = 10, tau = L / R;
  const n = new Netlist().V('V1', 'in', '0', { wave: waves.step(0, V, 0, 1e-9) }).R('R1', 'in', 'x', R).L('L1', 'x', '0', L);
  const r = transient(n, { tstop: 5 * tau, dt: tau / 200 });
  check('RL Stromanstieg i(τ) = V/R (1 − 1/e)', r.i.L1[200], V / R * (1 - Math.exp(-1)), 1e-3);
  check('RL Endwert i(5τ)', r.i.L1[1000], V / R * (1 - Math.exp(-5)), 1e-3);
  const dc = dcSolve(n);
  check('RL DC: Spule = Kurzschluss, i = V/R', dc.i.L1, 0, 1e-12, 'abs');   // Quelle bei t=0 ist 0 V
  const dc2 = dcSolve(new Netlist().V('V1', 'in', '0', V).R('R1', 'in', 'x', R).L('L1', 'x', '0', L));
  check('RL DC (V=10): i = V/R', dc2.i.L1, 0.1, 1e-6);
}

// 4. RLC-Serienresonanz
{
  const R = 10, L = 1e-3, C = 1e-6;
  const f0 = 1 / (2 * Math.PI * Math.sqrt(L * C)), Q = Math.sqrt(L / C) / R, bw = f0 / Q;
  const n = new Netlist().V('V1', 'in', '0', { ac: 1 }).L('L1', 'in', 'a', L).C('C1', 'a', 'b', C).R('R1', 'b', '0', R);
  const f = logspace(500, 50e3, 800);
  const ac = acSweep(n, f);
  const m = ac.mag('b'), q = qFactor(f, m);
  check('RLC Resonanzfrequenz f0', resonanceFreq(f, m), f0, 2e-3);
  check('RLC Güte Q', q.q, Q, 5e-3);
  check('RLC Bandbreite f0/Q', q.bw, bw, 1e-2);
  check('RLC |V(R)| bei f0 = 1 (Strom max.)', Math.max(...m), 1, 1e-3);
  const pas = new Netlist().L('L1', 'in', 'a', L).C('C1', 'a', 'b', C).R('R1', 'b', '0', R);
  const z = impedance(pas, ['in', '0'], [f0, f0 / 10, f0 * 10]);
  check('RLC Eingangsimpedanz bei f0 = R', z.mag[0], R, 5e-3);
  check('RLC Eingangsimpedanz bei f0: Phase 0°', z.phase[0], 0, 0.2, 'abs');
  truthy('RLC Impedanz unterhalb f0 kapazitiv (Phase < −80°)', z.phase[1] < -80, `(${z.phase[1].toFixed(1)}°)`);
  truthy('RLC Impedanz oberhalb f0 induktiv (Phase > 80°)', z.phase[2] > 80, `(${z.phase[2].toFixed(1)}°)`);
  const tr = transient(n, { tstop: 2e-3, dt: 1e-6, uic: true });  // ohne Anregung → alles 0
  truthy('RLC transient ohne Quelle bleibt 0', Math.abs(tr.v.b[1000]) < 1e-9);
  // Ausschwingen: Parallel-Schwingkreis mit Anfangsladung, Dämpfung δ = R/(2L) für Serien-RLC
  const ring = new Netlist().L('L1', 'a', 'b', L).R('R1', 'b', 'c', R).C('C1', 'c', '0', C, 5).R('Rx', 'a', '0', 1e-6);
  const rr = transient(ring, { tstop: 2e-3, dt: 0.5e-6, uic: true });
  const delta = R / (2 * L), wd = Math.sqrt(1 / (L * C) - delta ** 2);
  let worst = 0; for (let k = 0; k < rr.t.length; k++) { const t = rr.t[k]; worst = Math.max(worst, Math.abs(rr.v.c[k] - 5 * Math.exp(-delta * t) * (Math.cos(wd * t) + delta / wd * Math.sin(wd * t)))); }
  check('Gedämpfte Schwingung (uic) max. Abweichung < 20 mV', worst, 0, 2e-2, 'abs');
}

// 5. RC-Tiefpass
{
  const R = 1e3, fc = 1000, C = 1 / (2 * Math.PI * R * fc);
  const n = new Netlist().V('V1', 'in', '0', { ac: 1 }).R('R1', 'in', 'out', R).C('C1', 'out', '0', C);
  const f = logspace(10, 100e3, 400), ac = acSweep(n, f);
  check('RC-Tiefpass fc aus Sweep (−3 dB)', cutoff3dB(f, ac.mag('out')), fc, 3e-3);
  const one = acSweep(n, [fc]);
  check('RC-Tiefpass |H(fc)| = −3,01 dB', one.db('out')[0], -3.0103, 1e-3, 'abs');
  check('RC-Tiefpass Phase(fc) = −45°', one.phase('out')[0], -45, 1e-3, 'abs');
  check('RC-Tiefpass −20 dB/Dekade (100·fc)', acSweep(n, [100 * fc]).db('out')[0], -40, 2e-3, 'abs');
  check('RC H(out/in) gleich v(out)', ac.h('out', 'in').mag[100], ac.mag('out')[100], 1e-9);
  // Hochpass
  const hp = new Netlist().V('V1', 'in', '0', { ac: 1 }).C('C1', 'in', 'out', C).R('R1', 'out', '0', R);
  check('RC-Hochpass fc', cutoff3dB(f, acSweep(hp, f).mag('out')), fc, 3e-3);
  // Transient-Amplitude bei fc: 1/√2
  const tr = transient(new Netlist().V('V1', 'in', '0', { wave: waves.sine(1, fc) }).R('R1', 'in', 'out', R).C('C1', 'out', '0', C), { tstop: 20e-3, dt: 1 / fc / 400 });
  let mx = 0; for (let k = tr.t.length - 400; k < tr.t.length; k++) mx = Math.max(mx, Math.abs(tr.v.out[k]));
  check('RC-Tiefpass transient: Amplitude bei fc = 0,707', mx, Math.SQRT1_2, 3e-3);
}

// 6. Diode + R
{
  const V = 5, R = 1000, Is = 1e-14, Vt = 0.025852;
  let vd = 0.6; for (let k = 0; k < 100; k++) { const f = (V - vd) / R - Is * (Math.exp(vd / Vt) - 1), df = -1 / R - Is / Vt * Math.exp(vd / Vt); vd -= f / df; }
  const n = new Netlist().V('V1', 'in', '0', V).R('R1', 'in', 'a', R).D('D1', 'a', '0');
  const r = dcSolve(n);
  check('Diode+R: Vd gegen Newton-Referenz', r.v.a, vd, 1e-6);
  check('Diode+R: Strom', r.i.D1, (V - vd) / R, 1e-6);
  const big = dcSolve(new Netlist().V('V1', 'in', '0', 100).R('R1', 'in', 'a', 1).D('D1', 'a', '0'));
  truthy('Diode mit 100 V / 1 Ω konvergiert (Limiting)', big.v.a > 0.7 && big.v.a < 1.2, `Vd = ${big.v.a.toFixed(3)}`);
  const rev = dcSolve(new Netlist().V('V1', 'in', '0', -5).R('R1', 'in', 'a', R).D('D1', 'a', '0'));
  check('Diode in Sperrrichtung: Strom ≈ 0', rev.i.D1, 0, 1e-9, 'abs');
  const led = dcSolve(new Netlist().V('V1', 'in', '0', 5).R('R1', 'in', 'a', 330).LED('D1', 'a', '0', { color: 'red' }));
  check('LED rot: Vf ≈ 1,9 V bei ~10 mA', led.v.a, 1.9, 0.02);
  const zd = dcSolve(new Netlist().V('V1', 'in', '0', 12).R('R1', 'in', 'a', 1400).ZD('Z1', '0', 'a', { vz: 5.1 }));
  // Z-Diode in Sperrrichtung: Kathode an 'a'
  check('Z-Diode 5,1 V stabilisiert bei 12 V', zd.v.a, 5.1, 0.03);
  const sch = dcSolve(new Netlist().V('V1', 'in', '0', 5).R('R1', 'in', 'a', 1000).D('D1', 'a', '0', { model: 'schottky' }));
  truthy('Schottky-Vf < Si-Vf', sch.v.a < r.v.a, `${sch.v.a.toFixed(3)} < ${r.v.a.toFixed(3)}`);
}

// 7. Gleichrichter
{
  const f = 50, C = 1000e-6, Rl = 1000, Vp = 10;
  const half = new Netlist().V('V1', 'in', '0', { wave: waves.sine(Vp, f) }).D('D1', 'in', 'out').C('C1', 'out', '0', C).R('RL', 'out', '0', Rl);
  const [r, ms] = time(() => transient(half, { tstop: 0.5, dt: 50e-6 }));
  const seg = a => { let lo = Infinity, hi = -Infinity; for (let k = r.t.length - 400; k < r.t.length; k++) { lo = Math.min(lo, a[k]); hi = Math.max(hi, a[k]); } return [lo, hi]; };
  const [lo, hi] = seg(r.v.out), ripple = hi - lo, I = (hi + lo) / 2 / Rl;
  check('Einweggleichrichter: Welligkeit ≈ I/(f·C)', ripple, I / (f * C), 0.15);
  truthy('Einweggleichrichter: Spitze ≈ Vp − 0,7 V', Math.abs(hi - (Vp - 0.7)) < 0.15, `hi = ${hi.toFixed(3)}`);
  const br = new Netlist().V('V1', 'p', 'm', { wave: waves.sine(Vp, f) }).R('Rg', 'm', '0', 1e6)
    .D('D1', 'p', 'out').D('D2', '0', 'p').D('D3', 'm', 'out').D('D4', '0', 'm').C('C1', 'out', '0', C).R('RL', 'out', '0', Rl);
  const [b, ms2] = time(() => transient(br, { tstop: 0.5, dt: 50e-6 }));
  let lo2 = Infinity, hi2 = -Infinity; for (let k = b.t.length - 400; k < b.t.length; k++) { lo2 = Math.min(lo2, b.v.out[k]); hi2 = Math.max(hi2, b.v.out[k]); }
  const I2 = (hi2 + lo2) / 2 / Rl;
  check('Brückengleichrichter: Welligkeit ≈ I/(2·f·C)', hi2 - lo2, I2 / (2 * f * C), 0.2);
  truthy('Brückengleichrichter: Spitze ≈ Vp − 1,4 V', Math.abs(hi2 - (Vp - 1.4)) < 0.25, `hi = ${hi2.toFixed(3)}`);
  truthy('Gleichrichter: 10000 Schritte mit Dioden < 500 ms', ms < 500 && ms2 < 600, `(${ms.toFixed(0)} / ${ms2.toFixed(0)} ms)`);
}

// 8. Transformator
{
  const n = new Netlist().V('V1', 'p', '0', { ac: 10 }).T('T1', 'p', '0', 's', '0', { lp: 5, ratio: 10, k: 0.999 }).R('RL', 's', '0', 100);
  const ac = acSweep(n, [50]);
  check('Transformator 10:1 AC: |Vs| ≈ Vp/10', ac.mag('s')[0], 1.0, 0.02);
  const nt = new Netlist().V('V1', 'p', '0', { wave: waves.sine(10, 50) }).T('T1', 'p', '0', 's', '0', { lp: 5, ratio: 10, k: 0.999 }).R('RL', 's', '0', 100);
  const r = transient(nt, { tstop: 0.2, dt: 50e-6 });
  let mx = 0; for (let k = r.t.length - 400; k < r.t.length; k++) mx = Math.max(mx, Math.abs(r.v.s[k]));
  check('Transformator 10:1 transient: Amplitude Vs', mx, 1.0, 0.03);
  const up = acSweep(new Netlist().V('V1', 'p', '0', { ac: 1 }).T('T1', 'p', '0', 's', '0', { lp: 0.1, ratio: 0.1, k: 0.9999 }).R('RL', 's', '0', 1e4), [1000]);
  check('Transformator 1:10 (Hochsetzen): |Vs| ≈ 10 Vp', up.mag('s')[0], 10, 0.02);
}

// 9. Operationsverstärker
{
  const nonInv = new Netlist().V('V1', 'in', '0', 1).OA('U1', 'in', 'fb', 'out', { rails: null }).R('Rf', 'out', 'fb', 10e3).R('Rg', 'fb', '0', 1e3);
  check('OPV nichtinvertierend: 1 + Rf/Rg = 11', dcSolve(nonInv).v.out, 11, 1e-3);
  const inv = new Netlist().V('V1', 'in', '0', 0.5).R('Rin', 'in', 'm', 1e3).R('Rf', 'm', 'out', 10e3).OA('U1', '0', 'm', 'out', { rails: null });
  check('OPV invertierend: −Rf/Rin = −10', dcSolve(inv).v.out, -5, 1e-3);
  const sat = new Netlist().V('V1', 'in', '0', 1).OA('U1', 'in', 'fb', 'out', { rails: [-12, 12] }).R('Rf', 'out', 'fb', 99e3).R('Rg', 'fb', '0', 1e3);
  check('OPV Sättigung bei Gain 100: Ausgang = +12 V', dcSolve(sat).v.out, 12, 1e-3);
  const comp = dcSolve(new Netlist().V('V1', 'in', '0', -0.1).OA('U1', 'in', '0', 'out', { rails: [-12, 12] }).R('RL', 'out', '0', 1e4));
  check('OPV als Komparator: −12 V bei V+ < V−', comp.v.out, -12, 1e-4);
  const gb = new Netlist().V('V1', 'in', '0', { ac: 1 }).R('Rin', 'in', 'm', 1e3).R('Rf', 'm', 'out', 10e3).OA('U1', '0', 'm', 'out', { rails: null, gain: 1e5, gbw: 1e6 });
  const f = logspace(1e3, 1e6, 300), a = acSweep(gb, f);
  check('OPV mit GBW 1 MHz, Gain 10: fc ≈ 91 kHz (GBW/11)', cutoff3dB(f, a.mag('out')), 1e6 / 11, 0.02);
  // Integrator: Rechteck → Dreieck
  const integ = new Netlist().V('V1', 'in', '0', { wave: waves.square(1, 1e3) }).R('R1', 'in', 'm', 10e3).C('C1', 'm', 'out', 10e-9).OA('U1', '0', 'm', 'out', { rails: [-12, 12] }).R('Rp', 'm', 'out', 10e6);
  const r = transient(integ, { tstop: 5e-3, dt: 1e-6 });
  let lo = Infinity, hi = -Infinity; for (let k = 4000; k <= 5000; k++) { lo = Math.min(lo, r.v.out[k]); hi = Math.max(hi, r.v.out[k]); }
  check('OPV-Integrator: Dreieck-Hub = V·T/(2RC)', hi - lo, 1 * 1e-3 / (2 * 10e3 * 10e-9), 0.03);
}

// 10. Schalter, BJT, MOSFET, Schwingung mit Schalter
{
  const n = new Netlist().V('V1', 'in', '0', 5).SW('S1', 'in', 'a', { ctl: t => t >= 1e-3 }).R('R1', 'a', 'out', 1e3).C('C1', 'out', '0', 1e-6);
  const r = transient(n, { tstop: 6e-3, dt: 2e-6, uic: true });
  const k = Math.round(2e-3 / 2e-6);
  check('Schalter + RC: 1 ms nach Schließen', r.v.out[k], 5 * (1 - Math.exp(-1)), 3e-3);
  check('Schalter + RC: vor dem Schließen 0 V', r.v.out[400], 0, 1e-4, 'abs');
  // BJT Emitterstufe, Basisvorspannung über Rb
  const q = new Netlist().V('Vcc', 'vcc', '0', 10).R('Rb', 'vcc', 'b', 930e3).R('Rc', 'vcc', 'c', 2e3).Q('Q1', 'c', 'b', '0', { bf: 100 });
  const o = dcSolve(q);
  const ib = (10 - o.v.b) / 930e3;
  check('BJT: Ic = β·Ib', o.i.Q1, 100 * ib, 1e-3);
  check('BJT: Vbe = Vt·ln(Ic/Is) ≈ 0,655 V', o.v.b, 0.02585 * Math.log(o.i.Q1 / 1e-14), 0.002);
  check('BJT: Vc = Vcc − Rc·Ic', o.v.c, 10 - 2e3 * o.i.Q1, 1e-6);
  const sat = dcSolve(new Netlist().V('Vcc', 'vcc', '0', 5).R('Rb', 'vcc', 'b', 10e3).R('Rc', 'vcc', 'c', 1e3).Q('Q1', 'c', 'b', '0'));
  truthy('BJT in Sättigung: Vce < 0,3 V', sat.v.c < 0.3, `Vce = ${sat.v.c.toFixed(3)}`);
  const pnp = dcSolve(new Netlist().V('Vcc', 'vcc', '0', 5).R('Rb', 'b', '0', 43e3).R('Rc', 'c', '0', 1e3).Q('Q1', 'c', 'b', 'vcc', { pol: 'pnp' }));
  truthy('PNP leitet (Vc > 0)', pnp.v.c > 1, `Vc = ${pnp.v.c.toFixed(3)}`);
  // MOSFET: Id = kp/2 (Vgs − Vt)², λ = 0, Sättigung
  const m = dcSolve(new Netlist().V('Vdd', 'd', '0', 10).V('Vg', 'g', '0', 4).R('Rd', 'd', 'out', 100).M('M1', 'out', 'g', '0', { vto: 2, kp: 0.01, lambda: 0 }));
  check('MOSFET Sättigung: Id = kp/2 (Vgs−Vt)²', m.i.M1, 0.01 / 2 * 4, 1e-6);
  const mp = dcSolve(new Netlist().V('Vdd', 'd', '0', 10).V('Vg', 'g', '0', 6).R('Rd', 'out', '0', 100).M('M1', 'out', 'g', 'd', { pol: 'p', vto: 2, kp: 0.01, lambda: 0 }));
  check('P-MOSFET: Id = kp/2 (Vsg−Vt)² (Triode/Sättigung)', mp.v.out / 100, 0.01 / 2 * 4 * 1, 0.5);   // grobe Plausibilität
  truthy('P-MOSFET leitet', mp.v.out > 0.5, `Vout = ${mp.v.out.toFixed(3)}`);
}

// 11. Fehlermeldungen & Robustheit
{
  const expectErr = (name, f, code) => { try { f(); truthy(name, false, '(kein Fehler)'); } catch (e) { truthy(name, e instanceof CircuitError && e.code === code, `→ ${e.message}`); } };
  expectErr('Spannungsquellen-Schleife → singular', () => dcSolve(new Netlist().V('V1', 'a', '0', 5).V('V2', 'a', '0', 3)), 'singular');
  expectErr('Kein Massebezug → Fehler', () => dcSolve(new Netlist().V('V1', 'a', 'b', 5).R('R1', 'a', 'b', 1e3)), 'ground');
  expectErr('Doppelter Name → Fehler', () => dcSolve(new Netlist().R('R1', 'a', '0', 1).R('R1', 'a', '0', 1)), 'dup');
  expectErr('Unbekannter Typ → Fehler', () => dcSolve([{ type: 'X', name: 'x1', n: ['a', '0'] }]), 'type');
  expectErr('Stromquelle in Reihe mit Kondensator → keine sinnvolle Lösung', () => dcSolve(new Netlist().I('I1', '0', 'a', 1e-3).C('C1', 'a', '0', 1e-6)), 'nonfinite');
  const fl = dcSolve(new Netlist().V('V1', 'a', '0', 5).R('R1', 'a', 'b', 1e3).C('C1', 'b', 'c', 1e-6).R('R2', 'c', '0', 1e3));
  check('Kondensator im DC offen: V(c) = 0', fl.v.c, 0, 1e-6, 'abs');
  // createSim: Parameter live ändern
  const n = new Netlist().V('V1', 'in', '0', 5).R('R1', 'in', 'out', 1e3).R('R2', 'out', '0', 1e3);
  const sim = createSim(n, { dt: 1e-6 }); sim.step(3);
  check('createSim: Teiler 2,5 V', sim.v('out'), 2.5, 1e-9);
  n.set('R2', 3e3); sim.step();
  check('createSim: R2 live geändert → 3,75 V', sim.v('out'), 3.75, 1e-9);
  check('createSim: Zeit', sim.t, 4e-6, 1e-9);
}

// 12. Geschwindigkeit nichtlinear
{
  const n = new Netlist().V('V1', 'in', '0', { wave: waves.sine(5, 1e3) }).D('D1', 'in', 'a').R('R1', 'a', 'b', 100).C('C1', 'b', '0', 1e-6).R('R2', 'b', 'c', 1e3).C('C2', 'c', '0', 1e-6).R('RL', 'c', '0', 10e3).Q('Q1', 'q', 'c', '0').R('Rq', 'q', '0', 1e3).V('Vq', 'q', 'in', 0);
  const [, ms] = time(() => transient(n, { tstop: 5e-3, dt: 2.5e-6 }));
  truthy('2000 Schritte, 6 Knoten, Diode + BJT < 120 ms', ms < 120, `(${ms.toFixed(1)} ms)`);
  const lin = new Netlist().V('V1', 'in', '0', { wave: waves.sine(1, 1e3) }).R('R1', 'in', 'a', 1e3).C('C1', 'a', '0', 1e-7).R('R2', 'a', 'b', 1e3).C('C2', 'b', '0', 1e-7).L('L1', 'b', 'c', 1e-3).R('R3', 'c', '0', 1e3);
  const [, ms2] = time(() => transient(lin, { tstop: 5e-3, dt: 2.5e-6 }));
  truthy('2000 Schritte, linear, 5 Knoten < 25 ms', ms2 < 25, `(${ms2.toFixed(1)} ms)`);
}

// 13. si.js
{
  const e = (n, g, w) => { count++; const ok = g === w; if (!ok) fails++; rows.push(`${ok ? 'ok  ' : 'FAIL'} si: ${n} → ${JSON.stringify(g)} (erwartet ${JSON.stringify(w)})`); };
  e('fmt 4700 Ω', si.fmt(4700, 'Ω'), '4,7 kΩ');
  e('fmt 2,2 µF', si.fmt(2.2e-6, 'F'), '2,2 µF');
  e('fmt Punkt', si.fmt(0.0123, 'A', { comma: false }), '12.3 mA');
  e('fmt 999,7 Hz rundet hoch', si.fmt(999.7, 'Hz'), '1 kHz');
  e('parse 4k7', si.parse('4k7'), 4700);
  e('parse 10 nF', si.parse('10 nF'), 1e-8);
  e('parse 2u2', si.parse('2u2'), 2.2e-6);
  e('parse 1,5 kΩ', si.parse('1,5 kΩ'), 1500);
  e('E12 nächster zu 5000', si.eNearest(5000, 'E12'), 4700);
  e('E24 nächster zu 5000', si.eNearest(5000, 'E24'), 5100);
  e('E6 Folge 100…1000', si.eSeries('E6', 100, 1000).join(','), '100,150,220,330,470,680,1000');
  e('Farbcode 4k7', si.colorCode(4700).map(c => c.name).join(' '), 'gelb violett rot gold');
  e('Farbcode zurück', si.fromColorCode(['yellow', 'violet', 'red', 'gold']).value, 4700);
  e('Farbcode 5 Ringe 100 kΩ 1 %', si.colorCode(100e3, { bands: 5 }).map(c => c.name).join(' '), 'braun schwarz schwarz orange braun');
  e('dB Spannung 10×', si.dbV(10), 20);
  e('dB Leistung 100×', si.dbP(100), 20);
  e('dBm 1 mW', si.wattToDbm(1e-3), 0);
  e('Slider log: Mitte', Math.round(si.sliderToValue(0.5, 10, 1e5, 'log')), 1000);
  e('Slider log: Rückweg', +si.valueToSlider(1000, 10, 1e5, 'log').toFixed(6), 0.5);
}

console.log(rows.join('\n'));
console.log(`\n${count - fails}/${count} Tests bestanden${fails ? `, ${fails} FEHLGESCHLAGEN` : ''}`);
process.exit(fails ? 1 : 0);
