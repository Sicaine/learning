// D31 pn-junction — Kristall, Dotierung, Raumladungszone und Diodenstrom (L28 halbleiter-pn).
// Regler: Dotierung N, äußere Spannung U, Temperatur. Ziele: Sperrrichtung, Schwelle (1 mA) entdecken, Temperatur.
// params: { targetI?: A (Standard 1 mA), hotC?: °C (Standard 100), reverseV?: V (Standard 3) }
import { plot } from '../../../assets/js/vizkit/plot.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { animate } from '../../../assets/js/vizkit/anim.js';
import { fmt } from '../../../assets/js/vizkit/si.js';
import { h, s } from '../../../assets/js/vizkit/base.js';
import { vt, KB_EV, K0 } from './_5a-diode.js';

const Q = 1.602e-19, EPS = 11.7 * 8.854e-12, EG = 1.12;
const ni = T => 1e10 * (T / K0) ** 1.5 * Math.exp(-EG / (2 * KB_EV) * (1 / T - 1 / K0));   // cm⁻³
const vbi = (N, T) => vt(T) * Math.log((N * N) / (ni(T) * ni(T)));                          // V (symmetrisch dotiert)
const width = (N, T, U) => { const v0 = vbi(N, T), w0 = Math.sqrt(2 * EPS * v0 / Q * (2 / (N * 1e6))); return w0 * Math.sqrt(Math.max(0.03, (v0 - U) / v0)); };
const IS0 = 1e-14;
const isT = T => IS0 * (T / K0) ** 3 * Math.exp(EG / KB_EV * (1 / K0 - 1 / T));
const current = (U, T, N) => {
  const f = Math.exp(Math.min(U / vt(T), 700)) - 1;
  if (U >= 0) return isT(T) * f;
  return -isT(T) * (width(N, T, U) / width(N, T, 0));     // Sperrstrom wächst mit der Breite der Zone (Generation)
};

export default function mount(stage, { params = {}, complete, md }) {
  const targetI = params.targetI ?? 1e-3, hotC = params.hotC ?? 100, revV = params.reverseV ?? 3;
  const root = h('div', { class: 'vz vk' }); stage.append(root);

  // ── Kristallbild ─────────────────────────────────────────────────────────────
  const VW = 600, VH = 250, X0 = 30, X1 = 570, XM = 300, Y0 = 52, Y1 = 206;
  const wrap = h('div', { class: 'vk-sch' }); root.append(wrap);
  const svg = s('svg', { viewBox: `0 0 ${VW} ${VH}`, role: 'img', 'aria-label': 'Kristall mit n- und p-Gebiet und Raumladungszone', preserveAspectRatio: 'xMidYMid meet' });
  wrap.append(svg);
  svg.append(s('style', {}, '.pj-t{font:600 13px var(--sans);fill:var(--ink-2)} .pj-s{font:500 11px var(--mono);fill:var(--muted)}'));
  const gBack = s('g'), gZone = s('g'), gIons = s('g'), gMobile = s('g'), gFlow = s('g'), gTxt = s('g');
  svg.append(gBack, gZone, gIons, gMobile, gFlow, gTxt);
  gBack.append(
    s('rect', { x: X0, y: Y0, width: XM - X0, height: Y1 - Y0, fill: 'color-mix(in oklab, var(--accent) 7%, var(--surface))', stroke: 'var(--line-2)' }),
    s('rect', { x: XM, y: Y0, width: X1 - XM, height: Y1 - Y0, fill: 'color-mix(in oklab, var(--bad) 6%, var(--surface))', stroke: 'var(--line-2)' }));
  // Kristallgitter (Atome als graue Punkte)
  for (let x = X0 + 14; x < X1; x += 28) for (let y = Y0 + 14; y < Y1; y += 28) gBack.append(s('circle', { cx: x, cy: y, r: 2.2, fill: 'var(--line-2)' }));
  const lab = (x, y, t, cls = 'pj-t', anchor = 'middle') => gTxt.append(s('text', { x, y, 'text-anchor': anchor, class: cls }, t));
  lab((X0 + XM) / 2, 22, 'n-Gebiet (Elektronen)'); lab((XM + X1) / 2, 22, 'p-Gebiet (Löcher)');
  lab(X0, 40, 'Kathode', 'pj-s', 'start'); lab(X1, 40, 'Anode', 'pj-s', 'end');
  const sgnL = s('text', { x: X0 + 6, y: Y1 + 28, class: 'pj-t' }), sgnR = s('text', { x: X1 - 6, y: Y1 + 28, class: 'pj-t', 'text-anchor': 'end' });
  const mid = s('text', { x: XM, y: Y1 + 28, class: 'pj-s', 'text-anchor': 'middle' });
  gTxt.append(sgnL, sgnR, mid);
  const zone = s('rect', { y: Y0, height: Y1 - Y0, fill: 'var(--warn)', 'fill-opacity': 0.18, stroke: 'var(--warn)', 'stroke-dasharray': '4 3', 'stroke-opacity': 0.7 });
  const field = s('path', { stroke: 'var(--warn)', 'stroke-width': 2.2, fill: 'none', 'marker-end': 'url(#pj-arrow)' });
  const arrowDef = s('defs', {}, s('marker', { id: 'pj-arrow', viewBox: '0 0 10 10', refX: 8, refY: 5, markerWidth: 6, markerHeight: 6, orient: 'auto' }, s('path', { d: 'M0 0L10 5L0 10Z', fill: 'var(--warn)' })));
  const fieldTxt = s('text', { class: 'pj-s', 'text-anchor': 'middle', y: Y0 + 14 });
  gZone.append(arrowDef, zone, field, fieldTxt);

  // Fixe Ionen (Donatoren + / Akzeptoren −) und gebundene bewegliche Ladungsträger
  const rnd = mulberry(7);
  const sites = [];
  for (let x = X0 + 14; x < X1; x += 28) for (let y = Y0 + 14; y < Y1; y += 28) sites.push({ x, y, side: x < XM ? 'n' : 'p' });
  shuffle(sites, rnd);
  let donors = [], acceptors = [], flowP = [];
  const mkIon = (st, plus) => {
    const g = s('g', { transform: `translate(${st.x} ${st.y})` });
    g.append(s('circle', { r: 6.5, fill: plus ? 'var(--bad)' : 'var(--accent)', 'fill-opacity': 0.9 }), s('path', { d: plus ? 'M-3.4 0H3.4M0 -3.4V3.4' : 'M-3.4 0H3.4', stroke: '#fff', 'stroke-width': 1.7, 'stroke-linecap': 'round' }));
    return g;
  };
  const mkMobile = (st, electron) => {
    const g = s('g'); g.append(electron
      ? s('circle', { r: 4.2, fill: 'var(--accent)' })
      : s('circle', { r: 4.2, fill: 'var(--surface)', stroke: 'var(--bad)', 'stroke-width': 2 }));
    return g;
  };
  function build(N) {
    gIons.replaceChildren(); gMobile.replaceChildren(); gFlow.replaceChildren();
    const cnt = Math.round(10 + 9 * Math.log10(N / 1e15));   // 10 … 37 je Seite
    donors = sites.filter(p => p.side === 'n').slice(0, cnt).map(p => ({ ...p, ph: rnd() * 6.28, e: null }));
    acceptors = sites.filter(p => p.side === 'p').slice(0, cnt).map(p => ({ ...p, ph: rnd() * 6.28, e: null }));
    for (const d of donors) { d.ion = mkIon(d, true); d.e = mkMobile(d, true); gIons.append(d.ion); gMobile.append(d.e); }
    for (const a of acceptors) { a.ion = mkIon(a, false); a.e = mkMobile(a, false); gIons.append(a.ion); gMobile.append(a.e); }
    flowP = [];
    for (let k = 0; k < 14; k++) for (const el of [true, false]) {
      const g = mkMobile(null, el); g.setAttribute('opacity', 0);
      g.firstChild.setAttribute('r', 5.4); if (el) g.firstChild.setAttribute('stroke', 'var(--ink)'); else g.firstChild.setAttribute('fill', 'var(--bad)');
      if (el) { g.firstChild.setAttribute('stroke', '#fff'); g.firstChild.setAttribute('stroke-width', 1.2); }
      else { g.firstChild.setAttribute('fill', 'var(--surface)'); }
      gFlow.append(g);
      flowP.push({ g, el, x: Math.random() * (X1 - X0) + X0, y: Y0 + 12 + Math.random() * (Y1 - Y0 - 24), k });
    }
  }

  // ── Plot (Kennlinie, |I| logarithmisch) ──────────────────────────────────────
  const pbox = h('div'); root.append(pbox);
  const pl = plot(pbox, { h: 270, x: { unit: 'V', label: 'U (p positiv = Durchlass)', min: -5, max: 1, ticks: [-5, -4, -3, -2, -1, 0, 1] }, y: { scale: 'log', unit: 'A', label: '|I|', min: 1e-15, max: 10, format: v => Math.round(Math.log10(v)) % 3 === 0 ? fmt(v, 'A', 1) : '' }, legend: false, tip: (x, rows) => `<small>${fmt(x, 'V')}</small><div>${(x >= 0 ? 'Durchlass ' : 'Sperr-') }|I| ${fmt(rows[0]?.y ?? 0, 'A')}</div>` });
  const us = Array.from({ length: 241 }, (_, i) => -5 + i * 0.025);

  // ── Regler / Anzeigen ────────────────────────────────────────────────────────
  const ui = controls(root, [
    { id: 'U', label: 'Äußere Spannung U', unit: 'V', min: -5, max: 1, step: 0.01, value: 0 },
    { id: 'N', label: 'Dotierung N', min: 1e15, max: 1e18, value: 1e16, scale: 'log', snap: 'E3', format: v => sup(v) + ' cm⁻³' },
    { id: 'T', label: 'Temperatur', unit: '°C', min: -20, max: 150, step: 1, value: 27 },
  ], run);
  const out = readout(root, [
    { id: 'W', label: 'Raumladungszone', hl: true }, { id: 'I', label: 'Strom' }, { id: 'vbi', label: 'Diffusionsspannung' }, { id: 'state', label: 'Zustand' },
  ]);
  const g = goals(root, [
    { id: 'rev', label: `Sperrrichtung ≥ ${revV} V: Zone wächst` },
    { id: 'thr', label: `Durchlass: ${fmt(targetI, 'A')} erreichen` },
    { id: 'hot', label: `Erwärmen auf ≥ ${hotC} °C` },
  ], () => complete?.());
  const note = h('p', { class: 'vz-note', html: md ? md('Vereinfachtes Modell: symmetrisch dotiertes Silizium, Sperrstrom wächst mit der Zone. Ziehe $U$ von $-5\\,\\mathrm{V}$ bis $+1\\,\\mathrm{V}$ und beobachte, wo der Strom abhebt.') : '' });
  root.append(note);

  let lastN = 0, st = { flow: 0, dir: 0, wpx: 0, T: 300 };
  function run() {
    const { U, N } = ui.values, T = ui.values.T + 273.15;
    if (N !== lastN) { build(N); lastN = N; }
    const W = width(N, T, U), W0 = width(N, T, 0), I = current(U, T, N), v0 = vbi(N, T);
    const wpx = Math.max(7, Math.min(2 * (XM - X0 - 6), W / 0.43e-6 * 80));
    st.wpx = wpx; st.T = T; st.dir = U > 0 ? 1 : 0;
    st.flow = U > 0 ? Math.max(0, Math.min(1, (Math.log10(Math.max(I, 1e-12)) + 6) / 6)) : 0;
    zone.setAttribute('x', XM - wpx / 2); zone.setAttribute('width', wpx);
    const fl = Math.min(wpx - 2, 70);
    field.setAttribute('d', `M${XM - fl / 2} ${Y0 + 28}H${XM + fl / 2}`); field.setAttribute('visibility', wpx > 20 ? 'visible' : 'hidden');
    fieldTxt.textContent = wpx > 30 ? 'E' : ''; fieldTxt.setAttribute('x', XM);
    // Ladungsträger: nur außerhalb der Zone sichtbar
    for (const d of donors) { const inZone = d.x > XM - wpx / 2; d.e.setAttribute('visibility', inZone ? 'hidden' : 'visible'); }
    for (const a of acceptors) { const inZone = a.x < XM + wpx / 2; a.e.setAttribute('visibility', inZone ? 'hidden' : 'visible'); }
    // Polung der Anschlüsse
    const pol = U > 0.005 ? ['−', '+'] : U < -0.005 ? ['+', '−'] : ['', ''];
    sgnL.textContent = pol[0] ? `${pol[0]} (Kathode)` : ''; sgnR.textContent = pol[1] ? `(Anode) ${pol[1]}` : '';
    sgnL.setAttribute('fill', pol[0] === '+' ? 'var(--bad)' : 'var(--accent)'); sgnR.setAttribute('fill', pol[1] === '+' ? 'var(--bad)' : 'var(--accent)');
    mid.textContent = `Zone: ${fmt(W, 'm')} · U_D = ${fmt(U, 'V')}`;
    pl.line('i', us, us.map(u => Math.abs(current(u, T, N))), { color: 'var(--accent)', width: 2.4 });
    pl.hline('thr', targetI, { label: fmt(targetI, 'A'), color: 'var(--muted)', dash: '3 4' });
    pl.vline('vbi', v0, { color: 'var(--warn)', label: 'U_Diff', dash: '3 4' });
    pl.marker('op', U, Math.max(Math.abs(I), 1.2e-15), { label: fmt(Math.abs(I), 'A') });
    out.set({ W: fmt(W, 'm'), I: (I < 0 ? '−' : '') + fmt(Math.abs(I), 'A'), vbi: fmt(v0, 'V'), state: U > 0.1 && I > 1e-6 ? 'leitet' : U < 0 ? 'sperrt' : 'beginnt' });
    if (U <= -revV && W > W0 * 1.5) g.reach('rev');
    if (I >= targetI) g.reach('thr');
    if (ui.values.T >= hotC) g.reach('hot');
  }
  animate(root, (dt, t) => {
    const amp = 1.4 + 1.8 * Math.sqrt(st.T / 300);   // thermische Unruhe
    for (const d of donors) d.e.setAttribute('transform', `translate(${d.x + 9 * Math.cos(d.ph + t * 2.1) + amp * Math.sin(t * 7 + d.ph)} ${d.y + 9 * Math.sin(d.ph * 1.7 + t * 1.8)})`);
    for (const a of acceptors) a.e.setAttribute('transform', `translate(${a.x + 9 * Math.cos(a.ph + t * 1.9) + amp * Math.sin(t * 6 + a.ph)} ${a.y + 9 * Math.sin(a.ph * 1.3 + t * 2.2)})`);
    const n = Math.round(st.flow * 14), v = 60 + 220 * st.flow;
    for (const p of flowP) {
      const on = st.dir && p.k < n;
      p.g.setAttribute('opacity', on ? 1 : 0);
      if (!on) continue;
      p.x += (p.el ? 1 : -1) * v * dt; if (p.x > X1) p.x = X0; if (p.x < X0) p.x = X1;
      p.g.setAttribute('transform', `translate(${p.x} ${p.y})`);
    }
  });
  run();
}

const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
function sup(v) { const e = Math.floor(Math.log10(v) + 1e-9), m = v / 10 ** e; return (Math.abs(m - 1) < 0.05 ? '' : (+m.toFixed(1)).toString().replace('.', ',') + '·') + '10' + String(e).split('').map(c => SUP[c]).join(''); }
function mulberry(a) { return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function shuffle(a, r) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
