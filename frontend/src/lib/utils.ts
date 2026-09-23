/** Truey-join class values, no dependency. */
export function cn(...vals: Array<string | false | null | undefined>): string {
  return vals.filter(Boolean).join(' ');
}

/** "YYYY-MM-DD" for today (local time). */
export function nowISO(): string {
  const d = new Date();
  const m = `${d.getMonth() + 1}`.padStart(2, '0');
  const dd = `${d.getDate()}`.padStart(2, '0');
  return `${d.getFullYear()}-${m}-${dd}`;
}

/** Initials from a name, max 2 chars, uppercased. */
export function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

/** Alias kept for API layer compatibility. */
export const initialsOf = initials;

const DAY_ABBR = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/** 125 -> "2h 5m", 30 -> "30m". */
export function fmtMinutes(total: number): string {
  if (total < 60) return `${Math.round(total)}m`;
  return `${Math.floor(total / 60)}h ${Math.round(total % 60)}m`;
}

/** 12500 -> "12.5k", 2_300_000 -> "2.3M". */
export function fmtNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, '')}k`;
  return `${Math.round(n)}`;
}

/** "2026-09-19" -> "Sat 19". */
export function fmtDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return `${DAY_ABBR[d.getDay()]} ${d.getDate()}`;
}
