export default {
  id: 'reformation',
  title: 'Reformation & Dreißigjähriger Krieg',
  summary: 'Wie ein Mönch aus Wittenberg die Kirche spaltete, warum der Buchdruck dabei entscheidend war — und wie aus dem Glaubensstreit die größte Katastrophe der frühen Neuzeit wurde.',
  minutes: 22,
  goals: [
    'Die [[reformation]] datieren und Luthers zentrale Ideen erklären',
    'Die Rolle des [[buchdruck|Buchdrucks]] für die Verbreitung verstehen',
    'Den [[augsburger-religionsfriede|Augsburger Religionsfrieden]] und „cuius regio, eius religio" erklären',
    'Ursachen, Verlauf und Folgen des [[dreissigjaehriger-krieg|Dreißigjährigen Krieges]] und des [[westfaelischer-friede|Westfälischen Friedens]] nennen',
  ],
  blocks: [
    {
      id: 'buchdruck', type: 'text', title: 'Vorspiel: eine Medienrevolution',
      md: `
Um **1450** entwickelte **Johannes Gutenberg** in **Mainz** den [[buchdruck|Buchdruck mit beweglichen Lettern]]. Statt Bücher mühsam abzuschreiben, konnte man nun Hunderte identische Exemplare herstellen. Die **Gutenberg-Bibel** (um 1454) gilt als erstes großes gedrucktes Buch Europas.

Ohne diese Erfindung wäre die Reformation vermutlich eine lokale Episode geblieben: Luthers Flugschriften erreichten innerhalb weniger Wochen das ganze Reich.`,
    },
    {
      id: 'luther', type: 'text', title: '1517: Luthers Thesen',
      md: `
Die Kirche finanzierte u. a. den Neubau des Petersdoms durch den **Ablasshandel**: Gegen Geld sollten Sündenstrafen im Fegefeuer erlassen werden — der Dominikaner Johann Tetzel warb angeblich mit „Wenn das Geld im Kasten klingt, die Seele aus dem Fegefeuer springt".

Der Augustinermönch und Theologieprofessor **Martin Luther** (1483–1546) veröffentlichte am **31. Oktober 1517** in **Wittenberg** seine **95 Thesen** gegen den Ablass. Ob er sie tatsächlich an die Tür der Schlosskirche schlug, ist unter Historikern umstritten; der 31. Oktober ist bis heute **Reformationstag**.

Luthers Kernideen:
- **Allein durch Glauben** (*sola fide*) und allein durch Gottes **Gnade** wird der Mensch gerettet — nicht durch gute Werke oder Ablass.
- **Allein die Schrift** (*sola scriptura*): Die Bibel steht über Papst und Konzilien.
- **Priestertum aller Gläubigen**: Kein besonderer Priesterstand vermittelt zwischen Mensch und Gott.[^wp-reformation]`,
    },
    {
      id: 'video-luther', type: 'video', youtube: 'At3W6lniGNE', label: 'Martin Luther und die Reformation', channel: 'musstewissen Geschichte | Terra X',
    },
    {
      id: 'worms', type: 'text', title: 'Worms, Wartburg und die deutsche Bibel',
      md: `
Der Papst bannte Luther 1521. Auf dem **Reichstag zu Worms 1521** weigerte er sich vor Kaiser **Karl V.** zu widerrufen; das **Wormser Edikt** verhängte die Reichsacht über ihn. Sein Landesherr, Kurfürst Friedrich der Weise von Sachsen, ließ ihn zum Schein entführen und auf der **Wartburg** bei Eisenach verstecken. Dort übersetzte Luther in nur elf Wochen das **Neue Testament** ins Deutsche (erschienen 1522); die vollständige Bibel folgte 1534. Seine Übersetzung prägte die deutsche Schriftsprache nachhaltig.

Die Reformation blieb nicht bei Luther: **Ulrich Zwingli** (Zürich) und **Johannes Calvin** (Genf) gründeten eigene Richtungen. Und sie hatte soziale Sprengkraft: Im **Bauernkrieg 1524/25** beriefen sich aufständische Bauern auf die „Freiheit eines Christenmenschen" — Luther stellte sich scharf gegen sie; der Aufstand wurde blutig niedergeschlagen.`,
    },
    {
      id: 'fact-sprache', type: 'callout', tone: 'fact', title: 'Luther als Wortschöpfer',
      md: `Viele Wörter und Redewendungen verdanken wir Luthers Bibel oder er machte sie populär: „**Lückenbüßer**", „**Feuereifer**", „**Machtwort**", „sein Licht unter den Scheffel stellen", „ein Buch mit sieben Siegeln". Er wollte „dem Volk aufs Maul schauen" — verständliches Deutsch statt Kirchenlatein.`,
    },
    {
      id: 'augsburg', type: 'text', title: 'Ein Kompromiss auf Zeit: Augsburg 1555',
      md: `
Nach Jahrzehnten des Streits einigten sich Kaiser und Reichsstände im **[[augsburger-religionsfriede|Augsburger Religionsfrieden]] 1555**: Lutherische und katholische Landesherren wurden gleichberechtigt. Jeder Fürst bestimmte die Konfession seines Landes — später auf die Formel **„cuius regio, eius religio"** gebracht („wessen Gebiet, dessen Religion"). Untertanen anderer Konfession durften auswandern.

Zwei Probleme blieben: **Calvinisten** waren nicht einbezogen, und die Frage der geistlichen Fürstentümer blieb umstritten. Das Reich spaltete sich in konfessionelle Lager (Protestantische **Union** 1608, Katholische **Liga** 1609).`,
    },
    {
      id: 'krieg', type: 'text', title: '1618–1648: der Dreißigjährige Krieg',
      md: `
Am **23. Mai 1618** warfen protestantische böhmische Adlige zwei kaiserliche Statthalter aus einem Fenster der Prager Burg — der **Prager Fenstersturz** (die Opfer überlebten). Aus dem böhmischen Aufstand wurde ein europäischer Krieg, der vor allem auf deutschem Boden ausgetragen wurde:

1. **Böhmisch-Pfälzischer Krieg** — der Kaiser siegt 1620 am Weißen Berg.
2. **Dänisch-Niedersächsischer Krieg** — kaiserliche Feldherren **Tilly** und **Wallenstein** siegen.
3. **Schwedischer Krieg** — **Gustav II. Adolf** von Schweden greift ein und fällt 1632 bei Lützen; Wallenstein wird 1634 ermordet.
4. **Schwedisch-Französischer Krieg** — das katholische Frankreich kämpft gegen den katholischen Kaiser: Es geht längst um Macht, nicht nur um Glauben.

Söldnerheere lebten vom Land, Seuchen und Hunger folgten ihnen. Die Zerstörung **Magdeburgs 1631** wurde zum Sinnbild. Schätzungen zufolge verlor das Reich etwa ein Drittel seiner Bevölkerung, manche Regionen mehr als die Hälfte.[^wp-dreissigjaehriger-krieg]`,
    },
    {
      id: 'westfalen', type: 'text', title: '1648: der Westfälische Friede',
      md: `
Nach jahrelangen Verhandlungen in **Münster** und **Osnabrück** endete der Krieg mit dem **[[westfaelischer-friede|Westfälischen Frieden]] 1648**:
- Der **Calvinismus** wird als dritte Konfession anerkannt.
- Die Reichsstände erhalten weitgehende Souveränität — der Kaiser verliert an Macht, das Reich bleibt ein lockerer Verband.
- Die **Niederlande** und die **Schweiz** scheiden endgültig aus dem Reich aus.
- **Frankreich** und **Schweden** gewinnen Gebiete (u. a. Teile des Elsass bzw. Vorpommern).

Der Friede gilt als Beginn eines europäischen Systems gleichberechtigter souveräner Staaten.`,
    },
    {
      id: 'timeline-reformation', type: 'game', viz: 'timeline', title: 'Reformation und Krieg — in welcher Reihenfolge?',
      params: {
        mode: 'sort',
        events: [
          { year: 1454, label: 'Gutenberg-Bibel' },
          { year: 1517, label: '95 Thesen' },
          { year: 1521, label: 'Reichstag zu Worms' },
          { year: 1525, label: 'Bauernkrieg' },
          { year: 1555, label: 'Augsburger Religionsfriede' },
          { year: 1618, label: 'Prager Fenstersturz' },
          { year: 1631, label: 'Zerstörung Magdeburgs' },
          { year: 1648, label: 'Westfälischer Friede' },
        ],
      },
    },
    {
      id: 'quiz-luther', type: 'quiz', title: 'Luthers Lehre',
      question: 'Welche Aussagen gehören zu Luthers reformatorischer Lehre?',
      options: [
        { text: 'Der Mensch wird allein durch Glauben und Gottes Gnade gerettet.', correct: true, why: '*Sola fide* und *sola gratia* — der Kern seiner Lehre.' },
        { text: 'Die Bibel ist die höchste Autorität im Glauben.', correct: true, why: '*Sola scriptura* — deshalb übersetzte er sie ins Deutsche.' },
        { text: 'Mit dem Kauf von Ablassbriefen kann man Sündenstrafen verkürzen.', correct: false, why: 'Genau dagegen richteten sich die 95 Thesen.' },
        { text: 'Alle Getauften haben direkten Zugang zu Gott.', correct: true, why: 'Das „Priestertum aller Gläubigen".' },
        { text: 'Aufständische Bauern haben das Recht, ihre Herren zu stürzen.', correct: false, why: 'Luther verurteilte den Bauernkrieg scharf („Wider die räuberischen und mörderischen Rotten der Bauern").' },
      ],
    },
    {
      id: 'match-reformer', type: 'match', title: 'Personen der Reformationszeit',
      pairs: [
        ['Martin Luther', '95 Thesen, Wittenberg'],
        ['Johannes Calvin', 'Reformator in Genf'],
        ['Ulrich Zwingli', 'Reformator in Zürich'],
        ['Karl V.', 'Kaiser auf dem Reichstag zu Worms'],
        ['Gustav II. Adolf', 'Schwedenkönig, gefallen bei Lützen'],
        ['Wallenstein', 'kaiserlicher Feldherr, 1634 ermordet'],
      ],
    },
    {
      id: 'recall-cuius', type: 'recall', title: 'Cuius regio, eius religio',
      prompt: 'Was bedeutet „cuius regio, eius religio" — und warum löste der Augsburger Religionsfrieden die Konflikte nicht dauerhaft?',
      answer: `„Wessen Gebiet, dessen Religion": Seit **1555** bestimmte der **Landesherr** die Konfession seines Territoriums, Andersgläubige durften auswandern. Der Frieden erkannte aber nur **Lutheraner und Katholiken** an — die **Calvinisten** blieben ausgeschlossen, und Streitfragen (z. B. geistliche Territorien) blieben offen. Die konfessionellen Lager rüsteten auf (Union, Liga), bis der Prager Fenstersturz 1618 den **Dreißigjährigen Krieg** auslöste.`,
      hints: ['Wer entscheidet über die Konfession?', 'Welche Konfession fehlte?'],
      cards: ['cuius-regio', 'augsburg-luecke'],
    },
  ],
  cards: [
    { id: 'thesen-datum', front: 'Wann und wo veröffentlichte Luther seine 95 Thesen?', back: 'Am **31. Oktober 1517** in **Wittenberg** (heute Reformationstag).' },
    { id: 'thesen-inhalt', front: 'Wogegen richteten sich Luthers 95 Thesen?', back: 'Gegen den **Ablasshandel**.' },
    { id: 'sola', front: 'Nenne zwei Grundprinzipien der lutherischen Reformation.', back: 'z. B. **sola fide** (allein durch Glauben), **sola scriptura** (allein die Schrift), sola gratia, Priestertum aller Gläubigen.' },
    { id: 'gutenberg', front: 'Wer erfand um 1450 den Buchdruck mit beweglichen Lettern — und wo?', back: '**Johannes Gutenberg** in **Mainz**.' },
    { id: 'worms-1521', front: 'Was geschah auf dem Reichstag zu Worms 1521?', back: 'Luther weigerte sich vor Kaiser **Karl V.** zu widerrufen; das Wormser Edikt verhängte die **Reichsacht**.' },
    { id: 'wartburg', front: 'Was tat Luther auf der Wartburg?', back: 'Er übersetzte das **Neue Testament** ins Deutsche (erschienen 1522).' },
    { id: 'bauernkrieg', front: 'Wann war der Bauernkrieg, und wie stand Luther dazu?', back: '**1524/25**; Luther verurteilte die Aufständischen scharf.' },
    { id: 'calvin-zwingli', front: 'Welche Reformatoren wirkten in Genf und Zürich?', back: 'Genf: **Johannes Calvin**; Zürich: **Ulrich Zwingli**.' },
    { id: 'augsburg-1555', front: 'Was regelte der Augsburger Religionsfrieden von 1555?', back: 'Gleichberechtigung von Lutheranern und Katholiken; der **Landesherr bestimmt die Konfession**.' },
    { id: 'cuius-regio', front: 'Übersetze „cuius regio, eius religio".', back: '„**Wessen Gebiet, dessen Religion**."' },
    { id: 'augsburg-luecke', front: 'Welche Konfession war 1555 nicht anerkannt?', back: 'Die **Calvinisten** (Reformierten) — erst 1648 anerkannt.' },
    { id: 'fenstersturz', front: 'Welches Ereignis löste 1618 den Dreißigjährigen Krieg aus?', back: 'Der **Prager Fenstersturz** (23. Mai 1618).' },
    { id: 'gustav-adolf', front: 'Welcher König griff im Dreißigjährigen Krieg ein und fiel 1632 bei Lützen?', back: '**Gustav II. Adolf** von Schweden.' },
    { id: 'westfalen-orte', front: 'Wo wurde der Westfälische Friede 1648 geschlossen?', back: 'In **Münster** und **Osnabrück**.' },
    { id: 'westfalen-folgen', front: 'Nenne drei Folgen des Westfälischen Friedens.', back: 'Calvinismus anerkannt; Reichsstände fast souverän; Niederlande und Schweiz scheiden aus dem Reich aus; Gebietsgewinne für Frankreich und Schweden.' },
    { id: 'krieg-verluste', front: 'Wie groß waren die Bevölkerungsverluste im Dreißigjährigen Krieg (Schätzung)?', back: 'Etwa **ein Drittel** der Bevölkerung des Reiches, regional über die Hälfte.' },
  ],
};
