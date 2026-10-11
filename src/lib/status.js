import { compareDay, todayKey } from './dates.js'

// Appointment status is derived ONLY from the appointment record
// (date + resolved flags). It never depends on follow-ups.
export const APPT_LABELS = {
  upcoming: 'Upcoming',
  'due-today': 'Due today',
  overdue: 'Overdue',
  completed: 'Completed',
  closed: 'Reviewed or closed',
}

// Follow-up status is derived ONLY from follow-up records.
// Kept separate per architecture decision.
export const FOLLOWUP_LABELS = {
  none: 'No follow-up yet',
  'in-progress': 'Follow-up in progress',
  'awaiting-verification': 'Awaiting verification',
  resolved: 'Follow-up resolved',
}

export function getAppointmentStatus(appt) {
  if (!appt) return 'upcoming'
  if (appt.closed) return 'closed'
  if (appt.completed) return 'completed'
  const today = todayKey()
  const cmp = compareDay(appt.date, today)
  if (cmp < 0) return 'overdue'
  if (cmp === 0) return 'due-today'
  return 'upcoming'
}

const RESOLVED_OUTCOMES = new Set(['visit-done', 'closed-reason'])

export function getFollowUpStatus(followUps) {
  const list = followUps || []
  if (list.length === 0) return 'none'
  // Any pending verification keeps the case visible.
  if (list.some((f) => f.outcome === 'needs-verification' && !f.verified)) {
    return 'awaiting-verification'
  }
  const last = list[list.length - 1]
  if (RESOLVED_OUTCOMES.has(last.outcome)) return 'resolved'
  return 'in-progress'
}

// Dashboard bucket: does this child need attention now?
export function needsAttention(apptStatus, followStatus) {
  if (apptStatus === 'completed' || apptStatus === 'closed') return false
  if (followStatus === 'resolved') return false
  if (apptStatus === 'overdue') return true
  if (followStatus === 'in-progress' || followStatus === 'awaiting-verification') return true
  return false
}

export const FOLLOWUP_OUTCOMES = [
  { value: 'reached-planned', label: 'Caregiver reached; return visit planned' },
  { value: 'not-reached', label: 'Caregiver could not be reached' },
  { value: 'visit-done', label: 'Follow-up visit completed' },
  { value: 'needs-verification', label: "Child's vaccination requires verification" },
  { value: 'needs-review', label: 'Appointment needs clinical review' },
  { value: 'closed-reason', label: 'Follow-up closed with a documented reason' },
]
