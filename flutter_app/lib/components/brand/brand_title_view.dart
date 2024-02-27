import 'package:flutter/material.dart';

class BrandTitleView extends StatefulWidget {
  final String manufacturerName;
  const BrandTitleView({super.key, required this.manufacturerName});

  @override
  State<BrandTitleView> createState() => _BrandTitleViewState();
}

class _BrandTitleViewState extends State<BrandTitleView> {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 20),
      child: Container(
        width: double.infinity,
        margin: const EdgeInsets.only(left: 10, right: 10),
        height: 117,
        padding: const EdgeInsets.all(25),
        decoration: BoxDecoration(
          image: const DecorationImage(
            image: AssetImage('assets/images/camera.png'),
            fit: BoxFit.cover,
          ),
          borderRadius: BorderRadius.circular(10),
          color: const Color(0xff282931),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              widget.manufacturerName,
              style: const TextStyle(
                color: Colors.white,
                fontSize: 25,
                fontWeight: FontWeight.w900,
              ),
            ),
            const SizedBox(
              height: 10,
            ),
            Text(
              "Discover the products of ${widget.manufacturerName}",
              style: const TextStyle(
                color: Colors.white,
                fontSize: 14,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
