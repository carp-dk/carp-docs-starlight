---
title: "Audio"
description: "Audio, video and noise."
sidebar:
  label: Overview
  order: 0
---

| | |
| --- | --- |
| Package | [`carp_audio_package`](https://pub.dev/packages/carp_audio_package) |
| Code | [packages/carp_audio_package](https://github.com/carp-dk/carp.sensing-flutter/tree/main/packages/carp_audio_package) |

This library contains a sampling package for collection of contextual data to work with the [`carp_mobile_sensing`](https://pub.dev/packages/carp_mobile_sensing) framework.
This package supports sampling of the following [`Measure`](/carp-mobile-sensing/sampling-packages/available-packages/) types:

* `dk.cachet.carp.noise`
* `dk.cachet.carp.audio`
* `dk.cachet.carp.video`
* `dk.cachet.carp.image`

:::note
The name of the Flutter pub.dev package is "audio" for historical reasons - however, it is (now) a "media" package and the CAMS package name is `MediaSamplingPackage`.
:::

See the [CAMS documentation site](/carp-mobile-sensing/) for further documentation.
See the [CARP Mobile Sensing App](https://github.com/carp-dk/carp.sensing-flutter/tree/main/apps/carp_mobile_sensing_app) for an example of how to build a mobile sensing app in Flutter.


If you're interested in writing your own sampling packages for CARP, see the description on
how to [extend](/carp-mobile-sensing/sampling-packages/create-your-own/) CARP Mobile Sensing.
