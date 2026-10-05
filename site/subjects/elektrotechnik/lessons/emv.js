export default {
  id: 'emv',
  title: 'Elektromagnetische Verträglichkeit: Störquelle, Kopplung, Opfer',
  summary: 'Jede Störung braucht eine Quelle, einen Kopplungsweg und eine Senke. Du lernst die vier Kopplungsarten, den Unterschied zwischen Gleich- und Gegentakt (Mantelwellen) und rechnest mit dB, wie viel Abstand, Filter und Schirmung bringen.',
  minutes: 30,
  needs: ['dezibel', 'rc-rl-filter', 'blindwiderstand'],
  goals: [
    'Das Modell [[stoerquelle|Störquelle]] – Kopplungsweg – Störsenke anwenden und [[emv|EMV]] (Störaussendung und Störfestigkeit) einordnen',
    'Die vier Kopplungsarten (galvanisch, kapazitiv, induktiv, Strahlung) unterscheiden und passende Gegenmaßnahmen nennen',
    '[[gleichtakt|Gleichtakt-]] von Gegentaktstörungen abgrenzen und die [[mantelwelle|Mantelwelle]] auf Koaxialkabeln erklären',
    'Mit dB rechnen: Abstandsverdopplung (−6 dB) und das Addieren von Filterdämpfungen (dBc)',
    'Oberwellen und Übersteuerung als Störursachen am Sender erkennen und beheben',
  ],
  blocks: [
    {
      id: 'idee', type: 'text', title: 'Quelle, Weg, Senke',
      md: `
Elektronik stört und wird gestört: Ein [Schaltnetzteil](wiki:Schaltnetzteil|Switched-mode power supply) knattert im Radio, der Sender verstimmt den Fernseher, ein Handy „tickt" im Lautsprecher. Die **[Elektromagnetische Verträglichkeit](wiki:Elektromagnetische Verträglichkeit|Electromagnetic compatibility)** (EMV) ist die Fähigkeit eines Geräts, in seiner elektromagnetischen Umgebung zu funktionieren, **ohne** diese unzulässig zu stören.[^wp-emv]

Zwei Seiten gehören dazu:

- **Störaussendung:** Wie viel Störung erzeugt das Gerät?
- **Störfestigkeit:** Wie viel Störung hält das Gerät aus?

Zum Verständnis hilft ein Dreiklang: **Störquelle → Kopplungsweg → Störsenke** (das „Opfer"). Eine Störung tritt nur auf, wenn alle drei da sind. Gegenmaßnahmen setzen an einem der drei Glieder an: die Quelle leiser machen (Filter, Flankensteilheit begrenzen), den Weg unterbrechen (Abstand, Schirmung, Filter am Kabel) oder die Senke robuster machen (Filter am Empfängereingang, Schirm). Am wirkungsvollsten ist meist die Bekämpfung **an der Quelle**.`,
    },
    {
      id: 'kopplung', type: 'text', title: 'Die vier Kopplungsarten',
      md: `
1. **Galvanische Kopplung:** Zwei Stromkreise teilen sich ein Stück Leitung (gemeinsame Impedanz, z. B. Masse oder Netzzuleitung). Der Strom des einen erzeugt dort einen Spannungsabfall, den der andere sieht. *Gegenmittel:* getrennte Rückleitungen, Entkopplung, Netzfilter.
2. **Kapazitive Kopplung:** Zwei Leiter bilden einen kleinen Kondensator; hochfrequente Spannungen koppeln über das **elektrische Feld**. *Gegenmittel:* Abstand, **Schirm** (geerdet, [Faradayscher Käfig](wiki:Faradayscher Käfig|Faraday cage)) zwischen den Leitern.
3. **Induktive Kopplung:** Der Strom einer Leiterschleife erzeugt ein **Magnetfeld**, das in einer zweiten Schleife eine Spannung induziert (Gegeninduktivität, Trafo-Prinzip). *Gegenmittel:* Schleifenflächen klein halten, **verdrillte Leitungen**, Abstand, magnetische Schirmung.
4. **Strahlungskopplung:** Bei Frequenzen, bei denen Leitungen und Gehäuse effiziente Antennen sind, koppelt die **elektromagnetische Welle** im Fernfeld. *Gegenmittel:* Abschirmung (geschlossenes Metallgehäuse), Filter an allen Kabeln, Abstand.

Die Feldstärke im **Fernfeld** nimmt mit $1/d$ ab: Verdoppelst du den Abstand, halbiert sich die Feldstärke – das sind

$$20\\log_{10}\\!\\left(\\tfrac12\\right)\\,\\text{dB}\\approx-6\\,\\text{dB}.$$

Im Nahfeld gelten andere Gesetze (elektrisches und magnetisches Feld nehmen schneller ab).`,
    },
    {
      id: 'gleichtakt', type: 'text', title: 'Gegentakt, Gleichtakt und Mantelwellen',
      md: `
Eine Zweidrahtleitung (oder ein Koaxialkabel) kann auf zwei Arten Strom führen:

- **Gegentakt** (*differential mode*): Der Strom fließt auf einem Leiter hin und auf dem anderen zurück. Das ist der **Nutzstrom**; die Felder der beiden Leiter heben sich weitgehend auf.
- **Gleichtakt** (*common mode*): In beiden Leitern fließt der Strom **in dieselbe Richtung** (gegen die Umgebung/Erde). Die Felder addieren sich – die Leitung wirkt wie **eine** Antenne.

Beim **Koaxialkabel** bildet der Gleichtaktstrom die **Mantelwelle**: Strom fließt auf der **Außenseite** des Schirmgeflechts, zusätzlich zum Nutzsignal innen. Mantelwellen entstehen, wenn die Antenne nicht symmetrisch gespeist wird oder das Kabel selbst Teil der Antenne ist. Sie **strahlen** und koppeln in andere Geräte – das ist einer der häufigsten Wege, wie ein Sender den Fernseher stört (Katalog **EG405**: Mantelwellen auf dem Koaxialkabel können zu Störungen anderer Geräte und zu Störungen des eigenen Empfangs führen).[^bnetza-pruefungsfragen-2024]

Das Gegenmittel ist eine **[Mantelwellensperre](wiki:Mantelwellensperre|Braid-breaker)** ([Gleichtaktdrossel](wiki:Stromkompensierte Drossel|Choke (electronics))): einige Windungen Koaxialkabel auf einen **Ferritkern** ([Ferrit](wiki:Ferrite)) gewickelt. Für den Gegentakt-Nutzstrom heben sich die Felder im Kern auf – er sieht keine Drossel; für den Gleichtakt addieren sich die Felder, die Induktivität ist hoch, und die Mantelwelle wird gedämpft (**EG408**, **EJ118**).`,
    },
    {
      id: 'oberwellen', type: 'text', title: 'Oberwellen und Übersteuerung',
      md: `
Auch ohne Mantelwellen kann der Sender stören:

- **Oberwellen** ([Oberschwingungen](wiki:Harmonische|Harmonic)): Ein nichtlinearer Verstärker oder ein übersteuerter Sender erzeugt zusätzlich Vielfache der Sendefrequenz. Die 2. Oberwelle eines 7-MHz-Senders liegt bei 14 MHz, die 5. bei 35 MHz – und mit etwas Pech in einem Fernsehkanal. Der Katalog empfiehlt: ein sinusförmiger Träger (**EJ201**) und ein **Oberwellenfilter** ([Tiefpass](wiki:Tiefpass|Low-pass filter), **EJ202**).
- **Übersteuerung** des Opfers: Ein starkes Nutzsignal übersteuert den Eingang eines Nachbargeräts, sodass es **nichtlinear** arbeitet und Mischprodukte bildet; die Störung entsteht dann im Opfer, obwohl der Sender sauber ist (**EJ103**).

Pegel rechnet man in **dB** ([Dezibel](wiki:Dezibel|Decibel)): Beziehungen zum Grundwellenpegel gibt man in **dBc** an (*dB carrier*, relativ zum Träger). Dämpfungen **addieren** sich in dB, weil Verhältnisse multiplizieren. Liegt die 2. Oberwelle bei −30 dBc und hat der Tiefpass bei dieser Frequenz 40 dB Dämpfung, bleiben

$$-30\\,\\text{dBc}-40\\,\\text{dB}=-70\\,\\text{dBc}.$$

Bei 100 W Sendeleistung sind −70 dBc genau $100\\,\\text{W}\\cdot10^{-7}=10\\,\\mu\\text{W}$.`,
    },
    {
      id: 'viz-lab', type: 'viz', viz: 'emc-lab', title: 'EMV-Labor',
      intro: 'Ein Kurzwellensender stört über Strahlung und über die Mantelwelle auf dem Kabel einen Fernseher. Teste Abstand, Schirmung, Ferrit und Tiefpass und beobachte, welcher Weg dominiert. Die Pegel sind relative Modellwerte, keine Messwerte.',
      task: 'Erkenne, dass **ohne Maßnahmen die Mantelwelle** (> 90 %) der Hauptweg ist, überprüfe die **−6-dB-Regel** (Abstand von 2 m auf 4 m) und schaffe es dann mit **höchstens einer Maßnahme** unter die Störschwelle von 25 dBµV.',
    },
    {
      id: 'calc-6db', type: 'numeric', title: 'Abstandsverdopplung',
      question: 'Im Fernfeld ist die Feldstärke umgekehrt proportional zum Abstand. Um wie viel dB ändert sich der Pegel, wenn der Abstand zur Störquelle verdoppelt wird?',
      answer: -6, tolerance: 0.1, unit: 'dB',
      hint: '$20\\log_{10}(E_2/E_1)$ mit $E_2/E_1=1/2$',
      explain: '$20\\log_{10}(0{,}5)=-6{,}02\\,\\text{dB}$. Pro Verdopplung des Abstands also etwa −6 dB (Feldstärke ×0,5, Leistungsdichte ×0,25).',
    },
    {
      id: 'calc-dbc', type: 'numeric', title: 'Oberwelle mit Tiefpass',
      question: 'Die 2. Oberwelle am Senderausgang liegt bei $-30\\,\\text{dBc}$. Ein Tiefpass dämpft diese Frequenz um $40\\,\\text{dB}$. Wie groß ist der Oberwellenpegel danach in dBc?',
      answer: -70, tolerance: 0.1, unit: 'dBc',
      hint: 'Dämpfungen in dB werden addiert (hier: subtrahiert vom Pegel).',
      explain: '$-30\\,\\text{dBc}-40\\,\\text{dB}=-70\\,\\text{dBc}$.',
    },
    {
      id: 'calc-uw', type: 'numeric', title: 'Oberwellenleistung',
      question: 'Wie groß ist die Leistung der Oberwelle bei $-70\\,\\text{dBc}$ und einer Sendeleistung von $100\\,\\text{W}$ (in µW)?',
      answer: 10, tolerance: 0.2, unit: 'µW',
      hint: '$-70\\,\\text{dB}$ entspricht dem Leistungsverhältnis $10^{-7}$.',
      explain: '$100\\,\\text{W}\\cdot10^{-7}=10^{-5}\\,\\text{W}=10\\,\\mu\\text{W}$.',
    },
    {
      id: 'quiz-nf', type: 'quiz', title: 'Einstrahlung in NF-Leitungen',
      question: 'Was kann man gegen Einstrahlung von HF in NF-Leitungen (z. B. Mikrofon- oder Lautsprecherkabel) tun? (Mehrfachauswahl)',
      options: [
        { text: 'Abgeschirmte Leitungen verwenden und den Schirm sauber anschließen', correct: true, why: 'Der Schirm hält das elektrische Feld vom Innenleiter fern (Faraday-Prinzip).' },
        { text: 'Ferritkerne bzw. Mantelwellendrossel auf die Leitung setzen', correct: true, why: 'Sie dämpfen die Gleichtakt-Mantelwellen auf der Leitung.' },
        { text: 'Kapazitive Entkopplung (kleine Kondensatoren gegen Masse) am Eingang', correct: true, why: 'Ein Kondensator leitet HF kurz, lässt NF aber durch.' },
        { text: 'Die Leitung möglichst lang und parallel zur Antennenleitung verlegen', correct: false, why: 'Das Gegenteil hilft: Lange, parallele Leitungen koppeln stark; besser Abstand und kurze Wege.' },
      ],
    },
    {
      id: 'quiz-mantel', type: 'quiz', title: 'Mantelwelle',
      question: 'Was ist eine Mantelwelle?',
      options: [
        { text: 'Ein Gleichtaktstrom, der auf der Außenseite des Koaxialschirms fließt', correct: true, why: 'Das Kabel wirkt dann wie eine Antenne und kann strahlen und andere Geräte stören.' },
        { text: 'Das Nutzsignal im Innenleiter des Koaxkabels', correct: false, why: 'Das ist der Gegentakt-Nutzstrom: Innenleiter hin, Schirminnenseite zurück.' },
        { text: 'Eine Welle im Kabelmantel durch Hitze', correct: false, why: 'Mit Temperatur hat sie nichts zu tun.' },
        { text: 'Die Reflexion am Kabelende', correct: false, why: 'Reflexionen sind ein anderes Thema (stehende Wellen, Lektion zum SWR).' },
      ],
    },
    {
      id: 'match-kopplung', type: 'match', title: 'Kopplung und Gegenmaßnahme',
      prompt: 'Ordne jeder Kopplungsart die passende Maßnahme zu.',
      pairs: [
        ['kapazitiv', 'geerdeter Schirm zwischen den Leitern'],
        ['induktiv', 'verdrillte Leitung, kleine Schleifenfläche, Abstand'],
        ['galvanisch', 'getrennte Rückleitung / Entkopplung / Netzfilter'],
        ['Strahlung', 'geschlossenes Metallgehäuse, Filter an allen Kabeln'],
      ],
    },
    {
      id: 'recall-snt', type: 'recall', title: 'Erkläre es in eigenen Worten',
      prompt: 'Warum stört ein Schaltnetzteil den Funkempfang? Wo setzt du an – an Quelle, Weg oder Senke?',
      answer: 'Ein Schaltnetzteil schaltet Ströme mit hoher Frequenz und steilen Flanken; das Spektrum enthält viele Oberwellen der Schaltfrequenz bis in den Kurzwellen- und teils UKW-Bereich. Diese HF gelangt über die Netz- und Ausgangsleitungen (galvanisch/als Gleichtakt, Mantelwellen auf den Kabeln), über Streufelder (kapazitiv/induktiv) und per Strahlung in den Empfänger. Am wirksamsten ist die Bekämpfung an der Quelle (Netz- und Ausgangsfilter, Ferrite, geschirmtes Gehäuse, gute Platinenanordnung); zusätzlich helfen Abstand, Mantelwellensperren und Filter am Empfänger.',
      hints: ['Wie sieht das Spektrum eines Rechtecksignals aus?', 'Welche Wege gibt es für die Störung?'],
      cards: ['snt-stoerung', 'quelle-weg-senke'],
    },
    {
      id: 'mission', type: 'callout', tone: 'mission', title: 'Prüfung und Funkpraxis',
      md: `
EMV zieht sich durch die Klasse-E-Prüfung: Bereits das reine Nutzsignal kann benachbarte Empfänger durch **Übersteuerung** oder störende Beeinflussung stören (**EJ103**); ein **geschlossenes Metallgehäuse** schirmt HF-Baugruppen (**EJ108**); eine **Mantelwellendrossel** im Antennenkabel eines Fernsehers unterdrückt Gleichtakt-HF-Störsignale (**EJ118**, **EJ119**); Oberwellen reduziert man mit einem **Oberwellenfilter** (**EJ202**) und einem sinusförmigen Träger (**EJ201**); HF-Stufen sollen gut abgeschirmt sein und die Station eine gute **HF-Erdung** haben (**NK101**, **NK102**). Bei Nachbarschaftsstörungen gilt: höflich anbieten, Prüfungen vorzunehmen, den zeitlichen Zusammenhang mit deinem Sendebetrieb prüfen und im Zweifel die [Bundesnetzagentur](wiki:Bundesnetzagentur|Federal Network Agency) einbeziehen (**NJ102**, **EJ122**, **EJ124**).[^bnetza-pruefungsfragen-2024]`,
    },
    {
      id: 'warning', type: 'callout', tone: 'warning', title: 'Typische Fehlvorstellung',
      md: `
„Schirmung löst jedes Störproblem." – Nicht, wenn die Störung über das **Kabel** hereinkommt (Mantelwelle) oder über ein offenes Gehäuse (Schlitze, nicht verbundene Deckel). Ein Schirm wirkt nur, wenn er **rundum geschlossen** und sauber mit Masse verbunden ist. Ebenso: „Der Sender ist sauber, also ist der Nachbar schuld" – bei starken Feldern kann das Opfer **übersteuert** werden; die Ursache liegt dann im mangelnden Störfestigkeits-Design des Empfängers, trotzdem muss man gemeinsam eine Lösung finden.`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>Deutsch</th><th>English</th><th>Notiz</th></tr>
<tr><td>Elektromagnetische Verträglichkeit (EMV)</td><td>electromagnetic compatibility (EMC)</td><td></td></tr>
<tr><td>Störquelle / Störsenke</td><td>source / victim</td><td>Kopplungsweg</td></tr>
<tr><td>Störaussendung / Störfestigkeit</td><td>emission / immunity</td><td></td></tr>
<tr><td>Gleichtakt / Gegentakt</td><td>common mode / differential mode</td><td></td></tr>
<tr><td>Mantelwelle</td><td>common-mode current on the shield</td><td>Koaxkabel</td></tr>
<tr><td>Mantelwellensperre</td><td>common-mode choke, balun/choke</td><td>Ferritkern</td></tr>
<tr><td>Oberwelle</td><td>harmonic</td><td>$n\\cdot f_0$</td></tr>
<tr><td>Übersteuerung</td><td>overload, blocking</td><td></td></tr>
<tr><td>Abschirmung</td><td>shielding</td><td>Faraday-Käfig</td></tr></table>`,
    },
    {
      id: 'deep-drossel', type: 'callout', tone: 'deep', title: 'Warum die Gleichtaktdrossel nur den Gleichtakt bremst',
      md: `
Auf einem gemeinsamen Ferritkern liegen zwei Wicklungen (oder Hin- und Rückleiter des Koaxkabels). Fließt der Nutzstrom hin und zurück, erzeugen beide Ströme entgegengesetzte Flüsse im Kern, die sich aufheben – die Anordnung hat nahezu keine Induktivität für das Nutzsignal. Fließen beide Ströme in gleicher Richtung (Gleichtakt), addieren sich die Flüsse, und der Kern liefert eine große Induktivität bzw. wegen der Kernverluste einen hohen *Verlustwiderstand* bei HF. Das ist dieselbe Idee wie beim FI (Summenstromwandler), nur mit anderem Ziel.`,
    },
  ],
  cards: [
    { id: 'quelle-weg-senke', front: 'Das EMV-Grundmodell?', back: 'Störquelle → Kopplungsweg → Störsenke (Opfer). Maßnahmen können an jedem der drei Glieder ansetzen, am besten an der Quelle.' },
    { id: 'kopplungsarten', front: 'Die vier Kopplungsarten?', back: 'Galvanisch (gemeinsame Impedanz), kapazitiv (E-Feld), induktiv (Magnetfeld), Strahlung (Fernfeld).' },
    { id: 'gegenmittel-kapazitiv', front: 'Gegenmittel kapazitiv / induktiv?', back: 'Kapazitiv: geerdeter Schirm, Abstand. Induktiv: verdrillte Leitung, kleine Schleifenfläche, Abstand.' },
    { id: 'mantelwelle', front: 'Was ist eine Mantelwelle?', back: 'Gleichtaktstrom auf der Außenseite des Koaxschirms; strahlt und stört (EG405). Abhilfe: Mantelwellensperre (Ferrit, EG408).' },
    { id: 'gleichtakt-gegentakt', front: 'Gleichtakt vs. Gegentakt?', back: 'Gegentakt: Strom hin und zurück (Nutzsignal, Felder heben sich auf). Gleichtakt: gleiche Richtung in beiden Leitern (Antennenwirkung).' },
    { id: 'abstand-6db', front: 'Abstandsverdopplung im Fernfeld?', back: 'Feldstärke ×0,5 = −6 dB (Pegel ∝ 1/d).' },
    { id: 'dbc', front: 'Was bedeutet dBc?', back: 'Pegel in dB relativ zum Träger (Grundwelle). Dämpfungen addieren sich: −30 dBc − 40 dB = −70 dBc.' },
    { id: 'oberwelle', front: 'Oberwellen vermeiden?', back: 'Sinusförmiger Träger, Übersteuerung vermeiden, Oberwellenfilter (Tiefpass) am Senderausgang (EJ201, EJ202).' },
    { id: 'uebersteuerung', front: 'Übersteuerung des Opfers?', back: 'Starkes Nutzsignal treibt den Eingang des Nachbargeräts in die Nichtlinearität; Ursache liegt im Opfer, trotz sauberem Sender (EJ103).' },
    { id: 'schirm', front: 'Wann wirkt ein Schirm?', back: 'Nur rundum geschlossen und sauber mit Masse verbunden (EJ108: möglichst geschlossenes Metallgehäuse).' },
    { id: 'snt-stoerung', front: 'Warum stört ein Schaltnetzteil?', back: 'Steile Schaltflanken erzeugen Oberwellen der Schaltfrequenz bis in die Funkbänder; Weg über Leitungen (Gleichtakt), Felder und Strahlung.' },
  ],
};
