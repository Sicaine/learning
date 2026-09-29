// Spaced repetition: a compact SM-2 variant with four grades.
// Times are epoch milliseconds, intervals are days.

const DAY = 86400000;
const MIN = 60000;
export const GRADES = [
  { id: 0, label: 'Again', key: '1' },
  { id: 1, label: 'Hard', key: '2' },
  { id: 2, label: 'Good', key: '3' },
  { id: 3, label: 'Easy', key: '4' },
];

export function newCard(now = Date.now()) {
  return { added: now, due: now, interval: 0, ease: 2.5, reps: 0, lapses: 0 };
}

export function schedule(card, grade, now = Date.now()) {
  const c = { ...card, reps: card.reps + 1, last: now };
  if (grade === 0) {
    c.lapses = (card.lapses || 0) + (card.interval > 0 ? 1 : 0);
    c.ease = Math.max(1.3, card.ease - 0.2);
    c.interval = 0;
    c.due = now + 10 * MIN;
    return c;
  }
  let iv;
  if (card.interval === 0) iv = [0, 0.5, 1, 3][grade];
  else if (grade === 1) iv = card.interval * 1.2;
  else if (grade === 2) iv = card.interval * card.ease;
  else iv = Math.max(card.interval * card.ease + 1, card.interval * card.ease * 1.3);
  if (grade === 1) c.ease = Math.max(1.3, card.ease - 0.15);
  if (grade === 3) c.ease = card.ease + 0.15;
  c.interval = Math.max(card.interval === 0 && grade === 1 ? 0.5 : 1, Math.round(iv * 10) / 10);
  c.due = now + c.interval * DAY;
  return c;
}

export function preview(card, grade) {
  const next = schedule(card, grade, 0);
  return formatSpan(next.due);
}

export function formatSpan(ms) {
  if (ms < 90 * MIN) return `${Math.max(1, Math.round(ms / MIN))} min`;
  if (ms < DAY) return `${Math.round(ms / (60 * MIN))} h`;
  const d = ms / DAY;
  if (d < 30) return `${Math.round(d)} d`;
  if (d < 365) return `${Math.round(d / 30)} mo`;
  return `${(d / 365).toFixed(1)} y`;
}

export function isDue(card, now = Date.now()) { return card.due <= now; }
