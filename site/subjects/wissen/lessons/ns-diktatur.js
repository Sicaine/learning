export default {
  id: 'ns-diktatur',
  title: 'NS-Diktatur, Holocaust & Zweiter Weltkrieg',
  summary: 'Wie aus einer Demokratie in wenigen Monaten eine Diktatur wurde, wie Ausgrenzung in Völkermord mündete, wie Deutschland Europa mit Krieg überzog — und wer Widerstand leistete.',
  minutes: 28,
  goals: [
    'Die Schritte der [[machtergreifung|Machtübernahme]] 1933/34 benennen und ordnen',
    'Die Grundzüge der NS-Ideologie beschreiben',
    'Die Stufen der Verfolgung bis zum [[holocaust|Holocaust]] erklären',
    'Verlauf und Wendepunkte des [[zweiter-weltkrieg|Zweiten Weltkriegs]] in Europa kennen',
    'Formen des Widerstands nennen und das Kriegsende 1945 einordnen',
  ],
  blocks: [
    {
      id: 'vorbemerkung', type: 'callout', tone: 'warning', title: 'Zur Sprache',
      md: `Viele Begriffe dieser Zeit stammen aus der NS-Propaganda und verschleiern Verbrechen: „Machtergreifung", „Endlösung", „Reichskristallnacht", „Euthanasie", „Sonderbehandlung". Diese Lektion verwendet, wo möglich, die heute üblichen Begriffe (Machtübernahme, Völkermord, Novemberpogrome, Krankenmorde) und kennzeichnet NS-Begriffe mit Anführungszeichen.`,
    },
    {
      id: 'diktatur', type: 'text', title: '1933/34: Von der Kanzlerschaft zur Diktatur',
      md: `
Am **30. Januar 1933** ernannte [Hindenburg](wiki:Paul von Hindenburg|Paul von Hindenburg) [Hitler](wiki:Adolf Hitler|Adolf Hitler) zum Reichskanzler einer Koalitionsregierung mit nur drei NSDAP-Ministern. Binnen anderthalb Jahren beseitigte das Regime die Demokratie vollständig:

- **27./28. Februar 1933**: Nach dem **[Reichstagsbrand](wiki:Reichstagsbrand|Reichstag fire)** setzte die „[Reichstagsbrandverordnung](wiki:Reichstagsbrandverordnung|Reichstag Fire Decree)" die Grundrechte außer Kraft — Grundlage für Massenverhaftungen, vor allem von Kommunisten. Erste **[Konzentrationslager](wiki:Konzentrationslager|Nazi concentration camps)** entstanden ([Dachau](wiki:KZ Dachau|Dachau concentration camp) im März 1933).
- **23. März 1933**: Das **[[ermaechtigungsgesetz|Ermächtigungsgesetz]]** erlaubte der Regierung, Gesetze ohne Reichstag zu erlassen. Nur die SPD stimmte dagegen — [Otto Wels](wiki:Otto Wels|Otto Wels): *„Freiheit und Leben kann man uns nehmen, die Ehre nicht."*
- **Frühjahr/Sommer 1933**: **[[gleichschaltung|Gleichschaltung]]** von Ländern, Verbänden und Presse; Zerschlagung der Gewerkschaften (2. Mai); **[Bücherverbrennungen](wiki:Bücherverbrennung|Book burning)** (10. Mai); ab Juli 1933 ist die NSDAP einzige zugelassene Partei.
- **30. Juni 1934**: Mord an der SA-Führung um [Ernst Röhm](wiki:Ernst Röhm|Ernst Röhm) und an konservativen Gegnern („[Röhm-Putsch](wiki:Röhm-Putsch|Night of the Long Knives)").
- **2. August 1934**: Nach Hindenburgs Tod vereinigte Hitler die Ämter von Reichskanzler und Reichspräsident als „Führer und Reichskanzler"; die Reichswehr wurde auf ihn persönlich vereidigt.[^lemo-ns]`,
    },
    {
      id: 'video-ns', type: 'video', youtube: 'CB7kYw60M1M', label: 'Errichtung der NS-Diktatur', channel: 'musstewissen Geschichte | Terra X',
    },
    {
      id: 'order-diktatur', type: 'order', title: 'Die Schritte zur Diktatur',
      prompt: 'Bringe die Schritte der Machtübernahme in die richtige Reihenfolge.',
      items: ['Ernennung Hitlers zum Reichskanzler', 'Reichstagsbrandverordnung setzt Grundrechte außer Kraft', 'Ermächtigungsgesetz', 'Zerschlagung der Gewerkschaften', 'NSDAP wird einzige zugelassene Partei', 'Morde an SA-Führung und Gegnern („Röhm-Putsch")', 'Hitler wird „Führer und Reichskanzler"'],
      explain: '30.1.1933 → 28.2.1933 → 23.3.1933 → 2.5.1933 → 14.7.1933 → 30.6.1934 → 2.8.1934. Die Zerstörung der Demokratie dauerte keine zwei Jahre — und geschah großenteils mit dem Anschein von Legalität.',
    },
    {
      id: 'ideologie', type: 'text', title: 'Die Ideologie',
      md: `
Kern der NS-Weltanschauung war ein **rassistischer [Antisemitismus](wiki:Antisemitismus|Antisemitism)**: Juden wurden zu einer „Rasse" und zum Weltfeind erklärt. Dazu kamen:

- **Rassenideologie**: Menschen wurden in „wertvolle" und „minderwertige" eingeteilt; Menschen mit Behinderungen, [Sinti und Roma](wiki:Sinti und Roma) und slawische Völker wurden abgewertet.
- **„[Volksgemeinschaft](wiki:Volksgemeinschaft|Volksgemeinschaft)"**: Wer dazugehörte, sollte bevorzugt werden — wer nicht, wurde ausgeschlossen.
- **„[Lebensraum im Osten](wiki:Lebensraum im Osten|Lebensraum)"**: Eroberung, Versklavung und Vertreibung der Bevölkerung Osteuropas.
- **[Führerprinzip](wiki:Führerprinzip|Führerprinzip)**: absolute Autorität Hitlers statt Demokratie und Rechtsstaat.

Viele Deutsche stimmten dem Regime zu — wegen sinkender Arbeitslosigkeit (Aufrüstung, Autobahnbau, Arbeitsdienst), außenpolitischer „Erfolge" und Propaganda ([Joseph Goebbels](wiki:Joseph Goebbels|Joseph Goebbels)). Wer widersprach, riskierte Verfolgung durch [Gestapo](wiki:Geheime Staatspolizei|Gestapo) und KZ.[^bpb-ns]`,
    },
    {
      id: 'verfolgung', type: 'text', title: 'Stufen der Verfolgung',
      md: `
Die Verfolgung der Jüdinnen und Juden verschärfte sich Schritt für Schritt:

1. **1. April 1933**: Boykott jüdischer Geschäfte; ab April Entlassung jüdischer Beamter.
2. **September 1935**: Die **[[nuernberger-gesetze|Nürnberger Gesetze]]** nehmen Juden die vollen Bürgerrechte und verbieten Ehen mit Nichtjuden.
3. **9./10. November 1938**: Die **[[novemberpogrome|Novemberpogrome]]** — Synagogen brennen, Geschäfte werden zerstört, Menschen ermordet, rund 30.000 jüdische Männer in KZs verschleppt. Danach werden Juden aus dem Wirtschaftsleben verdrängt.
4. **Ab 1941**: Pflicht zum Tragen des „[Judensterns](wiki:Judenstern|Yellow badge)" im Reich; Deportationen in Ghettos und Lager im Osten.
5. **Ab 1941/42**: systematischer Massenmord.

Hunderttausende konnten bis 1941 emigrieren — wenn sie ein Aufnahmeland fanden. Zugleich ermordete das Regime ab 1939 in der „[Aktion T4](wiki:Aktion T4|Aktion T4)" und weiteren Aktionen Menschen mit Behinderungen und psychischen Erkrankungen; insgesamt über 200.000 Menschen fielen diesen **Krankenmorden** zum Opfer.`,
    },
    {
      id: 'holocaust', type: 'text', title: 'Der Holocaust',
      md: `
Der **[[holocaust|Holocaust]]** (hebräisch **Shoah**) war der planmäßige, industriell organisierte Völkermord an den europäischen Jüdinnen und Juden. Etwa **sechs Millionen** Menschen wurden ermordet — rund zwei Drittel der jüdischen Bevölkerung im damaligen Europa.

- Nach dem Überfall auf die Sowjetunion 1941 erschossen **[Einsatzgruppen](wiki:Einsatzgruppen|Einsatzgruppen)** von SS und Polizei, unterstützt von Wehrmacht und örtlichen Helfern, über eine Million Menschen (z. B. **[Babyn Jar](wiki:Massaker von Babyn Jar|Babi Yar massacre)** bei Kiew, September 1941: über 33.000 Menschen in zwei Tagen).
- Auf der **[[wannseekonferenz|Wannseekonferenz]]** am **20. Januar 1942** koordinierten Spitzenbeamte unter [Reinhard Heydrich](wiki:Reinhard Heydrich|Reinhard Heydrich) die Deportation und Ermordung der Juden ganz Europas.[^wp-wannsee]
- In den **[Vernichtungslagern](wiki:Vernichtungslager|Extermination camp)** im besetzten Polen — **[Auschwitz-Birkenau](wiki:KZ Auschwitz|Auschwitz concentration camp)**, [Treblinka](wiki:Vernichtungslager Treblinka|Treblinka extermination camp), [Sobibór](wiki:Vernichtungslager Sobibor|Sobibor extermination camp), [Bełżec](wiki:Vernichtungslager Belzec|Belzec extermination camp), [Chełmno](wiki:Vernichtungslager Chełmno|Chełmno extermination camp), [Majdanek](wiki:KZ Majdanek|Majdanek concentration camp) — wurden Menschen in Gaskammern ermordet. In Auschwitz allein starben etwa 1,1 Millionen Menschen, ganz überwiegend Juden.

Verfolgt und ermordet wurden auch **Sinti und Roma** (bis zu 500.000 Opfer, *[Porajmos](wiki:Porajmos)*), Millionen **sowjetische Kriegsgefangene**, polnische Zivilisten, politische Gegner, Zeugen Jehovas, Homosexuelle und als „asozial" Stigmatisierte. Am **27. Januar 1945** befreite die Rote Armee Auschwitz — heute der [internationale Holocaust-Gedenktag](wiki:Internationaler Tag des Gedenkens an die Opfer des Holocaust|International Holocaust Remembrance Day).[^ushmm][^wp-holocaust]`,
    },
    {
      id: 'map-ns-lager', type: 'map', title: 'Orte der Verfolgung und Ermordung',
      view: [5.5, 47.5, 26.0, 55.6],
      layers: { cities: 'capitals' },
      places: [
        { name: 'KZ Dachau', label: 'Dachau', color: '#475569', pos: 'l', detail: '**[Dachau](wiki:KZ Dachau|Dachau concentration camp)** — im März 1933 eingerichtet, das Modell für spätere Konzentrationslager; heute Gedenkstätte.' },
        { name: 'KZ Sachsenhausen', label: 'Sachsenhausen', color: '#475569', pos: 'r', detail: '**[Sachsenhausen](wiki:KZ Sachsenhausen|Sachsenhausen concentration camp)** — bei Oranienburg nördlich von Berlin, ab 1936.' },
        { name: 'KZ Ravensbrück', label: 'Ravensbrück', color: '#475569', pos: 'r', detail: '**[Ravensbrück](wiki:KZ Ravensbrück|Ravensbrück concentration camp)** — das größte Frauen-Konzentrationslager, nördlich von Berlin.' },
        { name: 'KZ Neuengamme', label: 'Neuengamme', color: '#475569', pos: 'l', detail: '**[Neuengamme](wiki:KZ Neuengamme|Neuengamme concentration camp)** — bei Hamburg.' },
        { name: 'KZ Bergen-Belsen', label: 'Bergen-Belsen', color: '#475569', pos: 'l', detail: '**[Bergen-Belsen](wiki:KZ Bergen-Belsen|Bergen-Belsen concentration camp)** — in der Lüneburger Heide; im April 1945 von britischen Truppen befreit. Hier starben auch Anne und Margot Frank.' },
        { name: 'KZ Buchenwald', label: 'Buchenwald', color: '#475569', pos: 'l', detail: '**[Buchenwald](wiki:KZ Buchenwald|Buchenwald concentration camp)** — bei Weimar, ab 1937.' },
        { name: 'KZ Flossenbürg', label: 'Flossenbürg', color: '#475569', pos: 'l', detail: '**[Flossenbürg](wiki:KZ Flossenbürg|Flossenbürg concentration camp)** — in der Oberpfalz; hier wurde im April 1945 Dietrich Bonhoeffer hingerichtet.' },
        { name: 'Mauthausen', color: '#475569', pos: 'l', detail: '**[Mauthausen](wiki:KZ Mauthausen|Mauthausen concentration camp)** — bei Linz in Österreich, ab 1938.' },
        { name: 'Theresienstadt', color: '#475569', pos: 'l', detail: '**[Theresienstadt](wiki:Ghetto Theresienstadt|Theresienstadt Ghetto)** — Ghetto und Durchgangslager in Böhmen.' },
        { name: 'Wannsee', color: '#b45309', pos: 'l', detail: '**[Wannsee](wiki:Wannsee-Konferenz|Wannsee Conference)** — am 20. Januar 1942 koordinierten hier Spitzenbeamte die Deportation und Ermordung der europäischen Juden.' },
        { name: 'Chełmno nad Nerem', label: 'Chełmno', color: '#7f1d1d', pos: 'r', detail: '**[Chełmno](wiki:Vernichtungslager Chełmno|Chełmno extermination camp)** — ab Dezember 1941 Morde mit Gaswagen.' },
        { name: 'Auschwitz', label: 'Auschwitz-Birkenau', color: '#7f1d1d', pos: 'r', detail: '**[Auschwitz-Birkenau](wiki:KZ Auschwitz|Auschwitz concentration camp)** — das größte Lager: etwa 1,1 Millionen Menschen starben, ganz überwiegend Juden. Befreit am 27. Januar 1945.' },
        { name: 'Treblinka', color: '#7f1d1d', pos: 'r', detail: '**[Treblinka](wiki:Vernichtungslager Treblinka|Treblinka extermination camp)** — Vernichtungslager der „Aktion Reinhardt"; Hunderttausende wurden ermordet.' },
        { name: 'Majdanek', color: '#7f1d1d', pos: 'r', detail: '**[Majdanek](wiki:KZ Majdanek|Majdanek concentration camp)** — bei Lublin; Konzentrations- und Vernichtungslager.' },
        { name: 'Sobibor', label: 'Sobibór', color: '#7f1d1d', pos: 'r', detail: '**[Sobibór](wiki:Vernichtungslager Sobibor|Sobibor extermination camp)** — Vernichtungslager; im Oktober 1943 erhoben sich hier die Häftlinge.' },
        { name: 'Bełżec', color: '#7f1d1d', pos: 'r', detail: '**[Bełżec](wiki:Vernichtungslager Belzec|Belzec extermination camp)** — Vernichtungslager der „Aktion Reinhardt", ab 1942.' },
      ],
      caption: 'Dunkelrot: Vernichtungslager; grau: Konzentrationslager und Ghetto (eine kleine Auswahl). Das NS-Regime unterhielt tausende Lager, Außenlager und Ghettos in ganz Europa. Die Staatsgrenzen sind die heutigen.',
    },
    {
      id: 'erinnerung', type: 'callout', tone: 'insight', title: 'Warum das Allgemeinwissen ist',
      md: `Der Holocaust ist kein „Kapitel unter vielen": Das Grundgesetz beginnt mit „Die Würde des Menschen ist unantastbar" als direkte Antwort darauf. Orte wie das **[Denkmal für die ermordeten Juden Europas](wiki:Denkmal für die ermordeten Juden Europas|Memorial to the Murdered Jews of Europe)** in Berlin, die KZ-Gedenkstätten ([Dachau](wiki:KZ Dachau|Dachau concentration camp), [Buchenwald](wiki:KZ Buchenwald|Buchenwald concentration camp), [Bergen-Belsen](wiki:KZ Bergen-Belsen|Bergen-Belsen concentration camp), [Sachsenhausen](wiki:KZ Sachsenhausen|Sachsenhausen concentration camp) …) und die **[Stolpersteine](wiki:Stolperstein|Stolperstein)** vor den früheren Wohnhäusern der Opfer halten die Erinnerung wach — sie gehören zum Selbstverständnis der Bundesrepublik.`,
    },
    {
      id: 'krieg', type: 'text', title: 'Der Zweite Weltkrieg in Europa',
      md: `
Nach der Aufrüstung, dem „[Anschluss](wiki:Anschluss Österreichs|Anschluss)" **Österreichs** (März 1938) und der Zerschlagung der Tschechoslowakei ([Münchner Abkommen](wiki:Münchner Abkommen|Munich Agreement) 1938, Einmarsch in Prag März 1939) sicherte sich Hitler im **[Hitler-Stalin-Pakt](wiki:Hitler-Stalin-Pakt|Molotov–Ribbentrop Pact)** (23. August 1939) die Aufteilung Osteuropas. Am **1. September 1939** [überfiel](wiki:Überfall auf Polen|Invasion of Poland) die Wehrmacht **Polen** — Beginn des **[[zweiter-weltkrieg|Zweiten Weltkriegs]]**.

- **1940**: Besetzung von Dänemark, Norwegen, Benelux und **Frankreich**; die „[Luftschlacht um England](wiki:Luftschlacht um England|Battle of Britain)" scheitert.
- **22. Juni 1941**: Überfall auf die **Sowjetunion** („[Unternehmen Barbarossa](wiki:Unternehmen Barbarossa|Operation Barbarossa)") — ein von Beginn an als Vernichtungskrieg geplanter Feldzug. Im Dezember erklärt Deutschland nach Pearl Harbor den **USA** den Krieg.
- **1943**: Niederlage der 6. Armee in **[Stalingrad](wiki:Schlacht von Stalingrad|Battle of Stalingrad)** (Kapitulation Anfang Februar) — Wendepunkt im Osten. Bombenkrieg gegen deutsche Städte.
- **6. Juni 1944**: Landung der Alliierten in der **Normandie** („[D-Day](wiki:Operation Overlord|Operation Overlord)").
- **30. April 1945**: Hitler nimmt sich im [Führerbunker](wiki:Führerbunker|Führerbunker) in Berlin das Leben.
- **8. Mai 1945**: Die bedingungslose Kapitulation der Wehrmacht tritt in Kraft.

Weltweit starben im Zweiten Weltkrieg schätzungsweise **60 bis 70 Millionen Menschen**, darunter rund 27 Millionen Bürger der Sowjetunion.[^lemo-zweiter-weltkrieg]`,
    },
    {
      id: 'map-ns-krieg', type: 'map', title: 'Der Zweite Weltkrieg in Europa: Stationen',
      view: [-9, 40.5, 47, 66],
      layers: { cities: false, mountains: false, rivers: false },
      highlight: [{ label: 'Besetzt, annektiert oder beherrscht (Auswahl, heutige Staaten)', color: '#6b7280', countries: ['Polen', 'Dänemark', 'Norwegen', 'Niederlande', 'Belgien', 'Luxemburg', 'Frankreich', 'Tschechien', 'Österreich', 'Griechenland', 'Litauen', 'Lettland', 'Estland', 'Belarus', 'Ukraine'] }],
      places: [
        { name: 'Danzig', num: 1, pos: 'l', detail: '**[Danzig](wiki:Danzig|Gdańsk)** — 1. September 1939: Schüsse auf die Westerplatte; Beginn des Krieges mit dem Überfall auf Polen.' },
        { name: 'Paris', num: 2, pos: 'l', detail: '**[Paris](wiki:Paris|Paris)** — Juni 1940: Besetzung; Frankreich kapituliert.' },
        { name: 'Stalingrad', num: 3, pos: 'l', detail: '**[Stalingrad](wiki:Schlacht von Stalingrad|Battle of Stalingrad)** — Winter 1942/43: Niederlage der 6. Armee, Wendepunkt im Osten.' },
        { name: 'Berlin', num: 5, pos: 'r', detail: '**[Berlin](wiki:Berlin|Berlin)** — Hitler nimmt sich am 30. April 1945 das Leben; am 8. Mai tritt die Kapitulation in Kraft.' },
      ],
      points: [
        { lon: -0.88, lat: 49.37, label: 'Normandie', num: 4, pos: 'l', detail: '**Normandie** — 6. Juni 1944: Landung der Alliierten ([D-Day](wiki:Operation Overlord|Operation Overlord)).' },
      ],
      caption: 'Die Ziffern geben die Reihenfolge an: 1 Polen (1939), 2 Frankreich (1940), 3 Stalingrad (1942/43), 4 Normandie (1944), 5 Berlin (1945). Markiert sind heutige Staaten, die ganz oder teilweise besetzt oder beherrscht waren — eine Auswahl.',
    },
    {
      id: 'timeline-krieg', type: 'viz', viz: 'timeline', title: 'Zeitleiste 1933–1945',
      params: {
        events: [
          { year: 1933, label: 'Hitler Reichskanzler', detail: '30. Januar 1933; Reichstagsbrand (27. Februar) und Ermächtigungsgesetz (23. März) folgen.' },
          { year: 1935, label: 'Nürnberger Gesetze', detail: 'September 1935: Juden werden zu Bürgern minderen Rechts.' },
          { year: 1936, label: 'Olympia in Berlin', detail: 'Propaganda-Bühne des Regimes.' },
          { year: 1938, label: 'Novemberpogrome', detail: '9./10. November 1938; im März zuvor der „Anschluss" Österreichs.' },
          { year: 1939, label: 'Überfall auf Polen', detail: '1. September 1939 — Beginn des Zweiten Weltkriegs.' },
          { year: 1941, label: 'Überfall auf die UdSSR', detail: '22. Juni 1941 — Vernichtungskrieg; Massenerschießungen durch Einsatzgruppen.' },
          { year: 1942, label: 'Wannseekonferenz', detail: '20. Januar 1942 — Koordination des Völkermords.' },
          { year: 1943, label: 'Stalingrad', detail: 'Kapitulation der 6. Armee; Hinrichtung der Geschwister Scholl.' },
          { year: 1944, label: 'D-Day & 20. Juli', detail: 'Landung in der Normandie (6. Juni) und Stauffenberg-Attentat (20. Juli).' },
          { year: 1945, label: 'Kapitulation', detail: '27. Januar: Befreiung von Auschwitz. 8. Mai: Ende des Krieges in Europa.' },
        ],
      },
      caption: 'Tippe auf ein Jahr, um Details zu sehen.',
    },
    {
      id: 'widerstand', type: 'text', title: 'Widerstand',
      md: `
Widerstand leistete nur eine kleine Minderheit — unter Lebensgefahr:

- **[Georg Elser](wiki:Georg Elser|Georg Elser)**, ein schwäbischer Schreiner, verübte am 8. November 1939 allein ein Bombenattentat im Münchner [Bürgerbräukeller](wiki:Bürgerbräukeller|Bürgerbräukeller); Hitler hatte den Saal Minuten vorher verlassen.
- Die **[Weiße Rose](wiki:Weiße Rose|White Rose)**: Münchner Studierende um **[Sophie](wiki:Sophie Scholl|Sophie Scholl) und [Hans Scholl](wiki:Hans Scholl|Hans Scholl)** verteilten Flugblätter; sie wurden im Februar 1943 verhaftet und hingerichtet.
- Das **[[widerstand-20-juli|Attentat vom 20. Juli 1944]]**: Oberst **[Claus Schenk Graf von Stauffenberg](wiki:Claus Schenk Graf von Stauffenberg|Claus von Stauffenberg)** zündete in der „[Wolfsschanze](wiki:Wolfsschanze|Wolf's Lair)" eine Bombe; Hitler überlebte, der Umsturz scheiterte. Rund 200 Beteiligte wurden hingerichtet.
- Dazu Kommunisten und Sozialdemokraten, der [Kreisauer Kreis](wiki:Kreisauer Kreis|Kreisau Circle), Kirchenleute wie [Dietrich Bonhoeffer](wiki:Dietrich Bonhoeffer|Dietrich Bonhoeffer), die „[Rote Kapelle](wiki:Rote Kapelle|Red Orchestra (espionage))" — und Menschen, die Verfolgte versteckten (wie [Oskar Schindler](wiki:Oskar Schindler|Oskar Schindler), der über 1.000 Juden rettete).[^wp-20-juli]`,
    },
    {
      id: 'quiz-holocaust', type: 'quiz', title: 'Holocaust — präzise Fakten',
      question: 'Welche Aussagen sind richtig?',
      options: [
        { text: 'Etwa sechs Millionen europäische Jüdinnen und Juden wurden ermordet.', correct: true, why: 'Etwa zwei Drittel der jüdischen Bevölkerung Europas.' },
        { text: 'Auf der Wannseekonferenz 1942 wurde der Völkermord organisatorisch koordiniert.', correct: true, why: 'Die Morde hatten bereits begonnen; die Konferenz regelte Zuständigkeiten.' },
        { text: 'Die Vernichtungslager lagen überwiegend im besetzten Polen.', correct: true, why: 'Auschwitz-Birkenau, Treblinka, Sobibór, Bełżec, Chełmno, Majdanek.' },
        { text: 'Der Holocaust-Gedenktag erinnert an die Novemberpogrome.', correct: false, why: 'Er erinnert an die Befreiung von Auschwitz am 27. Januar 1945.' },
        { text: 'Auch Sinti und Roma wurden systematisch verfolgt und ermordet.', correct: true, why: 'Der Völkermord an ihnen wird Porajmos genannt.' },
      ],
    },
    {
      id: 'map-quiz-ns', type: 'map', title: 'Orte des Erinnerns: Wo liegt …?',
      view: [5.5, 47.5, 26.0, 55.6],
      layers: { cities: false },
      quiz: { rounds: 6 },
      places: [{ name: 'KZ Dachau', label: 'Dachau' }, { name: 'KZ Buchenwald', label: 'Buchenwald' }, { name: 'Auschwitz' }, { name: 'Treblinka' }, { name: 'Wannsee' }, { name: 'KZ Bergen-Belsen', label: 'Bergen-Belsen' }, { name: 'Majdanek' }],
    },
    {
      id: 'match-widerstand', type: 'match', title: 'Widerstand gegen den Nationalsozialismus',
      pairs: [
        ['Georg Elser', 'Attentat im Bürgerbräukeller 1939'],
        ['Sophie Scholl', 'Weiße Rose, 1943 hingerichtet'],
        ['Claus von Stauffenberg', 'Bombenattentat am 20. Juli 1944'],
        ['Dietrich Bonhoeffer', 'evangelischer Theologe im Widerstand'],
        ['Oskar Schindler', 'rettete über 1.000 Juden'],
        ['Otto Wels', 'Rede gegen das Ermächtigungsgesetz'],
      ],
    },
    {
      id: 'kriegsende', type: 'text', title: 'Der 8. Mai 1945',
      md: `
Die bedingungslose Kapitulation wurde am 7. Mai in Reims unterzeichnet, in Berlin-Karlshorst wiederholt und trat am **8. Mai 1945** in Kraft. Deutschland lag in Trümmern, Millionen waren tot, vertrieben oder in Gefangenschaft. In den **[[nuernberger-prozesse|Nürnberger Prozessen]]** (1945/46) standen die Hauptverantwortlichen vor Gericht — zum ersten Mal wurden „Verbrechen gegen die Menschlichkeit" geahndet.

Lange galt der 8. Mai in der Bundesrepublik vor allem als Tag der Niederlage. Bundespräsident **Richard von Weizsäcker** sagte 1985: *„Der 8. Mai war ein Tag der Befreiung. Er hat uns alle befreit von dem menschenverachtenden System der nationalsozialistischen Gewaltherrschaft."*[^weizsaecker-1985]`,
    },
    {
      id: 'recall-legal', type: 'recall', title: 'Diktatur mit dem Schein der Legalität',
      prompt: 'Hitler wurde legal ernannt, und das Ermächtigungsgesetz wurde vom Reichstag beschlossen. Erkläre in 3–4 Sätzen, warum man trotzdem nicht von einem legalen Machtwechsel sprechen kann — und welche Lehre das Grundgesetz daraus zog.',
      answer: `Die Ernennung war formal verfassungsgemäß, aber die folgenden Schritte beruhten auf **Terror und Rechtsbruch**: Die Reichstagsbrandverordnung setzte die Grundrechte außer Kraft, KPD-Abgeordnete waren verhaftet oder geflohen, die SA umstellte den Sitzungssaal, und die Zustimmung der bürgerlichen Parteien wurde durch Druck und leere Versprechen erreicht. Das Ermächtigungsgesetz hob die Gewaltenteilung auf und wurde genutzt, um Parteien zu verbieten und die Verfassung auszuhöhlen. Das Grundgesetz reagierte mit der **wehrhaften Demokratie**: Menschenwürde und Demokratieprinzip sind durch die **Ewigkeitsklausel** unabänderlich, verfassungsfeindliche Parteien können verboten werden, und das Bundesverfassungsgericht wacht darüber.`,
      hints: ['Unter welchen Umständen stimmte der Reichstag ab?', 'Was darf man am Grundgesetz nie ändern?'],
      cards: ['legalitaet'],
    },
  ],
  cards: [
    { id: 'reichstagsbrand', front: 'Welche Folge hatte der Reichstagsbrand im Februar 1933?', back: 'Die **Reichstagsbrandverordnung** (28.2.1933) setzte die Grundrechte außer Kraft — Grundlage für Massenverhaftungen.' },
    { id: 'ermaechtigungsgesetz', front: 'Was erlaubte das Ermächtigungsgesetz vom März 1933 — und wer stimmte dagegen?', back: 'Gesetze **ohne Reichstag** zu erlassen. Nur die **SPD** stimmte dagegen (Otto Wels).' },
    { id: 'wels', front: '„Freiheit und Leben kann man uns nehmen, die Ehre nicht." — Wer, wann?', back: '**Otto Wels** (SPD) in der Reichstagsdebatte zum Ermächtigungsgesetz, **23. März 1933**.' },
    { id: 'buecherverbrennung', front: 'Wann fanden die Bücherverbrennungen statt?', back: 'Am **10. Mai 1933** in vielen Universitätsstädten.' },
    { id: 'fuehrer-1934', front: 'Wann vereinigte Hitler die Ämter von Kanzler und Präsident?', back: 'Am **2. August 1934**, nach Hindenburgs Tod.' },
    { id: 'nuernberger', front: 'Was bestimmten die Nürnberger Gesetze von 1935?', back: 'Juden verloren die vollen Bürgerrechte; Ehen und Beziehungen mit Nichtjuden wurden verboten.' },
    { id: 'pogrome', front: 'Was geschah am 9./10. November 1938?', back: 'Die **Novemberpogrome**: Synagogen und Geschäfte zerstört, Menschen ermordet, rund 30.000 jüdische Männer in KZs verschleppt.' },
    { id: 'holocaust-zahl', front: 'Wie viele Jüdinnen und Juden wurden im Holocaust ermordet?', back: 'Etwa **sechs Millionen**.' },
    { id: 'shoah', front: 'Welches hebräische Wort bezeichnet den Holocaust?', back: '**Shoah** („Katastrophe").' },
    { id: 'wannsee', front: 'Was war die Wannseekonferenz?', back: 'Besprechung am **20. Januar 1942** unter Heydrich zur Koordination der Ermordung der europäischen Juden.' },
    { id: 'vernichtungslager', front: 'Nenne vier Vernichtungslager.', back: '**Auschwitz-Birkenau**, Treblinka, Sobibór, Bełżec, Chełmno, Majdanek.' },
    { id: 'gedenktag', front: 'Woran erinnert der Holocaust-Gedenktag am 27. Januar?', back: 'An die **Befreiung von Auschwitz** durch die Rote Armee 1945.' },
    { id: 'porajmos', front: 'Wie wird der Völkermord an den Sinti und Roma genannt?', back: '**Porajmos**.' },
    { id: 'kriegsbeginn', front: 'Wann begann der Zweite Weltkrieg?', back: 'Am **1. September 1939** mit dem Überfall auf Polen.' },
    { id: 'hitler-stalin', front: 'Was war der Hitler-Stalin-Pakt?', back: 'Nichtangriffsvertrag vom **23. August 1939** mit geheimer Aufteilung Osteuropas.' },
    { id: 'barbarossa', front: 'Wann überfiel Deutschland die Sowjetunion?', back: 'Am **22. Juni 1941** („Unternehmen Barbarossa").' },
    { id: 'stalingrad', front: 'Welche Schlacht gilt als Wendepunkt im Osten?', back: '**Stalingrad** (Kapitulation Anfang Februar 1943).' },
    { id: 'weisse-rose', front: 'Wer war die Weiße Rose?', back: 'Münchner Studierende um **Sophie und Hans Scholl**, die Flugblätter verteilten; 1943 hingerichtet.' },
    { id: 'stauffenberg', front: 'Was geschah am 20. Juli 1944?', back: '**Stauffenbergs** Bombenattentat auf Hitler in der „Wolfsschanze" — Hitler überlebte, der Umsturz scheiterte.' },
    { id: 'kapitulation', front: 'Wann endete der Zweite Weltkrieg in Europa?', back: 'Mit der bedingungslosen Kapitulation am **8. Mai 1945**.' },
    { id: 'weizsaecker', front: 'Wer nannte den 8. Mai 1985 einen „Tag der Befreiung"?', back: 'Bundespräsident **Richard von Weizsäcker**.' },
    { id: 'legalitaet', front: 'Warum war die NS-Machtübernahme kein legaler Machtwechsel?', back: 'Formale Legalität, aber Terror, außer Kraft gesetzte Grundrechte und Druck — Antwort des Grundgesetzes: wehrhafte Demokratie, Ewigkeitsklausel.' },
  ],
};
