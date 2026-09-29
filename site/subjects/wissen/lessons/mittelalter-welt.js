export default {
  id: 'mittelalter-welt',
  title: 'Mittelalter & die Welt jenseits Europas',
  summary: 'Während Europa sich neu ordnete, blühten Byzanz, die islamische Welt, China und afrikanische Reiche. Kreuzzüge, Mongolen und Pest verbanden die Welt — oft gewaltsam.',
  minutes: 22,
  goals: [
    'Die Bedeutung von [[byzanz|Byzanz]] und seinem Ende 1453 erklären',
    'Entstehung und Ausbreitung des [[islam|Islam]] mit wichtigen Daten nennen',
    '[[kreuzzuege|Kreuzzüge]], [[mongolenreich|Mongolenreich]] und [[schwarzer-tod|Pest]] einordnen',
    'Beispiele für Hochkulturen außerhalb Europas im Mittelalter geben',
  ],
  blocks: [
    {
      id: 'byzanz', type: 'text', title: 'Byzanz: das Rom des Ostens',
      md: `
Als Westrom 476 unterging, lebte das Römische Reich im Osten weiter — als **[[byzanz|Byzantinisches Reich]]** mit der Hauptstadt **Konstantinopel** (heute Istanbul). Es sprach Griechisch, war christlich-orthodox und für Jahrhunderte die reichste Stadt Europas.

Kaiser **Justinian** (527–565) ließ die **Hagia Sophia** (537 geweiht) bauen und das römische Recht im *Corpus iuris civilis* sammeln — bis heute Grundlage vieler europäischer Rechtsordnungen. **1054** trennten sich die Kirchen des Ostens und des Westens endgültig (*Morgenländisches Schisma*): orthodox hier, römisch-katholisch dort. **1453** eroberten die Osmanen unter Sultan Mehmed II. Konstantinopel — für viele Historiker ein Epochenjahr zwischen Mittelalter und Neuzeit.[^wp-byzanz]`,
    },
    {
      id: 'islam', type: 'text', title: 'Die Ausbreitung des Islam',
      md: `
Um 610 begann **Mohammed** in Mekka zu predigen. Als er verfolgt wurde, zog er **622** nach Medina — diese **[[hidschra|Hidschra]]** ist das Jahr 1 der islamischen Zeitrechnung. Bei seinem Tod 632 war die Arabische Halbinsel geeint.

In nur rund hundert Jahren breitete sich das islamische Reich vom heutigen Pakistan bis nach Spanien aus: **711** setzten Truppen über die Meerenge von Gibraltar, **732** wurden sie bei **Tours und Poitiers** von Karl Martell aufgehalten. In Spanien (*al-Andalus*) bestand muslimische Herrschaft bis **1492**.[^wp-islamische-expansion]

Unter den Abbasiden wurde **Bagdad** zum Zentrum der Wissenschaft („Haus der Weisheit“). Gelehrte übersetzten griechische Philosophen ins Arabische und retteten so viel antikes Wissen. Wörter wie *Algebra*, *Algorithmus* (nach al-Chwarizmi), *Alkohol* und *Ziffer* erinnern daran — ebenso unsere „arabischen“ Ziffern, die ursprünglich aus Indien stammen.`,
    },
    {
      id: 'kreuzzuege', type: 'text', title: 'Kreuzzüge',
      md: `
**1095** rief Papst **Urban II.** in Clermont zum Kampf um Jerusalem auf. Im Ersten Kreuzzug eroberten christliche Heere **1099** die Stadt und richteten ein Massaker an. Schon auf dem Weg dorthin ermordeten Kreuzfahrer Tausende Juden in den Städten am Rhein (Speyer, Worms, Mainz). **1187** eroberte Sultan **Saladin** Jerusalem zurück; mit dem Fall von **Akkon 1291** endete die Kreuzfahrerherrschaft im Heiligen Land.[^wp-kreuzzug]

Neben Gewalt und bis heute belasteten Erinnerungen brachten die [[kreuzzuege|Kreuzzüge]] auch Handel und Wissensaustausch: Venedig und Genua wurden reich, Waren wie Zucker und Gewürze wurden in Europa bekannter.`,
    },
    {
      id: 'mongolen-china', type: 'text', title: 'Mongolen, China und Afrika',
      md: `
**1206** wurde Temüdschin zum **Dschingis Khan** („ozeangleicher Herrscher“) ausgerufen. Seine Reiterheere schufen das **[[mongolenreich|Mongolische Reich]]**, das größte zusammenhängende Landreich der Geschichte — von Korea bis Osteuropa. Die Eroberungen waren brutal, sicherten danach aber den Handel entlang der **[[seidenstrasse|Seidenstraße]]**. Der Venezianer **Marco Polo** berichtete vom Hof Kublai Khans in China.[^wp-mongolisches-reich]

**China** war im Mittelalter technisch führend: Papier (schon um 105 n. Chr.), Kompass, Schießpulver und der Buchdruck mit beweglichen Lettern (um 1040) stammen von dort. Die Flotten des Admirals **Zheng He** fuhren 1405–1433 bis nach Ostafrika — Jahrzehnte vor den Portugiesen.

In Westafrika war das **Reich Mali** mit der Gelehrtenstadt **Timbuktu** berühmt; sein Herrscher **Mansa Musa** machte 1324 eine legendäre Pilgerreise nach Mekka und gilt als einer der reichsten Menschen der Geschichte. In Amerika gründeten die **Azteken** 1325 Tenochtitlan, im 15. Jahrhundert entstand das Reich der **Inka**.`,
    },
    {
      id: 'pest', type: 'callout', tone: 'history', title: 'Der Schwarze Tod',
      md: `Über die Handelswege der Seidenstraße erreichte die Pest 1347 Europa. Der **[[schwarzer-tod|Schwarze Tod]]** tötete bis 1353 schätzungsweise **ein Drittel** der europäischen Bevölkerung.[^wp-schwarzer-tod] Die Folgen: Arbeitskräfte wurden knapp und teurer, Bauern gewannen an Verhandlungsmacht — und vielerorts wurden Juden fälschlich beschuldigt, Brunnen vergiftet zu haben, und in Pogromen ermordet.`,
    },
    {
      id: 'tl-game', type: 'game', viz: 'timeline', title: 'Ordne das Mittelalter',
      params: { mode: 'sort', events: [
        { year: 537, label: 'Hagia Sophia geweiht' },
        { year: 622, label: 'Hidschra' },
        { year: 732, label: 'Tours und Poitiers' },
        { year: 1054, label: 'Morgenländisches Schisma' },
        { year: 1099, label: 'Kreuzfahrer in Jerusalem' },
        { year: 1206, label: 'Dschingis Khan' },
        { year: 1347, label: 'Pest erreicht Europa' },
        { year: 1453, label: 'Fall Konstantinopels' },
      ] },
    },
    {
      id: 'match-erfindungen', type: 'match', title: 'Wer brachte was hervor?',
      pairs: [
        ['Corpus iuris civilis', 'Byzanz (Justinian)'],
        ['Algebra, Haus der Weisheit', 'Bagdad (Abbasiden)'],
        ['Kompass und Schießpulver', 'China'],
        ['Timbuktu', 'Reich Mali'],
        ['Tenochtitlan', 'Azteken'],
      ],
    },
    {
      id: 'num-hidschra', type: 'numeric', title: 'Jahr eins',
      question: 'In welchem Jahr (n. Chr.) fand die Hidschra statt, mit der die islamische Zeitrechnung beginnt?',
      answer: 622, tolerance: 0,
      explain: '**622** zog Mohammed von Mekka nach Medina.',
    },
    {
      id: 'quiz-1453', type: 'quiz', title: 'Epochenjahr 1453',
      question: 'Was geschah 1453?',
      options: [
        { text: 'Die Osmanen erobern Konstantinopel.', correct: true, why: 'Unter Mehmed II. — das Ende des Byzantinischen Reichs.' },
        { text: 'Kolumbus erreicht Amerika.', correct: false, why: 'Das war 1492.' },
        { text: 'Die Kirche spaltet sich in Ost und West.', correct: false, why: 'Das Schisma war 1054.' },
        { text: 'Die Pest erreicht Europa.', correct: false, why: 'Das war 1347.' },
      ],
    },
    {
      id: 'quiz-pest', type: 'quiz', title: 'Folgen der Pest',
      question: 'Welche Aussagen über den Schwarzen Tod stimmen?',
      options: [
        { text: 'Er tötete schätzungsweise ein Drittel der Menschen in Europa.', correct: true, why: 'Schätzungen reichen von 25 bis über 50 %.' },
        { text: 'Arbeitskräfte wurden danach knapper und Löhne stiegen.', correct: true, why: 'Die Überlebenden konnten bessere Bedingungen durchsetzen.' },
        { text: 'Jüdische Gemeinden wurden in Pogromen verfolgt.', correct: true, why: 'Man beschuldigte sie fälschlich der Brunnenvergiftung.' },
        { text: 'Er kam aus Amerika nach Europa.', correct: false, why: 'Er kam aus Zentralasien über die Handelswege und das Schwarze Meer.' },
      ],
    },
    {
      id: 'recall-austausch', type: 'recall', title: 'Die vernetzte Welt des Mittelalters',
      prompt: 'Das Mittelalter gilt oft als „finster“. Nenne drei Beispiele, die zeigen, dass die Welt damals vernetzt war und Wissen weitergegeben wurde.',
      answer: `Zum Beispiel: (1) Die **Seidenstraße**, im Mongolenreich besonders sicher, verband China und Europa (Marco Polo). (2) Gelehrte in **Bagdad** übersetzten antike griechische Schriften ins Arabische; über Spanien gelangte dieses Wissen später nach Europa. (3) Chinesische Erfindungen wie **Papier, Kompass und Schießpulver** verbreiteten sich nach Westen. Auch die Kreuzzüge brachten Handel mit sich — und die Handelswege brachten leider auch die Pest.`,
      cards: ['bagdad', 'china-erfindungen'],
    },
  ],
  cards: [
    { id: 'byzanz-hauptstadt', front: 'Hauptstadt des Byzantinischen Reichs — und heutiger Name?', back: 'Konstantinopel, heute Istanbul.' },
    { id: 'justinian', front: 'Zwei Leistungen Kaiser Justinians (527–565)?', back: 'Bau der Hagia Sophia (537) und das Corpus iuris civilis (Sammlung des römischen Rechts).' },
    { id: 'schisma', front: 'Was geschah 1054?', back: 'Das Morgenländische Schisma: Trennung von orthodoxer und römisch-katholischer Kirche.' },
    { id: 'fall-konstantinopel', front: 'Wann und durch wen fiel Konstantinopel?', back: '1453, durch die Osmanen unter Sultan Mehmed II.' },
    { id: 'hidschra', front: 'Was ist die Hidschra?', back: 'Mohammeds Auswanderung von Mekka nach Medina 622 — Beginn der islamischen Zeitrechnung.' },
    { id: 'tours-poitiers', front: 'Was geschah 732 bei Tours und Poitiers?', back: 'Karl Martell stoppte das Vordringen arabischer Truppen ins Frankenreich.' },
    { id: 'al-andalus', front: 'Wie lange bestand muslimische Herrschaft in Spanien?', back: 'Von 711 bis 1492 (Fall Granadas).' },
    { id: 'bagdad', front: 'Warum war Bagdad im Mittelalter ein Zentrum der Wissenschaft?', back: 'Unter den Abbasiden („Haus der Weisheit“) wurden antike Werke übersetzt und Mathematik, Medizin und Astronomie weiterentwickelt.' },
    { id: 'kreuzzug-start', front: 'Wer rief wann zum Ersten Kreuzzug auf?', back: 'Papst Urban II., 1095 in Clermont.' },
    { id: 'kreuzzug-daten', front: 'Jerusalem: erobert 1099 — und zurückerobert wann und von wem?', back: '1187 durch Sultan Saladin.' },
    { id: 'dschingis', front: 'Wann wurde Dschingis Khan zum Herrscher ausgerufen?', back: '1206 — Beginn des Mongolischen Reichs, des größten zusammenhängenden Landreichs der Geschichte.' },
    { id: 'marco-polo', front: 'Wer war Marco Polo?', back: 'Venezianischer Kaufmann, der vom Hof Kublai Khans in China berichtete (Ende 13. Jh.).' },
    { id: 'china-erfindungen', front: 'Vier Erfindungen aus dem alten China?', back: 'Papier, Kompass, Schießpulver, Buchdruck mit beweglichen Lettern.' },
    { id: 'mansa-musa', front: 'Wer war Mansa Musa?', back: 'Herrscher des westafrikanischen Reichs Mali; berühmte Pilgerreise nach Mekka 1324, sprichwörtlich reich.' },
    { id: 'pest', front: 'Schwarzer Tod: wann und wie viele Opfer in Europa?', back: '1346–1353; schätzungsweise ein Drittel der Bevölkerung.' },
  ],
};
