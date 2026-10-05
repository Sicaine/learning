export default {
  id: 'transistor-grundschaltungen',
  title: 'E-, C-, B-Schaltung und Verstärkerklassen',
  summary: 'Drei Wege, einen Transistor zu beschalten: Emitter-, Kollektor- und Basisschaltung im Vergleich — und die Verstärkerklassen A, B, AB und C zwischen Linearität und Wirkungsgrad.',
  minutes: 30,
  needs: ['emitterschaltung'],
  goals: [
    '[[emitterschaltung|Emitter]]-, [[kollektorschaltung|Kollektor]]- und [[basisschaltung|Basisschaltung]] nach Spannungsverstärkung, Phase, Ein- und Ausgangswiderstand vergleichen',
    'Den Emitterfolger als Impedanzwandler erkennen und einsetzen',
    'Die [[verstaerkerklassen|Verstärkerklassen]] A, B, AB und C über den Stromflusswinkel unterscheiden und ihre Vor- und Nachteile nennen',
    'Erklären, warum ein C-Verstärker einen Schwingkreis am Ausgang braucht',
  ],
  blocks: [
    {
      id: 'intuition', type: 'text', title: 'Welcher Anschluss ist gemeinsam?',
      md: String.raw`
Ein Transistor hat drei Anschlüsse, aber ein Verstärker braucht zwei für den Eingang und zwei für den Ausgang. Also teilen sich Ein- und Ausgang **einen** Anschluss — und je nachdem, welcher es ist, bekommt man drei grundverschiedene Schaltungen:

- **Emitterschaltung** (E): Emitter gemeinsam (liegt am Bezugspotential). Signal rein an die Basis, raus am Kollektor.
- **Kollektorschaltung** (C), auch **Emitterfolger**: Kollektor gemeinsam. Rein an die Basis, raus am Emitter.
- **Basisschaltung** (B): Basis gemeinsam. Rein am Emitter, raus am Kollektor.

Der „gemeinsame" Anschluss bestimmt die Rolle: Wo man hineinspeist, sieht man einen bestimmten Eingangswiderstand — und wo man herausnimmt, einen bestimmten Ausgangswiderstand.[^wp-transistor-grundschaltungen]`,
    },
    {
      id: 'tabelle', type: 'text', title: 'Die drei Schaltungen im Vergleich',
      md: String.raw`
<table>
<tr><th></th><th>Emitterschaltung</th><th>Kollektorschaltung (Emitterfolger)</th><th>Basisschaltung</th></tr>
<tr><td>Spannungsverstärkung $v_U$</td><td>groß (z. B. −50…−100)</td><td>knapp unter 1 (≈ +1)</td><td>groß (+)</td></tr>
<tr><td>Stromverstärkung $v_I$</td><td>$\beta$ (groß)</td><td>$\beta+1$ (groß)</td><td>knapp unter 1 ($\alpha<1$)</td></tr>
<tr><td>Phasenlage</td><td>180°</td><td>0°</td><td>0°</td></tr>
<tr><td>Eingangswiderstand</td><td>mittel (kΩ)</td><td>**hoch**</td><td>**sehr niedrig** ($\approx r_e=U_T/I_E$)</td></tr>
<tr><td>Ausgangswiderstand</td><td>mittel (≈ $R_C$)</td><td>**niedrig**</td><td>hoch (≈ $R_C$)</td></tr>
<tr><td>Typischer Einsatz</td><td>NF-Verstärker, Allzweck</td><td>Impedanzwandler, Puffer</td><td>HF-Verstärker, Vorstufen</td></tr>
</table>

**Emitterfolger:** Die Spannung am Emitter folgt der Basisspannung im Abstand von $U_{BE}\approx0{,}7$ V — daher $v_U\approx1$. Die Spannungsverstärkung ist zwar nur 1, die **Stromverstärkung** aber groß: Der Folger nimmt dem hochohmigen Signalgeber fast keinen Strom weg (hoher Eingangswiderstand $\approx\beta R_E$) und kann trotzdem eine niederohmige Last speisen (kleiner Ausgangswiderstand $\approx r_e+R_S/\beta$). Man nennt das einen **[Impedanzwandler](wiki:Impedanzwandler|Buffer amplifier)**. Die [Gegenkopplung](wiki:Gegenkopplung|Negative feedback) ist hier vollständig: Der gesamte Emitterwiderstand liegt im Signalweg.

**Basisschaltung:** Der Eingang am Emitter ist sehr niederohmig ($r_e$ einige 10 Ω). Für HF ist das Gold wert: Die Basis liegt für Wechselsignale an Masse und schirmt Ein- und Ausgang gegeneinander ab; die Rückwirkung der [Kollektor-Basis-Kapazität](wiki:Miller-Effekt|Miller effect) (Miller-Effekt) wird klein, die Grenzfrequenz hoch.`,
    },
    {
      id: 'calc-re', type: 'numeric', title: 'Eingangswiderstand der Basisschaltung',
      question: String.raw`Der Emitterstrom einer Basisschaltung beträgt $I_E=2\,\text{mA}$, $U_T=25{,}85\,\text{mV}$. Wie groß ist der Eingangswiderstand $r_e=U_T/I_E$ (am Emitter), in Ω?`,
      answer: 12.9, tolerance: 0.2, unit: 'Ω',
      explain: String.raw`$r_e=25{,}85\,\text{mV}/2\,\text{mA}=12{,}9\,\Omega$ — winzig im Vergleich zu den kΩ der Emitterschaltung. Deshalb braucht die Basisschaltung eine niederohmige Quelle.`,
    },
    {
      id: 'calc-rout', type: 'numeric', title: 'Ausgangswiderstand des Emitterfolgers',
      question: String.raw`Ein Emitterfolger mit $\beta=100$, $I_E=2\,\text{mA}$ ($r_e=12{,}9\,\Omega$) wird von einer Quelle mit $R_S=10\,\text{k}\Omega$ gespeist. Wie groß ist sein Ausgangswiderstand $R_\text{aus}\approx r_e+R_S/\beta$, in Ω?`,
      answer: 113, tolerance: 2, unit: 'Ω',
      explain: String.raw`$R_\text{aus}\approx12{,}9\,\Omega+10\,000\,\Omega/100=112{,}9\,\Omega\approx113\,\Omega$. Aus 10 kΩ Quellwiderstand wurden gut 100 Ω — der Folger „übersetzt" die Impedanz um den Faktor $\beta$.`,
    },
    {
      id: 'viz-compare', type: 'viz', viz: 'bjt-config-compare', title: 'Die drei Grundschaltungen im Vergleich',
      intro: String.raw`Alle drei Schaltungen sind an demselben Arbeitspunkt nebeneinander berechnet (AC-Analyse der Schaltungs-Engine bei 1 kHz). Ändere Quellwiderstand $R_S$ und Last $R_L$ und beobachte, wie sich Spannungsverstärkung, Eingangs- und Ausgangswiderstand verändern. Dann beantworte die Fragen.`,
      params: {},
      task: String.raw`Wähle in den drei Fragen die richtige Schaltung: kleinster **Ausgangswiderstand** (Impedanzwandler), **180°** Phasendrehung und kleinster **Eingangswiderstand**.`,
    },
    {
      id: 'match-schaltungen', type: 'match', title: 'Schaltung und Eigenschaft',
      prompt: 'Ordne zu:',
      pairs: [
        ['Emitterschaltung', '180° Phasendrehung, hohe Spannungsverstärkung'],
        ['Kollektorschaltung', 'Spannungsverstärkung ≈ 1, niederohmiger Ausgang'],
        ['Basisschaltung', 'sehr niedriger Eingangswiderstand, HF-tauglich'],
      ],
    },
    {
      id: 'quiz-puffer', type: 'quiz', title: 'Impedanzwandler',
      question: 'Welche Transistorgrundschaltung eignet sich als **Impedanzwandler** (hoher Eingangs-, niedriger Ausgangswiderstand)?',
      options: [
        { text: 'Die Kollektorschaltung (Emitterfolger).', correct: true, why: 'Eingang hochohmig (≈ $\\beta R_E$), Ausgang niederohmig, Spannungsverstärkung ≈ 1.' },
        { text: 'Die Emitterschaltung.', correct: false, why: 'Sie hat mittleren Ein- und Ausgangswiderstand und dreht die Phase.' },
        { text: 'Die Basisschaltung.', correct: false, why: 'Sie hat einen *niedrigen* Eingangs- und hohen Ausgangswiderstand — das Gegenteil.' },
        { text: 'Keine; Transistoren können Impedanzen nicht wandeln.', correct: false, why: 'Gerade das kann der Emitterfolger gut.' },
      ],
    },
    {
      id: 'klassen', type: 'text', title: 'Verstärkerklassen: Linearität gegen Wirkungsgrad',
      md: String.raw`
Wie lange pro Periode des Signals fließt Strom durch den Transistor? Das legt der **Arbeitspunkt** (die Vorspannung) fest, gemessen als **Stromflusswinkel** $\Theta$ ([Verstärkerklasse](wiki:Leistungsverstärker)):

<table>
<tr><th>Klasse</th><th>Stromflusswinkel</th><th>Linearität</th><th>[Wirkungsgrad](wiki:Wirkungsgrad|Energy conversion efficiency) (Maximum, ideal)</th><th>Einsatz</th></tr>
<tr><td>**A**</td><td>360° (immer)</td><td>sehr gut</td><td>25 % (Widerstandslast) / 50 %</td><td>Vorstufen, HiFi, lineare Sender klein</td></tr>
<tr><td>**B**</td><td>180° (eine Halbwelle)</td><td>mäßig (Übernahmeverzerrung)</td><td>78,5 %</td><td>[Gegentakt](wiki:Gegentaktendstufe|Push–pull output)-Endstufen (zwei Transistoren)</td></tr>
<tr><td>**AB**</td><td>180°…360°</td><td>gut</td><td>zwischen A und B</td><td>Audio- und lineare HF-Endstufen (SSB)</td></tr>
<tr><td>**C**</td><td>&lt; 180° (kurze Impulse)</td><td>stark verzerrend</td><td>über 78,5 % (theoretisch bis nahe 100 %)</td><td>Sender [Frequenzmodulation](wiki:Frequenzmodulation|Frequency modulation)/CW (konstante Amplitude)</td></tr>
</table>

**Je kleiner der Stromflusswinkel, desto besser der Wirkungsgrad — und desto schlechter die Linearität.** In Klasse A fließt immer Ruhestrom, auch ohne Signal: viel Verlustleistung, aber ein sauberes Signal. In Klasse C fließt nur in kurzen Stromimpulsen Strom, die Verlustleistung ist klein, aber der Ausgangsstrom ist stark verzerrt (reich an Oberwellen).

**Warum bei Klasse C ein Schwingkreis?** Die Stromimpulse enthalten die Grundwelle und viele [Oberwellen](wiki:Oberschwingung|Harmonic). Ein auf die Grundfrequenz abgestimmter **[Schwingkreis](wiki:Schwingkreis|LC circuit)** als Last schwingt „nach" und füllt die Lücken zwischen den Impulsen (Schwungradeffekt): Am Kreis steht wieder ein Sinus. Ohne den Kreis ist die Ausgangsspannung nicht brauchbar. Deshalb gibt es C-Verstärker nur in der HF-Technik (feste Frequenz, FM/CW) — **nicht** für Sprache in SSB oder AM, denn dort muss die Amplitude linear abgebildet werden.`,
    },
    {
      id: 'viz-klassen', type: 'viz', viz: 'ce-amplifier', title: 'Verstärkerklassen: Stromflusswinkel',
      intro: String.raw`Ein Transistor wird sinusförmig angesteuert; die **Vorspannung** $U_{BE,0}$ legt fest, wann er leitet. Oben die Basis-Emitter-Spannung mit der Schwelle bei 0,6 V, unten der Kollektorstrom $i_C$ und die Ausgangsspannung. Die Presets A, AB, B und C stellen typische Arbeitspunkte ein. Mit der Last **Schwingkreis** siehst du, wie ein Kreis aus den Stromimpulsen wieder einen Sinus macht.`,
      params: { mode: 'klassen' },
      task: String.raw`Stelle nacheinander **Klasse A** ($\Theta\approx360^\circ$), **Klasse B** ($\Theta\approx180^\circ$) und **Klasse C mit Schwingkreis** ($\Theta<150^\circ$, sauberer Sinus) ein.`,
    },
    {
      id: 'order-klassen', type: 'order', title: 'Klassen nach Wirkungsgrad',
      prompt: 'Ordne die Verstärkerklassen nach **steigendem Wirkungsgrad** (niedrigster zuerst):',
      items: ['Klasse A', 'Klasse AB', 'Klasse B', 'Klasse C'],
      explain: 'Je kleiner der Stromflusswinkel (A: 360°, AB: 180–360°, B: 180°, C: < 180°), desto höher der Wirkungsgrad — und umgekehrt die Linearität: A > AB > B > C.',
    },
    {
      id: 'quiz-c', type: 'quiz', title: 'Klasse C braucht Schwingkreis',
      question: 'Warum arbeitet ein C-Verstärker nur sinnvoll mit einem Schwingkreis (oder Filter) am Ausgang?',
      options: [
        { text: 'Der Transistor leitet nur in kurzen Impulsen; der Schwingkreis stellt daraus wieder einen sinusförmigen Verlauf her und unterdrückt Oberwellen.', correct: true, why: 'Die Impulse enthalten viele Oberwellen; der abgestimmte Kreis filtert die Grundwelle heraus.' },
        { text: 'Weil der Schwingkreis den Transistor kühlt.', correct: false, why: 'Der Kreis hat mit der Kühlung nichts zu tun.' },
        { text: 'Weil Klasse C nur mit Gleichspannung am Ausgang arbeitet.', correct: false, why: 'Der Ausgang liefert HF; der Kreis sorgt für das Sinussignal.' },
        { text: 'Weil sonst der Wirkungsgrad schlechter als in Klasse A wäre.', correct: false, why: 'Der Wirkungsgrad hängt vom Stromflusswinkel ab, nicht vom Kreis.' },
      ],
    },
    {
      id: 'warning-schaltungen', type: 'callout', tone: 'warning', title: 'Vorsicht: „Spannungsverstärkung 1" heißt nicht „nutzlos"',
      md: String.raw`
- „Der Emitterfolger verstärkt nichts" — Er verstärkt den **Strom** und damit die **Leistung**; er verändert die **Impedanz**. Er ist der Puffer, der einen empfindlichen Sensor von einer niederohmigen Last entkoppelt.
- „Die Basisschaltung hat keine Verstärkung" — Sie hat hohe **Spannungs**verstärkung, aber Stromverstärkung < 1.
- „Klasse C eignet sich für Sprache (SSB)" — Nein: Die Amplitude wird nicht linear übertragen; C ist für konstante Amplitude (FM, CW) gedacht.
- „Höherer Wirkungsgrad = besser" — Nur, wenn die Linearität nicht gefordert ist.`,
    },
    {
      id: 'mission', type: 'callout', tone: 'mission', title: 'Prüfung & Funkpraxis',
      md: String.raw`
- **Prüfungsbezug:** ED401–ED403 (Verstärker: Leistungsverstärkung, NF-Verstärker, HF-Leistungsverstärker). Phasenlage, Emitterschaltung ohne Emitterkondensator und die Betriebsarten A/B/C von HF-Leistungsverstärkern gehören zur Klasse-A-Prüfung (AD405–AD424); für Klasse E reicht, dass Sender-Endstufen Leistung nur mit Versorgungsspannung verstärken und im Sender nach dem Verstärker meist ein **Tiefpassfilter** gegen Oberwellen sitzt.
- **Praxis:** SSB-Endstufen laufen in AB (linear), FM- und CW-Sender oft in C oder E (hoher Wirkungsgrad, danach Tiefpass). Ein **Emitterfolger** am Ausgang eines VFO oder Mikrofonverstärkers entkoppelt die Quelle von der Last. Die **Basisschaltung** steckt im HF-Vorverstärker (z. B. [Kaskode](wiki:Kaskodenschaltung|Cascode)).
- **Merkhilfe:** *E: Emitter gemeinsam — dreht. C: Kollektor gemeinsam — folgt. B: Basis gemeinsam — hochfrequent.*`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: String.raw`
<table><tr><th>Deutsch</th><th>English</th><th>Notation</th></tr>
<tr><td>Emitterschaltung</td><td>common emitter</td><td>E</td></tr>
<tr><td>Kollektorschaltung, Emitterfolger</td><td>common collector, emitter follower</td><td>C</td></tr>
<tr><td>Basisschaltung</td><td>common base</td><td>B</td></tr>
<tr><td>Impedanzwandler</td><td>impedance buffer, buffer amplifier</td><td></td></tr>
<tr><td>Eingangs-/Ausgangswiderstand</td><td>input / output resistance</td><td>$R_\text{ein}$, $R_\text{aus}$</td></tr>
<tr><td>Verstärkerklasse</td><td>amplifier class</td><td>A, B, AB, C</td></tr>
<tr><td>Stromflusswinkel</td><td>conduction angle</td><td>$\Theta$</td></tr>
<tr><td>Gegentaktendstufe</td><td>push–pull stage</td><td></td></tr>
<tr><td>Übernahmeverzerrung</td><td>crossover distortion</td><td></td></tr></table>`,
    },
    {
      id: 'recall-gegen', type: 'recall', title: 'Erkläre es mit eigenen Worten',
      prompt: 'Wo steckt in der **Kollektorschaltung** die Gegenkopplung — und was bewirkt sie?',
      answer: 'Der Emitterwiderstand liegt komplett im Signalweg: Die Ausgangsspannung am Emitter wird direkt auf den Eingang zurückgeführt ($U_{BE}=u_1-u_2$). Steigt $u_1$, steigt auch $u_2$, die Spannung zwischen Basis und Emitter wächst nur wenig — dadurch bleibt $v_U\\approx1$. Folgen: sehr hoher Eingangswiderstand, niedriger Ausgangswiderstand, kleiner Klirrfaktor.',
      hints: ['Welche Spannung steuert den Transistor — $u_1$ oder $u_1-u_2$?'],
      cards: ['emitterfolger', 'klassen-wirkungsgrad'],
    },
  ],
  cards: [
    { id: 'schaltungen-ueberblick', front: 'Die drei Transistor-Grundschaltungen und ihr gemeinsamer Anschluss?', back: 'E: Emitter gemeinsam (rein Basis, raus Kollektor). C: Kollektor gemeinsam (rein Basis, raus Emitter). B: Basis gemeinsam (rein Emitter, raus Kollektor).' },
    { id: 'emitterschaltung-eigenschaften', front: 'Emitterschaltung: Eigenschaften?', back: 'Hohe $v_U$ und $v_I$, Phase 180°, mittlere Ein-/Ausgangswiderstände.' },
    { id: 'emitterfolger', front: 'Kollektorschaltung (Emitterfolger): Eigenschaften?', back: '$v_U\\approx1$, Phase 0°, Eingang hochohmig, Ausgang niederohmig — Impedanzwandler.' },
    { id: 'basisschaltung', front: 'Basisschaltung: Eigenschaften?', back: 'Hohe $v_U$, $v_I<1$, Phase 0°, Eingang sehr niederohmig ($r_e$), HF-tauglich (kaum Miller-Effekt).' },
    { id: 're', front: 'Eingangswiderstand der Basisschaltung?', back: '$r_e=U_T/I_E\\approx25{,}85\\,\\text{mV}/I_E$ (2 mA → 12,9 Ω).' },
    { id: 'impedanzwandler', front: 'Wozu dient ein Impedanzwandler?', back: 'Entkoppelt eine hochohmige Quelle von einer niederohmigen Last; Spannung bleibt, Strom/Leistung wächst.' },
    { id: 'klassen-wirkungsgrad', front: 'Verstärkerklassen nach Stromflusswinkel und Wirkungsgrad?', back: 'A 360° (gering), AB 180–360°, B 180° (78,5 %), C < 180° (höchster). Linearität fällt in derselben Reihenfolge.' },
    { id: 'klasse-a', front: 'Klasse A: Vor- und Nachteil?', back: 'Sehr linear, aber immer Ruhestrom: niedriger Wirkungsgrad (≤ 50 %).' },
    { id: 'klasse-c', front: 'Klasse C: Vor- und Nachteil, Einsatz?', back: 'Hoher Wirkungsgrad, stark verzerrt; braucht Schwingkreis am Ausgang; für FM/CW, nicht für SSB/AM.' },
    { id: 'klasse-ab', front: 'Klasse AB: wofür?', back: 'Kompromiss: gute Linearität bei höherem Wirkungsgrad als A; für lineare Endstufen (SSB, Audio).' },
    { id: 'miller', front: 'Warum ist die Basisschaltung für HF geeignet?', back: 'Basis liegt für HF an Masse und schirmt Ein- und Ausgang ab; kaum Miller-Effekt → hohe Grenzfrequenz.' },
  ],
};
