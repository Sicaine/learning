export default {
  id: "pruefung",
  level: "Prüfung",
  title: "Wiederholung und Prüfungssimulation",
  summary: "Gezielt wiederholen und unter Prüfungsbedingungen üben: 4 Teile à 25 Fragen, 45 Minuten, 19 richtig.",
  lessons: [
    { id: "wiederholung-schwaechen", title: "Wiederholung: Schwächen finden", summary: "Auswertung aller Übungsfragen nach Kapitel; gezielt schwache Themen (Kapitel-Heatmap) wiederholen.", minutes: 20, ready: true },
    { id: "simulation-teil-v", title: "Simulation Teil V: Kenntnisse von Vorschriften", summary: "25 zufällige Fragen aus dem V-Pool (204), 45 Minuten, 19 richtig zum Bestehen.", minutes: 45, ready: true },
    { id: "simulation-teil-b", title: "Simulation Teil B: Betriebliche Kenntnisse", summary: "25 zufällige Fragen aus dem B-Pool (172), 45 Minuten, 19 richtig.", minutes: 45, ready: true },
    { id: "simulation-teil-n", title: "Simulation Teil N: Technik (Einstiegsniveau)", summary: "25 zufällige Fragen aus dem N-Technik-Pool (195), 45 Minuten, 19 richtig; Formelsammlung als Hilfsmittel.", minutes: 45, ready: true },
    { id: "simulation-teil-e", title: "Simulation Teil E: Technik (Klasse E)", summary: "25 zufällige Fragen aus dem E-Technik-Pool (463), 45 Minuten, 19 richtig.", minutes: 45, ready: true },
    { id: "simulation-komplett", title: "Komplett-Simulation Klasse E (V, B, N, E)", summary: "Alle vier Teile hintereinander (4 × 25 Fragen, max. 4 × 45 Minuten), Gesamtauswertung und Nachprüfungs-Regel (17–18 Punkte).", minutes: 180, ready: true },
    { id: "endspurt-und-pruefungstag", title: "Endspurt: Merkliste und Prüfungstag", summary: "Eine Seite mit den Dingen, die man auswendig wissen muss (Merkwerte, dB, Formeln), Tipps für den Prüfungstag.", minutes: 20, ready: true },
  ],
};
