import 'dart:convert';

import 'package:app_settings/app_settings.dart';
import 'package:firebase_analytics/firebase_analytics.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_in_app_messaging/firebase_in_app_messaging.dart';
import 'package:firebase_remote_config/firebase_remote_config.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_no_internet_widget/flutter_no_internet_widget.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:http/http.dart' as http;
import 'package:power_motoring/data/bloc/subscription_bloc.dart';
import 'package:power_motoring/data/repository/subscription_repository.dart';
import 'package:power_motoring/firebase_options.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'const/urls.dart';
import 'firebase_api.dart';
import 'screens/splash_screen.dart';
import 'state/bloc/image_size_bloc.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitUp,
    DeviceOrientation.portraitDown,
  ]);

  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);
  FirebaseInAppMessaging inAppMessaging = await FirebaseInAppMessaging.instance;
  final remoteConfig = FirebaseRemoteConfig.instance;
  await remoteConfig.setConfigSettings(RemoteConfigSettings(
    fetchTimeout: const Duration(minutes: 1),
    minimumFetchInterval: const Duration(hours: 1),
  ));

  await FirebaseApi().initNotification();
  final isFirst = await isFirstTime();
  if (isFirst) {
    await setIsFirstTime(false);
  } else {
    checkSubscriptionStatus();
  }
  runApp(PowerMotoring(isFirst: isFirst));
}

void checkSubscriptionStatus() async {
  var url = Uri.http(apiURl, '/api/user/check-subscription-status');

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
  } else {
    prefs.setBool("subsStatus", false);
  }
}

Future<bool> isFirstTime() async {
  final prefs = await SharedPreferences.getInstance();
  final isFirstTime = prefs.getBool('isFirstTime') ?? true;
  return isFirstTime;
}

Future<void> setIsFirstTime(bool value) async {
  final prefs = await SharedPreferences.getInstance();
  await prefs.setBool('isFirstTime', false);
}

class PowerMotoring extends StatelessWidget {
  final bool isFirst;
  const PowerMotoring({Key? key, required this.isFirst}) : super(key: key);
  static FirebaseAnalytics analytics = FirebaseAnalytics.instance;
  static FirebaseAnalyticsObserver observer =
      FirebaseAnalyticsObserver(analytics: analytics);

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        BlocProvider<ImageSizeBloc>(create: (context) => ImageSizeBloc()),
        BlocProvider(
            create: (context) => SubscriptionBloc(SubscriptionRepository())),
      ],
      child: InternetWidget(
        offline: FullScreenWidget(
          child: Scaffold(
            body: SizedBox(
              width: double.infinity,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Image.asset(
                    'assets/images/offline-300.webp',
                    width: 100,
                  ),
                  const SizedBox(height: 50),
                  Text(
                    'It looks like you are offline. ',
                    textAlign: TextAlign.center,
                    style: GoogleFonts.poppins(
                        textStyle: const TextStyle(fontSize: 20)),
                  ),
                  Text(
                    " Please check your internet connection!",
                    textAlign: TextAlign.center,
                    style: GoogleFonts.poppins(
                        textStyle: const TextStyle(fontSize: 20)),
                  ),
                  IconButton(
                    onPressed: () {},
                    icon: const Icon(
                      Icons.refresh,
                    ),
                  ),
                  const SizedBox(height: 50),
                  ElevatedButton(
                    onPressed: () => AppSettings.openAppSettingsPanel(
                        AppSettingsPanelType.internetConnectivity),
                    child: Text(
                      "Open Settings",
                      style: GoogleFonts.poppins(),
                    ),
                  )
                ],
              ),
            ),
          ),
        ),
        whenOffline: () => print('Not Connected to internet'),
        whenOnline: () => print('Connected to internet'),
        loadingWidget: const Center(child: Text('Loading')),
        online: MaterialApp(
          home: SplashScreen(
            analytics: analytics,
            observer: observer,
            isFirst: isFirst,
          ),
        ),
      ),
    );
  }
}
