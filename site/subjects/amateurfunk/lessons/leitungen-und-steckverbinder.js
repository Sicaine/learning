// Abbildungen: Zeichnungen aus dem amtlichen Prüfungsfragenkatalog (Bundesnetzagentur, Datenlizenz Deutschland – Namensnennung 2.0).
const F = id => `assets/data/afu/figures/${id}.svg`;
const grid = (items, min = 150, maxH = 190) => `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(${min}px,1fr));gap:12px;align-items:end">${items.map(([id, cap]) => `<figure style="margin:0;text-align:center"><img src="${F(id)}" alt="${cap}" loading="lazy" style="width:100%;max-height:${maxH}px;object-fit:contain;background:#fff;border:1px solid var(--line);border-radius:10px;padding:6px"><figcaption style="font-size:.82rem;color:var(--muted);margin-top:4px">${cap}</figcaption></figure>`).join('')}</div>`;

export default {
  id: 'leitungen-und-steckverbinder',
  title: 'Koaxkabel, Leitungen, Dämpfung und Steckverbinder',
  summary: 'Wellenwiderstand (50, 60, 75 Ω), Koax und Paralleldrahtleitung, Kabeldämpfung in dB je 100 m ablesen und rechnen, Steckverbinder PL, N, BNC und SMA erkennen.',
  minutes: 30,
  goals: [
    'Den [[wellenwiderstand]] einer Leitung erklären: typische Werte (50, 60, 75 Ω), unabhängig von Länge und Abschluss, Reflexionen bei Fehlanpassung',
    'Koaxialkabel und Paralleldrahtleitung vergleichen, symmetrisch und unsymmetrisch unterscheiden',
    '[[kabeldaempfung|Kabeldämpfung]] in dB berechnen: Faktoren (3 dB, 6 dB, 10 dB), Länge und Frequenz, und aus einem Kabeldämpfungsdiagramm ablesen',
    'Die Steckverbinder PL, N, BNC und SMA erkennen und dem Frequenzbereich und der Leistung zuordnen',
  ],
  needs: ['elektrotechnik/leitungen-wellenwiderstand', 'elektrotechnik/dezibel'],
  blocks: [
    {
      id: 'intro', type: 'text', title: 'Vom Sender zur Antenne: die Übertragungsleitung',
      md: `
Die Leistung des Senders soll möglichst vollständig bei der Antenne ankommen und dort abgestrahlt werden. Dafür braucht man spezielle Antennenleitungen, in der Fachsprache **Übertragungsleitungen**. Am weitesten verbreitet ist das **[Koaxialkabel](wiki:Koaxialkabel|Coaxial cable)** („Koax“): Ein **Innenleiter** wird von einem isolierenden [Dielektrikum](wiki:Dielektrikum|Dielectric) (oft [Polyethylen](wiki:Polyethylen|Polyethylene), massiv oder geschäumt) umgeben, darum liegt der rohrförmige **Außenleiter** (Schirm, aus Geflecht, Folie oder Kupferrohr) und außen ein Schutzmantel.[^darc-50ohm] Es gibt Koaxialkabel dick und dünn, mit flexiblem oder starrem Innenleiter.

Im Idealfall führt der Innenleiter die Spannung, der Schirm liegt auf Erdpotential. Weil der Schirm das Feld im Kabel einschließt, strahlt ein Koaxkabel bei bestimmungsgemäßem Betrieb nicht ab und nimmt keine Störungen auf: **Hochwertige Koaxialkabel** sind deshalb die richtigen HF-Verbindungen zwischen den Geräten in der Funkstelle, nicht symmetrische Feederleitungen und nicht abgeschirmte Netzkabel.
`,
    },
    {
      id: 'zo', type: 'text', title: 'Wellenwiderstand',
      md: `
Jede Leitung hat einen **[[wellenwiderstand|Wellenwiderstand]]** $Z_0$ (siehe [Wellenwiderstand](wiki:Wellenwiderstand|Characteristic impedance)), angegeben in Ohm. Er beschreibt, wie sich Spannung und Strom einer Welle auf der Leitung zueinander verhalten (eine [Impedanz](wiki:Impedanz|Electrical impedance)), und hängt **nur vom Aufbau** ab: von der Geometrie der Leiter (zum Beispiel dem Abstand zwischen Innen- und Außenleiter) und vom Dielektrikum. Er ist im HF-Bereich nahezu **konstant**.

Drei wichtige Folgerungen:

1. **Typische Koaxialkabel haben 50, 60 oder 75 Ω.** Im Amateurfunk sind es fast immer **50 Ω**, denn der Antennenanschluss der Funkgeräte ist auf 50 Ω ausgelegt. 75 Ω findet man in der Fernsehtechnik, 60 Ω selten. (300 und 600 Ω gibt es bei symmetrischen Bandleitungen, nicht bei Koaxkabeln.)
2. **Der Wellenwiderstand ist unabhängig von der Länge der Leitung und davon, was am Ende angeschlossen ist.** Ein 1 m langes und ein 100 m langes RG58 haben beide 50 Ω, und es ist egal, ob du eine Antenne, einen Widerstand oder nichts anschließt.
3. **Verbindest du Leitungen oder Lasten mit unterschiedlicher Impedanz, wird an der Stoßstelle reflektiert.** Ein Teil der Leistung läuft zum Sender zurück, kann nicht abgestrahlt werden und kann im schlimmsten Fall die Endstufe beschädigen (mehr dazu in der SWR-Lektion). Auch Steckverbinder sollen den gleichen Wellenwiderstand wie das Kabel haben.

Die Wellenwiderstände der gängigen Leitungen im Amateurfunk sind also **Zahlenwerte, die du kennen musst**: 50 Ω (Standard), 60 Ω, 75 Ω.
`,
    },
    {
      id: 'warn-zo', type: 'callout', tone: 'warning', title: 'Wellenwiderstand ist kein Messwert mit dem Ohmmeter',
      md: `Der Wellenwiderstand hängt **nicht** von der Leitungslänge oder der Beschaltung am Ende ab; er ist auch nicht völlig frequenzunabhängig, sondern im HF-Bereich nur in etwa konstant. Einen Gleichstromwiderstand des Kabels misst du mit dem Multimeter (der ist winzig); der Wellenwiderstand ist etwas ganz anderes. Prüfungsbezug: NG201, EG301.`,
    },
    {
      id: 'sym', type: 'text', title: 'Koax, Paralleldraht, symmetrisch und unsymmetrisch',
      md: `
Eine Speiseleitung ist **unsymmetrisch**, wenn ihre beiden Leiter **unterschiedlich geformt** sind und unterschiedliche Spannungen gegen Erde führen, wie beim Koaxialkabel (der Schirm liegt auf Erdpotential, nur der Innenleiter führt Spannung). Nicht gemeint ist, dass hin- und rücklaufende Leistung verschieden sind, dass sie außerhalb der Resonanz betrieben wird oder dass ihre Länge kein Vielfaches von $\\lambda/2$ ist.

Die wichtigste **symmetrische** Leitung ist die **Paralleldraht-Speiseleitung** („Hühnerleiter“, vgl. [Bandleitung](wiki:Bandleitung|Twin-lead)): zwei gleiche parallele Drähte im festen Abstand. Gegenüber Koax hat sie eine **geringere Dämpfung** und eine **höhere Spannungsfestigkeit** (kein Dielektrikum, das Verluste macht oder durchschlagen kann). Sie vermeidet aber keine Mantelwellen durch „Wegfall der Abschirmung“: Sie strahlt bei Unsymmetrie sogar leichter ab. Der Wellenwiderstand wird durch den Drahtabstand und den Drahtdurchmesser bestimmt, nicht durch Verschieben von Spreizern im Betrieb, und einen Blitzschutz bietet sie auch nicht. Auch Koaxialkabel können abstrahlen, wenn **Mantelwellen** vorhanden sind (nächste Lektion).

Praktisch: **Netzanschluss- und HF-Leitungen nicht gemeinsam in einen Kabelkanal legen.** Nebeneinander verlegt, kann sich HF in das Versorgungsnetz einkoppeln. Spannungsüberschläge sind es nicht, und auch keine 50-Hz-Modulation auf dem Koaxkabel.
`,
    },
    {
      id: 'dB', type: 'text', title: 'Kabeldämpfung: Dezibel und Faktoren',
      md: `
Auch das beste Kabel verbraucht einen Teil der Leistung: Sie wird in Wärme umgesetzt. Die **[[kabeldaempfung|Kabeldämpfung]]** gibt an, wie viel das ist, und wird in **Dezibel (dB)** angegeben, im Datenblatt meist **je 100 m**. Ein positiver Wert heißt „Dämpfung“: Die Leistung nimmt ab. ([Dezibel](wiki:Dezibel|Bel (unit)) sind ein logarithmisches Maß für ein Leistungsverhältnis.)

$$a = 10\\cdot\\log_{10}\\frac{P_1}{P_2}\\;\\text{dB}\\qquad\\text{(}P_1\\text{ am Kabelanfang, }P_2\\text{ am Ende)}$$

Du brauchst kein Taschenrechner-Training, nur wenige Merkpunkte aus der Tabelle der Formelsammlung:[^bnetza-formelsammlung]

| Dämpfung | Leistungsfaktor ($P_1/P_2$) | Am Ende bleibt … |
|---|---|---|
| 3 dB | 2 | die Hälfte |
| 6 dB | 4 | ein Viertel |
| 10 dB | 10 | ein Zehntel |
| 20 dB | 100 | ein Hundertstel |

Ist am Kabelende nur noch ein **Viertel** der Leistung, beträgt die Dämpfung **6 dB**; bei einem **Zehntel** 10 dB; hat sich die Leistung **halbiert** (100 W → 50 W bei angepasster Leitung), sind es **3 dB**. Das Dämpfungsmaß ist positiv; „−3 dB“ wäre keine Dämpfung, sondern ein Gewinn. **Dämpfungen mehrerer Kabelstücke addieren sich in dB:** Ein 2-dB-Stück und ein 3-dB-Stück ergeben zusammen 5 dB. Der Antennengewinn verändert die Kabelverluste nicht.

**Länge und Frequenz:** Die Dämpfung wächst **proportional zur Länge** (Verdopplung der Länge, doppelte dB) und **mit der Frequenz** (unter anderem, weil der [Skin-Effekt](wiki:Skin-Effekt|Skin effect) den Strom bei hohen Frequenzen in eine dünne Randschicht der Leiter drängt). Ein 100 m langes Kabel mit 20 dB bei 145 MHz hat bei 20 m nur noch $\\tfrac{20}{100}\\cdot 20\\,\\text{dB} = 4$ dB. Dünne Kabel dämpfen stärker als dicke. Auf den hohen Bändern ist ein kurzes, dickes Kabel darum Pflicht, auf Kurzwelle spielt die Kabeldämpfung kaum eine Rolle.
`,
    },
    {
      id: 'diagramm', type: 'text', title: 'Das Kabeldämpfungsdiagramm in der Formelsammlung',
      md: `
Der Anhang der Formelsammlung enthält ein **Kabeldämpfungsdiagramm**: Auf der waagerechten Achse steht die Frequenz (logarithmisch), auf der senkrechten die Dämpfung in dB **je 100 m** (ebenfalls logarithmisch). Jede Kurve ist ein Kabeltyp, beschriftet mit Dielektrikum und Durchmesser (etwa „Voll-PE, 4,95 mm (RG58)“). So liest du ab:

1. Frequenz auf der waagerechten Achse suchen (zum Beispiel 145 MHz).
2. Senkrecht nach oben bis zur Kurve deines Kabels, dann waagerecht zum Wert je 100 m.
3. Mit der Kabellänge umrechnen: $a = a_{100}\\cdot\\dfrac{\\ell}{100\\,\\text{m}}$.

Die Aufgaben der Prüfung geben die Werte aus dem Diagramm so vor (Dämpfung je 100 m): **RG58 bei 145 MHz: 20 dB**; **RG174 bei 145 MHz: 40 dB**; **12,7-mm-Schaumkabel bei 435 MHz: 7 dB**; **10,3-mm-Schaumkabel im 23-cm-Band (1296 MHz): etwa 20,5 dB**. Beispiele: 15 m RG58 bei 145 MHz = $0{,}15\\cdot 20 = 3$ dB; 50 m RG174 bei 145 MHz = $0{,}5\\cdot 40 = 20$ dB; 40 m 12,7-mm-Schaum bei 435 MHz = $0{,}4\\cdot 7 = 2{,}8$ dB; 40 m 10,3-mm-Schaum bei 1296 MHz = $0{,}4\\cdot 20{,}5 = 8{,}2$ dB.
`,
    },
    {
      id: 'demo-kabel', type: 'viz', viz: 'kabel-daempfung', title: 'Kabeldämpfungs-Rechner',
      intro: 'Wähle Kabeltyp, Frequenz und Länge. Die Kurven stellen das Kabeldämpfungsdiagramm nach (Lernmodell mit den Prüfungspunkten, dazwischen √f). Rechts unten siehst du dB, Leistungsfaktor und Leistung am Kabelende.',
      task: 'Stelle genau 3 dB und dann 10 dB Kabeldämpfung ein und finde eine Kombination für 70 cm mit 40 m Kabel unter 3 dB.',
    },
    {
      id: 'mission-kabel', type: 'callout', tone: 'mission', title: 'Funkpraxis: Kabel nach Frequenz wählen',
      md: `Auf **Kurzwelle** reicht auch dünnes RG58: Bei 7 MHz verliert es auf 100 m nur etwa 4 dB. Im **2-m-Band** sind 20 m RG58 schon etwa 4 dB, das ist fast die halbe Sendeleistung. Auf **70 cm und 23 cm** nimmst du dickes Kabel mit Schaumdielektrikum und möglichst kurze Wege. Faustregel: Jedes 3 dB halbiert die Leistung, die beim Funkpartner ankommt, sendend wie empfangend.`,
    },
    {
      id: 'stecker', type: 'text', title: 'Koaxialsteckverbinder: PL, N, BNC, SMA',
      md: `
Steckverbinder bestehen wie das Koaxkabel aus Innenleiter und Außenleiter. Der **Stecker** (männlich) hat einen Kontaktstift nach außen, die **Kupplung** (weiblich) eine Kontaktöffnung; eingebaute Kupplungen heißen **Buchse**. Der Außenleiter des Kabels wird mit dem Metallgehäuse verlötet oder gecrimpt. Die Wahl hängt vom **Frequenzbereich**, der **Sendeleistung** und dem Kabeltyp ab; der Steckverbinder soll denselben Wellenwiderstand haben wie das Kabel. Vier musst du an der Bauform erkennen:

- **PL-Steckverbinder** (auch UHF-Stecker): Schraubverbindung mit Überwurfmutter. Für die gesamte Kurzwelle und darüber bis etwa zum 2-m-Band. **Trotz des Namens UHF nicht für UHF geeignet.** Nie in eine N-Buchse stecken, die Buchse kann zerstört werden.
- **N-Steckverbinder:** Schraubverbindung mit Federkontakten um den Mittelstift. Bis in den **GHz-Bereich** mit definiertem **50-Ω**-Wellenwiderstand und der **höchsten Spannungsfestigkeit** für hohe Leistungen; Standard für UHF/SHF-Anlagen und Außeninstallation.
- **BNC-Steckverbinder:** **Bajonettverschluss**, eine Vierteldrehung löst ihn. Für kleine Leistungen bis etwa zum 70-cm-Band, an Handfunkgeräten und Messgeräten.
- **SMA-Steckverbinder:** klein, kleine Schraubmutter, für sehr hohe Frequenzen; an HF-Messgeräten und Handfunkgeräten. Es gibt eine „Reverse“-Variante mit vertauschtem Mittelkontakt.

Für Frequenzen oberhalb 300 MHz sind also **N und SMA** am besten geeignet; BNC reicht nur für kleine Leistungen, Cinch und UHF/PL sind dafür nicht geeignet. Steckverbinder immer sorgfältig und fest anschrauben; sie sind empfindlich.

${grid([['NG202_q', 'PL: Schraubverbindung mit Rändelmutter'], ['NG203_q', 'BNC: Bajonettverschluss'], ['NG204_q', 'N: Schraubverbindung mit Federkontakten'], ['NG205_q', 'SMA: klein, sechskantige Schraubmutter']], 150, 150)}
`,
    },
    {
      id: 'stecker-details', type: 'text', title: 'Die vier Steckverbinder im Einzelnen',
      md: String.raw`
**Aufbau und Montage.** Ein Koaxialsteckverbinder ([Koaxialstecker](wiki:Koaxialstecker|RF connector)) wiederholt den Kabelaufbau im Kleinen: Der **Innenleiter** des Kabels wird mit dem Kontakt in der Mitte verbunden, der **Außenleiter** (Schirmgeflecht oder Folie) mit dem Metallgehäuse. Beide Verbindungen müssen gut leiten; üblich sind [Löten](wiki:Löten|Soldering) oder [Crimpen](wiki:Crimpen|Crimp (joining)), also Verpressen mit einer Zange.[^darc-50ohm] Weil Koaxkabel unterschiedlich dick sind, brauchst du einen Steckverbinder, der zum **Kabeldurchmesser** passt; manche Typen gibt es in mehreren Ausführungen für dünne und dicke Kabel. Und der Steckverbinder soll denselben **Wellenwiderstand** haben wie das Kabel, sonst reflektiert er.

**Namen.** Der **Stecker** hat den Stift nach außen, die **Kupplung** die Öffnung. In ein Gerät eingebaut heißt die Kupplung **Buchse** und ein eingebauter Stecker **Einbaustecker**.

| Typ | Verschluss | Typischer Einsatz | Hinweis |
|---|---|---|---|
| **PL** | Schraubverbindung | Kurzwelle bis zum 2-m-Band (VHF) | heißt auch „UHF-Stecker“, ist für UHF aber ungeeignet |
| **N** | Schraubverbindung, Federkontakte um den Mittelstift | hohe Frequenzen bis in den GHz-Bereich, höhere Leistungen | hochwertiger als PL |
| **BNC** | Bajonett, etwa 90° drehen | kleine Leistungen bis zum 70-cm-Band, Messgeräte | schnell lösbar, Feder gegen ungewolltes Lösen |
| **SMA** | kleine Schraubverbindung | sehr hohe Frequenzen, HF-Messgeräte | immer häufiger, BNC wird seltener |

**PL ([UHF-Steckverbinder](wiki:UHF-Steckverbinder|UHF connector)).** Der Klassiker für Kurzwellen-Stationen. Wegen des Namens „UHF“ wird er gern für 70 cm gekauft; dafür ist er aber nicht gedacht. Sein Platz ist KW bis 2 m.

**N.** Die Federkontakte rund um den Mittelstift sorgen für eine besonders gute Verbindung des Außenleiters. N-Steckverbinder nimmst du, wenn die Frequenz über VHF liegt oder die Leistung hoch ist.

**[BNC](wiki:BNC-Steckverbinder|BNC connector).** Der [Bajonettverschluss](wiki:Bajonettverschluss|Bayonet mount) ist in einer Vierteldrehung offen oder zu. Praktisch am Oszilloskop und am Handfunkgerät, aber nicht für hohe Leistung gedacht.

**SMA.** Klein und für sehr hohe Frequenzen tauglich. Es gibt die Variante **Reverse-SMA**: Der Mittelkontakt ist „umgedreht“. Wo der normale SMA-Stecker einen Stift hat, hat der Reverse-Stecker eine Öffnung, und die Kupplung trägt den Stift. Außerdem weicht hier die Benennung ab: Der **Reverse-SMA-Stecker** ist der ohne Mittelstift, also optisch eine Kupplung.
`,
    },
    {
      id: 'warn-stecker', type: 'callout', tone: 'warning', title: 'Verwechslungsgefahr: PL/N und SMA/Reverse-SMA',
      md: `Ein **PL-Stecker** passt mechanisch in eine **N-Buchse**, **zerstört sie aber** möglicherweise. Kontrolliere vor dem Einschrauben immer, was auf dem Gerät und was am Kabel sitzt. Bei SMA und Reverse-SMA sehen beide Varianten fast gleich aus und werden im Amateurfunk beide verwendet; ein Stift auf Stift passt nicht. Auch der Name „UHF“ für PL ist eine Falle. Schraube Steckverbinder immer sorgfältig und fest an, sie sind empfindlich und dürfen nicht beschädigt sein. Prüfungsbezug: NG202–NG206.`,
    },
    {
      id: 'mission-stecker', type: 'callout', tone: 'mission', title: 'Funkpraxis: Kabelkiste und Adapter',
      md: `Im Shack landet bald eine Kiste mit Adaptern. Ein typisches Bild: Der KW-Transceiver hat eine PL-Buchse, das Handfunkgerät eine SMA-Buchse, das Oszilloskop BNC, die 70-cm-Antenne am Mast N. Weil jeder Adapter eine zusätzliche Übergangsstelle ist, sollte das Kabel möglichst direkt den passenden Steckverbinder tragen. Und vor jedem Anschluss gilt: erst Typ prüfen, dann schrauben.`,
    },
    {
      id: 'match-einsatz', type: 'match', title: 'Welchen Steckverbinder nimmst du?',
      prompt: 'Ordne den Einsatzfall dem passenden Steckverbinder zu.',
      pairs: [
        ['KW-Transceiver bis zur 2-m-Antenne, Schraubverbindung', 'PL'],
        ['Antenne im GHz-Bereich oder höhere Leistung, mit Federkontakten', 'N'],
        ['Messgerät oder kleine Leistung bis 70 cm, schnell steckbar', 'BNC'],
        ['sehr klein, sehr hohe Frequenzen, Mittelstift evtl. „reverse“', 'SMA'],
      ],
    },
    {
      id: 'q-stecker-pl', type: 'quiz', title: 'Der „UHF“-Stecker',
      question: 'Du suchst einen Steckverbinder für eine 70-cm-Antenne mit mehr als 50 W und siehst „UHF-Stecker“ im Katalog. Was ist richtig?',
      options: [
        { text: 'Der Name täuscht: „UHF“ ist die PL-Schraubverbindung für Kurzwelle bis 2 m. Für 70 cm und Leistung passt ein N-Steckverbinder.', correct: true, why: 'PL ist bis zum 2-m-Band üblich; für höhere Frequenzen und hohe Leistung nimmt man N.' },
        { text: 'Er passt perfekt, weil UHF für 70 cm steht.', why: 'Gerade das ist die Verwechslung: Der PL wird zwar UHF-Steckverbinder genannt, ist für UHF aber ungeeignet.' },
        { text: 'BNC, weil er Bajonettverschluss hat und für hohe Leistung gedacht ist.', why: 'BNC ist für kleine Leistungen gedacht.' },
        { text: 'Jeder Steckverbinder ist gleich gut geeignet, wenn er nur festgeschraubt ist.', why: 'Frequenzbereich, Leistung und Wellenwiderstand entscheiden über die Wahl.' },
      ],
    },
    {
      id: 'q-reverse-sma', type: 'quiz', title: 'Reverse-SMA',
      question: 'Was ist beim Reverse-SMA-Steckverbinder anders als beim normalen SMA?',
      options: [
        { text: 'Der Mittelkontakt ist vertauscht: Der Reverse-Stecker hat eine Öffnung, die Kupplung den Stift.', correct: true, why: 'Deshalb passen SMA und Reverse-SMA nicht zusammen; die Bezeichnung „Stecker“ trifft hier auf eine Kupplung.' },
        { text: 'Er hat einen Bajonettverschluss statt der Schraubmutter.', why: 'Der Bajonettverschluss gehört zum BNC.' },
        { text: 'Er ist für niedrigere Frequenzen gedacht und deshalb größer.', why: 'Reverse ändert nur den Mittelkontakt, nicht den Frequenzbereich.' },
        { text: 'Er hat einen Wellenwiderstand von 75 Ω statt 50 Ω.', why: 'Der Wellenwiderstand ist unverändert; verändert ist nur die Anordnung von Stift und Öffnung.' },
      ],
    },
    {
      id: 'demo-stecker', type: 'viz', viz: 'steckverbinder', title: 'Steckverbinder-Trainer',
      intro: 'Sieh dir die Steckbriefe an und übe dann das Erkennen am Bild und das Zuordnen nach Einsatz.',
      task: 'Alle vier Steckbriefe ansehen, vier Bilder in Folge erkennen und drei Einsätze zuordnen.',
    },
    {
      id: 'q-zo', type: 'quiz', title: 'Wellenwiderstand',
      question: 'Du kürzt ein 20 m langes 50-Ω-Koaxkabel auf 5 m. Was passiert mit dem Wellenwiderstand?',
      options: [
        { text: 'Er bleibt 50 Ω, denn er hängt nur vom Aufbau des Kabels ab, nicht von der Länge.', correct: true, why: 'Länge und Abschluss ändern den Wellenwiderstand nicht.' },
        { text: 'Er sinkt auf ein Viertel, also 12,5 Ω.', why: 'Das wäre eine Verwechslung mit der Dämpfung, die mit der Länge sinkt.' },
        { text: 'Er hängt vom angeschlossenen Gerät ab und lässt sich nur mit einem Ohmmeter bestimmen.', why: 'Weder noch: Er ist durch die Geometrie festgelegt und nicht mit dem Ohmmeter zu messen.' },
        { text: 'Er steigt, weil das Kabel nun weniger Verluste hat.', why: 'Wellenwiderstand und Dämpfung sind verschiedene Größen.' },
      ],
    },
    {
      id: 'q-daempfung', type: 'quiz', title: 'Länge und Frequenz',
      question: 'Welche Aussage zu Kabelverlusten bei VHF/UHF ist richtig?',
      options: [
        { text: 'Die Verluste steigen mit zunehmender Länge und zunehmender Frequenz.', correct: true, why: 'Das ist der Grund für kurze, dicke Kabel auf den hohen Bändern.' },
        { text: 'Die Dämpfung sinkt mit zunehmender Länge und Frequenz.', why: 'Genau umgekehrt.' },
        { text: 'Die Kabellänge hat keinen Einfluss auf die Dämpfung.', why: 'Die Dämpfung ist proportional zur Länge.' },
        { text: 'Die Frequenz hat keinen Einfluss auf die Dämpfung.', why: 'Die Dämpfung nimmt mit der Frequenz zu.' },
      ],
    },
    {
      id: 'num-db', type: 'numeric', title: 'Dämpfung aus der Leistung',
      question: 'Am Ende einer Antennenleitung kommen von 100 W Sendeleistung noch **25 W** an (angepasst, SWR 1). Wie groß ist die Kabeldämpfung?',
      answer: 6, tolerance: 0.1, unit: 'dB',
      hint: 'Ein Viertel der Leistung ist der Faktor 4.',
      explain: 'Faktor 4 entspricht 6 dB (zweimal 3 dB: erst auf die Hälfte, dann nochmal auf die Hälfte).',
    },
    {
      id: 'num-laenge', type: 'numeric', title: 'Dämpfung eines 30-m-Kabels',
      question: 'Ein Koaxkabel hat bei 435 MHz eine Dämpfung von 12 dB je 100 m. Wie groß ist die Dämpfung von 30 m?',
      answer: 3.6, tolerance: 0.05, unit: 'dB',
      explain: '$a = 12\\,\\text{dB}\\cdot\\tfrac{30}{100} = 3{,}6$ dB.',
    },
    {
      id: 'num-kette', type: 'numeric', title: 'Mehrere Verluste addieren',
      question: 'Zwischen Transceiver und Antenne liegen 1,5 dB Kabel, ein Steckverbinder-Paar mit 0,5 dB und nochmal 2 dB Kabel. Wie groß ist die Summe aller Verluste?',
      answer: 4, tolerance: 0.05, unit: 'dB',
      explain: 'Dämpfungen in dB addieren sich: $1{,}5 + 0{,}5 + 2 = 4$ dB.',
    },
    {
      id: 'match-stecker', type: 'match', title: 'Steckverbinder und Merkmal',
      prompt: 'Ordne zu.',
      pairs: [
        ['PL', 'bis etwa 2 m, trotz „UHF“-Name nicht für UHF'],
        ['N', 'GHz-tauglich, höchste Spannungsfestigkeit'],
        ['BNC', 'Bajonettverschluss, kleine Leistung'],
        ['SMA', 'sehr klein, für sehr hohe Frequenzen'],
      ],
    },
    {
      id: 'recall-kabel', type: 'recall', title: 'In eigenen Worten',
      prompt: 'Du willst im 70-cm-Band mit 50 W senden. Zwei Kabel stehen zur Wahl: dünnes Kabel mit 20 dB/100 m und dickes Schaumkabel mit 7 dB/100 m, beide 30 m lang. Wie viel Leistung kommt an der Antenne an? Und welchen Steckverbinder nimmst du?',
      answer: 'Dünn: 0,3 · 20 = 6 dB, also Faktor 4: nur 12,5 W an der Antenne. Dick: 0,3 · 7 = 2,1 dB, Faktor etwa 1,6, also etwa 31 W. Das dicke Schaumkabel ist klar besser. Als Steckverbinder passt N (GHz-tauglich, hohe Leistung, 50 Ω), im Schaltschrank oder am Funkgerät auch BNC oder SMA bei kleiner Leistung; der PL ist für 70 cm nicht geeignet.',
      cards: ['lk-db', 'lk-stecker'],
    },
    {
      id: 'wrap', type: 'callout', tone: 'fact', title: 'Zum Mitnehmen',
      md: `50 Ω ist der Standard; Länge und Beschaltung ändern den Wellenwiderstand nicht, aber Unterschiede machen Reflexionen. Kabeldämpfung addiert sich in dB, wächst mit Länge und Frequenz, und 3 dB bedeuten die halbe Leistung.[^bnetza-fragenkatalog]`,
    },
  ],
  cards: [
    { id: 'lk-zo', front: 'Typische Wellenwiderstände von Koaxkabeln?', back: '50, 60 und 75 Ω. Amateurfunk: fast immer 50 Ω.' },
    { id: 'lk-zo-unab', front: 'Wovon hängt der Wellenwiderstand ab?', back: 'Nur vom Aufbau (Geometrie, Dielektrikum), nicht von Länge oder Abschluss; im HF-Bereich etwa konstant.' },
    { id: 'lk-unsym', front: 'Wann ist eine Speiseleitung unsymmetrisch?', back: 'Wenn die beiden Leiter unterschiedlich geformt sind, z. B. beim Koaxkabel.' },
    { id: 'lk-paralleldraht', front: 'Vorteile der Paralleldraht-Speiseleitung gegenüber Koax', back: 'Geringere Dämpfung und höhere Spannungsfestigkeit.' },
    { id: 'lk-koax', front: 'Warum Koax in der Funkstelle?', back: 'Hochwertige Koaxkabel vermeiden unerwünschte Abstrahlungen; Netz- und HF-Kabel nicht gemeinsam in einem Kanal verlegen (Einkopplung).' },
    { id: 'lk-db', front: '3 dB, 6 dB, 10 dB', back: 'Leistungsfaktor 2, 4, 10: am Ende bleibt die Hälfte, ein Viertel, ein Zehntel. Dämpfungen in dB addieren sich.' },
    { id: 'lk-laenge', front: 'Kabeldämpfung und Länge/Frequenz', back: 'Proportional zur Länge (dB je 100 m mal ℓ/100 m) und steigt mit der Frequenz.' },
    { id: 'lk-diagramm', front: 'Kabeldämpfungsdiagramm ablesen', back: 'Frequenz suchen, bis zur Kurve des Kabels, Wert in dB je 100 m ablesen, mit ℓ/100 m multiplizieren.' },
    { id: 'lk-stecker', front: 'Steckverbinder oberhalb 300 MHz', back: 'N und SMA. N: höchste Spannungsfestigkeit, 50 Ω bis GHz.' },
    { id: 'lk-pl', front: 'PL-Steckverbinder', back: 'Schraubverbindung; KW bis etwa 2 m; auch „UHF-Stecker“ genannt, aber nicht für UHF geeignet; nie in N-Buchse.' },
    { id: 'lk-bnc', front: 'BNC-Steckverbinder', back: 'Bajonettverschluss; kleine Leistung bis etwa 70 cm; Handfunke, Messgeräte.' },
    { id: 'lk-sma', front: 'SMA-Steckverbinder', back: 'Sehr klein, für sehr hohe Frequenzen; Reverse-SMA hat vertauschten Mittelkontakt.' },
    { id: 'lk-stecker-namen', front: 'Stecker, Kupplung, Buchse, Einbaustecker?', back: 'Stecker = Stift außen. Kupplung = Öffnung. Eingebaute Kupplung = Buchse, eingebauter Stecker = Einbaustecker.' },
    { id: 'lk-pl-n', front: 'PL-Stecker in eine N-Buchse?', back: 'Nie: Die Buchse kann zerstört werden. PL und N nicht verwechseln.' },
    { id: 'lk-reverse-sma', front: 'Reverse-SMA?', back: 'Mittelkontakt vertauscht: Der Reverse-Stecker hat eine Öffnung, die Kupplung den Stift; mit normalem SMA nicht kompatibel.' },
    { id: 'lk-montage', front: 'Wie wird ein Steckverbinder am Koaxkabel befestigt?', back: 'Innenleiter an Mittelkontakt, Schirm an Gehäuse; gut leitend gelötet oder gecrimpt. Gleicher Wellenwiderstand, passend zum Kabeldurchmesser.' },
  ],
};
