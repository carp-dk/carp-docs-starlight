---
title: "Configure Apps"
description: "Installed apps and app usage."
sidebar:
  label: Configure
  order: 2
---

To use this package, import it into your app together with the
[`carp_mobile_sensing`](https://pub.dev/packages/carp_mobile_sensing) package:

```dart
import 'package:carp_core/carp_core.dart';
import 'package:carp_mobile_sensing/carp_mobile_sensing.dart';
import 'package:carp_apps_package/apps.dart';
```

Before creating a study and running it, register this package in the
[`SamplingPackageRegistry`](https://pub.dev/documentation/carp_mobile_sensing/latest/runtime/SamplingPackageRegistry.html).

```dart
SamplingPackageRegistry().register(AppsSamplingPackage());
```

Collection of `APPS` and `APP_USAGE` measures can be added to a study protocol like this.

```dart
// Define which devices are used for data collection
// In this case, its only this smartphone
Smartphone phone = Smartphone();
protocol.addPrimaryDevice(phone);

// Add an background task that collects the list of installed apps
// and a log of app usage activity
protocol.addTaskControl(
    ImmediateTrigger(),
    BackgroundTask(measures: [
      Measure(type: AppsSamplingPackage.APPS),
      Measure(type: AppsSamplingPackage.APP_USAGE),
    ]),
    phone);
```

Note that both the `APPS` and the `APP_USAGE` are [one-time measures](/carp-mobile-sensing/sampling-packages/available-packages/#measure-types), and hence only collect a measurement once. If you want to collect app usage e.g., based on app lifecycle events, you could add this to the protocol:

```dart
// Add an background task that collects app usage activity when this app
// changes state to foreground.
protocol.addTaskControl(
  AppLifecycleTrigger({AppLifecycleState.resumed}),
  BackgroundTask(measures: [Measure(type: AppsSamplingPackage.APP_USAGE)]),
  phone,
);
```
