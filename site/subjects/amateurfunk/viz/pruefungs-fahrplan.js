// Prüfungs-Fahrplan: Klassen N/E/A als Treppe (Rechte, Prüfungsteile, Fragenpool) + Punkte-Rechner (19 von 25, mündliche Nachprüfung ab 17).
// params: { goals?: ['classes','pass','oral','fail'] }
import { h } from '../../../assets/js/vizkit/base.js';
import { controls, goals } from '../../../assets/js/vizkit/controls.js';

const CLASSES = {
  N: { name: 'Klasse N', sub: 'Einsteiger', parts: ['V', 'B', 'N'], pool: 204 + 172 + 195, power: '10 W ERP im 10-m-Band, 6,1 W ERP auf 2 m und 70 cm', bands: 'nur 28 MHz, 144 MHz und 430 MHz', note: 'Technik nur in den „wesentlichen Grundzügen“ (§ 4 Abs. 3 AFuV).' },
  E: { name: 'Klasse E', sub: 'diese Plattform', parts: ['V', 'B', 'N', 'E'], pool: 1034, power: '100 W PEP auf den freigegebenen KW-Bändern, 75 W PEP ab 144 MHz, 5 W PEP im Mikrowellenbereich', bands: 'drei KW-Bänder (160 m, 80 m, 15 m), 10 m und fast alle Bänder ab 144 MHz', note: 'Technik in den „Grundzügen“ der Klasse A (§ 4 Abs. 2 AFuV). Wer N hat, macht nur den Teil E nach.' },
  A: { name: 'Klasse A', sub: 'Vollzugang', parts: ['V', 'B', 'N', 'E', 'A'], pool: null, power: 'bis 750 W PEP', bands: 'alle Amateurfunkbänder der Anlage 1', note: 'Zusatzprüfung Technik A (60 Minuten) auf Basis von N und E.' },
};
const PART_NAME = { V: 'Vorschriften', B: 'Betrieb', N: 'Technik N', E: 'Technik E', A: 'Technik A' };

export default function mount(stage, { params = {}, complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const need = params.goals ?? ['classes', 'pass', 'oral', 'fail'];
  const seen = new Set();
  const ui = controls(root, [{ id: 'cls', type: 'seg', label: 'Zulassungsklasse', options: Object.entries(CLASSES).map(([k, c]) => [k, c.name]), value: 'E' }], v => { seen.add(v.cls); renderClass(); if (seen.size >= 3) g.reach('classes'); });
  const card = h('div', { class: 'vz-stat', style: 'display:block;padding:14px 16px;margin-bottom:12px' }); root.append(card);
  function renderClass() {
    const c = CLASSES[ui.values.cls];
    card.replaceChildren(
      h('div', { style: 'font-weight:700;font-size:1.1rem', html: `${c.name} <span style="color:var(--muted);font-weight:400">· ${c.sub}</span>` }),
      h('div', { style: 'display:flex;flex-wrap:wrap;gap:6px;margin:8px 0' }, c.parts.map(p => h('span', { style: 'padding:3px 10px;border-radius:999px;border:1px solid var(--line);background:#fff;font-size:.85rem', text: `Teil ${p}: ${PART_NAME[p]}` }))),
      h('div', { style: 'font-size:.92rem;line-height:1.5', html: `<b>Prüfung:</b> ${c.parts.length} Teile × 25 Fragen${c.pool ? `, Fragenpool ${c.pool} Fragen` : ''}.<br><b>Leistung:</b> ${c.power}.<br><b>Frequenzen:</b> ${c.bands}.<br><span style="color:var(--muted)">${c.note}</span>` }));
  }
  renderClass();

  h4('Punkte-Rechner für die Klasse-E-Prüfung');
  const parts = ['V', 'B', 'N', 'E'];
  const defs = parts.map(p => ({ id: p, label: `Teil ${p} (${PART_NAME[p]})`, min: 0, max: 25, value: 22, step: 1, format: v => `${v} von 25` }));
  const ui2 = controls(root, defs, calc);
  const verdict = h('div', { class: 'vz-note', style: 'font-size:1rem;line-height:1.5;padding:10px 12px;border-radius:10px;border:1px solid var(--line);background:#fff' }); root.append(verdict);
  const g = goals(root, [
    { id: 'classes', label: 'alle drei Klassen angesehen' },
    { id: 'pass', label: 'bestanden mit genau 76 Punkten' },
    { id: 'oral', label: 'mündliche Nachprüfung ausgelöst' },
    { id: 'fail', label: 'durchgefallen trotz 3 bestandener Teile (ein Teil unter 17)' },
  ].filter(x => need.includes(x.id)), () => complete?.());
  function calc() {
    const v = ui2.values, pts = parts.map(p => v[p]), missed = parts.filter(p => v[p] < 19), sum = pts.reduce((a, b) => a + b, 0);
    let txt, col;
    if (!missed.length) { txt = `<b>Bestanden.</b> Alle vier Teile haben mindestens 19 Punkte (insgesamt ${sum} von 100; höchstens 6 Fehler je Teil).`; col = 'var(--good)'; if (sum === 76) g.reach('pass'); }
    else if (missed.length === 1 && v[missed[0]] >= 17) { txt = `<b>Mündliche Nachprüfung möglich</b> in Teil ${missed[0]}: nur dieser eine Teil wurde verfehlt, aber mit ${v[missed[0]]} Punkten (mindestens 17 nötig). Die Entscheidung trifft der Prüfungsvorsitzende.`; col = 'var(--warn)'; g.reach('oral'); }
    else { txt = `<b>Nicht bestanden.</b> ${missed.length > 1 ? `Teile ${missed.join(', ')} wurden verfehlt — die Nachprüfung gibt es nur, wenn <i>ein einziger</i> Teil fehlt.` : `Teil ${missed[0]} hat nur ${v[missed[0]]} Punkte (unter 17: keine Nachprüfung).`} Die bestandenen Teile bleiben 24 Monate gültig; nur die verfehlten Teile werden wiederholt.`; col = 'var(--bad)'; if (missed.length === 1) g.reach('fail'); }
    verdict.style.borderColor = col; verdict.innerHTML = txt;
  }
  function h4(t) { root.append(h('h4', { text: t, style: 'margin:14px 0 4px;font-size:.95rem' })); }
  calc();
}
