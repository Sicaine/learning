export default {
  id: 'kaiserreich-weltkrieg',
  title: 'Kaiserreich & Erster Weltkrieg',
  summary: 'Wilhelm II., Weltmachtträume und Kolonien, die Julikrise 1914, vier Jahre Stellungskrieg — und ein Friedensvertrag, der die junge Republik belastete.',
  minutes: 22,
  goals: [
    'Den [[wilhelminismus|Wilhelminismus]] und die deutsche Kolonialpolitik charakterisieren',
    'Die [[julikrise]] und den Kriegsausbruch 1914 erklären',
    'Verlauf und Charakter des [[erster-weltkrieg|Ersten Weltkriegs]] beschreiben',
    'Die Bestimmungen des [[versailler-vertrag|Versailler Vertrags]] und ihre Wirkung nennen',
  ],
  blocks: [
    {
      id: 'wilhelm', type: 'text', title: 'Wilhelm II. und der „Platz an der Sonne"',
      md: `
**1888** ging als „[Dreikaiserjahr](wiki:Dreikaiserjahr|Year of the Three Emperors)" in die Geschichte ein: [Wilhelm I.](wiki:Wilhelm I. (Deutsches Reich)|Wilhelm I) starb, sein Sohn [Friedrich III.](wiki:Friedrich III. (Deutsches Reich)|Frederick III, German Emperor) regierte nur 99 Tage, dann bestieg der 29-jährige **[Wilhelm II.](wiki:Wilhelm II. (Deutsches Reich)|Wilhelm II)** den Thron. Er entließ 1890 Bismarck und wollte „persönlich regieren".

Der **[[wilhelminismus|Wilhelminismus]]** stand für:

- **Weltpolitik**: Deutschland sollte neben Großbritannien Weltmacht sein. Staatssekretär [Bülow](wiki:Bernhard von Bülow|Bernhard von Bülow) forderte 1897 einen „**[Platz an der Sonne](wiki:Platz an der Sonne)**".
- **Flottenbau** unter Admiral [Tirpitz](wiki:Alfred von Tirpitz|Alfred von Tirpitz) — ein Wettrüsten mit Großbritannien, das die Briten an die Seite Frankreichs und Russlands trieb (**[Entente](wiki:Triple Entente|Triple Entente)**).
- **Militarismus** im Alltag: Uniformen, Reserveoffiziere, Obrigkeitsdenken — satirisch verewigt im „[Hauptmann von Köpenick](wiki:Köpenickiade)" (1906) und in Heinrich Manns „[Der Untertan](wiki:Der Untertan|Der Untertan)".

Gleichzeitig war das Kaiserreich ein Motor der Moderne: Weltmarktführer in **Chemie** und **Elektrotechnik**, Spitzenforschung ([Röntgen](wiki:Wilhelm Conrad Röntgen|Wilhelm Röntgen), [Koch](wiki:Robert Koch|Robert Koch), [Planck](wiki:Max Planck|Max Planck)), wachsende Großstädte und eine starke Arbeiterbewegung — 1912 wurde die **[SPD](wiki:Sozialdemokratische Partei Deutschlands|Social Democratic Party of Germany)** stärkste Partei im Reichstag.[^lemo-kaiserreich]`,
    },
    {
      id: 'kolonien', type: 'callout', tone: 'warning', title: 'Kolonien und der erste Völkermord des 20. Jahrhunderts',
      md: `Ab 1884 erwarb das Reich Kolonien in Afrika und im Pazifik: u. a. **[Deutsch-Südwestafrika](wiki:Deutsch-Südwestafrika|German South West Africa)** (Namibia), [Deutsch-Ostafrika](wiki:Deutsch-Ostafrika|German East Africa) (Tansania, Ruanda, Burundi), Kamerun und Togo. In Südwestafrika schlugen deutsche Truppen 1904–1908 Aufstände mit einem Vernichtungskrieg nieder — der **[[voelkermord-herero-nama|Völkermord an den Herero und Nama]]**, den die Bundesregierung 2021 als solchen anerkannte. Auch in Ostafrika forderte die Niederschlagung des [Maji-Maji-Aufstands](wiki:Maji-Maji-Aufstand|Maji Maji Rebellion) (1905–1907) Zehntausende Tote.`,
    },
    {
      id: 'map-kolonien', type: 'map', title: 'Deutsche Kolonien in Afrika',
      view: [-20, -36, 56, 22],
      layers: { cities: false },
      highlight: [{ label: 'Deutsche Kolonien (heutige Staaten)', color: '#b45309', countries: ['Namibia', 'Tansania', 'Ruanda', 'Burundi', 'Kamerun', 'Togo'] }],
      caption: 'Deutsch-Südwestafrika (Namibia), Deutsch-Ostafrika (Tansania, Ruanda, Burundi), Kamerun und Togo — dazu kamen Kolonien im Pazifik und das Pachtgebiet Kiautschou in China. Markiert sind die heutigen Staaten; ihre Grenzen entsprechen den damaligen Kolonialgrenzen nur ungefähr.',
    },
    {
      id: 'julikrise', type: 'text', title: 'Sommer 1914: Wie der Krieg begann',
      md: `
Europa war in zwei Bündnisblöcke gespalten: **Mittelmächte** (Deutschland, Österreich-Ungarn) und **Entente** (Frankreich, Russland, Großbritannien). Am **28. Juni 1914** erschoss der bosnisch-serbische Nationalist [Gavrilo Princip](wiki:Gavrilo Princip|Gavrilo Princip) in **[Sarajevo](wiki:Attentat von Sarajevo|Assassination of Archduke Franz Ferdinand)** den österreichischen Thronfolger **[Franz Ferdinand](wiki:Franz Ferdinand von Österreich-Este|Archduke Franz Ferdinand of Austria)** und seine Frau.

In der **[[julikrise]]** sicherte Berlin Wien bedingungslose Unterstützung zu („**[Blankoscheck](wiki:Blankoscheck|Blank cheque)**"). Österreich stellte Serbien ein kaum annehmbares Ultimatum und erklärte am 28. Juli den Krieg. Russland mobilisierte; Deutschland erklärte am **1. August** Russland und am 3. August Frankreich den Krieg. Nach dem **[Schlieffen-Plan](wiki:Schlieffen-Plan|Schlieffen Plan)** marschierte das Heer durch das neutrale **Belgien** — worauf Großbritannien am 4. August in den Krieg eintrat.

Die Frage der Kriegsschuld ist bis heute Gegenstand historischer Debatten; weitgehend unstrittig ist, dass die deutsche Führung das Risiko eines großen Krieges bewusst in Kauf nahm.`,
    },
    {
      id: 'map-1914', type: 'map', title: 'Europa im Sommer 1914',
      view: [-6, 41.5, 40, 61],
      layers: { cities: false, mountains: false },
      highlight: [
        { label: 'Mittelmächte (Deutschland, Österreich-Ungarn)', color: '#b91c1c', countries: ['Deutschland', 'Österreich', 'Ungarn', 'Tschechien', 'Slowakei', 'Slowenien', 'Kroatien', 'Bosnien und Herzegowina'] },
        { label: 'Entente (Frankreich, Russland, Großbritannien) und Serbien', color: '#1d4ed8', countries: ['Frankreich', 'Russland', 'Vereinigtes Königreich', 'Serbien'] },
        { label: 'Belgien (neutral, am 4. August 1914 überfallen)', color: '#ca8a04', countries: ['Belgien'] },
      ],
      places: [
        { name: 'Sarajevo', kind: 'battle', pos: 'r', detail: '**[Sarajevo](wiki:Attentat von Sarajevo|Assassination of Archduke Franz Ferdinand)** — 28. Juni 1914: Das Attentat auf Franz Ferdinand löst die Julikrise aus.' },
        { name: 'Berlin', kind: 'capital', pos: 'l', detail: '**[Berlin](wiki:Berlin|Berlin)** — sichert Wien den „Blankoscheck" zu.' },
        { name: 'Wien', kind: 'capital', pos: 'r', detail: '**[Wien](wiki:Wien|Vienna)** — stellt Serbien das Ultimatum und erklärt am 28. Juli den Krieg.' },
        { name: 'Paris', kind: 'capital', pos: 'l' },
        { name: 'London', kind: 'capital', pos: 'l' },
        { name: 'Sankt Petersburg', kind: 'capital', pos: 'r' },
        { name: 'Belgrad', kind: 'capital', pos: 'r' },
        { name: 'Brüssel', kind: 'capital', pos: 'b' },
      ],
      caption: 'Die Bündnisse sind mit heutigen Staatsgrenzen als Näherung eingefärbt: Österreich-Ungarn und das Russische Reich umfassten damals auch Gebiete weiterer heutiger Staaten (u. a. Polen, Ukraine, Baltikum).',
    },
    {
      id: 'video-wk1', type: 'video', youtube: 'QbzNPFJ-PMQ', label: '20. Jahrhundert 1910–1919 – Die Sommerzeit und der 1. Weltkrieg', channel: 'MrWissen2go | Terra X',
    },
    {
      id: 'krieg', type: 'text', title: 'Materialschlacht und Heimatfront',
      md: `
Der erhoffte schnelle Sieg scheiterte im September 1914 an der **[Marne](wiki:Erste Marneschlacht|First Battle of the Marne)**. An der Westfront erstarrte der Krieg zum **[Stellungskrieg](wiki:Stellungskrieg|Static battle)** — Hunderte Kilometer Schützengräben von der Nordsee bis zur Schweiz. In den **Materialschlachten** von **[Verdun](wiki:Schlacht um Verdun|Battle of Verdun)** und an der **[Somme](wiki:Schlacht an der Somme|Battle of the Somme)** (beide 1916) starben Hunderttausende für wenige Kilometer Geländegewinn. Neue Waffen: Maschinengewehre, Giftgas (erstmals großflächig 1915 bei [Ypern](wiki:Ypern|Ypres)), Panzer, Flugzeuge, U-Boote.

In der Heimat herrschten Hunger (Steckrübenwinter 1916/17) und Kriegsmüdigkeit. **1917** war das Wendejahr: Nach dem [uneingeschränkten U-Boot-Krieg](wiki:Uneingeschränkter U-Boot-Krieg|Submarine warfare) traten die **USA** in den Krieg ein; in **Russland** stürzte die Revolution den Zaren, die Bolschewiki schlossen 1918 Frieden ([Brest-Litowsk](wiki:Frieden von Brest-Litowsk|Treaty of Brest-Litovsk)). Die letzte deutsche Offensive im Westen scheiterte im Sommer 1918. Die Oberste Heeresleitung forderte selbst einen Waffenstillstand, der am **11. November 1918** in **[Compiègne](wiki:Waffenstillstand von Compiègne (1918)|Armistice of 11 November 1918)** unterzeichnet wurde.

Bilanz: rund **17 Millionen Tote**, davon etwa 2 Millionen deutsche Soldaten.[^wp-erster-weltkrieg][^lemo-erster-weltkrieg]`,
    },
    {
      id: 'map-westfront', type: 'map', title: 'Die Westfront 1914–1918',
      view: [0.2, 46.9, 9.4, 52.1],
      rivers: [{ name: 'Maas', labelAt: 0.5 }, { name: 'Rhein', labelAt: 0.6 }],
      lines: [{ label: 'Westfront (schematisch)', color: '#b91c1c', dashed: true, labelAt: 0.72, coords: [[2.75, 51.13], [2.885, 50.851], [2.93, 49.93], [4.03, 49.26], [5.38, 49.16], [7.18, 47.49]], detail: 'Von der Nordsee bis zur Schweizer Grenze erstarrte die Front zum **[Stellungskrieg](wiki:Stellungskrieg|Static battle)**: Schützengräben auf rund 700 km Länge. Der Verlauf ist hier stark vereinfacht.' }],
      places: [
        { name: 'Ypern', kind: 'battle', pos: 'l', detail: '**[Ypern](wiki:Ypern|Ypres)** — 1915 erster großflächiger Einsatz von Giftgas.' },
        { name: 'Verdun', kind: 'battle', pos: 'r', detail: '**[Verdun](wiki:Schlacht um Verdun|Battle of Verdun)** — 1916: die längste Schlacht des Krieges.' },
        { name: 'Compiègne', kind: 'site', pos: 'l', detail: '**[Compiègne](wiki:Waffenstillstand von Compiègne (1918)|Armistice of 11 November 1918)** — 11. November 1918: Unterzeichnung des Waffenstillstands.' },
        { name: 'Versailles', kind: 'site', pos: 'l', detail: '**[Versailles](wiki:Versailles|Versailles, Yvelines)** — 28. Juni 1919: der Friedensvertrag.' },
        { name: 'Paris', kind: 'capital', pos: 'r' },
      ],
      points: [
        { lon: 2.93, lat: 49.93, label: 'Somme-Schlacht', kind: 'battle', pos: 'l', detail: '**[Somme](wiki:Schlacht an der Somme|Battle of the Somme)** — 1916: Hunderttausende Tote für wenige Kilometer Geländegewinn.' },
      ],
      caption: 'Die Marneschlacht im September 1914 stoppte den deutschen Vormarsch kurz vor Paris. Danach bewegte sich die Front jahrelang kaum.',
    },
    {
      id: 'fact-dolchstoss', type: 'callout', tone: 'fact', title: 'Die Dolchstoßlegende',
      md: `Obwohl die Heeresleitung selbst den Waffenstillstand verlangt hatte, verbreiteten [Hindenburg](wiki:Paul von Hindenburg|Paul von Hindenburg) und [Ludendorff](wiki:Erich Ludendorff|Erich Ludendorff) später die Lüge, das „im Felde unbesiegte" Heer sei von Revolutionären in der Heimat „von hinten erdolcht" worden. Diese **[Dolchstoßlegende](wiki:Dolchstoßlegende|Stab-in-the-back myth)** vergiftete die politische Kultur der Weimarer Republik und wurde von den Nationalsozialisten ausgeschlachtet.`,
    },
    {
      id: 'versailles', type: 'text', title: 'Der Versailler Vertrag',
      md: `
Der **[[versailler-vertrag|Versailler Vertrag]]** wurde am **28. Juni 1919** — genau fünf Jahre nach Sarajevo — im [Spiegelsaal von Versailles](wiki:Spiegelsaal von Versailles|Hall of Mirrors) unterzeichnet, ohne dass Deutschland mitverhandeln durfte:[^wp-versailles]

- **Gebietsverluste**: Elsass-Lothringen an Frankreich, Westpreußen und Posen an Polen (Danzig wurde Freie Stadt), alle **Kolonien**; insgesamt etwa ein Siebtel des Reichsgebiets.
- **Abrüstung**: Heer von höchstens **100.000 Mann**, keine Luftwaffe, keine U-Boote; das Rheinland wurde besetzt und entmilitarisiert.
- **Reparationen**: Zahlungen, deren Höhe 1921 auf 132 Milliarden Goldmark festgesetzt wurde.
- **Artikel 231**: die Verantwortung Deutschlands und seiner Verbündeten für den Krieg („Kriegsschuldartikel").

Zugleich wurde der **[Völkerbund](wiki:Völkerbund|League of Nations)** gegründet. In Deutschland lehnten fast alle politischen Lager den Vertrag als „Diktat" ab.`,
    },
    {
      id: 'timeline-wk1', type: 'game', viz: 'timeline', title: 'Vom Dreikaiserjahr bis Versailles',
      params: {
        mode: 'sort',
        events: [
          { year: 1884, label: 'Erste deutsche Kolonien' },
          { year: 1888, label: 'Dreikaiserjahr' },
          { year: 1890, label: 'Entlassung Bismarcks' },
          { year: 1904, label: 'Krieg gegen Herero und Nama' },
          { year: 1914, label: 'Attentat von Sarajevo' },
          { year: 1916, label: 'Verdun und Somme' },
          { year: 1917, label: 'Kriegseintritt der USA' },
          { year: 1919, label: 'Versailler Vertrag' },
        ],
      },
    },
    {
      id: 'map-quiz-wk1', type: 'map', title: 'Orte des Ersten Weltkriegs',
      view: [-1, 43.3, 22, 53.8],
      layers: { cities: false },
      quiz: { rounds: 6 },
      places: [{ name: 'Sarajevo' }, { name: 'Verdun' }, { name: 'Ypern' }, { name: 'Compiègne' }, { name: 'Berlin' }, { name: 'Wien' }],
    },
    {
      id: 'order-julikrise', type: 'order', title: 'Die Julikrise Schritt für Schritt',
      prompt: 'Ordne die Ereignisse des Sommers 1914.',
      items: ['Attentat von Sarajevo auf Franz Ferdinand', 'Deutscher „Blankoscheck" an Österreich-Ungarn', 'Österreichisches Ultimatum an Serbien', 'Kriegserklärung Österreich-Ungarns an Serbien', 'Deutsche Kriegserklärung an Russland', 'Einmarsch in Belgien und britischer Kriegseintritt'],
      explain: '28. Juni → 5./6. Juli → 23. Juli → 28. Juli → 1. August → 4. August 1914.',
    },
    {
      id: 'quiz-versailles', type: 'quiz', title: 'Versailles',
      question: 'Was gehörte zu den Bestimmungen des Versailler Vertrags?',
      options: [
        { text: 'Begrenzung des deutschen Heeres auf 100.000 Mann', correct: true, why: 'Dazu Verbot von Luftwaffe, U-Booten und schweren Waffen.' },
        { text: 'Abtretung Elsass-Lothringens an Frankreich', correct: true, why: 'Es war 1871 annektiert worden.' },
        { text: 'Verlust aller deutschen Kolonien', correct: true, why: 'Sie wurden als Völkerbundsmandate an die Siegermächte verteilt.' },
        { text: 'Teilung Deutschlands in Besatzungszonen', correct: false, why: 'Das geschah erst 1945.' },
        { text: 'Anschluss Österreichs an Deutschland', correct: false, why: 'Der Anschluss wurde im Gegenteil ausdrücklich verboten.' },
      ],
    },
    {
      id: 'match-wk1', type: 'match', title: 'Begriffe des Ersten Weltkriegs',
      pairs: [
        ['Blankoscheck', 'deutsche Garantie an Österreich-Ungarn'],
        ['Schlieffen-Plan', 'Angriff auf Frankreich durch Belgien'],
        ['Verdun', 'Materialschlacht 1916'],
        ['Compiègne', 'Waffenstillstand 11. November 1918'],
        ['Artikel 231', '„Kriegsschuldartikel"'],
        ['Dolchstoßlegende', 'Lüge vom „im Felde unbesiegten" Heer'],
      ],
    },
    {
      id: 'recall-urkatastrophe', type: 'recall', title: '„Urkatastrophe des 20. Jahrhunderts"',
      prompt: 'Warum wird der Erste Weltkrieg oft als „Urkatastrophe des 20. Jahrhunderts" bezeichnet? Nenne mindestens drei Folgen, die weit über 1918 hinaus wirkten.',
      answer: `Er zerstörte die alte Ordnung Europas: Die Monarchien in Deutschland, Österreich-Ungarn, Russland und das Osmanische Reich brachen zusammen. In Russland kamen die **Bolschewiki** an die Macht. Der **Versailler Vertrag** und die **Dolchstoßlegende** belasteten die Weimarer Republik und nährten den Revanchismus, den die **Nationalsozialisten** ausnutzten — der Weg zum Zweiten Weltkrieg. Dazu kamen die Erfahrung industrialisierten Massentötens, wirtschaftliche Zerrüttung (Inflation) und die **Neuordnung der Landkarte** mit neuen Nationalstaaten und Konflikten.`,
      hints: ['Welche Reiche gab es 1918 nicht mehr?', 'Wie hängt Versailles mit dem Aufstieg der NSDAP zusammen?'],
      cards: ['urkatastrophe'],
    },
  ],
  cards: [
    { id: 'dreikaiserjahr', front: 'Warum heißt 1888 „Dreikaiserjahr"?', back: 'Wilhelm I. starb, Friedrich III. regierte 99 Tage, dann folgte **Wilhelm II.**' },
    { id: 'bismarck-entlassung', front: 'Wann entließ Wilhelm II. Bismarck?', back: '**1890**.' },
    { id: 'platz-sonne', front: 'Wer forderte 1897 einen „Platz an der Sonne" für Deutschland?', back: 'Staatssekretär (später Reichskanzler) **Bernhard von Bülow**.' },
    { id: 'kolonien', front: 'Nenne zwei ehemalige deutsche Kolonien und ihre heutigen Staaten.', back: 'z. B. Deutsch-Südwestafrika (**Namibia**), Deutsch-Ostafrika (**Tansania**, Ruanda, Burundi), **Kamerun**, **Togo**.' },
    { id: 'herero', front: 'Welcher Völkermord wurde 1904–1908 von deutschen Truppen verübt?', back: 'Der **Völkermord an den Herero und Nama** in Deutsch-Südwestafrika (Namibia).' },
    { id: 'sarajevo', front: 'Welches Ereignis löste die Julikrise aus — wann?', back: 'Das **Attentat von Sarajevo** auf den österreichischen Thronfolger Franz Ferdinand am **28. Juni 1914**.' },
    { id: 'blankoscheck', front: 'Was war der „Blankoscheck"?', back: 'Die **bedingungslose Unterstützungszusage Deutschlands** an Österreich-Ungarn im Juli 1914.' },
    { id: 'buendnisse', front: 'Welche Bündnisse standen sich 1914 gegenüber?', back: '**Mittelmächte** (Deutschland, Österreich-Ungarn, später Osmanisches Reich, Bulgarien) gegen **Entente** (Frankreich, Russland, Großbritannien, später u. a. Italien, USA).' },
    { id: 'belgien', front: 'Warum trat Großbritannien am 4. August 1914 in den Krieg ein?', back: 'Wegen des deutschen **Einmarsches ins neutrale Belgien** (Schlieffen-Plan).' },
    { id: 'verdun', front: 'Welche beiden Materialschlachten des Jahres 1916 stehen für den Stellungskrieg?', back: '**Verdun** und die **Somme**.' },
    { id: 'wendejahr-1917', front: 'Warum gilt 1917 als Wendejahr des Ersten Weltkriegs?', back: 'Kriegseintritt der **USA** und **Russische Revolution** (Ausscheiden Russlands).' },
    { id: 'waffenstillstand', front: 'Wann und wo endeten die Kämpfe des Ersten Weltkriegs?', back: 'Waffenstillstand von **Compiègne** am **11. November 1918**.' },
    { id: 'wk1-tote', front: 'Wie viele Tote forderte der Erste Weltkrieg ungefähr?', back: 'Rund **17 Millionen** (Soldaten und Zivilisten).' },
    { id: 'versailles-datum', front: 'Wann wurde der Versailler Vertrag unterzeichnet?', back: 'Am **28. Juni 1919** — fünf Jahre nach Sarajevo.' },
    { id: 'versailles-inhalt', front: 'Nenne vier Bestimmungen des Versailler Vertrags.', back: 'Gebietsverluste (Elsass-Lothringen, Westpreußen/Posen), Verlust der Kolonien, Heer max. 100.000 Mann, Reparationen, Kriegsschuldartikel 231.' },
    { id: 'dolchstoss', front: 'Was behauptete die Dolchstoßlegende?', back: 'Das „im Felde unbesiegte" Heer sei von Revolutionären in der Heimat verraten worden — eine **Lüge** der Heeresleitung.' },
    { id: 'urkatastrophe', front: 'Warum „Urkatastrophe des 20. Jahrhunderts"?', back: 'Zusammenbruch der Monarchien, Russische Revolution, Versailles und Dolchstoßlegende als Hypothek für Weimar → Weg zu NS und Zweitem Weltkrieg.' },
  ],
};
