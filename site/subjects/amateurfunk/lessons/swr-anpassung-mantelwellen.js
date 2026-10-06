// Abbildungen: Zeichnungen aus dem amtlichen Prüfungsfragenkatalog (Bundesnetzagentur, Datenlizenz Deutschland – Namensnennung 2.0).
const F = id => `assets/data/afu/figures/${id}.svg`;
const grid = (items, min = 150, maxH = 190) => `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(${min}px,1fr));gap:12px;align-items:end">${items.map(([id, cap]) => `<figure style="margin:0;text-align:center"><img src="${F(id)}" alt="${cap}" loading="lazy" style="width:100%;max-height:${maxH}px;object-fit:contain;background:#fff;border:1px solid var(--line);border-radius:10px;padding:6px"><figcaption style="font-size:.82rem;color:var(--muted);margin-top:4px">${cap}</figcaption></figure>`).join('')}</div>`;

export default {
  id: 'swr-anpassung-mantelwellen',
  title: 'SWR, Anpassung, Mantelwellen und Messgeräte',
  summary: 'Reflexion und Stehwellenverhältnis, SWR-Tabelle und Rechnung, Einbau und Aussage des SWR-Meters, Balun und Mantelwellensperre, VNA kalibrieren und Kurven lesen.',
  minutes: 25,
  goals: [
    'Erklären, wie Fehlanpassung zu Reflexion und [[swr]] führt, und aus dem SWR den reflektierten und den abgegebenen Leistungsanteil bestimmen (SWR 3: 25 % zurück, 75 % abgegeben)',
    'Das [[swr-meter]] richtig einschleifen (zwischen Transceiver und Antenne bzw. direkt an der Antenne) und seine Anzeige deuten; wissen, warum Kabeldämpfung das SWR verbessert',
    '[[mantelwellen]] erklären (Mantelstrom I₃), ihre Folgen nennen und Abhilfe mit [[balun]] oder [[mantelwellensperre]] zuordnen',
    'Den [[vna]] einsetzen: Resonanzfrequenz und Impedanz messen, kalibrieren (Leerlauf, Kurzschluss, Abschluss) und die Funktion prüfen',
  ],
  needs: ['amateurfunk/leitungen-und-steckverbinder', 'elektrotechnik/reflexion-swr'],
  blocks: [
    {
      id: 'intro', type: 'text', title: 'Anpassung: Alles kommt an',
      md: `
Eine Antenne hat einen Fußpunktwiderstand, eine Leitung einen Wellenwiderstand (meist 50 Ω). Sind beide gleich, geht die gesamte Sendeleistung in die Antenne: Man spricht von **Anpassung** (vgl. [Impedanzanpassung](wiki:Impedanzanpassung|Impedance matching)). Stimmen sie nicht überein, passiert dasselbe wie an der Stoßstelle zweier Leitungen: Ein Teil der Welle wird **reflektiert** und läuft zum Sender zurück. Diese Leistung wird nicht abgestrahlt, erwärmt im schlimmsten Fall die Endstufe, und moderne Transceiver senken deshalb bei schlechter Anpassung selbsttätig die Leistung.

Weil hinlaufende und rücklaufende Welle auf der Leitung zusammenwirken, entsteht eine [**stehende Welle**](wiki:Stehende Welle|Standing wave); wie stark die Reflexion ist, beschreibt der [Reflexionsfaktor](wiki:Reflexionsfaktor|Reflection coefficient). Das **Stehwellenverhältnis (SWR**, englisch standing wave ratio, VSWR) misst, wie ausgeprägt diese stehende Welle ist. Es ist damit ein Maß für die Güte der Anpassung.[^darc-50ohm]
`,
    },
    {
      id: 'erklaervideo-swr', type: 'video', src: 'assets/video/swr-reflexion.mp4', poster: 'assets/video/swr-reflexion.jpg', label: 'Erklärvideo: Reflexion, Stehwellen und SWR', channel: 'Learning (animiert)', minutes: 4.5,
      why: 'Schritt für Schritt: Wellenwiderstand, Reflexion am Leitungsende, Reflexionsfaktor Γ, stehende Welle, SWR, zurücklaufende Leistung und warum ein Kabel das SWR „verschönert“. Untertitel sind eingebrannt.',
    },
    {
      id: 'swr', type: 'text', title: 'SWR: Werte, Tabelle, Rechnung',
      md: `
Das [[swr|SWR]] ([Stehwellenverhältnis](wiki:Stehwellenverhältnis|Standing wave ratio)) kennt zwei Randwerte und viele Zwischenwerte:

- **SWR = 1:** perfekte Anpassung, alles wird aufgenommen, nichts reflektiert. Der bestmögliche Wert. Ein SWR von 0 oder kleiner als 1 gibt es nicht, und „SWR = 1“ heißt auch nicht „100 % Rücklauf“.
- **SWR → ∞:** Leerlauf (keine Antenne angeschlossen, Kabel unterbrochen) oder Kurzschluss: Die Leistung wird fast vollständig reflektiert.
- Dazwischen gilt die Formel der Formelsammlung[^bnetza-formelsammlung] mit der vorlaufenden Leistung $P_\\mathrm{V}$ und der rücklaufenden Leistung $P_\\mathrm{R}$:

$$s = \\frac{\\sqrt{P_\\mathrm{V}}+\\sqrt{P_\\mathrm{R}}}{\\sqrt{P_\\mathrm{V}}-\\sqrt{P_\\mathrm{R}}}\\qquad\\Longleftrightarrow\\qquad \\frac{P_\\mathrm{R}}{P_\\mathrm{V}}=\\left(\\frac{s-1}{s+1}\\right)^2$$

Beispiel: $P_\\mathrm{V}=100$ W, $P_\\mathrm{R}=25$ W gibt $s=\\dfrac{10+5}{10-5}=3$. Mit anderen Worten: **SWR 3 bedeutet, dass 25 % der vorlaufenden Leistung reflektiert und 75 % abgegeben werden**; bei 100 W Vorlauf sind das 25 W rücklaufend. Weitere Werte aus der Tabelle:

| SWR | reflektierte Leistung |
|---|---|
| 1 | 0 % |
| 1,5 | 4 % |
| 2 | 11,1 % |
| 2,5 | 18,4 % |
| **3** | **25 %** |
| 4 | 36 % |
| 6 | 51 % |
| 10 | 66,9 % |
| ∞ | 100 % |

Zum Merken genügt für die Prüfung: **SWR 3 ↔ 25 %**, also reflektiert ein Viertel und die übrigen drei Viertel gehen in die Antenne (nicht 50 %, nicht 33 %, nicht 75 % als Reflexion). Moderne Transceiver reduzieren bei schlechtem SWR selbsttätig die Sendeleistung, um die Endstufe zu schützen.
`,
    },
    {
      id: 'demo-swr', type: 'viz', viz: 'leitung-reflexion', title: 'Leitung, Abschluss und stehende Welle',
      params: { R: 100 },
      intro: 'Wähle den Abschluss der Leitung: Widerstand, Kurzschluss oder Leerlauf. Du siehst hin- (blau) und rücklaufende Welle (orange) und die stehende Welle (dick). Daneben lesen sich Reflexionsfaktor, SWR und die Leistungsanteile ab. Mit **Kabeldämpfung** siehst du, wie sich das SWR am Sender verändert.',
      task: 'Stelle Anpassung (SWR 1), SWR 3, Leerlauf oder Kurzschluss und die Wirkung der Kabeldämpfung ein.',
    },
    {
      id: 'warn-swr', type: 'callout', tone: 'warning', title: 'Verwechslungen: SWR 0, Rücklauf, zu viel Leistung',
      md: `Ein ideal angepasstes System zeigt **SWR 1**, nicht 0, nicht ∞ und nicht „100 % Rücklauf“. Fehlanpassung oder beschädigte Leitungen führen zu **Reflexionen und erhöhtem SWR**, nicht zu SWR ≤ 1 und nicht zu „Überbeanspruchung der Antenne“. Und das SWR-Meter zeigt nicht, ob die Sendeleistung zu hoch oder zu gering ist, sondern die Anpassung: Prüfungsbezug NG301 bis NG303, NI203.`,
    },
    {
      id: 'meter', type: 'text', title: 'Das SWR-Meter: Anschluss und Aussagekraft',
      md: `
Ein **[[swr-meter|SWR-Meter]]** (Stehwellenmessgerät, auch SWR-Messbrücke) misst im Sendebetrieb gleichzeitig die vorlaufende und die rücklaufende Leistung und zeigt das SWR an. Es dient der **Kontrolle der Antennenanpassung**. Dazu wird es **zwischen Transceiver und Antenne eingeschleift**: Auf der einen Seite hängt der Transceiver, auf der anderen die Antennenleitung. Viele Transceiver haben es schon eingebaut und zeigen im Display eine **SWR-Skala**; verwechsle sie nicht mit dem **S-Meter**, das beim Empfang die Signalstärke anzeigt.

${grid([['NF101_q', 'Transceiver-Display im Sendebetrieb: Anzeige 1 ist das SWR-Meter'], ['NG302_q', 'SWR-Meter: Zeiger weit rechts bedeutet schlechte Anpassung'], ['EI405_q', 'Wo einschleifen? Punkt 1 direkt hinter dem Sender prüft die ganze Anlage']], 190, 200)}

**Wo** du es einschleifst, entscheidet, was du misst, denn das Kabel hat Verluste:

- Willst du die **Antenne** beurteilen, schleifst du es **direkt vor der Antenne** ein, also zwischen Antennenkabel und Antenne.
- Willst du wissen, wie gut der **Sender zur gesamten Anlage** (mit Kabel, Filter, Antennentuner) passt, schleifst du es **unmittelbar hinter dem Sender** ein.

Messprinzip: nicht durch Strom- oder Spannungsmessung am Anfang und Ende der Leitung und nicht mit einem Multimeter, sondern mit einer **SWR-Messbrücke** (Richtkoppler), die vor- und rücklaufende Welle trennt.

**Kabeldämpfung verfälscht zu Gunsten der Antenne:** Misst du am Sender mit langem Kabel, ist das angezeigte SWR besser als an der Antenne, weil die Dämpfung das hinlaufende **und** das reflektierte Signal verringert (zweimal durch das Kabel). Verlängerst du ein 50-Ω-Kabel durch ein gleichwertiges und das SWR wird besser, **steigt die Dämpfung und das reflektierte Signal sinkt**, aber die Antenne ist deshalb nicht besser angepasst; es geht nur Leistung im Kabel verloren.
`,
    },
    {
      id: 'tuner', type: 'callout', tone: 'insight', title: 'Anpassgerät (Antennentuner)',
      md: `Ein **Anpassgerät** (Antennentuner, vgl. [Antennentuner](wiki:Antennentuner|Antenna tuner)) transformiert die Impedanz am Senderausgang so, dass der Sender ein SWR nahe 1 sieht, auch wenn die Antenne selbst fehlangepasst ist. Es verbessert die Anzeige am Sender, nicht die Strahlung der Antenne. Direkt hinter dem Sender gemessen, zeigt das SWR-Meter, wie gut der Sender auf die gesamte Antennenanlage (Filter, Kabel, Tuner, Antenne) angepasst ist.`,
    },
    {
      id: 'mantel', type: 'text', title: 'Mantelwellen: Wenn das Koaxkabel mitstrahlt',
      md: `
Ein Koaxkabel schirmt im Idealfall das Signal ab: Auf der **Außenseite des Innenleiters** und auf der **Innenseite des Außenleiters** fließen gleiche, entgegengesetzte Ströme $I_1$ und $I_2$, die sich außen aufheben. Schließt du aber eine **symmetrische Antenne** wie den Halbwellendipol direkt an das unsymmetrische [Koaxkabel](wiki:Koaxialkabel|Coaxial cable) an, kann ein Teil des Stromes **auf der Außenseite des Schirms** zurückfließen: der **Mantelstrom $I_3$** (das Kabel wirkt wie ein Dreileitersystem: Innenleiter außen, Schirm innen, Schirm außen; wegen des [Skin-Effekts](wiki:Skin-Effekt|Skin effect) fließen die Ströme an der Oberfläche).

${grid([['EG404_q', 'Ströme an der Einspeisung: I₃ ist der Mantelstrom auf der Schirm-Außenseite']], 260, 220)}

Der Mantelstrom heißt auch **Mantelwelle** und hat unerwünschte Folgen:

- Das Kabel wird selbst zum Strahler: **Störungen bei Geräten im Haus** (und beim Empfang können Störungen eingefangen werden, der eigene **Empfang leidet**).
- Der zusätzliche Strom „fehlt“ auf einem Dipolarm: Die **Richtcharakteristik wird verformt**.

Mantelwellen sind also nicht notwendig für die Funktion, werden nicht durch Fehlanpassung oder eine überlastete Endstufe verursacht und werden nicht zur SWR-Messung verwendet. Eine Polarisationsdrehung ist keine Folge.

**Abhilfe:**

- Ein **Symmetrierglied (Balun**, von „balanced–unbalanced“, vgl. [Balun](wiki:Balun|Balun)) am Antennenanschluss: Es verbindet das unsymmetrische Koaxkabel mit der symmetrischen Antenne, zum Beispiel einem Dipol.
- Eine **[[mantelwellensperre|Mantelwellensperre]]**: einige Windungen des Koaxkabels auf einem **Ferritkern**. Für die Gegentakt-Signale im Kabel wirkt der Kern kaum, für Mantelwellen aber wie eine Spule hoher Impedanz (stromkompensierte Drossel). So lassen sich Mantelwellen dämpfen; Oberwellen werden damit nicht unterdrückt, die Trennschärfe nicht verbessert.

${grid([['EG408_q', 'Koaxkabel auf Ferritkern gewickelt: Mantelwellensperre']], 260, 200)}
`,
    },
    {
      id: 'demo-mantel', type: 'viz', viz: 'mantelwellen', title: 'Mantelwellen: ohne und mit Sperre',
      intro: 'Schalte zwischen **ohne Symmetrierung**, **Balun** und **Mantelwellensperre** um und beobachte den Mantelstrom $I_3$ auf der Schirm-Außenseite.',
      task: 'Sieh dir alle drei Anschlussarten an und tippe den Mantelstrom I₃ in der Zeichnung an.',
    },
    {
      id: 'vna', type: 'text', title: 'Der VNA: Impedanzen und Resonanzen direkt messen',
      md: `
Mit einem Multimeter lässt sich keine **frequenzabhängige** Impedanz messen. Dafür gibt es den **vektoriellen Netzwerkanalysator (VNA)**, ein aktives Messgerät, das einen Frequenzbereich durchfährt und bei jeder Frequenz **Betrag und Phase** von Spannung und Strom auswertet ([Netzwerkanalysator](wiki:Netzwerkanalysator|Network analyzer (electrical))). Damit bestimmst du **Resonanzfrequenzen und Impedanzen von Schwingkreisen, Filtern und Antennen** genauer als mit einem Dip-Meter oder Frequenzzähler, **Impedanzen, Blindwiderstände und das SWR** direkt. Es ist kein Oszilloskop (zeitlicher Verlauf), kein Frequenzzähler, kein Leistungsmesser und kein Erdungsmessgerät.

Eine Antenne ist in Resonanz, wo das SWR über der Frequenz sein **Minimum** hat und der Blindanteil $jX$ verschwindet. Die Resonanzfrequenz eines Schwingkreises kann man aus $L$ und $C$ berechnen oder mit dem VNA messen.

**Kalibrierung und Funktionstest:** Vor dem Einsatz muss ein VNA zusammen mit dem Messaufbau **kalibriert** werden (kein „Nullpunktabgleich“, keine Triggerschwelle). Man misst dazu die drei Zustände **Leerlauf** (offen), **Kurzschluss** und **Anpassung** (50-Ω-Abschlusswiderstand). Zur Funktionskontrolle gilt: bei Abschluss **SWR nahe 1**, bei Leerlauf und Kurzschluss **SWR nahezu unendlich**.
`,
    },
    {
      id: 'demo-vna', type: 'viz', viz: 'vna-kurve', title: 'VNA-Kurve lesen und abstimmen',
      params: { target: 7.1 },
      intro: 'Ein Dipol soll für 7,1 MHz gebaut werden. Das Diagramm zeigt das SWR über der Frequenz, wie ein VNA es aufzeichnet. Schiebe den **Cursor** auf die Resonanz und stimme die **Drahtlänge** ab.',
      task: 'Finde mit dem Cursor die Resonanz, dann kürze den Draht, bis sie bei 7,1 MHz liegt.',
    },
    {
      id: 'mission-swr', type: 'callout', tone: 'mission', title: 'Funkpraxis: Erstes Antennenprojekt',
      md: `Dein Dipol hängt, der Transceiver zeigt SWR 2,8. Prüfe zuerst am Antennenanschluss (SWR-Meter oder VNA direkt vor der Antenne), wo die Resonanz liegt. Liegt sie zu tief, kürzt du beide Enden. Zeigt der VNA „SWR nahe 1“ nur bei 50-Ω-Abschluss und „unendlich“ bei offenem Ende, ist er in Ordnung. Fließt Strom auf dem Kabelschirm (Brummen im Haus, wechselnde SWR-Werte beim Anfassen des Kabels), setzt du eine Mantelwellensperre aus Ferritringen hinter den Antennenanschluss.`,
    },
    {
      id: 'q-swr', type: 'quiz', title: 'Rücklaufende Leistung',
      question: 'Bei 100 W Vorlauf zeigt das SWR-Meter ein SWR von 3. Was kommt zurück, was geht in die Antenne?',
      options: [
        { text: 'Etwa 25 W kommen zurück, etwa 75 W werden abgegeben.', correct: true, why: 'SWR 3 entspricht 25 % Reflexion.' },
        { text: 'Etwa 75 W kommen zurück, etwa 25 W werden abgegeben.', why: 'Das wäre der umgekehrte Anteil.' },
        { text: 'Die Hälfte, also 50 W, kommt zurück.', why: '50 % Reflexion gäbe ein SWR von etwa 5,8.' },
        { text: 'Ein Drittel, also 33 W, kommt zurück.', why: 'Das SWR ist nicht das Verhältnis der Leistungen; erst über die Formel ergeben sich 25 %.' },
      ],
    },
    {
      id: 'q-meter', type: 'quiz', title: 'Wo steckt das SWR-Meter?',
      question: 'Du willst herausfinden, wie gut die **Antenne selbst** angepasst ist (nicht die Kabeldämpfung des 30 m langen Koaxkabels). Wo schleifst du das SWR-Meter ein?',
      options: [
        { text: 'Zwischen Antennenkabel und Antenne.', correct: true, why: 'Dort hat die Kabeldämpfung keinen Einfluss auf die Anzeige.' },
        { text: 'Unmittelbar hinter dem Senderausgang.', why: 'Dort misst du die Anlage inklusive Kabeldämpfung; das SWR wirkt besser, als es an der Antenne ist.' },
        { text: 'Zwischen Netzteil und Transceiver.', why: 'Das SWR-Meter gehört in die HF-Leitung, nicht in die Stromversorgung.' },
        { text: 'Parallel zur Antenne, anstelle des Kabels.', why: 'Es muss in der Leitung (eingeschleift) liegen, damit vor- und rücklaufende Welle getrennt werden.' },
      ],
    },
    {
      id: 'q-cable', type: 'quiz', title: 'Kabel verlängert, SWR besser?',
      question: 'Du verlängerst das 50-Ω-Antennenkabel deiner 2-m-Station mit gleichwertigem Kabel, und das gemessene SWR wird besser. Was schließt du daraus?',
      options: [
        { text: 'Die Dämpfung ist gestiegen und das reflektierte Signal geringer geworden; die Antenne ist nicht besser angepasst.', correct: true, why: 'Das reflektierte Signal läuft zweimal durch das zusätzliche Kabel und wird gedämpft.' },
        { text: 'Die Antenne wurde besser angepasst, weil das Kabel jetzt länger ist.', why: 'Die Anpassung der Antenne bleibt gleich; nur die Anzeige am Sender ändert sich.' },
        { text: 'Die Dämpfung ist gesunken und das reflektierte Signal gestiegen.', why: 'Mehr Kabel bedeutet mehr, nicht weniger Dämpfung.' },
        { text: 'Das Kabel hat nun einen niedrigeren Wellenwiderstand.', why: 'Gleichwertiges Kabel hat denselben Wellenwiderstand.' },
      ],
    },
    {
      id: 'num-swr', type: 'numeric', title: 'SWR aus Leistungen',
      question: 'Das Messgerät zeigt 100 W vorlaufend und 4 W rücklaufend. Wie groß ist das SWR?',
      answer: 1.5, tolerance: 0.02,
      hint: 'Wurzeln ziehen: $\\sqrt{100}=10$, $\\sqrt{4}=2$.',
      explain: '$s=\\dfrac{10+2}{10-2}=\\dfrac{12}{8}=1{,}5$. Das entspricht 4 % Reflexion.',
    },
    {
      id: 'num-refl', type: 'numeric', title: 'Abgegebene Leistung',
      question: 'Wie viele Watt nimmt die Antenne bei 80 W Vorlauf und SWR 3 auf? (Kabelverluste vernachlässigt.)',
      answer: 60, tolerance: 0.5, unit: 'W',
      explain: 'SWR 3: 25 % reflektiert, 75 % abgegeben: $0{,}75\\cdot 80 = 60$ W.',
    },
    {
      id: 'match-ursache', type: 'match', title: 'Mantelwellen und Gegenmittel',
      prompt: 'Ordne zu.',
      pairs: [
        ['Strom auf der Außenseite des Koaxschirms', 'Mantelstrom I₃ (Mantelwelle)'],
        ['Koaxkabel an symmetrische Antenne anschließen', 'Balun (Symmetrierglied)'],
        ['Koaxkabel auf Ferritkern gewickelt', 'Mantelwellensperre'],
        ['Folge von Mantelwellen', 'Störungen und verformte Richtcharakteristik'],
      ],
    },
    {
      id: 'order-vna', type: 'order', title: 'VNA-Messung vorbereiten',
      prompt: 'Bringe die Schritte vor einer VNA-Antennenmessung in die richtige Reihenfolge.',
      items: [
        'Messaufbau (Kabel, Adapter) am VNA anschließen',
        'Kalibrieren: Leerlauf, Kurzschluss, 50-Ω-Abschluss messen',
        'Funktion prüfen: Abschluss gibt SWR nahe 1',
        'Antenne anschließen und Frequenzbereich durchfahren',
        'Resonanz (SWR-Minimum) und Impedanz ablesen',
      ],
      explain: 'Kalibriert wird mit dem fertigen Messaufbau; erst danach wird die Antenne angeschlossen.',
    },
    {
      id: 'recall-mantel', type: 'recall', title: 'In eigenen Worten',
      prompt: 'Dein Dipol zeigt am Kabel ein gutes SWR, aber im Haus brummt der Lautsprecher, wenn du sendest. Was kann die Ursache sein, wie heißt das Phänomen, und was tust du dagegen?',
      answer: 'Auf dem Außenmantel des Koaxkabels fließt ein Mantelstrom (Mantelwelle, I₃), weil das unsymmetrische Koaxkabel direkt an die symmetrische Antenne angeschlossen ist. Das Kabel strahlt dann mit und koppelt in die Hauselektrik ein; auch der Empfang wird gestört und das Richtdiagramm verformt. Abhilfe: ein Balun (Symmetrierglied) am Antennenanschluss oder eine Mantelwellensperre aus einigen Windungen Koax auf einem Ferritkern.',
      cards: ['sw-mantel', 'sw-balun'],
    },
    {
      id: 'wrap', type: 'callout', tone: 'fact', title: 'Zum Mitnehmen',
      md: `SWR 1 ist perfekt, SWR 3 heißt 25 % zurück; das SWR-Meter gehört zwischen Transceiver und Antenne, und was du misst, hängt davon ab, wo du es einschleifst. Mantelwellen entstehen bei unsymmetrischer Speisung einer symmetrischen Antenne; Balun und Ferritsperre helfen. Der VNA liefert Resonanz und Impedanz, vorher kalibrieren.[^bnetza-fragenkatalog]`,
    },
  ],
  cards: [
    { id: 'sw-swr1', front: 'Beste Anpassung: SWR?', back: 'SWR = 1 (nichts wird reflektiert). Nicht 0, nicht ∞.' },
    { id: 'sw-inf', front: 'SWR bei Leerlauf oder Kurzschluss?', back: 'Nahezu unendlich (vollständige Reflexion).' },
    { id: 'sw-formel', front: 'SWR aus vor- und rücklaufender Leistung', back: '$s=\\dfrac{\\sqrt{P_V}+\\sqrt{P_R}}{\\sqrt{P_V}-\\sqrt{P_R}}$' },
    { id: 'sw-3', front: 'SWR 3: reflektierte und abgegebene Leistung', back: '25 % reflektiert, 75 % abgegeben (bei 100 W Vorlauf: 25 W rücklaufend).' },
    { id: 'sw-tabelle', front: 'SWR 1,5 / 2 / 6 / ∞ → reflektierter Anteil', back: '4 % / 11 % / 51 % / 100 %.' },
    { id: 'sw-meter', front: 'Wo wird das SWR-Meter eingeschleift?', back: 'Zwischen Transceiver und Antenne; für die Antenne direkt vor der Antenne, für die ganze Anlage direkt hinter dem Sender.' },
    { id: 'sw-kabel', front: 'Warum wird das SWR durch langes Kabel besser?', back: 'Dämpfung verringert hinlaufende und reflektierte Welle; die Anpassung der Antenne bleibt gleich.' },
    { id: 'sw-mantel', front: 'Mantelwellen: Folgen', back: 'Störungen anderer Geräte, Störungen des eigenen Empfangs, verformte Richtcharakteristik; verursacht durch Mantelstrom I₃ auf der Schirm-Außenseite.' },
    { id: 'sw-balun', front: 'Balun und Mantelwellensperre', back: 'Balun (Symmetrierglied): Koaxkabel an symmetrische Antenne (z. B. Dipol). Mantelwellensperre: Koax auf Ferritkern, dämpft Mantelwellen.' },
    { id: 'sw-vna', front: 'Wozu dient der VNA?', back: 'Messung von Impedanzen, Blindwiderständen, SWR und Resonanzfrequenzen von Antennen und Schwingkreisen.' },
    { id: 'sw-kal', front: 'VNA kalibrieren und prüfen', back: 'Kalibrieren mit Leerlauf, Kurzschluss und Anpassung (50 Ω). Test: SWR ≈ 1 bei Abschluss, ∞ bei offen/kurz.' },
    { id: 'sw-meter-typ', front: 'SWR-Meter oder S-Meter?', back: 'SWR-Meter: Anpassung im Sendebetrieb. S-Meter: Signalstärke im Empfang.' },
  ],
};
