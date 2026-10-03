# 🏥 Hospital-Appointment-Checker

A beginner-friendly Java console application to evaluate, validate, and schedule hospital patient appointments with preferred time-slot selection, automated billing, and emergency priority triage.

---

## 📌 Project Overview

This project simulates a hospital front-desk reception, appointment booking, and billing system. Built using fundamental Java concepts (`Scanner`, loops, variables, arithmetic operations, and simple `if-else` branching), it gathers patient information, validates inputs interactively, books a preferred time slot, grants emergency priority, and generates an itemized consultation bill.

---

## ⏰ Appointment Time-Slot Feature

Patients can choose their preferred consultation window during booking:

| Time Slot Option | Clinical Consultation Hours |
|---|---|
| **Morning** | 09:00 AM – 12:00 PM |
| **Afternoon** | 01:00 PM – 04:00 PM |
| **Evening** | 05:00 PM – 08:00 PM |

* **Interactive Validation:** The application accepts `Morning`, `Afternoon`, or `Evening` (case-insensitive). If an invalid slot is typed, the user is prompted again.
* **Emergency Priority Override:** If an appointment is marked as an emergency, the patient receives **immediate medical priority**, overriding slot waiting times.

---

## 💰 Appointment Fee Calculation Rules

The appointment fee is calculated automatically based on consultation category and urgency:

| Appointment Type | Base Fee | Emergency Surcharge | Total Fee |
|---|---|---|---|
| **General Consultation (Non-Emergency)** | ₹200 | ₹0 | **₹200** |
| **General Consultation (Emergency)** | ₹200 | ₹100 | **₹300** |
| **Specialist Consultation (Non-Emergency)** | ₹500 | ₹0 | **₹500** |
| **Specialist Consultation (Emergency)** | ₹500 | ₹100 | **₹600** |

$$\text{Total Fee} = \text{Base Fee} + \text{Emergency Charge}$$

* **Base Fee:** ₹200 for `General`, ₹500 for `Specialist`.
* **Emergency Charge:** ₹100 if Emergency is `Yes`, else ₹0.

---

## ✨ Features & Validations

1. **Patient Name Validation:** Cannot be empty or whitespace only.
2. **Age Range Validation:** Must be a whole number between **1 and 120 years**.
3. **Appointment Type Validation:** Must be either `General` or `Specialist`.
4. **Time Slot Validation:** Must be `Morning`, `Afternoon`, or `Evening`.
5. **Emergency Status Validation:** Must be `Yes` or `No`.
6. **Priority Routing:** Emergency patients receive immediate triage status and an explicit notice that they receive immediate emergency doctor priority regardless of the scheduled time slot.
7. **Transparent Billing:** Clear itemized fee breakdown showing Base Fee, Emergency Surcharge, and Total Fee in Indian Rupees (₹).

---

## 🛠️ Concepts Used

* **`java.util.Scanner`** for reading console input.
* **Primitive Variables:** `int` (age, fees), `boolean` flags, and `String`.
* **String Methods:** `.trim()`, `.isEmpty()`, `.equalsIgnoreCase()`.
* **Loops:** `while(true)` with `break` for interactive input validation.
* **Operators:** Arithmetic (`+`), relational (`>=`, `<=`, `||`, `&&`).
* **Conditional Structures:** Beginner-friendly cascading `if-else` blocks.

---

## 🚀 How to Compile and Run

Make sure you have Java JDK installed (version 8 or higher).

### 1. Compile the Java file
```bash
javac HospitalAppointmentChecker.java
```

### 2. Run the application
```bash
java HospitalAppointmentChecker
```

---

## 🧪 Sample Executions

### Sample 1: Emergency Patient with Priority Notice
```text
==================================================
       HOSPITAL APPOINTMENT CHECKER SYSTEM        
==================================================
Enter Patient Name: Rajesh Kumar
Enter Patient Age (1 - 120 years): 45
Enter Appointment Type (General / Specialist): General
Select Appointment Time Slot (Morning / Afternoon / Evening): Morning
Is this an Emergency? (Yes / No): Yes

--------------------------------------------------
               APPOINTMENT SUMMARY                
--------------------------------------------------
Patient Name     : Rajesh Kumar
Patient Age      : 45 years
Appointment Type : General
Time Slot        : Morning (09:00 AM - 12:00 PM)
Emergency Status : YES
--------------------------------------------------
Status           : ACCEPTED (EMERGENCY PRIORITY)
Action Required  : Proceed directly to the Emergency / Trauma Ward immediately.
Priority Notice  : Patient will receive immediate emergency doctor priority regardless of the scheduled time slot.
--------------------------------------------------
                 BILLING DETAILS                  
--------------------------------------------------
Base Fee         : ₹200 (General)
Emergency Charge : ₹100 (Emergency Priority Surcharge)
Total Fee        : ₹300
==================================================
      Thank you for using our Hospital System!     
==================================================
```

---

### Sample 2: Non-Emergency Specialist in the Evening
```text
==================================================
       HOSPITAL APPOINTMENT CHECKER SYSTEM        
==================================================
Enter Patient Name: Priya Sharma
Enter Patient Age (1 - 120 years): 29
Enter Appointment Type (General / Specialist): Specialist
Select Appointment Time Slot (Morning / Afternoon / Evening): Evening
Is this an Emergency? (Yes / No): No

--------------------------------------------------
               APPOINTMENT SUMMARY                
--------------------------------------------------
Patient Name     : Priya Sharma
Patient Age      : 29 years
Appointment Type : Specialist
Time Slot        : Evening (05:00 PM - 08:00 PM)
Emergency Status : NO
--------------------------------------------------
Status           : ACCEPTED (SPECIALIST CONSULTATION)
Action Required  : Booked with the concerned Department Specialist.
Slot Notice      : Please report with previous medical records during your Evening (05:00 PM - 08:00 PM).
--------------------------------------------------
                 BILLING DETAILS                  
--------------------------------------------------
Base Fee         : ₹500 (Specialist)
Emergency Charge : ₹0 (None)
Total Fee        : ₹500
==================================================
      Thank you for using our Hospital System!     
==================================================
```

---

### Sample 3: Time Slot Input Validation & Recovery
```text
==================================================
       HOSPITAL APPOINTMENT CHECKER SYSTEM        
==================================================
Enter Patient Name: Deepa Nair
Enter Patient Age (1 - 120 years): 38
Enter Appointment Type (General / Specialist): Specialist
Select Appointment Time Slot (Morning / Afternoon / Evening): Night
[ERROR] Invalid time slot! Please choose 'Morning', 'Afternoon', or 'Evening'.

Select Appointment Time Slot (Morning / Afternoon / Evening): Afternoon
Is this an Emergency? (Yes / No): No

--------------------------------------------------
               APPOINTMENT SUMMARY                
--------------------------------------------------
Patient Name     : Deepa Nair
Patient Age      : 38 years
Appointment Type : Specialist
Time Slot        : Afternoon (01:00 PM - 04:00 PM)
Emergency Status : NO
--------------------------------------------------
Status           : ACCEPTED (SPECIALIST CONSULTATION)
Action Required  : Booked with the concerned Department Specialist.
Slot Notice      : Please report with previous medical records during your Afternoon (01:00 PM - 04:00 PM).
--------------------------------------------------
                 BILLING DETAILS                  
--------------------------------------------------
Base Fee         : ₹500 (Specialist)
Emergency Charge : ₹0 (None)
Total Fee        : ₹500
==================================================
      Thank you for using our Hospital System!     
==================================================
```
