// Lektion unerwuenschte-aussendungen: Oberwellen, Nebenaussendungen (Splatter), Übersteuerung, Oberwellenfilter (Tiefpass), Messung, Frequenzstabilität.
// Quellen für Fakten: DARC 50ohm.de (CC BY 4.0), AFuV § 2 Nr. 11 und § 16 (Stand 05.10.2026), BNetzA-Fragenkatalog 3. Auflage.

const path = (pts) => pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join('');
// Vier Filter-Frequenzgänge nebeneinander (Dämpfung nach oben abnehmend: oben = Durchlass).
const filterCurves = () => {
  const w = 560, cw = 128, gap = 16, y0 = 24, h = 78;
  const fx = (x, i) => 12 + i * (cw + gap) + x * cw;
  const specs = [
    ['Tiefpass', f => 1 / Math.sqrt(1 + (f / 0.45) ** 10), 'lässt tiefe Frequenzen durch'],
    ['Hochpass', f => 1 / Math.sqrt(1 + (0.45 / Math.max(f, 0.001)) ** 10), 'lässt hohe Frequenzen durch'],
    ['Bandpass', f => 1 / Math.sqrt(1 + (((f - 0.5) / 0.12) ** 2) ** 3), 'lässt nur ein Band durch'],
    ['Notchfilter', f => 1 - 0.97 * Math.exp(-(((f - 0.5) / 0.035) ** 2)), 'sperrt nur eine schmale Kerbe'],
  ];
  let g = '';
  specs.forEach(([name, fn, note], i) => {
    const pts = []; for (let k = 0; k <= 120; k++) { const f = k / 120; pts.push([fx(f, i), y0 + h * (1 - fn(f))]); }
    g += `<text class="t" x="${fx(0, i)}" y="14">${name}</text>`;
    g += `<line x1="${fx(0, i)}" x2="${fx(1, i)}" y1="${y0 + h}" y2="${y0 + h}" stroke="var(--ink-2)"/><line x1="${fx(0, i)}" x2="${fx(0, i)}" y1="${y0}" y2="${y0 + h}" stroke="var(--ink-2)"/>`;
    g += `<path d="${path(pts)}" fill="none" stroke="var(--accent)" stroke-width="2.2"/>`;
    g += `<text class="s" x="${fx(0, i)}" y="${y0 + h + 14}">${note}</text><text class="s" x="${fx(1, i)}" y="${y0 + h - 4}" text-anchor="end">f →</text>`;
  });
  return `<svg viewBox="0 0 ${w} 130" role="img" aria-label="Frequenzgänge von Tiefpass, Hochpass, Bandpass und Notchfilter"><style>.t{font:600 12.5px system-ui,sans-serif;fill:var(--ink)}.s{font:10.5px system-ui,sans-serif;fill:var(--muted)}</style>${g}</svg>`;
};
// LC-Tiefpass (π-Filter, 5. Ordnung): Spulen längs, Kondensatoren gegen Masse.
const lcLowpass = () => {
  const coil = (x, y) => `<path d="M${x} ${y} c 0 -12 14 -12 14 0 c 0 -12 14 -12 14 0 c 0 -12 14 -12 14 0" />`;
  const cap = (x) => `<path d="M${x} 80 V92 M${x - 11} 92 H${x + 11} M${x - 11} 100 H${x + 11} M${x} 100 V116"/>`;
  return `<svg viewBox="0 0 560 150" role="img" aria-label="Tiefpassfilter: zwei Spulen im Längszweig, drei Kondensatoren gegen Masse"><style>.l{stroke:var(--ink);stroke-width:1.8;fill:none;stroke-linecap:round;stroke-linejoin:round}.t{font:600 12.5px system-ui,sans-serif;fill:var(--ink)}.s{font:11px system-ui,sans-serif;fill:var(--muted)}</style>
<g class="l"><path d="M20 80 H110 M152 80 H258 M300 80 H410 M452 80 H530"/>${coil(110, 80)}${coil(258, 80)}${cap(80)}${cap(205)}${cap(430)}<path d="M80 80 V92 M205 80 V92 M430 80 V92" /><path d="M60 116 H500"/><path d="M80 116 V116 M205 116 V116 M430 116 V116"/></g>
<text class="t" x="20" y="64">vom Sender</text><text class="t" x="500" y="64" text-anchor="end">zur Antenne</text>
<text class="t" x="131" y="62" text-anchor="middle">L</text><text class="t" x="279" y="62" text-anchor="middle">L</text><text class="t" x="80" y="140" text-anchor="middle">C</text><text class="t" x="205" y="140" text-anchor="middle">C</text><text class="t" x="430" y="140" text-anchor="middle">C</text>
<text class="s" x="300" y="140">Spulen im Längszweig sperren hohe Frequenzen, Kondensatoren gegen Masse schließen sie kurz</text></svg>`;
};

export default {
  id: 'unerwuenschte-aussendungen',
  title: 'Unerwünschte Aussendungen und Oberwellen',
  summary: 'Oberwellen, Nebenaussendungen, Übersteuerung, Filter am Sender, Spektrum-Masken.',
  minutes: 20,
  goals: [
    'Erklären, was [[unerwuenschte-aussendung|unerwünschte Aussendungen]] sind, wie sie entstehen und was die AFuV dazu verlangt',
    'Begründen, warum ein sinusförmiges Signal keine [[oberwellen|Oberwellen]] hat und was Übersteuerung bewirkt',
    'Das richtige Filter gegen Oberwellen wählen (Tiefpass zwischen Sender und Antenne) und Filterkennlinien erkennen',
    'Wissen, wo und wann man unerwünschte Aussendungen misst und wie man Splatter und breite FM-Signale vermeidet',
  ],
  needs: ['oszillator-mischer-vervielfacher', 'schwingkreis-und-filter', 'am-ssb-cw'],
  blocks: [
    {
      id: 'intro', type: 'text', title: 'Was ist eine unerwünschte Aussendung?',
      md: `
Dein Sender soll **genau das** abstrahlen, was du senden willst: **ein** Signal in der **erforderlichen Bandbreite**. Alles, was darüber hinausgeht, ist eine **unerwünschte Aussendung**: in der AFuV definiert als *jede Aussendung außerhalb der erforderlichen Bandbreite* (§ 2 Nr. 11), wobei die erforderliche Bandbreite gerade ausreicht, um die Nachricht in der nötigen Geschwindigkeit und Güte zu übertragen.[^afuv]

Woher kommt sie? Wie schon beim Sender gesehen: **Mischer und Verstärker erzeugen neben den gewünschten auch unerwünschte Frequenzanteile.** Gelangen sie an die Antenne, werden sie abgestrahlt, und zwar häufig weit außerhalb der Amateurfunkbänder, in Bereichen des Flugfunks, des Rundfunks oder des Fernsehens, und der Nachbar hat Bildstörungen.[^darc-50ohm]

Die Verordnung ist dabei bemerkenswert knapp: *Unerwünschte Amateurfunk-Aussendungen sind auf das **geringstmögliche Maß** zu beschränken* (§ 16 Abs. 4 AFuV; VD110). Es steht dort **keine** feste dB-Zahl wie „60 dB bezogen auf das Nutzsignal“ oder „40 dB“, und es heißt auch nicht „nicht zulässig“: Perfekte Filter gibt es nicht, ganz vermeiden lässt sich das nicht, also minimiert man. Dem entspricht der Grundsatz in NJ201: Ein Sender sollte so betrieben werden, dass er **keine unerwünschten Aussendungen hervorruft**. Selbsterregung, parasitäre Schwingungen und fehlende Oberwellenabschirmung sind das Gegenteil davon.
`,
    },
    {
      id: 'arten-text', type: 'text', title: 'Zwei Sorten: Oberwellen und Nebenaussendungen',
      md: `
- **Oberwellen** (Harmonische) sind **ganzzahlige Vielfache der Grundfrequenz** $f_0$: $2f_0$, $3f_0$, $4f_0$ …. Sie liegen weit weg vom Nutzsignal, oft in anderen Funkdiensten. Beispiel: Ein Transceiver auf 145,9 MHz strahlt mit der vierfachen Frequenz $4 \\cdot 145{,}9\\,\\text{MHz} = 583{,}6\\,\\text{MHz}$ ab, mitten im Fernsehbereich. Von **Störung** spricht man, wenn solche Anteile so stark abgestrahlt werden, dass zulässige Grenzwerte überschritten werden.
- **Nebenaussendungen** (englisch *spurious emissions*, umgangssprachlich **Splatter** und „Nebenprodukte“) liegen **dicht neben dem Nutzsignal**. Sie betreffen oft andere Funkamateure **auf demselben Band** und lassen sich mit Filtern nur schwer oder gar nicht entfernen: Man muss sie schon **bei der Signalaufbereitung** vermeiden. Typische Ursache: zu hoch eingestellte **Mikrofonverstärkung** oder zu hoher NF-Pegel, wodurch das Sendesignal ungewollt verbreitert wird (Lektion zur Bandbreite).[^darc-50ohm]

Beide haben **dieselbe Wurzel**: Der Sender arbeitet nicht **linear**. Und beide Sorten kannst du mit zwei Grundregeln eindämmen: **Sender nicht übersteuern** (Pegel!) und **Oberwellen filtern**.
`,
    },
    {
      id: 'sinus-text', type: 'text', title: 'Warum ein Sinus keine Oberwellen hat',
      md: `
Ein **sinusförmiges** Signal besteht aus **genau einer** Frequenz. Jede andere Kurvenform enthält zusätzlich Oberwellen: Mathematisch lässt sich jede periodische Schwingung in eine **[Fourier-Reihe](wiki:Fourier-Reihe|Fourier series)** aus Sinusschwingungen der Grundfrequenz und ihrer Vielfachen zerlegen. Je mehr „Ecken und Kanten“ die Kurve hat, desto mehr und desto stärkere Oberwellen. Ein **[Rechteck](wiki:Rechteckschwingung|Square wave (waveform))** ist der Extremfall.

Deshalb gilt (EJ201): **Der Träger einer hochfrequenten Schwingung sollte sinusförmig sein**, um Oberwellenstörungen zu vermeiden; rechteck- oder dreieckförmig wäre falsch, und „kreisförmig“ gibt es als Signalform nicht.

Wie wird ein Sinus zu einer Kurve mit Ecken? Wenn die Endstufe **übersteuert** wird: Die Spitzen werden abgeschnitten, ein Rechteck-Stück entsteht. Dasselbe passiert bei falsch eingestelltem **Arbeitspunkt**: Eine Halbwelle wird stärker beschnitten als die andere. Dann entstehen sogar **gerade** Oberwellen. Eine **Übersteuerung eines Leistungsverstärkers führt zu einem hohen Anteil an Nebenaussendungen** (EJ213). Sie verbessert weder die Verständlichkeit am Empfangsort noch senkt sie die Ausgangsleistung oder macht nur „geringe Verzerrungen beim Empfang“.
`,
    },
    {
      id: 'demo-oberwellen', type: 'viz', viz: 'oberwellen-labor', title: 'Oberwellen-Labor',
      intro: 'Oben siehst du das Signal der Endstufe über eine Periode, unten die aus der Kurve berechneten Oberwellen (in dB bezogen auf die Grundwelle). Übersteuere die Endstufe, verstelle den Arbeitspunkt und schalte ein Filter dahinter. Rot sind die Oberwellen, die in einem anderen Funkdienst landen.',
      task: 'Übersteuere die Endstufe, verstelle den Arbeitspunkt, setze einen Tiefpass dahinter und probiere auch den Hochpass aus.',
    },
    {
      id: 'filter-text', type: 'text', title: 'Das Oberwellenfilter ist ein Tiefpass',
      md: `
Gegen Oberwellen setzt man **zwischen Sender und Antenne** ein **Tiefpassfilter** ein: ein **Oberwellenfilter**. Seine Kennlinie lässt Frequenzen unterhalb einer Grenzfrequenz **nahezu ungedämpft** passieren und schwächt Frequenzen darüber stark ab; die Grundwelle kommt durch, die Oberwellen nicht (EJ202, EJ203, EJ204).[^darc-50ohm]

- **Tiefpassfilter** ist die Antwort, nicht **Hochpass** (würde die Grundwelle sperren und die Oberwellen durchlassen), **CW-Filter**, **NF-Filter**, **ZF-Filter** (Empfängerfilter!), **Nachbarkanalfilter**, **Antennenfilter** oder **Sperrkreisfilter**.
- Bei einem **UHF-Sender** schaltet man ihm ein Tiefpassfilter **nach** (EJ205), nicht eine Bandsperre oder ein Notchfilter vor.
- Das Filter hinter einem **VHF-Sender** soll **den gewünschten Frequenzbereich durchlassen** (NF404), nicht die Oberschwingungen, nicht „alle Nebenaussendungen“ und schon gar nicht den gewünschten Bereich sperren.
- Ein **Tiefpass aus Spulen und Kondensatoren**: **Spulen im Längszweig** (sie sperren hohe Frequenzen), **Kondensatoren gegen Masse** (sie schließen hohe Frequenzen kurz). Das ist die Schaltung, die in EJ206 gesucht wird; beim **Hochpass** wären Kondensatoren und Spulen vertauscht.
- Bei **Mehrband-Sendern** gibt es für jedes Band ein passendes Tiefpassfilter, beim Bandwechsel werden sie umgeschaltet (das „Klicken“ des Relais). Ein **Bandpass** lässt nur ein Band durch und passt deshalb besser zu Einband-Sendern sowie zu Sendern für VHF/UHF/SHF; Oberwellen mit niedrigerer Frequenz als die Sendefrequenz (die im Sender entstehen können) unterdrückt er ebenfalls. Für das Ausgangsfilter eines **KW-Mehrband-Senders** (EJ208) und zur **Verringerung der Oberwellen** eines KW-Senders (EJ207) ist die Tiefpass-Kennlinie die richtige.
`,
    },
    {
      id: 'fig-filter', type: 'figure', title: 'Filterkennlinien erkennen',
      html: filterCurves(),
      caption: 'Oben = Signal kommt durch, unten = gesperrt. Das Oberwellenfilter ist der Tiefpass (links): hohe Frequenzen werden gesperrt. Die Kerbe rechts ist ein Notchfilter, das im Empfänger eine einzelne Störfrequenz entfernt.',
    },
    {
      id: 'fig-lc', type: 'figure', title: 'Tiefpass aus Spulen und Kondensatoren',
      html: lcLowpass(),
      caption: 'Ein Tiefpass 5. Ordnung (Pi-Filter): zwei Spulen im Längszweig, drei Kondensatoren gegen Masse. Ein Oberwellenfilter dieser Art liegt zwischen Sender und Antenne (oder ist im Transceiver bereits eingebaut).',
    },
    {
      id: 'warn-filter', type: 'callout', tone: 'warning', title: 'Welches Filter wofür?',
      md: `
Im Sender: **Tiefpass** gegen **Oberwellen** (nach der Endstufe), **Bandpass** gegen Mischprodukte (nach dem Mischer). Im Empfänger: **ZF-Filter** für die Trennschärfe, **Notchfilter** gegen einen Störträger. Den **Hochpass** brauchst du als Funkamateur vor allem **am Fernsehgerät des Nachbarn**, wenn dessen Antenneneingang durch deinen Kurzwellensender übersteuert wird, nicht am Sender (mehr dazu in der EMV-Lektion).
`,
    },
    {
      id: 'messen-text', type: 'text', title: 'Wo und wann misst man?',
      md: `
Die **Messung der Leistungen, die zu unerwünschten Aussendungen führen**, erfolgt **am Senderausgang unter Einbeziehung eines gegebenenfalls verwendeten Stehwellenmessgeräts und des gegebenenfalls verwendeten Tiefpassfilters** (EJ209), im Gegensatz zur PEP-Messung der Nutzleistung. Dadurch erfasst man genau die Anteile, die auch die Antenne erreichen können. Nicht gemessen wird am Fußpunkt der Antenne unter Einbeziehung des Antennenanpassgeräts oder am Ausgang der Antennenleitung, und auch nicht mit einem hochohmigen HF-Tastkopf an einem Transistorvoltmeter. Das geeignete Messgerät ist ein **[Spektrumanalysator](wiki:Spektrumanalysator|Spectrum analyzer)**, der die Anteile als Linien über der Frequenz zeigt.[^darc-50ohm]

**Wann prüfst du auf Oberwellen?** **Wenn der Arbeitspunkt der Endstufe neu justiert wurde** (EF404): Dann ändert sich die Linearität der Stufe und damit die Oberwellen. Nicht „vor jedem Sendebetrieb“, nicht „bei Empfang eines Störsignals“ und nicht, „wenn Splatter-Störungen zu hören sind“ (Splatter ist eine Nebenaussendung neben dem Signal, keine Oberwelle). Auch nach jeder Änderung des Aufbaus ist die Kontrolle auf Oberwellenarmut sinnvoll.
`,
    },
    {
      id: 'neben-text', type: 'text', title: 'Nebenaussendungen vermeiden: Pegel, Hub, Stabilität',
      md: `
Weil sich Nebenaussendungen schwer filtern lassen, vermeidest du sie an der Quelle:

- **SSB**: Ein SSB-Sender verursacht **Störungen auf benachbarten Frequenzen, wenn der Leistungsverstärker übersteuert wird** (EJ214). Dazu führt eine zu hohe Mikrofonverstärkung: Das **Mikrofonlevel zu verringern** ist das Gegenmittel. Ein unterbrochenes Antennenkabel, ein falsch abgestimmter Tuner oder eine **zu geringe** NF-Ansteuerung erzeugen diesen Fehler nicht (zu wenig NF bringt nur wenig Leistung).
- **FM mit AFSK** (z. B. Packet Radio): Zu große Bandbreite verringerst du durch **Absenken des NF-Pegels oder des Frequenzhubs** (EJ212). Anheben macht es breiter, und an Sendeleistung oder ZF ändert das nichts.
- **Frequenzstabilität**: Ein Sender mit **mangelhafter Frequenzstabilität** (typisch bei älteren Selbstbaugeräten ohne Quarzoszillator) kann **außerhalb der Bandgrenzen** senden oder Nachbarn stören (EJ216); Spannungsüberschläge in der Endstufe, Überlastung der Endstufe oder verstärkte Oberwellen sind keine Folgen davon. Moderne Transceiver haben sehr stabile Referenzoszillatoren.[^darc-50ohm]
`,
    },
    {
      id: 'demo-splatter', type: 'viz', viz: 'mikrofon-pegel', title: 'Splatter durch Übersteuerung',
      params: { goals: ['splatter', 'opt'], gain: 85 },
      intro: 'Wenn die Endstufe übersteuert wird (rote Balken), wachsen die Nebenaussendungen neben dem Nutzband: Die Nachbarstation hört dich „spritzen“. Der Regler ist die Mikrofonverstärkung.',
      task: 'Stelle einmal eine Übersteuerung mit Nachbarstörung ein und danach den Pegel so, dass bei hoher Leistung kein Splatter entsteht.',
    },
    {
      id: 'demo-stoer', type: 'viz', viz: 'sender-blockschaltbild', title: 'Wo entstehen unerwünschte Frequenzen?',
      params: { modes: ['stoer'] },
      intro: 'Im Sender-Blockschaltbild: Tippe die Stufen an, die unerwünschte Frequenzanteile erzeugen können, dann die Filter, die sie beseitigen.',
      task: 'Finde die beiden Erzeuger und die beiden Filter.',
    },
    {
      id: 'mission-aussend', type: 'callout', tone: 'mission', title: 'Funkpraxis: Nachbar meldet Bildstörungen',
      md: `
Wenn jemand meldet, dass dein Sender sein Fernsehbild oder sein Radio stört, ist Oberwelle die erste Verdächtige. Gehe so vor: **Sende mit geringerer Leistung** (sinkt die Störung?), **prüfe den Pegel** (ALC, Mikrofonverstärkung, Übersteuerung?), **setze ein Tiefpassfilter** (Oberwellenfilter) zwischen Sender und Antenne ein und **messe am Senderausgang** einschließlich Filter. Mehr zu Störungen beim Nachbarn in der Lektion zur EMV.
`,
    },
    {
      id: 'calc-oberwelle', type: 'numeric', title: 'Frequenz einer Oberwelle',
      question: 'Ein Kurzwellensender arbeitet auf 3,65 MHz. Auf welcher Frequenz liegt seine 2. Oberwelle? Antwort in MHz.',
      answer: 7.3, tolerance: 0, unit: 'MHz',
      hint: 'Die n-te Oberwelle liegt bei $n \\cdot f_0$ (die Grundwelle ist die 1. Harmonische, die erste *Ober*welle ist die doppelte Frequenz).',
      explain: '$2 \\cdot 3{,}65\\,\\text{MHz} = 7{,}3\\,\\text{MHz}$. Das liegt im 41-m-Rundfunkband (7,2 bis 7,45 MHz): ohne Tiefpass wäre das ein Störsignal im Kurzwellenrundfunk.',
    },
    {
      id: 'calc-vhf', type: 'numeric', title: 'Oberwelle eines 2-m-Senders',
      question: 'Ein 2-m-Sender arbeitet auf 145,9 MHz. Wie hoch ist die Frequenz seiner 3. Harmonischen ($3 \\cdot f_0$)? Antwort in MHz.',
      answer: 437.7, tolerance: 0, unit: 'MHz',
      hint: 'Dreifache Frequenz.',
      explain: '$3 \\cdot 145{,}9 = 437{,}7\\,\\text{MHz}$: mitten im 70-cm-Band. Die 4. Harmonische (583,6 MHz) fällt dagegen in den UHF-Fernsehbereich, wo sie Bildstörungen erzeugen kann.',
    },
    {
      id: 'match-filter', type: 'match', title: 'Filter und Wirkung',
      prompt: 'Ordne jedem Filter seine Wirkung zu.',
      pairs: [
        ['Tiefpass', 'lässt tiefe Frequenzen durch, sperrt hohe: gegen Oberwellen'],
        ['Hochpass', 'lässt hohe Frequenzen durch, sperrt tiefe'],
        ['Bandpass', 'lässt nur ein Frequenzband durch'],
        ['Notchfilter', 'sperrt nur eine schmale Frequenz (Kerbe)'],
      ],
    },
    {
      id: 'quiz-ursachen', type: 'quiz', title: 'Ursachen unerwünschter Aussendungen',
      question: 'Welche Aussagen sind richtig? (Mehrfachauswahl)',
      options: [
        { text: 'Die Übersteuerung eines Leistungsverstärkers führt zu einem hohen Anteil an Nebenaussendungen.', correct: true, why: 'Das Signal wird beschnitten, es entstehen Oberwellen und breite Seitenbänder.' },
        { text: 'Zwischen Senderausgang und Antenne gehört ein Tiefpassfilter, um Oberwellen zu verringern.', correct: true, why: 'Tiefpass: Grundwelle durch, Oberwellen gesperrt.' },
        { text: 'Unerwünschte Aussendungen sind auf das geringstmögliche Maß zu beschränken.', correct: true, why: 'So steht es in § 16 Abs. 4 AFuV; eine feste dB-Zahl nennt die Verordnung dort nicht.' },
        { text: 'Mit einem Hochpassfilter hinter dem Sender werden Oberwellen unterdrückt.', correct: false, why: 'Ein Hochpass sperrt tiefe, nicht hohe Frequenzen: Er dämpft die Grundwelle und lässt die Oberwellen durch.' },
        { text: 'Ein SSB-Sender stört auf Nachbarfrequenzen, wenn die NF-Ansteuerung zu gering ist.', correct: false, why: 'Zu geringe Ansteuerung bringt nur wenig Leistung. Störungen kommen von zu hoher Ansteuerung.' },
      ],
    },
    {
      id: 'order-signal', type: 'order', title: 'Sendersignal sauber halten',
      prompt: 'Ordne die Stufen eines Senders so, wie das Signal sie durchläuft; achte darauf, wo die Filter sitzen.',
      items: ['NF-Verstärker', 'Mischer (mit HF-Oszillator)', 'Bandpassfilter: sperrt Mischprodukte', 'HF-Leistungsverstärker', 'Tiefpassfilter: sperrt Oberwellen', 'Antenne'],
      explain: 'Hinter jeder Stufe, die nichtlinear arbeitet (Mischer, Leistungsverstärker), steht ein Filter, das ihre unerwünschten Anteile beseitigt.',
    },
    {
      id: 'recall-uaus', type: 'recall', title: 'In eigenen Worten',
      prompt: 'Erkläre, wie Oberwellen entstehen, warum ein Tiefpass zwischen Sender und Antenne hilft und warum Splatter ein anderes Problem ist.',
      answer: 'Oberwellen sind ganzzahlige Vielfache der Grundfrequenz. Sie entstehen, wenn das Sendesignal nicht sinusförmig ist, zum Beispiel weil die Endstufe übersteuert oder ihr Arbeitspunkt falsch eingestellt ist; jede Abweichung vom Sinus enthält Oberwellen. Ein Tiefpass zwischen Sender und Antenne lässt die Grundwelle durch und sperrt alle höheren Frequenzen, also die Oberwellen; ein Hochpass würde das Falsche sperren. Splatter sind Nebenaussendungen dicht neben dem Nutzsignal, verursacht durch zu hohe NF-Aussteuerung bzw. Übersteuerung; sie lassen sich mit Filtern kaum beseitigen und müssen deshalb durch den richtigen Pegel (Mikrofonverstärkung, Hub) vermieden werden.',
      hints: ['Wo entsteht aus dem Sinus eine Kurve mit Ecken?', 'Ist Splatter weit weg oder dicht am Nutzsignal?'],
      cards: ['oberwellen-def', 'tiefpass-oberwellen', 'splatter-def'],
    },
  ],
  cards: [
    { id: 'uaus-def', front: 'Was sagt die AFuV über unerwünschte Aussendungen?', back: 'Sie sind auf das geringstmögliche Maß zu beschränken (§ 16 Abs. 4); keine feste dB-Zahl, nicht pauschal verboten. Definition § 2 Nr. 11: Aussendung außerhalb der erforderlichen Bandbreite.' },
    { id: 'oberwellen-def', front: 'Was sind Oberwellen?', back: 'Ganzzahlige Vielfache der Grundfrequenz (2f₀, 3f₀ …). Sie entstehen, wenn das Signal nicht sinusförmig ist, z. B. bei Übersteuerung. Beispiel: 4 · 145,9 MHz = 583,6 MHz.' },
    { id: 'sinus-traeger', front: 'Welche Signalform sollte der Träger haben, um Oberwellen zu vermeiden?', back: 'Sinusförmig (ein Sinus enthält nur die Grundfrequenz).' },
    { id: 'tiefpass-oberwellen', front: 'Welches Filter reduziert Oberwellen am Sender?', back: 'Ein Tiefpass zwischen Sender (Transceiver) und Antenne (Oberwellenfilter). Kennlinie: tiefe Frequenzen durch, hohe gesperrt.' },
    { id: 'tiefpass-schaltung', front: 'Wie ist ein LC-Tiefpass aufgebaut?', back: 'Spulen im Längszweig, Kondensatoren gegen Masse.' },
    { id: 'mehrband-filter', front: 'Ausgangsfilter eines Mehrband-Senders?', back: 'Tiefpassfilter, beim Bandwechsel umgeschaltet (Relais). Bandpass eher bei Einband-Sendern und VHF/UHF/SHF.' },
    { id: 'filter-vhf', front: 'Welche Eigenschaft hat ein Filter hinter einem VHF-Sender?', back: 'Es lässt den gewünschten Frequenzbereich durch (und sperrt Oberwellen und Nebenaussendungen).' },
    { id: 'uebersteuerung-folge', front: 'Folge der Übersteuerung eines Leistungsverstärkers?', back: 'Hoher Anteil an Nebenaussendungen (Oberwellen, Splatter). SSB-Sender stört auf Nachbarfrequenzen, wenn der Leistungsverstärker übersteuert wird.' },
    { id: 'splatter-def', front: 'Was ist Splatter und wie vermeidest du ihn?', back: 'Nebenaussendungen dicht neben dem Nutzsignal durch Übersteuerung (zu hohe Mikrofonverstärkung/NF-Pegel). Mit Filtern kaum zu entfernen, daher Pegel verringern.' },
    { id: 'afsk-fm-bandbreite', front: 'AFSK auf FM-Sender: Bandbreite verringern?', back: 'NF-Pegel oder Frequenzhub absenken.' },
    { id: 'uaus-messung', front: 'Wo misst man unerwünschte Aussendungen?', back: 'Am Senderausgang unter Einbeziehung eines evtl. verwendeten SWR-Messgeräts und Tiefpassfilters; Messgerät: Spektrumanalysator.' },
    { id: 'oberwellen-pruefen', front: 'Wann prüft man auf Oberwellen?', back: 'Wenn der Arbeitspunkt der Endstufe neu justiert wurde (und nach Änderungen am Aufbau).' },
    { id: 'frequenzstabilitaet', front: 'Folge mangelhafter Frequenzstabilität eines Senders?', back: 'Aussendungen außerhalb der Bandgrenzen.' },
  ],
};
