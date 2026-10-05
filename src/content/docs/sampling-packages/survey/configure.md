---
title: "Configure Surveys & Cognitive Tests"
description: "Surveys and cognitive tests as app tasks."
sidebar:
  label: Configure
  order: 2
---

To use this package, import it into your app together with the
[`carp_mobile_sensing`](https://pub.dev/packages/carp_mobile_sensing) package:

```dart
import 'package:carp_core/carp_core.dart';
import 'package:carp_mobile_sensing/carp_mobile_sensing.dart';
import 'package:carp_survey_package/survey.dart';
```

Before creating a study and running it, register this package in the [`SamplingPackageRegistry`](https://pub.dev/documentation/carp_mobile_sensing/latest/runtime/SamplingPackageRegistry-class.html).

```dart
SamplingPackageRegistry().register(SurveySamplingPackage());
```

Once this is in place, a survey can be added as a `RPAppTask` to a CAMS protocol like this:

```dart
// Add a task control to the protocol that triggers every day at 13:00,
// issuing a WHO-5 survey while also collecting device and
// ambient light information when survey is initiated by the user.
protocol.addTaskControl(
    RecurrentScheduledTrigger(
      type: RecurrentType.daily,
      time: TimeOfDay(hour: 13),
    ),
    RPAppTask(
        type: SurveyUserTask.SURVEY_TYPE,
        name: 'WHO-5 Survey',
        rpTask: who5Task,
        measures: [
          Measure(type: DeviceSamplingPackage.DEVICE_INFORMATION),
          Measure(type: SensorSamplingPackage.AMBIENT_LIGHT),
        ]),
    phone);
````

The `rpTask` defines the WHO-5 survey. However, in this case, the survey package comes with a build-in English version of this survey, which can be accessed by the `who5Task` property.

A simple assessment of tremor and cognitive functioning for Parkinson's Disease can can be added like this:

```dart
  // Add a Parkinson's assessment consisting of;
  //  * an instruction step
  //  * a timer step that collects accelerometer and gyroscope data while the user is holding the phone
  //  * a Flanker test (from cognition package).
  //  * a Tapping Activity test (from cognition package).
  //
  // Accelerometer and gyroscope data is collected while the user is performing
  // the task in oder to assess tremor.
protocol.addTaskControl(
  PeriodicTrigger(period: const Duration(hours: 2)),
  RPAppTask(
      type: SurveyUserTask.COGNITIVE_ASSESSMENT_TYPE,
      title: "Parkinson's' Assessment",
      description: "A simple task assessing motor and cognitive functioning.",
      minutesToComplete: 3,
      rpTask: RPOrderedTask(
        identifier: "parkinsons_assessment",
        steps: [
          RPInstructionStep(
              identifier: 'parkinsons_instruction',
              title: "Parkinsons' Disease Assessment",
              text:
                  "In the following pages, you will be asked to solve two simple test which will help assess "
                  "your symptoms on a daily basis. Each test has an instruction page, which you should read "
                  "carefully before starting the test.\n\n"
                  "Please sit down comfortably and hold the phone in one hand while performing the test "
                  "with the other."),
          RPTimerStep(
            identifier: 'timer_1',
            timeout: const Duration(seconds: 6),
            title:
                "Please stand up and hold the phone in one hand and lift it in a straight arm "
                "until you hear the sound.",
            playSound: true,
          ),
          RPFlankerActivity(
            identifier: 'flanker_1',
            lengthOfTest: 30,
            numberOfCards: 10,
          ),
          RPTappingActivity(
            identifier: 'tapping_1',
            lengthOfTest: 10,
          )
        ],
      ),
      measures: [
        Measure(type: SensorSamplingPackage.ACCELERATION),
        Measure(type: SensorSamplingPackage.ROTATION),
      ]),
  phone);
  ```
