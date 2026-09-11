# Savaliya Connect

Build a modern, simple, mobile-friendly web application prototype called “Savaliya Caterers – Staff & Payment Management”.

1. Business Context

This is a catering and event management business operated by Babulal Sharma.

The business has:

3 wedding/function halls

Weddings

Birthday parties

Pooja functions

Receptions

Other events

Catering services at customers’ homes and other outside locations

The biggest problem is managing the temporary women workers and other staff who come to work for different events.

Many workers are not permanent employees. They may come only for particular events or particular days.

The owner needs to easily know:

Which worker worked?

On which date?

At which event?

At which location?

For how many days?

What is her daily/event rate?

How much has she earned?

How much advance has she taken?

How much has already been paid?

How much is still pending?

The prototype must make this workflow extremely clear.

2. IMPORTANT DESIGN PRINCIPLE

Do NOT make this look like a generic HR/payroll software.

This is specifically for a catering business with temporary event-based workers.

The main workflow should be:

Worker → Event → Assignment → Attendance → Days Worked → Earnings → Advance → Payment → Pending Amount

The owner should be able to understand the entire calculation from one screen.

Keep the UI simple enough that a non-technical business owner can use it.

Use simple labels such as:

कर्मचारी

कार्यक्रम

काम की जगह

उपस्थित

काम किए दिन

रोज का रेट

कुल कमाई

एडवांस

भुगतान

बाकी

The interface can primarily use Hindi labels, with small English labels where useful.

3. DASHBOARD

Create a dashboard for the owner.

At the top:

सवालिया कैटरर्स

नमस्ते, बाबूलाल जी

Show summary cards:

आज के कार्यक्रम

आज काम करने वाले कर्मचारी

इस महीने के कुल कर्मचारी

इस महीने का कुल भुगतान

बाकी भुगतान

आने वाले कार्यक्रम

Example:

Today's Events: 3
Workers Today: 18
September Payments: ₹82,500
Pending Payments: ₹21,400

Below this show:

आज के कार्यक्रम

Card 1:

शादी समारोह
📅 12 September
📍 Hall 1
👥 450 मेहमान
👩‍🍳 12 कर्मचारी

Button:

स्टाफ देखें

Card 2:

जन्मदिन समारोह
📅 12 September
📍 ग्राहक का घर
👥 80 मेहमान
👩‍🍳 6 कर्मचारी

Button:

स्टाफ देखें

4. MOST IMPORTANT SCREEN — EMPLOYEE/WOMEN WORKERS

Create a page called:

कर्मचारी

Show a searchable list.

Each worker card/table row should contain:

Name

Mobile

काम / Role

Payment Type

Daily Rate

Total Days This Month

Total Earned

Pending

Example:

कर्मचारीकामरेटकाम किए दिनकमाईबाकीसुनीताCook₹80012₹9,600₹2,600रेखाHelper₹6009₹5,400₹1,400मायाHelper₹60015₹9,000₹0

Buttons:

+ कर्मचारी जोड़ें

देखें

5. ADD WORKER

Create an easy form:

नया कर्मचारी

Fields:

नाम
मोबाइल नंबर
काम / Role

Dropdown:

Cook

Helper

Waiter

Cleaner

Other

Employment type:

Permanent

Temporary

Event-based

Payment type:

Daily

Monthly

Event-based

Daily rate:

₹ ______

Joining date:

Button:

कर्मचारी सेव करें

6. WORKER PROFILE — VERY IMPORTANT

When the owner clicks a worker, show a detailed profile.

Example:

सुनीता

Cook

Daily Rate: ₹800

Mobile: XXXXXXXX

Then show:

इस महीने का हिसाब

काम किए दिन: 12

कुल कमाई: ₹9,600

एडवांस: ₹2,000

पहले भुगतान: ₹5,000

बाकी: ₹2,600

Make the बाकी ₹2,600 visually prominent.

7. WORKER WORK HISTORY

On the same worker profile show:

काम का इतिहास

तारीखकार्यक्रमजगहकामदिनरेटकमाई2 SepWeddingHall 1Cook1₹800₹8005 SepBirthdayHall 2Cook1₹800₹8008 SepPoojaCustomer HomeCook1₹900₹90010 SepWeddingHall 1Cook2₹800₹1,600

Allow filtering by:

Date

Event

Location

Month

This is one of the most important parts of the prototype.

8. EVENTS PAGE

Create:

कार्यक्रम

Show all upcoming and past events.

Each event should show:

Event name

Event type

Date

Location

Number of guests

Assigned workers

Example:

अमित की शादी

12 September 2026

📍 Hall 1

450 Guests

18 Staff Assigned

Button:

कार्यक्रम खोलें

9. CREATE EVENT

Fields:

कार्यक्रम का नाम

कार्यक्रम का प्रकार:

Wedding

Birthday

Pooja

Reception

Party

Other

Customer name

Customer mobile

Date

Start time

End time

Location type:

Savaliya Hall 1

Savaliya Hall 2

Savaliya Hall 3

बाहर का कार्यक्रम

If “बाहर का कार्यक्रम” is selected:

Show:

पूरा पता

10. EVENT STAFF ASSIGNMENT

Inside an event page show:

इस कार्यक्रम में काम करने वाले कर्मचारी

Example:

Wedding – Hall 1

कर्मचारीकामरेटस्थितिसुनीताCook₹800/dayAssignedरेखाHelper₹600/dayAssignedमायाHelper₹600/dayAssignedपूजाCook₹800/dayAssigned

Button:

+ कर्मचारी जोड़ें

When clicking it:

Search workers.

Select multiple workers.

For each selected worker allow the owner to set:

Role

Rate

Expected days

Important:

The rate for a specific event can be different from the worker's normal rate.

Example:

Normal rate = ₹800

Outside event rate = ₹900

The event-specific rate should override the normal rate for that event.

11. ATTENDANCE — MAIN PAIN POINT

Create a very simple attendance screen.

Title:

आज की उपस्थिति

First select:

Date

Then:

कार्यक्रम

Then show assigned workers.

Example:

Wedding – Hall 1

12 September

कर्मचारीकामउपस्थितिसुनीताCook✅ PresentरेखाHelper✅ PresentमायाHelper❌ AbsentपूजाCook🌓 Half Day

Allow one-click buttons:

Present

Absent

Half Day

Optional:

Check-in
Check-out

Do NOT make GPS mandatory in this prototype.

12. PAYMENT CALCULATION SCREEN

Create a page:

पेमेंट / पगार

Allow the owner to select:

Month

Worker

Then automatically show:

सुनीता — September 2026

Full Days:

12

Half Days:

2

Daily Rate:

₹800

Calculation:

12 × ₹800 = ₹9,600

2 × ₹400 = ₹800

कुल कमाई

₹10,400

Then:

Advance:

₹2,000

Already Paid:

₹5,000

बाकी भुगतान

₹3,400

Make this calculation visually extremely clear.

Use a breakdown:

कुल कमाई             ₹10,400
− एडवांस              ₹2,000
− पहले भुगतान          ₹5,000
--------------------------------
बाकी भुगतान            ₹3,400


Button:

भुगतान दर्ज करें

13. RECORD PAYMENT

Create a simple payment modal:

भुगतान दर्ज करें

कर्मचारी:

सुनीता

बाकी:

₹3,400

भुगतान राशि:

₹ ______

Payment method:

Cash

UPI

Bank Transfer

Date

Notes

Button:

भुगतान सेव करें

After payment:

Pending amount should automatically update.

Example:

Previous pending = ₹3,400

Payment = ₹2,000

New pending = ₹1,400

Status:

Partial Payment

14. ADVANCE MANAGEMENT

Each worker should have an:

एडवांस

section.

Show:

DateAmountReason5 Sep₹1,000Personal8 Sep₹1,000Advance

Total Advance:

₹2,000

Button:

+ एडवांस दें

Form:

Worker
Amount
Date
Reason
Payment Method

15. PAYMENT LEDGER

Create:

भुगतान हिसाब

This should show all payments.

Columns:

Date
Worker
Event
Amount
Payment Method
Status

Example:

12 Sep | सुनीता | Wedding | ₹2,000 | Cash | Paid

Allow filters:

Worker

Date

Event

Payment method

16. REPORTS

Create a reports page.

Reports:

कर्मचारी रिपोर्ट

Shows:

Worker
Total Days
Gross Earnings
Advance
Paid
Pending

कार्यक्रम रिपोर्ट

Shows:

Event
Location
Staff Count
Labour Cost

हॉल रिपोर्ट

Hall 1
Total Events
Total Staff
Total Labour Cost

Monthly Report

September 2026

Total Events: 24

Total Worker Assignments: 183

Total Labour Cost: ₹1,42,000

Total Paid: ₹1,10,000

Pending: ₹32,000

Allow:

PDF डाउनलोड करें

Excel डाउनलोड करें

For the prototype, buttons can be visual/demo buttons; actual export implementation is not necessary unless easy.

17. IMPORTANT DASHBOARD INSIGHT

Add a section:

आज किस जगह कितने कर्मचारी हैं?

Hall 1 — 18
Hall 2 — 12
Hall 3 — 9
Outside Events — 7

This helps the owner immediately understand staff deployment.

18. SEARCH

The owner should be able to search:

“सुनीता”

and immediately see:

Worker profile

Current assignment

Work history

Total days

Earnings

Advances

Paid amount

Pending amount

19. UI / UX

The target user is a business owner, not a software engineer.

Therefore:

Keep the interface extremely simple.

Large buttons.

Clear Hindi labels.

Minimal technical terminology.

Mobile responsive.

Desktop dashboard should also work well.

Use cards and tables.

Avoid complicated menus.

Use confirmation dialogs before deleting payment/attendance.

Show success messages after saving.

Show clear empty states.

Use a professional catering/business style.

Do not make it flashy like a startup landing page.

The application should feel like a practical business management tool.

20. SIDEBAR

Use this navigation:

सवालिया कैटरर्स

🏠 डैशबोर्ड

👩 कर्मचारी

📅 कार्यक्रम

📍 हॉल / लोकेशन

✅ उपस्थिति

💰 पेमेंट

📊 रिपोर्ट

⚙️ सेटिंग्स

21. DEMO DATA

Populate the prototype with realistic sample data so the client immediately understands the system.

Create at least:

15 workers.

Mix:

Cook

Helper

Waiter

Cleaner

Use realistic Indian names, including several women workers because temporary women workers are the main use case.

Create:

3 halls

10 customers

12 events

Multiple outside events

Multiple worker assignments

Attendance records

Advances

Partial payments

Pending payments

Make sure the dashboard numbers are calculated from the demo data.

22. MOST IMPORTANT DEMO FLOW

The prototype must support this complete demonstration:

Open Dashboard.

Show today's events.

Open a wedding event.

Show assigned women workers.

Add a worker to the event.

Open attendance.

Mark the worker Present.

Open that worker's profile.

Show work history.

Show automatic earnings calculation.

Add an advance.

Record a partial payment.

Show the pending amount automatically changing.

Open reports.

Show event-wise and worker-wise totals.

This flow is more important than adding unnecessary features.

23. PROTOTYPE PRIORITY

Prioritize these features in this order:

👩 Worker Management

📅 Event Management

👥 Worker Assignment

✅ Attendance

💰 Payment Calculation

💵 Advance

🧾 Payment History

📊 Reports

Dashboard

Authentication

The prototype should make the owner immediately think:

“अब मुझे पता रहेगा कि कौन महिला/कर्मचारी कब काम पर आई, कहाँ काम किया, कितने दिन काम किया और उसे कितना पैसा देना है।”

24. TECHNICAL REQUIREMENTS FOR THE PROTOTYPE

Use:

React

TypeScript

Tailwind CSS

Responsive design

Component-based architecture

Mock/demo data

Clean reusable components

For this prototype, do NOT spend time building a real backend unless required.

The primary goal is to create a high-fidelity clickable prototype for client validation.

However, structure the frontend components and data models in a way that can later connect to:

Node.js

Express

PostgreSQL

Prisma

25. FINAL REQUIREMENT

This is NOT a generic employee management website.

The central business problem is:

Temporary event-based women workers + multiple locations + attendance + days worked + payment calculation + advances + pending payment.

Design every major screen around solving this problem.

Make the prototype polished enough to demonstrate to the actual business owner and collect feedback before development begins.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/48394881-e0e4-4f77-87f6-4444c2a87804).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
