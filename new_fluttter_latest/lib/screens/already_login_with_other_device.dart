import 'dart:convert';
import 'dart:io';

import 'package:device_info_plus/device_info_plus.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;

import '../const/urls.dart';
import 'home_screen.dart';

class AlreadyLoggedInScreen extends StatefulWidget {
  final String userID;
  const AlreadyLoggedInScreen({super.key, required this.userID});

  @override
  State<AlreadyLoggedInScreen> createState() => _AlreadyLoggedInScreenState();
}

class _AlreadyLoggedInScreenState extends State<AlreadyLoggedInScreen> {
  late IO.Socket socket;
  String? platformzz;

  @override
  void initState() {
    loadDeviceDetails();
    connectToServer(context);
    super.initState();
  }

  void connectToServer(context) async {
    socket = IO.io('http://$apiURl/socket', <String, dynamic>{
      'transports': ['websocket'],
      'autoConnect': false,
    });

    // Add a listener for the 'login_status' event
    socket.on('login_status', (data) async {
      if (data == "force_logout") {
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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SizedBox(
          width: double.infinity,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Text(
                'Device -  $platformzz',
                style: GoogleFonts.poppins(
                  textStyle: const TextStyle(
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              Text(
                'This account is already loggedin on another device!',
                style: GoogleFonts.poppins(),
              ),
              ElevatedButton(
                  onPressed: () {
                    forceLogin();
                  },
                  child: const Text('Logout and Login to this device')),
              ElevatedButton(
                onPressed: () async {
                  final prefs = await SharedPreferences.getInstance();
                  prefs.remove('user');
                  prefs.remove('userName');
                  prefs.remove('contactNo');
                  prefs.remove('email');
                  prefs.remove('userID');
                  prefs.setBool("subsStatus", false);
                  // ignore: use_build_context_synchronously
                  Navigator.pushReplacement(
                    context,
                    MaterialPageRoute(
                      builder: (builder) => const HomeScreen(),
                    ),
                  );
                },
                child: const Text(
                  'Continue without login',
                ),
              )
            ],
          ),
        ),
      ),
    );
  }

  void forceLogin() async {
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
    final prefs = await SharedPreferences.getInstance();

    var url = Uri.https(apiURl, 'api/user/force_login');
    var response = await http.post(
      url,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'userID': widget.userID, "searchKey": deviceID}),
    );

    final json = jsonDecode(response.body);

    prefs.setString("userName", json[0]["fullName"].toString());
    prefs.setString("contactNo", json[0]["contactNo"]);
    prefs.setString("email", json[0]["email"]);
    prefs.setString("userID", json[0]["userID"]);
    prefs.setString("stripeCustID", json[0]["stripeCustID"]);
    sendMessage();
    // ignore: use_build_context_synchronously
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(
        builder: (builder) => const HomeScreen(),
      ),
    );
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

  void loadDeviceDetails() async {
    var deviceInfo = DeviceInfoPlugin();
    late String deviceId;

    if (Platform.isIOS) {
      var iosDeviceInfo = await deviceInfo.iosInfo;
      deviceId = iosDeviceInfo.identifierForVendor!;
      setState(() {
        platformzz = "iOS";
      });
    } else if (Platform.isAndroid) {
      var androidDeviceInfo = await deviceInfo.androidInfo;
      deviceId = androidDeviceInfo.id;
      setState(() {
        platformzz = "Andriod";
      });
    } else {
      deviceId = 'Unknown';
    }
  }
}
