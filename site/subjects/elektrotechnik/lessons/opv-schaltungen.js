export default {
  id: 'opv-schaltungen',
  title: 'Invertierender, nichtinvertierender Verstärker, Komparator, Schmitt-Trigger',
  summary: 'Zwei Widerstände machen aus dem OPV einen Verstärker mit exakt einstellbarer Verstärkung. Dazu Summierer, Integrator, Komparator — und der Schmitt-Trigger, der verrauschte Signale sauber schaltet.',
  minutes: 35,
  needs: ['operationsverstaerker'],
  goals: [
    'Die Verstärkung des [[invertierender-verstaerker|invertierenden]] ($V = -R_2/R_1$) und des [[nichtinvertierender-verstaerker|nichtinvertierenden Verstärkers]] ($V = 1 + R_2/R_1$) mit den Goldenen Regeln herleiten und berechnen',
    'Den **virtuellen Nullpunkt** am invertierenden Eingang erklären',
    'Summierer, [[spannungsfolger|Spannungsfolger]] und Integrator als Varianten der Grundschaltungen erkennen',
    'Einen [[komparator|Komparator]] vom [[schmitt-trigger|Schmitt-Trigger]] unterscheiden und die Schwellen $\\pm U_\\text{sat}\\,R_1/(R_1+R_2)$ berechnen',
    'Verstärkungen hintereinandergeschalteter Stufen multiplizieren',
  ],
  blocks: [
    {
      id: 'idee', type: 'text', title: 'Zwei Widerstände legen die Verstärkung fest',
      md: `
Mit den **zwei Goldenen Regeln** der letzten Lektion ($U_+ = U_-$ und $I_\\pm = 0$) lassen sich die wichtigsten [Operationsverstärker](wiki:Operationsverstärker|Operational amplifier)-Schaltungen im Kopf lösen. Der Trick bei beiden Verstärkern: Ein Teil der Ausgangsspannung wird über einen [Spannungsteiler](wiki:Spannungsteiler|Voltage divider) aus $R_1$ und $R_2$ auf den invertierenden Eingang zurückgeführt ([Gegenkopplung](wiki:Gegenkopplung|Negative feedback)).

**Invertierender Verstärker:** Das Eingangssignal $u_1$ kommt über $R_1$ an den „−"-Eingang, der „+"-Eingang liegt an Masse, und $R_2$ führt vom Ausgang zurück zum „−"-Eingang. Wegen $U_+ = 0$ gilt $U_- = 0$: Der „−"-Eingang ist **virtuelle Masse**, der **virtuelle Nullpunkt** (siehe [virtuelle Masse](wiki:Virtuelle Masse (Elektronik)|Virtual ground)). Dort liegt zwar kein Potenzial, aber auch keine feste Verbindung zur Masse. Dann fließt durch $R_1$ der Strom $I = u_1/R_1$ — und weil kein Strom in den Eingang fließt, muss er komplett durch $R_2$ weiter. Das [Ohmsche Gesetz](wiki:Ohmsches Gesetz|Ohm's law) liefert $u_2 = 0 - I\\,R_2$:

$$V = \\frac{u_2}{u_1} = -\\frac{R_2}{R_1}$$

Das Minus bedeutet: Der Ausgang ist gegenüber dem Eingang um **180° gedreht**. Der Eingangswiderstand der Schaltung ist $R_1$ (der virtuelle Nullpunkt wirkt wie Masse).

**Nichtinvertierender Verstärker:** Das Signal geht direkt an den „+"-Eingang, $R_1$ liegt zwischen „−" und Masse, $R_2$ zwischen Ausgang und „−". Der Teiler liefert $U_- = u_2\\,\\dfrac{R_1}{R_1+R_2}$, und wegen $U_- = U_+ = u_1$ folgt:

$$V = 1 + \\frac{R_2}{R_1}$$

Die Verstärkung ist immer mindestens **1** und das Ausgangssignal **gleichphasig**. Der Eingangswiderstand ist praktisch unendlich (das Signal sieht nur den OPV-Eingang). Mit $R_2 = 0$ und $R_1 \\to \\infty$ wird daraus der **Spannungsfolger** mit $V = 1$.[^et5-ek-opv-invertierend]`,
    },
    {
      id: 'demo-verstaerker', type: 'viz', viz: 'opamp-lab', title: 'OPV-Labor: Verstärker bauen',
      intro: 'Wähle die Schaltung, stelle die Widerstände ein und beobachte Ein- und Ausgang am Oszilloskop. Der Schaltplan zeigt Strom und Potenzial.',
      params: { modes: ['inv', 'noninv', 'sum', 'integ'], mode: 'noninv', goals: ['inv10', 'noninv11'], rails: 12 },
      task: 'Baue **Verstärkung −10** (Schaltfläche „Invertierend") und **Verstärkung +11** (Schaltfläche „Nichtinvertierend") auf. Dabei darf der Ausgang nicht übersteuern: Verkleinere die Eingangsamplitude, falls nötig. Probiere danach Summierer und Integrator aus.',
    },
    {
      id: 'video', type: 'video', youtube: 'K1NQmg0Z3-I', label: 'Diese OPV-Grundschaltungen solltest du kennen!', channel: 'Schrack for Students', minutes: 11,
      why: 'Zehn Minuten Überblick über die Grundschaltungen; die Verstärkungsformeln aus dem Text kehren hier wieder.',
    },
    {
      id: 'varianten', type: 'text', title: 'Summierer und Integrator',
      md: `
Ersetzt man in der invertierenden Schaltung den Widerstand $R_2$ durch etwas anderes — oder legt man mehrere Eingänge zusammen —, erhält man weitere nützliche Bausteine. Alle beruhen auf dem virtuellen Nullpunkt.

**Summierer** (Addierer): Mehrere Eingangsspannungen speisen über eigene Widerstände den „−"-Eingang. Die Teilströme addieren sich am virtuellen Nullpunkt (Knotenregel, siehe [Kirchhoff](wiki:Gustav Robert Kirchhoff|Gustav Kirchhoff)):
$$u_\\text{aus} = -R_f\\left(\\frac{u_1}{R_1} + \\frac{u_2}{R_2}\\right)$$
Bei gleichen Widerständen ergibt sich $u_\\text{aus} = -(u_1 + u_2)$ — Grundlage von Mischpulten und Digital-Analog-Wandlern.

**Integrator:** Wird $R_2$ durch einen Kondensator $C$ ersetzt, lädt der Strom $u_1/R$ ihn auf, und die Ausgangsspannung ist das *Zeitintegral* des Eingangs:
$$u_2(t) = -\\frac{1}{RC}\\int u_1(t)\\,dt$$
Ein Rechtecksignal wird damit zum Dreieck: bei Amplitude $A$ und Periode $T$ entsteht ein Dreieck mit der Spitze-Spitze-Spannung $A\\,T/(2RC)$. Solche Schaltungen standen in den frühen [Analogrechnern](wiki:Analogrechner|Analog computer) im Zentrum. Praktisch muss man den Gleichspannungsfehler im Zaum halten, sonst driftet der Ausgang in die Sättigung — im Labor siehst du es, wenn $RC$ zu klein ist.`,
    },
    {
      id: 'komparator', type: 'text', title: 'Komparator und Schmitt-Trigger',
      md: `
Ohne Rückkopplung vergleicht der OPV nur: Ist $U_+ > U_-$, springt der Ausgang an die obere Grenze, sonst an die untere — ein [Komparator](wiki:Komparator (Analogtechnik)|Comparator). Das Problem: Bei einem **verrauschten** Signal, das langsam durch die Schwelle läuft, wackelt die Differenz um null herum, und der Ausgang schaltet mehrfach hin und her.

Abhilfe schafft die **[Mitkopplung](wiki:Positive Rückkopplung|Positive feedback)**. Beim **[Schmitt-Trigger](wiki:Schmitt-Trigger|Schmitt trigger)** (erfunden von [Otto Schmitt](wiki:Otto Schmitt (Erfinder)|Otto Schmitt)) führt ein Teiler aus $R_2$ und $R_1$ einen Teil der Ausgangsspannung auf den **nichtinvertierenden** Eingang zurück. Damit hat die Schaltung **zwei** Schaltschwellen:

$$U_{\\text{Schwelle}} = \\pm\\,U_\\text{sat}\\,\\frac{R_1}{R_1 + R_2}$$

Beim Beispiel $R_1 = 10\\,\\text{k}\\Omega$, $R_2 = 100\\,\\text{k}\\Omega$ und $U_\\text{sat} = 12\\,\\text{V}$ liegen die Schwellen bei $\\pm 1{,}09\\,\\text{V}$. Steht der Ausgang oben (+12 V), kippt er erst, wenn der Eingang unter **−1,09 V** fällt, und umgekehrt. Dazwischen — im **Hystereseband** der Breite 2,18 V — bleibt der Ausgang unverändert. Dieses „Gedächtnis" heißt [Hysterese](wiki:Hysterese|Hysteresis). Solange das Rauschen kleiner als die halbe Hysterese ist, schaltet die Schaltung nur **einmal** je Flanke.

Anwendungen: Entprellung von Tastern, Signalaufbereitung (aus Sinus wird Rechteck), Pegelwandler und eine saubere Rauschsperre ([Squelch](wiki:Rauschsperre|Squelch)) im Funkgerät, die bei schwachem Signal nicht flattert.`,
    },
    {
      id: 'demo-schmitt', type: 'viz', viz: 'schmitt-lab', title: 'Schmitt-Trigger-Labor',
      intro: 'Ein 1-kHz-Sinus mit überlagertem Rauschen (linke Achse) geht in den Schmitt-Trigger. Das farbige Band ist das Hystereseband, die kräftige Kurve der Ausgang (rechte Achse). Mit kleinem $R_1$ (kleine Hysterese) schaltet der Ausgang mehrfach pro Flanke.',
      params: { rails: 12 },
      task: 'Stelle das Verhältnis $R_1/R_2$ so ein, dass der Ausgang bei Rauschen von mindestens 0,5 V **genau zwei Flanken je Periode** liefert. Beobachte dabei, wo das Hystereseband die Störung gerade verdeckt.',
    },
    {
      id: 'mission', type: 'callout', tone: 'mission', title: 'Prüfung und Funkpraxis',
      md: `
Operationsverstärker sind **kein Stoff der Klasse-E-Prüfung**; der Katalog fragt nur den Funktionsblock „Verstärker" (**ED401**–**ED403**), zum Beispiel was Leistungsverstärkung ist.[^bnetza-pruefungsfragen-2024] Die Schaltungen dieser Lektion helfen dir aber, ein Funkgerät zu verstehen: Ein **Mikrofonverstärker** lässt sich mit einer nichtinvertierenden Stufe bauen; seine Bandbreite zur Sprachübertragung reichen muss (Katalog **EF308**: ca. 2,5 kHz für gute Sprachverständlichkeit) — bei einem OPV mit 1 MHz GBW ist das selbst bei Verstärkung 100 mit 10 kHz erfüllt. Der **Schmitt-Trigger** steckt in Tastenentprellern, Pegelwandlern und Rauschsperren.`,
    },
    {
      id: 'calc-gain', type: 'numeric', title: 'Verstärkung invertierend',
      question: 'Beim invertierenden Verstärker ist $R_1 = 10\\,\\text{k}\\Omega$ und $R_2 = 100\\,\\text{k}\\Omega$. Wie groß ist die Verstärkung $V$? (mit Vorzeichen)',
      answer: -10, tolerance: 0.05,
      hint: '$V = -R_2/R_1$',
      explain: '$V = -100\\,\\text{k}\\Omega/10\\,\\text{k}\\Omega = -10$. Das Minus steht für die Phasendrehung um 180°.',
    },
    {
      id: 'calc-gain-ni', type: 'numeric', title: 'Verstärkung nichtinvertierend',
      question: 'Dieselben Widerstände ($R_1 = 10\\,\\text{k}\\Omega$ nach Masse, $R_2 = 100\\,\\text{k}\\Omega$ als Rückkopplung) im **nichtinvertierenden** Verstärker. Wie groß ist $V$?',
      answer: 11, tolerance: 0.05,
      hint: '$V = 1 + R_2/R_1$',
      explain: '$V = 1 + 100/10 = 11$. Der nichtinvertierende Verstärker liefert immer „eins mehr" als der invertierende (im Betrag) — und keine Phasendrehung.',
    },
    {
      id: 'calc-ss', type: 'numeric', title: 'Ausgangsamplitude',
      question: 'Ein invertierender Verstärker mit $V = -10$ bekommt am Eingang $100\\,\\text{mV}_\\text{SS}$ (Spitze-Spitze). Wie groß ist die Ausgangsspannung in V (Spitze-Spitze, Betrag)?',
      answer: 1, tolerance: 0.01, unit: 'V',
      hint: 'Der Betrag der Spannung wird mit 10 multipliziert; das Vorzeichen dreht nur die Phase.',
      explain: '$100\\,\\text{mV}\\cdot 10 = 1\\,\\text{V}_\\text{SS}$, gegenüber dem Eingang um 180° gedreht.',
    },
    {
      id: 'calc-kaskade', type: 'numeric', title: 'Kaskade',
      question: 'Ein Mikrofon liefert $5\\,\\text{mV}$. Es folgen zwei Verstärkerstufen mit $V_1 = 10$ und $V_2 = 20$. Wie groß ist die Ausgangsspannung?',
      answer: 1, tolerance: 0.01, unit: 'V',
      hint: 'Verstärkungen hintereinandergeschalteter Stufen multiplizieren sich.',
      explain: '$V_\\text{ges} = 10\\cdot 20 = 200$ und $5\\,\\text{mV}\\cdot 200 = 1\\,\\text{V}$. In Dezibel würde man die Werte addieren (20 dB + 26 dB = 46 dB).',
    },
    {
      id: 'calc-schmitt', type: 'numeric', title: 'Schmitt-Trigger-Schwelle',
      question: 'Schmitt-Trigger mit $R_1 = 10\\,\\text{k}\\Omega$, $R_2 = 100\\,\\text{k}\\Omega$ und $U_\\text{sat} = \\pm 12\\,\\text{V}$. Bei welcher Spannung (Betrag) liegen die Schaltschwellen?',
      answer: 1.09, tolerance: 0.02, unit: 'V',
      hint: '$U_\\text{Schwelle} = U_\\text{sat}\\cdot R_1/(R_1 + R_2)$',
      explain: '$12\\,\\text{V}\\cdot 10/110 = 1{,}09\\,\\text{V}$. Die Hysterese (Abstand der Schwellen) beträgt $2{,}18\\,\\text{V}$.',
    },
    {
      id: 'quiz-folger', type: 'quiz', title: 'Welche Verstärkung hat der Spannungsfolger?',
      question: 'Welche Spannungsverstärkung hat ein Spannungsfolger (Ausgang direkt mit dem „−"-Eingang verbunden)?',
      options: [
        { text: '1', correct: true, why: '$U_- = U_\\text{aus}$ und $U_+ = U_-$, also $U_\\text{aus} = U_+$.' },
        { text: '0', correct: false, why: 'Der Ausgang folgt dem Eingang, er ist nicht null.' },
        { text: '$A_0$ (etwa $10^5$)', correct: false, why: 'Das ist die Leerlaufverstärkung, die Gegenkopplung reduziert sie auf 1.' },
        { text: '−1', correct: false, why: 'Der Folger dreht die Phase nicht (Eingang am nichtinvertierenden Anschluss).' },
      ],
    },
    {
      id: 'quiz-virt', type: 'quiz', title: 'Der virtuelle Nullpunkt',
      question: 'Welche Aussagen über den „−"-Eingang des invertierenden Verstärkers sind richtig?',
      options: [
        { text: 'Er liegt (fast) auf dem Potenzial der Masse, ist aber nicht direkt mit ihr verbunden.', correct: true, why: 'Der OPV regelt $U_- = U_+ = 0$; die Verbindung zur Masse besteht nur im Potenzial, nicht als Leitung.' },
        { text: 'Der Strom durch $R_1$ fließt vollständig durch $R_2$.', correct: true, why: 'Der Eingang nimmt keinen Strom auf (Goldene Regel 2).' },
        { text: 'Er ist fest mit Masse verbunden, deshalb ist die Verstärkung null.', correct: false, why: 'Bei fester Verbindung könnte der Strom nach Masse abfließen; der Verstärker würde nicht funktionieren.' },
        { text: 'Dort liegt das Eingangssignal $u_1$ voll an.', correct: false, why: 'Das Signal fällt komplett an $R_1$ ab, weil $U_-\\approx 0$.' },
      ],
    },
    {
      id: 'quiz-rein', type: 'quiz', title: 'Wer belastet die Quelle?',
      question: 'Eine Signalquelle mit hohem Innenwiderstand soll möglichst wenig belastet werden. Welche Schaltung passt?',
      options: [
        { text: 'Nichtinvertierender Verstärker (oder Folger)', correct: true, why: 'Das Signal liegt direkt am OPV-Eingang, der Eingangswiderstand ist sehr hoch.' },
        { text: 'Invertierender Verstärker', correct: false, why: 'Sein Eingangswiderstand ist $R_1$, die Quelle muss diesen Strom liefern.' },
        { text: 'Summierer', correct: false, why: 'Jeder Eingang sieht seinen Widerstand nach Masse (virtuelle Masse).' },
        { text: 'Integrator', correct: false, why: 'Der Eingangswiderstand ist $R$.' },
      ],
    },
    {
      id: 'match-schaltungen', type: 'match', title: 'Schaltung und Kenngröße',
      prompt: 'Ordne die Schaltung ihrer Eigenschaft zu.',
      pairs: [['Invertierender Verstärker', '$V=-R_2/R_1$, Phase 180°'], ['Nichtinvertierender Verstärker', '$V=1+R_2/R_1$, gleichphasig'], ['Spannungsfolger', '$V=1$, Impedanzwandler'], ['Integrator', 'Kondensator in der Rückführung, Rechteck wird Dreieck'], ['Schmitt-Trigger', 'Mitkopplung, zwei Schwellen, Hysterese'], ['Komparator', 'ohne Rückkopplung, Ausgang nur oben oder unten']],
    },
    {
      id: 'order-schmitt', type: 'order', title: 'Ein Zyklus des Schmitt-Triggers',
      prompt: 'Der Ausgang steht auf +$U_\\text{sat}$. Die Eingangsspannung (invertierender Schmitt-Trigger) beginnt zu steigen und später wieder zu fallen. Ordne die Ereignisse.',
      items: [
        'Eingangsspannung steigt, der Ausgang bleibt oben (obere Schwelle noch nicht erreicht)',
        'Eingang überschreitet die obere Schwelle $+U_\\text{Schwelle}$: Der Ausgang kippt nach $-U_\\text{sat}$',
        'Dabei springt auch die Schwelle auf $-U_\\text{Schwelle}$ (Mitkopplung)',
        'Der Eingang fällt wieder, bleibt aber im Hystereseband: Der Ausgang bleibt unten',
        'Erst bei Unterschreiten von $-U_\\text{Schwelle}$ kippt der Ausgang zurück nach $+U_\\text{sat}$',
      ],
      explain: 'Die Schwelle hängt vom Zustand des Ausgangs ab: Das ist die Hysterese — ein einfaches Ein-Bit-Gedächtnis.',
    },
    {
      id: 'warning', type: 'callout', tone: 'warning', title: 'Typische Fehlvorstellung',
      md: `
„Ein Komparator liefert beim Durchlaufen der Schwelle genau eine saubere Flanke." — Nur bei einem **rauschfreien** Signal. Reale Signale haben Rauschen, und direkt an der Schwelle entscheidet jedes Mikrovolt Störung über den Zustand: Der Ausgang flattert. Erst die Hysterese eines Schmitt-Triggers macht daraus eine saubere Flanke. Ein weiterer Irrtum: „Der nichtinvertierende Verstärker kann dämpfen" — nein, $V = 1 + R_2/R_1 \\geq 1$. Zum Abschwächen braucht man einen Spannungsteiler oder den invertierenden Typ mit $R_2 < R_1$.`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>Deutsch</th><th>English</th><th>Notiz</th></tr>
<tr><td>invertierender Verstärker</td><td>inverting amplifier</td><td>$V=-R_2/R_1$</td></tr>
<tr><td>nichtinvertierender Verstärker</td><td>non-inverting amplifier</td><td>$V=1+R_2/R_1$</td></tr>
<tr><td>Spannungsfolger</td><td>voltage follower, buffer</td><td></td></tr>
<tr><td>virtueller Nullpunkt, virtuelle Masse</td><td>virtual ground</td><td>$U_-\\approx 0$</td></tr>
<tr><td>Summierer</td><td>summing amplifier</td><td></td></tr>
<tr><td>Integrator</td><td>integrator</td><td></td></tr>
<tr><td>Komparator</td><td>comparator</td><td></td></tr>
<tr><td>Schmitt-Trigger</td><td>Schmitt trigger</td><td>Mitkopplung</td></tr>
<tr><td>Hysterese</td><td>hysteresis</td><td>Abstand der Schwellen</td></tr></table>`,
    },
    {
      id: 'recall-virtuell', type: 'recall', title: 'Erkläre es in eigenen Worten',
      prompt: 'Warum ist der „virtuelle Nullpunkt" am invertierenden Eingang so nützlich? Zeige damit kurz, warum der invertierende Verstärker $V = -R_2/R_1$ hat.',
      answer: 'Durch die Gegenkopplung regelt der OPV $U_- = U_+ = 0$, der invertierende Eingang liegt also (fast) auf Massepotenzial, ohne mit der Masse verbunden zu sein. Dadurch fällt die gesamte Eingangsspannung $u_1$ an $R_1$ ab: $I = u_1/R_1$. Weil der Eingang keinen Strom aufnimmt, fließt derselbe Strom durch $R_2$, und es gilt $u_2 = -I\\,R_2 = -(R_2/R_1)\\,u_1$. Die Verstärkung hängt nur von den beiden Widerständen ab; zusätzlich lassen sich mehrere Eingänge einfach addieren, weil sich die Ströme am virtuellen Nullpunkt summieren.',
      hints: ['Welches Potenzial hat der „−"-Eingang wegen Goldener Regel 1?', 'Wohin fließt der Strom durch $R_1$, wenn der Eingang keinen Strom aufnimmt?'],
      cards: ['opvs-invertierend', 'opvs-virtuell', 'opvs-summierer'],
    },
    {
      id: 'deep-schwellen', type: 'callout', tone: 'deep', title: 'Die Schwellen des Schmitt-Triggers herleiten',
      md: `
Beim invertierenden Schmitt-Trigger liegt das Eingangssignal am „−"-Eingang, der „+"-Eingang bekommt über den Teiler $R_1$ (nach Masse) und $R_2$ (vom Ausgang) die Spannung $U_+ = u_\\text{aus}\\,R_1/(R_1+R_2)$. Der Ausgang kippt, wenn der Eingang $U_+$ kreuzt. Steht $u_\\text{aus}$ bei $+U_\\text{sat}$, liegt die Schwelle bei $+U_\\text{sat}R_1/(R_1+R_2)$, steht er bei $-U_\\text{sat}$, bei $-U_\\text{sat}R_1/(R_1+R_2)$. Die Schaltung ist jetzt eine Mitkopplung — der Ausgang beeinflusst den Vergleichspunkt — und die Goldene Regel $U_+=U_-$ gilt **nicht** mehr. Bei der Variante mit dem Signal am „+"-Eingang (nichtinvertierender Schmitt-Trigger) rechnet man dagegen mit $\\pm U_\\text{sat}\\,R_1/R_2$.`,
    },
  ],
  cards: [
    { id: 'opvs-invertierend', front: 'Invertierender Verstärker: Verstärkung, Phase, Eingangswiderstand?', back: '$V=-R_2/R_1$; Phase 180°; Eingangswiderstand $R_1$.' },
    { id: 'opvs-nichtinvertierend', front: 'Nichtinvertierender Verstärker: Verstärkung, Phase, Eingangswiderstand?', back: '$V=1+R_2/R_1$; gleichphasig; Eingangswiderstand sehr hoch.' },
    { id: 'opvs-folger', front: 'Spannungsfolger: Verstärkung und Zweck?', back: '$V=1$; hoher Eingangs-, niedriger Ausgangswiderstand — Impedanzwandler/Puffer.' },
    { id: 'opvs-virtuell', front: 'Virtueller Nullpunkt (virtuelle Masse)?', back: 'Beim invertierenden Verstärker liegt der „−"-Eingang auf dem Potenzial der Masse, ohne mit ihr verbunden zu sein ($U_-=U_+=0$).' },
    { id: 'opvs-summierer', front: 'Summierer: Ausgangsspannung?', back: '$u_\\text{aus} = -R_f\\left(\\frac{u_1}{R_1}+\\frac{u_2}{R_2}+\\dots\\right)$ — die Teilströme addieren sich am virtuellen Nullpunkt.' },
    { id: 'opvs-integrator', front: 'Integrator: Schaltung und Ausgang?', back: 'Kondensator statt $R_2$: $u_2(t)=-\\frac1{RC}\\int u_1\\,dt$; Rechteck wird Dreieck.' },
    { id: 'opvs-komparator', front: 'Komparator: Funktion und Schwäche?', back: 'OPV ohne Rückkopplung: Ausgang oben, wenn $U_+>U_-$, sonst unten. Bei verrauschtem Signal flattert der Ausgang an der Schwelle.' },
    { id: 'opvs-schmitt', front: 'Schmitt-Trigger: Prinzip und Schwellen?', back: 'Mitkopplung (Teiler vom Ausgang auf „+"): zwei Schwellen $\\pm U_\\text{sat}\\,R_1/(R_1+R_2)$ mit Hysterese; schaltet bei verrauschtem Signal nur einmal.' },
    { id: 'opvs-schmitt-rechnen', front: 'Schmitt-Trigger, $R_1=10\\,\\text{k}\\Omega$, $R_2=100\\,\\text{k}\\Omega$, $U_\\text{sat}=12\\,\\text{V}$: Schwellen?', back: '$\\pm12\\,\\text{V}\\cdot 10/110=\\pm1{,}09\\,\\text{V}$; Hysterese 2,18 V.' },
    { id: 'opvs-hysterese', front: 'Was bedeutet Hysterese beim Schmitt-Trigger?', back: 'Die Schaltschwelle hängt vom Zustand des Ausgangs ab (zwei Schwellen); zwischen ihnen behält der Ausgang seinen Zustand.' },
    { id: 'opvs-kaskade', front: 'Gesamtverstärkung zweier Stufen mit $V_1$ und $V_2$?', back: '$V_\\text{ges}=V_1\\cdot V_2$ (in dB: Summe der dB-Werte).' },
  ],
};
