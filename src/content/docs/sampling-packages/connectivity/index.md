---
title: "Connectivity"
description: "Bluetooth, Wi-Fi and connectivity."
sidebar:
  label: Overview
  order: 0
---

| | |
| --- | --- |
| Package | [`carp_connectivity_package`](https://pub.dev/packages/carp_connectivity_package) |
| Code | [packages/carp_connectivity_package](https://github.com/carp-dk/carp.sensing-flutter/tree/main/packages/carp_connectivity_package) |

This library contains a sampling package for collection of connectivity related measures to work with the [`carp_mobile_sensing`](https://pub.dev/packages/carp_mobile_sensing) framework.
This package supports sampling of the following [`Measure`](/carp-mobile-sensing/sampling-packages/available-packages/) types:

* `dk.cachet.carp.wifi`
* `dk.cachet.carp.connectivity`
* `dk.cachet.carp.bluetooth`
* `dk.cachet.carp.beacon`

See the [CAMS documentation site](/carp-mobile-sensing/) for further documentation.
See the [CARP Mobile Sensing App](https://github.com/carp-dk/carp.sensing-flutter/tree/main/apps/carp_mobile_sensing_app) for an example of how to build a mobile sensing app in Flutter.

There is privacy protection of wifi and bluetooth names as part of the default [Privacy Schema](/carp-mobile-sensing/domain/data-endpoints-and-privacy/#privacy-transformer-schemas).


If you're interested in writing your own sampling packages for CARP, see the description on
how to [extend](/carp-mobile-sensing/sampling-packages/create-your-own/) CARP Mobile Sensing.
