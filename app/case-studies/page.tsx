import Link from 'next/link';
import { Breadcrumbs, PageSchema } from '@/components/structured-data';
import { authorityMetadata } from '@/lib/seo';
export const metadata = authorityMetadata(
  'AI & ERP Case Studies: Evidence and Evaluation',
  'How Yudaro evaluates AI and ERP implementations: scope, architecture, test evidence, measured outcomes and publication standards.',
  '/case-studies',
);
export default function Page() {
  return (
    <main className="search-page">
      <Breadcrumbs
        items={[
          { href: '/', label: 'Home' },
          { href: '/case-studies', label: 'Case studies' },
        ]}
      />
      <header className="section-shell search-hero">
        <div>
          <span className="section-index">EVIDENCE & IMPLEMENTATION</span>
          <h1>AI & ERP implementation evidence.</h1>
          <p>
            Yudaro does not currently publish an approved customer case study.
            The workflows on this site are illustrative; they do not represent
            verified clients or measured results.
          </p>
        </div>
      </header>
      <div className="search-sections section-shell">
        <section>
          <h2>What should a useful case study prove?</h2>
          <p>
            A useful study connects a documented business problem to an
            implementation, a tested workflow and an observable result. Readers
            should be able to distinguish measured outcomes from estimates and
            understand what changed besides the software. Customer consent, an
            observation period and supporting evidence are prerequisites for
            publication, including anonymous studies.
          </p>
        </section>
        <section>
          <h2>How will Yudaro present implementation evidence?</h2>
          <div className="search-table">
            <table>
              <thead>
                <tr>
                  <th scope="col">Evidence</th>
                  <th scope="col">What readers should see</th>
                </tr>
              </thead>
              <tbody>
                {[
                  [
                    'Context',
                    'Client type, prior process, constraints and requirements',
                  ],
                  [
                    'Design',
                    'Architecture, permissions, integrations and technology versions',
                  ],
                  [
                    'Delivery',
                    'Implementation sequence, test workflow and acceptance checks',
                  ],
                  [
                    'Results',
                    'Baseline, observation period, measurement method and limitations',
                  ],
                  [
                    'Lessons',
                    'Unexpected issues, tradeoffs and ongoing responsibilities',
                  ],
                ].map(([a, b]) => (
                  <tr key={a}>
                    <th scope="row">{a}</th>
                    <td>{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section>
          <h2>What can you review now?</h2>
          <p>
            Review the reference architecture and evaluation criteria before
            discussing a project. Ask which parts fit your actual environment,
            what evidence is still needed and who would own each acceptance
            test.
          </p>
          <ul>
            <li>
              <Link
                prefetch={false}
                href="/resources/architecture/private-ai-odoo"
              >
                Private AI + Odoo reference architecture and failure tests
              </Link>
            </li>
            <li>
              <Link prefetch={false} href="/resources/ai-erp">
                AI ERP guide and pilot evaluation
              </Link>
            </li>
            <li>
              <Link prefetch={false} href="/industries/restaurants">
                Restaurant POS and ERP workflow
              </Link>
            </li>
            <li>
              <Link prefetch={false} href="/industries/distribution">
                Distribution workflow and implementation scope
              </Link>
            </li>
            <li>
              <Link prefetch={false} href="/contact">
                Discuss your requirements and evidence needs
              </Link>
            </li>
          </ul>
        </section>
      </div>
      <PageSchema
        path="/case-studies"
        title="AI & ERP implementation evidence"
        description="Yudaro case-study evidence and evaluation standards."
      />
    </main>
  );
}
