import 'dart:convert';

import 'package:http/http.dart';
import 'package:http/http.dart' as http;
import 'package:power_motoring/const/apiConst.dart';
import 'package:power_motoring/data/api/api_const.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SubscriptionDataProvider {
  Future<String> checkSubscription() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      Response response = await http.post(
        Uri.parse(checkSubscriptionUrl),
        headers: apiHeader,
        body: jsonEncode({
          "custID": prefs.getString("userID"),
        }),
      );
      if (response.statusCode == 200) {
        final result = jsonDecode(response.body);
        return result;
      } else {
        throw Exception(response.reasonPhrase);
      }
    } catch (e) {
      throw Exception(e);
    }
  }
}
