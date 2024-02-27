part of 'subscription_bloc.dart';

sealed class SubscriptionEvent extends Equatable {}

class CheckSubscriptionEvent extends SubscriptionEvent {
  @override
  List<Object?> get props => [];
}
