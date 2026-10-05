---
title: "Configure the CAWS Client"
description: "Dart client for CARP Web Services (CAWS)."
sidebar:
  label: Configure
  order: 2
---

All CAWS services needs to be configured before used, using the `configure` method taking a [`CarpApp`](https://pub.dev/documentation/carp_webservices/latest/carp_services_carp_services/CarpApp-class.html) configuration.

```dart
// The URI of the CAWS server to connect to.
final Uri uri = Uri(
  scheme: 'https',
  host: 'dev.carp.dk',
);

final CarpApp app = CarpApp(
  name: "CAWS @ DTU [DEV]",
  uri: uri,
);

// Configure the CARP Service with this app.
CarpService().configure(app);
```

The singleton can now be accessed via `CarpService()`.

Any service can be configured based on another service, like this:

```dart
CarpParticipationService().configureFrom(CarpService());
```
