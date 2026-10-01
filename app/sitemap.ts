import type { MetadataRoute } from 'next';
import { indexableRoutes, SITE_URL } from '@/lib/seo';
import { contentByPath } from '@/lib/search-content';
export default function sitemap(): MetadataRoute.Sitemap {
  // Translation display URLs stay available, but are not index-ready until reviewed.
  // Dates describe actual editorial changes, never the current deployment time.
  const coreUpdates: Record<string, string> = {
    '': '2026-10-01',
    '/about': '2026-10-01',
    '/ai-erp': '2026-10-01',
  };
  return indexableRoutes.map((path) => ({
    url: `${SITE_URL}${path || '/'}`,
    ...((coreUpdates[path] ?? contentByPath.get(path)?.dateModified)
      ? {
          lastModified:
            coreUpdates[path] ?? contentByPath.get(path)!.dateModified,
        }
      : {}),
  }));
}
