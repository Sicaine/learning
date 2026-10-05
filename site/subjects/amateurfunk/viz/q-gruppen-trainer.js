// Q-Gruppen- und Abkürzungs-Trainer: Zufallsfragen in beide Richtungen, mit Merkhilfen (nach DARC-Kurs 50ohm.de, CC BY 4.0; Bedeutungen nach RR).
// params: { count?: 10, need?: 8 }
import { deck, pick, shuffle } from './_betrieb.js';

// [Kürzel, Aussage, Frage-Form (oder null), Merkhilfe]
const Q = [
  ['QRM', 'Ich werde gestört (menschengemachte Störung).', 'Werden Sie gestört?', 'Menschengemacht'],
  ['QRN', 'Ich habe atmosphärische Störungen.', 'Haben Sie atmosphärische Störungen?', 'Natürlich'],
  ['QRO', 'Erhöhen Sie die Sendeleistung.', 'Soll ich die Sendeleistung erhöhen?', 'ein paar Watt obendrauf'],
  ['QRP', 'Verringern Sie die Sendeleistung.', 'Soll ich die Sendeleistung verringern?', 'Piano, leise'],
  ['QRT', 'Stellen Sie die Übermittlung ein.', 'Soll ich die Übermittlung einstellen?', 'terminate'],
  ['QRV', 'Ich bin bereit.', 'Sind Sie bereit?', 'vorbereitet'],
  ['QRX', 'Ich rufe Sie wieder.', 'Wann werden Sie mich wieder rufen?', 'Zeitpunkt X'],
  ['QRZ', 'Sie werden von … gerufen.', 'Von wem werde ich gerufen? (im Pile-up: weitere Stationen aufrufen)', 'bitte Rufzeichen ein zweites Mal'],
  ['QSB', 'Die Stärke Ihrer Zeichen schwankt (Fading).', 'Schwankt die Stärke meiner Zeichen?', 'bergauf, bergab'],
  ['QSL', 'Ich bestätige den Empfang.', 'Können Sie den Empfang bestätigen?', 'alles geloggt'],
  ['QSO', 'Ich kann direkt Funkverkehr aufnehmen mit …', 'Können Sie direkt Funkverkehr aufnehmen mit …?', 'umgangssprachlich: die Funkverbindung'],
  ['QSY', 'Wechseln Sie die Frequenz.', 'Soll ich die Frequenz wechseln?', 'change frequency'],
  ['QTH', 'Mein Standort ist …', 'Wie ist Ihr Standort?', 'Home'],
];
const ABK = [
  ['CQ', 'Allgemeiner Anruf'], ['CW', 'Continuous Wave (Morsetelegrafie)'], ['TX', 'Sender (Transmitter)'], ['RX', 'Empfänger (Receiver)'],
  ['TRX', 'Sendeempfänger (Transceiver)'], ['K', 'Aufforderung zum Senden („kommen“)'], ['R', 'Empfangsbestätigung (Roger, received)'], ['PSE', 'Bitte (please)'], ['BK', 'Unterbrechung der Sendung (Break)'],
];

function genMeaning() {
  const r = pick([0, 1, 2, 3]);
  if (r === 3) { const a = pick(ABK), w = shuffle(ABK.filter(x => x !== a)).slice(0, 3); return { q: `Was bedeutet die Betriebsabkürzung **${a[0]}**?`, options: [a[1], ...w.map(x => x[1])], correct: 0, explain: `**${a[0]}** = ${a[1]}.` }; }
  const a = pick(Q), w = shuffle(Q.filter(x => x !== a)).slice(0, 3);
  if (r === 0) return { q: `Du hörst: „**${a[0]}**“. Was bedeutet das?`, options: [a[1], ...w.map(x => x[1])], correct: 0, explain: `**${a[0]}** = ${a[1]} Merkhilfe: ${a[3]}.` };
  if (r === 1) return { q: `Du hörst die Frage „**${a[0]}?**“. Was wird gefragt?`, options: [a[2], ...w.map(x => x[2])], correct: 0, explain: `**${a[0]}?** = ${a[2]} Merkhilfe: ${a[3]}.` };
  const b = pick(Q.filter(x => x !== a));
  return { q: `Welche Q-Gruppe passt: „${a[1].replace(/ \(.*\)/, '')}“`, options: [a[0], ...shuffle(Q.filter(x => x !== a)).slice(0, 3).map(x => x[0])], correct: 0, explain: `**${a[0]}** = ${a[1]} Merkhilfe: ${a[3]}.` };
}
function genAction() {
  const A = [
    ['PSE QRP', 'Du verringerst die Sendeleistung.', 'Du erhöhst die Sendeleistung.', 'Du wechselst die Frequenz.', 'Du sendest eine QSL-Karte.'],
    ['PSE QRO', 'Du erhöhst die Sendeleistung.', 'Du verringerst die Sendeleistung.', 'Du wechselst die Frequenz.', 'Du beendest die Verbindung.'],
    ['PSE QSY …', 'Du wechselst die Frequenz.', 'Du erhöhst die Sendeleistung.', 'Du verringerst die Sendeleistung.', 'Du sendest eine QSL-Karte.'],
    ['QRT', 'Du stellst die Aussendung ein.', 'Du wechselst die Frequenz.', 'Du wiederholst dein Rufzeichen.', 'Du erhöhst die Sendeleistung.'],
    ['QRX 15', 'Du rufst die Station in 15 Minuten wieder.', 'Du wechselst für 15 Minuten die Frequenz.', 'Du verringerst die Leistung für 15 Minuten.', 'Du beendest die Verbindung für immer.'],
  ];
  const a = pick(A);
  return { q: `Die Gegenstation sendet „**${a[0]}**“. Wie verhältst du dich?`, options: a.slice(1), correct: 0, explain: `${a[0]}: ${a[1]}` };
}
export default function mount(stage, { params = {}, complete, md }) {
  deck(stage, { complete, md, count: params.count ?? 10, need: params.need ?? 8, itemLabel: 'Frage', gen: () => Math.random() < 0.75 ? genMeaning() : genAction(), goal: `${params.need ?? 8} von ${params.count ?? 10} richtig`, intro: 'Q-Gruppen sind immer drei Zeichen lang und beginnen mit Q. Mit angehängtem Fragezeichen werden sie zur Frage.' });
}
