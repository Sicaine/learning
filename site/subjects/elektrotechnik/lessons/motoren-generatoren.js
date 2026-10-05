export default {
  id: 'motoren-generatoren',
  title: 'Gleichstrommotor, Drehfeld, Asynchronmotor, Generator',
  summary: 'Derselbe Aufbau ist Motor und Generator. Du erkennst die Gegenspannung, die den Anlaufstrom begrenzt, siehst im Drehfeld, wie drei Phasen ein Magnetfeld rotieren lassen, und rechnest Drehfelddrehzahl und Schlupf.',
  minutes: 30,
  needs: ['drehstrom', 'induktion'],
  goals: [
    'Die [[lorentzkraft|Lorentzkraft]] als Ursache des Motormoments und die [[induktion|Induktion]] als Ursache der Generatorspannung beschreiben',
    'Die [[gegen-emk|Gegen-EMK]] des [[gleichstrommotor|Gleichstrommotors]] erklären und Anlauf- und Betriebsstrom berechnen',
    'Das [[drehfeld|Drehfeld]] aus drei Phasen herleiten und die Drehfelddrehzahl $n_s=60f/p$ bestimmen',
    'Den [[schlupf|Schlupf]] des [[asynchronmotor|Asynchronmotors]] berechnen und begründen, warum er nie synchron läuft',
    'Motor und [[generator|Generator]] als umkehrbare Maschine verstehen',
  ],
  blocks: [
    {
      id: 'idee', type: 'text', title: 'Eine Maschine, zwei Betriebsarten',
      md: `
Zwei Effekte aus den Feld-Lektionen sind alles, was man für Motor und Generator braucht:

- **Motor:** Ein stromdurchflossener Leiter der Länge $l$ im Magnetfeld $B$ erfährt die [Lorentzkraft](wiki:Lorentzkraft|Lorentz force) $F = B\\cdot I\\cdot l$ (Leiter senkrecht zum Feld). Mehrere Leiter auf einem drehbaren Anker ergeben ein Drehmoment: $M = k\\cdot I$.
- **Generator:** Bewegt man einen Leiter im Magnetfeld, wird nach dem [Induktionsgesetz](wiki:Elektromagnetische Induktion|Electromagnetic induction) eine Spannung induziert: $U_i = k\\cdot\\omega$ – proportional zur Winkelgeschwindigkeit.

Die Konstante $k$ ist beide Male **dieselbe**: Sie steckt in der Bauform (Windungen, Feldstärke, Geometrie). Deshalb ist jede [Maschine](wiki:Elektromotor|Electric motor) umkehrbar (als [Generator](wiki:Elektrischer Generator|Electric generator) betrieben): Dreht man die Welle eines Gleichstrommotors von außen, liefert er Spannung – ein Fahrraddynamo ist ein Motor, der rückwärts läuft. Beim Gleichstrommotor sorgt ein [Kommutator](wiki:Kommutator (Elektrotechnik)|Commutator (electric)) (Stromwender) dafür, dass der Strom im Anker nach einer halben Umdrehung umgepolt wird, damit das Moment die Drehrichtung beibehält.[^wp-gleichstrommotor]`,
    },
    {
      id: 'gegen-emk', type: 'text', title: 'Die Gegenspannung: der Motor als eigener Generator',
      md: `
Sobald sich der Anker dreht, wirkt er gleichzeitig als Generator – und zwar so, dass die induzierte Spannung der angelegten **entgegenwirkt** ([[lenzsche-regel|Lenzsche Regel]]). Diese **[[gegen-emk|Gegen-EMK]]** (auch induzierte Spannung) wächst mit der Drehzahl. Die Maschengleichung des Ankers lautet:

$$U = I\\cdot R_A + k\\,\\omega\\qquad M = k\\cdot I$$

Im Stillstand ist $\\omega=0$, es gibt keine Gegenspannung, und der Strom wird nur vom kleinen Ankerwiderstand begrenzt: der **Anlaufstrom** $I_A = U/R_A$ – oft das 10- bis 20-fache des Nennstroms. Beim Hochlauf steigt die Gegen-EMK, der Strom fällt ab, bis sich Drehmoment und Lastmoment ausgleichen. Das erklärt, warum ein blockierter Motor überhitzt (Strom $U/R_A$ ohne Gegenspannung), und warum die Drehzahl sich selbst an die Last anpasst: Mehr Last → Drehzahl sinkt → Gegen-EMK sinkt → mehr Strom → mehr Moment.

Als Generator ist es umgekehrt: Die Welle wird angetrieben, die Maschine induziert $E=k\\omega$ und gibt Strom an die Last ab. Ein Teil von $E$ fällt am Innenwiderstand $R_A$ ab, die Klemmenspannung ist $U_\\text{Kl}=E-I\\,R_A$.`,
    },
    {
      id: 'viz-motor', type: 'viz', viz: 'motor-lab', title: 'Gleichstrommotor-Labor',
      intro: 'Oben der Hochlauf (Strom und Gegen-EMK), darunter die Kennlinien n(M) und I(M). Mit „Generator" wird dieselbe Maschine von außen angetrieben.',
      task: 'Starte den **Anlauf**: Der Spitzenstrom ist $U_q/R_A$ (hier 24 A). Erhöhe dann das **Lastmoment** und beobachte Gegen-EMK und Strom, und schalte zuletzt auf **Generator** und erzeuge mit der Antriebsdrehzahl eine Spannung.',
    },
    {
      id: 'drehfeld', type: 'text', title: 'Drehstrom macht ein Magnetfeld drehbar',
      md: `
Im Wechselstrom-Netz gibt es keinen Kommutator: Drei Spulen sind im Stator um **120°** räumlich versetzt, und jede wird von einer der drei Phasen gespeist, die auch zeitlich 120° auseinander liegen. Jede Spule erzeugt ein Magnetfeld, das mit dem Strom pulsiert; die drei Felder addieren sich **vektoriell** zu einem Feld **konstanter Stärke, das im Kreis rotiert**.[^wp-drehfeld] Dieses [Drehfeld](wiki:Drehfeld|Rotating magnetic field) dreht sich mit

$$n_s = \\frac{60\\cdot f}{p}\\qquad\\text{(in min}^{-1}\\text{, Netzfrequenz } f \\text{ in Hz, Polpaarzahl } p)$$

Bei 50 Hz ergeben sich 3000 min⁻¹ ($p=1$), 1500 min⁻¹ ($p=2$), 1000 min⁻¹ ($p=3$) und 750 min⁻¹ ($p=4$). Mehr Polpaare bedeuten eine langsamere Feldrotation. Die Idee hatte [Galileo Ferraris](wiki:Galileo Ferraris|Galileo Ferraris); [Nikola Tesla](wiki:Nikola Tesla|Nikola Tesla) und [Michail Doliwo-Dobrowolski](wiki:Michail Ossipowitsch Doliwo-Dobrowolski|Mikhail Dolivo-Dobrovolsky) machten daraus brauchbare Motoren.`,
    },
    {
      id: 'video', type: 'video', youtube: 'aEFh77_9w4E', label: 'Drehfeld eines Drehstrommotors #001 – So entsteht das Drehfeld', channel: '#Sogeht by Sven Stemmler', minutes: 12,
      why: 'Etwa 12 Minuten: Wie drei um 120° versetzte Spulen mit drei Phasen ein rotierendes Feld erzeugen. Eine gute Ergänzung zur Drehfeld-Demo unten; die Animationen zeigen Feldrichtung und Stromrichtung je Spule.',
    },
    {
      id: 'asynchron', type: 'text', title: 'Der Asynchronmotor: dem Feld hinterher',
      md: `
Im Inneren des [Stators](wiki:Stator|Stator (electric machines)) sitzt ein Läufer mit kurzgeschlossenen Stäben, dem **[Käfigläufer](wiki:Kurzschlussläufer|Squirrel-cage rotor)** ([Asynchronmotor](wiki:Drehstrom-Asynchronmaschine|Induction motor)). Er ist nirgends mit dem Netz verbunden:

1. Das Drehfeld überstreicht die Läuferstäbe und **induziert** in ihnen Spannungen – es gilt das Induktionsgesetz.
2. Die Stäbe sind kurzgeschlossen, also fließt ein **Läuferstrom**.
3. Auf stromdurchflossene Stäbe im Feld wirkt die **Lorentzkraft** – es entsteht ein Drehmoment.
4. Der Läufer dreht sich in Feldrichtung.

Es gibt aber eine Besonderheit: Induziert wird nur, wenn sich Feld und Läufer **relativ zueinander** bewegen. Drehte der Läufer genau mit $n_s$, sähe er kein bewegtes Feld, es gäbe keine Induktion, keinen Läuferstrom und kein Moment. Der Läufer **muss** daher etwas langsamer laufen – er „asynchron" zum Feld ($n<n_s$). Das Maß dafür ist der **Schlupf**:

$$s = \\frac{n_s-n}{n_s}$$

Im Leerlauf ist $s$ sehr klein (Reibung genügt), bei Nennlast liegt er typisch bei einigen Prozent. Mehr Last → mehr Schlupf → größere Relativbewegung → mehr Läuferstrom und Moment. Die Drehzahl lässt sich über die Frequenz verstellen ([Frequenzumrichter](wiki:Frequenzumrichter|Variable-frequency drive)), denn $n_s\\propto f$.`,
    },
    {
      id: 'viz-feld', type: 'viz', viz: 'rotating-field', title: 'Drehfeld-Labor',
      intro: 'Ein Statorfeld (N und S) rotiert mit $n_s$; der Läufer mit der orangen Marke bleibt um den Schlupf zurück. Rechts siehst du die drei Strangströme. Die Animation läuft in Zeitlupe.',
      task: 'Stelle **50 Hz** und **p = 2** ein (n_s = 1500 min⁻¹), betrachte den **Leerlauf** (Schlupf ≈ 0,2 %, aber nie null) und lies bei **Nennlast 100 %** den Schlupf ab (≈ 4 %).',
    },
    {
      id: 'calc-ns', type: 'numeric', title: 'Synchrone Drehzahl',
      question: 'Ein Asynchronmotor mit $p=2$ Polpaaren hängt am 50-Hz-Netz. Wie groß ist die Drehfelddrehzahl $n_s$ in min⁻¹?',
      answer: 1500, tolerance: 1, unit: 'min⁻¹',
      hint: '$n_s = 60\\cdot f/p$',
      explain: '$n_s = 60\\cdot 50/2 = 1500\\,\\text{min}^{-1}$.',
    },
    {
      id: 'calc-schlupf', type: 'numeric', title: 'Schlupf',
      question: 'Der Läufer dieses Motors dreht mit $n=1440\\,\\text{min}^{-1}$. Wie groß ist der Schlupf $s$ in Prozent?',
      answer: 4, tolerance: 0.05, unit: '%',
      hint: '$s=(n_s-n)/n_s$',
      explain: '$s=(1500-1440)/1500=60/1500=0{,}04=4\\,\\%$.',
    },
    {
      id: 'calc-anlauf', type: 'numeric', title: 'Anlaufstrom',
      question: 'Ein Gleichstrommotor ($U=12\\,\\text{V}$, $R_A=0{,}5\\,\\Omega$) wird eingeschaltet. Wie groß ist der Strom im ersten Moment (Stillstand, keine Gegen-EMK)?',
      answer: 24, tolerance: 0.2, unit: 'A',
      hint: 'Ohne Gegenspannung begrenzt nur $R_A$ den Strom.',
      explain: '$I_A = U/R_A = 12\\,\\text{V}/0{,}5\\,\\Omega = 24\\,\\text{A}$ – das ist der Wert, den die Demo im Hochlauf-Diagramm zeigt.',
    },
    {
      id: 'calc-betrieb', type: 'numeric', title: 'Strom im Betrieb',
      question: 'Derselbe Motor läuft jetzt mit einer Gegen-EMK von $U_i=10{,}8\\,\\text{V}$. Wie groß ist der Ankerstrom?',
      answer: 2.4, tolerance: 0.05, unit: 'A',
      hint: '$I=(U-U_i)/R_A$',
      explain: '$I=(12\\,\\text{V}-10{,}8\\,\\text{V})/0{,}5\\,\\Omega = 1{,}2\\,\\text{V}/0{,}5\\,\\Omega=2{,}4\\,\\text{A}$ – ein Zehntel des Anlaufstroms.',
    },
    {
      id: 'quiz-gegenemk', type: 'quiz', title: 'Selbstbegrenzung',
      question: 'Wodurch wird der Strom eines Gleichstrommotors beim Hochlauf „von selbst" kleiner?',
      options: [
        { text: 'Durch die Gegen-EMK, die mit der Drehzahl wächst und der angelegten Spannung entgegenwirkt', correct: true, why: 'Der drehende Anker wirkt als Generator; die induzierte Spannung $k\\omega$ verringert die wirksame Spannung $U-k\\omega$ am Ankerwiderstand.' },
        { text: 'Weil der Ankerwiderstand mit der Drehzahl wächst', correct: false, why: 'Der ohmsche Widerstand der Wicklung bleibt (fast) gleich; es ist die induzierte Spannung, die den Strom senkt.' },
        { text: 'Weil die Netzspannung beim Anlauf sinkt', correct: false, why: 'Sie kann etwas einbrechen, das ist aber nicht die Ursache.' },
        { text: 'Durch den Kommutator, der den Strom begrenzt', correct: false, why: 'Der Kommutator polt nur um; er begrenzt keinen Strom.' },
      ],
    },
    {
      id: 'order-moment', type: 'order', title: 'Drehmoment im Asynchronmotor',
      prompt: 'Bringe die Entstehung des Drehmoments im Asynchronmotor in die richtige Reihenfolge.',
      items: [
        'Die drei Statorspulen erzeugen ein Drehfeld',
        'Das Drehfeld induziert eine Spannung in den Läuferstäben',
        'Im kurzgeschlossenen Läufer fließt ein Strom',
        'Auf die stromdurchflossenen Stäbe im Feld wirkt eine Kraft (Lorentzkraft)',
        'Der Läufer dreht sich und bleibt dabei hinter dem Feld zurück',
      ],
      explain: 'Wäre der Läufer genauso schnell wie das Feld, gäbe es keine Relativbewegung und damit keine Induktion.',
    },
    {
      id: 'recall-schlupf', type: 'recall', title: 'Erkläre es in eigenen Worten',
      prompt: 'Warum kann ein Asynchronmotor nie genau mit der Drehfelddrehzahl laufen? Was passiert mit dem Schlupf, wenn die Last steigt?',
      answer: 'Das Drehmoment entsteht durch Induktion im Läufer, und induziert wird nur bei einer Relativbewegung zwischen Drehfeld und Läufer. Liefe der Läufer synchron, gäbe es keine induzierte Spannung, keinen Läuferstrom und kein Moment. Also muss der Läufer langsamer sein (Schlupf s = (n_s − n)/n_s). Steigt die Last, sinkt die Drehzahl etwas, der Schlupf wächst, damit wächst die Relativbewegung, der Läuferstrom und das Moment, bis es zur Last passt.',
      hints: ['Wann wird eine Spannung induziert?', 'Was würde bei s = 0 geschehen?'],
      cards: ['schlupf', 'asynchron-prinzip'],
    },
    {
      id: 'mission', type: 'callout', tone: 'mission', title: 'Prüfung und Funkpraxis',
      md: `
Motoren und Generatoren sind kein eigener Prüfungspunkt der Klasse E; der Katalog verlangt Induktion und Lorentzkraft nur indirekt (Spulen, Transformatoren, Magnetfelder). Trotzdem begegnen sie dir an der Funkstelle: **Antennenrotoren** sind Gleichstrom- oder Wechselstrommotoren mit Getriebe, die Kfz-**[Lichtmaschine](wiki:Lichtmaschine|Alternator (automotive))** ist ein Generator, der das Funkgerät im Mobilbetrieb mit speist (und dessen Reglerstörungen man als Prasseln im Empfänger hört), und die Lüfter in Netzteilen und Endstufen sind Kleinmotoren. Gleichstrommotoren mit Bürsten sind klassische Störer (Funkenstörungen des Kommutators) – dagegen helfen Entstörkondensatoren und Drosseln, wie in der Lektion zur EMV. Bei der Spannungsversorgung aus der 12-V-Fahrzeugbatterie gilt zudem die Sicherheitsfrage nach Lichtbogen und Fahrzeugbrand bei unsachgemäßem Anschluss (**NK307**).[^bnetza-pruefungsfragen-2024]`,
    },
    {
      id: 'warning', type: 'callout', tone: 'warning', title: 'Typische Fehlvorstellung',
      md: `
„Ein Motor ist nur ein Verbraucher." – Er ist umkehrbar: Wird er angetrieben, speist er Energie zurück (Bremsen, Nutzbremsung bei Elektrofahrzeugen). Und: „Der Anlaufstrom ist so groß wie der Betriebsstrom." – Er ist ein Vielfaches davon, weil die Gegen-EMK erst mit der Drehzahl entsteht. Beim Asynchronmotor ist „Läufer = Feld" ein Fehler: Ohne Schlupf kein Moment.`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>Deutsch</th><th>English</th><th>Notiz</th></tr>
<tr><td>Gleichstrommotor</td><td>DC motor</td><td>mit Kommutator</td></tr>
<tr><td>Stromwender, Kommutator</td><td>commutator</td><td>polt den Ankerstrom um</td></tr>
<tr><td>Anker / Läufer</td><td>armature / rotor</td><td></td></tr>
<tr><td>Ständer / Stator</td><td>stator</td><td>trägt die Drehfeldwicklung</td></tr>
<tr><td>Gegen-EMK</td><td>back EMF</td><td>$U_i=k\\omega$</td></tr>
<tr><td>Drehfeld</td><td>rotating magnetic field</td><td>$n_s=60f/p$</td></tr>
<tr><td>Schlupf</td><td>slip</td><td>$s=(n_s-n)/n_s$</td></tr>
<tr><td>Asynchronmotor</td><td>induction motor</td><td>Käfigläufer</td></tr>
<tr><td>Polpaarzahl</td><td>number of pole pairs</td><td>$p$</td></tr></table>`,
    },
    {
      id: 'deep-moment', type: 'callout', tone: 'deep', title: 'Drehzahl und Moment des Gleichstrommotors',
      md: `
Aus $U=IR_A+k\\omega$ und $M=kI$ folgt die **Nebenschluss-/Permanentmagnet-Kennlinie**:

$$\\omega=\\frac{U}{k}-\\frac{R_A}{k^2}\\,M$$

Die Drehzahl fällt linear mit dem Moment, der Strom steigt linear. Im Leerlauf ($M\\approx0$) erreicht der Motor $\\omega_0=U/k$; im Stillstand erreicht das Moment das *Anhaltemoment* $kU/R_A$. Als Generator gilt: Drehzahl verdoppeln heißt Spannung verdoppeln. Das siehst du in der Demo in beiden Betriebsarten.`,
    },
  ],
  cards: [
    { id: 'motor-prinzip', front: 'Physikalisches Prinzip des Motors?', back: 'Lorentzkraft auf stromdurchflossene Leiter im Magnetfeld: $F=B\\,I\\,l$, Drehmoment $M=k\\,I$.' },
    { id: 'generator-prinzip', front: 'Physikalisches Prinzip des Generators?', back: 'Induktion: Leiter im Magnetfeld bewegt → Spannung $U_i=k\\,\\omega$ (proportional zur Drehzahl).' },
    { id: 'umkehrbar', front: 'Warum ist eine elektrische Maschine umkehrbar?', back: 'Motor und Generator nutzen denselben Aufbau und dieselbe Konstante $k$: angetrieben liefert der Motor Spannung.' },
    { id: 'gegen-emk', front: 'Was ist die Gegen-EMK?', back: 'Die im drehenden Anker induzierte Spannung $k\\omega$; sie wirkt der angelegten Spannung entgegen und begrenzt den Strom.' },
    { id: 'anlaufstrom', front: 'Anlaufstrom des Gleichstrommotors?', back: '$I_A=U/R_A$ (keine Gegen-EMK im Stillstand): z. B. 12 V / 0,5 Ω = 24 A.' },
    { id: 'drehfeld-formel', front: 'Drehfelddrehzahl?', back: '$n_s=60\\,f/p$ in min⁻¹ (50 Hz: p = 1: 3000, p = 2: 1500, p = 3: 1000).' },
    { id: 'schlupf', front: 'Schlupf?', back: '$s=(n_s-n)/n_s$; z. B. $n_s=1500$, $n=1440$ → 4 %.' },
    { id: 'asynchron-prinzip', front: 'Wie entsteht das Drehmoment im Asynchronmotor?', back: 'Drehfeld induziert im Läufer Spannung → Läuferstrom → Lorentzkraft → Drehung; nur bei Relativbewegung (Schlupf).' },
    { id: 'drehfeld-entstehung', front: 'Wie entsteht ein Drehfeld?', back: 'Drei um 120° versetzte Spulen werden mit drei um 120° verschobenen Strömen gespeist; die Felder addieren sich zu einem rotierenden Feld konstanter Stärke.' },
    { id: 'kommutator', front: 'Wozu dient der Kommutator?', back: 'Er polt den Ankerstrom nach einer halben Umdrehung um, damit das Drehmoment in gleicher Richtung wirkt.' },
  ],
};
