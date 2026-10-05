export default {
  id: 'dioden',
  title: 'Diode, LED, Schottky, Kapazitätsdiode',
  summary: 'Das Ventil der Elektronik: Kennlinie lesen, Arbeitspunkt mit der Arbeitsgeraden finden, LED-Vorwiderstand berechnen und die wichtigsten Diodenarten unterscheiden.',
  minutes: 30,
  needs: ['halbleiter-pn', 'spannungsteiler-stromteiler'],
  goals: [
    'Die [[kennlinie|Kennlinie]] einer Diode lesen: Schwelle, exponentieller Anstieg, Sperrstrom, Durchbruch',
    'Mit der **Arbeitsgeraden** den Arbeitspunkt (I_D, U_D) in einer Schaltung mit Vorwiderstand bestimmen',
    'Den Vorwiderstand einer [[leuchtdiode|LED]] berechnen, auf die [[normreihe-e12|E12-Reihe]] runden und die Verlustleistung prüfen',
    '[[schottky-diode|Schottky]]-, [[kapazitaetsdiode|Kapazitäts]]-, Foto-, Freilauf- und Detektordiode nach Eigenschaft und Einsatz zuordnen',
  ],
  blocks: [
    {
      id: 'intuition', type: 'text', title: 'Ein Ventil für Strom',
      md: String.raw`
Eine [Diode](wiki:Diode|Diode) lässt Strom in **einer** Richtung durch und sperrt in der anderen — wie ein Rückschlagventil in einer Wasserleitung. Sie besteht aus einem pn-Übergang (letzte Lektion): Der Pluspol kommt an die **Anode** (A, p-Gebiet), der Minuspol an die **Kathode** (K, n-Gebiet) — dann leitet sie. Das Schaltzeichen ist ein Pfeil gegen einen Strich: **der Pfeil zeigt in Durchlassrichtung** (technische Stromrichtung von Anode zu Kathode).

Aber anders als ein mechanisches Ventil öffnet die Diode nicht schlagartig. Ihre [[kennlinie|Kennlinie]] ist **exponentiell**: Unter etwa 0,5 V fließt praktisch nichts, bei 0,6–0,7 V (Silizium) steigt der Strom steil an; ein Zehntel Volt mehr kann den Strom schon verzehnfachen. Deshalb gilt eine Faustregel für den Durchlassbetrieb: **Die Spannung an der leitenden Diode bleibt fast konstant** ([[flussspannung|Flussspannung]] $U_F$), der Strom wird von außen bestimmt — durch einen Vorwiderstand.[^kuphaldt-semi-3]

Für typische Werte der Flussspannung (bei einigen mA): Germanium ≈ 0,3 V, **Silizium ≈ 0,6–0,7 V**, **Schottky ≈ 0,2–0,4 V**, LED je nach Farbe etwa 1,8 V (rot) bis 3,4 V (blau/weiß).[^wp-leuchtdiode]`,
    },
    {
      id: 'viz-diode', type: 'viz', viz: 'diode-iv-lab', title: 'Kennlinie und Arbeitsgerade',
      intro: String.raw`Wähle ein Bauteil (Si-Diode, Germanium, Schottky, LED rot/blau). Die Kennlinie zeigt den Strom $I_D$ über der Spannung $U_D$. Dazu kommt die **Arbeitsgerade** des Vorwiderstands: $U_q = U_D + I_D R_V$. Der **Schnittpunkt** von Kennlinie und Gerade ist der Arbeitspunkt der Schaltung. Ändere $U_q$, $R_V$ und die Temperatur und beobachte, wie der Arbeitspunkt wandert.`,
      params: { targetI: 10e-3, tol: 0.1, ymax: 0.03, type: 'si' },
      task: String.raw`Stelle bei der **Si-Diode** einen Strom von $10\,\text{mA}$ ein (±10 %) und dann bei der **LED** — jeweils durch Wahl von $U_q$ und $R_V$.`,
      caption: 'Beachte: Bei kleinerem R_V wird die Arbeitsgerade steiler — der Strom steigt stark, aber U_D nur wenig.',
    },
    {
      id: 'quiz-sperr', type: 'quiz', title: 'Diode in Sperrrichtung',
      question: 'Eine in **Sperrrichtung** betriebene Diode zeichnet sich insbesondere aus durch …',
      options: [
        { text: 'einen hohen Widerstand (nur ein winziger Sperrstrom fließt).', correct: true, why: 'Die Raumladungszone wird breiter; erst beim Überschreiten der Durchbruchspannung bricht die Sperrwirkung zusammen (Lawinen- oder Zener-Effekt).' },
        { text: 'einen niedrigen Widerstand wie ein Draht.', correct: false, why: 'Das gilt in Durchlassrichtung oberhalb der Schwelle.' },
        { text: 'eine konstante Spannung von 0,7 V.', correct: false, why: 'Die 0,7 V sind die Flussspannung in Durchlassrichtung.' },
        { text: 'eine negative Kapazität.', correct: false, why: 'Die Sperrschichtkapazität ist positiv; sie wird mit höherer Sperrspannung kleiner.' },
      ],
    },
    {
      id: 'led', type: 'text', title: 'Die LED und ihr Vorwiderstand',
      md: String.raw`
Eine [[leuchtdiode|Leuchtdiode]] ([Leuchtdiode](wiki:Leuchtdiode|Light-emitting diode)) ist eine Diode, die beim Rekombinieren der Ladungsträger Licht aussendet — Farbe und Flussspannung hängen vom Halbleitermaterial ab (die blaue LED brachte 2014 [Akasaki, Amano und Nakamura](wiki:Shuji Nakamura|Shuji Nakamura) den Physik-Nobelpreis). Wegen der exponentiellen Kennlinie darf eine LED **nie direkt an eine Spannungsquelle**: Ein kleines Plus an Spannung brächte einen riesigen Strom und das Ende der LED. Der Strom wird mit einem **Vorwiderstand** (siehe [Vorwiderstand](wiki:Vorwiderstand)) eingestellt. An ihm fällt der Rest der Quellspannung ab:

$$ R_V = \frac{U_q - U_F}{I_F} \qquad\qquad P_R = I_F^2\,R_V = (U_q-U_F)\,I_F $$

Der berechnete Wert wird auf die nächste [E12-Reihe](wiki:E-Reihe|E series of preferred numbers) gerundet (… 270, 330, 390, 470 …); danach rechnet man den tatsächlichen Strom nach. Typisch sind 5–20 mA (Standard-LED), die Helligkeit wächst fast linear mit dem Strom.

Beispiel: 5 V, LED 2 V, 10 mA: $R_V = 3\,\text{V}/10\,\text{mA} = 300\,\Omega$ → E12: **330 Ω** → $I = 3\,\text{V}/330\,\Omega = 9{,}1$ mA.`,
    },
    {
      id: 'calc-led-1', type: 'numeric', title: 'Vorwiderstand 5 V',
      question: String.raw`Eine LED ($U_F=2{,}0\,\text{V}$) soll mit $10\,\text{mA}$ an $5\,\text{V}$ betrieben werden. Wie groß ist der berechnete Vorwiderstand, in Ω?`,
      answer: 300, tolerance: 1, unit: 'Ω',
      explain: String.raw`$R_V=(5-2)\,\text{V}/10\,\text{mA}=300\,\Omega$. In der E12-Reihe nimmst du 330 Ω; dann fließen $3\,\text{V}/330\,\Omega=9{,}1$ mA.`,
    },
    {
      id: 'calc-led-2', type: 'numeric', title: 'Vorwiderstand 12 V — und die Leistung',
      question: String.raw`Eine weiße LED ($U_F=3{,}2\,\text{V}$) soll mit $20\,\text{mA}$ an $12\,\text{V}$ laufen. Wie groß ist die Verlustleistung $P_R$ im Vorwiderstand, wenn du den nächsten **E12-Wert** (470 Ω) nimmst, in W?`,
      answer: 0.165, tolerance: 0.004, unit: 'W',
      hint: String.raw`Berechne $R_V=(12-3{,}2)/0{,}02=440\,\Omega$ → 470 Ω. Dann $I=8{,}8\,\text{V}/470\,\Omega$ und $P=U_R\cdot I$.`,
      explain: String.raw`$I=8{,}8/470=18{,}7$ mA, $P_R=8{,}8\,\text{V}\cdot18{,}7\,\text{mA}=0{,}165$ W. Ein ¼-W-Widerstand (0,25 W) reicht also.`,
    },
    {
      id: 'calc-led-3', type: 'numeric', title: 'Drei LEDs in Reihe',
      question: String.raw`Drei LEDs mit je $U_F=2\,\text{V}$ liegen in Reihe an $12\,\text{V}$, Strom $15\,\text{mA}$. Wie groß ist der Vorwiderstand (berechnet), in Ω?`,
      answer: 400, tolerance: 1, unit: 'Ω',
      explain: String.raw`Die Flussspannungen addieren sich: $3\cdot2\,\text{V}=6\,\text{V}$. $R_V=(12-6)\,\text{V}/15\,\text{mA}=400\,\Omega$ → E12: 390 Ω → $I=6/390=15{,}4$ mA.`,
    },
    {
      id: 'calc-led-ec', type: 'numeric', title: 'Prüfungsrechnung',
      question: String.raw`Eine LED mit $U_F=1{,}4\,\text{V}$ und $I_F=20\,\text{mA}$ soll an $5{,}0\,\text{V}$ angeschlossen werden. Wie groß muss der Vorwiderstand sein, in Ω?`,
      answer: 180, tolerance: 1, unit: 'Ω',
      explain: String.raw`$R_V=(5{,}0-1{,}4)\,\text{V}/20\,\text{mA}=180\,\Omega$ (EC515).`,
    },
    {
      id: 'viz-led', type: 'viz', viz: 'led-driver-lab', title: 'LED-Treiber-Labor',
      intro: String.raw`Wähle Quellspannung $U_q$, LED-Farbe, Zahl der LEDs in Reihe und den Vorwiderstand (E12). Das Labor zeigt Strom, Verlustleistung im Widerstand und die Helligkeit — und warnt, wenn der Strom zu hoch ist oder die LED nicht leuchtet (Quelle zu klein).`,
      params: { iMin: 10e-3, iMax: 20e-3, pMax: 0.25, seriesN: 3, seriesU: 9, color: 'rot' },
      task: String.raw`Stelle einen LED-Strom von **10–20 mA** ein, ohne den Widerstand über **0,25 W** zu belasten. Wiederhole das mit **3 LEDs in Reihe an mindestens 9 V**.`,
    },
    {
      id: 'arten', type: 'text', title: 'Diodenarten im Überblick',
      md: String.raw`
- **Siliziumdiode** (z. B. 1N4148 Signaldiode, 1N400x Gleichrichter): Universaldiode, $U_F\approx0{,}7$ V; Standard für Gleichrichtung und Schutz.
- **[[schottky-diode|Schottky-Diode]]** ([Schottky-Diode](wiki:Schottky-Diode|Schottky diode)): Metall–Halbleiter-Übergang, niedrige $U_F$ (0,2–0,4 V), **sehr schnell** (kaum Speicherladung) — für HF, Detektoren und Schaltnetzteile; benannt nach [Walter Schottky](wiki:Walter Schottky|Walter H. Schottky). Nachteile: höherer Sperrstrom, niedrige Sperrspannung.
- **[[kapazitaetsdiode|Kapazitätsdiode]]** (Varicap, [Kapazitätsdiode](wiki:Kapazitätsdiode|Varicap)): in Sperrrichtung betrieben; mit steigender Sperrspannung wird die Raumladungszone **breiter**, der „Plattenabstand" größer, die Kapazität **kleiner**. Mit einer Gleichspannung wird so ein Schwingkreis abgestimmt (VFO, Radio-Abstimmung).
- **Fotodiode**: Licht erzeugt Ladungsträgerpaare im Sperrschichtbereich — in Sperrrichtung fließt ein lichtabhängiger Strom (Lichtsensor, Optokoppler).
- **Z-Diode**: wird in Sperrrichtung im Durchbruch betrieben (nächste Lektion).
- **Freilaufdiode**: parallel zu einer Relaisspule, **in Sperrrichtung** zur Betriebsspannung. Beim Abschalten will die Spule ([[selbstinduktion|Selbstinduktion]]) den Strom weitertreiben und induziert eine hohe Spannung mit umgekehrter Polung — die Diode übernimmt diesen Strom und schützt den Schalttransistor.
- **Detektordiode**: gleichrichtet das HF-Signal im AM-Empfänger (Demodulation) — Schottky- oder Germaniumdioden wegen der kleinen Schwelle.

Das Schaltzeichen aller Dioden ist das Dreieck mit Querstrich; Zusatzsymbole (Pfeile nach außen: LED, nach innen: Fotodiode; Z-förmig geknickter Strich: Z-Diode) zeigen die Art.`,
    },
    {
      id: 'match-arten', type: 'match', title: 'Diodenart und Eigenschaft',
      prompt: 'Ordne zu:',
      pairs: [
        ['Siliziumdiode', 'universell, $U_F\\approx0{,}7$ V'],
        ['Schottky-Diode', 'niedrige $U_F$, sehr schnell'],
        ['Leuchtdiode', 'sendet Licht aus, Vorwiderstand nötig'],
        ['Kapazitätsdiode', 'Kapazität hängt von der Sperrspannung ab'],
        ['Fotodiode', 'Licht erzeugt Sperrstrom'],
      ],
    },
    {
      id: 'quiz-led-ohne-r', type: 'quiz', title: 'LED ohne Vorwiderstand?',
      question: 'Warum darf eine LED nie ohne Vorwiderstand (oder Stromquelle) an eine Spannungsquelle angeschlossen werden?',
      options: [
        { text: 'Wegen der exponentiellen Kennlinie steigt der Strom schon bei kleinen Spannungsüberschreitungen enorm an — nichts begrenzt ihn.', correct: true, why: 'Die LED ist kein Widerstand: $U_D$ ist praktisch konstant, der Strom folgt $e^{U/U_T}$.' },
        { text: 'Weil die LED sonst nur halb so hell leuchtet.', correct: false, why: 'Sie würde heller leuchten — kurz, bevor sie durchbrennt.' },
        { text: 'Weil LEDs Wechselspannung brauchen.', correct: false, why: 'LEDs sind Dioden und leiten nur in einer Richtung.' },
        { text: 'Weil der Vorwiderstand Licht erzeugt.', correct: false, why: 'Er wandelt nur Energie in Wärme um.' },
      ],
    },
    {
      id: 'warning-diode', type: 'callout', tone: 'warning', title: 'Vorsicht: Diode ≠ Schalter bei 0 V',
      md: String.raw`
Eine Diode leitet **nicht** ab 0 V. Silizium braucht erst etwa 0,6–0,7 V. Und: Der Strom wird **nie** durch die Spannung an der Diode eingestellt (die ist nahezu fest), sondern durch den Vorwiderstand bzw. die Quelle. Wer eine LED mit „genau 2 V" versorgen will, bekommt entweder Dunkelheit oder Rauch — die richtige Methode ist ein Strom (Vorwiderstand oder Konstantstromquelle). Bei der Z-Diode und der Freilaufdiode kommt es auf die **Polung** an: Die Freilaufdiode liegt in Sperrrichtung zur Betriebsspannung.`,
    },
    {
      id: 'video-dioden', type: 'video', youtube: 'iNkl9W9xCuU', label: 'Dioden in 6 Minuten einfach erklärt!', channel: "Edi's Techlab", minutes: 7,
      why: 'Kurzer Überblick über Diodenarten und Einsatz — passt als Wiederholung nach der Demo.',
    },
    {
      id: 'recall-freilauf', type: 'recall', title: 'Erkläre es mit eigenen Worten',
      prompt: 'Wozu dient die **Freilaufdiode** parallel zur Relaisspule, und wie ist sie gepolt?',
      answer: 'Beim Abschalten des Relais will die Spule den Strom weitertreiben und induziert dabei eine hohe Spannung mit umgekehrter Polung, die den Schalttransistor zerstören könnte. Die Freilaufdiode liegt **in Sperrrichtung zur Betriebsspannung** (Kathode zum Pluspol) — im Normalbetrieb sperrt sie, beim Abschalten leitet sie den Spulenstrom in sich selbst im Kreis weiter, bis er abgeklungen ist.',
      hints: ['Welche Polarität hat die Selbstinduktionsspannung beim Abschalten?'],
      cards: ['freilauf', 'varicap'],
    },
    {
      id: 'mission', type: 'callout', tone: 'mission', title: 'Prüfung & Funkpraxis',
      md: String.raw`
- **Prüfungsbezug:** EC501 (Sperrrichtung → hoher Widerstand), EC505–EC508 (Kennlinien: Schottky-, Germanium-, Silizium- und Leuchtdiode erkennen), EC509–EC512 (bei welcher Diode im Arbeitspunkt leitet sie?), EC515/EC516 (LED-Vorwiderstand).
- **Praxis:** In jedem Funkgerät sitzen Dioden: als Gleichrichter im Netzteil, als Schutzdiode gegen Verpolung (aber 0,7 V Verlust!), als Kapazitätsdiode im Abstimmkreis des VFO und als Detektor. Für Verpolungsschutz bei 12-V-Geräten kann man eine Schottky-Diode nehmen, weil dort weniger Spannung und Leistung verloren geht.
- **Rechentipp:** Zuerst $R_V=(U_q-U_F)/I$ rechnen, dann auf E12 runden und den Strom *nachrechnen* — nur so weißt du, was wirklich fließt.`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: String.raw`
<table><tr><th>Deutsch</th><th>English</th><th>Notation</th></tr>
<tr><td>Diode</td><td>diode</td><td>A (Anode), K (Kathode)</td></tr>
<tr><td>Durchlassrichtung / Sperrrichtung</td><td>forward / reverse direction</td><td></td></tr>
<tr><td>Flussspannung</td><td>forward voltage</td><td>$U_F$</td></tr>
<tr><td>Leuchtdiode</td><td>light-emitting diode (LED)</td><td></td></tr>
<tr><td>Schottky-Diode</td><td>Schottky diode</td><td></td></tr>
<tr><td>Kapazitätsdiode</td><td>varicap, varactor diode</td><td></td></tr>
<tr><td>Freilaufdiode</td><td>flyback (freewheeling) diode</td><td></td></tr>
<tr><td>Vorwiderstand</td><td>series resistor</td><td>$R_V$</td></tr>
<tr><td>Arbeitsgerade</td><td>load line</td><td></td></tr>
<tr><td>Arbeitspunkt</td><td>operating point, Q-point</td><td></td></tr></table>`,
    },
  ],
  cards: [
    { id: 'diode-richtung', front: 'Durchlassrichtung der Diode im Schaltzeichen?', back: 'Der Pfeil zeigt von der **Anode** zur **Kathode** (Strich) — Plus an Anode, Minus an Kathode.' },
    { id: 'uf-werte', front: 'Typische Flussspannungen Ge, Si, Schottky?', back: 'Ge ≈ 0,3 V, Si ≈ 0,6–0,7 V, Schottky ≈ 0,2–0,4 V (LED je nach Farbe 1,8–3,4 V).' },
    { id: 'led-rv', front: 'LED-Vorwiderstand?', back: '$R_V=(U_q-U_F)/I_F$, dann auf E12 runden und Strom nachrechnen.' },
    { id: 'led-reihe', front: 'LEDs in Reihe: wie wird $R_V$ berechnet?', back: 'Die $U_F$ addieren sich: $R_V=(U_q-N\\cdot U_F)/I$.' },
    { id: 'led-ohne-r', front: 'Warum LED nie ohne Vorwiderstand?', back: 'Exponentielle Kennlinie: schon wenig mehr Spannung = viel mehr Strom; $U_D$ bleibt fast konstant.' },
    { id: 'schottky', front: 'Vorzüge der Schottky-Diode?', back: 'Niedrige $U_F$ (0,2–0,4 V) und sehr schnell (HF, Schaltnetzteile, Detektor).' },
    { id: 'varicap', front: 'Kapazitätsdiode: wie hängt $C$ von der Sperrspannung ab?', back: 'Höhere Sperrspannung → breitere Raumladungszone → **kleinere** Kapazität (Abstimmung von Schwingkreisen).' },
    { id: 'freilauf', front: 'Freilaufdiode: Zweck und Polung?', back: 'Parallel zur Spule, **in Sperrrichtung** zur Betriebsspannung; fängt die Abschaltspannung der Selbstinduktion ab.' },
    { id: 'arbeitsgerade', front: 'Wie findet man den Arbeitspunkt einer Diodenschaltung?', back: 'Schnittpunkt von Kennlinie $I_D(U_D)$ und Arbeitsgerade $U_q=U_D+I_DR_V$.' },
    { id: 'sperr-diode', front: 'Diode in Sperrrichtung?', back: 'Hoher Widerstand, nur kleiner Sperrstrom; erst bei Durchbruchspannung leitet sie wieder.' },
    { id: 'fotodiode', front: 'Fotodiode: wie arbeitet sie?', back: 'In Sperrrichtung: Licht erzeugt Ladungsträger → lichtabhängiger Strom.' },
  ],
};
