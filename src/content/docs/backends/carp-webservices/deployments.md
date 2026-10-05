---
title: "Deployments"
description: "Dart client for CARP Web Services (CAWS)."
sidebar:
  label: Deployments
  order: 4
---

A core notion of CARP is the [Deployment](https://github.com/cph-cachet/carp.core-kotlin/blob/develop/docs/carp-deployments.md) subsystem, which has two services:

- **Participation Service** - allows retrieving participation information for study deployments, and managing data related to participants which is input by users.
- **Deployment Service** - allows for retrieving primary device deployments for participating primary devices as defined in the study protocol.

## Participation Service

Enables the client to get invitations for a specific `accountId`, i.e. a user. Default is the user who is authenticated to the CARP Service.

```dart
// We assume that we are authenticated to CAWS and that the CarpService()
// instance has been configured.

// Configure from another CAWS service
CarpParticipationService().configureFrom(CarpService());

// Get invitations for this account (user)
List<ActiveParticipationInvitation> invitations =
    await CarpParticipationService().getActiveParticipationInvitations();
```

There is also support for showing a modal UI dialog for the user to select amongst several invitations. This is done using the `getStudyInvitation` method, like this:

```dart
var invitation =
    await CarpParticipationService().getStudyInvitation(context);
```

The invitation holds information on the study deployment. So, once you (or the user) has selected an invitation, you can let the CAWS services know about the deployment by using the `setInvitation` method:

```dart
CarpParticipationService().setInvitation(invitation);
```

The participant service also handles the collection of "participant data", which are specified in the [`StudyProtocol`](https://pub.dev/documentation/carp_core/latest/protocol/StudyProtocol-class.html) (as [`expectedParticipantData`](https://pub.dev/documentation/carp_core/latest/protocol/StudyProtocol/expectedParticipantData.html)).

You can get and set participation data like this:

```dart
// Get participant data for a deployment with id [deploymentId].
final data = await CarpParticipationService().getParticipantData(deploymentId);

// Set participant data for a deployment with id [deploymentId].
// When role name is not specified, this data is set for the entire deployment.
await CarpParticipationService().setParticipantData(
  testDeploymentId,
  {
    AddressInput.type: AddressInput(
      address1: 'DTU HealthTech',
      address2: 'Technical University of Denmark',
      street: 'Ørsteds Plads',
      city: 'Kgs. Lyngby',
      postalCode: 'DK-2800',
      country: 'Denmark',
    )
  },
);
```

However, a more convenient way to handle participant data is to use a [`ParticipationReference`](https://pub.dev/documentation/carp_webservices/latest/carp_services_carp_services/ParticipationReference-class.html), which can be obtained from the `CarpParticipationService` singleton.

```dart
ParticipationReference participation = CarpParticipationService().participation();
```

A `ParticipationReference` can now be used to set and get participant data, including the more specialized "Informed Consent" data type:

```dart
// The following example is from a family deployment with a father, mother, and child.

// Get all participant data for this deployment
ParticipantData data = await participation.getParticipantData();

// Set the address of the deployment (i.e., the family)
data = await participation.setParticipantData(
  {
    AddressInput.type: AddressInput(
      address1: 'Peder Bangs Vej 3',
      city: 'Kgs. Lyngby',
      postalCode: 'DK-2800',
      country: 'Denmark',
    )
  },
);

// Set role-specific data (sex of the father)
final data = await participation.setParticipantData(
  {SexInput.type: SexInput(value: Sex.Male)},
  father,
);

// Set the informed consent for a user (father)
await participation.setInformedConsent(
  InformedConsentInput(
    userId: 'ec44c84d-3acd-45d5-83ef-1511e0c39e48',
    name: father,
    consent: 'I agree!',
    signatureImage: 'blob',
  ),
  father,
);

// Get the informed consent for all role names in this deployment
Map<String, InformedConsentInput?> consent = await participation.getInformedConsent();

// Remove the informed consent for a user (father)
await participation.removeInformedConsent(father);
```

## Deployment Service

The Deployment Service handles "deployment" configurations, i.e. configurations that describe how data sampling in a study should take place.

The [`CarpDeploymentService`](https://pub.dev/documentation/carp_webservices/latest/carp_services/CarpDeploymentService-class.html) has methods for getting deployments and for updating deployment and device status. Here are a list of examples:

```dart
// We assume that we are authenticated to CAWS and that the CarpService()
// instance has been configured.

CarpDeploymentService().configureFrom(CarpService());

// Get the deployment status.
StudyDeploymentStatus status = await CarpDeploymentService()
    .getStudyDeploymentStatus(deploymentId);

// Register the primary device for the deployment.
await CarpDeploymentService().registerDevice(
    deploymentId,
    status.primaryDeviceStatus!.device.roleName,
    DefaultDeviceRegistration(deviceDisplayName: 'Samsung A10'));

// Get the deployment describing what data to collect.
PrimaryDeviceDeployment deployment = await CarpDeploymentService().getDeviceDeploymentFor(
  deploymentId,
  status.primaryDeviceStatus!.device.roleName,
);

// Mark the deployment as successfully deployed on this device.
await CarpDeploymentService().deviceDeployed(
  deploymentId,
  status.primaryDeviceStatus!.device.roleName,
  deployment.lastUpdatedOn,
);
```

However, instead of keeping track of deployment IDs, a more convenient way to access deployments are to use a [`DeploymentReference`](https://pub.dev/documentation/carp_webservices/latest/carp_services_carp_services/DeploymentReference-class.html):

```dart
// We assume that we are authenticated to CAWS, that the CarpService()
// instance has been configured, and that the deployment information has
// be saved by setting the invitation (using the 'setInvitation' method).

CarpDeploymentService().configureFrom(CarpService());

// get a deployment reference to the invited deployment
final deploymentReference = CarpDeploymentService().deployment();

// get the status of this deployment
var status = await deploymentReference.getStatus();

// register a device
status = await deploymentReference.registerDevice(
    status.primaryDeviceStatus!.device.roleName,
    DefaultDeviceRegistration(deviceDisplayName: 'Samsung A10'));

// get the primary device deployment
var deployment = await deploymentReference.get();

// mark the deployment as a successfully deployed
status = await deploymentReference.deployed();
```
