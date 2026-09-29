// Glossary terms introduced in stage 5-houses.
export default [
  { id: 'manufacture', term: 'Manufacture', de: 'Manufaktur', cat: 'industry', aka: ['manufacture d’horlogerie'],
    short: 'A watchmaker that designs and produces its own movements (at least largely) in-house.',
    long: 'Contrast with brands that buy finished movements (*ébauches*) from suppliers and case them. "In-house" is a spectrum — very few firms make literally every part, such as hairsprings.',
    related: ['movement'] },
  { id: 'glashuette', term: 'Glashütte', de: 'Glashütte', cat: 'industry',
    short: 'A small town in Saxony, the center of German fine watchmaking since Ferdinand Adolph Lange settled there in 1845.',
    related: ['three-quarter-plate', 'manufacture'] },
  { id: 'three-quarter-plate', term: 'Three-quarter plate', de: 'Dreiviertelplatine', cat: 'movement',
    short: 'A single large bridge covering most of the gear train — a signature of Glashütte movements.',
    long: 'Instead of separate bridges for each wheel, one plate covers about three quarters of the movement, leaving the balance visible. Stiff and stable; associated with Lange and Glashütte tradition, typically decorated with *Glashütte ribbing* (Glashütter Streifenschliff).',
    related: ['glashuette', 'movement'] },
  { id: 'gub', term: 'GUB', de: 'VEB Glashütter Uhrenbetriebe', cat: 'history',
    short: 'The East German state watch combine formed in 1951 from all Glashütte watch companies; privatized after 1990, renamed Glashütte Original in 1994.',
    related: ['glashuette'] },
];
