// Konfiguration der Prüfungssimulation Klasse E (Quelle: BNetzA Vfg. 29/2024 Nr. 7; Stand 05.10.2026).
export default {
  "title": "Prüfungssimulation Klasse E",
  "minutes": 180,
  "rules": "## Prüfung zur Klasse E (Bundesnetzagentur)\n\n**Aufbau.** Vier schriftliche Teile in einer Sitzung: **V** Kenntnisse von Vorschriften, **B** Betriebliche Kenntnisse, **N** Technik (Einstiegsniveau) und **E** Technik (Klasse E). Jeder Teil hat **25 Multiple-Choice-Fragen** mit vier Antworten, von denen genau eine richtig ist; Bearbeitungszeit höchstens **45 Minuten je Teil**. Wer schon die Klasse N hat, macht nur den Teil E.\n\n**Hilfsmittel.** Stift und ein einfacher wissenschaftlicher oder nicht programmierbarer Taschenrechner ohne Textspeicher. Gestellt werden: Anlage 1 der Amateurfunkverordnung, der Rufzeichenplan, Auszüge aus dem IARU-Bandplan (2 m und 70 cm), in den Technikteilen die Formelsammlung sowie Entwurfspapier. Elektronische Kommunikationsgeräte müssen ausgeschaltet sein.\n\n**Bestehen.** Je Teil gibt es einen Punkt pro richtiger Antwort; bestanden ist ein Teil mit **mindestens 19 von 25 Punkten** (76 %). Die Prüfung ist bestanden, wenn alle vier Teile bestanden sind.\n\n**Mündliche Nachprüfung.** Wurde nur in einem Teil die Punktzahl verfehlt, aber mindestens **17 Punkte** erreicht, kann der Prüfungsvorsitzende eine mündliche Nachprüfung in diesem Teil ansetzen. Nicht bestandene Teile lassen sich innerhalb von 24 Monaten einzeln wiederholen.\n\n**Gebühren (Stand 05.10.2026, BMDVTKBGebV in der Fassung vom 23.07.2024).** Erstprüfung Klasse E 73,50 €, Wiederholungsprüfung 42,50 € (+ 5,50 € je wiederholtem Teil), Zulassung mit Rufzeichen 20 €. Diese Simulation stellt die Prüfung nach: Die Fragen stammen aus dem amtlichen Katalog (3. Auflage, März 2024); in der echten Prüfung können auch andere, inhaltlich ähnliche Fragen vorkommen.",
  "parts": [
    {
      "id": "v",
      "title": "Teil V: Kenntnisse von Vorschriften",
      "count": 25,
      "minutes": 45,
      "passCount": 19,
      "passPercent": 76,
      "oralFrom": 17
    },
    {
      "id": "b",
      "title": "Teil B: Betriebliche Kenntnisse",
      "count": 25,
      "minutes": 45,
      "passCount": 19,
      "passPercent": 76,
      "oralFrom": 17
    },
    {
      "id": "n",
      "title": "Teil N: Technische Kenntnisse (Einstiegsniveau)",
      "count": 25,
      "minutes": 45,
      "passCount": 19,
      "passPercent": 76,
      "oralFrom": 17
    },
    {
      "id": "e",
      "title": "Teil E: Technische Kenntnisse (Klasse E)",
      "count": 25,
      "minutes": 45,
      "passCount": 19,
      "passPercent": 76,
      "oralFrom": 17
    }
  ],
  "topics": [
    {
      "id": "va",
      "title": "Radio Regulations (ITU RR)",
      "part": "v",
      "count": 17
    },
    {
      "id": "vb",
      "title": "Regelungen der CEPT (Europäische Konferenz der Verwaltungen für Post und Telekommunikation)",
      "part": "v",
      "count": 14
    },
    {
      "id": "vc",
      "title": "Amateurfunkgesetz (AFuG)",
      "part": "v",
      "count": 25
    },
    {
      "id": "vd",
      "title": "Amateurfunkverordnung (AFuV)",
      "part": "v",
      "count": 97
    },
    {
      "id": "ve",
      "title": "Weitere Gesetze, Vorschriften und Bestimmungen",
      "part": "v",
      "count": 51
    },
    {
      "id": "ba",
      "title": "Internationales Buchstabieralphabet",
      "part": "b",
      "count": 10
    },
    {
      "id": "bb",
      "title": "Betriebliche Abkürzungen und Q-Gruppen",
      "part": "b",
      "count": 16
    },
    {
      "id": "bc",
      "title": "Frequenzbereiche",
      "part": "b",
      "count": 28
    },
    {
      "id": "bd",
      "title": "Rufzeichen und Landeskenner",
      "part": "b",
      "count": 41
    },
    {
      "id": "be",
      "title": "Abwicklung des Amateurfunkverkehrs",
      "part": "b",
      "count": 57
    },
    {
      "id": "bf",
      "title": "Notfunkverkehr und Nachrichtenverkehr bei Naturkatastrophen",
      "part": "b",
      "count": 9
    },
    {
      "id": "bg",
      "title": "Stationstagebuch und QSL-Karten",
      "part": "b",
      "count": 11
    },
    {
      "id": "na",
      "title": "Allgemeine mathematische Grundkenntnisse und Größen",
      "part": "n",
      "count": 16
    },
    {
      "id": "nb",
      "title": "Elektrizitäts-, Elektromagnetismus- und Funktheorie",
      "part": "n",
      "count": 34
    },
    {
      "id": "nc",
      "title": "Elektrische und elektronische Bauteile",
      "part": "n",
      "count": 17
    },
    {
      "id": "nd",
      "title": "Elektronische Schaltungen und deren Merkmale",
      "part": "n",
      "count": 11
    },
    {
      "id": "ne",
      "title": "Modulations- und Übertragungsverfahren",
      "part": "n",
      "count": 29
    },
    {
      "id": "nf",
      "title": "Sender und Empfänger",
      "part": "n",
      "count": 26
    },
    {
      "id": "ng",
      "title": "Antennen und Übertragungsleitungen",
      "part": "n",
      "count": 26
    },
    {
      "id": "nh",
      "title": "Wellenausbreitung und Ionosphäre",
      "part": "n",
      "count": 9
    },
    {
      "id": "ni",
      "title": "Messungen und Messinstrumente",
      "part": "n",
      "count": 9
    },
    {
      "id": "nj",
      "title": "Störemissionen, -festigkeit, Schutzanforderungen, Ursachen, Abhilfe",
      "part": "n",
      "count": 4
    },
    {
      "id": "nk",
      "title": "Elektromagnetische Verträglichkeit, Anwendung, Personen- und Sachschutz",
      "part": "n",
      "count": 14
    },
    {
      "id": "ea",
      "title": "Allgemeine mathematische Grundkenntnisse und Größen",
      "part": "e",
      "count": 24
    },
    {
      "id": "eb",
      "title": "Elektrizitäts-, Elektromagnetismus- und Funktheorie",
      "part": "e",
      "count": 52
    },
    {
      "id": "ec",
      "title": "Elektrische und elektronische Bauteile",
      "part": "e",
      "count": 72
    },
    {
      "id": "ed",
      "title": "Elektronische Schaltungen und deren Merkmale",
      "part": "e",
      "count": 54
    },
    {
      "id": "ee",
      "title": "Modulations- und Übertragungsverfahren",
      "part": "e",
      "count": 29
    },
    {
      "id": "ef",
      "title": "Sender und Empfänger",
      "part": "e",
      "count": 44
    },
    {
      "id": "eg",
      "title": "Antennen und Übertragungsleitungen",
      "part": "e",
      "count": 72
    },
    {
      "id": "eh",
      "title": "Wellenausbreitung und Ionosphäre",
      "part": "e",
      "count": 31
    },
    {
      "id": "ei",
      "title": "Messungen und Messinstrumente",
      "part": "e",
      "count": 23
    },
    {
      "id": "ej",
      "title": "Störemissionen, -festigkeit, Schutzanforderungen, Ursachen, Abhilfe",
      "part": "e",
      "count": 43
    },
    {
      "id": "ek",
      "title": "Elektromagnetische Verträglichkeit, Anwendung, Personen- und Sachschutz",
      "part": "e",
      "count": 19
    }
  ]
};
