import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:url_launcher/url_launcher.dart';
import 'login_page.dart'; // Import the new LoginPage file
import 'firebase_options.dart'; // Your Firebase configuration

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );

  // Request permission for notifications
  await FirebaseMessaging.instance.requestPermission();

  // Handle background messages
  FirebaseMessaging.onBackgroundMessage(_firebaseMessagingBackgroundHandler);

  runApp(const NeedpediaApp());

  // Handle foreground messages
  FirebaseMessaging.onMessage.listen((RemoteMessage message) {
    // Here you can handle the incoming message when the app is in the foreground
    print('Received a message in the foreground: ${message.messageId}');
    // Show a notification or handle the message as needed
  });

  // Handle taps on notifications
  FirebaseMessaging.onMessageOpenedApp.listen((RemoteMessage message) {
    _launchUrl(); // Open the hardcoded URL without needing to pass it
  });
}

Future<void> _firebaseMessagingBackgroundHandler(RemoteMessage message) async {
  // This will be called when the app is in the background or terminated
  _launchUrl(); // Open the URL without needing to pass it
}

Future<void> _launchUrl() async {
  final Uri _url = Uri.parse('https://needpedia.org/notifications');
  if (!await launchUrl(_url, mode: LaunchMode.externalApplication)) {
    throw Exception('Could not launch $_url');
  }
}

class NeedpediaApp extends StatelessWidget {
  const NeedpediaApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Needpedia',
      theme: ThemeData(
        brightness: Brightness.light,
        primarySwatch: Colors.blue,
        scaffoldBackgroundColor: Colors.white,
        textTheme: TextTheme(
          bodyMedium: const TextStyle(color: Colors.black),
          bodySmall: const TextStyle(color: Colors.black54),
          headlineMedium: const TextStyle(fontSize: 20.0, fontWeight: FontWeight.bold),
        ),
        appBarTheme: const AppBarTheme(
          backgroundColor: Colors.blue,
          foregroundColor: Colors.white,
        ),
      ),
      darkTheme: ThemeData(
        brightness: Brightness.dark,
        primarySwatch: Colors.blue,
        scaffoldBackgroundColor: Colors.black,
        textTheme: const TextTheme(
          bodyMedium: TextStyle(color: Colors.white),
          bodySmall: TextStyle(color: Colors.white70),
        ),
        appBarTheme: const AppBarTheme(
          backgroundColor: Colors.black,
          foregroundColor: Colors.white,
        ),
      ),
      themeMode: ThemeMode.system,
      home: const LoginPage(),
    );
  }
}
