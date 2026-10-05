export default {
  id: 'blindwiderstand',
  title: 'Kondensator und Spule im Wechselstromkreis',
  summary: 'Warum Kondensatoren hohe Frequenzen durchlassen und Spulen sie sperren: Blindwiderstände $X_C = 1/(\\omega C)$ und $X_L = \\omega L$ und die Phasenlage von Strom und Spannung.',
  minutes: 30,
  needs: ['sinus-wechselspannung', 'kondensator', 'spule-rl-glied'],
  goals: [
    'Den [[kapazitiver-blindwiderstand|kapazitiven]] und [[induktiver-blindwiderstand|induktiven Blindwiderstand]] berechnen: $X_C = 1/(2\\pi f C)$, $X_L = 2\\pi f L$',
    'Beschreiben, wie $X_L$ und $X_C$ von der Frequenz abhängen und was bei $f\\to0$ und $f\\to\\infty$ passiert',
    'Die [[phase|Phasenlage]] angeben: am Kondensator eilt der Strom vor, an der Spule nach',
    'Den Blindwiderstand vom Wirkwiderstand abgrenzen: Er verbraucht keine Leistung',
  ],
  blocks: [
    {
      id: 'intuition', type: 'text', title: 'Wechselstrom „fließt durch" Kondensatoren — Gleichstrom nicht',
      md: String.raw`
Ein [[kondensator|Kondensator]] ([Kondensator](wiki:Kondensator (Elektrotechnik)|Capacitor)) ist eine Unterbrechung: zwischen den Platten ist Isolator. [Gleichstrom](wiki:Gleichstrom|Direct current) fließt nur kurz, um ihn aufzuladen. Legst du aber eine **Wechselspannung** an, wird er ständig auf- und umgeladen — in der Zuleitung fließt Wechselstrom, obwohl keine Ladung durch den Isolator wandert. Je **schneller** die Spannung wechselt und je **größer** die [Kapazität](wiki:Elektrische Kapazität|Capacitance), desto mehr Ladung pendelt pro Sekunde: Der Kondensator wird *leitfähiger*.

Bei der [[spule|Spule]] ([Spule](wiki:Spule (Elektrotechnik)|Inductor)) ist es umgekehrt. Sie wehrt sich gegen jede Stromänderung ([[induktionsgesetz|Induktion]], [Lenzsche Regel](wiki:Lenzsche Regel|Lenz's law)). Bei Gleichstrom ist sie nach dem Einschalten nur ein Stück Draht. Bei schnell wechselndem Strom bremst sie stark — ein wenig wie ein schweres [Schwungrad](wiki:Schwungrad|Flywheel), das sich nur langsam beschleunigen und bremsen lässt. Je schneller der Wechsel und je größer die Induktivität, desto mehr **sperrt** sie — ihre [Induktivität](wiki:Induktivität|Inductance) ist der Maßstab.

Diesen frequenzabhängigen „Widerstand" nennt man [[reaktanz|Blindwiderstand]] ([Blindwiderstand](wiki:Blindwiderstand|Electrical reactance)) $X$, Einheit Ohm. Er ist ein *Wechselstromwiderstand*, aber er setzt — anders als ein Wirkwiderstand — **keine Leistung in Wärme um**: Die Energie pendelt zwischen Quelle und Bauteil hin und her.`,
    },
    {
      id: 'formeln', type: 'text', title: 'Die Formeln',
      md: String.raw`
$$ X_C = \frac{1}{\omega C} = \frac{1}{2\pi f C} \qquad\qquad X_L = \omega L = 2\pi f L $$

<table>
<tr><th></th><th>Kondensator</th><th>Spule</th></tr>
<tr><td>Blindwiderstand</td><td>$X_C = 1/(2\pi f C)$</td><td>$X_L = 2\pi f L$</td></tr>
<tr><td>bei höherer Frequenz</td><td>**sinkt** ($\propto 1/f$)</td><td>**steigt** ($\propto f$)</td></tr>
<tr><td>bei größerem $C$ bzw. $L$</td><td>sinkt ($\propto 1/C$)</td><td>steigt ($\propto L$)</td></tr>
<tr><td>Gleichstrom ($f=0$)</td><td>$X_C\to\infty$: Unterbrechung</td><td>$X_L=0$: nur Drahtwiderstand</td></tr>
<tr><td>sehr hohe Frequenz</td><td>$X_C\to0$: Kurzschluss</td><td>$X_L\to\infty$: Unterbrechung</td></tr>
<tr><td>Phase von $I$ gegen $U$</td><td>Strom **eilt vor** (+90°)</td><td>Strom **eilt nach** (−90°)</td></tr>
</table>

Die Ohmschen Gesetze gelten weiter, aber mit Effektivwerten: $I = U/X$. Die [Phasenverschiebung](wiki:Phasenverschiebung|Phase (waves)) ist anschaulich: Am Kondensator ist der Strom am größten, wenn sich die Spannung am schnellsten ändert (beim Nulldurchgang) — also **90° früher** als die Spannung ihr Maximum erreicht. An der Spule ist die Spannung am größten, wenn sich der Strom am schnellsten ändert — der Strom folgt **90° später**.

**Merkhilfe** (Englisch „ELI the ICE man"): Bei $L$ (Induktivität) kommt $U$ (E) vor $I$; bei $C$ kommt $I$ vor $U$. Deutsch: „Bei C eilt der Strom vor, bei L eilt er nach."[^wp-blindwiderstand]`,
    },
    {
      id: 'calc-xl-hf', type: 'numeric', title: 'Spule im 40-m-Band',
      question: String.raw`Eine Spule mit $L = 10\,\mu\text{H}$ arbeitet bei $f = 7{,}1\,\text{MHz}$. Wie groß ist ihr Blindwiderstand $X_L$, in Ω?`,
      answer: 446, tolerance: 3, unit: 'Ω',
      hint: String.raw`$X_L = 2\pi f L$ mit $f = 7{,}1\cdot10^6$ Hz und $L = 10\cdot10^{-6}$ H.`,
      explain: String.raw`$X_L = 2\pi\cdot7{,}1\cdot10^6\,\text{Hz}\cdot10\cdot10^{-6}\,\text{H} = 446\,\Omega$.`,
    },
    {
      id: 'calc-xc-hf', type: 'numeric', title: 'Kondensator im 40-m-Band',
      question: String.raw`Ein Kondensator mit $C = 100\,\text{pF}$ liegt an $f = 7{,}1\,\text{MHz}$. Wie groß ist $X_C$, in Ω?`,
      answer: 224, tolerance: 2, unit: 'Ω',
      hint: String.raw`$X_C = 1/(2\pi f C)$, $C = 100\cdot10^{-12}$ F.`,
      explain: String.raw`$X_C = 1/(2\pi\cdot7{,}1\cdot10^6\cdot100\cdot10^{-12}) = 1/(4{,}46\cdot10^{-3}) = 224\,\Omega$.`,
    },
    {
      id: 'calc-xc-50', type: 'numeric', title: 'Netzkondensator',
      question: String.raw`Ein Kondensator mit $C = 1\,\mu\text{F}$ liegt an der Netzfrequenz $50\,\text{Hz}$. Wie groß ist $X_C$, in kΩ?`,
      answer: 3.18, tolerance: 0.03, unit: 'kΩ',
      explain: String.raw`$X_C = 1/(2\pi\cdot50\cdot10^{-6}) = 1/(3{,}14\cdot10^{-4}) = 3183\,\Omega\approx3{,}18\,\text{k}\Omega$. Bei 230 V ergäbe das $I = 230/3183 = 72$ mA — ein Vorschaltkondensator „verbraucht" so keine Wärme!`,
    },
    {
      id: 'calc-xl-50', type: 'numeric', title: 'Netzdrossel',
      question: String.raw`Eine Spule mit $L = 100\,\text{mH}$ liegt an $50\,\text{Hz}$. Wie groß ist $X_L$, in Ω?`,
      answer: 31.4, tolerance: 0.3, unit: 'Ω',
      explain: String.raw`$X_L = 2\pi\cdot50\,\text{Hz}\cdot0{,}1\,\text{H} = 31{,}4\,\Omega$.`,
    },
    {
      id: 'calc-faktor', type: 'numeric', title: 'Proportionalität: Faktor',
      question: String.raw`Bei einem Kondensator wird die Frequenz verdoppelt (alles andere bleibt). Mit welchem Faktor ändert sich $X_C$?`,
      answer: 0.5, tolerance: 0.01,
      explain: String.raw`$X_C\propto 1/f$: doppelte Frequenz → halber Blindwiderstand (Faktor $0{,}5$). Gleiches gilt bei doppelter Kapazität. Bei der Spule gilt: doppelte Frequenz → Faktor $2$.`,
    },
    {
      id: 'viz-reactance', type: 'viz', viz: 'reactance-sweep', title: 'Blindwiderstände über der Frequenz',
      intro: String.raw`Oben siehst du $X_L$ (steigt) und $X_C$ (fällt) auf logarithmischer Frequenzachse; sie schneiden sich bei $f_0$. Darunter fließt bei fester Spannung der Strom durch $L$ bzw. $C$, dazu der Zeitverlauf von $u$ und $i$ — mit der Phasenverschiebung. Ändere $L$, $C$ und $f$ und beobachte: Wo wird der Kondensator zum „Kurzschluss", wo die Spule zur „Unterbrechung"?`,
      params: { U: 10, L: 10e-6, C: 100e-12, f: 1e6 },
      task: String.raw`Miss drei Punkte: **(1)** unter $f_0/2$ (dort ist $X_C > X_L$), **(2)** bei $f_0$ selbst ($X_L = X_C$, ±3 %), **(3)** über $2f_0$ (dort ist $X_L > X_C$).`,
      caption: 'Bei f₀ gilt X_L = X_C — ein Vorgriff auf den Schwingkreis (Lektion „LC-Schwingkreis, Resonanz, Güte").',
    },
    {
      id: 'quiz-phase', type: 'quiz', title: 'Phasenlage am Kondensator',
      question: 'Ein idealer Kondensator liegt an einer Sinusspannung. Wie verhält sich der Strom zur Spannung?',
      options: [
        { text: 'Der Strom eilt der Spannung um 90° voraus.', correct: true, why: 'Der Strom ist am größten, wenn sich die Spannung am schnellsten ändert (Nulldurchgang) — ein Viertel Periode vor dem Spannungsmaximum.' },
        { text: 'Der Strom eilt der Spannung um 90° nach.', correct: false, why: 'Das ist die Spule (Merkhilfe: Bei L eilt der Strom nach).' },
        { text: 'Strom und Spannung sind in Phase.', correct: false, why: 'Das gilt nur für den Wirkwiderstand.' },
        { text: 'Strom und Spannung sind um 180° verschoben.', correct: false, why: 'Eine Phasenverschiebung von 180° hat weder C noch L allein.' },
      ],
    },
    {
      id: 'quiz-spule-dc', type: 'quiz', title: 'Spule und Gleichstrom',
      question: 'Eine ideale Spule (Drahtwiderstand vernachlässigt) liegt nach dem Einschwingen an einer **Gleichspannung**. Welcher Strom fließt?',
      options: [
        { text: 'Ein sehr großer Strom: bei $f=0$ ist $X_L=0$, nur der Drahtwiderstand begrenzt ihn.', correct: true, why: 'Die Gleichung $X_L=2\\pi fL$ liefert für $f=0$ den Wert null. Eine Spule ist für Gleichstrom ein Stück Draht — darum braucht ein Relais einen Vorwiderstand oder hat einen hohen Drahtwiderstand.' },
        { text: 'Gar keiner, weil $X_L\\to\\infty$.', correct: false, why: 'Das Verhalten ist gerade umgekehrt: Unendlich wird $X_L$ erst für sehr hohe Frequenzen.' },
        { text: 'Ein Wechselstrom mit 50 Hz.', correct: false, why: 'Die Spannung ist konstant, der Strom auch.' },
        { text: 'Der Strom pendelt zwischen Spule und Quelle.', correct: false, why: 'Pendeln würde Energie nur bei Wechselspannung.' },
      ],
    },
    {
      id: 'match-grenzen', type: 'match', title: 'Verhalten an den Grenzen',
      prompt: 'Welches Verhalten gehört zu welcher Frequenz?',
      pairs: [
        ['Kondensator, $f\\to\\infty$', 'wirkt wie ein Kurzschluss'],
        ['Kondensator, $f\\to0$ (Gleichstrom)', 'wirkt wie eine Unterbrechung'],
        ['Spule, $f\\to\\infty$', 'wirkt wie eine Unterbrechung'],
        ['Spule, $f\\to0$ (Gleichstrom)', 'wirkt wie ein Kurzschluss (nur Draht)'],
      ],
    },
    {
      id: 'reihe-parallel', type: 'text', title: 'Mehrere Kondensatoren und Spulen',
      md: String.raw`
Da $X_C\propto 1/C$ und $X_L\propto L$ gelten die bekannten Regeln für Bauteilwerte weiter:

- **Kondensatoren parallel:** $C_\text{ges} = C_1 + C_2$ (die Plattenflächen addieren sich); **in Reihe:** $\dfrac{1}{C_\text{ges}} = \dfrac{1}{C_1}+\dfrac{1}{C_2}$ — die Gesamtkapazität wird **kleiner** als die kleinste.
- **Spulen in Reihe** (ohne Kopplung): $L_\text{ges} = L_1 + L_2$; **parallel:** $\dfrac{1}{L_\text{ges}} = \dfrac{1}{L_1}+\dfrac{1}{L_2}$.

Das ist das **Spiegelbild** zu den Widerständen: Bei Kondensatoren verhält sich die Reihenschaltung wie die Parallelschaltung von Widerständen, bei Spulen wie bei Widerständen.`,
    },
    {
      id: 'video-c-l', type: 'video', youtube: 'GVpSUxVwki8', label: 'So rechnest du mit Kondensator und Spule!', channel: 'Schrack for Students', minutes: 12,
      why: 'Rechnet Blindwiderstände von C und L im Wechselstromkreis mit Beispielen vor; passt zu den Aufgaben oben.',
    },
    {
      id: 'warning-blind', type: 'callout', tone: 'warning', title: 'Vorsicht: X_C sinkt mit der Frequenz!',
      md: String.raw`
Der häufigste Fehler: „Je höher die Frequenz, desto größer jeder Blindwiderstand." Nein — **nur $X_L$ steigt** ($X_L=\omega L$), **$X_C$ sinkt** ($X_C=1/(\omega C)$). Merke: Kondensatoren lassen Hohes durch, Spulen lassen Tiefes durch. Und: Ein Blindwiderstand *verbraucht keine Leistung*, er erwärmt sich nicht — im Gegensatz zum Wirkwiderstand. Deshalb sind $X_L$ und $X_C$ **nicht** einfach mit $R$ addierbar: Das lernst du in der nächsten Lektion (Zeiger und Impedanz).`,
    },
    {
      id: 'mission', type: 'callout', tone: 'mission', title: 'Prüfung & Funkpraxis',
      md: String.raw`
- **Prüfungsbezug:** EC202 (Wechselstromwiderstand eines Kondensators bei steigender Frequenz → *sinkt*) und EC303 (einer Spule → *steigt*). Auch Filter (ED2xx) und Schwingkreis nutzen diese Gegensätzlichkeit.
- **Praxis:** Ein **Koppelkondensator** zwischen zwei Verstärkerstufen hat bei Audiofrequenzen wenige kΩ — er lässt Sprache durch, sperrt aber die Gleichspannung. Eine **Hochfrequenzdrossel** (z. B. eine [Ferrit](wiki:Ferrite|Ferrite (magnet))-Drossel am Netzteil) hat bei 7 MHz einige hundert Ω und hält HF vom Netz fern. Ein **Abblockkondensator** von 100 nF hat bei 7 MHz nur $X_C = 0{,}23\,\Omega$ — fast ein Kurzschluss für HF, aber eine Unterbrechung für Gleichspannung.
- **Rechentipp:** Frequenz und Bauteilwert vor dem Einsetzen in Grundeinheiten (MHz → $10^6$ Hz, pF → $10^{-12}$ F).`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: String.raw`
<table><tr><th>Deutsch</th><th>English</th><th>Notation</th></tr>
<tr><td>Blindwiderstand</td><td>reactance</td><td>$X$ in Ω</td></tr>
<tr><td>kapazitiver Blindwiderstand</td><td>capacitive reactance</td><td>$X_C = 1/(\omega C)$</td></tr>
<tr><td>induktiver Blindwiderstand</td><td>inductive reactance</td><td>$X_L = \omega L$</td></tr>
<tr><td>Wirkwiderstand</td><td>resistance (real part)</td><td>$R$</td></tr>
<tr><td>voreilen / nacheilen</td><td>to lead / to lag</td><td></td></tr>
<tr><td>Phasenverschiebung</td><td>phase shift</td><td>$\varphi$</td></tr>
<tr><td>Abblockkondensator</td><td>bypass (decoupling) capacitor</td><td></td></tr>
<tr><td>Drossel</td><td>choke</td><td></td></tr></table>`,
    },
    {
      id: 'recall-merk', type: 'recall', title: 'Erkläre es mit eigenen Worten',
      prompt: 'Wie merkst du dir die Phasenlage bei C und L? Und warum wird ein Kondensator bei hoher Frequenz „durchlässiger", eine Spule aber „sperrender"?',
      answer: 'Bei C eilt der Strom vor, bei L eilt er nach (englisch „ELI the ICE man"). Der Kondensator wird bei jedem Wechsel auf- und umgeladen: Je schneller der Wechsel, desto mehr Ladung fließt pro Sekunde — $X_C=1/(2\\pi fC)$ sinkt. Die Spule wehrt sich gegen jede Stromänderung: Je schneller der Wechsel, desto stärker die Gegenspannung — $X_L=2\\pi fL$ steigt. Beide verbrauchen keine Wirkleistung; die Energie pendelt.',
      hints: ['Wann ist beim Kondensator der Strom am größten — bei maximaler Spannung oder am Nulldurchgang?'],
      cards: ['phase-cl', 'xc-f'],
    },
  ],
  cards: [
    { id: 'xl-formel', front: 'Induktiver Blindwiderstand?', back: '$X_L = \\omega L = 2\\pi f L$ — steigt mit der Frequenz.' },
    { id: 'xc-formel', front: 'Kapazitiver Blindwiderstand?', back: '$X_C = \\dfrac{1}{\\omega C} = \\dfrac{1}{2\\pi f C}$ — sinkt mit der Frequenz.' },
    { id: 'phase-cl', front: 'Phasenlage von Strom und Spannung bei C und bei L?', back: 'C: Strom eilt **vor** (+90°). L: Strom eilt **nach** (−90°). („ELI the ICE man")' },
    { id: 'xc-f', front: 'Wie ändert sich $X_C$ mit $f$ und $C$?', back: '$X_C\\propto 1/f$ und $\\propto 1/C$: doppelte Frequenz oder doppeltes $C$ → halber $X_C$.' },
    { id: 'xl-f', front: 'Wie ändert sich $X_L$ mit $f$ und $L$?', back: '$X_L\\propto f$ und $\\propto L$: doppelte Frequenz oder doppeltes $L$ → doppelter $X_L$.' },
    { id: 'c-dc', front: 'Kondensator bei Gleichstrom bzw. sehr hoher Frequenz?', back: 'Gleichstrom ($f\\to0$): Unterbrechung ($X_C\\to\\infty$). Sehr hohe $f$: Kurzschluss ($X_C\\to0$).' },
    { id: 'l-dc', front: 'Spule bei Gleichstrom bzw. sehr hoher Frequenz?', back: 'Gleichstrom: Kurzschluss (nur Draht, $X_L=0$). Sehr hohe $f$: Unterbrechung ($X_L\\to\\infty$).' },
    { id: 'blind-einheit', front: 'Einheit des Blindwiderstands — und verbraucht er Leistung?', back: 'Ohm (Ω); er setzt **keine** Wirkleistung um, die Energie pendelt zwischen Quelle und Feld.' },
    { id: 'xl-beispiel', front: '$X_L$ von 10 µH bei 7,1 MHz?', back: '$2\\pi\\cdot7{,}1\\,\\text{MHz}\\cdot10\\,\\mu\\text{H}\\approx446\\,\\Omega$' },
    { id: 'xc-beispiel', front: '$X_C$ von 100 pF bei 7,1 MHz?', back: '$1/(2\\pi\\cdot7{,}1\\,\\text{MHz}\\cdot100\\,\\text{pF})\\approx224\\,\\Omega$' },
    { id: 'c-reihe', front: 'Gesamtkapazität zweier Kondensatoren in Reihe / parallel?', back: 'Reihe: $1/C=1/C_1+1/C_2$ (kleiner als jedes). Parallel: $C=C_1+C_2$.' },
  ],
};
