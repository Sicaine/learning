export default {
  id: 'deutschland-landschaft',
  title: 'Deutschland: Flüsse, Gebirge, Küsten',
  summary: 'Von den Inseln der Nordsee bis zur [[zugspitze|Zugspitze]]: Deutschland steigt von Norden nach Süden in klaren Stufen an. Wer diese Großlandschaften und die großen Flüsse kennt, kann jede Deutschlandkarte lesen.',
  minutes: 20,
  goals: [
    'Die Großlandschaften Deutschlands von Nord nach Süd aufzählen',
    'Die wichtigsten Flüsse, ihre Richtung und ihre Mündung kennen',
    'Nordsee und Ostsee, die größten Inseln und Seen unterscheiden',
    'Die Rekorde nennen: höchster Berg, größte Insel, größter See',
  ],
  blocks: [
    {
      id: 'stufen', type: 'text', title: 'Ein Land, das nach Süden ansteigt',
      md: `
Deutschland erstreckt sich rund **876 km von Norden nach Süden** (Sylt bis Allgäu) und rund **640 km von Westen nach Osten**.[^wp-geographie-deutschlands] Auf dem Weg nach Süden wird es fast stufenweise höher:

1. **Küste und Inseln** an Nord- und Ostsee
2. das flache **[[norddeutsches-tiefland|Norddeutsche Tiefland]]**, geformt von den Gletschern der Eiszeiten
3. die **Mittelgebirgsschwelle** mit Harz, Eifel, Thüringer Wald und Erzgebirge ([[mittelgebirge]])
4. das **Südwestdeutsche Schichtstufenland** mit Schwäbischer und Fränkischer Alb, im Westen Schwarzwald und Oberrheingraben
5. das **Alpenvorland** mit seinen Eiszeitseen — und schließlich
6. ein schmaler Streifen der **[[alpen|Alpen]]** mit der Zugspitze (2.962 m).`,
    },
    {
      id: 'profil', type: 'viz', viz: 'geo-profil', title: 'Von der Nordsee zur Zugspitze',
      task: 'Klicke jede Großlandschaft im Profil an und lies, was sie ausmacht.',
    },
    {
      id: 'reihenfolge', type: 'order', title: 'Von Nord nach Süd',
      prompt: 'Bringe die Großlandschaften in die Reihenfolge, in der du sie auf dem Weg von Hamburg nach Garmisch durchquerst.',
      items: ['Norddeutsches Tiefland', 'Mittelgebirgsschwelle', 'Schichtstufenland (Fränkische Alb)', 'Alpenvorland', 'Alpen'],
      explain: 'Von Hamburg geht es durch das flache Tiefland, über die Mittelgebirge (z. B. Harz oder Rhön), durch Franken mit der Fränkischen Alb, über die Donau ins Alpenvorland bei München und schließlich in die Alpen.',
    },
    {
      id: 'gebirge', type: 'text', title: 'Die Mittelgebirge und ihre Gipfel',
      md: `
Die Mittelgebirge sind alt und abgetragen, daher rund und bewaldet statt schroff. Die wichtigsten und ihre höchsten Gipfel:

<table>
<tr><th>Gebirge</th><th>Höchster Gipfel</th><th>Land</th></tr>
<tr><td>Schwarzwald</td><td>Feldberg, 1.493 m</td><td>Baden-Württemberg</td></tr>
<tr><td>Bayerischer Wald</td><td>Großer Arber, 1.456 m</td><td>Bayern</td></tr>
<tr><td>Erzgebirge</td><td>Fichtelberg, 1.215 m (dt. Seite)</td><td>Sachsen</td></tr>
<tr><td>Harz</td><td>Brocken, 1.141 m</td><td>Sachsen-Anhalt</td></tr>
<tr><td>Thüringer Wald</td><td>Großer Beerberg, 983 m</td><td>Thüringen</td></tr>
</table>

Der **Brocken** ist berühmt als Hexentanzplatz der Walpurgisnacht — auch in Goethes *Faust*. Und bis 1989 lag er im Sperrgebiet der DDR-Grenze.`,
    },
    {
      id: 'match-gipfel', type: 'match', title: 'Gebirge und Gipfel',
      prompt: 'Ordne jedem Gebirge seinen höchsten Gipfel zu.',
      pairs: [['Harz', 'Brocken'], ['Schwarzwald', 'Feldberg'], ['Bayerischer Wald', 'Großer Arber'], ['Erzgebirge', 'Fichtelberg'], ['Wettersteingebirge (Alpen)', 'Zugspitze'], ['Thüringer Wald', 'Großer Beerberg']],
    },
    {
      id: 'zugspitze-hoehe', type: 'numeric', title: 'Der höchste Punkt',
      question: 'Wie hoch ist die Zugspitze (in Metern)?',
      answer: 2962, tolerance: 2, unit: 'm',
      hint: 'Knapp unter 3.000 Metern.',
      explain: '**2.962 m.** Der Gipfel liegt direkt auf der Grenze zu Österreich. Zum Vergleich: der [[mont-blanc]] als höchster Alpengipfel misst 4.806 m.',
    },
    {
      id: 'fluesse', type: 'text', title: 'Die großen Flüsse',
      md: `
Die meisten großen Flüsse Deutschlands fließen **nach Norden** in Nord- oder Ostsee — mit einer großen Ausnahme:

- **[[rhein|Rhein]]** — der wasserreichste und längste Fluss Deutschlands (rund 865 km in Deutschland, gesamt etwa 1.230 km). Aus den Schweizer Alpen durch den [[bodensee|Bodensee]], am Oberrhein Grenze zu Frankreich, durch das Mittelrheintal mit der Loreley bis zur Mündung in den Niederlanden.[^wp-rhein]
- **[[elbe|Elbe]]** — aus dem Riesengebirge in Tschechien über Dresden, Magdeburg und Hamburg in die Nordsee bei Cuxhaven.
- **Weser** — entsteht in Hann. Münden aus Werra und Fulda und mündet bei Bremerhaven in die Nordsee.
- **Oder** — bildet mit der Neiße die Grenze zu Polen (Oder-Neiße-Grenze) und mündet in die Ostsee.
- **[[donau|Donau]]** — die Ausnahme: Sie entsteht bei Donaueschingen im Schwarzwald und fließt **nach Osten** bis ins Schwarze Meer, durch vier Hauptstädte (Wien, Bratislava, Budapest, Belgrad).[^wp-donau]

Wichtige Nebenflüsse des Rheins sind **Main**, **Mosel** und **Neckar**. Seit 1992 verbindet der **Main-Donau-Kanal** Nordsee und Schwarzes Meer durchgehend per Schiff.`,
    },
    {
      id: 'quiz-nordsee', type: 'quiz', title: 'Wohin fließen sie?',
      question: 'Welche dieser Flüsse münden (direkt oder über ihre Mündung) in die **Nordsee**?',
      options: [
        { text: 'Rhein', correct: true, why: 'Er mündet in den Niederlanden (Rhein-Maas-Delta).' },
        { text: 'Elbe', correct: true, why: 'Mündung bei Cuxhaven.' },
        { text: 'Weser', correct: true, why: 'Mündung bei Bremerhaven.' },
        { text: 'Donau', correct: false, why: 'Sie fließt nach Osten ins Schwarze Meer.' },
        { text: 'Oder', correct: false, why: 'Sie mündet über das Stettiner Haff in die Ostsee.' },
      ],
    },
    {
      id: 'laengen', type: 'order', title: 'Nach Länge sortieren',
      prompt: 'Sortiere die Flüsse nach ihrer **Gesamtlänge**, den längsten zuerst.',
      items: ['Donau (rund 2.850 km)', 'Rhein', 'Elbe', 'Oder', 'Weser'],
      explain: 'Donau ≈ 2.850 km, Rhein ≈ 1.230 km, Elbe ≈ 1.090 km, Oder ≈ 850 km, Weser ≈ 450 km (ohne ihren Quellfluss Werra).',
    },
    {
      id: 'kuesten', type: 'text', title: 'Zwei Meere, zwei Küsten',
      md: `
**Nordsee:** offenes Meer mit starken [[gezeiten|Gezeiten]]. Vor der Küste liegt das **[[wattenmeer|Wattenmeer]]**, seit 2009 UNESCO-Weltnaturerbe[^unesco-wattenmeer] — bei Ebbe kann man zu Fuß zu manchen Inseln laufen. Inseln: die Ostfriesischen (z. B. Borkum, Norderney) und die Nordfriesischen (Sylt, Föhr, Amrum), dazu Helgoland auf hoher See.

**Ostsee:** ein fast geschlossenes Binnenmeer mit kaum spürbaren Gezeiten. Die Küste ist gegliedert in **Förden** (Kiel, Flensburg) und **Bodden** (Lagunen in Vorpommern). Hier liegen **Rügen** — mit 926 km² die größte Insel Deutschlands, berühmt für ihre Kreidefelsen — und Usedom, das Deutschland mit Polen teilt.

Verbunden sind beide Meere durch den **Nord-Ostsee-Kanal** zwischen Brunsbüttel und Kiel.

**Seen:** Der [[bodensee|Bodensee]] ist der größte See an Deutschlands Grenzen (geteilt mit Österreich und der Schweiz). Der größte See **vollständig** in Deutschland ist die **Müritz** in Mecklenburg-Vorpommern; der größte See Bayerns ist der **Chiemsee**, das „Bayerische Meer“.`,
    },
    {
      id: 'fact-kanal', type: 'callout', tone: 'fact', title: 'Die meistbefahrene Wasserstraße der Welt',
      md: `Der **Nord-Ostsee-Kanal** (international *Kiel Canal*, eröffnet 1895) ist die meistbefahrene künstliche Seeschifffahrtsstraße der Welt — pro Jahr passieren ihn fast 30.000 Schiffe. Er erspart ihnen den Umweg um Dänemark — mehrere hundert Kilometer.`,
    },
    {
      id: 'extrempunkte', type: 'match', title: 'Die Ränder Deutschlands',
      prompt: 'Ordne die Extrempunkte zu.',
      pairs: [['Nördlichster Punkt', 'List auf Sylt'], ['Südlichster Punkt', 'bei Oberstdorf (Allgäu)'], ['Westlichster Punkt', 'Selfkant (Kreis Heinsberg)'], ['Östlichster Punkt', 'bei Görlitz (Neiße)'], ['Höchster Punkt', 'Zugspitze'], ['Größte Insel', 'Rügen']],
    },
    {
      id: 'recall-reise', type: 'recall', title: 'Die große Deutschlandreise',
      prompt: 'Du fährst von **Sylt** zur **Zugspitze**. Beschreibe in 4–5 Sätzen, welche Landschaften, Flüsse und Gebirge du unterwegs siehst — und warum der Norden flach ist.',
      answer: `Start im **Wattenmeer** der Nordsee mit Ebbe und Flut. Danach das flache **Norddeutsche Tiefland** — flach, weil die Gletscher der Eiszeiten Moränen und Sand hinterlassen und das Land eingeebnet haben; unterwegs überquerst du Elbe (bei Hamburg) und Weser. Es folgt die **Mittelgebirgsschwelle** (z. B. Harz mit dem Brocken oder die Rhön), dann das **Schichtstufenland** mit Main und Fränkischer Alb. Hinter der **Donau** beginnt das **Alpenvorland** mit Eiszeitseen wie dem Chiemsee, und schließlich erreichst du die **Alpen** mit der Zugspitze, 2.962 m.`,
      hints: ['Welche Kraft hat den Norden geformt?', 'Welche Flüsse musst du von Nord nach Süd überqueren?'],
      cards: ['grosslandschaften', 'donau-richtung'],
    },
  ],
  cards: [
    { id: 'grosslandschaften', front: 'Die Großlandschaften Deutschlands von Nord nach Süd?', back: 'Küste/Inseln → Norddeutsches Tiefland → Mittelgebirgsschwelle → Südwestdeutsches Schichtstufenland → Alpenvorland → Alpen.' },
    { id: 'zugspitze', front: 'Höchster Berg Deutschlands — Höhe und Gebirge?', back: 'Zugspitze, 2.962 m, im Wettersteingebirge (Alpen) an der Grenze zu Österreich.' },
    { id: 'brocken', front: 'Höchster Berg des Harzes?', back: 'Der Brocken (1.141 m) in Sachsen-Anhalt — Schauplatz der Walpurgisnacht.' },
    { id: 'feldberg', front: 'Höchster Gipfel eines deutschen Mittelgebirges?', back: 'Feldberg im Schwarzwald, 1.493 m.' },
    { id: 'rhein', front: 'Längster und wasserreichster Fluss Deutschlands — wo entspringt, wo mündet er?', back: 'Der Rhein: Quelle in den Schweizer Alpen (Graubünden), Mündung in den Niederlanden in die Nordsee. Rund 865 km in Deutschland.' },
    { id: 'donau-richtung', front: 'Welcher große deutsche Fluss fließt nach Osten — und wohin?', back: 'Die Donau: von Donaueschingen bis ins Schwarze Meer (rund 2.850 km).' },
    { id: 'donau-hauptstaedte', front: 'Durch welche vier Hauptstädte fließt die Donau?', back: 'Wien, Bratislava, Budapest, Belgrad.' },
    { id: 'elbe', front: 'Wo entspringt die Elbe, wo mündet sie?', back: 'Im Riesengebirge (Tschechien); Mündung in die Nordsee bei Cuxhaven — vorbei an Dresden, Magdeburg, Hamburg.' },
    { id: 'weser', front: 'Aus welchen zwei Flüssen entsteht die Weser?', back: 'Aus Werra und Fulda, in Hann. Münden.' },
    { id: 'oder-neisse', front: 'Welche Flüsse bilden die Grenze zu Polen?', back: 'Oder und (Lausitzer) Neiße — die Oder-Neiße-Grenze.' },
    { id: 'wattenmeer', front: 'Was ist das Wattenmeer — und welchen Status hat es?', back: 'Flacher Küstenstreifen der Nordsee, der bei Ebbe trockenfällt; seit 2009 UNESCO-Weltnaturerbe.' },
    { id: 'ruegen', front: 'Größte Insel Deutschlands?', back: 'Rügen (926 km²) in der Ostsee, Mecklenburg-Vorpommern — bekannt für die Kreidefelsen.' },
    { id: 'mueritz', front: 'Größter See, der vollständig in Deutschland liegt?', back: 'Die Müritz (Mecklenburg-Vorpommern). Der Bodensee ist größer, wird aber mit Österreich und der Schweiz geteilt.' },
    { id: 'nok', front: 'Welcher Kanal verbindet Nord- und Ostsee?', back: 'Der Nord-Ostsee-Kanal (Brunsbüttel–Kiel, eröffnet 1895) — die meistbefahrene künstliche Seeschifffahrtsstraße der Welt.' },
    { id: 'main-donau', front: 'Was verbindet der Main-Donau-Kanal seit 1992?', back: 'Über Rhein, Main und Donau eine durchgehende Schifffahrtsstraße von der Nordsee bis zum Schwarzen Meer.' },
    { id: 'ausdehnung', front: 'Wie weit erstreckt sich Deutschland von Nord nach Süd?', back: 'Rund 876 km (Sylt bis Allgäu); von West nach Ost rund 640 km.' },
  ],
};
