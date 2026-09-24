import entries from './search-content.json';
export type ContentSection = {
  title: string;
  body: string;
  items?: string[];
  diagram?: 'read' | 'write';
  table?: { headers: string[]; rows: string[][] };
};
export type SearchContent = {
  path: string;
  title: string;
  description: string;
  eyebrow: string;
  intro: string;
  kind: 'Service' | 'Article' | 'CollectionPage';
  sections: ContentSection[];
  faqs: [string, string][];
  related: { href: string; label: string }[];
  authorId?: string;
  reviewerId?: string;
  datePublished?: string;
  dateModified: string;
  sources?: { href: string; label: string }[];
  image?: string;
};
export const searchContent = entries as SearchContent[];
export const contentByPath = new Map(
  searchContent.map((entry) => [entry.path, entry]),
);
