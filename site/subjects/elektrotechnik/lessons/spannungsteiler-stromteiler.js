export default {
  id: 'spannungsteiler-stromteiler',
  title: 'Teiler, belastet und unbelastet',
  summary: 'Spannung und Strom lassen sich mit zwei Widerständen im festen Verhältnis aufteilen — solange nichts am Teiler zieht. Mit Last sieht die Rechnung anders aus, und genau das ist der häufigste Praxisfehler.',
  minutes: 30,
  goals: [
    'Die Ausgangsspannung eines unbelasteten [[spannungsteiler|Spannungsteilers]] mit $U_2 = U\\cdot\\frac{R_2}{R_1+R_2}$ berechnen',
    'Erklären, warum eine Last den [[belasteter-spannungsteiler|Spannungsteiler]] verändert, und den belasteten Wert berechnen',
    'Einen Spannungsteiler dimensionieren (Querstrom, E12-Werte) und das [[potentiometer|Potentiometer]] als einstellbaren Teiler deuten',
    'Den [[stromteiler|Stromteiler]] anwenden: $I_2/I_1 = R_1/R_2$',
  ],
  needs: ['reihen-und-parallelschaltung'],
  blocks: [
    {
      id: 'idee', type: 'text', title: 'Spannung in Scheiben schneiden',
      md: `
In einer Reihenschaltung fließt überall derselbe Strom — also fällt am größeren Widerstand die größere Spannung ab. Das nutzt der **[Spannungsteiler](wiki:Spannungsteiler|Voltage divider)**: zwei Widerstände $R_1$ (oben) und $R_2$ (unten) an der Spannung $U$, abgegriffen wird die Spannung $U_2$ über dem unteren Widerstand. Ohne Verbraucher am Abgriff fließt nach dem [Ohmschen Gesetz](wiki:Ohmsches Gesetz|Ohm's law) $I = U/(R_1+R_2)$ durch beide, und mit $U_2 = R_2\\cdot I$ folgt:

$$\\frac{U_2}{U} = \\frac{R_2}{R_1 + R_2} \\qquad\\Longleftrightarrow\\qquad U_2 = U\\cdot\\frac{R_2}{R_1 + R_2}$$

Beispiel: $U = 12\\,\\mathrm{V}$, $R_1 = 10\\,\\mathrm{k\\Omega}$ oben, $R_2 = 5\\,\\mathrm{k\\Omega}$ unten. Der untere Widerstand hat ein Drittel des Gesamtwiderstands ($5/15$), bekommt also ein Drittel der Spannung: $U_2 = 4\\,\\mathrm{V}$. Die Spannung teilt sich *im Verhältnis der Widerstände*; nur dieses Verhältnis zählt, nicht die absoluten Werte.[^wp-spannungsteiler]

Merke den Spezialfall: $R_1 = R_2$ halbiert die Spannung. Ein Spannungsteiler kann die Spannung nur *verkleinern*, nie erhöhen: $U_2 < U$.`,
    },
    {
      id: 'last', type: 'text', title: 'Was passiert, wenn etwas dranhängt',
      md: `
Die schöne Formel gilt nur **unbelastet**. Sobald am Abgriff ein Verbraucher mit dem Widerstand $R_L$ hängt, liegt er parallel zu $R_2$ — und eine Parallelschaltung ist kleiner als jeder ihrer Zweige. Der untere Teil des Teilers wird kleiner, die Ausgangsspannung sinkt:

$$U_2 = U\\cdot\\frac{R_2\\parallel R_L}{R_1 + R_2\\parallel R_L} \\qquad\\text{mit}\\qquad R_2\\parallel R_L = \\frac{R_2 R_L}{R_2+R_L}$$

Beispiel: $U = 10\\,\\mathrm{V}$, $R_1 = R_2 = 10\\,\\mathrm{k\\Omega}$. Unbelastet liegen $5\\,\\mathrm{V}$ am Ausgang. Mit $R_L = 10\\,\\mathrm{k\\Omega}$ wird $R_2 \\parallel R_L = 5\\,\\mathrm{k\\Omega}$, und $U_2 = 10\\,\\mathrm{V}\\cdot 5/15 \\approx 3{,}33\\,\\mathrm{V}$. Eine Last von der Größe von $R_2$ lässt die Spannung um ein Drittel einbrechen.

**Faustregel:** Der Querstrom $I_q$ durch den Teiler sollte mindestens **zehnmal so groß** sein wie der Laststrom. Dann beeinflusst die Last die Spannung nur um wenige Prozent — dafür fließt dauernd Strom durch den Teiler und erzeugt [Verlustwärme](wiki:Joulesche Wärme|Joule heating). Ein Spannungsteiler eignet sich deshalb für *Signale* und Referenzspannungen mit winzigem Laststrom (z. B. am Eingang eines [Mikrocontrollers](wiki:Mikrocontroller|Microcontroller)), aber nicht als Netzteil.[^kuphaldt-vol1-ch6]

Wer eine Spannung bei nennenswertem Strom braucht, nimmt einen [Spannungsregler](wiki:Spannungsregler|Voltage regulator) (kommt in Etappe 6) oder eine [Z-Diode](wiki:Z-Diode|Zener diode).`,
    },
    {
      id: 'entwurf', type: 'text', title: 'Einen Teiler entwerfen — mit E12',
      md: `
Gesucht: aus $12\\,\\mathrm{V}$ genau $5\\,\\mathrm{V}$. Wähle zuerst $R_2$ (hier $4{,}7\\,\\mathrm{k\\Omega}$) und stelle die Teilerformel nach $R_1$ um:

$$R_1 = R_2\\cdot\\left(\\frac{U}{U_2} - 1\\right) = 4{,}7\\,\\mathrm{k\\Omega}\\cdot\\left(\\frac{12}{5} - 1\\right) \\approx 6{,}58\\,\\mathrm{k\\Omega}$$

Diesen Wert gibt es nicht zu kaufen. Der nächste Wert der [E-Reihe](wiki:E-Reihe|E series of preferred numbers) E12 ist $6{,}8\\,\\mathrm{k\\Omega}$; damit stellt sich $U_2 = 12\\,\\mathrm{V}\\cdot 4{,}7/11{,}5 \\approx 4{,}90\\,\\mathrm{V}$ ein. Das liegt im Rahmen der [[widerstandstoleranz|Widerstandstoleranz]] von $5\\,\\%$; wer mehr Genauigkeit braucht, kombiniert zwei Widerstände oder nimmt E24/E96-Werte.

Ein **[Potentiometer](wiki:Potentiometer|Potentiometer)** ist ein Spannungsteiler mit verstellbarem Abgriff: Zwischen den beiden äußeren Anschlüssen liegt der Gesamtwiderstand, der Schleifer teilt ihn in $R_1$ und $R_2$. So funktioniert der [Lautstärkeregler](wiki:Lautstärkeregler) — und so wird auch die Verstärkung oder der Arbeitspunkt vieler Schaltungen eingestellt.`,
    },
    {
      id: 'strom', type: 'text', title: 'Stromteiler: dasselbe Prinzip, andersherum',
      md: `
In einer Parallelschaltung liegt an beiden Zweigen dieselbe Spannung, daher fließt durch den kleineren Widerstand der größere Strom: $I_1 R_1 = I_2 R_2$. Die Ströme verhalten sich **umgekehrt** wie die Widerstände:

$$\\frac{I_2}{I_1} = \\frac{R_1}{R_2} \\qquad\\text{bzw.}\\qquad I_1 = I\\cdot\\frac{R_2}{R_1 + R_2},\\quad I_2 = I\\cdot\\frac{R_1}{R_1 + R_2}$$

Achtung beim Merken: Beim Spannungsteiler steht im Zähler der Widerstand, *an dem die Spannung gesucht ist*. Beim [Stromteiler](wiki:Stromteiler|Current divider) steht im Zähler der *andere* Widerstand — am kleinen Widerstand fließt der größere Strom.

Beispiel: $I = 30\\,\\mathrm{mA}$ teilt sich auf $R_1 = 100\\,\\Omega$ und $R_2 = 200\\,\\Omega$. $I_1 = 30\\cdot 200/300 = 20\\,\\mathrm{mA}$, $I_2 = 10\\,\\mathrm{mA}$. Das ist zugleich das Prinzip des Messwiderstands ([[shunt|Shunt]]), mit dem man in der letzten Lektion dieser Etappe Messbereiche erweitert.[^wp-stromteiler]`,
    },
    {
      id: 'viz-divider', type: 'viz', viz: 'divider-lab', title: 'Teiler-Labor',
      task: 'Stelle aus $12\\,\\mathrm{V}$ eine Ausgangsspannung von **5,0 V** ein, **während eine Last von $10\\,\\mathrm{k\\Omega}$ angeschlossen ist** — und halte außerdem den **Querstrom mindestens zehnmal so groß wie den Laststrom**. Beobachte in der Kurve, wie die Spannung mit kleiner werdendem $R_L$ einbricht, und probiere das Potentiometer aus.',
    },
    {
      id: 'num-teiler', type: 'numeric', title: 'Unbelasteter Teiler',
      question: '$U = 12\\,\\mathrm{V}$, $R_1 = 10\\,\\mathrm{k\\Omega}$ (oben), $R_2 = 5\\,\\mathrm{k\\Omega}$ (unten). Wie groß ist $U_2$ ohne Last?',
      answer: 4, tolerance: 0.02, unit: 'V',
      explain: '$U_2 = 12\\,\\mathrm{V}\\cdot\\frac{5}{10+5} = 4{,}00\\,\\mathrm{V}$.',
    },
    {
      id: 'num-ed103', type: 'numeric', title: 'Teiler 9 V',
      question: 'Die Gesamtspannung an einem Spannungsteiler beträgt $9\\,\\mathrm{V}$, $R_1 = 10\\,\\mathrm{k\\Omega}$ und $R_2 = 20\\,\\mathrm{k\\Omega}$. Wie groß ist die Spannung über $R_2$?',
      answer: 6, tolerance: 0.05, unit: 'V',
      explain: '$U_2 = 9\\,\\mathrm{V}\\cdot\\frac{20}{30} = 6{,}0\\,\\mathrm{V}$ (Katalogfrage ED103).',
    },
    {
      id: 'num-belastet', type: 'numeric', title: 'Mit Last',
      question: '$U = 10\\,\\mathrm{V}$, $R_1 = R_2 = 10\\,\\mathrm{k\\Omega}$. Jetzt wird an $R_2$ eine Last $R_L = 10\\,\\mathrm{k\\Omega}$ parallel angeschlossen. Wie groß ist $U_2$?',
      answer: 3.33, tolerance: 0.03, unit: 'V',
      hint: 'Erst $R_2 \\parallel R_L$ bestimmen, dann ist es wieder ein einfacher Teiler.',
      explain: '$R_2\\parallel R_L = 5\\,\\mathrm{k\\Omega}$, also $U_2 = 10\\,\\mathrm{V}\\cdot\\frac{5}{10+5} \\approx 3{,}33\\,\\mathrm{V}$ statt $5\\,\\mathrm{V}$.',
    },
    {
      id: 'num-strom', type: 'numeric', title: 'Stromteiler',
      question: '$30\\,\\mathrm{mA}$ teilen sich auf $R_1 = 100\\,\\Omega$ und $R_2 = 200\\,\\Omega$ auf. Wie groß ist $I_1$ (der Strom im kleineren Widerstand)?',
      answer: 20, tolerance: 0.1, unit: 'mA',
      explain: '$I_1 = 30\\,\\mathrm{mA}\\cdot\\frac{R_2}{R_1+R_2} = 30\\cdot\\frac{200}{300} = 20\\,\\mathrm{mA}$; $I_2 = 10\\,\\mathrm{mA}$. Probe: $I_1 R_1 = 2\\,\\mathrm{V} = I_2 R_2$.',
    },
    {
      id: 'num-entwurf', type: 'numeric', title: 'Teiler entwerfen',
      question: 'Aus $12\\,\\mathrm{V}$ sollen $5\\,\\mathrm{V}$ entstehen, $R_2 = 4{,}7\\,\\mathrm{k\\Omega}$. Wie groß muss $R_1$ **exakt** sein?',
      answer: 6.58, tolerance: 0.05, unit: 'kΩ',
      hint: '$R_1 = R_2\\cdot(U/U_2 - 1)$.',
      explain: '$R_1 = 4{,}7\\,\\mathrm{k\\Omega}\\cdot(2{,}4 - 1) = 6{,}58\\,\\mathrm{k\\Omega}$. Mit dem E12-Wert $6{,}8\\,\\mathrm{k\\Omega}$ ergibt sich $U_2 \\approx 4{,}90\\,\\mathrm{V}$.',
    },
    {
      id: 'quiz-netzteil', type: 'quiz', title: 'Teiler als Netzteil?',
      question: 'Warum ist ein einfacher Widerstandsspannungsteiler als „Netzteil" für eine Last von $100\\,\\mathrm{mA}$ ungeeignet?',
      options: [
        { text: 'Die Ausgangsspannung bricht unter Last ein; um das zu verhindern, müsste ein hoher Querstrom fließen, der den Teiler heiß macht und Energie verschwendet.', correct: true, why: 'Der Querstrom müsste nach der Faustregel ≥ 10 × Laststrom sein, also ≥ 1 A — das ist Verlust ohne Nutzen.' },
        { text: 'Ein Teiler liefert immer zu viel Spannung.', correct: false, why: 'Ein Teiler liefert höchstens die Eingangsspannung und meist weniger; das Problem ist das Einbrechen unter Last.' },
        { text: 'Widerstände können keinen Gleichstrom führen.', correct: false, why: 'Widerstände führen Gleichstrom ohne Probleme; es geht um das Verhältnis von Last- und Querstrom.' },
        { text: 'Die Ausgangsspannung hängt nicht vom Verhältnis der Widerstände ab.', correct: false, why: 'Gerade das Verhältnis $R_2/(R_1+R_2)$ legt die unbelastete Spannung fest.' },
      ],
    },
    {
      id: 'quiz-strom', type: 'quiz', title: 'Wo fließt der größere Strom?',
      question: 'Zwei Widerstände $1\\,\\mathrm{k\\Omega}$ und $10\\,\\mathrm{k\\Omega}$ liegen parallel an einer Quelle. Durch welchen fließt der größere Strom?',
      options: [
        { text: 'Durch $1\\,\\mathrm{k\\Omega}$ — zehnmal so viel.', correct: true, why: 'Bei gleicher Spannung gilt $I = U/R$: kleinerer Widerstand, größerer Strom.' },
        { text: 'Durch $10\\,\\mathrm{k\\Omega}$ — der größere Widerstand zieht mehr.', correct: false, why: 'Ein größerer Widerstand lässt *weniger* Strom durch.' },
        { text: 'Durch beide gleich viel.', correct: false, why: 'Gleich wäre es nur bei gleichen Widerständen.' },
        { text: 'Durch keinen — die Spannung teilt sich auf.', correct: false, why: 'Die Spannung teilt sich bei *Reihenschaltung*; hier liegt an beiden die volle Spannung.' },
      ],
    },
    {
      id: 'recall-teiler', type: 'recall', title: 'Teiler mit eigenen Worten',
      prompt: 'Zeichne einen Spannungsteiler, schreibe $U_2/U = R_2/(R_1+R_2)$ auf und erkläre, was mit der Ausgangsspannung passiert, wenn $R_L \\to \\infty$ geht — und was, wenn $R_L$ klein wird.',
      answer: `Zwei Widerstände in Reihe an $U$; der Abgriff liegt zwischen ihnen, $U_2$ fällt am unteren $R_2$ ab. Für $R_L\\to\\infty$ (offener Ausgang, kein Laststrom) gilt die Formel exakt: unbelasteter Teiler. Wird $R_L$ klein, liegt er parallel zu $R_2$ und senkt dessen wirksamen Wert; $U_2$ sinkt, im Extremfall ($R_L \\to 0$, Kurzschluss) auf 0. Praxisregel: Querstrom $\\ge 10\\times$ Laststrom, dann bricht die Spannung nur wenig ein.`,
      hints: ['Mit welchem Widerstand liegt die Last parallel?', 'Wird die Parallelschaltung größer oder kleiner als $R_2$?'],
      cards: ['teilerformel', 'belasteter-teiler'],
    },
    {
      id: 'mission', type: 'callout', tone: 'mission', title: 'Prüfung und Funkpraxis',
      md: `
Der Katalog fragt Spannungsteiler direkt: ED103 (9 V an $10\\,\\mathrm{k\\Omega}$ und $20\\,\\mathrm{k\\Omega}$, gesucht ist die Spannung über $R_2$, Ergebnis $6{,}0\\,\\mathrm{V}$) und verwandte Aufgaben zu Vorwiderständen, z. B. EC515: eine LED mit $1{,}4\\,\\mathrm{V}$ und $20\\,\\mathrm{mA}$ an $5{,}0\\,\\mathrm{V}$ braucht $180\\,\\Omega$. Die Rechnung dort ist die [Maschenregel](wiki:Kirchhoffsche Regeln|Kirchhoff's circuit laws) plus Ohm: $U_R = 5{,}0 - 1{,}4 = 3{,}6\\,\\mathrm{V}$, $R = 3{,}6\\,\\mathrm{V}/20\\,\\mathrm{mA} = 180\\,\\Omega$.[^bnetza-pruefungsfragen-2024]

Funkpraxis: Die Teiler-Idee steckt in vielen Schaltungen — im Abschwächer (Dämpfungsglied) zwischen Sender und Messgerät, in der Spannungsmessung für die S-Meter-Anzeige und im Basisspannungsteiler jedes einfachen Transistorverstärkers.`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>Deutsch</th><th>English</th></tr>
<tr><td>Spannungsteiler</td><td>voltage divider</td></tr>
<tr><td>Stromteiler</td><td>current divider</td></tr>
<tr><td>belasteter / unbelasteter Teiler</td><td>loaded / unloaded divider</td></tr>
<tr><td>Querstrom</td><td>bleeder current, divider current</td></tr>
<tr><td>Abgriff</td><td>tap, wiper</td></tr>
<tr><td>Potentiometer, Poti</td><td>potentiometer, pot</td></tr>
<tr><td>Last, Lastwiderstand</td><td>load (resistance)</td></tr>
<tr><td>Vorwiderstand</td><td>series (dropping) resistor</td></tr></table>`,
    },
    {
      id: 'warning', type: 'callout', tone: 'warning', title: 'Typische Denkfehler',
      md: `
- **„Ein Spannungsteiler liefert immer die berechnete Spannung."** Nur unbelastet. Jede Last liegt parallel zu $R_2$ und drückt die Spannung nach unten.
- **Teiler- und Stromteilerformel verwechseln.** Spannungsteiler: der Widerstand, an dem die Spannung gesucht ist, steht im Zähler. Stromteiler: im Zähler steht der *andere* Widerstand.
- **Nur die absoluten Werte beachten.** Entscheidend ist das Verhältnis $R_2/(R_1+R_2)$ — aber die absoluten Werte bestimmen, wie stark die Last die Spannung stört.`,
    },
  ],
  cards: [
    { id: 'teilerformel', front: 'Spannungsteiler (unbelastet)', back: '$U_2 = U\\cdot\\frac{R_2}{R_1+R_2}$ — $U_2$ liegt über dem unteren Widerstand; die Spannung teilt sich im Verhältnis der Widerstände.' },
    { id: 'belasteter-teiler', front: 'Belasteter Spannungsteiler: was ändert sich?', back: 'Die Last liegt parallel zu $R_2$: $R_2\\parallel R_L$ ersetzt $R_2$ in der Formel. $U_2$ sinkt.' },
    { id: 'querstrom-regel', front: 'Faustregel für den Querstrom', back: '$I_q \\ge 10\\cdot I_L$ — dann beeinflusst die Last die Teilerspannung nur um wenige Prozent.' },
    { id: 'stromteiler', front: 'Stromteiler: Formel', back: '$I_2/I_1 = R_1/R_2$ — Ströme verhalten sich umgekehrt wie die Widerstände; $I_1 = I\\cdot\\frac{R_2}{R_1+R_2}$.' },
    { id: 'poti', front: 'Potentiometer: Anschlüsse und Funktion', back: 'Zwei Außenanschlüsse (Gesamtwiderstand), Schleifer als Abgriff. Es ist ein Spannungsteiler mit verstellbarem Verhältnis.' },
    { id: 'r1-berechnen', front: '$R_1$ eines Teilers für gewünschtes $U_2$', back: '$R_1 = R_2\\cdot\\left(\\frac{U}{U_2} - 1\\right)$; danach nächsten E12-Wert wählen und $U_2$ nachrechnen.' },
    { id: 'teiler-halb', front: 'Was liefert ein Teiler mit $R_1 = R_2$?', back: 'Die halbe Eingangsspannung (unbelastet).' },
    { id: 'teiler-nie-mehr', front: 'Kann ein Spannungsteiler die Spannung erhöhen?', back: 'Nein: $U_2 < U$ immer; er kann nur verkleinern.' },
    { id: 'teiler-kein-netzteil', front: 'Warum ist ein Widerstandsteiler kein Netzteil?', back: 'Unter Last bricht die Spannung ein; ein ausreichend hoher Querstrom würde Energie als Wärme verschwenden. Er taugt für Signale und Referenzen.' },
    { id: 'ed103', front: '$U = 9\\,\\mathrm{V}$, $R_1 = 10\\,\\mathrm{k\\Omega}$, $R_2 = 20\\,\\mathrm{k\\Omega}$ — $U_2$?', back: '$U_2 = 9\\cdot 20/30 = 6\\,\\mathrm{V}$.' },
  ],
};
