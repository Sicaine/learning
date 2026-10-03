export default {
  id: 'preussen-napoleon',
  title: 'Preußen, Aufklärung & Napoleon',
  summary: 'Der Aufstieg Preußens unter Friedrich dem Großen, das Ende des Alten Reiches 1806, die preußischen Reformen und die Neuordnung Europas auf dem Wiener Kongress.',
  minutes: 22,
  goals: [
    'Den Aufstieg [[preussen|Preußens]] und die Rolle [[friedrich-der-grosse|Friedrichs des Großen]] beschreiben',
    '[[aufgeklaerter-absolutismus|Aufgeklärten Absolutismus]] erklären',
    'Die Folgen Napoleons für Deutschland nennen: [[rheinbund]], Ende des Reiches, [[preussische-reformen]]',
    'Die Ergebnisse des [[wiener-kongress|Wiener Kongresses]] und den [[deutscher-bund|Deutschen Bund]] einordnen',
  ],
  blocks: [
    {
      id: 'aufstieg', type: 'text', title: 'Vom Kurfürstentum zur Großmacht',
      md: `
Nach dem Dreißigjährigen Krieg bauten die **[Hohenzollern](wiki:Hohenzollern|House of Hohenzollern)** in [Brandenburg-Preußen](wiki:Brandenburg-Preußen|Brandenburg–Prussia) einen straff organisierten Staat auf. Der „Große Kurfürst" [Friedrich Wilhelm](wiki:Friedrich Wilhelm (Brandenburg)|Frederick William, the Great Elector) holte 1685 verfolgte französische Protestanten (**[Hugenotten](wiki:Hugenotten|Huguenots)**) ins Land ([Edikt von Potsdam](wiki:Edikt von Potsdam|Edict of Potsdam)). **1701** krönte sich Kurfürst Friedrich III. in [Königsberg](wiki:Königsberg (Preußen)|Königsberg) zum „König in Preußen" ([Friedrich I.](wiki:Friedrich I. (Preußen)|Frederick I of Prussia)).

Sein Sohn **[Friedrich Wilhelm I.](wiki:Friedrich Wilhelm I. (Preußen)|Frederick William I of Prussia)**, der „**[Soldatenkönig](wiki:Soldatenkönig|Frederick William I of Prussia)**", sparte bei Hof und baute das Heer massiv aus — Preußen wurde zum Staat mit einer Armee, über den man spottete: „ein Heer, das sich einen Staat hält". Dazu gehörten Pflichtbewusstsein, Gehorsam und Sparsamkeit — Tugenden, die bis heute als „preußisch" gelten.`,
    },
    {
      id: 'friedrich', type: 'text', title: 'Friedrich der Große (reg. 1740–1786)',
      md: `
**[[friedrich-der-grosse|Friedrich II.]]** hatte als junger Kronprinz mit Flöte und Philosophie wenig Soldatisches — sein Vater ließ nach einem Fluchtversuch seinen Freund [Katte](wiki:Hans Hermann von Katte|Hans Hermann von Katte) vor seinen Augen hinrichten. Als König aber führte er Preußen in drei [Kriege](wiki:Schlesische Kriege|Silesian Wars) um **[Schlesien](wiki:Schlesien|Silesia)** gegen Österreichs **[Maria Theresia](wiki:Maria Theresia|Maria Theresa)** und behauptete sich im **[Siebenjährigen Krieg](wiki:Siebenjähriger Krieg|Seven Years' War) (1756–1763)** gegen eine Übermacht. Preußen war nun eine der fünf europäischen Großmächte; der Gegensatz zu Österreich (**Dualismus**) prägte die deutsche Geschichte bis 1866.

Zugleich galt Friedrich als Musterbeispiel des **[[aufgeklaerter-absolutismus|aufgeklärten Absolutismus]]**: Er korrespondierte mit **[Voltaire](wiki:Voltaire|Voltaire)**, nannte sich „ersten Diener des Staates", schränkte die Folter ein, förderte religiöse Toleranz („jeder soll nach seiner Façon selig werden"), Landesausbau (Trockenlegung des [Oderbruchs](wiki:Oderbruch|Oderbruch)) und den Kartoffelanbau. An der Macht teilen wollte er allerdings nicht. Sein Sommerschloss: **[Sanssouci](wiki:Schloss Sanssouci|Sanssouci)** in [Potsdam](wiki:Potsdam|Potsdam).[^wp-friedrich-ii]`,
    },
    {
      id: 'map-preussen', type: 'map', title: 'Preußen und seine Nachbarn',
      view: [8.5, 47.8, 24.0, 56.0],
      rivers: [{ name: 'Elbe', labelAt: 0.55 }, { name: 'Oder', labelAt: 0.5 }, { name: 'Weichsel', labelAt: 0.5 }],
      places: [
        { name: 'Berlin', kind: 'capital', pos: 'r', detail: '**[Berlin](wiki:Berlin|Berlin)** — Hauptstadt Brandenburg-Preußens.' },
        { name: 'Potsdam', pos: 'l', detail: '**[Potsdam](wiki:Potsdam|Potsdam)** — Residenz der Hohenzollern; hier steht Friedrichs [Sanssouci](wiki:Schloss Sanssouci|Sanssouci).' },
        { name: 'Königsberg', pos: 'l', detail: '**[Königsberg](wiki:Königsberg (Preußen)|Königsberg)** — hier krönte sich Friedrich III. 1701 zum „König in Preußen"; Heimat Immanuel Kants.' },
        { name: 'Breslau', pos: 'r', detail: '**[Breslau](wiki:Breslau|Wrocław)** — Hauptstadt Schlesiens, um das Friedrich der Große drei Kriege führte.' },
        { name: 'Wien', pos: 'r', kind: 'capital', detail: '**[Wien](wiki:Wien|Vienna)** — Residenz der Habsburger und Maria Theresias: Gegenspielerin Preußens (Dualismus).' },
      ],
      caption: 'Preußen lag im Nordosten des Reiches, die Habsburger im Südosten: der „Dualismus" der beiden Großmächte prägte die deutsche Geschichte bis 1866. Die Grenzen von damals sind hier nicht eingezeichnet.',
    },
    {
      id: 'aufklaerung', type: 'callout', tone: 'history', title: '„Habe Mut, dich deines eigenen Verstandes zu bedienen!"',
      md: `So formulierte der Königsberger Philosoph **[Immanuel Kant](wiki:Immanuel Kant|Immanuel Kant)** 1784 den Wahlspruch der Aufklärung. Aufklärung hieß: Vernunft statt Tradition und Autorität, Toleranz, Menschenrechte, Kritik an Aberglauben. In Deutschland stehen neben Kant etwa **[Lessing](wiki:Gotthold Ephraim Lessing|Gotthold Ephraim Lessing)** („[Nathan der Weise](wiki:Nathan der Weise|Nathan the Wise)") und **[Moses Mendelssohn](wiki:Moses Mendelssohn|Moses Mendelssohn)** für diese Bewegung.`,
    },
    {
      id: 'napoleon', type: 'text', title: 'Napoleon verändert Deutschland',
      md: `
Nach der [Französischen Revolution](wiki:Französische Revolution|French Revolution) (1789) überrollten französische Armeen Europa. Für Deutschland hatte **[Napoleon Bonaparte](wiki:Napoleon Bonaparte|Napoleon)** enorme Folgen:

- **Flurbereinigung**: Geistliche Fürstentümer und fast alle Reichsstädte wurden aufgelöst und größeren Staaten zugeschlagen ([Reichsdeputationshauptschluss](wiki:Reichsdeputationshauptschluss|Reichsdeputationshauptschluss) **1803**). Aus Hunderten Herrschaften wurden einige Dutzend Staaten; Bayern, Württemberg und Baden wuchsen stark.
- **1806** gründeten 16 Staaten unter Napoleons Schutz den **[[rheinbund]]** und traten aus dem Reich aus. Am **6. August 1806** legte [Franz II.](wiki:Franz II. (HRR)|Francis II, Holy Roman Emperor) die Kaiserkrone nieder — das **[[heiliges-roemisches-reich|Heilige Römische Reich]]** endete nach über 800 Jahren.
- Im Oktober **1806** wurde **Preußen bei [Jena und Auerstedt](wiki:Schlacht bei Jena und Auerstedt|Battle of Jena–Auerstedt)** vernichtend geschlagen; im [Frieden von Tilsit](wiki:Frieden von Tilsit|Treaties of Tilsit) 1807 verlor es rund die Hälfte seines Gebiets.
- In vielen Gebieten brachte Napoleon den **[Code civil](wiki:Code civil|Napoleonic Code)**: Gleichheit vor dem Gesetz, Zivilehe, Abschaffung feudaler Privilegien.`,
    },
    {
      id: 'map-napoleon', type: 'map', title: 'Napoleon in Europa: Stationen 1806–1815',
      view: [-3.5, 44.0, 40.0, 59.0],
      layers: { cities: false },
      places: [
        { name: 'Jena', label: 'Jena 1806', kind: 'battle', pos: 'b', detail: '**[Jena](wiki:Jena|Jena)** — 14. Oktober 1806: Preußen wird bei Jena und Auerstedt vernichtend geschlagen.' },
        { name: 'Moskau', label: 'Moskau 1812', kind: 'site', pos: 'l', detail: '**[Moskau](wiki:Moskau|Moscow)** — Ziel des [Russlandfeldzugs](wiki:Russlandfeldzug 1812|French invasion of Russia) 1812; der Rückzug zerstörte die Große Armee.' },
        { name: 'Leipzig', label: 'Leipzig 1813', kind: 'battle', pos: 'r', detail: '**[Leipzig](wiki:Leipzig|Leipzig)** — Oktober 1813: die Völkerschlacht, Napoleons entscheidende Niederlage.' },
        { name: 'Waterloo', label: 'Waterloo 1815', kind: 'battle', pos: 'l', detail: '**[Waterloo](wiki:Waterloo (Belgien)|Waterloo, Belgium)** — 1815: Napoleons endgültige Niederlage.' },
        { name: 'Paris', kind: 'capital', pos: 'l', detail: '**[Paris](wiki:Paris|Paris)** — Napoleons Hauptstadt.' },
        { name: 'Wien', kind: 'capital', pos: 'b', detail: '**[Wien](wiki:Wien|Vienna)** — Tagungsort des Wiener Kongresses 1814/15.' },
      ],
      points: [
        { lon: 21.89, lat: 55.08, label: 'Tilsit 1807', kind: 'site', pos: 'r', detail: '**[Tilsit](wiki:Sowetsk (Kaliningrad)|Sovetsk, Kaliningrad Oblast)** — 1807: Frieden von Tilsit; Preußen verliert etwa die Hälfte seines Gebiets.' },
      ],
      caption: 'Kreuz: Schlachten (Jena 1806, Leipzig 1813, Waterloo 1815); Raute: Tilsit (Frieden 1807) und Moskau (Russlandfeldzug 1812).',
    },
    {
      id: 'video-napoleon', type: 'video', youtube: 'HYM_GyrKqnw', label: 'Napoleon Bonaparte – der Jahrhundertherrscher und die Deutschen', channel: 'Terra X',
    },
    {
      id: 'reformen', type: 'text', title: 'Die preußischen Reformen',
      md: `
Die Niederlage zwang Preußen zur Modernisierung „von oben" — die **[[preussische-reformen|preußischen Reformen]]**:[^wp-preussische-reformen]

- **Bauernbefreiung** ([Oktoberedikt](wiki:Oktoberedikt) 1807): Ende der Erbuntertänigkeit.
- **[Städteordnung](wiki:Preußische Städteordnung|Prussian Reform Movement)** (1808): kommunale Selbstverwaltung — Grundlage unserer heutigen Gemeindeselbstverwaltung.
- **[Gewerbefreiheit](wiki:Gewerbefreiheit|Economic freedom)** und die **Emanzipation der Juden** ([Edikt von 1812](wiki:Emanzipationsedikt)).
- **Bildungsreform** unter **[Wilhelm von Humboldt](wiki:Wilhelm von Humboldt|Wilhelm von Humboldt)**: humanistisches Gymnasium, Gründung der [Berliner Universität](wiki:Humboldt-Universität zu Berlin|Humboldt University of Berlin) **1810** mit dem Ideal der Einheit von Forschung und Lehre.
- **Heeresreform** unter [Scharnhorst](wiki:Gerhard von Scharnhorst|Gerhard von Scharnhorst) und [Gneisenau](wiki:August Neidhardt von Gneisenau|August Neidhardt von Gneisenau): allgemeine Wehrpflicht, Ende der Prügelstrafe im Heer.

Die treibenden Köpfe waren **[Freiherr vom Stein](wiki:Karl vom und zum Stein|Heinrich Friedrich Karl vom und zum Stein)** und **[Karl August von Hardenberg](wiki:Karl August von Hardenberg|Karl August von Hardenberg)**.`,
    },
    {
      id: 'befreiung', type: 'text', title: 'Befreiungskriege und Wiener Kongress',
      md: `
Nach Napoleons gescheitertem [Russlandfeldzug](wiki:Russlandfeldzug 1812|French invasion of Russia) 1812 erhoben sich Preußen, Russland und Österreich. In der **[Völkerschlacht bei Leipzig](wiki:Völkerschlacht bei Leipzig|Battle of Leipzig)** (16.–19. Oktober **1813**) wurde Napoleon geschlagen; nach seiner Rückkehr aus dem Exil verlor er endgültig **1815 bei [Waterloo](wiki:Schlacht bei Waterloo|Battle of Waterloo)**.

Der **[[wiener-kongress|Wiener Kongress]] (1814/15)** unter dem österreichischen Staatskanzler **[Metternich](wiki:Klemens Wenzel Lothar von Metternich|Klemens von Metternich)** ordnete Europa neu: Wiederherstellung der Fürstenherrschaft (**[Restauration](wiki:Restauration (Geschichte))**) und Gleichgewicht der Großmächte. Einen deutschen Nationalstaat gab es nicht — stattdessen den **[[deutscher-bund|Deutschen Bund]]**, einen lockeren Bund souveräner Fürsten mit einem Gesandtenkongress in [Frankfurt](wiki:Frankfurt am Main|Frankfurt). Preußen gewann das [Rheinland](wiki:Rheinland|Rhineland) und [Westfalen](wiki:Westfalen|Westphalia) und rückte damit nach Westen.[^wp-wiener-kongress]`,
    },
    {
      id: 'timeline-napoleon', type: 'game', viz: 'timeline', title: 'Von Friedrich bis Waterloo',
      params: {
        mode: 'sort',
        events: [
          { year: 1701, label: 'Königreich Preußen' },
          { year: 1740, label: 'Friedrich II. wird König' },
          { year: 1756, label: 'Siebenjähriger Krieg' },
          { year: 1789, label: 'Französische Revolution' },
          { year: 1806, label: 'Ende des Alten Reiches' },
          { year: 1810, label: 'Berliner Universität' },
          { year: 1813, label: 'Völkerschlacht bei Leipzig' },
          { year: 1815, label: 'Waterloo & Wiener Kongress' },
        ],
      },
    },
    {
      id: 'quiz-1806', type: 'quiz', title: 'Das Jahr 1806',
      question: 'Was geschah im Jahr **1806**?',
      options: [
        { text: 'Gründung des Rheinbunds unter Napoleons Protektorat', correct: true, why: 'Juli 1806: 16 Staaten verlassen das Reich.' },
        { text: 'Ende des Heiligen Römischen Reiches', correct: true, why: 'Franz II. legte am 6. August 1806 die Kaiserkrone nieder.' },
        { text: 'Niederlage Preußens bei Jena und Auerstedt', correct: true, why: '14. Oktober 1806.' },
        { text: 'Völkerschlacht bei Leipzig', correct: false, why: 'Die war 1813.' },
        { text: 'Gründung des Deutschen Bundes', correct: false, why: 'Der Deutsche Bund entstand 1815 auf dem Wiener Kongress.' },
      ],
    },
    {
      id: 'map-quiz-napoleon', type: 'map', title: 'Wo wurde Geschichte entschieden?',
      view: [-3.5, 43.0, 40.0, 59.0],
      layers: { cities: false },
      quiz: { rounds: 6 },
      places: [{ name: 'Leipzig' }, { name: 'Waterloo' }, { name: 'Moskau' }, { name: 'Paris' }, { name: 'Wien' }, { name: 'Berlin' }],
    },
    {
      id: 'match-reformer', type: 'match', title: 'Wer reformierte was?',
      pairs: [
        ['Wilhelm von Humboldt', 'Bildungsreform, Berliner Universität'],
        ['Freiherr vom Stein', 'Städteordnung, Bauernbefreiung'],
        ['Scharnhorst', 'Heeresreform, Wehrpflicht'],
        ['Metternich', 'Wiener Kongress, Restauration'],
        ['Maria Theresia', 'Friedrichs Gegenspielerin um Schlesien'],
      ],
    },
    {
      id: 'recall-napoleon', type: 'recall', title: 'Napoleons Erbe',
      prompt: 'Napoleon war für viele Deutsche ein Besatzer — und hat Deutschland trotzdem modernisiert. Erkläre diesen Widerspruch in 3–4 Sätzen.',
      answer: `Napoleon besetzte weite Teile Deutschlands, erhob Abgaben, zog Soldaten ein und demütigte Preußen (Jena und Auerstedt, Tilsit) — das weckte **Nationalgefühl** und führte zu den Befreiungskriegen. Zugleich **vereinfachte** er die politische Landkarte radikal (Auflösung geistlicher Staaten und Reichsstädte, Ende des Alten Reiches 1806), brachte in vielen Gebieten den **Code civil** mit Rechtsgleichheit und Abschaffung feudaler Privilegien, und die Niederlage zwang Preußen zu den **Reformen** von Stein, Hardenberg und Humboldt.`,
      hints: ['Denk an die Landkarte vor und nach 1803/1806.', 'Was löste die Niederlage von 1806 in Preußen aus?'],
      cards: ['napoleon-folgen'],
    },
  ],
  cards: [
    { id: 'preussen-1701', front: 'Seit wann gibt es das Königreich Preußen?', back: 'Seit **1701** (Krönung Friedrichs I. in Königsberg).' },
    { id: 'soldatenkoenig', front: 'Wer war der „Soldatenkönig"?', back: '**Friedrich Wilhelm I.** von Preußen, Vater Friedrichs des Großen.' },
    { id: 'friedrich-regierung', front: 'Wann regierte Friedrich der Große?', back: '**1740–1786**.' },
    { id: 'siebenjaehriger', front: 'Wann war der Siebenjährige Krieg?', back: '**1756–1763**.' },
    { id: 'friedrich-diener', front: 'Mit welcher Formel beschrieb Friedrich II. sein Amt?', back: 'Als „**erster Diener des Staates**".' },
    { id: 'sanssouci', front: 'Wie heißt Friedrichs Sommerschloss in Potsdam?', back: '**Sanssouci** („ohne Sorge").' },
    { id: 'kant-aufklaerung', front: 'Wie definierte Kant 1784 die Aufklärung?', back: '„Ausgang des Menschen aus seiner **selbstverschuldeten Unmündigkeit**" — „Habe Mut, dich deines eigenen Verstandes zu bedienen!"' },
    { id: 'aufgeklaert', front: 'Was bedeutet „aufgeklärter Absolutismus"?', back: 'Ein Monarch mit uneingeschränkter Macht führt **Reformen im Geist der Aufklärung** durch — ohne Mitbestimmung der Untertanen.' },
    { id: 'reichsende-datum', front: 'An welchem Tag endete das Heilige Römische Reich?', back: 'Am **6. August 1806** (Niederlegung der Kaiserkrone durch Franz II.).' },
    { id: 'rheinbund', front: 'Was war der Rheinbund?', back: '1806 unter Napoleons Schutz gegründeter Bund von zunächst **16 deutschen Staaten**, die aus dem Reich austraten.' },
    { id: 'jena', front: 'Wo wurde Preußen 1806 von Napoleon geschlagen?', back: 'Bei **Jena und Auerstedt**.' },
    { id: 'napoleon-folgen', front: 'Nenne drei modernisierende Folgen Napoleons für Deutschland.', back: 'Flurbereinigung der Landkarte; Code civil (Rechtsgleichheit); Anstoß zu den preußischen Reformen; Ende des Alten Reiches.' },
    { id: 'humboldt', front: 'Wer gründete 1810 die Berliner Universität und reformierte die Bildung in Preußen?', back: '**Wilhelm von Humboldt**.' },
    { id: 'stein-hardenberg', front: 'Nenne zwei preußische Reformen und ihre Urheber.', back: 'z. B. Bauernbefreiung 1807 und Städteordnung 1808 (**Stein**), Gewerbefreiheit und Judenemanzipation (**Hardenberg**), Heeresreform (**Scharnhorst**).' },
    { id: 'voelkerschlacht', front: 'Wann und wo fand die Völkerschlacht statt?', back: '**16.–19. Oktober 1813** bei **Leipzig**.' },
    { id: 'wiener-kongress', front: 'Was schuf der Wiener Kongress 1815 für Deutschland?', back: 'Den **Deutschen Bund** — einen lockeren Staatenbund statt eines Nationalstaats.' },
  ],
};
