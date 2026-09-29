export default {
  id: 'wiedervereinigung',
  title: 'Friedliche Revolution & Einheit',
  summary: 'Von Gorbatschow und den Montagsdemonstrationen über die Nacht des 9. November 1989 bis zum 3. Oktober 1990 — und was aus der Einheit wurde.',
  minutes: 24,
  goals: [
    'Die Ursachen und Etappen der [[friedliche-revolution|Friedlichen Revolution]] 1989 erklären',
    'Den Ablauf des [[mauerfall|Mauerfalls]] am 9. November 1989 schildern',
    'Die Schritte zur [[deutsche-einheit|Deutschen Einheit]] und den [[zwei-plus-vier-vertrag|Zwei-plus-Vier-Vertrag]] kennen',
    'Chancen und Probleme der Einheit bis heute benennen',
  ],
  blocks: [
    {
      id: 'ursachen', type: 'text', title: 'Warum 1989?',
      md: `
In den 1980er-Jahren war die DDR wirtschaftlich am Ende: Mangelwirtschaft, marode Industrie, Umweltzerstörung, wachsende Auslandsschulden. Gleichzeitig veränderte sich der Ostblock:
- In der **Sowjetunion** leitete **Michail Gorbatschow** ab 1985 Reformen ein — **Glasnost** (Offenheit) und **Perestroika** (Umbau). Er ließ erkennen, dass Moskau Aufstände nicht mehr mit Panzern niederschlagen würde.
- In **Polen** erkämpfte die Gewerkschaft **Solidarność** 1989 halbfreie Wahlen, **Ungarn** öffnete sich.
- Die SED-Führung unter **Erich Honecker** verweigerte Reformen („Den Sozialismus in seinem Lauf halten weder Ochs noch Esel auf").

Die Kommunalwahlen im **Mai 1989** wurden nachweislich gefälscht — Bürgerrechtler dokumentierten es. Unter dem Dach der evangelischen Kirche wuchs eine Opposition (Friedensgebete, Umweltgruppen).`,
    },
    {
      id: 'herbst', type: 'text', title: 'Herbst 1989: Flucht und Protest',
      md: `
Zwei Bewegungen brachten das Regime ins Wanken: die, die **gehen** wollten, und die, die **bleiben** und verändern wollten.

- **Flucht**: Im Sommer 1989 flohen Tausende über **Ungarn**, das am 19. August beim „Paneuropäischen Picknick" kurz die Grenze öffnete und am 11. September ganz freigab. Andere besetzten die westdeutsche Botschaft in **Prag**; am 30. September verkündete Außenminister **Hans-Dietrich Genscher** vom Balkon ihre Ausreise.
- **Protest**: In **Leipzig** entwickelten sich aus den Friedensgebeten in der **Nikolaikirche** die **Montagsdemonstrationen**. Am **9. Oktober 1989**, zwei Tage nach den pompösen 40-Jahr-Feiern der DDR, zogen rund **70.000** Menschen um den Innenstadtring — die Staatsmacht hatte sich auf Gewalt vorbereitet, griff aber nicht ein. „**Wir sind das Volk!**" wurde zum Ruf der **[[friedliche-revolution|Friedlichen Revolution]]**.
- Am 18. Oktober trat **Honecker** zurück (Nachfolger: Egon Krenz). Am **4. November** demonstrierten auf dem Berliner **Alexanderplatz** Hunderttausende für Reformen.`,
    },
    {
      id: 'mauerfall', type: 'text', title: '9. November 1989: Die Mauer fällt',
      md: `
Am Abend des **9. November 1989** stellte SED-Politbüromitglied **Günter Schabowski** auf einer live übertragenen Pressekonferenz eine neue Reiseregelung vor. Auf die Frage, ab wann sie gelte, blätterte er in seinen Zetteln: *„Das tritt nach meiner Kenntnis … ist das sofort, unverzüglich."*

Tausende Ost-Berliner strömten zu den Grenzübergängen. Am Übergang **Bornholmer Straße** gab der Stasi-Oberstleutnant Harald Jäger gegen 23:30 Uhr dem Druck nach und ließ die Schlagbäume öffnen. In dieser Nacht feierten Menschen aus Ost und West auf der Mauer am Brandenburger Tor — der **[[mauerfall|Mauerfall]]**.

Aus „Wir sind das Volk" wurde bald „**Wir sind ein Volk**" — die Forderung nach Einheit.[^chronik-mauer]`,
    },
    {
      id: 'fact-9nov', type: 'callout', tone: 'fact', title: 'Der 9. November — ein deutscher Schicksalstag',
      md: `**1918** Ausrufung der Republik · **1923** Hitlerputsch · **1938** Novemberpogrome · **1989** Mauerfall. Wegen der Pogrome von 1938 wurde nicht der 9. November, sondern der **3. Oktober** zum Nationalfeiertag.`,
    },
    {
      id: 'video-einheit', type: 'video', youtube: 'uGxW19Y6r5Q', label: 'Mauerfall bis Wiedervereinigung: Das passierte 1989/1990', channel: 'Terra X',
    },
    {
      id: 'einheit', type: 'text', title: 'In 328 Tagen zur Einheit',
      md: `
Nach dem Mauerfall ging es schnell:
- **Runder Tisch** (ab Dezember 1989): Regierung und Opposition verhandelten gemeinsam; die Stasi-Zentralen wurden besetzt, Akten gesichert.
- **28. November 1989**: Bundeskanzler **Helmut Kohl** legte einen Zehn-Punkte-Plan zur Einheit vor.
- **18. März 1990**: erste und einzige freie **Volkskammerwahl** — klarer Sieg der „Allianz für Deutschland" (CDU-Ost); **Lothar de Maizière** wurde Ministerpräsident.
- **1. Juli 1990**: **Währungs-, Wirtschafts- und Sozialunion** — die D-Mark kam in die DDR.
- **12. September 1990**: Der **[[zwei-plus-vier-vertrag|Zwei-plus-Vier-Vertrag]]** der beiden deutschen Staaten mit den vier Siegermächten regelte die außenpolitischen Fragen: endgültige Grenzen (Oder-Neiße-Grenze), Abzug der sowjetischen Truppen, Obergrenze der Bundeswehr, NATO-Mitgliedschaft des vereinten Deutschland.
- **3. Oktober 1990**: Die DDR trat nach **Artikel 23** des Grundgesetzes der Bundesrepublik bei — die **[[deutsche-einheit|Deutsche Einheit]]**. Aus der DDR entstanden die fünf „neuen Länder": Brandenburg, Mecklenburg-Vorpommern, Sachsen, Sachsen-Anhalt, Thüringen; Berlin wurde vereint.[^wp-wiedervereinigung][^wp-zwei-plus-vier]`,
    },
    {
      id: 'danach', type: 'text', title: 'Die Berliner Republik',
      md: `
Die Einheit war ein historisches Glück — und ein harter Umbruch. Die **[[treuhandanstalt|Treuhandanstalt]]** privatisierte oder schloss die DDR-Betriebe; Millionen Ostdeutsche verloren ihre Arbeit oder mussten sich völlig neu orientieren. Mit dem **Solidaritätszuschlag** (ab 1991) finanzierte der Staat den „Aufbau Ost". Unterschiede in Löhnen, Vermögen und politischer Stimmung zwischen Ost und West sind bis heute messbar. Die Stasi-Unterlagen wurden geöffnet — ein weltweit einmaliger Schritt.

Am **20. Juni 1991** beschloss der Bundestag knapp (338 zu 320 Stimmen), von Bonn nach **Berlin** umzuziehen; 1999 nahm er im umgebauten **Reichstagsgebäude** die Arbeit auf. Man spricht seitdem von der „**Berliner Republik**".

Bundeskanzler seit der Einheit: **Helmut Kohl** (CDU, bis 1998), **Gerhard Schröder** (SPD, 1998–2005), **Angela Merkel** (CDU, 2005–2021), **Olaf Scholz** (SPD, 2021–2025), **Friedrich Merz** (CDU, seit Mai 2025).[^bpb-einheit]`,
    },
    {
      id: 'timeline-einheit', type: 'game', viz: 'timeline', title: 'Von der Wende zur Berliner Republik',
      params: {
        mode: 'sort',
        events: [
          { year: 1985, label: 'Gorbatschow an der Macht' },
          { year: 1989, label: 'Mauerfall' },
          { year: 1990, label: 'Deutsche Einheit' },
          { year: 1991, label: 'Hauptstadtbeschluss' },
          { year: 1994, label: 'Abzug russ. Truppen' },
          { year: 1999, label: 'Bundestag im Reichstag' },
          { year: 2002, label: 'Euro-Bargeld' },
          { year: 2005, label: 'Merkel wird Kanzlerin' },
        ],
      },
    },
    {
      id: 'order-1989', type: 'order', title: 'Herbst 1989 — der genaue Ablauf',
      prompt: 'Ordne die Ereignisse des Jahres 1989.',
      items: ['Gefälschte Kommunalwahlen in der DDR', 'Ungarn öffnet seine Grenze für DDR-Bürger', 'Genscher auf dem Balkon der Prager Botschaft', 'Montagsdemonstration in Leipzig mit 70.000 Menschen', 'Rücktritt Erich Honeckers', 'Großdemonstration auf dem Alexanderplatz', 'Schabowskis Pressekonferenz und Mauerfall'],
      explain: '7. Mai → 11. September → 30. September → 9. Oktober → 18. Oktober → 4. November → 9. November 1989.',
    },
    {
      id: 'quiz-einheit', type: 'quiz', title: 'Die Einheit',
      question: 'Welche Aussagen zur Deutschen Einheit stimmen?',
      options: [
        { text: 'Die DDR trat nach Artikel 23 des Grundgesetzes der Bundesrepublik bei.', correct: true, why: 'Die Alternative — eine neue gemeinsame Verfassung nach Artikel 146 — wurde nicht gewählt.' },
        { text: 'Der Zwei-plus-Vier-Vertrag legte die Oder-Neiße-Grenze endgültig fest.', correct: true, why: 'Bestätigt im deutsch-polnischen Grenzvertrag vom November 1990.' },
        { text: 'Der Nationalfeiertag ist der 9. November, der Tag des Mauerfalls.', correct: false, why: 'Es ist der 3. Oktober — der 9. November ist auch der Tag der Pogrome von 1938.' },
        { text: 'Die D-Mark wurde bereits vor dem Beitritt in der DDR eingeführt.', correct: true, why: 'Mit der Währungs-, Wirtschafts- und Sozialunion am 1. Juli 1990.' },
        { text: 'Bundeskanzler zur Zeit der Einheit war Willy Brandt.', correct: false, why: 'Kanzler war Helmut Kohl („Kanzler der Einheit").' },
      ],
    },
    {
      id: 'match-einheit', type: 'match', title: 'Wer war wer 1989/90?',
      pairs: [
        ['Michail Gorbatschow', 'Glasnost und Perestroika'],
        ['Günter Schabowski', '„sofort, unverzüglich"'],
        ['Hans-Dietrich Genscher', 'Balkonrede in der Prager Botschaft'],
        ['Helmut Kohl', '„Kanzler der Einheit"'],
        ['Lothar de Maizière', 'einziger frei gewählter DDR-Ministerpräsident'],
        ['Egon Krenz', 'Honeckers Nachfolger'],
      ],
    },
    {
      id: 'recall-friedlich', type: 'recall', title: 'Warum blieb die Revolution friedlich?',
      prompt: 'Erkläre in 3–4 Sätzen, warum die Revolution in der DDR 1989 friedlich blieb — anders als 1953 oder etwa auf dem Tiananmen-Platz in Peking im Juni 1989.',
      answer: `Entscheidend war, dass die **Sowjetunion unter Gorbatschow** nicht mehr militärisch eingriff — ohne sowjetische Panzer fehlte der SED die letzte Rückversicherung. Die Demonstrierenden setzten konsequent auf **Gewaltlosigkeit** („Keine Gewalt!"), getragen von den **Kirchen** als Schutzraum. Am 9. Oktober in Leipzig waren es so viele Menschen, dass die örtlichen Verantwortlichen vor einem Blutbad zurückschreckten; die SED-Führung war zudem zerstritten und handlungsunfähig. Die Massenflucht hatte das Regime zusätzlich geschwächt.`,
      hints: ['Was war 1953 anders?', 'Welche Rolle spielten die Kirchen?'],
      cards: ['friedlich-grund'],
    },
  ],
  cards: [
    { id: 'gorbatschow', front: 'Wofür stehen Glasnost und Perestroika?', back: '**Glasnost** = Offenheit, **Perestroika** = Umbau — Gorbatschows Reformen in der UdSSR ab 1985.' },
    { id: 'kommunalwahl', front: 'Welche Wahl in der DDR wurde 1989 nachweislich gefälscht?', back: 'Die **Kommunalwahl am 7. Mai 1989**.' },
    { id: 'ungarn', front: 'Welches Land öffnete 1989 als erstes seine Grenze für DDR-Flüchtlinge?', back: '**Ungarn** (endgültig am 11. September 1989).' },
    { id: 'genscher', front: 'Was verkündete Genscher am 30. September 1989 in Prag?', back: 'Die **Ausreise der Botschaftsflüchtlinge** in die Bundesrepublik.' },
    { id: 'montagsdemo', front: 'Welche Demonstration gilt als Wendepunkt der Friedlichen Revolution?', back: 'Die **Leipziger Montagsdemonstration am 9. Oktober 1989** mit rund 70.000 Menschen.' },
    { id: 'wir-sind', front: 'Welche beiden Rufe prägten 1989/90?', back: '„**Wir sind das Volk!**" (Demokratie) und später „**Wir sind ein Volk!**" (Einheit).' },
    { id: 'honecker-ruecktritt', front: 'Wann trat Erich Honecker zurück?', back: 'Am **18. Oktober 1989**.' },
    { id: 'schabowski', front: 'Welcher Satz Schabowskis löste den Mauerfall aus?', back: '„Das tritt nach meiner Kenntnis … ist das **sofort, unverzüglich**."' },
    { id: 'bornholmer', front: 'An welchem Grenzübergang öffneten sich am 9. November 1989 zuerst die Schlagbäume?', back: '**Bornholmer Straße** in Berlin.' },
    { id: '9-november', front: 'Nenne vier Ereignisse der deutschen Geschichte an einem 9. November.', back: '**1918** Republik, **1923** Hitlerputsch, **1938** Novemberpogrome, **1989** Mauerfall.' },
    { id: 'volkskammerwahl', front: 'Wann fand die einzige freie Volkskammerwahl der DDR statt?', back: 'Am **18. März 1990**.' },
    { id: 'waehrungsunion', front: 'Wann kam die D-Mark in die DDR?', back: 'Am **1. Juli 1990** (Währungs-, Wirtschafts- und Sozialunion).' },
    { id: 'zwei-plus-vier', front: 'Wer unterzeichnete den Zwei-plus-Vier-Vertrag, wann und wo?', back: 'BRD, DDR, USA, UdSSR, Großbritannien, Frankreich — **12. September 1990** in **Moskau**.' },
    { id: 'zwei-plus-vier-inhalt', front: 'Nenne drei Inhalte des Zwei-plus-Vier-Vertrags.', back: 'Endgültige Grenzen (Oder-Neiße), Abzug der sowjetischen Truppen, Obergrenze der Bundeswehr (370.000), freie Bündniswahl (NATO), Verzicht auf ABC-Waffen.' },
    { id: 'einheit-datum', front: 'Wann wurde Deutschland wiedervereinigt — auf welcher Rechtsgrundlage?', back: 'Am **3. Oktober 1990** durch Beitritt der DDR nach **Artikel 23 GG**.' },
    { id: 'neue-laender', front: 'Welche fünf „neuen Länder" entstanden 1990?', back: 'Brandenburg, Mecklenburg-Vorpommern, Sachsen, Sachsen-Anhalt, Thüringen.' },
    { id: 'hauptstadtbeschluss', front: 'Wann beschloss der Bundestag den Umzug nach Berlin?', back: 'Am **20. Juni 1991** (338 zu 320 Stimmen).' },
    { id: 'kanzler-seit-1990', front: 'Nenne die Bundeskanzler seit der Einheit in richtiger Reihenfolge.', back: '**Kohl** → **Schröder** → **Merkel** → **Scholz** → **Merz** (seit 2025).' },
    { id: 'friedlich-grund', front: 'Warum blieb die Revolution 1989 friedlich?', back: 'Kein sowjetisches Eingreifen (Gorbatschow), konsequente Gewaltlosigkeit, Schutzraum Kirche, schiere Masse der Demonstrierenden, zerstrittene SED-Führung.' },
  ],
};
