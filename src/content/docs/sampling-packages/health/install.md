---
title: "Install Health"
description: "Apple Health and Google Health Connect data."
sidebar:
  label: Install
  order: 1
---

To use this package, add the following to your `pubspec.yaml` file. Note that this package only works together with `carp_mobile_sensing`.

```dart
dependencies:
  carp_core: ^latest
  carp_mobile_sensing: ^latest
  carp_health_package: ^latest
  ...
```

Then, follow the setup guides in the [health](https://pub.dev/packages/health#setup) plugin.

:::caution
There are quite a lot of details to getting the Health plugin to work, including handling permissions.
For example, on Android, if the user denies access to the health data types TWICE, then the permissions are permanently denied and the app cannot ask anymore
In this case, the app cannot be used to request permissions. Instead, the user must manually go to the settings of the phone and enable the permissions. So make sure to follow the guideline carefully.
:::

## Android Integration

This sampling package **only** supports Google [Health Connect](https://health.google/health-connect-android/). To configure your app to use Health Connect, follow the documentation on the [`health`](https://pub.dev/packages/health#google-health-connect-android) package and on the [Android Developer page](https://developer.android.com/guide/health-and-fitness/health-connect/get-started).

:::danger
Health Connect requires API level 34 and quite some edits to the `Manifest.xml` file, including declaring permissions to **all** the health data types you want to access. You also need to update `MainActivity.kt` to use `FlutterFragmentActivity`.
Read more on [Health Connect data types and permissions](https://developer.android.com/health-and-fitness/guides/health-connect/plan/data-types). If you are targeting SDK levels < 34 make sure to install the Health Connect app. Read more on the ["Get started with Health Connect "](https://developer.android.com/health-and-fitness/guides/health-connect/develop/get-started) page.
:::

```xml title="android/app/src/main/AndroidManifest.xml" ins={5-11,15-17,29-32}
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="dk.cachet.carp_mobile_sensing_app"
    xmlns:tools="http://schemas.android.com/tools">

    <!-- Check whether Health Connect is installed or not -->
    <queries>
        <package android:name="com.google.android.apps.healthdata" />
        <intent>
            <action android:name="androidx.health.ACTION_SHOW_PERMISSIONS_RATIONALE" />
        </intent>
    </queries>    

    ...

     <!-- Permissions for Health Connect -->
    <uses-permission android:name="android.permission.health.READ_STEPS"/>
    <uses-permission android:name="android.permission.health.READ_WEIGHT"/>

    ...

   <application
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:launchMode="singleTop"

            ...

            <!-- Intention to show Permissions screen for Health Connect API -->
            <intent-filter>
                <action android:name="androidx.health.ACTION_SHOW_PERMISSIONS_RATIONALE" />
            </intent-filter>
        </activity>
```

## iOS Integration

See the setup guide for iOS in the [health](https://pub.dev/packages/health#apple-health-ios) package.

Add this permission in the `Info.plist` file located in `ios/Runner`:

```xml title="ios/Runner/Info.plist" ins={4-7}
<plist version="1.0">
<dict>
    ...
    <key>NSHealthShareUsageDescription</key>
    <string>We will sync your data with the Apple Health app to give you better insights</string>
    <key>NSHealthUpdateUsageDescription</key>
    <string>We will sync your data with the Apple Health app to give you better insights</string>
</dict>
</plist>
```

Then open your Flutter project in XCode by right clicking on the `ios` folder and selecting "Open in XCode". Enable "HealthKit" by adding a capability inside the "Signing & Capabilities" tab of the Runner target's settings.
