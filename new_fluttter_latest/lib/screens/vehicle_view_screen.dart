import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:google_mobile_ads/google_mobile_ads.dart';
import 'package:http/http.dart' as http;

import '../adMob/banner_ad.dart';
import '../components/vehicle_view/title_image.dart';
import '../components/vehicle_view/vehicle_description.dart';
import '../components/vehicle_view/vehicle_title_image_skeleton.dart';
import '../const/urls.dart';
import '../data/bloc/subscription_bloc.dart';

class VehicleView extends StatefulWidget {
  final String data;
  const VehicleView({super.key, required this.data});

  @override
  State<VehicleView> createState() => _VehicleViewState();
}

class _VehicleViewState extends State<VehicleView> {
  List<dynamic> vehicle = [];
  final ScrollController _controller = ScrollController();
  InterstitialAd? _interstitialAd;
  BannerAd? _bannerAd;

  @override
  void initState() {
    BlocProvider.of<SubscriptionBloc>(context).add(CheckSubscriptionEvent());
    super.initState();
    fetchSingleVehicle(widget.data);
    loadBannerAd();
  }

  void loadBannerAd() {
    BannerAd(
      adUnitId: AdHelper.bannerAdUnitId,
      request: const AdRequest(),
      size: AdSize.banner,
      listener: BannerAdListener(
        onAdLoaded: (ad) {
          setState(() {
            _bannerAd = ad as BannerAd;
          });
        },
        onAdFailedToLoad: (ad, err) {
          ad.dispose();
        },
      ),
    ).load();
  }

  @override
  void dispose() {
    _interstitialAd?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                IconButton(
                  onPressed: () {
                    Navigator.pop(context);
                  },
                  icon: const Icon(Icons.arrow_back),
                ),
              ],
            ),
            Expanded(
              child: SizedBox(
                height: double.infinity,
                width: double.infinity,
                child: NotificationListener<ScrollEndNotification>(
                  onNotification: (notification) {
                    if (notification is ScrollStartNotification) {
                    } else if (notification is ScrollEndNotification) {
                      // This callback is called when the scroll view reaches the end.
                    }
                    return false;
                  },
                  child: SingleChildScrollView(
                    controller: _controller,
                    child: Column(
                      children: [
                        VehicleTitleImage(
                          imageData: vehicle,
                        ),
                        vehicle.isNotEmpty
                            ? VehicleDescriptionWidget(
                                vehicleDescription: vehicle)
                            : const VehicleImageSkeleton()
                      ],
                    ),
                  ),
                ),
              ),
            ),
            BlocConsumer<SubscriptionBloc, SubscriptionState>(
              listener: (context, state) {},
              builder: (context, state) {
                if (state is SubscriptionStatusState) {
                  return Container(
                    color: Colors.white,
                    width: double.infinity,
                    child: state.data == "Inactive"
                        ? SizedBox(
                            child: _bannerAd != null
                                ? SizedBox(
                                    height: _bannerAd!.size.height.toDouble(),
                                    width: _bannerAd!.size.width.toDouble(),
                                    child: AdWidget(
                                      ad: _bannerAd!,
                                    ),
                                  )
                                : null,
                          )
                        : null,
                  );
                }

                return const Text('', style: TextStyle(color: Colors.white));
              },
            ),
          ],
        ),
      ),
    );
  }

  void fetchSingleVehicle(data) async {
    try {
      var url = Uri.https(apiURl, 'api/vehicles/get_single_vehicle');

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
    } catch (error) {
      // Handle the error gracefully, e.g., show an error message to the user
    }
  }
}
