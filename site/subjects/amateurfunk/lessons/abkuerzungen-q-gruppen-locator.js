export default {
  id: 'abkuerzungen-q-gruppen-locator',
  title: 'Betriebsabkürzungen, Q-Gruppen und QTH-Locator',
  summary: 'CQ, QRV, QSL, 73 & Co., die wichtigsten Q-Gruppen und das Maidenhead-Locator-System.',
  minutes: 15,
  goals: [
    'Die Betriebsabkürzungen CQ, CW, TX/RX/TRX, K, R, BK, PSE sicher deuten',
    'Die prüfungsrelevanten [[q-gruppe|Q-Gruppen]] als Aussage, Frage und Aufforderung unterscheiden',
    'Wissen, wo Q-Gruppen international festgelegt sind (Radio Regulations)',
    'Den [[maidenhead-locator]] aufbauen (Feld, Quadrat, Unterquadrat) und einen Ort darin finden',
  ],
  needs: ['erste-verbindung'],
  blocks: [
    {
      id: 'intro', type: 'text', title: 'Kurz und international: Abkürzungen im Funk',
      md: `
Der Ursprung vieler Abkürzungen liegt in der [Morsetelegrafie](wiki:Telegrafie|Telegraphy): „CQ“ ist schneller getastet als „allgemeiner Anruf“. Viele Abkürzungen sind in den **[Radio Regulations](wiki:Vollzugsordnung für den Funkdienst|ITU Radio Regulations)** (RR) definiert, vor allem die **betrieblichen Abkürzungen** für die Telegrafie und die **Q-Gruppen**.[^itu-rr] Heute sind sie fester Bestandteil der Umgangssprache unter Funkamateuren und werden genauso in der **Telefonie** benutzt.[^darc-50ohm]

<div style="overflow-x:auto"><table style="border-collapse:collapse;width:100%;font-size:.92rem"><thead><tr><th style="text-align:left;padding:5px 8px;border-bottom:2px solid var(--line)">Abkürzung</th><th style="text-align:left;padding:5px 8px;border-bottom:2px solid var(--line)">Bedeutung</th></tr></thead><tbody><tr><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">**CQ**</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">allgemeiner Anruf („seek you“)</td></tr><tr><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">**CW**</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">*Continuous Wave*, Synonym für Morsetelegrafie (ein ein- und ausgetasteter Träger)</td></tr><tr><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">**TX**, **RX**, **TRX**</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">Transmitter (Sender), Receiver (Empfänger), Transceiver (Sendeempfänger)</td></tr><tr><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">**K**</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">„kommen“ — Aufforderung zum Senden (nur Telegrafie)</td></tr><tr><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">**R**</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">*Roger*, *received* — Empfangsbestätigung (nur Telegrafie)</td></tr><tr><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">**BK**</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">*Break*, Unterbrechung der Sendung</td></tr><tr><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">**PSE**</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">*please*, bitte</td></tr><tr><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">**73**</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">beste Grüße (Verabschiedung)</td></tr></tbody></table></div>

Die Abkürzung **CQ** hat nichts mit „Contest Query“, „Große Entfernung“ oder „Telegrafie“ zu tun; **CW** ist weder „Codewort“ noch „Calling Wide“ und auch keine „Contestwertung“. **TX, RX, TRX** stehen in genau dieser Reihenfolge für Sender, Empfänger, Sendeempfänger — nicht für Tonqualität, Lesbarkeit, Signalstärke (das ist T, R, S im Rapport).
`,
    },
    {
      id: 'text-q', type: 'text', title: 'Q-Gruppen: drei Buchstaben, eine Menge Bedeutung',
      md: `
Der **[Q-Schlüssel](wiki:Q-Schlüssel|Q code)** wurde früh festgelegt und ist nicht nur im Amateurfunk verwurzelt. Alle Q-Gruppen sind **drei Zeichen lang** und beginnen mit **Q**. Sie lassen sich als **Aussage**, als **Frage** (mit angehängtem Fragezeichen: *QRV?*) und als **Aufforderung** gebrauchen; bei manchen muss eine Angabe folgen („QTH Berlin“). Nachschlagen kannst du sie in den **Radio Regulations** der ITU — nicht in IARU-Empfehlungen, ETSI-Standards oder ISO-Normen.[^itu-rr]

<div style="overflow-x:auto"><table style="border-collapse:collapse;width:100%;font-size:.92rem"><thead><tr><th style="text-align:left;padding:5px 8px;border-bottom:2px solid var(--line)">Q-Gruppe</th><th style="text-align:left;padding:5px 8px;border-bottom:2px solid var(--line)">Aussage / Aufforderung</th><th style="text-align:left;padding:5px 8px;border-bottom:2px solid var(--line)">Frage</th><th style="text-align:left;padding:5px 8px;border-bottom:2px solid var(--line)">Merkhilfe</th></tr></thead><tbody><tr><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">**QRM**</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">Ich werde gestört (durch menschengemachte Störungen)</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">Werden Sie gestört?</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">**M**enschengemacht</td></tr><tr><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">**QRN**</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">Ich habe atmosphärische Störungen</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">Haben Sie atmosphärische Störungen?</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">**N**atürlich</td></tr><tr><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">**QRO**</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">Erhöhen Sie die Sendeleistung</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">Soll ich die Sendeleistung erhöhen?</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">ein paar Watt **o**bendrauf</td></tr><tr><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">**QRP**</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">Verringern Sie die Sendeleistung</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">Soll ich sie verringern?</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">**P**iano, leise</td></tr><tr><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">**QRT**</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">Stellen Sie die Übermittlung ein</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">Soll ich …?</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">**t**erminate</td></tr><tr><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">**QRV**</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">Ich bin bereit</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">Sind Sie bereit?</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">**v**orbereitet</td></tr><tr><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">**QRX**</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">Ich rufe Sie wieder</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">Wann werden Sie mich wieder rufen?</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">Zeitpunkt **X**</td></tr><tr><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">**QRZ**</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">Sie werden von … gerufen</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">Von wem werde ich gerufen?</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">bitte Rufzeichen ein **z**weites Mal</td></tr><tr><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">**QSB**</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">Die Stärke Ihrer Zeichen schwankt</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">Schwankt die Stärke meiner Zeichen?</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">**b**ergauf, **b**ergab</td></tr><tr><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">**QSL**</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">Ich bestätige den Empfang</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">Können Sie den Empfang bestätigen?</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">alles ge**l**oggt</td></tr><tr><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">**QSO**</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">Ich kann direkt Funkverkehr aufnehmen mit …</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">Können Sie direkt Funkverkehr aufnehmen mit …?</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">umgangssprachlich: eine Funkverbindung</td></tr><tr><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">**QSY**</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">Wechseln Sie die Frequenz</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">Soll ich die Frequenz wechseln?</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">**y**: change frequency</td></tr><tr><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">**QTH**</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">Mein Standort ist …</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">Wie ist Ihr Standort?</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">**H**ome</td></tr></tbody></table></div>

Drei Abweichungen von der „reinen Lehre“, die im Alltag üblich sind: **QRZ?** hört man oft statt CQ, vor allem im **Pile-up**, wenn viele Stationen eine begehrte Station rufen — sie ruft nach dem Abarbeiten eines Anrufers kurz „QRZ?“, um weitere Stationen aufzurufen. **QSO** meint umgangssprachlich die Funkverbindung selbst. **QRP**-Betrieb heißt: mit besonders kleiner Leistung funken, in der Regel unter 5 W — beliebt in der Telegrafie.[^darc-50ohm]
`,
    },
    {
      id: 'warn-q', type: 'callout', tone: 'warning', title: 'Q-Gruppen, die man verwechselt',
      md: `
- **QRM** (menschengemacht) ↔ **QRN** (natürlich) ↔ **QSB** (schwankende Stärke): „Ich werde gestört. Ich habe atmosphärische Störungen. Schwankt die Stärke meiner Zeichen?“ ist die richtige Folge für QRM, QRN, QSB?. Die falschen Varianten vertauschen die beiden Störungen oder machen aus einer Frage eine Aussage.
- **QRO?** — „Soll ich die Sendeleistung **erhöhen**?“; **QRP** wäre „verringern“. **PSE QRP** = bitte weniger Leistung.
- **QRT** heißt *Stellen Sie die Übermittlung ein*, nicht „Ich bin bereit“ (das ist QRV).
- **QSL?** — „Können Sie den Empfang bestätigen?“, **nicht** „Schicken Sie eine QSL-Karte?“. Die [QSL-Karte](wiki:QSL-Karte|QSL card) ist die schriftliche Bestätigung einer Verbindung.
- **QRZ?** — „Von wem werde ich gerufen?“. Nicht „Sind Sie bereit?“ (QRV?), nicht „Wie ist Ihr Standort?“ (QTH?), nicht „Können Sie den Empfang bestätigen?“ (QSL?).
- **QSY** — Frequenzwechsel: Nach einem allgemeinen Anruf auf einer **Anruffrequenz** (z. B. 145,500 MHz) schlägst du dem Partner zügig **QSY** vor, damit die Anruffrequenz frei wird. QRV, QSB oder QRZ passen hier nicht.
`,
    },
    {
      id: 'viz-q', type: 'viz', viz: 'q-gruppen-trainer', title: 'Q-Gruppen-Trainer',
      params: { count: 10, need: 8 },
      task: 'Beantworte **8 von 10** Fragen richtig. Die Fragen kommen zufällig — Bedeutung, Frage-Form, Aufforderung und Abkürzungen.',
    },
    {
      id: 'match-q', type: 'match', title: 'Q-Gruppe und Bedeutung',
      prompt: 'Ordne zu.',
      pairs: [
        ['QRV', 'Ich bin bereit'],
        ['QRM', 'Ich werde gestört'],
        ['QTH', 'Mein Standort ist …'],
        ['QRT', 'Stellen Sie die Übermittlung ein'],
        ['QRX', 'Ich rufe Sie wieder'],
        ['QSB', 'Die Stärke der Zeichen schwankt'],
      ],
    },
    {
      id: 'mission-q', type: 'callout', tone: 'mission', title: 'Funkpraxis: So klingt das im Äther',
      md: `
„**CQ CQ** von DL1PZ, **QRV** auf 145,500 … **QSY** auf 145,450?“ — „DL1PZ, ja, **QSL**, Rapport 59, **QTH** Kassel, **QRP** mit 2 Watt“ — „**QRM** hier, bitte nochmal.“ In der Telefonie sagst du die Q-Gruppen einfach so, wie sie geschrieben sind.

*Prüfungsbezug:* BB106, BB107 (TX/RX/TRX, CW), BB201–BB206 (Q-Gruppen), BE107 (QSY), BE115 (QRZ?), VA407 (RR).
`,
    },
    {
      id: 'text-locator', type: 'text', title: 'Wo bist du? Der Maidenhead-Locator',
      md: `
Auf **VHF, UHF und höheren Bändern** (und in jedem [Amateurfunkwettbewerb](wiki:Amateurfunkwettbewerb|Contesting) auf diesen Bändern) nennt man den Standort gern mit dem **[Maidenhead-Locator](wiki:QTH-Locator|Maidenhead Locator System)** (auch **QTH-Locator** oder **Standortkenner**). Die [Erdoberfläche](wiki:Erdoberfläche|Earth’s surface) ist in Kästchen eingeteilt, und jedes Kästchen hat eine eindeutige Bezeichnung aus **Buchstaben und Ziffern**. Der Name erinnert an die Stadt [Maidenhead](wiki:Maidenhead|Maidenhead) in England, wo 1980 eine Konferenz der [IARU](wiki:International Amateur Radio Union|International Amateur Radio Union) das ältere QRA-Locator-System reformierte.[^darc-50ohm]

Gemeldet wird der Locator **nicht** an eine Behörde, und er ist **keine** Angabe in Grad, Minuten und Sekunden und auch keine Zeitzone — er ist eine **Positionsangabe durch Verweis auf Felder (fields) und Quadrate (squares)**:

<div style="overflow-x:auto"><table style="border-collapse:collapse;width:100%;font-size:.92rem"><thead><tr><th style="text-align:left;padding:5px 8px;border-bottom:2px solid var(--line)">Stufe</th><th style="text-align:left;padding:5px 8px;border-bottom:2px solid var(--line)">englisch</th><th style="text-align:left;padding:5px 8px;border-bottom:2px solid var(--line)">Bezeichnung</th><th style="text-align:left;padding:5px 8px;border-bottom:2px solid var(--line)">Größe</th></tr></thead><tbody><tr><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">**Feld**</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">*field*</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">2 Buchstaben **AA–RR**</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">20° Länge × 10° Breite (18 × 18 Felder)</td></tr><tr><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">**Quadrat**</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">*square*</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">2 Ziffern **00–99**</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">2° × 1° (10 × 10 je Feld)</td></tr><tr><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">**Unterquadrat**</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">*subsquare*</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">2 Buchstaben **AA–XX**</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">5′ × 2,5′ (24 × 24 je Quadrat)</td></tr></tbody></table></div>

Der erste Buchstabe zählt von A (bei 180° West) nach Osten bis R, der zweite von A (Südpol) nach Norden bis R. Die Quadrate zählen ebenfalls von links nach rechts und von unten nach oben. Beispiel: Die Geschäftsstelle des DARC in Baunatal bei Kassel liegt im Locator **JO41RG**: Feld **JO** (Mitteleuropa), Quadrat **41**, Unterquadrat **RG**. Der Locator ist 4- oder 6-stellig gebräuchlich (JO41 oder JO41RG).[^darc-50ohm]

Rechnen kannst du das nach einem einfachen Muster: Zu Länge und Breite addierst du 180° beziehungsweise 90°, teilst durch 20° beziehungsweise 10° (→ Buchstaben), der Rest durch 2° beziehungsweise 1° (→ Ziffern), dessen Rest durch 5′ beziehungsweise 2,5′ (→ kleine Buchstaben).
`,
    },
    {
      id: 'viz-loc', type: 'viz', viz: 'locator-karte', title: 'Locator-Karte',
      params: {},
      task: 'Tippe ins **Feld JO** (Mitteleuropa; in der Ansicht „Region“ besser zu treffen), wechsle dann zur Ansicht „Feld · Quadrate“ und tippe ins **Quadrat JO41** (Kassel/Baunatal). Gib schließlich (z. B. **FN31** für die Region New York oder **QF22** für Melbourne) selbst einen Locator ein.',
      caption: 'Die Karte zeichnet Länge und Breite gleichmäßig in Grad, deshalb sind alle Felder gleich groß dargestellt (die wirkliche Fläche nimmt zu den Polen hin ab). Kartendaten: Natural Earth (gemeinfrei). Rot: deine Auswahl, blau: DARC-Geschäftsstelle.',
    },
    {
      id: 'order-loc', type: 'order', title: 'Vom Groben zum Feinen',
      prompt: 'Ordne die Stufen des Locators von der größten zur kleinsten Einheit.',
      items: ['Feld (z. B. JO)', 'Quadrat (z. B. 41)', 'Unterquadrat (z. B. RG)'],
      explain: 'JO41RG: Feld, Quadrat, Unterquadrat — jede Stufe teilt die vorherige weiter auf (18×18, 10×10, 24×24).',
    },
    {
      id: 'num-felder', type: 'numeric', title: 'Wie viele Felder?',
      question: 'Wie viele Felder (AA–RR) hat die Erdoberfläche insgesamt (18 in Ost-West, 18 in Nord-Süd)?',
      answer: 324, tolerance: 0,
      explain: '$18 \\cdot 18 = 324$ Felder. Jedes Feld hat 100 Quadrate, jedes Quadrat 576 Unterquadrate.',
    },
    {
      id: 'quiz-loc', type: 'quiz', title: 'Was ist der Maidenhead-Locator?',
      question: 'Welche Aussage über den Maidenhead-Locator ist richtig?',
      options: [
        { text: 'Eine Positionsangabe durch Verweis auf Felder und Quadrate, kodiert mit Buchstaben und Ziffern.', correct: true, why: 'So ist er definiert.' },
        { text: 'Ein Koordinatensystem, in dem der Standort der zuständigen Behörde mitgeteilt werden muss.', correct: false, why: 'Mit der Behörde hat der Locator nichts zu tun; Standorte ortsfester Stationen werden getrennt angezeigt.' },
        { text: 'Die Angabe des Standorts in Grad, Minuten und Sekunden geographischer Länge und Breite.', correct: false, why: 'Der Locator ersetzt Grad-Angaben durch ein Raster aus Buchstaben und Ziffern.' },
        { text: 'Der Bereich, der sich aus der Zeitzone des Standorts ergibt.', correct: false, why: 'Zeitzonen und Locator haben nichts miteinander zu tun.' },
      ],
    },
    {
      id: 'recall-q', type: 'recall', title: 'Mit eigenen Worten',
      prompt: 'Erkläre jemandem, der gerade seinen ersten Funkspruch mithört, was „QRZ?“, „QSY“ und der Locator „JO41RG“ bedeuten.',
      answer: 'QRZ? = Von wem werde ich gerufen? (im Pile-up: weitere Stationen aufrufen). QSY = Frequenzwechsel. JO41RG = Maidenhead-Locator: Feld JO (20° × 10°), darin Quadrat 41 (2° × 1°), darin Unterquadrat RG — hier die Region Baunatal/Kassel.',
      hints: ['Drei Teile: Frage, Aufforderung, Rasterkoordinate.'],
      cards: ['qrz', 'locator-aufbau'],
    },
  ],
  cards: [
    { id: 'cq-k', front: 'CQ, CW, K, R, BK, PSE, 73?', back: 'CQ allgemeiner Anruf · CW Continuous Wave (Morse) · K kommen · R Empfangsbestätigung (Roger) · BK Break · PSE bitte · 73 beste Grüße.' },
    { id: 'txrx', front: 'TX, RX, TRX?', back: 'Sender, Empfänger, Sendeempfänger (Transmitter, Receiver, Transceiver).' },
    { id: 'q-bau', front: 'Aufbau und Quelle der Q-Gruppen?', back: 'Immer drei Zeichen, beginnen mit Q; mit ? als Frage. Nachzuschlagen in den Radio Regulations (RR).' },
    { id: 'qrm-qrn-qsb', front: 'QRM, QRN, QSB?', back: 'QRM: Ich werde gestört (menschengemacht). QRN: atmosphärische Störungen. QSB: Stärke der Zeichen schwankt (Fading).' },
    { id: 'qro-qrp', front: 'QRO, QRP, QRT?', back: 'QRO: Sendeleistung erhöhen. QRP: Sendeleistung verringern (PSE QRP = bitte weniger). QRT: Übermittlung einstellen.' },
    { id: 'qrv-qth', front: 'QRV, QTH, QRX?', back: 'QRV: ich bin bereit. QTH: mein Standort ist … QRX: ich rufe Sie wieder (QRX?: wann rufen Sie mich?).' },
    { id: 'qrz', front: 'QRZ?', back: 'Von wem werde ich gerufen? Im Pile-up auch: Aufruf weiterer Stationen.' },
    { id: 'qsl-qso', front: 'QSL?, QSO?, QSY?', back: 'QSL?: Können Sie den Empfang bestätigen? QSO?: Können Sie direkt Funkverkehr aufnehmen mit …? (umgangssprachlich: Funkverbindung). QSY: Frequenz wechseln.' },
    { id: 'locator-def', front: 'Was ist der Maidenhead-Locator?', back: 'Eine Positionsangabe durch Verweis auf Felder (fields) und Quadrate (squares), mit Buchstaben und Ziffern kodiert; auch QTH-Locator oder Standortkenner.' },
    { id: 'locator-aufbau', front: 'Aufbau JO41RG?', back: 'Feld JO (2 Buchstaben A–R, 20°×10°), Quadrat 41 (2 Ziffern, 2°×1°), Unterquadrat RG (2 Buchstaben A–X, 5′×2,5′). DARC-Geschäftsstelle Baunatal.' },
  ],
};
