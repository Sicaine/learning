// Lektion am-ssb-cw: Modulation allgemein, CW, AM, SSB (USB/LSB), belegte Bandbreite und ihre Grenzen (AFuV Anlage 1).
// Quellen für Fakten: DARC 50ohm.de (CC BY 4.0), AFuV Anlage 1 Teil B (Stand 05.10.2026), BNetzA-Fragenkatalog 3. Auflage.

// ── kleine SVG-Helfer für die Abbildungen ────────────────────────────────────────────────────────
const wavePath = (x0, x1, yc, amp, fn, n = 360) => {
  let d = '';
  for (let i = 0; i <= n; i++) { const t = i / n; d += (i ? 'L' : 'M') + (x0 + (x1 - x0) * t).toFixed(1) + ',' + (yc - amp * fn(t)).toFixed(1); }
  return d;
};
const waves = () => {
  const w = 420, row = 92;
  const strips = [
    ['Unmodulierter Träger', t => Math.sin(2 * Math.PI * 22 * t), 'konstante Amplitude, konstante Frequenz'],
    ['AM: Amplitude folgt dem NF-Signal', t => (1 + 0.7 * Math.sin(2 * Math.PI * 3 * t)) / 1.7 * Math.sin(2 * Math.PI * 22 * t), 'Hüllkurve schwankt, Nulldurchgänge gleichmäßig'],
    ['FM: Frequenz folgt dem NF-Signal', t => Math.sin(2 * Math.PI * 22 * t - 4.5 * Math.cos(2 * Math.PI * 3 * t)), 'Amplitude konstant, Abstand der Nulldurchgänge wechselt'],
  ];
  let g = '';
  strips.forEach(([title, fn, note], i) => {
    const y = 6 + i * row;
    g += `<text class="t" x="8" y="${y + 12}">${title}</text><text class="s" x="8" y="${y + 26}">${note}</text>`;
    g += `<line x1="8" x2="${w - 8}" y1="${y + 56}" y2="${y + 56}" stroke="var(--line-2)"/>`;
    g += `<path d="${wavePath(8, w - 8, y + 56, 24, fn, 420)}" fill="none" stroke="var(--accent)" stroke-width="1.5"/>`;
    if (i === 1) g += `<path d="${wavePath(8, w - 8, y + 56, 24, t => (1 + 0.7 * Math.sin(2 * Math.PI * 3 * t)) / 1.7)}" fill="none" stroke="var(--accent-2)" stroke-dasharray="5 4"/>`;
  });
  return `<svg viewBox="0 0 ${w} ${6 + 3 * row}" role="img" aria-label="Drei Zeitverläufe: unmodulierter Träger, amplitudenmodulierter Träger mit Hüllkurve, frequenzmodulierter Träger"><style>.t{font:600 12.5px system-ui,sans-serif;fill:var(--ink)}.s{font:11px system-ui,sans-serif;fill:var(--muted)}</style>${g}</svg>`;
};
// Spektren: NF-Signal, AM, USB, LSB. 1 kHz = 30 px, Träger bei x = 220. Das NF-Signal fällt von 0,3 kHz (hoch) nach 2,7 kHz (niedrig) ab,
// damit die Spiegelung im unteren Seitenband sichtbar wird.
const spectra = () => {
  const w = 440, x0 = 220, k = 30, row = 108;
  const amp = f => 44 - 24 * (f - 0.3) / 2.4;   // Höhe in px bei NF-Frequenz f (kHz)
  const shape = (base, dir) => {
    const f1 = 0.3, f2 = 2.7;
    const pts = [[x0 + dir * f1 * k, base], [x0 + dir * f1 * k, base - amp(f1)], [x0 + dir * f2 * k, base - amp(f2)], [x0 + dir * f2 * k, base]];
    return `<polygon points="${pts.map(p => p.join(',')).join(' ')}" fill="var(--accent)" fill-opacity=".28" stroke="var(--accent)" stroke-width="1.4"/>`;
  };
  const carrierLine = (b, h, col, dash) => `<line x1="${x0}" x2="${x0}" y1="${b}" y2="${b - h}" stroke="${col}" stroke-width="${dash ? 1.6 : 4}"${dash ? ' stroke-dasharray="3 3"' : ''}/>`;
  const rows = [
    ['NF-Signal (Sprache)', 'nur das Band 0,3 … 2,7 kHz', b => shape(b, 1), 0],
    ['AM', 'Träger plus unteres und oberes Seitenband', b => shape(b, -1) + shape(b, 1) + carrierLine(b, 48, 'var(--accent-2)'), 1],
    ['SSB, oberes Seitenband (USB)', 'Träger und unteres Seitenband unterdrückt', b => shape(b, 1) + carrierLine(b, 34, 'var(--muted)', true), 2],
    ['SSB, unteres Seitenband (LSB)', 'Träger und oberes unterdrückt, Lage gespiegelt', b => shape(b, -1) + carrierLine(b, 34, 'var(--muted)', true), 3],
  ];
  let g = '';
  rows.forEach(([title, sub, draw, i]) => {
    const base = 80 + i * row;
    g += `<text class="t" x="8" y="${base - 66}">${title}</text><text class="s" x="8" y="${base - 51}">${sub}</text>`;
    g += `<line x1="8" x2="${w - 8}" y1="${base}" y2="${base}" stroke="var(--ink-2)"/>`;
    g += draw(base);
    g += `<text class="s" x="${x0}" y="${base + 14}" text-anchor="middle">${i === 0 ? '0 Hz' : 'Träger f<tspan baseline-shift="sub" font-size="8">T</tspan>'}</text>`;
  });
  return `<svg viewBox="0 0 ${w} ${80 + 4 * row - 58}" role="img" aria-label="Spektren von NF-Signal, AM, USB und LSB. Beim unteren Seitenband liegt die Frequenzfolge gespiegelt"><style>.t{font:600 12.5px system-ui,sans-serif;fill:var(--ink)}.s{font:11px system-ui,sans-serif;fill:var(--muted)}</style>${g}</svg>`;
};

export default {
  id: 'am-ssb-cw',
  title: 'Morsen, AM, SSB und Bandbreite',
  summary: 'Unmodulierter Träger, Tastung (CW), Amplitudenmodulation, Einseitenband (USB/LSB), belegte Bandbreite.',
  minutes: 32,
  goals: [
    'Erklären, was [[modulation]] ist, und [[unmodulierter-traeger]], CW, AM und SSB im Zeit- und im Frequenzbild unterscheiden',
    'Aus Trägerfrequenz und NF-Frequenz die Sendefrequenz in USB und LSB berechnen und die Bandbreite von CW, SSB und AM vergleichen',
    'Die zulässige [[belegte-bandbreite]] eines Bandes aus der AFuV-Anlage 1 ablesen und den Mindestabstand zur Bandgrenze bestimmen',
    'Mikrofonverstärkung am SSB-Transceiver richtig einstellen: zu leise gibt wenig Leistung, zu laut gibt Splatter',
    'Begründen, warum man einen Träger moduliert, und erklären, warum für Sprache rund 2,4 kHz Bandbreite genügen',
  ],
  needs: ['elektrotechnik/sinus-wechselspannung'],
  blocks: [
    {
      id: 'intro', type: 'text', title: 'Ein Träger allein sagt nichts',
      md: `
Ein Sender erzeugt eine hochfrequente Schwingung, den [**Träger**](wiki:Träger (Nachrichtentechnik)|Carrier wave). Solange diese Schwingung völlig gleichmäßig ist, also konstante Amplitude, konstante Frequenz und konstante Phase hat, nennt man sie einen **[[unmodulierter-traeger|unmodulierten Träger]]**. Er verrät dem Empfänger genau eines: dass jemand sendet. Eine Nachricht steckt nicht darin.[^darc-50ohm]

Die Nachricht kommt erst dazu, wenn man eine der drei Eigenschaften des Trägers im Rhythmus der Nachricht verändert. Das ist **[[modulation|Modulation]]**: *Informationen werden auf einen (oder mehrere) Träger übertragen.* Das Gegenstück ist die **Demodulation**: Der Empfänger entnimmt dem modulierten Träger die Information wieder.

<div style="overflow-x:auto"><table>
<tr><th>Was wird verändert?</th><th>Verfahren (Beispiele)</th></tr>
<tr><td><b>Amplitude</b></td><td>[Amplitudenmodulation](wiki:Amplitudenmodulation|Amplitude modulation) ([[amplitudenmodulation|AM]]), [Einseitenbandmodulation](wiki:Einseitenbandmodulation|Single-sideband modulation) ([[einseitenbandmodulation|SSB]]), Ein-/Ausschalten bei CW</td></tr>
<tr><td><b>Frequenz</b></td><td>[Frequenzmodulation](wiki:Frequenzmodulation|Frequency modulation) ([[frequenzmodulation|FM]]), [Frequenzumtastung](wiki:Frequenzumtastung|Frequency-shift keying) ([[fsk|FSK]])</td></tr>
<tr><td><b>Phase</b></td><td>[Phasenmodulation](wiki:Phasenmodulation|Phase modulation) (PM), Phasenumtastung ([[psk|PSK]])</td></tr>
</table></div>

Die Verfahren, die du für die Prüfung brauchst, sind alle drei Sorten in einfacher Form. Wir fangen mit dem einfachsten an: dem Ein- und Ausschalten des Trägers.
`,
    },
    {
      id: 'warn-modulation', type: 'callout', tone: 'warning', title: 'Modulation ist nicht Demodulation',
      md: `
Im Katalog taucht die Frage „Durch Modulation …“ auf, und die falschen Antworten klingen nach Technik: „… wird einem Träger Information **entnommen**“ (das ist die *De*modulation), „… werden Sprach- und CW-Signale kombiniert“ oder „… werden dem Signal NF-Komponenten entnommen“. Richtig ist nur: Information wird **auf** einen Träger gebracht. Prüfungsbezug: NE101, EE101.
`,
    },
    {
      id: 'warum-modulieren-text', type: 'text', title: 'Warum moduliert man überhaupt?',
      md: `
Warum sendet man Sprache nicht einfach als Wechselstrom in die Antenne? Zwei praktische Gründe:

1. **Die Antenne wäre riesig.** Eine Funkwelle hat die Wellenlänge $\\lambda = c/f$ (Lichtgeschwindigkeit durch Frequenz). Für einen Ton von 1 kHz wären das $300\\,000\\,\\text{km/s}/1\\,\\text{kHz} = 300\\,\\text{km}$. Eine wirksame Antenne hat die Größenordnung der Wellenlänge oder einen Bruchteil davon, bei 300 km also völlig unpraktisch. Auf Kurzwelle und darüber sind es Meter.
2. **Alle würden einander stören.** Sprache hat bei jedem Sprecher denselben Frequenzbereich. Mit einem **Träger** verschiebt jeder seine Information auf eine **eigene Frequenz**: Der Empfänger stimmt auf einen Träger ab und hört nur ihn.[^darc-50ohm]

Die Information (das **Modulationssignal**: Sprache, Tastung, Daten) wird also dem hochfrequenten [Träger](wiki:Träger (Nachrichtentechnik)|Carrier wave) „aufgeprägt“. Welche Eigenschaft des Trägers man dabei verändert, entscheidet über das Verfahren:

| Verfahren | Was ändert sich? | Typisch im Amateurfunk |
|---|---|---|
| **CW** | Träger wird ein- und ausgeschaltet | Morsetelegrafie |
| **AM** | Amplitude folgt dem Modulationssignal | Sprache (heute selten) |
| **SSB** | Amplitudenmodulation, aber nur ein Seitenband, ohne Träger | Sprechfunk auf Kurzwelle |
| **FM** | Frequenz folgt dem Modulationssignal | Sprechfunk auf UKW, Relais |
| **Digimodes** | Frequenz- oder Phasenumtastung durch den Computer | FT8, PSK31, RTTY, Packet |

Auf den nächsten Seiten sehen wir uns CW, AM und SSB im Einzelnen an; FM kommt in der nächsten Lektion.
`,
    },
    {
      id: 'fig-waves', type: 'figure', title: 'Träger, AM und FM im Zeitbereich',
      html: waves(),
      caption: 'Erkennen im Oszilloskop-Bild: Bei AM schwankt die Höhe der Schwingung (gestrichelt: Hüllkurve), bei FM bleibt die Höhe gleich, aber der Abstand der Nulldurchgänge wechselt.',
    },
    {
      id: 'cw', type: 'text', title: 'CW: Der Träger wird getastet',
      md: `
Die älteste Funkübertragung überhaupt: Mit einer Taste schaltet man den Träger ein und aus. Nur zwei Zustände, **0 %** und **100 %** der Amplitude, also eigentlich schon ein digitales Verfahren. Lange Töne (Striche) und kurze Töne (Punkte) ergeben nach dem [Morsecode](wiki:Morsecode|Morse code) die Buchstaben, das Prinzip der [Telegrafie](wiki:Telegrafie|Telegraphy). Die Bezeichnung **[[cw-tastung|CW]]** steht für *Continuous Wave*: ein ununterbrochener Träger, der nur *getastet* wird.[^darc-50ohm]

**Wie werden bei CW Informationen übertragen? Durch Ein- und Ausschalten eines HF-Trägers.** (NE201) Die Alternativen im Katalog beschreiben andere Verfahren: „Änderung der Trägerfrequenz in diskreten Stufen“ ist Frequenzumtastung, „diskrete Phasenmodulation“ ist Phasenumtastung, und einen Subträger gibt es bei CW nicht.

Warum bleibt CW trotz Sprache, Bildern und Computer beliebt? Weil nur **eine einzige Frequenz** getastet wird. Dadurch belegt CW von allen Verfahren in dieser Lektion die **kleinste Bandbreite**; bei durchschnittlicher Gebegeschwindigkeit von 20 Wörtern pro Minute sind es etwa 300 Hz. Ein schmales Empfangsfilter kann das Signal dann gut vom Rauschen und von Nachbarn trennen, und Telegrafie kommt mit sehr wenig Leistung noch durch.

Eine Morseprüfung brauchst du übrigens nicht: Die internationalen Radio Regulations überlassen es jedem Land, ob es eine verlangt. In Deutschland ist sie freiwillig (AFuV § 4 Abs. 7: freiwillige Zusatzprüfung).[^afuv] Mehr zum Morsen in der Lektion über digitale Betriebsarten.
`,
    },
    {
      id: 'sprache-text', type: 'text', title: 'Sprachsignale: was wir eigentlich übertragen',
      md: `
Bevor wir Sprache modulieren, schauen wir uns an, was sie ist. Beim Sprechen entstehen **Schallwellen** mit vielen tiefen und hohen, leisen und lauten Tönen. Das Mikrofon wandelt sie in eine **elektrische Schwingung** um: Aus tiefen und hohen Tönen werden langsame und schnelle Schwingungen, aus leisen und lauten Tönen kleine und große Amplituden. Dieses **Sprachsignal** (NF) ist das Modulationssignal.[^darc-50ohm]

Im **Amplitudenspektrum** trägt man die Frequenz waagerecht und die Amplitude senkrecht auf. Sprache enthält keine beliebig hohen Frequenzen. Bei einem typischen Sprachsignal liegt der für die Übertragung genutzte Bereich bei etwa **300 bis 2700 Hz**, die Bandbreite beträgt also $2700\\,\\text{Hz} - 300\\,\\text{Hz} = 2400\\,\\text{Hz}$; für Sprechfunk reichen 300 Hz bis 3 kHz völlig.

## Warum reichen 2,4 kHz?

- Ein Vokal wie a, i oder u hat **Frequenzbereiche mit besonders viel Energie**, die [Formanten](wiki:Formant|Formant). Sie entstehen im Mund- und Rachenraum, und aus der Lage der ersten beiden erkennt das Gehirn den Vokal. Beide liegen unter 3 kHz (als grobe Näherung bei einer Männerstimme: a bei etwa 730 und 1100 Hz, i bei 300 und 2300 Hz, u bei 300 und 900 Hz).
- **Konsonanten** wie s, f und t enthalten Anteile weiter oben. Sie tragen viel zur [Sprachverständlichkeit](wiki:Sprachverständlichkeit|Intelligibility (communication)) bei; fehlen sie, klingt die Stimme dumpf und wird schwerer zu verstehen. Ein paar kHz Bandbreite reichen aber, wie man vom Telefon kennt.
- **Mehr Bandbreite** klingt natürlicher, kostet aber Platz im Band und lässt mehr Rauschen in den Empfänger. Bei SSB entspricht die HF-Bandbreite der NF-Bandbreite, und mit rund 2,4 kHz ist der Sprechfunk verständlich, ohne dass sich die Stationen unnötig stören.

## Mikrofonabstand und Pegel

Das Mikrofon nimmt nicht nur dich auf, sondern auch Raumhall und Nebengeräusche. Ein Mikrofon nah am Mund (eine Handbreit als Faustregel) liefert mehr Nutzsignal im Verhältnis zum Störschall. Sehr kurze Abstände betonen die tiefen Frequenzen und lassen Zisch- und Poppgeräusche anschwellen; zu große Abstände machen das Signal leise und hallig. Der **Pegel** (Mikrofonverstärkung) muss so eingestellt sein, wie im Abschnitt über Mikrofonverstärkung beschrieben: nicht zu leise, nicht übersteuert.
`,
    },
    {
      id: 'demo-sprachband', type: 'viz', viz: 'sprach-bandbreite', title: 'Sprachband-Labor',
      intro: 'Das Spektrum zeigt, wo ein Laut seine Energie hat. Verschiebe die Grenzen des Durchlassbereichs und höre, wie sich der Klang ändert. Die Formantlagen sind grobe Näherungen und dienen nur der Anschauung.',
      task: 'Finde einen Durchlassbereich von höchstens 2,4 kHz, bei dem für a, i und u beide Formanten erhalten bleiben; schneide dann beim „i“ den zweiten Formanten ab, und spiele einmal ab.',
    },
    {
      id: 'am', type: 'text', title: 'AM: Die Amplitude folgt der Sprache',
      md: `
Bei der **Amplitudenmodulation** wird die Amplitude des Trägers im Takt des NF-Signals verändert; **die Frequenz des Trägers bleibt konstant** (NE202; „Frequenz verändert, Amplitude konstant“ wäre FM, und „nacheinander Amplitude und Frequenz“ gibt es nicht).

Entscheidend für die Prüfung ist, was dabei im **Spektrum** entsteht. Eine Schwingung der Frequenz $f_\\text{T}$, deren Höhe sich mit der NF-Frequenz $f_\\text{NF}$ ändert, besteht mathematisch aus *drei* Schwingungen: dem Träger bei $f_\\text{T}$ und zwei neuen Linien bei $f_\\text{T} - f_\\text{NF}$ und $f_\\text{T} + f_\\text{NF}$. Diese beiden **[[seitenband|Seitenbänder]]** (englisch [sidebands](wiki:Seitenband|Sideband)) heißen **unteres Seitenband** (LSB, *lower sideband*) und **oberes Seitenband** (USB, *upper sideband*). Bei Sprache sind es ganze Bänder statt einzelner Linien.

- Die **gesamte Information** steckt in jedem der beiden Seitenbänder, und zwar in beiden gleich.
- Der **Träger** selbst enthält keine Information. Er braucht aber den größten Teil der Sendeleistung.
- Die Bandbreite reicht von der Frequenz des unteren bis zu der des oberen Seitenbandes: $B_\\text{AM} \\approx 2 \\cdot f_\\text{NF,max}$.

Für Sprache bis 2,7 kHz sind das etwa **5,4 kHz**, also etwas mehr als das Doppelte der NF-Bandbreite von 2,4 kHz (die Sprache beginnt erst bei 0,3 kHz).
`,
    },
    {
      id: 'fig-spectra', type: 'figure', title: 'Spektren: NF-Signal, AM, USB, LSB',
      html: spectra(),
      caption: 'Das NF-Signal fällt hier von tiefen zu hohen Frequenzen ab. Im oberen Seitenband liegt es genau so, im unteren gespiegelt: die tiefste NF-Frequenz liegt immer am nächsten am Träger.',
    },
    {
      id: 'warn-bilder', type: 'callout', tone: 'warning', title: 'So liest du Spektralbilder in der Prüfung',
      md: `
Bei den Bildfragen (NE205 bis NE208) musst du zuerst den **Träger** finden (Senkrechte in der Mitte) und dann sehen, **wo** das Signal steht:

- Links vom Träger liegt das **untere** Seitenband (LSB), rechts das **obere** (USB), das ist eine Frage der Lage, nicht der Bezeichnung. Falsch sind Antworten wie „a = NF, b = HF“ oder „DSB/SSB“.
- **AM**: Träger **und** beide Seitenbänder, das untere gespiegelt zum oberen.
- **USB**: nur rechts, in der gleichen Reihenfolge wie das NF-Spektrum. **LSB**: nur links, **gespiegelt**.
- Ein Träger mitten im Bild heißt: nicht SSB.
`,
    },
    {
      id: 'ssb', type: 'text', title: 'SSB: Nur ein Seitenband, kein Träger',
      md: `
Beide Seitenbänder enthalten dieselbe Information, und der Träger enthält keine. Dann kann man alles Überflüssige weglassen: Bei der **Einseitenbandmodulation** (SSB, *single sideband*) werden der Träger **unterdrückt** und nur **ein** Seitenband gesendet. Es geht also keine Sendeleistung für den Träger und das zweite Seitenband verloren, und das Signal braucht deutlich weniger Platz.[^darc-50ohm]

**AM** hat Träger und zwei Seitenbänder, **SSB** arbeitet mit Trägerunterdrückung und nur einem Seitenband (NE203). Bei den **Seitenbändern** gilt (NE204):

- **USB**: Trägerunterdrückung, **oberes** Seitenband. Sendefrequenz $f = f_\\text{T} + f_\\text{NF}$.
- **LSB**: Trägerunterdrückung, **unteres** Seitenband. Sendefrequenz $f = f_\\text{T} - f_\\text{NF}$.

Beide sind **SSB**; falsch sind „LSB mit Träger und zwei Seitenbändern“ oder „linkes/unteres Seitenband“.

## Rechnen: Welche Frequenz wird abgestrahlt?

Entscheidend ist, dass der Träger **fehlt**. Bei einem Träger von 21,250 MHz und einem 1-kHz-Ton im USB strahlt der Sender nur $21{,}250\\,\\text{MHz} + 1\\,\\text{kHz} = 21{,}251\\,\\text{MHz}$ ab (EE203), die Frequenz 21,250 MHz selbst tritt nicht auf. Bei 3,65 MHz und 2 kHz im LSB bleibt $3{,}65\\,\\text{MHz} - 2\\,\\text{kHz} = 3{,}648\\,\\text{MHz}$ (EE204); „3,648 und 3,650 MHz“ oder „3,648 und 3,652“ wären Signale mit Träger beziehungsweise mit zwei Seitenbändern, also AM.
`,
    },
    {
      id: 'demo-labor', type: 'viz', viz: 'modulations-labor', title: 'Modulations-Labor',
      intro: 'Stelle Sendeart, Trägerfrequenz und NF-Signal ein und beobachte oben das Zeitbild, unten das Spektrum. Das Zeitbild ist herabskaliert (Träger 10 kHz statt MHz); im Spektrum stehen die echten Frequenzen. Mit „Einzelton“ kannst du die Rechenbeispiele nachvollziehen.',
      task: 'Löse die vier Ziele: USB-Rechnung ablesen (21,250 MHz + 1 kHz), LSB-Rechnung ablesen (3,65 MHz − 2 kHz), AM- und SSB-Bandbreite mit Sprache vergleichen, und CW ansehen.',
      caption: 'Beim SSB-Einzelton hat das Zeitbild keine Hüllkurve: Es ist eine reine Schwingung auf der Frequenz $f_\\text{T} \\pm f_\\text{NF}$.',
    },
    {
      id: 'bw-text', type: 'text', title: 'Bandbreite: Wie viel Platz belegt ein Signal?',
      md: `
Die **Bandbreite** eines Signals ist der Frequenzbereich, den es beansprucht: Unterschied zwischen der höchsten und der niedrigsten Frequenz im [Frequenzspektrum](wiki:Frequenzspektrum|Signal frequency spectrum) der Aussendung. Ihre Einheit ist das [**Hertz**](wiki:Hertz (Einheit)|Hertz) (EA105). Nicht [[baud|Baud]], nicht Bit pro Sekunde, nicht Dezibel; mit denen messen wir Symbolrate, Datenrate und Pegel (dazu die Lektion über Digitaltechnik).

Rechtlich ist die [[belegte-bandbreite|belegte Bandbreite]] in der AFuV so definiert: die Bandbreite, bei der unterhalb der unteren und oberhalb der oberen Frequenzgrenze jeweils nur **0,5 %** der gesamten mittleren Leistung der Aussendung liegen (§ 2 Nr. 10).[^afuv] In der Praxis genügt dir die Faustregel:

<div style="overflow-x:auto"><table>
<tr><th>Sendeart</th><th>Bandbreite etwa</th></tr>
<tr><td>CW</td><td>$\\lesssim$ 300 Hz (bei 20 WPM), die kleinste</td></tr>
<tr><td>SSB</td><td>etwa die <b>NF-Bandbreite</b>: bei Sprache <b>2,4 kHz</b></td></tr>
<tr><td>AM</td><td><b>zwei</b>mal die höchste NF-Frequenz: bei Sprache <b>5,4 kHz</b> (etwas mehr als das Doppelte der NF-Bandbreite)</td></tr>
<tr><td>FM-Sprechfunk</td><td><b>12 bis 15 kHz</b>, abhängig vom Hub (nächste Lektion)</td></tr>
</table></div>

**SSB** belegt also **weniger als die halbe Bandbreite von AM** (EE201), und zwar *weniger* als die Hälfte, weil bei SSB auch Anteile unterhalb von 300 Hz nicht übertragen werden. Die HF-Bandbreite eines SSB-Signals **entspricht der Bandbreite des NF-Signals** (EE202). Sie ist nicht null (der Träger fehlt, das Seitenband nicht), nicht die Hälfte und nicht das Doppelte (das gilt für AM). **CW ist schmaler als SSB und AM** (EE207); „CW ist breiter als …“ ist in beiden Richtungen falsch.

## Warum Sprache auf 2,7 kHz begrenzt wird

Zu viel Bandbreite stört die Nachbarstation. Für gute Sprachverständlichkeit reichen etwa **300 Hz bis 3 kHz** völlig aus. Deshalb wird das Mikrofonsignal bandbegrenzt, und die **höchste NF-Frequenz sollte unter 3 kHz** liegen (EJ211). Die **Übertragungsbandbreite** bei SSB sollte **höchstens 2,7 kHz** betragen (EJ210; nicht 1,8 kHz, nicht 3,1 kHz, schon gar nicht 15 kHz). Im Sender erzeugt man SSB meist mit einem Filter, das das unerwünschte Seitenband heraussiebt; sein Durchlassbereich beträgt **2,4 kHz** (EF310). Die anderen Zahlen der Frage sind Filter für anderes: 800 Hz (ein enges CW-Filter), 455 kHz (typische [[zwischenfrequenz|Zwischenfrequenz]] von Rundfunkempfängern) und 10,7 MHz (UKW-Zwischenfrequenz).
`,
    },
    {
      id: 'warn-bw', type: 'callout', tone: 'warning', title: 'Typische Denkfehler bei der Bandbreite',
      md: `
- „SSB braucht ein Viertel der AM-Bandbreite.“ Nein: etwas **weniger als die Hälfte**. Halbiert wird die Doppelbandbreite von AM, die Hälfte von 5,4 kHz sind 2,7 kHz, und SSB belegt bei Sprache 2,4 kHz.
- „Bei SSB ist die HF-Bandbreite null, weil der Träger unterdrückt wird.“ Unterdrückt wird der Träger, nicht das Seitenband.
- „SSB und AM lassen sich nicht vergleichen, weil sie anders erzeugt werden.“ Doch, gerade der Vergleich ist die Stärke von SSB.
- „SSB braucht die halbe Bandbreite des NF-Signals.“ Nein: die **gleiche**.
`,
    },
    {
      id: 'afuv-text', type: 'text', title: 'Wie breit darf ein Signal sein? AFuV Anlage 1',
      md: `
Jedes Amateurfunkband hat in der **Anlage 1 der Amateurfunkverordnung** eine **zulässige belegte Bandbreite**, festgelegt in den *Zusätzlichen Nutzungsbestimmungen* (Teil B). Die Anlage liegt in der Prüfung als Hilfsmittel auf deinem Tisch, du musst die Zahlen also nicht auswendig kennen, aber du musst die Tabelle **lesen können**: In Spalte 7 stehen die **Nummern** der Bestimmungen, und in Teil B die Bandbreite. Die wichtigsten für Klasse E:[^afuv]

<div style="overflow-x:auto"><table>
<tr><th>Frequenzbereich (Nr. in Spalte 7)</th><th>max. belegte Bandbreite</th></tr>
<tr><td>135,7–137,8 kHz, 472–479 kHz, 10100–10150 kHz (Nr. 1)</td><td><b>800 Hz</b></td></tr>
<tr><td>Kurzwelle, z. B. 3500–3800 kHz, 7000–7200 kHz, 14000–14350 kHz, 21000–21450 kHz (Nr. 3)</td><td><b>2,7 kHz</b></td></tr>
<tr><td>28–29,7 MHz (Nr. 4)</td><td><b>7 kHz</b> unterhalb 29 MHz, <b>40 kHz</b> oberhalb</td></tr>
<tr><td>144–146 MHz (Nr. 6)</td><td><b>40 kHz</b></td></tr>
<tr><td>430–440 MHz (Nr. 7)</td><td><b>2 MHz</b>; AM-Fernsehen <b>7 MHz</b></td></tr>
</table></div>

Wende das gleich an: *Wo beträgt die maximal zulässige Bandbreite 2,7 kHz?* Zum Beispiel im 80-m-Band (3500 bis 3800 kHz; VD739). *Wo 7 kHz?* Im Teil 28 bis 29 MHz (VD740). *Wo 40 kHz?* Im 2-m-Band 144 bis 146 MHz (VD741). *Wo 2 MHz beziehungsweise 7 MHz für AM-Fernsehen?* Im 70-cm-Band 430 bis 440 MHz (VD742). Und *800 Hz* gilt bei 135,7 bis 137,8 kHz, 472 bis 479 kHz und 10100 bis 10150 kHz (VD738).

**Die Verantwortung liegt bei dir:** Die Grenzen dürfen nicht überschritten werden, und die Bundesnetzagentur prüft nicht vorher, was du aussendest. Nach § 16 Absatz 2 AFuV ist die Bandbreite zudem auf das für die Sendeart **notwendige Maß** zu beschränken und die Mittenfrequenz so zu wählen, dass die belegte Bandbreite **innerhalb des Amateurfunkbandes** liegt.[^afuv]
`,
    },
    {
      id: 'warn-anlage', type: 'callout', tone: 'warning', title: 'Verwechslungsfallen in Anlage 1',
      md: `
Die falschen Antworten in VD738 bis VD742 sind **echte Frequenzbereiche** mit **anderen** Bandbreiten. Schau deshalb immer in Spalte 7 nach, nicht nach dem Gefühl:

- **30 m (10100 bis 10150 kHz)** hat nur **800 Hz**, die anderen Kurzwellenbänder haben 2,7 kHz. Wer hier SSB macht, ist zu breit.
- **28 bis 29 MHz** (7 kHz) liegt im selben Band wie **29 bis 29,7 MHz** (40 kHz): Die Grenze verläuft *innerhalb* des 10-m-Bandes.
- **2 m** darf 40 kHz, **70 cm** 2 MHz, und die gängigen Bandbreiten liegen weit darunter. Die Grenzen sind Obergrenzen, keine Empfehlung.
`,
    },
    {
      id: 'edge-text', type: 'text', title: 'Am Bandrand: halbe Bandbreite Abstand',
      md: `
Auch die Bandgrenzen gelten für das **ganze Signal**. Steht bei **FM oder AM** die eingestellte Frequenz (= Trägerfrequenz) auf der Bandgrenze, liegt das Signal zur Hälfte außerhalb: Das Signal erstreckt sich um die Trägerfrequenz herum nach beiden Seiten. Deshalb: **mindestens die halbe belegte Bandbreite Abstand zur Bandgrenze.** Belegt eine FM-Aussendung 15 kHz, braucht die Einstellfrequenz mindestens $15\\,\\text{kHz}/2 = 7{,}5\\,\\text{kHz}$ Abstand (NE305). „0 kHz“ wäre die Antwort für jemanden, der nur die Trägerfrequenz betrachtet; „15 kHz“ verschenkt die Hälfte.

Bei **SSB** ist es anders, weil das Signal nur **auf einer Seite** der (unterdrückten) Trägerfrequenz liegt: Beim **LSB** liegt es ganz **unterhalb** der eingestellten Frequenz, beim **USB** ganz **oberhalb**. Mit LSB darfst du also die eingestellte Frequenz auf die *obere* Bandgrenze legen, mit USB dort nicht (das ganze Signal wäre außerhalb!). Mit USB geht es dafür an der *unteren* Bandgrenze. Dieselbe Überlegung gilt für [[digimode|Digimodes]], die per USB gesendet werden: Das Signal liegt oberhalb der eingestellten Frequenz.[^darc-50ohm]
`,
    },
    {
      id: 'demo-bandgrenze', type: 'viz', viz: 'bandgrenzen-check', title: 'Bandgrenzen-Check',
      intro: 'Wähle Band und Sendeart, lege die eingestellte Frequenz dicht an die Bandgrenze und lies ab, ob das ganze Signal im Band liegt und ob die zulässige Bandbreite eingehalten wird. Die Grenzen stammen aus Anlage 1 (Stand 05.10.2026).',
      task: 'Löse die vier Ziele: Mindestabstand für FM 15 kHz an der unteren Bandgrenze von 70 cm, LSB auf der oberen Bandgrenze von 80 m, USB mit derselben Einstellung (verboten) und AM auf 30 m.',
    },
    {
      id: 'mission-qso', type: 'callout', tone: 'mission', title: 'Funkpraxis: Dein erstes SSB-Signal',
      md: `
Auf dem 80-m-Band (3500 bis 3800 kHz) hörst du beim Drehen am [[vfo|VFO]]-Knopf, wie sich Sprache von unverständlichem „Entengeschnatter“ zu klarer Stimme verwandelt: Bei SSB fehlt der Träger, und schon ein paar hundert Hertz Abweichung machen die Stimme unnatürlich. Zwei Dinge gehören sofort zu deinem Alltag:

1. **Mikrofonverstärkung** nicht „so laut wie möglich“, sondern so, dass die [[alc|ALC]]-Anzeige (mehr dazu in der Lektion über den [[transceiver|Transceiver]]) gerade zuckt.
2. Vor jedem Sendebeginn **hinhören, ob die Frequenz frei ist**. Und dicht am Bandrand prüfen, ob dein **ganzes** Signal noch im Band liegt: USB ragt von der eingestellten Frequenz nach oben, LSB nach unten.
`,
    },
    {
      id: 'mic-text', type: 'text', title: 'Mikrofonverstärkung: weder zu leise noch zu laut',
      md: `
Bei SSB hängt die abgestrahlte Leistung direkt vom **NF-Pegel** ab: Ohne Sprache (und ohne Träger!) wird nichts ausgesendet, bei leiser Sprache wenig, bei lauter viel. Das ist der Unterschied zu FM (dort konstante Leistung).

- **Mikrofonverstärkung zu gering** → geringe Modulation → **geringe Ausgangsleistung** (EE206). Die Gegenstation hört dich leise.
- **Ausgangsleistung verringern** kannst du, indem du die **NF-Amplitude verringerst** (EE205), also leiser sprechen oder die Mikrofonverstärkung zurückdrehen. „Lauter ins Mikrofon sprechen“ erhöht die Leistung, die **[[squelch|Squelch]]** hat damit nichts zu tun (sie gehört zum Empfänger), und eine größere **NF-Bandbreite** verbreitert nur das Signal.
- **Mikrofonverstärkung zu hoch** → die NF-Stufen und die Endstufe werden **übersteuert**: Das Sendesignal wird **breiter**, es entstehen Störungen auf **dicht benachbarten Frequenzen** (EJ215). Im Funkerjargon heißt das **[[splatter|Splatter]]**: Die Nachbarstation hört dich „spritzen“.

Störungen auf einem *anderen Band*, in der Stromversorgung oder bei anderen elektronischen Geräten sind **keine** typische Folge zu hoher Mikrofonverstärkung: Das sind andere Fehler ([[oberwellen|Oberwellen]], EMV), die in späteren Lektionen drankommen.
`,
    },
    {
      id: 'demo-mic', type: 'viz', viz: 'mikrofon-pegel', title: 'Mikrofonpegel und Splatter',
      params: { goals: ['quiet', 'splatter', 'opt'] },
      intro: 'Die Balken zeigen, wie weit die Sprachsilben die Endstufe aussteuern. Oberhalb der ALC-Schwelle (gelb) wird die Verstärkung abgesenkt; bei Übersteuerung (rot) entstehen Nebenaussendungen, rechts neben dem Nutzband.',
      task: 'Stelle die Mikrofonverstärkung dreimal ein: so leise, dass die Spitzenleistung unter 20 W liegt; so laut, dass die Nachbarstation gestört wird; und richtig (mindestens 85 W ohne Splatter).',
    },
    {
      id: 'quiz-modulation', type: 'quiz', title: 'Welche Aussagen stimmen?',
      question: 'Welche Aussagen über AM, SSB und CW sind richtig? (Mehrfachauswahl)',
      options: [
        { text: 'Bei AM bleibt die Trägerfrequenz konstant, die Amplitude folgt dem NF-Signal.', correct: true, why: 'Genau das ist Amplitudenmodulation. Verändert sich die Frequenz, ist es FM.' },
        { text: 'Bei SSB werden der Träger und ein Seitenband unterdrückt.', correct: true, why: 'Beide Seitenbänder tragen dieselbe Information, deshalb genügt eines. Der Träger trägt gar keine.' },
        { text: 'Bei CW wird der Träger ein- und ausgeschaltet.', correct: true, why: 'Tastung, also Amplitude 0 % und 100 %.' },
        { text: 'Das obere Seitenband (USB) liegt unterhalb der Trägerfrequenz.', correct: false, why: 'Oberes Seitenband heißt: Frequenzen **über** dem Träger, $f_\\text{T} + f_\\text{NF}$.' },
        { text: 'SSB belegt etwa die doppelte Bandbreite von AM.', correct: false, why: 'Umgekehrt: AM belegt etwa das Doppelte der NF-Bandbreite, SSB nur etwa die NF-Bandbreite.' },
        { text: 'CW braucht von allen genannten Sendearten die größte Bandbreite.', correct: false, why: 'CW belegt die kleinste: Es wird nur eine einzelne Frequenz getastet.' },
      ],
    },
    {
      id: 'calc-sprachband', type: 'numeric', title: 'Bandbreite eines Sprachsignals',
      question: 'Das Spektrum eines Sprachsignals reicht von 250 Hz bis 2850 Hz. Wie groß ist die Bandbreite in Hz?',
      answer: 2600, tolerance: 0, unit: 'Hz',
      hint: 'Obere minus untere Grenzfrequenz.',
      explain: '$2850\\,\\text{Hz} - 250\\,\\text{Hz} = 2600\\,\\text{Hz}$. Bei SSB belegt das Signal auf der Funkfrequenz dieselbe Breite.',
    },
    {
      id: 'calc-wellenlaenge-ton', type: 'numeric', title: 'Ein Ton als Funkwelle',
      question: 'Wie lang wäre die Funkwelle bei einem Ton von 3 kHz (c = 300 000 km/s)? Antwort in Kilometern.',
      answer: 100, tolerance: 1, unit: 'km',
      hint: 'λ = c / f.',
      explain: '$300\\,000\\,\\text{km/s}/3\\,000\\,\\text{Hz} = 100\\,\\text{km}$. Mit einem Träger auf Kurzwelle (z. B. 7 MHz ≈ 43 m) bleiben die Antennen handlich.',
    },
    {
      id: 'quiz-sprache', type: 'quiz', title: 'Sprache und Bandbreite',
      question: 'Welche Aussagen zu Sprachsignalen im Funk sind richtig? (Mehrfachauswahl)',
      options: [
        { text: 'Für verständlichen Sprechfunk genügen etwa 300 Hz bis 3 kHz.', correct: true, why: 'Die Formanten der Vokale und wichtige Konsonantenanteile liegen darin.' },
        { text: 'Eine größere NF-Bandbreite macht das SSB-Signal auf der Funkfrequenz breiter.', correct: true, why: 'Bei SSB ist die HF-Bandbreite gleich der NF-Bandbreite.' },
        { text: 'Fehlen die hohen Anteile (Zischlaute), klingt die Stimme dumpf und wird schwerer verständlich.', correct: true, why: 'Konsonanten tragen viel zur Verständlichkeit bei.' },
        { text: 'Sprache enthält alle Frequenzen bis weit über 20 kHz in gleicher Stärke.', correct: false, why: 'Das Spektrum fällt zu hohen Frequenzen ab.' },
        { text: 'Das Mikrofon wandelt die Sprachfrequenz direkt in die Sendefrequenz um.', correct: false, why: 'Es wandelt Schall in eine NF-Schwingung; erst der Sender setzt sie auf den Träger.' },
      ],
    },
    {
      id: 'calc-usb', type: 'numeric', title: 'USB: welche Frequenz wird gesendet?',
      question: 'Ein SSB-Sender ist auf eine Trägerfrequenz von 7,100 MHz eingestellt (USB, ideal moduliert). Er wird mit einem Ton von 1,5 kHz moduliert. Auf welcher Frequenz strahlt er ab? Antwort in kHz.',
      answer: 7101.5, tolerance: 0, unit: 'kHz',
      hint: 'USB bedeutet oberes Seitenband: Träger plus NF-Frequenz. Der Träger selbst ist unterdrückt.',
      explain: '$f = f_\\text{T} + f_\\text{NF} = 7100\\,\\text{kHz} + 1{,}5\\,\\text{kHz} = 7101{,}5\\,\\text{kHz}$. Bei 7100 kHz selbst ist **nichts** zu messen.',
    },
    {
      id: 'calc-lsb', type: 'numeric', title: 'LSB: welche Frequenz wird gesendet?',
      question: 'Derselbe Sender arbeitet im LSB mit einer Trägerfrequenz von 3,700 MHz und einer NF von 2,7 kHz (höchste Sprachfrequenz). Auf welcher Frequenz liegt die obere Grenze des Signals, und auf welcher die untere? Gib die **untere** Frequenz in kHz an.',
      answer: 3697.3, tolerance: 0, unit: 'kHz',
      hint: 'LSB: Träger minus NF. Die höchste NF-Frequenz ergibt die am weitesten vom Träger entfernte Linie.',
      explain: '$f = f_\\text{T} - f_\\text{NF} = 3700\\,\\text{kHz} - 2{,}7\\,\\text{kHz} = 3697{,}3\\,\\text{kHz}$. Die obere Grenze liegt bei 3700 kHz − 0,3 kHz = 3699,7 kHz (tiefste NF-Frequenz). Das ganze Signal liegt *unter* der Einstellfrequenz.',
    },
    {
      id: 'calc-am', type: 'numeric', title: 'AM-Bandbreite',
      question: 'Ein AM-Sender wird mit Sprache bis höchstens 3 kHz moduliert. Welche Bandbreite belegt er ungefähr (Näherung $B \\approx 2 \\cdot f_\\text{NF,max}$)? Antwort in kHz.',
      answer: 6, tolerance: 0, unit: 'kHz',
      hint: 'Zwei Seitenbänder, jedes so breit wie die höchste NF-Frequenz.',
      explain: '$B \\approx 2 \\cdot 3\\,\\text{kHz} = 6\\,\\text{kHz}$. Auf dem 80-m-Band mit höchstens 2,7 kHz wäre das ein Verstoß gegen Nr. 3 der Anlage 1: Dort ist nur SSB mit 2,4 kHz erlaubt.',
    },
    {
      id: 'order-bw', type: 'order', title: 'Nach Bandbreite sortieren',
      prompt: 'Sortiere die Aussendungen von der **kleinsten** zur **größten** belegten Bandbreite.',
      items: ['CW bei 20 WPM (≈ 300 Hz)', 'SSB-Sprache (≈ 2,4 kHz)', 'AM-Sprache (≈ 5,4 kHz)', 'FM-Sprechfunk (≈ 12 bis 15 kHz)', 'Amateurfunkfernsehen mit AM (≈ 6 MHz)'],
      explain: 'Je mehr Information pro Zeit, desto mehr Bandbreite: Telegrafie braucht fast nichts, Fernsehen am meisten. Deshalb darf die Bandbreite in der Anlage 1 mit der Frequenz steigen: von 800 Hz bis zu 2 MHz/7 MHz im 70-cm-Band.',
    },
    {
      id: 'match-spektrum', type: 'match', title: 'Sendeart und Merkmal',
      prompt: 'Ordne jeder Sendeart ihr typisches Merkmal zu.',
      pairs: [
        ['CW', 'Träger wird ein- und ausgeschaltet'],
        ['AM', 'Träger plus zwei Seitenbänder'],
        ['USB', 'nur Frequenzen oberhalb des unterdrückten Trägers'],
        ['LSB', 'nur Frequenzen unterhalb des unterdrückten Trägers, gespiegelt'],
        ['SSB allgemein', 'Bandbreite entspricht etwa der NF-Bandbreite'],
      ],
    },
    {
      id: 'video-modulation', type: 'video', youtube: 'i6SKxyqX4iY', label: 'Amateurfunkvorlesung Klasse E, Lektion 12: Modulation', channel: 'Computer Engineering @ JMU Würzburg',
      why: 'Vertiefung zum Thema Modulation aus einer Hochschulvorlesung zur Klasse E, zum Nachhören nach dieser Lektion.',
    },
    {
      id: 'recall-ssb', type: 'recall', title: 'In eigenen Worten',
      prompt: 'Erkläre jemandem, der nur AM kennt, wie SSB funktioniert: Was wird weggelassen, warum geht das, und welche Vorteile ergeben sich für Leistung und Bandbreite? Wie berechnest du, auf welcher Frequenz ein USB-Signal liegt?',
      answer: 'Bei AM entstehen neben dem Träger zwei Seitenbänder, die beide dieselbe Information tragen; der Träger enthält keine Information. Bei SSB wird der Träger unterdrückt und nur ein Seitenband gesendet (USB oder LSB). Dadurch wird keine Leistung für den Träger und das zweite Seitenband verschwendet, und die Bandbreite entspricht nur noch der NF-Bandbreite (Sprache etwa 2,4 kHz), also weniger als die Hälfte von AM. Die Sendefrequenz im USB ist Trägerfrequenz plus NF-Frequenz, im LSB Trägerfrequenz minus NF-Frequenz; die Trägerfrequenz selbst tritt nicht auf. Dafür hängt die abgestrahlte Leistung vom NF-Pegel ab: zu leise gibt wenig Leistung, zu laut Splatter.',
      hints: ['Welcher Teil des AM-Signals trägt keine Information?', 'Wo liegt das Signal relativ zur eingestellten Frequenz im USB, wo im LSB?'],
      cards: ['am-vs-ssb', 'usb-lsb-freq'],
    },
  ],
  cards: [
    { id: 'modulation-def', front: 'Was bewirkt Modulation?', back: 'Informationen werden auf einen (oder mehrere) Träger übertragen: Amplitude, Frequenz oder Phase des Trägers folgen dem Informationssignal. Das Gegenstück ist die Demodulation.' },
    { id: 'cw-def', front: 'Wie werden bei CW Informationen übertragen?', back: 'Durch Ein- und Ausschalten eines HF-Trägers (Tastung, Morsecode). Kleinste Bandbreite aller Sendearten, bei 20 WPM etwa 300 Hz.' },
    { id: 'am-def', front: 'Amplitudenmodulation: Was ändert sich, was bleibt?', back: 'Die Amplitude folgt dem NF-Signal, die Trägerfrequenz bleibt konstant. Im Spektrum: Träger plus unteres und oberes Seitenband, B ≈ 2 · f_NF,max.' },
    { id: 'am-vs-ssb', front: 'Unterschied AM und SSB?', back: 'AM: Träger und zwei Seitenbänder. SSB: Trägerunterdrückung und nur ein Seitenband (Sprache etwa 2,4 kHz Bandbreite).' },
    { id: 'usb-lsb-freq', front: 'Sendefrequenz im USB und im LSB?', back: 'USB (oberes Seitenband): f = f_T + f_NF. LSB (unteres Seitenband): f = f_T − f_NF. Der Träger selbst ist unterdrückt: Beispiel 21,250 MHz + 1 kHz → 21,251 MHz.' },
    { id: 'ssb-bandbreite', front: 'Bandbreite von SSB im Vergleich zu AM und zum NF-Signal?', back: 'Entspricht etwa der Bandbreite des NF-Signals, weniger als die Hälfte von AM. Sprache: höchste NF unter 3 kHz, Übertragungsbandbreite höchstens 2,7 kHz, SSB-Filter 2,4 kHz.' },
    { id: 'bw-reihenfolge', front: 'Reihenfolge der Bandbreiten?', back: 'CW (kleinste) < SSB < AM < FM-Sprechfunk < Fernsehen. CW ist sowohl gegen SSB als auch gegen AM schmaler.' },
    { id: 'bw-anlage1', front: 'Maximale belegte Bandbreiten laut AFuV Anlage 1?', back: '800 Hz: 135,7–137,8 kHz, 472–479 kHz, 10100–10150 kHz. 2,7 kHz: Kurzwelle (z. B. 3500–3800 kHz). 7 kHz: 28–29 MHz (darüber 40 kHz). 40 kHz: 144–146 MHz. 2 MHz (AM-TV 7 MHz): 430–440 MHz.' },
    { id: 'bw-einheit', front: 'Welche Einheit hat die Bandbreite?', back: 'Hertz (Hz). Nicht Baud (Symbolrate), nicht Bit/s (Datenrate), nicht dB (Pegel).' },
    { id: 'belegte-bw-def', front: 'Definition belegte Bandbreite (AFuV § 2 Nr. 10)?', back: 'Die Bandbreite, bei der unterhalb der unteren und oberhalb der oberen Grenze jeweils 0,5 % der gesamten mittleren Leistung liegen.' },
    { id: 'bandgrenze-abstand', front: 'Mindestabstand zur Bandgrenze bei AM/FM, und bei SSB?', back: 'AM/FM: mindestens die halbe belegte Bandbreite (FM 15 kHz → 7,5 kHz). SSB: Das Signal liegt einseitig: LSB darf an der oberen, USB an der unteren Bandgrenze eingestellt werden.' },
    { id: 'mikro-ssb', front: 'Mikrofonverstärkung bei SSB: zu gering, zu hoch?', back: 'Zu gering: geringe Ausgangsleistung. Zu hoch: Übersteuerung, breiteres Signal, Splatter auf dicht benachbarten Frequenzen. Leistung verringern: NF-Amplitude verringern.' },
    { id: 'warum-traeger', front: 'Warum moduliert man einen Träger, statt das NF-Signal direkt zu senden?', back: 'Eine Antenne für NF-Wellen (z. B. 1 kHz ≈ 300 km) wäre unpraktisch, und alle Sprecher lägen auf denselben Frequenzen. Der Träger legt die Information auf eine eigene, hohe Frequenz.' },
    { id: 'sprachband', front: 'Welchen Frequenzbereich braucht Sprechfunk?', back: 'Etwa 300 Hz bis 3 kHz (Beispiel: 300–2700 Hz, Bandbreite 2,4 kHz). Das reicht für Verständlichkeit; mehr Bandbreite kostet Platz im Band.' },
    { id: 'formanten', front: 'Was sind Formanten?', back: 'Frequenzbereiche eines Vokals mit besonders viel Energie; aus der Lage der ersten beiden erkennt das Gehirn den Vokal. Sie liegen unter 3 kHz.' },
    { id: 'mikro-abstand', front: 'Mikrofonabstand und Pegel beim Sprechen?', back: 'Mikrofon nah am Mund (Faustregel Handbreit): mehr Nutzsignal gegenüber Raumgeräuschen. Zu nah: Tiefen und Zischlaute zu stark; zu weit: leise und hallig. Pegel so, dass nicht übersteuert wird.' },
  ],
};
