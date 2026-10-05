export default {
  id: 'netzteil-glaettung',
  title: 'Glättung, Restwelligkeit, Netzteil-Aufbau',
  summary: 'Ein [[ladekondensator|Ladekondensator]] verwandelt die pulsierende Spannung in eine fast glatte. Du lernst die Faustformel für die [[restwelligkeit]], siehst die kurzen Stromstöße durch die Dioden und setzt das Blockschaltbild eines Netzteils zusammen.',
  minutes: 35,
  needs: ['gleichrichter', 'rc-glied'],
  goals: [
    'Erklären, wie ein [[ladekondensator]] die [[pulsierende-gleichspannung]] glättet (Aufladen in Spitzen, Entladen über die Last)',
    'Die [[restwelligkeit]] mit $\\Delta U \\approx \\dfrac{I}{f\\cdot C}$ abschätzen und eine Kapazität dimensionieren',
    'Begründen, warum der Strom durch die Gleichrichterdioden nur in kurzen Pulsen fließt und was das für den [[einschaltstrom]] bedeutet',
    'Das Blockschaltbild eines [[netzteil|Netzteils]] vom Netz bis zur Last aufbauen',
  ],
  blocks: [
    {
      id: 'tank', type: 'text', title: 'Der Kondensator als Wasserturm',
      md: `
Die Gleichrichtung aus der letzten Lektion liefert Spannungskuppen mit Lücken dazwischen. Ein Verbraucher will aber **ständig** Strom. Die Lösung ist ein Zwischenspeicher: ein **[[ladekondensator|Lade- oder Glättungskondensator]]** (auch *Siebkondensator*, [Glättungskondensator](wiki:Glättungskondensator|Smoothing capacitor)) parallel zur Last.

Denk an einen Wasserturm: Die Pumpe (Gleichrichter) füllt ihn in kurzen Schüben, während die Haushalte (Last) gleichmäßig zapfen. In den Lücken zwischen den Kuppen zehrt die Last vom Speicher, und die Spannung sinkt langsam — bis die nächste Kuppe den Kondensator wieder nachlädt. Das Ergebnis ist ein **Sägezahn** auf einer hohen Gleichspannung: die [[restwelligkeit]] oder Brummspannung.[^kuphaldt-semi-3]

Wo sitzt der Kondensator in Zahlen? Er lädt sich auf nahezu die Spitzenspannung $\\hat u - 2U_F$ auf (Brücke), und seine Spannung fällt dann nur um $\\Delta U$ ab — der Mittelwert liegt also bei etwa $\\hat u - 2U_F - \\Delta U/2$ und damit *viel höher* als ohne Kondensator.`,
    },
    {
      id: 'formel', type: 'text', title: 'Wie groß ist die Welligkeit?',
      md: `
Zwischen zwei Kuppen entlädt die Last den Kondensator mit ungefähr konstantem Strom $I$ über die Zeit $\\Delta t \\approx 1/f_\\text{Welligkeit}$. Die entnommene Ladung ist $Q = I\\,\\Delta t$, und ein Kondensator verliert dabei die Spannung $\\Delta U = Q/C$:

$$\\Delta U \\approx \\frac{I}{f_\\text{Welligkeit}\\cdot C}$$

Die Welligkeitsfrequenz ist 100 Hz bei der Brücke und 50 Hz beim Einweggleichrichter — der **Einweggleichrichter** hat bei gleichem $C$ und $I$ also die **doppelte** Welligkeit. Das ist eine Obergrenze (die Nachladezeit verkürzt die Entladezeit etwas), aber für die Auslegung genau richtig.

**Drei Hebel** gegen Brumm: mehr Kapazität, weniger Laststrom, höhere Welligkeitsfrequenz (Brücke statt Einweg). Der [Elektrolytkondensator](wiki:Elektrolytkondensator|Electrolytic capacitor) ist die übliche Wahl, denn nur er bietet Millifarad bei Netzteil-Spannungen — er ist **gepolt**, und seine Nennspannung muss über der Spitzenspannung liegen.`,
    },
    {
      id: 'pulse', type: 'text', title: 'Der Preis: kurze, kräftige Stromstöße',
      md: `
Eine Diode leitet nur, wenn die Sekundärspannung **höher** ist als die Kondensatorspannung — also nur kurz an der Spitze jeder Halbwelle. Der Ladestrom, der in dieser kurzen Zeit die gesamte entnommene Ladung nachliefern muss, ist deshalb ein schmaler, hoher Puls. Je größer $C$, desto kürzer die Leitzeit und desto höher die Spitze: Ein größerer Kondensator ist **nicht** „gratis".

Beim Einschalten ist der Kondensator leer — er wirkt zunächst wie ein Kurzschluss. Der **[[einschaltstrom]]** ([Inrush current](wiki:Einschaltstrom|Inrush current)) wird nur durch den Innenwiderstand der Trafowicklung und die Dioden begrenzt und kann ein Vielfaches des Nennstroms betragen — Sicherung, Dioden und Trafo müssen das aushalten, und ein [Trafo](wiki:Transformator|Transformer) darf im Netzteil nicht zu knapp ausgelegt sein.`,
    },
    {
      id: 'blockschaltbild', type: 'figure', title: 'Aufbau eines Linear-Netzteils',
      html: `<svg viewBox="0 0 720 150" role="img" aria-label="Blockschaltbild Netzteil: Netz, Trafo, Gleichrichter, Glättungskondensator, Spannungsregler, Last" style="width:100%;height:auto">
  <style>.b{fill:var(--surface);stroke:var(--ink-2);stroke-width:1.6}.t{font:600 12.5px var(--sans);fill:var(--ink);text-anchor:middle}.s{font:11px var(--mono);fill:var(--muted);text-anchor:middle}.a{stroke:var(--ink-2);stroke-width:1.6;fill:none;marker-end:url(#ar)}</style>
  <defs><marker id="ar" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L8 4L0 8z" fill="var(--ink-2)"/></marker></defs>
  <g><rect class="b" x="4" y="40" width="100" height="56" rx="8"/><text class="t" x="54" y="64">Netz</text><text class="s" x="54" y="82">230 V ~</text></g>
  <path class="a" d="M104 68H128"/>
  <g><rect class="b" x="128" y="40" width="100" height="56" rx="8"/><text class="t" x="178" y="64">Trafo</text><text class="s" x="178" y="82">z. B. 12 V ~</text></g>
  <path class="a" d="M228 68H252"/>
  <g><rect class="b" x="252" y="40" width="108" height="56" rx="8"/><text class="t" x="306" y="64">Gleichrichter</text><text class="s" x="306" y="82">pulsierend</text></g>
  <path class="a" d="M360 68H384"/>
  <g><rect class="b" x="384" y="40" width="108" height="56" rx="8"/><text class="t" x="438" y="64">Glättung</text><text class="s" x="438" y="82">Ladeelko, ΔU</text></g>
  <path class="a" d="M492 68H516"/>
  <g><rect class="b" x="516" y="40" width="100" height="56" rx="8"/><text class="t" x="566" y="64">Regler</text><text class="s" x="566" y="82">stabil, glatt</text></g>
  <path class="a" d="M616 68H640"/>
  <g><rect class="b" x="640" y="40" width="76" height="56" rx="8"/><text class="t" x="678" y="72">Last</text></g>
  <text class="s" x="360" y="130">Merke: Trafo – Gleichrichter – Glätten – Regeln</text>
</svg>`,
      caption: 'Blockschaltbild eines geregelten Linear-Netzteils; die Regelstufe folgt in den nächsten Lektionen.',
    },
    {
      id: 'video-glaettung', type: 'video', youtube: '11k7KtYJM0I', label: 'Wieso glättet der Glättungskondensator?', channel: 'DerElektroniker', minutes: 6,
      why: 'Kurze Erklärung der Auf- und Entladung des Glättungskondensators — dasselbe Bild wie im Labor unten, nur gezeichnet.',
    },
    {
      id: 'viz-psu', type: 'viz', viz: 'psu-ripple-lab', title: 'Netzteil-Labor: Welligkeit und Diodenstrom',
      task: 'Stelle die Brückenschaltung auf **1 A** Laststrom und wähle $C$ so, dass die Welligkeit **unter 1 V** bleibt. Beobachte dabei den Diodenstrom: Wenn er mindestens das 5-Fache des Laststroms erreicht, ist auch das zweite Ziel erfüllt. Probiere danach „Einschalten (C leer)" und vergleiche mit dem Einweggleichrichter.',
    },
    {
      id: 'calc-dU', type: 'numeric', title: 'Welligkeit berechnen',
      question: 'Ein Netzteil mit Brückengleichrichter (100 Hz Welligkeit) liefert 0,5 A. Der Ladekondensator hat 4700 µF. Wie groß ist die Restwelligkeit $\\Delta U$ ungefähr (in V)?',
      answer: 1.06, tolerance: 0.02, unit: 'V',
      hint: '$\\Delta U = I/(f\\cdot C)$ mit $C = 4{,}7\\cdot 10^{-3}$ F.',
      explain: '$\\Delta U = \\dfrac{0{,}5\\,\\text{A}}{100\\,\\text{Hz}\\cdot 4{,}7\\cdot10^{-3}\\,\\text{F}} = 1{,}06\\,\\text{V}$.',
    },
    {
      id: 'calc-C', type: 'numeric', title: 'Kapazität auslegen',
      question: 'Bei 1 A Laststrom und 100 Hz Welligkeit soll die Restwelligkeit höchstens 1 V betragen. Wie viel Kapazität (in mF) brauchst du mindestens?',
      answer: 10, tolerance: 0.1, unit: 'mF',
      hint: 'Formel umstellen: $C = I/(f\\cdot\\Delta U)$.',
      explain: '$C = \\dfrac{1\\,\\text{A}}{100\\,\\text{Hz}\\cdot 1\\,\\text{V}} = 10\\,\\text{mF} = 10\\,000\\,\\mu\\text{F}$. Genau deshalb sind Netzteil-Elkos so groß.',
    },
    {
      id: 'calc-einweg-dU', type: 'numeric', title: 'Einweg statt Brücke',
      question: 'Derselbe Kondensator (4700 µF) und dieselbe Last (0,5 A), aber ein Einweggleichrichter (50 Hz Welligkeit). Welligkeit in V?',
      answer: 2.13, tolerance: 0.03, unit: 'V',
      explain: 'Halbe Frequenz bedeutet doppelte Entladezeit und damit **doppelte** Welligkeit: $0{,}5/(50\\cdot 4{,}7\\cdot10^{-3}) = 2{,}13\\,\\text{V}$.',
    },
    {
      id: 'quiz-konstanz', type: 'quiz', question: 'Welche Eigenschaft sollte eine Gleichspannungsquelle (Netzteil) haben?',
      options: [
        { text: 'Bei Belastung eine hohe Spannungskonstanz', correct: true, why: 'Die Ausgangsspannung soll sich bei Laständerung kaum ändern — dafür sorgt der niedrige Innenwiderstand und die Regelung.' },
        { text: 'Eine Ausgangsspannung, die mit dem Laststrom ansteigt', correct: false, why: 'Das wäre das Gegenteil: Eine reale Quelle bricht eher ein, weil Spannung an ihrem Innenwiderstand abfällt.' },
        { text: 'Einen möglichst hohen Innenwiderstand', correct: false, why: 'Hoher Innenwiderstand lässt die Spannung bei Belastung stark absinken.' },
        { text: 'Eine möglichst hohe Restwelligkeit', correct: false, why: 'Brumm stört Verbraucher und Funkgeräte; angestrebt ist möglichst wenig.' },
      ],
    },
    {
      id: 'quiz-groesser', type: 'quiz', question: 'Ein größerer Ladekondensator wird eingebaut. Was ist die Folge?',
      options: [
        { text: 'Die Welligkeit sinkt, dafür steigen Einschaltstrom und Strompulse der Dioden', correct: true, why: 'Weniger ΔU, aber die Dioden leiten kürzer und stärker; der leere Elko zieht beim Einschalten mehr.' },
        { text: 'Die Verluste im Netzteil sinken, weil der Kondensator Energie spart', correct: false, why: 'Der Kondensator speichert nur kurz; die Verluste (Dioden, Trafo) steigen eher durch die Strompulse.' },
        { text: 'Die Welligkeitsfrequenz steigt', correct: false, why: 'Die Frequenz bestimmt die Schaltung (50 bzw. 100 Hz), nicht $C$.' },
        { text: 'Die Spitzenspannung steigt über $\\hat u$', correct: false, why: 'Ein Kondensator kann sich nur bis zur Spitzenspannung (minus Diodenabfall) aufladen.' },
      ],
    },
    {
      id: 'order-block', type: 'order', prompt: 'Bringe das Netzteil-Blockschaltbild in die Reihenfolge vom Netz bis zur Last.',
      items: ['Netz (230 V ~)', 'Trafo', 'Gleichrichter', 'Glättungskondensator', 'Spannungsregler', 'Last'],
      explain: 'Merke: Trafo – Gleichrichter – Glätten – Regeln. Der Trafo kommt zuerst, damit die Gleichrichtung bei ungefährlicher Spannung stattfindet.',
    },
    {
      id: 'recall-pulse', type: 'recall', prompt: 'Warum fließt der Strom durch die Gleichrichterdioden eines Netzteils mit Ladekondensator nur in kurzen Pulsen — und warum ist der Einschaltstrom besonders hoch?',
      answer: 'Eine Diode leitet nur, solange die Sekundärspannung höher ist als die Spannung des Kondensators. Der Kondensator ist fast auf die Spitzenspannung geladen und wird von der Last langsam entladen; deshalb überschreitet die Trafospannung seine Spannung nur kurz um den Scheitel jeder Halbwelle. In dieser kurzen Zeit muss die gesamte entnommene Ladung nachgeliefert werden, also ist der Strom ein schmaler, hoher Puls. Beim Einschalten ist der Kondensator leer (Spannung 0 V), die Diode leitet über einen großen Teil der ersten Halbwelle, und nur der kleine Innenwiderstand des Trafos begrenzt den Strom.',
      hints: ['Wann ist die Diode in Durchlassrichtung?', 'Wie viel Ladung fließt pro Halbwelle, und in welcher Zeit?'],
      cards: ['strompulse-dioden', 'einschaltstrom'],
    },
    {
      id: 'warn-entladen', type: 'callout', tone: 'warning', title: 'Der Elko behält seine Ladung',
      md: `
Ein Ladekondensator mit mehreren Millifarad speichert bei Netzteilspannung genug Energie für einen **elektrischen Schlag** — auch lange nach dem Ziehen des Steckers. Vor Arbeiten im offenen Gerät: Netzstecker ziehen, Spannung am Elko **messen**, bei Bedarf über einen Widerstand (nicht mit dem Schraubendreher!) entladen.

Und der Denkfehler zum Schluss: Mehr Kapazität senkt die Brummspannung, aber **nicht** die Verluste — sie verlagert sie in kräftigere Stromstöße.`,
    },
    {
      id: 'mission', type: 'callout', tone: 'mission', title: 'Prüfung & Funkpraxis',
      md: `
Prüfungsstoff Klasse E: Gleichspannungsquellen sollen bei Belastung eine hohe Spannungskonstanz haben (ED301). Zur Sicherheit gehört die Frage nach den Gefahren beim Öffnen eines vom Netz getrennten Geräts — *Elektrischer Schlag durch aufgeladene Kondensatoren im Netzteil* (EK203). Und an der Funkstelle: die zweipolige Versorgungsleitung (Hin- und Rückleiter, ND103/ND104) und der **polungsrichtige Anschluss**, weil eine Verpolung das Funkgerät beschädigen kann (ND106/ND107).

Brumm im Empfänger (100-Hz-Ton) ist der typische Hinweis auf einen zu kleinen Siebelko oder eine zu hohe Last am Netzteil. Wer das Blockschaltbild kennt, findet den Fehler schneller.[^bnetza-pruefungsfragen-2024]`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table>
<tr><th>Deutsch</th><th>English</th></tr>
<tr><td>Ladekondensator / Siebkondensator / Glättungskondensator</td><td>smoothing (reservoir) capacitor</td></tr>
<tr><td>Restwelligkeit / Brummspannung</td><td>ripple voltage</td></tr>
<tr><td>Einschaltstrom</td><td>inrush current</td></tr>
<tr><td>Netzteil</td><td>power supply (unit)</td></tr>
<tr><td>Elektrolytkondensator (Elko)</td><td>electrolytic capacitor</td></tr>
<tr><td>Spannungskonstanz</td><td>voltage regulation / stability</td></tr>
<tr><td>Blockschaltbild</td><td>block diagram</td></tr>
</table>`,
    },
    {
      id: 'deep-siebglied', type: 'callout', tone: 'deep', title: 'Siebglied: Brumm noch weiter senken',
      md: `
Reicht ein Kondensator nicht, schaltet man ein **Siebglied** nach: einen Längswiderstand (oder eine Drossel) mit einem zweiten Kondensator nach Masse. Das ist ein [[tiefpass|Tiefpass]], der 100 Hz stärker dämpft als die Gleichspannung; teurer, aber weniger Verlust ist meist ein Spannungsregler, der Restwelligkeit und Laständerungen gleich mit ausregelt (nächste Lektion).`,
    },
  ],
  cards: [
    { id: 'dU-formel', front: 'Restwelligkeit eines Netzteils mit Ladekondensator?', back: '$\\Delta U \\approx \\dfrac{I}{f_\\text{Welligkeit}\\cdot C}$ (Obergrenze).' },
    { id: 'welligkeitsfrequenz', front: 'Welligkeitsfrequenz bei Einweg / Brücke am 50-Hz-Netz?', back: 'Einweg 50 Hz, Brücke 100 Hz.' },
    { id: 'einweg-doppelt', front: 'Einweg statt Brücke bei gleichem $C$ und $I$: Restwelligkeit?', back: 'Doppelt so groß (halbe Frequenz).' },
    { id: 'C-formel', front: 'Welche Kapazität für eine gewünschte Welligkeit $\\Delta U$?', back: '$C = \\dfrac{I}{f_\\text{Welligkeit}\\cdot \\Delta U}$ — z. B. 1 A, 100 Hz, 1 V → 10 mF.' },
    { id: 'blockschaltbild-netzteil', front: 'Blockschaltbild eines Linear-Netzteils?', back: 'Netz → Trafo → Gleichrichter → Glättungskondensator → Spannungsregler → Last.' },
    { id: 'strompulse-dioden', front: 'Warum fließt der Diodenstrom nur in kurzen Pulsen?', back: 'Die Diode leitet nur, wenn die Sekundärspannung die Kondensatorspannung übertrifft — kurz am Scheitel; dann muss die ganze Ladung nachgeliefert werden.' },
    { id: 'einschaltstrom', front: 'Einschaltstrom eines Netzteils?', back: 'Der leere Ladekondensator wirkt wie ein Kurzschluss; nur Wicklungswiderstand und Dioden begrenzen — Spitze ≫ Nennstrom.' },
    { id: 'elko-wahl', front: 'Worauf achtest du bei der Wahl eines Elkos im Netzteil?', back: 'Kapazität (für ΔU), **Nennspannung > Spitzenspannung**, richtige **Polung**.' },
    { id: 'groesserer-C', front: 'Was bewirkt ein größerer Ladekondensator?', back: 'Weniger Brumm, aber kürzere/höhere Strompulse und höherer Einschaltstrom — nicht weniger Verluste.' },
    { id: 'brumm', front: 'Was ist Brummspannung?', back: 'Die überlagerte Wechselspannung (Restwelligkeit) auf der Gleichspannung; im Netzteil mit 100 Hz (Brücke).' },
    { id: 'spannungskonstanz', front: 'Welche Eigenschaft soll eine Gleichspannungsquelle haben (ED301)?', back: 'Hohe Spannungskonstanz bei Belastung (kleiner Innenwiderstand, Regelung).' },
  ],
};
