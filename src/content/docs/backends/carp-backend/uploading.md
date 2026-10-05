---
title: "Uploading Data to CAWS"
description: "Download deployments from and upload data to CAWS."
sidebar:
  label: Uploading data
  order: 4
---

Configuration of data upload is done as a [`DataEndPoint`](https://pub.dev/documentation/carp_mobile_sensing/latest/domain/DataEndPoint-class.html), which is part of a [`SmartphoneStudyProtocol`](https://pub.dev/documentation/carp_mobile_sensing/latest/domain/SmartphoneStudyProtocol-class.html).

CAWS and hence this plugin supports three methods of data upload:

* The (default) data stream upload using the [CARP Core Data subsystem](https://github.com/cph-cachet/carp.core-kotlin/blob/develop/docs/carp-data.md)
* The (legacy) [`DataPoint`](https://pub.dev/documentation/carp_webservices/latest/carp_services_carp_services/DataPoint-class.html) upload
* File upload of raw SQLite `.db` files

## Specifying a CARP Data Endpoint

Create a `CarpDataEndPoint` that specify which method to use for uploading data, and the details. For example, a streaming data upload is created like this:

```dart
// Using the (default) data stream batch upload method
var streamingEndPoint = CarpDataEndPoint();
```

Upload methods are defined in the `uploadMethod` property. A data point upload method is created like this:

```dart
// Using the "legacy" DataPoint endpoint for uploading batches of data points.
var dataPointEndPoint =
    CarpDataEndPoint(uploadMethod: CarpUploadMethod.datapoint);
```

Similarly, an endpoint uploading the raw SQLite db files can be specified:

```dart
// Using the file method would upload SQLite db files.
var fileEndPoint = CarpDataEndPoint(uploadMethod: CarpUploadMethod.file);
```

There are some details in how the three different types of endpoints work:

* **Streaming** - Using the streaming data method requires that the study deployment has been obtained from CAWS via an invitation, as shown above. This ensures that there is a linkage between the study deployment ID from the deployment and the ID in the data being streamed back to CAWS.

* **Data Point** & **File** - The data point and file endpoints need the study ID and study deployment ID. This can be obtained via the invitation (as above), but it can also be specified when creating the `CarpApp` configuration. Hence, the data point and file endpoints can be used if these IDs are known, e.g., are static to the app.

For all three upload types (stream, data point, and file), additional parameters can be specified for a an endpoint.

```dart
/// Specify parameters on upload interval (in minutes), if upload only
/// should happen when the phone is connected to WiFi, and whether data
/// buffered locally on the phone should be deleted when uploaded.
streamingEndPoint = CarpDataEndPoint(
  uploadInterval: 20,
  onlyUploadOnWiFi: true,
  deleteWhenUploaded: false,
);
```

## Adding a Data Endpoint to the Study Protocol

To use the data endpoint, add it to the study protocol like this:

```dart
// Create a study protocol with a specific data endpoint.
SmartphoneStudyProtocol protocol = SmartphoneStudyProtocol(
  ownerId: 'AB',
  name: 'Track patient movement',
  dataEndPoint: streamingEndPoint,
);
```

## Register the Data Manager

In order to use the CAWS data manger for uploading of data, you should register its factory in the [`DataManagerRegistry`](https://pub.dev/documentation/carp_mobile_sensing/latest/domain/DataManagerRegistry-class.html).

````dart
// Register CAWS as a data backend where data can be uploaded.
DataManagerRegistry().register(CarpDataManagerFactory());
````
