export default {
  id: 'gesellschaft-wandel',
  title: 'Gesellschaft im Wandel',
  summary: 'Weniger Kinder, mehr Ältere, mehr Vielfalt, volle Städte und leere Dörfer: die großen Trends, die Deutschland verändern.',
  minutes: 20,
  goals: [
    'Die drei Treiber des [[demografischer-wandel|demografischen Wandels]] erklären',
    'Die großen Einwanderungsphasen seit 1955 nennen',
    'Begriffe wie [[migrationshintergrund|Migrationshintergrund]] und [[urbanisierung|Urbanisierung]] einordnen',
    'Folgen für Rente, Arbeitsmarkt und ländliche Räume beschreiben',
  ],
  blocks: [
    {
      id: 'zahlen', type: 'text', title: 'Deutschland in Zahlen',
      md: `
In Deutschland leben rund **83,6 Millionen** Menschen (2024) — so viele wie in keinem anderen EU-Land.[^wiki-demografie] Doch diese Zahl verdeckt tiefgreifende Veränderungen:

- **Geburtenrate**: Im Schnitt bekommt eine Frau rund **1,35 Kinder** (2023). Für eine stabile Bevölkerung ohne Zuwanderung wären etwa **2,1** nötig. Seit Anfang der 1970er-Jahre sterben in Deutschland jedes Jahr mehr Menschen, als geboren werden.
- **Lebenserwartung**: Neugeborene Mädchen werden im Schnitt rund 83 Jahre alt, Jungen gut 78 Jahre — über 30 Jahre mehr als um 1900.
- **Zuwanderung**: Dass die Bevölkerung trotzdem nicht schrumpft, liegt an der Einwanderung.

Das Ergebnis ist eine alternde Gesellschaft: Die klassische **Alterspyramide** (viele Junge, wenige Alte) hat sich zu einer Form entwickelt, die eher einer **Urne** gleicht.[^destatis-bevoelkerung]`,
    },
    {
      id: 'quiz-demografie', type: 'quiz', title: 'Demografie-Check',
      question: 'Welche Faktoren treiben die Alterung der deutschen Gesellschaft?',
      options: [
        { text: 'Niedrige Geburtenrate', correct: true, why: 'Mit rund 1,35 Kindern pro Frau folgen jeder Generation deutlich weniger Kinder.' },
        { text: 'Steigende Lebenserwartung', correct: true, why: 'Menschen leben länger — die Zahl der Älteren wächst.' },
        { text: 'Die geburtenstarken Jahrgänge (Babyboomer) erreichen das Rentenalter', correct: true, why: 'Die Jahrgänge etwa 1955–1969 gehen derzeit in Rente.' },
        { text: 'Zuwanderung junger Menschen', correct: false, why: 'Zuwanderung bremst die Alterung eher, weil Einwanderer im Schnitt jünger sind.' },
      ],
    },
    {
      id: 'folgen', type: 'text', title: 'Was der Wandel bedeutet',
      md: `
Der [[demografischer-wandel|demografische Wandel]] ist kein fernes Zukunftsthema, sondern läuft jetzt:

- **Rente und Pflege**: Weniger Beitragszahler finanzieren mehr Rentner ([[generationenvertrag]]), und die Zahl der Pflegebedürftigen steigt.
- **Arbeitsmarkt**: In vielen Berufen — Pflege, Handwerk, IT, Schulen — fehlen **Fachkräfte**. Deshalb wirbt Deutschland gezielt um Zuwanderung (Fachkräfteeinwanderungsgesetz).
- **Regionen**: Junge Menschen ziehen in Städte, viele ländliche Regionen — besonders im Osten — altern und schrumpfen. Schulen, Arztpraxen und Busverbindungen verschwinden.`,
    },
    {
      id: 'migration', type: 'text', title: 'Ein Einwanderungsland',
      md: `
Lange wollte die Politik es nicht wahrhaben — heute ist unbestritten: Deutschland ist ein **Einwanderungsland**. Gut ein Viertel der Bevölkerung hat einen **[[migrationshintergrund|Migrationshintergrund]]**, ist also selbst eingewandert oder Kind von Eingewanderten.[^wiki-demografie] Die großen Phasen:

1. **Nach 1945**: rund 12 Millionen Flüchtlinge und Vertriebene aus den ehemaligen deutschen Ostgebieten.
2. **Ab 1955**: „Gastarbeiter“ über [[gastarbeiter-anwerbung|Anwerbeabkommen]] — zuerst mit **Italien (1955)**, dann u. a. Spanien, Griechenland, der **Türkei (1961)** und Jugoslawien. 1973 folgte der Anwerbestopp; viele blieben und holten ihre Familien nach. Die DDR hatte eigene Vertragsarbeiter, vor allem aus Vietnam und Mosambik.
3. **Um 1990**: Spätaussiedler aus der ehemaligen Sowjetunion und Osteuropa, Flüchtlinge aus dem zerfallenden Jugoslawien.
4. **Seit 2004/2011**: EU-Freizügigkeit, besonders aus Polen, Rumänien und Bulgarien.
5. **2015/16**: über eine Million Schutzsuchende, vor allem aus Syrien, Afghanistan und dem Irak.
6. **Ab 2022**: über eine Million Geflüchtete aus der Ukraine nach dem russischen Angriff.

Seit 2024 erlaubt das Staatsangehörigkeitsrecht grundsätzlich die **doppelte Staatsbürgerschaft**; eingebürgert werden kann man in der Regel nach fünf Jahren.`,
    },
    {
      id: 'timeline-migration', type: 'game', viz: 'timeline', title: 'Einwanderung chronologisch',
      params: {
        mode: 'sort',
        events: [
          { year: 1955, label: 'Abkommen mit Italien' },
          { year: 1961, label: 'Abkommen mit der Türkei' },
          { year: 1973, label: 'Anwerbestopp' },
          { year: 1990, label: 'Spätaussiedler-Welle' },
          { year: 2015, label: 'Flüchtlinge aus Syrien' },
          { year: 2022, label: 'Geflüchtete aus Ukraine' },
          { year: 2024, label: 'Doppelpass erlaubt' },
        ],
      },
    },
    {
      id: 'numeric-geburten', type: 'numeric', title: 'Die Lücke',
      question: 'Für eine stabile Bevölkerung ohne Zuwanderung bräuchte es etwa 2,1 Kinder pro Frau. Tatsächlich sind es rund 1,35. Wie viel Prozent der „Ersatzrate“ werden erreicht? (gerundet auf ganze Prozent)',
      answer: 64, tolerance: 1, unit: '%',
      hint: '1,35 geteilt durch 2,1',
      explain: '1,35 / 2,1 ≈ 0,64, also etwa **64 %**. Jede Kindergeneration ist damit rund ein Drittel kleiner als die ihrer Eltern.',
    },
    {
      id: 'stadt-land', type: 'text', title: 'Stadt, Land — und das Netz',
      md: `
**[[urbanisierung|Urbanisierung]]**: Rund drei Viertel der Menschen in Deutschland leben in Städten und Ballungsräumen. Metropolen wie Berlin, München, Hamburg oder Leipzig wachsen — mit knappem Wohnraum und steigenden Mieten. Gleichzeitig gibt es Regionen mit Leerstand. Das Grundgesetz fordert „gleichwertige Lebensverhältnisse“, was angesichts dieser Unterschiede eine Daueraufgabe ist.

**Digitalisierung**: Smartphone, Onlinehandel, Homeoffice und künstliche Intelligenz verändern Arbeit, Kommunikation und Verwaltung. Deutschland gilt dabei im europäischen Vergleich oft als Nachzügler — etwa bei digitalen Behördendiensten oder beim Glasfaserausbau.

**Individualisierung und Pluralisierung**: Familienformen werden vielfältiger (Alleinerziehende, Patchwork-Familien, gleichgeschlechtliche Ehe seit 2017), die Bindung an Kirchen, Parteien und Gewerkschaften nimmt ab. Seit Anfang der 2020er-Jahre gehört weniger als die Hälfte der Bevölkerung einer der beiden großen christlichen Kirchen an.`,
    },
    {
      id: 'match-begriffe', type: 'match', title: 'Begriffe zuordnen',
      pairs: [
        ['Urbanisierung', 'Anteil der Stadtbevölkerung wächst'],
        ['Anwerbeabkommen', 'Verträge zur Gastarbeiter-Anwerbung'],
        ['Ersatzrate', 'etwa 2,1 Kinder pro Frau'],
        ['Babyboomer', 'geburtenstarke Jahrgänge der 1950er/60er'],
        ['Fachkräftemangel', 'offene Stellen ohne passende Bewerber'],
      ],
    },
    {
      id: 'fact-urne', type: 'callout', tone: 'fact', title: 'Der Pillenknick',
      md: `Der stärkste Geburtenjahrgang der Bundesrepublik war **1964** mit rund 1,36 Millionen Babys (in West und Ost zusammen). Danach fielen die Geburtenzahlen innerhalb weniger Jahre drastisch — der sogenannte **„Pillenknick“**, benannt nach der 1961 eingeführten Antibabypille, auch wenn Ökonomen und Soziologen weitere Gründe wie die Bildungsexpansion und die Berufstätigkeit von Frauen betonen.`,
    },
    {
      id: 'recall-wandel', type: 'recall', title: 'Erkläre es',
      prompt: 'Warum schrumpft die Bevölkerung Deutschlands trotz niedriger Geburtenrate nicht — und welche **Folgen** hat die Alterung trotzdem?',
      answer: `Weil seit Jahrzehnten **mehr Menschen zu- als abwandern**: Die Zuwanderung gleicht den Sterbeüberschuss (mehr Sterbefälle als Geburten seit den 1970ern) aus. Trotzdem altert die Gesellschaft, weil die Geburtenrate mit rund 1,35 weit unter 2,1 liegt und die Lebenserwartung steigt. Folgen: Druck auf **Rente und Pflege** (weniger Beitragszahler je Rentner), **Fachkräftemangel**, Schrumpfung und Alterung **ländlicher Regionen**, steigender Bedarf an Pflegekräften und altersgerechter Infrastruktur.`,
      hints: ['Geburten minus Sterbefälle ist negativ — was gleicht das aus?', 'Rente, Arbeitsmarkt, Land.'],
      cards: ['treiber', 'folgen'],
    },
  ],
  cards: [
    { id: 'einwohner', front: 'Wie viele Menschen leben in Deutschland?', back: 'Rund **83,6 Millionen** (2024) — die meisten in der EU.' },
    { id: 'geburtenrate', front: 'Geburtenrate in Deutschland (2023) und die Ersatzrate?', back: 'Rund **1,35** Kinder pro Frau; für eine stabile Bevölkerung wären etwa **2,1** nötig.' },
    { id: 'treiber', front: 'Die drei Treiber des demografischen Wandels', back: 'Niedrige Geburtenrate, steigende Lebenserwartung, Zuwanderung.' },
    { id: 'folgen', front: 'Folgen der Alterung', back: 'Druck auf Rente und Pflege, Fachkräftemangel, schrumpfende ländliche Regionen.' },
    { id: 'pyramide', front: 'Welche Form hat der deutsche Altersaufbau heute?', back: 'Eher eine **Urne** als eine Pyramide.' },
    { id: 'sterbe', front: 'Seit wann sterben in Deutschland jährlich mehr Menschen, als geboren werden?', back: 'Seit **Anfang der 1970er-Jahre**.' },
    { id: 'mh', front: 'Welcher Anteil der Bevölkerung hat einen Migrationshintergrund?', back: '**Gut ein Viertel**.' },
    { id: 'italien', front: 'Erstes Anwerbeabkommen der Bundesrepublik?', back: 'Mit **Italien**, **1955**.' },
    { id: 'tuerkei', front: 'Wann wurde das Anwerbeabkommen mit der Türkei geschlossen?', back: '**1961**.' },
    { id: 'stopp', front: 'Wann endete die Anwerbung von Gastarbeitern?', back: 'Mit dem **Anwerbestopp 1973**.' },
    { id: 'vertriebene', front: 'Wie viele Flüchtlinge und Vertriebene kamen nach 1945?', back: 'Rund **12 Millionen**.' },
    { id: 'doppelpass', front: 'Seit wann ist die doppelte Staatsbürgerschaft grundsätzlich erlaubt?', back: 'Seit **2024** (Reform des Staatsangehörigkeitsrechts).' },
    { id: 'urban', front: 'Welcher Anteil der Deutschen lebt in Städten?', back: 'Rund **drei Viertel**.' },
    { id: 'babyboom', front: 'Stärkster Geburtenjahrgang in Deutschland?', back: '**1964** — danach folgte der „Pillenknick“.' },
    { id: 'ehe', front: 'Seit wann gibt es die gleichgeschlechtliche Ehe in Deutschland?', back: 'Seit **2017** („Ehe für alle“).' },
  ],
};
