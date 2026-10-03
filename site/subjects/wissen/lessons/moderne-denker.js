export default {
  id: 'moderne-denker',
  title: 'Moderne Denker',
  summary: 'Von Hegel bis Habermas: Die Philosophen des 19. und 20. Jahrhunderts fragten nach Geschichte und Gesellschaft, nach dem Unbewussten, nach Freiheit — und danach, wie das Böse möglich wurde.',
  minutes: 24,
  goals: [
    'Hegels [[dialektik|Dialektik]] und Marx’ [[historischer-materialismus|historischen Materialismus]] in Grundzügen erklären',
    'Nietzsches „Gott ist tot“, [[nihilismus|Nihilismus]] und [[uebermensch|Übermensch]] einordnen',
    'Freuds [[psychoanalyse|Psychoanalyse]] und den [[existenzialismus|Existenzialismus]] beschreiben',
    'Hannah Arendts [[banalitaet-des-boesen|„Banalität des Bösen“]] und Habermas’ Diskursidee wiedergeben',
  ],
  blocks: [
    {
      id: 'hegel-marx', type: 'text', title: 'Hegel und Marx: Geschichte hat eine Richtung',
      md: `
**[Georg Wilhelm Friedrich Hegel](wiki:Georg Wilhelm Friedrich Hegel|Georg Wilhelm Friedrich Hegel)** (1770–1831) sah die Geschichte als Entwicklung des Geistes hin zur Freiheit. Ihr Motor ist die **[[dialektik|Dialektik]]**: Jeder Zustand bringt seinen Gegensatz hervor, und aus dem Konflikt entsteht etwas Neues, das beide Seiten „aufhebt“ — im dreifachen Sinn von bewahren, beenden und auf eine höhere Stufe heben. (Das bekannte Schema „These – Antithese – Synthese“ stammt übrigens nicht von Hegel selbst.) Hauptwerk: *[Phänomenologie des Geistes](wiki:Phänomenologie des Geistes|The Phenomenology of Spirit)* (1807).

**[Karl Marx](wiki:Karl Marx|Karl Marx)** (1818–1883) stellte Hegel „vom Kopf auf die Füße“: Nicht Ideen, sondern **wirtschaftliche Verhältnisse** bestimmen die Geschichte — der **[[historischer-materialismus|historische Materialismus]]**. „Die Geschichte aller bisherigen Gesellschaft ist die Geschichte von Klassenkämpfen“, heißt es im *[Kommunistischen Manifest](wiki:Manifest der Kommunistischen Partei|The Communist Manifesto)* (1848, mit [Friedrich Engels](wiki:Friedrich Engels|Friedrich Engels)). Im Kapitalismus beuten die Besitzer der Fabriken ([Bourgeoisie](wiki:Bourgeoisie|Bourgeoisie)) die Arbeiter ([Proletariat](wiki:Proletariat|Proletariat)) aus; Marx erwartete eine Revolution und eine klassenlose Gesellschaft. Hauptwerk: *[Das Kapital](wiki:Das Kapital|Das Kapital)* (Band 1, 1867).[^sep-marx]

Marx’ Ideen wurden im 20. Jahrhundert zur Grundlage kommunistischer Diktaturen — ob zu Recht oder als Missbrauch, ist bis heute umstritten. Als Analytiker von Wirtschaftskrisen und Globalisierung wird er weiterhin gelesen.`,
    },
    {
      id: 'nietzsche', type: 'text', title: 'Nietzsche: Gott ist tot',
      md: `
**[Friedrich Nietzsche](wiki:Friedrich Nietzsche|Friedrich Nietzsche)** (1844–1900) schrieb in *[Die fröhliche Wissenschaft](wiki:Die fröhliche Wissenschaft|The Gay Science)* (1882) den berühmten Satz „**[Gott ist tot](wiki:Gott ist tot|Friedrich Nietzsche)**“. Gemeint ist keine Aussage über Gott, sondern eine Diagnose: Der Glaube hat in der modernen Gesellschaft seine verbindliche Kraft verloren. Damit droht der **[[nihilismus|Nihilismus]]** — das Gefühl, dass nichts mehr Sinn und Wert hat.

Nietzsches Antwort: Der Mensch muss eigene Werte schaffen („Umwertung aller Werte“). Das Leitbild dafür ist der **[[uebermensch|Übermensch]]** aus *[Also sprach Zarathustra](wiki:Also sprach Zarathustra|Thus Spoke Zarathustra)* (1883–1885). Er kritisierte die christliche Moral als „Sklavenmoral“ und sprach vom „Willen zur Macht“.[^sep-nietzsche]`,
    },
    {
      id: 'warn-nietzsche', type: 'callout', tone: 'warning', title: 'Missbrauchte Begriffe',
      md: `Nietzsches Schwester [Elisabeth Förster-Nietzsche](wiki:Elisabeth Förster-Nietzsche|Elisabeth Förster-Nietzsche) verwaltete seinen Nachlass und stellte ihn in den Dienst des Nationalsozialismus; Begriffe wie „Übermensch“ wurden rassistisch umgedeutet. Nietzsche selbst verachtete Antisemitismus und deutschen Nationalismus ausdrücklich.`,
    },
    {
      id: 'freud', type: 'text', title: 'Freud: Der Mensch ist nicht Herr im eigenen Haus',
      md: `
Der Wiener Arzt **[Sigmund Freud](wiki:Sigmund Freud|Sigmund Freud)** (1856–1939) begründete die **[[psychoanalyse|Psychoanalyse]]**. Seine These: Vieles in unserem Denken und Handeln wird vom **Unbewussten** gesteuert — von verdrängten Wünschen und Erfahrungen, die sich in Träumen, Versprechern („Freud’scher Versprecher“) und Symptomen zeigen. *[Die Traumdeutung](wiki:Die Traumdeutung|The Interpretation of Dreams)* erschien Ende 1899, auf 1900 vordatiert.

Die Psyche teilte er in drei Instanzen: das **Es** (Triebe), das **Über-Ich** (verinnerlichte Moral) und das **Ich**, das zwischen beiden und der Realität vermittelt. Viele Einzelthesen Freuds gelten heute als überholt, aber die Idee des Unbewussten und die „Redekur“ prägen Psychotherapie und Kultur bis heute. Freud musste 1938 als Jude vor den Nationalsozialisten nach London fliehen.`,
    },
    {
      id: 'zwanzigstes', type: 'text', title: 'Das 20. Jahrhundert: Freiheit, Sprache, Verantwortung',
      md: `
- **[Ludwig Wittgenstein](wiki:Ludwig Wittgenstein|Ludwig Wittgenstein)** untersuchte die Grenzen der Sprache. Sein *[Tractatus](wiki:Tractatus logico-philosophicus|Tractatus Logico-Philosophicus)* (1921) endet mit dem Satz: „Wovon man nicht sprechen kann, darüber muss man schweigen.“
- **[Martin Heidegger](wiki:Martin Heidegger|Martin Heidegger)** fragte in *[Sein und Zeit](wiki:Sein und Zeit|Being and Time)* (1927) nach dem Sinn von Sein — und diskreditierte sich durch sein Engagement für den Nationalsozialismus.
- **[Jean-Paul Sartre](wiki:Jean-Paul Sartre|Jean-Paul Sartre)** begründete den **[[existenzialismus|Existenzialismus]]**: „Die Existenz geht der Essenz voraus.“ Der Mensch ist nicht durch eine vorgegebene Natur bestimmt, sondern „zur Freiheit verurteilt“ — und für sein Handeln voll verantwortlich.
- **[Simone de Beauvoir](wiki:Simone de Beauvoir|Simone de Beauvoir)** schrieb in *[Das andere Geschlecht](wiki:Das andere Geschlecht|The Second Sex)* (1949): „Man wird nicht als Frau geboren, man wird es.“ Das Buch wurde zu einem Grundtext des Feminismus.
- **[Karl Popper](wiki:Karl Popper|Karl Popper)** zeigte, dass wissenschaftliche Theorien nie endgültig bewiesen, aber **widerlegt** (falsifiziert) werden können, und verteidigte die „offene Gesellschaft“ (1945).
- **[Theodor W. Adorno](wiki:Theodor W. Adorno|Theodor W. Adorno)** und **[Max Horkheimer](wiki:Max Horkheimer|Max Horkheimer)** ([Frankfurter Schule](wiki:Frankfurter Schule|Frankfurt School)) analysierten in der *[Dialektik der Aufklärung](wiki:Dialektik der Aufklärung|Dialectic of Enlightenment)* (1944/1947), wie Vernunft in Herrschaft und Barbarei umschlagen kann.`,
    },
    {
      id: 'arendt-habermas', type: 'text', title: 'Arendt und Habermas',
      md: `
**[Hannah Arendt](wiki:Hannah Arendt|Hannah Arendt)** (1906–1975), als Jüdin aus Deutschland geflohen, untersuchte in *[Elemente und Ursprünge totaler Herrschaft](wiki:Elemente und Ursprünge totaler Herrschaft|The Origins of Totalitarianism)* (1951), wie Nationalsozialismus und Stalinismus möglich wurden. Als Reporterin beim Prozess gegen den NS-Organisator [Adolf Eichmann](wiki:Adolf Eichmann|Adolf Eichmann) in Jerusalem prägte sie 1963 die Formel von der **[[banalitaet-des-boesen|Banalität des Bösen]]**: Eichmann war kein Dämon, sondern ein gedankenloser Bürokrat, der Karriere machen wollte. Das Böse braucht keine Monster — Gedankenlosigkeit genügt.[^sep-arendt]

**[Jürgen Habermas](wiki:Jürgen Habermas|Jürgen Habermas)** (geb. 1929), der bekannteste lebende deutsche Philosoph, entwickelte die Theorie des **[kommunikativen Handelns](wiki:Theorie des kommunikativen Handelns|The Theory of Communicative Action)** (1981): Demokratie lebt davon, dass Menschen in einem möglichst herrschaftsfreien Diskurs mit Argumenten nach Verständigung suchen — der „zwanglose Zwang des besseren Arguments“.[^sep-habermas]`,
    },
    {
      id: 'map-denker-moderne', type: 'map', title: 'Wo die modernen Denker lebten und wirkten',
      view: [-6, 44, 20, 56],
      layers: { cities: false, countryLabels: false, mountains: false },
      places: [
        { name: 'Trier', pos: 'l', detail: `**[Trier](wiki:Trier|Trier)** — Geburtsstadt von [Karl Marx](wiki:Karl Marx|Karl Marx) (1818).` },
        { name: 'Berlin', pos: 'r', detail: `**[Berlin](wiki:Berlin|Berlin)** — [Hegel](wiki:Georg Wilhelm Friedrich Hegel|Georg Wilhelm Friedrich Hegel) lehrte hier ab 1818 und starb 1831 in der Stadt.` },
        { name: 'Wien', pos: 'r', detail: `**[Wien](wiki:Wien|Vienna)** — Wirkungsort von [Sigmund Freud](wiki:Sigmund Freud|Sigmund Freud) und Heimat von [Wittgenstein](wiki:Ludwig Wittgenstein|Ludwig Wittgenstein) und [Popper](wiki:Karl Popper|Karl Popper).` },
        { name: 'Frankfurt am Main', pos: 'r', detail: `**[Frankfurt am Main](wiki:Frankfurt am Main|Frankfurt)** — Sitz der [Frankfurter Schule](wiki:Frankfurter Schule|Frankfurt School) um [Adorno](wiki:Theodor W. Adorno|Theodor W. Adorno) und [Horkheimer](wiki:Max Horkheimer|Max Horkheimer), später von [Jürgen Habermas](wiki:Jürgen Habermas|Jürgen Habermas).` },
        { name: 'Freiburg im Breisgau', pos: 'l', detail: `**[Freiburg](wiki:Freiburg im Breisgau|Freiburg im Breisgau)** — Lehrstuhl von [Martin Heidegger](wiki:Martin Heidegger|Martin Heidegger).` },
        { name: 'Paris', pos: 'l', detail: `**[Paris](wiki:Paris|Paris)** — [Jean-Paul Sartre](wiki:Jean-Paul Sartre|Jean-Paul Sartre) und [Simone de Beauvoir](wiki:Simone de Beauvoir|Simone de Beauvoir) prägten hier den Existenzialismus; auch [Hannah Arendt](wiki:Hannah Arendt|Hannah Arendt) fand 1933 hier Zuflucht.` },
        { name: 'London', pos: 'l', detail: `**[London](wiki:London|London)** — Exil von Karl Marx (ab 1849) und Sigmund Freud (ab 1938).` },
        { name: 'Basel', pos: 'l', detail: `**[Basel](wiki:Basel|Basel)** — [Friedrich Nietzsche](wiki:Friedrich Nietzsche|Friedrich Nietzsche) lehrte hier 1869–1879.` },
      ],
      points: [
        { lon: 12.116, lat: 51.241, label: 'Röcken', pos: 'r', detail: `**[Röcken](wiki:Röcken|Röcken)** — Geburtsort Nietzsches (1844) und sein Grab.` },
      ],
      caption: 'Viele deutsche Denker mussten im 20. Jahrhundert vor den Nationalsozialisten fliehen — nach London, Paris oder in die USA.',
    },
    {
      id: 'tl-game', type: 'game', viz: 'timeline', title: 'Hauptwerke ordnen',
      params: { mode: 'sort', events: [
        { year: 1807, label: 'Phänomenologie des Geistes' },
        { year: 1848, label: 'Kommunist. Manifest' },
        { year: 1867, label: 'Das Kapital (Bd. 1)' },
        { year: 1883, label: 'Also sprach Zarathustra' },
        { year: 1900, label: 'Die Traumdeutung' },
        { year: 1927, label: 'Sein und Zeit' },
        { year: 1949, label: 'Das andere Geschlecht' },
        { year: 1963, label: 'Eichmann in Jerusalem' },
      ] },
    },
    {
      id: 'match-zitate', type: 'match', title: 'Wer sagte das?',
      pairs: [
        ['„Gott ist tot.“', 'Nietzsche'],
        ['„Die Geschichte aller bisherigen Gesellschaft ist die Geschichte von Klassenkämpfen.“', 'Marx und Engels'],
        ['„Man wird nicht als Frau geboren, man wird es.“', 'Simone de Beauvoir'],
        ['„Wovon man nicht sprechen kann, darüber muss man schweigen.“', 'Wittgenstein'],
        ['„Banalität des Bösen“', 'Hannah Arendt'],
        ['Es, Ich und Über-Ich', 'Sigmund Freud'],
      ],
    },
    {
      id: 'quiz-gott', type: 'quiz', title: 'Was meinte Nietzsche?',
      question: 'Was meint Nietzsches Satz „Gott ist tot“?',
      options: [
        { text: 'Der Glaube an Gott hat in der modernen Kultur seine verbindliche Kraft verloren.', correct: true, why: 'Eine kulturelle Diagnose — mit der Gefahr des Nihilismus.' },
        { text: 'Eine wissenschaftlich bewiesene Tatsache über Gott.', correct: false, why: 'Nietzsche beschreibt einen Wandel der Kultur, keinen Beweis.' },
        { text: 'Ein Aufruf zur Gewalt gegen Kirchen.', correct: false, why: 'Davon ist nirgends die Rede.' },
        { text: 'Eine Aussage über den Tod Jesu am Kreuz.', correct: false, why: 'Der Satz handelt von der modernen Gesellschaft.' },
      ],
    },
    {
      id: 'quiz-existenz', type: 'quiz', title: 'Existenzialismus',
      question: 'Was bedeutet Sartres Satz „Die Existenz geht der Essenz voraus“?',
      options: [
        { text: 'Der Mensch ist zuerst einfach da und bestimmt erst durch sein Handeln, was er ist.', correct: true, why: 'Es gibt kein festes „Wesen“, das vorab festlegt, wer wir sind — daher auch volle Verantwortung.' },
        { text: 'Essen ist wichtiger als Denken.', correct: false, why: 'Ein beliebtes Wortspiel, aber *Essenz* heißt „Wesen“.' },
        { text: 'Gott hat jedem Menschen ein festes Wesen gegeben.', correct: false, why: 'Genau das bestreitet Sartre.' },
      ],
    },
    {
      id: 'recall-arendt', type: 'recall', title: 'Die Banalität des Bösen',
      prompt: 'Was meinte Hannah Arendt mit der „Banalität des Bösen“ — und warum ist der Gedanke bis heute aktuell?',
      answer: `Beim Eichmann-Prozess 1961 erlebte Arendt keinen dämonischen Fanatiker, sondern einen **gedankenlosen Funktionär**, der Befehle ausführte und Karriere machen wollte. Ungeheure Verbrechen wie der Holocaust wurden also auch von „normalen“ Menschen begangen, die **nicht selbst dachten** und keine Verantwortung übernahmen. Aktuell ist das, weil es zeigt: Schutz vor Unrecht braucht nicht nur Gesetze, sondern Menschen, die **urteilen und widersprechen** — auch in Behörden, Firmen und Befehlsketten. „Banal“ heißt dabei nicht harmlos, sondern gewöhnlich.`,
      cards: ['arendt-banalitaet', 'arendt-werke'],
    },
  ],
  cards: [
    { id: 'hegel-dialektik', front: 'Was ist Hegels Dialektik?', back: 'Entwicklung durch Gegensätze: Jeder Zustand erzeugt seinen Widerspruch, der in etwas Höherem „aufgehoben“ wird.' },
    { id: 'hegel-werk', front: 'Hegels Hauptwerk von 1807?', back: '„Phänomenologie des Geistes“.' },
    { id: 'marx-werke', front: 'Zwei Hauptwerke von Karl Marx?', back: '„Das Kommunistische Manifest“ (1848, mit Engels) und „Das Kapital“ (Bd. 1, 1867).' },
    { id: 'hist-mat', front: 'Kern des historischen Materialismus?', back: 'Wirtschaftliche Verhältnisse und Klassenkämpfe bestimmen den Lauf der Geschichte.' },
    { id: 'klassen', front: 'Bourgeoisie und Proletariat bei Marx?', back: 'Bourgeoisie: Besitzer der Produktionsmittel; Proletariat: Arbeiter, die nur ihre Arbeitskraft verkaufen können.' },
    { id: 'nietzsche-gott', front: 'In welchem Werk steht „Gott ist tot“ — und was meint es?', back: '„Die fröhliche Wissenschaft“ (1882); der Glaube hat seine verbindliche Kraft verloren.' },
    { id: 'uebermensch', front: 'Was ist Nietzsches „Übermensch“?', back: 'Leitbild aus „Also sprach Zarathustra“: ein Mensch, der nach dem Ende alter Werte eigene Werte schafft.' },
    { id: 'nihilismus', front: 'Was bedeutet Nihilismus?', back: 'Die Überzeugung, dass es keine verbindlichen Werte oder keinen Sinn gibt.' },
    { id: 'freud-instanzen', front: 'Freuds drei Instanzen der Psyche?', back: 'Es (Triebe), Ich (Vermittler), Über-Ich (Gewissen, Moral).' },
    { id: 'freud-traum', front: 'Freuds grundlegendes Werk von 1899/1900?', back: '„Die Traumdeutung“.' },
    { id: 'wittgenstein', front: 'Letzter Satz von Wittgensteins „Tractatus“?', back: '„Wovon man nicht sprechen kann, darüber muss man schweigen.“' },
    { id: 'sartre', front: 'Kernsatz des Existenzialismus (Sartre)?', back: '„Die Existenz geht der Essenz voraus“ — der Mensch ist zur Freiheit verurteilt.' },
    { id: 'beauvoir', front: 'Simone de Beauvoir: Werk und berühmter Satz?', back: '„Das andere Geschlecht“ (1949): „Man wird nicht als Frau geboren, man wird es.“' },
    { id: 'popper', front: 'Wofür steht Karl Popper?', back: 'Falsifikation (Theorien können widerlegt, nie endgültig bewiesen werden) und die „offene Gesellschaft“.' },
    { id: 'frankfurter-schule', front: 'Hauptwerk von Adorno und Horkheimer?', back: '„Dialektik der Aufklärung“ (1944/1947) — Frankfurter Schule.' },
    { id: 'arendt-banalitaet', front: 'Was meint die „Banalität des Bösen“?', back: 'Hannah Arendt (1963): Ungeheure Verbrechen können von gedankenlosen, gewöhnlichen Funktionären begangen werden (Eichmann).' },
    { id: 'arendt-werke', front: 'Zwei Werke Hannah Arendts?', back: '„Elemente und Ursprünge totaler Herrschaft“ (1951), „Eichmann in Jerusalem“ (1963).' },
    { id: 'habermas', front: 'Wofür steht Jürgen Habermas?', back: 'Theorie des kommunikativen Handelns (1981): Verständigung im herrschaftsfreien Diskurs, „zwangloser Zwang des besseren Arguments“.' },
  ],
};
