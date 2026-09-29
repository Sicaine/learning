export default {
  id: 'medien-oeffentlichkeit',
  title: 'Medien & Öffentlichkeit',
  summary: 'Warum Pressefreiheit ein Grundpfeiler der Demokratie ist, wie der öffentlich-rechtliche Rundfunk funktioniert — und was soziale Netzwerke und Desinformation verändern.',
  minutes: 20,
  goals: [
    'Art. 5 GG und die Rolle der Medien als [[vierte-gewalt|„vierte Gewalt“]] erklären',
    'Die [[spiegel-affaere|Spiegel-Affäre]] 1962 einordnen',
    'Das duale Rundfunksystem und den [[oeffentlich-rechtlicher-rundfunk|öffentlich-rechtlichen Rundfunk]] beschreiben',
    '[[desinformation|Desinformation]] und [[filterblase|Filterblasen]] erkennen und Gegenmittel nennen',
  ],
  blocks: [
    {
      id: 'art5', type: 'text', title: '„Eine Zensur findet nicht statt“',
      md: `
Art. 5 Abs. 1 GG garantiert die **Meinungsfreiheit**, die **Informationsfreiheit** und die **[[pressefreiheit|Freiheit von Presse und Rundfunk]]**. Der kürzeste Satz dazu hat es in sich: „**Eine Zensur findet nicht statt.**“

Grenzen setzen nur die „allgemeinen Gesetze“, der Jugendschutz und das Recht der persönlichen Ehre — Beleidigung, Volksverhetzung oder Verleumdung sind also nicht erlaubt.

Warum ist das so wichtig? Demokratie braucht informierte Bürger und eine Öffentlichkeit, in der gestritten werden kann. Medien recherchieren, decken Missstände auf und kontrollieren die Mächtigen — deshalb nennt man sie die **[[vierte-gewalt|vierte Gewalt]]** neben Legislative, Exekutive und Judikative. Im NS-Staat und in der DDR waren die Medien dagegen gleichgeschaltet und dienten der Propaganda. Wie frei die Presse weltweit ist, vergleicht jedes Jahr die Rangliste von Reporter ohne Grenzen — Deutschland liegt dort im oberen Feld, während in vielen Ländern Journalisten verfolgt werden.[^rog]`,
    },
    {
      id: 'spiegel', type: 'text', title: 'Die Spiegel-Affäre 1962',
      md: `
Im Oktober 1962 veröffentlichte *Der Spiegel* unter dem Titel „**Bedingt abwehrbereit**“ einen kritischen Bericht über den Zustand der Bundeswehr. Die Reaktion: Polizei durchsuchte die Redaktionsräume in Hamburg, Herausgeber **Rudolf Augstein** und mehrere Journalisten wurden wegen des Verdachts auf Landesverrat verhaftet — Augstein saß **103 Tage** in Untersuchungshaft.[^wiki-spiegel-affaere]

Es folgten Proteste im ganzen Land. Verteidigungsminister **Franz Josef Strauß**, der das Parlament über seine Rolle getäuscht hatte, musste zurücktreten. Der Vorwurf des Landesverrats erwies sich als haltlos. Die [[spiegel-affaere|Spiegel-Affäre]] gilt als Wendepunkt: Die junge Bundesrepublik bewies, dass ihre Bürger die Pressefreiheit verteidigen.`,
    },
    {
      id: 'rundfunk', type: 'text', title: 'Das duale Rundfunksystem',
      md: `
Nach 1945 bauten die Alliierten den Rundfunk nach dem Vorbild der britischen BBC auf: **staatsfern** und **beitragsfinanziert**, damit nie wieder eine Regierung ihn als Propagandainstrument missbrauchen kann. Rundfunk ist Ländersache ([[kulturhoheit]]).

- **[[oeffentlich-rechtlicher-rundfunk|Öffentlich-rechtlicher Rundfunk]]**: die **ARD** (Arbeitsgemeinschaft der Landesrundfunkanstalten, 1950 gegründet, „Das Erste“ und die Dritten Programme), das **ZDF** (Sendestart 1963) und das **Deutschlandradio**. Ihr Auftrag: Grundversorgung mit Information, Bildung, Kultur und Unterhaltung. Finanziert über den **Rundfunkbeitrag** von **18,36 € pro Monat und Wohnung** (seit 2021, Stand 2026).[^wiki-rundfunkbeitrag]
- **Privater Rundfunk**: seit **1984** (u. a. RTL und Sat.1), finanziert vor allem durch Werbung.

Beide zusammen bilden das **duale Rundfunksystem**. Über die Höhe des Beitrags und den Umfang des öffentlich-rechtlichen Angebots wird regelmäßig heftig gestritten.`,
    },
    {
      id: 'match-medien', type: 'match', title: 'Wer ist wer?',
      pairs: [
        ['ARD', 'Verbund der Landesrundfunkanstalten, 1950'],
        ['ZDF', 'Sendestart 1963, Sitz Mainz'],
        ['Deutscher Presserat', 'Selbstkontrolle der Presse, Pressekodex'],
        ['Rundfunkbeitrag', '18,36 € pro Wohnung und Monat'],
        ['Privatfernsehen', 'seit 1984, werbefinanziert'],
      ],
    },
    {
      id: 'timeline-medien', type: 'game', viz: 'timeline', title: 'Mediengeschichte',
      params: {
        mode: 'sort',
        events: [
          { year: 1450, label: 'Gutenbergs Buchdruck', detail: 'Um 1450 in Mainz — Beginn der Massenkommunikation.' },
          { year: 1923, label: 'Erste Radiosendung', detail: 'Oktober 1923 in Berlin.' },
          { year: 1950, label: 'ARD gegründet' },
          { year: 1962, label: 'Spiegel-Affäre' },
          { year: 1963, label: 'ZDF geht auf Sendung' },
          { year: 1984, label: 'Privatfernsehen startet' },
          { year: 2004, label: 'Facebook gegründet' },
          { year: 2024, label: 'Digital Services Act gilt' },
        ],
      },
    },
    {
      id: 'netz', type: 'text', title: 'Öffentlichkeit im Netz',
      md: `
Heute informieren sich viele Menschen — vor allem Jüngere — über soziale Netzwerke, Videoplattformen und Messenger. Das hat die Öffentlichkeit grundlegend verändert:

- **Jeder kann senden**: Informationen verbreiten sich schneller und vielfältiger — auch ohne journalistische Prüfung.
- **Algorithmen** entscheiden, was wir sehen. Sie belohnen Aufmerksamkeit, und Empörung erzeugt viel Aufmerksamkeit.
- **[[filterblase|Filterblasen]] und Echokammern**: Nutzer bekommen vor allem Inhalte, die ihre Meinung bestätigen (Begriff von Eli Pariser, 2011). Wie stark der Effekt wirklich ist, ist in der Forschung umstritten.
- **[[desinformation|Desinformation]]**: gezielt verbreitete Falschinformationen, teils von staatlichen Akteuren, verstärkt durch Bots und zunehmend durch KI-generierte Bilder und Videos („Deepfakes“).

Die EU reagiert mit dem **[[digital-services-act|Digital Services Act]]** (voll anwendbar seit 2024): Sehr große Plattformen müssen Risiken für Wahlen und öffentliche Debatte bewerten und gegen illegale Inhalte vorgehen; bei Verstößen drohen Strafen bis zu 6 % des weltweiten Umsatzes. In Deutschland galt zuvor das Netzwerkdurchsetzungsgesetz von 2017.`,
    },
    {
      id: 'order-check', type: 'order', title: 'Einen Beitrag prüfen',
      prompt: 'Dir wird ein aufsehenerregender Post mit einem Foto geteilt. In welcher Reihenfolge prüfst du ihn sinnvollerweise?',
      items: [
        'Innehalten: Nicht sofort teilen, auch wenn der Post empört',
        'Quelle prüfen: Wer hat es veröffentlicht, gibt es ein Impressum?',
        'Nach unabhängiger Bestätigung durch seriöse Medien suchen',
        'Bild per Rückwärtssuche prüfen: Stammt es aus einem anderen Zusammenhang?',
        'Faktenchecks nachschlagen (z. B. von Nachrichtenagenturen)',
        'Erst dann entscheiden, ob man teilt',
      ],
      explain: 'Die Reihenfolge ist nicht in Stein gemeißelt — entscheidend ist der erste Schritt: Empörung ist genau das Gefühl, auf das Desinformation abzielt.',
    },
    {
      id: 'quiz-medien', type: 'quiz', title: 'Medien-Check',
      question: 'Welche Aussagen stimmen?',
      options: [
        { text: 'Der öffentlich-rechtliche Rundfunk wird überwiegend aus dem Rundfunkbeitrag finanziert.', correct: true, why: 'Werbung spielt nur eine kleine Rolle und ist stark begrenzt.' },
        { text: 'Die Bundesregierung kann ARD und ZDF Weisungen erteilen.', correct: false, why: 'Der Rundfunk muss staatsfern sein; Aufsicht üben plural besetzte Rundfunk- und Fernsehräte aus.' },
        { text: 'Pressefreiheit bedeutet, dass Medien alles veröffentlichen dürfen.', correct: false, why: 'Grenzen setzen allgemeine Gesetze, Jugendschutz und Persönlichkeitsrechte.' },
        { text: 'Die Spiegel-Affäre führte zum Rücktritt von Franz Josef Strauß als Verteidigungsminister.', correct: true, why: 'Er hatte das Parlament über seine Rolle getäuscht.' },
      ],
    },
    {
      id: 'fact-presserat', type: 'callout', tone: 'fact', title: 'Die Presse kontrolliert sich selbst',
      md: `Weil der Staat die Presse nicht kontrollieren darf, gibt es seit **1956** den **Deutschen Presserat** — eine Einrichtung der Verlage und Journalistenverbände. Sein **Pressekodex** verlangt z. B. Wahrhaftigkeit, sorgfältige Recherche und den Schutz der Unschuldsvermutung. Wer eine Verletzung sieht, kann sich beschweren; schlimmstenfalls wird eine **Rüge** ausgesprochen, die das Medium abdrucken soll.[^presserat]`,
    },
    {
      id: 'recall-medien', type: 'recall', title: 'Erkläre es',
      prompt: 'Warum spricht man von den Medien als „vierter Gewalt“, und welche Gefahren bringen soziale Netzwerke für diese Funktion mit sich?',
      answer: `Medien kontrollieren die drei Staatsgewalten, indem sie informieren, recherchieren und Missstände öffentlich machen — ohne selbst staatliche Macht zu haben. Voraussetzung sind Pressefreiheit, Vielfalt und unabhängige, wirtschaftlich tragfähige Redaktionen. Soziale Netzwerke bringen Gefahren: Algorithmen bevorzugen Empörung, **Desinformation** verbreitet sich schnell, **Filterblasen/Echokammern** können die gemeinsame Faktenbasis zersplittern, und klassische Medien verlieren Werbeeinnahmen — was Recherche schwieriger macht.`,
      hints: ['Wen kontrollieren Medien?', 'Algorithmen, Desinformation, Geschäftsmodell.'],
      cards: ['vierte', 'netz-gefahren'],
    },
  ],
  cards: [
    { id: 'art5', front: 'Was garantiert Art. 5 Abs. 1 GG?', back: 'Meinungs-, Informations-, Presse- und Rundfunkfreiheit — „Eine Zensur findet nicht statt.“' },
    { id: 'grenzen', front: 'Wo liegen die Grenzen der Meinungs- und Pressefreiheit?', back: 'In den allgemeinen Gesetzen, dem Jugendschutz und dem Recht der persönlichen Ehre (Art. 5 Abs. 2 GG).' },
    { id: 'vierte', front: 'Warum heißen Medien „vierte Gewalt“?', back: 'Weil sie neben Legislative, Exekutive und Judikative die Mächtigen **kontrollieren** — durch Öffentlichkeit, nicht durch staatliche Macht.' },
    { id: 'spiegel', front: 'Spiegel-Affäre: Jahr, Artikel, Folge?', back: '**1962**, Artikel „Bedingt abwehrbereit“; Durchsuchung und Verhaftungen, Rücktritt von Verteidigungsminister **Franz Josef Strauß**.' },
    { id: 'augstein', front: 'Wer war der Spiegel-Herausgeber, der 1962 in Haft kam?', back: '**Rudolf Augstein** (103 Tage Untersuchungshaft).' },
    { id: 'dual', front: 'Was ist das duale Rundfunksystem?', back: 'Das Nebeneinander von **öffentlich-rechtlichem** (beitragsfinanziertem) und **privatem** (werbefinanziertem) Rundfunk, seit 1984.' },
    { id: 'ard-zdf', front: 'Gründung der ARD und Sendestart des ZDF?', back: 'ARD **1950**, ZDF **1963**.' },
    { id: 'beitrag', front: 'Höhe des Rundfunkbeitrags (Stand 2026)?', back: '**18,36 €** pro Monat und Wohnung (seit August 2021).' },
    { id: 'bbc', front: 'Nach welchem Vorbild wurde der deutsche Rundfunk nach 1945 aufgebaut?', back: 'Nach der britischen **BBC** — staatsfern und gebührenfinanziert.' },
    { id: 'presserat', front: 'Was ist der Deutsche Presserat?', back: 'Die freiwillige **Selbstkontrolle** der Presse (seit 1956) mit dem Pressekodex; kann Rügen aussprechen.' },
    { id: 'filter', front: 'Was ist eine Filterblase — und wer prägte den Begriff?', back: 'Algorithmen zeigen vor allem meinungsbestätigende Inhalte; Begriff von **Eli Pariser** (2011).' },
    { id: 'desinfo', front: 'Unterschied Desinformation / Fehlinformation', back: 'Desinformation ist **absichtlich** falsch oder irreführend, Fehlinformation versehentlich.' },
    { id: 'dsa', front: 'Was ist der Digital Services Act?', back: 'EU-Verordnung (voll anwendbar seit **2024**), die große Plattformen zum Umgang mit illegalen Inhalten und systemischen Risiken verpflichtet; Strafen bis 6 % des Umsatzes.' },
    { id: 'netz-gefahren', front: 'Drei Gefahren sozialer Netzwerke für die Öffentlichkeit', back: 'Algorithmen belohnen Empörung, schnelle Verbreitung von Desinformation, Filterblasen/Echokammern.' },
  ],
};
