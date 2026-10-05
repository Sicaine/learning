// Wasserfall-Labor: Digitale Betriebsarten am Wasserfalldiagramm erkennen (CW, RTTY, PSK31, FT8, SSB-Sprache) und
// sehen, wie viele schmalbandige Signale in einen 2,4-kHz-SSB-Kanal passen. Das Bild ist eine Nachbildung, keine Aufnahme.
// params: { need?: richtige Erkennungen (Standard 5) }
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { animate } from '../../../assets/js/vizkit/anim.js';
import { h, pick, shuffle } from './_funk.js';

const W = 360, H = 170, HZ = 3000, ROW = 0.08;   // Bins, Zeilen, Bereich in Hz, Sekunden je Zeile
const KINDS = {
  cw: { name: 'CW (Morsetelegrafie)', bw: '≈ 100–300 Hz', why: 'Ein einzelner, im Takt getasteter Strich: Punkte und Striche des Morsecodes, immer dieselbe Frequenz.' },
  rtty: { name: 'RTTY (Funkfernschreiben)', bw: '≈ 250 Hz', why: 'Zwei Träger im Abstand von 170 Hz, die abwechselnd erscheinen: Frequenzumtastung (FSK) mit zwei Tönen.' },
  psk31: { name: 'PSK31', bw: '≈ 31 Hz', why: 'Ein sehr schmaler, ununterbrochener Strich von rund 31 Hz Breite. Die Information steckt in der Phase, nicht im Bild.' },
  ft8: { name: 'FT8', bw: '≈ 50 Hz', why: 'Kurzer Block von etwa 50 Hz Breite, in 15-Sekunden-Takten gesendet (rund 12,6 s Sendung, dann Pause), Töne springen innerhalb des Blocks.' },
  ssb: { name: 'SSB-Sprache', bw: '≈ 2,4 kHz', why: 'Breites, rhythmisch pulsierendes Band mit senkrechten Linien (Oberwellen der Stimme) zwischen etwa 300 Hz und 2,7 kHz.' },
};
const clamp01 = x => Math.max(0, Math.min(1.3, x));
const PAL = [[0, [8, 14, 52]], [0.3, [24, 70, 170]], [0.6, [40, 190, 170]], [0.85, [245, 220, 70]], [1.3, [255, 255, 235]]];
function color(v) { v = clamp01(v); for (let i = 1; i < PAL.length; i++) if (v <= PAL[i][0]) { const [a, ca] = PAL[i - 1], [b, cb] = PAL[i], t = (v - a) / (b - a); return ca.map((c, k) => c + (cb[k] - c) * t); } return PAL[PAL.length - 1][1]; }
const bin = f => Math.round(f / HZ * W);

export default function mount(stage, { params = {}, complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const need = params.need ?? 5;
  const cv = h('canvas', { width: W, height: H, role: 'img', 'aria-label': 'Wasserfalldiagramm eines SSB-Kanals von 0 bis 3 kHz Audiofrequenz', style: 'image-rendering:auto' });
  root.append(cv);
  const ax = h('div', { style: 'display:flex;justify-content:space-between;font:11px var(--mono);color:var(--muted);margin:2px 2px 8px' }, ...[0, 500, 1000, 1500, 2000, 2500, 3000].map(v => h('span', { text: v === 0 ? '0' : v % 1000 === 0 ? v / 1000 + ' kHz' : v })));
  root.append(ax);
  const ui = controls(root, [
    { id: 'mode', type: 'seg', label: 'Betrieb', options: [['quiz', 'Signal erkennen'], ['band', 'Im Kanal mischen']], value: 'quiz' },
    { id: 'cw', type: 'toggle', label: 'CW', value: false }, { id: 'rtty', type: 'toggle', label: 'RTTY', value: false }, { id: 'psk31', type: 'toggle', label: 'PSK31', value: false },
    { id: 'ft8a', type: 'toggle', label: 'FT8 (1)', value: false }, { id: 'ft8b', type: 'toggle', label: 'FT8 (2)', value: false }, { id: 'ssb', type: 'toggle', label: 'SSB-Sprache', value: false },
  ], onUi);
  const quiz = h('div', { style: 'display:grid;gap:8px;margin:8px 0' });
  const q = h('div', { style: 'font-weight:600' }, 'Welche Betriebsart siehst du?');
  const opts = h('div', { style: 'display:flex;flex-wrap:wrap;gap:8px' });
  const fb = h('div', { class: 'vz-note', style: 'min-height:2.6em;line-height:1.5' });
  const nx = h('button', { type: 'button', class: 'btn primary', text: 'Nächstes Signal', style: 'display:none;justify-self:start' });
  quiz.append(q, opts, fb, nx); root.append(quiz);
  const out = readout(root, [{ id: 'n', label: 'Signale im Kanal' }, { id: 'ok', label: 'Erkannt', hl: true }]);
  const g = goals(root, [{ id: 'q', label: `${need} Signale richtig erkannt` }, { id: 'mix', label: 'Mindestens 4 schmale Digimodes gleichzeitig im Kanal' }], () => complete?.());

  const ctx = cv.getContext('2d');
  ctx.fillStyle = 'rgb(8,14,52)'; ctx.fillRect(0, 0, W, H);
  const sig = {};   // laufende Signale: kind → { f0, state }
  let target = null, solved = true, okN = 0, acc = 0, t = 0;
  const optBtns = {};
  for (const k of Object.keys(KINDS)) { const b = h('button', { type: 'button', class: 'btn ghost small', text: KINDS[k].name.split(' (')[0], onclick: () => answer(k) }); optBtns[k] = b; opts.append(b); }

  function setSig(id, kind, f0, on) { if (on) sig[id] = sig[id] || { kind, f0, key: 0, left: 0 }; else delete sig[id]; }
  function onUi(v) {
    const band = v.mode === 'band';
    quiz.style.display = band ? 'none' : 'grid';
    for (const k of ['cw', 'rtty', 'psk31', 'ft8a', 'ft8b', 'ssb']) { const bx = ui.el.querySelector(`[data-id="${k}"]`); if (bx) bx.style.display = band ? '' : 'none'; }
    if (band) {
      target && delete sig.target;
      setSig('cw', 'cw', 700, v.cw); setSig('rtty', 'rtty', 1050, v.rtty); setSig('psk31', 'psk31', 1500, v.psk31);
      setSig('ft8a', 'ft8', 1900, v.ft8a); setSig('ft8b', 'ft8', 2300, v.ft8b); setSig('ssb', 'ssb', 300, v.ssb);
    } else { for (const k of ['cw', 'rtty', 'psk31', 'ft8a', 'ft8b', 'ssb']) delete sig[k]; if (!target || solved) newTarget(); else sig.target = sig.target || { kind: target, f0: pick([800, 1200, 1600]), key: 0, left: 0 }; }
    count();
  }
  function count() {
    const narrow = Object.entries(sig).filter(([, s]) => s.kind !== 'ssb').length, ssb = Object.values(sig).some(s => s.kind === 'ssb');
    out.set({ n: ui.values.mode === 'quiz' || !Object.keys(sig).length ? '–' : narrow + (ssb ? ' + SSB' : ''), ok: okN });
    if (ui.values.mode === 'band' && narrow >= 4) g.reach('mix');
  }
  function newTarget() {
    const prev = target; target = pick(Object.keys(KINDS).filter(k => k !== prev)); solved = false;
    sig.target = { kind: target, f0: target === 'ssb' ? 300 : pick([700, 1000, 1400, 1800, 2200]), key: 0, left: 0 };
    fb.textContent = ''; nx.style.display = 'none';
    Object.values(optBtns).forEach(b => { b.disabled = false; b.style.outline = ''; });
  }
  function answer(k) {
    if (solved || !target) return;
    solved = true;
    const ok = k === target; if (ok) okN++;
    fb.innerHTML = (ok ? '<b style="color:var(--good)">Richtig.</b> ' : '<b style="color:var(--bad)">Es war ' + KINDS[target].name + '.</b> ') + KINDS[target].why + ' Belegte Bandbreite ' + KINDS[target].bw + '.';
    optBtns[target].style.outline = '2px solid var(--good)';
    Object.values(optBtns).forEach(b => { b.disabled = true; });
    nx.style.display = ''; out.set({ ok: okN });
    if (okN >= need) g.reach('q');
  }
  nx.onclick = () => { newTarget(); count(); };

  function row() {
    const v = new Float32Array(W);
    for (let i = 0; i < W; i++) v[i] = 0.09 + 0.1 * Math.random();
    const add = (b, a, wd = 1) => { for (let d = -wd - 1; d <= wd + 1; d++) { const i = b + d; if (i >= 0 && i < W) v[i] += a * Math.exp(-(d * d) / (2 * (wd * 0.55 + 0.25) ** 2)); } };
    for (const s of Object.values(sig)) {
      const b = bin(s.f0);
      if (s.kind === 'cw') { s.left -= ROW; if (s.left <= 0) { s.key = s.key ? 0 : 1; s.left = (s.key ? pick([1, 1, 3]) : pick([1, 1, 3, 7])) * 0.1; } if (s.key) add(b, 1.0, 1); }
      else if (s.kind === 'rtty') { const a = Math.random(); add(b, 0.55 + 0.45 * a, 1); add(b + bin(170) , 0.55 + 0.45 * (1 - a), 1); }
      else if (s.kind === 'psk31') { add(b, 0.8 + 0.2 * Math.random(), 2); add(b - 3, 0.18 * Math.random(), 1); add(b + 3, 0.18 * Math.random(), 1); }
      else if (s.kind === 'ft8') { const on = (t % 15) < 12.64; if (on) { const k = Math.floor(Math.random() * 8); for (let i = 0; i < 6; i++) add(b + i, 0.28, 1); add(b + Math.round(k * 6.25 / HZ * W), 0.8, 1); } }
      else if (s.kind === 'ssb') {
        s.left -= ROW; if (s.left <= 0) { s.key = s.key > 0.2 ? 0.05 : 0.5 + Math.random() * 0.6; s.left = s.key > 0.2 ? 0.15 + Math.random() * 0.35 : 0.08 + Math.random() * 0.1; s.f1 = 90 + Math.random() * 90; }
        if (s.key > 0.2) for (let k = 3; k * (s.f1 || 120) < 2700; k++) { const f = k * (s.f1 || 120); if (f < 300) continue; const form = 0.35 + 0.65 * Math.max(Math.exp(-(((f - 600) / 350) ** 2)), 0.7 * Math.exp(-(((f - 1600) / 500) ** 2)), 0.4 * Math.exp(-(((f - 2400) / 400) ** 2))); add(bin(f), 0.75 * s.key * form, 1); }
      }
    }
    return v;
  }
  const loop = animate(cv, dt => {
    acc += dt; t += dt;
    let n = 0; while (acc >= ROW && n < 6) { acc -= ROW; n++; step(); }
  });
  function step() {
    ctx.drawImage(cv, 0, 0, W, H - 1, 0, 1, W, H - 1);
    const img = ctx.createImageData(W, 1), v = row();
    for (let i = 0; i < W; i++) { const c = color(v[i]); img.data[i * 4] = c[0]; img.data[i * 4 + 1] = c[1]; img.data[i * 4 + 2] = c[2]; img.data[i * 4 + 3] = 255; }
    ctx.putImageData(img, 0, 0);
  }
  void loop; void shuffle;
  onUi(ui.values);
  for (let i = 0; i < H; i++) { t += ROW; step(); }   // Verlauf vorab füllen
}
