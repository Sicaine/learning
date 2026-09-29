// Registry of all subjects. Adding a subject = add a folder + one entry here.
// See CLAUDE.md for the content model.

export const subjects = [
  {
    id: 'vision',
    title: 'Seeing Machines',
    tagline: 'Modern computer vision from first principles to DINOv3 and segmentation — aimed at your watch images.',
    accent: '#5b5bd6',
    accent2: '#b14fd8',
    load: () => import('./vision/subject.js'),
    art: `<svg viewBox="0 0 400 170" preserveAspectRatio="xMidYMid slice"><defs><radialGradient id="va" cx=".72" cy=".45" r=".6"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>
      ${Array.from({ length: 10 }, (_, r) => Array.from({ length: 24 }, (_, c) => {
        const dx = c - 17, dy = r - 4.5, d = Math.sqrt(dx * dx + dy * dy);
        const o = Math.max(0.06, 0.55 - d * 0.06);
        return `<rect x="${c * 17 + 2}" y="${r * 17 + 2}" width="14" height="14" rx="3" fill="#fff" opacity="${o.toFixed(2)}"/>`;
      }).join('')).join('')}
      <circle cx="290" cy="80" r="52" fill="none" stroke="#fff" stroke-width="2" opacity=".8"/><circle cx="290" cy="80" r="44" fill="none" stroke="#fff" stroke-width="1" opacity=".5" stroke-dasharray="2 5"/>
      <line x1="290" y1="80" x2="290" y2="46" stroke="#fff" stroke-width="3" stroke-linecap="round"/><line x1="290" y1="80" x2="316" y2="92" stroke="#fff" stroke-width="2" stroke-linecap="round"/><circle cx="290" cy="80" r="3.5" fill="#fff"/>
      <rect width="400" height="170" fill="url(#va)"/></svg>`,
  },
  {
    id: 'watches',
    title: 'Horology',
    tagline: 'Watches: their history, the houses that make them, and how a few grams of metal keep time.',
    accent: '#a8742f',
    accent2: '#d6a44a',
    load: () => import('./watches/subject.js'),
    art: `<svg viewBox="0 0 400 170" preserveAspectRatio="xMidYMid slice">
      <g transform="translate(200 85)" fill="none" stroke="#fff">
        <circle r="140" stroke-opacity=".12" stroke-width="30"/>
        <circle r="66" stroke-width="2" stroke-opacity=".9"/>
        ${Array.from({ length: 60 }, (_, i) => { const a = i * Math.PI / 30, r1 = i % 5 ? 58 : 52; return `<line x1="${(Math.sin(a) * r1).toFixed(1)}" y1="${(-Math.cos(a) * r1).toFixed(1)}" x2="${(Math.sin(a) * 62).toFixed(1)}" y2="${(-Math.cos(a) * 62).toFixed(1)}" stroke-width="${i % 5 ? 1 : 2.4}" stroke-opacity=".85"/>`; }).join('')}
        <line x1="0" y1="0" x2="-22" y2="-30" stroke-width="4" stroke-linecap="round"/>
        <line x1="0" y1="0" x2="36" y2="-34" stroke-width="2.6" stroke-linecap="round"/>
        <line x1="0" y1="10" x2="0" y2="-54" stroke-width="1" stroke="#fff"/>
        <circle r="4" fill="#fff"/>
        <g transform="translate(-120 10)" stroke-opacity=".5"><circle r="26" stroke-dasharray="4 3" stroke-width="5"/><circle r="10"/></g>
        <g transform="translate(125 -20)" stroke-opacity=".45"><circle r="34" stroke-dasharray="5 4" stroke-width="6"/><circle r="12"/></g>
      </g></svg>`,
  },
];
