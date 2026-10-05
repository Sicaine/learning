export default {
  id: 'spule-rl-glied',
  title: 'Induktivität, Energie, RL-Schaltvorgang',
  summary: 'Eine Spule speichert Energie im Magnetfeld und wehrt sich gegen jede Stromänderung. Daraus folgen der langsame Stromanstieg, die gefährliche Abschaltspitze — und warum fast jedes Relais eine Freilaufdiode trägt.',
  minutes: 35,
  goals: [
    'Die [[induktivitaet|Induktivität]] $L$ einer Spule aus Windungszahl, Geometrie und Kern bestimmen ($L = \\mu_0\\mu_r N^2 A/l$, $L = N^2 A_L$)',
    'Die Beziehungen $u = L\\cdot\\mathrm{d}i/\\mathrm{d}t$, $W = \\tfrac12 LI^2$ und $\\tau = L/R$ anwenden und den Stromverlauf beim Ein- und Ausschalten beschreiben',
    'Erklären, warum der Strom in der Spule nicht springen kann, und die Abschaltspitze mit [[freilaufdiode|Freilaufdiode]] oder RC-Glied entschärfen',
    'Induktivitäten in Reihe und parallel zusammenfassen',
  ],
  needs: ['induktion', 'rc-glied'],
  blocks: [
    {
      id: 'video-spule', type: 'video', youtube: '43Y7b0MuFlM', label: 'Aufladevorgang Spule Teil 1: Induktionsgesetz und Lenzsche Regel', channel: 'Elektrotechnik einfach erklärt', minutes: 8,
      why: 'Kurze Erklärung, warum der Strom in der Spule nach dem Einschalten langsam ansteigt (Selbstinduktion und Lenz) — passt direkt zum ersten Abschnitt.',
    },
    {
      id: 'idee', type: 'text', title: 'Die Spule will ihren Strom behalten',
      md: `
Aus der letzten Lektion wissen wir: Ändert sich der Fluss, entsteht eine Spannung, die der Änderung entgegenwirkt. Ein Strom $i$ in einer [Spule](wiki:Spule (Elektrotechnik)|Electromagnetic coil) erzeugt einen Fluss; ändert sich der Strom, ändert sich der Fluss durch die eigenen Windungen — es entsteht eine Spannung, die **jede Stromänderung bremst**. Diese Selbstinduktion beschreibt die [Induktivität](wiki:Induktivität|Inductance) $L$ (Einheit [Henry](wiki:Henry (Einheit)|Henry (unit)), H, benannt nach [Joseph Henry](wiki:Joseph Henry|Joseph Henry)):

$$u_L = L\\cdot\\frac{\\mathrm{d}i}{\\mathrm{d}t}$$

Das ist das Gegenstück zum Kondensator ($i = C\\,\\mathrm{d}u/\\mathrm{d}t$): Beim Kondensator kann sich die *Spannung* nicht sprunghaft ändern, bei der Spule der *Strom*. Ein Stromsprung würde eine unendlich große Spannung verlangen. Deshalb steigt der Strom nach dem Einschalten langsam an — und deshalb gibt es beim Abschalten Funken am Schalter.[^wp-induktivitaet]

Die Spule speichert Energie im Magnetfeld:

$$W_L = \\tfrac{1}{2}\\,L\\,I^2$$

Beispiel: $10\\,\\mathrm{mH}$ bei $2\\,\\mathrm{A}$ speichern $0{,}5\\cdot 0{,}01\\cdot 4 = 0{,}02\\,\\mathrm{J}$. Und wie groß ist die Spannung bei schneller Änderung? $L = 1\\,\\mathrm{mH}$ und $\\mathrm{d}i/\\mathrm{d}t = 1\\,\\mathrm{A/\\mu s}$ ergeben $u = 10^{-3}\\cdot 10^{6} = 1000\\,\\mathrm{V}$. Das ist der Grund für die Funken.`,
    },
    {
      id: 'groesse', type: 'text', title: 'Wovon die Induktivität abhängt',
      md: `
Für eine lange Zylinderspule der Länge $l$ mit Querschnitt $A$ und $N$ Windungen gilt

$$L = \\frac{\\mu_0\\,\\mu_r\\,N^2\\,A}{l}$$

Die Induktivität wächst mit dem **Quadrat der Windungszahl** (mehr Windungen erzeugen mehr Fluss *und* durchsetzen ihn mehrfach), mit der Fläche und mit der Kernpermeabilität $\\mu_r$ und sinkt mit der Länge. Beispiel: $N = 100$, $A = 1\\,\\mathrm{cm}^2$, $l = 5\\,\\mathrm{cm}$, Luft: $L = 4\\pi\\cdot 10^{-7}\\cdot 10^4\\cdot 10^{-4}/0{,}05 \\approx 25{,}1\\,\\mathrm{\\mu H}$.

Daraus folgen die Katalogregeln: **Windungszahl verdoppeln** (gleiche Länge) → **vierfache** Induktivität ($12\\,\\mathrm{\\mu H} \\to 48\\,\\mathrm{\\mu H}$, EC307). **Länge verdoppeln** (gleiche Windungszahl) → **halbe** Induktivität ($12\\,\\mathrm{\\mu H} \\to 6\\,\\mathrm{\\mu H}$, EC306), und deshalb vergrößert man $L$ durch **Zusammenschieben** der Spule in Längsrichtung (EC305). Selbst ein gerader Draht hat eine (kleine) Induktivität (EC304) — bei UKW und höheren Frequenzen wird das wichtig.

Bei Ringkernen gibt der Hersteller den **[[al-wert|$A_L$-Wert]]** an (Induktivität pro Windung²): $L = N^2\\cdot A_L$. Ein Kern mit $A_L = 250\\,\\mathrm{nH}$ und $N = 10$ Windungen hat $L = 100\\cdot 250\\,\\mathrm{nH} = 25\\,\\mathrm{\\mu H}$.

**Reihen- und Parallelschaltung** (ohne magnetische Kopplung zwischen den Spulen) verhalten sich wie bei Widerständen: $L_\\text{ges} = L_1 + L_2$ in Reihe und $1/L_\\text{ges} = 1/L_1 + 1/L_2$ parallel. $10\\,\\mathrm{\\mu H} + 22\\,\\mathrm{\\mu H} = 32\\,\\mathrm{\\mu H}$; $10\\,\\mathrm{\\mu H}\\parallel 10\\,\\mathrm{\\mu H} = 5\\,\\mathrm{\\mu H}$.`,
    },
    {
      id: 'rl', type: 'text', title: 'Der RL-Schaltvorgang',
      md: `
Schaltet man eine Spule über einen Widerstand $R$ an eine Gleichspannung $U$, steigt der Strom nicht sofort, sondern exponentiell an — wie die Kondensatorspannung beim RC-Glied, nur dass hier der *Strom* der stetige Verlauf ist:

$$i(t) = \\frac{U}{R}\\left(1 - e^{-t/\\tau}\\right) \\qquad u_L(t) = U\\,e^{-t/\\tau} \\qquad \\tau = \\frac{L}{R}$$

Im Einschaltmoment fließt kein Strom, die ganze Spannung liegt an der Spule ($u_L = U$): Die Spule wirkt wie eine **Unterbrechung**. Nach etwa $5\\tau$ ist der Strom bei $U/R$, die Spannung an der Spule ist null: Sie wirkt wie ein **Draht** (ihr Gleichstromwiderstand). Beispiel: $10\\,\\mathrm{mH}/100\\,\\Omega$ ergibt $\\tau = 0{,}1\\,\\mathrm{ms}$. Das ist genau das Spiegelbild zum Kondensator: Kondensator leer = Kurzschluss, Spule „leer" = offen.

Der Katalog stellt das als Diagramm (EC301: Spannung an der Spule nach Anlegen von Gleichspannung über einen Widerstand — fallende Exponentialkurve) und als Praxisbeispiel (EC302: zwei Lampen, die eine über einen Widerstand, die andere über eine Spule mit Eisenkern an Gleichspannung — **die Lampe an der Spule leuchtet später**, weil der Strom langsamer ansteigt).`,
    },
    {
      id: 'viz-rl', type: 'viz', viz: 'rc-lab', title: 'RL-Schaltvorgang',
      params: { mode: 'rl' },
      task: 'Stelle $R$ und $L$ so ein, dass $\\tau = 5\\,\\mathrm{ms}$ (±5 %) ist (z. B. $330\\,\\mathrm{mH}$ und $68\\,\\Omega$), lass den Strom aus dem Nullzustand auf den Endwert $U/R$ ansteigen (rund $5\\tau$ abwarten) und lege dann den Schalter auf Masse, bis der Strom auf höchstens 1 % abgeklungen ist. Beobachte dabei $u_L$: Beim Einschalten springt sie auf $U$, beim Ausschalten kehrt sie das Vorzeichen um.',
    },
    {
      id: 'abschalten', type: 'text', title: 'Abschalten: Funken und Freilaufdiode',
      md: `
Und beim **Ausschalten** (die [[abschaltspitze|Abschaltspitze]])? Der Schalter öffnet, der Strom müsste *sofort* null werden — doch die Spule verlangt stetigen Strom. Sie erzeugt deshalb eine Spannung, die so hoch wird, wie es nötig ist, um den Strom irgendwie weiterzutreiben: Die Spannung an der Schaltstrecke steigt, bis die Luft durchschlägt — es *funkt*, und die Energie $\\tfrac12 LI^2$ verbrennt im Lichtbogen. Dasselbe Prinzip erzeugt in der [Zündspule](wiki:Zündspule|Ignition coil) eines Verbrennungsmotors die Hochspannung für die [Zündkerze](wiki:Zündkerze|Spark plug).

Bei Relais, Motoren und Magnetventilen ist das unerwünscht: Die Spannungsspitze kann Schalttransistoren zerstören und strahlt Störungen ab ([EMV](wiki:Elektromagnetische Verträglichkeit|Electromagnetic compatibility)). Abhilfe:

- **[Freilaufdiode](wiki:Freilaufdiode|Flyback diode)** antiparallel zur Spule: Beim Abschalten schaltet sie den Strom durch die Spule *im Kreis* weiter (Spule → Diode → Spule) und lässt ihn mit $\\tau = L/R$ abklingen. Die Spannung bleibt bei etwa $0{,}7\\,\\mathrm{V}$ zusätzlich zur Versorgungsspannung.
- **RC-Glied** (Snubber) über dem Schalter oder der Spule: Der Strom lädt den Kondensator, die Spitze wird begrenzt.

Merke die Polung: Die Diode ist im Normalbetrieb **gesperrt** (in Sperrrichtung zur Betriebsspannung) und wird erst beim Abschalten leitend.[^wp-freilaufdiode]`,
    },
    {
      id: 'viz-flyback', type: 'viz', viz: 'flyback-lab', title: 'Abschaltspitze',
      task: 'Zwei Aufgaben: **(1)** Öffne den Schalter ohne Schutz und erzeuge den Funken (die Spannung steigt bis zur Durchschlagspannung der Schaltstrecke). **(2)** Schalte die **Freilaufdiode** oder das **RC-Glied** zu, sodass die Spitze unter 50 V bleibt (bei mindestens 100 mA Spulenstrom). Probiere auch kleine Induktivitäten: Wann bleibt die Spitze ohne Schutz unter dem Funkenwert?',
    },
    {
      id: 'num-tau', type: 'numeric', title: 'Zeitkonstante',
      question: 'Eine Spule mit $L = 10\\,\\mathrm{mH}$ und ein Widerstand von $100\\,\\Omega$ liegen in Reihe. Wie groß ist $\\tau = L/R$ (in ms)?',
      answer: 0.1, tolerance: 0.001, unit: 'ms',
      explain: '$\\tau = 0{,}01\\,\\mathrm{H}/100\\,\\Omega = 10^{-4}\\,\\mathrm{s} = 0{,}1\\,\\mathrm{ms}$.',
    },
    {
      id: 'num-energie', type: 'numeric', title: 'Gespeicherte Energie',
      question: 'Welche Energie ist in einer Spule mit $10\\,\\mathrm{mH}$ bei $2\\,\\mathrm{A}$ gespeichert (in J)?',
      answer: 0.02, tolerance: 0.0002, unit: 'J',
      explain: '$W = \\tfrac12 L I^2 = 0{,}5\\cdot 0{,}01\\,\\mathrm{H}\\cdot 4\\,\\mathrm{A^2} = 0{,}02\\,\\mathrm{J}$.',
    },
    {
      id: 'num-spannung', type: 'numeric', title: 'Induktionsspannung der Spule',
      question: 'Durch eine Spule von $1\\,\\mathrm{mH}$ ändert sich der Strom um $1\\,\\mathrm{A}$ in $1\\,\\mathrm{\\mu s}$. Welche Spannung entsteht?',
      answer: 1000, tolerance: 10, unit: 'V',
      explain: '$u = L\\,\\Delta i/\\Delta t = 10^{-3}\\,\\mathrm{H}\\cdot 10^{6}\\,\\mathrm{A/s} = 1000\\,\\mathrm{V}$ — deshalb ist Abschalten gefährlich.',
    },
    {
      id: 'num-reihe', type: 'numeric', title: 'Spulen in Reihe',
      question: 'Zwei Spulen ($10\\,\\mathrm{\\mu H}$ und $22\\,\\mathrm{\\mu H}$, nicht miteinander gekoppelt) liegen in Reihe. Wie groß ist die Gesamtinduktivität (in µH)?',
      answer: 32, tolerance: 0.2, unit: 'µH',
      explain: 'In Reihe addieren sich die Induktivitäten: $10 + 22 = 32\\,\\mathrm{\\mu H}$. Parallel ergäben $10\\,\\mathrm{\\mu H}\\parallel 10\\,\\mathrm{\\mu H}$ nur $5\\,\\mathrm{\\mu H}$.',
    },
    {
      id: 'num-zylinder', type: 'numeric', title: 'Lange Zylinderspule',
      question: 'Eine lange Luftspule hat $N = 100$ Windungen, $A = 1\\,\\mathrm{cm}^2$ und $l = 5\\,\\mathrm{cm}$. Wie groß ist die Induktivität (in µH)? ($\\mu_0 = 4\\pi\\cdot 10^{-7}\\,\\mathrm{Vs/(Am)}$)',
      answer: 25.1, tolerance: 0.3, unit: 'µH',
      explain: '$L = \\mu_0 N^2 A/l = 1{,}2566\\cdot10^{-6}\\cdot 10^4\\cdot 10^{-4}/0{,}05 = 25{,}1\\,\\mathrm{\\mu H}$. Ein Ringkern mit $A_L = 250\\,\\mathrm{nH}$ und $N=10$ hätte $L = N^2 A_L = 25\\,\\mathrm{\\mu H}$.',
    },
    {
      id: 'quiz-freilauf', type: 'quiz', title: 'Freilaufdiode am Relais',
      question: 'Wozu dient die Freilaufdiode parallel zur Relaisspule?',
      options: [
        { text: 'Sie übernimmt beim Abschalten den Spulenstrom und begrenzt so die Abschaltspannungsspitze.', correct: true, why: 'Sie schließt den Stromkreis der Spule beim Abschalten, sodass die Selbstinduktionsspannung nur die Diodenspannung beträgt.' },
        { text: 'Sie erhöht die Zugkraft des Relais.', correct: false, why: 'Die Zugkraft hängt von Strom und Windungszahl ab, nicht von der Diode.' },
        { text: 'Sie gleichrichtet die Netzspannung für das Relais.', correct: false, why: 'Das Relais wird mit Gleichspannung betrieben; die Diode liegt in Sperrrichtung parallel zur Spule.' },
        { text: 'Sie schützt die Schaltung vor Überspannung am Eingang.', correct: false, why: 'Sie wirkt gegen die Spannung, die die Spule selbst beim Abschalten erzeugt, nicht gegen Eingangsüberspannungen.' },
      ],
    },
    {
      id: 'quiz-lampe', type: 'quiz', title: 'Zwei Lampen',
      question: 'Zwei gleiche Lampen werden gleichzeitig an Gleichspannung geschaltet. Lampe 1 liegt in Reihe mit einem Widerstand, Lampe 2 in Reihe mit einer Spule mit vielen Windungen und Eisenkern. Welche Lampe leuchtet zuerst auf?',
      options: [
        { text: 'Lampe 1 (mit Widerstand).', correct: true, why: 'In der Spule steigt der Strom nur langsam an ($\\tau = L/R$ groß durch das Eisen); der Widerstand lässt den Strom sofort fließen (EC302).' },
        { text: 'Lampe 2 (mit Spule), weil Spulen Energie speichern.', correct: false, why: 'Gespeicherte Energie ist beim Einschalten noch null; die Selbstinduktion *bremst* den Stromanstieg.' },
        { text: 'Beide gleichzeitig.', correct: false, why: 'Die Zeitkonstanten unterscheiden sich stark.' },
        { text: 'Lampe 2 leuchtet kurz auf und geht wieder aus.', correct: false, why: 'Das wäre eine Wechselstrom-Erscheinung; bei Gleichstrom steigt der Strom in der Spule langsam auf seinen Endwert.' },
      ],
    },
    {
      id: 'match-dual', type: 'match', title: 'Kondensator und Spule im Vergleich',
      prompt: 'Ordne zu: Was bleibt stetig, wie verhält sich das Bauteil im ersten Moment?',
      pairs: [
        ['Kondensator', 'Die Spannung kann nicht springen'],
        ['Spule', 'Der Strom kann nicht springen'],
        ['Leerer Kondensator beim Einschalten', 'wirkt wie ein Kurzschluss'],
        ['Spule beim Einschalten (Strom 0)', 'wirkt wie eine Unterbrechung'],
      ],
    },
    {
      id: 'recall-sprung', type: 'recall', title: 'Warum kein Stromsprung?',
      prompt: 'Warum steigt der Strom in einer Spule nach dem Einschalten nicht sprunghaft an, und was passiert beim Ausschalten, wenn der Strom über einen Schalter fließt?',
      answer: `Die Spule erzeugt bei jeder Stromänderung die Selbstinduktionsspannung $u_L = L\\,\\mathrm{d}i/\\mathrm{d}t$, die der Änderung entgegenwirkt. Ein Sprung hieße $\\mathrm{d}i/\\mathrm{d}t\\to\\infty$, also unendliche Spannung — das gibt die Schaltung nicht her. Darum steigt der Strom mit $\\tau = L/R$ exponentiell an. Beim Ausschalten versucht die Spule, den Strom weiterzutreiben; weil die Schaltstrecke offen ist, steigt die Spannung an ihr so lange, bis die Luft durchschlägt (Funke) oder ein Bauteil leitet. Eine Freilaufdiode gibt dem Strom einen Weg und begrenzt die Spitze.`,
      hints: ['Welche Gleichung verbindet $u$ und $i$ bei der Spule?', 'Was passiert, wenn $\\mathrm{d}i/\\mathrm{d}t$ riesig wird?'],
      cards: ['spule-gleichung', 'freilaufdiode-karte'],
    },
    {
      id: 'mission', type: 'callout', tone: 'mission', title: 'Prüfung und Funkpraxis',
      md: `
Der Katalog geht im Abschnitt „Spule" gründlich auf diese Lektion ein: **EC301** (Spannungsverlauf an der Spule nach Anlegen von Gleichspannung über einen Widerstand), **EC302** (die zwei Lampen — die Lampe mit der Spule leuchtet später), **EC303** (X_L steigt mit der Frequenz, kommt in Etappe 4), **EC304** (auch ein gerader Leiter hat Induktivität), **EC305–EC307** (Induktivität einer Zylinderspule: Länge, Windungszahl) und in **EA102** die Einheit Henry.[^bnetza-pruefungsfragen-2024]

Praxis: Jedes **Relais** im Antennenumschalter, im Linearverstärker oder in der Sende-Empfangs-Umschaltung braucht eine Freilaufdiode (oder ein RC-Glied), sonst stört die Abschaltspitze benachbarte Schaltungen und das Funkgerät — in Form von Knacken und Rauschen. Dasselbe Prinzip steckt in jedem [Schaltnetzteil](wiki:Schaltnetzteil|Switched-mode power supply): Dort nutzt man die gespeicherte Energie der Spule *absichtlich* (Etappe 6).`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>Deutsch</th><th>English</th></tr>
<tr><td>Induktivität</td><td>inductance</td></tr>
<tr><td>Spule, Drossel</td><td>coil, inductor, choke</td></tr>
<tr><td>Selbstinduktion</td><td>self-induction</td></tr>
<tr><td>Freilaufdiode</td><td>flyback (freewheeling) diode</td></tr>
<tr><td>Abschaltspitze</td><td>switch-off voltage spike</td></tr>
<tr><td>Zeitkonstante</td><td>time constant</td></tr>
<tr><td>Windungszahl</td><td>number of turns</td></tr>
<tr><td>A<sub>L</sub>-Wert</td><td>inductance factor (A<sub>L</sub> value)</td></tr>
<tr><td>gespeicherte Energie</td><td>stored energy</td></tr></table>`,
    },
    {
      id: 'warning', type: 'callout', tone: 'warning', title: 'Typische Denkfehler',
      md: `
- **„Eine Spule erzeugt Spannung, wenn Gleichstrom fließt."** Nur bei *Stromänderung* ($u = L\\,\\mathrm{d}i/\\mathrm{d}t$); bei konstantem Strom ist $u_L = 0$ (nur der Wicklungswiderstand).
- **„Der Strom in der Spule kann sich sprunghaft ändern."** Nein — sonst wäre die Spannung unendlich. Deshalb Funken am Schalter.
- **Freilaufdiode falsch herum.** Sie liegt in Sperrrichtung zur Betriebsspannung; falsch herum ist sie ein Kurzschluss.
- **Induktivität linear in $N$ rechnen.** $L$ wächst mit $N^2$ (Verdopplung → Faktor 4).
- **Länge und Windungsdichte verwechseln.** Gleiche Windungszahl auf doppelter Länge halbiert $L$.`,
    },
  ],
  cards: [
    { id: 'spule-gleichung', front: 'Spulengleichung', back: '$u_L = L\\cdot\\mathrm{d}i/\\mathrm{d}t$ — der Strom kann sich nicht sprunghaft ändern.' },
    { id: 'l-energie', front: 'Energie in der Spule', back: '$W = \\tfrac12 L I^2$ (z. B. $10\\,\\mathrm{mH}$, $2\\,\\mathrm{A}$: $0{,}02\\,\\mathrm{J}$).' },
    { id: 'tau-rl', front: 'Zeitkonstante des RL-Glieds', back: '$\\tau = L/R$; $i(t) = (U/R)(1-e^{-t/\\tau})$; nach $5\\tau$ praktisch am Endwert.' },
    { id: 'l-einheiten', front: 'Einheiten der Induktivität', back: 'Henry (H): $1\\,\\mathrm{H} = 10^3\\,\\mathrm{mH} = 10^6\\,\\mathrm{\\mu H} = 10^9\\,\\mathrm{nH}$.' },
    { id: 'l-formel', front: 'Induktivität einer langen Zylinderspule', back: '$L = \\mu_0\\mu_r N^2 A/l$ — ∝ $N^2$, ∝ $A$, ∝ $1/l$.' },
    { id: 'al-wert', front: 'Induktivität eines Ringkerns', back: '$L = N^2\\cdot A_L$ ($A_L$ in nH pro Windung²).' },
    { id: 'l-reihe-parallel', front: 'Spulen in Reihe / parallel (ohne Kopplung)', back: 'Reihe: $L_\\text{ges} = L_1 + L_2$. Parallel: $1/L_\\text{ges} = 1/L_1 + 1/L_2$.' },
    { id: 'freilaufdiode-karte', front: 'Freilaufdiode', back: 'Antiparallel zur Spule (in Sperrrichtung zur Betriebsspannung); übernimmt beim Abschalten den Spulenstrom und begrenzt die Spannungsspitze.' },
    { id: 'l-dual', front: 'Kondensator vs. Spule: Was ist stetig?', back: 'Kondensator: die Spannung. Spule: der Strom.' },
    { id: 'l-windungen-ec307', front: 'Windungszahl verdoppeln, gleiche Länge', back: 'Induktivität ×4 ($12\\,\\mathrm{\\mu H}\\to48\\,\\mathrm{\\mu H}$, EC307); doppelte Länge bei gleichem $N$: halbe Induktivität (EC306).' },
  ],
};
