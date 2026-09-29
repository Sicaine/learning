// Interactive watch anatomy. params.mode: 'explore' (hover to learn) or 'game'
// (find the named part; completes when all parts are found).

const PARTS = [
  { id: 'strap', en: 'Strap / bracelet', de: 'Armband', desc: 'Holds the watch on the wrist — leather, rubber, textile or metal links.' },
  { id: 'lugs', en: 'Lugs', de: 'Bandanstöße (Hörner)', desc: 'Case projections where the strap attaches via spring bars.' },
  { id: 'case', en: 'Case', de: 'Gehäuse', desc: 'The housing protecting the movement; carries lugs, crown and pushers.' },
  { id: 'bezel', en: 'Bezel', de: 'Lünette', desc: 'Ring around the crystal — here a rotating scale.' },
  { id: 'crown', en: 'Crown', de: 'Krone', desc: 'Winds the watch and sets the time.' },
  { id: 'pusher', en: 'Pushers', de: 'Drücker', desc: 'Buttons that start, stop and reset the chronograph.' },
  { id: 'crystal', en: 'Crystal (reflection)', de: 'Uhrglas', desc: 'Transparent cover — you mostly see it through its reflections.' },
  { id: 'dial', en: 'Dial', de: 'Zifferblatt', desc: 'The face carrying indices, subdials and printing.' },
  { id: 'chapter-ring', en: 'Chapter ring', de: 'Minuterie', desc: 'Minute track around the edge of the dial.' },
  { id: 'indices', en: 'Indices', de: 'Indizes', desc: 'Hour markers — here applied batons.' },
  { id: 'subdial', en: 'Subdials', de: 'Hilfszifferblätter', desc: 'Small dials for running seconds and chronograph counters.' },
  { id: 'date-window', en: 'Date window', de: 'Datumsfenster', desc: 'Aperture showing the date disc.' },
  { id: 'hands', en: 'Hands', de: 'Zeiger', desc: 'Hour, minute and seconds hands.' },
];
const byId = Object.fromEntries(PARTS.map(p => [p.id, p]));

function watchSVG() {
  const cx = 200, cy = 230;
  const pol = (r, deg) => [cx + r * Math.sin(deg * Math.PI / 180), cy - r * Math.cos(deg * Math.PI / 180)];
  const ring = (r1, r2) => `M${cx - r1} ${cy}a${r1} ${r1} 0 1 0 ${2 * r1} 0a${r1} ${r1} 0 1 0 ${-2 * r1} 0Z M${cx - r2} ${cy}a${r2} ${r2} 0 1 0 ${2 * r2} 0a${r2} ${r2} 0 1 0 ${-2 * r2} 0Z`;
  const bezelTicks = Array.from({ length: 60 }, (_, i) => {
    const [x1, y1] = pol(i % 5 ? 122 : 118, i * 6), [x2, y2] = pol(127, i * 6);
    return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#e9ecf2" stroke-width="${i % 5 ? 1 : 2.4}"/>`;
  }).join('');
  const chapter = Array.from({ length: 60 }, (_, i) => {
    const [x1, y1] = pol(99, i * 6), [x2, y2] = pol(104, i * 6);
    return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#c9d2e3" stroke-width="1"/>`;
  }).join('');
  const indices = Array.from({ length: 12 }, (_, i) => {
    if (i === 3 || i === 6 || i === 9) return '';
    const [x, y] = pol(86, i * 30);
    return `<rect x="${(x - 3.5).toFixed(1)}" y="${(y - 11).toFixed(1)}" width="7" height="22" rx="1.5" fill="#f4f6fa" stroke="#9aa6bd" transform="rotate(${i * 30} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;
  }).join('');
  const sub = (x, y) => `<g><circle cx="${x}" cy="${y}" r="24" fill="#18223a" stroke="#c9d2e3" stroke-width="1.5"/>${Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6; return `<line x1="${(x + Math.sin(a) * 18).toFixed(1)}" y1="${(y - Math.cos(a) * 18).toFixed(1)}" x2="${(x + Math.sin(a) * 22).toFixed(1)}" y2="${(y - Math.cos(a) * 22).toFixed(1)}" stroke="#c9d2e3" stroke-width="1"/>`; }).join('')}<line x1="${x}" y1="${y}" x2="${x + 10}" y2="${y - 14}" stroke="#f4f6fa" stroke-width="2" stroke-linecap="round"/></g>`;
  return `
  <svg class="vz-svg anat-svg" viewBox="0 0 400 460">
    <defs>
      <radialGradient id="anDial" cx=".5" cy=".45" r=".6"><stop offset="0" stop-color="#34466e"/><stop offset="1" stop-color="#16203a"/></radialGradient>
      <linearGradient id="anSteel" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#f3f5f9"/><stop offset=".5" stop-color="#b9c0cc"/><stop offset="1" stop-color="#e3e7ee"/></linearGradient>
      <linearGradient id="anStrap" x1="0" x2="1"><stop offset="0" stop-color="#6b4a2f"/><stop offset=".5" stop-color="#8a6242"/><stop offset="1" stop-color="#6b4a2f"/></linearGradient>
    </defs>
    <g data-part="strap"><path d="M150 0 H250 L245 84 H155 Z" fill="url(#anStrap)"/><path d="M155 376 H245 L250 460 H150 Z" fill="url(#anStrap)"/>
      <path d="M160 6 V78 M240 6 V78 M160 382 V454 M240 382 V454" stroke="#c9a57a" stroke-width="1.2" stroke-dasharray="4 4"/></g>
    <g data-part="lugs" fill="url(#anSteel)" stroke="#9aa0ad">
      <path d="M122 150 L134 70 L166 70 L174 116 Z"/><path d="M278 150 L266 70 L234 70 L226 116 Z"/>
      <path d="M122 310 L134 390 L166 390 L174 344 Z"/><path d="M278 310 L266 390 L234 390 L226 344 Z"/>
      <line x1="136" y1="78" x2="264" y2="78" stroke="#8d95a3" stroke-width="2"/><line x1="136" y1="382" x2="264" y2="382" stroke="#8d95a3" stroke-width="2"/></g>
    <g data-part="crown"><rect x="336" y="216" width="22" height="28" rx="4" fill="url(#anSteel)" stroke="#9aa0ad"/>
      <path d="M341 218 V242 M346 218 V242 M351 218 V242" stroke="#8d95a3"/></g>
    <g data-part="pusher" fill="url(#anSteel)" stroke="#9aa0ad">
      <rect x="318" y="150" width="18" height="16" rx="3" transform="rotate(-38 327 158)"/>
      <rect x="318" y="294" width="18" height="16" rx="3" transform="rotate(38 327 302)"/></g>
    <g data-part="case"><circle cx="${cx}" cy="${cy}" r="140" fill="url(#anSteel)" stroke="#9aa0ad"/></g>
    <g data-part="bezel"><path d="${ring(130, 108)}" fill-rule="evenodd" fill="#1d2640" stroke="#9aa0ad"/>${bezelTicks}
      <circle cx="${cx}" cy="${cy - 119}" r="4" fill="#e9ecf2"/></g>
    <g data-part="dial"><circle cx="${cx}" cy="${cy}" r="108" fill="url(#anDial)"/>
      <text x="${cx}" y="${cy - 44}" text-anchor="middle" font-family="Instrument Serif, serif" font-size="15" fill="#e9ecf2">Horology</text>
      <text x="${cx}" y="${cy + 70}" text-anchor="middle" font-family="Inter" font-size="6.5" letter-spacing="1.5" fill="#9aa6bd">AUTOMATIC · CHRONOGRAPH</text></g>
    <g data-part="chapter-ring"><path d="${ring(106, 97)}" fill-rule="evenodd" fill="#1a2440" opacity=".01"/>${chapter}</g>
    <g data-part="indices">${indices}</g>
    <g data-part="subdial">${sub(cx - 50, cy)}${sub(cx + 50, cy)}</g>
    <g data-part="date-window"><rect x="${cx - 13}" y="${cy + 38}" width="26" height="18" rx="2" fill="#fff" stroke="#9aa6bd"/>
      <text x="${cx}" y="${cy + 51.5}" text-anchor="middle" font-family="Inter" font-weight="600" font-size="11" fill="#16203a">14</text></g>
    <g data-part="hands" stroke-linecap="round">
      <path d="M${cx} ${cy} L${cx - 4} ${cy - 10} L${cx - 30} ${cy - 50} L${cx - 26} ${cy - 54} Z" fill="#f4f6fa" stroke="#9aa6bd" transform="rotate(8 ${cx} ${cy})"/>
      <path d="M${cx} ${cy} L${cx + 3.5} ${cy - 12} L${cx + 58} ${cy - 62} L${cx + 55} ${cy - 66} Z" fill="#f4f6fa" stroke="#9aa6bd"/>
      <line x1="${cx}" y1="${cy + 22}" x2="${cx}" y2="${cy - 100}" stroke="#e0533d" stroke-width="1.6" transform="rotate(200 ${cx} ${cy})"/>
      <circle cx="${cx}" cy="${cy}" r="5" fill="#e0533d"/></g>
    <g data-part="crystal"><path d="M${cx - 92} ${cy - 40} A100 100 0 0 1 ${cx + 20} ${cy - 104} A112 112 0 0 0 ${cx - 80} ${cy - 20} Z" fill="#fff" opacity=".22"/></g>
  </svg>`;
}

export default function mount(stage, { params, complete }) {
  const mode = params.mode || 'explore';
  stage.innerHTML = `
    <style>
      .anat { display: grid; grid-template-columns: minmax(0, 1fr) 260px; gap: 18px; align-items: center; }
      .anat-svg { max-height: 460px; background: linear-gradient(160deg, #fbfaf7, #efece6) !important; }
      .anat-svg [data-part] { cursor: pointer; transition: filter .15s, opacity .15s; }
      .anat-svg.hovering [data-part]:not(.hl) { opacity: .45; }
      .anat-svg [data-part].hl { filter: drop-shadow(0 0 5px var(--accent)) drop-shadow(0 0 1px var(--accent)); }
      .anat-svg [data-part].ok { filter: drop-shadow(0 0 6px var(--good)); }
      .anat-svg [data-part].bad { filter: drop-shadow(0 0 6px var(--bad)); }
      .anat-info { padding: 16px 18px; border-radius: 14px; background: var(--surface-2); border: 1px solid var(--line); min-height: 150px; }
      .anat-info h4 { margin: 0 0 2px; font-size: 1.25rem; font-family: var(--serif); font-weight: 400; }
      .anat-info .de { display: inline-block; font-size: .8rem; font-weight: 600; color: var(--accent); background: var(--accent-soft); padding: 1px 8px; border-radius: 6px; margin-bottom: 8px; }
      .anat-info p { margin: 0; font-size: .9rem; color: var(--ink-2); }
      .anat-list { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 12px; }
      .anat-list span { font-size: .72rem; padding: 2px 8px; border-radius: 99px; background: var(--surface); border: 1px solid var(--line); color: var(--muted); }
      .anat-list span.found { background: var(--good-soft); border-color: var(--good); color: var(--good); }
      @media (max-width: 720px) { .anat { grid-template-columns: 1fr; } }
    </style>
    <div class="vz"><div class="anat">${watchSVG()}<div class="anat-info"></div></div></div>`;
  const svg = stage.querySelector('svg');
  const info = stage.querySelector('.anat-info');
  const parts = [...svg.querySelectorAll('[data-part]')];
  const partOf = e => e.target.closest?.('[data-part]');
  const show = p => { info.innerHTML = `<h4>${p.en}</h4><span class="de">DE · ${p.de}</span><p>${p.desc}</p>`; };

  if (mode === 'explore') {
    info.innerHTML = `<h4>Hover a part</h4><p>Move over the watch — or tap on a phone — to name each part.</p><div class="anat-list">${PARTS.map(p => `<span>${p.en}</span>`).join('')}</div>`;
    const hl = el => { parts.forEach(x => x.classList.toggle('hl', x === el)); svg.classList.toggle('hovering', !!el); };
    svg.addEventListener('pointerover', e => { const el = partOf(e); if (el) { hl(el); show(byId[el.dataset.part]); } });
    svg.addEventListener('pointerleave', () => hl(null));
    svg.addEventListener('click', e => { const el = partOf(e); if (el) { hl(el); show(byId[el.dataset.part]); } });
    return;
  }

  // Game mode
  let queue, found, mistakes;
  const start = () => {
    queue = [...PARTS].sort(() => Math.random() - 0.5);
    found = new Set(); mistakes = 0;
    parts.forEach(p => p.classList.remove('ok', 'bad', 'hl'));
    prompt();
  };
  const prompt = () => {
    if (!queue.length) {
      info.innerHTML = `<h4>All ${PARTS.length} found</h4><p>${mistakes ? `${mistakes} wrong click${mistakes > 1 ? 's' : ''}.` : 'Not a single wrong click!'}</p><button class="btn small again" style="margin-top:12px">Play again</button>`;
      info.querySelector('.again').onclick = start;
      complete();
      return;
    }
    const p = queue[0];
    info.innerHTML = `<span class="eyebrow">Find the part · ${found.size + 1}/${PARTS.length}</span><h4>${p.en}</h4><span class="de">DE · ${p.de}</span><p>Click it on the watch.</p>
      <div class="anat-list">${PARTS.map(x => `<span class="${found.has(x.id) ? 'found' : ''}">${x.en}</span>`).join('')}</div>`;
  };
  svg.addEventListener('click', e => {
    const el = partOf(e);
    if (!el || !queue.length) return;
    const want = queue[0].id;
    if (el.dataset.part === want) {
      found.add(want); queue.shift();
      el.classList.add('ok'); setTimeout(() => el.classList.remove('ok'), 700);
      prompt();
    } else {
      mistakes++;
      el.classList.add('bad'); setTimeout(() => el.classList.remove('bad'), 500);
      const got = byId[el.dataset.part];
      const hint = info.querySelector('p');
      if (hint) hint.textContent = `That's the ${got.en.toLowerCase()} (${got.de}). Try again.`;
    }
  });
  start();
}
