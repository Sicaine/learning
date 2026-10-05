// Wasserfall-Leser: simuliertes Transceiver-Display mit Amplitudenspektrum (oben) und Wasserfalldiagramm (unten). Signale erkennen und anklicken.
// Achsen: Frequenz waagerecht, Zeit senkrecht (neueste Zeile oben), Signalstärke als Helligkeit/Farbe.
// params: { goals?: Anzahl zu findender Signalarten (5) }
import { h } from '../../../assets/js/vizkit/base.js';
import { goals, readout } from '../../../assets/js/vizkit/controls.js';
import { animate } from '../../../assets/js/vizkit/anim.js';

const NB = 320, SPAN = 40, HZ = SPAN / NB;               // 40 kHz Ausschnitt, 125 Hz je Bin
const TYPES = [
  { id: 'carrier', name: 'unmodulierter Träger (Dauerstrich)', hint: 'eine dünne, durchgehende senkrechte Linie' },
  { id: 'cw', name: 'Morsetelegrafie (CW)', hint: 'schmal und ständig ein- und ausgetastet: Striche und Punkte' },
  { id: 'ssb', name: 'SSB-Sprache', hint: 'rund 2,7 kHz breit und im Sprachrhythmus unruhig' },
  { id: 'digi', name: 'Digitalsignal (mehrere Töne)', hint: 'mehrere schmale Töne nebeneinander, die gleichzeitig wechseln' },
  { id: 'fm', name: 'FM-Sprache', hint: 'breit (rund 12 kHz) mit starkem Träger in der Mitte' },
];
const pick = a => a[Math.floor(Math.random() * a.length)];
const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const color = v => { v = Math.max(0, Math.min(1, v)); const stops = [[0, [8, 20, 60]], [0.35, [20, 90, 190]], [0.65, [60, 200, 220]], [0.85, [250, 220, 90]], [1, [255, 255, 255]]]; for (let i = 1; i < stops.length; i++) if (v <= stops[i][0]) { const [a, ca] = stops[i - 1], [b, cb] = stops[i], k = (v - a) / (b - a); return ca.map((c, j) => Math.round(c + (cb[j] - c) * k)); } return [255, 255, 255]; };

export default function mount(stage, { params = {}, complete }) {
  const need = params.goals ?? 5;
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const wrap = h('div', { style: 'position:relative;background:#06142a;border-radius:10px;padding:8px 8px 22px 22px;margin-bottom:6px' });
  const cv = h('canvas', { width: NB, height: 280, style: 'width:100%;height:auto;display:block;cursor:crosshair;image-rendering:pixelated;touch-action:manipulation', 'aria-label': 'Spektrum und Wasserfall' });
  const axis = h('div', { style: 'position:absolute;left:22px;right:8px;bottom:4px;display:flex;justify-content:space-between;font:11px var(--mono);color:#9fb2c8' }, ...['−20', '−10', '0', '+10', '+20 kHz'].map(t => h('span', { text: t })));
  const vlab = h('div', { text: 'Zeit →  (älter)', style: 'position:absolute;left:2px;top:112px;font:11px var(--mono);color:#9fb2c8;writing-mode:vertical-rl;transform:rotate(180deg)' });
  const hlab1 = h('div', { text: 'Amplitudenspektrum', style: 'position:absolute;left:30px;top:10px;font:11px var(--mono);color:#ffd36a;pointer-events:none' });
  const hlab2 = h('div', { text: 'Wasserfall', style: 'position:absolute;left:30px;top:96px;font:11px var(--mono);color:#9fe5ff;pointer-events:none' });
  wrap.append(cv, axis, vlab, hlab1, hlab2); root.append(wrap);
  const q = h('div', { class: 'vz-note', style: 'font-size:1rem;line-height:1.5;margin:8px 0' });
  const fb = h('div', { class: 'vz-note', style: 'min-height:2.4em;line-height:1.5' });
  const again = h('button', { type: 'button', class: 'btn small ghost', text: 'Neu mischen' });
  root.append(q, fb, again);
  const out = readout(root, [{ id: 'found', label: 'Gefunden', hl: true }]);
  const g = goals(root, [{ id: 'g', label: `alle ${need} Signalarten im Wasserfall gefunden` }], () => complete?.());

  const ctx = cv.getContext('2d'); ctx.fillStyle = '#06142a'; ctx.fillRect(0, 0, NB, 280);
  let sigs = [], todo = [], cur = null, found = new Set(), spec = new Float32Array(NB);
  const WF_TOP = 92;
  function setup() {
    // Signale auf nicht überlappende Plätze legen (Mittelwert in kHz)
    const slots = shuffle([-16, -8, 0, 8, 16]);
    sigs = TYPES.map((t, i) => ({ ...t, c: slots[i] + (Math.random() - 0.5) * 2, ph: Math.random() * 10, state: Array.from({ length: 6 }, () => Math.random()) }));
    found = new Set(); todo = shuffle(TYPES.map(t => t.id)); out.set({ found: `0 / ${TYPES.length}` }); next();
  }
  function next() {
    cur = todo.shift();
    if (!cur) { q.innerHTML = '<b>Alle Signalarten gefunden.</b> Du kannst neu mischen und weiter üben.'; return; }
    q.innerHTML = `Tippe im Wasserfall oder Spektrum auf: <b>${TYPES.find(t => t.id === cur).name}</b>`;
  }
  function row(t) {
    const r = spec; for (let i = 0; i < NB; i++) r[i] = 0.06 + Math.random() * 0.07;
    const add = (kHz, w, a) => { const b0 = Math.round((kHz + SPAN / 2 - w / 2) / HZ), b1 = Math.round((kHz + SPAN / 2 + w / 2) / HZ); for (let b = Math.max(0, b0); b <= Math.min(NB - 1, Math.max(b0, b1)); b++) r[b] = Math.max(r[b], a * (0.75 + Math.random() * 0.25)); };
    for (const s of sigs) {
      if (s.id === 'carrier') add(s.c, 0.1, 0.8);
      else if (s.id === 'cw') { const k = Math.floor((t + s.ph) * 6) % 12; const on = [1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0][k]; if (on) add(s.c, 0.13, 0.9); }
      else if (s.id === 'ssb') { const env = Math.max(0, Math.sin((t + s.ph) * 7) * Math.sin((t + s.ph) * 2.3) + 0.15); for (let f = 0; f < 2.7; f += HZ) { const fine = Math.random() * (1 - f / 4); add(s.c - 1.35 + f, HZ, Math.min(1, env * (0.3 + fine))); } }
      else if (s.id === 'digi') { const slot = Math.floor((t + s.ph) / 1.5); for (let k = 0; k < 6; k++) { const bit = Math.sin(slot * 12.9898 + k * 78.233 + s.ph) > -0.1; if (bit) add(s.c - 1.25 + k * 0.5, 0.12, 0.65); } }
      else if (s.id === 'fm') { add(s.c, 0.15, 0.95); const dev = (0.5 + 0.5 * Math.sin((t + s.ph) * 4)) * 4.5 + 1; for (let f = -dev; f <= dev; f += HZ * 1.5) if (Math.random() < 0.7) add(s.c + f, HZ, 0.35 + Math.random() * 0.25); }
    }
  }
  const dispH = 92;
  let acc = 0;
  animate(cv, (dt, t) => {
    acc += dt; if (acc < 0.06) return; acc = 0;
    row(t);
    // Wasserfall um eine Zeile nach unten
    ctx.drawImage(cv, 0, WF_TOP, NB, 187, 0, WF_TOP + 1, NB, 187);
    const img = ctx.createImageData(NB, 1); for (let i = 0; i < NB; i++) { const c = color(spec[i]); img.data[4 * i] = c[0]; img.data[4 * i + 1] = c[1]; img.data[4 * i + 2] = c[2]; img.data[4 * i + 3] = 255; }
    ctx.putImageData(img, 0, WF_TOP);
    // Spektrum oben
    ctx.fillStyle = '#06142a'; ctx.fillRect(0, 0, NB, WF_TOP - 2);
    ctx.strokeStyle = '#ffd36a'; ctx.lineWidth = 1; ctx.beginPath();
    for (let i = 0; i < NB; i++) { const y = WF_TOP - 6 - spec[i] * (WF_TOP - 26); i ? ctx.lineTo(i, y) : ctx.moveTo(i, y); }
    ctx.stroke();
  });
  cv.addEventListener('pointerdown', e => {
    if (!cur) return;
    const r = cv.getBoundingClientRect(), kHz = ((e.clientX - r.left) / r.width) * SPAN - SPAN / 2;
    const target = sigs.find(s => s.id === cur), half = cur === 'fm' ? 6 : cur === 'ssb' ? 2 : cur === 'digi' ? 2 : 1.2;
    const hit = Math.abs(kHz - target.c) <= half;
    const hitOther = sigs.find(s => s.id !== cur && Math.abs(kHz - s.c) <= (s.id === 'fm' ? 6 : 1.5));
    if (hit) { found.add(cur); fb.innerHTML = `<b style="color:var(--good)">Richtig.</b> ${target.name}: ${target.hint}.`; out.set({ found: `${found.size} / ${TYPES.length}` }); if (found.size >= Math.min(need, TYPES.length)) g.reach('g'); next(); }
    else fb.innerHTML = `<b style="color:var(--bad)">Nicht ganz.</b> ${hitOther ? `Dort sitzt: ${hitOther.name} (${hitOther.hint}).` : 'An dieser Stelle ist nur Rauschen.'} Gesucht: ${TYPES.find(t => t.id === cur).hint}.`;
  });
  again.onclick = () => { fb.textContent = ''; setup(); };
  setup();
  root._test = { get sigs() { return sigs; }, get cur() { return cur; }, click: kHz => { const r = cv.getBoundingClientRect(); cv.dispatchEvent(new PointerEvent('pointerdown', { clientX: r.left + (kHz + SPAN / 2) / SPAN * r.width, clientY: r.top + 150, bubbles: true })); } };
}
