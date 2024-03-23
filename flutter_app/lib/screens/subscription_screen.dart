import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:http/http.dart' as http;
import 'package:in_app_purchase/in_app_purchase.dart';
import 'package:in_app_purchase_storekit/in_app_purchase_storekit.dart';
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
    });
    // _inAppPurchase.connect();
    super.initState();
  }

// GOOGLE START
  void initiatePurchase() async {
    const Set<String> _kIds = <String>{'01235', '01234', '1233'};
    final ProductDetailsResponse response =
        await InAppPurchase.instance.queryProductDetails(_kIds);

    List<ProductDetails> products = response.productDetails;

    // final ProductDetails productDetails = ;

    final ProductDetailsResponse productDetailResponse =
        await _inAppPurchase.queryProductDetails(response.toSet());

    final PurchaseParam purchaseParam =
        PurchaseParam(productDetails: productDetailResponse);
    InAppPurchase.instance.buyNonConsumable(purchaseParam: purchaseParam);
// if (_isConsumable(productDetails)) {
//   InAppPurchase.instance.buyConsumable(purchaseParam: purchaseParam);
// } else {
//   InAppPurchase.instance.buyNonConsumable(purchaseParam: purchaseParam);
// }
// From here the purchase flow will be handled by the underlying store.
// Updates will be delivered to the `InAppPurchase.instance.purchaseStream`.
    // -------------------------[OLD]---------------------
    // ProductDetailsResponse productDetailsResponse =
    //     await _inAppPurchase.queryProductDetails({'01235'});

    // ProductDetails productDetails = productDetailsResponse.productDetails.first;

    // final PurchaseParam purchaseParam =
    //     PurchaseParam(productDetails: productDetails);
    // _inAppPurchase.buyNonConsumable(purchaseParam: purchaseParam);
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
    print(json[0]['trialUsed']);
  }

  void _handlePaymentSuccess(PaymentSuccessResponse response) {
    BlocProvider.of<SubscriptionBloc>(context).add(CheckSubscriptionEvent());
    Navigator.pop(context);
    loadSubsscriptionData();
    print("Payment Success: ${response.paymentId}");
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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
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
                        ),
                      ),
                      const SizedBox(height: 20),
                      _subscription(),
                      ElevatedButton(
                        onPressed: () {
                          initiatePurchase();
                        },
                        child: Text('Google PAY'),
                      )
                    ],
                  ),
          ),
        ),
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
                                    '${(currentDateValue).toStringAsFixed(0)} day(s)',
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
          : _notSubscribedContainer(),
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
            : SizedBox(
                height: 120,
                child: ListView.builder(
                  scrollDirection: Axis.horizontal,
                  itemCount: subscriptions.length,
                  itemBuilder: (context, index) {
                    return Padding(
                      padding: const EdgeInsets.all(15),
                      child: GestureDetector(
                        onTap: () {
                          openRazorpayPaymentSheet(
                            int.parse(subscriptions[index]
                                    ['subscriptionAmount']) /
                                .98 *
                                100,
                            subscriptions[index]['plan_name'],
                            subscriptions[index]['planValidity'],
                          );
                        },
                        child: Container(
                          padding: const EdgeInsets.all(10),
                          decoration: BoxDecoration(
                            color: activePlan == index
                                ? Colors.black
                                : Colors.amber,
                            borderRadius: const BorderRadius.all(
                              Radius.circular(10),
                            ),
                          ),
                          child: Column(
                            children: [
                              Text(
                                subscriptions[index]!['plan_name'],
                                style: TextStyle(
                                  color: activePlan == index
                                      ? Colors.amber
                                      : Colors.black,
                                  fontWeight: FontWeight.w700,
                                ),
                              ),
                              Wrap(
                                children: [
                                  Text(
                                    subscriptions[index]!['subscriptionAmount']
                                        .toString(),
                                    style: TextStyle(
                                      color: activePlan == index
                                          ? Colors.amber
                                          : Colors.black,
                                      fontSize: 30,
                                      fontWeight: FontWeight.w900,
                                    ),
                                  ),
                                  const Text(
                                    "*",
                                    style: TextStyle(
                                      fontSize: 25,
                                    ),
                                  )
                                ],
                              ),
                              Text(
                                "${subscriptions[index]['planValidity']} Month(s)",
                                style: TextStyle(
                                  color: activePlan == index
                                      ? Colors.amber
                                      : Colors.black,
                                  fontWeight: FontWeight.w700,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    );
                  },
                ),
              ),
        const SizedBox(height: 20),
        Text(
          '* Payment gateway charges extra',
          style: GoogleFonts.poppins(
            textStyle: const TextStyle(
              color: Colors.brown,
              fontSize: 15,
            ),
          ),
        ),
        const SizedBox(height: 10),
        const Text(
          "Does my subscription auto renew",
          textAlign: TextAlign.start,
          style: TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.w600,
          ),
        ),
        const SizedBox(height: 10),
        Text(
          "No! You have to make payment once the subscription expire!",
          style: GoogleFonts.poppins(),
        ),
        const SizedBox(
          height: 20,
        ),
        Text(
          "There is no refund once payment done",
          style: GoogleFonts.poppins(),
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
}
