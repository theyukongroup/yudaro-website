import type { MetadataRoute } from 'next';
import { indexableRoutes, SITE_URL } from '@/lib/seo';
import { contentByPath } from '@/lib/search-content';
import { OFFICIAL_PROFILES_UPDATED_ON } from '@/lib/official-profiles';
export default function sitemap(): MetadataRoute.Sitemap {
  // Translation display URLs stay available, but are not index-ready until reviewed.
  // Dates describe actual content or identity changes, never deployment time.
  const coreUpdates: Record<string, string> = {
    '': '2026-10-01',
    '/about': '2026-10-01',
    '/ai-erp': '2026-10-01',
  };
  return indexableRoutes.map((path) => ({
    url: `${SITE_URL}${path || '/'}`,
    // Every public page renders the shared official links and Organization data.
    // Article editorial dates remain independent of this page-level update.
    lastModified: [
      OFFICIAL_PROFILES_UPDATED_ON,
      coreUpdates[path] ?? '',
      contentByPath.get(path)?.dateModified ?? '',
    ].sort().at(-1),
  }));
}
