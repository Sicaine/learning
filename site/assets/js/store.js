// Central learner state. Everything the learner does lives in one JSON object
// in localStorage, so export/import is a single round-trip.

const KEY = 'learning:v1';
const VERSION = 1;
const listeners = new Set();

function blank() {
  return { version: VERSION, settings: { german: false }, lastSubject: null, subjects: {} };
}

function migrate(s) {
  if (!s || typeof s !== 'object') return blank();
  const b = blank();
  return { ...b, ...s, settings: { ...b.settings, ...(s.settings || {}) }, subjects: s.subjects || {} };
}

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return migrate(JSON.parse(raw));
  } catch (e) { console.warn('Could not read saved state', e); }
  return blank();
}

let state = load();

export function get() { return state; }

export function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); }
  catch (e) { console.warn('Could not save state', e); }
  listeners.forEach(fn => fn(state));
}

export function update(fn) { fn(state); save(); }

export function subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); }

export function subject(sid) {
  state.subjects[sid] ??= { lessons: {}, cards: {}, last: null };
  return state.subjects[sid];
}

export function lesson(sid, lid) {
  const s = subject(sid);
  s.lessons[lid] ??= { tasks: {}, complete: false };
  return s.lessons[lid];
}

// --- Backup -----------------------------------------------------------------

export function exportJSON() {
  return JSON.stringify({ app: 'learning', exportedAt: new Date().toISOString(), state }, null, 2);
}

export function downloadBackup() {
  const blob = new Blob([exportJSON()], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `learning-backup-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

// mode 'replace' swaps the whole state; 'merge' keeps whichever record is further along.
export function importJSON(text, mode = 'merge') {
  const parsed = JSON.parse(text);
  const incoming = migrate(parsed.state ?? parsed);
  if (!incoming.subjects) throw new Error('Not a learning backup');
  if (mode === 'replace') { state = incoming; save(); return; }

  for (const [sid, inc] of Object.entries(incoming.subjects)) {
    const cur = subject(sid);
    for (const [lid, l] of Object.entries(inc.lessons || {})) {
      const c = cur.lessons[lid];
      if (!c) { cur.lessons[lid] = l; continue; }
      c.complete = c.complete || l.complete;
      c.completedAt ??= l.completedAt;
      for (const [tid, t] of Object.entries(l.tasks || {})) c.tasks[tid] ??= t;
    }
    for (const [cid, card] of Object.entries(inc.cards || {})) {
      const c = cur.cards[cid];
      if (!c || (card.reps || 0) > (c.reps || 0)) cur.cards[cid] = card;
    }
    if (!cur.last || (inc.last && inc.last.at > cur.last.at)) cur.last = inc.last;
  }
  save();
}

export function reset() { state = blank(); save(); }
