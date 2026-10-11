# **DOSEBACK**

## **Product Bible & Product Requirements Document (PRD)**

**Product name:** DoseBack  
**Tagline:** Every child deserves a follow-up.  
**Product category:** Child immunisation follow-up management  
**Primary market:** Nigeria  
**Initial users:** Community health workers and immunisation focal persons at Primary Healthcare Centres (PHCs)  
**Product stage:** Minimum Viable Product (MVP)  
**Document purpose:** Define the product vision, problem, users, features, user experience, requirements, boundaries, and success measures.

---

## **1\. Executive Summary**

DoseBack is a simple child immunisation follow-up management application designed to help community health workers and immunisation focal persons keep track of children with upcoming or missed vaccination appointments.

The application provides a central view of registered children, their next confirmed appointments, outstanding follow-up tasks, and recorded follow-up outcomes.

Instead of relying entirely on notebooks, memory, or manually reviewing multiple records, health workers can use DoseBack to identify which children need attention and determine their next follow-up action.

The first version will focus on one essential workflow: registering a child, recording an appointment, identifying when follow-up is needed, and documenting the outcome.

DoseBack is intended to support existing immunisation services. It will not replace official vaccination registers, clinical guidance, or authorised health information systems.

## **2\. Product Vision**

**To help every community health worker identify and follow up with children who need attention, making routine immunisation follow-up more organised, timely, and accountable.**

DoseBack aims to make missed appointments easier to identify and follow up on, particularly in communities where health workers have limited time and resources.

### **Product mission**

Reduce the administrative burden of immunisation follow-up by turning scattered appointment information into a clear, actionable list of children who need attention.

### **Product promise**

When a health worker opens DoseBack, they should be able to answer three questions:

1. Which children need attention today?  
2. What follow-up action is required for each child?  
3. What happened after the last follow-up attempt?

## **3\. Problem Statement**

Children may miss immunisation appointments for several reasons, including forgotten dates, transportation difficulties, competing household responsibilities, communication challenges, or uncertainty about when to return.

Health workers may also struggle to identify and follow up with these children when records are difficult to review or follow-up activities are recorded inconsistently.

DoseBack addresses the administrative aspect of this challenge by organising appointment information and follow-up activities in one accessible workflow.

### **The core problem**

Health workers need a simple way to identify children with upcoming or overdue appointments, organise follow-up actions, and record the outcomes without manually searching through multiple records.

### **The problem DoseBack does not claim to solve**

DoseBack cannot independently eliminate vaccine shortages, transport barriers, vaccine hesitancy, inadequate staffing, or other structural causes of missed immunisation.

It can help make follow-up more organised, but its real-world impact must be established through testing and evaluation.

## **4\. Target Users**

### **Primary user: Community health worker**

A health worker responsible for community outreach, immunisation follow-up, or supporting caregivers.

**Needs:**

* Identify children due for follow-up.  
* Find records quickly.  
* Know which caregivers need to be contacted.  
* Record follow-up attempts and outcomes.  
* Reduce time spent organising records.

### **Secondary user: Immunisation focal person**

A designated health worker who coordinates immunisation activities at a PHC.

**Needs:**

* Review outstanding appointments.  
* Monitor follow-up activities.  
* Identify unresolved cases.  
* Summarise progress for internal review.

### **Beneficiary: Parent or caregiver**

The caregiver is not required to use the first version of the app.

**Needs:**

* Receive appropriate follow-up communication from health workers.  
* Understand the child's confirmed return appointment.  
* Know where to seek clarification about vaccination.

### **Future users**

* Local government immunisation coordinators.  
* Public health programme managers.  
* Community health programme supervisors.  
* Partner organisations supporting routine immunisation.

These users are outside the initial MVP scope unless pilot feedback demonstrates a compelling need.

## **5\. Product Goals**

DoseBack's first version must:

1. Allow a health worker to register a child's follow-up record.  
2. Record the next appointment date confirmed by an authorised health worker.  
3. Display upcoming, due-today, and overdue appointments.  
4. Make unresolved follow-up cases easy to identify.  
5. Allow health workers to record contact attempts and outcomes.  
6. Allow appointment and follow-up records to be updated.  
7. Provide a simple overview of follow-up activity.  
8. Be understandable to a first-time user with minimal training.  
9. Minimise unnecessary collection and exposure of personal information.

### **Non-goals**

The first version will not:

* Replace Nigeria's official immunisation registers or health information systems.  
* Independently calculate clinical vaccination schedules.  
* Diagnose illnesses or recommend treatment.  
* Guarantee that a child has received a vaccine.  
* Automatically send SMS or WhatsApp messages.  
* Provide a complete hospital management system.  
* Replace clinical judgement or official immunisation guidance.  
* Claim to improve vaccination coverage without supporting evidence.

## **6\. Core Features and Requirements**

### **Feature 1: Child Registration**

**Purpose:** Create a record that can be used to organise immunisation follow-up.

**Requirements:**

* Allow the user to register a child.  
* Capture a name or approved local identifier.  
* Capture date of birth or age, where known and necessary.  
* Record caregiver details needed for follow-up.  
* Record the relevant community and PHC.  
* Assign a unique DoseBack reference to the record.  
* Allow the next confirmed appointment date to be entered.  
* Validate required fields.  
* Allow records to be corrected when information changes.

**Acceptance criteria:**

* A valid record can be created.  
* The record appears in the child list.  
* The record has a unique reference.  
* Incomplete or invalid required information is clearly identified.  
* The user can open and update the record.

### **Feature 2: Appointment Tracking**

**Purpose:** Make upcoming and missed appointments visible.

**Requirements:**

* Display the next confirmed appointment date.  
* Identify upcoming appointments.  
* Identify appointments due today.  
* Identify overdue appointments when they remain unresolved.  
* Allow an authorised health worker to update an appointment date.  
* Prevent completed appointments from remaining incorrectly listed as outstanding.  
* Allow appointments to be reviewed when the child's circumstances change.

**Acceptance criteria:**

* Appointment categories reflect the recorded date and status.  
* An overdue appointment is distinguishable from an upcoming appointment.  
* Updating a date refreshes the appointment's displayed category.  
* Completing an appointment removes it from the unresolved appointment list.  
* The app does not generate independent clinical vaccination schedules.

### **Feature 3: Follow-up Management**

**Purpose:** Turn an overdue appointment into an actionable task.

**Requirements:**

* Allow a user to record a follow-up attempt.  
* Record the date of the attempt.  
* Record the method, such as a phone call or an in-person visit.  
* Record the outcome.  
* Record the next planned action where appropriate.  
* Keep unresolved cases visible.  
* Allow a case to be marked resolved only when an appropriate outcome is documented.

**Suggested outcomes:**

* Caregiver reached; return visit planned.  
* Caregiver could not be reached.  
* Follow-up visit completed.  
* Child's vaccination requires verification.  
* Appointment needs clinical review.  
* Follow-up closed with a documented reason.

**Acceptance criteria:**

* Every saved follow-up is associated with the correct child.  
* A user can review previous follow-up attempts.  
* Unresolved cases remain visible.  
* A resolved case has a recorded outcome.  
* Recording a contact attempt alone does not count as proof of vaccination.

### **Feature 4: Dashboard**

**Purpose:** Give health workers a quick overview of their workload.

The dashboard should display:

* Upcoming appointments.  
* Appointments due today.  
* Overdue appointments.  
* Follow-ups requiring attention.

It should also display an actionable list containing the child's reference, appropriate identifying information, next appointment date, community, and follow-up status.

**Acceptance criteria:**

* Counts reflect the underlying records.  
* Selecting a category displays the corresponding records.  
* The user can open a record directly from the list.  
* Empty categories display a helpful message.  
* The dashboard prioritises action over decorative statistics.

### **Feature 5: Search and Record Management**

**Purpose:** Help users locate and maintain accurate records.

**Requirements:**

* Search by DoseBack reference or permitted identifying fields.  
* Filter records by appointment status.  
* Open a child's record.  
* Edit incorrect information.  
* Update appointment details.  
* Review follow-up history.  
* Prevent accidental duplicate records where possible.  
* Require an appropriate reason when a record must be closed or excluded from follow-up.

**Acceptance criteria:**

* Search results correspond to the entered criteria.  
* Filters return the correct records.  
* Updated information is reflected throughout the app.  
* Potential duplicates can be identified for review.

### **Feature 6: Reminder Activity**

**Purpose:** Document communication with caregivers.

**Requirements:**

* Display the relevant caregiver contact information to an authorised user.  
* Allow the user to record a call, message, or in-person reminder.  
* Record the date and outcome.  
* Respect caregiver communication preferences and consent.  
* Distinguish an attempted reminder from a successfully delivered message.

**MVP boundary:** DoseBack records reminder activity; it does not automatically send messages.

### **Feature 7: Record Verification**

**Purpose:** Avoid incorrectly flagging children who received vaccination elsewhere.

**Requirements:**

* Allow an authorised health worker to record a reported vaccination event.  
* Record where the information came from.  
* Distinguish reported information from verified information.  
* Allow verification according to the participating facility's approved process.  
* Update follow-up status based on the documented outcome.

**MVP boundary:** Implement only a simple verification status and recording workflow. Full integration with other facilities is a future enhancement.

## **7\. User Journey**

### **Main journey: Following up with a child**

**Step 1: Open the dashboard**

The health worker sees appointments due today, upcoming appointments, overdue appointments, and unresolved follow-ups.

**Step 2: Identify a child requiring attention**

The health worker selects an overdue record.

**Step 3: Review the child's record**

The health worker reviews the next appointment date, community, caregiver contact preferences, and previous follow-up history.

**Step 4: Take action**

The health worker contacts the caregiver or arranges an appropriate in-person follow-up.

**Step 5: Record the outcome**

The health worker records whether the caregiver was reached and the outcome of the interaction.

**Step 6: Determine the next action**

If follow-up remains necessary, the record stays visible with the next action. If the appointment has been completed or the case otherwise resolved, the record is updated accordingly.

**Step 7: Review progress**

The dashboard reflects the updated status.

### **Secondary journey: Registering a child**

1. Open child registration.  
2. Enter the required information.  
3. Enter the next appointment date confirmed by an authorised health worker, if available.  
4. Save the record.  
5. Confirm that the record appears in the child list.  
6. Return later to update the appointment or record a follow-up.

## **8\. Product Experience and Design Principles**

DoseBack should feel like a practical field tool, not a complicated hospital information system.

### **Design principles**

**Clarity over complexity:** Users should understand appointment statuses without training.

**Action over analytics:** Make the next required action more prominent than charts and statistics.

**Mobile-first usability:** Forms and lists must be comfortable to use on a phone.

**Readable interface:** Use clear labels, legible text, adequate spacing, and obvious actions.

**Low-connectivity awareness:** Communicate when information is saved and whether records are available on the current device or shared with other users.

**Error prevention:** Confirm important actions, validate dates, and help users identify possible duplicates.

**Respectful language:** Describe records as requiring follow-up rather than blaming caregivers for missed appointments.

### **Suggested appointment labels**

* Upcoming  
* Due today  
* Overdue  
* Follow-up in progress  
* Awaiting verification  
* Completed  
* Reviewed or closed

Use text labels alongside visual indicators so users do not have to rely on colour alone.

## **9\. Information to Be Captured**

### **Child record**

* DoseBack reference.  
* Name or approved identifier.  
* Date of birth or age, where appropriate.  
* Caregiver details needed for follow-up.  
* Relevant contact preferences and consent status.  
* Community.  
* Responsible PHC.  
* Record creation date.

### **Appointment record**

* Appointment date.  
* Date confirmed or last updated.  
* Person responsible for confirming the date.  
* Current appointment status.  
* Outcome or reason for review, where applicable.

### **Follow-up record**

* Date of follow-up attempt.  
* Follow-up method.  
* Outcome.  
* Next planned action.  
* Responsible health worker.  
* Verification details, when applicable.

Only information necessary for the workflow should be collected. Detailed clinical records and unrelated family information are outside the scope.

## **10\. Privacy, Safety, and Responsible Use**

DoseBack handles information about children and must be designed with appropriate safeguards.

### **Privacy requirements**

* Collect only necessary personal information.  
* Restrict access to authorised users in a real deployment.  
* Protect caregiver contact details from unauthorised disclosure.  
* Obtain appropriate consent before recording and using contact information for reminders.  
* Provide a way to correct inaccurate information.  
* Define suitable record retention and deletion procedures.  
* Avoid displaying identifiable child information on public screens or demonstrations.

### **Clinical safety requirements**

* Appointment dates must be confirmed by an authorised health worker.  
* Vaccine eligibility and catch-up schedules must follow current official guidance.  
* The application must not diagnose, prescribe, or independently determine vaccine schedules.  
* A caregiver-reported vaccination must not automatically be treated as verified.  
* Uncertain cases must be flagged for review rather than silently resolved.

### **Deployment requirements**

Before real patient data is entered, the deployment must have appropriate security, access management, backup and recovery arrangements, and compliance with applicable Nigerian data protection requirements and relevant health-sector policies.

The prototype should use fictional records.

## **11\. Success Metrics**

The MVP should be assessed on usability and operational performance before making claims about health outcomes.

### **Initial product metrics**

* Number of child records successfully created.  
* Percentage of records with a documented next appointment.  
* Number of appointments correctly categorised.  
* Number of follow-up attempts recorded.  
* Number of overdue cases reviewed or resolved.  
* Percentage of test scenarios completed without errors.  
* Time required for a health worker to locate an overdue record and record a follow-up.

### **Pilot evaluation metrics**

* Percentage of overdue appointments receiving a documented follow-up attempt.  
* Time between an appointment becoming overdue and the first documented follow-up.  
* Percentage of follow-up cases with a documented outcome.  
* User satisfaction and reported ease of use.  
* Change in unresolved overdue appointments over the evaluation period.

Any claim about improved immunisation attendance or coverage requires appropriate real-world evaluation and should account for factors outside the app.

## **12\. MVP Scope and Prioritisation**

### **Must have**

* Child registration.  
* Unique record references.  
* Appointment date entry and updates.  
* Upcoming, due-today, and overdue lists.  
* Follow-up logging.  
* Basic search.  
* Record editing.  
* Simple dashboard.  
* Fictional demonstration records.  
* Clear appointment and follow-up statuses.

### **Should have**

* Duplicate-record warnings.  
* Follow-up history.  
* Verification status.  
* Basic filters.  
* Local saving for the prototype.  
* Clear empty states and confirmation messages.

### **Could have later**

* Automatic SMS and WhatsApp reminders.  
* Appointment exports and printable reports.  
* Multiple-user coordination.  
* Synchronisation between facilities.  
* More detailed programme reporting.  
* Language options for local users.  
* Caregiver-facing appointment information.

### **Out of scope for the first version**

* AI-generated clinical recommendations.  
* Automated vaccine scheduling.  
* Hospital management features.  
* Integration with national health systems.  
* Automated patient messaging.  
* Public access to identifiable records.

## **13\. Two-Hour Build Acceptance Checklist**

The initial demonstration is successful when:

* A user can register a fictional child.  
* A user can enter a confirmed appointment date.  
* The child appears in the correct appointment category.  
* The user can locate an overdue record.  
* The user can record a follow-up attempt and its outcome.  
* The record's status updates correctly.  
* The dashboard counts reflect the saved records.  
* The user can search for and edit a record.  
* The main workflow works on a mobile-sized screen.  
* The app clearly distinguishes a prototype from a live patient information system.

If time is limited, prioritise the full register-to-follow-up workflow over optional features.

## **14\. Product Roadmap**

### **Phase 1: Working prototype**

Build the registration, appointment tracking, dashboard, and follow-up workflow. Demonstrate the product using fictional records.

### **Phase 2: User validation**

Show the prototype to a small number of health workers, observe how they use it, and identify confusing steps or missing information. Do not use real child records until suitable safeguards are in place.

### **Phase 3: Controlled pilot**

Work with an authorised PHC or immunisation programme to define responsibilities, protect information, validate workflows, and assess usefulness in real settings.

### **Phase 4: Operational readiness**

Introduce appropriate user accounts, shared records, secure synchronisation, backup and recovery, reporting, and any required integrations.

### **Phase 5: Responsible expansion**

Consider caregiver reminders, additional facilities, local language support, and broader immunisation programme reporting based on pilot evidence.

## **15\. Risks and Mitigation**

**Risk: Incorrect appointment dates.**  
Mitigation: Require confirmation by an authorised health worker and make corrections easy to record.

**Risk: Duplicate or inaccurate records.**  
Mitigation: Assign unique references, provide search, and flag potential duplicates.

**Risk: Children vaccinated elsewhere remain on overdue lists.**  
Mitigation: Provide a documented verification and review workflow.

**Risk: Unauthorised access to child information.**  
Mitigation: Do not use real patient information in the prototype; establish appropriate access and security measures before deployment.

**Risk: Health workers do not adopt the tool.**  
Mitigation: Keep the workflow short, test it with intended users, and avoid unnecessary data entry.

**Risk: The prototype is mistaken for an official health system.**  
Mitigation: Clearly label it as a pilot or prototype and explain its limitations.

**Risk: The app creates false confidence about vaccination coverage.**  
Mitigation: Measure follow-up activity separately from confirmed vaccination outcomes.

## **16\. Product Positioning**

**One-line description:** DoseBack helps community health workers track child immunisation appointments, identify overdue cases, and organise caregiver follow-up.

**Short pitch:** Every missed appointment is an opportunity for follow-up. DoseBack gives community health workers a simple way to see which children need attention, document their outreach, and keep outstanding cases visible.

**Core differentiator:** DoseBack is designed around the action that follows an appointment—not simply the storage of an appointment date.

**Initial value proposition:** Less time searching through records; a clearer view of children who need follow-up; more organised documentation of what happens next.

## **17\. Definition of Success**

DoseBack's first success is not the number of screens it contains or whether it uses AI.

It is whether a health worker can register a child, identify an overdue appointment, take a follow-up action, and document the outcome with less confusion.

If the prototype demonstrates that workflow clearly, it will have a strong foundation for user testing, responsible expansion, and future integration into immunisation programmes.

---

**Product principle to protect throughout development:**

*Every feature must help a health worker identify, act on, or learn from an immunisation follow-up need. If it does not support that purpose, it can wait.*

