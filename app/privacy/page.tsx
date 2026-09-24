import { AuthorityPage } from '@/components/authority-page';
import { authorityMetadata } from '@/lib/seo';
export const metadata = authorityMetadata(
  'Privacy Policy',
  'How Yudaro handles information submitted through its website, assessments, member tools, and consultation requests.',
  '/privacy',
);
export default function Page() {
  return (
    <AuthorityPage
      eyebrow="PRIVACY & DATA"
      title="Clear expectations for information you share."
      intro="This policy explains current website practices. Yudaro does not sell personal information. For questions or requests, call 281-258-8000."
      sections={[
        {
          title: 'Information collected',
          body: 'Contact destination details, company and project information, assessment responses, profile information, saved roadmaps, and consultation requests may be collected when you choose to provide or save them.',
        },
        {
          title: 'How information is used',
          body: 'Information supports requested tools and services, account administration, consultation follow-up, security, troubleshooting, and improvement of the Yudaro experience. Personalized data is not published as public SEO content.',
        },
        {
          title: 'Access and retention',
          body: 'Access should be limited to authorized personnel and service providers needed to operate the platform. Retention depends on the account, service, operational, legal, and security purpose involved.',
        },
        {
          title: 'Optional analytics',
          body: 'When configured, optional Google Analytics is disabled until you allow it through Analytics preferences. It measures page paths and named actions, not consultation form details, assessment results or URL query parameters. Declining does not prevent use of business tools. Existing first-party tool events support service operation and improvement; optional analytics consent does not disable those operational records.',
        },
        {
          title: 'Your choices',
          body: 'You may choose not to submit a consultation request or create an account. To request access, correction, or deletion where applicable, contact Yudaro and provide enough information to verify the account or request.',
        },
        {
          title: 'Contact',
          body: 'Yudaro AI & ERP Systems, 13366 Murphy Road, Stafford, TX 77477. Phone: 281-258-8000. ',
        },
      ]}
    />
  );
}
