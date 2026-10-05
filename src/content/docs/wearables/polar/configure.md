---
title: "Configure Polar"
description: "Polar heart rate monitors and sensors."
sidebar:
  label: Configure
  order: 2
---

To use this package, import it into your app together with the [`carp_mobile_sensing`](https://pub.dev/packages/carp_mobile_sensing) package:

```dart
import 'package:carp_core/carp_core.dart';
import 'package:carp_mobile_sensing/carp_mobile_sensing.dart';
import 'package:carp_polar_package/carp_polar_package.dart';
```

Collection of Polar measures can be added to a study protocol like this.

```dart
// Create a study protocol
var protocol = StudyProtocol(
  ownerId: 'owner@dtu.dk',
  name: 'Polar Sensing Example',
);

// Define which devices are used for data collection - both phone and polar device
// and add them to the protocol.
var phone = Smartphone();
var polar = PolarDevice(roleName: 'hr-sensor');

protocol
  ..addPrimaryDevice(phone)
  ..addConnectedDevice(polar, phone);

// Add a background task that immediately starts collecting HR and ECG data
// from the Polar device.
protocol.addTaskControl(
  ImmediateTrigger(),
  BackgroundTask(
    measures: [
      Measure(type: PolarSamplingPackage.HR),
      Measure(type: PolarSamplingPackage.ECG),
    ],
  ),
  polar,
);
````

Before executing a study with an Polar measure, register this package in the [`SamplingPackageRegistry`](https://pub.dev/documentation/carp_mobile_sensing/latest/runtime/SamplingPackageRegistry-class.html).

```dart
SamplingPackageRegistry().register(PolarSamplingPackage());
```

Use the [`PolarDeviceManager`](https://pub.dev/documentation/carp_polar_package/latest/carp_polar_package/PolarDeviceManager-class.html) to connect to the device using the [`connect`](https://pub.dev/documentation/carp_polar_package/latest/carp_polar_package/PolarDeviceManager/connect.html) method. The connect method uses the [`polarIdentifier`](https://pub.dev/documentation/carp_polar_package/latest/carp_polar_package/PolarDeviceManager/polarIdentifier.html) to identify the Polar device, which is printed on the sensor/device - typically on the form "B34B4B56". On iOS, a UUID is used. You should set the id before trying to connect.

:::caution
The package does not handle permissions for Bluetooth scanning / connectivity. This should be handled on an app level.
:::
