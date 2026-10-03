export default {
  id: 'karl-der-grosse',
  title: 'Karl der Große & das Heilige Römische Reich',
  summary: 'Von der Kaiserkrönung im Jahr 800 über Otto den Großen bis zum Gang nach Canossa: wie das mittelalterliche Reich entstand und funktionierte.',
  minutes: 20,
  goals: [
    'Die Kaiserkrönung [[karl-der-grosse|Karls des Großen]] datieren und ihre Bedeutung erklären',
    'Beschreiben, wie aus dem [[frankenreich|Frankenreich]] das Ostfrankenreich und das [[heiliges-roemisches-reich|Heilige Römische Reich]] wurden',
    'Den [[investiturstreit]] und den „Gang nach Canossa" erklären',
    'Die Rolle der [[kurfuersten]] und der Goldenen Bulle kennen',
  ],
  blocks: [
    {
      id: 'karl', type: 'text', title: 'Karl, der „Vater Europas"',
      md: `
**[Karl der Große](wiki:Karl der Große|Charlemagne)** (747/748–814) wurde 768 König der [Franken](wiki:Franken (Volk)|Franks). In über 40 Regierungsjahren führte er fast ununterbrochen Krieg: Er eroberte das Reich der [Langobarden](wiki:Langobarden|Lombards) in Italien, kämpfte gegen die [Awaren](wiki:Awaren|Pannonian Avars) und unterwarf in über dreißig Jahre dauernden, brutalen [Kriegen](wiki:Sachsenkriege Karls des Großen|Saxon Wars) die **[Sachsen](wiki:Sachsen (Volk)|Saxons)**, die er zwangsweise christianisierte.

Am **25. Dezember 800** krönte ihn Papst **[Leo III.](wiki:Leo III. (Papst)|Pope Leo III)** in [Rom](wiki:Rom|Rome) zum **Kaiser**. Damit gab es im Westen erstmals seit 476 wieder einen Kaiser — der Anspruch, das Römische Reich fortzusetzen, verband sich mit dem Christentum. Gleichzeitig begann damit das jahrhundertelange Ringen zwischen Kaiser und Papst.

Karl hatte keine feste Hauptstadt, sondern reiste von [Pfalz](wiki:Königspfalz|Kaiserpfalz) zu Pfalz; seine Lieblingspfalz war **[Aachen](wiki:Aachen|Aachen)**, wo er im [Dom](wiki:Aachener Dom|Aachen Cathedral) begraben liegt.[^wp-karl-der-grosse]`,
    },
    {
      id: 'map-karl-reich', type: 'map', title: 'Das Reich Karls des Großen',
      view: [-1.5, 40.8, 17.5, 55.2],
      highlight: [{ label: 'Reich Karls des Großen (ungefähr)', color: '#b45309',
        countries: ['Frankreich', 'Belgien', 'Niederlande', 'Luxemburg', 'Schweiz', 'Italien'],
        states: ['Nordrhein-Westfalen', 'Hessen', 'Rheinland-Pfalz', 'Saarland', 'Baden-Württemberg', 'Bayern', 'Niedersachsen', 'Hamburg', 'Freie Hansestadt Bremen', 'Schleswig-Holstein', 'Thüringen'] }],
      rivers: [{ name: 'Rhein', labelAt: 0.3 }],
      places: [
        { name: 'Aachen', pos: 'l', kind: 'capital', detail: '**[Aachen](wiki:Aachen|Aachen)** — Karls Lieblingspfalz und Grabstätte; die Pfalzkapelle ist der Kern des heutigen [Doms](wiki:Aachener Dom|Aachen Cathedral).' },
        { name: 'Rom', detail: '**[Rom](wiki:Rom|Rome)** — hier krönte Papst [Leo III.](wiki:Leo III. (Papst)|Pope Leo III) Karl am 25. Dezember 800 zum Kaiser.' },
        { name: 'Ingelheim', pos: 'l', detail: '**[Ingelheim](wiki:Kaiserpfalz Ingelheim|Ingelheim Imperial Palace)** — eine der großen Pfalzen am Rhein.' },
      ],
      points: [
        { lon: 8.757, lat: 51.719, label: 'Paderborn', pos: 'r', detail: '**[Paderborn](wiki:Paderborn|Paderborn)** — Schauplatz von Reichsversammlungen und Stützpunkt in den [Sachsenkriegen](wiki:Sachsenkriege Karls des Großen|Saxon Wars).' },
        { lon: 9.235, lat: 52.923, label: 'Verden', pos: 'r', kind: 'battle', detail: '**[Verden](wiki:Verden (Aller)|Verden, Aller)** — 782 das [Blutgericht von Verden](wiki:Blutgericht von Verden|Massacre of Verden): Karl ließ der Überlieferung nach tausende Sachsen hinrichten.' },
        { lon: 9.150, lat: 45.183, label: 'Pavia', pos: 'l', detail: '**[Pavia](wiki:Pavia|Pavia)** — Hauptstadt der [Langobarden](wiki:Langobarden|Lombards); Karl eroberte sie 774 und nahm den langobardischen Königstitel an.' },
      ],
      caption: 'Orange: heutige Staaten und Länder, die ganz oder überwiegend zum Frankenreich Karls (um 814) gehörten. Die tatsächliche Grenze verlief anders — Süditalien und das Land östlich der Elbe gehörten nicht dazu, die Spanische Mark im Südwesten schon.',
    },
    {
      id: 'video-karl', type: 'video', youtube: '4eOv2K6fFVU', label: '8. Jahrhundert – Franken gegen Sachsen – Karl der Große', channel: 'MrWissen2go | Terra X',
    },
    {
      id: 'kultur', type: 'callout', tone: 'fact', title: 'Karl und unsere Schrift',
      md: `Karl förderte Bildung, Klosterschulen und das Abschreiben antiker Texte (**[karolingische Renaissance](wiki:Karolingische Renaissance|Carolingian Renaissance)**). Die damals entwickelte klare **[karolingische Minuskel](wiki:Karolingische Minuskel|Carolingian minuscule)** ist der Vorfahre unserer heutigen Kleinbuchstaben. Karl selbst lernte übrigens erst spät und angeblich nur mühsam schreiben.`,
    },
    {
      id: 'teilung', type: 'text', title: 'Teilung und ein neues Reich im Osten',
      md: `
Nach Karls Tod zerfiel das Großreich. Im **[Vertrag von Verdun](wiki:Vertrag von Verdun|Treaty of Verdun) 843** teilten seine Enkel das [[frankenreich|Frankenreich]] in drei Teile: West-, Mittel- und Ostfranken. Aus dem [Westfrankenreich](wiki:Westfrankenreich|West Francia) wurde langfristig **Frankreich**, aus dem [Ostfrankenreich](wiki:Ostfrankenreich|East Francia) **Deutschland**.

Im Ostfrankenreich wählten die Stammesherzöge 919 den Sachsen **[Heinrich I.](wiki:Heinrich I. (Ostfrankenreich)|Henry the Fowler)** zum König. Sein Sohn **[Otto I.](wiki:Otto I. (HRR)|Otto the Great)** (der Große) besiegte **955 auf dem [Lechfeld](wiki:Schlacht auf dem Lechfeld|Battle of Lechfeld)** bei [Augsburg](wiki:Augsburg|Augsburg) die [Ungarn](wiki:Ungarneinfälle|Hungarian invasions of Europe) und ließ sich **962** in Rom zum Kaiser krönen. Mit dieser Kaiserkrönung beginnt nach verbreiteter Zählung das **[[heiliges-roemisches-reich|Heilige Römische Reich]]**, das bis **1806** bestand.[^wp-hrr]`,
    },
    {
      id: 'video-otto', type: 'video', youtube: 'mxqXkZdatNc', label: '10. Jahrhundert – Otto I – wie das Heilige Römische Reich entstand', channel: 'MrWissen2go | Terra X',
    },
    {
      id: 'reich-text', type: 'text', title: 'Wie funktionierte das Reich?',
      md: `
Das Heilige Römische Reich war **kein Nationalstaat** und hatte lange keine Hauptstadt. Es war ein Verband aus Hunderten Herzogtümern, Grafschaften, geistlichen Fürstentümern und freien Städten. Der König wurde **gewählt**, nicht einfach vererbt, und strebte die Krönung zum Kaiser durch den Papst an.

- Grundlage war das **[Lehnswesen](wiki:Lehnswesen|Fief)**: Der König verlieh Land und Rechte an [Vasallen](wiki:Vasall|Vassal), die ihm dafür Treue und Kriegsdienst schuldeten.
- Die **[Goldene Bulle](wiki:Goldene Bulle|Golden Bull of 1356)** von **1356** regelte die Königswahl: Sieben [[kurfuersten]] — drei geistliche ([Mainz](wiki:Mainz|Mainz), [Köln](wiki:Köln|Cologne), [Trier](wiki:Trier|Trier)) und vier weltliche (Böhmen, Pfalz, Sachsen, Brandenburg) — wählten den König, meist in [Frankfurt](wiki:Frankfurt am Main|Frankfurt).
- Ab dem 15. Jahrhundert findet sich der Zusatz **„Deutscher Nation"**; ab 1438 stellten fast immer die **[Habsburger](wiki:Habsburger|House of Habsburg)** den Kaiser.`,
    },
    {
      id: 'map-kurfuersten', type: 'map', title: 'Wahl und Krönung: die Orte des Reiches',
      view: [3.8, 47.4, 17.2, 53.4],
      layers: { cities: false },
      places: [
        { name: 'Mainz', color: '#7c3aed', pos: 'l', detail: '**[Mainz](wiki:Mainz|Mainz)** — Sitz eines geistlichen Kurfürsten; der Erzbischof war zugleich Reichserzkanzler.' },
        { name: 'Köln', color: '#7c3aed', pos: 'r', detail: '**[Köln](wiki:Köln|Cologne)** — Sitz eines geistlichen Kurfürsten.' },
        { name: 'Trier', color: '#7c3aed', pos: 'l', detail: '**[Trier](wiki:Trier|Trier)** — Sitz eines geistlichen Kurfürsten.' },
        { name: 'Prag', color: '#c2410c', detail: '**[Prag](wiki:Prag|Prague)** — Hauptstadt des Königreichs Böhmen, dessen König Kurfürst war.' },
        { name: 'Heidelberg', color: '#c2410c', pos: 'r', detail: '**[Heidelberg](wiki:Heidelberg|Heidelberg)** — Residenz des Pfalzgrafen bei Rhein (Kurpfalz).' },
        { name: 'Wittenberg', color: '#c2410c', detail: '**[Wittenberg](wiki:Lutherstadt Wittenberg|Wittenberg)** — Residenz des Herzogs von Sachsen (Kursachsen).' },
        { name: 'Frankfurt am Main', label: 'Frankfurt', kind: 'site', pos: 'r', detail: '**[Frankfurt](wiki:Frankfurt am Main|Frankfurt)** — Wahlort der römisch-deutschen Könige, nach der Goldenen Bulle von 1356 meist hier.' },
        { name: 'Aachen', kind: 'site', pos: 'l', detail: '**[Aachen](wiki:Aachen|Aachen)** — Krönungsort der Könige, bis 1531.' },
      ],
      points: [
        { lon: 12.533, lat: 52.417, label: 'Brandenburg', color: '#c2410c', pos: 'r', detail: '**[Brandenburg an der Havel](wiki:Brandenburg an der Havel|Brandenburg an der Havel)** — Stammsitz der Mark Brandenburg, deren Markgraf Kurfürst war.' },
      ],
      caption: 'Violett: die drei geistlichen Kurfürsten. Orange: die weltlichen Kurfürsten (Böhmen, Pfalz, Sachsen, Brandenburg). Raute: Orte von Wahl (Frankfurt) und Krönung (Aachen). Die Kaiserkrönung fand traditionell in Rom statt (Karte oben).',
    },
    {
      id: 'canossa', type: 'text', title: 'Kaiser gegen Papst: der Investiturstreit',
      md: `
Wer darf Bischöfe einsetzen? Bischöfe waren zugleich mächtige Landesherren — für den König unverzichtbare Stützen. Papst **[Gregor VII.](wiki:Gregor VII.|Pope Gregory VII)** beanspruchte das Recht allein für die Kirche. Als König **[Heinrich IV.](wiki:Heinrich IV. (HRR)|Henry IV, Holy Roman Emperor)** den Papst für abgesetzt erklärte, bannte ihn Gregor. Um den Bann zu lösen, zog Heinrich im Winter **1077** über die Alpen und wartete im Büßergewand drei Tage vor der Burg **[Canossa](wiki:Burg Canossa|Canossa Castle)**.

Der **[[investiturstreit]]** endete **1122** mit dem **[Wormser Konkordat](wiki:Wormser Konkordat|Concordat of Worms)**, einem Kompromiss. Bis heute sagt man „**nach Canossa gehen**", wenn jemand sich demütigend unterwerfen muss.`,
    },
    {
      id: 'timeline-mittelalter', type: 'game', viz: 'timeline', title: 'Mittelalter in der richtigen Reihenfolge',
      params: {
        mode: 'sort',
        events: [
          { year: 768, label: 'Karl wird Frankenkönig' },
          { year: 800, label: 'Kaiserkrönung Karls' },
          { year: 843, label: 'Vertrag von Verdun' },
          { year: 955, label: 'Schlacht auf dem Lechfeld' },
          { year: 962, label: 'Kaiserkrönung Ottos I.' },
          { year: 1077, label: 'Gang nach Canossa' },
          { year: 1122, label: 'Wormser Konkordat' },
          { year: 1356, label: 'Goldene Bulle' },
        ],
      },
    },
    {
      id: 'quiz-karl', type: 'quiz', title: 'Kaiserkrönung',
      question: 'Wer krönte Karl den Großen am 25. Dezember 800 zum Kaiser — und wo?',
      options: [
        { text: 'Papst Leo III. in Rom', correct: true, why: 'Die Krönung fand im Petersdom statt.' },
        { text: 'Papst Gregor VII. in Canossa', correct: false, why: 'Gregor VII. ist der Gegenspieler Heinrichs IV. — fast 300 Jahre später.' },
        { text: 'Der Erzbischof von Mainz in Aachen', correct: false, why: 'Aachen war Karls Lieblingspfalz, die Kaiserkrönung fand aber in Rom statt.' },
        { text: 'Er krönte sich selbst in Paris', correct: false, why: 'Selbstkrönung — das war [Napoleon](wiki:Napoleon Bonaparte|Napoleon) 1804 in Paris.' },
      ],
    },
    {
      id: 'match-kurfuersten', type: 'match', title: 'Begriffe des Mittelalters',
      pairs: [
        ['Lehnswesen', 'Land gegen Treue und Kriegsdienst'],
        ['Kurfürsten', 'wählten den römisch-deutschen König'],
        ['Goldene Bulle', 'Reichsgesetz von 1356 zur Königswahl'],
        ['Wormser Konkordat', 'Kompromiss im Investiturstreit 1122'],
        ['Pfalz', 'Königshof, an dem der reisende Herrscher residierte'],
      ],
    },
    {
      id: 'map-quiz-karl', type: 'map', title: 'Orte des frühen Reiches',
      view: [-1.5, 40.8, 17.5, 54.2],
      layers: { cities: false },
      quiz: { rounds: 7 },
      places: [{ name: 'Aachen' }, { name: 'Rom' }, { name: 'Canossa' }, { name: 'Verdun' }, { name: 'Worms' }, { name: 'Regensburg' }],
      points: [{ lon: 8.757, lat: 51.719, label: 'Paderborn' }],
    },
    {
      id: 'num-dauer', type: 'numeric', title: 'Wie lange bestand das Reich?',
      question: 'Wie viele Jahre bestand das Heilige Römische Reich, wenn man von der Kaiserkrönung Ottos I. bis zu seinem Ende rechnet?',
      answer: 844, tolerance: 0, unit: 'Jahre',
      hint: 'Otto I. wurde 962 gekrönt; das Reich endete 1806.',
      explain: '1806 − 962 = **844 Jahre** — deutlich länger als jeder spätere deutsche Staat.',
    },
    {
      id: 'recall-reich', type: 'recall', title: 'Kein Staat wie heute',
      prompt: 'Erkläre in 2–4 Sätzen, **worin sich das Heilige Römische Reich von einem modernen Nationalstaat unterschied**.',
      answer: `Das Reich war ein **übernationaler Verband** vieler weitgehend selbstständiger Territorien (Fürstentümer, Bistümer, Reichsstädte) mit vielen Sprachen und ohne feste Hauptstadt. Sein Oberhaupt wurde von den **Kurfürsten gewählt** und verstand sich als Nachfolger der römischen Kaiser mit christlichem Auftrag — Macht beruhte auf dem **Lehnswesen** und persönlichen Bindungen, nicht auf einer zentralen Verwaltung, einem Staatsvolk oder festen Grenzen.`,
      hints: ['Wer wählte den König?', 'Gab es eine Hauptstadt und eine zentrale Verwaltung?'],
      cards: ['hrr-kein-staat'],
    },
  ],
  cards: [
    { id: 'kaiser-800', front: 'Wann und wo wurde Karl der Große zum Kaiser gekrönt?', back: 'Am **25. Dezember 800** in **Rom** durch Papst Leo III.' },
    { id: 'aachen', front: 'Welche Pfalz bevorzugte Karl der Große, und wo ist er begraben?', back: '**Aachen** — er liegt im Aachener Dom.' },
    { id: 'sachsenkriege', front: 'Welches Volk unterwarf und christianisierte Karl in jahrzehntelangen Kriegen?', back: 'Die **Sachsen**.' },
    { id: 'minuskel', front: 'Welche Schrift aus der Zeit Karls ist Vorfahre unserer Kleinbuchstaben?', back: 'Die **karolingische Minuskel**.' },
    { id: 'verdun', front: 'Was regelte der Vertrag von Verdun 843?', back: 'Die **Dreiteilung des Frankenreichs** unter Karls Enkeln — Keim von Frankreich (West) und Deutschland (Ost).' },
    { id: 'lechfeld', front: 'Wen besiegte Otto I. 955 auf dem Lechfeld?', back: 'Die **Ungarn**.' },
    { id: 'hrr-beginn', front: 'Mit welchem Ereignis beginnt nach verbreiteter Zählung das Heilige Römische Reich?', back: 'Mit der **Kaiserkrönung Ottos I. 962**.' },
    { id: 'hrr-ende', front: 'Wann endete das Heilige Römische Reich?', back: '**1806** — Franz II. legte unter dem Druck Napoleons die Krone nieder.' },
    { id: 'hrr-kein-staat', front: 'Warum war das Heilige Römische Reich kein Nationalstaat?', back: 'Übernationaler Verband vieler selbstständiger Territorien, gewählter Herrscher, keine Hauptstadt, Macht über Lehnswesen statt zentraler Verwaltung.' },
    { id: 'goldene-bulle', front: 'Was regelte die Goldene Bulle von 1356?', back: 'Die **Königswahl** durch **sieben Kurfürsten**.' },
    { id: 'kurfuersten-7', front: 'Welche sieben Kurfürsten nennt die Goldene Bulle?', back: 'Erzbischöfe von **Mainz, Köln, Trier**; König von **Böhmen**, Pfalzgraf bei Rhein, Herzog von **Sachsen**, Markgraf von **Brandenburg**.' },
    { id: 'canossa', front: 'Was war der „Gang nach Canossa"?', back: 'Heinrich IV. tat **1077** vor der Burg Canossa Buße, damit Papst Gregor VII. den Kirchenbann löst — Höhepunkt des Investiturstreits.' },
    { id: 'investitur', front: 'Worum ging es im Investiturstreit?', back: 'Ob der **König oder der Papst** Bischöfe einsetzen darf.' },
    { id: 'wormser-konkordat', front: 'Wann und womit endete der Investiturstreit?', back: '**1122** mit dem **Wormser Konkordat**.' },
    { id: 'habsburger', front: 'Welche Dynastie stellte ab 1438 fast durchgehend den Kaiser?', back: 'Die **Habsburger**.' },
  ],
};
