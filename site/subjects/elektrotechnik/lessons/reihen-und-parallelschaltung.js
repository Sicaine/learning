export default {
  id: 'reihen-und-parallelschaltung',
  title: 'Reihen-, Parallel- und gemischte Schaltung',
  summary: 'Aus mehreren Widerständen wird einer: Wie sich Widerstände in Reihe und parallel zusammenfassen lassen — und warum eine Parallelschaltung immer „leichter" fließt als jeder ihrer Zweige allein.',
  minutes: 30,
  goals: [
    'Den Gesamtwiderstand einer [[reihenschaltung|Reihenschaltung]] ($R_\\text{ges} = R_1 + R_2 + \\dots$) berechnen',
    'Den Gesamtwiderstand einer [[parallelschaltung|Parallelschaltung]] über die Leitwerte und mit der Zwei-Widerstände-Formel berechnen',
    'Begründen, warum $R_\\text{ges}$ einer Parallelschaltung immer kleiner ist als der kleinste Einzelwiderstand',
    'Eine [[gemischte-schaltung|gemischte Schaltung]] Schritt für Schritt vereinfachen und Teilspannungen sowie Teilströme bestimmen',
    'Einen gewünschten Widerstandswert aus Werten der [[normreihe-e12|E12-Reihe]] zusammenbauen',
  ],
  needs: ['kirchhoff'],
  blocks: [
    {
      id: 'idee', type: 'text', title: 'Ein Weg oder viele Wege',
      md: `
Bisher gab es einen [[elektrischer-widerstand|Widerstand]] ([Widerstand](wiki:Elektrischer Widerstand|Electrical resistance) als Größe) und eine Quelle. Reale Schaltungen bestehen aus vielen Bauteilen, die nur auf zwei Arten verbunden sein können — alles andere sind Kombinationen davon:

- **[Reihenschaltung](wiki:Reihenschaltung|Series and parallel circuits):** Die Bauteile hängen *hintereinander* an einem einzigen Weg. Es gibt keine Abzweigung, also fließt durch alle derselbe Strom. Stell dir einen langen, an mehreren Stellen verengten Gartenschlauch vor: Jede Engstelle bremst, die Bremswirkungen addieren sich.
- **[Parallelschaltung](wiki:Parallelschaltung|Series and parallel circuits):** Die Bauteile liegen *nebeneinander* an denselben zwei Knoten. Der Strom hat mehrere Wege zur Auswahl und teilt sich auf. Das ist wie eine Autobahn mit mehreren Fahrspuren: Mit jeder zusätzlichen Spur kommt mehr Verkehr durch, der Gesamtwiderstand sinkt.

Wissen musst du dafür nur das, was du schon aus der [Knotenregel und Maschenregel](wiki:Kirchhoffsche Regeln|Kirchhoff's circuit laws) kennst: In der Reihenschaltung gibt es keinen Knoten, also ist der Strom überall gleich. In der Parallelschaltung liegen alle Zweige an denselben zwei Knoten, also ist die Spannung überall gleich.[^kuphaldt-vol1-ch5]`,
    },
    {
      id: 'reihe', type: 'text', title: 'Reihenschaltung: Widerstände addieren sich',
      md: `
Durch alle Bauteile fließt derselbe Strom $I$. An jedem fällt nach dem [Ohmschen Gesetz](wiki:Ohmsches Gesetz|Ohm's law) von [Georg Simon Ohm](wiki:Georg Simon Ohm|Georg Ohm) die Spannung $U_k = R_k\\cdot I$ ab. Die [Maschenregel](wiki:Kirchhoffsche Regeln|Kirchhoff's circuit laws) sagt, dass die Teilspannungen zusammen die Quellenspannung ergeben:

$$U = U_1 + U_2 + \\dots = (R_1 + R_2 + \\dots)\\cdot I \\quad\\Rightarrow\\quad R_\\text{ges} = R_1 + R_2 + R_3 + \\dots$$

Der Gesamtwiderstand ist also immer **größer als der größte Einzelwiderstand**. Weil derselbe Strom überall fließt, teilt sich die Spannung im Verhältnis der Widerstände: Der größte Widerstand bekommt den größten Anteil (daraus wird in der nächsten Lektion der [[spannungsteiler|Spannungsteiler]]).

Beispiel: $R_1 = 1\\,\\mathrm{k\\Omega}$ und $R_2 = 2\\,\\mathrm{k\\Omega}$ an $12\\,\\mathrm{V}$. Dann ist $R_\\text{ges} = 3\\,\\mathrm{k\\Omega}$, $I = 12\\,\\mathrm{V}/3\\,\\mathrm{k\\Omega} = 4\\,\\mathrm{mA}$, $U_1 = 4\\,\\mathrm{V}$, $U_2 = 8\\,\\mathrm{V}$ — und $4 + 8 = 12\\,\\mathrm{V}$ passt.

Anwendung im Alltag: Eine alte Lichterkette hat viele [Glühlämpchen](wiki:Glühlampe|Incandescent light bulb) *in Reihe*. Fällt eines aus, ist der Weg unterbrochen und alle erlöschen. Dafür bekommt jedes Lämpchen nur einen kleinen Teil der Netzspannung.`,
    },
    {
      id: 'parallel', type: 'text', title: 'Parallelschaltung: Leitwerte addieren sich',
      md: `
Hier liegt an allen Zweigen dieselbe Spannung $U$. Jeder Zweig zieht seinen Strom $I_k = U/R_k$, und die [Knotenregel](wiki:Kirchhoffsche Regeln|Kirchhoff's circuit laws) sagt, dass sich die Zweigströme zum Gesamtstrom addieren:

$$I = I_1 + I_2 + \\dots = U\\left(\\frac{1}{R_1} + \\frac{1}{R_2} + \\dots\\right) \\quad\\Rightarrow\\quad \\frac{1}{R_\\text{ges}} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\dots$$

Mit dem [Leitwert](wiki:Elektrischer Leitwert|Electrical conductance) $G = 1/R$ (Einheit [Siemens](wiki:Siemens (Einheit)|Siemens (unit)), S) ist es einfacher zu merken: **Bei Parallelschaltung addieren sich die Leitwerte**, $G_\\text{ges} = G_1 + G_2 + \\dots$ Jeder zusätzliche Zweig öffnet einen weiteren Weg — der Gesamtleitwert steigt, der Gesamtwiderstand sinkt. Deshalb ist $R_\\text{ges}$ immer **kleiner als der kleinste Einzelwiderstand**.

Für **zwei** Widerstände gibt es die Kurzform (Produkt durch Summe), die du im Prüfungsalltag am häufigsten brauchst:

$$R_\\text{ges} = \\frac{R_1\\cdot R_2}{R_1 + R_2}$$

Zwei Sonderfälle merkst du dir besser als Formel: **$n$ gleiche Widerstände** $R$ parallel ergeben $R/n$ (z. B. zwei mal $150\\,\\Omega$ ergeben $75\\,\\Omega$). Und wenn ein Widerstand viel größer ist als der andere, bestimmt der kleinere fast allein das Ergebnis: $100\\,\\Omega \\parallel 10\\,\\mathrm{k\\Omega} \\approx 99\\,\\Omega$.[^wp-parallelschaltung]

Alle [Steckdosen](wiki:Steckdose|AC power plugs and sockets) im Haus und alle Verbraucher an einer Batterie sind parallel geschaltet — jeder bekommt dieselbe Spannung, jeder zieht seinen eigenen Strom, und der Zähler addiert die Ströme.`,
    },
    {
      id: 'gemischt', type: 'text', title: 'Gemischte Schaltungen: von innen nach außen',
      md: `
Eine [gemischte Schaltung](wiki:Gemischte Schaltung) enthält Reihen- und Parallelanteile. Der Trick ist immer derselbe: **Suche den kleinsten Block, den du schon kennst, und ersetze ihn durch einen Ersatzwiderstand** — so lange, bis nur noch einer übrig bleibt.

Beispiel: $R_1 = 100\\,\\Omega$ in Reihe mit der Parallelschaltung $R_2 = 200\\,\\Omega \\parallel R_3 = 300\\,\\Omega$. Zuerst die Parallelschaltung: $\\frac{200\\cdot 300}{200 + 300} = 120\\,\\Omega$. Dann die Reihenschaltung: $100 + 120 = 220\\,\\Omega$.

Für die **Teilgrößen** gehst du den Weg wieder zurück: Mit $I = U/R_\\text{ges}$ kennst du den Gesamtstrom; er fließt durch $R_1$, an ihm fällt $U_1 = R_1\\cdot I$ ab. Die Restspannung $U - U_1$ liegt an *beiden* parallelen Widerständen, daraus folgen ihre Ströme.

Merkregel: *Reihe: Strom gleich, Spannungen addieren. Parallel: Spannung gleich, Ströme addieren.* Die Parallelschaltung ist übrigens die Grundlage für den Aufbau krummer Werte: Aus den Werten der [E-Reihe](wiki:E-Reihe|E series of preferred numbers), die es zu kaufen gibt, kombiniert man sich jeden anderen Wert, den man braucht.[^wp-e-reihe]`,
    },
    {
      id: 'viz-builder', type: 'viz', viz: 'series-parallel-builder', title: 'Widerstands-Baukasten',
      task: 'Baue aus E12-Werten zwei Zielwerte: **75 Ω** (zum Beispiel aus zwei gleichen Widerständen) und **62 Ω mit höchstens drei Bauteilen**. Tippe ein Bauteil an, wähle „In Reihe +" oder „Parallel +" und stelle die Werte ein. Beobachte, welchen Strom und welche Spannung jedes Teil bekommt.',
    },
    {
      id: 'num-reihe', type: 'numeric', title: 'Reihenschaltung',
      question: 'Drei Widerstände mit $100\\,\\Omega$, $220\\,\\Omega$ und $330\\,\\Omega$ liegen in Reihe. Wie groß ist der Gesamtwiderstand?',
      answer: 650, tolerance: 0.5, unit: 'Ω',
      explain: '$R_\\text{ges} = 100 + 220 + 330 = 650\\,\\Omega$.',
    },
    {
      id: 'num-parallel2', type: 'numeric', title: 'Zwei parallele Widerstände',
      question: '$R_1 = 100\\,\\Omega$ und $R_2 = 200\\,\\Omega$ liegen parallel. Wie groß ist $R_\\text{ges}$?',
      answer: 66.7, tolerance: 0.1, unit: 'Ω',
      hint: 'Produkt durch Summe: $\\frac{R_1 R_2}{R_1+R_2}$.',
      explain: '$\\frac{100\\cdot 200}{100+200} = \\frac{20000}{300} \\approx 66{,}7\\,\\Omega$ — kleiner als der kleinste Einzelwiderstand ($100\\,\\Omega$).',
    },
    {
      id: 'num-parallel3', type: 'numeric', title: 'Drei parallele Widerstände',
      question: '$100\\,\\Omega \\parallel 200\\,\\Omega \\parallel 400\\,\\Omega$: Wie groß ist der Gesamtwiderstand?',
      answer: 57.1, tolerance: 0.1, unit: 'Ω',
      hint: 'Addiere die Leitwerte: $G = 1/100 + 1/200 + 1/400$ in Siemens.',
      explain: '$G_\\text{ges} = 10 + 5 + 2{,}5 = 17{,}5\\,\\mathrm{mS}$, also $R_\\text{ges} = 1/0{,}0175\\,\\mathrm{S} \\approx 57{,}1\\,\\Omega$.',
    },
    {
      id: 'num-gemischt', type: 'numeric', title: 'Gemischte Schaltung',
      question: '$100\\,\\Omega$ liegen in Reihe mit der Parallelschaltung aus $200\\,\\Omega$ und $300\\,\\Omega$. Wie groß ist der Gesamtwiderstand?',
      answer: 220, tolerance: 0.5, unit: 'Ω',
      explain: 'Erst der Parallelblock: $200 \\parallel 300 = 120\\,\\Omega$. Dann die Reihe: $100 + 120 = 220\\,\\Omega$.',
    },
    {
      id: 'num-strom', type: 'numeric', title: 'Strom in der Reihenschaltung',
      question: '$R_1 = 1\\,\\mathrm{k\\Omega}$ und $R_2 = 2\\,\\mathrm{k\\Omega}$ liegen in Reihe an $12\\,\\mathrm{V}$. Wie groß ist der Strom?',
      answer: 4, tolerance: 0.02, unit: 'mA',
      explain: '$R_\\text{ges} = 3\\,\\mathrm{k\\Omega}$, $I = 12\\,\\mathrm{V}/3\\,\\mathrm{k\\Omega} = 4\\,\\mathrm{mA}$. Daraus $U_1 = 4\\,\\mathrm{V}$ und $U_2 = 8\\,\\mathrm{V}$.',
    },
    {
      id: 'num-gleich', type: 'numeric', title: 'Gleiche Widerstände',
      question: 'Drei gleich große Widerstände liegen parallel und haben zusammen $1{,}7\\,\\mathrm{k\\Omega}$. Wie groß ist jeder einzelne?',
      answer: 5.1, tolerance: 0.02, unit: 'kΩ',
      hint: '$n$ gleiche Widerstände parallel ergeben $R/n$.',
      explain: '$R = n\\cdot R_\\text{ges} = 3 \\cdot 1{,}7\\,\\mathrm{k\\Omega} = 5{,}1\\,\\mathrm{k\\Omega}$ (ein E12-Wert).',
    },
    {
      id: 'quiz-sinkt', type: 'quiz', title: 'Noch ein Zweig',
      question: 'Zu einer Parallelschaltung wird ein weiterer Widerstand **parallel** hinzugefügt. Was passiert mit dem Gesamtwiderstand?',
      options: [
        { text: 'Er sinkt, egal welchen Wert der neue Widerstand hat.', correct: true, why: 'Ein weiterer Zweig bietet dem Strom einen zusätzlichen Weg, der Gesamtleitwert steigt, der Gesamtwiderstand sinkt — auch bei einem sehr großen Zusatzwiderstand, nur dann kaum.' },
        { text: 'Er steigt, weil mehr Bauteile im Weg sind.', correct: false, why: 'So ist es in der *Reihenschaltung*. Parallel öffnet jedes Bauteil einen weiteren Weg.' },
        { text: 'Er bleibt gleich, weil die Spannung gleich bleibt.', correct: false, why: 'Die Spannung bleibt gleich, aber der Gesamtstrom steigt — also sinkt $R_\\text{ges} = U/I$.' },
        { text: 'Das hängt davon ab, ob der neue Widerstand größer oder kleiner als die anderen ist.', correct: false, why: 'Die Richtung ist immer dieselbe (sinkt); nur das Ausmaß hängt vom Wert ab.' },
      ],
    },
    {
      id: 'match-eigenschaften', type: 'match', title: 'Reihe und Parallel',
      prompt: 'Ordne zu.',
      pairs: [
        ['Reihenschaltung', 'derselbe Strom in allen Bauteilen'],
        ['Parallelschaltung', 'dieselbe Spannung an allen Zweigen'],
        ['Reihenschaltung: Spannungen', 'addieren sich zur Gesamtspannung'],
        ['Parallelschaltung: Ströme', 'addieren sich zum Gesamtstrom'],
      ],
    },
    {
      id: 'recall-leitwerte', type: 'recall', title: 'Warum addieren sich Leitwerte?',
      prompt: 'Leite her, warum in der Parallelschaltung $\\frac{1}{R_\\text{ges}} = \\frac{1}{R_1} + \\frac{1}{R_2}$ gilt. Verwende Spannung, Zweigströme und die Knotenregel.',
      answer: `An beiden Zweigen liegt dieselbe Spannung $U$. Die Zweigströme sind $I_1 = U/R_1$ und $I_2 = U/R_2$. Die Knotenregel sagt $I = I_1 + I_2 = U\\left(\\frac{1}{R_1} + \\frac{1}{R_2}\\right)$. Der Ersatzwiderstand ist definiert durch $I = U/R_\\text{ges}$, also $\\frac{1}{R_\\text{ges}} = \\frac{1}{R_1} + \\frac{1}{R_2}$. Anschaulich: Jeder Zweig öffnet einen weiteren Weg, der Leitwert $G = 1/R$ (wie viel Strom pro Volt) addiert sich.`,
      hints: ['Welche Größe ist an beiden Zweigen gleich?', 'Wie hängt der Gesamtstrom mit den Zweigströmen zusammen?'],
      cards: ['parallel-leitwerte', 'zwei-widerstaende'],
    },
    {
      id: 'mission', type: 'callout', tone: 'mission', title: 'Prüfung und Funkpraxis',
      md: `
Gesamtwiderstände ziehen sich durch den ganzen Katalog: ED104 und ED105 (zwei parallele Widerstände, z. B. $100\\,\\Omega \\parallel 400\\,\\Omega = 80\\,\\Omega$), ED106 (drei gleiche parallel) und ED108–ED116 (gemischte Schaltungen mit drei bis vier Widerständen) — alles mit dem Vorgehen „von innen nach außen" zu lösen.[^bnetza-pruefungsfragen-2024]

Funkpraxis: Eine **künstliche Antenne** (Dummy Load) mit $50\\,\\Omega$ baut man oft aus mehreren parallelen Widerständen, weil sich so die Leistung auf mehrere Bauteile verteilt: Vier $200\\,\\Omega$-Widerstände parallel ergeben $50\\,\\Omega$, und jeder trägt nur ein Viertel der Verlustleistung.`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>Deutsch</th><th>English</th></tr>
<tr><td>Reihenschaltung</td><td>series circuit</td></tr>
<tr><td>Parallelschaltung</td><td>parallel circuit</td></tr>
<tr><td>gemischte Schaltung</td><td>series-parallel (combination) circuit</td></tr>
<tr><td>Gesamtwiderstand, Ersatzwiderstand</td><td>total (equivalent) resistance</td></tr>
<tr><td>Leitwert</td><td>conductance</td></tr>
<tr><td>Teilspannung, Teilstrom</td><td>partial voltage, partial current</td></tr>
<tr><td>Zweig</td><td>branch</td></tr></table>`,
    },
    {
      id: 'warning', type: 'callout', tone: 'warning', title: 'Typische Denkfehler',
      md: `
- **„Parallel ist der Gesamtwiderstand größer als der größte Einzelwiderstand."** Falsch herum: Er ist *kleiner als der kleinste*. Probe: Das Ergebnis muss unter dem kleinsten Einzelwert liegen — sonst hast du dich verrechnet.
- **„In der Reihenschaltung teilt sich der Strom auf."** Nein: Der Strom ist überall gleich, *die Spannung* teilt sich.
- **„In der Parallelschaltung teilt sich die Spannung auf."** Nein: Die Spannung ist gleich, *der Strom* teilt sich.
- **Kehrwert vergessen.** Bei $\\frac{1}{R_\\text{ges}} = \\frac{1}{R_1} + \\frac{1}{R_2}$ ist die Summe der Kehrwerte noch nicht das Ergebnis — am Ende noch einmal den Kehrwert bilden.`,
    },
  ],
  cards: [
    { id: 'reihe-formel', front: 'Gesamtwiderstand der Reihenschaltung', back: '$R_\\text{ges} = R_1 + R_2 + R_3 + \\dots$ — größer als jeder Einzelwiderstand; derselbe Strom überall.' },
    { id: 'parallel-leitwerte', front: 'Gesamtwiderstand der Parallelschaltung', back: '$\\frac{1}{R_\\text{ges}} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\dots$ — die Leitwerte addieren sich; $R_\\text{ges}$ ist kleiner als der kleinste Einzelwiderstand.' },
    { id: 'zwei-widerstaende', front: 'Zwei Widerstände parallel: Kurzform', back: '$R_\\text{ges} = \\frac{R_1\\cdot R_2}{R_1 + R_2}$ (Produkt durch Summe).' },
    { id: 'n-gleiche', front: '$n$ gleiche Widerstände $R$ parallel', back: '$R_\\text{ges} = R/n$, z. B. $2\\times 150\\,\\Omega \\to 75\\,\\Omega$.' },
    { id: 'eigenschaften-reihe-parallel', front: 'Reihe und Parallel: Was ist gleich, was addiert sich?', back: 'Reihe: Strom gleich, Spannungen addieren sich. Parallel: Spannung gleich, Ströme addieren sich.' },
    { id: 'leitwert-g', front: 'Leitwert $G$: Definition und Einheit', back: '$G = 1/R$, Einheit Siemens (S). Bei Parallelschaltung addieren sich Leitwerte.' },
    { id: 'strategie-gemischt', front: 'Strategie bei gemischten Schaltungen', back: 'Vom kleinsten bekannten Block nach außen: Parallelblöcke durch Ersatzwiderstand ersetzen, dann Reihenglieder addieren; für Teilgrößen den Weg zurückgehen.' },
    { id: 'parallel-kleiner', front: 'Probe bei der Parallelschaltung', back: '$R_\\text{ges}$ muss kleiner sein als der kleinste Einzelwiderstand — sonst Rechenfehler.' },
    { id: 'grosser-parallel', front: '$100\\,\\Omega \\parallel 10\\,\\mathrm{k\\Omega}$ — grob?', back: 'Etwa $99\\,\\Omega$: Der viel größere Widerstand verändert den kleineren kaum.' },
    { id: 'bsp-gemischt', front: '$100\\,\\Omega$ in Reihe mit $200\\,\\Omega \\parallel 300\\,\\Omega$', back: '$200\\parallel300 = 120\\,\\Omega$, dazu $100\\,\\Omega$: gesamt $220\\,\\Omega$.' },
  ],
};
