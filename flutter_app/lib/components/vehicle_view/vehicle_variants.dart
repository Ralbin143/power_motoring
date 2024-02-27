import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_typeahead/flutter_typeahead.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:scrollable_positioned_list/scrollable_positioned_list.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../data/bloc/subscription_bloc.dart';
import '../../screens/main_auth_screen.dart';
import '../../screens/subscription_screen.dart';

class VehicleVariants extends StatefulWidget {
  final List<dynamic> vehicleData;
  const VehicleVariants({super.key, required this.vehicleData});

  @override
  State<VehicleVariants> createState() => _VehicleVariantsState();
}

class _VehicleVariantsState extends State<VehicleVariants> {
  final itemController = ItemScrollController();
  final itemListener = ItemPositionsListener.create();
  final ScrollController innerListController = ScrollController();
  final ItemPositionsListener itemPositionsListener =
      ItemPositionsListener.create();
  final horizontalItemController = ItemScrollController();

  String selectedValue = '';
  String selectedFeature = '';
  String selectedFeatureVariantName = "";
  List<dynamic> filteredArrayData = [];
  bool scrollable = false;
  bool isSubscribed = false;
  bool loginStatus = false;

  @override
  void initState() {
    super.initState();
    checkSubscription();
    isLoggedIn();
    setState(() {
      selectedValue = widget.vehicleData[0]['variantList'][0]['variant'];
      // selectedFeature = widget.vehicleData[0]['variantList'][0]['feature'];
      filteredArrayData = widget.vehicleData;
      filterAction(selectedValue);
    });
  }

  void checkSubscription() async {
    final prefs = await SharedPreferences.getInstance();
    final isSubScribeds = prefs.getBool('subsStatus') ?? true;

    setState(() {
      isSubscribed = isSubScribeds;
    });
  }

  void isLoggedIn() async {
    final prefs = await SharedPreferences.getInstance();

    String? isLoggedIns = prefs.getString('userID');
    if (isLoggedIns!.isEmpty) {
      setState(() {
        loginStatus = true;
      });
    } else {
      setState(() {
        loginStatus = true;
      });
    }
  }

  Future horizontalScrollToItem(String itemName) async {
    final uniqueItems = <String>{};

    for (var i = 0; i < widget.vehicleData[0]['variantList'].length; i++) {
      final variant = widget.vehicleData[0]['variantList'][i]['variant'];
      if (!uniqueItems.contains(variant)) {
        uniqueItems.add(variant);
      }
    }

    final uniqueItemsList = uniqueItems.toList();

    int index = uniqueItemsList.indexWhere((item) => item == itemName);
    horizontalItemController.scrollTo(
      index: index,
      duration: const Duration(seconds: 1),
    );
  }

  Future scrollToItem(String itemName) async {
    int index =
        filteredArrayData.indexWhere((item) => item["feature"] == itemName);

    itemController.scrollTo(
      index: index,
      duration: const Duration(seconds: 1),
    );
  }

  @override
  Widget build(BuildContext context) {
    final uniqueItems = <String>{};
    final uniqueFeatures = <String>{};
    for (var i = 0; i < widget.vehicleData[0]['variantList'].length; i++) {
      final variant = widget.vehicleData[0]['variantList'][i]['variant'];
      if (!uniqueItems.contains(variant)) {
        uniqueItems.add(variant);
      }
    }

    for (var i = 0; i < widget.vehicleData[0]['variantList'].length; i++) {
      final variant = widget.vehicleData[0]['variantList'][i]['feature'];
      if (!uniqueFeatures.contains(variant)) {
        uniqueFeatures.add(variant);
      }
    }

    final uniqueItemsList = uniqueItems.toList();

    return Container(
      decoration: const BoxDecoration(color: Colors.white),
      child: Column(
        children: [
          const Padding(
            padding: EdgeInsets.all(8.0),
            child: SizedBox(
              width: double.infinity,
              child: Text(
                "Search Features",
                textAlign: TextAlign.left,
              ),
            ),
          ),
          BlocConsumer<SubscriptionBloc, SubscriptionState>(
            listener: (context, state) {
              // TODO: implement listener
            },
            builder: (context, state) {
              if (state is SubscriptionStatusState) {
                if (state.data == "Live") {
                  return _searchFilterAutoComplete(context);
                } else {
                  return SizedBox(
                    child: !loginStatus
                        ? GestureDetector(
                            onTap: () {
                              Navigator.pushReplacement(
                                context,
                                MaterialPageRoute(
                                  builder: (context) => const MainAuthScreen(),
                                ),
                              );
                            },
                            child: Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Container(
                                decoration: BoxDecoration(
                                  color: Colors.black,
                                  border:
                                      Border.all(width: 4, color: Colors.red),
                                  borderRadius: const BorderRadius.all(
                                    Radius.circular(8),
                                  ),
                                ),
                                width: double.infinity,
                                child: Padding(
                                  padding: const EdgeInsets.all(8.0),
                                  child: Row(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceBetween,
                                    children: [
                                      const SizedBox(),
                                      Text(
                                        "Login & Subscribe to enable Search",
                                        style: GoogleFonts.poppins(
                                          textStyle: const TextStyle(
                                            fontWeight: FontWeight.bold,
                                            color: Colors.white,
                                          ),
                                        ),
                                      ),
                                      const Icon(
                                        Icons.search,
                                        color: Colors.white,
                                      )
                                    ],
                                  ),
                                ),
                              ),
                            ),
                          )
                        : GestureDetector(
                            onTap: () {
                              Navigator.pushReplacement(
                                context,
                                MaterialPageRoute(
                                  builder: (context) =>
                                      const SubscriptionScreen(),
                                ),
                              );
                            },
                            child: Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Container(
                                decoration: BoxDecoration(
                                  color: Colors.black,
                                  border:
                                      Border.all(width: 4, color: Colors.red),
                                  borderRadius: const BorderRadius.all(
                                    Radius.circular(8),
                                  ),
                                ),
                                width: double.infinity,
                                child: Padding(
                                  padding: const EdgeInsets.all(8.0),
                                  child: Row(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceBetween,
                                    children: [
                                      const SizedBox(),
                                      Text(
                                        "Subscribe to enable Search",
                                        style: GoogleFonts.poppins(
                                          textStyle: const TextStyle(
                                            fontWeight: FontWeight.bold,
                                            color: Colors.white,
                                          ),
                                        ),
                                      ),
                                      const Icon(
                                        Icons.search,
                                        color: Colors.white,
                                      )
                                    ],
                                  ),
                                ),
                              ),
                            ),
                          ),
                  );
                }
              }
              return const SizedBox();
            },
          ),
          _variantList(uniqueItemsList),
          const Divider(),
          _featuresList(),
        ],
      ),
    );
  }

  Padding _searchFilterAutoComplete(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 15),
      child: Container(
        decoration: BoxDecoration(
          border: Border.all(width: 1),
          borderRadius: const BorderRadius.all(
            Radius.circular(10),
          ),
        ),
        padding: const EdgeInsets.all(0),
        child: Row(
          children: [
            const SizedBox(width: 10),
            const Icon(Icons.search),
            Expanded(
              child: TypeAheadField(
                suggestionsCallback: (String pattern) {
                  return widget.vehicleData[0]['variantList']
                          ?.where((item) =>
                              (item['feature'] as String)
                                  .toLowerCase()
                                  .contains(pattern.toLowerCase()) ||
                              (item['variant'] as String)
                                  .toLowerCase()
                                  .contains(pattern.toLowerCase()))
                          .map((item) => {
                                'suggestion':
                                    '${item['feature']} -- ${item['variant']}',
                              })
                          .toList() ??
                      [];
                },
                itemBuilder: (context, suggestion) {
                  final variantss = suggestion as Map<String, dynamic>;
                  return ListTile(
                    title: Text(
                      variantss['suggestion'].split(' -- ')[0],
                      style: GoogleFonts.poppins(),
                    ),
                    subtitle: Text(
                      variantss['suggestion'].split(" -- ")[1],
                      style: GoogleFonts.poppins(
                        textStyle: const TextStyle(
                          color: Colors.grey,
                        ),
                      ),
                    ),
                  );
                },
                onSelected: (suggestion) {
                  final variantss = suggestion as Map<String, dynamic>;
                  setState(() {
                    selectedFeature = variantss['suggestion'].split(" -- ")[0];
                    selectedValue = variantss['suggestion'].split(" -- ")[1];
                  });
                  filterAction(variantss['suggestion'].split(" -- ")[1]);
                  scrollToItem(variantss['suggestion'].split(" -- ")[0]);
                },
              ),
            ),
          ],
        ),
      ),
    );
  }

  SizedBox _variantList(List<String> uniqueItemsList) {
    return SizedBox(
      width: 400,
      height: 55,
      child: ScrollablePositionedList.builder(
        shrinkWrap: true,
        itemScrollController: horizontalItemController,
        scrollDirection: Axis.horizontal,
        itemCount: uniqueItemsList.length,
        itemBuilder: (BuildContext context, int index) {
          return GestureDetector(
            onTap: () {
              setState(() {
                selectedValue = uniqueItemsList[index];
              });
              filterAction(uniqueItemsList[index]);
            },
            child: Padding(
              padding: const EdgeInsets.all(8.0),
              child: Container(
                decoration: BoxDecoration(
                  border: Border.all(width: 1),
                  color: selectedValue == uniqueItemsList[index]
                      ? const Color(0xff272b32)
                      : Colors.white,
                  borderRadius: const BorderRadius.all(
                    Radius.circular(10),
                  ),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Text(
                    uniqueItemsList[index].toUpperCase(),
                    textAlign: TextAlign.center,
                    style: GoogleFonts.poppins(
                      textStyle: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: selectedValue == uniqueItemsList[index]
                            ? Colors.white
                            : const Color(0xff272b32),
                      ),
                    ),
                  ),
                ),
              ),
            ),
          );
        },
      ),
    );
  }

  SizedBox _featuresList() {
    return SizedBox(
      height: 400,
      child: ScrollablePositionedList.builder(
        shrinkWrap: true,
        physics: scrollable
            ? const NeverScrollableScrollPhysics()
            : const ScrollPhysics(),
        itemCount: filteredArrayData.length,
        itemScrollController: itemController,
        itemPositionsListener: itemListener,
        itemBuilder: (BuildContext context, int index) {
          return ListTile(
            title: Container(
              decoration: BoxDecoration(
                color: selectedFeature == filteredArrayData[index]['feature']
                    ? const Color(0xff272b32)
                    : Colors.white,
                boxShadow: [
                  BoxShadow(
                    color: Colors.grey.withOpacity(0.5),
                    spreadRadius: 1,
                    blurRadius: 7,
                    offset: const Offset(0, 3),
                  ),
                ],
                borderRadius: const BorderRadius.all(
                  Radius.circular(10),
                ),
              ),
              padding: const EdgeInsets.all(10),
              child: Column(
                children: [
                  Text(
                    filteredArrayData[index]['feature'],
                    textAlign: TextAlign.center,
                    style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: selectedFeature ==
                                filteredArrayData[index]['feature']
                            ? const Color(0xffffffff)
                            : Colors.blueGrey),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }

  void filterAction(newValue) {
    List<dynamic> filteredList = [];

    for (var i = 0; i < widget.vehicleData[0]['variantList'].length; i++) {
      if (widget.vehicleData[0]['variantList'][i]['variant'] == newValue) {
        filteredList.add(widget.vehicleData[0]['variantList'][i]);
      }
    }

    horizontalScrollToItem(newValue);
    setState(() {
      filteredArrayData = filteredList;
    });
  }
}
