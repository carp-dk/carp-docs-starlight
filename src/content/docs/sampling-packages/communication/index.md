---
title: "Communication"
description: "Phone and text message logs."
sidebar:
  label: Overview
  order: 0
---

| | |
| --- | --- |
| Package | [`carp_communication_package`](https://pub.dev/packages/carp_communication_package) |
| Code | [packages/carp_communication_package](https://github.com/carp-dk/carp.sensing-flutter/tree/main/packages/carp_communication_package) |

This library contains a sampling package for collection of contextual data to work with the [`carp_mobile_sensing`](https://pub.dev/packages/carp_mobile_sensing) framework.
This package supports sampling of the following [`Measure`](/carp-mobile-sensing/sampling-packages/available-packages/) types:

* `dk.cachet.carp.phone_log` - the phone log.
* `dk.cachet.carp.text_message_log` - the text (sms) message log.
* `dk.cachet.carp.text_message` - incoming text (sms) messages.
* `dk.cachet.carp.calendar` - all calendar entries.

Note that collection of phone and text message data is only supported on Android.

See the [CAMS documentation site](/carp-mobile-sensing/) for further documentation.
See the [CARP Mobile Sensing App](https://github.com/carp-dk/carp.sensing-flutter/tree/main/apps/carp_mobile_sensing_app) for an example of how to build a mobile sensing app in Flutter.

This package implements default privacy protection of text messages, phone numbers, and calendar entries as part of the default [Privacy Schema](/carp-mobile-sensing/domain/data-endpoints-and-privacy/#privacy-transformer-schemas). These functions are implemented in the `communication_privacy.dart` file and use standard SHA1 hashing.


If you're interested in writing your own sampling packages for CARP, see the description on
how to [extend](/carp-mobile-sensing/sampling-packages/create-your-own/) CARP Mobile Sensing.
