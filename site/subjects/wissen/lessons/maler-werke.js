export default {
  id: 'maler-werke',
  title: 'Maler & Meisterwerke',
  summary: 'Die Bilder, die man einfach kennt — von der *Mona Lisa* bis zur Suppendose. Wer hat sie gemalt, wann, und wo hängen sie heute? Mit einem Schwerpunkt auf deutschen Künstlern von Dürer bis Gerhard Richter.',
  minutes: 22,
  goals: [
    'Zwölf weltberühmte Gemälde ihren Malern zuordnen',
    'Die Werke grob datieren und einer Epoche zuordnen',
    'Wichtige deutsche Künstler (Dürer, [[caspar-david-friedrich|C. D. Friedrich]], Marc, Beuys, Richter) kennen',
    'Wissen, in welchen Museen einige Ikonen hängen',
  ],
  blocks: [
    {
      id: 'renaissance', type: 'text', title: 'Die Giganten der Renaissance',
      md: `
**[Leonardo da Vinci](wiki:Leonardo da Vinci|Leonardo da Vinci)** (1452–1519) war Maler, Erfinder, Anatom und Ingenieur — der Inbegriff des Universalgenies. Seine **[Mona Lisa](wiki:Mona Lisa|Mona Lisa)** (begonnen um 1503) hängt im Pariser **[Louvre](wiki:Louvre|Louvre)** hinter Panzerglas. Weltberühmt wurde sie auch durch einen Diebstahl: 1911 stahl der Italiener [Vincenzo Peruggia](wiki:Vincenzo Peruggia|Vincenzo Peruggia) das Bild; erst 1913 tauchte es in [Florenz](wiki:Florenz|Florence) wieder auf.[^wp-mona-lisa] Leonardos **[Abendmahl](wiki:Das Abendmahl (Leonardo da Vinci)|The Last Supper (Leonardo))** (1494–1498) schmückt eine Wand des Klosters [Santa Maria delle Grazie](wiki:Santa Maria delle Grazie (Mailand)|Santa Maria delle Grazie, Milan) in [Mailand](wiki:Mailand|Milan).[^wp-leonardo]

**[Michelangelo](wiki:Michelangelo|Michelangelo)** (1475–1564) schuf den **[David](wiki:David (Michelangelo)|David (Michelangelo))** in Florenz (1501–1504) und malte in vier Jahren die Decke der **[Sixtinischen Kapelle](wiki:Sixtinische Kapelle|Sistine Chapel)** im Vatikan (1508–1512) — mit der *[Erschaffung Adams](wiki:Die Erschaffung Adams|The Creation of Adam)*, deren fast berührende Finger heute überall zitiert werden.

**[Raffael](wiki:Raffael|Raphael)** malte die *[Schule von Athen](wiki:Die Schule von Athen|The School of Athens)* und die **[Sixtinische Madonna](wiki:Sixtinische Madonna|Sistine Madonna)**, die in [Dresden](wiki:Dresden|Dresden) hängt — die beiden gelangweilt aufschauenden Engelchen am unteren Rand sind vermutlich die meistkopierten Putten der Welt.`,
    },
    {
      id: 'duerer', type: 'text', title: 'Albrecht Dürer — der deutsche Renaissance-Star',
      md: `
**[Albrecht Dürer](wiki:Albrecht Dürer|Albrecht Dürer)** (1471–1528) aus **[Nürnberg](wiki:Nürnberg|Nuremberg)** brachte die italienische Renaissance nach Deutschland und war der erste Künstler, der sich wie ein moderner Star vermarktete — mit seinem berühmten Monogramm „AD“.[^wp-duerer]

- *[Selbstbildnis im Pelzrock](wiki:Selbstbildnis im Pelzrock)* (1500) — frontal wie ein Christusbild, heute in der [Alten Pinakothek](wiki:Alte Pinakothek|Alte Pinakothek) München
- *[Feldhase](wiki:Feldhase (Dürer)|Young Hare)* (1502) — ein Aquarell von fotografischer Genauigkeit ([Albertina](wiki:Albertina (Wien)|Albertina), [Wien](wiki:Wien|Vienna))
- *[Betende Hände](wiki:Betende Hände|Praying Hands (Dürer))* (1508) — millionenfach reproduziert
- Kupferstiche wie *[Melencolia I](wiki:Melencolia I|Melencolia I)* (1514) und der Holzschnitt *[Rhinocerus](wiki:Dürers Rhinocerus|Dürer's Rhinoceros)* (1515), ein Nashorn, das Dürer nie gesehen hatte

Neben Dürer prägten **[Lucas Cranach](wiki:Lucas Cranach der Ältere|Lucas Cranach the Elder)** (Maler der Reformation und [Luthers](wiki:Martin Luther|Martin Luther) Porträtist) und **[Hans Holbein der Jüngere](wiki:Hans Holbein der Jüngere|Hans Holbein the Younger)** die deutsche Renaissance.`,
    },
    {
      id: 'barock-romantik', type: 'text', title: 'Von Rembrandt bis Caspar David Friedrich',
      md: `
- **[Rembrandt van Rijn](wiki:Rembrandt van Rijn|Rembrandt)** (1606–1669): *[Die Nachtwache](wiki:Die Nachtwache|The Night Watch)* (1642), ein riesiges Gruppenbild einer Amsterdamer Bürgerwehr mit dramatischem Licht — [Rijksmuseum](wiki:Rijksmuseum|List of Rijksmuseums) [Amsterdam](wiki:Amsterdam|Amsterdam).[^wp-rembrandt]
- **[Jan Vermeer](wiki:Johannes Vermeer|Johannes Vermeer)**: *[Das Mädchen mit dem Perlenohrring](wiki:Das Mädchen mit dem Perlenohrgehänge|Girl with a Pearl Earring)* (um 1665) — [Mauritshuis](wiki:Mauritshuis|Mauritshuis), [Den Haag](wiki:Den Haag|The Hague).
- **[[caspar-david-friedrich|Caspar David Friedrich]]** (1774–1840): *[Der Wanderer über dem Nebelmeer](wiki:Der Wanderer über dem Nebelmeer|Wanderer Above the Sea of Fog)* (um 1818, [Hamburger Kunsthalle](wiki:Hamburger Kunsthalle|Hamburger Kunsthalle)) — eine Rückenfigur blickt über ein Nebelmeer, das Sinnbild der deutschen Romantik schlechthin; außerdem *[Kreidefelsen auf Rügen](wiki:Kreidefelsen auf Rügen|Chalk Cliffs on Rügen)* (1818) und *[Der Mönch am Meer](wiki:Der Mönch am Meer|The Monk by the Sea)*.[^wp-friedrich]`,
    },
    {
      id: 'moderne', type: 'text', title: 'Moderne Ikonen',
      md: `
- **Vincent [van Gogh](wiki:Vincent van Gogh|Vincent van Gogh)** (1853–1890): *[Sonnenblumen](wiki:Sonnenblumen (van Gogh)|Sunflowers (Van Gogh series))* (1888), *[Sternennacht](wiki:Sternennacht|The Starry Night)* (1889, [MoMA](wiki:Museum of Modern Art|Museum of Modern Art) New York). Zu Lebzeiten fast erfolglos, heute unbezahlbar; nach einem Streit mit [Gauguin](wiki:Paul Gauguin|Paul Gauguin) schnitt er sich 1888 in [Arles](wiki:Arles|Arles) einen Teil seines Ohrs ab.[^wp-van-gogh]
- **Edvard [Munch](wiki:Edvard Munch|Edvard Munch)**: *[Der Schrei](wiki:Der Schrei|The Scream)* (1893) — Urbild der Angst, Vorläufer des Expressionismus.
- **Gustav [Klimt](wiki:Gustav Klimt|Gustav Klimt)**: *[Der Kuss](wiki:Der Kuss (Klimt)|The Kiss (Klimt))* (1908/09), goldglänzender Jugendstil, [Belvedere](wiki:Belvedere (Wien)|Belvedere, Vienna) [Wien](wiki:Wien|Vienna).
- **[Franz Marc](wiki:Franz Marc|Franz Marc)**: *[Blaues Pferd I](wiki:Blaues Pferd I|Blue Horse I)* (1911), [Lenbachhaus](wiki:Städtische Galerie im Lenbachhaus|Lenbachhaus) München.
- **Pablo [Picasso](wiki:Pablo Picasso|Pablo Picasso)** (1881–1973): *[Les Demoiselles d'Avignon](wiki:Les Demoiselles d’Avignon|Les Demoiselles d'Avignon)* (1907), Beginn des Kubismus; **[Guernica](wiki:Guernica (Gemälde)|Guernica (Picasso))** (1937) — das Anti-Kriegs-Bild über die Zerstörung der baskischen Stadt durch die deutsche [Legion Condor](wiki:Legion Condor|Condor Legion), heute im [Museo Reina Sofía](wiki:Museo Reina Sofía|Museo Nacional Centro de Arte Reina Sofía) in [Madrid](wiki:Madrid|Madrid).[^wp-picasso]
- **Salvador [Dalí](wiki:Salvador Dalí|Salvador Dalí)**: *[Die Beständigkeit der Erinnerung](wiki:Die Beständigkeit der Erinnerung|The Persistence of Memory)* (1931) — die zerfließenden Uhren.
- **Andy [Warhol](wiki:Andy Warhol|Andy Warhol)**: *[Campbell's Soup Cans](wiki:Campbell’s Soup Cans|Campbell's Soup Cans)* (1962).`,
    },
    {
      id: 'gegenwart', type: 'text', title: 'Deutsche Kunst nach 1945',
      md: `
**[Joseph Beuys](wiki:Joseph Beuys|Joseph Beuys)** (1921–1986) erweiterte den Kunstbegriff radikal: „**Jeder Mensch ist ein Künstler**.“ Er arbeitete mit Filz und Fett (*Fettecke*), machte Aktionen und pflanzte ab der documenta 1982 mit *[7000 Eichen](wiki:7000 Eichen|7000 Oaks)* Bäume in [Kassel](wiki:Kassel|Kassel).[^wp-beuys]

**[Gerhard Richter](wiki:Gerhard Richter|Gerhard Richter)** (*1932 in [Dresden](wiki:Dresden|Dresden)) zählt zu den teuersten lebenden Künstlern der Welt; er malt fotorealistisch verwischte Bilder ebenso wie farbige Abstraktionen und gestaltete 2007 das Südquerhausfenster des **[Kölner Doms](wiki:Kölner Dom|Cologne Cathedral)** aus 11.263 farbigen Glasquadraten.

Weitere Namen: [Anselm Kiefer](wiki:Anselm Kiefer|Anselm Kiefer), [Georg Baselitz](wiki:Georg Baselitz|Georg Baselitz) (der seine Motive auf den Kopf stellt), [Sigmar Polke](wiki:Sigmar Polke|Sigmar Polke).`,
    },
    {
      id: 'map-museen',
      type: 'map',
      title: 'Wo die Meisterwerke hängen',
      view: [-6, 39.6, 19.2, 55.6],
      layers: { cities: false },
      points: [
        {
          lon: 2.3376,
          lat: 48.8606,
          label: 'Louvre',
          kind: 'site',
          pos: 'l',
          detail: '*Mona Lisa* von Leonardo da Vinci.',
        },
        {
          lon: 4.8853,
          lat: 52.36,
          label: 'Rijksmuseum',
          kind: 'site',
          pos: 't',
          detail: '*Die Nachtwache* von Rembrandt.',
        },
        {
          lon: 4.3144,
          lat: 52.0804,
          label: 'Mauritshuis',
          kind: 'site',
          pos: 'l',
          detail: '*Das Mädchen mit dem Perlenohrring* von Jan Vermeer.',
        },
        {
          lon: 11.57,
          lat: 48.1483,
          label: 'Alte Pinakothek',
          kind: 'site',
          pos: 'l',
          detail: 'Dürers *Selbstbildnis im Pelzrock* (1500).',
        },
        {
          lon: 13.7349,
          lat: 51.0535,
          label: 'Gemäldegalerie Alte Meister',
          kind: 'site',
          pos: 'r',
          detail: 'Raffaels *Sixtinische Madonna*.',
        },
        {
          lon: 10.0028,
          lat: 53.555,
          label: 'Hamburger Kunsthalle',
          kind: 'site',
          pos: 'r',
          detail: 'Caspar David Friedrichs *Wanderer über dem Nebelmeer*.',
        },
        {
          lon: -3.6945,
          lat: 40.4088,
          label: 'Museo Reina Sofía',
          kind: 'site',
          pos: 'r',
          detail: 'Picassos *Guernica* — seit 1981 in Spanien.',
        },
        { lon: 16.3805, lat: 48.1934, label: 'Belvedere', kind: 'site', pos: 'r', detail: 'Klimts *Der Kuss*.' },
        {
          lon: 9.1711,
          lat: 45.4659,
          label: 'Santa Maria delle Grazie',
          kind: 'site',
          pos: 'l',
          detail: 'Leonardos *Abendmahl*, ein Wandbild im ehemaligen Speisesaal des Klosters.',
        },
        {
          lon: 12.4544,
          lat: 41.903,
          label: 'Sixtinische Kapelle',
          kind: 'site',
          pos: 'r',
          detail: 'Michelangelos Deckenfresken, darunter die *Erschaffung Adams*.',
        },
      ],
      caption: 'Tippe auf einen Marker: Welches berühmte Werk gibt es dort zu sehen?',
    },
    {
      id: 'match-bilder', type: 'match', title: 'Maler ↔ Meisterwerk',
      pairs: [
        ['Leonardo da Vinci', 'Mona Lisa'],
        ['Albrecht Dürer', 'Feldhase'],
        ['Rembrandt', 'Die Nachtwache'],
        ['Caspar David Friedrich', 'Der Wanderer über dem Nebelmeer'],
        ['Vincent van Gogh', 'Sternennacht'],
        ['Edvard Munch', 'Der Schrei'],
        ['Pablo Picasso', 'Guernica'],
        ['Salvador Dalí', 'Die Beständigkeit der Erinnerung'],
      ],
    },
    {
      id: 'timeline', type: 'game', viz: 'timeline', title: 'Welches Bild entstand zuerst?',
      params: {
        mode: 'sort',
        events: [
          { year: 1498, label: 'Das Abendmahl' },
          { year: 1500, label: 'Dürer: Pelzrock' },
          { year: 1512, label: 'Sixtinische Decke' },
          { year: 1642, label: 'Die Nachtwache' },
          { year: 1818, label: 'Nebelmeer-Wanderer' },
          { year: 1889, label: 'Sternennacht' },
          { year: 1937, label: 'Guernica' },
          { year: 1962, label: 'Soup Cans' },
        ],
      },
    },
    {
      id: 'quiz-museum', type: 'quiz', title: 'Wo hängt es?',
      question: 'Welche Zuordnungen von Werk und Ort stimmen?',
      options: [
        { text: '*Mona Lisa* — Louvre, Paris', correct: true, why: 'Seit der Französischen Revolution im Louvre.' },
        { text: '*Guernica* — Museo Reina Sofía, Madrid', correct: true, why: 'Picasso wollte, dass das Bild erst nach dem Ende der Franco-Diktatur nach Spanien kommt; das geschah 1981.' },
        { text: '*Die Nachtwache* — Uffizien, Florenz', correct: false, why: 'Sie hängt im Rijksmuseum in Amsterdam.' },
        { text: '*Sixtinische Madonna* — Gemäldegalerie Alte Meister, Dresden', correct: true, why: 'Seit 1754 in Dresden.' },
      ],
    },
    {
      id: 'map-museen-quiz',
      type: 'map',
      title: 'Wo findet man das Bild?',
      view: [-6, 39.6, 19.2, 55.6],
      layers: { cities: false },
      quiz: { rounds: 8 },
      points: [
        { lon: 2.3376, lat: 48.8606, label: 'Mona Lisa', detail: 'Louvre, Paris' },
        { lon: 4.8853, lat: 52.36, label: 'Die Nachtwache', detail: 'Rijksmuseum, Amsterdam' },
        {
          lon: 4.3144,
          lat: 52.0804,
          label: 'Das Mädchen mit dem Perlenohrring',
          detail: 'Mauritshuis, Den Haag',
        },
        {
          lon: 11.57,
          lat: 48.1483,
          label: 'Dürers Selbstbildnis im Pelzrock',
          detail: 'Alte Pinakothek, München',
        },
        {
          lon: 13.7349,
          lat: 51.0535,
          label: 'Sixtinische Madonna',
          detail: 'Gemäldegalerie Alte Meister, Dresden',
        },
        { lon: 10.0028, lat: 53.555, label: 'Der Wanderer über dem Nebelmeer', detail: 'Hamburger Kunsthalle' },
        { lon: -3.6945, lat: 40.4088, label: 'Guernica', detail: 'Museo Reina Sofía, Madrid' },
        { lon: 16.3805, lat: 48.1934, label: 'Der Kuss', detail: 'Belvedere, Wien' },
        { lon: 9.1711, lat: 45.4659, label: 'Das Abendmahl', detail: 'Santa Maria delle Grazie, Mailand' },
        { lon: 12.4544, lat: 41.903, label: 'Die Decke der Sixtinischen Kapelle', detail: 'Vatikan, Rom' },
      ],
    },
    {
      id: 'fact-vangogh', type: 'callout', tone: 'fact', title: 'Ein einziges verkauftes Bild?',
      md: `Van Gogh malte in rund zehn Jahren etwa 860 Ölgemälde. Oft heißt es, er habe zu Lebzeiten nur ein einziges Bild verkauft (*Der rote Weinberg*). Ganz stimmt das nicht — es gab einige weitere Verkäufe und Tauschgeschäfte —, aber erfolgreich war er nie. Sein Bruder Theo unterstützte ihn finanziell sein Leben lang.`,
    },
    {
      id: 'vangogh-alter', type: 'numeric', title: 'Ein kurzes Leben',
      question: 'Vincent van Gogh wurde am 30. März 1853 geboren und starb am 29. Juli 1890. Wie alt wurde er?',
      answer: 37, tolerance: 0, unit: 'Jahre',
      explain: '37 Jahre. Fast sein gesamtes berühmtes Werk entstand in seinen letzten fünf Lebensjahren.',
    },
    {
      id: 'recall-guernica', type: 'recall', title: 'Guernica',
      prompt: 'Was zeigt Picassos *Guernica*, und warum ist das Bild bis heute so wichtig?',
      answer: `*Guernica* (1937) reagiert auf die Bombardierung der baskischen Stadt Guernica am 26. April 1937 im [Spanischen Bürgerkrieg](wiki:Spanischer Bürgerkrieg|Spanish Civil War) durch die deutsche **Legion Condor** (mit italienischer Beteiligung), die [Franco](wiki:Francisco Franco|Francisco Franco) unterstützte. In Schwarz-Weiß-Grau und kubistisch zersplitterten Formen zeigt es schreiende Menschen, eine Mutter mit totem Kind, ein Pferd, einen Stier. Es gilt als **das** Antikriegsbild des 20. Jahrhunderts und als Mahnung gegen die Bombardierung von Zivilisten — eine Kopie als Wandteppich hing lange vor dem UN-Sicherheitsrat.`,
      hints: ['Welcher Krieg, welche Stadt, welche Angreifer?'],
      cards: ['guernica'],
    },
  ],
  cards: [
    { id: 'mona-lisa', front: 'Wer malte die *Mona Lisa*, und wo hängt sie?', back: 'Leonardo da Vinci (begonnen um 1503); Louvre, Paris.' },
    { id: 'mona-diebstahl', front: 'Was geschah 1911 mit der *Mona Lisa*?', back: 'Vincenzo Peruggia stahl sie aus dem Louvre; sie tauchte 1913 in Florenz wieder auf.' },
    { id: 'abendmahl', front: 'Wo befindet sich Leonardos *Abendmahl*?', back: 'Im Kloster Santa Maria delle Grazie in Mailand (1494–1498).' },
    { id: 'sixtina', front: 'Wann malte Michelangelo die Decke der Sixtinischen Kapelle?', back: '1508–1512.' },
    { id: 'david', front: 'Michelangelos *David*: wann und wo?', back: '1501–1504, Florenz.' },
    { id: 'sixtinische-madonna', front: 'Welches Raffael-Bild mit zwei berühmten Engelchen hängt in Dresden?', back: 'Die *Sixtinische Madonna*.' },
    { id: 'duerer', front: 'Albrecht Dürer: Lebensdaten, Stadt, drei Werke?', back: '1471–1528, Nürnberg; *Selbstbildnis im Pelzrock*, *Feldhase*, *Betende Hände*.' },
    { id: 'nachtwache', front: '*Die Nachtwache*: Maler, Jahr, Museum?', back: 'Rembrandt, 1642, Rijksmuseum Amsterdam.' },
    { id: 'perlenohrring', front: 'Wer malte *Das Mädchen mit dem Perlenohrring*?', back: 'Jan Vermeer (um 1665).' },
    { id: 'friedrich', front: 'Zwei Hauptwerke von Caspar David Friedrich?', back: '*Der Wanderer über dem Nebelmeer* (um 1818), *Kreidefelsen auf Rügen* (1818).' },
    { id: 'vangogh', front: 'Zwei berühmte Bilder von van Gogh?', back: '*Sonnenblumen* (1888), *Sternennacht* (1889).' },
    { id: 'schrei', front: 'Wer malte *Der Schrei*?', back: 'Edvard Munch (1893).' },
    { id: 'kuss', front: 'Wer malte *Der Kuss* (1908/09)?', back: 'Gustav Klimt (Wiener Jugendstil).' },
    { id: 'guernica', front: '*Guernica*: Maler, Jahr, Thema?', back: 'Picasso, 1937; Bombardierung der baskischen Stadt durch die deutsche Legion Condor — Antikriegsbild.' },
    { id: 'dali', front: 'Welches Bild zeigt zerfließende Uhren?', back: 'Salvador Dalí, *Die Beständigkeit der Erinnerung* (1931).' },
    { id: 'beuys', front: 'Joseph Beuys: berühmter Satz und Materialien?', back: '„Jeder Mensch ist ein Künstler.“ Filz und Fett (*Fettecke*); *7000 Eichen*.' },
    { id: 'richter', front: 'Welcher deutsche Maler gestaltete 2007 ein Fenster im Kölner Dom?', back: 'Gerhard Richter.' },
  ],
};
