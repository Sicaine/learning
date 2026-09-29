# Learning

A static, personal learning platform served from GitHub Pages (`site/`). No build step, no backend:
vanilla ES modules, KaTeX from CDN, all learner state in `localStorage`, JSON export/import as backup.

## Run & check locally

```sh
npm run dev      # node --watch tools/dev-server.mjs → http://0.0.0.0:12121, no-cache + live reload
npm run check    # node tools/validate.mjs — validates all content cross-references
node tools/check-wiki.mjs  # verifies all Wikipedia titles exist (needs network)
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

Routes: `#/`, `#/s/<sid>`, `#/s/<sid>/l/<lid>`, `#/s/<sid>/review`, `#/s/<sid>/glossary/<term>`, `#/s/<sid>/sources`, `#/backup`.

State shape (`localStorage['learning:v1']`):
`{ version, settings: { german }, lastSubject, subjects: { <sid>: { lessons: { <lid>: { tasks: { <blockId>: {done, …} }, complete, visited } }, cards: { '<lid>:<cardId>': {due, interval, ease, reps, lapses} }, last: { lessonId, blockId, at } } } }`.
Block ids and card ids are stored in learner state — **never rename them once published**.

Framework features are generic. A new subject must never need framework changes; if it does,
generalize the framework feature instead of special-casing a subject.

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
- `viz` `{ viz: <name>, title?, intro?, params?, caption?, task? }` — a task only if `task` is set.
- `game` `{ viz: <name>, title?, params? }` — always a task.

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
`> quotes`, fenced code, raw HTML (tables). Inside JS template literals escape backslashes: `\\cdot`.

## Content principles

- Teach for understanding: intuition → formula → interactive check → retrieval (recall) → cards.
- Every lesson: goals, several tasks of *different* kinds (not just multiple choice), a recall, cards,
  footnoted sources, glossary links for every technical term, a German vocabulary callout where math appears.
- Tie content to the user's real goal whenever natural (`mission` callouts): ~100k watch images, a
  synthetic 3D render generator, unstable segmentation quality, hardware 2× RTX 4090 (24 GB) + 128 GB RAM.
- The user learned math in German; always provide `de` for math terms.
- Design: modern, sleek, elegant, light only.

## Authoring gotchas (learned while writing the first lessons)

- Put math in viz text through the `md()` helper passed to `mount()`; raw inserted HTML is not KaTeX-rendered.
- Draw viz labels with SVG/HTML text rather than canvas `fillText` (unreliable in headless checks).
- Keep `[[term]]` links out of `match` pairs (chips disable link clicks, but it reads oddly).
- In single-quoted JS strings, LaTeX spacing like `\;` must be written `\;` — a lone backslash is silently dropped.
- Procedural watch images for viz: `subjects/vision/viz/watch-scene.js` (per-pixel part labels) and
  `dino-watch-scene.js` exist — reuse them instead of drawing a new watch (they should eventually merge).
- Headless smoke test: `chromium --headless=new --no-sandbox --virtual-time-budget=6000 --window-size=1400,5000 --screenshot=<file> "http://localhost:8000/#/s/<sid>/l/<lid>"`.
