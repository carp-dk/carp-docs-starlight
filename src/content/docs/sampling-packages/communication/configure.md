---
title: "Configure Communication"
description: "Phone and text message logs."
sidebar:
  label: Configure
  order: 2
---

To use this package, import it into your app together with the
[`carp_mobile_sensing`](https://pub.dev/packages/carp_mobile_sensing) package:

```dart
import 'package:carp_core/carp_core.dart';
import 'package:carp_mobile_sensing/carp_mobile_sensing.dart';
import 'package:carp_communication_package/communication.dart';
```

Before creating a study and running it, register this package in the [`SamplingPackageRegistry`](https://pub.dev/documentation/carp_mobile_sensing/latest/runtime/SamplingPackageRegistry-class.html).

```dart
SamplingPackageRegistry().register(CommunicationSamplingPackage());
```

Collection of communication measures can be added to a study protocol as shown below.
Note that `TEXT_MESSAGE` is an [event-based measure](/carp-mobile-sensing/sampling-packages/available-packages/#measure-types) collected whenever a new text messages is received, whereas the other measures are [one-time measures](/carp-mobile-sensing/sampling-packages/available-packages/#measure-types), which can be fetched using different triggers (in the protocol below, this is done periodically).

```dart
// Create a study protocol
StudyProtocol protocol = StudyProtocol(
  ownerId: 'owner@dtu.dk',
  name: 'Communication Sensing Example',
);

// Define which devices are used for data collection
// In this case, it is only this smartphone
Smartphone phone = Smartphone();
protocol.addPrimaryDevice(phone);

// Add an automatic task that collects incoming SMS messages
protocol.addTaskControl(
    ImmediateTrigger(),
    BackgroundTask(
        measures: [Measure(type: CommunicationSamplingPackage.TEXT_MESSAGE)]),
    phone);

// Add an automatic task that every 3 hour collects the logs for:
//  * in/out SMS
//  * in/out phone calls
//  * calendar entries
protocol.addTaskControl(
    PeriodicTrigger(period: const Duration(hours: 3)),
    BackgroundTask(measures: [
      Measure(type: CommunicationSamplingPackage.PHONE_LOG),
      Measure(type: CommunicationSamplingPackage.TEXT_MESSAGE_LOG),
      Measure(type: CommunicationSamplingPackage.CALENDAR),
    ]),
    phone);
```

All the log measures (`PHONE_LOG`, `TEXT_MESSAGE_LOG`, `CALENDAR`) collects data using a [`HistoricSamplingConfiguration`](https://pub.dev/documentation/carp_mobile_sensing/latest/domain/HistoricSamplingConfiguration-class.html) which per default collects all data back to the last time, data was collected. Restriction on the history ("past") of data collection can be overridden, like this:

```dart
// Add an background task that collects the calendar entries for the past 7 
// days (max), every time the app is resumed i.e. come to the foreground).
protocol.addTaskControl(
    AppLifecycleTrigger({AppLifecycleState.resumed}),
    BackgroundTask(measures: [
      Measure(type: CommunicationSamplingPackage.CALENDAR)
        ..overrideSamplingConfiguration =
            HistoricSamplingConfiguration(past: const Duration(days: 7)),
    ]),
    phone);
```
