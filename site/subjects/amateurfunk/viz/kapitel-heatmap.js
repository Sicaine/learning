// Kapitel-Heatmap: Lernstand der Übungsfragen je Katalogkapitel (34 Themen in vier Prüfungsteilen) aus dem Leitner-Zustand der Plattform.
// Liest nur lokale Daten (examkit.topicStats). Antippen eines Themas zeigt Zahlen und verlinkt auf die Übungsrunde.
// params: { pick?: 3 }  — so viele verschiedene Themen müssen angesehen werden
import { topicStats } from '../../../assets/js/examkit.js';
import { h } from '../../../assets/js/vizkit/base.js';
import { goals } from '../../../assets/js/vizkit/controls.js';

const pct = (a, b) => (b ? Math.round(a / b * 100) : 0);
const heat = r => `color-mix(in oklab, var(--good) ${Math.round(8 + r * 62)}%, var(--surface))`;

export default function mount(stage, { params = {}, ctx, complete }) {
  const need = params.pick ?? 3;
  const sid = ctx.sid, subject = ctx.subject;
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const st = topicStats(subject);
  const seenTotal = st.all.seen;
  const seen = new Set();
  const g = goals(root, [{ id: 'g', label: `${need} Themen angesehen (antippen)` }], () => complete?.());

  const head = h('div', { class: 'vz-note', style: 'line-height:1.55;margin-bottom:8px' });
  head.innerHTML = seenTotal
    ? `<b>${st.all.mastered} von ${st.all.total}</b> Fragen gemeistert (${pct(st.all.mastered, st.all.total)} %), ${st.all.weak} gelten als schwach, ${st.all.due} sind fällig, ${st.all.fresh} noch nie geübt.`
    : '<b>Noch keine Übungsdaten.</b> Die Heatmap füllt sich, sobald du im Übungsmodus Fragen beantwortest. Dein Lernstand liegt nur in diesem Browser. Du kannst trotzdem die Themen antippen und den Aufbau ansehen.';
  root.append(head);

  const legend = h('div', { style: 'display:flex;gap:6px;align-items:center;font-size:.8rem;color:var(--muted);margin-bottom:8px;flex-wrap:wrap' },
    'gemeistert:', ...[0, .25, .5, .75, 1].map(r => h('span', { style: `display:inline-block;width:26px;height:12px;border-radius:3px;border:1px solid var(--line);background:${heat(r)}`, title: `${Math.round(r * 100)} %` })), '0 % → 100 %', h('span', { style: 'margin-left:8px' }, 'Rahmen rot = viele schwache Fragen'));
  root.append(legend);

  const detail = h('div', { class: 'vz-stat', style: 'display:block;padding:12px 14px;margin-top:10px;line-height:1.6' }, 'Tippe ein Thema an, um Zahlen und den Link zur Übungsrunde zu sehen.');
  const cells = new Map();
  for (const part of subject.exam.parts) {
    const ps = st.byPart[part.id];
    root.append(h('div', { style: 'margin:10px 0 4px;font-weight:700' }, `${part.title.replace(/^Teil\s*/, 'Teil ')} · ${ps.total} Fragen`, h('span', { style: 'font-weight:400;color:var(--muted);margin-left:8px;font-size:.85rem' }, `gemeistert ${pct(ps.mastered, ps.total)} %`)));
    const grid = h('div', { style: 'display:grid;grid-template-columns:repeat(auto-fill,minmax(128px,1fr));gap:6px' });
    for (const tp of part.topics) {
      const s = st.byTopic[tp.id], r = s.total ? s.mastered / s.total : 0, weakShare = s.total ? s.weak / s.total : 0;
      const b = h('button', { type: 'button', style: `text-align:left;padding:7px 8px;border-radius:10px;border:2px solid ${weakShare > .25 ? 'var(--bad)' : 'var(--line)'};background:${heat(r)};cursor:pointer;font:inherit;color:var(--ink);min-height:56px`, 'aria-label': `${tp.title}: ${s.mastered} von ${s.total} gemeistert` },
        h('div', { style: 'font-weight:700;font-size:.82rem' }, tp.id.toUpperCase(), h('span', { style: 'font-weight:400;color:var(--muted)' }, ` · ${s.total}`)),
        h('div', { style: 'font-size:.74rem;line-height:1.25;margin-top:2px', text: short(tp.title) }));
      b.onclick = () => select(tp, s);
      cells.set(tp.id, b); grid.append(b);
    }
    root.append(grid);
  }
  root.append(detail);

  function select(tp, s) {
    cells.forEach(c => { c.style.outline = ''; }); cells.get(tp.id).style.outline = '3px solid var(--accent)';
    seen.add(tp.id); if (seen.size >= need) g.reach('g');
    detail.replaceChildren(
      h('div', { style: 'font-weight:700' }, `${tp.id.toUpperCase()}: ${tp.title}`),
      h('div', {}, `Fragen im Pool: ${s.total} · gemeistert: ${s.mastered} · schwach: ${s.weak} · in Übung: ${s.learning} · fällig: ${s.due} · noch nie geübt: ${s.fresh}`),
      h('div', { style: 'margin-top:6px;display:flex;gap:8px;flex-wrap:wrap' },
        h('a', { class: 'btn primary small', href: `#/s/${sid}/practice/${tp.id}`, text: 'Dieses Thema üben' }),
        h('a', { class: 'btn ghost small', href: `#/s/${sid}/practice/weak`, text: 'Alle schwachen Fragen' })));
  }
  function short(t) { return t.length > 46 ? t.slice(0, 44).replace(/[ ,(]+\S*$/, '') + ' …' : t; }
  stage._test = { select: id => { const tp = subject.qTopicById[id]; select(tp, st.byTopic[id]); }, st };
}
