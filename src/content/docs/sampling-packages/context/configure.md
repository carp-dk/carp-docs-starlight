---
title: "Configure Context"
description: "Location, activity, geofence, weather and air quality."
sidebar:
  label: Configure
  order: 2
---

To use this package, import it into your app together with the
[`carp_mobile_sensing`](https://pub.dev/packages/carp_mobile_sensing) package:

```dart
import 'package:carp_core/carp_core.dart';
import 'package:carp_mobile_sensing/carp_mobile_sensing.dart';
import 'package:carp_context_package/carp_context_package.dart';
```

Before creating a study and running it, register this package in the [`SamplingPackageRegistry`](https://pub.dev/documentation/carp_mobile_sensing/latest/runtime/SamplingPackageRegistry-class.html).

````dart
SamplingPackageRegistry().register(ContextSamplingPackage());
````

The context package uses different "services" (incl. the phone itself) to collect data.

## Activity Measure

The `ACTIVITY` measure uses the phone itself and can be added like this:

```dart
// Create a study protocol
StudyProtocol protocol = StudyProtocol(
  ownerId: 'owner@dtu.dk',
  name: 'Context Sensing Example',
);

// Define the smartphone as the master device.
Smartphone phone = Smartphone();
protocol.addMasterDevice(phone);

// Add a background task that collects activity data from the phone
protocol.addTaskControl(
    ImmediateTrigger(),
    BackgroundTask(measures: [
      Measure(type: ContextSamplingPackage.ACTIVITY),
    ]),
    phone);
```

Each collected `Activity` holds the recognized `ActivityType` (`IN_VEHICLE`, `ON_BICYCLE`, `ON_FOOT`, `RUNNING`, `STILL`, or `WALKING`) and the `confidence` of the recognition in percent (0-100).

Since the activity recognition on both Android and iOS generates a lot of 'useless' events, the following events are discarded and never collected:

* `UNKNOWN` - when the activity cannot be recognized
* `TILTING` - when the phone is tilted (only on Android)
* activities recognized with a confidence below 50%

## Location Measures

All of the location-based measures;

* `LOCATION`
* `GEOFENCE`
* `MOBILITY`

use the `LocationService` service as a "connected device" to collect data and can be added to a protocol like this:

```dart
// Define the online location service and add it as a 'connected device'
final locationService = LocationService(
    accuracy: GeolocationAccuracy.high,
    distance: 10,
    interval: const Duration(minutes: 1));

protocol.addConnectedDevice(locationService, phone);

// Add a background task that continuously collects location and mobility
// patterns. Delays sampling by 5 minutes.
protocol.addTaskControl(
    DelayedTrigger(delay: Duration(minutes: 5)),
    BackgroundTask(measures: [
      Measure(type: ContextSamplingPackage.LOCATION),
      Measure(type: ContextSamplingPackage.MOBILITY)
    ]),
    locationService);
```

:::tip
You would often need to balance the configuration of the `LocationService` with the measure you are collecting. For example, if only using the `MOBILITY` measure, a lower `accuracy`, `distance`, and sampling `interval` could be used.
:::

If you only want to collect location information one time during a measurement, you can override the sampling configuration using a `LocationSamplingConfiguration` like this:

```dart
// Add a background task that collects location on a regular basis
// using a periodic trigger and a location sampling configuration that only
// collects location data once.
protocol.addTaskControl(
    PeriodicTrigger(period: Duration(minutes: 5)),
    BackgroundTask(measures: [
      Measure(type: ContextSamplingPackage.LOCATION)
        ..overrideSamplingConfiguration =
            LocationSamplingConfiguration(once: true),
    ]),
    locationService);
```

## Weather and Air Quality Measures

The `WEATHER` and `AIR_QUALITY` measure types use the online [Open Weather API](https://openweathermap.org/api) and [Air Quality Open Data Platform](https://aqicn.org/data-platform/token/#/), respectively.
In order to use these services, you need to obtain an API key from each of them.
Once you have this, these services can be configured and added to a protocol like this:

```dart
// Define the online weather service and add it as a 'device'
final weatherService = WeatherService(apiKey: 'OW_API_key_goes_here');
protocol.addConnectedDevice(weatherService, phone);

// Add a background task that collects weather every 30 minutes.
protocol.addTaskControl(
    PeriodicTrigger(period: Duration(minutes: 30)),
    BackgroundTask(measures: [
      Measure(type: ContextSamplingPackage.WEATHER),
    ]),
    weatherService);

// Define the online air quality service and add it as a 'device'
final airQualityService = AirQualityService(apiKey: 'WAQI_API_key_goes_here');
protocol.addConnectedDevice(airQualityService, phone);

// Add a background task that collects air quality every 30 minutes.
protocol.addTaskControl(
    PeriodicTrigger(period: Duration(minutes: 30)),
    BackgroundTask(measures: [
      Measure(type: ContextSamplingPackage.AIR_QUALITY),
    ]),
    airQualityService);
```

Note that the weather and air quality measures are so-called "[one-time measures](/carp-mobile-sensing/sampling-packages/available-packages/#measure-types)" and collect data once when triggered (in contrast to "event-based measures").

See the `example.dart` file for more examples of how to set up a CAMS study protocol for this context sampling package.
