export default {
  id: 'energie',
  title: 'Energie & Energiewende',
  summary: 'Woher unser Strom kommt, warum Deutschland aus Atom und Kohle aussteigt und was die [[energiewende]] bedeutet — mit den Zahlen und Daten, die in jeder Debatte fallen.',
  minutes: 22,
  goals: [
    'Fossile, nukleare und [[erneuerbare-energien|erneuerbare]] Energiequellen mit Vor- und Nachteilen unterscheiden',
    'Die Geschichte des [[atomausstieg|Atomausstiegs]] mit den wichtigsten Daten wiedergeben',
    'Wissen, wie groß der Anteil erneuerbarer Energien am Strom und am gesamten Energieverbrauch ist',
    'Die Ziele und Baustellen der [[energiewende]] benennen',
  ],
  blocks: [
    {
      id: 'quellen', type: 'text', title: 'Woher die Energie kommt',
      md: `
Nach dem Satz von der [[energieerhaltung]] „erzeugt“ kein Kraftwerk Energie — es wandelt sie um. Die Quellen lassen sich in drei Gruppen teilen:

<table>
<tr><th>Gruppe</th><th>Beispiele</th><th>Vorteile</th><th>Nachteile</th></tr>
<tr><td><b>Fossil</b></td><td>Braunkohle, Steinkohle, Erdöl, Erdgas</td><td>jederzeit abrufbar, hohe Energiedichte</td><td>CO₂ und Klimawandel, endlich, Importabhängigkeit</td></tr>
<tr><td><b>Nuklear</b></td><td>Kernspaltung von Uran</td><td>kaum CO₂ im Betrieb, grundlastfähig</td><td>Unfallrisiko, Atommüll für Hunderttausende Jahre, teuer im Neubau</td></tr>
<tr><td><b>Erneuerbar</b></td><td>Wind, Sonne (Photovoltaik), Wasser, Biomasse, Erdwärme</td><td>unerschöpflich, kaum CO₂, heimisch</td><td>schwankend (Wetter, Tageszeit), braucht Speicher und Netze, Flächenbedarf</td></tr>
</table>

Fossile Brennstoffe sind gespeicherte Sonnenenergie: Pflanzen, die vor Jahrmillionen per Photosynthese wuchsen. Beim Verbrennen wird ihr Kohlenstoff als **CO₂** frei — die Hauptursache des menschengemachten Klimawandels. Deutschland hat große **Braunkohle**-Vorkommen (Rheinisches Revier, Lausitz, Mitteldeutschland); Braunkohle ist der klimaschädlichste Energieträger.`,
    },
    {
      id: 'match-quellen', type: 'match', title: 'Quelle und Prinzip',
      pairs: [['Photovoltaik', 'Solarzellen wandeln Licht direkt in Strom'], ['Windkraft', 'Rotor treibt einen Generator an'], ['Kernkraft', 'Wärme aus der Spaltung von Urankernen'], ['Kohlekraftwerk', 'Verbrennung erhitzt Wasser zu Dampf, der eine Turbine dreht'], ['Wasserkraft', 'Fallendes oder fließendes Wasser dreht eine Turbine'], ['Geothermie', 'Wärme aus dem Erdinneren']],
    },
    {
      id: 'atom', type: 'text', title: 'Der Atomausstieg',
      md: `
Grundlage der Kernenergie ist die [[kernspaltung]], entdeckt im Dezember **1938** von **Otto Hahn** und **Fritz Straßmann** in Berlin, gedeutet von **Lise Meitner** und Otto Frisch.[^tech-wp-kernspaltung] Das erste deutsche Kernkraftwerk ging 1961 in Kahl (Bayern) ans Netz. Seit den 1970ern war Atomkraft heftig umstritten — die Anti-AKW-Bewegung (Wyhl, Brokdorf, Gorleben) war eine Wurzel der Grünen. Die Katastrophe von **Tschernobyl** (26. April 1986) verstärkte die Skepsis.

Die Stationen des [[atomausstieg|Atomausstiegs]]:[^tech-wp-atomausstieg]

1. **2000/2002:** Die rot-grüne Regierung Schröder vereinbart mit den Energieversorgern den Ausstieg („Atomkonsens“).
2. **2010:** Die schwarz-gelbe Regierung Merkel verlängert die Laufzeiten.
3. **11. März 2011:** Reaktorkatastrophe von **Fukushima** in Japan. Wenige Monate später beschließt der Bundestag mit großer Mehrheit den beschleunigten Ausstieg bis Ende 2022; acht Reaktoren gehen sofort vom Netz.
4. **2022:** Wegen der Energiekrise nach dem russischen Angriff auf die Ukraine laufen die letzten drei Kraftwerke länger.
5. **15. April 2023:** **Isar 2, Emsland und Neckarwestheim 2** werden abgeschaltet — Deutschland ist aus der Kernenergie ausgestiegen.

Offen bleibt die **Endlagerfrage**: Für hochradioaktiven Müll wird ein Standort gesucht, der eine Million Jahre sicher ist.`,
    },
    {
      id: 'order-atom', type: 'order', title: 'Atomausstieg in der richtigen Reihenfolge',
      prompt: 'Sortiere die Ereignisse chronologisch.',
      items: ['Entdeckung der Kernspaltung in Berlin', 'Erstes deutsches Kernkraftwerk in Kahl', 'Tschernobyl-Katastrophe', 'Atomkonsens der rot-grünen Regierung', 'Laufzeitverlängerung unter Schwarz-Gelb', 'Fukushima und beschleunigter Ausstieg', 'Abschaltung der letzten drei Kraftwerke'],
      explain: '1938 → 1961 → 1986 → 2000 → 2010 → 2011 → 15. April 2023.',
    },
    {
      id: 'wende', type: 'text', title: 'Die Energiewende',
      md: `
Die [[energiewende]] bezeichnet den Umbau der gesamten Energieversorgung weg von fossilen und nuklearen Quellen hin zu [[erneuerbare-energien|erneuerbaren Energien]].[^tech-wp-energiewende] Zentrale Bausteine:

- **Erneuerbare-Energien-Gesetz (EEG), 2000:** garantierte Einspeisevergütungen machten Wind- und Solarstrom wirtschaftlich; Deutschland löste damit weltweit einen Preissturz bei Solarzellen mit aus.
- **Atomausstieg** (abgeschlossen 2023) und **Kohleausstieg** (gesetzlich spätestens **2038**).
- **Klimaneutralität bis 2045** laut Klimaschutzgesetz (verschärft 2021 nach einem Urteil des Bundesverfassungsgerichts).
- Ausbau von **Stromnetzen** (Windstrom aus dem Norden muss in den industriestarken Süden) und **Speichern**; **Elektrifizierung** von Verkehr (E-Autos) und Wärme (Wärmepumpen); grüner **Wasserstoff** für die Industrie.

**Wo stehen wir?** Beim **Strom** stammten 2025 bereits rund **55 %** des Verbrauchs aus erneuerbaren Quellen, vor allem aus Wind und Sonne. Beim **gesamten Energieverbrauch** — also inklusive Heizen, Verkehr und Industrie — waren es aber erst knapp **24 %**.[^tech-uba-ee] Die Stromwende ist also weit, die Wärme- und Verkehrswende steht noch am Anfang.`,
    },
    {
      id: 'calc-anteil', type: 'numeric', title: 'Strom gegen Gesamtenergie',
      question: 'Angenommen, der gesamte Endenergieverbrauch beträgt 2.400 TWh, davon sind 500 TWh Strom. Wenn 55 % des Stroms erneuerbar sind, wie viel **Prozent des Gesamtverbrauchs** deckt allein erneuerbarer Strom? (Auf ganze Prozent gerundet.)',
      answer: 11, tolerance: 0.6, unit: '%',
      hint: '55 % von 500 TWh sind 275 TWh. Welcher Anteil von 2.400 TWh ist das?',
      explain: '275 ÷ 2.400 ≈ 0,115 → rund **11 %**. Das zeigt, warum ein hoher Ökostromanteil allein nicht reicht: Strom ist nur ein Teil des Energieverbrauchs. (Vereinfachte Beispielzahlen; die übrigen Erneuerbaren stammen vor allem aus Biomasse in Wärme und Verkehr.)',
    },
    {
      id: 'quiz-energie', type: 'quiz', title: 'Fakten-Check',
      question: 'Welche Aussagen stimmen?',
      options: [
        { text: 'Die letzten deutschen Kernkraftwerke gingen am 15. April 2023 vom Netz.', correct: true, why: 'Isar 2, Emsland und Neckarwestheim 2.' },
        { text: 'Mehr als die Hälfte des in Deutschland verbrauchten Stroms stammt inzwischen aus erneuerbaren Quellen.', correct: true, why: '2025 rund 55 %.' },
        { text: 'Mehr als die Hälfte der gesamten Energie in Deutschland ist erneuerbar.', correct: false, why: 'Beim gesamten Endenergieverbrauch (inkl. Wärme und Verkehr) sind es knapp ein Viertel.' },
        { text: 'Der Atomausstieg wurde erstmals nach Fukushima beschlossen.', correct: false, why: 'Der erste Ausstiegsbeschluss stammt von 2000/2002 (rot-grün); nach Fukushima wurde er nach einer Laufzeitverlängerung beschleunigt.' },
        { text: 'Laut Gesetz soll Deutschland bis 2045 klimaneutral sein.', correct: true, why: 'Klimaschutzgesetz in der Fassung von 2021.' },
      ],
    },
    {
      id: 'timeline-energie', type: 'viz', viz: 'timeline', title: 'Energiegeschichte Deutschlands',
      params: {
        events: [
          { year: 1938, label: 'Kernspaltung entdeckt', detail: 'Otto Hahn, Fritz Straßmann; Deutung Lise Meitner, Otto Frisch.' },
          { year: 1961, label: 'Erstes AKW (Kahl)', detail: 'Versuchsatomkraftwerk Kahl in Bayern.' },
          { year: 1986, label: 'Tschernobyl', detail: 'Reaktorkatastrophe in der heutigen Ukraine.' },
          { year: 2000, label: 'EEG & Atomkonsens', detail: 'Erneuerbare-Energien-Gesetz und Ausstiegsvereinbarung.' },
          { year: 2011, label: 'Fukushima', detail: 'Beschleunigter Atomausstieg bis 2022 beschlossen.' },
          { year: 2020, label: 'Kohleausstiegsgesetz', detail: 'Ausstieg aus der Kohleverstromung spätestens 2038.' },
          { year: 2023, label: 'Letzte AKW abgeschaltet', detail: '15. April 2023.' },
          { year: 2045, label: 'Ziel: klimaneutral', detail: 'Laut Klimaschutzgesetz.' },
        ],
      },
    },
    {
      id: 'fact-energiewende', type: 'callout', tone: 'fact', title: 'Ein deutsches Wort geht um die Welt',
      md: `Wie *Kindergarten*, *Angst* oder *Zeitgeist* ist auch **„Energiewende“** ins Englische eingewandert — internationale Medien verwenden das Wort meist unübersetzt, wenn sie über Deutschlands Energiepolitik berichten.`,
    },
    {
      id: 'recall-wende', type: 'recall', title: 'Argumentiere ausgewogen',
      prompt: 'Warum ist es schwieriger, die Energieversorgung vollständig auf Wind und Sonne umzustellen, als nur den Strom „grüner“ zu machen? Nenne mindestens zwei Gründe.',
      answer: `Erstens sind Wind und Sonne **wetterabhängig und schwankend** („Dunkelflaute“); man braucht **Speicher**, flexible Reservekraftwerke und große **Netze**, um Strom vom windreichen Norden in den Süden zu bringen. Zweitens ist Strom nur ein Teil des Energiebedarfs: **Heizen, Verkehr und Industrie** laufen noch überwiegend mit Öl, Gas und Kohle. Sie müssen erst **elektrifiziert** werden (Wärmepumpen, E-Autos) oder auf grünen **Wasserstoff** umsteigen — das erfordert neue Geräte, Fahrzeuge, Anlagen und viel Zeit und Geld. Deshalb liegt der Erneuerbaren-Anteil beim Strom bei rund 55 %, bei der gesamten Energie aber erst bei knapp einem Viertel.`,
      hints: ['Was passiert nachts bei Windstille?', 'Welche Bereiche verbrauchen Energie, aber (noch) kaum Strom?'],
      cards: ['strom-gesamt'],
    },
  ],
  cards: [
    { id: 'fossil', front: 'Fossile Energieträger', back: 'Braunkohle, Steinkohle, Erdöl, Erdgas — gespeicherte Sonnenenergie urzeitlicher Pflanzen; setzen beim Verbrennen CO₂ frei.' },
    { id: 'erneuerbar', front: 'Die wichtigsten erneuerbaren Energiequellen', back: 'Wind, Sonne (Photovoltaik, Solarthermie), Wasser, Biomasse, Erdwärme.' },
    { id: 'pv', front: 'Photovoltaik vs. Solarthermie', back: 'Photovoltaik: Licht → Strom (Solarzellen). Solarthermie: Licht → Wärme (Warmwasser).' },
    { id: 'kernspaltung', front: 'Wer entdeckte 1938 die Kernspaltung?', back: 'Otto Hahn und Fritz Straßmann (Berlin); die Deutung lieferten Lise Meitner und Otto Frisch.' },
    { id: 'tschernobyl', front: 'Wann war die Katastrophe von Tschernobyl?', back: '26. April 1986.' },
    { id: 'fukushima', front: 'Wann war Fukushima — und was folgte in Deutschland?', back: '11. März 2011; beschleunigter Atomausstieg bis Ende 2022, acht Reaktoren sofort abgeschaltet.' },
    { id: 'atomkonsens', front: 'Erster Beschluss zum Atomausstieg', back: '2000/2002 unter der rot-grünen Bundesregierung (Schröder) — „Atomkonsens“.' },
    { id: 'aus', front: 'Wann gingen die letzten deutschen Kernkraftwerke vom Netz?', back: 'Am 15. April 2023 (Isar 2, Emsland, Neckarwestheim 2).' },
    { id: 'kohleausstieg', front: 'Bis wann steigt Deutschland spätestens aus der Kohle aus?', back: 'Bis 2038 (Kohleausstiegsgesetz 2020).' },
    { id: 'klimaneutral', front: 'Bis wann soll Deutschland klimaneutral sein?', back: 'Bis 2045 (Klimaschutzgesetz, 2021).' },
    { id: 'eeg', front: 'Was ist das EEG?', back: 'Das Erneuerbare-Energien-Gesetz (2000): garantierte Vergütung für Ökostrom, Motor des Ausbaus.' },
    { id: 'anteil-strom', front: 'Anteil erneuerbarer Energien am deutschen Stromverbrauch (2025)', back: 'Rund 55 %.' },
    { id: 'strom-gesamt', front: 'Warum ist der Erneuerbaren-Anteil an der Gesamtenergie viel kleiner als beim Strom?', back: 'Heizen, Verkehr und Industrie laufen noch größtenteils fossil; beim gesamten Endenergieverbrauch waren es 2025 knapp 24 %.' },
    { id: 'braunkohle', front: 'Wo liegen Deutschlands Braunkohlereviere?', back: 'Rheinisches Revier, Lausitz, Mitteldeutsches Revier.' },
    { id: 'endlager', front: 'Welches Problem bleibt nach dem Atomausstieg?', back: 'Die Suche nach einem Endlager für hochradioaktiven Müll, das für rund eine Million Jahre sicher ist.' },
    { id: 'dunkelflaute', front: 'Was ist eine „Dunkelflaute“?', back: 'Eine Wetterlage mit wenig Wind und wenig Sonne — die große Herausforderung für ein Stromsystem aus Erneuerbaren.' },
  ],
};
