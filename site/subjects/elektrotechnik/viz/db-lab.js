// db-lab (D28): Dezibel-Umrechner mit Merkwert-Tabelle und Signalkette mit dBm-Wasserfall.
// params: { mode?: 'both' | 'convert' | 'chain', startW?: 10, targetW?: 50, tolPct?: 3, parts?: [{ id, label, db }], goals?: [...] (Umrechner) }
//   Umrechner-Ziele (Standard): Leistung verdoppeln = +3 dB, Spannung verzehnfachen = +20 dB, Leistung auf 1/10 = −10 dB.
//   Kette: Startleistung startW; Glieder aus der Palette anklicken, ◀ ▶ ordnen, ✕ entfernen; Ziel: Endleistung ≈ targetW.
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { fmt, dbmToWatt, wattToDbm } from '../../../assets/js/vizkit/si.js';
import { onResize } from '../../../assets/js/vizkit/anim.js';
import { h, s, boxWidth, esc } from '../../../assets/js/vizkit/base.js';

const PARTS = [
  { id: 'cable3', label: 'Kabel', db: -3 }, { id: 'cable6', label: 'langes Kabel', db: -6 }, { id: 'att10', label: 'Dämpfungsglied', db: -10 },
  { id: 'filt1', label: 'Tiefpassfilter', db: -1 }, { id: 'amp10', label: 'Vorverstärker', db: 10 }, { id: 'amp20', label: 'Endstufe', db: 20 },
];
const ROWS = [-20, -10, -6, -3, 0, 3, 6, 10, 20, 30, 40];
const sgn = d => (d > 0 ? '+' : d < 0 ? '−' : '±') + Math.abs(d);
const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
const dec = x => {   // Faktor als Dezimalzahl (Komma), große/kleine Werte als Zehnerpotenz
  if (x >= 1e5 || x < 1e-3) { const [m, e] = x.toExponential(2).split('e'); return (+m).toString().replace('.', ',') + '·10' + String(+e).split('').map(c => SUP[c]).join(''); }
  return String(+x.toPrecision(3)).replace('.', ',');
};

export default function mount(stage, { params = {}, complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const mode = params.mode ?? 'both';
  let tabs = null;
  const pA = h('div', { class: 'vk' }), pB = h('div', { class: 'vk' });
  if (mode === 'both') {
    tabs = controls(root, [{ id: 'tab', type: 'seg', options: [['convert', 'Umrechner'], ['chain', 'Signalkette']], value: 'convert' }], v => { pA.style.display = v.tab === 'convert' ? '' : 'none'; pB.style.display = v.tab === 'chain' ? '' : 'none'; });
    pB.style.display = 'none';
  }
  root.append(...(mode === 'convert' ? [pA] : mode === 'chain' ? [pB] : [pA, pB]));
  let doneA = mode === 'chain', doneB = mode === 'convert';
  const fin = () => { if (doneA && doneB) complete?.(); };
  if (mode !== 'chain') convert(pA, params, () => { doneA = true; fin(); });
  if (mode !== 'convert') chain(pB, params, () => { doneB = true; fin(); });
  void tabs;
}

// ── Umrechner ────────────────────────────────────────────────────────────────
function convert(root, params, done) {
  let busy = false;
  const ui = controls(root, [
    { id: 'kind', type: 'seg', options: [['P', 'Leistung: 10·lg'], ['U', 'Spannung: 20·lg']], value: 'P' },
    { id: 'db', label: 'Pegeländerung', unit: 'dB', min: -60, max: 60, step: 0.5, value: 0, digits: 3, format: v => (v > 0 ? '+' : v < 0 ? '−' : '') + String(Math.abs(v)).replace('.', ',') + ' dB' },
    { id: 'fac', label: 'Faktor', min: 0.001, max: 1e6, value: 1, scale: 'log', digits: 3, format: v => '× ' + dec(v) },
  ], (v, ch) => {
    if (busy) return; busy = true;
    const k = v.kind === 'P' ? 10 : 20;
    if (ch === 'fac') ui.set({ db: Math.round(k * Math.log10(v.fac) * 2) / 2 }, { silent: true });
    else if (ch === 'db') ui.set({ fac: 10 ** (v.db / k) }, { silent: true });
    else if (ch === 'kind') ui.set({ fac: 10 ** (v.db / k) }, { silent: true });
    busy = false; show();
  });
  const out = readout(root, [{ id: 'p', label: 'Leistungsfaktor', hl: true }, { id: 'u', label: 'Spannungs-/Stromfaktor', hl: true }, { id: 'txt', label: 'in Worten' }]);
  const rows = ROWS.map(d => h('tr', {}, h('td', { text: sgn(d) + ' dB', style: 'font-weight:600' }), h('td', { text: '× ' + dec(10 ** (d / 10)) }), h('td', { text: '× ' + dec(10 ** (d / 20)) })));
  const table = h('table', { style: 'border-collapse:collapse;font:500 .8rem var(--mono);width:100%;max-width:420px' },
    h('tr', {}, h('th', { text: 'Pegel', style: 'text-align:left' }), h('th', { text: 'Leistung', style: 'text-align:left' }), h('th', { text: 'Spannung', style: 'text-align:left' })), ...rows);
  table.querySelectorAll('td,th').forEach(c => { c.style.padding = '3px 8px'; c.style.borderBottom = '1px solid var(--line)'; });
  root.append(h('div', { class: 'vz-note', text: 'Merkwerte (gerundet: 3 dB ≈ 2, 6 dB ≈ 4, 10 dB = 10, 20 dB = 100 bei Leistung):' }), table);
  const tg = params.goals ?? [
    { id: 'p2', label: 'Leistung verdoppeln: ≈ +3 dB', kind: 'P', fac: 2 }, { id: 'u10', label: 'Spannung × 10: +20 dB', kind: 'U', fac: 10 }, { id: 'p01', label: 'Leistung auf ein Zehntel: −10 dB', kind: 'P', fac: 0.1 },
  ];
  const g = goals(root, tg.map(({ id, label }) => ({ id, label })), done);
  function show() {
    const v = ui.values, k = v.kind === 'P' ? 10 : 20, pf = 10 ** (v.db / 10), uf = 10 ** (v.db / 20);
    out.set({ p: '× ' + dec(pf), u: '× ' + dec(uf), txt: v.db === 0 ? 'unverändert' : `${v.db > 0 ? 'Verstärkung' : 'Dämpfung'} ${Math.abs(v.db)} dB` });
    rows.forEach((r, i) => { const on = Math.abs(v.db - ROWS[i]) < 0.26; r.style.background = on ? 'var(--accent-soft, #e8f2fa)' : ''; });
    for (const t of tg) if (v.kind === t.kind && Math.abs(10 ** (v.db / k) / t.fac - 1) < 0.045) g.reach(t.id);
  }
  show();
}

// ── Signalkette ──────────────────────────────────────────────────────────────
function chain(root, params, done) {
  const P0 = params.startW ?? 10, target = params.targetW ?? 50, tol = (params.tolPct ?? 3) / 100, parts = params.parts ?? PARTS;
  const items = [];
  const pal = h('div', { class: 'vz-seg vk-presets', style: 'flex-wrap:wrap;height:auto' });
  const lane = h('div', { style: 'display:flex;flex-wrap:wrap;gap:8px;align-items:center;min-height:42px' });
  const box = h('div', { class: 'vk-plot' }); const svg = s('svg', { role: 'img', 'aria-label': 'Pegeldiagramm der Signalkette' }); box.append(svg);
  root.append(h('div', { class: 'vz-note', html: `Der Sender liefert <b>${fmt(P0, 'W')}</b> (= ${fmt(wattToDbm(P0), 'dBm', 3)}). Baue eine Kette, die am Ende <b>${fmt(target, 'W')}</b> ergibt. Tippe die Glieder an:` }), pal, lane, box);
  for (const p of parts) pal.append(h('button', { type: 'button', text: `${p.label} ${sgn(p.db)} dB`, onclick: () => { items.push({ ...p }); draw(); } }));
  pal.append(h('button', { type: 'button', text: 'Leeren', onclick: () => { items.length = 0; draw(); }, style: 'color:var(--muted)' }));
  const out = readout(root, [{ id: 'sum', label: 'Summe Verstärkung/Dämpfung', hl: true }, { id: 'dbm', label: 'Ausgangspegel' }, { id: 'w', label: 'Ausgangsleistung', hl: true }]);
  const g = goals(root, [{ id: 'goal', label: `Endleistung ≈ ${fmt(target, 'W')} (±${params.tolPct ?? 3} %)` }], done);

  function draw() {
    lane.replaceChildren(h('span', { class: 'vz-stat', text: `Sender ${fmt(P0, 'W')}` }));
    items.forEach((it, i) => {
      const c = h('span', { class: 'vz-stat', style: `display:inline-flex;gap:6px;align-items:center;border-color:${it.db < 0 ? 'var(--bad)' : 'var(--good)'}` },
        `${it.label} ${sgn(it.db)} dB`,
        h('button', { type: 'button', class: 'btn small ghost', text: '◀', 'aria-label': 'nach vorn', disabled: i === 0, style: 'padding:0 6px;min-height:24px', onclick: () => { [items[i - 1], items[i]] = [items[i], items[i - 1]]; draw(); } }),
        h('button', { type: 'button', class: 'btn small ghost', text: '▶', 'aria-label': 'nach hinten', disabled: i === items.length - 1, style: 'padding:0 6px;min-height:24px', onclick: () => { [items[i + 1], items[i]] = [items[i], items[i + 1]]; draw(); } }),
        h('button', { type: 'button', class: 'btn small ghost', text: '✕', 'aria-label': 'entfernen', style: 'padding:0 6px;min-height:24px', onclick: () => { items.splice(i, 1); draw(); } }));
      lane.append(c);
    });
    const lv = [wattToDbm(P0)]; for (const it of items) lv.push(lv[lv.length - 1] + it.db);
    const sum = items.reduce((a, b) => a + b.db, 0), Pend = dbmToWatt(lv[lv.length - 1]);
    out.set({ sum: sum === 0 ? '0 dB' : `${sgn(sum)} dB`.replace('.', ','), dbm: fmt(lv[lv.length - 1], 'dBm', 3), w: fmt(Pend, 'W', 3) });
    waterfall(lv);
    if (items.length && Math.abs(Pend / target - 1) <= tol) g.reach('goal');
  }

  let curW = Math.round(boxWidth(root, 320, 700)), lastLv = [];
  onResize(box, w => { if (w > 0 && Math.abs(Math.max(300, Math.min(700, Math.round(w))) - curW) > 1) { curW = Math.max(300, Math.min(700, Math.round(w))); waterfall(lastLv); } });
  function waterfall(lv) {
    lastLv = lv;
    const W = curW, H = 250, ml = 62, mr = 70, mt = 16, mb = 46, n = lv.length;
    const tgt = wattToDbm(target);
    const lo = Math.floor((Math.min(...lv, tgt) - 6) / 10) * 10, hi = Math.ceil((Math.max(...lv, tgt) + 6) / 10) * 10;
    const Y = d => mt + (1 - (d - lo) / (hi - lo)) * (H - mt - mb), colW = (W - ml - mr) / Math.max(n, 3), X = i => ml + colW * (i + 0.5);
    let g = '';
    for (let d = lo; d <= hi; d += 10) g += `<line x1="${ml}" x2="${W - mr}" y1="${Y(d)}" y2="${Y(d)}" stroke="var(--line)"/><text x="${ml - 8}" y="${Y(d) + 4}" text-anchor="end" style="font:11px var(--mono)">${d} dBm</text><text x="${W - mr + 8}" y="${Y(d) + 4}" style="font:11px var(--mono)">${esc(fmt(dbmToWatt(d), 'W', 2))}</text>`;
    g += `<line x1="${ml}" x2="${W - mr}" y1="${Y(tgt)}" y2="${Y(tgt)}" stroke="var(--accent-2)" stroke-width="1.6" stroke-dasharray="6 4"/><text x="${ml + 4}" y="${Y(tgt) - 5}" text-anchor="start" style="font:600 11px var(--mono);fill:var(--accent-2)">Ziel ${esc(fmt(target, 'W'))}</text>`;
    const bw = Math.min(46, colW * 0.62);
    for (let i = 0; i < n; i++) {
      const x = X(i), y = Y(lv[i]);
      if (i === 0) g += `<rect x="${x - bw / 2}" y="${y}" width="${bw}" height="${Math.max(2, Y(lo) - y)}" rx="4" fill="var(--accent)" opacity=".85"/>`;
      else { const y0 = Y(lv[i - 1]); g += `<line x1="${X(i - 1) + bw / 2}" x2="${x - bw / 2}" y1="${y0}" y2="${y0}" stroke="var(--ink-2)" stroke-dasharray="3 3"/><rect x="${x - bw / 2}" y="${Math.min(y, y0)}" width="${bw}" height="${Math.max(2, Math.abs(y - y0))}" rx="4" fill="${lv[i] < lv[i - 1] ? 'var(--bad)' : 'var(--good)'}" opacity=".85"/>`; }
      g += `<text x="${x}" y="${y - 6}" text-anchor="middle" style="font:600 11px var(--mono);fill:var(--ink)">${esc(fmt(lv[i], 'dBm', 3))}</text>`;
      g += `<text x="${x}" y="${H - mb + 16}" text-anchor="middle" style="font:600 11px var(--sans);fill:var(--ink-2)">${i === 0 ? 'Sender' : esc(sgn(items[i - 1].db) + ' dB')}</text><text x="${x}" y="${H - mb + 31}" text-anchor="middle" style="font:11px var(--mono)">${esc(fmt(dbmToWatt(lv[i]), 'W', 3))}</text>`;
    }
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`); svg.innerHTML = g;
  }
  draw();
}
