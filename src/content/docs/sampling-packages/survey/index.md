---
title: "Surveys & Cognitive Tests"
description: "Surveys and cognitive tests as app tasks."
sidebar:
  label: Overview
  order: 0
---

| | |
| --- | --- |
| Package | [`carp_survey_package`](https://pub.dev/packages/carp_survey_package) |
| Code | [packages/carp_survey_package](https://github.com/carp-dk/carp.sensing-flutter/tree/main/packages/carp_survey_package) |

This library contains a sampling package for collection of user-generated data to work with the [`carp_mobile_sensing`](https://pub.dev/packages/carp_mobile_sensing) framework. Data is collected via [surveys](https://carp.cachet.dk/creating-a-survey/) and [cognitive tests](https://carp.cachet.dk/creating-cognitive-tests/).
For this, this library uses the [CARP Research Package](https://carp.cachet.dk/research-package/) and the [CARP Cognition Package](https://carp.cachet.dk/cognition-package/).
This package supports the creation of a `RPAppTask` which can be added to a CAMS study protocol.

Read more on the [Research Package API](https://carp.cachet.dk/research-package-api/) and how to [create a survey](https://carp.cachet.dk/creating-a-survey/) and how to [create a cognitive test](https://carp.cachet.dk/creating-cognitive-tests/) on the CARP website. For a demo of how to use this package and the `RPAppTask` in an app, see the [PulmonaryMonitor](https://github.com/cph-cachet/pulmonary_monitor_app) app.
Check the [CAMS documentation](/carp-mobile-sensing/) to read more about the [AppTask Model](/carp-mobile-sensing/runtime/app-tasks/).
