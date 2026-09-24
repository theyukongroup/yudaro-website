import { SearchPage } from '@/components/search-content';
import { contentByPath } from '@/lib/search-content';
import { authorityMetadata } from '@/lib/seo';
const entry = contentByPath.get('/solutions')!;
export const metadata = authorityMetadata(
  entry.title,
  entry.description,
  entry.path,
);
export default function Page() {
  return <SearchPage entry={entry} />;
}
