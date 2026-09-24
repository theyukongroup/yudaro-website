import Link from 'next/link';
import Image from 'next/image';
import { searchContent } from '@/lib/search-content';
import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata(
  'Industry ERP, Private AI & Automation',
  'Explore connected workflows for distribution, manufacturing, retail, restaurants, construction, field service and professional services.',
  '/industries',
);
export default function Page() {
  return (
    <main>
      <section className="inner-hero section-shell">
        <span className="section-index">INDUSTRIES</span>
        <h1>Connected systems for the way your industry works.</h1>
        <p>
          Start with the operating problem, then connect records, knowledge and
          workflows. These examples describe implementation possibilities, not
          customer testimonials or measured client results.
        </p>
      </section>
      <section className="section-shell detail-grid">
        {searchContent
          .filter((e) => e.path.startsWith('/industries/'))
          .map((e) => (
            <article className="detail-card-image" key={e.path}>
              <div className="detail-visual">
                <Image
                  src={e.image!}
                  alt=""
                  width={760}
                  height={760}
                  sizes="(max-width:640px) 100vw, (max-width:900px) 50vw, 33vw"
                />
              </div>
              <div className="detail-copy">
                <h2>{e.title}</h2>
                <p>{e.intro}</p>
                <Link prefetch={false} className="text-link" href={e.path}>
                  Explore the workflow
                </Link>
              </div>
            </article>
          ))}
        <article className="detail-card-image">
          <div className="detail-visual">
            <Image
              src="/restaurants/management-ai.webp"
              alt=""
              width={760}
              height={760}
              sizes="(max-width:640px) 100vw, 33vw"
            />
          </div>
          <div className="detail-copy">
            <h2>Restaurant POS, ERP &amp; Private AI</h2>
            <p>
              Connect service, payments, stock, purchasing and management review
              for made-to-order and buffet operations.
            </p>
            <Link
              prefetch={false}
              className="text-link"
              href="/industries/restaurants"
            >
              Explore restaurant workflows
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}
