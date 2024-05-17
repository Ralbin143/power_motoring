// ignore_for_file: public_member_api_docs, sort_constructors_first
part of 'subscription_bloc.dart';

sealed class SubscriptionEvent extends Equatable {}

class CheckSubscriptionEvent extends SubscriptionEvent {
  @override
  List<Object?> get props => [];
}
