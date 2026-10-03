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
Als Westrom 476 unterging, lebte das Römische Reich im Osten weiter — als **[[byzanz|Byzantinisches Reich]]** mit der Hauptstadt **[Konstantinopel](wiki:Konstantinopel|Constantinople)** (heute [Istanbul](wiki:Istanbul|Istanbul)). Es sprach Griechisch, war christlich-orthodox und für Jahrhunderte die reichste Stadt Europas.

Kaiser **[Justinian](wiki:Justinian I.|Justinian I)** (527–565) ließ die **[Hagia Sophia](wiki:Hagia Sophia|Hagia Sophia)** (537 geweiht) bauen und das römische Recht im *[Corpus iuris civilis](wiki:Corpus iuris civilis|Corpus Juris Civilis)* sammeln — bis heute Grundlage vieler europäischer Rechtsordnungen. **1054** trennten sich die Kirchen des Ostens und des Westens endgültig (*[Morgenländisches Schisma](wiki:Morgenländisches Schisma|East–West Schism)*): orthodox hier, römisch-katholisch dort. **1453** eroberten die [Osmanen](wiki:Osmanisches Reich|Ottoman Empire) unter Sultan [Mehmed II.](wiki:Mehmed II.|Mehmed II) Konstantinopel — für viele Historiker ein Epochenjahr zwischen Mittelalter und Neuzeit.[^wp-byzanz]`,
    },
    {
      id: 'islam', type: 'text', title: 'Die Ausbreitung des Islam',
      md: `
Um 610 begann **[Mohammed](wiki:Mohammed|Muhammad)** in [Mekka](wiki:Mekka|Mecca) zu predigen. Als er verfolgt wurde, zog er **622** nach [Medina](wiki:Medina|Medina) — diese **[[hidschra|Hidschra]]** ist das Jahr 1 der islamischen Zeitrechnung. Bei seinem Tod 632 war die Arabische Halbinsel geeint.

In nur rund hundert Jahren breitete sich das islamische Reich vom heutigen Pakistan bis nach Spanien aus: **711** setzten Truppen über die Meerenge von [Gibraltar](wiki:Gibraltar|Gibraltar), **732** wurden sie bei **[Tours und Poitiers](wiki:Schlacht von Tours und Poitiers|Battle of Tours)** von [Karl Martell](wiki:Karl Martell|Charles Martel) aufgehalten. In Spanien (*[al-Andalus](wiki:Al-Andalus|Al-Andalus)*) bestand muslimische Herrschaft bis **1492**.[^wp-islamische-expansion]

Unter den [Abbasiden](wiki:Abbasiden|Abbasid Caliphate) wurde **[Bagdad](wiki:Bagdad|Baghdad)** zum Zentrum der Wissenschaft („[Haus der Weisheit](wiki:Haus der Weisheit (Bagdad)|House of Wisdom)“). Gelehrte übersetzten griechische Philosophen ins Arabische und retteten so viel antikes Wissen. Wörter wie *[Algebra](wiki:Algebra|Algebra)*, *[Algorithmus](wiki:Algorithmus|Algorithm)* (nach [al-Chwarizmi](wiki:Al-Chwarizmi|Al-Khwarizmi)), *Alkohol* und *Ziffer* erinnern daran — ebenso unsere „arabischen“ Ziffern, die ursprünglich aus Indien stammen.`,
    },
    {
      id: 'map-islam', type: 'map', title: 'Von Mekka bis Poitiers: die Ausbreitung des Islam',
      view: [-12, 17, 65, 47],
      layers: { cities: false, countryLabels: false, mountains: false },
      places: [
        { name: 'Mekka', num: 1, pos: 'b', detail: `**[Mekka](wiki:Mekka|Mecca)** — um 610 begann hier Mohammeds Verkündigung; bis heute Ziel der Pilgerfahrt (Haddsch).` },
        { name: 'Medina', num: 2, pos: 'r', detail: `**[Medina](wiki:Medina|Medina)** — 622 zog Mohammed hierher: die [Hidschra](wiki:Hidschra|Hijrah), Beginn der islamischen Zeitrechnung.` },
        { name: 'Damaskus', num: 3, pos: 'l', detail: `**[Damaskus](wiki:Damaskus|Damascus)** — Hauptstadt der [Umayyaden](wiki:Umayyaden|Umayyad dynasty), die ab 661 das Kalifat regierten.` },
        { name: 'Kairo', pos: 'b', detail: `**[Kairo](wiki:Kairo|Cairo)** — Ägypten wurde um 640 muslimisch; Kairo selbst wurde erst 969 gegründet.` },
        { name: 'Konstantinopel', kind: 'capital', pos: 't', detail: `**[Konstantinopel](wiki:Konstantinopel|Constantinople)** — die Hauptstadt von Byzanz hielt den Angriffen stand, bis die Osmanen sie 1453 eroberten.` },
        { name: 'Bagdad', num: 7, pos: 'b', detail: `**[Bagdad](wiki:Bagdad|Baghdad)** — 762 als Hauptstadt der [Abbasiden](wiki:Abbasiden|Abbasid Caliphate) gegründet; Zentrum der Wissenschaft („Haus der Weisheit“).` },
        { name: 'Poitiers', num: 6, kind: 'battle', pos: 'r', detail: `**[Tours und Poitiers](wiki:Schlacht von Tours und Poitiers|Battle of Tours)** (732) — der Frankenführer [Karl Martell](wiki:Karl Martell|Charles Martel) stoppt den muslimischen Vormarsch.` },
      ],
      points: [
        { lon: 10.101, lat: 35.677, label: 'Kairuan', num: 4, pos: 'b', detail: `**[Kairuan](wiki:Kairuan|Kairouan)** — um 670 gegründet, Ausgangspunkt der Eroberung Nordafrikas und Spaniens.` },
        { lon: -5.353, lat: 36.138, label: 'Gibraltar', num: 5, pos: 'b', detail: `**[Gibraltar](wiki:Gibraltar|Gibraltar)** — 711 setzten Truppen unter Tariq ibn Ziyad nach Spanien über; der Name erinnert an ihn (*Dschabal Tariq*, „Berg des Tariq“).` },
      ],
      lines: [
        { label: 'Eroberungen bis 732 (schematisch)', color: '#047857', arrow: true, labelAt: 0.25, coords: [[39.61, 24.469], [36.309, 33.51], [29.928, 31.214], [10.101, 35.677], [-5.353, 36.138], [0.335, 46.581]],
          detail: `Von Medina über Damaskus und Ägypten durch Nordafrika nach Spanien und bis nach Poitiers — die Nummern zeigen die Reihenfolge.` },
      ],
      caption: 'Die Nummern folgen der Zeit: 1 Mekka (um 610) · 2 Medina (622) · 3 Damaskus (661) · 4 Kairuan (um 670) · 5 Gibraltar (711) · 6 Poitiers (732) · 7 Bagdad (762).',
    },
    {
      id: 'kreuzzuege', type: 'text', title: 'Kreuzzüge',
      md: `
**1095** rief Papst **[Urban II.](wiki:Urban II.|Pope Urban II)** in [Clermont](wiki:Synode von Clermont|Council of Clermont) zum Kampf um [Jerusalem](wiki:Jerusalem|Jerusalem) auf. Im Ersten Kreuzzug eroberten christliche Heere **1099** die Stadt und richteten ein Massaker an. Schon auf dem Weg dorthin ermordeten Kreuzfahrer Tausende Juden in den Städten am Rhein ([Speyer](wiki:Speyer|Speyer), [Worms](wiki:Worms|Worms, Germany), [Mainz](wiki:Mainz|Mainz)). **1187** eroberte Sultan **[Saladin](wiki:Saladin|Saladin)** Jerusalem zurück; mit dem Fall von **[Akkon](wiki:Akkon|Acre, Israel) 1291** endete die Kreuzfahrerherrschaft im Heiligen Land.[^wp-kreuzzug]

Neben Gewalt und bis heute belasteten Erinnerungen brachten die [[kreuzzuege|Kreuzzüge]] auch Handel und Wissensaustausch: [Venedig](wiki:Venedig|Venice) und [Genua](wiki:Genua|Genoa) wurden reich, Waren wie Zucker und Gewürze wurden in Europa bekannter.`,
    },
    {
      id: 'map-kreuzzuege', type: 'map', title: 'Der Erste Kreuzzug: Wege ins Heilige Land',
      view: [-3, 30, 42, 52],
      layers: { cities: false, countryLabels: false, mountains: false },
      places: [
        { name: 'Jerusalem', kind: 'site', pos: 'r', detail: `**[Jerusalem](wiki:Jerusalem|Jerusalem)** — Ziel des Kreuzzugs; 1099 von den Kreuzfahrern erobert, 1187 von [Saladin](wiki:Saladin|Saladin) zurückgewonnen.` },
        { name: 'Akkon', pos: 'l', detail: `**[Akkon](wiki:Akkon|Acre, Israel)** — letzte Festung der Kreuzfahrer, fiel 1291.` },
        { name: 'Antiochia am Orontes', pos: 't', detail: `**[Antiochia](wiki:Antiochia am Orontes|Antioch)** — 1098 nach monatelanger Belagerung erobert.` },
        { name: 'Konstantinopel', kind: 'capital', pos: 't', detail: `**[Konstantinopel](wiki:Konstantinopel|Constantinople)** — der byzantinische Kaiser hatte um Hilfe gegen die Seldschuken gebeten; hier sammelten sich die Heere.` },
        { name: 'Venedig', pos: 'l', detail: `**[Venedig](wiki:Venedig|Venice)** — verdiente als Transport- und Handelsmacht an den Kreuzzügen.` },
        { name: 'Genua', pos: 'l', detail: `**[Genua](wiki:Genua|Genoa)** — ebenso wie Venedig Gewinner des Handels mit dem Orient.` },
        { name: 'Mainz', kind: 'battle', pos: 'l', detail: `**[Mainz](wiki:Mainz|Mainz)** — 1096 wurden hier wie in [Speyer](wiki:Speyer|Speyer) und [Worms](wiki:Worms|Worms, Germany) Juden von durchziehenden Kreuzfahrern ermordet.` },
        { name: 'Wien', pos: 't' },
        { name: 'Belgrad', pos: 'r' },
      ],
      points: [
        { lon: 3.087, lat: 45.78, label: 'Clermont', kind: 'site', pos: 'b', detail: `**[Clermont](wiki:Clermont-Ferrand|Clermont-Ferrand)** — hier rief [Papst Urban II.](wiki:Urban II.|Pope Urban II) 1095 zum Kreuzzug auf.` },
      ],
      lines: [
        { label: 'Weg der Heere (schematisch)', color: '#b91c1c', arrow: true, labelAt: 0.4, coords: [[8.271, 50], [16.373, 48.208], [20.462, 44.821], [28.976, 41.009], [36.15, 36.2], [35.224, 31.779]],
          detail: `Die Heere zogen auf mehreren Wegen; hier ist eine häufig genutzte Landroute über Ungarn und den Balkan vereinfacht eingezeichnet.` },
      ],
      caption: 'Die Route ist schematisch; die Kreuzfahrerheere zogen nicht gemeinsam und nicht auf einem einzigen Weg.',
    },
    {
      id: 'mongolen-china', type: 'text', title: 'Mongolen, China und Afrika',
      md: `
**1206** wurde Temüdschin zum **[Dschingis Khan](wiki:Dschingis Khan|Genghis Khan)** („ozeangleicher Herrscher“) ausgerufen. Seine Reiterheere schufen das **[[mongolenreich|Mongolische Reich]]**, das größte zusammenhängende Landreich der Geschichte — von Korea bis Osteuropa. Die Eroberungen waren brutal, sicherten danach aber den Handel entlang der **[[seidenstrasse|Seidenstraße]]**. Der Venezianer **[Marco Polo](wiki:Marco Polo|Marco Polo)** berichtete vom Hof [Kublai Khans](wiki:Kublai Khan|Kublai Khan) in China.[^wp-mongolisches-reich]

**China** war im Mittelalter technisch führend: Papier (schon um 105 n. Chr.), [Kompass](wiki:Kompass|Compass), [Schießpulver](wiki:Schießpulver|Powder explosive) und der Buchdruck mit beweglichen Lettern (um 1040) stammen von dort. Die Flotten des Admirals **[Zheng He](wiki:Zheng He|Zheng He)** fuhren 1405–1433 bis nach Ostafrika — Jahrzehnte vor den Portugiesen.

In Westafrika war das **[Reich Mali](wiki:Mali-Reich|Mali Empire)** mit der Gelehrtenstadt **[Timbuktu](wiki:Timbuktu|Timbuktu)** berühmt; sein Herrscher **[Mansa Musa](wiki:Mansa Musa|Mansa Musa)** machte 1324 eine legendäre Pilgerreise nach Mekka und gilt als einer der reichsten Menschen der Geschichte. In Amerika gründeten die **[Azteken](wiki:Azteken|Aztecs)** 1325 [Tenochtitlan](wiki:Tenochtitlán|Tenochtitlan), im 15. Jahrhundert entstand das Reich der **[Inka](wiki:Inka)**.`,
    },
    {
      id: 'map-welt-1300', type: 'map', title: 'Die vernetzte Welt um 1300',
      view: [-20, -6, 135, 60],
      proj: 'lcc',
      layers: { cities: false, countryLabels: false, mountains: false },
      places: [
        { name: 'Venedig', pos: 'l', detail: `**[Venedig](wiki:Venedig|Venice)** — Heimat des Kaufmanns [Marco Polo](wiki:Marco Polo|Marco Polo), der um 1275 am Hof des Großkhans ankam.` },
        { name: 'Konstantinopel', kind: 'capital', pos: 't', detail: `**[Konstantinopel](wiki:Konstantinopel|Constantinople)** — Brücke zwischen Europa und Asien.` },
        { name: 'Bagdad', pos: 'b', detail: `**[Bagdad](wiki:Bagdad|Baghdad)** — 1258 von den Mongolen erobert und zerstört.` },
        { name: 'Samarkand', pos: 't', detail: `**[Samarkand](wiki:Samarkand|Samarkand)** — Knotenpunkt der [Seidenstraße](wiki:Seidenstraße|Silk Road).` },
        { name: 'Peking', kind: 'capital', pos: 'r', detail: `**[Peking](wiki:Peking|Beijing)** — unter [Kublai Khan](wiki:Kublai Khan|Kublai Khan) als *Khanbaliq* Hauptstadt des mongolischen Yuan-Reichs.` },
        { name: 'Timbuktu', pos: 'b', detail: `**[Timbuktu](wiki:Timbuktu|Timbuktu)** — Gelehrten- und Handelsstadt im Reich Mali.` },
        { name: 'Kairo', pos: 'b', detail: `**[Kairo](wiki:Kairo|Cairo)** — Station von [Mansa Musas](wiki:Mansa Musa|Mansa Musa) Pilgerreise 1324.` },
        { name: 'Mekka', pos: 'b', detail: `**[Mekka](wiki:Mekka|Mecca)** — Ziel der Pilgerreise Mansa Musas.` },
      ],
      points: [
        { lon: 102.848, lat: 47.21, label: 'Karakorum', kind: 'site', pos: 't', detail: `**[Karakorum](wiki:Karakorum (Stadt)|Karakorum)** — Hauptstadt des Mongolischen Reichs unter [Ögedei](wiki:Ögedei|Ögedei Khan) und seinen Nachfolgern.` },
        { lon: 108.942, lat: 34.268, label: 'Xi’an', pos: 'b', detail: `**[Xi’an](wiki:Xi’an|Xi'an)** — Ausgangspunkt der Seidenstraße im Osten.` },
      ],
      lines: [
        { label: 'Seidenstraße (schematisch)', color: '#b45309', labelAt: 0.62, coords: [[12.336, 45.438], [28.976, 41.009], [44.383, 33.333], [66.96, 39.654], [108.942, 34.268], [116.383, 39.933]],
          detail: `Das Netz der Handelswege der [Seidenstraße](wiki:Seidenstraße|Silk Road): Waren, Religionen, Techniken und Krankheiten reisten mit.` },
        { label: 'Mansa Musa 1324', color: '#047857', arrow: true, dashed: true, labelAt: 0.3, coords: [[-3.007, 16.773], [31.239, 30.056], [39.826, 21.423]],
          detail: `Der Herrscher von Mali reiste mit riesigem Gefolge und viel Gold über Kairo nach Mekka.` },
      ],
      caption: 'Zwischen Mali im Westen und China im Osten verbanden Handelswege die Reiche des Mittelalters — Linien schematisch.',
    },
    {
      id: 'pest', type: 'callout', tone: 'history', title: 'Der Schwarze Tod',
      md: `Über die Handelswege der Seidenstraße erreichte die Pest 1347 Europa. Der **[[schwarzer-tod|Schwarze Tod]]** tötete bis 1353 schätzungsweise **ein Drittel** der europäischen Bevölkerung.[^wp-schwarzer-tod] Die Folgen: Arbeitskräfte wurden knapp und teurer, Bauern gewannen an Verhandlungsmacht — und vielerorts wurden Juden fälschlich beschuldigt, Brunnen vergiftet zu haben, und in [Pogromen](wiki:Pogrom|Pogrom) ermordet.`,
    },
    {
      id: 'map-pest', type: 'map', title: 'Der Weg der Pest 1347–1353',
      view: [-6, 34, 40, 58],
      layers: { cities: false, countryLabels: false, mountains: false },
      places: [
        { name: 'Konstantinopel', num: 2, pos: 'b', detail: `**[Konstantinopel](wiki:Konstantinopel|Constantinople)** — Ende 1347 erreichte die Pest die Hauptstadt von Byzanz.` },
        { name: 'Genua', pos: 'l', detail: `**[Genua](wiki:Genua|Genoa)** — Handelsschiffe brachten die Seuche aus Kaffa in die italienischen Hafenstädte.` },
        { name: 'Venedig', pos: 'r', detail: `**[Venedig](wiki:Venedig|Venice)** — der Hafen verlor in wenigen Monaten einen großen Teil der Bevölkerung.` },
        { name: 'Marseille', num: 4, pos: 'l', detail: `**[Marseille](wiki:Marseille|Marseille)** — 1347/48 breitete sich die Pest von hier in Frankreich aus.` },
        { name: 'Paris', num: 5, pos: 'l', detail: `**[Paris](wiki:Paris|Paris)** — 1348 erreichte der Schwarze Tod die Stadt.` },
        { name: 'London', num: 6, pos: 'l', detail: `**[London](wiki:London|London)** — erreicht 1348/49.` },
      ],
      points: [
        { lon: 35.379, lat: 45.049, label: 'Kaffa', num: 1, pos: 'r', detail: `**[Kaffa](wiki:Feodossija|Feodosia)** (heute Feodossija auf der Krim) — hier belagerten Mongolen die genuesische Handelsstadt; der Überlieferung nach brachte die Pest von hier aus den Seeweg nach Europa.` },
        { lon: 15.55, lat: 38.183, label: 'Messina', num: 3, pos: 'l', detail: `**[Messina](wiki:Messina|Messina)** — im Oktober 1347 liefen hier Schiffe mit Pestkranken ein.` },
      ],
      lines: [
        { label: 'Ausbreitung (schematisch)', color: '#7f1d1d', arrow: true, labelAt: 0.55, coords: [[35.379, 45.049], [28.976, 41.009], [15.55, 38.183], [5.376, 43.297], [2.352, 48.857], [-0.118, 51.509]],
          detail: `Die Seuche folgte den Handelswegen über das Meer und breitete sich dann entlang der Flüsse und Straßen aus.` },
      ],
      caption: 'Die Nummern zeigen die ungefähre Reihenfolge; Kaffa als Ausgangspunkt entspricht der gängigen Überlieferung.',
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
      id: 'map-quiz-mittelalter', type: 'map', title: 'Wo lagen die Zentren des Mittelalters?',
      view: [-12, 22, 65, 56],
      layers: { cities: false, countryLabels: false, mountains: false },
      quiz: { rounds: 7 },
      places: [{ name: 'Konstantinopel' }, { name: 'Mekka' }, { name: 'Jerusalem' }, { name: 'Bagdad' }, { name: 'Venedig' }, { name: 'Córdoba' }, { name: 'Poitiers' }, { name: 'Damaskus' }],
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
