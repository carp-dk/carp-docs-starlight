---
title: "Configure eSense"
description: "eSense earables."
sidebar:
  label: Configure
  order: 2
---

To use this package, import it into your app together with the
[`carp_mobile_sensing`](https://pub.dev/packages/carp_mobile_sensing) package:

```dart
import 'package:carp_core/carp_core.dart';
import 'package:carp_mobile_sensing/carp_mobile_sensing.dart';
import 'package:carp_esense_package/esense.dart';
```

Before executing a study with an eSense measure, register this package in the [`SamplingPackageRegistry`](https://pub.dev/documentation/carp_mobile_sensing/latest/runtime/SamplingPackageRegistry-class.html).

```dart
SamplingPackageRegistry().register(ESenseSamplingPackage());
```

Collection of eSense measurements can be added to a study protocol like this.

```dart
// Create a study protocol
var protocol = StudyProtocol(
  ownerId: 'owner@dtu.dk',
  name: 'eSense Sensing Example',
);

// Define which devices are used for data collection - both phone and eSense
// and add them to the protocol.
var phone = Smartphone();
var eSense = ESenseDevice(samplingRate: 10);

protocol
  ..addPrimaryDevice(phone)
  ..addConnectedDevice(eSense, phone);

// Add a background task that immediately starts collecting eSense button and
// sensor events from the eSense device.
protocol.addTaskControl(
  ImmediateTrigger(),
  BackgroundTask(
    measures: [
      Measure(type: ESenseSamplingPackage.ESENSE_BUTTON),
      Measure(type: ESenseSamplingPackage.ESENSE_SENSOR),
    ],
  ),
  eSense,
);    
````

Connection to an eSense device happens via the `ESenseDeviceManager` calling the `connect` method. This method uses the `bleName` of the device to connect via BLE.

:::caution
The physical eSense device must be paired with the phone via BLE **before** CAMS can connect to it.
:::
