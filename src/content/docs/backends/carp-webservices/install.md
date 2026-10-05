---
title: "Install the CAWS Client"
description: "Dart client for CARP Web Services (CAWS)."
sidebar:
  label: Install
  order: 1
---

1. You need a CARP Web Service (CAWS) host running. See the [CARP Web Service GitHub](https://github.com/cph-cachet/carp.webservices-docker) repro and documentation for how to do this. If you're part of the [CARP](https://carp.cachet.dk/) team, you can use the specified test, staging, and production servers.

1. Add `carp_services` as a [dependency in your pubspec.yaml file](https://flutter.io/platform-plugins/).

This package uses the [oidc](https://pub.dev/packages/oidc) plugin for authentication. Please follow their [getting started](https://bdaya-dev.github.io/oidc/oidc-getting-started/) guide and take a look at their [example app](https://github.com/Bdaya-Dev/oidc/tree/main/packages/oidc/example).

## Android

On Android you need to edit both the `build.gradle` file and the `AndroidManifest.xml` file plus disable some backup settings.
You also need to add an activity to the `AndroidManifest.xml` to allow for redirection to/from the web view for authentication (if you are using the `authenticate()` or `authenticateWithMagicLink` methods in the package). You manifest file would look something like this:

```xml title="android/app/src/main/AndroidManifest.xml" ins={8-28,30-40}
...

<application
  android:name="${applicationName}"
  android:label="CAWS Example"
  android:icon="@mipmap/ic_launcher">

<!-- Used by authentication redirect to/from web view -->
<activity
  android:name="net.openid.appauth.RedirectUriReceiverActivity"
  android:theme="@style/Theme.AppCompat.NoActionBar"
  android:exported="true"
  tools:node="replace">
  <intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="carp-studies-auth" android:pathPrefix="/auth" />
  </intent-filter>
  <intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="http" />
    <data android:host="carp.computerome.dk" />
    <data android:pathPrefix="/auth" />
  </intent-filter>
</activity>

<!-- Used by authentication redirect to/from web view for anonymous users -->
<activity
  android:name="com.linusu.flutter_web_auth_2.CallbackActivity"
  android:exported="true">
  <intent-filter android:label="flutter_web_auth_2">
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="caws-example-app" android:pathPrefix="/" />
  </intent-filter>
</activity>
  </application>
```

## iOS

Add the following `CFBundleURLTypes` entry in your `Info.plist` file:

```xml title="ios/Runner/Info.plist" ins={4-15}
<plist version="1.0">
<dict>
    ...
    <key>CFBundleURLTypes</key>
    <array>
        <dict>
            <key>CFBundleTypeRole</key>
            <string>Editor</string>
            <key>CFBundleURLSchemes</key>
            <array>
                <string>com.my.app</string>
                <string>my-redirect-uri</string>
            </array>
        </dict>
    </array>
</dict>
</plist>
```

Replace `com.my.app` with your application id and `my-redirect-url` with your redirect uri.
