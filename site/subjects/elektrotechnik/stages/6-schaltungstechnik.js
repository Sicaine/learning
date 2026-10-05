export default {
  id: "schaltungstechnik",
  level: "Fortgeschritten",
  title: "Schaltungstechnik",
  summary: "Aus Bauteilen werden vollständige Schaltungen: Netzteile, Regler, Oszillatoren, Schalten von Lasten. Alles prüfungsnah und praktisch (Funkgeräte-Stromversorgung!).",
  lessons: [
    { id: "gleichrichter", title: "Einweg-, Zweiweg- und Brückengleichrichtung", summary: "Aus dem Wechselstrom der Steckdose wird mit Dioden pulsierende Gleichspannung: Strompfade von Einweg-, Mittelpunkt- und Brückenschaltung, Diodenverluste, Mittelwert und Welligkeitsfrequenz.", minutes: 30, ready: true },
    { id: "netzteil-glaettung", title: "Glättung, Restwelligkeit, Netzteil-Aufbau", summary: "Glättung, Restwelligkeit, Netzteil-Aufbau", minutes: 35, ready: false },
    { id: "linearregler", title: "Linearer Spannungsregler", summary: "Linearer Spannungsregler", minutes: 30, ready: false },
    { id: "schaltregler", title: "Schaltnetzteil, Tief- und Hochsetzsteller", summary: "Schaltnetzteil, Tief- und Hochsetzsteller", minutes: 30, ready: false },
    { id: "oszillatoren", title: "Rückkopplung, LC-, RC- und Quarzoszillator", summary: "Rückkopplung, LC-, RC- und Quarzoszillator", minutes: 35, ready: false },
    { id: "kippstufen-555", title: "Kippschaltungen und der NE555", summary: "Kippschaltungen und der NE555", minutes: 30, ready: false },
    { id: "schalten-leistung", title: "Relais, Transistorschalter, Thyristor/Triac", summary: "Relais, Transistorschalter, Thyristor/Triac", minutes: 30, ready: false },
  ],
};
