export default {
  id: 'antike',
  title: 'Antike Hochkulturen',
  summary: 'Schrift, Pyramiden, Demokratie und ein Weltreich: Wie Mesopotamien, Ägypten, Griechenland und Rom die Grundlagen unserer Welt legten.',
  minutes: 22,
  goals: [
    'Die ersten [[hochkultur|Hochkulturen]] verorten und erklären, was sie auszeichnet',
    'Wichtige Stationen Griechenlands nennen: [[polis|Polis]], [[attische-demokratie|Demokratie]], Alexander, [[hellenismus|Hellenismus]]',
    'Die großen Etappen des [[roemisches-reich|Römischen Reichs]] mit Jahreszahlen einordnen',
    'Erklären, was wir heute noch der Antike verdanken',
  ],
  blocks: [
    {
      id: 'fluesse', type: 'text', title: 'Am Anfang war der Fluss',
      md: `
Die ersten **[[hochkultur|Hochkulturen]]** entstanden dort, wo große Flüsse fruchtbares Land schufen: zwischen **Euphrat und Tigris** (Mesopotamien, „Zwischenstromland“, heute vor allem Irak), am **Nil**, am **Indus** und am **Gelben Fluss** in China. Bewässerung brauchte Organisation — und Organisation brauchte Aufzeichnungen.

So erfanden die **Sumerer** um 3300 v. Chr. in Städten wie Uruk die **[[keilschrift|Keilschrift]]**, zunächst für Buchhaltung: Wie viel Getreide hat wer abgeliefert? Später hielt man damit Gesetze fest — berühmt ist der **Codex Hammurapi** aus Babylon (um 1750 v. Chr.) mit dem Prinzip „Auge um Auge“ — und die erste große Dichtung, das **Gilgamesch-Epos**.[^wp-alter-orient]

In **Ägypten** wurden Ober- und Unterägypten um 3000 v. Chr. vereint. Die Pharaonen galten als göttlich; die **Cheops-Pyramide** von Gizeh (um 2600–2500 v. Chr.) war rund 3800 Jahre lang das höchste Bauwerk der Welt. Geschrieben wurde in **Hieroglyphen**, die erst 1822 mithilfe des *Steins von Rosette* entziffert wurden. Mit dem Tod **Kleopatras VII.** 30 v. Chr. wurde Ägypten römisch.[^wp-altes-aegypten]`,
    },
    {
      id: 'fact-kleopatra', type: 'callout', tone: 'fact', title: 'Kleopatra lebte näher an uns als an den Pyramiden',
      md: `Zwischen dem Bau der Cheops-Pyramide (um 2560 v. Chr.) und Kleopatra (gest. 30 v. Chr.) liegen rund 2500 Jahre — zwischen Kleopatra und heute nur gut 2050. Die Antike war für die Antike selbst schon uralt.`,
    },
    {
      id: 'griechenland', type: 'text', title: 'Griechenland: Stadtstaaten, Demokratie, Denken',
      md: `
Griechenland war nie ein einheitlicher Staat, sondern eine Welt vieler **[[polis|Poleis]]** (Stadtstaaten) wie Athen, Sparta oder Korinth. Gemeinsam waren Sprache, Götter (Zeus und die Olympier) und Feste — etwa die **Olympischen Spiele**, der Überlieferung nach seit 776 v. Chr.

In **Athen** führte Kleisthenes 508/507 v. Chr. die **[[attische-demokratie|Demokratie]]** ein: Die Volksversammlung entschied direkt. Mitbestimmen durften allerdings nur freie Männer mit Bürgerrecht. Gegen das riesige Perserreich siegten die Griechen bei **Marathon** (490 v. Chr.) und in der Seeschlacht von **Salamis** (480 v. Chr.). Im „perikleischen Zeitalter“ entstand die Akropolis mit dem Parthenon; Theater, Geschichtsschreibung (Herodot) und Philosophie (Sokrates, Platon, Aristoteles) blühten.[^wp-antikes-griechenland]

**Alexander der Große** (356–323 v. Chr.) aus Makedonien eroberte in nur elf Jahren ein Reich bis nach Ägypten und Indien. Nach seinem Tod zerfiel es, aber griechische Sprache und Kultur prägten die Region weiter: der **[[hellenismus|Hellenismus]]**. Alexandria in Ägypten mit seiner berühmten Bibliothek wurde zum geistigen Zentrum der Welt.`,
    },
    {
      id: 'rom', type: 'text', title: 'Rom: vom Stadtstaat zum Weltreich',
      md: `
Der Sage nach gründeten **Romulus und Remus** Rom im Jahr **753 v. Chr.** Nach der Vertreibung der Könige wurde Rom **509 v. Chr.** eine Republik, regiert von Senat und zwei jährlich gewählten Konsuln. In den **Punischen Kriegen** (264–146 v. Chr.) besiegte Rom Karthago — trotz Hannibals Zug mit Elefanten über die Alpen.

Im 1. Jahrhundert v. Chr. zerbrach die Republik in Bürgerkriegen. **Gaius Julius Caesar** eroberte Gallien und machte sich zum Diktator auf Lebenszeit; an den Iden des März (**15. März 44 v. Chr.**) wurde er ermordet. Sein Adoptivsohn **Augustus** wurde **27 v. Chr.** der erste Kaiser. Es folgten rund 200 Jahre relativer Stabilität, die **[[pax-romana|Pax Romana]]**. Unter Trajan erreichte das Reich um **117 n. Chr.** seine größte Ausdehnung — vom Hadrianswall in Britannien bis Mesopotamien.[^wp-roemisches-reich]

Das Christentum, anfangs verfolgt, wurde unter **Konstantin** geduldet (313) und unter Theodosius **380** Staatsreligion. **395** wurde das Reich endgültig geteilt. Das **Weströmische Reich** endete **476**, als der germanische Heerführer Odoaker den letzten Kaiser absetzte. Das **Oströmische Reich** ([[byzanz|Byzanz]]) bestand bis **1453**.`,
    },
    {
      id: 'tl-explore', type: 'viz', viz: 'timeline', title: 'Die Antike auf einen Blick',
      params: { events: [
        { year: -3300, label: 'Keilschrift in Sumer', detail: 'Älteste Schrift der Welt, zuerst für Buchhaltung.' },
        { year: -2560, label: 'Cheops-Pyramide', detail: 'Größte der drei Pyramiden von Gizeh.' },
        { year: -1750, label: 'Codex Hammurapi', detail: 'Babylonische Gesetzessammlung auf einer Steinstele.' },
        { year: -776, label: 'Erste Olympische Spiele', detail: 'Traditionelles Datum; Beginn der griechischen Olympiaden-Zählung.' },
        { year: -508, label: 'Demokratie in Athen', detail: 'Reformen des Kleisthenes.' },
        { year: -323, label: 'Tod Alexanders', detail: 'Beginn des Hellenismus.' },
        { year: -44, label: 'Caesar ermordet', detail: 'Iden des März, 15. März 44 v. Chr.' },
        { year: -27, label: 'Augustus erster Kaiser', detail: 'Beginn der römischen Kaiserzeit.' },
        { year: 476, label: 'Ende Westroms', detail: 'Odoaker setzt Romulus Augustulus ab.' },
      ] },
      caption: 'Beachte die Abstände: Die ägyptische Geschichte allein umfasst fast 3000 Jahre.',
    },
    {
      id: 'tl-game', type: 'game', viz: 'timeline', title: 'Bring die Antike in Reihenfolge',
      params: { mode: 'sort', events: [
        { year: -2560, label: 'Cheops-Pyramide' },
        { year: -1750, label: 'Codex Hammurapi' },
        { year: -753, label: 'Sagenhafte Gründung Roms' },
        { year: -490, label: 'Schlacht bei Marathon' },
        { year: -323, label: 'Tod Alexanders' },
        { year: -44, label: 'Caesar ermordet' },
        { year: 380, label: 'Christentum Staatsreligion' },
        { year: 476, label: 'Ende Westroms' },
      ] },
    },
    {
      id: 'match-orte', type: 'match', title: 'Wer gehört wohin?',
      prompt: 'Ordne die Errungenschaft der Kultur zu.',
      pairs: [
        ['Keilschrift', 'Sumer / Mesopotamien'],
        ['Hieroglyphen', 'Ägypten'],
        ['Demokratie', 'Athen'],
        ['Senat und Konsuln', 'Römische Republik'],
        ['Bibliothek von Alexandria', 'Hellenismus'],
      ],
    },
    {
      id: 'quiz-demokratie', type: 'quiz', title: 'Athens Demokratie',
      question: 'Wer durfte in der attischen Demokratie in der Volksversammlung abstimmen?',
      options: [
        { text: 'Alle Einwohner Athens', correct: false, why: 'Frauen, Sklaven und Zugezogene (Metöken) waren ausgeschlossen.' },
        { text: 'Freie, erwachsene Männer mit athenischem Bürgerrecht', correct: true, why: 'Nur ein Teil der Bevölkerung — nach Schätzungen ein Zehntel bis ein Fünftel.' },
        { text: 'Nur die reichen Adligen', correct: false, why: 'Das war gerade der Unterschied zur Aristokratie: Auch arme Bürger stimmten mit.' },
        { text: 'Ein gewähltes Parlament', correct: false, why: 'Athen hatte eine *direkte* Demokratie; das Volk entschied selbst.' },
      ],
    },
    {
      id: 'num-westrom', type: 'numeric', title: 'Ein Datum, das man kennen sollte',
      question: 'In welchem Jahr endete das Weströmische Reich (n. Chr.)?',
      answer: 476, tolerance: 0,
      hint: 'Ein Jahr im letzten Viertel des 5. Jahrhunderts.',
      explain: '**476**: Odoaker setzte Kaiser Romulus Augustulus ab. Mit diesem Jahr lassen viele Historiker das Mittelalter beginnen — das Oströmische Reich bestand aber noch fast 1000 Jahre.',
    },
    {
      id: 'erbe', type: 'text', title: 'Was von der Antike bleibt',
      md: `
Vieles, was uns selbstverständlich scheint, stammt aus der Antike:

- **Schrift und Alphabet:** Unser lateinisches Alphabet geht über die Griechen auf die Phönizier zurück.
- **Recht:** Das römische Recht, gesammelt im *Corpus iuris civilis*, prägt bis heute das deutsche Bürgerliche Gesetzbuch.
- **Politik und Sprache:** Demokratie, Republik, Senat, Diktator — alles antike Begriffe.
- **Kalender:** Unser Kalender geht auf den *Julianischen Kalender* Caesars zurück; die Monate Juli und August sind nach Caesar und Augustus benannt.
- **Städte:** Köln, Trier, Mainz, Augsburg und Regensburg waren römische Gründungen. Trier gilt als älteste Stadt Deutschlands.`,
    },
    {
      id: 'recall-rom', type: 'recall', title: 'Erkläre den Wandel Roms',
      prompt: 'Rom war erst Königreich, dann Republik, dann Kaiserreich. Beschreibe in 3–4 Sätzen die Übergänge mit ungefähren Jahreszahlen und je einem Namen.',
      answer: `Nach der sagenhaften Gründung **753 v. Chr.** herrschten zunächst Könige. **509 v. Chr.** wurden sie vertrieben; die **Republik** mit Senat und zwei Konsuln entstand. Im 1. Jh. v. Chr. zerbrach sie in Bürgerkriegen — **Caesar** machte sich zum Alleinherrscher und wurde **44 v. Chr.** ermordet. Sein Erbe **Augustus** wurde **27 v. Chr.** erster Kaiser; damit begann die **Kaiserzeit**, die im Westen **476** endete.`,
      hints: ['Die Republik endet mit einem berühmten Mord.', 'Der erste Kaiser gab einem Monat seinen Namen.'],
      cards: ['rom-phasen', 'augustus'],
    },
  ],
  cards: [
    { id: 'hochkultur-fluesse', front: 'An welchen vier Flüssen entstanden die ersten Hochkulturen?', back: 'Euphrat/Tigris (Mesopotamien), Nil (Ägypten), Indus, Gelber Fluss (China).' },
    { id: 'keilschrift', front: 'Wer erfand die Keilschrift — und ungefähr wann?', back: 'Die Sumerer in Mesopotamien, um 3300 v. Chr.' },
    { id: 'hammurapi', front: 'Was ist der Codex Hammurapi?', back: 'Babylonische Gesetzessammlung (um 1750 v. Chr.), bekannt für das Prinzip „Auge um Auge“.' },
    { id: 'cheops', front: 'Wann ungefähr entstand die Cheops-Pyramide?', back: 'Um 2600–2500 v. Chr. (Altes Reich, 4. Dynastie).' },
    { id: 'rosette', front: 'Womit wurden die Hieroglyphen entziffert — und wann?', back: 'Mit dem Stein von Rosette; Champollion entzifferte sie 1822.' },
    { id: 'polis', front: 'Was ist eine Polis?', back: 'Ein griechischer Stadtstaat der Antike (z. B. Athen, Sparta); Wurzel von „Politik“.' },
    { id: 'demokratie-athen', front: 'Wann und durch wen wurde in Athen die Demokratie eingeführt?', back: '508/507 v. Chr. durch die Reformen des Kleisthenes.' },
    { id: 'perser', front: 'Zwei berühmte griechische Siege gegen die Perser?', back: 'Marathon (490 v. Chr.) und die Seeschlacht von Salamis (480 v. Chr.).' },
    { id: 'alexander', front: 'Lebensdaten Alexanders des Großen und die Epoche nach ihm?', back: '356–323 v. Chr.; danach folgt der Hellenismus.' },
    { id: 'rom-gruendung', front: 'Sagenhaftes Gründungsjahr Roms?', back: '753 v. Chr. („sieben-fünf-drei, Rom schlüpft aus dem Ei“).' },
    { id: 'rom-phasen', front: 'Die drei Phasen der römischen Staatsform mit Beginnjahren?', back: 'Königszeit (ab 753 v. Chr.), Republik (ab 509 v. Chr.), Kaiserzeit (ab 27 v. Chr.).' },
    { id: 'caesar', front: 'Wann wurde Caesar ermordet?', back: 'An den Iden des März, 15. März 44 v. Chr.' },
    { id: 'augustus', front: 'Wer war der erste römische Kaiser — ab wann?', back: 'Augustus, ab 27 v. Chr.' },
    { id: 'pax-romana', front: 'Was bedeutet „Pax Romana“?', back: 'Rund 200 Jahre relativer Frieden und Stabilität im Römischen Reich ab Augustus.' },
    { id: 'christentum-rom', front: 'Zwei Etappen des Christentums im Römischen Reich?', back: '313 Duldung unter Konstantin; 380 Staatsreligion unter Theodosius.' },
    { id: 'westrom-ostrom', front: 'Wann endeten West- und Oströmisches Reich?', back: 'Westrom 476, Ostrom (Byzanz) 1453.' },
    { id: 'roemerstaedte', front: 'Nenne drei deutsche Städte römischen Ursprungs.', back: 'z. B. Trier, Köln, Mainz, Augsburg, Regensburg.' },
  ],
};
