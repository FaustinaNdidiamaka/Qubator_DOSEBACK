// Small repository layer over localStorage.
// UI must use this module - never localStorage directly -
// so storage can be replaced with an API later without UI changes.
import { seedRecords } from './seed.js'

const K = {
  children: 'doseback.children.v1',
  appointments: 'doseback.appointments.v1',
  followUps: 'doseback.followups.v1',
  seeded: 'doseback.seeded.v1',
}

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function uid(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`
}

export function ensureSeeded() {
  if (localStorage.getItem(K.seeded)) return
  const seeds = seedRecords()
  write(K.children, seeds.map((s) => s.child))
  write(
    K.appointments,
    seeds.map((s) => ({ ...s.appointment, childId: s.child.id })),
  )
  const fus = []
  seeds.forEach((s) => s.followUps.forEach((f) => fus.push({ ...f, childId: s.child.id })))
  write(K.followUps, fus)
  localStorage.setItem(K.seeded, '1')
}

export function resetDemo() {
  localStorage.removeItem(K.children)
  localStorage.removeItem(K.appointments)
  localStorage.removeItem(K.followUps)
  localStorage.removeItem(K.seeded)
  ensureSeeded()
}

export const ChildRepo = {
  list() {
    return read(K.children, [])
  },
  get(id) {
    return read(K.children, []).find((c) => c.id === id)
  },
  create(data) {
    const list = read(K.children, [])
    list.push(data)
    write(K.children, list)
    return data
  },
  update(id, patch) {
    const list = read(K.children, []).map((c) => (c.id === id ? { ...c, ...patch } : c))
    write(K.children, list)
    return list.find((c) => c.id === id)
  },
  // Possible duplicates: same name + caregiver (warn, do not block).
  findPossibleDuplicates(name, caregiverName) {
    const n = (name || '').trim().toLowerCase()
    const g = (caregiverName || '').trim().toLowerCase()
    if (!n || !g) return []
    return read(K.children, []).filter(
      (c) => c.name.trim().toLowerCase() === n && c.caregiverName.trim().toLowerCase() === g,
    )
  },
}

export const AppointmentRepo = {
  list() {
    return read(K.appointments, [])
  },
  getByChild(childId) {
    return read(K.appointments, []).find((a) => a.childId === childId)
  },
  create(data) {
    const list = read(K.appointments, [])
    const rec = { id: uid('appt'), ...data }
    list.push(rec)
    write(K.appointments, list)
    return rec
  },
  updateByChild(childId, patch) {
    const list = read(K.appointments, []).map((a) =>
      a.childId === childId ? { ...a, ...patch } : a,
    )
    write(K.appointments, list)
    return list.find((a) => a.childId === childId)
  },
}

export const FollowUpRepo = {
  list() {
    return read(K.followUps, [])
  },
  listByChild(childId) {
    return read(K.followUps, [])
      .filter((f) => f.childId === childId)
      .sort((a, b) => (a.date < b.date ? -1 : 1))
  },
  log(data) {
    const list = read(K.followUps, [])
    const rec = { id: uid('fu'), createdAt: new Date().toISOString(), ...data }
    list.push(rec)
    write(K.followUps, list)
    return rec
  },
}
