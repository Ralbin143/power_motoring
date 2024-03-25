import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:google_fonts/google_fonts.dart';

import '../../state/bloc/image_size_bloc.dart';
import 'vehicle_colors.dart';
import 'vehicle_spec.dart';
import 'vehicle_variants.dart';

class VehicleDescriptionWidget extends StatefulWidget {
  final List<dynamic> vehicleDescription;
  const VehicleDescriptionWidget({super.key, required this.vehicleDescription});

  @override
  State<VehicleDescriptionWidget> createState() =>
      _VehicleDescriptionWidgetState();
}

class _VehicleDescriptionWidgetState extends State<VehicleDescriptionWidget> {
  int _containerIndex = 0;

  @override
  void initState() {
    super.initState();
    _containerIndex = 0;
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Container(
        width: double.infinity,
        decoration: const BoxDecoration(
          color: Color.fromARGB(255, 40, 41, 49),
          borderRadius: BorderRadius.only(
            topLeft: Radius.circular(30),
            topRight: Radius.circular(30),
          ),
        ),
        child: Column(
          children: [
            SizedBox(
              height: 80,
              child: Padding(
                padding: const EdgeInsets.fromLTRB(30, 20, 30, 0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: [
                        Text(
                          widget.vehicleDescription[0]["vehicle_name"],
                          style: const TextStyle(
                            fontSize: 24,
                            fontWeight: FontWeight.w900,
                            color: Colors.white,
                          ),
                        ),
                      ],
                    ),
                    Column(
                      children: [
                        Text("Vehicle Type",
                            style: GoogleFonts.poppins(color: Colors.white)),
                        Row(
                          children: [
                            Padding(
                              padding: const EdgeInsets.fromLTRB(0, 0, 3, 0),
                              child: ClipRect(
                                child: Image.asset(
                                  'assets/images/vehicle_type.png',
                                  width: 25,
                                  height: 28,
                                ),
                              ),
                            ),
                            Text(
                              widget.vehicleDescription[0]['engineType']
                                  .replaceAll(",", "\n"),
                              style: const TextStyle(
                                color: Colors.white,
                                fontSize: 12,
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
            Container(
              width: double.infinity,
              decoration: const BoxDecoration(
                color: Color.fromARGB(255, 250, 250, 250),
                borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(30),
                  topRight: Radius.circular(30),
                ),
              ),
              child: Padding(
                padding: const EdgeInsets.all(15),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    GestureDetector(
                      onTap: () {
                        context.read<ImageSizeBloc>().add(ImageMaxSize());
                        setState(() {
                          _containerIndex = 0;
                        });
                      },
                      child: Container(
                        decoration: BoxDecoration(
                          color: _containerIndex == 0
                              ? Colors.black
                              : Colors.white,
                          border: Border.all(width: 1),
                          borderRadius: const BorderRadius.all(
                            Radius.circular(10),
                          ),
                        ),
                        child: Padding(
                          padding: const EdgeInsets.all(5),
                          child: Text(
                            "Specifications",
                            textAlign: TextAlign.center,
                            style: TextStyle(
                              color: _containerIndex == 0
                                  ? Colors.white
                                  : Colors.black,
                            ),
                          ),
                        ),
                      ),
                    ),
                    GestureDetector(
                      onTap: () {
                        context.read<ImageSizeBloc>().add(ImageSize());
                        setState(() {
                          _containerIndex = 1;
                        });
                      },
                      child: Container(
                        decoration: BoxDecoration(
                          color: _containerIndex == 1
                              ? Colors.black
                              : Colors.white,
                          border: Border.all(width: 1),
                          borderRadius: const BorderRadius.all(
                            Radius.circular(10),
                          ),
                        ),
                        child: Padding(
                          padding: const EdgeInsets.all(5),
                          child: Text(
                            "Variants",
                            textAlign: TextAlign.center,
                            style: TextStyle(
                              color: _containerIndex == 1
                                  ? Colors.white
                                  : Colors.black,
                            ),
                          ),
                        ),
                      ),
                    ),
                    GestureDetector(
                      onTap: () {
                        context.read<ImageSizeBloc>().add(ImageMaxSize());
                        setState(() {
                          _containerIndex = 2;
                        });
                      },
                      child: Container(
                          width: 100,
                          decoration: BoxDecoration(
                            color: _containerIndex == 2
                                ? Colors.black
                                : Colors.white,
                            border: Border.all(width: 1),
                            borderRadius: const BorderRadius.all(
                              Radius.circular(10),
                            ),
                          ),
                          child: Padding(
                            padding: const EdgeInsets.all(5),
                            child: Text(
                              "Colors",
                              textAlign: TextAlign.center,
                              style: TextStyle(
                                color: _containerIndex == 2
                                    ? Colors.white
                                    : Colors.black,
                              ),
                            ),
                          )),
                    ),
                  ],
                ),
              ),
            ),
            Container(
              width: double.infinity,
              decoration: const BoxDecoration(
                  color: Color.fromARGB(255, 246, 246, 246)),
              child: Padding(
                padding: const EdgeInsets.all(10),
                child: Column(
                  children: [
                    _containerIndex == 0
                        ? VehicleSpec(vehicleData: widget.vehicleDescription)
                        : _containerIndex == 1
                            ? VehicleVariants(
                                vehicleData: widget.vehicleDescription)
                            : VehicleColors(
                                vehicleData: widget.vehicleDescription),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
