---
title: "CAWS Data Backend"
description: "Download deployments from and upload data to CAWS."
sidebar:
  label: Overview
  order: 0
---

| | |
| --- | --- |
| Package | [`carp_backend`](https://pub.dev/packages/carp_backend) |
| Code | [backends/carp_backend](https://github.com/carp-dk/carp.sensing-flutter/tree/main/backends/carp_backend) |

This package integrates the [CARP Mobile Sensing](https://carp.dk/cams/) Framework with the [CARP Web Services (CAWS)](https://carp.dk/caws/) backend.

For an overview of all CAMS packages, see [CARP Mobile Sensing in Flutter](https://github.com/carp-dk/carp.sensing-flutter).
For documentation on how to use CAMS, see the [CAMS documentation](/carp-mobile-sensing/).

This library supports:

* downloading a **study invitation**
* download a **study deployment**
* getting and uploading **resources**
  * informed consent document
  * translation files
  * messages
* uploading collected **data**

from/to a CAWS server.

:::note
This package does nothing on its own and is only to be used as part of the overall [CARP Mobile Sensing](https://pub.dev/packages/carp_mobile_sensing) ecosystem. See the [CAMS documentation](/carp-mobile-sensing/) on how to use CAMS, and checkout the [CARP Mobile Sening Demo App](https://github.com/cph-cachet/carp.sensing-flutter/tree/master/apps/carp_mobile_sensing_app) for a full example of an app using CARP Mobile Sensing and CAWS, including this library.
:::
