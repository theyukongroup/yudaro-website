import Link from 'next/link';
import { CultureHub, CultureCycle } from '@/components/corporate-culture';
import { ContentSections } from '@/components/search-content';
import { Breadcrumbs, PageSchema } from '@/components/structured-data';
import { contentByPath } from '@/lib/search-content';
import { pageMetadata } from '@/lib/seo';
const entry = contentByPath.get('/corporate-culture-intelligence')!;
export const metadata = pageMetadata(
  entry.title,
  entry.description,
  entry.path,
);
export default function Page() {
  return (
    <main className="search-page culture-page">
      <Breadcrumbs
        items={[
          { href: '/', label: 'Home' },
          { href: '/solutions', label: 'Solutions' },
          { href: entry.path, label: 'Corporate Culture Intelligence' },
        ]}
      />
      <header className="section-shell culture-hero">
        <div>
          <span className="section-index">CORPORATE CULTURE INTELLIGENCE</span>
          <h1>Make Your Company’s Best Thinking Available to Everyone</h1>
          <p>
            Yudaro helps your Corporate AI learn from approved knowledge,
            questions, corrections, and decisions across your organization—so
            its guidance increasingly reflects how your company thinks, serves
            customers, and solves problems.
          </p>
          <div className="actions">
            <Link className="button primary" href="/contact">
              Build Your Corporate Intelligence
            </Link>
            <a className="button secondary" href="#how-it-works">
              See How It Works
            </a>
          </div>
          <p className="culture-note">
            A governed implementation capability within Private AI + ERP
            Business Transformation.
          </p>
        </div>
        <CultureHub />
      </header>
      <CultureCycle />
      <ContentSections entry={entry} />
      <section className="mini-cta section-shell">
        <div>
          <span className="section-index">GROW TOGETHER</span>
          <h2>Your Company’s Knowledge Should Grow With Your Business</h2>
          <p>
            Let Yudaro help transform your company’s experience, values,
            procedures, and best decisions into an intelligence system your team
            can use every day, with security and governance scoped to your
            requirements.
          </p>
        </div>
        <Link href="/contact" className="button primary">
          Schedule a Corporate AI Assessment
        </Link>
      </section>
      <PageSchema
        path={entry.path}
        title={entry.title}
        description={entry.description}
        service
      />
    </main>
  );
}
