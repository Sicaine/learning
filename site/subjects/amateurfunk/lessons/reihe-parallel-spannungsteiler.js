export default {
  id: 'reihe-parallel-spannungsteiler',
  title: 'Reihen-/Parallelschaltung und Spannungsteiler',
  summary: 'Gesamtwiderstand und Gesamtkapazität von Reihen-, Parallel- und gemischten Schaltungen berechnen, Spannungsteiler auswerten und die Belastbarkeit zusammengeschalteter Widerstände abschätzen.',
  minutes: 25,
  goals: [
    'Die Regeln für Reihen- und Parallelschaltung von [[widerstand-gesamt|Widerständen]] **und** [[kapazitaet|Kondensatoren]] sicher anwenden (Kondensatoren verhalten sich umgekehrt!)',
    'Gemischte Netzwerke Schritt für Schritt von innen nach außen zusammenfassen',
    'Einen [[spannungsteiler]] auswerten: $U_1/U_2 = R_1/R_2$ und $U_2 = U\\cdot R_2/(R_1+R_2)$',
    'Die Belastbarkeit zusammengeschalteter gleicher Widerstände angeben (3 × 1 W = 3 W, parallel wie in Reihe)',
  ],
  needs: ['elektrotechnik/reihen-und-parallelschaltung', 'elektrotechnik/spannungsteiler-stromteiler', 'elektrotechnik/kirchhoff'],
  blocks: [
    {
      id: 'reihe', type: 'text', title: 'Reihenschaltung und Spannungsteiler',
      md: `
In der **[Reihenschaltung](wiki:Reihenschaltung)** fließt durch alle Bauteile **derselbe Strom**; die Teilspannungen **addieren** sich zur Gesamtspannung (Maschenregel der [Kirchhoffschen Regeln](wiki:Kirchhoffsche Regeln|Kirchhoff's circuit laws)), die Widerstände ebenfalls:[^bnetza-formelsammlung]

$$R_\\mathrm{G} = R_1 + R_2 + R_3 + \\ldots \\qquad U = U_1 + U_2 + \\ldots$$

Da durch beide derselbe Strom $I$ fließt, gilt am Einzelwiderstand $U_n = R_n\\cdot I$. Daraus folgt der **[Spannungsteiler](wiki:Spannungsteiler|Voltage divider)**: Die Spannungen verhalten sich **wie die Widerstände**:

$$\\frac{U_1}{U_2} = \\frac{R_1}{R_2} \\qquad U_2 = U\\cdot\\frac{R_2}{R_1+R_2}$$

Der größere Widerstand bekommt die größere Spannung. Ist $R_1 = 5\\cdot R_2$, dann ist $U_1 = 5\\cdot U_2$ — **nicht** $6\\cdot U_2$ (die 6 gehört zum Gesamtwiderstand $R_1+R_2 = 6R_2$) (ED101). Ist umgekehrt $R_1 = R_2/6$, ist $U_1 = U_2/6$ (ED102). Beispiel ED103: $U = 9\\,\\text{V}$, $R_1 = 10\\,\\text{k}\\Omega$, $R_2 = 20\\,\\text{k}\\Omega$: $U_2 = 9\\,\\text{V}\\cdot\\frac{20}{30} = 6\\,\\text{V}$ (und $U_1 = 3\\,\\text{V}$). Die Summe der Teilspannungen ergibt immer wieder $U$.

> Dieser Teiler gilt **unbelastet**. Hängt am Ausgang ein Verbraucher, liegt er parallel zu R₂ und senkt die Spannung — so rechnet man in Klasse E aber nicht.`,
    },
    {
      id: 'parallel', type: 'text', title: 'Parallelschaltung',
      md: `
In der **[Parallelschaltung](wiki:Parallelschaltung)** liegt an allen Bauteilen **dieselbe Spannung**, und die **Ströme addieren** sich. Mehr parallele Wege = **kleinerer** Gesamtwiderstand:

$$\\frac{1}{R_\\mathrm{G}} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\frac{1}{R_3} + \\ldots$$

Zwei Spezialfälle erledigst du im Kopf:

- **Zwei Widerstände:** $R_\\mathrm{G} = \\dfrac{R_1\\cdot R_2}{R_1 + R_2}$ („Produkt durch Summe“). $100\\,\\Omega\\,\\|\\,400\\,\\Omega = 40\\,000/500 = 80\\,\\Omega$ (ED104); $50\\,\\Omega\\,\\|\\,200\\,\\Omega = 40\\,\\Omega$ (ED105).
- **$n$ gleiche Widerstände:** $R_\\mathrm{G} = R/n$. Drei gleiche mit zusammen 1,7 kΩ: jeder hat $3\\cdot1{,}7\\,\\text{k}\\Omega = 5{,}1\\,\\text{k}\\Omega$ (ED106). Zehn mal 500 Ω ergibt 50 Ω — die Dummy Load aus der Widerstands-Lektion.

**Plausibilitätsprobe:** Der Gesamtwiderstand der Parallelschaltung ist immer **kleiner als der kleinste** Einzelwert (kleiner als 100 Ω im ersten Beispiel). 500 Ω oder 300 Ω daraus wäre sofort falsch.

**Belastbarkeit.** Drei **gleiche** Widerstände zu je 1 W: Egal ob in Reihe oder parallel, jeder bekommt denselben Strom bzw. dieselbe Spannung, also tragen alle gleich viel. Die Gruppe verträgt zusammen **3 W** (ED107) — in beiden Fällen. (Bei **ungleichen** Widerständen begrenzt der am stärksten belastete Einzelwiderstand die Gruppe.)`,
    },
    {
      id: 'warn-rg', type: 'callout', tone: 'warning', title: 'Reihe addiert, parallel Kehrwerte — außer bei Kondensatoren',
      md: `Die falschen Antworten bei ED104/ED105 sind die **Summe** (500 Ω, 250 Ω) und der Kehrwertfehler (4 Ω = $1/(\\ldots)$ nicht zurückgekehrt). Merke: Nach $1/R_\\mathrm{G}$ ausrechnen musst du **noch einmal kehren**! Und beim Kondensator drehen sich die Rollen um: **parallel addieren, in Reihe Kehrwerte.**`,
    },
    {
      id: 'viz-builder', type: 'viz', viz: 'series-parallel-builder', title: 'Netzwerk-Baukasten',
      task: 'Baue aus Widerständen der E12-Reihe zuerst **75 Ω** (±1 %, mindestens 2 Teile) und dann **62 Ω** (±2 %, höchstens 3 Teile). Tippe ein Bauteil an, dann „In Reihe +“ oder „Parallel +“.',
    },
    {
      id: 'netzwerke', type: 'text', title: 'Gemischte Netzwerke: von innen nach außen',
      md: `
Komplizierte Schaltungen faltest du **Schritt für Schritt** auf: Suche zwei Teile, die **unmittelbar in Reihe oder parallel** liegen, ersetze sie durch ihren Ersatzwert und wiederhole das, bis nur ein Widerstand übrig ist. Im Katalog kommen immer dieselben Muster vor:

| Muster | Rechnung | Beispiel |
|---|---|---|
| **R₁ + (R₂ ‖ R₃)** | erst parallel, dann addieren | 1 kΩ + (3 kΩ ‖ 1,5 kΩ) = 1 kΩ + 1 kΩ = **2 kΩ** (ED112); 500 Ω + (1 kΩ ‖ 1 kΩ) = **1 kΩ** (ED110) |
| **(R₁ + R₂) ‖ R₃** | erst Reihe, dann parallel | (500 Ω + 500 Ω) ‖ 1 kΩ = **500 Ω** (ED108); (500 Ω + 1,5 kΩ) ‖ 2 kΩ = **1 kΩ** (ED109) |
| **(R₁ ‖ R₂ ‖ R₃) + R₄** | erst parallel, dann addieren | (10 k ‖ 2,5 k ‖ 500 Ω) = 400 Ω; + 600 Ω = **1 kΩ** (ED113) |
| **Leiter mit Abzweigen** | jede Doppelschleife einzeln | siehe unten |

**Leiter-Beispiel (ED114):** Hinter dem ersten 100-Ω-Widerstand liegen zwei Doppelstufen. Der Zweig *100 Ω* liegt parallel zur Reihe *50 Ω + 50 Ω = 100 Ω* → zusammen **50 Ω**. Die zweite Stufe ist genauso aufgebaut: wieder **50 Ω**. Dazu der erste Widerstand (100 Ω) und der Rückleiter (50 Ω):

$$R_\\mathrm{G} = 100\\,\\Omega + 50\\,\\Omega + 50\\,\\Omega + 50\\,\\Omega = 250\\,\\Omega$$

Mit anderen Werten (ED115, ED116) liefert dasselbe Verfahren 550 Ω und 950 Ω. Der Trick: **Achte auf gleiche Werte** — gleiche Widerstände parallel halbieren sich, zwei Zweige mit gleicher Summe ebenfalls.

**[Kondensatoren](wiki:Kondensator (Elektrotechnik)|Capacitor)** folgen denselben Verfahren, nur mit vertauschten Regeln:

- **Parallel:** $C_\\mathrm{G} = C_1 + C_2 + \\ldots$ (bei gleichen Einheiten!). 0,1 µF + 150 nF + 50 000 pF = 0,1 + 0,15 + 0,05 = **0,3 µF** (ED117); 22 nF + 0,033 µF + 15 000 pF = 22 + 33 + 15 = 70 nF = **0,070 µF** (ED118).
- **In Reihe:** $\\dfrac{1}{C_\\mathrm{G}} = \\dfrac{1}{C_1} + \\dfrac{1}{C_2} + \\ldots$ Drei gleiche 0,33 µF: $0{,}33/3 = 0{,}11\\,\\mu\\text{F}$ (ED119); 100 µF, 200 000 nF (= 200 µF), 200 µF: $1/100 + 1/200 + 1/200 = 1/50$ → **50 µF** (ED120). Die Reihenschaltung hat immer **weniger** als die kleinste Einzelkapazität.
- **Gemischt:** (C₁ in Reihe C₂) ‖ C₃ = (10 nF ⊕ 10 nF = 5 nF) + 5 nF = **10 nF** (ED121). C₁ in Reihe mit (C₂ ‖ C₃): 2 µF in Reihe mit (1 µF + 1 µF = 2 µF) = **1 µF** (ED122); 8 nF mit 8 nF → **4 nF** (ED123); 200 nF mit (100 nF + 100 000 pF = 200 nF) → **100 nF** (ED124).

**Einheiten zuerst angleichen:** 1 µF = 1000 nF = 1 000 000 pF. Fast alle Fehler im Kondensatoraufgabenblock sind Einheitenfehler (4400 nF, 0,027 µF …).`,
    },
    {
      id: 'viz-netz', type: 'viz', viz: 'netzwerk-trainer', title: 'Netzwerk-Trainer',
      params: { need: 4 },
      task: 'Berechne **vier Gesamtwerte in Folge** richtig — wechsle auch zu den Kondensatoren (dort gelten die Regeln umgekehrt).',
    },
    {
      id: 'viz-divider', type: 'viz', viz: 'divider-lab', title: 'Spannungsteiler',
      task: 'Stelle die Teilerwiderstände so ein, dass die Ausgangsspannung das Ziel der Demo trifft — erst unbelastet, dann mit Last. Beobachte, wie die Last die Spannung senkt.',
    },
    {
      id: 'calc-teiler', type: 'numeric', title: 'Spannungsteiler',
      question: 'Ein Spannungsteiler aus $R_1 = 6{,}8\\,\\text{k}\\Omega$ und $R_2 = 3{,}3\\,\\text{k}\\Omega$ liegt an 13,8 V. Welche Spannung liegt an $R_2$?',
      answer: 4.5, tolerance: 0.1, unit: 'V',
      hint: '$U_2 = U\\cdot R_2/(R_1+R_2)$.',
      explain: '$U_2 = 13{,}8\\,\\text{V}\\cdot3{,}3/10{,}1 = 4{,}51\\,\\text{V}$; an $R_1$ liegen die restlichen 9,29 V.',
    },
    {
      id: 'calc-par', type: 'numeric', title: 'Parallelschaltung',
      question: 'Zwei Widerstände $R_1 = 220\\,\\Omega$ und $R_2 = 330\\,\\Omega$ liegen parallel. Wie groß ist der Gesamtwiderstand?',
      answer: 132, tolerance: 1, unit: 'Ω',
      hint: '$R_\\mathrm{G} = R_1R_2/(R_1+R_2)$.',
      explain: '$R_\\mathrm{G} = 220\\cdot330/550 = 132\\,\\Omega$ — kleiner als 220 Ω, wie es sein muss.',
    },
    {
      id: 'calc-c', type: 'numeric', title: 'Kondensatoren in Reihe',
      question: 'Zwei Kondensatoren mit 47 nF und 22 nF sind in Reihe geschaltet. Wie groß ist die Gesamtkapazität?',
      answer: 15, tolerance: 0.2, unit: 'nF',
      hint: 'Bei Reihenschaltung von zwei Kondensatoren: Produkt durch Summe.',
      explain: '$C_\\mathrm{G} = \\dfrac{47\\cdot22}{47+22}\\,\\text{nF} = 15\\,\\text{nF}$ — weniger als der kleinere Kondensator (22 nF).',
    },
    {
      id: 'quiz-unit', type: 'quiz', title: 'Kondensatoren parallel',
      question: 'Wie groß ist die Gesamtkapazität von 100 nF, 0,22 µF und 33 000 pF parallel?',
      options: [
        { text: '353 nF (0,353 µF)', correct: true, why: '100 + 220 + 33 = 353 nF — erst alle in nF umrechnen, dann addieren.' },
        { text: '0,35 pF', why: 'Einheiten durcheinander; Parallelschaltung liefert eine größere Kapazität als jede einzelne.' },
        { text: '17,7 nF', why: 'Das wäre die Reihenschaltung (Kehrwertregel) — bei Parallelschaltung addiert man.' },
        { text: '33,3 nF', why: 'Ein Wert kleiner als der größte Einzelwert ist bei Parallelschaltung unmöglich.' },
      ],
    },
    {
      id: 'order-schritte', type: 'order', title: 'Netzwerk auflösen',
      prompt: 'Bringe die Schritte in eine sinnvolle Reihenfolge, um den Gesamtwiderstand von R₁ + (R₂ ‖ R₃) zu berechnen.',
      items: [
        'Teilschaltungen erkennen: R₂ und R₃ liegen parallel',
        'R₂ ‖ R₃ ausrechnen (Produkt durch Summe oder Kehrwerte)',
        'Ersatzwiderstand in die Reihe mit R₁ einsetzen',
        'Beide Werte addieren: R_G = R₁ + R₂₃',
        'Plausibilität prüfen: R_G größer als R₁, aber kleiner als R₁ + R₂',
      ],
      explain: 'Immer von innen nach außen; am Ende die Größenordnung kontrollieren.',
    },
    {
      id: 'match-regeln', type: 'match', title: 'Schaltung → Regel',
      prompt: 'Ordne die Aussage der richtigen Schaltung zu.',
      pairs: [
        ['Gleicher Strom in allen Bauteilen', 'Reihenschaltung'],
        ['Gleiche Spannung an allen Bauteilen', 'Parallelschaltung'],
        ['Kondensatoren: Kapazitäten addieren sich', 'Parallelschaltung'],
        ['Kondensatoren: Kehrwerte addieren sich', 'Reihenschaltung'],
      ],
    },
    {
      id: 'mission-rp', type: 'callout', tone: 'mission', title: 'Funkpraxis: Normwerte kombinieren und Dummy Load bauen',
      md: `Der Widerstand, den du brauchst, liegt oft **nicht** in der [E-Reihe](wiki:E-Reihe|E series of preferred numbers): Dann kombinierst du zwei. 75 Ω aus 150 Ω ‖ 150 Ω, 50 Ω aus 100 Ω ‖ 100 Ω. Dasselbe gilt für Kondensatoren im Abstimmkreis: Ein Trimmer parallel ergibt die Feineinstellung, zwei in Reihe verkleinern die Kapazität. Und die **Dummy Load**: viele gleiche Widerstände parallel ergeben 50 Ω und verteilen die Leistung auf alle (Belastbarkeit addiert sich). Der Spannungsteiler begegnet dir als Pegelanpassung, als Messteiler und — mit mehreren Widerständen — als [Dämpfungsglied](wiki:Dämpfungsglied|Attenuator (electronics)); mit Schleifer heißt er [Potentiometer](wiki:Potentiometer|Potentiometer) (Lautstärkeregler!).`,
    },
    {
      id: 'recall-rp', type: 'recall', title: 'In eigenen Worten',
      prompt: 'Beschreibe die Regeln für Reihen- und Parallelschaltung bei Widerständen und bei Kondensatoren. Wie berechnest du 100 Ω ‖ 400 Ω und die Spannung am unteren Widerstand eines Teilers aus 10 kΩ und 20 kΩ an 9 V?',
      answer: 'Widerstände: Reihe addieren, parallel Kehrwerte addieren (bei zwei Widerständen Produkt durch Summe, bei n gleichen R/n). Kondensatoren genau umgekehrt: parallel addieren, in Reihe Kehrwerte. 100 Ω ‖ 400 Ω = 40000/500 = 80 Ω. Spannungsteiler: U2 = 9 V · 20/(10+20) = 6 V; die Spannungen verhalten sich wie die Widerstände.',
      cards: ['rp-regeln', 'rp-teiler'],
    },
  ],
  cards: [
    { id: 'rp-regeln', front: 'Widerstände: Reihe und parallel?', back: 'Reihe: $R_\\mathrm{G}=R_1+R_2+\\ldots$. Parallel: $1/R_\\mathrm{G}=1/R_1+1/R_2+\\ldots$; zwei: $R_1R_2/(R_1+R_2)$.' },
    { id: 'rp-kondensatoren', front: 'Kondensatoren: Reihe und parallel?', back: 'Parallel **addieren**: $C_1+C_2$. In Reihe **Kehrwerte**: $1/C_\\mathrm{G}=1/C_1+1/C_2$ (umgekehrt wie beim Widerstand).' },
    { id: 'rp-teiler', front: 'Spannungsteiler?', back: '$U_1/U_2=R_1/R_2$; $U_2=U\\cdot R_2/(R_1+R_2)$. Größerer Widerstand, größere Spannung.' },
    { id: 'rp-gleich', front: 'n gleiche Widerstände parallel?', back: '$R_\\mathrm{G}=R/n$ (10 × 500 Ω = 50 Ω).' },
    { id: 'rp-probe', front: 'Plausibilitätsprobe Parallelschaltung?', back: '$R_\\mathrm{G}$ ist kleiner als der kleinste Einzelwiderstand.' },
    { id: 'rp-100-400', front: '100 Ω ‖ 400 Ω? 50 Ω ‖ 200 Ω?', back: '80 Ω und 40 Ω (Produkt durch Summe).' },
    { id: 'rp-belast', front: '3 gleiche Widerstände zu je 1 W (Reihe oder parallel)?', back: 'Zusammen 3 W — in beiden Schaltungen.' },
    { id: 'rp-gemischt', front: 'Gemischte Netzwerke auflösen?', back: 'Von innen nach außen: Teilgruppen zusammenfassen (Reihe/parallel), bis ein Wert übrig ist.' },
    { id: 'rp-einheiten', front: 'Kondensator-Einheiten umrechnen?', back: '1 µF = 1000 nF = 1 000 000 pF; vor dem Rechnen angleichen.' },
    { id: 'rp-cbsp', front: '3 × 0,33 µF in Reihe? 100 µF/200 µF/200 µF in Reihe?', back: '0,11 µF; 50 µF (Kehrwerte: 0,01+0,005+0,005 = 0,02).' },
    { id: 'rp-leiter', front: 'Leiternetzwerk (ED114)?', back: 'Parallelzweige 100 Ω ‖ (50+50) = 50 Ω, zweimal; dazu 100 Ω + 50 Ω: 250 Ω.' },
  ],
};
