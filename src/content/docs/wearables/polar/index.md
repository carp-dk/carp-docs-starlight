---
title: "Polar"
description: "Polar heart rate monitors and sensors."
sidebar:
  label: Overview
  order: 0
---

| | |
| --- | --- |
| Package | [`carp_polar_package`](https://pub.dev/packages/carp_polar_package) |
| Code | [packages/carp_polar_package](https://github.com/carp-dk/carp.sensing-flutter/tree/main/packages/carp_polar_package) |

This library contains a sampling package for the [`carp_mobile_sensing`](https://pub.dev/packages/carp_mobile_sensing) framework
to work with the [Polar](https://www.polar.com/) heart rate devices.
This packages supports sampling of the following [`Measure`](/carp-mobile-sensing/sampling-packages/available-packages/) types (note that the package defines its own namespace of `dk.cachet.carp.polar`):

* `dk.cachet.carp.polar.accelerometer` : Accelerometer
* `dk.cachet.carp.polar.gyroscope` : Gyroscope
* `dk.cachet.carp.polar.magnetometer` : Magnetometer
* `dk.cachet.carp.polar.ecg` : Electrocardiogram (ECG)
* `dk.cachet.carp.polar.ppi` : Pulse-to-Pulse Interval (PPI)
* `dk.cachet.carp.polar.ppg` : Photoplethysmograpy (PPG)
* `dk.cachet.carp.polar.hr` : Heart rate

This package uses the Flutter [polar](https://pub.dev/packages/polar) plugin, which again is based on the official [Polar API](https://github.com/polarofficial/polar-ble-sdk).
The following devices are supported:

* [H10 Heart rate sensor](https://github.com/polarofficial/polar-ble-sdk/blob/master/documentation/products/PolarH10.md)
* [H9 Heart rate sensor](https://github.com/polarofficial/polar-ble-sdk/blob/master/documentation/products/PolarH9.md)
* [Polar Verity Sense Optical heart rate sensor](https://github.com/polarofficial/polar-ble-sdk/blob/master/documentation/products/PolarVeritySense.md)

See the [CAMS documentation site](/carp-mobile-sensing/) for further documentation.
See the [CARP Mobile Sensing App](https://github.com/carp-dk/carp.sensing-flutter/tree/main/apps/carp_mobile_sensing_app) for an example of how to build a mobile sensing app in Flutter.
This demo app also includes support for this Polar sampling package.


If you're interested in writing your own sampling packages for CARP, see the description on
how to [extend](/carp-mobile-sensing/sampling-packages/create-your-own/) CARP Mobile Sensing.
