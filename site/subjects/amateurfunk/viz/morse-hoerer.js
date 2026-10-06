// Morse-Hörer: Zeichen, Betriebsabkürzungen und Rufzeichen hören (Ton + Lampe), Tempo in WPM, Farnsworth-Pausen.
// Tempo: 1 Punkt = 1,2 s / WPM; „Paris“-Wort = 50 Punkteinheiten; 5 Zeichen = 1 Wort, also 1 WPM = 5 Zeichen/min.
// params: { need?: Anzahl richtiger Antworten in Folge (Standard 4) }
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { h, pick } from './_funk.js';

const CODE = { A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.', G: '--.', H: '....', I: '..', J: '.---', K: '-.-', L: '.-..', M: '--', N: '-.', O: '---', P: '.--.', Q: '--.-', R: '.-.', S: '...', T: '-', U: '..-', V: '...-', W: '.--', X: '-..-', Y: '-.--', Z: '--..', 0: '-----', 1: '.----', 2: '..---', 3: '...--', 4: '....-', 5: '.....', 6: '-....', 7: '--...', 8: '---..', 9: '----.', '/': '-..-.', '?': '..--..', '=': '-...-' };
const PRO = { AR: '.-.-.', SK: '...-.-', BK: '-...-.-' };
const WORDS = ['CQ', 'DE', 'K', 'PSE', 'TNX', 'RST', 'BK', 'AR', 'SK', '73', 'QSL', 'UR', 'VY', 'R', '599', '579'];
const pretty = c => c.replace(/\./g, '·').replace(/-/g, '−');
const morseOf = ch => PRO[ch] ?? CODE[ch];

export default function mount(stage, { params = {}, complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const need = params.need ?? 4;
  const lamp = h('div', { style: 'display:flex;align-items:center;gap:14px;padding:14px 16px;border:1px solid var(--line);border-radius:12px;background:var(--surface-2)' });
  const dot = h('div', { style: 'width:34px;height:34px;border-radius:50%;background:var(--line-2);flex:none;transition:background .03s' });
  const shown = h('div', { style: 'font:600 1.15rem var(--mono);letter-spacing:.12em;min-height:1.6em;word-break:break-all;color:var(--ink)' }, '…');
  lamp.append(dot, shown); root.append(lamp);
  const ui = controls(root, [
    { id: 'mode', type: 'seg', label: 'Übungsart', options: [['chr', 'Zeichen'], ['abk', 'Abkürzungen'], ['rz', 'Rufzeichen']], value: 'abk' },
    { id: 'wpm', label: 'Zeichengeschwindigkeit', min: 5, max: 25, step: 1, value: 12, format: v => v + ' WPM', digits: 0 },
    { id: 'eff', label: 'Gesamttempo (Farnsworth-Pausen)', min: 3, max: 25, step: 1, value: 12, format: v => v + ' WPM', digits: 0 },
    { id: 'tone', label: 'Tonhöhe', min: 400, max: 900, step: 25, value: 650, format: v => v + ' Hz', digits: 0 },
  ], () => { stats(); });
  const row = h('div', { style: 'display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:10px 0' });
  const play = h('button', { type: 'button', class: 'btn primary', text: 'Neu: abspielen' });
  const again = h('button', { type: 'button', class: 'btn ghost', text: 'Nochmal hören' });
  const inp = h('input', { type: 'text', placeholder: 'Was hörst du?', 'aria-label': 'Antwort', autocapitalize: 'characters', autocomplete: 'off', style: 'font:600 1.05rem var(--mono);padding:8px 12px;border:1px solid var(--line-2);border-radius:10px;width:11em;max-width:100%;text-transform:uppercase' });
  const chk = h('button', { type: 'button', class: 'btn ghost', text: 'Prüfen' });
  row.append(play, again, inp, chk); root.append(row);
  const fb = h('div', { class: 'vz-note', style: 'min-height:2.6em;margin-bottom:6px;line-height:1.5' }); root.append(fb);
  const out = readout(root, [{ id: 'cpm', label: 'Tempo', hl: true }, { id: 'dit', label: 'Punktlänge' }, { id: 'streak', label: 'richtig in Folge' }]);
  const g = goals(root, [{ id: 'g', label: `${need} richtige Antworten in Folge` }, { id: 'sp', label: 'Tempo auf 20 WPM stellen und eine Aufgabe hören' }], () => complete?.());
  const tab = h('details', { style: 'margin-top:10px' }, h('summary', { text: 'Morsetabelle (Buchstaben, Ziffern, Prozeichen)', style: 'cursor:pointer;color:var(--ink-2)' }),
    h('div', { style: 'display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:4px 10px;font:500 .9rem var(--mono);margin-top:8px' },
      ...Object.entries({ ...CODE, AR: PRO.AR, SK: PRO.SK, BK: PRO.BK }).map(([k, c]) => h('div', {}, h('b', { text: k + ' ' }), pretty(PRO[k] ?? c)))));
  root.append(tab);

  let ctx = null, cur = null, streak = 0, timers = [], answered = true;
  function stats() {
    const { wpm, eff } = ui.values, u = 1.2 / wpm;
    out.set({ cpm: `${wpm} WPM = ${wpm * 5} Zeichen/min` + (eff < wpm ? ` · gesamt ${eff} WPM` : ''), dit: Math.round(u * 1000) + ' ms', streak });
  }
  function timeline(text) {
    const { wpm, eff, tone } = ui.values, e = Math.min(eff, wpm), u = 1.2 / wpm;
    const ta = e < wpm ? (60 * wpm - 37.2 * e) / (e * wpm) : 0, cg = e < wpm ? 3 * ta / 19 : 3 * u, wg = e < wpm ? 7 * ta / 19 : 7 * u;
    const ev = []; let t = 0.25;   // [start, dauer]
    const words = text.split(' ');
    words.forEach((w, wi) => {
      const toks = PRO[w] && w.length === 2 ? [w] : w.split('');
      toks.forEach((tk, ci) => {
        const code = morseOf(tk) ?? '';
        [...code].forEach((s, si) => { const d = s === '.' ? u : 3 * u; ev.push([t, d]); t += d + (si < code.length - 1 ? u : 0); });
        if (ci < toks.length - 1) t += cg;
      });
      if (wi < words.length - 1) t += wg;
    });
    return { ev, end: t, tone };
  }
  function playSeq(text) {
    timers.forEach(clearTimeout); timers = [];
    const { ev, end, tone } = timeline(text);
    try {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      ctx.resume?.();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator(), gain = ctx.createGain();
      osc.frequency.value = tone; gain.gain.value = 0; osc.connect(gain); gain.connect(ctx.destination);
      for (const [s, d] of ev) { gain.gain.setTargetAtTime(0.25, now + s, 0.004); gain.gain.setTargetAtTime(0, now + s + d, 0.004); }
      osc.start(now); osc.stop(now + end + 0.3);
    } catch { /* kein Ton verfügbar: Lampe genügt */ }
    for (const [s, d] of ev) { timers.push(setTimeout(() => { dot.style.background = 'var(--accent)'; }, s * 1000), setTimeout(() => { dot.style.background = 'var(--line-2)'; }, (s + d) * 1000)); }
    if (ui.values.wpm === 20) g.reach('sp');
  }
  function newItem() {
    const m = ui.values.mode;
    let a;
    if (m === 'chr') a = pick([...'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789']);
    else if (m === 'abk') a = pick(WORDS);
    else a = pick(['DL', 'DJ', 'DK', 'DM', 'DO']) + pick('123456789') + pick([...'ABCDEFGHKLMNOPRSTUWXZ']) + pick([...'ABCDEFGHKLMNOPRSTUWXZ']);
    return a;
  }
  play.onclick = () => { cur = newItem(); answered = false; inp.value = ''; shown.textContent = '…'; fb.textContent = ''; playSeq(cur); inp.focus(); };
  again.onclick = () => { if (cur) playSeq(cur); };
  const check = () => {
    if (!cur || answered) { fb.textContent = 'Starte zuerst eine Aufgabe.'; return; }
    answered = true;
    const ok = inp.value.trim().toUpperCase() === cur;
    streak = ok ? streak + 1 : 0;
    shown.textContent = cur + '   ' + [...(PRO[cur] ? [cur] : cur)].map(c => pretty(morseOf(c) ?? '')).join('  ');
    fb.innerHTML = ok ? '<b style="color:var(--good)">Richtig.</b> ' + (PRO[cur] ? 'Prozeichen werden ohne Pause zwischen den Buchstaben gegeben.' : '') : `<b style="color:var(--bad)">Nicht ganz.</b> Gesendet wurde <b>${cur}</b>. Höre noch einmal hin und achte auf die Länge der Striche.`;
    stats();
    if (streak >= need) g.reach('g');
  };
  root._test = { get cur() { return cur; } };
  chk.onclick = check; inp.onkeydown = e => { if (e.key === 'Enter') check(); };
  stats();
}
