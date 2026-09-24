import Link from 'next/link';
import { SITE_URL } from '@/lib/seo';
export function StructuredData({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
export function Breadcrumbs({
  items,
}: {
  items: { href: string; label: string }[];
}) {
  return (
    <>
      <nav className="breadcrumbs section-shell" aria-label="Breadcrumb">
        <ol>
          {items.map((item, i) => (
            <li key={item.href}>
              {i === items.length - 1 ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <Link prefetch={false} href={item.href}>
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: items.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: item.label,
            item: new URL(item.href, SITE_URL).href,
          })),
        }}
      />
    </>
  );
}
export function PageSchema({
  path,
  title,
  description,
  service = false,
  reviewer,
  article = false,
}: {
  path: string;
  title: string;
  description: string;
  service?: boolean;
  reviewer?: { name: string; profileUrl: string; role: string };
  article?: boolean;
}) {
  const url = new URL(path, SITE_URL).href;
  return (
    <StructuredData
      data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebPage',
            '@id': `${url}#webpage`,
            url,
            name: title,
            description,
            isPartOf: { '@id': `${SITE_URL}/#website` },
            about: { '@id': `${SITE_URL}/#organization` },
            ...(article
              ? { mainEntity: { '@id': `${url}#article` } }
              : service
                ? { mainEntity: { '@id': `${url}#service` } }
                : {}),
            ...(reviewer
              ? {
                  reviewedBy: {
                    '@type': 'Person',
                    '@id': reviewer.profileUrl + '#person',
                    name: reviewer.name,
                    url: reviewer.profileUrl,
                    jobTitle: reviewer.role,
                  },
                }
              : {}),
          },
          ...(service
            ? [
                {
                  '@type': 'Service',
                  '@id': `${url}#service`,
                  name: title,
                  description,
                  url,
                  serviceType: title,
                  provider: { '@id': `${SITE_URL}/#organization` },
                  areaServed: [
                    { '@type': 'City', name: 'Houston' },
                    { '@type': 'State', name: 'Texas' },
                    { '@type': 'Country', name: 'United States' },
                  ],
                },
              ]
            : []),
        ],
      }}
    />
  );
}
