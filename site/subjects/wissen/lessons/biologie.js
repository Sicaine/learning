export default {
  id: 'biologie',
  title: 'Biologie: Zelle, Evolution, DNA',
  summary: 'Drei Ideen erklären fast die ganze Biologie: Alles Leben besteht aus [[zelle|Zellen]], es hat sich durch [[evolution]] entwickelt, und seine Bauanleitung steht in der [[dna]].',
  minutes: 22,
  goals: [
    'Den Aufbau von [[zelle|Zellen]] beschreiben und Pro- von Eukaryoten unterscheiden',
    'Darwins Theorie der [[evolution]] durch natürliche Selektion korrekt erklären',
    'Die [[mendelsche-regeln|Mendelschen Regeln]], [[dna]] und [[chromosom|Chromosomen]] einordnen',
    '[[photosynthese]] und [[oekosystem|Ökosysteme]] als Grundlage allen Lebens verstehen',
  ],
  blocks: [
    {
      id: 'zelle', type: 'text', title: 'Die Zelle: kleinste Einheit des Lebens',
      md: `
[Robert Hooke](wiki:Robert Hooke|Robert Hooke) sah 1665 durchs [Mikroskop](wiki:Mikroskop|Microscope) in Kork winzige Kammern und nannte sie *cells*. Die **[Zelltheorie](wiki:Zelltheorie|Cell theory)** formulierten 1838/39 die Deutschen [Matthias Schleiden](wiki:Matthias Jacob Schleiden|Matthias Jakob Schleiden) (Pflanzen) und [Theodor Schwann](wiki:Theodor Schwann|Theodor Schwann) (Tiere): Alle Lebewesen bestehen aus [[zelle|Zellen]]. [Rudolf Virchow](wiki:Rudolf Virchow|Rudolf Virchow) ergänzte 1855: *Omnis cellula e cellula* — jede Zelle entsteht aus einer Zelle.[^nat-wp-zelle]

Zwei große Zelltypen:

- **[Prokaryoten](wiki:Prokaryoten|Prokaryote)** — ohne [Zellkern](wiki:Zellkern|Cell nucleus): [Bakterien](wiki:Bakterien|Bacteria). Winzig, einfach, aber ungeheuer erfolgreich.
- **[Eukaryoten](wiki:Eukaryoten|Eukaryote)** — mit Zellkern: Tiere, Pflanzen, Pilze.

Wichtige Bestandteile einer Tier- bzw. Pflanzenzelle:

<table>
<tr><th>Bestandteil</th><th>Aufgabe</th></tr>
<tr><td>Zellkern</td><td>enthält die Erbinformation ([DNA](wiki:Desoxyribonukleinsäure|DNA))</td></tr>
<tr><td>[[mitochondrium|Mitochondrien]]</td><td>„Kraftwerke“: [Zellatmung](wiki:Zellatmung|Cellular respiration), Energie in Form von [ATP](wiki:Adenosintriphosphat|Adenosine triphosphate)</td></tr>
<tr><td>[Zellmembran](wiki:Biomembran|Biological membrane)</td><td>Hülle, kontrolliert, was hinein- und hinausgeht</td></tr>
<tr><td>[Chloroplasten](wiki:Chloroplast|Chloroplast) (nur Pflanzen)</td><td>[[photosynthese]]</td></tr>
<tr><td>[Zellwand](wiki:Zellwand|Cell wall) (Pflanzen, Pilze, Bakterien)</td><td>feste Stützhülle</td></tr>
</table>

Ein Mensch besteht aus rund 30 bis 40 Billionen Zellen — und beherbergt mindestens ebenso viele Bakterien.`,
    },
    {
      id: 'match-zelle', type: 'match', title: 'Zellteile und ihre Aufgaben',
      pairs: [['Zellkern', 'Speichert die Erbinformation'], ['Mitochondrium', 'Gewinnt Energie (Zellatmung)'], ['Chloroplast', 'Betreibt Photosynthese'], ['Zellmembran', 'Kontrolliert den Stoffaustausch'], ['Zellwand', 'Gibt Pflanzenzellen Festigkeit']],
    },
    {
      id: 'evolution', type: 'text', title: 'Darwin und die Evolution',
      md: `
**[Charles Darwin](wiki:Charles Darwin|Charles Darwin)** umsegelte 1831–1836 auf der *[HMS Beagle](wiki:HMS Beagle|List of ships named HMS Beagle)* die Welt. Auf den [Galápagos-Inseln](wiki:Galápagos-Inseln|Galápagos Islands) fielen ihm [Finken](wiki:Darwinfinken|Darwin's finches) auf, deren Schnäbel je nach Insel an unterschiedliche Nahrung angepasst waren.[^nat-wp-darwin] Über 20 Jahre später, **1859**, erschien sein Buch *[Über die Entstehung der Arten](wiki:Über die Entstehung der Arten|On the Origin of Species)*. Die Kernidee der [[evolution]] durch **[natürliche Selektion](wiki:Natürliche Selektion)** in drei Schritten:

1. **Variation:** Individuen einer Art unterscheiden sich.
2. **Vererbung:** Ein Teil der Unterschiede wird an die Nachkommen weitergegeben.
3. **Selektion:** Wer besser an seine Umwelt angepasst ist, überlebt eher und hat mehr Nachkommen — seine Merkmale werden häufiger.

Über viele Generationen entstehen so neue Arten. [Alfred Russel Wallace](wiki:Alfred Russel Wallace|Alfred Russel Wallace) kam unabhängig zum selben Schluss; beide stellten die Theorie 1858 gemeinsam vor.

Wichtig: Evolution hat **kein Ziel**, und der Mensch „stammt nicht vom Affen ab“ — Menschen und [Schimpansen](wiki:Schimpansen|Pan (genus)) haben **gemeinsame Vorfahren**, die vor etwa 6 bis 7 Millionen Jahren lebten. *[Survival of the fittest](wiki:Survival of the Fittest|Survival of the fittest)* (ein Ausdruck von [Herbert Spencer](wiki:Herbert Spencer|Herbert Spencer)) meint nicht die Stärksten, sondern die am besten *Passenden*.`,
    },
    {
      id: 'map-darwin', type: 'map', title: 'Darwins Weltreise mit der Beagle (1831–1836)',
      view: [-180, -58, 180, 72],
      layers: { seaLabels: false, countryLabels: false, rivers: false, mountains: false, cities: false },
      lines: [
        { color: '#b45309', detail: 'Die braune Linie ist die Route der Beagle: zuerst nach Westen über den Atlantik, dann um Südamerika, quer durch den Pazifik und über Australien und Südafrika zurück nach England.', coords: [[-4.136,50.372],[-14,30],[-23.517,14.917],[-33,-4],[-38.5,-13],[-38,-17],[-39.5,-21.5],[-41.5,-23.6],[-43.196,-22.908],[-46.5,-28],[-50,-33.5],[-56.167,-34.867],[-59.524,-51.796],[-68.603,-54.102],[-67.3,-55.9],[-75,-52.5],[-76,-45],[-73.5,-37],[-71.62,-33.05],[-90.521,-0.537],[-149.454,-17.677],[-180,-27]],
          detail: 'Von Plymouth über Südamerika und die Pazifikinseln: die erste Hälfte der Reise.' },
        { color: '#b45309', arrow: true, coords: [[180,-27],[174.167,-35.183],[151.208,-33.869],[147.317,-42.867],[117.9,-35.0],[96.859,-12.16],[57.55,-20.283],[50,-27.5],[30,-35.5],[18.417,-33.923],[-5.7,-15.95],[-31,-5],[-30,10],[-28.017,38.628],[-5.063,50.15]] },
      ],
      points: [
        { lon: -4.136, lat: 50.372, num: 1, label: 'Plymouth · Falmouth', pos: 'l', detail: 'Start und Ziel der Reise liegen fast nebeneinander. Hier begann sie: Die **[HMS Beagle](wiki:HMS Beagle|HMS Beagle)** lief am 27. Dezember 1831 aus; Kapitän war [Robert FitzRoy](wiki:Robert FitzRoy|Robert FitzRoy), der junge [Charles Darwin](wiki:Charles Darwin|Charles Darwin) kam als Naturforscher mit. Am 2. Oktober 1836 endete sie nach fast fünf Jahren in [Falmouth](wiki:Falmouth (Cornwall)|Falmouth, Cornwall).' },
        { lon: -43.196, lat: -22.908, num: 2, label: 'Rio de Janeiro', pos: 'r', detail: 'In Brasilien erlebte Darwin 1832 erstmals den tropischen Regenwald — und sammelte Tiere, Pflanzen und Fossilien.' },
        { lon: -68.603, lat: -54.102, num: 3, label: 'Feuerland', pos: 'r', detail: 'Am Südende Südamerikas lag [Feuerland](wiki:Feuerland|Tierra del Fuego); die Umrundung von Kap Hoorn war eine der härtesten Etappen.' },
        { lon: -71.62, lat: -33.05, num: 4, label: 'Valparaíso', pos: 'l', detail: 'Von [Valparaíso](wiki:Valparaíso|Valparaíso) aus erkundete Darwin die Anden und fand dort versteinerte Meeresmuscheln — Hinweis darauf, dass sich Land heben kann.' },
        { lon: -90.521, lat: -0.537, num: 5, label: 'Galápagos', pos: 'r', detail: 'Im Herbst 1835 besuchte die Beagle die **[Galápagos-Inseln](wiki:Galápagos-Inseln|Galápagos Islands)**. Spottdrosseln und [Darwinfinken](wiki:Darwinfinken|Darwin\'s finches) wurden später zu wichtigen Hinweisen darauf, dass sich Arten verändern.' },
        { lon: -149.454, lat: -17.677, num: 6, label: 'Tahiti', pos: 'b', detail: 'Im November 1835 erreichte die Beagle [Tahiti](wiki:Tahiti|Tahiti).' },
        { lon: 151.208, lat: -33.869, num: 7, label: 'Sydney', pos: 'r', detail: 'Im Januar 1836 lief die Beagle in [Sydney](wiki:Sydney|Sydney) ein.' },
        { lon: 96.859, lat: -12.16, kind: 'site', label: 'Kokosinseln', pos: 'b', detail: 'Auf den [Kokosinseln](wiki:Kokosinseln|Cocos (Keeling) Islands) untersuchte Darwin 1836 ein Atoll und stützte damit seine Theorie der Korallenriffe.' },
        { lon: 18.417, lat: -33.923, num: 8, label: 'Kapstadt', pos: 'l', detail: 'Auf der Heimreise machte die Beagle Mitte 1836 in [Kapstadt](wiki:Kapstadt|Cape Town) Station.' },
      ],
      caption: 'Schematisch: Die braune Linie verbindet die Hauptstationen; der tatsächliche Kurs der Beagle verlief kleinteiliger. Tippe auf die nummerierten Stationen.',
    },
    {
      id: 'quiz-evolution', type: 'quiz', title: 'Evolution richtig verstanden?',
      question: 'Giraffen haben lange Hälse. Welche Erklärung entspricht **Darwins** Theorie?',
      options: [
        { text: 'Giraffen streckten sich nach hohen Blättern, und die so verlängerten Hälse wurden vererbt.', correct: false, why: 'Das ist die Idee von [Jean-Baptiste de Lamarck](wiki:Jean-Baptiste de Lamarck|Jean-Baptiste Lamarck) (Vererbung erworbener Eigenschaften) — sie hat sich als falsch erwiesen.' },
        { text: 'Giraffen mit zufällig etwas längeren Hälsen erreichten mehr Futter, hatten mehr Nachkommen, und so wurden lange Hälse über Generationen häufiger.', correct: true, why: 'Variation + Vererbung + Selektion — genau Darwins Mechanismus.' },
        { text: 'Die Natur plante lange Hälse, damit Giraffen besser an Bäume kommen.', correct: false, why: 'Evolution hat kein Ziel und keinen Plan.' },
      ],
    },
    {
      id: 'vererbung', type: 'text', title: 'Von Mendels Erbsen zur Doppelhelix',
      md: `
Darwin wusste nicht, *wie* Vererbung funktioniert. Die Antwort fand — unbeachtet — ein Mönch: **[Gregor Mendel](wiki:Gregor Mendel|Gregor Mendel)** kreuzte im Klostergarten in [Brünn](wiki:Brünn|Brno) rund 28.000 [Erbsenpflanzen](wiki:Erbse|Pea) und veröffentlichte 1866 die [[mendelsche-regeln]].[^nat-wp-mendel] Merkmale werden durch Erbfaktoren (heute: **[Gene](wiki:Gen|Gene)**) weitergegeben; jedes Lebewesen hat zwei Kopien, und **dominante** Merkmale überdecken **rezessive**. Erst um 1900 wurde seine Arbeit wiederentdeckt.

Die Gene liegen auf der [[dna]], einem langen Molekül im Zellkern, aufgewickelt zu [[chromosom|Chromosomen]] — der Mensch hat **46**, also 23 Paare.[^nat-wp-dna] Die DNA ist eine **[Doppelhelix](wiki:Doppelhelix|Double helix)**, eine verdrehte Strickleiter, deren Sprossen aus vier Basen bestehen: **A**denin, **T**hymin, **G**uanin, **C**ytosin. A paart immer mit T, G mit C. Die Reihenfolge der Basen ist der [genetische Code](wiki:Genetischer Code|Genetic code).

**1953** veröffentlichten [James Watson](wiki:James Watson|James Watson) und [Francis Crick](wiki:Francis Crick|Francis Crick) das Modell der Doppelhelix ([Nobelpreis](wiki:Nobelpreis für Physiologie oder Medizin|Nobel Prize in Physiology or Medicine) 1962 mit [Maurice Wilkins](wiki:Maurice Wilkins|Maurice Wilkins)). Entscheidend war eine Röntgenaufnahme von **[Rosalind Franklin](wiki:Rosalind Franklin|Rosalind Franklin)** — die 1958 starb und deren Beitrag lange unterschätzt wurde.[^nat-wp-franklin] 2003 war das [menschliche Genom](wiki:Humangenomprojekt|Human Genome Project) weitgehend entschlüsselt: rund 3 Milliarden [Basenpaare](wiki:Basenpaar|Base pair), etwa 20.000 Gene.`,
    },
    {
      id: 'map-genetik', type: 'map', title: 'Wo die Genetik entstand',
      view: [-3.5, 47.0, 19.5, 53.8],
      layers: { cities: false, mountains: false },
      points: [
        { lon: 16.608, lat: 49.195, label: 'Brünn', pos: 'r', detail: 'Im Augustinerkloster von [Brünn](wiki:Brünn|Brno) kreuzte [Gregor Mendel](wiki:Gregor Mendel|Gregor Mendel) Erbsen; 1866 erschien seine Arbeit.' },
        { lon: 9.053, lat: 48.52, label: 'Tübingen', pos: 'l', detail: 'In [Tübingen](wiki:Tübingen|Tübingen) isolierte [Friedrich Miescher](wiki:Friedrich Miescher|Friedrich Miescher) 1869 aus Zellkernen eine bis dahin unbekannte Substanz, das „Nuklein“ — die heutige DNA.' },
        { lon: 0.117, lat: 52.2, label: 'Cambridge', pos: 'l', detail: 'Im [Cavendish Laboratory](wiki:Cavendish Laboratory|Cavendish Laboratory) in [Cambridge](wiki:Cambridge|Cambridge) bauten Watson und Crick 1953 ihr Modell der Doppelhelix.' },
        { lon: -0.118, lat: 51.509, label: 'London', pos: 'l', detail: 'Am King’s College in [London](wiki:London|London) entstanden die Röntgenbilder von [Rosalind Franklin](wiki:Rosalind Franklin|Rosalind Franklin) und Maurice Wilkins, die Watson und Crick zum Durchbruch verhalfen.' },
      ],
      caption: 'Vier Orte, vier Schritte: Vererbungsregeln (Brünn), DNA als Stoff (Tübingen), Röntgenbild (London), Strukturmodell (Cambridge).',
    },
    {
      id: 'calc-basen', type: 'numeric', title: 'Basenpaarung',
      question: 'Ein DNA-Abschnitt besteht zu **30 % aus [Adenin](wiki:Adenin|Adenine)**. Wie viel Prozent **[Guanin](wiki:Guanin|Guanine)** enthält er?',
      answer: 20, tolerance: 0, unit: '%',
      hint: 'A paart mit T, G mit C. Wenn A 30 % hat, wie viel hat T? Was bleibt übrig?',
      explain: 'A = T = 30 % → zusammen 60 %. Für G und C bleiben 40 %, und weil G = C: **20 % Guanin**. Diese Regel ([Chargaff-Regel](wiki:Chargaff-Regeln|Chargaff\'s rules)) half Watson und Crick beim Modell.',
    },
    {
      id: 'oeko', type: 'text', title: 'Photosynthese und Ökosysteme',
      md: `
Fast alles Leben auf der Erde hängt an einer Reaktion: der [[photosynthese]]. Pflanzen, [Algen](wiki:Algen|Algae) und [Cyanobakterien](wiki:Cyanobakterien|Cyanobacteria) nutzen Sonnenlicht, um aus [Kohlendioxid](wiki:Kohlenstoffdioxid|Carbon dioxide) und Wasser Zucker zu bauen — und geben dabei Sauerstoff ab:

$$6\\,\\text{CO}_2 + 6\\,\\text{H}_2\\text{O} \\xrightarrow{\\text{Licht}} \\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\,\\text{O}_2$$

Tiere (und Pflanzen selbst) machen in den [Mitochondrien](wiki:Mitochondrium|Mitochondria) das Umgekehrte: **[Zellatmung](wiki:Zellatmung|Cellular respiration)** verbrennt Zucker mit Sauerstoff zu CO₂ und Wasser. In einem [[oekosystem]] greifen **[Produzenten](wiki:Produzent (Ökologie)|Primary producer)** (Pflanzen), **[Konsumenten](wiki:Konsument (Ökologie)|Consumer (food chain))** (Pflanzen- und Fleischfresser) und **[Destruenten](wiki:Destruent|Decomposer)** (Pilze, Bakterien, die Totes zersetzen) ineinander. Energie fließt durch die [Nahrungskette](wiki:Nahrungskette|Food chain), Stoffe werden im Kreislauf wiederverwendet.`,
    },
    {
      id: 'order-nahrungskette', type: 'order', title: 'Eine Nahrungskette',
      prompt: 'Bringe diese Nahrungskette aus einem See in die richtige Reihenfolge — vom Produzenten zum Endkonsumenten.',
      items: ['Algen (Produzent)', 'Wasserflöhe', 'Kleine Fische (z. B. Rotauge)', 'Hecht', 'Fischadler'],
      explain: 'Auf jeder Stufe gehen rund 90 % der Energie verloren (Atmung, Wärme). Deshalb gibt es viel mehr Algen als Fischadler.',
    },
    {
      id: 'timeline-bio', type: 'game', viz: 'timeline', title: 'Wer kam zuerst?',
      params: {
        mode: 'sort',
        events: [
          { year: 1665, label: 'Hooke sieht Zellen' },
          { year: 1838, label: 'Zelltheorie' },
          { year: 1859, label: 'Entstehung der Arten' },
          { year: 1866, label: 'Mendels Regeln' },
          { year: 1953, label: 'DNA-Doppelhelix' },
          { year: 2003, label: 'Humangenom entschlüsselt' },
        ],
      },
    },
    {
      id: 'fact-dna', type: 'callout', tone: 'fact', title: 'Zwei Meter in jeder Zelle',
      md: `Die DNA einer einzigen menschlichen Zelle wäre ausgerollt etwa **zwei Meter** lang — verpackt in einen Zellkern von wenigen Tausendstel Millimetern. Und: Menschen und [Schimpansen](wiki:Schimpansen|Pan (genus)) stimmen in ihrer DNA-Sequenz zu rund 98–99 % überein.`,
    },
    {
      id: 'recall-selektion', type: 'recall', title: 'Erkläre es einem Kind',
      prompt: 'Erkläre in 3–4 Sätzen, wie durch **natürliche Selektion** Bakterien gegen ein [Antibiotikum](wiki:Antibiotikum|Antibiotic) resistent werden können.',
      answer: `In einer großen Bakterienpopulation unterscheiden sich die einzelnen Bakterien zufällig (**Variation**, durch [Mutationen](wiki:Mutation|Mutation)). Einige wenige sind durch Zufall etwas unempfindlicher gegen das Antibiotikum. Wird das Antibiotikum eingesetzt, sterben die empfindlichen Bakterien, die unempfindlichen überleben und vermehren sich (**Selektion**). Ihre Nachkommen erben die [Resistenz](wiki:Antibiotikaresistenz|Antimicrobial resistance) (**Vererbung**) — nach vielen Generationen besteht die Population fast nur noch aus resistenten Bakterien. Deshalb soll man Antibiotika nur gezielt und bis zum Ende einnehmen.`,
      hints: ['Sind alle Bakterien gleich?', 'Wer überlebt die Behandlung — und was passiert danach?'],
      cards: ['selektion'],
    },
  ],
  cards: [
    { id: 'zelltheorie', front: 'Wer formulierte die Zelltheorie (1838/39)?', back: 'Matthias Schleiden und Theodor Schwann. Virchow ergänzte 1855: „Jede Zelle entsteht aus einer Zelle“.' },
    { id: 'pro-eu', front: 'Unterschied Prokaryot und Eukaryot', back: 'Prokaryoten (Bakterien) haben keinen Zellkern, Eukaryoten (Tiere, Pflanzen, Pilze) schon.' },
    { id: 'mito', front: 'Welche Aufgabe haben Mitochondrien?', back: 'Sie sind die „Kraftwerke“ der Zelle: Zellatmung, Energiegewinnung (ATP).' },
    { id: 'chloroplast', front: 'Wo findet die Photosynthese statt?', back: 'In den Chloroplasten (grüner Farbstoff Chlorophyll) von Pflanzen und Algen.' },
    { id: 'photosynthese', front: 'Photosynthese: Was geht rein, was kommt raus?', back: 'Rein: Kohlendioxid, Wasser, Licht. Raus: Zucker (Glucose) und Sauerstoff.' },
    { id: 'darwin', front: 'Wann erschien Darwins *Über die Entstehung der Arten*?', back: '1859.' },
    { id: 'selektion', front: 'Die drei Zutaten der natürlichen Selektion', back: 'Variation, Vererbung, Selektion (besser Angepasste haben mehr Nachkommen).' },
    { id: 'galapagos', front: 'Welche Tiere inspirierten Darwin auf den Galápagos-Inseln?', back: 'Die Finken („Darwinfinken“) mit unterschiedlich angepassten Schnäbeln — außerdem Riesenschildkröten.' },
    { id: 'affe', front: 'Stammt der Mensch vom Affen ab?', back: 'Nein — Mensch und Schimpanse haben gemeinsame Vorfahren (vor etwa 6–7 Mio. Jahren).' },
    { id: 'mendel', front: 'Wer entdeckte die Grundregeln der Vererbung — und woran?', back: 'Gregor Mendel, an Erbsen (veröffentlicht 1866).' },
    { id: 'dominant', front: 'Dominant vs. rezessiv', back: 'Ein dominantes Merkmal setzt sich gegenüber einem rezessiven durch; das rezessive zeigt sich nur, wenn beide Genkopien rezessiv sind.' },
    { id: 'dna-basen', front: 'Die vier Basen der DNA und ihre Paarung', back: 'Adenin–Thymin, Guanin–Cytosin.' },
    { id: 'doppelhelix', front: 'Wer beschrieb 1953 die DNA-Doppelhelix?', back: 'James Watson und Francis Crick — gestützt auf Röntgenbilder von Rosalind Franklin.' },
    { id: 'chromosomen', front: 'Wie viele Chromosomen hat der Mensch?', back: '46, also 23 Paare.' },
    { id: 'genom', front: 'Größe des menschlichen Genoms', back: 'Rund 3 Milliarden Basenpaare mit etwa 20.000 Genen (weitgehend entschlüsselt 2003).' },
    { id: 'oeko', front: 'Die drei Rollen in einem Ökosystem', back: 'Produzenten (Pflanzen), Konsumenten (Tiere), Destruenten (Pilze, Bakterien).' },
  ],
};
