// Transceiver-Frontplatte: Bedienelemente erkunden (Antippen erklärt) und Szenarien lösen („Welchen Regler brauchst du?“).
// params: { need?: richtige Antworten (Standard 6 von 8) }
import { controls, goals } from '../../../assets/js/vizkit/controls.js';
import { h, shuffle } from './_funk.js';

const MODES = ['LSB', 'USB', 'CW', 'AM', 'FM'];
const INFO = {
  vfo: ['VFO-Knopf', 'Stellt die Frequenz ein. Bei SSB muss man ihn feinfühlig drehen: schon wenige hundert Hertz daneben ist die Stimme unverständlich.'],
  mode: ['MODE', 'Wählt die Sendeart: CW, AM, FM, LSB oder USB. Bei SSB ist das richtige Seitenband entscheidend: unter 10 MHz meist LSB, ab 10 MHz meist USB (digitale Betriebsarten immer USB).'],
  rit: ['RIT (Receiver Incremental Tuning, bei manchen Geräten „Clarifier“)', 'Verstellt nur die Empfangsfrequenz um einige hundert Hertz, die Sendefrequenz bleibt. Gegenstation klingt zu hoch oder zu tief? RIT drehen. Ist die RIT noch eingeschaltet, empfängt dich die Gegenstation „nicht exakt auf ihrer Frequenz“.'],
  vox: ['VOX (voice-operated exchange)', 'Schaltet den Sender durch Sprechen ein; nach einer kurzen Verzögerung wieder aus. Schaltet das Gerät von selbst auf Sendung, ist meist VOX aktiviert (Husten, Hintergrundgeräusche).'],
  sql: ['SQL (Squelch, Rauschsperre)', 'Blendet das Rauschen in den Sendepausen aus, vor allem bei FM. Gerade so weit aufdrehen, dass es in den Pausen still wird; zu weit, und schwache Signale werden mit ausgeblendet.'],
  mic: ['MIC-Gain (Mikrofonverstärkung)', 'Stellt den NF-Pegel am Sender ein. Zu klein: wenig Ausgangsleistung. Zu groß: ALC spricht stark an, Splatter stört Nachbarstationen. Bei FM: zu großer Hub.'],
  alc: ['ALC-Anzeige (Automatic Level Control)', 'Zeigt, ob die Pegelregelung im Sendezweig eingreift. Sie senkt die Amplitude vor dem Leistungsverstärker. Bei SSB darf der Zeiger leicht zucken, bei Digimodes soll er ruhen.'],
  ptt: ['PTT (Push to Talk)', 'Sendetaste. Ohne VOX schaltet nur sie den Transceiver auf Sendung.'],
  tune: ['TUNE', 'Sendet kurz einen unmodulierten Träger zum Abstimmen, z. B. des Antennentuners oder zum Einstellen des Digimode-Pegels. Nur kurzzeitig und auf einer freien Frequenz oder an der Dummy Load.'],
};
const ITEMS = [
  { q: 'Du möchtest beide Hände frei haben und durch Sprechen auf Sendung gehen.', a: 'vox', e: 'Das ist VOX. PTT wäre die Taste, RIT verschiebt nur die Empfangsfrequenz.' },
  { q: 'Auf einer FM-Frequenz rauscht es in jeder Sendepause laut. Was stellst du ein?', a: 'sql', e: 'Die Rauschsperre (Squelch) blendet das Rauschen aus, solange kein Signal anliegt.' },
  { q: 'Eine SSB-Station antwortet etwas neben deiner Frequenz, ihre Stimme klingt zu hoch. Du willst deine Sendefrequenz nicht verstellen.', a: 'rit', e: 'RIT ändert nur die Empfangsfrequenz. Notchfilter und Passband-Tuning beheben das nicht.' },
  { q: 'Dein Transceiver schaltet beim Husten plötzlich auf Sendung. Was ist aktiviert?', a: 'vox', e: 'Die VOX reagiert auf jedes laute Geräusch am Mikrofon, nicht nur auf Sprache.' },
  { q: 'Die Gegenstation meldet bei einem SSB-QSO: „Du sendest nicht exakt auf meiner Frequenz.“ Was könnte die Ursache sein?', a: 'rit', e: 'Ein eingeschaltetes RIT verschiebt deine Empfangsfrequenz. Dann „stimmst“ du nach und die Gegenstation hört dich nur auf dem Umweg. RIT ausschalten.' },
  { q: 'Im 80-m-Band klingt die SSB-Sprache unverständlich. Was prüfst du zuerst?', a: 'mode', e: 'Das Seitenband (LSB/USB) im MODE. Beim falschen Seitenband sind die Tonhöhen gespiegelt. Danach feinfühlig mit dem VFO-Knopf abstimmen.' },
  { q: 'Beim Sprechen schlägt der ALC-Zeiger voll aus. Welchen Regler drehst du zurück?', a: 'mic', e: 'Die Mikrofonverstärkung. Ansteuerung langsam erhöhen, bis die ALC gerade anspricht, dann wieder etwas zurück.' },
  { q: 'Du willst die Antenne kurz abstimmen und dafür einen unmodulierten Träger aussenden.', a: 'tune', e: 'TUNE sendet kurz einen Träger. Das ist erlaubt, wenn es kurzzeitig geschieht, am besten an der Dummy Load oder auf freier Frequenz.' },
  { q: 'Du willst im 2-m-Band FM hören. Was stellst du um?', a: 'mode', e: 'Die Sendeart (MODE) auf FM. Eine Relaisablage wäre eine weitere Einstellung, nicht das Seitenband.' },
];

export default function mount(stage, { params = {}, complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const need = params.need ?? 6, count = 8;
  const st = { mode: 'USB', rit: false, vox: false, sql: 0, mic: 2, ptt: false };
  const disp = h('div', { style: 'background:#0d1b2a;color:#9fe3c8;font:600 1.15rem var(--mono);padding:12px 16px;border-radius:12px 12px 4px 4px;display:flex;flex-wrap:wrap;gap:6px 18px;align-items:baseline' });
  const grid = h('div', { style: 'display:grid;grid-template-columns:repeat(auto-fit,minmax(104px,1fr));gap:8px;background:var(--surface-2);border:1px solid var(--line);padding:12px;border-radius:4px 4px 12px 12px' });
  root.append(disp, grid);
  const ui = controls(root, [{ id: 'm', type: 'seg', label: 'Betrieb', options: [['explore', 'Erkunden'], ['task', 'Aufgaben']], value: 'explore' }], v => setMode(v.m));
  const info = h('div', { class: 'vz-note', style: 'line-height:1.55;margin:10px 0;min-height:4.5em' });
  const nx = h('button', { type: 'button', class: 'btn primary', text: 'Nächste Aufgabe', style: 'display:none;margin-bottom:8px' });
  root.append(info, nx);
  const g = goals(root, [{ id: 'g', label: `${need} von ${count} Aufgaben richtig` }, { id: 'ex', label: 'Alle Bedienelemente einmal angetippt' }], () => complete?.());
  const tapped = new Set(); let queue = [], n = 0, ok = 0, cur = null, locked = true;

  const defs = [
    ['vfo', 'VFO', () => '14.205,00'], ['mode', 'MODE', () => st.mode], ['rit', 'RIT', () => (st.rit ? 'EIN +300 Hz' : 'aus')], ['vox', 'VOX', () => (st.vox ? 'EIN' : 'aus')],
    ['sql', 'SQL', () => '▮'.repeat(st.sql) + '▯'.repeat(4 - st.sql)], ['mic', 'MIC', () => '▮'.repeat(st.mic) + '▯'.repeat(4 - st.mic)], ['alc', 'ALC', () => (st.ptt ? (st.mic >= 3 ? '▮▮▮▮ hoch' : st.mic === 2 ? '▮▮▯▯ zuckt' : '▯▯▯▯') : '–')],
    ['ptt', 'PTT', () => (st.ptt ? 'SENDET' : 'Empfang')], ['tune', 'TUNE', () => 'Träger'],
  ];
  const btn = {};
  for (const [id, name, val] of defs) {
    const b = h('button', { type: 'button', class: 'btn ghost', style: 'display:grid;gap:2px;padding:10px 6px;text-align:center', 'aria-label': name, onclick: () => tap(id) }, h('b', { text: name, style: 'font-size:.95rem' }), h('span', { style: 'font:500 .78rem var(--mono);color:var(--ink-2)' }));
    btn[id] = { b, val, sp: b.lastChild }; grid.append(b);
  }
  function paint() {
    disp.replaceChildren(h('span', { text: '14.205,00 kHz' }), h('span', { text: st.mode }), ...(st.rit ? [h('span', { text: 'RIT' })] : []), ...(st.vox ? [h('span', { text: 'VOX' })] : []), ...(st.ptt ? [h('span', { style: 'color:#ff8c7a', text: 'TX' })] : [h('span', { text: 'RX' })]));
    for (const [id, o] of Object.entries(btn)) o.sp.textContent = o.val();
  }
  function tap(id) {
    if (id === 'mode') st.mode = MODES[(MODES.indexOf(st.mode) + 1) % MODES.length];
    if (id === 'rit') st.rit = !st.rit;
    if (id === 'vox') st.vox = !st.vox;
    if (id === 'sql') st.sql = (st.sql + 1) % 5;
    if (id === 'mic') st.mic = (st.mic % 4) + 1;
    if (id === 'ptt') st.ptt = !st.ptt;
    if (id === 'tune') { st.ptt = true; setTimeout(() => { st.ptt = false; paint(); }, 900); }
    paint();
    if (ui.values.m === 'explore') {
      info.innerHTML = '<b>' + INFO[id][0] + '.</b> ' + INFO[id][1];
      tapped.add(id); if (tapped.size === defs.length) g.reach('ex');
    } else if (cur && !locked) {
      locked = true; const right = id === cur.a; if (right) ok++;
      info.innerHTML = (right ? '<b style="color:var(--good)">Richtig.</b> ' : '<b style="color:var(--bad)">Nicht ganz: ' + INFO[cur.a][0].split(' (')[0] + ' wäre es.</b> ') + cur.e;
      if (ok >= need) g.reach('g');
      if (n < count) nx.style.display = ''; else info.innerHTML += '<br><b>' + ok + ' von ' + count + ' richtig.</b> Zum Wiederholen „Aufgaben“ erneut wählen.';
    }
  }
  function next() {
    if (n >= count) return;
    cur = queue[n++]; locked = false; nx.style.display = 'none';
    info.innerHTML = `<b>Aufgabe ${n} von ${count}.</b> ${cur.q}<br><span style="color:var(--muted)">Tippe auf das passende Bedienelement.</span>`;
  }
  nx.onclick = next;
  function setMode(m) {
    if (m === 'task') { queue = shuffle(ITEMS).slice(0, count); n = 0; ok = 0; next(); }
    else { cur = null; locked = true; nx.style.display = 'none'; info.textContent = 'Tippe ein Bedienelement an: Es ändert seinen Zustand, und hier steht, was es tut.'; }
  }
  root._test = { get cur() { return cur; }, tap };
  paint(); setMode('explore');
}
