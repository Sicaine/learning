export default {
  id: "antennen-ausbreitung",
  level: "Funktechnik",
  title: "Antennen, Leitungen und Ausbreitung",
  summary: "Dipol, Yagi, Rundstrahler; Koaxkabel, SWR, Mantelwellen; Strahlungsleistung; Troposphäre und Ionosphäre.",
  lessons: [
    { id: "dipol-und-rundstrahler", title: "Dipol, Vertikal, Rundstrahler und Antennenformen", summary: "Halbwellendipol, Groundplane, Langdraht, Loop und weitere Bauformen mit Strahlungsdiagrammen.", minutes: 25, ready: true },
    { id: "richtantennen-polarisation-gewinn", title: "Richtantennen, Polarisation und Gewinn", summary: "Yagi-Uda, Parabolspiegel, Öffnungswinkel, Polarisation, Gewinn in dBi/dBd.", minutes: 20, ready: true },
    { id: "antennenlaenge-resonanz-fusspunkt", title: "Antennenlänge, Resonanz, Fußpunktimpedanz und Speisung", summary: "Verkürzungsfaktor, Resonanz, Fußpunktwiderstand, Strom-/Spannungsspeisung, Standortwahl, Kfz-Einbau.", minutes: 20, ready: true },
    { id: "leitungen-und-steckverbinder", title: "Koaxkabel, Leitungen, Dämpfung und Steckverbinder", summary: "Wellenwiderstand, Kabeldämpfung (dB/100 m), PL/N/BNC/SMA-Stecker.", minutes: 25, ready: true },
    { id: "swr-anpassung-mantelwellen", title: "SWR, Anpassung, Mantelwellen und Messgeräte", summary: "Stehwellenverhältnis, Reflexion, Anpassgerät, Symmetrierung, Mantelwellen; SWR-Meter und VNA lesen.", minutes: 25, ready: true },
    { id: "erp-eirp", title: "Strahlungsleistung: ERP und EIRP", summary: "ERP vs. EIRP, Antennengewinn, Kabelverluste, Sendeleistung am Antenneneingang rechnen.", minutes: 15, ready: true },
    { id: "ausbreitung-ueber-30-mhz", title: "Ausbreitung oberhalb 30 MHz: Troposphäre, Sporadic-E, Aurora", summary: "Funkhorizont, Überreichweiten durch Inversion, Sporadic-E, Aurora.", minutes: 15, ready: true },
    { id: "ionosphaere-und-kurzwelle", title: "Ionosphäre und Kurzwellenausbreitung", summary: "D/E/F-Schichten, Sprungdistanz, tote Zone, MUF/LUF, Raum- und Bodenwelle; Fading, Greyline, Mögel-Dellinger-Effekt, Long-Path.", minutes: 25, ready: true },
  ],
};
