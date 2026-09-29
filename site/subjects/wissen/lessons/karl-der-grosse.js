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
**Karl der Große** (747/748–814) wurde 768 König der Franken. In über 40 Regierungsjahren führte er fast ununterbrochen Krieg: Er eroberte das Langobardenreich in Italien, kämpfte gegen die Awaren und unterwarf in über dreißig Jahre dauernden, brutalen Kriegen die **Sachsen**, die er zwangsweise christianisierte.

Am **25. Dezember 800** krönte ihn Papst **Leo III.** in Rom zum **Kaiser**. Damit gab es im Westen erstmals seit 476 wieder einen Kaiser — der Anspruch, das Römische Reich fortzusetzen, verband sich mit dem Christentum. Gleichzeitig begann damit das jahrhundertelange Ringen zwischen Kaiser und Papst.

Karl hatte keine feste Hauptstadt, sondern reiste von Pfalz zu Pfalz; seine Lieblingspfalz war **Aachen**, wo er im Dom begraben liegt.[^wp-karl-der-grosse]`,
    },
    {
      id: 'video-karl', type: 'video', youtube: '4eOv2K6fFVU', label: '8. Jahrhundert – Franken gegen Sachsen – Karl der Große', channel: 'MrWissen2go | Terra X',
    },
    {
      id: 'kultur', type: 'callout', tone: 'fact', title: 'Karl und unsere Schrift',
      md: `Karl förderte Bildung, Klosterschulen und das Abschreiben antiker Texte (**karolingische Renaissance**). Die damals entwickelte klare **karolingische Minuskel** ist der Vorfahre unserer heutigen Kleinbuchstaben. Karl selbst lernte übrigens erst spät und angeblich nur mühsam schreiben.`,
    },
    {
      id: 'teilung', type: 'text', title: 'Teilung und ein neues Reich im Osten',
      md: `
Nach Karls Tod zerfiel das Großreich. Im **Vertrag von Verdun 843** teilten seine Enkel das [[frankenreich|Frankenreich]] in drei Teile: West-, Mittel- und Ostfranken. Aus dem Westfrankenreich wurde langfristig **Frankreich**, aus dem Ostfrankenreich **Deutschland**.

Im Ostfrankenreich wählten die Stammesherzöge 919 den Sachsen **Heinrich I.** zum König. Sein Sohn **Otto I.** (der Große) besiegte **955 auf dem Lechfeld** bei Augsburg die Ungarn und ließ sich **962** in Rom zum Kaiser krönen. Mit dieser Kaiserkrönung beginnt nach verbreiteter Zählung das **[[heiliges-roemisches-reich|Heilige Römische Reich]]**, das bis **1806** bestand.[^wp-hrr]`,
    },
    {
      id: 'video-otto', type: 'video', youtube: 'mxqXkZdatNc', label: '10. Jahrhundert – Otto I – wie das Heilige Römische Reich entstand', channel: 'MrWissen2go | Terra X',
    },
    {
      id: 'reich-text', type: 'text', title: 'Wie funktionierte das Reich?',
      md: `
Das Heilige Römische Reich war **kein Nationalstaat** und hatte lange keine Hauptstadt. Es war ein Verband aus Hunderten Herzogtümern, Grafschaften, geistlichen Fürstentümern und freien Städten. Der König wurde **gewählt**, nicht einfach vererbt, und strebte die Krönung zum Kaiser durch den Papst an.

- Grundlage war das **Lehnswesen**: Der König verlieh Land und Rechte an Vasallen, die ihm dafür Treue und Kriegsdienst schuldeten.
- Die **Goldene Bulle** von **1356** regelte die Königswahl: Sieben [[kurfuersten]] — drei geistliche (Mainz, Köln, Trier) und vier weltliche (Böhmen, Pfalz, Sachsen, Brandenburg) — wählten den König, meist in Frankfurt.
- Ab dem 15. Jahrhundert findet sich der Zusatz **„Deutscher Nation"**; ab 1438 stellten fast immer die **Habsburger** den Kaiser.`,
    },
    {
      id: 'canossa', type: 'text', title: 'Kaiser gegen Papst: der Investiturstreit',
      md: `
Wer darf Bischöfe einsetzen? Bischöfe waren zugleich mächtige Landesherren — für den König unverzichtbare Stützen. Papst **Gregor VII.** beanspruchte das Recht allein für die Kirche. Als König **Heinrich IV.** den Papst für abgesetzt erklärte, bannte ihn Gregor. Um den Bann zu lösen, zog Heinrich im Winter **1077** über die Alpen und wartete im Büßergewand drei Tage vor der Burg **Canossa**.

Der **[[investiturstreit]]** endete **1122** mit dem **Wormser Konkordat**, einem Kompromiss. Bis heute sagt man „**nach Canossa gehen**", wenn jemand sich demütigend unterwerfen muss.`,
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
        { text: 'Er krönte sich selbst in Paris', correct: false, why: 'Selbstkrönung — das war Napoleon 1804 in Paris.' },
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
