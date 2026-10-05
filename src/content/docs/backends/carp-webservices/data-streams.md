---
title: "Data Streams"
description: "Dart client for CARP Web Services (CAWS)."
sidebar:
  label: Data streams
  order: 5
---

Collected data is streamed back to a CARP Web Service using the [`Data`](https://github.com/cph-cachet/carp.core-kotlin/blob/develop/docs/carp-data.md) subsystem.
This is done using the [`CarpDataStreamService`](https://pub.dev/documentation/carp_webservices/latest/carp_services_carp_services/CarpDataStreamService-class.html) like this:

```dart
// Configure a [CarpDataStreamService] from an existing CAWS service.
CarpDataStreamService().configureFrom(CarpService());

// Create a (very simple) data batch with one measurement to upload
var measurement = Measurement(
  sensorStartTime: 1642505144000000,
  data: Geolocation(
      latitude: 55.680802203873114, longitude: 12.581802212861367));

var batch = [
  DataStreamBatch(
    dataStream: DataStreamId(
        studyDeploymentId:
            CarpDataStreamService().app.studyDeploymentId ?? '',
        deviceRoleName: 'smartphone',
        dataType: Geolocation.dataType),
    firstSequenceId: 0,
    measurements: [measurement],
    triggerIds: {0}),
];

// Get a data stream and append the batch
CarpDataStreamService().dataStream(studyDeploymentId).append(batch);
```

However, you would rarely need to use these endpoints in your app, since the [carp_backend](https://pub.dev/packages/carp_backend) would handle this when you use a [`CarpDataEndPoint`](https://pub.dev/documentation/carp_backend/latest/carp_backend/CarpDataEndPoint-class.html) as the data endpoint in the study protocol.
