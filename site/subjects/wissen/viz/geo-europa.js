// Europakarte: Staaten und Hauptstädte. Kleinststaaten sind zum Anklicken zu klein
// und nur im Hauptstadt-Quiz dabei, wenn ihre Fläche auf der Karte sichtbar ist.
// params: { mode?, lockMode?, goal?, rounds? }

import { viewBox, countries } from './geo-europa-data.js';
import { mountMap } from './geo-map-core.js';

const CAPITALS = {
  Albanien: 'Tirana', Belarus: 'Minsk', Belgien: 'Brüssel', 'Bosnien und Herzegowina': 'Sarajevo', Bulgarien: 'Sofia',
  Deutschland: 'Berlin', Dänemark: 'Kopenhagen', Estland: 'Tallinn', Finnland: 'Helsinki', Frankreich: 'Paris',
  Griechenland: 'Athen', Irland: 'Dublin', Island: 'Reykjavík', Italien: 'Rom', Kosovo: 'Pristina', Kroatien: 'Zagreb',
  Lettland: 'Riga', Litauen: 'Vilnius', Luxemburg: 'Luxemburg', Malta: 'Valletta', Montenegro: 'Podgorica',
  Niederlande: 'Amsterdam', Nordmazedonien: 'Skopje', Norwegen: 'Oslo', Polen: 'Warschau', Portugal: 'Lissabon',
  'Republik Moldau': 'Chișinău', Rumänien: 'Bukarest', Russland: 'Moskau', Schweden: 'Stockholm', Schweiz: 'Bern',
  Serbien: 'Belgrad', Slowakei: 'Bratislava', Slowenien: 'Ljubljana', Spanien: 'Madrid', Tschechien: 'Prag',
  Ukraine: 'Kyjiw', Ungarn: 'Budapest', 'Vereinigtes Königreich': 'London', Österreich: 'Wien',
  Türkei: 'Ankara', Zypern: 'Nikosia',
};
const EU = new Set(['Belgien', 'Bulgarien', 'Dänemark', 'Deutschland', 'Estland', 'Finnland', 'Frankreich', 'Griechenland', 'Irland', 'Italien', 'Kroatien', 'Lettland', 'Litauen', 'Luxemburg', 'Malta', 'Niederlande', 'Österreich', 'Polen', 'Portugal', 'Rumänien', 'Schweden', 'Slowakei', 'Slowenien', 'Spanien', 'Tschechien', 'Ungarn', 'Zypern']);
const TOO_SMALL = new Set(['Malta', 'Luxemburg', 'Andorra']);

export default function mount(stage, { params, complete }) {
  const regions = countries.map(c => {
    const capital = CAPITALS[c.name];
    const quiz = !!capital && !TOO_SMALL.has(c.name);
    return {
      ...c, capital, quiz,
      info: capital ? `Hauptstadt: <b>${capital}</b>${EU.has(c.name) ? ' · EU-Mitglied' : ''}${c.name === 'Schweiz' ? ' (offiziell „Bundesstadt“)' : ''}` : 'Kein Quiz-Staat (abhängiges Gebiet oder Nachbarregion).',
    };
  });
  // Nicht-europäische Nachbarn nur als Hintergrund, Türkei und Zypern bleiben wählbar.
  for (const r of regions) if (!r.eu && !['Türkei', 'Zypern'].includes(r.name)) { r.bg = true; r.quiz = false; }
  const goal = params.goal || 'any';
  mountMap(stage, {
    viewBox, regions, rounds: params.rounds || 12, stroke: 0.5,
    mode: params.mode || 'explore', lockMode: params.lockMode,
    onDone: ({ mode }) => { if (goal === 'any' || goal === mode) complete(); },
  });
}
