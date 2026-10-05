export default {
  id: 'logikgatter',
  title: 'Gatter, Wahrheitstabellen, boolesche Algebra',
  summary: 'UND, ODER, NICHT und ihre Verwandten: wie aus einfachen Ja/Nein-Bausteinen Entscheidungen und sogar eine Addierschaltung werden — und warum ein einziger Gattertyp (NAND) für alles reicht.',
  minutes: 30,
  needs: ['zahlensysteme'],
  goals: [
    'Die Grundgatter [[und-gatter|UND]], [[oder-gatter|ODER]], [[nicht-gatter|NICHT]], [[nand-gatter|NAND]], [[nor-gatter|NOR]] und [[xor-gatter|XOR]] an Symbol und [[wahrheitstabelle|Wahrheitstabelle]] erkennen',
    'Mit den Gesetzen der [[boolesche-algebra|booleschen Algebra]] rechnen, insbesondere mit [[de-morgan|De Morgan]]',
    'Erklären, warum NAND ein universelles Gatter ist, und ein NICHT, UND, ODER und XOR daraus bauen',
    'Einen [[halbaddierer|Halbaddierer]] aus XOR und UND entwerfen',
    'Logikpegel ([[ttl-cmos|TTL/CMOS]]) und verbotene Bereiche einordnen',
  ],
  blocks: [
    {
      id: 'schalter-logik', type: 'text', title: 'Entscheidungen aus Schaltern',
      md: `
Zwei Schalter in **Reihe** vor einer Lampe: Sie brennt nur, wenn Schalter A **und** Schalter B geschlossen sind. Zwei Schalter **parallel**: Sie brennt, wenn A **oder** B geschlossen ist. Mehr steckt nicht hinter der Digitaltechnik — nur dass die „Schalter“ [Transistoren](wiki:Transistor|Transistor) sind und die Signale Spannungen für 0 und 1.

Der englische Mathematiker [George Boole](wiki:George Boole|George Boole) beschrieb schon 1847 eine Algebra für Wahrheitswerte — die **[boolesche Algebra](wiki:Boolesche Algebra|Boolean algebra)**. [Claude Shannon](wiki:Claude Shannon|Claude Shannon) zeigte 1937, dass sich Schalterschaltungen genau mit dieser Algebra beschreiben lassen. Ein **[Logikgatter](wiki:Logikgatter|Logic gate)** ist die Schaltung, die eine solche Verknüpfung ausführt: Eingänge rein, ein Ausgang raus, jeweils 0 oder 1.

In Schaltplänen nach DIN EN 60617 ist ein Gatter ein **Rechteck** mit einem Kennzeichen: **&** für UND, **≥1** für ODER, **=1** für XOR, **1** für einen Inverter. Ein kleiner Kreis am Ausgang bedeutet **Negation**.`,
    },
    {
      id: 'gatter-tabelle', type: 'text', title: 'Die sechs wichtigsten Gatter',
      md: `
Mit den Eingängen $A$ und $B$ gilt (Gleichungen: Punkt = UND, Plus = ODER, Querstrich = NICHT):

<table>
<tr><th>A</th><th>B</th><th>UND</th><th>ODER</th><th>NAND</th><th>NOR</th><th>XOR</th></tr>
<tr><td>0</td><td>0</td><td>0</td><td>0</td><td>1</td><td>1</td><td>0</td></tr>
<tr><td>0</td><td>1</td><td>0</td><td>1</td><td>1</td><td>0</td><td>1</td></tr>
<tr><td>1</td><td>0</td><td>0</td><td>1</td><td>1</td><td>0</td><td>1</td></tr>
<tr><td>1</td><td>1</td><td>1</td><td>1</td><td>0</td><td>0</td><td>0</td></tr>
</table>

$$Y_{\\text{UND}} = A\\cdot B \\qquad Y_{\\text{ODER}} = A + B \\qquad Y_{\\text{NICHT}} = \\bar A \\qquad Y_{\\text{NAND}} = \\overline{A\\cdot B} \\qquad Y_{\\text{NOR}} = \\overline{A+B} \\qquad Y_{\\text{XOR}} = A\\oplus B$$

Das **[UND](wiki:Und-Gatter|AND gate)** gibt nur 1, wenn alle Eingänge 1 sind; das **[ODER](wiki:Oder-Gatter|OR gate)**, sobald ein Eingang 1 ist; das **[NICHT](wiki:Nicht-Gatter|Inverter (logic gate))** kehrt um. **[NAND](wiki:NAND-Gatter|NAND gate)** und **[NOR](wiki:NOR-Gatter|NOR gate)** sind UND und ODER mit nachgeschalteter Negation. Das **[XOR](wiki:Exklusiv-Oder-Gatter|XOR gate)** („exklusives Oder“) gibt 1, wenn sich die Eingänge **unterscheiden**.`,
    },
    {
      id: 'warn-nand', type: 'callout', tone: 'warning', title: 'NAND(1,1) ist nicht 1',
      md: `
Ein häufiger Fehler: „NAND ist wie UND, nur anders herum“ — und dann wird NAND(1,1) = 1 notiert. Richtig ist das **Gegenteil von UND**: UND(1,1) = 1, also NAND(1,1) = **0**. Bei NAND ist der Ausgang in **drei von vier** Zeilen 1 und nur bei A = B = 1 gleich 0.`,
    },
    {
      id: 'viz-gate-lab', type: 'viz', viz: 'gate-lab', title: 'Gatter-Spielwiese',
      params: { goals: ['xor', 'nand'], levels: true },
      task: 'Wähle ein Gatter, schalte A und B und beobachte den Ausgang. Fülle dann die Wahrheitstabelle für XOR und für NAND richtig aus (Tippen in der Y-Spalte).',
      caption: 'Wechsle zwischen den Gattern, bis du jede Tabelle im Kopf hast. Unten: Welche Spannung gilt als 0, welche als 1?',
    },
    {
      id: 'num-nand', type: 'numeric', title: 'NAND zählen',
      question: 'In wie vielen der vier Eingangskombinationen $(A,B)$ liefert ein NAND-Gatter den Ausgang 1?',
      answer: 3, tolerance: 0,
      hint: 'NAND ist das Gegenteil von UND, und UND ist nur bei (1,1) gleich 1.',
      explain: 'UND ist nur bei $(1,1)$ gleich 1, NAND daher nur dort gleich 0: in $3$ von $4$ Zeilen ist Y = 1.',
    },
    {
      id: 'num-xor', type: 'numeric', title: 'XOR bei (1,1)',
      question: 'Welchen Wert hat der Ausgang eines XOR-Gatters bei $A = 1$ und $B = 1$?',
      answer: 0, tolerance: 0,
      hint: 'XOR ist 1, wenn sich die Eingänge unterscheiden.',
      explain: 'Beide Eingänge sind gleich, also $Y = 0$. Das ist der Unterschied zum ODER, das bei $(1,1)$ den Wert 1 liefert.',
    },
    {
      id: 'pegel', type: 'text', title: 'Was ist „0“ und was „1“?',
      md: `
Ein Gatter arbeitet nicht mit Nullen und Einsen, sondern mit **Spannungen**. Ein Eingang gilt als LOW (0), wenn die Spannung unter einer Schwelle $V_{IL}$ liegt, und als HIGH (1), wenn sie über $V_{IH}$ liegt. Dazwischen liegt ein **verbotener Bereich**: Der Ausgang ist dort nicht definiert. Für die klassische [TTL](wiki:Transistor-Transistor-Logik|Transistor–transistor logic)-Reihe 74LS (5 V Betriebsspannung) nennt das Datenblatt $V_{IH} = 2\\,\\text{V}$ und $V_{IL} = 0{,}8\\,\\text{V}$.[^ti-sn74ls00] [CMOS](wiki:Complementary metal-oxide-semiconductor|CMOS)-Gatter orientieren sich dagegen an einem Anteil der Betriebsspannung (grob ein Drittel für LOW, zwei Drittel für HIGH); den genauen Wert liefert immer das Datenblatt der Familie. Weil die Schwellen weit auseinander liegen, übersteht ein Signal etwas Rauschen — der eigentliche Grund, warum Digitaltechnik so störsicher ist. Das Zuordnen „HIGH = 1“ heißt **positive Logik** und gilt hier überall.

Mit dem **[Logikpegel](wiki:Logikpegel|Logic level)** wird auch klar, warum man 5-V-TTL nicht ohne Weiteres an einen 3,3-V-Mikrocontroller hängt: Die Pegel passen nicht zusammen.`,
    },
    {
      id: 'demorgan', type: 'text', title: 'De Morgan und das universelle NAND',
      md: `
Die [De Morganschen Gesetze](wiki:De Morgansche Gesetze|De Morgan's laws) sind die wichtigste Umformungsregel — „Strich über alles: UND wird ODER, ODER wird UND, jeder Eingang wird negiert“:

$$\\overline{A\\cdot B} = \\bar A + \\bar B \\qquad\\qquad \\overline{A + B} = \\bar A\\cdot\\bar B$$

Daraus folgt etwas Erstaunliches: **Ein NAND-Gatter reicht für alles.**

- **NICHT:** beide NAND-Eingänge verbinden → $\\overline{A\\cdot A} = \\bar A$.
- **UND:** NAND, dahinter ein NICHT (also zwei NAND) → $\\overline{\\overline{A\\cdot B}} = A\\cdot B$.
- **ODER:** erst $A$ und $B$ einzeln invertieren, dann in ein NAND → $\\overline{\\bar A\\cdot\\bar B} = A + B$ (De Morgan!), zusammen 3 NAND.
- **XOR:** vier NAND (siehe Baukasten unten).

Auch NOR ist universell. Der Bordcomputer der Apollo-Mondmissionen ([Apollo Guidance Computer](wiki:Apollo Guidance Computer|Apollo Guidance Computer)) bestand fast vollständig aus NOR-Gattern. Das ist der Grund, warum Chips millionenfach nur **eine** Zelle wiederholen können.`,
    },
    {
      id: 'viz-logic-builder', type: 'viz', viz: 'logic-builder', title: 'Baue XOR nur aus NAND',
      params: { allow: ['nand'], targets: ['not', 'and', 'or', 'xor', 'halfadder'], required: ['xor'] },
      task: 'Baue ein XOR-Gatter ausschließlich aus NAND-Gattern. Der Baukasten prüft jede Zeile der Wahrheitstabelle automatisch. Wenn du es eilig hast: erst die Aufgaben NICHT, UND, ODER lösen — dann ist XOR nur noch ein Schritt.',
      caption: 'Gatter mit „+ NAND“ hinzufügen und verschieben. Ausgangspunkt (●) antippen, dann Eingangspunkt (○). Auf einen belegten Eingang tippen nimmt die Leitung wieder auf. Mit „Tipp“ gibt es einen Hinweis.',
    },
    {
      id: 'quiz-demorgan', type: 'quiz', title: 'De Morgan',
      question: 'Welche Umformung ist richtig?',
      options: [
        { text: '$\\overline{A\\cdot B} = \\bar A + \\bar B$', correct: true, why: 'Strich über das Produkt wird zum ODER der negierten Eingänge.' },
        { text: '$\\overline{A\\cdot B} = \\bar A\\cdot\\bar B$', correct: false, why: 'Das ist der klassische Fehler: nur die Eingänge zu negieren und das UND zu behalten. Das UND muss zum ODER werden.' },
        { text: '$\\overline{A\\cdot B} = A + B$', correct: false, why: 'Die Negation kann nicht einfach verschwinden: Für $A=B=1$ ist die linke Seite 0, die rechte 1.' },
        { text: '$\\overline{A + B} = \\bar A + \\bar B$', correct: false, why: 'Hier müsste ein UND stehen: $\\overline{A+B} = \\bar A\\cdot\\bar B$.' },
      ],
    },
    {
      id: 'halbaddierer', type: 'text', title: 'Rechnen mit Gattern: der Halbaddierer',
      md: `
Wie addiert eine Schaltung zwei Bits? Im Dualsystem gilt $0+0=0$, $0+1=1$, $1+0=1$ und $1+1=10_2$ — also Summenbit 0 mit **Übertrag** 1. Schau dir die Tabelle an:

<table>
<tr><th>A</th><th>B</th><th>Übertrag C</th><th>Summe S</th></tr>
<tr><td>0</td><td>0</td><td>0</td><td>0</td></tr>
<tr><td>0</td><td>1</td><td>0</td><td>1</td></tr>
<tr><td>1</td><td>0</td><td>0</td><td>1</td></tr>
<tr><td>1</td><td>1</td><td>1</td><td>0</td></tr>
</table>

Die Summe ist genau das XOR, der Übertrag genau das UND:

$$S = A\\oplus B \\qquad C = A\\cdot B$$

Das ist der **[Halbaddierer](wiki:Halbaddierer|Half adder)**. Hängt man zwei davon geschickt zusammen und nimmt den Übertrag der vorigen Stelle als dritten Eingang mit, erhält man den **[Volladdierer](wiki:Volladdierer|Adder (electronics))**; acht davon addieren Bytes. Genau so rechnet jeder Prozessor.`,
    },
    {
      id: 'video-gatter', type: 'video', youtube: 'uAVEnaZoks0', label: 'Einführung in die Digitaltechnik: Die Grundlagen der Logikgatter einfach erklärt!', channel: 'Patrick Boekhoven', minutes: 10,
      why: 'Ein kompakter Überblick über UND, ODER und NICHT — gut zum Wiederholen nach der Spielwiese.',
    },
    {
      id: 'quiz-halbaddierer', type: 'quiz', title: 'Halbaddierer',
      question: 'Wie lauten Summe $S$ und Übertrag $C$ eines Halbaddierers?',
      options: [
        { text: '$S = A\\oplus B$ und $C = A\\cdot B$', correct: true, why: 'Bei $1+1$ ist die Summe 0 (XOR) und der Übertrag 1 (UND).' },
        { text: '$S = A\\cdot B$ und $C = A\\oplus B$', correct: false, why: 'Vertauscht: Bei $1+0$ wäre dann der Übertrag 1 — das stimmt nicht.' },
        { text: '$S = A + B$ (ODER) und $C = A\\cdot B$', correct: false, why: 'ODER liefert bei $1+1$ eine 1 als Summe; die Summe muss dort 0 sein.' },
        { text: '$S = \\overline{A\\cdot B}$ und $C = A + B$', correct: false, why: 'Das passt bei keiner Zeile außer zufällig; prüfe mit der Tabelle.' },
      ],
    },
    {
      id: 'order-entwurf', type: 'order', title: 'Entwurf eines Schaltnetzes',
      prompt: 'Ordne die Schritte beim Entwurf einer Logikschaltung.',
      items: [
        'Aufgabe als Wahrheitstabelle aufschreiben',
        'Aus der Tabelle eine boolesche Gleichung ableiten',
        'Die Gleichung vereinfachen (z. B. mit De Morgan)',
        'Die Gatter zeichnen und verdrahten',
        'Mit allen Eingangskombinationen testen',
      ],
      explain: 'Gerade der letzte Schritt rettet viele Entwürfe: Eine Tabelle mit nur vier Zeilen lässt sich restlos durchprüfen — der Baukasten oben tut das automatisch.',
    },
    {
      id: 'match-gatter', type: 'match', title: 'Funktion und Gatter',
      prompt: 'Welches Gatter macht was?',
      pairs: [
        ['UND', 'Ausgang 1 nur, wenn alle Eingänge 1 sind'],
        ['ODER', 'Ausgang 1, sobald mindestens ein Eingang 1 ist'],
        ['NICHT', 'kehrt den Eingang um'],
        ['NAND', 'Ausgang 0 nur, wenn alle Eingänge 1 sind'],
        ['NOR', 'Ausgang 1 nur, wenn alle Eingänge 0 sind'],
        ['XOR', 'Ausgang 1, wenn sich die Eingänge unterscheiden'],
      ],
    },
    {
      id: 'mission-logik', type: 'callout', tone: 'mission', title: 'Prüfung / Funkpraxis',
      md: `
Gatter und Wahrheitstabellen werden in der Klasse-E-Prüfung **nicht direkt** abgefragt; im Technik-Katalog stehen nur die Zahlensysteme (EA201 bis EA208). Das Wissen steckt aber hinter dem, was dort vorausgesetzt wird: den **Frequenzzählern** (EI501 bis EI509 — Zähler sind aus Flipflops und Gattern gebaut), der **digitalen Signalverarbeitung** (EF601 bis EF603), der **CAT-Schnittstelle** und den digitalen Betriebsarten (NF114 bis NF118).

Praxis: Jeder Mikrocontroller im Funkgerät, jeder Prozessor im SDR und jede Teilerstufe im Synthesizer besteht aus Millionen solcher Gatter. Wer sie versteht, hat die Digital-Bausteine im Transceiver nicht mehr als Black Box vor sich.`,
    },
    {
      id: 'ger-gatter', type: 'callout', tone: 'german', title: 'Fachwörter',
      md: `
<table>
<tr><th>Deutsch</th><th>English</th></tr>
<tr><td>Gatter</td><td>gate</td></tr>
<tr><td>UND, ODER, NICHT</td><td>AND, OR, NOT</td></tr>
<tr><td>Wahrheitstabelle</td><td>truth table</td></tr>
<tr><td>Verknüpfung</td><td>operation</td></tr>
<tr><td>Eingang, Ausgang</td><td>input, output</td></tr>
<tr><td>Schaltnetz (ohne Speicher)</td><td>combinational circuit</td></tr>
<tr><td>Übertrag</td><td>carry</td></tr>
<tr><td>Halbaddierer</td><td>half adder</td></tr>
</table>`,
    },
    {
      id: 'recall-not-nand', type: 'recall', title: 'NICHT aus NAND',
      prompt: 'Wie baust du ein NICHT-Gatter aus einem NAND-Gatter? Begründe mit der Gleichung.',
      answer: 'Die **beiden Eingänge zusammenschalten**: $\\overline{A\\cdot A} = \\bar A$. (Alternative: einen Eingang fest auf 1 legen: $\\overline{A\\cdot 1} = \\bar A$.) Damit lassen sich auch UND (NAND + NICHT) und ODER (De Morgan) bauen — NAND ist universell.',
      hints: ['Was kommt heraus, wenn beide Eingänge den gleichen Wert haben?'],
      cards: ['lg-nand-universal', 'lg-nicht-nand'],
    },
  ],
  cards: [
    { id: 'lg-und', front: 'UND-Gatter: Ausgang?', back: 'Y = 1 nur, wenn alle Eingänge 1 sind. $Y = A\\cdot B$. Symbol: Rechteck mit „&“.' },
    { id: 'lg-oder', front: 'ODER-Gatter: Ausgang?', back: 'Y = 1, sobald mindestens ein Eingang 1 ist. $Y = A+B$. Symbol: „≥1“.' },
    { id: 'lg-xor', front: 'XOR-Gatter: Ausgang?', back: 'Y = 1, wenn sich die Eingänge unterscheiden. $Y = A\\oplus B$; bei (1,1) ist $Y=0$. Symbol: „=1“.' },
    { id: 'lg-nand', front: 'NAND-Wahrheitstabelle?', back: 'Gegenteil von UND: Y = 0 nur bei A = B = 1, sonst 1 (also 1, 1, 1, 0).' },
    { id: 'lg-nor', front: 'NOR-Wahrheitstabelle?', back: 'Gegenteil von ODER: Y = 1 nur bei A = B = 0, sonst 0 (also 1, 0, 0, 0).' },
    { id: 'lg-demorgan', front: 'De Morgansche Gesetze?', back: '$\\overline{A\\cdot B} = \\bar A+\\bar B$ und $\\overline{A+B} = \\bar A\\cdot\\bar B$ — Strich teilen, Operator tauschen, Eingänge negieren.' },
    { id: 'lg-nand-universal', front: 'Warum ist NAND ein universelles Gatter?', back: 'Aus NAND allein lassen sich NICHT, UND, ODER (und damit alles) bauen. NICHT = NAND mit verbundenen Eingängen.' },
    { id: 'lg-nicht-nand', front: 'NICHT aus NAND bauen?', back: 'Beide Eingänge verbinden: $\\overline{A\\cdot A} = \\bar A$.' },
    { id: 'lg-halbaddierer', front: 'Halbaddierer: Gleichungen?', back: 'Summe $S = A\\oplus B$ (XOR), Übertrag $C = A\\cdot B$ (UND).' },
    { id: 'lg-pegel', front: 'Was bedeuten $V_{IL}$ und $V_{IH}$?', back: 'Eingangsspannung unter $V_{IL}$ = LOW (0), über $V_{IH}$ = HIGH (1); dazwischen verbotener Bereich. TTL 74LS: 0,8 V / 2 V.' },
    { id: 'lg-symbole', front: 'Gattersymbole nach DIN (Kennzeichen)?', back: '„&“ = UND, „≥1“ = ODER, „=1“ = XOR, „1“ = Inverter; ein Kreis am Ausgang = Negation.' },
    { id: 'lg-boolesch', front: 'Wer begründete die Algebra der Wahrheitswerte, wer verband sie mit Schaltern?', back: 'George Boole (1847); Claude Shannon (1937).' },
  ],
};
