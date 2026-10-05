// Erdungs-Schema: Antennenanlage am Haus mit Haupterdungsschiene. Sechs Punkte antippen, je eine Frage beantworten.
// Fakten: DARC 50ohm.de (CC BY 4.0, Abschnitte Schutzerdung/Potentialausgleich, Blitzerdung, Blitzschutz), Fragenkatalog 3. Aufl. (EK208–EK211, VE603, VE604); VDE 0855-300, VDE 0185-305.
// params: { need?: 6 }
import { h, s } from '../../../assets/js/vizkit/base.js';
import { goals } from '../../../assets/js/vizkit/controls.js';

const SPOTS = [
  { id: 'standrohr', n: 1, x: 318, y: 66, name: 'Antennenstandrohr',
    q: 'Das Standrohr der Antenne steht auf einem Gebäude, das ein Blitzschutzsystem hat. Wann darfst du es damit verbinden?',
    o: [['Wenn eine Blitzschutz-Fachkraft die Verbindung in ihrem Blitzschutzkonzept vorsieht.', 1], ['Immer: Es muss in jedem Fall verbunden werden.', 0], ['Nie: Es ist immer ein getrenntes System aufzubauen.', 0], ['Sobald du einen Kupferleiter mit großem Querschnitt verwendest.', 0]],
    why: 'Eine Änderung am Blitzschutzsystem ist Sache der Fachleute; die Verbindung muss im Blitzschutzkonzept vorgesehen sein (VDE 0185-305 gilt für Gebäude mit Blitzschutzsystem).' },
  { id: 'leitung', n: 2, x: 262, y: 170, name: 'Erdungsleitung',
    q: 'Welche Leitung eignet sich als Erdungsleitung vom Standrohr zur Erdungsanlage?',
    o: [['Massivdraht (kein Litzenleiter): Kupfer 16 mm², Aluminium 25 mm² oder Stahl 50 mm²', 1], ['Feindrähtige Litze aus Kupfer, 16 mm²', 0], ['Kupferdraht 4 mm²', 0], ['Aluminium 10 mm²', 0]],
    why: 'VDE 0855-300: Einzelmassivdraht mit Cu 16 mm², Al 25 mm² oder Stahl 50 mm². Die Leitung muss Blitzströme aushalten, deshalb Massivdraht und großer Querschnitt.' },
  { id: 'erder', n: 3, x: 190, y: 258, name: 'Erdungsanlage des Gebäudes',
    q: 'Darf die vorhandene Gebäudeerdungsanlage für die Antennenerdung genutzt werden?',
    o: [['Ja: Jede vorhandene Gebäudeerdungsanlage kann verwendet werden.', 1], ['Nein: Jede Antenne braucht eine eigene, getrennte Erdungsanlage.', 0], ['Nur nach Abnahme durch den Prüf- und Messdienst der Bundesnetzagentur.', 0], ['Nur, wenn die Antenne nicht über die Fläche der Gebäudeerdung hinausragt.', 0]],
    why: 'Jede vorhandene Gebäudeerdungsanlage darf verwendet werden. Eine Abnahme durch die BNetzA gibt es dafür nicht.' },
  { id: 'koax', n: 4, x: 352, y: 150, name: 'Koaxkabel der Antennen',
    q: 'Was musst du mit den Schirmen der Koaxkabel aller Antennen tun, um Spannungsunterschiede zu vermeiden?',
    o: [['Alle Schirme miteinander und mit der Haupterdungsschiene verbinden.', 1], ['Für jedes Koaxkabel einen Überspannungsableiter vorsehen und sonst nichts.', 0], ['Nichts: Mit der Erdung des Antennenmastes ist alles erledigt.', 0], ['Nur Kabel mit mindestens 40 dB Schirmungsmaß verwenden.', 0]],
    why: 'Potentialausgleich: Alle leitenden Teile verbinden, damit keine gefährlichen Potentialunterschiede entstehen. Bei Koaxkabeln: Schirme untereinander und an die Haupterdungsschiene.' },
  { id: 'hes', n: 5, x: 360, y: 258, name: 'Haupterdungsschiene',
    q: 'Wofür ist die Haupterdungsschiene im Haus da?',
    o: [['Gemeinsamer Punkt für Erdung und Potentialausgleich: Gerätegehäuse und Koaxschirme werden hier angeschlossen.', 1], ['Sie speist den Transceiver mit Netzspannung.', 0], ['Sie dient als Antennenanpassung (Balun).', 0], ['Sie ersetzt die Sicherung des Netzteils.', 0]],
    why: 'Die Haupterdungsschiene des Gebäudes ist der zentrale Anschluss für Erdung und Potentialausgleich (VDE 0855-300 beschreibt das für Amateurfunk-Sendeanlagen).' },
  { id: 'geraete', n: 6, x: 452, y: 162, name: 'Gerätegehäuse in der Station',
    q: 'Transceiver, Netzteil und Anpassgerät haben Metallgehäuse. Was ist die richtige Maßnahme?',
    o: [['Die Gehäuse über kurze Leitungen zusammenführen und mit der Haupterdungsschiene verbinden (Potentialausgleich und Erdung).', 1], ['Die Gehäuse getrennt an der Wasserleitung erden.', 0], ['Die Gehäuse isoliert aufstellen und nicht verbinden.', 0], ['Nur den Transceiver erden, die anderen Geräte nicht.', 0]],
    why: 'Kurze Verbindungen gleichen Potentiale aus (keine gefährliche Berührungsspannung zwischen den Geräten) und leiten Fehlerströme zur Erde. Die Schraubklemme „GND“ auf der Rückseite vieler Geräte ist dafür gedacht.' },
];

export default function mount(stage, { params = {}, complete }) {
  const need = Math.min(params.need ?? SPOTS.length, SPOTS.length);
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const done = new Set(), wrong = new Set();
  const svg = s('svg', { class: 'vz-svg', viewBox: '0 0 560 290', role: 'img', 'aria-label': 'Haus mit Antennenmast, Koaxkabel zur Haupterdungsschiene, Station mit Geräten und Erdungsanlage im Boden; sechs nummerierte Punkte' });
  const legend = h('div', { class: 'vz-note', style: 'font-size:.86rem;margin:2px 0 4px' }, 'Blau: Antennenzuleitung (Koax) · grün gestrichelt: Erdungs- und Ausgleichsleitungen · TRX = Transceiver, NT = Netzteil, AG = Anpassgerät');
  const chips = h('div', { class: 'vz-seg vk-seg', style: 'flex-wrap:wrap;margin:4px 0' });
  root.append(svg, legend, chips);
  const panel = h('div', { class: 'vz-stat', style: 'display:block;padding:12px 16px;margin:8px 0;line-height:1.5' }, 'Tippe einen nummerierten Punkt im Bild an.');
  root.append(panel);
  const g = goals(root, [{ id: 'g', label: `${need} Punkte richtig beantwortet` }], () => complete?.());
  function draw() {
    const ink = 'var(--ink)', line = { stroke: ink, 'stroke-width': 2.2, fill: 'none' };
    svg.replaceChildren(
      s('rect', { x: 0, y: 0, width: 560, height: 290, fill: 'var(--surface-2)' }),
      s('rect', { x: 0, y: 238, width: 560, height: 52, fill: '#d9d2c3' }),
      // Haus
      s('rect', { x: 230, y: 130, width: 280, height: 108, fill: 'var(--surface)', stroke: ink, 'stroke-width': 2 }),
      s('polygon', { points: '215,130 370,92 525,130', fill: 'var(--surface)', stroke: ink, 'stroke-width': 2 }),
      // Antenne
      s('line', { x1: 318, y1: 100, x2: 318, y2: 22, ...line, 'stroke-width': 4 }),
      s('line', { x1: 280, y1: 30, x2: 356, y2: 30, ...line, 'stroke-width': 3 }),
      s('line', { x1: 290, y1: 46, x2: 346, y2: 46, ...line, 'stroke-width': 3 }),
      // Koax vom Mast ins Haus zur Schiene
      s('path', { d: 'M 318 100 L 352 134 L 352 214 L 372 224', ...line, stroke: 'var(--accent-2)', 'stroke-width': 3 }),
      // Erdungsleitung am Mast außen entlang zur Erdungsanlage
      s('path', { d: 'M 318 100 L 262 130 L 262 238 L 190 252', ...line, stroke: 'var(--good)', 'stroke-width': 3, 'stroke-dasharray': '7 4' }),
      // Erder
      s('path', { d: 'M 150 252 H 230 M 160 262 H 220 M 170 272 H 210', ...line, 'stroke-width': 3 }),
      // Haupterdungsschiene
      s('rect', { x: 340, y: 222, width: 70, height: 8, fill: 'var(--ink-2)' }),
      s('path', { d: 'M 372 230 L 372 248 L 230 252', ...line, stroke: 'var(--good)', 'stroke-width': 2.5, 'stroke-dasharray': '7 4' }),
      // Geräte
      ...[[418, 'TRX'], [452, 'NT'], [486, 'AG']].map(([x, t], i) => [s('rect', { x: x - 15, y: 190, width: 30, height: 26, rx: 3, fill: 'var(--surface)', stroke: ink, 'stroke-width': 1.8 }), s('text', { x, y: 208, 'text-anchor': 'middle', 'font-size': 12.5, 'font-weight': 600, fill: ink }, t), s('path', { d: `M ${x} 216 L ${x} 226 L ${i === 0 ? 410 : 410} 226`, ...line, 'stroke-width': 1.6, stroke: 'var(--good)' })]).flat(),
    );
    SPOTS.forEach(sp => {
      const st = done.has(sp.id) ? 'var(--good)' : wrong.has(sp.id) ? 'var(--bad)' : 'var(--ink-2)';
      const grp = s('g', { tabindex: 0, role: 'button', 'aria-label': `Punkt ${sp.n}: ${sp.name}`, style: 'cursor:pointer' },
        s('circle', { cx: sp.x, cy: sp.y, r: 18, fill: st, stroke: '#fff', 'stroke-width': 2.5 }),
        s('text', { x: sp.x, y: sp.y + 6.5, 'text-anchor': 'middle', 'font-size': 18, 'font-weight': 700, fill: '#fff' }, done.has(sp.id) ? '✓' : String(sp.n)));
      grp.onclick = () => open(sp);
      grp.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(sp); } };
      svg.append(grp);
    });
  }
  SPOTS.forEach(sp => chips.append(h('button', { type: 'button', text: `${sp.n} ${sp.name}`, onclick: () => open(sp) })));
  function open(sp) {
    const opts = shuffle(sp.o.map(([t, c]) => ({ t, c })));
    panel.replaceChildren(h('div', { style: 'font-weight:700;margin-bottom:4px' }, `${sp.n}. ${sp.name}`), h('div', { style: 'margin-bottom:8px' }, sp.q));
    const fb = h('div', { class: 'vz-note', style: 'margin-top:8px' });
    const box = h('div', { style: 'display:grid;gap:6px' });
    opts.forEach(o => box.append(h('button', { type: 'button', class: 'btn ghost', style: 'text-align:left;white-space:normal;height:auto;padding:8px 12px', text: o.t, onclick: ev => {
      if (done.has(sp.id)) return;
      if (o.c) { done.add(sp.id); wrong.delete(sp.id); ev.target.style.borderColor = 'var(--good)'; fb.innerHTML = `<b style="color:var(--good)">Richtig.</b> ${sp.why}`; draw(); if (done.size >= need) g.reach('g'); }
      else { wrong.add(sp.id); ev.target.style.borderColor = 'var(--bad)'; ev.target.disabled = true; fb.innerHTML = '<b style="color:var(--bad)">Nicht ganz.</b> Versuche es mit einer anderen Antwort.'; draw(); }
    } })));
    panel.append(box, fb);
  }
  draw();
  stage._test = { SPOTS, open, done, solveAll() { SPOTS.forEach(sp => { done.add(sp.id); }); draw(); if (done.size >= need) g.reach('g'); } };
}
function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
