export default {
  id: 'was-ist-amateurfunk',
  title: 'Was ist Amateurfunk? Klassen, Prüfung, Rechtsrahmen',
  summary: 'Amateurfunkdienst, Funkamateur, Amateurfunkstelle, Zulassung; Klassen N/E/A und der Ablauf der Prüfung (4 Teile à 25 Fragen, 19 richtig).',
  minutes: 20,
  goals: [
    'Erklären, wofür der [[amateurfunkdienst]] da ist und wer sich [[funkamateur]] nennen darf',
    'Die Rechtsebenen von der ITU bis zur Bundesnetzagentur in die richtige Reihenfolge bringen',
    '[[funkstelle]] und [[amateurfunkstelle]] sauber definieren, Prüfungsbescheinigung und [[zulassung]] unterscheiden',
    'Den Aufbau der Prüfung Klasse E kennen: vier Teile, 19 von 25 Punkten, mündliche Nachprüfung ab 17',
  ],
  needs: [],
  blocks: [
    {
      id: 'intro', type: 'text', title: 'Ein Hobby mit Amtssiegel',
      md: `
**[[amateurfunkdienst|Amateurfunk]]** heißt: Du baust Funkanlagen selbst, probierst Antennen aus, sprichst mit Menschen in Tokio oder im Nachbarort — und das ganz legal, weil der Staat es dir ausdrücklich erlaubt. Dafür gibt es keine Frequenzgebühr und keine Reichweitenbeschränkung durch ein Netz; dafür gibt es eine **Prüfung**, ein **Rufzeichen** und **Regeln**. Dass Amateurfunk ein vollwertiger [Funkdienst](wiki:Funkdienst|Radio communication service) ist, steht in den internationalen [Radio Regulations](wiki:Vollzugsordnung für den Funkdienst|ITU Radio Regulations) — damit steht er auf einer Stufe mit Seefunk, Rundfunk oder Flugfunk.[^itu-rr]

Wer also nur Walkie-Talkies mit Allgemeinzuteilung (CB-Funk, PMR446, WLAN) benutzt, betreibt **keinen** Amateurfunkdienst: Das sind Funkanwendungen, aber kein Funkdienst im Sinne der Radio Regulations.[^darc-50ohm]

Die Klasse-E-Prüfung der [Bundesnetzagentur](wiki:Bundesnetzagentur|Federal Network Agency) fragt in Teil V (Vorschriften) viele dieser Definitionen ab. Sie wirken trocken — aber sie sind genau formuliert, und die falschen Antworten im Katalog klingen oft fast richtig. Deshalb schauen wir hier genau hin.
`,
    },
    {
      id: 'definition', type: 'text', title: 'Wozu der Amateurfunkdienst da ist',
      md: `
Die Radio Regulations der [Internationalen Fernmeldeunion](wiki:Internationale Fernmeldeunion|International Telecommunication Union) (ITU) definieren den [[amateurfunkdienst]] als einen Funkdienst für

1. die **eigene Ausbildung**,
2. den **Funkverkehr der Funkamateure untereinander** und
3. **technische Studien**.

Ausgeübt wird er von **Funkamateuren**: das sind *ordnungsgemäß befugte Personen*, die sich **ausschließlich aus persönlichem Interesse und ohne finanzielles Interesse** mit Funktechnik beschäftigen. Der **Amateurfunkdienst über Satelliten** hat genau **dieselben Zwecke** wie der übrige Amateurfunk — es gibt keine „Sonderzwecke" wie Wetterbeobachtung oder Ionosphärenforschung als eigene Aufgabe.[^itu-rr]

Das deutsche [Amateurfunkgesetz](wiki:Amateurfunkgesetz) (AFuG) sagt es etwas ausführlicher. Nach § 2 AFuG ist der Amateurfunkdienst ein Funkdienst, der **von Funkamateuren untereinander, zu experimentellen und technisch-wissenschaftlichen Studien, zur eigenen Weiterbildung, zur Völkerverständigung und zur Unterstützung von Hilfsaktionen in Not- und Katastrophenfällen** wahrgenommen wird. Er ist aber **kein Sicherheitsfunkdienst**: Du darfst bei [Katastrophen](wiki:Katastrophenschutz|Emergency management) helfen, hast aber keinen Vorrang vor anderen Funkdiensten.[^afug]

Und wer ist [[funkamateur]]? Im Sinne des AFuG nur der **Inhaber eines Amateurfunkzeugnisses oder einer harmonisierten Amateurfunk-Prüfungsbescheinigung**, der sich **aus persönlicher Neigung und nicht aus gewerblich-wirtschaftlichem Interesse** mit dem Amateurfunkdienst befasst.[^afug]
`,
    },
    {
      id: 'warn-motiv', type: 'callout', tone: 'warning', title: 'Typische Fehlvorstellungen zur Definition',
      md: `
- „Der Amateurfunkdienst dient dazu, **mit anderen Funkdiensten** zu kommunizieren oder **Kommunikationsdienstleistungen** anzubieten." — Nein. Er dient den Funkamateuren selbst: Ausbildung, Verkehr untereinander, Technik.
- „Funkamateure funken aus **politischem, religiösem oder sozialem** Interesse." — Das Gesetz kennt nur **persönliche Neigung** — und schließt **gewerblich-wirtschaftliches Interesse** aus. Ein Handwerksbetrieb darf seine Baustellen also nicht über das Amateurfunkrelais koordinieren.
- „**Alle** Frequenzen im Frequenzplan sind für Funkamateure da und haben Vorrang." — Nein: Nur die ausgewiesenen Bänder, und oft nur als *sekundärer* Funkdienst (dazu später mehr).
- „Der Amateurfunkdienst ist in den RR **nicht** definiert" — doch, und zwar zusammen mit seinen Zwecken. Für das *Gesetz* über den Amateurfunk ist das AFuG zuständig, nicht das TKG.
`,
    },
    {
      id: 'ebenen', type: 'figure', title: 'Von der ITU bis zu deiner Zulassung',
      html: `<svg viewBox="0 0 560 270" role="img" aria-label="Rechtsebenen des Amateurfunks als Stufen: ITU Radio Regulations, CEPT, AFuG, AFuV, Verfügungen der Bundesnetzagentur, persönliche Zulassung">
<style>.t{font:600 14px system-ui,sans-serif;fill:var(--ink)}.s{font:12px system-ui,sans-serif;fill:var(--muted)}.b{stroke:var(--line);fill:#fff}</style>
<g>
<rect class="b" x="10" y="10" width="540" height="38" rx="8" style="fill:color-mix(in srgb,var(--accent) 10%,#fff)"/><text class="t" x="24" y="28">ITU — Radio Regulations (RR)</text><text class="s" x="24" y="42">weltweit · Amateurfunk als Funkdienst · Art. 25</text>
<rect class="b" x="30" y="56" width="520" height="38" rx="8"/><text class="t" x="44" y="74">CEPT — Empfehlungen</text><text class="s" x="44" y="88">europaweit · Prüfungsinhalte, gegenseitige Anerkennung</text>
<rect class="b" x="50" y="102" width="500" height="38" rx="8" style="fill:color-mix(in srgb,var(--accent) 10%,#fff)"/><text class="t" x="64" y="120">AFuG — Gesetz über den Amateurfunk</text><text class="s" x="64" y="134">Deutschland · Rechtsgrundlage (Bundestag 1997)</text>
<rect class="b" x="70" y="148" width="480" height="38" rx="8"/><text class="t" x="84" y="166">AFuV — Amateurfunkverordnung mit Anlage 1</text><text class="s" x="84" y="180">Prüfung, Klassen, Frequenzbereiche und Leistungen</text>
<rect class="b" x="90" y="194" width="460" height="30" rx="8"/><text class="t" x="104" y="214">Verfügungen und Mitteilungen der Bundesnetzagentur</text>
<rect class="b" x="110" y="230" width="440" height="30" rx="8" style="fill:color-mix(in srgb,var(--accent-2) 14%,#fff)"/><text class="t" x="124" y="250">Deine Zulassung mit Rufzeichen</text>
</g></svg>`,
      caption: 'Internationale Vereinbarungen gelten nicht direkt für dich, sondern nur über die Umsetzung in nationales Recht.',
    },
    {
      id: 'regeln-text', type: 'text', title: 'Wer regelt was — und was gilt für dich?',
      md: `
Die **Radio Regulations** sind ein völkerrechtlicher Vertrag der Staaten. Sie gelten **auch für den Amateurfunkdienst** — nicht nur für seine Frequenzbereiche oder Sendearten, sondern ganz allgemein, denn der Amateurfunk ist Teil des Regelwerks (Artikel 25).[^itu-rr] Für dich als Einzelperson wird daraus erst durch die **Umsetzung** in deutsche Gesetze Recht: Das [[afug]] ist die **Rechtsgrundlage** und regelt Voraussetzungen und Bedingungen für die Teilnahme am Amateurfunkdienst. Die [Amateurfunkverordnung](wiki:Amateurfunkverordnung) (**[[afuv]]**) füllt Einzelheiten aus. Die Aufgaben und Befugnisse daraus nimmt die **[[bundesnetzagentur]]** wahr — nicht die PTB, nicht das BAPT, nicht die BDBOS.[^afuv]

Neben dem Spezialrecht gelten allgemeine Vorschriften, die auch den Amateurfunk berühren, etwa das [Telekommunikationsgesetz](wiki:Telekommunikationsgesetz (Deutschland)) (**[[tkg]]**) mit Fernmeldegeheimnis und Störungsvorschriften. Merke: *einige* Regelungen des TKG gelten auch für Funkamateure — nicht alle, und der Amateurfunk ist nicht ausdrücklich ausgeschlossen. Ähnlich greifen das Gesetz über elektromagnetische Verträglichkeit (EMVG) oder das Funkanlagengesetz.

**Artikel 25** der RR legt fest, worüber du mit **Stationen anderer Länder** sprechen darfst: Der Funkverkehr zwischen Amateurfunkstellen verschiedener Länder ist auf **Mitteilungen im Zusammenhang mit dem Zweck des Amateurfunkdienstes** und auf **Bemerkungen persönlicher Art** zu beschränken. Das Gespräch über das Wetter, die Antenne und die Familie ist also völlig in Ordnung. Dass Inhalte *nur technisch* sein müssten, steht dort nicht.
`,
    },
    {
      id: 'order-ebenen', type: 'order', title: 'Rechtsebenen sortieren',
      prompt: 'Ordne die Regelwerke vom **Allgemeinsten** (weltweit) zum **Persönlichsten**.',
      items: [
        'Radio Regulations der ITU (weltweit)',
        'CEPT-Empfehlungen (europaweit)',
        'Amateurfunkgesetz (Deutschland)',
        'Amateurfunkverordnung mit Anlage 1',
        'Deine Zulassung mit persönlichem Rufzeichen',
      ],
      explain: 'Von außen nach innen wird es immer konkreter. Internationale Vereinbarungen gelten für die Mitgliedstaaten und werden dort in Gesetze und Verordnungen übertragen; für dich verbindlich ist das nationale Recht des Landes, in dem du funkst.',
    },
    {
      id: 'stelle', type: 'text', title: 'Funkstelle und Amateurfunkstelle',
      md: `
Eine **[[funkstelle]]** ist nach den RR, sinngemäß: *Sender, Empfänger oder Transceiver samt den Zusatzeinrichtungen, die zum Betrieb an einem Ort erforderlich sind.* Eine **[[amateurfunkstelle]]** ist einfach **eine Funkstelle des Amateurfunkdienstes**.[^itu-rr]

Das AFuG ist etwas genauer: Eine Amateurfunkstelle besteht aus **einer oder mehreren Sende- und Empfangsfunkanlagen einschließlich der Antennenanlagen und der zu ihrem Betrieb erforderlichen Zusatzeinrichtungen** und kann auf **mindestens einer** der im Frequenzplan für den Amateurfunkdienst ausgewiesenen Frequenzen betrieben werden.[^afug] Ein reiner Empfänger ist also *keine* Amateurfunkstelle. Auch „mit Rufzeichen" oder „von Funkamateuren bedient" definiert sie nicht; das sind Eigenschaften, die dazukommen, aber nicht der Kern.
`,
    },
    {
      id: 'quiz-stelle', type: 'quiz', title: 'Amateurfunkstelle — richtig oder nur plausibel?',
      question: 'Welche Aussagen über die **Amateurfunkstelle** sind richtig? (Mehrfachauswahl)',
      options: [
        { text: 'Nach den RR ist sie eine Funkstelle des Amateurfunkdienstes.', correct: true, why: 'Genau so knapp ist die Definition.' },
        { text: 'Im AFuG gehören die Antennenanlagen und nötigen Zusatzeinrichtungen dazu.', correct: true, why: 'Die Antenne ist Teil der Anlage — wichtig auch später beim Personenschutz.' },
        { text: 'Ein reiner Empfänger auf Amateurfunkfrequenzen ist bereits eine Amateurfunkstelle.', correct: false, why: 'Sie muss Sende- und Empfangsfunkanlagen umfassen und kann auf Amateurfunkfrequenzen betrieben werden.' },
        { text: 'Eine Funkstelle wird zur Amateurfunkstelle, sobald sie ein Rufzeichen hat.', correct: false, why: 'Das Rufzeichen kommt mit der Zulassung dazu; definiert wird die Stelle über den Funkdienst.' },
      ],
    },
    {
      id: 'zulassung-text', type: 'text', title: 'Prüfung bestanden — und jetzt? Zeugnis ≠ Zulassung',
      md: `
Nach bestandener Prüfung bekommst du einen **Prüfungsbescheid** und eine **Amateurfunk-Prüfungsbescheinigung**; damit bist du **Funkamateur im Sinne des Gesetzes**. Eine Amateurfunkstelle betreiben darfst du aber noch nicht: Dazu brauchst du zusätzlich die **[[zulassung]] zur Teilnahme am Amateurfunkdienst**. Erst mit dem Zulassungsbescheid wird dir dein persönliches **Rufzeichen** zugeteilt.[^afug][^darc-50ohm]

- *Prüfung ablegen*: kann **jede natürliche Person mit Wohnsitz in Deutschland** auf Antrag. Ein **Mindestalter** sieht das AFuG **nicht** vor — Kinder haben die Prüfung schon mit elf Jahren bestanden (bei Minderjährigen braucht der Antrag die Einwilligung der gesetzlichen Vertreter).
- *Funkamateur sein*: Amateurfunkzeugnis oder harmonisierte Prüfungsbescheinigung. Kein Führungszeugnis, kein Nachweis über Ausbildungsfunkverkehr, kein Reisepass-Nachweis des Wohnsitzes.
- *Senden*: Zulassung. Keine EMVU-Bescheinigung, keine Installationsnachweise, keine Messprotokolle als Voraussetzung dafür (zur Anzeige und zum Personenschutz kommen wir in der Etappe „EMV und Vorschriften").
- *Empfangen*: auch ohne Zulassung erlaubt — nur das **Senden** ist an Prüfung und Zulassung geknüpft.
`,
    },
    {
      id: 'mission-schritte', type: 'callout', tone: 'mission', title: 'Funkpraxis: Dein Weg zum ersten CQ',
      md: `
1. Du lernst (hier!) und meldest dich zur Prüfung an — dazu die nächste Lektion.
2. Du bestehst die vier Teile und bekommst die **Prüfungsbescheinigung**.
3. Du beantragst die **Zulassung mit Rufzeichen** (20 € Gebühr, Stand 05.10.2026).
4. Erst jetzt darfst du **senden**. Zuhören darfst du schon, solange du lernst — ein Scanner oder ein WebSDR genügt.

Prüfungsbezug: VC105, VC106, VC108 (Zeugnis, Zulassung, Mindestalter).
`,
    },
    {
      id: 'klassen-text', type: 'text', title: 'Die drei Klassen: N, E und A',
      md: `
In Deutschland gibt es drei Zeugnisklassen. Je höher die Klasse, desto mehr **Technikwissen** wird geprüft und desto mehr **Frequenzen und Leistung** sind erlaubt:[^afuv]

<div style="overflow-x:auto"><table style="border-collapse:collapse;width:100%;font-size:.92rem"><thead><tr><th style="text-align:left;padding:5px 8px;border-bottom:2px solid var(--line)">Klasse</th><th style="text-align:left;padding:5px 8px;border-bottom:2px solid var(--line)">Technikanforderung (§ 4 AFuV)</th><th style="text-align:left;padding:5px 8px;border-bottom:2px solid var(--line)">Prüfungsteile</th></tr></thead><tbody><tr><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">**N** (Einsteiger)</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">wesentliche Grundzüge</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">V, B, N</td></tr><tr><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">**E** (diese Plattform)</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">Grundzüge der Klasse A</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">V, B, N, E</td></tr><tr><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">**A** (Vollzugang)</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">volle technische Kenntnisse inkl. EMV, Personen- und Sachschutz</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">V, B, N, E, A</td></tr></tbody></table></div>

**Betrieb** (nationale und internationale betriebliche Regeln) und **Vorschriften** werden bei **allen** Klassen in vollem Umfang geprüft — der Unterschied liegt nur in der Technik. Mit **Klasse E** lernst du also dieselben Betriebsregeln und Gesetze wie die Klasse A, aber weniger Technik.

Für den Aufstieg gibt es **Zusatzprüfungen**: Wer N hat, macht nur den Teil E nach; wer E hat, nur den Teil A.
`,
    },
    {
      id: 'viz-fahrplan', type: 'viz', viz: 'pruefungs-fahrplan', title: 'Prüfungs-Fahrplan und Punkte-Rechner',
      params: {},
      task: 'Sieh dir **alle drei Klassen** an. Dann spiele mit den Punkten: Finde **genau 76 Punkte** (bestanden), einen Fall mit **mündlicher Nachprüfung** und einen Fall, in dem du **trotz drei bestandener Teile durchfällst**.',
      caption: 'Das Fragenpool-Verhältnis: 204 Fragen für V, 172 für B, 195 für N und 463 für E — je 25 davon in der Prüfung.',
    },
    {
      id: 'pruefung-text', type: 'text', title: 'So läuft die Klasse-E-Prüfung ab',
      md: `
Die Prüfung ist **schriftlich** und besteht aus **Multiple-Choice-Fragebögen**: vier Antworten, genau eine richtig. Es gibt **vier Teile** mit je **25 Fragen** und höchstens **45 Minuten**: **V** (Vorschriften), **B** (Betriebliche Kenntnisse), **N** (Technik Einstieg) und **E** (Technik Klasse E). Für jede richtige Antwort gibt es einen Punkt; ein Teil ist mit **mindestens 19 von 25 Punkten** bestanden, es sind also höchstens **sechs Fehler** erlaubt.[^bnetza-pruefungsordnung]

Wurde **nur ein einziger Teil** verfehlt, aber mit **mindestens 17 Punkten**, kann der Prüfungsvorsitzende eine **mündliche Nachprüfung** in diesem Teil ansetzen. Nicht bestandene Teile kannst du **innerhalb von 24 Monaten** einzeln wiederholen; danach beginnt alles von vorn.

Erlaubte Hilfsmittel sind Stift und ein einfacher wissenschaftlicher oder nicht programmierbarer Taschenrechner ohne Textspeicher. Gestellt werden unter anderem **Anlage 1 der AFuV**, der **Rufzeichenplan**, Auszüge aus dem **IARU-Bandplan** (2 m, 70 cm) und in den Technikteilen die **Formelsammlung**. Die Details (Anmeldung, Gebühren, Termine) bekommst du in der nächsten Lektion.[^bnetza-pruefungsordnung]

Zu dieser Prüfung gibt es einen amtlichen Fragenkatalog mit 1034 Fragen für die Klassen N, E und A; diese Plattform nutzt die Fragen für N und E.[^bnetza-fragenkatalog]
`,
    },
    {
      id: 'num-fehler', type: 'numeric', title: 'Fehlerbudget',
      question: 'Wie viele Fragen darfst du in **einem** Prüfungsteil höchstens falsch beantworten, um ihn noch zu bestehen?',
      answer: 6, tolerance: 0,
      explain: '25 − 19 = 6. Wer sieben Fragen falsch hat (18 Punkte), hat den Teil verfehlt, kann aber bei nur einem verfehlten Teil mündlich nachgeprüft werden (ab 17 Punkten).',
    },
    {
      id: 'num-gesamt', type: 'numeric', title: 'Fragen insgesamt',
      question: 'Wie viele Fragen beantwortest du an einem Prüfungstag für die komplette Klasse E (alle vier Teile, ohne Vorzeugnis)?',
      answer: 100, tolerance: 0,
      explain: '4 Teile × 25 Fragen = 100 Fragen. Mit einem Zeugnis der Klasse N brauchst du nur den Teil E: 25 Fragen.',
    },
    {
      id: 'match-begriffe', type: 'match', title: 'Begriff und Regelwerk',
      prompt: 'Ordne zu: Wo steht es?',
      pairs: [
        ['Definition des Amateurfunkdienstes (international)', 'Radio Regulations der ITU'],
        ['Rechtsgrundlage für den Amateurfunk in Deutschland', 'Amateurfunkgesetz (AFuG)'],
        ['Frequenzbereiche und Höchstleistungen je Klasse', 'AFuV, Anlage 1'],
        ['Behörde, die AFuG und AFuV vollzieht', 'Bundesnetzagentur'],
        ['Allgemeines Recht, einzelne Regeln auch für Funkamateure', 'Telekommunikationsgesetz (TKG)'],
      ],
    },
    {
      id: 'quiz-pruefung', type: 'quiz', title: 'Mündliche Nachprüfung',
      question: 'Du hast V 24, B 20, N 18, E 17 Punkte. Was passiert?',
      options: [
        { text: 'Nicht bestanden: zwei Teile (N und E) wurden verfehlt, eine mündliche Nachprüfung gibt es nur bei genau einem verfehlten Teil.', correct: true, why: 'Beide Teile N und E liegen unter 19; die Nachprüfung setzt voraus, dass nur ein Teil fehlt.' },
        { text: 'Mündliche Nachprüfung in beiden Teilen, weil beide mindestens 17 Punkte haben.', correct: false, why: 'Die 17-Punkte-Regel gilt nur, wenn **ein einziger** Teil verfehlt wurde.' },
        { text: 'Bestanden, weil die Summe über 76 liegt.', correct: false, why: 'Jeder Teil muss einzeln bestanden werden; Punkte werden nicht verrechnet.' },
        { text: 'Bestanden, weil ein Teil unter 19 ausgeglichen werden darf.', correct: false, why: 'Es gibt keinen Ausgleich zwischen den Teilen.' },
      ],
    },
    {
      id: 'deep-geschichte', type: 'callout', tone: 'history', title: 'Die Backsteinaktion',
      md: `
Am 15. März 1949 trat das erste deutsche Amateurfunkgesetz in Kraft — noch vor dem Grundgesetz. Als sich die Verabschiedung zu verzögern drohte, schickten Funkamateure Pakete mit Mauersteinen an den Vorsitzenden des Wirtschaftsrats, jeweils mit einem Protestbrief: die „Backsteinaktion". Der Verband der Funkamateure in Deutschland ist heute der [Deutsche Amateur-Radio-Club](wiki:Deutscher Amateur-Radio-Club|Deutscher Amateur-Radio-Club) (DARC); international vertritt die [IARU](wiki:International Amateur Radio Union|International Amateur Radio Union) die Funkamateure gegenüber der ITU.[^darc-50ohm]
`,
    },
    {
      id: 'recall-regeln', type: 'recall', title: 'Mit eigenen Worten',
      prompt: 'Erkläre in drei, vier Sätzen: Wozu dient der Amateurfunkdienst, wer darf sich Funkamateur nennen — und warum reicht eine bestandene Prüfung noch nicht zum Senden?',
      answer: 'Der Amateurfunkdienst dient der eigenen Ausbildung, dem Funkverkehr der Funkamateure untereinander und technischen Studien (AFuG zusätzlich: Völkerverständigung, Hilfe in Not- und Katastrophenfällen); er ist kein Sicherheitsfunkdienst. Funkamateur ist, wer ein Amateurfunkzeugnis bzw. eine harmonisierte Prüfungsbescheinigung hat und sich aus persönlicher Neigung, nicht aus gewerblich-wirtschaftlichem Interesse damit befasst. Zum Betrieb einer Amateurfunkstelle braucht man zusätzlich die Zulassung zur Teilnahme am Amateurfunkdienst, mit der das Rufzeichen zugeteilt wird.',
      hints: ['RR und AFuG nennen unterschiedlich viele Zwecke — im Kern ist es dasselbe.', 'Zeugnis = Kenntnisnachweis, Zulassung = Erlaubnis.'],
      cards: ['zeugnis-zulassung', 'zweck-rr'],
    },
  ],
  cards: [
    { id: 'zweck-rr', front: 'Wozu dient der Amateurfunkdienst nach den Radio Regulations?', back: 'Eigene Ausbildung, Funkverkehr der Funkamateure untereinander, technische Studien. Der Satellitenfunkdienst hat dieselben Zwecke.' },
    { id: 'funkamateur-rr', front: 'Wer ist Funkamateur nach den RR?', back: 'Eine ordnungsgemäß befugte Person, die sich ausschließlich aus persönlichem Interesse und ohne finanzielles Interesse mit Funktechnik befasst.' },
    { id: 'funkamateur-afug', front: 'Wer ist Funkamateur nach dem AFuG?', back: 'Inhaber eines Amateurfunkzeugnisses oder einer harmonisierten Prüfungsbescheinigung, der sich aus persönlicher Neigung — nicht aus gewerblich-wirtschaftlichem Interesse — mit dem Amateurfunkdienst befasst.' },
    { id: 'amateurfunkstelle-def', front: 'Was ist eine Amateurfunkstelle?', back: 'RR: eine Funkstelle des Amateurfunkdienstes. AFuG: Sende- und Empfangsanlagen samt Antennenanlagen und Zusatzeinrichtungen, betreibbar auf mindestens einer Amateurfunkfrequenz.' },
    { id: 'zeugnis-zulassung', front: 'Prüfungsbescheinigung vs. Zulassung?', back: 'Die Prüfungsbescheinigung macht dich zum Funkamateur. Zum Senden brauchst du zusätzlich die Zulassung; mit ihr kommt das Rufzeichen.' },
    { id: 'rechtsgrundlage', front: 'Rechtsgrundlage des Amateurfunks in Deutschland, Behörde?', back: 'Amateurfunkgesetz (AFuG, „Gesetz über den Amateurfunk“) mit der Amateurfunkverordnung (AFuV). Vollzug: Bundesnetzagentur.' },
    { id: 'rr-allgemein', front: 'Gelten die allgemeinen RR auch für den Amateurfunk?', back: 'Ja. Internationaler Verkehr zwischen Amateurfunkstellen: nur Mitteilungen zum Zweck des Amateurfunkdienstes und Bemerkungen persönlicher Art (Art. 25).' },
    { id: 'tkg-teils', front: 'Gilt das TKG für den Amateurfunk?', back: 'Einige Regelungen des TKG ja, nicht alle. Das AFuG ist eigenständig, schließt das TKG nicht aus.' },
    { id: 'alter', front: 'Mindestalter für Prüfung und Zulassung?', back: 'Keines im AFuG. Jede natürliche Person mit Wohnsitz in Deutschland kann auf Antrag zur Prüfung zugelassen werden.' },
    { id: 'pruefung-19', front: 'Prüfung Klasse E: Aufbau und Bestehen?', back: '4 Teile (V, B, N, E) × 25 Fragen, 45 min je Teil. Bestanden mit mindestens 19/25 je Teil (max. 6 Fehler).' },
    { id: 'nachpruefung-17', front: 'Wann gibt es eine mündliche Nachprüfung?', back: 'Nur wenn genau ein Teil verfehlt wurde, aber mit mindestens 17 Punkten. Verfehlte Teile sind 24 Monate einzeln wiederholbar.' },
    { id: 'klassen-technik', front: 'Klassen N, E, A: was unterscheidet sie in der Prüfung?', back: 'Nur der Technikumfang: N wesentliche Grundzüge, E Grundzüge der Klasse A, A voll. Betrieb und Vorschriften sind überall gleich.' },
  ],
};
