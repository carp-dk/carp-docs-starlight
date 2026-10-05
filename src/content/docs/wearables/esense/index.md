---
title: "eSense"
description: "eSense earables."
sidebar:
  label: Overview
  order: 0
---

| | |
| --- | --- |
| Package | [`carp_esense_package`](https://pub.dev/packages/carp_esense_package) |
| Code | [packages/carp_esense_package](https://github.com/carp-dk/carp.sensing-flutter/tree/main/packages/carp_esense_package) |

This library contains a sampling package for
the [`carp_mobile_sensing`](https://pub.dev/packages/carp_mobile_sensing) framework
to work with the [eSense](https://www.esense.io) earable computing platform.
This packages supports sampling of the following [`Measure`](/carp-mobile-sensing/sampling-packages/available-packages/) types (note that the package defines its own namespace of `dk.cachet.carp.esense`):

* `dk.cachet.carp.esense.button` : eSense button pressed / released events
* `dk.cachet.carp.esense.sensor` : eSense sensor (accelerometer & gyroscope) events.

See the user documentation on the [eSense device](https://www.esense.io/share/eSense-User-Documentation.pdf) for how to use the device.
See the [`esense_flutter`](https://pub.dev/packages/esense_flutter) Flutter plugin and its [API](https://pub.dev/documentation/esense_flutter/latest/) documentation to understand how sensor data is generated and their data formats.

See the [CAMS documentation site](/carp-mobile-sensing/) for further documentation.
See the [CARP Mobile Sensing App](https://github.com/carp-dk/carp.sensing-flutter/tree/main/apps/carp_mobile_sensing_app) for an example of how to build a mobile sensing app in Flutter.


If you're interested in writing your own sampling packages for CARP, see the description on
how to [extend](/carp-mobile-sensing/sampling-packages/create-your-own/) CARP Mobile Sensing.
