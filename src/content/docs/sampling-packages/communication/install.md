---
title: "Install Communication"
description: "Phone and text message logs."
sidebar:
  label: Install
  order: 1
---

To use this package, add the following to your `pubspec.yaml` file. Note that
this package only works together with `carp_mobile_sensing`.

```yaml
dependencies:
  carp_mobile_sensing: ^latest
  carp_communication_package: ^latest
  ...
```

## Android Integration

Add the following to your app's `AndroidManifest.xml` file located in `android/app/src/main`:

````xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
  package="<your_package_name>"
  xmlns:tools="http://schemas.android.com/tools">

  ...
   
  <!-- The following permissions are used in the CARP Communication Package -->
  <uses-permission android:name="android.permission.CALL_PHONE"/>
  <uses-permission android:name="android.permission.READ_PHONE_STATE"/>
  <uses-permission android:name="android.permission.READ_PHONE_NUMBERS"/>
  <uses-permission android:name="android.permission.READ_SMS"/>
  <uses-permission android:name="android.permission.RECEIVE_SMS"/>
  <uses-permission android:name="android.permission.READ_CALENDAR"/>
  <!-- Even though we only want to READ the calendar, for some unknown 
       reason we also need to add the WRITE permission. -->
  <uses-permission android:name="android.permission.WRITE_CALENDAR"/>


  <application>
   ...
   ...
    <!-- Registration of broadcast receiver to listen to SMS messages 
         when the app is in the background -->
   <receiver android:name="com.shounakmulay.telephony.sms.IncomingSmsReceiver"
     android:permission="android.permission.BROADCAST_SMS" android:exported="true">
    <intent-filter>
        <action android:name="android.provider.Telephony.SMS_RECEIVED"/>
      </intent-filter>
    </receiver>

   </application>
</manifest>
````

## iOS Integration

Add this permission in the `Info.plist` file located in `ios/Runner`:

```xml title="ios/Runner/Info.plist" ins={4-10}
<plist version="1.0">
<dict>
    ...
    <!-- iOS 10–16 (legacy key, still valid) -->
    <key>NSCalendarsUsageDescription</key>
    <string>INSERT_REASON_HERE</string>

    <!-- iOS 17+ -->
    <key>NSCalendarsFullAccessUsageDescription</key>
    <string>INSERT_REASON_HERE</string>
</dict>
</plist>
```
