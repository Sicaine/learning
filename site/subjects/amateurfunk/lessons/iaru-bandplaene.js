const th = c => `<th style="text-align:left;padding:5px 8px;border-bottom:2px solid var(--line)">${c}</th>`;
const td = c => `<td style="padding:4px 8px;border-bottom:1px solid var(--line);vertical-align:top">${c}</td>`;
const tbl = (head, rows) => `<div style="overflow-x:auto"><table style="border-collapse:collapse;width:100%;font-size:.88rem"><thead><tr>${head.map(th).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(td).join('')}</tr>`).join('')}</tbody></table></div>`;
const T2 = tbl(['MHz', 'Nutzung', 'Besonderheit'], [
  ['144,025–144,150', 'Telegrafie (CW), schmalbandige Digitalverfahren', '144,050 CW-Anruf'],
  ['144,150–144,400', '<b>SSB</b>, Telegrafie, MGM', '<b>144,300 SSB-Aktivitätszentrum</b>'],
  ['144,400–144,490', '<b>Baken</b> (exklusiv)', ''],
  ['144,500–144,794', 'alle Betriebsarten', '144,500 Bilder, 144,600 Daten'],
  ['144,794–144,975', 'digitale Kommunikation', '144,800 [APRS](wiki:APRS|Automatic Packet Reporting System)'],
  ['144,975–145,194', 'FM/Digital Voice', '<b>Relais-Eingabe</b>'],
  ['145,194–145,206', 'Weltraumkommunikation', ''],
  ['145,206–145,5625', '<b>FM und Digital Voice</b> (Direktverkehr)', '<b>145,375 DV-Anruf</b>, <b>145,500 FM-Anruf</b>'],
  ['145,575–145,794', 'FM/Digital Voice', '<b>Relais-Ausgabe</b>'],
  ['145,794–145,806', 'Weltraumkommunikation', '145,800'],
  ['145,806–146,000', 'Satelliten (exklusiv)', ''],
]);
const T70 = tbl(['MHz', 'Nutzung', 'Besonderheit'], [
  ['432,000–432,400', 'alle Betriebsarten (≤ 2,7 kHz)', '432,050 CW, <b>432,200 SSB-Aktivitätszentrum</b>'],
  ['432,400–432,490', '<b>Baken</b> (exklusiv)', ''],
  ['432,500–432,975', 'alle Betriebsarten', '432,500 APRS; ab 432,600 Relais-Eingabe'],
  ['433,000–433,400', 'FM/Digital Voice', 'Relais-Eingabe (1,6 MHz Ablage)'],
  ['433,400–433,600', '<b>FM/Digital Voice</b>, Simplex', '<b>433,450 DV-Anruf</b>, <b>433,500 FM-Anruf</b>'],
  ['433,625–433,775', 'digitale Kommunikation', ''],
  ['434,600–434,985', 'Relais-Ausgabe', '12,5-kHz-Raster'],
  ['435–438', '<b>Satelliten</b>', ''],
  ['438,650–439,5875', 'Relais-Ausgabe', '7,6 MHz Ablage'],
]);
export default {
  id: 'iaru-bandplaene',
  title: 'IARU-Bandpläne für 2 m und 70 cm',
  summary: 'Anrufkanäle, SSB-/FM-/Digital-Segmente, Baken und Relaisbereiche – die Bandplan-Auszüge liegen in der Prüfung als Hilfsmittel aus.',
  minutes: 20,
  goals: [
    'Erklären, was ein Bandplan ist und wie verbindlich er ist (Empfehlung, kein Gesetz)',
    'Anruffrequenzen und Aktivitätszentren auf 2 m und 70 cm nennen (FM, Digital Voice, SSB)',
    'Aus einer Frequenz das Segment ableiten (CW, SSB, Baken, Relais, Satellit, Weltraum) und eine Frequenz für eine FM- oder SSB-Verbindung wählen',
    'Begründen, warum auf Relais-, Baken- und Satellitenfrequenzen keine Direktverbindungen geführt werden',
  ],
  needs: ['frequenzzuteilung-und-baender', 'erste-verbindung'],
  blocks: [
    {
      id: 'intro', type: 'text', title: 'Ordnung auf dem Band: der Bandplan',
      md: `
Wie auf einer Straße mit Fahrspuren sorgt ein **[Bandplan](wiki:Bandplan|Frequency plan)** dafür, dass nicht jeder überall alles sendet: Er teilt jedes Band in **Segmente** mit **bevorzugten Betriebsarten** auf. Herausgegeben wird er von der **[IARU](wiki:International Amateur Radio Union|International Amateur Radio Union)** (International Amateur Radio Union), in der die nationalen Amateurfunkverbände zusammengeschlossen sind — in Deutschland ist das der DARC. Für Europa gilt die **Region 1**.[^darc-50ohm]

**Wichtig:** Die IARU-Bandpläne sind **Empfehlungen**, keine Gesetze. Sie sollen allen Funkamateuren zugutekommen; amtlich vorgeschrieben sind nur die Bedingungen der **Anlage 1**. Aber: Wer sie missachtet, stört die anderen — und fällt auf. Falsch ist, dass Bandpläne „in Regionen mit hoher Funkamateurdichte“, für „unbesetzte und automatisch arbeitende Stationen“ oder „im internationalen Funkverkehr“ verbindlich wären.[^iaru-r1-vhf-handbook]

In der Prüfung liegen **Auszüge aus den Bandplänen für 2 m und 70 cm** aus — du musst sie also nicht auswendig lernen, aber lesen können und die wichtigsten Frequenzen kennen.
`,
    },
    {
      id: 'text-aufbau', type: 'text', title: 'Wie ein Bandplan aufgebaut ist',
      md: `
In einem Bandplan stehen je Segment der **Frequenzbereich**, die **maximale Bandbreite** und die **bevorzugte Betriebsart** — dazu die **Nutzung** (zum Beispiel Baken, Relais, Satelliten). Zwei Grundregeln gelten fast überall:

1. **[Telegrafie](wiki:Telegrafie|Telegraphy) (CW) liegt am Bandanfang.** Die schmalen Telegrafiesignale kommen mit wenig Platz aus; deshalb liegt der CW-Bereich am **unteren Bandende** — nicht in der Mitte oder oben. Das gilt auf fast allen Bändern, bis auf wenige Ausnahmen.
2. **Schmalbandig unten, breitbandig oben:** Auf 2 m folgt auf CW/MGM (digitale Schmalbandverfahren) das [**SSB**](wiki:Einseitenbandmodulation|Single-sideband modulation)-Segment, dann Baken, „alle Betriebsarten“, digitale Verfahren und schließlich **[FM](wiki:Frequenzmodulation|Frequency modulation)/Digital Voice** mit den Relais; ganz oben [Satelliten](wiki:Amateurfunksatellit|Amateur radio satellite).

**Anruffrequenz oder Aktivitätszentrum?** Auf einer **Anruffrequenz** (englisch *calling*) rufst du CQ — und gehst nach dem Zustandekommen der Verbindung **sofort auf eine andere Frequenz** (QSY), damit sie für Anrufe frei bleibt. Ein **Aktivitätszentrum** (*center of activity*) ist dagegen keine Anruffrequenz: Dort sammeln sich die SSB-Stationen, **Anrufe sind im ganzen Umfeld** erlaubt, die Frequenz muss nicht freigehalten werden. Für ein SSB-QSO darfst du den ganzen als „SSB“ gekennzeichneten Bereich nutzen.[^iaru-r1-vhf-bandplan]

Für **besondere Anwendungen** sind **eigene Bereiche** reserviert: Satelliten-Up- und Downlink, [Baken](wiki:Funkbake|Electric beacon#Radio beacons), Relaisfunkstellen (Eingabe und Ausgabe), Weltraumkommunikation, Telegrafie. Diese sollten für die vorgesehenen Anwendungen **frei bleiben** — du führst dort keine Direktverbindung mit dem Nachbarort.
`,
    },
    {
      id: 'fig-2m', type: 'text', title: 'Der 2-m-Bandplan (144–146 MHz) im Überblick',
      md: `
${T2}

Die Tabelle fasst die **IARU-Region-1-Fassung vom Dezember 2020** zusammen (nur die für dich relevanten Segmente); der amtliche Auszug in der Prüfung kann in Details abweichen — dort gilt, was auf deinem Blatt steht.[^iaru-r1-vhf-bandplan]

**Merke dir die Anker:** **145,500** FM-Anruf, **145,375** Anruf für digitale Telefonie (Digital Voice), **144,300** SSB-Aktivitätszentrum, **144,050** Telegrafie-Anruf; Baken bei **144,4–144,49**, **Relais** darunter (Eingabe 144,975–145,194) und darüber (Ausgabe 145,575–145,794), **Satelliten und Weltraum** bei **145,8** — das sind genau die Frequenzen, die in den Prüfungsfragen vorkommen.
`,
    },
    {
      id: 'fig-70', type: 'text', title: 'Der 70-cm-Bandplan (430–440 MHz) im Überblick',
      md: `
${T70}

Im 70-cm-Band liegen die Anker bei **433,500** (FM-Anruf), **433,450** (Digital-Voice-Anruf) und **432,200** (SSB-Aktivitätszentrum); die Baken bei **432,4–432,49**, der Satellitenbereich bei **435–438 MHz**. Die Relais-Ausgaben liegen oberhalb (434,6–435 und 438,65–439,6 MHz) mit **7,6 MHz** Ablage (dazu in der Lektion über Relais mehr).[^iaru-r1-vhf-handbook]
`,
    },
    {
      id: 'viz-bandplan', type: 'viz', viz: 'bandplan-explorer', title: 'Bandplan-Explorer',
      params: {},
      task: 'Finde **145,500 MHz** (FM-Anruf), **144,300 MHz** (SSB), ein **Bakensegment** und ein **Relais-Ausgabesegment** auf 2 m, die Weltraumkommunikation bei **145,8 MHz** und **433,500 MHz** auf 70 cm.',
      caption: 'Klicke in die farbige Leiste oder benutze Regler und Knöpfe. Die Segmente sind vereinfacht zusammengefasst.',
    },
    {
      id: 'match-freq', type: 'match', title: 'Frequenz und Nutzung',
      prompt: 'Ordne zu: Wofür sieht der IARU-Bandplan diese Frequenz vor?',
      pairs: [
        ['145,500 MHz', 'FM-Anruf (2 m)'],
        ['145,375 MHz', 'Anruf für digitale Telefonie (2 m)'],
        ['144,300 MHz', 'SSB-Aktivitätszentrum (2 m)'],
        ['433,500 MHz', 'FM-Anruf (70 cm)'],
        ['433,450 MHz', 'Anruf für digitale Telefonie (70 cm)'],
        ['432,200 MHz', 'SSB-Aktivitätszentrum (70 cm)'],
      ],
    },
    {
      id: 'text-direkt', type: 'text', title: 'Wo führe ich eine Direktverbindung?',
      md: `
Die Prüfungsfragen stellen immer wieder dieselbe Frage in Varianten: *„Warum solltest du auf Frequenz X keine FM-Direktverbindung zum Nachbarort führen?“* Die Antwort liefert der Bandplan — das Segment ist für etwas anderes reserviert:

<div style="overflow-x:auto"><table style="border-collapse:collapse;width:100%;font-size:.88rem"><thead><tr>${th('Frequenz')}${th('Segment')}${th('Wofür reserviert')}</tr></thead><tbody>
<tr>${td('144,075 MHz')}${td('2 m')}${td('Morsetelegrafie (RTTY, PSK31, FT8 gehören hier <b>nicht</b> hin)')}</tr>
<tr>${td('144,125 MHz')}${td('2 m')}${td('Morsetelegrafie und schmalbandige digitale Übertragungsverfahren')}</tr>
<tr>${td('144,450 MHz')}${td('2 m')}${td('<b>Baken</b> (exklusiv)')}</tr>
<tr>${td('145,600 MHz')}${td('2 m')}${td('<b>Relais</b> (Ausgabe)')}</tr>
<tr>${td('145,800 MHz')}${td('2 m')}${td('<b>Weltraumkommunikation</b> / Satelliten')}</tr>
<tr>${td('432,040 MHz')}${td('70 cm')}${td('Morsetelegrafie und schmalbandige digitale Verfahren')}</tr>
<tr>${td('432,450 MHz')}${td('70 cm')}${td('<b>Baken</b> (exklusiv)')}</tr>
<tr>${td('435,500 MHz')}${td('70 cm')}${td('<b>Satellitenfunk</b>')}</tr>
<tr>${td('439,200 MHz')}${td('70 cm')}${td('<b>Relais</b> (Ausgabe)')}</tr></tbody></table></div>

Geeignet für FM-Telefonie mit dem Nachbarort ist dagegen das **FM/Digital-Voice-Segment** (2 m: 145,206–145,5625 MHz, zum Beispiel **145,450 MHz**; 70 cm: 433,400–433,600 MHz). Für SSB-Telefonie nimmst du das SSB-Segment (2 m: 144,150–144,400 MHz, zum Beispiel **144,310 MHz**). Ungeeignet wären 145,450 MHz (FM-Segment), 144,800 MHz (APRS und Digitalverfahren) und 144,450 MHz (Baken).

Und warum nicht Digitalverfahren auf **144,075 MHz**? Weil der Bandplan dort **Morsetelegrafie** bevorzugt; auch „maximal 500 Hz Bandbreite“ oder „Computer vermeiden“ ist nicht der Grund. Die Baken (144,400–144,490 MHz) sind **exklusiv** reserviert — Faustregel: Sende nie in ein Bakensegment, denn mit den Baken beobachten andere die Ausbreitung.
`,
    },
    {
      id: 'quiz-bandplan', type: 'quiz', title: 'Bandplan verstehen',
      question: 'Welche Aussagen sind richtig? (Mehrfachauswahl)',
      options: [
        { text: 'IARU-Bandpläne sind Empfehlungen, deren Einhaltung allen Funkamateuren zugutekommt.', correct: true, why: 'Sie sind nicht amtlich vorgeschrieben.' },
        { text: 'Der empfohlene Bereich für Morsetelegrafie liegt üblicherweise am Bandanfang.', correct: true, why: 'Schmale Signale unten — Ausnahmen sind selten.' },
        { text: 'Auf 145,500 MHz rufst du CQ in FM — und wechselst nach dem Verbindungsaufbau die Frequenz.', correct: true, why: 'Anruffrequenzen werden für Anrufe freigehalten.' },
        { text: '144,300 MHz ist die FM-Anruffrequenz des 2-m-Bandes.', correct: false, why: 'Das ist das SSB-Aktivitätszentrum; FM-Anruf ist 145,500 MHz.' },
        { text: 'Für unbesetzte, automatisch arbeitende Stationen sind die Bandpläne amtlich vorgeschrieben.', correct: false, why: 'Auch dort sind sie Empfehlungen (Rufzeichenzuteilung und Anlage 1 regeln die rechtlichen Vorgaben).' },
        { text: 'Auf 145,800 MHz führst du am besten eine FM-Direktverbindung mit dem Nachbarort.', correct: false, why: 'Das Segment ist der Weltraumkommunikation vorbehalten (ISS, Satelliten).' },
      ],
    },
    {
      id: 'num-fm', type: 'numeric', title: 'Kanalabstand rechnen',
      question: 'Ein FM-Relais auf 2 m hat die Ausgabefrequenz 145,6875 MHz und die Ablage −600 kHz. Auf welcher Frequenz in MHz sendest du, um es zu erreichen (Eingabefrequenz)?',
      answer: 145.0875, tolerance: 0.00001, unit: 'MHz',
      explain: '$145{,}6875\\,\\text{MHz} - 0{,}600\\,\\text{MHz} = 145{,}0875\\,\\text{MHz}$ — das liegt im Segment der Relais-Eingabe (144,975–145,194 MHz). Mehr zu Relais in der Etappe „Betriebstechnik“.',
    },
    {
      id: 'mission', type: 'callout', tone: 'mission', title: 'Funkpraxis: So wählst du eine Frequenz',
      md: `
1. **Anrufen** auf der Anruffrequenz (145,500 MHz FM oder 433,500 MHz) — oder zuerst die SSB-Region um 144,300 / 432,200 MHz abhören.
2. Gegenstation antwortet → **QSY** in den FM/Digital-Voice-Bereich (zum Beispiel 145,450 oder 145,425 MHz).
3. **Nicht** auf Bakenfrequenzen (144,4–144,49) oder 145,8 (Weltraum), nicht auf Relais-Frequenzen ohne Relais-Absicht.

*Prüfungsbezug:* BC201, BC204–BC222 (Bandplan 2 m und 70 cm).
`,
    },
    {
      id: 'recall', type: 'recall', title: 'Mit eigenen Worten',
      prompt: 'Du willst auf 2 m ein QSO in FM und ein anderes in SSB führen. Welche Frequenz benutzt du jeweils zum Anrufen, wohin wechselst du danach — und warum nicht auf 144,450 oder 145,800 MHz?',
      answer: 'FM: Anruf auf 145,500 MHz, dann QSY in den FM/Digital-Voice-Bereich (145,206–145,5625 MHz, z. B. 145,450). SSB: Aktivitätszentrum 144,300 MHz — Anrufe im SSB-Segment (144,150–144,400), keine Frequenz freihalten. 144,450 MHz liegt im exklusiven Bakensegment, 145,800 MHz in der Weltraumkommunikation/Satelliten — dort keine Direktverbindungen mit dem Nachbarort. Bandpläne sind Empfehlungen, aber alle richten sich danach.',
      hints: ['FM calling / center of activity', 'Baken und Weltraum sind exklusiv'],
      cards: ['anrufe-2m', 'segmente-2m'],
    },
  ],
  cards: [
    { id: 'bp-verbindlich', front: 'Wie verbindlich sind die IARU-Bandpläne?', back: 'Sie sind eine Empfehlung, deren Einhaltung allen Funkamateuren zugutekommt — keine gesetzliche Vorschrift.' },
    { id: 'cw-bandanfang', front: 'Wo empfiehlt der Bandplan üblicherweise die Morsetelegrafie?', back: 'Am Bandanfang.' },
    { id: 'anrufe-2m', front: 'Anruffrequenzen 2 m: FM, digital, SSB?', back: 'FM: 145,500 MHz. Digital Voice: 145,375 MHz. SSB: Aktivitätszentrum 144,300 MHz (keine Anruffrequenz).' },
    { id: 'anrufe-70', front: 'Anruffrequenzen 70 cm: FM, digital, SSB?', back: 'FM: 433,500 MHz. Digital Voice: 433,450 MHz. SSB: Aktivitätszentrum 432,200 MHz.' },
    { id: 'calling-vs-center', front: 'Anruffrequenz vs. Aktivitätszentrum?', back: 'Anruffrequenz: für Anrufe freihalten, danach QSY. Aktivitätszentrum: Anrufe im ganzen Umfeld, nicht freihalten.' },
    { id: 'segmente-2m', front: '2-m-Bandplan: Segmente von unten nach oben?', back: 'CW/MGM (144,025–144,150) → SSB (–144,4) → Baken (144,4–144,49) → alle Betriebsarten → Digital (144,8 APRS) → Relais-Eingabe → FM/DV-Simplex (145,5) → Relais-Ausgabe → Weltraum 145,8 → Satelliten.' },
    { id: 'baken', front: 'Wo liegen die Baken auf 2 m und 70 cm?', back: '2 m: 144,400–144,490 MHz; 70 cm: 432,400–432,490 MHz (exklusiv).' },
    { id: 'weltraum', front: 'Weltraumkommunikation/Satelliten?', back: '2 m: 145,794–145,806 (145,8) und 145,806–146 Satelliten; 70 cm: 435–438 MHz.' },
    { id: 'relais-bp', front: 'Relais im 2-m-Bandplan?', back: 'Eingabe 144,975–145,194 MHz, Ausgabe 145,575–145,794 MHz (z. B. 145,600).' },
    { id: 'rep-70', front: 'Relais im 70-cm-Bandplan?', back: 'Ausgabe z. B. 439,200 MHz (438,65–439,5875) und 434,6–434,9875 MHz; Eingabe 431,05–431,9875 sowie 433,000–433,3875 MHz.' },
    { id: 'direkt-fm', front: 'Wohin mit einer FM-Direktverbindung zum Nachbarort (2 m)?', back: 'In den FM/Digital-Voice-Bereich 145,206–145,5625 MHz (z. B. 145,450 MHz) — nicht in Baken-, Relais-, Weltraum- oder CW-Segmente.' },
    { id: 'ssb-2m', front: 'SSB auf 2 m: wo?', back: 'SSB-Segment 144,150–144,400 MHz, z. B. 144,310 MHz; Aktivitätszentrum 144,300.' },
  ],
};
