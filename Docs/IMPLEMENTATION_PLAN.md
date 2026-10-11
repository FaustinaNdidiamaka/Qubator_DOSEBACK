# DoseBack - Implementation Plan (MVP)

**Source:** `Docs/Qubator_DOSEBACK PRD.md` (569 lines, v MVP)
**Current repo state:** Only PRD + `.gitignore`, no code. Greenfield build.
**Repo:** https://github.com/FaustinaNdidiamaka/Qubator_DOSEBACK (public, `main`)

This plan maps 1:1 to PRD §5 Goals, §6 Features 1-7, §7 Journeys, §8 Design, §9 Data, §10 Privacy/Safety, §12 Scope, §13 Acceptance.

---

## 0. Scope Recap (What We Build / Don't Build)

**Must-have (MVP):** child registration, unique refs, appointment entry/update, upcoming/due-today/overdue lists, follow-up logging, basic search, record editing, simple dashboard, fictional demo records, clear statuses.

**Should-have (same sprint if time):** duplicate warnings, follow-up history, verification status, basic filters, local saving, empty states/confirmations.

**Out of scope (explicitly forbidden in v1):** auto SMS/WhatsApp, AI clinical recommendations, auto vaccine scheduling, hospital management, national system integration, public identifiable records, coverage-claim analytics. Reminder = *record* activity only. Verification = simple status only.

**Users:** Primary = Community health worker, Secondary = Immunisation focal person, Beneficiary = caregiver (no login in v1). 4 future roles explicitly excluded.

---

## 1. Architectural Decision (ADR-001)

**Decision: Responsive Web App (Mobile-first PWA-ready), Local-first prototype.**

**Stack (recommended):**
- `React 18 + Vite + TypeScript` - fastest 2-hour build, easybut type-safe date/status logic
- `Tailwind CSS` - utility styling for readable, spaced mobile UI
- `React Router` (4 routes only) - `/`, `/children`, `/children/:id`, `/register`
- `localStorage` + Repository pattern - no backend for Phase 1, swappable later
- `date-fns` - single date library for due-today/overdue calc
- No UI chart lib, no backend, no auth in prototype (add stub `AuthorisedUser` field instead)

**Why not alternatives:**
- Native Flutter/React-Native: rejected - app-store friction, slower 2-hr demo, PHCs need browser link first.
- Next.js + DB: rejected for Phase 1 - overkill, needs hosting/DB; migrate in Phase 4 pilot.
- Plain HTML/JS: rejected - status filtering + history becomes unmaintainable.

**Key rules:**
1. All clinical dates are *confirmed by authorised worker* - never auto-computed. Store `confirmedBy`, `confirmedAt`.
2. All persistence goes through `src/lib/store.ts` (`ChildRepo`, `AppointmentRepo`, `FollowUpRepo`) so Phase 4 can swap localStorage → API without UI changes.
3. Offline-first: writes succeed locally, UI shows `Saved on this device • Demo - not shared` banner (PRD §8 low-connectivity + §15 prototype-confusion risk).
4. Prototype banner on every screen: `Prototype - fictional records only` (PRD §13, §15).

**Folder structure:**
```
src/
  App.tsx, main.tsx, router.tsx
  lib/ date.ts, ref.ts (DB-YYYY-XXXX), statuses.ts, store.ts, seed.ts
  types.ts (Child, Appointment, FollowUp, Reminder)
  components/ Layout, Banner, StatCard, StatusBadge, ChildCard, Forms, EmptyState, ConfirmDialog
  pages/ Dashboard, ChildList, ChildDetail, Register
  styles/ tokens.css (Tailwind + CSS vars)
```

---

## 2. Design System (PRD §8)

**Principles:** Clarity > complexity, Action > analytics, mobile-first, readable, error prevention, respectful language ("needs follow-up" not "defaulter").

**Tokens:**
- Colors: bg slate-50, surface white, primary teal-700 (action), danger red-600 (overdue only with text label), warning amber-600, success green-700. Never color-alone - always `StatusBadge` with text + icon.
- Type: system stack, base 16px, labels 14px semibold, counts 28px bold. Min touch target 44px.
- Spacing: 16px page pad, 12px card gap, rounded-xl cards, 8px badge radius.
- Statuses (exact strings): `upcoming, due-today, overdue, in-progress, awaiting-verification, completed, closed` with labels: Upcoming / Due today / Overdue / Follow-up in progress / Awaiting verification / Completed / Reviewed or closed.

**Components (build once, reuse):**
1. `Banner` - prototype disclaimer
2. `StatCard(count, label, onClick)` - dashboard 4 tiles
3. `StatusBadge(status)` - text + dot
4. `ChildCard(ref, name, date, community, status)` - tappable to detail
5. `Form` inputs with inline validation, date min/max guard, duplicate warning slot
6. `EmptyState` - helpful message per empty category (PRD Feature 4 AC)
7. `Timeline` - follow-up history list

**Screens (4 only):** Dashboard, Child List (search+filter), Child Detail (record + appointment + history + log actions), Register.

---

## 3. Data Model (PRD §9)

```ts
Child { id: string // DB-2026-0001, name, dob?: string, caregiverName, caregiverPhone?, contactPref: 'call'|'visit'|'any', consent: boolean, community, phc, createdAt, status: 'active'|'closed', closeReason? }
Appointment { id, childId, date: YYYY-MM-DD, confirmedBy, confirmedAt, status: Derived, outcome?: string }
FollowUp { id, childId, date, method: 'call'|'visit'|'message', outcome: 'reached-planned'|'not-reached'|'visit-done'|'needs-verification'|'needs-review'|'closed-reason', nextAction?: string, by: string, createdAt }
Reminder = FollowUp where method in (call,message,visit) + delivered: boolean // attempted vs delivered
Verification { childId, reportedAt, source, state: 'reported'|'verified'|'rejected' }
```

**Derivation (single function `getAppointmentStatus(appt, followUps)`):**
- If `completed/closed` → completed/closed.
- Else if date < today and not resolved → `overdue`.
- Else if date == today → `due-today`.
- Else future → `upcoming`.
- If open followUp exists → overlay `in-progress`; if verification pending → `awaiting-verification`.
- Completing appointment removes from unresolved list. Recording contact alone ≠ proof of vaccination.

**Validation:** required: name, caregiver, community, PHC, appointment date if given. Date cannot be >2y future. Closing requires reason. Duplicate check on (name+dob+caregiver) → warn, not block.

---

## 4. Phased Build Plan

### Phase 0 - Setup & Guardrails (0.5h)
- [ ] Vite+React+TS+Tailwind scaffold, router, tokens.css, Banner
- [ ] `store.ts` localStorage layer + `seed.ts` 12 fictional children (varied statuses/communities)
- [ ] ESLint, README prototype notice
- Done when: `npm run dev` opens on mobile viewport with banner.

### Phase 1 - Design System + App Shell (1h)
- [ ] Layout, StatCard, StatusBadge, ChildCard, EmptyState, ConfirmDialog
- [ ] Bottom-nav / top-bar mobile-first, 44px targets, text+color badges
- Done when: Storybook-like `/design` preview renders all states legibly.

### Phase 2 - Child Registration (F1) + Record Management base (F5-part) (1.5h)
- [ ] Register form (§6 F1 reqs), unique ref gen, validation, edit flow
- [ ] Detail page view/edit, close-with-reason
- Done when: register → appears in list with unique ref; invalid blocked; edit reflects everywhere.

### Phase 3 - Appointment Tracking (F2) + Dashboard (F4) (1.5h) — *2-hour demo critical path*
- [ ] `getAppointmentStatus`, upcoming/due-today/overdue lists, counts, category click → filtered list, empty messages
- [ ] Update date refreshes category; complete removes from unresolved
- Done when: PRD §13 items 2,3,4,7 pass.

### Phase 4 - Follow-up (F3) + Reminder Activity (F6) + Verification (F7) (2h)
- [ ] Log attempt (date/method/outcome/nextAction), unresolved stays visible, resolve requires outcome
- [ ] Reminder log with attempted vs delivered + consent check
- [ ] Simple verification: reported vs verified, flag uncertain for review
- Done when: overdue → log → history visible → resolve → dashboard updates; §13 items 5,6 pass.

### Phase 5 - Search/Filter + Polish (F5-rest) (1h)
- [ ] Search by ref/name/caregiver, filter by status, duplicate warning, confirm dialogs, date guards
- [ ] Mobile pass (360px), readability, offline banner text
- Done when: §13 items 8,9,10 pass; full register-to-follow-up on phone.

### Phase 6 - Demo + Acceptance + Handover (0.5h)
- [ ] Seed reset button, pilot README (limitations, no real data), deploy to Vercel/Netlify preview
- [ ] Run §13 10-item checklist, record time-to-find-overdue metric (PRD §11)
- Done when: all 10 checklist items video-verified.

**Total prototype:** ~8h; **2-hour slice priority:** Phase 0 → 2 → 3 → 4-minimal (register → categorize → log outcome).

---

## 5. Testing & Metrics

- Unit: `statuses.ts` (all 7 labels, edge today/overdue/completed), `ref.ts` uniqueness.
- E2E manual script = PRD §7 journeys (main 7 steps + register 6 steps).
- Metrics to log (console + dashboard): records created, % with next appointment, categorisation correctness, follow-ups logged, overdue reviewed/resolved, error-free scenarios, time-to-locate-overdue.
- No coverage claims - only follow-up activity vs verified outcomes (PRD §15 risk).

## 6. Risks → Build Mitigations

- Wrong dates → require `confirmedBy` + easy edit.
- Duplicates → unique ref + warn on fuzzy match.
- Vaccinated-elsewhere → verification workflow, not auto-resolve.
- Unauthorised access → fictional seeds only, no real PII, consent flag.
- Prototype mistaken for official system → persistent banner + README + no national integration.
- False confidence → separate `contacted` from `vaccinated-verified`.

## 7. Post-MVP Roadmap (PRD §14)

- P2 Validation: 5-user observation, fix confusion points.
- P3 Pilot: 1 PHC, roles, backup, Nigerian NDPR compliance, access control.
- P4 Ops: accounts, sync, backup/recovery, reporting.
- P5 Expansion: SMS/WhatsApp send, exports/print, multi-user, i18n, caregiver view - only on pilot evidence.
