import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class WelcomeScreenTwo extends StatelessWidget {
  const WelcomeScreenTwo({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Expanded(
          child: Image.asset('assets/images/manufacurers.png'),
        ),
        Expanded(
          child: Column(
            children: [
              Text(
                "Added new Manufacturers",
                style: GoogleFonts.poppins(
                  fontSize: 20,
                  fontWeight: FontWeight.w800,
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(20),
                child: Text(
                  "The app now includes comprehensive manufacturer details, providing users with valuable insights into product origins, specifications, and more. This enhancement enhances the user experience by ensuring they have all the necessary information at their fingertips.",
                  textAlign: TextAlign.justify,
                  style: GoogleFonts.poppins(
                    fontSize: 15,
                  ),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
