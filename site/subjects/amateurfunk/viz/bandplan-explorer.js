// Bandplan-Explorer 2 m und 70 cm (IARU Region 1: VHF Bandplan Dezember 2020, VHF Handbook 10.02): Frequenz einstellen → Segment, Betriebsart, Hinweise.
// Die Bandpläne sind Empfehlungen, keine Vorschriften. params: { goals?: [...] }
import { h, s } from '../../../assets/js/vizkit/base.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';

// [von, bis (MHz), Kurzname, Beschreibung, Farbe, Typ]
const B2 = [
  [144.000, 144.025, 'Sat', 'alle Betriebsarten; Satelliten-Downlink', '#e1d8f0', 'sat'],
  [144.025, 144.100, 'CW', 'Telegrafie (CW); 144,050 Telegrafie-Anruffrequenz', '#f3d4d4', 'cw'],
  [144.100, 144.150, 'CW/MGM', 'Telegrafie und schmalbandige digitale Betriebsarten (MGM); 144,110–144,160 EME', '#f3d4d4', 'cw'],
  [144.150, 144.400, 'SSB', 'SSB, Telegrafie, MGM (≤ 2,7 kHz); 144,195–144,205 Meteorscatter; 144,300 SSB-Aktivitätszentrum', '#f6e6c6', 'ssb'],
  [144.400, 144.490, 'Baken', 'Baken exklusiv (500 Hz)', '#f7d9a8', 'bake'],
  [144.490, 144.500, 'Exp.', 'experimentelle MGM / Baken (144,491–144,493)', '#f7d9a8', 'bake'],
  [144.500, 144.794, 'Alle', 'alle Betriebsarten (20 kHz); 144,500 Bildübertragung (SSTV), 144,600 Daten (RTTY, MGM), 144,750 ATV-Talkback', '#d6ebe0', 'all'],
  [144.794, 144.975, 'Digital', 'MGM/digitale Kommunikation (12 kHz); 144,800 APRS; DV-Internet-Gateways 144,8125 … 144,8625', '#cfe3f5', 'digi'],
  [144.975, 145.194, 'Relais-Eingabe', 'FM/Digital Voice: Repeater-Eingabe (exklusiv)', '#e8c9ef', 'rep'],
  [145.194, 145.206, 'Raumfunk', 'Weltraumkommunikation', '#e1d8f0', 'sat'],
  [145.206, 145.5625, 'FM/DV', 'FM und Digital Voice, Direktverkehr (12 kHz); 145,375 DV-Anruf; 145,500 FM-Anruf', '#d9f0d0', 'fm'],
  [145.5625, 145.575, 'Rand', 'Schutzabstand zwischen Simplex und Relais-Ausgabe', '#f0f0f0', 'none'],
  [145.575, 145.794, 'Relais-Ausgabe', 'FM/Digital Voice: Repeater-Ausgabe (exklusiv)', '#e8c9ef', 'rep'],
  [145.794, 145.806, 'Raumfunk', 'Weltraumkommunikation (145,800)', '#e1d8f0', 'sat'],
  [145.806, 146.000, 'Sat', 'Satelliten exklusiv, alle Betriebsarten', '#e1d8f0', 'sat'],
];
const B70 = [
  [430.000, 431.975, 'national', 'national festgelegt (u. a. Relais-Ausgaben, digitale Verbindungen und Relais-Eingaben mit 7,6 MHz Ablage)', '#e8c9ef', 'rep'],
  [431.975, 432.000, 'Rand', 'Schutzabstand', '#f0f0f0', 'none'],
  [432.000, 432.400, 'Schmalband', 'alle Betriebsarten ≤ 2,7 kHz; 432,050 CW-Aktivitätszentrum; 432,200 SSB-Aktivitätszentrum', '#f6e6c6', 'ssb'],
  [432.400, 432.490, 'Baken', 'Telegrafie/MGM, Baken exklusiv', '#f7d9a8', 'bake'],
  [432.490, 432.500, 'Exp.', 'experimentelle MGM (432,491–432,493)', '#f7d9a8', 'bake'],
  [432.500, 432.975, 'Alle', 'alle Betriebsarten; 432,500 APRS; 432,600–432,9875 Relais-Eingabe (25 kHz, 2 MHz Ablage)', '#d6ebe0', 'all'],
  [432.975, 433.000, 'Rand', 'Schutzabstand', '#f0f0f0', 'none'],
  [433.000, 433.400, 'FM-Relais', 'FM/Digital Voice, Relais-Eingabe (12,5 kHz, 1,6 MHz Ablage)', '#e8c9ef', 'rep'],
  [433.400, 433.600, 'FM/DV', 'FM/Digital Voice, Simplexkanäle; 433,400 SSTV; 433,450 DV-Anruf; 433,500 FM-Anruf', '#d9f0d0', 'fm'],
  [433.600, 433.800, 'Digital', 'digitale Kommunikation (433,625–433,775)', '#cfe3f5', 'digi'],
  [433.800, 434.600, 'Alle/ATV', 'alle Betriebsarten, ATV; 434,450–434,575 digital (Ausnahme)', '#d6ebe0', 'all'],
  [434.600, 435.000, 'Relais-Ausgabe', 'Repeater-Ausgabe (12,5 kHz, 1,6 oder 2,0 MHz Ablage)', '#e8c9ef', 'rep'],
  [435.000, 438.000, 'Satellit', 'Satellitenfunk (436–438 MHz auch DATV/Daten)', '#e1d8f0', 'sat'],
  [438.000, 438.650, 'Digital/Multi', 'digitale Kanäle, digitale Relais, Mehrbetriebsarten', '#cfe3f5', 'digi'],
  [438.650, 439.600, 'Relais-Ausgabe', 'Repeater-Ausgabe (12,5 kHz, 7,6 MHz Ablage)', '#e8c9ef', 'rep'],
  [439.600, 439.800, 'Rand', 'nicht belegt', '#f0f0f0', 'none'],
  [439.800, 440.000, 'Links', 'digitale Verbindungskanäle (Links)', '#cfe3f5', 'digi'],
];
const PLANS = { '2m': { name: '2 m', lo: 144, hi: 146, seg: B2, start: 144.8, step: 0.0005 }, '70cm': { name: '70 cm', lo: 430, hi: 440, seg: B70, start: 435.2, step: 0.0025 } };
const fm = f => f.toFixed(4).replace(/0+$/, '').replace(/\.$/, '').replace('.', ',').replace(/(,\d{3})$/, '$1');

export default function mount(stage, { params = {}, complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  let plan = PLANS['2m'];
  const ui = controls(root, [
    { id: 'band', type: 'seg', label: 'Band', options: [['2m', '2 m (144–146 MHz)'], ['70cm', '70 cm (430–440 MHz)']], value: '2m' },
    { id: 'f', label: 'Frequenz', min: 144, max: 146, step: 0.0005, value: 144.8, format: v => fm(v) + ' MHz', wide: true },
  ], (v, id) => {
    if (v.band !== curBand) { curBand = v.band; plan = PLANS[v.band]; ui.setRange('f', { min: plan.lo, max: plan.hi, step: plan.step }); ui.set({ f: pending ?? plan.start }, { silent: true }); pending = null; }
    draw();
  });
  let pending = null;
  const presetRow = h('div', { class: 'vz-seg vk-presets', style: 'margin:6px 0' });
  for (const [label, band, f] of [['FM 145,500', '2m', 145.5], ['DV 145,375', '2m', 145.375], ['SSB 144,300', '2m', 144.3], ['FM 433,500', '70cm', 433.5], ['SSB 432,200', '70cm', 432.2]]) {
    presetRow.append(h('button', { type: 'button', text: label, onclick: () => { if (ui.values.band === band) ui.set({ f }, { force: true }); else { pending = f; ui.set({ band }); } } }));
  }
  root.append(presetRow);
  let curBand = '2m';
  const svg = s('svg', { viewBox: '0 0 360 96', class: 'vz-svg', role: 'img', 'aria-label': 'Bandplan-Leiste', style: 'width:100%;background:#fff;border:1px solid var(--line);border-radius:10px;margin-top:8px;touch-action:manipulation;cursor:pointer' });
  root.append(svg);
  const card = h('div', { class: 'vz-stat', style: 'display:block;padding:12px 14px;margin:8px 0;line-height:1.55' }); root.append(card);
  const seen = new Set();
  const need = params.goals ?? ['fm', 'ssb', 'bake', 'rep', 'sat', '70'];
  const g = goals(root, [
    { id: 'fm', label: '145,500 MHz: FM-Anruffrequenz finden' }, { id: 'ssb', label: '144,300 MHz: SSB-Aktivitätszentrum' }, { id: 'bake', label: 'ein Bakensegment finden (2 m)' },
    { id: 'rep', label: 'ein Relais-Ausgabesegment finden' }, { id: 'sat', label: '145,8 MHz: Weltraumkommunikation' }, { id: '70', label: '433,500 MHz: FM-Anruf auf 70 cm' },
  ].filter(x => need.includes(x.id)), () => complete?.());
  const X = f => 10 + 340 * (f - plan.lo) / (plan.hi - plan.lo);
  function find(f) { return plan.seg.find(r => f >= r[0] - 1e-9 && f <= r[1] + 1e-9) || null; }
  svg.addEventListener('pointerdown', e => { const r = svg.getBoundingClientRect(), x = (e.clientX - r.left) / r.width * 360; const f = plan.lo + (x - 10) / 340 * (plan.hi - plan.lo); const q = Math.round(Math.max(plan.lo, Math.min(plan.hi, f)) / plan.step) * plan.step; ui.set({ f: +q.toFixed(4) }, { force: true }); });
  function draw() {
    const f = ui.values.f; svg.replaceChildren();
    for (const r of plan.seg) {
      const a = X(r[0]), b = X(r[1]); svg.append(s('rect', { x: a, y: 22, width: Math.max(0.5, b - a), height: 30, fill: r[4], stroke: '#fff', 'stroke-width': 0.5 }));
      if (b - a > 26) svg.append(s('text', { x: (a + b) / 2, y: 41, 'text-anchor': 'middle', 'font-size': 7, fill: 'var(--ink)' }, r[2]));
    }
    const ticks = plan.hi - plan.lo > 5 ? [430, 432, 434, 436, 438, 440] : [144, 144.5, 145, 145.5, 146];
    for (const t of ticks) svg.append(s('line', { x1: X(t), x2: X(t), y1: 52, y2: 57, stroke: 'var(--ink-2)' }), s('text', { x: X(t), y: 67, 'text-anchor': t === plan.lo ? 'start' : t === plan.hi ? 'end' : 'middle', 'font-size': 8, fill: 'var(--muted)' }, String(t).replace('.', ',')));
    const cx = X(f); svg.append(s('line', { x1: cx, x2: cx, y1: 14, y2: 56, stroke: 'var(--bad)', 'stroke-width': 2 }), s('circle', { cx, cy: 14, r: 3.5, fill: 'var(--bad)' }));
    for (const m of plan === PLANS['2m'] ? [144.05, 144.3, 145.375, 145.5] : [432.2, 433.45, 433.5]) svg.append(s('path', { d: `M${X(m) - 3} 80 L${X(m)} 74 L${X(m) + 3} 80Z`, fill: 'var(--accent)' }));
    svg.append(s('text', { x: 10, y: 92, 'font-size': 7.5, fill: 'var(--accent)' }, '▲ = Anruffrequenz bzw. Aktivitätszentrum'));
    const r = find(f);
    const near = (a) => Math.abs(f - a) < plan.step / 2 + 1e-9;
    let spec = '';
    if (near(145.5)) spec = '<b>FM-Anruffrequenz</b> (2 m): allgemeiner Anruf mit analoger FM-Telefonie.'; else if (near(145.375)) spec = '<b>Anruffrequenz für digitale Telefonie</b> (Digital Voice) auf 2 m.';
    else if (near(144.3)) spec = '<b>SSB-Aktivitätszentrum</b> (center of activity): nicht für Anrufe freihalten, Anrufe auch im Umfeld.'; else if (near(433.5)) spec = '<b>FM-Anruffrequenz</b> auf 70 cm.'; else if (near(433.45)) spec = '<b>Anruffrequenz für digitale Telefonie</b> auf 70 cm.'; else if (near(432.2)) spec = '<b>SSB-Aktivitätszentrum</b> auf 70 cm.';
    card.innerHTML = r ? `<div style="font:700 1.15rem var(--mono)">${fm(f)} MHz</div><div><b style="color:var(--accent)">${r[2]}</b> — ${r[3]}</div>${spec ? `<div style="margin-top:4px">${spec}</div>` : ''}<div style="margin-top:6px;color:var(--ink-2);font-size:.9rem">${r[5] === 'none' ? 'Schutzabstand: nicht für Verbindungen vorgesehen.' : ['cw', 'bake', 'rep', 'sat'].includes(r[5]) ? 'Reserviert für diese Anwendung — hier führst du <b>keine</b> FM-Direktverbindung mit dem Nachbarort.' : r[5] === 'fm' ? 'Hier ist Platz für FM-/Digital-Voice-Direktverbindungen (Simplex).' : ''}</div>` : '';
    if (plan === PLANS['2m']) { if (near(145.5)) g.reach('fm'); if (near(144.3)) g.reach('ssb'); if (r && r[5] === 'bake' && f < 144.495) g.reach('bake'); if (r && r[5] === 'rep' && f > 145.5) g.reach('rep'); if (f >= 145.79 && f <= 145.81) g.reach('sat'); }
    else if (near(433.5)) g.reach('70');
  }
  draw();
}
