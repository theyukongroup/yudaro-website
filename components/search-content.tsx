import Link from 'next/link';
import { ArchitectureDiagram } from './architecture-diagram';
import { ArticleCredits, articleCreditSchema } from './article-credits';
import Image from 'next/image';
import { Breadcrumbs, PageSchema, StructuredData } from './structured-data';
import { SITE_URL } from '@/lib/seo';
import { ResourceArticleContent } from './resource-editorial';
import { verifiedPeople } from '@/lib/editorial-people';
import type { ReactNode } from 'react';
import type { ContentSection, SearchContent } from '@/lib/search-content';
function sectionBody(section: ContentSection): ReactNode {
  const parts: ReactNode[] = [];
  let remaining = section.body;
  for (const link of section.links ?? []) {
    const index = remaining.indexOf(link.text);
    if (index < 0) continue;
    parts.push(remaining.slice(0, index));
    parts.push(
      <Link prefetch={false} key={link.href + link.text} href={link.href}>
        {link.text}
      </Link>,
    );
    remaining = remaining.slice(index + link.text.length);
  }
  return [...parts, remaining];
}

function SourcesContent({ entry }: { entry: SearchContent }) {
  return (
    <>
      <p>
        General implementation guidance and illustrative workflows, not verified
        client results. Vendor capabilities depend on version, edition, plan and
        configuration.
      </p>
      <ul>
        {entry.sources?.map((source) => (
          <li key={source.href}>
            <Link prefetch={false} href={source.href}>
              {source.label}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
export function ContentSections({
  entry,
  editorial = false,
}: {
  entry: SearchContent;
  editorial?: boolean;
}) {
  return (
    <div className="search-sections section-shell">
      {entry.sections.map((s, i) => (
        <section id={`section-${i + 1}`} key={s.title}>
          {editorial && !/^\d+[.)]\s/.test(s.title) && (
            <span className="resource-section-number">
              SECTION {String(i + 1).padStart(2, '0')}
            </span>
          )}
          <h2>{s.title}</h2>
          <p>{sectionBody(s)}</p>
          {s.diagram && <ArchitectureDiagram variant={s.diagram} />}
          {s.items && (
            <ul>
              {s.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
          {s.table && (
            <div
              className="search-table"
              role={editorial ? 'region' : undefined}
              tabIndex={editorial ? 0 : undefined}
              aria-label={editorial ? s.title + ' table' : undefined}
            >
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
          {editorial && s.table && (
            <p className="resource-table-hint">
              Scroll horizontally to read the full table.
            </p>
          )}
        </section>
      ))}
      {entry.faqs.length > 0 && (
        <section id={editorial ? 'questions' : undefined}>
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
        <section
          className="search-sources"
          id={editorial ? 'sources' : undefined}
        >
          {editorial ? (
            <details className="resource-source-disclosure">
              <summary>
                <h2>Sources and scope</h2>
              </summary>
              <SourcesContent entry={entry} />
            </details>
          ) : (
            <>
              <h2>Sources and scope</h2>
              <SourcesContent entry={entry} />
            </>
          )}
        </section>
      )}
      <aside id={editorial ? 'related-resources' : undefined}>
        <h2>
          {editorial ? 'Explore related resources' : 'Plan your next step'}
        </h2>
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
export function SearchPage({
  entry,
  editorial = false,
}: {
  entry: SearchContent;
  editorial?: boolean;
}) {
  const parent = entry.path.startsWith('/resources/')
    ? { href: '/resources', label: 'Resources' }
    : entry.path.startsWith('/industries/')
      ? { href: '/industries', label: 'Industries' }
      : entry.path.startsWith('/solutions/')
        ? { href: '/solutions', label: 'Solutions' }
        : null;
  return (
    <main className="search-page">
      {editorial ? (
        <ResourceArticleContent entry={entry}>
          <ContentSections entry={entry} editorial />
        </ResourceArticleContent>
      ) : (
        <>
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
                <Link
                  prefetch={false}
                  className="button primary"
                  href="/contact"
                >
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
              {entry.kind === 'Article' && <ArticleCredits entry={entry} />}
              {entry.editorialNote && (
                <p className="search-byline">{entry.editorialNote}</p>
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
                Bring your systems, sample records and operating priorities. We
                will discuss fit, scope and the next decision.
              </p>
            </div>
            <Link prefetch={false} href="/contact" className="button primary">
              Request a consultation
            </Link>
          </section>
        </>
      )}
      <PageSchema
        path={entry.path}
        title={entry.title}
        description={entry.description}
        service={entry.kind === 'Service'}
        article={entry.kind === 'Article'}
        reviewer={
          entry.reviewerId ? verifiedPeople[entry.reviewerId] : undefined
        }
      />
      {entry.kind === 'Article' && (
        <StructuredData
          data={{
            '@context': 'https://schema.org',
            '@type': 'Article',
            '@id': `${SITE_URL}${entry.path}#article`,
            headline: entry.title,
            description: entry.description,
            inLanguage: 'en-US',
            datePublished: entry.datePublished,
            dateModified: entry.dateModified,
            ...articleCreditSchema(entry),
            publisher: { '@id': `${SITE_URL}/#organization` },
            image: `${SITE_URL}/yudaro-social.png`,
            mainEntityOfPage: { '@id': `${SITE_URL}${entry.path}#webpage` },
            isPartOf: { '@id': `${SITE_URL}/#website` },
            url: `${SITE_URL}${entry.path}`,
          }}
        />
      )}
    </main>
  );
}
