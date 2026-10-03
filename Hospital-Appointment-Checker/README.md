# 🏥 Hospital-Appointment-Checker

A beginner-friendly Java console application to evaluate, validate, and schedule hospital patient appointments with automated billing and emergency priority triage.

---

## 📌 Project Overview

This project simulates a hospital front-desk reception and billing system. Using core Java concepts such as `Scanner` for console input, beginner-friendly `while` validation loops, simple `if-else` branching, and arithmetic operators, it gathers patient details, determines triage priority, and calculates the total appointment fee.

---

## 💰 Appointment Fee Calculation Rules

The appointment fee is calculated automatically based on consultation category and urgency:

| Appointment Type | Base Fee | Emergency Surcharge | Total Fee |
|---|---|---|---|
| **General Consultation (Non-Emergency)** | ₹200 | ₹0 | **₹200** |
| **General Consultation (Emergency)** | ₹200 | ₹100 | **₹300** |
| **Specialist Consultation (Non-Emergency)** | ₹500 | ₹0 | **₹500** |
| **Specialist Consultation (Emergency)** | ₹500 | ₹100 | **₹600** |

### Formula
$$\text{Total Fee} = \text{Base Fee} + \text{Emergency Charge}$$

* **Base Fee:** ₹200 for `General`, ₹500 for `Specialist`.
* **Emergency Charge:** ₹100 if Emergency is `Yes`, else ₹0.

---

## ✨ Features & Validations

1. **Patient Name Validation:**
   * Checks that the name is not blank.
   * Re-prompts the user until a valid name is provided.

2. **Age Range Validation (1 to 120 years):**
   * Verifies that the input is a valid whole number using `scanner.hasNextInt()`.
   * Rejects values `< 1` or `> 120` years.

3. **Appointment Type Validation (`General` / `Specialist`):**
   * Case-insensitive verification (`equalsIgnoreCase`).
   * Re-prompts until either `General` or `Specialist` is entered.

4. **Emergency Status Validation (`Yes` / `No`):**
   * Accepts only `Yes` or `No` (case-insensitive).

5. **Priority Triage & Billing:**
   * **Emergency Cases (`Yes`):** Flagged with **EMERGENCY PRIORITY** and charged a ₹100 priority surcharge.
   * **Standard Cases (`No`):** Routed to General OPD or Specialist departments with ₹0 emergency surcharge.

---

## 🛠️ Concepts Used

* **`java.util.Scanner`** for reading console input.
* **Primitive Variables:** `int` (age, base fee, emergency charge, total fee), `boolean` flags.
* **String Methods:** `.trim()`, `.isEmpty()`, `.equalsIgnoreCase()`.
* **Loops:** `while(true)` with `break` for interactive input validation.
* **Operators:** Arithmetic (`+`), relational (`>=`, `<=`, `||`, `&&`).
* **Conditional Structures:** Beginner-friendly `if-else` blocks.

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

### Sample 1: Emergency General Appointment
```text
==================================================
       HOSPITAL APPOINTMENT CHECKER SYSTEM        
==================================================
Enter Patient Name: Rajesh Kumar
Enter Patient Age (1 - 120 years): 45
Enter Appointment Type (General / Specialist): General
Is this an Emergency? (Yes / No): Yes

--------------------------------------------------
               APPOINTMENT SUMMARY                
--------------------------------------------------
Patient Name     : Rajesh Kumar
Patient Age      : 45 years
Appointment Type : General
Emergency Status : YES
--------------------------------------------------
Status           : ACCEPTED (EMERGENCY PRIORITY)
Action Required  : Proceed directly to the Emergency / Trauma Ward immediately.
Notes            : On-duty emergency doctor assigned with highest priority.
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

### Sample 2: Non-Emergency Specialist Consultation
```text
==================================================
       HOSPITAL APPOINTMENT CHECKER SYSTEM        
==================================================
Enter Patient Name: Priya Sharma
Enter Patient Age (1 - 120 years): 29
Enter Appointment Type (General / Specialist): Specialist
Is this an Emergency? (Yes / No): No

--------------------------------------------------
               APPOINTMENT SUMMARY                
--------------------------------------------------
Patient Name     : Priya Sharma
Patient Age      : 29 years
Appointment Type : Specialist
Emergency Status : NO
--------------------------------------------------
Status           : ACCEPTED (SPECIALIST CONSULTATION)
Action Required  : Booked with the concerned Department Specialist.
Notes            : Please bring prior medical records and test reports.
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

### Sample 3: Interactive Input Recovery
```text
==================================================
       HOSPITAL APPOINTMENT CHECKER SYSTEM        
==================================================
Enter Patient Name: 
[ERROR] Patient name cannot be empty. Please enter a valid name.

Enter Patient Name: Deepa Nair
Enter Patient Age (1 - 120 years): 130
[ERROR] Invalid age! Age must be between 1 and 120 years.

Enter Patient Age (1 - 120 years): 38
Enter Appointment Type (General / Specialist): Cardiology
[ERROR] Invalid appointment type! Please enter either 'General' or 'Specialist'.

Enter Appointment Type (General / Specialist): Specialist
Is this an Emergency? (Yes / No): Yes

--------------------------------------------------
               APPOINTMENT SUMMARY                
--------------------------------------------------
Patient Name     : Deepa Nair
Patient Age      : 38 years
Appointment Type : Specialist
Emergency Status : YES
--------------------------------------------------
Status           : ACCEPTED (EMERGENCY PRIORITY)
Action Required  : Proceed directly to the Emergency / Trauma Ward immediately.
Notes            : On-duty emergency doctor assigned with highest priority.
--------------------------------------------------
                 BILLING DETAILS                  
--------------------------------------------------
Base Fee         : ₹500 (Specialist)
Emergency Charge : ₹100 (Emergency Priority Surcharge)
Total Fee        : ₹600
==================================================
      Thank you for using our Hospital System!     
==================================================
```
