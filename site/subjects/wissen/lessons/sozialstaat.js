export default {
  id: 'sozialstaat',
  title: 'Der Sozialstaat',
  summary: 'Von Bismarcks Krankenversicherung bis zur Grundsicherung 2026: die fünf Säulen der Sozialversicherung, der Generationenvertrag und die Prinzipien dahinter.',
  minutes: 20,
  goals: [
    'Die fünf Zweige der [[sozialversicherung]] mit Gründungsjahr nennen',
    'Den [[generationenvertrag]] (Umlageverfahren) und seine demografische Herausforderung erklären',
    'Versicherung und steuerfinanzierte [[grundsicherung]] unterscheiden',
    '[[solidaritaetsprinzip|Solidaritäts-]] und [[subsidiaritaet|Subsidiaritätsprinzip]] erklären',
  ],
  blocks: [
    {
      id: 'auftrag', type: 'text', title: 'Ein Auftrag der Verfassung',
      md: `
„Die Bundesrepublik Deutschland ist ein demokratischer und **sozialer** Bundesstaat“ — der [[sozialstaat|Sozialstaat]] gehört zu den [[staatsprinzipien]] des Art. 20 GG. Was genau er leisten muss, lässt das Grundgesetz offen; klar ist nur: Der Staat muss ein **menschenwürdiges [Existenzminimum](wiki:Existenzminimum|Living wage)** sichern und für einen Ausgleich sozialer Gegensätze sorgen.

Umgesetzt wird das vor allem durch zwei Systeme:

1. die **[[sozialversicherung|Sozialversicherung]]** — Pflichtversicherungen, finanziert aus **Beiträgen** vom Lohn;
2. **steuerfinanzierte Leistungen** wie [[grundsicherung|Grundsicherung]], [Kindergeld](wiki:Kindergeld (Deutschland)), [Wohngeld](wiki:Wohngeld|Housing Benefit) oder [BAföG](wiki:Bundesausbildungsförderungsgesetz|BAföG) — sie hängen von Bedürftigkeit oder Lebenslage ab, nicht von eingezahlten Beiträgen.`,
    },
    {
      id: 'bismarck', type: 'text', title: 'Bismarcks Erbe: fünf Säulen',
      md: `
Die deutsche Sozialversicherung ist die älteste der Welt. [Reichskanzler](wiki:Reichskanzler|Reich Chancellor) **[Otto von Bismarck](wiki:Otto von Bismarck|Otto von Bismarck)** führte sie in den 1880er-Jahren ein — aus Sorge um den sozialen Frieden und um der erstarkenden Sozialdemokratie das Wasser abzugraben („Zuckerbrot“ neben der „Peitsche“ der [Sozialistengesetze](wiki:Sozialistengesetz|Anti-Socialist Laws)).[^wiki-sozialversicherung]

<table>
<tr><th>Zweig</th><th>seit</th><th>Beiträge</th></tr>
<tr><td>[Krankenversicherung](wiki:Gesetzliche Krankenversicherung)</td><td>1883</td><td>Arbeitnehmer und Arbeitgeber</td></tr>
<tr><td>Unfallversicherung</td><td>1884</td><td>nur Arbeitgeber</td></tr>
<tr><td>[Rentenversicherung](wiki:Gesetzliche Rentenversicherung)</td><td>1889</td><td>je zur Hälfte (18,6 % des Bruttolohns, Stand 2026)</td></tr>
<tr><td>Arbeitslosenversicherung</td><td>1927</td><td>je zur Hälfte</td></tr>
<tr><td>[Pflegeversicherung](wiki:Pflegeversicherung (Deutschland)|Long-term care insurance in Germany)</td><td>1995</td><td>Arbeitnehmer und Arbeitgeber</td></tr>
</table>

Zusammen summieren sich die Beiträge auf rund **40 % des Bruttolohns**, die sich Arbeitnehmer und Arbeitgeber im Wesentlichen teilen.`,
    },
    {
      id: 'timeline-sozial', type: 'game', viz: 'timeline', title: 'Wann kam was?',
      params: {
        mode: 'sort',
        events: [
          { year: 1883, label: 'Krankenversicherung' },
          { year: 1884, label: 'Unfallversicherung' },
          { year: 1889, label: 'Rentenversicherung' },
          { year: 1927, label: 'Arbeitslosenversicherung' },
          { year: 1957, label: 'Dynamische Rente' },
          { year: 1995, label: 'Pflegeversicherung' },
          { year: 2005, label: 'Hartz IV' },
          { year: 2023, label: 'Bürgergeld' },
        ],
      },
    },
    {
      id: 'generationen', type: 'text', title: 'Der Generationenvertrag',
      md: `
Die gesetzliche Rente funktioniert im **[Umlageverfahren](wiki:Umlageverfahren|Pay as you go (social program financing))**: Die Beiträge der heute Arbeitenden werden nicht angespart, sondern sofort als Renten an die heutigen Rentner ausgezahlt. Die Beitragszahler von heute erwerben dafür Ansprüche, die später die nächste Generation bezahlt — der **[[generationenvertrag|Generationenvertrag]]**. Eingeführt wurde dieses Prinzip mit der großen [Rentenreform](wiki:Rentenreform 1957) **1957** unter [Adenauer](wiki:Konrad Adenauer|Konrad Adenauer), die die Renten an die Lohnentwicklung koppelte („dynamische Rente“).

Das Problem: Der [[demografischer-wandel|demografische Wandel]]. Anfang der 1960er-Jahre kamen auf einen Rentner rund sechs Beitragszahler, heute sind es nur noch etwa zwei — und die [Babyboomer](wiki:Babyboomer|Baby boomers) gehen gerade in Rente. Deshalb schießt der Bund jedes Jahr über 100 Milliarden Euro aus Steuermitteln zu, und es wird immer wieder über [Renteneintrittsalter](wiki:Renteneintrittsalter), [Rentenniveau](wiki:Rentenniveau) und private Vorsorge diskutiert.[^drv]`,
    },
    {
      id: 'numeric-rente', type: 'numeric', title: 'Was geht vom Lohn ab?',
      question: 'Der Beitragssatz zur Rentenversicherung beträgt 18,6 % und wird je zur Hälfte von Arbeitnehmer und Arbeitgeber getragen. Wie viel Euro zahlt eine Arbeitnehmerin mit 4.000 € Bruttolohn im Monat selbst?',
      answer: 372, tolerance: 0.5, unit: '€',
      hint: 'Die Hälfte von 18,6 % sind 9,3 %.',
      explain: '9,3 % von 4.000 € = **372 €**. Der Arbeitgeber zahlt noch einmal denselben Betrag — insgesamt fließen also 744 € in die Rentenkasse.',
    },
    {
      id: 'prinzipien', type: 'text', title: 'Solidarität und Subsidiarität',
      md: `
Zwei Leitideen prägen den deutschen Sozialstaat:

- **[[solidaritaetsprinzip|Solidaritätsprinzip]]**: Die Gemeinschaft trägt die Risiken des Einzelnen. In der gesetzlichen [Krankenversicherung](wiki:Gesetzliche Krankenversicherung) zahlt, wer mehr verdient, höhere Beiträge — erhält aber dieselbe Behandlung. Kinder und Ehepartner ohne Einkommen sind kostenlos mitversichert.
- **[[subsidiaritaet|Subsidiaritätsprinzip]]**: Zuerst ist jeder selbst gefordert, dann die Familie, erst dann der Staat. Deshalb wird bei der Grundsicherung eigenes Vermögen berücksichtigt.

Daneben gilt in der Sozialversicherung das **Versicherungsprinzip**: Wer länger und mehr einzahlt, bekommt z. B. mehr Rente.`,
    },
    {
      id: 'match-prinzipien', type: 'match', title: 'Prinzip und Beispiel',
      pairs: [
        ['Solidaritätsprinzip', 'Kinder sind in der Krankenkasse beitragsfrei mitversichert'],
        ['Subsidiaritätsprinzip', 'Vor der Grundsicherung wird eigenes Vermögen angerechnet'],
        ['Versicherungsprinzip', 'Wer länger einzahlt, bekommt mehr Rente'],
        ['Umlageverfahren', 'Heutige Beiträge zahlen heutige Renten'],
      ],
    },
    {
      id: 'grundsicherung', type: 'text', title: 'Hartz IV, Bürgergeld, Grundsicherung',
      md: `
Wer arbeitsfähig ist, aber kein ausreichendes Einkommen hat und kein [Arbeitslosengeld](wiki:Arbeitslosengeld) (mehr) bekommt, erhält eine steuerfinanzierte [[grundsicherung|Grundsicherung]]. Ihr Name hat sich mehrfach geändert:

- **2005**: Mit den **[Hartz-Reformen](wiki:Hartz-Konzept|Hartz concept)** der Regierung [Schröder](wiki:Gerhard Schröder|Gerhard Schröder) wurden Arbeitslosenhilfe und Sozialhilfe zum **[Arbeitslosengeld II](wiki:Arbeitslosengeld II)** zusammengelegt — umgangssprachlich „Hartz IV“. Leitmotiv: „Fördern und Fordern“.
- **2023**: Die [Ampelkoalition](wiki:Ampelkoalition|Traffic light coalition) ersetzte es durch das **[Bürgergeld](wiki:Bürgergeld|Bürgergeld)** mit weniger Sanktionen und höherem Schonvermögen.
- **1. Juli 2026**: Die Koalition aus Union und SPD benannte es in **Grundsicherungsgeld** um („Neue Grundsicherung“) und verschärfte Mitwirkungspflichten und Sanktionen wieder (Stand 2026).[^wiki-buergergeld]

Wichtig: Das **Arbeitslosengeld (I)** ist dagegen eine Versicherungsleistung — man bekommt es für eine begrenzte Zeit, wenn man vorher eingezahlt hat.`,
    },
    {
      id: 'quiz-sozial', type: 'quiz', title: 'Beitrag oder Steuer?',
      question: 'Welche Leistungen werden über **Beiträge** der Sozialversicherung finanziert (nicht aus Steuern)?',
      options: [
        { text: 'Arbeitslosengeld (I)', correct: true, why: 'Versicherungsleistung der Arbeitslosenversicherung.' },
        { text: 'Grundsicherungsgeld (früher Bürgergeld)', correct: false, why: 'Steuerfinanziert und bedürftigkeitsabhängig.' },
        { text: 'Altersrente der gesetzlichen Rentenversicherung', correct: true, why: 'Beitragsfinanziert, mit einem großen Steuerzuschuss des Bundes.' },
        { text: 'Kindergeld', correct: false, why: 'Kindergeld wird aus Steuern bezahlt.' },
        { text: 'Leistungen bei einem Arbeitsunfall', correct: true, why: 'Gesetzliche Unfallversicherung — die Beiträge zahlt allein der Arbeitgeber.' },
      ],
    },
    {
      id: 'fact-weltweit', type: 'callout', tone: 'fact', title: 'Ein deutscher Exportschlager',
      md: `Bismarcks Modell der beitragsfinanzierten Sozialversicherung wurde weltweit nachgeahmt; Fachleute sprechen vom **„Bismarck-Modell“** — im Unterschied zum steuerfinanzierten **„Beveridge-Modell“** Großbritanniens (etwa mit dem staatlichen Gesundheitsdienst [NHS](wiki:National Health Service|National Health Service)).`,
    },
    {
      id: 'recall-generation', type: 'recall', title: 'Erkläre es',
      prompt: 'Erkläre das **Umlageverfahren** der Rente und warum der demografische Wandel es unter Druck setzt. Welche Stellschrauben gibt es?',
      answer: `Im Umlageverfahren werden die Beiträge der heute Erwerbstätigen direkt an die heutigen Rentner ausgezahlt, nichts wird angespart (Generationenvertrag). Weil die Geburtenrate niedrig ist und die Lebenserwartung steigt, kommen auf immer weniger Beitragszahler immer mehr Rentner, die zudem länger Rente beziehen. Stellschrauben: **höhere Beiträge**, **niedrigeres Rentenniveau**, **späteres Renteneintrittsalter**, **mehr Steuerzuschuss**, mehr Beitragszahler (Zuwanderung, Erwerbsbeteiligung von Frauen und Älteren) oder ergänzende **[kapitalgedeckte](wiki:Kapitaldeckungsverfahren) Vorsorge**.`,
      hints: ['Wer bezahlt heute die Rente von heute?', 'Vier Stellschrauben: Beitrag, Niveau, Alter, Steuern.'],
      cards: ['umlage', 'stellschrauben'],
    },
  ],
  cards: [
    { id: 'art20', front: 'Wo ist das Sozialstaatsprinzip verankert?', back: 'In **Art. 20 Abs. 1 GG** („demokratischer und sozialer Bundesstaat“).' },
    { id: 'fuenf', front: 'Die fünf Zweige der Sozialversicherung mit Gründungsjahr', back: 'Kranken- **1883**, Unfall- **1884**, Renten- **1889**, Arbeitslosen- **1927**, Pflegeversicherung **1995**.' },
    { id: 'bismarck', front: 'Wer führte die Sozialversicherung ein — und warum?', back: '**Otto von Bismarck** in den 1880er-Jahren, um die soziale Lage der Arbeiter zu verbessern und der Sozialdemokratie Zulauf zu nehmen.' },
    { id: 'unfall', front: 'Wer zahlt die Beiträge zur gesetzlichen Unfallversicherung?', back: '**Allein die Arbeitgeber**.' },
    { id: 'rentensatz', front: 'Beitragssatz der Rentenversicherung (Stand 2026)?', back: '**18,6 %** des Bruttolohns, je zur Hälfte von Arbeitnehmer und Arbeitgeber.' },
    { id: 'gesamt', front: 'Wie hoch sind alle Sozialversicherungsbeiträge zusammen ungefähr?', back: 'Rund **40 %** des Bruttolohns.' },
    { id: 'umlage', front: 'Was ist das Umlageverfahren (Generationenvertrag)?', back: 'Die Beiträge der heute Arbeitenden finanzieren direkt die Renten der heutigen Rentner; nichts wird angespart.' },
    { id: 'dynamisch', front: 'Was brachte die Rentenreform von 1957?', back: 'Die **dynamische Rente** (an die Löhne gekoppelt) im Umlageverfahren — unter Adenauer.' },
    { id: 'stellschrauben', front: 'Stellschrauben der Rentenfinanzierung', back: 'Beitragssatz, Rentenniveau, Renteneintrittsalter, Steuerzuschuss, mehr Beitragszahler, private/kapitalgedeckte Vorsorge.' },
    { id: 'solidar', front: 'Was bedeutet das Solidaritätsprinzip in der Krankenversicherung?', back: 'Beiträge nach Einkommen, Leistungen nach Bedarf; Familienangehörige ohne Einkommen sind beitragsfrei mitversichert.' },
    { id: 'subsidiar', front: 'Subsidiaritätsprinzip im Sozialstaat?', back: 'Erst Selbsthilfe, dann Familie, dann der Staat — z. B. Anrechnung von Vermögen bei der Grundsicherung.' },
    { id: 'hartz', front: 'Hartz IV — was, wann, von wem?', back: 'Das **Arbeitslosengeld II** ab **2005**, Teil der Hartz-Reformen der Regierung **Schröder** (Agenda 2010).' },
    { id: 'namen', front: 'Die Namen der Grundsicherung seit 2005', back: 'Arbeitslosengeld II („Hartz IV“, 2005) → **Bürgergeld** (2023) → **Grundsicherungsgeld** (seit 1. Juli 2026).' },
    { id: 'alg1', front: 'Unterschied Arbeitslosengeld (I) und Grundsicherung', back: 'ALG I: befristete **Versicherungsleistung** nach vorheriger Beitragszahlung. Grundsicherung: **steuerfinanziert**, abhängig von Bedürftigkeit.' },
    { id: 'modelle', front: 'Bismarck-Modell vs. Beveridge-Modell', back: 'Bismarck: beitragsfinanzierte Sozialversicherung (Deutschland). Beveridge: steuerfinanziertes System (z. B. britischer NHS).' },
  ],
};
