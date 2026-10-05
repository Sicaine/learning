// Dummy-Load-Simulator: Sender an Antenne, verstimmter Antenne, künstlicher Antenne oder gar nichts. Wohin geht die Leistung?
// Reflexionsfaktor Γ = (SWR − 1)/(SWR + 1), reflektierte Leistung = Γ² · Pvor. Vereinfachtes Modell (Verluste im Kabel vernachlässigt).
// params: { }
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { h, s, txt, line, rect, dec } from './_funk.js';

const LOADS = { ant: ['Antenne (angepasst)', 1.2], bad: ['Antenne (verstimmt, SWR 3)', 3], dummy: ['Dummy Load', 1.0], open: ['Nichts angeschlossen', Infinity] };

export default function mount(stage, { complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const svg = s('svg', { class: 'vz-svg', viewBox: '0 0 640 220', role: 'img', 'aria-label': 'Sender, Koaxkabel und Last mit Leistungsflüssen' }); root.append(svg);
  const ui = controls(root, [
    { id: 'load', type: 'seg', label: 'Am Antennenanschluss hängt …', options: Object.entries(LOADS).map(([k, v]) => [k, v[0]]), value: 'dummy' },
    { id: 'p', label: 'Sendeleistung', min: 5, max: 100, step: 5, value: 50, format: v => v + ' W', digits: 0 },
    { id: 'ptt', type: 'toggle', label: 'Senden (PTT gedrückt)', value: false },
  ], run);
  const out = readout(root, [{ id: 'f', label: 'vorlaufend' }, { id: 'r', label: 'reflektiert', hl: true }, { id: 'rad', label: 'abgestrahlt', hl: true }, { id: 'heat', label: 'Wärme in der Last' }]);
  const note = h('div', { class: 'vz-note', style: 'line-height:1.55;margin:6px 0;min-height:3.2em' }); root.append(note);
  const g = goals(root, [
    { id: 'dummy', label: 'Mit Dummy Load senden: nichts wird abgestrahlt' },
    { id: 'open', label: 'Ohne Last senden: Endstufe gefährdet' },
    { id: 'bad', label: 'Verstimmte Antenne: ein Viertel kommt zurück' },
  ], () => complete?.());

  function run(v, id) {
    const [lname, swr] = LOADS[v.load], gam = Number.isFinite(swr) ? (swr - 1) / (swr + 1) : 1;
    const Pf = v.ptt ? v.p : 0, Pr = Pf * gam * gam, Pabs = Pf - Pr;
    const rad = v.load === 'ant' || v.load === 'bad' ? Pabs : 0, heat = v.load === 'dummy' ? Pabs : 0;
    out.set({ f: dec(Pf, 0) + ' W', r: dec(Pr, 1) + ' W' + (Pf ? ' (' + dec(gam * gam * 100, 0) + ' %)' : ''), rad: dec(rad, 0) + ' W', heat: dec(heat, 0) + ' W' });
    const danger = Pf > 0 && gam * gam > 0.5;
    const th = Pf ? Math.max(2, Pf / 100 * 14) : 1;
    svg.replaceChildren(
      rect(0, 0, 640, 220, { fill: 'var(--surface-2)' }),
      rect(30, 70, 150, 90, { r: 10, fill: danger ? 'color-mix(in srgb,var(--bad) 22%,#fff)' : 'var(--surface)', stroke: danger ? 'var(--bad)' : 'var(--ink-2)', sw: 2 }),
      txt(105, 108, 'Transceiver', { anchor: 'middle', size: 18.8, fill: 'var(--ink)', bold: true }), txt(105, 128, 'Endstufe', { anchor: 'middle', size: 15.0, fill: danger ? 'var(--bad)' : 'var(--ink-2)' }),
      txt(105, 146, danger ? 'wird überlastet!' : Pf ? 'sendet' : 'Empfang', { anchor: 'middle', size: 15.0, fill: danger ? 'var(--bad)' : 'var(--muted)', bold: danger }),
      line(180, 100, 440, 100, { color: 'var(--ink-2)', w: 3 }), line(180, 130, 440, 130, { color: 'var(--ink-2)', w: 3 }), txt(310, 62, 'Koaxkabel', { anchor: 'middle', size: 15.0 }),
    );
    // Pfeile: vorlaufend (oben) und reflektiert (unten)
    const arrow = (x1, x2, y, w, col, lbl) => { if (w < 0.5) return; svg.append(line(x1, y, x2, y, { color: col, w }), s('polygon', { points: `${x2},${y} ${x2 - (x2 > x1 ? 12 : -12)},${y - 7} ${x2 - (x2 > x1 ? 12 : -12)},${y + 7}`, fill: col }), txt((x1 + x2) / 2, y + (y < 115 ? -10 - w / 2 : 22 + w / 2), lbl, { anchor: 'middle', size: 14.4, fill: col, bold: true })); };
    if (Pf) arrow(196, 428, 85, th, 'var(--accent)', dec(Pf, 0) + ' W hin');
    if (Pr > 0.4) arrow(428, 196, 145, Math.max(2, Pr / 100 * 14), 'var(--bad)', dec(Pr, 1) + ' W zurück');
    // Last
    const lx = 450;
    if (v.load === 'dummy') svg.append(rect(lx, 82, 100, 66, { r: 6, fill: 'color-mix(in srgb,var(--warn) ' + Math.min(70, 15 + heat * 0.7) + '%,#fff)', stroke: 'var(--ink-2)', sw: 2 }), txt(lx + 50, 120, 'Dummy Load', { anchor: 'middle', size: 16.2, fill: 'var(--ink)', bold: true }), txt(lx + 50, 168, heat ? 'Leistung → Wärme' : '50 Ω + Kühlkörper', { anchor: 'middle', size: 15.0, fill: heat ? 'var(--warn)' : 'var(--muted)', bold: !!heat }));
    else if (v.load === 'open') svg.append(txt(lx + 20, 120, '✕ offen', { size: 18.8, fill: 'var(--bad)', bold: true }), line(440, 100, 452, 100, { color: 'var(--bad)', w: 3 }), line(440, 130, 452, 130, { color: 'var(--bad)', w: 3 }));
    else { svg.append(line(lx + 20, 135, lx + 20, 70, { color: 'var(--ink)', w: 3 }), line(lx + 5, 80, lx + 35, 80, { color: 'var(--ink)', w: 3 }), line(lx + 8, 96, lx + 32, 96, { color: 'var(--ink)', w: 3 }), line(440, 100, lx + 20, 100, { color: 'var(--ink-2)', w: 3 }));
      if (rad > 0) for (let k = 1; k <= 3; k++) svg.append(s('path', { d: `M ${lx + 48 + k * 16} ${100 - k * 14} q ${10 + k * 4} ${14 + k * 14} 0 ${28 + k * 28}`, fill: 'none', stroke: 'var(--accent-2)', 'stroke-width': 2.5, opacity: 0.85 - k * 0.2 }));
      svg.append(txt(lx + 20, 168, rad ? 'strahlt ' + dec(rad, 0) + ' W ab' : lname.split(' (')[0], { anchor: 'middle', size: 15.0, fill: rad ? 'var(--accent-2)' : 'var(--muted)', bold: !!rad })); }
    note.innerHTML = !v.ptt ? 'Schalte „Senden“ ein und beobachte, wohin die Leistung geht.' : v.load === 'dummy' ? 'Aus Sicht des Senders ist die Dummy Load von einer gut angepassten Antenne nicht zu unterscheiden: Nichts wird reflektiert, die Leistung wird fast vollständig in Wärme umgesetzt, <b>nichts wird abgestrahlt</b>. Deshalb benutzt man sie beim Abgleich und bei Messungen.' : v.load === 'open' ? 'Ohne Last wird die <b>gesamte Sendeleistung am Antennenanschluss reflektiert</b> und kann die Endstufe beschädigen. Nie ohne angepasste Antenne oder Dummy Load senden.' : v.load === 'bad' ? 'Bei SWR 3 kommt ein Viertel der Leistung zurück (Γ² = 0,25). Die Endstufe wird belastet, ein Teil der Leistung geht verloren.' : 'Die Antenne ist gut angepasst: Fast alles wird abgestrahlt, und das ist genau, was beim Abgleich <b>nicht</b> passieren darf (Störungen anderer Funkverbindungen).';
    if (!id || !v.ptt) return;
    if (v.load === 'dummy' && rad === 0) g.reach('dummy');
    if (v.load === 'open') g.reach('open');
    if (v.load === 'bad') g.reach('bad');
  }
  run(ui.values);
}
