import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:http/http.dart' as http;
import 'package:in_app_purchase/in_app_purchase.dart';
import 'package:power_motoring/data/repository/subscription_repository.dart';
import 'package:pretty_gauge/pretty_gauge.dart';
import 'package:razorpay_flutter/razorpay_flutter.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:syncfusion_flutter_gauges/gauges.dart';

import '../const/urls.dart';
import '../data/bloc/subscription_bloc.dart';
import 'home_screen.dart';

class SubscriptionScreen extends StatefulWidget {
  const SubscriptionScreen({super.key});

  @override
  State<SubscriptionScreen> createState() => _SubscriptionScreenState();
}

class _SubscriptionScreenState extends State<SubscriptionScreen> {
  final GlobalKey<State> _key = GlobalKey<State>();
  List<dynamic> subscriptions = [];
  late Razorpay _razorpay;
  int activePlan = -1;
  String planName = "";
  String planValidity = "";
  bool isSubscribed = true;
  bool isLoading = true;

  double maximumValue = 100;
  double currentDateValue = 10;
  String expiryDate = '';
  int selectedAmount = 0;

  bool trialUsed = false;

  String selectedPlanName = "";
  String selectedPlan = "";

  // GOOGLE PAY A
  final InAppPurchase _inAppPurchase = InAppPurchase.instance;

  @override
  void initState() {
    _razorpay = Razorpay();
    _razorpay.on(Razorpay.EVENT_PAYMENT_SUCCESS, _handlePaymentSuccess);
    _razorpay.on(Razorpay.EVENT_PAYMENT_ERROR, _handlePaymentError);
    _razorpay.on(Razorpay.EVENT_EXTERNAL_WALLET, _handleExternalWallet);
    fetchSubscriptions();
    checkSubscriptionStatus();
    loadSubsscriptionData();
    isTrialUsed();
    loadSubsscriptionData();

    _inAppPurchase.purchaseStream.listen((purchaseDetailsList) {
      print('Item purchased: $purchaseDetailsList');
      _listenToPurchaseUpdated(purchaseDetailsList);
    });
    // _inAppPurchase.connect();
    super.initState();
  }

  void _listenToPurchaseUpdated(List<PurchaseDetails> purchaseDetailsList) {
    purchaseDetailsList.forEach((PurchaseDetails purchaseDetails) async {
      if (purchaseDetails.status == PurchaseStatus.purchased) {
        final bool valid = await _verifyPurchase(purchaseDetails);
        if (valid) {
          unawaited(deliverProduct(purchaseDetails));
        } else {
          // _handleInvalidPurchase(purchaseDetails);
          return;
        }
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Purchase Successful!'),
          ),
        );
      } else {}
    });
  }

  Future<void> deliverProduct(PurchaseDetails purchaseDetails) async {
    addSubscription();
  }

  Future<bool> _verifyPurchase(PurchaseDetails purchaseDetails) {
    return Future<bool>.value(true);
  }

// GOOGLE START
  void initiatePurchase(value) async {
    ProductDetailsResponse productDetailsResponse =
        await _inAppPurchase.queryProductDetails({value});

    ProductDetails productDetails = productDetailsResponse.productDetails.first;

    final PurchaseParam purchaseParam =
        PurchaseParam(productDetails: productDetails);
    _inAppPurchase.buyNonConsumable(purchaseParam: purchaseParam);
  }
// GOOGLE END

  void isTrialUsed() async {
    final prefs = await SharedPreferences.getInstance();
    String? id = prefs.getString("userID");
    var url = Uri.https(apiURl, '/api/subscription/is-trial-used');
    var data = {
      "cust_id": id,
    };
    var response = await http.post(
      url,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(data),
    );
    final json = jsonDecode(response.body);

    trialUsed = json[0]['trialUsed'];
  }

  void _handlePaymentSuccess(PaymentSuccessResponse response) {
    BlocProvider.of<SubscriptionBloc>(context).add(CheckSubscriptionEvent());
    Navigator.pop(context);
    loadSubsscriptionData();
  }

  void _handlePaymentError(PaymentFailureResponse response) {
    print("Payment Error: ${response.code}, ${response.message}");
  }

  void _handleExternalWallet(ExternalWalletResponse response) {
    print("External Wallet: ${response.walletName}");
  }

  void loadSubsscriptionData() async {
    var url = Uri.https(apiURl, '/api/user/check-subscription-data');

    final prefs = await SharedPreferences.getInstance();

    var data = {
      "custID": prefs.getString("userID"),
    };
    var response = await http.post(
      url,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(data),
    );

    final json = jsonDecode(response.body);

    setState(() {
      maximumValue = json['maxDays'].toDouble();
      currentDateValue = json['daysSinceLastPayment'].toDouble();
      expiryDate = json['expiryDate'].toString();
    });
  }

  var url = Uri.https(apiURl, '/api/user/check-subscription-status');
  void checkSubscriptionStatus() async {
    final prefs = await SharedPreferences.getInstance();

    var data = {
      "custID": prefs.getString("userID"),
    };
    var response = await http.post(
      url,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(data),
    );

    final json = jsonDecode(response.body);

    if (json == "Live") {
      prefs.setBool("subsStatus", true);
      setState(() {
        isSubscribed = true;
      });
    } else {
      prefs.setBool("subsStatus", false);
      setState(() {
        isSubscribed = false;
      });
    }
  }

  var payUrl = Uri.https(apiURl, '/api/payment/play-billing-subscription');

  void addSubscription() async {
    final prefs = await SharedPreferences.getInstance();
    var data = {
      "custId": prefs.getString("userID"),
      "planName": selectedPlanName,
      "planValidity": selectedPlan
    };

    var response = await http.post(
      payUrl,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(data),
    );
    final json = jsonDecode(response.body);

    if (json == "Live") {
      prefs.setBool("subsStatus", true);
      setState(() {
        isSubscribed = true;
      });
    } else {
      prefs.setBool("subsStatus", false);
      setState(() {
        isSubscribed = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: SingleChildScrollView(
            child: isLoading
                ? SizedBox(
                    height: MediaQuery.of(context).size.height,
                    width: MediaQuery.of(context).size.width,
                    child: const Center(
                        child: CircularProgressIndicator.adaptive()),
                  )
                : Column(
                    children: [
                      Row(
                        children: [
                          IconButton(
                            onPressed: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (builder) => const HomeScreen(),
                                ),
                              );
                            },
                            icon: const Icon(Icons.arrow_back),
                          ),
                        ],
                      ),
                      const SizedBox(height: 20),
                      ClipRRect(
                        child: Image.asset(
                          'assets/images/logo.png',
                          width: 100,
                        ),
                      ),
                      const SizedBox(height: 20),
                      _subscription(),
                      isSubscribed ? const SizedBox() : _launchOfferContainer()
                    ],
                  ),
          ),
        ),
      ),
    );
  }

  Column _launchOfferContainer() {
    return Column(
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Image.asset(
              'assets/images/subsciption_image.png',
              width: 200,
            ),
          ],
        ),
        Text(
          "This offer only valid till August 31st Click the below button to enable Intelligent Search and Ad-free experience",
          textAlign: TextAlign.center,
          style: GoogleFonts.abel(
            textStyle: const TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 20,
              color: Colors.grey,
            ),
          ),
        ),
        const SizedBox(height: 20),
        ElevatedButton(
          onPressed: () {
            preLaunchOffer();
          },
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.black,
          ),
          child: Text(
            "Get Launch Offer!",
            style: GoogleFonts.poppins(
              textStyle: TextStyle(
                color: Colors.white,
              ),
            ),
          ),
        )
      ],
    );
  }

  SizedBox _playSubscription() {
    return SizedBox(
      child: Column(
        children: [
          const SizedBox(height: 60),
          Container(
            width: double.infinity,
            decoration: BoxDecoration(
              color: Colors.grey[200],
            ),
            child: Padding(
              padding: const EdgeInsets.all(10.0),
              child: Text(
                'Pay through Google Play Store',
                style: GoogleFonts.poppins(
                  textStyle: const TextStyle(
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),
          ),
          Row(
            children: [
              Expanded(
                child: Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: GestureDetector(
                    onTap: () {
                      initiatePurchase("01235");
                      setState(() {
                        selectedPlanName = "Silver";
                        selectedPlan = "1";
                      });
                    },
                    child: Container(
                      decoration: const BoxDecoration(
                        color: Colors.amber,
                        borderRadius: BorderRadius.all(
                          Radius.circular(10),
                        ),
                      ),
                      child: Padding(
                        padding: const EdgeInsets.all(10.0),
                        child: Column(
                          children: [
                            Text(
                              'Silver',
                              style: GoogleFonts.poppins(
                                textStyle: const TextStyle(
                                  fontWeight: FontWeight.normal,
                                ),
                              ),
                            ),
                            Text(
                              '60',
                              style: GoogleFonts.poppins(
                                textStyle: const TextStyle(
                                  fontWeight: FontWeight.bold,
                                  fontSize: 20,
                                ),
                              ),
                            ),
                            Text(
                              '30 Days',
                              style: GoogleFonts.poppins(
                                textStyle: const TextStyle(),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
              ),
              Expanded(
                child: Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: GestureDetector(
                    onTap: () {
                      initiatePurchase("01234");
                      setState(() {
                        selectedPlanName = "Gold";
                        selectedPlan = "6";
                      });
                    },
                    child: Container(
                      decoration: const BoxDecoration(
                        color: Colors.amber,
                        borderRadius: BorderRadius.all(
                          Radius.circular(10),
                        ),
                      ),
                      child: Padding(
                        padding: const EdgeInsets.all(10.0),
                        child: Column(
                          children: [
                            Text(
                              'Gold',
                              style: GoogleFonts.poppins(
                                textStyle: const TextStyle(
                                  fontWeight: FontWeight.normal,
                                ),
                              ),
                            ),
                            Text(
                              '360',
                              style: GoogleFonts.poppins(
                                textStyle: const TextStyle(
                                  fontWeight: FontWeight.bold,
                                  fontSize: 20,
                                ),
                              ),
                            ),
                            Text(
                              '180 Days',
                              style: GoogleFonts.poppins(
                                textStyle: const TextStyle(),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
              ),
              Expanded(
                child: Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: GestureDetector(
                    onTap: () {
                      initiatePurchase("1233");
                      setState(() {
                        selectedPlanName = "Platinum";
                        selectedPlan = "12";
                      });
                    },
                    child: Container(
                      decoration: const BoxDecoration(
                        color: Colors.amber,
                        borderRadius: BorderRadius.all(
                          Radius.circular(10),
                        ),
                      ),
                      child: Padding(
                        padding: const EdgeInsets.all(10.0),
                        child: Column(
                          children: [
                            Text(
                              'Platinum',
                              style: GoogleFonts.poppins(
                                textStyle: const TextStyle(
                                  fontWeight: FontWeight.normal,
                                ),
                              ),
                            ),
                            Text(
                              '600',
                              style: GoogleFonts.poppins(
                                textStyle: const TextStyle(
                                  fontWeight: FontWeight.bold,
                                  fontSize: 20,
                                ),
                              ),
                            ),
                            Text(
                              '360 Days',
                              style: GoogleFonts.poppins(
                                textStyle: const TextStyle(),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ],
          )
        ],
      ),
    );
  }

  SizedBox _subscription() {
    return SizedBox(
      child: isSubscribed
          ? Column(
              children: [
                maximumValue == 7
                    ? PrettyGauge(
                        gaugeSize: 150,
                        minValue: 0.0,
                        maxValue: maximumValue,
                        segments: [
                          GaugeSegment('Low', 2, Colors.red),
                          GaugeSegment('Medium', 1, Colors.orange),
                          GaugeSegment('High', 4, Colors.green),
                        ],
                        currentValue: currentDateValue,
                        displayWidget: Text(
                          'Subscription',
                          style: GoogleFonts.poppins(
                            textStyle: const TextStyle(),
                          ),
                        ),
                      )
                    : SizedBox(
                        width: 200,
                        height: 200,
                        child: SfRadialGauge(axes: <RadialAxis>[
                          RadialAxis(
                            minimum: 0,
                            maximum: maximumValue,
                            ranges: <GaugeRange>[
                              GaugeRange(
                                  startValue: maximumValue * .3,
                                  endValue: maximumValue,
                                  color: Colors.green,
                                  startWidth: 10,
                                  endWidth: 10),
                              GaugeRange(
                                  startValue: maximumValue * .15,
                                  endValue: maximumValue * .3,
                                  color: Colors.orange,
                                  startWidth: 10,
                                  endWidth: 10),
                              GaugeRange(
                                  startValue: 0,
                                  endValue: maximumValue * .15,
                                  color: Colors.red,
                                  startWidth: 10,
                                  endWidth: 10)
                            ],
                            annotations: <GaugeAnnotation>[
                              GaugeAnnotation(
                                  widget: Text(
                                    '${(currentDateValue).toStringAsFixed(0)} days',
                                    style: const TextStyle(
                                        fontSize: 25,
                                        fontWeight: FontWeight.bold),
                                  ),
                                  angle: 90,
                                  positionFactor: 0.5)
                            ],
                            pointers: <GaugePointer>[
                              NeedlePointer(
                                value: currentDateValue,
                                animationType: AnimationType.easeInCirc,
                              )
                            ],
                          )
                        ]),
                      ),
                const SizedBox(height: 20),
                Text(
                  'Active Subscription',
                  textAlign: TextAlign.justify,
                  style: GoogleFonts.poppins(
                    textStyle: const TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 20,
                    ),
                  ),
                ),
                const SizedBox(height: 10),
                Text(
                  'Your subscription is currently active, allowing you to enjoy uninterrupted access to our premium features and services without ads.',
                  textAlign: TextAlign.justify,
                  style: GoogleFonts.poppins(
                    textStyle: const TextStyle(),
                  ),
                ),
                const SizedBox(
                  height: 20,
                ),
                Text(
                  'Your plan will expire on $expiryDate',
                  style: GoogleFonts.poppins(
                    textStyle: const TextStyle(
                      color: Colors.red,
                      fontWeight: FontWeight.bold,
                      fontSize: 15,
                    ),
                  ),
                )
              ],
            )
          : Column(
              children: [
                // _notSubscribedContainer(),
              ],
            ),
    );
  }

  Column _notSubscribedContainer() {
    return Column(
      children: [
        const Center(
          child: Text(
            "Upgrade to Premium for an Ad free experience",
            style: TextStyle(
              fontSize: 25,
              fontWeight: FontWeight.w700,
            ),
            textAlign: TextAlign.center,
          ),
        ),
        const SizedBox(height: 20),
        trialUsed
            ? const SizedBox()
            : ElevatedButton(
                onPressed: () {
                  addTrial(context);
                },
                child: Text(
                  'Try 7 Days Trial',
                  style: GoogleFonts.poppins(),
                ),
              ),
        subscriptions.isEmpty
            ? const CircularProgressIndicator.adaptive()
            : Column(
                children: [
                  // const SizedBox(height: 30),
                  // Container(
                  //   width: double.infinity,
                  //   decoration: BoxDecoration(
                  //     color: Colors.grey[200],
                  //   ),
                  //   child: Padding(
                  //     padding: const EdgeInsets.all(10.0),
                  //     child: Text(
                  //       'Pay through UPI,Card, Netbanking etc',
                  //       style: GoogleFonts.poppins(
                  //         textStyle: const TextStyle(
                  //           fontWeight: FontWeight.bold,
                  //         ),
                  //       ),
                  //     ),
                  //   ),
                  // ),
                  // const SizedBox(height: 10),
                  // SizedBox(
                  //   height: 100,
                  //   child: ListView.separated(
                  //     scrollDirection: Axis.horizontal,
                  //     itemCount: subscriptions.length,
                  //     separatorBuilder: (context, index) =>
                  //         const SizedBox(width: 15),
                  //     itemBuilder: (context, index) {
                  //       return GestureDetector(
                  //         onTap: () {
                  //           openRazorpayPaymentSheet(
                  //             int.parse(subscriptions[index]
                  //                     ['subscriptionAmount']) *
                  //                 100,
                  //             subscriptions[index]['plan_name'],
                  //             subscriptions[index]['planValidity'],
                  //           );
                  //         },
                  //         child: Container(
                  //           width: 100,
                  //           padding: const EdgeInsets.all(10),
                  //           decoration: BoxDecoration(
                  //             color: activePlan == index
                  //                 ? Colors.white
                  //                 : Colors.green[600],
                  //             borderRadius: const BorderRadius.all(
                  //               Radius.circular(10),
                  //             ),
                  //           ),
                  //           child: Column(
                  //             children: [
                  //               Expanded(
                  //                 child: Text(
                  //                   subscriptions[index]!['plan_name'],
                  //                   style: TextStyle(
                  //                     color: activePlan == index
                  //                         ? Colors.amber
                  //                         : Colors.white,
                  //                   ),
                  //                 ),
                  //               ),
                  //               Expanded(
                  //                 child: Text(
                  //                   subscriptions[index]!['subscriptionAmount']
                  //                       .toString(),
                  //                   style: TextStyle(
                  //                     color: activePlan == index
                  //                         ? Colors.amber
                  //                         : Colors.white,
                  //                     fontWeight: FontWeight.bold,
                  //                     fontSize: 20,
                  //                   ),
                  //                 ),
                  //               ),
                  //               Expanded(
                  //                 child: Text(
                  //                   "${subscriptions[index]['planValidity']} Days",
                  //                   style: TextStyle(
                  //                     color: activePlan == index
                  //                         ? Colors.amber
                  //                         : Colors.white,
                  //                   ),
                  //                 ),
                  //               ),
                  //             ],
                  //           ),
                  //         ),
                  //       );
                  //     },
                  //   ),
                  // ),
                  const SizedBox(height: 20),
                  _playSubscription(),
                  const SizedBox(height: 10),
                ],
              ),
      ],
    );
  }

  void fetchSubscriptions() async {
    setState(() {
      isLoading = true;
    });
    try {
      var url = Uri.https(apiURl, 'api/subscription/subscription-list');
      var response = await http.get(
        url,
        headers: {'Content-Type': 'application/json'},
      );

      if (response.statusCode == 200) {
        final json = jsonDecode(response.body);

        final List<dynamic> planList = json;

        setState(() {
          subscriptions = planList;
          isLoading = false;
        });
      } else {}
    } catch (error) {
      print('Error fetching subscriptions: $error');
    }
  }

  Future<void> _showAlertDialog(BuildContext context) async {
    return showDialog<void>(
      barrierDismissible: false,
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          backgroundColor: Colors.transparent,
          key: _key,
          content: const Row(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              SizedBox(
                width: 100,
                height: 100,
                child: CircularProgressIndicator.adaptive(
                  strokeWidth: 5,
                  backgroundColor: Colors.white70,
                  strokeCap: StrokeCap.butt,
                ),
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

  void addTrial(context) async {
    try {
      final prefs = await SharedPreferences.getInstance();

      var url = Uri.https(apiURl, '/api/subscription/new-subscription');
      var data = {
        "paymentID": 'trial',
        "custID": prefs.getString('userID'),
        "amount": 0,
        "customerName": prefs.getString('userName'),
        "customerEmail": prefs.getString('email'),
        "stripeCustID": prefs.getString('stripeCustID'),
        "cust_id": prefs.getString("userID"),
        "plan_name": 'trial',
        "planValidity": 0,
        "status": "Active"
      };

      var response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode(data),
      );
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Trial activated successfully!'),
        ),
      );

      Navigator.pushReplacement(
        context,
        MaterialPageRoute(
          builder: (builder) => const HomeScreen(),
        ),
      );
    } catch (e) {
      rethrow;
    }
  }

  void openRazorpayPaymentSheet(
    amount,
    planName,
    validity,
  ) async {
    int finalAmount = amount.toInt();

    final prefs = await SharedPreferences.getInstance();
    String? email = prefs.getString("email");
    String? phone = prefs.getString("contactNo");
    String? userName = prefs.getString("userName");
    String? custID = prefs.getString("userID");
    var options = {
      'key': razorpayKey,
      'amount': finalAmount,
      'currency': 'INR',
      'name': 'Power Motoring',
      'description': 'Payment for a service/item',
      'customer': {
        'name': userName,
        'email': email,
        'contact': phone ?? "",
      },
      'notes': {
        "planName": planName,
        "planValidity": validity,
        "custId": custID,
      },
      'prefill': {
        'contact': phone ?? "",
        'email': email,
      },
    };

    try {
      _razorpay.open(options);
    } catch (e) {
      debugPrint('Error: $e');
    }
  }

  void preLaunchOffer() async {
    final prefs = await SharedPreferences.getInstance();
    String custId = prefs.getString('uid').toString();

    print(custId);

    final response = await SubscriptionRepository().enableLaunchOffer(custId);

    BlocProvider.of<SubscriptionBloc>(context).add(CheckSubscriptionEvent());
    Navigator.pop(context);
  }
}
