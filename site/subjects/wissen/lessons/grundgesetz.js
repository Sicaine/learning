export default {
  id: 'grundgesetz',
  title: 'Das Grundgesetz & die Grundrechte',
  summary: 'Warum Deutschlands Verfassung „Grundgesetz“ heißt, was in ihren wichtigsten Artikeln steht und wie sie sich gegen ihre eigene Abschaffung schützt.',
  minutes: 20,
  goals: [
    'Entstehung des [[grundgesetz|Grundgesetzes]] 1948/49 erklären',
    'Die wichtigsten [[grundrechte]] und Artikel nennen',
    'Die fünf [[staatsprinzipien]] aus Art. 20 aufzählen',
    'Erklären, wie [[ewigkeitsklausel]] und [[wehrhafte-demokratie]] die Demokratie schützen',
  ],
  blocks: [
    {
      id: 'entstehung', type: 'text', title: 'Ein Provisorium, das blieb',
      md: `
Im Sommer 1948 beauftragten die drei westlichen Besatzungsmächte die Ministerpräsidenten der Länder, eine Verfassung auszuarbeiten. Ein Expertenkonvent auf der Insel **Herrenchiemsee** legte einen Entwurf vor, ab dem 1. September 1948 beriet der [[parlamentarischer-rat]] in **Bonn** — Präsident war **Konrad Adenauer**.

Am **23. Mai 1949** wurde das [[grundgesetz]] verkündet; dieser Tag gilt als Geburtstag der Bundesrepublik. Den Namen „Verfassung“ vermied man bewusst: Man wollte die Teilung Deutschlands nicht festschreiben. Das Grundgesetz sollte nur gelten, bis das ganze deutsche Volk „in freier Selbstbestimmung“ eine Verfassung beschließt.[^wiki-grundgesetz]

Es kam anders: Die Wiedervereinigung 1990 erfolgte durch den Beitritt der DDR zum Geltungsbereich des Grundgesetzes. Das Provisorium wurde zur dauerhaften, weltweit geachteten Verfassung.`,
    },
    {
      id: 'fact-muetter', type: 'callout', tone: 'fact', title: 'Die „Mütter des Grundgesetzes“',
      md: `Unter den 65 stimmberechtigten Mitgliedern des Parlamentarischen Rates waren nur **vier Frauen**. Eine von ihnen, die Juristin **Elisabeth Selbert**, setzte gegen große Widerstände den schlichten Satz durch: „**Männer und Frauen sind gleichberechtigt.**“ (Art. 3 Abs. 2) — mit öffentlichen Protestbriefen aus der ganzen Bevölkerung im Rücken.`,
    },
    {
      id: 'timeline-gg', type: 'game', viz: 'timeline', title: 'Vom Konvent zur gesamtdeutschen Verfassung',
      params: {
        mode: 'sort',
        events: [
          { year: 1948, label: 'Konvent Herrenchiemsee', detail: 'Expertenentwurf im August 1948.' },
          { year: 1949, label: 'Grundgesetz verkündet', detail: '23. Mai 1949.' },
          { year: 1951, label: 'BVerfG gegründet', detail: 'Das Bundesverfassungsgericht nimmt in Karlsruhe die Arbeit auf.' },
          { year: 1956, label: 'KPD-Verbot', detail: 'Zweites und bislang letztes Parteiverbot.' },
          { year: 1968, label: 'Notstandsgesetze', detail: 'Umstrittene Ergänzung, u. a. Widerstandsrecht Art. 20 Abs. 4.' },
          { year: 1990, label: 'Wiedervereinigung', detail: 'Das Grundgesetz gilt seit dem 3. Oktober 1990 in ganz Deutschland.' },
          { year: 1994, label: 'Umweltschutz ins GG', detail: 'Art. 20a: Schutz der natürlichen Lebensgrundlagen.' },
        ],
      },
    },
    {
      id: 'aufbau', type: 'text', title: 'Der Aufbau: Die Grundrechte stehen vorn',
      md: `
Anders als die Weimarer Verfassung beginnt das Grundgesetz nicht mit dem Staatsaufbau, sondern mit dem Menschen. Artikel 1 lautet:

> „Die Würde des Menschen ist unantastbar. Sie zu achten und zu schützen ist Verpflichtung aller staatlichen Gewalt.“

Die [[menschenwuerde]] ist der Maßstab für alles Weitere. Es folgen die [[grundrechte]] (Art. 1–19) — vor allem **Abwehrrechte** des Einzelnen gegen den Staat. Die wichtigsten:[^gg-text]

<table>
<tr><th>Artikel</th><th>Inhalt</th></tr>
<tr><td>Art. 1</td><td>Menschenwürde</td></tr>
<tr><td>Art. 2</td><td>Freie Entfaltung der Persönlichkeit, Recht auf Leben und körperliche Unversehrtheit</td></tr>
<tr><td>Art. 3</td><td>Gleichheit vor dem Gesetz, Gleichberechtigung, Diskriminierungsverbot</td></tr>
<tr><td>Art. 4</td><td>Glaubens- und Gewissensfreiheit</td></tr>
<tr><td>Art. 5</td><td>Meinungs-, Presse-, Kunst- und Wissenschaftsfreiheit</td></tr>
<tr><td>Art. 6</td><td>Schutz von Ehe und Familie</td></tr>
<tr><td>Art. 8</td><td>Versammlungsfreiheit</td></tr>
<tr><td>Art. 12</td><td>Berufsfreiheit</td></tr>
<tr><td>Art. 16a</td><td>Asylrecht</td></tr>
</table>

Manche Grundrechte gelten für **jeden Menschen** („Jeder hat das Recht…“), andere nur für **Deutsche** („Alle Deutschen haben das Recht…“, z. B. Versammlungs- und Berufsfreiheit).`,
    },
    {
      id: 'match-artikel', type: 'match', title: 'Welcher Artikel regelt was?',
      prompt: 'Ordne die Artikel des Grundgesetzes ihrem Inhalt zu.',
      pairs: [
        ['Art. 1', 'Menschenwürde'],
        ['Art. 3', 'Gleichheit vor dem Gesetz'],
        ['Art. 4', 'Glaubensfreiheit'],
        ['Art. 5', 'Meinungs- und Pressefreiheit'],
        ['Art. 8', 'Versammlungsfreiheit'],
        ['Art. 20', 'Staatsprinzipien'],
        ['Art. 79 Abs. 3', 'Ewigkeitsklausel'],
      ],
    },
    {
      id: 'prinzipien', type: 'text', title: 'Artikel 20: Fünf Prinzipien in einem Satz',
      md: `
„Die Bundesrepublik Deutschland ist ein demokratischer und sozialer Bundesstaat.“ In diesem Satz (Art. 20 Abs. 1) und den folgenden Absätzen stecken die fünf [[staatsprinzipien]]:

1. **Demokratie** — „Alle Staatsgewalt geht vom Volke aus“, ausgeübt durch Wahlen und Abstimmungen.
2. **Rechtsstaat** — Gesetzgebung, Regierung und Gerichte sind an Verfassung und Recht gebunden; es gilt [[gewaltenteilung]].
3. **Sozialstaat** — der Staat sorgt für soziale Sicherheit.
4. **Bundesstaat** — Deutschland besteht aus Bund und Ländern ([[foederalismus]]).
5. **Republik** — das Staatsoberhaupt wird auf Zeit gewählt, es gibt keinen Monarchen.

Eine Merkhilfe: „**D**ie **R**epublik **S**ichert **B**ürger-**R**echte“ — **D**emokratie, **R**echtsstaat, **S**ozialstaat, **B**undesstaat, **R**epublik.`,
    },
    {
      id: 'quiz-prinzipien', type: 'quiz', title: 'Staatsprinzipien',
      question: 'Welche der folgenden gehören zu den fünf Staatsprinzipien aus Art. 20 GG?',
      options: [
        { text: 'Sozialstaat', correct: true, why: 'Der „soziale Bundesstaat“ steht ausdrücklich in Art. 20 Abs. 1.' },
        { text: 'Bundesstaat', correct: true, why: 'Deutschland ist föderal aus Bund und Ländern aufgebaut.' },
        { text: 'Marktwirtschaft', correct: false, why: 'Das Grundgesetz schreibt kein Wirtschaftssystem vor — die Soziale Marktwirtschaft ist politisch gewollt, aber nicht als Staatsprinzip verankert.' },
        { text: 'Republik', correct: true, why: 'Schon der Name „Bundesrepublik“ zeigt es: kein erbliches Staatsoberhaupt.' },
        { text: 'Christliche Staatsreligion', correct: false, why: 'Es gibt keine Staatskirche; der Staat ist weltanschaulich neutral (Art. 140 GG).' },
      ],
    },
    {
      id: 'schutz', type: 'text', title: 'Eine Verfassung, die sich selbst verteidigt',
      md: `
Die Weimarer Republik wurde 1933 scheinbar legal abgeschafft — mit dem Ermächtigungsgesetz. Die Väter und Mütter des Grundgesetzes zogen daraus Konsequenzen:

- **Ewigkeitsklausel** (Art. 79 Abs. 3): Menschenwürde, die Prinzipien aus Art. 20 und die Mitwirkung der Länder dürfen **niemals** abgeschafft werden — auch nicht mit Zweidrittelmehrheit. Alles andere darf mit Zweidrittelmehrheit in Bundestag **und** Bundesrat geändert werden; das ist seit 1949 über 60-mal geschehen.
- **Wehrhafte Demokratie**: Das [[bundesverfassungsgericht]] kann verfassungsfeindliche Parteien verbieten — bisher geschehen bei der SRP (1952, Nachfolger der NSDAP) und der KPD (1956).
- **Widerstandsrecht** (Art. 20 Abs. 4): Gegen jeden, der die Ordnung beseitigen will, haben alle Deutschen das Recht zum Widerstand, wenn andere Abhilfe nicht möglich ist.
- **Verfassungsbeschwerde**: Jeder Mensch kann sich an das Bundesverfassungsgericht wenden, wenn er sich durch den Staat in seinen Grundrechten verletzt sieht.`,
    },
    {
      id: 'warn-verfassung', type: 'callout', tone: 'warning', title: 'Häufiger Irrtum',
      md: `„Deutschland hat keine Verfassung, nur ein Grundgesetz“ — das ist falsch. Das Grundgesetz **ist** die Verfassung; der Name hat nur historische Gründe. Das Bundesverfassungsgericht und die gesamte Staatsrechtslehre behandeln es selbstverständlich als Verfassung.`,
    },
    {
      id: 'numeric-alter', type: 'numeric', title: 'Kurz rechnen',
      question: 'Das Grundgesetz wurde am 23. Mai 1949 verkündet. Wie viele Jahre alt wurde es am 23. Mai 2024?',
      answer: 75, tolerance: 0, unit: 'Jahre',
      explain: '2024 − 1949 = 75. Das Jubiläum wurde bundesweit mit einem Demokratiefest gefeiert.',
    },
    {
      id: 'order-aenderung', type: 'order', title: 'Wie schwer ist es, das Grundgesetz zu ändern?',
      prompt: 'Ordne von **leicht** zu **unmöglich**.',
      items: [
        'Ein einfaches Gesetz ändern (einfache Mehrheit im Bundestag)',
        'Einen Grundgesetzartikel wie das Asylrecht ändern (⅔ in Bundestag und Bundesrat)',
        'Die Menschenwürde abschaffen (verboten durch die Ewigkeitsklausel)',
      ],
      explain: 'Genau diese Abstufung ist gewollt: Tagespolitik bleibt flexibel, Grundregeln sind stabil, der Kern ist unantastbar.',
    },
    {
      id: 'recall-ewigkeit', type: 'recall', title: 'Erkläre es',
      prompt: 'Warum enthält das Grundgesetz eine **Ewigkeitsklausel**, und was schützt sie genau?',
      answer: `Sie ist eine Lehre aus der Weimarer Republik, die 1933 durch das Ermächtigungsgesetz scheinbar legal abgeschafft wurde. Art. 79 Abs. 3 verbietet deshalb jede Verfassungsänderung, die die **Menschenwürde** (Art. 1), die **Grundsätze aus Art. 20** (Demokratie, Rechtsstaat, Sozialstaat, Bundesstaat, Republik) oder die **Gliederung des Bundes in Länder** und deren Mitwirkung an der Gesetzgebung antastet — selbst mit Zweidrittelmehrheit.`,
      hints: ['Denk an das Jahr 1933.', 'Art. 1 und Art. 20 spielen eine Rolle.'],
      cards: ['ewigkeit'],
    },
  ],
  cards: [
    { id: 'datum', front: 'Wann wurde das Grundgesetz verkündet?', back: 'Am **23. Mai 1949** — Geburtstag der Bundesrepublik.' },
    { id: 'rat', front: 'Wer arbeitete das Grundgesetz aus, und wer war sein Präsident?', back: 'Der **Parlamentarische Rat** in Bonn (1948/49); Präsident: **Konrad Adenauer**.' },
    { id: 'name', front: 'Warum heißt die Verfassung „Grundgesetz“?', back: 'Sie war als **Provisorium** bis zur Wiedervereinigung gedacht; man wollte die Teilung nicht festschreiben.' },
    { id: 'art1', front: 'Wortlaut von Art. 1 Abs. 1 GG', back: '„Die Würde des Menschen ist unantastbar. Sie zu achten und zu schützen ist Verpflichtung aller staatlichen Gewalt.“' },
    { id: 'grundrechte', front: 'Welche Artikel des Grundgesetzes enthalten die Grundrechte?', back: '**Art. 1–19**.' },
    { id: 'art5', front: 'Was schützt Art. 5 GG?', back: 'Meinungs-, Presse-, Rundfunk-, Kunst- und Wissenschaftsfreiheit — „Eine Zensur findet nicht statt.“' },
    { id: 'jedermann', front: 'Unterschied zwischen Menschenrechten und Bürgerrechten im GG?', back: 'Menschenrechte gelten für **jeden** („Jeder hat das Recht…“), Bürgerrechte nur für **Deutsche** (z. B. Versammlungs- und Berufsfreiheit).' },
    { id: 'prinzipien', front: 'Die fünf Staatsprinzipien aus Art. 20 GG', back: 'Demokratie, Rechtsstaat, Sozialstaat, Bundesstaat, Republik.' },
    { id: 'ewigkeit', front: 'Was schützt die Ewigkeitsklausel (Art. 79 Abs. 3 GG)?', back: 'Menschenwürde (Art. 1), die Prinzipien aus Art. 20 und die Gliederung in Länder samt deren Mitwirkung an der Gesetzgebung — unabänderlich.' },
    { id: 'aenderung', front: 'Welche Mehrheit braucht eine Grundgesetzänderung?', back: '**Zwei Drittel** der Mitglieder des Bundestages **und** zwei Drittel der Stimmen des Bundesrates.' },
    { id: 'verbote', front: 'Welche Parteien wurden bisher vom Bundesverfassungsgericht verboten?', back: 'Die **SRP** (1952) und die **KPD** (1956).' },
    { id: 'selbert', front: 'Wer setzte „Männer und Frauen sind gleichberechtigt“ im Grundgesetz durch?', back: '**Elisabeth Selbert**, eine der vier „Mütter des Grundgesetzes“.' },
    { id: 'widerstand', front: 'Was regelt Art. 20 Abs. 4 GG?', back: 'Das **Widerstandsrecht** aller Deutschen gegen jeden, der die verfassungsmäßige Ordnung beseitigen will — wenn andere Abhilfe nicht möglich ist (seit 1968).' },
    { id: 'wiedervereinigung', front: 'Wie wurde das Grundgesetz gesamtdeutsche Verfassung?', back: 'Durch den **Beitritt der DDR** zum Geltungsbereich des Grundgesetzes am 3. Oktober 1990.' },
  ],
};
