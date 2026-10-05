// Was liegt auf dem Prüfungstisch? Karten: „Liegt aus“ (Anlage 1 AFuV, Rufzeichenplan, IARU-Bandplanauszug 2 m/70 cm, Formelsammlung in den Technikteilen) oder „Muss ich wissen“.
// Quelle: BNetzA Vfg. 29/2024 Nr. 7.1 (Hilfsmittel); Inhalte der Formelsammlung: Anhang 6.1 des Fragenkatalogs, 3. Aufl. 2024. Stand 05.10.2026.
// params: { need?: 13 }
import { h } from '../../../assets/js/vizkit/base.js';
import { goals } from '../../../assets/js/vizkit/controls.js';

const ITEMS = [
  ['Höchstleistung der Klasse E im 80-m-Band (100 W PEP)', 'aus', 'Anlage 1 der AFuV wird gestellt: Frequenzbereiche, Leistungen und Bandbreiten stehen dort.'],
  ['Welche Rufzeichenreihe zu Klasse E gehört (DO1 bis DO9 für personengebundene Rufzeichen)', 'aus', 'Der Rufzeichenplan wird gestellt.'],
  ['Dass 3 dB einem Leistungsfaktor von 2 entsprechen', 'aus', 'Die Tabelle Leistungs- und Spannungsverhältnis steht in der Formelsammlung (Technikteile).'],
  ['Formel für die Resonanzfrequenz eines Schwingkreises', 'aus', 'Die Formelsammlung enthält f₀ = 1/(2·π·√(L·C)).'],
  ['Wellenlänge aus der Frequenz: λ[m] ≈ 300/f[MHz]', 'aus', 'Steht im Abschnitt Wellenlänge und Frequenz der Formelsammlung.'],
  ['Die Gültigkeitsgrenze d > λ/2π der Fernfeldformel für die Feldstärke', 'aus', 'Der Hinweis steht bei der Feldstärke-Formel in der Formelsammlung.'],
  ['Wie die Farbringe eines Widerstands zu lesen sind', 'aus', 'Die Farbcode-Tabelle ist Teil der Formelsammlung.'],
  ['Ob auf 145,600 MHz Direktverbindungen in FM üblich sind oder die Frequenz Relais vorbehalten ist', 'aus', 'Der Auszug aus dem IARU-Bandplan für 2 m und 70 cm wird gestellt.'],
  ['Welches Wort der Buchstabiertafel für „Q“ steht (Quebec)', 'wissen', 'Die Buchstabiertafel liegt nicht aus: auswendig lernen.'],
  ['Was die Q-Gruppe QRM bedeutet', 'wissen', 'Q-Gruppen und betriebliche Abkürzungen musst du kennen.'],
  ['Welchem Land der Landeskenner HB9 gehört', 'wissen', 'Der Rufzeichenplan betrifft nur deutsche Rufzeichen; die internationale Landeskennerliste liegt nicht aus.'],
  ['Ab welcher EIRP eine ortsfeste Station nach BEMFV anzuzeigen ist (10 W)', 'wissen', 'Rechtsvorschriften außer Anlage 1 AFuV und Rufzeichenplan liegen nicht aus.'],
  ['Welches Seitenband bei SSB im 80-m-Band üblich ist (unteres, LSB)', 'wissen', 'Es liegt nur der Bandplanauszug für 2 m und 70 cm aus, nicht der Kurzwellen-Bandplan.'],
  ['Wie das Schaltzeichen einer Diode aussieht und was es bedeutet', 'wissen', 'Schaltzeichen musst du erkennen; sie stehen nicht in der Formelsammlung.'],
  ['Die Umrechnung von MESZ in UTC (zwei Stunden abziehen)', 'wissen', 'Zeitumrechnung musst du im Kopf können.'],
  ['Dass ein Kondensator Gleichstrom sperrt und Wechselstrom durchlässt', 'wissen', 'Bauteilverhalten ist Verständnis, nicht Formel.'],
];

export default function mount(stage, { params = {}, complete }) {
  const need = Math.min(params.need ?? 13, ITEMS.length);
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const prog = h('div', { class: 'vz-note', style: 'margin-bottom:6px' });
  const card = h('div', { class: 'vz-stat', style: 'display:block;padding:14px 16px' });
  const q = h('div', { style: 'font-size:1.05rem;line-height:1.5;margin-bottom:12px;min-height:3em' });
  const row = h('div', { style: 'display:flex;gap:8px;flex-wrap:wrap' });
  const bAus = h('button', { type: 'button', class: 'btn ghost', text: 'Liegt in der Prüfung aus' }), bWiss = h('button', { type: 'button', class: 'btn ghost', text: 'Muss ich auswendig wissen' });
  row.append(bAus, bWiss);
  const fb = h('div', { class: 'vz-note', style: 'margin-top:10px;line-height:1.5;min-height:2.6em' });
  const nx = h('button', { type: 'button', class: 'btn primary', text: 'Weiter', style: 'display:none;margin-top:10px' });
  card.append(q, row, fb, nx); root.append(prog, card);
  const g = goals(root, [{ id: 'g', label: `${need} von ${ITEMS.length} richtig einsortiert` }], () => complete?.());
  let order, i, right, locked;
  function start() { order = shuffle([...ITEMS.keys()]); i = 0; right = 0; show(); }
  function show() {
    if (i >= ITEMS.length) { q.innerHTML = `<b>${right} von ${ITEMS.length} richtig.</b>`; row.style.display = 'none'; fb.textContent = right >= need ? 'Ziel erreicht.' : `Für das Ziel brauchst du ${need} Treffer.`; nx.textContent = 'Noch einmal'; nx.style.display = ''; nx.onclick = () => { row.style.display = 'flex'; start(); }; prog.textContent = ''; if (right >= need) g.reach('g'); return; }
    const [t] = ITEMS[order[i]];
    q.textContent = t; fb.textContent = 'Wo findest du das während der Prüfung?'; nx.style.display = 'none'; locked = false; bAus.disabled = bWiss.disabled = false; bAus.style.borderColor = bWiss.style.borderColor = '';
    prog.textContent = `Karte ${i + 1} von ${ITEMS.length} · richtig: ${right}`;
  }
  function pick(k) {
    if (locked) return; locked = true;
    const [, c, why] = ITEMS[order[i]], ok = k === c;
    if (ok) right++;
    (c === 'aus' ? bAus : bWiss).style.borderColor = 'var(--good)'; if (!ok) (k === 'aus' ? bAus : bWiss).style.borderColor = 'var(--bad)';
    bAus.disabled = bWiss.disabled = true;
    fb.innerHTML = `<b style="color:var(--${ok ? 'good' : 'bad'})">${ok ? 'Richtig.' : 'Nicht ganz.'}</b> ${why}`;
    nx.textContent = i + 1 >= ITEMS.length ? 'Ergebnis' : 'Weiter'; nx.style.display = ''; nx.onclick = () => { i++; show(); };
    prog.textContent = `Karte ${i + 1} von ${ITEMS.length} · richtig: ${right}`;
  }
  bAus.onclick = () => pick('aus'); bWiss.onclick = () => pick('wissen');
  start();
  stage._test = { ITEMS, get cur() { return ITEMS[order[i]]; }, pick, next: () => nx.onclick(), all() { for (let n = 0; n < ITEMS.length; n++) { pick(ITEMS[order[i]][1]); nx.onclick(); } } };
}
function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
