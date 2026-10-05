// L04 Bauformen, Farbcode, Toleranz, NTC/PTC — Etappe 1 (Grundgrößen), Teil b.
// DIN-Schaltzeichen der temperaturabhängigen Widerstände (Rechteck + Schrägstrich, Pfeile wie im amtlichen Katalog EC109–EC111).
const ARR = (x, y, up) => `<path d="M${x} ${y + (up ? 24 : 0)}V${y + (up ? 2 : 22)}" /><path d="${up ? `M${x - 3.5} ${y + 8}L${x} ${y + 1}L${x + 3.5} ${y + 8}` : `M${x - 3.5} ${y + 16}L${x} ${y + 23}L${x + 3.5} ${y + 16}`}" />`;
const sym = (type, label, y0 = 0) => {
  const rect = '<path d="M6 58H34M96 58H124"/><rect x="34" y="46" width="62" height="24"/>';
  const slant = '<path d="M90 40L52 78H30" />';
  let body = '';
  if (type === 'ntc') body = rect + slant + ARR(62, 4, true) + ARR(74, 4, false) + '<text x="102" y="86" font-size="16" font-style="italic" font-family="serif" stroke="none" fill="currentColor">ϑ</text>';
  if (type === 'ptc') body = rect + slant + ARR(62, 4, true) + ARR(74, 4, true) + '<text x="102" y="86" font-size="16" font-style="italic" font-family="serif" stroke="none" fill="currentColor">ϑ</text>';
  if (type === 'vdr') body = rect + slant + '<text x="22" y="96" font-size="15" font-family="serif" stroke="none" fill="currentColor">U</text>';
  if (type === 'ldr') body = '<path d="M6 58H34M96 58H124"/><rect x="34" y="46" width="62" height="24" stroke-width="3"/><path d="M52 8L66 26M66 8L80 26" /><path d="M63 28L67.5 29.5L65.5 24.5ZM77 28L81.5 29.5L79.5 24.5Z" fill="currentColor"/>';
  return `<g transform="translate(0 ${y0})" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${body}</g>${label ? `<text x="65" y="${y0 + 108}" text-anchor="middle" font-size="14" font-weight="600" fill="var(--ink)">${label}</text>` : ''}`;
};
const grid = (items, labels) => {
  const cells = items.map((t, i) => `<g transform="translate(${(i % 2) * 150} ${Math.floor(i / 2) * 120})">${sym(t, labels[i])}</g>`).join('');
  return `<svg viewBox="0 0 290 240" style="width:100%;max-width:520px;display:block;margin:0 auto;color:var(--ink)" role="img" aria-label="Schaltzeichen von NTC, PTC, LDR und VDR">${cells}</svg>`;
};

export default {
  id: 'widerstaende-in-der-praxis',
  title: 'Bauformen, Farbcode, Toleranz, NTC/PTC',
  summary: 'Aus welchem Material und in welcher Form ein Widerstand gebaut ist, entscheidet über Wert, Genauigkeit, Belastbarkeit und Hochfrequenz-Tauglichkeit. Du berechnest Drahtwiderstände, liest Farb- und SMD-Codes und lernst temperaturabhängige Widerstände kennen.',
  minutes: 30,
  goals: [
    'Den [[elektrischer-widerstand|Widerstand]] eines Drahts mit $R=\\rho\\cdot l/A$ berechnen und den [[spezifischer-widerstand|spezifischen Widerstand]] verschiedener Metalle vergleichen',
    'Den [[farbcode|Farbcode]] und den [[smd-widerstand|SMD-Code]] lesen und das [[widerstandstoleranz|Toleranzband]] angeben',
    'Die [[normreihe-e12|E-Reihen]] E6, E12 und E24 den Toleranzen zuordnen',
    '[[ntc|NTC]], [[ptc|PTC]], [[fotowiderstand-ldr|LDR]] und [[vdr-varistor|VDR]] an Schaltzeichen und Verhalten unterscheiden',
    'Bauformen ([[drahtwiderstand|Draht]], [[schichtwiderstand|Schicht]]) für Niederfrequenz, Präzision und Hochfrequenz auswählen',
  ],
  needs: ['widerstand-und-ohm'],
  blocks: [
    {
      id: 'wire-intro', type: 'text', title: 'Auch ein Draht ist ein Widerstand',
      md: `
Bisher war der [[widerstand-bauteil|Widerstand]] ein Bauteil mit festem Wert. Dabei hat **jeder** Leiter einen Widerstand — auch das Kabel zum Verbraucher. Stell dir wieder das Wasserrohr vor: Ein langes, dünnes Rohr bremst die Strömung stärker als ein kurzes, dickes. Genau so verhält sich ein Draht. Der Widerstand wächst mit der Länge $l$ und sinkt mit dem Querschnitt $A$:

$$R = \\rho\\cdot\\frac{l}{A}\\qquad A_\\text{Dr} = \\frac{d^2\\cdot\\pi}{4}$$

Die Materialkonstante $\\rho$ heißt [spezifischer Widerstand](wiki:Spezifischer Widerstand|Electrical resistivity). In der Formelsammlung der Prüfung steht sie in der Einheit $\\Omega\\,\\mathrm{mm^2/m}$: Das ist der Widerstand eines Drahts von 1 m Länge und 1 mm² Querschnitt.[^bnetza-pruefungsfragen-2024]

<table>
<tr><th>Material</th><th>$\\rho$ in $\\Omega\\,\\mathrm{mm^2/m}$</th></tr>
<tr><td>[Silber](wiki:Silber|Silver)</td><td>0,016</td></tr>
<tr><td>[Kupfer](wiki:Kupfer|Copper)</td><td>0,018</td></tr>
<tr><td>[Gold](wiki:Gold|Gold)</td><td>0,022</td></tr>
<tr><td>[Aluminium](wiki:Aluminium|Aluminium)</td><td>0,028</td></tr>
<tr><td>[Messing](wiki:Messing|Brass)</td><td>0,07</td></tr>
<tr><td>[Eisen](wiki:Eisen|Iron)</td><td>0,1</td></tr>
<tr><td>Zink</td><td>0,11</td></tr></table>

Silber leitet am besten, Kupfer ist fast ebenso gut und viel billiger — deshalb besteht die Hausinstallation aus Kupfer. Der Durchmesser geht **quadratisch** ein: Verdoppelst du $d$, wird $A$ viermal so groß und $R$ viermal kleiner.[^wiki-widerstand-bauelement]`,
    },
    {
      id: 'wire-viz', type: 'viz', viz: 'wire-resistance', title: 'Leitung dimensionieren',
      params: { l: 20, I: 10, maxDrop: 0.5 },
      task: 'Eine Zuleitung von **20 m** soll **10 A** führen, und auf der Leitung dürfen weniger als **0,5 V** abfallen. Stelle Länge, Strom, Material und Durchmesser so ein. Welcher Durchmesser reicht bei Kupfer? Und was ändert sich bei Aluminium?',
    },
    {
      id: 'calc-wire', type: 'numeric', title: 'Kupferleitung',
      question: 'Eine Kupferleitung ($\\rho = 0{,}018\\ \\Omega\\,\\mathrm{mm^2/m}$) ist **20 m** lang und hat **1,5 mm²** Querschnitt. Wie groß ist ihr Widerstand?',
      answer: 0.24, tolerance: 0.005, unit: 'Ω',
      hint: '$R = \\rho\\cdot l/A$.',
      explain: '$R = 0{,}018\\cdot 20/1{,}5 = 0{,}24\\ \\Omega$. Das klingt wenig, aber bei Strom entsteht ein Spannungsabfall — siehe nächste Aufgabe.',
    },
    {
      id: 'calc-drop', type: 'numeric', title: 'Spannungsabfall',
      question: 'Durch diese Leitung (0,24 Ω) fließen **10 A**. Wie viel Spannung fällt auf der Leitung ab?',
      answer: 2.4, tolerance: 0.05, unit: 'V',
      explain: '$U = R\\cdot I = 0{,}24\\ \\Omega\\cdot 10\\ \\mathrm{A} = 2{,}4\\ \\mathrm V$. Bei einem 12-V-Gerät kämen dort nur noch 9,6 V an — und auf der Leitung gehen $P = U\\cdot I = 24$ W als Wärme verloren.',
    },
    {
      id: 'calc-area', type: 'numeric', title: 'Querschnitt eines Drahtes',
      question: 'Ein runder Draht hat den Durchmesser **d = 0,5 mm**. Welchen Querschnitt hat er?',
      answer: 0.196, tolerance: 0.002, unit: 'mm²',
      hint: '$A = d^2\\cdot\\pi/4$ — mit $d$ in mm kommt $A$ in mm² heraus.',
      explain: '$A = 0{,}5^2\\cdot\\pi/4 = 0{,}196\\ \\mathrm{mm^2}$.',
    },
    {
      id: 'calc-min-area', type: 'numeric', title: 'Mindest-Querschnitt',
      question: 'Wie groß muss der Querschnitt einer **20 m** langen Kupferleitung mindestens sein, damit bei **10 A** höchstens **0,5 V** abfallen?',
      answer: 7.2, tolerance: 0.1, unit: 'mm²',
      hint: 'Zuerst den größten erlaubten Widerstand $R_\\max = U/I$, dann $A = \\rho\\cdot l/R_\\max$.',
      explain: '$R_\\max = 0{,}5/10 = 0{,}05\\ \\Omega$, also $A = 0{,}018\\cdot 20/0{,}05 = 7{,}2\\ \\mathrm{mm^2}$ — das entspricht einem Durchmesser von etwa 3 mm. Genau das hast du in der Demo gefunden.',
    },
    {
      id: 'quiz-double-d', type: 'quiz', title: 'Doppelter Durchmesser',
      question: 'Du ersetzt einen Draht durch einen gleich langen aus demselben Material mit **doppeltem Durchmesser**. Was passiert mit dem Widerstand?',
      options: [
        { text: 'Er sinkt auf ein Viertel.', correct: true, why: 'Der Querschnitt wächst mit $d^2$, also um den Faktor 4; $R\\propto 1/A$.' },
        { text: 'Er sinkt auf die Hälfte.', correct: false, why: 'Das gälte bei doppeltem *Querschnitt*, nicht bei doppeltem Durchmesser.' },
        { text: 'Er bleibt gleich, weil das Material gleich ist.', correct: false, why: 'Das Material bestimmt nur $\\rho$; $R$ hängt zusätzlich von $l$ und $A$ ab.' },
        { text: 'Er verdoppelt sich, weil mehr Material da ist.', correct: false, why: 'Mehr Querschnitt bedeutet mehr parallele Wege für die Ladung, also *weniger* Widerstand.' },
      ],
    },
    {
      id: 'codes', type: 'text', title: 'Farbringe und Zifferncodes',
      md: `
Ein Widerstand ist winzig, ein Aufdruck mit Zahlen wäre kaum lesbar — deshalb tragen bedrahtete Widerstände **Farbringe**. Bei vier Ringen gilt: Ring 1 und 2 sind die Ziffern, Ring 3 der [Multiplikator](wiki:Widerstand (Bauelement)#Farbcodierung|Electronic color code), Ring 4 die [Toleranz](wiki:Toleranz (Technik)|Engineering tolerance) (steht etwas abgesetzt). Bei fünf Ringen gibt es drei Ziffernringe.

<table>
<tr><th>Farbe</th><th>Ziffer</th><th>Multiplikator</th><th>Toleranz</th></tr>
<tr><td>Silber</td><td>–</td><td>×0,01</td><td>±10 %</td></tr>
<tr><td>Gold</td><td>–</td><td>×0,1</td><td>±5 %</td></tr>
<tr><td>Schwarz</td><td>0</td><td>×1</td><td>–</td></tr>
<tr><td>Braun</td><td>1</td><td>×10</td><td>±1 %</td></tr>
<tr><td>Rot</td><td>2</td><td>×100</td><td>±2 %</td></tr>
<tr><td>Orange</td><td>3</td><td>×1 k</td><td>–</td></tr>
<tr><td>Gelb</td><td>4</td><td>×10 k</td><td>–</td></tr>
<tr><td>Grün</td><td>5</td><td>×100 k</td><td>±0,5 %</td></tr>
<tr><td>Blau</td><td>6</td><td>×1 M</td><td>±0,25 %</td></tr>
<tr><td>Violett</td><td>7</td><td>×10 M</td><td>±0,1 %</td></tr>
<tr><td>Grau</td><td>8</td><td>×100 M</td><td>±0,05 %</td></tr>
<tr><td>Weiß</td><td>9</td><td>×1 G</td><td>–</td></tr></table>

**Merkhilfe:** Von Rot bis Violett läuft die Reihe wie im Regenbogen (Rot, Orange, Gelb, Grün, Blau, Violett) — das sind die Ziffern 2 bis 7. Davor kommen Schwarz (0) und Braun (1), danach Grau (8) und Weiß (9).

**Beispiel:** Gelb – Violett – Rot – Gold ist $4\\,7\\cdot 10^2\\,\\Omega = 4{,}7\\ \\mathrm{k\\Omega}$ mit $\\pm 5\\ \\%$. Das *Toleranzband* ist $4700\\cdot(1\\pm 0{,}05)$, also 4465 Ω bis 4935 Ω.

**SMD-Widerstände** sind zu klein für Ringe. Sie tragen drei Ziffern: die ersten beiden sind der Wert, die dritte ist die Zahl der Nullen. „103" bedeutet $10\\cdot 10^3\\ \\Omega = 10\\ \\mathrm{k\\Omega}$, „221" sind 220 Ω. Ein „R" ersetzt das Komma: „4R7" sind 4,7 Ω.[^wiki-widerstand-bauelement]

**Welche Werte gibt es?** Man fertigt nicht jeden Wert, sondern die genormten [E-Reihen](wiki:E-Reihe|E series of preferred numbers): E6 (±20 %), E12 (±10 %) und E24 (±5 %) mit 6, 12 bzw. 24 Werten je Dekade. Die Stufen sind so gewählt, dass sich benachbarte Toleranzbänder gerade berühren — bei E12 liegen die Werte rund 21 % auseinander.[^bnetza-pruefungsfragen-2024]`,
    },
    {
      id: 'code-viz', type: 'viz', viz: 'resistor-code-reader', title: 'Farbcode-Training',
      params: { rounds: 10, need: 8 },
      task: 'Lies Widerstände ab: Erreiche **8 von 10** richtigen Antworten. Probiere 4 Ringe, 5 Ringe und SMD-Code aus; die Farbtabelle darf zum Üben offen bleiben.',
    },
    {
      id: 'quiz-colors', type: 'quiz', title: 'Farbringe lesen',
      question: 'Ein Widerstand mit vier Ringen trägt die Farben **grün – blau – rot – silber**. Welcher Wert und welches Toleranzband sind richtig?',
      options: [
        { text: '5,6 kΩ ± 10 %, also 5040 Ω bis 6160 Ω', correct: true, why: 'Grün 5, Blau 6, Rot ×100 → 5600 Ω; Silber ±10 % → 5600 · 0,9 = 5040 Ω bis 5600 · 1,1 = 6160 Ω. (Prüfungsfrage EC113)' },
        { text: '5,6 kΩ ± 5 %, also 5320 Ω bis 5880 Ω', correct: false, why: '±5 % wäre Gold. Silber bedeutet ±10 %.' },
        { text: '560 kΩ ± 10 %', correct: false, why: 'Rot ist ×100, nicht ×10 000: 56 · 100 = 5600 Ω.' },
        { text: '56 Ω ± 10 %', correct: false, why: 'Der dritte Ring ist der Multiplikator (Rot = ×100), nicht eine weitere Ziffer.' },
      ],
    },
    {
      id: 'calc-smd', type: 'numeric', title: 'SMD-Code',
      question: 'Auf einem SMD-Widerstand steht **223**. Welchen Wert hat er in kΩ?',
      answer: 22, tolerance: 0, unit: 'kΩ',
      hint: 'Erste zwei Ziffern = Wert, dritte Ziffer = Anzahl Nullen.',
      explain: '$22\\cdot 10^3\\ \\Omega = 22\\ \\mathrm{k\\Omega}$. Zur Probe: „103" = 10 kΩ, „221" = 220 Ω (Prüfungsfragen EC115–EC117).',
    },
    {
      id: 'calc-tol', type: 'numeric', title: 'Toleranzband',
      question: 'Ein Widerstand mit **5,6 kΩ** Nennwert hat **10 %** Toleranz. Wie groß ist der kleinste Wert, den der Widerstand innerhalb der Toleranz haben kann?',
      answer: 5040, tolerance: 1, unit: 'Ω',
      explain: '$5600\\ \\Omega\\cdot(1-0{,}10) = 5040\\ \\Omega$; der obere Wert ist $5600\\cdot 1{,}1 = 6160\\ \\Omega$ (EC112).',
    },
    {
      id: 'temp', type: 'text', title: 'Wenn der Widerstand auf die Umgebung reagiert',
      md: `
Bei normalen Widerständen ist der Wert fast konstant — gewollt. Es gibt aber Bauteile, deren Widerstand sich **absichtlich** mit einer Umweltgröße ändert. Sie sind **Sensoren**:

- **[NTC](wiki:Heißleiter) (Heißleiter)**: *negative temperature coefficient* — der Widerstand **sinkt**, wenn es wärmer wird. Typisch für Thermometer und Einschaltstrombegrenzer.
- **PTC ([Kaltleiter](wiki:Kaltleiter|Temperature coefficient#Positive temperature coefficient of resistance))**: *positive temperature coefficient* — der Widerstand **steigt** mit der Temperatur. Keramische PTC schalten oberhalb einer Temperatur steil hochohmig und sichern sich so selbst vor Überhitzung.
- **[LDR](wiki:Fotowiderstand|Photoresistor)**: der Widerstand sinkt mit zunehmender **Beleuchtung** (Dämmerungsschalter, Belichtungsmesser).
- **[VDR](wiki:Varistor|Varistor)**: der Widerstand sinkt, wenn die **Spannung** steigt — er schützt Schaltungen vor Überspannungsspitzen.

Das **[Pt100](wiki:Platin-Messwiderstand|Platinum resistance thermometer)** ist ein Platindraht mit 100 Ω bei 0 °C. Er ändert sich nahezu linear um rund 0,39 % je Kelvin und ist sehr genau — ein Standard für Präzisionsthermometer.[^wiki-platin-messwiderstand] Wie stark sich ein Material je Kelvin verändert, beschreibt der [Temperaturkoeffizient](wiki:Temperaturkoeffizient|Temperature coefficient).`,
    },
    {
      id: 'sym-fig', type: 'figure', title: 'Die vier Schaltzeichen',
      html: grid(['ntc', 'ptc', 'ldr', 'vdr'], ['NTC', 'PTC', 'LDR', 'VDR']),
      caption: 'Alle vier sind Rechtecke (DIN-Widerstand). Der Schrägstrich mit Haken bedeutet „veränderlich durch eine Größe": ϑ = Temperatur, U = Spannung. Bei NTC und PTC zeigen zwei Pfeile die Richtung — beim NTC steigt die Temperatur (↑) und der Widerstand fällt (↓), beim PTC steigen beide (↑↑). Beim LDR fällt Licht auf das Bauteil.',
    },
    {
      id: 'thermo-viz', type: 'viz', viz: 'thermistor-lab', title: 'NTC als Thermometer',
      params: { target: 60, uref: 2.5, tolU: 0.15, ucc: 5 },
      task: 'Ein NTC sitzt zusammen mit einem Vorwiderstand an 5 V. Eine Elektronik soll bei **60 °C** schalten, wenn die Ausgangsspannung **2,5 V** erreicht. Wähle den **Vorwiderstand R_V** (E12-Wert), sodass U_aus bei 60 °C gleich 2,5 V ist. Tipp: Ein Spannungsteiler liefert genau die Hälfte, wenn beide Widerstände gleich sind.',
    },
    {
      id: 'quiz-symbol', type: 'quiz', title: 'Schaltzeichen erkennen',
      question: 'Welche Eigenschaft hat ein **NTC**, und woran erkennst du es im Schaltplan? Wähle die richtige Aussage.',
      options: [
        { text: 'Der Widerstand sinkt mit steigender Temperatur; Rechteck mit Schrägstrich, ϑ und Pfeilen ↑↓.', correct: true, why: 'NTC = Heißleiter. Das ϑ steht für die Temperatur, ↑↓: Temperatur steigt, Widerstand fällt (vgl. EC109–EC110).' },
        { text: 'Der Widerstand steigt mit steigender Temperatur; Rechteck mit Schrägstrich, ϑ und Pfeilen ↑↑.', correct: false, why: 'Das ist der PTC (Kaltleiter), erkennbar an den zwei Aufwärtspfeilen (EC111).' },
        { text: 'Der Widerstand sinkt mit zunehmendem Licht; Rechteck mit zwei schrägen Pfeilen darauf.', correct: false, why: 'Das beschreibt den LDR (Fotowiderstand).' },
        { text: 'Der Widerstand sinkt mit steigender Spannung; Rechteck mit Schrägstrich und U.', correct: false, why: 'Das ist der VDR (Varistor).' },
      ],
    },
    {
      id: 'match-sensors', type: 'match', title: 'Sensor-Widerstände',
      prompt: 'Ordne Bauteil und Verhalten zu.',
      pairs: [
        ['NTC', 'Widerstand sinkt mit steigender Temperatur'],
        ['PTC', 'Widerstand steigt mit steigender Temperatur'],
        ['LDR', 'Widerstand sinkt mit zunehmendem Licht'],
        ['VDR', 'Widerstand sinkt mit steigender Spannung'],
        ['Pt100', '100 Ω bei 0 °C, fast linear'],
      ],
    },
    {
      id: 'shapes', type: 'text', title: 'Bauformen — und warum sie für Funk wichtig sind',
      md: `
Wie der Widerstand gebaut ist, entscheidet über seine Tauglichkeit. Alle Bauformen haben Draht oder Schicht, und jeder Draht ist eine winzige Spule ([Induktivität](wiki:Induktivität|Inductance)):

- **[Drahtwiderstand](wiki:Drahtwiderstand|Wire resistor)**: Widerstandsdraht auf einen Keramikkörper gewickelt. Sehr hoch belastbar, daher ideal bei **niedrigen Frequenzen** und großen Leistungen. Die Wicklung ist aber eine Spule — für Hochfrequenz ungeeignet.
- **Kohleschichtwiderstand**: preiswert, mittlere Genauigkeit.
- **[Metallschichtwiderstand](wiki:Metallschichtwiderstand)**: geringe Toleranz und kleine Temperaturabhängigkeit — der **Präzisionswiderstand**.
- **Metalloxidschichtwiderstand**: **induktionsarm**, belastbar und für Frequenzen **oberhalb von 30 MHz** geeignet.

Für den Funkamateur besonders wichtig: die [künstliche Antenne](wiki:Künstliche Antenne|Dummy load) (*Dummy Load*) — ein 50-Ω-Widerstand, der die Sendeleistung in Wärme verwandelt, damit man ohne Abstrahlung testen kann. Sie darf kaum Eigeninduktivität und Eigenkapazität haben; deshalb baut man sie aus mehreren ungewendelten Schicht- oder Metalloxidwiderständen **parallel** auf (mehr dazu in der nächsten Lektion).[^bnetza-pruefungsfragen-2024]`,
    },
    {
      id: 'quiz-hf', type: 'quiz', title: 'Hochfrequenz-Widerstand',
      question: 'Welche Widerstände sind **induktionsarm** und eignen sich besonders für Frequenzen oberhalb von 30 MHz?',
      options: [
        { text: 'Metalloxidschichtwiderstände', correct: true, why: 'Keine Wicklung, kaum Eigeninduktivität (EC103).' },
        { text: 'Drahtwiderstände', correct: false, why: 'Die Drahtwicklung wirkt wie eine Spule — bei hohen Frequenzen bestimmt diese Induktivität das Verhalten. Gut nur für niedrige Frequenzen und hohe Leistung (EC101).' },
        { text: 'LDR-Widerstände', correct: false, why: 'Ein LDR ist ein Sensor, kein Präzisions- oder HF-Widerstand.' },
        { text: 'NTC-Widerstände', correct: false, why: 'NTC dienen der Temperaturmessung (EC108), nicht als induktionsarme Lastwiderstände.' },
      ],
    },
    {
      id: 'mission', type: 'callout', tone: 'mission', title: 'Prüfung / Funkpraxis',
      md: `
Die **Widerstands-Fragen** gehören zu den dankbarsten der Prüfung — du kannst sie fast mechanisch lösen:

- **Farbcode lesen** (NC102–NC110, EC113): Ziffern, Multiplikator, Toleranz aus der Tabelle der Formelsammlung.
- **Toleranzband** (EC112): $5{,}6\\ \\mathrm{k\\Omega}\\pm 10\\ \\% \\Rightarrow$ 5040 Ω bis 6160 Ω.
- **SMD-Code** (EC115–EC117): „221" ist 220 Ω, „223" ist 22 kΩ.
- **Schaltzeichen** NTC/PTC (EC109–EC111) und **Bauform**: Draht = niedrige Frequenz, Metalloxid = HF (EC101–EC107).

**Praxis:** Ein Funkgerät-Netzteil mit dünner, langer Zuleitung liefert am Gerät weniger Spannung als an der Buchse des Netzteils — die Leitung ist ein Vorwiderstand (siehe Demo: 2,4 V bei 10 A). Für den Aufbau einer Dummy Load nimmst du induktionsarme Widerstände.[^50ohm-lerninhalte]`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>Deutsch</th><th>English</th></tr>
<tr><td>spezifischer Widerstand</td><td>resistivity</td></tr>
<tr><td>Querschnitt</td><td>cross-section</td></tr>
<tr><td>Farbring / Farbcode</td><td>colour band / colour code</td></tr>
<tr><td>Toleranz</td><td>tolerance</td></tr>
<tr><td>Heißleiter (NTC)</td><td>NTC thermistor</td></tr>
<tr><td>Kaltleiter (PTC)</td><td>PTC thermistor</td></tr>
<tr><td>Fotowiderstand (LDR)</td><td>light dependent resistor, photoresistor</td></tr>
<tr><td>spannungsabhängiger Widerstand (VDR)</td><td>varistor</td></tr>
<tr><td>Drahtwiderstand</td><td>wire-wound resistor</td></tr>
<tr><td>Schichtwiderstand</td><td>film resistor</td></tr>
<tr><td>künstliche Antenne</td><td>dummy load</td></tr></table>`,
    },
    {
      id: 'warning', type: 'callout', tone: 'warning', title: 'Typische Fehlvorstellungen',
      md: `
- **„Ein dickerer Draht hat mehr Widerstand, weil mehr Material da ist."** — Umgekehrt: Der Querschnitt ist die Breite des „Rohrs". Dicker heißt weniger Widerstand.
- **„Der Farbring ganz rechts ist immer die Ziffer."** — Der abgesetzte Ring ist die Toleranz; der Multiplikator sitzt davor. Beginne auf der Seite *ohne* Abstand.
- **„Alle Widerstände sind für Hochfrequenz gleich gut."** — Ein Drahtwiderstand ist bei 50 MHz eine Spule mit Widerstand dazu.
- **„NTC und PTC sind dasselbe."** — Entgegengesetztes Verhalten: NTC *sinkt* bei Wärme, PTC *steigt*.`,
    },
    {
      id: 'deep-eseries', type: 'callout', tone: 'deep', title: 'Warum gerade diese Werte (E12 …)?',
      md: `
Die Werte der E-Reihe sind **geometrisch** gestuft: Bei E12 ist jeder Wert um den Faktor $10^{1/12}\\approx 1{,}21$ größer als der vorige (E24: $10^{1/24}\\approx 1{,}10$). So entsteht eine gleichmäßige *prozentuale* Abdeckung: Mit ±10 % Toleranz überlappen sich benachbarte Toleranzbänder, jeder beliebige Wert liegt in der Reichweite eines Normwerts. Die Reihe E12 beginnt: 1,0 – 1,2 – 1,5 – 1,8 – 2,2 – 2,7 – 3,3 – 3,9 – 4,7 – 5,6 – 6,8 – 8,2.`,
    },
    {
      id: 'recall-hf', type: 'recall', title: 'Erkläre es',
      prompt: 'Warum taugt ein Drahtwiderstand schlecht als Dummy Load für 50 MHz? Welche Bauform ist besser, und was sollte man bei der Anordnung beachten?',
      answer: 'Der Widerstandsdraht ist zu einer Wicklung aufgewickelt und damit auch eine Spule mit nennenswerter Eigeninduktivität (und Windungskapazität). Bei 50 MHz ist der Blindanteil nicht mehr vernachlässigbar, die Last ist dann nicht mehr rein ohmisch 50 Ω und reflektiert Leistung. Besser sind ungewendelte, induktionsarme Schicht- bzw. Metalloxidwiderstände, am besten mehrere parallel, damit sich auch die Leistung verteilt und Induktivität/Kapazität klein bleiben.',
      hints: ['Was ist ein aufgewickelter Draht noch?', 'Wie verhält sich eine Spule bei steigender Frequenz?'],
      cards: ['hf-drahtwiderstand', 'dummy-load'],
    },
  ],
  cards: [
    { id: 'rho-formel', front: 'Widerstand eines Drahts?', back: '$R = \\rho\\cdot\\dfrac{l}{A}$ — $\\rho$ in $\\Omega\\,\\mathrm{mm^2/m}$, $l$ in m, $A$ in mm².' },
    { id: 'rho-cu', front: 'Spezifischer Widerstand von Kupfer (Formelsammlung)?', back: '$\\rho_\\text{Cu}=0{,}018\\ \\Omega\\,\\mathrm{mm^2/m}$ (Silber 0,016; Gold 0,022; Aluminium 0,028).' },
    { id: 'draht-flaeche', front: 'Querschnitt eines runden Drahts mit Durchmesser $d$?', back: '$A = \\dfrac{d^2\\cdot\\pi}{4}$ — bei $d=0{,}5$ mm: 0,196 mm².' },
    { id: 'd-verdoppeln', front: 'Draht mit doppeltem Durchmesser — Widerstand?', back: 'Ein Viertel ($A\\propto d^2$).' },
    { id: 'farbcode-reihe', front: 'Farbcode: Ziffernreihe 0–9?', back: 'Schwarz 0, Braun 1, Rot 2, Orange 3, Gelb 4, Grün 5, Blau 6, Violett 7, Grau 8, Weiß 9 (Rot → Violett wie der Regenbogen).' },
    { id: 'farbcode-aufbau', front: 'Aufbau eines 4-Ring-Farbcodes?', back: 'Ring 1 und 2: Ziffern, Ring 3: Multiplikator, Ring 4 (abgesetzt): Toleranz.' },
    { id: 'toleranz-ringe', front: 'Toleranzringe: Silber, Gold, Braun, Rot?', back: 'Silber ±10 %, Gold ±5 %, Braun ±1 %, Rot ±2 %.' },
    { id: 'toleranzband', front: 'Toleranzband eines 5,6-kΩ-Widerstands mit ±10 %?', back: '5040 Ω … 6160 Ω ($5600\\cdot 0{,}9$ bis $5600\\cdot 1{,}1$).' },
    { id: 'smd-code', front: 'SMD-Code „103", „221", „4R7"?', back: '103 = 10 kΩ (10·10³), 221 = 220 Ω, 4R7 = 4,7 Ω (R = Komma). Letzte Ziffer = Anzahl Nullen.' },
    { id: 'e-reihen', front: 'E6, E12, E24 — Toleranz?', back: 'E6 ±20 %, E12 ±10 %, E24 ±5 %; 6/12/24 Werte je Dekade.' },
    { id: 'ntc-ptc', front: 'NTC und PTC: Verhalten und Schaltzeichen?', back: 'NTC sinkt mit steigender Temperatur (Pfeile ↑↓), PTC steigt (↑↑); beide: Rechteck mit Schrägstrich und ϑ.' },
    { id: 'ldr-vdr', front: 'LDR und VDR?', back: 'LDR: Widerstand sinkt mit Licht. VDR: Widerstand sinkt bei steigender Spannung (Schaltzeichen mit U).' },
    { id: 'hf-drahtwiderstand', front: 'Drahtwiderstand: wofür geeignet, wofür nicht?', back: 'Hohe Leistung bei niedrigen Frequenzen; nicht für Hochfrequenz (Wicklung = Induktivität).' },
    { id: 'dummy-load', front: 'Welche Widerstände für HF/Dummy Load (> 30 MHz)?', back: 'Induktionsarme Metalloxidschichtwiderstände (ungewendelt); Metallschicht = Präzision.' },
  ],
};
