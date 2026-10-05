export default {
  id: 'notfunk-logbuch-qsl',
  title: 'Notfunk, Stationstagebuch und QSL-Karten',
  summary: 'Wie sich Funkamateure in Notfällen verhalten (und warum MAYDAY und SOS tabu sind), wann ein Logbuch Pflicht wird, wie man UTC umrechnet und was auf eine QSL-Karte gehört.',
  minutes: 25,
  goals: [
    'Das richtige Verhalten bei Notmeldungen beschreiben und erklären, warum Mayday, SOS, PAN PAN und SÉCURITÉ im Amateurfunk nicht benutzt werden dürfen',
    'Die Notfunk-Aktivitätszentren der IARU (ITU-Region 1) und die Rolle der Notfunk-Klubstationen einordnen',
    'Wissen, wann ein [[logbuch|Logbuch]] Pflicht ist und was beim Wechsel von Papier zu Software oder zwischen Programmen zu beachten ist',
    'Eine [[qsl-karte|QSL-Karte]] korrekt ausfüllen (Mindestangaben, UTC) und Ortszeit sicher in UTC umrechnen; QSL-Manager, Callbook und elektronische Alternativen kennen',
  ],
  needs: [],
  blocks: [
    {
      id: 'intro', type: 'text', title: 'Wenn aus dem Hobby Ernst wird',
      md: `
Das Amateurfunkgesetz nennt als einen Zweck des Amateurfunkdienstes ausdrücklich die **Unterstützung von Hilfsaktionen in Not- und Katastrophenfällen**.[^afug] Das heißt: Funkamateure dürfen dann **Nachrichten für und an Dritte** übermitteln — sonst ist Amateurfunk Verkehr *unter Funkamateuren*. Zugleich ist der Amateurfunkdienst **kein Sicherheitsfunkdienst**: Er hat keinen Vorrang vor anderen Funkdiensten und ersetzt weder den [Notruf](wiki:Notruf|Emergency call) 112 noch den Seefunk. Er kann aber Lücken füllen, wenn [Mobilfunk](wiki:Mobilfunk|Mobile telephony) und Festnetz ausfallen.[^darc-50ohm]

In diesem Kapitel geht es um [Notfunk](wiki:Notfunk|Amateur radio emergency communications) und das **Verhalten im Ernstfall**, um die **Zeit in UTC**, mit der man Funkverkehr weltweit vergleichbar protokolliert, und um **Logbuch und QSL-Karte**: die Dokumentation deines Funkbetriebs.
`,
    },
    {
      id: 'notzeichen', type: 'text', title: 'Mayday, SOS, PAN PAN — tabu im Amateurfunk',
      md: `
Die **internationalen Notzeichen** des See- (→ [Seenot](wiki:Seenot|Maritime emergency)) und Flugfunks sind **[Mayday](wiki:Mayday (Notruf)|Mayday)** (Sprache) und **SOS** (Telegrafie). Dazu kommen **Dringlichkeits- und Sicherheitszeichen** wie **[PAN PAN](wiki:Pan-pan|Pan-pan)** und **SÉCURITÉ**; sie gelten in weniger bedrohlichen Lagen. Sie gehören dem **mobilen See- und Flugfunkdienst**.[^darc-50ohm]

Im Amateurfunk ist der **Gebrauch dieser Zeichen ausdrücklich untersagt** (§ 16 Abs. 9 AFuV) — auch im Notfall, auch in Küstennähe, auch auf Kurzwelle.[^afuv] Das heißt **nicht**, dass kein Notruf abgesetzt werden dürfte: Du sagst einfach, was los ist, in klarer Sprache — „**Notfall**“ oder „**Emergency**“, dazu Standort und Art der Notlage. Der Rufzeichenplan schließt aus demselben Grund Rufzeichen aus, die SOS, MAYDAY, PAN, XXX, TTT oder Q-Gruppen enthalten.[^bnetza-rufzeichenplan]

Und noch eine Warnung vor „Das war Notfall, da darf man alles“: Für den Notfall gilt weiter, dass der **Funkverkehr in offener Sprache** stattfindet und nicht gestört wird.
`,
    },
    {
      id: 'verhalten', type: 'text', title: 'Wie du dich bei einer Notmeldung verhältst',
      md: `
Grundregeln aus dem DARC-Kurs:[^darc-50ohm]

1. **Wer einen Notruf hört, bleibt auf Empfang und schreibt alles mit.** Nicht gleich senden, nicht die Frequenz abstimmen („Tuning“ stört), nicht umschalten oder abschalten.
2. **Nur senden, wenn du helfen kannst** und den Funkverkehr nicht störst. Wird die Meldung schon von einer **Rettungsorganisation beantwortet**, hältst du dich heraus — auch Hilfe zwischen den Durchgängen anzubieten oder möglichst viele Funkamateure um Hilfe zu bitten, stört.
3. **Reagiert niemand**, beantwortest du den Ruf und **informierst [Polizei](wiki:Polizei|Police) oder Rettungsleitstelle** ([Rettungsdienst](wiki:Rettungsdienst|Emergency medical services), [Feuerwehr](wiki:Feuerwehr|Fire department)): vollständig, wörtlich. Nicht sofort die Notmeldung auf der Frequenz wiederholen und nicht eine Stunde warten.
4. **Bleibe erreichbar**, gib Informationen weiter, bis Hilfe eingetroffen ist oder die Notlage beendet ist. Die Medien informierst du nicht.
5. **Folge Anweisungen** der notrufenden Station oder der Leitstation.

Zur **Pflicht zur Hilfeleistung**: Der § 323c [StGB](wiki:Strafgesetzbuch|Criminal code) stellt [unterlassene Hilfeleistung](wiki:Unterlassene Hilfeleistung|Duty to rescue) unter Strafe — wenn Hilfe erforderlich und zumutbar ist.[^darc-50ohm] Das gilt für jeden, auch für dich als Funkamateur. Und noch einmal der Gegencheck: Der Ersthelfer an der Unfallstelle bittet dich um einen Funkruf, weil kein Handynetz da ist? Dann hilfst du, **indem du einen Funkamateur rufst, der die Polizei oder Leitstelle informiert** — du lehnst nicht mit dem Argument ab, dass Nachrichten an Dritte verboten seien oder keine Notrufe abgesetzt werden dürften. Mit „MAYDAY“ meldest du dich aber nicht.

> **Die 5 W für die Meldung:** **W**o ist das Ereignis? **W**er meldet es? **W**as ist geschehen? **W**ie viele Betroffene? **W**arten auf Rückfragen!
`,
    },
    {
      id: 'order-notruf', type: 'order', title: 'Notmeldung gehört — und dann?',
      prompt: 'Bringe die Handlungen in die richtige Reihenfolge (keine andere Funkstelle reagiert).',
      items: [
        'Auf Empfang bleiben und alle Informationen mitschreiben',
        'Prüfen, ob eine andere Station oder Rettungsorganisation antwortet',
        'Wenn niemand reagiert: den Ruf beantworten',
        'Polizei oder Rettungsleitstelle informieren (vollständig, wörtlich)',
        'Erreichbar bleiben und Informationen weitergeben, bis Hilfe eingetroffen ist',
      ],
      explain: 'Erst zuhören und notieren, dann eingreifen — nur wenn es nötig ist und niemand reagiert — und anschließend dranbleiben.',
    },
    {
      id: 'viz-notfall', type: 'viz', viz: 'notfall-entscheider', title: 'Notfall-Entscheider',
      params: { count: 6, need: 5 },
      task: 'Beantworte **5 von 6** Szenarien richtig.',
      caption: 'Aus Fragenkatalog und DARC-Kurs abgeleitete Szenarien.',
    },
    {
      id: 'frequenzen', type: 'text', title: 'Notfunkfrequenzen und Notfunkgruppen',
      md: `
Die **International Amateur Radio Union** (IARU) hat für die **ITU-Region 1** (Europa, Afrika, Naher Osten) **Aktivitätszentren für den Notfunkverkehr** festgelegt, die bei Katastrophenfällen **freigehalten** werden sollen:[^darc-50ohm]

<table>
<thead><tr><th>Band</th><th>Frequenz</th></tr></thead>
<tbody>
<tr><td>80 m</td><td>3760 kHz</td></tr>
<tr><td>40 m</td><td>7110 kHz</td></tr>
<tr><td>20 m</td><td>14300 kHz</td></tr>
<tr><td>17 m</td><td>18160 kHz</td></tr>
<tr><td>15 m</td><td>21360 kHz</td></tr>
</tbody>
</table>

Das sind keine Frequenzen nur für Rettungsdienste, sie werden nicht automatisch dauernd abgehört, und sie brauchen keine Ankündigung durch die IARU: Es sind **Empfehlungen im Bandplan**, die im Ernstfall dem Notfunk dienen.

Daneben gibt es **Notfunkgruppen** privater Organisationen. Ihnen sind Klubstationsrufzeichen aus den Reihen **DR4–DR6** vorbehalten (Klassen A/E/N); BOS-Angehörige nutzen **DR1–DR3**. Diese Rufzeichen sind **nur** für den Funkverkehr zwischen Funkamateuren **in Not- und Katastrophenfällen** und für **Übungen** vorgesehen; während einer Übung muss **„/Ueb“** (Sprache: „Übung“) angehängt werden. Ausbildungsfunk und Wettbewerbe sind mit diesen Rufzeichen nicht erlaubt.[^bnetza-rufzeichenplan]
`,
    },
    {
      id: 'utc', type: 'text', title: 'Die Zeit im Funk: UTC',
      md: `
Funkverbindungen laufen über Zeitzonen hinweg. Wenn es in Berlin 8:00 Uhr ist, ist es in New York 2:00 Uhr — beide haben aber **07:00 UTC**. Deshalb wird im Funk **immer in [UTC](wiki:Koordinierte Weltzeit|Coordinated Universal Time)** (Koordinierte Weltzeit) gearbeitet: Logbuch, QSL-Karten, Verabredungen.[^darc-50ohm]

Umrechnung aus Deutschland:

- Winterzeit (**[MEZ](wiki:Mitteleuropäische Zeit|Central European Time)**): **UTC = MEZ − 1 Stunde**
- Sommerzeit (**[MESZ](wiki:Mitteleuropäische Sommerzeit|Summer time in Europe)**): **UTC = MESZ − 2 Stunden**
- Rückwärts: MEZ = UTC + 1 h, MESZ = UTC + 2 h

Beispiele: **15:30 MEZ → 14:30 UTC**. **13:30 MESZ → 11:30 UTC**. Ein Mehrtages-Beispiel: Um **20:00 MESZ am 16. August** hört eine Station dich an und bittet dich, um **23:00 UTC** wieder anzurufen. 23:00 UTC + 2 h = 01:00 MESZ — also **am 17. August** um 01:00 Uhr (das Datum rutscht weiter). Nicht 21:00 und nicht 22:00 Uhr: Ein Umrechnungsfehler um eine Stunde fällt bei Diplomen auf.
`,
    },
    {
      id: 'num-utc', type: 'numeric', title: 'UTC rechnen',
      question: 'Es ist **20:00 Uhr MESZ**. Welche volle Stunde (0–23) zeigt die UTC an?',
      answer: 18, tolerance: 0, unit: 'Uhr UTC',
      explain: 'MESZ − 2 h = 18:00 UTC.',
    },
    {
      id: 'logbuch', type: 'text', title: 'Das Logbuch (Stationstagebuch)',
      md: `
Ein **Logbuch** (auch *Stationstagebuch*) dokumentiert deine Funkverbindungen: elektronisch oder auf Papier, **freiwillig** — oder **in besonderen Fällen verpflichtend**. Es ist *nicht* die Gerätedokumentation, kein Sicherheitsabstandsprotokoll und nicht etwas, das jeder Funkamateur führen muss.[^darc-50ohm]

**Wann wird es Pflicht?** Nach § 17 Abs. 1 AFuV kann die Bundesnetzagentur **zur Ermittlung und Untersuchung von Störungsursachen oder zur Klärung frequenztechnischer Fragen** verlangen, dass du Angaben über den Betrieb deiner Amateurfunkstelle schriftlich oder elektronisch festhältst und vorlegst.[^afuv] Also: **auf Verlangen der BNetzA**, und nur zu diesen Zwecken — nicht zur Prüfung deiner Qualifikation, nicht für das BImSchG, nicht für Beitragsabrechnungen, nicht in den ersten 12 Monaten und nicht generell bei Kurzwelle oder internationalem Betrieb.

Üblicher Inhalt pro QSO: Rufzeichen der Gegenstation, Frequenz oder Band, **Datum und Uhrzeit in UTC**, Übertragungsverfahren, gegebener und erhaltener Rapport, Sendeleistung, Bemerkungen.

**Ist das Logbuch angeordnet**, gilt: Es muss später **einsehbar** bleiben — egal, wie du es führst.
- Beim **Computerlogbuch** müssen die Daten wie beim Papierlogbuch **über eine bestimmte Zeit einsehbar** sein. Ein zusätzliches Papierlogbuch oder ein stets verfügbarer Ausdruck ist nicht vorgeschrieben; die Datei muss auch nicht mit Textverarbeitung lesbar sein.
- Beim **Wechsel der Software** müssen die **Logbuchdaten verfügbar bleiben**: Entweder bleibt die alte Software nutzbar oder du überträgst die Daten in die neue (z. B. über das Austauschformat ADIF). Löschen der alten Software „wegen Datenformat-Kollisionen“, Wechsel auf 64-Bit-Software oder Cloud-Speicherung sind **keine** Anforderung.
- Wechselst du von Papier auf Computer, bewahrst du das Papierlogbuch weiter auf — und umgekehrt.
`,
    },
    {
      id: 'qsl', type: 'text', title: 'QSL-Karten: Die Bestätigung per Post',
      md: `
Das Logbuch dient *deiner* Dokumentation. Viele Funkamateure bestätigen sich außerdem gegenseitig die Verbindung mit einer **[QSL-Karte](wiki:QSL-Karte|QSL card)** — der Name kommt von der Q-Gruppe **QSL** („ich bestätige den Empfang“). Sie ähnelt einer Postkarte und dient als **Beleg**, z. B. bei der Beantragung von **Amateurfunk-Diplomen** (etwa des **DXCC**, 100 bestätigte Länder). Sie ist keine Mitgliedsbescheinigung, keine Landkarte und keine Reservierung für eine Funkrunde.[^darc-50ohm]

**Mindestangaben:** verwendetes **Rufzeichen**, **Rufzeichen der Gegenstation**, **Datum und Uhrzeit in UTC**, **Band** (oder Frequenz), **Übertragungsverfahren** und **Signal-Rapport**. Name, Standort, Locator, Sendeleistung und Ausrüstung sind üblich, aber optional; eine Unterschrift ist nicht mehr nötig. Funkwetter gehört nicht dazu.

**Zeit in UTC** — wie im Logbuch, damit der Partner die Verbindung leicht wiederfindet; und möglichst **minutengenau**, denn viele Diplome akzeptieren Karten nicht, wenn die Zeit um mehrere Minuten vom Antragsteller-Log abweicht. Die eigene Ortszeit oder die des Partners gehört nicht an die Stelle der UTC.
`,
    },
    {
      id: 'viz-qsl', type: 'viz', viz: 'qsl-ausfuellen', title: 'QSL-Karte ausfüllen und UTC umrechnen',
      params: {},
      task: 'Wähle die **Mindestangaben** einer QSL-Karte richtig aus und rechne **drei Ortszeiten in Folge** richtig in UTC um.',
      caption: 'Winterzeit: UTC = MEZ − 1 h. Sommerzeit: UTC = MESZ − 2 h.',
    },
    {
      id: 'versand', type: 'text', title: 'Wohin mit der Karte? QSL-Manager, Callbook, Bureau',
      md: `
- **Direkt per Post**: Die Anschrift ausländischer Funkamateure findest du im **internationalen Rufzeichenverzeichnis (Callbook)** oder im Internet — nicht in der BNetzA-Rufzeichenliste (die kennt nur deutsche Rufzeichen), nicht in der VO Funk und auch nicht im Telefonbuch.[^darc-50ohm]
- **QSL-Vermittlung (Bureau)**: Verbände tauschen die Karten untereinander aus; so kommt Post auch billiger ans Ziel.
- **QSL-Manager**: Manche lassen sich vertreten. Sagt dir HZ1HZ „**QSL via K8PYD**“, schickst du **deine Karte an K8PYD** — den Manager, nicht an HZ1HZ und nicht, nachdem HZ1HZ etwas weitergeleitet hat.
- **Papierlos**: **elektronische QSL-Karten** (E-Mail, [eQSL](wiki:eQSL)) oder **Logbuch-Upload** auf Plattformen, wo die Verbindung dann weltweit abrufbar ist. Nicht üblich — und nicht möglich — ist eine Bestätigung durch die BNetzA, das Intruder Monitoring der Verbände oder einen Notar.
- **Hörerkennzeichen**: Rufzeichen mit **DE** vergibt nicht die BNetzA, sondern der DARC an Kurzwellenhörer (SWLs); damit sendet man nicht.
`,
    },
    {
      id: 'video', type: 'video', youtube: 'JdrDCAynRkU', label: 'Lektion 10 - Logbuch und QSL Karten', channel: 'DL2YMR',
      why: 'Lektion aus dem Videolehrgang Klasse N (DL2YMR) zu Logbuch und QSL-Karten — als zweite Erklärung zum Nachsehen; der Stoff ist in allen Klassen gleich.',
    },
    {
      id: 'warn-qsl', type: 'callout', tone: 'warning', title: 'Typische Fehlvorstellungen',
      md: `
- „Jeder Funkamateur **muss** ein Logbuch führen“ — Nein: freiwillig, auf Verlangen der BNetzA verpflichtend.
- „Die Zeit auf der QSL in **Ortszeit** — das schreiben die deutschen Vorschriften vor“ — Nein: **UTC**.
- „Notzeichen sind im Notfall erlaubt“ — Nein: auch dann untersagt. Notrufe in klarer Sprache sind trotzdem möglich.
- „Es darf keine Nachricht für Dritte übermittelt werden“ — Nein: in Not- und Katastrophenfällen ausdrücklich erlaubt.
- „Ich rufe dreimal MAYDAY, wenn ich Zeuge eines Unfalls bin“ — Nein. Ruf einen Funkamateur und lass die Leitstelle informieren.
`,
    },
    {
      id: 'match-qsl', type: 'match', prompt: 'Ordne Begriff und Bedeutung zu.',
      pairs: [
        ['UTC', 'Weltweit einheitliche Zeit für Logbuch und QSL'],
        ['QSL via K8PYD', 'Karte an den QSL-Manager senden'],
        ['Callbook', 'Internationales Rufzeichenverzeichnis mit Anschriften'],
        ['MAYDAY', 'Internationales Notzeichen des Seefunks — im Amateurfunk untersagt'],
        ['14300 kHz', 'Notfunk-Aktivitätszentrum in der ITU-Region 1'],
        ['/Ueb', 'Zusatz an DR-Klubstationen während einer Notfunkübung'],
      ],
    },
    {
      id: 'quiz-notfunk', type: 'quiz', title: 'Notfunk, Logbuch, QSL',
      question: 'Welche Aussagen sind richtig? (Mehrfachauswahl)',
      options: [
        { text: 'Im Amateurfunk sind Mayday und SOS auch im Notfall verboten.', correct: true, why: '§ 16 Abs. 9 AFuV.' },
        { text: 'Hört man eine Notmeldung, bleibt man auf Empfang und schreibt alles auf.', correct: true, why: 'Erste Grundregel.' },
        { text: 'Ein Logbuch muss jeder Funkamateur führen.', correct: false, why: 'Freiwillig; Pflicht nur auf Verlangen der BNetzA.' },
        { text: 'Auf der QSL-Karte steht die Uhrzeit in UTC.', correct: true, why: 'Damit der Partner die Verbindung leicht findet.' },
        { text: '15:30 MEZ entspricht 16:30 UTC.', correct: false, why: 'MEZ − 1 h: 14:30 UTC.' },
        { text: 'Bei „QSL via K8PYD“ schickt man die Karte an K8PYD.', correct: true, why: 'Er ist der QSL-Manager.' },
      ],
    },
    {
      id: 'mission-notfunk', type: 'callout', tone: 'mission', title: 'Funkpraxis: Dein erstes Log',
      md: `
Führe von Anfang an ein elektronisches Logbuch (z. B. eine Software, die ADIF exportiert), mit **UTC** — das erspart dir später Umrechnungsfehler und macht QSL und Diplome einfach. Und hör dich im Notfunk ein: Viele Ortsverbände üben mit Notfunkgruppen („/Ueb“); als Klasse E kannst du auf 80 m, 15 m und den UKW-Bändern mitmachen. 

Prüfungsbezug: BF101–BF109, BG101–BG111, VD105, VD108, VD109.
`,
    },
    {
      id: 'recall-notfunk', type: 'recall', title: 'In eigenen Worten',
      prompt: 'Du hörst abends auf 80 m eine Station mit einer Notmeldung. Beschreibe, wie du vorgehst — mit allen Schritten — und welche Wörter du nie benutzen darfst. Erkläre danach, was in dein Logbuch und was auf eine QSL-Karte für ein QSO um 21:15 MESZ gehört.',
      answer: 'Ich bleibe auf Empfang, schreibe alles mit (5 W: Wo, Wer, Was, Wie viele, Warten auf Rückfragen), störe nicht und stimme den Sender nicht ab. Wird der Ruf von einer Rettungsorganisation beantwortet, halte ich mich heraus; reagiert niemand, beantworte ich ihn und informiere Polizei/Rettungsleitstelle vollständig, bleibe erreichbar bis Hilfe eingetroffen ist. Nie MAYDAY, SOS, PAN PAN, SÉCURITÉ benutzen — stattdessen „Notfall“/„Emergency“ in klarer Sprache. Ins Logbuch (freiwillig, auf Verlangen der BNetzA Pflicht) gehören u. a. Rufzeichen der Gegenstation, Band/Frequenz, Datum und UTC, Verfahren, Rapporte. 21:15 MESZ = 19:15 UTC. Auf die QSL: beide Rufzeichen, Datum, 19:15 UTC, Band, Verfahren, Rapport.',
      cards: ['nf-zeichen', 'qsl-mindest'],
    },
  ],
  cards: [
    { id: 'nf-zeichen', front: 'Notzeichen (See-/Flugfunk) — im Amateurfunk?', back: '**Mayday / SOS**, dazu PAN PAN und SÉCURITÉ: Gebrauch im Amateurfunk **ausdrücklich untersagt** (§ 16 Abs. 9 AFuV). Notruf in klarer Sprache („Notfall“, „Emergency“) ist erlaubt.' },
    { id: 'nf-verhalten', front: 'Notruf gehört: erste Handlung?', back: '**Auf Empfang bleiben, alles mitschreiben.** Nicht stören, nicht abstimmen. Nur senden, wenn man helfen kann.' },
    { id: 'nf-niemand', front: 'Notmeldung, niemand reagiert?', back: '**Ruf beantworten** und **Polizei/Rettungsleitstelle** informieren, danach **erreichbar bleiben**, bis Hilfe eingetroffen ist.' },
    { id: 'nf-5w', front: 'Die 5 W der Notfallmeldung?', back: '**Wo** — **Wer** meldet — **Was** — **Wie viele** Betroffene — **Warten** auf Rückfragen.' },
    { id: 'nf-freq', front: 'Notfunk-Aktivitätszentren (IARU Region 1)?', back: '**3760, 7110, 14300, 18160, 21360 kHz** — für Notfunk freihalten.' },
    { id: 'nf-dr', front: 'Notfunk-Klubstationen?', back: 'Rufzeichenreihe **DR4–DR6** (BOS: DR1–DR3), nur für Not-/Katastrophenfälle und Übungen (mit **/Ueb**); kein Ausbildungsfunk, keine Wettbewerbe.' },
    { id: 'utc-rechnen', front: 'MEZ/MESZ in UTC?', back: '**UTC = MEZ − 1 h**; **UTC = MESZ − 2 h**. Beispiele: 15:30 MEZ = 14:30 UTC; 13:30 MESZ = 11:30 UTC.' },
    { id: 'lb-pflicht', front: 'Wann Logbuch Pflicht?', back: 'Nur **auf Verlangen der BNetzA** (Störungsursachen, frequenztechnische Fragen, § 17 Abs. 1 AFuV); sonst freiwillig.' },
    { id: 'lb-wechsel', front: 'Computerlogbuch/Wechsel der Software (angeordnetes Log)?', back: 'Daten **über bestimmte Zeit einsehbar** halten; beim Wechsel müssen die Daten **verfügbar bleiben** (alte Software behalten oder übertragen, z. B. ADIF).' },
    { id: 'qsl-def', front: 'QSL-Karte?', back: '**Bestätigung** einer Funkverbindung; Beleg z. B. für **Diplome**.' },
    { id: 'qsl-mindest', front: 'Mindestangaben QSL-Karte?', back: 'Eigenes Rufzeichen, Rufzeichen der Gegenstation, **Datum und Uhrzeit in UTC**, **Band/Frequenz**, **Übertragungsverfahren**, **Rapport**.' },
    { id: 'qsl-manager', front: '„QSL via K8PYD“?', back: 'K8PYD ist der **QSL-Manager**: Karte **an K8PYD** schicken.' },
    { id: 'qsl-adresse', front: 'Anschrift ausländischer Funkamateure?', back: '**Callbook** (internationales Rufzeichenverzeichnis) oder Internet — nicht die BNetzA-Liste.' },
    { id: 'qsl-alt', front: 'Alternativen zur Papier-QSL?', back: '**Elektronische QSL-Karten** und **Logbuch-Upload** auf Plattformen.' },
  ],
};
