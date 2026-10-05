// Landeskenner-Trainer: Präfix → Land, Land → Präfix, Nachbarländer und Kontinente. Daten: ITU-Landeskennerliste (Auszug nach dem Fragenkatalog).
import { deck, pick, shuffle } from './_betrieb.js';

// [Präfix, Land, Kontinent]
export const EU = [
  ['CT', 'Portugal'], ['EA', 'Spanien'], ['EI', 'Irland'], ['EM', 'Ukraine'], ['ES', 'Estland'], ['EU', 'Belarus'], ['F', 'Frankreich'], ['G', 'Vereinigtes Königreich'],
  ['HB9', 'Schweiz'], ['HB0', 'Liechtenstein'], ['I', 'Italien'], ['LA', 'Norwegen'], ['LX', 'Luxemburg'], ['LZ', 'Bulgarien'], ['OE', 'Österreich'], ['OH', 'Finnland'],
  ['OK', 'Tschechien'], ['OM', 'Slowakei'], ['ON', 'Belgien'], ['OZ', 'Dänemark'], ['PA', 'Niederlande'], ['S5', 'Slowenien'], ['SM', 'Schweden'], ['SP', 'Polen'], ['SV', 'Griechenland'],
].map(([p, c]) => ({ p, c, k: 'Europa' }));
export const WORLD = [
  ['BY', 'China', 'Asien'], ['CE', 'Chile', 'Südamerika'], ['DS–DT', 'Südkorea', 'Asien'], ['DU–DZ', 'Philippinen', 'Asien'], ['EK', 'Armenien', 'Asien'], ['JA', 'Japan', 'Asien'],
  ['K, W, N, AA–AL', 'USA', 'Nordamerika'], ['LU', 'Argentinien', 'Südamerika'], ['PY', 'Brasilien', 'Südamerika'], ['VE', 'Kanada', 'Nordamerika'], ['VK', 'Australien', 'Ozeanien'],
  ['VU', 'Indien', 'Asien'], ['XE', 'Mexiko', 'Nordamerika'], ['ZL', 'Neuseeland', 'Ozeanien'], ['ZS', 'Südafrika', 'Afrika'], ['4X', 'Israel', 'Asien'],
].map(([p, c, k]) => ({ p, c, k }));
const ALL = [...EU, ...WORLD];
const NEIGH = ['F', 'HB9', 'OZ', 'SP', 'OE', 'ON', 'PA', 'LX', 'OK'];
const mono = t => `\`${t}\``;
const opts4 = (right, pool) => { const wrong = shuffle(pool.filter(x => x !== right)).slice(0, 3); return [right, ...wrong]; };

const gens = [
  () => { const e = pick(ALL); const o = opts4(e.c, ALL.map(x => x.c)); return { q: `Welches Land hat den Landeskenner ${mono(e.p)}?`, options: o, correct: 0, explain: `${mono(e.p)} gehört zu **${e.c}** (${e.k}).` }; },
  () => { const e = pick(ALL); const o = opts4(e.p, ALL.map(x => x.p)); return { q: `Welcher Landeskenner gehört zu **${e.c}**?`, options: o.map(mono), correct: 0, explain: `**${e.c}** hat den Landeskenner ${mono(e.p)}.` }; },
  () => { const right = pick(NEIGH); const far = ALL.filter(x => !NEIGH.includes(x.p) && !['DA–DR'].includes(x.p) && x.k === 'Europa').map(x => x.p); const o = [right, ...shuffle(far).slice(0, 3)]; const e = ALL.find(x => x.p === right); return { q: 'Welcher dieser Landeskenner gehört zu einem Land, das an Deutschland grenzt?', options: o.map(mono), correct: 0, explain: `${mono(right)} = **${e.c}** grenzt an Deutschland. Nachbarn: F, HB9, OZ, SP, OE, ON, PA, LX, OK.` }; },
  () => { const k = pick(['Südamerika', 'Asien', 'Nordamerika']); const right = pick(ALL.filter(x => x.k === k)); const others = shuffle(ALL.filter(x => x.k !== k)).slice(0, 3); return { q: `Welcher dieser Landeskenner gehört zu einem Land in **${k}**?`, options: [right, ...others].map(x => mono(x.p)), correct: 0, explain: `${mono(right.p)} = **${right.c}** (${k}). Die anderen: ${others.map(x => `${mono(x.p)} ${x.c} (${x.k})`).join(', ')}.` }; },
];

export default function mount(stage, { params = {}, complete, md }) {
  deck(stage, {
    complete, md, gen: () => pick(gens)(), count: params.count ?? 12, need: params.need ?? 10,
    goal: `${params.need ?? 10} von ${params.count ?? 12} richtig`, itemLabel: 'Frage',
    intro: 'Landeskenner-Training: Präfix und Land zuordnen, Nachbarländer und Kontinente erkennen. Die Auswahl entspricht den Ländern, die im Fragenkatalog vorkommen, plus einige Nachbarn.',
  });
}
