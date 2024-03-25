import 'dart:convert';
import 'dart:io';

import 'package:device_info_plus/device_info_plus.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:http/http.dart' as http;
import 'package:lottie/lottie.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../const/apiConst.dart';
import '../const/urls.dart';
import 'home_screen.dart';

class MainAuthScreen extends StatefulWidget {
  const MainAuthScreen({super.key});

  @override
  State<MainAuthScreen> createState() => _MainAuthScreenState();
}

class _MainAuthScreenState extends State<MainAuthScreen> {
  final GlobalKey<State> _key = GlobalKey<State>();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xfffafafa),
        foregroundColor: Colors.black,
        leading: GestureDetector(
          onTap: () {
            Navigator.pushReplacement(
              context,
              MaterialPageRoute(
                builder: (builder) => const HomeScreen(),
              ),
            );
          },
          child: const Icon(Icons.arrow_back),
        ),
        elevation: 0,
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            children: [
              Text(
                "Login",
                style: GoogleFonts.poppins(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                ),
              ),
              Lottie.asset("assets/animations/Power Motoring.json"),
              Padding(
                padding: const EdgeInsets.all(18.0),
                child: GestureDetector(
                  onTap: () {
                    signInWithGoogle(context);
                  },
                  child: Container(
                    decoration: const BoxDecoration(
                        borderRadius: BorderRadius.all(Radius.circular(10)),
                        color: Colors.white,
                        boxShadow: [
                          BoxShadow(
                            color: Colors.grey,
                            blurRadius: 10.0,
                          ),
                        ]),
                    child: Padding(
                      padding: const EdgeInsets.all(10.0),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          Image.asset(
                            'assets/images/google.png',
                            width: 40,
                            height: 40,
                          ),
                          const SizedBox(width: 20),
                          Text(
                            "Sign In with Google",
                            style: GoogleFonts.poppins(
                              fontWeight: FontWeight.bold,
                              fontSize: 25,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Future<UserCredential> signInWithGoogle(context) async {
    _showAlertDialog(context);
    try {
      final GoogleSignInAccount? googleUser = await GoogleSignIn().signIn();

      final GoogleSignInAuthentication? googleAuth =
          await googleUser?.authentication;

      final credential = GoogleAuthProvider.credential(
        accessToken: googleAuth?.accessToken,
        idToken: googleAuth?.idToken,
      );

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

      UserCredential userCredential =
          await FirebaseAuth.instance.signInWithCredential(credential);

      var url = Uri.http(apiURl, '/api/user/register-with-email');
      var data = {
        "userID": userCredential.user!.uid,
        'fullName': userCredential.user!.displayName ?? "",
        'contactNo': userCredential.user!.phoneNumber ?? "",
        'email': userCredential.user!.email ?? "",
        "deviceID": deviceId,
      };
      var response = await http.post(
        url,
        headers: jsonApiHeader,
        body: jsonEncode(data),
      );

      if (response.statusCode == 200) {
        final json = jsonDecode(response.body);
        final prefs = await SharedPreferences.getInstance();

        prefs.setString("userName", json["fullName"]?.toString() ?? "");
        prefs.setString("contactNo", json["contactNo"]?.toString() ?? "");
        prefs.setString("email", json["email"]?.toString() ?? "");
        prefs.setString("userID", json["userID"]?.toString() ?? "");
        prefs.setString("stripeCustID", json["stripeCustID"]?.toString() ?? "");
        prefs.setString(
            "displayImage", userCredential.user!.photoURL.toString());
        Navigator.of(_key.currentContext!).pop();
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(
            builder: (context) => const HomeScreen(),
          ),
        );
        // if (json["deviceID"] != "" && json["deviceID"] != deviceId) {
        //   Navigator.pushReplacement(
        //     context,
        //     MaterialPageRoute(
        //       builder: (context) =>
        //           AlreadyLoggedInScreen(userID: json["userID"]),
        //     ),
        //   );
        // } else {
        //   Navigator.pushReplacement(
        //     context,
        //     MaterialPageRoute(
        //       builder: (context) => const HomeScreen(),
        //     ),
        //   );
        // }
      } else {
        const snackBar = SnackBar(
          content: Text('Oops! Something went wrong!'),
          duration: Duration(seconds: 3),
        );

        ScaffoldMessenger.of(context).showSnackBar(snackBar);
      }

      return userCredential;
    } catch (error) {
      rethrow; // You may want to handle the error appropriately
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
}
