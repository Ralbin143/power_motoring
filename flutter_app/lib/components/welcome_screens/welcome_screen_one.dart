import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:lottie/lottie.dart';

class WelcomeScreenOne extends StatelessWidget {
  const WelcomeScreenOne({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Expanded(
          child: Lottie.asset('assets/animations/car_features.json'),
        ),
        Expanded(
          child: Column(
            children: [
              Text(
                "Search Vehicle Features",
                style: GoogleFonts.poppins(
                  fontSize: 20,
                  fontWeight: FontWeight.w800,
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(20),
                child: Text(
                  "We've just introduced a new feature in the app that allows users to easily search for vehicles based on specific features, making it a breeze to find the perfect vehicle tailored to their preferences and needs.",
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
