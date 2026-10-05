// Gemeinsamer Aufgaben-Trainer für die Prüfungs-Brücken-Demos (Amateurfunk).
// trainer(stage, { complete, md, need, modes: [{ id, label, gen }], goal, intro? })
//   gen() → { q: Markdown/KaTeX, unit: 'MHz', ans: Zahl (in `unit`), tol?: relative Toleranz (0.02), explain: Markdown, keys?: string, digits? }
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { h } from '../../../assets/js/vizkit/base.js';

export const pick = a => a[Math.floor(Math.random() * a.length)];
export const de = (x, d = 3) => { if (!Number.isFinite(x)) return '–'; const s = (+x.toPrecision(d)).toString(); return s.includes('e') ? (+x).toExponential(d - 1).replace('.', ',') : s.replace('.', ','); };

export function trainer(stage, { complete, md, need = 5, modes, goal, tolerance = 0.02 }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  let q = null, streak = 0, best = 0, done = 0, locked = false, mode = modes[0];
  const ui = modes.length > 1
    ? controls(root, [{ id: 'mode', type: 'seg', label: 'Aufgabenart', options: modes.map(m => [m.id, m.label]), value: modes[0].id }], v => { mode = modes.find(m => m.id === v.mode); next(); })
    : null;
  const card = h('div', { class: 'vz-stat', style: 'display:block;padding:16px 18px' });
  const qEl = h('div', { style: 'font-size:1.05rem;line-height:1.6;margin-bottom:10px' });
  const inp = h('input', { type: 'text', inputmode: 'decimal', placeholder: 'Ergebnis', 'aria-label': 'Ergebnis', style: 'font:600 1.1rem var(--mono);padding:8px 12px;border:1px solid var(--line-2);border-radius:10px;width:10em;max-width:100%' });
  const unitEl = h('span', { style: 'font:600 1.1rem var(--mono);margin:0 12px 0 8px' });
  const ok = h('button', { type: 'button', class: 'btn primary', text: 'Prüfen' });
  const nx = h('button', { type: 'button', class: 'btn ghost', text: 'Weiter', style: 'display:none' });
  const fb = h('div', { class: 'vz-note', style: 'margin-top:10px;min-height:2.6em' });
  card.append(qEl, h('div', { style: 'display:flex;flex-wrap:wrap;align-items:center;gap:6px 0' }, inp, unitEl, ok, nx), fb);
  root.append(card);
  const out = readout(root, [{ id: 'streak', label: 'Serie', hl: true }, { id: 'best', label: 'Beste Serie' }, { id: 'n', label: 'Aufgaben' }]);
  const g = goals(root, [{ id: 'g', label: goal || `${need} Aufgaben in Folge richtig` }], () => complete?.());

  function next() {
    q = mode.gen(); locked = false;
    qEl.innerHTML = md(q.q); unitEl.textContent = q.unit || '';
    inp.value = ''; inp.disabled = false; inp.style.borderColor = '';
    fb.innerHTML = q.hint ? md(q.hint) : 'Rechne mit dem Taschenrechner und gib das Ergebnis in der genannten Einheit ein (Dezimalkomma ist erlaubt, auf etwa 2 % genau).';
    ok.style.display = ''; nx.style.display = 'none';
    inp.focus({ preventScroll: true });
  }
  function check() {
    if (locked) return;
    const v = parseFloat(inp.value.replace(',', '.').replace(/[^\d.eE+-]/g, ''));
    if (Number.isNaN(v)) return;
    locked = true; done++;
    const right = Math.abs(v - q.ans) <= Math.abs(q.ans) * (q.tol ?? tolerance) + 1e-12;
    const res = `${de(q.ans)}${q.unit ? '\\,\\text{' + q.unit.replace(/Ω/g, '}\\Omega\\text{').replace(/µ/g, '}\\mu\\text{') + '}' : ''}`;
    if (right) { streak++; best = Math.max(best, streak); inp.style.borderColor = 'var(--good)'; if (streak >= need) g.reach('g'); }
    else { streak = 0; inp.style.borderColor = 'var(--bad)'; }
    fb.innerHTML = `<b style="color:var(--${right ? 'good' : 'bad'})">${right ? 'Richtig.' : 'Nicht ganz.'}</b> ` + md(`Ergebnis: $${res}$. ${q.explain || ''}`) + (q.keys ? `<div style="margin-top:6px"><b>Tastenfolge:</b> <code>${q.keys}</code></div>` : '');
    out.set({ streak: `${streak} / ${need}`, best, n: done });
    inp.disabled = true; ok.style.display = 'none'; nx.style.display = ''; nx.focus({ preventScroll: true });
  }
  ok.onclick = check; nx.onclick = next;
  inp.onkeydown = e => { if (e.key === 'Enter') check(); };
  root.addEventListener('keydown', e => { if (e.key === 'Enter' && locked && e.target !== nx) next(); });
  out.set({ streak: `0 / ${need}`, best: 0, n: 0 });
  next();
  root._test = { get q() { return q; }, inp, check, next };
  return root;
}
