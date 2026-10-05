// S-Meter ablesen und RST-Rapport geben (Telefonie: R = 5 bei einwandfreier Verständlichkeit, S vom S-Meter, T entfällt).
// Skala: S1…S9, darüber in dB (+10 … +60). params: { need?: Serie richtiger Antworten (5) }
import { h, s } from '../../../assets/js/vizkit/base.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';

// Werte 1…9 = S1…S9; 10…13 = 9+10 / +20 / +40 / +60 dB. Position auf dem Bogen (0…1): S1…S9 auf 0…0,6, dann die dB-Marken
const DB = { 10: 10, 11: 20, 12: 40, 13: 60 };
const pos = x => x <= 9 ? (x - 1) / 8 * 0.6 : 0.6 + ({ 10: 10, 11: 20, 12: 40, 13: 60 }[x] / 60) * 0.4;
const rst = x => x <= 9 ? `5${x}` : `59+${DB[x]} dB`;
const pick = a => a[Math.floor(Math.random() * a.length)];
const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const ALLV = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

function gauge(val) {
  const W = 360, H = 190, cx = 180, cy = 175, R = 140, a0 = -55, a1 = 55;
  const ang = p => (a0 + (a1 - a0) * p) * Math.PI / 180;
  const pt = (p, r) => [cx + r * Math.sin(ang(p)), cy - r * Math.cos(ang(p))];
  const svg = s('svg', { viewBox: `0 0 ${W} ${H}`, class: 'vz-svg', role: 'img', 'aria-label': 'S-Meter', style: 'max-width:420px;width:100%;display:block;margin:0 auto' });
  svg.append(s('rect', { x: 2, y: 2, width: W - 4, height: H - 4, rx: 12, fill: '#fff', stroke: 'var(--line)' }));
  const [x0, y0] = pt(0, R), [x1, y1] = pt(0.6, R), [x2, y2] = pt(1, R);
  svg.append(s('path', { d: `M${x0} ${y0} A${R} ${R} 0 0 1 ${x1} ${y1}`, fill: 'none', stroke: 'var(--ink)', 'stroke-width': 2 }),
    s('path', { d: `M${x1} ${y1} A${R} ${R} 0 0 1 ${x2} ${y2}`, fill: 'none', stroke: 'var(--bad)', 'stroke-width': 4 }));
  for (let v = 1; v <= 9; v++) {
    const [ax, ay] = pt(pos(v), R), [bx, by] = pt(pos(v), R - (v % 2 ? 14 : 9)), [tx, ty] = pt(pos(v), R - 28);
    svg.append(s('line', { x1: ax, y1: ay, x2: bx, y2: by, stroke: 'var(--ink)', 'stroke-width': 1.5 }));
    if (v % 2) svg.append(s('text', { x: tx, y: ty + 4, 'text-anchor': 'middle', 'font-size': 14, 'font-weight': 600, fill: 'var(--ink)' }, String(v)));
  }
  for (const [v, lab] of [[10, '+10'], [11, '+20'], [12, '+40'], [13, '+60']]) {
    const [ax, ay] = pt(pos(v), R), [bx, by] = pt(pos(v), R - 12), [tx, ty] = pt(pos(v), R - 28);
    svg.append(s('line', { x1: ax, y1: ay, x2: bx, y2: by, stroke: 'var(--bad)', 'stroke-width': 1.5 }),
      s('text', { x: tx, y: ty + 4, 'text-anchor': 'middle', 'font-size': 12, fill: 'var(--bad)' }, lab));
  }
  svg.append(s('text', { x: 12, y: H - 10, 'font-size': 12, fill: 'var(--muted)' }, 'S-Meter (rot: dB über S9)'));
  const needle = s('line', { x1: cx, y1: cy, x2: cx, y2: cy - R + 8, stroke: 'var(--accent)', 'stroke-width': 3, 'stroke-linecap': 'round' });
  svg.append(needle, s('circle', { cx, cy, r: 7, fill: 'var(--accent)' }));
  const set = v => { const a = (a0 + (a1 - a0) * pos(v)); needle.setAttribute('transform', `rotate(${a} ${cx} ${cy})`); };
  set(val);
  return { svg, set };
}

export default function mount(stage, { params = {}, complete }) {
  const need = params.need ?? 5;
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  let cur = 5, streak = 0, best = 0, n = 0, locked = false;
  const gz = gauge(cur); root.append(gz.svg);
  const q = h('div', { style: 'margin:10px 0 6px;font-size:1rem;line-height:1.5', html: 'Du hörst die Gegenstation in SSB-Telefonie <b>einwandfrei</b> (Lesbarkeit 5). Welchen Rapport gibst du?' });
  const opts = h('div', { style: 'display:grid;grid-template-columns:repeat(auto-fit,minmax(110px,1fr));gap:8px' });
  const fb = h('div', { class: 'vz-note', style: 'margin-top:8px;line-height:1.5' });
  const nx = h('button', { type: 'button', class: 'btn ghost', text: 'Weiter', style: 'margin-top:8px;display:none' });
  root.append(q, opts, fb, nx);
  const out = readout(root, [{ id: 's', label: 'Serie', hl: true }, { id: 'b', label: 'Beste Serie' }, { id: 'n', label: 'Aufgaben' }]);
  const g = goals(root, [{ id: 'g', label: `${need} Rapporte in Folge richtig` }], () => complete?.());
  function next() {
    let v; do v = pick(ALLV); while (v === cur); cur = v; locked = false; gz.set(cur); fb.textContent = ''; nx.style.display = 'none';
    const wrong = shuffle(ALLV.filter(x => x !== cur)).slice(0, 2).map(rst);
    const alt = cur <= 9 ? pick([String(cur), `3${cur}`]) : pick(['9', `5${DB[cur] / 10}`]);
    const set = new Set([rst(cur), ...wrong]); if (alt !== rst(cur)) set.add(alt);
    opts.replaceChildren(...shuffle([...set]).slice(0, 4).map(l => {
      const b = h('button', { type: 'button', class: 'chip', style: 'text-align:center', text: l });
      b.onclick = () => { if (locked) return; locked = true; n++; const ok = l === rst(cur);
        if (ok) { streak++; best = Math.max(best, streak); if (streak >= need) g.reach('g'); } else streak = 0;
        [...opts.children].forEach(c => { if (c.textContent === rst(cur)) { c.style.borderColor = 'var(--good)'; c.style.background = 'var(--good-soft)'; } });
        if (!ok) { b.style.borderColor = 'var(--bad)'; b.style.background = 'var(--bad-soft)'; }
        fb.innerHTML = `<b style="color:var(--${ok ? 'good' : 'bad'})">${ok ? 'Richtig.' : 'Nicht ganz.'}</b> ${cur <= 9 ? `Nadel bei S${cur} → R5 · S${cur} = <b>5${cur}</b>.` : `Nadel ${DB[cur]} dB über S9 → <b>59+${DB[cur]} dB</b>. Der S-Wert bleibt 9, der Rest wird in dB angehängt.`} Bei Telefonie entfällt das T.`;
        out.set({ s: `${streak} / ${need}`, b: best, n }); nx.style.display = ''; };
      return b;
    }));
  }
  nx.onclick = next; out.set({ s: `0 / ${need}`, b: 0, n: 0 }); next();
  root._test = { get cur() { return cur; }, rstOf: () => rst(cur), opts };
}
