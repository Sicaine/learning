export default {
  id: 'strom-und-spannung',
  title: 'Ladung, Strom, Spannung und der Stromkreis',
  summary: 'Ladung als Menge, Strom als Fluss, Spannung als „Druck“ (Energie je Ladung): Aus einer Wasseranalogie wird ein sauberes Bild vom Stromkreis, von der technischen Stromrichtung und von Elektronen, die erstaunlich langsam wandern.',
  minutes: 30,
  goals: [
    '[[elektrischer-strom|Strom]] als Ladung pro Zeit berechnen ($I = Q/t$) und die Anzahl der [[elektron|Elektronen]] dazu angeben',
    '[[elektrische-spannung|Spannung]] als Energie pro Ladung und als Potentialdifferenz zwischen **zwei** Punkten lesen',
    'Einen geschlossenen [[stromkreis|Stromkreis]] mit Quelle und Verbraucher skizzieren',
    'Die [[technische-stromrichtung|technische Stromrichtung]] von der Bewegung der Elektronen unterscheiden',
    'Erklären, warum die Lampe sofort leuchtet, obwohl die [[driftgeschwindigkeit|Driftgeschwindigkeit]] winzig ist',
  ],
  needs: ['einheiten-und-groessen'],
  blocks: [
    {
      id: 'wasser', type: 'text', title: 'Ein Wasserkreislauf als Vorbild',
      md: `
Elektrizität sieht man nicht – darum hilft ein Bild, das man sehen kann. Stell dir einen **geschlossenen Wasserkreislauf** vor: eine Pumpe drückt Wasser durch ein Rohr, das irgendwo eine Engstelle hat. Dieses Bild ist als [hydraulische Analogie](wiki:Elektro-Hydraulische Analogie|Hydraulic analogy) seit langem üblich, sie hat Grenzen, trägt aber erstaunlich weit:[^kuphaldt-dc-kap2]

<table>
<tr><th>Wasser</th><th>Elektrizität</th></tr>
<tr><td>Wassermenge (Liter)</td><td>[[elektrische-ladung|Ladung]] $Q$ (Coulomb)</td></tr>
<tr><td>Durchfluss (Liter pro Sekunde)</td><td>[[elektrischer-strom|Strom]] $I$ (Ampere)</td></tr>
<tr><td>Druck der Pumpe</td><td>[[elektrische-spannung|Spannung]] $U$ (Volt)</td></tr>
<tr><td>Engstelle im Rohr</td><td>[[elektrischer-widerstand|Widerstand]] $R$ (Ohm)</td></tr>
<tr><td>Pumpe</td><td>[[spannungsquelle|Spannungsquelle]] (Batterie, Netzteil)</td></tr>
<tr><td>Rohr</td><td>Leitung</td></tr>
</table>

Drei Dinge siehst du sofort: Ohne **Druck** fließt nichts. Eine **engere Stelle** bremst den Durchfluss. Und das Wasser im Kreis wird nicht „verbraucht": Hinter der Engstelle fließt genau so viel pro Sekunde wie davor – nur die *Druckenergie* ist abgebaut.`,
    },
    {
      id: 'viz-water', type: 'viz', viz: 'water-analogy', title: 'Pumpe, Engstelle, Strom',
      params: { target: 0.06, tol: 0.03 },
      task: 'Stelle den Strom auf **60 mA** ein (±3 %). Finde danach eine **zweite**, deutlich andere Kombination aus Druck $U$ und Engstelle $R$, die denselben Strom ergibt. Tipp: Klicke auf einen Zahlenwert, um ihn einzutippen.',
    },
    {
      id: 'video', type: 'video', youtube: '9EOMauTO1Rw', label: 'Grundlagen Elektrotechnik', channel: 'Deutschland reparieren',
      why: 'Ein deutscher Überblick über Strom, Spannung und Widerstand — gut, um die Begriffe der Demo noch einmal aus anderer Sicht zu hören.',
    },
    {
      id: 'strom', type: 'text', title: 'Ladung und Strom',
      md: `
Elektrische Ladung kommt in kleinsten Portionen vor, der [[elementarladung|Elementarladung]] $e = 1{,}602\\cdot10^{-19}\\ \\mathrm{C}$ – das ist der Betrag der Ladung eines Elektrons (negativ) oder Protons (positiv). Die Einheit der Ladung ist das **[Coulomb](wiki:Coulomb|Coulomb)**: $1\\ \\mathrm{C} = 1\\ \\mathrm{A\\cdot s}$.

**Strom ist Ladung pro Zeit:**

$$I = \\frac{Q}{t} \\qquad\\Longleftrightarrow\\qquad Q = I \\cdot t$$

Ein Strom von 1 A bedeutet: In jeder Sekunde fließt 1 C durch den Leiterquerschnitt – das sind $1 / (1{,}602\\cdot10^{-19}) \\approx 6{,}24\\cdot10^{18}$ Elektronen *pro Sekunde*. Die Ladung hinter dem Strom ist riesig vielteilig, deshalb sieht der Strom wie ein glatter Fluss aus.`,
    },
    {
      id: 'calc-q', type: 'numeric', title: 'Ladung aus Strom und Zeit',
      question: 'Ein Strom von **2 A** fließt **30 s** lang. Welche Ladung wird transportiert?',
      answer: 60, tolerance: 0.1, unit: 'C',
      hint: '$Q = I \\cdot t$',
      explain: '$Q = 2\\ \\mathrm{A} \\cdot 30\\ \\mathrm{s} = 60\\ \\mathrm{C}$.',
    },
    {
      id: 'calc-electrons', type: 'numeric', title: 'Wie viele Elektronen?',
      question: 'Wie viele Elektronen tragen diese 60 C? Teile durch die Elementarladung $e = 1{,}602\\cdot10^{-19}$ C und gib die Zahl in Einheiten von $10^{20}$ an.',
      answer: 3.745, tolerance: 0.04, unit: '· 10²⁰',
      hint: '$N = Q/e = 60 / (1{,}602\\cdot10^{-19})$. Am Taschenrechner: `60 ÷ 1,602 EXP -19`.',
      explain: '$N = 60 / 1{,}602\\cdot10^{-19} \\approx 3{,}745\\cdot10^{20}$ Elektronen – eine riesige Zahl; deshalb wirkt der Strom wie ein glatter Fluss und nicht wie einzelne Teilchen.',
    },
    {
      id: 'calc-i', type: 'numeric', title: 'Strom aus Ladung und Zeit',
      question: 'Durch einen Draht fließen **0,5 C** in **2 s**. Wie groß ist die Stromstärke?',
      answer: 0.25, tolerance: 0.001, unit: 'A',
      explain: '$I = Q/t = 0{,}5\\ \\mathrm{C} / 2\\ \\mathrm{s} = 0{,}25\\ \\mathrm{A} = 250\\ \\mathrm{mA}$.',
    },
    {
      id: 'spannung', type: 'text', title: 'Spannung: Energie pro Ladung',
      md: `
Die Pumpe im Bild macht eine Ladungsportion energiereicher; der Verbraucher gibt die Energie wieder ab. **Spannung ist Energie pro Ladung:**

$$U = \\frac{W}{Q} \\qquad\\Longleftrightarrow\\qquad W = U \\cdot Q$$

Die Einheit [Volt](wiki:Volt|Volt) ist daher $1\\ \\mathrm{V} = 1\\ \\mathrm{J/C}$. Eine 12-V-Quelle gibt jedem Coulomb, das durch sie hindurchgeht, 12 Joule mit. Fließen 2 C, sind das 24 J.

Wichtig ist, dass eine Spannung **immer zwischen zwei Punkten** besteht – so wie ein Druckunterschied. Man misst sie „über" einem Bauteil. Den Bezugspunkt nennt man [[masse-bezugspotential|Masse]] oder Bezugspotential; das [[elektrisches-potential|Potential]] eines Punktes ist seine Spannung gegen diesen Bezugspunkt. Daraus folgt die Merkhilfe:

> **Strom fließt, Spannung liegt an.**`,
    },
    {
      id: 'calc-w', type: 'numeric', title: 'Energie aus Spannung und Ladung',
      question: 'Eine Quelle mit **12 V** lässt **2 C** hindurchfließen. Wie viel Energie gibt sie ab?',
      answer: 24, tolerance: 0.05, unit: 'J',
      hint: '$W = U \\cdot Q$',
      explain: '$W = 12\\ \\mathrm{V} \\cdot 2\\ \\mathrm{C} = 24\\ \\mathrm{J}$.',
    },
    {
      id: 'kreis', type: 'text', title: 'Der Stromkreis und die Stromrichtung',
      md: `
Ein dauerhafter Strom braucht einen **geschlossenen Kreis**: Quelle → Leitung → Verbraucher → Leitung → zurück zur Quelle. Ist er irgendwo unterbrochen (Schalter offen, Kabel durchtrennt), steht die Strömung überall still, auch wenn die Spannung weiterhin anliegt – wie bei einem Wasserhahn, der zu ist.

Als Leiter dienen vor allem Metalle wie [Kupfer](wiki:Kupfer|Copper), in denen viele Elektronen frei beweglich sind. Ein [elektrischer Leiter](wiki:Elektrischer Leiter) hat viele bewegliche Ladungsträger, ein [Nichtleiter](wiki:Nichtleiter|Insulator (electricity)) (Isolator, z. B. Porzellan oder Polyethylen) praktisch keine, und ein [Halbleiter](wiki:Halbleiter|Semiconductor) liegt dazwischen – seine Leitfähigkeit lässt sich gezielt steuern; dazu später mehr bei Dioden und Transistoren.

**Welche Richtung hat der Strom?** [Benjamin Franklin](wiki:Benjamin Franklin|Benjamin Franklin) legte fest, die Elektrizität fließe vom Plus- zum Minuspol – lange, bevor man wusste, dass in Metallen negative Elektronen wandern. Diese Festlegung ist die **[technische Stromrichtung](wiki:Technische Stromrichtung)**: außerhalb der Quelle von **Plus nach Minus**. Die Elektronen bewegen sich dabei in Wirklichkeit in die Gegenrichtung. Fürs Rechnen ist das egal; es muss nur einheitlich sein – und der Katalog erwartet die technische Richtung.`,
    },
    {
      id: 'quiz-richtung', type: 'quiz', title: 'Stromrichtung',
      question: 'Welche Aussage über die technische Stromrichtung ist richtig?',
      options: [
        { text: 'Außerhalb der Quelle fließt der Strom vom Pluspol zum Minuspol.', correct: true, why: 'So ist sie festgelegt – unabhängig von der tatsächlichen Bewegung der Ladungsträger.' },
        { text: 'Sie ist die Richtung, in der sich die Elektronen bewegen.', correct: false, why: 'Elektronen sind negativ und wandern vom Minus- zum Pluspol – also entgegen der technischen Stromrichtung.' },
        { text: 'Sie wurde physikalisch bewiesen und ist die einzig mögliche.', correct: false, why: 'Es ist eine Festlegung (Konvention); man hätte auch die Gegenrichtung wählen können.' },
        { text: 'Sie gilt nur bei Wechselstrom.', correct: false, why: 'Sie gilt für Gleichstrom; bei Wechselstrom wechselt der Strom ohnehin periodisch die Richtung.' },
      ],
    },
    {
      id: 'drift-intro', type: 'text', title: 'Wie schnell sind die Elektronen wirklich?',
      md: `
Man stellt sich leicht vor, Elektronen rasten durch den Draht. Rechnen wir nach. In Kupfer gibt es etwa $n = 8{,}5\\cdot10^{28}$ freie Elektronen pro Kubikmeter (ungefähr eins pro Atom). Fließt der Strom $I$ durch den Querschnitt $A$, dann bewegen sich diese Elektronen im Mittel mit der **Driftgeschwindigkeit**

$$v = \\frac{I}{n \\cdot e \\cdot A}$$

Das ist ein Mittelwert über eine wilde thermische Zickzackbewegung (die Elektronen schwirren mit hohem Tempo hin und her, ohne dass daraus ein Strom würde) – nur die kleine **gemeinsame Verschiebung** in eine Richtung ist der Strom.`,
    },
    {
      id: 'viz-drift', type: 'viz', viz: 'drift-wire', title: 'Elektronen im Draht',
      task: 'Schalte den Strom ein und beobachte die Lampe, dann finde eine Einstellung mit **v über 1 mm/s** und eine mit **v unter 0,01 mm/s**.',
    },
    {
      id: 'calc-drift', type: 'numeric', title: 'Driftgeschwindigkeit berechnen',
      question: 'Wie groß ist die Driftgeschwindigkeit bei **1 A** in einem Kupferdraht mit **1 mm²** Querschnitt ($n = 8{,}5\\cdot10^{28}\\ \\mathrm{m^{-3}}$)? Gib sie in **mm/s** an.',
      answer: 0.0734, tolerance: 0.002, unit: 'mm/s',
      hint: 'Rechne in Metern: $A = 1\\ \\mathrm{mm^2} = 10^{-6}\\ \\mathrm{m^2}$. Am Ende ×1000 für mm.',
      explain: '$v = \\dfrac{1}{8{,}5\\cdot10^{28}\\cdot1{,}602\\cdot10^{-19}\\cdot10^{-6}}\\ \\mathrm{m/s} \\approx 7{,}3\\cdot10^{-5}\\ \\mathrm{m/s} = 0{,}073\\ \\mathrm{mm/s}$ – ein Elektron braucht für einen Meter fast vier Stunden.',
    },
    {
      id: 'deep-poynting', type: 'callout', tone: 'deep', title: 'Wohin wandert die Energie eigentlich?',
      md: `
Die Elektronen sind langsam, die Energie kommt aber schnell an. Die Feldtheorie sagt: Die Energie wird im **elektromagnetischen Feld** rund um die Leitung transportiert; der [Poynting-Vektor](wiki:Poynting-Vektor|Poynting vector) beschreibt diesen Energiestrom. Das Feld breitet sich nahe der [Lichtgeschwindigkeit](wiki:Lichtgeschwindigkeit|Speed of light) $c \\approx 3\\cdot10^{8}$ m/s aus – in einer Leitung etwas langsamer. Beim Einschalten bekommen darum *alle* Elektronen im Draht praktisch gleichzeitig einen Schubs. Eine ausführliche (und in Fachkreisen vielfach diskutierte) Darstellung findest du im englischen Video *„The Biggest Misconception About Electricity"* von Veritasium; für den Alltagsgebrauch genügt unser Bild: **Signal schnell, Elektronen langsam.**`,
    },
    {
      id: 'match-formel', type: 'match', title: 'Größe, Zeichen, Einheit',
      prompt: 'Ordne jeder Größe das passende Formelzeichen mit Einheit zu.',
      pairs: [['Ladung', 'Q, in C'], ['Stromstärke', 'I, in A'], ['Spannung', 'U, in V'], ['Zeit', 't, in s']],
    },
    {
      id: 'mission', type: 'callout', tone: 'mission', title: 'Prüfung & Funkpraxis',
      md: `
Schon in der Einsteigerprüfung kommen Schaltzeichen und Stromkreise vor: Welche Einheit hat Strom, Spannung, Leistung (NA201–NA204)? Wie lauten die Anschlüsse des Batterie-Symbols (NB203)? Kann in einer Schaltung aus zwei gleichen Spannungsquellen Strom fließen – nein, wenn kein geschlossener Kreis vorhanden ist (NB207)? Und welches Bild zeigt die technische Stromrichtung korrekt (NB702)? Dazu gehört auch: Welches Metall leitet am besten, welche Stoffe sind Nichtleiter (NB101–NB104)?[^bnetza-pruefungsfragen-2024]

Praktisch: Das Funkgerät im Auto zieht beim Senden vielleicht 8 A aus dem 12-V-Bordnetz. Die dicke Zuleitung wird nicht wegen der Spannung so stark gewählt, sondern wegen des **Stroms** – die Elektronen müssen durch den Querschnitt.`,
    },
    {
      id: 'warning', type: 'callout', tone: 'warning', title: 'Typische Fehlvorstellungen',
      md: `
- **„Strom wird im Verbraucher verbraucht."** Falsch: Der Strom ist hinter dem Verbraucher genauso groß wie davor. Verbraucht wird *Energie* (Leistung).
- **„Spannung fließt durch den Draht."** Falsch: Spannung liegt *zwischen* zwei Punkten an, Strom fließt *durch* den Leiter.
- **„Elektronen sausen fast mit Lichtgeschwindigkeit."** Falsch: Nur das Signal (das Feld) ist schnell, die Elektronen driften mit Bruchteilen eines Millimeters pro Sekunde.
- **„Die technische Stromrichtung ist die Richtung der Elektronen."** Falsch: Sie ist die konventionelle Richtung von Plus nach Minus, den Elektronen entgegen.`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>Deutsch</th><th>English</th></tr>
<tr><td>Ladung</td><td>charge</td></tr>
<tr><td>Strom (Stromstärke)</td><td>current</td></tr>
<tr><td>Spannung</td><td>voltage</td></tr>
<tr><td>Stromkreis</td><td>circuit</td></tr>
<tr><td>technische Stromrichtung</td><td>conventional current direction</td></tr>
<tr><td>Leiter / Isolator (Nichtleiter)</td><td>conductor / insulator</td></tr>
<tr><td>Masse (Bezugspotential)</td><td>ground (reference potential)</td></tr>
<tr><td>Driftgeschwindigkeit</td><td>drift velocity</td></tr>
<tr><td>Querschnitt</td><td>cross-section</td></tr></table>`,
    },
    {
      id: 'recall-lampe', type: 'recall', title: 'Erkläre es',
      prompt: 'Warum geht die Lampe **sofort** an, obwohl die Elektronen im Draht nur Millimeter pro Sekunde wandern?',
      answer: `Im Leiter sind überall frei bewegliche Elektronen vorhanden. Beim Einschalten breitet sich das elektrische Feld mit nahezu Lichtgeschwindigkeit durch den Draht aus; alle Elektronen setzen sich praktisch gleichzeitig in Bewegung – auch die direkt in der Lampe. Wie bei einem vollen Wasserrohr: Drückt man an einem Ende Wasser hinein, kommt es am anderen sofort heraus, obwohl jedes Wasserteilchen nur langsam wandert. Die Driftgeschwindigkeit $v = I/(n e A)$ ist klein, weil es so viele Ladungsträger gibt ($n \\approx 8{,}5\\cdot10^{28}\\ \\mathrm{m^{-3}}$).`,
      hints: ['Was breitet sich mit hoher Geschwindigkeit aus – das Feld oder die Elektronen?', 'Denke an ein volles Wasserrohr.'],
      cards: ['lampe-sofort'],
    },
  ],
  cards: [
    { id: 'q-it', front: 'Wie hängen Ladung, Strom und Zeit zusammen?', back: '$Q = I\\cdot t$ bzw. $I = Q/t$; $1\\ \\mathrm{C} = 1\\ \\mathrm{A\\cdot s}$.' },
    { id: 'ampere-def', front: 'Was bedeutet 1 Ampere in Coulomb pro Sekunde?', back: '1 A = 1 C/s: in jeder Sekunde fließt 1 C durch den Querschnitt (≈ $6{,}24\\cdot10^{18}$ Elektronen).' },
    { id: 'elementarladung', front: 'Wie groß ist die Elementarladung?', back: '$e = 1{,}602\\cdot10^{-19}\\ \\mathrm{C}$ – Betrag der Ladung eines Elektrons.' },
    { id: 'spannung-def', front: 'Spannung als Energie pro Ladung', back: '$U = W/Q$, also $1\\ \\mathrm{V} = 1\\ \\mathrm{J/C}$; $W = U\\cdot Q$.' },
    { id: 'strom-spannung-merk', front: 'Merkhilfe: Strom und Spannung', back: 'Strom *fließt* (durch das Bauteil), Spannung *liegt an* (zwischen zwei Punkten).' },
    { id: 'tech-richtung', front: 'Technische Stromrichtung', back: 'Außerhalb der Quelle von Plus nach Minus – entgegen der Elektronenbewegung. Eine Festlegung.' },
    { id: 'masse', front: 'Was ist Masse (Bezugspotential)?', back: 'Der gemeinsame Bezugspunkt, gegen den alle Potentiale (Spannungen) gemessen werden – nicht automatisch Erde.' },
    { id: 'kreis-geschlossen', front: 'Wann fließt in einem Stromkreis dauerhaft Strom?', back: 'Nur im geschlossenen Kreis (Quelle – Verbraucher – zurück). Offener Kreis: Spannung liegt an, aber kein Strom.' },
    { id: 'leiter-hl-iso', front: 'Leiter, Halbleiter, Isolator – je ein Beispiel', back: 'Leiter: Kupfer/Silber. Halbleiter: Silizium. Isolator: Porzellan, Polyethylen.' },
    { id: 'drift-formel', front: 'Driftgeschwindigkeit im Draht', back: '$v = I/(n\\,e\\,A)$; in Kupfer bei 1 A / 1 mm²: ≈ 0,07 mm/s.' },
    { id: 'lampe-sofort', front: 'Warum leuchtet die Lampe sofort, obwohl die Elektronen langsam sind?', back: 'Das Feld breitet sich fast mit Lichtgeschwindigkeit aus; alle Elektronen im Draht bewegen sich gleichzeitig los.' },
    { id: 'strom-verbraucht', front: 'Wird Strom im Verbraucher verbraucht?', back: 'Nein – Strom vor und nach dem Verbraucher ist gleich groß; verbraucht wird Energie (Leistung).' },
  ],
};
