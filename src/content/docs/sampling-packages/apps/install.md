---
title: "Install Apps"
description: "Installed apps and app usage."
sidebar:
  label: Install
  order: 1
---

To use this package, add the following to your `pubspec.yaml` file. Note that this package only works together with `carp_mobile_sensing`.

```dart
dependencies:
  flutter:
    sdk: flutter
  carp_core: ^latest
  carp_mobile_sensing: ^latest
  carp_apps_package: ^latest
  ...
```

## Android Integration

Add the following to your app's `AndroidManifest.xml` file located in `android/app/src/main` such that it contains the following permission request:

````xml
<uses-permission android:name="android.permission.PACKAGE_USAGE_STATS" tools:ignore="ProtectedPermissions"/>
<uses-permission android:name="android.permission.QUERY_ALL_PACKAGES" />
````

Starting with Android 11, Android applications targeting API level 30, wanting to list "external" applications have to declare a new "normal" permission in their `AndroidManifest.xml` file called [`QUERY_ALL_PACKAGES`](https://developer.android.com/reference/kotlin/android/Manifest.permission#query_all_packages).

Starting from [May 5 2021](https://support.google.com/googleplay/android-developer/answer/10158779), Google will mark a breaking change on how applications requesting [`QUERY_ALL_PACKAGES`](https://developer.android.com/reference/kotlin/android/Manifest.permission#query_all_packages) are accepted in the Google Play. [Quoting from the doc](https://support.google.com/googleplay/android-developer/answer/10158779):

> Permitted use involves apps that must discover any and all installed apps on the device, for awareness or interoperability purposes may have eligibility for the permission. Permitted use includes; device search, antivirus apps, file managers, and browsers.
>
> Apps granted access to this permission must comply with the User Data policies, including the Prominent Disclosure and Consent requirements, and may not extend its use to undisclosed or invalid purposes.

## iOS Integration

Not supported.
