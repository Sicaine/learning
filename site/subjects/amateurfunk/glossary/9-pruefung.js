// Begriffe der Etappe 9-pruefung. Format: siehe CLAUDE.md (Feld `en` = englischer Name für die Sprachhilfe). Keine doppelten ids!
export default [
  { id: 'leitner-system', term: 'Leitner-System', en: 'Leitner system', cat: 'pruefung', short: 'Lernkartei mit Boxen: Richtig beantwortete Fragen wandern in eine höhere Box und kommen seltener wieder, falsche zurück in Box 1. In dieser Plattform fünf Boxen mit Abständen von 0, 1, 3, 7 und 21 Tagen.', related: ['ausschlussverfahren'], wiki: { de: 'Lernkartei', en: 'Flashcard' } },
  { id: 'ausschlussverfahren', term: 'Ausschlussverfahren', en: 'process of elimination', cat: 'pruefung', short: 'Bei Multiple-Choice-Fragen zuerst die sicher falschen Antworten streichen (falsche Größenordnung oder Einheit, absolute Wörter, falsches Gesetz). Bleiben zwei übrig, steigt die Trefferchance; es gibt keinen Punktabzug für falsche Antworten.', related: ['leitner-system'] },
];
