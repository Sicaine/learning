export default {
  id: 'zeiger-impedanz',
  title: 'Zeigerdiagramm und Impedanz („komplexe Rechnung light")',
  summary: 'Spannungen und Ströme als rotierende Pfeile addieren: $Z=\\sqrt{R^2+X^2}$, $\\varphi=\\arctan(X/R)$, Reihen- und Parallelschaltung — mit $\\mathrm j$ nur als Schreibweise.',
  minutes: 35,
  needs: ['blindwiderstand'],
  goals: [
    'Ein [[zeigerdiagramm|Zeigerdiagramm]] für eine Reihenschaltung aus R, L und C zeichnen (Strom als Bezug)',
    'Die [[impedanz|Impedanz]] $Z=\\sqrt{R^2+X^2}$ und den Phasenwinkel $\\varphi=\\arctan(X/R)$ berechnen',
    'Spannungen an R, L und C **geometrisch** addieren und erklären, warum $U_L$ und $U_C$ größer als die Quellspannung sein können',
    'Die komplexe Schreibweise $\\underline Z=R+\\mathrm jX$ lesen — ohne Gleichungssysteme zu lösen',
    'Den Betrag der Impedanz einer Parallelschaltung über die Leitwerte bestimmen',
  ],
  blocks: [
    {
      id: 'intuition', type: 'text', title: 'Pfeile statt Wellen',
      md: String.raw`
Eine Sinusspannung ist in Wahrheit ein **Pfeil**, der sich mit konstanter Winkelgeschwindigkeit $\omega$ dreht: Die Höhe der Pfeilspitze über der Waagerechten ist der Augenblickswert. Alle Spannungen und Ströme in einem Wechselstromkreis haben **dieselbe Frequenz** und drehen daher gleich schnell — nur Länge (Amplitude) und Winkel zueinander (Phase) unterscheiden sich. Deshalb kann man die Drehung „einfrieren" und mit **ruhenden Pfeilen** rechnen: den [[zeigerdiagramm|Zeigern]] ([Zeigerdiagramm](wiki:Zeigerdiagramm|Phasor diagram)).

Die Regeln sind einfach, wenn du den **Strom als Bezug** nimmst (waagerecht nach rechts) — in der Reihenschaltung fließt durch alle Bauteile derselbe Strom:

- am **Widerstand**: $U_R$ liegt **in Phase** mit $I$ (gleiche Richtung): $U_R = I\,R$
- an der **Spule**: $U_L$ **eilt dem Strom um 90° voraus** (Zeiger nach oben): $U_L = I\,X_L$
- am **Kondensator**: $U_C$ **eilt dem Strom um 90° nach** (Zeiger nach unten): $U_C = I\,X_C$

(Das ist genau die Phasenlage aus der letzten Lektion — nur aus der Sicht der Spannung: Bei L eilt der Strom nach, also die Spannung vor.) Die Gesamtspannung ist die **Vektorsumme** — Pfeile hintereinander gelegt.[^wp-zeigerdiagramm]`,
    },
    {
      id: 'pythagoras', type: 'text', title: 'Pythagoras statt Addition',
      md: String.raw`
Bei R und L in Reihe stehen $U_R$ (waagerecht) und $U_L$ (senkrecht) im rechten Winkel — die Gesamtspannung ist die Hypotenuse. Mit [Pythagoras](wiki:Satz des Pythagoras|Pythagorean theorem):

$$ U = \sqrt{U_R^2 + U_L^2} \qquad\text{nicht}\qquad U_R + U_L $$

Teilst du alle Spannungen durch den Strom $I$, entsteht das **Widerstandsdreieck** mit den Katheten $R$ und $X$ und der Hypotenuse $Z$, dem Scheinwiderstand oder [[impedanz|Impedanz]] ([Impedanz](wiki:Impedanz|Electrical impedance)):

$$ Z = \sqrt{R^2 + X^2} \qquad X = X_L - X_C \qquad \tan\varphi = \frac{X}{R} \;\Rightarrow\; \varphi = \arctan\frac{X}{R} $$

Bei R-L-C in Reihe zeigen $U_L$ nach oben und $U_C$ nach unten — sie wirken **gegeneinander**, es zählt nur die Differenz $X = X_L - X_C$. Ist $X>0$, ist die Schaltung **induktiv** ($\varphi>0$: Spannung eilt vor), ist $X<0$, **kapazitiv**. Bei $X=0$ ist sie rein ohmsch ($\varphi=0$, **Resonanz**). Der Strom folgt dann aus $I = U/Z$ (alles mit Effektivwerten). Das ist das [Ohmsche Gesetz](wiki:Ohmsches Gesetz|Ohm's law) für Wechselstrom.`,
    },
    {
      id: 'calc-z', type: 'numeric', title: 'Impedanz und Strom',
      question: String.raw`Eine Reihenschaltung hat $R = 300\,\Omega$ und $X = 400\,\Omega$ (induktiv). Wie groß ist $|Z|$, in Ω?`,
      answer: 500, tolerance: 2, unit: 'Ω',
      explain: String.raw`$Z=\sqrt{300^2+400^2}=\sqrt{250\,000}=500\,\Omega$ (das berühmte 3-4-5-Dreieck). Bei 10 V fließen $I=10/500=20$ mA.`,
    },
    {
      id: 'calc-phi', type: 'numeric', title: 'Phasenwinkel',
      question: String.raw`Für dieselbe Schaltung ($R = 300\,\Omega$, $X = 400\,\Omega$): Wie groß ist der Phasenwinkel $\varphi$, in Grad?`,
      answer: 53.1, tolerance: 0.3, unit: '°',
      hint: String.raw`$\varphi=\arctan(X/R)=\arctan(1{,}333)$ — am Taschenrechner „tan⁻¹".`,
      explain: String.raw`$\varphi=\arctan(400/300)=\arctan1{,}333=53{,}13^\circ$. Positiv, weil induktiv: Die Spannung eilt dem Strom um 53° voraus.`,
    },
    {
      id: 'calc-rlc', type: 'numeric', title: 'R, L und C in Reihe',
      question: String.raw`In Reihe liegen $R = 50\,\Omega$, $X_L = 200\,\Omega$ und $X_C = 120\,\Omega$. Wie groß ist die Impedanz $|Z|$, in Ω?`,
      answer: 94.3, tolerance: 0.5, unit: 'Ω',
      hint: String.raw`Erst $X=X_L-X_C$, dann Pythagoras mit $R$.`,
      explain: String.raw`$X=200-120=80\,\Omega$ (induktiv), $Z=\sqrt{50^2+80^2}=\sqrt{8900}=94{,}3\,\Omega$, $\varphi=\arctan(80/50)=58{,}0^\circ$.`,
    },
    {
      id: 'quiz-ur-ul', type: 'quiz', title: 'U_R und U_L in Reihe',
      question: String.raw`In einer Reihenschaltung aus $R$ und $L$ misst du $U_R = 6\,\text{V}$ und $U_L = 8\,\text{V}$. Wie groß ist die Gesamtspannung?`,
      options: [
        { text: '10 V', correct: true, why: '$\\sqrt{6^2+8^2}=\\sqrt{100}=10$ V — die Spannungen stehen im Zeigerdiagramm senkrecht aufeinander.' },
        { text: '14 V', correct: false, why: 'Das wäre die arithmetische Summe. Die Spannungen haben 90° Phasenunterschied, sie erreichen ihre Maxima nie gleichzeitig.' },
        { text: '2 V', correct: false, why: 'Die Differenz gilt nur für Spannungen, die um 180° verschoben sind (U_L gegen U_C), nicht für R und L.' },
        { text: '7 V', correct: false, why: 'Der Mittelwert hat hier keine Bedeutung.' },
      ],
    },
    {
      id: 'viz-phasor', type: 'viz', viz: 'phasor-lab', title: 'Zeigerlabor',
      intro: String.raw`Wähle **R + L**, **R + C** oder **R + L + C** und schalte zwischen Reihen- und Parallelschaltung um. Stelle $R$, $L$, $C$ und $f$ ein: Das Diagramm zeigt die Zeiger $U_R$, $U_L$, $U_C$ und $U_\text{ges}$ (bzw. die Ströme bei der Parallelschaltung), die Impedanz $Z$ mit Phasenwinkel $\varphi$ und den zeitlichen Verlauf von $u(t)$ und $i(t)$.`,
      params: { mode: 'series', use: 'RLC', U: 10, R: 100, L: 10e-3, C: 1e-6, f: 1000 },
      task: String.raw`Stelle zuerst **$\varphi = +45^\circ$** ein (±3°) — das geht mit dem Preset *R + L* bei $X_L = R$. Finde dann mit **R + L + C** die Frequenz, bei der $\varphi = 0^\circ$ wird (Resonanz).`,
      caption: 'Bei Resonanz heben sich U_L und U_C auf — beide können dabei viel größer sein als die Quellspannung.',
    },
    {
      id: 'order-zeichnen', type: 'order', title: 'Zeigerdiagramm Schritt für Schritt',
      prompt: 'In welcher Reihenfolge zeichnest du das Zeigerdiagramm einer R-L-C-Reihenschaltung?',
      items: [
        'Strom $I$ als waagerechten Bezugszeiger zeichnen',
        '$U_R = I\\cdot R$ in Richtung von $I$ (gleiche Phase) antragen',
        '$U_L = I\\cdot X_L$ um 90° nach oben (voreilend) anhängen',
        '$U_C = I\\cdot X_C$ um 90° nach unten (nacheilend) anhängen',
        'Vom Anfang zur Spitze der Kette den Summenzeiger $U_\\text{ges}$ ziehen und $\\varphi$ ablesen',
      ],
      explain: 'Immer mit der gemeinsamen Größe beginnen — in der Reihenschaltung ist das der Strom. Bei Parallelschaltung nimmt man umgekehrt die gemeinsame Spannung als Bezug und addiert die Ströme.',
    },
    {
      id: 'komplex', type: 'text', title: 'Die komplexe Schreibweise (nur lesen, nicht rechnen müssen)',
      md: String.raw`
Zeiger lassen sich mit einer Kurzschrift aufschreiben: Man legt die Zeichenebene als [komplexe Zahlenebene](wiki:Komplexe Zahl|Complex number) fest — waagerecht die **reelle** Achse, senkrecht die **imaginäre**. Die Einheit der senkrechten Achse heißt $\mathrm j$ (in der Elektrotechnik, weil $i$ schon der Strom ist), mit $\mathrm j^2=-1$. Eine Multiplikation mit $\mathrm j$ dreht einen Zeiger um 90° nach oben. Damit gilt für die [[impedanz|Impedanz]] als Zeiger:

$$ \underline Z = R + \mathrm jX \qquad |\underline Z| = \sqrt{R^2+X^2} \qquad \varphi = \arctan\frac{X}{R} $$

Für die Bauteile einzeln: $\underline Z_R = R$, $\underline Z_L = \mathrm j\omega L = \mathrm jX_L$, $\underline Z_C = \dfrac{1}{\mathrm j\omega C} = -\mathrm jX_C$. Ein „$\mathrm j$" heißt also schlicht „90° gedreht". Der Strich unter $\underline Z$ kennzeichnet eine komplexe Größe. [Steinmetz](wiki:Charles Proteus Steinmetz|Charles Proteus Steinmetz) führte diese Methode ab 1893 in die Wechselstromtechnik ein. Für die Prüfung der Klasse E brauchst du die Pythagoras-Version; die komplexe Schreibweise ist für später (Klasse A, Studium).`,
    },
    {
      id: 'parallel', type: 'text', title: 'Parallelschaltung: über den Leitwert',
      md: String.raw`
Bei **Parallelschaltung** liegt an allen Zweigen dieselbe Spannung; man addiert die **Ströme** als Zeiger. Dabei ist der Zweig mit $R$ in Phase mit der Spannung, ein Zweig mit $X_C$ eilt **voraus**, einer mit $X_L$ eilt **nach**. Die Ströme sind $I_R = U/R$ und $I_X = U/X$, die Gesamtstrom-Länge also $I = \sqrt{I_R^2 + I_X^2}$. Teilst du durch $U$, erhältst du die Leitwerte ([[admittanz|Admittanz]], [Admittanz](wiki:Admittanz|Admittance)):

$$ \frac{1}{Z} = \sqrt{\frac{1}{R^2}+\frac{1}{X^2}} \qquad\Longleftrightarrow\qquad Z=\frac{R\,X}{\sqrt{R^2+X^2}} $$

(gilt für **einen** Wirkwiderstand parallel zu **einem** Blindwiderstand). Beispiel $R=X_C=100\,\Omega$: $1/Z=\sqrt{2}/100$, also $Z = 70{,}7\,\Omega$ — nicht 50 Ω, wie es bei zwei gleichen Wirkwiderständen wäre.`,
    },
    {
      id: 'calc-par', type: 'numeric', title: 'R parallel zu X_C',
      question: String.raw`$R=100\,\Omega$ liegt parallel zu $X_C=100\,\Omega$. Wie groß ist der Betrag der Impedanz, in Ω?`,
      answer: 70.7, tolerance: 0.5, unit: 'Ω',
      hint: String.raw`$1/Z^2=1/R^2+1/X^2$.`,
      explain: String.raw`$1/Z^2=1/100^2+1/100^2=2\cdot10^{-4}$ ⇒ $Z=\sqrt{5000}=70{,}7\,\Omega$.`,
    },
    {
      id: 'calc-ueberhoehung', type: 'numeric', title: 'Spannungen größer als die Quelle',
      question: String.raw`Eine Reihenschaltung mit $R=10\,\Omega$, $X_L=100\,\Omega$ und $X_C=100\,\Omega$ wird mit $U=5\,\text{V}$ gespeist. Welche Spannung liegt an der Spule, in V?`,
      answer: 50, tolerance: 0.5, unit: 'V',
      hint: String.raw`Bei $X_L=X_C$ ist $X=0$ und $Z=R$.`,
      explain: String.raw`$Z=R=10\,\Omega$, $I=5/10=0{,}5$ A, $U_L=I\,X_L=0{,}5\cdot100=50$ V — das Zehnfache der Quelle! $U_C$ ist ebenso groß, aber entgegengesetzt, sodass sich beide aufheben. Das ist der Resonanzfall, den du in der Schwingkreis-Lektion wiedersiehst.`,
    },
    {
      id: 'warning-addieren', type: 'callout', tone: 'warning', title: 'Vorsicht: Nicht einfach addieren',
      md: String.raw`
- **R und X dürfen nicht addiert werden:** $R=3\,\Omega$ und $X_L=4\,\Omega$ in Reihe sind $Z=5\,\Omega$, nicht 7 Ω — Wirk- und Blindwiderstand stehen 90° zueinander.
- **U_L und U_C wirken entgegengesetzt:** Sie *subtrahieren* sich, deshalb kann $X = X_L - X_C$ auch negativ (kapazitiv) sein.
- **Teilspannungen dürfen die Quellspannung übertreffen:** kein Fehler, sondern Blindleistungspendeln — die Zeiger addieren sich geometrisch.
- **Die Winkelangabe braucht ein Vorzeichen:** $\varphi>0$ induktiv (Strom eilt nach), $\varphi<0$ kapazitiv (Strom eilt vor).`,
    },
    {
      id: 'video-komplex', type: 'video', youtube: 'TaSdEINepBA', label: 'Blindwiderstände für Eilige – wie mit komplexen Größen rechnen?', channel: 'Bestehe Deine nächste Klausur!', minutes: 8,
      why: 'Vertiefung zur komplexen Schreibweise; für die Klasse-E-Prüfung nicht nötig, aber hilfreich, wenn dich das „j" neugierig macht.',
    },
    {
      id: 'mission', type: 'callout', tone: 'mission', title: 'Prüfung & Funkpraxis',
      md: String.raw`
- **Prüfungsbezug:** Die Klasse-E-Prüfung verlangt kein Rechnen mit komplexen Zahlen, aber das Verständnis, *dass* Blind- und Wirkwiderstände sich nicht einfach addieren — z. B. bei Antennen-Impedanzmessungen mit dem [Netzwerkanalysator](wiki:Netzwerkanalysator|Network analyzer (electrical)) (EI203: „Impedanzen, Blindwiderstände und Stehwellenverhältnisse") und bei Resonanzfragen (ED205–ED207).
- **Praxis:** Eine Antenne hat am Speisepunkt eine Impedanz $Z=R+\mathrm jX$. Unterhalb der Resonanz ist sie kapazitiv ($X<0$), oberhalb induktiv ($X>0$) — der Netzwerkanalysator zeigt $R$ und $X$ an, und die Frequenz mit $X=0$ ist die Resonanzfrequenz.
- **Merkhilfe:** „R und X stehen im rechten Winkel — Pythagoras!"`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: String.raw`
<table><tr><th>Deutsch</th><th>English</th><th>Notation</th></tr>
<tr><td>Zeiger, Zeigerdiagramm</td><td>phasor, phasor diagram</td><td></td></tr>
<tr><td>Impedanz, Scheinwiderstand</td><td>impedance</td><td>$Z$, $\underline Z=R+\mathrm jX$</td></tr>
<tr><td>Wirkwiderstand</td><td>resistance</td><td>$R$</td></tr>
<tr><td>Blindwiderstand</td><td>reactance</td><td>$X=X_L-X_C$</td></tr>
<tr><td>Leitwert, Admittanz</td><td>conductance, admittance</td><td>$G$, $Y$</td></tr>
<tr><td>induktiv / kapazitiv</td><td>inductive / capacitive</td><td></td></tr>
<tr><td>Phasenwinkel</td><td>phase angle</td><td>$\varphi=\arctan(X/R)$</td></tr>
<tr><td>imaginäre Einheit</td><td>imaginary unit</td><td>$\mathrm j$ (Mathematik: $i$)</td></tr></table>`,
    },
    {
      id: 'recall-geometrisch', type: 'recall', title: 'Erkläre es mit eigenen Worten',
      prompt: 'Warum addiert man $U_R$ und $U_L$ in einer Reihenschaltung **nicht** arithmetisch? Wie rechnest du stattdessen?',
      answer: 'Weil $U_R$ und $U_L$ um 90° gegeneinander phasenverschoben sind: Sie erreichen ihre Höchstwerte nie gleichzeitig, deshalb ist die Summe kleiner als die Summe der Beträge. Im Zeigerdiagramm stehen sie senkrecht aufeinander, also bildet man die Hypotenuse: $U=\\sqrt{U_R^2+U_L^2}$. Teilt man durch den Strom, entsteht das Widerstandsdreieck mit $Z=\\sqrt{R^2+X^2}$ und $\\varphi=\\arctan(X/R)$.',
      hints: ['Wie liegen die Zeiger von $U_R$ und $U_L$ zueinander?'],
      cards: ['z-formel', 'phi-formel'],
    },
  ],
  cards: [
    { id: 'z-formel', front: 'Impedanz einer Reihenschaltung aus R und X?', back: '$Z=\\sqrt{R^2+X^2}$ mit $X=X_L-X_C$.' },
    { id: 'phi-formel', front: 'Phasenwinkel der Reihenschaltung?', back: '$\\tan\\varphi = X/R$, also $\\varphi=\\arctan(X/R)$ ($>0$ induktiv, $<0$ kapazitiv).' },
    { id: 'u-rl-reihe', front: 'Gesamtspannung bei R und L in Reihe?', back: '$U=\\sqrt{U_R^2+U_L^2}$ (6 V und 8 V → 10 V), nicht die Summe!' },
    { id: 'zeiger-phase', front: 'Phasenlage der Spannungen gegen den Strom (Zeigerdiagramm Reihenschaltung)?', back: '$U_R$ in Phase, $U_L$ +90° (eilt vor), $U_C$ −90° (eilt nach).' },
    { id: 'x-differenz', front: 'Gesamtblindwiderstand bei R-L-C in Reihe?', back: '$X=X_L-X_C$ — $X_L$ und $X_C$ wirken entgegengesetzt.' },
    { id: 'j-def', front: 'Was ist $\\mathrm j$ in der Elektrotechnik?', back: 'Imaginäre Einheit mit $\\mathrm j^2=-1$; Multiplikation mit $\\mathrm j$ = Zeiger um 90° nach oben drehen.' },
    { id: 'z-komplex', front: 'Komplexe Impedanz von Spule und Kondensator?', back: '$\\underline Z_L=\\mathrm j\\omega L$, $\\underline Z_C=1/(\\mathrm j\\omega C)=-\\mathrm j/(\\omega C)$; Reihe: $\\underline Z=R+\\mathrm jX$.' },
    { id: 'z-parallel', front: 'Betrag der Impedanz bei R parallel zu X?', back: '$1/Z=\\sqrt{1/R^2+1/X^2}$ (Leitwerte als Zeiger addieren). $R=X=100\\,\\Omega$ → $70{,}7\\,\\Omega$.' },
    { id: 'z-345', front: '$R=300\\,\\Omega$, $X_L=400\\,\\Omega$ in Reihe: $Z$, $\\varphi$?', back: '$Z=500\\,\\Omega$, $\\varphi=53{,}1^\\circ$ (induktiv).' },
    { id: 'ul-uc-gross', front: 'Dürfen $U_L$ und $U_C$ größer sein als die Quellspannung?', back: 'Ja (z. B. Resonanz im Reihenkreis): Die Zeiger addieren sich geometrisch; $U_L$ und $U_C$ heben sich auf.' },
    { id: 'bezug', front: 'Welche Größe ist Bezug im Zeigerdiagramm bei Reihen- bzw. Parallelschaltung?', back: 'Reihe: der Strom (gemeinsam). Parallel: die Spannung (gemeinsam).' },
  ],
};
