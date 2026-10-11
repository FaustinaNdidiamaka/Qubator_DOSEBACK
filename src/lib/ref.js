// Unique DoseBack reference: DB-YYYY-XXXX (sequential per year).
const COUNTER_KEY = 'doseback.refCounter.v1'

function readCounter() {
  try {
    return JSON.parse(localStorage.getItem(COUNTER_KEY) || '{}')
  } catch {
    return {}
  }
}

export function nextRef(year) {
  const counters = readCounter()
  const next = (counters[year] || 1000) + 1
  // Reserve seed range 1001-1012 for sample records.
  const safe = Math.max(next, 1013)
  counters[year] = safe
  localStorage.setItem(COUNTER_KEY, JSON.stringify(counters))
  return `DB-${year}-${String(safe).padStart(4, '0')}`
}

export function resetRefCounterForTests() {
  localStorage.removeItem(COUNTER_KEY)
}
