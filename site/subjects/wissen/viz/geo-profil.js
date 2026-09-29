// Schematischer Nord–Süd-Querschnitt Deutschlands: von der Nordsee bis zur Zugspitze.
// Klick auf eine Großlandschaft zeigt Infos; der Task ist erfüllt, wenn alle angesehen wurden.

const ZONES = [
  { key: 'kueste', name: 'Küste & Inseln', x0: 0, x1: 70, info: 'Nordsee mit **Wattenmeer** und Gezeiten, Ostsee mit Förden, Bodden und Kreidefelsen. Größte Insel: **Rügen**; nördlichster Punkt: List auf Sylt.' },
  { key: 'tiefland', name: 'Norddeutsches Tiefland', x0: 70, x1: 300, info: 'Flach, von den Eiszeiten geformt: Moränen, Heide, Seen (Müritz), Urstromtäler. Hamburg, Berlin, Hannover. Tiefster Punkt: rund 3,5 m unter dem Meeresspiegel (Wilstermarsch).' },
  { key: 'mittelgebirge', name: 'Mittelgebirgsschwelle', x0: 300, x1: 500, info: 'Harz (Brocken, 1.141 m), Thüringer Wald, Rhön, Eifel, Taunus, Erzgebirge. Hier liegen viele Quellen und das Mittelrheintal.' },
  { key: 'stufenland', name: 'Südwestdeutsches Stufenland', x0: 500, x1: 620, info: 'Schichtstufen von Schwäbischer und Fränkischer Alb; im Westen Oberrheingraben und Schwarzwald (Feldberg, 1.493 m).' },
  { key: 'vorland', name: 'Alpenvorland', x0: 620, x1: 720, info: 'Hügelland zwischen Donau und Alpen mit großen Seen aus der Eiszeit: Chiemsee, Starnberger See, Ammersee — und München.' },
  { key: 'alpen', name: 'Alpen', x0: 720, x1: 800, info: 'Nur ein schmaler Streifen der Alpen gehört zu Deutschland. Höchster Punkt: **Zugspitze**, 2.962 m.' },
];

export default function mount(stage, { complete, md }) {
  const W = 800, H = 300, base = 250;
  // Höhenprofil (schematisch, stark überhöht): x → Höhe in Metern
  const prof = [[0, -2], [40, 0], [70, 5], [120, 40], [180, 60], [230, 30], [300, 120], [340, 600], [370, 1141], [400, 500], [440, 800], [470, 400], [500, 350], [540, 700], [570, 1000], [600, 750], [620, 500], [660, 550], [700, 650], [720, 900], [745, 1800], [770, 2962], [790, 2000], [800, 1500]];
  const y = h => base - (h / 2962) * 200 - (h > 0 ? 6 : 0);
  const line = prof.map(([x, h], i) => `${i ? 'L' : 'M'}${x},${y(h).toFixed(1)}`).join('');
  const seen = new Set();

  stage.innerHTML = `
    <div class="vz">
      <svg class="vz-svg" viewBox="0 0 ${W} ${H}">
        <defs><linearGradient id="gpSky" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#f4f7fb"/><stop offset="1" stop-color="#fff"/></linearGradient></defs>
        <rect width="${W}" height="${H}" fill="url(#gpSky)"/>
        <rect x="0" y="${base - 4}" width="45" height="${H - base + 4}" fill="#cfe3f3"/>
        ${ZONES.map(z => `<rect class="gp-z" data-k="${z.key}" x="${z.x0}" y="10" width="${z.x1 - z.x0}" height="${H - 10}" fill="transparent" style="cursor:pointer"/>`).join('')}
        <path d="${line} L${W},${H} L0,${H} Z" fill="color-mix(in oklab, var(--accent) 22%, white)" stroke="var(--accent)" stroke-width="2" pointer-events="none"/>
        ${ZONES.map(z => `<line x1="${z.x1}" y1="30" x2="${z.x1}" y2="${H}" stroke="var(--line-2)" stroke-dasharray="3 4" pointer-events="none"/>`).join('')}
        ${ZONES.map(z => `<text class="gp-t" data-k="${z.key}" x="${(z.x0 + z.x1) / 2}" y="${H - 12}" text-anchor="middle" font-size="11" font-family="Inter" fill="var(--ink-2)" pointer-events="none">${z.name.length > 16 ? z.name.split(' ')[0] + '…' : z.name}</text>`).join('')}
        <text x="762" y="${y(2962) + 4}" text-anchor="end" font-size="11" font-family="Inter" fill="var(--ink)" pointer-events="none">Zugspitze 2.962 m</text>
        <text x="370" y="${y(1141) - 8}" text-anchor="middle" font-size="11" font-family="Inter" fill="var(--ink)" pointer-events="none">Brocken 1.141 m</text>
        <text x="20" y="${base - 10}" font-size="11" font-family="Inter" fill="#4d7ea8" pointer-events="none">Nordsee</text>
        <text x="${W - 8}" y="16" text-anchor="end" font-size="11" font-family="Inter" fill="var(--muted)" pointer-events="none">Süden →</text>
        <text x="8" y="16" font-size="11" font-family="Inter" fill="var(--muted)" pointer-events="none">← Norden</text>
      </svg>
      <div class="gp-info vz-note">Tippe auf einen Abschnitt des Profils.</div>
      <div class="vz-readout gp-seen"></div>
      <p class="vz-note" style="font-size:.8rem;color:var(--muted)">Schematisch und stark überhöht — die Reihenfolge der Landschaften stimmt, die Abstände nicht.</p>
    </div>`;

  const info = stage.querySelector('.gp-info');
  const drawSeen = () => {
    stage.querySelector('.gp-seen').innerHTML = ZONES.map(z => `<span class="vz-stat ${seen.has(z.key) ? 'hl' : ''}">${seen.has(z.key) ? '✓' : '○'} ${z.name}</span>`).join('');
  };
  stage.querySelectorAll('.gp-z').forEach(r => r.addEventListener('click', () => {
    const z = ZONES.find(x => x.key === r.dataset.k);
    stage.querySelectorAll('.gp-z').forEach(x => x.setAttribute('fill', 'transparent'));
    r.setAttribute('fill', 'color-mix(in oklab, var(--accent-2) 14%, transparent)');
    info.innerHTML = `<b style="color:var(--ink)">${z.name}</b><div class="prose small" style="margin-top:4px">${md(z.info)}</div>`;
    seen.add(z.key);
    drawSeen();
    if (seen.size === ZONES.length) complete();
  }));
  drawSeen();
}
