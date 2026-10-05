export default {
  id: 'rufzeichenzusaetze-und-ausbildungsfunk',
  title: 'Rufzeichenzusätze und Ausbildungsfunkbetrieb',
  summary: '/p, /m, /mm, /am, /R und /T: wann welcher Zusatz passt, was Pflicht ist, und wie Ausbildungsfunk nach § 12 AFuV abläuft.',
  minutes: 20,
  goals: [
    'Zu jeder Situation (zu Fuß, Auto, Binnenschiff, Hochsee, Flugzeug, Remote) den passenden [[rufzeichenzusatz]] nennen',
    'Wissen, dass nur /T bzw. /Trainee Pflicht ist, alle anderen Zusätze freiwillige Information sind',
    'Die Voraussetzungen für Betrieb an Bord von Wasser- und Luftfahrzeugen angeben (Zustimmung des Fahrzeugführers, keine Sondergenehmigung)',
    'Den [[ausbildungsfunkbetrieb]] beschreiben: Wer darf ausbilden, wer funkt unter welchem Rufzeichen, was gilt für die Aufsicht',
  ],
  needs: [],
  blocks: [
    {
      id: 'intro', type: 'text', title: 'Das Rufzeichen sagt, wer du bist — der Zusatz, wo und wie',
      md: `
Ein [[rufzeichen|Rufzeichen]] dient der **Identifikation**: Es sagt jedem, der mithört, *wer* sendet. Nach § 11 Abs. 1 [[afuv|AFuV]] musst du es **zu Beginn und am Ende jeder Funkverbindung** nennen und außerdem **mindestens alle zehn Minuten** während des Funkverkehrs.[^afuv] Das gilt auch, wenn ihr euch stundenlang unterhaltet — mindestens alle zehn Minuten kommt das Rufzeichen.

Dein [[rufzeichen|Rufzeichen]] gehört zu deiner Zulassung und damit zu deinem **[[heimatstandort|Heimatstandort]]**, den du der [Bundesnetzagentur](wiki:Bundesnetzagentur|Federal Network Agency) mitgeteilt hast (§ 9 Abs. 3 AFuV). Funkst du von einem anderen Ort oder in einer besonderen Lage, darfst du dem Rufzeichen einen **Zusatz** anhängen. Welche Zusätze „international gebräuchlich" sind, listet der Rufzeichenplan der BNetzA (Vfg. 15/2025, Nr. 9).[^bnetza-rufzeichenplan] Zwei Spielregeln gelten immer: Der Zusatz kommt **hinter** das Rufzeichen (mit einem Schrägstrich, „Stroke"), und er darf das Rufzeichen **nicht verfälschen** (§ 11 Abs. 3 AFuV).[^afuv]
`,
    },
    {
      id: 'tabelle', type: 'text', title: 'Die sechs Zusätze auf einen Blick',
      md: `
<table>
<thead><tr><th>Zusatz</th><th>Bedeutung</th><th>Pflicht?</th></tr></thead>
<tbody>
<tr><td><b>/p</b> portabel</td><td>zu Fuß unterwegs <b>oder</b> vorübergehend ortsfest an anderem Standort als dem Heimatstandort</td><td>frei</td></tr>
<tr><td><b>/m</b> mobil</td><td>bewegliche Station im <b>Landfahrzeug</b> oder auf einem Schiff auf <b>Binnengewässern</b></td><td>frei</td></tr>
<tr><td><b>/mm</b> maritim mobil</td><td>an Bord eines Wasserfahrzeugs <b>auf See</b></td><td>frei</td></tr>
<tr><td><b>/am</b> aeronautisch mobil</td><td>an Bord eines <b>Luftfahrzeugs</b> (im Flug)</td><td>frei</td></tr>
<tr><td><b>/R</b> bzw. „Remote"</td><td>Remote-Betrieb (CW/digital /R, Sprache „Remote")</td><td>frei</td></tr>
<tr><td><b>/T</b> bzw. „Trainee"</td><td><b>Ausbildungsfunk</b> (CW/digital /T, Sprache „Trainee")</td><td><b>Pflicht</b></td></tr>
</tbody>
</table>

Wichtig ist die Logik dahinter: Die Zusätze beschreiben den **Betriebsort** (p, m, mm, am) oder eine **besondere Betriebsart des Zugangs** (R, T) — nicht die Sendeleistung, nicht die Modulationsart. Dazu kommt: Außer **/T** ist **kein** Zusatz vorgeschrieben. Am Berggipfel mit dem [Handfunkgerät](wiki:Handfunkgerät|Walkie-talkie) darfst du auch ohne „/p" funken; es ist eine freundliche **Zusatzinformation** für die Gegenstation, keine Meldepflicht und auch keine Vorgabe der internationalen Radio Regulations.[^bnetza-rufzeichenplan]

Gesprochen (mit der [Buchstabiertafel](wiki:Buchstabiertafel|Spelling alphabet)) kann der Zusatz sofort nach dem Rufzeichen kommen oder mit dem Wort „Stroke" angehängt werden: „Delta Lima Eins Papa Zulu (Stroke) Portabel".[^darc-50ohm] Ein Beispiel für die Reihenfolge, wenn mehrere Zusätze zusammenkommen: Ausbildungsfunk mit einer portablen Station heißt **/Tp** (der Pflichtzusatz T steht *vor* dem freiwilligen), mit einer Remote-Station **/Tr**.[^bnetza-rufzeichenplan]
`,
    },
    {
      id: 'warn-zusaetze', type: 'callout', tone: 'warning', title: 'Typische Fehlvorstellungen (die falschen Antworten im Katalog)',
      md: `
- „**/m** heißt *minimale Leistung*" oder „**/am** heißt *Amplitudenmodulation*" — Nein. Die Zusätze sind **Ortsangaben**. VE8ZZ/am ist ein kanadisches Rufzeichen, das im **Luftfahrzeug** benutzt wird, kein AM-Betrieb.
- „**/m** gilt für alles, was schwimmt." — Nein: **/mm** nur **auf See**; auf **Binnengewässern** (Rhein, Bodensee) und innerhalb der 12-Seemeilen-Zone genügt **/m**.
- „**/p** ist Pflicht, damit die BNetzA den Standort erkennt" oder „wegen der Radio Regulations" — Nein. In Deutschland ist **/p freiwillig**.
- „**/m** heißt vorübergehend ortsfest oder tragbar" — Das ist **/p**. „Mobil" ist **beweglich im Landfahrzeug**.
- „Der Zusatz steht **vor** dem Rufzeichen" (Trainee/DL1PZ) — Nein, immer **dahinter**: DL1PZ/Trainee.
- „Remote heißt /RB oder /F (Fern)" — Es heißt **/R** bzw. „Remote".
`,
    },
    {
      id: 'viz-zusatz', type: 'viz', viz: 'rufzeichen-zusatz', title: 'Rufzeichen-Zusatz-Würfel',
      params: { count: 8, need: 7 },
      task: 'Wähle in **7 von 8** Szenarien den richtigen Zusatz.',
      caption: 'Bei manchen Szenarien kommt die Nachfrage: Pflicht oder freiwillig?',
    },
    {
      id: 'text-fahrzeug', type: 'text', title: 'Funken an Bord von Schiff und Flugzeug',
      md: `
Auf einem Boot oder im Flugzeug gilt für die Amateurfunkstelle zunächst dasselbe wie überall: Du brauchst **keine Sondergenehmigung** der Bundesnetzagentur und musst auch nicht Inhaber eines See- oder Flugfunkzeugnisses sein. Deine Zulassung gilt auch im Wasser- oder [Luftfahrzeug](wiki:Luftfahrzeug|Aircraft).[^darc-50ohm] Es kommt aber eine zweite Bedingung dazu, die ganz praktisch ist: Das Fahrzeug gehört nicht dir — und damit hat der **Fahrzeugführer das Sagen**.

- **Wasserfahrzeug**, auch in internationalen Gewässern ([Hohe See](wiki:Hohe See)): Zustimmung des **Schiffsführers** (nicht „irgendeines Crewmitglieds"). Der [Kapitän](wiki:Kapitän|Sea captain) trägt die Verantwortung für Schiff und Funkbetrieb an Bord.
- **Luftfahrzeug**: Zustimmung des verantwortlichen **Luftfahrzeugführers**; dazu muss das Fahrzeug in der Luft sein (ein Ballon an der Halteleine zählt nicht).[^darc-50ohm] Eine Genehmigung der BNetzA für „aeronautischen Funkbetrieb", eine fest installierte Funkstelle des Flugfunks oder gar Flugfunkfrequenzen brauchst du nicht — und du darfst sie auch nicht nutzen: Dein Amateurfunk läuft wie immer auf den **Amateurfunkbändern**.

Der Hintergrund: Der Fahrzeugführer ist für sein Fahrzeug verantwortlich und kann beurteilen, ob der Funkbetrieb den sicheren Betrieb stört — nicht die Behörde aus der Ferne.

> **Wo ist „auf See"?** Als Faustregel nach dem DARC-Kurs: **außerhalb der 12-[Seemeilen](wiki:Seemeile|Nautical mile)-Zone** in internationalen Gewässern → **/mm**. Auf Flüssen und Seen ([Binnengewässer](wiki:Binnengewässer)) und im [Küstenmeer](wiki:Küstenmeer|Territorial waters) davor → **/m**.[^darc-50ohm]
`,
    },
    {
      id: 'mission-segeln', type: 'callout', tone: 'mission', title: 'Funkpraxis: Wie hängst du es im QSO an?',
      md: `
Am Wanderparkplatz rufst du „CQ CQ CQ de DL1XYZ Portabel" oder im Auto „… Stroke Mobil". Die Gegenstation weiß dann: *Aha, der steht nicht in seinem Shack* — kein Problem, wenn er seine Antenne schlechter hört, und eine hilfreiche Ortsinformation. Ist dir der Zusatz zu umständlich, lässt du ihn weg; **nur im Ausbildungsfunk geht das nicht**.

Prüfungsbezug: BD201–BD208 (Zusätze), VD115, VE705, VE706 (Betrieb an Bord).
`,
    },
    {
      id: 'match-zusatz', type: 'match', prompt: 'Ordne jedem Zusatz die zutreffende Situation zu.',
      pairs: [
        ['/p', 'Zu Fuß mit Handfunkgerät oder Feldtag-Station auf der Wiese'],
        ['/m', 'Im Zug oder auf der Rheinfähre'],
        ['/mm', 'An Bord einer Yacht mitten auf dem Atlantik'],
        ['/am', 'Als Passagier im Flug, mit Zustimmung des Flugzeugführers'],
        ['/R', 'Über das Internet an der eigenen Funkanlage 300 km entfernt'],
        ['/T', 'Neffe ohne Zeugnis funkt unter Aufsicht des Onkels'],
      ],
    },
    {
      id: 'quiz-zusatz', type: 'quiz', title: 'Zusatz oder nicht?',
      question: 'Welche Aussagen über Rufzeichenzusätze sind richtig? (Mehrfachauswahl)',
      options: [
        { text: 'Außer /T bzw. /Trainee ist kein Zusatz vorgeschrieben.', correct: true, why: 'Alle anderen Zusätze sind freiwillige Informationen (Rufzeichenplan Nr. 9–11, § 11 AFuV).' },
        { text: 'Beim Betrieb in einem Zug darf /m verwendet werden.', correct: true, why: 'Zug = Landfahrzeug → mobil.' },
        { text: 'Auf einem Bodensee-Ausflugsschiff muss /mm verwendet werden.', correct: false, why: 'Binnengewässer: /m (freiwillig). /mm ist für Schiffe auf See.' },
        { text: 'Der Zusatz darf das zugeteilte Rufzeichen nicht verfälschen.', correct: true, why: 'So steht es in § 11 Abs. 3 AFuV — der Zusatz kommt immer hinter das vollständige Rufzeichen.' },
        { text: 'Für /am braucht man eine Genehmigung der Bundesnetzagentur.', correct: false, why: 'Nötig ist nur die Zustimmung des Luftfahrzeugführers; eine Sondergenehmigung gibt es nicht.' },
      ],
    },
    {
      id: 'num-zehn', type: 'numeric', title: 'Wie oft das Rufzeichen?',
      question: 'Ihr unterhaltet euch in einem langen QSO. In welchem **längsten zulässigen Abstand** (in Minuten) musst du dein Rufzeichen mindestens nennen?',
      answer: 10, tolerance: 0, unit: 'min',
      explain: 'Rufzeichen bei Beginn und Ende der Verbindung sowie mindestens alle zehn Minuten (§ 11 Abs. 1 AFuV).',
    },
    {
      id: 'ausbildung', type: 'text', title: 'Ausbildungsfunkbetrieb: Senden vor der Prüfung',
      md: `
Grundregel: Senden darf nur, wer eine [[zulassung|Zulassung]] hat. Eine Ausnahme ist der **[[ausbildungsfunkbetrieb|Ausbildungsfunkbetrieb]]** (§ 12 [AFuV](wiki:Amateurfunkverordnung)): Er dient der **praktischen Vorbereitung auf die fachliche Prüfung** und erlaubt Personen ohne Amateurfunkzeugnis, unter **unmittelbarer Anleitung und Aufsicht** eines [Funkamateurs](wiki:Funkamateur|Amateur radio operator) selbst zu funken.[^afuv] Das ist das Funkamateur-Pendant zum Fahrschüler mit dem Fahrlehrer auf dem Beifahrersitz.

Die Regeln, geordnet nach den Fragen *Wer, Wie, Womit, Wo*:

- **Wer darf ausbilden?** Zugelassene Funkamateure der **Klassen A und E** (§ 12 Abs. 1). Eine Mindestzeit seit der Zulassung gibt es nicht; die Klasse N darf **nicht** ausbilden.
- **Wie nah?** Der Ausbilder muss **in unmittelbarer Nähe** sein und eingreifen können — im Extremfall den Sender abschalten. Betreuung aus der Ferne oder per Funk genügt nicht.[^darc-50ohm]
- **Mit welchem Rufzeichen?** Der Auszubildende benutzt das Rufzeichen **des Ausbilders** oder der **Klubstation** und hängt **verpflichtend** den Zusatz an: bei Sprache **/Trainee**, bei [Morsetelegrafie](wiki:Morsecode|Morse code) und digitalen Betriebsarten **/T** (§ 11 Abs. 5). Aus DL1PZ wird DL1PZ/Trainee, aus DL0MOL wird DL0MOL/T. Der **Ausbilder selbst** funkt weiter unter seinem normalen Rufzeichen — er benutzt das Ausbildungsrufzeichen nicht für eigene Aussendungen.[^afuv]
- **Wie weit darf der Schüler gehen?** Genau so weit wie der **Ausbilder**: Der Berechtigungsumfang des Ausbildungsfunkbetriebs ist der des Ausbilders (§ 12 Abs. 1). Ein Klasse-E-Ausbilder lässt seinen Schüler also **nicht** auf 40 m ans Mikrofon (Klasse A nötig), dafür auf 2 m und 70 cm.
- **Wo?** Zuhause, im Freien oder an einer [[klubstation|Klubstation]] (§ 14 Abs. 3) — nicht *nur* dort. Auch Morsetelegrafie ist erlaubt, nicht nur Telefonie.
- **Pflichten gegenüber der Behörde:** Auf Verlangen der Bundesnetzagentur muss der Ausbilder Auskunft über **Art und Umfang** des Ausbildungsfunkbetriebs geben (§ 12 Abs. 4).

Der Zusatz macht das Rufzeichen zu einem **Ausbildungsrufzeichen**. Früher gab es dafür eigene Rufzeichen der Reihe DN1AA–DN8ZZZ; sie werden **seit dem 24.06.2025 nicht mehr zugeteilt** und gelten nur noch **bis 31.12.2028**.[^bnetza-rufzeichenplan] Von den Klubstationen sind die **DR-Rufzeichen** (BOS- und Notfunk-Klubstationen) ausgenommen: Dort ist Ausbildungsfunk nicht gestattet (ebenso wenig die Teilnahme an Wettbewerben).[^bnetza-rufzeichenplan]
`,
    },
    {
      id: 'warn-ausbildung', type: 'callout', tone: 'warning', title: 'Typische Fehlvorstellungen zum Ausbildungsfunk',
      md: `
- „Der Ausbildungsfunkbetrieb dient der **Vorführung** des Amateurfunks" oder dem **Morse-Training** des Funkamateurs — Nein: Er bereitet auf die **Prüfung** vor.
- „Nur Klasse A darf ausbilden." / „Man braucht ein Jahr Zulassung." / „Man braucht ein **eigenes Ausbildungsrufzeichen**." — Nein: Klasse **A oder E** reicht, sofort, mit dem eigenen Rufzeichen plus Zusatz.
- „Ausbildung geht nur an **Klubstationen** oder **Schulstationen**." — Nein; auch zu Hause, auch im Freien.
- „Das ist auf **10 W EIRP** begrenzt" oder „nur in **Telefonie**" oder „nicht in **Morsetelegrafie**" — Nein: Es gilt der Berechtigungsumfang des Ausbilders, alle Betriebsarten sind erlaubt.
- „Der Zusatz kommt vom **Ausbilder** oder von **beiden**." — Nein: Den Zusatz benutzt **der Auszubildende**.
- „Der Auszubildende darf auch ohne Aufsicht funken." — Nein: **unmittelbare Anleitung und Aufsicht**.
`,
    },
    {
      id: 'quiz-ausbildung', type: 'quiz', title: 'Ausbildungsfunk: richtig oder nur plausibel?',
      question: 'Welche Aussagen zum Ausbildungsfunkbetrieb sind richtig? (Mehrfachauswahl)',
      options: [
        { text: 'Der Auszubildende funkt unter dem Rufzeichen des Ausbilders mit dem Zusatz /T bzw. /Trainee.', correct: true, why: '§ 12 Abs. 3 und § 11 Abs. 5 AFuV.' },
        { text: 'Der Ausbilder muss Inhaber einer Zulassung der Klasse A oder E sein.', correct: true, why: '§ 12 Abs. 1 AFuV.' },
        { text: 'Der Auszubildende darf auch Bänder nutzen, die dem Ausbilder (Klasse E) nicht zustehen, weil er ja nur übt.', correct: false, why: 'Der Berechtigungsumfang entspricht dem des Ausbilders — nicht mehr.' },
        { text: 'Auf Verlangen der BNetzA muss der Ausbilder Auskunft über Art und Umfang geben.', correct: true, why: '§ 12 Abs. 4 AFuV.' },
        { text: 'Der Ausbilder darf den Schüler allein lassen, solange er telefonisch erreichbar ist.', correct: false, why: 'Gefordert ist unmittelbare Anleitung und Aufsicht — der Ausbilder muss den Sender notfalls abschalten können.' },
      ],
    },
    {
      id: 'recall-ausbildung', type: 'recall', title: 'In eigenen Worten',
      prompt: 'Dein Nachbar (kein Funkamateur, 15 Jahre) möchte unter deiner Anleitung an einem Samstag QSOs fahren: einmal in SSB, einmal in CW. Dein Rufzeichen ist DL1ABC (Klasse E). Wie lautet sein Rufzeichen in beiden Fällen, wer steht wo, und was darf er auf Kurzwelle?',
      answer: 'In SSB (Sprache): DL1ABC/Trainee (ggf. „Stroke Trainee"). In CW (und digital): DL1ABC/T. Ich sitze direkt neben ihm (unmittelbare Anleitung und Aufsicht) und nenne selbst weiterhin mein normales Rufzeichen, wenn ich funke. Sein Berechtigungsumfang ist meiner (Klasse E): auf Kurzwelle also nur 160 m, 80 m, 15 m und 10 m, nicht 40 m oder 20 m. Auf Verlangen der BNetzA muss ich Auskunft über Art und Umfang geben.',
      hints: ['Wer benutzt den Zusatz?', 'Wessen Berechtigungsumfang gilt?'],
      cards: ['t-zusatz', 'ausbilder-klasse'],
    },
  ],
  cards: [
    { id: 'rz-p', front: 'Rufzeichenzusatz **/p** — Bedeutung?', back: 'portabel: zu Fuß unterwegs **oder** vorübergehend ortsfest an anderem Standort als dem Heimatstandort. Freiwillig.' },
    { id: 'rz-m', front: 'Rufzeichenzusatz **/m** — Bedeutung?', back: 'mobil: bewegliche Station im **Landfahrzeug** oder auf einem Schiff auf **Binnengewässern**. Freiwillig.' },
    { id: 'rz-mm', front: 'Rufzeichenzusatz **/mm**?', back: 'maritim mobil: an Bord eines Wasserfahrzeugs **auf See** (außerhalb der 12-Seemeilen-Zone). Freiwillig.' },
    { id: 'rz-am', front: 'Rufzeichenzusatz **/am**?', back: 'aeronautisch mobil: an Bord eines **Luftfahrzeugs**. Zustimmung des Luftfahrzeugführers nötig, keine BNetzA-Genehmigung.' },
    { id: 'rz-r', front: 'Zusatz für Remote-Betrieb?', back: '**/R** (CW/digital) bzw. das Wort **„Remote"** (Sprache). Freiwillig.' },
    { id: 't-zusatz', front: 'Zusatz im Ausbildungsfunk — wer, wie, Pflicht?', back: 'Der **Auszubildende** hängt **/Trainee** (Sprache) bzw. **/T** (CW, digital) an das Rufzeichen des Ausbilders / der Klubstation. **Pflicht** (§ 11 Abs. 5 AFuV).' },
    { id: 'rz-pflicht', front: 'Welcher Rufzeichenzusatz ist Pflicht?', back: 'Nur **/T bzw. /Trainee**. Alle anderen (/p, /m, /mm, /am, /R) sind freiwillige Information.' },
    { id: 'ausbilder-klasse', front: 'Wer darf Ausbildungsfunkbetrieb durchführen? Welcher Umfang?', back: 'Zugelassene Funkamateure der Klasse **A oder E**; Berechtigungsumfang = der des **Ausbilders**; unmittelbare Anleitung und Aufsicht (§ 12 AFuV).' },
    { id: 'rz-reihenfolge', front: 'Zusatz-Reihenfolge bei Ausbildungsfunk portabel / remote?', back: '**/Tp** bzw. **/Tr**: Pflichtzusatz T zuerst, danach das freiwillige p bzw. r (Rufzeichenplan Nr. 10, 11).' },
    { id: 'rz-ident', front: 'Wie oft muss das Rufzeichen genannt werden?', back: 'Zu Beginn und Ende jeder Verbindung und **mindestens alle 10 Minuten** (§ 11 Abs. 1 AFuV).' },
    { id: 'dn-aus', front: 'Alte Ausbildungsrufzeichen DN1AA–DN8ZZZ?', back: 'Seit 24.06.2025 nicht mehr zugeteilt; vorhandene gelten noch bis **31.12.2028**.' },
    { id: 'bord-zustimmung', front: 'Amateurfunk an Bord von Schiff/Flugzeug: Voraussetzung?', back: 'Zustimmung des **Schiffsführers** bzw. **Luftfahrzeugführers**. Keine Sondergenehmigung der BNetzA nötig.' },
  ],
};
