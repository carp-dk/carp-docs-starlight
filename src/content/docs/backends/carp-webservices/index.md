---
title: "CAWS Client"
description: "Dart client for CARP Web Services (CAWS)."
sidebar:
  label: Overview
  order: 0
---

| | |
| --- | --- |
| Package | [`carp_webservices`](https://pub.dev/packages/carp_webservices) |
| Code | [backends/carp_webservices](https://github.com/carp-dk/carp.sensing-flutter/tree/main/backends/carp_webservices) |

A Flutter library to access the [CARP Web Service (CAWS)](https://carp.cachet.dk/caws/) web API.
This library is intended to be used with the [`carp_mobile_sensing`](https://pub.dev/packages/carp_mobile_sensing) framework, but also works on its own, if a app is to connect directly to CAWS.

For an overview of CARP and other Flutter CARP libraries, see [CARP Mobile Sensing in Flutter](https://github.com/cph-cachet/carp.sensing-flutter/blob/master/README.md).

## Services

CARP Web Services (CAWS) consists of a set of sub-services, which are accessible for the client:

- [`CarpAuthService`](https://pub.dev/documentation/carp_webservices/latest/carp_auth_carp_auth/CarpAuthService-class.html) - authentication service for CAWS
- [`CarpParticipationService`](https://pub.dev/documentation/carp_webservices/latest/carp_services_carp_services/CarpParticipationService-class.html) - CAWS-specific implementation of the [ParticipationService](https://github.com/cph-cachet/carp.core-kotlin/blob/develop/docs/carp-deployments.md#participationservice)
- [`CarpDeploymentService`](https://pub.dev/documentation/carp_webservices/latest/carp_services_carp_services/CarpDeploymentService-class.html) - CAWS-specific implementation of the [DeploymentService](https://github.com/cph-cachet/carp.core-kotlin/blob/develop/docs/carp-deployments.md#deploymentservice)
- [`CarpDataStreamService`](https://pub.dev/documentation/carp_webservices/latest/carp_services_carp_services/CarpDataStreamService-class.html) - CAWS-specific implementation of the [DataStreamService](https://github.com/cph-cachet/carp.core-kotlin/blob/develop/docs/carp-data.md#datastreamservice)
- [`CarpService`](https://pub.dev/documentation/carp_webservices/latest/carp_services_carp_services/CarpService-class.html) - resource management (folders, documents, and files) and alternative data management service

The `CarpParticipationService`, `CarpDeploymentService`, and `CarpDataStreamService` follows the [CARP Core architecture](https://github.com/cph-cachet/carp.core-kotlin?tab=readme-ov-file#architecture), and are CAWS-specific implementations of the ParticipationService, DeploymentService, and DataStreamService, respectively.
The`CarpAuthService` and `CarpService` are only part of the CAWS architecture ("non-core" endpoints).
