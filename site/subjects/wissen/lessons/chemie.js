export default {
  id: 'chemie',
  title: 'Chemie: Atome & Reaktionen',
  summary: 'Woraus alles besteht und warum sich Stoffe verwandeln: [[atom|Atome]], das [[periodensystem]], [[chemische-bindung|Bindungen]], [[chemische-reaktion|Reaktionen]] und der [[ph-wert]].',
  minutes: 22,
  goals: [
    'Den Aufbau eines [[atom|Atoms]] aus Protonen, Neutronen und Elektronen beschreiben',
    'Das [[periodensystem]] lesen: Ordnungszahl, Perioden, Gruppen, wichtige Elementfamilien',
    'Ionenbindung, Atombindung und Metallbindung unterscheiden',
    'Wissen, was bei einer [[chemische-reaktion|chemischen Reaktion]] passiert und was der [[ph-wert]] misst',
  ],
  blocks: [
    {
      id: 'atom', type: 'text', title: 'Das Atom: fast nur leerer Raum',
      md: `
Alles um dich herum besteht aus [[atom|Atomen]].[^nat-wp-atom] Ein Atom hat einen winzigen **Kern** aus positiv geladenen **Protonen** und elektrisch neutralen **Neutronen**. Um ihn herum bewegen sich die negativ geladenen **Elektronen** in der Atomhülle.

- Die **Zahl der Protonen** — die **Ordnungszahl** — legt das Element fest. 1 Proton: Wasserstoff. 6: Kohlenstoff. 8: Sauerstoff. 79: Gold.
- Atome gleichen Elements mit unterschiedlich vielen Neutronen heißen **Isotope** (z. B. Kohlenstoff-12 und das radioaktive Kohlenstoff-14, mit dem man Fossilien datiert).
- Fast die ganze Masse steckt im Kern — aber der Kern ist winzig: Wäre ein Atom so groß wie ein Fußballstadion, wäre der Kern etwa so groß wie eine Erbse am Anstoßpunkt.

Die Idee des „Unteilbaren“ (griechisch *átomos*) stammt von Demokrit (um 400 v. Chr.). Wissenschaftlich begründet wurde die Atomtheorie um 1808 von John Dalton; Ernest Rutherford entdeckte 1911 den Atomkern.`,
    },
    {
      id: 'calc-neutronen', type: 'numeric', title: 'Teilchen zählen',
      question: 'Ein Kohlenstoffatom hat die Ordnungszahl 6. Das Isotop **Kohlenstoff-14** hat die Massenzahl 14 (= Protonen + Neutronen). Wie viele **Neutronen** hat es?',
      answer: 8, tolerance: 0,
      hint: 'Massenzahl minus Ordnungszahl.',
      explain: '14 − 6 = **8 Neutronen**. Normaler Kohlenstoff-12 hat 6. C-14 ist radioaktiv und zerfällt mit einer Halbwertszeit von rund 5.730 Jahren — das nutzt die Radiokarbonmethode zur Altersbestimmung.',
    },
    {
      id: 'pse', type: 'text', title: 'Das Periodensystem: die Landkarte der Chemie',
      md: `
1869 ordnete der russische Chemiker **Dmitri Mendelejew** die damals bekannten Elemente in einer Tabelle — fast gleichzeitig mit dem Deutschen **Lothar Meyer**.[^nat-wp-periodensystem] Mendelejews Geniestreich: Er ließ Lücken für unentdeckte Elemente und sagte deren Eigenschaften voraus. Als Gallium (1875) und Germanium (1886) gefunden wurden, passten sie genau.

So liest man das [[periodensystem]] heute (118 Elemente):

- **Zeilen = Perioden.** Mit jeder Periode kommt eine Elektronenschale dazu.
- **Spalten = Gruppen.** Elemente einer Gruppe verhalten sich chemisch ähnlich, weil sie gleich viele Außenelektronen haben.
- **Links Metalle, rechts Nichtmetalle**, dazwischen Halbmetalle.

Wichtige Familien: **Alkalimetalle** (Gruppe 1: Lithium, Natrium, Kalium — reagieren heftig mit Wasser), **Halogene** (Gruppe 17: Fluor, Chlor, Brom — „Salzbildner“) und **[[edelgase|Edelgase]]** (Gruppe 18 — reaktionsträge).`,
    },
    {
      id: 'viz-pse', type: 'viz', viz: 'natur-periodensystem', title: 'Erkunde die ersten vier Perioden',
      params: { mode: 'explore' },
      caption: 'Klicke auf Elemente. Achte auf die Farben der Elementfamilien.',
    },
    {
      id: 'game-pse', type: 'game', viz: 'natur-periodensystem', title: 'Element-Suche',
      params: { mode: 'game' },
    },
    {
      id: 'bindung', type: 'text', title: 'Wie Atome zusammenhalten',
      md: `
Einzelne Atome sind selten; meist verbinden sie sich. Antrieb ist das Streben nach einer **voll besetzten Außenschale** — wie bei den Edelgasen. Es gibt drei Grundtypen der [[chemische-bindung|chemischen Bindung]]:

<table>
<tr><th>Bindung</th><th>Prinzip</th><th>Beispiel</th><th>Typische Eigenschaft</th></tr>
<tr><td><b>Ionenbindung</b></td><td>Metall gibt Elektronen ab, Nichtmetall nimmt sie auf; entgegengesetzt geladene Ionen ziehen sich an</td><td>Kochsalz NaCl</td><td>Kristalle, hoher Schmelzpunkt, in Wasser gelöst leitfähig</td></tr>
<tr><td><b>Atombindung</b> (kovalent)</td><td>Nichtmetalle teilen sich Elektronenpaare</td><td>Wasser H₂O, Kohlendioxid CO₂</td><td>bildet <b>Moleküle</b></td></tr>
<tr><td><b>Metallbindung</b></td><td>Metallionen in einem „Elektronengas“</td><td>Kupfer, Eisen</td><td>leitet Strom und Wärme, verformbar</td></tr>
</table>

Ein [[molekuel|Molekül]] ist ein fester Verbund aus Atomen. Die Formel verrät die Zusammensetzung: **H₂O** = 2 Wasserstoff + 1 Sauerstoff.`,
    },
    {
      id: 'match-formeln', type: 'match', title: 'Formeln des Alltags',
      prompt: 'Ordne jeder Formel den Stoff zu.',
      pairs: [['H₂O', 'Wasser'], ['CO₂', 'Kohlendioxid'], ['NaCl', 'Kochsalz'], ['O₂', 'Sauerstoff (wie in der Luft)'], ['CH₄', 'Methan (Erdgas)'], ['C₆H₁₂O₆', 'Traubenzucker (Glucose)']],
    },
    {
      id: 'reaktion', type: 'text', title: 'Reaktionen, Säuren und Basen',
      md: `
Bei einer [[chemische-reaktion|chemischen Reaktion]] entstehen neue Stoffe mit neuen Eigenschaften: Aus dem giftigen Metall Natrium und dem giftigen Gas Chlor wird Kochsalz. Dabei werden nur Bindungen umgebaut — **kein Atom geht verloren** (Gesetz der Massenerhaltung, Antoine Lavoisier, 18. Jh.). Beispiel Verbrennung von Erdgas:

$$\\text{CH}_4 + 2\\,\\text{O}_2 \\rightarrow \\text{CO}_2 + 2\\,\\text{H}_2\\text{O}$$

Der **[[ph-wert]]** beschreibt, wie sauer oder basisch eine Lösung ist.[^nat-wp-phwert] **7 ist neutral** (reines Wasser), **kleiner ist sauer**, **größer basisch** (auch „alkalisch“). Die Skala ist logarithmisch: Jeder Schritt bedeutet Faktor 10. Säure + Base neutralisieren sich zu Salz und Wasser — deshalb hilft ein basisches Mittel gegen Sodbrennen.`,
    },
    {
      id: 'order-ph', type: 'order', title: 'Von sauer nach basisch',
      prompt: 'Sortiere vom **sauersten** (niedrigster pH) zum **basischsten** Stoff.',
      items: ['Magensäure (pH ≈ 1–2)', 'Zitronensaft (pH ≈ 2)', 'Kaffee (pH ≈ 5)', 'Reines Wasser (pH 7)', 'Seifenlauge (pH ≈ 10)', 'Rohrreiniger (pH ≈ 13–14)'],
      explain: 'Der Magen ist erstaunlich sauer — die Säure tötet Keime und hilft bei der Verdauung. Rohrreiniger ist stark basisch und löst Haare und Fett.',
    },
    {
      id: 'curie', type: 'callout', tone: 'history', title: 'Marie Curie',
      md: `Die in Warschau geborene Physikerin und Chemikerin **Marie Curie** entdeckte mit ihrem Mann Pierre die Elemente **Polonium** und **Radium** und prägte den Begriff *Radioaktivität*.[^nat-wp-curie] Sie erhielt als erster Mensch **zwei Nobelpreise** (Physik 1903, Chemie 1911) und ist bis heute die einzige Person mit Nobelpreisen in zwei verschiedenen Naturwissenschaften. Ihre Notizbücher sind noch immer radioaktiv.`,
    },
    {
      id: 'fact-luft', type: 'callout', tone: 'fact', title: 'Was du gerade einatmest',
      md: `Luft besteht zu rund **78 % aus Stickstoff**, **21 % Sauerstoff** und knapp **1 % Argon**. Kohlendioxid macht nur etwa 0,04 % aus — und trotzdem bestimmt dieses bisschen maßgeblich das Klima der Erde.`,
    },
    {
      id: 'quiz-chemie', type: 'quiz', title: 'Alles klar?',
      question: 'Welche Aussagen stimmen?',
      options: [
        { text: 'Die Ordnungszahl gibt die Zahl der Protonen an.', correct: true, why: 'Und damit, um welches Element es sich handelt.' },
        { text: 'Edelgase reagieren besonders heftig mit anderen Stoffen.', correct: false, why: 'Im Gegenteil: Ihre volle Außenschale macht sie reaktionsträge.' },
        { text: 'pH 3 ist zehnmal saurer als pH 4.', correct: true, why: 'Die pH-Skala ist logarithmisch.' },
        { text: 'Bei einer chemischen Reaktion verschwinden Atome.', correct: false, why: 'Atome bleiben erhalten; nur ihre Bindungen ändern sich.' },
        { text: 'Das Periodensystem stellte Mendelejew 1869 auf.', correct: true, why: 'Etwa gleichzeitig mit Lothar Meyer.' },
      ],
    },
    {
      id: 'recall-pse', type: 'recall', title: 'Erkläre es in eigenen Worten',
      prompt: 'Warum verhalten sich Natrium und Kalium chemisch so ähnlich, obwohl ihre Atome verschieden groß sind?',
      answer: `Beide stehen im Periodensystem in **derselben Gruppe** (Gruppe 1, Alkalimetalle). Elemente einer Gruppe haben **gleich viele Außenelektronen** — hier genau eines. Weil chemisches Verhalten vor allem von den Außenelektronen abhängt, geben beide ihr einzelnes Außenelektron sehr leicht ab und reagieren deshalb ähnlich heftig, z. B. mit Wasser.`,
      hints: ['Wo stehen die beiden im Periodensystem?', 'Welche Elektronen entscheiden über chemische Reaktionen?'],
      cards: ['gruppe'],
    },
  ],
  cards: [
    { id: 'atombau', front: 'Aus welchen Teilchen besteht ein Atom?', back: 'Kern aus **Protonen** (positiv) und **Neutronen** (neutral), Hülle aus **Elektronen** (negativ).' },
    { id: 'ordnungszahl', front: 'Was gibt die Ordnungszahl an?', back: 'Die Zahl der Protonen im Kern — sie bestimmt das Element.' },
    { id: 'isotop', front: 'Was sind Isotope?', back: 'Atome desselben Elements mit unterschiedlich vielen Neutronen (z. B. C-12 und C-14).' },
    { id: 'kern', front: 'Wer entdeckte 1911 den Atomkern?', back: 'Ernest Rutherford.' },
    { id: 'pse', front: 'Wer stellte 1869 das Periodensystem auf?', back: 'Dmitri Mendelejew (und unabhängig Lothar Meyer).' },
    { id: 'elemente', front: 'Wie viele Elemente hat das Periodensystem heute?', back: '118.' },
    { id: 'gruppe', front: 'Warum verhalten sich Elemente einer Gruppe ähnlich?', back: 'Sie haben gleich viele Außenelektronen.' },
    { id: 'edelgase', front: 'Nenne die Edelgase', back: 'Helium, Neon, Argon, Krypton, Xenon, Radon (Gruppe 18).' },
    { id: 'alkali', front: 'Welche Gruppe sind die Alkalimetalle — und ein Beispiel?', back: 'Gruppe 1: Lithium, Natrium, Kalium … reagieren heftig mit Wasser.' },
    { id: 'halogene', front: 'Was sind Halogene?', back: '„Salzbildner“ der Gruppe 17: Fluor, Chlor, Brom, Iod.' },
    { id: 'bindungen', front: 'Die drei Grundtypen chemischer Bindung', back: 'Ionenbindung (Salze), Atombindung/kovalent (Moleküle), Metallbindung (Metalle).' },
    { id: 'wasser', front: 'Summenformel von Wasser und von Kohlendioxid', back: 'H₂O und CO₂.' },
    { id: 'kochsalz', front: 'Chemischer Name und Formel von Kochsalz', back: 'Natriumchlorid, NaCl.' },
    { id: 'ph', front: 'pH-Wert: neutral, sauer, basisch?', back: '7 neutral, unter 7 sauer, über 7 basisch (alkalisch). Logarithmische Skala.' },
    { id: 'luft', front: 'Zusammensetzung der Luft', back: 'Rund 78 % Stickstoff, 21 % Sauerstoff, knapp 1 % Argon, ≈ 0,04 % CO₂.' },
    { id: 'curie', front: 'Was macht Marie Curie einzigartig?', back: 'Zwei Nobelpreise in zwei Naturwissenschaften (Physik 1903, Chemie 1911); entdeckte Polonium und Radium.' },
    { id: 'lavoisier', front: 'Gesetz der Massenerhaltung', back: 'Bei chemischen Reaktionen bleibt die Gesamtmasse gleich — Atome gehen nicht verloren (Lavoisier).' },
  ],
};
