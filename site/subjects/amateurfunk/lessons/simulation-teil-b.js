export default {
  id: 'simulation-teil-b',
  title: 'Simulation Teil B: Betriebliche Kenntnisse',
  summary: 'Teil B unter Prüfungsbedingungen: 25 Fragen aus dem B-Pool (172), 45 Minuten, 19 richtig. Strategie für die Faktenfragen, Merkliste mit Buchstabiertafel, Q-Gruppen, Landeskenner und Rufzeichen-Regeln.',
  minutes: 45,
  goals: [
    'Den Aufbau von Teil B kennen und wissen, welche Fakten nicht ausliegen und deshalb auswendig sitzen müssen',
    'Buchstabiertafel, Q-Gruppen, Landeskenner und Rufzeichenzusätze sicher zuordnen',
    'Einen Zeitplan für 45 Minuten aufstellen und die Teil-Simulation durchführen',
    'Das Ergebnis auswerten und die schwachen Themen gezielt wiederholen',
  ],
  needs: [],
  blocks: [
    {
      id: 'ablauf', type: 'text', title: 'So läuft Teil B',
      md: String.raw`
Teil B („Betriebliche Kenntnisse“) hat dieselbe Form wie Teil V: **25** Fragen mit vier Antworten, **45 Minuten**, **19 Punkte** zum Bestehen, bei genau einem verfehlten Teil ab **17** Punkten mündliche Nachprüfung möglich.[^bnetza-pruefungsordnung] Der B-Pool hat **172** Fragen.[^bnetza-fragenkatalog] Es liegen aus: **Anlage 1 der AFuV**, der **Rufzeichenplan** und die **Auszüge aus dem IARU-Bandplan** für 2 m und 70 cm; eine Formelsammlung gibt es nur in den Technikteilen.

**Jetzt starten:** [Prüfungssimulation](#/s/amateurfunk/exam), bei Teil B **„nur diesen Teil unter Prüfungsbedingungen“**. Vorher oder nachher: [Übungsmodus für den ganzen Teil B](#/s/amateurfunk/practice/part:b) und die [Fehler der letzten Prüfung](#/s/amateurfunk/practice/last).

Der Pool verteilt sich auf sieben Themen:

<table>
<tr><th>Thema</th><th>Fragen</th><th>Anteil</th></tr>
<tr><td>Internationales Buchstabieralphabet</td><td>10</td><td>6 %</td></tr>
<tr><td>Betriebliche Abkürzungen und Q-Gruppen</td><td>16</td><td>9 %</td></tr>
<tr><td>Frequenzbereiche (Bezeichnungen, IARU-Bandpläne)</td><td>28</td><td>16 %</td></tr>
<tr><td>Rufzeichen und Landeskenner</td><td>41</td><td>24 %</td></tr>
<tr><td>Abwicklung des Amateurfunkverkehrs (RST, Anruf, Contest, Relais, Satelliten)</td><td><b>57</b></td><td><b>33 %</b></td></tr>
<tr><td>Notfunkverkehr und Nachrichtenverkehr bei Notfällen</td><td>9</td><td>5 %</td></tr>
<tr><td>Stationstagebuch und QSL-Karten</td><td>11</td><td>6 %</td></tr>
</table>`,
    },
    {
      id: 'wissen', type: 'text', title: 'Was du auswendig können musst und was nicht',
      md: String.raw`
Teil B ist **Faktenwissen und Verhalten**. Viele Fragen sind schnell beantwortet, wenn der Stoff sitzt, und kaum zu raten, wenn er fehlt. Hilfreich ist die Trennung in zwei Töpfe:

**Liegt aus, musst du nur lesen können:**
- Welche Rufzeichenreihe zu welcher Klasse gehört (Rufzeichenplan): DL1 bis DL9 Klasse A, DO1 bis DO9 Klasse E, DN9 Klasse N; DA0 ist eine Klubstation, DP-Rufzeichen sind exterritoriale Stellen.[^bnetza-rufzeichenplan]
- Wofür ein Frequenzbereich im 2-m- oder 70-cm-Band vorgesehen ist (Auszug aus dem IARU-Bandplan).

**Muss sitzen (liegt nicht aus):**
- **Buchstabiertafel.** Typische Fallstricke: *Delta* (nicht „Denmark“), *Kilo* (nicht „Kilowatt“), *Quebec* (nicht „Queen“), *Uniform* (nicht „Uruguay“), *Charlie* (nicht „Caesar“).
- **Q-Gruppen und betriebliche Abkürzungen** (CQ, DX, K, BK, R, PSE …).
- **Landeskenner** ([Landeskenner](wiki:Landeskenner|ITU prefix) der Nachbarländer und der großen Funkländer).
- **Rufzeichenzusätze** (/p, /m, /mm, /am, /R, /T).
- **Verhalten:** Anruf, Rapport, Pile-up, Split, Notfunk.
- **Zeitumrechnung** für QSL-Karten (UTC).`,
    },
    {
      id: 'match-landeskenner', type: 'match', title: 'Landeskenner → Land',
      prompt: 'Ordne die Landeskenner den Ländern zu.',
      pairs: [
        ['OE', 'Österreich'],
        ['ON', 'Belgien'],
        ['OK', 'Tschechien'],
        ['PA', 'Niederlande'],
        ['SM', 'Schweden'],
        ['SP', 'Polen'],
        ['HB9', 'Schweiz'],
        ['VK', 'Australien'],
      ],
    },
    {
      id: 'match-q', type: 'match', title: 'Q-Gruppe → Bedeutung',
      prompt: 'Was bedeuten diese Q-Gruppen?',
      pairs: [
        ['QRM', 'Ich werde gestört (Störung durch andere Stationen)'],
        ['QRN', 'Ich habe atmosphärische Störungen'],
        ['QRV', 'Ich bin bereit'],
        ['QRT', 'Stellen Sie die Übermittlung ein'],
        ['QTH', 'Mein Standort ist …'],
        ['QSY', 'Wechseln Sie die Frequenz'],
      ],
    },
    {
      id: 'demo-zeit', type: 'viz', viz: 'zeit-planer', title: 'Demo: Dein Zeitplan für Teil B',
      intro: 'In Teil B gibt es kaum Rechenaufgaben. Die Zeit geht eher für das genaue Lesen der Antworten drauf. Stelle deine Werte ein; die Voreinstellungen sind Übungsannahmen.',
      params: { part: 'b' },
      task: 'Sieh einmal einen Plan, der die **45 Minuten sprengt**, und baue dann einen, der **mit mindestens 5 Minuten Puffer** passt.',
    },
    {
      id: 'calc-utc', type: 'numeric', title: 'UTC im Sommer',
      question: 'Du hattest im Sommer um 13:30 Uhr Ortszeit (MESZ) ein QSO. Um wie viele Stunden musst du die Uhrzeit **zurückrechnen**, um die UTC-Zeit für die QSL-Karte zu erhalten?',
      answer: 2, tolerance: 0, unit: 'h',
      hint: 'MEZ ist UTC+1, MESZ ist UTC+2.',
      explain: '13:30 MESZ − 2 h = **11:30 UTC**. Im Winter (MEZ) ziehst du eine Stunde ab: 15:30 MEZ sind 14:30 UTC. Auf QSL-Karten gehört immer die koordinierte Weltzeit (UTC), damit Partner im Ausland den Eintrag in ihrem Logbuch finden ([Koordinierte Weltzeit](wiki:Koordinierte Weltzeit|Coordinated Universal Time)).',
    },
    {
      id: 'quiz-notfall', type: 'quiz', title: 'Notmeldung gehört',
      question: 'Du hörst auf einer Amateurfunkfrequenz eine Notmeldung. Was tust du **als Erstes**?',
      options: [
        { text: 'Aufmerksam zuhören und alle wichtigen Informationen notieren.', correct: true, why: 'Erst wenn du die Meldung verstanden und notiert hast, kannst du sinnvoll handeln.' },
        { text: 'Sofort „Mayday“ oder „SOS“ im Amateurfunk zurückrufen.', why: 'Mayday und SOS sind die Notzeichen außerhalb des Amateurfunks; im Amateurfunk gebrauchst du sie nicht.' },
        { text: 'Die Frequenz sofort wechseln, um nicht zu stören.', why: 'Dann verlierst du die Meldung.' },
        { text: 'Das Gerät abschalten und die BNetzA anrufen.', why: 'Das ist keine sinnvolle Notfallreaktion.' },
      ],
    },
    {
      id: 'order-anruf', type: 'order', title: 'Einen Anruf beginnen',
      prompt: 'Du willst auf einer Frequenz einen allgemeinen Anruf in Telefonie machen. Bringe die Schritte in die richtige Reihenfolge.',
      items: [
        'Frequenz abhören, ob sie frei zu sein scheint',
        'Zwei- bis dreimal fragen, ob die Frequenz besetzt ist',
        'Bleibt es still: CQ rufen (allgemeiner Anruf mit eigenem Rufzeichen)',
        'Meldet sich eine Station: mit Rufzeichen antworten und den Rapport austauschen',
      ],
      explain: 'Erst hören, dann fragen, dann CQ. So störst du keine laufende Verbindung. Ein Hinweis aus dem Katalog: Auf höheren Kurzwellenbändern kann eine Station in der toten Zone sitzen, die du nicht hörst, und die Frequenz scheint nur frei.',
    },
    {
      id: 'recall-auswertung', type: 'recall', title: 'Nach der Simulation',
      prompt: 'Mache jetzt die Simulation von Teil B. Trage danach ein: Punktzahl, welche der sieben Themen am meisten Fehler brachten und was du daran änderst.',
      answer: 'Beispielantwort: „22 von 25. Zwei Fehler bei Landeskenner, einer bei Q-Gruppen. Ich lerne die Landeskenner als Tabelle (Nachbarländer zuerst) und wiederhole sie täglich im Themenmodus Rufzeichen und Landeskenner, die Q-Gruppen als Karten.“ Wichtig: Fehler nach Thema sortieren und eine konkrete Maßnahme mit Termin festlegen.',
      cards: ['sb-buchstabier', 'sb-q1'],
    },
    {
      id: 'fact-quellen', type: 'callout', tone: 'fact', title: 'Wo die Fakten herkommen',
      md: String.raw`Alle Merkpunkte dieser Lektion sind Inhalte des amtlichen Katalogs (3. Auflage 2024, Teil B), des Rufzeichenplans der Bundesnetzagentur (Vfg. 15/2025, gültig ab 01.04.2025) und der Prüfungsordnung (Vfg. 29/2024). Stand: 05.10.2026. Die Details zu Anruf, Rapport, Relais und Contest stehen in den Lektionen der Betriebstechnik; hier geht es nur ums Abfragen und Zeitmanagement.[^bnetza-fragenkatalog]`,
    },
  ],
  cards: [
    { id: 'sb-buchstabier', front: 'Buchstabiertafel: häufige Fallstricke?', back: '**Delta** (nicht Denmark), **Kilo** (nicht Kilowatt), **Quebec** (nicht Queen), **Uniform** (nicht Uruguay), **Charlie** (nicht Caesar).' },
    { id: 'sb-q1', front: 'QRM, QRN, QSB, QRO, QRP?', back: '**QRM** Ich werde gestört. **QRN** atmosphärische Störungen. **QSB** Schwankt die Stärke meiner Zeichen? **QRO** Sendeleistung erhöhen. **QRP** Sendeleistung verringern.' },
    { id: 'sb-q2', front: 'QRT, QRZ?, QSL?, QRV, QTH, QSY, QRX?', back: '**QRT** Übermittlung einstellen. **QRZ?** Von wem werde ich gerufen? **QSL?** Können Sie den Empfang bestätigen? **QRV** Ich bin bereit. **QTH** Mein Standort. **QSY** Frequenzwechsel. **QRX?** Wann werden Sie mich wieder rufen?' },
    { id: 'sb-cq', front: 'CQ, CQ DX, CQ DL?', back: '**CQ** allgemeiner Anruf. **CQ DX** große Entfernung: auf Kurzwelle andere Kontinente, auf 2 m/70 cm mehrere hundert km. **CQ DL** sucht Funkamateur in Deutschland (nur dann antworten).' },
    { id: 'sb-cw', front: 'CW-Abkürzungen K, BK, R, CW?', back: '**K** Aufforderung zum Senden. **BK** Unterbrechung/formlose Übergabe. **R** Received. **CW** Continuous Wave. Antworte genauso schnell oder langsamer als gerufen.' },
    { id: 'sb-rst', front: 'RST-Rapport?', back: '**R** Lesbarkeit (1–5), **S** Signalstärke (1–9), **T** Tonqualität (1–9). SSB einwandfrei: **59**. Über Relais nur **R**.' },
    { id: 'sb-bereiche', front: 'Frequenzbereichsnamen: HF, VHF, UHF?', back: '**3–30 MHz** HF = Kurzwelle (10 m). **30–300 MHz** VHF = UKW (2 m). **300–3000 MHz** UHF = Dezimeterwelle (70 cm).' },
    { id: 'sb-bandplan', front: 'IARU-Bandplan: Verbindlichkeit und Merkpunkte?', back: 'Nur **Empfehlung**. CW am Bandanfang. SSB: **80 m unteres, 20 m oberes** Seitenband. FM-Anruf **145,500 MHz** (2 m), **433,500 MHz** (70 cm).' },
    { id: 'sb-rufzeichen', front: 'Rufzeichenreihen: DL, DO, DN9, DA0, DP?', back: '**DL1–DL9** Klasse A. **DO1–DO9** Klasse E. **DN9** Klasse N. **DA0** Klubstation. **DP** exterritorial (z. B. Klasse A).' },
    { id: 'sb-zusaetze', front: 'Rufzeichenzusätze /p, /m, /mm, /am, /R, /T?', back: '**/p** tragbar oder vorübergehend ortsfest (kein Pflichtzusatz). **/m** Landfahrzeug oder Binnenschiff. **/mm** See. **/am** Luftfahrzeug. **/R** Remote. **/T** bzw. **/Trainee** Ausbildung.' },
    { id: 'sb-landeskenner', front: 'Landeskenner: Nachbarn und Beispiele?', back: '**DA–DR** Deutschland. **F** Frankreich, **HB9** Schweiz, **OZ** Dänemark, **SP** Polen. **OE** Österreich, **ON** Belgien, **OK** Tschechien, **PA** Niederlande, **SM** Schweden, **EA** Spanien, **LX** Luxemburg. **W/K** USA, **VE** Kanada, **VK** Australien, **ZL** Neuseeland.' },
    { id: 'sb-notfunk', front: 'Notfunk: Notzeichen und richtiges Verhalten?', back: '**Mayday/SOS** gelten **außerhalb** des Amateurfunks, nicht darin. Notmeldung: zuhören und notieren; antwortet niemand, selbst antworten und **Polizei/Rettungsleitstelle** informieren; wird sie beantwortet, **nicht stören**.' },
    { id: 'sb-qsl', front: 'QSL-Karte: Zeit und Mindestangaben?', back: 'Zeit in **UTC** (MEZ − 1 h, MESZ − 2 h). Mindestens: eigenes und fremdes Rufzeichen, Datum und Uhrzeit, Band, Übertragungsverfahren, Rapport. Alternativen: elektronische QSL, Logbuch-Upload; „QSL via“ = über den QSL-Manager.' },
    { id: 'sb-relais', front: 'Relais und Pile-up: Ablage und Verhalten?', back: 'Eingabe **600 kHz tiefer** (2 m), **7,6 MHz tiefer** (70 cm) als die Ausgabe. Durchgänge kurz, Pause vor jedem Durchgang. **Split** = Senden und Empfangen auf verschiedenen Frequenzen; „5 up“ = hört 5 kHz höher.' },
  ],
};
