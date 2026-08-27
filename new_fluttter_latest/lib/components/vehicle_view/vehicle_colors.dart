import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';

import '../../screens/image_fullscreen.dart';

class VehicleColors extends StatefulWidget {
  final List<dynamic> vehicleData;
  const VehicleColors({super.key, required this.vehicleData});

  @override
  State<VehicleColors> createState() => _VehicleColorsState();
}

class _VehicleColorsState extends State<VehicleColors> {
  @override
  Widget build(BuildContext context) {
    return SizedBox(
      child: GridView.builder(
        gridDelegate:
            const SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 3),
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        itemCount: widget.vehicleData[0]['images'].length,
        itemBuilder: (BuildContext context, int index) {
          return ListTile(
            title: GestureDetector(
              onTap: () {
                showDialog(
                    context: context,
                    builder: (BuildContext context) {
                      return ImageFullScreen(
                          image: widget.vehicleData[0]['images'][index]
                              ['imagePreview'],
                          title: widget.vehicleData[0]['images'][index]
                              ['name']);
                    });
              },
              child: Column(
                children: [
                  CachedNetworkImage(
                    imageUrl: widget.vehicleData[0]['images'][index]
                        ['imagePreview'],
                    placeholder: (context, url) => SizedBox(
                      height: 30,
                      width: 30,
                      child: Image.asset('assets/images/blurred_car_image.png'),
                    ),
                    errorWidget: (context, url, error) =>
                        const Icon(Icons.error),
                  ),
                  const SizedBox(
                    height: 15,
                  ),
                  Text(
                    widget.vehicleData[0]['images'][index]['name'],
                    textAlign: TextAlign.center,
                    style: const TextStyle(fontSize: 13),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
