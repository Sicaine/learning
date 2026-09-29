export default {
  id: 'revolutionen',
  title: 'Revolutionen: Amerika, Frankreich, Industrie',
  summary: 'Zwischen 1760 und 1850 veränderten drei Revolutionen die Welt: Die amerikanische und die französische erfanden den modernen Staat mit Menschenrechten — die industrielle veränderte, wie Menschen arbeiten und leben.',
  minutes: 24,
  goals: [
    'Die Amerikanische Revolution mit 1776 und ihren Grundideen erklären',
    'Den Verlauf der [[franzoesische-revolution|Französischen Revolution]] von 1789 bis Napoleon skizzieren',
    'Die [[industrielle-revolution|Industrielle Revolution]] und die [[soziale-frage|soziale Frage]] beschreiben',
    'Erklären, warum diese Revolutionen unsere Demokratie bis heute prägen',
  ],
  blocks: [
    {
      id: 'amerika', type: 'text', title: '1776: Die Amerikanische Revolution',
      md: `
Die dreizehn britischen Kolonien an der Ostküste Nordamerikas sollten Steuern zahlen, ohne im Londoner Parlament vertreten zu sein. „**No taxation without representation**“ wurde zum Schlachtruf. **1773** kippten Kolonisten aus Protest Tee in den Hafen von Boston (*Boston Tea Party*).

Am **4. Juli 1776** verabschiedeten die Kolonien die **Unabhängigkeitserklärung**, verfasst vor allem von **Thomas Jefferson**: Alle Menschen seien gleich geschaffen und hätten unveräußerliche Rechte auf „Leben, Freiheit und das Streben nach Glück“. Im Unabhängigkeitskrieg siegten die Amerikaner mit französischer Hilfe; 1783 erkannte Großbritannien die **USA** an.[^wp-amerikanische-revolution]

Die **Verfassung von 1787** ist die älteste noch gültige geschriebene Staatsverfassung der Welt. Sie setzt die [[gewaltenteilung|Gewaltenteilung]] um: Präsident, Kongress und Oberster Gerichtshof kontrollieren sich gegenseitig. **George Washington** wurde 1789 erster Präsident. Der Widerspruch blieb: Die Sklaverei bestand weiter — bis 1865.`,
    },
    {
      id: 'frankreich', type: 'text', title: '1789: Die Französische Revolution',
      md: `
Frankreich war hoch verschuldet, das Volk hungerte, während Adel und Klerus kaum Steuern zahlten. König **Ludwig XVI.** berief im Mai 1789 die Generalstände ein. Die Vertreter des Dritten Standes (Bürger und Bauern) erklärten sich zur **Nationalversammlung** und schworen im **Ballhausschwur** (20. Juni 1789), nicht auseinanderzugehen, bevor Frankreich eine Verfassung habe.

Am **14. Juli 1789** stürmten Pariser die **Bastille**, ein Staatsgefängnis und Symbol königlicher Willkür — bis heute der französische Nationalfeiertag. Am **26. August 1789** folgte die **Erklärung der Menschen- und Bürgerrechte**: Freiheit, Gleichheit vor dem Gesetz, Volkssouveränität. Das Motto lautete „**Liberté, Égalité, Fraternité**“.[^wp-franz-revolution]

Dann radikalisierte sich die Revolution: Frankreich wurde 1792 Republik, **Ludwig XVI.** wurde am **21. Januar 1793** mit der Guillotine hingerichtet. Unter **Robespierre** folgte 1793/94 die **Schreckensherrschaft** (*Terreur*) mit Tausenden Hinrichtungen. **1799** übernahm General **Napoleon Bonaparte** durch einen Staatsstreich die Macht und krönte sich **1804** zum Kaiser. Sein **Code civil** (1804) verbreitete Ideen der Revolution — Gleichheit vor dem Gesetz, Zivilehe — in ganz Europa.`,
    },
    {
      id: 'fact-haiti', type: 'callout', tone: 'fact', title: 'Die vergessene dritte Revolution',
      md: `In der französischen Kolonie Saint-Domingue erhoben sich ab 1791 versklavte Menschen unter Führern wie **Toussaint Louverture**. **1804** wurde **Haiti** unabhängig — die erste erfolgreiche Sklavenrevolution der Geschichte und der erste Staat, der von ehemals Versklavten gegründet wurde.`,
    },
    {
      id: 'order-fr', type: 'order', title: 'Der Ablauf der Französischen Revolution',
      prompt: 'Bringe die Ereignisse in die richtige Reihenfolge.',
      items: [
        'Einberufung der Generalstände (Mai 1789)',
        'Ballhausschwur (20. Juni 1789)',
        'Sturm auf die Bastille (14. Juli 1789)',
        'Erklärung der Menschen- und Bürgerrechte (26. August 1789)',
        'Hinrichtung Ludwigs XVI. (Januar 1793)',
        'Schreckensherrschaft unter Robespierre (1793/94)',
        'Staatsstreich Napoleons (1799)',
      ],
      explain: 'Von der Reform über die Radikalisierung zur Militärherrschaft: ein Muster, das viele Revolutionen zeigen.',
    },
    {
      id: 'industrie', type: 'text', title: 'Die Industrielle Revolution',
      md: `
Ab etwa **1760** veränderte sich in **England** die Arbeit grundlegend. Maschinen wie die **Spinning Jenny** mechanisierten die Textilherstellung; **James Watt** verbesserte die **Dampfmaschine** entscheidend (Patent 1769). Kohle und Eisen wurden zur Grundlage der Wirtschaft, Fabriken entstanden.[^wp-industrielle-revolution]

**1825** fuhr zwischen Stockton und Darlington die erste öffentliche Dampfeisenbahn. In Deutschland verkehrte die erste Eisenbahn **1835** zwischen **Nürnberg und Fürth** (Lokomotive „Adler“). Die Industrialisierung kam hier später, dann aber mit großer Wucht — vor allem im Ruhrgebiet und in Sachsen.

Die Kehrseite war die **[[soziale-frage|soziale Frage]]**: Menschen zogen vom Land in die Städte, lebten in engen Mietskasernen und arbeiteten bis zu 16 Stunden am Tag, auch Kinder. Daraus entstanden die **Arbeiterbewegung**, Gewerkschaften und sozialistische Ideen — **1848** veröffentlichten **Karl Marx** und **Friedrich Engels** das *Kommunistische Manifest*.`,
    },
    {
      id: 'tl-game', type: 'game', viz: 'timeline', title: 'Das Revolutionszeitalter ordnen',
      params: { mode: 'sort', events: [
        { year: 1769, label: 'Watts Dampfmaschine' },
        { year: 1773, label: 'Boston Tea Party' },
        { year: 1776, label: 'Unabhängigkeitserklärung' },
        { year: 1787, label: 'US-Verfassung' },
        { year: 1789, label: 'Sturm auf die Bastille' },
        { year: 1804, label: 'Napoleon wird Kaiser' },
        { year: 1835, label: 'Eisenbahn Nürnberg–Fürth' },
        { year: 1848, label: 'Kommunistisches Manifest' },
      ] },
    },
    {
      id: 'match-zitate', type: 'match', title: 'Parolen und Dokumente',
      pairs: [
        ['„No taxation without representation“', 'Amerikanische Kolonien'],
        ['„Liberté, Égalité, Fraternité“', 'Französische Revolution'],
        ['„Leben, Freiheit und das Streben nach Glück“', 'Unabhängigkeitserklärung 1776'],
        ['Code civil', 'Napoleon'],
        ['„Proletarier aller Länder, vereinigt euch!“', 'Kommunistisches Manifest'],
      ],
    },
    {
      id: 'num-bastille', type: 'numeric', title: 'Nationalfeiertag',
      question: 'Der französische Nationalfeiertag erinnert an den Sturm auf die Bastille am 14. Juli — in welchem Jahr?',
      answer: 1789, tolerance: 0,
      explain: '**14. Juli 1789** — Symbol für das Ende des Absolutismus.',
    },
    {
      id: 'quiz-verfassung', type: 'quiz', title: 'Die älteste Verfassung',
      question: 'Welche noch gültige geschriebene Staatsverfassung gilt als die älteste der Welt?',
      options: [
        { text: 'Die Verfassung der USA von 1787', correct: true, why: 'In Kraft seit 1789, seither durch Zusatzartikel ergänzt.' },
        { text: 'Die französische Verfassung von 1791', correct: false, why: 'Frankreich hatte seither viele Verfassungen; die heutige stammt von 1958.' },
        { text: 'Das deutsche Grundgesetz', correct: false, why: 'Das Grundgesetz stammt von 1949.' },
        { text: 'Die britische Verfassung', correct: false, why: 'Großbritannien hat gar keine einheitliche geschriebene Verfassung.' },
      ],
    },
    {
      id: 'recall-erbe', type: 'recall', title: 'Was verdanken wir 1776 und 1789?',
      prompt: 'Welche Ideen aus der Amerikanischen und der Französischen Revolution findest du im heutigen deutschen Grundgesetz wieder? Nenne mindestens drei.',
      answer: `Zum Beispiel: **Menschen- und Grundrechte**, die jedem zustehen; **Gleichheit vor dem Gesetz**; **Volkssouveränität** („Alle Staatsgewalt geht vom Volke aus“, Art. 20 GG); **Gewaltenteilung** in Legislative, Exekutive und Judikative; eine **geschriebene Verfassung**, die über allen Gesetzen steht; Meinungs- und Religionsfreiheit.`,
      hints: ['Denk an Artikel 1 und Artikel 20 des Grundgesetzes.'],
      cards: ['menschenrechte-1789', 'unabhaengigkeit'],
    },
  ],
  cards: [
    { id: 'no-taxation', front: 'Was bedeutete „No taxation without representation“?', back: 'Keine Steuern ohne Vertretung im Parlament — Protestparole der amerikanischen Kolonien gegen Großbritannien.' },
    { id: 'tea-party', front: 'Was war die Boston Tea Party?', back: '1773: Kolonisten warfen aus Protest gegen britische Steuern Tee in den Hafen von Boston.' },
    { id: 'unabhaengigkeit', front: 'Datum und Hauptautor der Unabhängigkeitserklärung der USA?', back: '4. Juli 1776; Thomas Jefferson.' },
    { id: 'us-verfassung', front: 'Wann entstand die US-Verfassung — und was ist das Besondere?', back: '1787; älteste noch gültige geschriebene Staatsverfassung, setzt Gewaltenteilung um.' },
    { id: 'washington', front: 'Erster Präsident der USA?', back: 'George Washington (ab 1789).' },
    { id: 'ballhaus', front: 'Was war der Ballhausschwur?', back: '20. Juni 1789: Der Dritte Stand schwor, nicht auseinanderzugehen, bis Frankreich eine Verfassung hat.' },
    { id: 'bastille', front: 'Sturm auf die Bastille — Datum?', back: '14. Juli 1789 (heute französischer Nationalfeiertag).' },
    { id: 'menschenrechte-1789', front: 'Wann wurde die Erklärung der Menschen- und Bürgerrechte verkündet?', back: '26. August 1789.' },
    { id: 'motto', front: 'Das Motto der Französischen Revolution?', back: 'Liberté, Égalité, Fraternité — Freiheit, Gleichheit, Brüderlichkeit.' },
    { id: 'ludwig', front: 'Wann wurde Ludwig XVI. hingerichtet?', back: 'Am 21. Januar 1793.' },
    { id: 'terreur', front: 'Wer steht für die Schreckensherrschaft 1793/94?', back: 'Maximilien Robespierre (Wohlfahrtsausschuss).' },
    { id: 'napoleon', front: 'Napoleon: Staatsstreich und Kaiserkrönung?', back: 'Staatsstreich 1799, Kaiser 1804.' },
    { id: 'code-civil', front: 'Was ist der Code civil?', back: 'Napoleons Zivilgesetzbuch von 1804 — verbreitete Gleichheit vor dem Gesetz in Europa.' },
    { id: 'haiti', front: 'Welches Land entstand 1804 aus einer Sklavenrevolution?', back: 'Haiti (Führer u. a. Toussaint Louverture).' },
    { id: 'watt', front: 'Wofür steht James Watt?', back: 'Entscheidende Verbesserung der Dampfmaschine (Patent 1769) — Motor der Industriellen Revolution.' },
    { id: 'eisenbahn-de', front: 'Erste deutsche Eisenbahn?', back: '1835 zwischen Nürnberg und Fürth (Lokomotive „Adler“).' },
    { id: 'soziale-frage', front: 'Was meint die „soziale Frage“?', back: 'Die Not der Arbeiter im 19. Jh.: Elend, Kinderarbeit, lange Arbeitstage — und die Suche nach Lösungen.' },
  ],
};
