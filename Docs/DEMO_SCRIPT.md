# DoseBack — Demo Day Script (7-min walkthrough + 3-min Q&A)

**Format:** Individual live walkthrough (Google Meet). **Timing:** 7 min demo, 3 min Q&A.
**Must-have ready:** working signed APK installed on demo phone; Netlify fallback
(`https://doseback-phc.netlify.app/`); QubDrive APK link + repo link paste-ready for chat.

---

## 7-minute script (rehearse twice with a timer)

### 0:00–0:45 — Hook + problem (Rubric: Problem Definition)

> "In many primary healthcare centres, health workers track child immunisation
> follow-ups in notebooks and memory. When a child misses an appointment —
> forgotten date, transport issues, no reminder — nobody notices until it's too
> late. The problem isn't care; it's *visibility*. DoseBack answers three
> questions the moment a worker opens it: which children need attention today,
> what action each needs, and what happened last time."

### 0:45–1:15 — Solution framing (Rubric: Solution Quality, Business Viability)

> "DoseBack is a mobile follow-up manager for community health workers and
> immunisation focal persons at Nigerian PHCs. Not a hospital system, not a
> clinical scheduler — it does one workflow excellently: register, track
> appointment, follow up, document outcome. Tagline: *Every child deserves a
> follow-up.*"

### 1:15–5:30 — Live walkthrough (Rubric: Technical Execution, UX)

Do this exact sequence on the installed APK:

1. **Welcome screen (10s):** logo, tagline, illustration → tap "Enter demo app".
2. **Dashboard (45s):** hero banner ("Every child counts"), then the 4 cards —
   Upcoming / Due today / Overdue / Needs follow-up. Tap **Overdue** to filter.
   Point out the prototype disclaimer banner (shows responsibility).
3. **Child detail (60s):** open an overdue child, e.g. `Amina Bello (demo)`.
   Show the two badges side by side — appointment status *separate* from
   follow-up status. Show caregiver contact + community.
4. **Log a follow-up (60s):** record a call attempt → outcome "Caregiver
   reached; return visit planned" → show it appear in history. Stress:
   *"recording contact is not treated as proof of vaccination"* — then show the
   "requires verification" outcome option.
5. **Register a child (60s):** fictional name, community, PHC, appointment date
   + confirmed-by worker → save → it lands in the correct dashboard bucket.
   Mention duplicate warning + validation.
6. **Search + dashboard update (30s):** search the new record; show the counts
   updated.

### 5:30–6:30 — Honest scope + viability (Rubric: Business Viability)

> "Deliberately *not* in v1: no auto-SMS, no AI diagnosis, no clinical
> scheduling — dates are always confirmed by an authorised worker. Data stays
> on-device in this prototype; all records are fictional. Next steps: a
> controlled PHC pilot, proper access control, then reminders and reporting on
> pilot evidence. The wedge is worker-hours saved finding overdue cases."

### 6:30–7:00 — Close (Rubric: Presentation & Pitch)

> "Success for us is one thing: a health worker registers a child, finds an
> overdue case, acts, and documents the outcome — with less confusion than a
> paper register. DoseBack does that today."

Stop. Invite questions.

---

## 3-minute Q&A bank

| Question | Answer |
|---|---|
| Native or web? How was the APK built? | React + Vite PWA (manifest, service worker, installable icons), wrapped to a signed APK via PWABuilder (TWA). One codebase, browser + installed. |
| Where is data stored? | localStorage behind a repository layer in the prototype, swappable for a backend without UI changes. Dates computed in Africa/Lagos time. |
| How do you avoid false records? | Dates require a confirmed-by worker; contact attempts never auto-resolve; uncertain vaccinations queue as "awaiting verification". |
| Real patient data? | No — 12 fictional seed records, bannered as prototype throughout. Consent fields already in the model for pilot readiness. |
| What breaks at scale? | Single-device storage, no sync — Phase 4 roadmap: accounts, sync, backup, NDPR compliance. This demo proves workflow, not infrastructure. |
| Who pays / adopts? | PHCs and immunisation programmes; pitch is time saved + accountability. Adoption via supervised pilot, not app-store launch. |

---

## Demo-day checklist (night before)

- [ ] Install `DoseBack.apk` on demo phone; open once (caches app shell offline).
- [ ] Enable "Install unknown apps" if prompted; charge phone; hotspot as backup Wi-Fi.
- [ ] Reset demo data in-app (seed: 5 overdue / 2 due-today).
- [ ] Fallback ready: Netlify URL open in a mobile browser tab.
- [ ] Memorize one record (`Amina Bello (demo)`, overdue) so search looks instant.
- [ ] Close other apps; Do Not Disturb on; font size default.
- [ ] QubDrive APK link + repo link (`https://github.com/FaustinaNdidiamaka/Qubator_DOSEBACK`) paste-ready for Meet chat.
