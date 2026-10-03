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

**[Johann Sebastian Bach](wiki:Johann Sebastian Bach|Johann Sebastian Bach)** (1685–1750), geboren in [Eisenach](wiki:Eisenach|Eisenach), ab 1723 **[Thomaskantor](wiki:Thomaskantor|Thomaskantor) in [Leipzig](wiki:Leipzig|Leipzig)**. Er schrieb über 1000 Werke, vor allem Kirchenmusik — und war Meister der [[fuge|Fuge]], in der ein Thema kunstvoll durch alle Stimmen wandert.[^wp-bach]

- *[Brandenburgische Konzerte](wiki:Brandenburgische Konzerte|Brandenburg Concertos)*, *[Das Wohltemperierte Klavier](wiki:Das Wohltemperierte Klavier|The Well-Tempered Clavier)*, *[Toccata und Fuge d-Moll](wiki:Toccata und Fuge d-Moll BWV 565|Toccata and Fugue in D minor, BWV 565)*
- *[Matthäus-Passion](wiki:Matthäus-Passion)* (1727), *[Weihnachtsoratorium](wiki:Weihnachts-Oratorium|Christmas oratorio)* (1734/35), *[h-Moll-Messe](wiki:h-Moll-Messe|Mass in B minor)*

**[Georg Friedrich Händel](wiki:Georg Friedrich Händel|George Frideric Handel)** (1685–1759), geboren in [Halle](wiki:Halle (Saale)|Halle (Saale)), machte Karriere in **[London](wiki:London|London)** und wurde britischer Staatsbürger. Sein [[oratorium|Oratorium]] *[Messiah](wiki:Messiah|Messiah (Handel))* (1742) mit dem „Halleluja“ ist bis heute ein Weihnachtsklassiker; außerdem *[Wassermusik](wiki:Wassermusik (Händel)|Water Music)* und *[Feuerwerksmusik](wiki:Feuerwerksmusik|Music for the Royal Fireworks)*.[^wp-haendel] Aus Italien kommt der dritte Barockstar: **[Antonio Vivaldi](wiki:Antonio Vivaldi|Antonio Vivaldi)** mit *[Die vier Jahreszeiten](wiki:Die vier Jahreszeiten|The Four Seasons (Vivaldi))*.`,
    },
    {
      id: 'klassik', type: 'text', title: 'Wiener Klassik: Haydn, Mozart, Beethoven',
      md: `
Die [[wiener-klassik|Wiener Klassik]] (ca. 1770–1830) bringt klare, ausgewogene Formen und das moderne Orchester.[^wp-wiener-klassik]

**[Joseph Haydn](wiki:Joseph Haydn|Joseph Haydn)** (1732–1809), der „Vater der [[sinfonie|Sinfonie]]“, schrieb über 100 Sinfonien. Aus seinem *[Kaiserquartett](wiki:Kaiserquartett|Kaiserquartett)* (1797) stammt die Melodie, auf die heute das **[Lied der Deutschen](wiki:Lied der Deutschen|Deutschlandlied)** — die deutsche Nationalhymne — gesungen wird.

**[Wolfgang Amadeus Mozart](wiki:Wolfgang Amadeus Mozart|Wolfgang Amadeus Mozart)** (1756–1791) aus [Salzburg](wiki:Salzburg|Salzburg) trat schon als Kind vor Europas Fürsten auf und schrieb in nur 35 Lebensjahren über 600 Werke. Opern: *[Die Hochzeit des Figaro](wiki:Die Hochzeit des Figaro|The Marriage of Figaro)*, *[Don Giovanni](wiki:Don Giovanni|Don Giovanni)*, ***[Die Zauberflöte](wiki:Die Zauberflöte|The Magic Flute)*** (1791); dazu *[Eine kleine Nachtmusik](wiki:Eine kleine Nachtmusik|Eine kleine Nachtmusik)* und das unvollendete *[Requiem](wiki:Requiem (Mozart)|Requiem (Mozart))*, an dem er bis zu seinem Tod arbeitete.[^wp-mozart]

**[Ludwig van Beethoven](wiki:Ludwig van Beethoven|Ludwig van Beethoven)** (1770–1827), geboren in **[Bonn](wiki:Bonn|Bonn)**, lebte ab 1792 in [Wien](wiki:Wien|Vienna). Er wurde zunehmend taub und komponierte seine größten Werke, ohne sie selbst hören zu können. Neun Sinfonien, darunter die **5.** mit dem „Schicksalsmotiv“ (ta-ta-ta-taaa) und die **9.** (1824) mit dem Schlusschor über [Schillers](wiki:Friedrich Schiller|Friedrich Schiller) *[An die Freude](wiki:An die Freude|Ode to Joy)* — heute **[Europahymne](wiki:Europahymne|Anthem of Europe)**. Außerdem *[Für Elise](wiki:Für Elise|Für Elise)*, die *[Mondscheinsonate](wiki:Klaviersonate Nr. 14 (Beethoven)|Piano Sonata No. 14 (Beethoven))* und seine einzige [[oper|Oper]] *[Fidelio](wiki:Fidelio|Fidelio)*.[^wp-beethoven]`,
    },
    {
      id: 'romantik', type: 'text', title: 'Romantik: Gefühl und große Formen',
      md: `
Die musikalische [[romantik|Romantik]] (ca. 1820–1900) will vor allem eines: Gefühl ausdrücken.

- **[Franz Schubert](wiki:Franz Schubert|Franz Schubert)** (1797–1828): über 600 Lieder, z. B. *[Der Erlkönig](wiki:Erlkönig (Schubert)|Erlkönig (Schubert))* (nach [Goethe](wiki:Johann Wolfgang von Goethe|Johann Wolfgang von Goethe)), der Liederzyklus *[Die Winterreise](wiki:Winterreise|Winterreise)*, die „Unvollendete“ Sinfonie
- **[Felix Mendelssohn Bartholdy](wiki:Felix Mendelssohn Bartholdy|Felix Mendelssohn)**: der *[Hochzeitsmarsch](wiki:Hochzeitsmarsch)* aus *Ein Sommernachtstraum*; er entdeckte Bachs *[Matthäus-Passion](wiki:Matthäus-Passion)* 1829 wieder
- **[Robert und Clara Schumann](wiki:Robert Schumann|Robert Schumann)**: Klaviermusik und Lieder; Clara war eine der gefeiertsten Pianistinnen ihrer Zeit (und bis 2002 auf dem 100-D-Mark-Schein)
- **[Johannes Brahms](wiki:Johannes Brahms|Johannes Brahms)** (1833–1897) aus [Hamburg](wiki:Hamburg|Hamburg): *[Wiegenlied](wiki:Wiegenlied (Brahms)|Wiegenlied (Brahms))* („Guten Abend, gut' Nacht“), *[Ungarische Tänze](wiki:Ungarische Tänze|Hungarian Dances (Brahms))*, *[Ein deutsches Requiem](wiki:Ein deutsches Requiem|A German Requiem (Brahms))*
- **[Richard Wagner](wiki:Richard Wagner|Richard Wagner)** (1813–1883): revolutionierte die Oper mit dem [[leitmotiv|Leitmotiv]] und der Idee des [[gesamtkunstwerk|Gesamtkunstwerks]]. Hauptwerk ist der vierteilige ***[Ring des Nibelungen](wiki:Der Ring des Nibelungen|Der Ring des Nibelungen)*** (rund 15 Stunden Musik); für ihn ließ er das **[Bayreuther Festspielhaus](wiki:Richard-Wagner-Festspielhaus|Bayreuth Festspielhaus)** bauen, eröffnet **1876**. Wagner ist wegen seiner antisemitischen Schriften und seiner späteren Vereinnahmung durch die Nationalsozialisten bis heute umstritten.[^wp-wagner]
- International: [Verdi](wiki:Giuseppe Verdi|Giuseppe Verdi) (*[Aida](wiki:Aida (Oper)|Aida)*, *[La Traviata](wiki:La traviata|La traviata)*), [Tschaikowsky](wiki:Pjotr Iljitsch Tschaikowski|Pyotr Ilyich Tchaikovsky) (*[Schwanensee](wiki:Schwanensee|Swan Lake)*, *[Der Nussknacker](wiki:Der Nussknacker|The Nutcracker)*), [Chopin](wiki:Frédéric Chopin|Frédéric Chopin), [Liszt](wiki:Franz Liszt|Franz Liszt), [Johann Strauss](wiki:Johann Strauss (Sohn)|Johann Strauss II) (Sohn), der „Walzerkönig“ (*[An der schönen blauen Donau](wiki:An der schönen blauen Donau|The Blue Danube)*)`,
    },
    {
      id: 'moderne', type: 'text', title: 'Das 20. Jahrhundert',
      md: `
- **[Richard Strauss](wiki:Richard Strauss|Richard Strauss)**: *[Also sprach Zarathustra](wiki:Also sprach Zarathustra (Strauss)|Also sprach Zarathustra)* (dessen Anfang durch [Kubricks](wiki:Stanley Kubrick|Stanley Kubrick) Film *2001* weltberühmt wurde), die Oper *[Der Rosenkavalier](wiki:Der Rosenkavalier|Der Rosenkavalier)*
- **[Arnold Schönberg](wiki:Arnold Schönberg|Arnold Schoenberg)** entwickelt um 1921 die [[zwoelftonmusik|Zwölftonmusik]] — der Bruch mit Dur und Moll
- **[Carl Orff](wiki:Carl Orff|Carl Orff)**: *[Carmina Burana](wiki:Carmina Burana (Orff)|Carmina Burana (Orff))* (1937) mit dem gewaltigen Chor „O Fortuna“ — heute in Werbung und Filmtrailern allgegenwärtig
- **[Kurt Weill](wiki:Kurt Weill|Kurt Weill)**: *[Die Dreigroschenoper](wiki:Die Dreigroschenoper|The Threepenny Opera)* mit Brecht`,
    },
    {
      id: 'map-komponisten',
      type: 'map',
      title: 'Die Städte der großen Komponisten',
      view: [-1.6, 46.4, 19, 54.6],
      layers: { cities: false },
      places: [
        { name: 'Eisenach', pos: 'l', detail: 'Geburtsstadt von Johann Sebastian Bach (1685).' },
        {
          name: 'Leipzig',
          pos: 'r',
          detail: 'Bach war hier ab 1723 Thomaskantor; Richard Wagner wurde 1813 in Leipzig geboren, und Felix Mendelssohn Bartholdy leitete das Gewandhausorchester.',
        },
        { name: 'Halle', pos: 't', detail: 'Geburtsstadt von Georg Friedrich Händel (1685).' },
        {
          name: 'London',
          pos: 'l',
          detail: 'Händel lebte hier ab 1712 und wurde 1727 britischer Staatsbürger; hier entstand die *Wassermusik*.',
        },
        { name: 'Salzburg', pos: 'l', detail: 'Geburtsstadt von Wolfgang Amadeus Mozart (1756).' },
        {
          name: 'Wien',
          pos: 'r',
          detail: 'Hier wirkten Haydn, Mozart, Beethoven und Schubert — die Wiener Klassik. 1824 wurde hier Beethovens 9. Sinfonie uraufgeführt.',
        },
        { name: 'Bonn', pos: 'l', detail: 'Geburtsstadt von Ludwig van Beethoven (1770).' },
        { name: 'Hamburg', pos: 'l', detail: 'Geburtsstadt von Johannes Brahms (1833).' },
        {
          name: 'Bayreuth',
          pos: 'r',
          detail: 'Richard Wagner ließ hier das Festspielhaus bauen, eröffnet 1876; die Bayreuther Festspiele finden bis heute statt.',
        },
      ],
      caption: 'Fast alle großen Namen der deutschen Musik lebten in einem Streifen zwischen Hamburg und Wien.',
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
      id: 'map-komponisten-quiz',
      type: 'map',
      title: 'Komponistenstädte finden',
      view: [-1.6, 46.4, 19, 54.6],
      layers: { cities: false },
      quiz: { rounds: 6 },
      places: [
        { name: 'Eisenach', label: 'Geburtsstadt von J. S. Bach' },
        { name: 'Halle', label: 'Geburtsstadt von Händel' },
        { name: 'Salzburg', label: 'Geburtsstadt von Mozart' },
        { name: 'Bonn', label: 'Geburtsstadt von Beethoven' },
        { name: 'Hamburg', label: 'Geburtsstadt von Brahms' },
        { name: 'Bayreuth', label: 'Wagners Festspielhaus' },
        { name: 'Wien', label: 'Stadt der Wiener Klassik' },
      ],
    },
    {
      id: 'fact-beethoven', type: 'callout', tone: 'fact', title: 'Beethoven hört den Applaus nicht',
      md: `Bei der Uraufführung der 9. Sinfonie 1824 in [Wien](wiki:Wien|Vienna) stand der fast völlig taube Beethoven mit auf der Bühne. Am Ende soll eine Sängerin ihn umgedreht haben, damit er den tosenden Applaus wenigstens **sehen** konnte — das Publikum schwenkte Hüte und Taschentücher.`,
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
