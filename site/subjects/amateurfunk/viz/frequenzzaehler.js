// Frequenzzähler-Trainer: (1) Stellenwert einer markierten Ziffer ablesen, (2) Messung mit Vorteiler (Teiler 10:1 oder 100:1) auswerten.
// Regel: Die angezeigte Zehnerpotenz (z. B. ³ = 10³ Hz) gilt für die Stelle direkt vor dem Komma; nach links wird jede Stelle zehnmal wertvoller.
// params: { need?: Richtige in Folge (Standard 5) }
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { h, pick, shuffle, trimDec } from './_funk.js';

const NAMES = { 0: '1 Hz', 1: '10 Hz', 2: '100 Hz', 3: '1 kHz', 4: '10 kHz', 5: '100 kHz', 6: '1 MHz', 7: '10 MHz', 8: '100 MHz', 9: '1 GHz' };
const fmtHz = f => (f >= 1e9 ? trimDec(f / 1e9, 6) + ' GHz' : f >= 1e6 ? trimDec(f / 1e6, 6) + ' MHz' : f >= 1e3 ? trimDec(f / 1e3, 6) + ' kHz' : trimDec(f, 3) + ' Hz');

export default function mount(stage, { params = {}, complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const need = params.need ?? 5;
  let mode = 'pos', q = null, streak = 0, best = 0, done = 0, locked = false;
  const lcd = h('div', { style: 'background:#17202a;color:#c8f7dc;border-radius:12px;padding:16px 18px;font:600 2rem var(--mono);letter-spacing:.08em;min-height:3.4rem;display:flex;align-items:flex-start;gap:4px;flex-wrap:wrap;justify-content:center' });
  root.append(lcd);
  const ui = controls(root, [{ id: 'm', type: 'seg', label: 'Aufgabe', options: [['pos', 'Stellenwert ablesen'], ['div', 'Vorteiler 10:1 / 100:1']], value: 'pos' }], v => { mode = v.m; next(); });
  const qEl = h('div', { style: 'font-size:1.03rem;line-height:1.55;margin:10px 0 8px' });
  const opts = h('div', { style: 'display:flex;flex-wrap:wrap;gap:8px' });
  const fb = h('div', { class: 'vz-note', style: 'min-height:3.2em;margin-top:10px;line-height:1.55' });
  const nx = h('button', { type: 'button', class: 'btn primary', text: 'Weiter', style: 'display:none;margin-top:8px' });
  root.append(qEl, opts, fb, nx);
  const out = readout(root, [{ id: 's', label: 'Serie', hl: true }, { id: 'b', label: 'Beste Serie' }, { id: 'n', label: 'Aufgaben' }]);
  const g = goals(root, [{ id: 'g', label: `${need} richtige Antworten in Folge` }], () => complete?.());

  function gen() {
    if (mode === 'pos') {
      const e = pick([0, 3, 6]), k = pick([2, 3]), digits = Array.from({ length: k + 4 }, () => Math.floor(Math.random() * 10));
      if (digits[0] === 0) digits[0] = 1 + Math.floor(Math.random() * 9);
      const idx = Math.floor(Math.random() * digits.length), expo = idx < k ? e + (k - 1 - idx) : e - (idx - k + 1);
      if (expo < 0) return gen();
      const correct = NAMES[expo], pool = Object.keys(NAMES).map(Number).filter(n => n !== expo && Math.abs(n - expo) <= 3 && n >= 0);
      const wrong = shuffle(pool).slice(0, 3).map(n => NAMES[n]);
      return { kind: 'pos', digits, k, e, idx, correct, options: shuffle([correct, ...wrong]), explain: `Die Zehnerpotenz 10<sup>${e}</sup> Hz gilt für die Ziffer direkt vor dem Komma (Stellenwert ${NAMES[e]}). Von dort sind es ${idx < k ? (k - 1 - idx) + ' Stelle(n) nach links, also jeweils × 10' : (idx - k + 1) + ' Stelle(n) nach rechts, also jeweils ÷ 10'}: markierte Ziffer = <b>${correct}</b>.` };
    }
    const ratio = pick([10, 100]), f = pick([14.5625e6, 43.8125e6, 14.4e6, 24.0e6, 145.6e3 * 10, 14.3125e6]), shown = f / ratio * 1;
    const actual = shown * ratio, wrongs = [shown, actual / 10, actual * 10, shown / ratio].filter(x => Math.abs(x - actual) > 1e-6);
    const correct = fmtHz(actual);
    return { kind: 'div', shownTxt: fmtHz(shown), ratio, correct, options: shuffle([correct, ...shuffle([...new Set(wrongs.map(fmtHz))]).filter(t => t !== correct).slice(0, 3)]), explain: `Ein ${ratio}:1-Teiler teilt die Frequenz durch ${ratio}. Der Zähler zeigt also nur den ${ratio}. Teil: tatsächliche Frequenz = ${fmtHz(shown)} × ${ratio} = <b>${correct}</b>.` };
  }
  function draw() {
    lcd.replaceChildren();
    if (q.kind === 'pos') {
      q.digits.forEach((d, i) => { if (i === q.k) lcd.append(h('span', { text: '.', style: 'margin:0 -1px' })); lcd.append(h('span', { text: String(d), style: i === q.idx ? 'background:#ffd27a;color:#17202a;border-radius:4px;padding:0 4px' : '' })); });
      lcd.append(h('span', { html: '<span style="font-size:1.1rem;margin-left:8px;align-self:flex-start;color:#9fe3c8">' + q.e + '</span>', title: 'Zehnerpotenz: 10^' + q.e + ' Hz' }));
    } else lcd.append(h('span', { text: q.shownTxt }), h('span', { text: '  ← Zähler hinter 1:' + q.ratio + ' Teiler', style: 'font-size:.85rem;color:#9fe3c8;align-self:center;letter-spacing:0' }));
  }
  function next() {
    q = gen(); locked = false; draw(); fb.textContent = ''; nx.style.display = 'none';
    qEl.innerHTML = q.kind === 'pos' ? 'Der Zähler zeigt die Frequenz in Hz mal der kleinen Zehnerpotenz rechts. <b>Welchen Stellenwert hat die gelb markierte Ziffer?</b>' : `Vor dem Frequenzzähler hängt ein <b>${q.ratio}:1-Frequenzteiler</b>. Der Zähler zeigt ${q.shownTxt}. <b>Wie hoch ist die tatsächliche Frequenz?</b>`;
    opts.replaceChildren(...q.options.map(o => h('button', { type: 'button', class: 'btn ghost', text: o, onclick: () => pickAns(o) })));
  }
  function pickAns(o) {
    if (locked) return; locked = true; done++;
    const ok = o === q.correct; if (ok) { streak++; best = Math.max(best, streak); if (streak >= need) g.reach('g'); } else streak = 0;
    fb.innerHTML = (ok ? '<b style="color:var(--good)">Richtig.</b> ' : '<b style="color:var(--bad)">Nicht ganz.</b> ') + q.explain;
    out.set({ s: streak + ' / ' + need, b: best, n: done }); nx.style.display = '';
  }
  root._test = { get q() { return q; } };
  nx.onclick = next; out.set({ s: '0 / ' + need, b: 0, n: 0 }); next();
}
