---
title: "Consent, Messages and Translations"
description: "Download deployments from and upload data to CAWS."
sidebar:
  label: Resources
  order: 3
---

CAWS handles three types of special-purpose resources:

* The informed consent document to be shown to the user
* A set of messages and news items to be show to the user
* Translation files that can help translate the text used in a study deployment protocol (like the text is a user survey)

Each of the are handled by an [InformedConsentManager](https://pub.dev/documentation/carp_backend/latest/carp_backend/InformedConsentManager-class.html), [MessageManager](https://pub.dev/documentation/carp_backend/latest/carp_backend/MessageManager-class.html), and [LocalizationManager](https://pub.dev/documentation/carp_backend/latest/carp_backend/LocalizationManager-class.html), respectively. All of these managers are implemented in the [CarpResourceManager](https://pub.dev/documentation/carp_backend/latest/carp_backend/CarpResourceManager-class.html) manager.

## Informed Consent Documents

Here is an example of uploading and downloading an informed consent document to be shown to the user (via the [Research Package](https://pub.dev/packages/research_package)):

```dart
// Create and initialize the informed consent manager.
//
// The CarpResourceManager() is a singleton that uses the
// the CarpService() singleton for accessing CAWS. Hence,
// CarpService needs to be authenticated and initialized before
// using the CarpResourceManager.
InformedConsentManager icManager = CarpResourceManager();
icManager.initialize();

// Create a simple informed consent...
final consent = RPOrderedTask(
  identifier: '12',
  steps: [
    RPInstructionStep(identifier: "1", title: "Welcome!")
      ..text = "Welcome to this study! ",
    RPCompletionStep(
      identifier: "2",
      title: "Thank You!",
      text: "We saved your consent document.",
    ),
  ],
);
// .. and upload it to CAWS.
await icManager.setConsentDocument(consent);

// Get the informed consent back as a RPOrderedTask, if available.
RPOrderedTask? myConsent = await icManager.getConsentDocument();
```

Note that we distinguish between a **"consent document"** and the **"informed consent"**.
A consent document is typically created and uploaded once for a study. Then later, all participants (i.e., deployments) can access this informed consent document via the `getConsentDocument` method, and show it to the user for signature.
Once the consent document is signed by the user, it can be stored as an [InformedConsentInput](https://pub.dev/documentation/carp_core/latest/common/InformedConsentInput-class.html) and then be uploaded to CAWS using the [`setInformedConsent`](https://pub.dev/documentation/carp_webservices/latest/carp_services_carp_services/ParticipationReference/setInformedConsent.html) method on a [`ParticipationReference`](https://pub.dev/documentation/carp_webservices/latest/carp_services_carp_services/ParticipationReference-class.html).

## Messages

Below are examples of how messages can be uploaded and retrieved from CAWS:

```dart
// Create and initialize the message manager.
MessageManager messageManager = CarpResourceManager();
messageManager.initialize();

// Create a message and upload it to CAWS.
messageManager.setMessage(Message(
  id: '123',
  title: 'Great News!',
  message: 'There are great news from CARP',
  type: MessageType.news,
));

// Get all messages from CAWS.
messageManager.getMessages().then((messages) {
  print('Messages: $messages');
});

// Get a specific message from CAWS.
messageManager.getMessage('123').then((message) {
  print('Message: $message');
});

// Delete a specific message from CAWS.
messageManager.deleteMessage('123').then((_) {
  print('Message deleted...');
});
```

## Translations Files

Translations files can be up- and downloaded like this:

```dart
// Create and initialize the message manager.
LocalizationManager localizationManager = CarpResourceManager();
localizationManager.initialize();

// A Danish locale
var locale = Locale('da');

// Create a translation file for Danish and upload it to CAWS.
localizationManager.setLocalizations(locale, {
  'morning': 'morgen',
  'midday': 'middag',
  'evening': 'aften',
});

// Get translation file for Danish
if (localizationManager.isSupported(locale)) {
  localizationManager.getLocalizations(locale);
}
```

:::note
Using translations in an app is a whole separate topic, which is supported by the [Research Package](https://pub.dev/packages/research_package) and described in this tutorial on [Localization Support in Research Package](https://carp.dk/localization/). An example of using localization downloaded from CAWS can be found in the [CARP Studies App](https://github.com/cph-cachet/carp_studies_app). In the `carp_study_app.dart` file a [RPLocalizationsDelegate](https://pub.dev/documentation/research_package/latest/ui/RPLocalizationsDelegate-class.html) is used, which again used a [ResourceLocalizationLoader](https://github.com/cph-cachet/carp_studies_app/blob/master/lib/data/localization_loader.dart) to load the translations from CAWS.
:::
