export default {
  id: "grundgroessen",
  level: "Grundlagen",
  title: "Strom, Spannung, Widerstand",
  summary: "Aus Wasseranalogie und Zahlenfeeling wird ein sauberes Bild von Ladung, Strom, Spannung, Widerstand, Leistung. Ziel: Ohm und P = U·I sicher im Kopf und mit dem Taschenrechner.",
  lessons: [
    { id: "einheiten-und-groessen", title: "Einheiten, Vorsätze, Formeln umstellen", summary: "Warum Elektrotechnik-Rechnen zu 80 % aus Vorsätzen und Umstellen besteht. Pico bis Giga, Taschenrechner (EXP/EE-Taste), SI-Einheiten der Grundgrößen.", minutes: 20, ready: false },
    { id: "strom-und-spannung", title: "Ladung, Strom, Spannung und der Stromkreis", summary: "Ladung als Menge, Strom als Fluss, Spannung als „Druck\" (Energie je Ladung). Stromkreis, technische Stromrichtung, Potential und Masse, Leiter/Isolator/Halbleiter (Überblick).", minutes: 30, ready: false },
    { id: "widerstand-und-ohm", title: "Widerstand und das Ohmsche Gesetz", summary: "R = U/I als Definition, Ohmsches Gesetz als Aussage „R ist konstant\", Kennlinien (linear/nichtlinear), Leitwert.", minutes: 30, ready: false },
    { id: "widerstaende-in-der-praxis", title: "Bauformen, Farbcode, Toleranz, NTC/PTC", summary: "ρ·l/A, Materialien, Farbcode, SMD-Code, E-Reihen, Toleranz, temperaturabhängige Widerstände (NTC, PTC, LDR, VDR), Eignung für HF (Draht-/Schicht-/Metalloxid), Dummy-Load.", minutes: 30, ready: false },
    { id: "leistung-und-energie", title: "Leistung, Energie, Wirkungsgrad", summary: "P = U·I = I²R = U²/R, W = P·t, kWh, Wirkungsgrad, Belastbarkeit eines Widerstands, Verlustwärme.", minutes: 30, ready: false },
  ],
};
