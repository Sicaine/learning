const terrain = `<svg viewBox="0 0 360 150" role="img" aria-label="Geländeprofil mit Sichtlinie und Funkschatten" style="width:100%;max-width:520px;display:block;margin:0 auto;background:var(--surface);border:1px solid var(--line);border-radius:12px">
<path d="M0 135 L0 90 Q30 40 60 70 Q90 110 130 100 Q170 55 205 62 Q235 95 270 110 Q310 70 338 78 L360 90 L360 150 L0 150 Z" fill="color-mix(in oklab, var(--good) 22%, var(--surface))" stroke="var(--ink-2)" stroke-width="1.5"/>
<line x1="33" y1="47" x2="290" y2="82" stroke="var(--accent)" stroke-width="2" stroke-dasharray="6 4"/>
<path d="M175 56 L290 100 L175 100 Z" fill="color-mix(in oklab, var(--bad) 14%, transparent)" opacity="0"/>
<line x1="33" y1="47" x2="130" y2="88" stroke="var(--bad)" stroke-width="2" stroke-dasharray="3 4"/>
<g font-family="var(--sans)" font-size="10" font-weight="700"><text x="33" y="36" text-anchor="middle" fill="var(--accent)">Sender S</text>
<text x="290" y="72" text-anchor="middle" fill="var(--good)">Gipfel: freie Sicht</text>
<text x="105" y="118" fill="var(--bad)">Tal hinter dem Hügel:</text><text x="105" y="130" fill="var(--bad)">Funkschatten</text></g>
<circle cx="33" cy="49" r="3.5" fill="var(--accent)"/><circle cx="290" cy="82" r="3.5" fill="var(--good)"/><circle cx="110" cy="101" r="3.5" fill="var(--bad)"/></svg>`;

export default {
  id: 'ausbreitung-ueber-30-mhz',
  title: 'Ausbreitung oberhalb 30 MHz: Troposphäre, Sporadic-E, Aurora',
  summary: 'Funkhorizont und Antennenhöhe, Überreichweiten durch Inversionswetterlagen, Sporadic-E im Sommer und Aurora-Verbindungen.',
  minutes: 24,
  goals: [
    'Erklären, warum der [[funkhorizont]] etwa 15 % weiter reicht als der sichtbare Horizont und wie die Antennenhöhe die Reichweite bestimmt',
    'Troposphäre als Wetterschicht einordnen und Überreichweiten bei [[inversionswetterlage]] (800 bis über 1000 km) erklären',
    '[[sporadic-e]] beschreiben: E-Region in 100 bis 110 km Höhe, Sommer, 1000 bis 2000 km, „Short Skip“',
    'Aurora-Ausbreitung einordnen (Polarlicht, rauer Ton, Rapport mit „A“)',
    'Erklären, warum sich Überreichweiten durch Brechung an Wetterschichten, an stark ionisierten Wolken oder an Polarlicht-Gebieten unterscheiden, und sie nach Höhe, Reichweite, Jahreszeit und Band vergleichen',
    'Die Sprungdistanz von Sporadic-E (E-Region) und F2-Region vergleichen und verstehen, warum „Short Skip“ möglich ist',
  ],
  needs: ['amateurfunk/erp-eirp'],
  blocks: [
    {
      id: 'intro', type: 'text', title: 'Oberhalb 30 MHz: Funkwellen verhalten sich wie Licht, meistens',
      md: `
Im UKW-Bereich ([Ultrakurzwelle](wiki:Ultrakurzwelle|Very high frequency)): 2 m, 70 cm, auch 6 m) und darüber breiten sich Funkwellen ähnlich wie Licht aus: Sie laufen im Wesentlichen geradlinig vom Sender zum Empfänger, wenn Sichtverbindung besteht. Die Kurzwellen-Raumwelle über die Ionosphäre (nächste Lektion) spielt hier normalerweise keine Rolle: Die Ionosphäre lässt diese hohen Frequenzen meist durch. Trotzdem gibt es immer wieder **Überreichweiten**, mit denen Verbindungen über 1000 km und mehr gelingen. Vier Mechanismen musst du kennen:

1. der **Funkhorizont** (normale Reichweite),
2. Überreichweiten in der **Troposphäre** (Inversion),
3. **Sporadic-E** in der E-Region der Ionosphäre,
4. **Aurora**.[^darc-50ohm]
`,
    },
    {
      id: 'horizont', type: 'text', title: 'Funkhorizont und Antennenhöhe',
      md: `
Licht reicht bis zum geometrischen (sichtbaren) Horizont. Funkwellen im VHF- und UHF-Bereich schaffen **etwa 15 % mehr**, weil sie der Erdkrümmung ein wenig folgen (die Brechung in der Atmosphäre biegt sie leicht nach unten, siehe [Radiohorizont](wiki:Radiohorizont|Radio horizon)). Das nennt man den **[[funkhorizont|Funkhorizont]]**. Er reicht also **etwa 15 % weiter** (nicht doppelt, nicht halb und nicht viermal so weit).

Faustformeln für die Antennenhöhe $h$ in Metern:

$$d_\\text{optisch}\\approx3{,}57\\,\\sqrt{h}\\ \\text{km},\\qquad d_\\text{Funk}\\approx4{,}12\\,\\sqrt{h}\\ \\text{km}$$

Der Funkhorizont einer Station ist umso weiter, je **höher die Antenne** steht. Zwischen zwei Stationen addieren sich beide Horizonte: $d\\approx4{,}12\\,(\\sqrt{h_1}+\\sqrt{h_2})$ km. Die Reichweite steigt mit der Antennenhöhe, **weil die quasi-optische Sichtweite zunimmt**, nicht weil die Antenne näher an der Ionosphäre ist, steiler abstrahlt oder es in der Höhe kälter ist. Vier Mal so hoch bedeutet doppelte Reichweite (wegen der Wurzel).

Auf VHF/UHF ist meistens eine **Sichtverbindung** nötig, und je höher die Frequenz, desto mehr gilt das. Berge, Gebäude und Wald schatten ab; dazu kommt Beugung an Kanten, die kleine Schattenzonen etwas überbrückt. Deshalb erreicht man von einem hohen Berg viel weitere Stationen als aus einem Tal oder dem Stadtzentrum.

${terrain}
<p style="font-size:.85rem;color:var(--muted);text-align:center">Schema: Von einem Gipfel mit freier Sichtlinie klappt die Verbindung; im Tal hinter einem Hügel liegt der Funkschatten.</p>
`,
    },
    {
      id: 'demo-horizont', type: 'viz', viz: 'funkhorizont', title: 'Funkhorizont-Rechner',
      intro: 'Stelle die Antennenhöhen beider Stationen ein und vergleiche optischen Horizont und Funkhorizont.',
      task: 'Vervierfache beide Antennenhöhen (10 m auf 40 m) und finde eine Kombination (Berg und Dachantenne) mit über 100 km Reichweite.',
    },
    {
      id: 'tropo', type: 'text', title: 'Troposphäre: Überreichweite durch Inversion',
      md: `
Die [Troposphäre](wiki:Troposphäre|Troposphere) ist die unterste Schicht der [Erdatmosphäre](wiki:Erdatmosphäre|Atmosphere of Earth), bis etwa 15 km Höhe. Sie wird auch **Wetterschicht** genannt, weil sich hier das Wetter abspielt (sie hat nichts mit den Tropen zu tun, und die sporadische E-Schicht oder Aurora entstehen weit darüber).

Normalerweise nimmt die Temperatur mit der Höhe ab. Bei einer **[[inversionswetterlage|Inversionswetterlage]]** ([Inversion](wiki:Inversionswetterlage|Inversion (meteorology))), häufig im Frühjahr und Herbst bei Hochdruckwetter, **liegt warme Luft über kalter**. An der Grenzschicht zwischen Luftmassen unterschiedlicher Temperatur und Dichte werden die Wellen durch **Beugung, Reflexion und Streuung** zur Erde zurückgelenkt. So kommen Überhorizontverbindungen im VHF/UHF-Bereich über **etwa 800 bis über 1000 km** zustande; für VHF-Weitverbindungen ist das **hauptsächlich genutzte** Ausbreitungsverfahren: nicht die Ionosphäre, nicht die Bodenwelle oder Oberflächenwelle. (Mondreflexion oder Gewitterwolken sind andere Dinge.) Ähnliche Effekte durch Streuung an Wettererscheinungen heißen [Troposcatter](wiki:Troposcatter|Tropospheric scatter).

Die Polarisation dreht sich dabei nicht (Bewölkung und Gewitterfronten führen nicht zu Polarisationsdrehungen), und eine „sporadische D-Region“ gibt es hier nicht.
`,
    },
    {
      id: 'tropo-warum', type: 'text', title: 'Warum eine Inversion die Welle zurückbiegt',
      md: `
Normalerweise wird die Luft mit der Höhe dünner und kälter; die Funkwelle wird dadurch **ein klein wenig zur Erde gebogen**. Genau das ist der Grund für die rund 15 % Funkhorizont-Zuschlag. Bei einer [Inversionswetterlage](wiki:Inversionswetterlage|Inversion (meteorology)) ändern sich Temperatur und Luftdichte **an der Grenze der beiden Luftmassen sprunghaft**. Dort werden die Wellen **gebeugt, reflektiert und gestreut** und kommen weit hinter dem normalen Horizont wieder am Boden an; so sagt es auch der Katalog. Läuft die Welle länger zwischen Boden und Schichtgrenze hin und her, spricht man vom **Ducting** (vom englischen *duct* für Rohr, Kanal): Die Luftschicht wirkt wie ein Wellenleiter, und die Signale kommen sehr weit. Mehr zu diesem Phänomen: [Troposphärische Überreichweiten](wiki:Troposphärische Überreichweiten|Tropospheric propagation). Das genaue physikalische Modell brauchst du für die Prüfung nicht; wichtig ist: **Wetter (Temperatur und Dichte der Luft) macht die Überreichweite**, nicht die Ionosphäre.[^darc-50ohm]

Wie du sie erkennst und nutzt:

- **Wann:** vor allem im **Frühjahr und Herbst**, bei stabilem Hochdruckwetter, wenn warme Luft über kalter liegt.
- **Wo:** im VHF- und UHF-Bereich (2 m, 70 cm, auch höher). Das ist für VHF-Weitverbindungen der **meistgenutzte** Weg; Reichweite etwa **800 bis über 1000 km**.
- **Wie:** Wetterberichte beobachten, Baken und Relaisfunkstellen hören, die sonst nie zu empfangen sind.
- **Vorhersage:** wetterabhängig; Sporadic-E dagegen lässt sich nicht vorhersagen.

Die Mechanismen lassen sich mit der Frage unterscheiden: **Wo** liegt der Ursprung (15 km Wetter oder 100 km Ionosphäre), **wann** tritt er auf (Frühjahr/Herbst, Sommer, Sonnenstürme) und **wie weit** reicht er?
`,
    },
    {
      id: 'mehrweg', type: 'text', title: 'Mehrwegeausbreitung: Wenn dasselbe Signal mehrmals ankommt',
      md: `
Bei jeder Überreichweite kann die Welle **auf mehreren Wegen** den Empfänger erreichen: direkt, über die Schichtgrenze, über eine zweite Reflexion am Boden. Die Teilwellen sind unterschiedlich lang unterwegs und kommen mit **verschobener Phase** an. Im Empfänger **addieren sich die Amplituden** je nach Phasenlage: einmal verstärkt, einmal geschwächt, bei gleicher Amplitude und 180° Phasenunterschied sogar ausgelöscht. Ändert sich der Weg, schwankt die Feldstärke: **Fading** (Schwund, QSB, vgl. [Mehrwegeausbreitung](wiki:Mehrwegempfang|Multipath propagation)). Auf VHF und darüber entsteht das häufig durch **Reflexion an beweglichen Objekten** (zum Beispiel fahrende Fahrzeuge), auf Kurzwelle durch die bewegte Ionosphäre (siehe nächste Lektion, dort auch ein Fading-Labor).

Praktisch: Ein Mobilfunker bemerkt kurze Aussetzer, wenn er an einem Hindernis vorbeifährt; ein paar Meter weiter ist das Signal wieder da. Ein „tiefes Loch“ im Signal heißt **nicht**, dass die Station weg ist.
`,
    },
    {
      id: 'es', type: 'text', title: 'Sporadic-E: Sommerüberreichweiten',
      md: `
In den **Sommermonaten** (in den gemäßigten Breiten) entstehen in der **E-Region der Ionosphäre**, in etwa **100 bis 110 km Höhe**, meist kleinräumige, scharf begrenzte und außergewöhnlich stark ionisierte „Wolken“: die **[[sporadic-e|sporadische E-Schicht (Sporadic-E, Es)]]** ([Sporadic-E](wiki:Sporadic-E|Sporadic E propagation)). Diese Bereiche **brechen (refraktieren)** Funkwellen sehr hoher Frequenz zur Erde zurück, bis hinauf ins 2-m-Band. Ihr Auftreten lässt sich nicht vorhersagen („sporadisch“).

Typische Reichweite: **1000 bis 2000 km** (maximal etwa 2200 km). Weil die Brechung in der relativ niedrigen E-Region stattfindet, ist die **tote Zone klein**; deshalb gelingen auch recht kurze Verbindungen: **„Short Skip“** (englisch für kurzen Sprung). Auch im 10-m-Band sind so Verbindungen unter 1000 km möglich. Wenn ein Funkamateur sagt, auf 2 m herrschten Sporadic-E-Bedingungen, meint er: Stationen aus 1000 bis 2000 km sind über Refraktion in der sporadischen E-Region zu hören, nicht aus Nordamerika und nicht über „leuchtende Nachtwolken“, Polarkreis-Ionisation oder Meteorbahnen. Die Brechung geschieht zudem nicht in der F1-, F2- oder der D-Region.
`,
    },
    {
      id: 'es-sprung', type: 'text', title: 'Sporadic-E genauer: Wolken, Höhe, Sprungweite',
      md: `
Warum entstehen mit Es gerade Verbindungen von 1000 bis 2000 km? Das ist **reine Geometrie**: Die Welle steigt von deiner Antenne zur Wolke in etwa 100 bis 110 km Höhe, wird dort gebrochen und kommt am Boden wieder an. Die Sprungweite hängt von der **Höhe der brechenden Region** und vom **Abstrahlwinkel** ab (flacher Winkel, größere Weite). Die E-Region liegt **tiefer** als die F2-Region (130 bis 450 km); darum ist der **längste mögliche Es-Sprung** mit etwa **2200 km** kürzer als der F2-Sprung (bis etwa 4000 km). Dafür ist die **tote Zone** deutlich **kleiner**: Man kann auch nahe Stationen erreichen, was mit „Short Skip“ gemeint ist: Sprungentfernungen **unter 1000 km**, besonders auf dem 10-m-Band.

Wie es sich anfühlt: Das Band öffnet sich ohne Vorwarnung, weil sich irgendwo eine Wolke gebildet hat, und kann nach kurzer Zeit wieder zu sein. Weil nur **kleine, scharf begrenzte Gebiete** extrem stark ionisiert sind, brechen sie auch Frequenzen weit über den sonstigen KW-Bereich: bis zum **2-m-Band**. Wie bei der MUF gilt: Je höher die Frequenz, desto stärker muss die Ionisation sein.[^darc-50ohm]

Auf der Karte: Von der Mitte Deutschlands (etwa 10° O, 51° N) liegen Rom und Stockholm gut 1000 km entfernt, Madrid knapp 1600 km, Athen etwa 1800 km. Damit ist die „1000 bis 2000 km“-Reichweite mit Es ganz handfest.
`,
    },
    {
      id: 'map-es', type: 'map', title: 'Sporadic-E: typische Reichweiten von Deutschland aus',
      intro: 'Kreise um die Mitte Deutschlands: 1000 und 2000 km. Dazwischen liegt das typische Es-Gebiet. Tippe auf die Städte für die Entfernung.',
      view: [-22, 29, 44, 70],
      places: [
        { name: 'Rom', detail: 'Etwa 1030 km Luftlinie von der Mitte Deutschlands. Auf 6 m und 10 m typisch im Sommer per Es erreichbar.', pos: 'b' },
        { name: 'Stockholm', detail: 'Etwa 1060 km.', pos: 't' },
        { name: 'Helsinki', detail: 'Etwa 1380 km.', pos: 't' },
        { name: 'Madrid', detail: 'Etwa 1580 km.', pos: 'b' },
        { name: 'Athen', detail: 'Etwa 1800 km.', pos: 'b' },
        { name: 'Moskau', detail: 'Etwa 1890 km.', pos: 'b' },
      ],
      points: [{ lon: 10, lat: 51, label: 'Mitte Deutschlands', detail: 'Ausgangspunkt der Entfernungsringe (nur eine grobe Mitte, kein QTH).', pos: 'r', kind: 'site' }],
      lines: [
        { label: '1000 km', coords: [[10,59.99],[12.33,59.9],[14.59,59.61],[16.7,59.15],[18.61,58.52],[20.27,57.74],[21.66,56.84],[22.76,55.84],[23.57,54.76],[24.1,53.63],[24.35,52.47],[24.35,51.3],[24.12,50.14],[23.67,49],[23.02,47.91],[22.2,46.88],[21.22,45.92],[20.11,45.05],[18.88,44.27],[17.55,43.59],[16.14,43.03],[14.66,42.59],[13.13,42.27],[11.58,42.07],[10,42.01],[8.42,42.07],[6.87,42.27],[5.34,42.59],[3.86,43.03],[2.45,43.59],[1.12,44.27],[-0.11,45.05],[-1.22,45.92],[-2.2,46.88],[-3.02,47.91],[-3.67,49],[-4.12,50.14],[-4.35,51.3],[-4.35,52.47],[-4.1,53.63],[-3.57,54.76],[-2.76,55.84],[-1.66,56.84],[-0.27,57.74],[1.39,58.52],[3.3,59.15],[5.41,59.61],[7.67,59.9],[10,59.99]], color: '#c2410c', dashed: true, labelAt: 0.12, detail: 'Unter dieser Entfernung liegt „Short Skip“ (kurzer Sprung).' },
        { label: '2000 km', coords: [[10,68.99],[16.38,68.72],[22.29,67.95],[27.41,66.74],[31.56,65.16],[34.73,63.3],[36.98,61.23],[38.43,59.03],[39.2,56.75],[39.38,54.44],[39.07,52.14],[38.36,49.87],[37.29,47.66],[35.92,45.55],[34.3,43.54],[32.45,41.67],[30.41,39.94],[28.21,38.38],[25.87,37],[23.4,35.8],[20.84,34.81],[18.2,34.03],[15.5,33.47],[12.76,33.13],[10,33.01],[7.24,33.13],[4.5,33.47],[1.8,34.03],[-0.84,34.81],[-3.4,35.8],[-5.87,37],[-8.21,38.38],[-10.41,39.94],[-12.45,41.67],[-14.3,43.54],[-15.92,45.55],[-17.29,47.66],[-18.36,49.87],[-19.07,52.14],[-19.38,54.44],[-19.2,56.75],[-18.43,59.03],[-16.98,61.23],[-14.73,63.3],[-11.56,65.16],[-7.41,66.74],[-2.29,67.95],[3.62,68.72],[10,68.99]], color: '#047857', labelAt: 0.12, detail: 'Obere Grenze der üblichen Es-Verbindungen (maximal etwa 2200 km je Sprung).' },
      ],
      layers: { cities: false, countryLabels: true },
      caption: 'Entfernungen als Großkreis nach Kugelrechnung, Städte als Beispielziele; Sporadic-E tritt unregelmäßig auf, nicht jede Strecke öffnet sich.',
    },
    {
      id: 'demo-es', type: 'viz', viz: 'sporadic-e-sprung', title: 'Sprungweite: Sporadic-E gegen F2',
      intro: 'Wähle die brechende Region und den **Abstrahlwinkel**. Du siehst die Sprungweite und das Gebiet davor, das nicht erreicht wird (**tote Zone**). Vergleiche beide Regionen beim selben Winkel.',
      task: 'Erreiche mit Sporadic-E einen Sprung unter 1000 km (Short Skip), mit der F2-Region einen Sprung über 3000 km, und sieh dir beide Regionen an.',
    },
    {
      id: 'aurora', type: 'text', title: 'Aurora: Funk über das Polarlicht',
      md: `
Teilchen aus dem [Sonnenwind](wiki:Sonnenwind|Solar wind) koppeln in das Erdmagnetfeld ein und werden zu den Polen geleitet. Dort ionisieren sie Sauerstoff und Stickstoff der Hochatmosphäre bis hinab in etwa 90 km Höhe, die E-Region. Das erzeugt das [Polarlicht](wiki:Polarlicht|Aurora) und zugleich eine Schicht, die Funkwellen bricht und streut. Genutzt wird das vor allem auf **6 m und 2 m** für DX.

Die streuenden Gebiete bewegen sich ständig; Signale **flattern** (schnelles Fading) und werden frequenzmäßig verbreitert (Doppler-Spread). Telefonie ist deshalb schwer verständlich, Telegrafie (CW) funktioniert besser, klingt aber sehr **rau**. In der Telegrafie gibt man den **Rapport mit R, S und „A“** für Aurora statt „T“, weil sich der Ton nicht sinnvoll beurteilen lässt (z. B. 59A statt 599). Antennen richtet man bei Aurora üblicherweise nach Norden.
`,
    },
    {
      id: 'aurora-praxis', type: 'text', title: 'Aurora in der Praxis: Norden, Flattern, A statt T',
      md: `
Bei Aurora liegt der Reflektor **im hohen Norden** (Polarlichtzone um den Pol, wohin das [Erdmagnetfeld](wiki:Erdmagnetfeld|Earth's magnetic field) die Teilchen leitet; E-Region ab etwa 90 km). Deshalb richtet man die Antenne bei Aurora üblicherweise **nach Norden**. Die ionisierten Gebiete **brechen** die Wellen und sind dabei in ständiger Bewegung; das ist keine ruhige Spiegelfläche.

Die brechenden Gebiete sind **sehr dynamisch**: Der Signalweg ändert sich ständig und massiv. Zwei Folgen, die du im Kopfhörer hörst:

- **Flattern:** rasche Signalschwankungen (Fading). Der Pegel wackelt schneller, als das Ohr folgen kann.
- **Frequenzverbreiterung** (Doppler-Spread): Das Signal verliert seine saubere Frequenz und klingt **rau, verrauscht, „fauchend“**. Sprache wird dadurch schwer verständlich; **Morsezeichen (CW)** sind deutlich besser lesbar, klingen aber auch rau.

Deshalb beurteilt man den Ton **nicht**: Im RST-Rapport entfällt das **T**, stattdessen gibt man den Buchstaben **A** für Aurora: z. B. **59A** statt 599. Genutzt wird Aurora vor allem im **VHF-Bereich** (6-m- und 2-m-Band) für DX; mit steigender Sonnenaktivität wird sie häufiger.[^darc-50ohm]

**Die vier Wege im Vergleich**

| | Funkhorizont | Troposphäre (Inversion) | Sporadic-E | Aurora |
|---|---|---|---|---|
| Wo | Boden bis Sichtlinie | Wetterschicht, bis etwa 15 km | E-Region, 100 bis 110 km | E-Region, ab etwa 90 km, nahe den Polen |
| Reichweite | Sicht plus etwa 15 % | 800 bis über 1000 km | 1000 bis 2000 km (bis etwa 2200 km) | DX in Richtung Norden |
| Wann | immer | oft Frühjahr/Herbst, Hochdruck | meist Sommer, unvorhersehbar | Sonnenwind trifft Erdmagnetfeld |
| Band | VHF/UHF und höher | VHF/UHF | oberes KW bis 2 m | 6 m und 2 m |
| Klang | normal | normal | normal | rau, flatternd, „A“ im Rapport |
`,
    },
    {
      id: 'demo-ueber', type: 'viz', viz: 'ueberreichweite', title: 'Vier Wege zur Überreichweite',
      intro: 'Schalte zwischen Normalausbreitung, Inversion, Sporadic-E und Aurora um und vergleiche Höhe, Reichweite und Jahreszeit.',
      task: 'Sieh dir alle vier Ausbreitungsarten an.',
    },
    {
      id: 'video', type: 'video', youtube: 'MPSwrnhAbyY', label: 'Lektion 02 – Frequenz und Wellenausbreitung', channel: 'DL2YMR',
      why: 'Der Videolehrgang Klasse N hat ein eigenes Kapitel zu Frequenz und Wellenausbreitung (Titel der Lektion).',
    },
    {
      id: 'mission-es', type: 'callout', tone: 'mission', title: 'Funkpraxis: Der Sommer ist Es-Zeit',
      md: `Zwischen Mai und August öffnet sich auf 6 m und 10 m, manchmal auch auf 2 m, stundenweise der Weg nach Italien, Spanien oder Skandinavien: Sporadic-E. Beobachte Cluster-Meldungen und Beacons. Für „Troposphäre“ schaust du im Frühjahr und Herbst bei stabilem Hochdruck auf 2 m und 70 cm; für Aurora in Zeiten hoher Sonnenaktivität nach Norden.`,
    },
    {
      id: 'warn-tropo', type: 'callout', tone: 'warning', title: 'Verwechslungen: Wer macht was?',
      md: `**Troposphäre** = Wetter, Inversion, 800 bis über 1000 km. **Sporadic-E** = E-Region in 100 bis 110 km, Sommer, 1000 bis 2000 km, kleine tote Zone. **Aurora** = Polarlicht, raue Töne, Rapport „A“. Die Troposphäre ist **nicht** der Teil der Atmosphäre, in dem sporadische E-Regionen oder Aurora entstehen. Prüfungsbezug: NH301 bis NH306, EH301 bis EH305, EH218.`,
    },
    {
      id: 'warn-aurora', type: 'callout', tone: 'warning', title: 'Falsche Vorstellungen: Rapport und Richtung',
      md: `Bei Aurora wird in der Telegrafie **nicht** „T“ beurteilt (der Ton ist sehr rau), sondern „A“ gegeben; es gibt kein „Rapport 599 plus Aurora“. Aurora ist nicht auf Kurzwelle bei 14 MHz, sondern ein **VHF**-Phänomen (6 m, 2 m). Sporadic-E ist **kein** Polarlicht und nicht auf den Winter beschränkt; und Inversion hat nichts mit der Ionosphäre zu tun: sie ist **Wetter**. Prüfungsbezug: EH305, EH304, EH302, EH303.`,
    },
    {
      id: 'q-weg', type: 'quiz', title: 'Welche Ausbreitungsart?',
      question: 'Im Juli hörst du plötzlich auf 2 m Stationen aus 1500 km Entfernung, scharf begrenzt und nur für eine Stunde. Wahrscheinlichste Ursache?',
      options: [
        { text: 'Sporadic-E: stark ionisierte Wolken in der E-Region in 100 bis 110 km Höhe.', correct: true, why: 'Sommer, 1000 bis 2000 km, unvorhersehbar und kurzzeitig: typisch Es.' },
        { text: 'Eine troposphärische Inversion in 800 bis 1000 km Höhe.', why: 'Die Troposphäre endet bei etwa 15 km, Inversionen wirken über 800 bis über 1000 km Entfernung, nicht Höhe.' },
        { text: 'Die Bodenwelle auf 2 m.', why: 'Auf 2 m hat die Bodenwelle kaum Bedeutung.' },
        { text: 'Die D-Region reflektiert die Welle.', why: 'Die D-Region dämpft nur und wirkt auf 2 m nicht.' },
      ],
    },
    {
      id: 'q-hoehe', type: 'quiz', title: 'Antennenhöhe und Reichweite',
      question: 'Wie wirkt sich eine höhere Antenne auf UKW-Verbindungen aus?',
      options: [
        { text: 'Die quasi-optische Sichtweite und damit die Reichweite nimmt zu.', correct: true, why: 'Höhere Antenne, weiterer Horizont.' },
        { text: 'Die Antenne ist näher an der Ionosphäre und wird dort reflektiert.', why: 'Auf UKW wird die Ionosphäre normalerweise nicht genutzt.' },
        { text: 'Die Antenne kann steiler abstrahlen.', why: 'Der Abstrahlwinkel hängt von der Bauform ab, nicht von der Höhe als solcher.' },
        { text: 'In höheren Luftschichten ist es kälter, deshalb verbessert sich die Ausbreitung.', why: 'Mit Temperatur hat das nichts zu tun.' },
      ],
    },
    {
      id: 'num-hor', type: 'numeric', title: 'Reichweite zweier Stationen',
      question: 'Station A hat die Antenne in 16 m Höhe, Station B in 100 m Höhe. Wie weit ist der Funkhorizont zwischen beiden (Faustformel $d\\approx4{,}12(\\sqrt{h_1}+\\sqrt{h_2})$ km)?',
      answer: 57.7, tolerance: 0.03, unit: 'km',
      explain: '$\\sqrt{16}=4$, $\\sqrt{100}=10$: $4{,}12\\cdot14=57{,}7$ km.',
    },
    {
      id: 'order-zeit', type: 'order', title: 'Reichweiten ordnen',
      prompt: 'Ordne die Verfahren nach typischer Reichweite, von klein nach groß.',
      items: ['Funkhorizont (Sichtweite plus etwa 15 %)', 'Troposphärische Überreichweite (800 bis über 1000 km)', 'Sporadic-E (1000 bis 2000 km, max. etwa 2200 km)'],
      explain: 'Funkhorizont: einige zehn bis hundert km. Tropo: 800 bis über 1000 km, Es: 1000 bis etwa 2200 km.',
    },
    {
      id: 'match-ausb', type: 'match', title: 'Ausbreitung und Merkmal',
      prompt: 'Ordne zu.',
      pairs: [
        ['Funkhorizont', 'etwa 15 % weiter als die optische Sicht'],
        ['Inversion', 'Warmluft über Kaltluft in der Troposphäre'],
        ['Sporadic-E', 'Sommer, E-Region 100 bis 110 km, Short Skip'],
        ['Aurora', 'raue Signale, Rapport mit A'],
      ],
    },
    {
      id: 'q-aurora-rapport', type: 'quiz', title: 'Rapport bei Aurora',
      question: 'Du hast in CW ein Aurora-QSO. Wie gibst du den Rapport?',
      options: [
        { text: '59A: R und S wie üblich, statt T den Buchstaben A für Aurora.', correct: true, why: 'Der Ton ist sehr rau und lässt sich nicht beurteilen.' },
        { text: '599: der Ton ist wie bei jeder anderen CW-Verbindung.', why: 'Bei Aurora klingt der Ton rau; man gibt kein T.' },
        { text: '59 und dann „Aurora“ ausgeschrieben.', why: 'Das A ersetzt das T im üblichen Rapport; ausgeschrieben wird nicht.' },
        { text: '5A9: das A kommt in die Mitte.', why: 'Die Reihenfolge ist R, S, dann das A anstelle des T.' },
      ],
    },
    {
      id: 'q-aurora-multi', type: 'quiz', title: 'Aurora: Was stimmt?',
      question: 'Welche Aussagen zu Aurora-Verbindungen stimmen? (mehrere möglich)',
      options: [
        { text: 'Die Signale flattern und klingen rau.', correct: true, why: 'Der Signalweg ändert sich ständig; das erzeugt rasches Fading und Frequenzverbreiterung.' },
        { text: 'Sie werden vor allem auf 6 m und 2 m genutzt.', correct: true, why: 'Aurora ist ein VHF-DX-Weg.' },
        { text: 'Die Antenne richtet man üblicherweise nach Norden.', correct: true, why: 'Das leuchtende Gebiet liegt im Norden.' },
        { text: 'Telefonie klappt besser als Telegrafie.', why: 'Umgekehrt: Sprache wird schwer verständlich, CW ist besser lesbar.' },
        { text: 'Aurora entsteht in der Troposphäre.', why: 'Sie entsteht in der Hochatmosphäre ab etwa 90 km (E-Region).' },
      ],
    },
    {
      id: 'q-mehrweg', type: 'quiz', title: 'Mobil auf 2 m',
      question: 'Beim Fahren mit dem Mobilgerät auf 2 m rauscht das Signal der Gegenstation kurz weg und kommt gleich wieder. Wahrscheinlichste Erklärung?',
      options: [
        { text: 'Mehrwegeausbreitung: Reflexionen überlagern sich gegenphasig (Fading).', correct: true, why: 'Die Phasenlage der Teilwellen ändert sich mit dem Ort; an manchen Punkten löschen sie sich teilweise aus.' },
        { text: 'Die Sonne hat einen Flare ausgelöst (Mögel-Dellinger-Effekt).', why: 'Der betrifft Kurzwelle über die Raumwelle, nicht 2 m.' },
        { text: 'Die D-Region dämpft kurz stärker.', why: 'D-Region und Raumwelle spielen auf 2 m keine Rolle.' },
        { text: 'Aurora über dem Fahrzeug.', why: 'Aurora wirkt über sehr viel größere Skalen und wechselt nicht in Sekunden mit dem Fahrort.' },
      ],
    },
    {
      id: 'num-berg', type: 'numeric', title: 'Berg und Handfunke',
      question: 'Eine Station steht auf einem Berg (Antenne 400 m über Grund), die andere ist ein Handfunkgerät in 1,5 m Höhe. Welche Reichweite hat der Funkhorizont nach $d\\approx4{,}12(\\sqrt{h_1}+\\sqrt{h_2})$ km?',
      answer: 87.5, tolerance: 0.03, unit: 'km',
      explain: '$\\sqrt{400}=20$, $\\sqrt{1{,}5}\\approx1{,}22$: $4{,}12\\cdot21{,}22\\approx87{,}5$ km. Fast der gesamte Beitrag kommt vom Berg.',
    },
    {
      id: 'order-skip-tropo', type: 'order', title: 'Vom Wetter zur Überreichweite',
      prompt: 'Bringe die Schritte in die richtige Reihenfolge.',
      items: [
        'Hochdruckwetter im Frühjahr oder Herbst, warme Luft legt sich über kalte',
        'An der Grenze der Luftmassen ändern sich Temperatur und Dichte sprunghaft',
        'Die VHF/UHF-Wellen werden gebeugt, reflektiert und gestreut und zur Erde zurückgelenkt',
        'Verbindungen über 800 bis über 1000 km kommen zustande',
      ],
      explain: 'Ursache ist das Wetter in der Troposphäre (Inversion); die Folge sind Überhorizontverbindungen im VHF/UHF-Bereich.',
    },
    {
      id: 'match-wo-was', type: 'match', title: 'Phänomen und Fachbegriff',
      prompt: 'Ordne zu.',
      pairs: [
        ['Warme Luft über kalter', 'Inversionswetterlage'],
        ['Kleine, extrem stark ionisierte Wolken im Sommer', 'Sporadic-E'],
        ['Sprungentfernung unter 1000 km auf 10 m', 'Short Skip'],
        ['Rauer Ton, Rapport mit A', 'Aurora'],
        ['Mehrere Wege, Phasenverschiebung', 'Fading'],
      ],
    },
    {
      id: 'recall-ueber', type: 'recall', title: 'In eigenen Worten',
      prompt: 'Vergleiche Troposphären-Überreichweite und Sporadic-E: Wo entsteht sie, wann tritt sie auf, wie weit trägt sie, wie lässt sie sich nutzen?',
      answer: 'Troposphäre: Wetterschicht bis etwa 15 km, Inversionswetterlage (warm über kalt), vor allem Frühjahr und Herbst; Wellen werden an den Schichtgrenzen gebeugt, reflektiert und gestreut; Reichweiten 800 bis über 1000 km; im VHF/UHF-Bereich der häufigste Weitverkehrsweg und wetterabhängig. Sporadic-E: E-Region in 100 bis 110 km Höhe, im Sommer, kleinräumige stark ionisierte Wolken, nicht vorhersagbar; Brechung zur Erde, Reichweite 1000 bis 2000 km (bis etwa 2200 km), kleine tote Zone (Short Skip); nutzbar vom oberen KW-Bereich bis 2 m.',
      cards: ['uw-tropo', 'uw-es'],
    },
    {
      id: 'recall-skip', type: 'recall', title: 'Warum Short Skip?',
      prompt: 'Erkläre, warum bei Sporadic-E schon Verbindungen unter 1000 km möglich sind, bei der F2-Region aber nicht, und warum die maximale Sprungweite bei Es kleiner ist.',
      answer: 'Die Sprungweite ergibt sich geometrisch aus Höhe der brechenden Region und Abstrahlwinkel. Die E-Region liegt mit 100 bis 110 km tiefer als die F2-Region (bis 450 km). Bei gleichem Abstrahlwinkel setzt die Welle daher näher beim Sender wieder auf: die tote Zone ist deutlich kleiner, es gelingen kurze Verbindungen (Short Skip, unter 1000 km, besonders 10 m). Weil die Region niedriger ist, ist aber auch der längste mögliche Sprung kürzer (höchstens etwa 2200 km gegenüber bis zu 4000 km bei F2).',
      cards: ['uw-es-tote', 'uw-es-max'],
    },
    {
      id: 'wrap', type: 'callout', tone: 'fact', title: 'Zum Mitnehmen',
      md: `Normalfall: Funkhorizont etwa 15 % über der Sicht, mehr Antennenhöhe bringt mehr Reichweite. Sonderfälle: Inversion in der Troposphäre (800 bis über 1000 km), Sporadic-E (Sommer, 100 bis 110 km Höhe, 1000 bis 2000 km) und Aurora (rau, Rapport mit A).[^bnetza-fragenkatalog]`,
    },
  ],
  cards: [
    { id: 'uw-horizont', front: 'Funkhorizont im UKW-Bereich?', back: 'Etwa 15 % weiter als der geografische (optische) Horizont, weil die Wellen der Erdkrümmung etwas folgen.' },
    { id: 'uw-hoehe', front: 'Warum bringt eine höhere UKW-Antenne mehr Reichweite?', back: 'Die quasi-optische Sichtweite nimmt zu.' },
    { id: 'uw-sicht', front: 'VHF/UHF-Verbindung am besten wenn …', back: 'Sichtverbindung besteht (Gipfel, freie Sicht); Berge und Gebäude schatten ab.' },
    { id: 'uw-tropo', front: 'Troposphäre', back: 'Teil der Atmosphäre, in dem das Wetter stattfindet (bis etwa 15 km).' },
    { id: 'uw-inversion', front: 'Überreichweite durch Inversion', back: 'Warme Luft über kalter: Beugung, Reflexion, Streuung an Schichten; Reichweite 800 bis über 1000 km; Hauptweg für VHF-Weitverkehr.' },
    { id: 'uw-es', front: 'Sporadic-E', back: 'Brechung in lokal begrenzten, ungewöhnlich stark ionisierten Bereichen der E-Region (100 bis 110 km), vor allem im Sommer; 1000 bis 2000 km.' },
    { id: 'uw-short', front: 'Short Skip (10 m)', back: 'Sprungentfernungen unter 1000 km durch Refraktion in sporadischen E-Regionen.' },
    { id: 'uw-aurora', front: 'Aurora in Telegrafie: Rapport?', back: 'R, S und A (für Aurora); der Ton ist sehr rau und wird nicht beurteilt.' },
    { id: 'uw-aurora2', front: 'Aurora: Entstehung und Bänder', back: 'Sonnenwind-Teilchen ionisieren die E-Region nahe den Polen (Polarlicht); vor allem 6 m und 2 m; Signale flattern.' },
    { id: 'uw-formel', front: 'Faustformel Funkhorizont', back: '$d\\approx4{,}12\\sqrt{h}$ km (h in m); optisch $3{,}57\\sqrt{h}$ km.' },
    { id: 'uw-es-tote', front: 'Sporadic-E: tote Zone?', back: 'Deutlich kleiner als bei F2, weil die E-Region tiefer liegt: auch kürzere Verbindungen möglich (Short Skip).' },
    { id: 'uw-es-max', front: 'Maximale Sprungdistanz bei Sporadic-E?', back: 'Höchstens etwa 2200 km (F2: bis etwa 4000 km), weil die E-Region tiefer liegt.' },
    { id: 'uw-tropo-wann', front: 'Wann Überreichweite durch Inversion?', back: 'Vor allem im Frühjahr und Herbst bei stabilem Hochdruck; im VHF/UHF-Bereich, 800 bis über 1000 km.' },
    { id: 'uw-mehrweg', front: 'Mehrwegeausbreitung', back: 'Signal erreicht den Empfänger auf mehreren Wegen; Amplituden addieren sich phasenabhängig: Verstärkung, Abschwächung, Fading (QSB).' },
    { id: 'uw-aurora-nord', front: 'Aurora: Antennenrichtung und Klang?', back: 'Antenne nach Norden; Signal flattert und klingt rau (Doppler-Spread); CW besser als Sprache.' },
    { id: 'uw-duct', front: 'Ducting', back: 'Eine Luftschicht an der Inversion führt die VHF/UHF-Welle wie ein Wellenleiter weit um die Erdkrümmung.' },
  ],
};
