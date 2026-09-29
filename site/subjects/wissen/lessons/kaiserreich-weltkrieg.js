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
**1888** ging als „Dreikaiserjahr" in die Geschichte ein: Wilhelm I. starb, sein Sohn Friedrich III. regierte nur 99 Tage, dann bestieg der 29-jährige **Wilhelm II.** den Thron. Er entließ 1890 Bismarck und wollte „persönlich regieren".

Der **[[wilhelminismus|Wilhelminismus]]** stand für:
- **Weltpolitik**: Deutschland sollte neben Großbritannien Weltmacht sein. Staatssekretär Bülow forderte 1897 einen „**Platz an der Sonne**".
- **Flottenbau** unter Admiral Tirpitz — ein Wettrüsten mit Großbritannien, das die Briten an die Seite Frankreichs und Russlands trieb (**Entente**).
- **Militarismus** im Alltag: Uniformen, Reserveoffiziere, Obrigkeitsdenken — satirisch verewigt im „Hauptmann von Köpenick" (1906) und in Heinrich Manns „Der Untertan".

Gleichzeitig war das Kaiserreich ein Motor der Moderne: Weltmarktführer in **Chemie** und **Elektrotechnik**, Spitzenforschung (Röntgen, Koch, Planck), wachsende Großstädte und eine starke Arbeiterbewegung — 1912 wurde die **SPD** stärkste Partei im Reichstag.[^lemo-kaiserreich]`,
    },
    {
      id: 'kolonien', type: 'callout', tone: 'warning', title: 'Kolonien und der erste Völkermord des 20. Jahrhunderts',
      md: `Ab 1884 erwarb das Reich Kolonien in Afrika und im Pazifik: u. a. **Deutsch-Südwestafrika** (Namibia), Deutsch-Ostafrika (Tansania, Ruanda, Burundi), Kamerun und Togo. In Südwestafrika schlugen deutsche Truppen 1904–1908 Aufstände mit einem Vernichtungskrieg nieder — der **[[voelkermord-herero-nama|Völkermord an den Herero und Nama]]**, den die Bundesregierung 2021 als solchen anerkannte. Auch in Ostafrika forderte die Niederschlagung des Maji-Maji-Aufstands (1905–1907) Zehntausende Tote.`,
    },
    {
      id: 'julikrise', type: 'text', title: 'Sommer 1914: Wie der Krieg begann',
      md: `
Europa war in zwei Bündnisblöcke gespalten: **Mittelmächte** (Deutschland, Österreich-Ungarn) und **Entente** (Frankreich, Russland, Großbritannien). Am **28. Juni 1914** erschoss der bosnisch-serbische Nationalist Gavrilo Princip in **Sarajevo** den österreichischen Thronfolger **Franz Ferdinand** und seine Frau.

In der **[[julikrise]]** sicherte Berlin Wien bedingungslose Unterstützung zu („**Blankoscheck**"). Österreich stellte Serbien ein kaum annehmbares Ultimatum und erklärte am 28. Juli den Krieg. Russland mobilisierte; Deutschland erklärte am **1. August** Russland und am 3. August Frankreich den Krieg. Nach dem **Schlieffen-Plan** marschierte das Heer durch das neutrale **Belgien** — worauf Großbritannien am 4. August in den Krieg eintrat.

Die Frage der Kriegsschuld ist bis heute Gegenstand historischer Debatten; weitgehend unstrittig ist, dass die deutsche Führung das Risiko eines großen Krieges bewusst in Kauf nahm.`,
    },
    {
      id: 'video-wk1', type: 'video', youtube: 'QbzNPFJ-PMQ', label: '20. Jahrhundert 1910–1919 – Die Sommerzeit und der 1. Weltkrieg', channel: 'MrWissen2go | Terra X',
    },
    {
      id: 'krieg', type: 'text', title: 'Materialschlacht und Heimatfront',
      md: `
Der erhoffte schnelle Sieg scheiterte im September 1914 an der **Marne**. An der Westfront erstarrte der Krieg zum **Stellungskrieg** — Hunderte Kilometer Schützengräben von der Nordsee bis zur Schweiz. In den **Materialschlachten** von **Verdun** und an der **Somme** (beide 1916) starben Hunderttausende für wenige Kilometer Geländegewinn. Neue Waffen: Maschinengewehre, Giftgas (erstmals großflächig 1915 bei Ypern), Panzer, Flugzeuge, U-Boote.

In der Heimat herrschten Hunger (Steckrübenwinter 1916/17) und Kriegsmüdigkeit. **1917** war das Wendejahr: Nach dem uneingeschränkten U-Boot-Krieg traten die **USA** in den Krieg ein; in **Russland** stürzte die Revolution den Zaren, die Bolschewiki schlossen 1918 Frieden (Brest-Litowsk). Die letzte deutsche Offensive im Westen scheiterte im Sommer 1918. Die Oberste Heeresleitung forderte selbst einen Waffenstillstand, der am **11. November 1918** in **Compiègne** unterzeichnet wurde.

Bilanz: rund **17 Millionen Tote**, davon etwa 2 Millionen deutsche Soldaten.[^wp-erster-weltkrieg][^lemo-erster-weltkrieg]`,
    },
    {
      id: 'fact-dolchstoss', type: 'callout', tone: 'fact', title: 'Die Dolchstoßlegende',
      md: `Obwohl die Heeresleitung selbst den Waffenstillstand verlangt hatte, verbreiteten Hindenburg und Ludendorff später die Lüge, das „im Felde unbesiegte" Heer sei von Revolutionären in der Heimat „von hinten erdolcht" worden. Diese **Dolchstoßlegende** vergiftete die politische Kultur der Weimarer Republik und wurde von den Nationalsozialisten ausgeschlachtet.`,
    },
    {
      id: 'versailles', type: 'text', title: 'Der Versailler Vertrag',
      md: `
Der **[[versailler-vertrag|Versailler Vertrag]]** wurde am **28. Juni 1919** — genau fünf Jahre nach Sarajevo — im Spiegelsaal von Versailles unterzeichnet, ohne dass Deutschland mitverhandeln durfte:[^wp-versailles]
- **Gebietsverluste**: Elsass-Lothringen an Frankreich, Westpreußen und Posen an Polen (Danzig wurde Freie Stadt), alle **Kolonien**; insgesamt etwa ein Siebtel des Reichsgebiets.
- **Abrüstung**: Heer von höchstens **100.000 Mann**, keine Luftwaffe, keine U-Boote; das Rheinland wurde besetzt und entmilitarisiert.
- **Reparationen**: Zahlungen, deren Höhe 1921 auf 132 Milliarden Goldmark festgesetzt wurde.
- **Artikel 231**: die Verantwortung Deutschlands und seiner Verbündeten für den Krieg („Kriegsschuldartikel").

Zugleich wurde der **Völkerbund** gegründet. In Deutschland lehnten fast alle politischen Lager den Vertrag als „Diktat" ab.`,
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
