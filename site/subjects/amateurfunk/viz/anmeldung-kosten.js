// Prüfungs-Kostenrechner: Prüfungsart wählen, Teile und Zulassung → Gebühren (BMDVTKBGebV, Stand 05.10.2026) und Pfad Antrag → Zulassung.
// params: { goals?: ['full','repeat','upgrade'] }
import { h } from '../../../assets/js/vizkit/base.js';
import { controls, goals } from '../../../assets/js/vizkit/controls.js';

const eur = x => x.toFixed(2).replace('.', ',') + ' €';
const STEPS = [
  ['Antrag', 'Antrag auf Zulassung zur Prüfung stellen (elektronisch über die Seite der Bundesnetzagentur; Wunschtermin und Prüfort angeben).'],
  ['Zwischenbescheid', 'Du erhältst einen Zwischenbescheid mit den Zahlungsdaten; die Gebühr wird überwiesen.'],
  ['Einladung', 'Die Bundesnetzagentur legt Ort und Zeit fest und lädt dich zur Prüfung ein. Terminänderung bis 14 Kalendertage vorher, die erste ist gebührenfrei.'],
  ['Prüfung', 'Ausweis mitbringen; vier Teile à 25 Fragen, Antworten auf den Antwortbogen.'],
  ['Bescheinigung', 'Alle Teile bestanden: Du erhältst die Amateurfunk-Prüfungsbescheinigung.'],
  ['Zulassung', 'Antrag auf Zulassung (20 €): Erst damit bekommst du dein Rufzeichen und darfst senden.'],
];

export default function mount(stage, { params = {}, complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const seen = new Set();
  const ui = controls(root, [
    { id: 'art', type: 'seg', label: 'Was möchtest du ablegen?', options: [['full', 'Erstprüfung Klasse E'], ['repeat', 'Wiederholung'], ['upgrade', 'Zusatzprüfung N → E']], value: 'full' },
    { id: 'teile', label: 'Zu wiederholende Teile', min: 1, max: 4, value: 2, step: 1, format: v => `${v} Teil${v > 1 ? 'e' : ''}` },
    { id: 'zul', type: 'toggle', label: 'inkl. Zulassung mit Rufzeichen', value: true },
  ], run);
  const card = h('div', { class: 'vz-stat', style: 'display:block;padding:14px 16px;margin:10px 0;line-height:1.6' });
  const path = h('ol', { style: 'margin:8px 0 0;padding-left:1.3rem;font-size:.92rem;line-height:1.5' },
    STEPS.map(([t, d]) => h('li', { html: `<b>${t}</b> — ${d}` })));
  root.append(card, path);
  const g = goals(root, [
    { id: 'full', label: 'Erstprüfung E + Zulassung: 93,50 €' },
    { id: 'repeat', label: 'Wiederholung mit 2 Teilen berechnet' },
    { id: 'upgrade', label: 'Zusatzprüfung N → E berechnet' },
  ].filter(x => (params.goals ?? ['full', 'repeat', 'upgrade']).includes(x.id)), () => complete?.());
  function run() {
    const { art, teile, zul } = ui.values;
    const rows = [];
    let sum = 0;
    if (art === 'full') { rows.push(['Erstprüfung Klasse E (4 Teile)', 73.5]); }
    if (art === 'repeat') { rows.push(['Wiederholungsprüfung', 42.5], [`Zuschlag ${teile} × 5,50 € je wiederholtem Teil`, 5.5 * teile]); }
    if (art === 'upgrade') { rows.push(['Zusatzprüfung Klasse N nach E (nur Teil E)', 48]); }
    if (zul) rows.push(['Zulassung mit persönlichem Rufzeichen', 20]);
    for (const r of rows) sum += r[1];
    card.innerHTML = `<table style="width:100%;border-collapse:collapse;font-size:.95rem">${rows.map(r => `<tr><td style="padding:3px 0">${r[0]}</td><td style="text-align:right;font-family:var(--mono)">${eur(r[1])}</td></tr>`).join('')}
      <tr style="border-top:2px solid var(--line)"><td style="padding-top:6px"><b>Summe</b></td><td style="text-align:right;font-family:var(--mono);padding-top:6px;color:var(--accent)"><b>${eur(sum)}</b></td></tr></table>`;
    seen.add(art);
    if (art === 'full' && zul && Math.abs(sum - 93.5) < 1e-9) g.reach('full');
    if (art === 'repeat' && teile === 2) g.reach('repeat');
    if (art === 'upgrade') g.reach('upgrade');
  }
  run();
}
