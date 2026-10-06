// Morse-Tempo-Rechner: Text eingeben, Tempo in WPM wählen, Punktlänge/Strichlänge/Dauer ablesen und anhören.
// Zeitraster: Punkt = 1 Einheit, Strich = 3, Pause im Zeichen = 1, zwischen Zeichen = 3, zwischen Wörtern = 7. „PARIS“ = 50 Einheiten, Punktlänge = 1,2 s / WPM.
// Ton erst nach Klick (WebAudio). params: { }
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { h, s, dec } from './_funk.js';

const CODE = { A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.', G: '--.', H: '....', I: '..', J: '.---', K: '-.-', L: '.-..', M: '--', N: '-.', O: '---', P: '.--.', Q: '--.-', R: '.-.', S: '...', T: '-', U: '..-', V: '...-', W: '.--', X: '-..-', Y: '-.--', Z: '--..', 0: '-----', 1: '.----', 2: '..---', 3: '...--', 4: '....-', 5: '.....', 6: '-....', 7: '--...', 8: '---..', 9: '----.', '/': '-..-.', '?': '..--..', '=': '-...-', '.': '.-.-.-', ',': '--..--' };

/** Text → Liste [startEinheit, längeEinheiten] der Töne und Gesamtlänge inkl. Wortpause am Ende (7 Einheiten). */
export function layout(text) {
  const ev = []; let t = 0;
  const words = text.toUpperCase().split(/\s+/).map(w => [...w].filter(c => CODE[c])).filter(w => w.length);
  words.forEach(w => {
    w.forEach((ch, ci) => {
      const code = CODE[ch];
      [...code].forEach((sym, si) => { const d = sym === '.' ? 1 : 3; ev.push([t, d]); t += d + (si < code.length - 1 ? 1 : 0); });
      if (ci < w.length - 1) t += 3;
    });
    t += 7;
  });
  return { ev, units: t, words };
}

export default function mount(stage, { complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const inp = h('input', { type: 'text', value: 'CQ DE DL2AB', maxlength: 28, 'aria-label': 'Text zum Morsen', autocapitalize: 'characters', autocomplete: 'off', style: 'font:600 1.05rem var(--mono);padding:8px 12px;border:1px solid var(--line-2);border-radius:10px;width:15em;max-width:100%;text-transform:uppercase' });
  const bPlay = h('button', { type: 'button', class: 'btn primary', text: 'Abspielen' });
  const bParis = h('button', { type: 'button', class: 'btn ghost', text: 'Text „PARIS“' });
  root.append(h('div', { style: 'display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:8px' }, inp, bParis, bPlay));
  const svg = s('svg', { class: 'vz-svg', viewBox: '0 0 600 90', role: 'img', 'aria-label': 'Zeitverlauf der Tastung: Balken sind Ton, Lücken sind Pausen' });
  root.append(svg);
  const ui = controls(root, [
    { id: 'wpm', label: 'Tempo', min: 5, max: 40, step: 1, value: 15, format: v => v + ' WPM', digits: 0 },
    { id: 'tone', label: 'Tonhöhe', min: 400, max: 900, step: 25, value: 650, format: v => v + ' Hz', digits: 0 },
  ], draw);
  const out = readout(root, [{ id: 'dit', label: 'Punkt (1 Einheit)', hl: true }, { id: 'dah', label: 'Strich (3 Einheiten)' }, { id: 'cpm', label: 'Zeichen pro Minute' }, { id: 'units', label: 'Einheiten (inkl. Wortpause)' }, { id: 'dur', label: 'Dauer des Textes', hl: true }]);
  const g = goals(root, [
    { id: 'paris', label: 'Text „PARIS“ laden: genau 50 Einheiten' },
    { id: 'ms100', label: 'Tempo einstellen, bei dem ein Punkt 100 ms dauert' },
    { id: 'play', label: 'Einmal abspielen' },
  ], () => complete?.());
  root.append(h('p', { class: 'vz-note', text: 'Merke: Punktlänge = 1,2 s ÷ WPM. Ein Wort („PARIS“ plus Wortpause) hat 50 Einheiten und dauert bei diesem Tempo 60 s ÷ WPM.' }));

  let ctx = null, timers = [], head = null;
  function draw() {
    const { wpm } = ui.values, u = 1.2 / wpm, L = layout(inp.value);
    svg.replaceChildren();
    const W = 580, x0 = 10, sc = L.units ? W / Math.max(L.units, 60) : 1;
    svg.append(s('line', { x1: x0, x2: x0 + W, y1: 70, y2: 70, stroke: 'var(--line-2)' }));
    L.ev.forEach(([st, d]) => svg.append(s('rect', { x: x0 + st * sc, y: 26, width: Math.max(1, d * sc - 0.6), height: 38, rx: 2, fill: 'var(--accent)', opacity: .9 })));
    svg.append(s('text', { x: x0, y: 15, 'font-size': 15, fill: 'var(--muted)' }, `Zeitachse: 1 Einheit = ${Math.round(u * 1000)} ms`));
    svg.append(s('text', { x: x0 + (L.units ? Math.min(L.units, 60) * sc : 0), y: 88, 'font-size': 15, fill: 'var(--muted)', 'text-anchor': 'end' }, `${L.units} Einheiten`));
    head = s('line', { x1: x0, x2: x0, y1: 22, y2: 74, stroke: 'var(--bad)', 'stroke-width': 1.5, opacity: 0 }); svg.append(head); svg._x0 = x0; svg._sc = sc;
    out.set({ dit: Math.round(u * 1000) + ' ms', dah: Math.round(3 * u * 1000) + ' ms', cpm: String(wpm * 5), units: String(L.units), dur: dec(L.units * u, 2) + ' s' });
    if (inp.value.trim().toUpperCase() === 'PARIS' && L.units === 50) g.reach('paris');
    if (Math.round(u * 1000) === 100) g.reach('ms100');
  }
  function play() {
    timers.forEach(clearTimeout); timers = [];
    const { wpm, tone } = ui.values, u = 1.2 / wpm, L = layout(inp.value);
    if (!L.ev.length) return;
    try {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)(); ctx.resume?.();
      const now = ctx.currentTime + 0.05, osc = ctx.createOscillator(), gain = ctx.createGain();
      osc.frequency.value = tone; gain.gain.value = 0; osc.connect(gain); gain.connect(ctx.destination);
      for (const [st, d] of L.ev) { gain.gain.setTargetAtTime(0.22, now + st * u, 0.004); gain.gain.setTargetAtTime(0, now + (st + d) * u, 0.004); }
      osc.start(now); osc.stop(now + L.units * u + 0.3);
    } catch { /* ohne Ton: Anzeige läuft trotzdem */ }
    const t0 = performance.now(), total = L.units * u * 1000;
    const step = () => { const f = (performance.now() - t0) / total; if (f >= 1) { head.setAttribute('opacity', 0); return; } const x = svg._x0 + f * L.units * svg._sc; head.setAttribute('x1', x); head.setAttribute('x2', x); head.setAttribute('opacity', 1); timers.push(setTimeout(step, 30)); };
    step(); g.reach('play');
  }
  inp.oninput = draw; bPlay.onclick = play; bParis.onclick = () => { inp.value = 'PARIS'; draw(); };
  root._test = { setText: t => { inp.value = t; draw(); } };
  draw();
}
