import Link from 'next/link';
import { verifiedPeople } from '@/lib/editorial-people';
type EditorialEntry = {
  authorId?: string;
  reviewerId?: string;
  datePublished?: string;
  dateModified?: string;
};
const organization = { '@id': 'https://yudaro.com/#organization' };
export function articleCreditSchema(entry: EditorialEntry) {
  const author = entry.authorId ? verifiedPeople[entry.authorId] : undefined;
  return {
    author: author
      ? {
          '@type': 'Person',
          '@id': author.profileUrl + '#person',
          name: author.name,
          url: author.profileUrl,
          jobTitle: author.role,
        }
      : organization,
  };
}
export function ArticleCredits({ entry }: { entry: EditorialEntry }) {
  const author = entry.authorId ? verifiedPeople[entry.authorId] : undefined;
  const reviewer = entry.reviewerId
    ? verifiedPeople[entry.reviewerId]
    : undefined;
  return (
    <p className="search-byline">
      By{' '}
      <Link prefetch={false} href={author?.profileUrl || '/about'}>
        {author?.name || 'Yudaro AI & ERP Systems'}
      </Link>
      {reviewer && (
        <>
          {' '}
          · Technical review:{' '}
          <Link prefetch={false} href={reviewer.profileUrl}>
            {reviewer.name}
          </Link>
        </>
      )}{' '}
      · Published{' '}
      <time dateTime={entry.datePublished}>{entry.datePublished}</time> ·
      Substantively updated{' '}
      <time dateTime={entry.dateModified}>{entry.dateModified}</time>
    </p>
  );
}
