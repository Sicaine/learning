export default {
  id: "halbleiter",
  level: "Aufbau",
  title: "Halbleiter und Bauteile",
  summary: "Vom Silizium-Kristall über Diode und Transistor bis zum Operationsverstärker. Immer zuerst Kennlinie und Arbeitspunkt verstehen, dann die Schaltung.",
  lessons: [
    { id: "halbleiter-pn", title: "Halbleiter und pn-Übergang", summary: "Warum Silizium weder Leiter noch Isolator ist, wie man es mit Fremdatomen steuerbar macht — und wie aus zwei Stücken Kristall die Diode entsteht. Hier entdeckst du selbst, warum eine Diode erst ab etwa 0,6 V leitet.", minutes: 30, ready: true },
    { id: "dioden", title: "Diode, LED, Schottky, Kapazitätsdiode", summary: "Das Ventil der Elektronik: Kennlinie lesen, Arbeitspunkt mit der Arbeitsgeraden finden, LED-Vorwiderstand berechnen und die wichtigsten Diodenarten unterscheiden.", minutes: 30, ready: true },
    { id: "z-diode", title: "Z-Diode und Spannungsstabilisierung", summary: "Wie eine Diode in Sperrrichtung eine feste Spannung hält, wie du den Vorwiderstand für den ungünstigsten Fall dimensionierst — und wo die Grenzen der einfachen Z-Diodenschaltung liegen.", minutes: 30, ready: true },
    { id: "bipolartransistor", title: "Bipolartransistor als Stromverstärker und Schalter", summary: "Ein kleiner Basisstrom steuert einen großen Kollektorstrom: Anschlüsse, Kennlinien, Sättigung — und wie man mit dem richtigen Basisvorwiderstand eine Last sicher schaltet.", minutes: 35, ready: true },
    { id: "emitterschaltung", title: "Arbeitspunkt und Kleinsignalverstärker", summary: "Wie ein einzelner Transistor ein kleines Signal verstärkt: Arbeitspunkt mit Basisspannungsteiler einstellen, Spannungsverstärkung und 180°-Phasendrehung verstehen und Verzerrung vermeiden.", minutes: 35, ready: true },
    { id: "transistor-grundschaltungen", title: "E-, C-, B-Schaltung und Verstärkerklassen", summary: "Drei Wege, einen Transistor zu beschalten: Emitter-, Kollektor- und Basisschaltung im Vergleich — und die Verstärkerklassen A, B, AB und C zwischen Linearität und Wirkungsgrad.", minutes: 30, ready: true },
    { id: "mosfet", title: "FET und MOSFET", summary: "Ein Transistor, der nicht mit Strom, sondern mit einem elektrischen Feld gesteuert wird: Gate, Drain, Source, Schwellspannung — und warum moderne Schalter und Endstufen fast nur noch MOSFETs sind.", minutes: 30, ready: true },
    { id: "operationsverstaerker", title: "Operationsverstärker: Idee und ideales Modell", summary: "Ein Differenzverstärker mit riesiger Verstärkung — und wie die Gegenkopplung daraus ein präzises Bauteil macht. Mit den zwei Goldenen Regeln lässt sich fast jede OPV-Schaltung im Kopf lösen.", minutes: 35, ready: true },
    { id: "opv-schaltungen", title: "Invertierender, nichtinvertierender Verstärker, Komparator, Schmitt-Trigger", summary: "Zwei Widerstände machen aus dem OPV einen Verstärker mit exakt einstellbarer Verstärkung. Dazu Summierer, Integrator, Komparator — und der Schmitt-Trigger, der verrauschte Signale sauber schaltet.", minutes: 35, ready: true },
  ],
};
