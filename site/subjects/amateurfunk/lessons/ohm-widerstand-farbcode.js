export default {
  id: 'ohm-widerstand-farbcode',
  title: 'Ohmsches Gesetz, Widerstände und Farbcode',
  summary: 'U = R·I nach jeder Größe umstellen, Widerstandswerte aus Farbringen und SMD-Codes lesen, Toleranzbereiche berechnen und die Widerstandsarten (Draht, Schicht, NTC/PTC) für HF und Messtechnik unterscheiden.',
  minutes: 35,
  goals: [
    'Das [[ohmsches-gesetz|Ohmsche Gesetz]] $U = R\\cdot I$ nach $I$ und $R$ umstellen und mit mA, kΩ, V rechnen',
    'Den Wert eines vierringigen Widerstands aus dem [[farbcode]] und eines SMD-Widerstands aus dem Zifferncode lesen',
    'Den Toleranzbereich eines Widerstands berechnen (z. B. 5,6 kΩ ±10 % → 5040…6160 Ω)',
    'Widerstandsarten unterscheiden: Drahtwiderstand, Metallschicht, Metalloxid, Kohleschicht, [[ntc-ptc|NTC/PTC]] – und warum eine Dummy Load keine Wendel haben darf',
  ],
  needs: ['elektrotechnik/widerstand-und-ohm', 'elektrotechnik/widerstaende-in-der-praxis'],
  blocks: [
    {
      id: 'ohm', type: 'text', title: 'Das Ohmsche Gesetz',
      md: `
Der [Widerstand](wiki:Widerstand (Bauelement)|Resistor) $R$ bremst den Strom: Je größer $R$, desto weniger Strom fließt bei gleicher Spannung. Seine Einheit ist das **Ohm (Ω)**; sie ist nicht Volt, Ampere oder Watt (NA203). Der Zusammenhang heißt nach [Georg Simon Ohm](wiki:Georg Simon Ohm|Georg Ohm) das **[Ohmsche Gesetz](wiki:Ohmsches Gesetz|Ohm's law)**:[^bnetza-formelsammlung]

$$U = R\\cdot I \\qquad\\Longleftrightarrow\\qquad I = \\frac{U}{R} \\qquad\\Longleftrightarrow\\qquad R = \\frac{U}{I}$$

Die drei Formeln sind **dieselbe** Gleichung, nur nach einer anderen Größe aufgelöst. Als Merkdreieck: oben $U$, unten $R$ und $I$ — die gesuchte Größe zuhalten, der Rest zeigt die Rechnung (zugehalten $U$: unten $R\\cdot I$; zugehalten $I$: oben durch unten, $U/R$).

**Beispiel:** Ein 12-V-Netzteil treibt durch einen Widerstand $0{,}3\\,\\text{A}$. Dann ist $R = \\dfrac{12\\,\\text{V}}{0{,}3\\,\\text{A}} = 40\\,\\Omega$ (NB505). Fließen 90 mA durch $100\\,\\Omega$, liegen $U = 100\\,\\Omega\\cdot0{,}09\\,\\text{A} = 9\\,\\text{V}$ an (NB504) — wichtig ist, **vorher** mA in A umzurechnen.`,
    },
    {
      id: 'warn-ohm', type: 'callout', tone: 'warning', title: 'Falsche Formeln im Katalog',
      md: `Die falschen Antworten sind genau die typischen Umstellfehler: $R = U\\cdot I$ (das wäre die Leistung, wenn man $R$ durch $P$ ersetzt), $R = I/U$ (Kehrwert vertauscht) und $I = R\\cdot U$. **Probe:** Mehr Spannung → mehr Strom ($I$ steht im Zähler mit $U$); mehr Widerstand → weniger Strom ($R$ im Nenner). Prüfungsbezug: NB501–NB503. Bei den Rechnungen sind die falschen Antworten oft Faktor-1000-Fehler (1,111 kV, 9 kV) — immer in Grundeinheiten rechnen.`,
    },
    {
      id: 'viz-ohm', type: 'viz', viz: 'ohm-lab', title: 'Ohm-Labor',
      task: 'Stelle für den **Widerstand** nacheinander die drei Zielströme ein und vergleiche danach die **Glühlampe** bei kleiner und großer Spannung: Ihr Widerstand ist nicht konstant.',
    },
    {
      id: 'calc-r', type: 'numeric', title: 'Widerstand berechnen',
      question: 'An einem Widerstand liegen 5 V an, es fließen 20 mA. Wie groß ist $R$?',
      answer: 250, tolerance: 0.5, unit: 'Ω',
      hint: '$R = U/I$ mit $I = 0{,}02\\,\\text{A}$.',
      explain: '$R = 5\\,\\text{V}/0{,}02\\,\\text{A} = 250\\,\\Omega$.',
    },
    {
      id: 'calc-i', type: 'numeric', title: 'Strom berechnen',
      question: 'Eine LED-Kette mit einem Vorwiderstand von $470\\,\\Omega$ hat am Widerstand einen Spannungsabfall von $9{,}4\\,\\text{V}$. Welcher Strom fließt?',
      answer: 20, tolerance: 0.2, unit: 'mA',
      hint: '$I = U/R$; das Ergebnis in A, dann mal 1000.',
      explain: '$I = 9{,}4\\,\\text{V}/470\\,\\Omega = 0{,}02\\,\\text{A} = 20\\,\\text{mA}$.',
    },
    {
      id: 'farbcode', type: 'text', title: 'Der Widerstandsfarbcode',
      md: `
Auf kleinen Widerständen ist kein Platz für Zahlen, deshalb wird der [[farbcode|Farbcode]] aus Ringen aufgedruckt. Bei **vier Ringen** gilt: **1. Ring = erste Ziffer, 2. Ring = zweite Ziffer, 3. Ring = Multiplikator, 4. Ring = Toleranz.** Die Tabelle steht in der Formelsammlung — du musst sie also nicht auswendig können, aber schnell anwenden.[^bnetza-formelsammlung]

| Farbe | Ziffer | Multiplikator | Toleranz |
|---|---|---|---|
| Silber | – | 0,01 | ±10 % |
| Gold | – | 0,1 | ±5 % |
| Schwarz | 0 | 1 | – |
| Braun | 1 | 10 | ±1 % |
| Rot | 2 | 100 | ±2 % |
| Orange | 3 | 1 000 | – |
| Gelb | 4 | 10 000 | – |
| Grün | 5 | 100 000 | – |
| Blau | 6 | 1 000 000 | ±0,25 % |
| Violett | 7 | 10 000 000 | ±0,1 % |
| Grau | 8 | 10⁸ | – |
| Weiß | 9 | 10⁹ | – |
| (kein Ring) | – | – | ±20 % |

**Beispiele:** Gelb – Violett – Orange = $47\\cdot1000\\,\\Omega = 47\\,\\text{k}\\Omega$. Rot – Violett – Rot = $27\\cdot100 = 2{,}7\\,\\text{k}\\Omega$. Braun – Rot – Rot = $12\\cdot100 = 1{,}2\\,\\text{k}\\Omega$ (so beginnt ein 1,2-kΩ-Widerstand). Ein **grüner** Multiplikatorring bedeutet ×100 000.

Zum 4. Ring: **Silber ±10 %, Gold ±5 %, Braun ±1 %** (NC108–NC110). Mit ± 5 % werden die E24-Werte gebaut, mit ±10 % die E12-Werte; die Normreihen ([E-Reihe](wiki:E-Reihe|E series of preferred numbers)) stehen ebenfalls in der Formelsammlung.

> Merkhilfe für die Reihenfolge der Farben 0–9: **Sch**warz, **Br**aun, **R**ot, **O**range, **Ge**lb, **Gr**ün, **Bl**au, **Vi**olett, **Gr**au, **W**eiß — wie die Farben des Regenbogens mit Schwarz davor.`,
    },
    {
      id: 'warn-farbe', type: 'callout', tone: 'warning', title: 'Zehnerpotenz-Falle',
      md: `Alle falschen Antworten bei den Farbcode-Fragen haben dieselben Ziffern, aber eine andere Zehnerpotenz (2,7 kΩ ↔ 27 kΩ ↔ 270 kΩ ↔ 2,7 MΩ). Der dritte Ring ist **kein** weiteres Ziffernpaar, sondern gibt an, **wie viele Nullen** hinter die zwei Ziffern kommen: Rot = zwei Nullen, Orange = drei Nullen, Gelb = vier. Prüfungsbezug: NC102–NC107.`,
    },
    {
      id: 'viz-farbcode', type: 'viz', viz: 'resistor-code-reader', title: 'Farbcode-Trainer',
      params: { mode: '4', rounds: 10, need: 8 },
      task: 'Lies **8 von 10** vierringigen Widerständen richtig ab (Tabelle der Formelsammlung ist erlaubt).',
    },
    {
      id: 'order-farben', type: 'order', title: 'Farbcode-Reihenfolge',
      prompt: 'Sortiere diese Ringfarben nach ihrer **Ziffer** von 0 bis 9.',
      items: ['Schwarz', 'Braun', 'Rot', 'Orange', 'Gelb', 'Grün', 'Blau', 'Violett', 'Grau', 'Weiß'],
      explain: 'Schwarz 0, Braun 1, Rot 2, Orange 3, Gelb 4, Grün 5, Blau 6, Violett 7, Grau 8, Weiß 9.',
    },
    {
      id: 'toleranz', type: 'text', title: 'Toleranz und SMD-Code',
      md: `
Die **Toleranz** gibt an, wie stark der echte Widerstandswert vom aufgedruckten **Nennwert** abweichen darf. Ein 5,6-kΩ-Widerstand mit ±10 % darf irgendwo zwischen

$$5600\\,\\Omega\\cdot0{,}9 = 5040\\,\\Omega \\quad\\text{und}\\quad 5600\\,\\Omega\\cdot1{,}1 = 6160\\,\\Omega$$

liegen (EC112). Die Farben Grün – Blau – Rot – Silber ergeben genau diesen Widerstand: $56\\cdot100\\,\\Omega = 5{,}6\\,\\text{k}\\Omega$, ±10 % (EC113). Rechne die Toleranz **vom Nennwert** aus; die Katalogfallen sind die Normwerte der Nachbarn in der E-Reihe (4,7 k, 6,8 k) oder falsche Prozentsätze (±15 %, ±5 %).

**[SMD](wiki:Surface-mounted device)-Widerstände** („Surface-Mounted Device“, oberflächenmontiert) sind nur wenige Millimeter groß. Hier steht der Wert als **Zahl** auf dem Gehäuse: Die **ersten beiden Ziffern** sind die Wertziffern, die **letzte Ziffer** gibt die **Zehnerpotenz** (Anzahl der Nullen) an — in Ω:

| Aufdruck | Rechnung | Wert |
|---|---|---|
| 103 | $10\\cdot10^3$ | **10 kΩ** |
| 221 | $22\\cdot10^1$ | **220 Ω** |
| 223 | $22\\cdot10^3$ | **22 kΩ** |

Der Code ist nur dem **Prinzip** nach wie der Farbcode: zwei Ziffern plus Zehnerpotenz, aber ohne Toleranz (EC114–EC117).`,
    },
    {
      id: 'calc-tol', type: 'numeric', title: 'Toleranzgrenze',
      question: 'Ein Widerstand ist mit 2,2 kΩ und ±5 % angegeben. Welchen **größten** Wert darf er haben?',
      answer: 2310, tolerance: 5, unit: 'Ω',
      hint: 'Nennwert · 1,05.',
      explain: '$2200\\,\\Omega\\cdot1{,}05 = 2310\\,\\Omega$. Der kleinste Wert wäre $2090\\,\\Omega$.',
    },
    {
      id: 'quiz-smd', type: 'quiz', title: 'SMD-Code',
      question: 'Auf einem SMD-Widerstand steht **472**. Welchen Wert hat er?',
      options: [
        { text: '4,7 kΩ', correct: true, why: '$47\\cdot10^2\\,\\Omega = 4700\\,\\Omega$.' },
        { text: '472 Ω', why: 'Die letzte Ziffer ist die Zehnerpotenz, nicht Teil der Zahl.' },
        { text: '47 kΩ', why: 'Das wäre der Code 473.' },
        { text: '47,2 Ω', why: 'Ein Dezimalpunkt wird so nicht kodiert.' },
      ],
    },
    {
      id: 'materialien', type: 'text', title: 'Widerstandsarten und ihre Einsatzgebiete',
      md: `
Nicht jeder Widerstand ist für jede Frequenz geeignet — denn jedes Bauteil hat **Eigeninduktivität und Eigenkapazität**. Wendelt man den Widerstandsdraht, ist der Widerstand zugleich eine Spule.[^darc-50ohm]

| Widerstandsart | Eigenschaften | Einsatz |
|---|---|---|
| **[Drahtwiderstand](wiki:Drahtwiderstand|Wire resistor)** (Wickelwiderstand) | sehr belastbar, aber **induktiv** (Wendel) | Hochlastwiderstände bei **niedrigen Frequenzen** (EC101) |
| **[Metallschicht](wiki:Metallschichtwiderstand)** | geringe Toleranz, geringe Temperaturabhängigkeit | **Präzisionswiderstände** (EC102) |
| **Metalloxidschicht** | induktionsarm, temperaturstabil | **HF über 30 MHz** (EC103) |
| **Kohleschicht** | billig, ungenau, induktionsarm | einfache Anwendungen, auch niedrige HF |
| **[NTC](wiki:Heißleiter) / [PTC](wiki:Kaltleiter|Temperature coefficient#Positive temperature coefficient of resistance)** | Widerstand ändert sich stark mit der Temperatur | **Temperaturmessung** (NTC, EC108), Einschaltstrombegrenzung |

**NTC und PTC** (siehe [Temperaturkoeffizient](wiki:Temperaturkoeffizient|Temperature coefficient)): Der **[[ntc-ptc|Heißleiter]] (NTC, Negative Temperature Coefficient)** leitet bei Wärme besser, sein Widerstand **sinkt** mit der Temperatur. Der **Kaltleiter (PTC)** verhält sich umgekehrt, sein Widerstand **steigt**. Im Schaltzeichen steht ein Rechteck mit schräger Linie, daneben ein $\\vartheta$ (Temperatur) und zwei Pfeile: erster Pfeil immer nach oben (Temperatur steigt), zweiter Pfeil zeigt, was der Widerstand tut — **↑↓ = NTC**, **↑↑ = PTC** (EC109–EC111). Ein **LDR** ist ein lichtabhängiger Widerstand (Pfeile von außen ins Rechteck), ein **VDR** (Varistor) hängt von der Spannung ab.

**Dummy Load (künstliche Antenne):** Der Abschlusswiderstand von 50 Ω darf keine Wendel enthalten, weil sich sonst bei VHF/UHF ein Blindanteil dazuschleicht und der Widerstand frequenzabhängig wird. Gute Dummy Loads bestehen deshalb aus **ungewendelten** Schicht- oder Metalloxidwiderständen mit **geringer Eigeninduktivität und Eigenkapazität** (EC104–EC107). Ein Trick: Zehn Kohleschichtwiderstände mit je 500 Ω **parallel** ergeben 50 Ω ($500\\,\\Omega/10$) und verteilen zugleich die Leistung — wie das genau geht, siehst du in der Lektion über Reihen-/Parallelschaltung.`,
    },
    {
      id: 'bauformen', type: 'text', title: 'Bauformen im Detail: Draht, Kohle, Metall, Oxid',
      md: String.raw`
Die Tabelle oben fasst zusammen, hier die Hintergründe:[^darc-50ohm]

- **Drahtwiderstände (Wickelwiderstände)** gehören zu den ältesten Bauformen. Lackisolierter Widerstandsdraht, zum Beispiel aus [Manganin](wiki:Manganin|Manganin) oder [Konstantan](wiki:Konstantan|Constantan), wird auf einen Keramikkörper gewickelt. Vorteile: hohe Überlastbarkeit und kleiner Temperaturkoeffizient. Nachteil: Ein einfach gewickelter Draht ist auch eine **Spule**, hat also eine hohe Induktivität, und der Widerstand wird frequenzabhängig. Deshalb sind sie Hochlastwiderstände für Gleichstrom und niedrige Frequenzen, nicht für die Funktechnik.
- **[Kohleschichtwiderstände](wiki:Kohleschichtwiderstand):** Eine dünne Kohleschicht wird auf einen Träger aufgedampft. Billig, aber mit großer Fertigungstoleranz; vergleichsweise induktionsarm, daher für HF eingeschränkt geeignet.
- **Metalloxidschicht:** dünne Schicht auf einem Träger, weitgehend induktionsarm und temperaturstabil, daher besonders für Frequenzen über 30 MHz.
- **Metallschicht:** mit hoher Genauigkeit, also kleiner Fertigungstoleranz, herstellbar: Präzisionswiderstände. Sie sind weitgehend temperaturunabhängig, aber weniger induktionsarm als die Oxidschicht.

Für die **Dummy Load** bei hohen Frequenzen (VHF) nimmst du bevorzugt ungewendelte Metalloxidschichtwiderstände. Bei niedrigeren Frequenzen wie 50 MHz oder 28 MHz tun es auch Kohleschichtwiderstände. Entscheidend: keine Windungen, möglichst kleine Eigenkapazität und genug Temperaturfestigkeit, denn der Widerstand setzt die Leistung in Wärme um.
`,
    },
    {
      id: 'warn-bauform', type: 'callout', tone: 'warning', title: 'Merke: nicht „Draht ist immer besser“',
      md: `Der Drahtwiderstand verträgt viel Leistung, aber die Wendel macht ihn zur Spule. Für eine 50-Ω-Dummy-Load bei VHF/UHF wäre er die falsche Wahl, genau weil sich sein Wert mit der Frequenz verändert. Prüfungsbezug: EC101–EC107.`,
    },
    {
      id: 'toleranz-vertiefung', type: 'text', title: 'Toleranz im Alltag und SMD-Bauteile',
      md: String.raw`
Gebräuchlich sind Toleranzen von **±1 %, ±2 %, ±5 % und ±10 %**. Je kleiner die Toleranz, desto genauer, aber oft auch teurer; ±1 % und weniger wählt man für Messgeräte oder empfindliche Sensoren. ([Toleranz](wiki:Toleranz (Technik)|Engineering tolerance)) Rechne immer **mit dem Nennwert**: Ein 1-kΩ-Widerstand mit ±5 % hat 5 % von 1000 Ω, das sind 50 Ω, also liegt der echte Wert zwischen **950 Ω und 1050 Ω**. Ein 47-kΩ-Widerstand mit silbernem Ring (±10 %) darf um 4,7 kΩ abweichen, also zwischen 42,3 und 51,7 kΩ liegen.

**SMD** steht für *Surface-Mounted Device*, das oberflächenmontierte Bauelement. Es hat keine Drahtanschlüsse, sondern wird direkt auf die Leiterplatte aufgelötet, ohne Durchkontaktierung. Auf dem Widerstand steht der Wert als Zahl: Alle Ziffern bis auf die **letzte** sind der reine Zahlenwert, die **letzte** Ziffer ist die **Zehnerpotenz**. Beispiel **113**: $11\cdot10^3\,\Omega=11\,\text{k}\Omega$. Beispiel **334**: $33\cdot10^4=330\,\text{k}\Omega$. Die Zehnerpotenz ist also die Anzahl der Nullen, nicht Teil der Zahl.

**Mehr als vier Ringe:** Es gibt Widerstände mit mehr Farbringen. Für die Prüfung sind sie nicht relevant; auch andere Bauteile tragen oft Farbringe.
`,
    },
    {
      id: 'calc-tol-abw', type: 'numeric', title: 'Toleranzbereich berechnen',
      question: 'Ein Widerstand trägt die Ringe Gelb–Violett–Orange–Silber. Um wie viel Ohm darf der echte Wert **höchstens** vom Nennwert abweichen?',
      answer: 4700, tolerance: 20, unit: 'Ω',
      hint: 'Erst den Nennwert (47 kΩ), dann Silber = ±10 %.',
      explain: 'Nennwert $47\\,\\text{k}\\Omega$; $10\\,\\%$ davon sind $4{,}7\\,\\text{k}\\Omega$. Der echte Wert liegt zwischen $42{,}3$ und $51{,}7\\,\\text{k}\\Omega$.',
    },
    {
      id: 'calc-smd334', type: 'numeric', title: 'SMD-Code lesen',
      question: 'Auf einem SMD-Widerstand steht **334**. Welchen Wert hat er in kΩ?',
      answer: 330, tolerance: 1, unit: 'kΩ',
      hint: 'Die letzte Ziffer ist die Zehnerpotenz: $33\\cdot10^4$.',
      explain: '$33\\cdot10^4\\,\\Omega=330\\,000\\,\\Omega=330\\,\\text{k}\\Omega$. Wer die 4 als Teil der Zahl liest, landet bei falschen 334 Ω oder 33,4 kΩ.',
    },
    {
      id: 'match-smd', type: 'match', title: 'SMD-Aufdruck → Wert',
      prompt: 'Ordne den Aufdruck dem Widerstandswert zu.',
      pairs: [
        ['113', '11 kΩ'],
        ['471', '470 Ω'],
        ['104', '100 kΩ'],
        ['222', '2,2 kΩ'],
      ],
    },
    {
      id: 'q-ntc-einsatz', type: 'quiz', title: 'Heiß- und Kaltleiter',
      question: 'Ein Widerstand leitet bei hoher Temperatur besser als bei niedriger. Wie heißt er, und wofür wird er unter anderem genutzt?',
      options: [
        { text: 'Heißleiter (NTC); zum Beispiel zur Temperaturmessung oder Einschaltstrombegrenzung.', correct: true, why: 'Bei steigender Temperatur sinkt der Widerstand, die Leitfähigkeit steigt. Schaltzeichen ϑ↑↓.' },
        { text: 'Kaltleiter (PTC); sein Widerstand sinkt mit der Temperatur.', why: 'Beim Kaltleiter steigt der Widerstand mit der Temperatur.' },
        { text: 'Drahtwiderstand; als Präzisionswiderstand.', why: 'Das ist keine temperaturabhängige Widerstandsart im Sinne der Frage; Präzision liefert die Metallschicht.' },
        { text: 'Metalloxidwiderstand; für Frequenzen über 30 MHz.', why: 'Das beschreibt die Bauform, nicht das Temperaturverhalten.' },
      ],
    },
    {
      id: 'match-arten', type: 'match', title: 'Widerstandsart → Eigenschaft',
      prompt: 'Welche Widerstandsart passt zur Aufgabe?',
      pairs: [
        ['Hochlast bei niedrigen Frequenzen', 'Drahtwiderstand'],
        ['Präzisionswiderstand', 'Metallschichtwiderstand'],
        ['Induktionsarm, über 30 MHz', 'Metalloxidschichtwiderstand'],
        ['Temperatur messen', 'NTC'],
      ],
    },
    {
      id: 'viz-sym', type: 'viz', viz: 'schaltzeichen-trainer', title: 'Widerstands-Schaltzeichen',
      params: { set: ['widerstand', 'poti', 'ntc', 'ptc', 'ldr', 'vdr', 'sicherung'], need: 6 },
      task: 'Erkenne **sechs** Widerstands-Schaltzeichen in Folge. Achte bei NTC und PTC auf die Pfeile neben dem ϑ.',
    },
    {
      id: 'mission-ohm', type: 'callout', tone: 'mission', title: 'Funkpraxis: Vorwiderstand und Dummy Load',
      md: `Zwei Dinge mit dem Ohmschen Gesetz, die du schon bald baust: **(1)** Die Betriebs-LED am Netzteil braucht einen **Vorwiderstand**: aus Betriebsspannung, LED-Spannung und gewünschtem Strom bekommst du ihn mit $R = U/I$. **(2)** Die **Dummy Load** (künstliche Antenne) lässt dich Sender testen, ohne zu strahlen — sie ist im Kern ein Widerstand von 50 Ω, der die Sendeleistung in Wärme umsetzt. Ihre Qualität entscheidet sich an der HF-Tauglichkeit des Widerstandsmaterials.`,
    },
    {
      id: 'recall-ohm', type: 'recall', title: 'In eigenen Worten',
      prompt: 'Wie liest du einen vierringigen Widerstand Gelb–Violett–Rot–Gold ab? Welcher Wertebereich ergibt sich? Und welche Widerstandsart nimmst du für eine Dummy Load bei 145 MHz — und warum?',
      answer: 'Gelb = 4, Violett = 7, Rot = Multiplikator 100, also 47 · 100 Ω = 4,7 kΩ; Gold = ±5 % → 4465 bis 4935 Ω. Für eine Dummy Load bei 145 MHz nehme ich ungewendelte Metalloxid- (oder Kohle-)schichtwiderstände mit geringer Eigeninduktivität und -kapazität, weil Drahtwiderstände als Wendel wie eine Spule wirken und bei hohen Frequenzen nicht mehr rein ohmsch sind.',
      cards: ['ohm-formeln', 'ohm-farbcode'],
    },
  ],
  cards: [
    { id: 'ohm-formeln', front: 'Ohmsches Gesetz: alle drei Formen?', back: '$U=R\\cdot I$, $I=\\dfrac{U}{R}$, $R=\\dfrac{U}{I}$' },
    { id: 'ohm-einheit', front: 'Einheit des Widerstands?', back: 'Ohm (Ω) — nicht V, A oder W.' },
    { id: 'ohm-farbcode', front: 'Vierring-Code: Bedeutung der Ringe?', back: '1. Ziffer, 2. Ziffer, **Multiplikator** (Anzahl Nullen), **Toleranz**.' },
    { id: 'ohm-ziffern', front: 'Ziffern der Farben 0–9', back: 'Schwarz 0, Braun 1, Rot 2, Orange 3, Gelb 4, Grün 5, Blau 6, Violett 7, Grau 8, Weiß 9.' },
    { id: 'ohm-toleranz', front: 'Toleranzringe?', back: 'Silber ±10 %, Gold ±5 %, Braun ±1 %, Rot ±2 %; kein Ring ±20 %.' },
    { id: 'ohm-gruen', front: 'Multiplikator Grün?', back: '×100 000 (Ziffer 5 → fünf Nullen).' },
    { id: 'ohm-beispiel', front: 'Gelb–Violett–Orange?', back: '$47\\cdot1000\\,\\Omega=47\\,\\text{k}\\Omega$' },
    { id: 'ohm-tolbereich', front: '5,6 kΩ ±10 %: Bereich?', back: '5040 Ω bis 6160 Ω (Nennwert · 0,9 bzw. · 1,1).' },
    { id: 'ohm-smd', front: 'SMD-Code 221, 103, 223?', back: '221 = 22·10¹ = 220 Ω; 103 = 10 kΩ; 223 = 22 kΩ. Letzte Ziffer = Zehnerpotenz.' },
    { id: 'ohm-draht', front: 'Drahtwiderstand: Einsatz und Schwäche?', back: 'Hochlast bei niedrigen Frequenzen; als Wendel **induktiv**, nicht für HF.' },
    { id: 'ohm-oxid', front: 'Welcher Widerstand für HF über 30 MHz?', back: 'Metalloxidschichtwiderstand (induktionsarm). Präzision: Metallschicht.' },
    { id: 'ohm-ntc', front: 'NTC vs. PTC?', back: 'NTC (Heißleiter): R sinkt mit ϑ, Symbol ϑ↑↓, Temperaturmessung. PTC (Kaltleiter): R steigt, ϑ↑↑.' },
    { id: 'ohm-dummy', front: 'Dummy Load: Anforderung an die Widerstände?', back: 'Geringe Eigeninduktivität und -kapazität, ungewendelt; z. B. 10 × 500 Ω parallel = 50 Ω.' },
    { id: 'ohm-kohle', front: 'Kohleschichtwiderstand: Eigenschaften?', back: 'Kohleschicht aufgedampft; billig, große Fertigungstoleranz, vergleichsweise induktionsarm (HF eingeschränkt).' },
    { id: 'ohm-metallschicht', front: 'Metallschichtwiderstand: Eigenschaften?', back: 'Kleine Fertigungstoleranz, kaum temperaturabhängig: Präzisionswiderstand; weniger induktionsarm als Oxidschicht.' },
    { id: 'ohm-smd-def', front: 'SMD-Widerstand: Aufdruck lesen?', back: 'Alle Ziffern außer der letzten = Zahl, letzte Ziffer = Zehnerpotenz. 113 = 11·10³ = 11 kΩ; 334 = 330 kΩ.' },
    { id: 'ohm-tol-47', front: '47 kΩ mit Silber (±10 %): Bereich?', back: '±4,7 kΩ, also 42,3 bis 51,7 kΩ. Toleranz immer vom Nennwert rechnen.' },
    { id: 'ohm-einsatz-ntc', front: 'Wofür NTC und PTC?', back: 'Temperaturmessung und Einschaltstrombegrenzung; NTC = Heißleiter (R sinkt), PTC = Kaltleiter (R steigt).' },
  ],
};
