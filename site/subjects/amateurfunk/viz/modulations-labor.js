// Modulations-Labor: CW, AM und SSB (USB/LSB) im Zeitbereich und als Spektrum – mit echten Sendefrequenzen.
// Das Zeitbild ist herabskaliert (Träger 10 kHz statt MHz), das Spektrum zeigt die tatsächlichen Frequenzen.
// params: { } – Ziele: USB 21,250 + 1 kHz, LSB 3,650 − 2 kHz, AM-/SSB-Bandbreite vergleichen, CW ansehen.
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { chart, h, s, txt, line, rect, poly, trimDec, dec, fmtF, SPEECH } from './_funk.js';

export default function mount(stage, { complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const tp = chart(root, { h: 170, x: [0, 4], y: [-1.25, 1.25], xticks: [0, 1, 2, 3, 4], xfmt: v => v + ' ms', aria: 'Zeitverlauf des Sendesignals (Träger zur Anschauung herabskaliert)' });
  const sp = chart(root, { h: 210, x: [-3.4, 3.4], y: [0, 1.25], xticks: [-3, -2, -1, 0, 1, 2, 3], xfmt: v => (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(v) + ' kHz', aria: 'Spektrum um die Trägerfrequenz' });
  const ui = controls(root, [
    { id: 'mode', type: 'seg', label: 'Sendeart', options: [['cw', 'CW'], ['am', 'AM'], ['usb', 'SSB · USB'], ['lsb', 'SSB · LSB']], value: 'am' },
    { id: 'fc', type: 'seg', label: 'Trägerfrequenz', options: [[3.65e6, '3,65 MHz'], [7.1e6, '7,1 MHz'], [21.25e6, '21,25 MHz']], value: 21.25e6 },
    { id: 'src', type: 'seg', label: 'NF-Signal', options: [['speech', 'Sprache (0,3–2,7 kHz)'], ['tone', 'Einzelton']], value: 'speech' },
    { id: 'f1', label: 'Tonfrequenz (Einzelton)', unit: 'Hz', min: 300, max: 2700, step: 100, value: 1000 },
    { id: 'm', label: 'Modulationsgrad m (nur AM)', min: 0.1, max: 1, step: 0.05, value: 0.6, digits: 2, format: v => dec(v, 2) },
  ], run);
  const out = readout(root, [{ id: 'fr', label: 'Gesendet wird', hl: true }, { id: 'bw', label: 'Bandbreite' }, { id: 'car', label: 'Träger' }]);
  const g = goals(root, [
    { id: 'usb', label: 'USB: 21,250 MHz + 1 kHz ablesen' },
    { id: 'lsb', label: 'LSB: 3,65 MHz − 2 kHz ablesen' },
    { id: 'cmp', label: 'Bandbreite AM und SSB (Sprache) vergleichen' },
    { id: 'cw', label: 'CW ansehen' },
  ], () => complete?.());
  const seen = new Set();

  function run(v) {
    const { mode, fc, src, f1, m } = v;
    const tones = src === 'speech' ? SPEECH.f.map((f, i) => [f, SPEECH.a[i]]) : [[f1, 1]];
    const sum = tones.reduce((a, t) => a + t[1], 0);
    // ── Zeitbereich (Träger herabskaliert auf 10 kHz)
    const fcs = 10000, N = 700, pts = [], up = [], lo = [];
    const key = t => { const tm = t * 1000; return (tm < 1.2 || (tm >= 1.6 && tm < 2.0) || (tm >= 2.4 && tm < 3.6)) ? 1 : 0; };
    for (let i = 0; i < N; i++) {
      const t = 0.004 * i / (N - 1);
      const x = tones.reduce((a, [f, am]) => a + am * Math.sin(2 * Math.PI * f * t), 0) / sum;
      let u;
      if (mode === 'cw') u = key(t) * Math.sin(2 * Math.PI * fcs * t);
      else if (mode === 'am') { u = (1 + m * x) * Math.sin(2 * Math.PI * fcs * t) / (1 + m); up.push([tp.X(t * 1000), tp.Y((1 + m * x) / (1 + m))]); lo.push([tp.X(t * 1000), tp.Y(-(1 + m * x) / (1 + m))]); }
      else { const sg = mode === 'usb' ? 1 : -1; u = tones.reduce((a, [f, am]) => a + am / sum * Math.sin(2 * Math.PI * (fcs + sg * f) * t), 0); }
      pts.push([tp.X(t * 1000), tp.Y(u)]);
    }
    tp.clear();
    tp.add(line(tp.X(0), tp.Y(0), tp.X(4), tp.Y(0), { color: 'var(--line-2)', w: 1 }));
    if (mode === 'am') tp.add(poly(up, { color: 'var(--accent-2)', dash: '5 4', w: 1.6 }), poly(lo, { color: 'var(--accent-2)', dash: '5 4', w: 1.6 }), txt(tp.X(3.98), tp.Y(1.08), 'Hüllkurve = NF-Signal', { anchor: 'end', fill: 'var(--accent-2)' }));
    tp.add(poly(pts, { color: 'var(--accent)', w: 1.2 }));
    const cap = { cw: 'Träger wird im Takt der Morsezeichen ein- und ausgeschaltet (hier: − · −)', am: 'Amplitude folgt dem NF-Signal, Frequenz bleibt', usb: 'Nur Frequenzen oberhalb des (unterdrückten) Trägers', lsb: 'Nur Frequenzen unterhalb des (unterdrückten) Trägers' }[mode];
    tp.add(txt(tp.X(0.05), tp.Y(1.12), cap, { fill: 'var(--ink-2)', size: 11.5 }));

    // ── Spektrum (Offset in kHz zum Träger)
    sp.clear();
    const frs = [], K = (hz) => sp.X(hz / 1000);
    const lineAt = (off, amp, col, lbl) => { sp.add(line(K(off), sp.Y(0), K(off), sp.Y(amp), { color: col, w: 3 })); if (lbl) sp.add(txt(K(off), sp.Y(amp) - 5, lbl, { anchor: 'middle', size: 10.5, fill: col })); };
    const block = (a, b, amp, col) => sp.add(rect(Math.min(K(a), K(b)), sp.Y(amp), Math.abs(K(b) - K(a)), sp.Y(0) - sp.Y(amp), { fill: col, fo: 0.35, stroke: col }));
    let lo_ = 0, hi_ = 0;
    if (mode === 'cw') { lineAt(0, 1, 'var(--accent)', 'Träger'); sp.add(txt(K(0) + 8, sp.Y(0.55), 'Bandbreite bei 20 WPM etwa 300 Hz', { size: 10.5 })); frs.push(fc); lo_ = hi_ = 0; }
    else if (mode === 'am') {
      lineAt(0, 1, 'var(--accent)', 'Träger');
      if (src === 'speech') { block(-SPEECH.fmax, -SPEECH.fmin, 0.3 * m, 'var(--accent-2)'); block(SPEECH.fmin, SPEECH.fmax, 0.3 * m, 'var(--accent-2)'); lo_ = -SPEECH.fmax; hi_ = SPEECH.fmax; sp.add(txt(K(-1500), sp.Y(0.3 * m) - 5, 'LSB', { anchor: 'middle', fill: 'var(--accent-2)' }), txt(K(1500), sp.Y(0.3 * m) - 5, 'USB', { anchor: 'middle', fill: 'var(--accent-2)' })); frs.push(fc - SPEECH.fmax, fc + SPEECH.fmax); }
      else { lineAt(-f1, m / 2, 'var(--accent-2)', 'LSB'); lineAt(f1, m / 2, 'var(--accent-2)', 'USB'); lo_ = -f1; hi_ = f1; frs.push(fc - f1, fc, fc + f1); }
    } else {
      const sg = mode === 'usb' ? 1 : -1;
      sp.add(line(K(0), sp.Y(0), K(0), sp.Y(0.55), { color: 'var(--muted)', w: 2, dash: '4 4' }), txt(K(0), sp.Y(0.55) - 5, 'Träger unterdrückt', { anchor: 'middle', size: 10.5 }));
      if (src === 'speech') { const a = sg > 0 ? SPEECH.fmin : -SPEECH.fmax, b = sg > 0 ? SPEECH.fmax : -SPEECH.fmin; block(a, b, 0.65, 'var(--accent)'); lo_ = a; hi_ = b; sp.add(txt(K((a + b) / 2), sp.Y(0.65) - 5, mode === 'usb' ? 'oberes Seitenband' : 'unteres Seitenband', { anchor: 'middle', fill: 'var(--accent)' })); frs.push(fc + a, fc + b); }
      else { lineAt(sg * f1, 1, 'var(--accent)', trimDec((fc + sg * f1) / 1e6, 4) + ' MHz'); lo_ = hi_ = sg * f1; frs.push(fc + sg * f1); }
    }
    const bw = mode === 'cw' ? 300 : hi_ - lo_;
    out.set({
      fr: mode === 'cw' || frs.length === 1 ? fmtF(frs[0], 5) : frs.length === 2 ? fmtF(frs[0], 5) + ' … ' + fmtF(frs[1], 5) : frs.map(f => trimDec(f / 1e6, 4)).join(' · ') + ' MHz',
      bw: mode === 'cw' ? '≈ 300 Hz' : bw === 0 ? '≈ 0 (eine Linie)' : fmtF(bw, 2),
      car: mode === 'usb' || mode === 'lsb' ? 'unterdrückt' : mode === 'cw' ? 'getastet' : 'wird mitgesendet',
    });

    // ── Ziele
    if (mode === 'usb' && src === 'tone' && f1 === 1000 && fc === 21.25e6) g.reach('usb');
    if (mode === 'lsb' && src === 'tone' && f1 === 2000 && fc === 3.65e6) g.reach('lsb');
    if (src === 'speech' && (mode === 'am' || mode === 'usb' || mode === 'lsb')) { seen.add(mode === 'am' ? 'am' : 'ssb'); if (seen.has('am') && seen.has('ssb')) g.reach('cmp'); }
    if (mode === 'cw') g.reach('cw');
  }
  run(ui.values);
}
