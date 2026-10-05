// QSL-Karte ausfüllen: Mindestangaben wählen und Ortszeit in UTC umrechnen (MEZ − 1 h, MESZ − 2 h).
import { h } from '../../../assets/js/vizkit/base.js';
import { goals } from '../../../assets/js/vizkit/controls.js';

const FIELDS = [
  ['Verwendetes Rufzeichen', true], ['Rufzeichen der Gegenstation', true], ['Datum', true], ['Uhrzeit in UTC', true], ['Frequenzband (oder Frequenz)', true], ['Übertragungsverfahren (z. B. SSB, CW)', true], ['Signal-Rapport', true],
  ['Name des Operators', false], ['Locator / Standort', false], ['Sendeleistung', false], ['Beschreibung der Ausrüstung', false], ['Angaben zum Funkwetter', false], ['Handschriftliche Unterschrift', false], ['Uhrzeit in Ortszeit (zusätzlich)', false],
];
const pad = n => String(n).padStart(2, '0');
const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const hhmm = m => `${pad(Math.floor(((m % 1440) + 1440) % 1440 / 60))}:${pad(((m % 60) + 60) % 60)}`;

export default function mount(stage, { complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  // Teil 1: Mindestangaben
  const sel = new Set(); let checked = false;
  const note1 = h('div', { class: 'vz-note', html: '<b>Teil 1.</b> Was gehört <b>mindestens</b> auf eine QSL-Karte? Tippe alle Angaben an, die Pflicht sind.' });
  const chips = h('div', { class: 'chips', style: 'margin:8px 0;display:flex;flex-wrap:wrap;gap:6px' });
  const btn = FIELDS.map(([t], i) => h('button', { type: 'button', class: 'chip', text: t, onclick: () => { if (checked) return; sel.has(i) ? sel.delete(i) : sel.add(i); btn[i].classList.toggle('sel', sel.has(i)); } }));
  chips.append(...btn);
  const chk = h('button', { type: 'button', class: 'btn small', text: 'Prüfen', style: 'justify-self:start' });
  const fb1 = h('div', { class: 'vz-note', style: 'margin:8px 0' });
  chk.onclick = () => {
    checked = true; let wrong = 0;
    FIELDS.forEach(([, must], i) => { const on = sel.has(i), ok = on === must; if (!ok) wrong++; btn[i].style.borderColor = must ? 'var(--good)' : (on ? 'var(--bad)' : ''); btn[i].style.background = must ? 'var(--good-soft)' : (on ? 'var(--bad-soft)' : ''); });
    fb1.innerHTML = wrong === 0 ? '<b style="color:var(--good)">Richtig.</b> Mindestangaben: beide Rufzeichen, Datum, Uhrzeit in UTC, Band/Frequenz, Verfahren, Rapport. Name, Locator, Leistung, Ausrüstung sind üblich, aber keine Pflicht; eine Unterschrift ist nicht mehr nötig.' : `<b style="color:var(--bad)">${wrong} Abweichung(en).</b> Grün = gehört zu den Mindestangaben; rot = freiwillig. <button type="button" class="btn small ghost" id="again1">Nochmal</button>`;
    if (wrong === 0) g.reach('p1');
    fb1.querySelector('#again1')?.addEventListener('click', () => { checked = false; sel.clear(); btn.forEach(b => { b.classList.remove('sel'); b.style.borderColor = ''; b.style.background = ''; }); fb1.textContent = ''; });
  };
  // Teil 2: UTC
  const note2 = h('div', { class: 'vz-note', style: 'margin-top:14px', html: '<b>Teil 2.</b> Rechne die Ortszeit in <b>UTC</b> um (MEZ − 1 h, MESZ − 2 h). Gib die Zeit als <code>HH:MM</code> ein.' });
  const q2 = h('div', { class: 'vz-stat', style: 'display:block;padding:12px 16px;font-size:1.02rem;margin:8px 0' });
  const inp = h('input', { type: 'text', inputmode: 'numeric', placeholder: 'HH:MM', 'aria-label': 'UTC-Zeit', style: 'font:600 1.1rem var(--mono);padding:8px 12px;border:1px solid var(--line-2);border-radius:10px;width:7em' });
  const ok2 = h('button', { type: 'button', class: 'btn primary', text: 'Prüfen', style: 'margin-left:8px' });
  const fb2 = h('div', { class: 'vz-note', style: 'margin-top:8px;min-height:2.4em' });
  let item, streak = 0;
  function nextQ() {
    const summer = Math.random() < 0.6, off = summer ? 120 : 60, local = rnd(0, 47) * 30;
    item = { summer, local, utc: local - off, off };
    q2.innerHTML = `Du hattest um <b>${hhmm(local)} ${summer ? 'MESZ' : 'MEZ'}</b> ein QSO. Welche Zeit trägst du auf der QSL-Karte ein?${local - off < 0 ? ' <span style="color:var(--muted)">(Achtung: Datumswechsel!)</span>' : ''}`;
    inp.value = ''; inp.disabled = false; fb2.textContent = ''; ok2.textContent = 'Prüfen';
  }
  function check2() {
    if (inp.disabled) { nextQ(); return; }
    const m = inp.value.trim().replace('.', ':').match(/^(\d{1,2}):?(\d{2})$/); if (!m) return;
    const v = (+m[1]) * 60 + (+m[2]), good = v === ((item.utc % 1440) + 1440) % 1440;
    inp.disabled = true; ok2.textContent = 'Weiter';
    fb2.innerHTML = good ? `<b style="color:var(--good)">Richtig.</b> ${hhmm(item.local)} ${item.summer ? 'MESZ' : 'MEZ'} − ${item.off / 60} h = ${hhmm(item.utc)} UTC.` : `<b style="color:var(--bad)">Nicht ganz.</b> ${hhmm(item.local)} ${item.summer ? 'MESZ' : 'MEZ'} − ${item.off / 60} h = <b>${hhmm(item.utc)} UTC</b>.`;
    streak = good ? streak + 1 : 0; if (streak >= 3) g.reach('p2');
    out.textContent = `Serie: ${streak} / 3`;
  }
  ok2.onclick = check2; inp.onkeydown = e => { if (e.key === 'Enter') check2(); };
  const out = h('div', { class: 'vz-note', style: 'color:var(--muted)', text: 'Serie: 0 / 3' });
  root.append(note1, chips, chk, fb1, note2, q2, h('div', {}, inp, ok2), fb2, out);
  const g = goals(root, [{ id: 'p1', label: 'Mindestangaben richtig auswählen' }, { id: 'p2', label: '3 Umrechnungen in Folge richtig' }], () => complete?.());
  nextQ();
}
