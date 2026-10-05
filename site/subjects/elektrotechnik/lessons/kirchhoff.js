export default {
  id: 'kirchhoff',
  title: 'Knoten- und Maschenregel',
  summary: 'Zwei Bilanzen genügen, um jedes Gleichstromnetz zu knacken: Was in einen Knoten hineinfließt, fließt wieder heraus — und wer einmal im Kreis herum ist, hat in Summe keine Spannung gewonnen oder verloren.',
  minutes: 25,
  goals: [
    'Die [[kirchhoff-knotenregel|Knotenregel]] $\\sum I = 0$ auf einen [[knoten]] anwenden und einen unbekannten Strom bestimmen',
    'Die [[kirchhoff-maschenregel|Maschenregel]] $\\sum U = 0$ auf eine [[masche]] anwenden',
    'Zählpfeile für Strom und Spannung sauber setzen und Vorzeichen richtig deuten',
    'Die Ströme in einem Netz mit drei Zweigen systematisch berechnen und mit beiden Regeln gegenprüfen',
  ],
  needs: ['widerstand-und-ohm'],
  blocks: [
    {
      id: 'video-knoten', type: 'video', youtube: '-cSZQY1G6l4', label: 'So rechnest du mit der Knotenregel!', channel: 'Schrack for Students', minutes: 5,
      why: 'Kurze Rechenbeispiele zur Knotenregel — gut als Wiederholung, nachdem du den Text gelesen hast.',
    },
    {
      id: 'idee', type: 'text', title: 'Zwei Bilanzen, die immer stimmen',
      md: `
Das [Ohmsche Gesetz](wiki:Ohmsches Gesetz|Ohm's law) kennt nur *ein* Bauteil. Sobald ein [Netzwerk](wiki:Netzwerk (Elektrotechnik)|Electrical network) mehrere Zweige hat, brauchst du zwei weitere Werkzeuge. Sie gehen auf [Gustav Kirchhoff](wiki:Gustav Robert Kirchhoff|Gustav Kirchhoff) zurück, der sie 1845 als Student aufstellte, und sind nichts anderes als zwei Erhaltungssätze:[^wp-kirchhoffsche-regeln]

- **Knotenregel** = Erhaltung der [Ladung](wiki:Ladungserhaltung|Charge conservation): Ladung geht nicht verloren und sammelt sich in einem Draht-Knotenpunkt nicht an. Was an [elektrischem Strom](wiki:Elektrischer Strom|Electric current) hineinfließt, fließt auch wieder heraus — wie bei einer Rohrverzweigung, in der sich kein Wasser staut.
- **Maschenregel** = Erhaltung der Energie ([Energieerhaltungssatz](wiki:Energieerhaltungssatz|Conservation of energy)): Wandert eine Ladung einmal im Kreis und kommt am Startpunkt an, hat sie dort wieder dieselbe Energie. So wie du auf einer Rundwanderung am Ende wieder auf Starthöhe stehst: alle Anstiege und Abstiege zusammen ergeben null.

Für beides brauchst du ein paar Wörter: Ein **[[knoten]]** ist ein Punkt, an dem mindestens drei Leitungen zusammentreffen. Ein **Zweig** ist die Verbindung zwischen zwei Knoten (mit einem oder mehreren Bauteilen in Reihe, durch alle fließt derselbe Strom). Eine **[[masche]]** ist ein geschlossener Weg durch das Netz.`,
    },
    {
      id: 'knoten', type: 'text', title: 'Die Knotenregel',
      md: `
In jedem Knoten ist die Summe aller zufließenden Ströme gleich der Summe aller abfließenden Ströme. Rechnet man zufließende Ströme positiv und abfließende negativ, steht rechts null:

$$\\sum_k I_k = 0 \\qquad\\text{bzw.}\\qquad I_\\text{zu} = I_\\text{ab}$$

Beispiel: Auf einen Knoten fließen $I_1 = 3\\,\\mathrm{A}$ und $I_2 = 2\\,\\mathrm{A}$ zu, $I_3 = 1{,}5\\,\\mathrm{A}$ fließen ab. Dann muss über die vierte Leitung $I_4 = 3 + 2 - 1{,}5 = 3{,}5\\,\\mathrm{A}$ abfließen.

Die Regel gilt für jeden Knoten, egal wie viele Leitungen sich dort treffen und was in den Zweigen steckt. Sie ist auch der Grund, warum sich in einer [Parallelschaltung](wiki:Parallelschaltung|Series and parallel circuits) die Ströme addieren.`,
    },
    {
      id: 'masche', type: 'text', title: 'Die Maschenregel und die Zählpfeile',
      md: `
In jeder Masche ist die Summe aller [Spannungen](wiki:Elektrische Spannung|Voltage) null:

$$\\sum_k U_k = 0$$

Dazu legst du einen **Umlaufsinn** fest (z. B. im Uhrzeigersinn) und zählst jede Spannung positiv, wenn ihr Zählpfeil in Umlaufrichtung zeigt, sonst negativ. Beispiel: Eine Quelle mit $12\\,\\mathrm{V}$ speist zwei Widerstände in Reihe; an den ersten fallen $4\\,\\mathrm{V}$, an den zweiten $5\\,\\mathrm{V}$. Dann bleiben $12 - 4 - 5 = 3\\,\\mathrm{V}$ für das dritte Bauteil.

**Zählpfeile** sind Vereinbarungen, keine Messungen: Du zeichnest sie *vor* der Rechnung in den [Schaltplan](wiki:Schaltplan|Circuit diagram) ein, beliebig, aber konsequent. Ist das Ergebnis negativ, fließt der Strom (oder liegt die Spannung) in Wirklichkeit andersherum — ein Rechenergebnis, kein Fehler. Am **Verbraucher** zeigen Strom- und Spannungspfeil in dieselbe Richtung, dann ist $U = R \\cdot I$ ohne Minuszeichen. Bei der **Quelle** sind sie entgegengesetzt, weil dort Energie *abgegeben* wird (vgl. [Zählpfeilsystem](wiki:Zählpfeil|Passive sign convention)).`,
    },
    {
      id: 'vorgehen', type: 'text', title: 'Mit System zur Lösung',
      md: `
Das Vorgehen ist bei jedem Netz gleich: Zählpfeile setzen, je Knoten eine Gleichung aufstellen (eine weniger als Knoten vorhanden, sonst sind sie voneinander abhängig), je unabhängiger Masche eine zweite, Gleichungen lösen, Probe machen. Mit dem [[ohmsches-gesetz|Ohmschen Gesetz]] als Zusatz ($U_k = R_k \\cdot I_k$) ergibt das genau so viele Gleichungen wie Unbekannte.[^kuphaldt-vol1-ch6]

Für die einfachste Form — ein Widerstand $R_1$ in Reihe mit einer Parallelschaltung $R_2 \\parallel R_3$ — kommt man oft ohne Gleichungssystem aus, weil man vereinfachen kann ([[reihenschaltung]] und [[parallelschaltung]] sind das Thema der nächsten Lektion). In der Demo darfst du beide Wege probieren.`,
    },
    {
      id: 'viz-kirchhoff', type: 'viz', viz: 'kirchhoff-lab', title: 'Kirchhoff-Labor',
      task: 'Löse **drei verschiedene Netze**: Berechne $I_1$, $I_2$ und $I_3$ selbst (in mA) und tippe sie ein. Mit „Knoten A prüfen" und „Maschen prüfen" testest du deine Zahlen mit den Kirchhoffschen Regeln, bevor du sie abgibst. Im Modus *Experiment* kannst du die Werte frei verstellen.',
    },
    {
      id: 'num-knoten', type: 'numeric', title: 'Knotenbilanz',
      question: 'In einem Knoten fließen $3\\,\\mathrm{A}$ und $2\\,\\mathrm{A}$ zu, $1{,}5\\,\\mathrm{A}$ fließen ab. Wie groß ist der Strom in der noch fehlenden vierten Leitung, die ebenfalls **abfließt**?',
      answer: 3.5, tolerance: 0.01, unit: 'A',
      hint: 'Summe der zufließenden Ströme = Summe der abfließenden Ströme.',
      explain: '$I_\\text{zu} = 3 + 2 = 5\\,\\mathrm{A}$; abfließend sind schon $1{,}5\\,\\mathrm{A}$, also $I_4 = 5 - 1{,}5 = 3{,}5\\,\\mathrm{A}$.',
    },
    {
      id: 'num-masche', type: 'numeric', title: 'Maschenbilanz',
      question: 'Eine $12\\,\\mathrm{V}$-Quelle speist drei Bauteile in Reihe. An den ersten beiden fallen $4\\,\\mathrm{V}$ und $5\\,\\mathrm{V}$ ab. Wie groß ist der Spannungsabfall am dritten?',
      answer: 3, tolerance: 0.01, unit: 'V',
      explain: '$12 - 4 - 5 - U_3 = 0 \\Rightarrow U_3 = 3\\,\\mathrm{V}$.',
    },
    {
      id: 'num-r3', type: 'numeric', title: 'Strom im dritten Zweig',
      question: 'Am Knoten A fließt $I_1 = 30\\,\\mathrm{mA}$ zu und teilt sich in $I_2 = 20\\,\\mathrm{mA}$ und $I_3$. Wie groß ist $I_3$?',
      answer: 10, tolerance: 0.05, unit: 'mA',
      explain: '$I_3 = I_1 - I_2 = 30 - 20 = 10\\,\\mathrm{mA}$.',
    },
    {
      id: 'quiz-parallel', type: 'quiz', title: 'Zwei Zweige, ein Gesamtstrom',
      question: 'Zwei Zweige liegen parallel an derselben Quelle, der Gesamtstrom beträgt $100\\,\\mathrm{mA}$. Im ersten Zweig fließen $60\\,\\mathrm{mA}$. Welcher Strom fließt im zweiten Zweig?',
      options: [
        { text: '40 mA', correct: true, why: 'Knotenregel: $100 - 60 = 40\\,\\mathrm{mA}$.' },
        { text: '60 mA', correct: false, why: 'Dann wären beide Zweige gleich belastet und der Gesamtstrom wäre $120\\,\\mathrm{mA}$ statt $100\\,\\mathrm{mA}$.' },
        { text: '160 mA', correct: false, why: 'Ströme werden hier nicht addiert, sondern zerlegt: Der Gesamtstrom ist die *Summe* der Zweigströme.' },
        { text: '100 mA — der Strom teilt sich nicht auf', correct: false, why: 'Gerade in der Parallelschaltung teilt sich der Strom auf, die Spannung ist überall gleich.' },
      ],
    },
    {
      id: 'order-vorgehen', type: 'order', title: 'Vorgehen bei einem Netz',
      prompt: 'Bringe die Schritte zur Lösung eines Netzes in eine sinnvolle Reihenfolge.',
      items: [
        'Zählpfeile für alle Ströme und Spannungen einzeichnen',
        'Knotengleichung(en) aufstellen',
        'Maschengleichung(en) mit $U = R \\cdot I$ aufstellen',
        'Gleichungssystem lösen',
        'Probe: Knoten und Maschen mit den Ergebnissen noch einmal prüfen',
      ],
      explain: 'Ohne Zählpfeile sind Vorzeichen später nicht zu deuten; die Probe fängt Rechenfehler ab — dafür sind die beiden Regeln genau richtig.',
    },
    {
      id: 'match-regeln', type: 'match', title: 'Regel und Aussage',
      prompt: 'Ordne zu.',
      pairs: [
        ['Knotenregel', 'zufließende Ströme = abfließende Ströme'],
        ['Maschenregel', 'Summe der Spannungen im Umlauf = 0'],
        ['Parallelschaltung', 'gleiche Spannung, Ströme addieren sich'],
        ['Reihenschaltung', 'gleicher Strom, Spannungen addieren sich'],
      ],
    },
    {
      id: 'recall-regeln', type: 'recall', title: 'Mit eigenen Worten',
      prompt: 'Formuliere Knoten- und Maschenregel mit eigenen Worten *und* als Formel. Warum sind beide Regeln „Erhaltungssätze"?',
      answer: `**Knotenregel:** In jedem Knoten ist die Summe der zufließenden Ströme gleich der Summe der abfließenden, $\\sum I = 0$ (bei Vorzeichenkonvention). Grund: Ladung bleibt erhalten und sammelt sich im Knoten nicht an.

**Maschenregel:** In jedem geschlossenen Umlauf ist die Summe aller Spannungen null, $\\sum U = 0$. Grund: Energieerhaltung — eine Ladung, die einmal herum ist, hat wieder die Energie vom Start; was die Quelle hineinsteckt, geben die Verbraucher ab.`,
      hints: ['Welche Größe bleibt am Knoten erhalten?', 'Was passiert mit der Energie einer Ladung auf einem geschlossenen Weg?'],
      cards: ['knotenregel', 'maschenregel'],
    },
    {
      id: 'mission', type: 'callout', tone: 'mission', title: 'Prüfung und Funkpraxis',
      md: `
Kirchhoff wird im amtlichen Katalog kaum beim Namen gefragt, steckt aber hinter den Aufgaben zur Spannungs- und Stromaufteilung (z. B. ED101–ED103 zu Spannungsteilern und ED104–ED116 zu Gesamtwiderständen): Wer die Regeln verstanden hat, muss keine Formeln dazu auswendig lernen.[^bnetza-pruefungsfragen-2024]

Praktisch begegnet dir die Knotenregel im Shack ständig: Der Strom, den dein Netzteil liefert, ist die Summe der Ströme aller Verbraucher an seiner Verteilerschiene — Funkgerät, Zubehör, Beleuchtung. Die Sicherung am Netzteil sieht diesen *Gesamtstrom*, auch wenn jedes Einzelgerät für sich harmlos ist.`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>Deutsch</th><th>English</th></tr>
<tr><td>Knoten(punkt)</td><td>node, junction</td></tr>
<tr><td>Zweig</td><td>branch</td></tr>
<tr><td>Masche, Umlauf</td><td>mesh, loop</td></tr>
<tr><td>Knotenregel (1. Kirchhoffsche Regel)</td><td>Kirchhoff's current law (KCL)</td></tr>
<tr><td>Maschenregel (2. Kirchhoffsche Regel)</td><td>Kirchhoff's voltage law (KVL)</td></tr>
<tr><td>Zählpfeil</td><td>reference arrow (sign convention)</td></tr>
<tr><td>Spannungsabfall</td><td>voltage drop</td></tr>
<tr><td>Verbraucher / Quelle</td><td>load / source</td></tr></table>`,
    },
    {
      id: 'warning', type: 'callout', tone: 'warning', title: 'Typische Denkfehler',
      md: `
- **„In der Reihenschaltung teilt sich der Strom auf."** Nein: In einer Reihenschaltung fließt überall derselbe Strom; *die Spannung* teilt sich. Der Strom teilt sich erst an einem Knoten auf.
- **„Der Strom wird im Verbraucher verbraucht."** Nein: Hinter dem Verbraucher ist der Strom genauso groß wie davor — das verlangt die Knotenregel. Verbraucht wird *Energie*.
- **Ein negatives Ergebnis ist ein Fehler.** Nein: Es heißt nur, dass der tatsächliche Strom entgegen deinem Zählpfeil fließt.`,
    },
  ],
  cards: [
    { id: 'knotenregel', front: 'Knotenregel (Formel und Aussage)', back: '$\\sum I = 0$ — die Summe der zufließenden Ströme ist gleich der Summe der abfließenden. Grund: Ladungserhaltung.' },
    { id: 'maschenregel', front: 'Maschenregel (Formel und Aussage)', back: '$\\sum U = 0$ — in jedem geschlossenen Umlauf ist die Summe der Spannungen null. Grund: Energieerhaltung.' },
    { id: 'was-ist-knoten', front: 'Was ist ein Knoten, was ein Zweig, was eine Masche?', back: 'Knoten: Punkt, an dem mindestens drei Leitungen zusammentreffen. Zweig: Verbindung zwischen zwei Knoten. Masche: geschlossener Weg durch das Netz.' },
    { id: 'zaehlpfeil', front: 'Zählpfeil-Konvention am Verbraucher', back: 'Strom- und Spannungspfeil zeigen in dieselbe Richtung, dann gilt $U = R \\cdot I$ ohne Minus.' },
    { id: 'negatives-ergebnis', front: 'Was bedeutet ein negativer Strom im Ergebnis?', back: 'Der tatsächliche Strom fließt entgegen dem eingezeichneten Zählpfeil — kein Fehler.' },
    { id: 'rein-raus', front: 'Wie viel Strom fließt in einen Knoten, wie viel heraus?', back: 'Genau gleich viel: was hineinfließt, fließt auch heraus.' },
    { id: 'reihe-strom', front: 'Reihenschaltung: Was ist gleich, was addiert sich?', back: 'Der Strom ist überall gleich; die Teilspannungen addieren sich zur Gesamtspannung.' },
    { id: 'parallel-spannung', front: 'Parallelschaltung: Was ist gleich, was addiert sich?', back: 'Die Spannung ist an allen Zweigen gleich; die Zweigströme addieren sich zum Gesamtstrom.' },
    { id: 'gleichungen-anzahl', front: 'Wie viele Knotengleichungen sind unabhängig?', back: 'Eine weniger als Knoten im Netz — die letzte ergibt sich aus den anderen.' },
    { id: 'rundlauf', front: 'Merkhilfe zur Maschenregel', back: '„Rundlauf ergibt null": Wer einmal im Kreis herum ist, hat in Summe keine Spannung gewonnen oder verloren.' },
  ],
};
