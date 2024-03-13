import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class TermsConditionsWidget extends StatelessWidget {
  const TermsConditionsWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: SizedBox(
        width: double.infinity,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    "1. Acceptance of Terms",
                    style: GoogleFonts.poppins(
                      textStyle: const TextStyle(
                          fontWeight: FontWeight.bold, fontSize: 14),
                    ),
                  ),
                  Text(
                    'By using the Vehicle Details Display App ("Power Motoring"), you agree to comply with and be bound by these Terms and Conditions. If you do not agree to these Terms and Conditions, please do not use the App.',
                    textAlign: TextAlign.justify,
                    style: GoogleFonts.poppins(),
                  ),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    "2. User Eligibility",
                    style: GoogleFonts.poppins(
                      textStyle: const TextStyle(
                          fontWeight: FontWeight.bold, fontSize: 14),
                    ),
                  ),
                  Text(
                    'You must be at least 18 years old to use the App. By using the App, you represent and warrant that you are at least 18 years old.',
                    textAlign: TextAlign.justify,
                    style: GoogleFonts.poppins(),
                  ),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    "3. Use of the App",
                    style: GoogleFonts.poppins(
                      textStyle: const TextStyle(
                          fontWeight: FontWeight.bold, fontSize: 14),
                    ),
                  ),
                  Text(
                    'a. The App is designed to provide users with information about various vehicles. The information presented is for general informational purposes only.',
                    textAlign: TextAlign.justify,
                    style: GoogleFonts.poppins(),
                  ),
                  const SizedBox(
                    height: 10,
                  ),
                  Text(
                    'b. You agree not to use the App for any illegal or unauthorized purpose. You must comply with all applicable laws and regulations.',
                    textAlign: TextAlign.justify,
                    style: GoogleFonts.poppins(),
                  ),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    "4. Accuracy of Information",
                    style: GoogleFonts.poppins(
                      textStyle: const TextStyle(
                          fontWeight: FontWeight.bold, fontSize: 14),
                    ),
                  ),
                  Text(
                    'a. The App strives to provide accurate and up-to-date information about vehicles, but we do not guarantee the accuracy, completeness, or timeliness of the information provided.',
                    textAlign: TextAlign.justify,
                    style: GoogleFonts.poppins(),
                  ),
                  const SizedBox(
                    height: 10,
                  ),
                  Text(
                    'b. Users are encouraged to verify any information obtained through the App independently before making decisions based on such information.',
                    textAlign: TextAlign.justify,
                    style: GoogleFonts.poppins(),
                  ),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    "5. Intellectual Property",
                    style: GoogleFonts.poppins(
                      textStyle: const TextStyle(
                          fontWeight: FontWeight.bold, fontSize: 14),
                    ),
                  ),
                  Text(
                    'a. The content and materials available on the App, including but not limited to text, graphics, logos, images, and software, are the property of the App or its licensors and are protected by copyright and other intellectual property laws.',
                    textAlign: TextAlign.justify,
                    style: GoogleFonts.poppins(),
                  ),
                  const SizedBox(
                    height: 10,
                  ),
                  Text(
                    'b. You may not reproduce, distribute, display, modify, or create derivative works of any content from the App without the express written consent of the App.',
                    textAlign: TextAlign.justify,
                    style: GoogleFonts.poppins(),
                  ),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    "6. Privacy",
                    style: GoogleFonts.poppins(
                      textStyle: const TextStyle(
                          fontWeight: FontWeight.bold, fontSize: 14),
                    ),
                  ),
                  Text(
                    'a. The App may collect and use personal information as outlined in its Privacy Policy. By using the App, you consent to the collection and use of your personal information in accordance with the Privacy Policy.',
                    textAlign: TextAlign.justify,
                    style: GoogleFonts.poppins(),
                  ),
                  const SizedBox(
                    height: 10,
                  ),
                  Text(
                    'b. You are responsible for maintaining the confidentiality of your account information and for restricting access to your device.',
                    textAlign: TextAlign.justify,
                    style: GoogleFonts.poppins(),
                  ),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    "7. Limitation of Liability",
                    style: GoogleFonts.poppins(
                      textStyle: const TextStyle(
                          fontWeight: FontWeight.bold, fontSize: 14),
                    ),
                  ),
                  Text(
                    'a. The App, its affiliates, and their respective officers, directors, employees, agents, and representatives shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (i) your use or inability to use the App; (ii) any unauthorized access to or use of our servers and/or any personal information stored therein; (iii) any interruption or cessation of transmission to or from the App.',
                    textAlign: TextAlign.justify,
                    style: GoogleFonts.poppins(),
                  ),
                  const SizedBox(
                    height: 10,
                  ),
                  Text(
                    "b. The App's total liability for any claims arising out of or relating to these Terms and Conditions or the use of the App shall not exceed the amount paid by you, if any, to the App in the six months prior to the event giving rise to the liability.",
                    textAlign: TextAlign.justify,
                    style: GoogleFonts.poppins(),
                  ),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    "8. Changes to Terms and Conditions",
                    style: GoogleFonts.poppins(
                      textStyle: const TextStyle(
                          fontWeight: FontWeight.bold, fontSize: 14),
                    ),
                  ),
                  Text(
                    'The App reserves the right to modify or replace these Terms and Conditions at any time. Your continued use of the App after any such changes constitutes your acceptance of the new Terms and Conditions.',
                    textAlign: TextAlign.justify,
                    style: GoogleFonts.poppins(),
                  ),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    "9. Governing Law",
                    style: GoogleFonts.poppins(
                      textStyle: const TextStyle(
                          fontWeight: FontWeight.bold, fontSize: 14),
                    ),
                  ),
                  Text(
                    'These Terms and Conditions are governed by and construed in accordance with the laws of [your jurisdiction], and you submit to the exclusive jurisdiction of the courts located in [your jurisdiction] for the resolution of any disputes.',
                    textAlign: TextAlign.justify,
                    style: GoogleFonts.poppins(),
                  ),
                  const SizedBox(
                    height: 10,
                  ),
                  Text(
                    'By using the Vehicle Details Display App, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.',
                    textAlign: TextAlign.justify,
                    style: GoogleFonts.poppins(),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
