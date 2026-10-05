---
title: "Documents, Files and Consent"
description: "Dart client for CARP Web Services (CAWS)."
sidebar:
  label: Documents, files & consent
  order: 6
---

The [`CarpService`](https://pub.dev/documentation/carp_webservices/latest/carp_services_carp_services/CarpService-class.html) provides access to a set of "non-core" endpoints in CAWS.
These "non-core" endpoints are:

- JSON Documents organized in Collections
- File Management
- Informed Consent Documents
- Data Points

All of these endpoints can be considered as additional "resources" which are available for up- or download from clients.

## Collections of JSON Documents

CARP Web Service supports storing JSON documents in nested collections.

A [`CollectionReference`](https://pub.dev/documentation/carp_webservices/latest/carp_services_carp_services/CollectionReference-class.html) is used to access collections and a [`DocumentReference`](https://pub.dev/documentation/carp_webservices/latest/carp_services_carp_services/DocumentReference-class.html) is used to access documents. Both of these can be used to:

- creating, updating, and deleting documents
- accessing documents in collections

```dart
// access a document
//  - if the document id is not specified, a new document (with a new id)
//    is created
//  - if the collection ('users') don't exist, it is created
DocumentSnapshot document = await CarpService()
    .collection('users')
    .document()
    .setData({'email': username, 'name': 'Administrator'});

// update the document
DocumentSnapshot updatedDocument = await CarpService()
    .collection('/users')
    .document(document.name)
    .updateData({'email': username, 'name': 'Super User'});

// get the document
DocumentSnapshot newDocument =
    await CarpService().collection('users').document(document.name).get();

// get the document by its unique ID
newDocument = await CarpService().documentById(document.id).get();

// delete the document
await CarpService().collection('users').document(document.name).delete();

// get all collections from a document
List<String> collections = newDocument.collections;

// get all documents in a collection.
List<DocumentSnapshot> documents =
    await CarpService().collection('users').documents;
```

## File Management

CARP Web Service supports storing raw binary file.

A [`FileStorageReference`](https://pub.dev/documentation/carp_webservices/latest/carp_services_carp_services/FileStorageReference-class.html) is used to manage files and have methods for:

- uploading a file
- downloading a file
- getting a file object
- getting all file objects
- deleting a file

When uploading a file, you can add metadata as a `Map<String, String>`.

```dart
// first upload a file
final File uploadFile = File('test/img.jpg');
final FileUploadTask uploadTask = CarpService()
    .getFileStorageReference()
    .upload(uploadFile, {
  'content-type': 'image/jpg',
  'content-language': 'en',
  'activity': 'test'
});
CarpFileResponse response = await uploadTask.onComplete;
int id = response.id;

// then get its description back from the server
final CarpFileResponse result =
    await CarpService().getFileStorageReference(id).get();

// then download the file again
// note that a local file to download is needed
final File downloadFile = File('test/img-$id.jpg');
final FileDownloadTask downloadTask =
    CarpService().getFileStorageReference(id).download(downloadFile);
int responseCode = await downloadTask.onComplete;

// now get references to ALL files in this study
final List<CarpFileResponse> results =
    await CarpService().getFileStorageReference(id).getAll();

// finally, delete the file
responseCode = await CarpService().getFileStorageReference(id).delete();
```

## Informed Consent Document

:::danger
This is an old endpoint which is deprecated. Informed consent should be uploaded as a "participant data" as outlined above. However, at the moment, CAWS supports both types of informed consent (for backward compatibility reasons).
:::

A [`ConsentDocument`](https://pub.dev/documentation/carp_webservices/latest/carp_services_carp_services/ConsentDocument-class.html) can be uploaded and downloaded to and from CAWS.

```dart
try {
  ConsentDocument uploaded = await CarpService().createConsentDocument({
    'text': 'The original terms text.',
    'signature': 'Image Blob',
  });

  ConsentDocument downloaded =
      await CarpService().getConsentDocument(uploaded.id);
} catch (error) {
  ...;
}
```

## Data Points

:::danger
This is an old endpoint which is deprecated. Data should be uploaded using "data streams" as outlined above. However, at the moment, CAWS supports both types of data upload (for backward compatibility reasons).
:::

A [`DataPointReference`](https://pub.dev/documentation/carp_webservices/latest/carp_services_carp_services/DataPointReference-class.html) is used to manage [`DataPoint`](https://pub.dev/documentation/carp_webservices/latest/carp_services_carp_services/DataPoint-class.html) objects on a CARP Web Service, and have CRUD methods for:

- post a data point
- batch upload multiple data points
- get a data point
- delete data points

```dart
// Create a piece of data
final lightData = AmbientLight(
  maxLux: 12,
  meanLux: 23,
  minLux: 0.3,
  stdLux: 0.4,
);

// create a CARP data point
final data = DataPoint.fromData(lightData);

// post it to the CARP server, which returns the ID of the data point
int dataPointId =
    await CarpService().getDataPointReference().postDataPoint(data);

// get the data point back from the server
CARPDataPoint dataPoint =
    await CarpService().getDataPointReference().getDataPoint(dataPointId);

// batch upload a list of raw json data points in a file
final File file = File('test/batch.json');
await CarpService().getDataPointReference().batchPostDataPoint(file);

// delete the data point
await CarpService().getDataPointReference().deleteDataPoint(dataPointId);
```
