// Koaxial-Steckverbinder PL, N, BNC, SMA: Steckbrief zum Antippen und Erkennungs-Trainer (Bild → Name, Einsatz → Name).
// Abbildungen: Zeichnungen aus dem amtlichen Prüfungsfragenkatalog (Bundesnetzagentur, Datenlizenz Deutschland – Namensnennung 2.0).
import { h } from '../../../assets/js/vizkit/base.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';

const FIG = k => `assets/data/afu/figures/${k}_q.svg`;
const CON = {
  PL: { img: 'NG202', name: 'PL (auch „UHF-Stecker“)', verschl: 'Schraubverbindung (Überwurfmutter mit Rändel)', freq: 'Kurzwelle bis etwa 2 m (VHF); nicht für UHF und höher', leistung: 'mittlere bis hohe Leistung', hinweis: 'Heißt trotz des Namens „UHF-Stecker“ nicht für UHF geeignet. Nie in eine N-Buchse stecken: die Buchse kann zerstört werden.' },
  BNC: { img: 'NG203', name: 'BNC', verschl: 'Bajonettverschluss (eine Vierteldrehung)', freq: 'bis etwa 70 cm', leistung: 'kleine Leistung', hinweis: 'Schnell zu lösen; Handfunkgeräte, Messgeräte, Oszilloskopkabel.' },
  N: { img: 'NG204', name: 'N', verschl: 'Schraubverbindung mit Federkontakten um den Mittelstift', freq: 'bis in den GHz-Bereich, definierter Wellenwiderstand von 50 Ω', leistung: 'höchste Spannungsfestigkeit, hohe Leistung', hinweis: 'Standard für UHF/SHF-Anlagen und Außeninstallation.' },
  SMA: { img: 'NG205', name: 'SMA', verschl: 'kleine Schraubverbindung (Sechskantmutter)', freq: 'sehr hohe Frequenzen (GHz)', leistung: 'klein, geringe Leistung', hinweis: 'Klein; häufig an HF-Messgeräten und modernen Handfunkgeräten. Es gibt auch Reverse-SMA mit vertauschtem Mittelkontakt.' },
};
const KEYS = Object.keys(CON);
const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const USE = [
  ['Zwischen Kurzwellen-Transceiver und Antennenkabel (bis 2 m) verbreitet', 'PL'], ['Antennenanlage im 23-cm-Band mit hoher Leistung und Außeninstallation', 'N'],
  ['Kleiner Stecker für sehr hohe Frequenzen, etwa am Messgerät', 'SMA'], ['Bajonettverschluss für kleine Leistungen, auch an Messgeräten', 'BNC'],
  ['Besonders hohe Spannungsfestigkeit bei großer Leistung', 'N'], ['Für alle Bänder oberhalb 300 MHz am besten geeignet sind N und …', 'SMA'],
];

export default function mount(stage, { complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const ui = controls(root, [{ id: 'mode', type: 'seg', label: 'Modus', options: [['learn', 'Steckbrief'], ['pic', 'Erkennen: Bild'], ['use', 'Einsatz zuordnen']], value: 'learn' }], run);
  const body = h('div', { style: 'display:block;padding:14px 16px;border:1px solid var(--line);border-radius:12px;background:var(--surface)' }); root.append(body);
  const out = readout(root, [{ id: 'ok', label: 'Richtig', hl: true }, { id: 'n', label: 'Versuche' }]);
  const g = goals(root, [{ id: 'learn', label: 'Alle vier Steckbriefe angesehen' }, { id: 'pic', label: '4 Bilder in Folge richtig erkannt' }, { id: 'use', label: '3 Einsätze richtig zugeordnet' }], () => complete?.());
  const seen = new Set(); let okPic = 0, okUse = 0, tries = 0, streak = 0, q = null;

  function btnRow(onPick) {
    const row = h('div', { style: 'display:flex;flex-wrap:wrap;gap:8px;margin-top:10px' });
    for (const k of KEYS) row.append(h('button', { type: 'button', class: 'btn ghost', text: k, 'data-k': k, onclick: () => onPick(k, row) }));
    return row;
  }
  function learn(sel = 'PL') {
    seen.add(sel); if (seen.size === 4) g.reach('learn');
    const c = CON[sel];
    const tabs = h('div', { class: 'vz-seg', style: 'margin-bottom:10px' }, ...KEYS.map(k => h('button', { type: 'button', text: k, class: k === sel ? 'on' : '', onclick: () => { body.replaceChildren(); learn(k); } })));
    body.append(tabs, h('img', { src: FIG(c.img), alt: `Zeichnung eines ${c.name}-Steckers und der Kupplung`, style: 'width:100%;max-width:340px;display:block;margin:0 auto;background:#fff;border-radius:10px' }));
    body.append(h('div', { style: 'margin-top:10px;line-height:1.7', html: `<b>${c.name}</b><br>Verschluss: ${c.verschl}<br>Frequenzbereich: ${c.freq}<br>Leistung: ${c.leistung}<br><small>${c.hinweis}</small>` }));
  }
  function picQ() {
    const k = KEYS[Math.floor(Math.random() * 4)]; q = { k };
    const row = btnRow((pick, r) => answer(pick === k, k, r));
    body.append(h('div', { style: 'font-weight:600;margin-bottom:8px', text: 'Welcher Steckverbinder ist abgebildet?' }), h('img', { src: FIG(CON[k].img), alt: 'Zeichnung eines Koaxial-Steckverbinders', style: 'width:100%;max-width:340px;display:block;margin:0 auto;background:#fff;border-radius:10px' }), row, h('div', { class: 'vz-note', 'data-fb': '', style: 'margin-top:10px;min-height:2.4em' }));
  }
  function useQ() {
    const [txt, k] = USE[Math.floor(Math.random() * USE.length)]; q = { k };
    const row = btnRow((pick, r) => answer(pick === k, k, r));
    body.append(h('div', { style: 'font-weight:600;margin-bottom:8px', text: txt }), row, h('div', { class: 'vz-note', 'data-fb': '', style: 'margin-top:10px;min-height:2.4em' }));
  }
  function answer(right, k, row) {
    tries++;
    for (const b of row.children) { b.disabled = true; if (b.dataset.k === k) b.style.borderColor = 'var(--good)'; }
    const fb = body.querySelector('[data-fb]');
    fb.innerHTML = (right ? '<b style="color:var(--good)">Richtig.</b> ' : '<b style="color:var(--bad)">Nicht ganz.</b> ') + `Es ist <b>${CON[k].name}</b>: ${CON[k].verschl}; ${CON[k].freq}.`;
    const mode = ui.values.mode;
    if (mode === 'pic') { streak = right ? streak + 1 : 0; if (streak >= 4) g.reach('pic'); }
    if (mode === 'use' && right) { okUse++; if (okUse >= 3) g.reach('use'); }
    okPic += right ? 1 : 0;
    out.set({ ok: okPic, n: tries });
    const nx = h('button', { type: 'button', class: 'btn primary', text: 'Weiter', style: 'margin-top:8px', onclick: run }); body.append(nx);
  }
  function run() {
    body.replaceChildren();
    const m = ui.values.mode;
    if (m === 'learn') learn(); else if (m === 'pic') picQ(); else useQ();
  }
  out.set({ ok: 0, n: 0 });
  run();
}
