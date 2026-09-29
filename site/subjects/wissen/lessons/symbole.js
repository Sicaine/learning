export default {
  id: 'symbole',
  title: 'Symbole & Nationale Identität',
  summary: 'Schwarz-Rot-Gold, das Deutschlandlied, der Bundesadler — und eine Erinnerungskultur, die weltweit als besonders gilt. Woher die Symbole kommen und wie Deutschland mit seiner Geschichte umgeht.',
  minutes: 20,
  goals: [
    'Herkunft und Bedeutung von [[schwarz-rot-gold|Schwarz-Rot-Gold]] erklären',
    'Die Geschichte des [[deutschlandlied|Deutschlandlieds]] kennen und wissen, welche Strophe die Hymne ist',
    'Den Weg von Bonn nach Berlin als Hauptstadt nachzeichnen',
    'Formen der deutschen [[erinnerungskultur|Erinnerungskultur]] und den [[schicksalstag|9. November]] einordnen',
  ],
  blocks: [
    {
      id: 'flagge', type: 'text', title: 'Schwarz-Rot-Gold',
      md: `
Die Farben **[[schwarz-rot-gold|Schwarz-Rot-Gold]]** stehen für **Einheit und Freiheit** — sie waren von Anfang an die Farben der Demokratie, nicht der Monarchie.

- Sie gehen auf das **Lützowsche Freikorps** in den Befreiungskriegen gegen Napoleon (1813) zurück: schwarze Uniformen, rote Aufschläge, goldene (messingfarbene) Knöpfe.
- Studentische Burschenschaften übernahmen sie; beim **Hambacher Fest 1832** wehten sie als Symbol für ein freies, geeintes Deutschland.
- Die **Revolution von 1848** und die Frankfurter Nationalversammlung erklärten sie zu den Farben des Deutschen Bundes.
- Das Kaiserreich (1871) wählte dagegen **Schwarz-Weiß-Rot**. Die **Weimarer Republik** kehrte zu Schwarz-Rot-Gold zurück, die Nationalsozialisten schafften es wieder ab.
- **1949** legte das Grundgesetz fest: „Die Bundesflagge ist schwarz-rot-gold“ (**Art. 22 GG**). Die DDR nutzte dieselben Farben, ab 1959 mit Hammer, Zirkel und Ährenkranz.

Das **Wappen** zeigt den **Bundesadler**: einen schwarzen Adler mit roten Krallen und Schnabel auf goldenem Grund. Im Plenarsaal des Bundestags hängt eine große, rundliche Version — im Volksmund „**fette Henne**“.`,
    },
    {
      id: 'hymne', type: 'text', title: 'Das Deutschlandlied',
      md: `
Den Text des **[[deutschlandlied|Lieds der Deutschen]]** schrieb **August Heinrich Hoffmann von Fallersleben** im August **1841** auf der damals britischen Insel **Helgoland**. Die Melodie ist älter: Sie stammt von **Joseph Haydn**, der sie **1797** für die österreichische Kaiserhymne „Gott erhalte Franz, den Kaiser“ komponierte.

Das Lied hat drei Strophen:

1. „Deutschland, Deutschland über alles …“ — 1841 als Aufruf zur Einigung der zersplitterten Kleinstaaten gemeint, nicht als Anspruch auf Überlegenheit. Die Nationalsozialisten missbrauchten sie; sie wird heute nicht gesungen.
2. „Deutsche Frauen, deutsche Treue, deutscher Wein und deutscher Sang …“
3. „**Einigkeit und Recht und Freiheit** für das deutsche Vaterland …“

Seit **1952** ist das Lied Nationalhymne der Bundesrepublik, bei offiziellen Anlässen wurde nur die dritte Strophe gesungen. **Seit 1991** ist offiziell festgelegt: **Nur die dritte Strophe ist die Nationalhymne.** Die DDR hatte eine eigene Hymne: „Auferstanden aus Ruinen“ (Text: Johannes R. Becher, Musik: Hanns Eisler), deren Text ab den 1970er-Jahren wegen der Zeile „Deutschland einig Vaterland“ nicht mehr gesungen wurde.[^wiki-deutschlandlied]`,
    },
    {
      id: 'order-farben', type: 'order', title: 'Die Geschichte der Farben',
      prompt: 'Bring die Stationen von Schwarz-Rot-Gold in die richtige Reihenfolge.',
      items: ['Lützowsches Freikorps in den Befreiungskriegen', 'Hambacher Fest', 'Frankfurter Nationalversammlung (Revolution)', 'Weimarer Republik übernimmt die Farben', 'Grundgesetz: Art. 22 legt die Bundesflagge fest'],
      explain: '1813 → 1832 → 1848 → 1919 → 1949. Im Kaiserreich (1871–1918) und in der NS-Zeit galten andere Farben.',
    },
    {
      id: 'hauptstadt', type: 'text', title: 'Bonn oder Berlin?',
      md: `
1949 wurde das beschauliche **Bonn** am Rhein „vorläufige“ Hauptstadt der Bundesrepublik — auch um zu zeigen, dass die Teilung nicht endgültig sein sollte. Frankfurt am Main war der Konkurrent; Konrad Adenauer, der aus der Nähe von Bonn stammte, setzte sich durch.

Nach der Wiedervereinigung bestimmte der Einigungsvertrag **Berlin** zur Hauptstadt. Wo aber Parlament und Regierung sitzen sollten, war heftig umstritten. Am **20. Juni 1991** stimmte der Bundestag nach einer langen, emotionalen Debatte ab: **338 zu 320 Stimmen für Berlin** — ein knappes Ergebnis.[^wiki-hauptstadtbeschluss]

- **1999** zog der Bundestag in das umgebaute **Reichstagsgebäude** mit der gläsernen Kuppel von **Norman Foster**.
- Bonn blieb „**Bundesstadt**“; mehrere Ministerien haben dort bis heute ihren ersten Dienstsitz.
- Seit **2006** steht im Grundgesetz (Art. 22): „Die Hauptstadt der Bundesrepublik Deutschland ist Berlin.“`,
    },
    {
      id: 'calc-stimmen', type: 'numeric', title: 'Wie knapp war es?',
      question: 'Beim Hauptstadtbeschluss 1991 stimmten 338 Abgeordnete für Berlin und 320 für Bonn. Wie viele Abgeordnete hätten ihre Stimme von Berlin zu Bonn wechseln müssen, damit Bonn **gewinnt**?',
      answer: 10, tolerance: 0,
      hint: 'Der Abstand beträgt 18 Stimmen. Jeder Wechsel verschiebt den Abstand um 2.',
      explain: 'Mit 9 Wechseln stünde es 329 : 329 (Gleichstand, Antrag abgelehnt). Erst **10** Wechsel ergeben 328 : 330 für Bonn.',
    },
    {
      id: 'erinnerung', type: 'text', title: 'Erinnerungskultur',
      md: `
Kaum ein Land setzt sich so intensiv mit den dunklen Seiten seiner Geschichte auseinander wie Deutschland — man spricht von **[[erinnerungskultur|Erinnerungskultur]]** oder „Vergangenheitsbewältigung“. Einige Beispiele:

- **Denkmal für die ermordeten Juden Europas** (Holocaust-Mahnmal) in Berlin, eingeweiht **2005**, entworfen von **Peter Eisenman**: 2.711 Betonstelen nahe dem Brandenburger Tor.
- **[[stolpersteine|Stolpersteine]]**: kleine Messingplatten im Gehweg vor den letzten frei gewählten Wohnorten von NS-Opfern. Der Künstler **Gunter Demnig** verlegt sie seit den 1990er-Jahren; inzwischen gibt es mehr als 100.000 in über 30 Ländern — das größte dezentrale Mahnmal der Welt.
- **KZ-Gedenkstätten** wie Dachau, Buchenwald, Sachsenhausen oder Bergen-Belsen.
- Der **27. Januar** ist seit 1996 **Tag des Gedenkens an die Opfer des Nationalsozialismus** — am 27. Januar 1945 befreite die Rote Armee das Vernichtungslager Auschwitz.
- Auch die **DDR-Diktatur** wird aufgearbeitet: Die Stasi-Unterlagen sind seit 1992 einsehbar, die Gedenkstätte Berliner Mauer erinnert an die Teilung.`,
    },
    {
      id: 'neunter', type: 'viz', viz: 'timeline', title: 'Der 9. November — Deutschlands Schicksalstag',
      params: { events: [
        { year: 1848, label: 'Robert Blum erschossen', detail: 'Der Abgeordnete der Paulskirche wird in Wien hingerichtet — ein Symbol für das Scheitern der Revolution.' },
        { year: 1918, label: 'Ausrufung der Republik', detail: 'Philipp Scheidemann ruft vom Reichstag die Republik aus; Kaiser Wilhelm II. dankt ab.' },
        { year: 1923, label: 'Hitler-Putsch', detail: 'Gescheiterter Putschversuch in München.' },
        { year: 1938, label: 'Novemberpogrome', detail: 'Synagogen brennen, jüdische Geschäfte werden zerstört, Tausende Juden verhaftet — organisierte Gewalt der Nationalsozialisten.' },
        { year: 1989, label: 'Fall der Mauer', detail: 'Nach einer missverständlichen Pressekonferenz öffnen die Grenzübergänge in Berlin.' },
      ] },
      caption: 'Wegen der Pogrome von 1938 wurde nicht der 9. November, sondern der 3. Oktober zum Nationalfeiertag.',
    },
    {
      id: 'quiz-hymne', type: 'quiz', title: 'Die Hymne',
      question: 'Welche Aussagen zur deutschen Nationalhymne stimmen? (Mehrfachauswahl)',
      options: [
        { text: 'Nationalhymne ist nur die dritte Strophe des Deutschlandlieds.', correct: true, why: 'Seit 1991 offiziell festgelegt.' },
        { text: 'Die Melodie stammt von Joseph Haydn.', correct: true, why: 'Ursprünglich die österreichische Kaiserhymne von 1797.' },
        { text: 'Hoffmann von Fallersleben schrieb den Text 1841 auf Helgoland.', correct: true, why: 'Helgoland war damals britisch.' },
        { text: 'Der Text wurde 1949 für die Bundesrepublik neu geschrieben.', correct: false, why: 'Der Text ist von 1841; 1952 wurde das bestehende Lied zur Hymne.' },
        { text: 'Die erste Strophe darf offiziell bei Staatsakten gesungen werden.', correct: false, why: 'Offizielle Hymne ist nur die dritte Strophe.' },
      ],
    },
    {
      id: 'match', type: 'match', title: 'Symbole zuordnen',
      pairs: [
        ['Art. 22 GG', 'Bundesflagge und Hauptstadt Berlin'],
        ['Hoffmann von Fallersleben', 'Text des Deutschlandlieds (1841)'],
        ['„Fette Henne“', 'Spitzname des Bundesadlers im Bundestag'],
        ['Gunter Demnig', 'Stolpersteine'],
        ['Peter Eisenman', 'Holocaust-Mahnmal in Berlin'],
        ['Norman Foster', 'Glaskuppel des Reichstagsgebäudes'],
      ],
    },
    {
      id: 'fact-helgoland', type: 'callout', tone: 'fact', title: 'Die Hymne entstand im Ausland',
      md: 'Helgoland gehörte 1841 zu Großbritannien — der Text der deutschen Nationalhymne wurde also auf britischem Boden geschrieben. Erst 1890 kam die Insel im Tausch gegen Rechte in Ostafrika (Sansibar) an das Deutsche Reich.',
    },
    {
      id: 'recall', type: 'recall', title: 'Warum der 3. Oktober?',
      prompt: 'Warum ist der **3. Oktober** Nationalfeiertag und nicht der 9. November, an dem die Mauer fiel?',
      answer: 'Der **9. November** ist ein widersprüchlicher „Schicksalstag“: Neben dem Mauerfall 1989 und der Ausrufung der Republik 1918 steht er auch für den Hitler-Putsch 1923 und vor allem für die **Novemberpogrome 1938**, bei denen die Nationalsozialisten Synagogen anzündeten und Juden verfolgten. Ein Feiertag an diesem Datum galt daher als unangemessen. Der **3. Oktober** ist der Tag, an dem die DDR 1990 der Bundesrepublik **beitrat** und die Einheit rechtlich vollzogen wurde.',
      hints: ['Was geschah am 9. November 1938?'],
      cards: ['neunter', 'dritter'],
    },
  ],
  cards: [
    { id: 'farben', front: 'Wofür stehen Schwarz-Rot-Gold historisch?', back: 'Einheit und Freiheit — die Farben der demokratischen Bewegung (Lützower 1813, Hambach 1832, 1848).' },
    { id: 'hambach', front: 'Hambacher Fest — Jahr und Bedeutung', back: '1832; große Kundgebung für Freiheit und Einheit, Schwarz-Rot-Gold als Symbol.' },
    { id: 'kaiserreich-farben', front: 'Welche Farben hatte das Kaiserreich (1871)?', back: 'Schwarz-Weiß-Rot.' },
    { id: 'art22', front: 'Was regelt Art. 22 GG?', back: 'Die Bundesflagge ist schwarz-rot-gold; die Hauptstadt ist Berlin (seit 2006 im GG).' },
    { id: 'hymne-text', front: 'Deutschlandlied: Textdichter, Jahr, Ort', back: 'August Heinrich Hoffmann von Fallersleben, 1841, Helgoland.' },
    { id: 'hymne-melodie', front: 'Von wem stammt die Melodie der Nationalhymne?', back: 'Joseph Haydn (1797, „Gott erhalte Franz, den Kaiser“).' },
    { id: 'hymne-strophe', front: 'Welche Strophe ist die Nationalhymne?', back: 'Nur die dritte: „Einigkeit und Recht und Freiheit“ (offiziell seit 1991).' },
    { id: 'ddr-hymne', front: 'Hymne der DDR', back: '„Auferstanden aus Ruinen“ (Text: Johannes R. Becher, Musik: Hanns Eisler).' },
    { id: 'adler', front: 'Wie nennt man den Bundesadler im Bundestag scherzhaft?', back: '„Fette Henne“.' },
    { id: 'bonn', front: 'Warum wurde 1949 Bonn Hauptstadt?', back: 'Als „vorläufige“ Hauptstadt — Zeichen, dass die Teilung nicht endgültig sein sollte; Adenauer setzte Bonn gegen Frankfurt durch.' },
    { id: 'hauptstadtbeschluss', front: 'Hauptstadtbeschluss: Datum und Ergebnis', back: '20. Juni 1991; 338 zu 320 Stimmen für Berlin als Sitz von Parlament und Regierung.' },
    { id: 'reichstag', front: 'Wann zog der Bundestag in den Reichstag, wer baute die Kuppel?', back: '1999; Norman Foster.' },
    { id: 'mahnmal', front: 'Holocaust-Mahnmal in Berlin', back: 'Denkmal für die ermordeten Juden Europas, 2005, Peter Eisenman, 2.711 Stelen.' },
    { id: 'stolpersteine', front: 'Was sind Stolpersteine?', back: 'Messingplatten vor den letzten Wohnorten von NS-Opfern (Gunter Demnig); größtes dezentrales Mahnmal der Welt.' },
    { id: '27januar', front: 'Warum ist der 27. Januar Gedenktag?', back: 'Befreiung von Auschwitz am 27.1.1945; seit 1996 Tag des Gedenkens an die Opfer des Nationalsozialismus.' },
    { id: 'neunter', front: 'Was geschah an einem 9. November? (vier Ereignisse)', back: '1918 Ausrufung der Republik, 1923 Hitler-Putsch, 1938 Novemberpogrome, 1989 Mauerfall.' },
    { id: 'dritter', front: 'Warum ist der 3. Oktober Nationalfeiertag?', back: 'Beitritt der DDR zur Bundesrepublik am 3.10.1990; der 9. November ist wegen der Pogrome 1938 belastet.' },
  ],
};
