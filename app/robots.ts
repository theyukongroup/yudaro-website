import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: 'OAI-SearchBot', allow: '/', disallow: '/localized-content/' },
      { userAgent: 'Googlebot', allow: '/', disallow: '/localized-content/' },
      { userAgent: 'Bingbot', allow: '/', disallow: '/localized-content/' },
      { userAgent: '*', allow: '/', disallow: '/localized-content/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
