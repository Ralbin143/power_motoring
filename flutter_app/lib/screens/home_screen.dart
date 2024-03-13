import 'dart:convert';
import 'dart:io';

import 'package:cached_network_image/cached_network_image.dart';
import 'package:device_info_plus/device_info_plus.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:google_mobile_ads/google_mobile_ads.dart';
import 'package:lottie/lottie.dart';
import 'package:marquee/marquee.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;
import 'package:http/http.dart' as http;
import 'package:url_launcher/url_launcher.dart';

import '../adMob/banner_ad.dart';
import '../const/urls.dart';
import '../data/bloc/subscription_bloc.dart';
import 'BrandScreen.dart';
import 'about_us_screen.dart';
import 'main_auth_screen.dart';
import 'new_privacy_policy.dart';
import 'new_terms_conditions.dart';
import 'pricing_policy.dart';
import 'subscription_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  late IO.Socket socket;
  int a = 1;
  List<dynamic> users = [];
  List<dynamic> manufacturers = [];
  String userName = "";
  String mobileNo = "";
  String email = "";
  final GlobalKey<State> _key = GlobalKey<State>();

  bool isSubscribed = false;
  bool adLoading = true;

  String runningText = "";

  InterstitialAd? _interstitialAd;
  BannerAd? _bannerAd;

  @override
  void initState() {
    BlocProvider.of<SubscriptionBloc>(context).add(CheckSubscriptionEvent());
    loadBannerAd();
    loadRunningText();
    connectToServer(context);
    fetchManufacturers();
    loadUserData();
    super.initState();
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

  void connectToServer(context) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? userIDss = prefs.getString("userID");

    var deviceInfo = DeviceInfoPlugin();
    late String deviceId;
    if (Platform.isIOS) {
      var iosDeviceInfo = await deviceInfo.iosInfo;
      deviceId = iosDeviceInfo.identifierForVendor!;
    } else if (Platform.isAndroid) {
      var androidDeviceInfo = await deviceInfo.androidInfo;
      deviceId = androidDeviceInfo.id;
    } else {
      deviceId = 'null';
    }

    var deviceID = deviceId;

    socket = IO.io('http://api.powermotoring.com/socket', <String, dynamic>{
      'transports': ['websocket'],
      'autoConnect': false,
    });

    // Add a listener for the 'login_status' event
    socket.on('login_status', (data) async {
      if (data['deviceID'] != deviceID && data['userID'] == userIDss) {
        final prefs = await SharedPreferences.getInstance();
        prefs.remove('user');
        prefs.remove('userName');
        prefs.remove('contactNo');
        prefs.remove('email');
        prefs.remove('userID');
        prefs.setBool("subsStatus", false);

        Navigator.pushReplacement(
          context,
          MaterialPageRoute(
            builder: (builder) => const HomeScreen(),
          ),
        );
      }
    });

    socket.connect();
  }

  void sendMessage() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String userID = prefs.getString('userID').toString();
    var deviceInfo = DeviceInfoPlugin();
    String deviceId;
    if (Platform.isIOS) {
      var iosDeviceInfo = await deviceInfo.iosInfo;
      deviceId = iosDeviceInfo.identifierForVendor!;
    } else if (Platform.isAndroid) {
      var androidDeviceInfo = await deviceInfo.androidInfo;
      deviceId = androidDeviceInfo.id;
    } else {
      deviceId = 'Unknown';
    }
    String message = userID;
    String deviceID = deviceId;
    var msgdata = {
      "userID": message,
      "deviceID": deviceID,
    };

    socket.emit('login_status', msgdata);
  }

  void loadUserData() async {
    final prefs = await SharedPreferences.getInstance();

    if (prefs.getString("userName") != null) {
      setState(() {
        userName = prefs.getString("userName")!;
        mobileNo = prefs.getString("contactNo")!;
        email = prefs.getString("email")!;
      });
    } else {
      userName = "";
    }
  }

  void _dismissAlertDialog() {
    Navigator.of(context).pop(); // Close the AlertDialog
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
                  builder: (context) => BrandScreen(
                    manufacturerName: data,
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
  void dispose() {
    _interstitialAd?.dispose();
    super.dispose();
  }

  void loadRunningText() async {
    try {
      var url = Uri.https(apiURl, 'api/running-text/');

      var response = await http.get(
        url,
        headers: {'Content-Type': 'application/json'},
      );

      if (response.statusCode == 200) {
        final json = jsonDecode(response.body);

        setState(() {
          runningText = json[0]['runningText'];
        });
      } else {
        throw Exception('Failed to load vehicle data');
      }
    } catch (error) {
      // Handle the error gracefully, e.g., show an error message to the user
    }
  }

  @override
  Widget build(BuildContext context) {
    // ignore: deprecated_member_use
    return WillPopScope(
      onWillPop: () async {
        return (await showDialog(
              context: context,
              builder: (context) => AlertDialog(
                backgroundColor: Colors.white,
                title: const Text('Confirm Exit'),
                content: const Text('Are you sure you want to exit the app?'),
                actions: <Widget>[
                  TextButton(
                    onPressed: () => Navigator.of(context).pop(false),
                    child: Text(
                      'No',
                      style: GoogleFonts.poppins(
                        textStyle: const TextStyle(
                          color: Colors.black,
                        ),
                      ),
                    ),
                  ),
                  TextButton(
                    onPressed: () {
                      if (Platform.isAndroid) {
                        SystemNavigator.pop();
                      } else if (Platform.isIOS) {
                        exit(0);
                      }
                    },
                    child: Text(
                      'Yes',
                      style: GoogleFonts.poppins(
                        textStyle: const TextStyle(
                          color: Colors.black,
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            )) ??
            false;
      },
      child: Scaffold(
        backgroundColor: const Color.fromARGB(255, 40, 41, 49),
        appBar: AppBar(
          elevation: 0,
          iconTheme: const IconThemeData(color: Colors.white),
          title: Container(
            margin: const EdgeInsets.all(20.0),
            padding: const EdgeInsets.all(10.0),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(10.0),
            ),
            child: const TextField(
              decoration: InputDecoration.collapsed(hintText: 'Search...'),
            ),
          ),
          centerTitle: true,
          backgroundColor: const Color.fromARGB(255, 39, 43, 50),
          titleSpacing: 00.0,
        ),
        drawer: MyDrawer(
          userName: userName,
          mobileNo: mobileNo,
          email: email,
          users: users,
        ),
        body: SafeArea(
          child: Column(
            children: [
              Padding(
                padding: const EdgeInsets.all(30),
                child: ClipRRect(
                  child: Image.asset(
                    'assets/images/logo_white.png',
                  ),
                ),
              ),
              runningText == ""
                  ? const SizedBox()
                  : SizedBox(
                      height: 30,
                      width: double.infinity,
                      child: Marquee(
                        text: runningText.toString(),
                        style: const TextStyle(
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                        ),
                        scrollAxis: Axis.horizontal,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        blankSpace: 30.0,
                        velocity: 100.0,
                        pauseAfterRound: const Duration(seconds: 1),
                        startPadding: 10.0,
                        accelerationDuration: const Duration(seconds: 1),
                        accelerationCurve: Curves.linear,
                        decelerationDuration: const Duration(milliseconds: 300),
                        decelerationCurve: Curves.easeOut,
                      ),
                    ),
              Expanded(
                child: Container(
                  decoration: const BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(30),
                      topRight: Radius.circular(30),
                    ),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.only(top: 30),
                    child: GridView.builder(
                      gridDelegate:
                          const SliverGridDelegateWithFixedCrossAxisCount(
                        crossAxisCount: 2,
                        crossAxisSpacing: 0.0,
                        mainAxisSpacing: 0.0,
                      ),
                      itemCount: manufacturers.length,
                      itemBuilder: (context, index) {
                        return GestureDetector(
                          onTap: () {
                            !isSubscribed
                                ? {
                                    _showAlertDialog(context),
                                    _loadInterstitialAd(manufacturers[index]
                                        ["manufacturerName"]),
                                  }
                                : Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                      builder: (context) => BrandScreen(
                                        manufacturerName: manufacturers[index]
                                            ["manufacturerName"],
                                      ),
                                    ),
                                  );
                          },
                          child: ListTile(
                            title: Container(
                              height: 160,
                              padding: const EdgeInsets.all(10),
                              decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(5),
                                color: Colors.white,
                                boxShadow: [
                                  BoxShadow(
                                    color: Colors.grey
                                        .withOpacity(0.3), // Shadow color
                                    spreadRadius: 1, // Spread radius
                                    blurRadius: 10, // Blur radius
                                    offset: const Offset(
                                        0, 0), // Offset in x and y direction
                                  ),
                                ],
                              ),
                              child: Column(children: [
                                Expanded(
                                  child: ClipRRect(
                                    child: CachedNetworkImage(
                                      imageUrl:
                                          'https://api.powermotoring.com/manufacturers/${manufacturers[index]["manufacturerLogo"]}',
                                      placeholder: (context, url) => SizedBox(
                                        height: 30,
                                        width: 30,
                                        child: Image.asset(
                                            'assets/images/blurred_car_image.png'),
                                      ),
                                      errorWidget: (context, url, error) =>
                                          const Icon(Icons.error),
                                    ),
                                  ),
                                ),
                                Text(manufacturers[index]["manufacturerName"],
                                    style: const TextStyle(
                                      fontSize: 20,
                                      fontWeight: FontWeight.w700,
                                    )),
                              ]),
                            ),
                          ),
                        );
                      },
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

                    // state.data == "Inactive" ? _loadInterstitialAd() : null;
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

  void fetchManufacturers() async {
    var url = Uri.https(apiURl, 'api/manufacturer/all_manufacturers');
    // 'app-server.powermotoring.com', 'api/manufacturer/all_manufacturers');
    var response =
        await http.post(url, body: {'name': 'doodle', 'color': 'blue'});

    final json = jsonDecode(response.body);

    setState(() {
      manufacturers = json['data'];
    });
  }
}

// ignore: must_be_immutable
class MyDrawer extends StatefulWidget {
  List<dynamic> users;
  String userName;
  String mobileNo;
  String email;
  MyDrawer(
      {super.key,
      required this.users,
      required this.userName,
      required this.mobileNo,
      required this.email});

  @override
  State<MyDrawer> createState() => _MyDrawerState();
}

class _MyDrawerState extends State<MyDrawer> {
  String? proPic = "";
  @override
  void initState() {
    loadProPic();
    super.initState();
  }

  void loadProPic() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    setState(() {
      proPic = prefs.getString("displayImage") ?? "";
    });
  }

  @override
  void dispose() {
    loadProPic();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: <Widget>[
          DrawerHeader(
            decoration: const BoxDecoration(
              color: Color.fromARGB(255, 40, 41, 49),
            ),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                proPic!.isNotEmpty
                    ? Image.network(
                        proPic!,
                        width: 60,
                        height: 60,
                      )
                    : const SizedBox(),
                Text(
                  widget.userName,
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 24,
                  ),
                ),
                Text(
                  widget.mobileNo,
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 18,
                  ),
                ),
                Text(
                  widget.email,
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 14,
                  ),
                ),
              ],
            ),
          ),
          widget.userName.isEmpty
              ? ListTile(
                  title: const Row(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Icon(
                        Icons.person,
                        size: 24.0,
                      ),
                      SizedBox(width: 10),
                      Text(
                        'Login',
                      ),
                    ],
                  ),
                  onTap: () {
                    Navigator.pushReplacement(
                      context,
                      MaterialPageRoute(
                        builder: (context) => const MainAuthScreen(),
                      ),
                    );
                  },
                )
              : const SizedBox(),
          widget.userName.isNotEmpty
              ? ListTile(
                  title: const Row(children: [
                    Icon(
                      Icons.payment,
                      size: 24.0,
                    ),
                    SizedBox(width: 10),
                    Text('Subscription')
                  ]),
                  onTap: () {
                    Navigator.pop(context);
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => const SubscriptionScreen(),
                      ),
                    );
                  },
                )
              : const SizedBox(),
          ListTile(
            title: const Row(children: [
              Icon(
                Icons.privacy_tip,
                size: 24.0,
              ),
              SizedBox(width: 10),
              Text('Privacy Policy')
            ]),
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (builder) => const NewPrivacyPolicy(),
                ),
              );
            },
          ),
          ListTile(
            title: const Row(children: [
              Icon(
                Icons.privacy_tip,
                size: 24.0,
              ),
              SizedBox(width: 10),
              Text('Pricing Policy')
            ]),
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (builder) => const PricingPolicyScreen(),
                ),
              );
            },
          ),
          ListTile(
            title: const Row(children: [
              Icon(Icons.privacy_tip, size: 24.0),
              SizedBox(width: 10),
              Text('Terms & Conditions')
            ]),
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (builder) => const NewTermsAndConditions(),
                ),
              );
            },
          ),
          ListTile(
            title: const Row(
              children: [
                Icon(
                  Icons.feedback,
                  size: 24.0,
                ),
                SizedBox(width: 10),
                Text('About us')
              ],
            ),
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (builder) => const AboutUsScreen(),
                ),
              );
            },
          ),
          ListTile(
            title: Row(
              children: [
                Image.asset(
                  "assets/images/whatsapp-icon-509x512-c9csi2fs.png",
                  height: 24,
                ),
                const SizedBox(width: 10),
                const Text('Send Feedbacks')
              ],
            ),
            onTap: () async {
              String phone = "+918075441550";
              String message = "Hello,";
              String url = "https://wa.me/$phone?text=${Uri.parse(message)}";
              // ignore: deprecated_member_use
              if (await canLaunch(url)) {
                // ignore: deprecated_member_use
                await launch(url);
              } else {
                throw 'Could not launch $url';
              }
            },
          ),
          widget.userName.isNotEmpty
              ? ListTile(
                  title: const Row(
                    children: [
                      Icon(
                        Icons.logout,
                        size: 24.0,
                      ),
                      SizedBox(width: 10),
                      Text('Logout')
                    ],
                  ),
                  onTap: () async {
                    await showDialog(
                      context: context,
                      builder: (context) => AlertDialog(
                        title: const Text("Logout?"),
                        content: const Text("Are you sure, want to logout?"),
                        actions: <Widget>[
                          TextButton(
                            onPressed: () {
                              Navigator.of(context).pop(false);
                            },
                            child: const Text("No"),
                          ),
                          TextButton(
                            onPressed: () {
                              logoutAction(context);
                            },
                            child: const Text("Yes"),
                          ),
                        ],
                      ),
                    );
                  },
                )
              : const SizedBox(),
        ],
      ),
    );
  }

  void logoutAction(context) async {
    final prefs = await SharedPreferences.getInstance();
    prefs.remove('user');
    prefs.remove('userName');
    prefs.remove('contactNo');
    prefs.remove('email');
    prefs.remove('userID');
    prefs.remove('displayImage');
    prefs.setBool("subsStatus", false);

    Navigator.pushReplacement(
      context,
      MaterialPageRoute(
        builder: (builder) => const HomeScreen(),
      ),
    );
  }
}
