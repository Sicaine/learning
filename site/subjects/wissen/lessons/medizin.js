export default {
  id: 'medizin',
  title: 'Medizin & Gesundheit',
  summary: 'Händewaschen, [[impfung|Impfungen]], [[antibiotikum|Antibiotika]], [[roentgenstrahlung|Röntgenstrahlen]]: die Entdeckungen, die unsere Lebenserwartung verdoppelt haben — und die Forscher, oft aus Deutschland, die sie machten.',
  minutes: 22,
  goals: [
    'Die großen Durchbrüche der Medizingeschichte mit Namen und Jahr einordnen',
    '[[bakterien]] und [[viren]] unterscheiden und wissen, wogegen [[antibiotikum|Antibiotika]] helfen',
    'Das Prinzip der [[impfung]] bis zum [[mrna-impfstoff|mRNA-Impfstoff]] erklären',
    'Die Rolle deutscher Mediziner wie Robert Koch, Röntgen und Paul Ehrlich kennen',
  ],
  blocks: [
    {
      id: 'lebenserwartung', type: 'text', title: 'Die große Verdopplung',
      md: `
Um 1870 lag die [Lebenserwartung](wiki:Lebenserwartung|Life expectancy) bei Geburt in Deutschland bei unter 40 Jahren — vor allem, weil so viele Kinder starben. Heute sind es rund 81 Jahre. Den größten Anteil daran haben nicht Hightech-Operationen, sondern **Hygiene, sauberes Wasser, [Impfungen](wiki:Impfung|Vaccination) und [Antibiotika](wiki:Antibiotikum|Antibiotic)**.

Ein frühes Beispiel: Der Arzt **[Ignaz Semmelweis](wiki:Ignaz Semmelweis|Ignaz Semmelweis)** stellte 1847 in [Wien](wiki:Wien|Vienna) fest, dass Wöchnerinnen am [Kindbettfieber](wiki:Kindbettfieber|Postpartum infections) starben, weil Ärzte direkt aus dem Sektionssaal zur Geburt kamen. Händewaschen mit [Chlorkalk](wiki:Chlorkalk) senkte die Sterblichkeit drastisch. Seine Kollegen verspotteten ihn — erst die [Bakteriologie](wiki:Bakteriologie|Bacteriology) gab ihm Jahrzehnte später recht.`,
    },
    {
      id: 'erreger', type: 'text', title: 'Bakterien und Viren: die unsichtbaren Feinde',
      md: `
Dass Krankheiten von Mikroben verursacht werden, setzte sich erst im 19. Jahrhundert durch. Zwei Namen stehen dafür: **[Louis Pasteur](wiki:Louis Pasteur|Louis Pasteur)** in Frankreich ([Pasteurisierung](wiki:Pasteurisieren|Pasteurization), [Tollwut](wiki:Tollwut|Rabies)-Impfung 1885) und **[Robert Koch](wiki:Robert Koch|Robert Koch)** in [Berlin](wiki:Berlin|Berlin). Koch entdeckte **1882 den [Tuberkulose](wiki:Tuberkulose|Tuberculosis)-Erreger** — damals die häufigste Todesursache — und 1883/84 den [Cholera](wiki:Cholera|Cholera)-Erreger; 1905 erhielt er den [Nobelpreis](wiki:Nobelpreis für Physiologie oder Medizin|Nobel Prize in Physiology or Medicine).[^tech-wp-koch] Nach ihm ist das [Robert Koch-Institut](wiki:Robert Koch-Institut|Robert Koch Institute) benannt.

Der Unterschied ist wichtig, auch für die Behandlung:

<table>
<tr><th></th><th>[[bakterien|Bakterien]]</th><th>[[viren|Viren]]</th></tr>
<tr><td>Was?</td><td>eigenständige Einzeller ohne Zellkern</td><td>Erbgut in einer Proteinhülle, ohne eigenen Stoffwechsel</td></tr>
<tr><td>Größe</td><td>ca. 1–5 Mikrometer</td><td>viel kleiner (ca. 20–300 Nanometer)</td></tr>
<tr><td>Vermehrung</td><td>teilen sich selbst</td><td>nur in fremden Zellen</td></tr>
<tr><td>Beispiele</td><td>Tuberkulose, Cholera, [Scharlach](wiki:Scharlach|Scarlet fever), [Borreliose](wiki:Lyme-Borreliose|Lyme disease)</td><td>[Grippe](wiki:Influenza|Influenza), [Erkältung](wiki:Erkältung|Common cold), [Masern](wiki:Masern|Measles), [HIV](wiki:HI-Virus|HIV), [Covid-19](wiki:COVID-19|COVID-19)</td></tr>
<tr><td>Behandlung</td><td><b>[Antibiotika](wiki:Antibiotikum|Antibiotic)</b></td><td>Impfung (Vorbeugung), antivirale Mittel — <b>keine Antibiotika</b></td></tr>
</table>`,
    },
    {
      id: 'quiz-antibiotika', type: 'quiz', title: 'Antibiotikum ja oder nein?',
      question: 'Bei welchen Krankheiten kann ein Antibiotikum grundsätzlich helfen?',
      options: [
        { text: 'Grippe (Influenza)', correct: false, why: 'Grippe wird von Viren verursacht — Antibiotika wirken nicht.' },
        { text: 'Tuberkulose', correct: true, why: 'Bakteriell ([Mycobacterium tuberculosis](wiki:Mycobacterium tuberculosis|Mycobacterium tuberculosis)); behandelt mit einer Kombination von Antibiotika.' },
        { text: 'Gewöhnliche Erkältung', correct: false, why: 'Meist [Rhinoviren](wiki:Rhinoviren|Rhinovirus). Antibiotika helfen nicht, fördern aber Resistenzen.' },
        { text: 'Bakterielle Lungenentzündung', correct: true, why: 'Genau dafür wurden Antibiotika zum Lebensretter.' },
        { text: 'Covid-19', correct: false, why: 'Virale Erkrankung (Coronavirus [SARS-CoV-2](wiki:SARS-CoV-2|SARS-CoV-2)).' },
      ],
    },
    {
      id: 'penicillin', type: 'text', title: 'Penicillin: ein glücklicher Zufall',
      md: `
Im September **1928** kehrte der schottische Bakteriologe **[Alexander Fleming](wiki:Alexander Fleming|Alexander Fleming)** aus dem Urlaub in sein Londoner Labor zurück und bemerkte: Auf einer Bakterienkultur hatte sich ein [Schimmelpilz](wiki:Schimmelpilze|Mold) ausgebreitet — und um ihn herum waren die Bakterien abgestorben.[^tech-wp-fleming] Der Pilz produzierte einen Stoff, den Fleming **[Penicillin](wiki:Penicillin|Penicillin)** nannte, das erste [[antibiotikum]].

Zur Massenproduktion brachten es erst [Howard Florey](wiki:Howard Florey|Howard Florey) und [Ernst Chain](wiki:Ernst Boris Chain|Ernst Chain) während des Zweiten Weltkriegs; alle drei erhielten 1945 den [Nobelpreis](wiki:Nobelpreis für Physiologie oder Medizin|Nobel Prize in Physiology or Medicine). Plötzlich waren Wundinfektionen, [Lungenentzündung](wiki:Lungenentzündung|Pneumonia) und [Syphilis](wiki:Syphilis|Syphilis) heilbar.

Heute droht die **[Antibiotikaresistenz](wiki:Antibiotikaresistenz|Antimicrobial resistance)**: Durch zu häufigen und falschen Einsatz (auch in der Tiermast) überleben unempfindliche Bakterien und vermehren sich — natürliche Selektion im Zeitraffer. Schon vor Penicillin hatte der Deutsche **[Paul Ehrlich](wiki:Paul Ehrlich|Paul Ehrlich)** 1910 mit [Salvarsan](wiki:Salvarsan|Arsphenamine) gegen Syphilis das Prinzip der gezielten [Chemotherapie](wiki:Chemotherapie|Chemotherapy) begründet („Zauberkugel“).`,
    },
    {
      id: 'impfung', type: 'text', title: 'Impfen: vom Kuhstall zur mRNA',
      md: `
Die [Pocken](wiki:Pocken|Smallpox) töteten über Jahrhunderte Hunderte Millionen Menschen. Der englische Landarzt **[Edward Jenner](wiki:Edward Jenner|Edward Jenner)** beobachtete, dass Melkerinnen, die sich mit harmlosen [Kuhpocken](wiki:Kuhpocken|Cowpox) angesteckt hatten, nicht an den echten Pocken erkrankten. **1796** übertrug er Kuhpocken-Material auf einen Jungen — und machte ihn damit immun.[^tech-wp-jenner] Von lateinisch *vacca* (Kuh) stammt das Wort **[Vakzine](wiki:Impfstoff|Vaccine)**.

Das Prinzip jeder [[impfung]]: Das [[immunsystem]] lernt an einem harmlosen „Steckbrief“ des Erregers und bildet Gedächtniszellen. Dank weltweiter Impfkampagnen erklärte die [WHO](wiki:Weltgesundheitsorganisation|World Health Organization) die **Pocken 1980 für ausgerottet** — die erste und bislang einzige ausgerottete menschliche Infektionskrankheit.[^tech-wp-pocken]

Die jüngste Revolution sind **[[mrna-impfstoff|mRNA-Impfstoffe]]**: Sie liefern nur den Bauplan eines Erregerproteins, die Körperzellen stellen es kurz selbst her. Der [Covid-19](wiki:COVID-19|COVID-19)-Impfstoff des Mainzer Unternehmens **[BioNTech](wiki:BioNTech|BioNTech)** (gegründet von [Uğur Şahin](wiki:Uğur Şahin|Uğur Şahin) und [Özlem Türeci](wiki:Özlem Türeci|Özlem Türeci), mit [Pfizer](wiki:Pfizer|Pfizer)) wurde im Dezember 2020 als erster mRNA-Impfstoff zugelassen — weniger als ein Jahr nach Bekanntwerden des Virus.[^tech-wp-biontech] Die Grundlagenforscher **[Katalin Karikó](wiki:Katalin Karikó|Katalin Karikó)** und **[Drew Weissman](wiki:Drew Weissman|Drew Weissman)** erhielten 2023 den [Medizin-Nobelpreis](wiki:Nobelpreis für Physiologie oder Medizin|Nobel Prize in Physiology or Medicine).`,
    },
    {
      id: 'map-medizin', type: 'map', title: 'Orte der Medizingeschichte in Europa',
      view: [-3.5, 45.2, 18.5, 54.0],
      layers: { cities: false, mountains: false },
      places: [
        { name: 'Wien', pos: 'r', detail: 'In [Wien](wiki:Wien|Vienna) erkannte [Ignaz Semmelweis](wiki:Ignaz Semmelweis|Ignaz Semmelweis) 1847, dass Händewaschen das Kindbettfieber verhindert.' },
        { name: 'Berlin', pos: 'r', detail: 'In [Berlin](wiki:Berlin|Berlin) entdeckte [Robert Koch](wiki:Robert Koch|Robert Koch) 1882 den Tuberkulose-Erreger.' },
        { name: 'Würzburg', pos: 'r', detail: 'In [Würzburg](wiki:Würzburg|Würzburg) entdeckte [Wilhelm Conrad Röntgen](wiki:Wilhelm Conrad Röntgen|Wilhelm Röntgen) am 8. November 1895 die X-Strahlen.' },
        { name: 'London', pos: 'l', detail: 'In [London](wiki:London|London) bemerkte [Alexander Fleming](wiki:Alexander Fleming|Alexander Fleming) 1928 die Wirkung des Penicillins.' },
        { name: 'Paris', pos: 'l', detail: 'In [Paris](wiki:Paris|Paris) wirkte [Louis Pasteur](wiki:Louis Pasteur|Louis Pasteur); 1885 impfte er erstmals einen Menschen gegen Tollwut.' },
        { name: 'Mainz', pos: 'l', detail: 'In [Mainz](wiki:Mainz|Mainz) sitzt [BioNTech](wiki:BioNTech|BioNTech), das 2020 den ersten zugelassenen mRNA-Impfstoff entwickelte.' },
      ],
      caption: 'Sechs Städte, sechs Durchbrüche. Tippe auf eine Stadt.',
    },
    {
      id: 'match-medizin', type: 'match', title: 'Wer entdeckte was?',
      pairs: [['Edward Jenner', 'Pockenimpfung (1796)'], ['Robert Koch', 'Tuberkulose-Erreger (1882)'], ['Alexander Fleming', 'Penicillin (1928)'], ['Wilhelm Conrad Röntgen', 'X-Strahlen (1895)'], ['Ignaz Semmelweis', 'Händedesinfektion gegen Kindbettfieber'], ['Karl Landsteiner', 'Blutgruppen (1901)']],
    },
    {
      id: 'roentgen', type: 'text', title: 'Blick in den Körper',
      md: `
Am **8. November 1895** experimentierte **[Wilhelm Conrad Röntgen](wiki:Wilhelm Conrad Röntgen|Wilhelm Röntgen)** in [Würzburg](wiki:Würzburg|Würzburg) mit [Kathodenstrahlröhren](wiki:Kathodenstrahlröhre|Cathode ray tube) und entdeckte eine unsichtbare Strahlung, die Papier, Holz und Haut durchdrang — er nannte sie **[X-Strahlen](wiki:Röntgenstrahlung|X-ray)**.[^tech-wp-roentgen] Das Bild der Hand seiner Frau Anna Bertha mit Ehering ging um die Welt. Röntgen verzichtete auf ein Patent, damit alle die Entdeckung nutzen konnten, und erhielt **1901 den allerersten [Nobelpreis für Physik](wiki:Nobelpreis für Physik|Nobel Prize in Physics)**.

Weitere Meilensteine der Medizin, die man kennen sollte:

- **1846:** erste öffentliche Operation unter **[Äthernarkose](wiki:Äthernarkose|Diethyl ether)** ([Boston](wiki:Boston|Boston)) — Chirurgie ohne Schmerzen.
- **1897:** [Felix Hoffmann](wiki:Felix Hoffmann (Chemiker)|Felix Hoffmann) synthetisiert bei **[Bayer](wiki:Bayer AG|Bayer)** reine [Acetylsalicylsäure](wiki:Acetylsalicylsäure|Aspirin), 1899 als **Aspirin** auf dem Markt.
- **1921/22:** Entdeckung und erste Anwendung von **[Insulin](wiki:Insulin|Insulin)** gegen [Diabetes](wiki:Diabetes mellitus|Diabetes) ([Banting](wiki:Frederick Banting|Frederick Banting), Best).
- **1967:** erste Herztransplantation durch **[Christiaan Barnard](wiki:Christiaan Barnard|Christiaan Barnard)** in [Kapstadt](wiki:Kapstadt|Cape Town).
- **2008:** Nobelpreis für den Deutschen **[Harald zur Hausen](wiki:Harald zur Hausen|Harald zur Hausen)**: [Humane Papillomviren](wiki:Humane Papillomviren|Human papillomavirus infection) verursachen [Gebärmutterhalskrebs](wiki:Gebärmutterhalskrebs|Cervical cancer) — heute gibt es eine Impfung dagegen.`,
    },
    {
      id: 'map-medizin-quiz', type: 'map', title: 'Wo geschah der Durchbruch?',
      view: [-3.5, 45.2, 18.5, 54.0],
      layers: { cities: false, mountains: false },
      quiz: { rounds: 6 },
      places: [
        { name: 'Wien', label: 'Händedesinfektion (Semmelweis)' },
        { name: 'Berlin', label: 'Tuberkulose-Erreger (Koch)' },
        { name: 'Würzburg', label: 'Röntgenstrahlen' },
        { name: 'London', label: 'Penicillin (Fleming)' },
        { name: 'Paris', label: 'Tollwut-Impfung (Pasteur)' },
        { name: 'Mainz', label: 'Erster mRNA-Impfstoff (BioNTech)' },
      ],
    },
    {
      id: 'timeline-med', type: 'game', viz: 'timeline', title: 'Medizingeschichte ordnen',
      params: {
        mode: 'sort',
        events: [
          { year: 1796, label: 'Jenners Pockenimpfung' },
          { year: 1846, label: 'Äthernarkose' },
          { year: 1882, label: 'Koch: Tuberkulose' },
          { year: 1895, label: 'Röntgenstrahlen' },
          { year: 1928, label: 'Penicillin' },
          { year: 1967, label: 'Erste Herztransplantation' },
          { year: 1980, label: 'Pocken ausgerottet' },
          { year: 2020, label: 'mRNA-Impfstoff' },
        ],
      },
    },
    {
      id: 'calc-lebenserwartung', type: 'numeric', title: 'Gewonnene Jahre',
      question: 'Die Lebenserwartung stieg von rund **37 Jahren** (um 1870) auf rund **81 Jahre** (heute). Um wie viel **Prozent** ist sie gestiegen? (Auf ganze Prozent gerundet.)',
      answer: 119, tolerance: 1, unit: '%',
      hint: '(81 − 37) ÷ 37.',
      explain: '44 ÷ 37 ≈ 1,19 → rund **119 %**, also mehr als eine Verdopplung. Hauptgrund: Die Kindersterblichkeit sank dramatisch.',
    },
    {
      id: 'fact-roentgen', type: 'callout', tone: 'fact', title: '„X-rays“ oder „Röntgen“?',
      md: `Nur im Deutschen und einigen weiteren Sprachen (z. B. Niederländisch, Russisch, den skandinavischen Sprachen) heißen die Strahlen nach ihrem Entdecker. Röntgen selbst nannte sie bescheiden „X-Strahlen“ — X für das Unbekannte. Im Englischen ist *X-rays* bis heute geblieben. Außerdem trägt das chemische Element 111 seinen Namen: **[Roentgenium](wiki:Roentgenium|Roentgenium)**.`,
    },
    {
      id: 'recall-resistenz', type: 'recall', title: 'Erkläre den Rat des Arztes',
      prompt: 'Warum verschreiben Ärzte bei einer Erkältung kein Antibiotikum, und warum ist unnötiger [Antibiotika](wiki:Antibiotikum|Antibiotic)-Einsatz sogar gefährlich?',
      answer: `[Erkältungen](wiki:Erkältung|Common cold) werden fast immer von **[Viren](wiki:Viren|Virus)** verursacht; Antibiotika wirken aber nur gegen **[Bakterien](wiki:Bakterien|Bacteria)** — sie würden also nicht helfen. Jeder Antibiotika-Einsatz tötet empfindliche Bakterien im Körper, während zufällig unempfindliche überleben und sich vermehren (**[Selektion](wiki:Natürliche Selektion)**). So entstehen und verbreiten sich **resistente Bakterien**, gegen die die Mittel dann auch bei gefährlichen Infektionen nicht mehr wirken. Deshalb gilt: Antibiotika nur bei bakteriellen Infektionen und genau nach Anweisung.`,
      hints: ['Welche Erreger verursachen Erkältungen?', 'Was passiert mit den Bakterien, die ein Antibiotikum überleben?'],
      cards: ['resistenz'],
    },
  ],
  cards: [
    { id: 'semmelweis', front: 'Ignaz Semmelweis', back: 'Führte 1847 in Wien Händedesinfektion ein und senkte die Sterblichkeit am Kindbettfieber drastisch.' },
    { id: 'koch', front: 'Robert Koch entdeckte 1882 …', back: '… den Tuberkulose-Erreger (später auch den Cholera-Erreger); Nobelpreis 1905.' },
    { id: 'pasteur', front: 'Louis Pasteur', back: 'Französischer Mikrobiologe: Pasteurisierung, Tollwut-Impfung (1885).' },
    { id: 'bakt-viren', front: 'Wichtigster praktischer Unterschied zwischen Bakterien und Viren', back: 'Gegen Bakterien helfen Antibiotika, gegen Viren nicht. Viren vermehren sich nur in fremden Zellen.' },
    { id: 'fleming', front: 'Wer entdeckte wann das Penicillin?', back: 'Alexander Fleming, 1928 in London (durch einen Schimmelpilz auf einer Bakterienkultur).' },
    { id: 'resistenz', front: 'Wie entsteht Antibiotikaresistenz?', back: 'Durch Selektion: Unempfindliche Bakterien überleben den Antibiotika-Einsatz und vermehren sich — verstärkt durch unnötigen Gebrauch.' },
    { id: 'ehrlich', front: 'Paul Ehrlich', back: 'Deutscher Mediziner, begründete die Chemotherapie (Salvarsan gegen Syphilis, 1910), Nobelpreis 1908 (Immunologie).' },
    { id: 'jenner', front: 'Erste Impfung', back: 'Edward Jenner 1796: Kuhpocken schützen vor Pocken („Vakzine“ von lat. *vacca*, Kuh).' },
    { id: 'pocken', front: 'Welche Krankheit wurde als bislang einzige menschliche Infektionskrankheit ausgerottet — und wann?', back: 'Die Pocken, von der WHO 1980 für ausgerottet erklärt.' },
    { id: 'mrna', front: 'Wie funktioniert ein mRNA-Impfstoff?', back: 'Er liefert den Bauplan eines Erregerproteins; die Körperzellen bilden es kurz, das Immunsystem lernt es zu erkennen.' },
    { id: 'biontech', front: 'BioNTech', back: 'Mainzer Unternehmen (Uğur Şahin, Özlem Türeci); mit Pfizer erster zugelassener mRNA-Impfstoff (Covid-19, Dezember 2020).' },
    { id: 'kariko', front: 'Medizin-Nobelpreis 2023', back: 'Katalin Karikó und Drew Weissman für die Grundlagen der mRNA-Impfstoffe.' },
    { id: 'roentgen', front: 'Entdeckung der Röntgenstrahlen', back: 'Wilhelm Conrad Röntgen, 8. November 1895 in Würzburg; erster Physik-Nobelpreis 1901.' },
    { id: 'narkose', front: 'Erste öffentliche Operation unter Narkose', back: '1846 in Boston, mit Äther.' },
    { id: 'aspirin', front: 'Woher stammt Aspirin?', back: 'Von Bayer: Felix Hoffmann synthetisierte 1897 reine Acetylsalicylsäure, 1899 kam Aspirin auf den Markt.' },
    { id: 'insulin', front: 'Wann wurde Insulin entdeckt?', back: '1921/22 (Banting und Best) — Diabetes wurde behandelbar.' },
    { id: 'herz', front: 'Erste Herztransplantation', back: '1967 durch Christiaan Barnard in Kapstadt.' },
    { id: 'lebenserwartung', front: 'Lebenserwartung in Deutschland um 1870 und heute', back: 'Unter 40 Jahre damals, rund 81 Jahre heute — vor allem dank Hygiene, Impfungen, Antibiotika und geringerer Kindersterblichkeit.' },
  ],
};
