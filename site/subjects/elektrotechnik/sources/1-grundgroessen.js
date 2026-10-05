// Quellen der Etappe 1-grundgroessen. Format: siehe CLAUDE.md. Gemeinsame Quellen stehen hier, lektionsspezifische in den Teildateien.
import a from './1-grundgroessen-a.js';
import b from './1-grundgroessen-b.js';
const shared = [
  { id: 'bnetza-pruefungsfragen-2024', kind: 'Docs', title: 'Prüfungsfragen zum Erwerb von Amateurfunkprüfungsbescheinigungen (Fragenkatalog und Formelsammlung)', authors: 'Bundesnetzagentur', year: 2024, venue: '3. Auflage, März 2024, gültig ab 24.06.2024', url: 'https://www.bundesnetzagentur.de/SharedDocs/Downloads/DE/Sachgebiete/Telekommunikation/Unternehmen_Institutionen/Frequenzen/Amateurfunk/Fragenkatalog/Pruefungsfragen.pdf', note: 'Amtlicher Katalog; die Formelsammlung (Anhang) bestimmt Notation und Rechenwege dieses Fachs.' },
  { id: '50ohm-lerninhalte', kind: 'Docs', title: '50ohm.de – Lerninhalte für die Amateurfunkprüfung (Klassen N, E, A)', authors: '50ohm.de-Autorenteam, koordiniert durch das AJW-Referat des DARC e. V.', year: 2024, venue: 'github.com/DARC-e-V/50ohm-contents-dl (CC BY 4.0)', url: 'https://github.com/DARC-e-V/50ohm-contents-dl', note: 'Vorlage für den Prüfungsbezug; eigene Formulierungen.' },
  { id: 'kuphaldt-lessons-in-electric-circuits', kind: 'Book', title: 'Lessons in Electric Circuits', authors: 'Tony R. Kuphaldt', year: 2007, venue: 'Open Book Project', url: 'https://www.ibiblio.org/kuphaldt/electricCircuits/', note: 'Frei lizenziertes englisches Lehrbuch; Erklärreihenfolge und Analogien als Anregung.' },
];
export default [...shared, ...a, ...b];
