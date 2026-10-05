// Rufzeichenplan-Explorer (Vfg. 15/2025, gültig ab 01.04.2025): Rufzeichen eingeben → Zweck, Klasse, Befristung.
// params: { goals?: [...] }
import { h } from '../../../assets/js/vizkit/base.js';
import { goals } from '../../../assets/js/vizkit/controls.js';

const PURPOSE = {
  PZ: 'personengebundenes Rufzeichen', KS: 'Klubstation', RL: 'Relaisfunkstelle', FB: 'Funkbake', SZ: 'besondere experimentelle Studien (§ 16 Abs. 2 AFuV)',
  AB: 'Ausbildungsrufzeichen (alt, läuft aus)', KSB: 'Klubstation für BOS-Angehörige', KSO: 'Klubstation einer Notfunkgruppe',
};
// Nr. 1 (2–3-buchstabige Suffixe): [Reihe von, bis, Zwecke, Klasse, Hinweis]
const T1 = [
  ['DA0', 'DA0', 'KS', 'A'], ['DA1', 'DA2', 'PZ', 'A'], ['DA4', 'DA4', 'SZ', 'E'], ['DA5', 'DA5', 'SZ', 'A'], ['DA6', 'DA6', 'PZ', 'E'], ['DA7', 'DA7', 'KS', 'E'], ['DA8', 'DA8', 'KS', 'N'],
  ['DB0', 'DB0', 'RL FB', 'A', 'Klubstationen laufen aus'], ['DB1', 'DB9', 'PZ', 'A'], ['DC0', 'DD9', 'PZ', 'A', 'Klubstationen laufen aus'],
  ['DF0', 'DF0', 'KS', 'A', 'Relais/Baken laufen aus'], ['DF1', 'DF9', 'PZ', 'A'], ['DG0', 'DH9', 'PZ', 'A', 'Klubstationen laufen aus'], ['DJ0', 'DJ9', 'PZ', 'A'],
  ['DK0', 'DK0', 'KS', 'A', 'Relais/Baken laufen aus'], ['DK1', 'DK9', 'PZ', 'A'], ['DL0', 'DL0', 'KS', 'A', 'Relais/Baken laufen aus'], ['DL1', 'DL9', 'PZ', 'A'],
  ['DM0', 'DM0', 'RL FB', 'A'], ['DM1', 'DM9', 'PZ', 'A'], ['DN0', 'DN0', 'KS', 'E', 'läuft aus'], ['DN1', 'DN6', 'AB', 'A', 'läuft aus'], ['DN7', 'DN8', 'AB', 'E', 'läuft aus'], ['DN9', 'DN9', 'PZ', 'N'],
  ['DO0', 'DO0', 'RL FB', 'E', 'Klubstationen laufen aus'], ['DO1', 'DO9', 'PZ', 'E'],
  ['DP0', 'DP1', 'KS RL FB SZ', 'A', 'exterritorialer Standort'], ['DP2', 'DP2', 'KS RL FB SZ', 'E', 'exterritorialer Standort'], ['DP8', 'DP8', 'KS RL FB SZ', 'N', 'mit/ohne exterritorialem Standort'],
  ['DR1', 'DR1', 'KSB', 'A'], ['DR2', 'DR2', 'KSB', 'E'], ['DR3', 'DR3', 'KSB', 'N'], ['DR4', 'DR4', 'KSO', 'A'], ['DR5', 'DR5', 'KSO', 'E'], ['DR6', 'DR6', 'KSO', 'N'],
];
// Nr. 2 (1-buchstabiger Suffix → immer Klubstation): [von, bis, Klasse, Hinweis]
const T2 = [
  ['DA0', 'DA1', 'A'], ['DA2', 'DA3', 'A'], ['DA4', 'DA4', 'E', 'SZ (als Klubstation)'], ['DA5', 'DA5', 'A', 'SZ (als Klubstation)'], ['DA6', 'DA7', 'E'], ['DA8', 'DA8', 'N'], ['DA9', 'DA9', 'E'],
  ['DB0', 'DD9', 'A'], ['DF0', 'DH9', 'A'], ['DJ0', 'DM9', 'A'], ['DN0', 'DN0', 'E', 'läuft aus'], ['DO0', 'DO9', 'E'],
  ['DP0', 'DP1', 'A', 'exterritorial'], ['DP2', 'DP2', 'E', 'exterritorial'], ['DP3', 'DP7', 'A'], ['DP8', 'DP8', 'N', 'mit/ohne exterritorialem Standort'], ['DP9', 'DP9', 'A'], ['DQ0', 'DR9', 'A'],
];
const inRange = (p, a, b) => p >= a && p <= b;

export function analyse(raw) {
  const c = raw.toUpperCase().replace(/[Ø]/g, '0').replace(/\s+/g, '');
  const m = c.match(/^([A-Z]{2})(\d)([A-Z0-9]+)$/);
  if (!m) return { ok: false, msg: 'Kein deutsches Rufzeichen-Muster: 2 Buchstaben, 1 Ziffer, dann der Suffix.' };
  const [, pre2, dig, suf] = m; const p = pre2 + dig;
  if (pre2 < 'DA' || pre2 > 'DR' || pre2 === 'DE' || pre2 === 'DI') return { ok: false, msg: `Das Präfix ${pre2} gehört nicht zu den deutschen Reihen DA–DR (ohne DE und DI).` };
  if (!/[A-Z]$/.test(suf)) return { ok: false, msg: 'Ein Suffix muss mit einem Buchstaben enden.' };
  if (suf.length > 7) return { ok: false, msg: 'Der Suffix darf höchstens 7 Zeichen lang sein.' };
  const res = { ok: true, call: c, p, suf };
  if (suf.length === 1) {
    const r = T2.find(x => inRange(p, x[0], x[1]));
    if (!r) return { ok: false, msg: `Die Reihe ${p} hat keine Rufzeichen mit einbuchstabigem Suffix.` };
    return { ...res, kind: 'KS', purpose: 'Klubstation', cls: r[2], note: [r[3], 'Zuteilung bis zu 5 Jahre (Rufzeichenplan Nr. 8)'].filter(Boolean).join('; '), code: 'KS' };
  }
  if (suf.length >= 4) {
    const r = T1.find(x => inRange(p, x[0], x[1]));
    if (!r) return { ok: false, msg: `Die Reihe ${p} kommt im Rufzeichenplan nicht vor.` };
    return { ...res, kind: 'event', purpose: 'Klubstation für einen besonderen allgemeinen Anlass (Sonderrufzeichen)', cls: null, note: 'Suffix mit 4 bis 7 Zeichen (Ziffern erlaubt, letztes Zeichen ein Buchstabe); höchstens 1 Jahr, nicht verlängerbar.', code: 'EV' };
  }
  if (!/^[A-Z]+$/.test(suf)) return { ok: false, msg: 'Mit 2–3 Zeichen darf der Suffix nur aus Buchstaben bestehen (Ziffern gibt es nur bei Sonderrufzeichen mit 4–7 Zeichen).' };
  const r = T1.find(x => inRange(p, x[0], x[1]));
  if (!r) return { ok: false, msg: `Die Reihe ${p} kommt im Rufzeichenplan nicht vor.` };
  const codes = r[2].split(' ');
  return { ...res, kind: codes[0], purpose: codes.map(k => PURPOSE[k]).join(' / '), cls: r[3], note: r[4] || (codes.includes('RL') ? 'Befristung bis zu 5 Jahre' : codes[0] === 'SZ' ? 'Befristung bis zu 5 Jahre' : ''), code: codes.join('/') };
}

const EXAMPLES = ['DL1PZ', 'DO7PR', 'DA0ABC', 'DL0XK', 'DA5XX', 'DP0POL', 'DB0FC', 'DL250BTHVN', 'DR4ABC'];
const GOALS = {
  ks_e: { label: 'Klubstation der Klasse E finden', test: a => a.ok && a.kind === 'KS' && a.cls === 'E' },
  sz: { label: 'Rufzeichen für experimentelle Studien (Klasse E)', test: a => a.ok && a.kind === 'SZ' && a.cls === 'E' },
  exterr: { label: 'exterritoriale Station der Klasse E', test: a => a.ok && /^DP2/.test(a.call) },
  event: { label: 'Sonderrufzeichen bilden', test: a => a.ok && a.kind === 'event' },
  notfunk: { label: 'Notfunk-Klubstation (DR4–DR6)', test: a => a.ok && a.kind === 'KSO' },
};

export default function mount(stage, { params = {}, complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const input = h('input', { type: 'text', value: 'DA0ABC', 'aria-label': 'Rufzeichen', autocapitalize: 'characters', spellcheck: 'false', style: 'font:600 1.2rem var(--mono);padding:8px 12px;border:1px solid var(--line-2);border-radius:10px;width:11em;max-width:100%;text-transform:uppercase' });
  const chips = h('div', { class: 'chips', style: 'margin:8px 0' }, EXAMPLES.map(e => h('button', { type: 'button', class: 'chip-f', text: e, onclick: () => { input.value = e; run(); } })));
  const out = h('div', { class: 'vz-stat', style: 'display:block;padding:14px 16px;margin:10px 0;line-height:1.55' });
  root.append(h('div', { class: 'vz-note', html: 'Gib ein deutsches Rufzeichen ein (oder tippe ein Beispiel an) — der Plan sagt dir, <b>was für eine Station</b> dahintersteckt.' }), h('div', { style: 'margin-top:8px' }, input), chips, out);
  const ids = params.goals ?? Object.keys(GOALS);
  const g = goals(root, ids.map(id => ({ id, label: GOALS[id].label })), () => complete?.());
  function run() {
    const a = analyse(input.value);
    if (!a.ok) { out.innerHTML = `<b style="color:var(--bad)">Ungültig.</b> ${a.msg}`; return; }
    const pre = a.call.slice(0, 2), dig = a.call[2];
    out.innerHTML = `<div style="font:700 1.25rem var(--mono);margin-bottom:6px"><span style="color:var(--accent)">${pre}</span><span style="color:var(--accent-2)">${dig}</span>${a.suf}</div>`
      + `<div><b>Reihe:</b> ${a.p}…</div><div><b>Station:</b> ${a.purpose}</div><div><b>Klasse:</b> ${a.cls ? 'Klasse ' + a.cls : 'laut Plan nicht gesondert angegeben'}</div>`
      + (a.note ? `<div style="color:var(--ink-2)"><b>Hinweis:</b> ${a.note}</div>` : '');
    for (const id of ids) if (GOALS[id].test(a)) g.reach(id);
  }
  input.addEventListener('input', run);
  run();
}
