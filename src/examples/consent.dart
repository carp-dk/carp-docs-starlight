final document = RPConsentDocument(title: 'consent.title', sections: [
  RPConsentSection(
    type: RPConsentSectionType.Overview,
    summary: 'consent.overview.summary',
    content: 'consent.overview.content',
  ),
  RPConsentSection(
    type: RPConsentSectionType.DataGathering,
    summary: 'consent.data.summary',
    content: 'consent.data.content',
  ),
]);
document.addSignature(RPConsentSignature(identifier: 'signature'));

// Read the sections, review and sign, done.
final consent = RPOrderedTask(identifier: 'consent', steps: [
  RPVisualConsentStep(identifier: 'visual', consentDocument: document),
  RPConsentReviewStep(
    identifier: 'review',
    title: 'consent.review.title',
    consentDocument: document,
    reasonForConsent: 'consent.review.reason',
  ),
  RPCompletionStep(identifier: 'done', title: 'consent.done.title', text: 'consent.done.text'),
]);
