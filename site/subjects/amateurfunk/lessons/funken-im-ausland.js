export default {
  id: 'funken-im-ausland',
  title: 'Funken im Ausland: CEPT und Gastzulassung',
  summary: 'CEPT-Empfehlungen T/R 61-01 und ECC (05)06, HAREC, das Gast-Präfix vor dem Heimatrufzeichen, die 3-Monats-Regel und was in Ländern ohne CEPT-Regelung gilt.',
  minutes: 20,
  goals: [
    'Die CEPT-Dokumente (T/R 61-01, T/R 61-02, ECC (05)06, ERC Report 32) einordnen und sagen, was sie regeln',
    'Das Rufzeichen im Gastland korrekt bilden (Gast-Präfix + „/“ bzw. „stroke“ + Heimatrufzeichen) und das für Deutschland (DL/, DO/) anwenden',
    'Die Voraussetzungen kennen: kein fester Wohnsitz, bis zu drei Monate je Aufenthalt, Regeln des Gastlandes, nur persönliche Rufzeichen, Klasse N nur in Deutschland',
    'Wissen, was zu tun ist, wenn das Land die CEPT-Empfehlung nicht anwendet (Gastzulassung) und wie die Prüfungsanerkennung (HAREC) funktioniert',
  ],
  needs: [],
  blocks: [
    {
      id: 'intro', type: 'text', title: 'Dein Rufzeichen reist mit — aber nicht allein',
      md: `
Deine [[zulassung|Zulassung]] ist ein deutscher Verwaltungsakt. Sobald du die Grenze überschreitest, gilt dort das Recht des **Gastlandes** — und dein Land kann dir nichts gestatten, was im Gastland verboten ist. Damit [Funkamateure](wiki:Funkamateur|Amateur radio operator) trotzdem im Urlaub funken können, haben viele Staaten ein Abkommen geschlossen: Es regelt **Funkbetrieb bei vorübergehendem Aufenthalt im Ausland** und die **gegenseitige Anerkennung von Prüfungszeugnissen**. Ausgearbeitet hat es die **[CEPT](wiki:CEPT|European Conference of Postal and Telecommunications Administrations)**, die Europäische Konferenz der Verwaltungen für Post und Telekommunikation.[^bnetza-amateurfunk]

Die CEPT ist **kein [EU](wiki:Europäische Union|European Union)-Organ**: Mitglieder sind sehr viele europäische Staaten — und nicht alle setzen die Amateurfunk-Regeln um. Umgekehrt wenden auch Staaten außerhalb der CEPT sie teilweise oder ganz an, z. B. die [USA](wiki:Vereinigte Staaten|United States) und [Australien](wiki:Australien|Australia). Wichtig ist deshalb nicht „CEPT-Mitglied?“, sondern: **Setzt das Land die Empfehlung um?** Das DARC-Auslandsreferat führt dazu eine CEPT-Länderliste.[^darc-50ohm]
`,
    },
    {
      id: 'dokumente', type: 'text', title: 'Die CEPT-Dokumente im Überblick',
      md: `
Du musst sie nicht auswendig kennen, aber **was wofür gilt**, sollte sitzen:[^darc-50ohm]

<table>
<thead><tr><th>Dokument</th><th>Was es regelt</th></tr></thead>
<tbody>
<tr><td>**T/R 61-01** (CEPT-Lizenz)</td><td>**kurzzeitiger Betrieb** im Ausland — deutsche Klasse **A**</td></tr>
<tr><td>**ECC (05)06** (CEPT-Novice)</td><td>kurzzeitiger Betrieb im Ausland — deutsche Klasse **E**</td></tr>
<tr><td>**T/R 61-02** (**HAREC**)</td><td>**gegenseitige Anerkennung** von Zeugnissen, z. B. bei Umzug; Lehrplan — Klasse **A**</td></tr>
<tr><td>**ERC Report 32**</td><td>Novice-Prüfungsniveau (Lehrplan), erleichtert eine Novice-Individualgenehmigung — Klasse **E**</td></tr>
<tr><td>ECC Report 89</td><td>Entry-Level-Lehrplan — Klasse **N**</td></tr>
</tbody>
</table>

Zwei Merksätze: **61-01 / (05)06 = kurz zu Besuch**, **61-02 / HAREC = umziehen und bleiben**. Ein **[HAREC](wiki:HAREC|Amateur radio international operation)** ist die harmonisierte Prüfungsbescheinigung; das deutsche **Zeugnis der Klasse A** erfüllt sie. Es ist *keine* Genehmigung für Kurzaufenthalte (das ist T/R 61-01) und nicht Klasse E (das ist ECC (05)06 / ERC Report 32), und es hat nichts mit der freiwilligen Morseprüfung zu tun.[^bnetza-amateurfunk]

Die Empfehlungen bilden damit die Grundlage für **vorübergehenden Amateurfunkbetrieb** und die **gegenseitige Anerkennung von Zeugnissen** in den umsetzenden Ländern — nicht für weltweite Anerkennung, nicht für die Harmonisierung der Frequenzzuweisungen und nicht für den Warenverkehr mit Funkgeräten.
`,
    },
    {
      id: 'bedingungen', type: 'text', title: 'Was die CEPT-Lizenz erlaubt — und was nicht',
      md: `
Wenn das Gastland die Empfehlung umgesetzt hat, darfst du mit deinem **persönlichen** Rufzeichen funken — unter diesen Bedingungen:[^bnetza-amateurfunk]

- **Nicht ansässig:** Du hast dort **keinen festen Wohnsitz**.
- **Vorübergehend:** bis zu **3 Monate je Aufenthalt** (die Gültigkeit kann je Gastland zwischen 1 und 3 Monaten liegen; nicht 6 Monate, 9 Monate oder ein Jahr).
- **Regeln des Gastlandes:** Es gelten **die Empfehlung und die Vorschriften des Gastlandes**: Leistung, Bänder, Auflagen für Personenschutz, Schiffe und Flugzeuge. Nur weil in Deutschland das 6-m-Band für Klasse A freigegeben ist, darfst du es im Ausland nicht automatisch nutzen. Du musst dich **dem Gastland anpassen** — nicht den Regeln deines Heimatlandes.
- **Nur persönliche Rufzeichen:** Die Empfehlungen gelten für personengebundene Rufzeichen. Eine deutsche **Klubstation** im Ausland braucht immer eine **Gastgenehmigung**, egal ob sie ortsfest ist oder nicht, und auch dann, wenn die [Bundesnetzagentur](wiki:Bundesnetzagentur|Federal Network Agency) vorher informiert wird.
- **Klassen:** Klasse **A** → T/R 61-01. Klasse **E** → ECC (05)06. Die **Klasse N** ist (Stand 05.10.2026) **nur in Deutschland gültig**: Deutschland hat sie bisher nicht als Entry-Level-Lizenz der CEPT gemeldet.[^darc-50ohm] Das gilt unabhängig davon, ob das Land in der EU liegt.

Eine **Novice-Genehmigung** gilt zudem nur in Ländern, die die ECC-Empfehlung (05)06 umgesetzt haben, und auch nur, wenn man dort keinen festen Wohnsitz hat. Ebenso gilt T/R 61-01 nur dort, wo sie umgesetzt ist — nicht in „allen CEPT-Ländern“ und nicht nur in EU-Staaten.
`,
    },
    {
      id: 'praefix', type: 'text', title: 'Das Rufzeichen im Gastland',
      md: `
Im Gastland funkst du mit deinem **[Heimatrufzeichen](wiki:Amateurfunkrufzeichen|Amateur radio call signs)**, aber **das Präfix des Gastlandes kommt davor**, getrennt durch „/“ in [Telegrafie](wiki:Telegrafie|Telegraphy) oder das Wort **„stroke“** in Telefonie — auch in digitalen Betriebsarten.[^bnetza-amateurfunk] Welches Präfix gilt, legen die Empfehlungen je Land fest und kann je nach Klasse verschieden sein. In der **[Schweiz](wiki:Schweiz|Switzerland)** zum Beispiel:

- Klasse A: **HB9/** — also **HB9/DL9MJ** („Hotel Bravo Nine stroke Delta Lima Nine Mike Juliett“).
- Klasse E: **HB3/** — also **HB3/DO7PR**.

Falsch wären **DL9MJ/HB9** (Zusatz hinten) oder **HB9/DO7PR** (Klasse E mit dem A-Präfix) oder **DL9MJ/HB3**.

Umgekehrt in **Deutschland**: Ein Gast mit CEPT-Lizenz setzt **DL/** (Klasse A, T/R 61-01) bzw. **DO/** (Klasse E, ECC (05)06) vor sein Heimatrufzeichen. Wenn du also **DL/G3MM** hörst, funkt der **englische Funkamateur G3MM aufgrund der CEPT-Empfehlungen vorübergehend** in Deutschland — nicht dauerhaft, nicht aufgrund einer Gastzulassung und nicht wegen der [Radio Regulations](wiki:Radio Regulations|ITU Radio Regulations). Ein Gast mit Klasse-A-Rechten darf in Deutschland die Rechte der deutschen **Klasse A** nutzen, ein Novice-Gast die Rechte der **Klasse E** (§ Anlage 1 AFuV).[^bnetza-amateurfunk] **DE/** und **DP/** gibt es als Gast-Präfixe nicht (DP-Rufzeichen sind exterritoriale deutsche Stationen).[^bnetza-rufzeichenplan]
`,
    },
    {
      id: 'viz-gast', type: 'viz', viz: 'gast-rufzeichen', title: 'Gast-Rufzeichen-Baukasten',
      params: {},
      task: 'Bilde **HB9/DL9MJ** (Klasse A, Schweiz) und **HB3/DO7PR** (Klasse E, Schweiz), finde die Fälle **Klasse N** und **Klubstation im Ausland** (nicht möglich) und bilde als Gast in Deutschland **DL/…** und **DO/…**.',
      caption: 'Vereinfachter Entscheidungsbaum nach CEPT T/R 61-01, ECC (05)06 und BNetzA-Hinweisen.',
    },
    {
      id: 'video', type: 'video', youtube: 'KMxUv8N_F70', label: 'Lektion 04 - Internationaler Funkbetrieb', channel: 'DL2YMR',
      why: 'Lektion aus dem Videolehrgang Klasse N (DL2YMR) zum internationalen Funkbetrieb — als zweite Erklärung zum Nachsehen; CEPT-Stoff und Rufzeichenzusätze sind in Klasse E dieselben.',
    },
    {
      id: 'warn-ausland', type: 'callout', tone: 'warning', title: 'Typische Fehlvorstellungen',
      md: `
- „Die Klasse N gilt in der **EU**“ oder „in allen **CEPT-Ländern**, wenn ich mich ans **Heimatland** / **Gastland** halte“ — Nein: **nur in Deutschland**.
- „Mit der CEPT-Lizenz kann ich in **allen CEPT-Ländern** funken“ — Nein, nur in Ländern, die die Empfehlung **umgesetzt** haben (und wenn kein fester Wohnsitz).
- „Ich halte mich im Ausland an **meine deutschen Regeln**“ oder „in der EU gelten die **gleichen Gesetze wie in Deutschland**“ — Nein: **Gastlandregeln** gelten; z. B. Leistung und Bänder (6 m!).
- „CEPT-Empfehlungen gelten **nur für CEPT-Mitglieder**“ / „sind **weltweit** von der ITU für allgemeingültig erklärt“ — Beides falsch: Auch Nicht-CEPT-Länder wie USA oder Australien können sie anwenden; die ITU hat sie nicht für allgemeingültig erklärt.
- „In Nicht-CEPT-Ländern darf ich **nichts** / **automatisch** wegen eines Gegenseitigkeitsabkommens / wenn das Land die **IARU-Empfehlungen** anwendet“ — Nein: Du beantragst bei der Behörde des Landes eine **Gastzulassung** (nicht bei der BNetzA).
- „**/DL** oder **/DO** hinten anhängen“ — Das Präfix steht **vorne**, mit „stroke“/„/“.
`,
    },
    {
      id: 'match-pfx', type: 'match', prompt: 'Welches Rufzeichen passt zu welcher Situation?',
      pairs: [
        ['HB9/DL9MJ', 'Klasse A aus Deutschland, in der Schweiz (T/R 61-01)'],
        ['HB3/DO7PR', 'Klasse E aus Deutschland, in der Schweiz (ECC (05)06)'],
        ['DL/G3MM', 'Englischer Funkamateur mit CEPT-Lizenz zu Gast in Deutschland'],
        ['DO/G3MM', 'Englischer Funkamateur mit CEPT-Novice-Lizenz zu Gast in Deutschland'],
      ],
    },
    {
      id: 'num-monate', type: 'numeric', title: 'Wie lange?',
      question: 'Bis zu wie vielen **Monaten** darf ein Funkamateur je Aufenthalt vorübergehend im Ausland funken, wenn die CEPT-Regelung angewendet wird?',
      answer: 3, tolerance: 0, unit: 'Monate',
      explain: 'Bis zu 3 Monate je Aufenthalt (je nach Gastland ggf. 1–3 Monate); danach beim Gastland eine Genehmigung beantragen.',
    },
    {
      id: 'quiz-cept', type: 'quiz', title: 'CEPT: richtig oder nur plausibel?',
      question: 'Welche Aussagen sind richtig? (Mehrfachauswahl)',
      options: [
        { text: 'Die CEPT-Novice-Prüfungsbescheinigung kann die Erteilung einer Novice-Individualgenehmigung in einem anderen Land vereinfachen.', correct: true, why: 'Ohne dass es dafür ein Beitrittsverfahren gibt (ERC Report 32).' },
        { text: 'Das deutsche Klasse-A-Zeugnis entspricht dem HAREC nach T/R 61-02.', correct: true, why: 'Es ist gleichzeitig eine HAREC-Bescheinigung.' },
        { text: 'Mit einer deutschen Zulassung der Klasse E darf man in jedem CEPT-Land senden.', correct: false, why: 'Nur in Ländern, die ECC (05)06 umgesetzt haben, ohne festen Wohnsitz.' },
        { text: 'Für den vorübergehenden Betrieb einer deutschen Klubstation im CEPT-Land genügt die Mitteilung an die Außenstelle der BNetzA.', correct: false, why: 'Klubstationen brauchen immer eine Gastgenehmigung.' },
        { text: 'In einem Land, das die CEPT-Empfehlung nicht anwendet, beantragst du eine Gastzulassung bei der dortigen Behörde.', correct: true, why: 'Sonst gibt es keine Betriebserlaubnis.' },
        { text: 'Die Klasse N ist in der gesamten EU gültig.', correct: false, why: 'Sie gilt nur in Deutschland.' },
      ],
    },
    {
      id: 'order-reise', type: 'order', title: 'Vor dem Urlaub',
      prompt: 'Bringe die Planungsschritte vor einer Funkreise in eine sinnvolle Reihenfolge.',
      items: [
        'Klasse prüfen (A → T/R 61-01, E → (05)06, N → nicht im Ausland)',
        'Prüfen, ob das Reiseland die Empfehlung umsetzt (CEPT-Länderliste)',
        'Gast-Präfix und Regeln des Gastlandes heraussuchen (Bänder, Leistung)',
        'Rufzeichen mit Präfix und „stroke“ einüben',
        'Aufenthalt ≤ 3 Monate einhalten',
      ],
      explain: 'Zuerst Klasse und Land prüfen, dann die Details des Gastlandes, dann üben; die Dauer begrenzt den Aufenthalt.',
    },
    {
      id: 'mission-urlaub', type: 'callout', tone: 'mission', title: 'Funkpraxis: Urlaubsfunk',
      md: `
Mit Klasse E im Urlaub in der Schweiz oder in Österreich: Handfunkgerät oder QRP-Kurzwelle mitnehmen, in der CEPT-Länderliste nachsehen, **das richtige Präfix** wählen (HB3 statt HB9!) und die **lokale Leistungsgrenze** beachten. Wer ohne Zulassung einreist, hört einfach zu — Empfangen ist überall unproblematisch. Und wer nur durch ein Land fährt, in dem die Zulassung nicht anerkannt ist: vorher klären, ob Funkgeräte transportiert werden dürfen.[^darc-50ohm]

Prüfungsbezug: VB101–VB114, BD212–BD214.
`,
    },
    {
      id: 'recall-ausland', type: 'recall', title: 'In eigenen Worten',
      prompt: 'Du hast Klasse E (Rufzeichen DO7PR) und willst zwei Wochen in der Schweiz funken. Was brauchst du, wie meldest du dich, welche Einschränkung gilt, und was wäre anders, wenn du Klasse N hättest oder im selben Urlaub mit der Klubstation deines Ortsverbands funken wolltest?',
      answer: 'Ich brauche keine weitere Genehmigung, weil die Schweiz die ECC-Empfehlung (05)06 anwendet (kurzer Aufenthalt, kein fester Wohnsitz, unter 3 Monaten). Ich nenne HB3/DO7PR (Telefonie: „HB3 stroke DO7PR“). Es gelten die Vorschriften des Gastlandes (z. B. Leistung/Bänder), nicht automatisch die deutschen. Mit Klasse N dürfte ich im Ausland gar nicht senden (nur in Deutschland gültig). Eine deutsche Klubstation im Ausland braucht immer eine Gastgenehmigung.',
      cards: ['cept-praefix', 'cept-n'],
    },
  ],
  cards: [
    { id: 'cept-dokumente', front: 'T/R 61-01, ECC (05)06, T/R 61-02, ERC Report 32?', back: '**T/R 61-01**: CEPT-Lizenz (Klasse A), kurzzeitiger Betrieb. **ECC (05)06**: CEPT-Novice (Klasse E), kurzzeitig. **T/R 61-02**: HAREC, gegenseitige Anerkennung von Zeugnissen. **ERC Report 32**: Novice-Prüfungsniveau.' },
    { id: 'cept-harec', front: 'HAREC?', back: 'Harmonised Amateur Radio Examination Certificate (T/R 61-02): bescheinigt die Prüfung der Klasse A; damit vereinfachte Zulassung in beteiligten Ländern. Das deutsche Klasse-A-Zeugnis ist ein HAREC.' },
    { id: 'cept-basis', front: 'Wofür bilden die CEPT-Empfehlungen die Grundlage?', back: 'Für **vorübergehenden Amateurfunkbetrieb** und die **gegenseitige Anerkennung** von Zeugnissen in den **umsetzenden** Ländern.' },
    { id: 'cept-dauer', front: 'Wie lange je Aufenthalt nach CEPT?', back: '**Bis zu 3 Monate** je Aufenthalt, ohne festen Wohnsitz im Gastland.' },
    { id: 'cept-regeln', front: 'Welche Regeln gelten im Gastland?', back: 'Die **CEPT-Empfehlung** *und* die **Bestimmungen/Auflagen des Gastlandes** (Leistung, Bänder, z. B. 6 m).' },
    { id: 'cept-praefix', front: 'Rufzeichen im Gastland bilden?', back: '**Gast-Präfix + „/“ (Telegrafie) bzw. „stroke“ (Telefonie) + Heimatrufzeichen**; Beispiel Schweiz: **HB9/DL9MJ** (A), **HB3/DO7PR** (E).' },
    { id: 'cept-gast-de', front: 'Gäste in Deutschland: Präfix?', back: '**DL/** (Klasse A, T/R 61-01) bzw. **DO/** (Klasse E, (05)06) vor dem Heimatrufzeichen; bis 3 Monate je Aufenthalt. DL/G3MM = Engländer G3MM vorübergehend zu Gast.' },
    { id: 'cept-n', front: 'Klasse N im Ausland?', back: '**Nur in Deutschland gültig** (Stand 05.10.2026).' },
    { id: 'cept-ks', front: 'Klubstation im Ausland?', back: 'Die CEPT-Empfehlungen gelten nur für persönliche Rufzeichen: Klubstation → immer **Gastgenehmigung**.' },
    { id: 'cept-non', front: 'Land ohne CEPT-Regelung?', back: 'Bei der **zuständigen Behörde des Landes** eine **Gastzulassung** beantragen (nicht bei der BNetzA).' },
    { id: 'cept-umzug', front: 'Länger als 3 Monate / dauerhaft im Ausland?', back: 'Genehmigung beim Gastland beantragen, mit **HAREC** vereinfacht (kein neues Examen).' },
    { id: 'cept-nicht-eu', front: 'Gilt CEPT nur in der EU / nur für CEPT-Mitglieder?', back: '**Nein.** CEPT ≠ EU; auch Nicht-Mitglieder (z. B. USA, Australien) wenden die Regeln teilweise an. Entscheidend ist, ob das Land die Empfehlung **umgesetzt** hat.' },
  ],
};
