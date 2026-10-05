const th = c => `<th style="text-align:left;padding:5px 8px;border-bottom:2px solid var(--line)">${c}</th>`;
const td = (c, s = '') => `<td style="padding:4px 8px;border-bottom:1px solid var(--line);${s}">${c}</td>`;
const BANDS = [
  ['160 m', '1810–2000 kHz', 'S/P', true], ['80 m', '3500–3800 kHz (3,5–3,8 MHz)', 'P', true], ['40 m', '7000–7200 kHz (7–7,2 MHz)', 'P', false], ['30 m', '10100–10150 kHz', 'S', false],
  ['20 m', '14000–14350 kHz', 'P', false], ['17 m', '18068–18168 kHz', 'P', false], ['15 m', '21000–21450 kHz', 'P', true], ['12 m', '24890–24990 kHz', 'P', false],
  ['10 m', '28–29,7 MHz', 'P', true], ['6 m', '50–52 MHz', 'S', false], ['2 m', '144–146 MHz', 'P', true], ['70 cm', '430–440 MHz', 'P', true], ['23 cm', '1240–1300 MHz', 'S', true], ['13 cm', '2320–2450 MHz', 'S', true],
];
const bandTbl = `<div style="overflow-x:auto"><table style="border-collapse:collapse;width:100%;font-size:.9rem"><thead><tr>${['Band', 'Frequenzbereich (Anlage 1)', 'Status', 'Klasse E'].map(th).join('')}</tr></thead><tbody>${BANDS.map(([b, r, s, e]) => `<tr>${td('<b>' + b + '</b>')}${td(r)}${td(s === 'P' ? '<b style="color:var(--good)">primär</b>' : s === 'S' ? 'sekundär' : 'ab 1850 kHz sekundär, 1810–1850 kHz primär')}${td(e ? '<b style="color:var(--good)">ja</b>' : '<span style="color:var(--muted)">nein</span>')}</tr>`).join('')}</tbody></table></div>`;
export default {
  id: 'frequenzzuteilung-und-baender',
  title: 'Amateurfunkbänder, primäre/sekundäre Funkdienste, ITU-Regionen',
  summary: 'Welche Bänder der Klasse E zur Verfügung stehen (160, 80, 15, 10, 2 m, 70, 23 cm …), Status primär/sekundär und die Bandbreitengrenzen aus AFuV Anlage 1.',
  minutes: 25,
  goals: [
    'Erklären, woher ein Funkamateur seine Frequenzen hat (TKG, AFuG, AFuV Anlage 1) und welche Regelwerke was festlegen',
    'Die drei ITU-Regionen kennen und Länder zuordnen',
    'Die Bandgrenzen der Amateurfunkbänder aus Anlage 1 ablesen und die Bänder der Klasse E nennen',
    '[[primaerer-funkdienst|Primär]] und [[sekundaerer-funkdienst|sekundär]] unterscheiden: Wer darf Schutz verlangen, wer muss weichen?',
  ],
  needs: ['was-ist-amateurfunk', 'wellenlaenge-rechnen'],
  blocks: [
    {
      id: 'intro', type: 'text', title: 'Frequenzen gehören nicht jedem',
      md: `
Funkwellen kennen keine Grenzen — damit sie sich nicht gegenseitig zerstören, ist das Spektrum **aufgeteilt**: an Rundfunk, Mobilfunk, Flugfunk, Seefunk, Militär … und an den Amateurfunkdienst. Wer sendet, nutzt eine **Frequenz**, und dafür gilt im [Telekommunikationsgesetz](wiki:Telekommunikationsgesetz (Deutschland)) (TKG) ein Grundprinzip: **Jede Frequenznutzung bedarf einer vorherigen [Frequenzzuteilung](wiki:Frequenzzuteilung|Frequency assignment).** Es gibt keine Untergrenze („erst ab 0,1 W“) und keine Ausnahme „weil ISM“ — auch ISM-Geräte und WLAN-Router nutzen Frequenzen, für die es eine Zuteilung gibt (dann eine Allgemeinzuteilung für alle).[^darc-50ohm]

Es gibt zwei Arten: Die **Einzelzuteilung** erhält zum Beispiel ein Unternehmen für seinen Betriebsfunk. Die **Allgemeinzuteilung** gilt für die Allgemeinheit oder einen bestimmten Personenkreis — **Funkamateure** gehören dazu. Dokumentiert sind die Zuteilungen im **Frequenzplan** der Bundesnetzagentur.

Für dich als Funkamateur heißt das: Mit der [[zulassung]] und einem Rufzeichen gelten die im Frequenzplan für den Amateurfunkdienst ausgewiesenen Frequenzen als zugeteilt (§ 3 Abs. 5 AFuG). Du darfst nur auf diesen Frequenzen senden (§ 5 Abs. 3 AFuG) — nicht auf „beliebigen Frequenzen, solange niemand gestört wird“, nicht auf „allen Frequenzen deiner ITU-Region“, und auch nicht bei einer Notfunkübung außerhalb der Amateurfunkbänder.[^afug]
`,
    },
    {
      id: 'text-regelwerke', type: 'text', title: 'Wo steht welche Frequenz? Von der ITU zur Anlage 1',
      md: `
Die **[Internationale Fernmeldeunion](wiki:Internationale Fernmeldeunion|International Telecommunication Union)** (ITU) legt in den **[Radio Regulations](wiki:Vollzugsordnung für den Funkdienst|ITU Radio Regulations)** (RR, Artikel 5) fest, welcher [Funkdienst](wiki:Funkdienst|Radio communication service) welche Frequenzbereiche nutzen darf. Die Erde ist dafür in **drei Regionen** eingeteilt, damit in den Regionen **unterschiedliche Zuweisungen** möglich sind — es geht also nicht um Zeitzonen, Gastlizenzen oder darum, dass Amateurfunkverkehr nur innerhalb einer Region erlaubt wäre.[^itu-rr]

<div style="overflow-x:auto"><table style="border-collapse:collapse;width:100%;font-size:.92rem"><thead><tr>${th('ITU-Region')}${th('Kontinente und Länder')}${th('Beispiele')}</tr></thead><tbody>
<tr>${td('<b>1</b>')}${td('Afrika, Europa, Russland, Mongolei, Naher Osten')}${td('<b>Deutschland</b>, Ägypten, Türkei')}</tr>
<tr>${td('<b>2</b>')}${td('Nord- und Südamerika, Grönland')}${td('<b>Kanada</b>, USA, Brasilien')}</tr>
<tr>${td('<b>3</b>')}${td('Süd- und Ostasien, Australien, Ozeanien')}${td('<b>Australien</b>, Japan, Indien')}</tr></tbody></table></div>

Die RR gelten nicht unmittelbar für dich: Es dürfen nur die Frequenzen genutzt werden, die **durch nationale Regelungen umgesetzt** wurden. In Deutschland sind das die Frequenzbereiche und ausführlichen Nutzungsbedingungen in der **Anlage 1 der Amateurfunkverordnung** (AFuV) und, soweit nötig, in **weiteren Mitteilungen der Bundesnetzagentur** im Amtsblatt. Dort — und nicht in den RR, im AFuG oder in der Frequenzverordnung/dem Frequenzplan — schlägst du nach, was du darfst.[^afuv] Die Anlage 1 liegt in der Prüfung aus; du musst die Bänder nicht auswendig kennen, solltest sie aber gut lesen können.
`,
    },
    {
      id: 'map-regionen', type: 'map', title: 'Die drei ITU-Regionen',
      intro: 'Für die Prüfung genügen drei Beispielländer: **Deutschland** (Region 1), **Kanada** (Region 2), **Australien** (Region 3).',
      view: 'world',
      highlight: [
        { countries: ['Deutschland', 'Ägypten', 'Russland', 'Südafrika', 'Saudi-Arabien', 'Frankreich', 'Nigeria'], label: 'Region 1 (Europa, Afrika, Naher Osten, Russland)', color: '#2a9d8f' },
        { countries: ['Kanada', 'Vereinigte Staaten', 'Brasilien', 'Mexiko', 'Argentinien', 'Grönland'], label: 'Region 2 (Amerika)', color: '#e9a03b' },
        { countries: ['Australien', 'Japan', 'Indien', 'Volksrepublik China', 'Neuseeland', 'Indonesien'], label: 'Region 3 (Süd- und Ostasien, Ozeanien)', color: '#8e6bbf' },
      ],
      caption: 'Beispielländer zur Orientierung (heutige Staaten); die Grenzen der Regionen verlaufen nicht entlang einzelner Länder. Die Antarktis ist auf die drei Regionen aufgeteilt.',
    },
    {
      id: 'text-baender', type: 'text', title: 'Bandgrenzen aus Anlage 1',
      md: `
Die [Amateurfunkbänder](wiki:Amateurfunkband|Amateur radio frequency allocations) heißen nach der ungefähren **Wellenlänge** (siehe vorige Lektion), die Grenzen stehen in **Anlage 1** (Spalte 2). Das Wichtigste auf einen Blick — **fett** sind die Bänder der **Klasse E**:

${bandTbl}

So liest du Anlage 1: Der Prüfungsfragen-Typ „Welche Antwort enthält Anfangs- und Endfrequenz des X-Bandes?“ verlangt keine Rechnung, nur das **Abgleichen** mit der Tabelle. Manchmal setzt sich ein Band aus mehreren Zeilen zusammen — das **160-m-Band** geht von **1810 bis 2000 kHz** (drei Zeilen). Falsche Antworten sind meist **Werte aus anderen Regionen oder Ländern** (zum Beispiel 144–148 MHz, 50–54 MHz oder 7,0–7,3 MHz sind so in der Region 2 üblich, **nicht** in Deutschland) oder leicht verschobene Grenzen. **Bei der Zuordnung zur Klasse** zählt: Für **Klasse N** sind es nur **28–29,7 MHz, 144–146 MHz und 430–440 MHz**; für **Klasse E** kommen 160, 80 und 15 m sowie 23 cm und höher dazu (nicht: 40, 30, 20, 17, 12 und 6 m — die sind Klasse A vorbehalten).[^afuv]

Bei **Klasse E** sind außerdem noch **Mikrowellenbänder** erlaubt (2320–2450 MHz, 5650–5850 MHz, 10–10,5 GHz, 24–24,25 GHz, 47–47,2 GHz, 76–81 GHz und weitere) — mit 5 W PEP (siehe Lektion über die Sendeleistung).
`,
    },
    {
      id: 'viz-baender', type: 'viz', viz: 'baender-explorer', title: 'Bänder-Explorer',
      params: {},
      task: 'Zeige die **sekundären** Bänder der Klasse E an, prüfe **7,1 MHz** (darf Klasse E dort senden?) und eine Frequenz im Mikrowellenbereich, zum Beispiel **2400 MHz**.',
      caption: 'Daten nach Anlage 1 der AFuV (Fassung 2024), Stand 05.10.2026. Zusatzbestimmungen sind verkürzt wiedergegeben; im Zweifel zählt der Gesetzestext.[^afuv]',
    },
    {
      id: 'num-breite', type: 'numeric', title: 'Wie breit ist das Band?',
      question: 'Wie breit ist das 80-m-Band (3,5 bis 3,8 MHz) in kHz?',
      answer: 300, tolerance: 0, unit: 'kHz',
      explain: '$3{,}8\\,\\text{MHz} - 3{,}5\\,\\text{MHz} = 0{,}3\\,\\text{MHz} = 300\\,\\text{kHz}$.',
    },
    {
      id: 'order-baender', type: 'order', title: 'Bänder nach Frequenz',
      prompt: 'Ordne die Klasse-E-Bänder von der **niedrigsten** zur **höchsten** Frequenz.',
      items: ['160 m (1,81–2 MHz)', '80 m (3,5–3,8 MHz)', '15 m (21–21,45 MHz)', '10 m (28–29,7 MHz)', '2 m (144–146 MHz)', '70 cm (430–440 MHz)', '23 cm (1240–1300 MHz)'],
      explain: 'Je kleiner die Wellenlänge im Namen, desto höher die Frequenz — 160 m ist das niedrigste, 23 cm das höchste dieser Bänder.',
    },
    {
      id: 'match-baender', type: 'match', title: 'Band und Anfangs-/Endfrequenz',
      prompt: 'Ordne zu.',
      pairs: [
        ['160-m-Band', '1810 bis 2000 kHz'],
        ['80-m-Band', '3,5 bis 3,8 MHz'],
        ['10-m-Band', '28 bis 29,7 MHz'],
        ['2-m-Band', '144 bis 146 MHz'],
        ['70-cm-Band', '430 bis 440 MHz'],
        ['23-cm-Band', '1240 bis 1300 MHz'],
        ['13-cm-Band', '2320 bis 2450 MHz'],
      ],
    },
    {
      id: 'text-prisek', type: 'text', title: 'Primär und sekundär: Wer hat Vorrang?',
      md: `
Nicht jedes Band gehört dem Amateurfunk allein. In **Spalte 3** der Anlage 1 steht der **Status**: **P** = der Amateurfunkdienst ist **primärer** Funkdienst, **S** = **sekundärer** Funkdienst. Beide Begriffe sind in Anlage 1 (3) definiert:[^afuv]

- Ein **primärer Funkdienst** ist ein Funkdienst, dessen Funkstellen **Schutz gegen Störungen** durch Funkstellen **sekundärer** Funkdienste verlangen können. Schutz gegen Störungen durch andere primäre Dienste können nur die Funkstellen verlangen, denen die Frequenz **früher** zugeteilt wurde. (Die Aussage, dass Amateurfunk kein primärer Dienst sei, weil er kein Sicherheitsfunkdienst ist, stimmt nicht; und primär bedeutet nicht „kommerzielle Funkstellen oder Behörden immer“.)
- Ein **sekundärer Funkdienst** ist ein Funkdienst, dessen Funkstellen **weder Störungen bei Funkstellen eines primären Dienstes verursachen dürfen noch Schutz vor Störungen** durch solche Funkstellen verlangen können — **unabhängig davon, wann zugeteilt wurde.** „Sekundär“ heißt also nicht „später zugeteilt“, und die Einteilung gilt für **alle** Funkdienste, nicht nur kommerzielle.

Deshalb ist es wichtig, den Status zu kennen: In einem **primären** Band (zum Beispiel **2 m, 70 cm, 80 m, 40 m**) kannst du Störungen durch sekundäre Dienste beanstanden. In einem **sekundären** Band (zum Beispiel **23 cm, 13 cm, 30 m, 6 m, 1850–2000 kHz**) bist du Gast: Du darfst andere (primäre) Nutzer — Radar, Navigation, Funkmessdienst — nicht stören und musst Störungen hinnehmen. In der Prüfung: **40 m (7000–7200 kHz) ist primär**, dagegen 30 m (10100–10150), 1850–1890 kHz und 135,7–137,8 kHz nur **sekundär**.

**Zwei Besonderheiten.** Auf **80 m** ist der Amateurfunk primär — **gemeinsam** mit dem [Seefunkdienst](wiki:Seefunk|Maritime mobile service). Eine [**Küstenfunkstelle**](wiki:Küstenfunkstelle|Coast radio station) hat eine **feste Frequenz**, die sie nicht ändern darf. Merkst du erst nach Betriebsaufnahme, dass du auf ihrer Frequenz sendest, räumst du sie — auch wenn die Küstenfunkstelle nur eine automatische Morseschleife sendet, auch ohne Aufforderung, auch wenn du 200 km von der Küste entfernt bist und unter 100 W sendest. (Ausnahme: ein echter Notfall.) Im **70-cm-Band** liegt ein **[ISM-Bereich](wiki:ISM-Band|ISM radio band)** (433,05–434,79 MHz), den du mit **industriellen, wissenschaftlichen, medizinischen, häuslichen** Anwendungen (Garagentoröffner, Funkwetterstationen, Autoschlüssel) **mitbenutzt**: Obwohl der Amateurfunk dort primär ist, musst du Störungen durch ISM-Geräte hinnehmen. Das heißt nicht, dass die Leistung reduziert werden muss oder der Bereich nur sekundär wäre.

Und im Ausland? Die Zuweisungen können in anderen Ländern **abweichen** — informiere dich vor der Betriebsaufnahme über die Bestimmungen des Gastlandes.
`,
    },
    {
      id: 'warn-prisek', type: 'callout', tone: 'warning', title: 'Fehlvorstellungen zu primär/sekundär',
      md: `
- „Primär = zuerst zugeteilt, sekundär = später“ — Nein: Der Status sagt, **wer vor wem Schutz** hat.
- „Sekundär muss Störungen hinnehmen, darf sie aber nicht melden“ — Falsch: Du kannst zwar keinen Schutz vor primären Diensten verlangen, aber das Melden von Störungen ist dir nicht verwehrt.
- „Die Einteilung gilt nur für kommerzielle Funkstellen“ — Falsch: auch für den Amateurfunkdienst.
- „Amateurfunk ist nie primär, weil er kein Sicherheitsfunkdienst ist“ — Falsch: In vielen Bändern ist er **primär**.
`,
    },
    {
      id: 'viz-prisek', type: 'viz', viz: 'primaer-sekundaer', title: 'Wer hat Vorrang? Szenarien',
      params: { count: 7, need: 6 },
      task: 'Beantworte **6 von 7** Szenarien richtig.',
    },
    {
      id: 'quiz-regelwerke', type: 'quiz', title: 'Wo schlägst du nach?',
      question: 'Wo findest du die für dich zulässigen Frequenzbereiche und ihre Nutzungsbedingungen?',
      options: [
        { text: 'In der Anlage 1 der AFuV und gegebenenfalls weiteren Mitteilungen der Bundesnetzagentur.', correct: true, why: 'Nationale Umsetzung der internationalen Vorgaben.' },
        { text: 'In Artikel 5 der Radio Regulations.', correct: false, why: 'Die RR sind internationale Zuweisungen; verbindlich ist die nationale Umsetzung.' },
        { text: 'Im Amateurfunkgesetz.', correct: false, why: 'Das AFuG ist die Rechtsgrundlage, nennt aber keine Bänder.' },
        { text: 'Im Frequenzplan oder in der Anlage zur Frequenzverordnung.', correct: false, why: 'Dort stehen allgemeine Zuweisungen; die Amateurfunkbänder mit Klassen und Leistungen stehen in der AFuV.' },
      ],
    },
    {
      id: 'mission', type: 'callout', tone: 'mission', title: 'Funkpraxis: Dein Bandwahl-Spickzettel',
      md: `
Für den Anfang als Klasse E: **2 m und 70 cm** (primär, 75 W PEP, viele Relais, FM-Anruf 145,500 und 433,500 MHz) und **10 m** (28–29,7 MHz, 100 W PEP, abhängig vom Sonnenzyklus Weltverbindungen mit kleiner Leistung). Auf **80 m** und **160 m** funkst du abends und nachts über größere Entfernungen; **23 cm** und höher ist Experimentierterrain (sekundär: Vorsicht, besonders bei Radar und Navigation, und im Teilbereich 1247–1263 MHz sogar nur 3,05 W ERP). Drucke dir Anlage 1 aus oder lade sie aufs Handy — in der Prüfung liegt sie auf dem Tisch.

*Prüfungsbezug:* VA401–VA405 (Regionen), VC110, VD101, VD701–VD703, VD709–VD722 (Bandgrenzen), VD704–VD708 (primär/sekundär, Küstenfunk, ISM), VE102 (Frequenzzuteilung).
`,
    },
    {
      id: 'recall', type: 'recall', title: 'Mit eigenen Worten',
      prompt: 'Erkläre: Warum darfst du nicht einfach „irgendwo“ im Funkspektrum senden, wo findest du deine Frequenzen und was ändert sich, wenn ein Band für dich „sekundär“ ist?',
      answer: 'Jede Frequenznutzung braucht nach dem TKG eine Zuteilung. Für Funkamateure sind die im Frequenzplan für den Amateurfunkdienst ausgewiesenen Frequenzen zugeteilt (§ 3 Abs. 5 AFuG), nur dort darf gesendet werden. Welche Bereiche, Leistungen und Bedingungen für welche Klasse gelten, steht in Anlage 1 der AFuV (und weiteren Mitteilungen der BNetzA) — nicht in den RR, die nur international zuweisen (drei Regionen, Deutschland = Region 1). Sekundär: ich darf Funkstellen primärer Dienste nicht stören und kann vor deren Störungen keinen Schutz verlangen; primär: ich kann Schutz vor sekundären Diensten verlangen.',
      hints: ['TKG → AFuG § 3 → AFuV Anlage 1', 'Primär = Schutz, sekundär = Gast'],
      cards: ['wo-baender', 'prim-sek'],
    },
  ],
  cards: [
    { id: 'tkg-zuteilung', front: 'Braucht jede Frequenznutzung eine Zuteilung?', back: 'Ja, jede Frequenznutzung bedarf einer vorherigen Frequenzzuteilung (TKG) — auch Allgemeinzuteilungen (z. B. für Funkamateure, ISM).' },
    { id: 'wo-baender', front: 'Wo stehen deine Frequenzbereiche und Nutzungsbedingungen?', back: 'In Anlage 1 der AFuV und gegebenenfalls weiteren Mitteilungen der Bundesnetzagentur — nicht in den RR, im AFuG oder in der Frequenzverordnung.' },
    { id: 'nur-ausgewiesen', front: 'Auf welchen Frequenzen darf ein Funkamateur senden?', back: 'Nur auf den für den Amateurfunkdienst ausgewiesenen Frequenzen (und im Rahmen der Klasse); nicht auf allen Frequenzen der ITU-Region oder bei Notfunkübung außerhalb.' },
    { id: 'regionen', front: 'ITU-Regionen: Anzahl und Beispiele?', back: 'Drei Regionen (damit Zuweisungen unterschiedlich sein können). Region 1: Europa, Afrika, Russland, Naher Osten (Deutschland). Region 2: Amerika (Kanada). Region 3: Süd-/Ostasien, Australien, Ozeanien.' },
    { id: 'baender-niedrig', front: 'Bandgrenzen 160 m, 80 m, 40 m, 30 m, 20 m, 17 m?', back: '160 m 1810–2000 kHz; 80 m 3,5–3,8 MHz; 40 m 7–7,2 MHz; 30 m 10,1–10,15 MHz; 20 m 14–14,35 MHz; 17 m 18,068–18,168 MHz.' },
    { id: 'baender-hoch', front: 'Bandgrenzen 15 m, 12 m, 10 m, 6 m, 2 m, 70 cm, 23 cm, 13 cm?', back: '15 m 21–21,45 MHz; 12 m 24,89–24,99 MHz; 10 m 28–29,7 MHz; 6 m 50–52 MHz; 2 m 144–146 MHz; 70 cm 430–440 MHz; 23 cm 1240–1300 MHz; 13 cm 2320–2450 MHz.' },
    { id: 'klasse-e-baender', front: 'Welche Bänder hat die Klasse E (Auswahl)?', back: '160, 80, 15, 10 m, 2 m, 70 cm, 23 cm, 13 cm und höhere Mikrowellenbänder. Nicht: 40, 30, 20, 17, 12, 6 m. Klasse N: nur 28–29,7, 144–146 und 430–440 MHz.' },
    { id: 'prim-sek', front: 'Primär vs. sekundär?', back: 'Primär: Schutz gegen Störungen durch sekundäre Dienste verlangbar. Sekundär: darf primäre nicht stören und kann keinen Schutz vor ihnen verlangen — unabhängig vom Zeitpunkt der Zuteilung.' },
    { id: 'status-bsp', front: 'Primär oder sekundär? 40 m, 30 m, 2 m, 23 cm, 1850–1890 kHz', back: '40 m primär, 30 m sekundär, 2 m primär, 23 cm sekundär, 1850–1890 kHz sekundär.' },
    { id: 'kuestenfunk', front: 'Du sendest auf 80 m und bemerkst eine Küstenfunkstelle auf deiner Frequenz?', back: 'Du räumst die Frequenz (außer im echten Notfall): Die Küstenfunkstelle hat eine feste Frequenz, die sie nicht ändern kann.' },
    { id: 'ism-k', front: 'Was bedeutet der ISM-Hinweis (433,05–434,79 MHz)?', back: 'Der Bereich wird für industrielle, wissenschaftliche, medizinische, häusliche Anwendungen mitbenutzt; Störungen durch solche Geräte müssen hingenommen werden.' },
    { id: 'ausland-status', front: 'Gilt der Status primär/sekundär auch im Ausland?', back: 'Nicht unbedingt: In anderen Ländern können Zuweisungen abweichen — vor der Betriebsaufnahme über das Gastland informieren.' },
  ],
};
