---
title: "Configure Health"
description: "Apple Health and Google Health Connect data."
sidebar:
  label: Configure
  order: 2
---

To use this package, import it into your app together with the
[`carp_mobile_sensing`](https://pub.dev/packages/carp_mobile_sensing) package:

```dart
import 'package:carp_core/carp_core.dart';
import 'package:carp_mobile_sensing/carp_mobile_sensing.dart';
import 'package:carp_health_package/health_package.dart';
import 'package:health/health.dart';
```

Before creating a study and running it, register this package in the [`SamplingPackageRegistry`](https://pub.dev/documentation/carp_mobile_sensing/latest/runtime/SamplingPackageRegistry-class.html).

```dart
SamplingPackageRegistry().register(HealthSamplingPackage());
```

Now we can define a study protocol with a health device:

```dart
  // Create a study protocol
  StudyProtocol protocol = StudyProtocol(
    ownerId: 'owner@dtu.dk',
    name: 'Health Sensing Example',
  );

  // Define which devices are used for data collection.

  // First add this smartphone.
  final phone = Smartphone();
  protocol.addPrimaryDevice(phone);

  // Create and add a health service (device)
  final healthService = HealthService();
  protocol.addConnectedDevice(healthService, phone);
```

There are two ways to use the health package in a CAMS protocol:

* Defining a [**App Task**](/carp-mobile-sensing/runtime/app-tasks/) where the user is asked to collect his/her own health data
* Defining a [**Background Sensing Task**](/carp-mobile-sensing/domain/study-protocol/#defining-a-protocol), where health data is collected in the background

## Health App Task

Defining an app task to collect health data is done using the `HealthAppTask` task, like this:

```dart
// Create a health app task for the user to collect his own health data once per day
protocol.addTaskControl(
  PeriodicTrigger(period: Duration(hours: 24)),
  HealthAppTask(
    title: "Press here to collect your physical health data",
    description:
        "This will collect your weight, exercise time, steps, and sleep "
        "time from the Health database on the phone.",
    types: [
      HealthDataType.WEIGHT,
      HealthDataType.STEPS,
      HealthDataType.BASAL_ENERGY_BURNED,
      HealthDataType.SLEEP_SESSION,
    ],
  ),
  phone,
);
```

In this case, a user task will be added to the task list once per day and when the user clicks (start) this user task, the health data types specified in the list of `types` are collected. Once data collection is done, the user task is marked as done in the task list.

:::note
A `HealthAppTask` will ask the user to give permissions to collect the listed types, if not granted. This will open up the OS-level permission dialogue on both Android and iOS.
:::

## Background Sensing Task

Background sampling of health data can be configured by a measure in the protocol. This measure is created using the factory method `HealthSamplingPackage.getHealthMeasure()` that takes a list of of [`HealthDataType`](https://pub.dev/documentation/health/latest/health/HealthDataType.html) types.

```dart
// Automatically collect the set of health data every hour.
//
// Note that the [HealthSamplingConfiguration] is a [HistoricSamplingConfiguration]
// which samples data back in time until last time, data was sampled.
protocol.addTaskControl(
  PeriodicTrigger(period: Duration(minutes: 60)),
  BackgroundTask(
    measures: [
      HealthSamplingPackage.getHealthMeasure([
        HealthDataType.STEPS,
        HealthDataType.BASAL_ENERGY_BURNED,
        HealthDataType.WEIGHT,
        HealthDataType.SLEEP_SESSION,
      ]),
    ],
  ),
  healthService,
);

```

Background sensing of health data is done by the `HealthService` specified in the protocol above.

:::note
Background collection of health data **does not** ask for permissions (this will cause the app to show the Health permission dialogue at an arbitrary time to the user, which is not compliant to [the UX guidelines from Google](https://developer.android.com/health-and-fitness/guides/health-connect/design/permissions-and-data) and Apple to only show this dialogue in the context where the collection of health data is explained to the user). Handling of permissions should be done via the `HealthService` by using the `hasPermissions()` and `requestPermissions(()` methods.
:::

:::caution
Health data can only be collected when the app is in the foreground and the phone is unlocked. This applies both for Android and iOS. Hence, the term "background sensing" should be taken with a grain of salt.
:::

One way to ensure that health data is collected while the app is in foreground, is to add the collection of health measures to an App Task (e.g., a survey):

```dart
protocol.addTaskControl(
    RecurrentScheduledTrigger(
      type: RecurrentType.daily,
      time: TimeOfDay(hour: 13),
    ),
    RPAppTask(
        type: SurveyUserTask.SURVEY_TYPE,
        name: 'WHO-5 Survey',
        rpTask: who5Task,
        measures: [
          Measure(type: SensorSamplingPackage.AMBIENT_LIGHT),
          HealthSamplingPackage.getHealthMeasure([
            HealthDataType.HEART_RATE,
            HealthDataType.STEPS,
          ])
        ]),
    phone);
```

In this case, ambient light, heart rate and steps are collected as part of the user filling in a WHO-5 survey.

Another option is to use a [`AppLifecycleTrigger`](https://pub.dev/documentation/carp_mobile_sensing/latest/domain/AppLifecycleTrigger-class.html) which triggers data sampling when the app resumes, i.e., comes to the foreground.

```dart
// Automatically collect the set of health data when the app resumes, i.e. comes
// to the foreground.
//
// Note that the [HealthSamplingConfiguration] is a [HistoricSamplingConfiguration]
// which samples data back in time until last time, data was sampled.
protocol.addTaskControl(
  AppLifecycleTrigger({AppLifecycleState.resumed}),
  BackgroundTask(
    measures: [
      HealthSamplingPackage.getHealthMeasure([
        HealthDataType.STEPS,
        HealthDataType.BASAL_ENERGY_BURNED,
        HealthDataType.WEIGHT,
        HealthDataType.SLEEP_SESSION,
      ]),
    ],
  ),
  healthService,
);
```

## Configuration

The health measures are [one-time measures](/carp-mobile-sensing/sampling-packages/available-packages/#measure-types), which implies that health data is collected when the measure is triggered. In the examples above, this happens either when the user clicks the user task or periodically (once per hour). Configuration of what data to collect is done via the [`HealthSamplingConfiguration`](https://pub.dev/documentation/carp_health_package/latest/health_package/HealthSamplingConfiguration-class.html) which is used to override the default configuration (default is to collect nothing). The `getHealthMeasure()` factory method is a convenient way to create a `Measure` with the correct `HealthSamplingConfiguration`.

The `HealthSamplingConfiguration` can be configured to collect a set of [`HealthDataType`](https://pub.dev/documentation/health/latest/health/HealthDataType.html) data, like:

* BODY_FAT_PERCENTAGE,
* HEIGHT,
* WEIGHT,
* BODY_MASS_INDEX,
* WAIST_CIRCUMFERENCE,
* STEPS,
* ...

See the [`HealthDataType`](https://pub.dev/documentation/health/latest/health/HealthDataType.html) documentation for a complete list.

A `HealthSamplingConfiguration` is a [`HistoricSamplingConfiguration`](https://pub.dev/documentation/carp_mobile_sensing/latest/domain/HistoricSamplingConfiguration-class.html). This means that when triggered, the task and measure will try to collect data back to the last time data was collected. Hence, this measure is suited for configuration using some trigger that collects data on a regular basis, like the `PeriodicTrigger` used above.

See the `example.dart` file for a full example of how to set up a CAMS study protocol for this sampling package.
