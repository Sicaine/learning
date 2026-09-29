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
**Leonardo da Vinci** (1452–1519) war Maler, Erfinder, Anatom und Ingenieur — der Inbegriff des Universalgenies. Seine **Mona Lisa** (begonnen um 1503) hängt im Pariser **Louvre** hinter Panzerglas. Weltberühmt wurde sie auch durch einen Diebstahl: 1911 stahl der Italiener Vincenzo Peruggia das Bild; erst 1913 tauchte es in Florenz wieder auf.[^wp-mona-lisa] Leonardos **Abendmahl** (1494–1498) schmückt eine Wand des Klosters Santa Maria delle Grazie in Mailand.[^wp-leonardo]

**Michelangelo** (1475–1564) schuf den **David** in Florenz (1501–1504) und malte in vier Jahren die Decke der **Sixtinischen Kapelle** im Vatikan (1508–1512) — mit der *Erschaffung Adams*, deren fast berührende Finger heute überall zitiert werden.

**Raffael** malte die *Schule von Athen* und die **Sixtinische Madonna**, die in Dresden hängt — die beiden gelangweilt aufschauenden Engelchen am unteren Rand sind vermutlich die meistkopierten Putten der Welt.`,
    },
    {
      id: 'duerer', type: 'text', title: 'Albrecht Dürer — der deutsche Renaissance-Star',
      md: `
**Albrecht Dürer** (1471–1528) aus **Nürnberg** brachte die italienische Renaissance nach Deutschland und war der erste Künstler, der sich wie ein moderner Star vermarktete — mit seinem berühmten Monogramm „AD“.[^wp-duerer]

- *Selbstbildnis im Pelzrock* (1500) — frontal wie ein Christusbild, heute in der Alten Pinakothek München
- *Feldhase* (1502) — ein Aquarell von fotografischer Genauigkeit (Albertina, Wien)
- *Betende Hände* (1508) — millionenfach reproduziert
- Kupferstiche wie *Melencolia I* (1514) und der Holzschnitt *Rhinocerus* (1515), ein Nashorn, das Dürer nie gesehen hatte

Neben Dürer prägten **Lucas Cranach** (Maler der Reformation und Luthers Porträtist) und **Hans Holbein der Jüngere** die deutsche Renaissance.`,
    },
    {
      id: 'barock-romantik', type: 'text', title: 'Von Rembrandt bis Caspar David Friedrich',
      md: `
- **Rembrandt van Rijn** (1606–1669): *Die Nachtwache* (1642), ein riesiges Gruppenbild einer Amsterdamer Bürgerwehr mit dramatischem Licht — Rijksmuseum Amsterdam.[^wp-rembrandt]
- **Jan Vermeer**: *Das Mädchen mit dem Perlenohrring* (um 1665) — Mauritshuis, Den Haag.
- **[[caspar-david-friedrich|Caspar David Friedrich]]** (1774–1840): *Der Wanderer über dem Nebelmeer* (um 1818, Hamburger Kunsthalle) — eine Rückenfigur blickt über ein Nebelmeer, das Sinnbild der deutschen Romantik schlechthin; außerdem *Kreidefelsen auf Rügen* (1818) und *Der Mönch am Meer*.[^wp-friedrich]`,
    },
    {
      id: 'moderne', type: 'text', title: 'Moderne Ikonen',
      md: `
- **Vincent van Gogh** (1853–1890): *Sonnenblumen* (1888), *Sternennacht* (1889, MoMA New York). Zu Lebzeiten fast erfolglos, heute unbezahlbar; nach einem Streit mit Gauguin schnitt er sich 1888 in Arles einen Teil seines Ohrs ab.[^wp-van-gogh]
- **Edvard Munch**: *Der Schrei* (1893) — Urbild der Angst, Vorläufer des Expressionismus.
- **Gustav Klimt**: *Der Kuss* (1908/09), goldglänzender Jugendstil, Belvedere Wien.
- **Franz Marc**: *Blaues Pferd I* (1911), Lenbachhaus München.
- **Pablo Picasso** (1881–1973): *Les Demoiselles d'Avignon* (1907), Beginn des Kubismus; **Guernica** (1937) — das Anti-Kriegs-Bild über die Zerstörung der baskischen Stadt durch die deutsche Legion Condor, heute im Museo Reina Sofía in Madrid.[^wp-picasso]
- **Salvador Dalí**: *Die Beständigkeit der Erinnerung* (1931) — die zerfließenden Uhren.
- **Andy Warhol**: *Campbell's Soup Cans* (1962).`,
    },
    {
      id: 'gegenwart', type: 'text', title: 'Deutsche Kunst nach 1945',
      md: `
**Joseph Beuys** (1921–1986) erweiterte den Kunstbegriff radikal: „**Jeder Mensch ist ein Künstler**.“ Er arbeitete mit Filz und Fett (*Fettecke*), machte Aktionen und pflanzte ab der documenta 1982 mit *7000 Eichen* Bäume in Kassel.[^wp-beuys]

**Gerhard Richter** (*1932 in Dresden) zählt zu den teuersten lebenden Künstlern der Welt; er malt fotorealistisch verwischte Bilder ebenso wie farbige Abstraktionen und gestaltete 2007 das Südquerhausfenster des **Kölner Doms** aus 11.263 farbigen Glasquadraten.

Weitere Namen: Anselm Kiefer, Georg Baselitz (der seine Motive auf den Kopf stellt), Sigmar Polke.`,
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
      answer: `*Guernica* (1937) reagiert auf die Bombardierung der baskischen Stadt Guernica am 26. April 1937 im Spanischen Bürgerkrieg durch die deutsche **Legion Condor** (mit italienischer Beteiligung), die Franco unterstützte. In Schwarz-Weiß-Grau und kubistisch zersplitterten Formen zeigt es schreiende Menschen, eine Mutter mit totem Kind, ein Pferd, einen Stier. Es gilt als **das** Antikriegsbild des 20. Jahrhunderts und als Mahnung gegen die Bombardierung von Zivilisten — eine Kopie als Wandteppich hing lange vor dem UN-Sicherheitsrat.`,
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
