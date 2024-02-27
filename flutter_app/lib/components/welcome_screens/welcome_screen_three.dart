import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../../screens/home_screen.dart';

class WelcomeScreenThree extends StatelessWidget {
  const WelcomeScreenThree({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Expanded(
          child: Image.asset('assets/images/adfree.png'),
        ),
        Expanded(
          child: Column(
            children: [
              Text(
                "Ad-Removal",
                style: GoogleFonts.poppins(
                  fontSize: 20,
                  fontWeight: FontWeight.w800,
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(20),
                child: Text(
                  "Enjoy an ad-free experience on our platform and immerse yourself in uninterrupted content without any interruptions or distractions. Your satisfaction is our priority.",
                  textAlign: TextAlign.justify,
                  style: GoogleFonts.poppins(
                    fontSize: 15,
                  ),
                ),
              ),
              ElevatedButton(
                onPressed: () {
                  Navigator.pushReplacement(
                    context,
                    MaterialPageRoute(
                      builder: (context) => const HomeScreen(),
                    ),
                  );
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.black,
                ),
                child: Text(
                  'Get Started',
                  style: GoogleFonts.poppins(
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
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
