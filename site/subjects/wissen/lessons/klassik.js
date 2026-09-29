export default {
  id: 'klassik',
  title: 'Aufklärung, Sturm und Drang & Klassik',
  summary: 'In nur achtzig Jahren entsteht, was bis heute als Kern der deutschen Literatur gilt: Lessings Toleranzdrama, Goethes *Werther* und *Faust*, Schillers *Räuber* und *Tell* — und eine kleine Stadt namens Weimar wird zum Zentrum des Geisteslebens.',
  minutes: 22,
  goals: [
    'Die drei Epochen [[literarische-aufklaerung|Aufklärung]], [[sturm-und-drang|Sturm und Drang]] und [[weimarer-klassik|Weimarer Klassik]] zeitlich einordnen und unterscheiden',
    'Die wichtigsten Werke von Lessing, Goethe und Schiller ihren Autoren zuordnen',
    'Berühmte Zitate aus dem [[faust|Faust]] wiedererkennen',
    'Erklären, worum es in der [[ringparabel|Ringparabel]] geht',
  ],
  blocks: [
    {
      id: 'aufklaerung', type: 'text', title: 'Aufklärung: Vernunft auf der Bühne',
      md: `
Im 18. Jahrhundert setzt sich in Europa eine Überzeugung durch: Der Mensch soll **selbst denken**, statt Kirche, Fürsten oder Tradition blind zu folgen. Immanuel Kant bringt es 1784 auf die berühmte Formel: „Aufklärung ist der Ausgang des Menschen aus seiner selbstverschuldeten Unmündigkeit.“ Sein Motto: *Sapere aude!* — „Habe Mut, dich deines eigenen Verstandes zu bedienen!“

Für die Literatur der [[literarische-aufklaerung|Aufklärung]] (etwa 1720–1785) heißt das: Theater soll **erziehen** — zu Vernunft, Tugend und Toleranz. Ihr wichtigster deutscher Dichter ist **Gotthold Ephraim Lessing** (1729–1781):[^wp-lessing]

- *Minna von Barnhelm* (1767) — eine der ersten großen deutschen Komödien
- *Emilia Galotti* (1772) — ein bürgerliches Trauerspiel gegen fürstliche Willkür
- *Nathan der Weise* (1779) — das große Toleranzdrama mit der [[ringparabel|Ringparabel]]

In der Ringparabel fragt Sultan Saladin den jüdischen Kaufmann Nathan, welche Religion die wahre sei. Nathan antwortet mit einem Gleichnis von drei Ringen, die sich nicht unterscheiden lassen: Keine Religion kann ihren Wahrheitsanspruch beweisen — jede soll sich durch **Menschlichkeit** bewähren.[^wp-aufklaerung-lit]`,
    },
    {
      id: 'sturm', type: 'text', title: 'Sturm und Drang: Gefühl statt Regeln',
      md: `
Um 1770 rebellieren junge Autoren gegen die kühle Vernunft ihrer Väter. Sie feiern **Gefühl, Leidenschaft, Natur** und das **Originalgenie**, das keine Regeln braucht. Den Namen bekam die Bewegung von einem Drama Friedrich Maximilian Klingers (1776).[^wp-sturm-und-drang]

- **Johann Wolfgang Goethe** (1749–1832) wird 1774 mit *Die Leiden des jungen Werthers* über Nacht berühmt — ein Briefroman über unglückliche Liebe, der ein regelrechtes „Werther-Fieber“ auslöst (junge Männer kleiden sich in Werthers blauen Frack und gelbe Weste).[^wp-goethe]
- **Friedrich Schiller** (1759–1805) schreibt *Die Räuber* (1781), uraufgeführt 1782 in Mannheim: Karl Moor wird aus Enttäuschung zum Räuberhauptmann. Das Publikum tobt. Schiller muss aus Württemberg fliehen, weil der Herzog ihm das Schreiben verbietet.[^wp-schiller]`,
    },
    {
      id: 'klassik', type: 'text', title: 'Weimarer Klassik: das Maß finden',
      md: `
Aus den Stürmern werden Klassiker. Goethe zieht 1775 nach **Weimar** an den Hof von Herzog Carl August, bricht 1786 zu seiner prägenden **Italienreise** auf und kehrt mit einem neuen Ideal zurück: Harmonie, Maß und Humanität nach dem Vorbild der **griechischen Antike**. Ab 1794 verbindet ihn mit Schiller eine intensive Arbeitsfreundschaft — bis zu Schillers Tod 1805.[^wp-weimarer-klassik]

Hauptwerke der [[weimarer-klassik|Weimarer Klassik]]:

- Goethe: *Iphigenie auf Tauris* (Versfassung 1787), *Wilhelm Meisters Lehrjahre* (1795/96, der Urtyp des [[bildungsroman|Bildungsromans]]), **[[faust|Faust I]]** (1808)
- Schiller: die *Wallenstein*-Trilogie (1799), *Maria Stuart* (1800), *Wilhelm Tell* (1804), das Gedicht *An die Freude* (1785) — heute als Beethovens Vertonung die Europahymne
- Gemeinsam: das **Balladenjahr 1797** mit *Der Zauberlehrling* (Goethe), *Der Taucher* und *Der Handschuh* (Schiller) — die [[ballade]] als Wettbewerb unter Freunden

Das Goethe-Schiller-Denkmal vor dem Deutschen Nationaltheater in Weimar (1857) zeigt die beiden Seite an Seite — ein Symbol für die Kulturnation Deutschland, lange bevor es einen deutschen Staat gab.`,
    },
    {
      id: 'timeline-epochen', type: 'game', viz: 'timeline', title: 'Werke in die richtige Reihenfolge',
      params: {
        mode: 'sort',
        events: [
          { year: 1767, label: 'Minna von Barnhelm' },
          { year: 1774, label: 'Werther' },
          { year: 1779, label: 'Nathan der Weise' },
          { year: 1781, label: 'Die Räuber' },
          { year: 1797, label: 'Balladenjahr' },
          { year: 1804, label: 'Wilhelm Tell' },
          { year: 1808, label: 'Faust I' },
          { year: 1832, label: 'Faust II' },
        ],
      },
    },
    {
      id: 'match-werke', type: 'match', title: 'Worum geht es?',
      prompt: 'Ordne jedes Werk seinem Inhalt zu.',
      pairs: [
        ['Nathan der Weise (Lessing)', 'Ringparabel über religiöse Toleranz'],
        ['Emilia Galotti (Lessing)', 'Bürgerliches Trauerspiel gegen fürstliche Willkür'],
        ['Die Leiden des jungen Werthers (Goethe)', 'Briefroman über unglückliche Liebe'],
        ['Faust (Goethe)', 'Gelehrter wettet mit dem Teufel'],
        ['Die Räuber (Schiller)', 'Karl Moor wird Räuberhauptmann'],
        ['Wilhelm Tell (Schiller)', 'Schweizer Freiheitskampf gegen Landvogt Gessler'],
      ],
    },
    {
      id: 'faust', type: 'text', title: 'Faust — das deutsche Nationaldrama',
      md: `
An keinem Werk hat Goethe so lange gearbeitet wie am [[faust|Faust]]: rund sechzig Jahre. Der erste Teil erscheint 1808, der zweite 1832, kurz nach seinem Tod.[^wp-faust]

Der alte Gelehrte **Heinrich Faust** hat alles studiert und ist doch verzweifelt:

> Habe nun, ach! Philosophie, / Juristerei und Medizin, / Und leider auch Theologie / Durchaus studiert, mit heißem Bemühn. / Da steh ich nun, ich armer Tor! / Und bin so klug als wie zuvor.

Er schließt eine Wette mit dem Teufel **Mephisto**: Wenn Faust je zu einem Augenblick sagt „Verweile doch! du bist so schön!“, gehört seine Seele Mephisto. Es folgt die Liebesgeschichte mit **Gretchen**, die tragisch endet.

Viele Sätze aus dem *Faust* sind Alltagssprache geworden — oft ohne dass man die Quelle kennt:

- „Das also war des Pudels Kern!“ — als Mephisto sich aus einem Pudel verwandelt
- „Zwei Seelen wohnen, ach! in meiner Brust“
- „Nun sag, wie hast du's mit der Religion?“ — die **Gretchenfrage**
- „Grau, teurer Freund, ist alle Theorie, / Und grün des Lebens goldner Baum.“`,
    },
    {
      id: 'fact-werther', type: 'callout', tone: 'fact', title: 'Der Werther-Effekt',
      md: `Nach Erscheinen des *Werther* soll es Nachahmungs-Suizide gegeben haben; in Leipzig wurde das Buch zeitweise verboten. Die Medienforschung nennt das Phänomen, dass Berichte über Suizide Nachahmungen auslösen können, bis heute den **Werther-Effekt** — deshalb berichten seriöse Medien darüber zurückhaltend.`,
    },
    {
      id: 'quiz-epochen', type: 'quiz', title: 'Welche Epoche?',
      question: 'Ein Autor schreibt: Der Held folgt nur seinem Herzen, bricht alle Regeln, die Natur spiegelt seine Leidenschaft. Welche Epoche passt am besten?',
      options: [
        { text: 'Aufklärung', correct: false, why: 'Die Aufklärung setzt auf Vernunft und Belehrung, nicht auf ungezügelte Leidenschaft.' },
        { text: 'Sturm und Drang', correct: true, why: 'Genau: Gefühl, Genie und Rebellion gegen Regeln sind das Programm des Sturm und Drang.' },
        { text: 'Weimarer Klassik', correct: false, why: 'Die Klassik sucht Maß und Harmonie — der Held würde lernen, seine Leidenschaft zu bändigen.' },
      ],
    },
    {
      id: 'quiz-zitate', type: 'quiz', title: 'Zitate-Check',
      question: 'Welche dieser Zitate stammen aus Goethes *Faust*?',
      options: [
        { text: '„Das also war des Pudels Kern!“', correct: true, why: 'Faust I, Studierzimmer-Szene.' },
        { text: '„Nun sag, wie hast du\'s mit der Religion?“', correct: true, why: 'Gretchen fragt Faust — daher „Gretchenfrage“.' },
        { text: '„Durch diese hohle Gasse muss er kommen.“', correct: false, why: 'Das sagt Wilhelm Tell in Schillers gleichnamigem Drama, bevor er Gessler erschießt.' },
        { text: '„Sapere aude!“', correct: false, why: 'Das ist Kants Wahlspruch der Aufklärung (ursprünglich von Horaz).' },
      ],
    },
    {
      id: 'order-leben', type: 'order', title: 'Goethes Lebensstationen',
      prompt: 'Bringe die Stationen in Goethes Leben in die richtige Reihenfolge.',
      items: [
        'Geburt in Frankfurt am Main (1749)',
        '*Die Leiden des jungen Werthers* macht ihn berühmt (1774)',
        'Umzug nach Weimar an den Hof Carl Augusts (1775)',
        'Italienreise (1786–1788)',
        'Beginn der Freundschaft mit Schiller (1794)',
        '*Faust I* erscheint (1808)',
        'Tod in Weimar (1832)',
      ],
    },
    {
      id: 'goethe-alter', type: 'numeric', title: 'Kopfrechnen',
      question: 'Goethe wurde am 28. August 1749 geboren und starb am 22. März 1832. Wie alt wurde er?',
      answer: 82, tolerance: 0, unit: 'Jahre',
      explain: 'Er wurde 82 Jahre alt — seinen 83. Geburtstag hätte er im August 1832 gefeiert. Schiller dagegen starb schon mit 45 Jahren (1759–1805).',
    },
    {
      id: 'recall-epochen', type: 'recall', title: 'Erkläre den Unterschied',
      prompt: 'Worin unterscheiden sich **Sturm und Drang** und **Weimarer Klassik**? Nenne je ein typisches Werk.',
      answer: `Der **Sturm und Drang** (ca. 1765–1785) feiert Gefühl, Leidenschaft, Natur und das regelsprengende Genie; er rebelliert gegen Vernunftkult und Obrigkeit — z. B. Goethes *Werther* (1774) oder Schillers *Die Räuber* (1781). Die **Weimarer Klassik** (ca. 1786–1805) sucht dagegen Maß, Harmonie und Humanität nach antikem Vorbild; Gefühl und Vernunft sollen im Gleichgewicht sein — z. B. Goethes *Iphigenie auf Tauris* oder Schillers *Wilhelm Tell*. Interessant: Es sind dieselben Autoren, die sich vom Sturm-und-Drang-Rebellen zum Klassiker entwickelten.`,
      hints: ['Denk an Gefühl vs. Maß.', 'Goethe und Schiller waren in beiden Epochen aktiv.'],
      cards: ['sud-vs-klassik'],
    },
  ],
  cards: [
    { id: 'kant-aufklaerung', front: 'Kants Definition von Aufklärung (1784)?', back: '„Aufklärung ist der Ausgang des Menschen aus seiner selbstverschuldeten Unmündigkeit.“ Motto: *Sapere aude!*' },
    { id: 'lessing-werke', front: 'Drei Dramen von Lessing?', back: '*Minna von Barnhelm* (1767), *Emilia Galotti* (1772), *Nathan der Weise* (1779).' },
    { id: 'ringparabel', front: 'Worum geht es in der Ringparabel?', back: 'Drei ununterscheidbare Ringe stehen für Judentum, Christentum und Islam: Keine Religion kann beweisen, die wahre zu sein; jede soll sich durch Menschlichkeit bewähren. Aus Lessings *Nathan der Weise*.' },
    { id: 'aufklaerung-zeit', front: 'Zeitraum der literarischen Aufklärung?', back: 'Etwa 1720–1785.' },
    { id: 'sud-zeit', front: 'Sturm und Drang: Zeitraum und Merkmale?', back: 'Ca. 1765–1785: Gefühl, Leidenschaft, Natur, Originalgenie, Rebellion gegen Regeln.' },
    { id: 'sud-name', front: 'Woher hat der „Sturm und Drang“ seinen Namen?', back: 'Von einem Drama Friedrich Maximilian Klingers (1776).' },
    { id: 'werther', front: 'Goethes Briefroman von 1774, der ein „Fieber“ auslöste?', back: '*Die Leiden des jungen Werthers*.' },
    { id: 'raeuber', front: 'Schillers erstes Drama (1781, UA 1782 Mannheim)?', back: '*Die Räuber* — mit Karl Moor als Räuberhauptmann.' },
    { id: 'klassik-zeit', front: 'Weimarer Klassik: Beginn und Ende?', back: '1786 (Goethes Italienreise) bis 1805 (Schillers Tod).' },
    { id: 'klassik-ideale', front: 'Ideale der Weimarer Klassik?', back: 'Humanität, Maß, Harmonie von Vernunft und Gefühl; Vorbild griechische Antike.' },
    { id: 'viergestirn', front: 'Wer gehört zum „Weimarer Viergestirn“?', back: 'Goethe, Schiller, Wieland, Herder.' },
    { id: 'schiller-werke', front: 'Drei Dramen Schillers aus der Klassik?', back: '*Wallenstein* (1799), *Maria Stuart* (1800), *Wilhelm Tell* (1804).' },
    { id: 'balladenjahr', front: 'Was war das Balladenjahr?', back: '1797: Goethe und Schiller schreiben um die Wette Balladen — *Der Zauberlehrling*, *Der Taucher*, *Der Handschuh*, *Die Kraniche des Ibykus*.' },
    { id: 'faust-daten', front: 'Wann erschienen Faust I und Faust II?', back: 'Faust I 1808, Faust II 1832 (posthum).' },
    { id: 'faust-wette', front: 'Worum wettet Faust mit Mephisto?', back: 'Sagt Faust je zu einem Augenblick „Verweile doch! du bist so schön!“, gehört seine Seele Mephisto.' },
    { id: 'gretchenfrage', front: 'Was ist die „Gretchenfrage“?', back: '„Nun sag, wie hast du\'s mit der Religion?“ (Faust I) — heute jede entscheidende Gewissensfrage.' },
    { id: 'an-die-freude', front: 'Welches Schiller-Gedicht ist heute Europahymne?', back: '*An die Freude* (1785), in der Vertonung aus Beethovens 9. Sinfonie.' },
    { id: 'sud-vs-klassik', front: 'Sturm und Drang vs. Klassik in einem Satz?', back: 'Sturm und Drang: entfesseltes Gefühl und Rebellion. Klassik: Gefühl und Vernunft im harmonischen Gleichgewicht.' },
  ],
};
