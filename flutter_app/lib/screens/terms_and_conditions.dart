import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:webview_flutter/webview_flutter.dart';

import 'welcome_screen.dart';

class TermsConditions extends StatefulWidget {
  const TermsConditions({super.key});

  @override
  State<TermsConditions> createState() => _TermsConditionsState();
}

class _TermsConditionsState extends State<TermsConditions> {
  bool value = false;
  late final WebViewController controller;
  @override
  void initState() {
    super.initState();
    controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(const Color(0x00000000))
      ..setNavigationDelegate(
        NavigationDelegate(
          onProgress: (int progress) {
            const CircularProgressIndicator.adaptive();
          },
          onPageStarted: (String url) {},
          onPageFinished: (String url) {},
          onWebResourceError: (WebResourceError error) {},
          onNavigationRequest: (NavigationRequest request) {
            if (request.url.startsWith('https://powermotoring.com')) {
              return NavigationDecision.prevent;
            }
            return NavigationDecision.navigate;
          },
        ),
      )
      ..loadRequest(Uri.parse('https://powermotoring.com/terms-conditions'));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          child: SizedBox(
            width: double.infinity,
            child: Column(
              children: [
                _content(context),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Column _content(BuildContext context) {
    return Column(
      children: [
        Text(
          'TERMS AND CONDITIONS',
          style: GoogleFonts.poppins(
            textStyle: const TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
        SizedBox(
            height: MediaQuery.of(context).size.height - 160,
            width: double.infinity,
            child: WebViewWidget(
              controller: controller,
            )),
        Row(
          children: [
            Checkbox(
              value: value,
              onChanged: (valuez) {
                setState(() {
                  value = !value;
                });
              },
            ),
            const Text("I agree all the terms & conditions"),
          ],
        ),
        !value
            ? const Text("")
            : ElevatedButton(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (BuildContext context) => const WelcomeScreen(),
                    ),
                  );
                },
                child: const Text("Agree"),
              ),
      ],
    );
  }
}
