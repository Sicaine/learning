export default {
  id: 'marktwirtschaft',
  title: 'Soziale Marktwirtschaft',
  summary: 'Deutschlands Wirtschaftsordnung ist ein Kompromiss: so viel Markt wie möglich, so viel Staat wie nötig. Wer sie erfunden hat, wie sie funktioniert und warum sie bis heute umstritten ist.',
  minutes: 20,
  goals: [
    'Die [[soziale-marktwirtschaft|Soziale Marktwirtschaft]] von freier Marktwirtschaft und Planwirtschaft abgrenzen',
    'Ludwig Erhard, Alfred Müller-Armack und die [[waehrungsreform-1948|Währungsreform 1948]] einordnen',
    'Die Aufgaben des Staates nennen: Wettbewerb sichern, sozial ausgleichen, Rahmen setzen',
    'Das [[magisches-viereck|magische Viereck]] der Wirtschaftspolitik aufzählen',
  ],
  blocks: [
    {
      id: 'drei-ordnungen', type: 'text', title: 'Drei Arten, eine Wirtschaft zu organisieren',
      md: `
Jede Gesellschaft muss entscheiden: **Wer bestimmt, was produziert wird, wie viel und zu welchem Preis?**

- In der **freien Marktwirtschaft** entscheiden Angebot und Nachfrage. Preise entstehen auf Märkten, Unternehmen konkurrieren, der Staat hält sich weitgehend heraus. Das Leitbild geht auf [Adam Smith](wiki:Adam Smith) zurück („unsichtbare Hand“, 1776).
- In der **Planwirtschaft** ([Zentralverwaltungswirtschaft](wiki:Zentralverwaltungswirtschaft|Centrally planned economy)) legt eine staatliche Behörde Produktionsmengen und Preise fest — so in der [Sowjetunion](wiki:Sowjetunion|Soviet Union) und in der [DDR](wiki:Deutsche Demokratische Republik|East Germany) mit ihren [Fünfjahrplänen](wiki:Fünfjahresplan|Five-year plan).
- Die **[[soziale-marktwirtschaft|Soziale Marktwirtschaft]]** ist ein dritter Weg: Der Markt steuert die Wirtschaft, aber der Staat setzt Regeln, schützt den Wettbewerb und gleicht soziale Härten aus.[^bpb-sozmarkt]

Das [Grundgesetz](wiki:Grundgesetz für die Bundesrepublik Deutschland|Basic Law for the Federal Republic of Germany) schreibt übrigens keine bestimmte Wirtschaftsordnung vor. Die Soziale Marktwirtschaft ist politisch gewollt, nicht verfassungsrechtlich festgelegt — erst der [Staatsvertrag zur Währungsunion](wiki:Vertrag über die Schaffung einer Währungs-, Wirtschafts- und Sozialunion|Treaty Establishing a Monetary, Economic and Social Union between the German Democratic Republic and the Federal Republic of Germany) mit der DDR von 1990 nennt sie ausdrücklich als gemeinsame Wirtschaftsordnung.`,
    },
    {
      id: 'erfinder', type: 'text', title: 'Die Väter: Eucken, Müller-Armack, Erhard',
      md: `
Nach 1945 lag Deutschland in Trümmern, Waren gab es nur auf [Bezugsschein](wiki:Lebensmittelkarte|Ration stamp), auf dem [Schwarzmarkt](wiki:Schwarzmarkt|Black market) zahlte man mit Zigaretten. Drei Namen prägten den Neuanfang:

- **[Walter Eucken](wiki:Walter Eucken)** und die **Freiburger Schule** lieferten mit dem **[[ordoliberalismus|Ordoliberalismus]]** das theoretische Fundament: Der Staat soll nicht in Preise eingreifen, aber eine *Ordnung* schaffen, in der echter Wettbewerb herrscht — also [Monopole](wiki:Monopol|Monopoly) und [Kartelle](wiki:Kartell|Cartel) verhindern.
- **[Alfred Müller-Armack](wiki:Alfred Müller-Armack)** prägte 1946/47 den Begriff „Soziale Marktwirtschaft“: Die Freiheit des Marktes solle mit sozialem Ausgleich verbunden werden.
- **[Ludwig Erhard](wiki:Ludwig Erhard)** setzte es politisch um — zuerst als Direktor der Wirtschaftsverwaltung der Westzonen, dann von 1949 bis 1963 als erster [Bundeswirtschaftsminister](wiki:Bundesministerium für Wirtschaft und Energie|Federal Ministry for Economic Affairs and Energy) unter [Konrad Adenauer](wiki:Konrad Adenauer), schließlich 1963–1966 als Bundeskanzler. Sein Buch und Slogan: **„Wohlstand für alle“** (1957).[^wiki-erhard]

Die Initialzündung war die **[[waehrungsreform-1948|Währungsreform]] vom 20./21. Juni 1948**: In den Westzonen ersetzte die **[D-Mark](wiki:D-Mark|Deutsche Mark)** die wertlose [Reichsmark](wiki:Reichsmark). Jeder bekam ein „Kopfgeld“ von zunächst 40 D-Mark. Fast zeitgleich hob Erhard — gegen den Rat vieler — zahlreiche Preisvorschriften auf. Über Nacht füllten sich die Schaufenster, weil Händler gehortete Waren wieder verkauften.`,
    },
    {
      id: 'timeline', type: 'viz', viz: 'timeline', title: 'Von der Trümmerzeit zum Wirtschaftswunder',
      params: { events: [
        { year: 1776, label: 'Adam Smith: Wohlstand', detail: '„Der Wohlstand der Nationen“ — Gründungstext der Marktwirtschaftslehre.' },
        { year: 1948, label: 'Währungsreform: D-Mark', detail: '20./21. Juni 1948 in den Westzonen; Erhard hebt zugleich viele Preisbindungen auf.' },
        { year: 1949, label: 'Erhard Wirtschaftsminister', detail: 'Erster Bundeswirtschaftsminister (bis 1963) im Kabinett Adenauer.' },
        { year: 1957, label: '„Wohlstand für alle“', detail: 'Erhards Buch; im selben Jahr wird das Kartellgesetz (GWB) beschlossen.' },
        { year: 1958, label: 'Bundeskartellamt', detail: 'Nimmt am 1. Januar 1958 die Arbeit auf; heute Sitz in Bonn.' },
        { year: 1967, label: 'Stabilitätsgesetz', detail: 'Legt die Ziele des „magischen Vierecks“ fest.' },
        { year: 1990, label: 'Währungsunion mit DDR', detail: '1. Juli 1990: D-Mark in der DDR; der Staatsvertrag nennt die Soziale Marktwirtschaft als Wirtschaftsordnung.' },
      ] },
      task: 'Tippe auf die Währungsreform und das Stabilitätsgesetz und lies die Details. Was verbindet beide mit Ludwig Erhard?',
    },
    {
      id: 'staat', type: 'text', title: 'Was der Staat in der Sozialen Marktwirtschaft tut',
      md: `
Die Grundidee: **Der Markt ist effizient, aber blind** — für Machtballung, für Menschen, die nicht mithalten können, und für Schäden an Umwelt und Gesellschaft. Deshalb übernimmt der Staat drei Rollen:

1. **Wettbewerb schützen.** Das **[Gesetz gegen Wettbewerbsbeschränkungen](wiki:Gesetz gegen Wettbewerbsbeschränkungen)** (GWB, 1957) verbietet Kartelle und kontrolliert Fusionen; das **[[bundeskartellamt|Bundeskartellamt]]** setzt es durch. Wettbewerb soll dafür sorgen, dass Preise sinken und Qualität steigt.
2. **Sozial ausgleichen.** [Sozialversicherungen](wiki:Sozialversicherung (Deutschland)|Social security in Germany) (Rente, Kranken-, Arbeitslosen-, Pflege-, Unfallversicherung), progressive Steuern, [Kindergeld](wiki:Kindergeld|Child benefit), [Bürgergeld](wiki:Bürgergeld). Mehr dazu in der Lektion zum Sozialstaat.
3. **Den Rahmen setzen.** Eigentumsrechte, Verträge, Verbraucher- und Umweltschutz, Arbeitsrecht.

Dazu kommt eine deutsche Besonderheit: die **[[tarifautonomie|Tarifautonomie]]** (Art. 9 Abs. 3 GG). [Gewerkschaften](wiki:Gewerkschaft|Trade union) und [Arbeitgeberverbände](wiki:Arbeitgeberverband) handeln Löhne selbst aus — ohne den Staat. Der gesetzliche **[Mindestlohn](wiki:Mindestlohn|Minimum wage)** (seit 2015) ist eine Untergrenze darunter; er liegt seit 1. Januar 2026 bei **13,90 € pro Stunde** und soll 2027 auf 14,60 € steigen (Stand: September 2026). Hinzu kommt die **[Mitbestimmung](wiki:Mitbestimmung|Worker representation on corporate boards of directors)**: In großen Unternehmen sitzen Arbeitnehmervertreter im [Aufsichtsrat](wiki:Aufsichtsrat|Supervisory board).`,
    },
    {
      id: 'quiz-ordnung', type: 'quiz', title: 'Welche Wirtschaftsordnung?',
      question: 'Ein Staat legt fest, dass ein Brot überall genau 0,52 Mark kostet und jede Bäckerei eine vorgegebene Menge backen muss. Welche Ordnung ist das?',
      options: [
        { text: 'Planwirtschaft', correct: true, why: 'Genau so funktionierte es in der DDR: staatlich festgesetzte Preise und Mengen.' },
        { text: 'Soziale Marktwirtschaft', correct: false, why: 'Hier bilden sich Preise am Markt; der Staat setzt nur Regeln und gleicht sozial aus.' },
        { text: 'Freie Marktwirtschaft', correct: false, why: 'Dort würde der Staat Preise gerade *nicht* festsetzen.' },
        { text: 'Ordoliberalismus', correct: false, why: 'Der Ordoliberalismus lehnt staatliche Preisfestsetzung ausdrücklich ab.' },
      ],
    },
    {
      id: 'viereck', type: 'text', title: 'Das magische Viereck',
      md: `
Das **[Stabilitäts- und Wachstumsgesetz](wiki:Stabilitäts- und Wachstumsgesetz)** von 1967 verpflichtet Bund und Länder auf vier Ziele — das **[[magisches-viereck|magische Viereck]]**:

1. **Stabiles Preisniveau** (geringe [[inflation|Inflation]])
2. **Hoher Beschäftigungsstand** (niedrige Arbeitslosigkeit)
3. **Außenwirtschaftliches Gleichgewicht** (Exporte und Importe in Balance)
4. **Stetiges und angemessenes Wirtschaftswachstum**

„Magisch“ heißt es, weil man nie alle vier gleichzeitig perfekt erreicht: Mehr Wachstum und Beschäftigung treiben oft die Preise; Deutschlands hohe Exportüberschüsse verfehlen das dritte Ziel seit Jahren. Häufig wird das Viereck heute zum **Sechseck** erweitert — um **gerechte Einkommensverteilung** und **Umweltschutz**.`,
    },
    {
      id: 'match-begriffe', type: 'match', title: 'Wer oder was?',
      pairs: [
        ['Ludwig Erhard', 'Wirtschaftsminister 1949–1963, „Wohlstand für alle“'],
        ['Alfred Müller-Armack', 'Prägte den Begriff „Soziale Marktwirtschaft“'],
        ['Walter Eucken', 'Freiburger Schule, Ordoliberalismus'],
        ['Adam Smith', '„Unsichtbare Hand“ des Marktes (1776)'],
        ['Bundeskartellamt', 'Verhindert Kartelle und kontrolliert Fusionen'],
        ['Tarifautonomie', 'Gewerkschaften und Arbeitgeber verhandeln Löhne selbst'],
      ],
    },
    {
      id: 'order-viereck', type: 'order', title: 'Chronologie',
      prompt: 'Bring die Ereignisse in die zeitliche Reihenfolge (frühestes oben).',
      items: ['Währungsreform: Einführung der D-Mark', 'Ludwig Erhard wird Bundeswirtschaftsminister', 'Das Bundeskartellamt nimmt die Arbeit auf', 'Stabilitätsgesetz mit dem magischen Viereck', 'Währungsunion mit der DDR', 'Einführung des gesetzlichen Mindestlohns'],
      explain: '1948 → 1949 → 1958 → 1967 → 1990 → 2015.',
    },
    {
      id: 'fact-kopfgeld', type: 'callout', tone: 'fact', title: '40 D-Mark für jeden',
      md: 'Bei der Währungsreform 1948 erhielt jede Person in den Westzonen ein „Kopfgeld“ von 40 D-Mark, später weitere 20. Sparguthaben in Reichsmark wurden dagegen stark abgewertet — im Ergebnis auf etwa 6,5 D-Mark je 100 Reichsmark. Wer Sachwerte besaß (Häuser, Maschinen, Waren), kam gut davon; Sparer verloren den Großteil.[^wiki-waehrungsreform]',
    },
    {
      id: 'kritik', type: 'callout', tone: 'deep', title: 'Ist die Soziale Marktwirtschaft heute noch „sozial“ — oder noch „Markt“?',
      md: `
Die Debatte ist so alt wie das Modell. Kritik von **links**: Der Staat gleiche zu wenig aus, Vermögen seien sehr ungleich verteilt, Niedriglohn und [Leiharbeit](wiki:Arbeitnehmerüberlassung) hätten zugenommen. Kritik von **liberaler** Seite: Der Staat greife zu viel ein, Abgaben und Bürokratie seien zu hoch, die Sozialausgaben (größter Posten im Bundeshaushalt) wüchsen zu schnell.

Dazu kommen neue Fragen: Wie passt der Klimaschutz hinein („ökosoziale Marktwirtschaft“)? Wie geht man mit globalen Plattformkonzernen um, deren Marktmacht über Ländergrenzen reicht? Die Grundformel „so viel Markt wie möglich, so viel Staat wie nötig“ beantwortet nicht, *wie viel* jeweils nötig ist — genau darüber streitet die Politik.`,
    },
    {
      id: 'recall-sozmarkt', type: 'recall', title: 'Erklär es in zwei, drei Sätzen',
      prompt: 'Was ist der Kern der **Sozialen Marktwirtschaft** — und worin unterscheidet sie sich von der freien Marktwirtschaft und der Planwirtschaft?',
      answer: 'Preise und Produktion werden grundsätzlich über **Märkte und Wettbewerb** gesteuert (anders als in der Planwirtschaft, wo der Staat sie festlegt). Anders als in der freien Marktwirtschaft **setzt der Staat aber einen Rahmen**: Er schützt den Wettbewerb (Kartellrecht), sichert sozial ab (Sozialversicherungen, Steuern, Mindestlohn) und schafft Regeln wie Tarifautonomie und Mitbestimmung. Formel: „So viel Markt wie möglich, so viel Staat wie nötig.“',
      hints: ['Wer bestimmt die Preise?', 'Welche drei Aufgaben hat der Staat?'],
      cards: ['kern', 'staat-aufgaben'],
    },
  ],
  cards: [
    { id: 'kern', front: 'Soziale Marktwirtschaft — die Kurzformel', back: 'Marktwirtschaft mit staatlichem Rahmen und sozialem Ausgleich: „So viel Markt wie möglich, so viel Staat wie nötig.“' },
    { id: 'begriff', front: 'Wer prägte den Begriff „Soziale Marktwirtschaft“?', back: 'Alfred Müller-Armack (1946/47).' },
    { id: 'erhard', front: 'Ludwig Erhard — Ämter und Slogan', back: 'Bundeswirtschaftsminister 1949–1963, Bundeskanzler 1963–1966; „Wohlstand für alle“ (1957).' },
    { id: 'eucken', front: 'Ordoliberalismus — wer und was?', back: 'Walter Eucken, Freiburger Schule: Der Staat schafft eine Wettbewerbsordnung (gegen Monopole und Kartelle), greift aber nicht in Preise ein.' },
    { id: 'waehrungsreform', front: 'Wann war die Währungsreform in den Westzonen?', back: '20./21. Juni 1948 — die D-Mark ersetzt die Reichsmark.' },
    { id: 'kopfgeld', front: 'Wie hoch war das „Kopfgeld“ 1948?', back: 'Zunächst 40 D-Mark pro Person (später weitere 20).' },
    { id: 'kartellamt', front: 'Aufgabe des Bundeskartellamts (seit 1958)', back: 'Wettbewerb schützen: Kartelle verfolgen, Fusionen kontrollieren, Missbrauch von Marktmacht verhindern.' },
    { id: 'tarif', front: 'Tarifautonomie — was und wo geregelt?', back: 'Gewerkschaften und Arbeitgeber(verbände) handeln Löhne und Arbeitsbedingungen ohne Staat aus; Art. 9 Abs. 3 GG.' },
    { id: 'mindestlohn', front: 'Gesetzlicher Mindestlohn: seit wann, wie hoch (2026)?', back: 'Seit 2015; seit 1.1.2026: 13,90 € pro Stunde (2027: 14,60 €).' },
    { id: 'viereck', front: 'Die vier Ziele des magischen Vierecks', back: 'Stabiles Preisniveau, hoher Beschäftigungsstand, außenwirtschaftliches Gleichgewicht, stetiges angemessenes Wachstum (Stabilitätsgesetz 1967).' },
    { id: 'magisch', front: 'Warum heißt das Viereck „magisch“?', back: 'Weil sich die Ziele teils widersprechen und nie alle gleichzeitig vollständig erreichbar sind.' },
    { id: 'sechseck', front: 'Welche zwei Ziele erweitern das Viereck zum Sechseck?', back: 'Gerechte Einkommens- und Vermögensverteilung sowie Umweltschutz.' },
    { id: 'staat-aufgaben', front: 'Drei Aufgaben des Staates in der Sozialen Marktwirtschaft', back: 'Wettbewerb sichern, sozialen Ausgleich schaffen, einen verlässlichen Rechtsrahmen setzen.' },
    { id: 'gg', front: 'Schreibt das Grundgesetz die Soziale Marktwirtschaft vor?', back: 'Nein — es ist wirtschaftspolitisch neutral. Ausdrücklich genannt wird sie im Staatsvertrag zur Währungsunion mit der DDR (1990).' },
    { id: 'smith', front: 'Adam Smith — Werk und Bild', back: '„Der Wohlstand der Nationen“ (1776); die „unsichtbare Hand“ des Marktes.' },
  ],
};
