// Gemeinsamer Szenario-Trainer für die Betriebstechnik-Demos (Amateurfunk, Etappe 3).
// deck(stage, { complete, md, items | gen, count, need, goal, optionsFixed, intro })
//   item: { q: Markdown, options: [text…], correct: index | [indices], explain: Markdown, then?: { q, options, correct, explain } }
//   gen(): item (dynamisch erzeugt) – dann statt `items`.
import { goals, readout } from '../../../assets/js/vizkit/controls.js';
import { h } from '../../../assets/js/vizkit/base.js';

export const pick = a => a[Math.floor(Math.random() * a.length)];
export const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };

export function deck(stage, { complete, md, items, gen, count = 8, need = 6, goal, optionsFixed = false, intro, itemLabel = 'Szenario' }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  let queue = items ? shuffle(items).slice(0, count) : null;
  let n = 0, ok = 0, cur = null;
  const card = h('div', { class: 'vz-stat', style: 'display:block;padding:16px 18px' });
  const head = h('div', { style: 'font:600 .78rem var(--mono);color:var(--muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px' });
  const qEl = h('div', { style: 'font-size:1.03rem;line-height:1.55;margin-bottom:12px' });
  const opts = h('div', { style: 'display:grid;gap:8px;grid-template-columns:repeat(auto-fit,minmax(min(100%,210px),1fr))' });
  const fb = h('div', { class: 'vz-note', style: 'margin-top:12px;line-height:1.55' });
  const nx = h('button', { type: 'button', class: 'btn primary', text: 'Weiter', style: 'margin-top:10px;display:none' });
  card.append(head, qEl, opts, fb, nx);
  if (intro) root.append(h('div', { class: 'vz-note', html: md(intro), style: 'margin-bottom:10px' }));
  root.append(card);
  const out = readout(root, [{ id: 'n', label: itemLabel }, { id: 'ok', label: 'Richtig', hl: true }]);
  const g = goals(root, [{ id: 'g', label: goal || `${need} von ${count} richtig` }], () => complete?.());

  function next() {
    if (n >= count) { finish(); return; }
    cur = gen ? gen() : queue[n]; n++;
    show(cur, false);
  }
  function show(item, isThen) {
    const sub = isThen ? item : item;
    head.textContent = `${itemLabel} ${n} von ${count}${isThen ? ' · Nachfrage' : ''}`;
    qEl.innerHTML = md(sub.q);
    fb.innerHTML = ''; nx.style.display = 'none'; opts.replaceChildren();
    const multi = Array.isArray(sub.correct);
    const correctSet = new Set(multi ? sub.correct : [sub.correct]);
    const order = (sub.shuffle ?? !optionsFixed) ? shuffle(sub.options.map((_, i) => i)) : sub.options.map((_, i) => i);
    let locked = false; const picked = new Set();
    const btns = order.map(i => {
      const b = h('button', { type: 'button', class: 'chip', style: 'text-align:center', html: md(sub.options[i]).replace(/^<p>|<\/p>$/g, '') });
      b.onclick = () => {
        if (locked) return;
        if (multi) { picked.has(i) ? picked.delete(i) : picked.add(i); b.classList.toggle('sel', picked.has(i)); return; }
        resolve(new Set([i]));
      };
      return b;
    });
    opts.append(...btns);
    if (multi) {
      const chk = h('button', { type: 'button', class: 'btn small', text: 'Prüfen', style: 'grid-column:1/-1;justify-self:start' });
      chk.onclick = () => { if (!locked && picked.size) { chk.remove(); resolve(picked); } };
      opts.append(chk);
    }
    function resolve(sel) {
      locked = true;
      const good = sel.size === correctSet.size && [...sel].every(i => correctSet.has(i));
      order.forEach((i, k) => {
        const b = btns[k]; b.classList.remove('sel');
        if (correctSet.has(i)) { b.style.borderColor = 'var(--good)'; b.style.background = 'var(--good-soft)'; }
        else if (sel.has(i)) { b.style.borderColor = 'var(--bad)'; b.style.background = 'var(--bad-soft)'; }
        b.style.cursor = 'default';
      });
      fb.innerHTML = `<b style="color:var(--${good ? 'good' : 'bad'})">${good ? 'Richtig.' : 'Nicht ganz.'}</b> ` + md(sub.explain || '');
      if (!isThen) { if (good) ok++; cur.__good = good; }
      else if (!good && cur.__good) { ok--; cur.__good = false; }
      out.set({ n: `${n}/${count}`, ok: `${ok}` });
      if (!isThen && cur.then) { nx.textContent = 'Nachfrage'; nx.onclick = () => show(cur.then, true); }
      else { nx.textContent = n >= count ? 'Auswertung' : 'Weiter'; nx.onclick = next; }
      nx.style.display = '';
      if (ok >= need) g.reach('g');
    }
  }
  function finish() {
    head.textContent = 'Auswertung'; opts.replaceChildren(); nx.style.display = 'none';
    qEl.innerHTML = md(`**${ok} von ${count}** richtig.`);
    fb.innerHTML = ok >= need ? 'Ziel erreicht.' : `Für das Ziel brauchst du mindestens ${need}. Nochmal?`;
    const again = h('button', { type: 'button', class: 'btn small', text: 'Neue Runde', style: 'margin-top:8px' });
    again.onclick = () => { n = 0; ok = 0; if (items) queue = shuffle(items).slice(0, count); out.set({ n: '0/' + count, ok: '0' }); next(); };
    fb.append(h('br'), again);
  }
  out.set({ n: `0/${count}`, ok: '0' });
  next();
  return { root };
}

/** Kleine Tabelle aus Zeilen (HTML-Strings) */
export function table(rows, head) {
  return h('table', { style: 'border-collapse:collapse;width:100%;font-size:.9rem', html: (head ? `<thead><tr>${head.map(c => `<th style="text-align:left;padding:5px 8px;border-bottom:1px solid var(--line)">${c}</th>`).join('')}</tr></thead>` : '') + `<tbody>${rows.map(r => `<tr>${r.map(c => `<td style="padding:5px 8px;border-bottom:1px solid var(--line)">${c}</td>`).join('')}</tr>`).join('')}</tbody>` });
}
