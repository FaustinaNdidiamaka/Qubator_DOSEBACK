// Fictional sample records only. No real patient information.
// Dates are relative to today so the demo always shows every bucket.
import { addDays, todayKey } from './dates.js'

const COMMUNITIES = ['Unguwan Dosa', 'Kwaru', 'Unguwan Sarki', 'Tudun Wada', 'Kawo', 'Sabon Gari']
const PHC = 'PHC Tudun Wada'

function mk(i, name, offsetDays, extra = {}) {
  const today = todayKey()
  const year = today.slice(0, 4)
  return {
    child: {
      id: `DB-${year}-${String(1001 + i).padStart(4, '0')}`,
      name,
      dob: '',
      caregiverName: extra.caregiver || `Caregiver of ${name.split(' ')[0]}`,
      caregiverPhone: '0800-000-0000',
      contactPref: 'any',
      consent: true,
      community: COMMUNITIES[i % COMMUNITIES.length],
      phc: PHC,
      createdAt: today,
      status: 'active',
      ...extra.child,
    },
    appointment: {
      id: `appt-seed-${i}`,
      date: addDays(today, offsetDays),
      confirmedBy: 'A. Focal Person',
      confirmedAt: today,
      completed: extra.completed || false,
      closed: false,
      ...extra.appointment,
    },
    followUps: extra.followUps || [],
  }
}

export function seedRecords() {
  const t = todayKey()
  return [
    mk(0, 'Amina Bello (demo)', -5, { caregiver: 'Hauwa Bello' }),
    mk(1, 'Chidi Okafor (demo)', -3, { caregiver: 'Ngozi Okafor' }),
    mk(2, 'Fatima Sani (demo)', -1, {
      caregiver: 'Aisha Sani',
      followUps: [
        { id: 'fu-s2-1', date: t, method: 'call', outcome: 'not-reached', nextAction: 'Visit home tomorrow', by: 'CHW demo', createdAt: t, delivered: false },
      ],
    }),
    mk(3, 'Ibrahim Musa (demo)', 0, { caregiver: 'Zainab Musa' }),
    mk(4, 'Ngozi Eze (demo)', 0, { caregiver: 'Ada Eze' }),
    mk(5, 'Yusuf Abdullahi (demo)', 2, { caregiver: 'Maryam Abdullahi' }),
    mk(6, 'Kemi Adeyemi (demo)', 5, { caregiver: 'Funke Adeyemi' }),
    mk(7, 'Sara Ibrahim (demo)', 9, { caregiver: 'Laila Ibrahim' }),
    mk(8, 'Peter Nwosu (demo)', -10, {
      caregiver: 'Grace Nwosu',
      completed: true,
      appointment: { id: 'appt-seed-8', date: addDays(t, -10), confirmedBy: 'A. Focal Person', confirmedAt: t, completed: true, closed: false, outcome: 'Vaccination verified at PHC' },
      followUps: [
        { id: 'fu-s8-1', date: addDays(t, -9), method: 'visit', outcome: 'visit-done', nextAction: '', by: 'CHW demo', createdAt: t, delivered: true },
      ],
    }),
    mk(9, 'Hassan Garba (demo)', -4, {
      caregiver: 'Fatima Garba',
      followUps: [
        { id: 'fu-s9-1', date: addDays(t, -2), method: 'call', outcome: 'needs-verification', nextAction: 'Ask for card on next visit', by: 'CHW demo', createdAt: t, delivered: true, verified: false },
      ],
    }),
    mk(10, 'Adaeze Obi (demo)', -6, {
      caregiver: 'Chioma Obi',
      followUps: [
        { id: 'fu-s10-1', date: addDays(t, -5), method: 'call', outcome: 'reached-planned', nextAction: 'Return Thursday', by: 'CHW demo', createdAt: t, delivered: true },
        { id: 'fu-s10-2', date: addDays(t, -1), method: 'visit', outcome: 'not-reached', nextAction: 'Try again Monday', by: 'CHW demo', createdAt: t, delivered: false },
      ],
    }),
    mk(11, 'Oluwaseun Bakare (demo)', 1, { caregiver: 'Bola Bakare' }),
  ]
}
