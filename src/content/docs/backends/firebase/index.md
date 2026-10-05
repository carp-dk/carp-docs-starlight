---
title: "Firebase Backend"
description: "Upload CAMS data to Google Firebase."
sidebar:
  label: Overview
  order: 0
---

| | |
| --- | --- |
| Package | [`carp_firebase_backend`](https://pub.dev/packages/carp_firebase_backend) |
| Code | [backends/carp_firebase_backend](https://github.com/carp-dk/carp.sensing-flutter/tree/main/backends/carp_firebase_backend) |

A Flutter plugin for uploading data from the [CARP Mobile Sensing Framework](https://pub.dev/packages/carp_mobile_sensing) 
to a Google Firebase data backend. 

Supports uploading json to Firebase as either (zipped) files to Firebase Storage or as plain json to a Firebase Database.



This package can upload sending data to Goggle Firebase in two ways:

* **Google Firebase Storage** – By using the Google Firebase **Storage** endpoint, CARP sensing data are uploaded as raw or zipped JSON file, generated using the 
[`FileDataManager`](https://pub.dev/documentation/carp_mobile_sensing/latest/datastore/FileDataManager-class.html) 
in `carp_mobile_sensing`.
In Firebase, files with sensed data is stored in the `path` specified in the `FirebaseStorageDataEndPoint` plus subfolders for each study and device. 
The path on Firebase hence follow this pattern: `/<path>/<study_id>/<device_id>/`

* **Google Firebase Database** – By using the Google Firebase **Database** endpoint, CARP sensing data are uploaded as raw JSON data points, 
using Firebase as a [`DataManager`](https://pub.dev/documentation/carp_core/latest/carp_core/DataManager-class.html) in `carp_mobile_sensing`.
In Firebase, data json objects are stores in the `collection` specified in the `FirebaseDatabaseDataManager`.
JSON objects will be stored in collections named `/<collection>/<study_id>/<device_id>/upload/<data_type>` 
relative to this path. For example, if `collection` is `carp_data`, `study_id` is `1234` and `device_id` is `R16NW`, 
location data will be stored as documents in this collection: `carp_data/1234/R16NW/upload/location`.
