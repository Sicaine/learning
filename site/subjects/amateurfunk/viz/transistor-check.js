// Fließt Kollektorstrom? Spannungen an den Anschlüssen eines NPN-/PNP-Transistors gegen Masse bewerten (wie die Bildfragen im Katalog).
// params: { need?: richtige Antworten in Folge (Standard 5) }
import { h, s } from '../../../assets/js/vizkit/base.js';
import { readout, goals } from '../../../assets/js/vizkit/controls.js';
import { SYMBOLS } from './schaltzeichen-trainer.js';

const f1 = x => (x < 0 ? '−' : x > 0 ? '+' : '') + Math.abs(x).toFixed(1).replace('.', ',') + ' V';
const pick = a => a[Math.floor(Math.random() * a.length)];
const R1 = x => Math.round(x * 10) / 10;

export default function mount(stage, { params = {}, complete }) {
  const need = params.need ?? 5;
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const svg = s('svg', { class: 'vz-svg', viewBox: '0 0 280 130', role: 'img', 'aria-label': 'Transistor mit gemessenen Spannungen' }); root.append(svg);
  const row = h('div', { style: 'display:flex;gap:8px;flex-wrap:wrap;margin:8px 0' });
  const fb = h('div', { class: 'vz-note', style: 'min-height:3.2em' });
  root.append(row, fb);
  const out = readout(root, [{ id: 'streak', label: 'Serie', hl: true }, { id: 'n', label: 'Aufgaben' }]);
  const g = goals(root, [{ id: 'g', label: `${need} Beurteilungen in Folge richtig` }], () => complete?.());
  let c = null, streak = 0, n = 0, locked = false;

  function gen() {
    const pnp = Math.random() < 0.35, flow = Math.random() < 0.5, sg = pnp ? -1 : 1;
    // Werte im Vorzeichen des NPN rechnen und für PNP spiegeln
    let e = pick([0, 0, 1.0, 2.0, 5.0]), ube = 0.7, uc = e + pick([2.0, 3.6, 5.6, 8.0]), why;
    if (!flow) {
      const k = pick(['neg', 'null', 'kleiner', 'kollektor']);
      if (k === 'neg') { ube = -pick([0.6, 1.0, 2.0]); why = 'Die Basis liegt **unter** dem Emitter (U_BE negativ): Der Basis-Emitter-Übergang sperrt, es fließt kein Basis- und damit kein Kollektorstrom.'; }
      else if (k === 'null') { ube = 0; why = 'U_BE = 0 V: Die Schwelle von etwa 0,6 V ist nicht erreicht, der Transistor sperrt.'; }
      else if (k === 'kleiner') { ube = pick([0.2, 0.3, 0.4]); why = `U_BE = ${String(ube).replace('.', ',')} V ist kleiner als etwa 0,6 V: kein Basisstrom, kein Kollektorstrom.`; }
      else { uc = e - pick([0.6, 1.0, 2.0]); why = 'Der Basis-Emitter-Übergang leitet (0,7 V), aber der Kollektor liegt **nicht positiver als der Emitter**: Es kann kein Kollektorstrom in Durchlassrichtung fließen.'; }
    } else why = 'U_BE ≈ 0,7 V öffnet den Basis-Emitter-Übergang, und der Kollektor liegt positiver als der Emitter: Es fließt Kollektorstrom.';
    const ue = R1(sg * e), ub = R1(sg * (e + ube)), uc2 = R1(sg * uc);
    return { pnp, flow: flow, ue, ub, uc: uc2, why: pnp ? why.replace('unter', 'über').replace('positiver als', 'negativer als') + ' (PNP: alle Spannungen umgekehrt gepolt)' : why };
  }
  function show() {
    locked = false; c = gen(); fb.textContent = '';
    const sym = SYMBOLS[c.pnp ? 'pnp' : 'npn'].draw();
    // PNP: Emitter oben zeichnen (Symbol senkrecht spiegeln)
    const gtr = c.pnp ? 'translate(70,15) translate(0,35) scale(1,-1) translate(0,-35)' : 'translate(70,15)';
    const T = (x, y, t, a = 'start') => s('text', { x, y, 'text-anchor': a, 'font-size': 15, 'font-weight': 700, fill: 'var(--ink)' }, t);
    const topPin = c.pnp ? 'E' : 'C', botPin = c.pnp ? 'C' : 'E';
    const val = { C: c.uc, E: c.ue, B: c.ub };
    svg.replaceChildren(s('rect', { x: 0, y: 0, width: 280, height: 130, fill: '#fff', rx: 10 }), s('g', { transform: gtr }, ...sym),
      T(160, 24, f1(val[topPin])), T(160, 112, f1(val[botPin])), T(76, 56, f1(val.B), 'end'),
      s('text', { x: 160, y: 40, 'font-size': 11, fill: 'var(--muted)' }, topPin === 'C' ? 'Kollektor' : 'Emitter'), s('text', { x: 160, y: 126, 'font-size': 11, fill: 'var(--muted)' }, botPin === 'C' ? 'Kollektor' : 'Emitter'), s('text', { x: 76, y: 72, 'text-anchor': 'end', 'font-size': 11, fill: 'var(--muted)' }, 'Basis'));
  }
  for (const [flow, label] of [[true, 'Es fließt Kollektorstrom'], [false, 'Es fließt keiner']]) {
    const b = h('button', { type: 'button', class: 'btn ghost', text: label }); row.append(b);
    b.onclick = () => {
      if (locked) return; locked = true; n++;
      const ok = flow === c.flow; streak = ok ? streak + 1 : 0;
      fb.innerHTML = (ok ? '<b>Richtig.</b> ' : '<b>Nicht ganz.</b> ') + c.why.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
      out.set({ streak, n }); if (streak >= need) g.reach('g');
      setTimeout(show, ok ? 1800 : 3600);
    };
  }
  root.__flow = () => c.flow;
  out.set({ streak, n }); show();
}
