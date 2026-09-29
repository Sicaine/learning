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
Nach dem Dreißigjährigen Krieg bauten die **Hohenzollern** in Brandenburg-Preußen einen straff organisierten Staat auf. Der „Große Kurfürst" Friedrich Wilhelm holte 1685 verfolgte französische Protestanten (**Hugenotten**) ins Land (Edikt von Potsdam). **1701** krönte sich Kurfürst Friedrich III. in Königsberg zum „König in Preußen" (Friedrich I.).

Sein Sohn **Friedrich Wilhelm I.**, der „**Soldatenkönig**", sparte bei Hof und baute das Heer massiv aus — Preußen wurde zum Staat mit einer Armee, über den man spottete: „ein Heer, das sich einen Staat hält". Dazu gehörten Pflichtbewusstsein, Gehorsam und Sparsamkeit — Tugenden, die bis heute als „preußisch" gelten.`,
    },
    {
      id: 'friedrich', type: 'text', title: 'Friedrich der Große (reg. 1740–1786)',
      md: `
**[[friedrich-der-grosse|Friedrich II.]]** hatte als junger Kronprinz mit Flöte und Philosophie wenig Soldatisches — sein Vater ließ nach einem Fluchtversuch seinen Freund Katte vor seinen Augen hinrichten. Als König aber führte er Preußen in drei Kriege um **Schlesien** gegen Österreichs **Maria Theresia** und behauptete sich im **Siebenjährigen Krieg (1756–1763)** gegen eine Übermacht. Preußen war nun eine der fünf europäischen Großmächte; der Gegensatz zu Österreich (**Dualismus**) prägte die deutsche Geschichte bis 1866.

Zugleich galt Friedrich als Musterbeispiel des **[[aufgeklaerter-absolutismus|aufgeklärten Absolutismus]]**: Er korrespondierte mit **Voltaire**, nannte sich „ersten Diener des Staates", schränkte die Folter ein, förderte religiöse Toleranz („jeder soll nach seiner Façon selig werden"), Landesausbau (Trockenlegung des Oderbruchs) und den Kartoffelanbau. An der Macht teilen wollte er allerdings nicht. Sein Sommerschloss: **Sanssouci** in Potsdam.[^wp-friedrich-ii]`,
    },
    {
      id: 'aufklaerung', type: 'callout', tone: 'history', title: '„Habe Mut, dich deines eigenen Verstandes zu bedienen!"',
      md: `So formulierte der Königsberger Philosoph **Immanuel Kant** 1784 den Wahlspruch der Aufklärung. Aufklärung hieß: Vernunft statt Tradition und Autorität, Toleranz, Menschenrechte, Kritik an Aberglauben. In Deutschland stehen neben Kant etwa **Lessing** („Nathan der Weise") und **Moses Mendelssohn** für diese Bewegung.`,
    },
    {
      id: 'napoleon', type: 'text', title: 'Napoleon verändert Deutschland',
      md: `
Nach der Französischen Revolution (1789) überrollten französische Armeen Europa. Für Deutschland hatte **Napoleon Bonaparte** enorme Folgen:

- **Flurbereinigung**: Geistliche Fürstentümer und fast alle Reichsstädte wurden aufgelöst und größeren Staaten zugeschlagen (Reichsdeputationshauptschluss **1803**). Aus Hunderten Herrschaften wurden einige Dutzend Staaten; Bayern, Württemberg und Baden wuchsen stark.
- **1806** gründeten 16 Staaten unter Napoleons Schutz den **[[rheinbund]]** und traten aus dem Reich aus. Am **6. August 1806** legte Franz II. die Kaiserkrone nieder — das **[[heiliges-roemisches-reich|Heilige Römische Reich]]** endete nach über 800 Jahren.
- Im Oktober **1806** wurde **Preußen bei Jena und Auerstedt** vernichtend geschlagen; im Frieden von Tilsit 1807 verlor es rund die Hälfte seines Gebiets.
- In vielen Gebieten brachte Napoleon den **Code civil**: Gleichheit vor dem Gesetz, Zivilehe, Abschaffung feudaler Privilegien.`,
    },
    {
      id: 'video-napoleon', type: 'video', youtube: 'HYM_GyrKqnw', label: 'Napoleon Bonaparte – der Jahrhundertherrscher und die Deutschen', channel: 'Terra X',
    },
    {
      id: 'reformen', type: 'text', title: 'Die preußischen Reformen',
      md: `
Die Niederlage zwang Preußen zur Modernisierung „von oben" — die **[[preussische-reformen|preußischen Reformen]]**:[^wp-preussische-reformen]

- **Bauernbefreiung** (Oktoberedikt 1807): Ende der Erbuntertänigkeit.
- **Städteordnung** (1808): kommunale Selbstverwaltung — Grundlage unserer heutigen Gemeindeselbstverwaltung.
- **Gewerbefreiheit** und die **Emanzipation der Juden** (Edikt von 1812).
- **Bildungsreform** unter **Wilhelm von Humboldt**: humanistisches Gymnasium, Gründung der Berliner Universität **1810** mit dem Ideal der Einheit von Forschung und Lehre.
- **Heeresreform** unter Scharnhorst und Gneisenau: allgemeine Wehrpflicht, Ende der Prügelstrafe im Heer.

Die treibenden Köpfe waren **Freiherr vom Stein** und **Karl August von Hardenberg**.`,
    },
    {
      id: 'befreiung', type: 'text', title: 'Befreiungskriege und Wiener Kongress',
      md: `
Nach Napoleons gescheitertem Russlandfeldzug 1812 erhoben sich Preußen, Russland und Österreich. In der **Völkerschlacht bei Leipzig** (16.–19. Oktober **1813**) wurde Napoleon geschlagen; nach seiner Rückkehr aus dem Exil verlor er endgültig **1815 bei Waterloo**.

Der **[[wiener-kongress|Wiener Kongress]] (1814/15)** unter dem österreichischen Staatskanzler **Metternich** ordnete Europa neu: Wiederherstellung der Fürstenherrschaft (**Restauration**) und Gleichgewicht der Großmächte. Einen deutschen Nationalstaat gab es nicht — stattdessen den **[[deutscher-bund|Deutschen Bund]]**, einen lockeren Bund souveräner Fürsten mit einem Gesandtenkongress in Frankfurt. Preußen gewann das Rheinland und Westfalen und rückte damit nach Westen.[^wp-wiener-kongress]`,
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
