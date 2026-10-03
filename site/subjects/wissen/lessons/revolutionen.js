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
Die dreizehn britischen Kolonien an der Ostküste Nordamerikas sollten Steuern zahlen, ohne im Londoner Parlament vertreten zu sein. „**No taxation without representation**“ wurde zum Schlachtruf. **1773** kippten Kolonisten aus Protest Tee in den Hafen von Boston (*[Boston Tea Party](wiki:Boston Tea Party|Boston Tea Party)*).

Am **4. Juli 1776** verabschiedeten die Kolonien die **[Unabhängigkeitserklärung](wiki:Unabhängigkeitserklärung der Vereinigten Staaten|United States Declaration of Independence)**, verfasst vor allem von **[Thomas Jefferson](wiki:Thomas Jefferson|Thomas Jefferson)**: Alle Menschen seien gleich geschaffen und hätten unveräußerliche Rechte auf „Leben, Freiheit und das Streben nach Glück“. Im [Unabhängigkeitskrieg](wiki:Amerikanischer Unabhängigkeitskrieg|American Revolutionary War) siegten die Amerikaner mit französischer Hilfe; 1783 erkannte Großbritannien die **[USA](wiki:Vereinigte Staaten|United States)** an.[^wp-amerikanische-revolution]

Die **[Verfassung von 1787](wiki:Verfassung der Vereinigten Staaten|Constitution of the United States)** ist die älteste noch gültige geschriebene Staatsverfassung der Welt. Sie setzt die [[gewaltenteilung|Gewaltenteilung]] um: Präsident, Kongress und Oberster Gerichtshof kontrollieren sich gegenseitig. **[George Washington](wiki:George Washington|George Washington)** wurde 1789 erster Präsident. Der Widerspruch blieb: Die Sklaverei bestand weiter — bis 1865.`,
    },
    {
      id: 'map-amerika', type: 'map', title: 'Orte der Amerikanischen Revolution',
      view: [-82, 33, -66, 46],
      layers: { cities: false, countryLabels: false },
      places: [
        { name: 'Boston', num: 1, pos: 'r', detail: `**[Boston](wiki:Boston|Boston)** — hier warfen Kolonisten 1773 Tee ins Hafenwasser: die [Boston Tea Party](wiki:Boston Tea Party|Boston Tea Party).` },
        { name: 'Philadelphia', num: 2, pos: 'r', detail: `**[Philadelphia](wiki:Philadelphia|Philadelphia)** — am 4. Juli 1776 wurde hier die [Unabhängigkeitserklärung](wiki:Unabhängigkeitserklärung der Vereinigten Staaten|United States Declaration of Independence) beschlossen; 1787 tagte hier der Verfassungskonvent.` },
        { name: 'New York City', num: 4, pos: 'r', detail: `**[New York](wiki:New York City|New York City)** — 1789 trat [George Washington](wiki:George Washington|George Washington) hier sein Amt als erster Präsident an.` },
        { name: 'Washington, D.C.', num: 5, pos: 'r', detail: `**[Washington, D.C.](wiki:Washington, D.C.|Washington, D.C.)** — seit 1800 Hauptstadt der USA, benannt nach dem ersten Präsidenten.` },
        { name: 'Jamestown', pos: 'l', detail: `**[Jamestown](wiki:Jamestown (Virginia)|Jamestown)** — 1607 die erste dauerhafte englische Siedlung in Nordamerika.` },
      ],
      points: [
        { lon: -76.51, lat: 37.234, label: 'Yorktown', num: 3, kind: 'battle', pos: 'r', detail: `**[Yorktown](wiki:Schlacht von Yorktown|Siege of Yorktown)** — 1781 kapitulierten hier die Briten; damit war der Krieg praktisch entschieden (Friede 1783).` },
      ],
      caption: 'Die Nummern zeigen die Reihenfolge: 1 Boston (1773) · 2 Philadelphia (1776) · 3 Yorktown (1781) · 4 New York (1789) · 5 Washington (ab 1800).',
    },
    {
      id: 'frankreich', type: 'text', title: '1789: Die Französische Revolution',
      md: `
Frankreich war hoch verschuldet, das Volk hungerte, während Adel und Klerus kaum Steuern zahlten. König **[Ludwig XVI.](wiki:Ludwig XVI.|Louis XVI)** berief im Mai 1789 die [Generalstände](wiki:Generalstände|Estates General (France)) ein. Die Vertreter des Dritten Standes (Bürger und Bauern) erklärten sich zur **[Nationalversammlung](wiki:Französische Nationalversammlung|National Assembly (France))** und schworen im **[Ballhausschwur](wiki:Ballhausschwur|Tennis Court Oath)** (20. Juni 1789), nicht auseinanderzugehen, bevor Frankreich eine Verfassung habe.

Am **14. Juli 1789** stürmten Pariser die **[Bastille](wiki:Sturm auf die Bastille|Storming of the Bastille)**, ein Staatsgefängnis und Symbol königlicher Willkür — bis heute der französische Nationalfeiertag. Am **26. August 1789** folgte die **[Erklärung der Menschen- und Bürgerrechte](wiki:Erklärung der Menschen- und Bürgerrechte|Declaration of the Rights of Man and of the Citizen)**: Freiheit, Gleichheit vor dem Gesetz, Volkssouveränität. Das Motto lautete „**Liberté, Égalité, Fraternité**“.[^wp-franz-revolution]

Dann radikalisierte sich die Revolution: Frankreich wurde 1792 Republik, **Ludwig XVI.** wurde am **21. Januar 1793** mit der Guillotine hingerichtet. Unter **[Robespierre](wiki:Maximilien de Robespierre|Maximilien Robespierre)** folgte 1793/94 die **[Schreckensherrschaft](wiki:Terrorherrschaft|Reign of Terror)** (*Terreur*) mit Tausenden Hinrichtungen. **1799** übernahm General **[Napoleon Bonaparte](wiki:Napoleon Bonaparte|Napoleon)** durch einen Staatsstreich die Macht und krönte sich **1804** zum Kaiser. Sein **[Code civil](wiki:Code civil|Napoleonic Code)** (1804) verbreitete Ideen der Revolution — Gleichheit vor dem Gesetz, Zivilehe — in ganz Europa.`,
    },
    {
      id: 'fact-haiti', type: 'callout', tone: 'fact', title: 'Die vergessene dritte Revolution',
      md: `In der französischen Kolonie [Saint-Domingue](wiki:Saint-Domingue|Saint-Domingue) erhoben sich ab 1791 versklavte Menschen unter Führern wie **[Toussaint Louverture](wiki:Toussaint Louverture|Toussaint Louverture)**. **1804** wurde **[Haiti](wiki:Haiti|Haiti)** unabhängig — die erste erfolgreiche Sklavenrevolution der Geschichte und der erste Staat, der von ehemals Versklavten gegründet wurde.`,
    },
    {
      id: 'map-atlantik-revolutionen', type: 'map', title: 'Revolutionen rund um den Atlantik',
      view: [-85, 10, 12, 54],
      layers: { cities: false, countryLabels: false, mountains: false },
      highlight: [{ label: 'Haiti (früher Saint-Domingue)', color: '#7c3aed', countries: ['Haiti'] }],
      places: [
        { name: 'Boston', num: 1, pos: 'r', detail: `**[Boston](wiki:Boston|Boston)** — 1773 Boston Tea Party: Der Protest gegen britische Steuern beginnt.` },
        { name: 'Philadelphia', num: 2, pos: 'b', detail: `**[Philadelphia](wiki:Philadelphia|Philadelphia)** — 1776 Unabhängigkeitserklärung.` },
        { name: 'Paris', num: 4, pos: 'b', detail: `**[Paris](wiki:Paris|Paris)** — 1789 Sturm auf die Bastille, Menschenrechtserklärung.` },
      ],
      points: [
        { lon: -72.339, lat: 18.543, label: 'Haiti', num: 5, pos: 'r', detail: `**[Haiti](wiki:Haiti|Haiti)** — ab 1791 erhoben sich Versklavte unter [Toussaint Louverture](wiki:Toussaint Louverture|Toussaint Louverture); 1804 wurde Haiti unabhängig.` },
        { lon: -76.51, lat: 37.234, label: 'Yorktown', num: 3, kind: 'battle', pos: 'r', detail: `**[Yorktown](wiki:Schlacht von Yorktown|Siege of Yorktown)** — 1781 entscheidender Sieg der Amerikaner mit französischer Hilfe.` },
      ],
      caption: 'Die Ideen von Freiheit und Gleichheit wanderten über den Atlantik: 1 Boston (1773) · 2 Philadelphia (1776) · 3 Yorktown (1781) · 4 Paris (1789) · 5 Haiti (1791–1804).',
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
Ab etwa **1760** veränderte sich in **England** die Arbeit grundlegend. Maschinen wie die **[Spinning Jenny](wiki:Spinning Jenny|Spinning jenny)** mechanisierten die Textilherstellung; **[James Watt](wiki:James Watt|James Watt)** verbesserte die **[Dampfmaschine](wiki:Dampfmaschine|Steam engine)** entscheidend (Patent 1769). Kohle und Eisen wurden zur Grundlage der Wirtschaft, Fabriken entstanden.[^wp-industrielle-revolution]

**1825** fuhr zwischen [Stockton und Darlington](wiki:Stockton and Darlington Railway|Stockton and Darlington Railway) die erste öffentliche Dampfeisenbahn. In Deutschland verkehrte die erste Eisenbahn **1835** zwischen **[Nürnberg und Fürth](wiki:Ludwigseisenbahn|Bavarian Ludwig Railway)** (Lokomotive „[Adler](wiki:Adler (Lokomotive)|Adler (locomotive))“). Die Industrialisierung kam hier später, dann aber mit großer Wucht — vor allem im [Ruhrgebiet](wiki:Ruhrgebiet|Ruhr) und in Sachsen.

Die Kehrseite war die **[[soziale-frage|soziale Frage]]**: Menschen zogen vom Land in die Städte, lebten in engen Mietskasernen und arbeiteten bis zu 16 Stunden am Tag, auch Kinder. Daraus entstanden die **[Arbeiterbewegung](wiki:Arbeiterbewegung|Labour movement)**, [Gewerkschaften](wiki:Gewerkschaft|Trade union) und sozialistische Ideen — **1848** veröffentlichten **[Karl Marx](wiki:Karl Marx|Karl Marx)** und **[Friedrich Engels](wiki:Friedrich Engels|Friedrich Engels)** das *[Kommunistische Manifest](wiki:Manifest der Kommunistischen Partei|The Communist Manifesto)*.`,
    },
    {
      id: 'map-industrie-england', type: 'map', title: 'Die Wiege der Industrialisierung: England',
      view: [-6.2, 50.2, 2.0, 56.0],
      layers: { cities: false, countryLabels: false },
      places: [
        { name: 'Manchester', pos: 'r', detail: `**[Manchester](wiki:Manchester|Manchester)** — Baumwollindustrie, Zentrum der Industrialisierung (*Cottonopolis*).` },
        { name: 'Birmingham', pos: 'r', detail: `**[Birmingham](wiki:Birmingham|Birmingham)** — Metallverarbeitung; hier arbeitete [James Watt](wiki:James Watt|James Watt) mit [Matthew Boulton](wiki:Matthew Boulton|Matthew Boulton) an der Dampfmaschine.` },
        { name: 'Liverpool', pos: 'l', detail: `**[Liverpool](wiki:Liverpool|Liverpool)** — Hafen, über den Baumwolle und Industriegüter ein- und ausgingen; 1830 mit Manchester durch die erste Intercity-Eisenbahn verbunden.` },
        { name: 'London', pos: 'r', detail: `**[London](wiki:London|London)** — Hauptstadt und größte Stadt der Welt.` },
      ],
      points: [
        { lon: -1.557, lat: 54.523, label: 'Darlington', pos: 'l', detail: `**[Stockton und Darlington](wiki:Stockton and Darlington Railway|Stockton and Darlington Railway)** — 1825 fuhr zwischen Stockton und Darlington die erste öffentliche Dampfeisenbahn.` },
        { lon: -1.32, lat: 54.57, label: 'Stockton', pos: 'r', detail: `**[Stockton-on-Tees](wiki:Stockton-on-Tees|Stockton-on-Tees)** — Endpunkt der ersten öffentlichen Dampfeisenbahn (1825).` },
      ],
      caption: 'Kohle, Eisen und Wasserwege machten die Midlands und den Nordwesten Englands zum Zentrum der Industriellen Revolution.',
    },
    {
      id: 'map-industrie-deutschland', type: 'map', title: 'Industrialisierung in Deutschland',
      view: 'de',
      landscapes: ['Ruhrgebiet'],
      layers: { cities: false },
      places: [
        { name: 'Nürnberg', pos: 'r', detail: `**[Nürnberg](wiki:Nürnberg|Nuremberg)** — hier startete 1835 die erste deutsche Eisenbahn nach Fürth.` },
        { name: 'Chemnitz', pos: 'r', detail: `**[Chemnitz](wiki:Chemnitz|Chemnitz)** — „sächsisches Manchester“, Zentrum von Textil- und Maschinenbau.` },
        { name: 'Essen', pos: 'l', detail: `**[Essen](wiki:Essen|Essen)** — Sitz der Firma [Krupp](wiki:Krupp (Familie)|Krupp family) und Herz des [Ruhrgebiets](wiki:Ruhrgebiet|Ruhr).` },
        { name: 'Dortmund', pos: 'r', detail: `**[Dortmund](wiki:Dortmund|Dortmund)** — Kohle, Eisen und Stahl.` },
        { name: 'Zwickau', pos: 'r', detail: `**[Zwickau](wiki:Zwickau|Zwickau)** — Steinkohle im Erzgebirgsvorland, später Automobilbau.` },
        { name: 'Berlin', pos: 'r', detail: `**[Berlin](wiki:Berlin|Berlin)** — Maschinenbau und Elektroindustrie (Borsig, Siemens).` },
      ],
      points: [
        { lon: 10.988, lat: 49.477, label: 'Fürth', pos: 'b', detail: `**[Fürth](wiki:Fürth|Fürth)** — Endpunkt der [Ludwigseisenbahn](wiki:Ludwigseisenbahn|Bavarian Ludwig Railway) (1835, rund 6 km).` },
      ],
      caption: 'Kohle (Ruhr, Sachsen) und Eisenbahnlinien bestimmten, wo Industrie entstand.',
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
      id: 'map-quiz-revolutionen', type: 'map', title: 'Wo spielten die Revolutionen?',
      view: [-85, 10, 12, 54],
      layers: { cities: false, countryLabels: false, mountains: false },
      quiz: { rounds: 6 },
      places: [{ name: 'Boston' }, { name: 'Philadelphia' }, { name: 'Paris' }, { name: 'Manchester' }],
      points: [{ lon: -76.51, lat: 37.234, label: 'Yorktown', kind: 'place' }, { lon: -72.339, lat: 18.543, label: 'Port-au-Prince', kind: 'place' }],
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
