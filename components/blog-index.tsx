import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { contentByPath, type SearchContent } from '@/lib/search-content';
import { Breadcrumbs, PageSchema } from './structured-data';
import styles from './blog-index.module.css';
import { EditorialCover } from './editorial-cover';

type CoverTone = 'pilot' | 'migration' | 'inventory';
type EditorialCard = {
  title: string;
  category: string;
  headline: [string, string];
  excerpt: string;
  tone: CoverTone;
};

// Display copy belongs to the index; the articles retain their full SEO titles.
const editorialCards: Record<string, EditorialCard> = {
  '/resources/private-ai-sop-pilot': {
    title: 'How to pilot a private AI SOP assistant',
    category: 'Private AI',
    headline: ['Test before', 'you trust.'],
    excerpt:
      'Start with approved SOPs. Test answers, sources, and permissions before expanding your pilot.',
    tone: 'pilot',
  },
  '/resources/odoo-data-migration-checklist': {
    title: 'The Odoo data migration checklist',
    category: 'Odoo ERP',
    headline: ['Clean data.', 'Clear start.'],
    excerpt:
      'Prepare products, contacts, and opening inventory with a practical checklist for your next migration.',
    tone: 'migration',
  },
  '/resources/ai-odoo-inventory-answers': {
    title: 'Can AI answer “Do we have it in stock?”',
    category: 'AI + ERP',
    headline: ['In stock?', 'Show the source.'],
    excerpt:
      'What does “in stock” mean? Bring quantities, warehouse scope, and source timestamps into the answer.',
    tone: 'inventory',
  },
};

function publicationDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(date + 'T00:00:00Z'));
}

export function BlogIndex({ entry }: { entry: SearchContent }) {
  const articlePaths = [
    ...new Set(
      entry.sections.flatMap((section) =>
        (section.links ?? []).map((link) => link.href),
      ),
    ),
  ];
  const articles = articlePaths
    .map((path) => contentByPath.get(path))
    .filter((article): article is SearchContent => article?.kind === 'Article');
  const editorialNote = entry.sections.find(
    (section) => section.title === 'About these guides',
  );

  return (
    <main className={styles.page}>
      <Breadcrumbs
        items={[
          { href: '/', label: 'Home' },
          { href: '/resources', label: 'Resources' },
          { href: entry.path, label: 'Blog' },
        ]}
      />
      <div className={['section-shell', styles.shell].join(' ')}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>Yudaro / Journal</span>
          <h1>Insights &amp; Ideas</h1>
          <p>Practical insights on AI, ERP, and smarter business operations.</p>
        </header>

        <section aria-labelledby="latest-insights">
          <div className={styles.sectionHeading}>
            <h2 id="latest-insights">Latest insights</h2>
            <span>{articles.length} articles</span>
          </div>
          <div className={styles.grid}>
            {articles.map((article) => {
              const card =
                editorialCards[article.path] ??
                ({
                  title: article.title,
                  category: article.eyebrow.split(' / ').at(-1) ?? 'Insights',
                  headline: ['Practical ideas.', 'Smarter work.'],
                  excerpt: article.description,
                  tone: 'pilot',
                } satisfies EditorialCard);
              const titleId = 'blog-' + article.path.split('/').at(-1);
              return (
                <article key={article.path} className={styles.article}>
                  <Link
                    prefetch={false}
                    href={article.path}
                    className={styles.card}
                    aria-labelledby={titleId}
                  >
                    <EditorialCover card={card} />
                    <div className={styles.cardBody}>
                      <div className={styles.meta}>
                        <span className={styles.category}>{card.category}</span>
                        {article.datePublished && (
                          <time dateTime={article.datePublished}>
                            {publicationDate(article.datePublished)}
                          </time>
                        )}
                      </div>
                      <h3 id={titleId}>{card.title}</h3>
                      <p>{card.excerpt}</p>
                      <span className={styles.readMore} aria-hidden="true">
                        Read article{' '}
                        <ArrowUpRight size={18} strokeWidth={1.7} />
                      </span>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </section>

        <footer className={styles.editorialFooter}>
          <details className={styles.editorialNote}>
            <summary>About these guides</summary>
            <p>{entry.intro}</p>
            {editorialNote && <p>{editorialNote.body}</p>}
          </details>
          <nav aria-label="More Yudaro resources" className={styles.related}>
            {entry.related.map((link) => (
              <Link key={link.href} prefetch={false} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
        </footer>
      </div>
      <PageSchema
        path={entry.path}
        title={entry.title}
        description={entry.description}
      />
    </main>
  );
}
