import Link from 'next/link';
import { ArchitectureDiagram } from '@/components/architecture-diagram';
import { Breadcrumbs, PageSchema } from '@/components/structured-data';
import Image from 'next/image';
import { SolutionPage } from '@/components/solution-page';
import {
  ArrowRight,
  BrainCircuit,
  Check,
  Database,
  ShieldCheck,
  Workflow,
} from 'lucide-react';
import { pageMetadata, SITE_URL } from '@/lib/seo';
export const metadata = pageMetadata(
  'AI ERP Systems & Integration for Business',
  'Learn how Yudaro connects Private AI with Odoo ERP data, permissions, and human-approved workflows for practical business operations.',
  '/ai-erp',
);
const items = [
  [
    'Ask operational questions',
    'Turn live sales, customer, inventory, delivery, and purchasing data into immediate, understandable answers.',
  ],
  [
    'Create business records',
    'Draft quotations, prepare purchase recommendations, or assemble work orders through a governed AI workflow.',
  ],
  [
    'Find what needs attention',
    'Identify dormant customers, low stock, delivery risks, and process exceptions before they become larger problems.',
  ],
  [
    'Automate across departments',
    'Coordinate actions between CRM, sales, inventory, purchasing, accounting, and operations without duplicating work.',
  ],
  [
    'Protect control and accountability',
    'Design permissions, approvals, source grounding, and auditability into every assisted action.',
  ],
  [
    'Improve continuously',
    'Use real business outcomes to refine workflows, knowledge, and employee experience over time.',
  ],
];
const images = [
  {
    src: '/ai-erp/operational-questions.webp',
    alt: 'Business leader asking a question about current operational data',
  },
  {
    src: '/ai-erp/create-records.webp',
    alt: 'Employee preparing governed business records for approval',
  },
  {
    src: '/ai-erp/find-attention.webp',
    alt: 'Operations manager identifying exceptions across customers, stock, and deliveries',
  },
  {
    src: '/ai-erp/cross-department-automation.webp',
    alt: 'Connected workflow coordinating multiple business departments',
  },
  {
    src: '/ai-erp/control-accountability.webp',
    alt: 'Controlled workflow with permissions, approval, references, and audit records',
  },
  {
    src: '/ai-erp/continuous-improvement.webp',
    alt: 'Team refining an operational workflow using measured outcomes',
  },
];
const flow = [
  [
    '01',
    'Understand the request',
    'The employee asks in everyday language. The system identifies the business intent, relevant records, and permitted scope.',
  ],
  [
    '02',
    'Ground the answer',
    'Private company knowledge and current ERP data are retrieved so the response reflects real policies, customers, products, and transactions.',
  ],
  [
    '03',
    'Prepare the action',
    'AI drafts the recommendation, document, or record change while preserving source details and business rules.',
  ],
  [
    '04',
    'Review and execute',
    'The right employee approves sensitive actions. The ERP records the result, ownership, and next step for a complete audit trail.',
  ],
];
const examples = [
  [
    'Sales',
    'Summarize an account, identify inactive customers, draft follow-up messages, and prepare quotations using current pricing and availability.',
  ],
  [
    'Purchasing',
    'Review demand, lead times, and low-stock risk; then prepare supplier recommendations for an authorized buyer.',
  ],
  [
    'Operations',
    'Surface late orders, service bottlenecks, capacity constraints, and exceptions that need a manager’s attention.',
  ],
  [
    'Customer service',
    'Bring together order history, policies, product information, and open issues so employees can respond accurately and consistently.',
  ],
  [
    'Finance',
    'Explain operational drivers behind receivables, margins, and cash-flow changes without replacing financial review or approval.',
  ],
  [
    'Management',
    'Turn live operating data into concise daily briefings, trend summaries, and prioritized decisions.',
  ],
];
const questions = [
  [
    'What is AI ERP?',
    'AI ERP combines artificial intelligence with an enterprise resource planning system. The ERP remains the system of record for customers, products, inventory, orders, purchasing, service, and finance. AI provides a language and reasoning layer that can retrieve permitted information, summarize records, identify exceptions, and prepare actions. Reliable implementations keep permissions, approvals, source references, and audit trails around every sensitive use.',
  ],
  [
    'How does AI ERP differ from traditional ERP?',
    'Traditional ERP uses forms, reports, rules, and predefined workflows. AI ERP adds natural-language retrieval, summarization, classification, and recommendation capabilities. It should extend—not bypass—the ERP controls that protect pricing, inventory, accounting, approvals, and data access.',
  ],
  [
    'How does AI ERP differ from standalone AI?',
    'Standalone AI usually lacks live operational context and cannot safely act inside business systems. An integrated system can work with current ERP records and approved company knowledge, but only through defined tools and permissions. The integration layer, not the chatbot interface, determines what data and actions are available.',
  ],
  [
    'Can AI query ERP data and generate reports?',
    'Yes, when the integration exposes approved records and reporting functions. It can answer questions about sales, inventory, purchasing, deliveries, service, and management trends. Important totals should come from deterministic ERP queries, while AI explains the result and cites the underlying records or report.',
  ],
  [
    'Can AI perform actions in an ERP?',
    'Yes, but access should be bounded. A safer progression starts with read-only questions, then draft records, then explicitly approved actions. Price exceptions, payments, accounting entries, vendor commitments, safety decisions, deletions, and other high-impact actions should retain human authorization.',
  ],
  [
    'How can Private AI work with Odoo?',
    'A controlled integration can connect an approved AI service to Odoo records and workflows through documented interfaces or a governed middleware layer. Availability, licensing, permissions, and production suitability must be verified for the customer’s actual Odoo edition and version.',
  ],
  [
    'What does AI ERP cost and how long does it take?',
    'Cost and timing depend on data quality, workflows, users, permissions, integrations, migration, infrastructure, testing, and training. A focused read-only reporting or knowledge workflow may take weeks. Multi-company ERP, manufacturing, extensive migration, or action-taking automation can take months and should be delivered in controlled phases.',
  ],
  [
    'Who benefits—and who may not need it yet?',
    'Businesses with repeated operational questions, disconnected data, complex handoffs, or large procedure libraries can benefit. A company may not be ready if its core records are unreliable, processes have no owners, or a simple report or workflow rule would solve the problem more safely. In that case, data and ERP foundations should come first.',
  ],
];
const faqSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${SITE_URL}/ai-erp#service`,
      name: 'AI ERP Systems and Integration',
      provider: { '@id': `${SITE_URL}/#organization` },
      areaServed: 'United States',
      serviceType: 'AI and ERP integration',
      description:
        'Private AI connected to ERP data and controlled business workflows.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: questions.map(([name, text]) => ({
        '@type': 'Question',
        name,
        acceptedAnswer: { '@type': 'Answer', text },
      })),
    },
  ],
};
export default function Page() {
  return (
    <>
      <Breadcrumbs
        items={[
          { href: '/', label: 'Home' },
          { href: '/solutions', label: 'Solutions' },
          { href: '/ai-erp', label: 'AI + ERP Integration' },
        ]}
      />
      <SolutionPage
        eyebrow="AI ERP SYSTEMS & INTEGRATION"
        title="AI ERP: connect intelligence with business operations."
        intro="AI ERP connects a governed AI layer to the records, knowledge, permissions, and workflows that run a business. Yudaro designs this connection around Odoo ERP, Private AI, and human accountability."
        quote="Which customers have not ordered in 60 days, and prepare a follow-up list for the sales team?"
        items={items.map(([title, body], i) => ({
          title,
          body,
          image: images[i],
        }))}
      >
        <section className="section-shell ai-erp-authority">
          <span className="section-index">THE PRACTICAL DEFINITION</span>
          <h2>What is AI ERP?</h2>
          <p className="answer-lead">{questions[0][1]}</p>
          <div className="ai-erp-compare">
            <article>
              <h3>Traditional ERP</h3>
              <p>
                Structured records, exact calculations, transaction controls,
                reports, and repeatable workflows.
              </p>
            </article>
            <article>
              <h3>AI-enabled ERP</h3>
              <p>
                The same operating controls, plus natural-language retrieval,
                summaries, recommendations, and carefully bounded actions.
              </p>
            </article>
            <article>
              <h3>Standalone AI</h3>
              <p>
                Useful for general writing and reasoning, but normally
                disconnected from current records, business permissions, and
                accountable execution.
              </p>
            </article>
          </div>
        </section>
        <section className="ai-erp-explainer">
          <div className="section-shell ai-erp-intro">
            <div>
              <span className="section-index">HOW THE CONNECTION WORKS</span>
              <h2>One governed path from question to action.</h2>
            </div>
            <p>
              ERP supplies the operational truth. Your private knowledge
              supplies the context. AI makes both easier to understand and
              use—without giving an unrestricted assistant control of the
              business.
            </p>
          </div>
          <div className="section-shell ai-erp-section-visual dark">
            <Image
              src="/ai-erp/connection-works.webp"
              alt="Operations leader and technology specialist reviewing connected business information"
              fill
              sizes="(max-width: 700px) 100vw, 1200px"
            />
          </div>
          <div className="section-shell ai-erp-pillars">
            <article>
              <Database />
              <h3>Live operational data</h3>
              <p>
                Customers, products, inventory, orders, purchasing, projects,
                service activity, and financial status.
              </p>
            </article>
            <article>
              <BrainCircuit />
              <h3>Company knowledge</h3>
              <p>
                Policies, procedures, product guidance, contracts, training
                material, and the expertise your team relies on.
              </p>
            </article>
            <article>
              <ShieldCheck />
              <h3>Controlled execution</h3>
              <p>
                Role-based permissions, approval thresholds, source references,
                action logs, and human review where risk requires it.
              </p>
            </article>
          </div>
        </section>
        <section className="section-shell ai-erp-flow">
          <div className="section-head">
            <span className="section-index">A PRACTICAL WORKFLOW</span>
            <h2>Useful automation still keeps people accountable.</h2>
            <p>
              The system separates understanding, evidence, preparation, and
              execution so employees can move faster without losing oversight.
            </p>
          </div>
          <div className="ai-erp-section-visual">
            <Image
              src="/ai-erp/practical-workflow.webp"
              alt="Employee and manager reviewing a prepared business action before approval"
              fill
              sizes="(max-width: 700px) 100vw, 1200px"
            />
          </div>
          <div>
            {flow.map(([number, title, body]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="ai-erp-examples">
          <div className="section-shell">
            <div className="section-head">
              <span className="section-index">WHERE IT CREATES VALUE</span>
              <h2>One connected assistant across the operation.</h2>
              <p>
                The same governed foundation can support different departments
                while respecting the data and actions each role is allowed to
                use.
              </p>
            </div>
            <div className="ai-erp-section-visual">
              <Image
                src="/ai-erp/creates-value.webp"
                alt="Cross-functional team using connected information during an operations review"
                fill
                sizes="(max-width: 700px) 100vw, 1200px"
              />
            </div>
            <div className="ai-erp-example-grid">
              {examples.map(([title, body]) => (
                <article key={title}>
                  <Workflow />
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
            <a className="text-link" href="/contact?service=ai-erp">
              Discuss your highest-value workflow <ArrowRight size={16} />
            </a>
          </div>
        </section>
        <section className="section-shell ai-erp-guardrails">
          <div>
            <span className="section-index">DESIGNED FOR TRUST</span>
            <h2>Automation should be powerful, observable, and reversible.</h2>
            <a className="text-link" href="/resources/ai-erp">
              Read the practical AI + ERP guide <ArrowRight size={16} />
            </a>
          </div>
          <ul>
            {[
              'Responses grounded in approved company sources',
              'Least-privilege access based on each employee’s role',
              'Human approval before sensitive or high-impact actions',
              'Source references and action histories for accountability',
              'Testing, monitoring, and improvement against real outcomes',
              'Clear fallbacks when confidence or required data is insufficient',
            ].map((x) => (
              <li key={x}>
                <Check size={16} />
                {x}
              </li>
            ))}
          </ul>
        </section>
        <section className="search-sections section-shell">
          <h2>How do read-only tools differ from write-enabled agents?</h2>
          <p>
            A read-only integration retrieves permitted records and explains
            them. A write-enabled agent also proposes a change, but execution
            needs a separate approval and validation path. Yudaro scopes those
            paths independently so a useful query demonstration is not mistaken
            for permission to change prices, confirm orders or post
            transactions.
          </p>
          <ArchitectureDiagram variant="write" />
          <h2>What should an implementation proposal specify?</h2>
          <p>
            A proposal should name the business workflow, allowed ERP
            operations, data sources, responsible users and acceptance tests. It
            should separate document retrieval from live transactional queries,
            and define what happens when the ERP is unavailable, evidence is
            incomplete or a request crosses company boundaries. Approval, audit
            logging and recovery responsibilities belong in the scope.
          </p>
          <ul>
            <li>
              Inventory: distinguish physical stock, reservations and expected
              receipts.
            </li>
            <li>
              Sales and CRM: preserve customer access, price terms and account
              ownership.
            </li>
            <li>
              Purchasing: validate quantities, units and suppliers before buyer
              approval.
            </li>
            <li>
              Management: use consistent reporting periods and explain data
              freshness.
            </li>
          </ul>
          <p>
            <Link prefetch={false} href="/resources/ai-erp">
              Read the AI ERP implementation guide
            </Link>
            {' · '}
            <Link
              prefetch={false}
              href="/resources/architecture/private-ai-odoo"
            >
              Review the reference architecture and failure tests
            </Link>
            {' · '}
            <Link prefetch={false} href="/case-studies">
              Understand our evidence standards
            </Link>
          </p>
        </section>
        <section className="ai-erp-faq">
          <div className="section-shell">
            <div className="section-head">
              <span className="section-index">AI ERP QUESTIONS</span>
              <h2>Direct answers for business decision-makers.</h2>
              <p>
                Useful capability depends on the controls and preparation around
                it.
              </p>
            </div>
            <div className="ai-erp-faq-grid">
              {questions.slice(1).map(([question, answer]) => (
                <article key={question}>
                  <h3>{question}</h3>
                  <p>{answer}</p>
                </article>
              ))}
            </div>
            <div className="ai-erp-next">
              <div>
                <h3>A sensible starting sequence</h3>
                <ol>
                  <li>Choose one measurable operating problem.</li>
                  <li>Confirm the source records and process owner.</li>
                  <li>Begin with read-only retrieval and reporting.</li>
                  <li>Add draft actions and human approval.</li>
                  <li>
                    Measure accuracy, adoption, time saved, and exceptions.
                  </li>
                </ol>
              </div>
              <div>
                <h3>Continue your research</h3>
                <a href="/resources/private-ai">
                  Private AI for business <ArrowRight size={15} />
                </a>
                <a href="/resources/odoo-erp">
                  Odoo ERP implementation <ArrowRight size={15} />
                </a>
                <a href="/resources/comparisons">
                  Private AI, ChatGPT, and ERP comparisons{' '}
                  <ArrowRight size={15} />
                </a>
                <a href="/resources/guides">
                  AI ERP cost and planning <ArrowRight size={15} />
                </a>
                <a href="/industries">
                  AI ERP by industry <ArrowRight size={15} />
                </a>
              </div>
            </div>
            <a className="button primary" href="/assessment">
              Get My Free AI + ERP Assessment <ArrowRight size={17} />
            </a>
          </div>
        </section>
      </SolutionPage>
      <PageSchema
        path="/ai-erp"
        title="AI ERP Systems & Integration for Business"
        description="Private AI and Odoo ERP integration with scoped tools and human-approved workflows."
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c'),
        }}
      />
    </>
  );
}
