import Link from 'next/link';
import { contentByPath, searchContent } from '@/lib/search-content';
import { SearchPage } from '@/components/search-content';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight, BookOpen, CalendarDays } from 'lucide-react';
import { isLocale, type Locale } from '@/lib/i18n';
import { resourceBySlug, resourceEntries } from '@/lib/resource-content';
import { localizedUrls, pageMetadata, SITE_URL } from '@/lib/seo';

type Params = { slug?: string[] };
type Search = { lang?: string };
const labels: Record<Locale, Record<string, string>> = {
  en: {
    resources: 'Resources',
    intro:
      'Practical answers for business owners evaluating Private AI, Odoo ERP, AI + ERP integration, and workflow automation.',
    answer: 'Direct answer',
    meaning: 'What this means for a business',
    example: 'Real-world example',
    limits: 'Limitations and what to consider',
    questions: 'Common questions',
    related: 'Related Yudaro resources',
    author: 'By Yudaro AI & ERP Systems',
    published: 'Published September 5, 2026',
    cta: 'Talk to Yudaro about your workflow',
    browse: 'Browse practical guides',
    home: 'Home',
  },
  'zh-cn': {
    resources: '资源中心',
    intro:
      '为正在评估私有 AI、Odoo ERP、AI + ERP 集成和工作流程自动化的企业管理者提供实用答案。',
    answer: '直接回答',
    meaning: '这对企业意味着什么',
    example: '实际业务示例',
    limits: '限制与注意事项',
    questions: '常见问题',
    related: '相关 Yudaro 资源',
    author: '作者：Yudaro AI & ERP Systems',
    published: '发布于 2026 年 9 月 5 日',
    cta: '与 Yudaro 讨论您的流程',
    browse: '浏览实用指南',
    home: '首页',
  },
  'zh-tw': {
    resources: '資源中心',
    intro:
      '為正在評估私有 AI、Odoo ERP、AI + ERP 整合和工作流程自動化的企業管理者提供實用答案。',
    answer: '直接回答',
    meaning: '這對企業意味著什麼',
    example: '實際業務示例',
    limits: '限制與注意事項',
    questions: '常見問題',
    related: '相關 Yudaro 資源',
    author: '作者：Yudaro AI & ERP Systems',
    published: '發布於 2026 年 9 月 5 日',
    cta: '與 Yudaro 討論您的流程',
    browse: '瀏覽實用指南',
    home: '首頁',
  },
  es: {
    resources: 'Recursos',
    intro:
      'Respuestas prácticas para propietarios y gerentes que evalúan IA privada, Odoo ERP, integración IA + ERP y automatización.',
    answer: 'Respuesta directa',
    meaning: 'Qué significa para una empresa',
    example: 'Ejemplo práctico',
    limits: 'Limitaciones y consideraciones',
    questions: 'Preguntas comunes',
    related: 'Recursos relacionados de Yudaro',
    author: 'Por Yudaro AI & ERP Systems',
    published: 'Publicado el 5 de septiembre de 2026',
    cta: 'Hable con Yudaro sobre su proceso',
    browse: 'Explore guías prácticas',
    home: 'Inicio',
  },
};

function selectedLocale(value?: string): Locale {
  return isLocale(value ?? null) ? (value as Locale) : 'en';
}
function slugKey(params: Params) {
  return params.slug?.join('/') ?? '';
}
function localeUrl(path: string, locale: Locale) {
  const urls = localizedUrls(path);
  return locale === 'en'
    ? urls['en-US']
    : locale === 'zh-cn'
      ? urls['zh-CN']
      : locale === 'zh-tw'
        ? urls['zh-TW']
        : urls.es;
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<Search>;
}): Promise<Metadata> {
  const [p, s] = await Promise.all([params, searchParams]);
  const locale = selectedLocale(s.lang);
  const key = slugKey(p);
  const entry = resourceBySlug.get(key);
  const l = labels[locale];
  const path = key ? `/resources/${key}` : '/resources';
  const extra = contentByPath.get(path);
  if (extra) {
    const metadata = pageMetadata(extra.title, extra.description, path);
    if (locale !== 'en')
      metadata.robots = {
        index: false,
        follow: true,
        googleBot: { index: false, follow: true },
      };
    return metadata;
  }
  const title = entry?.copy[locale].title ?? l.resources;
  const description = entry?.copy[locale].description ?? l.intro;
  const metadata = pageMetadata(title, description, path);
  const canonical = localeUrl(path, locale);
  metadata.alternates = { canonical };
  if (locale !== 'en')
    metadata.robots = {
      index: false,
      follow: true,
      googleBot: { index: false, follow: true },
    };
  if (metadata.openGraph) {
    metadata.openGraph.url = canonical;
    metadata.openGraph.locale =
      locale === 'en'
        ? 'en_US'
        : locale === 'zh-cn'
          ? 'zh_CN'
          : locale === 'zh-tw'
            ? 'zh_TW'
            : 'es_ES';
  }
  return metadata;
}

export default async function ResourcePage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<Search>;
}) {
  const [p, s] = await Promise.all([params, searchParams]);
  const locale = selectedLocale(s.lang);
  const key = slugKey(p);
  const entry = resourceBySlug.get(key);
  const l = labels[locale];
  const extra = contentByPath.get(`/resources/${key}`);
  if (extra) return <SearchPage entry={extra} />;
  if (key && !entry) notFound();
  if (!entry) {
    const groups = [
      'Private AI',
      'Odoo ERP',
      'AI + ERP',
      'Business Automation',
      'Comparisons',
      'Buyer Guides',
      'Industries',
    ];
    return (
      <main className="resource-page">
        <section className="resource-hero section-shell">
          <span className="section-index">YUDARO / {l.resources}</span>
          <h1>{l.resources}</h1>
          <p>{l.intro}</p>
        </section>
        <section className="resource-library section-shell">
          <h2>{l.browse}</h2>
          <div className="resource-group">
            <h3>Implementation and readiness</h3>
            <div>
              {searchContent
                .filter((e) => e.kind === 'Article')
                .map((e) => (
                  <Link prefetch={false} href={e.path} key={e.path}>
                    <strong>{e.title}</strong>
                    <span>{e.description}</span>
                  </Link>
                ))}
            </div>
          </div>
          {groups.map((group) => (
            <div className="resource-group" key={group}>
              <h3>{group}</h3>
              <div>
                {(group === 'Industries'
                  ? [
                      ...resourceEntries.filter(
                        (x) =>
                          x.pillar === group &&
                          x.slug !== 'industries/restaurants',
                      ),
                      resourceBySlug.get('industries/restaurants')!,
                    ].filter(Boolean)
                  : resourceEntries.filter((x) => x.pillar === group)
                ).map((x) => (
                  <a
                    href={localeUrl(`/resources/${x.slug}`, locale).replace(
                      SITE_URL,
                      '',
                    )}
                    key={x.slug}
                  >
                    <strong>{x.copy[locale].title}</strong>
                    <span>{x.copy[locale].description}</span>
                    <ArrowRight size={17} />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>
    );
  }
  const c = entry.copy[locale];
  const path = `/resources/${entry.slug}`;
  const canonical = localeUrl(path, locale);
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${canonical}#article`,
        headline: c.title,
        description: c.description,
        datePublished: entry.datePublished ?? '2026-09-05',
        dateModified: entry.dateModified ?? '2026-09-05',
        image: `${SITE_URL}/yudaro-social.png`,
        inLanguage:
          locale === 'en'
            ? 'en-US'
            : locale === 'zh-cn'
              ? 'zh-CN'
              : locale === 'zh-tw'
                ? 'zh-TW'
                : 'es',
        author: { '@id': `${SITE_URL}/#organization` },
        publisher: { '@id': `${SITE_URL}/#organization` },
        mainEntityOfPage: canonical,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: l.home, item: SITE_URL },
          {
            '@type': 'ListItem',
            position: 2,
            name: l.resources,
            item: localeUrl('/resources', locale),
          },
          { '@type': 'ListItem', position: 3, name: c.title, item: canonical },
        ],
      },
    ],
  };
  const href = (value: string) =>
    localeUrl(value, locale).replace(SITE_URL, '');
  return (
    <main className="resource-page">
      <article>
        <nav className="breadcrumbs section-shell" aria-label="Breadcrumb">
          <a href={href('/')}>{l.home}</a>
          <span>/</span>
          <a href={href('/resources')}>{l.resources}</a>
          <span>/</span>
          <span aria-current="page">{c.title}</span>
        </nav>
        <header className="resource-hero section-shell">
          <span className="section-index">{entry.pillar}</span>
          <h1>{c.title}</h1>
          <p className="resource-deck">{c.description}</p>
          <div className="resource-byline">
            <BookOpen size={16} />
            {l.author}
            <CalendarDays size={16} />
            <span>
              {entry.dateModified
                ? `Updated ${entry.dateModified}`
                : l.published}
            </span>
          </div>
        </header>
        <section className="answer-block section-shell">
          <span>{l.answer}</span>
          <p>{c.answer}</p>
        </section>
        <div className="resource-body section-shell">
          <section>
            <h2>{l.meaning}</h2>
            <p>{c.operations}</p>
          </section>
          <section>
            <h2>{l.example}</h2>
            <p>{c.example}</p>
          </section>
          <section>
            <h2>{l.limits}</h2>
            <p>{c.limits}</p>
          </section>
          <section>
            <h2>{l.questions}</h2>
            {c.questions.map(([q, a]) => (
              <div className="resource-faq" key={q}>
                <h3>{q}</h3>
                <p>{a}</p>
              </div>
            ))}
          </section>
          {locale === 'en' && entry.slug === 'comparisons' && (
            <section>
              <h2>Compare the operating model</h2>
              <div className="search-table">
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Choice</th>
                      <th scope="col">Consider</th>
                      <th scope="col">Verify before deciding</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      [
                        'Private AI vs public AI',
                        'Control of sources, infrastructure and external data paths',
                        'Provider terms, retention, permissions and actual deployment',
                      ],
                      [
                        'Odoo Community vs Enterprise',
                        'Required modules, hosting, support and maintenance',
                        'Current edition coverage, licensing and integration access',
                      ],
                      [
                        'ERP vs accounting software',
                        'Operational transactions across departments versus financial records',
                        'Whether sales, stock, purchasing and service need a shared record',
                      ],
                      [
                        'Local vs cloud AI',
                        'Onsite administration versus provider dependence',
                        'Workload, recovery, connectivity and data processing',
                      ],
                      [
                        'Custom ERP vs Odoo',
                        'Tailored code versus a configurable platform',
                        'Lifecycle cost, ownership, upgrades and fit-gap evidence',
                      ],
                    ].map((row) => (
                      <tr key={row[0]}>
                        <th scope="row">{row[0]}</th>
                        <td>{row[1]}</td>
                        <td>{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>
                These are evaluation criteria, not universal feature or security
                rankings. Check the actual editions and contracts.
              </p>
            </section>
          )}
          <section>
            <h2>Implementation context</h2>
            <p>
              These are general implementation recommendations and illustrative
              examples, not verified customer results. Yudaro is the
              organizational author; no individual expert review is claimed.
              Software capabilities depend on edition, plan, version and
              configuration.
            </p>
            <p>
              <Link
                prefetch={false}
                href="/resources/odoo-implementation-planning"
              >
                Plan an ERP rollout
              </Link>
              {' · '}
              <Link prefetch={false} href="/resources/private-ai-security">
                Review private AI controls
              </Link>
              {' · '}
              <Link prefetch={false} href="/resources/faqs">
                Read common questions
              </Link>
            </p>
          </section>
          <aside>
            <h2>{l.related}</h2>
            <div className="resource-related">
              {entry.related.map((link) => (
                <a href={href(link.href)} key={link.href}>
                  {link.label}
                  <ArrowRight size={16} />
                </a>
              ))}
            </div>
          </aside>
        </div>
        <footer className="resource-cta section-shell">
          <div>
            <span className="section-index">FREE YUDARO TOOL</span>
            <h2>{l.cta}</h2>
          </div>
          <a className="button primary" href={href('/assessment')}>
            {l.cta}
            <ArrowRight size={16} />
          </a>
        </footer>
      </article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
        }}
      />
    </main>
  );
}
