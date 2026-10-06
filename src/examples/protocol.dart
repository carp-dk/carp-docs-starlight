final protocol = SmartphoneStudyProtocol(
  name: 'My first study',
  // Texts are translation keys, see "Translations" below.
  studyDescription: StudyDescription(
    title: 'study.title',
    description: 'study.description',
    purpose: 'study.purpose',
  ),
  dataEndPoint: SQLiteDataEndPoint(),
);

// The phone collects the data, the participant is the person using it.
final phone = Smartphone();
protocol.addPrimaryDevice(phone);
protocol.addParticipantRole(ParticipantRole('Participant'));

// Start right away and keep collecting in the background.
protocol.addTaskControl(
  ImmediateTrigger(),
  BackgroundTask(name: 'Steps and battery', measures: [
    Measure(type: SensorSamplingPackage.STEP_EVENT),
    Measure(type: DeviceSamplingPackage.BATTERY_STATE),
  ]),
  phone,
);
