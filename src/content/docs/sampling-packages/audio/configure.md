---
title: "Configure Audio"
description: "Audio, video and noise."
sidebar:
  label: Configure
  order: 2
---

To use this package, import it into your app together with the
[`carp_mobile_sensing`](https://pub.dev/packages/carp_mobile_sensing) package:

```dart
import 'package:carp_core/carp_core.dart';
import 'package:carp_mobile_sensing/carp_mobile_sensing.dart';
import 'package:carp_audio_package/media.dart';
```

Before creating a study and running it, register this package in the [`SamplingPackageRegistry`](https://pub.dev/documentation/carp_mobile_sensing/latest/runtime/SamplingPackageRegistry-class.html).

```dart
SamplingPackageRegistry().register(MediaSamplingPackage());
```

The `noise` measure is [event-based](/carp-mobile-sensing/sampling-packages/available-packages/#measure-types), whereas the `audio`, `video`, and `image` measures are one-time measures. Using the measures from this package in a study protocol would look something like the following examples.

```dart
// Create a study protocol
StudyProtocol protocol = StudyProtocol(
  ownerId: 'owner@dtu.dk',
  name: 'Audio Sensing Example',
);

// Define which devices are used for data collection
// In this case, its only this smartphone
Smartphone phone = Smartphone();
protocol.addPrimaryDevice(phone);

// Add an task that immediately starts collecting noise.
protocol.addTaskControl(
    ImmediateTrigger(),
    BackgroundTask(measures: [
      Measure(type: MediaSamplingPackage.NOISE),
    ]),
    phone);
```

The default sampling configuration of `noise` is to sample every 5 minutes for 10 seconds.
This configuration can, however, be overridden like this:

```dart
// Collect noise, but change the default sampling configuration
protocol.addTaskControl(
    ImmediateTrigger(),
    BackgroundTask(measures: [
      Measure(type: MediaSamplingPackage.NOISE)
        ..overrideSamplingConfiguration = PeriodicSamplingConfiguration(
          interval: const Duration(seconds: 30),
          duration: const Duration(seconds: 5),
        ),
    ]),
    phone);
```

And `audio` measure is a one-time measure and must be started and stopped explicitly.
The following example show how this can be done:

```dart
// Sample an audio recording
var audioTask = BackgroundTask(measures: [
  Measure(type: MediaSamplingPackage.AUDIO),
]);

// Start the audio task after 20 secs and stop it after 40 secs
protocol
  ..addTaskControl(
    DelayedTrigger(delay: const Duration(seconds: 20)),
    audioTask,
    phone,
    Control.Start,
  )
  ..addTaskControl(
    DelayedTrigger(delay: const Duration(seconds: 40)),
    audioTask,
    phone,
    Control.Stop,
  );
```

:::caution
The `image` and `video` measures are not used in background sensing and hence do not have a probe associated. These measures are only used in a [`AppTask`](/carp-mobile-sensing/runtime/app-tasks/), i.e., a task done by the user.
:::
