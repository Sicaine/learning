// Sprachband-Labor: Spektrum eines Lautes (Vokale mit Formanten, Zischlaut), Durchlassbereich einstellen, Klang anhören.
// Formanten (grobe Näherungen, Männerstimme): a ≈ 730/1090 Hz, i ≈ 300/2300 Hz, u ≈ 300/870 Hz. Der Zischlaut „s“ liegt weit oben (3–5 kHz).
// Ton erst nach Klick (WebAudio). params: { }
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { chart, h, txt, line, rect, poly, fmtF } from './_funk.js';

const V = { a: { f: [730, 1090], name: 'a' }, i: { f: [300, 2300], name: 'i' }, u: { f: [300, 870], name: 'u' }, s: { f: [], name: 's (Zischlaut)' } };
const gauss = (x, m, w) => Math.exp(-(((x - m) / w) ** 2));
const env = (v, f) => {
  if (v === 's') return 0.05 + 0.75 * gauss(f, 4300, 1100);
  let y = 0.12 * Math.exp(-f / 1800);   // Grundlinie fällt zu hohen Frequenzen
  V[v].f.forEach((m, k) => { y += (k === 0 ? 0.85 : 0.6) * gauss(f, m, 150 + 60 * k); });
  return Math.min(1, y);
};

export default function mount(stage, { complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const c = chart(root, { h: 210, x: [0, 5000], y: [0, 1.15], xticks: [0, 1000, 2000, 3000, 4000, 5000], xfmt: v => v / 1000 + ' kHz', xlabel: 'Frequenz', aria: 'Spektrum eines Sprachlauts mit eingestelltem Durchlassbereich' });
  const ui = controls(root, [
    { id: 'v', type: 'seg', label: 'Laut', options: [['a', 'a'], ['i', 'i'], ['u', 'u'], ['s', 's (Zischlaut)']], value: 'a' },
    { id: 'lo', label: 'untere Grenze', min: 0, max: 1500, step: 50, value: 0, format: v => v + ' Hz', digits: 0 },
    { id: 'hi', label: 'obere Grenze', min: 1000, max: 5000, step: 100, value: 5000, format: v => v + ' Hz', digits: 0 },
  ], run);
  const bPlay = h('button', { type: 'button', class: 'btn primary', text: 'Klang abspielen (mit Durchlassbereich)' });
  root.append(h('div', { style: 'margin:8px 0' }, bPlay));
  const out = readout(root, [{ id: 'bw', label: 'Bandbreite', hl: true }, { id: 'ssb', label: 'Belegung bei SSB' }, { id: 'fm', label: 'Formanten im Durchlassbereich', hl: true }]);
  const g = goals(root, [
    { id: 'ssb', label: 'Höchstens 2,4 kHz Bandbreite, in der bei a, i und u noch beide Formanten liegen' },
    { id: 'cut', label: 'Laut „i“ wählen und seinen zweiten Formanten abschneiden' },
    { id: 'play', label: 'Einmal abspielen' },
  ], () => complete?.());
  const inside = (fs, lo, hi) => fs.filter(f => f >= lo && f <= hi).length;

  function run(v) {
    const { v: lt, lo, hi } = v;
    c.clear();
    const pts = []; for (let f = 0; f <= 5000; f += 25) pts.push([c.X(f), c.Y(env(lt, f))]);
    c.add(rect(c.X(lo), c.m.t, c.X(hi) - c.X(lo), c.Y(0) - c.m.t, { fill: 'var(--accent)', fo: 0.10 }),
      line(c.X(lo), c.m.t, c.X(lo), c.Y(0), { color: 'var(--accent)', w: 1.5, dash: '5 4' }), line(c.X(hi), c.m.t, c.X(hi), c.Y(0), { color: 'var(--accent)', w: 1.5, dash: '5 4' }),
      poly(pts, { color: 'var(--ink)', w: 1.8 }));
    V[lt].f.forEach((f, k) => c.add(line(c.X(f), c.Y(env(lt, f)) - 4, c.X(f), c.Y(env(lt, f)) - 14, { color: f >= lo && f <= hi ? 'var(--good)' : 'var(--bad)', w: 2 }), txt(c.X(f), c.Y(env(lt, f)) - 18, 'F' + (k + 1) + ' ' + f, { anchor: 'middle', size: 13, fill: f >= lo && f <= hi ? 'var(--good)' : 'var(--bad)', bold: true })));
    if (lt === 's') c.add(txt(c.X(4300), c.Y(0.85) - 8, 'Zischlaut: Energie oben', { anchor: 'middle', size: 10.5 }));
    const bw = hi - lo, fs = V[lt].f;
    out.set({ bw: fmtF(bw), ssb: 'ebenso ' + fmtF(bw), fm: lt === 's' ? (hi >= 3500 ? 'Zischlaut kommt durch' : 'Zischlaut fehlt (klingt dumpf)') : `${inside(fs, lo, hi)} von 2` });
    const okAll = bw <= 2400 && ['a', 'i', 'u'].every(x => inside(V[x].f, lo, hi) === 2);
    if (okAll) g.reach('ssb');
    if (lt === 'i' && hi < 2300) g.reach('cut');
  }

  let ctx = null;
  bPlay.onclick = () => {
    const { v: lt, lo, hi } = ui.values;
    try {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)(); ctx.resume?.();
      const t = ctx.currentTime + 0.05, dur = 1.6, out = ctx.createGain(); out.gain.value = 0; out.connect(ctx.destination);
      out.gain.setTargetAtTime(0.5, t, 0.02); out.gain.setTargetAtTime(0, t + dur - 0.1, 0.03);
      const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = Math.max(20, lo); hp.Q.value = 0.7;
      const hp2 = ctx.createBiquadFilter(); hp2.type = 'highpass'; hp2.frequency.value = Math.max(20, lo); hp2.Q.value = 0.7;
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = hi; lp.Q.value = 0.7;
      const lp2 = ctx.createBiquadFilter(); lp2.type = 'lowpass'; lp2.frequency.value = hi; lp2.Q.value = 0.7;
      hp.connect(hp2); hp2.connect(lp); lp.connect(lp2); lp2.connect(out);
      let src;
      if (lt === 's') {
        const buf = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate), d = buf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
        src = ctx.createBufferSource(); src.buffer = buf;
        const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 4300; bp.Q.value = 1.2; src.connect(bp); bp.connect(hp);
      } else {
        src = ctx.createOscillator(); src.type = 'sawtooth'; src.frequency.value = 120;
        V[lt].f.forEach((f, k) => { const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = f; bp.Q.value = 6; const gn = ctx.createGain(); gn.gain.value = k === 0 ? 1 : 0.7; src.connect(bp); bp.connect(gn); gn.connect(hp); });
      }
      src.start(t); src.stop(t + dur);
    } catch { /* ohne Ton: nur das Bild */ }
    g.reach('play');
  };
  root._test = { ui };
  run(ui.values);
}
