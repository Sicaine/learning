// Lektion empfaenger-superhet: Detektor- und Geradeausempfänger, Überlagerungsempfänger (Zwischenfrequenz, Trennschärfe), BFO, AGC,
// Notchfilter, Noise Blanker/Reduction, Dämpfungsglied und Vorverstärker, Frequenzmessung (Frequenzzähler, Vorteiler).
// Quellen für Fakten: DARC 50ohm.de (CC BY 4.0), BNetzA-Fragenkatalog 3. Auflage.

// Detektorempfänger: Antenne, Parallelschwingkreis (Spule + Drehkondensator), Diode, hochohmiger Kopfhörer.
const detector = () => `<svg viewBox="0 0 560 220" role="img" aria-label="Schaltung eines Detektorempfängers: Antenne, Schwingkreis aus Spule und Drehkondensator, Diode, hochohmiger Kopfhörer, Erde"><style>.l{stroke:var(--ink);stroke-width:1.8;fill:none;stroke-linecap:round;stroke-linejoin:round}.t{font:600 12.5px system-ui,sans-serif;fill:var(--ink)}.s{font:11px system-ui,sans-serif;fill:var(--muted)}</style>
<path class="l" d="M60 14 V90 H120 M44 14 H76 M50 26 H70 M56 38 H64"/><text class="t" x="82" y="30">Antenne</text>
<path class="l" d="M120 90 H210 M120 90 v8 c-22 0 -22 12 0 12 c-22 0 -22 12 0 12 c-22 0 -22 12 0 12 c-22 0 -22 12 0 12 v22"/>
<path class="l" d="M210 90 V126 M196 126 H224 M196 136 H224 M210 136 V176 M200 112 L224 150"/>
<path class="l" d="M120 176 H430"/>
<path class="l" d="M210 90 H296 M296 78 V102 L320 90 z M322 78 V102 M322 90 H420 V112 M404 112 H436 V152 H404 z M420 152 V176"/>
<text class="t" x="84" y="140" text-anchor="end">Spule</text><text class="t" x="232" y="134">Drehkondensator</text>
<text class="t" x="290" y="70">Diode (Detektor)</text><text class="t" x="446" y="136">Kopfhörer</text><text class="s" x="446" y="152">hochohmig</text>
<text class="s" x="120" y="198">Parallelschwingkreis: auf die Senderfrequenz abgestimmt</text><text class="s" x="120" y="213">keine Batterie: Die Energie kommt aus dem Empfangssignal</text></svg>`;

export default {
  id: 'empfaenger-superhet',
  title: 'Empfänger: Superhet, Trennschärfe, AGC, Filter',
  summary: 'Geradeaus-/Superhet-Empfänger, Zwischenfrequenz, BFO, Spiegelfrequenz, AGC, Notch, Rauschunterdrückung, Frequenzmessung.',
  minutes: 20,
  goals: [
    'Detektor-, Geradeaus- und Überlagerungsempfänger unterscheiden und den Vorteil des Superhets (Trennschärfe) begründen',
    'Mit f_z = |f_e ± f_o| die VFO-Frequenz für eine gegebene Zwischenfrequenz berechnen',
    'BFO, AGC, Notchfilter, Noise Blanker, Noise Reduction, Dämpfungsglied und Vorverstärker ihren Aufgaben zuordnen',
    'Eine Frequenzzähler-Anzeige lesen (Stellenwert, Zehnerpotenz) und die Messung mit Vorteiler auswerten',
  ],
  needs: ['transceiver-bedienung', 'oszillator-mischer-vervielfacher', 'schwingkreis-und-filter'],
  blocks: [
    {
      id: 'intro', type: 'text', title: 'Vom Detektor zum Superhet',
      md: `
Der einfachste Empfänger ist der **[Detektorempfänger](wiki:Detektorempfänger|Crystal radio)**: ein **Parallelschwingkreis** aus Spule und abstimmbarem Kondensator wird vom Signal der Antenne angeregt, wenn er auf die Senderfrequenz abgestimmt ist. Eine **Diode** richtet das [[amplitudenmodulation|AM]]-Signal gleich, ein **hochohmiger Kopfhörer** (er bedämpft den Kreis kaum, und seine Trägheit wirkt wie ein [[tiefpass|Tiefpass]], der die Hüllkurve übrig lässt) macht die Niederfrequenz hörbar. Eine Batterie gibt es nicht: Die Energie kommt aus dem Empfangssignal, deshalb reicht es nur für starke Ortssender. Das Schaltbild mit Spule, Drehkondensator, Diode und Kopfhörer gehört zum **[[detektorempfaenger|Detektorempfänger]]** (EF101), nicht zu einem Verstärker, [[oszillator|Oszillator]] oder Modulator.[^darc-50ohm]
`,
    },
    {
      id: 'fig-detektor', type: 'figure', title: 'Der Detektorempfänger',
      html: detector(),
      caption: 'Schwingkreis wählt die Frequenz, die Diode demoduliert, der Kopfhörer glättet. Alles, was dahinter hörbar wird, ist die Hüllkurve des AM-Signals.',
    },
    {
      id: 'super-text', type: 'text', title: 'Geradeausempfänger gegen Superhet',
      md: `
Beim **[[geradeausempfaenger|Geradeausempfänger]]** wird das Signal nach Empfang und eventueller Verstärkung nur noch **demoduliert**. Der Nachteil ist die **schlechte [[trennschaerfe|Trennschärfe]]**: Man müsste den Eingangsfilter aus vielen Stufen aufbauen, und bei jedem Frequenzwechsel müsste man **alle** Filter nachstimmen. Das ist sehr aufwendig.[^darc-50ohm]

Die Lösung ist der **[Überlagerungsempfänger](wiki:Überlagerungsempfänger|Superheterodyne receiver)**, kurz **[[ueberlagerungsempfaenger|Superhet]]** (*Superheterodyne*): Statt abstimmbarer Filter benutzt man einen **variablen Oszillator ([[vfo|VFO]])**. Ein **[Mischer](wiki:Mischer (Elektronik)|Frequency mixer)** setzt das Empfangssignal mit dem VFO auf eine **feste Frequenz** um, die **[[zwischenfrequenz|Zwischenfrequenz]]** (ZF, $f_\\text{z}$). Weil die ZF immer gleich ist, lassen sich dafür sehr gute, **trennscharfe Filter** bauen (Quarz-, Keramik- oder digitale Filter), die nicht abstimmbar sein müssen.

Der **Vorteil gegenüber dem Geradeausempfänger ist die bessere Trennschärfe** (EF102): Es gibt keine „höheren Bandbreiten“, auch nicht geringere Anforderungen an die VFO-Stabilität (im Gegenteil) und keine wesentlich einfachere Konstruktion (auch hier umgekehrt). Zusätzlich arbeiten alle Stufen nach dem [[mischer|Mischer]] auf derselben Frequenz und müssen nie abgestimmt werden.

## Rechnen: Wo muss der VFO stehen?

Der Mischer erzeugt aus Eingangs- und Oszillatorfrequenz (Formelsammlung: $f_\\text{e}$ und $f_\\text{o}$) die Frequenzen $f_\\text{z1} = f_\\text{e} + f_\\text{o}$ und $f_\\text{z2} = |f_\\text{e} - f_\\text{o}|$; eine davon wählt das ZF-Filter aus. Ziel: $|f_\\text{e} - f_\\text{o}| = f_\\text{z}$, also

$$f_\\text{o} = f_\\text{e} + f_\\text{z}$$

oder

$$f_\\text{o} = f_\\text{e} - f_\\text{z}$$

Mit $f_\\text{z} = 455\\,\\text{kHz}$ und einem Empfangsbereich von 3 bis 30 MHz liegt der VFO zwischen $3{,}455\\,\\text{MHz}$ und $30{,}455\\,\\text{MHz}$. Für 7,100 MHz zum Beispiel bei 7,555 MHz (oder bei 6,645 MHz).

**Direktüberlagerungsempfänger:** Der einfachste Fall: Die ZF *ist* die NF. Dann liegt die Oszillatorfrequenz **in nächster Nähe der Empfangsfrequenz** (EF208), nicht sehr weit darüber oder darunter und auch nicht auf der ZF.

<details><summary>Vertiefung (nicht Prüfungsstoff Klasse E): [[spiegelfrequenz|Spiegelfrequenz]]</summary>
Der Superhet hat einen Haken: Neben $f_\\text{e}$ wird auch eine zweite Frequenz auf die ZF gemischt, die **Spiegelfrequenz** auf der anderen Seite des VFO: $f_\\text{s} = f_\\text{e} + 2 f_\\text{z}$ (VFO oberhalb) beziehungsweise $f_\\text{e} - 2 f_\\text{z}$ (VFO unterhalb). Ein Sender dort ist nach dem Mischer nicht mehr vom Nutzsignal zu trennen. Man dämpft ihn **vor** dem Mischer (Eingangsfilter) oder wählt eine hohe ZF, bei der die Spiegelfrequenz weit weg liegt. Diese Probleme und der Mehrfachsuper kommen in der Klasse A; probiere sie aber im Rechner unten ruhig aus.
</details>
`,
    },
    {
      id: 'erklaervideo-superhet', type: 'video', src: 'assets/video/superhet-spiegel.mp4', poster: 'assets/video/superhet-spiegel.jpg', label: 'Erklärvideo: Mischer, Zwischenfrequenz und Spiegelfrequenz', channel: 'Learning (animiert)', minutes: 2.5,
      why: 'Warum man das Signal verschiebt statt das Filter abzustimmen, was der Mischer tut und woher die Spiegelfrequenz kommt (Vertiefung). Untertitel sind eingebrannt.',
    },
    {
      id: 'hist-super', type: 'callout', tone: 'history', title: 'Wer hat den Superhet erfunden?',
      md: `
Das lässt sich nicht eindeutig sagen: Um das Jahr 1918, mitten im Ersten Weltkrieg und unter intensiver Forschung aller Kriegsparteien, beschäftigten sich unabhängig voneinander mehrere Forscher mit dem Prinzip, darunter [Edwin Howard Armstrong](wiki:Edwin Howard Armstrong|Edwin Howard Armstrong) in den USA, Lucien Lévy in Frankreich und Walter Schottky in Deutschland. Der Name stammt aus lateinisch *super* („über“) und griechisch *hetero* („verschieden“) plus *dynamis* („Kraft“): die Mischung zweier Signale unterschiedlicher Frequenz.
`,
    },
    {
      id: 'demo-superhet', type: 'viz', viz: 'superhet-rechner', title: 'Superhet-Rechner',
      intro: 'Stelle Empfangsfrequenz und ZF ein und suche mit „VFO grob“ und „VFO fein“ die Einstellung, bei der das Nutzsignal in die ZF fällt. Es gibt zwei Lösungen. Der Rest ist Vertiefung: Schalte den Störer auf der Spiegelfrequenz ein und das Eingangsfilter ab.',
      task: 'Mische das Empfangssignal genau auf die ZF und löse die Zusatzziele zur Spiegelfrequenz.',
    },
    {
      id: 'demo-sh-block', type: 'viz', viz: 'sender-blockschaltbild', title: 'Blockschaltbild des Überlagerungsempfängers',
      params: { modes: ['superhet'] },
      intro: 'Dieselbe Technik wie vorher: Stufe antippen, Platz antippen. Neben dem Mischer sitzt der Oszillator (VFO).',
      task: 'Bringe die Stufen des Überlagerungsempfängers in die richtige Reihenfolge.',
    },
    {
      id: 'trenn-text', type: 'text', title: 'Trennschärfe und Bandbreite',
      md: `
Die **Trennschärfe** beschreibt das Vermögen eines Empfängers, das gewünschte Signal zu empfangen und **naheliegende unerwünschte Signale zu unterdrücken**. Voraussetzung ist eine **geringe Bandbreite**, die idealerweise nur so breit ist wie das zu empfangende Signal.[^darc-50ohm] **Eine schmale Empfängerbandbreite führt also zu hoher Trennschärfe** (EF210), nicht zu niedriger. Spiegelfrequenzunterdrückung ist eine andere Eigenschaft (sie hängt am Eingangsfilter), die Antwortoptionen dazu sind Ablenker.

Praktische Werte (für ZF-Filter): **[[einseitenbandmodulation|SSB]]-Sprache** etwa **2,4 kHz**, **Telegrafie** etwa **300 Hz**; AM, [[frequenzmodulation|FM]] und [[digimode|Digimodes]] haben ihre eigenen angepassten Filter. Moderne Geräte bieten zusätzlich ein **Passband-Tuning** und umschaltbare Filter. Zu schmal darf es allerdings nicht sein: Dann geht Nutzsignal verloren (schmales [[cw-tastung|CW]]-Filter bei Sprache: nur noch „Dumpfes“).
`,
    },
    {
      id: 'demo-bw', type: 'viz', viz: 'empfaenger-filter', title: 'Trennschärfe, Notchfilter, Störaustaster',
      params: { start: 'bw' },
      intro: 'Im ersten Experiment „Trennschärfe“ siehst du die gewünschte Station, eine starke Nachbarstation und den Durchlassbereich des ZF-Filters. Die beiden anderen Experimente behandeln wir gleich.',
      task: 'Stelle für SSB 2,4 kHz ein, für CW ein schmales Filter und löse danach die Ziele zu Notchfilter, Noise Blanker und Noise Reduction.',
    },
    {
      id: 'bfo-text', type: 'text', title: 'BFO: der „Träger“ für SSB und CW',
      md: `
Einem SSB- oder CW-Signal fehlt der Träger, den ein AM-Demodulator braucht. Der **[[bfo|BFO]]** (*Beat Frequency Oscillator*, Hilfsträgeroszillator) erzeugt einen **Hilfsträger**, den ein Mischer mit dem **ZF-Signal** zusammenbringt, und macht daraus das NF-Signal. Er dient also **zur Hilfsträgererzeugung, um CW- oder SSB-Signale hörbar zu machen** (EF209). Mit der Erzeugung der ZF (das macht der VFO), der Unterdrückung von Amplitudenüberlagerung oder dem Unterdrücken von FM-Signalen hat der BFO nichts zu tun. Er muss auf **bestmögliche Verständlichkeit** eingestellt werden: Das ist der Grund, warum man bei SSB so feinfühlig abstimmen muss.[^darc-50ohm]
`,
    },
    {
      id: 'agc-text', type: 'text', title: 'AGC: Die Lautstärke gleichmäßig halten',
      md: `
Funksignale schwanken (Fading), Stationen sind unterschiedlich stark. Die **[Automatische Verstärkungsregelung](wiki:Automatische Verstärkungsregelung|Automatic gain control)** (**[[agc|AGC]]**, *Automatic Gain Control*) misst den Pegel am Ausgang des Empfangszweigs und regelt die HF-Verstärkung so, dass die **Empfangslautstärke auch bei schwankendem Eingangssignal nahezu konstant** bleibt (EF211, EF212). Nicht verwechseln mit: „NF-Störaustaster“, „NF-Filter“ oder „NF-Vorspannungsregelung“ (EF211) und mit „Automatischer Antennentuner“, „Gleichlaufsteuerung“ oder „Frequenzkorrektur“ (EF212). Und nicht mit der **[[alc|ALC]]**, die zum Sendezweig gehört.[^darc-50ohm]

Die **Ansprechzeit** lässt sich oft wählen (**slow, normal, fast**): Für **SSB** passen „slow“ oder „normal“. Für **CW** „fast“ oder „normal“, damit ein starkes Signal ein schwaches dahinter nicht überdeckt. Bei manchen digitalen Verfahren schaltet man die AGC ganz ab; die Verstärkung regelt man dann von Hand (RF-Gain).
`,
    },
    {
      id: 'demo-agc', type: 'viz', viz: 'empfaenger-pegel', title: 'AGC im Labor',
      params: { start: 'agc' },
      intro: 'Oben der Eingangspegel (gestrichelt) und die Lautstärke am Ausgang (kräftig). Wähle „SSB mit Fading“ oder „CW: stark, dann schwach“ und stelle die AGC auf aus, slow oder fast.',
      task: 'Löse die Ziele zur AGC (Schwankung mit und ohne AGC, CW mit schneller AGC). Danach stelle oben auf „Dämpfungsglied“ und „Vorverstärker“ um und löse auch diese Ziele.',
    },
    {
      id: 'filt-text', type: 'text', title: 'Störungen im Empfänger: Notch, Noise Blanker, Noise Reduction',
      md: `
Moderne [[transceiver|Transceiver]] haben drei verschiedene Werkzeuge gegen drei verschiedene Störungen. Wer sie vertauscht, bekommt die Antworten im Katalog falsch:

- **[Notchfilter](wiki:Notchfilter)** (Kerbfilter): ein **sehr schmalbandiges** Filter, das **eine bestimmte Frequenz** unterdrückt, zum Beispiel einen **störenden Träger** (Pfeifton), ohne den Rest der Sendung zu beeinflussen. Es kann im NF- oder (besser, gegen starke Störer und den AGC-Einfluss) im ZF-Bereich arbeiten. Im Frequenzgang ergibt sich eine **Kerbe**: eine schmale Senke (EF215, EF216). Tiefpass, [[hochpass|Hochpass]] und [[bandpass|Bandpass]] sind **keine** Filter für einen schmalen Störbereich.
- **[[noise-blanker|Noise Blanker]]** (NB, Störaustaster): tastet kurze **impulsförmige Störungen** aus dem Empfangssignal aus, z. B. Zündfunken von Fahrzeugen oder Schaltnetzteile (EF214). [[notchfilter|Notchfilter]], Passband-Tuning und AGC sind dafür falsch.
- **[Noise Reduction](wiki:Rauschunterdrückung|Noise reduction)** (NR, bei digitaler Ausführung DNR): **verringert den Rauschanteil im Signal** (EF213). Sie senkt weder das Rauschen der Versorgungsspannung noch Umgebungsgeräusche im Kopfhörer noch den Dynamikbereich der ZF.

Das Bild zur **Kerbe** in der Prüfung (EF216): Ein flaches Band mit einer **schmalen, tiefen Senke** ist der Notchfilter-Frequenzgang. Eine breite Senke wäre eine Bandsperre.[^darc-50ohm]
`,
    },
    {
      id: 'warn-filt', type: 'callout', tone: 'warning', title: 'Welches Werkzeug für welche Störung?',
      md: `
**Pfeifton oder Träger** → Notch. **Knacken, Zündfunken, Impulse** → Noise Blanker. **Rauschteppich** → [[noise-reduction|Noise Reduction]]. **Starker Sender in der Nähe, Verzerrungen** → [[daempfungsglied|Dämpfungsglied]]. Merke dir den Satz: *Notch = eine Frequenz, Blanker = ein Zeitpunkt, Reduction = ein Teppich.*
`,
    },
    {
      id: 'att-text', type: 'text', title: 'Dämpfungsglied und Vorverstärker',
      md: `
**Kurzwellenempfänger** können durch **starke Signale** übersteuert werden, im Eingangsbereich und im ersten Mischer. Das merkt man an verzerrter, unverständlicher Wiedergabe. Ein zuschaltbares **[Dämpfungsglied](wiki:Dämpfungsglied|Attenuator (electronics))** (Abschwächer, *Attenuator*, ATT) dämpft alle Eingangssignale um einen festen Betrag, so dass der Eingang nicht mehr übersteuert wird: **Das Dämpfungsglied vermindert die [[uebersteuerung|Übersteuerung]] eines Empfängereingangs** (EF217). ZF-Filter, [[squelch|Rauschsperre]] und Oszillator tun das nicht.[^darc-50ohm]

Auf **VHF/UHF** ist es umgekehrt: Signale werden oft schon in der **Antennenleitung abgeschwächt** und sollten verstärkt werden. Der **[[antennenvorverstaerker|Vorverstärker]]** gehört **möglichst direkt an die UHF-Antenne** (EF218), damit er das Signal verstärkt, **bevor** das Kabel es dämpft und das Rauschen des Empfängers ins Spiel kommt; unmittelbar vor dem Empfängereingang, zwischen Senderausgang und Antennenkabel oder zwischen [[swr|SWR]]-Messgerät und Empfänger wäre er falsch eingebaut. Beim **Senden** muss er abgeschaltet werden ([[ptt|PTT]]-gesteuert), und bei starken lokalen Signalen auch im Empfangsfall deaktivierbar sein.
`,
    },
    {
      id: 'mission-empf', type: 'callout', tone: 'mission', title: 'Funkpraxis: Wenn ein starker Sender nebenan funkt',
      md: `
Auf 40 m hörst du abends ein starkes Rundfunksignal und plötzlich „spritzt“ deine ganze Empfangsfrequenz. Erst **ATT zuschalten** (oder den Vorverstärker ausschalten), dann **Bandbreite verkleinern** (Trennschärfe), bei einem Pfeifton das **Notchfilter**. In dieser Reihenfolge: erst Übersteuerung beheben, dann feinfiltern.
`,
    },
    {
      id: 'zaehler-text', type: 'text', title: 'Frequenz messen: Frequenzzähler und Vorteiler',
      md: `
Nach einer Reparatur oder wenn Bauteile gealtert sind, muss ein Empfänger **neu abgeglichen** werden; dazu gehört die Kontrolle der Oszillatorfrequenzen. Die **Frequenz eines unmodulierten Hochfrequenzsignals** misst man mit einem **[Frequenzzähler](wiki:Frequenzzähler|Frequency counter)** (EI501); Widerstandsmessgerät, Wechselspannungsmessgerät oder Wechselstromzähler messen keine Frequenz.[^darc-50ohm]

## Die Anzeige lesen

Viele Zähler zeigen die Ziffern der Frequenz und rechts hochgestellt eine kleine **Zehnerpotenz**. **Die Zehnerpotenz gilt für die Stelle direkt vor dem Komma** (EI502, EI503). Beispiel: Zeigt ein Zähler **455,000** mit der abgesetzten **3** (für $10^3$), misst er $455 \\cdot 10^3\\,\\text{Hz} = 455\\,\\text{kHz}$, die typische Zwischenfrequenz. Die Stelle **vor** dem Komma hat den Stellenwert $10^3\\,\\text{Hz} = 1\\,\\text{kHz}$; **nach links** wird jede Stelle zehnmal wertvoller (10 kHz, 100 kHz), **nach rechts** zehnmal kleiner (100 Hz, 10 Hz, 1 Hz).

Beim Abgleich heißt es oft „auf ±10 Hz genau einstellen“: Dann musst du die **Stelle** finden, die 10 Hz bedeutet.

## Messen mit [[frequenzteiler|Vorteiler]]

Jeder Zähler arbeitet nur in einem Bereich (zum Beispiel 100 kHz bis 2 GHz). Für höhere Frequenzen schaltet man einen **[Frequenzteiler](wiki:Frequenzteiler|Frequency divider)** (Vorteiler) **vor** den Zähler; er teilt die Frequenz durch einen festen Wert, häufig 10. Der Zähler zeigt dann nur einen Bruchteil. Zeigt er bei einem **10:1-Teiler** 14,5625 MHz, ist die tatsächliche Frequenz **145,625 MHz** (EI504), nicht 1,45625 MHz oder 14,5625 kHz.

**Achtung:** Manche Zählereingänge haben $50\\,\\Omega$ und sind besonders empfindlich: Den in der Anleitung genannten Höchstwert für Spannung oder Leistung darf man keinesfalls überschreiten.
`,
    },
    {
      id: 'demo-zaehler', type: 'viz', viz: 'frequenzzaehler', title: 'Frequenzzähler-Trainer',
      intro: 'Zwei Aufgabenarten: den Stellenwert einer markierten Ziffer bestimmen oder eine Messung hinter einem Vorteiler auswerten.',
      task: 'Löse fünf Aufgaben in Folge richtig.',
    },
    {
      id: 'video-empf', type: 'video', youtube: 'j_m3r7yx3CU', label: 'Amateurfunkvorlesung Klasse E, Lektion 13 Empfänger und Lektion 14 Sender (Teil 1)', channel: 'Computer Engineering @ JMU Würzburg',
      why: 'Hochschulvorlesung zu Empfängern und Sendern aus dem Klasse-E-Kurs, zum Nachhören der Themen dieser und der vorigen Lektion.',
    },
    {
      id: 'calc-vfo', type: 'numeric', title: 'VFO-Frequenz berechnen',
      question: 'Ein Superhet mit der Zwischenfrequenz 455 kHz soll 14,200 MHz empfangen. Der VFO soll **oberhalb** der Empfangsfrequenz schwingen. Welche Frequenz hat er? Antwort in MHz.',
      answer: 14.655, tolerance: 0, unit: 'MHz',
      hint: 'Es soll gelten $|f_\\text{e} - f_\\text{o}| = f_\\text{z}$; der VFO liegt oben, also $f_\\text{o} = f_\\text{e} + f_\\text{z}$.',
      explain: '$f_\\text{o} = 14{,}200\\,\\text{MHz} + 0{,}455\\,\\text{MHz} = 14{,}655\\,\\text{MHz}$. Unterhalb wäre es 13,745 MHz. Probe: $|14{,}200 - 14{,}655| = 0{,}455\\,\\text{MHz}$.',
    },
    {
      id: 'calc-teiler', type: 'numeric', title: 'Messung mit Vorteiler',
      question: 'Vor einem Frequenzzähler hängt ein 10:1-Frequenzteiler. Der Zähler zeigt 24,0125 MHz. Wie hoch ist die tatsächliche Frequenz? Antwort in MHz.',
      answer: 240.125, tolerance: 0, unit: 'MHz',
      hint: 'Der Teiler hat die Frequenz durch 10 geteilt.',
      explain: '$24{,}0125\\,\\text{MHz} \\cdot 10 = 240{,}125\\,\\text{MHz}$.',
    },
    {
      id: 'match-stufen', type: 'match', title: 'Stufe und Aufgabe',
      prompt: 'Ordne jeder Baugruppe ihre Aufgabe im Empfänger zu.',
      pairs: [
        ['BFO', 'erzeugt einen Hilfsträger für CW und SSB'],
        ['AGC', 'hält die Lautstärke bei schwankendem Eingangssignal nahezu konstant'],
        ['Notchfilter', 'unterdrückt eine schmale Frequenz, z. B. einen Störträger'],
        ['Noise Blanker', 'tastet impulsförmige Störungen aus'],
        ['Noise Reduction', 'verringert den Rauschanteil im Signal'],
        ['Dämpfungsglied', 'verhindert die Übersteuerung des Empfängereingangs'],
        ['Vorverstärker an der Antenne', 'gleicht Kabelverluste bei VHF/UHF aus'],
      ],
    },
    {
      id: 'order-superhet', type: 'order', title: 'Signalweg im Superhet',
      prompt: 'Bringe die Stufen eines Überlagerungsempfängers in die richtige Reihenfolge.',
      items: ['Antenne', 'Eingangsfilter (Bandpass)', 'HF-Verstärker', 'Mischer (mit VFO)', 'ZF-Filter', 'Demodulator', 'NF-Verstärker', 'Lautsprecher'],
      explain: 'Das Signal wird erst gefiltert und verstärkt, dann mit dem VFO auf die feste ZF gemischt. Dort sitzen die trennscharfen Filter, danach folgen Demodulator und NF.',
    },
    {
      id: 'quiz-super', type: 'quiz', title: 'Superhet und Trennschärfe',
      question: 'Welche Aussagen sind richtig? (Mehrfachauswahl)',
      options: [
        { text: 'Der Überlagerungsempfänger hat eine bessere Trennschärfe als der Geradeausempfänger.', correct: true, why: 'Die feste ZF erlaubt sehr gute, nicht abstimmbare Filter.' },
        { text: 'Eine schmale Empfängerbandbreite führt zu hoher Trennschärfe.', correct: true, why: 'Nachbarsignale bleiben draußen.' },
        { text: 'Beim Direktüberlagerungsempfänger liegt die Oszillatorfrequenz in nächster Nähe der Empfangsfrequenz.', correct: true, why: 'Die ZF ist dort die NF, also nur wenige kHz.' },
        { text: 'Der BFO erzeugt die Zwischenfrequenz aus dem Empfangssignal.', correct: false, why: 'Das macht der VFO im Mischer. Der BFO liefert einen Hilfsträger für CW/SSB.' },
        { text: 'Der Superhet ist einfacher aufgebaut als ein Geradeausempfänger.', correct: false, why: 'Er braucht Mischer, Oszillator und ZF-Filter, ist also aufwendiger; sein Vorteil ist die Trennschärfe.' },
      ],
    },
    {
      id: 'recall-empf', type: 'recall', title: 'In eigenen Worten',
      prompt: 'Erkläre, warum ein Superhet besser trennt als ein Geradeausempfänger, wie man die Oszillatorfrequenz berechnet und welche Werkzeuge du gegen Pfeifton, Zündfunken, Rauschen und einen übersteuernden Nachbarsender einsetzt.',
      answer: 'Der Superhet setzt das Empfangssignal mit einem variablen Oszillator (VFO) im Mischer auf eine feste Zwischenfrequenz um. Weil sie immer gleich ist, lassen sich dort sehr trennscharfe, nicht abstimmbare Filter einsetzen; beim Geradeausempfänger müssten alle Filter bei jedem Frequenzwechsel nachgestimmt werden. Die VFO-Frequenz ist f_o = f_e + f_z oder f_o = f_e − f_z (|f_e − f_o| = f_z). Gegen einen Pfeifton hilft ein Notchfilter, gegen Zündfunken ein Noise Blanker, gegen Rauschen die Noise Reduction, gegen einen übersteuernden Sender ein Dämpfungsglied.',
      hints: ['Was bleibt bei einem Superhet immer gleich?', 'Notch = eine Frequenz, Blanker = ein Zeitpunkt, Reduction = ein Teppich.'],
      cards: ['superhet-idee', 'stoerungen-werkzeuge'],
    },
  ],
  cards: [
    { id: 'detektor', front: 'Aus welchen Teilen besteht ein Detektorempfänger?', back: 'Parallelschwingkreis (Spule + abstimmbarer Kondensator), Diode (Detektor) und hochohmiger Kopfhörer; keine Batterie.' },
    { id: 'superhet-idee', front: 'Idee des Überlagerungsempfängers (Superhet)?', back: 'Ein variabler Oszillator (VFO) und ein Mischer setzen das Empfangssignal auf eine feste Zwischenfrequenz um, dort trennscharfe, nicht abstimmbare Filter. Typische ZF: 455 kHz.' },
    { id: 'superhet-vorteil', front: 'Vorteil des Überlagerungsempfängers gegenüber dem Geradeausempfänger?', back: 'Bessere Trennschärfe (nicht: höhere Bandbreite, einfacherer Aufbau oder geringere VFO-Anforderungen).' },
    { id: 'vfo-formel', front: 'Welche VFO-Frequenz braucht ein Superhet?', back: 'f_o = f_e + f_z oder f_o = f_e − f_z, so dass |f_e − f_o| = f_z. Beispiel: 14,200 MHz, ZF 455 kHz → 14,655 MHz (oder 13,745 MHz).' },
    { id: 'direktmisch', front: 'Direktüberlagerungsempfänger: Oszillatorfrequenz?', back: 'In nächster Nähe der Empfangsfrequenz (die ZF ist die NF).' },
    { id: 'trennschaerfe', front: 'Wozu führt eine schmale Empfängerbandbreite?', back: 'Zu hoher Trennschärfe. Richtwerte: SSB 2,4 kHz, CW 300 Hz.' },
    { id: 'bfo', front: 'Wozu dient der BFO?', back: 'Zur Hilfsträgererzeugung, um CW- oder SSB-Signale hörbar zu machen.' },
    { id: 'agc-def', front: 'Was ist AGC?', back: 'Automatische Verstärkungsregelung im Empfangszweig: hält die Lautstärke bei schwankendem Eingangssignal nahezu konstant. SSB: slow/normal, CW: fast/normal.' },
    { id: 'stoerungen-werkzeuge', front: 'Notch, Noise Blanker, Noise Reduction?', back: 'Notch: unterdrückt einen schmalen Frequenzbereich (Störträger). NB: blendet impulsförmige Störungen aus. NR: verringert den Rauschanteil.' },
    { id: 'att-def', front: 'Was vermindert die Übersteuerung eines Empfängereingangs?', back: 'Ein Dämpfungsglied (Abschwächer, ATT).' },
    { id: 'vorverstaerker-ort', front: 'Wo sitzt ein UHF-Vorverstärker?', back: 'Möglichst direkt an der UHF-Antenne (vor dem Kabel). Beim Senden abschalten (PTT-gesteuert).' },
    { id: 'zaehler-stelle', front: 'Wie liest man die Zehnerpotenz am Frequenzzähler?', back: 'Sie gilt für die Stelle direkt vor dem Komma. Nach links wird jede Stelle zehnmal wertvoller, nach rechts zehnmal kleiner. Beispiel: 455,000 mit ³ → 455 kHz.' },
    { id: 'zaehler-teiler', front: 'Zähler hinter 10:1-Teiler zeigt 14,5625 MHz. Tatsächliche Frequenz?', back: '145,625 MHz (angezeigter Wert · Teilerverhältnis).' },
    { id: 'frequenzzaehler', front: 'Womit misst man die Frequenz eines unmodulierten HF-Signals?', back: 'Mit einem Frequenzzähler (nicht Widerstands- oder Wechselspannungsmessgerät).' },
  ],
};
