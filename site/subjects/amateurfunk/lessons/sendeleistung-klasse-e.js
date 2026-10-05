const th = c => `<th style="text-align:left;padding:5px 8px;border-bottom:2px solid var(--line)">${c}</th>`;
const td = c => `<td style="padding:4px 8px;border-bottom:1px solid var(--line);vertical-align:top">${c}</td>`;
const LIM = `<div style="overflow-x:auto"><table style="border-collapse:collapse;width:100%;font-size:.88rem"><thead><tr>${['Band', 'Klasse E', 'Klasse A', 'Klasse N'].map(th).join('')}</tr></thead><tbody>${[
  ['160 m (1810–1850 kHz)', '<b>100 W PEP</b>', '750 W PEP', '–'],
  ['160 m (1850–1890 / 1890–2000 kHz)', '75 W / 10 W PEP (am Wochenende 100 W)', '75 W / 10 W PEP (am Wochenende 750 W)', '–'],
  ['80 m (3,5–3,8 MHz)', '<b>100 W PEP</b>', '750 W PEP', '–'],
  ['40 m, 20 m, 17 m, 12 m', '–', '750 W PEP', '–'],
  ['30 m (10,1–10,15 MHz)', '–', '150 W PEP', '–'],
  ['15 m (21–21,45 MHz)', '<b>100 W PEP</b>', '750 W PEP', '–'],
  ['10 m (28–29,7 MHz)', '<b>100 W PEP</b>', '750 W PEP', '10 W ERP'],
  ['2 m (144–146 MHz)', '<b>75 W PEP</b>', '750 W PEP', '10 W EIRP (6,1 W ERP)'],
  ['70 cm (430–440 MHz)', '<b>75 W PEP</b>', '750 W PEP', '10 W EIRP (6,1 W ERP)'],
  ['23 cm (1240–1300 MHz)', '<b>75 W PEP</b> (1247–1263 MHz: nur 3,05 W ERP)', '750 W PEP (ebenso 3,05 W ERP)', '–'],
  ['ab 13 cm (2320 MHz … 250 GHz)', '<b>5 W PEP</b>', '75 W PEP', '–'],
].map(r => `<tr>${r.map(td).join('')}</tr>`).join('')}</tbody></table></div>`;
const figSend = `<svg viewBox="0 0 560 190" role="img" aria-label="Schematisches Display im Sendebetrieb: 1 Frequenz, 2 Power-Meter, 3 SWR-Meter">
<style>.n{font:700 13px system-ui,sans-serif;fill:#fff}.s{font:11px ui-monospace,monospace;fill:#9fb2c8}</style>
<rect x="8" y="8" width="544" height="174" rx="14" fill="#1d2430" stroke="var(--line-2)"/>
<text x="26" y="46" font-family="ui-monospace,monospace" font-size="28" font-weight="700" fill="#9fe5ff">145.450.00</text><text x="200" y="46" font-family="ui-monospace,monospace" font-size="13" fill="#9fe5ff">MHz  FM  TX</text>
<rect x="300" y="24" width="236" height="34" rx="6" fill="#0f141b" stroke="#415066"/><text class="s" x="308" y="38">PO 0 10 20 30 50 100 W</text><rect x="308" y="44" width="110" height="8" fill="#ff8a7a"/>
<rect x="26" y="90" width="510" height="34" rx="6" fill="#0f141b" stroke="#415066"/><text class="s" x="34" y="104">SWR 1 1.5 2 3 ∞</text><rect x="34" y="110" width="60" height="8" fill="#7be08a"/>
<circle cx="26" cy="30" r="10" fill="var(--accent)"/><text class="n" x="22" y="35">1</text><circle cx="290" cy="40" r="10" fill="var(--accent)"/><text class="n" x="286" y="45">2</text><circle cx="16" cy="107" r="10" fill="var(--accent)"/><text class="n" x="12" y="112">3</text>
<text class="s" x="26" y="160">1 Frequenz · 2 Power-Meter (Senderausgangsleistung) · 3 SWR-Meter</text>
</svg>`;

export default {
  id: 'sendeleistung-klasse-e',
  title: 'Sendeleistung, PEP und Ausgangsleistung',
  summary: 'Höchstleistungen der Klasse E je Band (100 W PEP bis 21/28 MHz und KW-Bänder, 75 W PEP ab 144 MHz, 5 W PEP Mikrowelle), PEP vs. ERP, Leistungsmessung am Sender.',
  minutes: 20,
  goals: [
    '[[pep|PEP]], mittlere Leistung, Senderausgangsleistung, [[erp|ERP]] und EIRP unterscheiden und wissen, wo sie gemessen werden',
    'Die Leistungsgrenzen der Klasse E aus Anlage 1 ablesen (100 W, 75 W, 5 W PEP) und die der Klasse A erkennen',
    'Verstehen, warum für Klasse N die Strahlungsleistung zählt und wie der Antennengewinn eingeht',
    'Die Senderausgangsleistung messen: am Senderausgang, bei Ein- oder Zweitonaussteuerung',
  ],
  needs: ['frequenzzuteilung-und-baender', 'elektrotechnik/leistung-und-energie'],
  blocks: [
    {
      id: 'intro', type: 'text', title: 'Wie viel darfst du senden?',
      md: `
Mehr [Leistung](wiki:Leistung (Physik)|Power (physics)) bedeutet größere Reichweite — aber auch mehr Störungen für Nachbarn und andere Funkdienste. Deshalb legt die **Anlage 1 der AFuV** je Band und Klasse eine **Höchstleistung** fest. Dabei werden zwei Arten von Grenzen benutzt:[^afuv]

- **Senderausgangsleistung** in **W PEP**: Bei **Klasse A und E** gilt auf den allermeisten Bändern die Leistung, die der **Sender** abgibt. Der Antennengewinn spielt für diese Grenze **keine** Rolle.
- **Strahlungsleistung** in **W ERP** oder **EIRP**: Bei **Klasse N** zählt, was die **Antenne abstrahlt** — hier geht der Gewinn der Antenne ein. Nur für wenige Bereiche gilt die Strahlungsleistung auch bei Klasse A/E (zum Beispiel 3,05 W ERP in einem Teil des 23-cm-Bandes).

Die Einheit ist das [Watt](wiki:Watt (Einheit)|Watt). Wie viel Watt wann erlaubt sind, lernst du in dieser Lektion; wie die Strahlung auf Menschen wirkt (Personenschutz), kommt später.
`,
    },
    {
      id: 'text-pep', type: 'text', title: 'Was ist PEP?',
      md: `
Die **Spitzenleistung** [PEP](wiki:Peak Envelope Power|Peak envelope power) (*peak envelope power*, deutsch Hüllkurvenspitzenleistung) ist die Leistung, die der Sender unter normalen Betriebsbedingungen **während einer Periode der Hochfrequenzschwingung bei der höchsten Spitze der Modulationshüllkurve** im Mittel an einen **reellen Abschlusswiderstand** abgeben kann (§ 2 Nr. 7 AFuV).[^afuv] Anschaulich: Du schaust auf das Signal, suchst die **höchste Spitze der Hüllkurve** (die Linie, die die HF-Schwingung oben einhüllt), und berechnest die Leistung der HF-Schwingung an dieser Stelle.

Bei [**SSB**](wiki:Einseitenbandmodulation|Single-sideband modulation)-Sprache schwankt die Leistung ständig mit der Stimme; deshalb misst man mit definierten Testsignalen. Bei einem **unmodulierten Träger** (CW-Taste gedrückt) ist die Hüllkurve konstant, PEP und mittlere Leistung sind gleich. Beim **Zweitonsignal** (zwei Sinustöne gleicher Amplitude, siehe Demo) schwankt die Hüllkurve, und die **mittlere Leistung** ist halb so groß wie PEP.

Die **mittlere Leistung** ist dagegen die durchschnittliche Leistung, die ein Sender unter normalen Betriebsbedingungen an die Antennenspeiseleitung abgibt, gemittelt über ein Zeitintervall, das **lang gegenüber der Periode der tiefsten Modulationsfrequenz** ist — sie ist von der Hüllkurve unabhängig. Und die **Ausgangsleistung** eines Senders ist die Leistung **unmittelbar am Senderausgang, bevor sie Zusatzgeräte durchläuft** (Antennentuner, SWR-Meter, Kabel) — nicht die Differenz und nicht die Summe aus vor- und rücklaufender Leistung, und nicht mit einem Feldstärkemessgerät an der Antenne bestimmt.[^bnetza-fragenkatalog]
`,
    },
    {
      id: 'warn-pep', type: 'callout', tone: 'warning', title: 'Die Definitionen im Vergleich',
      md: `
In der Prüfung stehen die Begriffe nebeneinander — verwechsle sie nicht:

- **PEP** = Leistung an der **höchsten Spitze der Hüllkurve** (während einer HF-Periode).
- **Mittlere Leistung** = Durchschnitt über eine lange Zeit (lang gegenüber der tiefsten Modulationsperiode).
- **Ausgangsleistung** = unmittelbar **am Senderausgang**, vor Zusatzgeräten.
- **ERP** = Sendeleistung mal Gewinn **bezogen auf den Halbwellendipol** — das ist eine **Strahlungsleistung**, keine Senderleistung.
`,
    },
    {
      id: 'viz-pep', type: 'viz', viz: 'pep-huellkurve', title: 'PEP und mittlere Leistung',
      params: {},
      task: 'Stelle **PEP = 75 W** ein (û ≈ 86,6 V) und vergleiche **Träger** und **Zweiton**: Beim Zweitonsignal ist die mittlere Leistung nur halb so groß wie PEP.',
      caption: 'Rechnung am 50-Ω-Abschluss: $P_{\\text{PEP}} = \\hat u^2/(2R)$. Beispiel: $\\hat u = 100\\,\\text{V}$ → $100^2/(2\\cdot 50\\,\\Omega) = 100\\,\\text{W}$ PEP.',
    },
    {
      id: 'text-messen', type: 'text', title: 'Wie misst man die Ausgangsleistung eines SSB-Senders?',
      md: `
Die maximale Hüllkurvenleistung (PEP) wird **direkt am Senderausgang** gemessen — ohne Antennentuner, Kabel oder andere Zusatzgeräte dazwischen — und zwar bei **Ein- oder Zweitonaussteuerung**: ein einzelner Sinuston oder zwei gleich starke Töne mit konstanter Amplitude. Falsch sind: Messung zwischen Antennentuner und Antenne, Messung mit **unmoduliertem Träger** (bei SSB gibt es normalerweise keinen) oder mit **Sprache** — die Ausgangsleistung schwankt dabei stark, die Messung ist nicht reproduzierbar.[^darc-50ohm]

Viele Funkgeräte zeigen die aktuelle Senderausgangsleistung in einem **Power-Meter** an (beschriftet zum Beispiel „P“, „PO“ oder „PWR“) — im Sendebetrieb nicht zu verwechseln mit dem **SWR-Meter**, das das [Stehwellenverhältnis](wiki:Stehwellenverhältnis|Standing wave ratio) zeigt, oder mit Amplitudenspektrum und Wasserfall (nur im Empfang sinnvoll).
`,
    },
    {
      id: 'fig-send', type: 'figure', title: 'Display im Sendebetrieb', html: figSend,
      caption: 'Schematisch. Anzeige **2** ist das **Power-Meter**; Anzeige 3 das SWR-Meter.',
    },
    {
      id: 'text-grenzen', type: 'text', title: 'Die Höchstleistungen nach Anlage 1',
      md: `
Hier die Zahlen, die du kennen oder in Anlage 1 ablesen musst. **Fett** ist, was für die **Klasse E** gilt:

${LIM}

**Merkregeln für Klasse E:** Auf den **freigegebenen Kurzwellenbändern** (160, 80, 15 und 10 m) sind es **100 W PEP**, ab **144 MHz bis 1300 MHz** **75 W PEP** und darüber (**ab 13 cm bis in den Millimeterwellenbereich**) **5 W PEP**. Klasse A hat die zehnfache Leistung auf KW und VHF/UHF — 750 W PEP —, mit Ausnahmen: **150 W PEP auf 30 m**, **75 W PEP** ab 1300 MHz bis 250 GHz.[^afuv]

**Wie liest du Anlage 1?** Zeile über den Frequenzbereich suchen, in der Spalte der Klasse die maximale Leistung ablesen. **Findet sich keine Angabe, darf die Klasse den Bereich nicht nutzen.** Zahlen in der rechten Spalte verweisen auf **Zusatzbestimmungen** unter der Tabelle: Bestimmung 11 beschränkt das Teilband **1247–1263 MHz** auf **3,05 W ERP** (das sind rund 5 W EIRP) und verbietet dort fernbediente und automatisch arbeitende Stationen; Bestimmung 15 hebt die Leistung auf 160 m **am Wochenende** an.

**Falsche Antworten** erkennst du an typischen Verwechslungen: 10 W und 750 W für beide Klassen; 75 W statt 100 W im KW-Bereich (und umgekehrt); 5 W oder 100 W auf Mikrowelle.
`,
    },
    {
      id: 'match-grenzen', type: 'match', title: 'Band und Höchstleistung der Klasse E',
      prompt: 'Ordne zu: Welche Höchstleistung gilt für Klasse E?',
      pairs: [
        ['160-m-Band (1810–1850 kHz)', '100 W PEP'],
        ['80-m-Band', '100 W PEP'],
        ['10-m-Band', '100 W PEP'],
        ['2-m-Band', '75 W PEP'],
        ['70-cm-Band', '75 W PEP'],
        ['13-cm-Band und höher', '5 W PEP'],
      ],
    },
    {
      id: 'text-erp', type: 'text', title: 'Strahlungsleistung: ERP und EIRP',
      md: `
Die Antenne strahlt nicht in alle Richtungen gleich: Sie **bündelt** und hat dadurch in der Hauptrichtung einen [**Gewinn**](wiki:Antennengewinn|Gain (antenna)) (siehe die Antennen-Etappe). Zwei Strahlungsleistungen berücksichtigen das:

- **ERP** (*effective radiated power*): Das **Produkt** aus der der Antenne zugeführten Leistung und ihrem **Gewinn in einer Richtung, bezogen auf den Halbwellendipol** (§ 2 Nr. 8 AFuV).
- **EIRP** (*equivalent isotropic radiated power*): dasselbe, aber **bezogen auf den isotropen Kugelstrahler** (§ 2 Nr. 9 AFuV).

Der [Isotropstrahler](wiki:Isotroper Strahler|Isotropic radiator) ist ein gedachter Strahler, der gleichmäßig in alle Richtungen strahlt; der [Halbwellendipol](wiki:Dipolantenne|Dipole antenna) hat selbst schon einen kleinen Gewinn von **2,15 dB** (Faktor **1,64**) gegenüber ihm. Deshalb gilt:

$$P_{\\text{ERP}} = P_{\\text{S}}\\cdot G_{\\text{D}} \\qquad P_{\\text{EIRP}} = P_{\\text{S}}\\cdot G_{\\text{i}} \\qquad P_{\\text{EIRP}} = 1{,}64\\cdot P_{\\text{ERP}}$$

($P_\\text{S}$ = der Antenne zugeführte Leistung, $G_\\text{D}$ Gewinnfaktor bezogen auf den Dipol, $G_\\text{i}$ bezogen auf den Kugelstrahler.) Weil ein Dipol schon 1,64 hat, gilt auch $G_\\text{i} = 1{,}64\\cdot G_\\text{D}$; der Zahlenwert in „dBi“ ist stets um 2,15 dB größer als in „dBd“.[^bnetza-formelsammlung]

**Klasse N** darf im **10-m-Band 10 W ERP** abstrahlen, im **2-m- und 70-cm-Band 10 W EIRP** (in Anlage 1 als 6,1 W ERP ausgedrückt: $10\\,\\text{W}/1{,}64 = 6{,}1\\,\\text{W}$). Beispiel: Ein Handfunkgerät mit **5 W** am Ausgang und einer Antenne mit **Gewinnfaktor 2,5** (4,0 dBi) strahlt $5\\,\\text{W}\\cdot 2{,}5 = 12{,}5\\,\\text{W}$ EIRP ab — **zu viel**. Mit **Gewinnfaktor 1,8** (2,6 dBi) sind es $9\\,\\text{W}$ — **erlaubt**. Die Grenze liegt bei 5 W also bei einem Gewinnfaktor von 2 bezogen auf den Kugelstrahler. Antennen mit Gewinn sind für Klasse N nicht verboten, nur die Strahlungsleistung ist begrenzt.

Fernbediente und automatisch arbeitende Stationen oberhalb von 30 MHz sind auf **50 W ERP** begrenzt (Anlage 1 Absatz 1).
`,
    },
    {
      id: 'viz-checker', type: 'viz', viz: 'leistungs-checker', title: 'Leistungs-Checker',
      params: {},
      task: 'Finde die vier Fälle: **Klasse E, 2 m** exakt an der Grenze (75 W), **Klasse E, 80 m** mit 150 W (zu viel), **Klasse N, 2 m** mit 5 W und **+4 dBi** (zu viel) und mit **+2,6 dBi** (erlaubt).',
      caption: 'Für Klasse A und E zählt der Senderausgang; Klasse N wird über die Strahlungsleistung geprüft. Der Antennengewinn kann in dBd oder dBi angegeben werden: dBi = dBd + 2,15.',
    },
    {
      id: 'num-erp', type: 'numeric', title: 'ERP ausrechnen',
      question: 'Ein Sender gibt 20 W an eine Antenne mit dem Gewinnfaktor 1,5 (bezogen auf den Halbwellendipol) ab. Wie groß ist die ERP?',
      answer: 30, tolerance: 0.01, unit: 'W',
      explain: '$P_\\text{ERP} = 20\\,\\text{W}\\cdot 1{,}5 = 30\\,\\text{W}$. Das wäre für Klasse N zu viel (10 W EIRP im 2-m-Band), für Klasse E auf 2 m aber unerheblich — dort zählt, dass der Sender höchstens 75 W PEP abgibt.',
    },
    {
      id: 'num-n', type: 'numeric', title: 'Welcher Gewinn ist für N erlaubt?',
      question: 'Ein Klasse-N-Funker hat ein Handfunkgerät mit 5 W Senderausgangsleistung. Welchen Gewinnfaktor (bezogen auf den Kugelstrahler) darf die Antenne im 2-m-Band höchstens haben?',
      answer: 2, tolerance: 0.01,
      explain: '$G_\\text{i} \\le 10\\,\\text{W}/5\\,\\text{W} = 2$ (10 W EIRP als Grenze).',
    },
    {
      id: 'num-zweiton', type: 'numeric', title: 'Zweiton',
      question: 'Ein SSB-Sender gibt bei Zweitonaussteuerung 75 W PEP ab. Wie groß ist die mittlere Leistung dieses Zweitonsignals?',
      answer: 37.5, tolerance: 0.02, unit: 'W',
      explain: 'Bei zwei Tönen gleicher Amplitude ist die mittlere Leistung halb so groß wie PEP: $75\\,\\text{W}/2 = 37{,}5\\,\\text{W}$.',
    },
    {
      id: 'quiz-limits', type: 'quiz', title: 'Leistungsgrenzen',
      question: 'Welche Aussagen sind richtig? (Mehrfachauswahl)',
      options: [
        { text: 'Klasse E: 100 W PEP im 10-m-Band und im Teilband 1810–1850 kHz.', correct: true, why: 'Anlage 1, Zeilen 3 und 14.' },
        { text: 'Klasse E: 75 W PEP auf 2 m und 70 cm; Klasse A: 750 W PEP.', correct: true, why: 'Anlage 1, Zeilen 17 und 18.' },
        { text: 'Klasse E: 5 W PEP zwischen 1300 MHz und 250 GHz; Klasse A dort 75 W PEP.', correct: true, why: 'Alle Zeilen ab 2320 MHz.' },
        { text: 'Klasse A: 750 W PEP im Frequenzbereich 10,1–10,15 MHz.', correct: false, why: 'Auf 30 m sind es nur 150 W PEP (und für Klasse E ist das Band gesperrt).' },
        { text: 'Für Klasse E gilt auf 80 m 75 W PEP.', correct: false, why: '100 W PEP unterhalb von 30 MHz; 75 W gelten erst ab 144 MHz.' },
        { text: 'Der Antennengewinn ist bei Klasse E auf 2 m für die 75-W-Grenze zu berücksichtigen.', correct: false, why: 'Die Grenze gilt für die Senderausgangsleistung; der Gewinn zählt nur bei Klasse N und wenigen Sonderbereichen.' },
      ],
    },
    {
      id: 'mission', type: 'callout', tone: 'mission', title: 'Funkpraxis: Mit 75 W durch die Welt',
      md: `
Die meisten Transceiver liefern **100 W** auf Kurzwelle und **50 W** auf UKW — die 75-W-Grenze auf 2 m/70 cm dreht man mit dem Leistungsregler **zurück** oder nutzt ohnehin 50 W. Auch eine **[Endstufe](wiki:Leistungsverstärker)** (Linear) für 160/80 m darf maximal 100 W PEP abgeben, wenn du Klasse E hast. Wer **QRP** funkt (unter 5 W), schafft mit gutem Antennenaufbau erstaunliche Entfernungen. Ob die Leistung für den **Personenschutz** (Sicherheitsabstand zur Antenne) reicht, ist eine eigene Rechnung — dazu kommen wir in der EMV-Etappe.

*Prüfungsbezug:* VD724–VD737, VD743 (Leistungsgrenzen), NF102 (Power-Meter), EB501, EB502, EF401, EF402 (PEP, mittlere Leistung, Ausgangsleistung).
`,
    },
    {
      id: 'recall', type: 'recall', title: 'Mit eigenen Worten',
      prompt: 'Erkläre den Unterschied zwischen Senderausgangsleistung (PEP) und Strahlungsleistung (ERP) und sage, für welche Klasse welche zählt. Nenne außerdem die Leistungsgrenzen der Klasse E auf KW, 2 m/70 cm und im Mikrowellenbereich.',
      answer: 'PEP = Leistung am Senderausgang (vor Zusatzgeräten) an der höchsten Spitze der Hüllkurve; ERP = Sendeleistung × Gewinn bezogen auf den Halbwellendipol (EIRP bezogen auf den Kugelstrahler, EIRP = 1,64·ERP). Klasse A und E: Grenze auf PEP am Senderausgang (der Antennengewinn zählt nicht); Klasse N: Strahlungsleistung (10 m: 10 W ERP; 2 m/70 cm: 10 W EIRP). Klasse E: 100 W PEP auf 160, 80, 15, 10 m; 75 W PEP von 144 bis 1300 MHz (23 cm: 1247–1263 MHz nur 3,05 W ERP); 5 W PEP ab 13 cm bis 250 GHz.',
      hints: ['N: Strahlung. A/E: Senderausgang.', '100 / 75 / 5'],
      cards: ['limits-e', 'pep-def'],
    },
  ],
  cards: [
    { id: 'pep-def', front: 'Was ist die Spitzenleistung (PEP) eines Senders?', back: 'Die Leistung, die der Sender unter normalen Betriebsbedingungen während einer Periode der HF-Schwingung bei der höchsten Spitze der Modulationshüllkurve im Mittel an einen reellen Abschlusswiderstand abgeben kann.' },
    { id: 'mittlere-def', front: 'Was ist die mittlere Leistung?', back: 'Die durchschnittliche Leistung an die Antennenspeiseleitung über ein Zeitintervall, das lang gegenüber der Periode der tiefsten Modulationsfrequenz ist.' },
    { id: 'ausgang-def', front: 'Was ist die Ausgangsleistung eines Senders?', back: 'Die unmittelbar am Senderausgang messbare Leistung, bevor sie Zusatzgeräte (Tuner, SWR-Meter) durchläuft.' },
    { id: 'messen-pep', front: 'Wie und wo misst man die PEP eines SSB-Senders?', back: 'Direkt am Senderausgang bei Ein- oder Zweitonaussteuerung (nicht mit Träger hinter dem Tuner, nicht mit Sprache).' },
    { id: 'power-meter', front: 'Welche Anzeige zeigt im Sendebetrieb die Senderausgangsleistung?', back: 'Das Power-Meter (oft „P“, „PO“, „PWR“) — nicht SWR-Meter, Spektrum oder Wasserfall.' },
    { id: 'zweiton-halb', front: 'Zweitonsignal: mittlere Leistung im Verhältnis zu PEP?', back: 'Halb so groß (bei zwei Tönen gleicher Amplitude).' },
    { id: 'erp-eirp', front: 'ERP und EIRP?', back: 'ERP = Sendeleistung × Gewinn bezogen auf den Halbwellendipol; EIRP = bezogen auf den isotropen Kugelstrahler; EIRP = 1,64 · ERP (2,15 dB).' },
    { id: 'limits-e', front: 'Höchstleistungen der Klasse E?', back: '100 W PEP auf 160 m (1810–1850 kHz), 80 m, 15 m, 10 m; 75 W PEP auf 2 m, 70 cm, 23 cm; 5 W PEP ab 13 cm bis 250 GHz.' },
    { id: 'limits-a', front: 'Höchstleistungen der Klasse A (Auswahl)?', back: '750 W PEP auf den meisten Bändern (80 m, 40 m, 20 m, 15 m, 10 m, 2 m, 70 cm, 23 cm); 150 W PEP auf 30 m; 75 W PEP von 1300 MHz bis 250 GHz.' },
    { id: 'limits-n', front: 'Höchstleistungen der Klasse N?', back: '10-m-Band: 10 W ERP. 2 m und 70 cm: 10 W EIRP (= 6,1 W ERP). Nur diese drei Bänder (28–29,7, 144–146, 430–440 MHz).' },
    { id: 'n-antenne', front: 'Klasse N: 5 W am Ausgang, Antenne mit Gewinnfaktor 2,5 bezogen auf Kugelstrahler (4 dBi) auf 2 m?', back: '5 W · 2,5 = 12,5 W EIRP > 10 W: nicht erlaubt. Mit Gewinnfaktor 1,8 (2,6 dBi): 9 W EIRP, erlaubt.' },
    { id: 'a1-lesen', front: 'Anlage 1: Wie liest man die Leistung ab? Wann darf man ein Band nicht nutzen?', back: 'Zeile über den Frequenzbereich suchen, Spalte der Klasse ablesen; ohne Eintrag ist das Band für die Klasse nicht freigegeben. Zahlen rechts verweisen auf Zusatzbestimmungen (z. B. 3,05 W ERP bei 1247–1263 MHz).' },
  ],
};
