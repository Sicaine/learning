export default {
  id: 'mosfet',
  title: 'FET und MOSFET',
  summary: 'Ein Transistor, der nicht mit Strom, sondern mit einem elektrischen Feld gesteuert wird: Gate, Drain, Source, Schwellspannung — und warum moderne Schalter und Endstufen fast nur noch MOSFETs sind.',
  minutes: 30,
  needs: ['bipolartransistor'],
  goals: [
    'Die Anschlüsse [[mosfet|Gate, Drain und Source]] benennen und erklären, warum ein [[feldeffekttransistor|FET]] **spannungsgesteuert** ist',
    'Mit der [[schwellspannung]] $U_\\text{th}$ entscheiden, ob ein MOSFET sperrt oder leitet',
    'Den MOSFET als Schalter dimensionieren: Verlustleistung $P_V = I^2\\cdot R_{DS(on)}$ berechnen',
    'Den Unterschied zwischen [[bipolartransistor|Bipolartransistor]] (stromgesteuert) und FET (spannungsgesteuert) erklären',
    'Begründen, warum MOSFET-Gates gegen [[esd|elektrostatische Entladung]] empfindlich sind',
  ],
  blocks: [
    {
      id: 'idee', type: 'text', title: 'Ein Hahn, der mit Druck statt mit Strom gesteuert wird',
      md: `
Beim [[bipolartransistor|Bipolartransistor]] musst du einen kleinen **Basisstrom** liefern, damit ein großer Kollektorstrom fließt. Ein [Feldeffekttransistor](wiki:Feldeffekttransistor|Field-effect transistor) (FET) arbeitet anders: Zwischen **Source** (Quelle) und **Drain** (Abfluss) liegt ein leitfähiger **Kanal**, und seine Leitfähigkeit wird von der Spannung am **Gate** (Tor) bestimmt, über ein [elektrisches Feld](wiki:Elektrisches Feld|Electric field) — daher der Name.

Beim **MOSFET** (Metall-Oxid-Halbleiter-FET) sitzt das Gate wie eine Kondensatorplatte über einer hauchdünnen Isolierschicht aus [Siliziumdioxid](wiki:Siliciumdioxid|Silicon dioxide) und ist damit vom Kanal elektrisch **isoliert**. Legst du eine positive Spannung an das Gate eines n-Kanal-Typs, zieht das Feld Elektronen unter das Oxid und bildet erst dort den leitenden Kanal. Im Gleichstromfall fließt dabei **praktisch kein Gatestrom** — nur beim Umladen der Gate-Kapazität kurz ein Impuls.

Die Idee eines Feldeffekt-Bauteils ist alt: [Julius Edgar Lilienfeld](wiki:Julius Edgar Lilienfeld|Julius Edgar Lilienfeld) beschrieb sie schon in den 1920er-Jahren. Der erste funktionierende MOSFET entstand 1959 bei den [Bell Labs](wiki:Bell Laboratories|Bell Labs) (Mohamed Atalla und [Dawon Kahng](wiki:Dawon Kahng|Dawon Kahng)).[^et5-wp-mosfet] Heute stecken Milliarden davon in jedem [Mikrocontroller](wiki:Mikrocontroller|Microcontroller) — und einzelne, große als [Leistungs-MOSFET](wiki:Leistungs-MOSFET|Power MOSFET) in Netzteilen, Motorsteuerungen und Funkgeräte-Endstufen.`,
    },
    {
      id: 'aufbau', type: 'text', title: 'Schwellspannung und Kennlinienfeld',
      md: `
Wir betrachten den häufigsten Typ, den **n-Kanal-Anreicherungs-MOSFET** („selbstsperrend"): Bei $U_{GS} = 0$ gibt es keinen Kanal, der Transistor sperrt. Erst oberhalb der **[[schwellspannung|Schwellspannung]]** $U_\\text{th}$ (engl. *threshold voltage*, je nach Typ etwa 1 bis 4 V) bildet sich der Kanal.[^et5-wp-mosfet]

Mit steigendem $U_{GS}$ durchläuft er zwei Bereiche (vereinfachtes Modell, „Level 1"):

- **Triodenbereich** (ohmscher Bereich, $U_{DS} < U_{GS}-U_\\text{th}$): Der Kanal verhält sich wie ein **steuerbarer Widerstand**. Für kleine $U_{DS}$ gilt $R_{DS} \\approx 1/\\bigl(K\\,(U_{GS}-U_\\text{th})\\bigr)$. Hier arbeitet der MOSFET als **Schalter**.
- **Sättigungsbereich** ($U_{DS} > U_{GS}-U_\\text{th}$): Der Drainstrom hängt fast nur noch von $U_{GS}$ ab:
$$I_D = \\frac{K}{2}\\,(U_{GS}-U_\\text{th})^2$$
Hier arbeitet der MOSFET als **Verstärker** (steuerbare Stromquelle).

Der Name „Sättigung" ist beim FET anders belegt als beim Bipolartransistor — beim Bipolartransistor ist die Sättigung der *Schalt*bereich, beim FET ist es der *Verstärker*bereich.

Kennzeichnend für den **Schalterbetrieb** ist der **Durchlasswiderstand** $R_{DS(on)}$, den das Datenblatt für eine bestimmte Gate-Spannung angibt (häufig bei 10 V, bei „Logic-Level"-Typen bei 4,5 V). Leistungs-MOSFETs erreichen wenige Milliohm.`,
    },
    {
      id: 'video', type: 'video', youtube: 'JBd6iJ3Rtf8', label: 'Der MOSFET (Feldeffekttransistor) ERKLÄRT – Aufbau, Arbeitsbereiche & Kennlinie', channel: 'EinfachElektronik', minutes: 9,
      why: 'Aufbau, Arbeitsbereiche und Kennlinie in unter 9 Minuten — passt zum Kennlinienfeld in der Demo darunter.',
    },
    {
      id: 'viz-lab', type: 'viz', viz: 'mosfet-lab', title: 'MOSFET-Labor',
      intro: 'Oben: ein n-Kanal-MOSFET schaltet eine 12-Ω-Last an 12 V ($U_\\text{th} = 3\\,\\text{V}$). Die graue Kurvenschar ist das Ausgangskennlinienfeld, die gestrichelte Linie die **Lastgerade** — der Arbeitspunkt liegt auf ihr. Unten: der Schalterbetrieb mit 10 A.',
      params: { vdd: 12, rload: 12, uth: 3, kp: 0.5 },
      task: 'Erreiche alle drei Ziele: **sperren** (U_GS unter der Schwelle), **voll durchschalten** (U_DS unter 0,5 V — dafür reichen 5 V am Gate nicht!) und im Modus „Schalter" **10 A mit weniger als 1 W** Verlust schalten (R_DS(on) passend wählen).',
    },
    {
      id: 'schalter', type: 'text', title: 'Als Schalter: Verlust statt Spannungsabfall',
      md: `
Ein guter Schalter hat im Ein-Zustand $U_{DS}\\approx 0$ und im Aus-Zustand $I_D\\approx 0$ — in beiden Fällen ist die Verlustleistung $U_{DS}\\cdot I_D$ fast null. Der **Leistungsverlust im Ein-Zustand** ist einfach das Ohmsche Gesetz am Kanalwiderstand:

$$P_V = I^2\\cdot R_{DS(on)}$$

Beispiel: 10 A durch einen MOSFET mit $R_{DS(on)} = 10\\,\\text{m}\\Omega$ ergeben $(10\\,\\text{A})^2\\cdot 0{,}01\\,\\Omega = 1\\,\\text{W}$ — der Transistor wird spürbar warm. Wegen der **quadratischen** Abhängigkeit vom Strom steigt der Verlust bei 20 A schon auf 4 W. Ein [Kühlkörper](wiki:Kühlkörper|Heat sink) senkt den Wärmewiderstand; das ist in der Demo als Annahme von 60 K/W ohne Kühlkörper eingebaut.

Im Vergleich zum Bipolartransistor hat der MOSFET als Schalter drei Vorteile:

- Er braucht im Dauerbetrieb **keinen Steuerstrom**, nur eine Spannung am Gate — die Ansteuerung ist „leistungslos".
- Es gibt **keine Sättigungsspannung** von etwa 0,2 V; im Ein-Zustand verhält er sich wie ein Widerstand, bei kleinen Strömen fällt fast keine Spannung ab.
- Man kann mehrere MOSFETs **parallel** schalten, weil $R_{DS(on)}$ mit der Temperatur steigt und sich die Ströme von selbst verteilen.

Der Preis: Das Gate bildet mit dem Kanal eine **Kapazität**. Zum schnellen Schalten (etwa im Schaltregler) muss der Treiber diese Kapazität kurzzeitig mit hohem Strom umladen.`,
    },
    {
      id: 'warning-esd', type: 'callout', tone: 'warning', title: 'Typische Fehlvorstellung: „MOSFET = Bipolartransistor mit anderem Namen"',
      md: `
Die drei Anschlüsse sehen ähnlich aus, aber das Prinzip ist verschieden: Der Bipolartransistor wird mit einem **Strom** $I_B$ gesteuert, der MOSFET mit einer **Spannung** $U_{GS}$. Und: Das Gate ist durch die dünne Oxidschicht isoliert (nur wenige Nanometer). Schon die statische Aufladung beim Anfassen kann sie durchschlagen — deshalb sind ungeschützte MOSFETs gegen [elektrostatische Entladung](wiki:Elektrostatische Entladung|Electrostatic discharge) (ESD) empfindlich. Typen mit eingebauten Schutzdioden sind robuster, aber nicht unverwundbar. Praxis: Anschlüsse bis zum Einlöten kurzschließen oder in antistatischer Verpackung lassen, Gate nie „offen" (hochohmig, unbeschaltet) betreiben.`,
    },
    {
      id: 'mission', type: 'callout', tone: 'mission', title: 'Prüfung und Funkpraxis',
      md: `
In der **Klasse-E-Prüfung** reicht beim Transistor das Prinzip: Er kann Schalter oder Verstärker sein (Katalog **EC601**), und beim Bipolartransistor steuert ein kleiner Basisstrom einen großen Kollektorstrom (**EC603**).[^bnetza-pruefungsfragen-2024] Den MOSFET selbst fragt erst der **Klasse-A-Katalog**: spannungsgesteuert (**AC502**), die Anschlüsse Drain, Gate, Source (**AC512**), die Steuerung des Kanalwiderstands durch $U_{GS}$ (**AC514**) und die Verlustleistung eines Leistungs-MOSFETs mit $R_{DS(on)}$ (**AC523**) — genau die Rechnung dieser Lektion.

In der Funkpraxis begegnet dir der MOSFET als Schalter für Verbraucher (PTT, Relais-Ersatz) und in Leistungsstufen und Schaltreglern. Der Schutz gegen ESD gilt auch für das Funkgerät selbst: Nie an der Platine arbeiten, ohne dich vorher zu erden.`,
    },
    {
      id: 'calc-pv', type: 'numeric', title: 'Verlustleistung im Schalter',
      question: 'Ein MOSFET mit $R_{DS(on)} = 10\\,\\text{m}\\Omega$ schaltet einen Strom von $10\\,\\text{A}$. Wie groß ist die Verlustleistung im Ein-Zustand?',
      answer: 1, tolerance: 0.01, unit: 'W',
      hint: '$P_V = I^2\\cdot R_{DS(on)}$ — erst quadrieren, dann mit dem Widerstand multiplizieren.',
      explain: '$P_V = (10\\,\\text{A})^2\\cdot 0{,}010\\,\\Omega = 100\\cdot 0{,}01\\,\\text{W} = 1\\,\\text{W}$. Merke: Der Strom geht **quadratisch** ein, 10 mΩ = 0,01 Ω.',
    },
    {
      id: 'calc-pv2', type: 'numeric', title: 'Noch ein Schalter',
      question: 'Ein Heizdraht nimmt $8\\,\\text{A}$ auf. Der MOSFET davor hat $R_{DS(on)} = 25\\,\\text{m}\\Omega$. Wie viel Leistung wird im MOSFET in Wärme umgesetzt?',
      answer: 1.6, tolerance: 0.02, unit: 'W',
      hint: '25 mΩ sind 0,025 Ω. $8^2 = 64$.',
      explain: '$P_V = (8\\,\\text{A})^2\\cdot 0{,}025\\,\\Omega = 64\\cdot 0{,}025\\,\\text{W} = 1{,}6\\,\\text{W}$.',
    },
    {
      id: 'quiz-uth', type: 'quiz', title: 'Sperrt er oder leitet er?',
      question: 'Ein n-Kanal-Anreicherungs-MOSFET mit $U_\\text{th} = 3\\,\\text{V}$ bekommt $U_{GS} = 2{,}5\\,\\text{V}$. Was passiert?',
      options: [
        { text: 'Er sperrt; es fließt (praktisch) kein Drainstrom.', correct: true, why: 'Unterhalb der Schwellspannung bildet sich kein leitender Kanal.' },
        { text: 'Er leitet schwach, weil 2,5 V schon „fast genug" sind.', correct: false, why: 'Im Level-1-Modell fließt genau null Strom unter $U_\\text{th}$ (in Wirklichkeit nur ein winziger Unterschwellstrom).' },
        { text: 'Er leitet voll, denn jede positive Gate-Spannung schaltet durch.', correct: false, why: 'Das gilt nur bei selbstleitenden Typen; der Anreicherungstyp braucht mehr als $U_\\text{th}$.' },
        { text: 'Er wird zerstört, weil $U_{GS}$ nicht gleich $U_\\text{th}$ ist.', correct: false, why: 'Zerstörend wäre eine *zu hohe* Gate-Spannung (typisch über ±20 V), nicht eine zu niedrige.' },
      ],
    },
    {
      id: 'quiz-esd', type: 'quiz', title: 'Warum ESD?',
      question: 'Warum sind MOSFET-Gates empfindlich gegen elektrostatische Entladung?',
      options: [
        { text: 'Das Gate ist durch eine extrem dünne Oxidschicht isoliert und hat einen sehr hohen Eingangswiderstand; die Ladung kann nicht abfließen, die Spannung steigt bis zum Durchschlag.', correct: true, why: 'Schon die Ladung eines Funkens von der Hand kann die Gate-Spannung weit über die zulässigen Werte treiben (typisch ±20 V); das hauchdünne Oxid schlägt durch.' },
        { text: 'Weil MOSFETs mit hohem Strom arbeiten und dabei überhitzen.', correct: false, why: 'Das Problem ist die Spannung am Gate, nicht der Strom im Kanal.' },
        { text: 'Weil das Gate direkt mit dem Kanal leitend verbunden ist.', correct: false, why: 'Gerade das Gegenteil: Das Gate ist isoliert.' },
        { text: 'Weil Silizium kein Metall ist.', correct: false, why: 'Das erklärt nichts; „Metall" im Namen steht für das Gate-Material, das auch aus Silizium bestehen kann.' },
      ],
    },
    {
      id: 'match-steuerung', type: 'match', title: 'Anschlüsse und Steuerart',
      prompt: 'Ordne zu.',
      pairs: [['Gate (G)', 'Steuerelektrode, durch Oxid isoliert'], ['Drain (D)', 'Abfluss: Hier verlässt der Strom (n-Kanal) den Kanal in Richtung Last'], ['Source (S)', 'Quelle: Hier treten die Ladungsträger in den Kanal ein'], ['Bipolartransistor', 'stromgesteuert (Steuergröße $I_B$)'], ['FET / MOSFET', 'spannungsgesteuert (Steuergröße $U_{GS}$)']],
    },
    {
      id: 'order-einschalten', type: 'order', title: 'Einschalten eines n-Kanal-MOSFETs',
      prompt: 'Bringe die Schritte in die richtige Reihenfolge, wenn die Gate-Spannung langsam von 0 V hochgefahren wird.',
      items: [
        'Das Gate wird aufgeladen, $U_{GS}$ steigt (kurzer Ladestrom)',
        '$U_{GS}$ überschreitet die Schwellspannung $U_\\text{th}$: Unter dem Oxid bildet sich ein leitender Kanal',
        'Der Drainstrom $I_D$ beginnt zu fließen, $U_{DS}$ fällt',
        'Bei weiter steigendem $U_{GS}$ sinkt $R_{DS}$; der Transistor geht in den Triodenbereich',
        'Bei voller Gate-Spannung ist $R_{DS(on)}$ minimal: Im Kanal fällt nur $I\\cdot R_{DS(on)}$ ab',
      ],
      explain: 'Der Gatestrom fließt nur während des Umladens der Gate-Kapazität; danach genügt die stehende Spannung.',
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>Deutsch</th><th>English</th><th>Notiz</th></tr>
<tr><td>Feldeffekttransistor (FET)</td><td>field-effect transistor</td><td>spannungsgesteuert</td></tr>
<tr><td>Gate / Drain / Source</td><td>gate / drain / source</td><td>Tor / Abfluss / Quelle</td></tr>
<tr><td>Schwellspannung</td><td>threshold voltage</td><td>$U_\\text{th}$ oder $U_{GS(th)}$</td></tr>
<tr><td>selbstsperrend (Anreicherungstyp)</td><td>enhancement mode</td><td>sperrt bei $U_{GS}=0$</td></tr>
<tr><td>selbstleitend (Verarmungstyp)</td><td>depletion mode</td><td>leitet bei $U_{GS}=0$</td></tr>
<tr><td>Durchlasswiderstand</td><td>on-state resistance</td><td>$R_{DS(on)}$</td></tr>
<tr><td>Leistungs-MOSFET</td><td>power MOSFET</td><td></td></tr>
<tr><td>Kanal</td><td>channel</td><td>n-Kanal / p-Kanal</td></tr></table>`,
    },
    {
      id: 'recall-vorteil', type: 'recall', title: 'Erkläre es in eigenen Worten',
      prompt: 'Wo liegt der Vorteil eines MOSFETs gegenüber einem Bipolartransistor als **Schalter**? Nenne mindestens zwei Punkte und erkläre, warum man ihn trotzdem vorsichtig anfassen muss.',
      answer: 'Der MOSFET wird mit einer Spannung gesteuert und braucht im Dauerbetrieb praktisch keinen Steuerstrom; die Ansteuerung ist leistungslos. Im Ein-Zustand wirkt er als kleiner Widerstand $R_{DS(on)}$ (wenige Milliohm), es gibt keine feste Sättigungsspannung, und die Verlustleistung ist nur $I^2\\cdot R_{DS(on)}$. Das Gate ist aber durch eine hauchdünne Oxidschicht isoliert und lädt sich elektrostatisch auf, sodass die Schicht durchschlagen kann (ESD).',
      hints: ['Welche Größe steuert den MOSFET — Strom oder Spannung?', 'Wie berechnest du die Verlustleistung im Ein-Zustand?'],
      cards: ['fet-gds', 'fet-esd', 'fet-vs-bjt'],
    },
    {
      id: 'deep-gatekap', type: 'callout', tone: 'deep', title: 'Warum schnelles Schalten Treiberstrom braucht',
      md: `
Das Gate verhält sich wie ein Kondensator mit der Gate-Kapazität $C_\\text{G}$. Um ihn in der Zeit $t$ auf $U_{GS}$ zu laden, ist ein mittlerer Strom von $I\\approx C_\\text{G}\\,U_{GS}/t$ nötig. Bei $C_\\text{G}=2\\,\\text{nF}$, $U_{GS}=10\\,\\text{V}$ und $t=20\\,\\text{ns}$ sind das $1\\,\\text{A}$ — für Mikrosekunden zwar kurz, aber deutlich mehr, als ein Mikrocontroller-Pin liefern kann. Darum gibt es **Gate-Treiber**. Beim langsamen Durchlaufen des Triodenbereichs entsteht außerdem **Schaltverlust**: Zwischen „ganz aus" und „ganz an" fließt Strom bei noch hoher $U_{DS}$ (Thema der Schaltregler).`,
    },
  ],
  cards: [
    { id: 'fet-gds', front: 'Anschlüsse eines Feldeffekttransistors — und was macht jeder?', back: '**Gate** (Steuerelektrode, isoliert), **Drain** (Abfluss), **Source** (Quelle). Die Spannung $U_{GS}$ steuert den Kanalwiderstand zwischen Source und Drain.' },
    { id: 'fet-vs-bjt', front: 'Bipolartransistor vs. FET: Steuergröße?', back: 'Bipolartransistor: **stromgesteuert** ($I_B$). FET/MOSFET: **spannungsgesteuert** ($U_{GS}$, praktisch leistungslos).' },
    { id: 'fet-uth', front: 'Was ist die Schwellspannung $U_\\text{th}$ eines MOSFETs?', back: 'Die Gate-Source-Spannung, ab der sich ein leitender Kanal bildet. Darunter sperrt ein selbstsperrender MOSFET.' },
    { id: 'fet-pv', front: 'Verlustleistung eines MOSFET-Schalters im Ein-Zustand?', back: '$P_V = I^2\\cdot R_{DS(on)}$ — der Strom geht quadratisch ein.' },
    { id: 'fet-pv-rechnen', front: '$R_{DS(on)} = 10\\,\\text{m}\\Omega$, $I = 10\\,\\text{A}$: $P_V$?', back: '$(10\\,\\text{A})^2\\cdot 0{,}01\\,\\Omega = 1\\,\\text{W}$.' },
    { id: 'fet-rdson', front: 'Was gibt $R_{DS(on)}$ an, und wovon hängt der Wert ab?', back: 'Den Widerstand des durchgeschalteten Kanals; gilt nur für die im Datenblatt genannte Gate-Spannung (z. B. 10 V oder 4,5 V) und steigt mit der Temperatur.' },
    { id: 'fet-esd', front: 'Warum sind MOSFET-Gates ESD-empfindlich?', back: 'Das Gate ist durch eine extrem dünne Oxidschicht isoliert (sehr hoher Eingangswiderstand): Ladung kann nicht abfließen, die Spannung steigt bis zum Durchschlag.' },
    { id: 'fet-bereiche', front: 'Triodenbereich und Sättigungsbereich beim MOSFET: Einsatz?', back: 'Triodenbereich ($U_{DS}<U_{GS}-U_\\text{th}$): steuerbarer Widerstand → **Schalter**. Sättigungsbereich: $I_D$ hängt fast nur von $U_{GS}$ ab → **Verstärker**.' },
    { id: 'fet-sat', front: 'Drainstrom im Sättigungsbereich (Level-1-Modell)?', back: '$I_D=\\frac{K}{2}(U_{GS}-U_\\text{th})^2$ — quadratische Abhängigkeit von der Übersteuerung $U_{GS}-U_\\text{th}$.' },
    { id: 'fet-logic', front: 'Was bedeutet „Logic-Level"-MOSFET?', back: 'Niedrige Schwellspannung, $R_{DS(on)}$ ist bereits bei 4,5 V (oder 3,3 V) Gate-Spannung spezifiziert — direkt vom Mikrocontroller schaltbar.' },
  ],
};
