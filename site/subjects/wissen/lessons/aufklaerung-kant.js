export default {
  id: 'aufklaerung-kant',
  title: 'Aufklärung & Kant',
  summary: 'Im 17. und 18. Jahrhundert stellten Philosophen Autorität und Tradition auf den Prüfstand der Vernunft. Daraus entstanden die Ideen von Menschenrechten, Gewaltenteilung und Toleranz — und Kants berühmte Antwort auf die Frage „Was ist Aufklärung?“.',
  minutes: 24,
  goals: [
    '[[rationalismus|Rationalismus]] (Descartes) und [[empirismus|Empirismus]] (Locke, Hume) unterscheiden',
    'Die Idee des [[gesellschaftsvertrag|Gesellschaftsvertrags]] bei Hobbes, Locke und Rousseau vergleichen',
    'Montesquieus [[gewaltenteilung|Gewaltenteilung]] erklären',
    'Kants Definition der [[aufklaerung|Aufklärung]] und den [[kategorischer-imperativ|kategorischen Imperativ]] wiedergeben',
  ],
  blocks: [
    {
      id: 'descartes', type: 'text', title: 'Descartes: Ich denke, also bin ich',
      md: `
Der Franzose **René Descartes** (1596–1650) wollte Wissen auf ein unerschütterliches Fundament stellen. Er zweifelte deshalb an allem, woran man zweifeln kann: an den Sinnen, die täuschen, sogar daran, ob er gerade träumt. Eines blieb übrig: Wer zweifelt, der denkt — und wer denkt, existiert. „**Cogito, ergo sum**“ — „Ich denke, also bin ich“ (1637 im *Discours de la méthode*).[^sep-descartes]

Descartes gilt als Begründer des neuzeitlichen **[[rationalismus|Rationalismus]]**: Sichere Erkenntnis kommt aus dem Verstand, ähnlich wie in der Mathematik. Er trennte zudem scharf zwischen Geist und Körper (*Dualismus*).`,
    },
    {
      id: 'empirismus', type: 'text', title: 'Die Empiristen: Erfahrung zuerst',
      md: `
Britische Philosophen hielten dagegen: Alles Wissen stammt aus der **Erfahrung** — der **[[empirismus|Empirismus]]**. **John Locke** (1632–1704) verglich den Geist bei der Geburt mit einem unbeschriebenen Blatt (*tabula rasa*). **David Hume** (1711–1776) trieb das auf die Spitze: Selbst dass die Sonne morgen aufgeht, wissen wir nicht sicher, wir erwarten es nur aus Gewohnheit.

Locke war auch politisch einflussreich: Jeder Mensch habe natürliche Rechte auf **Leben, Freiheit und Eigentum**. Eine Regierung, die diese Rechte verletzt, darf das Volk absetzen. Diese Gedanken finden sich fast wörtlich in der amerikanischen Unabhängigkeitserklärung von 1776 wieder.[^sep-locke]`,
    },
    {
      id: 'staat', type: 'text', title: 'Warum gibt es Staaten? Der Gesellschaftsvertrag',
      md: `
Wenn Herrschaft nicht mehr einfach „von Gottes Gnaden“ ist — worauf beruht sie dann? Die Antwort vieler Aufklärer: auf einem **[[gesellschaftsvertrag|Gesellschaftsvertrag]]**, einer gedachten Übereinkunft der Menschen.

- **Thomas Hobbes** („Leviathan“, 1651): Ohne Staat herrscht ein „Krieg aller gegen alle“, das Leben ist „einsam, armselig, ekelhaft, tierisch und kurz“. Deshalb übertragen die Menschen ihre Macht einem starken Herrscher, der Frieden sichert.
- **John Locke**: Der Staat existiert, um die natürlichen Rechte zu schützen — und ist an sie gebunden.
- **Jean-Jacques Rousseau** („Vom Gesellschaftsvertrag“, 1762): Legitim ist nur, was dem **Gemeinwillen** (*volonté générale*) aller Bürger entspricht. Sein Satz „Der Mensch ist frei geboren, und überall liegt er in Ketten“ wurde zum Motto der Revolutionäre.

**Montesquieu** schließlich zeigte in „Vom Geist der Gesetze“ (1748), wie man Macht bändigt: durch **[[gewaltenteilung|Gewaltenteilung]]** in **Legislative** (Gesetzgebung), **Exekutive** (Ausführung) und **Judikative** (Rechtsprechung), die sich gegenseitig kontrollieren. Das ist bis heute das Grundgerüst jeder Demokratie.`,
    },
    {
      id: 'toleranz', type: 'callout', tone: 'history', title: 'Die Aufklärung in Europa',
      md: `In Frankreich kämpfte **Voltaire** mit spitzer Feder gegen religiöse Intoleranz und Willkürjustiz. **Diderot** und **d’Alembert** gaben ab 1751 die **Encyclopédie** heraus, die das Wissen der Zeit allen zugänglich machen wollte. In Deutschland warb **Gotthold Ephraim Lessing** mit „Nathan der Weise“ (1779) und der Ringparabel für Toleranz zwischen Judentum, Christentum und Islam; sein Freund **Moses Mendelssohn** wurde zur Symbolfigur der jüdischen Aufklärung. Und Friedrich der Große von Preußen sah sich als „aufgeklärter Monarch“.`,
    },
    {
      id: 'kant', type: 'text', title: 'Kant: Habe Mut, dich deines eigenen Verstandes zu bedienen!',
      md: `
**Immanuel Kant** (1724–1804) verließ seine Heimatstadt **Königsberg** kaum — und veränderte doch die Philosophie der ganzen Welt. 1784 beantwortete er in einer Zeitschrift die Frage „Was ist Aufklärung?“:[^kant-aufklaerung]

> „Aufklärung ist der Ausgang des Menschen aus seiner selbstverschuldeten Unmündigkeit. Unmündigkeit ist das Unvermögen, sich seines Verstandes ohne Leitung eines anderen zu bedienen. […] *Sapere aude!* Habe Mut, dich deines eigenen Verstandes zu bedienen!“

„Selbstverschuldet“ ist die Unmündigkeit, wenn es nicht am Verstand fehlt, sondern an **Mut und Entschlossenheit** — aus Faulheit und Feigheit lassen sich viele gern bevormunden.

In der **Kritik der reinen Vernunft** (1781) verband Kant Rationalismus und Empirismus: Erkenntnis braucht Erfahrung *und* die Formen unseres Verstandes (etwa Raum, Zeit, Ursache). Für die Moral formulierte er den **[[kategorischer-imperativ|kategorischen Imperativ]]** (1785):

> „Handle nur nach derjenigen Maxime, durch die du zugleich wollen kannst, dass sie ein allgemeines Gesetz werde.“

Und: Behandle Menschen nie bloß als Mittel, sondern immer zugleich als Zweck. Das ist ein Grundgedanke der **Menschenwürde**, die heute in Artikel 1 des Grundgesetzes steht.[^sep-kant-moral] In der Schrift „**Zum ewigen Frieden**“ (1795) entwarf Kant sogar einen Völkerbund — eine Vorwegnahme der Vereinten Nationen.`,
    },
    {
      id: 'tl-game', type: 'game', viz: 'timeline', title: 'Werke der Aufklärung ordnen',
      params: { mode: 'sort', events: [
        { year: 1637, label: 'Descartes: Cogito' },
        { year: 1651, label: 'Hobbes: Leviathan' },
        { year: 1689, label: 'Locke: Zwei Abhandlungen' },
        { year: 1748, label: 'Montesquieu: Gesetze' },
        { year: 1751, label: 'Encyclopédie' },
        { year: 1762, label: 'Rousseau: Gesellschaftsv.' },
        { year: 1781, label: 'Kritik der reinen Vernunft' },
        { year: 1784, label: 'Was ist Aufklärung?' },
      ] },
    },
    {
      id: 'match-zitate', type: 'match', title: 'Wer sagte das?',
      pairs: [
        ['„Ich denke, also bin ich.“', 'Descartes'],
        ['„Krieg aller gegen alle“', 'Hobbes'],
        ['„Der Mensch ist frei geboren, und überall liegt er in Ketten.“', 'Rousseau'],
        ['Gewaltenteilung in drei Gewalten', 'Montesquieu'],
        ['„Sapere aude!“', 'Kant'],
        ['Geist als „tabula rasa“', 'Locke'],
      ],
    },
    {
      id: 'quiz-gewalten', type: 'quiz', title: 'Gewaltenteilung',
      question: 'Welche Zuordnung der drei Gewalten nach Montesquieu ist richtig?',
      options: [
        { text: 'Legislative = Gesetzgebung, Exekutive = Ausführung, Judikative = Rechtsprechung', correct: true, why: 'In Deutschland: Parlamente, Regierung und Verwaltung, Gerichte.' },
        { text: 'Legislative = Rechtsprechung, Exekutive = Gesetzgebung, Judikative = Ausführung', correct: false, why: 'Die Begriffe sind vertauscht.' },
        { text: 'Legislative = Regierung, Exekutive = Parlament, Judikative = Presse', correct: false, why: 'Die Presse wird manchmal „vierte Gewalt“ genannt, gehört aber nicht zu Montesquieus Modell.' },
      ],
    },
    {
      id: 'quiz-imperativ', type: 'quiz', title: 'Den kategorischen Imperativ anwenden',
      question: 'Jemand überlegt, ein Versprechen zu brechen, wenn es ihm nützt. Was sagt der kategorische Imperativ dazu?',
      options: [
        { text: 'Das ist verboten, weil ein allgemeines Gesetz „Brich Versprechen, wenn es dir nützt“ Versprechen überhaupt sinnlos machen würde.', correct: true, why: 'Kants Test: Die Maxime lässt sich nicht widerspruchsfrei verallgemeinern.' },
        { text: 'Das ist erlaubt, wenn die Folgen insgesamt gut sind.', correct: false, why: 'So argumentiert der Utilitarismus; Kant beurteilt die Maxime, nicht die Folgen.' },
        { text: 'Das ist erlaubt, solange niemand es merkt.', correct: false, why: 'Für Kant zählt die Pflicht, nicht die Entdeckung.' },
      ],
    },
    {
      id: 'num-kant', type: 'numeric', title: 'Ein berühmter Aufsatz',
      question: 'In welchem Jahr erschien Kants Aufsatz „Beantwortung der Frage: Was ist Aufklärung?“',
      answer: 1784, tolerance: 0,
      hint: 'Fünf Jahre vor der Französischen Revolution.',
      explain: '**1784** in der *Berlinischen Monatsschrift*.',
    },
    {
      id: 'recall-aufklaerung', type: 'recall', title: 'Kant in eigenen Worten',
      prompt: 'Erkläre Kants Definition von Aufklärung so, dass ein Schüler sie versteht. Was bedeutet „selbstverschuldete Unmündigkeit“ — und findest du Beispiele von heute?',
      answer: `Unmündig ist, wer nicht selbst denkt, sondern sich von anderen leiten lässt — von Autoritäten, Priestern, Vormündern, „einem Buch, das für mich Verstand hat“. **Selbstverschuldet** ist das, wenn es nicht am Verstand fehlt, sondern am **Mut**, ihn zu benutzen: Es ist bequemer, andere entscheiden zu lassen. Aufklärung heißt also, den Mut zum eigenen Urteil zu haben. **Heutige Beispiele:** Nachrichten ungeprüft teilen, Meinungen einfach übernehmen, Entscheidungen blind Algorithmen oder Influencern überlassen.`,
      hints: ['Kant nennt als Ursachen Faulheit und Feigheit.'],
      cards: ['kant-aufklaerung', 'kant-unmuendigkeit'],
    },
  ],
  cards: [
    { id: 'cogito', front: '„Cogito, ergo sum“ — von wem, was bedeutet es?', back: 'René Descartes (1637): „Ich denke, also bin ich“ — das Einzige, woran man nicht zweifeln kann.' },
    { id: 'rationalismus', front: 'Rationalismus vs. Empirismus?', back: 'Rationalismus: Erkenntnis aus dem Verstand (Descartes). Empirismus: Erkenntnis aus der Erfahrung (Locke, Hume).' },
    { id: 'tabula-rasa', front: 'Was meinte Locke mit „tabula rasa“?', back: 'Der Geist ist bei der Geburt ein unbeschriebenes Blatt; alles Wissen kommt aus der Erfahrung.' },
    { id: 'locke-rechte', front: 'Welche natürlichen Rechte nannte John Locke?', back: 'Leben, Freiheit und Eigentum.' },
    { id: 'hobbes', front: 'Hobbes: Werk und Kernthese?', back: '„Leviathan“ (1651): Ohne Staat herrscht Krieg aller gegen alle; darum braucht es einen starken Souverän.' },
    { id: 'rousseau', front: 'Rousseau: Werk und Schlüsselbegriff?', back: '„Vom Gesellschaftsvertrag“ (1762); der Gemeinwille (volonté générale).' },
    { id: 'montesquieu', front: 'Montesquieu: Werk und Idee?', back: '„Vom Geist der Gesetze“ (1748): Gewaltenteilung in Legislative, Exekutive, Judikative.' },
    { id: 'gewalten', front: 'Die drei Gewalten und ihre Aufgaben?', back: 'Legislative (Gesetze machen), Exekutive (ausführen), Judikative (Recht sprechen).' },
    { id: 'encyclopedie', front: 'Wer gab die Encyclopédie heraus — ab wann?', back: 'Diderot und d’Alembert, ab 1751.' },
    { id: 'nathan', front: 'Welches Drama steht für Toleranz in der deutschen Aufklärung?', back: 'Lessings „Nathan der Weise“ (1779) mit der Ringparabel.' },
    { id: 'kant-leben', front: 'Kants Lebensdaten und Stadt?', back: '1724–1804, Königsberg.' },
    { id: 'kant-aufklaerung', front: 'Kants Definition der Aufklärung (1784)?', back: '„Aufklärung ist der Ausgang des Menschen aus seiner selbstverschuldeten Unmündigkeit.“' },
    { id: 'kant-unmuendigkeit', front: 'Wann ist Unmündigkeit laut Kant „selbstverschuldet“?', back: 'Wenn nicht der Verstand fehlt, sondern Mut und Entschlossenheit, ihn ohne fremde Leitung zu gebrauchen.' },
    { id: 'sapere-aude', front: 'Was bedeutet „Sapere aude!“?', back: '„Habe Mut, dich deines eigenen Verstandes zu bedienen!“ — Wahlspruch der Aufklärung.' },
    { id: 'imperativ', front: 'Der kategorische Imperativ (Grundformel)?', back: '„Handle nur nach derjenigen Maxime, durch die du zugleich wollen kannst, dass sie ein allgemeines Gesetz werde.“' },
    { id: 'kant-werke', front: 'Drei Werke Kants?', back: 'Kritik der reinen Vernunft (1781), Grundlegung zur Metaphysik der Sitten (1785), Zum ewigen Frieden (1795).' },
  ],
};
