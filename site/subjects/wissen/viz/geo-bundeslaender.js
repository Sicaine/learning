// Karte der 16 Bundesländer: Entdecken, „Wo liegt …?“ und Hauptstadt-Quiz.
// params: { mode?: 'explore'|'locate'|'capital', lockMode?: bool, goal?: 'locate'|'capital'|'any' }
// Einwohner gerundet (Fortschreibung, Stand etwa 2023), Flächen in km².

import { viewBox, states } from './geo-bundeslaender-data.js';
import { mountMap } from './geo-map-core.js';

const FACTS = {
  'DE-BW': { capital: 'Stuttgart', pop: 11.3, area: 35748, note: 'Autoland (Daimler, Porsche, Bosch), Schwarzwald, Bodensee.' },
  'DE-BY': { capital: 'München', pop: 13.4, area: 70542, note: 'Flächengrößtes Land, Alpen mit der Zugspitze, Freistaat.' },
  'DE-BE': { capital: 'Berlin', pop: 3.8, area: 891, note: 'Stadtstaat und Bundeshauptstadt, größte Stadt Deutschlands.' },
  'DE-BB': { capital: 'Potsdam', pop: 2.6, area: 29654, note: 'Umschließt Berlin; Seen, Spreewald, Schloss Sanssouci in Potsdam.' },
  'DE-HB': { capital: 'Bremen', pop: 0.7, area: 420, note: 'Kleinstes Land; Stadtstaat aus zwei Städten: Bremen und Bremerhaven.' },
  'DE-HH': { capital: 'Hamburg', pop: 1.9, area: 755, note: 'Stadtstaat, größter Seehafen Deutschlands, zweitgrößte Stadt.' },
  'DE-HE': { capital: 'Wiesbaden', pop: 6.4, area: 21116, note: 'Frankfurt am Main ist Finanzzentrum und Sitz der EZB — aber nicht Hauptstadt.' },
  'DE-MV': { capital: 'Schwerin', pop: 1.6, area: 23295, note: 'Am dünnsten besiedelt; Ostseeküste, Rügen, Mecklenburgische Seenplatte.' },
  'DE-NI': { capital: 'Hannover', pop: 8.1, area: 47710, note: 'Zweitgrößtes Land nach Fläche; Harz, Lüneburger Heide, VW in Wolfsburg.' },
  'DE-NW': { capital: 'Düsseldorf', pop: 18.1, area: 34113, note: 'Bevölkerungsreichstes Land; Ruhrgebiet, Köln ist die größte Stadt.' },
  'DE-RP': { capital: 'Mainz', pop: 4.2, area: 19858, note: 'Weinland an Rhein und Mosel, Mittelrheintal (UNESCO-Welterbe).' },
  'DE-SL': { capital: 'Saarbrücken', pop: 1.0, area: 2572, note: 'Kleinstes Flächenland; kam erst 1957 zur Bundesrepublik.' },
  'DE-SN': { capital: 'Dresden', pop: 4.1, area: 18450, note: 'Freistaat; Leipzig ist die größte Stadt, Erzgebirge im Süden.' },
  'DE-ST': { capital: 'Magdeburg', pop: 2.2, area: 20467, note: 'Lutherstadt Wittenberg, Bauhaus Dessau, Brocken im Harz.' },
  'DE-SH': { capital: 'Kiel', pop: 3.0, area: 15804, note: 'Zwischen Nord- und Ostsee; Sylt, Nord-Ostsee-Kanal, Grenze zu Dänemark.' },
  'DE-TH': { capital: 'Erfurt', pop: 2.1, area: 16202, note: 'Freistaat, „grünes Herz Deutschlands“, Weimar, Wartburg bei Eisenach.' },
};

const fmt = n => n.toLocaleString('de-DE');

export default function mount(stage, { params, complete }) {
  // Große Länder zuerst zeichnen, damit Stadtstaaten (in Brandenburg/Niedersachsen) obenauf liegen.
  const regions = [...states].sort((a, b) => FACTS[b.id].area - FACTS[a.id].area).map(s => {
    const f = FACTS[s.id];
    return {
      ...s, capital: f.capital,
      info: `Hauptstadt: <b>${f.capital}</b> · rund ${fmt(f.pop)} Mio. Einwohner · ${fmt(f.area)} km²<br>${f.note}`,
    };
  });
  const goal = params.goal || 'any';
  mountMap(stage, {
    viewBox, regions, rounds: 16, stroke: 1.2, maxWidth: '440px',
    mode: params.mode || 'explore', lockMode: params.lockMode,
    onDone: ({ mode }) => { if (goal === 'any' || goal === mode) complete(); },
  });
}
