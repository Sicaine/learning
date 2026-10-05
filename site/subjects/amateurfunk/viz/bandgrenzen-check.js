// Bandgrenzen-Check: Wo liegt das Sendesignal relativ zur Bandgrenze, und ist die belegte Bandbreite zulässig?
// Zulässige Bandbreiten: AFuV Anlage 1, Teil B (Nr. 1, 3, 4, 6, 7), Stand 05.10.2026.
// params: { } – Ziele: FM 15 kHz am unteren Rand von 70 cm (7,5 kHz Abstand), LSB am oberen Rand von 80 m,
//   USB am oberen Rand von 80 m (außerhalb!), AM auf 30 m (zu breit).
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { chart, h, txt, line, rect, fmtF, trimDec } from './_funk.js';

const BANDS = {
  '80': { name: '80 m', lo: 3500e3, hi: 3800e3, lim: () => 2700, note: 'Nr. 3: 2,7 kHz' },
  '30': { name: '30 m', lo: 10100e3, hi: 10150e3, lim: () => 800, note: 'Nr. 1: 800 Hz' },
  '10': { name: '10 m', lo: 28000e3, hi: 29700e3, lim: c => (c < 29e6 ? 7000 : 40000), note: 'Nr. 4: 7 kHz unterhalb 29 MHz, 40 kHz oberhalb' },
  '2': { name: '2 m', lo: 144e6, hi: 146e6, lim: () => 40e3, note: 'Nr. 6: 40 kHz' },
  '70': { name: '70 cm', lo: 430e6, hi: 440e6, lim: (c, mode) => (mode === 'atv' ? 7e6 : 2e6), note: 'Nr. 7: 2 MHz, AM-Fernsehen 7 MHz' },
};
const MODES = { cw: ['CW', 300], usb: ['USB', 2400], lsb: ['LSB', 2400], am: ['AM', 6000], fm: ['FM 15 kHz', 15000], atv: ['ATV (AM-TV)', 6e6] };

export default function mount(stage, { complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  let c = null;
  const ui = controls(root, [
    { id: 'band', type: 'seg', label: 'Band', options: Object.entries(BANDS).map(([k, b]) => [k, b.name]), value: '70' },
    { id: 'mode', type: 'seg', label: 'Sendeart', options: Object.entries(MODES).map(([k, m]) => [k, m[0]]), value: 'fm' },
    { id: 'edge', type: 'seg', label: 'Bandgrenze', options: [['lo', 'untere'], ['hi', 'obere']], value: 'lo' },
    { id: 'off', label: 'Abstand zur Bandgrenze (+ ins Band)', unit: 'kHz', min: -12, max: 25, step: 0.5, value: 0, format: v => (v > 0 ? '+' : '') + trimDec(v, 2) + ' kHz', digits: 2 },
  ], run);
  const out = readout(root, [{ id: 'fd', label: 'Einstellfrequenz' }, { id: 'rng', label: 'belegt von … bis' }, { id: 'bw', label: 'Bandbreite / zulässig', hl: true }, { id: 'res', label: 'Ergebnis', hl: true }]);
  const g = goals(root, [
    { id: 'fm', label: 'FM 15 kHz an der unteren Bandgrenze von 70 cm: kleinsten erlaubten Abstand finden' },
    { id: 'lsb', label: 'LSB: genau auf die obere Bandgrenze von 80 m einstellen und senden dürfen' },
    { id: 'usb', label: 'USB: dieselbe Einstellung ist verboten' },
    { id: 'am', label: 'AM auf 30 m: Bandbreite überschritten' },
  ], () => complete?.());
  let lastMode = null;

  function run(v, id) {
    const b = BANDS[v.band], [, B] = MODES[v.mode];
    if (v.mode !== lastMode) {
      lastMode = v.mode;
      const wide = B >= 1e6;
      ui.setRange('off', wide ? { min: -8000, max: 8000, step: 100 } : { min: -12, max: 25, step: 0.5 });
      if (wide) ui.set({ off: 0 }, { silent: true });
    }
    const edge = v.edge === 'lo' ? b.lo : b.hi, dir = v.edge === 'lo' ? 1 : -1;
    const fd = edge + dir * v.off * 1000;
    let lo = fd - B / 2, hi = fd + B / 2;
    if (v.mode === 'usb') { lo = fd; hi = fd + B; } else if (v.mode === 'lsb') { lo = fd - B; hi = fd; }
    const lim = b.lim((lo + hi) / 2, v.mode), eps = 1e-6;
    const inBand = lo >= b.lo - eps && hi <= b.hi + eps, bwOk = B <= lim + eps;
    const res = !bwOk ? 'Bandbreite zu groß' : !inBand ? 'außerhalb des Bandes' : 'im Band – erlaubt';
    out.set({ fd: fmtF(fd, 5), rng: fmtF(lo, 5) + ' … ' + fmtF(hi, 5), bw: fmtF(B, 2) + ' / ' + fmtF(lim, 2), res });

    // Zeichnung: x = Frequenz − Bandgrenze in kHz
    const S = Math.max(14, B / 1000 * 1.7), span = S <= 16 ? 14 : S <= 30 ? 28 : S <= 60 ? 60 : Math.ceil(S / 1000) * 1000;
    c?.svg.remove();
    c = chart(root, { h: 190, x: [-span, span], y: [0, 1], xticks: [-span, -span / 2, 0, span / 2, span], xfmt: t => (t > 0 ? '+' : t < 0 ? '−' : '') + (Math.abs(t) >= 1000 ? trimDec(Math.abs(t) / 1000, 1) + ' MHz' : trimDec(Math.abs(t), 1) + ' kHz'), aria: 'Frequenzachse an der Bandgrenze mit belegtem Frequenzbereich' });
    root.insertBefore(c.svg, root.firstChild);
    const X = f => c.X((f - edge) / 1000);
    const bandX0 = v.edge === 'lo' ? c.X(0) : c.m.l, bandX1 = v.edge === 'lo' ? c.W - c.m.r : c.X(0);
    c.add(rect(c.m.l, c.m.t, c.W - c.m.l - c.m.r, c.Y(0) - c.m.t, { fill: 'var(--bad)', fo: 0.07 }),
      rect(bandX0, c.m.t, bandX1 - bandX0, c.Y(0) - c.m.t, { fill: 'var(--good)', fo: 0.14 }),
      line(c.X(0), c.m.t, c.X(0), c.Y(0), { color: 'var(--ink)', w: 2 }),
      txt(c.X(0) + (v.edge === 'lo' ? 6 : -6), c.m.t + 12, 'Bandgrenze ' + fmtF(edge, 4), { anchor: v.edge === 'lo' ? 'start' : 'end', fill: 'var(--ink)', bold: true }),
      txt(v.edge === 'lo' ? c.m.l + 6 : c.W - c.m.r - 6, c.m.t + 28, 'nicht Amateurfunk', { anchor: v.edge === 'lo' ? 'start' : 'end', fill: 'var(--bad)' }),
      txt(v.edge === 'lo' ? c.W - c.m.r - 6 : c.m.l + 6, c.m.t + 28, 'Amateurfunkband', { anchor: v.edge === 'lo' ? 'end' : 'start', fill: 'var(--good)' }));
    const col = res.startsWith('im') ? 'var(--accent)' : 'var(--bad)';
    const x0 = Math.max(c.m.l, Math.min(X(lo), X(hi))), x1 = Math.min(c.W - c.m.r, Math.max(X(lo), X(hi)));
    c.add(rect(x0, c.Y(0.62), Math.max(2, x1 - x0), c.Y(0) - c.Y(0.62), { fill: col, fo: 0.35, stroke: col, sw: 1.5 }),
      line(X(fd), c.Y(0.62) - 14, X(fd), c.Y(0), { color: 'var(--ink)', w: 1.5, dash: '3 3' }),
      txt(Math.max(c.m.l + 30, Math.min(c.W - c.m.r - 30, X(fd))), c.Y(0.62) - 18, 'eingestellt: ' + fmtF(fd, 4), { anchor: 'middle', size: 10.5, fill: 'var(--ink)' }),
      x1 + 130 < c.W ? txt(x1 + 6, c.Y(0.3), 'belegt: ' + fmtF(B, 2), { size: 11, fill: col, bold: true }) : txt(x0 - 6, c.Y(0.3), 'belegt: ' + fmtF(B, 2), { anchor: 'end', size: 11, fill: col, bold: true }));

    if (!id) return;
    if (v.band === '70' && v.mode === 'fm' && v.edge === 'lo' && res.startsWith('im') && Math.abs(v.off - 7.5) < 1e-9) g.reach('fm');
    if (v.band === '80' && v.mode === 'lsb' && v.edge === 'hi' && v.off === 0 && res.startsWith('im')) g.reach('lsb');
    if (v.band === '80' && v.mode === 'usb' && v.edge === 'hi' && v.off === 0 && res.startsWith('außerhalb')) g.reach('usb');
    if (v.band === '30' && v.mode === 'am' && res.startsWith('Bandbreite')) g.reach('am');
  }
  run(ui.values);
}
