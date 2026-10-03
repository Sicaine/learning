export default {
  id: 'teilung',
  title: 'Zwei deutsche Staaten',
  summary: 'Besatzungszonen und Luftbrücke, Grundgesetz und DDR, Wirtschaftswunder und Mauerbau, 1968 und Ostpolitik: vier Jahrzehnte Deutschland im Kalten Krieg.',
  minutes: 24,
  goals: [
    'Die Nachkriegsordnung mit [[besatzungszonen|Besatzungszonen]] und Potsdamer Konferenz beschreiben',
    'Erklären, wie es 1949 zu zwei deutschen Staaten kam ([[waehrungsreform|Währungsreform]], [[berlin-blockade|Berlin-Blockade]])',
    'Bundesrepublik und [[ddr|DDR]] in Politik und Wirtschaft vergleichen',
    'Den Bau der [[berliner-mauer|Berliner Mauer]] und die [[ostpolitik|Ostpolitik]] einordnen',
  ],
  blocks: [
    {
      id: 'stunde-null', type: 'text', title: '1945: „Stunde Null"',
      md: `
Nach der Kapitulation übernahmen die vier Siegermächte die Regierungsgewalt. Deutschland wurde in **vier [[besatzungszonen|Besatzungszonen]]** geteilt — amerikanisch (Süden), britisch (Nordwesten), französisch (Südwesten) und sowjetisch (Osten). **Berlin**, mitten in der sowjetischen Zone, wurde in vier Sektoren geteilt.

Auf der **[Potsdamer Konferenz](wiki:Potsdamer Konferenz|Potsdam Conference)** (Juli/August 1945) beschlossen [Truman](wiki:Harry S. Truman|Harry S. Truman), [Stalin](wiki:Josef Stalin|Joseph Stalin) und [Churchill](wiki:Winston Churchill|Winston Churchill) bzw. [Attlee](wiki:Clement Attlee|Clement Attlee) die „vier D": **Denazifizierung, Demilitarisierung, Demokratisierung, Dezentralisierung**. Die Gebiete östlich von **[Oder und Neiße](wiki:Oder-Neiße-Grenze|Oder–Neisse line)** kamen unter polnische bzw. sowjetische Verwaltung. **12 bis 14 Millionen** Deutsche [flohen oder wurden aus Ostmitteleuropa vertrieben](wiki:Flucht und Vertreibung Deutscher aus Mittel- und Osteuropa 1945–1950|Flight and expulsion of Germans (1944–1950)) — eine gewaltige Integrationsaufgabe für beide späteren Staaten.

Die „Stunde Null" war nie ganz null: Viele Belastete kehrten in Justiz, Verwaltung und Wirtschaft zurück — die Aufarbeitung der NS-Zeit begann in der Breite erst Jahre später ([Auschwitz-Prozesse](wiki:Auschwitzprozess|Frankfurt Auschwitz trials) 1963–65, 1968).`,
    },
    {
      id: 'map-zonen', type: 'map', title: 'Deutschland 1945: Besatzungszonen',
      view: 'de',
      layers: { cities: false },
      highlight: [
        { label: 'Amerikanische Zone', color: '#2563eb', states: ['Bayern', 'Hessen', 'Freie Hansestadt Bremen'] },
        { label: 'Britische Zone', color: '#dc2626', states: ['Niedersachsen', 'Nordrhein-Westfalen', 'Schleswig-Holstein', 'Hamburg'] },
        { label: 'Französische Zone', color: '#0d9488', states: ['Rheinland-Pfalz', 'Saarland'] },
        { label: 'Baden-Württemberg: geteilt (Nord amerikanisch, Süd französisch)', color: '#7c3aed', states: ['Baden-Württemberg'] },
        { label: 'Sowjetische Zone', color: '#ca8a04', states: ['Brandenburg', 'Mecklenburg-Vorpommern', 'Sachsen', 'Sachsen-Anhalt', 'Thüringen'] },
        { label: 'Berlin: vier Sektoren', color: '#475569', states: ['Berlin'] },
      ],
      places: [
        { name: 'Potsdam', kind: 'site', pos: 'l', detail: '**[Potsdam](wiki:Potsdam|Potsdam)** — Juli/August 1945: die Potsdamer Konferenz von Truman, Stalin und Churchill/Attlee.' },
        { name: 'Berlin', kind: 'capital', pos: 'r', detail: '**[Berlin](wiki:Berlin|Berlin)** — liegt mitten in der sowjetischen Zone und wurde in vier Sektoren geteilt.' },
      ],
      caption: 'Die Zonen sind hier nach heutigen Ländern eingefärbt — die Landesgrenzen von 1945 waren teils andere (z. B. Hessen, Württemberg-Baden). Nicht dargestellt sind die Gebiete östlich von Oder und Neiße (heute Polen und Russland), die unter polnische bzw. sowjetische Verwaltung kamen.',
    },
    {
      id: 'zwei-staaten', type: 'text', title: '1948/49: Der Weg in die Teilung',
      md: `
Im beginnenden [[kalter-krieg|Kalten Krieg]] entwickelten sich West- und Ostzonen auseinander:

- Die USA boten mit dem **[[marshallplan|Marshallplan]]** (1948) Wiederaufbauhilfe an — die Sowjetunion lehnte für ihren Machtbereich ab.
- Am **20. Juni 1948** führte die **[[waehrungsreform|Währungsreform]]** in den Westzonen die **[D-Mark](wiki:D-Mark|Deutsche Mark)** ein.
- Die Sowjetunion antwortete mit der **[[berlin-blockade|Berlin-Blockade]]** (Juni 1948 – Mai 1949). Die Westmächte versorgten West-Berlin über die **[Luftbrücke](wiki:Berliner Luftbrücke|Berlin Airlift)** mit „Rosinenbombern".
- Ein **[Parlamentarischer Rat](wiki:Parlamentarischer Rat|Parlamentarischer Rat)** erarbeitete in [Bonn](wiki:Bonn|Bonn) das **[Grundgesetz](wiki:Grundgesetz für die Bundesrepublik Deutschland|Basic Law for the Federal Republic of Germany)**, verkündet am **23. Mai 1949** — Gründung der **Bundesrepublik Deutschland**. Es war bewusst als Provisorium bis zur Wiedervereinigung gedacht.
- Am **7. Oktober 1949** wurde im Osten die **[Deutsche Demokratische Republik](wiki:Deutsche Demokratische Republik|East Germany)** gegründet.

Erster Bundeskanzler wurde **[Konrad Adenauer](wiki:Konrad Adenauer|Konrad Adenauer)** (CDU, 1949–1963), Hauptstadt das „provisorische" **Bonn**.`,
    },
    {
      id: 'map-luftbruecke', type: 'map', title: 'Die Berliner Luftbrücke 1948/49',
      view: [6.3, 49.6, 15.3, 54.4],
      highlight: [{ label: 'Sowjetische Besatzungszone (heutige Länder)', color: '#ca8a04', states: ['Brandenburg', 'Mecklenburg-Vorpommern', 'Sachsen', 'Sachsen-Anhalt', 'Thüringen'] }],
      places: [
        { name: 'Berlin', kind: 'capital', pos: 'r', detail: '**[Berlin](wiki:Berlin|Berlin)** — West-Berlin war von der sowjetischen Zone umschlossen; die Blockade sperrte die Straßen-, Schienen- und Wasserwege.' },
        { name: 'Hamburg', pos: 'l', detail: '**[Hamburg](wiki:Hamburg|Hamburg)** — Ausgangspunkt der Nordroute.' },
        { name: 'Hannover', pos: 'l', detail: '**[Hannover](wiki:Hannover|Hanover)** — Ausgangspunkt der mittleren Route.' },
        { name: 'Frankfurt am Main', label: 'Frankfurt', pos: 'l', detail: '**[Frankfurt](wiki:Frankfurt am Main|Frankfurt)** — Ausgangspunkt der Südroute.' },
        { name: 'Bonn', pos: 'l', detail: '**[Bonn](wiki:Bonn|Bonn)** — ab 1949 Sitz des Bundestages und der Bundesregierung.' },
      ],
      lines: [
        { label: 'Nordkorridor', color: '#1d4ed8', arrow: true, labelAt: 0.5, coords: [[9.99, 53.55], [13.41, 52.52]], detail: 'Die drei Luftkorridore führten von Hamburg, Hannover und Frankfurt über die sowjetische Zone nach Berlin. Der Verlauf ist hier als gerade Linie vereinfacht.' },
        { label: 'Mittelkorridor', color: '#1d4ed8', arrow: true, labelAt: 0.5, coords: [[9.73, 52.37], [13.41, 52.52]] },
        { label: 'Südkorridor', color: '#1d4ed8', arrow: true, labelAt: 0.5, coords: [[8.68, 50.11], [13.41, 52.52]] },
      ],
      caption: 'Die Westmächte versorgten West-Berlin aus der Luft: Flugzeuge starteten in drei Korridoren von Hamburg, Hannover und Frankfurt. Die Linien sind schematisch.',
    },
    {
      id: 'vergleich', type: 'text', title: 'Zwei Staaten, zwei Systeme',
      md: `
<table><tr><th></th><th>Bundesrepublik Deutschland</th><th>DDR</th></tr>
<tr><td>Politisches System</td><td>Parlamentarische Demokratie, Rechtsstaat, Föderalismus</td><td>Diktatur der <strong>[SED](wiki:Sozialistische Einheitspartei Deutschlands|Socialist Unity Party of Germany)</strong>, Staatssicherheit (<strong>[Stasi](wiki:Ministerium für Staatssicherheit|Stasi)</strong>)</td></tr>
<tr><td>Wirtschaft</td><td>[Soziale Marktwirtschaft](wiki:Soziale Marktwirtschaft|Social market economy) ([Ludwig Erhard](wiki:Ludwig Erhard|Ludwig Erhard))</td><td>Zentrale <strong>[Planwirtschaft](wiki:Planwirtschaft|Planned economy)</strong>, [Volkseigene Betriebe](wiki:Volkseigener Betrieb|Volkseigener Betrieb)</td></tr>
<tr><td>Bündnis</td><td>[NATO](wiki:NATO|NATO) (1955), EWG (1957)</td><td>[Warschauer Pakt](wiki:Warschauer Pakt|Warsaw Pact) (1955), [RGW](wiki:Rat für gegenseitige Wirtschaftshilfe|Comecon)</td></tr>
<tr><td>Prägende Politiker</td><td>Adenauer, Erhard, [Brandt](wiki:Willy Brandt|Willy Brandt), [Schmidt](wiki:Helmut Schmidt|Helmut Schmidt), [Kohl](wiki:Helmut Kohl|Helmut Kohl)</td><td>[Ulbricht](wiki:Walter Ulbricht|Walter Ulbricht), [Honecker](wiki:Erich Honecker|Erich Honecker)</td></tr>
<tr><td>Hauptstadt</td><td>Bonn</td><td>Ost-Berlin</td></tr></table>

In der Bundesrepublik sorgte das **[[wirtschaftswunder|Wirtschaftswunder]]** für Wohlstand; ab 1955 kamen **[Gastarbeiter](wiki:Gastarbeiter|Gastarbeiter)** (Italien 1955, Türkei 1961). In der DDR schlug das Regime den **[[volksaufstand-17-juni|Volksaufstand vom 17. Juni 1953]]** mit sowjetischen Panzern nieder. Bis 1961 flohen rund **2,7 Millionen** Menschen aus der DDR in den Westen — vor allem junge und gut ausgebildete.`,
    },
    {
      id: 'mauer', type: 'text', title: '13. August 1961: Die Mauer',
      md: `
Um die Abwanderung zu stoppen, riegelten DDR-Grenztruppen in der Nacht zum **13. August 1961** die Sektorengrenze in Berlin ab. Aus Stacheldraht wurde die **[[berliner-mauer|Berliner Mauer]]** — offiziell „antifaschistischer Schutzwall". Noch im Juni hatte [Walter Ulbricht](wiki:Walter Ulbricht|Walter Ulbricht) behauptet: *„Niemand hat die Absicht, eine Mauer zu errichten."*

Die Grenzanlagen umschlossen West-Berlin auf rund **155 km**; die [innerdeutsche Grenze](wiki:Innerdeutsche Grenze|Inner German border) war fast 1.400 km lang. An der Berliner Mauer wurden mindestens **140 Menschen** getötet. US-Präsident **[John F. Kennedy](wiki:John F. Kennedy|John F. Kennedy)** besuchte 1963 West-Berlin: *„[Ich bin ein Berliner](wiki:Ich bin ein Berliner|Ich bin ein Berliner)."*[^chronik-mauer][^wp-berliner-mauer]`,
    },
    {
      id: 'video-mauer', type: 'video', youtube: 'OhV0wje9I64', label: 'Faktencheck Mauerbau', channel: 'Terra X',
    },
    {
      id: 'wandel', type: 'text', title: '1968, Ostpolitik und „Deutscher Herbst"',
      md: `
In der Bundesrepublik rebellierte **1968** eine [Studentenbewegung](wiki:Studentenbewegung|Student activism) gegen verkrustete Strukturen, den Vietnamkrieg und das Schweigen über die NS-Vergangenheit. Die Gesellschaft wurde liberaler und kritischer.

**[Willy Brandt](wiki:Willy Brandt|Willy Brandt)** (SPD) wurde 1969 Bundeskanzler — „**Mehr Demokratie wagen**". Seine **[[ostpolitik|Neue Ostpolitik]]** („Wandel durch Annäherung") suchte Entspannung: Verträge mit Moskau und Warschau (1970), der **[Grundlagenvertrag](wiki:Grundlagenvertrag|Basic Treaty, 1972)** mit der DDR (1972), 1973 Aufnahme beider Staaten in die **UNO**. Unvergessen ist Brandts **[Kniefall von Warschau](wiki:Kniefall von Warschau|Kniefall von Warschau)** am 7. Dezember 1970 vor dem Mahnmal des Ghetto-Aufstands. 1971 erhielt er den Friedensnobelpreis.[^wp-ostpolitik]

In den 1970er-Jahren erschütterte der Terror der linksextremistischen **[RAF](wiki:Rote Armee Fraktion|Red Army Faction)** (Rote Armee Fraktion) die Bundesrepublik, mit dem „**[Deutschen Herbst](wiki:Deutscher Herbst|German Autumn)**" 1977 als Höhepunkt (Entführung und Ermordung von Arbeitgeberpräsident [Hanns Martin Schleyer](wiki:Hanns Martin Schleyer|Hanns Martin Schleyer)).`,
    },
    {
      id: 'timeline-teilung', type: 'game', viz: 'timeline', title: 'Deutschland 1945–1973',
      params: {
        mode: 'sort',
        events: [
          { year: 1945, label: 'Potsdamer Konferenz' },
          { year: 1948, label: 'Währungsreform, Luftbrücke' },
          { year: 1949, label: 'Grundgesetz und DDR' },
          { year: 1953, label: 'Volksaufstand in der DDR' },
          { year: 1955, label: 'BRD in der NATO' },
          { year: 1961, label: 'Mauerbau' },
          { year: 1970, label: 'Kniefall von Warschau' },
          { year: 1973, label: 'Beide Staaten in der UNO' },
        ],
      },
    },
    {
      id: 'map-quiz-teilung', type: 'map', title: 'Orte der Teilung: Wo liegt …?',
      view: 'de',
      layers: { cities: false },
      quiz: { rounds: 6 },
      places: [{ name: 'Bonn' }, { name: 'Berlin' }, { name: 'Hamburg' }, { name: 'Frankfurt am Main', label: 'Frankfurt' }, { name: 'Leipzig' }, { name: 'Hannover' }],
    },
    {
      id: 'quiz-1949', type: 'quiz', title: 'Das Jahr 1949',
      question: 'Welche Aussagen über das Jahr 1949 stimmen?',
      options: [
        { text: 'Am 23. Mai wurde das Grundgesetz verkündet.', correct: true, why: 'Gründungstag der Bundesrepublik.' },
        { text: 'Am 7. Oktober wurde die DDR gegründet.', correct: true, why: 'Die Staatsgründung im Osten folgte der im Westen.' },
        { text: 'Konrad Adenauer wurde erster Bundeskanzler.', correct: true, why: 'Er regierte bis 1963.' },
        { text: 'Die Berliner Mauer wurde gebaut.', correct: false, why: 'Der Mauerbau begann am 13. August 1961.' },
        { text: 'Die D-Mark wurde eingeführt.', correct: false, why: 'Die Währungsreform war am 20. Juni 1948.' },
      ],
    },
    {
      id: 'match-kanzler', type: 'match', title: 'Köpfe der Teilungszeit',
      pairs: [
        ['Konrad Adenauer', 'erster Bundeskanzler, Westbindung'],
        ['Ludwig Erhard', '„Vater des Wirtschaftswunders"'],
        ['Walter Ulbricht', 'SED-Chef beim Mauerbau'],
        ['Willy Brandt', 'Ostpolitik, Kniefall von Warschau'],
        ['John F. Kennedy', '„Ich bin ein Berliner" (1963)'],
        ['Erich Honecker', 'SED-Chef 1971–1989'],
      ],
    },
    {
      id: 'num-flucht', type: 'numeric', title: 'Abstimmung mit den Füßen',
      question: 'Zwischen Gründung der DDR (1949) und Mauerbau (1961) flohen rund **2,7 Millionen** Menschen. Die DDR hatte 1949 etwa **18,8 Millionen** Einwohner. Wie viel Prozent der Ausgangsbevölkerung waren das? (auf eine Nachkommastelle)',
      answer: 14.4, tolerance: 0.3, unit: '%',
      hint: '2,7 ÷ 18,8 × 100.',
      explain: '2,7 ÷ 18,8 ≈ 0,144 → etwa **14 %** — jeder siebte Mensch. Weil vor allem junge Fachkräfte gingen, bedrohte das die DDR existenziell; der Mauerbau war die Antwort.',
    },
    {
      id: 'recall-mauer', type: 'recall', title: 'Warum baute die DDR die Mauer?',
      prompt: 'Erkläre in 2–4 Sätzen, warum die DDR 1961 die Mauer baute — und wie sie das offiziell begründete.',
      answer: `Bis 1961 hatten rund **2,7 Millionen** Menschen die DDR verlassen, vor allem junge, gut ausgebildete Fachkräfte — viele über das offene West-Berlin. Diese „Abstimmung mit den Füßen" bedrohte Wirtschaft und Legitimität des SED-Staates. Mit dem Mauerbau am **13. August 1961** sperrte die DDR ihre eigene Bevölkerung ein; offiziell nannte sie die Mauer einen „**antifaschistischen Schutzwall**" gegen den Westen.`,
      hints: ['Wer verließ die DDR?', 'Wie hieß die Mauer in der DDR-Propaganda?'],
      cards: ['mauer-grund'],
    },
  ],
  cards: [
    { id: 'zonen', front: 'In welche vier Besatzungszonen wurde Deutschland 1945 geteilt?', back: '**Amerikanisch** (Süden), **britisch** (Nordwesten), **französisch** (Südwesten), **sowjetisch** (Osten); Berlin in vier Sektoren.' },
    { id: 'potsdam', front: 'Was beschloss die Potsdamer Konferenz 1945?', back: 'Die „vier D" (Denazifizierung, Demilitarisierung, Demokratisierung, Dezentralisierung) und die Oder-Neiße-Linie als Verwaltungsgrenze.' },
    { id: 'vertreibung', front: 'Wie viele Deutsche wurden nach 1945 aus dem Osten vertrieben oder flohen?', back: 'Rund **12 bis 14 Millionen**.' },
    { id: 'waehrungsreform', front: 'Wann wurde in den Westzonen die D-Mark eingeführt?', back: 'Am **20. Juni 1948**.' },
    { id: 'luftbruecke', front: 'Was war die Luftbrücke?', back: 'Versorgung West-Berlins aus der Luft während der **Berlin-Blockade** (Juni 1948 – Mai 1949) — „Rosinenbomber".' },
    { id: 'grundgesetz-datum', front: 'Wann wurde das Grundgesetz verkündet?', back: 'Am **23. Mai 1949**.' },
    { id: 'ddr-gruendung', front: 'Wann wurde die DDR gegründet?', back: 'Am **7. Oktober 1949**.' },
    { id: 'adenauer', front: 'Wer war erster Bundeskanzler, und wie lange?', back: '**Konrad Adenauer** (CDU), **1949–1963**.' },
    { id: 'bonn', front: 'Welche Stadt war Hauptstadt der Bundesrepublik bis 1990?', back: '**Bonn** (Regierungssitz bis 1999).' },
    { id: 'sed-stasi', front: 'Was waren SED und Stasi?', back: '**SED**: Sozialistische Einheitspartei, Staatspartei der DDR. **Stasi**: Ministerium für Staatssicherheit, Geheimpolizei.' },
    { id: '17-juni', front: 'Was geschah am 17. Juni 1953?', back: 'Der **Volksaufstand in der DDR**, von sowjetischen Panzern niedergeschlagen.' },
    { id: 'mauerbau', front: 'Wann begann der Bau der Berliner Mauer?', back: 'In der Nacht zum **13. August 1961**.' },
    { id: 'ulbricht-zitat', front: '„Niemand hat die Absicht, eine Mauer zu errichten." — Wer?', back: '**Walter Ulbricht**, Juni 1961.' },
    { id: 'mauer-grund', front: 'Warum baute die DDR die Mauer?', back: 'Um die Massenflucht (rund 2,7 Mio. bis 1961) zu stoppen; offiziell „antifaschistischer Schutzwall".' },
    { id: 'kennedy', front: 'Wer sagte 1963 in Berlin „Ich bin ein Berliner"?', back: 'US-Präsident **John F. Kennedy**.' },
    { id: 'kniefall', front: 'Was war der Kniefall von Warschau?', back: 'Willy Brandt kniete am **7. Dezember 1970** vor dem Mahnmal des Warschauer Ghetto-Aufstands nieder.' },
    { id: 'ostpolitik', front: 'Mit welcher Formel wird Brandts Ostpolitik zusammengefasst?', back: '„**Wandel durch Annäherung**".' },
    { id: 'uno-1973', front: 'Wann wurden beide deutsche Staaten UNO-Mitglieder?', back: '**1973**.' },
  ],
};
