import { notFound } from 'next/navigation';
import { contentByPath } from '@/lib/search-content';
import { authorityMetadata } from '@/lib/seo';
import { SearchPage } from '@/components/search-content';
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const entry = contentByPath.get('/solutions/' + slug);
  if (!entry) notFound();
  return authorityMetadata(entry.title, entry.description, entry.path);
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const entry = contentByPath.get('/solutions/' + slug);
  if (!entry) notFound();
  return <SearchPage entry={entry} />;
}
