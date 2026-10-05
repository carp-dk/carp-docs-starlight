---
title: "Install eSense"
description: "eSense earables."
sidebar:
  label: Install
  order: 1
---

To use this package, add the following to you `pubspec.yaml` file. Note that this package only works together with `carp_mobile_sensing`.

```dart
dependencies:
  flutter:
    sdk: flutter
  carp_core: ^latest
  carp_mobile_sensing: ^latest
  carp_esense_package: ^latest
  ...
```

The package uses bluetooth to fetch data from the eSense earplugs. Therefore permission to access bluetooth must be enabled on both Android and iOS, as follows.
Then make sure to obtain permissions in your app to use bluetooth.

## Android Integration

Add the following to your app's `manifest.xml` file located in `android/app/src/main`:

```xml title="android/app/src/main/AndroidManifest.xml" ins={3-12}
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <uses-permission
        android:name="android.permission.BLUETOOTH"
        android:maxSdkVersion="30" />
    <uses-permission
        android:name="android.permission.BLUETOOTH_ADMIN"
        android:maxSdkVersion="30" />
    <uses-permission
        android:name="android.permission.BLUETOOTH_SCAN" 
        android:usesPermissionFlags="neverForLocation" /> 
    <uses-permission android:name="android.permission.BLUETOOTH_CONNECT"/>

    <application ...>
</manifest>
```

## iOS Integration

Requires iOS 10 or later. Hence, in your `Podfile` in the `ios` folder of your app, make sure that the platform is set to `10.0`.

```ruby title="ios/Podfile" ins={1}
platform :ios, '10.0'
```

Add this permission in the `Info.plist` file located in `ios/Runner`:

```xml title="ios/Runner/Info.plist" ins={4-13}
<plist version="1.0">
<dict>
    ...
    <key>NSBluetoothAlwaysUsageDescription</key>
    <string>Uses bluetooth to connect to the eSense device</string>
    <key>UIBackgroundModes</key>
      <array>
     <string>bluetooth-central</string>
     <string>bluetooth-peripheral</string>
      <string>audio</string>
      <string>external-accessory</string>
      <string>fetch</string>
    </array>
</dict>
</plist>
```
