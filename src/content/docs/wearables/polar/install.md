---
title: "Install Polar"
description: "Polar heart rate monitors and sensors."
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
  carp_polar_package: ^latest
  ...
```

## Android Integration

See the official Polar description of [Android: Getting started](https://github.com/polarofficial/polar-ble-sdk#android-getting-started).

Add the following to your app's `manifest.xml` file located in `android/app/src/main`:

```xml title="android/app/src/main/AndroidManifest.xml" ins={3-36}
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <!-- Polar SDK needs Bluetooth scan permission to search for BLE devices. Polar BLE SDK doesn't use the scan
    to decide the location so "neverForLocation" permission flag can be used.-->
    <uses-permission
        android:name="android.permission.BLUETOOTH_SCAN"
        android:usesPermissionFlags="neverForLocation" />

    <!-- Polar SDK needs Bluetooth connect permission to connect for found BLE devices.-->
    <uses-permission android:name="android.permission.BLUETOOTH_CONNECT" />

    <!-- Allows Polar SDK to connect to paired bluetooth devices. Legacy Bluetooth permission,
      which is needed on devices with API 30 (Android Q) or older. -->
    <uses-permission
        android:name="android.permission.BLUETOOTH"
        android:maxSdkVersion="30" />

    <!-- Allows Polar SDK to discover and pair bluetooth devices. Legacy Bluetooth permission,
      which is needed on devices with API 30 (Android Q) or older. -->
    <uses-permission
        android:name="android.permission.BLUETOOTH_ADMIN"
        android:maxSdkVersion="30" />

    <!-- Polar SDK needs the fine location permission to get results for Bluetooth scan. Request
    fine location permission on devices with API 30 (Android Q). Note, if your application 
    needs location for other purposes than bluetooth then remove android:maxSdkVersion="30"-->
    <uses-permission
        android:name="android.permission.ACCESS_FINE_LOCATION"
        android:maxSdkVersion="30" />

    <!-- The coarse location permission is needed, if fine location permission is requested. Request
      coarse location permission on devices with API 30 (Android Q). Note, if your application 
    needs location for other purposes than bluetooth then remove android:maxSdkVersion="30" -->
    <uses-permission
        android:name="android.permission.ACCESS_COARSE_LOCATION"
        android:maxSdkVersion="30" />

    <application ...>
</manifest>
```

:::note
The first time the app starts, make sure to allow it to access the phone location. This is necessary to use BLE on Android.
:::

## iOS Integration

See the official Polar description of [iOS: Getting started](https://github.com/polarofficial/polar-ble-sdk#ios-getting-started).

Requires iOS 14 or later. Hence, in your `Podfile` in the `ios` folder of your app, make sure that the platform is set to `14.0`.

```ruby title="ios/Podfile" ins={1}
platform :ios, '14.0'
```

* In your project target settings enable "Background Modes", add "Uses Bluetooth LE Accessories".
* In your project target property list add the key [`NSBluetoothAlwaysUsageDescription`](https://developer.apple.com/documentation/bundleresources/information_property_list/nsbluetoothalwaysusagedescription).

Add this permission in the `Info.plist` file located in `ios/Runner`:

```xml title="ios/Runner/Info.plist" ins={4-9}
<plist version="1.0">
<dict>
    ...
    <key>NSBluetoothAlwaysUsageDescription</key>
    <string>Uses bluetooth to connect to the Polar device</string>
    <key>UIBackgroundModes</key>
    <array>
      <string>bluetooth-central</string>
    </array>
</dict>
</plist>
```
