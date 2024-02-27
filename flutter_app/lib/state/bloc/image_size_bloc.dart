import 'package:bloc/bloc.dart';
import 'package:meta/meta.dart';

part 'image_size_event.dart';
part 'image_size_state.dart';

class ImageSizeBloc extends Bloc<ImageSizeEvent, ImageSizeState> {
  ImageSizeBloc() : super(InititalState()) {
    on<ImageSizeEvent>((event, emit) {
      return emit(ImageSizeState(size: 0));
    });
    on<ImageMaxSize>((event, emit) {
      return emit(ImageSizeState(size: 120));
    });
  }
}
