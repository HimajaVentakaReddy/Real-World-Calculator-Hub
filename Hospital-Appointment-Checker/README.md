# 🏥 Hospital-Appointment-Checker

A beginner-friendly Java console application to evaluate, validate, and schedule hospital patient appointments based on patient age, consultation department, and emergency severity priority.

---

## 📌 Project Overview

This project simulates a hospital front-desk reception triage system. Using basic Java concepts such as `Scanner` for console input, conditional branching (`if-else`), and string comparison methods, it checks patient details and immediately routes them according to their medical urgency.

---

## 📋 Features & Business Rules

1. **Patient Information Collection:**
   * Patient Name
   * Patient Age (in years)
   * Appointment Type (`General` or `Specialist`)
   * Emergency Status (`Yes` or `No`)

2. **Validation Rules:**
   * **Blank Name:** Patient name cannot be blank.
   * **Age Boundaries:** Patient age must be between **1 and 120 years**. Ages below 1 or above 120 are flagged as invalid.
   * **Appointment Type:** Only `General` or `Specialist` (case-insensitive) are accepted.
   * **Emergency Flag:** Only `Yes` or `No` (case-insensitive) are accepted.

3. **Triage & Priority Decision Logic:**
   * **Emergency Priority:** If Emergency is `Yes`, the appointment is accepted immediately with **EMERGENCY PRIORITY**, directing the patient straight to the emergency/trauma triage room.
   * **General Consultation:** If non-emergency and `General`, a standard OPD consultation token is issued.
   * **Specialist Consultation:** If non-emergency and `Specialist`, a department specialist slot is booked.

---

## 🛠️ Concepts Used

* **`java.util.Scanner`** for reading string and integer inputs from the console.
* **Basic Data Types:** `String`, `int`, `boolean`.
* **String Methods:** `.trim()`, `.isEmpty()`, `.equalsIgnoreCase()`.
* **Input Validation & Buffer Clearing:** `scanner.hasNextInt()` and `scanner.nextLine()`.
* **Control Flow:** Nested and cascading `if-else` decision structures.

---

## 🚀 How to Compile and Run

Make sure you have Java JDK (version 8 or higher) installed.

### 1. Compile the Java file
```bash
javac HospitalAppointmentChecker.java
```

### 2. Run the application
```bash
java HospitalAppointmentChecker
```

---

## 🧪 Sample Inputs and Outputs

### Case 1: Emergency Patient (High Priority Acceptance)
```text
==================================================
       HOSPITAL APPOINTMENT CHECKER SYSTEM        
==================================================
Enter Patient Name: Rajesh Kumar
Enter Patient Age (in years): 45
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
==================================================
      Thank you for using our Hospital System!     
==================================================
```

---

### Case 2: Regular Specialist Appointment (Non-Emergency)
```text
==================================================
       HOSPITAL APPOINTMENT CHECKER SYSTEM        
==================================================
Enter Patient Name: Priya Sharma
Enter Patient Age (in years): 29
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
==================================================
      Thank you for using our Hospital System!     
==================================================
```

---

### Case 3: Invalid Age Boundary Check
```text
==================================================
       HOSPITAL APPOINTMENT CHECKER SYSTEM        
==================================================
Enter Patient Name: Baby Aarav
Enter Patient Age (in years): 0

[ERROR] Invalid age! Age must be between 1 and 120 years. Appointment rejected.
```

---

### Case 4: Invalid Appointment Category
```text
==================================================
       HOSPITAL APPOINTMENT CHECKER SYSTEM        
==================================================
Enter Patient Name: Amit Verma
Enter Patient Age (in years): 34
Enter Appointment Type (General / Specialist): Dental

[ERROR] Invalid appointment type! Please enter either 'General' or 'Specialist'.
```

---

## 💡 Code Logic Walkthrough

1. **Input Phase:** The program prompts for the patient's name, age, appointment type, and emergency condition.
2. **Early Exit on Error:** Each input is validated sequentially. If invalid data is detected (such as an empty string, out-of-range age, or unrecognized choice), the system prints a clear, friendly error message and safely exits.
3. **Decision Hierarchy:**
   * Checking `isEmergencyYes` first guarantees that critical emergency patients are never delayed by department filters.
   * Non-emergency cases then branch into General or Specialist slots.
4. **Clean Exit:** At the end of execution, `scanner.close()` is invoked to prevent resource leaks.
