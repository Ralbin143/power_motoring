import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:google_mobile_ads/google_mobile_ads.dart';
import 'package:http/http.dart' as http;
import 'package:lottie/lottie.dart';

import '../adMob/banner_ad.dart';
import '../components/brand/brand_title_view.dart';
import '../const/urls.dart';
import '../data/bloc/subscription_bloc.dart';
import '../state/bloc/image_size_bloc.dart';
import 'vehicle_view_screen.dart';

class BrandScreen extends StatefulWidget {
  final String manufacturerName;
  const BrandScreen({super.key, required this.manufacturerName});

  @override
  State<BrandScreen> createState() => _BrandScreenState();
}

class _BrandScreenState extends State<BrandScreen> {
  List<dynamic> vehicles = [];
  List<dynamic> uniqueVehicleCategories = [];
  bool isLoading = true;
  bool isSubscribed = false;
  String selectedCategory = "All";
  BannerAd? _bannerAd;
  bool adLoading = true;
  InterstitialAd? _interstitialAd;
  final GlobalKey<State> _key = GlobalKey<State>();

  @override
  void initState() {
    BlocProvider.of<SubscriptionBloc>(context).add(CheckSubscriptionEvent());
    loadBannerAd();
    super.initState();
    context.read<ImageSizeBloc>().add(ImageMaxSize());
    fetchVehicles();
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
    super.dispose();
  }

  void _loadInterstitialAd(data) {
    setState(() {
      adLoading = true;
    });
    InterstitialAd.load(
      adUnitId: AdHelper.interstitialAdUnitId,
      request: const AdRequest(),
      adLoadCallback: InterstitialAdLoadCallback(
        onAdLoaded: (ad) {
          ad.fullScreenContentCallback = FullScreenContentCallback(
            onAdDismissedFullScreenContent: (ad) {
              closeAlertDialog();
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => VehicleView(
                    data: data,
                  ),
                ),
              );

              setState(() {
                adLoading = false;
              });
            },
          );

          setState(() {
            _interstitialAd = ad;
          });
          if (_interstitialAd != null) {
            _interstitialAd!.show();
          }
        },
        onAdFailedToLoad: (err) {
          // print('Failed to load an interstitial ad: ${err.message}');
        },
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color.fromARGB(255, 233, 233, 233),
      body: SafeArea(
        child: Column(
          children: [
            Row(
              children: [
                Expanded(
                  flex: 1,
                  child: IconButton(
                    onPressed: () {
                      Navigator.pop(context);
                    },
                    icon: const Icon(Icons.arrow_back),
                  ),
                ),
                Expanded(
                  flex: 8,
                  child: Container(
                    margin: const EdgeInsets.all(10.0),
                    padding: const EdgeInsets.all(10.0),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                    child: TextField(
                      onChanged: searchFilter,
                      decoration: const InputDecoration.collapsed(
                          hintText: 'Search...'),
                    ),
                  ),
                ),
                // Expanded(
                //   flex: 1,
                //   child: IconButton(
                //     onPressed: () {
                //       Navigator.push(
                //         context,
                //         MaterialPageRoute(
                //           builder: (context) => const NotificationScreen(),
                //         ),
                //       );
                //     },
                //     icon: const Icon(Icons.notifications),
                //   ),
                // ),
              ],
            ),
            BrandTitleView(manufacturerName: widget.manufacturerName),
            const SizedBox(
              height: 10,
            ),
            SingleChildScrollView(
              child: SizedBox(
                width: double.infinity,
                height: 50,
                child: ListView.builder(
                    scrollDirection: Axis.horizontal,
                    itemCount: uniqueVehicleCategories.length,
                    itemBuilder: (context, index) {
                      return GestureDetector(
                        onTap: () {
                          fetchFilterByCategory(uniqueVehicleCategories[index]);
                        },
                        child: Container(
                          // width: 80,
                          margin: const EdgeInsets.all(9),
                          padding: const EdgeInsets.symmetric(
                            horizontal: 25,
                            vertical: 5,
                          ),
                          decoration: BoxDecoration(
                              border: Border.all(
                                color: const Color.fromARGB(255, 40, 41, 49),
                              ),
                              borderRadius: BorderRadius.circular(20),
                              color: uniqueVehicleCategories[index] ==
                                      selectedCategory
                                  ? Colors.white
                                  : const Color.fromARGB(255, 40, 41, 49)),
                          child: Text(uniqueVehicleCategories[index],
                              textAlign: TextAlign.center,
                              style: GoogleFonts.poppins(
                                textStyle: TextStyle(
                                  fontSize: 16,
                                  color: uniqueVehicleCategories[index] ==
                                          selectedCategory
                                      ? const Color.fromARGB(255, 40, 41, 49)
                                      : Colors.white,
                                ),
                              )),
                        ),
                      );
                    }),
              ),
            ),
            const SizedBox(
              height: 10,
            ),
            Expanded(
              child: Container(
                width: 500,
                height: 600,
                padding: const EdgeInsets.all(10),
                decoration: const BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.only(
                    topLeft: Radius.circular(30),
                    topRight: Radius.circular(30),
                  ),
                ),
                child: SingleChildScrollView(
                  child: Column(
                    children: [
                      isLoading
                          ? Column(
                              children: [
                                Text(
                                  "Please wait...",
                                  style: GoogleFonts.poppins(
                                    textStyle: const TextStyle(
                                      fontSize: 20,
                                      fontWeight: FontWeight.w600,
                                    ),
                                  ),
                                ),
                                Text(
                                  "Loading vehicle info",
                                  style: GoogleFonts.poppins(
                                    textStyle: const TextStyle(
                                        // fontWeight: FontWeight.bold,
                                        ),
                                  ),
                                ),
                              ],
                            )
                          : Text(
                              selectedCategory,
                              style: const TextStyle(
                                fontSize: 20,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                      Padding(
                        padding: const EdgeInsets.only(top: 30),
                        child: SingleChildScrollView(
                          child: isLoading
                              ? SizedBox(
                                  height: 250,
                                  child: Center(
                                    child: LottieBuilder.asset(
                                      "assets/animations/car_loading.json",
                                      width: double.infinity,
                                    ),
                                  ),
                                )
                              : vehicles.isEmpty
                                  ? Center(
                                      child: Image.asset(
                                          'assets/images/coming_soon.jpg'))
                                  : GridView.builder(
                                      physics:
                                          const NeverScrollableScrollPhysics(),
                                      shrinkWrap: true,
                                      gridDelegate:
                                          const SliverGridDelegateWithFixedCrossAxisCount(
                                              crossAxisCount: 2,
                                              crossAxisSpacing: 20,
                                              mainAxisSpacing: 20),
                                      itemCount: vehicles.length,
                                      itemBuilder: (context, index) {
                                        return GestureDetector(
                                          onTap: () {
                                            !isSubscribed
                                                ? {
                                                    _showAlertDialog(context),
                                                    _loadInterstitialAd(
                                                        vehicles[index]['_id']),
                                                  }
                                                : Navigator.push(
                                                    context,
                                                    MaterialPageRoute(
                                                      builder: (context) =>
                                                          VehicleView(
                                                        data: vehicles[index]
                                                            ['_id'],
                                                      ),
                                                    ),
                                                  );
                                          },
                                          child: Container(
                                            decoration: BoxDecoration(
                                                color: Colors.white,
                                                borderRadius:
                                                    const BorderRadius.all(
                                                  Radius.circular(10),
                                                ),
                                                boxShadow: [
                                                  BoxShadow(
                                                    color: const Color.fromARGB(
                                                            0, 0, 0, 0)
                                                        .withOpacity(1),
                                                    offset: const Offset(0, 0),
                                                    blurRadius: 10,
                                                    spreadRadius: -4,
                                                  )
                                                ]),
                                            child: Column(
                                              children: [
                                                Expanded(
                                                  child: Image.network(
                                                    vehicles[index]
                                                        ['vehicleImage'],
                                                  ),
                                                ),
                                                Container(
                                                  width: double.infinity,
                                                  decoration:
                                                      const BoxDecoration(
                                                          borderRadius:
                                                              BorderRadius.only(
                                                            bottomLeft:
                                                                Radius.circular(
                                                                    10),
                                                            bottomRight:
                                                                Radius.circular(
                                                                    10),
                                                          ),
                                                          color: Color.fromARGB(
                                                              255, 40, 41, 49)),
                                                  child: Padding(
                                                    padding:
                                                        const EdgeInsets.all(5),
                                                    child: Text(
                                                      vehicles[index]
                                                          ['vehicle_name'],
                                                      textAlign:
                                                          TextAlign.center,
                                                      style: const TextStyle(
                                                        fontSize: 16,
                                                        fontWeight:
                                                            FontWeight.w900,
                                                        color: Colors.white,
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                              ],
                                            ),
                                          ),
                                        );
                                      },
                                    ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
            BlocConsumer<SubscriptionBloc, SubscriptionState>(
              listener: (context, state) {
                if (state is SubscriptionStatusState) {
                  state.data == "Inactive"
                      ? setState(() {
                          isSubscribed = false;
                        })
                      : setState(() {
                          isSubscribed = true;
                        });

                  state.data == "Inactive" ? loadBannerAd() : null;
                }
              },
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

  Future<void> _showAlertDialog(BuildContext context) async {
    return showDialog<void>(
      barrierDismissible: false,
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          backgroundColor: Colors.white,
          key: _key,
          content: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              SizedBox(
                width: 200,
                child: Lottie.asset('assets/animations/car_loading.json'),
              ),
            ],
          ),
        );
      },
    );
  }

  void closeAlertDialog() {
    Navigator.of(_key.currentContext!).pop();
  }

  void fetchVehicles() async {
    var url = Uri.http(apiURl, 'api/vehicles/get_manufacturer_vehicle');
    var response = await http.post(
      url,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'manufacturer': widget.manufacturerName}),
    );

    final json = jsonDecode(response.body);

    setState(() {
      vehicles = json['vehicles'];
      uniqueVehicleCategories = json['categories'];
      isLoading = false;
    });
  }

  void fetchFilterByCategory(value) async {
    setState(() {
      selectedCategory = value;
      isLoading = true;
    });
    var url = Uri.http(apiURl, 'api/vehicles/get_manufacturer_vehicle_filter');
    var response = await http.post(
      url,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(
          {'manufacturer': widget.manufacturerName, 'category': value}),
    );

    final json = jsonDecode(response.body);
    setState(() {
      vehicles = json['vehicles'];
      uniqueVehicleCategories = json['categories'];
      isLoading = false;
    });
  }

  void searchFilter(String query) async {
    query = query.toLowerCase();
    var url = Uri.http(apiURl, 'api/vehicles/live_search_vehicle');
    var response = await http.post(
      url,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(
          {'manufacturer': widget.manufacturerName, "searchKey": query}),
    );

    final json = jsonDecode(response.body);

    setState(() {
      vehicles = json['vehicles'];
      uniqueVehicleCategories = json['categories'];
      isLoading = false;
    });
  }
}
