import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { ArticleCredits } from './article-credits';
import { Breadcrumbs, PageSchema } from './structured-data';
import { EditorialCover } from './editorial-cover';
import { resourceVisual } from '@/lib/editorial-covers';
import { contentByPath, type SearchContent } from '@/lib/search-content';
import styles from './resource-editorial.module.css';

export type ReadingSection = { id: string; label: string };

export function ResourceReadingNav({
  sections,
  label = 'In this guide',
}: {
  sections: ReadingSection[];
  label?: string;
}) {
  const contents = (
    <ol>
      {sections.map((section, index) => (
        <li key={section.id}>
          <a href={'#' + section.id}>
            <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            {section.label}
          </a>
        </li>
      ))}
    </ol>
  );
  return (
    <aside className={styles.contents}>
      <nav className={styles.desktopContents} aria-label={label}>
        <p>{label}</p>
        {contents}
      </nav>
      <details className={styles.mobileContents}>
        <summary>{label}</summary>
        <nav aria-label={label}>{contents}</nav>
      </details>
    </aside>
  );
}

export function ResourceHero({
  title,
  intro,
  path,
  eyebrow,
  children,
}: {
  title: string;
  intro: string;
  path: string;
  eyebrow: string;
  children?: ReactNode;
}) {
  return (
    <header className={['section-shell', styles.hero].join(' ')}>
      <div className={styles.heroCopy}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h1>{title}</h1>
        <p className={styles.deck}>{intro}</p>
        {children}
      </div>
      <div className={styles.heroCover}>
        <EditorialCover card={resourceVisual(path, eyebrow)} />
      </div>
    </header>
  );
}

export function ResourceArticleContent({
  entry,
  children,
}: {
  entry: SearchContent;
  children: ReactNode;
}) {
  const sections: ReadingSection[] = entry.sections.map((section, index) => ({
    id: 'section-' + (index + 1),
    label: section.title.replace(/^\d+[.)]\s+/, ''),
  }));
  if (entry.faqs.length)
    sections.push({ id: 'questions', label: 'Common questions' });
  if (entry.sources?.length)
    sections.push({ id: 'sources', label: 'Sources & scope' });
  sections.push({ id: 'related-resources', label: 'Related resources' });
  return (
    <div className={styles.articlePage}>
      <Breadcrumbs
        items={[
          { href: '/', label: 'Home' },
          { href: '/resources', label: 'Resources' },
          { href: entry.path, label: entry.title },
        ]}
      />
      <ResourceHero
        title={entry.title}
        intro={entry.intro}
        path={entry.path}
        eyebrow={resourceVisual(entry.path).category}
      >
        <ArticleCredits entry={entry} />
        {entry.editorialNote && (
          <details className={styles.scopeNotice}>
            <summary>About this guide</summary>
            <p>{entry.editorialNote}</p>
          </details>
        )}
      </ResourceHero>
      <div className={['section-shell', styles.readingLayout].join(' ')}>
        <ResourceReadingNav sections={sections} />
        {children}
      </div>
      <nav
        className={['section-shell', styles.readingFooter].join(' ')}
        aria-label="Reading and project links"
      >
        <Link
          prefetch={false}
          href={
            entry.eyebrow.startsWith('YUDARO BLOG')
              ? '/resources/blog'
              : '/resources'
          }
        >
          Back to{' '}
          {entry.eyebrow.startsWith('YUDARO BLOG')
            ? 'the journal'
            : 'all resources'}
        </Link>
        <Link prefetch={false} href="/contact">
          Discuss your project
        </Link>
        <Link prefetch={false} href="/assessment">
          Take the free assessment
        </Link>
      </nav>
    </div>
  );
}

export function ResourceArchitectureLibrary({
  entry,
}: {
  entry: SearchContent;
}) {
  const readings = entry.related
    .map((link) => contentByPath.get(link.href))
    .filter((article): article is SearchContent => article?.kind === 'Article');
  return (
    <main className={styles.articlePage}>
      <Breadcrumbs
        items={[
          { href: '/', label: 'Home' },
          { href: '/resources', label: 'Resources' },
          { href: entry.path, label: entry.title },
        ]}
      />
      <ResourceHero
        title={entry.title}
        intro={entry.intro}
        path={entry.path}
        eyebrow="Technical reference"
      />
      <div className={['section-shell', styles.library].join(' ')}>
        <div className={styles.libraryHeading}>
          <h2>Reference design &amp; related reading</h2>
          <p>Explore the design, then review the implementation choices.</p>
        </div>
        <div className={styles.libraryCards}>
          {readings.map((article) => {
            const titleId = 'library-' + article.path.split('/').at(-1);
            return (
              <article key={article.path}>
                <Link
                  prefetch={false}
                  href={article.path}
                  aria-labelledby={titleId}
                  className={styles.libraryCard}
                >
                  <EditorialCover card={resourceVisual(article.path)} />
                  <div>
                    <span className={styles.eyebrow}>
                      {article.path.startsWith('/resources/architecture/')
                        ? 'Reference design'
                        : 'Related reading'}
                    </span>
                    <h3 id={titleId}>{article.title}</h3>
                    <p>{article.description}</p>
                    <span className={styles.readLink} aria-hidden="true">
                      Read the guide <ArrowUpRight size={18} />
                    </span>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
        <section
          className={styles.libraryPrinciples}
          aria-label="How to use the architecture library"
        >
          {entry.sections.map((section, index) => (
            <div key={section.title} id={'section-' + (index + 1)}>
              <span className={styles.eyebrow}>
                0{index + 1} / Reference notes
              </span>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </div>
          ))}
        </section>
        <nav
          className={styles.libraryLinks}
          aria-label="More architecture resources"
        >
          {entry.related.map((link) => (
            <Link key={link.href} prefetch={false} href={link.href}>
              {link.label}
            </Link>
          ))}
          <Link prefetch={false} href="/contact">
            Discuss your project
          </Link>
          <Link prefetch={false} href="/assessment">
            Take the free assessment
          </Link>
        </nav>
      </div>
      <PageSchema
        path={entry.path}
        title={entry.title}
        description={entry.description}
      />
    </main>
  );
}
