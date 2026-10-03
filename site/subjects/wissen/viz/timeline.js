// Zeitleiste. Shared by all Allgemeinwissen stages.
// params: {
//   events: [{ year: 1517, label: 'Thesenanschlag', detail?: 'Markdown' }],   (negative year = v. Chr.)
//   mode: 'explore' | 'sort'   — sort: tap events from earliest to latest (auto-completes)
//   scale: 'time' (default, proportional) | 'order' (evenly spaced — use when one very early event squashes the rest)
//   events may carry `when: 'Ostern'` to show a custom label instead of the year (year still orders them)
// }

const fmtYear = y => (y < 0 ? `${-Math.round(-y)} v. Chr.` : String(Math.round(y)));
const whenOf = e => e.when ?? fmtYear(e.year);

export default function mount(stage, { params, complete, md }) {
  const events = [...(params.events || [])].sort((a, b) => a.year - b.year);
  if (params.mode === 'sort') return sortGame(stage, events, complete, md, params.scale);
  explore(stage, events, md, params.scale);
}

function layout(events, W, pad, scale) {
  const min = events[0].year, max = events[events.length - 1].year;
  const span = Math.max(1, max - min);
  const x = scale === 'order' ? (y, i) => pad + (events.length > 1 ? i / (events.length - 1) : .5) * (W - 2 * pad) : y => pad + (y - min) / span * (W - 2 * pad);
  // Greedy lanes: alternate above/below, push further out when labels would overlap.
  const lanesUp = [], lanesDown = [];
  return events.map((e, i) => {
    const px = x(e.year, i);
    const w = Math.min(150, 12 + Math.min(e.label.length, 24) * 6.2);
    const bx = Math.max(4, Math.min(W - 4 - w, px - w / 2));  // label box x, kept inside the SVG
    const lanes = i % 2 ? lanesDown : lanesUp;
    let lane = lanes.findIndex(end => end < bx - 6);
    if (lane === -1) { lane = lanes.length; lanes.push(0); }
    lanes[lane] = bx + w;
    return { ...e, px, bx, w, side: i % 2 ? 1 : -1, lane };
  });
}

// `only`: if given, draw just these events (the axis still spans all events, so positions stay stable).
function svgTimeline(events, only = null, scale = 'time') {
  const W = 760, pad = 40;
  const pts = layout(events, W, pad, scale).filter(p => !only || only.has(p.label));
  const maxLane = Math.max(0, ...layout(events, W, pad, scale).map(p => p.lane));
  const laneH = 34, mid = 40 + (maxLane + 1) * laneH;
  const H = mid * 2;
  const items = pts.map((p, i) => {
    const y = mid + p.side * (26 + p.lane * laneH);
    return `<g class="tl-ev" data-i="${i}" style="cursor:pointer">
      <line x1="${p.px}" y1="${mid}" x2="${p.px}" y2="${y}" stroke="var(--line-2)"/>
      <circle cx="${p.px}" cy="${mid}" r="5" fill="var(--accent)" stroke="#fff" stroke-width="2"/>
      <rect x="${p.bx}" y="${y - 12}" width="${p.w}" height="24" rx="8" fill="var(--surface)" stroke="var(--line)"/>
      <text x="${p.bx + p.w / 2}" y="${y + 4}" text-anchor="middle" font-size="11.5" font-family="Inter" fill="var(--ink)">${esc(p.label.length > 24 ? p.label.slice(0, 23) + '…' : p.label)}</text>
    </g>`;
  }).join('');
  const first = events[0].year, last = events[events.length - 1].year;
  return {
    pts,
    html: `<svg class="vz-svg" viewBox="0 0 ${W} ${H}">
      <line x1="${pad - 20}" y1="${mid}" x2="${W - pad + 20}" y2="${mid}" stroke="var(--ink-2)" stroke-width="2" stroke-linecap="round"/>
      <text x="${pad}" y="${mid + 18 + (maxLane + 1) * laneH + 14}" font-size="11" fill="var(--muted)" font-family="Inter"></text>
      ${items}
      <text x="${pad - 20}" y="${H - 6}" font-size="11" fill="var(--muted)" font-family="Inter">${first === last ? '' : esc(whenOf(events[0]))}</text>
      <text x="${W - pad + 20}" y="${H - 6}" font-size="11" fill="var(--muted)" font-family="Inter" text-anchor="end">${first === last ? '' : esc(whenOf(events[events.length - 1]))}</text>
    </svg>`,
  };
}

function explore(stage, events, md, scale) {
  const { html, pts } = svgTimeline(events, null, scale);
  stage.innerHTML = `<div class="vz"><div class="tl-wrap" style="overflow-x:auto">${html}</div><div class="tl-detail vz-note">Tippe auf ein Ereignis für Details.</div></div>`;
  const detail = stage.querySelector('.tl-detail');
  stage.querySelectorAll('.tl-ev').forEach(g => g.addEventListener('click', () => {
    const e = pts[+g.dataset.i];
    stage.querySelectorAll('.tl-ev rect').forEach(r => r.setAttribute('stroke', 'var(--line)'));
    g.querySelector('rect').setAttribute('stroke', 'var(--accent)');
    detail.innerHTML = `<b style="color:var(--accent)">${esc(whenOf(e))}</b> · <b>${esc(e.label)}</b>${e.detail ? `<div class="prose small" style="margin-top:6px">${md(e.detail)}</div>` : ''}`;
  }));
}

function sortGame(stage, events, complete, md, scale) {
  let placed = [], mistakes = 0;
  const pool = shuffle(events);
  stage.innerHTML = `
    <div class="vz">
      <div class="vz-note">Tippe die Ereignisse in der richtigen Reihenfolge an — das <b>früheste zuerst</b>.</div>
      <div class="tl-pool" style="display:flex;flex-wrap:wrap;gap:8px"></div>
      <div class="tl-wrap" style="overflow-x:auto"></div>
      <div class="vz-readout"><span class="vz-stat tl-count"></span><span class="vz-stat tl-miss"></span></div>
    </div>`;
  const poolEl = stage.querySelector('.tl-pool');
  const draw = () => {
    poolEl.innerHTML = pool.filter(e => !placed.includes(e)).map(e =>
      `<button class="chip" data-label="${esc(e.label)}">${esc(e.label)}</button>`).join('') ||
      `<span class="feedback good">${mistakes ? `Geschafft mit ${mistakes} Fehler${mistakes > 1 ? 'n' : ''}.` : 'Fehlerfrei!'}</span>`;
    stage.querySelector('.tl-wrap').innerHTML = svgTimeline(events, new Set(placed.map(e => e.label)), scale).html;
    stage.querySelector('.tl-count').innerHTML = `Platziert<b>${placed.length}/${events.length}</b>`;
    stage.querySelector('.tl-miss').innerHTML = `Fehler<b>${mistakes}</b>`;
  };
  poolEl.addEventListener('click', e => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    const next = events[placed.length];
    const picked = events.find(x => x.label === chip.dataset.label);
    if (picked.year === next.year) {
      placed.push(picked);
      draw();
      if (placed.length === events.length) complete();
    } else {
      mistakes++;
      chip.classList.add('shake');
      chip.title = whenOf(picked);
      setTimeout(() => chip.classList.remove('shake'), 450);
      stage.querySelector('.tl-miss').innerHTML = `Fehler<b>${mistakes}</b>`;
    }
  });
  draw();
}

function shuffle(a) { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
