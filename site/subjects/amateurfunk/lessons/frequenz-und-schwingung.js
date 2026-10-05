const wave = (kind) => {
  const pts = [];
  for (let i = 0; i <= 80; i++) {
    const p = (i / 80) * 2, ph = p % 1; let v;
    if (kind === 'sin') v = Math.sin(2 * Math.PI * p);
    else if (kind === 'tri') v = ph < 0.25 ? ph * 4 : ph < 0.75 ? 2 - ph * 4 : ph * 4 - 4;
    else v = ph * 2 - 1;
    pts.push([i / 80 * 120, 22 - v * 16]);
  }
  return 'M' + pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join('L');
};
const rectPath = 'M0 6H30V38H60V6H90V38H120';
const waves = `<svg viewBox="0 0 520 100" role="img" aria-label="Vier Signalformen: Sinus, Rechteck, Dreieck, Sägezahn">
<style>.w{fill:none;stroke:var(--accent);stroke-width:2.2}.ax{stroke:var(--line-2)}.t{font:600 12px system-ui,sans-serif;fill:var(--ink)}</style>
<g transform="translate(5,6)"><line class="ax" x1="0" x2="120" y1="22" y2="22"/><path class="w" d="${wave('sin')}"/><text class="t" x="60" y="60" text-anchor="middle">Sinus</text><text class="t" x="60" y="76" text-anchor="middle" style="fill:var(--good)">sinusförmig</text></g>
<g transform="translate(135,6)"><line class="ax" x1="0" x2="120" y1="22" y2="22"/><path class="w" d="${rectPath}"/><text class="t" x="60" y="60" text-anchor="middle">Rechteck</text></g>
<g transform="translate(265,6)"><line class="ax" x1="0" x2="120" y1="22" y2="22"/><path class="w" d="${wave('tri')}"/><text class="t" x="60" y="60" text-anchor="middle">Dreieck</text></g>
<g transform="translate(395,6)"><line class="ax" x1="0" x2="120" y1="22" y2="22"/><path class="w" d="${wave('saw')}"/><text class="t" x="60" y="60" text-anchor="middle">Sägezahn</text></g>
</svg>`;

export default {
  id: 'frequenz-und-schwingung',
  title: 'Gleich-/Wechselspannung, Frequenz und Zehnerpotenzen',
  summary: 'Sinusschwingung, Periode, Amplitude, Frequenz; Vorsätze und Zehnerpotenzen sicher umrechnen.',
  minutes: 20,
  goals: [
    'Gleich- und Wechselspannung unterscheiden und eine sinusförmige Schwingung erkennen',
    '[[amplitude]] und [[periodendauer]] im Oszillogramm zeigen und $f = 1/T$ anwenden',
    'Die Einheit Hertz als $1/\\text{s}$ kennen und Frequenzen in Hz, kHz, MHz, GHz umrechnen',
    'Werte mit Vorsätzen und Zehnerpotenzen sicher ineinander umwandeln (µ, m, k, M, n, p, G)',
  ],
  needs: ['formelsammlung-und-taschenrechner', 'elektrotechnik/einheiten-und-groessen', 'elektrotechnik/sinus-wechselspannung'],
  blocks: [
    {
      id: 'intro', type: 'text', title: 'Funk beginnt mit einer Schwingung',
      md: `
Ein Sender erzeugt eine **elektrische Schwingung** und schickt sie in die Antenne; diese strahlt daraus eine Funkwelle ab. Um zu verstehen, was „145 MHz“ im Display bedeutet, brauchst du zwei Begriffe: die **[Wechselspannung](wiki:Wechselspannung)** und ihre **[Frequenz](wiki:Frequenz|Frequency)**.[^darc-50ohm]

Eine **[Gleichspannung](wiki:Gleichspannung)** hat immer dieselbe Polarität (zum Beispiel die 12 V einer Autobatterie). Eine Wechselspannung wechselt dagegen **abwechselnd** zwischen positiver und negativer Polarität — die Netzspannung der Steckdose tut das 50-mal pro Sekunde ([Netzfrequenz](wiki:Netzfrequenz|Utility frequency) 50 Hz). Funkwellen schwingen millionenfach schneller.

Wenn dir die Grundlagen noch nicht geläufig sind: Im Fach Elektrotechnik gibt es die Lektion über Sinus und Wechselspannung ausführlich; hier lernst du, was die Prüfung davon braucht.
`,
    },
    {
      id: 'text-sinus', type: 'text', title: 'Die Sinusschwingung',
      md: `
Die gebräuchlichste Form ist die **Sinusschwingung** ([Schwingung](wiki:Sinusschwingung|Oscillation)): Die Spannung steigt gleichmäßig zum Maximum, fällt durch Null zum negativen Maximum und kehrt dann auf dieselbe Weise zurück. Der Verlauf über der Zeit sieht aus wie die bekannte Sinuskurve. Genau das siehst du auf dem [Oszilloskop](wiki:Oszilloskop|Oscilloscope) (Oszillogramm).[^darc-50ohm]

Andere Signalformen kennst du auch: **Rechteck**, **Dreieck**, **Sägezahn**. In der Prüfung musst du erkennen, welches Bild eine **sinusförmige Wechselspannung** zeigt — es ist die runde Welle, die gleichmäßig um die Nulllinie schwingt; ein Rechteck mit Ecken, eine Zickzack-Linie oder eine Linie mit gerader Flanke sind es nicht, und eine Kurve, die nur oberhalb der Nulllinie bleibt, ist keine reine Wechselspannung.
`,
    },
    {
      id: 'fig-waves', type: 'figure', title: 'Vier Signalformen', html: waves,
      caption: 'Nur die erste ist sinusförmig. Alle vier sind Wechselspannungen; Rechteck, Dreieck und Sägezahn enthalten außer der Grundschwingung noch Oberwellen (siehe Fach Elektrotechnik: Fourier und Spektrum).',
    },
    {
      id: 'text-ap', type: 'text', title: 'Amplitude, Periode und Frequenz',
      md: `
Zwei Zahlen beschreiben eine Sinusschwingung vollständig:

- Die **[Amplitude](wiki:Amplitude|Amplitude)** ist der **größte Abstand von der Nulllinie** zum höchsten (oder tiefsten) Punkt. Sie sagt, wie *stark* die Schwingung ist.
- Die **[Periodendauer](wiki:Periodendauer)** $T$ ist die Zeit für **eine vollständige Schwingung** — zum Beispiel von einem Wellenberg bis zum nächsten. Sie sagt, wie *schnell* die Schwingung ist.

Die **Frequenz** $f$ zählt, wie viele Schwingungen **pro Sekunde** stattfinden. Je kürzer die Periode, desto höher die Frequenz:

$$f = \\frac{1}{T} \\qquad T = \\frac{1}{f}$$

Die Einheit der Frequenz ist das **[Hertz](wiki:Hertz (Einheit)|Hertz)** (Hz), benannt nach [Heinrich Hertz](wiki:Heinrich Hertz|Heinrich Hertz). Weil $f = 1/T$ und $T$ in Sekunden gemessen wird, gilt $\\text{Hz} = \\dfrac{1}{\\text{s}}$ — nicht Sekunde, nicht $\\text{s}^2$, nicht $1/\\text{s}^2$. 145 000 000 Perioden pro Sekunde sind also **145 MHz**; die Periodendauer dieser Schwingung ist $T = 1/145\\,\\text{MHz} = 6{,}9\\,\\text{ns}$ — keine 145 µs, und die „Amplitude in pps“ gibt es nicht.[^bnetza-formelsammlung]
`,
    },
    {
      id: 'warn-ap', type: 'callout', tone: 'warning', title: 'Amplitude, Periode, Frequenz, Wellenlänge — nicht verwechseln',
      md: `
Im Oszillogramm (Spannung über der **Zeit**) zeigt der Pfeil von der Nulllinie zur Spitze die **Amplitude**, der Abstand zwischen zwei gleichen Punkten auf der waagerechten Achse die **Periode**. Die Prüfung fragt: „Was ist mit 1 markiert?“ — Amplitude; „mit 2?“ — Periode. Falsch sind Frequenz, Strom, Spannung oder Wellenlänge. Die **Wellenlänge** misst man dagegen auf einer Momentaufnahme der Welle über dem **Ort** — dazu mehr in der nächsten Lektion.
`,
    },
    {
      id: 'viz-sinus', type: 'viz', viz: 'sinus-explorer', title: 'Sinus-Explorer',
      params: {},
      task: 'Stelle **50 Hz** ein (T = 20 ms), lies die Periodendauer bei **145 MHz** ab und setze die **Amplitude auf 8 V**.',
      caption: 'Der rote Pfeil markiert die Periode T, der grüne die Amplitude. Der Regler ist logarithmisch; ein Klick auf den Zahlenwert erlaubt die Eingabe, zum Beispiel „145M“.',
    },
    {
      id: 'num-t', type: 'numeric', title: 'Von f nach T',
      question: 'Die Netzspannung schwingt mit 50 Hz. Wie lang ist die Periodendauer?',
      answer: 20, tolerance: 0.01, unit: 'ms',
      explain: '$T = 1/f = 1/50\\,\\text{Hz} = 0{,}02\\,\\text{s} = 20\\,\\text{ms}$.',
    },
    {
      id: 'num-f', type: 'numeric', title: 'Von T nach f',
      question: 'Eine Schwingung hat eine Periodendauer von 2 µs. Welche Frequenz hat sie?',
      answer: 500, tolerance: 0.01, unit: 'kHz',
      explain: '$f = 1/T = 1/(2\\cdot 10^{-6}\\,\\text{s}) = 500\\,000\\,\\text{Hz} = 500\\,\\text{kHz}$.',
    },
    {
      id: 'text-geraete', type: 'text', title: 'Wer erzeugt, wer misst Frequenzen?',
      md: `
Ein **Oszillator** ist ein **Schwingungserzeuger** — er liefert die Schwingung, die der Sender in die Antenne speist. Er ist weder ein schmales Filter noch ein Messgerät, das Schwingungen anzeigt (das ist das Oszilloskop), noch ein HF-Verstärker. Die **Sendefrequenz** eines Senders misst du mit einem **[Frequenzzähler](wiki:Frequenzzähler|Frequency counter)** — nicht mit SWR-Meter, HF-Voltmeter oder S-Meter, die jeweils Stehwellenverhältnis, Spannung oder Empfangspegel anzeigen.[^darc-50ohm]
`,
    },
    {
      id: 'text-vorsaetze', type: 'text', title: 'Große und kleine Zahlen: Vorsätze und Zehnerpotenzen',
      md: `
Im Amateurfunk begegnen dir sehr große Zahlen (Frequenzen in Millionen Hz) und sehr kleine (Ströme in Tausendstel Ampere). Dafür gibt es **[Vorsätze](wiki:Vorsätze für Maßeinheiten|Unit prefix)** und **[Zehnerpotenzen](wiki:Zehnerpotenz|Power of 10)**:

<div style="overflow-x:auto"><table style="border-collapse:collapse;width:100%;font-size:.92rem"><thead><tr><th style="text-align:left;padding:5px 8px;border-bottom:2px solid var(--line)">Vorsatz</th><th style="text-align:left;padding:5px 8px;border-bottom:2px solid var(--line)">Zeichen</th><th style="text-align:left;padding:5px 8px;border-bottom:2px solid var(--line)">Faktor</th></tr></thead><tbody>
<tr><td style="padding:4px 8px;border-bottom:1px solid var(--line)">Giga</td><td style="padding:4px 8px;border-bottom:1px solid var(--line)"><b>G</b></td><td style="padding:4px 8px;border-bottom:1px solid var(--line)">$10^{9}$ = 1 000 000 000</td></tr>
<tr><td style="padding:4px 8px;border-bottom:1px solid var(--line)">Mega</td><td style="padding:4px 8px;border-bottom:1px solid var(--line)"><b>M</b></td><td style="padding:4px 8px;border-bottom:1px solid var(--line)">$10^{6}$ = 1 000 000</td></tr>
<tr><td style="padding:4px 8px;border-bottom:1px solid var(--line)">Kilo</td><td style="padding:4px 8px;border-bottom:1px solid var(--line)"><b>k</b></td><td style="padding:4px 8px;border-bottom:1px solid var(--line)">$10^{3}$ = 1000</td></tr>
<tr><td style="padding:4px 8px;border-bottom:1px solid var(--line)">Milli</td><td style="padding:4px 8px;border-bottom:1px solid var(--line)"><b>m</b></td><td style="padding:4px 8px;border-bottom:1px solid var(--line)">$10^{-3}$ = 0,001</td></tr>
<tr><td style="padding:4px 8px;border-bottom:1px solid var(--line)">Mikro</td><td style="padding:4px 8px;border-bottom:1px solid var(--line)"><b>µ</b></td><td style="padding:4px 8px;border-bottom:1px solid var(--line)">$10^{-6}$ = 0,000 001</td></tr>
<tr><td style="padding:4px 8px;border-bottom:1px solid var(--line)">Nano</td><td style="padding:4px 8px;border-bottom:1px solid var(--line)"><b>n</b></td><td style="padding:4px 8px;border-bottom:1px solid var(--line)">$10^{-9}$</td></tr>
<tr><td style="padding:4px 8px;border-bottom:1px solid var(--line)">Piko</td><td style="padding:4px 8px;border-bottom:1px solid var(--line)"><b>p</b></td><td style="padding:4px 8px;border-bottom:1px solid var(--line)">$10^{-12}$</td></tr></tbody></table></div>

**So rechnest du um:** Jeder Vorsatz ist ein fester **Zehnerpotenz-Schritt**. Wechselst du auf einen kleineren Vorsatz (zum Beispiel von A auf mA), wird die Zahl größer; wechselst du auf einen größeren (von kHz auf MHz), wird sie kleiner. Pro Vorsatz-Stufe wandert das Komma um **drei** Stellen (Tausenderschritte): die Exponenten laufen in der Treppe …, −9, −6, −3, 0, 3, 6, 9.

- $0{,}00042\\,\\text{A} = 0{,}42\\,\\text{mA} = 420\\,\\mu\\text{A} = 420\\cdot 10^{-6}\\,\\text{A}$
- $0{,}042\\,\\text{A} = 42\\cdot 10^{-3}\\,\\text{A}$ ( = 42 mA)
- $4\\,200\\,000\\,\\text{Hz} = 4{,}2\\cdot 10^{6}\\,\\text{Hz}$ ( = 4,2 MHz)
- $0{,}01\\,\\text{mV} = 10\\,\\mu\\text{V} = 10\\cdot 10^{-6}\\,\\text{V}$
- $0{,}002\\,\\text{M}\\Omega = 2\\,\\text{k}\\Omega = 2\\cdot 10^{3}\\,\\Omega$
- $2\\cdot 10^{-7}\\,\\text{W} = 0{,}2\\cdot 10^{-6}\\,\\text{W} = 0{,}2\\,\\mu\\text{W}$
- $5\\cdot 10^{-1}\\,\\text{W} = 0{,}5\\,\\text{W} = 500\\,\\text{mW}$
- $0{,}22\\,\\mu\\text{F} = 220\\,\\text{nF}$ (nicht pF!)
- $3750\\,\\text{kHz} = 3{,}750\\,\\text{MHz} = 3{,}75\\cdot 10^{6}\\,\\text{Hz}$
- $144\\,000\\,000\\,\\text{Hz} = 144\\,\\text{MHz}$

Die Zahl vor der Zehnerpotenz ist nicht eindeutig: $420\\cdot 10^{-6}$ und $4{,}2\\cdot 10^{-4}$ sind gleich. Prüfe immer, ob **Exponent und Zahl zusammen** den Wert ergeben. Gängige Fehler: das Vorzeichen des Exponenten vertauschen (10⁶ statt 10⁻⁶), eine Kommastelle verlieren oder Milli und Mikro verwechseln (ein Faktor 1000).[^bnetza-formelsammlung]
`,
    },
    {
      id: 'warn-vorsaetze', type: 'callout', tone: 'warning', title: 'Wo die falschen Antworten lauern',
      md: `
- **Faktor 1000 daneben**: 0,22 µF sind **220 nF**, nicht 22 nF und nicht 220 pF.
- **Vorzeichen des Exponenten**: kleine Werte haben **negative** Exponenten: 0,00042 A = $420\\cdot 10^{-6}$ A, nicht $420\\cdot 10^{6}$ A.
- **Kleiner Wert, große Zahl?** Beim Wechsel von A auf mA wird die **Zahl** größer, der **Vorsatz** kleiner — niemals negative Leistungen: $5\\cdot 10^{-1}$ W sind +500 mW, nicht −500 mW.
- **Hz-Vielfache**: 3750 kHz = 3,750 MHz; nicht 0,03750 GHz (die Zahl wäre hundertmal zu klein).
`,
    },
    {
      id: 'viz-vorsatz', type: 'viz', viz: 'unit-prefix-trainer', title: 'Vorsatz-Trainer',
      params: { streak: 8, units: ['Hz', 'A', 'V', 'W', 'Ω', 'F'] },
      task: 'Schaffe **8 Umrechnungen in Folge**.',
    },
    {
      id: 'order-vorsaetze', type: 'order', title: 'Vorsätze nach Größe',
      prompt: 'Ordne die Vorsätze vom **kleinsten** zum **größten** Wert.',
      items: ['Piko (p)', 'Nano (n)', 'Mikro (µ)', 'Milli (m)', 'Kilo (k)', 'Mega (M)', 'Giga (G)'],
      explain: 'Von $10^{-12}$ bis $10^{9}$: p, n, µ, m, (Einheit), k, M, G — jeder Schritt Faktor 1000.',
    },
    {
      id: 'num-umr', type: 'numeric', title: 'Umrechnen',
      question: 'Eine Frequenz von 7 100 kHz: Wie viele MHz sind das?',
      answer: 7.1, tolerance: 0.01, unit: 'MHz',
      explain: '$7100\\,\\text{kHz} = 7{,}1\\,\\text{MHz}$ — Komma um drei Stellen nach links.',
    },
    {
      id: 'match-einheiten', type: 'match', title: 'Größe und Einheit',
      prompt: 'Ordne Größen ihren Einheiten (in Grundeinheiten) zu.',
      pairs: [
        ['Frequenz', 'Hz = 1/s'],
        ['Periodendauer', 's'],
        ['Wellenlänge', 'm'],
        ['Ausbreitungsgeschwindigkeit', 'm/s'],
      ],
    },
    {
      id: 'mission', type: 'callout', tone: 'mission', title: 'Funkpraxis: Frequenzen am Display',
      md: `
Dein Transceiver zeigt die Frequenz meist so an: **145.500.00** — Megahertz, Kilohertz, Hertz in Dreiergruppen. 145,500 MHz sind genau **145 500 000 Hz**. Auf Kurzwelle sprichst du meist in **kHz** („3 Komma 7 fünf“, „drei-sieben-fünf-null“), im VHF- und UHF-Bereich in **MHz**. Die Amateurfunkbänder der **Klasse N** liegen bei **28–29,7 MHz, 144–146 MHz und 430–440 MHz** — dazu mehr in der Lektion über die Bänder.[^afuv]

*Prüfungsbezug:* NA206, NA207, NA212, NA213 (Hertz, Umrechnung), NB401–NB405 (Sinus, Amplitude, Periode), ND201 (Oszillator), NI301 (Frequenzzähler), EA108–EA116 (Zehnerpotenzen).
`,
    },
    {
      id: 'recall', type: 'recall', title: 'Mit eigenen Worten',
      prompt: 'Erkläre einem Freund, was „145,5 Megahertz“ bedeutet: Was schwingt, wie oft, wie lang dauert eine Schwingung — und wie rechnest du 145,5 MHz in Hertz um?',
      answer: 'Eine elektrische Schwingung wechselt 145 500 000-mal pro Sekunde ihre Polarität. Frequenz f = Anzahl der Schwingungen pro Sekunde, Einheit Hertz (Hz = 1/s). Periodendauer T = 1/f = 1/145,5 MHz ≈ 6,87 ns. 145,5 MHz = 145,5 · 10⁶ Hz = 145 500 000 Hz (M = Mega = 10⁶, Komma um 6 Stellen nach rechts). Die Amplitude ist der größte Abstand von der Nulllinie, sie sagt nichts über die Frequenz.',
      hints: ['f = 1/T', 'Mega = 10⁶'],
      cards: ['hz-def', 'vorsaetze'],
    },
  ],
  cards: [
    { id: 'gleich-wechsel', front: 'Gleichspannung vs. Wechselspannung?', back: 'Gleichspannung: konstante Polarität. Wechselspannung: wechselt abwechselnd zwischen positiver und negativer Polarität (z. B. Netz 50 Hz).' },
    { id: 'sinus', front: 'Woran erkennst du eine sinusförmige Wechselspannung?', back: 'Runde, gleichmäßige Welle um die Nulllinie; nicht Rechteck, Dreieck oder Sägezahn.' },
    { id: 'amplitude-k', front: 'Was ist die Amplitude?', back: 'Der größte Abstand der Schwingung von der Nulllinie (zum höchsten oder tiefsten Punkt).' },
    { id: 'periode-k', front: 'Was ist die Periodendauer?', back: 'Die Zeit für eine vollständige Schwingung (z. B. von Wellenberg zu Wellenberg), Formelzeichen T, Einheit s.' },
    { id: 'f-t', front: 'Zusammenhang Frequenz und Periodendauer?', back: '$f = \\dfrac{1}{T}$ und $T = \\dfrac{1}{f}$.' },
    { id: 'hz-def', front: 'Einheit der Frequenz?', back: 'Hertz: $\\text{Hz} = \\dfrac{1}{\\text{s}}$ (Schwingungen pro Sekunde). 145 000 000 Perioden/s = 145 MHz.' },
    { id: 'vorsaetze', front: 'Vorsätze p n µ m k M G?', back: 'Piko $10^{-12}$, Nano $10^{-9}$, Mikro $10^{-6}$, Milli $10^{-3}$, Kilo $10^{3}$, Mega $10^{6}$, Giga $10^{9}$.' },
    { id: 'umrechnen-1', front: '0,00042 A = ?  0,042 A = ?', back: '$0{,}00042\\,\\text{A} = 420\\cdot 10^{-6}\\,\\text{A}$ (420 µA); $0{,}042\\,\\text{A} = 42\\cdot 10^{-3}\\,\\text{A}$ (42 mA).' },
    { id: 'umrechnen-2', front: '3750 kHz = ?  4 200 000 Hz = ?  144 000 000 Hz = ?', back: '3,750 MHz; $4{,}2\\cdot 10^{6}$ Hz = 4,2 MHz; 144 MHz.' },
    { id: 'umrechnen-3', front: '0,22 µF = ?  0,002 MΩ = ?  0,01 mV = ?', back: '220 nF; $2\\cdot 10^{3}\\,\\Omega$ (2 kΩ); $10\\cdot 10^{-6}$ V (10 µV).' },
    { id: 'leistung-umr', front: '$2\\cdot 10^{-7}$ W = ?  $5\\cdot 10^{-1}$ W = ?', back: '0,2 µW; 500 mW.' },
    { id: 'osc-zaehler', front: 'Oszillator? Wie misst man die Sendefrequenz?', back: 'Oszillator = Schwingungserzeuger. Sendefrequenz: mit dem Frequenzzähler (nicht SWR-Meter, HF-Voltmeter, S-Meter).' },
  ],
};
