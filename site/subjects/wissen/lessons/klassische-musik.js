export default {
  id: 'klassische-musik',
  title: 'Klassische Musik',
  summary: 'Deutschland und Österreich waren über zwei Jahrhunderte das Zentrum der europäischen Musik: Bach, Händel, Haydn, Mozart, Beethoven, Schubert, Brahms, Wagner. Hier lernst du die Epochen, die großen Namen und die Werke, die jeder schon einmal gehört hat.',
  minutes: 22,
  goals: [
    'Die Musikepochen Barock, [[wiener-klassik|Wiener Klassik]], Romantik und Moderne unterscheiden',
    'Die wichtigsten Komponisten mit Lebensdaten und Hauptwerken verbinden',
    'Begriffe wie [[sinfonie|Sinfonie]], [[fuge|Fuge]], [[oper|Oper]], [[oratorium|Oratorium]] und [[leitmotiv|Leitmotiv]] erklären',
    'Wissen, woher die Melodien der deutschen Nationalhymne und der Europahymne stammen',
  ],
  blocks: [
    {
      id: 'barock', type: 'text', title: 'Barock: Bach und Händel (ca. 1600–1750)',
      md: `
Im Jahr **1685** werden im Abstand von nur vier Wochen und rund 130 Kilometern die beiden größten Komponisten des [[barock|Barock]] geboren:

**Johann Sebastian Bach** (1685–1750), geboren in Eisenach, ab 1723 **Thomaskantor in Leipzig**. Er schrieb über 1000 Werke, vor allem Kirchenmusik — und war Meister der [[fuge|Fuge]], in der ein Thema kunstvoll durch alle Stimmen wandert.[^wp-bach]

- *Brandenburgische Konzerte*, *Das Wohltemperierte Klavier*, *Toccata und Fuge d-Moll*
- *Matthäus-Passion* (1727), *Weihnachtsoratorium* (1734/35), *h-Moll-Messe*

**Georg Friedrich Händel** (1685–1759), geboren in Halle, machte Karriere in **London** und wurde britischer Staatsbürger. Sein [[oratorium|Oratorium]] *Messiah* (1742) mit dem „Halleluja“ ist bis heute ein Weihnachtsklassiker; außerdem *Wassermusik* und *Feuerwerksmusik*.[^wp-haendel] Aus Italien kommt der dritte Barockstar: **Antonio Vivaldi** mit *Die vier Jahreszeiten*.`,
    },
    {
      id: 'klassik', type: 'text', title: 'Wiener Klassik: Haydn, Mozart, Beethoven',
      md: `
Die [[wiener-klassik|Wiener Klassik]] (ca. 1770–1830) bringt klare, ausgewogene Formen und das moderne Orchester.[^wp-wiener-klassik]

**Joseph Haydn** (1732–1809), der „Vater der [[sinfonie|Sinfonie]]“, schrieb über 100 Sinfonien. Aus seinem *Kaiserquartett* (1797) stammt die Melodie, auf die heute das **Lied der Deutschen** — die deutsche Nationalhymne — gesungen wird.

**Wolfgang Amadeus Mozart** (1756–1791) aus Salzburg trat schon als Kind vor Europas Fürsten auf und schrieb in nur 35 Lebensjahren über 600 Werke. Opern: *Die Hochzeit des Figaro*, *Don Giovanni*, ***Die Zauberflöte*** (1791); dazu *Eine kleine Nachtmusik* und das unvollendete *Requiem*, an dem er bis zu seinem Tod arbeitete.[^wp-mozart]

**Ludwig van Beethoven** (1770–1827), geboren in **Bonn**, lebte ab 1792 in Wien. Er wurde zunehmend taub und komponierte seine größten Werke, ohne sie selbst hören zu können. Neun Sinfonien, darunter die **5.** mit dem „Schicksalsmotiv“ (ta-ta-ta-taaa) und die **9.** (1824) mit dem Schlusschor über Schillers *An die Freude* — heute **Europahymne**. Außerdem *Für Elise*, die *Mondscheinsonate* und seine einzige [[oper|Oper]] *Fidelio*.[^wp-beethoven]`,
    },
    {
      id: 'romantik', type: 'text', title: 'Romantik: Gefühl und große Formen',
      md: `
Die musikalische [[romantik|Romantik]] (ca. 1820–1900) will vor allem eines: Gefühl ausdrücken.

- **Franz Schubert** (1797–1828): über 600 Lieder, z. B. *Der Erlkönig* (nach Goethe), der Liederzyklus *Die Winterreise*, die „Unvollendete“ Sinfonie
- **Felix Mendelssohn Bartholdy**: der *Hochzeitsmarsch* aus *Ein Sommernachtstraum*; er entdeckte Bachs *Matthäus-Passion* 1829 wieder
- **Robert und Clara Schumann**: Klaviermusik und Lieder; Clara war eine der gefeiertsten Pianistinnen ihrer Zeit (und bis 2002 auf dem 100-D-Mark-Schein)
- **Johannes Brahms** (1833–1897) aus Hamburg: *Wiegenlied* („Guten Abend, gut' Nacht“), *Ungarische Tänze*, *Ein deutsches Requiem*
- **Richard Wagner** (1813–1883): revolutionierte die Oper mit dem [[leitmotiv|Leitmotiv]] und der Idee des [[gesamtkunstwerk|Gesamtkunstwerks]]. Hauptwerk ist der vierteilige ***Ring des Nibelungen*** (rund 15 Stunden Musik); für ihn ließ er das **Bayreuther Festspielhaus** bauen, eröffnet **1876**. Wagner ist wegen seiner antisemitischen Schriften und seiner späteren Vereinnahmung durch die Nationalsozialisten bis heute umstritten.[^wp-wagner]
- International: Verdi (*Aida*, *La Traviata*), Tschaikowsky (*Schwanensee*, *Der Nussknacker*), Chopin, Liszt, Johann Strauss (Sohn), der „Walzerkönig“ (*An der schönen blauen Donau*)`,
    },
    {
      id: 'moderne', type: 'text', title: 'Das 20. Jahrhundert',
      md: `
- **Richard Strauss**: *Also sprach Zarathustra* (dessen Anfang durch Kubricks Film *2001* weltberühmt wurde), die Oper *Der Rosenkavalier*
- **Arnold Schönberg** entwickelt um 1921 die [[zwoelftonmusik|Zwölftonmusik]] — der Bruch mit Dur und Moll
- **Carl Orff**: *Carmina Burana* (1937) mit dem gewaltigen Chor „O Fortuna“ — heute in Werbung und Filmtrailern allgegenwärtig
- **Kurt Weill**: *Die Dreigroschenoper* mit Brecht`,
    },
    {
      id: 'timeline', type: 'game', viz: 'timeline', title: 'Komponisten nach Geburtsjahr',
      params: {
        mode: 'sort',
        events: [
          { year: 1685, label: 'J. S. Bach' },
          { year: 1732, label: 'Joseph Haydn' },
          { year: 1756, label: 'W. A. Mozart' },
          { year: 1770, label: 'L. v. Beethoven' },
          { year: 1797, label: 'Franz Schubert' },
          { year: 1813, label: 'Richard Wagner' },
          { year: 1833, label: 'Johannes Brahms' },
          { year: 1874, label: 'Arnold Schönberg' },
        ],
      },
    },
    {
      id: 'match-werke', type: 'match', title: 'Komponist ↔ Werk',
      pairs: [
        ['Johann Sebastian Bach', 'Matthäus-Passion'],
        ['Georg Friedrich Händel', 'Messiah'],
        ['Antonio Vivaldi', 'Die vier Jahreszeiten'],
        ['Wolfgang Amadeus Mozart', 'Die Zauberflöte'],
        ['Ludwig van Beethoven', 'Fidelio'],
        ['Richard Wagner', 'Der Ring des Nibelungen'],
        ['Carl Orff', 'Carmina Burana'],
      ],
    },
    {
      id: 'order-epochen', type: 'order', title: 'Musikepochen ordnen',
      prompt: 'Bringe die Musikepochen in die richtige Reihenfolge.',
      items: ['Gregorianischer Choral (Mittelalter)', 'Renaissance', 'Barock', 'Wiener Klassik', 'Romantik', 'Zwölftonmusik / Neue Musik'],
    },
    {
      id: 'quiz-hymnen', type: 'quiz', title: 'Hymnen',
      question: 'Welche Aussagen über Nationalhymne und Europahymne stimmen?',
      options: [
        { text: 'Die Melodie der deutschen Nationalhymne stammt von Joseph Haydn.', correct: true, why: 'Aus seinem *Kaiserquartett* (1797), ursprünglich für die Hymne „Gott erhalte Franz den Kaiser“.' },
        { text: 'Der Text der Nationalhymne stammt von Hoffmann von Fallersleben.', correct: true, why: '*Das Lied der Deutschen* (1841); seit 1991 ist nur die dritte Strophe die Nationalhymne.' },
        { text: 'Die Europahymne ist Beethovens Vertonung von Schillers *An die Freude*.', correct: true, why: 'Aus dem letzten Satz der 9. Sinfonie; offiziell wird sie ohne Text gespielt.' },
        { text: 'Die Europahymne stammt von Mozart.', correct: false, why: 'Sie stammt von Beethoven.' },
      ],
    },
    {
      id: 'fact-beethoven', type: 'callout', tone: 'fact', title: 'Beethoven hört den Applaus nicht',
      md: `Bei der Uraufführung der 9. Sinfonie 1824 in Wien stand der fast völlig taube Beethoven mit auf der Bühne. Am Ende soll eine Sängerin ihn umgedreht haben, damit er den tosenden Applaus wenigstens **sehen** konnte — das Publikum schwenkte Hüte und Taschentücher.`,
    },
    {
      id: 'mozart-alter', type: 'numeric', title: 'Mozarts Lebenszeit',
      question: 'Mozart wurde am 27. Januar 1756 geboren und starb am 5. Dezember 1791. Wie alt wurde er?',
      answer: 35, tolerance: 0, unit: 'Jahre',
      explain: '35 Jahre. In diesem kurzen Leben entstanden über 600 Werke, darunter 41 Sinfonien und über 20 Opern und Singspiele.',
    },
    {
      id: 'recall-klassik', type: 'recall', title: 'Die drei Wiener Klassiker',
      prompt: 'Wer sind die drei großen Komponisten der **Wiener Klassik**, und welches Werk verbindest du jeweils mit ihnen?',
      answer: `**Joseph Haydn** (1732–1809) — „Vater der Sinfonie“, über 100 Sinfonien; das *Kaiserquartett* mit der Melodie der deutschen Nationalhymne. **Wolfgang Amadeus Mozart** (1756–1791) — *Die Zauberflöte*, *Don Giovanni*, *Eine kleine Nachtmusik*, das *Requiem*. **Ludwig van Beethoven** (1770–1827) — neun Sinfonien, v. a. die 5. („Schicksalssinfonie“) und die 9. mit der *Ode an die Freude* (Europahymne), *Für Elise*, *Fidelio*. Alle drei wirkten in Wien.`,
      hints: ['Einer wurde in Salzburg, einer in Bonn geboren.'],
      cards: ['wiener-klassiker'],
    },
  ],
  cards: [
    { id: 'bach-haendel-1685', front: 'Welche zwei Barockkomponisten wurden beide 1685 geboren?', back: 'Johann Sebastian Bach (Eisenach) und Georg Friedrich Händel (Halle).' },
    { id: 'bach-leipzig', front: 'Welches Amt hatte Bach ab 1723 in Leipzig?', back: 'Thomaskantor.' },
    { id: 'bach-werke', front: 'Drei Werke von Bach?', back: '*Brandenburgische Konzerte*, *Matthäus-Passion*, *Weihnachtsoratorium* (auch *Wohltemperiertes Klavier*).' },
    { id: 'haendel', front: 'Händels berühmtestes Werk und wo er Karriere machte?', back: '*Messiah* (1742, „Halleluja“); in London.' },
    { id: 'vivaldi', front: 'Wer komponierte *Die vier Jahreszeiten*?', back: 'Antonio Vivaldi.' },
    { id: 'wiener-klassiker', front: 'Die drei Komponisten der Wiener Klassik?', back: 'Haydn, Mozart, Beethoven.' },
    { id: 'haydn-hymne', front: 'Woher stammt die Melodie der deutschen Nationalhymne?', back: 'Aus Joseph Haydns *Kaiserquartett* (1797).' },
    { id: 'mozart', front: 'Mozart: Lebensdaten, Geburtsort, drei Opern?', back: '1756–1791, Salzburg; *Figaro*, *Don Giovanni*, *Die Zauberflöte*.' },
    { id: 'beethoven', front: 'Beethoven: Lebensdaten, Geburtsort?', back: '1770–1827, Bonn (ab 1792 in Wien).' },
    { id: 'neunte', front: 'Was ist das Besondere an Beethovens 9. Sinfonie?', back: 'Schlusschor über Schillers *An die Freude* (1824) — heute die Europahymne.' },
    { id: 'fidelio', front: 'Beethovens einzige Oper?', back: '*Fidelio*.' },
    { id: 'schubert', front: 'Franz Schubert: wofür berühmt?', back: 'Über 600 Lieder (*Erlkönig*, *Winterreise*), die „Unvollendete“.' },
    { id: 'brahms', front: 'Welches Schlaflied stammt von Brahms?', back: 'Das *Wiegenlied* („Guten Abend, gut\' Nacht“).' },
    { id: 'wagner', front: 'Wagners Hauptwerk und sein Festspielort?', back: '*Der Ring des Nibelungen*; Bayreuth (Festspielhaus eröffnet 1876).' },
    { id: 'leitmotiv', front: 'Was ist ein Leitmotiv?', back: 'Wiederkehrendes musikalisches Motiv für eine Person, Sache oder Idee — typisch für Wagner und Filmmusik.' },
    { id: 'fuge', front: 'Was ist eine Fuge?', back: 'Mehrstimmige Form, in der ein Thema nacheinander in allen Stimmen erscheint (Bach).' },
    { id: 'oratorium', front: 'Unterschied Oper — Oratorium?', back: 'Beide mit Gesang und Orchester; das Oratorium wird ohne Bühne/Kostüm aufgeführt und behandelt meist geistliche Stoffe.' },
    { id: 'orff', front: 'Aus welchem Werk stammt „O Fortuna“?', back: 'Carl Orff, *Carmina Burana* (1937).' },
  ],
};
