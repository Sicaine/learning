export default {
  id: 'linearregler',
  title: 'Linearer Spannungsregler',
  summary: 'Ein Linearregler hält die Ausgangsspannung konstant, indem er überschüssige Spannung in Wärme verwandelt. Du rechnest Verlustleistung, Wirkungsgrad und Kühlung durch und siehst, warum 12 V → 5 V bei 0,5 A schon 3,5 W heizt.',
  minutes: 30,
  needs: ['netzteil-glaettung', 'z-diode'],
  goals: [
    'Das Prinzip eines [[linearregler|Linearreglers]] als steuerbaren Vorwiderstand (Längsregler) erklären',
    'Die [[verlustleistung]] $P_V = (U_\\text{ein}-U_\\text{aus})\\cdot I$ und den [[wirkungsgrad]] $\\eta = U_\\text{aus}/U_\\text{ein}$ berechnen',
    'Die [[dropout-spannung]] berücksichtigen und die Mindest-Eingangsspannung bestimmen',
    'Mit dem [[waermewiderstand]] $R_\\text{th}$ die Temperatur abschätzen und einen [[kuehlkoerper]] auswählen',
    'Linear- und Schaltregler nach Vor- und Nachteilen einordnen',
  ],
  blocks: [
    {
      id: 'idee', type: 'text', title: 'Ein Wasserhahn, der von selbst nachregelt',
      md: `
Das Netzteil aus der letzten Lektion liefert nach dem Siebkondensator eine Gleichspannung, die mit der Last und der Netzspannung schwankt und noch etwas Brumm trägt. Der Funkamateur will aber **13,8 V** am Gerät – unabhängig davon, ob es gerade sendet oder empfängt. Dafür steht am Ende der Kette ein [[spannungsregler|Spannungsregler]].[^wp-spannungsregler]

Die einfachste Bauart ist der **[[linearregler|Linearregler]]**. Stell dir einen Wasserhahn vor, an dem ein Automat dreht: Ist der Druck dahinter zu hoch, dreht er zu, ist er zu niedrig, dreht er auf. Elektrisch ist der „Hahn" ein [Transistor](wiki:Transistor|Transistor) in Reihe zur Last, ein **Längsregler**. Eine Regelschaltung vergleicht die Ausgangsspannung mit einer Referenz und steuert den Transistor so, dass er genau die überschüssige Spannung aufnimmt:

$$U_\\text{aus} = U_\\text{ein} - U_\\text{CE}$$

Die Idee geht auf die Regelungstechnik zurück: ein [Regelkreis](wiki:Regelkreis|Control loop) vergleicht Soll und Ist. Die Referenz liefert im einfachsten Selbstbau eine [[z-diode|Z-Diode]] (siehe Lektion zur Z-Diode): Sie hält die Basisspannung konstant, und der Transistor folgt als *Emitterfolger*: $U_\\text{aus} = U_Z - U_\\text{BE}$. Fertige Regler wie der [7805](wiki:Spannungsregler|Voltage regulator) (Festspannungsregler 5 V) und seine Verwandten 7812, 7809 … packen Referenz, Verstärker, Transistor und Schutzschaltungen in ein Gehäuse mit drei Anschlüssen: Eingang, Masse, Ausgang.`,
    },
    {
      id: 'schaltung', type: 'figure', title: 'Längsregler mit Z-Diode und Transistor',
      html: `<svg viewBox="0 0 420 235" role="img" aria-label="Längsregler: Transistor in Reihe zur Last, Basis an Z-Diode mit Vorwiderstand" style="width:100%;max-width:520px;height:auto;color:var(--ink)">
<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M20 40 H210"/><path d="M20 215 H390"/><path d="M210 152 H390"/>
<path d="M130 40 V62"/><rect x="122" y="62" width="16" height="30"/><path d="M130 92 V125"/><path d="M130 125 H180"/><path d="M180 105 V145"/>
<path d="M130 125 V150"/><path d="M120 170 H140 L130 150 Z"/><path d="M118 150 H142"/><path d="M130 170 V215"/>
<path d="M180 118 L210 98 V40"/><path d="M180 132 L210 152"/>
<path d="M340 152 V170"/><rect x="332" y="170" width="16" height="30"/><path d="M340 200 V215"/>
<path d="M240 46 V146" stroke-dasharray="4 4" stroke="var(--accent)"/>
</g>
<polygon points="210,152 199,150.7 204.4,142.4" fill="currentColor"/>
<polygon points="240,146 236,136 244,136" fill="var(--accent)"/><polygon points="240,46 236,56 244,56" fill="var(--accent)"/>
<circle cx="130" cy="40" r="3" fill="currentColor"/><circle cx="130" cy="125" r="3" fill="currentColor"/>
<g font-size="13" fill="currentColor" font-family="sans-serif">
<text x="22" y="32">U_ein</text><text x="340" y="146">U_aus</text><text x="146" y="82">R_V</text><text x="148" y="164">Z-Diode</text><text x="158" y="100">T</text><text x="252" y="100" fill="var(--accent)">U_CE</text><text x="354" y="190">Last</text><text x="22" y="208">Masse</text>
</g>
</svg>`,
      caption: 'Die Z-Diode legt die Basisspannung fest, der Transistor T (Kollektor am Eingang, Emitter am Ausgang) folgt: $U_\\text{aus}\\approx U_Z-0{,}7\\,\\text{V}$. Der Widerstand $R_V$ speist die Z-Diode. Die Spannung zwischen Kollektor und Emitter ist genau die, die „vernichtet" wird.',
    },
    {
      id: 'verlust', type: 'text', title: 'Der Preis: Wärme gleich Spannungsdifferenz mal Strom',
      md: `
Weil der Transistor in Reihe zur Last liegt, fließt durch ihn derselbe Strom $I$ wie durch die Last – und an ihm fällt die Differenz $U_\\text{ein}-U_\\text{aus}$ ab. Diese Leistung wird zu Wärme:

$$P_V = (U_\\text{ein}-U_\\text{aus})\\cdot I \\qquad\\quad \\eta = \\frac{P_\\text{aus}}{P_\\text{ein}} = \\frac{U_\\text{aus}\\,I}{U_\\text{ein}\\,I} = \\frac{U_\\text{aus}}{U_\\text{ein}}$$

Der Strom aus dem Netzteil ist (bis auf einen kleinen Ruhestrom) genau der Laststrom (siehe auch [elektrische Leistung](wiki:Elektrische Leistung|Electric power)). Der [Wirkungsgrad](wiki:Wirkungsgrad|Energy conversion efficiency) hängt deshalb **nur vom Spannungsverhältnis** ab: Aus 12 V auf 5 V kommen höchstens 41,7 % an, aus 24 V auf 5 V nur 20,8 % – die übrigen 79 % heizen den Regler.

Dazu kommt die **[[dropout-spannung|Dropout-Spannung]]** (engl. dropout voltage): Der Regler braucht eine Mindestdifferenz zwischen Ein- und Ausgang, um zu regeln. Beim klassischen 7805 sind es typisch etwa 2 V (laut Datenblatt, bei Wärme und Strom mehr); sogenannte **LDO-Regler** (LDO-Regler) kommen mit deutlich weniger aus und eignen sich für Akkus, die nahe an die Ausgangsspannung entladen werden. Unterschreitest du den Dropout, folgt die Ausgangsspannung der Eingangsspannung – die Regelung ist weg.`,
    },
    {
      id: 'kuehlung', type: 'text', title: 'Wohin mit der Wärme? Kühlkörper und Wärmewiderstand',
      md: `
Die Verlustleistung muss das Bauteil an die Umgebung abgeben. Wie leicht das geht, beschreibt der **[[waermewiderstand|Wärmewiderstand]]** $R_\\text{th}$ in K/W ([Wärmewiderstand](wiki:Wärmewiderstand|Thermal conductance and resistance)): Er sagt, um wie viele Kelvin die Sperrschicht heißer wird als die Umgebung, wenn ein Watt hindurchfließt. Das Rechenschema ist dasselbe wie beim [ohmschen Gesetz](wiki:Ohmsches Gesetz|Ohm's law) – Temperaturdifferenz $\\leftrightarrow$ Spannung, Wärmestrom $P_V$ $\\leftrightarrow$ Strom:

$$\\Delta T = P_V\\cdot R_\\text{th}\\qquad T_j = T_\\text{amb} + P_V\\cdot R_\\text{th}$$

Ein TO-220-Regler allein in der Luft hat grob 50 K/W (Datenblatt-Größenordnung), mit [Kühlkörper](wiki:Kühlkörper|Heat sink) 5…20 K/W. Die zulässige Sperrschichttemperatur liegt bei Silizium typisch um 125–150 °C; überschreitet der Regler sie, regelt moderne Elektronik ab oder schaltet ganz ab (*thermal shutdown*) – das Gerät bricht dann weg, kommt wieder, schaltet wieder ab. In der Demo siehst du genau das.

Dass du nicht „gefühlt" kühlen musst, sondern rechnen kannst, ist der Kern dieser Lektion: erst $P_V$ ausrechnen, dann den maximal erlaubten $R_\\text{th}$.`,
    },
    {
      id: 'viz-heat', type: 'viz', viz: 'regulator-heat-lab', title: 'Regler-Labor: Wärme und Wirkungsgrad',
      intro: 'Stelle Eingangs- und Ausgangsspannung, Laststrom und die Kühlung ein. Oben siehst du die Leistungsbilanz, darunter die Sperrschichttemperatur und den Vergleich mit einem Schaltregler.',
      task: 'Betreibe **5 V bei 0,5 A aus 12 V** ohne Übertemperatur-Abschaltung (wähle einen passenden Kühlkörper) – und erreiche mit einer anderen Einstellung **η ≥ 70 %** bei 5 V / 0,5 A (Tipp: Welche Eingangsspannung ist nötig?).',
    },
    {
      id: 'calc-pv', type: 'numeric', title: 'Verlustleistung des 7805',
      question: 'Ein Festspannungsregler 7805 erzeugt aus $U_\\text{ein}=12\\,\\text{V}$ die Ausgangsspannung $U_\\text{aus}=5\\,\\text{V}$ bei $I=0{,}5\\,\\text{A}$. Wie viel Leistung wird im Regler in Wärme verwandelt?',
      answer: 3.5, tolerance: 0.05, unit: 'W',
      hint: '$P_V = (U_\\text{ein}-U_\\text{aus})\\cdot I$',
      explain: '$P_V = (12\\,\\text{V}-5\\,\\text{V})\\cdot 0{,}5\\,\\text{A} = 3{,}5\\,\\text{W}$. Nutzbar sind nur $5\\,\\text{V}\\cdot0{,}5\\,\\text{A}=2{,}5\\,\\text{W}$.',
    },
    {
      id: 'calc-eta', type: 'numeric', title: 'Wirkungsgrad',
      question: 'Wie groß ist der Wirkungsgrad dieses Reglers (12 V → 5 V) in Prozent?',
      answer: 41.7, tolerance: 0.3, unit: '%',
      hint: '$\\eta = U_\\text{aus}/U_\\text{ein}$',
      explain: '$\\eta = 5/12 = 0{,}417 = 41{,}7\\,\\%$ – unabhängig vom Laststrom (bis auf den kleinen Ruhestrom des Reglers).',
    },
    {
      id: 'calc-dt', type: 'numeric', title: 'Temperaturanstieg',
      question: 'Der Regler sitzt auf einem Kühlkörper mit gesamt $R_\\text{th}=20\\,\\text{K/W}$ (Sperrschicht bis Umgebung) und gibt $P_V=3{,}5\\,\\text{W}$ ab. Um wie viele Kelvin liegt die Sperrschicht über der Umgebung?',
      answer: 70, tolerance: 0.5, unit: 'K',
      hint: '$\\Delta T = P_V\\cdot R_\\text{th}$',
      explain: '$\\Delta T = 3{,}5\\,\\text{W}\\cdot 20\\,\\text{K/W} = 70\\,\\text{K}$. Bei 25 °C Umgebung ergibt das $T_j = 95\\,°\\text{C}$ – unterhalb der üblichen Grenze von 125 °C, aber so heiß, dass man den Kühlkörper nicht mehr anfassen mag.',
    },
    {
      id: 'calc-uin', type: 'numeric', title: 'Mindest-Eingangsspannung',
      question: 'Ein Regler braucht eine Dropout-Spannung von $2\\,\\text{V}$. Wie groß muss $U_\\text{ein}$ mindestens sein, damit er $5\\,\\text{V}$ ausregeln kann?',
      answer: 7, tolerance: 0.05, unit: 'V',
      hint: '$U_\\text{ein,min} = U_\\text{aus}+U_\\text{dropout}$',
      explain: '$5\\,\\text{V}+2\\,\\text{V}=7\\,\\text{V}$. Deshalb sieht man vor dem 7805 meist mindestens 7…8 V – und deshalb muss der Siebkondensator davor so groß sein, dass die Restwelligkeit die Eingangsspannung nie unter diesen Wert drückt.',
    },
    {
      id: 'calc-rth', type: 'numeric', title: 'Welcher Kühlkörper?',
      question: 'Ein Regler setzt $P_V=19\\,\\text{W}$ um (24 V → 5 V bei 1 A). Die Sperrschicht darf $125\\,°\\text{C}$ heiß werden, die Umgebung ist $25\\,°\\text{C}$ warm. Wie groß darf der Wärmewiderstand Sperrschicht–Umgebung höchstens sein?',
      answer: 5.26, tolerance: 0.1, unit: 'K/W',
      hint: '$R_\\text{th,max} = (T_{j,\\max}-T_\\text{amb})/P_V$',
      explain: '$R_\\text{th}\\le 100\\,\\text{K}/19\\,\\text{W}=5{,}26\\,\\text{K/W}$ – das ist ein großer Kühlkörper mit Lüfter. Die Zahl zeigt: Hier lohnt sich ein Schaltregler.',
    },
    {
      id: 'quiz-quelle', type: 'quiz', title: 'Woher kommt die Wärme?',
      question: 'Wovon hängt die im Linearregler umgesetzte Verlustleistung ab?',
      options: [
        { text: 'Vom Produkt aus Spannungsdifferenz $(U_\\text{ein}-U_\\text{aus})$ und Laststrom', correct: true, why: 'Der Regler „vernichtet" die überschüssige Spannung bei dem Strom, der durch die Last fließt: $P_V = (U_\\text{ein}-U_\\text{aus})\\,I$.' },
        { text: 'Nur vom Laststrom, die Spannung spielt keine Rolle', correct: false, why: 'Ohne Spannungsdifferenz entsteht keine Wärme: Bei $U_\\text{ein}$ knapp über $U_\\text{aus}$ ist $P_V$ klein, auch bei großem Strom.' },
        { text: 'Nur von der Ausgangsspannung', correct: false, why: 'Nutzbar ist $U_\\text{aus}\\cdot I$; verheizt wird die Differenz zur Eingangsspannung.' },
        { text: 'Von der Netzfrequenz', correct: false, why: 'Die Frequenz bestimmt die Restwelligkeit vor dem Regler, nicht die Verlustleistung im Regler.' },
      ],
    },
    {
      id: 'match-begriffe', type: 'match', title: 'Begriffe zuordnen',
      prompt: 'Ordne jeden Begriff seiner Bedeutung zu.',
      pairs: [
        ['Dropout-Spannung', 'Mindestdifferenz zwischen Ein- und Ausgang, damit der Regler regelt'],
        ['Verlustleistung', '(U_ein − U_aus) · I, als Wärme im Regler'],
        ['Wärmewiderstand', 'Temperaturanstieg in K je Watt Verlustleistung'],
        ['Wirkungsgrad (linear)', 'U_aus / U_ein'],
      ],
    },
    {
      id: 'mission', type: 'callout', tone: 'mission', title: 'Prüfung und Funkpraxis',
      md: `
Der Prüfungskatalog fragt nach den **Eigenschaften einer Gleichspannungsquelle**: Sie soll bei Belastung eine hohe Spannungskonstanz haben (Katalog **ED301**) – genau das leistet der Regler. Praktisch ist das die Spannung, mit der du dein Funkgerät betreibst: ein 13,8-V-Festspannungsnetzteil mit Linearregler ist leise (kein Schaltrauschen, siehe nächste Lektion), aber hat viel Verlustwärme und ein schweres Kühlsystem. Bei der Aufnahme eines Transceivers rechnest du ebenfalls mit $P = U\\cdot I$ (**NB601**: 13,8 V und 1,5 A ergeben 20,7 W).[^bnetza-pruefungsfragen-2024]

Merke: *Linear = heizt, Schalt = stört.* Welches Netzteil das bessere ist, hängt vom Einsatz ab (Empfängerumgebung, Gewicht, Wärme) – dazu mehr in der Lektion über Schaltnetzteile.`,
    },
    {
      id: 'warning', type: 'callout', tone: 'warning', title: 'Typische Fehlvorstellung',
      md: `
„Ein Spannungsregler ist effizient, er gibt ja nur die gewünschte Spannung aus." – Nein: Ein Linearregler gibt die Spannung stabil aus, aber seine Effizienz ist nur $U_\\text{aus}/U_\\text{ein}$. Aus einer zu hohen Eingangsspannung entsteht **Wärme, kein Nutzen**. Wähle die Eingangsspannung deshalb nur so hoch wie nötig (Ausgang + Dropout + Restwelligkeit) und plane die Kühlung nach $P_V$.`,
    },
    {
      id: 'recall-regler', type: 'recall', title: 'Erkläre es in eigenen Worten',
      prompt: 'Wann ist ein Schaltregler besser als ein Linearregler – und wann ist umgekehrt der Linearregler die bessere Wahl? Nenne je zwei Argumente.',
      answer: 'Schaltregler sind besser, wenn die Spannungsdifferenz oder der Strom groß ist: Sie haben einen hohen Wirkungsgrad (> 85 %), erzeugen wenig Wärme, sind kleiner und leichter, und können Spannungen auch erhöhen. Der Linearregler ist besser, wenn es auf Ruhe ankommt: Er erzeugt keine hochfrequenten Störungen, ist einfach, billig, ohne Spule aufgebaut und hat sehr wenig Restwelligkeit – dafür ist sein Wirkungsgrad nur U_aus/U_ein und er heizt.',
      hints: ['Welche Formel bestimmt den Wirkungsgrad des Linearreglers?', 'Was erzeugt ein Schaltregler bei seiner Schaltfrequenz?'],
      cards: ['pv-formel', 'eta-linear'],
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>Deutsch</th><th>English</th><th>Notiz</th></tr>
<tr><td>Spannungsregler</td><td>voltage regulator</td><td>linear / switching</td></tr>
<tr><td>Längsregler</td><td>series pass regulator</td><td>Transistor in Reihe zur Last</td></tr>
<tr><td>Festspannungsregler</td><td>fixed-voltage regulator</td><td>z. B. 7805</td></tr>
<tr><td>Dropout-Spannung</td><td>dropout voltage</td><td>Mindestdifferenz ein–aus</td></tr>
<tr><td>Verlustleistung</td><td>power dissipation</td><td>$P_V$ in W</td></tr>
<tr><td>Wärmewiderstand</td><td>thermal resistance</td><td>$R_\\text{th}$ in K/W</td></tr>
<tr><td>Kühlkörper</td><td>heat sink</td><td></td></tr>
<tr><td>Sperrschichttemperatur</td><td>junction temperature</td><td>$T_j$</td></tr></table>`,
    },
    {
      id: 'deep-rth', type: 'callout', tone: 'deep', title: 'R_th ist eine Reihenschaltung',
      md: `
Der Weg der Wärme führt vom Chip zum Gehäuse ($R_\\text{th,JC}$), über die Berührungsfläche mit [Wärmeleitpaste](wiki:Wärmeleitpaste|Thermal paste) zum Kühlkörper ($R_\\text{th,CS}$) und von dort an die Luft ($R_\\text{th,SA}$). Die Werte addieren sich wie Widerstände in Reihe:

$$R_\\text{th} = R_\\text{th,JC}+R_\\text{th,CS}+R_\\text{th,SA}$$

Der Kühlkörper allein ist also nur ein Teil der Rechnung; eine schlechte Montage (ohne Paste, schiefe Auflage) verschlechtert den mittleren Term. Beim 7805 im TO-220-Gehäuse liegt die Metallfahne auf Masse; bei anderen Reglern hängt sie am Eingang oder Ausgang. Dann braucht man eine Isolierscheibe, die $R_\\text{th,CS}$ erhöht. Immer ins Datenblatt schauen.`,
    },
  ],
  cards: [
    { id: 'pv-formel', front: 'Verlustleistung im Linearregler?', back: '$P_V = (U_\\text{ein}-U_\\text{aus})\\cdot I$' },
    { id: 'eta-linear', front: 'Wirkungsgrad eines Linearreglers?', back: '$\\eta = U_\\text{aus}/U_\\text{ein}$ (12 V → 5 V: 41,7 %).' },
    { id: 'dropout', front: 'Was ist die Dropout-Spannung?', back: 'Die Mindestdifferenz $U_\\text{ein}-U_\\text{aus}$, die der Regler zum Regeln braucht (7805: etwa 2 V; LDO: deutlich weniger).' },
    { id: 'uin-min', front: 'Mindest-$U_\\text{ein}$ eines Reglers?', back: '$U_\\text{aus}+U_\\text{dropout}$, z. B. 5 V + 2 V = 7 V.' },
    { id: 'rth-formel', front: 'Temperatur der Sperrschicht?', back: '$T_j = T_\\text{amb}+P_V\\cdot R_\\text{th}$ ($R_\\text{th}$ in K/W)' },
    { id: 'rth-reihe', front: 'Wie setzt sich der gesamte Wärmewiderstand zusammen?', back: 'Reihenschaltung: Sperrschicht–Gehäuse + Gehäuse–Kühlkörper + Kühlkörper–Umgebung.' },
    { id: 'laengsregler', front: 'Funktionsprinzip eines Längsreglers?', back: 'Transistor in Reihe zur Last als steuerbarer Widerstand; eine Regelschaltung hält $U_\\text{aus}$ konstant, der Transistor nimmt die Differenz auf.' },
    { id: 'z-referenz', front: 'Rolle der Z-Diode im einfachen Längsregler?', back: 'Referenzspannung an der Basis; $U_\\text{aus}\\approx U_Z-U_\\text{BE}$ (Emitterfolger).' },
    { id: 'lin-vs-schalt', front: 'Merkhilfe Linear- vs. Schaltregler?', back: 'Linear heizt, Schalt stört: Linearregler sind störarm, aber verlustreich; Schaltregler effizient, aber mit HF-Störungen.' },
    { id: 'thermal-shutdown', front: 'Was passiert bei Übertemperatur im Regler?', back: 'Der Regler schaltet thermisch ab (thermal shutdown) und regelt erst nach dem Abkühlen wieder.' },
  ],
};
