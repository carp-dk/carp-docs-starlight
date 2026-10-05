---
title: "Apps"
description: "Installed apps and app usage."
sidebar:
  label: Overview
  order: 0
---

| | |
| --- | --- |
| Package | [`carp_apps_package`](https://pub.dev/packages/carp_apps_package) |
| Code | [packages/carp_apps_package](https://github.com/carp-dk/carp.sensing-flutter/tree/main/packages/carp_apps_package) |

This library contains a sampling package for app-related sampling to work with
the [`carp_mobile_sensing`](https://pub.dev/packages/carp_mobile_sensing) framework.
This packages supports sampling of the following [`Measure`](/carp-mobile-sensing/sampling-packages/available-packages/) types:

* `dk.cachet.carp.apps` - a list of installed apps on the phone.
* `dk.cachet.carp.appusage` - a log of app usage activity.

These measures are only available on Android.

See the [CAMS documentation site](/carp-mobile-sensing/) for further documentation.
See the [CARP Mobile Sensing App](https://github.com/carp-dk/carp.sensing-flutter/tree/main/apps/carp_mobile_sensing_app) for an example of how to build a mobile sensing app in Flutter.


If you're interested in writing your own sampling packages for CARP, see the description on
how to [extend](/carp-mobile-sensing/sampling-packages/create-your-own/) CARP Mobile Sensing.
