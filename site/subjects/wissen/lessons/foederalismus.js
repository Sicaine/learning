export default {
  id: 'foederalismus',
  title: 'Föderalismus: Bund, Länder, Kommunen',
  summary: 'Warum es in Deutschland 16 Schulsysteme gibt, wer für Polizei, Autobahn und Müllabfuhr zuständig ist — und wie Geld zwischen armen und reichen Ländern verteilt wird.',
  minutes: 20,
  goals: [
    'Die Grundidee des [[foederalismus]] und seine historischen Wurzeln erklären',
    'Aufgaben den Ebenen Bund, Länder und Kommunen zuordnen',
    '[[kulturhoheit|Kulturhoheit]] und [[konkurrierende-gesetzgebung|konkurrierende Gesetzgebung]] erklären',
    'Das Prinzip des [[finanzausgleich|Finanzausgleichs]] beschreiben',
  ],
  blocks: [
    {
      id: 'idee', type: 'text', title: 'Ein Staat aus Staaten',
      md: `
Deutschland ist ein **Bundesstaat**: Die 16 Länder sind selbst Staaten mit eigener Verfassung, eigenem Parlament (Landtag; in Berlin Abgeordnetenhaus, in Hamburg und Bremen Bürgerschaft) und eigener Regierung unter einem Ministerpräsidenten — in den drei **Stadtstaaten** Berlin, Hamburg und Bremen heißen sie Regierender Bürgermeister bzw. Erster Bürgermeister oder Präsident des Senats.

Die Wurzeln reichen weit zurück: Das Heilige Römische Reich war ein Flickenteppich aus Hunderten Territorien, auch das Kaiserreich von 1871 war ein Bund von Fürstentümern. Nach 1945 bestanden die Alliierten zusätzlich auf einer dezentralen Ordnung — eine Machtkonzentration wie im NS-Staat sollte nie wieder möglich sein.[^wiki-foederalismus]

Der [[foederalismus]] gehört zu den unveränderlichen [[staatsprinzipien]]: Die Gliederung in Länder ist durch die [[ewigkeitsklausel]] geschützt.`,
    },
    {
      id: 'wer-darf', type: 'text', title: 'Wer macht welche Gesetze?',
      md: `
Die Grundregel steht in **Art. 30 GG**: Staatliche Aufgaben sind **Sache der Länder**, soweit das Grundgesetz nichts anderes bestimmt. In der Praxis bestimmt es aber vieles anders:

- **Ausschließliche Gesetzgebung des Bundes** (Art. 73): Außenpolitik, Verteidigung, Staatsangehörigkeit, Währung, Zoll, Luftverkehr.
- **[[konkurrierende-gesetzgebung|Konkurrierende Gesetzgebung]]** (Art. 74): Die Länder dürfen handeln, solange der Bund es nicht tut — etwa beim Strafrecht, bürgerlichen Recht, Arbeitsrecht oder Umweltschutz. Der Bund hat hier fast überall Gesetze erlassen.
- **Gesetzgebung der Länder**: alles, was übrig bleibt — vor allem **Schule und Hochschule**, **Polizei**, **Kultur**, Rundfunk, Kommunalrecht.

Dafür führen die Länder auch die meisten **Bundesgesetze aus**: Finanzämter, Polizei, Bauämter und Schulen sind Landes- oder Kommunalbehörden. Der Bund hat nur wenige eigene Verwaltungen, etwa die Bundeswehr, die Bundespolizei oder den Zoll.`,
    },
    {
      id: 'kultur', type: 'text', title: 'Kulturhoheit: 16 Schulsysteme',
      md: `
Das bekannteste Beispiel ist die **[[kulturhoheit|Kulturhoheit der Länder]]**: Jedes Land entscheidet selbst über Schulformen, Lehrpläne, Abiturprüfungen und Ferientermine. Deshalb gibt es Gymnasien mit acht oder neun Jahren, unterschiedliche Namen für Schulformen und gestaffelte Sommerferien.

Damit die Abschlüsse vergleichbar bleiben, stimmen sich die Länder in der **Kultusministerkonferenz (KMK)** ab. Kritiker beklagen den „Flickenteppich“, Befürworter loben den Wettbewerb um gute Bildungspolitik.`,
    },
    {
      id: 'match-ebenen', type: 'match', title: 'Wer ist zuständig?',
      prompt: 'Ordne jede Aufgabe der Ebene zu, die hauptsächlich zuständig ist.',
      pairs: [
        ['Bundeswehr und Außenpolitik', 'Bund'],
        ['Lehrpläne und Abitur', 'Länder'],
        ['Kindergärten, Müllabfuhr, Bebauungspläne', 'Kommunen'],
        ['Gemeinsame Handelspolitik mit dem Ausland', 'Europäische Union'],
      ],
    },
    {
      id: 'kommunen', type: 'text', title: 'Die dritte Ebene: Kommunen',
      md: `
Unterhalb der Länder gibt es rund 10.700 **Gemeinden**, zusammengefasst in rund 300 **Landkreise**; größere Städte sind oft **kreisfrei**. Art. 28 GG garantiert ihnen die **[[kommunale-selbstverwaltung|kommunale Selbstverwaltung]]**: Sie regeln die „Angelegenheiten der örtlichen Gemeinschaft“ selbst — Kindergärten, Straßen, Friedhöfe, Wasser, Abfall, Bauleitplanung, Kultur- und Sportstätten.

Hier wirkt das Prinzip der [[subsidiaritaet]]: Was vor Ort gelöst werden kann, soll auch vor Ort gelöst werden. Staatsrechtlich sind die Kommunen allerdings ein Teil der Länder, nicht eine eigene staatliche Ebene.`,
    },
    {
      id: 'order-ebenen', type: 'order', title: 'Von klein nach groß',
      prompt: 'Ordne die politischen Ebenen von der kleinsten zur größten.',
      items: ['Gemeinde', 'Landkreis', 'Land', 'Bund', 'Europäische Union'],
    },
    {
      id: 'bundesrat-rechnen', type: 'numeric', title: 'Stimmen im Bundesrat',
      question: 'Im Bundesrat haben 4 Länder je 6 Stimmen, 1 Land hat 5, 7 Länder haben je 4 und 4 Länder je 3 Stimmen. Wie viele Stimmen sind das zusammen?',
      answer: 69, tolerance: 0, unit: 'Stimmen',
      hint: '4·6 + 1·5 + 7·4 + 4·3',
      explain: '24 + 5 + 28 + 12 = **69**. Die Verteilung ist bewusst nicht proportional: Nordrhein-Westfalen hat rund 26-mal so viele Einwohner wie Bremen, aber nur doppelt so viele Stimmen. So haben kleine Länder mehr Gewicht.[^bundesrat-de]',
    },
    {
      id: 'geld', type: 'text', title: 'Geld: Gleichwertige Lebensverhältnisse',
      md: `
Die Länder sind sehr unterschiedlich wirtschaftsstark. Das Grundgesetz verlangt aber **gleichwertige Lebensverhältnisse** im ganzen Bundesgebiet. Deshalb werden Steuereinnahmen umverteilt — der **[[finanzausgleich|Finanzausgleich]]**:

- Bis 2019 zahlten die reichen Länder direkt an die ärmeren (der „Länderfinanzausgleich“ im engeren Sinne).
- Seit **2020** läuft der Ausgleich über die Verteilung der **Umsatzsteuer**: Finanzschwache Länder erhalten Zuschläge, finanzstarke Abschläge. Dazu kommen Bundesergänzungszuweisungen.

Der größte Zahler ist seit vielen Jahren **Bayern** — das bis in die 1980er-Jahre selbst Empfängerland war.`,
    },
    {
      id: 'quiz-foed', type: 'quiz', title: 'Föderalismus-Check',
      question: 'Welche Aussagen stimmen?',
      options: [
        { text: 'Die Polizei ist überwiegend Ländersache.', correct: true, why: 'Jedes Land hat seine eigene Polizei; daneben gibt es Bundespolizei und BKA.' },
        { text: 'Der Bund bestimmt die Lehrpläne der Schulen.', correct: false, why: 'Schule ist Kern der Kulturhoheit der Länder.' },
        { text: 'Die Länder führen die meisten Bundesgesetze aus.', correct: true, why: 'Deutschland hat eine vor allem landeseigene Verwaltung — z. B. die Finanzämter.' },
        { text: 'Die Gliederung in Länder könnte mit Zweidrittelmehrheit abgeschafft werden.', correct: false, why: 'Sie ist durch die Ewigkeitsklausel (Art. 79 Abs. 3) geschützt.' },
      ],
    },
    {
      id: 'fact-laender', type: 'callout', tone: 'fact', title: 'Das jüngste und das kleinste Land',
      md: `**Baden-Württemberg** entstand erst 1952 durch eine Volksabstimmung aus drei Nachkriegsländern — der einzige erfolgreiche Länderzusammenschluss. Die Fusion von **Berlin und Brandenburg** scheiterte 1996 an den Brandenburgern. Das kleinste Land ist **Bremen** (mit Bremerhaven), das größte nach Fläche **Bayern**, nach Einwohnern **Nordrhein-Westfalen**.`,
    },
    {
      id: 'recall-foed', type: 'recall', title: 'Erkläre es',
      prompt: 'Nenne je zwei **Vorteile** und **Nachteile** des Föderalismus in Deutschland.',
      answer: `**Vorteile**: Machtverteilung und gegenseitige Kontrolle (gerade als Lehre aus der NS-Zeit); Bürgernähe und Berücksichtigung regionaler Unterschiede; Wettbewerb der Länder um gute Lösungen („Labor“ für Reformen); zusätzliche Mitsprache über den Bundesrat. **Nachteile**: unterschiedliche Regeln z. B. in der Bildung („Flickenteppich“), was Umzüge erschwert; langsame Entscheidungen und Blockaden durch den Bundesrat; unklare Verantwortlichkeiten; Kosten durch doppelte Strukturen.`,
      hints: ['Denk an Schule und Umzug.', 'Denk an Machtkontrolle.'],
      cards: ['vorteile'],
    },
  ],
  cards: [
    { id: 'anzahl', front: 'Wie viele Länder hat Deutschland, und welche sind Stadtstaaten?', back: '**16** Länder; Stadtstaaten: **Berlin, Hamburg, Bremen**.' },
    { id: 'art30', front: 'Grundregel der Zuständigkeit nach Art. 30 GG?', back: 'Staatliche Aufgaben sind **Ländersache**, soweit das Grundgesetz nichts anderes bestimmt.' },
    { id: 'bund-exkl', front: 'Beispiele für ausschließliche Gesetzgebung des Bundes', back: 'Außenpolitik, Verteidigung, Staatsangehörigkeit, Währung, Zoll.' },
    { id: 'konkurrierend', front: 'Was bedeutet „konkurrierende Gesetzgebung“?', back: 'Die Länder dürfen Gesetze machen, **solange und soweit der Bund keine Regelung trifft** (z. B. Strafrecht, bürgerliches Recht).' },
    { id: 'kultur', front: 'Was umfasst die Kulturhoheit der Länder?', back: 'Vor allem **Schule, Hochschule und Kultur** (auch Rundfunk); abgestimmt in der Kultusministerkonferenz (KMK).' },
    { id: 'polizei', front: 'Ist die Polizei Bundes- oder Ländersache?', back: 'Überwiegend **Ländersache**; zusätzlich gibt es Bundespolizei und Bundeskriminalamt.' },
    { id: 'verwaltung', front: 'Wer führt die meisten Bundesgesetze aus?', back: 'Die **Länder** (und Kommunen) mit ihren Behörden, z. B. Finanzämtern.' },
    { id: 'kommunal', front: 'Wo ist die kommunale Selbstverwaltung garantiert?', back: 'In **Art. 28 GG**.' },
    { id: 'subsidiaritaet', front: 'Was besagt das Subsidiaritätsprinzip?', back: 'Die höhere Ebene soll nur übernehmen, was die kleinere Einheit **nicht selbst leisten** kann.' },
    { id: 'finanz', front: 'Wie funktioniert der Finanzausgleich seit 2020?', back: 'Über **Zu- und Abschläge bei der Verteilung der Umsatzsteuer** plus Bundesergänzungszuweisungen (statt direkter Zahlungen zwischen den Ländern).' },
    { id: 'zahler', front: 'Größtes Geberland im Finanzausgleich?', back: '**Bayern** — bis in die 1980er selbst Empfängerland.' },
    { id: 'bw', front: 'Welches Land entstand 1952 durch Zusammenschluss?', back: '**Baden-Württemberg**.' },
    { id: 'wurzeln', front: 'Warum bestanden die Alliierten 1948 auf Föderalismus?', back: 'Um eine **Machtkonzentration** wie im NS-Staat zu verhindern (dazu kamen die langen föderalen Traditionen seit dem Heiligen Römischen Reich).' },
    { id: 'vorteile', front: 'Zwei Vorteile und zwei Nachteile des Föderalismus', back: 'Pro: Machtkontrolle, Bürgernähe/Wettbewerb. Contra: „Flickenteppich“ (z. B. Bildung), langsame Entscheidungen/Blockaden.' },
  ],
};
