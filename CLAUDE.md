# Learning

A static, personal learning platform served from GitHub Pages (`site/`). No build step, no backend:
vanilla ES modules, KaTeX from CDN, all learner state in `localStorage`, JSON export/import as backup.

## Run & check locally

```sh
npm run dev      # node --watch tools/dev-server.mjs → http://0.0.0.0:12121, no-cache + live reload (tabs poll /__v; no long-lived connections)
npm run check    # node tools/validate.mjs — validates all content cross-references
node tools/check-wiki.mjs [subject [lessonId …]]  # verifies Wikipedia titles (needs network)
node tools/geocode.mjs "Kalkriese" "Xanten"          # lon/lat for map points, straight from Wikipedia
node tools/test-circuit.mjs                          # vizkit circuit engine + si.js tests against analytic solutions (must be green)
```

Always run `npm run check` after touching content; it must report 0 errors.
Deployment: `.github/workflows/pages.yml` publishes `site/` on every push to `main`.
The user tests locally and does not want to push to test — never require a push to verify something.

## Ubiquitous language

Use these words everywhere — code, UI copy, commit messages, conversation. Do not say "project",
"course", "chapter" or "module".

| Term | Meaning | In code |
|---|---|---|
| **Subject** | A focused learning theme with its own look (accent colors), e.g. *Seeing Machines* (computer vision), *Horology* (watches). The user switches between subjects in the header. | `subjects/index.js`, `subjects/<sid>/` |
| **Path** | The ordered journey through a subject, shown on the subject overview. | `views/subject.js` |
| **Stage** | A difficulty band on the path, from basics to mastery (`level`: Basics → Intermediate → Advanced → Mastery). | `subjects/<sid>/stages/*.js` |
| **Lesson** | One sitting (15–40 min) inside a stage. Can be `ready` or planned. | `subjects/<sid>/lessons/<lid>.js` |
| **Block** | One piece of a lesson: text, callout, figure, video, quiz, recall, … | `assets/js/blocks/index.js` |
| **Task** | A block the learner *does* and that gets a done-state (video, quiz, recall, numeric, order, match, game, viz-with-task). Lesson progress = tasks done / tasks. | `tasksOf()` in `content.js` |
| **Viz** | An interactive visualization/game module, specific to a subject. | `subjects/<sid>/viz/<name>.js` |
| **Card** | A spaced-repetition flashcard. Defined per lesson. | `lesson.cards` |
| **Deck** | All cards of a subject the learner has collected. Cards join the deck when a lesson is **completed**, or early when a recall is rated "Partly"/"Missed". | `state.subjects[sid].cards` |
| **Review** | A spaced-repetition session over due cards (SM-2 variant, grades Again/Hard/Good/Easy). | `views/review.js`, `srs.js` |
| **Term** | A glossary entry with English name, German name (`de`), short + long explanation, related terms. Referenced inline as `[[term-id]]`. | `subjects/<sid>/glossary/*.js` |
| **Source** | A citation (paper, book, video). Referenced inline as `[^source-id]`, rendered as numbered footnotes per lesson and in the subject's Sources library. | `subjects/<sid>/sources/*.js` |
| **Language aid** | The header toggle that shows a term's name in the *other* language next to every term link: German (`de`) in English subjects, English (`en`) in German subjects. | `settings.german`, `altName()`, CSS `.lang-de` |
| **Subject language** | `lang` in `subjects/index.js` (`'en'` default, `'de'`). Content is written in that language; framework UI strings switch via `assets/js/i18n.js` (`t(key)`). | `i18n.js` |

## Architecture

```
site/
  index.html                 shell; loads KaTeX + assets/js/app.js
  assets/css/app.css         the only stylesheet — light theme only (user hates dark mode; never add one)
  assets/js/
    app.js                   hash router, header (subject switcher, DE toggle), term/footnote popovers
    store.js                 localStorage state, export/import (merge|replace), reset
    content.js               loads subjects/lessons, builds lookup maps, tasksOf(), termUsage()
    progress.js              derived progress, completing lessons, adding cards, resume position
    srs.js                   spaced repetition scheduling
    markup.js                content dialect → HTML (see below)
    ui.js                    DOM helpers, icons, toast, progress ring
    i18n.js                  UI strings (en, de); never hard-code user-visible framework text — add a key
    blocks/index.js          block renderers + shared match game
    views/                   home, subject (path), lesson, review, glossary, sources, backup
  subjects/
    index.js                 registry: id, title, tagline, accent, accent2, art (SVG), load()
    <sid>/subject.js         imports stages/glossary/sources and exports { intro, mission, stages, glossary, sources }
```

Routes: `#/`, `#/s/<sid>`, `#/s/<sid>/l/<lid>`, `#/s/<sid>/review`, `#/s/<sid>/glossary/<term>`, `#/s/<sid>/sources`, `#/backup`,
and for subjects with a question catalogue `#/s/<sid>/practice[/<topicId|weak|new|due|all>]` and `#/s/<sid>/exam` (see "Exam & practice").

State shape (`localStorage['learning:v1']`):
`{ version, settings: { german }, lastSubject, subjects: { <sid>: { lessons: { <lid>: { tasks: { <blockId>: {done, …} }, complete, visited } }, cards: { '<lid>:<cardId>': {due, interval, ease, reps, lapses} }, last: { lessonId, blockId, at } } } }`.
Block ids and card ids are stored in learner state — **never rename them once published**.

Framework features are generic. A new subject must never need framework changes; if it does,
generalize the framework feature instead of special-casing a subject.

## Exam & practice

Generic exam-preparation feature for subjects with a question catalogue (first: `amateurfunk`). A subject without `questions`
gets no extra menu entries. Code: `examkit.js` (Leitner logic, exam composition/scoring), `views/practice.js` (hub + sessions),
`views/exam.js` (simulation), `views/qparts.js` (shared rendering); normalization in `content.js` (`normalizeQuestions`).

`subjects/<sid>/subject.js` additionally exports `questions: [qA, qB, …]` (arrays from `questions/*.js`, merged flat like glossary/sources)
and `exam`:
```js
// questions/technik-ea.js → export default [ { … }, … ]
{ id: 'EA101',            // official catalogue id if there is one, else own; unique per subject — stored in learner state, never rename
  topic: 'ea-1',          // → exam.topics[].id
  q: 'Markdown + KaTeX…', // use String.raw`…` or double backslashes: '\\;' (a lone "\;" is silently dropped; the validator flags it)
  answers: ['right', 'wrong 1', 'wrong 2', 'wrong 3'],   // exactly 4; the FIRST is always the correct one — shuffled at runtime. An answer may be text, { img: 'url', alt }, or { svg: '<svg viewBox…>', alt }
  figure: '<svg viewBox="…">…</svg>' | 'assets/….png', figureAlt?: '…',   // optional picture for the question
  explain?: 'Markdown…', lesson?: 'lesson-id' /* → "Dazu die Lektion" link */, source?: 'BNetzA Fragenkatalog …' }
// subject.js
exam: { title, rules?: 'Markdown (structure, aids, pass rule)', questionsNote?: 'Markdown source/licence note — shown small under practice hub, exam page and result',
  minutes?: 90,                                                  // global timer; optional when every part has its own `minutes`
  parts:  [{ id: 'v', title, count: 25, minutes?: 45, passCount?: 19, oralFrom?: 17, passPercent?: 76 }, …],   // count = questions per part in a simulation
  topics: [{ id: 'ea-1', title, part: 'v' }, …] }
```
Pass rule per part: `passCount` points (else `passPercent`). If exactly one part is missed with ≥ `oralFrom` points the result is "oral re-examination possible"; otherwise "not passed".
- **Practice**: Leitner boxes 1–5 with intervals 0/1/3/7/21 days (wrong → box 1, right → box+1, "mastered" = box ≥ 4). Modes: a topic id, `due`, `new`, `weak` (last answer wrong or box ≤ 2), `all` (due first, then new, then the rest). Sessions of 15 questions; keys 1–4 answer, Enter continues. The hub shows statistics per topic and exam history; the path page shows a summary card.
- **Exam** (`#/s/<sid>/exam`, `…/exam/new`, `…/exam/result`): start page shows `exam.rules`, a card "complete exam" and one card per part ("only this part under exam conditions"). If every part has `minutes`, the complete exam runs the parts one after another, each with its own timer; at the end of a part (hand-in or timeout) a waiting page "Part X finished — continue with Y" appears, no way back. Otherwise (only global `exam.minutes`) the complete exam is one timed block. Per part `count` random questions, round-robin over the part's topics; warning at 5 min; no feedback until the end; flags, overview grid, keys 1–4 / ←→ / M. Result per part in points vs pass mark, overall passed / oral re-examination possible / not passed, all mistakes with correct answer, explanation and lesson link. Every answer also feeds the practice boxes.
- **Practice modes** also: `part:<partId>` (one exam part) and `last` (mistakes of the last finished exam). The hub shows mastered/total per exam part, per topic, and the exam history.
- Figures: `figure: 'assets/…svg|png'` renders as `<img>` (lazy, max-width, white background); answers `{ img, alt }` / `{ svg, alt }` are laid out as a 2×2 grid (one column on phones).
- **State** (`state.subjects[sid]`): `practice: { [qid]: { n, ok, last, box, due, res } }`, `exams: [{ at, mode: 'full'|partId, parts: { id: { ok, total } }, passed, status: 'passed'|'oral'|'failed', seconds }]` (last 20; older entries without `mode`/`status` still read), `examRun` (running or just-finished exam: `{ startedAt, mode, segs: [{ parts, minutes, startedAt?, seconds? }], seg, cur, done, items: [{ qid, part, order, pick, flag }] }` — current part, remaining time and finished parts survive reload; replaced by the next exam). Import merge: more repetitions (then higher box) wins per question, exams are unioned by `at`.
- Validator checks ids, 4 distinct non-empty answers, topic/part/lesson existence, figures, pool size vs `count`, and backslash traps.

## Content model

Stages are usually difficulty bands (Basics → Mastery); a breadth subject like *Allgemeinwissen* uses them
as topic areas instead (`level` is then a free-text group label such as "Kultur").

### Stage (`stages/<n>-<key>.js`)
```js
export default { id, level: 'Basics'|'Intermediate'|'Advanced'|'Mastery', title, summary,
  lessons: [{ id, title, summary, minutes, ready: true|false }] };
```

### Lesson (`lessons/<lid>.js`)
```js
export default { id, title, summary, minutes, goals: [..], blocks: [..], cards: [{ id, front, back }] };
```
- `needs: ['lesson-id', 'other-subject/lesson-id']` (optional): prerequisite lessons, shown as "Vorher hilfreich" chips under the lesson summary (green once completed; may point into another subject, e.g. `'elektrotechnik/schwingkreis'`). The validator checks every entry.
- If the subject has a question catalogue and questions carry `lesson: '<this lesson id>'`, the lesson end shows a card "N Prüfungsfragen zu dieser Lektion — Fragen üben" linking to `#/s/<sid>/practice/lesson:<id>` (practice mode `lesson:<id>`). Don't add such a button yourself.
Block types (all text fields use the markup dialect):
- `text` `{ title?, md }`
- `callout` `{ tone: insight|warning|mission|deep|german|history|fact, title?, md }` — `mission` ties content to the user's real goal; `deep` is collapsible; `german` holds vocabulary tables.
- `figure` `{ title?, html (inline SVG), caption? }`
- `video` `{ youtube: <11-char id>, label, channel, minutes?, why?, start? }` — **verify every id** via `curl "https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=<id>&format=json"`.
- `quiz` `{ question, options: [{ text, correct, why }] }` — multi-select when >1 correct.
- `recall` `{ prompt, answer, hints?, cards?: [cardIds] }` — free-text answer, reveal, self-rating, "Ask Claude" copy-prompt. Listed cards join the deck early on a weak rating.
- `numeric` `{ question, answer: number, tolerance?, unit?, hint?, explain? }`
- `order` `{ prompt, items: [in correct order], explain? }`
- `match` `{ prompt?, pairs: [[left, right], ...] }`
- `map` — see "Map block" below. A task only if `quiz` is set.
- `viz` `{ viz: <name>, title?, intro?, params?, caption?, task? }` — a task only if `task` is set.
- `game` `{ viz: <name>, title?, params? }` — always a task.

### Map block (`type: 'map'`)
Real geodata (Natural Earth, public domain) with rivers, borders, mountains, Länder and cities; pan/zoom,
tap markers for details, optional "find it on the map" quiz. **Use a map whenever a lesson talks about
places** — where the Rhine runs, where a battle was, how far a route went, which countries are meant.
```js
{ id: 'map-limes', type: 'map', title?, intro?, caption?,
  view: 'de' | 'rhein' | 'europe' | 'mediterranean' | 'near-east' | 'asia' | 'world' | … | [lonMin, latMin, lonMax, latMax],   // omit → fitted to your points/lines
  rivers: ['Rhein', { name: 'Donau', color?, label?: false, labelAt?: 0..1, quiz?: true }],   // emphasised + labelled; names: site/assets/data/geo/CATALOG.txt
  places: ['Köln', { name: 'Trier', label?, detail?, pos?: 'l'|'r'|'t'|'b', kind?, num?, color?, quiz?: false }],   // names from the gazetteer (assets/data/geo/places.js) or big cities
  points: [{ lon, lat, label, detail?, kind?, num?, color?, pos? }],   // anything else — LON FIRST; get coordinates with `node tools/geocode.mjs "Kalkriese"`
  lines:  [{ label, coords: [[lon, lat], …], dashed?, color?, arrow?, labelAt?, detail?, quiz? }],   // routes, frontiers, migrations
  areas:  [{ label, coords: [[lon, lat], …], color?, detail?, quiz? }],                              // hand-drawn rough regions
  highlight: [{ countries: ['Frankreich'], states: ['Bayern'], label, color?, quiz? }],              // modern countries/Länder as stand-ins (say "heutige Staaten" in the caption)
  layers: { states, stateLabels, rivers, riverLabels, lakes, mountains, mountainLabels: false|['Alpen', …], peaks: true|['Zugspitze', …], cities: false|'capitals'|'major'|'all', countryLabels: true|false|'highlight', seaLabels },
  landscapes: ['Schwarzwald', 'Eifel'] | true,   // italic landscape labels from the gazetteer (kind 'land')
  quiz: true | { rounds: 8 } }                   // targets = places/points + rivers/lines/areas/highlights with quiz:true; needs ≥ 3
```
Every target (place/point/river/line/area/highlight) may carry `ask: 'Hauptstadt von Sachsen'` — the quiz prompt text — while `label` stays the name shown after the hit; `detail` shows on tap for points, lines, areas and highlights.
`kind`: `place` (dot, default), `capital`, `site` (diamond), `battle` (✕), `peak` (triangle), `land` (label only); `num: 1` draws numbered stations (voyages, campaigns).
Country/state/river names are German. Prefer `places` (verified coordinates). Historical borders do not exist in the data:
draw `lines`/`areas` roughly and say so in the caption, or use `highlight` with modern countries.
Rules of thumb: 1–2 maps per place-heavy lesson; a short `detail` (with wiki links) on every marker; zoom the `view` to
the story (a river map should show the whole river); finish with a `quiz` map in geography-heavy lessons.
Data is rebuilt by `tools/build-geo.mjs` / `tools/build-places.mjs`; the validator checks names and coordinates.

### Wikipedia links in running text
`[Cherusker](wiki:Cherusker|Cherusci)` links the words to Wikipedia: the first title is in the **subject's language**
(German subject → de.wikipedia), the optional second one is the other language (en ↔ de). Hover shows both; every
lesson ends with a "Mehr auf Wikipedia" list built from all such links and from glossary terms with `wiki`.
Link people, peoples, places, events, works, institutions and concepts **at first mention in each text block** — any
text field (text, callout, quiz explanations, recall answers, map `detail`), but not inside `match` pairs or option labels.
Titles may contain spaces and parentheses (`[Bonn](wiki:Bonn (Bundeshauptstadt))`). Choose real article titles;
`node tools/check-wiki.mjs <subject> [lessonId …]` verifies them (network) — run it, titles are easy to get wrong.
The validator warns when a lesson has too few distinct inline links (8 for Allgemeinwissen/Horology, 4 for Seeing Machines).

### Viz module (`viz/<name>.js`)
```js
export default function mount(stage, { params, ctx, complete, md }) { … }
```
Render into `stage`, call `complete()` when the learner reaches the goal. Use the shared CSS vocabulary:
`.vz`, `.vz-svg`/`canvas`, `.vz-controls`, `.vz-control` (label + output + range), `.vz-readout`,
`.vz-stat` (`.hl`), `.vz-seg` (segmented buttons), `.vz-note`. Colors via CSS vars (`var(--accent)`,
`var(--accent-2)`, `var(--ink)`, `var(--muted)`, `var(--line)`). Pointer events, responsive `viewBox`.

### Term (`glossary/*.js`)
```js
{ id, term, de?, en?, cat: 'math'|'ml'|…, short, long?, symbol?, aka?: [], related?: [ids], inline?, wiki?: { en?, de? } }
```
Wikipedia links: `wiki` holds English/German article titles (`#fragment` allowed). Most live in the
subject's `glossary/wiki.js` map (id → `{ en, de }`), which the loader merges into terms. They appear in
the glossary, the term popover, and a "Read more on Wikipedia" list at the end of each lesson.
Pick articles by hand (automatic matching picks wrong pages), derive `de` from the English article's
interlanguage link where possible, and run `node tools/check-wiki.mjs` (network) to verify every title.
`de` is the German name (English subjects), `en` the English name (German subjects) — used by the language aid.
`inline` overrides how the term reads mid-sentence (default lowercases "Vector" → "vector", keeps "ViT").

### Source (`sources/*.js`)
```js
{ id, kind: 'Paper'|'Book'|'Video series'|'Article'|'Docs', title, authors, year, venue?, url, note? }
```
Only cite what you have verified (arXiv ids via `https://export.arxiv.org/api/query?id_list=…`).

### Markup dialect (`markup.js`)
`**bold**`, `*italic*`, `` `code` ``, `[text](url)`, `$inline$` / `$$display$$` KaTeX,
`[[term-id]]` / `[[term-id|shown text]]`, `[^source-id]`, `## headings`, `- lists`, `1. lists`,
`> quotes`, fenced code, **pipe tables** (`| A | B |` header, `|---|--:|` separator with optional alignment, then rows), raw HTML. Inside JS template literals escape backslashes: `\\cdot`.

## Content principles

- Teach for understanding: intuition → formula → interactive check → retrieval (recall) → cards.
- Every lesson: goals, several tasks of *different* kinds (not just multiple choice), a recall, cards,
  footnoted sources, glossary links for every technical term, a German vocabulary callout where math appears.
- Tie content to the user's real goal whenever natural (`mission` callouts): ~100k watch images, a
  synthetic 3D render generator, unstable segmentation quality, hardware 2× RTX 4090 (24 GB) + 128 GB RAM.
- The user learned math in German; always provide `de` for math terms.
- Design: modern, sleek, elegant, light only.

## Vizkit (interactive toolbox for Elektrotechnik / Amateurfunk)

`site/assets/js/vizkit/` — dependency-free ES modules (browser + Node where sensible) for fast, consistent interactive demos.
Gallery + reference demos: `site/dev/vizkit.html` (dev server → `/dev/vizkit.html`). Tests: `node tools/test-circuit.mjs` (must end green;
checks the circuit engine against analytic solutions: divider, RC/RL, RLC resonance, −3 dB, diode Newton reference, rectifier ripple, transformer, op-amp, BJT/MOSFET, error messages, speed).

| Module | Purpose |
|---|---|
| `si.js` | `fmt(4700,'Ω')`→"4,7 kΩ" (Dezimalkomma; `config({comma:false})`), `parse('4k7')`, E-series (`eNearest(v,'E12')`, `eSeries`, `eStep`), resistor `colorCode`/`fromColorCode`, `dbV/dbP/fromDbV/dbmToWatt`, `sliderToValue/valueToSlider`, `logspace/linspace/seq125` |
| `controls.js` | `controls(root, defs, onChange)` → `{values,set,on,reset}`; slider (`scale:'log'`, `snap:'E12'`/number, `values:[…]`, `unit`), `type:'seg'|'toggle'|'presets'|'button'`; click a value to type it. `readout(root, items)` (`.vz-stat`), `goals(root, defs, onAll)` (✓/○ chips) |
| `circuit.js` | MNA simulator: `new Netlist()…`, `dcSolve`, `transient`, `createSim` (step-wise, live parameter changes), `acSweep`, `impedance`, `resonanceFreq`, `qFactor`, `cutoff3dB`, `waves.*` |
| `plot.js` | `plot` (lin/log axes, several curves, `hline/vline/marker/band`, hover cursor, `bars`), `bode`, `timePlot`, `characteristic`, `spectrum` |
| `scope.js` | `scope(stage,{channels,timeDiv,trigger})` — trigger, Zeit/Div, Volt/Div, cursors, Uss/Ueff/f; signals = `t=>V`, `{t,v}` or `{dt,t0,data}` |
| `schematic.js` | `drawSchematic(stage, spec)` IEC/DIN symbols (resistor = rectangle), draggable parts, live current dots + potential colours; `components` library; ready layouts in `schematic-layouts.js` (`layouts.divider/rc/tank/halfWave/bridge/bjt/opamp` → `{spec, net}`) |
| `phasor.js` | `phasor` (rotating, head-to-tail addition, time-domain projection), `impedanceTriangle` |
| `anim.js` | `animate(el, (dt,t)=>…)` rAF loop; stops when `el` leaves the DOM, pauses off-screen / hidden tab; `loop.controls(root)` play/pause + slow motion |

CSS lives in `vizkit/vizkit.css` (`.vk-*` classes on top of `.vz*`), loaded automatically on first use. Light theme only.

### Minimal demo (≈25 lines)
```js
import { Netlist, acSweep, logspace, cutoff3dB } from '../../../assets/js/vizkit/circuit.js';
import { bode } from '../../../assets/js/vizkit/plot.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { fmt } from '../../../assets/js/vizkit/si.js';

export default function mount(stage, { params, complete }) {
  const root = Object.assign(document.createElement('div'), { className: 'vz vk' }); stage.append(root);
  const b = bode(root, { fmin: 10, fmax: 1e5, phaseMin: -90, phaseMax: 0 });
  const net = new Netlist().V('V1', 'in', '0', { ac: 1 }).R('R1', 'in', 'out', 1e3).C('C1', 'out', '0', 1e-7);
  const f = logspace(10, 1e5, 200);
  const ui = controls(root, [
    { id: 'R', label: 'R', unit: 'Ω', min: 100, max: 1e5, value: 1e3, scale: 'log', snap: 'E12' },
    { id: 'C', label: 'C', unit: 'F', min: 1e-9, max: 1e-5, value: 1e-7, scale: 'log', snap: 'E12' },
  ], run);
  const out = readout(root, [{ id: 'fc', label: 'Grenzfrequenz', hl: true }]);
  const g = goals(root, [{ id: 'g', label: 'fc ≈ 1 kHz (±5 %)' }], () => complete());
  function run() {
    net.set('R1', ui.values.R); net.set('C1', ui.values.C);
    const ac = acSweep(net, f), fc = cutoff3dB(f, ac.mag('out'));
    b.set('h', f, ac.db('out'), ac.phase('out')); b.mark(fc, { label: 'f_c' }); b.minus3dB(0);
    out.set({ fc: fmt(fc, 'Hz') }); if (Math.abs(fc / (params.target ?? 1e3) - 1) < 0.05) g.reach('g');
  }
  run();
}
```
Lessons load demos from `subjects/<id>/viz/<name>.js`; reuse the reference demos by re-exporting:
`export { default } from '../../../assets/js/vizkit/examples/rc-scope.js';` (relative to `subjects/<sid>/viz/`; params such as `target` come from the lesson's `viz` block).
Reference demos: `rc-scope` (target τ), `divider-schematic` (target U₂), `rlc-bode` (targetF, targetQ), `rectifier` (maxRipple), `opamp`, `phasor-rlc`, `modulation` (mode) — each in `vizkit/examples/`.

### Conventions
- Units are SI base units in code (Ω, F, H, V, A, s, Hz); display only via `si.fmt`. Never hard-code px widths: plots/scopes/schematics use responsive `viewBox`es (the logical width follows the container at creation, 300–760).
- Colours only from CSS variables (`var(--accent)`, `--accent-2`, `--good`, `--warn`, `--bad`, `--ink`, `--muted`, `--line`); never add a dark theme.
- Render labels as SVG/HTML text, not canvas. Wrap the demo in `<div class="vz vk">` (the `vk` class fixes grid column sizing).
- Call `complete()` when the goal is reached (use `goals()` for the visible ✓ chips); goals must be achievable with the offered slider ranges.
- Live demos: use `animate()` (auto-cleanup) or `createSim`; precompute with `transient`/`acSweep` for plots (a 2000-step linear run takes ≈ 4 ms warm, with diodes ≈ 25 ms).

### Netlist format (circuit.js)
Array (or `Netlist`) of `{ type, name, n: [nodes…], value, … }`; nodes are strings, ground is `'0'`/`'gnd'`; names must be unique.
`R C L` (`value`; `ic` for C/L with `uic:true`), `V`/`I` (`dc`, `wave`: `waves.sine(amp,f,offset,phase°)|square|tri|saw|pulse|step|pwl` or `t=>x`, `ac` magnitude for `acSweep`; I flows from `n[0]` through the source to `n[1]`),
`SW` (`closed` | `ctl:t=>bool` | `schedule:[[t,state]…]`; `ron`,`roff`), `D` (`model:'si'|'schottky'|'ge'`), `LED` (`color`/`vf`), `ZD` (`vz`), `Q` (`n:[C,B,E]`, `pol:'npn'|'pnp'`, `bf`, `va`), `M` (`n:[D,G,S]`, `pol:'n'|'p'`, `vto` magnitude, `kp`, `lambda`),
`OA` (`n:[+,−,out]`, `gain`, `rails:[min,max]|null`, `gbw` for AC), `E`/`G` (controlled sources), `T` (`n:[p1,p2,s1,s2]`, `lp`, `ratio` = Np/Ns, `k`) or `L`+`K` (`l1`,`l2`,`k`).
Branch currents (`res.i.R1`, `sim.i('R1')`) always flow through the element from `n[0]` to `n[1]`; a source that delivers power therefore has a *negative* current (SPICE). BJT: `Q1`, `Q1.b`, `Q1.e`; OA: current its output delivers.
`transient(net,{tstop,dt,uic,method:'trap'|'be',every})` → `{t, v:{node:Float64Array}, i:{elem:…}}` (trapezoid, Backward-Euler restart at switch/diode events, step halving when Newton fails); start without `uic` = DC operating point (sources at their `dc`/offset/low value, inductors shorted).
Errors are `CircuitError` with German messages and `.code` (`singular`, `ground`, `noconv`, `dup`, …) — catch them when learners can build circuits.
Schematic wires carry `net` (node name → potential colour) and the current of the part at their pin (or `i:'R1'` / `'-R1'`); give schematic parts the same `id` as the netlist element.

## Authoring gotchas (learned while writing the first lessons)

- Put math in viz text through the `md()` helper passed to `mount()`; raw inserted HTML is not KaTeX-rendered.
- Draw viz labels with SVG/HTML text rather than canvas `fillText` (unreliable in headless checks).
- Keep `[[term]]` links out of `match` pairs (chips disable link clicks, but it reads oddly).
- In single-quoted JS strings, LaTeX spacing like `\;` must be written `\;` — a lone backslash is silently dropped.
- Procedural watch images for viz: `subjects/vision/viz/watch-scene.js` (per-pixel part labels) and
  `dino-watch-scene.js` exist — reuse them instead of drawing a new watch (they should eventually merge).
- Headless smoke test: `chromium --headless=new --no-sandbox --virtual-time-budget=6000 --window-size=1400,5000 --screenshot=<file> "http://localhost:8000/#/s/<sid>/l/<lid>"`.
