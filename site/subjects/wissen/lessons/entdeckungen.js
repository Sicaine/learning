export default {
  id: 'entdeckungen',
  title: 'Entdeckungen, Kolonialismus & Imperien',
  summary: 'Ab dem 15. Jahrhundert fuhren Europäer über die Ozeane — und unterwarfen große Teile der Welt. Eine Geschichte von Neugier, Gier und Gewalt, deren Folgen bis heute nachwirken.',
  minutes: 22,
  goals: [
    'Die großen Entdeckungsfahrten mit Namen und Jahreszahlen nennen',
    'Die [[conquista|Conquista]] und den [[atlantischer-sklavenhandel|atlantischen Sklavenhandel]] in ihren Folgen beschreiben',
    '[[kolonialismus|Kolonialismus]] und [[imperialismus|Imperialismus]] unterscheiden und datieren',
    'Die deutsche Kolonialgeschichte und den Völkermord an Herero und Nama einordnen',
  ],
  blocks: [
    {
      id: 'warum', type: 'text', title: 'Warum aufs offene Meer?',
      md: `
Gewürze wie Pfeffer und Zimt waren in Europa extrem wertvoll. Doch die Landwege nach Asien kontrollierten Zwischenhändler — und nach **1453** das [[osmanisches-reich|Osmanische Reich]]. Portugal und Spanien suchten deshalb einen **Seeweg nach Indien**.

Möglich wurde das durch neue Technik: die wendige **Karavelle**, Kompass und Astrolabium sowie bessere Karten. Der portugiesische Prinz **Heinrich der Seefahrer** förderte systematisch Fahrten entlang der afrikanischen Küste.[^wp-entdeckungsfahrten]`,
    },
    {
      id: 'fahrten', type: 'text', title: 'Die großen Fahrten',
      md: `
- **1488** umrundet **Bartolomeu Dias** das Kap der Guten Hoffnung an der Südspitze Afrikas.
- **1492** erreicht **Christoph Kolumbus** (ein Genuese in spanischen Diensten) am 12. Oktober eine Insel der Bahamas. Er glaubt bis zu seinem Tod, in Asien gewesen zu sein — daher „Indianer“ und „Westindische Inseln“.
- **1494** teilen Spanien und Portugal im **Vertrag von Tordesillas** die „neue Welt“ unter sich auf. Deshalb spricht man in Brasilien heute Portugiesisch.
- **1498** erreicht **Vasco da Gama** Indien — der Seeweg ist gefunden.
- **1519–1522** gelingt die erste **Weltumsegelung**. **Magellan** stirbt unterwegs auf den Philippinen; **Elcano** bringt das letzte Schiff zurück.

Übrigens: Den Namen „Amerika“ erhielt der Kontinent nach **Amerigo Vespucci**, der erkannte, dass es sich um einen neuen Kontinent handelt. Die Weltkarte des deutschen Kartografen **Martin Waldseemüller** von 1507 verwendete den Namen zum ersten Mal.`,
    },
    {
      id: 'tl-game', type: 'game', viz: 'timeline', title: 'Wer war zuerst?',
      params: { mode: 'sort', events: [
        { year: 1488, label: 'Dias am Kap' },
        { year: 1492, label: 'Kolumbus in Amerika' },
        { year: 1494, label: 'Vertrag von Tordesillas' },
        { year: 1498, label: 'Da Gama in Indien' },
        { year: 1521, label: 'Tenochtitlan fällt' },
        { year: 1522, label: 'Erste Weltumsegelung' },
        { year: 1602, label: 'Niederl. VOC gegründet' },
        { year: 1884, label: 'Berliner Kongokonferenz' },
      ] },
    },
    {
      id: 'conquista', type: 'text', title: 'Conquista und Sklavenhandel',
      md: `
Den Entdeckern folgten die Eroberer. **Hernán Cortés** zerstörte 1519–1521 das Reich der **Azteken** mit seiner Hauptstadt Tenochtitlan (heute Mexiko-Stadt). **Francisco Pizarro** unterwarf 1532/33 das Reich der **Inka** in Peru. Mit wenigen hundert Soldaten gelang das auch, weil verfeindete indigene Völker mit den Spaniern kämpften — und weil eingeschleppte Krankheiten wie die **Pocken** einen Großteil der Bevölkerung töteten. Die [[conquista|Conquista]] brachte gewaltige Mengen Silber und Gold nach Europa.

Für die Plantagen in Amerika wurden Arbeitskräfte gebraucht. Im **[[atlantischer-sklavenhandel|atlantischen Sklavenhandel]]** verschleppten Europäer vom 16. bis ins 19. Jahrhundert rund **12,5 Millionen** Afrikanerinnen und Afrikaner über den Atlantik; fast zwei Millionen starben schon auf der Überfahrt.[^slavevoyages] Man spricht vom **Dreieckshandel**: Waren nach Afrika, Menschen nach Amerika, Zucker, Baumwolle und Tabak nach Europa.`,
    },
    {
      id: 'warn-sprache', type: 'callout', tone: 'warning', title: '„Entdeckung“ — aus wessen Sicht?',
      md: `Amerika, Afrika und Asien waren längst bewohnt, als Europäer ankamen. Der Begriff „Entdeckung“ beschreibt die europäische Perspektive. Heute spricht man daher oft auch von „Kontakt“ oder „Eroberung“ — je nachdem, was gemeint ist.`,
    },
    {
      id: 'imperialismus', type: 'text', title: 'Das Zeitalter des Imperialismus',
      md: `
Nach Spanien und Portugal wurden **die Niederlande** (Ostindien-Kompanie *VOC*, 1602), **England** (*East India Company*, 1600) und **Frankreich** zu Kolonialmächten. Im 19. Jahrhundert folgte der **[[imperialismus|Imperialismus]]**: ein Wettlauf der Großmächte um Kolonien, Rohstoffe und Prestige, begründet mit rassistischen Überlegenheitsideen.

Auf der **Berliner Kongokonferenz 1884/85** unter Bismarcks Vorsitz legten europäische Staaten Regeln für die Aufteilung Afrikas fest — ohne dass ein einziger Afrikaner beteiligt war. Um 1914 waren fast ganz Afrika und große Teile Asiens kolonisiert; das **Britische Empire** umfasste um 1920 rund ein Viertel der Landfläche der Erde („das Reich, in dem die Sonne nie untergeht“).`,
    },
    {
      id: 'deutsch', type: 'callout', tone: 'history', title: 'Deutsche Kolonien 1884–1919',
      md: `Das Deutsche Reich erwarb ab 1884 Kolonien: **Deutsch-Südwestafrika** (heute Namibia), **Deutsch-Ostafrika** (Tansania, Ruanda, Burundi), **Kamerun**, **Togo**, Inseln im Pazifik und das Pachtgebiet **Kiautschou** in China. In Südwestafrika verübten deutsche Truppen **1904–1908** einen **Völkermord an den Herero und Nama**; Zehntausende wurden getötet oder in die Wüste getrieben. Die Bundesregierung hat 2021 anerkannt, dass es sich aus heutiger Sicht um einen Völkermord handelte. Mit dem Versailler Vertrag 1919 verlor Deutschland alle Kolonien.[^wp-deutsche-kolonien]`,
    },
    {
      id: 'match-entdecker', type: 'match', title: 'Wer tat was?',
      pairs: [
        ['Bartolomeu Dias', 'Kap der Guten Hoffnung (1488)'],
        ['Christoph Kolumbus', 'Bahamas (1492)'],
        ['Vasco da Gama', 'Seeweg nach Indien (1498)'],
        ['Hernán Cortés', 'Eroberung der Azteken'],
        ['Francisco Pizarro', 'Eroberung der Inka'],
        ['Amerigo Vespucci', 'Namensgeber Amerikas'],
      ],
    },
    {
      id: 'quiz-tordesillas', type: 'quiz', title: 'Spuren bis heute',
      question: 'Warum spricht man in Brasilien Portugiesisch, im restlichen Südamerika meist Spanisch?',
      options: [
        { text: 'Wegen des Vertrags von Tordesillas (1494), der die Welt zwischen Spanien und Portugal aufteilte.', correct: true, why: 'Die Teilungslinie verlief so, dass der Osten Südamerikas an Portugal fiel.' },
        { text: 'Weil Kolumbus Portugiese war.', correct: false, why: 'Kolumbus stammte aus Genua und segelte für Spanien.' },
        { text: 'Weil Brasilien erst im 19. Jahrhundert kolonisiert wurde.', correct: false, why: 'Cabral landete bereits 1500 in Brasilien.' },
        { text: 'Weil Portugal Brasilien von Spanien kaufte.', correct: false, why: 'Es gab keinen solchen Kauf.' },
      ],
    },
    {
      id: 'num-sklaven', type: 'numeric', title: 'Eine Zahl, die man kennen sollte',
      question: 'Wie viele Millionen Menschen wurden im atlantischen Sklavenhandel ungefähr über den Atlantik verschleppt?',
      answer: 12.5, tolerance: 1.5, unit: 'Millionen',
      explain: 'Die Forschungsdatenbank *SlaveVoyages* schätzt rund **12,5 Millionen** Eingeschiffte; etwa 10,7 Millionen überlebten die Überfahrt.',
    },
    {
      id: 'recall-folgen', type: 'recall', title: 'Folgen bis heute',
      prompt: 'Nenne drei Folgen des Kolonialismus, die bis in die Gegenwart sichtbar sind.',
      answer: `Zum Beispiel: **Sprachen** (Spanisch, Portugiesisch, Englisch, Französisch als Amtssprachen in Amerika und Afrika), **Grenzen** (viele afrikanische Grenzen wurden am Reißbrett gezogen, ohne Rücksicht auf Völker), **wirtschaftliche Ungleichheit** (Rohstoffabhängigkeit, Ausbeutung), die afroamerikanische Bevölkerung Amerikas als Folge des Sklavenhandels, sowie aktuelle Debatten über **Rückgabe von Kulturgütern** (z. B. Benin-Bronzen) und Erinnerungskultur.`,
      cards: ['kongo', 'herero'],
    },
  ],
  cards: [
    { id: 'motiv', front: 'Hauptmotiv der Entdeckungsfahrten im 15. Jh.?', back: 'Ein Seeweg nach Indien/Asien für den Gewürzhandel, vorbei an Zwischenhändlern und dem Osmanischen Reich.' },
    { id: 'dias', front: 'Bartolomeu Dias — was und wann?', back: 'Umrundete 1488 als erster Europäer das Kap der Guten Hoffnung.' },
    { id: 'kolumbus', front: 'Wann erreichte Kolumbus Amerika — und für wen segelte er?', back: '12. Oktober 1492, im Auftrag der spanischen Krone.' },
    { id: 'tordesillas', front: 'Was regelte der Vertrag von Tordesillas (1494)?', back: 'Die Aufteilung der neu entdeckten Gebiete zwischen Spanien und Portugal.' },
    { id: 'gama', front: 'Vasco da Gama — was und wann?', back: 'Erreichte 1498 als erster Europäer auf dem Seeweg Indien.' },
    { id: 'magellan', front: 'Erste Weltumsegelung: wann und von wem?', back: '1519–1522; Expedition Magellans, vollendet von Elcano (Magellan starb unterwegs).' },
    { id: 'amerika-name', front: 'Nach wem ist Amerika benannt?', back: 'Nach Amerigo Vespucci (Karte von Martin Waldseemüller, 1507).' },
    { id: 'cortes-pizarro', front: 'Wer eroberte die Azteken, wer die Inka?', back: 'Cortés die Azteken (1519–1521), Pizarro die Inka (1532/33).' },
    { id: 'pocken', front: 'Warum konnten wenige Spanier große Reiche erobern?', back: 'Eingeschleppte Krankheiten (v. a. Pocken), Verbündete unter verfeindeten Völkern, Waffen und Pferde.' },
    { id: 'sklavenhandel', front: 'Atlantischer Sklavenhandel: Zeitraum und Zahl?', back: '16.–19. Jh.; rund 12,5 Mio. verschleppte Menschen.' },
    { id: 'dreieckshandel', front: 'Was war der Dreieckshandel?', back: 'Waren von Europa nach Afrika, versklavte Menschen nach Amerika, Plantagenprodukte (Zucker, Baumwolle, Tabak) nach Europa.' },
    { id: 'imperialismus', front: 'Hochphase des Imperialismus?', back: 'Etwa 1880–1914.' },
    { id: 'kongo', front: 'Was war die Berliner Kongokonferenz?', back: '1884/85 unter Bismarck: europäische Mächte legten Regeln für die Aufteilung Afrikas fest — ohne Afrikaner.' },
    { id: 'deutsche-kolonien', front: 'Nenne drei ehemalige deutsche Kolonien.', back: 'z. B. Deutsch-Südwestafrika (Namibia), Deutsch-Ostafrika (Tansania u. a.), Kamerun, Togo, Kiautschou.' },
    { id: 'herero', front: 'Was geschah 1904–1908 in Deutsch-Südwestafrika?', back: 'Völkermord deutscher Truppen an den Herero und Nama.' },
    { id: 'empire', front: 'Wie groß war das Britische Empire auf seinem Höhepunkt?', back: 'Rund ein Viertel der Landfläche der Erde (um 1920).' },
  ],
};
