export default {
  id: 'erste-verbindung',
  title: 'Die erste Verbindung: Anruf, Betriebsabwicklung, RST',
  summary: 'CQ rufen, antworten, Rapport (RST) geben; offene Sprache, Funkverkehr nur mit Funkamateuren und das Verbot geschäftsmäßiger Nutzung.',
  minutes: 25,
  goals: [
    'Eine Verbindung sauber beginnen, führen und beenden: Frequenz prüfen, CQ, Antwort, Frequenzwechsel',
    'Den [[rst-system|RST-Rapport]] geben und das [[s-meter]] richtig ablesen (59, 59+20 dB)',
    'Die Grundregeln des Funkverkehrs nennen: offene Sprache, nur mit Amateurfunkstellen, nicht gewerblich, keine Nachrichten an Dritte',
    'Einfache Längen- und Verhältnisrechnungen (Dreisatz) für Drahtantennen ausführen',
  ],
  needs: ['was-ist-amateurfunk', 'buchstabiertafel-und-rufzeichen'],
  blocks: [
    {
      id: 'intro', type: 'text', title: 'Was darf jeder — und was nur der Funkamateur?',
      md: `
Jeder darf [Funkgeräte](wiki:Funkgerät|Two-way radio) für den Amateurfunk **kaufen und besitzen**, eine Antenne aufbauen (solange Bau- und Sicherheitsvorschriften beachtet werden) und **Amateurfunk empfangen**. Dafür brauchst du **keine Zulassung**, kein „Hörerrufzeichen aus der DE-Reihe“, keine Mitgliedschaft in einem Verein und kein besonders zugelassenes Empfangsgerät.[^darc-50ohm] Erst das **Senden** auf Amateurfunkfrequenzen ist den Funkamateuren mit Zulassung vorbehalten.

Praktisch heißt das: Der [Sendeempfänger](wiki:Sendeempfänger|Transceiver) (englisch *Transceiver*, aus *Transmitter* und *Receiver*) steht normalerweise auf **Empfang**. Gesendet wird erst, wenn du die **PTT-Taste** drückst und gedrückt hältst — [**P**ush **T**o **T**alk](wiki:Push-to-talk|Push-to-talk), meist am Mikrofon. Loslassen, und das Gerät hört wieder zu.[^darc-50ohm] Verwechsle PTT nicht mit **VOX** (Sprachsteuerung, schaltet von selbst), **RIT** (Empfangsfeinabstimmung) oder **SSB** (einer Sendeart).

In dieser Lektion führst du dein erstes QSO — erst als Simulation, dann im Kopf.
`,
    },
    {
      id: 'fig-display', type: 'figure', title: 'So sieht der Bildschirm eines Transceivers aus',
      html: `<svg viewBox="0 0 560 250" role="img" aria-label="Schematisches Display eines Funkgerätes im Empfang: 1 Frequenzanzeige, 2 S-Meter, 3 Amplitudenspektrum, 4 Wasserfalldiagramm">
<style>.a{font:600 12px system-ui,sans-serif;fill:var(--ink)}.n{font:700 13px system-ui,sans-serif;fill:#fff}.s{font:11px system-ui,sans-serif;fill:var(--muted)}</style>
<rect x="8" y="8" width="544" height="234" rx="14" fill="#1d2430" stroke="var(--line-2)"/>
<text x="24" y="42" font-family="ui-monospace,monospace" font-size="26" font-weight="700" fill="#9fe5ff">145.500.00</text><text x="190" y="42" font-family="ui-monospace,monospace" font-size="13" fill="#9fe5ff">MHz  FM</text>
<g><rect x="360" y="20" width="176" height="34" rx="6" fill="#0f141b" stroke="#415066"/>
<text x="368" y="48" font-family="ui-monospace,monospace" font-size="10" fill="#9fb2c8">S 1 3 5 7 9</text><text x="470" y="48" font-family="ui-monospace,monospace" font-size="10" fill="#ff8a7a">+20 +40</text><rect x="368" y="28" width="86" height="7" fill="#7be08a"/></g>
<g><path d="M24 150 L60 148 L80 100 L96 150 L180 146 L200 90 L220 146 L300 148 L330 128 L350 148 L536 150" fill="none" stroke="#ffd36a" stroke-width="1.6"/><line x1="24" y1="150" x2="536" y2="150" stroke="#415066"/></g>
<g><rect x="24" y="160" width="512" height="70" fill="#0b2540"/><g fill="#2f8fd8" fill-opacity=".8"><rect x="80" y="160" width="6" height="70"/><rect x="198" y="160" width="6" height="40"/></g><g fill="#ffd36a" fill-opacity=".8"><rect x="198" y="200" width="6" height="30"/></g></g>
<circle cx="24" cy="26" r="9" fill="var(--accent)"/><text class="n" x="20" y="31">1</text>
<circle cx="350" cy="30" r="9" fill="var(--accent)"/><text class="n" x="346" y="35">2</text>
<circle cx="30" cy="88" r="9" fill="var(--accent)"/><text class="n" x="26" y="93">3</text>
<circle cx="30" cy="188" r="9" fill="var(--accent)"/><text class="n" x="26" y="193">4</text>
<text class="s" x="24" y="78">1 Frequenz · 2 S-Meter (Empfangspegel) · 3 Amplitudenspektrum · 4 Wasserfalldiagramm</text>
</svg>`,
      caption: 'Schematisch. **S-Meter**: Anzeige des **Empfangspegels** (nicht der Sendeleistung, nicht der Lautstärke). **Amplitudenspektrum** und **Wasserfall** zeigen, was auf den Nachbarfrequenzen los ist — dazu mehr in der Lektion über Wellenlänge und Spektrum.',
    },
    {
      id: 'text-anruf', type: 'text', title: 'Eine Verbindung beginnen',
      md: `
Im Amateurfunk gibt es **keinen vorgeschriebenen Ablauf** — nur das Rufzeichen muss ordnungsgemäß genannt werden. Trotzdem hat sich eine übliche **Betriebsabwicklung** herausgebildet, und die wird geprüft, weil alle Funkamateure die Frequenzen **gemeinsam** nutzen: Es gilt „wer zuerst kommt, mahlt zuerst“.[^darc-50ohm]

**1. Erst hören, dann fragen.** Bevor du ein [QSO](wiki:Funkverkehr|Radio communication) beginnst, hörst du eine Weile zu. Findest du eine Frequenz ohne Signale, fragst du **zwei- bis dreimal**, ob sie frei ist („*Ist die Frequenz frei? DL1PZ*“). Erst wenn nichts kommt, rufst du CQ. Warum so vorsichtig? Eine Station, die du nicht hörst (zum Beispiel weil sie in der anderen Richtung sendet oder die Gegenstation sehr leise ist), belegt die Frequenz trotzdem.

**2. Anruf.** Der **allgemeine Anruf** heißt **CQ** (englisch ausgesprochen „seek you“ = „suche dich“) und wendet sich an **alle**, die dich hören; im deutschen Funkverkehr ist auch die Floskel „allgemeiner Anruf“ üblich. Der **gezielte Anruf** richtet sich an eine bestimmte Station. Beides beginnt mit dem Rufzeichen — die Antwort auf einen allgemeinen Anruf ebenfalls. **Nicht** in den Anruf gehören QRZ? (heißt „von wem werde ich gerufen?“), QTH (mein Standort) oder QSL (Empfangsbestätigung), und der **1750-Hz-Auftastton** öffnet Relais, er ersetzt keinen Anruf.

**3. Antwort.** Du nennst das **Rufzeichen der rufenden Station einmal**, dann „hier ist …“ und dein **eigenes Rufzeichen** (buchstabiert), „bitte kommen“. Mehrmaliges Wiederholen hilft nicht.

**4. Teilweise verstanden?** Hörst du nur Bruchstücke, etwa „… 7 Romeo Whiskey“ und dein Rufzeichen ist DH7RW, antwortest du mit der Rückfrage: „*Hier ist DH7RW, wurde ich gerufen?*“. Du bittest nicht um QSL oder QSY und träumst auch nicht von „7R“ (das ist Algerien — ein Präfix, kein Treffer).

**5. Ende.** Nach dem QSO bleibt die **Frequenz bei der Station, die den Anruf gestartet hat**. Ruft dich in der Zwischenzeit eine andere Station, verständigst du dich mit ihr auf eine **andere Frequenz** und führst das QSO dort weiter. Das gilt besonders für **Anruffrequenzen** (zum Beispiel 145,500 MHz auf 2 m, dazu später mehr), die frei bleiben sollen: Nach dem Anruf geht es per **QSY** („Frequenzwechsel“) auf eine andere Frequenz.
`,
    },
    {
      id: 'warn-anruf', type: 'callout', tone: 'warning', title: 'Typische Fehlvorstellungen zum Anruf',
      md: `
- „Auf einer leeren Frequenz kann ich sofort CQ rufen.“ — Du musst nachfragen (zwei- bis dreimal), ob die Frequenz frei ist.
- „Bei schlechter Ausbreitung rufe ich häufiger CQ und hänge QTH und QRZ an.“ — Ein Anruf besteht aus CQ und deinem Rufzeichen.
- „Ich stimme den Sender auf der Frequenz ab, bevor ich rufe.“ — Dauerträger und Abgleich auf einer belegten Frequenz sind unzulässig; abgeglichen wird so, dass nichts frei abstrahlt (§ 16 Abs. 6 und 9 AFuV).
- „Nach dem QSO bleibe ich mit dem nächsten Anrufer auf der Frequenz.“ — Die Frequenz gehört der Station, die den Anruf gestartet hat: Wechsel mit dem neuen Partner auf eine andere Frequenz.
`,
    },
    {
      id: 'viz-qso', type: 'viz', viz: 'qso-simulator', title: 'QSO-Simulator',
      params: { maxErrors: 2 },
      task: 'Führe das QSO mit **höchstens zwei Fehlgriffen** bis zum Ende.',
      caption: 'Die Gesprächsteile (Name, QTH, Rapport) sind frei; verbindlich sind nur das Rufzeichen und die Regeln der AFuV.',
    },
    {
      id: 'mission-qso', type: 'callout', tone: 'mission', title: 'Funkpraxis: Dein erstes CQ',
      md: `
Viele Anfänger haben **Mikrofonangst** — zu Recht ein typisches Gefühl. Hilfreich: erst Wochen **mithören**, dann auf einem Relais oder einer FM-Anruffrequenz *antworten* (leichter als selbst rufen), bis du den Ablauf im Ohr hast. Ein Spickzettel mit „Rufzeichen — Rapport — Name — QTH — bitte kommen“ ist völlig in Ordnung.

*Prüfungsbezug:* BB102 (CQ), BE101–BE103, BE105, BE108 (Ablauf).
`,
    },
    {
      id: 'text-rst', type: 'text', title: 'Wie gut höre ich dich? Das RST-System',
      md: `
Ein **Rapport** sagt dem Gegenüber, wie gut du ihn empfängst — also die **Empfangsqualität**, nicht seine Sendeleistung, den Ionosphärenzustand oder die Sonnenaktivität. Im Amateurfunk verwendet man dafür das **[RST-System](wiki:RST-System|R-S-T system)**.[^darc-50ohm]

<div style="overflow-x:auto"><table style="border-collapse:collapse;width:100%;font-size:.92rem"><thead><tr><th style="text-align:left;padding:5px 8px;border-bottom:2px solid var(--line)">Buchstabe</th><th style="text-align:left;padding:5px 8px;border-bottom:2px solid var(--line)">Bedeutung</th><th style="text-align:left;padding:5px 8px;border-bottom:2px solid var(--line)">Stufen</th></tr></thead><tbody><tr><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">**R**</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">*Readability*, Lesbarkeit</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">**1** (nicht lesbar) bis **5** (einwandfrei lesbar)</td></tr><tr><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">**S**</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">*Signal strength*, Signalstärke</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">**1** bis **9**</td></tr><tr><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">**T**</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">*Tone*, Tonqualität (nur Telegrafie)</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">**1** bis **9**</td></tr></tbody></table></div>

Lesbarkeit: 1 nicht lesbar, 2 zeitweise lesbar, 3 mit Schwierigkeiten lesbar, 4 ohne Schwierigkeiten lesbar, 5 einwandfrei lesbar. In **Telefonie** wird das T weggelassen, also nur zwei Ziffern (**59**: einwandfrei und sehr stark). Beispiele: *45* = ohne Schwierigkeiten lesbar, S5; *33* = mit Schwierigkeiten lesbar, S3.

Die **Signalstärke** liest du am **S-Meter** ab, der Empfangspegelanzeige deines Funkgeräts. Es zeigt die Werte **1 bis 9**, darüber **dB über S9**: *+10, +20, …* Solche Werte hängst du an: **59+20 dB**. Der S-Wert im Rapport bleibt also **9** — die Zahl 5 vorne ist die Lesbarkeit, die 9 die Signalstärke, die dB kommen dahinter. Auch eine Anzeige von „7“ oder „100“ allein ist kein Rapport.
`,
    },
    {
      id: 'warn-rst', type: 'callout', tone: 'warning', title: 'RST-Fallen',
      md: `
- **R ist nicht „Rufzeichen“**, **S nicht „Standort“**, **T nicht „Trägerfrequenz“** oder „Tonhöhe“.
- Die Skalen sind **1–5 / 1–9 / 1–9** — nicht 1–5 / 1–5 / 1–9 und nicht 1–9 / 1–5.
- **Einwandfrei lesbar** bedeutet **R = 5**, auch wenn das Signal schwach ist (dann etwa 53). Bei Prüfungsfragen mit „einwandfrei“ ist R immer 5.
- Ein S-Meter-Ausschlag **über S9** wird nicht zu S10, sondern zu **9 plus dB**: „59+20 dB“, nicht 69, nicht 520.
`,
    },
    {
      id: 'viz-smeter', type: 'viz', viz: 's-meter-rapport', title: 'S-Meter ablesen',
      params: { need: 5 },
      task: 'Gib **fünf Rapporte in Folge** richtig an. Die Gegenstation ist immer einwandfrei lesbar (R = 5), du liest die Signalstärke an der Nadel ab.',
      caption: 'Auf den abgebildeten Displays der Prüfungsfragen siehst du statt der Nadel einen Balken mit derselben Skala (S1–S9, dann +dB).',
    },
    {
      id: 'text-regeln', type: 'text', title: 'Mit wem und worüber? Regeln des Funkverkehrs',
      md: `
**Nur mit Amateurfunkstellen.** Du darfst Funkverkehr **ausschließlich mit anderen Amateurfunkstellen** abwickeln — nicht mit Behörden, Flug- oder Seefunk, nicht mit BOS und auch nicht im [CB-Funk](wiki:CB-Funk|Citizens band radio)-Bereich: Mit einer Amateurfunkstelle darfst du dort **unter keinen Umständen** senden, auch nicht mit reduzierter Leistung oder „CB-konformer“ Einstellung. (CB-Funk als Privatperson mit zugelassenem CB-Gerät ist etwas anderes.)[^afug]

**Keine Nachrichten an Dritte.** Nachrichten, die nicht den Amateurfunkdienst betreffen, darfst du für und an Dritte **nicht übermitteln** — Ausnahme: **Not- und Katastrophenfälle** ([Notfunk](wiki:Notfunk|Amateur radio emergency communications)) (§ 5 Abs. 5 AFuG). Grüße an den nicht-funkenden Ehepartner sind also keine Option.[^afug]

**Nicht gewerblich.** Eine Amateurfunkstelle darf **nicht zu gewerblich-wirtschaftlichen Zwecken** und **nicht zum geschäftsmäßigen Erbringen von Telekommunikationsdiensten** betrieben werden (§ 5 Abs. 4 AFuG). Erlaubt sind dagegen **Experimente und Studien**, die Erforschung der Wellenausbreitung und die **Kommunikation mit Weltraumfunkstellen** des Amateurfunkdienstes. Ein Anzeigen- oder Genehmigungsverfahren, das gewerblichen Betrieb möglich macht, gibt es nicht.[^afug]

**Offene Sprache.** Der Amateurfunkverkehr ist in **offener Sprache** abzuwickeln. Der internationale Amateurschlüssel (Q-Gruppen) und die gebräuchlichen Betriebsabkürzungen **gelten als offene Sprache**; ebenso zulässig sind **[Morsetelegrafie](wiki:Morsecode|Morse code), Fernschreiben und digitale Verfahren**, solange man mit allgemein verfügbarer Technik den Inhalt wiederherstellen kann. **Unzulässig** ist die **[Verschlüsselung](wiki:Verschlüsselung|Encryption) oder Kodierung zur Verschleierung** des Inhalts — also zum Beispiel Sprachverschlüsselung. Ausgenommen sind nur Steuersignale (etwa für Satelliten oder fernbediente Stationen). Unzulässig sind außerdem irreführende Signale, Dauerträger, rundfunkähnliche Darbietungen und die Not-, Dringlichkeits- und Sicherheitszeichen des See- und Flugfunks (§ 16 Abs. 7–9 AFuV).[^afuv]
`,
    },
    {
      id: 'quiz-regeln', type: 'quiz', title: 'Erlaubt oder verboten?',
      question: 'Welche dieser Handlungen sind mit einer Amateurfunkstelle **nicht** erlaubt? (Mehrfachauswahl)',
      options: [
        { text: 'Mit dem Handfunkgerät ein Taxi über den Amateurfunk herbeirufen.', correct: true, why: 'Geschäftsmäßige Nutzung/gewerblich-wirtschaftliche Zwecke sind ausgeschlossen.' },
        { text: 'Dem Flugfunk auf 121,5 MHz antworten.', correct: true, why: 'Funkverkehr nur mit Amateurfunkstellen.' },
        { text: 'Sprachverschlüsselung einschalten, damit niemand mithören kann.', correct: true, why: 'Verschleierung des Inhalts ist verboten.' },
        { text: 'Mit dem Transceiver im CB-Funk-Bereich mit 4 W senden.', correct: true, why: 'Mit der Amateurfunkstelle unter keinen Umständen im CB-Bereich.' },
        { text: 'Q-Gruppen und Abkürzungen wie CQ, QRV, 73 benutzen.', correct: false, why: 'Sie gelten als offene Sprache.' },
        { text: 'Die Ausbreitung der Funkwellen bei Sonnenfinsternis erforschen.', correct: false, why: 'Experimentelle und technisch-wissenschaftliche Studien sind ausdrücklich erlaubt.' },
        { text: 'Eine digitale Betriebsart nutzen, die einen Decoder braucht.', correct: false, why: 'Zulässig, solange der Inhalt mit allgemein verfügbarer Technik wiederherstellbar ist.' },
      ],
    },
    {
      id: 'text-rechnen', type: 'text', title: 'Rechnen mit Draht: Dreisatz und Teilen',
      md: `
Auch die „Mathematik“ der Klasse N beginnt hier — mit Aufgaben, die du schon aus der Schule kennst, nur mit Antennendraht statt Äpfeln. Du brauchst [**Dreisatz**](wiki:Dreisatz|Cross-multiplication) (Verhältnisse), **Bruchrechnen** und das **sinnvolle Runden**:

- **Teile eines Ganzen:** Ein 20-m-Draht wird bei $\\frac23$ seiner Länge getrennt → $\\frac23 \\cdot 20\\,\\text{m} = 13{,}33\\,\\text{m}$ und der Rest $20 - 13{,}33 = 6{,}67\\,\\text{m}$.
- **Wie oft passt etwas hinein?** 250 m Draht, je Antenne 18,5 m: $250 / 18{,}5 = 13{,}51$ — es passen **13 ganze** Antennen, nicht 14 (ein Rest von 9,5 m reicht nicht für eine 14.). Hier wird **abgerundet**.
- **Dreisatz:** 100 m Draht wiegen 210 g, ein Stück wiegt 55 g → Länge $= 100\\,\\text{m} \\cdot \\frac{55}{210} = 26{,}2\\,\\text{m}$. Je schwerer, desto länger: Länge und Gewicht sind **proportional**.
`,
    },
    {
      id: 'num-draht1', type: 'numeric', title: 'Draht teilen',
      question: 'Ein 30 m langer Draht wird bei $\\frac35$ seiner Länge zertrennt. Wie lang ist das **längere** Stück?',
      answer: 18, tolerance: 0.01, unit: 'm',
      explain: '$\\frac35 \\cdot 30\\,\\text{m} = 18\\,\\text{m}$ (das andere Stück hat 12 m).',
    },
    {
      id: 'num-draht2', type: 'numeric', title: 'Wie viele Stücke?',
      question: 'Aus 120 m Draht sollen Radials von je 7,3 m Länge geschnitten werden. Wie viele ganze Radials gehen maximal?',
      answer: 16, tolerance: 0,
      explain: '$120 / 7{,}3 = 16{,}44$ — abgerundet **16** ganze Stücke.',
    },
    {
      id: 'num-draht3', type: 'numeric', title: 'Dreisatz am Draht',
      question: '50 m eines Drahtes wiegen 135 g. Ein Stück desselben Drahtes wiegt 40 g. Wie lang ist es ungefähr?',
      answer: 14.8, tolerance: 0.03, unit: 'm',
      explain: '$50\\,\\text{m} \\cdot \\frac{40}{135} = 14{,}81\\,\\text{m}$.',
    },
    {
      id: 'deep-q', type: 'callout', tone: 'deep', title: 'Woher kommt „CQ“?',
      md: `
CQ stammt aus der [Telegrafie](wiki:Telegrafie|Telegraphy): Die Buchstabenfolge ist schneller zu tasten als „allgemeiner Anruf“. Gesprochen klingt das englische „si-kju“ wie *seek you*, „suche dich“. Mehr zu CQ, QSO und den Q-Gruppen in der nächsten Lektion.
`,
    },
    {
      id: 'recall-qso', type: 'recall', title: 'Mit eigenen Worten',
      prompt: 'Beschreibe ein QSO von der leeren Frequenz bis zum Ende: Was sagst du in welcher Reihenfolge, wie gibst du einen Rapport und welche Regeln gelten für Inhalt und Partner?',
      answer: 'Frequenz abhören, zwei- bis dreimal fragen „Ist die Frequenz frei? <Rufzeichen>“. Keine Antwort → CQ mit Rufzeichen. Antwort: Rufzeichen der Gegenstation einmal, „hier ist“ + eigenes Rufzeichen (buchstabiert), „bitte kommen“. Rapport nach RST (Telefonie: R 1–5, S 1–9; einwandfrei und stark = 59, über S9 = 59+dB; T entfällt), Name, QTH. Rufzeichen bei Anfang, Ende und mindestens alle 10 Minuten. Offene Sprache, nur mit Amateurfunkstellen, nicht gewerblich, keine Nachrichten an Dritte (außer Not-/Katastrophenfall). Nach dem QSO wechseln neue Anrufer auf eine andere Frequenz.',
      hints: ['Hören — fragen — CQ — Antwort — Rapport — Ende.', 'Welche vier Regeln für Inhalt und Partner?'],
      cards: ['rst-skalen', 'offene-sprache-k'],
    },
  ],
  cards: [
    { id: 'frei', front: 'Wie prüfst du, ob eine Frequenz frei ist, bevor du CQ rufst?', back: 'Erst hören, dann zwei- bis dreimal fragen, ob die Frequenz frei ist; kommt keine Antwort, CQ rufen.' },
    { id: 'cq', front: 'Wie beginnt man eine Verbindung? Was ist CQ?', back: 'CQ = allgemeiner Anruf an alle Stationen; oder gezielter Anruf an eine bestimmte Station oder Antwort auf einen Anruf — jeweils mit eigenem Rufzeichen.' },
    { id: 'antwort', front: 'Wie antwortest du auf einen CQ-Ruf in Telefonie?', back: 'Rufzeichen der rufenden Station einmal nennen, dann „Hier ist (eigenes Rufzeichen buchstabiert), bitte kommen“.' },
    { id: 'rueckfrage', front: 'Du hörst nur Teile deines Rufzeichens. Was tun?', back: 'Rückfrage: „Hier ist (Rufzeichen), wurde ich gerufen?“' },
    { id: 'frequenz-nach-qso', front: 'Nach dem QSO ruft dich eine andere Station. Was tust du?', back: 'Auf eine andere Frequenz verständigen und dort weiterführen; die Frequenz gehört der Station, die den Anruf gestartet hat.' },
    { id: 'rapport', front: 'Was ist der RST-Rapport?', back: 'Eine Kurzformel für die Empfangsqualität: R = Lesbarkeit (1–5), S = Signalstärke (1–9), T = Tonqualität (1–9, nur Telegrafie).' },
    { id: 'rst-skalen', front: 'RST-Skalen und Telefonie?', back: 'R 1–5, S 1–9, T 1–9. In Telefonie entfällt T: z. B. 59. Über S9: 59+20 dB.' },
    { id: 's-meter-k', front: 'Wozu dient das S-Meter?', back: 'Es zeigt den Empfangspegel (Signalstärke des empfangenen Signals), S1–S9, darüber in dB über S9.' },
    { id: 'ptt', front: 'Wie heißt die Taste am Mikrofon, die auf Sendung schaltet?', back: 'PTT (Push To Talk). Nicht VOX, RIT oder SSB.' },
    { id: 'partner', front: 'Mit wem darf eine Amateurfunkstelle Funkverkehr abwickeln?', back: 'Ausschließlich mit anderen Amateurfunkstellen (nicht mit BOS, Flug-/Seefunk, CB-Funk). Nachrichten an Dritte nur in Not- und Katastrophenfällen.' },
    { id: 'gewerblich', front: 'Gewerbliche Nutzung?', back: 'Verboten: nicht zu gewerblich-wirtschaftlichen Zwecken und nicht zum geschäftsmäßigen Erbringen von Telekommunikationsdiensten (§ 5 Abs. 4 AFuG).' },
    { id: 'offene-sprache-k', front: 'Offene Sprache — was gilt, was nicht?', back: 'Q-Gruppen, Abkürzungen, Morse, digitale Verfahren mit allgemein verfügbarer Technik gelten als offen. Verboten: Verschlüsselung oder Kodierung zur Verschleierung des Inhalts.' },
    { id: 'empfang-frei', front: 'Braucht man zum Empfangen von Amateurfunk eine Zulassung?', back: 'Nein. Nur das Senden ist an Prüfung und Zulassung geknüpft.' },
  ],
};
