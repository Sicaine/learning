// Klubstation: persönliche Klasse × Klasse der Klubstation → wirksame Klasse (die niedrigere gilt) und was damit erlaubt ist.
// Leistungen und Bereiche: AFuV Anlage 1 (Stand 27.05.2024).
import { h } from '../../../assets/js/vizkit/base.js';
import { controls, goals } from '../../../assets/js/vizkit/controls.js';

const RANK = { N: 1, E: 2, A: 3 };
// [Band, Bereich, A, E, N]
const BANDS = [
  ['160 m', '1810–1850 kHz', '750 W PEP', '100 W PEP', null],
  ['80 m', '3500–3800 kHz', '750 W PEP', '100 W PEP', null],
  ['40 m', '7000–7200 kHz', '750 W PEP', null, null],
  ['20 m', '14000–14350 kHz', '750 W PEP', null, null],
  ['15 m', '21000–21450 kHz', '750 W PEP', '100 W PEP', null],
  ['10 m', '28–29,7 MHz', '750 W PEP', '100 W PEP', '10 W ERP'],
  ['6 m', '50–52 MHz', '750 W PEP (ab 50,4 MHz nur 25 W)', null, null],
  ['2 m', '144–146 MHz', '750 W PEP', '75 W PEP', '6,1 W ERP'],
  ['70 cm', '430–440 MHz', '750 W PEP', '75 W PEP', '6,1 W ERP'],
  ['23 cm', '1240–1300 MHz', '750 W PEP', '75 W PEP', null],
];

export default function mount(stage, { complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const seen = new Set();
  const ui = controls(root, [
    { id: 'p', type: 'seg', label: 'Deine Zulassungsklasse', options: [['N', 'Klasse N'], ['E', 'Klasse E'], ['A', 'Klasse A']], value: 'E' },
    { id: 's', type: 'seg', label: 'Klasse der Klubstation', options: [['N', 'Klasse N'], ['E', 'Klasse E'], ['A', 'Klasse A']], value: 'A' },
  ], run);
  const head = h('div', { class: 'vz-stat hl', style: 'display:block;padding:12px 16px;margin:10px 0;font-size:1rem' });
  const tbl = h('div'); root.append(head, tbl);
  const g = goals(root, [
    { id: 'ae', label: 'Klasse A an E-Klubstation' },
    { id: 'ea', label: 'Klasse E an A-Klubstation' },
    { id: 'n', label: 'Klasse N an einer A-Klubstation' },
    { id: '40', label: 'die einzige Kombination mit 40 m' },
  ], () => complete?.());
  function run(_, id) {
    const act = !!id;
    const { p, s } = ui.values; seen.add(p + s);
    const eff = RANK[p] <= RANK[s] ? p : s;
    head.innerHTML = `<b>${p}</b> an Klubstation <b>${s}</b> → es gelten die Rechte der <b style="color:var(--accent)">Klasse ${eff}</b> (die niedrigere der beiden).`;
    const col = { A: 2, E: 3, N: 4 }[eff];
    tbl.replaceChildren(h('table', { style: 'border-collapse:collapse;width:100%;font-size:.88rem', html: `<tbody>${BANDS.map(b => {
      const v = b[col];
      return `<tr style="${b[0] === '40 m' ? 'background:var(--accent-soft)' : ''}"><td style="padding:4px 8px;border-bottom:1px solid var(--line);font-weight:600">${b[0]}</td><td style="padding:4px 8px;border-bottom:1px solid var(--line);color:var(--ink-2)">${b[1]}</td><td style="padding:4px 8px;border-bottom:1px solid var(--line);color:${v ? 'var(--good)' : 'var(--bad)'}">${v || 'nicht erlaubt'}</td></tr>`;
    }).join('')}</tbody>` }));
    if (!act) return;
    if (p === 'A' && s === 'E') g.reach('ae');
    if (p === 'E' && s === 'A') g.reach('ea');
    if (p === 'N' && s === 'A') g.reach('n');
    if (eff === 'A') g.reach('40');
  }
  run();
}
