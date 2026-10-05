---
title: "Install Movesense"
description: "Movesense sensors."
sidebar:
  label: Install
  order: 1
---

To use this package, add the following to you `pubspec.yaml` file. Note that this package only works together with `carp_mobile_sensing`.

```dart
dependencies:
  carp_core: ^latest
  carp_mobile_sensing: ^latest
  carp_movesense_package: ^latest
  ...
```

Unlike previous (`mdsflutter`-based) versions, the underlying `carp_movesense_flutter` plugin **bundles the native Movesense MDS libraries** for both Android and iOS. This means you no longer have to download and vendor the Movesense SDK yourself. The remaining setup below only concerns Bluetooth permissions.

## Android

The Movesense `mdslib` `.aar` is bundled inside the `carp_movesense_flutter` plugin, so **no manual `.aar` download or `flatDir` repository is required** anymore. The plugin also declares the Bluetooth permissions it needs (`BLUETOOTH_SCAN`, `BLUETOOTH_CONNECT`, and — on Android 11 and lower — `ACCESS_FINE_LOCATION`) in its own manifest, and these are merged into your app automatically. The plugin requires a minimum Android SDK of `24`.

:::caution
The package does not *request* runtime permissions. On the first run, make sure your app requests the Bluetooth (and, on Android 11 and lower, location) permissions. Location access is necessary to use BLE on older Android versions.
:::

## iOS

The Movesense `MovesenseMDS.xcframework` is bundled inside the `carp_movesense_flutter` plugin, so **no manual `pod 'Movesense', :git => ...` entry is required** in your `Podfile` anymore. The plugin targets a minimum deployment of iOS 15.0.

:::note
Because the bundled framework is statically linked, some app setups still need `use_frameworks! :linkage => :static` (and `use_modular_headers!`) in the `Podfile`. If you hit linker/module errors, add these flags to your `Runner` target.
:::

Add the permission to access bluetooth in the background by adding this to the `Info.plist` file located in `ios/Runner`:

```xml title="ios/Runner/Info.plist" ins={4-9}
<plist version="1.0">
<dict>
    ...
    <key>NSBluetoothAlwaysUsageDescription</key>
    <string>Uses bluetooth to connect to the Movesense device</string>
    <key>UIBackgroundModes</key>
    <array>
      <string>bluetooth-central</string>
    </array>
</dict>
</plist>
```
