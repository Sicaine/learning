// Fehler-Labor (L53): Gerät der Schutzklasse I am 230-V-Netz mit Leitungsschutzschalter B16 und FI (RCD, 30 mA).
// Vereinfachtes Netzmodell (TN-System, alle Werte Annahmen zum Üben, keine Anlagenberechnung):
//   Schleifenimpedanz L–N 0,5 Ω; L→Gehäuse→PE→Erde ≈ 0,5 Ω + Fehlerwiderstand R_F; Person (Körper + Standort) 1,5 kΩ;
//   LS B16: magnetisch ab 3…5 × 16 A (48…80 A), thermisch ab etwa 16 A nach langer Zeit; FI: Auslösung bei 50…100 % von I_ΔN (30 mA).
// params: { fiMA?: 30 }
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { fmt } from '../../../assets/js/vizkit/si.js';
import { h, s } from '../../../assets/js/vizkit/base.js';

const UN = 230, ZLOOP = 0.5, RPE = 0.25, RP = 1500, PLOAD = 2000;

export default function mount(stage, { params = {}, complete }) {
  const FI = params.fiMA ?? 30;
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const box = h('div', { class: 'vk-plot' });
  const svg = s('svg', { viewBox: '0 0 640 330', role: 'img', 'aria-label': 'Hausinstallation mit Leitungsschutzschalter, FI und Gerät' });
  box.append(svg); root.append(box);
  const ui = controls(root, [
    { id: 'fault', type: 'seg', label: 'Fehlerart', options: [['none', 'kein Fehler'], ['iso', 'Isolationsfehler (L → Gehäuse)'], ['nope', 'Isolationsfehler + PE unterbrochen'], ['short', 'Kurzschluss L–N'], ['over', 'Überlast']], value: 'none' },
    { id: 'rf', label: 'Fehlerwiderstand R_F', unit: 'Ω', min: 1, max: 10000, scale: 'log', value: 100, digits: 3 },
    { id: 'fi', type: 'toggle', label: 'FI (30 mA) eingebaut', value: true },
    { id: 'touch', type: 'toggle', label: 'Person berührt das Gehäuse', value: false },
  ], run);
  const el = id => ui.el.querySelector(`[data-id="${id}"]`);
  const out = readout(root, [
    { id: 'if', label: 'Fehlerstrom', hl: true }, { id: 'id', label: 'Differenzstrom (sieht der FI)' }, { id: 'ik', label: 'Körperstrom' },
    { id: 'ug', label: 'Gehäusespannung gegen Erde', hl: true },
  ]);
  const verdict = h('div', { class: 'vz-note', 'aria-live': 'polite', style: 'font-size:.95rem;color:var(--ink)' }); root.append(verdict);
  const g = goals(root, [
    { id: 'open', label: 'PE unterbrochen, FI aus: Gehäuse liegt auf ≈ 230 V' },
    { id: 'fi', label: 'Isolationsfehler mit PE: der FI löst aus' },
    { id: 'ls', label: 'Kurzschluss: der LS-Schalter löst aus, der FI nicht' },
  ], () => complete?.());

  function model(v) {
    const m = { iF: 0, iD: 0, iK: 0, uG: 0, iTot: PLOAD / UN, touch: v.touch };
    if (v.fault === 'iso') {
      m.iF = UN / (v.rf + ZLOOP); m.uG = m.iF * RPE; m.iD = m.iF; m.iK = v.touch ? m.uG / RP : 0; m.iTot += m.iF;
    } else if (v.fault === 'nope') {
      if (v.touch) { m.iK = UN / (v.rf + RP); m.uG = m.iK * RP; m.iD = m.iK; m.iF = m.iK; } else { m.uG = UN; }
    } else if (v.fault === 'short') {
      m.iF = UN / ZLOOP; m.iTot = m.iF;
    } else if (v.fault === 'over') {
      m.iTot = 4600 / UN;
    }
    return m;
  }
  function verdictOf(m, v) {
    const fi = v.fi ? (m.iD >= FI * 1e-3 ? 'trip' : m.iD >= FI * 0.5e-3 ? 'maybe' : 'no') : 'off';
    const ls = m.iTot >= 80 ? 'mag' : m.iTot >= 48 ? 'maybe' : m.iTot > 16 ? 'therm' : 'no';
    return { fi, ls };
  }
  const brown = 'var(--warn)', blue = 'var(--accent)';
  function draw(m, v, r) {
    const trippedFI = r.fi === 'trip', trippedLS = r.ls === 'mag';
    const dead = trippedFI || trippedLS, danger = m.uG > 50;
    const wire = (y, c, dash) => `<line x1="20" x2="${dead ? 220 : 320}" y1="${y}" y2="${y}" stroke="${c}" stroke-width="5" ${dash || ''}/>`;
    let f = `<text x="20" y="22" font-size="16" font-weight="700" fill="var(--ink-2)">Netz 230 V</text>
      <text x="320" y="22" font-size="16" font-weight="700" fill="var(--ink-2)">Gerät, Schutzklasse I (2 kW)</text>`;
    f += `<text x="20" y="62" font-size="15">L</text><text x="20" y="102" font-size="15">N</text><text x="20" y="142" font-size="15">PE</text>`;
    f += wire(58, brown) + wire(98, blue);
    // PE (grün-gelb) – bis zum Gerät
    const peX2 = v.fault === 'nope' ? 262 : 320;
    f += `<line x1="38" x2="${peX2}" y1="138" y2="138" stroke="#7aa21a" stroke-width="5"/><line x1="38" x2="${peX2}" y1="138" y2="138" stroke="#e8d83a" stroke-width="5" stroke-dasharray="9 9"/>`;
    if (v.fault === 'nope') f += `<g stroke="var(--bad)" stroke-width="4"><line x1="272" y1="126" x2="292" y2="150"/><line x1="292" y1="126" x2="272" y2="150"/></g><text x="282" y="172" font-size="15" text-anchor="middle" fill="var(--bad)">PE unterbr.</text>`;
    // LS und FI
    const dev = (x, label, sub, tripped) => `<rect x="${x}" y="38" width="64" height="116" rx="8" fill="${tripped ? 'var(--bad-soft)' : 'var(--surface)'}" stroke="${tripped ? 'var(--bad)' : 'var(--ink-2)'}" stroke-width="2"/>
      <text x="${x + 32}" y="84" font-size="16" font-weight="700" text-anchor="middle" fill="var(--ink)">${label}</text><text x="${x + 32}" y="102" font-size="14" text-anchor="middle">${sub}</text>
      <text x="${x + 32}" y="126" font-size="15" font-weight="700" text-anchor="middle" fill="${tripped ? 'var(--bad)' : 'var(--good)'}">${tripped ? 'AUS' : 'EIN'}</text>`;
    f += dev(100, 'LS', 'B16', trippedLS) + (v.fi ? dev(190, 'FI', '30 mA', trippedFI) : `<text x="222" y="122" font-size="15" text-anchor="middle">(kein FI)</text>`);
    // Gerät/Gehäuse
    const gc = danger ? 'var(--bad-soft)' : m.uG > 5 ? 'var(--warn-soft, #fff4d6)' : 'var(--surface-2)';
    f += `<rect x="320" y="34" width="200" height="130" rx="12" fill="${gc}" stroke="${danger ? 'var(--bad)' : 'var(--ink-2)'}" stroke-width="${danger ? 4 : 2.4}"/>
      <text x="420" y="58" font-size="15" text-anchor="middle">Metallgehäuse</text>
      <rect x="360" y="70" width="120" height="44" rx="4" fill="var(--surface)" stroke="var(--ink-2)" stroke-width="1.6"/><text x="420" y="97" font-size="15" text-anchor="middle" fill="var(--ink)">Motor / Heizung</text>
      <line x1="420" x2="420" y1="114" y2="150" stroke="${blue}" stroke-width="0"/>`;
    f += `<text x="420" y="150" font-size="15" font-weight="700" text-anchor="middle" fill="${danger ? 'var(--bad)' : 'var(--ink-2)'}">Gehäuse: ${fmt(m.uG, 'V', 3)}</text>`;
    if (v.fault === 'iso' || v.fault === 'nope') f += `<polyline points="340,58 340,84 352,92 328,104 352,114 340,122 340,150" fill="none" stroke="var(--bad)" stroke-width="3"/><text x="330" y="186" font-size="15" fill="var(--bad)">Isolationsfehler</text>`;
    if (v.fault === 'short') f += `<line x1="400" x2="400" y1="58" y2="98" stroke="var(--bad)" stroke-width="5"/><text x="404" y="84" font-size="15" fill="var(--bad)">⚡ Kurzschluss</text>`;
    // Erde
    f += `<line x1="38" x2="38" y1="138" y2="250" stroke="#7aa21a" stroke-width="4"/><line x1="22" x2="54" y1="250" y2="250" stroke="var(--ink-2)" stroke-width="3"/><line x1="28" x2="48" y1="257" y2="257" stroke="var(--ink-2)" stroke-width="3"/><line x1="34" x2="42" y1="264" y2="264" stroke="var(--ink-2)" stroke-width="3"/><text x="62" y="262" font-size="15">Erde</text>`;
    // Person
    if (v.touch) {
      const pc = m.iK > 0.01 && !dead ? 'var(--bad)' : 'var(--ink-2)';
      f += `<circle cx="580" cy="190" r="12" fill="var(--surface)" stroke="${pc}" stroke-width="3"/><path d="M580 202 V252 M580 214 L524 150 M580 252 L566 300 M580 252 L596 300" fill="none" stroke="${pc}" stroke-width="5" stroke-linecap="round"/>
        <text x="560" y="186" font-size="15" text-anchor="end">Person</text>`;
      f += `<path d="M566 300 L40 300 L40 264" fill="none" stroke="var(--line-2)" stroke-width="2" stroke-dasharray="4 4"/><text x="300" y="316" font-size="15" text-anchor="middle">über Boden zur Erde (Körper + Standort ≈ 1,5 kΩ)</text>`;
    }
    svg.innerHTML = f;
  }
  function run() {
    const v = ui.values, m = model(v), r = verdictOf(m, v);
    el('rf').style.display = v.fault === 'iso' || v.fault === 'nope' ? '' : 'none';
    out.set({ if: m.iF > 0 ? fmt(m.iF, 'A', 3) : '–', id: m.iD > 0 ? fmt(m.iD, 'A', 3) : '0 A', ik: v.touch ? fmt(m.iK, 'A', 3) : '–', ug: fmt(m.uG, 'V', 3) });
    draw(m, v, r);
    const parts = [];
    if (r.fi === 'trip') parts.push('Der FI löst aus (Differenzstrom über seiner Bemessung, in der Praxis nach 20–30 ms): Gerät und Körperstrom sind sofort weg.');
    else if (r.fi === 'maybe') parts.push('Differenzstrom im Grenzbereich 50…100 % von I_ΔN: der FI kann auslösen, muss aber nicht.');
    else if (v.fi && m.iD > 0) parts.push('Der Differenzstrom ist zu klein für den FI.');
    else if (!v.fi && v.fault !== 'none') parts.push('Ohne FI wird nur der Leitungsschutzschalter überwacht.');
    if (r.ls === 'mag') parts.push(`Der LS-Schalter löst magnetisch aus (${fmt(m.iTot, 'A', 3)} ≫ 5 · 16 A).`);
    else if (r.ls === 'maybe') parts.push('Der Strom liegt im Streubereich der B-Charakteristik (3…5 · I_N): LS löst schnell aus – oder erst später.');
    else if (r.ls === 'therm') parts.push(`Strom ${fmt(m.iTot, 'A', 3)} über 16 A: der LS-Schalter löst erst thermisch aus, nach Sekunden bis Minuten.`);
    if (m.uG > 50 && !(r.fi === 'trip' || r.ls === 'mag')) parts.push('Gefahr: Das Gehäuse bleibt dauerhaft über 50 V gegen Erde – wer es anfasst und Erdkontakt hat, wird durchströmt.');
    if (v.fault === 'iso' && m.uG < 5 && r.fi !== 'trip') parts.push('Mit intaktem Schutzleiter bleibt das Gehäuse trotz Fehler nahe Erdpotential.');
    if (v.fault === 'none') parts.push('Alles in Ordnung: Der Betriebsstrom von 8,7 A fließt im Hin- und Rückleiter, der Differenzstrom ist null.');
    verdict.textContent = parts.join(' ');
    if (v.fault === 'nope' && !v.fi && !v.touch && m.uG >= 225) g.reach('open');
    if (v.fault === 'iso' && v.fi && r.fi === 'trip') g.reach('fi');
    if (v.fault === 'short' && r.ls === 'mag' && !(r.fi === 'trip')) g.reach('ls');
  }
  run();
}
