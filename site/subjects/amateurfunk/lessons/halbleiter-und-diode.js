export default {
  id: 'halbleiter-und-diode',
  title: 'Halbleiter, Schaltzeichen und Diode',
  summary: 'Wie Halbleiter und der pn-Übergang eine Diode ergeben, wann sie leitet, wie man LED-Vorwiderstände und Z-Dioden-Stabilisierungen berechnet und wie die Schaltzeichen von Diode, LED, Z-Diode, Kondensator, Spule und Transistor aussehen.',
  minutes: 25,
  goals: [
    'Erklären, warum ein [[halbleiter|Halbleiter]] nur unter bestimmten Bedingungen leitet, und die Diode als Einwegventil beschreiben',
    'Anode und Kathode im Schaltzeichen erkennen und entscheiden, ob eine Diode leitet (Schwellspannung Ge 0,2–0,4 V, Si 0,6–0,8 V)',
    'Dioden anhand ihrer Kennlinie unterscheiden: Schottky, Germanium, Silizium, LED',
    'Vorwiderstand einer LED und einer Z-Diode berechnen; Z-Diode = Spannungsstabilisierung',
  ],
  needs: ['elektrotechnik/halbleiter-pn', 'elektrotechnik/dioden', 'elektrotechnik/z-diode'],
  blocks: [
    {
      id: 'halbleiter', type: 'text', title: 'Halbleiter und der pn-Übergang',
      md: `
Materialien sind **Leiter**, **Isolatoren** oder **[Halbleiter](wiki:Halbleiter|Semiconductor)** — und Letztere leiten nur „unter bestimmten Umständen“. Die wichtigsten sind [Silizium](wiki:Silicium|Silicon) und [Germanium](wiki:Germanium|Germanium). Reines Silizium leitet kaum. Baut man gezielt Fremdatome ein (**[Dotierung](wiki:Dotierung|Doping (semiconductor))**), entstehen zwei Sorten:

- **n-leitend:** Elektronenüberschuss (negative Ladungsträger),
- **p-leitend:** Elektronenmangel (positive „Löcher“).

Legt man ein p- und ein n-Gebiet aneinander, entsteht am Übergang eine **Sperrschicht** ([pn-Übergang](wiki:Pn-Übergang|P–n junction)): Ladungsträger wandern über die Grenze, es bildet sich eine ladungsträgerarme Zone mit einer inneren Spannung. Dieser pn-Übergang ist eine **[Diode](wiki:Diode|Diode)**:[^darc-50ohm]

- **Durchlassrichtung:** Pluspol an der **p-Seite (Anode)**, Minuspol an der **n-Seite (Kathode)**. Ist die äußere Spannung größer als die **Schwellspannung**, bricht die Sperrschicht zusammen, und es fließt Strom.
- **Sperrrichtung:** umgekehrt gepolt. Die Sperrschicht wird breiter, und die Diode hat einen **hohen Widerstand** (kein Strom, EC501) — sie hat dann weder hohe Kapazität noch geringe Impedanz.

Eine Diode ist also ein **Einwegventil** für Strom. Typische Anwendung: **Gleichrichtung von Wechselspannung** (EC502), siehe [Gleichrichter](wiki:Gleichrichter|Rectifier) — als Widerstand, Verstärker oder Wechselstromspeicher taugt sie nicht.`,
    },
    {
      id: 'viz-pn', type: 'viz', viz: 'pn-junction', title: 'Der pn-Übergang',
      task: 'Erkunde Dotierung, Spannung und Temperatur und erreiche die drei Ziele der Demo (Sperrrichtung, Schwelle bei 1 mA, Temperatureinfluss).',
    },
    {
      id: 'symbol', type: 'text', title: 'Schaltzeichen: Anode, Kathode und Verwandte',
      md: `
Das Schaltzeichen der Diode ist ein **Dreieck mit Strich**. Das Dreieck zeigt in die **Durchlassrichtung** (die technische Stromrichtung von Plus nach Minus); der **Strich** ist die **Kathode**, die Dreiecksseite die **Anode**. Die Anschlüsse heißen also: Dreiecksbasis = **1 = Anode**, Strich = **2 = Kathode** (NC403). „Basis“ und „Emitter“ sind Transistor-Anschlüsse und gehören nicht zur Diode.

Die Varianten merkst du dir so:

| Bauteil | Schaltzeichen | Besonderheit |
|---|---|---|
| Diode | Dreieck + Strich | Gleichrichtung |
| [Leuchtdiode](wiki:Leuchtdiode|Light-emitting diode) (LED) | Diode + zwei **Pfeile weg von der Diode** | strahlt Licht aus (NC402) |
| [Z-Diode](wiki:Z-Diode|Zener diode) | Strich mit **abgewinkelten Enden** („Z“) | Betrieb in **Sperrrichtung** (EC517) |
| [Kapazitätsdiode](wiki:Kapazitätsdiode|Varicap) | Diode + Kondensatorplatte | Sperrschichtkapazität einstellbar |

Dazu sehen wir im Katalog weitere Schaltzeichen: Der **Kondensator** besteht aus zwei parallelen Strichen (NC201), die **Spule** aus Windungsbögen (NC301), der **Transistor** hat drei Anschlüsse mit einem Pfeil am Emitter (NC501), und die **Masse** ist ein senkrechter Strich mit einer waagerechten Linie (NB202).`,
    },
    {
      id: 'viz-symbole', type: 'viz', viz: 'schaltzeichen-trainer', title: 'Schaltzeichen-Trainer',
      params: { set: ['diode', 'led', 'zdiode', 'kapdiode', 'kondensator', 'spule', 'npn', 'masse', 'widerstand', 'batterie'], need: 8 },
      task: 'Erkenne **acht** Schaltzeichen in Folge richtig.',
    },
    {
      id: 'schwelle', type: 'text', title: 'Schwellspannung, Kennlinie und Arbeitspunkt',
      md: `
Die **[Kennlinie](wiki:Kennlinie)** zeigt den Strom $I_\\mathrm{F}$ über der Spannung $U_\\mathrm{F}$ in Durchlassrichtung. Unterhalb der **Schwellspannung** fließt praktisch nichts; dann steigt der Strom plötzlich sehr steil. Die Schwellspannung hängt vom Material ab:

| Diodenart | Schwellspannung | Kennlinie |
|---|---|---|
| **Schottkydiode** | sehr niedrig, ≈ 0,2 V, und sehr hohe Schaltfrequenz | steil, ganz links (Kurve 1) |
| **Germaniumdiode** | **0,2 bis 0,4 V** | beginnt früh, flacher (Kurve 2) |
| **Siliziumdiode** | **0,6 bis 0,8 V** | steil bei ≈ 0,6 V (Kurve 3) |
| **Leuchtdiode** | 1,5 V und mehr (je nach Farbe) | weit rechts (Kurve 4) |

So lassen sich die Kennlinienfragen EC505–EC508 beantworten: die Kurve **ganz links, sehr steil** = Schottky; die **zweite**, flacher beginnende = Germanium; die dritte bei **0,6 V** = Silizium; die ganz rechte = LED. Die Schottkydiode (EC504) hat also **niedrige Durchlassspannung und hohe Schaltfrequenz** — deshalb ist sie in HF-Gleichrichtern und Mischern beliebt.

**Arbeitspunkt:** Ob eine Diode leitet, entscheidet die Spannung zwischen Anode und Kathode: $U_\\mathrm{AK} = U_\\mathrm{A} - U_\\mathrm{K}$. Eine Siliziumdiode leitet, wenn $U_\\mathrm{AK} \\gtrsim 0{,}6\\ldots0{,}7\\,\\text{V}$. Beispiel EC513: Anode 5,7 V, Kathode 5,0 V → $U_\\mathrm{AK} = 0{,}7\\,\\text{V}$ → leitend. Die drei anderen Antworten haben Kathodenpotenzial **höher** oder nur 0,1 V Unterschied: Die Diode sperrt. Bei den Bildfragen EC509–EC512 prüfst du dasselbe: Pluspol zur Anode, Differenz größer als die Schwelle.`,
    },
    {
      id: 'warn-diode', type: 'callout', tone: 'warning', title: 'Was Anfänger vertauschen',
      md: `**(1)** Germanium hat die **niedrigere** Schwelle (0,2–0,4 V), Silizium die höhere (0,6–0,8 V) — die falschen Antworten drehen das um oder nennen 1,4–1,6 V. **(2)** Die Diode leitet nicht, wenn die Spannung „irgendwie“ anliegt, sondern nur wenn die **Anode positiver als die Kathode um mehr als die Schwelle** ist. **(3)** Die LED ist eine Diode: Falsch herum eingebaut leuchtet sie nicht (NB703, NC404: Stromkreis muss geschlossen und die Polung richtig sein).`,
    },
    {
      id: 'viz-iv', type: 'viz', viz: 'diode-iv-lab', title: 'Diodenkennlinie und Arbeitspunkt',
      params: { targetI: 0.01 },
      task: 'Wechsle zwischen Dioden und stelle über Quellenspannung und Vorwiderstand einen Strom von **10 mA** ein. Beobachte, wie der Arbeitspunkt (Schnitt von Kennlinie und Arbeitsgerade) wandert.',
    },
    {
      id: 'calc-schwelle', type: 'quiz', title: 'Leitet die Diode?',
      question: 'Eine Siliziumdiode liegt an Anode **3,2 V**, Kathode **2,6 V**. Was gilt?',
      options: [
        { text: 'Sie ist gerade leitend ($U_\\mathrm{AK} = 0{,}6$ V ≈ Schwelle).', correct: true, why: 'Eine Siliziumdiode beginnt bei etwa 0,6 V zu leiten; in der Prüfung gilt Differenz ≥ ca. 0,6–0,7 V als leitend.' },
        { text: 'Sie sperrt, weil die Anode negativer ist.', why: 'Die Anode ist hier um 0,6 V positiver als die Kathode.' },
        { text: 'Sie ist eindeutig gesperrt, weil 0,6 V zu wenig sind.', why: 'Für Silizium sind 0,6 V gerade die Schwelle.' },
        { text: 'Das hängt nur vom Strom ab, nicht von der Spannung.', why: 'Die Diode schaltet über die Spannung zwischen Anode und Kathode.' },
      ],
    },
    {
      id: 'led', type: 'text', title: 'LED mit Vorwiderstand',
      md: `
Eine LED verträgt nur einen bestimmten Strom (typisch 10–20 mA), und ihre Spannung bleibt in Durchlassrichtung fast konstant ($U_\\mathrm{F}$, etwa 1,4–2 V). Schließt man sie ohne Strombegrenzung an eine Quelle, steigt der Strom steil an und sie brennt durch. Darum gehört immer ein **Vorwiderstand** in Reihe — die Schaltung ist eine **Leuchtanzeige** (EC514).

Am Vorwiderstand fällt die Differenz zwischen Quellen- und LED-Spannung ab, und es fließt der LED-Strom:

$$R_\\mathrm{V} = \\frac{U_\\mathrm{Q} - U_\\mathrm{F}}{I_\\mathrm{F}} \\qquad P_\\mathrm{R} = (U_\\mathrm{Q}-U_\\mathrm{F})\\cdot I_\\mathrm{F}$$

**Beispiel EC515:** 5,0 V, $U_\\mathrm{F} = 1{,}4$ V, 20 mA → $R_\\mathrm{V} = 3{,}6\\,\\text{V}/0{,}02\\,\\text{A} = 180\\,\\Omega$. **Beispiel EC516:** 5,5 V, 1,75 V, 25 mA → $R_\\mathrm{V} = 150\\,\\Omega$ mit $P = 3{,}75\\,\\text{V}\\cdot0{,}025\\,\\text{A} = 0{,}094\\,\\text{W}$ → mindestens **0,1 W** (ein 0,06-W-Widerstand wäre überlastet; 70 Ω kommt heraus, wenn man die Betriebsspannung ohne $U_\\mathrm{F}$ rechnet).`,
    },
    {
      id: 'viz-led', type: 'viz', viz: 'led-driver-lab', title: 'LED-Vorwiderstand dimensionieren',
      task: 'Stelle für die LED einen **Vorwiderstand** ein, der Strom und Leistung in den Grenzen der Demo hält, und löse die Zusatzaufgabe mit mehreren LEDs in Reihe.',
    },
    {
      id: 'calc-led', type: 'numeric', title: 'Vorwiderstand einer LED',
      question: 'Eine rote LED ($U_\\mathrm{F} = 1{,}8\\,\\text{V}$) soll mit 15 mA an 12 V betrieben werden. Wie groß muss der Vorwiderstand sein?',
      answer: 680, tolerance: 5, unit: 'Ω',
      hint: '$R_\\mathrm{V} = (U_\\mathrm{Q}-U_\\mathrm{F})/I_\\mathrm{F}$, $I$ in A.',
      explain: '$R_\\mathrm{V} = (12-1{,}8)\\,\\text{V}/0{,}015\\,\\text{A} = 680\\,\\Omega$ (genau ein E12-Wert). Leistung: $10{,}2\\,\\text{V}\\cdot0{,}015\\,\\text{A} = 0{,}153\\,\\text{W}$ → 0,25-W-Typ.',
    },
    {
      id: 'zener', type: 'text', title: 'Z-Diode: Spannung stabilisieren',
      md: `
Die **Z-Diode** wird gezielt **in Sperrrichtung** betrieben: Erreicht die Sperrspannung die **Z-Spannung** $U_\\mathrm{Z}$, steigt der Sperrstrom steil an, die Spannung bleibt bei $U_\\mathrm{Z}$ praktisch konstant (EC518: **Spannungsstabilisierung**, nicht Strom-, Leistungs- oder „Zweiweg“-Stabilisierung). In der Schaltung liegt ein **Vorwiderstand** $R_\\mathrm{V}$ in Reihe, die Z-Diode **parallel** zur Last, und zwar so, dass ihre **Kathode zum Pluspol** zeigt (EC519, EC520).

Der Vorwiderstand muss den Z-Strom **und** den Laststrom liefern:

$$R_\\mathrm{V} = \\frac{U_\\mathrm{ein} - U_\\mathrm{Z}}{I_\\mathrm{Z} + I_\\mathrm{L}}$$

**Beispiele:** Unbelastet (EC521): 13,8 V → 5 V bei 30 mA: $R_\\mathrm{V} = (13{,}8-5)/0{,}03 = 293\\,\\Omega$. Belastet (EC522): 13,8 V, $U_\\mathrm{Z} = 4{,}7$ V, $I_\\mathrm{Z} = 25$ mA, $I_\\mathrm{L} = 20$ mA → $R_\\mathrm{V} = 9{,}1/0{,}045 = 202\\,\\Omega$. Typischer Fehler: den Laststrom vergessen (dann kommen 364 Ω heraus) oder durch die Z-Spannung statt durch die Spannungsdifferenz rechnen.`,
    },
    {
      id: 'viz-zener', type: 'viz', viz: 'zener-lab', title: 'Z-Dioden-Stabilisierung',
      task: 'Entwirf die Stabilisierung mit Vorwiderstand: Die Demo prüft deinen Entwurf an den Eckfällen (Eingangsspannung ± Toleranz, Last min/max).',
    },
    {
      id: 'calc-zener', type: 'numeric', title: 'Vorwiderstand der Z-Diode',
      question: 'Aus 13,8 V sollen mit einer 5,6-V-Z-Diode 5,6 V gewonnen werden. Der Z-Strom soll 10 mA betragen, der Laststrom 15 mA. Wie groß ist $R_\\mathrm{V}$?',
      answer: 328, tolerance: 3, unit: 'Ω',
      hint: '$R_\\mathrm{V} = (U_\\mathrm{ein}-U_\\mathrm{Z})/(I_\\mathrm{Z}+I_\\mathrm{L})$.',
      explain: '$R_\\mathrm{V} = (13{,}8-5{,}6)\\,\\text{V}/0{,}025\\,\\text{A} = 328\\,\\Omega$ (E12: 330 Ω).',
    },
    {
      id: 'match-dioden', type: 'match', title: 'Diode → Eigenschaft',
      prompt: 'Welche Diode passt zur Beschreibung?',
      pairs: [
        ['Sehr niedrige Durchlassspannung, sehr schnell', 'Schottkydiode'],
        ['Schwelle 0,6–0,8 V', 'Siliziumdiode'],
        ['Schwelle 0,2–0,4 V', 'Germaniumdiode'],
        ['Betrieb in Sperrrichtung zur Spannungsstabilisierung', 'Z-Diode'],
      ],
    },
    {
      id: 'order-schwelle', type: 'order', title: 'Schwellspannung sortieren',
      prompt: 'Sortiere die Dioden nach ihrer Durchlass-Schwellspannung, **niedrigste zuerst** (von links nach rechts in der Kennlinie).',
      items: ['Schottkydiode', 'Germaniumdiode', 'Siliziumdiode', 'Leuchtdiode'],
      explain: 'Schottky ≈ 0,2 V, Germanium 0,2–0,4 V, Silizium 0,6–0,8 V, LED ≥ 1,5 V.',
    },
    {
      id: 'video', type: 'video', youtube: 'M6c2mlsrIvo', label: 'Lektion 13 – Bauteile und Schaltkreise', channel: 'DL2YMR',
      why: 'Videolehrgang für Klasse N (DARC AJW): Überblick über die Bauteile und Schaltzeichen, die in dieser Lektion vorkommen.',
    },
    {
      id: 'mission-diode', type: 'callout', tone: 'mission', title: 'Funkpraxis: Dioden im Shack',
      md: `Die **Verpolschutzdiode** am Netzteil-Eingang deines Transceivers schützt vor falsch gepoltem Anschluss; die **Z-Diode** erzeugt auf einer Platine eine Referenzspannung; die **LED** zeigt „Sendebetrieb“ an; die **Schottkydiode** gleichrichtet im SWR-Meter und Mischer die schwachen HF-Signale, weil sie schon bei sehr kleiner Spannung leitet. Wenn du eine LED nachrüstest: Vorwiderstand ausrechnen — dann brennt nichts durch.`,
    },
    {
      id: 'recall-diode', type: 'recall', title: 'In eigenen Worten',
      prompt: 'Erkläre, wann eine Siliziumdiode leitet und wie du für eine LED an 12 V den Vorwiderstand findest. Wofür setzt man Z-Dioden ein und wie wird ihr Vorwiderstand berechnet?',
      answer: 'Eine Siliziumdiode leitet in Durchlassrichtung (Anode positiver als Kathode), wenn die Spannung die Schwelle von etwa 0,6–0,8 V überschreitet; in Sperrrichtung hat sie einen hohen Widerstand. Für eine LED: Vorwiderstand R = (U_Quelle − U_LED)/I_LED, z. B. (12 V − 1,8 V)/15 mA = 680 Ω. Z-Dioden betreibt man in Sperrrichtung zur Spannungsstabilisierung; der Vorwiderstand ist (U_ein − U_Z)/(I_Z + I_Last).',
      cards: ['dio-schwelle', 'dio-led'],
    },
  ],
  cards: [
    { id: 'dio-richtung', front: 'Diode: Durchlass- und Sperrrichtung?', back: 'Durchlass: Anode +, Kathode −, Spannung über der Schwelle. Sperrrichtung: hoher Widerstand.' },
    { id: 'dio-symbol', front: 'Diodensymbol: Anode und Kathode?', back: 'Dreieck (Basis) = **Anode** (1), **Strich** = **Kathode** (2). Dreieck zeigt in Durchlassrichtung.' },
    { id: 'dio-schwelle', front: 'Schwellspannung von Germanium- und Siliziumdioden?', back: 'Germanium **0,2–0,4 V**, Silizium **0,6–0,8 V**.' },
    { id: 'dio-schottky', front: 'Schottkydiode: Haupteigenschaften?', back: 'Sehr niedrige Durchlassspannung und sehr hohe Schaltfrequenz.' },
    { id: 'dio-kennlinien', front: 'Kennlinien von links nach rechts?', back: 'Schottky (steil, ≈ 0,2 V) – Germanium – Silizium (0,6 V) – Leuchtdiode (≥ 1,5 V).' },
    { id: 'dio-gleichrichter', front: 'Wofür dienen Dioden typischerweise?', back: 'Zur Gleichrichtung von Wechselspannung (nicht als Verstärker, Widerstand oder Speicher).' },
    { id: 'dio-leitet', front: 'Wann leitet eine Si-Diode?', back: 'Wenn $U_\\mathrm{A}-U_\\mathrm{K}\\gtrsim0{,}6\\ldots0{,}7$ V (z. B. A 5,7 V, K 5,0 V).' },
    { id: 'dio-led', front: 'LED-Vorwiderstand?', back: '$R_\\mathrm{V}=\\dfrac{U_\\mathrm{Q}-U_\\mathrm{F}}{I_\\mathrm{F}}$; (5 V−1,4 V)/20 mA = 180 Ω. Immer in Reihe!' },
    { id: 'dio-ledsym', front: 'LED-Schaltzeichen?', back: 'Diode mit zwei Pfeilen, die von der Diode **weg** zeigen (Licht strahlt aus).' },
    { id: 'dio-z', front: 'Z-Diode: Zweck und Betrieb?', back: 'Spannungsstabilisierung, in **Sperrrichtung** betrieben, parallel zur Last, Vorwiderstand in Reihe. Symbol: Strich mit „Z“-Haken.' },
    { id: 'dio-zr', front: 'Vorwiderstand der Z-Diode?', back: '$R_\\mathrm{V}=\\dfrac{U_\\mathrm{ein}-U_\\mathrm{Z}}{I_\\mathrm{Z}+I_\\mathrm{L}}$; unbelastet 13,8→5 V, 30 mA: 293 Ω.' },
    { id: 'dio-halbleiter', front: 'Typische Halbleitermaterialien? Dotierung?', back: 'Silizium, Germanium. Dotierung mit Fremdatomen macht sie n-leitend (Elektronenüberschuss) oder p-leitend (Löcher).' },
  ],
};
