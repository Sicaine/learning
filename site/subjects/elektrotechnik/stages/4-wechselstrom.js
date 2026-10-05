export default {
  id: "wechselstrom",
  level: "Aufbau",
  title: "Wechselstrom",
  summary: "Sinus lesen, Effektivwert, Blindwiderstände, Zeiger/Impedanz („komplexe Rechnung light\"), Leistung, Dezibel, Schwingkreis, Filter. Das ist das Herz der Funktechnik.",
  lessons: [
    { id: "sinus-wechselspannung", title: "Sinus, Frequenz, Effektiv- und Spitzenwert", summary: "Sinus, Frequenz, Effektiv- und Spitzenwert", minutes: 30, ready: false },
    { id: "signalformen-effektivwert", title: "Rechteck, Dreieck, PWM, Mittelwert und Effektivwert", summary: "Rechteck, Dreieck, PWM, Mittelwert und Effektivwert", minutes: 25, ready: false },
    { id: "blindwiderstand", title: "Kondensator und Spule im Wechselstromkreis", summary: "Kondensator und Spule im Wechselstromkreis", minutes: 30, ready: false },
    { id: "zeiger-impedanz", title: "Zeigerdiagramm und Impedanz („komplexe Rechnung light\")", summary: "Zeiger als rotierende Pfeile; Z = √(R² + X²); φ = arctan(X/R); Reihenschaltung R-L-C; Parallelschaltung Betrag via Leitwert; komplexe Zahlen nur als Schreibweise (j, Z = R + jX), keine Gleichungssysteme.", minutes: 35, ready: false },
    { id: "wechselstromleistung", title: "Wirk-, Blind- und Scheinleistung", summary: "Wirk-, Blind- und Scheinleistung", minutes: 30, ready: false },
    { id: "dezibel", title: "Dezibel, Pegel, Dämpfung", summary: "Dezibel, Pegel, Dämpfung", minutes: 25, ready: false },
    { id: "schwingkreis", title: "LC-Schwingkreis, Resonanz, Güte", summary: "LC-Schwingkreis, Resonanz, Güte", minutes: 35, ready: false },
    { id: "rc-rl-filter", title: "Tief- und Hochpass, Grenzfrequenz, Bode-Diagramm", summary: "Tief- und Hochpass, Grenzfrequenz, Bode-Diagramm", minutes: 35, ready: false },
    { id: "bandpass-filterordnung", title: "Bandpass, Bandsperre, Filter höherer Ordnung", summary: "Bandpass, Bandsperre, Filter höherer Ordnung", minutes: 30, ready: false },
  ],
};
