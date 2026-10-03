# 🏥 Hospital-Appointment-Checker

A beginner-friendly Java console application to evaluate, validate, and schedule hospital patient appointments based on patient age, consultation department, and emergency severity priority.

---

## 📌 Project Overview

This project simulates a hospital front-desk reception triage system. Using basic Java concepts such as `Scanner` for console input, beginner-friendly `while` validation loops, and simple conditional branching (`if-else`), it securely gathers patient details and immediately routes them according to medical urgency.

---

## ✨ New Input-Validation Features

The program now includes interactive input validation loops so users are prompted again if an invalid value is entered:

1. **Patient Name Validation:**
   * Verifies that the name is not empty or composed solely of whitespace.
   * Prompts the user repeatedly until a non-empty name is provided.

2. **Age Range Validation (1 to 120 years):**
   * Uses `scanner.hasNextInt()` to protect against non-numeric entries (e.g., words or symbols).
   * Validates that age falls within the realistic boundary of **1 to 120 years**.
   * Re-prompts the user with an informative error message if outside range.

3. **Appointment Type Validation (`General` / `Specialist`):**
   * Uses case-insensitive comparison (`equalsIgnoreCase`).
   * Rejects any unrecognized department choices and asks the user to enter either `General` or `Specialist`.

4. **Emergency Status Validation (`Yes` / `No`):**
   * Accepts only `Yes` or `No` (case-insensitive).
   * Re-prompts until an unambiguous confirmation is provided.

---

## 📋 Triage & Priority Decision Logic

* **Emergency Priority:** If Emergency is `Yes`, the appointment is accepted immediately with **EMERGENCY PRIORITY**, directing the patient straight to the emergency/trauma ward.
* **General Consultation:** If non-emergency and `General`, a standard OPD consultation token is issued.
* **Specialist Consultation:** If non-emergency and `Specialist`, an appointment is scheduled with the concerned department specialist.

---

## 🛠️ Concepts Used

* **`java.util.Scanner`** for reading console input.
* **Primitive & Reference Types:** `String`, `int`, `boolean`.
* **String Methods:** `.trim()`, `.isEmpty()`, `.equalsIgnoreCase()`.
* **Validation Loops:** `while(true)` with `break` upon meeting valid conditions.
* **Buffer Management:** `scanner.nextLine()` to handle leftover newline characters.
* **Conditional Branching:** Simple `if-else` decision trees.

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

## 🧪 Sample Execution with Input Validation

```text
==================================================
       HOSPITAL APPOINTMENT CHECKER SYSTEM        
==================================================
Enter Patient Name: 
[ERROR] Patient name cannot be empty. Please enter a valid name.

Enter Patient Name: Sneha Rao
Enter Patient Age (1 - 120 years): 150
[ERROR] Invalid age! Age must be between 1 and 120 years.

Enter Patient Age (1 - 120 years): thirty
[ERROR] Invalid input! Age must be a whole numeric value.

Enter Patient Age (1 - 120 years): 32
Enter Appointment Type (General / Specialist): Dental
[ERROR] Invalid appointment type! Please enter either 'General' or 'Specialist'.

Enter Appointment Type (General / Specialist): Specialist
Is this an Emergency? (Yes / No): Maybe
[ERROR] Invalid response! Please enter either 'Yes' or 'No'.

Is this an Emergency? (Yes / No): No

--------------------------------------------------
               APPOINTMENT SUMMARY                
--------------------------------------------------
Patient Name     : Sneha Rao
Patient Age      : 32 years
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

## 💡 Code Logic Walkthrough

1. **Looping Input Blocks:** Each user input is enclosed in a straightforward `while (true)` loop.
2. **Instant Error Feedback:** If the user enters invalid data (such as leaving the name blank, typing non-numeric age, giving an out-of-range age, or typing an invalid option), the program displays an `[ERROR]` message and reprompts.
3. **Escaping the Loop:** Once the input passes validation checks, a `break;` statement exits the loop and moves cleanly to the next question.
4. **Emergency Priority Evaluation:** Emergency status is evaluated first to ensure urgent cases receive immediate attention.
5. **Safe Resource Teardown:** Closes the `Scanner` object at the end of `main`.
