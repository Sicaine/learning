export default {
  id: 'zahlensysteme',
  title: 'Dual-, Hex- und Dezimalsystem',
  summary: 'Warum ein Computer nur Nullen und Einsen kennt, wie du eine Dualzahl in Sekunden im Kopf umrechnest — und was ein Hex-Wert wie 0x3A bedeutet.',
  minutes: 25,
  needs: ['einheiten-und-groessen'],
  goals: [
    'Erklären, warum elektronische Schaltungen das [[dualsystem|Dualsystem]] nutzen',
    'Eine Dualzahl mit bis zu 8 Stellen über die Stellenwerte in eine Dezimalzahl umrechnen (und zurück)',
    'Die Zahl der Zustände $2^n$ aus der Bitzahl bestimmen und [[bit]], [[nibble]] und [[byte]] unterscheiden',
    'Hexadezimalzahlen ([[hexadezimalsystem]]) als Kurzschrift für Gruppen von vier Bit lesen',
  ],
  blocks: [
    {
      id: 'zwei-zustaende', type: 'text', title: 'Zwei Zustände genügen',
      md: `
Ein Lichtschalter kennt zwei Stellungen: **an** und **aus**. Mehr braucht ein elektronisches Bauteil auch nicht: ein [Transistor](wiki:Transistor|Transistor) sperrt oder leitet, eine Leitung führt eine hohe oder eine niedrige Spannung. Diese zwei Zustände sicher zu unterscheiden ist technisch viel einfacher, als zehn verschiedene Spannungsstufen sauber auseinanderzuhalten — Rauschen und Bauteiltoleranzen würden die Stufen verwischen.

Deshalb rechnen digitale Schaltungen im **Dualsystem** (Binärsystem, [Dualsystem](wiki:Dualsystem|Binary number)): Es kennt nur die Ziffern 0 und 1. Eine solche Stelle heißt **[Bit](wiki:Bit|Bit)** (von *binary digit*). Der Universalgelehrte [Gottfried Wilhelm Leibniz](wiki:Gottfried Wilhelm Leibniz|Gottfried Wilhelm Leibniz) hat das Rechnen mit Nullen und Einsen schon um 1700 beschrieben; [Konrad Zuse](wiki:Konrad Zuse|Konrad Zuse) baute daraus in den 1930er-Jahren die ersten programmierbaren Rechner.

Acht Bit bilden ein **[Byte](wiki:Byte|Byte)**, vier Bit ein **[Nibble](wiki:Nibble|Nibble)** (Halbbyte). Mit $n$ Bit lassen sich

$$N = 2^n$$

verschiedene Zustände unterscheiden: 1 Bit → 2, 3 Bit → 8, 8 Bit → 256, 10 Bit → 1024, 12 Bit → 4096.[^bnetza-pruefungsfragen-2024]`,
    },
    {
      id: 'warn-binaer-genau', type: 'callout', tone: 'warning', title: 'Nicht „genauer“, nur einfacher',
      md: `
Das Dualsystem ist **nicht genauer** als das Dezimalsystem — beide stellen dieselben Zahlen dar. Es ist nur mit zwei Zuständen **einfacher in Schaltungen** umzusetzen. Wie fein ein digitaler Wert auflöst, hängt allein von der **Zahl der Bits** ab. Und: Mehr Bits bedeuten nicht „größere Spannung“, sondern mehr Stufen.`,
    },
    {
      id: 'stellenwerte', type: 'text', title: 'Stellenwerte: dasselbe Prinzip wie beim Dezimalsystem',
      md: `
Im [Dezimalsystem](wiki:Dezimalsystem|Decimal) hat jede Stelle den zehnfachen Wert der rechten Nachbarin: $4711 = 4\\cdot1000 + 7\\cdot100 + 1\\cdot10 + 1\\cdot1$. Das nennt man ein **[Stellenwertsystem](wiki:Stellenwertsystem|Positional notation)**. Im Dualsystem verdoppelt sich der Wert pro Stelle:

<table>
<tr><th>Stelle</th><td>7</td><td>6</td><td>5</td><td>4</td><td>3</td><td>2</td><td>1</td><td>0</td></tr>
<tr><th>Wert $2^i$</th><td>128</td><td>64</td><td>32</td><td>16</td><td>8</td><td>4</td><td>2</td><td>1</td></tr>
</table>

Zum Umrechnen schreibst du die Stellenwerte unter die Bits und addierst die, über denen eine **1** steht:

$$z = \\sum_i b_i \\cdot 2^i$$

Beispiel $10011100_2$: Einsen bei 128, 16, 8 und 4 → $128 + 16 + 8 + 4 = 156$.

**Rückwärts** (Dezimal → Dual): die größte Zweierpotenz suchen, die hineinpasst, subtrahieren, weitermachen. $200 = 128 + 64 + 8$ → $11001000_2$.`,
    },
    {
      id: 'viz-bit-toggler', type: 'viz', viz: 'bit-toggler', title: 'Bits setzen',
      params: { rounds: 10, width: 8, hexEvery: 4 },
      task: 'Löse 10 Aufgaben: Stelle die gezeigte Zahl mit den Bit-Schaltern ein (manche Aufgaben sind in Hexadezimal gestellt). Probiere vorher kurz Dezimal- und Hexanzeige aus.',
      caption: 'Tippe auf ein Bit, um es umzuschalten; die Zahl darunter ändert sich sofort. Mit der Bit-Breite stellst du 4, 8 oder 12 Bit ein.',
    },
    {
      id: 'calc-ea205', type: 'numeric', title: 'Dualzahl umrechnen (1)',
      question: 'Wie lautet der dezimale Wert der Dualzahl $01001110_2$?',
      answer: 78, tolerance: 0,
      hint: 'Einsen bei 64, 8, 4 und 2.',
      explain: '$64 + 8 + 4 + 2 = 78$. Genau diese Aufgabe stellt der Fragenkatalog (EA205).',
    },
    {
      id: 'calc-ea208', type: 'numeric', title: 'Dualzahl umrechnen (2)',
      question: 'Wie lautet der dezimale Wert der Dualzahl $11111000_2$?',
      answer: 248, tolerance: 0,
      hint: 'Alle Einsen stehen links: 128 + 64 + … Oder kürzer: $255 - 7$.',
      explain: '$128 + 64 + 32 + 16 + 8 = 248$. Abkürzung: $11111111_2 = 255$, und die drei rechten Nullen sind $-(4+2+1) = -7$. (Katalog EA208.)',
    },
    {
      id: 'calc-zustaende', type: 'numeric', title: 'Zustände zählen',
      question: 'Wie viele verschiedene Zustände kann man mit 5 Bit unterscheiden?',
      answer: 32, tolerance: 0,
      hint: '$2^5$ — jedes zusätzliche Bit verdoppelt die Zahl.',
      explain: '$2^5 = 32$. Merkhilfe: 8 Bit = 256, 10 Bit = 1024, 12 Bit = 4096.',
    },
    {
      id: 'hex', type: 'text', title: 'Hexadezimal: Kurzschrift für Bitgruppen',
      md: `
Lange Dualzahlen lesen sich schlecht. Vier Bit (ein Nibble) haben $2^4 = 16$ Zustände — das passt zu einer Ziffer im **[Hexadezimalsystem](wiki:Hexadezimalsystem|Hexadecimal)** (Basis 16). Weil wir nur zehn Ziffern haben, nimmt man die Buchstaben A bis F dazu:

<table>
<tr><th>Dezimal</th><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td></tr>
<tr><th>Hex</th><td>A</td><td>B</td><td>C</td><td>D</td><td>E</td><td>F</td></tr>
</table>

Umrechnen Dual → Hex: von rechts in Vierergruppen teilen, jede Gruppe einzeln lesen. $1001\\;1100_2$ → $9\\,|\\,C$ → **0x9C**. Dezimal: $9\\cdot16 + 12 = 156$ — dieselbe Zahl wie oben. Das Präfix \`0x\` kennzeichnet Hex (in der Elektronik auch ein nachgestelltes „h“). Du triffst Hexwerte in [Mikrocontrollern](wiki:Mikrocontroller|Microcontroller), bei Zeichencodes wie [ASCII](wiki:ASCII|ASCII) und in Speicheradressen.`,
    },
    {
      id: 'calc-hex', type: 'numeric', title: 'Hex nach Dezimal',
      question: 'Welchen Dezimalwert hat $\\text{0x3A}$?',
      answer: 58, tolerance: 0,
      hint: '3 mal 16 plus A (= 10).',
      explain: '$3\\cdot16 + 10 = 58$. Und $\\text{0xFF} = 15\\cdot16 + 15 = 255$ — das größte Byte.',
    },
    {
      id: 'quiz-ea201', type: 'quiz', title: 'Vorteil des Dualsystems',
      question: 'Was ist der Vorteil des binären gegenüber dem dezimalen Zahlensystem in elektronischen Schaltungen?',
      options: [
        { text: 'Die Ziffern 0 und 1 lassen sich als zwei elektrische Zustände darstellen, die einfach und störsicher zu unterscheiden sind.', correct: true, why: 'Schalter an/aus, Spannung hoch/niedrig — zwei Zustände sind technisch am einfachsten und robustesten.' },
        { text: 'Dualzahlen sind genauer als Dezimalzahlen.', correct: false, why: 'Beide stellen dieselben Zahlen dar; die Genauigkeit hängt an der Zahl der Stellen (Bits).' },
        { text: 'Dualzahlen brauchen weniger Stellen als Dezimalzahlen.', correct: false, why: 'Im Gegenteil: 156 braucht dual acht Stellen, dezimal drei.' },
        { text: 'Dualschaltungen verbrauchen grundsätzlich keinen Strom.', correct: false, why: 'Auch digitale Schaltungen brauchen Energie, besonders beim Umschalten.' },
      ],
    },
    {
      id: 'order-umrechnen', type: 'order', title: 'Dual nach Dezimal',
      prompt: 'Ordne die Schritte, mit denen du eine Dualzahl in eine Dezimalzahl umrechnest.',
      items: [
        'Stellenwerte (…, 8, 4, 2, 1) unter die Bits schreiben, rechts mit 1 beginnend',
        'Die Stellen markieren, unter denen eine 1 steht',
        'Die markierten Stellenwerte addieren',
        'Ergebnis als Dezimalzahl hinschreiben',
      ],
      explain: 'Nullen tragen nichts bei — nur die Einsen zählen.',
    },
    {
      id: 'match-zahlen', type: 'match', title: 'Zahlen in vier Gewändern',
      prompt: 'Ordne gleichwertige Darstellungen zu.',
      pairs: [['0x1F', '31'], ['1010₂', '10'], ['0xFF', '255'], ['100000₂', '32']],
    },
    {
      id: 'mission-zahlen', type: 'callout', tone: 'mission', title: 'Prüfung / Funkpraxis',
      md: `
In der Klasse-E-Prüfung gibt es dazu feste Aufgabentypen: eine Frage zum **Vorteil des Dualsystems** (EA201), die **Zahl der Zustände** bei 3, 4 und 5 Bit (EA202 bis EA204: 8, 16, 32) und vier Umrechnungen „Dualzahl → Dezimalzahl“ mit **8 Stellen** (EA205 bis EA208, z. B. $01001110_2 = 78$). Übe das Addieren der Stellenwerte, bis es ohne Taschenrechner läuft.

Praxis: Dein Funkgerät speichert Frequenzen und Einstellungen als Bytes, und digitale Betriebsarten wie FT8 übertragen Zahlenfolgen aus Nullen und Einsen. Über die CAT-Schnittstelle schickt ein Programm dem Transceiver Befehle als Hex-Bytes.`,
    },
    {
      id: 'ger-zahlen', type: 'callout', tone: 'german', title: 'Fachwörter',
      md: `
<table>
<tr><th>Deutsch</th><th>English</th></tr>
<tr><td>Dualsystem, Binärsystem</td><td>binary system</td></tr>
<tr><td>Dualzahl</td><td>binary number</td></tr>
<tr><td>Stelle, Stellenwert</td><td>digit, place value</td></tr>
<tr><td>Bit, Byte, Halbbyte</td><td>bit, byte, nibble</td></tr>
<tr><td>Hexadezimalsystem</td><td>hexadecimal</td></tr>
<tr><td>Zustand</td><td>state</td></tr>
</table>`,
    },
    {
      id: 'deep-zweierkomplement', type: 'callout', tone: 'deep', title: 'Und negative Zahlen?',
      md: `
Mit einem Bit allein lässt sich kein Minuszeichen speichern. Computer nutzen dafür meist das **[Zweierkomplement](wiki:Zweierkomplement|Two's complement)**: Das höchste Bit zählt negativ. Bei 8 Bit ist $1111\\;1111_2 = -1$ und $1000\\;0000_2 = -128$. Das Vorzeichen ist also kein extra Zeichen, sondern ein Stellenwert $-128$. Für die Prüfung brauchst du das nicht.`,
    },
    {
      id: 'recall-1000', type: 'recall', title: 'Bits abschätzen',
      prompt: 'Wie viele Bit braucht man mindestens, um 1000 verschiedene Zustände zu unterscheiden? Begründe mit einer Zweierpotenz.',
      answer: '**10 Bit.** Mit 9 Bit gibt es nur $2^9 = 512$ Zustände, mit 10 Bit $2^{10} = 1024 \\ge 1000$. Jedes zusätzliche Bit verdoppelt die Zahl der Zustände.',
      hints: ['Zweierpotenzen: 256, 512, 1024.'],
      cards: ['zs-zustaende', 'zs-2n-tabelle'],
    },
  ],
  cards: [
    { id: 'zs-zustaende', front: 'Wie viele Zustände kann man mit $n$ Bit unterscheiden?', back: '$N = 2^n$ (jedes Bit verdoppelt).' },
    { id: 'zs-2n-tabelle', front: 'Zweierpotenzen von $2^0$ bis $2^{12}$?', back: '1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096.' },
    { id: 'zs-vorteil', front: 'Vorteil des Dualsystems in der Elektronik?', back: 'Zwei Ziffern = zwei elektrische Zustände (an/aus, hoch/niedrig): einfach und störsicher darstellbar. (Nicht „genauer“!)' },
    { id: 'zs-dual-dez', front: 'Wie rechnest du eine Dualzahl in Dezimal um?', back: 'Stellenwerte $128, 64, 32, 16, 8, 4, 2, 1$ unter die Bits; Werte mit einer 1 addieren.' },
    { id: 'zs-01001110', front: '$01001110_2 = ?$ (dezimal)', back: '$64+8+4+2 = 78$' },
    { id: 'zs-10001110', front: '$10001110_2 = ?$ (dezimal)', back: '$128+8+4+2 = 142$' },
    { id: 'zs-10011100', front: '$10011100_2 = ?$ (dezimal)', back: '$128+16+8+4 = 156$' },
    { id: 'zs-11111000', front: '$11111000_2 = ?$ (dezimal)', back: '$128+64+32+16+8 = 248$ (also $255 - 7$)' },
    { id: 'zs-byte', front: 'Bit, Nibble, Byte?', back: '1 Bit = 0 oder 1; Nibble = 4 Bit (16 Zustände); Byte = 8 Bit (256 Zustände).' },
    { id: 'zs-hex-ziffern', front: 'Hex-Ziffern 10 bis 15?', back: 'A=10, B=11, C=12, D=13, E=14, F=15.' },
    { id: 'zs-hex-dual', front: 'Wie wandelst du Dual in Hex um?', back: 'Von rechts in Vierergruppen teilen, jede Gruppe als eine Hex-Ziffer lesen: $1001\\,1100_2 = \\text{0x9C}$.' },
    { id: 'zs-0xff', front: '$\\text{0xFF}$ dezimal?', back: '$255$ — das größte Byte ($2^8 - 1$).' },
  ],
};
