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
  minutes: 15,
  goals: [
    'Erklären, warum der [[funkhorizont]] etwa 15 % weiter reicht als der sichtbare Horizont und wie die Antennenhöhe die Reichweite bestimmt',
    'Troposphäre als Wetterschicht einordnen und Überreichweiten bei [[inversionswetterlage]] (800 bis über 1000 km) erklären',
    '[[sporadic-e]] beschreiben: E-Region in 100 bis 110 km Höhe, Sommer, 1000 bis 2000 km, „Short Skip“',
    'Aurora-Ausbreitung einordnen (Polarlicht, rauer Ton, Rapport mit „A“)',
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
      id: 'es', type: 'text', title: 'Sporadic-E: Sommerüberreichweiten',
      md: `
In den **Sommermonaten** (in den gemäßigten Breiten) entstehen in der **E-Region der Ionosphäre**, in etwa **100 bis 110 km Höhe**, meist kleinräumige, scharf begrenzte und außergewöhnlich stark ionisierte „Wolken“: die **[[sporadic-e|sporadische E-Schicht (Sporadic-E, Es)]]** ([Sporadic-E](wiki:Sporadic-E|Sporadic E propagation)). Diese Bereiche **brechen (refraktieren)** Funkwellen sehr hoher Frequenz zur Erde zurück, bis hinauf ins 2-m-Band. Ihr Auftreten lässt sich nicht vorhersagen („sporadisch“).

Typische Reichweite: **1000 bis 2000 km** (maximal etwa 2200 km). Weil die Brechung in der relativ niedrigen E-Region stattfindet, ist die **tote Zone klein**; deshalb gelingen auch recht kurze Verbindungen: **„Short Skip“** (englisch für kurzen Sprung). Auch im 10-m-Band sind so Verbindungen unter 1000 km möglich. Wenn ein Funkamateur sagt, auf 2 m herrschten Sporadic-E-Bedingungen, meint er: Stationen aus 1000 bis 2000 km sind über Refraktion in der sporadischen E-Region zu hören, nicht aus Nordamerika und nicht über „leuchtende Nachtwolken“, Polarkreis-Ionisation oder Meteorbahnen. Die Brechung geschieht zudem nicht in der F1-, F2- oder der D-Region.
`,
    },
    {
      id: 'aurora', type: 'text', title: 'Aurora: Funk über das Polarlicht',
      md: `
Teilchen aus dem [Sonnenwind](wiki:Sonnenwind|Solar wind) koppeln in das Erdmagnetfeld ein und werden zu den Polen geleitet. Dort ionisieren sie Sauerstoff und Stickstoff der Hochatmosphäre bis hinab in etwa 90 km Höhe, die E-Region. Das erzeugt das [Polarlicht](wiki:Polarlicht|Aurora) und zugleich eine Schicht, die Funkwellen bricht und streut. Genutzt wird das vor allem auf **6 m und 2 m** für DX.

Die streuenden Gebiete bewegen sich ständig; Signale **flattern** (schnelles Fading) und werden frequenzmäßig verbreitert (Doppler-Spread). Telefonie ist deshalb schwer verständlich, Telegrafie (CW) funktioniert besser, klingt aber sehr **rau**. In der Telegrafie gibt man den **Rapport mit R, S und „A“** für Aurora statt „T“, weil sich der Ton nicht sinnvoll beurteilen lässt (z. B. 59A statt 599). Antennen richtet man bei Aurora üblicherweise nach Norden.
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
      id: 'recall-ueber', type: 'recall', title: 'In eigenen Worten',
      prompt: 'Vergleiche Troposphären-Überreichweite und Sporadic-E: Wo entsteht sie, wann tritt sie auf, wie weit trägt sie, wie lässt sie sich nutzen?',
      answer: 'Troposphäre: Wetterschicht bis etwa 15 km, Inversionswetterlage (warm über kalt), vor allem Frühjahr und Herbst; Wellen werden an den Schichtgrenzen gebeugt, reflektiert und gestreut; Reichweiten 800 bis über 1000 km; im VHF/UHF-Bereich der häufigste Weitverkehrsweg und wetterabhängig. Sporadic-E: E-Region in 100 bis 110 km Höhe, im Sommer, kleinräumige stark ionisierte Wolken, nicht vorhersagbar; Brechung zur Erde, Reichweite 1000 bis 2000 km (bis etwa 2200 km), kleine tote Zone (Short Skip); nutzbar vom oberen KW-Bereich bis 2 m.',
      cards: ['uw-tropo', 'uw-es'],
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
  ],
};
