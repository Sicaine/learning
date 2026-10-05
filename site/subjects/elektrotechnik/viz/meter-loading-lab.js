// D14 meter-loading-lab — Messgeräte belasten die Schaltung: Voltmeter parallel zu R₂ eines hochohmigen Teilers, Amperemeter in Reihe.
// params: { U?: V (10), R1?: Ω (1M), R2?: Ω (1M), maxErr?: 0.01 (Ziel: |Fehler| < 1 %), mode?: 'u'|'i' (Startansicht) }
import { Netlist, dcSolve } from '../../../assets/js/vizkit/circuit.js';
import { drawSchematic } from '../../../assets/js/vizkit/schematic.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { fmt } from '../../../assets/js/vizkit/si.js';
import { h } from '../../../assets/js/vizkit/base.js';

const pct = x => (x >= 0 ? '+' : '−') + Math.abs(x * 100).toFixed(2).replace('.', ',') + ' %';

export default function mount(stage, { params = {}, complete }) {
  const U = params.U ?? 10, R1 = params.R1 ?? 1e6, R2 = params.R2 ?? 1e6, maxErr = params.maxErr ?? 0.01;
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  // Spannungsmessung: Teiler U, R1, R2; Voltmeter (Innenwiderstand RV) parallel zu R2
  const un = new Netlist().V('V1', 'in', '0', U).R('R1', 'in', 'a', R1).R('R2', 'a', '0', R2).R('RV', 'a', '0', 1e7);
  const us = drawSchematic(root, {
    title: 'Spannungsmessung am Teiler',
    parts: [
      { id: 'V1', type: 'V', at: [2, 5], rot: 90, value: U, label: 'U' },
      { id: 'R1', type: 'R', at: [6, 2], value: R1, label: 'R₁' },
      { id: 'R2', type: 'R', at: [12, 4], rot: 90, value: R2, label: 'R₂' },
      { id: 'RV', type: 'VM', at: [17, 4], rot: 90, value: 1e7, label: 'Voltmeter', letter: 'V', labelPos: 'r' },
      { type: 'GND', at: [9, 11] },
    ],
    wires: [
      { pts: ['V1.p', [2, 2], 'R1.a'], net: 'in' }, { pts: ['R1.b', [12, 2], [17, 2], 'RV.a'], net: 'a' }, { pts: ['R2.a', [12, 2]], net: 'a' },
      { pts: ['V1.n', [2, 11], [17, 11], 'RV.b'], net: '0' }, { pts: ['R2.b', [12, 11]], net: '0' },
    ],
  });
  // Strommessung: Quelle U, Last R; Amperemeter (Innenwiderstand RA) in Reihe
  const IU = 5, IR = 50;
  const inet = new Netlist().V('V1', 'in', '0', IU).R('RA', 'in', 'm', 1).R('R1', 'm', '0', IR);
  const is = drawSchematic(root, {
    title: 'Strommessung',
    parts: [
      { id: 'V1', type: 'V', at: [2, 5], rot: 90, value: IU, label: 'U' },
      { id: 'RA', type: 'AM', at: [6, 2], value: 1, label: 'Amperemeter' },
      { id: 'R1', type: 'R', at: [14, 4], rot: 90, value: IR, label: 'R' },
      { type: 'GND', at: [8, 11] },
    ],
    wires: [{ pts: ['V1.p', [2, 2], 'RA.a'], net: 'in' }, { pts: ['RA.b', [14, 2], 'R1.a'], net: 'm' }, { pts: ['V1.n', [2, 11], [14, 11], 'R1.b'], net: '0' }],
  });
  const ui = controls(root, [
    { type: 'seg', id: 'mode', label: 'Messung', options: [['u', 'Spannung messen'], ['i', 'Strom messen']], value: params.mode ?? 'u' },
    { id: 'rv', label: 'Innenwiderstand Voltmeter Rᵢ,V', unit: 'Ω', min: 1e5, max: 1e9, scale: 'log', value: 1e7 },
    { id: 'ra', label: 'Innenwiderstand Amperemeter Rᵢ,A', unit: 'Ω', min: 0.01, max: 100, scale: 'log', value: 1 },
  ], run);
  const out = readout(root, [{ id: 'true', label: 'wahrer Wert' }, { id: 'meas', label: 'angezeigt', hl: true }, { id: 'err', label: 'Fehler' }, { id: 'ring', label: 'Messgerät-Anteil' }]);
  const g = goals(root, [{ id: 'u', label: `Spannung: |Fehler| < ${maxErr * 100} %` }, { id: 'i', label: `Strom: |Fehler| < ${maxErr * 100} %` }], () => complete?.());
  const note = h('p', { class: 'vz-note' }); root.append(note);

  function run() {
    const v = ui.values, isU = v.mode === 'u';
    ui.el.querySelector('[data-id="rv"]').style.display = isU ? '' : 'none';
    ui.el.querySelector('[data-id="ra"]').style.display = isU ? 'none' : '';
    us.el.style.display = isU ? '' : 'none'; is.el.style.display = isU ? 'none' : '';
    if (isU) {
      un.set('RV', v.rv);
      const r = dcSolve(un), tru = U * R2 / (R1 + R2), meas = r.v.a, e = meas / tru - 1;
      us.set('RV', { value: v.rv }); us.setState({ v: r.v, i: r.i });
      out.set({ true: fmt(tru, 'V'), meas: fmt(meas, 'V'), err: pct(e), ring: 'R₂ ‖ Rᵢ,V = ' + fmt(R2 * v.rv / (R2 + v.rv), 'Ω') });
      note.textContent = Math.abs(e) < maxErr ? 'Das Voltmeter ist so hochohmig, dass es die Schaltung kaum stört.' : 'Das Voltmeter liegt parallel zu R₂ und zieht Strom: Die Spannung bricht ein.';
      if (Math.abs(e) < maxErr) g.reach('u');
    } else {
      inet.set('RA', v.ra);
      const r = dcSolve(inet), tru = IU / IR, meas = r.i.R1, e = meas / tru - 1;
      is.set('RA', { value: v.ra }); is.setState({ v: r.v, i: r.i });
      out.set({ true: fmt(tru, 'A'), meas: fmt(meas, 'A'), err: pct(e), ring: 'Rᵢ,A + R = ' + fmt(v.ra + IR, 'Ω') });
      note.textContent = Math.abs(e) < maxErr ? 'Das Amperemeter ist so niederohmig, dass es kaum Spannung abfallen lässt.' : 'Das Amperemeter liegt in Reihe und vergrößert den Gesamtwiderstand: Der Strom sinkt.';
      if (Math.abs(e) < maxErr) g.reach('i');
    }
  }
  run();
}
