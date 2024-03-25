import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:http/http.dart' as http;

import '../../const/urls.dart';
import '../../state/bloc/image_size_bloc.dart';

class VehicleTitleImage extends StatefulWidget {
  final List<dynamic> imageData;
  const VehicleTitleImage({super.key, required this.imageData});

  @override
  State<VehicleTitleImage> createState() => _VehicleTitleImageState();
}

class _VehicleTitleImageState extends State<VehicleTitleImage> {
  List<dynamic> vehicle = [];
  @override
  void initState() {
    super.initState();
    fetchSingleVehicle(widget.imageData);
  }

  @override
  Widget build(BuildContext context) {
    return widget.imageData.isNotEmpty
        ? BlocBuilder<ImageSizeBloc, ImageSizeState>(
            builder: (context, state) {
              return Image.network(
                widget.imageData[0]['vehicleImage'],
                height: state.size,
              );
            },
          )
        : const CircularProgressIndicator();
  }

  void fetchSingleVehicle(data) async {
    try {
      var url = Uri.http(apiURl, 'api/vehicles/get_single_vehicle');

      var response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'id': data}),
      );

      if (response.statusCode == 200) {
        final json = jsonDecode(response.body);

        setState(() {
          vehicle = json;
        });
      } else {
        throw Exception('Failed to load vehicle data');
      }
    } catch (error) {}
  }
}
