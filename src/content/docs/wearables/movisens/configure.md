---
title: "Configure Movisens"
description: "Movisens Move, ECG and EDA sensors."
sidebar:
  label: Configure
  order: 2
---

To use this package, import it into your app together with the [`carp_mobile_sensing`](https://pub.dev/packages/carp_mobile_sensing) package:

```dart
import 'package:carp_core/carp_core.dart';
import 'package:carp_mobile_sensing/carp_mobile_sensing.dart';
import 'package:carp_movisens_package/carp_movisens_package.dart';
```

Before creating a study and running it, register this package in the [`SamplingPackageRegistry`](https://pub.dev/documentation/carp_mobile_sensing/latest/runtime/SamplingPackageRegistry-class.html).

```dart
 SamplingPackageRegistry().register(MovisensSamplingPackage());
```

Once the package is registered, Movisens measures can be added to a study protocol like this.

````dart
// Create a study protocol
var protocol = StudyProtocol(
  ownerId: 'owner@dtu.dk',
  name: 'Movisens Example',
);

// Define which devices are used for data collection - both phone and Movisens
// and add them to the protocol.
// Note that the Movisens device is added as a connected device to the phone.
var phone = Smartphone();
var movisens = MovisensDevice(
  sensorLocation: SensorLocation.Chest,
  sex: Sex.Male,
  height: 175,
  weight: 75,
  age: 25,
);

protocol
  ..addPrimaryDevice(phone)
  ..addConnectedDevice(movisens, phone);

// Adding a movisens measure
protocol.addTaskControl(
  ImmediateTrigger(),
  BackgroundTask(
    name: 'Movisens Task',
    measures: [Measure(type: MovisensSamplingPackage.ACTIVITY)],
  ),
  movisens,
);
````

This protocol collects physical activity data (steps, inclination, etc.) from a Movisens device.
The device's user parameters (sex, height, etc.) is used by the Movisens device to calculate the metabolic (MET) levels. These user parameters are transmitted to the device when connected. Hence, if you want to change or update these user parameters (e.g., based on input from the user using the phone), you should update the `MovisensDevice` device configuration **before** connecting to the device.

The default Movisens names of devices are `MOVISENS Sensor <serial>`, where `serial` is the 5-digit serial number written on the back of the device.
Once this protocol is deployed on a phone and connected to a Movisens device using Bluetooth, it will start to collect the physical activity data from the device.

Please see the [CARP Mobile Sensing App](https://github.com/carp-dk/carp.sensing-flutter/tree/main/apps/carp_mobile_sensing_app) for an example of how to build a mobile sensing app that can handle protocols and connect to devices.
