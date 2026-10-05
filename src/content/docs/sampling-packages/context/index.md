---
title: "Context"
description: "Location, activity, geofence, weather and air quality."
sidebar:
  label: Overview
  order: 0
---

| | |
| --- | --- |
| Package | [`carp_context_package`](https://pub.dev/packages/carp_context_package) |
| Code | [packages/carp_context_package](https://github.com/carp-dk/carp.sensing-flutter/tree/main/packages/carp_context_package) |

This library contains a sampling package for collection of contextual data to work with the [`carp_mobile_sensing`](https://pub.dev/packages/carp_mobile_sensing) framework.
This package supports sampling of the following [`Measure`](/carp-mobile-sensing/sampling-packages/available-packages/) types:

* `dk.cachet.carp.activity`
* `dk.cachet.carp.location`
* `dk.cachet.carp.geofence`
* `dk.cachet.carp.mobility`
* `dk.cachet.carp.weather`
* `dk.cachet.carp.air_quality`

See the [CAMS documentation site](/carp-mobile-sensing/) for further documentation.
See the [CARP Mobile Sensing App](https://github.com/carp-dk/carp.sensing-flutter/tree/main/apps/carp_mobile_sensing_app) for an example of how to build a mobile sensing app in Flutter.


If you're interested in writing your own sampling packages for CARP, see the description on
how to [extend](/carp-mobile-sensing/sampling-packages/create-your-own/) CARP Mobile Sensing.
