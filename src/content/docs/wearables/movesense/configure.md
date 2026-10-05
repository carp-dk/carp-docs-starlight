---
title: "Configure Movesense"
description: "Movesense sensors."
sidebar:
  label: Configure
  order: 2
---

## Using it

To use this package, import it into your app together with the [`carp_mobile_sensing`](https://pub.dev/packages/carp_mobile_sensing) package:

```dart
import 'package:carp_core/carp_core.dart';
import 'package:carp_mobile_sensing/carp_mobile_sensing.dart';
import 'package:carp_movesense_package/carp_movesense_package.dart';
```

Collection of Movesense measures can be added to a study protocol like this.

```dart
// Create a study protocol
StudyProtocol protocol = StudyProtocol(
  ownerId: 'owner@dtu.dk',
  name: 'Movesense Sensing Example',
);

// Define which devices are used for data collection - both phone and eSense
// and add them to the protocol.
var phone = Smartphone();
var movesense = MovesenseDevice();

protocol
  ..addPrimaryDevice(phone)
  ..addConnectedDevice(movesense, phone);

// Add a background task that immediately starts collecting HR and ECG data
// from the Movesense device.
protocol.addTaskControl(
  ImmediateTrigger(),
  BackgroundTask(
    measures: [
      Measure(type: MovesenseSamplingPackage.HR),
      Measure(type: MovesenseSamplingPackage.ECG),
    ],
  ),
  movesense,
);
````

Before executing a study with an Movesense measure, register this package in the [`SamplingPackageRegistry`](https://pub.dev/documentation/carp_mobile_sensing/latest/runtime/SamplingPackageRegistry-class.html).

```dart
SamplingPackageRegistry().register(MovesenseSamplingPackage());
```

Use the [`MovesenseDeviceManager`](https://pub.dev/documentation/carp_movesense_package/latest/carp_movesense_package/MovesenseDeviceManager-class.html) to connect to the device using the `connect` method. The connect method uses the `bleAddress` to identify the Movesense device, which is typically on the form "Movesense 220330000122". You should set the BLE address before trying to connect.

:::caution
The package does not handle permissions for Bluetooth scanning / connectivity. This should be handled on an app level.
:::

## Known Limitations

### State Events

There is currently a hardware limitation in the Movesense device and only **one** movement state (movement, tap, double_tap, free_fall) can be subscribed at the same time.
See issue [#15](https://github.com/petri-lipponen-movesense/mdsflutter/issues/15).
Therefore the `MovesenseStateChangeProbe` is only able to collect single tap events and the `STATE` measure hence only reports on single tap events.

### Unstable Subscriptions

When subscribing to multiple high-frequency measures - like HR, ECG, IMU - these subscriptions may time out with an error code `408`. This is probably because the Movesense hardware can't keep up with streaming all the data. So, if you need to stream multiple streams of data, you would often need to reconnect to the device, even multiple times. See also this [thread on stackoverflow](https://stackoverflow.com/questions/78074167/getting-error-status-408-when-subscribing-to-a-movesense-device).
