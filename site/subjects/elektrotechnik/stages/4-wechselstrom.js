export default {
  id: "wechselstrom",
  level: "Aufbau",
  title: "Wechselstrom",
  summary: "Sinus lesen, Effektivwert, Blindwiderstände, Zeiger/Impedanz („komplexe Rechnung light\"), Leistung, Dezibel, Schwingkreis, Filter. Das ist das Herz der Funktechnik.",
  lessons: [
    { id: "sinus-wechselspannung", title: "Sinus, Frequenz, Effektiv- und Spitzenwert", summary: "Wie eine Wechselspannung aussieht, wie du Frequenz und Spitze-Spitze-Wert am Oszilloskop abliest — und warum aus 230 V Effektivwert 325 V Spitze werden.", minutes: 30, ready: true },
    { id: "signalformen-effektivwert", title: "Rechteck, Dreieck, PWM, Mittelwert und Effektivwert", summary: "Nicht jedes Signal ist ein Sinus: Mittelwert, Gleichrichtwert und Effektivwert von Rechteck, Dreieck und PWM — und warum ein falsches Multimeter lügt.", minutes: 25, ready: true },
    { id: "blindwiderstand", title: "Kondensator und Spule im Wechselstromkreis", summary: "Warum Kondensatoren hohe Frequenzen durchlassen und Spulen sie sperren: Blindwiderstände $X_C = 1/(\\omega C)$ und $X_L = \\omega L$ und die Phasenlage von Strom und Spannung.", minutes: 30, ready: true },
    { id: "zeiger-impedanz", title: "Zeigerdiagramm und Impedanz („komplexe Rechnung light\")", summary: "Zeiger als rotierende Pfeile; Z = √(R² + X²); φ = arctan(X/R); Reihenschaltung R-L-C; Parallelschaltung Betrag via Leitwert; komplexe Zahlen nur als Schreibweise (j, Z = R + jX), keine Gleichungssysteme.", minutes: 35, ready: true },
    { id: "wechselstromleistung", title: "Wirk-, Blind- und Scheinleistung", summary: "Warum bei Wechselstrom $P = U\\cdot I\\cdot\\cos\\varphi$ gilt, was Blindleistung ist, wie das Leistungsdreieck funktioniert — und warum man Motoren kompensiert.", minutes: 30, ready: true },
    { id: "dezibel", title: "Dezibel, Pegel, Dämpfung", summary: "Warum Funker in dB rechnen: 3 dB sind doppelte Leistung, 10 dB der Faktor 10 — und Ketten aus Kabeln, Filtern und Verstärkern werden einfach addiert.", minutes: 25, ready: true },
    { id: "schwingkreis", title: "LC-Schwingkreis, Resonanz, Güte", summary: "Warum Spule und Kondensator zusammen schwingen, bei welcher Frequenz (f₀ = 1/(2π√(LC))), und was Güte und Bandbreite über die Trennschärfe verraten.", minutes: 35, ready: true },
    { id: "rc-rl-filter", title: "Tief- und Hochpass, Grenzfrequenz, Bode-Diagramm", summary: "RC- und RL-Glieder als frequenzabhängige Spannungsteiler: Tiefpass und Hochpass, Grenzfrequenz f_g = 1/(2πRC), −3 dB, 45° und 20 dB je Dekade — und wie man ein Bode-Diagramm liest.", minutes: 35, ready: true },
    { id: "bandpass-filterordnung", title: "Bandpass, Bandsperre, Filter höherer Ordnung", summary: "Warum ein einzelnes RC-Glied als Oberwellenfilter nicht reicht: Filterordnung (n × 20 dB/Dekade), Butterworth und Bessel, Bandpass und Bandsperre aus dem Schwingkreis, Saug- und Sperrkreis, Dämpfungsglied.", minutes: 30, ready: true },
  ],
};
