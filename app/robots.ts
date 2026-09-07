import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: 'OAI-SearchBot', allow: '/', disallow: ['/localized-content/', '/account', '/api/'] },
      { userAgent: 'Googlebot', allow: '/', disallow: ['/localized-content/', '/account', '/api/'] },
      { userAgent: 'Bingbot', allow: '/', disallow: ['/localized-content/', '/account', '/api/'] },
      { userAgent: '*', allow: '/', disallow: ['/localized-content/', '/account', '/api/'] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
