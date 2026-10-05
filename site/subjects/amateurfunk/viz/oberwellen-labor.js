// Oberwellen-Labor: Endstufe übersteuern oder falsch einstellen → Oberwellen; Filter dahinter. Die Spektrallinien werden aus der
// tatsächlichen Signalform (beschnittener Sinus, Fourier-Zerlegung) berechnet. Filtermodelle: Butterworth 9. Ordnung.
// params: { }
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { chart, h, txt, line, rect, poly, fmtF, dec, trimDec, clamp } from './_funk.js';

const SERVICES = [[87.5e6, 108e6, 'UKW-Rundfunk'], [108e6, 137e6, 'Flugfunk'], [470e6, 790e6, 'Fernsehen (UHF)'], [7.2e6, 7.45e6, 'Kurzwellenrundfunk (41 m)'], [47e6, 68e6, 'Fernsehen (Band I)']];
const svcAt = f => { const s = SERVICES.find(([a, b]) => f >= a && f <= b); return s ? s[2] : null; };

export default function mount(stage, { complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const wf = chart(root, { h: 150, x: [0, 1], y: [-1.45, 1.45], xticks: [0, 0.25, 0.5, 0.75, 1], xfmt: t => (t === 0 ? '0' : t === 1 ? 'T' : ''), aria: 'Ausgangssignal der Endstufe über eine Periode' });
  const sp = chart(root, { h: 240, x: [0.4, 6.6], y: [-85, 6], xticks: [1, 2, 3, 4, 5, 6], xfmt: n => n + '·f₀', yticks: [0, -20, -40, -60, -80], yfmt: t => t + ' dB', aria: 'Spektrum: Grundwelle und Oberwellen, mit und ohne Filter' });
  const ui = controls(root, [
    { id: 'f0', type: 'seg', label: 'Sendefrequenz f₀', options: [[3.65e6, '3,65 MHz'], [14.2e6, '14,2 MHz'], [28.5e6, '28,5 MHz'], [145.9e6, '145,9 MHz']], value: 145.9e6 },
    { id: 'drv', label: 'Aussteuerung der Endstufe', min: 0.4, max: 2.2, step: 0.05, value: 0.9, format: v => dec(v, 2), digits: 2 },
    { id: 'bias', label: 'Arbeitspunkt (Vorspannung)', min: -0.4, max: 0.4, step: 0.05, value: 0, format: v => (v > 0 ? '+' : '') + dec(v, 2), digits: 2 },
    { id: 'flt', type: 'seg', label: 'Filter nach der Endstufe', options: [['none', 'keines'], ['lp', 'Tiefpass'], ['hp', 'Hochpass'], ['bp', 'Bandpass']], value: 'none' },
  ], run);
  const out = readout(root, [{ id: 'h2', label: '2·f₀' }, { id: 'h3', label: '3·f₀' }, { id: 'fund', label: 'Grundwelle nach Filter', hl: true }, { id: 'hit', label: 'Oberwelle trifft', hl: true }]);
  const note = h('div', { class: 'vz-note', style: 'line-height:1.55;margin:6px 0;min-height:3.2em' }); root.append(note);
  const g = goals(root, [
    { id: 'over', label: 'Endstufe übersteuern: Oberwellen wachsen' },
    { id: 'bias', label: 'Arbeitspunkt verstellen: die 2. Oberwelle entsteht' },
    { id: 'lp', label: 'Tiefpass: 2. Oberwelle ≥ 30 dB gedämpft, Grundwelle bleibt' },
    { id: 'hp', label: 'Hochpass probieren: er sperrt das Falsche' },
  ], () => complete?.());

  function harmonics(d, b) {
    const N = 512, y = new Float64Array(N);
    for (let k = 0; k < N; k++) y[k] = clamp(d * Math.sin(2 * Math.PI * k / N) + b, -1, 1);
    const a = [0];
    for (let n = 1; n <= 6; n++) { let re = 0, im = 0; for (let k = 0; k < N; k++) { re += y[k] * Math.cos(2 * Math.PI * n * k / N); im -= y[k] * Math.sin(2 * Math.PI * n * k / N); } a[n] = 2 / N * Math.hypot(re, im); }
    return { a, y };
  }
  const filt = (type, n) => {   // Dämpfung in dB (positiv) bei n·f₀
    if (type === 'lp') return 10 * Math.log10(1 + (n / 1.3) ** 18);
    if (type === 'hp') return 10 * Math.log10(1 + (1.6 / n) ** 18);
    if (type === 'bp') return 10 * Math.log10(1 + (Math.abs(n - 1) / 0.22) ** 6);
    return 0;
  };

  function run(v, id) {
    const { a, y } = harmonics(v.drv, v.bias);
    const rel = n => Math.max(-80, 20 * Math.log10(Math.max(1e-6, a[n] / Math.max(a[1], 1e-9))), -62 - 6 * (n - 2));
    wf.clear(); sp.clear();
    wf.add(line(wf.X(0), wf.Y(1), wf.X(1), wf.Y(1), { color: 'var(--bad)', w: 1, dash: '4 4', opacity: 0.6 }), line(wf.X(0), wf.Y(-1), wf.X(1), wf.Y(-1), { color: 'var(--bad)', w: 1, dash: '4 4', opacity: 0.6 }), txt(wf.W - wf.m.r - 4, wf.Y(1) - 4, 'Aussteuerungsgrenze', { anchor: 'end', size: 10.5, fill: 'var(--bad)' }),
      poly(Array.from(y, (yy, k) => [wf.X(k / y.length), wf.Y(yy)]), { color: 'var(--accent)', w: 2 }), line(wf.X(0), wf.Y(0), wf.X(1), wf.Y(0), { color: 'var(--line-2)', w: 1 }));
    const col = (n, after) => (n === 1 ? 'var(--accent)' : after ? 'var(--good)' : 'var(--warn)');
    for (let n = 1; n <= 6; n++) {
      const before = n === 1 ? 0 : rel(n), after = before - filt(v.flt, n) + (n === 1 ? 0 : 0);
      const x = n;
      sp.add(rect(sp.X(x - 0.2), sp.Y(Math.max(-85, before)), sp.X(x) - sp.X(x - 0.2) - 1, sp.Y(-85) - sp.Y(Math.max(-85, before)), { fill: 'var(--muted)', fo: 0.35 }));
      sp.add(rect(sp.X(x) + 1, sp.Y(Math.max(-85, after)), sp.X(x + 0.2) - sp.X(x) - 1, sp.Y(-85) - sp.Y(Math.max(-85, after)), { fill: col(n, true), fo: 0.8 }));
      sp.add(txt(sp.X(x), sp.m.t + 10, trimDec(v.f0 * n / 1e6, 2), { anchor: 'middle', size: 10.5, fill: svcAt(v.f0 * n) && n > 1 ? 'var(--bad)' : 'var(--muted)', bold: !!(svcAt(v.f0 * n) && n > 1) }));
    }
    sp.add(txt(sp.m.l + 4, sp.m.t + 10, 'MHz:', { size: 10.5 }), txt(sp.W - sp.m.r - 2, sp.Y(-12), 'grau: ohne Filter', { anchor: 'end', size: 10.5, fill: 'var(--ink-2)' }), txt(sp.W - sp.m.r - 2, sp.Y(-19), 'farbig: nach dem Filter', { anchor: 'end', size: 10.5, fill: 'var(--ink-2)' }));
    const f1 = -filt(v.flt, 1), after2 = rel(2) - filt(v.flt, 2), hits = [2, 3, 4, 5, 6].filter(n => svcAt(v.f0 * n) && rel(n) - filt(v.flt, n) > -50).map(n => `${n}·f₀ = ${fmtF(v.f0 * n, 4)} (${svcAt(v.f0 * n)})`);
    out.set({ h2: dec(rel(2), 0) + ' dB' + (v.flt !== 'none' ? ' → ' + dec(after2, 0) : ''), h3: dec(rel(3), 0) + ' dB', fund: dec(f1, 1) + ' dB', hit: hits.length ? hits[0] : 'nichts über −50 dB' });
    note.innerHTML = v.flt === 'none' ? (rel(3) > -40 || rel(2) > -40 ? '<b>Ohne Filter</b> geht alles, was die Endstufe erzeugt, zur Antenne. Ein beschnittener oder verschobener Sinus besteht aus Grundwelle <b>plus</b> ganzzahligen Vielfachen: den Oberwellen. Sie landen in anderen Funkdiensten.' : 'Ein <b>sinusförmiges</b> Signal enthält keine Oberwellen. Steuere die Endstufe über 1,0 hinaus aus oder verstelle den Arbeitspunkt.') : v.flt === 'lp' ? 'Der <b>Tiefpass</b> lässt die Grundwelle durch und sperrt alles darüber: genau das braucht man gegen Oberwellen (Oberwellenfilter). Bei Mehrband-Sendern wird beim Bandwechsel ein passender Tiefpass umgeschaltet.' : v.flt === 'hp' ? 'Der <b>Hochpass</b> macht es genau verkehrt: Die Grundwelle wird gesperrt, die Oberwellen kommen durch.' : 'Ein <b>Bandpass</b> lässt nur das Nutzband durch und unterdrückt Oberwellen ebenfalls, typisch bei Einband-Sendern und im VHF/UHF/SHF-Bereich.';
    if (!id) return;
    if (v.drv >= 1.5 && v.flt === 'none' && rel(3) > -25) g.reach('over');
    if (Math.abs(v.bias) >= 0.15 && v.drv <= 1.0 && rel(2) > -35) g.reach('bias');
    if (v.flt === 'lp' && rel(2) - after2 >= 30 && f1 > -1) g.reach('lp');
    if (v.flt === 'hp') g.reach('hp');
  }
  run(ui.values);
}
