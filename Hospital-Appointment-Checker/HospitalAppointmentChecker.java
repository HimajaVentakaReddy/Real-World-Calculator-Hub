import java.util.Scanner;

/**
 * Project Name: Hospital-Appointment-Checker
 * Description : A beginner-friendly Java console application to check and process
 *               patient hospital appointment requests based on age, consultation type,
 *               and emergency priority.
 */
public class HospitalAppointmentChecker {

    public static void main(String[] args) {
        // Create Scanner object to read user input from the console
        Scanner scanner = new Scanner(System.in);

        System.out.println("==================================================");
        System.out.println("       HOSPITAL APPOINTMENT CHECKER SYSTEM        ");
        System.out.println("==================================================");

        // 1. Patient Name Input
        System.out.print("Enter Patient Name: ");
        String patientName = scanner.nextLine().trim();

        // Validate Patient Name
        if (patientName.isEmpty()) {
          System.out.println("\n[ERROR] Patient name cannot be blank. Appointment rejected.");
          scanner.close();
          return;
        }

        // 2. Patient Age Input
        System.out.print("Enter Patient Age (in years): ");
        int patientAge;
        if (scanner.hasNextInt()) {
          patientAge = scanner.nextInt();
          scanner.nextLine(); // Clear newline buffer
        } else {
          System.out.println("\n[ERROR] Age must be a valid whole number. Appointment rejected.");
          scanner.close();
          return;
        }

        // Validate Age (must be between 1 and 120 years)
        if (patientAge < 1 || patientAge > 120) {
          System.out.println("\n[ERROR] Invalid age! Age must be between 1 and 120 years. Appointment rejected.");
          scanner.close();
          return;
        }

        // 3. Appointment Type Input
        System.out.print("Enter Appointment Type (General / Specialist): ");
        String appointmentType = scanner.nextLine().trim();

        // Validate Appointment Type
        boolean isGeneral = appointmentType.equalsIgnoreCase("General");
        boolean isSpecialist = appointmentType.equalsIgnoreCase("Specialist");

        if (!isGeneral && !isSpecialist) {
          System.out.println("\n[ERROR] Invalid appointment type! Please enter either 'General' or 'Specialist'.");
          scanner.close();
          return;
        }

        // 4. Emergency Status Input
        System.out.print("Is this an Emergency? (Yes / No): ");
        String emergencyInput = scanner.nextLine().trim();

        // Validate Emergency Status
        boolean isEmergencyYes = emergencyInput.equalsIgnoreCase("Yes");
        boolean isEmergencyNo = emergencyInput.equalsIgnoreCase("No");

        if (!isEmergencyYes && !isEmergencyNo) {
          System.out.println("\n[ERROR] Invalid emergency response! Please enter 'Yes' or 'No'.");
          scanner.close();
          return;
        }

        // ==================================================
        // DECISION LOGIC USING SIMPLE IF-ELSE CONDITIONS
        // ==================================================
        System.out.println("\n--------------------------------------------------");
        System.out.println("               APPOINTMENT SUMMARY                ");
        System.out.println("--------------------------------------------------");
        System.out.println("Patient Name     : " + patientName);
        System.out.println("Patient Age      : " + patientAge + " years");
        System.out.println("Appointment Type : " + (isGeneral ? "General" : "Specialist"));
        System.out.println("Emergency Status : " + (isEmergencyYes ? "YES" : "NO"));
        System.out.println("--------------------------------------------------");

        if (isEmergencyYes) {
          // Rule: Emergency patients are given top priority acceptance
          System.out.println("Status           : ACCEPTED (EMERGENCY PRIORITY)");
          System.out.println("Action Required  : Proceed directly to the Emergency / Trauma Ward immediately.");
          System.out.println("Notes            : On-duty emergency doctor assigned with highest priority.");
        } else {
          // Non-emergency standard appointments
          if (isGeneral) {
            System.out.println("Status           : ACCEPTED (STANDARD PRIORITY)");
            System.out.println("Action Required  : Scheduled for General Physician OPD consultation.");
            System.out.println("Notes            : Regular token issued. Please arrive 15 minutes before your slot.");
          } else {
            // Specialist appointment
            System.out.println("Status           : ACCEPTED (SPECIALIST CONSULTATION)");
            System.out.println("Action Required  : Booked with the concerned Department Specialist.");
            System.out.println("Notes            : Please bring prior medical records and test reports.");
          }
        }

        System.out.println("==================================================");
        System.out.println("      Thank you for using our Hospital System!     ");
        System.out.println("==================================================");

        // Close scanner resource
        scanner.close();
    }
}
