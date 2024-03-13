import 'package:flutter/material.dart';
import 'package:smooth_page_indicator/smooth_page_indicator.dart';

import '../components/welcome_screens/welcome_screen_one.dart';
import '../components/welcome_screens/welcome_screen_three.dart';
import '../components/welcome_screens/welcome_screen_two.dart';

class WelcomeScreen extends StatefulWidget {
  const WelcomeScreen({super.key});

  @override
  State<WelcomeScreen> createState() => _WelcomeScreenState();
}

class _WelcomeScreenState extends State<WelcomeScreen> {
  final PageController _pageController = PageController();
  bool onLastPage = false;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Stack(
          children: [
            PageView(
              onPageChanged: (index) => {
                setState(() {
                  onLastPage = (index == 2);
                })
              },
              controller: _pageController,
              children: const [
                WelcomeScreenOne(),
                WelcomeScreenTwo(),
                WelcomeScreenThree()
              ],
            ),
            Align(
              alignment: Alignment.bottomCenter,
              child: Padding(
                padding: const EdgeInsets.all(50),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    SmoothPageIndicator(
                      controller: _pageController,
                      count: 3,
                      effect: const WormEffect(
                          dotColor: Colors.grey,
                          activeDotColor: Colors.black,
                          dotHeight: 5,
                          dotWidth: 10),
                    ),
                  ],
                ),
              ),
            )
          ],
        ),
      ),
    );
  }
}
