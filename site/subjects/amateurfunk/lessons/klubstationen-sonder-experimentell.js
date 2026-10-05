export default {
  id: 'klubstationen-sonder-experimentell',
  title: 'Klubstationen, Sonderrufzeichen und experimentelle Studien',
  summary: 'Klubstation (mindestens drei Funkamateure, gemeinsames Rufzeichen), Rufzeichenplan lesen, Sonderrufzeichen für Anlässe, exterritoriale Stationen und Ausnahmen für Experimente.',
  minutes: 20,
  goals: [
    'Die [[klubstation|Klubstation]] nach AFuV definieren und die Voraussetzungen für ein Klubstationsrufzeichen nennen',
    'Wer an einer Klubstation funken darf — und mit welchen Rechten (die niedrigere Klasse gilt)',
    'Aus dem [[rufzeichenplan|Rufzeichenplan]] ablesen, ob ein Rufzeichen Klubstation, Sonderrufzeichen, exterritorial oder für experimentelle Studien ist',
    'Erklären, wofür es Ausnahmen von den Rahmenbedingungen gibt (§ 16 Abs. 2 AFuV)',
  ],
  needs: [],
  blocks: [
    {
      id: 'intro', type: 'text', title: 'Gemeinsam funken: die Klubstation',
      md: `
Die meisten [[funkamateur|Funkamateure]] funken allein, mit ihrem **personengebundenen Rufzeichen** und von ihrem Shack aus. Aber der Amateurfunk lebt auch von Gruppen: Ortsverbände (z. B. des [DARC](wiki:Deutscher Amateur-Radio-Club|Deutscher Amateur-Radio-Club)), Schulen, Jugendgruppen, Contest-Teams. Für sie gibt es die **Klubstation**: Nach § 2 Nr. 3 [[afuv|AFuV]] ist das eine Amateurfunkstelle, die von Mitgliedern einer Gruppe von **mindestens drei** zum Amateurfunkdienst **zugelassenen Funkamateuren** unter Verwendung eines **gemeinschaftlich genutzten Rufzeichens** betrieben wird.[^afuv]

Zwei Kleinigkeiten, die in der Prüfung gern verdreht werden: Es sind **drei**, nicht vier, und die Gruppe braucht **keinen [eingetragenen Verein](wiki:Eingetragener Verein)** (e. V.) zu sein und keinen exponierten Standort. Auch gilt für die Klubstation nicht das *personengebundene* Rufzeichen der Mitglieder, sondern ein eigenes, gemeinsames **Klubstationsrufzeichen**.
`,
    },
    {
      id: 'zuteilung', type: 'text', title: 'Wie bekommt eine Gruppe ihr Klubstationsrufzeichen?',
      md: `
Das Rufzeichen wird nicht der Gruppe, sondern **einer Person** zugeteilt — dem **Stationsverantwortlichen**. So geht es (§ 14 Abs. 1 AFuV):[^afuv]

1. Die Gruppe von (mindestens drei) Funkamateuren hat einen **Leiter**.
2. Der Leiter **benennt gegenüber der Bundesnetzagentur** einen Funkamateur als **Verantwortlichen** für die Klubstation.
3. Dieser Verantwortliche muss **selbst eine [[zulassung|Zulassung]] zur Teilnahme am Amateurfunkdienst** haben — irgendeiner Klasse. Es ist **nicht** nötig, dass er die höchste Klasse hat, eine bestimmte Zeit zugelassen ist oder gar Betreiber einer Relaisstation ist. Auch muss er nicht der Vereinsvorsitzende sein.
4. Die [Bundesnetzagentur](wiki:Bundesnetzagentur|Federal Network Agency) teilt das **Klubstationsrufzeichen** zu und legt dabei den **Berechtigungsumfang** (die Klasse) der Klubstation fest.
5. **Erst nach der Zuteilung** darf das Rufzeichen benutzt werden. Wer vorher schon sendet, handelt ohne Zuteilung — auch dann, wenn er selbst Zulassung und persönliches Rufzeichen hat.

Zieht der Leiter die Benennung zurück oder löst sich die Gruppe auf, kann die Zuteilung **widerrufen** werden (§ 14 Abs. 2). Auf Antrag des Leiters bestimmt die BNetzA, auf welches Mitglied die Zuteilung übergeht.
`,
    },
    {
      id: 'order-zuteilung', type: 'order', title: 'Der Weg zum Klubstationsrufzeichen',
      prompt: 'Bringe die Schritte in die richtige Reihenfolge.',
      items: [
        'Mindestens drei zugelassene Funkamateure bilden eine Gruppe mit einem Leiter',
        'Der Leiter benennt gegenüber der BNetzA einen zugelassenen Funkamateur als Stationsverantwortlichen',
        'Es wird ein Klubstationsrufzeichen beantragt',
        'Die BNetzA teilt das Rufzeichen zu und legt den Berechtigungsumfang fest',
        'Erst jetzt darf die Klubstation senden',
      ],
      explain: 'Die Zuteilung geht an den benannten Verantwortlichen, nicht an den Verein. Ohne Zuteilung darf das Rufzeichen nicht verwendet werden.',
    },
    {
      id: 'mitbenutzen', type: 'text', title: 'Wer darf an der Klubstation funken — und womit?',
      md: `
Hier gilt das Gegenteil von dem, was viele erwarten: **Jeder Funkamateur mit Zulassung darf an einer Klubstation funken** (§ 14 Abs. 4 AFuV nennt ausdrücklich die Klassen E und N).[^afuv] Er muss

- **nicht Mitglied** der Gruppe sein,
- **keine Klasse** haben, die der Klubstation entspricht,
- **nicht** im Beisein eines Gruppenmitglieds funken,
- **nichts vorher anzeigen** (zwei Tage vorher o. Ä.).

Aber: Jeder bringt seinen eigenen **Berechtigungsumfang** mit, und die Klubstation hat ihren. Es zählt immer die **niedrigere** der beiden Klassen:

<table>
<thead><tr><th>Funkamateur ↓ / Klubstation →</th><th>N</th><th>E</th><th>A</th></tr></thead>
<tbody>
<tr><td>**N**</td><td>N</td><td>N</td><td>N</td></tr>
<tr><td>**E**</td><td>N</td><td>E</td><td>E</td></tr>
<tr><td>**A**</td><td>N</td><td>E</td><td>A</td></tr>
</tbody>
</table>

Beispiel 40 m: Das Band ist nur für Klasse A freigegeben. Ein Klasse-E-Funkamateur darf an einer Klasse-A-Klubstation also **nicht** auf 40 m funken, weil *seine* Klasse nicht reicht. Ein Klasse-A-Funkamateur darf an einer Klasse-E-Klubstation ebenfalls **nicht** auf 40 m, weil *die Station* nur Klasse E hat.[^darc-50ohm] Auf 40 m kommt man nur, wenn **beide** Klasse A haben. Rechte „addieren" sich nie; die Klubstation ist keine Abkürzung zu höheren Klassen.
`,
    },
    {
      id: 'viz-klasse', type: 'viz', viz: 'klubstation-klasse', title: 'Welche Klasse gilt an der Klubstation?',
      params: {},
      task: 'Probiere die Kombinationen aus: **A an E-Klubstation**, **E an A-Klubstation**, **N an A-Klubstation** — und finde die einzige Kombination, mit der 40 m erlaubt sind.',
      caption: 'Leistungen und Bereiche nach Anlage 1 AFuV (Stand 27.05.2024). Gezeigt sind einige Amateurfunkbänder.',
    },
    {
      id: 'warn-klub', type: 'callout', tone: 'warning', title: 'Typische Fehlvorstellungen zu Klubstationen',
      md: `
- „Eine Klubstation braucht **vier** Mitglieder / ist an den **e. V.** gebunden / an einen **exponierten Standort**." — Nein: mindestens **drei** zugelassene Funkamateure, gemeinsames Rufzeichen. Rechtsform und Ort sind egal.
- „Der Verantwortliche muss **Klasse A** haben / **seit 2 Jahren** zugelassen sein / **Vereinsvorsitzender** sein." — Nein: eine **Zulassung** genügt; er wird vom **Leiter der Gruppe benannt**.
- „Nach der Prüfung darf er **nach 3 Monaten** / nach Vorlage einer **HAREC-Bescheinigung** / nach **Standortprüfung durch die BNetzA** funken." — Nein: Zulassung **und** Zuteilung des Klubstationsrufzeichens genügen.
- „An der Klubstation dürfen nur **Mitglieder** funken" oder „nur in **Anwesenheit** eines Mitglieds" — Nein; jeder Funkamateur mit Zulassung darf.
- „Es gilt die **höhere** Klasse" oder „die **persönliche** Klasse" oder „die der **Klubstation**" — Nein: die **niedrigere** von beiden.
- „Standortwechsel sind bei Klubstationen **verboten** / **immer anzuzeigen**." — Nein: **kurzzeitige** Standortwechsel (Fieldday, Messe) müssen **nicht** angezeigt werden; anzeigepflichtig ist nur die **dauerhafte** Verlegung (§ 9 Abs. 4 AFuV).
`,
    },
    {
      id: 'plan', type: 'text', title: 'Den Rufzeichenplan lesen',
      md: `
Welche Art von Station sich hinter einem Rufzeichen versteckt, verrät der **Rufzeichenplan** der Bundesnetzagentur (Vfg. 15/2025, gültig ab 01.04.2025).[^bnetza-rufzeichenplan] Deutsche [Rufzeichen](wiki:Amateurfunkrufzeichen|Amateur radio call signs) bestehen aus einem **Präfix** (zwei Buchstaben von **DA bis DR**, ohne DE und DI), einer **Ziffer** und einem **Suffix** — meist mit zwei oder drei Buchstaben.

Die wichtigsten Reihen (Suffix 2–3 Buchstaben):

<table>
<thead><tr><th>Reihe</th><th>Zweck</th><th>Klasse</th></tr></thead>
<tbody>
<tr><td>DA0, DF0, DK0, DL0</td><td>Klubstationen</td><td>A</td></tr>
<tr><td>DA7</td><td>Klubstationen</td><td>E</td></tr>
<tr><td>DA8</td><td>Klubstationen</td><td>N</td></tr>
<tr><td>DA1, DA2, DB1–DB9, DF1–DF9 … DL1–DL9, DM1–DM9</td><td>personengebunden</td><td>A</td></tr>
<tr><td>DA6, DO1–DO9</td><td>personengebunden</td><td>E</td></tr>
<tr><td>DN9</td><td>personengebunden</td><td>N</td></tr>
<tr><td>DA4</td><td>besondere experimentelle Studien</td><td>E</td></tr>
<tr><td>DA5</td><td>besondere experimentelle Studien</td><td>A</td></tr>
<tr><td>DP0, DP1</td><td>exterritoriale Stationen (u. a.)</td><td>A</td></tr>
<tr><td>DP2</td><td>exterritoriale Stationen (u. a.)</td><td>E</td></tr>
<tr><td>DR1–DR3</td><td>Klubstationen für BOS</td><td>A/E/N</td></tr>
<tr><td>DR4–DR6</td><td>Klubstationen von Notfunkgruppen</td><td>A/E/N</td></tr>
</tbody>
</table>

Das Prinzip kannst du dir merken: **Null in der Ziffer** (DL**0**, DA**0**, DK**0**, DF**0**) ist die klassische **Klubstation Klasse A** — daher ist DL0XK in einem Contest eine Klubstation der Klasse A, und DA0ABC ebenfalls. Ein persönliches Rufzeichen hat in der Regel eine Ziffer **von 1 bis 9** (DL1PZ). (Daneben gibt es auslaufende Reihen, etwa Klubstationen in DB/DC/DD, die nach und nach durch DA0, DF0, DK0, DL0 ersetzt werden.)

**Klubstationen mit einbuchstabigem Suffix** (z. B. DL0A bis DL0Z, DA2A…) gibt es auch; hier wird die Zuteilung **bis zu 5 Jahre** befristet (Rufzeichenplan Nr. 8).
`,
    },
    {
      id: 'viz-plan', type: 'viz', viz: 'rufzeichenplan-explorer', title: 'Rufzeichenplan-Explorer',
      params: { goals: ['ks_e', 'sz', 'exterr', 'event'] },
      task: 'Finde per Eingabe oder Beispiel: eine **Klubstation der Klasse E**, ein Rufzeichen für **experimentelle Studien (Klasse E)**, eine **exterritoriale Station der Klasse E** und ein **Sonderrufzeichen** (4–7 Zeichen im Suffix).',
      caption: 'Vereinfachte Auswertung des Rufzeichenplans Vfg. 15/2025 (gültig ab 01.04.2025).',
    },
    {
      id: 'sonder', type: 'text', title: 'Sonderrufzeichen: DL250BTHVN & Co.',
      md: `
Für **besondere allgemeine Anlässe** kann eine Gruppe ein **Sonderrufzeichen** als Klubstationsrufzeichen mit einem **vier- bis siebenstelligen Suffix** beantragen. Das Suffix darf **Ziffern** enthalten; das **letzte Zeichen** muss ein **Buchstabe** sein. Deshalb ist **DL250BTHVN** (250. Geburtstag [Beethovens](wiki:Ludwig van Beethoven|Ludwig van Beethoven)) ein ganz normales zulässiges deutsches Rufzeichen und keine „Sonderverfügung".[^bnetza-rufzeichenplan]

Zulässige Anlässe sind **ausschließlich**: Ereignisse mit Amateurfunkbezug (Jubiläen, Messen), ein [[fieldday|Fieldday]] ([Field Day](wiki:Fieldday|Field Day (amateur radio)), Treffen mit Station im Freien), ein **Wettbewerb mit mindestens drei Funkamateuren**, öffentliche Veranstaltungen mit überregionaler Bedeutung (sportlich, kulturell, historisch …) und Nachwuchsaktionen. Rufzeichen mit politischem oder kommerziellem Bezug werden nicht vergeben. Die Zuteilung gilt **längstens ein Jahr** und ist **nicht verlängerbar**.[^bnetza-rufzeichenplan] Beispiele aus der Praxis sind etwa ein Ortsverbands-Jubiläum, ein Stadtfest oder ein Sportereignis; die Gegenstationen sammeln solche Sonderstationen eifrig mit QSL-Karten.
`,
    },
    {
      id: 'mission-sonder', type: 'callout', tone: 'mission', title: 'Funkpraxis: Sonderstationen jagen',
      md: `
Wenn du im Frequenzbereich DL250… oder DA50… ein ungewöhnlich langes Rufzeichen hörst, bist du an einer Sonderstation. Viele **sammeln** diese Stationen (und die QSL-Karten dazu). Beim eigenen Ortsverband kannst du als **neuer Funkamateur mit Klasse E** die Klubstation mitbenutzen, selbst wenn du noch kein eigenes Shack hast — ein ideales Setup für den ersten Funkbetrieb mit KW-Antenne am Vereinsheim (denke aber an deine 160/80/15/10-m-Grenze).
`,
    },
    {
      id: 'exterr', type: 'text', title: 'Exterritoriale Stationen und experimentelle Studien',
      md: `
**Exterritoriale Stationen** ([Exterritorialität](wiki:Exterritorialität|Extraterritoriality)) stehen **außerhalb des Hoheitsgebiets** der Bundesrepublik, aber auch nicht im Gebiet eines anderen Staates. Sie bekommen Rufzeichen aus der Reihe **DP0 bis DP2** (DP0/DP1 = Klasse A, DP2 = Klasse E; DP8 = Klasse N mit oder ohne exterritorialen Standort).[^bnetza-rufzeichenplan] Beispiele: die [Internationale Raumstation](wiki:Internationale Raumstation|International Space Station) (**DP0ISS**), die [Neumayer-Station III](wiki:Neumayer-Station III|Neumayer Station III) in der [Antarktis](wiki:Antarktis|Antarctic) (**DP0GVN**) und das Forschungsschiff [Polarstern](wiki:Polarstern (Schiff, 1982)|RV Polarstern) (**DP0POL**). Alle drei: **Klasse A, exterritorial**.[^darc-50ohm] Mit **Gaststreitkräften** oder einem **Ausländer ohne individuelles Rufzeichen** haben sie nichts zu tun.

Ganz andere Welt: **besondere experimentelle und technisch-wissenschaftliche Studien**. Normalerweise gelten für alle die Rahmenbedingungen aus Anlage 1 AFuV (Bänder, Leistungen, Bandbreiten). Nur für **solche Studien** kann die BNetzA **auf Antrag befristete Ausnahmen** gestatten — mit Auflagen, und oft verbunden mit einem **weiteren Rufzeichen** (§ 16 Abs. 2 AFuV).[^afuv] Die Rufzeichen dafür kommen aus **DA4AA–DA4ZZZ (Klasse E)** und **DA5AA–DA5ZZZ (Klasse A)**; die Zuteilung gilt bis zu **5 Jahre**.[^bnetza-rufzeichenplan] Daraus folgt: DA5XX ist **keine** Versuchsfunkstelle im Sinne eines anderen Funkdienstes, sondern eine Amateurfunkstelle für **besondere experimentelle Studien**.

Für andere Zwecke gibt es **keine** Ausnahmen: nicht für **Notfunk-Übungen**, nicht für **Messungen an Sendern ohne Abschlusswiderstand** (dafür gilt die Schutzregel des § 16 Abs. 6: freies Abstrahlen wirkungsvoll verhindern) und auch nicht für die Nutzung **zusätzlicher Frequenzbereiche** außerhalb des Frequenzplans für den Amateurfunk.[^afuv]
`,
    },
    {
      id: 'match-rz', type: 'match', prompt: 'Welche Art von Station steckt hinter dem Rufzeichen?',
      pairs: [
        ['DA0ABC', 'Klubstation der Klasse A'],
        ['DL0XK', 'Klubstation der Klasse A (Contest)'],
        ['DA5XX', 'Besondere experimentelle Studien, Klasse A'],
        ['DP0POL', 'Exterritorial, Klasse A'],
        ['DL250BTHVN', 'Sonderrufzeichen für einen besonderen Anlass'],
        ['DL1PZ', 'Personengebundenes Rufzeichen'],
      ],
    },
    {
      id: 'quiz-klub', type: 'quiz', title: 'Klubstation: richtig oder nur plausibel?',
      question: 'Welche Aussagen sind richtig? (Mehrfachauswahl)',
      options: [
        { text: 'Ein Funkamateur der Klasse E darf an einer Klasse-A-Klubstation nicht auf 40 m funken.', correct: true, why: 'Es gilt die niedrigere Klasse; Klasse E hat keine 40-m-Rechte.' },
        { text: 'Ein Nichtmitglied mit Zulassung darf an der Klubstation funken.', correct: true, why: 'Die Benutzung ist nicht auf Mitglieder beschränkt.' },
        { text: 'Der Verantwortliche muss Klasse A besitzen.', correct: false, why: 'Eine Zulassung genügt.' },
        { text: 'Ein kurzzeitiger Standortwechsel der Klubstation (z. B. zum Fieldday) muss der BNetzA nicht angezeigt werden.', correct: true, why: 'Anzeigepflicht nur bei dauerhafter Verlegung (§ 9 Abs. 4 AFuV).' },
        { text: 'Sonderrufzeichen mit 4–7 Zeichen werden bis zu 5 Jahre zugeteilt und können verlängert werden.', correct: false, why: 'Höchstens ein Jahr, nicht verlängerbar.' },
      ],
    },
    {
      id: 'num-drei', type: 'numeric', title: 'Zahlen merken',
      question: 'Aus wie vielen zugelassenen Funkamateuren besteht die kleinste mögliche Gruppe einer Klubstation?',
      answer: 3, tolerance: 0,
      explain: 'AFuV § 2 Nr. 3: mindestens drei zugelassene Funkamateure.',
    },
    {
      id: 'recall-klub', type: 'recall', title: 'In eigenen Worten',
      prompt: 'Dein Ortsverband (12 Mitglieder, davon 5 mit Klasse E, 2 mit A, 5 ohne Zeugnis) möchte ein Klubstationsrufzeichen. Wer muss was tun, von welcher Klasse wird die Station sein, und was dürfen Besucher mit Klasse E an einer Klasse-A-Klubstation nicht?',
      answer: 'Der Leiter der Gruppe benennt einen zugelassenen Funkamateur als Verantwortlichen gegenüber der BNetzA; dieser beantragt das Klubstationsrufzeichen; die BNetzA teilt es zu und legt den Berechtigungsumfang (Klasse) fest. Es müssen mindestens drei zugelassene Funkamateure sein (hier erfüllt). Gefunkt werden darf erst nach der Zuteilung. Ein Funkamateur mit Klasse E darf an einer Klasse-A-Klubstation nur im Rahmen von Klasse E funken, also z. B. nicht auf 40 m oder 20 m — es gilt die niedrigere Klasse.',
      cards: ['ks-def', 'ks-klasse'],
    },
  ],
  cards: [
    { id: 'ks-def', front: 'Definition der **Klubstation** (§ 2 Nr. 3 AFuV)?', back: 'Amateurfunkstelle, die von Mitgliedern einer Gruppe von **mindestens drei** zugelassenen Funkamateuren mit einem **gemeinschaftlich genutzten Rufzeichen** betrieben wird.' },
    { id: 'ks-zuteilung', front: 'Wer bekommt das Klubstationsrufzeichen, wer benennt ihn?', back: 'Ein zugelassener **Funkamateur (Stationsverantwortlicher)**, benannt vom **Leiter der Gruppe** gegenüber der BNetzA. Erst nach der **Zuteilung** darf gesendet werden.' },
    { id: 'ks-nutzer', front: 'Wer darf an einer Klubstation funken?', back: 'Jeder Funkamateur mit **Zulassung** — kein Mitglied, keine Anmeldung, keine Anwesenheit eines Mitglieds nötig.' },
    { id: 'ks-klasse', front: 'Welche Rechte gelten, wenn Klasse des Funkamateurs ≠ Klasse der Klubstation?', back: 'Die **niedrigere** der beiden Klassen.' },
    { id: 'ks-standort', front: 'Standortwechsel einer Klubstation: anzeigen?', back: '**Kurzzeitig:** keine Anzeige nötig. **Dauerhafte** Verlegung: vorher der BNetzA anzeigen (§ 9 Abs. 4).' },
    { id: 'rp-aufbau', front: 'Aufbau eines deutschen Rufzeichens?', back: 'Präfix **DA–DR** (ohne DE, DI) + **Ziffer** + Suffix (meist 2–3 Buchstaben).' },
    { id: 'rp-ks0', front: 'DA0…, DF0…, DK0…, DL0… — was ist das?', back: '**Klubstationen der Klasse A** (Ziffer Null). DA7 = Klubstation E, DA8 = Klubstation N.' },
    { id: 'rp-sonder', front: 'Sonderrufzeichen (Klubstation): Suffix, Dauer?', back: '**4–7 Zeichen**, Ziffern erlaubt, letztes Zeichen **Buchstabe**. **Höchstens 1 Jahr**, nicht verlängerbar. (Beispiel DL250BTHVN)' },
    { id: 'rp-exterr', front: 'Rufzeichenreihe für exterritoriale Stationen?', back: '**DP0–DP2** (DP0/DP1 Klasse A, DP2 Klasse E). Beispiele: DP0ISS, DP0GVN (Neumayer-Station), DP0POL (Polarstern).' },
    { id: 'rp-sz', front: 'DA4… / DA5… — was ist das?', back: 'Rufzeichen für **besondere experimentelle Studien** (§ 16 Abs. 2 AFuV): DA4 = Klasse E, DA5 = Klasse A. Bis zu 5 Jahre.' },
    { id: 'sz-ausnahme', front: 'Wofür sind Ausnahmen von den AFuV-Rahmenbedingungen möglich?', back: 'Nur für **besondere experimentelle und technisch-wissenschaftliche Studien** (befristet, mit Auflagen, § 16 Abs. 2).' },
  ],
};
