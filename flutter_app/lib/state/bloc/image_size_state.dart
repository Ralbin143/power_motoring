part of 'image_size_bloc.dart';

class ImageSizeState {
  final double size;

  ImageSizeState({required this.size});
}

final class InititalState extends ImageSizeState {
  InititalState() : super(size: 120);
}
