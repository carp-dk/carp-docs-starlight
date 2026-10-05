---
title: "Install Audio"
description: "Audio, video and noise."
sidebar:
  label: Install
  order: 1
---

To use this package, add the following to your `pubspec.yaml` file. Note that this package only works together with [`carp_mobile_sensing`](https://pub.dev/packages/carp_mobile_sensing).

```dart
dependencies:
  carp_core: ^latest
  carp_mobile_sensing: ^latest
  carp_audio_package: ^latest
  ...
```

## Android Integration

Add the following to your app's `AndroidManifest.xml` file located in `android/app/src/main`:

````xml
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.CAMERA"/>
<uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
````

## iOS Integration

Add this permission in the `Info.plist` file located in `ios/Runner`:

```xml title="ios/Runner/Info.plist" ins={4-13}
<plist version="1.0">
<dict>
    ...
    <key>NSMicrophoneUsageDescription</key>
    <string>Uses the microphone to record ambient noise in the phone's environment.</string>
    <key>NSCameraUsageDescription</key>
    <string>Uses the camera to ....</string>
    <key>UIBackgroundModes</key>
      <array>
      <string>audio</string>
      <string>external-accessory</string>
      <string>fetch</string>
    </array>
</dict>
</plist>
```
