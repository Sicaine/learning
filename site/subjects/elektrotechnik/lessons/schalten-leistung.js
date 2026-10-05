export default {
  id: 'schalten-leistung',
  title: 'Relais, Transistorschalter, Thyristor/Triac',
  summary: 'Wie kleine Steuersignale große Lasten schalten: Transistor und Relais mit Freilaufdiode, Optokoppler zur Trennung und der Triac-Dimmer mit Phasenanschnitt.',
  minutes: 30,
  needs: ['bipolartransistor', 'spule-rl-glied', 'mosfet'],
  goals: [
    'Einen [[transistorschalter|Transistor als Schalter]] mit Basisvorwiderstand und Übersteuerung dimensionieren',
    'Erklären, warum ein [[relais|Relais]] eine [[freilaufdiode|Freilaufdiode]] braucht',
    '[[optokoppler|Optokoppler]] und [[galvanische-trennung|galvanische Trennung]] einordnen',
    'Funktion von [[thyristor]] und [[triac]] sowie den [[phasenanschnitt|Phasenanschnitt]] erklären und Leistung/Effektivwert berechnen',
  ],
  blocks: [
    {
      id: 'schalter-idee', type: 'text', title: 'Klein schaltet groß',
      md: String.raw`
Ein Mikrocontroller-Pin liefert 20 mA bei 3,3 V — ein Relais, ein Motor oder eine Lampe brauchen mehr. Man schaltet die Last deshalb über ein Leistungsbauteil, das vom Steuersignal geöffnet oder geschlossen wird. Als Schalter arbeitet ein [Transistor](wiki:Transistor|Transistor) nur in **zwei Zuständen**: gesperrt (kein Strom) oder durchgesteuert/übersteuert („Sättigung"), wo am Schalter nur die kleine Restspannung $U_{CE,sat}$ von etwa 0,1–0,3 V abfällt. Dazwischen würde er heiß werden (Verlustleistung $= U_{CE}\cdot I_C$).

**Bipolartransistor als Schalter** ([[transistorschalter]]): Der Kollektorstrom ist $I_C = U_B/R_\text{Last}$. Damit er sicher sättigt, gibt man mehr Basisstrom, als nach $I_B = I_C/B$ nötig wäre — meist das **Zwei- bis Dreifache** (Übersteuerung). Der Basisvorwiderstand ergibt sich aus

$$R_B = \frac{U_\text{Steuer}-U_{BE}}{I_B}\qquad U_{BE}\approx 0{,}7\,\text{V}$$

**MOSFET als Schalter:** Ein [[mosfet|MOSFET]] ([MOSFET](wiki:Metall-Oxid-Halbleiter-Feldeffekttransistor|MOSFET)) wird *spannungsgesteuert* geschaltet; im Dauerbetrieb fließt kein Gate-Strom, und im eingeschalteten Zustand verhält er sich wie ein kleiner Widerstand $R_{DS(on)}$ (oft nur Milliohm). Deshalb sind MOSFETs die Schalter der Wahl für große Ströme und in Schaltreglern.`,
    },
    {
      id: 'relais', type: 'text', title: 'Das Relais und die Spannungsspitze',
      md: String.raw`
Ein **[[relais|Relais]]** ([Relais](wiki:Relais|Relay)) ist ein Schalter, den ein [Elektromagnet](wiki:Elektromagnet|Electromagnet) betätigt. Erfunden wurde das Prinzip im 19. Jahrhundert unter anderem von [Joseph Henry](wiki:Joseph Henry|Joseph Henry). Spulenkreis und Kontaktkreis sind elektrisch getrennt — ein großer Vorteil, denn ein 12-V-Steuersignal kann so Netzspannung oder eine Antenne umschalten ([[galvanische-trennung]]).

**Spulenstrom:** Ein 12-V-Relais mit $400\,\Omega$ Spulenwiderstand zieht $I = 12\,\text{V}/400\,\Omega = 30\,\text{mA}$. Das kann ein Kleinsignaltransistor mit etwa 100 mA Maximalstrom noch schalten.

**Das Problem beim Abschalten:** Die Spule speichert Energie $W=\tfrac12 LI^2$ im Magnetfeld ([[energie-spule]]). Sperrt der Transistor, will der Strom weiterfließen. Nach dem Induktionsgesetz entsteht eine Spannung

$$u_L = -L\,\frac{\mathrm{d}i}{\mathrm{d}t}$$

die bei sehr schnellem Abschalten ($\mathrm{d}t$ klein) riesig wird — **Hunderte Volt** — und den Transistor durchschlagen oder Funken an den Kontakten verursachen kann (siehe Demo).

**Die Lösung — die Freilaufdiode:** Man schaltet eine [[freilaufdiode|Diode]] (auch [Schutzdiode](wiki:Freilaufdiode|Flyback diode), *Freilaufdiode*) **antiparallel zur Spule**: Kathode zur positiven Betriebsspannung. Im Betrieb sperrt sie. Beim Abschalten kehrt sich die Spulenspannung um, die Diode leitet und der Spulenstrom klingt über Spule und Diode ab — die Spannungsspitze ist auf etwa $U_B + 0{,}7\,\text{V}$ begrenzt. Nachteil: Das Relais fällt etwas langsamer ab (Zeitkonstante $L/R$).`,
    },
    {
      id: 'calc-spule', type: 'numeric', title: 'Spulenstrom des Relais',
      question: 'Ein Relais ist für 12 V ausgelegt und hat einen Spulenwiderstand von $400\\,\\Omega$. Welchen Strom nimmt die Spule auf (in mA)?',
      answer: 30, tolerance: 0.5, unit: 'mA',
      hint: 'Ohmsches Gesetz: $I = U/R$.',
      explain: '$12\\,\\text{V}/400\\,\\Omega = 0{,}03\\,\\text{A} = 30\\,\\text{mA}$.',
    },
    {
      id: 'calc-basis', type: 'numeric', title: 'Basisstrom mit Übersteuerung',
      question: 'Der Transistor hat die Stromverstärkung $B = 100$ und schaltet die 30 mA des Relais. Wie groß muss der Basisstrom **mindestens** sein (in mA)? (Für sicheres Sättigen verdoppelt man ihn später — 0,6 mA.)',
      answer: 0.3, tolerance: 0.01, unit: 'mA',
      hint: '$I_B = I_C/B$.',
      explain: '$30\\,\\text{mA}/100 = 0{,}3\\,\\text{mA}$. Mit zweifacher Übersteuerung wählt man $I_B = 0{,}6\\,\\text{mA}$.',
    },
    {
      id: 'calc-rb', type: 'numeric', title: 'Basisvorwiderstand',
      question: 'Ein 5-V-Steuerausgang soll 0,6 mA Basisstrom liefern ($U_{BE}=0{,}7\\,\\text{V}$). Wie groß ist $R_B$ in kΩ?',
      answer: 7.17, tolerance: 0.1, unit: 'kΩ',
      hint: '$R_B = (U_\\text{Steuer} - U_{BE})/I_B$.',
      explain: '$(5-0{,}7)\\,\\text{V}/0{,}6\\,\\text{mA} = 7{,}2\\,\\text{k}\\Omega$ — aus der E12-Reihe nimmt man $6{,}8\\,\\text{k}\\Omega$ (etwas mehr Basisstrom, mehr Sicherheit).',
    },
    {
      id: 'ord-freilauf', type: 'order', title: 'Abschalten mit Freilaufdiode',
      prompt: 'Bringe den Vorgang beim Abschalten der Relaisspule in die richtige Reihenfolge.',
      items: [
        'Der Transistor sperrt, der Spulenstrom soll weiterfließen',
        'Die Spulenspannung polt sich um ($u_L=-L\\,\\mathrm{d}i/\\mathrm{d}t$)',
        'Die Freilaufdiode wird leitend',
        'Der Strom klingt über Spule und Diode ab',
        'Die Spannung am Transistor bleibt bei etwa $U_B+0{,}7\\,\\text{V}$',
      ],
      explain: 'Ohne Diode hätte der Strom keinen Weg und die Spannung stiege, bis irgendwo ein Durchschlag oder Funken entsteht.',
    },
    {
      id: 'opto', type: 'text', title: 'Optokoppler: Trennung durch Licht',
      md: String.raw`
Manchmal darf zwischen Steuerung und Last *keine* leitende Verbindung bestehen — etwa zwischen einem Mikrocontroller und der Netzspannung. Ein **[[optokoppler|Optokoppler]]** ([Optokoppler](wiki:Optokoppler|Opto-isolator)) enthält eine Leuchtdiode und einen lichtempfindlichen Transistor in einem Gehäuse. Das Signal läuft als Licht über eine isolierende Strecke — das ist **[[galvanische-trennung|galvanische Trennung]]** ([galvanische Trennung](wiki:Galvanische Trennung|Galvanic isolation)). Masse- und Netzseite bleiben getrennt; Störströme über die Masseleitung („Brummschleifen") und gefährliche Spannungen auf der Steuerseite werden vermieden. Auch Relais und Transformatoren trennen galvanisch, ein Optokoppler macht es aber verzugsarm und klein.`,
    },
    {
      id: 'thyristor', type: 'text', title: 'Thyristor und Triac: elektronische Schalter für Wechselstrom',
      md: String.raw`
Ein **[[thyristor|Thyristor]]** ([Thyristor](wiki:Thyristor|Thyristor)) sperrt in beide Richtungen, bis ein kurzer Stromimpuls am **Gate** ihn **zündet**. Dann leitet er in Durchlassrichtung — und bleibt leitend, **auch wenn der Zündstrom endet**, bis der Laststrom unter den *Haltestrom* sinkt. Bei Wechselspannung geschieht das im Nulldurchgang. Ein **[[triac|Triac]]** ([Triac](wiki:Triac|TRIAC)) besteht aus zwei antiparallelen Thyristoren und schaltet damit *beide* Halbwellen.

**Phasenanschnitt:** Zündet man den Triac in jeder Halbwelle erst nach dem **[[zuendwinkel|Zündwinkel]]** $\alpha$ (gerechnet ab dem Nulldurchgang), liegt nur der Rest der Halbwelle an der Last — man „schneidet die Phase an" ([[phasenanschnitt]], [Phasenanschnittsteuerung](wiki:Phasenanschnittsteuerung|Phase-fired controller)).[^wiki-phasenanschnittsteuerung] So funktioniert der klassische **[Dimmer](wiki:Dimmer|Dimmer)** für Glühlampen. Für eine ohmsche Last gilt:

$$\frac{P}{P_\text{max}} = \frac{U_\text{eff}^2}{U^2} = 1-\frac{\alpha}{\pi}+\frac{\sin 2\alpha}{2\pi}$$

Bei $\alpha = 0^\circ$ ist die volle Leistung da, bei $\alpha = 180^\circ$ gar keine. Genau bei $\alpha=90^\circ$ sind $P/P_\text{max} = 50\,\%$ und $U_\text{eff} = U/\sqrt2 = 162{,}6\,\text{V}$ (bei 230 V) — die *Spannung* ist dann *nicht* halbiert, sondern auf $70{,}7\,\%$ gesunken.

**Preis der Bequemlichkeit:** Beim Zünden springt die Spannung innerhalb von Mikrosekunden auf einen hohen Wert. Diese steilen Flanken enthalten viele [Oberschwingungen](wiki:Oberschwingung|Harmonic) und stören den Rundfunk- und Funkempfang ([[emv|EMV]], [Elektromagnetische Verträglichkeit](wiki:Elektromagnetische Verträglichkeit|Electromagnetic compatibility)); Entstörkondensatoren und Drosseln im Dimmer mindern das nur teilweise.`,
    },
    {
      id: 'viz-dimmer', type: 'viz', viz: 'dimmer-lab', title: 'Dimmer- und Relais-Labor',
      params: { U: 230, pTarget: 0.5, tol: 0.03, maxSpike: 15 },
      task: 'Zwei Ziele: (1) Im **Triac-Dimmer**-Reiter stelle den Zündwinkel auf **50 % Leistung** ein (± 3 %). Lies dabei $U_{eff}$ ab — wie viel Prozent der Netzspannung sind es? (2) Im **Relais-Treiber**-Reiter schalte die Freilaufdiode ein: Die Spannungsspitze am Transistor muss unter **15 V** bleiben. Vergleiche mit der Spitze ohne Diode.',
    },
    {
      id: 'calc-dimmer-p', type: 'numeric', title: 'Leistung bei α = 90°',
      question: 'Ein Triac-Dimmer zündet bei $\\alpha = 90^\\circ$ an einer ohmschen Last. Wie viel Prozent der maximalen Leistung liegen an der Last?',
      answer: 50, tolerance: 0.5, unit: '%',
      hint: '$P/P_{max} = 1 - \\alpha/\\pi + \\sin(2\\alpha)/(2\\pi)$ mit $\\alpha=\\pi/2$: $\\sin\\pi = 0$.',
      explain: '$1 - \\tfrac12 + 0 = 0{,}5$ — die halbe Leistung, weil jede Halbwelle zur Hälfte „abgeschnitten" ist.',
    },
    {
      id: 'calc-dimmer-u', type: 'numeric', title: 'Effektivwert bei α = 90°',
      question: 'Welche Effektivspannung (in V) liegt dann an der Last bei 230 V Netzspannung?',
      answer: 162.6, tolerance: 0.5, unit: 'V',
      hint: '$U_{eff} = U\\cdot\\sqrt{P/P_{max}}$.',
      explain: '$230\\,\\text{V}\\cdot\\sqrt{0{,}5} = 162{,}6\\,\\text{V}$.',
    },
    {
      id: 'calc-dimmer-60', type: 'numeric', title: 'Weniger Anschnitt',
      question: 'Wie viel Prozent der Maximalleistung ergeben sich bei $\\alpha = 60^\\circ$?',
      answer: 80.5, tolerance: 0.5, unit: '%',
      hint: '$\\alpha = \\pi/3$: $1 - \\tfrac13 + \\sin(120^\\circ)/(2\\pi) = 1 - 0{,}3333 + 0{,}1378$.',
      explain: '$0{,}8045 \\approx 80{,}5\\,\\%$ — schon 60° Anschnitt kosten nur 20 % der Leistung, weil die Spannung am Halbwellenanfang klein ist.',
    },
    {
      id: 'quiz-emv', type: 'quiz', title: 'Triac-Dimmer als Störer',
      question: 'Warum stört ein Triac-Dimmer den Funkempfang?',
      options: [
        { text: 'Die steilen Spannungs- und Stromflanken beim Zünden enthalten viele Oberschwingungen bis weit in den HF-Bereich.', correct: true, why: 'Je steiler die Flanke, desto breiter das Spektrum. Die Störungen koppeln über die Netzleitung ein.' },
        { text: 'Weil er die Netzfrequenz von 50 Hz verändert.', why: 'Die Frequenz bleibt bei 50 Hz; nur die Kurvenform ändert sich.' },
        { text: 'Weil er einen Oszillator mit Quarz enthält.', why: 'Ein klassischer Dimmer enthält keinen Oszillator; die Störung entsteht beim Schalten.' },
        { text: 'Weil die Glühlampe mehr Strom zieht als ohne Dimmer.', why: 'Mit Dimmer fließt im Gegenteil weniger Strom; das Problem ist das *Schalten*, nicht die Strommenge.' },
      ],
    },
    {
      id: 'quiz-freilauf', type: 'quiz', title: 'Freilaufdiode — wohin?',
      question: 'Wie wird die Freilaufdiode an einer Relaisspule richtig eingebaut?',
      options: [
        { text: 'Antiparallel zur Spule: Kathode an der positiven Betriebsspannung.', correct: true, why: 'Im Betrieb sperrt sie; beim Abschalten polt sich die Spulenspannung um und die Diode übernimmt den Strom.' },
        { text: 'In Reihe zur Spule in Durchlassrichtung.', why: 'Das würde nur Spannung kosten und den Strom beim Abschalten gar nicht umleiten.' },
        { text: 'Parallel zur Spule, aber mit Kathode zur Masse.', why: 'Dann leitet sie schon im Betrieb und schließt die Spule kurz.' },
        { text: 'Gar nicht — ein Relais ist ein mechanischer Schalter.', why: 'Der *Transistor* in der Ansteuerung muss geschützt werden: Die Spule ist eine Induktivität.' },
      ],
    },
    {
      id: 'match-schalter', type: 'match', title: 'Aufgaben der Bauteile',
      prompt: 'Ordne Bauteil und Hauptaufgabe zu.',
      pairs: [
        ['Freilaufdiode', 'Begrenzt die Abschaltspannung der Spule'],
        ['Optokoppler', 'Überträgt Signale galvanisch getrennt per Licht'],
        ['Triac', 'Schaltet beide Halbwellen einer Wechselspannung'],
        ['Basisvorwiderstand', 'Legt den Basisstrom fest'],
      ],
    },
    {
      id: 'mission-schalten', type: 'callout', tone: 'mission', title: 'Prüfung / Funkpraxis',
      md: String.raw`
**Prüfungsbezug:** Im Katalog für Klasse E steht dieses Thema nur indirekt (Spule/Induktionsspannung, Rechtecksignale und EMV). Für **Klasse A** fragt der Katalog ausdrücklich: *AC408* — Hauptfunktion des Optokopplers ist die galvanische Entkopplung zweier Stromkreise durch Licht; *AC524* — in welcher Schaltung ist die Freilaufdiode richtig eingesetzt.[^bnetza-pruefungsfragen-2024]

**Funkpraxis:** In Funkanlagen steckt die Schalttechnik überall: **Sende-/Empfangs-Umschaltung** mit Relais oder PIN-Dioden, Koaxialrelais am Antennenumschalter, ein Transistor, der das PTT-Relais zieht — immer mit Freilaufdiode! Umgekehrt ist der Triac-Dimmer im Wohnzimmer ein typischer **Störer** für den Kurzwellenempfang: Wenn bei eingeschaltetem Dimmer ein Rauschteppich im Kurzwellenband auftaucht, ist er meist die Ursache. Und *Sicherheit:* Bei Netzspannung gehören Dimmer und Triac-Schaltungen nicht in den Selbstbau ohne Erfahrung — die Kühlfahne eines Triacs liegt oft auf Netzpotential.`,
    },
    {
      id: 'warn-schalten', type: 'callout', tone: 'warning', title: 'Typische Fehlvorstellungen',
      md: String.raw`
- *„Ein Relais braucht keine Freilaufdiode."* — Doch: Beim Abschalten entstehen Spannungsspitzen von Hunderten Volt, die den Schalttransistor zerstören.
- *„Bei 90° Zündwinkel ist die Spannung halbiert."* — Die *Leistung* ist halbiert (50 %), die Effektivspannung beträgt 70,7 % (162,6 V).
- *„Der Triac löscht, sobald der Zündimpuls endet."* — Er bleibt leitend, bis der Strom unter den Haltestrom fällt (im Nulldurchgang) — deshalb zündet man in jeder Halbwelle neu.
- *„Ein bisschen Basisstrom reicht, der Transistor schaltet ja durch."* — Zu wenig Basisstrom lässt den Transistor im aktiven Bereich laufen: hohe Restspannung, hohe Verlustleistung, Hitze. Als Schalter soll er *übersteuert* werden.`,
    },
    {
      id: 'german-schalten', type: 'callout', tone: 'german', title: 'Deutsch ↔ English',
      md: `
<table>
<tr><th>Deutsch</th><th>English</th></tr>
<tr><td>Relais</td><td>relay</td></tr>
<tr><td>Freilaufdiode</td><td>flyback (freewheeling) diode</td></tr>
<tr><td>Optokoppler</td><td>optocoupler / opto-isolator</td></tr>
<tr><td>galvanische Trennung</td><td>galvanic isolation</td></tr>
<tr><td>Zündwinkel</td><td>firing angle</td></tr>
<tr><td>Phasenanschnitt</td><td>phase-angle control</td></tr>
<tr><td>Haltestrom</td><td>holding current</td></tr>
<tr><td>Übersteuerung (Sättigung)</td><td>saturation / overdrive</td></tr>
</table>`,
    },
    {
      id: 'recall-schalten', type: 'recall',
      prompt: 'Was verhindert die **Freilaufdiode** an einer Relaisspule, und warum entsteht die Spannungsspitze ohne sie?',
      answer: 'Die Spule speichert Energie ½·L·I² im Magnetfeld. Beim Abschalten will der Strom weiterfließen: Es entsteht die Induktionsspannung u = −L·di/dt, die bei kleinem dt sehr hoch wird (Hunderte Volt) und den Schalttransistor durchschlägt. Die antiparallel liegende Diode wird dabei leitend und lässt den Strom über Spule und Diode abklingen; die Spannung bleibt bei etwa U_B + 0,7 V.',
      hints: ['Wo steckt die Energie, wenn der Transistor sperrt?', 'In welche Richtung polt sich die Spulenspannung um?'],
      cards: ['freilauf', 'spulenstrom'],
    },
  ],
  cards: [
    { id: 'freilauf', front: 'Wozu dient die Freilaufdiode am Relais, wie wird sie geschaltet?', back: 'Begrenzt die Spannungsspitze beim Abschalten. Antiparallel zur Spule, Kathode an +$U_B$.' },
    { id: 'spulenstrom', front: 'Warum entsteht beim Abschalten einer Spule eine Spannungsspitze?', back: '$u_L = -L\\,\\mathrm{d}i/\\mathrm{d}t$: Der Strom will weiterfließen, $\\mathrm{d}t$ ist klein, $u_L$ riesig.' },
    { id: 'basisstrom', front: 'Basisstrom beim Transistorschalter?', back: '$I_B \\ge I_C/B$, mit 2–3-facher Übersteuerung zum sicheren Sättigen; $R_B = (U_\\text{St}-0{,}7\\,\\text{V})/I_B$.' },
    { id: 'mosfet-schalter', front: 'Vorteile des MOSFET als Schalter?', back: 'Spannungsgesteuert (kein Gate-Dauerstrom), kleiner $R_{DS(on)}$, gut für große Ströme.' },
    { id: 'thyristor-fkt', front: 'Wie arbeitet ein Thyristor?', back: 'Sperrt, bis ein Gate-Impuls zündet; bleibt leitend, bis der Strom unter den Haltestrom fällt.' },
    { id: 'triac-fkt', front: 'Was ist ein Triac?', back: 'Zwei antiparallele Thyristoren: schaltet beide Halbwellen der Wechselspannung.' },
    { id: 'phasenanschnitt-p', front: 'Leistung beim Phasenanschnitt (ohmsch)?', back: '$P/P_\\text{max} = 1-\\alpha/\\pi+\\sin 2\\alpha/(2\\pi)$; bei $\\alpha=90^\\circ$: 50 %, $U_\\text{eff}=U/\\sqrt2$.' },
    { id: 'dimmer-emv', front: 'Warum ist ein Triac-Dimmer ein EMV-Störer?', back: 'Steile Flanken beim Zünden → Oberschwingungen bis in den HF-Bereich.' },
    { id: 'opto-fkt', front: 'Hauptfunktion des Optokopplers?', back: 'Galvanische Entkopplung zweier Stromkreise durch Licht (LED + Fototransistor).' },
    { id: 'relais-vorteil', front: 'Vorteil des Relais?', back: 'Galvanische Trennung von Steuer- und Lastkreis; schaltet auch große Wechselspannungen.' },
  ],
};
