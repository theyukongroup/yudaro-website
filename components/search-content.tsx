import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumbs, PageSchema, StructuredData } from './structured-data';
import { SITE_URL } from '@/lib/seo';
import type { SearchContent } from '@/lib/search-content';
export function ContentSections({ entry }: { entry: SearchContent }) {
  return (
    <div className="search-sections section-shell">
      {entry.sections.map((s, i) => (
        <section id={`section-${i + 1}`} key={s.title}>
          <h2>{s.title}</h2>
          <p>{s.body}</p>
          {s.items && (
            <ul>
              {s.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
          {s.table && (
            <div className="search-table">
              <table>
                <thead>
                  <tr>
                    {s.table.headers.map((h) => (
                      <th scope="col" key={h}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {s.table.rows.map((row, j) => (
                    <tr key={j}>
                      {row.map((v, k) =>
                        k === 0 ? (
                          <th scope="row" key={k}>
                            {v}
                          </th>
                        ) : (
                          <td key={k}>{v}</td>
                        ),
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      ))}
      {entry.faqs.length > 0 && (
        <section>
          <h2>Questions before you start</h2>
          {entry.faqs.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </section>
      )}
      {entry.sources && (
        <section className="search-sources">
          <h2>Sources and scope</h2>
          <p>
            General implementation guidance and illustrative workflows, not
            verified client results. Vendor capabilities depend on version,
            edition, plan and configuration.
          </p>
          <ul>
            {entry.sources.map((s) => (
              <li key={s.href}>
                <Link prefetch={false} href={s.href}>
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      <aside>
        <h2>Plan your next step</h2>
        <div className="search-related">
          {entry.related.map((link) => (
            <Link prefetch={false} key={link.href} href={link.href}>
              {link.label}
              <span aria-hidden="true"> →</span>
            </Link>
          ))}
        </div>
      </aside>
    </div>
  );
}
export function SearchPage({ entry }: { entry: SearchContent }) {
  const parent = entry.path.startsWith('/resources/')
    ? { href: '/resources', label: 'Resources' }
    : entry.path.startsWith('/industries/')
      ? { href: '/industries', label: 'Industries' }
      : entry.path.startsWith('/solutions/')
        ? { href: '/solutions', label: 'Solutions' }
        : null;
  return (
    <main className="search-page">
      <Breadcrumbs
        items={[
          { href: '/', label: 'Home' },
          ...(parent ? [parent] : []),
          { href: entry.path, label: entry.title },
        ]}
      />
      <header className="section-shell search-hero">
        <div>
          <span className="section-index">{entry.eyebrow}</span>
          <h1>{entry.title}</h1>
          <p>{entry.intro}</p>
          <div className="actions">
            <Link prefetch={false} className="button primary" href="/contact">
              Discuss your project
            </Link>
            <Link
              prefetch={false}
              className="button secondary"
              href="/assessment"
            >
              Take the free assessment
            </Link>
          </div>
          {entry.kind === 'Article' && (
            <p className="search-byline">
              By{' '}
              <Link prefetch={false} href="/about">
                Yudaro AI &amp; ERP Systems
              </Link>{' '}
              · Published{' '}
              <time dateTime={entry.datePublished}>{entry.datePublished}</time>{' '}
              · Updated{' '}
              <time dateTime={entry.dateModified}>{entry.dateModified}</time>
            </p>
          )}
        </div>
        {entry.image && (
          <Image
            src={entry.image}
            alt=""
            width={800}
            height={600}
            sizes="(max-width: 800px) 100vw, 40vw"
            priority
          />
        )}
      </header>
      <ContentSections entry={entry} />
      <section className="mini-cta section-shell">
        <div>
          <span className="section-index">BUILD A PRACTICAL PLAN</span>
          <h2>Start with one workflow worth improving.</h2>
          <p>
            Bring your systems, sample records and operating priorities. We will
            discuss fit, scope and the next decision.
          </p>
        </div>
        <Link prefetch={false} href="/contact" className="button primary">
          Request a consultation
        </Link>
      </section>
      <PageSchema
        path={entry.path}
        title={entry.title}
        description={entry.description}
        service={entry.kind === 'Service'}
      />
      {entry.kind === 'Article' && (
        <StructuredData
          data={{
            '@context': 'https://schema.org',
            '@type': 'Article',
            '@id': `${SITE_URL}${entry.path}#article`,
            headline: entry.title,
            description: entry.description,
            datePublished: entry.datePublished,
            dateModified: entry.dateModified,
            author: { '@id': `${SITE_URL}/#organization` },
            publisher: { '@id': `${SITE_URL}/#organization` },
            image: `${SITE_URL}/yudaro-social.png`,
            mainEntityOfPage: `${SITE_URL}${entry.path}`,
          }}
        />
      )}
    </main>
  );
}
