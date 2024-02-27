part of 'subscription_bloc.dart';

sealed class SubscriptionState extends Equatable {}

final class SubscriptionInitial extends SubscriptionState {
  @override
  List<Object?> get props => [];
}

final class SubscriptionStatusState extends SubscriptionState {
  final String data;

  SubscriptionStatusState(this.data);

  @override
  List<Object?> get props => [data];
}

final class SubscriptionErrorState extends SubscriptionState {
  final String error;

  SubscriptionErrorState(this.error);

  @override
  List<Object?> get props => [error];
}
