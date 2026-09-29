export default {
  id: 'weltliteratur',
  title: 'Weltliteratur',
  summary: 'Welche Bücher „muss“ man kennen? Eine Reise durch fast 3000 Jahre [[weltliteratur|Weltliteratur]] — von Homers Helden über Shakespeare und Don Quijote bis zu den großen Romanen des 19. und 20. Jahrhunderts.',
  minutes: 22,
  goals: [
    'Die großen Werke der Weltliteratur zeitlich einordnen',
    'Autoren und Werke von Homer bis García Márquez einander zuordnen',
    'Figuren wie Odysseus, Hamlet oder Don Quijote kennen und ihre sprichwörtliche Bedeutung erklären',
    'Begriffe wie [[epos|Epos]], [[tragoedie|Tragödie]] und [[dystopie|Dystopie]] verwenden',
  ],
  blocks: [
    {
      id: 'begriff', type: 'text', title: 'Was ist Weltliteratur?',
      md: `
Den Begriff prägte Goethe 1827 im Gespräch mit Eckermann: „Nationalliteratur will jetzt nicht viel sagen, die Epoche der Weltliteratur ist an der Zeit.“ Gemeint sind Werke, die über Sprach- und Ländergrenzen hinaus gelesen werden und unser Bild vom Menschen geprägt haben.[^wp-weltliteratur] Vieles davon kennt man, ohne es gelesen zu haben — weil Figuren und Redewendungen in die Alltagssprache eingegangen sind.`,
    },
    {
      id: 'antike', type: 'text', title: 'Antike und Mittelalter',
      md: `
- **Homer** (8./7. Jh. v. Chr.): die beiden ältesten [[epos|Epen]] Europas. Die *Ilias* erzählt vom Trojanischen Krieg und dem Zorn des Achilleus, die *Odyssee* von der zehnjährigen Irrfahrt des Odysseus nach Hause. Ob „Homer“ eine einzelne Person war, ist bis heute umstritten.[^wp-homer] Eine „Odyssee“ ist seitdem jede lange, beschwerliche Reise.
- **Sophokles**: *König Ödipus* — die Urform der [[tragoedie|Tragödie]]; Freud benannte danach den „Ödipuskomplex“.
- **Vergil**: *Aeneis* — das römische Nationalepos über den Trojaner Aeneas.
- **Dante Alighieri**: *Die Göttliche Komödie* (ca. 1307–1321) — eine Wanderung durch Hölle, Läuterungsberg und Paradies; über dem Höllentor steht: „Lasst, die ihr eintretet, alle Hoffnung fahren.“[^wp-goettliche-komoedie]
- **Giovanni Boccaccio**: *Decamerone* — hundert Novellen, erzählt von jungen Leuten, die vor der Pest aus Florenz geflohen sind.`,
    },
    {
      id: 'neuzeit', type: 'text', title: 'Shakespeare und Cervantes',
      md: `
**William Shakespeare** (1564–1616) aus Stratford-upon-Avon gilt als größter Dramatiker der Weltliteratur. Etwa 37 Dramen werden ihm zugeschrieben, darunter:[^wp-shakespeare]

- Tragödien: *Romeo und Julia*, *Hamlet* („Sein oder Nichtsein, das ist hier die Frage“), *Macbeth*, *Othello*, *König Lear*
- Komödien: *Ein Sommernachtstraum*, *Der Widerspenstigen Zähmung*, *Was ihr wollt*

**Miguel de Cervantes** (1547–1616) schrieb mit *Don Quijote* (1605/1615) den ersten modernen Roman: Ein verarmter Landadliger hat so viele Ritterromane gelesen, dass er selbst als Ritter auszieht — mit seinem Knappen Sancho Panza — und gegen Windmühlen kämpft, die er für Riesen hält.[^wp-cervantes] Ein „Kampf gegen Windmühlen“ ist seitdem ein aussichtsloser Kampf.

Beide starben im selben Jahr 1616 — der 23. April, Todestag beider nach ihrem jeweiligen Kalender, ist heute **Welttag des Buches**.`,
    },
    {
      id: 'roman19', type: 'text', title: 'Das 19. Jahrhundert: das Zeitalter des Romans',
      md: `
- **Jane Austen**, *Stolz und Vorurteil* (1813) — Elizabeth Bennet und Mr. Darcy
- **Victor Hugo**, *Der Glöckner von Notre-Dame* (1831), *Die Elenden* (*Les Misérables*, 1862)
- **Charles Dickens**, *Oliver Twist* (1837–39), *Eine Weihnachtsgeschichte* (1843) mit dem Geizhals Scrooge
- **Gustave Flaubert**, *Madame Bovary* (1857) — eine Arztfrau zerbricht an ihren romantischen Träumen
- **Fjodor Dostojewski**, *Schuld und Sühne* (auch *Verbrechen und Strafe*, 1866) — der Student Raskolnikow ermordet eine Pfandleiherin
- **Lew Tolstoi**, *Krieg und Frieden* (1868/69) über Russland zur Zeit Napoleons; *Anna Karenina* (1877/78) mit dem berühmten ersten Satz „Alle glücklichen Familien gleichen einander, jede unglückliche Familie ist auf ihre eigene Weise unglücklich.“[^wp-tolstoi]
- **Herman Melville**, *Moby-Dick* (1851) — Kapitän Ahab jagt den weißen Wal`,
    },
    {
      id: 'moderne', type: 'text', title: 'Das 20. Jahrhundert',
      md: `
- **James Joyce**, *Ulysses* (1922) — ein einziger Tag in Dublin (16. Juni 1904, heute „Bloomsday“), in radikal neuer Erzähltechnik
- **Marcel Proust**, *Auf der Suche nach der verlorenen Zeit* — ausgelöst durch den Geschmack einer in Tee getauchten Madeleine
- **Franz Kafka** (Prag, deutschsprachig) — *Der Process*
- **Antoine de Saint-Exupéry**, *Der kleine Prinz* (1943): „Man sieht nur mit dem Herzen gut. Das Wesentliche ist für die Augen unsichtbar.“
- **George Orwell**, *Farm der Tiere* (1945) und *1984* (1949) — die klassische [[dystopie|Dystopie]] mit „Big Brother is watching you“
- **Ernest Hemingway**, *Der alte Mann und das Meer* (1952)
- **Gabriel García Márquez**, *Hundert Jahre Einsamkeit* (1967) — Hauptwerk des [[magischer-realismus|Magischen Realismus]]`,
    },
    {
      id: 'timeline', type: 'game', viz: 'timeline', title: 'Fast 3000 Jahre in Reihenfolge',
      params: {
        mode: 'sort',
        events: [
          { year: -700, label: 'Homer: Odyssee' },
          { year: 1310, label: 'Dante: Göttl. Komödie' },
          { year: 1600, label: 'Shakespeare: Hamlet' },
          { year: 1605, label: 'Don Quijote' },
          { year: 1813, label: 'Stolz und Vorurteil' },
          { year: 1869, label: 'Krieg und Frieden' },
          { year: 1922, label: 'Joyce: Ulysses' },
          { year: 1949, label: 'Orwell: 1984' },
          { year: 1967, label: 'Hundert Jahre Einsamkeit' },
        ],
      },
    },
    {
      id: 'match-figuren', type: 'match', title: 'Figur ↔ Werk',
      prompt: 'Ordne die berühmten Figuren ihrem Werk zu.',
      pairs: [
        ['Odysseus', 'Odyssee'],
        ['Sancho Panza', 'Don Quijote'],
        ['Raskolnikow', 'Schuld und Sühne'],
        ['Kapitän Ahab', 'Moby-Dick'],
        ['Ebenezer Scrooge', 'Eine Weihnachtsgeschichte'],
        ['Mr. Darcy', 'Stolz und Vorurteil'],
        ['Big Brother', '1984'],
      ],
    },
    {
      id: 'fact-welttag', type: 'callout', tone: 'fact', title: 'Ein Todestag — zwei Kalender',
      md: `Shakespeare und Cervantes starben beide „am 23. April 1616“ — aber nicht am selben Tag: England rechnete noch nach dem julianischen Kalender, Spanien schon nach dem gregorianischen. Tatsächlich lagen zehn Tage dazwischen. Die UNESCO machte den 23. April trotzdem zum **Welttag des Buches und des Urheberrechts**.`,
    },
    {
      id: 'quiz-redewendung', type: 'quiz', title: 'Redewendungen aus der Weltliteratur',
      question: 'Welche Redewendungen gehen auf ein Werk der Weltliteratur zurück?',
      options: [
        { text: 'Kampf gegen Windmühlen', correct: true, why: '*Don Quijote* hält Windmühlen für Riesen.' },
        { text: 'eine Odyssee hinter sich haben', correct: true, why: 'Nach Homers *Odyssee*.' },
        { text: 'Sein oder Nichtsein', correct: true, why: 'Hamlets Monolog bei Shakespeare.' },
        { text: 'Den Nagel auf den Kopf treffen', correct: false, why: 'Eine alte Handwerker- bzw. Schützenredewendung, kein literarisches Zitat.' },
      ],
    },
    {
      id: 'order-roman', type: 'order', title: 'Romane des 19. Jahrhunderts',
      prompt: 'Sortiere nach dem Erscheinungsjahr.',
      items: ['*Stolz und Vorurteil* (Austen)', '*Oliver Twist* (Dickens)', '*Moby-Dick* (Melville)', '*Madame Bovary* (Flaubert)', '*Schuld und Sühne* (Dostojewski)', '*Anna Karenina* (Tolstoi)'],
      explain: '1813 → 1837–39 → 1851 → 1857 → 1866 → 1877/78.',
    },
    {
      id: 'shakespeare-numeric', type: 'numeric', title: 'Shakespeares Lebensspanne',
      question: 'Shakespeare wurde 1564 getauft und starb 1616. Wie alt wurde er ungefähr?',
      answer: 52, tolerance: 0, unit: 'Jahre',
      explain: '52 Jahre. Er ist in derselben Kirche in Stratford begraben, in der er getauft wurde.',
    },
    {
      id: 'recall-dystopie', type: 'recall', title: 'Warum ist *1984* noch aktuell?',
      prompt: 'Erkläre, was eine **Dystopie** ist, und warum Orwells *1984* bis heute zitiert wird.',
      answer: `Eine **Dystopie** ist das Gegenteil einer Utopie: eine abschreckende Zukunftsgesellschaft, meist ein totalitärer Staat, als Warnung an die Gegenwart. In Orwells *1984* (1949) überwacht der „Große Bruder“ jeden Menschen, die Partei schreibt die Geschichte ständig um, und die künstliche Sprache „Neusprech“ soll kritisches Denken unmöglich machen. Begriffe wie „Big Brother“, „Gedankenpolizei“ oder „Neusprech“ werden bis heute in Debatten über Überwachung, Propaganda und Desinformation verwendet.`,
      hints: ['Was ist das Gegenteil einer Utopie?', 'Denk an Überwachung und Sprache.'],
      cards: ['dystopie'],
    },
  ],
  cards: [
    { id: 'goethe-wl', front: 'Wer prägte den Begriff „Weltliteratur“?', back: 'Goethe, 1827 im Gespräch mit Eckermann.' },
    { id: 'homer', front: 'Die zwei Epen Homers und ihr Inhalt?', back: '*Ilias*: Trojanischer Krieg, Zorn des Achilleus. *Odyssee*: Irrfahrt des Odysseus nach Hause.' },
    { id: 'oedipus', front: 'Wer schrieb *König Ödipus*?', back: 'Sophokles (antike griechische Tragödie).' },
    { id: 'aeneis', front: 'Römisches Nationalepos von Vergil?', back: '*Aeneis* — über den Trojaner Aeneas.' },
    { id: 'dante', front: 'Die drei Reiche in Dantes *Göttlicher Komödie*?', back: 'Hölle (Inferno), Läuterungsberg (Purgatorio), Paradies (Paradiso).' },
    { id: 'decamerone', front: 'Was ist das *Decamerone*?', back: 'Boccaccios Sammlung von 100 Novellen, erzählt von jungen Leuten auf der Flucht vor der Pest.' },
    { id: 'shakespeare-daten', front: 'Shakespeare: Lebensdaten, Herkunft?', back: '1564–1616, Stratford-upon-Avon.' },
    { id: 'shakespeare-trag', front: 'Fünf Tragödien von Shakespeare?', back: '*Romeo und Julia*, *Hamlet*, *Macbeth*, *Othello*, *König Lear*.' },
    { id: 'hamlet', front: '„Sein oder Nichtsein, das ist hier die Frage“ — aus welchem Stück?', back: 'Shakespeare, *Hamlet*.' },
    { id: 'quijote', front: '*Don Quijote*: Autor, Jahr, Inhalt?', back: 'Cervantes, 1605/1615; ein Landadliger zieht als Ritter aus und kämpft gegen Windmühlen — gilt als erster moderner Roman.' },
    { id: 'welttag', front: 'Warum ist der 23. April Welttag des Buches?', back: 'Überlieferter Todestag von Shakespeare und Cervantes (1616, nach unterschiedlichen Kalendern).' },
    { id: 'tolstoi', front: 'Zwei Romane von Lew Tolstoi?', back: '*Krieg und Frieden* (1868/69), *Anna Karenina* (1877/78).' },
    { id: 'dostojewski', front: 'Wer ist Raskolnikow?', back: 'Der Student und Mörder in Dostojewskis *Schuld und Sühne* (1866).' },
    { id: 'ulysses', front: '*Ulysses*: Autor und Handlungszeit?', back: 'James Joyce (1922); ein einziger Tag in Dublin, der 16. Juni 1904 („Bloomsday“).' },
    { id: 'kleiner-prinz', front: '„Man sieht nur mit dem Herzen gut …“ — Quelle?', back: 'Antoine de Saint-Exupéry, *Der kleine Prinz* (1943).' },
    { id: 'dystopie', front: 'Was ist eine Dystopie? Zwei Beispiele?', back: 'Abschreckende Zukunftsgesellschaft als Warnung. Orwells *1984* (1949), Huxleys *Schöne neue Welt* (1932).' },
    { id: 'garcia-marquez', front: 'Hauptwerk des Magischen Realismus?', back: 'Gabriel García Márquez, *Hundert Jahre Einsamkeit* (1967).' },
  ],
};
