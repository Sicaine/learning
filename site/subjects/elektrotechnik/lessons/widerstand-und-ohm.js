export default {
  id: 'widerstand-und-ohm',
  title: 'Widerstand und das Ohmsche Gesetz',
  summary: 'R = U/I ist die Definition des Widerstands; das Ohmsche Gesetz sagt, dass R konstant ist – bei Widerständen fast, bei Glühlampe und Diode nicht. Mit Kennlinien erkennst du den Unterschied auf einen Blick.',
  minutes: 30,
  goals: [
    '[[elektrische-spannung|U]], [[elektrischer-strom|I]] und [[elektrischer-widerstand|R]] aus je zwei der drei Größen berechnen',
    'Eine [[kennlinie|Kennlinie]] lesen: Steigung = Leitwert $G = 1/R$',
    'Den [[leitwert|Leitwert]] angeben und die Einheit [[siemens|Siemens]] zuordnen',
    'Erkennen, wann das [[ohmsches-gesetz|Ohmsche Gesetz]] nicht gilt: [[nichtlineares-bauteil|nichtlineare Bauteile]] wie Glühlampe und [[diode|Diode]]',
  ],
  needs: ['strom-und-spannung'],
  blocks: [
    {
      id: 'idee', type: 'text', title: 'Wie stark bremst die Engstelle?',
      md: `
In der Wasseranalogie bremst eine Engstelle den Durchfluss: Bei gleichem Pumpendruck fließt durch eine enge Stelle weniger. Den **[[elektrischer-widerstand|elektrischen Widerstand]]** definiert man genau so – als *Verhältnis von Druck zu Durchfluss*:

$$R = \\frac{U}{I}$$

Der Widerstand $R$ sagt also, **wie viel Spannung man braucht, um 1 A durch das Bauteil zu treiben**. Die Einheit heißt [Ohm](wiki:Ohm (Einheit)|Ohm) (Ω), nach [Georg Simon Ohm](wiki:Georg Simon Ohm|Georg Ohm); es gilt $1\\ \\Omega = 1\\ \\mathrm{V/A}$. Bei 1 V und 1 A hat ein Bauteil also 1 Ω; bei gleicher Spannung bedeutet ein **größerer Widerstand einen kleineren Strom**.[^kuphaldt-dc-kap2]

Der Kehrwert ist der **[[leitwert|Leitwert]]** $G = 1/R$ mit der Einheit [Siemens](wiki:Siemens (Einheit)|Siemens (unit)) (S), benannt nach [Werner von Siemens](wiki:Werner von Siemens|Werner von Siemens). Er beschreibt, wie *gut* ein Bauteil leitet.`,
    },
    {
      id: 'video', type: 'video', youtube: 'iy5ohAB4FME', label: 'Ohmsches Gesetz: Alles „URI“? Erklärung und praktischer Versuch', channel: 'Elektrotechnik einfach erklärt',
      why: 'Ein kurzer deutscher Beitrag, der das Ohmsche Gesetz mit einem echten Versuch zeigt – eine gute Ergänzung zu den Reglern der Demo gleich.',
    },
    {
      id: 'gesetz', type: 'text', title: 'Definition und Gesetz sind zweierlei',
      md: `
Aus $R = U/I$ lässt sich $U$ und $I$ umformen (Formeln umstellen kennst du aus der ersten Lektion):

$$U = R \\cdot I \\qquad I = \\frac{U}{R} \\qquad R = \\frac{U}{I}$$

Eselsbrücke: **URI** (Spannung = Widerstand mal Strom).

Und jetzt kommt eine feine Unterscheidung: Man *kann* für jedes Bauteil in jedem Betriebspunkt den Quotienten $U/I$ ausrechnen. Das **[Ohmsche Gesetz](wiki:Ohmsches Gesetz|Ohm's law)** ist die Aussage, dass dieser Quotient **konstant** ist – unabhängig von Spannung und Strom (und bei gleichbleibender Temperatur). Ein Bauteil, auf das das zutrifft, nennt man einen *ohmschen Widerstand*.

Für ihn ist die **[[kennlinie|Kennlinie]]** $I(U)$ eine Gerade durch den Nullpunkt. Ihre Steigung ist $\\Delta I / \\Delta U = 1/R = G$. Ist die Kennlinie gekrümmt, gilt das Gesetz nicht – das Bauteil ist [[nichtlineares-bauteil|nichtlinear]].`,
    },
    {
      id: 'viz-ohm', type: 'viz', viz: 'ohm-lab', title: 'Ohm-Labor',
      params: { targets: [0.005, 0.02, 0.1], tol: 0.03 },
      task: 'Stelle im Modus **Widerstand** nacheinander die drei Zielströme ein (5 mA, 20 mA, 100 mA; ±3 %). Wechsle dann zur **Glühlampe** und vergleiche $R = U/I$ bei etwa 2 V und bei etwa 12 V.',
    },
    {
      id: 'calc-i', type: 'numeric', title: 'Strom aus U und R',
      question: 'An einem Widerstand von **470 Ω** liegen **12 V**. Welcher Strom fließt?',
      answer: 25.5, tolerance: 0.6, unit: 'mA',
      hint: '$I = U / R$ – das Ergebnis liegt im Milliampere-Bereich.',
      explain: '$I = \\dfrac{12\\ \\mathrm{V}}{470\\ \\Omega} \\approx 0{,}0255\\ \\mathrm{A} = 25{,}5\\ \\mathrm{mA}$.',
    },
    {
      id: 'calc-r', type: 'numeric', title: 'Widerstand aus U und I',
      question: 'Bei **5 V** fließen **20 mA**. Wie groß ist der Widerstand?',
      answer: 250, tolerance: 2, unit: 'Ω',
      hint: '$R = U / I$ – rechne 20 mA in 0,02 A um.',
      explain: '$R = \\dfrac{5\\ \\mathrm{V}}{0{,}020\\ \\mathrm{A}} = 250\\ \\Omega$. (Kopfrechnen: 5 V durch 20 mA ergibt 0,25 kΩ.)',
    },
    {
      id: 'calc-u', type: 'numeric', title: 'Spannung aus R und I',
      question: 'Durch einen Widerstand von **2,2 kΩ** fließen **3 mA**. Welche Spannung fällt an ihm ab?',
      answer: 6.6, tolerance: 0.07, unit: 'V',
      hint: 'kΩ · mA ergibt direkt V.',
      explain: '$U = R\\cdot I = 2{,}2\\ \\mathrm{k\\Omega}\\cdot 3\\ \\mathrm{mA} = 6{,}6\\ \\mathrm{V}$.',
    },
    {
      id: 'calc-g', type: 'numeric', title: 'Leitwert',
      question: 'Wie groß ist der Leitwert eines Widerstands von **250 Ω**?',
      answer: 4, tolerance: 0.04, unit: 'mS',
      hint: '$G = 1/R$; $1/250 = 0{,}004$ S.',
      explain: '$G = 1/250\\ \\Omega = 0{,}004\\ \\mathrm{S} = 4\\ \\mathrm{mS}$.',
    },
    {
      id: 'nichtlinear', type: 'text', title: 'Wenn das Gesetz nicht gilt',
      md: `
Eine **[Glühlampe](wiki:Glühlampe|Incandescent light bulb)** hat einen Faden aus [Wolfram](wiki:Wolfram|Tungsten). Kalt hat er wenig Widerstand; bei Betrieb glüht er und der Widerstand steigt auf ein Vielfaches (Metalle leiten warm schlechter). Verdoppelt man die Spannung, wächst der Strom daher nicht auf das Doppelte – die Kennlinie biegt ab.

Noch krasser ist die [Diode](wiki:Diode|Diode): Unterhalb von etwa 0,6 bis 0,7 V fließt fast nichts, darüber steigt der Strom rasant. Ihr Quotient $U/I$ ändert sich um viele Größenordnungen. Auch Heißleiter (NTC) und Kaltleiter (PTC) sind nichtlinear: Ihr Widerstand hängt stark von der Temperatur ab. Und in der anderen Richtung spricht man von **ohmschem Verhalten**, wenn die Kennlinie eine Gerade ist: Das trifft für übliche Festwiderstände sehr gut zu, solange sie sich nicht merklich erwärmen.

> Das Ohmsche Gesetz ist **kein Naturgesetz für alle Bauteile**, sondern ein Merkmal bestimmter Bauteile.`,
    },
    {
      id: 'quiz-lampe', type: 'quiz', title: 'Gilt das Ohmsche Gesetz?',
      question: 'Eine Glühlampe nimmt bei **2 V** einen Strom von **0,2 A** auf, bei **12 V** einen Strom von **0,6 A**. Gilt für sie das Ohmsche Gesetz?',
      options: [
        { text: 'Nein: Der Widerstand steigt von 10 Ω auf 20 Ω – er ist nicht konstant.', correct: true, why: '$R = 2/0{,}2 = 10\\ \\Omega$ bei 2 V, $R = 12/0{,}6 = 20\\ \\Omega$ bei 12 V. Der Faden erwärmt sich, sein Widerstand wächst.' },
        { text: 'Ja, das Ohmsche Gesetz gilt immer.', correct: false, why: 'Es gilt nur, wenn $R = U/I$ konstant ist. Das ist bei Glühlampen, Dioden und NTC nicht der Fall.' },
        { text: 'Ja, denn der Strom steigt mit der Spannung.', correct: false, why: 'Auch ein nichtlineares Bauteil lässt mehr Strom fließen. Entscheidend ist die *Proportionalität*: sechsfache Spannung müsste sechsfachen Strom ergeben (hier nur dreifach).' },
        { text: 'Das lässt sich ohne Messung der Temperatur nicht sagen.', correct: false, why: 'Die beiden Messwerte genügen: Der Quotient $U/I$ ändert sich, also gilt das Gesetz nicht.' },
      ],
    },
    {
      id: 'order-fehlersuche', type: 'order', title: 'Fehlersuche „Strom zu hoch“',
      prompt: 'In einer Schaltung fließt mehr Strom als erwartet. Bringe die Schritte der Fehlersuche in eine sinnvolle Reihenfolge.',
      items: ['Die Quellenspannung nachmessen', 'Den Widerstandswert prüfen (ausgebaut messen)', 'Den erwarteten Strom mit $I = U/R$ berechnen', 'Ergebnis mit der Messung vergleichen und auf Plausibilität prüfen'],
      explain: 'Erst die Randbedingungen (Spannung, Widerstand) sichern, dann rechnen, dann vergleichen. Weicht der Strom weiter ab, ist ein Bauteil nichtlinear, defekt oder ein anderer Zweig beteiligt.',
    },
    {
      id: 'mission', type: 'callout', tone: 'mission', title: 'Prüfung & Funkpraxis',
      md: `
Der Katalog fragt das Ohmsche Gesetz in allen drei Umformungen (NB501–NB503: $U = R\\cdot I$, $I = U/R$, $R = U/I$) und mit konkreten Zahlen aus Schaltbildern (NB504: 90 mA durch einen Widerstand – welche Spannung?, NB505: welcher Widerstandswert liegt vor?).[^bnetza-pruefungsfragen-2024] In der Prüfung steht die Formelsammlung zur Verfügung, aber der Taschenrechner und das sichere Umrechnen der Vorsätze aus Lektion 1 entscheiden über Minuten.

Praktisch: Wenn dein Netzteil 13,8 V liefert und der Transceiver beim Senden „bricht ein", rechnest du mit $R = U/I$ den gedachten Gesamtwiderstand – ein Hinweis darauf, ob die Zuleitung (mit eigenem Widerstand!) zu dünn ist.`,
    },
    {
      id: 'warning', type: 'callout', tone: 'warning', title: 'Typische Fehlvorstellungen',
      md: `
- **„Ein höherer Widerstand lässt mehr Strom durch."** Falsch: Bei fester Spannung sinkt der Strom ($I = U/R$).
- **„Das Ohmsche Gesetz gilt für alle Bauteile."** Falsch: Nur wenn $R$ konstant ist. Glühlampe, Diode, NTC und Co. sind Gegenbeispiele.
- **„R ändert sich, wenn ich die Spannung ändere."** Beim ohmschen Widerstand nicht; das ist gerade die Aussage des Gesetzes. Der Quotient $U/I$ bleibt gleich.`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>Deutsch</th><th>English</th></tr>
<tr><td>Widerstand</td><td>resistance (das Bauteil: resistor)</td></tr>
<tr><td>Ohmsches Gesetz</td><td>Ohm's law</td></tr>
<tr><td>Leitwert</td><td>conductance</td></tr>
<tr><td>Kennlinie</td><td>characteristic curve (I–V curve)</td></tr>
<tr><td>Steigung</td><td>slope</td></tr>
<tr><td>Glühlampe</td><td>incandescent lamp</td></tr>
<tr><td>Spannungsabfall</td><td>voltage drop</td></tr>
<tr><td>Arbeitspunkt</td><td>operating point</td></tr></table>`,
    },
    {
      id: 'recall-steigung', type: 'recall', title: 'Erkläre es',
      prompt: 'Was sagt die **Steigung** der $I(U)$-Kennlinie aus? Woran erkennst du an der Kennlinie, ob das Ohmsche Gesetz gilt?',
      answer: `Die Steigung $\\Delta I/\\Delta U$ ist der **Leitwert** $G = 1/R$: Je steiler die Gerade, desto besser leitet das Bauteil und desto kleiner ist sein Widerstand. Das Ohmsche Gesetz gilt, wenn die Kennlinie eine **Gerade durch den Nullpunkt** ist, denn dann ist $U/I$ überall gleich. Ist sie gekrümmt (Glühlampe, Diode), ändert sich der Quotient mit dem Arbeitspunkt; das Gesetz in der Form „R = konstant" gilt nicht.`,
      hints: ['Was ist die Einheit der Steigung ($\\mathrm{A/V}$)?', 'Wie sieht die Kennlinie einer Diode aus?'],
      cards: ['kennlinie-steigung'],
    },
  ],
  cards: [
    { id: 'ohm-formeln', front: 'Das Ohmsche Gesetz in allen drei Formen', back: '$U = R\\cdot I$, $I = U/R$, $R = U/I$ (Eselsbrücke: URI).' },
    { id: 'ohm-einheit', front: 'Einheit Ohm in V und A', back: '$1\\ \\Omega = 1\\ \\mathrm{V/A}$.' },
    { id: 'ohm-bedingung', front: 'Wann gilt das Ohmsche Gesetz?', back: 'Wenn $R = U/I$ konstant ist (und die Temperatur konstant bleibt) – Kennlinie = Gerade durch den Nullpunkt.' },
    { id: 'kennlinie-steigung', front: 'Was bedeutet die Steigung der $I(U)$-Kennlinie?', back: 'Den Leitwert $G = 1/R$ (Einheit Siemens).' },
    { id: 'leitwert', front: 'Leitwert und seine Einheit', back: '$G = 1/R$, in Siemens (S); 250 Ω entsprechen 4 mS.' },
    { id: 'nichtlinear', front: 'Nenne zwei nichtlineare Bauteile', back: 'Glühlampe (R wächst mit der Temperatur) und Diode (Strom steigt ab ca. 0,6–0,7 V steil); auch NTC/PTC.' },
    { id: 'hoeher-r', front: 'Höherer Widerstand bei fester Spannung – was passiert mit dem Strom?', back: 'Er sinkt: $I = U/R$.' },
    { id: 'u-aus-ri', front: '2,2 kΩ bei 3 mA – welche Spannung?', back: '6,6 V (kΩ · mA = V).' },
    { id: 'lampe-r', front: 'Glühlampe: 2 V/0,2 A und 12 V/0,6 A – Widerstand?', back: '10 Ω und 20 Ω: nicht konstant, also kein ohmsches Verhalten.' },
    { id: 'kennlinie-linear', front: 'Wie sieht die Kennlinie eines ohmschen Widerstands aus?', back: 'Eine Gerade durch den Nullpunkt im $I(U)$-Diagramm.' },
  ],
};
