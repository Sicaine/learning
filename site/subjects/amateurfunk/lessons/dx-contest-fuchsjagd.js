export default {
  id: 'dx-contest-fuchsjagd',
  title: 'DX, Pile-up, Split, Contest, Fuchsjagd, SSTV',
  summary: 'Betriebsabläufe jenseits des normalen QSO: DX-Anrufe richtig deuten, Pile-ups und Split-Betrieb, Wettbewerbe, DX-Peditionen, Peilwettbewerbe (ARDF) und Bildübertragung.',
  minutes: 25,
  goals: [
    'Anrufe wie „CQ DX“, „CQ DL“, „CQ VK/ZL“ und „CQ FD … TEST“ richtig deuten und entscheiden, ob man antwortet',
    'Pile-up-Techniken (nach Ziffern, nach Ländern, Listenbetrieb, Split) erklären und eine Split-Ansage („5 up“, „tuning 290 to 300 up“) in Hör- und Rufefrequenz umsetzen',
    'Zweck und Regeln eines [[contest|Contests]] kennen (Ausschreibung, kurzer Austausch, „TEST“, Sprint-Contest)',
    '[[ardf|Fuchsjagd]] (ARDF), die Peilkennungen MO/MOE/MOI/MOS/MOH/MO5, DX-Pedition, DXCC und SSTV (Rapport im Bild) beschreiben',
  ],
  needs: [],
  blocks: [
    {
      id: 'intro', type: 'text', title: 'Wenn aus dem QSO ein Sport wird',
      md: `
Ein normales QSO ist ein Gespräch. Aber Funkamateure haben viele Wege erfunden, das Hobby als **Spiel** zu betreiben: möglichst weite Verbindungen (**DX**), möglichst seltene Länder (**DX-Peditionen**), möglichst viele Verbindungen in kurzer Zeit (**Contest**), oder Sender im Wald finden (**Fuchsjagd**). Dafür haben sich eigene **Betriebsverfahren** entwickelt — und die gehören zu den Betriebskenntnissen der Prüfung. Die Grundregel bleibt: Ist ein Anruf an eine Gruppe gerichtet, antwortet nur, wer dazugehört.
`,
    },
    {
      id: 'dx', type: 'text', title: 'DX: Große Entfernung',
      md: `
**DX** ist die Abkürzung für „[[dx|long distance]]“ — eine **Funkverbindung über große Entfernung**; sie stammt aus der Morsetelegrafie. Was „groß“ heißt, hängt vom Band ab:[^darc-50ohm]

- **[Kurzwelle](wiki:Kurzwelle|High frequency)**: „CQ DX“ sucht Kontakt zu einem **anderen Kontinent**. Wer auf demselben Kontinent sitzt (in Deutschland: ganz Europa), antwortet **nicht**. Das gilt auch nachts im 80-m-Band: „CQ DX“ auf 3790 kHz richtet sich nur an andere Kontinente — nicht an den Nahbereich und nicht an „Stationen mit dem Präfix DX“ (DX ist übrigens kein Landeskenner, **DU–DZ** sind die [Philippinen](wiki:Philippinen|Philippines)).
- **VHF/UHF** (2 m, 70 cm): Andere Kontinente erreicht man kaum. Hier heißt DX **erkennbar einige hundert Kilometer** Entfernung. Wer näher dran ist, antwortet nicht; eine feste Grenze wie „höchstens 500 km“ gibt es nicht, ebenso wenig die Bedingung „außereuropäisch“.

Möchte jemand ein **bestimmtes Land**, ruft er den Landeskenner: **„CQ VK/ZL“** sucht Australien und Neuseeland, **„CQ DL“** Deutschland. Ein Anruf von einer 4U1ITU-Station mit „CQ VK/ZL“ gilt dir nicht, wenn du nicht dort sitzt. Und ruft ein „CQ DL“ aus den USA (N4EAX), will er einen Funkamateur in **Deutschland**, nicht jemanden, dessen Rufzeichen mit D oder L beginnt.

Internationale Verbindungen laufen fast immer auf **Englisch**. Auf den Anruf von EA6VQ antwortet DF1KW richtig mit „**EA6VQ, this is DF1KW calling you**“ — nicht mit „CQ … for EA6VQ“ (das wäre ein neuer allgemeiner Anruf) und nicht mit „QRZ“ (das fragt, *wer mich ruft*).

Bleibt ein CQ-DX-Ruf lange unbeantwortet, ruft man einfach normal „CQ“ und spricht mit Stationen aus der Umgebung.
`,
    },
    {
      id: 'viz-ruf', type: 'viz', viz: 'dx-ruf-trainer', title: 'Was bedeutet der Anruf?',
      params: { count: 8, need: 7 },
      task: 'Beantworte **7 von 8** Anrufen richtig.',
      caption: 'Aus dem Fragenkatalog abgeleitete Szenarien zu CQ-Rufen, Pile-up, Split, Contest und SSTV.',
    },
    {
      id: 'dxped', type: 'text', title: 'DX-Peditionen und DXCC',
      md: `
Manche Länder sind nur schwer zu erreichen: kleine Inseln wie die [Bouvetinsel](wiki:Bouvetinsel|Bouvet Island), unbewohnte Felsen, Gebiete ohne Funkamateure. Eine Gruppe, die dorthin reist, um Funkbetrieb zu machen, betreibt eine **[DXpedition](wiki:DXpedition|DX-pedition)**: eine **Amateurfunkexpedition zu Ländern oder Inseln, die selten im Amateurfunk zu hören sind** (und nicht, wie falsch geraten wird, eine Aktivitätswoche, ein Wettbewerb oder eine Ländersammlung).[^darc-50ohm]

Warum der Aufwand? Weil es **Diplomprogramme** gibt. Das bekannteste ist der **[DX Century Club](wiki:DX Century Club|DX Century Club) (DXCC)**: Für die Aufnahme braucht man **bestätigte Funkverbindungen mit mindestens 100 verschiedenen Ländern**. Für die letzten fehlenden Länder warten Sammler auf DX-Peditionen — und dann entsteht das, was die Prüfung „Pile-up“ nennt. Informationen über gerade aktive Stationen verbreiten sich über **[DX-Cluster](wiki:DX-Cluster|DX cluster)**: Plattformen, auf denen Funkamateure Rufzeichen und Frequenz melden.[^darc-50ohm]
`,
    },
    {
      id: 'pileup', type: 'text', title: 'Pile-up: alle rufen gleichzeitig',
      md: `
Ruft eine seltene Station auf Kurzwelle, spricht sich das über das [Internet](wiki:Internet|Internet) in Minuten herum — und plötzlich rufen **Dutzende oder Hunderte gleichzeitig**. Ein **Pile-up** (to pile up = sich auftürmen) ist das **gleichzeitige Anrufen einer begehrten Station durch viele Amateurfunkstellen**, nicht das Senden auf mehreren Frequenzen oder ein Peilverfahren.[^darc-50ohm]

Die seltene Station versteht dann kaum ein Rufzeichen. Deshalb gibt es Techniken, um Ordnung zu schaffen:

- **Aufruf nach Ziffern**: „**only number 5**“ — nur Rufzeichen mit der Ziffer 5 zwischen Präfix und Suffix (DL**5**ABC) rufen; dann antworten im Schnitt nur noch rund ein Zehntel. Die Ziffern werden der Reihe nach aufgerufen.
- **Aufruf nach Land oder Kontinent**: „Asia only“, „VK/ZL only“.
- **Listenbetrieb**: Eine **gut hörbare andere Station** nimmt Kontaktwünsche in eine Liste und ruft die Stationen später zur seltenen Station auf.
- **Split-Betrieb**: Die seltene Station hört **auf einer anderen Frequenz**, als sie sendet.

Und die Etikette: **Zuerst zuhören**, bis du verstanden hast, wie die Station arbeitet. Nicht dort rufen, wo sie sendet. Nicht rufen, solange sie jemand anderen aufruft.
`,
    },
    {
      id: 'split', type: 'text', title: 'Split-Betrieb: Hören und Senden getrennt',
      md: `
Beim **Split-Verkehr** (nicht zu verwechseln mit „mehr als ein Funkgerät“, „Frequenzteilung zwischen Relais“ oder „verschiedenen Übertragungsverfahren in einem QSO“) **empfängt die begehrte Station auf einer anderen Frequenz, als sie sendet**. So bleibt sie selbst klar zu hören und geht nicht im Pile-up unter.

Die Ansage steht am Ende des CQ-Rufs, **immer in kHz**:

- **„5 up“**: Die Station hört **5 kHz oberhalb** ihrer Sendefrequenz. Sendet sie auf 28410 kHz, rufst du auf **28415 kHz** — und hörst weiter auf 28410 kHz, damit du mitbekommst, wen sie aufruft.
- **„split up 28420 to 28430“** oder kurz **„tuning 420 to 430 up“**: Die Station hört **auf immer wieder wechselnden Frequenzen** im Bereich 28420–28430 kHz. Du suchst dir eine Frequenz in diesem Bereich und rufst dort. Niemand weiß, wo sie gerade hört — nur ein Teil des Pile-ups trifft die richtige Frequenz, und genau das ist der Trick.
- **„tuning 290 to 300 up“** auf 14205 kHz: Du **rufst zwischen 14290 und 14300 kHz** und **hörst auf 14205 kHz**.

Mit dem **Doppel-VFO** am Transceiver legst du Hören (VFO A) und Rufen (VFO B) getrennt an und schaltest den Split ein.
`,
    },
    {
      id: 'viz-split', type: 'viz', viz: 'pileup-split', title: 'Pile-up-Simulator: Split richtig einstellen',
      params: {},
      task: 'Beantworte die Ansage **„N up“** und einen **Hörbereich** richtig — und erlebe einmal den typischen Fehler (auf der DX-Frequenz rufen).',
      caption: 'Stelle „Ich höre auf“ und „Ich rufe auf“ ein und tippe auf „Anrufen“.',
    },
    {
      id: 'num-split', type: 'numeric', title: 'Split ausrechnen',
      question: 'Eine DX-Station sendet auf **28410 kHz** und beendet den Anruf mit **„5 up“**. Auf welcher Frequenz (kHz) rufst du?',
      answer: 28415, tolerance: 0, unit: 'kHz',
      explain: '28410 kHz + 5 kHz = 28415 kHz. Hören bleibst du auf 28410 kHz.',
    },
    {
      id: 'warn-split', type: 'callout', tone: 'warning', title: 'Typische Fehlvorstellungen zu Split',
      md: `
- „**split up 14270 to 14280**“ kündigt einen **Wechsel der eigenen Sendefrequenz** an — Nein, es sagt, **wo sie hört**.
- „**5 up**“ = 5 Minuten später oder fünfter in der Reihe — Nein: **5 kHz höher** rufen.
- „Die Station **sendet** 5 kHz höher“ — Nein, sie **hört** dort.
- „Ich rufe und höre zwischen 14290 und 14300“ — Nein: **rufen** im Bereich, **hören** auf der Sendefrequenz der Station.
- „Bei Split bittet die Station um **CW** im Bereich“ oder „sendet mit **10 kHz Bandbreite**“ — hat nichts mit Split zu tun.
`,
    },
    {
      id: 'contest', type: 'text', title: 'Contest: Wettlauf um QSOs',
      md: `
Ein **Contest** ist ein Amateurfunkwettbewerb: Ziel ist es, **in begrenzter Zeit möglichst viele Funkverbindungen** herzustellen. Er dient dem **sportlichen Wettkampf** und der **stetigen Verbesserung von Station und Betriebstechnik**, nicht dem Gewinn von Preisgeld, nicht der Erlangung eines Zeugnisses und nicht dem Testen von Nachbargeräten.[^darc-50ohm]

Die Regeln stehen in der **Ausschreibung** des Veranstalters: Zeitraum, Bänder, Betriebsarten, **was im QSO ausgetauscht werden muss** und wie gewertet wird. Typische Bausteine: Rufzeichen, Rapport und **fortlaufende Nummer** (oder Locator, Alter …).

- Weil jede Sekunde zählt, wird der **Austausch extrem kurz** gehalten (nur Rufzeichen und die geforderten Daten). Das ist der Grund — nicht eine Zeitbegrenzung je QSO, nicht Disqualifikationsangst und nicht, dass „alles im Internet steht“. Du übermittelst genau die **in der Ausschreibung festgelegten Daten**, nicht „Name, Standort und Stationsbeschreibung“, und du lässt auch nichts weg (sonst wird die Verbindung nicht gewertet oder es gibt Punktabzug).
- Anrufe enthalten den Hinweis **„Contest“**, in [Telegrafie](wiki:Telegrafie|Telegraphy) **„TEST“**: „CQ FD DD4UQ/P TEST“ ist ein CQ im **[Fieldday](wiki:Fieldday|Field Day (amateur radio))-Contest** (FD) von einer portablen Station. „TEST“ heißt in Telegrafie **nicht**, dass jemand seine Antenne testet.
- Im **Sprint-Contest** darf man nicht auf einer Frequenz verweilen: Nach jedem QSO **überlässt die CQ rufende Station die Frequenz der Gegenstation** und sucht sich eine neue.

Auch **Contest-Stationen** sind Amateurfunkstellen mit allen Pflichten: Rufzeichen, Bandpläne, Leistungsgrenzen. Bei manchen Contesten (wie dem Fieldday der IARU Region 1) kommt man nur mit einer Portabelstation in die Wertung.[^darc-50ohm]
`,
    },
    {
      id: 'match-technik', type: 'match', prompt: 'Welche Technik ist gemeint?',
      pairs: [
        ['only number 3', 'Nur Rufzeichen mit Ziffer 3 zwischen Präfix und Suffix rufen'],
        ['Asia only', 'Nur Stationen aus Asien rufen'],
        ['Listenbetrieb', 'Eine Hilfsstation sammelt Anrufer in einer Liste und ruft sie später auf'],
        ['5 up', 'Die DX-Station hört 5 kHz über ihrer Sendefrequenz'],
        ['CQ FD … TEST', 'Teilnahme am Fieldday-Contest'],
        ['Sprint-Contest', 'Nach jedem QSO die Frequenz der Gegenstation überlassen'],
      ],
    },
    {
      id: 'ardf', type: 'text', title: 'Fuchsjagd (ARDF)',
      md: `
Bei der **Fuchsjagd** — fachlich **A**mateur **R**adio **D**irection **F**inding, [Amateurfunkpeilen](wiki:Amateurfunkpeilen|Amateur radio direction finding) — sucht man **versteckte Kleinsender** („Füchse“) mit **tragbaren Peilempfängern** ([Funkpeilung](wiki:Funkpeilung|Direction finding)) und läuft sie zu Fuß an — ähnlich einem [Orientierungslauf](wiki:Orientierungslauf|Orienteering). Es ist ein **Peilwettbewerb** im KW- oder UKW-Bereich; die Sender strahlen nur kurzzeitig, im **zeitlichen Wechsel**. Gewonnen hat, wer alle Füchse gefunden hat und als Erster im Ziel ist.[^darc-50ohm] Es ist also kein Funkwettbewerb um Länder, kein Verfolgen mobiler Sender „zum Mustererkennen“ und nicht nur für SWLs (Hörer ohne Zulassung).

Die Füchse nennen sich nicht mit Rufzeichen, sondern senden **Kennungen**, die die Bundesnetzagentur für **leistungsschwache Sender zu Peilzwecken** vorgesehen hat: **MO, MOE, MOI, MOS, MOH, MO5** (Rufzeichenplan Nr. 6). Dann darf die Rufzeichennennung entfallen (§ 11 Abs. 2 [AFuV](wiki:Amateurfunkverordnung)).[^afuv][^bnetza-rufzeichenplan] Sie bestehen nur aus langen Tönen (M, O) oder nur aus kurzen (E, I, S, H, 5) — man kann sie langsam mitzählen, ohne Morse zu beherrschen.[^darc-50ohm] Eine besondere Variante ist die **Mobilfuchsjagd** aus Fahrzeugen heraus.
`,
    },
    {
      id: 'sstv', type: 'text', title: 'SSTV: Bilder per Funk',
      md: `
Neben Sprache und Text lassen sich auch **stehende Bilder** übertragen: **[Slow Scan Television](wiki:Slow Scan Television|Slow-scan television) (SSTV)**, ein Amateurfunk-Eigengewächs, erstmals 1958 von amerikanischen Funkamateuren praktiziert. Die Bilder sind niedrig aufgelöst — meist Fotos vom Shack, der Antenne oder der Umgebung. **Rufzeichen und Rapport** stehen **als Text im Bild**: Du gibst den Rapport also, indem du ihn **direkt in das zu übertragende Bild schreibst** — nicht später auf der QSL, nicht in CW danach und nicht per SSB währenddessen.[^darc-50ohm]

Bei Bildübertragungen gilt das **RSV-System**: R und S wie gewohnt, **V** für die Bildqualität (1 = nur Synchronisation, 2 = großes Rufzeichen lesbar, 3 = große Details, 4 = kleine Details, 5 = rauschfrei).
`,
    },
    {
      id: 'video', type: 'video', youtube: 'iVZDwRE4cwg', label: 'Lektion 11 - Betriebsabwicklung', channel: 'DL2YMR',
      why: 'Lektion aus dem Videolehrgang Klasse N (DARC AJW-Umfeld) zum Thema Betriebsabwicklung — als zweite Erklärung zum Nachsehen; der Betrieb ist in allen Klassen gleich.',
    },
    {
      id: 'mission-dx', type: 'callout', tone: 'mission', title: 'Funkpraxis: Dein erster Contest',
      md: `
Sprint-, Fieldday- oder Ortsverbands-Contests sind der beste Einstieg: kurze Austausche, laufende Nummern, viel Gelegenheit, **Rufzeichen schnell zu erkennen**. Klasse E reicht — nutze 80 m, 15 m, 10 m, 2 m, 70 cm. Hörst du dagegen auf 10 m ein Pile-up um eine DX-Station, hör **erst** zu, bis du die Ansage („5 up“, „tuning …“) verstanden hast — und ruf nie auf der Frequenz der Station selbst.

Prüfungsbezug: BB103–BB105, BD109, BE104–BE116, BE210, BE301–BE313.
`,
    },
    {
      id: 'quiz-dx', type: 'quiz', title: 'DX, Contest, Fuchsjagd',
      question: 'Welche Aussagen sind richtig? (Mehrfachauswahl)',
      options: [
        { text: 'Auf Kurzwelle bedeutet „CQ DX“: Verbindung zu anderen Kontinenten gesucht.', correct: true, why: 'Stationen vom selben Kontinent antworten nicht.' },
        { text: 'Im Contest wird der Informationsaustausch kurz gehalten, damit in der Zeit möglichst viele Verbindungen gelingen.', correct: true, why: 'Zeit ist die knappe Ressource.' },
        { text: 'Bei „split up 14270 to 14280“ kündigt die Station einen Wechsel ihrer Sendefrequenz an.', correct: false, why: 'Sie sagt, wo sie hört.' },
        { text: 'Die Kennungen MO, MOE, MOI, MOS, MOH, MO5 werden von Fuchsjagd-Sendern benutzt.', correct: true, why: 'Leistungsschwache Sender zu Peilzwecken, ohne Rufzeichennennung.' },
        { text: 'Eine Fuchsjagd ist ein Funkwettbewerb um möglichst viele Länder in einer vorgegebenen Zeit.', correct: false, why: 'Sie ist ein Peilwettbewerb mit versteckten Kleinsendern.' },
        { text: 'Im SSTV schreibt man den Rapport in das Bild.', correct: true, why: 'Rufzeichen und Rapport stehen als Text im Bild.' },
      ],
    },
    {
      id: 'recall-dx', type: 'recall', title: 'In eigenen Worten',
      prompt: 'Eine DX-Station auf 21295 kHz ruft „CQ DX, tuning 310 to 320 up“. Beschreibe, wo du hörst, wo du rufst, warum die Station das so macht, und wie du bei einem Pile-up zusätzlich vorgehen könntest, wenn sie „only number 2“ sagt.',
      answer: 'Ich höre auf 21295 kHz (dort sendet sie), ich rufe im Bereich 21310–21320 kHz (dort hört sie auf wechselnden Frequenzen). Die Station nutzt Split, damit sie selbst klar zu empfangen bleibt und nicht im Pile-up untergeht; weil niemand weiß, wo genau sie hört, trifft nur ein Teil der Rufer die richtige Frequenz. Bei „only number 2“ rufe ich nur, wenn die Ziffer in meinem Rufzeichen 2 ist, sonst warte ich, bis meine Ziffer aufgerufen wird.',
      cards: ['sp-ansage', 'dx-kw'],
    },
  ],
  cards: [
    { id: 'dx-def', front: 'DX — Bedeutung?', back: '**Große Entfernung** (long distance).' },
    { id: 'dx-kw', front: '„CQ DX“ auf Kurzwelle / auf VHF-UHF?', back: 'KW: Stationen auf **anderen Kontinenten**. VHF/UHF: Stationen **erkennbar einige hundert km** entfernt.' },
    { id: 'dx-land', front: '„CQ VK/ZL“, „CQ DL“?', back: 'Gezielter Anruf nach **Landeskenner**: Australien/Neuseeland, Deutschland. Nur diese antworten.' },
    { id: 'dx-pedition', front: 'DX-Pedition? DXCC?', back: 'Funkexpedition zu **seltenen Ländern/Inseln**. **DXCC**: bestätigte Verbindungen mit **mindestens 100 Ländern**.' },
    { id: 'pileup-def', front: 'Pile-up?', back: 'Gleichzeitiges Anrufen einer **begehrten Station** durch viele Amateurfunkstellen.' },
    { id: 'pileup-tech', front: 'Techniken gegen das Pile-up?', back: 'Aufruf **nach Ziffern** („only number 3“), **nach Land/Kontinent**, **Listenbetrieb**, **Split-Betrieb**.' },
    { id: 'sp-def', front: 'Split-Betrieb?', back: 'Die begehrte Station **empfängt auf einer anderen Frequenz**, als sie sendet.' },
    { id: 'sp-ansage', front: '„5 up“ / „tuning 290 to 300 up“ bei Sendefrequenz 14205 kHz?', back: '„5 up“: **rufen** 5 kHz höher (14210). „tuning 290 to 300 up“: **rufen** zwischen 14290 und 14300, **hören** auf 14205.' },
    { id: 'ct-zweck', front: 'Zweck eines Contests; Austausch?', back: 'Sportlicher Wettkampf und **Verbesserung von Anlagen und Betriebstechnik**; Austausch **kurz**, genau die in der **Ausschreibung** festgelegten Daten.' },
    { id: 'ct-test', front: '„TEST“ im CQ-Ruf in Telegrafie?', back: 'Teilnahme an einem **Contest** (z. B. „CQ FD DD4UQ/P TEST“ = Fieldday-Contest). Kein Antennentest.' },
    { id: 'ct-sprint', front: 'Sprint-Contest: Besonderheit?', back: 'Nach jedem QSO **überlässt die CQ rufende Station die Frequenz** der Gegenstation.' },
    { id: 'ardf-def', front: 'Fuchsjagd (ARDF)?', back: '**Peilwettbewerb** mit versteckten Kleinsendern (KW/UKW) und tragbaren Peilempfängern; Sender im zeitlichen Wechsel.' },
    { id: 'ardf-kennung', front: 'Kennungen leistungsschwacher Peilsender?', back: '**MO, MOE, MOI, MOS, MOH, MO5** (Rufzeichennennung entfällt).' },
    { id: 'sstv-rapport', front: 'SSTV: Rapport?', back: 'Wird **direkt in das zu übertragende Bild geschrieben**. RSV: V = Bildqualität 1–5.' },
  ],
};
