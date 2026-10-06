// Vielfachzugriff: FDMA, TDMA und CDMA als Zeit-Frequenz-Bild; dazu ein Erkennungs-Quiz.
// Drei Teilnehmer (A, B, C) teilen sich ein Frequenzband. params: { need?: richtig im Quiz (Standard 4 von 5) }
import { controls, goals } from '../../../assets/js/vizkit/controls.js';
import { chart, h, s, txt, line, rect, shuffle, pick } from './_funk.js';

const COL = ['var(--accent)', 'var(--accent-2)', 'var(--warn)'];
const INFO = {
  fdma: ['FDMA (Frequenzmultiplex)', 'Jeder Teilnehmer bekommt dauerhaft seine eigene Frequenz. Zeitgleich auf unterschiedlichen Frequenzen. Einfach, aber ein reservierter Kanal bleibt auch ungenutzt, wenn nichts gesendet wird. Beispiel: die Kanäle eines FM-Relais, frühe analoge Mobilfunknetze.'],
  tdma: ['TDMA (Zeitmultiplex)', 'Alle senden auf derselben Frequenz, aber reihum in kurzen Zeitschlitzen: im schnellen zeitlichen Wechsel. Verlangt genaue Zeitsynchronisation. Im Amateurfunk: DMR (zwei Zeitschlitze), außerdem GSM, DECT.'],
  cdma: ['CDMA (Codemultiplex)', 'Alle senden gleichzeitig im selben Frequenzbereich; jeder Teilnehmer spreizt sein Signal mit einem eigenen Code, daran trennt der Empfänger die Signale wieder. Beispiele: UMTS, GPS.'],
};

export default function mount(stage, { params = {}, complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const need = params.need ?? 4, rounds = 5;
  const c = chart(root, { h: 230, x: [0, 12], y: [0, 3], xticks: [0, 4, 8, 12], xfmt: v => (v === 12 ? 'Zeit →' : v === 0 ? '0' : ''), yticks: [], ylabel: 'Frequenz →', margin: { l: 30 }, aria: 'Zeit-Frequenz-Bild: wer sendet wann auf welcher Frequenz' });
  const ui = controls(root, [{ id: 'v', type: 'seg', label: 'Ansicht', options: [['fdma', 'FDMA'], ['tdma', 'TDMA'], ['cdma', 'CDMA'], ['quiz', 'Quiz']], value: 'fdma' }], run);
  const note = h('div', { class: 'vz-note', style: 'line-height:1.55;margin:8px 0' }); root.append(note);
  const opts = h('div', { style: 'display:flex;flex-wrap:wrap;gap:8px;margin-bottom:6px' });
  const nx = h('button', { type: 'button', class: 'btn primary', text: 'Weiter', style: 'display:none' });
  root.append(opts, nx);
  const g = goals(root, [{ id: 'g', label: `Quiz: ${need} von ${rounds} richtig` }, { id: 'seen', label: 'Alle drei Verfahren angesehen' }], () => complete?.());
  const seen = new Set(); let n = 0, ok = 0, target = null, locked = false;

  function draw(kind) {
    c.clear();
    c.add(rect(c.X(0), c.Y(3), c.X(12) - c.X(0), c.Y(0) - c.Y(3), { fill: 'var(--surface)', stroke: 'var(--line-2)' }));
    const users = [0, 1, 2];
    if (kind === 'fdma') users.forEach(u => c.add(rect(c.X(0), c.Y(u + 0.92), c.X(12) - c.X(0), c.Y(0) - c.Y(0.84), { fill: COL[u], fo: 0.55, stroke: COL[u] }), txt(c.X(0.2), c.Y(u + 0.5) + 4, 'Teilnehmer ' + 'ABC'[u], { fill: 'var(--ink)', bold: true })));
    if (kind === 'tdma') { for (let t = 0; t < 12; t++) { const u = t % 3; c.add(rect(c.X(t) + 1, c.Y(1.92), c.X(1) - c.X(0) - 2, c.Y(0) - c.Y(0.84), { fill: COL[u], fo: 0.6, stroke: COL[u] }), txt(c.X(t + 0.5), c.Y(1.4) + 4, 'ABC'[u], { anchor: 'middle', fill: 'var(--ink)', bold: true })); } c.add(txt(c.X(0.2), c.Y(2.55), 'eine Frequenz, Zeitschlitze reihum', { fill: 'var(--ink-2)' })); }
    if (kind === 'cdma') { [0, 1, 2].forEach(u => { for (let k = -4; k < 26; k++) { const x0 = k * 0.5 + (u === 1 ? 0.17 : u === 2 ? 0.33 : 0), dir = u === 1 ? -1 : 1, sl = u === 2 ? 0.55 : 1; c.add(line(c.X(Math.max(0, x0)), c.Y(dir > 0 ? Math.max(0, -x0 * sl) : 3 - Math.max(0, -x0 * sl)), c.X(Math.min(12, x0 + 3 / sl)), c.Y(dir > 0 ? Math.min(3, (12 - x0) * 0 + 3) : 0), { color: COL[u], w: 1.2, opacity: 0.55 })); } }); c.add(txt(c.X(0.2), c.Y(2.7), 'alle gleichzeitig im ganzen Band, getrennt durch Codes', { fill: 'var(--ink)', bold: true, size: 11.5 })); }
  }
  function ask() {
    target = pick(['fdma', 'tdma', 'cdma']); locked = false; draw(target); n++;
    note.textContent = `Frage ${n} von ${rounds}: Welches Vielfachzugriffsverfahren zeigt das Bild?`;
    opts.replaceChildren(...shuffle(['fdma', 'tdma', 'cdma']).map(k => h('button', { type: 'button', class: 'btn ghost', text: INFO[k][0], onclick: () => { if (locked) return; locked = true; const right = k === target; if (right) ok++; note.innerHTML = (right ? '<b style="color:var(--good)">Richtig.</b> ' : '<b style="color:var(--bad)">Es war ' + INFO[target][0] + '.</b> ') + INFO[target][1]; if (ok >= need) g.reach('g'); nx.style.display = n < rounds ? '' : 'none'; if (n >= rounds) note.innerHTML += '<br><b>' + ok + ' von ' + rounds + ' richtig.</b> Zum Wiederholen oben „Quiz“ erneut antippen.'; } })));
    nx.style.display = 'none';
  }
  nx.onclick = ask;
  function run(v, id) {
    if (v.v === 'quiz') { if (id === 'v' || !target) { n = 0; ok = 0; ask(); } return; }
    opts.replaceChildren(); nx.style.display = 'none';
    draw(v.v); note.innerHTML = '<b>' + INFO[v.v][0] + '.</b> ' + INFO[v.v][1];
    seen.add(v.v); if (seen.size === 3) g.reach('seen');
  }
  root._test = { get target() { return target; } };
  void s;
  run(ui.values);
}
