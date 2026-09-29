export default {
  id: 'staatsfinanzen',
  title: 'Steuern & Staatshaushalt',
  summary: 'Rund eine Billion Euro Steuern nimmt der Staat jedes Jahr ein. Welche Steuern es gibt, wer sie bekommt, wofür der Bund sein Geld ausgibt und warum um die [[schuldenbremse|Schuldenbremse]] so heftig gestritten wird.',
  minutes: 25,
  goals: [
    'Die wichtigsten Steuern und ihre Sätze nennen',
    'Erklären, wie Bund, Länder und Gemeinden die Steuern teilen',
    'Größe und größte Posten des [[bundeshaushalt|Bundeshaushalts]] kennen',
    'Die [[schuldenbremse|Schuldenbremse]] und ihre Reform 2025 erklären',
  ],
  blocks: [
    {
      id: 'steuern', type: 'text', title: 'Steuern, Gebühren, Beiträge',
      md: `
Der Staat finanziert sich über drei Arten von Abgaben:

- **Steuern** sind Zahlungen **ohne direkte Gegenleistung** — man zahlt Einkommensteuer nicht für eine bestimmte Straße oder Schule. So definiert es die Abgabenordnung.
- **Gebühren** zahlt man für eine konkrete Leistung (Personalausweis, Müllabfuhr).
- **Beiträge** zahlt man für eine mögliche Leistung, etwa an die Sozialversicherungen.

**2025** nahmen Bund, Länder und Gemeinden zusammen rund **990 Milliarden Euro** an Steuern ein.[^destatis-steuern-2025] Die beiden mit Abstand ergiebigsten Steuern:

1. **[[umsatzsteuer|Umsatzsteuer]]** („Mehrwertsteuer“): 310 Mrd. €
2. **Lohnsteuer** (die Einkommensteuer der Arbeitnehmer, direkt vom Gehalt abgezogen): 263 Mrd. €`,
    },
    {
      id: 'tabelle', type: 'text', title: 'Die wichtigsten Steuern im Überblick',
      md: `
<table>
<tr><th>Steuer</th><th>Wer zahlt / worauf?</th><th>Satz (Stand 2026)</th></tr>
<tr><td>Einkommensteuer / Lohnsteuer</td><td>Einkommen von Personen</td><td>0 % bis zum Grundfreibetrag (12.348 €), dann 14 % bis 42 %; 45 % „Reichensteuer“ ab rund 278.000 €</td></tr>
<tr><td>Umsatzsteuer</td><td>Verbraucher beim Kauf (über die Unternehmen)</td><td>19 %; ermäßigt 7 % (Lebensmittel, Bücher, ÖPNV, seit 2026 auch Speisen im Restaurant)</td></tr>
<tr><td>Körperschaftsteuer</td><td>Gewinne von Kapitalgesellschaften (GmbH, AG)</td><td>15 % (soll ab 2028 schrittweise auf 10 % sinken)</td></tr>
<tr><td>Gewerbesteuer</td><td>Gewinne von Gewerbebetrieben</td><td>je nach Gemeinde („Hebesatz“)</td></tr>
<tr><td>Solidaritätszuschlag</td><td>Aufschlag auf Einkommen- und Körperschaftsteuer</td><td>5,5 % — seit 2021 nur noch für hohe Einkommen und Unternehmen</td></tr>
<tr><td>Energiesteuer, Tabaksteuer, Kfz-Steuer …</td><td>Verbrauch bestimmter Güter</td><td>jeweils eigene Sätze</td></tr>
</table>

Die Einkommensteuer ist **progressiv**: Wer mehr verdient, zahlt nicht nur absolut mehr, sondern einen höheren *Anteil*. Wichtig: Der höhere Satz gilt nur für den Teil des Einkommens, der über der jeweiligen Grenze liegt (**Grenzsteuersatz**) — deshalb kann eine Gehaltserhöhung nie zu weniger Netto führen.`,
    },
    {
      id: 'calc-ust', type: 'numeric', title: 'Mehrwertsteuer im Preis',
      question: 'Ein Fernseher kostet **netto** 500 €. Wie hoch ist der **Bruttopreis** mit 19 % Umsatzsteuer?',
      answer: 595, tolerance: 0.5, unit: '€',
      hint: '19 % von 500 € sind 95 €.',
      explain: '$500 \\cdot 1{,}19 = 595$ €. Achtung beim Rückrechnen: Die Steuer in einem Bruttopreis von 595 € ist **nicht** 19 % von 595 €, sondern $595 - 595/1{,}19 = 95$ €.',
    },
    {
      id: 'verteilung', type: 'text', title: 'Wer bekommt welche Steuer?',
      md: `
Deutschland ist ein Bundesstaat — also müssen die Einnahmen verteilt werden. Das regelt das Grundgesetz (Art. 106):

- **Gemeinschaftsteuern** — die großen Brocken Einkommen-, Körperschaft- und Umsatzsteuer — werden **zwischen Bund, Ländern und Gemeinden geteilt**. Sie machen rund drei Viertel aller Steuereinnahmen aus.
- **Bundessteuern:** z. B. Energie-, Tabak-, Kfz- und Stromsteuer, Solidaritätszuschlag.
- **Landessteuern:** z. B. Grunderwerb-, Erbschaft- und Biersteuer.
- **Gemeindesteuern:** vor allem **Gewerbesteuer** und **Grundsteuer**.

2025 blieben nach der Verteilung rund **389 Mrd. € beim Bund**, **415 Mrd. € bei den Ländern** und **151 Mrd. € bei den Gemeinden**; ein Teil fließt als Eigenmittel an die EU. Zusätzlich gleicht der **Finanzausgleich** Unterschiede zwischen reichen und armen Ländern teilweise aus.`,
    },
    {
      id: 'match-steuer', type: 'match', title: 'Welche Steuer geht an wen?',
      pairs: [
        ['Gewerbesteuer', 'Gemeinden'],
        ['Umsatzsteuer', 'Bund, Länder und Gemeinden (Gemeinschaftsteuer)'],
        ['Energiesteuer', 'Bund'],
        ['Grunderwerbsteuer', 'Länder'],
        ['Grundsteuer', 'Gemeinden (auf Grundbesitz)'],
        ['Solidaritätszuschlag', 'Bund (Aufschlag von 5,5 %)'],
      ],
    },
    {
      id: 'haushalt', type: 'text', title: 'Der Bundeshaushalt 2026',
      md: `
Der **[[bundeshaushalt|Bundeshaushalt]]** ist ein Gesetz: Die Regierung legt einen Entwurf vor, der **Bundestag** beschließt ihn — das **Budgetrecht** gilt als „Königsrecht“ des Parlaments. Für **2026** beschloss der Bundestag am 28. November 2025 Ausgaben von **524,54 Milliarden Euro**.[^bundestag-haushalt-2026]

Die größten Posten (Einzelpläne):

1. **Arbeit und Soziales: 197,3 Mrd. €** — mehr als ein Drittel, vor allem Zuschüsse an die Rentenversicherung und das Bürgergeld
2. **Verteidigung: 82,7 Mrd. €**
3. **Verkehr: 27,9 Mrd. €**

Hinzu kommen **Sondervermögen** außerhalb des Kernhaushalts, etwa für die Bundeswehr und für Infrastruktur. Die **Nettokreditaufnahme** — also neue Schulden — liegt 2026 bei rund **98 Mrd. €**, davon ein großer Teil für Verteidigung.`,
    },
    {
      id: 'calc-anteil', type: 'numeric', title: 'Anteil der Sozialausgaben',
      question: 'Der Etat für Arbeit und Soziales beträgt 197,3 Mrd. € von insgesamt 524,5 Mrd. €. Wie viel Prozent des Bundeshaushalts sind das? (gerundet auf ganze Prozent)',
      answer: 38, tolerance: 0.6, unit: '%',
      hint: '197,3 geteilt durch 524,5.',
      explain: '$197{,}3 / 524{,}5 \\approx 0{,}376$, also rund **38 %**. Jeder dritte Euro des Bundes fließt in diesen einen Einzelplan — der mit Abstand größte Posten.',
    },
    {
      id: 'schuldenbremse', type: 'text', title: 'Die Schuldenbremse',
      md: `
Nach der Finanzkrise schrieb der Bundestag **2009** die **[[schuldenbremse|Schuldenbremse]]** ins Grundgesetz (Art. 109 und 115): Der Bund darf sich strukturell — also unabhängig von der Konjunktur — nur noch mit **0,35 % des BIP** pro Jahr neu verschulden; die Länder zunächst gar nicht. In Notlagen (z. B. Corona 2020–2022) kann der Bundestag Ausnahmen beschließen.

**Reform 2025:** Im März 2025 änderte der alte Bundestag noch vor der Konstituierung des neuen das Grundgesetz mit Zweidrittelmehrheit:

- **Verteidigungsausgaben** über 1 % des BIP sind von der Schuldenbremse **ausgenommen**.
- Ein **[[sondervermoegen|Sondervermögen]] für Infrastruktur und Klimaneutralität** von **500 Mrd. €** über zwölf Jahre wird geschaffen, davon 100 Mrd. € für die Länder.
- Die **Länder** dürfen sich künftig ebenfalls mit 0,35 % des BIP verschulden.

**Die Debatte:** Befürworter der strengen Schuldenbremse sehen **Generationengerechtigkeit** — Schulden von heute sind Steuern von morgen, und steigende Zinsen engen den Spielraum ein. Kritiker halten sie für eine **Investitionsbremse**: Marode Brücken, langsames Internet und die Bundeswehr zeigten, dass zu wenig investiert wurde. Zum Vergleich: Die EU (**Maastricht-Kriterien**) erlaubt ein Defizit von bis zu 3 % des BIP und einen Schuldenstand von 60 %. Deutschlands gesamtstaatliches Defizit lag 2025 bei **2,4 %**.`,
    },
    {
      id: 'timeline', type: 'game', viz: 'timeline', title: 'Staatsfinanzen: Chronologie',
      params: { mode: 'sort', events: [
        { year: 1991, label: 'Soli eingeführt', detail: 'Zunächst befristet; seit 1995 dauerhaft erhoben.' },
        { year: 1992, label: 'Maastricht: 3 % / 60 %', detail: 'Vertrag von Maastricht legt die Defizit- und Schuldenkriterien fest.' },
        { year: 2009, label: 'Schuldenbremse im GG', detail: 'Föderalismusreform II nach der Finanzkrise.' },
        { year: 2021, label: 'Soli für die meisten weg', detail: 'Seit 2021 zahlen ihn nur noch hohe Einkommen und Unternehmen.' },
        { year: 2022, label: '100 Mrd. für Bundeswehr', detail: 'Sondervermögen Bundeswehr nach dem russischen Angriff auf die Ukraine („Zeitenwende“).' },
        { year: 2025, label: 'Reform Schuldenbremse', detail: 'Ausnahme für Verteidigung, 500 Mrd. € Sondervermögen Infrastruktur.' },
      ] },
    },
    {
      id: 'quiz-progression', type: 'quiz', title: 'Mythos Steuerprogression',
      question: 'Anna bekommt eine Gehaltserhöhung, die sie in eine höhere „Steuerstufe“ bringt. Was stimmt?',
      options: [
        { text: 'Ihr Netto steigt — der höhere Satz gilt nur für den zusätzlichen Teil des Einkommens.', correct: true, why: 'Deutschland hat einen stufenlosen Tarif mit steigendem Grenzsteuersatz; es wird nie das ganze Einkommen höher besteuert.' },
        { text: 'Sie kann netto weniger haben als vorher, weil nun ihr ganzes Einkommen höher besteuert wird.', correct: false, why: 'Ein verbreiteter Irrtum. Bei der Einkommensteuer ist das ausgeschlossen.' },
        { text: 'Ab der Erhöhung zahlt sie den Spitzensteuersatz von 42 % auf alles.', correct: false, why: '42 % gelten 2026 erst ab 69.879 € zu versteuerndem Einkommen — und auch dann nur auf den Teil darüber.' },
      ],
    },
    {
      id: 'fact-steuerzahlergedenktag', type: 'callout', tone: 'fact', title: 'Wie viel Steuern zahlt man im Leben?',
      md: 'Rechnet man Umsatzsteuer, Energiesteuer und Sozialabgaben mit, geht bei durchschnittlichen Arbeitnehmerhaushalten in Deutschland rund die Hälfte des Einkommens an Staat und Sozialversicherungen. Der Bund der Steuerzahler veranschaulicht das mit dem jährlichen „Steuerzahlergedenktag“ im Juli — erst ab diesem Tag arbeite man rechnerisch „für die eigene Tasche“.',
    },
    {
      id: 'recall', type: 'recall', title: 'Die große Debatte',
      prompt: 'Erkläre die **Schuldenbremse** und nenne je ein Argument dafür und dagegen.',
      answer: 'Die Schuldenbremse (seit 2009 im Grundgesetz) begrenzt die strukturelle Neuverschuldung des Bundes auf **0,35 % des BIP** pro Jahr; Ausnahmen gibt es in Notlagen und seit 2025 für Verteidigungsausgaben über 1 % des BIP. **Dafür:** Generationengerechtigkeit — heutige Schulden müssen künftige Generationen mit Zinsen bezahlen; sie zwingt zu Prioritäten. **Dagegen:** Sie bremst notwendige Investitionen (Infrastruktur, Klimaschutz, Digitalisierung), die künftigen Generationen ebenfalls nützen; deshalb wurde 2025 ein Sondervermögen von 500 Mrd. € geschaffen.',
      hints: ['Welche Zahl steht im Grundgesetz?', 'Was änderte sich im März 2025?'],
      cards: ['schuldenbremse', 'reform-2025'],
    },
  ],
  cards: [
    { id: 'steuer-def', front: 'Was unterscheidet eine Steuer von einer Gebühr?', back: 'Steuern werden ohne direkte Gegenleistung erhoben; Gebühren für eine konkrete Leistung (z. B. Ausweis).' },
    { id: 'einnahmen', front: 'Gesamte Steuereinnahmen in Deutschland 2025', back: 'Rund 990 Mrd. € (Bund, Länder, Gemeinden).' },
    { id: 'top2', front: 'Die zwei ergiebigsten Steuern', back: 'Umsatzsteuer (~310 Mrd. €) und Lohnsteuer (~263 Mrd. €) — Stand 2025.' },
    { id: 'ust', front: 'Umsatzsteuersätze in Deutschland', back: '19 % regulär, 7 % ermäßigt (u. a. Lebensmittel, Bücher; seit 2026 Speisen in der Gastronomie).' },
    { id: 'est', front: 'Einkommensteuer: Grundfreibetrag und Spitzensteuersatz (2026)', back: 'Grundfreibetrag 12.348 €; Satz steigt von 14 % auf 42 % (ab 69.879 €); 45 % Reichensteuer ab rund 278.000 €.' },
    { id: 'progressiv', front: 'Was heißt „progressive“ Einkommensteuer?', back: 'Mit steigendem Einkommen steigt der Steuersatz — höhere Einkommen zahlen einen größeren Anteil (Grenzsteuersatz gilt nur für den Teil über der Grenze).' },
    { id: 'kst', front: 'Körperschaftsteuersatz', back: '15 % auf Gewinne von Kapitalgesellschaften (geplante Senkung auf 10 % bis 2032).' },
    { id: 'soli', front: 'Solidaritätszuschlag: Höhe und wer zahlt ihn heute?', back: '5,5 % auf Einkommen-/Körperschaftsteuer; seit 2021 nur noch hohe Einkommen und Unternehmen.' },
    { id: 'gemeinschaft', front: 'Welche Steuern sind Gemeinschaftsteuern?', back: 'Einkommen-/Lohnsteuer, Körperschaftsteuer, Umsatzsteuer — geteilt zwischen Bund, Ländern (und Gemeinden).' },
    { id: 'gemeinde', front: 'Wichtigste Steuern der Gemeinden', back: 'Gewerbesteuer und Grundsteuer.' },
    { id: 'haushalt-2026', front: 'Bundeshaushalt 2026: Gesamtvolumen', back: '524,54 Mrd. € (beschlossen am 28.11.2025).' },
    { id: 'groesster-posten', front: 'Größter Einzelplan im Bundeshaushalt', back: 'Arbeit und Soziales: ~197 Mrd. € (2026), vor allem Rentenzuschüsse — gefolgt von Verteidigung (~83 Mrd. €).' },
    { id: 'budgetrecht', front: 'Wer beschließt den Bundeshaushalt?', back: 'Der Bundestag (Budgetrecht, „Königsrecht des Parlaments“) — per Haushaltsgesetz.' },
    { id: 'schuldenbremse', front: 'Schuldenbremse: seit wann und welche Grenze?', back: 'Seit 2009 im Grundgesetz; strukturelle Neuverschuldung des Bundes max. 0,35 % des BIP.' },
    { id: 'reform-2025', front: 'Reform der Schuldenbremse im März 2025', back: 'Verteidigung über 1 % des BIP ausgenommen; 500 Mrd. € Sondervermögen Infrastruktur und Klimaneutralität; Länder dürfen 0,35 % des BIP Schulden machen.' },
    { id: 'maastricht', front: 'Maastricht-Kriterien für Staatsfinanzen', back: 'Defizit max. 3 % des BIP, Schuldenstand max. 60 % des BIP.' },
    { id: 'defizit-2025', front: 'Gesamtstaatliche Defizitquote Deutschlands 2025', back: '2,4 % des BIP (rund 107 Mrd. €).' },
  ],
};
