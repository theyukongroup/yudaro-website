import { AuthorityPage } from '@/components/authority-page';
import { authorityMetadata } from '@/lib/seo';
export const metadata = authorityMetadata(
  'Trust, Data & AI Practices',
  'How Yudaro approaches data access, permissions, human oversight, security boundaries, and responsible AI limitations.',
  '/trust',
);
export default function Page() {
  return (
    <AuthorityPage
      eyebrow="TRUST & TRANSPARENCY"
      title="Control begins with clear boundaries and accountable people."
      intro="Security and privacy depend on actual architecture, configuration, contracts, operating procedures, and people—not a product label. Yudaro does not claim certifications that have not been independently verified."
      sections={[
        {
          title: 'Deployment and ownership',
          body: 'Local hardware and controlled hosting have different maintenance and data-flow responsibilities. Agree source ownership, export access, vendor responsibilities and administrative control in the project scope. Local inference alone does not establish that OCR, embeddings, backups or telemetry remain local.',
        },
        {
          title: 'Retrieval and integration boundaries',
          body: 'Retrieval-augmented generation selects source material for an answer; it does not guarantee accuracy. Test permissions before retrieval, document deletion and revision handling, scoped ERP tools, and human approval for sensitive writes. Retrieved document text must not grant new permissions.',
        },
        {
          title: 'Recovery and operating responsibility',
          body: 'Identify who updates dependencies, monitors connectors, reviews logs and tests recovery. Backup frequency, retention and recovery objectives must be agreed for the actual deployment, not assumed from a generic package.',
        },
        {
          title: 'Data minimization',
          body: 'A solution should use only information required for its approved purpose. Data sources, access paths, retention, and administrative ownership should be documented before production use.',
        },
        {
          title: 'Permissions and oversight',
          body: 'Access follows business roles. High-impact, sensitive, financial, personnel, safety, or irreversible actions require defined human review and auditability.',
        },
        {
          title: 'AI limitations',
          body: 'AI output can be incomplete, outdated, ambiguous, or wrong. Retrieval improves grounding but does not eliminate error. Important answers and proposed actions must remain traceable and reviewable.',
        },
        {
          title: 'Implementation-specific security',
          body: 'Backups, updates, identity, network controls, logging, encryption, vendor terms, incident response, and recovery must be designed for the actual environment. No universal configuration is represented as sufficient.',
        },
      ]}
    />
  );
}
