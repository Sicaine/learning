export default {
  id: 'sprache',
  title: 'Die deutsche Sprache',
  summary: 'Woher kommt das Deutsche, warum sagt man in Hamburg traditionell *Appel* und in München *Apfel*, was hat Luther mit unserer Schriftsprache zu tun — und wer entscheidet eigentlich, wie man „dass“ schreibt?',
  minutes: 20,
  goals: [
    'Das Deutsche in die Familie der [[indogermanisch|indogermanischen Sprachen]] einordnen',
    'Die Sprachstufen Alt-, [[mittelhochdeutsch|Mittel-]] und Neuhochdeutsch unterscheiden',
    'Erklären, was die [[zweite-lautverschiebung|zweite Lautverschiebung]] und die [[benrather-linie|Benrather Linie]] sind',
    'Die Rolle von [[lutherbibel|Luthers Bibel]], [[duden|Duden]] und [[rechtschreibreform|Rechtschreibreform]] kennen',
  ],
  blocks: [
    {
      id: 'familie', type: 'text', title: 'Eine große Familie',
      md: `
Deutsch gehört zu den [[indogermanisch|indogermanischen Sprachen]], der größten Sprachfamilie der Welt. Die Verwandtschaft sieht man an Grundwörtern:

<table><tr><th>Deutsch</th><th>Englisch</th><th>Niederländisch</th><th>Latein</th><th>[Sanskrit](wiki:Sanskrit|Sanskrit)</th></tr>
<tr><td>Mutter</td><td>mother</td><td>moeder</td><td>mater</td><td>mātár-</td></tr>
<tr><td>drei</td><td>three</td><td>drie</td><td>tres</td><td>tráyas</td></tr>
<tr><td>Nacht</td><td>night</td><td>nacht</td><td>nox</td><td>nákt-</td></tr></table>

Innerhalb dieser Familie gehört Deutsch zu den **westgermanischen** Sprachen, zusammen mit Englisch, Niederländisch, Friesisch und Luxemburgisch. Mit rund 90 bis 100 Millionen Muttersprachlern ist Deutsch die meistgesprochene Muttersprache in der Europäischen Union. Amtssprache ist es in Deutschland, Österreich, der Schweiz, Liechtenstein, Luxemburg und Belgien sowie regional z. B. in Südtirol.[^wp-deutsche-sprache]`,
    },
    {
      id: 'stufen', type: 'text', title: 'Vier Sprachstufen',
      md: `
- **[Althochdeutsch](wiki:Althochdeutsch|Old High German)** (ca. 750–1050): *[Hildebrandslied](wiki:Hildebrandslied|Hildebrandslied)*, *[Merseburger Zaubersprüche](wiki:Merseburger Zaubersprüche|Merseburg charms)* — für uns heute kaum verständlich
- **[[mittelhochdeutsch|Mittelhochdeutsch]]** (ca. 1050–1350): Sprache des [[nibelungenlied|Nibelungenlieds]] (um 1200) und des [Minnesangs](wiki:Minnesang|Minnesang) von [Walther von der Vogelweide](wiki:Walther von der Vogelweide|Walther von der Vogelweide)
- **[Frühneuhochdeutsch](wiki:Frühneuhochdeutsch|Early New High German)** (ca. 1350–1650): [Buchdruck](wiki:Buchdruck|Printing) ([Gutenberg](wiki:Johannes Gutenberg|Johannes Gutenberg), um 1450) und [Luther](wiki:Martin Luther|Martin Luther)
- **[Neuhochdeutsch](wiki:Neuhochdeutsch|New High German)** (ab ca. 1650)

Ein Beispiel für Mittelhochdeutsch — der Beginn des Nibelungenlieds:

> Uns ist in alten mæren wunders vil geseit / von helden lobebæren, von grôzer arebeit

(„Uns ist in alten Geschichten viel Wunderbares erzählt von ruhmreichen Helden, von großer Mühsal …“)`,
    },
    {
      id: 'lautverschiebung', type: 'text', title: 'Appel oder Apfel? Die zweite Lautverschiebung',
      md: `
Zwischen etwa dem 6. und 8. Jahrhundert veränderten sich im Süden des Sprachgebiets bestimmte Konsonanten — die [[zweite-lautverschiebung|zweite Lautverschiebung]].[^wp-lautverschiebung] Der Norden (und das Englische) machten sie nicht mit:

<table><tr><th>ohne Verschiebung (Niederdeutsch / Englisch)</th><th>mit Verschiebung (Hochdeutsch)</th></tr>
<tr><td>Appel / apple</td><td>Apfel</td></tr>
<tr><td>Water / water</td><td>Wasser</td></tr>
<tr><td>ten / ten</td><td>zehn</td></tr>
<tr><td>maken / make</td><td>machen</td></tr>
<tr><td>Dorp / thorp</td><td>Dorf</td></tr></table>

Die Grenze heißt [[benrather-linie|Benrather Linie]] (nach Düsseldorf-Benrath) oder „maken-machen-Linie“. Nördlich davon liegt das **[Niederdeutsche](wiki:Niederdeutsche Sprache|Low German)** (Plattdeutsch), südlich das **Hochdeutsche** — „hoch“ bedeutet dabei nicht „vornehm“, sondern geografisch: das höher gelegene Land im Süden.`,
    },
    {
      id: 'luther', type: 'text', title: 'Luther, Duden und die Rechtschreibung',
      md: `
Im 16. Jahrhundert gab es noch keine gemeinsame deutsche Schriftsprache. **[Martin Luther](wiki:Martin Luther|Martin Luther)** übersetzte 1521/22 auf der [Wartburg](wiki:Wartburg|Wartburg) das Neue Testament (**„[Septembertestament](wiki:Septembertestament)“ 1522**), 1534 erschien die ganze [[lutherbibel|Bibel]]. Sein Grundsatz: „dem Volk aufs Maul schauen“. Dank des [Buchdrucks](wiki:Buchdruck|Printing) verbreitete sich seine Sprache überall und wurde zur Grundlage des Hochdeutschen. Wörter wie *Lückenbüßer*, *Machtwort* oder *Feuereifer* gehen auf ihn zurück.[^wp-lutherbibel]

Eine einheitliche Rechtschreibung kam viel später: **[Konrad Duden](wiki:Konrad Duden|Konrad Duden)** veröffentlichte **1880** sein *Vollständiges Orthographisches Wörterbuch*; 1901 einigte man sich auf verbindliche Regeln. Die [[rechtschreibreform|Rechtschreibreform]] von 1996 (an Schulen verbindlich ab 1998) brachte die bekannteste Änderung: *daß* → *dass*. Heute entscheidet der **[Rat für deutsche Rechtschreibung](wiki:Rat für deutsche Rechtschreibung|Council for German Orthography)** (seit 2004), der [[duden|Duden]] setzt die Regeln um.[^wp-duden] [^wp-rechtschreibreform]`,
    },
    {
      id: 'map-luther',
      type: 'map',
      title: 'Luthers Weg zur Schriftsprache',
      view: [6.4, 49.4, 14.2, 52.6],
      rivers: [
        { name: 'Rhein', label: false },
        { name: 'Main', label: false },
        { name: 'Elbe', label: false },
        { name: 'Saale', label: false },
      ],
      places: [
        { name: 'Eisleben', pos: 'r', detail: 'Martin Luther wurde hier 1483 geboren und starb hier 1546.' },
        {
          name: 'Erfurt',
          pos: 'l',
          detail: 'Luther studierte an der Universität Erfurt und trat 1505 in das Augustinerkloster ein.',
        },
        {
          name: 'Wittenberg',
          pos: 'r',
          detail: 'Luther lehrte hier als Professor; 1517 sollen hier die 95 Thesen veröffentlicht worden sein.',
        },
        { name: 'Worms', pos: 'l', detail: 'Auf dem Reichstag zu Worms 1521 verweigerte Luther den Widerruf.' },
        {
          name: 'Wartburg',
          pos: 'l',
          detail: 'Hier übersetzte Luther 1521/22 als „Junker Jörg“ in nur etwa elf Wochen das Neue Testament.',
        },
        {
          name: 'Mainz',
          pos: 'l',
          detail: 'Hier entwickelte Johannes Gutenberg um 1450 den Buchdruck mit beweglichen Lettern; ohne ihn hätte sich Luthers Bibel nicht so schnell verbreitet.',
        },
      ],
      caption: 'Luthers Sprache stützte sich auf die ostmitteldeutsche Kanzleisprache Sachsens — und der Buchdruck verbreitete sie.',
    },
    {
      id: 'dialekte', type: 'text', title: 'Dialekte und Standard',
      md: `
Die [[dialekte|Dialekte]] gliedern sich in drei Großräume: **Niederdeutsch** im Norden, **Mitteldeutsch** ([Hessisch](wiki:Hessisch|Hessian dialects), Thüringisch, [Sächsisch](wiki:Sächsisch|Upper Saxon German), [Kölsch](wiki:Kölsch (Sprache)|Colognian dialect) …) und **Oberdeutsch** im Süden ([Bairisch](wiki:Bairische Dialekte|Bavarian language), [Schwäbisch](wiki:Schwäbischer Dialekt|Swabian German) und andere alemannische Dialekte).[^wp-dialekte]

Das Standarddeutsche ist [[plurizentrisch|plurizentrisch]]: Österreich und die Schweiz haben eigene, gleichberechtigte Standardformen. In Österreich heißt der Januar *Jänner*, die Tomate *Paradeiser*; in der Schweiz wird gar kein ß geschrieben und das Fahrrad heißt *Velo*.`,
    },
    {
      id: 'map-dialekte',
      type: 'map',
      title: 'Dialekträume: sehr grob nach Bundesländern',
      view: 'de',
      highlight: [
        {
          states: [
            'Schleswig-Holstein',
            'Hamburg',
            'Bremen',
            'Niedersachsen',
            'Mecklenburg-Vorpommern',
          ],
          label: 'Niederdeutsch (Plattdeutsch)',
          color: '#2563eb',
        },
        {
          states: [
            'Hessen',
            'Rheinland-Pfalz',
            'Saarland',
            'Thüringen',
            'Sachsen',
          ],
          label: 'Mitteldeutsch',
          color: '#d97706',
        },
        {
          states: [
            'Bayern',
            'Baden-Württemberg',
          ],
          label: 'Oberdeutsch',
          color: '#059669',
        },
      ],
      points: [
        {
          lon: 6.8739,
          lat: 51.1614,
          label: 'Benrath',
          kind: 'site',
          pos: 'l',
          detail: 'Hier überquert die **Benrather Linie** den Rhein: nördlich sagt man *maken*, südlich *machen*.',
        },
      ],
      layers: { cities: false, rivers: false },
      caption: 'Nur eine grobe Orientierung: Dialektgrenzen folgen nicht den Landesgrenzen. Nordrhein-Westfalen, Sachsen-Anhalt, Brandenburg und Berlin liegen in mehreren Räumen und sind nicht eingefärbt; das Fränkische in Nordbayern gilt je nach Einteilung als ober- oder mitteldeutsch.',
    },
    {
      id: 'redewendungen', type: 'match', title: 'Woher kommt diese Redewendung?',
      prompt: 'Ordne der Redewendung ihre Herkunft zu.',
      pairs: [
        ['etwas auf dem Kerbholz haben', 'Schulden wurden früher als Kerben in ein Holz geschnitzt'],
        ['mit Kind und Kegel', '„Kegel“ hieß früher ein uneheliches Kind'],
        ['unter aller Kanone', 'Lateinisch *sub omni canone*: unter jedem Maßstab'],
        ['jemandem das Wasser nicht reichen können', 'Diener reichten bei Tisch Wasser zum Händewaschen'],
        ['auf den Hund gekommen', 'Evtl. Truhen, auf deren Boden ein Hund gemalt war — sichtbar, wenn alles verbraucht war'],
      ],
    },
    {
      id: 'fact-lehnwoerter', type: 'callout', tone: 'fact', title: 'Deutsche Wörter in aller Welt',
      md: `Das Englische hat viele deutsche Wörter übernommen: *kindergarten*, *angst*, *zeitgeist*, *schadenfreude*, *wanderlust*, *doppelgänger*, *rucksack*, *kitsch* — und in der Physik *bremsstrahlung*. Umgekehrt benutzen wir zahllose **[Anglizismen](wiki:Anglizismus|Anglicism)**, vom *Meeting* bis zum *Handy* (das es im Englischen so gar nicht gibt: dort heißt es *mobile* oder *cell phone*).`,
    },
    {
      id: 'order-stufen', type: 'order', title: 'Sprachstufen ordnen',
      prompt: 'Bringe die Sprachstufen und Ereignisse in die richtige Reihenfolge.',
      items: ['Althochdeutsch (*Hildebrandslied*)', 'Mittelhochdeutsch (*Nibelungenlied*)', 'Luthers Septembertestament', 'Konrad Dudens Wörterbuch', 'Rechtschreibreform'],
      explain: 'Althochdeutsch (ca. 750–1050) → Mittelhochdeutsch (um 1200 Nibelungenlied) → 1522 Septembertestament → 1880 Duden → 1996 Rechtschreibreform.',
    },
    {
      id: 'quiz-lautverschiebung', type: 'quiz', title: 'Hoch- oder Niederdeutsch?',
      question: 'Welche Wortformen zeigen die **zweite Lautverschiebung** (also hochdeutsch)?',
      options: [
        { text: 'Pfund', correct: true, why: 'p → pf (vgl. engl. *pound*).' },
        { text: 'Water', correct: false, why: 'Unverschoben (niederdeutsch/englisch); hochdeutsch: *Wasser*.' },
        { text: 'Zeit', correct: true, why: 't → z (vgl. engl. *tide*, nd. *Tied*).' },
        { text: 'maken', correct: false, why: 'Niederdeutsch; hochdeutsch: *machen*.' },
      ],
    },
    {
      id: 'duden-jahr', type: 'numeric', title: 'Das Duden-Jahr',
      question: 'In welchem Jahr erschien Konrad Dudens *Vollständiges Orthographisches Wörterbuch der deutschen Sprache*?',
      answer: 1880, tolerance: 0,
      hint: 'Es war neun Jahre nach der Reichsgründung.',
      explain: '1880, neun Jahre nach der [Reichsgründung](wiki:Deutsche Reichsgründung|Proclamation of the German Empire) 1871 — ein neuer Nationalstaat brauchte eine einheitliche Rechtschreibung.',
    },
    {
      id: 'recall-luther', type: 'recall', title: 'Luthers Rolle',
      prompt: 'Warum gilt Martin Luther als so wichtig für die deutsche Sprache?',
      answer: `Vor Luther gab es keine einheitliche deutsche Schriftsprache, nur regionale Schreibvarianten. Seine **Bibelübersetzung** (NT 1522, ganze Bibel 1534) orientierte sich an der ostmitteldeutschen (sächsischen) Kanzleisprache, war aber bewusst volksnah („dem Volk aufs Maul schauen“). Durch den **Buchdruck** wurde sie in riesiger Auflage im ganzen Sprachgebiet gelesen und wurde so zur Grundlage des gemeinsamen Hochdeutschen. Viele Wörter und Redewendungen stammen von ihm.`,
      hints: ['Welche Erfindung half bei der Verbreitung?'],
      cards: ['luther-sprache'],
    },
  ],
  cards: [
    { id: 'familie', front: 'Zu welcher Sprachfamilie und welchem Zweig gehört das Deutsche?', back: 'Indogermanisch → germanisch → westgermanisch (mit Englisch, Niederländisch, Friesisch).' },
    { id: 'sprecher', front: 'Ungefähr wie viele Menschen sprechen Deutsch als Muttersprache?', back: 'Rund 90–100 Millionen — die meistgesprochene Muttersprache der EU.' },
    { id: 'amtssprache', front: 'In welchen Staaten ist Deutsch (nationale) Amtssprache?', back: 'Deutschland, Österreich, Schweiz, Liechtenstein, Luxemburg, Belgien (regional z. B. Südtirol).' },
    { id: 'stufen', front: 'Die vier Sprachstufen des Deutschen?', back: 'Althochdeutsch (ca. 750–1050), Mittelhochdeutsch (1050–1350), Frühneuhochdeutsch (1350–1650), Neuhochdeutsch (ab 1650).' },
    { id: 'althochdeutsch', front: 'Ein bekanntes althochdeutsches Werk?', back: 'Das *Hildebrandslied* (oder die *Merseburger Zaubersprüche*).' },
    { id: 'nibelungen', front: 'Wann entstand das Nibelungenlied, in welcher Sprachstufe?', back: 'Um 1200, Mittelhochdeutsch.' },
    { id: 'lautverschiebung', front: 'Was ist die zweite Lautverschiebung? Beispiel?', back: 'Lautwandel ca. 6.–8. Jh. im Süden: p→pf/f, t→z/s, k→ch. *Appel → Apfel, water → Wasser, maken → machen*.' },
    { id: 'benrath', front: 'Was trennt die Benrather Linie?', back: 'Niederdeutsch (nördlich, *maken*) und Hochdeutsch (südlich, *machen*).' },
    { id: 'hochdeutsch', front: 'Warum heißt Hochdeutsch „hoch“?', back: 'Geografisch: das höher gelegene Land im Süden — nicht „vornehm“.' },
    { id: 'septembertestament', front: 'Was ist das Septembertestament?', back: 'Luthers Übersetzung des Neuen Testaments, erschienen im September 1522.' },
    { id: 'lutherbibel', front: 'Wann erschien Luthers vollständige Bibelübersetzung?', back: '1534.' },
    { id: 'luther-sprache', front: 'Warum ist Luther wichtig für die deutsche Sprache?', back: 'Seine volksnahe Bibelübersetzung wurde dank Buchdruck überall gelesen und zur Grundlage des gemeinsamen Hochdeutschen.' },
    { id: 'duden', front: 'Wann erschien Konrad Dudens Wörterbuch?', back: '1880.' },
    { id: 'reform', front: 'Rechtschreibreform: beschlossen, verbindlich, bekannteste Änderung?', back: '1996 beschlossen, ab 1998 an Schulen; *daß → dass* (ss nach kurzem Vokal).' },
    { id: 'rat', front: 'Wer legt heute die amtliche deutsche Rechtschreibung fest?', back: 'Der Rat für deutsche Rechtschreibung (seit 2004).' },
    { id: 'dialektraeume', front: 'Die drei großen Dialekträume?', back: 'Niederdeutsch, Mitteldeutsch, Oberdeutsch.' },
    { id: 'plurizentrisch', front: 'Was heißt „Deutsch ist plurizentrisch“?', back: 'Es gibt mehrere gleichberechtigte Standardvarianten: Deutschland, Österreich (*Jänner*), Schweiz (kein ß).' },
    { id: 'kerbholz', front: 'Woher kommt „etwas auf dem Kerbholz haben“?', back: 'Schulden wurden früher als Kerben in einen Holzstab geschnitzt.' },
  ],
};
