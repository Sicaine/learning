// Buchstabier-Trainer: internationale Buchstabiertafel (RR Anhang 14) — Rufzeichen buchstabieren und Buchstabiertes in ein Rufzeichen zurückübersetzen.
// params: { need?: Serie richtiger Antworten (6) }
import { h } from '../../../assets/js/vizkit/base.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';

const W = { A: 'Alfa', B: 'Bravo', C: 'Charlie', D: 'Delta', E: 'Echo', F: 'Foxtrot', G: 'Golf', H: 'Hotel', I: 'India', J: 'Juliett', K: 'Kilo', L: 'Lima', M: 'Mike', N: 'November', O: 'Oscar', P: 'Papa', Q: 'Quebec', R: 'Romeo', S: 'Sierra', T: 'Tango', U: 'Uniform', V: 'Victor', W: 'Whiskey', X: 'X-ray', Y: 'Yankee', Z: 'Zulu' };
const ALT = { alpha: 'alfa', juliet: 'juliett', xray: 'x-ray', 'x ray': 'x-ray', viktor: 'victor', whisky: 'whiskey' };
const DIG = { 0: 'null', 1: 'eins', 2: 'zwei', 3: 'drei', 4: 'vier', 5: 'fünf', 6: 'sechs', 7: 'sieben', 8: 'acht', 9: 'neun' };
const DIGEN = { 0: 'zero', 1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five', 6: 'six', 7: 'seven', 8: 'eight', 9: 'nine' };
const pick = a => a[Math.floor(Math.random() * a.length)];
const L = () => pick('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''));
// Rufzeichen-Generator: deutsche Muster, gelegentlich /p
function genCall() {
  const pre = pick(['DA', 'DB', 'DC', 'DD', 'DF', 'DG', 'DH', 'DJ', 'DK', 'DL', 'DM', 'DN', 'DO']);
  const dig = pre === 'DN' ? 9 : Math.floor(Math.random() * 9) + 1;
  const suf = Array.from({ length: Math.random() < 0.5 ? 2 : 3 }, L).join('');
  return pre + dig + suf + (Math.random() < 0.2 ? '/P' : '');
}
const spell = c => c.split('').map(ch => ch === '/' ? 'Stroke' : /\d/.test(ch) ? DIG[ch] : W[ch]);
const norm = s => s.toLowerCase().replace(/[.,;]/g, ' ').replace(/x[ -]ray/g, 'x-ray').replace(/\s+/g, ' ').trim().split(' ').filter(Boolean).map(w => ALT[w] || w);
const NUMW = Object.fromEntries([...Object.entries(DIG), ...Object.entries(DIGEN)].map(([k, v]) => [v, k]));

export default function mount(stage, { params = {}, complete }) {
  const need = params.need ?? 6;
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  let mode = 'spell', call = '', streak = 0, best = 0, n = 0, locked = false;
  controls(root, [{ id: 'mode', type: 'seg', label: 'Übung', options: [['spell', 'Rufzeichen → Wörter'], ['back', 'Wörter → Rufzeichen']], value: 'spell' }], v => { mode = v.mode; next(); });
  const card = h('div', { class: 'vz-stat', style: 'display:block;padding:16px 18px' });
  const q = h('div', { style: 'font-size:1.05rem;line-height:1.6;margin-bottom:10px' });
  const inp = h('input', { type: 'text', 'aria-label': 'Antwort', autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false', style: 'font:600 1.05rem var(--mono);padding:8px 12px;border:1px solid var(--line-2);border-radius:10px;width:100%;box-sizing:border-box' });
  const ok = h('button', { type: 'button', class: 'btn primary', text: 'Prüfen', style: 'margin-top:10px' });
  const nx = h('button', { type: 'button', class: 'btn ghost', text: 'Weiter', style: 'margin-top:10px;display:none' });
  const fb = h('div', { class: 'vz-note', style: 'margin-top:10px;line-height:1.55' });
  card.append(q, inp, h('div', {}, ok, nx), fb);
  const tab = h('details', { style: 'margin:10px 0' }, h('summary', { text: 'Buchstabiertafel anzeigen (Hilfe)', style: 'cursor:pointer;font-size:.9rem' }),
    h('div', { style: 'display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:2px 10px;font-size:.88rem;margin-top:6px', html: Object.entries(W).map(([k, v]) => `<div><b style="font-family:var(--mono)">${k}</b> ${v}</div>`).join('') }));
  root.append(card, tab);
  const out = readout(root, [{ id: 's', label: 'Serie', hl: true }, { id: 'b', label: 'Beste Serie' }, { id: 'n', label: 'Aufgaben' }]);
  const g = goals(root, [{ id: 'g', label: `${need} Rufzeichen in Folge richtig` }], () => complete?.());
  function next() {
    call = genCall(); locked = false; inp.value = ''; inp.disabled = false; inp.style.borderColor = '';
    q.innerHTML = mode === 'spell'
      ? `Buchstabiere das Rufzeichen <b style="font:700 1.3rem var(--mono);color:var(--accent)">${call}</b> mit der internationalen Buchstabiertafel (Ziffern auf Deutsch, Wörter durch Leerzeichen getrennt).`
      : `Welches Rufzeichen wird hier buchstabiert?<br><b>${spell(call).join(' ')}</b>`;
    inp.placeholder = mode === 'spell' ? 'z. B. Delta Lima eins …' : 'Rufzeichen eingeben';
    fb.textContent = ''; ok.style.display = ''; nx.style.display = 'none'; inp.focus({ preventScroll: true });
  }
  function check() {
    if (locked || !inp.value.trim()) return;
    locked = true; n++;
    let right;
    if (mode === 'spell') {
      const got = norm(inp.value).map(w => NUMW[w] ?? w), want = call.split('').map(ch => ch === '/' ? 'stroke' : /\d/.test(ch) ? ch : W[ch].toLowerCase());
      // "Stroke portable" / "stroke p" tolerieren: nur Wörter bis zum Schrägstrich-Wort vergleichen, danach beliebig portable/papa
      const i = want.indexOf('stroke');
      right = i < 0 ? got.join(' ') === want.join(' ') : got.slice(0, i + 1).join(' ') === want.slice(0, i + 1).join(' ') && ['portable', 'papa', 'p'].includes(got[i + 1]);
    } else right = inp.value.toUpperCase().replace(/\s+/g, '') === call;
    if (right) { streak++; best = Math.max(best, streak); if (streak >= need) g.reach('g'); } else streak = 0;
    inp.style.borderColor = right ? 'var(--good)' : 'var(--bad)'; inp.disabled = true;
    fb.innerHTML = `<b style="color:var(--${right ? 'good' : 'bad'})">${right ? 'Richtig.' : 'Nicht ganz.'}</b> ${call}: ${spell(call).join(' ')}${call.includes('/') ? ' (portable, Stroke = Schrägstrich)' : ''}`;
    out.set({ s: `${streak} / ${need}`, b: best, n }); ok.style.display = 'none'; nx.style.display = ''; nx.focus({ preventScroll: true });
  }
  ok.onclick = check; nx.onclick = next;
  inp.onkeydown = e => { if (e.key === 'Enter') check(); };
  root.addEventListener('keydown', e => { if (e.key === 'Enter' && locked && e.target !== nx) next(); });
  out.set({ s: `0 / ${need}`, b: 0, n: 0 });
  next();
  root._test = { get call() { return call; }, inp, check, next, spell: () => spell(call).join(' ') };
}
