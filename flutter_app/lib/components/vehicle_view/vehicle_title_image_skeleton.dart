import 'package:flutter/material.dart';
import 'package:lottie/lottie.dart';
import 'package:shimmer/shimmer.dart';

class VehicleImageSkeleton extends StatelessWidget {
  const VehicleImageSkeleton({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Center(
          child: Shimmer.fromColors(
            baseColor: Colors.grey[300]!, // Color of the skeleton
            highlightColor: Colors.grey[100]!, // Color of the highlight
            child: ListTile(
              leading: SizedBox(
                width: 300,
                child: ClipRRect(
                  child: Image.asset('assets/images/no_image.png'),
                ),
              ),
            ),
          ),
        ),
        const Text('Please wait...'),
        const Text('Loading Vehicle Details...'),
        Lottie.asset('assets/animations/car_loading.json')
      ],
    );
  }
}
