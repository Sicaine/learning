// Superhet-Labor (L57): Mischer, Zwischenfrequenz, Spiegelfrequenz, Vorselektion.
// Oben: Antenneneingang (Nutzsignal f_E, Störer, Oszillator, Vorselektionskurve). Unten: Spektrum hinter dem Mischer mit ZF-Fenster.
// params: { fE?: 145e6, zf?: 10.7e6 (455e3 | 9e6 | 10.7e6), fOsz?: Startwert des Oszillators }
// Ziele: Oszillator so einstellen, dass das Nutzsignal im ZF-Fenster landet; Spiegelstörer durchlassen; Vorselektion eng genug (≥ 40 dB).
import { spectrum, plot } from '../../../assets/js/vizkit/plot.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { fmt } from '../../../assets/js/vizkit/si.js';
import { h } from '../../../assets/js/vizkit/base.js';
import { comma } from './_9-helper.js';

const MHZ = 1e6;
const mhz = (v, d = 3) => comma(v / MHZ, d) + ' MHz';

export default function mount(stage, { params = {}, complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const topBox = h('div'); root.append(topBox);
  const top = plot(topBox, { h: 230, x: { unit: 'Hz', label: 'f', min: 0, max: 160 * MHZ, format: v => comma(v / MHZ, 0) + ' MHz' }, y: { min: 0, max: 1.3, ticks: [0, 0.5, 1], format: v => '' }, legend: true, cursor: false });
  const botBox = h('div'); root.append(botBox);
  const bot = plot(botBox, { h: 190, x: { unit: 'Hz', label: 'f (hinter dem Mischer)', min: 0 }, y: { min: 0, max: 1.3, ticks: [0, 0.5, 1], format: v => '' }, legend: true, cursor: false });
  const note = h('p', { class: 'vz-note' }); root.append(note);
  const zf0 = params.zf ?? 10.7e6, fE0 = params.fE ?? 145e6;
  const ui = controls(root, [
    { id: 'zf', type: 'seg', label: 'Zwischenfrequenz', options: [[455e3, '455 kHz'], [9e6, '9 MHz'], [10.7e6, '10,7 MHz']], value: zf0 },
    { id: 'fE', label: 'Empfangsfrequenz f_E', min: 1e6, max: 150e6, step: 0.1e6, value: fE0, format: v => mhz(v, 1) },
    { id: 'fo', label: 'Oszillator f_OSZ', min: 1e6, max: 200e6, step: 0.001e6, value: params.fOsz ?? 140e6, format: v => mhz(v, 3) },
    { id: 'fs', label: 'Störer f_St', min: 1e6, max: 160e6, step: 0.1e6, value: 100e6, format: v => mhz(v, 1) },
    { id: 'bw', label: 'Vorselektion B', min: 1e6, max: 100e6, value: 40e6, scale: 'log', format: v => mhz(v, v < 10e6 ? 1 : 0) },
    { id: 'toImg', type: 'button', label: 'Störer auf Spiegelfrequenz setzen', onClick: () => { const v = ui.values; ui.set({ fs: Math.round((2 * v.fo - v.fE) / 1e5) * 1e5 }); } },
    { id: 'retune', type: 'button', label: 'Oszillator = f_E − f_ZF', onClick: () => { const v = ui.values; ui.set({ fo: v.fE - v.zf }); } },
  ], (v, id) => { if (id === 'zf' || id === 'fE') retarget(id); run(); });
  const out = readout(root, [
    { id: 'zfm', label: 'Differenz |f_E − f_OSZ|', hl: true }, { id: 'img', label: 'Spiegelfrequenz f_S = 2·f_OSZ − f_E' },
    { id: 'sum', label: 'Summe f_E + f_OSZ' }, { id: 'att', label: 'Störer (Spiegel) im ZF-Fenster' }]);
  const g = goals(root, [
    { id: 'tune', label: 'Oszillator so einstellen, dass das Nutzsignal genau in die ZF fällt' },
    { id: 'img', label: 'Spiegelstörer auf der Spiegelfrequenz hörbar machen' },
    { id: 'pre', label: 'Vorselektion so eng stellen, dass der Spiegelstörer ≥ 40 dB schwächer wird' },
  ], () => complete?.());
  function retarget(id) {
    const v = ui.values, c = v.fE, z = v.zf;
    ui.setRange('fo', { min: Math.max(0.5e6, c - 3 * z), max: c + 3 * z, step: z < 1e6 ? 100 : 1000 });
    if (id === 'fE' || id === 'zf') ui.set({ fo: c - z - (id === 'zf' ? 0 : 0) }, { silent: true });
  }
  retarget();
  ui.set({ fo: params.fOsz ?? Math.round((fE0 - 1.3 * zf0) / 1e3) * 1e3 }, { silent: true });

  const att = (f, c, bw) => -10 * Math.log10(1 + (2 * Math.abs(f - c) / bw) ** 4);   // dB (negativ), 2. Ordnung
  function run() {
    const { zf, fE, fo, fs, bw } = ui.values, wE = 0.3, wS = 1, half = 0.015 * zf;
    const fimg = 2 * fo - fE, curveF = [], curveA = [];
    const xmax = 160 * MHZ; for (let i = 0; i <= 400; i++) { const f = xmax * i / 400; curveF.push(f); curveA.push(1.18 * 10 ** (att(f, fE, bw) / 20)); }
    top.range({ x: [0, xmax] });
    top.line('pre', curveF, curveA, { color: 'var(--accent-2)', width: 2, dash: '6 4', label: 'Vorselektion (Durchlasskurve)', hover: false });
    top.bars('sig', [fE, fs], [wE, wS], { color: 'var(--accent)', barWidth: 5, labels: (x, y) => (y === wE ? 'Nutzsignal' : 'Störer'), labelMin: 0 });
    top.vline('osc', fo, { color: 'var(--warn)', label: 'f_OSZ' });
    if (fimg > 0 && fimg < xmax) top.vline('img', fimg, { color: 'var(--bad)', dash: '4 4' }); else top.removeAnn('img');
    // hinter dem Mischer
    const dE = Math.abs(fE - fo), dS = Math.abs(fs - fo), aE = wE * 10 ** (att(fE, fE, bw) / 20), attS = att(fs, fE, bw), aS = wS * 10 ** (attS / 20);
    const hi = 3 * zf, vis = Math.max(half, 0.012 * hi);
    bot.range({ x: [0, hi] });
    bot.band('zf', zf - vis, zf + vis, { color: 'var(--good)', label: 'ZF-Filter' });
    const bf = [], ba = [];
    if (dE <= hi) { bf.push(dE); ba.push(aE); } if (dS <= hi) { bf.push(dS); ba.push(Math.max(aS, 0.003)); }
    bot.bars('mix', bf, ba, { color: 'var(--accent)', barWidth: 5, labels: (x, y) => (Math.abs(x - dE) < 1 && Math.abs(y - aE) < 1e-9 ? 'Nutzsignal' : 'Störer'), labelMin: 0 });
    bot.ax.x.format = v => (v >= 1e6 ? comma(v / MHZ, v / MHZ < 10 ? 1 : 0) + ' MHz' : comma(v / 1e3, 0) + ' kHz');
    const inE = Math.abs(dE - zf) <= half, inS = Math.abs(dS - zf) <= half;
    const attImg = att(fimg, fE, bw);
    out.set({ zfm: mhz(dE, 3), img: fimg > 0 ? mhz(fimg, 3) : '—', sum: mhz(fE + fo, 1), att: inS ? comma(attS, 1) + ' dB (kommt durch!)' : 'außerhalb' });
    note.textContent = (inE ? `Das Nutzsignal landet bei ${mhz(dE, 3)} im ZF-Fenster (${mhz(zf, 3)}) und wird verstärkt.` : `Das Nutzsignal landet bei ${mhz(dE, 3)} — das ZF-Filter bei ${mhz(zf, 3)} lässt es nicht durch. Oszillator nachstellen.`) + ' (Orange: Oszillator, rot gestrichelt: Spiegelfrequenz.)';
    if (inE) g.reach('tune');
    if (inE && inS && Math.abs(fs - fimg) <= half) g.reach('img');
    if (inE && Math.abs(fs - fimg) < 0.2 * MHZ && attImg <= -40) g.reach('pre');
  }
  run();
}
