export default {
  id: 'schaltregler',
  title: 'Schaltnetzteil, Tief- und Hochsetzsteller',
  summary: 'Ein Schaltregler zerhackt die Eingangsspannung mit hoher Frequenz und glättet sie mit Spule und Kondensator. Du rechnest Tastverhältnis, Spulenstrom-Welligkeit und Wirkungsgrad und verstehst, warum Schaltnetzteile effizient sind, aber den Funkempfang stören können.',
  minutes: 30,
  needs: ['linearregler', 'spule-rl-glied'],
  goals: [
    'Das Prinzip des [[schaltnetzteil|Schaltreglers]] mit Schalter, Spule, Diode und Kondensator erklären',
    'Beim [[abwaertswandler|Tiefsetzsteller]] das [[tastverhaeltnis|Tastverhältnis]] aus $U_\\text{aus}=D\\cdot U_\\text{ein}$ bestimmen',
    'Die Welligkeit des Spulenstroms $\\Delta I$ und den [[wirkungsgrad|Wirkungsgrad]] berechnen',
    'Erklären, warum ein [[aufwaertswandler|Hochsetzsteller]] die Spannung erhöhen kann',
    'Vor- und Nachteile gegenüber dem Linearregler benennen (Prüfungsstoff)',
  ],
  blocks: [
    {
      id: 'idee', type: 'text', title: 'Nicht verheizen, sondern portionieren',
      md: `
Der Linearregler der letzten Lektion verwandelt überschüssige Spannung in Wärme. Der **Schaltregler** (Schaltnetzteil, [Schaltnetzteil](wiki:Schaltnetzteil|Switched-mode power supply)) geht anders vor: Ein Schalter lässt Energie nur in Portionen durch, und Spule und Kondensator mitteln diese Portionen zu einer glatten Spannung.[^wp-schaltnetzteil]

Stell dir vor, du füllst einen Eimer mit einem Schlauch, aber nur der Hahn kann ganz auf oder ganz zu. Öffnest du ihn die halbe Zeit, kommt im Mittel die halbe Wassermenge an – und am Hahn selbst geht fast nichts verloren, denn ein ganz offener Hahn bremst nicht (kein Druckabfall), ein zu Hahn lässt nichts durch (kein Durchfluss). Genau so arbeitet ein **[[mosfet|MOSFET]] als Schalter**: Er ist entweder fast ein Kurzschluss ($R_\\text{DS(on)}$ klein) oder fast eine Unterbrechung; in beiden Fällen ist das Produkt $U\\cdot I$ am Schalter klein. Verlust entsteht nur in den kurzen Schaltflanken und im Restwiderstand – der [Wirkungsgrad](wiki:Wirkungsgrad|Energy conversion efficiency) liegt typisch über 85 %.

Das Verhältnis aus Einschaltzeit zu Periodendauer heißt **[[tastverhaeltnis|Tastverhältnis]]** (engl. duty cycle):

$$D = \\frac{t_\\text{ein}}{T}\\qquad T = \\frac1{f_s}$$

Die Technik, über $D$ die mittlere Ausgangsgröße zu steuern, heißt [Pulsweitenmodulation](wiki:Pulsweitenmodulation|Pulse-width modulation) (PWM). Die Schaltfrequenz $f_s$ liegt meist zwischen etwa 20 kHz und 1 MHz – so hoch, dass die Bauteile klein ausfallen dürfen: Je höher $f_s$, desto weniger Induktivität und Kapazität sind für gleiche Welligkeit nötig.`,
    },
    {
      id: 'buck-schaltung', type: 'figure', title: 'Tiefsetzsteller (Buck)',
      html: `<svg viewBox="0 0 440 235" role="img" aria-label="Tiefsetzsteller: Schalter, Freilaufdiode, Spule, Kondensator, Last" style="width:100%;max-width:560px;height:auto;color:var(--ink)">
<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M20 40 H60"/><path d="M60 40 L98 24"/><path d="M108 40 H160"/><path d="M160 40 q10 -18 20 0 q10 -18 20 0 q10 -18 20 0 q10 -18 20 0 q10 -18 20 0"/><path d="M260 40 H400"/>
<path d="M160 40 V112"/><path d="M150 112 H170"/><path d="M150 135 H170 L160 112 Z"/><path d="M160 135 V215"/>
<path d="M320 40 V90"/><path d="M304 90 H336"/><path d="M304 100 H336"/><path d="M320 100 V215"/>
<path d="M400 40 V90"/><rect x="392" y="90" width="16" height="60"/><path d="M400 150 V215"/><path d="M20 215 H410"/>
</g>
<circle cx="60" cy="40" r="3" fill="currentColor"/><circle cx="108" cy="40" r="3" fill="currentColor"/><circle cx="160" cy="40" r="3" fill="currentColor"/><circle cx="320" cy="40" r="3" fill="currentColor"/>
<g font-size="13" fill="currentColor" font-family="sans-serif">
<text x="22" y="32">U_ein</text><text x="72" y="22">S</text><text x="176" y="140">D</text><text x="218" y="22">L</text><text x="338" y="100">C</text><text x="414" y="124">Last</text><text x="352" y="32">U_aus</text><text x="170" y="86">Freilauf</text><text x="22" y="208">Masse</text>
</g>
</svg>`,
      caption: 'Ist der Schalter S zu, steigt der Spulenstrom und lädt L (Energie $\\tfrac12LI^2$). Öffnet S, treibt die Spule den Strom über die Freilaufdiode D weiter. Der Kondensator C glättet die Ausgangsspannung.',
    },
    {
      id: 'buck-rechnen', type: 'text', title: 'Wie der Tiefsetzsteller rechnet',
      md: `
**Phase 1 (S geschlossen, Dauer $DT$):** An der Spule liegt $U_\\text{ein}-U_\\text{aus}$, der Spulenstrom steigt linear mit der Steigung $(U_\\text{ein}-U_\\text{aus})/L$. **Phase 2 (S offen, Dauer $(1-D)T$):** Die Spule sperrt sich gegen die Stromänderung ([[induktivitaet|Induktion]]), die Spannung an ihr kehrt sich um, die Diode leitet, und es liegt $-U_\\text{aus}$ an L: der Strom fällt wieder.

Im eingeschwungenen Zustand muss der Strom am Ende der Periode so groß sein wie am Anfang – der Anstieg in Phase 1 und der Abfall in Phase 2 müssen sich genau aufheben:

$$(U_\\text{ein}-U_\\text{aus})\\,DT = U_\\text{aus}\\,(1-D)T \\;\\Rightarrow\\; U_\\text{aus} = D\\cdot U_\\text{ein}$$

Die Spule beruht auf der [Selbstinduktion](wiki:Selbstinduktion|Inductance). Das ist die zentrale Formel des [Tiefsetzstellers](wiki:Abwärtswandler|Buck converter): Der Mittelwert der zerhackten Spannung. Je nach $D$ zwischen 0 und 1 liegt $U_\\text{aus}$ also immer **unter** $U_\\text{ein}$. Die Welligkeit des Spulenstroms ist

$$\\Delta I_L = \\frac{(U_\\text{ein}-U_\\text{aus})\\cdot D}{L\\cdot f_s}$$

Mehr Induktivität oder eine höhere Schaltfrequenz glätten den Strom. Die [Restwelligkeit](wiki:Restwelligkeit|Ripple (electrical)) der Ausgangsspannung bestimmt dann der Kondensator – wie beim Netzteil, nur bei $f_s$ statt 100 Hz.`,
    },
    {
      id: 'boost', type: 'text', title: 'Spannungen auch erhöhen: der Hochsetzsteller',
      md: `
Stellt man die Bauteile um – Spule in Reihe zum Eingang, Schalter nach Masse, Diode zum Ausgang –, entsteht der **[Hochsetzsteller](wiki:Aufwärtswandler|Boost converter)**. Ist der Schalter zu, lädt sich die Spule aus der Quelle auf (Energie $\\tfrac12LI^2$). Öffnet er, steht die Spule „unter Strom" und zwingt ihn durch die Diode in den Ausgangskondensator – die Spannung an ihr addiert sich zur Eingangsspannung. Ergebnis:

$$U_\\text{aus} = \\frac{U_\\text{ein}}{1-D}$$

Die Spule ist ein **Energiespeicher**: Sie nimmt Energie bei niedriger Spannung auf und gibt sie bei höherer wieder ab (die Leistung bleibt – abgesehen von Verlusten – gleich, der Eingangsstrom wird größer). Ein [Linearregler](wiki:Spannungsregler|Voltage regulator) kann das nicht, denn er kann nur Spannung „wegnehmen". Deshalb liefert ein Schaltregler sogar 12 V aus einem 3,7-V-Akku (Boost), +5 V aus 12 V (Buck) oder beides in einem Gerät.`,
    },
    {
      id: 'viz-buck', type: 'viz', viz: 'buck-lab', title: 'Schaltregler-Labor',
      intro: 'Oben die Spannung am Ausgang, darunter der Spulenstrom, unten die Restwelligkeit. Die Verluste (Schalter, Diode, Spule) sind realistisch eingerechnet.',
      params: { uin: 12, target: 5 },
      task: 'Erzeuge **5 V ± 0,1 V bei mindestens 0,8 A** aus 12 V (Tiefsetzsteller) mit einer **Welligkeit unter 50 mV** und einem **Wirkungsgrad ≥ 90 %**. Tipp: Das Tastverhältnis legt die Spannung fest, L, C und $f_s$ die Welligkeit; ändere dann die Schaltfrequenz und beobachte Verluste und Welligkeit.',
    },
    {
      id: 'calc-d', type: 'numeric', title: 'Tastverhältnis',
      question: 'Ein Tiefsetzsteller soll aus $12\\,\\text{V}$ die Spannung $5\\,\\text{V}$ erzeugen (ideal, ohne Verluste). Wie groß ist das Tastverhältnis $D$?',
      answer: 0.417, tolerance: 0.005,
      hint: '$U_\\text{aus}=D\\cdot U_\\text{ein}$',
      explain: '$D = 5/12 = 0{,}417 = 41{,}7\\,\\%$.',
    },
    {
      id: 'calc-di', type: 'numeric', title: 'Welligkeit des Spulenstroms',
      question: 'Bei $U_\\text{ein}=12\\,\\text{V}$, $U_\\text{aus}=5\\,\\text{V}$, $D=0{,}417$, $L=100\\,\\mu\\text{H}$ und $f_s=100\\,\\text{kHz}$: Wie groß ist die Stromwelligkeit $\\Delta I_L$?',
      answer: 0.29, tolerance: 0.01, unit: 'A',
      hint: '$\\Delta I_L = (U_\\text{ein}-U_\\text{aus})\\cdot D/(L\\cdot f_s)$',
      explain: '$L\\cdot f_s = 100\\,\\mu\\text{H}\\cdot100\\,\\text{kHz}=10\\,\\Omega$ (H·Hz = Ω), also $\\Delta I_L = 7\\,\\text{V}\\cdot0{,}417/10\\,\\Omega=0{,}29\\,\\text{A}$.',
    },
    {
      id: 'calc-eta', type: 'numeric', title: 'Wirkungsgrad',
      question: 'Das Schaltnetzteil gibt $P_\\text{aus}=5\\,\\text{W}$ ab und nimmt $P_\\text{ein}=5{,}8\\,\\text{W}$ auf. Wie groß ist der Wirkungsgrad?',
      answer: 86, tolerance: 0.5, unit: '%',
      hint: '$\\eta=P_\\text{aus}/P_\\text{ein}$',
      explain: '$\\eta = 5/5{,}8 = 0{,}862 = 86\\,\\%$. Die Verlustleistung beträgt $0{,}8\\,\\text{W}$ – ein Linearregler hätte bei 12 V → 5 V und 1 A volle 7 W verheizt.',
    },
    {
      id: 'calc-boost', type: 'numeric', title: 'Tastverhältnis beim Hochsetzsteller',
      question: 'Ein Hochsetzsteller soll aus $5\\,\\text{V}$ die Spannung $12\\,\\text{V}$ erzeugen (ideal). Wie groß ist das Tastverhältnis $D$?',
      answer: 0.583, tolerance: 0.005,
      hint: '$U_\\text{aus}=U_\\text{ein}/(1-D)$ nach $D$ umstellen: $D = 1-U_\\text{ein}/U_\\text{aus}$',
      explain: '$D = 1-5/12 = 0{,}583$. Je höher die Verstärkung, desto näher geht $D$ an 1 – dann steigt der Spulenstrom stark an, und reale Verluste begrenzen das Verhältnis in der Praxis.',
    },
    {
      id: 'quiz-eigenschaften', type: 'quiz', title: 'Eigenschaften eines Schaltnetzteils',
      question: 'Welche Eigenschaften hat ein Schaltnetzteil gegenüber einem Netzteil mit Linearregler? (Mehrfachauswahl)',
      options: [
        { text: 'Hoher Wirkungsgrad', correct: true, why: 'Der Schalter verbraucht wenig, weil er entweder fast nur Strom führt oder fast nur Spannung sperrt.' },
        { text: 'Geringes Gewicht und Volumen', correct: true, why: 'Bei hoher Schaltfrequenz genügen kleine Spulen, Trafos und Kondensatoren; es ist kaum ein Kühlkörper nötig.' },
        { text: 'Es kann hochfrequente Störungen erzeugen', correct: true, why: 'Die steilen Schaltflanken mit der Schaltfrequenz und ihren Oberwellen können auf Leitungen und per Strahlung den Funkempfang stören.' },
        { text: 'Es erzeugt keinerlei Störungen, weil die Spannung gleichgerichtet ist', correct: false, why: 'Gerade das Schalten erzeugt breitbandige Störungen; sie müssen durch Filter, Schirmung und Layout beherrscht werden.' },
      ],
    },
    {
      id: 'order-zyklus', type: 'order', title: 'Ein Schaltzyklus',
      prompt: 'Bringe den Ablauf eines Tiefsetzsteller-Zyklus in die richtige Reihenfolge.',
      items: [
        'Der Schalter schließt, die Eingangsspannung liegt an der Spule',
        'Der Spulenstrom steigt, Energie wird im Magnetfeld gespeichert',
        'Der Schalter öffnet',
        'Die Spule treibt den Strom über die Freilaufdiode weiter, der Strom fällt',
        'Der Kondensator glättet die Ausgangsspannung, der Zyklus beginnt von vorn',
      ],
      explain: 'Der Spulenstrom kann nicht springen: Beim Öffnen wechselt er nur den Weg (vom Schalter zur Diode).',
    },
    {
      id: 'recall-boost', type: 'recall', title: 'Erkläre es in eigenen Worten',
      prompt: 'Warum kann man mit Schaltreglern Spannungen auch erhöhen, mit Linearreglern aber nicht? Antworte in 2–4 Sätzen.',
      answer: 'Ein Linearregler ist ein steuerbarer Widerstand in Reihe zur Last: Er kann nur Spannung „abziehen", nie mehr liefern, als am Eingang ansteht. Ein Schaltregler speichert die Energie portionsweise in einer Spule (Magnetfeld). Beim Öffnen des Schalters erzeugt die Spule durch Selbstinduktion eine Spannung, die sich zur Eingangsspannung addiert (Hochsetzsteller, U_aus = U_ein/(1 − D)). Die Spule ist also ein Energiespeicher, der Energie bei niedriger Spannung aufnimmt und bei höherer abgibt.',
      hints: ['Welche Rolle spielt die Spule beim Öffnen des Schalters?', 'Was geschieht mit dem Strom, wenn man den Strom durch eine Induktivität plötzlich unterbricht?'],
      cards: ['boost-formel', 'spule-speicher'],
    },
    {
      id: 'mission', type: 'callout', tone: 'mission', title: 'Prüfung und Funkpraxis',
      md: `
Zwei Fragen aus dem Katalog gehören hierher: Ein Schaltnetzteil hat **hohen Wirkungsgrad, geringes Gewicht und geringes Volumen** (Katalog **ED302**), und sein **Hauptnachteil** ist, dass es hochfrequente Störungen erzeugen kann (**ED303**).[^bnetza-pruefungsfragen-2024] Funkpraktisch heißt das: Ein billiges Schaltnetzteil neben dem Kurzwellenempfänger kann das Band mit „Teppichen" aus Störlinien zuschütten; Abhilfe sind Netzfilter, Ferrite (mehr in der Lektion zu EMV), Abstand zum Empfänger und ein Gerät mit gutem EMV-Design. Die Schaltfrequenz ist eine Zahl, die man im Rauschteppich wiederfindet.

Merke: *Linear = heizt, Schalt = stört.*`,
    },
    {
      id: 'warning', type: 'callout', tone: 'warning', title: 'Typische Fehlvorstellung',
      md: `
„Schaltnetzteile stören den Funk nicht, weil die Schaltfrequenz weit unter den Funkfrequenzen liegt." – Das ist falsch: Die steilen Flanken enthalten viele **Oberwellen** der Schaltfrequenz – ein Rechtecksignal mit 100 kHz hat Spektrallinien bis in den Kurzwellenbereich und darüber. Und: Das Tastverhältnis legt die *Spannung* fest, nicht den Wirkungsgrad; der hängt von Schalter-, Dioden- und Spulenverlusten ab.`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>Deutsch</th><th>English</th><th>Notiz</th></tr>
<tr><td>Schaltnetzteil / Schaltregler</td><td>switched-mode power supply (SMPS)</td><td>getaktet</td></tr>
<tr><td>Tiefsetzsteller</td><td>buck converter, step-down</td><td>$U_\\text{aus}=D\\,U_\\text{ein}$</td></tr>
<tr><td>Hochsetzsteller</td><td>boost converter, step-up</td><td>$U_\\text{aus}=U_\\text{ein}/(1-D)$</td></tr>
<tr><td>Tastverhältnis</td><td>duty cycle</td><td>$D=t_\\text{ein}/T$</td></tr>
<tr><td>Schaltfrequenz</td><td>switching frequency</td><td>20 kHz … 1 MHz</td></tr>
<tr><td>Freilaufdiode</td><td>freewheeling / flyback diode</td><td>führt den Spulenstrom weiter</td></tr>
<tr><td>Speicherdrossel</td><td>storage choke, inductor</td><td>speichert Energie</td></tr></table>`,
    },
    {
      id: 'deep-lueckend', type: 'callout', tone: 'deep', title: 'Lückender und nichtlückender Betrieb',
      md: `
Bei kleiner Last oder kleiner Induktivität kann der Spulenstrom innerhalb einer Periode auf null fallen (*lückender Betrieb*, DCM). Dann gilt $U_\\text{aus}=D\\,U_\\text{ein}$ nicht mehr – die Ausgangsspannung steigt über diesen Wert, und der Regler muss $D$ verkleinern. Die Demo wechselt in diesen Bereich, wenn du die Last klein und $L$ klein wählst: Der Spulenstrom berührt dann null. Die Formeln dieser Lektion gelten für den *nichtlückenden Betrieb* (CCM).`,
    },
  ],
  cards: [
    { id: 'buck-prinzip', front: 'Prinzip des Tiefsetzstellers?', back: 'Schalter zerhackt $U_\\text{ein}$, Spule speichert Energie und führt den Strom über die Freilaufdiode weiter, Kondensator glättet. Im Mittel: $U_\\text{aus}=D\\cdot U_\\text{ein}$.' },
    { id: 'buck-formel', front: 'Ausgangsspannung des Tiefsetzstellers?', back: '$U_\\text{aus}=D\\cdot U_\\text{ein}$ mit $D=t_\\text{ein}/T$ (immer $U_\\text{aus}<U_\\text{ein}$).' },
    { id: 'boost-formel', front: 'Ausgangsspannung des Hochsetzstellers?', back: '$U_\\text{aus}=\\dfrac{U_\\text{ein}}{1-D}$ (immer $U_\\text{aus}>U_\\text{ein}$).' },
    { id: 'di-formel', front: 'Spulenstromwelligkeit im Tiefsetzsteller?', back: '$\\Delta I_L=\\dfrac{(U_\\text{ein}-U_\\text{aus})\\,D}{L\\,f_s}$' },
    { id: 'spule-speicher', front: 'Warum kann ein Schaltregler die Spannung erhöhen?', back: 'Die Spule speichert Energie ($\\tfrac12LI^2$) und gibt sie beim Öffnen des Schalters mit höherer Spannung ab (Selbstinduktion).' },
    { id: 'schalt-eta', front: 'Typischer Wirkungsgrad eines Schaltreglers?', back: 'Über 85 % (oft 90–95 %), deutlich besser als $U_\\text{aus}/U_\\text{ein}$ beim Linearregler.' },
    { id: 'schalt-eigenschaften', front: 'Eigenschaften eines Schaltnetzteils (ED302)?', back: 'Hoher Wirkungsgrad, geringes Gewicht, geringes Volumen.' },
    { id: 'schalt-nachteil', front: 'Hauptnachteil eines Schaltnetzteils (ED303)?', back: 'Kann hochfrequente Störungen erzeugen (Schaltfrequenz und Oberwellen).' },
    { id: 'schaltfrequenz', front: 'Warum eine hohe Schaltfrequenz?', back: 'Kleinere Spule und Kondensator für gleiche Welligkeit – aber mehr Schaltverluste und mehr Störungen.' },
    { id: 'freilauf-buck', front: 'Wozu dient die Diode im Tiefsetzsteller?', back: 'Freilaufdiode: Sie übernimmt den Spulenstrom, wenn der Schalter öffnet.' },
  ],
};
