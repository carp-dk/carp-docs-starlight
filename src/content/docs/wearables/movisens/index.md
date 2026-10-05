---
title: "Movisens"
description: "Movisens Move, ECG and EDA sensors."
sidebar:
  label: Overview
  order: 0
---

| | |
| --- | --- |
| Package | [`carp_movisens_package`](https://pub.dev/packages/carp_movisens_package) |
| Code | [packages/carp_movisens_package](https://github.com/carp-dk/carp.sensing-flutter/tree/main/packages/carp_movisens_package) |

This library contains a [`carp_mobile_sensing`](https://pub.dev/packages/carp_mobile_sensing) (CAMS) sampling package for collecting data from [Movisens](https://www.movisens.com) devices:

* [Move 4](https://docs.movisens.com/Sensors/Move4/)
* [EcgMove 4](https://docs.movisens.com/Sensors/EcgMove4/)
* [EdaMove 4](https://docs.movisens.com/Sensors/EdaMove4/)

:::caution
As stressed by Movisens, none of the Movisens devices are medical devices. Do not use them for medical purposes.
:::

This package supports sampling of the following [`Measure`](/carp-mobile-sensing/sampling-packages/available-packages/) types:

* `dk.cachet.carp.movisens.activity` – Physical activity like body positions, step count, inclination, acceleration, and metabolic (MET) levels.
* `dk.cachet.carp.movisens.hr` - Heart Rate (HR), HR Variability (HRV), Mean HR
* `dk.cachet.carp.movisens.eda` - Elecrodermal Activity
* `dk.cachet.carp.movisens.skin_temperature` - Skin temperature.
* `dk.cachet.carp.movisens.tap_marker` - Markers of user tapping on the sensor.

These measures collect different types of data (note that the package defines its own namespace of `dk.cachet.carp.movisens...`):

**Physical Activity:**

* `dk.cachet.carp.movisens.activity.steps`
* `dk.cachet.carp.movisens.activity.body_position`
* `dk.cachet.carp.movisens.activity.inclination`
* `dk.cachet.carp.movisens.activity.movement_acceleration`
* `dk.cachet.carp.movisens.activity.met_level`
* `dk.cachet.carp.movisens.activity.met`

**Heart Rate:**

* `dk.cachet.carp.movisens.hr.hr_mean`
* `dk.cachet.carp.movisens.hr.hrv`
* `dk.cachet.carp.movisens.hr.is_hrv_valid`

**Misc:**

* `dk.cachet.carp.movisens.eda`
* `dk.cachet.carp.movisens.skin_temperature`
* `dk.cachet.carp.movisens.tap_marker`

For understanding how to use the Movisens Devices, please consult the [Movisens Documentation](https://docs.movisens.com).

See the [CAMS documentation site](/carp-mobile-sensing/) for further documentation.
See the [CARP Mobile Sensing App](https://github.com/carp-dk/carp.sensing-flutter/tree/main/apps/carp_mobile_sensing_app) for an example of how to build a mobile sensing app in Flutter.


If you're interested in writing your own sampling packages for CARP, see the description on
how to [extend](/carp-mobile-sensing/sampling-packages/create-your-own/) CARP Mobile Sensing.
