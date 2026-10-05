// Superhet-Rechner: VFO so einstellen, dass die Empfangsfrequenz auf die feste Zwischenfrequenz (ZF) gemischt wird.
// Mischprodukte f_z = |f_e ± f_o|; Spiegelfrequenz f_s = 2·f_o − f_e (Vertiefung, kein Prüfungsstoff der Klasse E).
// Vereinfachtes Modell: Eingangs-Bandpass 2. Ordnung mit 4 % Bandbreite, ZF-Filter 2,4 kHz.
// params: { }
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { chart, h, txt, line, rect, fmtF, trimDec } from './_funk.js';

const attDb = (d, fe) => 10 * Math.log10(1 + (2 * Math.abs(d) / (0.04 * fe)) ** 4);

export default function mount(stage, { complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  let c1 = null, c2 = null;
  const wrap = h('div'); root.append(wrap);
  const ui = controls(root, [
    { id: 'fe', type: 'seg', label: 'Empfangsfrequenz f_e', options: [[3.65e6, '3,65 MHz'], [7.1e6, '7,1 MHz'], [14.2e6, '14,2 MHz'], [28.5e6, '28,5 MHz']], value: 7.1e6 },
    { id: 'zf', type: 'seg', label: 'Zwischenfrequenz f_z', options: [[455e3, '455 kHz'], [9e6, '9 MHz']], value: 455e3 },
    { id: 'fo', label: 'VFO grob', min: 7.1e6 - 683e3, max: 7.1e6 + 683e3, step: 1000, value: 7.1e6, format: v => trimDec(v / 1e6, 4) + ' MHz', digits: 4 },
    { id: 'fine', label: 'VFO fein', min: -15e3, max: 15e3, step: 100, value: 0, format: v => (v > 0 ? '+' : '') + trimDec(v / 1e3, 1) + ' kHz', digits: 1 },
    { id: 'jam', type: 'toggle', label: 'Starker Sender auf der Spiegelfrequenz', value: false },
    { id: 'pre', type: 'toggle', label: 'Eingangsfilter (Vorselektion) aktiv', value: true },
  ], run);
  const out = readout(root, [{ id: 'fo', label: 'VFO f_o' }, { id: 'sum', label: 'f_e + f_o' }, { id: 'dif', label: '|f_e − f_o|', hl: true }, { id: 'zfok', label: 'ZF-Filter' }, { id: 'img', label: 'Spiegelfrequenz f_s' }, { id: 'att', label: 'Spiegel-Dämpfung' }]);
  const note = h('div', { class: 'vz-note', style: 'line-height:1.55;margin:6px 0;min-height:3.2em' }); root.append(note);
  const g = goals(root, [
    { id: 'zf', label: 'Empfangssignal genau auf die ZF mischen' },
    { id: 'jam', label: 'Spiegelfrequenz-Störer wird mit in die ZF gemischt' },
    { id: 'pre', label: 'Eingangsfilter drückt den Störer unter das Nutzsignal' },
    { id: 'hi', label: 'ZF 9 MHz: Spiegel liegt weiter weg, Dämpfung steigt' },
  ], () => complete?.());
  let last = { fe: 7.1e6, zf: 455e3 };

  function run(v, id) {
    if (v.fe !== last.fe || v.zf !== last.zf) {
      last = { fe: v.fe, zf: v.zf };
      const m = Math.round(1.5 * v.zf / 1000) * 1000; ui.setRange('fo', { min: v.fe - m, max: v.fe + m, step: 1000 });
      ui.set({ fo: v.fe, fine: 0 }, { silent: true });
      v = ui.values;
    }
    const fe = v.fe, zf = v.zf, fo = v.fo + v.fine, fs = 2 * fo - fe;
    const fz1 = fe + fo, fz2 = Math.abs(fe - fo), inZF = Math.abs(fz2 - zf) <= 1200;
    const att = attDb(fs - fe, fe), attEff = v.pre ? att : 0, jamAmp = 1 * 10 ** (-attEff / 20), wanted = 0.15;
    const jamIn = Math.abs(Math.abs(fs - fo) - zf) <= 1200 && inZF;
    out.set({ fo: fmtF(fo, 5), sum: fmtF(fz1, 5), dif: fmtF(fz2, 5), zfok: inZF ? 'passt (' + fmtF(zf, 3) + ')' : 'verfehlt', img: fmtF(fs, 5), att: v.pre ? trimDec(att, 0) + ' dB' : '0 dB (Filter aus)' });
    // Bild oben: Eingangsband; unten: hinter dem Mischer um die ZF
    c1?.svg.remove(); c2?.svg.remove(); wrap.replaceChildren();
    const span = 2.6 * zf, lo = fe - span, hi = fe + span;
    c1 = chart(wrap, { h: 190, x: [lo, hi], y: [0, 1.25], xticks: [fe - 2 * zf, fe - zf, fe, fe + zf, fe + 2 * zf], xfmt: t => (Math.abs(t) >= 1e6 ? trimDec(t / 1e6, 3) + ' MHz' : trimDec(t / 1e3, 0) + ' kHz'), aria: 'Frequenzachse vor dem Mischer: Empfangsfrequenz, VFO, Spiegelfrequenz und Eingangsfilter' });
    const pts = []; for (let i = 0; i <= 200; i++) { const f = lo + (hi - lo) * i / 200; pts.push([c1.X(f), c1.Y(1.05 * 10 ** (-(v.pre ? attDb(f - fe, fe) : 0) / 20))]); }
    c1.add(s2(pts, 'var(--accent)'));
    const mk = (f, amp, col, lbl, dash) => { if (f < lo || f > hi) { c1.add(txt(f < lo ? c1.m.l + 2 : c1.W - c1.m.r - 2, c1.Y(amp) - 4, (f < lo ? '◀ ' : '') + lbl + (f < lo ? '' : ' ▶'), { anchor: f < lo ? 'start' : 'end', size: 10.5, fill: col })); return; } c1.add(line(c1.X(f), c1.Y(0), c1.X(f), c1.Y(amp), { color: col, w: 3, dash }), txt(c1.X(f), c1.Y(amp) - 5, lbl, { anchor: 'middle', size: 10.5, fill: col })); };
    mk(fe, wanted + 0.1, 'var(--accent)', 'f_e'); mk(fo, 1.0, 'var(--warn)', 'VFO', '4 3');
    if (v.jam) mk(fs, 1.1, 'var(--bad)', 'Störer f_s'); else mk(fs, 0.35, 'var(--muted)', 'f_s', '3 4');
    // hinter dem Mischer
    c2 = chart(wrap, { h: 150, x: [zf - 8e3, zf + 8e3], y: [0, 1.3], xticks: [zf - 5e3, zf, zf + 5e3], xfmt: t => (Math.abs(t) >= 1e6 ? trimDec(t / 1e6, 4) + ' MHz' : trimDec(t / 1e3, 1) + ' kHz'), aria: 'Spektrum hinter dem Mischer um die Zwischenfrequenz mit ZF-Filter' });
    c2.add(rect(c2.X(zf - 1200), c2.m.t, c2.X(zf + 1200) - c2.X(zf - 1200), c2.Y(0) - c2.m.t, { fill: 'var(--accent-2)', fo: 0.13, stroke: 'var(--accent-2)' }), txt(c2.X(zf), c2.m.t + 12, 'ZF-Filter 2,4 kHz', { anchor: 'middle', size: 10.5, fill: 'var(--accent-2)' }));
    if (fz2 >= zf - 8e3 && fz2 <= zf + 8e3) c2.add(line(c2.X(fz2), c2.Y(0), c2.X(fz2), c2.Y(wanted * 3), { color: 'var(--accent)', w: 4 }), txt(c2.X(fz2), c2.Y(wanted * 3) - 5, 'Nutzsignal', { anchor: 'middle', size: 10.5, fill: 'var(--accent)' }));
    const fj = Math.abs(fs - fo);
    if (v.jam && fj >= zf - 8e3 && fj <= zf + 8e3) c2.add(line(c2.X(fj) + 6, c2.Y(0), c2.X(fj) + 6, c2.Y(Math.min(1.2, jamAmp * 1.0)), { color: 'var(--bad)', w: 4 }), txt(c2.X(fj) + 6, c2.Y(Math.min(1.2, jamAmp)) - 5, 'Störer', { anchor: 'middle', size: 10.5, fill: 'var(--bad)' }));
    note.innerHTML = !inZF ? 'Stelle den VFO so ein, dass <b>|f_e − f_o|</b> die Zwischenfrequenz ergibt. Es gibt zwei Lösungen: VFO <b>über</b> oder <b>unter</b> der Empfangsfrequenz.' : v.jam ? (jamAmp > wanted ? '<b style="color:var(--bad)">Der Störer auf f_s = 2·f_o − f_e wird genauso auf die ZF gemischt wie dein Nutzsignal und ist stärker.</b> Hinter dem Mischer lässt er sich nicht mehr trennen. Hilfe bringt nur eine Dämpfung <b>vor</b> dem Mischer (Eingangsfilter) oder eine höhere ZF.' : 'Der Störer wird zwar auch gemischt, aber das Eingangsfilter hat ihn vorher so weit gedämpft, dass er unter dem Nutzsignal liegt.') : 'Treffer: Das Nutzsignal liegt in der ZF. Schalte oben den Störer auf der Spiegelfrequenz ein und beobachte, was passiert.';
    if (!id) return;
    if (inZF) g.reach('zf');
    if (inZF && v.jam && !v.pre) g.reach('jam');
    if (inZF && v.jam && v.pre && jamAmp < wanted) g.reach('pre');
    if (inZF && zf === 9e6 && v.pre && att > 60) g.reach('hi');
  }
  function s2(pts, col) { const e = document.createElementNS('http://www.w3.org/2000/svg', 'polygon'); e.setAttribute('points', [[pts[0][0], c1.Y(0)], ...pts, [pts[pts.length - 1][0], c1.Y(0)]].map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ')); e.setAttribute('fill', col); e.setAttribute('fill-opacity', '0.1'); e.setAttribute('stroke', col); e.setAttribute('stroke-opacity', '0.4'); return e; }
  run(ui.values);
}
