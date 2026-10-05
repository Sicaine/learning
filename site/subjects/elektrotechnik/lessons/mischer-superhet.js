const svgSuper = `<svg viewBox="0 0 680 190" role="img" aria-label="Blockschaltbild des Überlagerungsempfängers" style="width:100%;height:auto;max-width:680px;font-family:inherit">
<defs><marker id="ah" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="var(--ink-2)"/></marker></defs>
<g fill="none" stroke="var(--ink-2)" stroke-width="1.6" marker-end="url(#ah)">
<path d="M22 70 H70"/><path d="M146 70 H190"/><path d="M232 70 H286"/><path d="M386 70 H430"/><path d="M510 70 H550"/><path d="M606 70 H640"/><path d="M252 150 V92"/></g>
<g fill="var(--surface)" stroke="var(--ink)" stroke-width="1.6">
<rect x="72" y="46" width="74" height="48" rx="6"/><rect x="288" y="46" width="98" height="48" rx="6"/><rect x="432" y="46" width="78" height="48" rx="6"/><rect x="552" y="46" width="54" height="48" rx="6"/></g>
<circle cx="211" cy="70" r="21" fill="var(--surface)" stroke="var(--ink)" stroke-width="1.6"/><path d="M198 57 L224 83 M224 57 L198 83" stroke="var(--ink)" stroke-width="1.6"/>
<rect x="212" y="150" width="82" height="30" rx="6" fill="var(--surface)" stroke="var(--warn)" stroke-width="1.8"/>
<g font-size="12" fill="var(--ink)" text-anchor="middle">
<text x="109" y="66">Vorselektion</text><text x="109" y="82">(HF-Filter)</text>
<text x="337" y="66">ZF-Filter und</text><text x="337" y="82">ZF-Verstärker</text>
<text x="471" y="66">Demodu-</text><text x="471" y="82">lator</text>
<text x="579" y="66">NF</text><text x="579" y="82">-Teil</text>
<text x="253" y="170" fill="var(--ink)">Oszillator f_OSZ</text>
<text x="211" y="118" fill="var(--ink-2)">Mischer</text>
<text x="48" y="58" fill="var(--ink-2)">f_E</text>
<text x="259" y="58" fill="var(--ink-2)">f_ZF</text></g>
</svg>`;

export default {
  id: 'mischer-superhet',
  title: 'Mischer, Zwischenfrequenz, Spiegelfrequenz',
  summary: 'Wie ein Mischer Summen- und Differenzfrequenz erzeugt, warum fast jeder Empfänger ein Überlagerungsempfänger ist (f_ZF = |f_E − f_OSZ|), und was die Spiegelfrequenz f_S = 2·f_OSZ − f_E mit der Vorselektion zu tun hat.',
  minutes: 30,
  needs: ['modulation', 'fourier-spektrum'],
  goals: [
    'Erklären, wie ein [[mischer|Mischer]] aus zwei Frequenzen die Summe und die Differenz bildet (Multiplikation bzw. nichtlineare Kennlinie)',
    'Den [[ueberlagerungsempfaenger|Überlagerungsempfänger (Superhet)]] mit [[oszillator|Oszillator]], [[zwischenfrequenz|Zwischenfrequenz]] und ZF-Filter in einem Blockschaltbild erklären',
    'Die Oszillatorfrequenz und die [[spiegelfrequenz|Spiegelfrequenz]] bei gegebener Empfangs- und Zwischenfrequenz berechnen: $f_\\text{ZF}=|f_E-f_\\text{OSZ}|$, $f_S=2f_\\text{OSZ}-f_E$',
    'Begründen, warum man eine [[vorselektion|Vorselektion]] braucht und was eine hohe erste ZF bringt',
  ],
  blocks: [
    {
      id: 'intuition', type: 'text', title: 'Schwebung: aus zwei Frequenzen wird eine neue',
      md: String.raw`
Zwei Gitarrensaiten, die fast gleich gestimmt sind, erzeugen eine **Schwebung**: einen auf- und abschwellenden Ton, dessen Takt genau der **Frequenzdifferenz** entspricht. Das ist das Grundprinzip der Frequenzumsetzung: Zwei Schwingungen $f_1$ und $f_2$ werden *multipliziert*, und mit dem Additionstheorem des Cosinus entstehen **Summe und Differenz**:

$$ \cos(2\pi f_1 t)\cdot\cos(2\pi f_2 t) = \tfrac12\cos\bigl(2\pi (f_1-f_2)t\bigr)+\tfrac12\cos\bigl(2\pi (f_1+f_2)t\bigr) $$

Ein **[Mischer](wiki:Mischer (Elektronik)|Frequency mixer)** ist eine Schaltung, die genau das tut. Aus 28 MHz und 38,7 MHz werden 10,7 MHz (Differenz) und 66,7 MHz (Summe). Welche der beiden Frequenzen man braucht, entscheidet das nachfolgende **Filter**.

Das Prinzip nennt man auch [Heterodynprinzip](wiki:Heterodynprinzip|Heterodyne detection) („anders-kraftig“, Überlagerung). Der Ingenieur [Edwin Howard Armstrong](wiki:Edwin Howard Armstrong|Edwin Howard Armstrong) entwickelte daraus um 1918 den **Überlagerungsempfänger**, das *Superheterodyne*, kurz **Superhet** oder „Super“.[^armstrong-us1342885]`,
    },
    {
      id: 'mischer-physik', type: 'text', title: 'Wie arbeitet ein Mischer?',
      md: String.raw`
Eine lineare Schaltung (Widerstand, Kondensator, Verstärker im linearen Bereich) erzeugt *nie* neue Frequenzen. Dafür braucht man eine **Nichtlinearität** oder einen **Multiplizierer**:

- **Multiplizierer** (Gilbert-Zelle, Ringmischer mit Dioden): $u_\text{aus}\propto u_1\cdot u_2$ liefert genau die Summe und die Differenz.
- **Nichtlineare Kennlinie** (z. B. Diode oder Transistor im Krümmungsbereich): ein quadratischer Anteil $a\,(u_1+u_2)^2$ enthält den **Kreuzterm** $2a\,u_1u_2$ — das ist wieder das Produkt. Dazu entstehen aber auch Oberwellen von $f_1$ und $f_2$ und weitere Mischprodukte, die man mit Filtern abtrennt.

Am Ausgang des Mischers liegen also (neben Resten der Eingänge) $f_1+f_2$ und $|f_1-f_2|$. Ein **Balancemischer** (Doppelbalancemischer, DBM) unterdrückt zusätzlich die beiden Eingangssignale selbst — er verwendet man auch zur DSB-/SSB-Erzeugung.

Ungewollte Mischung heißt **[Intermodulation](wiki:Intermodulation|Intermodulation)**: Zwei starke Signale in einem übersteuerten Empfängereingang mischen sich zu Phantomsignalen (EJ120).[^50ohm-lerninhalte]`,
    },
    {
      id: 'calc-mix', type: 'numeric', title: 'Mischprodukte',
      question: String.raw`Einem Mischer werden $136\,\text{MHz}$ und $145\,\text{MHz}$ zugeführt. Welche **Differenzfrequenz** entsteht? (Die Summe wäre 281 MHz.)`,
      answer: 9, tolerance: 0.05, unit: 'MHz',
      explain: String.raw`$|145-136|\,\text{MHz} = 9\,\text{MHz}$ und $145+136 = 281\,\text{MHz}$. Beim Katalogbeispiel werden genau diese beiden Frequenzen als „erwünschte Produkte“ genannt (EF204, EF205).`,
    },
    {
      id: 'superhet', type: 'text', title: 'Der Überlagerungsempfänger',
      md: String.raw`
Ein Empfänger muss aus Tausenden von Signalen *eins* herausfiltern. Mit abstimmbaren Filtern hoher Güte geht das schlecht (die Bandbreite eines LC-Kreises wächst mit seiner Frequenz: $B=f_0/Q$). Armstrongs Trick: Man **schiebt jedes Signal** auf eine **feste Zwischenfrequenz** (ZF) und filtert dort, mit einem einmal fest abgestimmten, sehr guten Filter.

Dazu mischt man das Eingangssignal $f_E$ mit einem **einstellbaren Oszillator** $f_\text{OSZ}$ (VFO oder PLL). Die Differenz wird zur ZF:

$$ f_\text{ZF} = |f_E - f_\text{OSZ}| $$

Man stellt den Oszillator so, dass der gewünschte Sender genau auf die ZF fällt. Abgestimmt wird also **nur der Oszillator**, ZF-Filter und -Verstärker bleiben fest.`,
    },
    {
      id: 'fig-super', type: 'figure', title: 'Blockschaltbild eines Einfachsupers',
      html: svgSuper,
      caption: 'Antenne → Vorselektion → Mischer (mit Oszillator) → ZF-Filter und -Verstärker → Demodulator → NF. Die Trennschärfe bestimmt das ZF-Filter, die Spiegelunterdrückung die Vorselektion.',
    },
    {
      id: 'zf-text', type: 'text', title: 'Welche Zwischenfrequenz? Und welche Oszillatorlage?',
      md: String.raw`
Gebräuchliche Zwischenfrequenzen:

- **455 kHz** — klassische AM-Rundfunkempfänger ([Mittelwelle](wiki:Mittelwelle|Medium frequency)), Keramik- und mechanische Filter.
- **10,7 MHz** — [UKW-Rundfunk](wiki:UKW-Rundfunk|FM broadcasting) und viele UKW-/VHF-Empfänger für FM.
- **9 MHz** — Kurzwellen-SSB-Transceiver, mit einem steilen [Quarzfilter](wiki:Quarzfilter|Crystal filter) für etwa 2,4 kHz Bandbreite.

Der Oszillator kann **unter** der Empfangsfrequenz schwingen ($f_\text{OSZ}=f_E-f_\text{ZF}$, „untere Lage“) oder **darüber** ($f_\text{OSZ}=f_E+f_\text{ZF}$, „obere Lage“). Beispiel: Für Empfang auf **145 MHz** mit ZF = **10,7 MHz** und unterer Lage braucht man $f_\text{OSZ}=145-10{,}7=134{,}3$ MHz. Die obere Lage wäre 155,7 MHz. Beide Lagen funktionieren; sie unterscheiden sich in der Spiegelfrequenz — und bei SSB in der Seitenbandlage (beim Mischen auf der „falschen“ Seite des Oszillators kehrt sich das Seitenband um).`,
    },
    {
      id: 'calc-osz', type: 'numeric', title: 'Oszillatorfrequenz',
      question: String.raw`Ein Superhet soll $f_E = 145\,\text{MHz}$ mit der ZF $f_\text{ZF} = 10{,}7\,\text{MHz}$ empfangen. Der Oszillator liegt **unterhalb** der Empfangsfrequenz. Wie groß ist $f_\text{OSZ}$?`,
      answer: 134.3, tolerance: 0.05, unit: 'MHz',
      explain: String.raw`$f_\text{OSZ} = f_E - f_\text{ZF} = 145 - 10{,}7 = 134{,}3\,\text{MHz}$.`,
    },
    {
      id: 'calc-zf', type: 'numeric', title: 'ZF aus Empfangs- und Oszillatorfrequenz',
      question: String.raw`Ein Empfänger ist auf $f_E = 7{,}1\,\text{MHz}$ abgestimmt, der Oszillator schwingt mit $f_\text{OSZ} = 7{,}555\,\text{MHz}$. Wie groß ist die Zwischenfrequenz in kHz?`,
      answer: 455, tolerance: 1, unit: 'kHz',
      explain: String.raw`$f_\text{ZF} = |7{,}1-7{,}555|\,\text{MHz} = 0{,}455\,\text{MHz} = 455\,\text{kHz}$ — die klassische AM-ZF.`,
    },
    {
      id: 'demo-superhet', type: 'viz', viz: 'superhet-lab', title: 'Mischer, ZF-Fenster und Spiegelstörer',
      intro: String.raw`Oben siehst du, was an der Antenne ankommt: dein **Nutzsignal** $f_E$, einen starken **Störer**, den Oszillator $f_\text{OSZ}$ (orange) und die Durchlasskurve der **Vorselektion**. Unten steht das Spektrum **hinter dem Mischer** (Differenzfrequenzen) mit dem ZF-Filterfenster (grün). Nur was im Fenster landet, wird verstärkt und demoduliert.`,
      params: { fE: 145e6, zf: 10.7e6 },
      task: String.raw`Stelle den **Oszillator** so ein, dass das Nutzsignal bei 145 MHz in die ZF (10,7 MHz) fällt. Setze dann den **Störer** auf die **Spiegelfrequenz** (Taste) — er kommt ebenfalls durch! — und verringere schließlich die **Vorselektions-Bandbreite**, bis er um mindestens 40 dB geschwächt ist.`,
      caption: 'Die Spiegelfrequenz liegt symmetrisch zum Nutzsignal auf der anderen Seite des Oszillators, 2·f_ZF von f_E entfernt. Das ZF-Filter kann sie nicht mehr unterdrücken, nur die Vorselektion davor.',
    },
    {
      id: 'spiegel', type: 'text', title: 'Die Spiegelfrequenz — der Haken am Superhet',
      md: String.raw`
Der Mischer kennt die Differenz $|f-f_\text{OSZ}|$ — und die ist für **zwei** Eingangsfrequenzen gleich: $f_E=f_\text{OSZ}+f_\text{ZF}$ und $f_S=f_\text{OSZ}-f_\text{ZF}$. Beide landen auf der ZF. Ein Sender auf der zweiten Frequenz stört den Empfang des ersten, ohne dass das ZF-Filter ihn trennen kann. Das ist die **[Spiegelfrequenz](wiki:Spiegelfrequenz|Image frequency)** (der „Spiegel“ von $f_E$ am Oszillator):

$$ f_S = 2\,f_\text{OSZ}-f_E \qquad\Longleftrightarrow\qquad f_S = f_E \pm 2 f_\text{ZF} $$

Das Plus gilt bei oberer, das Minus bei unterer Oszillatorlage. Beispiel: $f_E=145$ MHz, $f_\text{OSZ}=134{,}3$ MHz → $f_S = 2\cdot134{,}3-145 = 123{,}6$ MHz (=$145-2\cdot10{,}7$). Auf 123,6 MHz liegt Flugfunk; wäre dort ein starker Sender, hörte man ihn auf 145 MHz mit.

**Was hilft?**

1. **Vorselektion** — ein abstimmbares Bandfilter *vor* dem Mischer, das die Spiegelfrequenz dämpft. Es muss nur $2f_\text{ZF}$ neben $f_E$ trennen.
2. **Hohe (erste) ZF** — dann liegt der Spiegel weit weg und ist leicht auszufiltern (Klasse-A-Stoff: AF109–AF111). **Niedrige ZF** wiederum erlaubt scharfe, schmale ZF-Filter. Darum der **Doppelsuper** mit hoher erster ZF (gute Spiegelunterdrückung) und niedriger zweiter ZF (gute Trennschärfe).
3. Bei **Direktmischern** (SDR, einfache Telegrafieempfänger) liegt der Oszillator *direkt auf* der Empfangsfrequenz ($f_\text{ZF}=0$): Das Problem verschwindet nicht, es heißt dann „Gegenseitenband“ und wird mit zwei Mischern (I/Q) gelöst (EF208).

**Konverter** schließlich sind vorgeschaltete Mischer: Ein 2-m-Konverter mischt 144–146 MHz mit einem 116-MHz-Oszillator auf 28–30 MHz herunter, die ein Kurzwellenempfänger dann als „ZF“ verarbeitet. Das Gegenstück zum Senden heißt **Transverter**.`,
    },
    {
      id: 'calc-spiegel', type: 'numeric', title: 'Spiegelfrequenz berechnen',
      question: String.raw`Ein Superhet ist auf $f_E = 145\,\text{MHz}$ abgestimmt, $f_\text{ZF}=10{,}7\,\text{MHz}$, Oszillator unterhalb ($134{,}3$ MHz). Auf welcher Frequenz liegt die Spiegelfrequenz?`,
      answer: 123.6, tolerance: 0.05, unit: 'MHz',
      hint: String.raw`$f_S = 2f_\text{OSZ} - f_E$ oder $f_E - 2f_\text{ZF}$.`,
      explain: String.raw`$f_S = 2\cdot134{,}3 - 145 = 123{,}6\,\text{MHz}$. Probe: $145 - 2\cdot10{,}7 = 123{,}6$ MHz ✓. Der Abstand $2f_\text{ZF}=21{,}4$ MHz ist groß genug, dass schon ein einfaches Bandfilter vor dem Mischer den Spiegel dämpfen kann.`,
    },
    {
      id: 'calc-spiegel2', type: 'numeric', title: 'Spiegel bei oberer Oszillatorlage',
      question: String.raw`Ein Kurzwellenempfänger hat die ZF $9\,\text{MHz}$ und ist auf $f_E=14{,}2\,\text{MHz}$ abgestimmt, der Oszillator liegt **oberhalb** ($f_\text{OSZ}=23{,}2\,\text{MHz}$). Wie hoch ist die Spiegelfrequenz?`,
      answer: 32.2, tolerance: 0.05, unit: 'MHz',
      explain: String.raw`$f_S = 2\cdot23{,}2-14{,}2 = 32{,}2\,\text{MHz} = f_E+2f_\text{ZF}$ ✓ (bei oberer Lage liegt der Spiegel über dem Nutzsignal).`,
    },
    {
      id: 'quiz-vorsel', type: 'quiz', title: 'Wozu die Vorselektion?',
      question: 'Warum braucht ein Superhet eine Vorselektion (Eingangsfilter vor dem Mischer)?',
      options: [
        { text: 'Um die Spiegelfrequenz zu unterdrücken, die das ZF-Filter nicht mehr abtrennen kann.', correct: true, why: 'Nutzsignal und Spiegel landen im Mischer auf derselben ZF; nur vorher lassen sie sich noch trennen.' },
        { text: 'Um die ZF zu erzeugen.', correct: false, why: 'Die ZF entsteht im Mischer aus Eingang und Oszillator.' },
        { text: 'Um den Oszillator zu stabilisieren.', correct: false, why: 'Das macht Quarz oder PLL, nicht ein Eingangsfilter.' },
        { text: 'Um die Empfangsfrequenz zu verdoppeln.', correct: false, why: 'Das ist keine Aufgabe eines Filters; dafür gäbe es Vervielfacher.' },
      ],
    },
    {
      id: 'quiz-spiegel-lage', type: 'quiz', title: 'Wo liegt der Spiegel?',
      question: 'Wo liegt die Spiegelfrequenz relativ zur Empfangsfrequenz $f_E$ bei einem Einfachsuper?',
      options: [
        { text: 'Im Abstand $2\\cdot f_\\text{ZF}$ von $f_E$, auf der anderen Seite des Oszillators.', correct: true, why: 'Katalog Klasse A: „Das Doppelte der ZF“ (AF106, AF201).' },
        { text: 'Bei $2\\cdot f_E$.', correct: false, why: 'Das wäre die 2. Oberwelle — Verwechslung mit Oberwellen.' },
        { text: 'Im Abstand $f_\\text{ZF}$ von $f_E$.', correct: false, why: 'Im Abstand $f_\\text{ZF}$ liegt der Oszillator, nicht der Spiegel.' },
        { text: 'Bei $f_E + f_\\text{OSZ}$ (Summenfrequenz).', correct: false, why: 'Die Summenfrequenz liegt weit oben und wird vom ZF-Filter ausgesiebt.' },
      ],
    },
    {
      id: 'order-super', type: 'order', title: 'Signalweg im Überlagerungsempfänger',
      prompt: 'Bringe die Stufen eines Einfachsupers in die Reihenfolge, in der das Signal sie durchläuft.',
      items: ['Antenne', 'Vorselektion (HF-Bandfilter)', 'Mischer (zusammen mit dem Oszillator)', 'ZF-Filter und ZF-Verstärker', 'Demodulator', 'NF-Verstärker und Lautsprecher'],
      explain: 'Die Selektion im ZF-Teil bestimmt die Trennschärfe (Nachbarkanäle), die Vorselektion verhindert Spiegelempfang.',
    },
    {
      id: 'warning-spiegel', type: 'callout', tone: 'warning', title: 'Typische Fehlvorstellungen',
      md: String.raw`
- „**Die Spiegelfrequenz liegt bei $2f_E$.**“ — Nein: Sie liegt **$2\cdot f_\text{ZF}$** neben $f_E$. Merke: *Spiegel = ± 2·ZF.*
- „**Der Mischer addiert die Signale.**“ — Addieren (z. B. in einem Widerstandsnetzwerk) erzeugt **keine** neuen Frequenzen. Mischen = multiplizieren / nichtlinear.
- „**Das ZF-Filter schützt vor dem Spiegel.**“ — Zu spät: Hinter dem Mischer sind Nutz- und Spiegelsignal ununterscheidbar.`,
    },
    {
      id: 'mission-super', type: 'callout', tone: 'mission', title: 'Prüfung & Funkpraxis',
      md: String.raw`
- **Prüfungsbezug (Klasse E):** Mischfrequenzen berechnen — 28 MHz + 38,7 MHz → 10,7 MHz und 66,7 MHz (EF202); 30 MHz und 39 MHz → 9 MHz und 69 MHz (EF203); 136 MHz und 145 MHz → 9 MHz und 281 MHz (EF204, EF205); Oszillatorlage beim Direktüberlagerungsempfänger (EF208); Phantomsignale durch Intermodulation (EJ120); übersteuerter Empfängereingang → Dämpfungsglied (EF217).
- **Ausblick Klasse A:** Spiegelfrequenz $=$ doppelte ZF Abstand (AF106, AF201); Zahlenbeispiele AF107, AF108, AF202; hohe erste ZF für gute Spiegelunterdrückung (AF110, AF111).
- **Praxis:** Wenn du auf 2 m ein fremdes Signal hörst, das „eigentlich nicht da sein dürfte“, kann es der **Spiegel** eines starken Senders im Abstand $2f_\text{ZF}$ sein — dreh den Empfänger ein wenig, wenn sich das Störsignal in die andere Richtung bewegt, ist es ein Spiegel.`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: String.raw`
<table><tr><th>Deutsch</th><th>English</th><th>Notation</th></tr>
<tr><td>Mischer</td><td>mixer</td><td></td></tr>
<tr><td>Überlagerungsempfänger, „Superhet“, „Super“</td><td>superheterodyne receiver</td><td></td></tr>
<tr><td>Zwischenfrequenz (ZF)</td><td>intermediate frequency (IF)</td><td>$f_\text{ZF}$</td></tr>
<tr><td>Oszillator (VFO)</td><td>local oscillator (LO)</td><td>$f_\text{OSZ}$</td></tr>
<tr><td>Spiegelfrequenz</td><td>image frequency</td><td>$f_S$</td></tr>
<tr><td>Vorselektion</td><td>preselector, front-end filter</td><td></td></tr>
<tr><td>Doppelsuper</td><td>double-conversion receiver</td><td></td></tr>
<tr><td>Direktmischer</td><td>direct-conversion receiver</td><td></td></tr>
<tr><td>Konverter / Transverter</td><td>converter / transverter</td><td></td></tr></table>`,
    },
    {
      id: 'recall-mischer', type: 'recall', title: 'Erkläre es mit eigenen Worten',
      prompt: 'Was passiert im Mischer mit zwei Sinus-Signalen $f_1$ und $f_2$, wenn die Kennlinie nichtlinear ist? Welche Frequenzen liegen am Ausgang, und wie wählt man die gewünschte aus?',
      answer: 'Die nichtlineare Kennlinie enthält einen quadratischen Anteil, in dem das Produkt $u_1\\cdot u_2$ steckt. Mit dem Additionstheorem entstehen die Summe $f_1+f_2$ und die Differenz $|f_1-f_2|$, daneben die Eingänge selbst, Oberwellen und weitere Mischprodukte. Ein Filter hinter dem Mischer (im Superhet das ZF-Filter) lässt nur die gewünschte Frequenz durch, meist die Differenz.',
      hints: ['Welche Formel verbindet das Produkt zweier Cosinus mit Summe und Differenz?', 'Was macht das ZF-Filter?'],
      cards: ['mischprodukte', 'f-zf'],
    },
  ],
  cards: [
    { id: 'mischprodukte', front: 'Welche Frequenzen entstehen im Mischer aus $f_1$ und $f_2$?', back: 'Summe $f_1+f_2$ und Differenz $|f_1-f_2|$ (plus Reste der Eingänge, Oberwellen, Intermodulation).' },
    { id: 'mischer-prinzip', front: 'Warum erzeugt ein Mischer neue Frequenzen, ein Verstärker nicht?', back: 'Multiplikation bzw. nichtlineare Kennlinie. Lineare Schaltungen erzeugen keine neuen Frequenzen.' },
    { id: 'f-zf', front: 'Zwischenfrequenz im Superhet?', back: '$f_\\text{ZF} = |f_E - f_\\text{OSZ}|$' },
    { id: 'f-osz', front: 'Oszillatorfrequenz bei unterer/oberer Lage?', back: 'Untere Lage: $f_\\text{OSZ}=f_E-f_\\text{ZF}$; obere Lage: $f_\\text{OSZ}=f_E+f_\\text{ZF}$.' },
    { id: 'f-spiegel', front: 'Spiegelfrequenz?', back: '$f_S = 2f_\\text{OSZ}-f_E = f_E \\pm 2 f_\\text{ZF}$ (Abstand 2·ZF von $f_E$).' },
    { id: 'spiegel-bsp', front: 'Spiegelfrequenz für $f_E=145$ MHz, ZF 10,7 MHz, Oszillator unten?', back: '$f_\\text{OSZ}=134{,}3$ MHz, $f_S = 123{,}6$ MHz.' },
    { id: 'vorsel', front: 'Wozu dient die Vorselektion im Superhet?', back: 'Dämpft die Spiegelfrequenz (und Außerband-Signale) vor dem Mischer — das ZF-Filter kann sie nicht mehr trennen.' },
    { id: 'zf-werte', front: 'Typische Zwischenfrequenzen?', back: '455 kHz (AM-Rundfunk), 10,7 MHz (UKW/FM), 9 MHz (KW-SSB mit Quarzfilter).' },
    { id: 'hohe-zf', front: 'Vorteil einer hohen bzw. niedrigen ZF?', back: 'Hohe ZF: Spiegel weit weg, leicht zu unterdrücken. Niedrige ZF: schmale, steile Filter möglich → Doppelsuper kombiniert beides.' },
    { id: 'direktmischer', front: 'Was ist ein Direktmischer?', back: 'Der Oszillator liegt auf der Empfangsfrequenz ($f_\\text{ZF}=0$); das Basisband wird direkt abgegriffen (SDR, einfache CW/SSB-Empfänger).' },
    { id: 'konverter', front: 'Was ist ein Konverter?', back: 'Ein vorgeschalteter Mischer setzt ein Band auf einen anderen Frequenzbereich um (z. B. 144 MHz → 28 MHz). Sendeseitig: Transverter.' },
  ],
};
