const TAFEL = [
  ['A', 'Alfa'], ['B', 'Bravo'], ['C', 'Charlie'], ['D', 'Delta'], ['E', 'Echo'], ['F', 'Foxtrot'], ['G', 'Golf'], ['H', 'Hotel'], ['I', 'India'],
  ['J', 'Juliett'], ['K', 'Kilo'], ['L', 'Lima'], ['M', 'Mike'], ['N', 'November'], ['O', 'Oscar'], ['P', 'Papa'], ['Q', 'Quebec'],
  ['R', 'Romeo'], ['S', 'Sierra'], ['T', 'Tango'], ['U', 'Uniform'], ['V', 'Victor'], ['W', 'Whiskey'], ['X', 'X-ray'], ['Y', 'Yankee'], ['Z', 'Zulu'],
];
const tafelHtml = `<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:.8rem;table-layout:fixed"><tbody>${[0, 1, 2, 3, 4].map(r => `<tr>${TAFEL.slice(r * 6, r * 6 + 6).map(([b, w]) => `<td style="padding:4px 1px;border:1px solid var(--line);text-align:center"><b style="font-family:var(--mono);color:var(--accent)">${b}</b><br>${w}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;

export default {
  id: 'buchstabiertafel-und-rufzeichen',
  title: 'Buchstabiertafel und Aufbau deutscher Rufzeichen',
  summary: 'Internationale Buchstabiertafel sicher beherrschen und ein Rufzeichen in Präfix, Ziffer und Suffix zerlegen; welche Reihen zur Klasse E gehören (DO1–DO9, DA6).',
  minutes: 25,
  goals: [
    'Rufzeichen mit der internationalen Buchstabiertafel fehlerfrei buchstabieren (Alfa, Juliett, X-ray, Stroke …)',
    'Ein deutsches Rufzeichen in [[landeskenner]], Ziffer und Suffix zerlegen und die Reihe der Klasse zuordnen',
    'Wissen, wer Rufzeichen zuteilt, wann man es nennt und was an der Zuteilung nicht verhandelbar ist',
    'Den Rufzeichenplan als Prüfungshilfsmittel lesen',
  ],
  needs: ['was-ist-amateurfunk'],
  blocks: [
    {
      id: 'intro', type: 'text', title: 'M oder N? Warum man Buchstaben „umbenennt“',
      md: `
Stell dir vor, du hörst durch Rauschen **„DM4EAX“** und **„DN4EAX“**. Das M und das N unterscheidet das Ohr bei schwachem Signal kaum. Deshalb sagt man nicht Buchstaben, sondern **Wörter**: aus DM4EAX wird *Delta Mike Vier Echo Alfa X-ray*, aus DN4EAX *Delta November Vier Echo Alfa X-ray* — und die beiden klingen völlig verschieden.[^darc-50ohm]

Das ist die [Buchstabiertafel](wiki:Buchstabiertafel|Spelling alphabet): jedem Buchstaben ist genau ein englisches Wort zugeordnet. Sie wird nicht nur im Amateurfunk verwendet, sondern auch in der Luftfahrt und bei der [NATO](wiki:NATO|NATO). Im Amateurfunk brauchst du sie ständig: für dein [Rufzeichen](wiki:Rufzeichen|Call sign), für Namen und Orte — und in der Prüfung (zehn Fragen buchstabieren Rufzeichen).
`,
    },
    {
      id: 'tafel', type: 'figure', title: 'Die internationale Buchstabiertafel',
      html: tafelHtml,
      caption: 'Nach den [Radio Regulations](wiki:Vollzugsordnung für den Funkdienst|ITU Radio Regulations) der [ITU](wiki:Internationale Fernmeldeunion|International Telecommunication Union) (Anhang 14). Beachte die Schreibweisen: **Alfa** (nicht Alpha) und **Juliett** (nicht Juliet), **X-ray**, **Quebec**, **Whiskey**.[^itu-rr]',
    },
    {
      id: 'text-regeln', type: 'text', title: 'Welche Tafel? Und was ist mit Ziffern und Umlauten?',
      md: `
Es gibt viele Tafeln (deutsche nach [DIN 5009](wiki:DIN 5009|DIN 5009), österreichische, Schweizer). Für das **Rufzeichen** schreibt die Bundesnetzagentur in ihrer Verfügung 13/2005 vor: das **internationale Buchstabieralphabet nach den Radio Regulations (Anhang 14)**. Nicht die deutsche Tafel mit „Nordpol“, „Caesar“, „Kilowatt“, „Zeppelin“, nicht eine „europäische“ von 1992 — das sind genau die falschen Antworten im Katalog.[^darc-50ohm]

Für den [Funkverkehr](wiki:Funkverkehr|Radio communication) gilt: Wer zusätzlich zur internationalen Tafel andere Wörter benutzt (etwa „Nancy, Sugar, Ocean, Queen“), um besser verstanden zu werden, darf das — **zusätzlich**, nicht stattdessen.

**Ziffern** stehen nicht in der Tafel: Im deutschsprachigen Funkverkehr sprichst du sie deutsch (*Vier*), im internationalen Verkehr englisch (*Four*). **Umlaute** gibt es in der Tafel nicht: Ä = *Alfa Echo*, Ö = *Oscar Echo*, Ü = *Uniform Echo*, ß = *Sierra Sierra*. Den Schrägstrich in Zusätzen wie **/p** sprichst du als **„Stroke“**, das *p* als „portable“.[^darc-50ohm]

Das zweite Wort-Rätsel der Prüfung: Ländervorsätze. **IG9/DL4HR** ist ein deutsches Rufzeichen (DL4HR), mit dem du im „Ausland“ **IG9** unterwegs bist, und wird buchstabiert *India Golf Neun Stroke Delta Lima Vier Hotel Romeo*. Der Länderteil steht **vorne**, mit Schrägstrich getrennt; was IG9 ist, brauchst du nicht zu wissen, nur wie man es buchstabiert.
`,
    },
    {
      id: 'warn-tafel', type: 'callout', tone: 'warning', title: 'Wo die falschen Antworten lauern',
      md: `
Die Prüfungsfragen buchstabieren ein Rufzeichen und bieten vier Varianten, die sich nur in **einzelnen Wörtern** unterscheiden. Die Fallen:

- **Länder- und Städtenamen** statt der Tafel: *Denmark, Madagascar, Uruguay, Japan, Guatemala, Italy, Honolulu, Florida, Paris, London, Oslo, Santiago, Texas, Vulcano, Ecuador, Amerika, Radio, Nordpol*.
- **Alte oder deutsche Wörter**: *Caesar, Kilowatt, Xavier, William, Baker, Zebra, Queen, Radio Oslo*.
- **Fast-Treffer** aus der Tafel: **Mike** (nicht Madagascar), **Echo** (nicht Ecuador), **Alfa** (nicht Amerika), **Delta** (nicht Denmark), **Oscar** (nicht Oslo), **Romeo** (nicht Radio), **Victor** (nicht Vulcano), **Sierra** (nicht Santiago), **Tango** (nicht Texas), **Charlie** (nicht Caesar), **Kilo** (nicht Kilowatt), **Lima** (nicht London), **Papa** (nicht Paris), **Whiskey** (nicht William), **Yankee, Bravo, Zulu** (nicht Baker/Zebra), **X-ray** (nicht Xavier), **Juliett** (nicht Japan), **Quebec** (nicht Queen), **Uniform** (nicht Uruguay).
- **„/p“** wird *Stroke portable*.
`,
    },
    {
      id: 'viz-trainer', type: 'viz', viz: 'buchstabier-trainer', title: 'Buchstabier-Trainer',
      params: { need: 6 },
      task: 'Buchstabiere **sechs Rufzeichen in Folge** richtig. Mit „Wörter → Rufzeichen“ übst du die Gegenrichtung: das ist, was du am Funkgerät hörst.',
      caption: 'Ziffern auf Deutsch (eins, zwei, drei …), Wörter durch Leerzeichen getrennt. „Alpha“ und „Juliet“ werden toleriert, richtig sind Alfa und Juliett.',
    },
    {
      id: 'recall-tafel', type: 'recall', title: 'Aus dem Gedächtnis',
      prompt: 'Buchstabiere dein künftiges Rufzeichen — oder, solange du keins hast, das Beispiel **DK5WP/p** — und ergänze jeweils die Wörter für M, N, V und W aus dem Kopf. Prüfe danach mit der Tafel.',
      answer: 'DK5WP/p = Delta Kilo Fünf Whiskey Papa Stroke portable. M = Mike, N = November, V = Victor, W = Whiskey.',
      hints: ['Mike/November, Victor/Whiskey sind die Wörter, die oft mit Städten oder Ländern verwechselt werden.'],
      cards: ['mnvw'],
    },
    {
      id: 'text-aufbau', type: 'text', title: 'Wie ein deutsches Rufzeichen gebaut ist',
      md: `
Ein [Amateurfunkrufzeichen](wiki:Amateurfunkrufzeichen|Amateur radio call signs) identifiziert eine Station. Das wichtigste in einem Satz: *An seinem Rufzeichen erkennt man eine Amateurfunkstelle* — nicht an Frequenz, Sendeart oder Modulation.[^afuv]

Ein **personengebundenes deutsches Rufzeichen** besteht aus

1. einem **2-buchstabigen Präfix** (dem [Landeskenner](wiki:Landeskenner|ITU prefix)), nämlich **DA bis DR ohne DE und DI** — international sind diese Buchstabenreihen der Bundesrepublik zugeteilt;
2. **einer Ziffer** (0–9) und
3. einem **2- oder 3-buchstabigen Suffix**.[^bnetza-rufzeichenplan]

Beispiel **DL1PZ**: Präfix **DL**, Ziffer **1**, Suffix **PZ**. Die Ziffer gehört zur Reihe: Zusammen mit dem Präfix legt sie fest, zu welcher Klasse und welchem Verwendungszweck das Rufzeichen gehört. Welche Reihe zu welcher Klasse gehört, regelt der **Rufzeichenplan**, den die Bundesnetzagentur nach § 10 Abs. 3 AFuV veröffentlicht; er liegt in der Prüfung aus. Die **Präfixe weltweit** sind dagegen in den **Radio Regulations** geregelt — dort steht, welches Land welche Buchstabenreihen hat (VA406), während die Bildung der deutschen Rufzeichen im **Rufzeichenplan** steht (VD201), nicht im Gesetz.[^afuv]

Rufzeichen gibt es in mehreren Arten (**Zuteilungsarten**): **personengebundene** Rufzeichen, Rufzeichen für **fernbediente und automatisch arbeitende** Stationen (Relais, Baken) und **Klubstationen** — dazu kommen Ausbildungsrufzeichen. Ein Familien-, Contest- oder Mobilfunkrufzeichen gibt es nicht.[^afuv]
`,
    },
    {
      id: 'fig-aufbau', type: 'figure', title: 'Anatomie eines Rufzeichens',
      html: `<svg viewBox="0 0 420 285" role="img" aria-label="Das Rufzeichen DL1PZ mit Präfix DL, Ziffer 1 und Suffix PZ sowie dem Zusatz /p">
<style>.c{font:700 56px ui-monospace,Menlo,monospace}.l{font:600 15px system-ui,sans-serif;fill:var(--ink)}.m{font:13px system-ui,sans-serif;fill:var(--muted)}</style>
<text class="c" x="60" y="70" style="fill:var(--accent)">DL</text><text class="c" x="150" y="70" style="fill:var(--accent-2)">1</text><text class="c" x="195" y="70" style="fill:var(--ink)">PZ</text><text class="c" x="300" y="70" style="fill:var(--muted)">/p</text>
<path d="M62 82 H128 M152 82 H180 M197 82 H262 M302 82 H362" stroke="var(--line-2)" stroke-width="3"/>
<text class="l" x="20" y="116">DL = Präfix (Landeskenner)</text><text class="m" x="20" y="134">2 Buchstaben, DA–DR ohne DE und DI</text>
<text class="l" x="20" y="165">1 = Ziffer</text><text class="m" x="20" y="183">0–9, gehört zur Reihe im Rufzeichenplan</text>
<text class="l" x="20" y="214">PZ = Suffix</text><text class="m" x="20" y="232">2 oder 3 Buchstaben (personengebunden)</text>
<text class="l" x="20" y="263">/p = Zusatz</text><text class="m" x="20" y="281">nicht Teil des Rufzeichens; gesprochen „Stroke portable“</text>
</svg>`,
      caption: 'Zusätze wie /p dürfen das zugeteilte Rufzeichen nicht verfälschen (§ 11 Abs. 3 AFuV); mehr dazu in der Etappe „Betriebstechnik“.',
    },
    {
      id: 'text-klassen', type: 'text', title: 'Welche Reihe gehört zu welcher Klasse?',
      md: `
Die **Klasse** erkennst du an der Reihe (Präfix plus Ziffer). Für die personengebundenen Rufzeichen mit 2- oder 3-buchstabigem Suffix gilt:[^bnetza-rufzeichenplan]

<div style="overflow-x:auto"><table style="border-collapse:collapse;width:100%;font-size:.92rem"><thead><tr><th style="text-align:left;padding:5px 8px;border-bottom:2px solid var(--line)">Reihe</th><th style="text-align:left;padding:5px 8px;border-bottom:2px solid var(--line)">Klasse</th><th style="text-align:left;padding:5px 8px;border-bottom:2px solid var(--line)">Beispiel</th></tr></thead><tbody><tr><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">**DA1, DA2**, DB1–DB9, DC–DM (je 1–9, soweit PZ)</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">**A**</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">DL1PZ</td></tr><tr><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">**DA6** und **DO1 bis DO9**</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">**E**</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">DO7PR</td></tr><tr><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">**DN9**</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">**N**</td><td style="padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top">DN9RO</td></tr></tbody></table></div>

**Merke für Klasse E:** Personengebundene Rufzeichen der Klasse E beginnen mit **DO1 bis DO9** (und die Reihe **DA6**). Rufzeichen **DL1 bis DL9** sind Klasse A, **DN9…** ist Klasse N. Mit den restlichen Reihen — Klubstationen (Ziffer 0 oder 1-buchstabiger Suffix), Relais und Baken (zum Beispiel **DB0**, **DM0**, **DO0**), Ausbildungsrufzeichen, besondere Studien — kommen wir in der Etappe 3.
`,
    },
    {
      id: 'viz-plan', type: 'viz', viz: 'rufzeichenplan-explorer', title: 'Rufzeichenplan-Explorer',
      params: { goals: ['ks_e'] },
      task: 'Gib zuerst **DL1PZ**, **DO7PR** und **DN9RO** ein und lies die Klasse ab. Dann such eine **Klubstation der Klasse E** (ein Rufzeichen, bei dem der Suffix nur einen Buchstaben hat).',
      caption: 'Nach dem Rufzeichenplan (Vfg. 15/2025, gültig ab 01.04.2025).[^bnetza-rufzeichenplan]',
    },
    {
      id: 'match-reihen', type: 'match', title: 'Reihe und Klasse',
      prompt: 'Ordne zu: Zu welcher Klasse gehört ein personengebundenes Rufzeichen mit …',
      pairs: [
        ['DL1 bis DL9 (2–3 Buchstaben)', 'Klasse A'],
        ['DO1 bis DO9 (2–3 Buchstaben)', 'Klasse E'],
        ['DN9 (2–3 Buchstaben)', 'Klasse N'],
        ['DA6 (2–3 Buchstaben)', 'Klasse E'],
      ],
    },
    {
      id: 'text-regeln-rz', type: 'text', title: 'Dein Rufzeichen: zugeteilt, nicht gekauft',
      md: `
Rufzeichen werden von der **[[bundesnetzagentur]]** ([Bundesnetzagentur](wiki:Bundesnetzagentur|Federal Network Agency)) zugeteilt (§ 3 Abs. 1 AFuG, § 10 AFuV) — nicht von einem Verein, nicht von der Außenstelle in deiner Nähe.[^afug] Das hat Folgen:

- **Kein Anspruch** auf ein bestimmtes Rufzeichen — auch dann nicht, wenn es frei ist oder dir früher schon einmal gehörte. Ein Rufzeichen, auf das verzichtet wurde, wird frühestens **nach einem Jahr** neu vergeben.[^afuv]
- Du darfst **nur dein zugeteiltes Rufzeichen** benutzen (§ 5 Abs. 1 AFuG) — keine beliebigen, auch nicht „das des Stationsinhabers“, wenn du an einer fremden Station funkst. Die Zulassung ist personengebunden: sie ist an die in der Urkunde genannte Person gebunden und **nicht übertragbar**, auch nicht vorübergehend an Haushaltsmitglieder oder ausländische Gäste.
- Die Behörde kann ein Rufzeichen **aus wichtigen Gründen ändern**, insbesondere bei Änderungen internationaler Vorgaben (§ 3 Abs. 4 AFuG). Ein Umzug zu einer anderen Außenstelle oder die Änderung einer BEMFV-Anzeige sind **keine** solchen Gründe.
- Das Rufzeichen ist **Identifikation**: Du nennst es **bei Beginn und Ende jeder Funkverbindung sowie mindestens alle zehn Minuten** (§ 11 Abs. 1 AFuV) — nicht nur auf Verlangen, nicht erst alle fünfzehn Minuten, nicht erst nach fünf Minuten Dauersendung.[^afuv]
`,
    },
    {
      id: 'mission-rz', type: 'callout', tone: 'mission', title: 'Funkpraxis: Dein Rufzeichen am Mikrofon',
      md: `
Beim ersten QSO sagst du dein Rufzeichen **langsam und buchstabiert**: „… hier ist Delta Oscar Sieben Papa Romeo“. Viele Anfänger rufen zu schnell; wer mit Rufzeichen und Wort „Delta“ beginnt, wird wesentlich besser verstanden. Hilfreich: ein Zettel mit der Tafel am Platz und das Rufzeichen mindestens beim Anruf zweimal nennen. Wer nur Teile eines Rufzeichens hört, fragt zurück — dazu mehr in der Lektion „Die erste Verbindung“.

*Prüfungsbezug:* BA101–BA110 (Buchstabieren), BD104–BD106 (Klasse A/E/N), VD201–VD208 und VC107, VC116, VC117 (Zuteilung), VA406 (Präfixe in den RR).
`,
    },
    {
      id: 'quiz-rz', type: 'quiz', title: 'Zuteilung und Anwendung',
      question: 'Welche Aussagen über das **personengebundene Rufzeichen** stimmen? (Mehrfachauswahl)',
      options: [
        { text: 'Die Bundesnetzagentur teilt es zu; es besteht kein Anspruch auf ein bestimmtes Rufzeichen.', correct: true, why: 'Auch ein freies oder früher einmal zugeteiltes Rufzeichen kann man nicht verlangen.' },
        { text: 'Es wird bei Beginn und Beendigung jeder Verbindung und mindestens alle zehn Minuten genannt.', correct: true, why: '§ 11 Abs. 1 AFuV.' },
        { text: 'Du darfst es für die Dauer eines Urlaubs an einen anderen Funkamateur ausleihen.', correct: false, why: 'Die Zulassung ist personengebunden und nicht übertragbar.' },
        { text: 'Die Behörde darf es nie ändern, weil es Eigentum des Funkamateurs ist.', correct: false, why: 'Aus wichtigen Gründen, vor allem bei Änderung internationaler Vorgaben, ist eine Änderung möglich.' },
        { text: 'Der Landeskenner steht am Ende des Rufzeichens.', correct: false, why: 'Der Landeskenner ist das Präfix (vorn).' },
      ],
    },
    {
      id: 'order-zerlegen', type: 'order', title: 'Rufzeichen von vorn nach hinten',
      prompt: 'Ordne die Bausteine von **DO7PR** in der Reihenfolge, in der du sie liest.',
      items: ['Präfix: DO (Landeskenner)', 'Ziffer: 7', 'Suffix: PR'],
      explain: 'DO7PR ist ein personengebundenes Rufzeichen der Klasse E (Reihe DO1–DO9). Buchstabiert: Delta Oscar Sieben Papa Romeo.',
    },
  ],
  cards: [
    { id: 'warum', front: 'Warum buchstabiert man Rufzeichen mit der Tafel?', back: 'Ähnlich klingende Buchstaben (M/N, B/D …) werden bei schwachem Empfang leicht verwechselt; jedem Buchstaben ist ein Wort zugeordnet.' },
    { id: 'tafel-quelle', front: 'Welches Buchstabieralphabet gilt für das Rufzeichen? Wo steht es?', back: 'Das internationale Buchstabieralphabet nach den Radio Regulations (Anhang 14); BNetzA-Vfg. 13/2005. Nicht die deutsche Tafel nach DIN 5009.' },
    { id: 'mnvw', front: 'M, N, V, W, Q, X, J, A in der Buchstabiertafel?', back: 'Mike, November, Victor, Whiskey, Quebec, X-ray, Juliett, Alfa.' },
    { id: 'ziffern', front: 'Ziffern und Umlaute beim Buchstabieren?', back: 'Ziffern nicht in der Tafel: national deutsch, international englisch. Ä = Alfa Echo, Ö = Oscar Echo, Ü = Uniform Echo, ß = Sierra Sierra. „/“ = Stroke, /p = Stroke portable.' },
    { id: 'zusatz-tafel', front: 'Darf man zusätzlich Wörter wie „Nancy, Sugar“ benutzen?', back: 'Ja, aber nur zusätzlich zur internationalen Buchstabiertafel, nicht stattdessen.' },
    { id: 'aufbau', front: 'Aufbau eines personengebundenen deutschen Rufzeichens?', back: '2-buchstabiges Präfix (Landeskenner, DA–DR ohne DE/DI), eine Ziffer, 2- oder 3-buchstabiger Suffix. Beispiel DL1PZ.' },
    { id: 'reihen', front: 'Reihen der Klassen A, E, N (personengebunden)?', back: 'Klasse A: DA1/DA2, DB–DM u. a. (z. B. DL1–DL9). Klasse E: DO1–DO9 und DA6. Klasse N: DN9.' },
    { id: 'wo-geregelt', front: 'Wo steht was zu Präfixen und Rufzeichenbildung?', back: 'Präfixe international: Radio Regulations. Bildung deutscher Rufzeichen: Rufzeichenplan der Bundesnetzagentur (§ 10 Abs. 3 AFuV). Liegt in der Prüfung aus.' },
    { id: 'zuteilung', front: 'Wer teilt Rufzeichen zu? Anspruch?', back: 'Die Bundesnetzagentur. Kein Anspruch auf ein bestimmtes Rufzeichen; nach Verzicht frühestens nach 1 Jahr neu vergeben.' },
    { id: 'nicht-uebertragbar', front: 'Kann man seine Zulassung oder sein Rufzeichen weitergeben?', back: 'Nein: personengebunden und nicht übertragbar. Man darf nur das zugeteilte Rufzeichen benutzen — an fremden Stationen das eigene.' },
    { id: 'nennung', front: 'Wann muss das Rufzeichen genannt werden?', back: 'Am Anfang und am Ende jeder Funkverbindung und mindestens alle 10 Minuten (§ 11 Abs. 1 AFuV).' },
    { id: 'zuteilungsarten', front: 'Rufzeichenarten (Zuteilung)?', back: 'Personengebundene Rufzeichen, Rufzeichen für fernbediente und automatisch arbeitende Stationen, Klubstationsrufzeichen (dazu Ausbildungsrufzeichen).' },
  ],
};
