export default {
  id: 'erfindungen',
  title: 'Große Erfindungen',
  summary: 'Vom [[buchdruck]] über die [[dampfmaschine]] bis zum [[automobil]]: die Erfindungen, die die Welt verändert haben — und die erstaunlich vielen, die aus Deutschland kommen.',
  minutes: 22,
  goals: [
    'Die folgenreichsten Erfindungen der Neuzeit mit Erfinder und ungefährem Datum nennen',
    'Erklären, warum [[buchdruck]] und [[dampfmaschine]] ganze Epochen prägten',
    'Die Geburt des [[automobil|Automobils]] in Deutschland schildern',
    'Typische deutsche Erfindungen des Alltags kennen — und einige verbreitete Irrtümer',
  ],
  blocks: [
    {
      id: 'gutenberg', type: 'text', title: 'Gutenberg: die Medienrevolution von Mainz',
      md: `
Um **1450** entwickelte **Johannes Gutenberg** in Mainz den [[buchdruck|Buchdruck mit beweglichen Lettern]].[^tech-wp-gutenberg] Seine Leistung war ein ganzes System: einzeln gegossene Buchstaben aus einer Metalllegierung, ein Handgießinstrument, um sie schnell zu vervielfältigen, eine haftende, ölhaltige Druckfarbe und eine Druckerpresse nach dem Vorbild von Weinpressen.

Sein Meisterwerk, die **Gutenberg-Bibel** (um 1454), hatte 1.282 Seiten in zwei Spalten mit je 42 Zeilen. Bis 1500 entstanden in Europa schätzungsweise Millionen gedruckter Bücher. Ohne Druckerpresse hätte sich Luthers Reformation ab 1517 nicht wie ein Lauffeuer verbreitet, und auch die wissenschaftliche Revolution lebte davon, dass Wissen billig kopiert werden konnte.

In Korea und China gab es schon früher bewegliche Lettern — Gutenbergs System war aber das erste, das sich für die Massenproduktion einer Buchstabenschrift eignete. 1999 wählten US-Journalisten Gutenberg zum „Mann des Jahrtausends“.`,
    },
    {
      id: 'watt', type: 'text', title: 'Dampf und die Industrielle Revolution',
      md: `
Die ersten [[dampfmaschine|Dampfmaschinen]] (Thomas Newcomen, 1712) pumpten Wasser aus englischen Kohlebergwerken — mit miserablem Wirkungsgrad. Der Schotte **James Watt** verbesserte sie ab **1769** entscheidend durch einen separaten Kondensator und später eine Drehbewegung.[^tech-wp-watt] Plötzlich konnten Maschinen überall arbeiten, nicht nur an Flüssen mit Wasserrädern.

Das war der Motor der **Industriellen Revolution**, die um 1760 in Großbritannien begann: mechanische Webstühle, Fabriken, Eisenbahnen (Stephensons *Rocket* 1829; in Deutschland fuhr die erste Eisenbahn 1835 von Nürnberg nach Fürth), Dampfschiffe. Die Einheit der Leistung, das **Watt**, erinnert an ihn.`,
    },
    {
      id: 'auto', type: 'text', title: 'Das Auto: eine deutsche Geschichte',
      md: `
Grundlage war der **Viertaktmotor**, den **Nikolaus August Otto** 1876 in Köln baute („Ottomotor“). Zehn Jahre später, am **29. Januar 1886**, meldete **Carl Benz** in Mannheim seinen dreirädrigen **Patent-Motorwagen** an — dieses Datum gilt als Geburtstag des [[automobil|Automobils]].[^tech-wp-benz] Fast gleichzeitig bauten **Gottlieb Daimler** und **Wilhelm Maybach** in Cannstatt bei Stuttgart einen Motorwagen; ihre Firmen fusionierten 1926 zu Daimler-Benz.

Weltbekannt wurde die Erfindung durch eine Frau: **Bertha Benz** fuhr im August 1888 — ohne Wissen ihres Mannes — mit ihren beiden Söhnen rund 100 km von Mannheim nach Pforzheim, die erste Fernfahrt der Autogeschichte.[^tech-wp-bertha] Unterwegs kaufte sie Benzin in einer Apotheke in Wiesloch, der „ersten Tankstelle der Welt“.

**Rudolf Diesel** entwickelte in den 1890ern den nach ihm benannten, effizienteren Motor[^tech-wp-diesel]; zur Massenware wurde das Auto aber erst durch Henry Fords **Fließband** (Ford Modell T, ab 1913).`,
    },
    {
      id: 'match-erfinder', type: 'match', title: 'Wer erfand was?',
      pairs: [['Johannes Gutenberg', 'Buchdruck mit beweglichen Lettern'], ['James Watt', 'Verbesserte Dampfmaschine'], ['Carl Benz', 'Patent-Motorwagen (1886)'], ['Wilhelm Conrad Röntgen', 'X-Strahlen (1895)'], ['Thomas Edison', 'Praxistaugliche Glühbirne (1879)'], ['Karl Drais', 'Laufmaschine, Vorläufer des Fahrrads (1817)']],
    },
    {
      id: 'deutsch', type: 'text', title: 'Made in Germany — Erfindungen des Alltags',
      md: `
Deutschland ist ein Land der Tüftler.[^tech-wp-erfinder] Eine Auswahl, die man kennen sollte:

<table>
<tr><th>Erfindung</th><th>Wer</th><th>Wann</th></tr>
<tr><td>Laufmaschine (Draisine)</td><td>Karl Drais, Mannheim</td><td>1817</td></tr>
<tr><td>Telefon (erster Apparat, „Das Pferd frisst keinen Gurkensalat“)</td><td>Philipp Reis</td><td>1861</td></tr>
<tr><td>Dynamo (dynamoelektrisches Prinzip)</td><td>Werner von Siemens</td><td>1866</td></tr>
<tr><td>Viertaktmotor</td><td>Nikolaus August Otto</td><td>1876</td></tr>
<tr><td>Automobil</td><td>Carl Benz / Daimler & Maybach</td><td>1886</td></tr>
<tr><td>Röntgenstrahlen</td><td>Wilhelm Conrad Röntgen</td><td>1895</td></tr>
<tr><td>Aspirin (Acetylsalicylsäure als Medikament)</td><td>Bayer (Felix Hoffmann)</td><td>1897</td></tr>
<tr><td>Kaffeefilter</td><td>Melitta Bentz, Dresden</td><td>1908</td></tr>
<tr><td>Computer (Z3)</td><td>Konrad Zuse</td><td>1941</td></tr>
<tr><td>Dübel (Spreizdübel aus Kunststoff)</td><td>Artur Fischer</td><td>1958</td></tr>
<tr><td>MP3-Format</td><td>Fraunhofer-Institut (Karlheinz Brandenburg u. a.)</td><td>1990er</td></tr>
</table>

Das Telefon ist ein Beispiel dafür, dass Erfindungen selten nur einen Vater haben: Philipp Reis führte 1861 seinen Apparat vor[^tech-wp-reis], das kommerziell erfolgreiche Patent meldete aber **Alexander Graham Bell** 1876 in den USA an.`,
    },
    {
      id: 'quiz-irrtuemer', type: 'quiz', title: 'Mythos oder Fakt?',
      question: 'Welche Aussagen sind **richtig**?',
      options: [
        { text: 'Das erste Auto mit Verbrennungsmotor meldete Carl Benz 1886 zum Patent an.', correct: true, why: 'Der Benz Patent-Motorwagen Nummer 1, DRP 37435.' },
        { text: 'Thomas Edison hat die Glühbirne als Erster überhaupt erfunden.', correct: false, why: 'Es gab viele Vorläufer (u. a. Joseph Swan); Edison entwickelte 1879 eine langlebige, praxistaugliche Version und das System drumherum.' },
        { text: 'Die erste deutsche Eisenbahn fuhr 1835 von Nürnberg nach Fürth.', correct: true, why: 'Die „Adler“ auf der Ludwigseisenbahn.' },
        { text: 'Gutenberg war der erste Mensch überhaupt, der mit beweglichen Lettern druckte.', correct: false, why: 'In China und Korea gab es sie früher; Gutenberg schuf das erste massentaugliche System für eine Buchstabenschrift.' },
        { text: 'Melitta Bentz erfand den Kaffeefilter.', correct: true, why: '1908 in Dresden, mit Löschpapier und einem durchlöcherten Messingtopf.' },
      ],
    },
    {
      id: 'timeline-erf', type: 'viz', viz: 'timeline', title: 'Zeitleiste der Erfindungen',
      params: {
        events: [
          { year: 1450, label: 'Buchdruck', detail: 'Johannes Gutenberg, Mainz.' },
          { year: 1769, label: 'Watts Dampfmaschine', detail: 'Separater Kondensator — Motor der Industriellen Revolution.' },
          { year: 1817, label: 'Laufmaschine', detail: 'Karl Drais, Mannheim.' },
          { year: 1861, label: 'Reis’ Telefon', detail: 'Philipp Reis; Bells Patent folgte 1876.' },
          { year: 1876, label: 'Viertaktmotor', detail: 'Nikolaus August Otto, Köln.' },
          { year: 1886, label: 'Automobil', detail: 'Carl Benz, Mannheim.' },
          { year: 1895, label: 'Röntgenstrahlen', detail: 'Wilhelm Conrad Röntgen, Würzburg.' },
          { year: 1903, label: 'Motorflug', detail: 'Brüder Wright; der Deutsche Otto Lilienthal hatte ab 1891 Gleitflüge gemacht.' },
          { year: 1941, label: 'Computer Z3', detail: 'Konrad Zuse, Berlin.' },
        ],
      },
    },
    {
      id: 'game-erf', type: 'game', viz: 'timeline', title: 'Was kam zuerst?',
      params: {
        mode: 'sort',
        events: [
          { year: 1450, label: 'Buchdruck' },
          { year: 1769, label: 'Watts Dampfmaschine' },
          { year: 1835, label: 'Erste dt. Eisenbahn' },
          { year: 1876, label: 'Bells Telefonpatent' },
          { year: 1886, label: 'Benz Motorwagen' },
          { year: 1903, label: 'Erster Motorflug' },
          { year: 1941, label: 'Zuse Z3' },
        ],
      },
    },
    {
      id: 'fact-tankstelle', type: 'callout', tone: 'fact', title: 'Die erste Tankstelle war eine Apotheke',
      md: `Auf ihrer Fahrt nach Pforzheim 1888 ging Bertha Benz das Benzin aus. Sie kaufte in der **Stadt-Apotheke in Wiesloch** „Ligroin“, ein Reinigungsbenzin — die Apotheke gilt deshalb als erste Tankstelle der Welt. Einen verstopften Vergaser reinigte sie mit ihrer Hutnadel, ein Strumpfband diente als Isoliermaterial.`,
    },
    {
      id: 'recall-gutenberg', type: 'recall', title: 'Erkläre die Tragweite',
      prompt: 'Warum gilt der **Buchdruck** oft als wichtigste Erfindung des Jahrtausends? Nenne mindestens zwei Folgen.',
      answer: `Gutenbergs Buchdruck (um 1450) machte Bücher und Flugschriften **schnell, billig und in großer Zahl** herstellbar, statt sie mühsam abzuschreiben. Folgen: **Wissen verbreitete sich** viel breiter und schneller (Bildung, Alphabetisierung); die **Reformation** konnte sich durch Luthers Flugschriften und Bibelübersetzung rasch ausbreiten; **Wissenschaftler** konnten Erkenntnisse exakt vervielfältigen und aufeinander aufbauen; Sprachen wurden **vereinheitlicht**. Damit veränderte der Buchdruck Religion, Politik und Wissenschaft — eine Medienrevolution, vergleichbar mit dem Internet.`,
      hints: ['Was kostete ein Buch vorher — und danach?', 'Denke an Luther 1517.'],
      cards: ['gutenberg-folgen'],
    },
  ],
  cards: [
    { id: 'gutenberg', front: 'Wer erfand wann und wo den Buchdruck mit beweglichen Lettern?', back: 'Johannes Gutenberg, um 1450 in Mainz (Gutenberg-Bibel um 1454).' },
    { id: 'gutenberg-folgen', front: 'Zwei Folgen des Buchdrucks', back: 'Z. B. schnelle Verbreitung von Wissen und Bildung, Ausbreitung der Reformation, Aufschwung der Wissenschaft, Vereinheitlichung der Sprache.' },
    { id: 'watt', front: 'Was verbesserte James Watt — und wann?', back: 'Die Dampfmaschine (separater Kondensator), ab 1769; Motor der Industriellen Revolution.' },
    { id: 'industrie', front: 'Wo und wann begann die Industrielle Revolution?', back: 'Um 1760 in Großbritannien.' },
    { id: 'eisenbahn', front: 'Erste Eisenbahn in Deutschland', back: '1835 von Nürnberg nach Fürth (Lokomotive „Adler“).' },
    { id: 'benz', front: 'Geburtsdatum des Automobils', back: '29. Januar 1886: Carl Benz meldet in Mannheim den Patent-Motorwagen an.' },
    { id: 'bertha', front: 'Was tat Bertha Benz 1888?', back: 'Sie fuhr als Erste eine längere Strecke mit dem Auto: rund 100 km von Mannheim nach Pforzheim.' },
    { id: 'daimler', front: 'Wer baute parallel zu Benz einen Motorwagen?', back: 'Gottlieb Daimler und Wilhelm Maybach in Cannstatt.' },
    { id: 'otto', front: 'Wer baute 1876 den Viertaktmotor?', back: 'Nikolaus August Otto („Ottomotor“).' },
    { id: 'diesel', front: 'Rudolf Diesel', back: 'Entwickelte in den 1890er Jahren den nach ihm benannten Dieselmotor.' },
    { id: 'reis', front: 'Wer baute 1861 ein frühes Telefon — und wer bekam 1876 das Patent?', back: 'Philipp Reis („Das Pferd frisst keinen Gurkensalat“); Patent: Alexander Graham Bell.' },
    { id: 'siemens', front: 'Werner von Siemens erfand 1866 …', back: '… den Dynamo (dynamoelektrisches Prinzip) — Grundlage der Stromerzeugung.' },
    { id: 'drais', front: 'Vorläufer des Fahrrads', back: 'Die Laufmaschine (Draisine) von Karl Drais, 1817 in Mannheim.' },
    { id: 'edison', front: 'Thomas Edison und die Glühbirne', back: '1879 entwickelte er eine langlebige, praxistaugliche Glühbirne — Vorläufer gab es aber schon (z. B. Joseph Swan).' },
    { id: 'wright', front: 'Erster Motorflug', back: '1903, Brüder Wright (USA). Otto Lilienthal machte ab 1891 Gleitflüge.' },
    { id: 'melitta', front: 'Wer erfand 1908 den Kaffeefilter?', back: 'Melitta Bentz in Dresden.' },
    { id: 'fischer', front: 'Artur Fischer erfand 1958 …', back: '… den Spreizdübel aus Kunststoff.' },
    { id: 'mp3', front: 'Wo wurde das MP3-Format entwickelt?', back: 'Am Fraunhofer-Institut in Erlangen (u. a. Karlheinz Brandenburg), 1990er Jahre.' },
  ],
};
