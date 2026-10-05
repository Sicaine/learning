const sinePath = (x0, y0, w, a, periods) => {
  let d = ''; for (let i = 0; i <= 120; i++) { const p = i / 120 * periods; d += (i ? 'L' : 'M') + (x0 + w * i / 120).toFixed(1) + ' ' + (y0 - a * Math.sin(2 * Math.PI * p)).toFixed(1); } return d;
};
const figWellen = `<svg viewBox="0 0 520 215" role="img" aria-label="Oszillogramm (Spannung über der Zeit, Periode) neben Momentaufnahme einer Welle (Feldstärke über dem Ort, Wellenlänge)">
<style>.ax{stroke:var(--ink-2);stroke-width:1.3}.cv{fill:none;stroke:var(--accent);stroke-width:2.4}.t{font:600 12px system-ui,sans-serif;fill:var(--ink)}.m{font:11.5px system-ui,sans-serif;fill:var(--muted)}.k{font:700 12px system-ui,sans-serif}</style>
<text class="t" x="10" y="16">Oszillogramm</text><text class="m" x="10" y="31">Spannung u über der Zeit t</text>
<line class="ax" x1="14" x2="244" y1="110" y2="110"/><line class="ax" x1="14" x2="14" y1="42" y2="180"/>
<path class="cv" d="${sinePath(14, 110, 220, 50, 2)}"/>
<text class="m" x="236" y="128" text-anchor="end">t →</text><text class="m" x="18" y="54">u</text>
<line x1="68" x2="68" y1="110" y2="60" stroke="var(--accent-2)" stroke-width="2"/><text class="k" x="74" y="86" style="fill:var(--accent-2)">Amplitude</text>
<line x1="68" x2="178" y1="190" y2="190" stroke="var(--bad)" stroke-width="2"/><line x1="68" x2="68" y1="180" y2="196" stroke="var(--bad)"/><line x1="178" x2="178" y1="180" y2="196" stroke="var(--bad)"/><text class="k" x="123" y="206" text-anchor="middle" style="fill:var(--bad)">Periode T</text>
<text class="t" x="280" y="16">Momentaufnahme einer Welle</text><text class="m" x="280" y="31">Feldstärke E über dem Ort</text>
<line class="ax" x1="284" x2="514" y1="110" y2="110"/><line class="ax" x1="284" x2="284" y1="42" y2="180"/>
<path class="cv" d="${sinePath(284, 110, 220, 50, 2)}"/>
<text class="m" x="506" y="128" text-anchor="end">Ort →</text><text class="m" x="288" y="54">E</text>
<line x1="338" x2="338" y1="110" y2="60" stroke="var(--accent-2)" stroke-width="2"/><text class="k" x="344" y="86" style="fill:var(--accent-2)">Amplitude</text>
<line x1="338" x2="448" y1="190" y2="190" stroke="var(--bad)" stroke-width="2"/><line x1="338" x2="338" y1="180" y2="196" stroke="var(--bad)"/><line x1="448" x2="448" y1="180" y2="196" stroke="var(--bad)"/><text class="k" x="393" y="206" text-anchor="middle" style="fill:var(--bad)">Wellenlänge λ</text>
</svg>`;
const figSpek = `<svg viewBox="0 0 520 170" role="img" aria-label="Oszillogramm zeigt den zeitlichen Verlauf, Amplitudenspektrum die Frequenzanteile">
<style>.ax{stroke:var(--ink-2);stroke-width:1.3}.cv{fill:none;stroke:var(--accent);stroke-width:2.2}.t{font:600 12px system-ui,sans-serif;fill:var(--ink)}.m{font:11.5px system-ui,sans-serif;fill:var(--muted)}</style>
<text class="t" x="10" y="16">Oszillogramm: zeitlicher Verlauf</text>
<line class="ax" x1="14" x2="244" y1="95" y2="95"/><line class="ax" x1="14" x2="14" y1="30" y2="150"/><path class="cv" d="${sinePath(14, 95, 220, 40, 3)}"/>
<text class="m" x="244" y="112" text-anchor="end">Zeit →</text><text class="m" x="18" y="42">Spannung</text>
<text class="t" x="280" y="16">Amplitudenspektrum: Frequenzanteile</text>
<line class="ax" x1="284" x2="514" y1="150" y2="150"/><line class="ax" x1="284" x2="284" y1="30" y2="150"/>
<line x1="344" x2="344" y1="150" y2="52" stroke="var(--accent)" stroke-width="3"/><line x1="404" x2="404" y1="150" y2="100" stroke="var(--accent)" stroke-width="3"/><line x1="464" x2="464" y1="150" y2="124" stroke="var(--accent)" stroke-width="3"/>
<text class="m" x="514" y="166" text-anchor="end">Frequenz →</text><text class="m" x="288" y="42">Amplitude</text>
</svg>`;
const tbl = `<table style="border-collapse:collapse;width:100%;font-size:.9rem"><thead><tr>${['Bereich', 'Frequenz', 'Abkürzung', 'Amateurfunk-Beispiel'].map(c => `<th style="text-align:left;padding:5px 8px;border-bottom:2px solid var(--line)">${c}</th>`).join('')}</tr></thead><tbody>${[
  ['Mittelwelle', '300 kHz – 3 MHz', 'MF', '(Rundfunk)'], ['<b>Kurzwelle</b>', '<b>3 – 30 MHz</b>', '<b>HF, KW</b>, SW', '160 m, 80 m, 15 m, <b>10 m</b>'], ['<b>Ultrakurzwelle</b>', '<b>30 – 300 MHz</b>', '<b>VHF</b>, UKW', '<b>2 m</b>'], ['<b>Dezimeterwelle</b>', '<b>300 – 3000 MHz</b>', '<b>UHF</b>', '<b>70 cm</b>, 23 cm'], ['Zentimeterwelle', '3 – 30 GHz', 'SHF', '13 cm, 3 cm …']].map(r => `<tr>${r.map(c => `<td style="padding:4px 8px;border-bottom:1px solid var(--line)">${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`;

export default {
  id: 'wellenlaenge-rechnen',
  title: 'Funkwellen, Wellenlänge und Frequenzspektrum',
  summary: 'λ = 300 / f[MHz]; Frequenzbereiche (KW, UKW, UHF), Wasserfalldiagramm lesen; Formeln umstellen.',
  minutes: 20,
  goals: [
    'Erklären, was eine Funkwelle ist und wie schnell sie sich ausbreitet',
    'Wellenlänge und Frequenz mit $\\lambda = c/f$ beziehungsweise $\\lambda/\\text{m} = 300/(f/\\text{MHz})$ ineinander umrechnen',
    'Die Bereiche Kurzwelle (HF), UKW (VHF) und Dezimeterwelle (UHF) und die Bänder 10 m, 2 m, 70 cm zuordnen',
    'Oszillogramm, Amplitudenspektrum und Wasserfalldiagramm unterscheiden und lesen',
  ],
  needs: ['frequenz-und-schwingung', 'elektrotechnik/wellen-felder-antennen-intro'],
  blocks: [
    {
      id: 'intro', type: 'text', title: 'Vom Draht in den Raum',
      md: `
Leitet man eine elektrische Schwingung an eine Antenne, strahlt diese eine **Funkwelle** ab. Funkwellen gehören wie das Licht zu den **[elektromagnetischen Wellen](wiki:Elektromagnetische Welle|Electromagnetic wave)** und breiten sich im **Freiraum** (ohne Hindernisse) mit **[Lichtgeschwindigkeit](wiki:Lichtgeschwindigkeit|Speed of light)** aus: rund **300 000 km/s** (nicht 3 000 000 km/s, nicht 30 000 km/s). In einer Sekunde läuft eine Funkwelle also siebenmal um die Erde.[^darc-50ohm]

Eine Funkwelle besteht aus Wellenbergen und Wellentälern. Je höher die Berge und je tiefer die Täler, desto stärker das Signal — man spricht von der **Feldstärke**; die Höhe eines Wellenbergs ist wieder die **Amplitude**.
`,
    },
    {
      id: 'fig-wellen', type: 'figure', title: 'Zwei Kurven, die gleich aussehen — aber etwas anderes zeigen', html: figWellen,
      caption: 'Links: **Oszillogramm** — waagerecht die **Zeit**; der Abstand zwischen zwei Wellenbergen ist die **Periode**. Rechts: **Momentaufnahme** einer Welle — waagerecht der **Ort**; der Abstand zwischen zwei Wellenbergen ist die **Wellenlänge**. In beiden Bildern heißt die Höhe des Berges Amplitude.',
    },
    {
      id: 'warn-welle', type: 'callout', tone: 'warning', title: 'Auf die Achsenbeschriftung achten',
      md: `
- Bei der Momentaufnahme steht auf der waagerechten Achse **Ort**, nicht Zeit. Ihr Abstand zwischen zwei Wellenbergen ist die **Wellenlänge**, nicht die Periode. Die Prüfung fragt: „Was ist in der Momentaufnahme mit 1 markiert?“ — **Amplitude**; „mit 2?“ — **Wellenlänge**. Falsch sind Frequenz, Periode, Spannung oder Strom.
- Die senkrechte Achse zeigt die **Feldstärke**, keine räumliche Auslenkung: Die Welle „tanzt“ nicht auf und ab durch den Raum.
`,
    },
    {
      id: 'text-lambda', type: 'text', title: 'Wellenlänge und Frequenz',
      md: `
Die **[Wellenlänge](wiki:Wellenlänge|Wavelength)** $\\lambda$ (lambda) ist der **Abstand zwischen zwei Wellenbergen** (oder zwei Wellentälern). Ihre Einheit ist das **Meter** (m) — nicht m/s (das ist die Geschwindigkeit), nicht Hz (das ist die Frequenz), nicht s/m. Während die Welle sich in einer Periodendauer $T$ um genau eine Wellenlänge weiterbewegt, gilt:

$$\\lambda = \\frac{c}{f} \\qquad f = \\frac{c}{\\lambda}$$

mit der Ausbreitungsgeschwindigkeit $c \\approx 300\\,000\\,\\text{km/s} = 3\\cdot 10^{8}\\,\\text{m/s}$. **Je höher die Frequenz, desto kürzer die Welle.** Mit $c$ in m/s und $f$ in Hz erhältst du $\\lambda$ in Metern. Praktisch rechnest du mit der **zugeschnittenen Größengleichung** der Formelsammlung:

$$\\lambda\\,[\\text{m}] = \\frac{300}{f\\,[\\text{MHz}]} \\qquad f\\,[\\text{MHz}] = \\frac{300}{\\lambda\\,[\\text{m}]}$$

Diese Gleichungen gelten **nur** mit den genannten Einheiten (Meter und Megahertz). Setze Werte immer in diese Einheiten um: $30\\,\\text{mm} = 0{,}03\\,\\text{m}$; $10\\,\\text{cm} = 0{,}1\\,\\text{m}$.[^bnetza-formelsammlung]

**Beispiele:**

- $f = 145\\,\\text{MHz}$ → $\\lambda = 300/145 = 2{,}07\\,\\text{m}$ (das „2-m-Band“)
- $\\lambda = 80\\,\\text{m}$ → $f = 300/80 = 3{,}75\\,\\text{MHz}$ (80-m-Band: 3,5–3,8 MHz)
- $\\lambda = 30\\,\\text{mm} = 0{,}03\\,\\text{m}$ → $f = 300/0{,}03 = 10\\,000\\,\\text{MHz} = 10\\,\\text{GHz}$
- $f = 433{,}5\\,\\text{MHz}$ → $\\lambda = 300/433{,}5 = 0{,}69\\,\\text{m}$

**Plausibilitätsprobe:** Die Bandnamen verraten die Größenordnung (80-m-Band um 80 m, 2-m-Band um 2 m, 70-cm-Band um 70 cm). Weicht dein Ergebnis um Faktor 10 oder 100 ab, hast du das Komma oder eine Einheit verdreht — und genau dort lauern die falschen Antworten (zum Beispiel 9,49 *cm* statt 10,5 *m*).
`,
    },
    {
      id: 'viz-lambda', type: 'viz', viz: 'wellenlaenge-rechner', title: 'Frequenz und Wellenlänge im Spektrum',
      params: {},
      task: 'Lies die **Wellenlänge des 2-m-Bandes** ab, stelle **λ = 80 m** ein (welche Frequenz ergibt sich?) und finde **10 GHz** (λ = 3 cm).',
      caption: 'Die Leiste ist logarithmisch: Jeder Teilstrich ist ein Faktor 10. Mit den Knöpfen springst du zu den Bändern.',
    },
    {
      id: 'num-433', type: 'numeric', title: 'Welche Wellenlänge?',
      question: 'Welcher Wellenlänge entspricht eine Frequenz von 433,5 MHz im Freiraum?',
      answer: 0.69, tolerance: 0.02, unit: 'm',
      explain: '$\\lambda = 300/433{,}5 = 0{,}69\\,\\text{m}$ (69 cm — passt zum 70-cm-Band).',
    },
    {
      id: 'num-208', type: 'numeric', title: 'Welche Frequenz?',
      question: 'Welcher Frequenz entspricht eine Wellenlänge von 2,08 m im Freiraum?',
      answer: 144, tolerance: 0.02, unit: 'MHz',
      explain: '$f = 300/2{,}08 = 144\\,\\text{MHz}$.',
    },
    {
      id: 'num-184', type: 'numeric', title: 'Mittelwelle? Nein, Kurzwelle',
      question: 'Welcher Wellenlänge entspricht die Frequenz 1,84 MHz (160-m-Band)?',
      answer: 163, tolerance: 0.02, unit: 'm',
      explain: '$\\lambda = 300/1{,}84 = 163\\,\\text{m}$. Sinnprobe: Im 160-m-Band erwartest du etwa 160 m.',
    },
    {
      id: 'num-3cm', type: 'numeric', title: 'Zentimeterwellen',
      question: 'Eine Wellenlänge von 10 cm im Freiraum entspricht welcher Frequenz in GHz?',
      answer: 3, tolerance: 0.02, unit: 'GHz',
      explain: '$10\\,\\text{cm} = 0{,}1\\,\\text{m}$, also $f = 300/0{,}1 = 3000\\,\\text{MHz} = 3\\,\\text{GHz}$.',
    },
    {
      id: 'num-2850', type: 'numeric', title: '28,5 MHz',
      question: 'Welche Wellenlänge hat 28,5 MHz (innerhalb des 10-m-Bandes)?',
      answer: 10.5, tolerance: 0.02, unit: 'm',
      explain: '$\\lambda = 300/28{,}5 = 10{,}5\\,\\text{m}$ — nicht 9,49 m (das wären 31,6 MHz, außerhalb des Bandes).',
    },
    {
      id: 'text-spektrum', type: 'text', title: 'Das Frequenzspektrum: KW, UKW, UHF',
      md: `
Das **[Frequenzspektrum](wiki:Elektromagnetisches Spektrum|Electromagnetic spectrum)** der elektromagnetischen Wellen ist riesig; für Funkwellen wird üblicherweise der Bereich von 30 kHz bis 300 GHz genutzt. Die **Frequenzbereiche** haben Namen und Abkürzungen:

${tbl}

Für die Prüfung musst du die Bereiche von **3 MHz bis 3000 MHz** zuordnen: **3–30 MHz** = **High Frequency (HF)**, Short Wave (SW), **[Kurzwelle](wiki:Kurzwelle|High frequency)**; **30–300 MHz** = **Very High Frequency (VHF)**, **[Ultrakurzwelle](wiki:Ultrakurzwelle|Very high frequency)** (UKW); **300–3000 MHz** = **Ultra High Frequency (UHF)**, **[Dezimeterwelle](wiki:Dezimeterwelle|Ultra high frequency)**. Das **10-m-Band** (28–29,7 MHz) gehört gerade noch zur Kurzwelle, das **2-m-Band** zu VHF und das **70-cm-Band** zu UHF. Mittelwelle (MF, $300\\,\\text{kHz}$ bis $3\\,\\text{MHz}$) ist dagegen **keiner** der drei Antworten.[^darc-50ohm]
`,
    },
    {
      id: 'match-bereiche', type: 'match', title: 'Band und Frequenzbereich',
      prompt: 'Ordne zu: In welchem Frequenzbereich liegt das Band?',
      pairs: [
        ['10-m-Band', 'Kurzwelle (HF)'],
        ['2-m-Band', 'Ultrakurzwelle (VHF)'],
        ['70-cm-Band', 'Dezimeterwelle (UHF)'],
        ['3 bis 30 MHz', 'High Frequency (HF)'],
        ['300 bis 3000 MHz', 'Ultra High Frequency (UHF)'],
      ],
    },
    {
      id: 'text-wasserfall', type: 'text', title: 'Wer sendet gerade? Spektrum und Wasserfall',
      md: `
Am Funkgerät stellst du die Frequenz mit Drehknopf oder Tasten ein — hören kannst du nur Stationen auf **dieser** Frequenz. Moderne Geräte zeigen deshalb zusätzlich, was **daneben** los ist:[^darc-50ohm]

- **[Amplitudenspektrum](wiki:Spektrumanalysator|Spectrum analyzer):** waagerecht die **Frequenz**, senkrecht die **Amplitude** (Signalstärke). Aktive Stationen siehst du als Ausschläge.
- **[Wasserfalldiagramm](wiki:Wasserfalldiagramm|Waterfall chart):** waagerecht die **Frequenz**, senkrecht die **Zeit** (neueste Zeile oben, ältere laufen nach unten wie ein Wasserfall), die **Signalstärke als Farbton und/oder Helligkeit**. Man sieht, wann eine Aussendung beginnt und endet.

Beide Anzeigen zeigen einen **Ausschnitt** des Bandes mit der eingestellten Frequenz in der Mitte. Nicht verwechseln mit dem **Oszillogramm**: Es zeigt einen **zeitlichen Verlauf** (Spannung über der Zeit), das Amplitudenspektrum zeigt die **Frequenzanteile** eines Signals.
`,
    },
    {
      id: 'fig-spektrum', type: 'figure', title: 'Zeit oder Frequenz?', html: figSpek,
      caption: 'Dieselbe Information, zwei Blickwinkel: Das Oszillogramm zeigt den **zeitlichen Verlauf**, das Amplitudenspektrum die **Frequenzanteile**. Die drei Linien rechts entsprechen drei Frequenzen — ein reiner Sinus wäre nur eine Linie.',
    },
    {
      id: 'viz-wasserfall', type: 'viz', viz: 'wasserfall-leser', title: 'Wasserfall-Leser',
      params: { goals: 5 },
      task: 'Finde alle **fünf Signalarten** im Wasserfall: Träger, CW, SSB, Digital, FM.',
      caption: 'Simulierter Ausschnitt von 40 kHz. Oben das Amplitudenspektrum, unten der Wasserfall; helle Streifen sind starke Signale.',
    },
    {
      id: 'quiz-spektrum', type: 'quiz', title: 'Spektrum, Wasserfall, Oszillogramm',
      question: 'Welche Aussagen sind richtig? (Mehrfachauswahl)',
      options: [
        { text: 'Im Wasserfalldiagramm sind Frequenz und Zeit die Achsen, die Signalstärke wird als Farbton und/oder Helligkeit dargestellt.', correct: true, why: 'Genau so ist es: waagerecht Frequenz, senkrecht Zeit.' },
        { text: 'Ein Oszillogramm zeigt einen zeitlichen Verlauf, ein Amplitudenspektrum die Frequenzanteile eines Signals.', correct: true, why: 'Der Unterschied zwischen Zeit- und Frequenzbereich.' },
        { text: 'Im Wasserfall steht die Signalstärke auf einer Achse, die Zeit ist die Farbe.', correct: false, why: 'Die Farbe/Helligkeit ist die Signalstärke.' },
        { text: 'Das Amplitudenspektrum zeigt Spannung und Strom eines Signals.', correct: false, why: 'Es zeigt Amplituden über der Frequenz.' },
        { text: 'Das Oszillogramm zeigt die Frequenzanteile.', correct: false, why: 'Das ist die Aufgabe des Spektrums.' },
      ],
    },
    {
      id: 'mission', type: 'callout', tone: 'mission', title: 'Funkpraxis: Wellenlänge im Alltag',
      md: `
Die Bandnamen sind Wellenlängen: Eine **Viertelwellen-Antenne** für das 2-m-Band ist etwa 48 cm lang, eine **Halbwellen-Dipol** für 80 m rund 40 m (dazu später mehr in der Antennen-Etappe). Wer die Gleichung $\\lambda = 300/f$ im Kopf hat, schätzt Antennenlängen, erkennt falsche Antworten und versteht, warum kleine Handfunkgeräte nur VHF/UHF können: **Kurze Wellen brauchen kurze Antennen.**

*Prüfungsbezug:* NB301–NB303, EB311–EB316 (Rechnen), NB402/NB403 (Momentaufnahme), BC101–BC106 (Frequenzbereiche), NF104–NF106 (Display), NI401 (Oszillogramm/Spektrum).
`,
    },
    {
      id: 'recall', type: 'recall', title: 'Mit eigenen Worten',
      prompt: 'Warum ist die Wellenlänge im 2-m-Band kürzer als im 80-m-Band? Wie rechnest du von 145 MHz auf die Wellenlänge, und in welchem Frequenzbereich liegt das Band?',
      answer: 'Wellenlänge und Frequenz sind über die Lichtgeschwindigkeit verknüpft: λ = c/f. Je höher die Frequenz, desto kürzer die Welle. Praktisch λ[m] = 300 / f[MHz]: 300/145 ≈ 2,07 m. 145 MHz liegt im VHF-Bereich (30–300 MHz, Ultrakurzwelle). 80 m entspricht dagegen etwa 3,75 MHz (Kurzwelle, HF).',
      hints: ['λ = 300 / f[MHz]', 'VHF = 30–300 MHz'],
      cards: ['lambda-formel', 'bereiche'],
    },
  ],
  cards: [
    { id: 'c-wert', front: 'Ausbreitungsgeschwindigkeit elektromagnetischer Wellen im Freiraum?', back: 'Etwa 300 000 km/s (Lichtgeschwindigkeit, $3\\cdot 10^{8}$ m/s).' },
    { id: 'lambda-def', front: 'Was ist die Wellenlänge? Einheit?', back: 'Der Abstand zwischen zwei Wellenbergen (oder -tälern) einer Welle; Einheit Meter. Auf der Momentaufnahme steht auf der x-Achse der Ort.' },
    { id: 'lambda-formel', front: 'Formeln Wellenlänge/Frequenz?', back: '$\\lambda = \\dfrac{c}{f}$; praktisch $\\lambda\\,[\\text{m}] = \\dfrac{300}{f\\,[\\text{MHz}]}$ und $f\\,[\\text{MHz}] = \\dfrac{300}{\\lambda\\,[\\text{m}]}$.' },
    { id: 'bsp-145', front: '145 MHz → λ? 80 m → f? 30 mm → f?', back: '2,07 m; 3,75 MHz; 10 GHz (0,03 m → 10 000 MHz).' },
    { id: 'bsp-bands', front: 'λ bei 1,84 MHz? 21 MHz? 28,5 MHz? 433,5 MHz?', back: '163 m; 14,29 m; 10,5 m; 0,69 m.' },
    { id: 'je-hoeher', front: 'Je höher die Frequenz, …?', back: '… desto kürzer die Wellenlänge (λ = c/f).' },
    { id: 'bereiche', front: 'HF, VHF, UHF?', back: 'HF/Kurzwelle 3–30 MHz (u. a. 10 m); VHF/UKW 30–300 MHz (2 m); UHF/Dezimeterwelle 300–3000 MHz (70 cm).' },
    { id: 'band-bereich', front: 'Zu welchem Frequenzbereich gehören 10 m, 2 m, 70 cm?', back: '10 m: Kurzwelle (HF); 2 m: UKW (VHF); 70 cm: Dezimeterwelle (UHF).' },
    { id: 'momentaufnahme', front: 'Oszillogramm vs. Momentaufnahme?', back: 'Oszillogramm: x-Achse Zeit (Periode). Momentaufnahme: x-Achse Ort (Wellenlänge). In beiden: Amplitude = Höhe des Wellenbergs.' },
    { id: 'wasserfall-k', front: 'Wasserfalldiagramm: Achsen und Darstellung?', back: 'Frequenz und Zeit auf den Achsen; Signalstärke als Farbton und/oder Helligkeit.' },
    { id: 'spektrum-k', front: 'Oszillogramm vs. Amplitudenspektrum?', back: 'Oszillogramm: zeitlicher Verlauf. Amplitudenspektrum: Frequenzanteile eines Signals.' },
  ],
};
