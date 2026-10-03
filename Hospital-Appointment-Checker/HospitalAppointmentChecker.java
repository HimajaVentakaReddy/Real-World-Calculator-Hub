import java.util.Scanner;

/**
 * Project Name: Hospital-Appointment-Checker
 * Description : A beginner-friendly Java console application to check and process
 *               patient hospital appointment requests with interactive input validation,
 *               preferred time-slot scheduling, emergency triage priority, and fee calculation.
 */
public class HospitalAppointmentChecker {

    public static void main(String[] args) {
        // Create Scanner object to read user input from the console
        Scanner scanner = new Scanner(System.in);

        System.out.println("==================================================");
        System.out.println("       HOSPITAL APPOINTMENT CHECKER SYSTEM        ");
        System.out.println("==================================================");

        // --------------------------------------------------
        // 1. Patient Name Input (Validated with while loop)
        // --------------------------------------------------
        String patientName = "";
        while (true) {
            System.out.print("Enter Patient Name: ");
            patientName = scanner.nextLine().trim();

            if (!patientName.isEmpty()) {
                break; // Valid non-empty name entered
            }
            System.out.println("[ERROR] Patient name cannot be empty. Please enter a valid name.\n");
        }

        // --------------------------------------------------
        // 2. Patient Age Input (Validated: 1 to 120 years)
        // --------------------------------------------------
        int patientAge = 0;
        while (true) {
            System.out.print("Enter Patient Age (1 - 120 years): ");

            if (scanner.hasNextInt()) {
                patientAge = scanner.nextInt();
                scanner.nextLine(); // Clear newline from input buffer

                if (patientAge >= 1 && patientAge <= 120) {
                    break; // Valid age entered
                } else {
                    System.out.println("[ERROR] Invalid age! Age must be between 1 and 120 years.\n");
                }
            } else {
                System.out.println("[ERROR] Invalid input! Age must be a whole numeric value.\n");
                scanner.nextLine(); // Discard invalid non-numeric token
            }
        }

        // --------------------------------------------------
        // 3. Appointment Type Input (Validated: General or Specialist)
        // --------------------------------------------------
        String appointmentType = "";
        boolean isGeneral = false;
        boolean isSpecialist = false;
        while (true) {
            System.out.print("Enter Appointment Type (General / Specialist): ");
            appointmentType = scanner.nextLine().trim();

            isGeneral = appointmentType.equalsIgnoreCase("General");
            isSpecialist = appointmentType.equalsIgnoreCase("Specialist");

            if (isGeneral || isSpecialist) {
                break; // Valid category entered
            }
            System.out.println("[ERROR] Invalid appointment type! Please enter either 'General' or 'Specialist'.\n");
        }

        // --------------------------------------------------
        // 4. Appointment Time Slot Input (Morning / Afternoon / Evening)
        // --------------------------------------------------
        String timeSlot = "";
        while (true) {
            System.out.print("Select Appointment Time Slot (Morning / Afternoon / Evening): ");
            String slotInput = scanner.nextLine().trim();

            if (slotInput.equalsIgnoreCase("Morning")) {
                timeSlot = "Morning (09:00 AM - 12:00 PM)";
                break;
            } else if (slotInput.equalsIgnoreCase("Afternoon")) {
                timeSlot = "Afternoon (01:00 PM - 04:00 PM)";
                break;
            } else if (slotInput.equalsIgnoreCase("Evening")) {
                timeSlot = "Evening (05:00 PM - 08:00 PM)";
                break;
            } else {
                System.out.println("[ERROR] Invalid time slot! Please choose 'Morning', 'Afternoon', or 'Evening'.\n");
            }
        }

        // --------------------------------------------------
        // 5. Emergency Status Input (Validated: Yes or No)
        // --------------------------------------------------
        String emergencyInput = "";
        boolean isEmergencyYes = false;
        boolean isEmergencyNo = false;
        while (true) {
            System.out.print("Is this an Emergency? (Yes / No): ");
            emergencyInput = scanner.nextLine().trim();

            isEmergencyYes = emergencyInput.equalsIgnoreCase("Yes");
            isEmergencyNo = emergencyInput.equalsIgnoreCase("No");

            if (isEmergencyYes || isEmergencyNo) {
                break; // Valid response entered
            }
            System.out.println("[ERROR] Invalid response! Please enter either 'Yes' or 'No'.\n");
        }

        // ==================================================
        // FEE CALCULATION LOGIC
        // ==================================================
        // Base Fee: General = ₹200, Specialist = ₹500
        int baseFee = 0;
        if (isGeneral) {
            baseFee = 200;
        } else {
            baseFee = 500;
        }

        // Emergency Surcharge: ₹100 if Emergency is Yes, else ₹0
        int emergencyCharge = 0;
        if (isEmergencyYes) {
            emergencyCharge = 100;
        }

        // Total Appointment Fee Calculation
        int totalFee = baseFee + emergencyCharge;

        // ==================================================
        // DISPLAY APPOINTMENT SUMMARY & BILLING DETAILS
        // ==================================================
        System.out.println("\n--------------------------------------------------");
        System.out.println("               APPOINTMENT SUMMARY                ");
        System.out.println("--------------------------------------------------");
        System.out.println("Patient Name     : " + patientName);
        System.out.println("Patient Age      : " + patientAge + " years");
        System.out.println("Appointment Type : " + (isGeneral ? "General" : "Specialist"));
        System.out.println("Time Slot        : " + timeSlot);
        System.out.println("Emergency Status : " + (isEmergencyYes ? "YES" : "NO"));
        System.out.println("--------------------------------------------------");

        if (isEmergencyYes) {
            // Rule: Emergency patients are given top priority acceptance
            System.out.println("Status           : ACCEPTED (EMERGENCY PRIORITY)");
            System.out.println("Action Required  : Proceed directly to the Emergency / Trauma Ward immediately.");
            System.out.println("Priority Notice  : Patient will receive immediate emergency doctor priority regardless of the scheduled time slot.");
        } else {
            // Non-emergency standard appointments
            if (isGeneral) {
                System.out.println("Status           : ACCEPTED (STANDARD PRIORITY)");
                System.out.println("Action Required  : Scheduled for General Physician OPD consultation.");
                System.out.println("Slot Notice      : Please report 15 minutes before your " + timeSlot + ".");
            } else {
                // Specialist appointment
                System.out.println("Status           : ACCEPTED (SPECIALIST CONSULTATION)");
                System.out.println("Action Required  : Booked with the concerned Department Specialist.");
                System.out.println("Slot Notice      : Please report with previous medical records during your " + timeSlot + ".");
            }
        }

        // --------------------------------------------------
        // BILLING BREAKDOWN
        // --------------------------------------------------
        System.out.println("--------------------------------------------------");
        System.out.println("                 BILLING DETAILS                  ");
        System.out.println("--------------------------------------------------");
        System.out.println("Base Fee         : ₹" + baseFee + " (" + (isGeneral ? "General" : "Specialist") + ")");
        System.out.println("Emergency Charge : ₹" + emergencyCharge + (isEmergencyYes ? " (Emergency Priority Surcharge)" : " (None)"));
        System.out.println("Total Fee        : ₹" + totalFee);
        System.out.println("==================================================");
        System.out.println("      Thank you for using our Hospital System!     ");
        System.out.println("==================================================");

        // Close scanner resource
        scanner.close();
    }
}
