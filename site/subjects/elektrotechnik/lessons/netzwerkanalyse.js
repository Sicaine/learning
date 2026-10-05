export default {
  id: 'netzwerkanalyse',
  title: 'Brücke, Ersatzquelle, Überlagerung',
  summary: 'Drei Werkzeuge für Netze, die sich nicht mit Reihe und Parallel allein vereinfachen lassen: die Wheatstone-Brücke, die Ersatzspannungsquelle und der Überlagerungssatz.',
  minutes: 30,
  goals: [
    'Eine [[bruecken-schaltung|Wheatstone-Brücke]] abgleichen und aus dem Abgleich einen unbekannten Widerstand $R_x$ berechnen',
    'Einen beliebigen Teiler als [[ersatzspannungsquelle|Ersatzspannungsquelle]] ($U_0$ und $R_i$) beschreiben und damit die Last rechnen',
    'Den [[superposition|Überlagerungssatz]] bei zwei Quellen anwenden und seine Grenze (nur $U$ und $I$, nicht $P$) begründen',
  ],
  needs: ['reale-quellen'],
  blocks: [
    {
      id: 'idee', type: 'text', title: 'Wenn Reihe und Parallel nicht reichen',
      md: `
Mit Reihen- und Parallelschaltung kommst du weit — aber nicht überall. Ein Teiler, an dem eine Last hängt, lässt sich noch vereinfachen. Eine *Brücke* aus fünf Widerständen oder ein Netz mit *zwei Quellen* nicht mehr so einfach. Dafür gibt es drei Werkzeuge, die jeweils eine Idee nutzen: **Symmetrie** (Brücke), **Ersatz durch eine einfache Quelle** (Thévenin) und **linearer Zusammenhang** (Überlagerung). Alle drei gelten nur für *lineare* Netze, also Netze aus Widerständen und Quellen — nicht für Dioden oder Transistoren.[^wp-netzwerk-elektrotechnik]`,
    },
    {
      id: 'bruecke', type: 'text', title: 'Die Wheatstone-Brücke',
      md: `
Zwei [Spannungsteiler](wiki:Spannungsteiler|Voltage divider) liegen an derselben Quelle. Der linke besteht aus $R_1$ (oben) und $R_2$ (unten), der rechte aus $R_3$ und $R_x$. Zwischen den beiden Abgriffen sitzt ein empfindliches Voltmeter. Die **[Wheatstonesche Messbrücke](wiki:Wheatstonesche Messbrücke|Wheatstone bridge)** wurde von [Samuel Hunter Christie](wiki:Samuel Hunter Christie) erfunden und von [Charles Wheatstone](wiki:Charles Wheatstone) bekannt gemacht.[^wp-wheatstone]

Sind beide Teiler im gleichen Verhältnis geteilt, haben beide Abgriffe dasselbe Potential — das Voltmeter zeigt null: die Brücke ist **abgeglichen**. Das gilt, wenn

$$\\frac{R_1}{R_2} = \\frac{R_3}{R_x} \\qquad\\Longleftrightarrow\\qquad R_x = R_3\\cdot\\frac{R_2}{R_1}$$

Der Reiz: Im abgeglichenen Zustand fließt *kein Strom* durch das Voltmeter, deshalb verfälscht dessen Innenwiderstand nichts, und die Quellenspannung fällt aus der Rechnung heraus. Man gleicht mit einem verstellbaren Widerstand ($R_3$) ab, bis die Anzeige null wird, und liest $R_x$ aus dem Verhältnis ab.

Beispiel: $R_1 = 1\\,\\mathrm{k\\Omega}$, $R_2 = 2\\,\\mathrm{k\\Omega}$, abgeglichen bei $R_3 = 470\\,\\Omega$. Dann ist $R_x = 470\\,\\Omega\\cdot 2/1 = 940\\,\\Omega$.

Weil schon kleine Abweichungen $\\delta = \\Delta R/R$ eine messbare Spannung ergeben ($U_B \\approx U\\cdot\\delta/4$ bei vier gleichen Widerständen), nutzt man Brücken, um winzige Widerstandsänderungen zu messen — in [Dehnungsmessstreifen](wiki:Dehnungsmessstreifen|Strain gauge) und Waagen ([Wägezelle](wiki:Wägezelle|Load cell)), in [Widerstandsthermometern](wiki:Widerstandsthermometer|Resistance thermometer) und in vielen Sensoren.`,
    },
    {
      id: 'thevenin', type: 'text', title: 'Ersatzspannungsquelle (Thévenin)',
      md: `
Jedes lineare Netz mit zwei Anschlussklemmen verhält sich von außen wie eine einzige reale Quelle: eine ideale Quelle $U_0$ in Reihe mit einem Widerstand $R_i$. Das ist die **Ersatzspannungsquelle** (nach [Léon Charles Thévenin](wiki:Léon Charles Thévenin|Léon Charles Thévenin)).[^wp-ersatzspannungsquelle]

Du bestimmst beide Größen mit zwei Fragen an das Netz:

1. **$U_0$:** Welche Spannung liegt an den Klemmen, wenn *nichts* angeschlossen ist (Leerlaufspannung)?
2. **$R_i$:** Welchen Widerstand siehst du von den Klemmen aus ins Netz, wenn du alle Quellen auf null setzt (Spannungsquellen durch einen Draht, Stromquellen durch eine Unterbrechung ersetzen)?

Beispiel: Ein Spannungsteiler mit $12\\,\\mathrm{V}$, $6\\,\\mathrm{k\\Omega}$ oben und $3\\,\\mathrm{k\\Omega}$ unten. Leerlauf am Abgriff: $U_0 = 12\\,\\mathrm{V}\\cdot 3/9 = 4\\,\\mathrm{V}$. Innenwiderstand: die Quelle wird zum Draht, dann liegen $6\\,\\mathrm{k\\Omega}$ und $3\\,\\mathrm{k\\Omega}$ parallel: $R_i = 6\\parallel 3 = 2\\,\\mathrm{k\\Omega}$. Ab jetzt reicht die Rechnung aus der letzten Lektion: Eine Last von $1\\,\\mathrm{k\\Omega}$ bekommt $I = 4\\,\\mathrm{V}/(2+1)\\,\\mathrm{k\\Omega} = 1{,}33\\,\\mathrm{mA}$ und $1{,}33\\,\\mathrm{V}$.

Das erklärt auch, warum ein belasteter Teiler einbricht: Sein Ersatzinnenwiderstand ist $R_1\\parallel R_2$ — eine Last, die in dieselbe Größenordnung kommt, nimmt ihm einen großen Teil der Spannung.`,
    },
    {
      id: 'ueberlagerung', type: 'text', title: 'Überlagerungssatz',
      md: `
Wirken in einem linearen Netz **mehrere Quellen**, dann ist jede Spannung und jeder Strom die **Summe der Beiträge**, die jede Quelle *allein* erzeugen würde. Die anderen Quellen werden dabei „ausgeschaltet": Spannungsquellen durch einen Draht (Kurzschluss) ersetzt, Stromquellen durch eine Unterbrechung.[^wp-ueberlagerung]

Beispiel: Liefert Quelle A allein am Punkt $P$ eine Spannung von $3\\,\\mathrm{V}$ und Quelle B allein $2\\,\\mathrm{V}$, dann liegen bei beiden zusammen $5\\,\\mathrm{V}$ an $P$ (Vorzeichen beachten!).

**Grenze:** Der Satz gilt nur für Größen, die *linear* von den Quellen abhängen: Spannungen und Ströme. **Leistung** darfst du nicht überlagern, denn sie ist quadratisch: $P = U^2/R$. Zwei Quellen mit je $2\\,\\mathrm{V}$ an $1\\,\\Omega$: Jede allein erzeugt $4\\,\\mathrm{W}$, zusammen liegen aber $4\\,\\mathrm{V}$ an, und das sind $16\\,\\mathrm{W}$ — nicht $8\\,\\mathrm{W}$. Rechne also zuerst die Spannungen oder Ströme zusammen, dann erst die Leistung.`,
    },
    {
      id: 'viz-bridge', type: 'viz', viz: 'bridge-lab', title: 'Brücken-Labor',
      task: 'Gleiche die Brücke ab (erst grob, dann fein mit $R_3$), bis die Anzeige „abgeglichen" erscheint, und berechne dann den versteckten Widerstand $R_x$. Wechsle danach zur Ansicht „Thévenin" und stelle $R_L = R_i$ ein: Dann liegt an der Last genau die halbe Leerlaufspannung.',
    },
    {
      id: 'num-bruecke', type: 'numeric', title: 'Brückenabgleich',
      question: 'Eine Brücke ist abgeglichen mit $R_1 = 1\\,\\mathrm{k\\Omega}$, $R_2 = 2\\,\\mathrm{k\\Omega}$ und $R_3 = 470\\,\\Omega$. Wie groß ist $R_x$ (in der Anordnung wie im Text)?',
      answer: 940, tolerance: 1, unit: 'Ω',
      hint: '$R_1/R_2 = R_3/R_x$ — nach $R_x$ umstellen.',
      explain: '$R_x = R_3\\cdot R_2/R_1 = 470\\cdot 2 = 940\\,\\Omega$.',
    },
    {
      id: 'num-u0', type: 'numeric', title: 'Leerlaufspannung des Teilers',
      question: 'Ein Teiler besteht aus $6\\,\\mathrm{k\\Omega}$ (oben) und $3\\,\\mathrm{k\\Omega}$ (unten) an $12\\,\\mathrm{V}$. Wie groß ist die Leerlaufspannung $U_0$ am Abgriff?',
      answer: 4, tolerance: 0.02, unit: 'V',
      explain: '$U_0 = 12\\,\\mathrm{V}\\cdot 3/(6+3) = 4\\,\\mathrm{V}$.',
    },
    {
      id: 'num-ri', type: 'numeric', title: 'Innenwiderstand der Ersatzquelle',
      question: 'Wie groß ist der Innenwiderstand $R_i$ der Ersatzquelle desselben Teilers ($6\\,\\mathrm{k\\Omega}$ und $3\\,\\mathrm{k\\Omega}$, Spannungsquelle ideal)?',
      answer: 2, tolerance: 0.02, unit: 'kΩ',
      hint: 'Quelle durch einen Draht ersetzen — wie liegen die beiden Widerstände dann zueinander?',
      explain: 'Nach „Quelle = Draht" liegen beide Widerstände parallel am Abgriff: $6\\parallel 3 = \\frac{18}{9} = 2\\,\\mathrm{k\\Omega}$.',
    },
    {
      id: 'num-last', type: 'numeric', title: 'Last an der Ersatzquelle',
      question: 'An die Ersatzquelle ($U_0 = 4\\,\\mathrm{V}$, $R_i = 2\\,\\mathrm{k\\Omega}$) wird eine Last von $1\\,\\mathrm{k\\Omega}$ gehängt. Welche Spannung liegt an der Last?',
      answer: 1.33, tolerance: 0.02, unit: 'V',
      explain: '$I = 4/(2+1) = 1{,}33\\,\\mathrm{mA}$, $U_L = 1{,}33\\,\\mathrm{mA}\\cdot 1\\,\\mathrm{k\\Omega} = 1{,}33\\,\\mathrm{V}$. Probe am Original: $3\\,\\mathrm{k\\Omega}\\parallel 1\\,\\mathrm{k\\Omega} = 750\\,\\Omega$, $12\\cdot 750/6750 = 1{,}33\\,\\mathrm{V}$.',
    },
    {
      id: 'num-ueber', type: 'numeric', title: 'Überlagerung',
      question: 'Quelle A allein erzeugt am Punkt $P$ eine Spannung von $3\\,\\mathrm{V}$, Quelle B allein $2\\,\\mathrm{V}$ (beide mit gleicher Polarität gegenüber Masse). Welche Spannung liegt an $P$, wenn beide Quellen wirken?',
      answer: 5, tolerance: 0.02, unit: 'V',
      explain: 'Spannungen lassen sich im linearen Netz überlagern: $3\\,\\mathrm{V} + 2\\,\\mathrm{V} = 5\\,\\mathrm{V}$.',
    },
    {
      id: 'quiz-ueber', type: 'quiz', title: 'Wann darf man überlagern?',
      question: 'In welchem Fall ist der Überlagerungssatz anwendbar?',
      options: [
        { text: 'Bei linearen Netzen (Widerstände, Quellen) für Spannungen und Ströme.', correct: true, why: 'Nur dort hängen Spannungen und Ströme linear von den Quellen ab.' },
        { text: 'Auch bei Netzen mit Dioden, solange die Quellen klein sind.', correct: false, why: 'Eine Diode ist nichtlinear: Ihr Strom wächst exponentiell mit der Spannung, die Beiträge addieren sich nicht.' },
        { text: 'Für die Leistung in einem Widerstand.', correct: false, why: 'Leistung ist quadratisch ($P = U^2/R$), man muss erst $U$ oder $I$ überlagern, dann $P$ berechnen.' },
        { text: 'Nur, wenn beide Quellen dieselbe Spannung haben.', correct: false, why: 'Die Quellenwerte dürfen beliebig verschieden sein; entscheidend ist die Linearität des Netzes.' },
      ],
    },
    {
      id: 'recall-leistung', type: 'recall', title: 'Leistung überlagern?',
      prompt: 'Warum darf man Leistungen nicht überlagern, Spannungen und Ströme aber schon? Nenne ein Zahlenbeispiel.',
      answer: `Überlagerung gilt für Größen, die linear von den Quellen abhängen. Spannung und Strom tun das ($U = R\\cdot I$). Leistung ist quadratisch ($P = U^2/R = R I^2$). Beispiel: Zwei Quellen mit je $2\\,\\mathrm{V}$ speisen $1\\,\\Omega$ (gleiche Polarität): Einzelbeiträge $2\\,\\mathrm{V}$ → $4\\,\\mathrm{W}$ jeweils, Summe $8\\,\\mathrm{W}$. Tatsächlich liegen $4\\,\\mathrm{V}$ an, also $16\\,\\mathrm{W}$. Merke: erst $U$ oder $I$ überlagern, dann $P$ berechnen.`,
      hints: ['Wie hängt $P$ von $U$ ab?', 'Was passiert, wenn man $U$ verdoppelt?'],
      cards: ['ueberlagerung-satz'],
    },
    {
      id: 'mission', type: 'callout', tone: 'mission', title: 'Prüfung und Funkpraxis',
      md: `
Brücken, Thévenin und Überlagerung werden im Klasse-E-Katalog nicht direkt abgefragt. Sie liefern aber das Denkwerkzeug hinter vielen Fragen: Die Ersatzquelle erklärt, warum ein Verstärkerausgang, ein Sender oder eine Antenne von außen wie „Spannungsquelle mit Innenwiderstand" aussieht (siehe die Anpassungsfragen im Katalog), und das Brückenprinzip steckt in der **Antennenmessbrücke** (SWR-Brücke): Ist die Antenne gleich dem Bezugswiderstand, ist die Brücke abgeglichen, und das Messgerät zeigt null. Wie man Antennenanpassung mit dem Stehwellenmessgerät prüft, fragt der Katalog z. B. in EI401 und EI405.[^bnetza-pruefungsfragen-2024]`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>Deutsch</th><th>English</th></tr>
<tr><td>(Wheatstonesche) Messbrücke</td><td>Wheatstone bridge</td></tr>
<tr><td>Brückenabgleich</td><td>bridge balancing, null condition</td></tr>
<tr><td>Brückenspannung, Diagonalspannung</td><td>bridge (diagonal) voltage</td></tr>
<tr><td>Ersatzspannungsquelle</td><td>Thévenin equivalent source</td></tr>
<tr><td>Überlagerungssatz</td><td>superposition theorem</td></tr>
<tr><td>lineares Netz</td><td>linear network</td></tr>
<tr><td>Klemmen</td><td>terminals</td></tr></table>`,
    },
    {
      id: 'warning', type: 'callout', tone: 'warning', title: 'Typische Denkfehler',
      md: `
- **Leistung überlagern.** Nur $U$ und $I$ sind linear, $P$ nicht — erst überlagern, dann $P = U\\cdot I$ rechnen.
- **Beim „Ausschalten" einer Quelle die falsche Ersatzschaltung wählen.** Spannungsquelle aus = *Draht* (Kurzschluss), Stromquelle aus = *Unterbrechung* (offen), und der Innenwiderstand einer realen Quelle bleibt im Netz.
- **Dioden und Transistoren mit Überlagerung rechnen.** Der Satz gilt nur im linearen Netz.
- **Brücke: Verhältnisse verdrehen.** Bei $R_1/R_2 = R_3/R_x$ stehen $R_1$ und $R_3$ jeweils *oben* im Teiler — wer die Position vertauscht, bekommt den Kehrwert.`,
    },
  ],
  cards: [
    { id: 'bruecken-abgleich', front: 'Abgleichbedingung der Wheatstone-Brücke', back: '$R_1/R_2 = R_3/R_x$ — dann ist die Brückenspannung null, und es fließt kein Strom durch das Voltmeter; unabhängig von der Quellenspannung.' },
    { id: 'rx-bruecke', front: 'Unbekannter Widerstand aus dem Abgleich', back: '$R_x = R_3\\cdot R_2/R_1$.' },
    { id: 'thevenin', front: 'Ersatzspannungsquelle (Thévenin)', back: 'Von außen verhält sich ein lineares Netz wie $U_0$ in Reihe mit $R_i$. $U_0$ = Leerlaufspannung an den Klemmen; $R_i$ = Widerstand an den Klemmen bei ausgeschalteten Quellen.' },
    { id: 'thevenin-teiler', front: 'Ersatzquelle eines Spannungsteilers', back: '$U_0 = U\\cdot R_2/(R_1+R_2)$, $R_i = R_1\\parallel R_2$.' },
    { id: 'ueberlagerung-satz', front: 'Überlagerungssatz', back: 'In linearen Netzen ist jede Spannung/jeder Strom die Summe der Beiträge der einzelnen Quellen (die anderen ausgeschaltet). Gilt nicht für die Leistung.' },
    { id: 'quelle-aus', front: 'Quellen „ausschalten"', back: 'Spannungsquelle → Draht (Kurzschluss). Stromquelle → Unterbrechung. Innenwiderstände bleiben im Netz.' },
    { id: 'ueberlagerung-p', front: 'Warum keine Überlagerung von Leistungen?', back: 'Leistung ist quadratisch ($P = U^2/R$); Beispiel: $2\\,\\mathrm{V}+2\\,\\mathrm{V}$ an $1\\,\\Omega$ geben $16\\,\\mathrm{W}$, nicht $4+4=8\\,\\mathrm{W}$.' },
    { id: 'bruecke-anwendung', front: 'Wofür nutzt man die Brücke praktisch?', back: 'Zur Messung kleiner Widerstandsänderungen: Dehnungsmessstreifen, Waagen, Widerstandsthermometer; Prinzip des Stehwellenmessgeräts.' },
    { id: 'linear-netz', front: 'Welche Netze darf man überlagern/thevenisieren?', back: 'Nur lineare: Widerstände und Quellen (keine Dioden, Transistoren).' },
  ],
};
