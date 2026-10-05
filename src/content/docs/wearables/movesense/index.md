---
title: "Movesense"
description: "Movesense sensors."
sidebar:
  label: Overview
  order: 0
---

| | |
| --- | --- |
| Package | [`carp_movesense_package`](https://pub.dev/packages/carp_movesense_package) |
| Code | [packages/carp_movesense_package](https://github.com/carp-dk/carp.sensing-flutter/tree/main/packages/carp_movesense_package) |

This library contains a sampling package for the [`carp_mobile_sensing`](https://pub.dev/packages/carp_mobile_sensing) framework
to work with the [Movesense](https://www.movesense.com/) heart rate devices.
This packages supports sampling of the following [`Measure`](/carp-mobile-sensing/sampling-packages/available-packages/) types (note that the package defines its own namespace of `dk.cachet.carp.movesense`):

* `dk.cachet.carp.movesense.state` : State changes (like moving, tapping, etc.)
* `dk.cachet.carp.movesense.hr` : Heart rate
* `dk.cachet.carp.movesense.ecg` : Electrocardiogram (ECG)
* `dk.cachet.carp.movesense.temperature` : Device temperature
* `dk.cachet.carp.movesense.imu` : 9-axis Inertial Movement Unit (IMU)

This package uses the Flutter [carp_movesense_flutter](https://pub.dev/packages/carp_movesense_flutter) plugin, which is based on the official [Movesense Mobile API](https://www.movesense.com/docs/mobile/mobile_sw_overview/).

:::note
As of version 3.0.0 this package is based on the [`carp_movesense_flutter`](https://pub.dev/packages/carp_movesense_flutter) plugin instead of the `mdsflutter` plugin. The public API of this sampling package is unchanged. The main practical difference is that `carp_movesense_flutter` bundles the native Movesense MDS libraries (the Android `.aar` and the iOS `.xcframework`), so apps no longer need to vendor them manually (see [Install](/wearables/movesense/install/) below).
:::

The following heart rate devices are supported:

* [Movesense Medical (MD)](https://www.movesense.com/product/movesense-medical-mdr/)
* [Movesense HR+](https://www.movesense.com/product/movesense-sensor-hr/)
* [Movesense HR2](https://www.movesense.com/product/movesense-sensor-hr2/)

See the [CAMS documentation site](/carp-mobile-sensing/) for further documentation.
See the [CARP Mobile Sensing App](https://github.com/carp-dk/carp.sensing-flutter/tree/main/apps/carp_mobile_sensing_app) for an example of how to build a mobile sensing app in Flutter.


If you're interested in writing your own sampling packages for CARP, see the description on
how to [extend](/carp-mobile-sensing/sampling-packages/create-your-own/) CARP Mobile Sensing.
