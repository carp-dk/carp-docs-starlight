---
title: "Install Connectivity"
description: "Bluetooth, Wi-Fi and connectivity."
sidebar:
  label: Install
  order: 1
---

To use this package, add the following to your `pubspec.yaml` file. Note that this package only works together with [`carp_mobile_sensing`](https://pub.dev/packages/carp_mobile_sensing).

```dart
dependencies:
  flutter:
    sdk: flutter
  carp_mobile_sensing: ^latest
  carp_connectivity_package: ^latest
  ...
```

## Android

As explained in the Android [Wi-Fi scanning overview](https://developer.android.com/guide/topics/connectivity/wifi-scan), access to wifi information requires location access and wifi access permissions.
As explained in the [dchs_flutter_beacon](https://pub.dev/packages/dchs_flutter_beacon#setup-specific-for-android) plugin, access to iBeacons requires location access and Bluetooth access permissions.
In summary, you should add the following to your app's `AndroidManifest.xml` file located in `android/app/src/main`:

````xml
<!-- Required for accessing location information -->
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />

<!-- Optional: background scanning -->
<uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />

<!-- Required for accessing network information -->
<uses-permission android:name="android.permission.CHANGE_WIFI_STATE"/>
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>

<!-- Required for BLE scanning on Android 12+ (API 31+) -->
<uses-permission android:name="android.permission.BLUETOOTH_SCAN" />

<!-- Recommended when checking Bluetooth state or prompting the user to enable Bluetooth -->
<uses-permission android:name="android.permission.BLUETOOTH_CONNECT" />
````

:::caution
Connectivity changes are **not** communicated to Android apps in the background starting with Android 8 (SDK 26). Hence, connectivity status is only collected when your app is resumed.
:::

## iOS

Access to network information on iOS is highly restricted.
From iOS >= 13 there is no longer direct access to wifi information.
See the [network_info_plus](https://pub.dev/packages/network_info_plus#ios) description
and the [iOS](https://developer.apple.com/documentation/systemconfiguration/1614126-cncopycurrentnetworkinfo) description.

To enable bluetooth tracking, add these permissions in the `Info.plist` file located in `ios/Runner`:

````xml
<!-- Bluetooth Privacy -->
<!-- for iOS 13 + -->
<key>NSBluetoothAlwaysUsageDescription</key>
<string>Reason why app needs bluetooth</string>
<key>UIBackgroundModes</key>
  <array>
  <string>bluetooth-central</string>
  <string>bluetooth-peripheral</string>
  <string>external-accessory</string>
  <string>fetch</string>
</array>
````

:::note
On iOS, it is [impossible to do a general Bluetooth scan when the screen is off or the app is in background](https://developer.apple.com/forums/thread/652592). This will simply result in an empty scan. Hence, bluetooth devices are only collected when the app is in the foreground.
:::

To collect iBeacon measurements, please follow the setup described in the [dchs_flutter_beacon](https://pub.dev/packages/dchs_flutter_beacon) plugin. Especially, for iOS you need permissions to access location information in the `Info.plist` file:

````xml
<!-- When in use -->
<key>NSLocationWhenInUseUsageDescription</key>
<string>Reason why app needs location</string>
<!-- Always -->
<!-- for iOS 11 + -->
<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
<string>Reason why app needs location</string>
<!-- for iOS 9/10 -->
<key>NSLocationAlwaysUsageDescription</key>
<string>Reason why app needs location</string>
````
