part of 'image_size_bloc.dart';

@immutable
abstract class ImageSizeEvent {}

class ImageSize extends ImageSizeEvent {}

class ImageMaxSize extends ImageSizeEvent {}
