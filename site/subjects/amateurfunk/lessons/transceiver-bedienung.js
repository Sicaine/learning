// Lektion transceiver-bedienung: Aufbau von Sender und Empfänger, Bedienelemente (Mode, RIT, VOX, Squelch, ALC), Dummy Load und Abgleich.
// Quellen für Fakten: DARC 50ohm.de (CC BY 4.0), AFuV § 16 (Stand 05.10.2026), BNetzA-Fragenkatalog 3. Auflage.

export default {
  id: 'transceiver-bedienung',
  title: 'Transceiver: Aufbau, Bedienelemente, ALC und Dummy-Load',
  summary: 'Blockschaltbild von Sender und Empfänger, RIT, VOX, Squelch, Mode, ALC; Abgleich an der künstlichen Antenne (Dummy-Load).',
  minutes: 20,
  goals: [
    'Blockschaltbilder von Sender und Empfänger erkennen und die Stufen in die richtige Reihenfolge bringen',
    'RIT, VOX, Squelch, Mode und ALC am Transceiver den richtigen Aufgaben zuordnen',
    'Begründen, warum ein Sender nie ohne Antenne oder [[dummy-load|Dummy Load]] senden darf und wie man bei Abgleicharbeiten Störungen vermeidet',
    'Die rechtlichen Mindestanforderungen an die Amateurfunkstelle nach AFuV § 16 nennen',
  ],
  needs: ['am-ssb-cw', 'elektrotechnik/schwingkreis'],
  blocks: [
    {
      id: 'intro', type: 'text', title: 'Ein Gerät, zwei Aufgaben',
      md: `
Ein [[transceiver|Transceiver]] (auf [Wikipedia](wiki:Transceiver|Transceiver)) ist ein Funkgerät, das **senden und empfangen** kann (*Trans*mitter + Re*ceiver*) und dabei Bauteile wie Oszillator und Filter gemeinsam nutzt. Wenn du verstehst, was im Gehäuse passiert, weißt du, warum die Knöpfe an der Frontplatte so heißen, und kannst Fehler eingrenzen. Wir gehen einmal durch den **Sender**, einmal durch den **Empfänger**, dann durch die Frontplatte.[^darc-50ohm]

Rechtlich verlangt die Amateurfunkverordnung von der **Amateurfunkstelle** nur, dass sie **nach den allgemein anerkannten Regeln der Technik einzurichten und zu unterhalten** ist (§ 16 Abs. 1 der [Amateurfunkverordnung](wiki:Amateurfunkverordnung), VD106). Weder gibt es eine Pflicht zu einem CE-Zeichen an *allen* Geräten noch zu Koaxkabel, und es steht dort auch nicht, dass die Anlage bauartbedingt nicht mehr Leistung erzeugen dürfte, als der Inhaber verwenden darf: Die Leistungsgrenze ist eine Pflicht des *Funkamateurs* (Anlage 1), keine Eigenschaft des Geräts.[^afuv]
`,
    },
    {
      id: 'sender-text', type: 'text', title: 'Der Sender: Oszillator, Mischer, Filter, Verstärker',
      md: `
Ein einfacher Sender besteht aus **Oszillator, Mischer, Filter und Leistungsverstärker** (NF402). Der Signalweg (NF403):

1. **Mikrofon**: wandelt Schall in eine niederfrequente Schwingung um (oder das NF-Signal kommt vom Computer).
2. **NF-Verstärker**: verstärkt das schwache NF-Signal.
3. **[Mischer](wiki:Mischer (Elektronik)|Frequency mixer)**: fügt das NF-Signal und den vom Oszillator erzeugten Träger zusammen. Mathematisch ist das eine **Multiplikation**; daher das Malkreuz im Schaltzeichen. Es entstehen Summen- und Differenzfrequenzen. Der Träger wird dabei moduliert.
4. **[[hf-oszillator|HF-Oszillator]]**: erzeugt die Schwingung auf der Sendefrequenz (z. B. 29,5 MHz). Er liegt als **zweiter Eingang am Mischer**.
5. **Filter (Bandpass)**: Der Mischer erzeugt neben den gewünschten Frequenzen auch weitere, unerwünschte. Das Filter lässt nur die gewünschten durch.
6. **HF-Verstärker**: bringt das Signal auf die gewünschte **Sendeleistung**.
7. **Filter (Tiefpass)**: Auch die Verstärkung erzeugt unerwünschte Frequenzen; ein weiteres Filter entfernt sie.
8. **Antenne**: strahlt das Signal ab.

Die Reihenfolge im Katalog (NF403): *1 NF-Verstärker, 2 Mischer, 3 HF-Oszillator, 4 Filter, 5 HF-Verstärker, 6 Filter*. Die falschen Antwortketten vertauschen NF- und HF-Verstärker oder setzen Mischer und Filter an die falsche Stelle: Merke dir die **Richtung NF → Mischer (mit Oszillator) → Filter → HF-Verstärker → Filter → Antenne**.

**Woran erkennst du ein Sender-Blockschaltbild?** Am **Mikrofon** (oder NF-Eingang) vorn und der **Antenne** hinten, am **Oszillator mit Mischer** und daran, dass die Leistungsstufe vor der Antenne steht. Mit **Demodulator** und **Lautsprecher** ist es dagegen ein Empfänger. Ein *Tongenerator*, eine *Relaisfunkstelle* oder ein *Antennenvorverstärker* sind falsche Antworten auf NF401. Die Antwortkette „Vorverstärker, Filter, Demodulator, NF-Verstärker“ (NF402) beschreibt einen Empfänger.
`,
    },
    {
      id: 'empf-text', type: 'text', title: 'Der Empfänger: Filter, Verstärker, Demodulator',
      md: `
Den einfachsten Aufbau nennt man **[Geradeausempfänger](wiki:Geradeausempfänger|Tuned radio frequency receiver)**, weil das Signal in seiner Frequenz bis zum Demodulator **nicht verändert** wird.[^darc-50ohm] Seine Stufen:

1. **Antenne**: nimmt viele Funkwellen auf und gibt sie als elektrische Schwingungen weiter.
2. **Bandpassfilter**: lässt nur den gewünschten Frequenzbereich durch.
3. **HF-Verstärker**: verstärkt das gefilterte Signal (z. B. bei 144,3 MHz).
4. **[Demodulator](wiki:Demodulation|Demodulation)**: gewinnt aus dem modulierten Träger das NF-Signal zurück; im Schaltbild meist durch eine **Diode** dargestellt.
5. **NF-Verstärker**: verstärkt das NF-Signal für den Lautsprecher.
6. **Lautsprecher** (oder Kopfhörer): macht es hörbar.

Ein Blockdiagramm mit **Antenne am Anfang, Demodulator in der Mitte und Lautsprecher am Ende** ist ein **Empfänger** (NF201). Wie sich Superhet-Empfänger davon unterscheiden, kommt in der nächsten Lektion.

**Empfindlichkeit** bezeichnet die **Fähigkeit, schwache Signale zu empfangen** (NF303). Das ist nicht die Stabilität des VFO, nicht die Bandbreite des HF-Vorverstärkers und nicht die Fähigkeit, starke Signale zu unterdrücken (das wäre Trennschärfe beziehungsweise Großsignalfestigkeit). Je empfindlicher ein Empfänger, desto schwächere Signale kann er empfangen.
`,
    },
    {
      id: 'demo-blocks', type: 'viz', viz: 'sender-blockschaltbild', title: 'Blockschaltbild-Spiel',
      params: { modes: ['sender', 'gerade'] },
      intro: 'Tippe eine Stufe an (sie wird erklärt) und dann den Platz im Blockschaltbild. Antippen eines belegten Platzes nimmt die Stufe wieder heraus.',
      task: 'Bringe den Sender und den Geradeausempfänger in die richtige Reihenfolge.',
    },
    {
      id: 'warn-blocks', type: 'callout', tone: 'warning', title: 'Verwechslungen bei Blockschaltbildern',
      md: `
- **Demodulator** gehört in den **Empfänger**, **Mischer + Oszillator** in den **Sender** (beim Superhet kommt der Mischer auch in den Empfänger, nächste Lektion).
- Der **NF-Verstärker** steht im Sender **vorn** (hinter dem Mikrofon), im Empfänger **hinten** (vor dem Lautsprecher). Der **HF-Verstärker** steht im Sender hinten, im Empfänger vorn.
- Ein Verstärker ohne Filter dahinter ist im Katalog nie die richtige Kette: Mischer und Endstufe erzeugen unerwünschte Frequenzen, die man herausfiltern muss.
`,
    },
    {
      id: 'bedien-text', type: 'text', title: 'Die Frontplatte: RIT, VOX, Squelch, Mode',
      md: `
Fast jeder Transceiver bietet dieselben Bedienelemente, auch wenn die Hersteller sie unterschiedlich nennen.[^darc-50ohm]

## RIT: nur die Empfangsfrequenz verstellen

Die **RIT** (*Receiver Incremental Tuning*, bei manchen Herstellern auch **Clarifier** oder „CLAR RX“) verstellt die **Empfangsfrequenz** geringfügig gegenüber der Sendefrequenz, vor allem bei **SSB**, wenn die Stimme der Gegenstation zu hoch oder zu tief klingt, weil deren Sendefrequenz leicht abweicht (NF111). Du hörst sie klar, ohne die **eigene** Sendefrequenz zu verstellen. Notchfilter, Passband-Tuning oder die PTT lösen das Problem nicht.

Wozu der Aufwand? Die tatsächliche Sendefrequenz eines Transceivers weicht geringfügig von der eingestellten ab. Würden beide Stationen **Sende- und Empfangsfrequenz** gemeinsam nachstellen, wanderte das QSO über das Band. Mit der RIT korrigiert nur einer, und nur einmal.

**Richtung:** Im **USB**: Stimme zu **hoch** → Empfangsfrequenz **erhöhen**; zu tief → verringern. Im **LSB** (Sprachfrequenzen gespiegelt) umgekehrt.

**Aber:** Bleibt die RIT **eingeschaltet**, empfängst du auf einer anderen Frequenz, als du sendest. Meldet dir die Gegenstation im SSB-QSO „Du sendest nicht exakt auf meiner Frequenz“, dann ist **die RIT aktiviert** (NF112). Ein LSB-, USB- oder CW-Filter erklärt das nicht.

## VOX: Sprechen schaltet auf Senden

Normalerweise schaltest du mit der **[PTT](wiki:Push-to-talk|Push-to-talk)**-Taste auf Sendung. Mit **[VOX](wiki:Voice Operated Exchange|Voice-operated switch)** (*voice-operated exchange*) geschieht das automatisch, sobald du sprichst; nach einer kurzen Verzögerung endet die Sendung (NF109). Schaltet dein Transceiver **von selbst auf Sendung**, ist meist die **VOX aktiviert** (NF110): Husten, Hintergrundgeräusche oder Lautsprecherton genügen. Mit Squelch, einer unterbrochenen PTT oder der Relaisablage hat das nichts zu tun.

## Squelch: Rauschen ausblenden

Auf einer freien FM-Frequenz hört man lautes Rauschen. Die **[Rauschsperre](wiki:Rauschsperre|Squelch)** (*Squelch*, SQL) schaltet den Lautsprecher erst frei, wenn ein Signal mit ausreichender Amplitude anliegt (NF302). Richtig eingestellt ist sie, wenn es in den Sendepausen **gerade** nicht mehr rauscht: zu schwach, und es rauscht; zu stark, und schwache Signale werden mit ausgeblendet. VOX, RIT und Notchfilter sind keine Rauschsperren.

## MODE und VFO

Am **MODE**-Schalter wählst du die Sendeart (CW, AM, FM, LSB, USB; vorige Lektion), mit dem **VFO**-Knopf die Frequenz.
`,
    },
    {
      id: 'demo-panel', type: 'viz', viz: 'transceiver-frontplatte', title: 'Transceiver-Frontplatte',
      intro: 'Im Modus „Erkunden“ tippst du jedes Element an; es ändert seinen Zustand, und unten steht, was es tut. Im Modus „Aufgaben“ beschreibe ich eine Situation, und du tippst auf das passende Element.',
      task: 'Tippe alle Bedienelemente an und löse sechs von acht Aufgaben richtig.',
    },
    {
      id: 'demo-rit', type: 'viz', viz: 'rit-lab', title: 'RIT-Labor',
      intro: 'Eine Gegenstation sendet leicht neben der Sollfrequenz. Hörst du die Stimme zu hoch oder zu tief, drehst du an der RIT, deine Sendefrequenz bleibt fest. Mit dem Knopf „Stimme anhören“ kannst du es auch hören.',
      task: 'Hole die Stimme im USB und im LSB wieder auf eine natürliche Tonlage (±50 Hz).',
    },
    {
      id: 'mission-erste-schritte', type: 'callout', tone: 'mission', title: 'Funkpraxis: Die ersten Minuten mit einem neuen Transceiver',
      md: `
Bevor du das erste Mal sendest: **Dummy Load** an die Antennenbuchse (nicht die Antenne!), Mode auf USB oder LSB je nach Band, **VOX aus**, **RIT aus** (und Nullstellung kontrollieren), Squelch so, dass es nicht rauscht, Mikrofonverstärkung niedrig. Dann ein paar Sekunden senden und die **ALC** beobachten. Wenn das alles ruhig läuft, schließt du die Antenne an. Ein Stück Routine, das dir später viele Rätsel („Warum hört mich keiner?“) erspart.
`,
    },
    {
      id: 'alc-text', type: 'text', title: 'ALC: Die Pegelregelung im Sendezweig',
      md: `
Die **ALC** (*Automatic Level Control*) regelt die Aussteuerung der Endstufe: Sie erfasst die Ausgangsleistung, vergleicht sie mit einem Maximalwert und gibt bei Überschreitung eine Regelspannung an die vorgelagerte HF-Verstärkerstufe. **Sie reduziert damit bei zu starkem NF-Signal die Amplitude des Signals im Sendezweig vor dem Leistungsverstärker** (EF305). Sie erhöht die Amplitude nicht, und sie hat mit Verstärkerstufen im **Empfangsteil** nichts zu tun; das wäre die **AGC** (nächste Lektion).[^darc-50ohm]

Die ALC-Anzeige gibt dir einen Anhalt für die Aussteuerung: Solange sie nicht anspricht, wird der Sender nicht übersteuert. Bei **SSB** ist ein **leichtes Ansprechen erwünscht** (grüner Bereich), weil die ALC Lautstärkeschwankungen der Stimme ausgleicht und die Leistung gut nutzt; bis in den roten Bereich darf es nicht gehen. Praktisch: NF-Aussteuerung langsam erhöhen, bis die ALC gerade anspricht, dann wieder etwas zurückdrehen. Bei Digimodes soll die ALC dagegen ruhen (siehe Lektion über digitale Betriebsarten).
`,
    },
    {
      id: 'dummy-text', type: 'text', title: 'Abgleich und Messung: Dummy Load statt Antenne',
      md: `
Nach einer Reparatur, bei einem selbstgebauten Sender oder wenn du die Leistung messen willst, musst du **senden, ohne abzustrahlen**. Dafür gibt es die **Dummy Load**, auch **[künstliche Antenne](wiki:Künstliche Antenne|Dummy load)** oder **Abschlusswiderstand**: ein Lastwiderstand (meist 50 Ω) auf einem Kühlkörper. Die Sendeleistung wird **fast vollständig in Wärme** umgesetzt, **nichts wird abgestrahlt**. Aus Sicht des Senders ist sie von einer gut angepassten Antenne nicht zu unterscheiden, weil nichts reflektiert wird.[^darc-50ohm]

Dazu drei Sätze aus dem Katalog:

- **Bei Abgleicharbeiten und Messungen an Sendern** sind geeignete Maßnahmen zu treffen, die ein **freies Abstrahlen von Signalen wirkungsvoll verhindern** (§ 16 Abs. 6 AFuV, VD111). Das Gehäuse darfst du dabei öffnen, nicht „nur mit halber Leistung“ senden, und ob das Antennenkabel fest angeschlossen ist, hat damit nichts zu tun.[^afuv]
- Beim Abgleich eines **selbstgebauten Senders** verhinderst du Störungen anderer Funkverbindungen, indem du einen **geeigneten Abschlusswiderstand (Dummy Load)** verwendest (NJ202), nicht durch eine ISM-Frequenz, halbe Leistung oder „unnötige Modulation vermeiden“.
- Ein **Sender** darf **nie ohne angepasste Antenne oder Dummy Load** betrieben werden, weil sonst die gesamte Leistung am Antennenanschluss **reflektiert** wird und die **Endstufe beschädigen** kann (NF107). Es wird dabei nicht die Versorgungsspannung hochgeregelt, nicht das Netzteil überlastet, und das Messgerät für das [Stehwellenverhältnis](wiki:Stehwellenverhältnis|Standing wave ratio) (SWR) ist nicht das gefährdete Teil.

Ganz ohne Aussenden geht es nicht, wenn du zum Beispiel ein automatisches Antennenanpassgerät (Tuner) abstimmst: **Das Aussenden eines unmodulierten oder ungetasteten Trägers ist zulässig, wenn es kurzzeitig erfolgt, z. B. zum Abstimmen** (VD112). Dauerträger sind dagegen nicht zulässig (§ 16 Abs. 9 AFuV). Stimme nur auf einer **freien** Frequenz oder an der Dummy Load ab, sonst störst du andere Verbindungen. Eine Leistungsbegrenzung („unter 1 W“) oder die Tatsache, dass es „ein digitales Signal“ wäre, spielt keine Rolle.
`,
    },
    {
      id: 'demo-dummy', type: 'viz', viz: 'dummy-load-sim', title: 'Dummy-Load-Simulator',
      intro: 'Hänge verschiedene Lasten an und schalte „Senden“ ein: Beobachte, wohin die Leistung fließt.',
      task: 'Sende an der Dummy Load (nichts wird abgestrahlt), dann ohne Last (Endstufe gefährdet) und an der verstimmten Antenne (ein Viertel kommt zurück).',
    },
    {
      id: 'video-trx', type: 'video', youtube: '0bn_wZe4a2I', label: 'Videolehrgang Klasse N, Lektion 09: Transceiver', channel: 'DL2YMR',
      why: 'Der Videolehrgang von DL2YMR zum Thema Transceiver, zum Anschauen und Nachhören.',
    },
    {
      id: 'match-regler', type: 'match', title: 'Regler und Wirkung',
      prompt: 'Ordne jedem Bedienelement seine Aufgabe zu.',
      pairs: [
        ['RIT', 'verstellt nur die Empfangsfrequenz'],
        ['VOX', 'schaltet durch Sprechen auf Senden'],
        ['SQL (Squelch)', 'blendet das Rauschen ohne Signal aus'],
        ['ALC', 'reduziert zu starkes NF-Signal im Sendezweig'],
        ['MODE', 'wählt CW, AM, FM, LSB oder USB'],
        ['Dummy Load', 'nimmt die Leistung als Wärme auf, ohne abzustrahlen'],
      ],
    },
    {
      id: 'quiz-regeln', type: 'quiz', title: 'Fehlersuche am Transceiver',
      question: 'Welche Aussagen sind richtig? (Mehrfachauswahl)',
      options: [
        { text: 'Schaltet der Transceiver von selbst auf Sendung, ist vermutlich VOX aktiviert.', correct: true, why: 'Die VOX reagiert auf jedes Geräusch am Mikrofon.' },
        { text: 'Meldet die Gegenstation „Du sendest nicht genau auf meiner Frequenz“, kann die RIT noch aktiv sein.', correct: true, why: 'Die RIT verschiebt die Empfangs-, nicht die Sendefrequenz; mit eingeschalteter RIT stimmst du dich neben die Gegenstation.' },
        { text: 'Zum Abgleich eines selbstgebauten Senders verwendet man eine Dummy Load.', correct: true, why: 'So wird nichts abgestrahlt, und die Endstufe bekommt eine angepasste Last.' },
        { text: 'Ein Sender darf kurzzeitig ohne Last betrieben werden, wenn man nur halbe Leistung einstellt.', correct: false, why: 'Auch bei halber Leistung wird alles reflektiert: Endstufenschaden möglich.' },
        { text: 'Die ALC erhöht bei zu schwachem NF-Signal die Verstärkung im Empfangsteil.', correct: false, why: 'Die ALC senkt die Amplitude im Sendezweig, wenn das NF-Signal zu stark ist. Im Empfangszweig regelt die AGC.' },
      ],
    },
    {
      id: 'calc-rit', type: 'numeric', title: 'RIT einstellen',
      question: 'Du empfängst in USB auf 7,1000 MHz. Die Gegenstation sendet in Wirklichkeit auf 7,1002 MHz, ihre Stimme klingt zu hoch. Auf wie viel Hz stellst du die RIT (mit Vorzeichen), damit die Stimme natürlich klingt?',
      answer: 200, tolerance: 0, unit: 'Hz',
      hint: 'Du musst deine Empfangsfrequenz auf die tatsächliche Sendefrequenz der Gegenstation bringen.',
      explain: '7,1002 MHz − 7,1000 MHz = 0,0002 MHz = 200 Hz. Im USB: Stimme zu hoch bedeutet Empfangsfrequenz erhöhen, also **+200 Hz**. Danach RIT wieder ausschalten, damit du nicht neben der Gegenstation sendest.',
    },
    {
      id: 'order-abgleich', type: 'order', title: 'Abgleich eines Senders in sicherer Reihenfolge',
      prompt: 'Bringe die Schritte zur Leistungsmessung an einem selbstgebauten Sender in eine sinnvolle Reihenfolge.',
      items: [
        'Sender ausschalten, Dummy Load an den Antennenausgang anschließen',
        'Prüfen, dass nichts anderes angeschlossen ist (keine Antenne)',
        'Sender einschalten und kurz senden, dabei Leistung und ALC beobachten',
        'Bei Bedarf Einstellungen ändern und erneut kurz senden',
        'Sender ausschalten, Dummy Load abklemmen, Antenne anschließen',
      ],
      explain: 'Erst die Last, dann das Signal: Die Dummy Load verhindert das freie Abstrahlen (§ 16 Abs. 6 AFuV) und schützt die Endstufe; gesendet wird nur kurz.',
    },
    {
      id: 'recall-trx', type: 'recall', title: 'In eigenen Worten',
      prompt: 'Beschreibe die Stufen eines einfachen Senders in der richtigen Reihenfolge und erkläre, warum man beim Abgleich eine Dummy Load benutzt und nie ohne Last sendet.',
      answer: 'Mikrofon (oder NF vom Computer), NF-Verstärker, Mischer (zweiter Eingang vom HF-Oszillator), Bandpassfilter, HF-Verstärker (Leistungsverstärker), Tiefpassfilter, Antenne. Beim Abgleich verwendet man eine Dummy Load, weil sie die Sendeleistung fast vollständig in Wärme umsetzt und nichts abstrahlt: Nach der AFuV sind bei Abgleicharbeiten Maßnahmen zu treffen, die ein freies Abstrahlen verhindern. Nie ohne Antenne oder Dummy Load senden, weil ohne angepasste Last die gesamte Leistung reflektiert wird und die Endstufe beschädigen kann.',
      hints: ['Wo steht der Oszillator, und wohin geht sein Signal?', 'Was passiert mit der Leistung ohne Last?'],
      cards: ['sender-stufen', 'dummy-load-grund'],
    },
  ],
  cards: [
    { id: 'sender-stufen', front: 'Aus welchen Stufen besteht ein einfacher Sender?', back: 'Oszillator, Mischer, Filter, Leistungsverstärker. Weg: Mikrofon → NF-Verstärker → Mischer (mit HF-Oszillator) → Filter → HF-Verstärker → Filter → Antenne.' },
    { id: 'empfaenger-stufen', front: 'Stufen eines Geradeausempfängers?', back: 'Antenne → Bandpassfilter → HF-Verstärker → Demodulator → NF-Verstärker → Lautsprecher. Die Frequenz bleibt bis zum Demodulator unverändert.' },
    { id: 'empfindlichkeit', front: 'Worauf bezieht sich die Empfindlichkeit eines Empfängers?', back: 'Auf die Fähigkeit, schwache Signale zu empfangen.' },
    { id: 'rit-def', front: 'Was macht die RIT?', back: 'Sie verstellt nur die Empfangsfrequenz (gegenüber der Sendefrequenz), z. B. wenn die SSB-Stimme der Gegenstation zu hoch oder zu tief klingt. Auch „Clarifier“ genannt.' },
    { id: 'rit-nicht-genau', front: 'Gegenstation: „Du sendest nicht exakt auf meiner Frequenz.“ Ursache?', back: 'Die RIT ist noch eingeschaltet (Empfangsfrequenz verstellt).' },
    { id: 'vox-def', front: 'Wie heißt das automatische Auf-Sendung-Schalten durch Sprechen?', back: 'VOX (voice-operated exchange). Schaltet der Transceiver von selbst auf Sendung: VOX ist aktiviert. Normal: PTT.' },
    { id: 'squelch-def', front: 'Wie blendest du bei FM das Grundrauschen aus?', back: 'Mit dem Squelch (Rauschsperre): gerade so weit aufdrehen, dass es in Sendepausen nicht mehr rauscht; zu weit blendet schwache Signale aus.' },
    { id: 'alc-def', front: 'Was bewirkt die ALC?', back: 'Bei zu starkem NF-Signal reduziert sie die Amplitude im Sendezweig vor dem Leistungsverstärker. Im Empfangszweig regelt die AGC.' },
    { id: 'dummy-load-grund', front: 'Warum nie ohne Antenne oder Dummy Load senden?', back: 'Die gesamte Leistung wird am Antennenanschluss reflektiert und kann die Endstufe beschädigen.' },
    { id: 'dummy-load-abgleich', front: 'Wie vermeidest du beim Abgleich Störungen anderer Funkverbindungen?', back: 'Mit einer Dummy Load (Abschlusswiderstand). Sie setzt die Leistung fast vollständig in Wärme um. AFuV § 16 Abs. 6: freies Abstrahlen wirkungsvoll verhindern.' },
    { id: 'traeger-abstimmen', front: 'Wann ist ein unmodulierter Träger zulässig?', back: 'Wenn er kurzzeitig erfolgt, z. B. zum Abstimmen. Dauerträger sind nicht zulässig (AFuV § 16 Abs. 9).' },
    { id: 'regeln-technik', front: 'Technische Anforderung der AFuV an die Amateurfunkstelle?', back: 'Sie ist nach den allgemein anerkannten Regeln der Technik einzurichten und zu unterhalten (§ 16 Abs. 1).' },
  ],
};
