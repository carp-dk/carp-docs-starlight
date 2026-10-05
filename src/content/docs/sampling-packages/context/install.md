---
title: "Install Context"
description: "Location, activity, geofence, weather and air quality."
sidebar:
  label: Install
  order: 1
---

## Add the package

To use this package, add the following to your `pubspec.yaml` file. Note that this package only works together with [`carp_mobile_sensing`](https://pub.dev/packages/carp_mobile_sensing).

```dart
dependencies:
  carp_mobile_sensing: ^latest
  carp_context_package: ^latest
  ...
```

## Permissions

This context package makes use of what Apple and Google denote as sensitive information, especially location and physical activity. Therefore it is important to configure the app to access this information. Please read carefully the [**instructions on how to set up the permission_handler plugin**](https://github.com/carp-dk/carp.sensing-flutter/tree/main/packages/carp_context_package/ https://pub.dev/packages/permission_handler#setup) - both for Android and iOS.

:::caution
This context package **DOES NOT** ask for location access. This should be done by the app since the app should (according to the Apple and Google guidelines) tell the user why location is accessed. The Android Developers documentation contains a good description of how to [request location access at runtime](https://developer.android.com/develop/sensors-and-location/location/permissions#request-location-access-runtime).
:::

### Android

Add the following to your app's `AndroidManifest.xml` file located in `android/app/src/main`:

````xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="<your_package_name>"
    xmlns:tools="http://schemas.android.com/tools">

   ...
   
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE_LOCATION" />

</manifest>
````

:::note
For Android 14 (API 34 and later) [foreground service types are required](https://developer.android.com/about/versions/14/changes/fgs-types-required) and you should add

`<uses-permission android:name="android.permission.FOREGROUND_SERVICE_LOCATION" />`
:::

:::note
The permissions needed for activity recognition (`ACTIVITY_RECOGNITION` and the pre-Android 10 `com.google.android.gms.permission.ACTIVITY_RECOGNITION`), plus the broadcast receiver and foreground service the activity recognition relies on, are declared by the [`activity_recognition_flutter`](https://pub.dev/packages/activity_recognition_flutter) plugin itself and merged into your app's manifest. You do **not** need to add them yourself.

The `ACTIVITY_RECOGNITION` runtime permission is still requested by CARP Mobile Sensing when a study using the `ACTIVITY` measure is deployed. See [Privacy changes in Android 10](https://developer.android.com/about/versions/10/privacy/changes#physical-activity-recognition).
:::

### iOS

In order to use Location and Activity Recognition, you need to set your minimum deployment target to iOS 15.0 or later. Furthermore, you need to enable the macros from the [permission_handler](https://github.com/carp-dk/carp.sensing-flutter/tree/main/packages/carp_context_package/ https://pub.dev/packages/permission_handler#setup) plugin. Please see the [setup instructions](https://github.com/carp-dk/carp.sensing-flutter/tree/main/packages/carp_context_package/ https://pub.dev/packages/permission_handler#setup) for iOS.

:::caution
The [`activity_recognition_flutter`](https://pub.dev/packages/activity_recognition_flutter) plugin used for the `ACTIVITY` measure ships its iOS side as a Swift package only - CocoaPods is not supported. Your app therefore has to use [Swift Package Manager](https://docs.flutter.dev/packages-and-plugins/swift-package-manager/for-app-developers), which is enabled by default from Flutter 3.44. If you have turned it off, re-enable it with:

```sh
flutter config --enable-swift-package-manager
```
:::

:::note
Do **not** ask for the activity recognition permission via the `permission_handler` plugin on iOS. It is not needed there and will make the app crash. CARP Mobile Sensing only requests it on Android.
:::

Change the `post_install` part of your `ios/Podfile`:

```ruby title="ios/Podfile" ins={1,10,18-26}
platform :ios, '15.0'


...

post_install do |installer|
  installer.generated_projects.each do |project|
    project.targets.each do |target|
      target.build_configurations.each do |config|
          config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '15.0'
      end
    end
  end
  installer.pods_project.targets.each do |target|
    flutter_additional_ios_build_settings(target)

    target.build_configurations.each do |config|
      config.build_settings['GCC_PREPROCESSOR_DEFINITIONS'] ||= [
        '$(inherited)',
        # See https://pub.dev/packages/permission_handler#setup - under iOS setup

        # The context package uses the following permissions:
        'PERMISSION_LOCATION=1',      # Location access
        'PERMISSION_NOTIFICATIONS=1', # CARP Mobile Sensing uses notifications
        'PERMISSION_SENSORS=1',       # Core Motion sensors on iOS (pedometer)
      ]
    end
  end
end
```

Add the following permissions in the `Info.plist` file located in `ios/Runner` (use your own text for explanation in the `<string>` tags):

```xml title="ios/Runner/Info.plist" ins={4-16}
<plist version="1.0">
<dict>
    ...
    <key>NSLocationWhenInUseUsageDescription</key>
    <string>Uses the location API to record location.</string>
    <key>NSLocationAlwaysUsageDescription</key>
    <string>Uses the location API to record location.</string>
    <key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
    <string>Uses the location API to record location.</string>
    <key>NSMotionUsageDescription</key>
    <string>Detects activity.</string>
    <key>UIBackgroundModes</key>
      <array>
        <string>fetch</string>
        <string>location</string>
      </array>
</dict>
</plist>
```

Also - make sure to activate Background mode for your Runner. Open XCode and go to "Signing & Capabilities". Add the "Background Modes" section and add "Location updates" to the list:

![iOS Setup](https://raw.githubusercontent.com/wiki/rekab-app/background_locator/images/background_location_update.png)
