import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata(
  'Contact Yudaro',
  'Discuss private AI, ERP, automation, equipment, or website design requirements with Yudaro.',
  '/contact',
);

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
