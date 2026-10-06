// Lektion digitale-betriebsarten: CW-Betrieb und Abkürzungen, Digimodes per SSB, Wasserfall, SSTV/ATV, NF-Pegel und ALC bei Digimodes,
// 9600-Port, digitale Sprache (DMR, D-STAR, C4FM, M17, FreeDV), automatische Empfangsberichte, Paketnetze und IP (HAMNET).
// Quellen für Fakten: DARC 50ohm.de (CC BY 4.0), AFuV § 16 (Stand 05.10.2026), BNetzA-Fragenkatalog 3. Auflage.

export default {
  id: 'digitale-betriebsarten',
  title: 'Digitale Betriebsarten in der Praxis',
  summary: 'RTTY, PSK31, FT8, Packet, Digital Voice, Digimodes per SSB, 9600-Baud-Port, Übersteuerung, automatische Empfangsberichte.',
  minutes: 33,
  goals: [
    'Telegrafie-Betrieb abwickeln: Betriebsabkürzungen (CQ, DE, K, BK, R), Anruf und Tempo',
    'Erklären, warum Digimodes per SSB gesendet werden und wie viele schmale Signale in einen 2,4-kHz-Kanal passen',
    'Den NF-Pegel am Transceiver so einstellen, dass die ALC nicht eingreift, und begründen, warum',
    'Digitale Sprache (DMR, D-STAR, C4FM, M17, FreeDV), Zeitschlitze, automatische Empfangsberichte und Paketnetze (HAMNET, IP) einordnen',
    'Das Morse-Zeitraster und die Paris-Regel anwenden (WPM in Punktlänge umrechnen) und erklären, wie Pakete mit Adresse, Prüfsumme und Quittung zuverlässig ankommen',
  ],
  needs: ['am-ssb-cw', 'fm-und-sprachbetrieb'],
  blocks: [
    {
      id: 'intro', type: 'text', title: 'Digital funken: älter, als man denkt',
      md: `
Digital heißt: Es gibt nur **bestimmte Stufen** und nichts dazwischen. [[cw-tastung|CW]] kennt zwei (Träger an, Träger aus) und ist deshalb schon digital. Mit Computern kamen viele weitere Verfahren dazu, die **[[digimode|Digimodes]]**: Der Computer erzeugt und liest ein **NF-Signal**, das über das normale Funkgerät gesendet wird. Vom alten [Fernschreiber](wiki:Fernschreiber|Teleprinter) am Funkgerät ([[rtty|RTTY]], *radio teletype*) ist nur der Name geblieben.[^darc-50ohm]

Jede digitale Verbindung braucht eine Absprache, die beim Sprechfunk nebenbei entsteht: Beide Stationen müssen dasselbe **Übertragungsverfahren** und gegebenenfalls dieselben **Verfahrensparameter** verwenden (NE401). Die Frequenz allein genügt nicht, weil viele Digimodes keine eigene Frequenz haben und man sie nur am Wasserfalldiagramm erkennt. Keine Rolle spielen die Zeitzone (Sommerzeit), die Tageszeit (Nacht/Abend) oder ein „möglichst schnelles Verfahren, um das Band zu entlasten“.
`,
    },
    {
      id: 'warn-ne401', type: 'callout', tone: 'warning', title: 'Verfahren, Zeit und Tempo',
      md: `
Die falschen Antworten zu NE401 klingen nach Betriebserfahrung. „Beide brauchen dieselbe Zeitzoneneinstellung“: Die **Zeitzone** ist egal ([[ft8|FT8]] braucht zwar eine genaue Uhr, aber eine genaue *Zeit*, keine bestimmte Zeitzone). „Bevorzugt abends und nachts senden“: Es gibt keine solche Regel. „Bevorzugt ein schnelles Verfahren, damit das Band entlastet wird“: Ein schnelles Verfahren ist nicht automatisch das bessere. Richtig ist allein, dass **Sender und Empfänger zueinander passen**.
`,
    },
    {
      id: 'cw-text', type: 'text', title: 'CW-Betrieb und Betriebsabkürzungen',
      md: `
Auch beim Morsen gilt: Es läuft ähnlich ab wie ein Sprechfunk-QSO, aber **abgekürzt**. Der Grund ist (BB101): Die **Abkürzungen und [Q-Gruppen](wiki:Q-Schlüssel|Q code)** vereinfachen den Betriebsablauf und **optimieren den Informationsgehalt pro Zeiteinheit**. Sie verschleiern nichts: Der **internationale Amateurschlüssel** und die **international gebräuchlichen Betriebsabkürzungen gelten als offene Sprache** (§ 16 Abs. 7 AFuV); Verschlüsselung ist verboten (Abs. 8).[^afuv] Sie dienen auch nicht dem Doppler-Ausgleich bei Satelliten oder als Kennung bei der Fuchsjagd.

<div style="overflow-x:auto"><table>
<tr><th>Abkürzung</th><th>Bedeutung</th></tr>
<tr><td><b>CQ</b></td><td>allgemeiner Anruf</td></tr>
<tr><td><b>DE</b></td><td>von</td></tr>
<tr><td><b>K</b></td><td><b>Aufforderung zum Senden</b> (am Ende eines Durchgangs)</td></tr>
<tr><td><b>BK</b></td><td><b>Unterbrechung einer laufenden Sendung</b>; auch formlose Übergabe</td></tr>
<tr><td><b>R</b></td><td><b>Received</b>: empfangen (am Anfang eines Durchgangs)</td></tr>
<tr><td>PSE · TNX · UR · VY</td><td>bitte · danke · dein / du bist · sehr</td></tr>
<tr><td>RST · RPRT</td><td>Rapport (Lesbarkeit, Signalstärke, Tonqualität)</td></tr>
<tr><td>QSL</td><td>ich bestätige den Empfang</td></tr>
<tr><td>73</td><td>viele Grüße</td></tr>
<tr><td>SK</td><td>Ende der Verbindung</td></tr>
<tr><td>=</td><td>Trennzeichen innerhalb eines Durchgangs</td></tr>
</table></div>

Die Falle in den Fragen sind die ähnlichen Bedeutungen: **K** heißt nicht „Unterbrechung“ (das ist BK), **R** nicht „Repeat“, „Rapport“ oder „Readability“, sondern **Received**, und **BK** nicht „Alles richtig verstanden“ oder „Beendigung des Funkverkehrs“ (das wäre SK). Prüfungsbezug: BB108, BB109, BB110.

## Der allgemeine Anruf

Als DL2AB rufst du **CQ CQ CQ DE DL2AB DL2AB DL2AB PSE K** (BE112): dreimal „CQ“, dann „DE“, dein Rufzeichen dreimal, „bitte“ und die Aufforderung zum Senden. Die Alternativen verwenden ein erfundenes „FRM“, **QRZ** (das fragt „Wer ruft mich?“ und kommt nach einem Anruf, nicht davor) oder mischen beides.

\`\`\`
CQ CQ CQ DE DL2AB DL2AB DL2AB PSE K
> DL2AB DE DL1PZ K
DL1PZ DE DL2AB = UR RST 579 579 = NAME SIGI = DL1PZ DE DL2AB K
> DL2AB DE DL1PZ = R TNX RPRT = UR 599 599 BK
BK QSL = VY 73 DE DL2AB SK
> R 73 DE DL1PZ SK
\`\`\`

(Aufbau nach dem Muster des DARC-Kurses, 50ohm.de, CC BY 4.0; das > markiert die Antworten der Gegenstation.)

## Das Tempo

Morsezeichen kann man unterschiedlich schnell geben; aufnehmen zu können, braucht Übung. Zwei Regeln, die der Katalog gleich zweimal abfragt:

- **Einen Anruf beantwortest du genauso schnell oder langsamer als der Anruf** (BE117), nicht in deiner gewohnten Geschwindigkeit, nicht mit „höchstem fehlerfrei gebbaren“ Tempo.
- **Gib nicht schneller, als du selbst aufnehmen kannst, und passe dich langsameren Stationen an** (BE118). Ein „international festgelegtes Einheitstempo von 12 WPM“ gibt es nicht; „andere müssen sich an mich anpassen“ ist schlechter Funkstil.

(Ein Tempo wird in **WPM** gemessen, also Wörtern pro Minute; ein Wort sind 5 Zeichen, **20 WPM sind 100 Zeichen pro Minute**.)[^darc-50ohm]

Und: Eine **Morseprüfung ist nicht Pflicht**. Die Radio Regulations legen **nicht** fest, dass man Frequenzen unter 30 MHz oder mehr als 100 W nur mit Morseprüfung nutzen darf, sondern überlassen es **jeder nationalen Verwaltung**, ob sie eine verlangt (VA304, ITU-RR Art. 25).[^itu-rr] In Deutschland ist sie freiwillig.
`,
    },
    {
      id: 'demo-morse', type: 'viz', viz: 'morse-hoerer', title: 'Morse-Hörer',
      intro: 'Starte eine Aufgabe, höre Ton und Lampe und tippe, was du verstanden hast. Mit „Farnsworth“ (Gesamttempo unter der Zeichengeschwindigkeit) werden die Pausen länger, die Zeichen bleiben im vollen Tempo; so lernt man den Klang statt des Zählens von Punkten.',
      task: 'Löse vier Aufgaben in Folge richtig und stelle einmal das Tempo auf 20 WPM (= 100 Zeichen pro Minute), um eine Aufgabe zu hören.',
    },
    {
      id: 'morse-takt-text', type: 'text', title: 'Morsecode im Detail: Zeichen, Tastung und Takt',
      md: `
So alt wie der Funk selbst: Die ersten Funksender konnten nichts anderes, als **den Sender mit einer Taste ein- und auszuschalten**. Der Vergleich mit [Rauchzeichen](wiki:Rauchzeichen|Smoke signal) trifft es genau: Das Feuer ist der **Träger**, das kurze Anheben der Decke ist die **Modulation**, und was die Abfolge der Rauchwolken bedeutet, muss vorher verabredet sein. Im Funk ist der Träger eine hochfrequente Schwingung (zum Beispiel 144,1 MHz), die Taste lässt sie nur im Rhythmus der Zeichen zur Antenne. Man sagt: Morsezeichen werden **gegeben**, der Empfänger macht sie als Ton hörbar. Dieses Prinzip heißt [Telegrafie](wiki:Telegrafie|Telegraphy), die Betriebsart **[[cw-tastung|CW]]** (*continuous wave*). Mitte des 19. Jahrhunderts einigte man sich auf den bis heute üblichen [Morsecode](wiki:Morsecode|Morse code).[^darc-50ohm]

## Zeichen und Zeitraster

Jedes Zeichen ist eine feste Folge aus **kurzen Tönen (Punkt)** und **langen Tönen (Strich)**: *lang-kurz-lang-kurz* ist das C, *lang-lang-kurz-lang* das Q, zusammen also das „CQ“ des allgemeinen Anrufs. Entscheidend ist das **Zeitraster**, das alle Stationen gleich verstehen:

| Element | Dauer |
|---|---|
| Punkt (Ton) | 1 Einheit |
| Strich (Ton) | 3 Einheiten |
| Pause innerhalb eines Zeichens | 1 Einheit |
| Pause zwischen zwei Zeichen | 3 Einheiten |
| Pause zwischen zwei Wörtern | 7 Einheiten |

Beim Empfang übersetzen Ohr und Gehirn die Töne in Zeichen, heute auch ein Computer. Häufige Buchstaben haben kurze Zeichen (E ist ein einzelner Punkt, T ein einzelner Strich), seltene längere: ein einfacher Trick, damit Texte im Schnitt kurz bleiben.

## Tempo: WPM und die Paris-Regel

Das Tempo wird in **WPM** (*words per minute*, Wörter pro Minute) angegeben. Als Normwort dient „PARIS“ samt Wortpause, und es besteht aus genau **50 Einheiten**: Die Buchstaben P, A, R, I, S ergeben zusammen 31 Einheiten, dazu kommen vier Zeichenpausen zu je 3 Einheiten (12) und die Wortpause (7). Daraus folgt alles Weitere:

- Ein Wort hat 5 Zeichen, also sind **WPM × 5 Zeichen pro Minute** zu hören (20 WPM = 100 Zeichen pro Minute).
- Ein Wort dauert $60\\,\\text{s}/\\text{WPM}$, und eine Einheit (die **Punktlänge**) dauert deshalb $\\dfrac{60\\,\\text{s}}{50\\cdot\\text{WPM}} = \\dfrac{1{,}2\\,\\text{s}}{\\text{WPM}}$. Bei 20 WPM ist ein Punkt 60 ms lang, ein Strich 180 ms.

Das Tempo ist eine Absprache zwischen den Stationen, und wie in der Lektion beschrieben gilt: nicht schneller geben, als die Gegenstelle (und du selbst) aufnehmen kann. Eine **Morsetaste** (Handtaste, Paddle mit elektronischem Geber oder Computer) bestimmt nur, wer die Einheiten wie sauber setzt; das Raster bleibt gleich.

## Wie breit ist ein getastetes Signal?

Je schneller die Ein-Aus-Wechsel, desto breiter wird das Signal: Die Bandbreite wächst mit dem Tempo. Sehr harte, rechteckige Flanken (Tastklicks) verbreitern es zusätzlich, weshalb Sender die Flanken leicht abrunden. Trotzdem bleibt CW von allen Verfahren das schmalste (siehe die Lektion über AM, SSB und CW).[^darc-50ohm]
`,
    },
    {
      id: 'demo-morse-tempo', type: 'viz', viz: 'morse-tempo', title: 'Morse-Tempo-Rechner',
      intro: 'Tippe einen Text (Buchstaben, Ziffern, / ? = . ,), stelle das Tempo ein und sieh den Zeitverlauf der Tastung. Der Ton startet erst, wenn du auf „Abspielen“ klickst.',
      task: 'Lade den Text „PARIS“ (50 Einheiten), stelle das Tempo so ein, dass ein Punkt 100 ms dauert, und spiele einmal ab.',
    },
    {
      id: 'mission-cw-lernen', type: 'callout', tone: 'mission', title: 'Funkpraxis: Morsen lernen, ohne Punkte zu zählen',
      md: `
Wer Morsen übt, hört bald keine Punkte und Striche mehr, sondern den **Klang** des ganzen Zeichens („di-dah“ statt „kurz-lang“). Das klappt am besten, wenn die Zeichen schnell gegeben, aber die Pausen lang sind (der Morse-Hörer oben nennt das Farnsworth). Hör zuerst auf Bandbaken und CW-Runden zu, bevor du selbst rufst, und halte dich an die Regel aus der Lektion: Antworte höchstens im Tempo des Anrufs.
`,
    },
    {
      id: 'ssb-text', type: 'text', title: 'Digimodes per SSB: warum und wie breit',
      md: `
Die meisten Digimodes brauchen nur eine **sehr kleine Bandbreite**: [PSK31](wiki:PSK31|PSK31) etwa **31,25 Hz**, [FT8](wiki:FT8|FT8) rund **50 Hz**, ein [[einseitenbandmodulation|SSB]]-Sprachsignal dagegen etwa 2,4 kHz.[^darc-50ohm] Auf Kurzwelle gibt man sie daher meist über einen **SSB-Sender** aus: Der Computer liefert den Ton, der [[transceiver|Transceiver]] macht per **Einseitenbandmodulation (SSB)** daraus das HF-Signal (EE402). Mit [[frequenzmodulation|FM]], [[amplitudenmodulation|AM]] oder PM bliebe die schmale Bandbreite nicht erhalten; deshalb ist SSB die richtige Antwort.

Und nun der Rechenkniff: Bei SSB ist die HF-Bandbreite gleich der NF-Bandbreite. Speist du ein Digimode-Signal von **50 Hz** NF-Bandbreite ein, belegt es **50 Hz** auf der Funkfrequenz (EE403), nicht 100 Hz, nicht 25 Hz und nicht $\\sqrt{2}\\cdot 50$ Hz. Daraus ergibt sich eine Chance: In das **Filter eines SSB-Empfängers (2,4 kHz)** passen **viele** dieser schmalen Signale gleichzeitig (EE404): Rein rechnerisch bis zu $2400\\,\\text{Hz}/50\\,\\text{Hz} = 48$ FT8-Signale oder $2400/31{,}25 \\approx 76$ [[psk31|PSK31]]-Signale. Die Software am Computer dekodiert je nach Programm ein ausgewähltes oder gleich alle. Eine Begrenzung auf „zwei Signale, eins je [[seitenband|Seitenband]]“ oder auf „ein Signal“ gibt es nicht.

Im [Wasserfalldiagramm](wiki:Wasserfalldiagramm|Waterfall chart) trägt die Software die Frequenz waagerecht, die Zeit senkrecht und die Signalstärke als Farbe auf. Darin erkennt man die Verfahren auf einen Blick: Morse als getastete Striche, RTTY als zwei abwechselnde Töne ([Frequenzumtastung](wiki:Frequenzumtastung|Frequency-shift keying), meist mit 170 Hz Abstand), PSK31 als ruhige schmale Linie, FT8 als kurze Blöcke im 15-Sekunden-Takt, und Sprache als breites, pulsierendes Band.
`,
    },
    {
      id: 'demo-wasserfall', type: 'viz', viz: 'wasserfall-labor', title: 'Wasserfall-Labor',
      intro: 'Das Bild ist eine Nachbildung: oben läuft die Zeit herunter, waagerecht siehst du die NF-Frequenz im SSB-Kanal von 0 bis 3 kHz. Im Übungsmodus tippst du, welche Betriebsart du siehst; im Mischmodus schaltest du Signale zusammen in den Kanal.',
      task: 'Erkenne fünf Signale richtig, und schalte mindestens vier schmale Digimodes gleichzeitig in den Kanal.',
    },
    {
      id: 'sstv-text', type: 'text', title: 'Bilder: SSTV und ATV',
      md: `
Auch Bilder lassen sich funken. **[SSTV](wiki:Slow Scan Television|Slow-scan television)** (Slow-Scan Television) überträgt **Standbilder** zeilenweise und langsam; die Bandbreite liegt unter 3 kHz, also ungefähr wie ein SSB-Sprachsignal: Das Bild passt in einen KW-Kanal. **[ATV](wiki:Amateurfunkfernsehen|Amateur television)** (Amateur Television) überträgt **bewegte Bilder**, braucht deshalb mehrere Megahertz (oft 6 MHz und mehr) und läuft erst ab dem 70-cm-Band aufwärts (EE415). Die Antworten „SSTV nur auf Kurzwelle, ATV auf UKW“, „SSTV belegt mehr Bandbreite“ und „SSTV schwarzweiß, ATV in Farbe“ sind falsch: Der Unterschied ist **Standbild gegen Bewegtbild**, und alles andere folgt daraus.[^darc-50ohm]
`,
    },
    {
      id: 'pegel-text', type: 'text', title: 'NF-Pegel am Digimode-Eingang: die ALC darf nicht ansprechen',
      md: `
Der häufigste Fehler beim ersten FT8-Betrieb: Der Computer liefert **zu viel NF-Pegel**. Ein Digimode-Signal soll sauber und klein sein, nicht „so laut wie möglich“. Wird der Eingang übersteuert, entstehen **Oberschwingungen** und **[[nebenaussendung|Nebenaussendungen]]** ([[splatter|Splatter]]); das Wasserfallbild des Nachbarn zeigt dann neben deinem gelben Strich weitere Linien. Viele Transceiver haben eine **automatische Pegelregelung**, die **[[alc|ALC]]** (*Automatic Level Control*); sie senkt die Verstärkung der Sendestufe, wenn das Signal zu stark wird.[^darc-50ohm]

- Spricht die **ALC** an, ist das ein Zeichen: Das NF-Signal ist **zu stark** (bei konstanter Amplitude wie FT8 verbiegt die Regelung das Signal noch nicht, aber der Pegel ist bereits übersteuert).
- Bei **veränderlicher Amplitude** (PSK31, QPSK, 16-QAM) macht die ALC das Signal **zusätzlich amplitudenmoduliert**: Es entstehen neue Frequenzanteile, die als Nebenaussendungen **auf benachbarten Frequenzen stören** und die Dekodierung erschweren (EJ217).
- Deshalb: **NF-Pegel so niedrig, dass die ALC nicht eingreift** (EJ218). Nicht 18 dB über der ALC-Ansprechschwelle, nicht „alle Regler auf Maximum“, und auch nicht null.
- Und wenn es doch passiert (EJ219): **NF-Pegel am Eingang des Funkgeräts reduzieren.** Mehr Sendeleistung, ein abgeschaltetes [[oberwellenfilter|Oberwellenfilter]] oder die [[rit|RIT]] helfen nicht, im Gegenteil.

Eine praktische Einstellung: Mit der TUNE-Funktion einen gleichmäßigen Ton senden, den Ausgangspegel des Computers von seinem Maximum langsam herunterregeln, bis die **HF-Ausgangsleistung gerade leicht abfällt**, und dabei Ausgangsleistung und ALC-Anzeige beobachten. Das Optimum liegt bei ruhender ALC.
`,
    },
    {
      id: 'demo-pegel', type: 'viz', viz: 'digimode-pegel', title: 'Digimode-Pegel',
      intro: 'Regle den NF-Pegel hoch und beobachte ALC, Leistung und Nebenaussendungen. FT8 hat konstante Amplitude, PSK31 nicht: Für die zweite Betriebsart ist ein Eingreifen der ALC viel schlimmer.',
      task: 'Stelle FT8 so ein, dass die ALC ruht und die Leistung noch mindestens 15 W beträgt. Übersteuere dann PSK31 bis zur Nachbarfrequenz-Störung und senke den Pegel, bis alles wieder sauber ist.',
    },
    {
      id: 'mission-ft8', type: 'callout', tone: 'mission', title: 'Funkpraxis: Dein erstes FT8-Signal',
      md: `
Stelle dein Funkgerät auf **USB**, binde den Transceiver per USB-Kabel oder Audio-Interface an den Computer an und starte FT8-Software (z. B. WSJT-X). Sende zuerst einen **TUNE-Ton**, hole den Pegel am Computer so weit herunter, dass die **ALC ruht**, und beobachte dich im **[[psk|PSK]]-Reporter** (siehe unten): Dort siehst du nach wenigen Minuten, wer dich in welchem Land gehört hat. Die Leistung musst du dafür nicht ausreizen, oft genügen wenige Watt.
`,
    },
    {
      id: 'port-text', type: 'text', title: 'Der DATA-/9600-Port am FM-Transceiver',
      md: `
Beim Packet-Radio und bei Sprachverfahren wie M17 muss ein Datensignal **möglichst unverzerrt** in den FM-Modulator oder aus dem FM-Demodulator. Der normale Mikrofon- und Lautsprecherweg ist auf Sprache getrimmt: Filter (Frequenzgang etwa 300 bis 3000 Hz) und Verstärker beschneiden das Signal. Viele FM-Transceiver haben deshalb einen **analogen Datenanschluss** (beschriftet **DATA** oder **9600**), der diese Stufen **umgeht**.[^darc-50ohm]

Im Blockschaltbild liegt der Punkt zum **Senden** **hinter dem NF-Filter, direkt vor dem FM-Modulator** (Punkt 2 in EF309), der zum **Empfangen** **direkt hinter dem FM-Demodulator** (Punkt 4 in EF219), vor NF-Filter und NF-Verstärker. Er **ist keine Steuerschnittstelle** (dafür dient der CAT-Anschluss, siehe nächste Lektion) und ersetzt keine Antennenbuchse. Die Zahl 9600 kommt vom früher viel genutzten 9600-Baud-Packet-Radio (AX.25); heute wird der Port auch für M17 und andere Verfahren verwendet.
`,
    },
    {
      id: 'demo-port', type: 'viz', viz: 'fm-datenport', title: 'Wo liegt der Datenport?',
      task: 'Tippe im Sendezweig den Punkt an, an dem das Datensignal eingespeist wird, und im Empfangszweig den Punkt, an dem es abgegriffen wird.',
    },
    {
      id: 'dv-text', type: 'text', title: 'Digitale Sprache: DMR, D-STAR, C4FM, M17, FreeDV',
      md: `
Sprache wird vor der Übertragung digitalisiert und in einen **Datenstrom** umgewandelt. Im Amateurfunk üblich sind **DMR**, **D-STAR**, **C4FM**, **M17** und auf Kurzwelle **FreeDV** (NE404). Antwortgruppen mit AM-, FM- oder SSB-Sprechfunk oder mit Olivia, SSTV, FT8, RTTY, JS8 oder PSK31 sind falsch: Das sind klassische Modulationsarten beziehungsweise Digimodes, keine digitalen Sprachverfahren. Auf **VHF/UHF-Handfunkgeräten** sind es üblicherweise **FM-Sprechfunk, [DMR](wiki:Digital Mobile Radio|Digital mobile radio) und [D-STAR](wiki:D-STAR|D-STAR)** (NE307).[^darc-50ohm]

Über **vernetzte Relaisstellen** (HAMNET oder Internet) spricht man weltweit; wer keinen Relaiszugang hat, nutzt einen **Hotspot** zu Hause (nur als besetzte Station, solange keine Fernbedienungsgenehmigung vorliegt).

**Zusätzliche Einstellungen.** Bei analogem FM genügen Frequenz und [[modulation|Modulation]]. Bei digitaler Sprache musst du außerdem **geeignete Parameter wählen**, etwa **Reflektor** (C4FM/D-STAR), **Zeitschlitz** oder **Color-Code** (DMR), damit die Verbindung zustande kommt (NE402). Nicht nötig oder nicht richtig: dieselbe Firmware wie das Repeaternetz, dieselbe Stationskennung (jeder hat seine eigene, z. B. die DMR-ID) oder Funkreichweite zum selben Repeater (die Verbindung läuft ja über das Netz).

**Zeitmultiplex.** Manche digitale Verfahren (DMR, TETRA) teilen die Frequenz in **kurze, periodische Zeitschlitze** auf: Mehrere Sprechverbindungen laufen **gleichzeitig auf derselben Frequenz im Empfangsgebiet** (NE403), indem die Daten abwechselnd gesendet werden. Das heißt **[[tdma|TDMA]]** (*Time Division Multiple Access*); mehr dazu in der nächsten Lektion. Ein Funkgerät muss dazu ständig schnell zwischen Senden und Empfangen umschalten, und **externe Leistungsverstärker** können das meist nicht: Für DMR und andere Zeitschlitz-Verfahren dürfen nur dafür geeignete Verstärker verwendet werden, sonst wird die Frequenz auch außerhalb des eigenen Zeitschlitzes belegt und stört andere. Dass sich gleichzeitige digitale Übertragungen „prinzipbedingt stören“ oder Sprache nicht in Pakete aufzuteilen sei, ist falsch.
`,
    },
    {
      id: 'report-text', type: 'text', title: 'Automatische Empfangsberichte',
      md: `
Digitale Verfahren und CW kann man **automatisch dekodieren lassen**: Empfangsstationen, die ein Rufzeichen erkennen, melden es mit Zeit, Frequenz und Ort an eine Internetplattform. Diese Plattformen stellen die Berichte als Karten dar: Wo wurde ich gehört, auf welchem Band, mit welchem Signal? Das hilft, die **Reichweite der eigenen Sendeanlage zu testen**, zwei Antennen zu vergleichen und die momentane Ausbreitung zu beobachten.[^darc-50ohm]

- **[WSPR](wiki:Weak Signal Propagation Reporter|WSPR (amateur radio software))** (*Weak Signal Propagation Reporter*) ist ein reiner QRP-Beacon-Betrieb mit sehr langsamen, stark fehlerkorrigierten Signalen. QSOs sind damit nicht möglich; die Berichte landen auf **WSPRnet**.[^wsprnet]
- Für **CW** gibt es das **Reverse Beacon Network** mit automatischen „Skimmer“-Stationen.[^reverse-beacon-network]
- **PSK Reporter** sammelt Berichte für viele Verfahren (PSK31, FT8, FT4, RTTY, …).[^psk-reporter]

Du erhältst also Empfangsberichte, indem du eine Nachricht mit einem geeigneten Verfahren (z. B. CW oder [[wspr|WSPR]]) sendest und dann **auf den passenden Internetplattformen nach deinem Rufzeichen suchst** (EE405). Du musst weder deine E-Mail-Adresse mitsenden noch „AUTO RSVP“ tasten noch auf einer 10 kHz tieferen oder höheren Frequenz lauschen: Das sind Erfindungen der falschen Antworten.
`,
    },
    {
      id: 'ip-text', type: 'text', title: 'Pakete, IP und HAMNET',
      md: `
Digitale Daten lassen sich in kurze Abschnitte teilen, die **Pakete**. Jedes Paket enthält die Adresse des Empfängers und wird über Zwischenstationen weitergegeben: [Paketvermittlung](wiki:Paketvermittlung|Packet switching). Statt einer festen Leitung nutzen alle Teilnehmer dasselbe Netz. Zwei Stationen, die sich **nicht direkt erreichen können**, tauschen deshalb Daten durch **Weiterleitung über Zwischenstationen (Paketweiterleitung)** aus (EE412). „Wiederholte Aussendung“, „Entpacken“ und „Zusammenfassen“ sind keine Netzfunktionen.

Früher übernahm das [Packet Radio](wiki:Packet Radio|Packet radio) (AX.25, 1200 und 9600 Bit/s). Heute gibt es das **[HAMNET](wiki:HAMNET)** (*Highspeed Amateurradio Multimedia Network*): ein von Funkamateuren betriebenes, **IP-basiertes** Netz, das für die schnellen Verbindungen zwischen den Knoten überwiegend die Mikrowellenbänder **6 cm, 9 cm und 13 cm** nutzt. Man nutzt es wie das Internet, im einfachsten Fall mit dem Webbrowser.[^darc-50ohm]

**Kann das Internetprotokoll (IP) im Amateurfunk verwendet werden?** Ja: **Es ist nicht auf das Internet beschränkt** (EE414). Weder wird das Rufzeichen in der [[subnetzmaske|Subnetzmaske]] codiert, noch öffnet das IP-Netz Internetnutzern den Weg ins Amateurfunkband, noch fehlt die Bandbreite.

## [[ip-adresse|IP-Adresse]] und Subnetzmaske

Eine **IPv4-Adresse** besteht aus **32 Bit**, geschrieben als vier Zahlen von 0 bis 255 (jede 8 Bit, etwa 192.168.1.20). Ein Teil vorn ist der **Netzanteil** (alle Geräte im selben Netz beginnen gleich), der Rest der **Hostanteil**. Wie lang der Netzanteil ist, steht in der **[Subnetzmaske](wiki:Subnetzmaske|Subnet mask)**: so viele Einsen von links, wie der Netzanteil lang ist. 255.255.255.0 bedeutet 24 Bit Netzanteil, geschrieben auch /24.

Aus der eingestellten IP-Adresse und Subnetzmaske ergibt sich damit der **direkt (ohne Router) über die Schnittstelle erreichbare Adressbereich** (EE413). Das erkennt ein Gerät, indem es den Netzanteil der eigenen Adresse mit dem des Partners vergleicht; sind sie gleich, spricht es **direkt**, sonst schickt es die Pakete an einen **[Router](wiki:Router|Router (computing))**. Nicht aus der Maske ablesbar sind Protokoll- und Portnummer, die Gegenstelle, die Bandbreite, das Standardgateway oder die Hop-Zahl.
`,
    },
    {
      id: 'demo-ip', type: 'viz', viz: 'ip-netz', title: 'IP-Netz-Prüfer',
      intro: 'Wähle zwei Adressen und eine Präfixlänge. Blau sind die Netzanteil-Bits: Nur wenn A und B dort übereinstimmen, sind sie im selben Netz.',
      task: 'Löse die drei Ziele: zwei Geräte im selben /24-Netz, das /25-Netz trennt 141.17.5.18 und 141.17.5.200, und ein kürzeres Präfix verbindet 192.168.1.20 mit 192.168.2.5.',
    },
    {
      id: 'packet-text', type: 'text', title: 'Packet Radio und APRS: Pakete mit Adresse und Quittung',
      md: `
Wie lässt sich ein Datenstrom zuverlässig über einen störanfälligen Funkkanal schicken? Das [Packet Radio](wiki:Packet Radio|Packet radio) der 1980er-Jahre löste das mit denselben Ideen, die heute jedes Netz nutzt:

1. **Zerlegen:** Die Nachricht wird in kurze, **nummerierte Pakete** geteilt.
2. **Adressieren:** Jedes Paket trägt einen Kopf mit **Absender und Empfänger**. Im Packet Radio ist das schlicht das **Rufzeichen** (Protokoll [AX.25](wiki:AX.25|AX.25)); im IP-Netz ist es die IP-Adresse.
3. **Absichern:** Am Ende steht eine **[Prüfsumme](wiki:Prüfsumme|Checksum)**, aus der der Empfänger erkennt, ob unterwegs Bits kippten.
4. **Quittieren:** Ist das Paket in Ordnung, meldet der Empfänger das mit einer kurzen **Quittung** (*ACK*). Bleibt sie aus, sendet der Absender **nach einer Wartezeit dasselbe Paket noch einmal**. Doppelt angekommene Pakete erkennt der Empfänger an der Nummer.
5. **Weiterleiten:** Erreichen sich zwei Stationen nicht direkt, nehmen Zwischenstationen ([[digipeater|Digipeater]]) die Pakete an und geben sie weiter. Das ist die **Paketweiterleitung**, die du im Abschnitt über IP-Netze kennengelernt hast.[^darc-50ohm]

Die Daten gingen als [[afsk|AFSK]]-Töne über normale FM-Funkgeräte, meist mit 1200 Bit/s, später mit 9600 Bit/s über den DATA-/9600-Port. Weil alle Stationen **dieselbe Frequenz** teilen, kann es **Kollisionen** geben (zwei senden gleichzeitig), und genau dafür sind Quittung und Wiederholung da.

## APRS: Senden ohne Quittung

Das [Automatic Packet Reporting System](wiki:Automatic Packet Reporting System|Automatic Packet Reporting System) (**APRS**) ist eine Anwendung auf Packet-Basis: Stationen senden kleine Pakete mit **Position, Wetterdaten oder Kurznachrichten**, die jeder in Reichweite mithört, und Digipeater tragen sie weiter. Die Pakete gehen an alle und werden **nicht einzeln quittiert**. Das spart Funkzeit; ein verlorenes Positionspaket ist verschmerzbar, denn das nächste kommt bald. Kartendienste im Internet sammeln die empfangenen Pakete und zeigen sie an (in Europa nutzt man 144,800 MHz, siehe die Lektion über Bandpläne).[^aprs-fi]
`,
    },
    {
      id: 'warn-wiederholung', type: 'callout', tone: 'warning', title: 'Weiterleiten ist nicht Wiederholen',
      md: `
Zwei Mechanismen werden gern verwechselt. **Weiterleiten** (Paketweiterleitung über Zwischenstationen) löst das Problem, dass sich zwei Stationen **nicht direkt erreichen** (Prüfungsbezug: EE412). **Wiederholen nach fehlender Quittung** löst das Problem, dass ein einzelnes Paket **unterwegs verloren ging oder beschädigt wurde**. Beides kann in einem Netz gleichzeitig vorkommen.
`,
    },
    {
      id: 'demo-paket', type: 'viz', viz: 'paket-quittung', title: 'Paket-Quittungs-Simulator',
      intro: 'Acht Pakete laufen über einen Funkkanal mit Verlusten. Probiere beide Verfahren und verschiedene Verlustraten; jede Quittung ist selbst eine Aussendung und kann verloren gehen.',
      task: 'Sende mit Quittung bei mindestens 40 % Verlust alle 8 Pakete erfolgreich, und zeige ohne Quittung bei mindestens 30 % Verlust, dass Pakete verloren gehen.',
    },
    {
      id: 'video-digital', type: 'video', youtube: 'QRq0uPzdPZY', label: 'Videolehrgang Klasse N, Lektion 06: Digitale Übertragungsverfahren', channel: 'DL2YMR',
      why: 'Der Videolehrgang von DL2YMR zum Thema der Lektion, zum Anschauen und Nachhören.',
    },
    {
      id: 'calc-punktlaenge', type: 'numeric', title: 'Punktlänge bei 15 WPM',
      question: 'Wie lang ist ein Punkt in Millisekunden bei einem Tempo von 15 WPM?',
      answer: 80, tolerance: 1, unit: 'ms',
      hint: 'Punktlänge = 1,2 s geteilt durch WPM.',
      explain: '$1{,}2\\,\\text{s}/15 = 0{,}08\\,\\text{s} = 80\\,\\text{ms}$. Ein Strich dauert dann 240 ms.',
    },
    {
      id: 'calc-paris-zeit', type: 'numeric', title: 'Wie lange dauert „PARIS“?',
      question: 'Ein Funkamateur gibt mit 10 WPM. Wie viele Sekunden braucht er für das Normwort „PARIS“ samt Wortpause?',
      answer: 6, tolerance: 0.05, unit: 's',
      hint: 'Bei 10 WPM werden 10 Wörter in 60 Sekunden gegeben.',
      explain: '$60\\,\\text{s}/10 = 6\\,\\text{s}$. Kontrolle über die Einheiten: $50 \\cdot 120\\,\\text{ms} = 6\\,\\text{s}$.',
    },
    {
      id: 'match-morse-zeit', type: 'match', title: 'Zeitraster der Telegrafie',
      prompt: 'Ordne jedem Element seine Dauer zu.',
      pairs: [
        ['Punkt', '1 Einheit Ton'],
        ['Strich', '3 Einheiten Ton'],
        ['Pause innerhalb eines Zeichens', '1 Einheit Stille'],
        ['Pause zwischen zwei Zeichen', '3 Einheiten Stille'],
        ['Pause zwischen zwei Wörtern', '7 Einheiten Stille'],
      ],
    },
    {
      id: 'match-modes', type: 'match', title: 'Betriebsart und Merkmal',
      prompt: 'Ordne jeder Betriebsart ihr Merkmal zu.',
      pairs: [
        ['PSK31', 'sehr schmal, rund 31 Hz, ununterbrochene Linie'],
        ['FT8', 'rund 50 Hz, Sendungen im 15-Sekunden-Takt, schwache Signale'],
        ['RTTY', 'Frequenzumtastung mit zwei Tönen (Funkfernschreiben)'],
        ['WSPR', 'nur Ausbreitungsbeobachtung, keine QSOs'],
        ['SSTV', 'Standbilder, Bandbreite unter 3 kHz'],
        ['ATV', 'bewegte Bilder, mehrere Megahertz Bandbreite'],
      ],
    },
    {
      id: 'order-qso', type: 'order', title: 'Ein CW-QSO in der richtigen Reihenfolge',
      prompt: 'Bringe die Durchgänge eines kurzen Telegrafie-QSOs in die richtige Reihenfolge.',
      items: [
        'CQ CQ CQ DE DL2AB DL2AB DL2AB PSE K',
        'DL2AB DE DL1PZ K',
        'DL1PZ DE DL2AB = UR RST 579 579 = DL1PZ DE DL2AB K',
        'DL2AB DE DL1PZ = R TNX RPRT = UR 599 599 BK',
        'BK QSL = VY 73 DE DL2AB SK',
        'R 73 DE DL1PZ SK',
      ],
      explain: 'Anruf, Antwort, Rapport, Gegenrapport, Verabschiedung, Schlussbestätigung. Jeder Durchgang endet mit K, BK oder SK; „R“ beginnt die Bestätigung des Vorangegangenen.',
    },
    {
      id: 'calc-ft8', type: 'numeric', title: 'Wie viele FT8-Signale passen in den Kanal?',
      question: 'Ein SSB-Empfänger hat ein 2,4 kHz breites Filter. Jedes FT8-Signal belegt etwa 50 Hz. Wie viele FT8-Signale passen rein rechnerisch nebeneinander in diesen Kanal?',
      answer: 48, tolerance: 0,
      hint: 'Teile die Kanalbreite durch die Breite eines Signals; beides in Hz.',
      explain: '$2400\\,\\text{Hz}/50\\,\\text{Hz} = 48$. Bei BPSK31 mit 31,25 Hz wären es $2400/31{,}25 \\approx 76$. Voraussetzung: Die Signale überlappen nicht, und die Software dekodiert sie.',
    },
    {
      id: 'calc-bw', type: 'numeric', title: 'HF-Bandbreite eines Digimodes',
      question: 'Ein digitales Signal mit 100 Hz NF-Bandbreite wird in SSB eingespeist. Wie groß ist die HF-Bandbreite? Antwort in Hz.',
      answer: 100, tolerance: 0, unit: 'Hz',
      hint: 'Bei SSB entspricht die HF-Bandbreite der NF-Bandbreite.',
      explain: 'SSB verschiebt das NF-Spektrum nur in der Frequenzlage, die Breite bleibt: 100 Hz.',
    },
    {
      id: 'quiz-alc', type: 'quiz', title: 'ALC und Digimodes',
      question: 'Bei einem Digimode im SSB-Betrieb schlägt die ALC-Anzeige deines Transceivers aus. Was ist richtig? (Mehrfachauswahl)',
      options: [
        { text: 'Der NF-Pegel am Eingang ist zu hoch und sollte reduziert werden.', correct: true, why: 'Gerade bei Digimodes soll die ALC nicht ansprechen.' },
        { text: 'Es können Störungen auf Nachbarfrequenzen entstehen.', correct: true, why: 'Übersteuerung verbreitert das Signal, bei veränderlicher Amplitude verzerrt die ALC es zusätzlich.' },
        { text: 'Mit mehr Sendeleistung lässt sich das beheben.', correct: false, why: 'Mehr Leistung verschlimmert die Übersteuerung.' },
        { text: 'Mit der RIT lässt sich das beheben.', correct: false, why: 'Die RIT verstimmt nur den Empfänger.' },
        { text: 'Die ALC soll bei Digimodes möglichst stark ansprechen, damit der Sender voll ausgesteuert ist.', correct: false, why: 'Im Gegenteil: Wenn die ALC nicht eingreift, erzeugt sie auch keine Probleme.' },
      ],
    },
    {
      id: 'quiz-dv', type: 'quiz', title: 'Digitale Sprache',
      question: 'Du willst an einer DMR-Runde über ein Repeaternetzwerk teilnehmen. Was musst du neben Frequenz, Verfahren und Modulation noch einstellen?',
      options: [
        { text: 'Geeignete Parameter wie Zeitschlitz, Color-Code oder Sprechgruppe.', correct: true, why: 'Ohne passende Parameter kommt keine Verbindung zustande.' },
        { text: 'Dieselbe Firmware-Version wie das Repeaternetzwerk.', correct: false, why: 'Die Firmware ist Sache des Geräts, nicht des Netzes.' },
        { text: 'Dieselbe Stationskennung wie alle anderen Teilnehmer.', correct: false, why: 'Jede Station hat ihre eigene Kennung (z. B. DMR-ID).' },
        { text: 'Du musst dich in Funkreichweite desselben Repeaters befinden.', correct: false, why: 'Das Netz verbindet Repeater weltweit über Internet oder HAMNET.' },
      ],
    },
    {
      id: 'quiz-paket', type: 'quiz', title: 'Quittung und Wiederholung',
      question: 'Ein Absender schickt Paket 5 mit Quittungsverfahren, bekommt aber keine Quittung. Was ist richtig? (Mehrfachauswahl)',
      options: [
        { text: 'Er kann nicht wissen, ob das Paket angekommen ist; er wartet eine Zeit lang und sendet es dann noch einmal.', correct: true, why: 'Das ist der Sinn der Wiederholung.' },
        { text: 'Möglicherweise kam das Paket an und nur die Quittung ging verloren.', correct: true, why: 'Dann entsteht ein Doppel, das der Empfänger an der Paketnummer erkennt und verwirft.' },
        { text: 'Das Paket ist sicher verloren.', correct: false, why: 'Auch die Quittung kann verloren gehen.' },
        { text: 'Der Absender erhöht die Sendeleistung auf das Zehnfache.', correct: false, why: 'Das Verfahren regelt man nicht über die Leistung; die Wiederholung löst das Problem.' },
        { text: 'Der Empfänger setzt die Pakete in der Reihenfolge ihres Eintreffens zusammen, auch bei Doppeln.', correct: false, why: 'Gerade die laufende Nummer sorgt für die richtige Reihenfolge und das Aussortieren von Doppeln.' },
      ],
    },
    {
      id: 'order-paket', type: 'order', title: 'Ein Paket mit Quittung auf die Reise schicken',
      prompt: 'Bringe die Schritte eines gequittierten Paketaustauschs in die richtige Reihenfolge.',
      items: [
        'Die Nachricht wird in nummerierte Pakete zerlegt.',
        'Jedes Paket erhält Adressen und eine Prüfsumme.',
        'Das Paket wird gesendet.',
        'Der Empfänger prüft die Prüfsumme.',
        'Der Empfänger sendet eine Quittung.',
        'Der Absender sendet das nächste Paket (bei fehlender Quittung dasselbe noch einmal).',
      ],
      explain: 'Erst zerlegen und adressieren, dann senden; der Empfänger prüft und quittiert; erst die Quittung gibt dem Absender das Recht, weiterzumachen.',
    },
    {
      id: 'recall-digi', type: 'recall', title: 'In eigenen Worten',
      prompt: 'Erkläre, warum man schmale Digimodes wie FT8 oder PSK31 mit einem SSB-Transceiver sendet, wie viele Signale in einen SSB-Kanal passen und warum du dabei den NF-Pegel klein halten musst.',
      answer: 'Der Computer erzeugt ein NF-Signal mit sehr kleiner Bandbreite (PSK31 ≈ 31 Hz, FT8 ≈ 50 Hz). Der SSB-Transceiver setzt dieses NF-Signal in die Funkfrequenz um, und weil die HF-Bandbreite bei SSB der NF-Bandbreite entspricht, bleibt das Signal schmal. In einen 2,4-kHz-Kanal passen deshalb viele Signale (rechnerisch 48 FT8 oder 76 PSK31), die die Software parallel dekodieren kann. Der NF-Pegel muss so klein sein, dass die ALC nicht eingreift: Übersteuerung erzeugt Oberschwingungen und Nebenaussendungen, und bei veränderlicher Amplitude (PSK31) moduliert die ALC das Signal zusätzlich in der Amplitude; beides stört Nachbarfrequenzen.',
      hints: ['Was ändert SSB an der Bandbreite des NF-Signals?', 'Wann greift die ALC ein, und was hat sie mit Splatter zu tun?'],
      cards: ['digimode-ssb', 'digimode-pegel'],
    },
  ],
  cards: [
    { id: 'digi-gleich', front: 'Was ist bei einer Funkfernschreib-Verbindung zu beachten?', back: 'Sender und Empfänger müssen dasselbe Übertragungsverfahren (z. B. RTTY, PSK, JS8) und ggf. dieselben Verfahrensparameter verwenden. Zeitzone und Tageszeit spielen keine Rolle.' },
    { id: 'abk-k-bk-r', front: 'K, BK und R in der Telegrafie?', back: 'K: Aufforderung zum Senden. BK: Unterbrechung einer laufenden Sendung (auch formlose Übergabe). R: Received (empfangen). SK: Ende der Verbindung.' },
    { id: 'abk-warum', front: 'Wozu Abkürzungen und Q-Gruppen in der Telegrafie?', back: 'Sie vereinfachen den Betriebsablauf und optimieren den Informationsgehalt pro Zeiteinheit. Sie verschleiern nichts: Betriebsabkürzungen gelten als offene Sprache.' },
    { id: 'cq-anruf', front: 'Allgemeiner Anruf in Telegrafie als DL2AB?', back: 'CQ CQ CQ DE DL2AB DL2AB DL2AB PSE K' },
    { id: 'cw-tempo', front: 'Welches Tempo bei CW?', back: 'Einen Anruf genauso schnell oder langsamer beantworten. Nicht schneller geben, als man selbst aufnehmen kann; an langsamere Stationen anpassen. 20 WPM = 100 Zeichen/min.' },
    { id: 'morse-pflicht', front: 'Morseprüfung und Radio Regulations?', back: 'Die nationale Verwaltung jedes Landes legt selbst fest, ob eine Morseprüfung erforderlich ist. In Deutschland freiwillig.' },
    { id: 'digimode-ssb', front: 'Digimodes per SSB: Bandbreite?', back: 'Die HF-Bandbreite entspricht der NF-Bandbreite (z. B. 50 Hz bei FT8, 31,25 Hz bei BPSK31). In einen 2,4-kHz-Kanal passen viele Signale (48 FT8, 76 PSK31).' },
    { id: 'sstv-atv', front: 'SSTV und ATV?', back: 'SSTV überträgt Standbilder (Bandbreite unter 3 kHz, Kurzwelle möglich), ATV bewegte Bilder (mehrere MHz, ab 70 cm).' },
    { id: 'digimode-pegel', front: 'NF-Pegel bei Digimodes?', back: 'So niedrig, dass die ALC nicht eingreift. Greift sie ein: NF-Pegel am Eingang reduzieren (nicht Leistung erhöhen). ALC bei veränderlicher Amplitude erzeugt Nebenaussendungen auf Nachbarfrequenzen.' },
    { id: 'datenport', front: 'Wo liegt der DATA-/9600-Port im FM-Transceiver?', back: 'Senden: vor dem FM-Modulator (hinter dem NF-Filter). Empfangen: direkt hinter dem FM-Demodulator. Er umgeht Verstärker und Filter der Sprachstrecke.' },
    { id: 'dv-verfahren', front: 'Digitale Sprachverfahren im Amateurfunk?', back: 'DMR, D-STAR, C4FM, M17, FreeDV (KW). Auf VHF/UHF-Handfunkgeräten üblich: FM-Sprechfunk, DMR, D-STAR. Einstellungen: Reflektor, Zeitschlitz, Color-Code.' },
    { id: 'tdma-dmr', front: 'Mehrere Gespräche auf derselben Frequenz (DMR)?', back: 'Ja: Die Sprachdaten werden abwechselnd in periodischen kurzen Zeitschlitzen übertragen (TDMA).' },
    { id: 'empfangsberichte', front: 'Automatische Empfangsberichte erhalten?', back: 'Nachricht mit geeignetem Verfahren (CW, WSPR, FT8 …) senden und auf den Internetplattformen (WSPRnet, Reverse Beacon Network, PSK Reporter) nach dem eigenen Rufzeichen suchen.' },
    { id: 'hamnet-ip', front: 'IP im Amateurfunk, Paketweiterleitung, Subnetzmaske?', back: 'IP ist nicht auf das Internet beschränkt (HAMNET). Pakete laufen über Zwischenstationen. IP-Adresse + Subnetzmaske ergeben den direkt (ohne Router) erreichbaren Adressbereich.' },
    { id: 'morse-zeitraster', front: 'Zeitraster im Morsecode (in Einheiten)?', back: 'Punkt 1, Strich 3; Pause im Zeichen 1, zwischen Zeichen 3, zwischen Wörtern 7.' },
    { id: 'paris-50', front: 'Wie viele Einheiten hat das Normwort „PARIS“ (mit Wortpause)?', back: '50 Einheiten. Daraus folgt: Punktlänge = 1,2 s / WPM; WPM × 5 = Zeichen pro Minute.' },
    { id: 'punktlaenge-wpm', front: 'Punktlänge bei 20 WPM?', back: '1,2 s / 20 = 60 ms (Strich 180 ms).' },
    { id: 'paket-aufbau-quittung', front: 'Wie sichert ein Paketverfahren (z. B. Packet Radio) die Übertragung ab?', back: 'Nummerierte Pakete mit Adresse und Prüfsumme; der Empfänger quittiert, ohne Quittung sendet der Absender nach einer Wartezeit erneut; Doppel erkennt man an der Nummer.' },
    { id: 'aprs-ungequittet', front: 'APRS: Quittung oder nicht?', back: 'Meist ohne Quittung: Positions-, Wetter- und Kurzmeldungspakete gehen an alle; das spart Funkzeit, ein verlorenes Paket wird vom nächsten ersetzt.' },
    { id: 'weiterleiten-wiederholen', front: 'Paketweiterleitung oder Wiederholung: Was löst welches Problem?', back: 'Weiterleiten über Zwischenstationen: Stationen erreichen sich nicht direkt. Wiederholen nach fehlender Quittung: ein einzelnes Paket ging verloren.' },
  ],
};
