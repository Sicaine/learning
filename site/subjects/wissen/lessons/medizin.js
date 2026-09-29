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
Um 1870 lag die Lebenserwartung bei Geburt in Deutschland bei unter 40 Jahren — vor allem, weil so viele Kinder starben. Heute sind es rund 81 Jahre. Den größten Anteil daran haben nicht Hightech-Operationen, sondern **Hygiene, sauberes Wasser, Impfungen und Antibiotika**.

Ein frühes Beispiel: Der Arzt **Ignaz Semmelweis** stellte 1847 in Wien fest, dass Wöchnerinnen am Kindbettfieber starben, weil Ärzte direkt aus dem Sektionssaal zur Geburt kamen. Händewaschen mit Chlorkalk senkte die Sterblichkeit drastisch. Seine Kollegen verspotteten ihn — erst die Bakteriologie gab ihm Jahrzehnte später recht.`,
    },
    {
      id: 'erreger', type: 'text', title: 'Bakterien und Viren: die unsichtbaren Feinde',
      md: `
Dass Krankheiten von Mikroben verursacht werden, setzte sich erst im 19. Jahrhundert durch. Zwei Namen stehen dafür: **Louis Pasteur** in Frankreich (Pasteurisierung, Tollwut-Impfung 1885) und **Robert Koch** in Berlin. Koch entdeckte **1882 den Tuberkulose-Erreger** — damals die häufigste Todesursache — und 1883/84 den Cholera-Erreger; 1905 erhielt er den Nobelpreis.[^tech-wp-koch] Nach ihm ist das Robert Koch-Institut benannt.

Der Unterschied ist wichtig, auch für die Behandlung:

<table>
<tr><th></th><th>[[bakterien|Bakterien]]</th><th>[[viren|Viren]]</th></tr>
<tr><td>Was?</td><td>eigenständige Einzeller ohne Zellkern</td><td>Erbgut in einer Proteinhülle, ohne eigenen Stoffwechsel</td></tr>
<tr><td>Größe</td><td>ca. 1–5 Mikrometer</td><td>viel kleiner (ca. 20–300 Nanometer)</td></tr>
<tr><td>Vermehrung</td><td>teilen sich selbst</td><td>nur in fremden Zellen</td></tr>
<tr><td>Beispiele</td><td>Tuberkulose, Cholera, Scharlach, Borreliose</td><td>Grippe, Erkältung, Masern, HIV, Covid-19</td></tr>
<tr><td>Behandlung</td><td><b>Antibiotika</b></td><td>Impfung (Vorbeugung), antivirale Mittel — <b>keine Antibiotika</b></td></tr>
</table>`,
    },
    {
      id: 'quiz-antibiotika', type: 'quiz', title: 'Antibiotikum ja oder nein?',
      question: 'Bei welchen Krankheiten kann ein Antibiotikum grundsätzlich helfen?',
      options: [
        { text: 'Grippe (Influenza)', correct: false, why: 'Grippe wird von Viren verursacht — Antibiotika wirken nicht.' },
        { text: 'Tuberkulose', correct: true, why: 'Bakteriell (Mycobacterium tuberculosis); behandelt mit einer Kombination von Antibiotika.' },
        { text: 'Gewöhnliche Erkältung', correct: false, why: 'Meist Rhinoviren. Antibiotika helfen nicht, fördern aber Resistenzen.' },
        { text: 'Bakterielle Lungenentzündung', correct: true, why: 'Genau dafür wurden Antibiotika zum Lebensretter.' },
        { text: 'Covid-19', correct: false, why: 'Virale Erkrankung (Coronavirus SARS-CoV-2).' },
      ],
    },
    {
      id: 'penicillin', type: 'text', title: 'Penicillin: ein glücklicher Zufall',
      md: `
Im September **1928** kehrte der schottische Bakteriologe **Alexander Fleming** aus dem Urlaub in sein Londoner Labor zurück und bemerkte: Auf einer Bakterienkultur hatte sich ein Schimmelpilz ausgebreitet — und um ihn herum waren die Bakterien abgestorben.[^tech-wp-fleming] Der Pilz produzierte einen Stoff, den Fleming **Penicillin** nannte, das erste [[antibiotikum]].

Zur Massenproduktion brachten es erst Howard Florey und Ernst Chain während des Zweiten Weltkriegs; alle drei erhielten 1945 den Nobelpreis. Plötzlich waren Wundinfektionen, Lungenentzündung und Syphilis heilbar.

Heute droht die **Antibiotikaresistenz**: Durch zu häufigen und falschen Einsatz (auch in der Tiermast) überleben unempfindliche Bakterien und vermehren sich — natürliche Selektion im Zeitraffer. Schon vor Penicillin hatte der Deutsche **Paul Ehrlich** 1910 mit Salvarsan gegen Syphilis das Prinzip der gezielten Chemotherapie begründet („Zauberkugel“).`,
    },
    {
      id: 'impfung', type: 'text', title: 'Impfen: vom Kuhstall zur mRNA',
      md: `
Die Pocken töteten über Jahrhunderte Hunderte Millionen Menschen. Der englische Landarzt **Edward Jenner** beobachtete, dass Melkerinnen, die sich mit harmlosen Kuhpocken angesteckt hatten, nicht an den echten Pocken erkrankten. **1796** übertrug er Kuhpocken-Material auf einen Jungen — und machte ihn damit immun.[^tech-wp-jenner] Von lateinisch *vacca* (Kuh) stammt das Wort **Vakzine**.

Das Prinzip jeder [[impfung]]: Das [[immunsystem]] lernt an einem harmlosen „Steckbrief“ des Erregers und bildet Gedächtniszellen. Dank weltweiter Impfkampagnen erklärte die WHO die **Pocken 1980 für ausgerottet** — die erste und bislang einzige ausgerottete menschliche Infektionskrankheit.[^tech-wp-pocken]

Die jüngste Revolution sind **[[mrna-impfstoff|mRNA-Impfstoffe]]**: Sie liefern nur den Bauplan eines Erregerproteins, die Körperzellen stellen es kurz selbst her. Der Covid-19-Impfstoff des Mainzer Unternehmens **BioNTech** (gegründet von Uğur Şahin und Özlem Türeci, mit Pfizer) wurde im Dezember 2020 als erster mRNA-Impfstoff zugelassen — weniger als ein Jahr nach Bekanntwerden des Virus.[^tech-wp-biontech] Die Grundlagenforscher **Katalin Karikó** und **Drew Weissman** erhielten 2023 den Medizin-Nobelpreis.`,
    },
    {
      id: 'match-medizin', type: 'match', title: 'Wer entdeckte was?',
      pairs: [['Edward Jenner', 'Pockenimpfung (1796)'], ['Robert Koch', 'Tuberkulose-Erreger (1882)'], ['Alexander Fleming', 'Penicillin (1928)'], ['Wilhelm Conrad Röntgen', 'X-Strahlen (1895)'], ['Ignaz Semmelweis', 'Händedesinfektion gegen Kindbettfieber'], ['Karl Landsteiner', 'Blutgruppen (1901)']],
    },
    {
      id: 'roentgen', type: 'text', title: 'Blick in den Körper',
      md: `
Am **8. November 1895** experimentierte **Wilhelm Conrad Röntgen** in Würzburg mit Kathodenstrahlröhren und entdeckte eine unsichtbare Strahlung, die Papier, Holz und Haut durchdrang — er nannte sie **X-Strahlen**.[^tech-wp-roentgen] Das Bild der Hand seiner Frau Anna Bertha mit Ehering ging um die Welt. Röntgen verzichtete auf ein Patent, damit alle die Entdeckung nutzen konnten, und erhielt **1901 den allerersten Nobelpreis für Physik**.

Weitere Meilensteine der Medizin, die man kennen sollte:

- **1846:** erste öffentliche Operation unter **Äthernarkose** (Boston) — Chirurgie ohne Schmerzen.
- **1897:** Felix Hoffmann synthetisiert bei **Bayer** reine Acetylsalicylsäure, 1899 als **Aspirin** auf dem Markt.
- **1921/22:** Entdeckung und erste Anwendung von **Insulin** gegen Diabetes (Banting, Best).
- **1967:** erste Herztransplantation durch **Christiaan Barnard** in Kapstadt.
- **2008:** Nobelpreis für den Deutschen **Harald zur Hausen**: Humane Papillomviren verursachen Gebärmutterhalskrebs — heute gibt es eine Impfung dagegen.`,
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
      md: `Nur im Deutschen und einigen weiteren Sprachen (z. B. Niederländisch, Russisch, den skandinavischen Sprachen) heißen die Strahlen nach ihrem Entdecker. Röntgen selbst nannte sie bescheiden „X-Strahlen“ — X für das Unbekannte. Im Englischen ist *X-rays* bis heute geblieben. Außerdem trägt das chemische Element 111 seinen Namen: **Roentgenium**.`,
    },
    {
      id: 'recall-resistenz', type: 'recall', title: 'Erkläre den Rat des Arztes',
      prompt: 'Warum verschreiben Ärzte bei einer Erkältung kein Antibiotikum, und warum ist unnötiger Antibiotika-Einsatz sogar gefährlich?',
      answer: `Erkältungen werden fast immer von **Viren** verursacht; Antibiotika wirken aber nur gegen **Bakterien** — sie würden also nicht helfen. Jeder Antibiotika-Einsatz tötet empfindliche Bakterien im Körper, während zufällig unempfindliche überleben und sich vermehren (**Selektion**). So entstehen und verbreiten sich **resistente Bakterien**, gegen die die Mittel dann auch bei gefährlichen Infektionen nicht mehr wirken. Deshalb gilt: Antibiotika nur bei bakteriellen Infektionen und genau nach Anweisung.`,
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
