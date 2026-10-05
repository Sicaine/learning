export default {
  id: "gleichstromnetze",
  level: "Grundlagen",
  title: "Gleichstromnetze und Messen",
  summary: "Aus Einzelwiderständen werden Netzwerke. Kirchhoff, Teiler, reale Quellen, Messen. Das ist das Handwerkszeug für jede spätere Schaltung.",
  lessons: [
    { id: "kirchhoff", title: "Knoten- und Maschenregel", summary: "Knoten- und Maschenregel", minutes: 25, ready: true },
    { id: "reihen-und-parallelschaltung", title: "Reihen-, Parallel- und gemischte Schaltung", summary: "Reihen-, Parallel- und gemischte Schaltung", minutes: 30, ready: false },
    { id: "spannungsteiler-stromteiler", title: "Teiler, belastet und unbelastet", summary: "Teiler, belastet und unbelastet", minutes: 30, ready: false },
    { id: "reale-quellen", title: "Innenwiderstand, Leerlauf, Kurzschluss, Leistungsanpassung", summary: "Innenwiderstand, Leerlauf, Kurzschluss, Leistungsanpassung", minutes: 30, ready: false },
    { id: "netzwerkanalyse", title: "Brücke, Ersatzquelle, Überlagerung", summary: "Brücke, Ersatzquelle, Überlagerung", minutes: 30, ready: false },
    { id: "messen-gleichstrom", title: "Multimeter, Messfehler, Messbereichserweiterung", summary: "Spannung parallel, Strom in Reihe (hochohmig/niederohmig), Innenwiderstand der Instrumente, Shunt, Zeigerinstrument-Empfindlichkeit (Ω/V), relativer Fehler (Genauigkeitsklasse), Oszilloskop-Tastkopf-Prinzip.", minutes: 30, ready: false },
  ],
};
