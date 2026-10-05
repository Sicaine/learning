export default {
  id: 'wellen-felder-antennen-intro',
  title: 'Elektromagnetische Welle, Polarisation, Wellenlänge',
  summary: 'Wie aus Wechselstrom eine Welle wird: E- und H-Feld im Fernfeld, Polarisation, c = f·λ mit der Faustformel λ ≈ 300/f(MHz), die Länge eines Halbwellendipols und die Feldstärke im Abstand d. Brücke zum Fach Amateurfunk (Antennen, Ausbreitung).',
  minutes: 30,
  needs: ['elektrisches-feld', 'magnetfeld', 'reflexion-swr'],
  goals: [
    'Erklären, wie ein zeitlich veränderlicher Strom ein [[elektromagnetische-welle|elektromagnetisches Feld]] erzeugt, das sich vom Leiter ablöst',
    'Die Lage von E-Feld, H-Feld und Ausbreitungsrichtung im [[fernfeld|Fernfeld]] beschreiben (jeweils 90°) und die [[polarisation|Polarisation]] als Richtung des E-Vektors erkennen',
    'Mit $c=f\\lambda$ bzw. $\\lambda[\\text{m}]\\approx300/f[\\text{MHz}]$ Frequenz und [[wellenlaenge|Wellenlänge]] ineinander umrechnen',
    'Die Länge eines [[dipol|Halbwellendipols]] und eines $\\lambda/4$-Strahlers (mit Verkürzung 0,95) abschätzen',
    'Die Feldstärke im Fernfeld $E=\\sqrt{30\\,\\Omega\\cdot P\\cdot G}/d$ berechnen und die Rolle von [[antennengewinn|Gewinn]] und EIRP einordnen',
  ],
  blocks: [
    {
      id: 'intuition', type: 'text', title: 'Vom Draht in den Raum',
      md: String.raw`
Ein **Gleichstrom** in einem Draht erzeugt ein konstantes Magnetfeld, das ihn umgibt — es bleibt am Draht. Ein **veränderlicher** Strom tut mehr: Ein sich änderndes Magnetfeld induziert ein elektrisches Feld ([Faradaysches Induktionsgesetz](wiki:Induktionsgesetz|Faraday's law of induction)), und ein sich änderndes elektrisches Feld erzeugt wiederum ein Magnetfeld. Beide Felder **erzeugen sich gegenseitig** — und bei hohen Frequenzen lösen sie sich vom Leiter ab und laufen als [elektromagnetische Welle](wiki:Elektromagnetische Welle|Electromagnetic wave) in den Raum hinaus, ohne dass noch ein Leiter nötig wäre. *Ein elektromagnetisches Feld entsteht, wenn ein zeitlich veränderlicher Strom durch einen Leiter fließt* (EB301).

Die Theorie dazu lieferte [James Clerk Maxwell](wiki:James Clerk Maxwell|James Clerk Maxwell) 1865 mit den [Maxwell-Gleichungen](wiki:Maxwell-Gleichungen|Maxwell's equations); [Heinrich Hertz](wiki:Heinrich Hertz|Heinrich Hertz) wies die Wellen ab 1886 im Labor nach — mit Funkenstrecken und Drahtschleifen als Sender und Empfänger. [Guglielmo Marconi](wiki:Guglielmo Marconi|Guglielmo Marconi) machte daraus die drahtlose Telegrafie. Die Einheit der Frequenz trägt Hertz' Namen.

Was Radio, WLAN, Licht und Röntgenstrahlen unterscheidet, ist allein die **Frequenz** bzw. die [Wellenlänge](wiki:Wellenlänge|Wavelength). Alle breiten sich im Vakuum mit [Lichtgeschwindigkeit](wiki:Lichtgeschwindigkeit|Speed of light) aus.[^wp-elektromagnetische-welle]`,
    },
    {
      id: 'fernfeld', type: 'text', title: 'E, H und die Ausbreitungsrichtung: drei Richtungen, drei rechte Winkel',
      md: String.raw`
Weit genug von der Antenne entfernt — im **Fernfeld** — ist die Welle fast eine **ebene Welle**: Das elektrische Feld $\vec E$ und das magnetische Feld $\vec H$ stehen **senkrecht aufeinander** und beide **senkrecht zur Ausbreitungsrichtung** (EB303, EB304). Die Richtung des Energietransports gibt der [Poynting-Vektor](wiki:Poynting-Vektor|Poynting vector) $\vec S=\vec E\times\vec H$ an. Die beiden Felder schwingen dabei **in Phase**: Wo $E$ maximal ist, ist auch $H$ maximal — der Winkel von 90° ist ein Winkel im **Raum**, keiner in der Zeit. Das Verhältnis ist konstant, der **Feldwellenwiderstand des freien Raums**:

$$ \frac{E}{H}=Z_{F0}\approx 377\,\Omega \;(=120\pi\,\Omega) $$

Die Demo unten zeigt die Welle in einer Schrägansicht: E (blau), H (grün), und die Ausbreitungsrichtung $S$ nach rechts.

**Nahfeld:** In der Nähe der Antenne (grob unter $\lambda/(2\pi)$ bei kleinen Antennen) ist es komplizierter — E und H sind nicht in Phase, und es gibt Blindenergie, die zur Antenne zurückpendelt. Im Fach Amateurfunk lernst du, was das für Sicherheitsabstände und Antennen bedeutet.

**[Polarisation](wiki:Polarisation|Polarization (waves))** nennt man die Schwingungsrichtung des **elektrischen Feldes** (EB305; für die Antenne EG222):

- **vertikal**: $\vec E$ senkrecht (z. B. Vertikalantenne, Handfunke),
- **horizontal**: $\vec E$ waagerecht (z. B. waagerecht gespannter Dipol, Yagi mit waagerechten Elementen),
- **zirkular** (rechts- oder linksdrehend): $\vec E$ dreht sich bei fortschreitender Welle um die Ausbreitungsachse, z. B. bei Satellitenfunk — die Polarisation von Sende- und Empfangsantenne sollten **übereinstimmen**, sonst verliert man einige 10 dB (Kreuzpolarisation).[^bnetza-pruefungsfragen-2024]`,
    },
    {
      id: 'quiz-winkel', type: 'quiz', title: 'Welcher Winkel zwischen E und H?',
      question: 'Welcher Winkel besteht im **Fernfeld** bei Freiraumausbreitung zwischen der elektrischen und der magnetischen Feldkomponente?',
      options: [
        { text: '90°', correct: true, why: 'E und H stehen senkrecht aufeinander und senkrecht zur Ausbreitungsrichtung (EB303, EB304).' },
        { text: '0° (parallel)', correct: false, why: 'Parallel wäre keine Querwelle; Energietransport $\\vec S=\\vec E\\times\\vec H$ verlangt senkrechte Felder.' },
        { text: '45°', correct: false, why: 'Der Winkel ist genau 90°, nicht beliebig.' },
        { text: '180° (gegenphasig)', correct: false, why: 'E und H sind **phasengleich**; Fehlvorstellung: „90° Phasenverschiebung“ (das gäbe es im Nahfeld).' },
      ],
    },
    {
      id: 'quiz-pol', type: 'quiz', title: 'Wodurch ist die Polarisation bestimmt?',
      question: 'Die Polarisation einer elektromagnetischen Welle ist durch die Richtung ... bestimmt.',
      options: [
        { text: 'des elektrischen Feldes (E-Vektor)', correct: true, why: 'Definition (EB305). Eine senkrechte Vertikalantenne strahlt vertikal polarisiert, ein waagerechter Dipol horizontal.' },
        { text: 'des magnetischen Feldes (H-Vektor)', correct: false, why: 'Die H-Richtung steht immer senkrecht dazu; maßgeblich ist E.' },
        { text: 'der Ausbreitung', correct: false, why: 'Die Ausbreitungsrichtung ist die Richtung von $\\vec S$, nicht die der Polarisation.' },
        { text: 'des Speisekabels', correct: false, why: 'Das Kabel ist nicht Teil der Welle; die Polarisation ergibt sich aus der Strahlerlage.' },
      ],
    },
    {
      id: 'demo-wave', type: 'viz', viz: 'wave-lab', title: 'Die Welle in Schrägansicht',
      intro: String.raw`Die Welle läuft nach rechts. **Blau** ist das E-Feld, **grün** das H-Feld, links steht ein Dipol (Länge $\lambda/2$). Wähle eine Polarisation, schiebe die Frequenz und beobachte, wie sich $\lambda$, die Dipollänge und die Feldstärke im Abstand $d$ ändern. Mit der Zeitlupe kannst du die Phase verfolgen.`,
      params: { velocity: 0.95 },
      task: String.raw`Stelle **7,1 MHz** ein (Dipol ≈ 20 m), dann **145 MHz** ($\lambda/4\approx0{,}52$ m) und schalte einmal auf **zirkulare Polarisation** — der E-Vektor dreht sich.`,
      caption: 'E und H sind phasengleich und stehen senkrecht aufeinander. Je höher die Frequenz, desto kürzer λ — und desto kürzer die Antenne.',
    },
    {
      id: 'lambda', type: 'text', title: 'c = f · λ — und die Faustformel 300/f',
      md: String.raw`
In **einer Periode** $T=1/f$ legt die Welle genau eine Wellenlänge zurück:

$$ c=f\cdot\lambda \qquad\Rightarrow\qquad \lambda=\frac{c}{f}\qquad f=\frac{c}{\lambda} \qquad c\approx 3\cdot10^{8}\,\tfrac{\text{m}}{\text{s}} $$

Mit $f$ in MHz und $\lambda$ in m wird daraus die Rechenhilfe (die du im Prüfungsalltag brauchst):

$$ \lambda[\text{m}]\approx\frac{300}{f[\text{MHz}]} \qquad f[\text{MHz}]\approx\frac{300}{\lambda[\text{m}]} $$

*Merkregel: Frequenz in MHz mal Wellenlänge in m ist ≈ 300.* Beispiele:

- 1,84 MHz (160-m-Band): $\lambda=300/1{,}84\approx163$ m.
- 7,1 MHz ([40-m-Band](wiki:40-Meter-Band|40-meter band)): $\lambda\approx42{,}3$ m.
- 21 MHz: $\lambda\approx14{,}3$ m; 28,5 MHz: $10{,}5$ m.
- 145 MHz ([2-m-Band](wiki:2-Meter-Band|2-meter band)): $\lambda\approx2{,}07$ m.
- 10 GHz: $\lambda=30$ mm; 3 GHz: 10 cm.

Die Bandnamen sind die ungefähre Wellenlänge: 80-m-Band ≈ 3,75 MHz ($300/80$), 40 m ≈ 7 MHz, 20 m ≈ 14 MHz. Lange Wellen brauchen lange Antennen, aber **Kurzwelle** ([HF](wiki:Kurzwelle|High frequency), 3–30 MHz) kann dank der Ionosphäre die Welt umrunden.[^50ohm-lerninhalte]`,
    },
    {
      id: 'calc-160', type: 'numeric', title: 'Wellenlänge im 160-m-Band',
      question: String.raw`Welcher Wellenlänge entspricht die Frequenz $1{,}84\,\text{MHz}$ im Freiraum?`,
      answer: 163, tolerance: 1, unit: 'm',
      explain: String.raw`$\lambda=300/1{,}84\approx163$ m (EB311).`,
    },
    {
      id: 'calc-21', type: 'numeric', title: 'Wellenlänge bei 21 MHz',
      question: String.raw`Welche Wellenlänge hat $f=21\,\text{MHz}$ im Freiraum?`,
      answer: 14.29, tolerance: 0.1, unit: 'm',
      explain: String.raw`$\lambda=300/21=14{,}29$ m (EB312). Bei 28,5 MHz: $300/28{,}5=10{,}5$ m (EB313).`,
    },
    {
      id: 'calc-80', type: 'numeric', title: 'Frequenz zur Wellenlänge',
      question: String.raw`Welche Frequenz gehört zu einer Wellenlänge von $80{,}0\,\text{m}$ im Freiraum?`,
      answer: 3.75, tolerance: 0.02, unit: 'MHz',
      explain: String.raw`$f=300/80=3{,}75$ MHz (EB314) — das 80-m-Band liegt bei 3,5–3,8 MHz.`,
    },
    {
      id: 'dipol', type: 'text', title: 'Wie lang ist ein Dipol? Verkürzung 0,95',
      md: String.raw`
Die einfachste Antenne ist der [Dipol](wiki:Dipolantenne|Dipole antenna): zwei Stäbe, in der Mitte gespeist. Er schwingt in **Resonanz**, wenn seine Gesamtlänge etwa **eine halbe Wellenlänge** beträgt — dann pendeln Strom und Spannung auf dem Draht wie in einem Schwingkreis (Antennen verhalten sich bei $\lambda/2$ wie Reihenschwingkreise, siehe Lektion zum Schwingkreis). Der Fußpunktwiderstand beträgt dann etwa 75 Ω (EG207).

Wegen der **Endeffekte** (Drahtdicke, Isolatoren) muss der Draht etwa 5 % **kürzer** sein als die freie $\lambda/2$ — der „Verkürzungsfaktor“ **0,95** (EG202):

$$ L_\text{Dipol}\approx 0{,}95\cdot\frac{\lambda}{2}=0{,}95\cdot\frac{150}{f[\text{MHz}]}\,\text{m}=\frac{142{,}5}{f[\text{MHz}]}\,\text{m} $$

Beispiel 7,1 MHz: freie $\lambda/2=21{,}1$ m, Drahtlänge ca. **20,1 m**. Ein $\lambda/4$-Strahler (Vertikalantenne über Gegengewicht) ist halb so lang: auf 145 MHz freie $\lambda/4=0{,}517$ m; mit 0,95 sind es ca. 0,49 m. Mehr zu Dipol, Vertikalantenne, Gewinn und Richtwirkung findest du im Fach **Amateurfunk**.`,
    },
    {
      id: 'calc-dipol', type: 'numeric', title: 'Dipol für 7,1 MHz',
      question: String.raw`Wie lang ist ein Halbwellendipol im Freiraum für $f=7{,}1\,\text{MHz}$ (also ohne den Verkürzungsfaktor 0,95)?`,
      answer: 21.1, tolerance: 0.2, unit: 'm',
      explain: String.raw`$\lambda/2=150/7{,}1=21{,}13$ m. Mit dem Faktor 0,95: $0{,}95\cdot21{,}13=20{,}07$ m ≈ 20 m.`,
    },
    {
      id: 'feldstaerke', type: 'text', title: 'Feldstärke im Fernfeld',
      md: String.raw`
Die Antenne strahlt Leistung $P$ ab. Ein **Isotropstrahler** ([Kugelstrahler](wiki:Isotropstrahler|Isotropic radiator), Idealfall) verteilt sie gleichmäßig auf eine Kugelfläche $4\pi d^2$. Mit dem Feldwellenwiderstand $377\,\Omega$ ergibt sich die **Feldstärke** (Formelsammlung):

$$ E=\frac{\sqrt{30\,\Omega\cdot P\cdot G}}{d} $$

Dabei ist $G$ der [Antennengewinn](wiki:Antennengewinn|Gain (antenna)) als Faktor (nicht in dB) gegenüber dem Kugelstrahler; das Produkt $P\cdot G$ heißt **EIRP** (äquivalente isotrope Strahlungsleistung). Beispiel: 100 W EIRP in 10 m Abstand: $E=\sqrt{30\cdot100}/10=5{,}48$ V/m. Die Feldstärke fällt mit **$1/d$** (Leistungsdichte mit $1/d^2$).

Die Formel hat Konsequenzen für die **Sicherheit**: Aus den Grenzwerten für die Feldstärke ergibt sich ein **Sicherheitsabstand** zur Antenne (Personenschutz). Das behandelt das Fach Amateurfunk im Kapitel EMVU (z. B. EK108).`,
    },
    {
      id: 'calc-e', type: 'numeric', title: 'E-Feld im Abstand 10 m',
      question: String.raw`Eine Antenne strahlt eine äquivalente Leistung $P\cdot G=100\,\text{W}$ ab. Wie groß ist die elektrische Feldstärke in $d=10\,\text{m}$ Abstand im Fernfeld?`,
      answer: 5.48, tolerance: 0.05, unit: 'V/m',
      hint: String.raw`$E=\sqrt{30\,\Omega\cdot P\cdot G}/d$.`,
      explain: String.raw`$E=\sqrt{30\cdot100}/10=\sqrt{3000}/10=54{,}8/10=5{,}48$ V/m.`,
    },
    {
      id: 'calc-d', type: 'numeric', title: 'Abstand für 1 V/m',
      question: String.raw`In welchem Abstand (Fernfeld) ist die Feldstärke einer Antenne mit $P\cdot G=100\,\text{W}$ auf $1\,\text{V/m}$ abgefallen?`,
      answer: 54.8, tolerance: 0.5, unit: 'm',
      hint: String.raw`Formel nach $d$ umstellen: $d=\sqrt{30\,\Omega\cdot P\cdot G}/E$.`,
      explain: String.raw`$d=\sqrt{3000}/1=54{,}8$ m. Die Feldstärke ist umgekehrt proportional zum Abstand: Halbe Feldstärke bei doppeltem Abstand.`,
    },
    {
      id: 'match-pol', type: 'match', title: 'Polarisation und Antenne',
      prompt: 'Was gehört zusammen?',
      pairs: [
        ['Vertikalantenne', 'vertikale Polarisation'],
        ['Waagerechter Dipol', 'horizontale Polarisation'],
        ['Satellitenfunk (Helix)', 'zirkulare Polarisation'],
        ['E-Vektor', 'bestimmt die Polarisation'],
      ],
    },
    {
      id: 'warning-welle', type: 'callout', tone: 'warning', title: 'Typische Fehlvorstellungen',
      md: String.raw`
- „**E- und H-Feld sind im Fernfeld um 90° phasenverschoben.**“ — Nein: **phasengleich**; 90° gilt für den *räumlichen* Winkel (und im Nahfeld einer kleinen Antenne tatsächlich auch für die Phase).
- „**Die Polarisation ist die Richtung des Magnetfeldes.**“ — Nein: Richtung des **E-Vektors**.
- „**Ein elektromagnetisches Feld braucht ein Medium zur Ausbreitung.**“ — Nein: Funkwellen laufen auch im Vakuum (von der Sonde Voyager bis zum Mond).
- „**$\lambda=c/f$ gilt auch im Kabel.**“ — Im Dielektrikum läuft die Welle langsamer ($k_v$): $\lambda_\text{Leitung}=k_v\lambda_0$ (vorherige Lektion).`,
    },
    {
      id: 'deep-poynting', type: 'callout', tone: 'deep', title: 'Wohin fließt die Energie? Der Poynting-Vektor',
      md: String.raw`
Das Produkt $\vec S=\vec E\times\vec H$ (Einheit W/m²) zeigt in die Richtung, in die die Welle Energie trägt, und sein Betrag ist die **Leistungsdichte**. Im Fernfeld gilt $S=E^2/Z_{F0}=E^2/377\,\Omega$. Aus $S=P_\text{EIRP}/(4\pi d^2)$ folgt dann sofort die Feldstärkeformel oben: $E=\sqrt{377\cdot P_\text{EIRP}/(4\pi)}/d=\sqrt{30\,\Omega\cdot P_\text{EIRP}}/d$ — die „30“ in der Formelsammlung ist also $377/(4\pi)\approx30\,\Omega$. (Dasselbe Prinzip erklärt auch, warum man in der Elektrotechnik sagt, dass die Energie im Kabel *im Feld zwischen den Leitern* fließt, nicht im Draht.)`,
    },
    {
      id: 'mission-welle', type: 'callout', tone: 'mission', title: 'Prüfung & Funkpraxis',
      md: String.raw`
- **Prüfungsbezug:** Feldentstehung durch zeitlich veränderlichen Strom (EB301); Ausbreitung durch Wechselwirkung E/H (EB302); Winkel zwischen E und H = 90° (EB303); E, H und Ausbreitungsrichtung rechtwinklig (EB304); Polarisation = E-Vektor (EB305, EG222); Polarisation aus der Momentaufnahme erkennen (EB306 bis EB308) und für Richtantennen (EB309, EB310); Wellenlängen berechnen (EB311 bis EB316), z. B. $f\leftrightarrow\lambda$ bei 1,84 MHz, 21 MHz, 28,5 MHz, 80 m, 30 mm, 10 cm; Verkürzungsfaktor 95 % (EG202). Klasse N: Einheit Meter (NA205), 144 MHz ↔ 2,08 m (NB302), 433,5 MHz ↔ 0,69 m (NB303), Polarisationsarten (NB304).
- **Praxis:** Antenne und Gegenstation sollten dieselbe Polarisation haben (FM-Relais: vertikal; SSB auf KW über Dipol: horizontal; Satellit: zirkular). Beim Dipolbau 5 % kürzer zuschneiden und dann **messen** (SWR-Minimum) und kürzen oder verlängern.
- **Rechentipp:** Zum Taschenrechner: „$300/f$“ im Kopf — Ergebnisse für den Dipol: $142{,}5/f$ (mit 0,95) bzw. $150/f$ (frei); $\lambda/4$-Strahler: $75/f$ bzw. $71{,}25/f$.`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: String.raw`
<table><tr><th>Deutsch</th><th>English</th><th>Notation</th></tr>
<tr><td>Elektromagnetische Welle</td><td>electromagnetic wave</td><td></td></tr>
<tr><td>Wellenlänge</td><td>wavelength</td><td>$\lambda$ in m</td></tr>
<tr><td>Lichtgeschwindigkeit</td><td>speed of light</td><td>$c\approx3\cdot10^8$ m/s</td></tr>
<tr><td>Polarisation (horizontal / vertikal / zirkular)</td><td>polarization (horizontal / vertical / circular)</td><td></td></tr>
<tr><td>Fernfeld / Nahfeld</td><td>far field / near field</td><td></td></tr>
<tr><td>Halbwellendipol</td><td>half-wave dipole</td><td>$\lambda/2$</td></tr>
<tr><td>Kugelstrahler / Isotropstrahler</td><td>isotropic radiator</td><td></td></tr>
<tr><td>Antennengewinn, EIRP</td><td>antenna gain, EIRP</td><td>$G$, $P\cdot G$</td></tr>
<tr><td>Feldstärke</td><td>field strength</td><td>$E$ in V/m</td></tr></table>`,
    },
    {
      id: 'recall-lambda', type: 'recall', title: 'Erkläre es mit eigenen Worten',
      prompt: 'Wie hängen Frequenz, Wellenlänge und Lichtgeschwindigkeit zusammen? Wie lang ist ein Halbwellendipol für das 40-m-Band (7,1 MHz) ungefähr, und warum baut man ihn etwas kürzer als $\\lambda/2$?',
      answer: '$c=f\\cdot\\lambda$ — in einer Periode läuft die Welle eine Wellenlänge. Als Faustformel $\\lambda[\\text{m}]\\approx300/f[\\text{MHz}]$. Bei 7,1 MHz ist $\\lambda=42{,}3$ m, die freie $\\lambda/2$ also $21{,}1$ m; mit dem Verkürzungsfaktor 0,95 (Endeffekte, Drahtdicke) etwa 20 m.',
      hints: ['Wie weit kommt die Welle in einer Periode?', 'Wie viel kürzer ist ein Dipol wegen der Endeffekte?'],
      cards: ['c-f-lambda', 'lambda-300'],
    },
  ],
  cards: [
    { id: 'c-f-lambda', front: 'Wie hängen $c$, $f$ und $\\lambda$ zusammen?', back: '$c=f\\cdot\\lambda$, also $\\lambda=c/f$ mit $c\\approx3\\cdot10^8$ m/s.' },
    { id: 'lambda-300', front: 'Faustformel für die Wellenlänge?', back: '$\\lambda[\\text{m}]\\approx300/f[\\text{MHz}]$ (z. B. 7,1 MHz → 42,3 m; 145 MHz → 2,07 m).' },
    { id: 'feld-entstehung', front: 'Wodurch entsteht ein elektromagnetisches Feld?', back: 'Durch einen zeitlich veränderlichen Strom in einem Leiter (Wechselstrom/HF).' },
    { id: 'e-h-s', front: 'Lage von E, H und Ausbreitung im Fernfeld?', back: 'Alle drei stehen paarweise rechtwinklig: $\\vec E\\perp\\vec H\\perp\\vec S$; E und H sind phasengleich.' },
    { id: 'polarisation-def', front: 'Was bestimmt die Polarisation?', back: 'Die Richtung des elektrischen Feldes (E-Vektor): horizontal, vertikal oder zirkular.' },
    { id: 'dipol-laenge', front: 'Länge eines Halbwellendipols (mit Verkürzung)?', back: '$L\\approx0{,}95\\cdot\\lambda/2=142{,}5/f[\\text{MHz}]$ m. Bei 7,1 MHz: ca. 20 m.' },
    { id: 'viertel', front: 'Länge eines $\\lambda/4$-Strahlers auf 145 MHz?', back: 'Freie $\\lambda/4=0{,}517$ m; mit 0,95 etwa 0,49 m.' },
    { id: 'feld-formel', front: 'Feldstärke im Fernfeld?', back: '$E=\\dfrac{\\sqrt{30\\,\\Omega\\cdot P\\cdot G}}{d}$; $P\\cdot G$ = EIRP. 100 W in 10 m: 5,48 V/m.' },
    { id: 'z-f0', front: 'Feldwellenwiderstand des freien Raums?', back: '$E/H=377\\,\\Omega=120\\pi\\,\\Omega$.' },
    { id: 'poynting', front: 'Poynting-Vektor?', back: '$\\vec S=\\vec E\\times\\vec H$: Richtung und Größe (W/m²) des Energietransports der Welle.' },
    { id: 'kreuzpol', front: 'Was passiert bei Kreuzpolarisation (Sender vertikal, Empfänger horizontal)?', back: 'Das Signal wird um einige 10 dB schwächer — Polarisation von Sende- und Empfangsantenne sollen übereinstimmen.' },
  ],
};
