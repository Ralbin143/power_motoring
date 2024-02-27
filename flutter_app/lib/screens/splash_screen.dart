import 'package:firebase_analytics/firebase_analytics.dart';
import 'package:flutter/material.dart';

import 'home_screen.dart';
import 'terms_and_conditions.dart';

class SplashScreen extends StatelessWidget {
  final bool isFirst;
  final FirebaseAnalytics analytics;
  final FirebaseAnalyticsObserver observer;

  const SplashScreen({
    super.key,
    required this.isFirst,
    required this.analytics,
    required this.observer,
  });

  @override
  Widget build(BuildContext context) {
    Future.delayed(const Duration(seconds: 2), () {
      Navigator.pushReplacement(
        context,
        isFirst
            ? MaterialPageRoute(builder: (context) => const TermsConditions())
            : MaterialPageRoute(builder: (context) => const HomeScreen()),
      );
    });
    return Scaffold(
      body: SafeArea(
        child: Container(
          decoration: const BoxDecoration(
            image: DecorationImage(
              image: AssetImage('assets/images/splash_bg.png'),
              fit: BoxFit.cover,
            ),
          ),
          child: Padding(
            padding: const EdgeInsets.all(15),
            child: Center(
              child: Image.asset('assets/images/logo_white.png'),
            ),
          ),
        ),
      ),
    );
  }
}
