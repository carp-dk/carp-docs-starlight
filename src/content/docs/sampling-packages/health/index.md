---
title: "Health"
description: "Apple Health and Google Health Connect data."
sidebar:
  label: Overview
  order: 0
---

| | |
| --- | --- |
| Package | [`carp_health_package`](https://pub.dev/packages/carp_health_package) |
| Code | [packages/carp_health_package](https://github.com/carp-dk/carp.sensing-flutter/tree/main/packages/carp_health_package) |

This library contains a sampling package for sampling health data from Apple Health and Google Health Connect to work with the [carp_mobile_sensing](https://pub.dev/packages/carp_mobile_sensing) framework. It uses the [health](https://pub.dev/packages/health) plugin for this.
This package supports sampling of the following [`Measure`](/carp-mobile-sensing/sampling-packages/available-packages/) types:

* `dk.cachet.carp.health`

See the [CAMS documentation site](/carp-mobile-sensing/) for further documentation.
See the [CARP Mobile Sensing App](https://github.com/carp-dk/carp.sensing-flutter/tree/main/apps/carp_mobile_sensing_app) for an example of how to build a mobile sensing app in Flutter.


If you're interested in writing your own sampling packages for CARP, see the description on
how to [extend](/carp-mobile-sensing/sampling-packages/create-your-own/) CARP Mobile Sensing.
