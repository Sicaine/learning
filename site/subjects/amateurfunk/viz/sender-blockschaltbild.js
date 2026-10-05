// Blockschaltbild-Spiel: Stufen eines Senders, eines Geradeaus- oder eines Überlagerungsempfängers in die richtige Reihenfolge bringen
// (Stufe antippen, dann den Platz antippen). Modus 'stoer': Welche Stufen erzeugen unerwünschte Frequenzen, welche entfernen sie?
// params: { modes?: ['sender','gerade','superhet','stoer'] (Standard: sender, gerade) }
import { controls, goals } from '../../../assets/js/vizkit/controls.js';
import { h, s, txt, line, rect, shuffle } from './_funk.js';

const FN = {
  'Mikrofon': 'Wandelt Schall in eine niederfrequente elektrische Schwingung (oder: NF vom Computer).',
  'NF-Verstärker': 'Verstärkt das schwache NF-Signal (Mikrofon oder Computer).',
  'Mischer': 'Multipliziert zwei Signale: Es entstehen Summen- und Differenzfrequenz. Im Sender setzt er das NF-Signal auf den HF-Träger, im Superhet das Empfangssignal auf die Zwischenfrequenz.',
  'HF-Oszillator': 'Erzeugt die hochfrequente Schwingung (z. B. 29,5 MHz), auf der gesendet wird.',
  'Oszillator (VFO)': 'Variabler Oszillator: Seine Frequenz bestimmt, welcher Empfangsbereich auf die feste Zwischenfrequenz gemischt wird.',
  'Bandpassfilter': 'Lässt nur den gewünschten Frequenzbereich durch. Im Sender sperrt er die unerwünschten Mischprodukte, im Empfänger alles außerhalb des Bandes.',
  'HF-Verstärker': 'Verstärkt das Hochfrequenzsignal: im Sender auf die Sendeleistung, im Empfänger das schwache Antennensignal.',
  'Tiefpassfilter': 'Sperrt alles oberhalb der Grenzfrequenz: Er beseitigt die vom Leistungsverstärker erzeugten Oberwellen.',
  'ZF-Filter': 'Festfrequentes, sehr trennscharfes Filter auf der Zwischenfrequenz (z. B. 2,4 kHz für SSB, 300 Hz für CW).',
  'Demodulator': 'Gegenstück zur Modulation: gewinnt aus dem HF-/ZF-Signal wieder das NF-Signal zurück.',
  'NF-Verstärker ': 'Verstärkt das demodulierte NF-Signal für den Lautsprecher.',
  'Lautsprecher': 'Wandelt die elektrische Schwingung wieder in Schall.',
  'Antenne': 'Strahlt das Sendesignal ab bzw. nimmt die Funkwellen auf.',
};
const SPEC = {
  sender: { name: 'Sender', first: 'Mikrofon', last: 'Antenne', slots: ['NF-Verstärker', 'Mischer', 'Bandpassfilter', 'HF-Verstärker', 'Tiefpassfilter'], side: { at: 1, name: 'HF-Oszillator' }, extra: ['Demodulator', 'Lautsprecher'], hint: 'Ein einfacher Sender besteht aus Oszillator, Mischer, Filter und Leistungsverstärker.' },
  gerade: { name: 'Geradeausempfänger', first: 'Antenne', last: 'Lautsprecher', slots: ['Bandpassfilter', 'HF-Verstärker', 'Demodulator', 'NF-Verstärker '], side: null, extra: ['Mischer', 'HF-Oszillator'], hint: 'Beim Geradeausempfänger wird die Frequenz bis zum Demodulator nicht verändert.' },
  superhet: { name: 'Überlagerungsempfänger', first: 'Antenne', last: 'Lautsprecher', slots: ['Bandpassfilter', 'HF-Verstärker', 'Mischer', 'ZF-Filter', 'Demodulator', 'NF-Verstärker '], side: { at: 2, name: 'Oszillator (VFO)' }, extra: ['Tiefpassfilter', 'Mikrofon'], hint: 'Der Mischer setzt das Signal mit dem VFO auf die feste Zwischenfrequenz um, dahinter folgt das trennscharfe ZF-Filter.' },
};
const label = n => n.trim();

export default function mount(stage, { params = {}, complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const modes = params.modes ?? ['sender', 'gerade'];
  const NAMES = { ...Object.fromEntries(Object.entries(SPEC).map(([k, v]) => [k, v.name])), stoer: 'Unerwünschte Frequenzen' };
  const ui = controls(root, [{ id: 'm', type: 'seg', label: 'Aufgabe', options: modes.map(m => [m, NAMES[m]]), value: modes[0] }], v => { mode = v.m; reset(); });
  const wrap = h('div', { style: 'overflow-x:auto' }); const tray = h('div', { style: 'display:flex;flex-wrap:wrap;gap:8px;margin:10px 0' });
  const fb = h('div', { class: 'vz-note', style: 'line-height:1.55;min-height:3.2em' });
  const actions = h('div', { style: 'display:flex;gap:8px;margin:6px 0' }, h('button', { type: 'button', class: 'btn primary', text: 'Prüfen', onclick: () => check() }), h('button', { type: 'button', class: 'btn ghost', text: 'Zurücksetzen', onclick: () => reset() }));
  root.append(wrap, tray, actions, fb);
  const g = goals(root, modes.map(m => ({ id: m, label: m === 'stoer' ? 'Erzeuger und Filter der unerwünschten Frequenzen gefunden' : NAMES[m] + ': richtig geordnet' })), () => complete?.());
  let mode = modes[0], placed = [], pool = [], sel = null, marks = {}, phase = 1, result = null;

  function reset() { const sp = SPEC[mode]; placed = []; sel = null; marks = {}; phase = 1; result = null; fb.innerHTML = mode === 'stoer' ? 'Markiere zuerst alle Stufen, die <b>unerwünschte Frequenzanteile erzeugen</b> können, und tippe dann auf „Prüfen“.' : (SPEC[mode].hint); if (sp) { const all = [...sp.slots, ...(sp.side ? [sp.side.name] : []), ...sp.extra]; pool = shuffle(all); placed = new Array(sp.slots.length + (sp.side ? 1 : 0)).fill(null); } render(); }
  function render() {
    wrap.replaceChildren(); tray.replaceChildren();
    if (mode === 'stoer') return renderStoer();
    const sp = SPEC[mode], rows = sp.slots.length + 2, W = 360, Hh = 14 + rows * 44;
    const svg = s('svg', { class: 'vz-svg', viewBox: `0 0 ${W} ${Hh}`, style: 'min-width:300px', role: 'img', 'aria-label': 'Blockschaltbild ' + sp.name + ' mit freien Plätzen' });
    const X = 70, BW = 170;
    const block = (i, name, filled, state, onclick, x = X) => {
      const y = 8 + i * 44, g1 = s('g', { style: onclick ? 'cursor:pointer' : '', tabindex: onclick ? 0 : null, role: onclick ? 'button' : null, 'aria-label': name || ('Platz ' + i) });
      const col = state === 'ok' ? 'var(--good)' : state === 'bad' ? 'var(--bad)' : filled ? 'var(--accent)' : 'var(--line-2)';
      g1.append(rect(x, y, BW, 32, { r: 7, fill: filled ? 'var(--surface)' : 'var(--surface-2)', stroke: col, sw: filled ? 2 : 1.4 }), txt(x + BW / 2, y + 21, name ? label(name) : 'Platz antippen', { anchor: 'middle', size: 13, fill: name ? 'var(--ink)' : 'var(--muted)', italic: !name }));
      if (!filled) g1.firstChild.setAttribute('stroke-dasharray', '5 4');
      if (onclick) { g1.onclick = onclick; g1.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onclick(); } }; }
      return g1;
    };
    svg.append(block(0, sp.first, true, null, null), block(rows - 1, sp.last, true, null, null));
    for (let i = 0; i < sp.slots.length; i++) { svg.append(line(X + BW / 2, 8 + i * 44 + 32, X + BW / 2, 8 + (i + 1) * 44, { color: 'var(--ink-2)', w: 1.5 })); }
    svg.append(line(X + BW / 2, 8 + (rows - 2) * 44 + 32, X + BW / 2, 8 + (rows - 1) * 44, { color: 'var(--ink-2)', w: 1.5 }));
    sp.slots.forEach((_, i) => svg.append(block(i + 1, placed[i], !!placed[i], marks[i], () => put(i))));
    if (sp.side) { const i = sp.side.at + 1; svg.append(line(X + BW + 4, 8 + i * 44 + 16, X + BW + 36, 8 + i * 44 + 16, { color: 'var(--ink-2)', w: 1.5 }), s('polygon', { points: `${X + BW + 4},${8 + i * 44 + 16} ${X + BW + 12},${8 + i * 44 + 12} ${X + BW + 12},${8 + i * 44 + 20}`, fill: 'var(--ink-2)' }));
      const k = sp.slots.length; const bx = X + BW + 36; svg.append(rect(bx, 8 + i * 44, 118, 32, { r: 7, fill: placed[k] ? 'var(--surface)' : 'var(--surface-2)', stroke: marks[k] === 'ok' ? 'var(--good)' : marks[k] === 'bad' ? 'var(--bad)' : placed[k] ? 'var(--accent)' : 'var(--line-2)', sw: placed[k] ? 2 : 1.4 }), txt(bx + 59, 8 + i * 44 + 20, placed[k] ? label(placed[k]) : 'Platz', { anchor: 'middle', size: 12, fill: placed[k] ? 'var(--ink)' : 'var(--muted)', italic: !placed[k] }));
      const hit = s('rect', { x: bx, y: 8 + i * 44, width: 118, height: 32, fill: 'transparent', style: 'cursor:pointer', tabindex: 0, role: 'button', 'aria-label': 'Platz neben ' + sp.slots[sp.side.at] }); hit.onclick = () => put(k); hit.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') put(k); }; svg.append(hit); }
    svg.setAttribute('viewBox', `0 0 ${sp.side ? 404 : W} ${Hh}`);
    wrap.append(svg);
    for (const name of pool.filter(n => !placed.includes(n))) tray.append(h('button', { type: 'button', class: 'btn ' + (sel === name ? 'primary' : 'ghost') + ' small', text: label(name), onclick: () => { sel = sel === name ? null : name; if (sel) fb.innerHTML = '<b>' + label(name) + '.</b> ' + FN[name]; render(); } }));
  }
  function put(i) {
    if (sel) { const old = placed[i]; const from = placed.indexOf(sel); if (from >= 0) placed[from] = null; placed[i] = sel; sel = null; marks = {}; void old; }
    else if (placed[i]) { placed[i] = null; marks = {}; }
    render();
  }
  function check() {
    if (mode === 'stoer') return checkStoer();
    const sp = SPEC[mode], want = [...sp.slots, ...(sp.side ? [sp.side.name] : [])];
    let okN = 0; marks = {};
    want.forEach((w, i) => { if (placed[i]) { marks[i] = placed[i] === w ? 'ok' : 'bad'; if (marks[i] === 'ok') okN++; } });
    const all = okN === want.length;
    fb.innerHTML = all ? '<b style="color:var(--good)">Richtig.</b> ' + sp.hint : `<b>${okN} von ${want.length}</b> Stufen stehen richtig (grün). Rote Stufen sind am falschen Platz, leere fehlen noch. ` + sp.hint;
    if (all) g.reach(mode);
    render();
  }
  // ── Modus „unerwünschte Frequenzen“
  const CHAIN = ['Mikrofon', 'NF-Verstärker', 'Mischer', 'Bandpassfilter', 'HF-Verstärker', 'Tiefpassfilter', 'Antenne'];
  function renderStoer() {
    const W = 360, Hh = 14 + CHAIN.length * 44, svg = s('svg', { class: 'vz-svg', viewBox: `0 0 ${W + 44} ${Hh}`, role: 'img', 'aria-label': 'Sender-Blockschaltbild: Stufen antippen' }); const X = 70, BW = 170;
    CHAIN.forEach((n, i) => {
      const y = 8 + i * 44, st = marks[n] || (result?.[n]), sel2 = (phase === 1 ? marks.sel1 : marks.sel2)?.has(n);
      const col = st === 'ok' ? 'var(--good)' : st === 'bad' ? 'var(--bad)' : sel2 ? 'var(--accent)' : 'var(--line-2)';
      const gg = s('g', { style: 'cursor:pointer', tabindex: 0, role: 'button', 'aria-label': n });
      gg.append(rect(X, y, BW, 32, { r: 7, fill: sel2 ? 'color-mix(in srgb,var(--accent) 12%,#fff)' : 'var(--surface)', stroke: col, sw: sel2 || st ? 2.2 : 1.4 }), txt(X + BW / 2, y + 21, n, { anchor: 'middle', size: 13, fill: 'var(--ink)' }));
      const f = () => { const set = phase === 1 ? marks.sel1 : marks.sel2; set.has(n) ? set.delete(n) : set.add(n); result = null; fb.innerHTML = '<b>' + n + '.</b> ' + FN[n]; render(); };
      gg.onclick = f; gg.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); f(); } };
      svg.append(gg); if (i < CHAIN.length - 1) svg.append(line(X + BW / 2, y + 32, X + BW / 2, y + 44, { color: 'var(--ink-2)', w: 1.5 }));
      if (n === 'Mischer') { const bx = X + BW + 36; svg.append(line(X + BW + 4, y + 16, bx, y + 16, { color: 'var(--ink-2)', w: 1.5 }), rect(bx - 0, y, 100, 32, { r: 7, fill: 'var(--surface-2)', stroke: 'var(--line-2)' }), txt(bx + 50, y + 20, 'HF-Oszillator', { anchor: 'middle', size: 12, fill: 'var(--ink-2)' })); }
    });
    wrap.append(svg);
  }
  function checkStoer() {
    if (!marks.sel1) return;
    const A = new Set(['Mischer', 'HF-Verstärker']), B = new Set(['Bandpassfilter', 'Tiefpassfilter']);
    const set = phase === 1 ? marks.sel1 : marks.sel2, want = phase === 1 ? A : B;
    const ok = set.size === want.size && [...set].every(x => want.has(x));
    if (phase === 1) {
      fb.innerHTML = ok ? '<b style="color:var(--good)">Richtig:</b> Mischer und Verstärker arbeiten nichtlinear und erzeugen neben dem gewünschten Signal weitere Frequenzen (Mischprodukte, Oberwellen). Jetzt: Welche Stufen <b>entfernen</b> sie wieder? Markiere und tippe „Prüfen“.' : '<b style="color:var(--bad)">Noch nicht.</b> Überlege: Wo wird multipliziert (gemischt), wo verstärkt? Dort entstehen neue Frequenzen.';
      if (ok) { phase = 2; marks.sel2 = new Set(); }
    } else {
      fb.innerHTML = ok ? '<b style="color:var(--good)">Richtig.</b> Der Bandpass hinter dem Mischer sperrt die unerwünschten Mischprodukte, der Tiefpass hinter dem Leistungsverstärker die Oberwellen. Trotzdem lassen sich unerwünschte Aussendungen nie ganz vermeiden: Sie sind auf das geringstmögliche Maß zu beschränken.' : '<b style="color:var(--bad)">Noch nicht.</b> Gesucht sind zwei Filter: einer direkt hinter der Stufe, die Mischprodukte erzeugt, einer ganz am Ende vor der Antenne.';
      if (ok) g.reach('stoer');
    }
    render();
  }
  const baseReset = reset;
  reset = function () { if (mode === 'stoer') { marks = { sel1: new Set(), sel2: new Set() }; phase = 1; result = null; fb.innerHTML = 'Markiere zuerst alle Stufen, die <b>unerwünschte Frequenzanteile erzeugen</b> können, und tippe dann auf „Prüfen“.'; render(); } else baseReset(); };   // eslint-disable-line no-func-assign
  reset();
}
