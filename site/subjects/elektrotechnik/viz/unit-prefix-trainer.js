// D01 Einheiten-Vorsatz-Trainer: Aufgaben-Generator „a Vorsatz-Einheit = ? Vorsatz-Einheit“.
// params: { streak?: Anzahl richtiger Antworten in Folge (Standard 10), units?: ['A','V',…] }
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { h } from '../../../assets/js/vizkit/base.js';

const PREFIX = { '-12': 'p', '-9': 'n', '-6': 'µ', '-3': 'm', 0: '', 3: 'k', 6: 'M', 9: 'G' };
const BASIC = [-3, 0, 3, 6];
const ALL = [-12, -9, -6, -3, 0, 3, 6, 9];
const UNITS = { A: 'Ampere', V: 'Volt', 'Ω': 'Ohm', F: 'Farad', Hz: 'Hertz', W: 'Watt', H: 'Henry' };
const MANT = [1, 1.5, 2, 2.2, 3, 3.3, 3.75, 4.2, 4.7, 5, 5.6, 7.5, 8.2, 9, 12, 22, 42, 47, 100, 220, 420, 470];

const pick = a => a[Math.floor(Math.random() * a.length)];
const clean = x => +x.toPrecision(10);
const de = x => String(clean(x)).replace('.', ',');
const sup = e => `10<sup>${String(e).replace('-', '−')}</sup>`;
const sci = x => { // 4,2·10⁶ (Mantisse 1…10)
  const e = Math.floor(Math.log10(Math.abs(x)) + 1e-12), m = clean(x / 10 ** e);
  return `${de(m)}·${sup(e)}`;
};

export default function mount(stage, { params = {}, complete, md }) {
  const need = params.streak ?? 10;
  const unitList = params.units ?? Object.keys(UNITS);
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  let q = null, streak = 0, best = 0, done = 0, locked = false;

  const ui = controls(root, [
    { id: 'unit', type: 'seg', label: 'Einheit', options: [['*', 'gemischt'], ...unitList.map(u => [u, u])], value: '*' },
    { id: 'level', type: 'seg', label: 'Vorsätze', options: [['basic', 'm · k · M'], ['all', 'p … G']], value: 'basic' },
    { id: 'sci', type: 'toggle', label: 'auch Zehnerpotenz-Schreibweise', value: true },
  ], () => next());

  const card = h('div', { class: 'vz-stat', style: 'display:block;padding:16px 18px' });
  const qEl = h('div', { style: 'font-size:1.35rem;line-height:1.5;margin-bottom:10px' });
  const inp = h('input', { type: 'text', inputmode: 'decimal', placeholder: 'Zahl eingeben', 'aria-label': 'Antwort', style: 'font:600 1.1rem var(--mono);padding:8px 12px;border:1px solid var(--line-2);border-radius:10px;width:11em;max-width:100%' });
  const unitEl = h('span', { style: 'font:600 1.1rem var(--mono);margin:0 12px 0 8px' });
  const ok = h('button', { type: 'button', class: 'btn primary', text: 'Prüfen' });
  const nx = h('button', { type: 'button', class: 'btn ghost', text: 'Weiter', style: 'display:none' });
  const fb = h('div', { class: 'vz-note', style: 'margin-top:10px;min-height:2.6em' });
  const row = h('div', { style: 'display:flex;flex-wrap:wrap;align-items:center;gap:6px 0' }, inp, unitEl, ok, nx);
  card.append(qEl, row, fb);
  root.append(card);
  const out = readout(root, [{ id: 'streak', label: 'Serie', hl: true }, { id: 'best', label: 'Beste Serie' }, { id: 'n', label: 'Aufgaben' }]);
  const g = goals(root, [{ id: 'g', label: `${need} Aufgaben in Folge richtig` }], () => complete?.());

  function gen() {
    const ps = ui.values.level === 'all' ? ALL : BASIC;
    const unit = ui.values.unit === '*' ? pick(unitList) : ui.values.unit;
    for (let k = 0; k < 500; k++) {
      const from = pick(ps), to = pick(ps);
      if (from === to) continue;
      const a = pick(MANT) * 10 ** pick([-2, -1, 0, 1, 2]);       // gesuchter Wert
      const n = a * 10 ** (to - from);                              // gegebener Wert (in `from`)
      if (n < 1e-5 || n > 1e7 || a < 1e-4 || a > 1e7) continue;
      const useSci = ui.values.sci && Math.random() < 0.3 && (n < 0.01 || n >= 1000);
      return { unit, from, to, given: clean(n), ans: clean(a), useSci };
    }
    return { unit: 'A', from: -3, to: -6, given: 42, ans: 42000, useSci: false };
  }
  function next() {
    q = gen(); locked = false;
    const num = q.useSci ? sci(q.given) : de(q.given);
    qEl.innerHTML = `${num}&thinsp;${PREFIX[q.from]}${q.unit} &nbsp;=&nbsp; <b>?</b>&thinsp;${PREFIX[q.to]}${q.unit}`;
    unitEl.textContent = (PREFIX[q.to] || '') + q.unit;
    inp.value = ''; inp.disabled = false; inp.style.borderColor = '';
    fb.innerHTML = 'Tipp: Von <b>' + (PREFIX[q.from] || 'Grundeinheit') + '</b> nach <b>' + (PREFIX[q.to] || 'Grundeinheit') + '</b> — in welche Richtung wird die Zahl größer?';
    ok.style.display = ''; nx.style.display = 'none';
    inp.focus({ preventScroll: true });
  }
  function check() {
    if (locked) return;
    const v = parseFloat(inp.value.replace(',', '.').replace(/[^\d.eE+-]/g, ''));
    if (Number.isNaN(v)) return;
    locked = true; done++;
    const right = Math.abs(v - q.ans) <= Math.abs(q.ans) * 1e-6;
    const k = q.from - q.to;   // Zahl wird mit 10^k multipliziert
    const why = `1&thinsp;${PREFIX[q.from]}${q.unit} = ${sup(q.from)}&thinsp;${q.unit} und 1&thinsp;${PREFIX[q.to]}${q.unit} = ${sup(q.to)}&thinsp;${q.unit}, also Zahl × ${sup(k)} (${k > 0 ? 'größer' : 'kleiner'}, weil die Zielgröße ${k > 0 ? 'kleiner' : 'größer'} ist).`;
    if (right) { streak++; best = Math.max(best, streak); fb.innerHTML = `<b style="color:var(--good)">Richtig.</b> ${de(q.ans)}&thinsp;${PREFIX[q.to]}${q.unit} = ${sci(q.ans)}&thinsp;${PREFIX[q.to]}${q.unit}. ${why}`; inp.style.borderColor = 'var(--good)'; if (streak >= need) g.reach('g'); }
    else { streak = 0; fb.innerHTML = `<b style="color:var(--bad)">Nicht ganz.</b> Richtig wäre <b>${de(q.ans)}</b>&thinsp;${PREFIX[q.to]}${q.unit}. ${why}`; inp.style.borderColor = 'var(--bad)'; }
    out.set({ streak: `${streak} / ${need}`, best, n: done });
    inp.disabled = true; ok.style.display = 'none'; nx.style.display = ''; nx.focus({ preventScroll: true });
  }
  ok.onclick = check; nx.onclick = next;
  inp.onkeydown = e => { if (e.key === 'Enter') check(); };
  root.addEventListener('keydown', e => { if (e.key === 'Enter' && locked && e.target !== nx) next(); });
  out.set({ streak: `0 / ${need}`, best: 0, n: 0 });
  next();
}
