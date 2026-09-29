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
Robert Hooke sah 1665 durchs Mikroskop in Kork winzige Kammern und nannte sie *cells*. Die **Zelltheorie** formulierten 1838/39 die Deutschen Matthias Schleiden (Pflanzen) und Theodor Schwann (Tiere): Alle Lebewesen bestehen aus [[zelle|Zellen]]. Rudolf Virchow ergänzte 1855: *Omnis cellula e cellula* — jede Zelle entsteht aus einer Zelle.[^nat-wp-zelle]

Zwei große Zelltypen:

- **Prokaryoten** — ohne Zellkern: Bakterien. Winzig, einfach, aber ungeheuer erfolgreich.
- **Eukaryoten** — mit Zellkern: Tiere, Pflanzen, Pilze.

Wichtige Bestandteile einer Tier- bzw. Pflanzenzelle:

<table>
<tr><th>Bestandteil</th><th>Aufgabe</th></tr>
<tr><td>Zellkern</td><td>enthält die Erbinformation (DNA)</td></tr>
<tr><td>[[mitochondrium|Mitochondrien]]</td><td>„Kraftwerke“: Zellatmung, Energie in Form von ATP</td></tr>
<tr><td>Zellmembran</td><td>Hülle, kontrolliert, was hinein- und hinausgeht</td></tr>
<tr><td>Chloroplasten (nur Pflanzen)</td><td>[[photosynthese]]</td></tr>
<tr><td>Zellwand (Pflanzen, Pilze, Bakterien)</td><td>feste Stützhülle</td></tr>
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
**Charles Darwin** umsegelte 1831–1836 auf der *HMS Beagle* die Welt. Auf den Galápagos-Inseln fielen ihm Finken auf, deren Schnäbel je nach Insel an unterschiedliche Nahrung angepasst waren.[^nat-wp-darwin] Über 20 Jahre später, **1859**, erschien sein Buch *Über die Entstehung der Arten*. Die Kernidee der [[evolution]] durch **natürliche Selektion** in drei Schritten:

1. **Variation:** Individuen einer Art unterscheiden sich.
2. **Vererbung:** Ein Teil der Unterschiede wird an die Nachkommen weitergegeben.
3. **Selektion:** Wer besser an seine Umwelt angepasst ist, überlebt eher und hat mehr Nachkommen — seine Merkmale werden häufiger.

Über viele Generationen entstehen so neue Arten. Alfred Russel Wallace kam unabhängig zum selben Schluss; beide stellten die Theorie 1858 gemeinsam vor.

Wichtig: Evolution hat **kein Ziel**, und der Mensch „stammt nicht vom Affen ab“ — Menschen und Schimpansen haben **gemeinsame Vorfahren**, die vor etwa 6 bis 7 Millionen Jahren lebten. *Survival of the fittest* (ein Ausdruck von Herbert Spencer) meint nicht die Stärksten, sondern die am besten *Passenden*.`,
    },
    {
      id: 'quiz-evolution', type: 'quiz', title: 'Evolution richtig verstanden?',
      question: 'Giraffen haben lange Hälse. Welche Erklärung entspricht **Darwins** Theorie?',
      options: [
        { text: 'Giraffen streckten sich nach hohen Blättern, und die so verlängerten Hälse wurden vererbt.', correct: false, why: 'Das ist die Idee von Jean-Baptiste de Lamarck (Vererbung erworbener Eigenschaften) — sie hat sich als falsch erwiesen.' },
        { text: 'Giraffen mit zufällig etwas längeren Hälsen erreichten mehr Futter, hatten mehr Nachkommen, und so wurden lange Hälse über Generationen häufiger.', correct: true, why: 'Variation + Vererbung + Selektion — genau Darwins Mechanismus.' },
        { text: 'Die Natur plante lange Hälse, damit Giraffen besser an Bäume kommen.', correct: false, why: 'Evolution hat kein Ziel und keinen Plan.' },
      ],
    },
    {
      id: 'vererbung', type: 'text', title: 'Von Mendels Erbsen zur Doppelhelix',
      md: `
Darwin wusste nicht, *wie* Vererbung funktioniert. Die Antwort fand — unbeachtet — ein Mönch: **Gregor Mendel** kreuzte im Klostergarten in Brünn rund 28.000 Erbsenpflanzen und veröffentlichte 1866 die [[mendelsche-regeln]].[^nat-wp-mendel] Merkmale werden durch Erbfaktoren (heute: **Gene**) weitergegeben; jedes Lebewesen hat zwei Kopien, und **dominante** Merkmale überdecken **rezessive**. Erst um 1900 wurde seine Arbeit wiederentdeckt.

Die Gene liegen auf der [[dna]], einem langen Molekül im Zellkern, aufgewickelt zu [[chromosom|Chromosomen]] — der Mensch hat **46**, also 23 Paare.[^nat-wp-dna] Die DNA ist eine **Doppelhelix**, eine verdrehte Strickleiter, deren Sprossen aus vier Basen bestehen: **A**denin, **T**hymin, **G**uanin, **C**ytosin. A paart immer mit T, G mit C. Die Reihenfolge der Basen ist der genetische Code.

**1953** veröffentlichten James Watson und Francis Crick das Modell der Doppelhelix (Nobelpreis 1962 mit Maurice Wilkins). Entscheidend war eine Röntgenaufnahme von **Rosalind Franklin** — die 1958 starb und deren Beitrag lange unterschätzt wurde.[^nat-wp-franklin] 2003 war das menschliche Genom weitgehend entschlüsselt: rund 3 Milliarden Basenpaare, etwa 20.000 Gene.`,
    },
    {
      id: 'calc-basen', type: 'numeric', title: 'Basenpaarung',
      question: 'Ein DNA-Abschnitt besteht zu **30 % aus Adenin**. Wie viel Prozent **Guanin** enthält er?',
      answer: 20, tolerance: 0, unit: '%',
      hint: 'A paart mit T, G mit C. Wenn A 30 % hat, wie viel hat T? Was bleibt übrig?',
      explain: 'A = T = 30 % → zusammen 60 %. Für G und C bleiben 40 %, und weil G = C: **20 % Guanin**. Diese Regel (Chargaff-Regel) half Watson und Crick beim Modell.',
    },
    {
      id: 'oeko', type: 'text', title: 'Photosynthese und Ökosysteme',
      md: `
Fast alles Leben auf der Erde hängt an einer Reaktion: der [[photosynthese]]. Pflanzen, Algen und Cyanobakterien nutzen Sonnenlicht, um aus Kohlendioxid und Wasser Zucker zu bauen — und geben dabei Sauerstoff ab:

$$6\\,\\text{CO}_2 + 6\\,\\text{H}_2\\text{O} \\xrightarrow{\\text{Licht}} \\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\,\\text{O}_2$$

Tiere (und Pflanzen selbst) machen in den Mitochondrien das Umgekehrte: **Zellatmung** verbrennt Zucker mit Sauerstoff zu CO₂ und Wasser. In einem [[oekosystem]] greifen **Produzenten** (Pflanzen), **Konsumenten** (Pflanzen- und Fleischfresser) und **Destruenten** (Pilze, Bakterien, die Totes zersetzen) ineinander. Energie fließt durch die Nahrungskette, Stoffe werden im Kreislauf wiederverwendet.`,
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
      md: `Die DNA einer einzigen menschlichen Zelle wäre ausgerollt etwa **zwei Meter** lang — verpackt in einen Zellkern von wenigen Tausendstel Millimetern. Und: Menschen und Schimpansen stimmen in ihrer DNA-Sequenz zu rund 98–99 % überein.`,
    },
    {
      id: 'recall-selektion', type: 'recall', title: 'Erkläre es einem Kind',
      prompt: 'Erkläre in 3–4 Sätzen, wie durch **natürliche Selektion** Bakterien gegen ein Antibiotikum resistent werden können.',
      answer: `In einer großen Bakterienpopulation unterscheiden sich die einzelnen Bakterien zufällig (**Variation**, durch Mutationen). Einige wenige sind durch Zufall etwas unempfindlicher gegen das Antibiotikum. Wird das Antibiotikum eingesetzt, sterben die empfindlichen Bakterien, die unempfindlichen überleben und vermehren sich (**Selektion**). Ihre Nachkommen erben die Resistenz (**Vererbung**) — nach vielen Generationen besteht die Population fast nur noch aus resistenten Bakterien. Deshalb soll man Antibiotika nur gezielt und bis zum Ende einnehmen.`,
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
