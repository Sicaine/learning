export default {
  id: 'kondensator',
  title: 'Kapazität, Bauformen, Reihen- und Parallelschaltung',
  summary: 'Zwei Platten, ein Isolator dazwischen, und Ladung wird gespeichert: Wovon die Kapazität abhängt, wie sich Kondensatoren schalten lassen und welche Bauform wofür taugt.',
  minutes: 30,
  goals: [
    'Die [[kapazitaet|Kapazität]] über $C = Q/U$ und $C = \\varepsilon_0\\varepsilon_r\\cdot A/d$ beschreiben und die Abhängigkeit von Fläche, Abstand und [[dielektrikum|Dielektrikum]] angeben',
    'Kondensatoren in Reihe und parallel zusammenfassen (Rechenregeln als Spiegelbild der Widerstände)',
    'Die gespeicherte Energie $W = \\tfrac12 C U^2$ berechnen',
    'Elektrolyt-, Keramik- und Folienkondensator unterscheiden und die Polung des [[elko|Elkos]] beachten',
    'Erklären, warum ein Kondensator Gleichstrom sperrt und Wechselstrom durchlässt',
  ],
  needs: ['elektrisches-feld'],
  blocks: [
    {
      id: 'video-plattenkondensator', type: 'video', youtube: 'qIMWjlsBrow', label: 'Wie berechnet man die Kapazität eines Plattenkondensators?', channel: 'Schrack for Students', minutes: 7,
      why: 'Rechenbeispiele zur Plattenkondensator-Formel; sinnvoll zum Wiederholen, nachdem du die Demo ausprobiert hast.',
    },
    {
      id: 'idee', type: 'text', title: 'Platten, die Ladung festhalten',
      md: `
Ein [[kondensator|Kondensator]] besteht im Prinzip aus zwei leitenden Flächen (Platten), die durch einen Isolator getrennt sind. Legt man eine Spannung an, fließt kurz ein Strom: Auf der einen Platte sammeln sich positive, auf der anderen negative Ladungen, und zwischen den Platten baut sich das homogene Feld aus der letzten Lektion auf. Danach fließt nichts mehr — die Ladung ist *gespeichert*, nicht der Strom. Der erste Kondensator war die [Leidener Flasche](wiki:Leidener Flasche|Leyden jar) um 1745.[^wp-kondensator]

Stell dir einen Wasserbehälter mit einer elastischen Membran vor: Drückst du Wasser hinein, spannt sich die Membran, bis der Gegendruck dem Pumpendruck gleicht; dann fließt nichts mehr. Wie viel Wasser bei einem bestimmten Druck hineinpasst, ist die Kapazität.

Wie viel Ladung $Q$ ein Kondensator bei der Spannung $U$ aufnimmt, sagt die [Kapazität](wiki:Elektrische Kapazität|Capacitance):

$$C = \\frac{Q}{U} \\qquad\\Longleftrightarrow\\qquad Q = C\\cdot U$$

Einheit ist das Farad, $1\\,\\mathrm{F} = 1\\,\\mathrm{C/V}$, benannt nach [Michael Faraday](wiki:Michael Faraday|Michael Faraday). Ein Farad ist riesig, in der Praxis rechnet man in $\\mu\\mathrm{F}$, $\\mathrm{nF}$ und $\\mathrm{pF}$ ($0{,}22\\,\\mathrm{\\mu F} = 220\\,\\mathrm{nF}$). Beispiel: $100\\,\\mathrm{\\mu F}$ an $12\\,\\mathrm{V}$ speichern $Q = 100\\cdot 10^{-6}\\cdot 12 = 1{,}2\\,\\mathrm{mC}$.`,
    },
    {
      id: 'platten', type: 'text', title: 'Wovon die Kapazität abhängt',
      md: `
Für den Plattenkondensator hängt die Kapazität nur von der Geometrie und vom Isolierstoff ab:

$$C = \\varepsilon_0\\,\\varepsilon_r\\cdot\\frac{A}{d} \\qquad\\text{mit}\\qquad \\varepsilon_0 = 8{,}854\\cdot 10^{-12}\\,\\mathrm{F/m}$$

- **Plattenfläche $A$ größer → $C$ größer:** Mehr Fläche fasst mehr Ladung bei gleichem Feld.
- **Plattenabstand $d$ größer → $C$ kleiner:** Bei gleicher Spannung ist das Feld $E = U/d$ schwächer, es lässt sich weniger Ladung halten.
- **Dielektrikum mit größerem $\\varepsilon_r$ → $C$ größer:** Der Isolierstoff polarisiert sich und schwächt das Feld; die Platten können mehr Ladung tragen.

Die [Permittivität](wiki:Permittivität|Permittivity) $\\varepsilon_r$ (Luft $\\approx 1$, PTFE $\\approx 2$, Polyethylen $\\approx 2{,}3$, Keramik je nach Sorte von einigen Zehn bis über Tausend) und die [elektrische Feldkonstante](wiki:Elektrische Feldkonstante|Vacuum permittivity) $\\varepsilon_0$ kommen in der Formelsammlung des Prüfungskatalogs vor. Von der **Spannung** hängt die Kapazität *nicht* ab (Katalog EC205).

Beispiel: $A = 10\\,\\mathrm{cm}^2 = 10^{-3}\\,\\mathrm{m^2}$, $d = 1\\,\\mathrm{mm}$, Luft: $C = 8{,}854\\cdot 10^{-12}\\cdot 10^{-3}/10^{-3} \\approx 8{,}85\\,\\mathrm{pF}$. Mit $\\varepsilon_r = 4$ wären es $35{,}4\\,\\mathrm{pF}$. Wer viel Kapazität will, wickelt dünne, lange Folien auf (Wickelkondensator) oder nutzt ein Dielektrikum mit sehr hohem $\\varepsilon_r$.`,
    },
    {
      id: 'schaltung', type: 'text', title: 'Reihe, parallel — und die Energie',
      md: `
Hier ist alles *umgekehrt* wie bei Widerständen:

$$C_\\text{par} = C_1 + C_2 + \\dots \\qquad\\qquad \\frac{1}{C_\\text{ser}} = \\frac{1}{C_1} + \\frac{1}{C_2} + \\dots$$

**Parallel** vergrößert sich die wirksame Fläche: die Kapazitäten addieren sich. **In Reihe** addieren sich die Plattenabstände: das ergibt weniger Kapazität, die Gesamtkapazität ist *kleiner als die kleinste*. Beispiele: $47\\,\\mathrm{nF} \\parallel 100\\,\\mathrm{nF} = 147\\,\\mathrm{nF}$. $100\\,\\mathrm{nF}$ in Reihe mit $100\\,\\mathrm{nF} = 50\\,\\mathrm{nF}$. $1\\,\\mathrm{\\mu F}$ in Reihe mit $2\\,\\mathrm{\\mu F} = 0{,}667\\,\\mathrm{\\mu F}$. Für zwei Kondensatoren in Reihe gilt dieselbe Kurzformel wie bei parallelen Widerständen, $C = \\frac{C_1 C_2}{C_1 + C_2}$.

Die **gespeicherte Energie** wächst mit dem Quadrat der Spannung:

$$W_C = \\tfrac{1}{2}\\,C\\,U^2$$

$1000\\,\\mathrm{\\mu F}$ bei $12\\,\\mathrm{V}$ speichern $0{,}5\\cdot 10^{-3}\\cdot 144 = 0{,}072\\,\\mathrm{J}$ — wenig, aber bei hoher Spannung nicht mehr harmlos: Ein geladener Siebkondensator im Netzteil kann noch lange nach dem Ausschalten gefährlich sein. Doppelte Spannung bedeutet vierfache Energie.

**Gleichstrom sperrt, Wechselstrom geht durch:** Ein geladener Kondensator lässt keinen Gleichstrom mehr fließen. Bei Wechselspannung wird er ständig umgeladen — es fließt ein Wechselstrom, obwohl die Ladung nie „durch" den Isolator geht. Darauf beruht seine Anwendung als Koppelkondensator, der Wechselspannungen weiterleitet und Gleichspannungsanteile trennt (mehr in Etappe 4).`,
    },
    {
      id: 'bauformen', type: 'text', title: 'Bauformen und ihre Stärken',
      md: `
- **[Elektrolytkondensator](wiki:Aluminium-Elektrolytkondensator|Aluminum electrolytic capacitor) (Elko):** sehr hohe Kapazität (µF bis mF) bei kleinem Volumen, aber **gepolt** — falsch herum angeschlossen, überhitzt er, gast und kann platzen. Streng genommen nur für Gleichspannung (mit richtiger Polung). Ungeeignet für hohe Frequenzen.
- **[Keramikkondensator](wiki:Keramikkondensator|Ceramic capacitor):** klein, billig, nicht gepolt, niedrige Eigeninduktivität — gut für Hochfrequenz und zum Entkoppeln direkt an ICs. Die Kapazität mancher Sorten ändert sich stark mit Temperatur und Spannung.
- **[Folienkondensator](wiki:Kunststoff-Folienkondensator|Film capacitor):** stabil, verlustarm, nicht gepolt — für Filter, Zeitglieder und Netzanwendungen.
- **[Drehkondensator](wiki:Drehkondensator|Variable capacitor) / Luftkondensator:** veränderliche Kapazität über die Plattenüberdeckung, verlustarm — früher der Abstimmkondensator im Radio, bei Sendern und Antennenanpassgeräten (Katalog ED216: Keramik- oder Luftkondensatoren für HF-Filter).
- **[Superkondensator](wiki:Superkondensator|Supercapacitor):** Farad-Bereich bei niedriger Spannung, für Pufferung und kurze Energiespitzen.

Merke das Prinzip: Welche Bauform passt, entscheidet die geforderte Kapazität, die Spannung, die Frequenz und die Stabilität.[^wp-elko]`,
    },
    {
      id: 'viz-plates', type: 'viz', viz: 'capacitor-builder', title: 'Plattenkondensator bauen',
      params: { mode: 'plates', target: 100e-12 },
      task: 'Stelle Fläche, Abstand und Dielektrikum so ein, dass der Kondensator **100 pF** (±3 %) hat. Beobachte, wie $C$, die Ladung $Q$ und die Energie $W$ reagieren, wenn du den Abstand verdoppelst oder ein Dielektrikum einschiebst.',
    },
    {
      id: 'viz-network', type: 'viz', viz: 'capacitor-builder', title: 'Drei Kondensatoren schalten',
      params: { mode: 'network', target: 150e-9 },
      task: 'Wähle eine der vier Schaltungen und Werte so, dass $C_\\text{ges} = 150\\,\\mathrm{nF}$ (±2 %) herauskommt. Tipp: Nicht alle Kombinationen lassen sich mit drei gleichen Kondensatoren erreichen — probiere die gemischten Schaltungen.',
    },
    {
      id: 'num-ladung', type: 'numeric', title: 'Ladung',
      question: 'Ein Kondensator mit $100\\,\\mathrm{\\mu F}$ wird an $12\\,\\mathrm{V}$ geladen. Welche Ladung steckt in ihm (in mC)?',
      answer: 1.2, tolerance: 0.01, unit: 'mC',
      explain: '$Q = C\\cdot U = 100\\cdot 10^{-6}\\,\\mathrm{F}\\cdot 12\\,\\mathrm{V} = 1{,}2\\cdot 10^{-3}\\,\\mathrm{C} = 1{,}2\\,\\mathrm{mC}$.',
    },
    {
      id: 'num-energie', type: 'numeric', title: 'Energie',
      question: 'Welche Energie ist in einem Kondensator mit $1000\\,\\mathrm{\\mu F}$ bei $12\\,\\mathrm{V}$ gespeichert (in J)?',
      answer: 0.072, tolerance: 0.001, unit: 'J',
      explain: '$W = \\tfrac12 C U^2 = 0{,}5\\cdot 10^{-3}\\,\\mathrm{F}\\cdot (12\\,\\mathrm{V})^2 = 0{,}072\\,\\mathrm{J}$.',
    },
    {
      id: 'num-platten', type: 'numeric', title: 'Plattenkondensator',
      question: 'Zwei Platten mit je $10\\,\\mathrm{cm}^2$ stehen im Abstand $1\\,\\mathrm{mm}$ in Luft ($\\varepsilon_r = 1$, $\\varepsilon_0 = 8{,}854\\cdot 10^{-12}\\,\\mathrm{F/m}$). Wie groß ist die Kapazität (in pF)?',
      answer: 8.85, tolerance: 0.05, unit: 'pF',
      hint: 'Fläche in $\\mathrm{m^2}$, Abstand in m einsetzen.',
      explain: '$C = 8{,}854\\cdot 10^{-12}\\cdot 10^{-3}/10^{-3} \\approx 8{,}85\\,\\mathrm{pF}$; mit $\\varepsilon_r = 4$ wären es $35{,}4\\,\\mathrm{pF}$.',
    },
    {
      id: 'num-parallel', type: 'numeric', title: 'Parallelschaltung',
      question: 'Drei Kondensatoren mit $0{,}1\\,\\mathrm{\\mu F}$, $150\\,\\mathrm{nF}$ und $50000\\,\\mathrm{pF}$ liegen parallel. Wie groß ist die Gesamtkapazität (in µF)?',
      answer: 0.3, tolerance: 0.003, unit: 'µF',
      explain: 'Alles in nF: $100 + 150 + 50 = 300\\,\\mathrm{nF} = 0{,}3\\,\\mathrm{\\mu F}$ (Katalogfrage ED117).',
    },
    {
      id: 'num-reihe', type: 'numeric', title: 'Reihenschaltung',
      question: '$100\\,\\mathrm{\\mu F}$, $200000\\,\\mathrm{nF}$ und $200\\,\\mathrm{\\mu F}$ liegen in Reihe. Wie groß ist die Gesamtkapazität (in µF)?',
      answer: 50, tolerance: 0.5, unit: 'µF',
      hint: '$200000\\,\\mathrm{nF} = 200\\,\\mathrm{\\mu F}$. Dann Kehrwerte addieren.',
      explain: '$1/C = 1/100 + 1/200 + 1/200 = 0{,}02\\,\\mathrm{1/\\mu F}$, also $C = 50\\,\\mathrm{\\mu F}$ (ED120).',
    },
    {
      id: 'num-umrechnung', type: 'numeric', title: 'Einheiten',
      question: 'Rechne $0{,}22\\,\\mathrm{\\mu F}$ in Nanofarad um.',
      answer: 220, tolerance: 0.5, unit: 'nF',
      explain: '$1\\,\\mathrm{\\mu F} = 1000\\,\\mathrm{nF}$, also $0{,}22\\,\\mathrm{\\mu F} = 220\\,\\mathrm{nF}$ (EA115).',
    },
    {
      id: 'quiz-verringern', type: 'quiz', title: 'Kapazität verkleinern',
      question: 'Wodurch verringert sich die Kapazität eines Plattenkondensators?',
      options: [
        { text: 'Durch einen größeren Plattenabstand.', correct: true, why: '$C \\propto 1/d$: Mehr Abstand, schwächeres Feld, weniger gespeicherte Ladung pro Volt (EC203, EC204).' },
        { text: 'Durch eine größere Plattenfläche.', correct: false, why: '$C \\propto A$: Mehr Fläche vergrößert die Kapazität.' },
        { text: 'Durch ein Dielektrikum mit größerem $\\varepsilon_r$.', correct: false, why: '$C \\propto \\varepsilon_r$: Das vergrößert die Kapazität.' },
        { text: 'Durch eine höhere angelegte Spannung.', correct: false, why: 'Die Kapazität ist unabhängig von der Spannung (EC205); nur die Ladung steigt mit $U$.' },
      ],
    },
    {
      id: 'quiz-elko', type: 'quiz', title: 'Polung beachten',
      question: 'Bei welcher Bauform muss beim Einbau auf die Polarität geachtet werden?',
      options: [
        { text: 'Elektrolytkondensator', correct: true, why: 'Die Oxidschicht, die als Dielektrikum dient, bildet sich nur bei richtiger Polung. Falsch herum fließt ein hoher Strom, der Elko erhitzt sich und kann platzen (EC207).' },
        { text: 'Keramikkondensator', correct: false, why: 'Keramikkondensatoren sind ungepolt.' },
        { text: 'Folienkondensator', correct: false, why: 'Folienkondensatoren sind ungepolt.' },
        { text: 'Luftdrehkondensator', correct: false, why: 'Auch Drehkondensatoren sind ungepolt.' },
      ],
    },
    {
      id: 'match-typen', type: 'match', title: 'Bauform und Merkmal',
      prompt: 'Ordne die Bauform dem typischen Merkmal zu.',
      pairs: [
        ['Elektrolytkondensator', 'hohe Kapazität, gepolt'],
        ['Keramikkondensator', 'klein, hochfrequenztauglich, ungepolt'],
        ['Folienkondensator', 'stabil und verlustarm'],
        ['Drehkondensator', 'einstellbare Kapazität, z. B. zur Abstimmung'],
      ],
    },
    {
      id: 'recall-gleichstrom', type: 'recall', title: 'Gleichspannung anlegen',
      prompt: 'Was passiert in einem Kondensator, wenn man eine Gleichspannung anlegt? Warum sagt man „Kondensator sperrt Gleichstrom"?',
      answer: `Beim Anlegen fließt kurz ein Ladestrom: Ladung wird auf die Platten verschoben, das Feld zwischen den Platten baut sich auf, die Kondensatorspannung steigt bis zur Quellenspannung. Dann ist der Strom null — der Kondensator ist „voll". Für Gleichstrom ist er also ein Isolator (er sperrt); bei Wechselspannung wird er laufend umgeladen, es fließt ein Wechselstrom. Gespeichert wird Ladung bzw. Energie im Feld ($W = \\tfrac12CU^2$), nicht „Strom".`,
      hints: ['Wann ist der Ladestrom null?', 'Was ändert sich bei Wechselspannung?'],
      cards: ['kondensator-gleichstrom', 'energie-kondensator'],
    },
    {
      id: 'mission', type: 'callout', tone: 'mission', title: 'Prüfung und Funkpraxis',
      md: `
Der Katalog fragt die Abhängigkeiten ($\\to$ **EC203/EC204**: größerer Plattenabstand verringert die Kapazität; **EC205**: von der Spannung ist $C$ unabhängig) und die Schaltung von Kondensatoren: **ED117–ED120** (parallel und in Reihe, z. B. $100\\,\\mathrm{\\mu F}$, $200000\\,\\mathrm{nF}$, $200\\,\\mathrm{\\mu F}$ in Reihe $= 50\\,\\mathrm{\\mu F}$) und gemischte Schaltungen mit drei Kondensatoren in **ED121–ED124**. Dazu **EC207** (Elko: Polarität beachten) und **ED216** (für HF-Filter Keramik- oder Luftkondensatoren). Der Einheiten-Umrechner **EA115** (0,22 µF in nF) steckt in jeder dieser Aufgaben.[^bnetza-pruefungsfragen-2024]

Praxis: Direkt an den Versorgungsanschlüssen jeder Schaltung sitzt ein kleiner Keramikkondensator (z. B. $100\\,\\mathrm{nF}$), der kurze Stromspitzen liefert; in Netzteilen glättet ein großer Elko die gleichgerichtete Spannung. Und in jedem Antennenabstimmgerät stecken Drehkondensatoren oder Kondensatorbänke.`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>Deutsch</th><th>English</th></tr>
<tr><td>Kondensator</td><td>capacitor</td></tr>
<tr><td>Kapazität</td><td>capacitance</td></tr>
<tr><td>Plattenkondensator</td><td>parallel-plate capacitor</td></tr>
<tr><td>Dielektrikum</td><td>dielectric</td></tr>
<tr><td>Elektrolytkondensator (Elko)</td><td>electrolytic capacitor</td></tr>
<tr><td>Keramik-, Folienkondensator</td><td>ceramic, film capacitor</td></tr>
<tr><td>Drehkondensator</td><td>variable capacitor</td></tr>
<tr><td>Ladung, Energie</td><td>charge, energy</td></tr>
<tr><td>Reihen-, Parallelschaltung</td><td>series, parallel connection</td></tr></table>`,
    },
    {
      id: 'warning', type: 'callout', tone: 'warning', title: 'Typische Denkfehler',
      md: `
- **„Ein Kondensator speichert Strom."** Er speichert *Ladung* bzw. *Energie im elektrischen Feld*, nicht Strom.
- **„Ein Kondensator leitet Gleichstrom."** Nur beim Laden und Entladen; im eingeschwungenen Zustand sperrt er.
- **Reihe und Parallel verwechseln.** Bei Kondensatoren addieren sich die Werte *parallel*, nicht in Reihe — das Gegenteil der Widerstände.
- **Elko beliebig polen.** Elkos sind gepolt; falsch herum gast und platzt er. Der Minuspol ist am Gehäuse markiert.
- **Hohe Spannung auf kleinem Kondensator.** Jeder Kondensator hat eine maximale Spannung; sie ist auf dem Bauteil angegeben (z. B. 16 V).`,
    },
  ],
  cards: [
    { id: 'c-definition', front: 'Kapazität: Definition und Einheit', back: '$C = Q/U$, Einheit Farad (F) $= \\mathrm{C/V}$; üblich: µF, nF, pF.' },
    { id: 'c-platten', front: 'Kapazität des Plattenkondensators', back: '$C = \\varepsilon_0\\varepsilon_r\\cdot A/d$; größer bei mehr Fläche und größerem $\\varepsilon_r$, kleiner bei mehr Abstand; unabhängig von $U$.' },
    { id: 'c-parallel', front: 'Kondensatoren parallel', back: '$C_\\text{ges} = C_1 + C_2 + \\dots$ — die Fläche addiert sich.' },
    { id: 'c-reihe', front: 'Kondensatoren in Reihe', back: '$1/C_\\text{ges} = 1/C_1 + 1/C_2 + \\dots$; für zwei: $C_1C_2/(C_1+C_2)$; kleiner als der kleinste.' },
    { id: 'energie-kondensator', front: 'Energie im Kondensator', back: '$W = \\tfrac12 C U^2$ — doppelte Spannung, vierfache Energie.' },
    { id: 'einheiten-c', front: 'Vorsätze bei Kapazitäten', back: '$1\\,\\mathrm{\\mu F} = 1000\\,\\mathrm{nF} = 10^6\\,\\mathrm{pF}$; $0{,}22\\,\\mathrm{\\mu F} = 220\\,\\mathrm{nF}$.' },
    { id: 'elko-polung', front: 'Elektrolytkondensator: Besonderheit', back: 'Gepolt: falsch herum erhitzt er sich, gast und kann platzen. Hohe Kapazität, nicht für Hochfrequenz.' },
    { id: 'bauformen-hf', front: 'Welche Kondensatoren für HF-Filter?', back: 'Keramik- oder Luftkondensatoren (verlustarm, niedrige Eigeninduktivität) — Katalog ED216.' },
    { id: 'kondensator-gleichstrom', front: 'Verhalten bei Gleichstrom / Wechselstrom', back: 'Gleichstrom: sperrt (nach dem Laden $I = 0$). Wechselstrom: wird umgeladen, es fließt Wechselstrom.' },
    { id: 'q-cu', front: '$100\\,\\mathrm{\\mu F}$ bei $12\\,\\mathrm{V}$: Ladung?', back: '$Q = CU = 1{,}2\\,\\mathrm{mC}$.' },
  ],
};
