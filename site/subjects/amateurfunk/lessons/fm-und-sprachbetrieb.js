// Lektion fm-und-sprachbetrieb: Frequenzmodulation, Hub und Bandbreite, Schmalband-FM, Seitenband-Wahl am Mode-Schalter, Dynamikkompressor.
// Quellen für Fakten: DARC 50ohm.de (CC BY 4.0), IARU-Bandplan-Empfehlungen laut Fragenkatalog, AFuV Anlage 1 Teil B (Stand 05.10.2026).

const wavePath = (x0, x1, yc, amp, fn, n = 420) => {
  let d = '';
  for (let i = 0; i <= n; i++) { const t = i / n; d += (i ? 'L' : 'M') + (x0 + (x1 - x0) * t).toFixed(1) + ',' + (yc - amp * fn(t)).toFixed(1); }
  return d;
};
// Zeitverlauf: NF-Signal (leise/laut) und das daraus entstehende FM-Signal: die Frequenzauslenkung wächst mit der Lautstärke.
const fmFigure = () => {
  const w = 560, rows = [['leise gesprochen', 0.35], ['laut gesprochen', 1.0]];
  let g = '';
  rows.forEach(([title, a], i) => {
    const y = 8 + i * 118;
    g += `<text class="t" x="10" y="${y + 12}">${title}: NF-Signal (gestrichelt) und FM-Träger</text>`;
    g += `<line x1="10" x2="${w - 10}" y1="${y + 62}" y2="${y + 62}" stroke="var(--line-2)"/>`;
    g += `<path d="${wavePath(10, w - 10, y + 62, 36 * a, t => Math.sin(2 * Math.PI * 2 * t))}" fill="none" stroke="var(--accent-2)" stroke-dasharray="5 4" stroke-width="1.6"/>`;
    g += `<path d="${wavePath(10, w - 10, y + 62, 24, t => Math.sin(2 * Math.PI * 24 * t - 5 * a * Math.cos(2 * Math.PI * 2 * t)))}" fill="none" stroke="var(--accent)" stroke-width="1.4"/>`;
    g += `<text class="s" x="${w - 10}" y="${y + 106}" text-anchor="end">${a < 0.5 ? 'kleiner Hub: Schwingungen wechseln nur wenig ihren Abstand' : 'großer Hub: Abstand wechselt stark (Frequenz weicht weit ab)'}</text>`;
  });
  return `<svg viewBox="0 0 ${w} 246" role="img" aria-label="FM-Signal bei leiser und bei lauter Sprache: Die Amplitude bleibt gleich, die Frequenzauslenkung (Hub) ist bei lauter Sprache größer"><style>.t{font:600 12px system-ui,sans-serif;fill:var(--ink)}.s{font:11px system-ui,sans-serif;fill:var(--muted)}</style>${g}</svg>`;
};

export default {
  id: 'fm-und-sprachbetrieb',
  title: 'Frequenzmodulation und Modulationseinstellung',
  summary: 'FM/PM, Hub, Schmalband-FM, Mikrofonpegel und Kompressor am Transceiver.',
  minutes: 20,
  goals: [
    'Erklären, wie bei [[frequenzmodulation]] die Lautstärke (Frequenzhub) und die Tonhöhe übertragen werden und warum die Amplitude konstant bleibt',
    'Den Zusammenhang Mikrofonpegel, [[frequenzhub|Hub]] und Bandbreite nutzen, um ein zu breites FM-Signal zu verkleinern',
    'Am Transceiver die richtige Sendeart und das richtige Seitenband einstellen (LSB unter 10 MHz, USB ab 10 MHz) und Fehler in der Seitenband-Wahl erkennen',
    'Wissen, was ein Dynamikkompressor im Sender bewirkt',
  ],
  needs: ['am-ssb-cw'],
  blocks: [
    {
      id: 'fm-text', type: 'text', title: 'FM: Die Frequenz folgt der Sprache',
      md: `
Bei der [Frequenzmodulation](wiki:Frequenzmodulation|Frequency modulation) verändert das Informationssignal die **momentane Frequenz** des Trägers; **die Amplitude bleibt konstant**.[^darc-50ohm] Das ist das genaue Gegenstück zu [AM](wiki:Amplitudenmodulation|Amplitude modulation) (NE301). Die falschen Antworten im Katalog drehen es um („Amplitude beeinflusst, Frequenz konstant“), kombinieren beides oder reihen beides hintereinander. Alles Unsinn: Bei FM ist es **nur** die Frequenz, und sie weicht nach oben und unten von der Nenn-Trägerfrequenz ab.

Zwei Dinge musst du zuordnen können:

- Die **Lautstärke** steckt in der **Größe der Auslenkung**, dem **[[frequenzhub|Frequenzhub]]** $\\Delta f$. Wer lauter spricht, lenkt den Träger weiter aus (EE306). „Häufigkeit der Frequenzänderung“ oder „Häufigkeit des Hubs“ ist dagegen die **Tonhöhe**, also die NF-Frequenz.
- Die **Amplitude des Sendesignals** wird vom Modulationssignal **nicht** beeinflusst (NE303). Sie ist weder gleich der Amplitude des Mikrofonsignals, noch wächst sie bei schnellerer oder lauterer [[modulation|Modulation]].

Daraus folgt gleich die **Leistungsfrage**: Wer in FM auf 70 cm mit 2 W sendet, strahlt **immer 2 W** ab, ob er laut spricht, leise oder gar nicht (NE304). Ohne Modulation sendet er einen unmodulierten Träger. Das ist der Unterschied zu [[einseitenbandmodulation|SSB]], wo die Leistung mit dem Sprachpegel mitwandert.

**[Phasenmodulation](wiki:Phasenmodulation|Phase modulation)** (PM) ist die Schwester der FM: Statt der Frequenz verändert das NF-Signal die Phase des Trägers. Für Sprechfunk ist das Ergebnis kaum zu unterscheiden; bei der Prüfung genügt „Frequenz- und Phasenmodulation“ als Verfahrensgruppe.
`,
    },
    {
      id: 'fig-fm', type: 'figure', title: 'FM bei leiser und lauter Sprache',
      html: fmFigure(),
      caption: 'Die Höhe der Schwingung (Amplitude) ist in beiden Bildern gleich. Bei lauter Sprache schwankt die Frequenz stärker: sie weicht weiter vom Mittelwert ab.',
    },
    {
      id: 'recognize-fm', type: 'callout', tone: 'insight', title: 'FM im Oszilloskop-Bild erkennen',
      md: `
Bei der Frage „Welches Modulationsverfahren zeigt das Bild?“ (EE301) gehst du zwei Fragen durch: **Schwankt die Höhe?** Wenn ja (Hüllkurve), ist es [[amplitudenmodulation|AM]]; sieht man *Pakete*, ist es SSB mit mehreren Tönen. **Bleibt die Höhe gleich, aber ändern sich die Abstände der Nulldurchgänge?** Dann ist es FM. Ein *Spektrum* mit nur einer Seite (links *oder* rechts vom Träger) ist LSB oder USB, siehe die vorige Lektion.
`,
    },
    {
      id: 'demo-fm', type: 'viz', viz: 'fm-hub-labor', title: 'FM-Hub-Labor',
      intro: 'Oben siehst du, wie die Frequenz des Trägers im Takt der Sprache ausgelenkt wird, unten das Spektrum mit der Bandbreite $B \\approx 2 \\cdot (\\Delta f + f_\\text{NF})$. Die Leistung bleibt immer gleich.',
      task: 'Stelle die Mikrofonaussteuerung und die Hubeinstellung so ein, dass die vier Ziele erfüllt sind: Lauter sprechen vergrößert den Hub (Begrenzer ausschalten), bei 3 kHz NF unter 12 kHz Bandbreite durch leiser sprechen, dasselbe durch kleineren Hub, und Pegel 0.',
    },
    {
      id: 'warn-fm', type: 'callout', tone: 'warning', title: 'Typische Fehlvorstellungen zur FM',
      md: `
- „Wer lauter spricht, sendet mit mehr Leistung.“ Bei FM nicht: Die **Leistung bleibt konstant**, nur der Hub wächst. Lauter ins Mikrofon heißt: breiteres Signal, nicht größere Reichweite.
- „FM hat geringere Anforderungen an die Bandbreite als SSB.“ Das Gegenteil: FM braucht deutlich mehr (12 bis 15 kHz gegen 2,4 kHz).
- „FM überbrückt größere Entfernungen.“ Nicht durch das Verfahren selbst. Der Vorteil von FM ist die **Störfestigkeit** gegen Amplitudenstörungen (nächster Abschnitt).
- „FM braucht weniger Leistung ohne Modulation.“ Falsch: Der Träger wird auch ohne Sprache mit voller Leistung gesendet; bei SSB dagegen ohne Sprache praktisch nichts.
`,
    },
    {
      id: 'bw-text', type: 'text', title: 'Hub bestimmt die Bandbreite',
      md: `
Je weiter der Träger ausgelenkt wird, desto mehr Frequenzbereich beansprucht das Signal. **Größerer Frequenzhub führt zu einer größeren HF-Bandbreite** (EE304). Nicht zu mehr Ausgangsleistung, nicht zu einer größeren Trägeramplitude, nicht zu kleineren Seitenbändern.

Als Näherung kennt man die **[Carson-Regel](wiki:Carson-Regel|Frequency modulation)**: $B \\approx 2 \\cdot (\\Delta f + f_\\text{NF,max})$ mit dem Hub $\\Delta f$ und der höchsten Modulationsfrequenz. Sie gibt an, in welchem Frequenzbereich etwa 99 % der Sendeleistung liegen. Mit 3 kHz Hub und 3 kHz höchster NF-Frequenz sind das $B \\approx 2 \\cdot (3 + 3)\\,\\text{kHz} = 12\\,\\text{kHz}$. (Die Regel selbst ist Stoff der Klasse A; für E reicht die Richtung: **mehr Hub → mehr Bandbreite**.)

Was tust du, wenn die Bandbreite zu groß wird?

- Im Sender **vor** dem Modulator wird das Signal des [Mikrofons](wiki:Mikrofon|Microphone) zunächst in der Amplitude begrenzt (Begrenzerverstärker); der Hub bei Vollaussteuerung ist festgelegt oder mit einem **Hubregler** einstellbar. Eine zu große FM-Bandbreite verringert man durch eine **Verringerung der Hubeinstellung** (EE305). An der **HF-Begrenzung**, am **Vorspannungsregler** oder an der **Trägerfrequenz** ändert das nichts.
- Bei Handfunkgerät und Mobil-Transceiver bestimmt **dein Sprechpegel** den Hub. Ist der Hub zu groß, sprich **leiser ins Mikrofon** (NE306). Mehr oder weniger *Sendeleistung* ändert den Hub nicht.

Das gilt auch am **Rand des [Amateurfunkbandes](wiki:Amateurfunkband|Amateur radio frequency allocations)**: Die halbe Bandbreite muss noch ins Band passen (Lektion zur Bandbreite); die Bundesnetzagentur setzt die obere Grenze in Anlage 1 (2 m: 40 kHz).

## [[schmalband-fm|Schmalband-FM]] auf 145,525 MHz

Der [IARU-Bandplan](wiki:International Amateur Radio Union|International Amateur Radio Union) empfiehlt im Bereich um **145,525 MHz**, nicht mehr als **12 kHz** Bandbreite zu belegen (BC216).[^iaru-r1-bandplaene-uebersicht] Deshalb stellst du dein Funkgerät dort auf **Schmalband-FM** (Narrow FM, kurz „NFM“, „Narrow“ im Menü). Das ist die Empfehlung des Bandplans, nicht die gesetzliche Obergrenze von 40 kHz. Weder 25 kHz noch 50 kHz Kanalabstand noch 5 kHz Kanalraster sind die Begründung.
`,
    },
    {
      id: 'mission-hub', type: 'callout', tone: 'mission', title: 'Funkpraxis: Wenn dein Handfunkgerät „kratzt“',
      md: `
Wer an der Umsetzer-Frequenz ins Mikrofon schreit, wird nicht besser gehört, im Gegenteil: Der Hub wird zu groß, das Signal **verzerrt** und rutscht in den Nachbarkanal. Halte das Funkgerät in normalem Abstand, sprich in normaler Lautstärke und stelle bei Bedarf **Narrow-FM** ein. Das ist keine Regel für den Prüfungsbogen, sondern guter Funkstil.
`,
    },
    {
      id: 'vorteil-text', type: 'text', title: 'Warum FM im Auto und am Relais zuhause ist',
      md: `
Störungen wie Blitze, Zündanlagen oder Motoren verändern vor allem die **Amplitude** eines Signals. Bei **AM und SSB** steckt die Information in der Amplitude, jede Störung klingt im Lautsprecher mit. Bei **FM** steckt sie in der Frequenz, und der Empfänger **begrenzt die Amplitude** ohnehin. FM ist dadurch gegenüber Amplitudenstörungen relativ unempfindlich (EE302). Im Kraftfahrzeug und in gestörter Umgebung wird FM deshalb **am wenigsten** beeinträchtigt (EE303); die Alternativen SSB, AM und DSB hören die Zündfunken mit.[^darc-50ohm]

Das ist der Grund, warum UKW-Handfunkgeräte und Relais mit FM-Sprechfunk arbeiten. Zu den üblichen Verfahren der **VHF/UHF-Handfunkgeräte** gehören **FM-Sprechfunk, [DMR](wiki:Digital Mobile Radio|Digital mobile radio) und [D-STAR](wiki:D-STAR|D-STAR)** (NE307). Kurzwellenfunk mit SSB ist dort kein Thema, und [[ft8|FT8]] oder [[cw-tastung|CW]] sind keine üblichen Handfunkgeräte-Verfahren. Einzelheiten zu DMR und D-STAR in der Lektion über digitale Betriebsarten.
`,
    },
    {
      id: 'mode-text', type: 'text', title: 'Der MODE-Schalter: Sendeart und Seitenband',
      md: `
An fast jedem Funkgerät wählst du die Sendeart mit einem Schalter, den die Hersteller meist **MODE** nennen: **CW, AM, FM, LSB, USB**.[^darc-50ohm] Als Modulationsarten zählen **SSB, FM und AM** (NE102). Begriffe wie [[rtty|RTTY]], [[psk31|PSK31]], SSTV, FT8, JS8, Olivia, THOR, M17 oder FreeDV sind **Übertragungsverfahren** ([[digimode|Digimodes]]), die ihrerseits per SSB oder FM übertragen werden.

Bei [SSB](wiki:Einseitenbandmodulation|Single-sideband modulation) musst du **das richtige [Seitenband](wiki:Seitenband|Sideband)** wählen. Die IARU empfiehlt:[^iaru-r1-bandplaene-uebersicht]

- **unterhalb von 10 MHz: unteres [[seitenband|Seitenband]] (LSB)**, etwa im **80-m-Band** (BC202). Es gilt kein „Europaverkehr unten, sonst oben“ und keine Bandhälftenregel,
- **ab 10 MHz: oberes Seitenband (USB)**, etwa im **20-m-Band** (BC203) und im **2-m-Band** (NE210); die Begründung „um die niedrige Frequenz auszugleichen“ gibt es nicht,
- bei **digitalen Betriebsarten** immer USB, auch unter 10 MHz.

Das Display zeigt dir, was eingestellt ist: Die Anzeige „**USB**“ bedeutet: Der [[transceiver|Transceiver]] arbeitet in der Modulationsart SSB im **oberen Seitenband** (NE209). Mit „Unterspannung“ oder „Unterer Schmalband Betrieb“ hat sie nichts zu tun. Für den Empfang im 80-m-Band stellst du am MODE-Schalter **LSB** ein, nicht „SSB“, USB oder AM (NE211).

## Warum das falsche Seitenband unverständlich klingt

Ein Sprachsignal mit tiefen und hohen Tönen liegt im **oberen** Seitenband mit den tiefen Tönen *unten* und den hohen *oben*. Im **unteren** Seitenband ist es **gespiegelt**, die tiefste Frequenz liegt immer am nächsten am Träger. Wählt dein Empfänger das falsche Seitenband, hörst du tiefe Töne als hohe und hohe als tiefe: unverständliches Entengeschnatter.

Dazu kommt: Bei SSB gibt es **keinen Träger**, an dem sich der Empfänger orientieren kann. Schon eine Abweichung von wenigen hundert Hertz verfälscht die Tonhöhe der Stimme. Deshalb gilt, wenn du SSB nicht verstehst (NE212): **Seitenband kontrollieren** und **feinfühlig am [[vfo|VFO]]-Knopf drehen**. Die TUNE-Taste sendet einen Träger, die [[ptt|PTT]] sendet, die [[rit|RIT]] verstellt nur die Empfangsfrequenz, und mit AM empfängst du ein SSB-Signal gar nicht.
`,
    },
    {
      id: 'demo-sb', type: 'viz', viz: 'seitenband-wahl', title: 'Seitenband und Abstimmung',
      intro: 'Die Gegenstation sendet SSB auf ihrer Trägerfrequenz. Wähle ihr Seitenband, dein Seitenband und stimme mit dem VFO-Regler ab: Das Bild zeigt das NF-Spektrum, das aus deinem Lautsprecher kommt.',
      task: 'Löse die drei Ziele: Stimme natürlich hören (gleiches Seitenband, richtig abgestimmt), gespiegeltes Signal hören (falsches Seitenband), und zu weit verstimmt bei richtigem Seitenband.',
    },
    {
      id: 'komp-text', type: 'text', title: 'Dynamikkompressor: leise Silben anheben',
      md: `
Sprache schwankt stark: laute Vokale, leise Konsonanten. Bei SSB und AM ist die Sendeleistung am Pegel der Silbe ausgerichtet, die leisen Anteile gehen daher schnell im Rauschen unter. Ein **[Dynamikkompressor](wiki:Dynamikkompressor|Dynamic range compression)** (englisch *dynamic compressor*, am Gerät oft „COMP“) schwächt zuerst laute Signalanteile über eine nichtlineare Kennlinie ab und verstärkt dann das gesamte Signal wieder. Ergebnis: **leise Anteile werden gegenüber den lauten angehoben**, die Verständlichkeit steigt, und der durchschnittliche Sendepegel ist höher und gleichmäßiger (EF306). Die Stufe heißt **Dynamic Compressor**, nicht [[noise-blanker|Noise Blanker]] (der blendet Impulsstörungen im Empfänger aus), nicht Clarifier (so nennen manche Hersteller die RIT) und nicht [[notchfilter|Notchfilter]].[^darc-50ohm]

Übertreibst du die Kompression, klingt die Stimme „platt“, und die Endstufe wird dauerhaft stark ausgesteuert. Auch hier gilt: die [[alc|ALC]] im Blick behalten.
`,
    },
    {
      id: 'demo-comp', type: 'viz', viz: 'mikrofon-pegel', title: 'Kompressor einschalten',
      params: { goals: ['comp'], gain: 45 },
      intro: 'Schalte den Sprachkompressor ein und beobachte die Balken: Die leisen Silben wachsen, die lauten bleiben. Die mittlere Leistung steigt, die Spitzenleistung bleibt etwa gleich.',
      task: 'Schalte den Kompressor ein, so dass die mittlere Leistung merklich steigt.',
    },
    {
      id: 'quiz-fm', type: 'quiz', title: 'Welche Aussagen zur FM sind richtig?',
      question: 'Welche Aussagen über Frequenzmodulation sind richtig? (Mehrfachauswahl)',
      options: [
        { text: 'Die Amplitude des Sendesignals bleibt idealerweise konstant.', correct: true, why: 'Nur die Frequenz folgt dem NF-Signal.' },
        { text: 'Die Lautstärke wird durch die Größe des Frequenzhubs übertragen.', correct: true, why: 'Lauter bedeutet größere Auslenkung; die Häufigkeit der Auslenkung ist die Tonhöhe.' },
        { text: 'Ein größerer Frequenzhub erzeugt eine größere HF-Bandbreite.', correct: true, why: 'Deshalb verringert man bei zu breitem Signal den Hub oder den Sprechpegel.' },
        { text: 'Wer lauter ins Mikrofon spricht, sendet mit mehr Leistung.', correct: false, why: 'Die Leistung bleibt konstant (2 W bleiben 2 W); nur der Hub und damit die Bandbreite wachsen.' },
        { text: 'FM hat geringere Anforderungen an die Bandbreite als SSB.', correct: false, why: 'FM belegt deutlich mehr Bandbreite; ihr Vorteil ist die Störfestigkeit gegenüber Amplitudenstörungen.' },
      ],
    },
    {
      id: 'calc-carson', type: 'numeric', title: 'FM-Bandbreite abschätzen',
      question: 'Ein Handfunkgerät arbeitet mit einem Hub von 2,5 kHz bei einer höchsten NF-Frequenz von 3 kHz. Wie groß ist die Bandbreite nach der Näherung $B \\approx 2 \\cdot (\\Delta f + f_\\text{NF,max})$? Antwort in kHz.',
      answer: 11, tolerance: 0, unit: 'kHz',
      hint: 'Addiere Hub und höchste NF-Frequenz, dann verdopple.',
      explain: '$B \\approx 2 \\cdot (2{,}5 + 3)\\,\\text{kHz} = 11\\,\\text{kHz}$: unter den 12 kHz, die der IARU-Bandplan für Schmalband-FM empfiehlt. Mit 5 kHz Hub wären es 16 kHz.',
    },
    {
      id: 'calc-abstand', type: 'numeric', title: 'Abstand zur Bandgrenze',
      question: 'Ein FM-Signal belegt 12 kHz. Wie viel Abstand muss die eingestellte Sendefrequenz mindestens von der Bandgrenze haben, damit die Aussendung im Band bleibt? Antwort in kHz.',
      answer: 6, tolerance: 0, unit: 'kHz',
      hint: 'Das Signal liegt symmetrisch um die eingestellte Trägerfrequenz.',
      explain: 'Die halbe belegte Bandbreite: $12\\,\\text{kHz}/2 = 6\\,\\text{kHz}$.',
    },
    {
      id: 'quiz-mode', type: 'quiz', title: 'Welcher MODE?',
      question: 'Du willst im 80-m-Band mit SSB-Sprechfunk arbeiten. Welche Einstellung am MODE-Schalter ist nach Empfehlung der IARU üblich?',
      options: [
        { text: 'LSB: unter 10 MHz wird das untere Seitenband benutzt.', correct: true, why: 'Auf 80 m, 40 m und 160 m ist LSB üblich.' },
        { text: 'USB: auf Kurzwelle wird immer das obere Seitenband benutzt.', correct: false, why: 'USB gilt ab 10 MHz, also auf 20 m, 15 m und 10 m, und bei Digimodes.' },
        { text: 'SSB: so steht es auf jedem Funkgerät.', correct: false, why: 'Der Schalter kennt nicht „SSB“, sondern LSB und USB. Das Seitenband musst du wählen.' },
        { text: 'AM: gemischtes Seitenband für beide Hälften.', correct: false, why: 'AM ist eine eigene Sendeart (Träger plus zwei Seitenbänder), keine SSB-Einstellung.' },
      ],
    },
    {
      id: 'match-mode', type: 'match', title: 'Aufgabe → Einstellung',
      prompt: 'Ordne jeder Situation die passende Sendeart oder Bedienung zu.',
      pairs: [
        ['SSB-Sprechfunk auf 80 m', 'LSB'],
        ['SSB-Sprechfunk auf 20 m', 'USB'],
        ['SSB auf 2 m', 'USB'],
        ['FT8 auf 40 m', 'USB'],
        ['Handfunkgerät am Relais', 'FM'],
        ['SSB klingt wie Entengeschnatter', 'Seitenband und VFO prüfen'],
      ],
    },
    {
      id: 'recall-fm', type: 'recall', title: 'In eigenen Worten',
      prompt: 'Dein Funkpartner sagt, dein FM-Signal sei zu breit und klinge verzerrt. Erkläre, wie bei FM Lautstärke und Bandbreite zusammenhängen, was die Leistung damit zu tun hat und was du am Gerät tun kannst.',
      answer: 'Bei FM folgt die Frequenz des Trägers dem NF-Signal, die Amplitude bleibt konstant. Die Lautstärke steckt in der Größe der Frequenzauslenkung (Hub). Lauter sprechen vergrößert den Hub, und ein größerer Hub bedeutet größere HF-Bandbreite (und Verzerrungen im Nachbarkanal); die Sendeleistung bleibt dabei konstant. Abhilfe: leiser ins Mikrofon sprechen bzw. die Hubeinstellung verringern, am Handfunkgerät eventuell auf Schmalband-FM (Narrow, höchstens 12 kHz laut IARU-Bandplan) schalten. Mehr oder weniger Sendeleistung ändert nichts am Hub.',
      hints: ['Was ändert sich bei lauterem Sprechen: Amplitude, Leistung oder Frequenzauslenkung?', 'Welche Einstellung begrenzt den Hub?'],
      cards: ['fm-hub-bandbreite', 'fm-hub-verringern'],
    },
  ],
  cards: [
    { id: 'fm-def', front: 'Frequenzmodulation: Was ändert das Informationssignal, was bleibt konstant?', back: 'Die Frequenz des Trägers folgt dem Informationssignal, die Amplitude bleibt idealerweise konstant.' },
    { id: 'fm-lautstaerke', front: 'Wodurch wird bei FM die Lautstärke übertragen?', back: 'Durch die Trägerfrequenzauslenkung (Frequenzhub). Die Häufigkeit der Auslenkung entspricht der Tonhöhe.' },
    { id: 'fm-leistung', front: 'FM mit 2 W: angezeigte Leistung bei lautem, leisem, keinem Sprechen?', back: 'Immer 2 W: die Amplitude des Trägers hängt nicht von der Modulation ab.' },
    { id: 'fm-hub-bandbreite', front: 'Größerer Hub bei FM bewirkt …?', back: 'Eine größere HF-Bandbreite (Näherung B ≈ 2·(Δf + f_NF,max)). Nicht mehr Leistung, nicht mehr Amplitude.' },
    { id: 'fm-hub-verringern', front: 'Wie verkleinerst du eine zu große FM-Bandbreite und einen zu großen Hub?', back: 'Hubeinstellung verringern; am Handfunkgerät/Mobil-Transceiver leiser ins Mikrofon sprechen. Leistung ändern hilft nicht.' },
    { id: 'fm-vorteil', front: 'Vorteil von FM gegenüber SSB und AM?', back: 'Geringere Beeinflussung durch Amplitudenstörungen (z. B. Zündfunken im Auto). Nicht: weniger Bandbreite, größere Reichweite oder weniger Leistung.' },
    { id: 'fm-schmalband', front: 'Warum Schmalband-FM bei 145,525 MHz?', back: 'Der IARU-Bandplan empfiehlt in diesem Bereich höchstens 12 kHz belegte Bandbreite.' },
    { id: 'sb-regel', front: 'Welches Seitenband bei SSB-Sprechfunk?', back: 'Unter 10 MHz LSB (z. B. 80 m), ab 10 MHz USB (z. B. 20 m, 2 m). Digitale Betriebsarten immer USB.' },
    { id: 'mode-usb', front: 'Was bedeutet „USB“ im Display?', back: 'Der Transceiver arbeitet in SSB im oberen Seitenband (upper sideband).' },
    { id: 'sb-falsch', front: 'SSB-Sprache unverständlich: was tun?', back: 'Seitenband kontrollieren (LSB/USB) und feinfühlig am VFO-Knopf drehen. Im falschen Seitenband sind hohe und tiefe Töne gespiegelt.' },
    { id: 'modulationsarten', front: 'Welche Begriffe sind Modulationsarten?', back: 'SSB, FM, AM (auch CW, PM). RTTY, PSK31, SSTV, FT8, JS8, Olivia, THOR, M17, FreeDV sind Übertragungsverfahren.' },
    { id: 'kompressor', front: 'Wie heißt die Senderstufe, die leise Sprachanteile gegenüber den lauten anhebt?', back: 'Dynamic Compressor (Dynamikkompressor). Noise Blanker, Clarifier und Notchfilter sind andere Dinge.' },
  ],
};
