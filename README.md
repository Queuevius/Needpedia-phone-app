# 📱 Needpedia Mobile App

This is a Flutter(3.24.3) based mobile application for [Needpedia](https://needpedia.org/).

## ✨ Features(current)

- **YouTube Video Playback**: Stream YouTube videos directly within the app.
- **Push Notifications**: Receive notifications via Firebase Cloud Messaging (FCM) and redirect users to a URL when clicked.
- **Custom Drawer Menu**: Simple navigation with logout functionality.
- **User Authentication**: Users can log in and out seamlessly.

## 🚀 Installation Guide

### Prerequisites

Before setting up the project, ensure you have the following installed:

- [Flutter SDK](https://flutter.dev/docs/get-started/install) (latest stable version)
- Android Studio or Xcode (for Android/iOS builds)
- Firebase CLI (for Firebase configuration and push notifications)

### Steps

#### Step 1: Clone the repository

    - Clone the repository
    - cd needpedia-mobile-app

#### Step 2: Install dependencies

    `flutter pub get`

    - The command  fetches all the dependencies listed in your project's `pubspec.yaml` file, along with their transitive dependencies. 

#### Step 3: Set up Firebase (Push Notifications)

    -Place the configuration files:
        google-services.json in android/app/.
        GoogleService-Info.plist in ios/Runner/.
    
### If you lack these files, please follow the steps below.

    - Go to the Firebase Console.

    - Create a new Firebase project or select an existing one.

    - Follow the Firebase setup guide for Flutter here, and complete the following steps:

    - Add your Android app package and download google-services.json.
    - Add your iOS app package and download GoogleService-Info.plist.
    - Place the configuration files:
        google-services.json in android/app/.
        GoogleService-Info.plist in ios/Runner/.

#### Step 4: Running the app

    flutter run
    
### 🔧 Code Structure

- HomePage:
- LoginPage:
- Push Notification Logic:

### 📦 Packages Used

- [youtube_player_iframe](https://pub.dev/packages/youtube_player_iframe): Embeds YouTube videos in the app.
- [firebase_messaging](https://pub.dev/packages/firebase_messaging): Handles push notifications using Firebase Cloud Messaging.
- [flutter_launcher_icons](https://pub.dev/packages/flutter_launcher_icons): Generates Android and iOS app icons.
