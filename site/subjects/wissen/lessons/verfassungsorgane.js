export default {
  id: 'verfassungsorgane',
  title: 'Wer regiert? Die Verfassungsorgane',
  summary: 'Bundestag, Bundesrat, Bundesregierung, Bundespräsident und Bundesverfassungsgericht — wer wen wählt, wer was entscheidet und wie ein Gesetz entsteht.',
  minutes: 25,
  goals: [
    'Die fünf ständigen Verfassungsorgane und ihre Aufgaben nennen',
    'Erklären, wer den [[bundeskanzler|Bundeskanzler]] und den [[bundespraesident|Bundespräsidenten]] wählt',
    '[[konstruktives-misstrauensvotum|Konstruktives Misstrauensvotum]] und [[vertrauensfrage]] unterscheiden',
    'Den Weg eines Gesetzes durch das [[gesetzgebungsverfahren]] beschreiben',
  ],
  blocks: [
    {
      id: 'ueberblick', type: 'figure', title: 'Wer wählt wen?',
      html: `<svg viewBox="0 0 800 450" width="760" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif"><defs><marker id="vo-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="var(--accent)"/></marker></defs><path d="M400 330 V248" fill="none" stroke="var(--accent)" stroke-width="1.8" marker-end="url(#vo-arrow)"/><text x="408" y="294" font-size="11.5" fill="var(--ink-2)" text-anchor="start">wählen alle 4 Jahre</text><path d="M660 330 V248" fill="none" stroke="var(--accent)" stroke-width="1.8" marker-end="url(#vo-arrow)"/><text x="668" y="294" font-size="11.5" fill="var(--ink-2)" text-anchor="start">entsenden Mitglieder</text><path d="M300 212 H244" fill="none" stroke="var(--accent)" stroke-width="1.8" marker-end="url(#vo-arrow)"/><text x="272" y="204" font-size="11.5" fill="var(--ink-2)" text-anchor="middle">alle MdB</text><path d="M660 394 V420 H120 V248" fill="none" stroke="var(--accent)" stroke-width="1.8" marker-end="url(#vo-arrow)"/><text x="390" y="436" font-size="11.5" fill="var(--ink-2)" text-anchor="middle">Landtage entsenden ebenso viele Delegierte</text><path d="M140 180 V98" fill="none" stroke="var(--accent)" stroke-width="1.8" marker-end="url(#vo-arrow)"/><text x="148" y="144" font-size="11.5" fill="var(--ink-2)" text-anchor="start">wählt</text><path d="M400 180 V98" fill="none" stroke="var(--accent)" stroke-width="1.8" marker-end="url(#vo-arrow)"/><text x="408" y="144" font-size="11.5" fill="var(--ink-2)" text-anchor="start">wählt Kanzler · kontrolliert</text><path d="M240 62 H298" fill="none" stroke="var(--accent)" stroke-width="1.8" marker-end="url(#vo-arrow)"/><text x="269" y="54" font-size="11.5" fill="var(--ink-2)" text-anchor="middle">ernennt</text><path d="M500 196 L612 98" fill="none" stroke="var(--accent)" stroke-width="1.8" marker-end="url(#vo-arrow)"/><text x="552" y="170" font-size="11.5" fill="var(--ink-2)" text-anchor="start">wählt 8 Richter</text><path d="M690 180 V98" fill="none" stroke="var(--accent)" stroke-width="1.8" marker-end="url(#vo-arrow)"/><text x="698" y="144" font-size="11.5" fill="var(--ink-2)" text-anchor="start">wählt 8 Richter</text><rect x="40" y="30" width="200" height="64" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="1.6"/><text x="140" y="59" font-size="14" font-weight="700" fill="var(--ink)" text-anchor="middle">Bundespräsident</text><text x="140" y="78" font-size="11" fill="var(--muted)" text-anchor="middle">Staatsoberhaupt · 5 Jahre</text><rect x="300" y="30" width="200" height="64" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="1.6"/><text x="400" y="59" font-size="14" font-weight="700" fill="var(--ink)" text-anchor="middle">Bundesregierung</text><text x="400" y="78" font-size="11" fill="var(--muted)" text-anchor="middle">Kanzler + Minister</text><rect x="560" y="30" width="200" height="64" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="1.6"/><text x="660" y="59" font-size="14" font-weight="700" fill="var(--ink)" text-anchor="middle">Bundesverfassungsgericht</text><text x="660" y="78" font-size="11" fill="var(--muted)" text-anchor="middle">Karlsruhe · 16 Richter</text><rect x="40" y="180" width="200" height="64" rx="12" fill="var(--surface-2)" stroke="var(--line-2)" stroke-width="1"/><text x="140" y="209" font-size="14" font-weight="700" fill="var(--ink)" text-anchor="middle">Bundesversammlung</text><text x="140" y="228" font-size="11" fill="var(--muted)" text-anchor="middle">tritt nur zur Wahl zusammen</text><rect x="300" y="180" width="200" height="64" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="1.6"/><text x="400" y="209" font-size="14" font-weight="700" fill="var(--ink)" text-anchor="middle">Bundestag</text><text x="400" y="228" font-size="11" fill="var(--muted)" text-anchor="middle">630 Abgeordnete · 4 Jahre</text><rect x="560" y="180" width="200" height="64" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="1.6"/><text x="660" y="209" font-size="14" font-weight="700" fill="var(--ink)" text-anchor="middle">Bundesrat</text><text x="660" y="228" font-size="11" fill="var(--muted)" text-anchor="middle">69 Stimmen der Länder</text><rect x="300" y="330" width="200" height="64" rx="12" fill="var(--surface-2)" stroke="var(--line-2)" stroke-width="1"/><text x="400" y="359" font-size="14" font-weight="700" fill="var(--ink)" text-anchor="middle">Wahlberechtigte</text><text x="400" y="378" font-size="11" fill="var(--muted)" text-anchor="middle">ab 18 Jahren</text><rect x="560" y="330" width="200" height="64" rx="12" fill="var(--surface-2)" stroke="var(--line-2)" stroke-width="1"/><text x="660" y="359" font-size="14" font-weight="700" fill="var(--ink)" text-anchor="middle">16 Landesregierungen</text><text x="660" y="378" font-size="11" fill="var(--muted)" text-anchor="middle">gewählt über die Landtage</text></svg>`,
      caption: 'Die ständigen Verfassungsorgane des Bundes und wie sie miteinander verbunden sind. Nur der Bundestag wird direkt vom Volk gewählt.',
    },
    {
      id: 'bundestag', type: 'text', title: 'Der Bundestag: das Herz der Demokratie',
      md: `
Der [[bundestag]] ist das einzige Verfassungsorgan des Bundes, das **direkt vom Volk** gewählt wird — alle vier Jahre. Er tagt im **Reichstagsgebäude** in Berlin und hat vier Hauptaufgaben:

1. **Gesetze beschließen** und den Bundeshaushalt verabschieden,
2. den **Bundeskanzler wählen**,
3. die **Regierung kontrollieren** (Anfragen, Regierungsbefragung, Untersuchungsausschüsse),
4. an der Wahl von Bundespräsident und Verfassungsrichtern mitwirken.

Seit der Wahlrechtsreform hat der Bundestag fest **630 Sitze**; der 2025 gewählte 21. Bundestag wird von **Julia Klöckner** (CDU) geleitet (Stand 2026).[^bundestag-de] Die Bundestagspräsidentin steht in der protokollarischen Rangfolge an zweiter Stelle — direkt hinter dem Bundespräsidenten.`,
    },
    {
      id: 'bundesrat', type: 'text', title: 'Der Bundesrat: die Stimme der Länder',
      md: `
Über den [[bundesrat]] wirken die 16 Länder an der Gesetzgebung des Bundes mit. Seine Mitglieder sind **keine gewählten Abgeordneten**, sondern Mitglieder der Landesregierungen — Ministerpräsidenten und Minister.

Jedes Land hat je nach Einwohnerzahl **3 bis 6 Stimmen**, zusammen **69**. Ein Land muss seine Stimmen **einheitlich** abgeben. Die großen Länder Nordrhein-Westfalen, Bayern, Baden-Württemberg und Niedersachsen haben je 6, Hessen 5, sieben Länder je 4, und Bremen, Hamburg, Mecklenburg-Vorpommern sowie das Saarland je 3 Stimmen.[^bundesrat-de]

Wichtig ist der Unterschied zwischen zwei Gesetzesarten:

- **Zustimmungsgesetze** (etwa wenn Länderfinanzen oder -verwaltung betroffen sind): Ohne Ja des Bundesrates kein Gesetz.
- **Einspruchsgesetze** (alle anderen): Der Bundesrat kann Einspruch erheben, der Bundestag kann ihn aber überstimmen.

Weil in den Ländern oft andere Koalitionen regieren als im Bund, kann der Bundesrat zum Gegengewicht zur Bundesregierung werden.`,
    },
    {
      id: 'numeric-bundesrat', type: 'numeric', title: 'Mehrheit im Bundesrat',
      question: 'Der Bundesrat hat 69 Stimmen. Wie viele Stimmen braucht ein Zustimmungsgesetz mindestens (absolute Mehrheit)?',
      answer: 35, tolerance: 0, unit: 'Stimmen',
      hint: 'Absolute Mehrheit = mehr als die Hälfte aller Stimmen.',
      explain: '69 / 2 = 34,5 — also mindestens **35 Stimmen**. Enthaltungen wirken deshalb im Bundesrat wie Nein-Stimmen: Wer sich enthält, fehlt bei den 35.',
    },
    {
      id: 'regierung', type: 'text', title: 'Kanzler und Regierung',
      md: `
Der [[bundeskanzler]] wird auf Vorschlag des Bundespräsidenten vom Bundestag gewählt. Nötig ist die **Kanzlermehrheit**: die Mehrheit aller Mitglieder, beim 630er-Bundestag also **316 Stimmen**. Der Kanzler schlägt die Minister vor und bestimmt die [[richtlinienkompetenz|Richtlinien der Politik]].

Seit dem **6. Mai 2025** ist **Friedrich Merz** (CDU) Bundeskanzler, an der Spitze einer Koalition aus CDU/CSU und SPD; Vizekanzler ist Lars Klingbeil (SPD) (Stand 2026). Merz verfehlte im ersten Wahlgang die Kanzlermehrheit und wurde erst im zweiten Wahlgang am selben Tag gewählt — das hatte es in der Geschichte der Bundesrepublik zuvor noch nie gegeben.[^wiki-bundeskanzler]

Die [[bundesregierung]] arbeitet nach drei Prinzipien (Art. 65 GG): **Kanzlerprinzip** (Richtlinienkompetenz), **Ressortprinzip** (jeder Minister führt sein Ministerium selbst) und **Kollegialprinzip** (bei Streit entscheidet das Kabinett).`,
    },
    {
      id: 'misstrauen', type: 'text', title: 'Wie wird man einen Kanzler los?',
      md: `
In der Weimarer Republik stürzten wechselnde Mehrheiten Regierungen, ohne neue bilden zu können. Das Grundgesetz macht es deshalb schwer:

- **[[konstruktives-misstrauensvotum|Konstruktives Misstrauensvotum]]** (Art. 67): Der Bundestag kann den Kanzler nur abwählen, indem er **gleichzeitig einen Nachfolger** mit absoluter Mehrheit wählt. Erfolgreich war das bisher nur einmal: **1982**, als Helmut Kohl Helmut Schmidt ablöste.
- **[[vertrauensfrage|Vertrauensfrage]]** (Art. 68): Der Kanzler selbst fragt, ob der Bundestag ihm noch vertraut. Verliert er, kann der Bundespräsident den Bundestag auflösen. Weil der Bundestag sich nicht selbst auflösen darf, ist das der Weg zu **Neuwahlen** — genutzt 1972, 1983, 2005 und zuletzt von Olaf Scholz im Dezember 2024, was zur Bundestagswahl am 23. Februar 2025 führte.`,
    },
    {
      id: 'quiz-misstrauen', type: 'quiz', title: 'Misstrauen oder Vertrauen?',
      question: 'Im Dezember 2024 verlor Olaf Scholz eine Abstimmung im Bundestag, woraufhin es Neuwahlen gab. Welches Instrument war das?',
      options: [
        { text: 'Die Vertrauensfrage nach Art. 68 GG', correct: true, why: 'Scholz stellte sie selbst — mit dem Ziel, sie zu verlieren und so Neuwahlen zu ermöglichen.' },
        { text: 'Ein konstruktives Misstrauensvotum nach Art. 67 GG', correct: false, why: 'Dann hätte der Bundestag zugleich einen neuen Kanzler wählen müssen — und es hätte keine Neuwahl gegeben.' },
        { text: 'Die Selbstauflösung des Bundestages', correct: false, why: 'Ein Selbstauflösungsrecht hat der Bundestag nicht.' },
        { text: 'Eine Entlassung durch den Bundespräsidenten', correct: false, why: 'Der Bundespräsident kann den Kanzler nicht aus eigenem Entschluss entlassen.' },
      ],
    },
    {
      id: 'praesident-gericht', type: 'text', title: 'Staatsoberhaupt und Hüter der Verfassung',
      md: `
Der [[bundespraesident]] ist Staatsoberhaupt, politisch aber bewusst zurückhaltend angelegt — anders als der mächtige Reichspräsident der Weimarer Zeit. Er wird von der [[bundesversammlung]] für **fünf Jahre** gewählt (einmalige Wiederwahl möglich). Er vertritt Deutschland völkerrechtlich, ernennt Kanzler und Minister, unterzeichnet („fertigt aus“) die Gesetze und prüft dabei, ob sie verfassungsgemäß zustande gekommen sind. Amtsinhaber ist seit 2017 **Frank-Walter Steinmeier**; seine zweite Amtszeit endet im März 2027 (Stand 2026).[^wiki-bundespraesident]

Das [[bundesverfassungsgericht]] in **Karlsruhe** wacht über das Grundgesetz. Seine 16 Richterinnen und Richter werden je zur Hälfte von Bundestag und Bundesrat mit Zweidrittelmehrheit gewählt — für 12 Jahre, ohne Wiederwahl. Es kann Gesetze für nichtig erklären, entscheidet über [[verfassungsbeschwerde|Verfassungsbeschwerden]] und über Parteiverbote. Seine Entscheidungen binden alle anderen Staatsorgane.[^bverfg-de]`,
    },
    {
      id: 'match-organe', type: 'match', title: 'Wer macht was?',
      pairs: [
        ['Bundestag', 'wählt den Bundeskanzler'],
        ['Bundesrat', 'vertritt die Länder'],
        ['Bundespräsident', 'fertigt Gesetze aus'],
        ['Bundesversammlung', 'wählt den Bundespräsidenten'],
        ['Bundesverfassungsgericht', 'erklärt Gesetze für nichtig'],
        ['Bundeskanzler', 'bestimmt die Richtlinien der Politik'],
      ],
    },
    {
      id: 'gesetz', type: 'text', title: 'Wie ein Gesetz entsteht',
      md: `
Die meisten Gesetzentwürfe kommen von der Bundesregierung; auch der Bundestag (aus seiner Mitte) und der Bundesrat dürfen Gesetze einbringen. Dann durchläuft ein Gesetz das [[gesetzgebungsverfahren]]: Beratung in drei Lesungen im Bundestag (die eigentliche Arbeit geschieht in den **Ausschüssen**), Abstimmung, Behandlung im Bundesrat — bei Streit im **Vermittlungsausschuss** —, Gegenzeichnung durch Kanzler oder Minister, Ausfertigung durch den Bundespräsidenten und schließlich Verkündung im Bundesgesetzblatt.`,
    },
    {
      id: 'order-gesetz', type: 'order', title: 'Der Weg eines Gesetzes',
      prompt: 'Bringe die Stationen eines Regierungsentwurfs in die richtige Reihenfolge.',
      items: [
        'Die Bundesregierung beschließt einen Gesetzentwurf',
        'Erste Lesung im Bundestag',
        'Beratung in den Ausschüssen',
        'Zweite und dritte Lesung, Schlussabstimmung',
        'Beratung im Bundesrat',
        'Ausfertigung durch den Bundespräsidenten',
        'Verkündung im Bundesgesetzblatt',
      ],
      explain: 'Kleines Detail: Ein Regierungsentwurf geht zuerst sogar zum Bundesrat zur Stellungnahme, bevor er in den Bundestag kommt — die Länder reden also von Anfang an mit.',
    },
    {
      id: 'fact-rang', type: 'callout', tone: 'fact', title: 'Wer ist die Nummer zwei?',
      md: `Die protokollarische Rangfolge lautet: **Bundespräsident, Bundestagspräsident(in), Bundeskanzler, Bundesratspräsident(in), Präsident(in) des Bundesverfassungsgerichts.** Der mächtigste Politiker — der Kanzler — steht also erst an dritter Stelle. Der Vorsitz im Bundesrat wechselt übrigens jedes Jahr am 1. November zwischen den Ministerpräsidenten der Länder.`,
    },
    {
      id: 'recall-gewalten', type: 'recall', title: 'Erkläre es',
      prompt: 'Ordne die Verfassungsorgane den drei Gewalten zu. Warum sagt man trotzdem, dass in Deutschland Parlament und Regierung eng verschränkt sind?',
      answer: `**Legislative**: Bundestag und Bundesrat. **Exekutive**: Bundesregierung (und Bundespräsident als Staatsoberhaupt). **Judikative**: Bundesverfassungsgericht und die übrigen Gerichte. Die Verschränkung: Der Kanzler wird vom Bundestag gewählt und die Regierung stützt sich auf die Parlamentsmehrheit; viele Minister sind selbst Abgeordnete. Die Kontrolle der Regierung übernimmt deshalb vor allem die **Opposition** — die klassische Frontlinie verläuft zwischen Regierungsmehrheit und Opposition, nicht zwischen Parlament und Regierung.`,
      hints: ['Legislative, Exekutive, Judikative.', 'Woher kommt die Mehrheit, auf die sich der Kanzler stützt?'],
      cards: ['gewalten'],
    },
  ],
  cards: [
    { id: 'organe', front: 'Die fünf ständigen Verfassungsorgane des Bundes', back: 'Bundestag, Bundesrat, Bundesregierung, Bundespräsident, Bundesverfassungsgericht (dazu die nicht ständige Bundesversammlung und der Gemeinsame Ausschuss).' },
    { id: 'direkt', front: 'Welches Verfassungsorgan des Bundes wird direkt vom Volk gewählt?', back: 'Nur der **Bundestag**.' },
    { id: 'sitze', front: 'Wie viele Sitze hat der Bundestag seit der Wahlrechtsreform?', back: '**630** (erstmals bei der Wahl 2025).' },
    { id: 'kanzlermehrheit', front: 'Was ist die Kanzlermehrheit — und wie hoch ist sie beim 630er-Bundestag?', back: 'Die Mehrheit aller Mitglieder des Bundestages: **316 Stimmen**.' },
    { id: 'kanzler', front: 'Wer ist Bundeskanzler (Stand 2026) und seit wann?', back: '**Friedrich Merz** (CDU), seit dem **6. Mai 2025** — erst im zweiten Wahlgang gewählt.' },
    { id: 'praesident', front: 'Wer ist Bundespräsident (Stand 2026)?', back: '**Frank-Walter Steinmeier**, seit 2017; die zweite Amtszeit endet im März 2027.' },
    { id: 'bv', front: 'Wie setzt sich die Bundesversammlung zusammen?', back: 'Alle Bundestagsabgeordneten plus **ebenso viele** von den Landtagen gewählte Delegierte.' },
    { id: 'br-stimmen', front: 'Wie viele Stimmen hat der Bundesrat, und wie viele hat ein Land?', back: '**69** Stimmen insgesamt; je nach Einwohnerzahl **3 bis 6** pro Land, einheitlich abzugeben.' },
    { id: 'zustimmung', front: 'Unterschied Zustimmungsgesetz / Einspruchsgesetz', back: 'Zustimmungsgesetz: Der Bundesrat muss zustimmen, sonst scheitert es. Einspruchsgesetz: Sein Einspruch kann vom Bundestag überstimmt werden.' },
    { id: 'misstrauen', front: 'Was ist das konstruktive Misstrauensvotum — und wann war es erfolgreich?', back: 'Abwahl des Kanzlers nur durch gleichzeitige Wahl eines Nachfolgers (Art. 67 GG). Einziger Erfolg: **1982**, Kohl löste Schmidt ab.' },
    { id: 'vertrauen', front: 'Wozu dient die Vertrauensfrage in der Praxis?', back: 'Als Weg zu **vorgezogenen Neuwahlen** (Art. 68 GG), weil der Bundestag sich nicht selbst auflösen kann — zuletzt Scholz, Dezember 2024.' },
    { id: 'bverfg', front: 'Bundesverfassungsgericht: Sitz, Zahl der Richter, Amtszeit?', back: '**Karlsruhe**, **16** Richter in zwei Senaten, **12 Jahre** ohne Wiederwahl; je zur Hälfte von Bundestag und Bundesrat gewählt.' },
    { id: 'bp-amtszeit', front: 'Amtszeit des Bundespräsidenten?', back: '**Fünf Jahre**, eine Wiederwahl ist möglich.' },
    { id: 'regprinzipien', front: 'Die drei Prinzipien der Bundesregierung (Art. 65 GG)', back: 'Kanzlerprinzip (Richtlinienkompetenz), Ressortprinzip, Kollegialprinzip.' },
    { id: 'gewalten', front: 'Welche Organe gehören zu Legislative, Exekutive, Judikative?', back: 'Legislative: Bundestag, Bundesrat. Exekutive: Bundesregierung (und Verwaltung). Judikative: Gerichte, darunter das Bundesverfassungsgericht.' },
    { id: 'rang', front: 'Protokollarische Rangfolge der ersten drei', back: '1. Bundespräsident, 2. Bundestagspräsident(in), 3. Bundeskanzler.' },
  ],
};
