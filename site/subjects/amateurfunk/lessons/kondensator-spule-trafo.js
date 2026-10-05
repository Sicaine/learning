export default {
  id: 'kondensator-spule-trafo',
  title: 'Kondensator, Spule und Transformator',
  summary: 'Kapazität und Induktivität, ihre Abhängigkeiten von Geometrie und Material, das Frequenzverhalten des Blindwiderstands und das Windungsverhältnis des Transformators.',
  minutes: 20,
  goals: [
    'Wissen, wovon die [[kapazitaet|Kapazität]] eines Plattenkondensators abhängt (Fläche, Abstand, Dielektrikum, **nicht** die Spannung) und welche Bauformen es gibt',
    'Das Frequenzverhalten erklären: Kondensator-Blindwiderstand **sinkt**, Spulen-Blindwiderstand **steigt** mit der Frequenz',
    'Die [[induktivitaet|Induktivität]] einer Spule über Windungszahl, Länge und Kern abschätzen (L ∝ N², L ∝ 1/Länge)',
    'Spannungen und Windungszahlen eines Transformators berechnen: $\\ddot u = N_\\mathrm{P}/N_\\mathrm{S} = U_\\mathrm{P}/U_\\mathrm{S}$',
  ],
  needs: ['elektrotechnik/kondensator', 'elektrotechnik/spule-rl-glied', 'elektrotechnik/transformator', 'elektrotechnik/blindwiderstand'],
  blocks: [
    {
      id: 'kondensator', type: 'text', title: 'Der Kondensator',
      md: `
Ein **[Kondensator](wiki:Kondensator (Elektrotechnik)|Capacitor)** speichert elektrische Ladung im elektrischen Feld zwischen zwei Leitern, getrennt durch ein Dielektrikum. Seine Einheit ist das **Farad (F)** (EA101) — nicht Ohm, Henry oder Amperestunden. In der Praxis sind es Pikofarad (pF), Nanofarad (nF) und Mikrofarad (µF).

Beim **Plattenkondensator** gilt (Formelsammlung):[^bnetza-formelsammlung]

$$C = \\epsilon_0\\cdot\\epsilon_\\mathrm{r}\\cdot\\frac{A}{d}$$

Die [Kapazität](wiki:Elektrische Kapazität|Capacitance) wächst also mit der **Plattenfläche** $A$ und mit der Dielektrizitätszahl $\\epsilon_\\mathrm{r}$ des [Dielektrikums](wiki:Dielektrikum|Dielectric) und sinkt, wenn der **Plattenabstand** $d$ größer wird (EC203, EC204). Sie hängt **nicht von der angelegten Spannung** ab (EC205) — die Spannung bestimmt nur, wie viel Ladung $Q = C\\cdot U$ gespeichert wird.

**Bauformen** (EC206, EC207): Der **[Drehkondensator](wiki:Drehkondensator|Variable capacitor)** hat bewegliche Rotor-Platten auf einer isolierten Achse zwischen festen Statorplatten — damit stellst du Schwingkreise ab. Der **[Elektrolytkondensator](wiki:Elektrolytkondensator|Electrolytic capacitor)** („Elko“) hat große Kapazität, ist aber **gepolt**: falsch herum eingebaut wird er zerstört. Keramik-, Styroflex- und Plattenkondensatoren sind ungepolt.

**Laden über einen Widerstand:** Schaltest du einen entladenen Kondensator über $R$ an eine Gleichspannung, fließt anfangs der größte Strom, und die Kondensatorspannung steigt **exponentiell** an (erst steil, dann flacher) bis zur Quellenspannung; die Zeitkonstante ist $\\tau = R\\cdot C$ (EC201). Nach etwa $5\\tau$ ist er praktisch voll.

**Blindwiderstand:** Bei Wechselspannung wechselt die Ladung ständig. Der Wechselstromwiderstand (**[Blindwiderstand](wiki:Blindwiderstand|Electrical reactance)**) eines idealen Kondensators ist

$$X_\\mathrm{C} = \\frac{1}{2\\pi\\cdot f\\cdot C}$$

Er **sinkt mit zunehmender Frequenz** (EC202): Bei Gleichstrom ($f = 0$) sperrt er, bei hohen Frequenzen lässt er den Strom fast ungehindert durch. Deshalb dienen Kondensatoren als **Koppel-** (Gleichspannung sperren, Signal durchlassen) und **Blockkondensatoren** (HF nach Masse ableiten).`,
    },
    {
      id: 'viz-platten', type: 'viz', viz: 'capacitor-builder', title: 'Plattenkondensator-Baukasten',
      params: { mode: 'plates', target: 100e-12, tol: 0.03, U: 12 },
      task: 'Baue einen Kondensator von **100 pF** (±3 %): Verändere Plattenfläche, Abstand und Dielektrikum und beobachte, wie sich $C$ ändert, wenn du die Spannung variierst (gar nicht).',
    },
    {
      id: 'warn-c', type: 'callout', tone: 'warning', title: 'Die Spannung ist es nicht',
      md: `Die Katalogfragen zur Kapazität fragen entweder „wodurch sinkt sie?“ oder „wovon hängt sie **nicht** ab?“. Die Antwort „Spannung“ gehört zu beiden Seiten: Eine höhere Spannung ändert **nicht** die Kapazität. Sie sinkt nur durch **größeren Abstand** (oder kleinere Fläche, kleineres $\\epsilon_\\mathrm{r}$). Eselsbrücke: „Platte groß, Abstand klein, Isolierstoff gut = viel Kapazität.“`,
    },
    {
      id: 'spule', type: 'text', title: 'Die Spule',
      md: `
Eine **[Spule](wiki:Spule (Elektrotechnik)|Electromagnetic coil)** ist ein aufgewickelter Draht; fließt Strom, baut sie ein Magnetfeld auf, das beim Ändern des Stroms eine Gegenspannung erzeugt ([Induktion](wiki:Elektromagnetische Induktion|Electromagnetic induction)). Das bremst jede Stromänderung. Die [Induktivität](wiki:Induktivität|Inductance) $L$ wird in **Henry (H)** gemessen (EA102); gebräuchlich sind µH und nH.

**Einschalten:** Legt man über einen Widerstand eine Gleichspannung an eine Spule, **steigt der Strom langsam** an, und die Spannung an der Spule springt zuerst auf den vollen Wert und **fällt dann auf null** ab (EC301). Zwei Lampen — Lampe 1 über einen Widerstand, Lampe 2 über eine Spule mit Eisenkern — leuchten daher nicht gleichzeitig auf: **Lampe 1 leuchtet zuerst**, Lampe 2 folgt verzögert (EC302). Vergleiche den Kondensator: Dort *steigt* die Spannung langsam, bei der Spule *steigt der Strom* langsam.

**Blindwiderstand:** $X_\\mathrm{L} = 2\\pi\\cdot f\\cdot L$ **steigt mit der Frequenz** (EC303): Gleichstrom geht ungehindert hindurch, hohe Frequenzen werden gedrosselt (HF-Drossel!).

**Jeder Leiter ist eine Spule:** Auch ein gerades Leiterstück hat eine Induktivität, unabhängig von seiner Form (EC304). Das ist bei HF wichtig, weil schon ein paar Zentimeter Draht bei 145 MHz einen merklichen Blindwiderstand haben.

**Wovon hängt $L$ ab?** Bei einer langen Zylinderspule gilt $L = \\mu_0\\cdot\\mu_\\mathrm{r}\\cdot N^2\\cdot A/l$. Daraus folgt für die Katalogfragen:
- **Windungszahl:** $L\\propto N^2$ — **Verdopplung der Windungen ⇒ vierfache Induktivität**: 12 µH → 48 µH (EC307).
- **Länge:** $L\\propto 1/l$ — **doppelte Länge ⇒ halbe Induktivität**: 12 µH → 6 µH (EC306). Zusammenschieben („stauchen“) erhöht $L$ (EC305).
- **Kern:** Ein **ferromagnetischer** Kern erhöht $L$ stark — **Eisen** ist ferromagnetisch, Chrom, Kupfer und Aluminium nicht (EB204). Ein Kern aus **Kupfer oder Aluminium** *verringert* dagegen die Induktivität bei HF (EB205): Das hochfrequente Magnetfeld kann nicht in das leitende Metall eindringen (Wirbelströme), sein Querschnitt wird kleiner. Auch ein **Abschirmbecher** verkleinert $L$.`,
    },
    {
      id: 'viz-rl', type: 'viz', viz: 'rc-lab', title: 'Laden und Entladen: RC und RL',
      params: { mode: 'rl' },
      task: 'Erledige die Ziele der Demo für die **Spule** (RL-Glied): Stelle die Zeitkonstante ein und beobachte das Aufschwingen des Stroms. Wechsle dann die Betriebsart und vergleiche mit dem Kondensator.',
    },
    {
      id: 'viz-x', type: 'viz', viz: 'reactance-sweep', title: 'Blindwiderstand über der Frequenz',
      task: 'Miss je einmal unterhalb, bei und oberhalb der Resonanz (siehe Ziele): Wann dominiert der Kondensator, wann die Spule?',
    },
    {
      id: 'calc-xc', type: 'numeric', title: 'Blindwiderstand des Kondensators',
      question: 'Welchen Blindwiderstand hat ein Kondensator von $100\\,\\text{pF}$ bei $1\\,\\text{MHz}$?',
      answer: 1592, tolerance: 20, unit: 'Ω',
      hint: '$X_\\mathrm{C} = 1/(2\\pi f C)$ mit $f = 10^6$ Hz, $C = 100\\cdot10^{-12}$ F; Klammern im Nenner!',
      explain: '$X_\\mathrm{C} = \\dfrac{1}{2\\pi\\cdot10^6\\cdot10^{-10}} = 1592\\,\\Omega$. Bei 10 MHz wären es nur 159 Ω — er sinkt mit der Frequenz.',
    },
    {
      id: 'calc-xl', type: 'numeric', title: 'Blindwiderstand der Spule',
      question: 'Welchen Blindwiderstand hat eine Spule mit $10\\,\\mu\\text{H}$ bei $7\\,\\text{MHz}$?',
      answer: 440, tolerance: 5, unit: 'Ω',
      hint: '$X_\\mathrm{L} = 2\\pi f L$.',
      explain: '$X_\\mathrm{L} = 2\\pi\\cdot7\\cdot10^6\\cdot10\\cdot10^{-6} = 440\\,\\Omega$. Verdoppelst du $f$, verdoppelt sich $X_\\mathrm{L}$.',
    },
    {
      id: 'quiz-l', type: 'quiz', title: 'Spulenverhalten',
      question: 'Zwei gleiche Spulen haben 12 µH. Bei der zweiten wird die **Windungszahl verdoppelt**, die Wickellänge bleibt. Welche Induktivität hat sie?',
      options: [
        { text: '48 µH', correct: true, why: '$L \\propto N^2$: doppelte Windungszahl, vierfache Induktivität.' },
        { text: '24 µH', why: 'Eine Verdopplung würde $L\\propto N$ bedeuten, aber $L$ wächst quadratisch.' },
        { text: '6 µH', why: 'Das wäre der Wert bei doppelter **Länge** (nicht Windungszahl).' },
        { text: '3 µH', why: 'Die Induktivität sinkt nicht, wenn man Windungen hinzufügt.' },
      ],
    },
    {
      id: 'trafo', type: 'text', title: 'Übertrager und Transformator',
      md: `
Der [Transformator](wiki:Transformator|Transformer) (allgemein auch **[Übertrager](wiki:Übertrager|Transformer types#Pulse transformer)**) besteht aus zwei Spulen auf einem gemeinsamen Kern. Fließt in der **Primärwicklung** Wechselstrom, erzeugt er ein wechselndes Magnetfeld, das in der **Sekundärwicklung** eine Spannung induziert. Bei Gleichspannung passiert nichts — deshalb gibt es ein **Wechselspannungs**-Stromnetz: Man kann Spannungen leicht hoch- und heruntertransformieren.[^darc-50ohm]

Beim idealen Transformator gilt das **Übersetzungsverhältnis** $\\ddot u$ (Formelsammlung):

$$\\ddot u = \\frac{N_\\mathrm{P}}{N_\\mathrm{S}} = \\frac{U_\\mathrm{P}}{U_\\mathrm{S}} = \\frac{I_\\mathrm{S}}{I_\\mathrm{P}}$$

Die Spannungen verhalten sich **wie die Windungszahlen**, die Ströme **umgekehrt**. Die Leistung bleibt (ideal) gleich: $U_\\mathrm{P}\\cdot I_\\mathrm{P} = U_\\mathrm{S}\\cdot I_\\mathrm{S}$. Mehr Sekundärwindungen = höhere Sekundärspannung, aber kleinerer Strom.

**Beispiele aus der Prüfung:**
- 230 V, Verhältnis 15 : 1: $U_\\mathrm{S} = 230\\,\\text{V}/15 \\approx 15\\,\\text{V}$ (EC401).
- Primärseite hat die **fünffache** Windungszahl: $U_\\mathrm{S} = 230\\,\\text{V}/5 = 46\\,\\text{V}$ (EC402). Nicht mit fünf multiplizieren (1150 V)!
- $N_\\mathrm{P} = 600$, 230 V → 11,5 V: $N_\\mathrm{S} = N_\\mathrm{P}\\cdot U_\\mathrm{S}/U_\\mathrm{P} = 600\\cdot11{,}5/230 = 30$ (EC403).
- $N_\\mathrm{P} = 150$, 45 V → 180 V: $N_\\mathrm{S} = 150\\cdot180/45 = 600$ (EC404). Herauftransformieren verlangt mehr Sekundärwindungen.

**Merke:** Erst entscheiden: **herunter** (Sekundärspannung kleiner, weniger Windungen) oder **herauf**? Dann mit dem Verhältnis rechnen. Die falschen Antworten im Katalog haben die falsche Richtung.`,
    },
    {
      id: 'viz-trafo', type: 'viz', viz: 'trafo-lab', title: 'Trafo-Labor',
      task: 'Stelle die Windungszahlen so ein, dass aus **230 V** gerade **11,5 V** werden, und dann so, dass aus **45 V** gerade **180 V** werden (je ±5 %).',
    },
    {
      id: 'calc-ns', type: 'numeric', title: 'Windungszahl berechnen',
      question: 'Ein Netztransformator hat primär 920 Windungen an 230 V. Wie viele Sekundärwindungen braucht er für **24 V**?',
      answer: 96, tolerance: 1, unit: 'Windungen',
      hint: '$N_\\mathrm{S} = N_\\mathrm{P}\\cdot U_\\mathrm{S}/U_\\mathrm{P}$.',
      explain: '$N_\\mathrm{S} = 920\\cdot24/230 = 96$. Probe: $\\ddot u = 920/96 = 9{,}6$; $230/9{,}6 = 24$ V.',
    },
    {
      id: 'match-bauteil', type: 'match', title: 'Verhalten bei Frequenz',
      prompt: 'Ordne zu.',
      pairs: [
        ['Blindwiderstand sinkt mit steigender Frequenz', 'Kondensator'],
        ['Blindwiderstand steigt mit steigender Frequenz', 'Spule'],
        ['Mit Gleichstrom verhält er sich wie ein Kurzschluss (nach dem Einschalten)', 'Spule'],
        ['Sperrt Gleichstrom', 'Kondensator'],
      ],
    },
    {
      id: 'mission-bauteile', type: 'callout', tone: 'mission', title: 'Funkpraxis: Dieselben Bauteile, andere Rollen',
      md: `Spulen und Kondensatoren bilden die **Schwingkreise** deines Empfängers und die **Anpassnetzwerke** (Antennentuner: Drehkondensator + Rollspule!). Ferritringe mit Windungen sind **Drosseln** oder **Baluns**: Du wickelst Windungen auf einen Ringkern, um Mantelwellen zu dämpfen oder Impedanzen zu transformieren — mit dem Windungsverhältnis bestimmst du die **Impedanzübersetzung** ($\\ddot u^2$). Der Netztrafo in deinem Netzteil macht aus 230 V die 13,8 V, die dein Transceiver braucht.`,
    },
    {
      id: 'recall-bauteile', type: 'recall', title: 'In eigenen Worten',
      prompt: 'Vergleiche Kondensator und Spule: Einheit, Verhalten bei steigender Frequenz, wovon die Größe abhängt. Wie berechnest du die Sekundärspannung eines Transformators aus den Windungszahlen?',
      answer: 'Kondensator: Einheit Farad, Blindwiderstand 1/(2πfC) sinkt mit der Frequenz; Kapazität wächst mit Plattenfläche und Dielektrizitätszahl, sinkt mit dem Abstand, ist unabhängig von der Spannung. Spule: Einheit Henry, Blindwiderstand 2πfL steigt mit der Frequenz; Induktivität wächst mit dem Quadrat der Windungszahl und mit Eisenkern, sinkt mit der Länge. Transformator: U_S = U_P · N_S/N_P (Spannungen wie Windungszahlen, Ströme umgekehrt).',
      cards: ['ksp-xc', 'ksp-trafo'],
    },
  ],
  cards: [
    { id: 'ksp-einheiten', front: 'Einheit der Kapazität? der Induktivität?', back: 'Kapazität: **Farad (F)**. Induktivität: **Henry (H)**.' },
    { id: 'ksp-kap', front: 'Wovon hängt die Kapazität eines Plattenkondensators ab?', back: '$C=\\epsilon_0\\epsilon_\\mathrm{r}A/d$: Fläche, Abstand, Dielektrikum — **nicht** von der Spannung. Größerer Abstand ⇒ kleineres $C$.' },
    { id: 'ksp-elko', front: 'Welcher Kondensator ist gepolt? Was ist ein Drehko?', back: 'Der Elektrolytkondensator. Drehkondensator: Rotorplatten drehen zwischen festen Statorplatten.' },
    { id: 'ksp-xc', front: 'Blindwiderstand des Kondensators?', back: '$X_\\mathrm{C}=\\dfrac{1}{2\\pi fC}$ — **sinkt** mit der Frequenz.' },
    { id: 'ksp-xl', front: 'Blindwiderstand der Spule?', back: '$X_\\mathrm{L}=2\\pi fL$ — **steigt** mit der Frequenz.' },
    { id: 'ksp-laden', front: 'Kondensator über R an Gleichspannung: Verlauf?', back: 'Spannung steigt exponentiell (erst steil, dann flach), $\\tau=R\\cdot C$.' },
    { id: 'ksp-spule-ein', front: 'Spule über R an Gleichspannung: Verlauf?', back: 'Strom steigt langsam; Spulenspannung springt auf Maximum und fällt auf 0. Lampe über Spule leuchtet später als Lampe über Widerstand.' },
    { id: 'ksp-l-n', front: 'Windungen verdoppeln (gleiche Länge)?', back: '$L\\propto N^2$: vierfache Induktivität (12 µH → 48 µH).' },
    { id: 'ksp-l-l', front: 'Spule doppelt so lang?', back: 'Halbe Induktivität (12 µH → 6 µH). Zusammenschieben erhöht $L$.' },
    { id: 'ksp-kern', front: 'Kern und Induktivität?', back: 'Ferromagnetisch (Eisen, Ferrit) erhöht $L$; Kupfer/Alu-Kern verringert $L$ bei HF (Magnetfeld dringt nicht ein).' },
    { id: 'ksp-leiter', front: 'Hat ein gerader Draht eine Induktivität?', back: 'Ja, jeder Leiter, unabhängig von der Form.' },
    { id: 'ksp-trafo', front: 'Transformator: Übersetzung?', back: '$\\ddot u=\\dfrac{N_\\mathrm{P}}{N_\\mathrm{S}}=\\dfrac{U_\\mathrm{P}}{U_\\mathrm{S}}=\\dfrac{I_\\mathrm{S}}{I_\\mathrm{P}}$ — Spannung wie Windungen, Strom umgekehrt.' },
    { id: 'ksp-trafo-bsp', front: '230 V an 5-fach Primärwindungen?', back: '$U_\\mathrm{S}=230/5=46$ V. (600 Wdg., 230 V → 11,5 V: $N_\\mathrm{S}=30$.)' },
  ],
};
