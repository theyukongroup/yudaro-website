import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';
export default function robots(): MetadataRoute.Robots {
  // Login/localization must be crawlable so crawlers can read noindex or 404.
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/account',
        '/admin',
        '/api/',
        '/signin-with-chatgpt',
        '/signout-with-chatgpt',
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
