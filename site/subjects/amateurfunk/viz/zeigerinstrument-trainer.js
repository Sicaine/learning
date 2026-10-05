// Zeigerinstrument-Ablesetrainer: Messbereich und Skala wählen, Spannung richtig ablesen (Skalen 0–100 und 0–30).
// params: { need?: Serie richtiger Antworten (Standard 4) }
import { h, s } from '../../../assets/js/vizkit/base.js';
import { readout, goals } from '../../../assets/js/vizkit/controls.js';

const RANGES = [1, 3, 10, 30, 100, 300];
const fmtV = v => (+v.toPrecision(3)).toString().replace('.', ',');
const CX = 200, CY = 250, RO = 200, A0 = -58, A1 = 58;   // Winkel von der Senkrechten
const pt = (r, deg) => { const a = deg * Math.PI / 180; return [CX + r * Math.sin(a), CY - r * Math.cos(a)]; };
const ang = (v, max) => A0 + (A1 - A0) * v / max;

function scale(max, r, majorEvery, minorEvery, labelFmt, inside) {
  const out = [];
  out.push(s('path', { d: `M${pt(r, A0).join(',')} A${r},${r} 0 0 1 ${pt(r, A1).join(',')}`, fill: 'none', stroke: 'var(--ink)', 'stroke-width': 1.4 }));
  for (let v = 0; v <= max + 1e-9; v += minorEvery) {
    const major = Math.abs(v / majorEvery - Math.round(v / majorEvery)) < 1e-9;
    const a = ang(v, max), len = major ? 12 : 6;
    const [x1, y1] = pt(r, a), [x2, y2] = pt(r + (inside ? -len : len), a);
    out.push(s('line', { x1, y1, x2, y2, stroke: 'var(--ink)', 'stroke-width': major ? 1.6 : 0.9 }));
    if (major) { const [tx, ty] = pt(r + (inside ? -26 : 26), a); out.push(s('text', { x: tx, y: ty + 4, 'text-anchor': 'middle', 'font-size': 13, fill: 'var(--ink)' }, labelFmt(v))); }
  }
  return out;
}

export default function mount(stage, { params = {}, complete }) {
  const need = params.need ?? 4;
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const svg = s('svg', { class: 'vz-svg', viewBox: '0 0 400 270', role: 'img', 'aria-label': 'Zeigerinstrument mit zwei Skalen 0 bis 100 und 0 bis 30' });
  const needle = s('line', { x1: CX, y1: CY, x2: CX, y2: CY - 190, stroke: 'var(--bad)', 'stroke-width': 2.4, 'stroke-linecap': 'round' });
  svg.append(s('rect', { x: 0, y: 0, width: 400, height: 270, fill: '#fff', rx: 10 }),
    ...scale(100, 185, 10, 1, v => v, false), ...scale(30, 140, 5, 0.5, v => v, true),
    s('text', { x: CX, y: 215, 'text-anchor': 'middle', 'font-size': 30, fill: 'var(--ink)' }, 'V'), needle,
    s('circle', { cx: CX, cy: CY, r: 7, fill: 'var(--ink)' }));
  root.append(svg);
  const info = h('div', { class: 'vz-stat hl', style: 'display:block;font-size:1.05rem;padding:10px 14px;margin:8px 0' });
  const inp = h('input', { type: 'text', inputmode: 'decimal', 'aria-label': 'Spannung in Volt', placeholder: 'Spannung', style: 'font:600 1.1rem var(--mono);padding:8px 12px;border:1px solid var(--line-2);border-radius:10px;width:9em;max-width:100%' });
  const ok = h('button', { type: 'button', class: 'btn primary', text: 'Prüfen' });
  const nx = h('button', { type: 'button', class: 'btn ghost', text: 'Weiter', style: 'display:none' });
  const fb = h('div', { class: 'vz-note', style: 'margin-top:8px;min-height:2.6em' });
  root.append(info, h('div', { style: 'display:flex;gap:8px;flex-wrap:wrap;align-items:center' }, inp, h('span', { style: 'font:600 1.1rem var(--mono)', text: 'V' }), ok, nx), fb);
  const out = readout(root, [{ id: 'streak', label: 'Serie', hl: true }, { id: 'n', label: 'Aufgaben' }]);
  const g = goals(root, [{ id: 'g', label: `${need} Messwerte in Folge richtig` }], () => complete?.());
  let q, streak = 0, n = 0, locked = false;
  function next() {
    const range = RANGES[Math.floor(Math.random() * RANGES.length)];
    const max = String(range).startsWith('3') ? 30 : 100, step = max === 100 ? 1 : 0.5;
    const reading = Math.round((0.1 + Math.random() * 0.85) * max / step) * step;
    q = { range, max, reading, ans: reading * range / max, tol: step * range / max * 0.6 };
    needle.setAttribute('transform', `rotate(${ang(reading, max)} ${CX} ${CY})`);
    info.innerHTML = `Messbereich: <b>${range} V</b> (Vollausschlag). Welche Spannung zeigt das Instrument an?`;
    inp.value = ''; inp.disabled = false; locked = false; fb.textContent = 'Der Messbereich 10 V gehört zur Skala 0–100 (Faktor 1/10), 30 V zur Skala 0–30 (Faktor 1).';
    ok.style.display = ''; nx.style.display = 'none';
  }
  function check() {
    if (locked) return;
    const v = parseFloat(inp.value.replace(',', '.')); if (Number.isNaN(v)) return;
    locked = true; n++;
    const good = Math.abs(v - q.ans) <= q.tol + 1e-9;
    streak = good ? streak + 1 : 0;
    fb.innerHTML = (good ? '**Richtig.** ' : 'Nicht ganz. ').replace(/\*\*(.*?)\*\*/, '<b>$1</b>') + `Zeiger bei ${fmtV(q.reading)} auf der Skala 0–${q.max}. Vollausschlag ${q.range} V entspricht ${q.max} Teilstrichen, also Faktor ${fmtV(q.range / q.max)}: ${fmtV(q.reading)} · ${fmtV(q.range / q.max)} = <b>${fmtV(q.ans)} V</b>.`;
    out.set({ streak, n }); if (streak >= need) g.reach('g');
    ok.style.display = 'none'; nx.style.display = '';
  }
  ok.onclick = check; nx.onclick = next; inp.onkeydown = e => { if (e.key === 'Enter') (locked ? next : check)(); };
  root.__ans = () => q.ans;
  out.set({ streak, n }); next();
}
