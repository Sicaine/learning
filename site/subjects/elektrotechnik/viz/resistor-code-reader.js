// D06 Widerstands-Farbcode und SMD-Code lesen (Quiz-Spiel mit Zufallswiderständen).
// params: { rounds?: 10, need?: 8, mode?: '4' | '5' | 'smd' }
// Ziel: need von rounds Aufgaben richtig. Farbtabelle nach BNetzA-Formelsammlung (Silber ×0,01/±10 %, Gold ×0,1/±5 % …).
import { colorCode, eSeries, fmt, COLORS } from '../../../assets/js/vizkit/si.js';
import { h, s } from '../../../assets/js/vizkit/base.js';

const pick = a => a[Math.floor(Math.random() * a.length)];
const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const dec = x => String(+x.toPrecision(4)).replace('.', ',');
const tolTxt = t => `± ${dec(t)} %`;

export default function mount(stage, { params = {}, complete }) {
  const rounds = params.rounds ?? 10, need = params.need ?? 8;
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  let mode = params.mode ?? '4', n = 0, ok = 0, cur = null, locked = false, finished = false, fired = false;

  const modeSeg = h('div', { class: 'vz-seg' });
  for (const [k, l] of [['4', '4 Ringe'], ['5', '5 Ringe'], ['smd', 'SMD-Code']]) {
    modeSeg.append(h('button', { type: 'button', 'data-m': k, text: l, onclick: () => { mode = k; paintMode(); next(); } }));
  }
  const tableBtn = h('button', { type: 'button', class: 'btn small ghost', text: 'Farbtabelle zeigen', onclick: () => { tbl.hidden = !tbl.hidden; tableBtn.textContent = tbl.hidden ? 'Farbtabelle zeigen' : 'Farbtabelle verbergen'; } });
  root.append(h('div', { class: 'vz-controls' }, modeSeg, tableBtn));

  // Farbtabelle (Hilfe)
  const tbl = h('div', { hidden: true, class: 'vz-note', html:
    '<table style="border-collapse:collapse;font-size:.82rem;width:100%"><tr><th align="left">Farbe</th><th>Ziffer</th><th>Multiplikator</th><th>Toleranz</th></tr>' +
    COLORS.map(c => `<tr><td><span style="display:inline-block;width:12px;height:12px;border-radius:3px;background:${c.hex};border:1px solid var(--line-2);vertical-align:-1px;margin-right:6px"></span>${c.name}</td><td align="center">${c.digit ?? '–'}</td><td align="center">×${dec(c.mult)}</td><td align="center">${c.tol ? '± ' + dec(c.tol) + ' %' : '–'}</td></tr>`).join('') + '</table>' });
  root.append(tbl);

  const svg = s('svg', { viewBox: '0 0 420 120', class: 'vz-svg', role: 'img', 'aria-label': 'Widerstand mit Farbringen' });
  root.append(svg);
  const prompt = h('p', { class: 'vz-note', style: 'font-weight:600;margin:0' });
  const choices = h('div', { class: 'vz-controls', style: 'display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px' });
  const fb = h('p', { class: 'vz-note', 'aria-live': 'polite', style: 'min-height:2.6em;margin:0' });
  const score = h('div', { class: 'vz-readout' });
  root.append(prompt, choices, fb, score);

  function paintMode() { [...modeSeg.children].forEach(b => b.classList.toggle('on', b.dataset.m === mode)); }

  function draw(q) {
    svg.replaceChildren();
    const lead = s('path', { d: 'M10 60H70M350 60H410', stroke: 'var(--ink-2)', 'stroke-width': 4, 'stroke-linecap': 'round' });
    if (q.kind === 'smd') {
      svg.append(lead.cloneNode(), s('rect', { x: 120, y: 30, width: 180, height: 60, rx: 5, fill: '#1c1c22' }),
        s('rect', { x: 120, y: 30, width: 18, height: 60, fill: '#c9ced6' }), s('rect', { x: 282, y: 30, width: 18, height: 60, fill: '#c9ced6' }),
        s('text', { x: 210, y: 72, 'text-anchor': 'middle', 'font-size': 34, 'font-family': 'var(--mono)', fill: '#f2f2f6', 'letter-spacing': 3 }, q.code));
      svg.firstChild.remove(); return;
    }
    svg.append(lead, s('path', { d: 'M90 38Q70 38 70 60Q70 82 90 82H330Q350 82 350 60Q350 38 330 38Z', fill: '#d9c9a3', stroke: '#b7a57a', 'stroke-width': 1.5 }));
    const nb = q.rings.length, x0 = 100, step = nb === 4 ? 42 : 36;
    q.rings.forEach((c, i) => {
      const gap = i === nb - 1 ? 24 : 0;     // Toleranzring mit Abstand
      const x = x0 + i * step + gap;
      svg.append(s('rect', { x, y: 38, width: 16, height: 44, fill: c.hex, stroke: c.name === 'weiß' ? '#c9c9d0' : 'none' }));
    });
  }

  function makeQ() {
    if (mode === 'smd') {
      const list = [...eSeries('E24', 1, 10)].flatMap(m => [m, m * 10, m * 100, m * 1e3, m * 1e4, m * 1e5].map(v => +v.toPrecision(3))).filter(v => v >= 10 && v <= 1e6);
      const useR = Math.random() < 0.25;
      let v, code;
      if (useR) { v = pick(eSeries('E12', 1, 10)); const m = Math.round(v * 10); code = String(m)[0] + 'R' + String(m)[1]; v = m / 10; }
      else { v = pick(list); const e = Math.floor(Math.log10(v)) - 1, m = Math.round(v / 10 ** e); code = String(m) + e; }
      const truth = fmt(v, 'Ω', 3);
      const wrong = new Set();
      for (const f of [10, 0.1, 100, 0.01, 1.1, 2]) { const w = v * f; if (w >= 1 && w <= 1e7 && fmt(w, 'Ω', 3) !== truth) wrong.add(fmt(w, 'Ω', 3)); }
      return { kind: 'smd', code, answer: truth, options: shuffle([truth, ...shuffle([...wrong]).slice(0, 3)]), ask: 'Welchen Wert hat dieser SMD-Widerstand?', hint: useR ? 'Das R steht für das Komma: 4R7 = 4,7 Ω.' : 'Die letzte Ziffer ist die Anzahl der Nullen: 103 = 10 · 10³ Ω = 10 kΩ.' };
    }
    const bands = mode === '5' ? 5 : 4;
    const series = bands === 5 ? 'E24' : 'E12';
    const mant = eSeries(series, 1, 10);
    const v = +(pick(mant) * pick([1, 10, 100, 1e3, 1e4, 1e5])).toPrecision(3);
    const tol = bands === 5 ? pick([1, 2, 0.5]) : pick([5, 10, 5, 1, 2]);
    const rings = colorCode(v, { bands, tol });
    const ans = `${fmt(v, 'Ω', 3)} ${tolTxt(tol)}`;
    const wrong = new Set();
    const tries = [[v * 10, tol], [v / 10, tol], [v, tol === 5 ? 10 : 5], [v, tol === 1 ? 2 : 1], [v * 100, tol], [v / 100, tol]];
    for (const [w, t] of tries) { if (w < 1) continue; const txt = `${fmt(w, 'Ω', 3)} ${tolTxt(t)}`; if (txt !== ans) wrong.add(txt); }
    const lo = fmt(v * (1 - tol / 100), 'Ω', 4), hi = fmt(v * (1 + tol / 100), 'Ω', 4);
    return { kind: 'ring', rings, answer: ans, options: shuffle([ans, ...shuffle([...wrong]).slice(0, 3)]),
      ask: `Welchen Wert und welche Toleranz hat dieser Widerstand (${bands} Ringe)?`,
      hint: `Ringe: ${rings.map(r => r.name).join(', ')}. Toleranzband: ${lo} … ${hi}.` };
  }

  function paintScore() {
    score.replaceChildren(
      h('span', { class: 'vz-stat' + (ok >= need ? ' hl' : '') }, 'Richtig', h('b', { text: `${ok} von ${n}` })),
      h('span', { class: 'vz-stat' }, 'Aufgabe', h('b', { text: `${Math.min(n + (finished ? 0 : 1), rounds)} / ${rounds}` })),
      h('span', { class: 'vz-stat' + (fired ? ' hl' : '') }, fired ? '✓ Ziel erreicht' : `○ Ziel: ${need} von ${rounds} richtig`),
    );
  }

  function next() {
    if (finished) { n = 0; ok = 0; finished = false; }
    cur = makeQ(); locked = false; draw(cur); prompt.textContent = cur.ask; fb.textContent = ''; choices.replaceChildren();
    for (const o of cur.options) choices.append(h('button', { type: 'button', class: 'btn small ghost', text: o, onclick: e => answer(o, e.currentTarget) }));
    paintScore();
  }

  function answer(o, btn) {
    if (locked) return; locked = true; n++;
    const right = o === cur.answer;
    if (right) ok++;
    btn.style.outline = '2px solid ' + (right ? 'var(--good)' : 'var(--bad)');
    if (!right) [...choices.children].find(b => b.textContent === cur.answer).style.outline = '2px solid var(--good)';
    fb.textContent = (right ? 'Richtig. ' : `Nicht ganz — richtig ist ${cur.answer}. `) + cur.hint;
    if (ok >= need && !fired) { fired = true; complete?.(); }
    if (n >= rounds) { finished = true; fb.textContent += ` Runde beendet: ${ok} von ${rounds}.`; }
    paintScore();
    choices.append(h('button', { type: 'button', class: 'btn small', text: finished ? 'Neue Runde' : 'Weiter', onclick: next }));
  }

  paintMode(); next();
}
