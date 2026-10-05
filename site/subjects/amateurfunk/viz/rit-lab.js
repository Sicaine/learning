// RIT-Labor: Die Gegenstation sendet leicht neben der Sollfrequenz, ihre Stimme klingt zu hoch oder zu tief. Mit der RIT
// verstellst du nur die Empfangsfrequenz. Im USB bleibt die Tonlage richtig, wenn Empfangsfrequenz = Sendefrequenz der Gegenstation;
// im LSB sind die Sprachfrequenzen gespiegelt, die Richtung der Korrektur ist umgekehrt.
// Modell: Verschiebung der Stimme δ = Fehler − RIT (USB) bzw. −(Fehler − RIT) (LSB); alle Sprachanteile wandern um denselben Betrag.
// params: { }
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { chart, h, txt, line, dec, pick, trimDec } from './_funk.js';

export default function mount(stage, { complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const sp = chart(root, { h: 170, x: [0, 3200], y: [0, 1.15], xticks: [0, 500, 1000, 1500, 2000, 2500, 3000], xfmt: v => (v ? v : '0'), xlabel: 'NF-Frequenz am Lautsprecher in Hz', aria: 'Obertöne der Stimme vor und nach der Frequenzverschiebung' });
  const ui = controls(root, [
    { id: 'sb', type: 'seg', label: 'Seitenband', options: [['usb', 'USB'], ['lsb', 'LSB']], value: 'usb' },
    { id: 'rit', label: 'RIT (nur Empfangsfrequenz)', unit: 'Hz', min: -800, max: 800, step: 10, value: 0, format: v => (v > 0 ? '+' : '') + v + ' Hz', digits: 0 },
    { type: 'button', label: 'Andere Gegenstation', onClick: () => newStation() },
    { type: 'button', label: 'Stimme anhören (Ton)', onClick: () => hear() },
  ], run);
  const out = readout(root, [{ id: 'tx', label: 'deine Sendefrequenz' }, { id: 'rx', label: 'Empfangsfrequenz' }, { id: 'pitch', label: 'Stimme klingt', hl: true }]);
  const g = goals(root, [{ id: 'usb', label: 'USB: Stimme natürlich (±50 Hz)' }, { id: 'lsb', label: 'LSB: Stimme natürlich (±50 Hz)' }], () => complete?.());
  let err = 0, ctx = null, nodes = null;
  const BASE = 7.1e6;
  function newStation() { const prev = err; do { err = pick([-600, -450, -300, -200, 200, 300, 450, 600]); } while (err === prev); run(ui.values, 'new'); }
  newStation();

  function shift(v) { return (v.sb === 'usb' ? 1 : -1) * (err - v.rit); }
  function run(v, id) {
    const d = shift(v), f0 = 120;
    sp.clear();
    const col = Math.abs(d) <= 50 ? 'var(--good)' : 'var(--bad)';
    for (let k = 3; k * f0 < 3000; k++) {
      const f = k * f0, env = 0.25 + 0.75 * Math.max(Math.exp(-(((f - 600) / 350) ** 2)), 0.7 * Math.exp(-(((f - 1600) / 500) ** 2)), 0.4 * Math.exp(-(((f - 2400) / 400) ** 2)));
      sp.add(line(sp.X(f), sp.Y(0), sp.X(f), sp.Y(env), { color: 'var(--muted)', w: 2, opacity: 0.45 }));
      const g2 = f + d; if (g2 > 0 && g2 < 3200) sp.add(line(sp.X(g2), sp.Y(0), sp.X(g2), sp.Y(env), { color: col, w: 2.5 }));
    }
    sp.add(txt(sp.m.l + 4, sp.m.t + 11, 'grau: natürliche Stimme · farbig: so hörst du sie', { fill: 'var(--ink-2)', size: 11 }));
    out.set({ tx: '7,1 MHz (fest)', rx: trimDec((BASE + v.rit) / 1e6, 5) + ' MHz (RIT ' + (v.rit > 0 ? '+' : '') + v.rit + ' Hz)', pitch: Math.abs(d) <= 50 ? 'natürlich' : d > 0 ? 'zu hoch (+' + Math.round(d) + ' Hz)' : 'zu tief (' + Math.round(d) + ' Hz)' });
    if (Math.abs(d) <= 50 && id && id !== 'new') g.reach(v.sb);
    if (nodes) nodes.update(d);
  }
  function hear() {
    try {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)(); ctx.resume?.();
      if (nodes) { nodes.stop(); nodes = null; return; }
      const gain = ctx.createGain(); gain.gain.value = 0.14; gain.connect(ctx.destination);
      const oscs = [], f0 = 120;
      for (let k = 3; k * f0 < 3000; k++) {
        const f = k * f0, env = 0.25 + 0.75 * Math.max(Math.exp(-(((f - 600) / 350) ** 2)), 0.7 * Math.exp(-(((f - 1600) / 500) ** 2)), 0.4 * Math.exp(-(((f - 2400) / 400) ** 2)));
        const o = ctx.createOscillator(), og = ctx.createGain(); og.gain.value = env * 0.35; o.frequency.value = Math.max(20, f + shift(ui.values)); o.connect(og); og.connect(gain); o.start(); oscs.push([o, f]);
      }
      nodes = { stop() { oscs.forEach(([o]) => o.stop()); gain.disconnect(); }, update(d) { oscs.forEach(([o, f]) => { o.frequency.value = Math.max(20, f + d); }); } };
      setTimeout(() => { if (nodes) { nodes.stop(); nodes = null; } }, 8000);
    } catch { /* kein Ton verfügbar */ }
  }
  run(ui.values);
}
