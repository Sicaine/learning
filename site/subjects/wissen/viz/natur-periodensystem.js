// Periodensystem (Perioden 1–4) zum Erkunden, plus Suchspiel.
// params: { mode: 'explore' | 'game' } — im Spiel ruft das Finden aller Elemente complete() auf.

const CAT = {
  alkali: { name: 'Alkalimetalle', color: '#f4b6a6' },
  erdalkali: { name: 'Erdalkalimetalle', color: '#f6d39a' },
  uebergang: { name: 'Übergangsmetalle', color: '#e6d7c0' },
  metall: { name: 'weitere Metalle', color: '#cfd6e0' },
  halbmetall: { name: 'Halbmetalle', color: '#c9e3c6' },
  nichtmetall: { name: 'Nichtmetalle', color: '#bfe0f0' },
  halogen: { name: 'Halogene', color: '#d8cdf2' },
  edelgas: { name: 'Edelgase', color: '#f2c7e4' },
};

// [Z, Symbol, Name, Periode, Gruppe, Kategorie, Info]
const E = [
  [1, 'H', 'Wasserstoff', 1, 1, 'nichtmetall', 'Häufigstes Element im Universum; Brennstoff der Sterne.'],
  [2, 'He', 'Helium', 1, 18, 'edelgas', 'Zweithäufigstes Element im All; leichter als Luft, füllt Ballons.'],
  [3, 'Li', 'Lithium', 2, 1, 'alkali', 'Leichtestes Metall; steckt in Akkus von Handys und E-Autos.'],
  [4, 'Be', 'Beryllium', 2, 2, 'erdalkali', 'Sehr leichtes, giftiges Metall; im Smaragd enthalten.'],
  [5, 'B', 'Bor', 2, 13, 'halbmetall', 'In Borosilikatglas (hitzebeständiges Laborglas).'],
  [6, 'C', 'Kohlenstoff', 2, 14, 'nichtmetall', 'Grundlage allen Lebens; als Diamant und Graphit.'],
  [7, 'N', 'Stickstoff', 2, 15, 'nichtmetall', 'Macht rund 78 % der Luft aus.'],
  [8, 'O', 'Sauerstoff', 2, 16, 'nichtmetall', 'Rund 21 % der Luft; häufigstes Element der Erdkruste.'],
  [9, 'F', 'Fluor', 2, 17, 'halogen', 'Reaktionsfreudigstes Element; Fluorid in Zahnpasta.'],
  [10, 'Ne', 'Neon', 2, 18, 'edelgas', 'Leuchtet rot-orange in Reklameröhren.'],
  [11, 'Na', 'Natrium', 3, 1, 'alkali', 'Reagiert heftig mit Wasser; Teil von Kochsalz (NaCl).'],
  [12, 'Mg', 'Magnesium', 3, 2, 'erdalkali', 'Brennt mit grellweißem Licht; wichtiger Mineralstoff.'],
  [13, 'Al', 'Aluminium', 3, 13, 'metall', 'Häufigstes Metall der Erdkruste; leicht und korrosionsbeständig.'],
  [14, 'Si', 'Silicium', 3, 14, 'halbmetall', 'Halbleiter aller Computerchips — daher „Silicon Valley“.'],
  [15, 'P', 'Phosphor', 3, 15, 'nichtmetall', 'In Knochen, Zähnen und der DNA; in Streichholzreibflächen.'],
  [16, 'S', 'Schwefel', 3, 16, 'nichtmetall', 'Gelbes Nichtmetall; riecht in Verbindungen nach faulen Eiern.'],
  [17, 'Cl', 'Chlor', 3, 17, 'halogen', 'Desinfiziert Schwimmbäder; Teil von Kochsalz.'],
  [18, 'Ar', 'Argon', 3, 18, 'edelgas', 'Rund 1 % der Luft; Schutzgas beim Schweißen.'],
  [19, 'K', 'Kalium', 4, 1, 'alkali', 'Symbol vom lateinischen *Kalium*; wichtig für Nerven und Muskeln.'],
  [20, 'Ca', 'Calcium', 4, 2, 'erdalkali', 'Baustoff von Knochen, Zähnen, Kalkstein und Marmor.'],
  [21, 'Sc', 'Scandium', 4, 3, 'uebergang', 'Seltenes Leichtmetall, in Aluminiumlegierungen.'],
  [22, 'Ti', 'Titan', 4, 4, 'uebergang', 'Fest, leicht, korrosionsfest — für Implantate und Flugzeuge.'],
  [23, 'V', 'Vanadium', 4, 5, 'uebergang', 'Härtet Stahl.'],
  [24, 'Cr', 'Chrom', 4, 6, 'uebergang', 'Glänzender Überzug; macht Edelstahl rostfrei.'],
  [25, 'Mn', 'Mangan', 4, 7, 'uebergang', 'Wichtig für die Stahlherstellung.'],
  [26, 'Fe', 'Eisen', 4, 8, 'uebergang', 'Meistverwendetes Metall (Stahl); im Hämoglobin des Blutes.'],
  [27, 'Co', 'Cobalt', 4, 9, 'uebergang', 'Blaue Farbpigmente; in Akkus.'],
  [28, 'Ni', 'Nickel', 4, 10, 'uebergang', 'In Münzen und Edelstahl; häufiges Kontaktallergen.'],
  [29, 'Cu', 'Kupfer', 4, 11, 'uebergang', 'Hervorragender Stromleiter; Kabel und Leitungen.'],
  [30, 'Zn', 'Zink', 4, 12, 'uebergang', 'Schützt Stahl vor Rost (Verzinken).'],
  [31, 'Ga', 'Gallium', 4, 13, 'metall', 'Schmilzt schon in der Hand (knapp 30 °C); in LEDs.'],
  [32, 'Ge', 'Germanium', 4, 14, 'halbmetall', 'Von Mendelejew vorhergesagt, 1886 in Deutschland entdeckt.'],
  [33, 'As', 'Arsen', 4, 15, 'halbmetall', 'Berühmt-berüchtigtes Gift.'],
  [34, 'Se', 'Selen', 4, 16, 'nichtmetall', 'Lebenswichtiges Spurenelement.'],
  [35, 'Br', 'Brom', 4, 17, 'halogen', 'Eines von nur zwei bei Raumtemperatur flüssigen Elementen (mit Quecksilber).'],
  [36, 'Kr', 'Krypton', 4, 18, 'edelgas', 'Edelgas; bekannt aus „Kryptonit“ (Superman).'],
];

const QUESTIONS = [
  { q: 'Finde das Element mit dem Symbol **Fe**.', z: 26 },
  { q: 'Finde das Element, das rund **78 % der Luft** ausmacht.', z: 7 },
  { q: 'Finde das **leichteste Edelgas**.', z: 2 },
  { q: 'Welches Element hat das Symbol **K**?', z: 19 },
  { q: 'Finde den Halbleiter der **Computerchips**.', z: 14 },
  { q: 'Finde das **Halogen in Kochsalz**.', z: 17 },
  { q: 'Finde das Element mit **6 Protonen**.', z: 6 },
];

export default function mount(stage, { params, complete, md }) {
  const game = params.mode === 'game';
  let qi = 0, mistakes = 0;
  const order = game ? [...QUESTIONS].sort(() => Math.random() - 0.5) : [];
  stage.innerHTML = `
    <div class="vz">
      ${game ? '<div class="vz-readout"><span class="vz-stat hl ps-q"></span><span class="vz-stat ps-score"></span></div>' : ''}
      <div class="ps-grid" style="display:grid;grid-template-columns:repeat(18,minmax(0,1fr));gap:3px"></div>
      <div class="vz-readout ps-legend" style="font-size:.78rem"></div>
      <div class="ps-info vz-note">${game ? '' : 'Klicke auf ein Element.'}</div>
    </div>`;
  const grid = stage.querySelector('.ps-grid');
  const cells = [];
  for (let p = 1; p <= 4; p++) for (let g = 1; g <= 18; g++) {
    const e = E.find(x => x[3] === p && x[4] === g);
    cells.push(e
      ? `<button class="ps-el" data-z="${e[0]}" title="${e[2]}" style="aspect-ratio:1;border:1px solid rgba(0,0,0,.08);border-radius:6px;background:${CAT[e[5]].color};padding:2px 0;display:grid;place-items:center;line-height:1.05;cursor:pointer"><small style="font-size:.55rem;opacity:.7">${e[0]}</small><b style="font-size:clamp(.6rem,1.6vw,.95rem)">${e[1]}</b></button>`
      : '<span></span>');
  }
  grid.innerHTML = cells.join('');
  stage.querySelector('.ps-legend').innerHTML = Object.values(CAT).map(c => `<span class="vz-stat"><span style="display:inline-block;width:10px;height:10px;border-radius:3px;background:${c.color};margin-right:6px"></span>${c.name}</span>`).join('');
  const info = stage.querySelector('.ps-info');

  const ask = () => {
    if (!game) return;
    stage.querySelector('.ps-score').innerHTML = `Gefunden<b>${qi}/${order.length}</b> · Fehler<b>${mistakes}</b>`;
    stage.querySelector('.ps-q').innerHTML = qi < order.length ? md(order[qi].q).replace(/^<p>|<\/p>$/g, '') : '<b style="margin:0">Alle gefunden!</b>';
  };

  grid.addEventListener('click', ev => {
    const b = ev.target.closest('.ps-el'); if (!b) return;
    const e = E.find(x => x[0] === +b.dataset.z);
    if (!game) {
      grid.querySelectorAll('.ps-el').forEach(x => x.style.outline = '');
      b.style.outline = '2px solid var(--ink)';
      info.innerHTML = `<b>${e[2]}</b> (${e[1]}) · Ordnungszahl ${e[0]} · Periode ${e[3]}, Gruppe ${e[4]} · <i>${CAT[e[5]].name}</i><br>${md(e[6]).replace(/^<p>|<\/p>$/g, '')}`;
      return;
    }
    if (qi >= order.length) return;
    if (e[0] === order[qi].z) {
      b.style.outline = '2px solid var(--good)';
      info.innerHTML = `✓ <b>${e[2]}</b> (${e[1]}): ${md(e[6]).replace(/^<p>|<\/p>$/g, '')}`;
      qi++;
      if (qi === order.length) complete();
    } else {
      mistakes++;
      b.classList.add('shake'); setTimeout(() => b.classList.remove('shake'), 450);
      info.innerHTML = `Das ist <b>${e[2]}</b> (${e[1]}) — versuch es nochmal.`;
    }
    ask();
  });
  ask();
}
