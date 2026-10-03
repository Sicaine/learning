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
Deutschland erstreckt sich rund **876 km von Norden nach Süden** ([Sylt](wiki:Sylt|Sylt) bis [Allgäu](wiki:Allgäu|Allgäu)) und rund **640 km von Westen nach Osten**.[^wp-geographie-deutschlands] Auf dem Weg nach Süden wird es fast stufenweise höher:

1. **Küste und Inseln** an Nord- und Ostsee
2. das flache **[[norddeutsches-tiefland|Norddeutsche Tiefland]]**, geformt von den Gletschern der [Eiszeiten](wiki:Eiszeitalter|Ice age)
3. die **Mittelgebirgsschwelle** mit [Harz](wiki:Harz (Mittelgebirge)|Harz), [Eifel](wiki:Eifel|Eifel), [Thüringer Wald](wiki:Thüringer Wald|Thuringian Forest) und [Erzgebirge](wiki:Erzgebirge|Ore Mountains) ([[mittelgebirge]])
4. das **Südwestdeutsche Schichtstufenland** mit [Schwäbischer](wiki:Schwäbische Alb|Swabian Jura) und [Fränkischer Alb](wiki:Fränkische Alb|Franconian Jura), im Westen [Schwarzwald](wiki:Schwarzwald|Black Forest) und [Oberrheingraben](wiki:Oberrheinische Tiefebene|Upper Rhine Plain)
5. das **[Alpenvorland](wiki:Alpenvorland)** mit seinen Eiszeitseen — und schließlich
6. ein schmaler Streifen der **[[alpen|Alpen]]** mit der Zugspitze (2.962 m).`,
    },
    {
      id: 'map-landschaft', type: 'map', title: 'Deutschland von oben: Tiefland, Mittelgebirge, Alpen',
      view: 'de',
      layers: { cities: false },
      landscapes: ['Norddeutsche Tiefebene', 'Lüneburger Heide', 'Münsterland', 'Mecklenburgische Seenplatte', 'Schwarzwald', 'Alpenvorland', 'Allgäu', 'Sylt', 'Rügen'],
      points: [
        { lon: 10.985, lat: 47.421, label: 'Zugspitze', kind: 'peak', pos: 'l', detail: '**[Zugspitze](wiki:Zugspitze)** — mit 2.962 m der höchste Berg Deutschlands, im [Wettersteingebirge](wiki:Wettersteingebirge|Wetterstein) an der Grenze zu Österreich.' },
      ],
      caption: 'Die braunen Flächen sind Gebirge. Vom Wattenmeer im Norden steigt das Land über die Mittelgebirge bis zu den Alpen im Süden an.',
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
<tr><td>[Schwarzwald](wiki:Schwarzwald|Black Forest)</td><td>[Feldberg](wiki:Feldberg (Schwarzwald)|Feldberg, Baden-Württemberg), 1.493 m</td><td>Baden-Württemberg</td></tr>
<tr><td>[Bayerischer Wald](wiki:Bayerischer Wald|Bavarian Forest)</td><td>[Großer Arber](wiki:Großer Arber|Großer Arber), 1.456 m</td><td>Bayern</td></tr>
<tr><td>[Erzgebirge](wiki:Erzgebirge|Ore Mountains)</td><td>[Fichtelberg](wiki:Fichtelberg (Erzgebirge)|Fichtelberg), 1.215 m (dt. Seite)</td><td>Sachsen</td></tr>
<tr><td>[Harz](wiki:Harz (Mittelgebirge)|Harz)</td><td>[Brocken](wiki:Brocken|Brocken), 1.141 m</td><td>Sachsen-Anhalt</td></tr>
<tr><td>[Thüringer Wald](wiki:Thüringer Wald|Thuringian Forest)</td><td>[Großer Beerberg](wiki:Großer Beerberg|Großer Beerberg), 983 m</td><td>Thüringen</td></tr>
</table>

Der **Brocken** ist berühmt als Hexentanzplatz der [Walpurgisnacht](wiki:Walpurgisnacht|Walpurgis Night) — auch in Goethes *[Faust](wiki:Faust. Der Tragödie erster Teil|Faust, Part One)*. Und bis 1989 lag er im Sperrgebiet der [DDR-Grenze](wiki:Innerdeutsche Grenze|Inner German border).`,
    },
    {
      id: 'map-gebirge', type: 'map', title: 'Wo liegen die Mittelgebirge — und ihre höchsten Gipfel?',
      view: 'de',
      layers: { cities: false, mountainLabels: false },
      landscapes: ['Eifel', 'Rhön', 'Schwäbische Alb', 'Sauerland', 'Fichtelgebirge'],
      points: [
        { lon: 8.112, lat: 47.856, label: 'Feldberg (Schwarzwald)', kind: 'peak', pos: 'l', detail: '**[Feldberg](wiki:Feldberg (Schwarzwald)|Feldberg, Baden-Württemberg)** (1.493 m) — höchster Gipfel des [Schwarzwalds](wiki:Schwarzwald|Black Forest) und aller deutschen Mittelgebirge.' },
        { lon: 13.134, lat: 49.112, label: 'Großer Arber (Bayerischer Wald)', kind: 'peak', pos: 'r', detail: '**[Großer Arber](wiki:Großer Arber)** (1.456 m) — „König des [Bayerischen Waldes](wiki:Bayerischer Wald|Bavarian Forest)“, an der Grenze zu Tschechien.' },
        { lon: 12.955, lat: 50.429, label: 'Fichtelberg (Erzgebirge)', kind: 'peak', pos: 'r', detail: '**[Fichtelberg](wiki:Fichtelberg (Erzgebirge)|Fichtelberg)** (1.215 m) — höchster Berg Sachsens und des deutschen [Erzgebirges](wiki:Erzgebirge|Ore Mountains).' },
        { lon: 10.617, lat: 51.801, label: 'Brocken (Harz)', kind: 'peak', pos: 't', detail: '**[Brocken](wiki:Brocken)** (1.141 m) — höchster Berg des [Harzes](wiki:Harz (Mittelgebirge)|Harz) und Norddeutschlands; Schauplatz der [Walpurgisnacht](wiki:Walpurgisnacht|Walpurgis Night).' },
        { lon: 10.746, lat: 50.659, label: 'Großer Beerberg (Thüringer Wald)', kind: 'peak', pos: 't', detail: '**[Großer Beerberg](wiki:Großer Beerberg)** (983 m) — höchster Berg des [Thüringer Waldes](wiki:Thüringer Wald|Thuringian Forest).' },
        { lon: 10.985, lat: 47.421, label: 'Zugspitze (Alpen)', kind: 'peak', pos: 'l', detail: '**[Zugspitze](wiki:Zugspitze)** (2.962 m) — höchster Berg Deutschlands, in den Alpen.' },
      ],
      caption: 'Die Mittelgebirge sind alt und abgerundet; erst ganz im Süden, in den Alpen, wird es hochalpin.',
    },
    {
      id: 'match-gipfel', type: 'match', title: 'Gebirge und Gipfel',
      prompt: 'Ordne jedem Gebirge seinen höchsten Gipfel zu.',
      pairs: [['Harz', 'Brocken'], ['Schwarzwald', 'Feldberg'], ['Bayerischer Wald', 'Großer Arber'], ['Erzgebirge', 'Fichtelberg'], ['Wettersteingebirge (Alpen)', 'Zugspitze'], ['Thüringer Wald', 'Großer Beerberg']],
    },
    {
      id: 'map-quiz-gipfel', type: 'map', title: 'Finde den Gipfel',
      view: 'de',
      layers: { cities: false, mountainLabels: false },
      quiz: { rounds: 6 },
      points: [
        { lon: 8.112, lat: 47.856, label: 'Feldberg (Schwarzwald)', kind: 'peak' },
        { lon: 13.134, lat: 49.112, label: 'Großer Arber', kind: 'peak' },
        { lon: 12.955, lat: 50.429, label: 'Fichtelberg', kind: 'peak' },
        { lon: 10.617, lat: 51.801, label: 'Brocken', kind: 'peak' },
        { lon: 10.746, lat: 50.659, label: 'Großer Beerberg', kind: 'peak' },
        { lon: 10.985, lat: 47.421, label: 'Zugspitze', kind: 'peak' },
      ],
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

- **[[rhein|Rhein]]** — der wasserreichste und längste Fluss Deutschlands (rund 865 km in Deutschland, gesamt etwa 1.230 km). Aus den Schweizer Alpen durch den [[bodensee|Bodensee]], am Oberrhein Grenze zu Frankreich, durch das Mittelrheintal mit der [Loreley](wiki:Loreley|Lorelei) bis zur Mündung in den Niederlanden.[^wp-rhein]
- **[[elbe|Elbe]]** — aus dem [Riesengebirge](wiki:Riesengebirge|Giant Mountains) in Tschechien über [Dresden](wiki:Dresden|Dresden), [Magdeburg](wiki:Magdeburg|Magdeburg) und [Hamburg](wiki:Hamburg|Hamburg) in die Nordsee bei [Cuxhaven](wiki:Cuxhaven|Cuxhaven).
- **[Weser](wiki:Weser|Weser)** — entsteht in [Hann. Münden](wiki:Hann. Münden|Hann. Münden) aus [Werra](wiki:Werra|Werra) und [Fulda](wiki:Fulda (Fluss)|Fulda (river)) und mündet bei [Bremerhaven](wiki:Bremerhaven|Bremerhaven) in die Nordsee.
- **[Oder](wiki:Oder|Oder)** — bildet mit der [Neiße](wiki:Lausitzer Neiße|Lusatian Neisse) die Grenze zu Polen ([Oder-Neiße-Grenze](wiki:Oder-Neiße-Grenze|Oder–Neisse line)) und mündet in die Ostsee.
- **[[donau|Donau]]** — die Ausnahme: Sie entsteht bei [Donaueschingen](wiki:Donaueschingen|Donaueschingen) im Schwarzwald und fließt **nach Osten** bis ins Schwarze Meer, durch vier Hauptstädte ([Wien](wiki:Wien|Vienna), [Bratislava](wiki:Bratislava|Bratislava), [Budapest](wiki:Budapest|Budapest), [Belgrad](wiki:Belgrad|Belgrade)).[^wp-donau]

Wichtige Nebenflüsse des Rheins sind **[Main](wiki:Main|Main (river))**, **[Mosel](wiki:Mosel|Moselle)** und **[Neckar](wiki:Neckar|Neckar)**. Seit 1992 verbindet der **[Main-Donau-Kanal](wiki:Main-Donau-Kanal|Rhine–Main–Danube Canal)** Nordsee und Schwarzes Meer durchgehend per Schiff.`,
    },
    {
      id: 'map-fluesse', type: 'map', title: 'Die großen Flüsse Deutschlands',
      view: [3.7, 47.1, 16.0, 55.1],
      layers: { cities: false },
      rivers: [
        { name: 'Rhein', labelAt: 0.3 }, { name: 'Donau', labelAt: 0.4 }, { name: 'Elbe', labelAt: 0.5 }, { name: 'Weser', labelAt: 0.5 }, { name: 'Oder', labelAt: 0.45 },
        { name: 'Main', labelAt: 0.5 }, { name: 'Mosel', labelAt: 0.5 }, { name: 'Neckar', labelAt: 0.5 }, { name: 'Ems', labelAt: 0.5 }, { name: 'Inn', labelAt: 0.5 },
      ],
      places: [
        { name: 'Hamburg', detail: '**[Hamburg](wiki:Hamburg)** — an der unteren [Elbe](wiki:Elbe), rund 100 km vor der Mündung in die Nordsee.' },
        { name: 'Dresden', detail: '**[Dresden](wiki:Dresden)** — die Elbe fließt hier durch das Elbtal Richtung Norden.' },
        { name: 'Magdeburg', detail: '**[Magdeburg](wiki:Magdeburg)** — Stadt an der mittleren Elbe.' },
        { name: 'Köln', detail: '**[Köln](wiki:Köln|Cologne)** — größte Stadt am Rhein.' },
        { name: 'Mainz', detail: '**[Mainz](wiki:Mainz)** — gegenüber von Mainz mündet der Main in den Rhein.' },
        { name: 'Koblenz', detail: '**[Koblenz](wiki:Koblenz)** — hier mündet die Mosel in den Rhein (am Deutschen Eck).' },
        { name: 'Passau', detail: '**[Passau](wiki:Passau)** — das „Dreiflüsseeck“: Donau, Inn und Ilz treffen sich.' },
        { name: 'Cuxhaven', kind: 'site', detail: '**[Cuxhaven](wiki:Cuxhaven)** — hier mündet die Elbe in die Nordsee.' },
        { name: 'Bremerhaven', kind: 'site', pos: 'l', detail: '**[Bremerhaven](wiki:Bremerhaven)** — hier mündet die Weser in die Nordsee.' },
      ],
      points: [
        { lon: 8.503, lat: 47.953, label: 'Donauquelle', kind: 'site', detail: '**[Donaueschingen](wiki:Donaueschingen)** — hier vereinigen sich die Quellflüsse Brigach und Breg zur Donau. Von hier fließt sie nach Osten.' },
        { lon: 9.650, lat: 51.417, label: 'Weserquelle', kind: 'site', pos: 'l', detail: '**[Hann. Münden](wiki:Hann. Münden)** — hier fließen [Werra](wiki:Werra) und [Fulda](wiki:Fulda (Fluss)|Fulda (river)) zusammen; ab hier heißt der Fluss Weser.' },
        { lon: 4.129, lat: 51.981, label: 'Rheinmündung', kind: 'site', pos: 'r', detail: '**[Hoek van Holland](wiki:Hoek van Holland|Hook of Holland)** — bei Rotterdam erreicht das Wasser des Rheins über [Waal](wiki:Waal (Fluss)|Waal (river)) und Nieuwe Waterweg die Nordsee ([Rhein-Maas-Delta](wiki:Rhein-Maas-Delta|Rhine–Meuse–Scheldt Delta)).' },
        { lon: 14.548, lat: 53.432, label: 'Odermündung', kind: 'site', pos: 'r', detail: '**[Stettin](wiki:Stettin|Szczecin)** (Szczecin) — hinter der Stadt fließt die Oder ins [Stettiner Haff](wiki:Stettiner Haff|Szczecin Lagoon) und weiter in die Ostsee.' },
      ],
      lines: [
        { label: 'Main-Donau-Kanal', dashed: true, color: '#0d9488', labelAt: 0.5, coords: [[10.892, 49.892], [11.079, 49.456], [11.870, 48.916]], detail: 'Der **[Main-Donau-Kanal](wiki:Main-Donau-Kanal|Rhine–Main–Danube Canal)** verbindet seit 1992 von Bamberg über Nürnberg bis Kelheim den Main mit der Donau — und damit Nordsee und Schwarzes Meer.' },
      ],
      caption: 'Fast alle großen Flüsse fließen nach Norden. Die Donau ist die Ausnahme: Sie fließt nach Osten und verlässt die Karte am rechten Rand Richtung Schwarzes Meer.',
    },
    {
      id: 'map-rhein', type: 'map', title: 'Der Rhein von der Quelle bis zur Mündung',
      intro: 'Folge dem Fluss der Nummern nach — von den Schweizer Alpen bis zur Nordsee.',
      view: [3.6, 46.4, 10.2, 52.4],
      layers: { cities: false },
      rivers: [{ name: 'Rhein', labelAt: 0.55 }, { name: 'Main' }, { name: 'Mosel' }, { name: 'Neckar' }, { name: 'Aare' }, { name: 'Ruhr', label: false }],
      points: [
        { lon: 8.672, lat: 46.633, label: 'Tomasee', num: 1, pos: 'r', detail: '**[Tomasee](wiki:Tomasee)** — der Quellsee des Vorderrheins in den Schweizer Alpen (Graubünden), auf rund 2.300 m Höhe.' },
        { lon: 8.616, lat: 47.677, label: 'Rheinfall', num: 3, pos: 'l', detail: '**[Rheinfall](wiki:Rheinfall|Rhine Falls)** bei Schaffhausen — einer der größten Wasserfälle Europas.' },
        { lon: 4.129, lat: 51.981, label: 'Mündung', num: 12, pos: 'r', detail: '**[Hoek van Holland](wiki:Hoek van Holland|Hook of Holland)** — der Rhein erreicht bei Rotterdam die Nordsee.' },
      ],
      places: [
        { name: 'Konstanz', num: 2, pos: 'r', detail: '**[Konstanz](wiki:Konstanz)** — hier verlässt der Rhein den [Bodensee](wiki:Bodensee|Lake Constance).' },
        { name: 'Basel', num: 4, pos: 'l', detail: '**[Basel](wiki:Basel)** — am „Rheinknie“ biegt der Rhein nach Norden ab; ab hier beginnt der Oberrhein. Basel liegt im Dreiländereck Schweiz–Frankreich–Deutschland.' },
        { name: 'Straßburg', num: 5, pos: 'l', detail: '**[Straßburg](wiki:Straßburg|Strasbourg)** — der Rhein bildet hier die Grenze zwischen Frankreich und Deutschland.' },
        { name: 'Mannheim', num: 6, pos: 'r', detail: '**[Mannheim](wiki:Mannheim)** — hier mündet der [Neckar](wiki:Neckar) in den Rhein.' },
        { name: 'Mainz', num: 7, pos: 'r', detail: '**[Mainz](wiki:Mainz)** — hier mündet der [Main](wiki:Main|Main (river)) in den Rhein.' },
        { name: 'Loreley', num: 8, pos: 'l', kind: 'site', detail: 'Die **[Loreley](wiki:Loreley|Lorelei)** — der Schieferfelsen im [Oberen Mittelrheintal](wiki:Oberes Mittelrheintal|Rhine Gorge), seit 2002 UNESCO-Welterbe.' },
        { name: 'Koblenz', num: 9, pos: 'r', detail: '**[Koblenz](wiki:Koblenz)** — am Deutschen Eck mündet die Mosel in den Rhein.' },
        { name: 'Köln', num: 10, pos: 'r', detail: '**[Köln](wiki:Köln|Cologne)** — die größte Stadt am Rhein; der Dom liegt direkt am Ufer.' },
        { name: 'Duisburg', num: 11, pos: 'r', detail: '**[Duisburg](wiki:Duisburg)** — hier mündet die Ruhr in den Rhein; der Hafen gilt als größter Binnenhafen der Welt.' },
      ],
      caption: 'Der Rhein ist rund 1.230 km lang; etwa 865 km davon fließen durch Deutschland. Dünne Linien: weitere Flüsse.',
    },
    {
      id: 'quiz-nordsee', type: 'quiz', title: 'Wohin fließen sie?',
      question: 'Welche dieser Flüsse münden (direkt oder über ihre Mündung) in die **Nordsee**?',
      options: [
        { text: 'Rhein', correct: true, why: 'Er mündet in den Niederlanden ([Rhein-Maas-Delta](wiki:Rhein-Maas-Delta|Rhine–Meuse–Scheldt Delta)).' },
        { text: 'Elbe', correct: true, why: 'Mündung bei [Cuxhaven](wiki:Cuxhaven|Cuxhaven).' },
        { text: 'Weser', correct: true, why: 'Mündung bei [Bremerhaven](wiki:Bremerhaven|Bremerhaven).' },
        { text: 'Donau', correct: false, why: 'Sie fließt nach Osten ins [Schwarze Meer](wiki:Schwarzes Meer|Black Sea).' },
        { text: 'Oder', correct: false, why: 'Sie mündet über das [Stettiner Haff](wiki:Stettiner Haff|Szczecin Lagoon) in die Ostsee.' },
      ],
    },
    {
      id: 'laengen', type: 'order', title: 'Nach Länge sortieren',
      prompt: 'Sortiere die Flüsse nach ihrer **Gesamtlänge**, den längsten zuerst.',
      items: ['Donau (rund 2.850 km)', 'Rhein', 'Elbe', 'Oder', 'Weser'],
      explain: 'Donau ≈ 2.850 km, Rhein ≈ 1.230 km, Elbe ≈ 1.090 km, Oder ≈ 850 km, Weser ≈ 450 km (ohne ihren Quellfluss Werra).',
    },
    {
      id: 'map-quiz-fluesse', type: 'map', title: 'Finde den Fluss',
      view: [3.7, 47.1, 16.0, 55.1],
      layers: { cities: false },
      quiz: { rounds: 8 },
      rivers: [
        { name: 'Rhein', quiz: true }, { name: 'Elbe', quiz: true }, { name: 'Donau', quiz: true }, { name: 'Weser', quiz: true },
        { name: 'Oder', quiz: true }, { name: 'Main', quiz: true }, { name: 'Mosel', quiz: true }, { name: 'Neckar', quiz: true },
      ],
    },
    {
      id: 'kuesten', type: 'text', title: 'Zwei Meere, zwei Küsten',
      md: `
**[Nordsee](wiki:Nordsee|North Sea):** offenes Meer mit starken [[gezeiten|Gezeiten]]. Vor der Küste liegt das **[[wattenmeer|Wattenmeer]]**, seit 2009 [UNESCO-Weltnaturerbe](wiki:UNESCO-Welterbe|World Heritage Site)[^unesco-wattenmeer] — bei Ebbe kann man zu Fuß zu manchen Inseln laufen. Inseln: die [Ostfriesischen](wiki:Ostfriesische Inseln|East Frisian Islands) (z. B. [Borkum](wiki:Borkum|Borkum), [Norderney](wiki:Norderney|Norderney)) und die [Nordfriesischen](wiki:Nordfriesische Inseln|North Frisian Islands) ([Sylt](wiki:Sylt|Sylt), [Föhr](wiki:Föhr|Föhr), [Amrum](wiki:Amrum|Amrum)), dazu [Helgoland](wiki:Helgoland|Heligoland) auf hoher See.

**[Ostsee](wiki:Ostsee|Baltic Sea):** ein fast geschlossenes Binnenmeer mit kaum spürbaren Gezeiten. Die Küste ist gegliedert in **[Förden](wiki:Förde|Förden and East Jutland Fjorde)** ([Kiel](wiki:Kiel|Kiel), [Flensburg](wiki:Flensburg|Flensburg)) und **[Bodden](wiki:Bodden|Bodden)** (Lagunen in Vorpommern). Hier liegen **[Rügen](wiki:Rügen|Rügen)** — mit 926 km² die größte Insel Deutschlands, berühmt für ihre [Kreidefelsen](wiki:Kreidefelsen auf Rügen|Chalk Cliffs on Rügen) — und [Usedom](wiki:Usedom|Usedom), das Deutschland mit Polen teilt.

Verbunden sind beide Meere durch den **[Nord-Ostsee-Kanal](wiki:Nord-Ostsee-Kanal|Kiel Canal)** zwischen [Brunsbüttel](wiki:Brunsbüttel|Brunsbüttel) und Kiel.

**Seen:** Der [[bodensee|Bodensee]] ist der größte See an Deutschlands Grenzen (geteilt mit Österreich und der Schweiz). Der größte See **vollständig** in Deutschland ist die **[Müritz](wiki:Müritz|Müritz)** in Mecklenburg-Vorpommern; der größte See Bayerns ist der **[Chiemsee](wiki:Chiemsee|Chiemsee)**, das „Bayerische Meer“.`,
    },
    {
      id: 'map-kuesten', type: 'map', title: 'Nordsee, Ostsee und der Kanal dazwischen',
      view: [5.4, 52.9, 14.9, 55.3],
      layers: { cities: false },
      landscapes: ['Wattenmeer', 'Sylt', 'Rügen', 'Helgoland', 'Usedom', 'Fehmarn'],
      places: [
        { name: 'Kiel', pos: 't', detail: '**[Kiel](wiki:Kiel)** — Landeshauptstadt an der Kieler Förde; hier liegt die Ostsee-Einfahrt des Nord-Ostsee-Kanals.' },
        { name: 'Flensburg', detail: '**[Flensburg](wiki:Flensburg)** — Hafenstadt an der gleichnamigen [Förde](wiki:Förde|Förden and East Jutland Fjorde), unweit der dänischen Grenze.' },
        { name: 'Hamburg', pos: 'b' }, { name: 'Cuxhaven', pos: 'l' }, { name: 'Bremerhaven', pos: 'l' }, { name: 'Rostock' },
      ],
      points: [
        { lon: 6.670, lat: 53.588, label: 'Borkum', pos: 'l', detail: '**[Borkum](wiki:Borkum)** — die westlichste der [Ostfriesischen Inseln](wiki:Ostfriesische Inseln|East Frisian Islands).' },
        { lon: 7.147, lat: 53.707, label: 'Norderney', pos: 't', detail: '**[Norderney](wiki:Norderney)** — Ostfriesische Insel, Nordseebad seit 1797.' },
        { lon: 13.662, lat: 54.573, label: 'Königsstuhl', kind: 'site', pos: 'r', detail: 'Der **Königsstuhl** im Nationalpark Jasmund ist der berühmteste Punkt der [Kreidefelsen auf Rügen](wiki:Kreidefelsen auf Rügen|Chalk Cliffs on Rügen).' },
      ],
      lines: [
        { label: 'Nord-Ostsee-Kanal', color: '#0d9488', labelAt: 0.22, coords: [[9.139, 53.896], [9.663, 54.306], [10.142, 54.373]], detail: 'Der **[Nord-Ostsee-Kanal](wiki:Nord-Ostsee-Kanal|Kiel Canal)** verbindet Nord- und Ostsee zwischen [Brunsbüttel](wiki:Brunsbüttel) und Kiel-Holtenau (über Rendsburg).' },
      ],
      caption: 'Nordsee links, Ostsee rechts — dazwischen der Nord-Ostsee-Kanal. Tippe auf einen Marker für Details.',
    },
    {
      id: 'map-seen', type: 'map', title: 'Die drei großen Seen',
      view: 'de',
      layers: { cities: false },
      points: [
        { lon: 9.467, lat: 47.583, label: 'Bodensee', color: '#2f6fb6', pos: 'l', detail: 'Der **[Bodensee](wiki:Bodensee|Lake Constance)** ist der größte See an Deutschlands Grenzen; er wird mit Österreich und der Schweiz geteilt.' },
        { lon: 12.683, lat: 53.417, label: 'Müritz', color: '#2f6fb6', pos: 'r', detail: 'Die **[Müritz](wiki:Müritz)** ist der größte See, der vollständig in Deutschland liegt.' },
        { lon: 12.470, lat: 47.890, label: 'Chiemsee', color: '#2f6fb6', pos: 'r', detail: 'Der **[Chiemsee](wiki:Chiemsee)** — das „Bayerische Meer“, der größte See Bayerns.' },
      ],
      caption: 'Bodensee im Süden, Chiemsee in Bayern und die Müritz in Mecklenburg-Vorpommern.',
    },
    {
      id: 'fact-kanal', type: 'callout', tone: 'fact', title: 'Die meistbefahrene Wasserstraße der Welt',
      md: `Der **[Nord-Ostsee-Kanal](wiki:Nord-Ostsee-Kanal|Kiel Canal)** (international *Kiel Canal*, eröffnet 1895) ist die meistbefahrene künstliche Seeschifffahrtsstraße der Welt — pro Jahr passieren ihn fast 30.000 Schiffe. Er erspart ihnen den Umweg um Dänemark — mehrere hundert Kilometer.`,
    },
    {
      id: 'extrempunkte', type: 'match', title: 'Die Ränder Deutschlands',
      prompt: 'Ordne die Extrempunkte zu.',
      pairs: [['Nördlichster Punkt', 'List auf Sylt'], ['Südlichster Punkt', 'bei Oberstdorf (Allgäu)'], ['Westlichster Punkt', 'Selfkant (Kreis Heinsberg)'], ['Östlichster Punkt', 'bei Görlitz (Neiße)'], ['Höchster Punkt', 'Zugspitze'], ['Größte Insel', 'Rügen']],
    },
    {
      id: 'map-quiz-extrem', type: 'map', title: 'Finde die Ränder Deutschlands',
      view: 'de',
      layers: { cities: false },
      quiz: { rounds: 6 },
      points: [
        { lon: 8.433, lat: 55.000, label: 'Nördlichster Punkt', kind: 'site', detail: '**List auf Sylt**' },
        { lon: 10.174, lat: 47.272, label: 'Südlichster Punkt', kind: 'site', detail: '**Haldenwanger Eck** bei Oberstdorf' },
        { lon: 5.880, lat: 51.041, label: 'Westlichster Punkt', kind: 'site', detail: '**Selfkant** (Isenbruch)' },
        { lon: 15.025, lat: 51.259, label: 'Östlichster Punkt', kind: 'site', detail: '**Deschka** bei Görlitz' },
        { lon: 10.985, lat: 47.421, label: 'Höchster Punkt', kind: 'peak', detail: '**Zugspitze**' },
        { lon: 13.400, lat: 54.450, label: 'Größte Insel', kind: 'site', detail: '**Rügen**' },
      ],
    },
    {
      id: 'recall-reise', type: 'recall', title: 'Die große Deutschlandreise',
      prompt: 'Du fährst von **Sylt** zur **[Zugspitze](wiki:Zugspitze|Zugspitze)**. Beschreibe in 4–5 Sätzen, welche Landschaften, Flüsse und Gebirge du unterwegs siehst — und warum der Norden flach ist.',
      answer: `Start im **Wattenmeer** der Nordsee mit Ebbe und Flut. Danach das flache **Norddeutsche Tiefland** — flach, weil die Gletscher der Eiszeiten Moränen und Sand hinterlassen und das Land eingeebnet haben; unterwegs überquerst du [Elbe](wiki:Elbe|Elbe) (bei Hamburg) und [Weser](wiki:Weser|Weser). Es folgt die **Mittelgebirgsschwelle** (z. B. [Harz](wiki:Harz (Mittelgebirge)|Harz) mit dem [Brocken](wiki:Brocken|Brocken) oder die [Rhön](wiki:Rhön|Rhön Mountains)), dann das **Schichtstufenland** mit Main und Fränkischer Alb. Hinter der **Donau** beginnt das **Alpenvorland** mit Eiszeitseen wie dem [Chiemsee](wiki:Chiemsee|Chiemsee), und schließlich erreichst du die **Alpen** mit der Zugspitze, 2.962 m.`,
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
