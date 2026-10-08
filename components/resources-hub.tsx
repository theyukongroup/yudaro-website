import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { resourceBySlug, resourceEntries } from '@/lib/resource-content';
import { contentByPath, searchContent } from '@/lib/search-content';
import { localizedUrls, SITE_URL } from '@/lib/seo';
import { resourceVisual } from '@/lib/editorial-covers';
import { EditorialCover } from './editorial-cover';
import styles from './resources-hub.module.css';

type HubLabels = { resources: string; intro: string; browse: string };
type GroupKey =
  | 'foundations'
  | 'implementation'
  | 'architecture'
  | 'industries';
type HubCard = {
  path: string;
  href: string;
  title: string;
  description: string;
  category: string;
};
type HubCopy = {
  collections: string;
  blog: string;
  blogDescription: string;
  architecture: string;
  architectureDescription: string;
  browseBy: string;
  read: string;
  openCollection: string;
  guides: string;
  groups: Record<GroupKey, { title: string; description: string }>;
};

const copy: Record<Locale, HubCopy> = {
  en: {
    collections: 'Explore a collection',
    blog: 'Yudaro blog',
    blogDescription:
      'Practical pilot tests, migration checklists and inventory questions.',
    architecture: 'AI + ERP architecture',
    architectureDescription:
      'Reference design, system boundaries and implementation evidence.',
    browseBy: 'Jump to a topic',
    read: 'Read guide',
    openCollection: 'Explore collection',
    guides: 'guides',
    groups: {
      foundations: {
        title: 'Start with the foundations',
        description: 'Understand the options before choosing your next step.',
      },
      implementation: {
        title: 'Plan your implementation',
        description:
          'Prepare sources, data, permissions and acceptance checks.',
      },
      architecture: {
        title: 'Explore the architecture',
        description: 'Connect identity, evidence and controlled ERP workflows.',
      },
      industries: {
        title: 'Find your industry',
        description:
          'Explore AI, ERP and automation in the context of your operation.',
      },
    },
  },
  'zh-cn': {
    collections: '探索专题',
    blog: 'Yudaro 博客',
    blogDescription: '实用的试点评估、迁移清单与库存查询指南。',
    architecture: 'AI + ERP 架构',
    architectureDescription: '参考设计、系统边界与实施证据。',
    browseBy: '跳转到主题',
    read: '阅读指南',
    openCollection: '浏览专题',
    guides: '篇指南',
    groups: {
      foundations: {
        title: '从基础开始',
        description: '先了解不同方案，再选择下一步。',
      },
      implementation: {
        title: '规划实施',
        description: '准备资料、数据、权限和验收检查。',
      },
      architecture: {
        title: '探索架构',
        description: '连接身份、证据与受控的 ERP 流程。',
      },
      industries: {
        title: '选择您的行业',
        description: '结合实际运营了解 AI、ERP 与自动化。',
      },
    },
  },
  'zh-tw': {
    collections: '探索專題',
    blog: 'Yudaro 部落格',
    blogDescription: '實用的試點評估、遷移清單與庫存查詢指南。',
    architecture: 'AI + ERP 架構',
    architectureDescription: '參考設計、系統邊界與實施證據。',
    browseBy: '跳轉到主題',
    read: '閱讀指南',
    openCollection: '瀏覽專題',
    guides: '篇指南',
    groups: {
      foundations: {
        title: '從基礎開始',
        description: '先了解不同方案，再選擇下一步。',
      },
      implementation: {
        title: '規劃實施',
        description: '準備資料、數據、權限和驗收檢查。',
      },
      architecture: {
        title: '探索架構',
        description: '連接身分、證據與受控的 ERP 流程。',
      },
      industries: {
        title: '選擇您的行業',
        description: '結合實際營運了解 AI、ERP 與自動化。',
      },
    },
  },
  es: {
    collections: 'Explore una colección',
    blog: 'Blog de Yudaro',
    blogDescription:
      'Pruebas piloto, listas de migración y preguntas de inventario.',
    architecture: 'Arquitectura de IA + ERP',
    architectureDescription:
      'Diseño de referencia, límites del sistema y evidencia de implementación.',
    browseBy: 'Ir a un tema',
    read: 'Leer guía',
    openCollection: 'Explorar colección',
    guides: 'guías',
    groups: {
      foundations: {
        title: 'Empiece por los fundamentos',
        description: 'Conozca las opciones antes de elegir su próximo paso.',
      },
      implementation: {
        title: 'Planifique la implementación',
        description:
          'Prepare fuentes, datos, permisos y pruebas de aceptación.',
      },
      architecture: {
        title: 'Explore la arquitectura',
        description: 'Conecte identidad, evidencia y procesos ERP controlados.',
      },
      industries: {
        title: 'Encuentre su sector',
        description:
          'Explore IA, ERP y automatización en el contexto de su operación.',
      },
    },
  },
};

const groupOrder: GroupKey[] = [
  'foundations',
  'implementation',
  'architecture',
  'industries',
];
const groupedPaths: Record<GroupKey, string[]> = {
  foundations: [
    '/resources/private-ai',
    '/resources/odoo-erp',
    '/resources/business-automation',
    '/resources/comparisons',
    '/resources/guides',
    '/resources/faqs',
  ],
  implementation: [
    '/resources/private-ai-sop-pilot',
    '/resources/odoo-data-migration-checklist',
    '/resources/ai-odoo-inventory-answers',
    '/resources/odoo-implementation-planning',
    '/resources/private-ai-security',
  ],
  architecture: [
    '/resources/architecture/private-ai-odoo',
    '/resources/ai-erp',
  ],
  industries: resourceEntries
    .filter((entry) => entry.pillar === 'Industries')
    .map((entry) => '/resources/' + entry.slug),
};

// Short display titles are confined to this index; article content is unchanged.
const displayTitles: Record<string, string> = {
  '/resources/private-ai': 'Private AI for business',
  '/resources/odoo-erp': 'Odoo ERP: where it fits',
  '/resources/business-automation': 'Choose workflows to automate',
  '/resources/comparisons': 'Compare AI and ERP options',
  '/resources/guides': 'Plan scope, cost and timing',
  '/resources/faqs': 'AI, ERP and automation questions',
  '/resources/private-ai-sop-pilot': 'How to pilot a private AI SOP assistant',
  '/resources/odoo-data-migration-checklist':
    'The Odoo data migration checklist',
  '/resources/ai-odoo-inventory-answers':
    'Can AI answer “Do we have it in stock?”',
  '/resources/odoo-implementation-planning': 'Plan an Odoo implementation',
  '/resources/private-ai-security': 'Private AI permissions and deployment',
  '/resources/architecture/private-ai-odoo':
    'Private AI + Odoo reference architecture',
  '/resources/ai-erp': 'AI ERP systems: a practical guide',
};

function categoryFor(path: string) {
  if (path.startsWith('/resources/industries/')) return 'Industry guide';
  if (path === '/resources/architecture/private-ai-odoo')
    return 'Reference design';
  if (path === '/resources/faqs') return 'Questions';
  if (path === '/resources/business-automation') return 'Automation';
  if (path === '/resources/comparisons' || path === '/resources/guides')
    return 'Buyer guide';
  if (path.includes('private-ai')) return 'Private AI';
  if (
    path === '/resources/ai-erp' ||
    path === '/resources/ai-odoo-inventory-answers'
  )
    return 'AI + ERP';
  return 'Odoo ERP';
}

function legacyHref(path: string, locale: Locale) {
  const urls = localizedUrls(path);
  const url =
    locale === 'zh-cn'
      ? urls['zh-CN']
      : locale === 'zh-tw'
        ? urls['zh-TW']
        : locale === 'es'
          ? urls.es
          : urls['en-US'];
  return url.replace(SITE_URL, '');
}

function cardFor(path: string, locale: Locale): HubCard | undefined {
  const extra = contentByPath.get(path);
  if (extra?.kind === 'Article') {
    return {
      path,
      href: path,
      title: displayTitles[path] ?? extra.title,
      description: extra.description,
      category: categoryFor(path),
    };
  }
  const entry = resourceBySlug.get(path.replace('/resources/', ''));
  if (!entry) return undefined;
  const article = entry.copy[locale];
  const englishTitle = path.startsWith('/resources/industries/')
    ? entry.copy.en.title.replace('AI, ERP, and automation for ', '')
    : (displayTitles[path] ?? article.title);
  return {
    path,
    href: legacyHref(path, locale),
    title: locale === 'en' ? englishTitle : article.title,
    description: article.description,
    category: categoryFor(path),
  };
}

export function ResourcesHub({
  locale,
  labels,
}: {
  locale: Locale;
  labels: HubLabels;
}) {
  const ui = copy[locale];
  const seen = new Set<string>();
  const paths: Record<GroupKey, string[]> = {
    foundations: [...groupedPaths.foundations],
    implementation: [...groupedPaths.implementation],
    architecture: [...groupedPaths.architecture],
    industries: [...groupedPaths.industries],
  };
  // Keep future resource articles reachable without duplicating known URLs.
  const assignedPaths = new Set(groupOrder.flatMap((group) => paths[group]));
  for (const entry of searchContent) {
    if (
      entry.kind === 'Article' &&
      entry.path.startsWith('/resources/') &&
      !assignedPaths.has(entry.path)
    ) {
      paths.implementation.push(entry.path);
      assignedPaths.add(entry.path);
    }
  }
  const groups = groupOrder.map((key) => ({
    key,
    ...ui.groups[key],
    cards: paths[key].flatMap((path) => {
      if (seen.has(path)) return [];
      const card = cardFor(path, locale);
      if (!card) return [];
      seen.add(path);
      return [card];
    }),
  }));
  const collections = [
    {
      path: '/resources/blog',
      title: ui.blog,
      description: ui.blogDescription,
      category: 'Blog',
    },
    {
      path: '/resources/architecture',
      title: ui.architecture,
      description: ui.architectureDescription,
      category: 'Architecture library',
    },
  ];

  return (
    <main className={styles.page}>
      <div className={['section-shell', styles.shell].join(' ')}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>Yudaro / Resources</span>
          <h1>{labels.resources}</h1>
          <p>{labels.intro}</p>
        </header>

        <section
          className={styles.collections}
          aria-labelledby="resources-collections-title"
        >
          <div className={styles.sectionHeading}>
            <h2 id="resources-collections-title">{ui.collections}</h2>
          </div>
          <div className={styles.collectionGrid}>
            {collections.map((collection) => {
              const titleId =
                'resources-collection-' + collection.path.split('/').at(-1);
              return (
                <article key={collection.path}>
                  <Link
                    prefetch={false}
                    href={collection.path}
                    className={styles.collectionCard}
                    aria-labelledby={titleId}
                  >
                    <div className={styles.collectionCover}>
                      <EditorialCover
                        card={resourceVisual(
                          collection.path,
                          collection.category,
                        )}
                      />
                    </div>
                    <div className={styles.collectionBody}>
                      <span className={styles.category}>
                        {collection.category}
                      </span>
                      <h3 id={titleId}>{collection.title}</h3>
                      <p>{collection.description}</p>
                      <span className={styles.readMore} aria-hidden="true">
                        {ui.openCollection}
                        <ArrowUpRight size={17} strokeWidth={1.7} />
                      </span>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </section>

        <nav className={styles.topicNav} aria-label={ui.browseBy}>
          <span>{labels.browse}</span>
          <div>
            {groups
              .filter((group) => group.cards.length > 0)
              .map((group) => (
                <a key={group.key} href={'#resources-' + group.key}>
                  {group.title}
                  <ArrowDown size={14} strokeWidth={1.6} aria-hidden="true" />
                </a>
              ))}
          </div>
        </nav>

        {groups
          .filter((group) => group.cards.length > 0)
          .map((group) => (
            <section
              className={styles.group}
              id={'resources-' + group.key}
              aria-labelledby={'resources-' + group.key + '-title'}
              key={group.key}
            >
              <div className={styles.groupHeading}>
                <div>
                  <h2 id={'resources-' + group.key + '-title'}>
                    {group.title}
                  </h2>
                  <p>{group.description}</p>
                </div>
                <span className={styles.count}>
                  {group.cards.length} {ui.guides}
                </span>
              </div>
              <div className={styles.grid}>
                {group.cards.map((card) => {
                  const titleId =
                    'resource-card-' +
                    card.path.replace('/resources/', '').replaceAll('/', '-');
                  return (
                    <article className={styles.article} key={card.path}>
                      <Link
                        prefetch={false}
                        href={card.href}
                        className={styles.card}
                        aria-labelledby={titleId}
                      >
                        <EditorialCover
                          card={resourceVisual(card.path, card.category)}
                        />
                        <div className={styles.cardBody}>
                          <span className={styles.category}>
                            {card.category}
                          </span>
                          <h3 id={titleId}>{card.title}</h3>
                          <p>{card.description}</p>
                          <span className={styles.readMore} aria-hidden="true">
                            {ui.read}
                            <ArrowUpRight size={17} strokeWidth={1.7} />
                          </span>
                        </div>
                      </Link>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
      </div>
    </main>
  );
}
