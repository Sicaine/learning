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
  {
    id: 'wissen',
    lang: 'de',
    title: 'Allgemeinwissen',
    tagline: 'Was man in Deutschland wissen sollte: Geschichte, Politik, Wissenschaft, Kultur — breit, nicht zu tief, nicht zu banal.',
    accent: '#b8322a',
    accent2: '#d9971c',
    load: () => import('./wissen/subject.js'),
    art: `<svg viewBox="0 0 400 170" preserveAspectRatio="xMidYMid slice"><g fill="#fff">
      ${Array.from({ length: 9 }, (_, i) => { const h = 62 + (i * 37 % 45), w = 16 + (i * 7 % 10), x = 40 + i * 25; return `<rect x="${x}" y="${150 - h}" width="${w}" height="${h}" rx="2" opacity="${(0.35 + (i % 3) * 0.2).toFixed(2)}"/><rect x="${x + 3}" y="${150 - h + 8}" width="${w - 6}" height="2" opacity=".5" fill="#000"/>`; }).join('')}
      <rect x="28" y="150" width="240" height="4" rx="2" opacity=".85"/></g>
      <g transform="translate(318 82)" fill="none" stroke="#fff"><circle r="50" stroke-width="2" opacity=".85"/><ellipse rx="22" ry="50" opacity=".6"/><ellipse rx="50" ry="18" opacity=".6"/><line x1="-50" x2="50" opacity=".6"/><line y1="-50" y2="50" opacity=".6"/></g></svg>`,
  },
  {
    id: 'elektrotechnik',
    lang: 'de',
    title: 'Elektrotechnik',
    tagline: 'Strom, Felder, Schwingkreise, Halbleiter — verstehen statt auswendig lernen, mit Schaltungen zum Ausprobieren.',
    accent: '#0369a1',
    accent2: '#14b8a6',
    load: () => import('./elektrotechnik/subject.js'),
    art: `<svg viewBox="0 0 400 170" preserveAspectRatio="xMidYMid slice"><g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 120H70M70 120V86M70 86H108M148 86H210M210 86V120M210 120H250M250 120V70M250 70H300" stroke-width="2.4" opacity=".9"/>
      <rect x="108" y="74" width="40" height="24" rx="2" stroke-width="2.4"/>
      <path d="M300 56V84M312 46V94" stroke-width="3.2"/><path d="M312 70H372" stroke-width="2.4"/><path d="M300 70H292" stroke-width="2.4"/>
      <path d="M20 40c14 0 14 30 28 30s14-60 28-60 14 60 28 60 14-30 28-30" stroke-width="2.2" opacity=".55"/>
      <path d="M150 140c10 0 12-26 24-26s14 26 24 26" stroke-width="2" opacity=".4"/>
      <circle cx="70" cy="120" r="3.5" fill="#fff"/><circle cx="210" cy="120" r="3.5" fill="#fff"/><circle cx="250" cy="70" r="3.5" fill="#fff"/>
      </g><g fill="#fff"><path d="M338 112l-7 16h6l-4 14 12-19h-7l5-11z" opacity=".85"/></g></svg>`,
  },
  {
    id: 'amateurfunk',
    lang: 'de',
    title: 'Amateurfunk',
    tagline: 'Auf dem Weg zum Rufzeichen: Technik, Betrieb und Vorschriften der Klasse E.',
    accent: '#047857',
    accent2: '#0ea5e9',
    load: () => import('./amateurfunk/subject.js'),
    art: `<svg viewBox="0 0 400 170" preserveAspectRatio="xMidYMid slice"><g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round">
      <path d="M120 160L140 40L160 160M126 126H154M131 96H149M136 66H144M127 140L153 112M153 140L127 112M132 108L148 80M148 108L132 80" stroke-width="2.2" opacity=".9"/>
      <path d="M140 40V22M126 28H154" stroke-width="3"/><circle cx="140" cy="18" r="3.2" fill="#fff"/>
      <path d="M176 36q16 -8 0 -24M188 40q26 -14 0 -40M200 44q36 -20 0 -56" stroke-width="2.2" opacity=".75" transform="translate(0 16)"/>
      <path d="M104 36q-16 -8 0 -24M92 40q-26 -14 0 -40M80 44q-36 -20 0 -56" stroke-width="2.2" opacity=".75" transform="translate(0 16)"/>
      <path d="M230 120c18 0 18-30 36-30s18 60 36 60 18-60 36-60 18 30 36 30" stroke-width="2.4" opacity=".6"/>
      <path d="M250 60h12m6 0h26m6 0h12M262 44h26m6 0h12m6 0h12" stroke-width="3.4" opacity=".85"/>
      </g></svg>`,
  },
];
