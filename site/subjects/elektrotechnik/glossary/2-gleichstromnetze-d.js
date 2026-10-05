// Begriffe (Teil d) der Etappe 2-gleichstromnetze — keine doppelten ids (auch nicht zu seed.js und den anderen Teilen)!
export default [
  { id: 'querstrom', term: 'Querstrom', en: 'Bleeder current', cat: 'schaltungen', short: 'Strom, der dauernd durch beide Widerstände eines Spannungsteilers fließt. Faustregel: mindestens das Zehnfache des Laststroms.', related: ['spannungsteiler', 'belasteter-spannungsteiler'] },
  { id: 'genauigkeitsklasse', term: 'Genauigkeitsklasse', en: 'Accuracy class', cat: 'messen', short: 'Angabe in Prozent des Messbereichs-Endwerts, wie groß der größte Fehler eines Zeigerinstruments ist: F = ±G/100 · W_E/W_M.', symbol: 'G', related: ['messfehler', 'voltmeter'], wiki: { de: 'Genauigkeitsklasse', en: 'Accuracy class' } },
  { id: 'messbereichserweiterung', term: 'Messbereichserweiterung', en: 'Range extension', cat: 'messen', short: 'Anpassung eines Messwerks an größere Ströme (Shunt parallel) oder Spannungen (Vorwiderstand in Reihe).', related: ['shunt', 'vorwiderstand'] },
  { id: 'ersatzschaltbild', term: 'Ersatzschaltbild', en: 'Equivalent circuit', cat: 'schaltungen', short: 'Vereinfachte Schaltung aus idealen Bauteilen, die das Verhalten eines realen Bauteils oder Netzes beschreibt (z. B. Quelle mit Innenwiderstand).', related: ['ersatzspannungsquelle', 'innenwiderstand'], wiki: { de: 'Ersatzschaltbild', en: 'Equivalent circuit' } },
];
