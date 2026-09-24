import type { MetadataRoute } from 'next';
import { indexableRoutes, SITE_URL } from '@/lib/seo';
import { contentByPath } from '@/lib/search-content';
export default function sitemap(): MetadataRoute.Sitemap {
  // Translation display URLs stay available, but are not index-ready until reviewed.
  // Dates describe actual editorial changes, never the current deployment time.
  return indexableRoutes.map((path) => ({
    url: `${SITE_URL}${path || '/'}`,
    ...(contentByPath.get(path)?.dateModified
      ? { lastModified: contentByPath.get(path)!.dateModified }
      : {}),
  }));
}
