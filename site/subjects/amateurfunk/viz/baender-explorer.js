// Bänder-Explorer nach AFuV Anlage 1 (Stand 27.05.2024 / 05.10.2026): Klasse wählen → Bänder, Status P/S und Höchstleistung; Frequenz-Check mit belegter Bandbreite.
// params: { goals?: ['sek','x40','ghz'] }
import { h } from '../../../assets/js/vizkit/base.js';
import { controls, goals } from '../../../assets/js/vizkit/controls.js';

// [Band, von (MHz), bis (MHz), Anzeige, Status, A, E, N, Bandbreite, Hinweis]
const R = [
  ['2200 m', 0.1357, 0.1378, '135,7–137,8 kHz', 'S', '1 W ERP', null, null, '800 Hz', ''],
  ['630 m', 0.472, 0.479, '472–479 kHz', 'S', '1 W ERP', null, null, '800 Hz', ''],
  ['160 m', 1.810, 1.850, '1810–1850 kHz', 'P', '750 W PEP', '100 W PEP', null, '2,7 kHz', ''],
  ['160 m', 1.850, 1.890, '1850–1890 kHz', 'S', '75 W PEP', '75 W PEP', null, '2,7 kHz', 'Wochenende: A 750 W, E 100 W PEP (und Contest erlaubt).'],
  ['160 m', 1.890, 2.000, '1890–2000 kHz', 'S', '10 W PEP', '10 W PEP', null, '2,7 kHz', 'Wochenende: A 750 W, E 100 W PEP (und Contest erlaubt).'],
  ['80 m', 3.5, 3.8, '3500–3800 kHz', 'P', '750 W PEP', '100 W PEP', null, '2,7 kHz', ''],
  ['60 m', 5.3515, 5.3665, '5351,5–5366,5 kHz', 'S', '9,14 W ERP', null, null, '2,7 kHz', ''],
  ['40 m', 7.0, 7.2, '7000–7200 kHz', 'P', '750 W PEP', null, null, '2,7 kHz', ''],
  ['30 m', 10.1, 10.15, '10100–10150 kHz', 'S', '150 W PEP', null, null, '800 Hz', ''],
  ['20 m', 14.0, 14.35, '14000–14350 kHz', 'P', '750 W PEP', null, null, '2,7 kHz', ''],
  ['17 m', 18.068, 18.168, '18068–18168 kHz', 'P', '750 W PEP', null, null, '2,7 kHz', ''],
  ['15 m', 21.0, 21.45, '21000–21450 kHz', 'P', '750 W PEP', '100 W PEP', null, '2,7 kHz', ''],
  ['12 m', 24.89, 24.99, '24890–24990 kHz', 'P', '750 W PEP', null, null, '2,7 kHz', ''],
  ['10 m', 28, 29.7, '28–29,7 MHz', 'P', '750 W PEP', '100 W PEP', '10 W ERP', '7 kHz (unter 29 MHz), 40 kHz (darüber)', ''],
  ['6 m', 50, 50.4, '50–50,4 MHz', 'S', '750 W PEP', null, null, '12 kHz', 'nur ortsfest, horizontale Polarisation'],
  ['6 m', 50.4, 52, '50,4–52 MHz', 'S', '25 W PEP', null, null, '12 kHz', 'nur ortsfest, horizontale Polarisation'],
  ['2 m', 144, 146, '144–146 MHz', 'P', '750 W PEP', '75 W PEP', '6,1 W ERP', '40 kHz', ''],
  ['70 cm', 430, 440, '430–440 MHz', 'P', '750 W PEP', '75 W PEP', '6,1 W ERP', '2 MHz', ''],
  ['23 cm', 1240, 1300, '1240–1300 MHz', 'S', '750 W PEP', '75 W PEP', null, '2 MHz', 'Im Teilbereich 1247–1263 MHz nur 3,05 W ERP; dort keine fernbedienten/automatischen Stationen.'],
  ['13 cm', 2320, 2450, '2320–2450 MHz', 'S', '75 W PEP', '5 W PEP', null, '10 MHz', ''],
  ['9 cm', 3400, 3475, '3400–3475 MHz', 'S', '75 W PEP', '5 W PEP', null, '10 MHz', ''],
  ['6 cm', 5650, 5850, '5650–5850 MHz', 'S', '75 W PEP', '5 W PEP', null, '10 MHz', ''],
  ['3 cm', 10000, 10500, '10–10,5 GHz', 'S', '75 W PEP', '5 W PEP', null, '10 MHz', ''],
  ['1,2 cm', 24000, 24050, '24–24,05 GHz', 'P', '75 W PEP', '5 W PEP', null, '–', ''],
  ['1,2 cm', 24050, 24250, '24,05–24,25 GHz', 'S', '75 W PEP', '5 W PEP', null, '10 MHz', ''],
  ['6 mm', 47000, 47200, '47–47,2 GHz', 'P', '75 W PEP', '5 W PEP', null, '–', ''],
  ['4 mm', 76000, 81000, '76–81 GHz', 'S', '75 W PEP', '5 W PEP', null, '10 MHz', ''],
  ['2,5 mm', 122250, 123000, '122,25–123 GHz', 'S', '75 W PEP', '5 W PEP', null, '10 MHz', ''],
  ['2 mm', 134000, 136000, '134–136 GHz', 'P', '75 W PEP', '5 W PEP', null, '10 MHz', ''],
  ['2 mm', 136000, 141000, '136–141 GHz', 'S', '75 W PEP', '5 W PEP', null, '10 MHz', ''],
  ['1 mm', 241000, 248000, '241–248 GHz', 'S', '75 W PEP', '5 W PEP', null, '–', ''],
  ['1 mm', 248000, 250000, '248–250 GHz', 'P', '75 W PEP', '5 W PEP', null, '–', ''],
];
const COL = { A: 5, E: 6, N: 7 };
const de = x => String(x).replace('.', ',');

export default function mount(stage, { params = {}, complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const seen = new Set();
  const ui = controls(root, [
    { id: 'cls', type: 'seg', label: 'Deine Klasse', options: [['N', 'Klasse N'], ['E', 'Klasse E'], ['A', 'Klasse A']], value: 'E' },
    { id: 'st', type: 'seg', label: 'Status', options: [['all', 'alle'], ['P', 'nur primär'], ['S', 'nur sekundär']], value: 'all' },
  ], draw);
  const inp = h('input', { type: 'text', inputmode: 'decimal', placeholder: 'z. B. 145,5', 'aria-label': 'Frequenz in MHz', style: 'font:600 1rem var(--mono);padding:7px 11px;border:1px solid var(--line-2);border-radius:10px;width:9em' });
  const btn = h('button', { type: 'button', class: 'btn small', text: 'Frequenz prüfen (MHz)' });
  const chk = h('div', { class: 'vz-stat', style: 'display:block;padding:10px 14px;margin:8px 0;line-height:1.55;min-height:3em' });
  root.append(h('div', { style: 'margin:10px 0 0' }, inp, ' ', btn), chk);
  const list = h('div', { style: 'max-height:380px;overflow:auto;border:1px solid var(--line);border-radius:10px' });
  root.append(list);
  const need = params.goals ?? ['sek', 'x40', 'ghz'];
  const g = goals(root, [
    { id: 'sek', label: 'ein Klasse-E-Band mit sekundärem Status gefunden' },
    { id: 'x40', label: '7,1 MHz geprüft: Klasse E darf dort nicht senden' },
    { id: 'ghz', label: 'eine Frequenz ab 13 cm (z. B. 2400 MHz) als Klasse E prüfen: nur 5 W PEP' },
  ].filter(x => need.includes(x.id)), () => complete?.());
  function draw() {
    const { cls, st } = ui.values; const col = COL[cls];
    const rows = R.filter(r => st === 'all' || r[4] === st);
    list.replaceChildren(h('table', { style: 'border-collapse:collapse;width:100%;font-size:.85rem', html:
      `<thead><tr>${['Band', 'Bereich', 'Status', 'max. Leistung'].map(c => `<th style="position:sticky;top:0;background:#fff;text-align:left;padding:5px 8px;border-bottom:2px solid var(--line)">${c}</th>`).join('')}</tr></thead><tbody>` +
      rows.map(r => { const ok = r[col]; return `<tr style="${ok ? '' : 'color:var(--muted);background:#fafafa'}"><td style="padding:4px 8px;border-bottom:1px solid var(--line);font-weight:600">${r[0]}</td><td style="padding:4px 8px;border-bottom:1px solid var(--line)">${r[3]}</td><td style="padding:4px 8px;border-bottom:1px solid var(--line)">${r[4] === 'P' ? '<b style="color:var(--good)">P</b>' : 'S'}</td><td style="padding:4px 8px;border-bottom:1px solid var(--line)">${ok || '–'}</td></tr>`; }).join('') + '</tbody>' }));
    if (cls === 'E' && st === 'S') g.reach('sek');
  }
  function check() {
    const f = parseFloat(inp.value.replace(',', '.')); if (!(f > 0)) return;
    const { cls } = ui.values, row = R.find(r => f >= r[1] - 1e-9 && f <= r[2] + 1e-9);
    if (!row) { chk.innerHTML = `<b>${de(f)} MHz</b> liegt in keinem Amateurfunkband der Anlage 1 — dort darfst du nicht senden.`; return; }
    const ok = row[COL[cls]];
    chk.innerHTML = `<b>${de(f)} MHz</b> → <b>${row[0]}-Band</b> (${row[3]}), Amateurfunkdienst <b>${row[4] === 'P' ? 'primär' : 'sekundär'}</b>.<br>Klasse ${cls}: ${ok ? `<b style="color:var(--good)">erlaubt</b>, höchstens ${ok}` : '<b style="color:var(--bad)">nicht erlaubt</b> (Band nicht für diese Klasse freigegeben)'}.<br><span style="color:var(--ink-2)">Belegte Bandbreite höchstens ${row[8]}.${row[9] ? ' ' + row[9] : ''}</span>`;
    if (cls === 'E' && !ok && f >= 7.1 && f <= 7.2) g.reach('x40');
    if (cls === 'E' && ok === '5 W PEP') g.reach('ghz');
  }
  btn.onclick = check; inp.onkeydown = e => { if (e.key === 'Enter') check(); };
  chk.innerHTML = 'Gib eine Frequenz ein, um Band, Status und Leistung zu sehen.';
  draw();
}
