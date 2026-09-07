import type { Metadata } from 'next';

export const SITE_URL = 'https://nexavoris-ai-erp.l-leung.chatgpt.site';

export const marketingRoutes = [
  '',
  '/ai-solutions',
  '/erp-solutions',
  '/website-design',
  '/ai-erp',
  '/equipment',
  '/industries',
  '/pricing',
  '/about',
  '/contact',
  '/free-account',
  '/assessment',
] as const;

export const resourceRoutes = [
  '/resources',
  '/resources/private-ai',
  '/resources/odoo-erp',
  '/resources/ai-erp',
  '/resources/business-automation',
  '/resources/comparisons',
  '/resources/guides',
  '/resources/industries/wholesale-distribution',
  '/resources/industries/hvac-field-service',
  '/resources/industries/construction',
  '/resources/industries/manufacturing',
  '/resources/industries/retail',
  '/resources/industries/professional-services',
] as const;

export const publicRoutes = [...marketingRoutes, ...resourceRoutes] as const;

export function localizedUrls(path = '') {
  const url = `${SITE_URL}${path || '/'}`;
  return {
    'x-default': url,
    'en-US': url,
    'zh-CN': `${url}?lang=zh-cn`,
    'zh-TW': `${url}?lang=zh-tw`,
    es: `${url}?lang=es`,
  };
}

export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const canonical = `${SITE_URL}${path || '/'}`;
  const fullTitle = title.startsWith('Nexavoris |') ? title : `${title} | Nexavoris`;
  return {
    title: title.startsWith('Nexavoris |') ? { absolute: title } : title,
    description,
    alternates: { canonical },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: 'Nexavoris',
      type: 'website',
      locale: 'en_US',
      alternateLocale: ['zh_CN', 'zh_TW', 'es'],
      images: [
        {
          url: `${SITE_URL}/og.png`,
          width: 1200,
          height: 630,
          alt: 'Nexavoris AI and ERP systems',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [`${SITE_URL}/og.png`],
    },
  };
}
