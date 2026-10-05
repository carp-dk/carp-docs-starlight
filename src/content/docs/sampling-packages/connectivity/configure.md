---
title: "Configure Connectivity"
description: "Bluetooth, Wi-Fi and connectivity."
sidebar:
  label: Configure
  order: 2
---

To use this package, import it into your app together with the
[`carp_mobile_sensing`](https://pub.dev/packages/carp_mobile_sensing) package:

```dart
import 'package:carp_core/carp_core.dart';
import 'package:carp_mobile_sensing/carp_mobile_sensing.dart';
import 'package:carp_connectivity_package/connectivity.dart';
```

Before creating a study and running it, register this package in the
[`SamplingPackageRegistry`](https://pub.dev/documentation/carp_mobile_sensing/latest/runtime/SamplingPackageRegistry-class.html).

```dart
SamplingPackageRegistry().register(ConnectivitySamplingPackage());
```

Collection of connectivity measures can be added to a study protocol like this.

```dart
// Create a study protocol
StudyProtocol protocol = StudyProtocol(
  ownerId: 'owner@dtu.dk',
  name: 'Connectivity Sensing Example',
);

// Define which devices are used for data collection
// In this case, its only this smartphone
Smartphone phone = Smartphone();
protocol.addPrimaryDevice(phone);

// Add an automatic task that immediately starts collecting connectivity,
// wifi information, and nearby bluetooth devices.
protocol.addTaskControl(
    ImmediateTrigger(),
    BackgroundTask(measures: [
      Measure(type: ConnectivitySamplingPackage.CONNECTIVITY),
      Measure(type: ConnectivitySamplingPackage.WIFI),
      Measure(type: ConnectivitySamplingPackage.BLUETOOTH),
    ]),
    phone);
```

The [`BluetoothScanPeriodicSamplingConfiguration`](https://pub.dev/documentation/carp_connectivity_package/latest/connectivity/BluetoothScanPeriodicSamplingConfiguration-class.html) configuration can be used to specify how Bluetooth scanning is to take place:

```dart
protocol.addTaskControl(
    ImmediateTrigger(),
    BackgroundTask(measures: [
      Measure(
          type: ConnectivitySamplingPackage.BLUETOOTH,
          samplingConfiguration: BluetoothScanPeriodicSamplingConfiguration(
            interval: const Duration(minutes: 20),
            duration: const Duration(seconds: 15),
            withRemoteIds: ['123', '456'],
            withServices: ['service1', 'service2'],
          ))
    ]),
    phone);
```

The default configuration scans every 10 minutes for 10 seconds, and does not specify any remote IDs or services.

Scanning for iBeacons is configured by the [`BeaconRangingPeriodicSamplingConfiguration`](https://pub.dev/documentation/carp_connectivity_package/latest/connectivity/BeaconRangingPeriodicSamplingConfiguration-class.html).
The following example will scan for iBeacons in the specified regions which are closer than 2 meters. The regions are specified by their identifier and UUID. See the [dchs_flutter_beacon](https://pub.dev/packages/dchs_flutter_beacon) plugin for more information on how to set up iBeacon regions.

```dart
  protocol.addTaskControl(
      ImmediateTrigger(),
      BackgroundTask(measures: [
        Measure(
            type: ConnectivitySamplingPackage.BEACON,
            samplingConfiguration: BeaconRangingPeriodicSamplingConfiguration(
              beaconDistance: 2, 
              beaconRegions: [
                BeaconRegion(
                  identifier: 'region1',
                  uuid: '12345678-1234-1234-1234-123456789012',
                ),
                BeaconRegion(
                  identifier: 'region2',
                  uuid: '12345678-1234-1234-1234-123456789012',
                ),
              ],
            ))
      ]),
      phone);
```

:::caution
There is no default sampling configuration for iBeacons. You need to specify at least one region to scan for.
:::
