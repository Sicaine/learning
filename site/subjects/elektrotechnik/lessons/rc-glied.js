export default {
  id: 'rc-glied',
  title: 'Laden, Entladen, Zeitkonstante',
  summary: 'Ein Kondensator über einen Widerstand lädt sich nicht sofort, sondern nähert sich der Endspannung exponentiell. Die Zeitkonstante $\\tau = R\\cdot C$ sagt, wie schnell — und ist der Schlüssel zu Zeitgliedern, Filtern und Oszillatoren.',
  minutes: 30,
  goals: [
    'Die [[zeitkonstante|Zeitkonstante]] $\\tau = R\\cdot C$ berechnen und ihre Einheit begründen',
    'Den Verlauf $u_C(t) = U\\,(1 - e^{-t/\\tau})$ beim Laden und $u_C(t) = U\\,e^{-t/\\tau}$ beim Entladen lesen',
    'Die Werte 63 % nach $\\tau$ und rund 99 % nach $5\\tau$ anwenden und Zeiten wie $t = \\tau\\ln 10$ ausrechnen',
    'Erklären, warum der Ladestrom zu Beginn $U/R$ ist und danach abnimmt',
    'Typische Anwendungen eines [[ladevorgang|RC-Glieds]] nennen: Zeitglied, Entprellen, Glättung',
  ],
  needs: ['kondensator', 'reihen-und-parallelschaltung'],
  blocks: [
    {
      id: 'idee', type: 'text', title: 'Je voller, desto langsamer',
      md: `
Schaltest du einen leeren Kondensator über einen Widerstand an eine Spannungsquelle, passiert Folgendes:

1. Am Anfang ist der Kondensator leer, seine Spannung ist null. Die gesamte Quellenspannung $U$ liegt am Widerstand: Es fließt der größtmögliche Strom $I_0 = U/R$. Der leere Kondensator wirkt wie ein **Kurzschluss**.
2. Mit jeder aufgenommenen Ladung steigt die Spannung am Kondensator. Dadurch bleibt weniger Spannung am Widerstand ($U_R = U - u_C$), und der Strom wird kleiner.
3. Am Ende ist $u_C = U$, am Widerstand liegt nichts mehr, der Strom ist null. Der volle Kondensator wirkt wie eine **Unterbrechung**.

Das ist wie ein Becken, das sich über einen Schlauch füllt: Je höher der Wasserstand, desto kleiner der Höhenunterschied zum Wasserhahn und desto langsamer fließt es nach. Der Strom ist immer proportional zur *noch fehlenden* Spannung, $i = (U - u_C)/R$. Eine Größe, deren Änderungsgeschwindigkeit proportional zu dem ist, was ihr noch fehlt, nähert sich dem Endwert **exponentiell**.[^wp-rc-glied]`,
    },
    {
      id: 'formeln', type: 'text', title: 'Die Formeln und die Zeitkonstante',
      md: `
Die Mathematik dahinter ist die [Exponentialfunktion](wiki:Exponentialfunktion|Exponential function) mit der [Eulerschen Zahl](wiki:Eulersche Zahl|E (mathematical constant)) $e \\approx 2{,}718$. Beim **Laden** über $R$ aus der Spannung $U$ gilt

$$u_C(t) = U\\left(1 - e^{-t/\\tau}\\right) \\qquad i(t) = \\frac{U}{R}\\,e^{-t/\\tau}$$

und beim **Entladen** (Kondensator liegt mit $u_C = U$ über $R$ an Masse)

$$u_C(t) = U\\,e^{-t/\\tau}$$

Die Zeitkonstante legt fest, wie schnell das alles abläuft:

$$\\tau = R\\cdot C \\qquad\\text{(Einheit: }\\Omega\\cdot\\mathrm{F} = \\mathrm{s}\\text{)}$$

Beispiele: $10\\,\\mathrm{k\\Omega}\\cdot 100\\,\\mathrm{\\mu F} = 1\\,\\mathrm{s}$. $47\\,\\mathrm{k\\Omega}\\cdot 22\\,\\mathrm{\\mu F} \\approx 1{,}03\\,\\mathrm{s}$. Mehr Widerstand heißt weniger Ladestrom, mehr Kapazität heißt mehr Ladung nötig — beides macht langsamer. Verdoppelst du $R$ *und* $C$, wird $\\tau$ viermal so groß.

Die [Zeitkonstante](wiki:Zeitkonstante|Time constant) lohnt sich als Maßstab, weil das Verhältnis $t/\\tau$ alles bestimmt:

<table><tr><th>Zeit</th><th>1 τ</th><th>2 τ</th><th>3 τ</th><th>4 τ</th><th>5 τ</th></tr>
<tr><td>Laden: Spannung in % von U</td><td>63,2 %</td><td>86,5 %</td><td>95,0 %</td><td>98,2 %</td><td>99,3 %</td></tr>
<tr><td>Entladen: Spannung in % von U</td><td>36,8 %</td><td>13,5 %</td><td>5,0 %</td><td>1,8 %</td><td>0,7 %</td></tr></table>

Merkhilfe: **63 – 86 – 95 – 98 – 99 %**. Nach $\\tau$ ist der Kondensator also erst zu 63 % geladen (nicht voll!); „praktisch voll" ist er nach etwa $5\\tau$. Die Zeit bis zu einem bestimmten Anteil löst man mit dem [natürlichen Logarithmus](wiki:Natürlicher Logarithmus|Logarithm) auf: Entladung von $10\\,\\mathrm{V}$ auf $1\\,\\mathrm{V}$ dauert $t = \\tau\\cdot\\ln 10 \\approx 2{,}30\\,\\tau$.`,
    },
    {
      id: 'anwendung', type: 'text', title: 'Wozu ein RC-Glied gut ist',
      md: `
- **Zeitglied:** Die Spannung am Kondensator erreicht eine Schaltschwelle nach einer bekannten Zeit, etwa bei einer Treppenhausbeleuchtung oder im Timer-IC NE555 (kommt in Etappe 6).
- **[Entprellen](wiki:Entprellen|Switch#Contact bounce):** Ein mechanischer Taster „prellt" einige Millisekunden lang. Ein RC-Glied hinter dem Taster glättet die Zacken, bevor die Digitalschaltung sie als mehrere Tastendrücke zählt.
- **Glättung:** Der [Glättungskondensator](wiki:Glättungskondensator|Smoothing capacitor) im Netzteil lädt sich schnell auf und entlädt sich langsam über die Last — das Prinzip des Sägezahns der Restwelligkeit.
- **Filter:** Dasselbe Bauteilpaar lässt tiefe Frequenzen durch und hält hohe auf (ein [Tiefpass](wiki:Tiefpass|Low-pass filter)); die „Grenzfrequenz" ist durch $\\tau$ festgelegt, mehr dazu in Etappe 4.

Auch der Kondensator in einem [Blitzgerät](wiki:Elektronenblitzgerät|Flash (photography)) lädt sich über einen Widerstand langsam auf (das Piepen, bis „bereit" leuchtet) und entlädt sich in Sekundenbruchteilen durch die Blitzröhre. Das ist die extreme Version mit sehr unterschiedlichen $R$ für Laden und Entladen.`,
    },
    {
      id: 'viz-rc', type: 'viz', viz: 'rc-lab', title: 'RC-Labor',
      task: 'Drei Aufgaben nacheinander: **(1)** Stelle $R$ und $C$ so ein, dass $\\tau = 1\\,\\mathrm{s}$ (±5 %) ist. **(2)** Lass den Kondensator aus dem leeren Zustand vollständig laden (rund $5\\tau$ abwarten). **(3)** Lege den Schalter um und warte, bis er auf höchstens 1 % entladen ist. Lies außerdem ab, wie hoch die Spannung nach $2{,}3\\,\\tau$ ist.',
    },
    {
      id: 'num-tau', type: 'numeric', title: 'Zeitkonstante',
      question: 'Ein Kondensator mit $100\\,\\mathrm{\\mu F}$ wird über $10\\,\\mathrm{k\\Omega}$ geladen. Wie groß ist $\\tau$ (in s)?',
      answer: 1, tolerance: 0.01, unit: 's',
      explain: '$\\tau = R\\cdot C = 10^4\\,\\Omega\\cdot 10^{-4}\\,\\mathrm{F} = 1\\,\\mathrm{s}$.',
    },
    {
      id: 'num-tau2', type: 'numeric', title: 'Zeitkonstante, krumme Werte',
      question: '$R = 47\\,\\mathrm{k\\Omega}$ und $C = 22\\,\\mathrm{\\mu F}$: Wie groß ist $\\tau$ (in s)?',
      answer: 1.03, tolerance: 0.02, unit: 's',
      explain: '$\\tau = 47\\,000\\cdot 22\\cdot 10^{-6} = 1{,}034\\,\\mathrm{s}$.',
    },
    {
      id: 'num-63', type: 'numeric', title: 'Ladezustand nach 5 τ',
      question: 'Wie viel Prozent der Endspannung hat ein Kondensator nach $5\\tau$ erreicht?',
      answer: 99.3, tolerance: 0.1, unit: '%',
      hint: '$1 - e^{-5}$.',
      explain: '$1 - e^{-5} = 1 - 0{,}00674 = 0{,}9933 \\Rightarrow 99{,}3\\,\\%$. Nach einem $\\tau$ sind es $1 - e^{-1} = 63{,}2\\,\\%$.',
    },
    {
      id: 'num-entladen', type: 'numeric', title: 'Entladezeit',
      question: 'Ein Kondensator ($\\tau = 1\\,\\mathrm{s}$) ist auf $10\\,\\mathrm{V}$ geladen und entlädt sich. Nach welcher Zeit sind nur noch $1\\,\\mathrm{V}$ übrig (in s)?',
      answer: 2.30, tolerance: 0.03, unit: 's',
      hint: '$u = U e^{-t/\\tau}$, nach $t$ umstellen: $t = \\tau\\cdot\\ln(U/u)$.',
      explain: '$t = \\tau\\ln(10/1) = 1\\,\\mathrm{s}\\cdot 2{,}303 = 2{,}30\\,\\mathrm{s}$.',
    },
    {
      id: 'num-anfangsstrom', type: 'numeric', title: 'Anfangsstrom',
      question: 'Ein leerer Kondensator wird über $1\\,\\mathrm{k\\Omega}$ an $10\\,\\mathrm{V}$ geschaltet. Wie groß ist der Strom im Einschaltmoment (in mA)?',
      answer: 10, tolerance: 0.1, unit: 'mA',
      explain: 'Im ersten Moment ist $u_C = 0$, der leere Kondensator wirkt wie ein Kurzschluss: $I = U/R = 10\\,\\mathrm{V}/1\\,\\mathrm{k\\Omega} = 10\\,\\mathrm{mA}$.',
    },
    {
      id: 'quiz-tau-verdoppelt', type: 'quiz', title: 'R und C verdoppeln',
      question: 'Man verdoppelt sowohl $R$ als auch $C$ eines RC-Glieds. Um welchen Faktor ändert sich $\\tau$?',
      options: [
        { text: 'Um den Faktor 4.', correct: true, why: '$\\tau = R\\cdot C$: $2R\\cdot 2C = 4\\,RC$.' },
        { text: 'Um den Faktor 2.', correct: false, why: 'Das wäre der Fall, wenn nur eine der beiden Größen verdoppelt würde.' },
        { text: 'Gar nicht.', correct: false, why: 'Beide Größen gehen multiplikativ ein.' },
        { text: 'Um den Faktor $\\sqrt{2}$.', correct: false, why: 'Eine Wurzel kommt erst bei der Resonanzfrequenz des Schwingkreises vor.' },
      ],
    },
    {
      id: 'quiz-voll', type: 'quiz', title: 'Nach einem τ',
      question: 'Ein Kondensator wird über einen Widerstand geladen. Wie weit ist er nach genau einer Zeitkonstante $\\tau$ geladen?',
      options: [
        { text: 'Auf etwa 63 % der Endspannung.', correct: true, why: '$1 - e^{-1} \\approx 0{,}632$.' },
        { text: 'Er ist voll.', correct: false, why: 'Voll ist er theoretisch nie, praktisch (≈ 99 %) erst nach etwa $5\\tau$.' },
        { text: 'Auf 50 % — das ist die Halbwertszeit.', correct: false, why: '50 % erreicht er nach $0{,}69\\,\\tau$ (= $\\tau\\ln 2$).' },
        { text: 'Auf 37 % der Endspannung.', correct: false, why: '37 % ist der *Restanteil* beim Entladen nach $\\tau$ bzw. der noch fehlende Anteil beim Laden.' },
      ],
    },
    {
      id: 'order-laden', type: 'order', title: 'Ablauf beim Aufladen',
      prompt: 'Bringe die Ereignisse beim Aufladen eines leeren Kondensators über einen Widerstand in die richtige Reihenfolge.',
      items: [
        'Schalter schließt: Strom ist maximal ($U/R$), die Kondensatorspannung ist 0',
        'Die Kondensatorspannung steigt, der Spannungsabfall am Widerstand und damit der Strom sinken',
        'Nach etwa $\\tau$ sind 63 % der Endspannung erreicht',
        'Nach etwa $5\\tau$ ist der Strom praktisch null',
        'Der Kondensator ist „voll": $u_C = U$, er sperrt den Gleichstrom',
      ],
      explain: 'Der Strom ist immer proportional zu dem, was an der Kondensatorspannung noch fehlt — deshalb wird er mit steigender Spannung kleiner und die Kurve flacher.',
    },
    {
      id: 'recall-exponentiell', type: 'recall', title: 'Warum exponentiell?',
      prompt: 'Warum nähert sich die Kondensatorspannung beim Laden nur *exponentiell* (immer langsamer) der Endspannung, statt linear anzusteigen?',
      answer: `Der Ladestrom ist $i = (U - u_C)/R$: Er ist proportional zur Spannung, die dem Kondensator noch bis $U$ fehlt. Je höher $u_C$ schon ist, desto kleiner ist der Strom, desto langsamer steigt $u_C$ (denn $\\mathrm{d}u_C/\\mathrm{d}t = i/C$). Eine Größe, deren Änderungsrate proportional zum Rest bis zum Ziel ist, folgt der Exponentialfunktion $u_C = U(1 - e^{-t/\\tau})$. Linear (konstanter Strom) wäre es nur mit einer Stromquelle statt Widerstand.`,
      hints: ['Wovon hängt der Ladestrom in jedem Moment ab?', 'Wie hängen $\\mathrm{d}u_C/\\mathrm{d}t$ und $i$ zusammen?'],
      cards: ['rc-exponentiell', 'tau-formel'],
    },
    {
      id: 'mission', type: 'callout', tone: 'mission', title: 'Prüfung und Funkpraxis',
      md: `
Der Katalog zeigt den Verlauf grafisch: In **EC201** muss man aus vier Diagrammen jenes wählen, das die Spannung an einem entladenen Kondensator zeigt, der über einen Widerstand an eine Gleichspannungsquelle geschaltet wird — die steigende Exponentialkurve, die flacher wird. Auch in den Aufgaben zu Glättung, Tiefpass und Timer steckt $\\tau$.[^bnetza-pruefungsfragen-2024]

Praxis: Viele Sender und Transceiver nutzen RC-Glieder, um das Ein- und Ausschalten der Sendestufe zu verschleifen — sonst entstehen harte Tastklicks, die weit neben der eigenen Frequenz zu hören sind (in der Morsetelegrafie ein bekanntes Problem). Ein RC-Glied mit passendem $\\tau$ rundet die Flanken ab.`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>Deutsch</th><th>English</th></tr>
<tr><td>Zeitkonstante</td><td>time constant</td></tr>
<tr><td>Laden / Entladen</td><td>charging / discharging</td></tr>
<tr><td>Ladestrom</td><td>charging current</td></tr>
<tr><td>Endspannung</td><td>final (steady-state) voltage</td></tr>
<tr><td>RC-Glied</td><td>RC circuit (network)</td></tr>
<tr><td>Zeitglied</td><td>timing element, timer</td></tr>
<tr><td>Prellen / Entprellen</td><td>(contact) bounce / debouncing</td></tr>
<tr><td>Exponentialfunktion</td><td>exponential function</td></tr>
<tr><td>Einschaltmoment</td><td>switch-on instant</td></tr></table>`,
    },
    {
      id: 'warning', type: 'callout', tone: 'warning', title: 'Typische Denkfehler',
      md: `
- **„Nach $\\tau$ ist der Kondensator voll."** Nein: Nach $\\tau$ sind es erst 63 %; „praktisch voll" ist er nach etwa $5\\tau$ (99,3 %).
- **„Der Ladestrom ist konstant."** Er startet bei $U/R$ und fällt exponentiell auf null.
- **„Der leere Kondensator sperrt."** Im Einschaltmoment wirkt er wie ein *Kurzschluss*, erst der volle sperrt — wichtig für den Einschaltstrom von Netzteilen.
- **$\\tau$ in falschen Einheiten.** $R$ in $\\Omega$ und $C$ in F einsetzen; bei $\\mathrm{k\\Omega}\\cdot\\mathrm{\\mu F}$ kommen Millisekunden heraus ($1\\,\\mathrm{k\\Omega}\\cdot 1\\,\\mathrm{\\mu F} = 1\\,\\mathrm{ms}$).`,
    },
  ],
  cards: [
    { id: 'tau-formel', front: 'Zeitkonstante des RC-Glieds', back: '$\\tau = R\\cdot C$ (in s, wenn $R$ in $\\Omega$ und $C$ in F). Beispiel: $10\\,\\mathrm{k\\Omega}\\cdot 100\\,\\mathrm{\\mu F} = 1\\,\\mathrm{s}$.' },
    { id: 'laden-formel', front: 'Spannung beim Laden', back: '$u_C(t) = U\\,(1 - e^{-t/\\tau})$; Strom $i(t) = (U/R)\\,e^{-t/\\tau}$.' },
    { id: 'entladen-formel', front: 'Spannung beim Entladen', back: '$u_C(t) = U\\,e^{-t/\\tau}$ — nach $\\tau$ noch 37 %.' },
    { id: 'tau-63', front: '63-%-Regel', back: 'Nach einem $\\tau$ hat der Kondensator 63,2 % der Endspannung erreicht (beim Entladen: 36,8 % übrig).' },
    { id: 'tau-5', front: '5τ-Regel', back: 'Nach etwa $5\\tau$ ist der Kondensator praktisch voll bzw. leer (99,3 %). Merke 63–86–95–98–99 %.' },
    { id: 'anfangsstrom', front: 'Anfangsstrom beim Laden', back: '$I_0 = U/R$: Der leere Kondensator wirkt im Einschaltmoment wie ein Kurzschluss.' },
    { id: 'rc-exponentiell', front: 'Warum exponentiell?', back: 'Der Ladestrom ist proportional zur noch fehlenden Spannung ($i = (U - u_C)/R$), also wird die Änderung immer kleiner.' },
    { id: 'rc-anwendungen', front: 'Anwendungen von RC-Gliedern', back: 'Zeitglieder/Timer, Entprellen von Tastern, Glättung in Netzteilen, Tief- und Hochpass, Tastflankenformung.' },
    { id: 'tau-ms', front: '$1\\,\\mathrm{k\\Omega}\\cdot 1\\,\\mathrm{\\mu F}$ = ?', back: '$1\\,\\mathrm{ms}$ — bequeme Einheitenregel für $\\tau$.' },
    { id: 'entladezeit-ln', front: 'Zeit zum Entladen von $U_0$ auf $U_1$', back: '$t = \\tau\\cdot\\ln(U_0/U_1)$; von 10 V auf 1 V: $2{,}30\\,\\tau$.' },
  ],
};
