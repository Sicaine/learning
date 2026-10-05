// EMV-Labor (L54): Störquelle → Kopplungsweg → Störsenke (qualitatives Modell mit relativen Pegeln, keine Messwerte).
// Szene: Kurzwellensender (Oberwelle fällt in ein UKW-/Fernseh-Band) – Antennenkabel – Fernseher/Radio.
// Pegelannahmen (dBµV, relativ): Oberwelle −30 dBc unter der Grundwelle; Strahlungsweg ∝ 1/d; Mantelwelle läuft auf dem Kabel und hängt nicht vom Abstand ab.
//   Tiefpass am Sender −40 dB (nur Oberwelle), Schirmung −25 dB (Strahlungsweg), Ferrit/Mantelwellendrossel −25 dB (Gleichtakt auf dem Kabel).
// params: { threshold?: 25 (dBµV) }
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { h, s } from '../../../assets/js/vizkit/base.js';

const FUND = 90, DBC = -30, CM0 = 55 + 5;   // dBµV @ 1 m; Gleichtaktanteil bei der Oberwelle
const dB = x => (Math.round(x * 10) / 10).toString().replace('.', ',');

export default function mount(stage, { params = {}, complete }) {
  const THR = params.threshold ?? 25;
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const box = h('div', { class: 'vk-plot' });
  const svg = s('svg', { viewBox: '0 0 640 300', role: 'img', 'aria-label': 'Sender, Kabel und gestörtes Gerät' });
  box.append(svg); root.append(box);
  const ui = controls(root, [
    { id: 'd', label: 'Abstand Antenne – Gerät d', unit: 'm', min: 1, max: 32, values: [1, 2, 4, 8, 16, 32], value: 4, digits: 3 },
    { id: 'shield', type: 'toggle', label: 'Schirmung (Metallgehäuse/Schirmgeflecht)', value: false },
    { id: 'ferrite', type: 'toggle', label: 'Ferrit / Mantelwellendrossel am Kabel', value: false },
    { id: 'lp', type: 'toggle', label: 'Tiefpass am Senderausgang', value: false },
  ], run);
  const out = readout(root, [
    { id: 'tot', label: 'Störpegel am Gerät', hl: true }, { id: 'cm', label: 'Gleichtakt (Mantelwelle) Anteil' }, { id: 'n', label: 'Maßnahmen' },
  ]);
  const note = h('div', { class: 'vz-note', 'aria-live': 'polite', style: 'font-size:.95rem;color:var(--ink)' }); root.append(note);
  const g = goals(root, [
    { id: 'cm', label: 'Ohne Maßnahmen: Mantelwelle ist der Hauptweg (> 90 %)' },
    { id: 'dist', label: 'Abstand verdoppeln (2 m → 4 m): Strahlung −6 dB' },
    { id: 'win', label: `Unter ${THR} dBµV mit höchstens einer Maßnahme` },
  ], () => complete?.());
  const rad = {};   // Strahlungspegel je (Maßnahmen, Abstand)

  function levels(v) {
    const S = FUND + DBC - 20 * Math.log10(v.d) - (v.lp ? 40 : 0) - (v.shield ? 25 : 0);
    const M = CM0 - (v.lp ? 40 : 0) - (v.ferrite ? 25 : 0);
    const P = x => 10 ** (x / 10), tot = 10 * Math.log10(P(S) + P(M));
    return { S, M, tot, cm: P(M) / (P(S) + P(M)) };
  }
  function draw(v, L) {
    const bad = L.tot > THR;
    let f = `<text x="20" y="22" font-size="16" font-weight="700" fill="var(--ink-2)">Störquelle</text><text x="270" y="22" font-size="16" font-weight="700" fill="var(--ink-2)">Kopplungswege</text><text x="520" y="22" font-size="16" font-weight="700" fill="var(--ink-2)">Störsenke</text>`;
    // Sender
    f += `<rect x="20" y="150" width="90" height="70" rx="8" fill="var(--surface)" stroke="var(--ink-2)" stroke-width="2"/><text x="65" y="180" font-size="15" font-weight="700" text-anchor="middle" fill="var(--ink)">KW-Sender</text><text x="65" y="198" font-size="14" text-anchor="middle">+ Oberwelle</text>`;
    if (v.lp) f += `<rect x="112" y="170" width="34" height="30" rx="4" fill="var(--good-soft)" stroke="var(--good)" stroke-width="2"/><text x="129" y="190" font-size="15" font-weight="700" text-anchor="middle" fill="var(--good)">TP</text>`;
    // Antenne
    f += `<line x1="170" y1="185" x2="170" y2="60" stroke="var(--ink-2)" stroke-width="3"/><line x1="146" y1="80" x2="194" y2="80" stroke="var(--ink-2)" stroke-width="3"/><line x1="146" y1="185" x2="170" y2="185" stroke="var(--ink-2)" stroke-width="2"/>`;
    // Strahlung (Wellen)
    const rw = Math.max(0.18, Math.min(1, 1 - Math.log10(v.d) / 1.6));
    for (let k = 0; k < 4; k++) f += `<path d="M${200 + k * 34} ${100 - k * 4} q${14 + k * 2} 40 0 ${80 + k * 8}" fill="none" stroke="${v.shield ? 'var(--muted)' : 'var(--bad)'}" stroke-width="2.4" opacity="${(rw * (1 - k * 0.2)).toFixed(2)}"/>`;
    f += `<text x="250" y="222" font-size="15" text-anchor="middle" fill="var(--muted)">Strahlung (∝ 1/d)</text>`;
    if (v.shield) f += `<rect x="486" y="84" width="140" height="160" rx="14" fill="none" stroke="var(--good)" stroke-width="3" stroke-dasharray="8 5"/><text x="556" y="262" font-size="15" text-anchor="middle" fill="var(--good)">Schirm</text>`;
    // Kabel
    f += `<path d="M110 205 C 220 270 380 270 500 205" fill="none" stroke="var(--ink-2)" stroke-width="4"/>`;
    f += `<path d="M110 211 C 220 276 380 276 500 211" fill="none" stroke="var(--warn)" stroke-width="2.6" stroke-dasharray="3 7" opacity=".9"/>`;
    f += `<text x="305" y="292" font-size="15" text-anchor="middle" fill="var(--muted)">Kabel: Mantelwelle (Gleichtakt) fließt außen</text>`;
    if (v.ferrite) f += `<rect x="410" y="244" width="28" height="30" rx="5" fill="var(--ink-2)"/><text x="424" y="236" font-size="14" text-anchor="middle" fill="var(--ink-2)">Ferrit</text>`;
    // Fernseher
    f += `<rect x="500" y="110" width="110" height="90" rx="8" fill="${bad ? 'var(--bad-soft)' : 'var(--good-soft)'}" stroke="${bad ? 'var(--bad)' : 'var(--good)'}" stroke-width="3"/>
      <text x="555" y="150" font-size="15" font-weight="700" text-anchor="middle" fill="var(--ink)">Fernseher / Radio</text><text x="555" y="172" font-size="17" font-weight="700" text-anchor="middle" fill="${bad ? 'var(--bad)' : 'var(--good)'}">${dB(L.tot)} dBµV</text>
      <text x="555" y="190" font-size="15" text-anchor="middle" fill="${bad ? 'var(--bad)' : 'var(--good)'}">${bad ? 'gestört' : 'ungestört'}</text>`;
    // Abstandsbalken
    f += `<line x1="170" y1="52" x2="500" y2="52" stroke="var(--line-2)"/><text x="335" y="46" font-size="15" text-anchor="middle">Abstand d = ${dB(v.d)} m</text>`;
    // Pegel-Balken
    const bx = 20, by = 232, bw = 220;
    svg.innerHTML = f;
    void bx; void by; void bw;
  }
  function run() {
    const v = ui.values, L = levels(v), n = (v.shield ? 1 : 0) + (v.ferrite ? 1 : 0) + (v.lp ? 1 : 0);
    draw(v, L);
    out.set({ tot: dB(L.tot) + ' dBµV', cm: Math.round(L.cm * 100) + ' %', n: n });
    note.innerHTML = `<b>Strahlung ${dB(L.S)} dBµV</b> · <b>Mantelwelle ${dB(L.M)} dBµV</b> · Schwelle ${THR} dBµV. ` +
      (L.tot > THR ? (L.cm > 0.5 ? 'Der Hauptweg ist die Mantelwelle auf dem Kabel: Abstand und Schirmung des Geräts helfen kaum.' : 'Jetzt dominiert die Strahlung: Abstand oder Schirmung wirken.') : 'Unter der Schwelle – Störung beseitigt.');
    // Ziele
    if (n === 0 && v.d >= 2 && L.cm > 0.9) g.reach('cm');
    const key = (v.shield ? 's' : '') + (v.ferrite ? 'f' : '') + (v.lp ? 'l' : '');
    rad[key + '@' + Math.round(v.d * 10)] = L.S;
    const a = rad[key + '@20'], b = rad[key + '@40'];
    if (a != null && b != null && Math.abs((b - a) + 6.02) < 0.15) g.reach('dist');
    if (L.tot < THR && n <= 1) g.reach('win');
  }
  run();
}
