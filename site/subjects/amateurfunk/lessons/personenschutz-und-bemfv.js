export default {
  id: 'personenschutz-und-bemfv',
  title: 'Personenschutz, Sicherheitsabstand und BEMFV-Anzeige',
  summary: 'Warum elektromagnetische Felder Menschen gefährden können, welche Grenzwerte gelten, wann eine Anzeige nach BEMFV nötig ist und wie du den Sicherheitsabstand berechnest und dokumentierst.',
  minutes: 25,
  goals: [
    'Begründen, warum ein Funkamateur den [[personenschutz|Personenschutz]] in elektromagnetischen Feldern kennen muss (Wärmewirkung, aktive Körperhilfen)',
    'Entscheiden, ob eine ortsfeste Amateurfunkanlage nach § 9 [[bemfv|BEMFV]] angezeigt werden muss (ab 10 W [[eirp|EIRP]]), und den Ablauf mit Unterlagen beschreiben',
    'Mit der Näherungsformel den [[sicherheitsabstand|Sicherheitsabstand]] berechnen und prüfen, ob die Fernfeldformel gültig ist (d > λ/2π)',
    'Standortbescheinigung, Anzeige und Selbstverantwortung des Betreibers voneinander abgrenzen',
  ],
  needs: ['elektrotechnik/dezibel', 'elektrotechnik/wellen-felder-antennen-intro'],
  blocks: [
    {
      id: 'warum', type: 'text', title: 'Warum Personenschutz?',
      md: String.raw`
Die Funkwellen deiner Antenne sind **elektromagnetische Felder**: Ein elektrisches und ein magnetisches Feld breiten sich gemeinsam aus. Wer sich darin aufhält, nimmt Energie auf. Bei hohen Sendeleistungen kann das den Körper schädigen und **aktive Körperhilfen** (z. B. [Herzschrittmacher](wiki:Herzschrittmacher|Pacemaker), [Insulinpumpen](wiki:Insulinpumpe|Insulin pump), [Cochlea-Implantate](wiki:Cochlea-Implantat|Cochlear implant)) stören. Deshalb muss jeder Funkamateur wissen, wie man Menschen in der Umgebung seiner Antenne schützt.[^darc-50ohm]

Das [Bundesamt für Strahlenschutz](wiki:Bundesamt für Strahlenschutz|Bundesamt für Strahlenschutz) fasst die biologische Wirkung hochfrequenter Felder so zusammen:

- Hochfrequente Felder werden vom Körper **aufgenommen**.
- Die Stärke der Energieaufnahme hängt von **Stärke und Frequenz** der Felder ab.
- Eindeutig nachgewiesen sind **Kraftwirkungen und eine Wärmewirkung**.
- Die **Wärmewirkung** ist ausschlaggebend für mögliche gesundheitliche Wirkungen.

Daraus folgt eine Prüfungsaussage: Die **Grenzwerte** der Feldstärke sind **frequenzabhängig**, *weil die Fähigkeit des Körpers, HF-Strahlung zu absorbieren, frequenzabhängig ist* (siehe [[spezifische-absorptionsrate|spezifische Absorptionsrate]], [Spezifische Absorptionsrate](wiki:Spezifische Absorptionsrate|Specific absorption rate)). Nicht gemeint sind „niederfrequente Felder sind energiereicher“, „auf manchen Bändern sind höhere Leistungen erlaubt“ oder „die Absorptionsrate ist bei manchen Frequenzen nicht messbar“.`,
    },
    {
      id: 'mission-erste-antenne', type: 'callout', tone: 'mission', title: 'Funkpraxis: Bevor die erste Antenne aufs Dach geht',
      md: String.raw`Die Regeln dieser Lektion betreffen dich, sobald du eine **feste Antenne** aufbaust: Dachdipol, Vertikal auf dem Balkon, Yagi auf dem Mast. Dann stellst du dir (und gegebenenfalls der Behörde) zwei Fragen: *Wie viel Strahlungsleistung kommt heraus?* und *Wo darf sich während des Sendens niemand aufhalten?* Mit den Formeln aus der Formelsammlung kannst du beides in einer Minute abschätzen, bevor du das erste Mal sendest.`,
    },
    {
      id: 'recht', type: 'text', title: 'Wer regelt was? EMVU, 26. BImSchV und BEMFV',
      md: String.raw`
Die Abkürzung **EMVU** steht für *Elektromagnetische Verträglichkeit in der **Umwelt*** (nicht „von Geräten“, das ist die gewöhnliche EMV). Die Grenzwerte für ortsfeste Sendeanlagen stehen in zwei Verordnungen:[^bemfv]

- in der **26. Verordnung zur Durchführung des Bundes-Immissionsschutzgesetzes** (26. BImSchV, „Verordnung über elektromagnetische Felder“)[^bimschv26] und
- in der **Verordnung über das Nachweisverfahren zur Begrenzung elektromagnetischer Felder (BEMFV)**. Sie verweist für den Frequenzbereich 9 kHz bis 300 GHz auf die Grenzwerte der 26. BImSchV und fügt für 9 kHz bis 50 MHz die Werte für **aktive Körperhilfen** hinzu (§ 3 BEMFV).

Das *Verfahren* zum Schutz von Personen in den Feldern ortsfester Amateurfunkstellen ist in der **BEMFV** festgelegt, nicht im Amateurfunkgesetz, nicht in den Radio Regulations und nicht im Bundes-Immissionsschutzgesetz selbst. Verantwortlich für die Einhaltung ist der **Betreiber der ortsfesten Amateurfunkstelle**, nicht die Bundesnetzagentur, nicht der Gerätehersteller und nicht der Antennenbauer.

Das **Anzeigeverfahren** ist ein **Privileg der Funkamateure**: Sie dürfen die Einhaltung der Grenzwerte *selbst* ermitteln und dokumentieren. Andere Betreiber von Sendeanlagen (etwa Mobilfunknetz-Betreiber) benötigen dafür eine kostenpflichtige Standortbescheinigung der Bundesnetzagentur.

**Zeitbezug der Grenzwerte** (26. BImSchV): Weil nicht ständig gesendet wird, gilt in der Regel der **quadratische Mittelwert (Effektivwert) über 6 Minuten** (Anhang 1b). Daneben gibt es den **kurzfristigen Effektivwert** (Anhang 1a) und den **momentanen Spitzenwert** (Anhang 3, gepulste Felder). Für **aktive Körperhilfen** gilt der **maximale Momentanwert**. Ein wichtiger Wert ist **28 V/m** im Bereich 10 bis 400 MHz. Die Grenzwerte musst du **nicht auswendig lernen**: In der Prüfung stehen sie in der Aufgabe.[^darc-50ohm]`,
    },
    {
      id: 'warn-recht', type: 'callout', tone: 'warning', title: 'Vorsicht, Verwechslungen',
      md: String.raw`- **EMVU ≠ EMV.** EMVU ist die Verträglichkeit mit der *Umwelt* (Menschen), EMV die Verträglichkeit von *Geräten*.
- **Die Anzeige ist keine Standortbescheinigung.** Sie ist die **verbindliche Erklärung** (nicht unverbindlich) des Funkamateurs über die eigenverantwortliche Einhaltung der Personenschutz-Grenzwerte, nicht „des Bundesimmissionsschutzgesetzes“ und nicht nur für nichtkommerzielle Anlagen.
- **Ein zertifiziertes Messlabor ist nicht nötig.** Du darfst rechnen oder messen und dokumentierst nachvollziehbar.
- **„750 W“ spielt hier keine Rolle:** Maßgeblich ist die **EIRP ab 10 W**, nicht 750 W PEP oder ERP.
- **Prüfungsbezug:** VE501, VE502, VE503, VE504, VE505, VE511, EK101, EK102, EK103, NK201.`,
    },
    {
      id: 'anzeige', type: 'text', title: 'Wann ist eine Anzeige nötig? Ab 10 W EIRP, nur ortsfest',
      md: String.raw`
Nach **§ 9 Abs. 1 BEMFV** muss der Betreiber einer **ortsfesten Amateurfunkanlage** mit einer **äquivalenten isotropen Strahlungsleistung (EIRP) von 10 Watt oder mehr** diese **vor Inbetriebnahme** bei der Bundesnetzagentur **anzeigen** (Stand 05.10.2026).[^bemfv] Vier Dinge entscheiden:

1. **Ortsfest.** Portabel- oder Mobilbetrieb löst *keine* Anzeigepflicht aus. Auch die Zeugnisklasse oder das Band (Kurzwelle) spielen keine Rolle.
2. **EIRP, nicht Senderleistung.** Maßgeblich ist die [äquivalente isotrope Strahlungsleistung](wiki:Äquivalente isotrope Strahlungsleistung|Equivalent isotropically radiated power), also die Strahlungsleistung der Antenne in Hauptstrahlrichtung, nicht die Leistung am Senderausgang und auch nicht die ERP (siehe Lektion zu ERP und EIRP). Auf die Anzeige verzichten darfst du nur, wenn die EIRP **kleiner als 10 W** ist.
3. **Betriebsart und Sendedauer zählen nicht.** Auch bei FM oder bei Sendezeiten unter 6 Minuten pro Stunde entfällt die Anzeigepflicht nicht: Der 6-Minuten-Mittelwert steckt bereits im Grenzwert. Ebenso gibt es **keinen „standardisierten Sicherheitsabstand“** (etwa 10 m oder 25 m bis 100 W PEP): Du musst rechnen oder messen.
4. **Gesamtleistung am Standort.** Zum **Standort** gehören alle Funkanlagen auf demselben Mast oder in unmittelbarer Nähe (die Sicherheitsabstände überschneiden sich).

Die EIRP rechnest du aus Senderleistung $P_\mathrm{S}$ (am Senderausgang), Kabeldämpfung $a$ und [Antennengewinn](wiki:Antennengewinn|Gain (antenna)) $g_\mathrm{d}$ (bezogen auf den Halbwellendipol):

$$P_\mathrm{EIRP} = P_\mathrm{S}\cdot 10^{\frac{g_\mathrm{d}-a+2{,}15\,\mathrm{dB}}{10\,\mathrm{dB}}}$$

Der Summand $2{,}15\,\text{dB}$ rechnet den Dipolgewinn auf den [isotropen Strahler](wiki:Isotropstrahler|Isotropic radiator) um (dBd → dBi). Im Kopf: Gewinne und Dämpfungen in sinnvolle Faktoren ([Dezibel](wiki:Dezibel|Bel (unit))-Merkwerte) zerlegen ($3\,\text{dB}\approx 2$, $6\,\text{dB}\approx 4$, $10\,\text{dB}=10$, $2{,}15\,\text{dBi}\approx 1{,}64$).[^bnetza-formelsammlung]

**Beispiel:** $5\,\text{W}$ an einer Yagi mit $10\,\text{dBd}$ und $0\,\text{dB}$ Kabeldämpfung: $P_\mathrm{EIRP}\approx5\,\text{W}\cdot10\cdot1{,}64\approx 82\,\text{W}$. Obwohl der Sender klein ist, ist die Anlage **anzeigepflichtig**. Umgekehrt: Ein $10$-W-Sender an einem Dipol mit $3\,\text{dB}$ Kabeldämpfung strahlt nur etwa $8\,\text{W}$ EIRP: **keine** Anzeige.

**Besonderheit Standort mit anderen Funkanlagen:** Befinden sich am vorgesehenen Standort bereits ortsfeste Funkanlagen, die selbst eine Standortbescheinigung brauchen, so benötigt auch deine Anlage eine **Standortbescheinigung** (§ 8 Abs. 1 BEMFV), sofern die **Gesamtleistung am Standort 10 W EIRP erreicht oder überschreitet**. Nur in diesem Fall kann die Bundesnetzagentur eine Standortbescheinigung für deine Station fordern, nicht schon bei „gewerblicher Nutzung“ oder bei 750 W.`,
    },
    {
      id: 'calc-eirp', type: 'numeric', title: 'Strahlungsleistung berechnen',
      question: String.raw`Ein Sender gibt $P_\mathrm{S} = 25\,\text{W}$ ab. Das Koaxialkabel dämpft mit $a = 2\,\text{dB}$, die Antenne hat $g_\mathrm{d} = 6\,\text{dBd}$. Berechne die Strahlungsleistung $P_\mathrm{EIRP}$.`,
      answer: 103, tolerance: 3, unit: 'W',
      hint: 'Gesamtgewinn: $6\\,\\text{dBd} - 2\\,\\text{dB} + 2{,}15\\,\\text{dB} = 6{,}15\\,\\text{dB}$. Dann $25\\,\\text{W}\\cdot10^{0{,}615}$.',
      explain: String.raw`$P_\mathrm{EIRP}=25\,\text{W}\cdot10^{(6-2+2{,}15)/10}=25\,\text{W}\cdot10^{0{,}615}\approx25\,\text{W}\cdot4{,}12\approx 103\,\text{W}$. Mit Faktoren im Kopf: $4\,\text{dB}\approx 2{,}5$, mal $1{,}64$ ergibt $\approx 4{,}1$, also etwa $102\,\text{W}$. Die Anlage ist anzeigepflichtig (≥ 10 W EIRP).`,
    },
    {
      id: 'abstand', type: 'text', title: 'Den Sicherheitsabstand berechnen',
      md: String.raw`
Der **[[sicherheitsabstand|Sicherheitsabstand]]** ist der Abstand um die Antenne, in dem die Grenzwerte **nicht** eingehalten werden: Dort darf sich während des Sendens keine unbefugte Person aufhalten. Die BEMFV unterscheidet den *systembezogenen* Abstand einer einzelnen Antenne und den *standortbezogenen* Abstand unter Einbeziehung anderer Anlagen am Standort. Die Näherungsformel für die [elektrische Feldstärke](wiki:Elektrische Feldstärke|Electric field strength) im Fernfeld steht in der Formelsammlung:[^bnetza-formelsammlung]

$$E=\frac{\sqrt{30\,\Omega\cdot P_\mathrm{EIRP}}}{d}\qquad\Longrightarrow\qquad d=\frac{\sqrt{30\,\Omega\cdot P_\mathrm{EIRP}}}{E}$$

Dabei ist $E$ der **Grenzwert** der Feldstärke (z. B. $28\,\text{V/m}$) und $d$ der gesuchte Abstand.

**Beispiel:** $P_\mathrm{EIRP}=650\,\text{W}$, $E=28\,\text{V/m}$:

$$d=\frac{\sqrt{30\,\Omega\cdot650\,\text{W}}}{28\,\text{V/m}}=\frac{\sqrt{19500}\,\text{V}}{28\,\text{V/m}}\approx\frac{139{,}6}{28}\,\text{m}\approx 5\,\text{m}$$

**Wichtig: Die Formel gilt nur im Fernfeld.** Direkt an der Antenne liegt das **reaktive Nahfeld**, in dem sich elektrisches und magnetisches Feld nicht wie in einer Welle verhalten. Die Näherungsformel ist erst ab dem Abstand

$$d>\frac{\lambda}{2\pi}$$

zulässig (Fernfeld bzw. strahlendes Nahfeld; dort liefert sie eine **konservative** Abschätzung, die tatsächlichen Feldstärken sind geringer). Liegt dein Ergebnis **unter** $\lambda/2\pi$, ist die Berechnung **ungültig**: Du musst messen (E- *und* H-Feld), simulieren oder eine Nahfeldberechnung durchführen.

<table>
<tr><th>Band</th><th>Wellenlänge</th><th>λ/2π (Nahfeldgrenze)</th></tr>
<tr><td>160 m</td><td>≈ 160 m</td><td>≈ **25,5 m**</td></tr>
<tr><td>80 m</td><td>≈ 80 m</td><td>≈ **12,7 m**</td></tr>
<tr><td>10 m</td><td>≈ 10 m</td><td>≈ 1,6 m</td></tr>
</table>

Bei einem $3{,}5$-MHz-Dipol mit $100\,\text{W}$ ergibt die Formel nur wenige Meter, aber das liegt deutlich im Nahfeld (Grenze $13{,}6\,\text{m}$ bei $\lambda = 85{,}7\,\text{m}$): Das Ergebnis ist **wertlos**.

**Von wo aus gilt der Abstand?** Von **jedem Punkt der Antenne** aus (nicht nur vom Einspeisepunkt, nicht von der Mastbefestigung, nicht vom untersten Punkt): Die ganze Antennenstruktur strahlt.`,
    },
    {
      id: 'calc-abstand', type: 'numeric', title: 'Sicherheitsabstand rechnen',
      question: String.raw`Die Station aus der vorigen Aufgabe strahlt $P_\mathrm{EIRP} = 103\,\text{W}$. Der Grenzwert beträgt $E = 28\,\text{V/m}$. Wie groß ist der Sicherheitsabstand (Fernfeldnäherung)?`,
      answer: 2.0, tolerance: 0.1, unit: 'm',
      hint: 'Erst das Produkt $30\\,\\Omega\\cdot P$ bilden, dann die Wurzel, dann durch $E$ teilen.',
      explain: String.raw`$d=\sqrt{30\cdot103}/28=\sqrt{3090}/28\approx 55{,}6/28\approx 2{,}0\,\text{m}$. Bei 10 m Wellenlänge liegt die Nahfeldgrenze bei $\lambda/2\pi\approx 1{,}6\,\text{m}$, bei 20 m bei $3{,}2\,\text{m}$. Auf 28 MHz (10 m) ist die Rechnung gültig, auf 14 MHz wäre das Ergebnis ungültig.`,
    },
    {
      id: 'calc-nahfeld', type: 'numeric', title: 'Nahfeldgrenze',
      question: String.raw`Bis zu welchem Abstand ist die Näherungsformel für die Fernfeldberechnung bei $f = 7{,}1\,\text{MHz}$ ungültig? Berechne $\lambda/(2\pi)$ mit $\lambda = c/f$ und $c\approx 3\cdot10^{8}\,\text{m/s}$.`,
      answer: 6.7, tolerance: 0.2, unit: 'm',
      hint: 'Erst $\\lambda$ in Metern, dann durch $2\\pi \\approx 6{,}28$ teilen.',
      explain: String.raw`$\lambda=3\cdot10^8/7{,}1\cdot10^6\approx 42{,}3\,\text{m}$; $\lambda/2\pi\approx 6{,}7\,\text{m}$. Ergebnisse unterhalb dieser Entfernung sind nicht gültig.`,
    },
    {
      id: 'demo-rechner', type: 'viz', viz: 'sicherheitsabstand-rechner', title: 'Demo: Sicherheitsabstands-Rechner',
      intro: 'Stelle Frequenz, Senderleistung, Kabeldämpfung und Antennengewinn ein. Der Rechner zeigt EIRP, Sicherheitsabstand, Nahfeldgrenze und ob eine Anzeige nötig ist, dazu eine Draufsicht auf dein Grundstück.',
      params: { goals: ['anzeige', 'nah', 'ok'] },
      task: 'Erreiche (1) eine **Anzeigepflicht**, (2) das **Nahfeld-Ergebnis** (z. B. ein 80-m-Dipol mit 100 W, also niedrige Frequenz) und (3) eine **anzeigepflichtige Station mit gültiger Rechnung**, deren Sicherheitsabstand auf deinem Grundstück liegt (Leistung oder Gewinn senken oder Grundstücksabstand vergrößern).',
    },
    {
      id: 'verfahren', type: 'text', title: 'Die Anzeige: Verfahren und Unterlagen',
      md: String.raw`
Der Ablauf nach § 9 BEMFV und der Anleitung der Bundesnetzagentur:[^bemfv][^bnetza-bemfv-anleitung]

1. **EIRP ermitteln** (siehe oben).
2. **Sicherheitsabstand bestimmen:** rechnerisch oder messtechnisch, in **nachvollziehbarer Form dokumentiert**. Dabei sind **alle Aussendungen** zu berücksichtigen, die du **zeitgleich** durchzuführen beabsichtigst (nicht nur die maximale Sendeleistung der Anlage). Überlappen die Sicherheitsabstände mehrerer Antennen, so sind die **betroffenen Antennen gemeinsam zu betrachten**, sofern gleichzeitig gesendet werden soll; es gilt nicht „der Abstand der stärksten Antenne“ und kein Sicherheitsfaktor je Antenne.
3. **Prüfen:** Der standortbezogene Sicherheitsabstand muss im **kontrollierbaren Bereich** liegen, also dort, wo du über Zutritt und Aufenthalt von Personen bestimmen kannst (in der Regel das eigene Grundstück) (§ 8 Abs. 2 BEMFV).
4. **Anzeigen:** Die Anzeige geht **vor Betriebsaufnahme** an die **zuständige Außenstelle** der [Bundesnetzagentur](wiki:Bundesnetzagentur|Federal Network Agency) (nicht an eine beliebige, nicht nach drei Monaten). Beizufügen ist eine **nachvollziehbare zeichnerische Darstellung** des standortbezogenen Sicherheitsabstands und des kontrollierbaren Bereichs.
5. **Unterlagen bereithalten** (nicht mit der Anzeige einreichen): Dokumentation über die Einhaltung der Anforderungen, **Antennendiagramme** (bei handelsüblichen Antennen), **Lageplan**, bei Montage auf einem Bauwerk eine **Bauzeichnung oder Skizze mit Bemaßung** (Seitenansicht und Draufsicht) und die **Konfiguration der Anlage** einschließlich Sendeleistung. Auf Verlangen legst du sie der Bundesnetzagentur vor (vgl. auch § 16 Abs. 5 AFuV: technische Unterlagen und Skizze der Antennenanlage **auf Anforderung**; nicht bei jeder Änderung und nicht automatisch nach Erhalt der Zulassung).[^afuv]
6. **Aktuell halten:** Du bist auch nach der Anzeige verpflichtet zu prüfen, ob deine Angaben **noch zutreffen**. Entspricht die Anzeige nicht mehr den Gegebenheiten (zweiter Mast, Antennenwechsel, höhere Leistung mit größerem Abstand), **führst du das Anzeigeverfahren erneut durch**. Eine jährliche Erneuerung gibt es nicht; auch ein Wechsel der Zeugnisklasse ändert nichts.

**Verfahren zum Nachweis** (alle erlaubt, kein Labor nötig): das **Bewertungsverfahren mit der Software „Watt Wächter“** der Bundesnetzagentur, das **vereinfachte Bewertungsverfahren**, **Feldstärkemessung**, **Fernfeldberechnung** und **Nahfeldberechnung**. Für 9 kHz bis 3 GHz gilt außerdem: Du sorgst dafür, dass **Träger aktiver Körperhilfen** geschützt sind (§ 10 BEMFV), gegebenenfalls mit einem „Ergänzungsbereich“, in dem du dafür sorgst, dass sich während des Betriebs niemand mit Implantat aufhält (§ 8 Abs. 3).

Schlüsselwort in den Prüfungsfragen ist oft **„nachvollziehbar“**: Gefordert ist eine verständliche Darstellung, keine amtliche Zertifizierung.`,
    },
    {
      id: 'order-anzeige', type: 'order', title: 'Ablauf der BEMFV-Anzeige',
      prompt: 'Bringe die Schritte in die richtige Reihenfolge.',
      items: [
        'EIRP aus Senderleistung, Kabeldämpfung und Antennengewinn berechnen',
        'Sicherheitsabstand rechnen oder messen und nachvollziehbar dokumentieren',
        'Prüfen, dass der Sicherheitsabstand im kontrollierbaren Bereich liegt',
        'Anzeige mit zeichnerischer Darstellung vor Betriebsaufnahme bei der zuständigen Außenstelle einreichen',
        'Unterlagen bereithalten und laufend prüfen, ob die Anzeige noch stimmt; bei wesentlicher Änderung neu anzeigen',
      ],
      explain: 'Erst rechnen, dann prüfen, dann anzeigen, danach dokumentiert bleiben. Die Unterlagen gehen nicht mit der Anzeige raus, sondern liegen am Standort bereit.',
    },
    {
      id: 'match-unterlagen', type: 'match', title: 'Unterlage → Was passiert damit?',
      prompt: 'Ordne zu.',
      pairs: [
        ['Anzeigeformblätter und zeichnerische Darstellung von Sicherheitsabstand und kontrollierbarem Bereich', 'Werden vor Betriebsaufnahme bei der zuständigen Außenstelle der BNetzA eingereicht'],
        ['Dokumentation, Antennendiagramme, Lageplan, Skizze mit Bemaßung, Konfiguration', 'Werden bereitgehalten und auf Verlangen vorgelegt'],
        ['Standortbescheinigung', 'Wird auf Antrag kostenpflichtig von der BNetzA ausgestellt'],
        ['Anzeige, die nicht mehr den Gegebenheiten entspricht', 'Anzeigeverfahren erneut durchführen'],
      ],
    },
    {
      id: 'standort', type: 'text', title: 'Standortbescheinigung statt Selbsterklärung',
      md: String.raw`
Wer die Berechnung nicht selbst machen möchte, kann wie jeder andere Betreiber einer Sendeanlage bei der Bundesnetzagentur eine **Standortbescheinigung beantragen** (§ 7 Abs. 3 AFuG; § 4 BEMFV).[^afug] Das ist **immer kostenpflichtig**, und du musst alle Unterlagen liefern: Lageplan, Bauzeichnung mit Montageort der Antennen, Informationen zum Abstrahlverhalten aller Antennen. Die BNetzA stellt sie *auf Antrag* aus, nicht automatisch mit der Zuteilung des Rufzeichens, und das Tool „Watt Wächter“ erstellt sie nicht (es ist ein Bewertungsverfahren für deine Selbsterklärung).`,
    },
    {
      id: 'quiz-anzeige', type: 'quiz', title: 'Anzeigepflicht?',
      question: 'Welche dieser Stationen musst du nach § 9 BEMFV bei der Bundesnetzagentur anzeigen? (Dipol: 0 dBd. Näherung: 0 dBd entspricht Faktor 1,64 EIRP/Sendeleistung.)',
      options: [
        { text: 'Ortsfest: 5 W Senderleistung, Yagi mit 10 dBd, vernachlässigbare Kabeldämpfung (≈ 82 W EIRP)', correct: true, why: 'EIRP ≈ 5 W · 10 · 1,64 ≈ 82 W, also ≥ 10 W: Die ortsfeste Anlage muss vor Inbetriebnahme angezeigt werden.' },
        { text: 'Ortsfest: 10 W Senderleistung, Dipol, 3 dB Kabeldämpfung (≈ 8 W EIRP)', why: 'EIRP ≈ 10 W · 0,5 · 1,64 ≈ 8 W, also unter 10 W: keine Anzeige. Die Senderleistung allein entscheidet nicht.' },
        { text: 'Portabel (Feldtag): 100 W Senderleistung, Yagi mit 7 dBd', why: 'Das Verfahren gilt nur für ortsfeste Amateurfunkanlagen; Portabel- und Mobilbetrieb sind nicht anzeigepflichtig.' },
        { text: 'Ortsfest: 2 W Senderleistung, Dipol ohne Kabeldämpfung (≈ 3,3 W EIRP)', why: 'EIRP ≈ 2 W · 1,64 ≈ 3,3 W, also unter 10 W: keine Anzeige.' },
      ],
    },
    {
      id: 'quiz-mehrfach', type: 'quiz', title: 'Zwei Antennen, ein Standort',
      question: 'Du betreibst zwei Sendeantennen. Beide haben einen Sicherheitsabstand von etwa 3 m und stehen 2 m voneinander entfernt auf demselben Dach. Du willst auf beiden gleichzeitig senden. Was folgt?',
      options: [
        { text: 'Die Sicherheitsabstände überlappen; die Antennen sind gemeinsam zu betrachten.', correct: true, why: 'Überlappende Sicherheitsabstände mit gleichzeitigem Senden bedeuten gemeinsame Betrachtung; sie bilden einen gemeinsamen Standort.' },
        { text: 'Es gilt nur der Sicherheitsabstand der Antenne mit der größten Strahlungsleistung.', why: 'Nein: Beide Felder addieren sich im Überlappungsbereich.' },
        { text: 'Der Abstand wird mit der Anzahl der Antennen multipliziert.', why: 'Einen solchen Sicherheitsfaktor gibt es nicht.' },
        { text: 'Du musst den Betrieb auf eine Antenne beschränken.', why: 'Nicht zwingend: Du betrachtest beide gemeinsam, sofern du gleichzeitig senden willst.' },
      ],
    },
    {
      id: 'video-personenschutz', type: 'video', youtube: 'ccNmXv1ev_8', label: 'Amateurfunkvorlesung Klasse E: 19. Antennen und Leitungen (Teil 3) und 20. Personenschutz', channel: 'Computer Engineering @ JMU Würzburg',
      why: 'Aufzeichnung der Vorlesung der Universität Würzburg; laut Titel behandelt sie im Anschluss an die Antennen den Personenschutz.',
    },
    {
      id: 'recall-schutz', type: 'recall', title: 'In eigenen Worten',
      prompt: 'Du baust eine feste Yagi auf. Erkläre in einem kurzen Text: Wann musst du die Station anzeigen, was musst du dafür berechnen oder messen, worauf musst du bei der Fernfeldformel achten, und was gilt, wenn andere Funkanlagen am Standort stehen?',
      answer: 'Ortsfeste Amateurfunkanlagen mit einer EIRP von 10 W oder mehr muss ich vor Betriebsaufnahme bei der zuständigen Außenstelle der BNetzA anzeigen (BEMFV § 9). Ich berechne die EIRP aus Senderleistung, Kabeldämpfung und Antennengewinn (dBd plus 2,15 dB) und ermittle mit d = Wurzel(30 Ω · EIRP) / E den Sicherheitsabstand für den Grenzwert E; er muss im kontrollierbaren Bereich (eigenes Grundstück) liegen. Die Formel gilt nur im Fernfeld ab d > λ/(2π); sonst muss ich messen, simulieren oder eine Nahfeldberechnung machen. Alle gleichzeitigen Aussendungen und überlappende Antennen betrachte ich gemeinsam. Die Unterlagen (Dokumentation, Lageplan, Antennendiagramme, Skizze) halte ich bereit; ändert sich die Anlage wesentlich, zeige ich neu an. Stehen am Standort schon ortsfeste Funkanlagen und erreicht die Gesamtleistung 10 W EIRP, kann eine Standortbescheinigung nötig sein.',
      cards: ['ps-anzeige', 'ps-abstand', 'ps-nahfeld'],
    },
    {
      id: 'fact-aktive', type: 'callout', tone: 'fact', title: 'Hintergrund: Aktive Körperhilfen',
      md: String.raw`**Aktive Körperhilfen** sind Implantate wie Herzschrittmacher, Insulinpumpen und Cochlea-Implantate. Für sie gelten zusätzlich eigene Grenzwerte (Normen DIN EN 50527-1 und -2-1, Frequenzbereich 9 kHz bis 50 MHz, § 3 BEMFV) und besonders strenge Zeitbezüge: **maximaler Momentanwert** statt 6-Minuten-Mittel. Wer eine solche Anlage betreibt, muss den Schutz der Träger in geeigneter Art ermöglichen (§ 10 BEMFV, 9 kHz bis 3 GHz) und die Maßnahmen dokumentieren.[^bemfv]`,
    },
  ],
  cards: [
    { id: 'ps-warum', front: 'Warum muss ein Funkamateur Personenschutz kennen?', back: 'Weil **zu hohe Feldstärken in Antennennähe schädigend** auf den menschlichen Körper wirken können (Wärmewirkung, aktive Körperhilfen).' },
    { id: 'ps-frequenz', front: 'Warum sind Feldstärkegrenzwerte frequenzabhängig?', back: 'Weil die **Fähigkeit des Körpers, HF zu absorbieren**, frequenzabhängig ist.' },
    { id: 'ps-emvu', front: 'Was bedeutet EMVU? Wer ist verantwortlich?', back: '**E**lektromagnetische **V**erträglichkeit in der **U**mwelt. Verantwortlich: der **Betreiber** der ortsfesten Amateurfunkstelle.' },
    { id: 'ps-recht', front: 'Wo stehen Grenzwerte und Verfahren zum Personenschutz?', back: 'Grenzwerte: **26. BImSchV** und **BEMFV**. Das **Verfahren** für ortsfeste Amateurfunkanlagen: **BEMFV**.' },
    { id: 'ps-zeit', front: 'Zeitbezug der Feldstärke: 26. BImSchV (Anhang 1b)? Aktive Körperhilfen?', back: 'Anhang 1b: **quadratisch gemittelt über 6 min** (1a: kurzfristiger Effektivwert; Anhang 3: momentaner Spitzenwert). **Aktive Körperhilfen: maximaler Momentanwert.**' },
    { id: 'ps-anzeige', front: 'Wer muss anzeigen? Wann, wo?', back: 'Betreiber **ortsfester** Amateurfunkstellen ab **10 W EIRP**; **vor Betriebsaufnahme** bei der **zuständigen Außenstelle** der BNetzA (§ 9 BEMFV).' },
    { id: 'ps-status', front: 'Welchen Status hat die Anzeige?', back: '**Verbindliche Erklärung** des Funkamateurs über die eigenverantwortliche Einhaltung der Grenzwerte (Selbsterklärung). Kein Messlabor nötig.' },
    { id: 'ps-unterlagen', front: 'Welche Unterlagen gehören zur Anzeige, welche werden bereitgehalten?', back: 'Mit der Anzeige: **zeichnerische Darstellung** von Sicherheitsabstand und kontrollierbarem Bereich. Bereithalten: **Dokumentation**, Antennendiagramme, Lageplan, Skizze mit Bemaßung, Konfiguration.' },
    { id: 'ps-neu', front: 'Wann ist die Anzeige erneut einzureichen?', back: 'Wenn sie **nicht mehr den tatsächlichen Gegebenheiten entspricht**. Nicht jährlich, nicht bei Klassenwechsel.' },
    { id: 'ps-verfahren', front: 'Nachweisverfahren für den Personenschutz?', back: '**Watt Wächter**, vereinfachtes Bewertungsverfahren, **Feldstärkemessung**, **Fernfeld-** und **Nahfeldberechnung**.' },
    { id: 'ps-abstand', front: 'Formel für den Sicherheitsabstand?', back: '$d=\\dfrac{\\sqrt{30\\,\\Omega\\cdot P_\\mathrm{EIRP}}}{E}$; Fernfeldformel gilt für $d>\\dfrac{\\lambda}{2\\pi}$. Abstand gilt von **jedem Punkt der Antenne**.' },
    { id: 'ps-nahfeld', front: 'Fernfeldformel gültig? Nahfeldgrenze für 160 m und 80 m?', back: 'Ergebnis muss **größer als λ/2π** sein: **160 m: 25,5 m; 80 m: 12,7 m.** Kleiner heißt ungültig: messen oder Nahfeld rechnen.' },
    { id: 'ps-mehrfach', front: 'Mehrere Antennen oder gleichzeitige Aussendungen: Was gilt?', back: 'Alle **zeitgleichen** Aussendungen zählen; **überlappende** Sicherheitsabstände: betroffene Antennen **gemeinsam** betrachten.' },
    { id: 'ps-standort', front: 'Standortbescheinigung: wann, von wem?', back: 'Auf **Antrag** von der BNetzA (kostenpflichtig). Die BNetzA kann sie fordern, wenn am Standort **bereits ortsfeste Funkanlagen** stehen, die selbst eine brauchen und die **Gesamtleistung ≥ 10 W EIRP** erreicht.' },
  ],
};
