# DoseBack - Prototype (MVP)

> Prototype — fictional records only. Not a medical system. No real patient data.

Every child deserves a follow-up. Child immunisation follow-up management for PHCs in Nigeria.

## Run locally

Requires Node.js 20+.

```powershell
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## What is included

- Dashboard: upcoming / due today / overdue / needs follow-up + actionable list
- Child registration with validation + duplicate warning + unique ref `DB-YYYY-XXXX`
- Child list with search (ref, name, caregiver, community) + status filter
- Child detail: edit record, update/complete appointment, log follow-up, history
- Follow-up logging: date, method (call/message/visit), outcome, next action, attempted vs delivered
- Verification: `needs-verification` outcome surfaces as `Awaiting verification`
- localStorage persistence behind `src/lib/store.js` repository layer
- 12 fictional seed records, Lagos-timezone date handling (`Africa/Lagos`)
- Appointment status kept separate from follow-up status

## What is NOT included (per PRD)

Auto SMS/WhatsApp, AI recommendations, auto scheduling, backend, auth, national integration.

## Project layout

```
src/
  App.jsx          - 4 views: dashboard, children, register, detail
  main.jsx         - entry
  styles.css       - plain CSS, mobile-first
  lib/
    dates.js       - Africa/Lagos day keys, compare, format
    status.js      - appointment vs follow-up derivation
    ref.js         - unique reference generator
    seed.js        - 12 fictional records
    store.js       - localStorage repository layer
Docs/
  Qubator_DOSEBACK PRD.md
  IMPLEMENTATION_PLAN.md
```

## Test the main workflow

1. `npm run dev` → Dashboard shows counts.
2. Register → enter fictional name/caregiver/community/PHC + appointment date + confirmed-by → Save → detail opens.
3. Dashboard → click Overdue → open a record → Log follow-up → history appears → dashboard updates.
4. Search in Children view; Reset demo restores seeds.
