import { SearchPage } from '@/components/search-content';
import {
  BusinessIllustration,
  IllustratedFeatures,
} from '@/components/business-illustration';
import { contentByPath } from '@/lib/search-content';
import { authorityMetadata } from '@/lib/seo';
const entry = contentByPath.get('/solutions/business-automation')!;
export const metadata = authorityMetadata(
  entry.title,
  entry.description,
  entry.path,
);
export default function Page() {
  return (
    <SearchPage
      entry={entry}
      heroVisual={
        <BusinessIllustration
          scene="automation"
          label="A business request moving through connected systems and approval"
          wide
        />
      }
    >
      <IllustratedFeatures
        title="Make everyday workflows move."
        items={[
          {
            title: 'Sales and customer follow-up',
            body: 'Connect approved customer requests, quotations, and follow-up steps so your team can focus on the relationship.',
            scene: 'sales',
          },
          {
            title: 'Purchasing and inventory',
            body: 'Route stock alerts and purchasing recommendations to the right people for review.',
            scene: 'inventory',
          },
          {
            title: 'Documents and approvals',
            body: 'Prepare business records and route sensitive decisions through a clear approval process.',
            scene: 'approval',
          },
          {
            title: 'Connected business systems',
            body: 'Coordinate information across the software your business already uses.',
            scene: 'integration',
          },
          {
            title: 'Recurring operations',
            body: 'Reduce repeated administrative steps in scheduling, subscriptions, and service workflows.',
            scene: 'subscriptions',
          },
          {
            title: 'Reports and exceptions',
            body: 'Give managers a clear view of results and the exceptions that still need human attention.',
            scene: 'reporting',
          },
        ]}
      />
    </SearchPage>
  );
}
