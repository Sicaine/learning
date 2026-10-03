export default {
  id: 'computer-internet',
  title: 'Computer & Internet',
  summary: 'Von Leibniz’ Nullen und Einsen über Konrad Zuses [[zuse-z3|Z3]] bis zu Smartphone und [[kuenstliche-intelligenz|KI]]: wie Rechner funktionieren und wie das [[internet]] entstand.',
  minutes: 22,
  goals: [
    'Erklären, warum Computer im [[dualsystem]] rechnen, und Bit und Byte umrechnen',
    'Die Meilensteine von der [[zuse-z3|Z3]] über den [[transistor]] bis zum Smartphone einordnen',
    '[[internet]] und [[world-wide-web]] auseinanderhalten',
    'Wissen, was [[kuenstliche-intelligenz|künstliche Intelligenz]] und ein [[algorithmus]] sind',
  ],
  blocks: [
    {
      id: 'binaer', type: 'text', title: 'Alles nur Nullen und Einsen',
      md: `
Computer kennen nur zwei Zustände: Strom an oder aus, 1 oder 0. Damit lässt sich jede Zahl darstellen — im [[dualsystem]] (auch Binärsystem). Jede Stelle ist doppelt so viel wert wie die rechts daneben: 1, 2, 4, 8, 16, 32, 64, 128.

$$101010_2 = 32 + 8 + 2 = 42$$

Ausführlich beschrieben hat das System **[Gottfried Wilhelm Leibniz](wiki:Gottfried Wilhelm Leibniz|Gottfried Wilhelm Leibniz)** 1703.[^tech-wp-leibniz-dual] Eine binäre Stelle heißt **[Bit](wiki:Bit|Bit)**, 8 Bit sind ein **[Byte](wiki:Byte|Byte)** — damit lassen sich $2^8 = 256$ verschiedene Werte darstellen, genug für alle Buchstaben, Ziffern und Satzzeichen. Buchstaben, Farben, Töne, Videos: alles wird am Ende in Bits übersetzt.

Achtung bei Speichergrößen: 1 Kilobyte sind nach SI 1.000 Byte; in der Informatik wurde traditionell mit 1.024 ($2^{10}$) gerechnet.`,
    },
    {
      id: 'viz-bits', type: 'viz', viz: 'technik-binaer', title: 'Ein Byte zum Anfassen',
      params: { targets: [42, 255, 100] },
      task: 'Stelle nacheinander **42**, **255** und **100** ein. Was ist die größte Zahl, die in ein Byte passt?',
    },
    {
      id: 'calc-byte', type: 'numeric', title: 'Umrechnen',
      question: 'Welchen Dezimalwert hat die Binärzahl **1100100**?',
      answer: 100, tolerance: 0,
      hint: 'Von rechts: 1, 2, 4, 8, 16, 32, 64. Welche Stellen sind 1?',
      explain: '64 + 32 + 4 = **100**.',
    },
    {
      id: 'geschichte', type: 'text', title: 'Vom Relais zum Smartphone',
      md: `
Mechanische Rechenmaschinen gab es schon im 17. Jahrhundert ([Wilhelm Schickard](wiki:Wilhelm Schickard|Wilhelm Schickard) 1623, [Pascal](wiki:Blaise Pascal|Blaise Pascal), [Leibniz](wiki:Gottfried Wilhelm Leibniz|Gottfried Wilhelm Leibniz)). Der Schritt zum **programmierbaren** Computer gelang in Berlin: **[Konrad Zuse](wiki:Konrad Zuse|Konrad Zuse)** stellte am **12. Mai 1941** die [[zuse-z3|Z3]] vor — sie gilt als erster funktionsfähiger, frei programmierbarer, vollautomatischer Digitalrechner der Welt.[^tech-wp-zuse] Sie rechnete binär mit rund 2.000 [Telefonrelais](wiki:Relais|Relay).

Danach ging es rasant:

- **1945/46:** [ENIAC](wiki:ENIAC|ENIAC) in den USA, ein 27 Tonnen schwerer Röhrenrechner. In England knackte der Rechner Colossus deutsche Codes; **[Alan Turing](wiki:Alan Turing|Alan Turing)** hatte zuvor die theoretischen Grundlagen der Informatik gelegt.
- **1947:** Erfindung des [[transistor|Transistors]] — der winzige elektronische Schalter ersetzt die Röhre.
- **1971:** [Intel 4004](wiki:Intel 4004|Intel 4004), der erste [Mikroprozessor](wiki:Mikroprozessor|Microprocessor): ein ganzer Rechner auf einem Chip.
- **1976/77:** [Apple](wiki:Apple|Apple Inc.) wird gegründet; ab 1981 prägt der **[IBM-PC](wiki:IBM Personal Computer|IBM Personal Computer)** mit [Microsoft](wiki:Microsoft|Microsoft)s Betriebssystem das Büro.
- **2007:** Das **[iPhone](wiki:iPhone|IPhone)** macht das [Smartphone](wiki:Smartphone|Smartphone) zum Massenprodukt.

Das **[Mooresche Gesetz](wiki:Mooresches Gesetz|Moore\'s law)** ([Gordon Moore](wiki:Gordon Moore|Gordon Moore), 1965): Die Zahl der Transistoren pro Chip verdoppelt sich etwa alle zwei Jahre — [[exponentielles-wachstum]] über Jahrzehnte. Ein heutiges Smartphone hat Milliarden Transistoren.`,
    },
    {
      id: 'map-it-europa', type: 'map', title: 'Digitale Geschichte in Europa',
      view: [-3.2, 45.0, 16.5, 54.0],
      layers: { cities: false, mountains: false },
      places: [
        { name: 'Berlin', pos: 'r', detail: 'In [Berlin](wiki:Berlin|Berlin) baute [Konrad Zuse](wiki:Konrad Zuse|Konrad Zuse) 1941 die Z3, den ersten funktionsfähigen programmierbaren Digitalrechner.' },
        { name: 'Karlsruhe', pos: 'r', detail: 'An der Universität in [Karlsruhe](wiki:Karlsruhe|Karlsruhe) kam 1984 die erste E-Mail Deutschlands an.' },
      ],
      points: [
        { lon: -0.742, lat: 51.997, label: 'Bletchley Park', kind: 'site', pos: 'b', detail: 'In [Bletchley Park](wiki:Bletchley Park|Bletchley Park) nördlich von London knackten britische Codebrecher um [Alan Turing](wiki:Alan Turing|Alan Turing) im Zweiten Weltkrieg deutsche Funksprüche — mit Hilfe früher Rechenmaschinen.' },
        { lon: 6.049, lat: 46.233, label: 'CERN (Genf)', kind: 'site', pos: 'r', detail: 'Am [CERN](wiki:Europäische Organisation für Kernforschung|CERN) bei Genf schlug [Tim Berners-Lee](wiki:Tim Berners-Lee|Tim Berners-Lee) 1989 das World Wide Web vor.' },
      ],
      caption: 'Vier Orte, vier Schritte: Rechner (Berlin), Codeknacken (Bletchley Park), E-Mail (Karlsruhe), Web (CERN).',
    },
    {
      id: 'internet', type: 'text', title: 'Internet ist nicht gleich Web',
      md: `
Das **[[internet]]** ist die *Infrastruktur*: ein weltweites Netz aus Computernetzen. Es entstand aus dem **[ARPANET](wiki:ARPANET|ARPANET)**, einem Forschungsnetz des US-Verteidigungsministeriums, das **1969** vier Universitätsrechner verband.[^tech-wp-arpanet] 1983 stellte man auf das Protokoll **[TCP/IP](wiki:Internetprotokollfamilie|Internet protocol suite)** um — die gemeinsame Sprache, die bis heute alles verbindet. Die erste [E-Mail](wiki:E-Mail|Email) in Deutschland erreichte 1984 die [Universität Karlsruhe](wiki:Karlsruher Institut für Technologie|Karlsruhe Institute of Technology).

Das **[[world-wide-web]]** ist ein *Dienst* darauf — wie E-Mail oder Streaming. Der britische Physiker **[Tim Berners-Lee](wiki:Tim Berners-Lee|Tim Berners-Lee)** schlug es **1989** am Forschungszentrum **[CERN](wiki:Europäische Organisation für Kernforschung|CERN)** bei [Genf](wiki:Genf|Geneva) vor und erfand dafür [HTML](wiki:Hypertext Markup Language|HTML), [HTTP](wiki:Hypertext Transfer Protocol|HTTP), URLs und den ersten [Browser](wiki:Webbrowser|Web browser).[^tech-wp-www] 1991 ging das Web öffentlich online, 1993 gab das CERN es lizenzfrei frei — ein Grund für seinen Siegeszug. Es folgten [Suchmaschinen](wiki:Suchmaschine|Search engine (computing)) ([Google](wiki:Google|Google Search) 1998), [Wikipedia](wiki:Wikipedia|Wikipedia) (2001), soziale Netzwerke ([Facebook](wiki:Facebook|Facebook) 2004) und Videoplattformen ([YouTube](wiki:YouTube|YouTube) 2005).`,
    },
    {
      id: 'map-arpanet', type: 'map', title: 'Die ersten vier Knoten des ARPANET (1969)',
      view: [-124.8, 32.0, -109.0, 42.2],
      layers: { cities: false, mountains: false },
      points: [
        { lon: -118.444, lat: 34.072, label: 'UCLA', pos: 'l', detail: 'An der [University of California, Los Angeles](wiki:University of California, Los Angeles|University of California, Los Angeles) wurde am 29. Oktober 1969 die erste Nachricht ins ARPANET geschickt. Nach den ersten beiden Buchstaben („LO“ für „LOGIN“) stürzte das System ab.' },
        { lon: -119.845, lat: 34.413, label: 'UC Santa Barbara', pos: 'l', detail: 'Die [University of California, Santa Barbara](wiki:University of California, Santa Barbara|University of California, Santa Barbara) war der dritte Knoten.' },
        { lon: -122.177, lat: 37.458, label: 'SRI (Menlo Park)', pos: 'r', detail: 'Das [SRI](wiki:SRI International|SRI International) in Menlo Park empfing die erste Nachricht.' },
        { lon: -111.85, lat: 40.765, label: 'University of Utah', pos: 'l', detail: 'Die [University of Utah](wiki:University of Utah|University of Utah) in Salt Lake City war der vierte Knoten.' },
      ],
      lines: [
        { label: 'ARPANET (schematisch)', color: '#0d9488', labelAt: 0.5, coords: [[-122.177,37.458],[-111.85,40.765]] },
        { color: '#0d9488', coords: [[-118.444,34.072],[-122.177,37.458]] },
        { color: '#0d9488', coords: [[-122.177,37.458],[-119.845,34.413]] },
        { color: '#0d9488', coords: [[-119.845,34.413],[-118.444,34.072]] },
      ],
      caption: 'Die Verbindungen sind schematisch eingezeichnet: 1969 verband das ARPANET vier Universitätsrechner im Westen der USA.',
    },
    {
      id: 'quiz-web', type: 'quiz', title: 'Internet oder Web?',
      question: 'Welche Aussagen sind richtig?',
      options: [
        { text: 'Internet und World Wide Web sind zwei Namen für dasselbe.', correct: false, why: 'Das Internet ist das Netz, das Web ein Dienst darauf (neben E-Mail, Messenger, Streaming …).' },
        { text: 'Das World Wide Web wurde am CERN erfunden.', correct: true, why: '[Tim Berners-Lee](wiki:Tim Berners-Lee|Tim Berners-Lee), 1989.' },
        { text: 'Der Vorläufer des Internets hieß ARPANET und startete 1969.', correct: true, why: 'Im selben Jahr wie die Mondlandung.' },
        { text: 'Konrad Zuses Z3 war ein Röhrenrechner.', correct: false, why: 'Die Z3 arbeitete mit elektromechanischen Relais; Röhren nutzte z. B. [ENIAC](wiki:ENIAC|ENIAC).' },
        { text: 'Ein Byte besteht aus 8 Bit.', correct: true, why: 'Damit sind 256 verschiedene Werte möglich.' },
      ],
    },
    {
      id: 'ki', type: 'text', title: 'Künstliche Intelligenz',
      md: `
Ein **[[algorithmus]]** ist eine eindeutige Schritt-für-Schritt-Anleitung — ein Rezept für den Computer. Klassische Programme folgen fest einprogrammierten Regeln. **[[kuenstliche-intelligenz|Künstliche Intelligenz]]** (KI) nennt man Systeme, die Aufgaben lösen, für die man sonst menschliche Intelligenz braucht.[^tech-wp-ki] Heute beruht sie vor allem auf **[maschinellem Lernen](wiki:Maschinelles Lernen|Machine learning)**: Statt Regeln vorzugeben, lässt man Programme ([künstliche neuronale Netze](wiki:Künstliches neuronales Netz|Neural network (machine learning))) Muster aus riesigen Datenmengen lernen.

Meilensteine:

- **1950:** [Alan Turing](wiki:Alan Turing|Alan Turing) schlägt den **[Turing-Test](wiki:Turing-Test|Turing test)** vor: Kann eine Maschine im Gespräch als Mensch durchgehen?
- **1956:** Der Begriff *Artificial Intelligence* entsteht auf der [Dartmouth-Konferenz](wiki:Dartmouth Conference|Dartmouth workshop).
- **1997:** IBMs [Schachcomputer](wiki:Computerschach|Computer chess) **[Deep Blue](wiki:Deep Blue|Deep Blue (chess computer))** schlägt Weltmeister [Garri Kasparow](wiki:Garri Kasparow|Garry Kasparov).
- **2016:** **[AlphaGo](wiki:AlphaGo|AlphaGo)** besiegt einen der weltbesten Go-Spieler.
- **2022:** **[ChatGPT](wiki:ChatGPT|ChatGPT)** macht große [Sprachmodelle](wiki:Sprachmodell|Language model) für jedermann zugänglich.

KI wirft große Fragen auf: Arbeitsmarkt, [Urheberrecht](wiki:Urheberrecht|Copyright), [Desinformation](wiki:Desinformation|Disinformation), [Datenschutz](wiki:Datenschutz|Information privacy). Die EU hat 2024 mit dem **[AI Act](wiki:KI-Verordnung|Artificial Intelligence Act)** das weltweit erste umfassende KI-Gesetz beschlossen.`,
    },
    {
      id: 'timeline-computer', type: 'game', viz: 'timeline', title: 'Chronologie der digitalen Welt',
      params: {
        mode: 'sort',
        events: [
          { year: 1703, label: 'Leibniz’ Dualsystem' },
          { year: 1941, label: 'Zuse Z3' },
          { year: 1947, label: 'Transistor' },
          { year: 1969, label: 'ARPANET' },
          { year: 1989, label: 'WWW am CERN' },
          { year: 1998, label: 'Google gegründet' },
          { year: 2007, label: 'iPhone' },
          { year: 2022, label: 'ChatGPT' },
        ],
      },
    },
    {
      id: 'match-digital', type: 'match', title: 'Köpfe der Digitalisierung',
      pairs: [['Konrad Zuse', 'Z3, erster programmierbarer Computer'], ['Alan Turing', 'Theoretische Informatik, Turing-Test'], ['Tim Berners-Lee', 'World Wide Web'], ['Gordon Moore', 'Verdopplung der Transistorzahl'], ['Gottfried Wilhelm Leibniz', 'Dualsystem (1703)']],
    },
    {
      id: 'fact-bug', type: 'callout', tone: 'fact', title: 'Der erste echte „Bug“',
      md: `1947 fanden Techniker um die Informatikerin **[Grace Hopper](wiki:Grace Hopper|Grace Hopper)** im Rechner Mark II an der [Harvard University](wiki:Harvard University|Harvard University) eine Motte, die ein Relais blockierte. Sie klebten sie ins Logbuch mit der Notiz *„First actual case of bug being found“*. Das Wort *bug* für technische Fehler war schon älter — aber seitdem ist es untrennbar mit Computern verbunden.`,
    },
    {
      id: 'recall-internet', type: 'recall', title: 'Erkläre den Unterschied',
      prompt: 'Erkläre einem älteren Verwandten in 2–3 Sätzen den Unterschied zwischen **Internet** und **World Wide Web**.',
      answer: `Das **Internet** ist das weltweite Netz, das Computer über Kabel, Funk und gemeinsame Regeln ([TCP/IP](wiki:Internetprotokollfamilie|Internet protocol suite)) miteinander verbindet — vergleichbar mit dem Straßennetz. Das **World Wide Web** ist nur *ein* Dienst, der dieses Netz nutzt: miteinander verlinkte Webseiten, die man im Browser aufruft — vergleichbar mit einer Buslinie auf diesen Straßen. Andere Dienste wie E-Mail, WhatsApp oder Netflix nutzen dasselbe Internet, sind aber nicht „das Web“. Das Internet entstand 1969 ([ARPANET](wiki:ARPANET|ARPANET)), das Web 1989 am [CERN](wiki:Europäische Organisation für Kernforschung|CERN).`,
      hints: ['Infrastruktur vs. Dienst.', 'Welche anderen Dienste laufen über das Internet?'],
      cards: ['internet-web'],
    },
  ],
  cards: [
    { id: 'dual', front: 'Warum rechnen Computer im Dualsystem?', back: 'Weil sich zwei Zustände (Strom an/aus = 1/0) elektronisch sicher darstellen lassen.' },
    { id: 'leibniz', front: 'Wer beschrieb 1703 das Dualsystem?', back: 'Gottfried Wilhelm Leibniz.' },
    { id: 'byte', front: 'Wie viele Bit hat ein Byte — und wie viele Werte fasst es?', back: '8 Bit; $2^8 = 256$ Werte (0–255).' },
    { id: 'z3', front: 'Erster funktionsfähiger programmierbarer Computer', back: 'Die Z3 von Konrad Zuse, vorgestellt am 12. Mai 1941 in Berlin (Relaisrechner).' },
    { id: 'eniac', front: 'ENIAC', back: 'Früher amerikanischer Röhrenrechner (1945/46), rund 27 Tonnen schwer.' },
    { id: 'turing', front: 'Alan Turing', back: 'Britischer Mathematiker: Grundlagen der Informatik (Turingmaschine), Entschlüsselung der Enigma, Turing-Test (1950).' },
    { id: 'transistor', front: 'Wann wurde der Transistor erfunden — und warum war er so wichtig?', back: '1947 (Bell Labs); winziger Halbleiter-Schalter, ersetzte die Röhre und ermöglichte Mikrochips.' },
    { id: 'moore', front: 'Mooresches Gesetz', back: 'Die Zahl der Transistoren pro Chip verdoppelt sich etwa alle zwei Jahre (Gordon Moore, 1965).' },
    { id: 'mikroprozessor', front: 'Erster Mikroprozessor', back: 'Intel 4004, 1971.' },
    { id: 'arpanet', front: 'Vorläufer des Internets', back: 'Das ARPANET, 1969 in den USA.' },
    { id: 'tcpip', front: 'Was ist TCP/IP?', back: 'Die Protokollfamilie, über die sich alle Rechner im Internet verständigen (Umstellung 1983).' },
    { id: 'www', front: 'Wer erfand das World Wide Web — wo und wann?', back: 'Tim Berners-Lee, 1989 am CERN bei Genf.' },
    { id: 'internet-web', front: 'Unterschied Internet und World Wide Web', back: 'Internet = weltweites Netz (Infrastruktur). Web = ein Dienst darauf (verlinkte Webseiten), neben E-Mail u. a.' },
    { id: 'algorithmus', front: 'Was ist ein Algorithmus?', back: 'Eine eindeutige, endliche Schritt-für-Schritt-Anleitung zur Lösung eines Problems.' },
    { id: 'ki', front: 'Worauf beruht moderne KI vor allem?', back: 'Auf maschinellem Lernen: Programme (neuronale Netze) lernen Muster aus großen Datenmengen.' },
    { id: 'turingtest', front: 'Was prüft der Turing-Test?', back: 'Ob eine Maschine im schriftlichen Gespräch nicht von einem Menschen zu unterscheiden ist (Turing, 1950).' },
    { id: 'deepblue', front: 'Wann schlug ein Computer erstmals den Schachweltmeister?', back: '1997: IBMs Deep Blue besiegt Garri Kasparow.' },
    { id: 'aiact', front: 'Erstes umfassendes KI-Gesetz der Welt', back: 'Der AI Act der EU (2024).' },
  ],
};
