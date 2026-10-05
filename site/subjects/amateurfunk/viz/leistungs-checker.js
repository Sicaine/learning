// Leistungs-Checker: Klasse, Band, Senderausgangsleistung (PEP) und Antennengewinn → zulässig? ERP/EIRP-Umrechnung (G_i = G_d + 2,15 dB).
// Grenzen: AFuV Anlage 1 (Stand 27.05.2024). Klasse A/E: Senderausgangsleistung in W PEP; Klasse N: Strahlungsleistung (ERP) — der Antennengewinn zählt nur hier.
// params: { goals?: ['e2m','e-over','n-over','n-ok'] }
import { h } from '../../../assets/js/vizkit/base.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';

// Grenzen je Band: A/E in W PEP, N in W ERP (null = nicht erlaubt)
const LIM = {
  '160 m': { A: 750, E: 100, N: null, rng: '1810–1850 kHz' }, '80 m': { A: 750, E: 100, N: null, rng: '3500–3800 kHz' }, '15 m': { A: 750, E: 100, N: null, rng: '21–21,45 MHz' },
  '10 m': { A: 750, E: 100, N: 10, rng: '28–29,7 MHz' }, '2 m': { A: 750, E: 75, N: 6.1, rng: '144–146 MHz' }, '70 cm': { A: 750, E: 75, N: 6.1, rng: '430–440 MHz' }, '13 cm': { A: 75, E: 5, N: null, rng: '2320–2450 MHz' },
};
const fw = x => (+x.toPrecision(3)).toString().replace('.', ',');
export default function mount(stage, { params = {}, complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const ui = controls(root, [
    { id: 'cls', type: 'seg', label: 'Zulassungsklasse', options: [['N', 'N'], ['E', 'E'], ['A', 'A']], value: 'E' },
    { id: 'band', type: 'seg', label: 'Band', options: Object.keys(LIM).map(b => [b, b]), value: '2 m' },
    { id: 'p', label: 'Senderausgangsleistung', unit: 'W', min: 0.5, max: 1000, value: 50, scale: 'log', values: [0.5, 1, 2, 3, 5, 7.5, 10, 20, 25, 40, 50, 60, 75, 80, 100, 120, 150, 200, 300, 500, 750, 1000] },
    { id: 'ref', type: 'seg', label: 'Gewinn bezogen auf', options: [['dBd', 'Halbwellendipol (dBd)'], ['dBi', 'Kugelstrahler (dBi)']], value: 'dBd' },
    { id: 'g', label: 'Antennengewinn', min: -3, max: 20, value: 0, step: 0.1, format: v => (v >= 0 ? '+' : '−') + Math.abs(v).toFixed(1).replace('.', ',') + ' dB' },
  ], draw);
  const card = h('div', { class: 'vz-stat', style: 'display:block;padding:14px 16px;margin:10px 0;line-height:1.6;font-size:1rem' }); root.append(card);
  const out = readout(root, [{ id: 'erp', label: 'ERP', hl: true }, { id: 'eirp', label: 'EIRP' }, { id: 'gf', label: 'Gewinnfaktor (Dipol)' }]);
  const need = params.goals ?? ['e2m', 'e-over', 'n-over', 'n-ok'];
  const g = goals(root, [
    { id: 'e2m', label: 'Klasse E, 2 m: genau die Grenze 75 W einstellen' }, { id: 'e-over', label: 'Klasse E, 80 m: 150 W → unzulässig' },
    { id: 'n-over', label: 'Klasse N, 2 m, 5 W, +4 dBi (Faktor 2,5): zu viel' }, { id: 'n-ok', label: 'Klasse N, 2 m, 5 W, +2,6 dBi (Faktor 1,8): erlaubt' },
  ].filter(x => need.includes(x.id)), () => complete?.());
  function draw() {
    const { cls, band, p, ref, g: gain } = ui.values, L = LIM[band], lim = L[cls];
    const gd = ref === 'dBd' ? gain : gain - 2.15, gi = gd + 2.15, Gd = 10 ** (gd / 10), Gi = 10 ** (gi / 10);
    const erp = p * Gd, eirp = p * Gi;
    out.set({ erp: fw(erp) + ' W', eirp: fw(eirp) + ' W', gf: fw(Gd) });
    let verdict, ok;
    if (lim == null) { ok = false; verdict = `Das ${band}-Band (${L.rng}) ist für Klasse ${cls} <b>nicht freigegeben</b>.`; }
    else if (cls === 'N') { ok = erp <= lim + 1e-9; verdict = `Klasse N: Grenze <b>${fw(lim)} W ERP</b>${band === '2 m' || band === '70 cm' ? ' (das entspricht 10 W EIRP)' : ''}. Hier zählt die <b>Strahlungsleistung</b>: ${fw(p)} W · ${fw(Gd)} = <b>${fw(erp)} W ERP</b> → ${ok ? '<b style="color:var(--good)">zulässig</b>' : '<b style="color:var(--bad)">zu viel</b>'}.`; }
    else { ok = p <= lim + 1e-9; verdict = `Klasse ${cls}: Grenze <b>${lim} W PEP</b> am <b>Senderausgang</b> (${L.rng}). Deine ${fw(p)} W PEP → ${ok ? '<b style="color:var(--good)">zulässig</b>' : '<b style="color:var(--bad)">zu viel</b>'}. Der Antennengewinn spielt für diese Grenze keine Rolle (Strahlungsleistung: ${fw(erp)} W ERP — Personenschutz kommt später).`; }
    card.style.borderLeft = `5px solid var(--${ok ? 'good' : 'bad'})`; card.innerHTML = verdict;
    const near = (a, b, t) => Math.abs(a - b) <= t;
    if (cls === 'E' && band === '2 m' && near(p, 75, 0.01)) g.reach('e2m');
    if (cls === 'E' && band === '80 m' && near(p, 150, 0.01) && !ok) g.reach('e-over');
    if (cls === 'N' && band === '2 m' && near(p, 5, 0.01) && ref === 'dBi' && near(gain, 4, 0.15) && !ok) g.reach('n-over');
    if (cls === 'N' && band === '2 m' && near(p, 5, 0.01) && ref === 'dBi' && near(gain, 2.6, 0.15) && ok) g.reach('n-ok');
  }
  draw();
}
