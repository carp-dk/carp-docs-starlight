---
title: "Configure the Firebase Backend"
description: "Upload CAMS data to Google Firebase."
sidebar:
  label: Configure
  order: 2
---

Upload of files to Firebase Storage uses the `FirebaseStorageDataManager` and
upload of json objects to Firebase Database uses `FirebaseDatabaseDataManager`.
Using the library takes three steps.

## 1. Register the Data Managers

First you should register the data manager you want to use (or both) in the `DataManagerRegistry`.

````dart
DataManagerRegistry().register(DataEndPointType.FIREBASE_STORAGE, new FirebaseStorageDataManager());
DataManagerRegistry().register(DataEndPointType.FIREBASE_DATABASE, new FirebaseDatabaseDataManager());
````

## 2. Specify Access Details to the Firebase App
 
Both data managers uses a `FirebaseEndPoint` object to handle access to Firebase. 
In this object, Firebase endpoint configuration keys are stored as well as authentication details. 
All of the Firebase configuration keys can be found in the _Projects Settings_ in the Firebase Console.
Remember to register your app in Firebase, as described above.
The `firebaseAuthenticationMethod` key specify the authentication method. Currently, only _email/password_ and 
_Google Sign-In_ is implemented (even though `FireBaseAuthenticationMethods` lists them all (for future use)).
 

**Using email/password as authentication**

````dart
final FirebaseEndPoint firebaseEndPoint = new FirebaseEndPoint(
    name: "Flutter Sensing Sandbox",
    uri: 'gs://flutter-sensing-sandbox.appspot.com',
    projectID: 'flutter-sensing-sandbox',
    webAPIKey: 'AIzaSyCGy6MeHkiv5XkBtMcMbtgGYOpf6ntNVE4',
    gcmSenderID: '201621881872',
    androidGoogleAppID: '1:201621881872:android:8e84e7ccfc85e121',
    iOSGoogleAppID: '1:159623150305:ios:4a213ef3dbd8997b',
    firebaseAuthenticationMethod: FireBaseAuthenticationMethods.PASSWORD,
    email: "some_email@dtu.dk",
    password: "some_password");
````

**Using Google Sign-In as authentication**


````dart
final FirebaseEndPoint firebaseEndPoint = new FirebaseEndPoint(
    name: "Flutter Sensing Sandbox",
    uri: 'gs://flutter-sensing-sandbox.appspot.com',
    projectID: 'flutter-sensing-sandbox',
    webAPIKey: 'AIzaSyCGy6MeHkiv5XkBtMcMbtgGYOpf6ntNVE4',
    gcmSenderID: '201621881872',
    androidGoogleAppID: '1:201621881872:android:8e84e7ccfc85e121',
    iOSGoogleAppID: '1:159623150305:ios:4a213ef3dbd8997b',
    firebaseAuthenticationMethod: FireBaseAuthenticationMethods.GOOGLE);
````

## 3. Create the Data Endpoint 

Finally, you create the data endpoint (`FirebaseStorageDataEndPoint` or `FirebaseDatabaseDataEndPoint`) providing it
with a `FirebaseEndPoint` and add it as your `Study` data endpoint.

**Firebase Storage Endpoint**

````dart
final FirebaseStorageDataEndPoint storageEndPoint = new FirebaseStorageDataEndPoint(
   firebaseEndPoint,
   path: 'sensing/data', 
   bufferSize: 500 * 1000, 
   zip: true, 
   encrypt: false);

CAMSStudyProtocol study = CAMSStudyProtocol()..dataEndPoint = storageEndPoint;
````

Note that a `FirebaseStorageDataEndPoint` extends the `FileDataEndPoint` class and parameters related to 
how to create the files can be specified, including `bufferSize`, `zip`, and `encrypt`.
In the example above, the file buffer size is set to 1 MB, which is zipped before upload.


**Firebase Database Endpoint**

````dart
final FirebaseDatabaseDataEndPoint databaseEndPoint =
    new FirebaseDatabaseDataEndPoint(firebaseEndPoint, collection: 'carp_data');


CAMSStudyProtocol study = CAMSStudyProtocol()..dataEndPoint = databaseEndPoint;
````
