// How thin are the watch hands in patch units? Choose input resolution and patch size;
// see the patch grid over a zoomed crop and the token/compute cost.
// Task auto-completes when the minute hand is at least half a patch wide.

import { HANDS } from './dino-watch-scene.js';

const SRC = 1024; // assume the original photo is 1024 px wide
const HAND_PX = { hour: 16, minute: 10, seconds: 3 }; // hand widths in the original photo

export default function mount(stage, { complete }) {
  let res = 448, patch = 16;
  stage.innerHTML = `<div class="vz">
    <svg class="vz-svg" viewBox="0 0 560 300"></svg>
    <div class="vz-controls">
      <div class="vz-control"><label>Input resolution <output class="o-r"></output></label><input type="range" class="r-r" min="224" max="1536" step="16" value="${res}"></div>
      <div class="vz-seg"><button data-p="14">patch 14 (DINOv2)</button><button data-p="16" class="on">patch 16 (DINOv3)</button></div>
    </div>
    <div class="vz-readout"></div>
    <p class="vz-note">The crop shows the dial near the centre. Each square is one patch token at the chosen resolution. Tokens grow with resolution², attention cost with resolution⁴.</p>
  </div>`;
  const svg = stage.querySelector('svg');

  function draw() {
    const eff = Math.floor(res / patch) * patch;           // resolution rounded to the patch grid
    const tokens = (eff / patch) ** 2;
    const base = (224 / 16) ** 2;
    // crop: 560 source px around the dial centre, drawn at 280 px
    const crop = 560, scale = 280 / crop, ox = 10, oy = 10;
    const srcPerPatch = patch * SRC / eff;                   // how many source pixels one patch covers
    const cells = [];
    for (let x = 0; x * srcPerPatch * scale < 280; x++) cells.push(`<line x1="${ox + x * srcPerPatch * scale}" y1="${oy}" x2="${ox + x * srcPerPatch * scale}" y2="${oy + 280}" />`);
    for (let y = 0; y * srcPerPatch * scale < 280; y++) cells.push(`<line x1="${ox}" y1="${oy + y * srcPerPatch * scale}" x2="${ox + 280}" y2="${oy + y * srcPerPatch * scale}" />`);
    const cx = ox + 140, cy = oy + 140;
    const handsSvg = HANDS.map(h => {
      const len = h.len * SRC * scale, w = HAND_PX[h.name] * scale;
      const x2 = cx + Math.sin(h.a) * len, y2 = cy - Math.cos(h.a) * len;
      return `<line x1="${cx}" y1="${cy}" x2="${x2}" y2="${y2}" stroke="${h.name === 'seconds' ? '#c0392b' : '#1b1d24'}" stroke-width="${w}" stroke-linecap="round"/>`;
    }).join('');
    const widths = Object.fromEntries(Object.entries(HAND_PX).map(([k, w]) => [k, w * (eff / SRC) / patch]));
    const bar = (name, v, y) => `
      <text x="320" y="${y}" font-size="12" fill="var(--ink-2)" font-family="Inter">${name} hand</text>
      <rect x="400" y="${y - 11}" width="140" height="14" rx="4" fill="var(--line)"/>
      <rect x="400" y="${y - 11}" width="${Math.min(140, v * 140)}" height="14" rx="4" fill="${v >= 0.5 ? 'var(--accent)' : '#d4513d'}"/>
      <text x="545" y="${y}" font-size="11" fill="var(--muted)" font-family="JetBrains Mono" text-anchor="end" dx="0"></text>
      <text x="470" y="${y + 16}" font-size="10.5" fill="var(--muted)" font-family="JetBrains Mono" text-anchor="middle">${v.toFixed(2)} patch wide</text>`;
    svg.innerHTML = `
      <defs><clipPath id="prclip"><rect x="${ox}" y="${oy}" width="280" height="280" rx="10"/></clipPath></defs>
      <g clip-path="url(#prclip)">
        <rect x="${ox}" y="${oy}" width="280" height="280" fill="#f3efe6"/>
        ${Array.from({ length: 12 }, (_, k) => { const a = k * Math.PI / 6, r1 = 0.237 * SRC * scale, r2 = 0.268 * SRC * scale; return `<line x1="${cx + Math.sin(a) * r1}" y1="${cy - Math.cos(a) * r1}" x2="${cx + Math.sin(a) * r2}" y2="${cy - Math.cos(a) * r2}" stroke="#8a7a55" stroke-width="${12 * scale}"/>`; }).join('')}
        ${handsSvg}
        <circle cx="${cx}" cy="${cy}" r="${12 * scale}" fill="#1b1d24"/>
        <g stroke="var(--accent)" stroke-opacity=".55" stroke-width="1">${cells.join('')}</g>
      </g>
      <text x="320" y="36" font-size="13" font-weight="600" fill="var(--ink)" font-family="Inter">Hand width in patches</text>
      ${bar('hour', widths.hour, 70)}
      ${bar('minute', widths.minute, 115)}
      ${bar('seconds', widths.seconds, 160)}
      <text x="320" y="215" font-size="12" fill="var(--ink-2)" font-family="Inter">one patch covers</text>
      <text x="320" y="236" font-size="20" font-weight="700" fill="var(--accent)" font-family="Inter">${srcPerPatch.toFixed(1)} px</text>
      <text x="320" y="254" font-size="11" fill="var(--muted)" font-family="Inter">of the original 1024-px photo</text>`;
    stage.querySelector('.o-r').textContent = `${eff}×${eff}`;
    stage.querySelector('.vz-readout').innerHTML = `
      <span class="vz-stat">patch grid<b>${eff / patch}×${eff / patch}</b></span>
      <span class="vz-stat hl">tokens<b>${tokens.toLocaleString()}</b></span>
      <span class="vz-stat">attention cost vs 224/16<b>${((tokens / base) ** 2).toFixed(1)}×</b></span>
      <span class="vz-stat">MLP cost vs 224/16<b>${(tokens / base).toFixed(1)}×</b></span>`;
    if (widths.minute >= 0.5) complete();
  }
  stage.querySelector('.r-r').oninput = e => { res = +e.target.value; draw(); };
  stage.querySelectorAll('.vz-seg button').forEach(b => b.onclick = () => {
    patch = +b.dataset.p; stage.querySelectorAll('.vz-seg button').forEach(x => x.classList.toggle('on', x === b)); draw();
  });
  draw();
}
