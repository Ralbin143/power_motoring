import 'package:flutter/material.dart';
import 'package:lottie/lottie.dart';

class VehicleImageSkeleton extends StatelessWidget {
  const VehicleImageSkeleton({super.key});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: MediaQuery.of(context).size.height,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [Lottie.asset('assets/animations/car_loading.json')],
      ),
    );
  }
}
