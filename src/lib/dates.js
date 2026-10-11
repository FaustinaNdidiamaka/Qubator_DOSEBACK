// Nigerian local calendar dates (Africa/Lagos, UTC+1, no DST).
// All appointment comparisons use YYYY-MM-DD day keys in Lagos time,
// so "due today" is consistent regardless of device timezone.
const LAGOS_TZ = 'Africa/Lagos'

const dayFmt = new Intl.DateTimeFormat('en-CA', {
  timeZone: LAGOS_TZ,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

export function todayKey() {
  return dayFmt.format(new Date())
}

export function isValidDateKey(s) {
  if (typeof s !== 'string') return false
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false
  const d = new Date(s + 'T12:00:00+01:00')
  return !Number.isNaN(d.getTime()) && toKey(d) === s
}

// Format a Date object as Lagos YYYY-MM-DD.
export function toKey(d) {
  return dayFmt.format(d)
}

// Compare two YYYY-MM-DD keys: -1 | 0 | 1 (lexicographic is safe).
export function compareDay(a, b) {
  if (a === b) return 0
  return a < b ? -1 : 1
}

export function addDays(key, n) {
  const d = new Date(key + 'T12:00:00+01:00')
  d.setTime(d.getTime() + n * 86400000)
  return toKey(d)
}

// Human label e.g. 2026-10-11 -> "11 Oct 2026".
export function formatDate(key) {
  if (!isValidDateKey(key)) return key || '—'
  const d = new Date(key + 'T12:00:00+01:00')
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

// Guard: date not more than 2 years in future (PRD error prevention).
export function isTooFarFuture(key) {
  return compareDay(key, addDays(todayKey(), 730)) > 0
}
