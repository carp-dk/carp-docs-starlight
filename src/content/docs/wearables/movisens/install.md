---
title: "Install Movisens"
description: "Movisens Move, ECG and EDA sensors."
sidebar:
  label: Install
  order: 1
---

To use this package, add the following to you `pubspec.yaml` file. Note that this package only works together with `carp_mobile_sensing`.

```dart
dependencies:
  carp_core: ^latest
  carp_mobile_sensing: ^latest
  carp_movisens_package: ^latest
  ...
```

## Android Integration

Add the following to your app's `manifest.xml` file located in `android/app/src/main`:

```xml title="android/app/src/main/AndroidManifest.xml" ins={3-5}
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <uses-permission android:name="android.permission.BLUETOOTH" />
    <uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>

    <application ...>
</manifest>
```

Update the Android `minSdkVersion` to at least 19 in the `android/app/build.gradle` file.

## iOS Integration

Add the following to your `ios/Runner/Info.plist` file:

```xml title="ios/Runner/Info.plist" ins={4-13}
<plist version="1.0">
<dict>
    ...
    <key>NSBluetoothAlwaysUsageDescription</key>
    <string>Need BLE permission</string>
    <key>NSBluetoothPeripheralUsageDescription</key>
    <string>Need BLE permission</string>
    <key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
    <string>Need Location permission</string>
    <key>NSLocationAlwaysUsageDescription</key>
    <string>Need Location permission</string>
    <key>NSLocationWhenInUseUsageDescription</key>
    <string>Need Location permission</string>
</dict>
</plist>
````
