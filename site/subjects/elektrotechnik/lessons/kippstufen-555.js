export default {
  id: 'kippstufen-555',
  title: 'Kippschaltungen und der NE555',
  summary: 'Astabil, monostabil, bistabil: Wie Kippschaltungen Rechtecksignale und Zeitintervalle erzeugen, und wie ein NE555 mit zwei Widerständen und einem Kondensator zum Blinker oder Zeitgeber wird.',
  minutes: 30,
  needs: ['rc-glied', 'opv-schaltungen'],
  goals: [
    'Die drei Arten der [[kippschaltung|Kippstufe]] — astabil, monostabil, bistabil — unterscheiden',
    'Erklären, wie der [[timer-555|NE555]] mit den Schwellen ⅓ und ⅔ der Betriebsspannung arbeitet',
    'Frequenz und [[tastverhaeltnis|Tastverhältnis]] des astabilen 555 sowie die Zeit T des monostabilen berechnen',
    'Einen [[zeitkonstante|RC-Zeitgeber]] für Blinker (1 Hz) und Monoflop (2 s) dimensionieren',
  ],
  blocks: [
    {
      id: 'kippstufen-arten', type: 'text', title: 'Drei Sorten Kippstufen',
      md: String.raw`
Eine **[[kippschaltung|Kippschaltung]]** (auch *Multivibrator*) hat einen Ausgang, der zwischen zwei Zuständen „kippt" — high und low. Nach der Zahl der stabilen Zustände unterscheidet man drei Arten:

- **[[astabile-kippstufe|Astabil]]** ([astabile Kippstufe](wiki:Astabile Kippstufe|Multivibrator)): *kein* stabiler Zustand. Der Ausgang wechselt dauernd hin und her — ein selbstlaufender Rechteckgenerator, z. B. ein Blinker.
- **[[monostabile-kippstufe|Monostabil]]** ([monostabile Kippstufe](wiki:Monostabile Kippstufe), „Monoflop", engl. *one-shot*): *ein* stabiler Zustand. Ein Auslöseimpuls kippt sie für eine feste Zeit $T$ in den anderen Zustand, dann fällt sie von selbst zurück — ein Zeitgeber.
- **[[bistabile-kippstufe|Bistabil]]** ([bistabile Kippstufe](wiki:Bistabile Kippstufe|Flip-flop (electronics))): *zwei* stabile Zustände. Sie bleibt, wo sie ist, bis ein Impuls sie umschaltet — das [[flipflop|Flipflop]], die Grundzelle jedes Speichers (Etappe Digitaltechnik).

Die Zeit, die eine astabile oder monostabile Stufe in einem Zustand verbringt, legt ein [RC-Glied](wiki:RC-Glied|RC circuit) fest: Ein Kondensator wird über einen Widerstand geladen, bis eine Schwelle erreicht ist — und die [[zeitkonstante|Zeitkonstante]] $\tau = R\cdot C$ bestimmt, wie lange das dauert.`,
    },
    {
      id: 'ne555', type: 'text', title: 'Der NE555: ein Baustein für alle drei',
      md: String.raw`
Der **[[timer-555|NE555]]** ([NE555](wiki:NE555|555 timer IC)) wurde Anfang der 1970er-Jahre von [Hans Camenzind](wiki:Hans Camenzind|Hans Camenzind) bei [Signetics](wiki:Signetics|Signetics) entwickelt und ist bis heute einer der meistverkauften integrierten Schaltkreise.[^ti-ne555-datenblatt] Sein Innenleben ist einfach:

1. Ein [[spannungsteiler|Spannungsteiler]] aus drei gleichen Widerständen (daher „555") erzeugt die Schwellen $\tfrac13U_B$ und $\tfrac23U_B$.
2. Zwei [[komparator|Komparatoren]] vergleichen die Kondensatorspannung mit diesen Schwellen: *Trigger* (Pin 2) bei $\tfrac13U_B$, *Threshold* (Pin 6) bei $\tfrac23U_B$.
3. Ein SR-[[flipflop|Flipflop]] merkt sich das Ergebnis und steuert den **Ausgang** (Pin 3, bis 200 mA) und einen **Entladetransistor** (Pin 7).

Die beiden Schwellen ergeben zusammen eine **Hysterese** wie beim [Schmitt-Trigger](wiki:Schmitt-Trigger|Schmitt trigger) ([[schmitt-trigger]]) — deshalb schaltet der 555 sauber, ohne zu flattern.

**Astabil:** Der Kondensator lädt über $R_1+R_2$ von $\tfrac13U_B$ auf $\tfrac23U_B$ (Ausgang high). Dann kippt das Flipflop, der Entladetransistor leitet, und $C$ entlädt sich über $R_2$ zurück auf $\tfrac13U_B$ (Ausgang low). Dann beginnt es von vorn. Weil der Weg zwischen den Schwellen genau eine „Halbierung" des Abstands zur Zielspannung bedeutet ($e^{-t/\tau}=\tfrac12$), gilt

$$t_H = \ln 2\,(R_1+R_2)\,C \qquad t_L = \ln 2\,R_2\,C \qquad f = \frac{1}{t_H+t_L} = \frac{1{,}44}{(R_1+2R_2)\,C}$$

Das Tastverhältnis ist $\dfrac{t_H}{T} = \dfrac{R_1+R_2}{R_1+2R_2}$ — immer **über 50 %**, weil das Laden über den größeren Widerstand läuft.

**Monostabil:** Im Ruhezustand ist $C$ entladen und der Ausgang low. Ein kurzer Low-Impuls an Pin 2 setzt das Flipflop: Ausgang high, $C$ lädt über $R$ auf $\tfrac23U_B$ — das dauert

$$T = \ln 3\cdot R\,C \approx 1{,}1\,R\,C$$

danach kippt der Ausgang zurück und der Kondensator wird entladen.`,
    },
    {
      id: 'viz-555', type: 'viz', viz: 'timer555-lab', title: 'NE555-Labor: Blinker und Zeitgeber',
      params: { fTarget: 1, tMono: 2, UB: 9 },
      task: 'Zwei Ziele: (1) **Astabil:** Baue einen LED-Blinker mit $1\\,\\text{Hz} \\pm 5\\,\\%$ und einem Tastverhältnis zwischen 45 und 55 % — was muss für $R_1$ gegenüber $R_2$ gelten? (2) **Monostabil:** Stelle $T = 2\\,\\text{s} \\pm 5\\,\\%$ ein und löse mit dem Knopf aus. Beobachte, wie die Kondensatorspannung (Pin 6) zwischen den Schwellen läuft.',
    },
    {
      id: 'calc-f555', type: 'numeric', title: 'Astabile Frequenz',
      question: 'Ein astabiler 555 hat $R_1 = 1\\,\\text{k}\\Omega$, $R_2 = 10\\,\\text{k}\\Omega$ und $C = 1\\,\\mu\\text{F}$. Welche Frequenz in Hz?',
      answer: 68.6, tolerance: 0.7, unit: 'Hz',
      hint: '$f = 1{,}44/((R_1+2R_2)\\,C)$ — $R_1+2R_2 = 21\\,\\text{k}\\Omega$.',
      explain: '$f = 1{,}44/(21\\,000\\,\\Omega\\cdot10^{-6}\\,\\text{F}) = 68{,}6\\,\\text{Hz}$.',
    },
    {
      id: 'calc-duty555', type: 'numeric', title: 'Tastverhältnis',
      question: 'Welches Tastverhältnis (Anteil high an der Periode, in %) hat dieselbe Schaltung?',
      answer: 52.4, tolerance: 0.3, unit: '%',
      hint: '$\\dfrac{R_1+R_2}{R_1+2R_2} = \\dfrac{11}{21}$.',
      explain: '$11/21 = 0{,}524$ — knapp über 50 %. Je kleiner $R_1$ gegenüber $R_2$, desto näher kommt man an 50 %.',
    },
    {
      id: 'calc-mono555', type: 'numeric', title: 'Monostabile Zeit',
      question: 'Ein monostabiler 555 hat $R = 100\\,\\text{k}\\Omega$ und $C = 10\\,\\mu\\text{F}$. Wie lange bleibt der Ausgang high (in s)?',
      answer: 1.1, tolerance: 0.02, unit: 's',
      hint: '$T = 1{,}1\\cdot R\\cdot C$ mit $R C = 1\\,\\text{s}$.',
      explain: '$T = 1{,}1\\cdot 100\\,000\\,\\Omega\\cdot10\\cdot10^{-6}\\,\\text{F} = 1{,}1\\,\\text{s}$.',
    },
    {
      id: 'quiz-bistabil', type: 'quiz', title: 'Stabile Zustände',
      question: 'Welche Kippstufe hat **zwei** stabile Zustände und behält ihren Zustand, bis ein Impuls sie umschaltet?',
      options: [
        { text: 'Die bistabile Kippstufe (Flipflop).', correct: true, why: 'bi = zwei stabile Zustände — sie ist die Grundzelle für Speicher.' },
        { text: 'Die astabile Kippstufe.', why: 'astabil heißt: kein stabiler Zustand, sie schwingt dauernd.' },
        { text: 'Die monostabile Kippstufe.', why: 'mono = ein stabiler Zustand; der andere hält nur die Zeit $T$.' },
        { text: 'Der Komparator ohne Hysterese.', why: 'Der Komparator hat einen Ausgang, der direkt dem Eingangsvergleich folgt, keinen Speicher.' },
      ],
    },
    {
      id: 'quiz-duty', type: 'quiz', title: 'Warum nie unter 50 %?',
      question: 'Warum liegt das Tastverhältnis des einfachen astabilen 555 immer **über** 50 %?',
      options: [
        { text: 'Der Kondensator lädt über $R_1+R_2$, entlädt sich aber nur über $R_2$ — das Laden dauert länger.', correct: true, why: 'Daher $t_H=\\ln2\\,(R_1+R_2)C > t_L=\\ln2\\,R_2 C$.' },
        { text: 'Weil die obere Schwelle größer ist als die untere.', why: 'Beide Schwellen sind fest ($\\tfrac23U_B$, $\\tfrac13U_B$); sie beeinflussen Laden und Entladen gleich.' },
        { text: 'Weil der Ausgang mehr Strom liefern als aufnehmen kann.', why: 'Der Ausgang liefert und senkt bis zu 200 mA — das hat mit der Zeit nichts zu tun.' },
        { text: 'Das stimmt nicht: Mit $R_1 > R_2$ geht es auch darunter.', why: 'Mit größerem $R_1$ wird das Tastverhältnis nur noch größer.' },
      ],
    },
    {
      id: 'ord-555', type: 'order', title: 'Ein Zyklus des astabilen 555',
      prompt: 'Ordne die Schritte eines Schwingungszyklus.',
      items: [
        'C lädt über R₁ + R₂, der Ausgang ist high',
        'u_C erreicht ⅔ U_B: der Threshold-Komparator kippt das Flipflop',
        'Ausgang low, der Entladetransistor leitet',
        'C entlädt sich über R₂',
        'u_C erreicht ⅓ U_B: der Trigger-Komparator kippt das Flipflop zurück',
      ],
      explain: 'Danach sperrt der Entladetransistor wieder, der Ausgang wird high und das Laden beginnt von vorn.',
    },
    {
      id: 'mission-555', type: 'callout', tone: 'mission', title: 'Prüfung / Funkpraxis',
      md: String.raw`
**Prüfungsbezug:** Den NE555 selbst fragt der amtliche Katalog für Klasse E nicht ab; wichtig sind die dahinterliegenden Ideen — RC-Zeitkonstante (Etappe 3), Schwellen/Hysterese ([Schmitt-Trigger](wiki:Schmitt-Trigger|Schmitt trigger)) und Rechtecksignale mit Tastverhältnis (siehe Oberwellen und EMV: Rechtecksignale erzeugen Störungen bei Vielfachen der Frequenz).[^bnetza-pruefungsfragen-2024]

**Funkpraxis:** Mit dem 555 baust du in einer halben Stunde nützliche Kleinigkeiten fürs Shack: einen **CW-Übungsoszillator** (astabil, etwa 600–800 Hz, über einen Lautsprecher), einen **Sendezeit-Begrenzer** (monostabil, schaltet die Sendung nach z. B. 3 min ab — wie der Timeout-Timer von Relaisfunkstellen), einen Bakenblinker mit [Leuchtdiode](wiki:Leuchtdiode|Light-emitting diode) oder eine [Pulsweitenmodulation](wiki:Pulsweitenmodulation|Pulse-width modulation) zur Lüftersteuerung. Beachte: Schaltest du Lasten oder baust einen Nahbereichssender damit, erzeugt das Rechtecksignal Oberwellen — Abschirmung und Siebung lohnen sich.`,
    },
    {
      id: 'warn-555', type: 'callout', tone: 'warning', title: 'Typische Fehlvorstellungen',
      md: String.raw`
- *„Die Frequenz hängt von der Betriebsspannung ab."* — Beim 555 kaum: Schwellen und Ladespannung sind beide proportional zu $U_B$, die Spannung kürzt sich heraus. Das ist seine Stärke.
- *„Mit $R_1$ und $R_2$ lassen sich beliebige Tastverhältnisse einstellen."* — Beim Standardschaltbild nur zwischen 50 % und 100 %. Für weniger braucht man eine Diode parallel zu $R_2$ oder eine andere Beschaltung.
- *„Die Zeitformeln sind exakt."* — Sie gelten für ideale Bauteile; Elektrolytkondensatoren haben $\pm20\,\%$ Toleranz und Leckströme (bei großen $R$ besonders), reale Zeiten weichen deshalb ab.
- *„Monostabil heißt: Der Ausgang bleibt high."* — Er bleibt nur für die Zeit $T$ high, dann fällt er von selbst zurück.`,
    },
    {
      id: 'german-555', type: 'callout', tone: 'german', title: 'Deutsch ↔ English',
      md: `
<table>
<tr><th>Deutsch</th><th>English</th></tr>
<tr><td>Kippstufe, Kippschaltung</td><td>multivibrator</td></tr>
<tr><td>astabil / monostabil / bistabil</td><td>astable / monostable (one-shot) / bistable</td></tr>
<tr><td>Tastverhältnis</td><td>duty cycle</td></tr>
<tr><td>Schwelle, Hysterese</td><td>threshold, hysteresis</td></tr>
<tr><td>Entladetransistor</td><td>discharge transistor</td></tr>
<tr><td>Auslöseimpuls</td><td>trigger pulse</td></tr>
<tr><td>Zeitgeber</td><td>timer</td></tr>
</table>`,
    },
    {
      id: 'recall-555', type: 'recall',
      prompt: 'Beschreibe, wie im **astabilen 555** aus einem RC-Glied und den zwei Schwellen $\\tfrac13U_B$ und $\\tfrac23U_B$ eine dauernde Schwingung entsteht. Welche Widerstände bestimmen High- und Low-Zeit?',
      answer: 'Der Kondensator lädt über R₁+R₂ von ⅓U_B auf ⅔U_B (Ausgang high, t_H = ln2·(R₁+R₂)·C). Beim Erreichen von ⅔U_B kippt das Flipflop, der Entladetransistor leitet und C entlädt sich über R₂ bis ⅓U_B (Ausgang low, t_L = ln2·R₂·C). Bei ⅓U_B kippt es zurück und alles beginnt von vorn. Frequenz f = 1,44/((R₁+2R₂)·C).',
      hints: ['Welche Spannung hat C an den Umschaltpunkten?', 'Durch welche Widerstände fließt der Ladestrom, durch welche der Entladestrom?'],
      cards: ['555-astabil', '555-schwellen'],
    },
  ],
  cards: [
    { id: 'kipp-arten', front: 'Astabil, monostabil, bistabil: wie viele stabile Zustände?', back: 'astabil 0 (schwingt), monostabil 1 (kippt nur für Zeit $T$), bistabil 2 (Flipflop, Speicher).' },
    { id: '555-schwellen', front: 'Schaltschwellen des NE555?', back: '$\\tfrac13U_B$ (Trigger) und $\\tfrac23U_B$ (Threshold) — aus drei gleichen Widerständen im Teiler.' },
    { id: '555-astabil', front: 'Frequenz des astabilen 555?', back: '$f = \\dfrac{1{,}44}{(R_1+2R_2)\\,C}$' },
    { id: '555-zeiten', front: 'High- und Low-Zeit des astabilen 555?', back: '$t_H = \\ln2\\,(R_1+R_2)\\,C$, $t_L = \\ln2\\,R_2\\,C$.' },
    { id: '555-duty', front: 'Tastverhältnis des astabilen 555?', back: '$\\dfrac{R_1+R_2}{R_1+2R_2} > 50\\,\\%$' },
    { id: '555-mono', front: 'Zeit des monostabilen 555?', back: '$T = 1{,}1\\,R\\,C$ (genau $\\ln 3\\cdot RC$).' },
    { id: '555-hysterese', front: 'Warum ist der 555 ein „Schmitt-Trigger-artiges" Bauteil?', back: 'Zwei Schwellen (⅓ und ⅔ $U_B$) ergeben eine Hysterese: Er schaltet sauber, ohne am Schwellwert zu flattern.' },
    { id: '555-last', front: 'Wie viel Strom kann der Ausgang des NE555 liefern/aufnehmen?', back: 'Bis zu 200 mA (Datenblatt) — ein LED oder kleines Relais direkt antreiben.' },
    { id: '555-druck', front: 'Hängt die Frequenz eines 555-Oszillators von der Betriebsspannung ab?', back: 'Näherungsweise ja: Schwellen und Ladespannung sind beide proportional zu $U_B$.' },
    { id: 'monoflop-zweck', front: 'Wofür nutzt man ein Monoflop?', back: 'Als Zeitgeber/Impulsverlängerer: ein Auslöseimpuls erzeugt einen Ausgangsimpuls fester Dauer.' },
  ],
};
