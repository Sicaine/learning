export default {
  id: 'ionosphaere-und-kurzwelle',
  title: 'Ionosphäre und Kurzwellenausbreitung',
  summary: 'D-, E- und F-Region, Raumwelle und Bodenwelle, Sprungdistanz und tote Zone, MUF und LUF, Sonnenzyklus, Fading, Greyline, Mögel-Dellinger-Effekt und der lange Weg.',
  minutes: 34,
  goals: [
    'Erklären, wie die [[ionosphaere]] Kurzwellen durch Refraktion zur Erde zurücklenkt und welche Rolle D-, E- und F-Region tagsüber und nachts spielen',
    '[[raumwelle]], [[bodenwelle]], Sprungdistanz und [[tote-zone]] unterscheiden und erklären, warum eine Frequenz „frei“ erscheinen kann, obwohl sie besetzt ist',
    '[[muf]] und [[luf]] erklären und Sonnenzyklus, Ionisation und nutzbare Bänder zusammenbringen (10 m im Fleckenmaximum, 80/160 m am Tag nur Bodenwelle)',
    '[[fading]], [[greyline]], [[moegel-dellinger-effekt]] und den langen Weg ([[long-path]]) in einem Satz erklären',
    'Erklären, warum die tote Zone mit Frequenz und Region wächst, und Fading als Interferenz mehrerer Wellen rechnen und beobachten',
    'Begründen, warum die Greyline besondere DX-Chancen bietet (D-Region schwach, E/F wirken) und warum der Mögel-Dellinger-Effekt tiefe Frequenzen am stärksten trifft',
  ],
  needs: ['amateurfunk/ausbreitung-ueber-30-mhz'],
  blocks: [
    {
      id: 'intro', type: 'text', title: 'Wie Kurzwellen um die Erde kommen',
      md: `
Auf Kurzwelle (3 bis 30 MHz) erreichst du mit wenigen Watt Stationen auf der anderen Seite der Erde. Das liegt nicht an der Sendeleistung, sondern an einer Schicht in der Hochatmosphäre: der **[[ionosphaere|Ionosphäre]]** ([Ionosphäre](wiki:Ionosphäre|Ionosphere)). Dort schlägt die kurzwellige Strahlung der Sonne (extremes Ultraviolett und Röntgenstrahlung) **Elektronen aus den Atomen und Molekülen** von Sauerstoff und Stickstoff (**Ionisation**). Es entstehen freie Elektronen und positive Ionen. Eine Funkwelle regt die freien Elektronen zum Mitschwingen an; dadurch wird sie **gebrochen (refraktiert)** und läuft zur Erdoberfläche zurück. Das wirkt wie eine Reflexion, ist aber **Brechung an elektrisch geladenen Teilchen**, nicht an Wolken, Hoch- und Tiefdruckgebieten, Wärme, Kälte oder Temperaturübergängen.[^darc-50ohm]

Wie stark gebrochen wird, hängt von der **Elektronendichte** ab: Je höher die Dichte, desto höhere Frequenzen werden noch zurückgelenkt. Frequenzen, die für die Dichte zu hoch sind, durchdringen die Ionosphäre und gehen in den Weltraum (deshalb funkt man mit der ISS auf 2 m, oberhalb jeder typischen MUF).
`,
    },
    {
      id: 'regionen', type: 'text', title: 'D-, E- und F-Region',
      md: `
Weil die Ionisation tagsüber ständig entsteht und die Elektronen sich sofort wieder mit Ionen verbinden wollen (**Rekombination**), stellt sich in bestimmten Höhen ein Gleichgewicht ein. Die so entstehenden Gebiete heißen **Regionen** (auch „Schichten“). Für Kurzwelle zählen drei:

| Region | Höhe | Wirkung |
|---|---|---|
| **D** | etwa 50 bis 90 km | Zu dichte Luft: die schwingenden Elektronen stoßen ständig an Teilchen und die Welle **verliert Energie**. Die D-Region **dämpft**, bis zur Auslöschung; tiefe Frequenzen am stärksten, über etwa 10 MHz kaum noch. Nur **tagsüber**; nach Sonnenuntergang löst sie sich praktisch auf. |
| **E** | etwa 90 bis 130 km | Bricht schräg einfallende Wellen bis etwa 10 MHz, mit einem Sprung etwas über 2000 km. Löst sich nachts binnen Minuten auf. Im Sommer: **Sporadic-E** (siehe vorige Lektion), das viel höhere Frequenzen bricht. |
| **F** | etwa 130 bis 450 km | Tagsüber in **F1** und das darüberliegende **F2** gespalten. **F2** ist für DX am wichtigsten: Sprünge bis etwa 4000 km, und wegen der dünnen Luft rekombinieren die Elektronen langsam, die Region bleibt **auch nachts** erhalten. |

Daraus folgen die Tag-Nacht-Regeln:

- **Tagsüber** dämpft die D-Region die unteren Bänder: **160 m und 80 m** sind tagsüber „leer“ und für weltweiten Funk ungeeignet. Dort gibt es tagsüber nur die **Bodenwelle**; eine Raumwelle kann wegen der D-Dämpfung nicht entstehen.
- **Nachts** verschwinden D und E, die **F2-Region** übernimmt den gesamten Langstreckenverkehr, und 80 m öffnet für DX **über die F2-Region**. Ihre Elektronendichte sinkt ohne Sonne, deshalb sinkt die höchste gebrochene Frequenz: Die **oberen Bänder schließen zuerst**.
- Sporadic-E: im Sommer gelegentlich gute Ausbreitung vom oberen Kurzwellenbereich bis in den UKW-Bereich.
`,
    },
    {
      id: 'schichten-tabelle', type: 'text', title: 'Tag und Nacht im Überblick',
      md: `
Wer zwischen D, E und F nicht durcheinanderkommen will, hält sich an **zwei Fragen**: *Dämpft* die Region oder *bricht* sie? Und: *Gibt es sie nachts noch?*

| Region | Tag | Nacht | bricht / dämpft | typischer Beitrag |
|---|---|---|---|---|
| **D** (50–90 km) | ja | löst sich praktisch auf | **dämpft** tiefe Frequenzen (bis etwa 10 MHz relevant) | 160 m und 80 m tagsüber leer |
| **E** (90–130 km) | ja | löst sich binnen Minuten auf | bricht schräge Wellen bis etwa 10 MHz | Sprünge bis etwas über 2000 km; im Sommer **Sporadic-E** |
| **F1** | ja | verschmilzt mit F2 | bricht (Zwischenstufe) | ohne eigene Rolle in den Prüfungsfragen |
| **F2** (bis etwa 450 km) | ja | **bleibt** (dünne Luft: langsame Rekombination) | bricht | DX mit Sprüngen bis etwa 4000 km, auch nachts |

Grund für das Verhalten ist die **Rekombination**: Sobald nach Sonnenuntergang die Strahlung fehlt, finden die freien Elektronen ihre Ionen wieder. In der dichten Luft der D-Region geschieht das sofort, in der dünnen Luft der F2-Region dauert es sehr lange. Aber auch dort sinkt die Zahl der Elektronen und damit die gerade noch gebrochene Frequenz: **die oberen Bänder schließen zuerst.**[^darc-50ohm]
`,
    },
    {
      id: 'demo-ion', type: 'viz', viz: 'ionosphaere-sprung', title: 'Ionosphäre: Sprung, tote Zone, MUF',
      params: { tod: 'day', f: 14.2, al: 20 },
      intro: 'Stelle **Tageszeit**, **Sonnenfleckenzyklus**, **Frequenz** und **Abstrahlwinkel** ein. Der Strahl wird an der E- oder F2-Region gebrochen (oder durchdringt sie). Rote Zone am Boden: **tote Zone**, grün: Bodenwelle. Schalte den Strahlenfächer ein, um zu sehen, wie sich der Abstrahlwinkel auf die Sprungdistanz auswirkt.',
      task: 'Erreiche nachts auf 80 m eine F2-Raumwelle, am Tag im Fleckenmaximum auf 10 m, überschreite die MUF und finde einen steilen Strahl mit einem Sprung unter 1500 km.',
    },
    {
      id: 'sprung', type: 'text', title: 'Raumwelle, Bodenwelle, Sprung und tote Zone',
      md: `
Die Ausbreitungswege auf Kurzwelle im Überblick:

- **Direkte Welle:** geradlinig bei Sichtverbindung.
- **[[raumwelle|Raumwelle]]** ([Raumwelle](wiki:Raumwelle|Skywave)): Weg über die Ionosphäre. Ein **Sprung** (Hop) ist der Weg von der Sendeantenne bis zur Rückkehr zur Erde nach einer Brechung. Mehrere Sprünge (Erde reflektiert wieder nach oben) tragen um die halbe Erde.
- **[[bodenwelle|Bodenwelle]]** ([Bodenwelle](wiki:Bodenwelle|Ground wave)): läuft am Boden entlang und **folgt der Erdkrümmung, geht also über den geografischen Horizont hinaus**. Das klappt umso besser, je **niedriger die Frequenz** und je leitfähiger der Boden ist, und die Welle muss **vertikal polarisiert** sein. Höhere Frequenzen werden **stärker gedämpft** als niedrigere. Die Bodenwelle ist deshalb vor allem auf Lang- und Mittelwelle wichtig (jeden Mittelwellensender tagsüber hörst du über die Bodenwelle); auf Kurzwelle nur noch auf den unteren Bändern, etwa 160 m. Tagsüber läuft das **160-m-Band** deshalb hauptsächlich über die Bodenwelle, weil die D-Region die Raumwelle verschluckt.

**Sprungdistanz:** Sie lässt sich **rein geometrisch** bestimmen und hängt von der **Höhe der brechenden Region** und vom **Abstrahlwinkel der Antenne** ab (gegen den Horizont gemessen). Je **flacher** der Winkel und je **höher** die Region, desto größer die Sprungdistanz. Dagegen spielen **Polarisation, Sendeleistung und Antennengewinn** für die Sprungdistanz keine Rolle.

**[[tote-zone|Tote Zone]]:** Der Bereich, den die **Bodenwelle nicht mehr** und die **Raumwelle noch nicht** erreicht (genau genommen ein Ring um den Sender). In der toten Zone kannst du eine Station weder hören noch wird sie dich hören. Das erklärt ein typisches Betriebserlebnis: Eine Frequenz **erscheint frei**, wird aber gleich darauf von einer Station belegt: Die Station liegt **in deiner toten Zone**, du konntest sie nicht hören. Es liegt nicht an einem Seitenbandfehler, schlechten Ausbreitungsbedingungen oder dem Mögel-Dellinger-Effekt. Hör deshalb vor dem Senden, frag „Is the frequency in use?“ und warte kurz.
`,
    },
    {
      id: 'skip-frequenz', type: 'text', title: 'Wie groß ist die tote Zone? Frequenz, Winkel und Region',
      md: `
Die tote Zone ist **kein fester Wert**. Sie reicht von dem Punkt, an dem die Bodenwelle ausläuft, bis zum Aufsetzpunkt der Raumwelle; das ist die Entfernung des ersten Sprungs (mit dem flachsten nutzbaren Strahl). Vier Stellschrauben bestimmen sie:

1. **Brechende Region:** Höher liegende Region (F2 statt E), größerer Sprung, **größere tote Zone**. Bei Sporadic-E ist sie deshalb klein: „Short Skip“.
2. **Abstrahlwinkel:** Flacher Strahl, weiterer Sprung. Ein **steiler** Strahl kommt dichter am Sender zurück, sofern die Frequenz ihn noch bricht.
3. **Frequenz:** Je höher die Frequenz (unterhalb der MUF), desto weniger wird ein steiler Strahl noch gebrochen: Er durchdringt die Region, nur flache Strahlen werden zurückgelenkt. Die **tote Zone wächst** also mit der Frequenz. Tiefe Bänder (80 m nachts) haben eine kleine tote Zone, hohe (10 m) eine große.
4. **Tageszeit und Sonnenzyklus:** Sie bestimmen die Ionisation, damit die MUF und so, welche Strahlen noch ankommen.

**Mehrere Sprünge:** Die Erde reflektiert die ankommende Welle wieder nach oben; dann folgt ein zweiter Sprung. Mit **zwei F2-Sprüngen** sind es bis etwa 8000 km, mit mehreren rund um die Welt. Jeder Sprung kostet Dämpfung (auf der Erde und in der D-Region beim Durchgang), deshalb ist die **Zahl der Sprünge** bei der Wahl von Band und Zeit wichtig.

Zum Weiterlesen: [Tote Zone](wiki:Tote Zone|Skip zone) und [Appleton-Schicht (F-Region)](wiki:Appleton-Schicht|F region).
`,
    },
    {
      id: 'warn-tote', type: 'callout', tone: 'warning', title: 'Verwechslungen: tote Zone und Bodenwelle',
      md: `Die tote Zone liegt **zwischen** dem Ende der Bodenwelle und dem Aufsetzpunkt der Raumwelle; sie ist nicht der Bereich, in dem die Bodenwelle andere Stationen „zudeckt“, nicht der, der nur von der Bodenwelle erreicht wird, und nicht eine Zone der gegenseitigen Auslöschung. Und: Die Bodenwelle folgt der Erdkrümmung und wird mit **steigender** Frequenz stärker gedämpft, nicht schwächer. Prüfungsbezug: EH201, EH208, EH212, BE106.`,
    },
    {
      id: 'muf', type: 'text', title: 'MUF und LUF: das nutzbare Frequenzfenster',
      md: `
Für eine Verbindung über die Raumwelle braucht man eine Frequenz, die die Ionosphäre **zuverlässig zurückbricht**. Meist ist das ein ganzer Bereich, begrenzt durch zwei Frequenzen:

- Nach oben begrenzt die **[[muf|MUF]]** (maximum usable frequency, **höchste nutzbare Frequenz**) [Maximum Usable Frequency](wiki:Maximum Usable Frequency|Maximum usable frequency): die höchste Frequenz, die die Ionosphäre für die Entfernung zwischen den Stationen gerade noch zurückbrechen kann. Sie hängt von der **Elektronendichte** der brechenden Region (hier F2) und vom **Einfallswinkel** ab. **Je stärker die Ionisation, desto höher die MUF**: tagsüber höher als nachts, im Fleckenmaximum höher als im Minimum. Beispiel: Liegt die MUF bei 7,5 MHz, werden 3,5 MHz und 7 MHz noch zurückgebrochen, höhere Frequenzen gehen in den Weltraum.
- Nach unten begrenzt die **[[luf|LUF]]** (lowest usable frequency, **niedrigste nutzbare Frequenz**): darunter ist die Dämpfung zu stark. Sie hängt vor allem vom **Ionisationsgrad der D-Region** ab (und von Sendeleistung, Antenne und Empfängerempfindlichkeit). Bei sehr geringer Sonnenaktivität oder Magnetstürmen kann die LUF über der MUF liegen: dann ist auf dieser Strecke kein Raumwellenfunk möglich.

Willst du arbeiten, **nahe der MUF**, und höher funken, muss die Ionisation der brechenden Region **zunehmen**. Daran siehst du: Die MUF ist die **höchste**, nicht die niedrigste, mittlere oder kritische Frequenz.

<details><summary>Vertiefung: Wie hängt die MUF vom Winkel ab? (Klasse A)</summary>
Die Ionosphäre bricht eine Welle, die unter dem Winkel $\\varphi$ zur Senkrechten einfällt, noch bei der Frequenz $f\\le f_\\mathrm{krit}/\\cos\\varphi$. Flache Strahlen (große Einfallswinkel) werden also noch bei viel höheren Frequenzen zurückgebrochen als steile. Die kritische Frequenz $f_\\mathrm{krit}$ der F2-Region liegt tagsüber meist zwischen 5 und 12 MHz, nachts bei 2 bis 5 MHz.
</details>
`,
    },
    {
      id: 'sonne', type: 'text', title: 'Der Sonnenzyklus',
      md: `
Die Ionisation hängt von der Strahlung der Sonne ab, und die schwankt im Rhythmus des **etwa 11-jährigen [Sonnenzyklus](wiki:Sonnenzyklus|Solar cycle (calendar))** (Sonnenfleckenzyklus, vgl. [Sonnenfleck](wiki:Sonnenfleck|Sunspot)): Zum **Maximum** treten besonders viele Sonnenflecken auf, die Sonne strahlt stark. Das bedeutet **sehr hohe Sonnenaktivität und stärkere Ionisation der F-Region**, also höhere MUF. Dann sind **alle oberen Kurzwellenbänder** nutzbar, teilweise sogar 6 m für DX, und besonders das **10-m-Band** (28,0 bis 29,7 MHz) trägt **tagsüber auch mit kleiner Leistung weltweit**. Im **Minimum** sind die Bänder oberhalb des 20-m-Bandes (z. B. 10 m) meist nicht nutzbar.

Ein wesentlicher Faktor für die Kurzwellenausbreitung ist also der **elfjährige Sonnenzyklus**, nicht die Empfängerfilter, die Antennenbandbreite oder die Antennenausrichtung zum Äquator. Daneben gibt es tägliche und jahreszeitliche Änderungen.
`,
    },
    {
      id: 'fading', type: 'text', title: 'Fading: Wenn sich Wellen überlagern',
      md: `
Treffen zwei oder mehr Signale gleicher Frequenz im Empfänger ein, **addieren sich ihre Amplituden** je nach Phasenlage: Verstärkung oder Abschwächung, bei 180° Phasenunterschied und gleicher Amplitude sogar Auslöschung ([Interferenz](wiki:Interferenz (Physik)|Wave interference)). Das passiert, wenn du von einem Sender **Bodenwelle und Raumwelle** empfängst oder wenn die Raumwelle auf **mehreren Wegen** ankommt. Verändern sich Amplitude oder Phase, schwankt die Feldstärke ständig: **[[fading|Fading]]** (Schwund; Q-Gruppe QSB). Auf Kurzwelle verursacht die Brechung an der sich bewegenden Ionosphäre die Änderungen. Frequenzverschiebung (Doppler-Effekt), Rückstreuung (Backscatter) oder Rauschen sind nicht gemeint.
`,
    },
    {
      id: 'fading-labor', type: 'text', title: 'Fading nachgerechnet: zwei Wellen, eine Summe',
      md: `
Warum schwankt die Feldstärke? Stell dir zwei Wellen gleicher Frequenz mit den Amplituden $a$ und $b$ vor, die mit dem Phasenunterschied $\\Delta\\varphi$ im Empfänger ankommen. Die Summenamplitude ist

$$A=\\sqrt{a^2+b^2+2ab\\cos\\Delta\\varphi}$$

- **In Phase** ($\\Delta\\varphi=0°$): $A=a+b$, maximale Verstärkung.
- **Gegenphase** ($\\Delta\\varphi=180°$): $A=|a-b|$; bei $a=b$ ist die Summe **null**, das Signal verschwindet völlig.
- Dazwischen: je nach Phasenlage.

Der Phasenunterschied hängt von der **Wegdifferenz**: Eine Weglänge von einer halben Wellenlänge mehr entspricht 180°. Auf 20 m ($\\lambda\\approx21$ m) genügt also schon eine Verschiebung des Weges um gut 10 m, um aus Verstärkung Auslöschung zu machen. Weil die **Ionosphäre in Bewegung** ist, ändern sich die Weglängen laufend; die Phasenlage driftet, und die Feldstärke schwankt: **QSB**. Treffen **Bodenwelle und Raumwelle** zusammen (typisch im Nahbereich, z. B. auf 80 m abends), schwankt die Feldstärke ebenfalls. Fading ist **kein Fehler deines Empfängers** und lässt sich nicht „wegdrehen“; gegen den schlimmsten Schwund hilft Geduld, ein Nachfassen oder ein anderes Band.
`,
    },
    {
      id: 'demo-fading', type: 'viz', viz: 'fading-interferenz', title: 'Fading-Labor: Interferenz zweier Wellen',
      intro: 'Stelle **Amplitude** und **Phasenlage** der zweiten Welle ein. Unten siehst du die Summe, wie der Empfänger sie erhält. Schalte **„Ionosphäre bewegt sich“** ein, damit die Phase driftet.',
      task: 'Erzeuge Verstärkung (Summe über 1,5) und Auslöschung (gleiche Amplituden, 180°), und erlebe dann QSB mit driftender Phase.',
    },
    {
      id: 'grey', type: 'text', title: 'Greyline und der lange Weg',
      md: `
Die **[[greyline|Greyline]]** (Dämmerungszone, Tag-Nacht-Grenze, [Terminator](wiki:Tag-Nacht-Grenze|Terminator (solar))) ist der Ring um die Erde, in dem gerade Sonnenaufgang oder Sonnenuntergang herrscht. Hier ist die **dämpfende D-Region** noch nicht oder nicht mehr vorhanden, während die brechenden E- und F-Regionen noch bzw. schon wirken. Das ergibt besonders gute DX-Bedingungen, vor allem auf den unteren Bändern (160 m, 80 m) und rund um die Tag- und Nachtgleichen, etwa von Europa nach Australien, Neuseeland und in den Pazifik.

Zwischen zwei Orten gibt es immer **zwei Wege** entlang eines Großkreises: den **kurzen** und den **langen Weg** (die Gegenrichtung, [Großkreis](wiki:Großkreis|Great circle)). Normalerweise läuft die Verbindung über den kurzen Weg (weniger Strecke, weniger Dämpfung). Je nach Tageszeit, Jahreszeit und Frequenz kann aber der **lange Weg** besser tragen: Die Antenne wird dann nicht auf die Gegenstation, sondern in die **entgegengesetzte Richtung** gedreht. „Mit VK auf dem langen Weg gearbeitet“ heißt: die Verbindung mit Australien kam **über den indirekten, längeren Weg** zustande (von Deutschland aus etwa über Südamerika). Es heißt nicht „viele Sprünge“, kein Echo und keine sehr langen Einzelsprünge.

`,
    },
    {
      id: 'grey-warum', type: 'text', title: 'Warum die Greyline so gut funktioniert',
      md: `
Denk an die beiden Regionen und ihr Verhalten bei Sonnenuntergang: Die **D-Region** (Dämpfer) löst sich praktisch sofort auf, die **F2-Region** (Brecher) bleibt. Direkt an der **Tag-Nacht-Grenze** hast du also die ideale Kombination: brechende Regionen sind da, die dämpfende fehlt oder ist noch nicht aufgebaut. Das Signal verliert weniger Energie als am Tag, und die F2-Region ist nicht schon so dünn wie mitten in der Nacht.

Daher **zwei einfache Regeln**:

- Beim **Sonnenaufgang** an deiner Station baut sich die D-Region erst auf; beim **Sonnenuntergang** verschwindet sie. Beide Zeiten sind Chancen für die **unteren Bänder** (vor allem 160 m und 80 m).
- Ideal ist, wenn **beide Stationen** nahe an der Greyline liegen oder die Verbindung **entlang** der Linie verläuft: Dann ist die D-Region auf dem **ganzen Weg** schwach.

Besonders gut sind die Wochen **um die Tag- und Nachtgleichen**: Dann verläuft die Tag-Nacht-Grenze ungefähr von Nord nach Süd (entlang eines Längenkreises), und Strecken wie Europa nach Australien, Neuseeland oder in den Pazifik laufen parallel zu ihr, sodass der ganze Weg in der Dämmerung liegt.[^darc-50ohm]
`,
    },
    {
      id: 'map-longpath', type: 'map', title: 'Kurzer und langer Weg Deutschland – Australien',
      intro: 'Beide Wege liegen auf demselben Großkreis: der kurze führt über Asien, der lange über den Atlantik, Südamerika und den Pazifik.',
      view: [-180, -58, 180, 75],
      points: [{ lon: 10, lat: 51, label: 'Deutschland (DL)', detail: 'Antenne zeigt auf dem kurzen Weg nach Ost-Nordost (etwa 74°), auf dem langen Weg in die Gegenrichtung (etwa 254°).', pos: 't' }, { lon: 151.2, lat: -33.9, label: 'Australien (VK)', detail: 'Sydney als Beispiel für VK.', pos: 'l' }],
      lines: [
        { label: 'Kurzer Weg (≈ 16 400 km)', coords: [[10, 51], [19.7, 52.3], [29.7, 52.8], [39.8, 52.5], [49.6, 51.3], [58.7, 49.3], [67, 46.7], [74.5, 43.6], [81.1, 40], [87.1, 36], [92.5, 31.8], [97.4, 27.4], [101.9, 22.9], [106.2, 18.2], [110.2, 13.4], [114, 8.6], [117.8, 3.7], [121.5, -1.2], [125.2, -6.1], [129, -10.9], [132.9, -15.7], [137, -20.5], [141.4, -25.1], [146.1, -29.6], [151.2, -33.9]], color: '#047857', labelAt: 0.6 },
        { label: 'Langer Weg (≈ 23 700 km)', coords: [[10, 51], [-0.3, 48.5], [-9.5, 45.3], [-17.6, 41.3], [-24.8, 36.9], [-31.1, 32.1], [-36.8, 27], [-41.9, 21.6], [-46.7, 16.2], [-51.2, 10.6], [-55.6, 5], [-59.9, -0.6], [-64.2, -6.3], [-68.6, -11.9], [-73.2, -17.4], [-78.1, -22.9], [-83.3, -28.1], [-89.1, -33.2], [-95.6, -37.9], [-103, -42.3], [-111.3, -46.1], [-120.8, -49.2], [-131.3, -51.4], [-142.7, -52.6], [-154.4, -52.7], [-165.9, -51.7], [-176.6, -49.6], [-176.6, -49.6]], dashed: true, color: '#c2410c', labelAt: 0.5 },
        { label: 'Langer Weg, Fortsetzung', coords: [[178.5, -48.2], [173.8, -46.6], [169.4, -44.8], [165.3, -42.9], [161.4, -40.8], [157.8, -38.6], [154.4, -36.3], [151.2, -33.9]], dashed: true, color: '#c2410c', labelAt: 0.5 },
      ],
      caption: 'Großkreise nach Kugelrechnung; Sydney als Beispielziel. Der lange Weg ist ein Fünftel länger, aber manchmal der bessere.',
    },
    {
      id: 'demo-grey', type: 'viz', viz: 'greyline-longpath', title: 'Greyline-Karte mit kurzem und langem Weg',
      intro: 'Stelle **Uhrzeit (UTC)** und **Datum** ein: Die Karte zeigt Nacht (dunkel) und Greyline (orange) und Großkreise zu fünf DX-Gebieten, dazu Entfernung und Richtung für kurzen und langen Weg.',
      task: 'Bringe deinen Standort in die Greyline, finde eine Zeit, zu der beide Stationen im Dunkeln liegen, und lass dir den langen Weg anzeigen.',
    },
    {
      id: 'mdl', type: 'text', title: 'Mögel-Dellinger-Effekt: Funkstille nach der Sonneneruption',
      md: `
Auf einer aktiven Sonne ereignen sich **Flares** ([Sonneneruptionen](wiki:Sonneneruption|Solar flare)): starke Strahlungsausbrüche im ultravioletten und im Röntgenbereich (und mit Teilchen). Die zusätzliche Strahlung ionisiert in erster Linie die **D-Region**, deren dämpfende Wirkung dadurch **massiv ansteigt**: Die Raumwelle wird auf der **sonnenbeschienenen Erdseite** auch bei viel höheren Frequenzen gedämpft oder bleibt ganz aus. Dieses Ereignis heißt **[[moegel-dellinger-effekt|Mögel-Dellinger-Effekt]]** (nach [Hans Mögel](wiki:Hans Mögel|Hans Mögel) und [John Dellinger](wiki:John Howard Dellinger|John Howard Dellinger), englisch Shortwave Fade-Out oder SID, vgl. [Sudden Ionospheric Disturbance](wiki:Mögel-Dellinger-Effekt|Sudden ionospheric disturbance)). Er tritt überfallartig binnen Sekunden ein und baut sich langsam wieder ab, beginnend mit den hohen Frequenzen; je nach Flare dauert es Minuten bis über eine Stunde, bis die Stationen wieder aus dem Rauschen auftauchen.

Folge: **zeitlich begrenzter Ausfall der Raumwellenausbreitung** auf Kurzwelle, nicht Schwund durch Mehrwegeausbreitung (das ist Fading), nicht Verzerrung der Modulation und kein Übersprechen eines starken Senders (Kreuzmodulation). Ein Beispiel war der X9,0-Flare am 3. Oktober 2024 um 12:19 UTC, der den Funkverkehr vieler Stationen am Türöffnertag der „Sendung mit der Maus“ für mehrere Minuten unterbrach.
`,
    },
    {
      id: 'mdl-freq', type: 'callout', tone: 'fact', title: 'Mögel-Dellinger: was trifft es am stärksten?',
      md: `Die zusätzliche Ionisation der D-Region dämpft **tiefe Frequenzen am stärksten**; mit steigender Frequenz nimmt die Wirkung ab. Beim Ausfall am 3. Oktober 2024 war das in den NOAA-Karten zu sehen: die Dämpfung der Amateurfunkbänder nahm zu höheren Frequenzen hin ab. Betroffen ist die **Tagseite** der Erde (der Strahlungsausbruch trifft die sonnenbeschienene Seite). Und: Nach dem Ausfall erholen sich **zuerst die hohen Frequenzen**; die tiefen kommen als Letzte zurück.`,
    },
    {
      id: 'video', type: 'video', youtube: 'ixCKYZ9B5ms', label: 'Amateurfunkvorlesung Klasse E – Lektion 3: Wellenausbreitung', channel: 'Computer Engineering @ JMU Würzburg',
      why: 'Vorlesung zur Klasse E mit dem Kapitel Wellenausbreitung (Titel der Aufnahme).',
    },
    {
      id: 'mission-band', type: 'callout', tone: 'mission', title: 'Funkpraxis: Welches Band wann?',
      md: `Faustregel für den Alltag im Fleckenmaximum: **10 m und 15 m tagsüber** (DX mit kleiner Leistung), **20 m rund um die Uhr** und besonders tagsüber, **40 m** abends und nachts, **80 m und 160 m nachts** (am Tag nur Bodenwelle und Nahverkehr). Zur Dämmerung (Greyline) lohnt der Blick auf die unteren Bänder: Dann kommen oft die Stationen am anderen Ende des Dämmerungsrings durch. Im Minimum schläft 10 m meist ein, dann sind 20 m und 40 m die Arbeitspferde.`,
    },
    {
      id: 'q-region', type: 'quiz', title: 'D-Region',
      question: 'Warum sind Signale im 80-m-Band **tagsüber** nur schwach und für weltweiten Funk ungeeignet?',
      options: [
        { text: 'Die D-Region dämpft sie tagsüber stark.', correct: true, why: 'Die D-Region ist nur tagsüber da und verschluckt die tiefen Frequenzen.' },
        { text: 'Die F2-Region reflektiert sie tagsüber nicht.', why: 'Die F2-Region ist tagsüber vorhanden; es ist die D-Region davor, die dämpft.' },
        { text: 'Die D-Region reflektiert sie tagsüber auf den Boden zurück.', why: 'Die D-Region reflektiert nicht, sie absorbiert.' },
        { text: 'Die E-Region verhindert nachts die Fernausbreitung.', why: 'Die E-Region verschwindet nachts; sie stoppt dann nichts.' },
      ],
    },
    {
      id: 'q-muf', type: 'quiz', title: 'MUF und Ionisation',
      question: 'Eine stärkere Ionisierung der F2-Region führt zu …',
      options: [
        { text: 'einer höheren MUF.', correct: true, why: 'Je mehr freie Elektronen, desto höhere Frequenzen werden noch gebrochen.' },
        { text: 'einer niedrigeren MUF.', why: 'Umgekehrt: weniger Ionisation senkt die MUF.' },
        { text: 'einer stärkeren Absorption der höheren Frequenzen.', why: 'Absorption ist Sache der D-Region.' },
        { text: 'einer geringeren Durchlässigkeit für höhere Frequenzen.', why: 'Mit mehr Ionisation werden höhere Frequenzen zurückgebrochen statt durchgelassen.' },
      ],
    },
    {
      id: 'q-tote', type: 'quiz', title: 'Frequenz frei?',
      question: 'Du hörst auf 20 m nichts auf der Frequenz und sendest. Sofort ruft dich jemand an, er habe schon ein QSO geführt. Was ist die wahrscheinlichste Erklärung?',
      options: [
        { text: 'Die Stationen lagen in deiner toten Zone: Bodenwelle zu schwach, Raumwelle noch nicht da.', correct: true, why: 'Genau die typische Ursache für „frei erscheinende“ Frequenzen auf höheren KW-Bändern.' },
        { text: 'Sie benutzen das andere Seitenband.', why: 'Das Seitenband verhindert nicht, dass du ein Signal hörst.' },
        { text: 'Der Mögel-Dellinger-Effekt hat sie kurzzeitig unterbrochen.', why: 'Er würde auch dein Signal und die ganze Raumwelle betreffen, nicht gezielt diese Station.' },
        { text: 'Die Ausbreitungsbedingungen sind zu schlecht, sodass niemand sendet.', why: 'Bei schlechten Bedingungen hörst du eben nichts: aber die Stationen sind nicht „zu schlecht“, sie sind schlicht außer Reichweite.' },
      ],
    },
    {
      id: 'q-mdl', type: 'quiz', title: 'Nach dem Flare',
      question: 'Nach einem starken Flare bricht auf dem 20-m-Band plötzlich die Raumwelle auf der Tagseite zusammen. Wie nennt man das und was ist die Ursache?',
      options: [
        { text: 'Mögel-Dellinger-Effekt: Röntgen- und UV-Strahlung ionisieren die D-Region stark und die Dämpfung steigt.', correct: true, why: 'So entsteht der zeitweise Ausfall der Raumwelle.' },
        { text: 'Fading: Boden- und Raumwelle überlagern sich gegenphasig.', why: 'Fading ist Schwund durch Interferenz, kein plötzlicher Totalausfall durch Flares.' },
        { text: 'Sporadic-E: die E-Region wird durchlässig.', why: 'Sporadic-E ermöglicht Verbindungen, es unterbricht keine.' },
        { text: 'Tote Zone: die Raumwelle steigt zu steil auf.', why: 'Die tote Zone hängt von Abstrahlwinkel und Region ab und nicht von der Sonneneruption.' },
      ],
    },
    {
      id: 'num-muf', type: 'numeric', title: 'MUF für einen schrägen Strahl (Vertiefung)',
      question: 'Die kritische Frequenz der F2-Region beträgt 5 MHz, der Strahl trifft die Region unter einem Einfallswinkel von 70° zur Senkrechten (cos 70° = 0,342). Wie hoch ist die MUF für diese Strecke?',
      answer: 14.6, tolerance: 0.03, unit: 'MHz',
      hint: '$\\text{MUF}=f_\\mathrm{krit}/\\cos\\varphi$.',
      explain: '$5/0{,}342=14{,}6$ MHz. Flache Strahlen kommen so mit weit höheren Frequenzen zurück als senkrecht (dort wäre die MUF nur die kritische Frequenz 5 MHz).',
    },
    {
      id: 'order-mdl', type: 'order', title: 'Ablauf eines Funkausfalls',
      prompt: 'Bringe die Ereignisse beim Mögel-Dellinger-Effekt in die richtige Reihenfolge.',
      items: [
        'Starke Eruption (Flare) auf der Sonne',
        'Ultraviolett- und Röntgenstrahlung erreichen die Erde und ionisieren die D-Region stark',
        'Die D-Region dämpft die Raumwelle auf der sonnenbeschienenen Seite massiv',
        'Die Raumwellenverbindungen fallen binnen Sekunden aus',
        'Die D-Region erholt sich, zuerst kommen die hohen Frequenzen wieder',
      ],
      explain: 'Die Strahlung erreicht die Erde mit Lichtgeschwindigkeit; der Ausfall setzt überfallartig ein und klingt langsam ab, von hohen zu tiefen Frequenzen.',
    },
    {
      id: 'match-region', type: 'match', title: 'Region und Eigenschaft',
      prompt: 'Ordne zu.',
      pairs: [
        ['D-Region', 'nur tagsüber da, dämpft tiefe Frequenzen'],
        ['E-Region', 'etwa 90 bis 130 km, Sporadic-E im Sommer'],
        ['F2-Region', 'DX-Region, bleibt nachts erhalten'],
        ['Sonnenfleckenmaximum', 'höhere Ionisation in F, 10 m tagsüber offen'],
      ],
    },
    {
      id: 'match-begriff', type: 'match', title: 'Begriff und Bedeutung',
      prompt: 'Ordne zu.',
      pairs: [
        ['MUF', 'höchste nutzbare Frequenz'],
        ['LUF', 'niedrigste nutzbare Frequenz, abhängig von der D-Region'],
        ['Tote Zone', 'weder von der Bodenwelle noch von der Raumwelle erreicht'],
        ['Fading', 'Schwund durch Überlagerung mehrerer Wellen'],
        ['Greyline', 'Dämmerungszone um Sonnenauf- und -untergang'],
        ['Langer Weg', 'Verbindung in der entgegengesetzten Richtung entlang des Großkreises'],
      ],
    },
    {
      id: 'num-fade', type: 'numeric', title: 'Fading rechnen',
      question: 'Zwei Signale gleicher Frequenz treffen im Empfänger ein: Welle 1 mit Amplitude 1,0 und Welle 2 mit Amplitude 0,6, beide **in Phase**. Wie groß ist die Summenamplitude? (Bei 180° wären es 0,4.)',
      answer: 1.6, tolerance: 0.03,
      explain: 'In Phase addieren sich die Amplituden: $1{,}0+0{,}6=1{,}6$. In Gegenphase wäre es $|1{,}0-0{,}6|=0{,}4$; bei gleich großen Wellen würde die Summe ganz verschwinden.',
    },
    {
      id: 'num-skip-weg', type: 'numeric', title: 'Mehrere F2-Sprünge',
      question: 'Ein F2-Sprung überbrückt bis zu etwa 4000 km. Wie weit kommt man höchstens mit zwei solchen Sprüngen (ohne Rundum-Dämpfung)?',
      answer: 8000, tolerance: 0.03, unit: 'km',
      explain: 'Zwei Sprünge à 4000 km: bis etwa 8000 km. Der Weg um die Erde (ca. 40 000 km) bräuchte entsprechend viele Sprünge; jeder kostet Dämpfung.',
    },
    {
      id: 'q-grey-warum', type: 'quiz', title: 'Greyline: warum gut?',
      question: 'Warum sind die Stunden um Sonnenauf- und -untergang für DX auf den unteren Bändern oft besonders gut?',
      options: [
        { text: 'Die dämpfende D-Region ist noch nicht (oder nicht mehr) da, während E- und F-Regionen noch bzw. schon brechen.', correct: true, why: 'Genau diese Kombination macht die Greyline aus.' },
        { text: 'Die D-Region ist besonders stark ionisiert und reflektiert die Welle.', why: 'Die D-Region dämpft; sie reflektiert nicht.' },
        { text: 'Die MUF ist zu dieser Zeit am niedrigsten, deshalb kommen tiefe Bänder durch.', why: 'Es geht nicht um eine niedrige MUF, sondern um fehlende D-Dämpfung.' },
        { text: 'Die Sonneneruption erzeugt dort ein Funkfenster.', why: 'Flares führen zum Mögel-Dellinger-Effekt, also zu Ausfällen auf der Tagseite.' },
      ],
    },
    {
      id: 'q-mdl-freq', type: 'quiz', title: 'Welche Bänder trifft es?',
      question: 'Beim Mögel-Dellinger-Effekt: Welches stimmt?',
      options: [
        { text: 'Tiefe Frequenzen werden am stärksten gedämpft; die Wirkung nimmt zu höheren Frequenzen hin ab; betroffen ist die Tagseite.', correct: true, why: 'Die Dämpfung der D-Region ist bei tiefen Frequenzen am größten.' },
        { text: 'Hohe Frequenzen werden am stärksten gedämpft, tiefe kaum.', why: 'Umgekehrt: Die D-Dämpfung wird mit steigender Frequenz kleiner.' },
        { text: 'Er trifft nur die Nachtseite, weil dort die D-Region fehlt.', why: 'Die Strahlung trifft die sonnenbeschienene Seite.' },
        { text: 'Er verbessert die Ausbreitung auf 10 m.', why: 'Er sorgt für zeitweisen Ausfall der Raumwelle.' },
      ],
    },
    {
      id: 'q-fading-multi', type: 'quiz', title: 'Fading: Ursachen',
      question: 'Welche Situationen können zu Fading führen? (mehrere möglich)',
      options: [
        { text: 'Boden- und Raumwelle des gleichen Senders überlagern sich.', correct: true, why: 'Die Phasenlage zweier Wellen bestimmt die Summe.' },
        { text: 'Die Raumwelle kommt auf mehreren Wegen an (Mehrwegeausbreitung).', correct: true, why: 'Teilwellen mit unterschiedlichem Weg addieren sich phasenabhängig.' },
        { text: 'Die bewegte Ionosphäre ändert die Weglängen ständig.', correct: true, why: 'Dadurch driftet die Phase, die Feldstärke schwankt (QSB).' },
        { text: 'Der Empfängereingang ist zu empfindlich eingestellt.', why: 'Das erzeugt Rauschen oder Übersteuerung, kein Fading.' },
      ],
    },
    {
      id: 'match-weg-art', type: 'match', title: 'Ausbreitungsweg und Eigenschaft',
      prompt: 'Ordne zu.',
      pairs: [
        ['Direkte Welle', 'geradlinig bei Sichtverbindung'],
        ['Bodenwelle', 'folgt der Erdkrümmung, tiefe Frequenzen weiter'],
        ['Raumwelle', 'Brechung an der Ionosphäre'],
        ['Tote Zone', 'Bodenwelle zu schwach, Raumwelle noch nicht da'],
        ['Mögel-Dellinger', 'zeitweiser Ausfall der Raumwelle auf der Tagseite'],
      ],
    },
    {
      id: 'recall-ion', type: 'recall', title: 'In eigenen Worten',
      prompt: 'Dein Bekannter will tagsüber mit 5 W auf dem 80-m-Band nach Australien funken und nachts auf 10 m. Warum klappt beides nicht, und was empfiehlst du stattdessen (im Fleckenminimum)?',
      answer: 'Am Tag dämpft die D-Region das 80-m-Band stark (nur Bodenwelle), nachts ist sie weg, und 80 m öffnet über die F2-Region. Das 10-m-Band braucht hohe Ionisation (hohe MUF): nachts sinkt die MUF stark, im Fleckenminimum liegt sie auch tagsüber oft darunter, die Welle geht dann durch die Ionosphäre hindurch. Besser: tagsüber 20 m (oder 15 m), nachts 40 m oder 80 m, jeweils zu den Zeiten der Greyline für Australien.',
      cards: ['io-d', 'io-muf'],
    },
    {
      id: 'wrap', type: 'callout', tone: 'fact', title: 'Zum Mitnehmen',
      md: `Ionisation durch Sonnenstrahlung, Brechung an freien Elektronen: D dämpft (nur am Tag), E bricht bis etwa 10 MHz, F2 trägt das DX und bleibt nachts. MUF ist die obere, LUF die untere Grenze. Der Sonnenzyklus von 11 Jahren steuert die Ionisation; tote Zone liegt zwischen Bodenwelle und Raumwelle; Greyline und langer Weg sind Spezialfälle; Flares löschen die Raumwelle (Mögel-Dellinger).[^bnetza-fragenkatalog]`,
    },
  ],
  cards: [
    { id: 'io-brech', front: 'Wie entsteht die KW-Fernausbreitung?', back: 'Refraktion (Brechung) an elektrisch geladenen Teilchen (freien Elektronen) der Ionosphäre. Ionisation durch UV- und Röntgenstrahlung der Sonne.' },
    { id: 'io-hoehe', front: 'Höhe der F-Region?', back: 'Etwa 130 bis 450 km (DX-Region). D: 50 bis 90 km, E: 90 bis 130 km.' },
    { id: 'io-d', front: 'D-Region', back: 'Nur tagsüber; dämpft tiefe Frequenzen (160, 80 m); löst sich nachts auf. LUF hängt von ihr ab.' },
    { id: 'io-e', front: 'E-Region', back: 'Bricht schräge Wellen bis etwa 10 MHz, löst sich nachts auf; im Sommer Sporadic-E (bis 2 m, Short Skip).' },
    { id: 'io-f2', front: 'F2-Region', back: 'Wichtigste DX-Region (bis etwa 4000 km je Sprung); bleibt nachts erhalten (80-m-DX nachts über F2), ihre Ionisation und MUF sinken aber: die oberen Bänder schließen zuerst.' },
    { id: 'io-muf', front: 'MUF und LUF', back: 'MUF: höchste nutzbare Frequenz (steigt mit Ionisation der F2). LUF: niedrigste nutzbare Frequenz (hängt von der D-Region ab).' },
    { id: 'io-zyklus', front: 'Sonnenzyklus', back: 'Etwa 11 Jahre. Fleckenmaximum: hohe Ionisation in F, 10 m tagsüber auch mit kleiner Leistung weltweit. Minimum: Bänder über 20 m meist nicht nutzbar.' },
    { id: 'io-sprung', front: 'Wovon hängt die Sprungdistanz ab?', back: 'Vom Abstrahlwinkel der Antenne (flacher = weiter) und der Höhe der brechenden Region. Nicht von Polarisation, Leistung, Gewinn.' },
    { id: 'io-tote', front: 'Tote Zone', back: 'Bereich, den die Bodenwelle nicht mehr und die Raumwelle noch nicht erreicht. Eine „freie“ Frequenz kann deshalb besetzt sein.' },
    { id: 'io-boden', front: 'Bodenwelle', back: 'Folgt der Erdkrümmung, geht über den Horizont hinaus; höhere Frequenzen stärker gedämpft; 160 m tagsüber hauptsächlich Bodenwelle.' },
    { id: 'io-fading', front: 'Fading', back: 'Feldstärkeschwund durch Überlagerung von Boden- und Raumwelle (oder Mehrwegausbreitung); QSB.' },
    { id: 'io-grey', front: 'Greyline', back: 'Zone der Dämmerung um Sonnenauf- und -untergang: D-Region schwach, E/F wirken: gute DX-Bedingungen auf den unteren Bändern.' },
    { id: 'io-mdl', front: 'Mögel-Dellinger-Effekt', back: 'Flare → UV/Röntgen ionisiert D-Region stark → zeitweiser Ausfall der Raumwelle auf der Tagseite.' },
    { id: 'io-long', front: 'Langer Weg (long path)', back: 'Verbindung in der entgegengesetzten Richtung entlang des Großkreises, z. B. nach VK über Südamerika.' },
    { id: 'io-skip-frequenz', front: 'Wovon hängt die Größe der toten Zone ab?', back: 'Von der Höhe der brechenden Region (höher: größer), vom Abstrahlwinkel (flacher: weiter) und von der Frequenz (höher: größer).' },
    { id: 'io-hops', front: 'Mehrere Sprünge?', back: 'Die Erde reflektiert nach oben, dann folgt der nächste Sprung. Zwei F2-Sprünge: bis etwa 8000 km; jeder Sprung kostet Dämpfung.' },
    { id: 'io-fading-formel', front: 'Zwei Wellen überlagern: Summe?', back: 'In Phase: a + b. Gegenphase (180°): |a − b|, bei gleicher Amplitude null. Dazwischen: √(a² + b² + 2ab·cos Δφ).' },
    { id: 'io-fading-vhf', front: 'Fading auf VHF und höher?', back: 'Häufig durch Reflexion an beweglichen Objekten (Mehrwege); auf KW durch die bewegte Ionosphäre.' },
    { id: 'io-mdl-freq', front: 'Mögel-Dellinger: welche Frequenzen am stärksten?', back: 'Die tiefen: Dämpfung der D-Region nimmt mit steigender Frequenz ab. Nach dem Ausfall erholen sich zuerst die hohen.' },
    { id: 'io-grey-warum', front: 'Greyline: warum gute DX-Bedingungen?', back: 'D-Region (Dämpfer) noch/nicht mehr da, E/F (Brecher) wirken. Besonders um die Tag- und Nachtgleichen; vor allem untere Bänder.' },
  ],
};
