import 'package:power_motoring/data/data_provider/subscriptions_dataprovider.dart';

class SubscriptionRepository {
  Future<String> checkSubscriptionRepository() async {
    try {
      final subscriptionData =
          await SubscriptionDataProvider().checkSubscription();
      final rawData = subscriptionData;
      return rawData;
    } catch (e) {
      print(e);
      throw Exception(e);
    }
  }
}
