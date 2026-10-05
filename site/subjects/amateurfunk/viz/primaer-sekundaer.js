// Szenario-Trainer: primärer/sekundärer Funkdienst, Frequenzzuteilung, ISM. Regeln: AFuV Anlage 1 Abs. (3), AFuG § 3 Abs. 5, TKG.
// params: { count?: 7, need?: 6 }
import { deck } from './_betrieb.js';

const ITEMS = [
  { q: 'Du funkst auf **23 cm** (1240–1300 MHz). Dort ist der Amateurfunkdienst **sekundär**. Ein Radar (primärer Funkdienst) beginnt, dein QSO zu stören. Was gilt?',
    options: ['Ich kann keinen Schutz verlangen und muss die Frequenz räumen.', 'Das Radar muss abschalten: Der Amateurfunk war zuerst da.', 'Ich darf meine Leistung erhöhen, bis das QSO wieder klappt.', 'Ich melde es der Bundesnetzagentur, die das Radar abschalten lässt.'], correct: 0,
    explain: 'Ein sekundärer Funkdienst darf Funkstellen des primären Funkdienstes nicht stören und kann **keinen Schutz** vor deren Störungen verlangen — unabhängig davon, wer zuerst zugeteilt bekam.' },
  { q: 'Im **2-m-Band** (144–146 MHz) hat der Amateurfunk **primären** Status. Ein sekundärer Funkdienst stört dich. Was gilt?',
    options: ['Ich kann Schutz gegen Störungen durch Funkstellen sekundärer Funkdienste verlangen.', 'Primär heißt nur „zuerst zugeteilt“ — Schutz gibt es nicht.', 'Nur Behörden und Organisationen mit Sicherheitsaufgaben sind primär.', 'Ich muss die Frequenz räumen, weil der Amateurfunk kein Sicherheitsfunkdienst ist.'], correct: 0,
    explain: 'Primäre Funkdienste können Schutz gegen Störungen durch sekundäre Funkdienste verlangen. Dass der Amateurfunk **kein Sicherheitsfunkdienst** ist, ändert daran nichts.' },
  { q: 'Du hörst auf **3,6 MHz** (80 m, Amateurfunk und Seefunk primär) mitten im QSO eine **Küstenfunkstelle** mit automatisch wiederholter Morseaussendung auf deiner Frequenz. Wie verfährst du?',
    options: ['Ich benutze die Frequenz nicht weiter (außer im echten Notfall), denn die Küstenfunkstelle hat eine feste Frequenz.', 'Ich fahre fort, weil sie offenbar nur die Frequenz belegt und keinen Verkehr abwickelt.', 'Ich fahre fort, wenn ich mehr als 200 km von der Küste entfernt bin und unter 100 W sende.', 'Ich fahre fort, bis die Küstenfunkstelle mich zum Frequenzwechsel auffordert.'], correct: 0,
    explain: 'Bei **gleichrangigen primären** Diensten schützt die Frequenz der Funkstelle, der sie **früher zugeteilt** wurde. Eine Küstenfunkstelle kann nicht ausweichen; du musst es.' },
  { q: 'Welche Aussage zum **sekundären Funkdienst** ist richtig?',
    options: ['Seine Funkstellen dürfen primären Funkdiensten keine Störungen zufügen und können vor deren Störungen keinen Schutz verlangen.', 'Er ist nur später zugeteilt worden; im Konfliktfall ist er dem primären Dienst nicht nachgeordnet.', 'Er muss Störungen hinnehmen, darf sie aber nicht der Bundesnetzagentur melden.', 'Die Unterscheidung gilt nur für kommerzielle Funkstellen.'], correct: 0,
    explain: 'So steht es in Anlage 1 der AFuV. Die Unterscheidung primär/sekundär gilt für alle Funkdienste, auch den Amateurfunkdienst.' },
  { q: 'In **welchem** der Bereiche hat der Amateurfunkdienst **primären** Status?',
    options: ['7000–7200 kHz', '10100–10150 kHz', '1850–1890 kHz', '135,7–137,8 kHz'], correct: 0,
    explain: '40 m (7000–7200 kHz) ist primär. 30 m, 1850–1890 kHz und das Längstwellenband (135,7–137,8 kHz) sind sekundär.' },
  { q: 'Der Bereich **433,05–434,79 MHz** ist als **ISM-Frequenzbereich** ausgewiesen. Was bedeutet das?',
    options: ['Er wird für industrielle, wissenschaftliche, medizinische, häusliche oder ähnliche Anwendungen mitbenutzt.', 'Er dient internationalen Satellitenmessungen; es kann zu Störungen kommen.', 'Er ist für den Amateurfunk nur mit reduzierter Leistung zugelassen.', 'Er ist für den Amateurfunk gesperrt.'], correct: 0,
    explain: 'ISM = Industrial, Scientific, Medical. Solche Geräte teilen sich den Bereich mit dem Amateurfunk, brauchen aber keine Frequenzzuteilung und müssen mit Störungen leben.' },
  { q: 'Darfst du als Funkamateur auf **beliebigen Frequenzen** senden, solange du niemanden störst?',
    options: ['Nein, nur auf den für den Amateurfunkdienst ausgewiesenen Frequenzen (und nur im Rahmen deiner Klasse).', 'Ja, solange du keinen anderen Funkdienst störst.', 'Ja, auf allen Frequenzen deiner ITU-Region.', 'Ja, bei einer Notfunkübung auch außerhalb der Amateurfunkbänder.'], correct: 0,
    explain: 'Nach § 3 Abs. 5 und § 5 Abs. 3 AFuG sendest du nur auf den im Frequenzplan für den Amateurfunkdienst ausgewiesenen Frequenzen; die Nutzungsbedingungen stehen in Anlage 1 der AFuV.' },
  { q: 'Darf ein Funkamateur **alle** in den Radio Regulations für den Amateurfunk zugewiesenen Frequenzbereiche in Deutschland benutzen?',
    options: ['Nein, nur die Bereiche, die durch nationale Regelungen (AFuV Anlage 1) umgesetzt wurden.', 'Ja, die RR gelten in Deutschland unmittelbar.', 'Ja, wenn der Betrieb vorher bei der Bundesnetzagentur angemeldet wurde.', 'Nein, es gilt die Frequenznutzungsplanaufstellungsverordnung.'], correct: 0,
    explain: 'Internationale Zuweisungen wirken für dich erst über die nationale Umsetzung; die Details stehen in Anlage 1 der AFuV (und ggf. weiteren Mitteilungen der Bundesnetzagentur).' },
];
export default function mount(stage, { params = {}, complete, md }) {
  const count = params.count ?? 7, need = params.need ?? 6;
  deck(stage, { complete, md, items: ITEMS, count, need, itemLabel: 'Szenario', goal: `${need} von ${count} richtig`, intro: 'Anlage 1 der AFuV unterscheidet **primäre** und **sekundäre** Funkdienste. Entscheide, wer Schutz verlangen kann — und wer weichen muss.' });
}
