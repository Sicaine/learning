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
Am **30. Januar 1933** ernannte Hindenburg Hitler zum Reichskanzler einer Koalitionsregierung mit nur drei NSDAP-Ministern. Binnen anderthalb Jahren beseitigte das Regime die Demokratie vollständig:

- **27./28. Februar 1933**: Nach dem **Reichstagsbrand** setzte die „Reichstagsbrandverordnung" die Grundrechte außer Kraft — Grundlage für Massenverhaftungen, vor allem von Kommunisten. Erste **Konzentrationslager** entstanden (Dachau im März 1933).
- **23. März 1933**: Das **[[ermaechtigungsgesetz|Ermächtigungsgesetz]]** erlaubte der Regierung, Gesetze ohne Reichstag zu erlassen. Nur die SPD stimmte dagegen — Otto Wels: *„Freiheit und Leben kann man uns nehmen, die Ehre nicht."*
- **Frühjahr/Sommer 1933**: **[[gleichschaltung|Gleichschaltung]]** von Ländern, Verbänden und Presse; Zerschlagung der Gewerkschaften (2. Mai); **Bücherverbrennungen** (10. Mai); ab Juli 1933 ist die NSDAP einzige zugelassene Partei.
- **30. Juni 1934**: Mord an der SA-Führung um Ernst Röhm und an konservativen Gegnern („Röhm-Putsch").
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
Kern der NS-Weltanschauung war ein **rassistischer Antisemitismus**: Juden wurden zu einer „Rasse" und zum Weltfeind erklärt. Dazu kamen:

- **Rassenideologie**: Menschen wurden in „wertvolle" und „minderwertige" eingeteilt; Menschen mit Behinderungen, Sinti und Roma und slawische Völker wurden abgewertet.
- **„Volksgemeinschaft"**: Wer dazugehörte, sollte bevorzugt werden — wer nicht, wurde ausgeschlossen.
- **„Lebensraum im Osten"**: Eroberung, Versklavung und Vertreibung der Bevölkerung Osteuropas.
- **Führerprinzip**: absolute Autorität Hitlers statt Demokratie und Rechtsstaat.

Viele Deutsche stimmten dem Regime zu — wegen sinkender Arbeitslosigkeit (Aufrüstung, Autobahnbau, Arbeitsdienst), außenpolitischer „Erfolge" und Propaganda (Joseph Goebbels). Wer widersprach, riskierte Verfolgung durch Gestapo und KZ.[^bpb-ns]`,
    },
    {
      id: 'verfolgung', type: 'text', title: 'Stufen der Verfolgung',
      md: `
Die Verfolgung der Jüdinnen und Juden verschärfte sich Schritt für Schritt:

1. **1. April 1933**: Boykott jüdischer Geschäfte; ab April Entlassung jüdischer Beamter.
2. **September 1935**: Die **[[nuernberger-gesetze|Nürnberger Gesetze]]** nehmen Juden die vollen Bürgerrechte und verbieten Ehen mit Nichtjuden.
3. **9./10. November 1938**: Die **[[novemberpogrome|Novemberpogrome]]** — Synagogen brennen, Geschäfte werden zerstört, Menschen ermordet, rund 30.000 jüdische Männer in KZs verschleppt. Danach werden Juden aus dem Wirtschaftsleben verdrängt.
4. **Ab 1941**: Pflicht zum Tragen des „Judensterns" im Reich; Deportationen in Ghettos und Lager im Osten.
5. **Ab 1941/42**: systematischer Massenmord.

Hunderttausende konnten bis 1941 emigrieren — wenn sie ein Aufnahmeland fanden. Zugleich ermordete das Regime ab 1939 in der „Aktion T4" und weiteren Aktionen Menschen mit Behinderungen und psychischen Erkrankungen; insgesamt über 200.000 Menschen fielen diesen **Krankenmorden** zum Opfer.`,
    },
    {
      id: 'holocaust', type: 'text', title: 'Der Holocaust',
      md: `
Der **[[holocaust|Holocaust]]** (hebräisch **Shoah**) war der planmäßige, industriell organisierte Völkermord an den europäischen Jüdinnen und Juden. Etwa **sechs Millionen** Menschen wurden ermordet — rund zwei Drittel der jüdischen Bevölkerung im damaligen Europa.

- Nach dem Überfall auf die Sowjetunion 1941 erschossen **Einsatzgruppen** von SS und Polizei, unterstützt von Wehrmacht und örtlichen Helfern, über eine Million Menschen (z. B. **Babyn Jar** bei Kiew, September 1941: über 33.000 Menschen in zwei Tagen).
- Auf der **[[wannseekonferenz|Wannseekonferenz]]** am **20. Januar 1942** koordinierten Spitzenbeamte unter Reinhard Heydrich die Deportation und Ermordung der Juden ganz Europas.[^wp-wannsee]
- In den **Vernichtungslagern** im besetzten Polen — **Auschwitz-Birkenau**, Treblinka, Sobibór, Bełżec, Chełmno, Majdanek — wurden Menschen in Gaskammern ermordet. In Auschwitz allein starben etwa 1,1 Millionen Menschen, ganz überwiegend Juden.

Verfolgt und ermordet wurden auch **Sinti und Roma** (bis zu 500.000 Opfer, *Porajmos*), Millionen **sowjetische Kriegsgefangene**, polnische Zivilisten, politische Gegner, Zeugen Jehovas, Homosexuelle und als „asozial" Stigmatisierte. Am **27. Januar 1945** befreite die Rote Armee Auschwitz — heute der internationale Holocaust-Gedenktag.[^ushmm][^wp-holocaust]`,
    },
    {
      id: 'erinnerung', type: 'callout', tone: 'insight', title: 'Warum das Allgemeinwissen ist',
      md: `Der Holocaust ist kein „Kapitel unter vielen": Das Grundgesetz beginnt mit „Die Würde des Menschen ist unantastbar" als direkte Antwort darauf. Orte wie das **Denkmal für die ermordeten Juden Europas** in Berlin, die KZ-Gedenkstätten (Dachau, Buchenwald, Bergen-Belsen, Sachsenhausen …) und die **Stolpersteine** vor den früheren Wohnhäusern der Opfer halten die Erinnerung wach — sie gehören zum Selbstverständnis der Bundesrepublik.`,
    },
    {
      id: 'krieg', type: 'text', title: 'Der Zweite Weltkrieg in Europa',
      md: `
Nach der Aufrüstung, dem „Anschluss" **Österreichs** (März 1938) und der Zerschlagung der Tschechoslowakei (Münchner Abkommen 1938, Einmarsch in Prag März 1939) sicherte sich Hitler im **Hitler-Stalin-Pakt** (23. August 1939) die Aufteilung Osteuropas. Am **1. September 1939** überfiel die Wehrmacht **Polen** — Beginn des **[[zweiter-weltkrieg|Zweiten Weltkriegs]]**.

- **1940**: Besetzung von Dänemark, Norwegen, Benelux und **Frankreich**; die „Luftschlacht um England" scheitert.
- **22. Juni 1941**: Überfall auf die **Sowjetunion** („Unternehmen Barbarossa") — ein von Beginn an als Vernichtungskrieg geplanter Feldzug. Im Dezember erklärt Deutschland nach Pearl Harbor den **USA** den Krieg.
- **1943**: Niederlage der 6. Armee in **Stalingrad** (Kapitulation Anfang Februar) — Wendepunkt im Osten. Bombenkrieg gegen deutsche Städte.
- **6. Juni 1944**: Landung der Alliierten in der **Normandie** („D-Day").
- **30. April 1945**: Hitler nimmt sich im Führerbunker in Berlin das Leben.
- **8. Mai 1945**: Die bedingungslose Kapitulation der Wehrmacht tritt in Kraft.

Weltweit starben im Zweiten Weltkrieg schätzungsweise **60 bis 70 Millionen Menschen**, darunter rund 27 Millionen Bürger der Sowjetunion.[^lemo-zweiter-weltkrieg]`,
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

- **Georg Elser**, ein schwäbischer Schreiner, verübte am 8. November 1939 allein ein Bombenattentat im Münchner Bürgerbräukeller; Hitler hatte den Saal Minuten vorher verlassen.
- Die **Weiße Rose**: Münchner Studierende um **Sophie und Hans Scholl** verteilten Flugblätter; sie wurden im Februar 1943 verhaftet und hingerichtet.
- Das **[[widerstand-20-juli|Attentat vom 20. Juli 1944]]**: Oberst **Claus Schenk Graf von Stauffenberg** zündete in der „Wolfsschanze" eine Bombe; Hitler überlebte, der Umsturz scheiterte. Rund 200 Beteiligte wurden hingerichtet.
- Dazu Kommunisten und Sozialdemokraten, der Kreisauer Kreis, Kirchenleute wie Dietrich Bonhoeffer, die „Rote Kapelle" — und Menschen, die Verfolgte versteckten (wie Oskar Schindler, der über 1.000 Juden rettete).[^wp-20-juli]`,
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
