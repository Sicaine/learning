// Prüfungs-Zeitplaner: 25 Fragen in 45 Minuten (Vfg. 29/2024 Nr. 7.1). Eigene Annahmen einstellen und sehen, ob Durchgang 1, Zweitdurchgang, Kontrolle und Puffer in die Zeit passen.
// Die Voreinstellungen sind Übungswerte, keine amtlichen Angaben. params: { part?: 'v'|'b'|'n'|'e', calc?: Anzahl Rechenaufgaben, tw?: Sekunden je Wissensfrage, tr?: Minuten je Rechenaufgabe }
import { h } from '../../../assets/js/vizkit/base.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';

const PRESET = { v: { calc: 0, tw: 70 }, b: { calc: 0, tw: 55 }, n: { calc: 5, tw: 55 }, e: { calc: 9, tw: 60 } };
const NAME = { v: 'Teil V', b: 'Teil B', n: 'Teil N', e: 'Teil E' };
const dec = (x, d = 1) => (+x).toFixed(d).replace('.', ',');

export default function mount(stage, { params = {}, complete }) {
  const part = params.part ?? 'v', P = PRESET[part] ?? PRESET.v;
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const bar = h('div', { style: 'display:flex;height:34px;border-radius:8px;overflow:hidden;border:1px solid var(--line);background:var(--surface)' });
  const legend = h('div', { style: 'display:flex;gap:10px;flex-wrap:wrap;font-size:.82rem;margin:6px 0 10px;color:var(--ink-2)' });
  root.append(h('div', { style: 'font-weight:700;margin-bottom:6px' }, `${params.part ? NAME[part] + ': ' : ''}Zeitplan für 25 Fragen in 45 Minuten`), bar, legend);
  const ui = controls(root, [
    { id: 'nR', label: 'Rechenaufgaben im Teil (deine Schätzung)', min: 0, max: 25, value: params.calc ?? P.calc, step: 1, format: v => String(v) },
    { id: 'tW', label: 'Zeit je Wissensfrage', min: 20, max: 150, value: params.tw ?? P.tw, step: 5, format: v => `${v} s` },
    { id: 'tR', label: 'Zeit je Rechenaufgabe', min: 1, max: 8, value: params.tr ?? 3, step: 0.5, format: v => `${dec(v)} min` },
    { id: 'skip', label: 'Zurückgestellte Fragen (im ersten Durchgang übersprungen)', min: 0, max: 12, value: 4, step: 1, format: v => String(v) },
    { id: 't2', label: 'Zeit je zurückgestellter Frage im Zweitdurchgang', min: 1, max: 5, value: 2, step: 0.5, format: v => `${dec(v)} min` },
    { id: 'chk', label: 'Kontrolle des Antwortbogens am Schluss', min: 0, max: 10, value: 3, step: 1, format: v => `${v} min` },
  ], run);
  const out = readout(root, [{ id: 'sum', label: 'Zeitbedarf', hl: true }, { id: 'buf', label: 'Puffer', hl: true }, { id: 'avg', label: 'Durchschnitt je Frage' }]);
  const note = h('div', { class: 'vz-note', style: 'line-height:1.55;margin-top:6px' }); root.append(note);
  const g = goals(root, [
    { id: 'over', label: 'einen Plan gesehen, der die 45 Minuten sprengt' },
    { id: 'ok', label: 'einen realistischen Plan gebaut: passt in 45 Minuten, lässt mindestens 5 Minuten Puffer, plant Kontrolle (ab 2 min) und stellt mindestens eine Frage zurück' },
  ], () => complete?.());
  function run(_, id) {
    const act = !!id, v = ui.values;
    const nR = v.nR, nW = 25 - nR, sk = Math.min(v.skip, 25), skR = Math.min(nR, sk), skW = sk - skR;
    const p1 = (nW - skW) * v.tW / 60 + (nR - skR) * v.tR + sk * (10 / 60);
    const p2 = sk * v.t2, chk = v.chk, sum = p1 + p2 + chk, buf = 45 - sum;
    const segs = [[p1, 'Durchgang 1', 'var(--accent)'], [p2, 'Zweitdurchgang', 'var(--accent-2)'], [chk, 'Kontrolle', 'var(--warn)']];
    const total = Math.max(45, sum);
    bar.replaceChildren(...segs.filter(s => s[0] > 0).map(([m, l, c]) => h('div', { title: `${l}: ${dec(m)} min`, style: `width:${m / total * 100}%;background:${c};color:#fff;font-size:.78rem;display:flex;align-items:center;justify-content:center;overflow:hidden;white-space:nowrap` }, m / total > .1 ? dec(m, 0) + ' min' : '')),
      buf > 0 ? h('div', { title: `Puffer: ${dec(buf)} min`, style: `width:${buf / total * 100}%;background:repeating-linear-gradient(45deg,var(--surface),var(--surface) 6px,var(--line) 6px,var(--line) 12px)` }) : h('div', { style: 'width:0' }));
    legend.replaceChildren(...segs.map(([m, l, c]) => h('span', {}, h('span', { style: `display:inline-block;width:.8em;height:.8em;border-radius:2px;background:${c};margin-right:.35em` }), `${l} ${dec(m)} min`)), h('span', {}, `Puffer ${dec(Math.max(0, buf))} min`));
    out.set({ sum: `${dec(sum)} min`, buf: `${buf >= 0 ? '' : '−'}${dec(Math.abs(buf))} min`, avg: `${dec(sum / 25 * 60, 0)} s` });
    note.innerHTML = buf < 0 ? `<b style="color:var(--bad)">Zu lang:</b> Dein Plan braucht ${dec(sum)} Minuten, erlaubt sind höchstens 45. Rechenaufgaben und Zweitdurchgang verkürzen oder pro Frage schneller werden: Im Schnitt hast du 1,8 Minuten (108 Sekunden) je Frage.`
      : buf < 5 ? `<b style="color:var(--warn)">Knapp:</b> Weniger als 5 Minuten Puffer. Plane Luft für Lesefehler und für eine zweite Rechnung ein.`
      : `<b style="color:var(--good)">Passt:</b> ${dec(buf)} Minuten Puffer. Im Schnitt hast du 1,8 Minuten (108 Sekunden) je Frage, und ein Plan wie dieser verteilt sie klug: schnelle Fragen schnell, schwere zurückstellen.`;
    if (!act) return;
    if (sum > 45) g.reach('over');
    if (sum <= 45 && buf >= 5 && v.chk >= 2 && sk >= 1) g.reach('ok');
  }
  run();
  stage._test = { ui, run };
}
