import 'package:power_motoring/data/data_provider/subscriptions_dataprovider.dart';

class SubscriptionRepository {
  Future<String> checkSubscriptionRepository() async {
    try {
      final subscriptionData =
          await SubscriptionDataProvider().checkSubscription();
      final rawData = subscriptionData;
      return rawData;
    } catch (e) {
      throw Exception(e);
    }
  }

  Future<List> enableLaunchOffer(String custId) async {
    try {
      final prelaunchOfferData =
          await SubscriptionDataProvider().enableLaunchOffer(custId);
      List<dynamic> rawData = prelaunchOfferData;
      return rawData;
    } catch (e) {
      throw Exception(e);
    }
  }
}
