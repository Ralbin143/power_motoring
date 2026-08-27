import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:power_motoring/data/repository/subscription_repository.dart';

part 'subscription_event.dart';
part 'subscription_state.dart';

class SubscriptionBloc extends Bloc<SubscriptionEvent, SubscriptionState> {
  final SubscriptionRepository _subscriptionRepository;
  SubscriptionBloc(this._subscriptionRepository)
      : super(SubscriptionInitial()) {
    on<CheckSubscriptionEvent>((event, emit) async {
      emit(SubscriptionInitial());
      try {
        final result =
            await _subscriptionRepository.checkSubscriptionRepository();

        emit(SubscriptionStatusState(result));
      } catch (e) {
        emit(SubscriptionErrorState(e.toString()));
      }
    });
  }
}
