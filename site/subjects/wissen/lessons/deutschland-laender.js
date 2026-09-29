export default {
  id: 'deutschland-laender',
  title: 'Deutschland: Länder & Hauptstädte',
  summary: 'Deutschland ist ein Bundesstaat aus 16 [[bundesland|Ländern]]. Wer sie auf der Karte findet, ihre Hauptstädte kennt und weiß, warum es genau diese 16 sind, versteht Nachrichten, Wahlabende und Dialektwitze besser.',
  minutes: 20,
  goals: [
    'Alle 16 Länder auf der Karte finden und ihre Hauptstädte nennen',
    '[[stadtstaat|Stadtstaaten]], [[flaechenland|Flächenländer]] und [[freistaat|Freistaaten]] unterscheiden',
    'Die Rekordhalter kennen: größtes, kleinstes, bevölkerungsreichstes Land',
    'Erklären, wie die heutigen Länder nach 1945 und 1990 entstanden sind',
  ],
  blocks: [
    {
      id: 'bundesstaat', type: 'text', title: '16 Länder, ein Bund',
      md: `
Die Bundesrepublik ist ein **Bundesstaat**: Der Bund regelt, was alle gemeinsam betrifft (Außenpolitik, Verteidigung, Währung), die 16 **Länder** sind für vieles andere zuständig — allen voran Schule und Hochschule, Polizei und Kultur. Das Grundgesetz spricht übrigens nur von „Ländern“; *Bundesland* ist die Alltagssprache.[^bpb-bundeslaender]

Drei Arten von Ländern solltest du unterscheiden können:

- **[[stadtstaat|Stadtstaaten]]:** Berlin, Hamburg und Bremen — Stadt und Land zugleich.
- **[[flaechenland|Flächenländer]]:** die übrigen 13, gegliedert in Kreise und Gemeinden.
- **[[freistaat|Freistaaten]]:** Bayern, Sachsen und Thüringen tragen diesen Titel. Er ist das alte deutsche Wort für *Republik* — Sonderrechte hat damit niemand.`,
    },
    {
      id: 'karte-entdecken', type: 'viz', viz: 'geo-bundeslaender', title: 'Die Karte erkunden',
      params: { mode: 'explore', lockMode: true },
      caption: 'Kartengrundlage: deutschlandGeoJSON, gemeinfrei, vereinfacht.[^geojson-de]',
      task: 'Klicke dich durch die Länder und finde heraus: Welches Land hat die **meisten Einwohner**, welches die **größte Fläche** — und in welchem Land liegt Berlin wie eine Insel?',
    },
    {
      id: 'ueberblick', type: 'text', title: 'Die Länder im Überblick',
      md: `
<table>
<tr><th>Land</th><th>Hauptstadt</th><th>Einwohner (rund)</th><th>Fläche</th></tr>
<tr><td>Baden-Württemberg</td><td>Stuttgart</td><td>11,3 Mio.</td><td>35.748 km²</td></tr>
<tr><td>Bayern</td><td>München</td><td>13,4 Mio.</td><td>70.542 km²</td></tr>
<tr><td>Berlin</td><td>Berlin</td><td>3,8 Mio.</td><td>891 km²</td></tr>
<tr><td>Brandenburg</td><td>Potsdam</td><td>2,6 Mio.</td><td>29.654 km²</td></tr>
<tr><td>Bremen</td><td>Bremen</td><td>0,7 Mio.</td><td>420 km²</td></tr>
<tr><td>Hamburg</td><td>Hamburg</td><td>1,9 Mio.</td><td>755 km²</td></tr>
<tr><td>Hessen</td><td>Wiesbaden</td><td>6,4 Mio.</td><td>21.116 km²</td></tr>
<tr><td>Mecklenburg-Vorpommern</td><td>Schwerin</td><td>1,6 Mio.</td><td>23.295 km²</td></tr>
<tr><td>Niedersachsen</td><td>Hannover</td><td>8,1 Mio.</td><td>47.710 km²</td></tr>
<tr><td>Nordrhein-Westfalen</td><td>Düsseldorf</td><td>18,1 Mio.</td><td>34.113 km²</td></tr>
<tr><td>Rheinland-Pfalz</td><td>Mainz</td><td>4,2 Mio.</td><td>19.858 km²</td></tr>
<tr><td>Saarland</td><td>Saarbrücken</td><td>1,0 Mio.</td><td>2.572 km²</td></tr>
<tr><td>Sachsen</td><td>Dresden</td><td>4,1 Mio.</td><td>18.450 km²</td></tr>
<tr><td>Sachsen-Anhalt</td><td>Magdeburg</td><td>2,2 Mio.</td><td>20.467 km²</td></tr>
<tr><td>Schleswig-Holstein</td><td>Kiel</td><td>3,0 Mio.</td><td>15.804 km²</td></tr>
<tr><td>Thüringen</td><td>Erfurt</td><td>2,1 Mio.</td><td>16.202 km²</td></tr>
</table>

Zusammen: rund **84 Mio. Menschen** auf **357.600 km²**.[^wp-land-deutschland] [^destatis-laender]

Die Rekorde, die man sich merken sollte:

- **Nordrhein-Westfalen** hat die meisten Einwohner — gut ein Fünftel aller Deutschen.
- **Bayern** ist das größte Land (fast ein Fünftel der Fläche Deutschlands), gefolgt von Niedersachsen.
- **Bremen** ist das kleinste Land, das **Saarland** das kleinste Flächenland.
- **Mecklenburg-Vorpommern** ist am dünnsten besiedelt, **Berlin** am dichtesten.`,
    },
    {
      id: 'nicht-groesste', type: 'callout', tone: 'warning', title: 'Die Hauptstadt ist nicht immer die größte Stadt',
      md: `
In vier Flächenländern ist die [[landeshauptstadt]] kleiner als eine andere Stadt im selben Land — ein Klassiker in jedem Quiz:

- **Düsseldorf** — größer ist Köln
- **Wiesbaden** — größer ist Frankfurt am Main
- **Dresden** — größer ist Leipzig
- **Schwerin** — größer ist Rostock

Oft steckt Geschichte dahinter: Wiesbaden war Hauptstadt des Herzogtums Nassau, Frankfurt dagegen lange freie Reichsstadt. Und in Nordrhein-Westfalen entschied die britische Besatzungsmacht 1946 für Düsseldorf.`,
    },
    {
      id: 'quiz-hauptstaedte', type: 'quiz', title: 'Größer als die Hauptstadt?',
      question: 'In welchen Ländern gibt es eine Stadt, die **größer** ist als die Landeshauptstadt? Wähle alle zutreffenden.',
      options: [
        { text: 'Nordrhein-Westfalen (Hauptstadt Düsseldorf)', correct: true, why: 'Köln hat über eine Million Einwohner, Düsseldorf rund 630.000.' },
        { text: 'Hessen (Hauptstadt Wiesbaden)', correct: true, why: 'Frankfurt am Main ist mehr als doppelt so groß wie Wiesbaden.' },
        { text: 'Sachsen (Hauptstadt Dresden)', correct: true, why: 'Leipzig hat Dresden inzwischen überholt.' },
        { text: 'Mecklenburg-Vorpommern (Hauptstadt Schwerin)', correct: true, why: 'Rostock ist etwa doppelt so groß wie Schwerin.' },
        { text: 'Niedersachsen (Hauptstadt Hannover)', correct: false, why: 'Hannover ist die größte Stadt Niedersachsens.' },
        { text: 'Schleswig-Holstein (Hauptstadt Kiel)', correct: false, why: 'Kiel ist knapp größer als Lübeck.' },
        { text: 'Thüringen (Hauptstadt Erfurt)', correct: false, why: 'Erfurt ist die größte Stadt Thüringens.' },
      ],
    },
    {
      id: 'karte-wo-liegt', type: 'game', viz: 'geo-bundeslaender', title: 'Wo liegt …?',
      params: { mode: 'locate', lockMode: true, goal: 'locate' },
    },
    {
      id: 'match-hauptstaedte', type: 'match', title: 'Land und Hauptstadt',
      prompt: 'Ordne jedem Land seine Hauptstadt zu.',
      pairs: [
        ['Brandenburg', 'Potsdam'], ['Sachsen-Anhalt', 'Magdeburg'], ['Rheinland-Pfalz', 'Mainz'], ['Schleswig-Holstein', 'Kiel'],
        ['Thüringen', 'Erfurt'], ['Saarland', 'Saarbrücken'], ['Niedersachsen', 'Hannover'], ['Mecklenburg-Vorpommern', 'Schwerin'],
      ],
    },
    {
      id: 'karte-hauptstaedte', type: 'game', viz: 'geo-bundeslaender', title: 'Hauptstadt-Quiz',
      params: { mode: 'capital', lockMode: true, goal: 'capital' },
    },
    {
      id: 'geschichte', type: 'text', title: 'Warum genau diese 16?',
      md: `
Die meisten Länder sind jünger als die Bundesrepublik selbst — sie wurden nach 1945 von den **Besatzungsmächten** gegründet, oft quer zu alten Grenzen. Nordrhein-Westfalen etwa entstand 1946 in der britischen Zone aus Teilen der preußischen Rheinprovinz und Westfalens. Der größte deutsche Staat, **Preußen**, wurde 1947 von den Alliierten förmlich aufgelöst.

- **1949:** Die Bundesrepublik wird mit elf Ländern gegründet (im Südwesten zunächst drei: Württemberg-Baden, Baden und Württemberg-Hohenzollern).
- **1952:** Nach einer Volksabstimmung verschmelzen die drei zu **Baden-Württemberg** — die einzige erfolgreiche Länderfusion. Im selben Jahr schafft die **DDR** ihre fünf Länder ab und ersetzt sie durch Bezirke.
- **1957:** Das **Saarland**, nach dem Krieg unter französischer Verwaltung, tritt nach einer Volksabstimmung der Bundesrepublik bei.
- **1990:** Mit der Wiedervereinigung entstehen Brandenburg, Mecklenburg-Vorpommern, Sachsen, Sachsen-Anhalt und Thüringen neu — die „neuen Länder“. Berlin wird ein Land.
- **1996:** Eine Fusion von Berlin und Brandenburg scheitert in der Volksabstimmung an den Brandenburgern.`,
    },
    {
      id: 'zeitleiste', type: 'game', viz: 'timeline', title: 'Wie die Länder entstanden',
      params: {
        mode: 'sort', events: [
          { year: 1946, label: 'NRW gegründet' },
          { year: 1947, label: 'Preußen aufgelöst' },
          { year: 1949, label: 'Gründung der BRD' },
          { year: 1952, label: 'Baden-Württemberg' },
          { year: 1957, label: 'Saarland tritt bei' },
          { year: 1990, label: 'Neue Länder' },
          { year: 1996, label: 'Fusion Berlin scheitert' },
        ],
      },
    },
    {
      id: 'nachbarn-bayern', type: 'numeric', title: 'Nachbarn zählen',
      question: 'An wie viele andere **Bundesländer** grenzt Bayern? (Schau notfalls auf die Karte oben.)',
      answer: 4, tolerance: 0,
      hint: 'Gehe im Uhrzeigersinn von Westen nach Osten an der Nordgrenze Bayerns entlang.',
      explain: 'Baden-Württemberg, Hessen, Thüringen und Sachsen. Dazu kommen drei Staaten: Österreich, Tschechien und die Schweiz (über den Bodensee).',
    },
    {
      id: 'fact-bremen', type: 'callout', tone: 'fact', title: 'Ein Land, zwei Städte',
      md: `Das Land Bremen besteht aus **zwei** Städten, die gar nicht aneinandergrenzen: Bremen und das rund 60 km flussabwärts gelegene **Bremerhaven** — dazwischen liegt Niedersachsen. Und Hamburg besitzt mitten im Wattenmeer die Insel **Neuwerk**, gut 100 km vom Rathaus entfernt.`,
    },
    {
      id: 'recall-foederal', type: 'recall', title: 'Erkläre es jemandem aus dem Ausland',
      prompt: 'Eine Freundin aus Frankreich fragt: „Warum ist Frankfurt nicht die Hauptstadt von Hessen — und warum darf jedes Bundesland seine eigenen Schulregeln machen?“ Antworte in 3–4 Sätzen.',
      answer: `Deutschland ist ein **Bundesstaat**: Die 16 Länder haben eigene Verfassungen, Parlamente und Regierungen, und das Grundgesetz weist ihnen bestimmte Aufgaben zu — Bildung ist die wichtigste davon („Kulturhoheit der Länder“). Welche Stadt Hauptstadt eines Landes ist, hat historische Gründe und muss nicht die größte sein: **Wiesbaden** war Residenz des Herzogtums Nassau, Frankfurt dagegen freie Reichsstadt und später Handels- und Finanzzentrum. Ähnlich ist es bei Düsseldorf/Köln, Dresden/Leipzig und Schwerin/Rostock.`,
      hints: ['Welche Ebene ist in Deutschland für Schulen zuständig?', 'Hauptstadt ≠ größte Stadt — warum nicht?'],
      cards: ['nicht-groesste', 'kulturhoheit'],
    },
  ],
  cards: [
    { id: 'anzahl', front: 'Wie viele Länder hat Deutschland — und wie viele davon sind Stadtstaaten?', back: '16 Länder, davon 3 Stadtstaaten (Berlin, Hamburg, Bremen) und 13 Flächenländer.' },
    { id: 'freistaaten', front: 'Welche drei Länder nennen sich **Freistaat**?', back: 'Bayern, Sachsen und Thüringen. „Freistaat“ = altes deutsches Wort für Republik, ohne Sonderrechte.' },
    { id: 'nrw', front: 'Bevölkerungsreichstes Bundesland?', back: 'Nordrhein-Westfalen (rund 18 Mio. Einwohner), Hauptstadt Düsseldorf.' },
    { id: 'bayern', front: 'Flächengrößtes Bundesland?', back: 'Bayern (rund 70.500 km², fast ein Fünftel Deutschlands), Hauptstadt München.' },
    { id: 'kleinste', front: 'Kleinstes Land — und kleinstes Flächenland?', back: 'Bremen (rund 420 km²); kleinstes Flächenland ist das Saarland.' },
    { id: 'nicht-groesste', front: 'In welchen vier Ländern ist die Hauptstadt **nicht** die größte Stadt?', back: 'NRW (Düsseldorf < Köln), Hessen (Wiesbaden < Frankfurt), Sachsen (Dresden < Leipzig), Mecklenburg-Vorpommern (Schwerin < Rostock).' },
    { id: 'hs-bb', front: 'Hauptstadt von Brandenburg?', back: 'Potsdam.' },
    { id: 'hs-st', front: 'Hauptstadt von Sachsen-Anhalt?', back: 'Magdeburg.' },
    { id: 'hs-rp', front: 'Hauptstadt von Rheinland-Pfalz?', back: 'Mainz.' },
    { id: 'hs-sh', front: 'Hauptstadt von Schleswig-Holstein?', back: 'Kiel.' },
    { id: 'hs-mv', front: 'Hauptstadt von Mecklenburg-Vorpommern?', back: 'Schwerin.' },
    { id: 'hs-th', front: 'Hauptstadt von Thüringen?', back: 'Erfurt.' },
    { id: 'hs-ni', front: 'Hauptstadt von Niedersachsen?', back: 'Hannover.' },
    { id: 'bw-1952', front: 'Wann und wie entstand Baden-Württemberg?', back: '1952, durch Zusammenschluss von Württemberg-Baden, Baden und Württemberg-Hohenzollern nach einer Volksabstimmung — die einzige erfolgreiche Länderfusion.' },
    { id: 'saarland-1957', front: 'Seit wann gehört das Saarland zur Bundesrepublik?', back: 'Seit 1. Januar 1957 (nach der Volksabstimmung 1955 über das Saarstatut).' },
    { id: 'neue-laender', front: 'Welche fünf Länder nennt man die „neuen Länder“?', back: 'Brandenburg, Mecklenburg-Vorpommern, Sachsen, Sachsen-Anhalt und Thüringen — 1990 wiedergegründet (die DDR hatte sie 1952 durch Bezirke ersetzt).' },
    { id: 'kulturhoheit', front: 'Was bedeutet „Kulturhoheit der Länder“?', back: 'Bildung (Schulen, Hochschulen) und Kultur sind Sache der Länder, nicht des Bundes — daher unterschiedliche Schulsysteme.' },
    { id: 'bremen-zwei', front: 'Aus welchen zwei Städten besteht das Land Bremen?', back: 'Bremen und Bremerhaven.' },
  ],
};
