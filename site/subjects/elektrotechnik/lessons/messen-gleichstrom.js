export default {
  id: 'messen-gleichstrom',
  title: 'Multimeter, Messfehler, Messbereichserweiterung',
  summary: 'Jedes Messgerät greift in die Schaltung ein. Wer weiß, warum das Voltmeter hochohmig und das Amperemeter niederohmig sein muss, misst richtig — und kann den Fehler abschätzen, den er dabei macht.',
  minutes: 30,
  goals: [
    'Ein [[voltmeter|Voltmeter]] parallel und ein [[amperemeter|Amperemeter]] in Reihe anschließen und begründen, warum das eine hochohmig, das andere niederohmig sein soll',
    'Den Messfehler durch den [[innenwiderstand|Innenwiderstand]] des Messgeräts berechnen (Voltmeter am Teiler)',
    'Den [[shunt|Shunt]] für einen erweiterten Strommessbereich berechnen: $R_S = R_i I_a/(I - I_a)$',
    'Die Genauigkeitsklasse in einen relativen Fehler umrechnen: $F_W = \\pm\\frac{G}{100}\\cdot\\frac{W_E}{W_M}$',
    'Das [[vielfachmessgeraet|Multimeter]] bedienen und die typischen Fehlbedienungen vermeiden',
  ],
  needs: ['spannungsteiler-stromteiler', 'reale-quellen'],
  blocks: [
    {
      id: 'video-multimeter', type: 'video', youtube: '_ojBTpmCVJ0', label: 'Spannung, Strom und Widerstand mit dem Multimeter messen', channel: 'Elektrotechnik einfach erklärt', minutes: 6,
      why: 'Kurzer Überblick über die Bedienung eines Multimeters; schau ihn dir vor der Demo an, um die Buchsen und Bereiche wiederzuerkennen.',
    },
    {
      id: 'idee', type: 'text', title: 'Messen heißt Eingreifen',
      md: `
Ein [Messgerät](wiki:Messgerät|Measuring instrument) kann nichts messen, ohne der Schaltung etwas zu entnehmen oder in sie hineinzuschreiben. Das **[Voltmeter](wiki:Voltmeter|Voltmeter)** misst die Spannung *zwischen zwei Punkten*; es wird deshalb **parallel** zum Messobjekt angeschlossen und braucht einen kleinen Strom für die Anzeige. Das **[Amperemeter](wiki:Amperemeter|Ammeter)** misst den Strom *durch* einen Zweig; es muss **in Reihe** in den Zweig eingeschleift werden und erzeugt dort einen kleinen Spannungsabfall.

Beide Messgeräte haben also einen eigenen Widerstand — den [[innenwiderstand|Innenwiderstand]] $R_i$ — und stören damit die Schaltung. Je kleiner die Störung, desto besser:

- **Voltmeter: hochohmig.** Es liegt parallel; je größer sein $R_i$, desto weniger Strom zieht es. Moderne [Digitalmultimeter](wiki:Digitalmultimeter|Digital multimeter) haben meist $10\\,\\mathrm{M\\Omega}$.
- **Amperemeter: niederohmig.** Es liegt in Reihe; je kleiner sein $R_i$, desto kleiner der Spannungsabfall und damit der Fehler.

Das Ideal wären $R_i = \\infty$ beim Voltmeter und $R_i = 0$ beim Amperemeter.[^bnetza-pruefungsfragen-2024]`,
    },
    {
      id: 'fehler', type: 'text', title: 'Wie groß ist die Störung?',
      md: `
Beispiel: Ein Teiler aus zwei Widerständen von je $1\\,\\mathrm{M\\Omega}$ an $10\\,\\mathrm{V}$. Unbelastet liegen $5{,}00\\,\\mathrm{V}$ über dem unteren Widerstand. Ein Voltmeter mit $10\\,\\mathrm{M\\Omega}$ parallel dazu ergibt $1\\,\\mathrm{M\\Omega}\\parallel 10\\,\\mathrm{M\\Omega} \\approx 0{,}909\\,\\mathrm{M\\Omega}$, und damit

$$U_\\text{angezeigt} = 10\\,\\mathrm{V}\\cdot\\frac{0{,}909}{1 + 0{,}909} \\approx 4{,}76\\,\\mathrm{V}$$

Das sind knapp **−4,8 %** Messfehler — nicht das Gerät ist ungenau, sondern die Schaltung wurde belastet (es ist derselbe Effekt wie beim [belasteten Spannungsteiler](wiki:Spannungsteiler|Voltage divider)). Als Faustregel sollte $R_{i,V}$ mindestens das Hundertfache des Widerstands betragen, an dem man misst, wenn der Fehler unter 1 % bleiben soll.

Ein *analoges* [Zeigerinstrument](wiki:Zeigerinstrument) ([Drehspulmesswerk](wiki:Drehspulmesswerk|Moving coil meter)) verhält sich anders: Seine Empfindlichkeit wird in $\\mathrm{k\\Omega/V}$ angegeben, der Kehrwert des Vollausschlagstroms. Ein Messwerk mit $50\\,\\mathrm{\\mu A}$ Vollausschlag hat $20\\,\\mathrm{k\\Omega/V}$; im $10\\,\\mathrm{V}$-Bereich ist der Innenwiderstand also $200\\,\\mathrm{k\\Omega}$ — für hochohmige Schaltungen viel zu wenig.`,
    },
    {
      id: 'bereich', type: 'text', title: 'Messbereiche erweitern',
      md: `
Ein Messwerk hat einen festen Vollausschlagstrom $I_a$ und einen Innenwiderstand $R_i$. Um größere Ströme zu messen, schaltet man dem Messwerk einen kleinen Widerstand parallel, den **[Shunt](wiki:Shunt (Elektrotechnik)|Shunt (electrical))** $R_S$. Er nimmt den Überschuss auf — es ist ein Stromteiler:

$$R_S = \\frac{R_i\\cdot I_a}{I - I_a}$$

Beispiel: Ein Messwerk mit $I_a = 50\\,\\mathrm{\\mu A}$ und $R_i = 2\\,\\mathrm{k\\Omega}$ soll $10\\,\\mathrm{mA}$ anzeigen. Der Shunt muss $9{,}95\\,\\mathrm{mA}$ aufnehmen: $R_S = 2000\\,\\Omega\\cdot 50\\,\\mathrm{\\mu A}/9{,}95\\,\\mathrm{mA} \\approx 10{,}05\\,\\Omega$.

Für Spannungsbereiche schaltet man einen **Vorwiderstand** in Reihe zum Messwerk (Spannungsteiler): $R_V = U/I_a - R_i$.

Ein Wort zur **Genauigkeit**: Analoge Instrumente tragen eine Genauigkeitsklasse $G$, z. B. $1{,}5$. Der maximale Fehler bezieht sich auf den *Endwert* $W_E$ des Messbereichs, nicht auf den Messwert — bei kleinen Ausschlägen ist der relative Fehler deshalb groß:

$$F_W = \\pm\\frac{G}{100}\\cdot\\frac{W_E}{W_M}$$

Klasse $1{,}5$, Endwert $10\\,\\mathrm{V}$, abgelesen $4\\,\\mathrm{V}$: $F_W = \\pm 0{,}015\\cdot 10/4 = \\pm 3{,}75\\,\\%$. Lehre: Immer den Bereich so wählen, dass der Zeiger im oberen Drittel steht.

Zum Schluss noch der [[tastkopf|Tastkopf]] am [[oszilloskop|Oszilloskop]]: Ein $10{:}1$-Tastkopf schaltet $9\\,\\mathrm{M\\Omega}$ in Reihe zum $1\\,\\mathrm{M\\Omega}$-Eingang des Geräts — wieder ein Spannungsteiler. Er belastet die Schaltung mit $10\\,\\mathrm{M\\Omega}$ statt $1\\,\\mathrm{M\\Omega}$ (und die Kabelkapazität wirkt weniger), das Bild ist dafür auf ein Zehntel verkleinert.`,
    },
    {
      id: 'viz-loading', type: 'viz', viz: 'meter-loading-lab', title: 'Messgerät belastet die Schaltung',
      task: 'Stelle zuerst beim **Voltmeter** und dann beim **Amperemeter** einen Innenwiderstand ein, bei dem der Messfehler unter **1 %** bleibt. Beachte, in welche Richtung du bei beiden Geräten drehen musst.',
    },
    {
      id: 'viz-trainer', type: 'viz', viz: 'multimeter-trainer', title: 'Virtuelles Multimeter',
      task: 'Miss in der Schaltung **fünf Größen** richtig: Wähle Messart, Bereich und Buchsen, setze die Prüfspitzen und lies ab. Vorsicht: Wer einen Strom mit den Spitzen *parallel* zu einem Bauteil misst, lässt die Sicherung durchbrennen.',
    },
    {
      id: 'num-voltmeter', type: 'numeric', title: 'Anzeige des belasteten Teilers',
      question: 'Ein Teiler aus zweimal $1\\,\\mathrm{M\\Omega}$ liegt an $10\\,\\mathrm{V}$. Ein Voltmeter mit $R_i = 10\\,\\mathrm{M\\Omega}$ misst am unteren Widerstand. Welche Spannung zeigt es an?',
      answer: 4.76, tolerance: 0.03, unit: 'V',
      hint: 'Erst $1\\,\\mathrm{M\\Omega}\\parallel 10\\,\\mathrm{M\\Omega}$, dann die Teilerformel.',
      explain: '$R_2\\parallel R_{i,V} = 0{,}909\\,\\mathrm{M\\Omega}$; $U = 10\\cdot 0{,}909/1{,}909 = 4{,}76\\,\\mathrm{V}$. Der Fehler beträgt $-4{,}8\\,\\%$ gegenüber den wahren $5\\,\\mathrm{V}$.',
    },
    {
      id: 'num-shunt', type: 'numeric', title: 'Shunt berechnen',
      question: 'Ein Messwerk mit $50\\,\\mathrm{\\mu A}$ Vollausschlag und $R_i = 2\\,\\mathrm{k\\Omega}$ soll auf $10\\,\\mathrm{mA}$ erweitert werden. Wie groß ist der Shunt?',
      answer: 10.05, tolerance: 0.1, unit: 'Ω',
      hint: '$R_S = R_i\\cdot I_a/(I - I_a)$ — beachte die Einheiten.',
      explain: '$R_S = 2000\\,\\Omega\\cdot 50\\cdot 10^{-6}/(10\\cdot 10^{-3} - 50\\cdot 10^{-6}) = 0{,}1/0{,}00995 \\approx 10{,}05\\,\\Omega$.',
    },
    {
      id: 'num-klasse', type: 'numeric', title: 'Genauigkeitsklasse',
      question: 'Ein Zeigerinstrument der Klasse $1{,}5$ hat den Endwert $10\\,\\mathrm{V}$. Abgelesen werden $4\\,\\mathrm{V}$. Wie groß ist der maximale relative Fehler (in %)?',
      answer: 3.75, tolerance: 0.05, unit: '%',
      explain: '$F_W = \\frac{1{,}5}{100}\\cdot\\frac{10\\,\\mathrm{V}}{4\\,\\mathrm{V}} = 0{,}0375 = 3{,}75\\,\\%$.',
    },
    {
      id: 'num-empfindlich', type: 'numeric', title: 'Empfindlichkeit',
      question: 'Ein Messwerk hat $50\\,\\mathrm{\\mu A}$ Vollausschlag. Welche Empfindlichkeit hat es?',
      answer: 20, tolerance: 0.1, unit: 'kΩ/V',
      explain: '$E = 1/I_a = 1/50\\,\\mathrm{\\mu A} = 20\\,\\mathrm{k\\Omega/V}$.',
    },
    {
      id: 'quiz-amperemeter', type: 'quiz', title: 'Amperemeter anschließen',
      question: 'Wie wird ein Amperemeter angeschlossen, damit der Messfehler klein bleibt?',
      options: [
        { text: 'In Reihe zum Verbraucher, möglichst niederohmig.', correct: true, why: 'Es muss vom ganzen Strom durchflossen werden, und sein Spannungsabfall $I\\cdot R_i$ soll klein bleiben.' },
        { text: 'Parallel zum Verbraucher, möglichst hochohmig.', correct: false, why: 'So misst man Spannungen; parallel angeschlossen wäre ein Amperemeter ein Kurzschluss.' },
        { text: 'In Reihe zum Verbraucher, möglichst hochohmig.', correct: false, why: 'Ein hochohmiges Amperemeter würde den Strom stark begrenzen und den Messwert verfälschen.' },
        { text: 'Parallel zum Verbraucher, möglichst niederohmig.', correct: false, why: 'Das wäre ein (fast) direkter Kurzschluss der Quelle; die Sicherung brennt durch.' },
      ],
    },
    {
      id: 'order-messen', type: 'order', title: 'Messen mit dem Multimeter',
      prompt: 'Bringe die Schritte einer Strommessung in eine sinnvolle Reihenfolge.',
      items: [
        'Messbereich grob schätzen (im Zweifel den größten wählen)',
        'Messart (Gleichstrom, Strom) und Buchsen am Gerät einstellen',
        'Schaltung spannungsfrei machen und das Messgerät in den Stromzweig einschleifen',
        'Schaltung einschalten, Anzeige ablesen und Bereich ggf. verkleinern',
        'Ergebnis auf Plausibilität prüfen',
      ],
      explain: 'Strom misst man nur im spannungsfreien Zustand eingeschleift: Das Auftrennen unter Spannung ist gefährlich, und ein falscher Anschluss (z. B. in der Strombuchse parallel zur Spannungsquelle) ist ein Kurzschluss.',
    },
    {
      id: 'recall-hochohmig', type: 'recall', title: 'Hochohmig und niederohmig',
      prompt: 'Warum soll ein Voltmeter hochohmig und ein Amperemeter niederohmig sein? Begründe mit der Schaltung (parallel/Reihe).',
      answer: `Das Voltmeter liegt *parallel* zum Messobjekt. Parallel liegt ein zusätzlicher Strompfad: Je kleiner sein Widerstand, desto mehr Strom zieht es ab und desto stärker bricht die Spannung ein. Daher: hochohmig. Das Amperemeter liegt *in Reihe*. Dort addiert sich sein Innenwiderstand zum Widerstand des Zweiges; er verkleinert den Strom und lässt Spannung abfallen. Daher: niederohmig. Beides lässt sich als Spannungsteiler / Stromteiler verstehen.`,
      hints: ['Parallel oder in Reihe — was addiert sich jeweils?', 'Wie ändert sich $R_\\text{ges}$ durch das Messgerät?'],
      cards: ['voltmeter-regel', 'amperemeter-regel'],
    },
    {
      id: 'mission', type: 'callout', tone: 'mission', title: 'Prüfung und Funkpraxis',
      md: `
Der Katalog fragt das Grundprinzip direkt: **EI101** — Spannungsmessgeräte werden parallel zum Messobjekt angeschlossen und sollten hochohmig sein, damit der Fehler gering bleibt. EI102 verlangt die passende Messschaltung zur Bestimmung eines Widerstands nach dem [Ohmschen Gesetz](wiki:Ohmsches Gesetz|Ohm's law) (Voltmeter parallel, Amperemeter in Reihe), und in EI103/EI104 liest du einen Zeigerausschlag bei verschiedenen Bereichen ab. Die Formel für den Fehler nach Genauigkeitsklasse steht in der Formelsammlung.[^bnetza-pruefungsfragen-2024]

Praxis im Shack: Den Strom deines Funkgeräts misst du am besten mit einem Messgerät *in der Zuleitung* (nie parallel!). Für hohe Ströme (20 A und mehr) braucht das Messgerät einen Shunt — die Strombuchse des Handmultimeters hat meist nur $10\\,\\mathrm{A}$ und eine Sicherung.`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>Deutsch</th><th>English</th></tr>
<tr><td>Spannungsmesser, Voltmeter</td><td>voltmeter</td></tr>
<tr><td>Strommesser, Amperemeter</td><td>ammeter</td></tr>
<tr><td>Vielfachmessgerät, Multimeter</td><td>multimeter, DMM</td></tr>
<tr><td>Messbereich</td><td>measuring range</td></tr>
<tr><td>Messbereichserweiterung</td><td>range extension</td></tr>
<tr><td>Nebenwiderstand, Shunt</td><td>shunt</td></tr>
<tr><td>Vorwiderstand</td><td>series (multiplier) resistor</td></tr>
<tr><td>Genauigkeitsklasse</td><td>accuracy class</td></tr>
<tr><td>Messabweichung, Messfehler</td><td>measurement error</td></tr>
<tr><td>Tastkopf</td><td>probe</td></tr></table>`,
    },
    {
      id: 'warning', type: 'callout', tone: 'warning', title: 'Typische Denkfehler',
      md: `
- **„Ein Voltmeter wird in Reihe geschaltet."** Nein: Spannung misst man *parallel* (hochohmig), Strom *in Reihe* (niederohmig).
- **Strom parallel zur Quelle messen.** Das Amperemeter ist (fast) ein Kurzschluss — Sicherung oder Messgerät sind hin.
- **Klasse 1,5 heißt immer 1,5 % Fehler.** Der Fehler bezieht sich auf den *Endwert*; bei 40 % des Bereichs ist er schon über 3 % des Messwerts. Bereich passend wählen.
- **Das Messgerät misst den wahren Wert.** Es misst den Wert *mit* eingebautem Messgerät. Nur wenn $R_{i,V}$ viel größer (bzw. $R_{i,A}$ viel kleiner) als die Schaltung ist, stimmt das.`,
    },
  ],
  cards: [
    { id: 'voltmeter-regel', front: 'Spannungsmessung: Anschluss und Eigenschaft des Voltmeters', back: 'Parallel zum Messobjekt, möglichst hochohmig (Katalog EI101).' },
    { id: 'amperemeter-regel', front: 'Strommessung: Anschluss und Eigenschaft des Amperemeters', back: 'In Reihe in den Zweig, möglichst niederohmig.' },
    { id: 'shunt-formel', front: 'Shunt für Strombereichserweiterung', back: '$R_S = \\frac{R_i\\cdot I_a}{I - I_a}$ (parallel zum Messwerk). Beispiel: $50\\,\\mathrm{\\mu A}$, $2\\,\\mathrm{k\\Omega}$ auf $10\\,\\mathrm{mA}$: $10{,}05\\,\\Omega$.' },
    { id: 'vorwiderstand-messwerk', front: 'Vorwiderstand für Spannungsbereich', back: '$R_V = U/I_a - R_i$ (in Reihe zum Messwerk).' },
    { id: 'klasse-fehler', front: 'Genauigkeitsklasse und relativer Fehler', back: '$F_W = \\pm\\frac{G}{100}\\cdot\\frac{W_E}{W_M}$ — bezogen auf den Endwert $W_E$; große Ausschläge sind genauer.' },
    { id: 'empfindlichkeit', front: 'Empfindlichkeit eines Zeigerinstruments', back: '$E = 1/I_a$, z. B. $50\\,\\mathrm{\\mu A} \\to 20\\,\\mathrm{k\\Omega/V}$; Innenwiderstand = Endwert × Empfindlichkeit.' },
    { id: 'tastkopf-10-1', front: 'Tastkopf 10:1', back: '$9\\,\\mathrm{M\\Omega}$ in Reihe zum $1\\,\\mathrm{M\\Omega}$-Eingang: Teiler 10:1, Last für die Schaltung $10\\,\\mathrm{M\\Omega}$.' },
    { id: 'messfehler-teiler', front: 'Voltmeter 10 MΩ an 1 MΩ des 1 MΩ/1 MΩ-Teilers (10 V)', back: 'Anzeige $4{,}76\\,\\mathrm{V}$ statt $5\\,\\mathrm{V}$, Fehler $-4{,}8\\,\\%$.' },
    { id: 'strom-nie-parallel', front: 'Was passiert bei Strommessung parallel zur Quelle?', back: 'Kurzschluss durch den kleinen Innenwiderstand des Amperemeters: Sicherung brennt durch oder das Gerät wird zerstört.' },
    { id: 'bereich-wahl', front: 'Wie wählt man den Messbereich?', back: 'Im Zweifel mit dem größten beginnen und verkleinern, bis der Zeiger im oberen Drittel steht (kleiner relativer Fehler).' },
  ],
};
