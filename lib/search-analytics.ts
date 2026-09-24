export type SearchEvent =
  | 'assessment_started'
  | 'assessment_completed'
  | 'consultation_clicked'
  | 'contact_form_submitted'
  | 'phone_clicked'
  | 'email_clicked'
  | 'pricing_viewed'
  | 'case_study_viewed';
const allowed = new Set<string>([
  'assessment_started',
  'assessment_completed',
  'consultation_clicked',
  'contact_form_submitted',
  'phone_clicked',
  'email_clicked',
  'pricing_viewed',
  'case_study_viewed',
]);
export function trackSearchEvent(event: string) {
  if (typeof window === 'undefined' || !allowed.has(event)) return;
  // Only an event name and pathname: never form content, email, phone, result or URL parameters.
  window.dispatchEvent(
    new CustomEvent('yudaro:conversion', {
      detail: { event, path: window.location.pathname },
    }),
  );
}
