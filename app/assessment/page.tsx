import Link from 'next/link';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { AssessmentTool } from '@/components/member-platform';
import { isLocale, type Locale } from '@/lib/i18n';
import { memberCopy } from '@/lib/member-copy';
import { localizedPageMetadata } from '@/lib/seo';
export async function generateMetadata(): Promise<Metadata> {
  const h = await headers();
  const raw = h.get('x-yudaro-locale');
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const t = memberCopy[locale];
  return localizedPageMetadata(
    t.assessment,
    t.assessmentIntro,
    '/assessment',
    locale,
  );
}
export default async function AssessmentPage({
  searchParams,
}: {
  searchParams: Promise<{ industry?: string }>;
}) {
  const h = await headers();
  const raw = h.get('x-yudaro-locale');
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const params = await searchParams;
  const initialIndustry =
    params.industry === 'restaurant' ? 'Restaurant' : undefined;
  return (
    <main className="public-tool-page section-shell">
      <AssessmentTool locale={locale} initialIndustry={initialIndustry} />
      {locale === 'en' && (
        <section className="search-sections">
          <section>
            <h2>What does the AI and ERP readiness assessment measure?</h2>
            <p>
              The free Yudaro assessment helps identify priorities across
              company knowledge, operational systems, data quality and
              repetitive work. It is an initial planning tool for business
              owners, not an audit, implementation quote or guarantee of
              savings.
            </p>
            <p>
              Answer based on current practices. The result can help frame a
              discussion about ERP readiness, private AI use cases and
              automation potential. Restaurant questions adapt to the service
              model.
            </p>
          </section>
          <section>
            <h2>What should you prepare?</h2>
            <p>
              Think about how your team finds procedures, maintains stock and
              customer records, hands work between systems and reviews
              exceptions. You do not need to upload confidential documents,
              financial records or passwords to begin.
            </p>
            <p>
              <Link prefetch={false} href="/methodology/ai-erp-readiness">
                Read the scoring methodology
              </Link>
              {' · '}
              <Link prefetch={false} href="/methodology/roi-calculator">
                Understand ROI assumptions
              </Link>
              {' · '}
              <Link prefetch={false} href="/privacy">
                Review data practices
              </Link>
              {' · '}
              <Link prefetch={false} href="/contact">
                Discuss the results with Yudaro
              </Link>
            </p>
          </section>
          <section>
            <h2>How should you use the results?</h2>
            <p>
              Choose one priority, identify its business owner and validate the
              underlying records. Personalized results are not public reference
              material. A project proposal requires discovery, scope, acceptance
              criteria and a review of your actual environment.
            </p>
          </section>
        </section>
      )}
    </main>
  );
}
