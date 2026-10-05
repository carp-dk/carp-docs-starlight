---
title: "Configure the CAWS Data Backend"
description: "Download deployments from and upload data to CAWS."
sidebar:
  label: Configure
  order: 2
---

## Configuration

This library uses the [`carp_webservices`](https://pub.dev/packages/carp_webservices) API for accessing CAWS. In order to access CAWS, a [`CarpApp`](https://pub.dev/documentation/carp_webservices/latest/carp_services_carp_services/CarpApp-class.html) needs to be configured like this:

```dart
  // Configure an app that points to the CARP web services (CAWS)
  final Uri uri = Uri(
    scheme: 'https',
    host: 'dev.carp.dk',
  );

  late CarpApp app = CarpApp(
    name: "CAWS @ DTU",
    uri: uri,
    studyId: '<the_study_id_if_known>',
    studyDeploymentId: '<the_study_deployment_id_if_known>',
  );

  // The authentication configuration
  late CarpAuthProperties authProperties = CarpAuthProperties(
    authURL: uri,
    clientId: 'studies-app',
    redirectURI: Uri.parse('carp-studies-auth://auth'),
    // For authentication at CAWS the path is '/auth/realms/Carp'
    discoveryURL: uri.replace(pathSegments: [
      'auth',
      'realms',
      'Carp',
    ]),
  );

  // Configure the CAWS services
  await CarpAuthService().configure(authProperties);
  CarpService().configure(app);

  // Authenticate at CAWS using username and password
  await CarpAuthService().authenticateWithUsernamePassword(
    username: 'the_username',
    password: 'the_password',
  );

// Configure the other services needed.
// Note that these CAWS services work as singletons and can be
// accessed throughout the app.
CarpParticipationService().configureFrom(CarpService());
CarpDeploymentService().configureFrom(CarpService());
```

## Downloading a Study Invitation and Deployment from CAWS

Getting a study invitation and deployment from CAWS is done using the `CarpParticipationService` and `CarpDeploymentService` services, respectively.

```dart
// Get the invitations to studies for this user.
List<ActiveParticipationInvitation> invitations =
    await CarpParticipationService().getActiveParticipationInvitations();

// Use the first (i.e. latest) invitation.
final invitation = invitations[0];
```

The invitation contains information about the deployment, including the `studyDeploymentId` and the device `roleName`. This invitation is used to configure a study, which can be deployed and started in a [`SmartPhoneClientManager`](https://pub.dev/documentation/carp_mobile_sensing/latest/runtime/SmartPhoneClientManager-class.html).

```dart
// Create and configure a client manager for this phone.
// If no deployment service is specified in the configure method,
// the default CarpDeploymentService() singleton is used.
final client = SmartPhoneClientManager();
await client.configure();

// Define the study based on the invitation and add it to the client.
final study = SmartphoneStudy.fromInvitation(invitation);
await client.addStudy(study);

// Deploy the study.
await SmartPhoneClientManager().tryDeployment(
  study.studyDeploymentId,
  study.deviceRoleName,
);

// Resume sampling.
SmartPhoneClientManager().resume();
```
