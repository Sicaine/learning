export default {
  id: 'einheiten-und-groessen',
  title: 'Einheiten, Vorsätze, Formeln umstellen',
  summary: 'Warum Rechnen in der Elektrotechnik zu 80 % aus Vorsätzen und Umstellen besteht: Pico bis Giga, Taschenrechner-Tasten, die Einheiten der Grundgrößen und der Größenordnungs-Check.',
  minutes: 20,
  goals: [
    'Die [[einheitenvorsatz|Vorsätze]] p, n, µ, m, k, M, G in Zehnerpotenzen übersetzen und sicher umrechnen',
    'Zu einer Größe ([[kapazitaet]], [[induktivitaet]], Feldstärke, [[frequenz]], [[elektrische-leistung|Leistung]]) die richtige Einheit nennen',
    'Eine Formel wie $U = R \\cdot I$ in drei Schritten nach jeder Größe umstellen',
    'Das Ergebnis mit einem Größenordnungs-Check auf Plausibilität prüfen',
  ],
  needs: [],
  blocks: [
    {
      id: 'warum', type: 'text', title: 'Von Mikrovolt bis Kilovolt',
      md: `
In der Elektrotechnik begegnen dir Zahlen, die sich um **zwanzig Zehnerpotenzen** unterscheiden: Das Signal an einem Funkempfänger hat vielleicht ein millionstel Volt, ein Sender gibt 100 Watt ab, eine Überlandleitung führt 380 000 Volt, ein Schaltkreis schaltet in einer milliardstel Sekunde. Niemand schreibt dafür Zahlen wie $0{,}000\\,001$ – man hängt einen **[Vorsatz](wiki:Vorsätze für Maßeinheiten|Unit prefix)** an die Einheit: *Mikro*volt, *Kilo*volt, *Nano*sekunde.

Die Einheiten selbst stammen aus dem [Internationalen Einheitensystem](wiki:Internationales Einheitensystem|International System of Units) (SI). Viele sind nach Forschern benannt: das **Volt** nach [Alessandro Volta](wiki:Alessandro Volta|Alessandro Volta), das **Ampere** nach [André-Marie Ampère](wiki:André-Marie Ampère|André-Marie Ampère), das **Ohm** nach [Georg Simon Ohm](wiki:Georg Simon Ohm|Georg Ohm), das **Watt** nach [James Watt](wiki:James Watt|James Watt), das **Hertz** nach [Heinrich Hertz](wiki:Heinrich Hertz|Heinrich Hertz).[^kuphaldt-dc-kap1]

Wer die Vorsätze im Schlaf beherrscht, hat den halben Rechenteil der Prüfung gewonnen: Fast jede Aufgabe verlangt irgendwo eine Umrechnung.`,
    },
    {
      id: 'vorsaetze', type: 'text', title: 'Die sieben Vorsätze, die du brauchst',
      md: `
Jeder Vorsatz steht für eine feste **[[zehnerpotenz|Zehnerpotenz]]**. Die Reihe geht in Tausenderschritten:

<table>
<tr><th>Vorsatz</th><th>Zeichen</th><th>Faktor</th><th>Beispiel</th></tr>
<tr><td>Pico</td><td>p</td><td>$10^{-12}$</td><td>10 pF Kondensator</td></tr>
<tr><td>Nano</td><td>n</td><td>$10^{-9}$</td><td>100 nF Kondensator</td></tr>
<tr><td>Mikro</td><td>µ</td><td>$10^{-6}$</td><td>5 µV Empfängersignal</td></tr>
<tr><td>Milli</td><td>m</td><td>$10^{-3}$</td><td>20 mA LED-Strom</td></tr>
<tr><td>(Grundeinheit)</td><td></td><td>$10^{0} = 1$</td><td>12 V Bordnetz</td></tr>
<tr><td>Kilo</td><td>k</td><td>$10^{3}$</td><td>4,7 kΩ Widerstand</td></tr>
<tr><td>Mega</td><td>M</td><td>$10^{6}$</td><td>145 MHz Funkfrequenz</td></tr>
<tr><td>Giga</td><td>G</td><td>$10^{9}$</td><td>2,4 GHz WLAN</td></tr>
</table>

**Merkhilfe:** „Zehn hoch minus drei ist Milli, minus sechs Mikro, minus neun Nano, minus zwölf Pico." Wer die Reihe einmal aufsagen kann, kann ablesen: *Milli → Mikro* ist ein Schritt nach unten, also wird die Zahl **1000-mal größer** (1 mA = 1000 µA) – denn die Einheit ist kleiner geworden, also braucht man mehr davon.

Die Schreibweise mit Zehnerpotenz ($4{,}2\\cdot 10^{6}$) heißt [wissenschaftliche Notation](wiki:Wissenschaftliche Notation|Scientific notation); auf dem [Taschenrechner](wiki:Taschenrechner|Calculator) gibst du sie mit der Taste **EXP** oder **EE** ein: \`4,2 EXP 6\` ist $4{,}2\\cdot 10^{6}$ – *ohne* zusätzlich „×10" zu tippen.`,
    },
    {
      id: 'viz-prefix', type: 'viz', viz: 'unit-prefix-trainer', title: 'Vorsatz-Trainer',
      params: { streak: 10 },
      task: 'Löse **10 Aufgaben in Folge** richtig. Ein Fehler setzt die Serie zurück. Beginne mit „m · k · M" und probiere danach alle Vorsätze von p bis G.',
    },
    {
      id: 'umrechnen', type: 'text', title: 'Umrechnen: erst in die Grundeinheit, dann ins Ziel',
      md: `
Ein sicherer Weg für jede Umrechnung: Ersetze den Vorsatz durch seine Zehnerpotenz und rechne um.

$$0{,}00042\\ \\mathrm{A} \;=\; 0{,}00042 \\cdot 10^{0}\\ \\mathrm{A} \;=\; \\frac{0{,}00042}{10^{-6}}\\ \\mu\\mathrm{A} \;=\; 420\\ \\mu\\mathrm{A}$$

Oder kürzer: Um **eine Stufe** (Faktor 1000) nach unten wandert das Komma um **drei Stellen nach rechts**: 0,00042 A → 0,42 mA → 420 µA.

Bei Rechnungen mit vielen Größen hilft es, **alles zuerst in Grundeinheiten** (V, A, Ω, W, F, H, Hz, s) zu verwandeln, durchzurechnen und erst am Ende einen passenden Vorsatz zu wählen. Eine Ausnahme ist die praktische Kombination **kΩ mit mA ergibt V**: 2 mA durch 3 kΩ ergeben direkt 6 V, weil sich $10^{-3}$ und $10^{3}$ aufheben.`,
    },
    {
      id: 'calc-ua', type: 'numeric', title: 'Ampere → Mikroampere',
      question: '**0,000 42 A** sind wie viele **µA**?',
      answer: 420, tolerance: 0, unit: 'µA',
      hint: 'Mikro = $10^{-6}$. Das Komma wandert um sechs Stellen nach rechts.',
      explain: 'Ampere → Milli: ×1000 (0,42 mA); Milli → Mikro: nochmals ×1000: **420 µA**. Das ist genau die Form der Prüfungsfrage EA108.',
    },
    {
      id: 'calc-mhz', type: 'numeric', title: 'Kilohertz → Megahertz',
      question: 'Die 80-m-Band-Frequenz **3750 kHz** entspricht wie vielen **MHz**?',
      answer: 3.75, tolerance: 0.001, unit: 'MHz',
      hint: 'Von Kilo nach Mega: eine Stufe nach oben – die Zahl wird 1000-mal kleiner.',
      explain: '$3750\\ \\mathrm{kHz} = 3750 \\cdot 10^{3}\\ \\mathrm{Hz} = 3{,}75\\cdot 10^{6}\\ \\mathrm{Hz} = 3{,}75\\ \\mathrm{MHz}$.',
    },
    {
      id: 'calc-nf', type: 'numeric', title: 'Mikrofarad → Nanofarad',
      question: '**0,22 µF** sind wie viele **nF**?',
      answer: 220, tolerance: 0, unit: 'nF',
      explain: '1 µF = 1000 nF, also 0,22 µF = **220 nF**.',
    },
    {
      id: 'calc-ohm', type: 'numeric', title: 'Megaohm → Ohm',
      question: '**0,002 MΩ** sind wie viele **Ω**?',
      answer: 2000, tolerance: 0, unit: 'Ω',
      explain: '$0{,}002\\cdot 10^{6}\\ \\Omega = 2000\\ \\Omega = 2\\ \\mathrm{k\\Omega}$.',
    },
    {
      id: 'calc-uw', type: 'numeric', title: 'Zehnerpotenz → Mikrowatt',
      question: '$2 \\cdot 10^{-7}$ W sind wie viele **µW**?',
      answer: 0.2, tolerance: 0.001, unit: 'µW',
      hint: '1 µW = $10^{-6}$ W. Wie oft passt das in $2\\cdot10^{-7}$?',
      explain: '$\\dfrac{2\\cdot 10^{-7}}{10^{-6}} = 0{,}2$, also **0,2 µW** (EA113).',
    },
    {
      id: 'order-prefix', type: 'order', title: 'Vorsätze nach Größe',
      prompt: 'Ordne die Vorsätze **aufsteigend** nach ihrer Größe (kleinster Faktor zuerst).',
      items: ['Piko', 'Nano', 'Mikro', 'Milli', 'Kilo', 'Mega', 'Giga'],
      explain: '$10^{-12} < 10^{-9} < 10^{-6} < 10^{-3} < 10^{3} < 10^{6} < 10^{9}$ – immer Schritte von Tausend.',
    },
    {
      id: 'einheiten', type: 'text', title: 'Welche Einheit gehört zu welcher Größe?',
      md: `
Jede Größe hat ein **[[formelzeichen|Formelzeichen]]** (kursiv, z. B. $U$) und eine **Einheit** (aufrecht, z. B. V). Schreibe nie die Einheit ins Formelzeichen und umgekehrt: $U = 12\\ \\mathrm{V}$.

Die Einheiten der ersten Stufen kennst du schon: [[volt]], [[ampere]], [[ohm]], [[watt]], [[hertz]]. Dazu kommen später die Einheit der [[kapazitaet|Kapazität]] – das [Farad](wiki:Farad|Farad), nach [Michael Faraday](wiki:Michael Faraday|Michael Faraday) – und die der [[induktivitaet|Induktivität]] – das [Henry](wiki:Henry (Einheit)|Henry (unit)), nach [Joseph Henry](wiki:Joseph Henry|Joseph Henry). Für die Felder, die später in der Funktechnik wichtig werden, gehören die [elektrische Feldstärke](wiki:Elektrische Feldstärke|Electric field strength) in **V/m** und die [magnetische Feldstärke](wiki:Magnetische Feldstärke|H-field) in **A/m** dazu.`,
    },
    {
      id: 'match-units', type: 'match', title: 'Größe und Einheit',
      prompt: 'Ordne jeder Größe ihre Einheit zu.',
      pairs: [['Kapazität', 'F'], ['Induktivität', 'H'], ['Elektrische Feldstärke', 'V/m'], ['Magnetische Feldstärke', 'A/m'], ['Frequenz', 'Hz'], ['Leistung', 'W']],
    },
    {
      id: 'umstellen', type: 'text', title: 'Formeln umstellen in drei Schritten',
      md: `
Das **[[ohmsches-gesetz|Ohmsche Gesetz]]** $U = R \\cdot I$ (mehr dazu in der übernächsten Lektion) dient hier als Übungsfall. Du musst es nach jeder der drei Größen auflösen können. Drei Schritte reichen immer – auch bei langen Formeln:

1. **Formel hinschreiben** und die gesuchte Größe markieren: $U = R \\cdot I$, gesucht ist $R$.
2. **Auf beiden Seiten dasselbe tun**, bis die gesuchte Größe allein steht (eine [Äquivalenzumformung](wiki:Äquivalenzumformung)): beide Seiten durch $I$ teilen → $R = \\dfrac{U}{I}$.
3. **Werte in Grundeinheiten einsetzen und rechnen**; Einheit mitführen: $R = \\dfrac{12\\ \\mathrm{V}}{0{,}025\\ \\mathrm{A}} = 480\\ \\Omega$.

Das beliebte „Formeldreieck" ist nur eine Gedächtnisstütze. Es hilft nicht bei Formeln mit Quadraten oder Brüchen – die Umformung in drei Schritten schon.

**Größenordnungs-Check:** Frage dich vor dem Aufschreiben, ob das Ergebnis überhaupt passen kann. Wenige Milliampere an einem Widerstand von einigen Hundert Ohm ergeben nie hunderte Volt. Ein Ergebnis wie 480 000 Ω statt 480 Ω ist fast immer ein Vorsatzfehler um den Faktor 1000.`,
    },
    {
      id: 'calc-umstellen', type: 'numeric', title: 'Widerstand aus U und I',
      question: 'An einem Widerstand liegen **12 V**, es fließen **25 mA**. Wie groß ist er: $R = U / I$?',
      answer: 480, tolerance: 0.5, unit: 'Ω',
      hint: 'Rechne 25 mA zuerst in Ampere um (0,025 A).',
      explain: '$R = \\dfrac{12\\ \\mathrm{V}}{0{,}025\\ \\mathrm{A}} = 480\\ \\Omega$. Mit der Faustregel „V durch mA ergibt kΩ": 12 / 25 = 0,48 kΩ.',
    },
    {
      id: 'quiz-nullen', type: 'quiz', title: 'Nullen zählen',
      question: 'Wie viele Nullen hat **1 MΩ** in der Schreibweise mit der Einheit Ω?',
      options: [
        { text: '6 Nullen (1 000 000 Ω)', correct: true, why: 'Mega = $10^{6}$: eine Eins mit sechs Nullen.' },
        { text: '3 Nullen (1000 Ω)', correct: false, why: 'Das wäre 1 kΩ – ein typischer Verwechsler: Kilo = $10^{3}$, Mega = $10^{6}$.' },
        { text: '9 Nullen (1 000 000 000 Ω)', correct: false, why: 'Das ist 1 GΩ (Giga = $10^{9}$).' },
        { text: '12 Nullen', correct: false, why: '$10^{12}$ ist Tera – kommt im Alltag der Funktechnik kaum vor.' },
      ],
    },
    {
      id: 'mission', type: 'callout', tone: 'mission', title: 'Prüfung & Funkpraxis',
      md: `
Der amtliche Katalog fragt Umrechnungen gleich in Serie ab: schon in der Klasse-N-Technik (*„4,2 V entspricht …", „42 mA entspricht …", „144 000 000 Hz entspricht …"*, NA208–NA213) und erst recht in Klasse E (*„0,22 µF entspricht …", „3750 kHz entspricht …", „0,002 MΩ entspricht …"*, EA108–EA116). Dazu kommt die Zuordnung von Größe und Einheit (NA201–NA207, EA101–EA106).[^bnetza-pruefungsfragen-2024]

Praktisch: Dein Transceiver nennt 144,300 MHz, das Netzteil 13,8 V, die Sendeleistung 5 W = 5000 mW, und die Empfindlichkeit steht in µV. Wer hier Vorsätze verwechselt, wirft bei der Bandplan-Frage um den Faktor 1000 daneben.`,
    },
    {
      id: 'warning', type: 'callout', tone: 'warning', title: 'Typische Stolperfallen',
      md: `
- **Milli und Mega verwechseln**: m (klein) ist ein Tausendstel, M (groß) ein Million-Faches. 1 mW ist winzig, 1 MW ein Kraftwerksblock.
- **Mikro schreiben**: das Zeichen ist **µ** (griechisches my), nicht „u". In Texten liest man trotzdem oft „uF" oder „uV" – gemeint ist µF und µV.
- **Beim Rechnen mit EXP doppelt multiplizieren**: Wer \`4,2 × 10 EXP 6\` tippt, rechnet mit $4{,}2\\cdot 10\\cdot 10^{6}$.
- **Verschiedene Vorsätze addieren**: 3 kΩ + 500 Ω ergibt 3,5 kΩ (oder 3500 Ω) – nicht 3,500 kΩ plus noch etwas. Erst auf einen Vorsatz bringen, dann rechnen.`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>Deutsch</th><th>English</th></tr>
<tr><td>Vorsatz (Einheitenvorsatz)</td><td>unit prefix</td></tr>
<tr><td>Zehnerpotenz</td><td>power of ten</td></tr>
<tr><td>Größenordnung</td><td>order of magnitude</td></tr>
<tr><td>Formelzeichen</td><td>quantity symbol</td></tr>
<tr><td>Einheit</td><td>unit</td></tr>
<tr><td>umstellen (nach … auflösen)</td><td>to rearrange (solve for …)</td></tr>
<tr><td>Taschenrechner</td><td>pocket calculator</td></tr>
<tr><td>Tausendstel / Millionstel</td><td>thousandth / millionth</td></tr></table>`,
    },
    {
      id: 'recall-uf', type: 'recall', title: 'Erkläre es',
      prompt: 'Erkläre, warum **4,7 µF = 4700 nF** gilt und nicht 470 nF. Wie kommst du von der einen Schreibweise auf die andere?',
      answer: `Mikro steht für $10^{-6}$, Nano für $10^{-9}$. Also ist 1 µF = $10^{-6}$ F = 1000 · $10^{-9}$ F = 1000 nF. Die Einheit nF ist 1000-mal kleiner als µF, deshalb braucht man 1000-mal so viele davon: 4,7 µF = 4,7 · 1000 nF = 4700 nF. Eselsbrücke: Beim Wechsel auf den **kleineren** Vorsatz wird die Zahl **größer**.`,
      hints: ['Welche Zehnerpotenz haben µ und n?', 'Wird die Einheit größer oder kleiner – und was bedeutet das für die Zahl?'],
      cards: ['mikro-nano'],
    },
  ],
  cards: [
    { id: 'vorsatz-faktor', front: 'Welchen Faktor haben die Vorsätze p, n, µ, m?', back: 'p = $10^{-12}$, n = $10^{-9}$, µ = $10^{-6}$, m = $10^{-3}$.' },
    { id: 'faktor-vorsatz', front: 'Welcher Vorsatz steht für $10^{3}$, $10^{6}$, $10^{9}$?', back: 'Kilo (k) = $10^{3}$, Mega (M) = $10^{6}$, Giga (G) = $10^{9}$.' },
    { id: 'mikro-nano', front: '4,7 µF in nF?', back: '4700 nF. Kleinerer Vorsatz → größere Zahl (µ→n: ×1000).' },
    { id: 'einheit-c-l', front: 'Einheit von Kapazität und Induktivität?', back: 'Kapazität: Farad (F). Induktivität: Henry (H).' },
    { id: 'einheit-felder', front: 'Einheit der elektrischen und der magnetischen Feldstärke?', back: 'Elektrisch: V/m. Magnetisch: A/m.' },
    { id: 'einheit-f-p', front: 'Einheit von Frequenz und Leistung; Frequenz in Grundeinheiten?', back: 'Hertz (Hz) = 1/s; Watt (W).' },
    { id: 'ee-taste', front: 'Wie gibst du $4{,}2\\cdot10^{6}$ am Taschenrechner ein?', back: '`4,2 EXP 6` (oder EE) – ohne zusätzliches „×10".' },
    { id: 'umstellen-3', front: 'Formel umstellen in drei Schritten', back: '1) Formel hinschreiben, Gesuchtes markieren. 2) Beide Seiten gleich behandeln, bis das Gesuchte allein steht. 3) Grundeinheiten einsetzen, rechnen, Einheit mitführen.' },
    { id: 'kohm-ma', front: 'Welche Kombination von Vorsätzen ergibt direkt Volt?', back: 'kΩ mal mA: $10^{3}\\cdot10^{-3}=1$, z. B. 2 mA · 3 kΩ = 6 V.' },
    { id: 'kleiner-vorsatz', front: 'Wie ändert sich die Zahl beim Wechsel auf einen kleineren Vorsatz?', back: 'Sie wird größer (0,42 mA = 420 µA): kleinere Einheit, mehr Stück.' },
    { id: 'groessenordnung', front: 'Wozu der Größenordnungs-Check?', back: 'Vorsatzfehler (Faktor 1000) und Tippfehler sofort erkennen: Passt das Ergebnis zur Aufgabe?' },
  ],
};
