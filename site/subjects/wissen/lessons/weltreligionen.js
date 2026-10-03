export default {
  id: 'weltreligionen',
  title: 'Die Weltreligionen',
  summary: 'Rund drei Viertel der Menschheit gehören einer Religion an. Was glauben Juden, Christen, Muslime, Hindus und Buddhisten — und was verbindet und unterscheidet sie?',
  minutes: 24,
  goals: [
    'Die fünf großen Weltreligionen mit Gründungsfigur, Schrift und Kernideen beschreiben',
    'Die [[abrahamitische-religionen|abrahamitischen Religionen]] vergleichen',
    'Zentrale Begriffe wie [[fuenf-saeulen|fünf Säulen]], [[karma|Karma]] und [[nirwana|Nirwana]] erklären',
    'Die religiöse Landschaft in Deutschland und der Welt grob beziffern',
  ],
  blocks: [
    {
      id: 'ueberblick', type: 'text', title: 'Die Welt der Religionen in Zahlen',
      md: `
Nach Berechnungen des [Pew Research Center](wiki:Pew Research Center|Pew Research Center) gehörten 2020 weltweit an:[^pew-religion-2020]

<table><tr><th>Religion</th><th>Anhänger (2020)</th><th>Anteil</th></tr>
<tr><td>Christentum</td><td>rund 2,3 Mrd.</td><td>28,8 %</td></tr>
<tr><td>Islam</td><td>rund 2,0 Mrd.</td><td>25,6 %</td></tr>
<tr><td>ohne Religionszugehörigkeit</td><td>rund 1,9 Mrd.</td><td>24,2 %</td></tr>
<tr><td>Hinduismus</td><td>rund 1,2 Mrd.</td><td>14,9 %</td></tr>
<tr><td>Buddhismus</td><td>rund 324 Mio.</td><td>4,1 %</td></tr>
<tr><td>Judentum</td><td>rund 15 Mio.</td><td>0,2 %</td></tr></table>

Das Judentum ist also zahlenmäßig klein, aber historisch grundlegend:[^wp-weltreligion] Christentum und Islam bauen auf ihm auf. Zusammen heißen die drei die **[[abrahamitische-religionen|abrahamitischen Religionen]]**, weil sie sich auf [Abraham](wiki:Abraham|Abraham) berufen. Alle drei sind **[[monotheismus|monotheistisch]]** — sie glauben an einen einzigen Gott.`,
    },
    {
      id: 'map-heilige-staetten', type: 'map', title: 'Wo die Weltreligionen entstanden',
      view: [27, 8, 90, 36],
      layers: { cities: false, countryLabels: false, mountains: false },
      places: [
        { name: 'Jerusalem', kind: 'site', color: '#0f172a', pos: 'l', detail: `**[Jerusalem](wiki:Jerusalem|Jerusalem)** (nahe dem Geburtsort Jesu, [Bethlehem](wiki:Bethlehem)) — für **Juden** (Tempelberg, Klagemauer), **Christen** (Kreuzigung und Auferstehung Jesu, Grabeskirche) und **Muslime** (Felsendom, Al-Aqsa-Moschee) heilig.` },
        { name: 'Nazaret', kind: 'site', color: '#dc2626', pos: 't', detail: `**[Nazaret](wiki:Nazaret|Nazareth)** — der Heimatort Jesu in Galiläa.` },
        { name: 'Sinai (Berg)', label: 'Berg Sinai', kind: 'site', color: '#2563eb', pos: 'l', detail: `**[Berg Sinai](wiki:Sinai (Berg)|Mount Sinai)** — nach der Tora der Ort, an dem Mose die Gebote empfing; die genaue Lage ist unsicher, Jabal Musa gilt als traditioneller Kandidat.` },
        { name: 'Mekka', kind: 'site', color: '#059669', pos: 'r', detail: `**[Mekka](wiki:Mekka|Mecca)** — Geburtsort Mohammeds; hier steht die Kaaba. Ziel der Pilgerfahrt (Haddsch).` },
        { name: 'Medina', kind: 'site', color: '#059669', pos: 'r', detail: `**[Medina](wiki:Medina|Medina)** — zweite heilige Stadt des Islam; hier liegt das Grab Mohammeds.` },
        { name: 'Varanasi', kind: 'site', color: '#ea580c', pos: 'l', detail: `**[Varanasi](wiki:Varanasi|Varanasi)** — am Ganges, für Hindus eine der heiligsten Städte.` },
        { name: 'Bodh Gaya', kind: 'site', color: '#7c3aed', pos: 'r', detail: `**[Bodh Gaya](wiki:Bodhgaya|Bodh Gaya)** — hier soll Siddhartha Gautama unter dem Bodhi-Baum erleuchtet worden sein.` },
        { name: 'Lumbini', kind: 'site', color: '#7c3aed', pos: 't', detail: `**[Lumbini](wiki:Lumbini|Lumbini)** — der traditionelle Geburtsort des Buddha, im heutigen Nepal.` },
      ],
      caption: 'Farben: <b style="color:#2563eb">Judentum</b> · <b style="color:#dc2626">Christentum</b> · <b style="color:#059669">Islam</b> · <b style="color:#ea580c">Hinduismus</b> · <b style="color:#7c3aed">Buddhismus</b> · <b>Jerusalem</b> ist für drei Religionen heilig.',
    },
    {
      id: 'judentum', type: 'text', title: 'Judentum',
      md: `
Das **[[judentum|Judentum]]** führt sich auf den Bund Gottes mit Abraham und die Gesetzesgabe an **[Mose](wiki:Mose|Moses)** am [Berg Sinai](wiki:Sinai (Berg)|Mount Sinai) zurück. Die wichtigste Schrift ist die **[[tora|Tora]]**, die fünf Bücher Mose, Teil der hebräischen [Bibel](wiki:Bibel|Bible) (*[Tanach](wiki:Tanach|Tanakh)*). Der **[Talmud](wiki:Talmud|Talmud)** sammelt Auslegungen und Diskussionen der Rabbiner.

Gottesdienst wird in der **[Synagoge](wiki:Synagoge|Synagogue)** gefeiert, der wöchentliche Ruhetag ist der **[Sabbat](wiki:Sabbat|Shabbat)** (Freitagabend bis Samstagabend). Wichtige Feste sind **[Pessach](wiki:Pessach|Passover)** (Erinnerung an den Auszug aus Ägypten), **[Jom Kippur](wiki:Jom Kippur|Yom Kippur)** (Versöhnungstag) und **[Chanukka](wiki:Chanukka|Hanukkah)** (Lichterfest). Jüdisches Leben in Deutschland ist seit mindestens 321 belegt — ein Edikt Kaiser Konstantins erwähnt eine jüdische Gemeinde in [Köln](wiki:Köln|Cologne).`,
    },
    {
      id: 'map-schum', type: 'map', title: 'Jüdisches Leben am Rhein',
      view: [5.5, 49.0, 9.2, 51.3],
      layers: { cities: false },
      rivers: [{ name: 'Rhein', labelAt: 0.3 }],
      places: [
        { name: 'Köln', pos: 'l', detail: `**[Köln](wiki:Köln|Cologne)** — ein Edikt Kaiser Konstantins von **321** erwähnt hier eine jüdische Gemeinde: der älteste Beleg jüdischen Lebens nördlich der Alpen.` },
        { name: 'Mainz', pos: 'l', detail: `**[Mainz](wiki:Mainz|Mainz)** — eine der drei [SchUM-Städte](wiki:SchUM-Städte|ShUM-cities); im Mittelalter ein Zentrum jüdischer Gelehrsamkeit.` },
        { name: 'Worms', pos: 'l', detail: `**[Worms](wiki:Worms|Worms, Germany)** — SchUM-Stadt mit der ältesten erhaltenen Synagoge Deutschlands (Ursprung 1034).` },
        { name: 'Speyer', pos: 'r', detail: `**[Speyer](wiki:Speyer|Speyer)** — SchUM-Stadt mit der Ruine der [Synagoge](wiki:Synagoge|Synagogue) und dem Judenhof samt Mikwe.` },
      ],
      caption: 'Die Anfangsbuchstaben der Städte **S**peyer, **W**orms (hebräisch *Warmaisa*) und **M**ainz ergeben den Namen „SchUM“; die Stätten sind seit 2021 UNESCO-Welterbe.',
    },
    {
      id: 'christentum', type: 'text', title: 'Christentum',
      md: `
Das **[[christentum|Christentum]]** geht auf **[Jesus von Nazareth](wiki:Jesus von Nazareth|Historical Jesus)** zurück, der um das Jahr 30 in [Jerusalem](wiki:Jerusalem|Jerusalem) gekreuzigt wurde. Christen glauben, dass er Gottes Sohn ist und von den Toten auferstand — das feiern sie an **[Ostern](wiki:Ostern|Easter)**, dem wichtigsten Fest. **[Weihnachten](wiki:Weihnachten|Christmas)** feiert seine Geburt, **[Pfingsten](wiki:Pfingsten|Pentecost)** die Sendung des Heiligen Geistes. Die **Bibel** besteht aus dem [Alten Testament](wiki:Altes Testament|Old Testament) (weitgehend die hebräische Bibel) und dem [Neuen Testament](wiki:Neues Testament|New Testament) mit den vier [Evangelien](wiki:Evangelium (Literaturgattung)|Gospel).

Die großen Konfessionen: **[römisch-katholisch](wiki:Römisch-katholische Kirche|Catholic Church)** (mit dem [Papst](wiki:Papst|Pope) in Rom), **[orthodox](wiki:Orthodoxe Kirche|Eastern Orthodox Church)** (Trennung 1054) und **evangelisch/protestantisch** (seit der [Reformation](wiki:Reformation|Reformation) [Martin Luthers](wiki:Martin Luther|Martin Luther) 1517).`,
    },
    {
      id: 'islam', type: 'text', title: 'Islam',
      md: `
Der **[[islam|Islam]]** geht auf den Propheten **[Mohammed](wiki:Mohammed|Muhammad)** zurück (um 570–632), dem nach muslimischem Glauben der **[Koran](wiki:Koran|Quran)** als Wort Gottes offenbart wurde. „Islam“ bedeutet „Hingabe“ an Gott (arabisch *[Allah](wiki:Allah|Allah)* — dasselbe Wort verwenden auch arabischsprachige Christen). Muslime verehren auch Abraham, Mose und Jesus als Propheten.

Die religiöse Praxis ruht auf den **[[fuenf-saeulen|fünf Säulen]]**:

1. **[Schahada](wiki:Schahada|Shahada)** — das Glaubensbekenntnis
2. **[Salat](wiki:Salāt|Salah)** — das Gebet, fünfmal am Tag, Richtung [Mekka](wiki:Mekka|Mecca)
3. **[Zakat](wiki:Zakāt|Zakat)** — die Pflichtabgabe für Bedürftige
4. **[Saum](wiki:Saum (Islam)|Fasting in Islam)** — das Fasten im Monat **[Ramadan](wiki:Ramadan|Ramadan)**
5. **[Haddsch](wiki:Haddsch|Hajj)** — die Pilgerfahrt nach **Mekka**, einmal im Leben, wenn möglich

Die größten Richtungen sind **[Sunniten](wiki:Sunniten|Sunni Islam)** (rund 85–90 %) und **[Schiiten](wiki:Schiiten|Shia Islam)**; ihre Spaltung geht auf den Streit um Mohammeds Nachfolge zurück.`,
    },
    {
      id: 'asien', type: 'text', title: 'Hinduismus und Buddhismus',
      md: `
Der **[[hinduismus|Hinduismus]]** hat keinen Gründer; er wuchs über Jahrtausende in Indien. Seine ältesten Schriften sind die **[Veden](wiki:Veden|Vedas)**. Es gibt viele Gottheiten, oft als Ausdruck eines göttlichen Prinzips verstanden; bekannt sind **[Brahma](wiki:Brahma|Brahma)** (Schöpfer), **[Vishnu](wiki:Vishnu|Vishnu)** (Erhalter) und **[Shiva](wiki:Shiva|Shiva)** (Zerstörer und Erneuerer). Zentral ist der Kreislauf der Wiedergeburten (*[Samsara](wiki:Samsara|Saṃsāra)*), gelenkt vom **[[karma|Karma]]** — den Folgen der eigenen Taten. Ziel ist die Erlösung daraus (*[Moksha](wiki:Moksha|Moksha)*).[^wp-hinduismus]

Der **[[buddhismus|Buddhismus]]** entstand um das 5. Jahrhundert v. Chr. in Nordindien. **[Siddhartha Gautama](wiki:Siddhartha Gautama|The Buddha)**, ein Fürstensohn, suchte einen Weg aus dem Leiden und wurde zum **Buddha** („Erwachter“). Seine Lehre fasst er in den **[Vier Edlen Wahrheiten](wiki:Vier Edle Wahrheiten|Four Noble Truths)** zusammen: Das Leben ist von Leiden geprägt; die Ursache ist das Begehren; das Leiden kann enden; der Weg dahin ist der **[Achtfache Pfad](wiki:Edler Achtfacher Pfad|Noble Eightfold Path)**. Ziel ist das **[[nirwana|Nirwana]]**. Einen Schöpfergott kennt der Buddhismus nicht.[^wp-buddhismus]`,
    },
    {
      id: 'map-quiz-religionen', type: 'map', title: 'Finde die heiligen Orte',
      view: [27, 8, 90, 36],
      layers: { cities: false, countryLabels: false, mountains: false },
      quiz: { rounds: 7 },
      places: [{ name: 'Jerusalem', kind: 'site' }, { name: 'Mekka', kind: 'site' }, { name: 'Medina', kind: 'site' }, { name: 'Varanasi', kind: 'site' }, { name: 'Bodh Gaya', kind: 'site' }, { name: 'Lumbini', kind: 'site' }, { name: 'Nazaret', kind: 'site' }],
    },
    {
      id: 'deutschland', type: 'callout', tone: 'fact', title: 'Und in Deutschland?',
      md: `Seit 2022 gehört weniger als die Hälfte der Menschen in Deutschland einer der beiden großen christlichen Kirchen an — ein historischer Einschnitt. Die [Katholische Kirche](wiki:Katholische Kirche in Deutschland|Catholic Church in Germany) und die [Evangelische Kirche in Deutschland](wiki:Evangelische Kirche in Deutschland|Evangelical Church in Germany) (EKD) haben jeweils knapp 20 Millionen Mitglieder. Die größte nichtchristliche Religionsgemeinschaft bilden die rund 5,5 Millionen Musliminnen und Muslime.`,
    },
    {
      id: 'match-schriften', type: 'match', title: 'Heilige Schriften und Orte',
      pairs: [
        ['Tora', 'Judentum'],
        ['Neues Testament', 'Christentum'],
        ['Koran', 'Islam'],
        ['Veden', 'Hinduismus'],
        ['Vier Edle Wahrheiten', 'Buddhismus'],
      ],
    },
    {
      id: 'match-feste', type: 'match', title: 'Feste zuordnen',
      pairs: [
        ['Pessach', 'Judentum'],
        ['Ostern', 'Christentum'],
        ['Ramadan / Zuckerfest', 'Islam'],
        ['Diwali', 'Hinduismus'],
        ['Vesakh (Buddhas Geburt und Erleuchtung)', 'Buddhismus'],
      ],
    },
    {
      id: 'quiz-saeulen', type: 'quiz', title: 'Die fünf Säulen',
      question: 'Welche gehören zu den fünf Säulen des Islam?',
      options: [
        { text: 'Das tägliche Gebet (Salat)', correct: true, why: 'Fünfmal täglich, in Richtung Mekka.' },
        { text: 'Das Fasten im Ramadan (Saum)', correct: true, why: 'Von der Morgendämmerung bis Sonnenuntergang.' },
        { text: 'Die Pilgerfahrt nach Jerusalem', correct: false, why: 'Die Pflicht-Pilgerfahrt (Haddsch) führt nach Mekka.' },
        { text: 'Die Pflichtabgabe für Bedürftige (Zakat)', correct: true, why: 'Ein Teil des Vermögens geht an Arme.' },
        { text: 'Der Besuch des Freitagsgebets in einer Moschee in Mekka', correct: false, why: 'Das ist keine der fünf Säulen.' },
      ],
    },
    {
      id: 'quiz-buddhismus', type: 'quiz', title: 'Buddhismus',
      question: 'Welche Aussage über den Buddhismus trifft zu?',
      options: [
        { text: 'Er lehrt einen Weg zur Überwindung des Leidens, ohne einen Schöpfergott ins Zentrum zu stellen.', correct: true, why: 'Buddha gilt nicht als Gott, sondern als Erwachter und Lehrer.' },
        { text: 'Buddha gilt als Sohn Gottes.', correct: false, why: 'Diese Vorstellung gehört zum Christentum (Jesus).' },
        { text: 'Seine heilige Schrift sind die Veden.', correct: false, why: 'Die Veden sind die ältesten Schriften des Hinduismus.' },
        { text: 'Er entstand im 7. Jahrhundert n. Chr. in Arabien.', correct: false, why: 'Das gilt für den Islam; der Buddhismus entstand um das 5. Jh. v. Chr. in Indien.' },
      ],
    },
    {
      id: 'tl-game', type: 'game', viz: 'timeline', title: 'Religionsgeschichte in Reihenfolge',
      params: { mode: 'sort', events: [
        { year: -1200, label: 'Veden (ca.)' },
        { year: -450, label: 'Buddha (ca.)' },
        { year: 30, label: 'Kreuzigung Jesu (ca.)' },
        { year: 321, label: 'Juden in Köln belegt' },
        { year: 622, label: 'Hidschra' },
        { year: 1054, label: 'Morgenländisches Schisma' },
        { year: 1517, label: 'Reformation' },
      ] },
    },
    {
      id: 'recall-vergleich', type: 'recall', title: 'Gemeinsamkeiten und Unterschiede',
      prompt: 'Nenne zwei Gemeinsamkeiten von Judentum, Christentum und Islam — und zwei Unterschiede zwischen diesen und dem Buddhismus.',
      answer: `**Gemeinsam:** Alle drei sind monotheistisch, berufen sich auf **Abraham**, kennen Propheten wie Mose und haben eine heilige Schrift als Offenbarung (Tora, Bibel, Koran). Sie verstehen Geschichte linear — mit Schöpfung und einem Ziel.

**Unterschiede zum Buddhismus:** Der Buddhismus stellt **keinen Schöpfergott** ins Zentrum, und er denkt in einem **Kreislauf der Wiedergeburten**, aus dem man durch Erkenntnis und den Achtfachen Pfad ins Nirwana gelangt — nicht durch Gnade oder Gericht eines Gottes.`,
      cards: ['abrahamitisch', 'vier-wahrheiten'],
    },
  ],
  cards: [
    { id: 'groesste', front: 'Die drei größten Religionen der Welt nach Anhängern?', back: 'Christentum (≈ 2,3 Mrd.), Islam (≈ 2 Mrd.), Hinduismus (≈ 1,2 Mrd.). Ähnlich groß wie der Islam: Menschen ohne Religion (≈ 1,9 Mrd.).' },
    { id: 'abrahamitisch', front: 'Welche Religionen heißen „abrahamitisch“ — und warum?', back: 'Judentum, Christentum, Islam — sie berufen sich alle auf Abraham.' },
    { id: 'monotheismus', front: 'Was bedeutet Monotheismus?', back: 'Glaube an einen einzigen Gott.' },
    { id: 'tora', front: 'Was ist die Tora?', back: 'Die fünf Bücher Mose, wichtigster Teil der hebräischen Bibel.' },
    { id: 'sabbat', front: 'Wann ist der Sabbat?', back: 'Von Freitagabend bis Samstagabend.' },
    { id: 'juedische-feste', front: 'Drei wichtige jüdische Feste?', back: 'Pessach, Jom Kippur, Chanukka (auch Rosch ha-Schana, Laubhüttenfest).' },
    { id: 'koeln-321', front: 'Seit wann ist jüdisches Leben in Deutschland belegt?', back: 'Seit 321 — ein Edikt Konstantins erwähnt die jüdische Gemeinde in Köln.' },
    { id: 'christ-feste', front: 'Was feiern Christen an Ostern, Weihnachten und Pfingsten?', back: 'Auferstehung Jesu, Geburt Jesu, Sendung des Heiligen Geistes.' },
    { id: 'konfessionen', front: 'Die drei großen christlichen Konfessionen?', back: 'Römisch-katholisch, orthodox, evangelisch/protestantisch.' },
    { id: 'islam-bedeutung', front: 'Was bedeutet das Wort „Islam“?', back: 'Hingabe (an Gott).' },
    { id: 'saeulen', front: 'Die fünf Säulen des Islam?', back: 'Schahada (Bekenntnis), Salat (Gebet), Zakat (Almosen), Saum (Fasten im Ramadan), Haddsch (Pilgerfahrt nach Mekka).' },
    { id: 'sunna-schia', front: 'Die zwei größten Richtungen des Islam — und woher der Unterschied?', back: 'Sunniten (≈ 85–90 %) und Schiiten; Ursprung ist der Streit um Mohammeds Nachfolge.' },
    { id: 'trimurti', front: 'Drei bekannte Hauptgottheiten des Hinduismus?', back: 'Brahma (Schöpfer), Vishnu (Erhalter), Shiva (Zerstörer/Erneuerer).' },
    { id: 'karma', front: 'Was bedeutet Karma?', back: 'Jede Tat hat Folgen, die das weitere Leben und die Wiedergeburt bestimmen.' },
    { id: 'buddha', front: 'Wer war Buddha?', back: 'Siddhartha Gautama, Fürstensohn in Nordindien (ca. 5. Jh. v. Chr.); „Buddha“ heißt „der Erwachte“.' },
    { id: 'vier-wahrheiten', front: 'Die Vier Edlen Wahrheiten in Kurzform?', back: 'Leben ist Leiden; Ursache ist Begehren; Leiden kann enden; der Weg ist der Achtfache Pfad.' },
    { id: 'nirwana', front: 'Was ist das Nirwana?', back: 'Das Ziel im Buddhismus: Verlöschen von Gier, Hass und Verblendung, Ende des Kreislaufs der Wiedergeburten.' },
  ],
};
