import { useEffect, useMemo, useState } from 'react'
import './styles.css'
import { todayKey, isValidDateKey, isTooFarFuture, formatDate } from './lib/dates.js'
import { APPT_LABELS, FOLLOWUP_LABELS, FOLLOWUP_OUTCOMES, getAppointmentStatus, getFollowUpStatus, needsAttention } from './lib/status.js'
import { ChildRepo, AppointmentRepo, FollowUpRepo, ensureSeeded, resetDemo } from './lib/store.js'
import { nextRef } from './lib/ref.js'

function Badge({ kind, text }) {
  return (
    <span className={`badge ${kind}`}>
      <span className="dot" aria-hidden="true" />
      {text}
    </span>
  )
}

function enrich(children, appointments, followUps) {
  const apptByChild = new Map(appointments.map((a) => [a.childId, a]))
  const fuByChild = new Map()
  followUps.forEach((f) => {
    if (!fuByChild.has(f.childId)) fuByChild.set(f.childId, [])
    fuByChild.get(f.childId).push(f)
  })
  return children
    .filter((c) => c.status !== 'closed')
    .map((c) => {
      const appt = apptByChild.get(c.id)
      const fus = fuByChild.get(c.id) || []
      const apptStatus = getAppointmentStatus(appt)
      const followStatus = getFollowUpStatus(fus)
      return { child: c, appt, fus, apptStatus, followStatus, attention: needsAttention(apptStatus, followStatus) }
    })
}

function SafeImg({ src, alt, className, style }) {
  const [failed, setFailed] = useState(false)
  if (failed) return <div className="img-fallback" role="img" aria-label={alt}>DoseBack • Every child deserves a follow-up.</div>
  return <img src={src} alt={alt} className={className} style={style} loading="lazy" onError={() => setFailed(true)} />
}

function Welcome({ onEnter }) {
  return (
    <div className="page">
      <div className="card welcome">
        <div className="welcome-visual">
          <SafeImg src="/illustrations/welcome.svg" alt="Nigerian community health worker welcoming a mother and young child at a primary healthcare centre" />
        </div>
        <div className="welcome-copy">
          <div className="brandmark">
            <SafeImg src="/logo.svg" alt="DoseBack logo" />
          </div>
          <p className="tagline">Every child deserves a follow-up.</p>
          <h2>Welcome to DoseBack</h2>
          <p className="muted">A calm, simple workspace for community health workers and immunisation focal persons to track upcoming and overdue appointments — and document each follow-up. This demo uses fictional records only.</p>
          <div className="panel-mint" style={{ marginTop: 10 }}>
            <strong>What you can do:</strong>
            <div className="muted">See who is due today • find overdue cases • record each contact • keep outstanding cases visible.</div>
          </div>
          <div style={{ height: 12 }} />
          <button className="btn coral" onClick={onEnter} style={{ width: '100%' }}>Enter demo app</button>
          <p className="muted" style={{ fontSize: 12 }}>No login needed. Nothing leaves this device in the prototype.</p>
        </div>
      </div>
    </div>
  )
}

function HeroBanner() {
  return (
    <div className="hero">
      <div style={{ flex: 1 }}>
        <h2>Every child counts.</h2>
        <p>Stay on track with immunisation follow-ups.</p>
      </div>
      <SafeImg src="/illustrations/hero.svg" alt="Community health worker with mother and child" />
    </div>
  )
}

export default function App() {
  const [tick, setTick] = useState(0)
  const [view, setView] = useState({ name: 'welcome' })
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    ensureSeeded()
    setTick((t) => t + 1)
  }, [])

  const data = useMemo(() => {
    const children = ChildRepo.list()
    const appointments = AppointmentRepo.list()
    const followUps = FollowUpRepo.list()
    return { children, appointments, followUps, rows: enrich(children, appointments, followUps) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick])

  const refresh = () => setTick((t) => t + 1)

  const counts = useMemo(() => {
    const c = { upcoming: 0, 'due-today': 0, overdue: 0, attention: 0 }
    data.rows.forEach((r) => {
      if (r.apptStatus in c) c[r.apptStatus] += 1
      if (r.attention) c.attention += 1
    })
    return c
  }, [data])

  const openDetail = (id) => setView({ name: 'detail', childId: id })

  return (
    <div className="app">
      <div className="banner" role="note">
        Prototype — fictional records only. Not a medical system. No real patient data.
      </div>
      <div className="brandbar">
        <img className="logo" src="/logo-icon.svg" alt="DoseBack logo icon" width="40" height="40" onError={(e) => { e.currentTarget.style.display = 'none' }} />
        <div className="bt"><strong>DoseBack</strong><span>Every child deserves a follow-up.</span></div>
      </div>
      <div className="header">
        <h1>DoseBack</h1>
        <p>Every child deserves a follow-up. Saved on this device • Demo - not shared.</p>
      </div>
      {view.name !== 'welcome' && (
      <nav className="nav" aria-label="Main">
        <button className={view.name === 'dashboard' ? 'active' : ''} onClick={() => setView({ name: 'dashboard', filter: 'all' })}>Dashboard</button>
        <button className={view.name === 'children' ? 'active' : ''} onClick={() => setView({ name: 'children' })}>Children</button>
        <button className={view.name === 'register' ? 'active' : ''} onClick={() => setView({ name: 'register' })}>Register</button>
      </nav>
      )}

      {view.name === 'welcome' && (
        <Welcome onEnter={() => setView({ name: 'dashboard', filter: 'all' })} />
      )}

      {view.name === 'dashboard' && (
        <Dashboard counts={counts} rows={data.rows} filter={view.filter} setView={setView} openDetail={openDetail} refresh={refresh} />
      )}
      {view.name === 'children' && (
        <ChildList rows={data.rows} search={search} setSearch={setSearch} statusFilter={statusFilter} setStatusFilter={setStatusFilter} openDetail={openDetail} />
      )}
      {view.name === 'register' && <Register onDone={(id) => { refresh(); openDetail(id) }} />}
      {view.name === 'detail' && (
        <Detail childId={view.childId} onBack={() => setView({ name: 'dashboard', filter: 'all' })} refresh={refresh} />
      )}
      <div className="footer">DoseBack MVP prototype • {todayKey()} (Africa/Lagos) • For testing with fictional data only.</div>
    </div>
  )
}

function Dashboard({ counts, rows, filter, setView, openDetail, refresh }) {
  const f = filter || 'all'
  const visible = rows.filter((r) => {
    if (f === 'attention') return r.attention
    if (f === 'overdue' || f === 'due-today' || f === 'upcoming') return r.apptStatus === f
    return true
  }).sort((a, b) => Number(b.attention) - Number(a.attention) || (a.appt?.date < b.appt?.date ? -1 : 1))

  return (
    <div className="page">
      <HeroBanner />
      <div className="stats">
        <button className={`stat ${f === 'upcoming' ? 'sel' : ''}`} onClick={() => setView({ name: 'dashboard', filter: 'upcoming' })}><div className="n">{counts.upcoming}</div><div className="l">Upcoming</div></button>
        <button className={`stat ${f === 'due-today' ? 'sel' : ''}`} onClick={() => setView({ name: 'dashboard', filter: 'due-today' })}><div className="n">{counts['due-today']}</div><div className="l">Due today</div></button>
        <button className={`stat ${f === 'overdue' ? 'sel' : ''}`} onClick={() => setView({ name: 'dashboard', filter: 'overdue' })}><div className="n">{counts.overdue}</div><div className="l">Overdue</div></button>
        <button className={`stat ${f === 'attention' ? 'sel' : ''}`} onClick={() => setView({ name: 'dashboard', filter: 'attention' })}><div className="n">{counts.attention}</div><div className="l">Needs follow-up</div></button>
      </div>
      <div className="card">
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <h3 style={{ margin: 0 }}>{f === 'all' ? 'Children needing attention' : `List: ${f}`} ({visible.length})</h3>
          <button className="btn sec" onClick={() => { if (window.confirm('Reset demo to 12 fictional records?')) { resetDemo(); refresh() } }}>Reset demo</button>
        </div>
        {visible.length === 0 ? (
          <div className="empty">No records here. {f === 'overdue' ? 'Overdue cases will appear here when an appointment date passes.' : 'Try another category.'}</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
            {visible.slice(0, 30).map((r) => (
              <button key={r.child.id} className="childrow" onClick={() => openDetail(r.child.id)}>
                <div className="ref">{r.child.id} • {r.child.community}</div>
                <div className="nm">{r.child.name}</div>
                <div className="meta">Next: {r.appt ? formatDate(r.appt.date) : '—'}</div>
                <div className="row" style={{ marginTop: 6 }}>
                  <Badge kind={r.apptStatus} text={APPT_LABELS[r.apptStatus]} />
                  <Badge kind={r.followStatus} text={FOLLOWUP_LABELS[r.followStatus]} />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function ChildList({ rows, search, setSearch, statusFilter, setStatusFilter, openDetail }) {
  const q = search.trim().toLowerCase()
  const visible = rows.filter((r) => {
    if (statusFilter !== 'all' && r.apptStatus !== statusFilter && r.followStatus !== statusFilter) return false
    if (!q) return true
    return [r.child.id, r.child.name, r.child.caregiverName, r.child.community].join(' ').toLowerCase().includes(q)
  })
  return (
    <div className="page">
      <div className="card">
        <h2>Children ({visible.length})</h2>
        <div className="toolbar">
          <input placeholder="Search ref, name, caregiver, community" value={search} onChange={(e) => setSearch(e.target.value)} aria-label="Search children" />
        </div>
        <div className="toolbar" style={{ marginTop: 8 }}>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} aria-label="Filter by status">
            <option value="all">All statuses</option>
            <option value="upcoming">Upcoming</option>
            <option value="due-today">Due today</option>
            <option value="overdue">Overdue</option>
            <option value="in-progress">Follow-up in progress</option>
            <option value="awaiting-verification">Awaiting verification</option>
            <option value="completed">Completed</option>
            <option value="resolved">Follow-up resolved</option>
          </select>
        </div>
      </div>
      {visible.length === 0 ? (
        <div className="card"><div className="empty">No matching records. Check spelling or clear the filter.</div></div>
      ) : (
        visible.map((r) => (
          <button key={r.child.id} className="childrow" onClick={() => openDetail(r.child.id)}>
            <div className="ref">{r.child.id} • {r.child.community}</div>
            <div className="nm">{r.child.name}</div>
            <div className="meta">Next: {r.appt ? formatDate(r.appt.date) : '—'} • {r.child.caregiverName}</div>
            <div className="row" style={{ marginTop: 6 }}>
              <Badge kind={r.apptStatus} text={APPT_LABELS[r.apptStatus]} />
              <Badge kind={r.followStatus} text={FOLLOWUP_LABELS[r.followStatus]} />
            </div>
          </button>
        ))
      )}
    </div>
  )
}

function Register({ onDone }) {
  const [form, setForm] = useState({ name: '', caregiverName: '', caregiverPhone: '', community: '', phc: 'PHC Tudun Wada', contactPref: 'any', consent: true, apptDate: '', confirmedBy: '' })
  const [errors, setErrors] = useState({})
  const dupes = ChildRepo.findPossibleDuplicates(form.name, form.caregiverName)

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const submit = (e) => {
    e.preventDefault()
    const err = {}
    if (!form.name.trim()) err.name = 'Child name or identifier is required.'
    if (!form.caregiverName.trim()) err.caregiverName = 'Caregiver name is required.'
    if (!form.community.trim()) err.community = 'Community is required.'
    if (!form.phc.trim()) err.phc = 'PHC is required.'
    if (form.apptDate) {
      if (!isValidDateKey(form.apptDate)) err.apptDate = 'Enter a valid date (YYYY-MM-DD).'
      else if (isTooFarFuture(form.apptDate)) err.apptDate = 'Date is too far in the future (max 2 years).'
      else if (!form.confirmedBy.trim()) err.confirmedBy = 'Appointment date must be confirmed by an authorised health worker.'
    }
    setErrors(err)
    if (Object.keys(err).length) return
    const year = todayKey().slice(0, 4)
    const id = nextRef(year)
    const today = todayKey()
    ChildRepo.create({ id, name: form.name.trim(), dob: '', caregiverName: form.caregiverName.trim(), caregiverPhone: form.caregiverPhone.trim(), contactPref: form.contactPref, consent: !!form.consent, community: form.community.trim(), phc: form.phc.trim(), createdAt: today, status: 'active' })
    if (form.apptDate) {
      AppointmentRepo.create({ childId: id, date: form.apptDate, confirmedBy: form.confirmedBy.trim(), confirmedAt: today, completed: false, closed: false })
    } else {
      AppointmentRepo.create({ childId: id, date: addDaysSafe(today, 7), confirmedBy: form.confirmedBy.trim() || 'To be confirmed', confirmedAt: today, completed: false, closed: false, tentative: true })
    }
    onDone(id)
  }

  return (
    <div className="page">
      <form className="card" onSubmit={submit} noValidate>
        <h2>Register child (fictional demo only)</h2>
        <p className="muted">Use invented names. Do not enter real patient information.</p>
        <label>Child name / identifier*<input value={form.name} onChange={(e) => set('name', e.target.value)} />{errors.name && <span className="err">{errors.name}</span>}</label>
        <label>Caregiver name*<input value={form.caregiverName} onChange={(e) => set('caregiverName', e.target.value)} />{errors.caregiverName && <span className="err">{errors.caregiverName}</span>}</label>
        <label>Caregiver phone (for follow-up)<input value={form.caregiverPhone} onChange={(e) => set('caregiverPhone', e.target.value)} placeholder="0800-000-0000" /></label>
        <label>Community*<input value={form.community} onChange={(e) => set('community', e.target.value)} />{errors.community && <span className="err">{errors.community}</span>}</label>
        <label>Responsible PHC*<input value={form.phc} onChange={(e) => set('phc', e.target.value)} />{errors.phc && <span className="err">{errors.phc}</span>}</label>
        <div className="row">
          <label style={{ flex: 1 }}>Contact preference<select value={form.contactPref} onChange={(e) => set('contactPref', e.target.value)}><option value="any">Any</option><option value="call">Call</option><option value="visit">Visit</option></select></label>
          <label style={{ flex: 1 }}>Next appointment<input type="date" value={form.apptDate} onChange={(e) => set('apptDate', e.target.value)} />{errors.apptDate && <span className="err">{errors.apptDate}</span>}</label>
        </div>
        <label>Confirmed by (authorised worker)<input value={form.confirmedBy} onChange={(e) => set('confirmedBy', e.target.value)} placeholder="e.g. A. Focal Person" />{errors.confirmedBy && <span className="err">{errors.confirmedBy}</span>}</label>
        <label style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}><input type="checkbox" style={{ width: 22 }} checked={form.consent} onChange={(e) => set('consent', e.target.checked)} /> Consent to use contact for reminders</label>
        {dupes.length > 0 && <div className="warnbox">Possible duplicate: {dupes.map((d) => d.id).join(', ')}. Review before saving.</div>}
        <div style={{ height: 8 }} />
        <button className="btn" type="submit">Save record</button>
      </form>
    </div>
  )
}

function addDaysSafe(key, n) {
  const d = new Date(key + 'T12:00:00+01:00')
  d.setTime(d.getTime() + n * 86400000)
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Lagos', year: 'numeric', month: '2-digit', day: '2-digit' }).format(d)
}

function Detail({ childId, onBack, refresh }) {
  const [v, setV] = useState(0)
  const bump = () => { setV((x) => x + 1); refresh() }
  const child = ChildRepo.get(childId)
  const appt = AppointmentRepo.getByChild(childId)
  const fus = FollowUpRepo.listByChild(childId)

  const [edit, setEdit] = useState(null)
  const [apptForm, setApptForm] = useState(null)
  const [fuForm, setFuForm] = useState({ date: todayKey(), method: 'call', outcome: 'reached-planned', nextAction: '', by: '', delivered: true })
  const [fuErr, setFuErr] = useState('')

  useEffect(() => {
    if (child) setEdit({ ...child })
    if (appt) setApptForm({ date: appt.date, confirmedBy: appt.confirmedBy || '', outcome: appt.outcome || '' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [childId, v])

  if (!child) return <div className="page"><div className="card"><p>Record not found.</p><button className="btn sec" onClick={onBack}>Back</button></div></div>

  const apptStatus = getAppointmentStatus(appt)
  const followStatus = getFollowUpStatus(fus)

  const saveEdit = () => {
    if (!edit.name.trim() || !edit.caregiverName.trim() || !edit.community.trim() || !edit.phc.trim()) { window.alert('Name, caregiver, community and PHC are required.'); return }
    ChildRepo.update(childId, { name: edit.name.trim(), caregiverName: edit.caregiverName.trim(), caregiverPhone: edit.caregiverPhone, community: edit.community.trim(), phc: edit.phc.trim(), contactPref: edit.contactPref, consent: !!edit.consent })
    bump()
  }

  const saveAppt = () => {
    if (!isValidDateKey(apptForm.date)) { window.alert('Enter a valid appointment date.'); return }
    if (isTooFarFuture(apptForm.date)) { window.alert('Date is too far in the future (max 2 years).'); return }
    if (!apptForm.confirmedBy.trim()) { window.alert('Appointment date must be confirmed by an authorised health worker.'); return }
    AppointmentRepo.updateByChild(childId, { date: apptForm.date, confirmedBy: apptForm.confirmedBy.trim(), confirmedAt: todayKey(), outcome: apptForm.outcome })
    bump()
  }

  const completeAppt = () => {
    if (!window.confirm('Mark this appointment completed? It will leave the unresolved list.')) return
    AppointmentRepo.updateByChild(childId, { completed: true, outcome: apptForm.outcome || 'Completed - verified at PHC' })
    bump()
  }

  const logFollowUp = (e) => {
    e.preventDefault()
    if (!isValidDateKey(fuForm.date)) { setFuErr('Enter a valid follow-up date.'); return }
    if (!fuForm.by.trim()) { setFuErr('Enter responsible health worker name.'); return }
    setFuErr('')
    FollowUpRepo.log({ childId, date: fuForm.date, method: fuForm.method, outcome: fuForm.outcome, nextAction: fuForm.nextAction.trim(), by: fuForm.by.trim(), delivered: fuForm.method === 'visit' ? true : !!fuForm.delivered })
    setFuForm({ date: todayKey(), method: 'call', outcome: 'reached-planned', nextAction: '', by: '', delivered: true })
    bump()
  }

  const closeRecord = () => {
    const reason = window.prompt('Reason for closing/excluding this record (required):')
    if (!reason || !reason.trim()) return
    ChildRepo.update(childId, { status: 'closed', closeReason: reason.trim() })
    AppointmentRepo.updateByChild(childId, { closed: true })
    refresh()
    onBack()
  }

  return (
    <div className="page">
      <button className="btn sec" onClick={onBack}>← Back to dashboard</button>
      <div className="card">
        <div className="ref muted">{child.id} • Created {child.createdAt}</div>
        <div className="row" style={{ margin: '6px 0' }}>
          <Badge kind={apptStatus} text={APPT_LABELS[apptStatus]} />
          <Badge kind={followStatus} text={FOLLOWUP_LABELS[followStatus]} />
        </div>
        {edit && (
          <>
            <label>Child name<input value={edit.name} onChange={(e) => setEdit({ ...edit, name: e.target.value })} /></label>
            <label>Caregiver<input value={edit.caregiverName} onChange={(e) => setEdit({ ...edit, caregiverName: e.target.value })} /></label>
            <label>Phone<input value={edit.caregiverPhone || ''} onChange={(e) => setEdit({ ...edit, caregiverPhone: e.target.value })} /></label>
            <div className="row">
              <label style={{ flex: 1 }}>Community<input value={edit.community} onChange={(e) => setEdit({ ...edit, community: e.target.value })} /></label>
              <label style={{ flex: 1 }}>PHC<input value={edit.phc} onChange={(e) => setEdit({ ...edit, phc: e.target.value })} /></label>
            </div>
            <div className="row" style={{ marginTop: 8 }}>
              <button className="btn" onClick={saveEdit}>Save changes</button>
              <button className="btn danger" onClick={closeRecord}>Close record</button>
            </div>
          </>
        )}
      </div>

      <div className="card">
        <h3>Appointment (confirmed date only)</h3>
        {appt ? (
          <>
            <p className="muted">Next: <strong>{formatDate(appt.date)}</strong> • Confirmed by {appt.confirmedBy} on {appt.confirmedAt}{appt.tentative ? ' • tentative' : ''}</p>
            {apptForm && (
              <>
                <label>Date<input type="date" value={apptForm.date} onChange={(e) => setApptForm({ ...apptForm, date: e.target.value })} /></label>
                <label>Confirmed by<input value={apptForm.confirmedBy} onChange={(e) => setApptForm({ ...apptForm, confirmedBy: e.target.value })} /></label>
                <label>Outcome / review note<input value={apptForm.outcome} onChange={(e) => setApptForm({ ...apptForm, outcome: e.target.value })} placeholder="e.g. verified at PHC" /></label>
                <div className="row" style={{ marginTop: 8 }}>
                  <button className="btn" onClick={saveAppt}>Update appointment</button>
                  <button className="btn sec" onClick={completeAppt}>Mark completed</button>
                </div>
              </>
            )}
          </>
        ) : <p className="muted">No appointment recorded.</p>}
      </div>

      <form className="card" onSubmit={logFollowUp}>
        <h3>Log follow-up attempt</h3>
        <p className="muted">Recording contact alone is not proof of vaccination.</p>
        <div className="row">
          <label style={{ flex: 1 }}>Date<input type="date" value={fuForm.date} onChange={(e) => setFuForm({ ...fuForm, date: e.target.value })} /></label>
          <label style={{ flex: 1 }}>Method<select value={fuForm.method} onChange={(e) => setFuForm({ ...fuForm, method: e.target.value })}><option value="call">Phone call</option><option value="message">Message</option><option value="visit">In-person visit</option></select></label>
        </div>
        <label>Outcome<select value={fuForm.outcome} onChange={(e) => setFuForm({ ...fuForm, outcome: e.target.value })}>{FOLLOWUP_OUTCOMES.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</select></label>
        <label>Next planned action<input value={fuForm.nextAction} onChange={(e) => setFuForm({ ...fuForm, nextAction: e.target.value })} placeholder="e.g. Return Thursday" /></label>
        <label>Responsible worker<input value={fuForm.by} onChange={(e) => setFuForm({ ...fuForm, by: e.target.value })} placeholder="Your name" /></label>
        {fuForm.method !== 'visit' && <label style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}><input type="checkbox" style={{ width: 22 }} checked={fuForm.delivered} onChange={(e) => setFuForm({ ...fuForm, delivered: e.target.checked })} /> Message successfully delivered (vs attempted)</label>}
        {fuErr && <div className="err">{fuErr}</div>}
        <div style={{ height: 8 }} />
        <button className="btn" type="submit">Save follow-up</button>
      </form>

      <div className="card">
        <h3>Follow-up history ({fus.length})</h3>
        {fus.length === 0 ? <div className="empty">No follow-up attempts yet.</div> : (
          <ul className="timeline">
            {fus.map((f) => (
              <li key={f.id}><strong>{formatDate(f.date)}</strong> • {f.method} • {FOLLOWUP_OUTCOMES.find((o) => o.value === f.outcome)?.label || f.outcome}{f.nextAction ? ` → ${f.nextAction}` : ''} <span className="muted">({f.by}{f.delivered === false ? ', not delivered' : ''})</span></li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
