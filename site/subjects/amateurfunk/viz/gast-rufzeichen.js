// Gast-Rufzeichen-Baukasten: Reise ins Ausland (CEPT) und Gäste in Deutschland. Quellen: BNetzA-Seite Amateurfunk (CEPT T/R 61-01, ECC (05)06), Rufzeichenplan Nr. 5.
import { h } from '../../../assets/js/vizkit/base.js';
import { controls, goals } from '../../../assets/js/vizkit/controls.js';

const HOME = { A: 'DL9MJ', E: 'DO7PR', N: 'DN9AB' };
const CLS = [['A', 'Klasse A (HAREC)'], ['E', 'Klasse E'], ['N', 'Klasse N']];

export default function mount(stage, { complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const ui = controls(root, [
    { id: 'mode', type: 'seg', label: 'Szenario', options: [['out', 'Ich reise ins Ausland'], ['in', 'Ein Gast funkt in Deutschland']], value: 'out' },
    { id: 'cls', type: 'seg', label: 'Deine Klasse (Heimatland)', options: CLS, value: 'A' },
    { id: 'dest', type: 'seg', label: 'Zielland', options: [['cept', 'Schweiz (wendet CEPT-Regeln an)'], ['non', 'Land ohne CEPT-Regelung']], value: 'cept' },
    { id: 'stn', type: 'seg', label: 'Station', options: [['pz', 'persönliches Rufzeichen'], ['ks', 'Klubstation']], value: 'pz' },
    { id: 'stay', type: 'seg', label: 'Aufenthalt', options: [['short', 'vorübergehend, bis 3 Monate'], ['long', 'länger / dort wohnhaft']], value: 'short' },
  ], run);
  const call = h('div', { class: 'vz-stat hl', style: 'display:block;padding:14px 16px;margin:10px 0;font:700 1.3rem var(--mono)' });
  const list = h('div', { style: 'display:grid;gap:6px;margin:6px 0' });
  root.append(call, list);
  const g = goals(root, [
    { id: 'hb9', label: 'HB9/DL9MJ bilden (Klasse A, Schweiz)' },
    { id: 'hb3', label: 'HB3/DO7PR bilden (Klasse E, Schweiz)' },
    { id: 'n', label: 'Klasse N im Ausland: nicht möglich' },
    { id: 'ks', label: 'Klubstation im Ausland: Gastgenehmigung nötig' },
    { id: 'in', label: 'Gast in Deutschland: DL/ und DO/ bilden' },
  ], () => complete?.());
  const seen = new Set();

  function row(ok, txt) {
    return h('div', { style: `padding:8px 12px;border-radius:10px;border:1px solid var(--${ok ? 'good' : 'bad'});background:var(--${ok ? 'good' : 'bad'}-soft);font-size:.92rem`, html: `<b style="color:var(--${ok ? 'good' : 'bad'})">${ok ? '✓' : '✗'}</b> ${txt.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')}` });
  }
  function run(_, id) {
    const act = !!id;
    const v = ui.values; const rows = []; let c = '';
    const box = id => ui.el.querySelector(`[data-id=${id}]`);
    const inb = v.mode === 'in';
    if (inb && v.cls === 'N') { ui.set({ cls: 'A' }, { silent: true }); return run(_, id); }
    box('stn').style.display = inb ? 'none' : '';
    box('cls').querySelector('.vk-seglabel').textContent = inb ? 'Entspricht deutscher Klasse' : 'Deine Klasse (Heimatland)';
    box('cls').querySelectorAll('button')[2].style.display = inb ? 'none' : '';
    box('dest').querySelector('.vk-seglabel').textContent = inb ? 'Art der Genehmigung des Gastes' : 'Zielland';
    const bs = box('dest').querySelectorAll('button');
    bs[0].textContent = inb ? 'CEPT-Lizenz (T/R 61-01 bzw. (05)06)' : 'Schweiz (wendet CEPT-Regeln an)';
    bs[1].textContent = inb ? 'andere Genehmigung (ohne CEPT)' : 'Land ohne CEPT-Regelung';
    if (v.mode === 'out') {
      const home = HOME[v.cls];
      if (v.cls === 'N') { c = '—'; rows.push(row(false, 'Die **Klasse N** ist bisher **nur in Deutschland gültig**: Deutschland hat sie der CEPT nicht als Entry Level Licence gemeldet. Im Ausland darfst du damit nicht senden.')); act && g.reach('n'); }
      else if (v.stn === 'ks') { c = '—'; rows.push(row(false, 'Die CEPT-Empfehlungen gelten **nur für persönliche Rufzeichen**. Der Betrieb einer **Klubstation** im Ausland braucht immer eine **Gastgenehmigung** des Gastlandes.')); act && g.reach('ks'); }
      else if (v.dest === 'non') { c = '—'; rows.push(row(false, 'Das Land wendet die CEPT-Empfehlung nicht an: Du musst bei der zuständigen Behörde eine **Gastzulassung** beantragen (kein Gegenseitigkeitsabkommen, keine Genehmigung über die BNetzA).')); }
      else if (v.stay === 'long') { c = '—'; rows.push(row(false, 'Die CEPT-Lizenz gilt nur für **vorübergehende** Aufenthalte (bis zu **3 Monaten je Aufenthalt**) ohne festen Wohnsitz. Danach: Genehmigung beim Gastland beantragen — mit HAREC (Klasse A) vereinfacht.')); }
      else {
        const pre = v.cls === 'A' ? 'HB9' : 'HB3';
        c = `${pre}/${home}`;
        rows.push(row(true, `Klasse ${v.cls}: Präfix des Gastlandes **vorangestellt** — ${v.cls === 'A' ? 'CEPT T/R 61-01' : 'ECC (05)06 (CEPT-Novice)'}. Telegrafie: „${c}“, Telefonie: „${pre} **stroke** ${home}“.`));
        rows.push(row(true, 'Es gelten die Empfehlung **und** die Vorschriften des Gastlandes (z. B. Leistung, Bänder wie 6 m).'));
        act && g.reach(v.cls === 'A' ? 'hb9' : 'hb3');
      }
    } else {
      if (v.cls === 'N') { c = '—'; rows.push(row(false, 'Ein ausländischer Funkamateur ohne CEPT-Genehmigung braucht eine **Gastzulassung** (bis zu 3 Monate). Die deutsche Klasse N ist für Ausländer nicht relevant.')); }
      else if (v.stay === 'long') { c = '—'; rows.push(row(false, 'Wer in Deutschland **ansässig** wird, braucht eine deutsche Zulassung (mit HAREC vereinfacht); die CEPT-Lizenz gilt nur für Aufenthalte ohne festen Wohnsitz.')); }
      else if (v.dest === 'non') { c = '—'; rows.push(row(false, 'Genehmigungen, die **nicht** unter T/R 61-01 oder ECC (05)06 fallen, brauchen eine **Gastzulassung** (Kurzzeitzulassung bis zu 3 Monate).')); }
      else {
        const pre = v.cls === 'A' ? 'DL' : 'DO';
        c = `${pre}/G3MM`;
        rows.push(row(true, `CEPT-Lizenz → Rechte der deutschen Klasse ${v.cls === 'A' ? 'A' : 'E'}; Heimatrufzeichen mit Präfix **${pre}/** davor (Beispiel: der englische Funkamateur G3MM). Trennung durch „/“ (Telegrafie) oder „stroke“ (Telefonie).`));
        rows.push(row(true, 'Bis zu **3 Monate je Aufenthalt**. Nicht dauerhaft.'));
        if (act) { seen.add(pre); if (seen.has('DL') && seen.has('DO')) g.reach('in'); }
      }
    }
    call.textContent = c ? `Rufzeichen: ${c}` : 'Kein Betrieb möglich';
    list.replaceChildren(...rows);
  }
  run();
}
