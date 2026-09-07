import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { AssessmentTool } from '@/components/member-platform';
import { isLocale, type Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';
export const metadata:Metadata=pageMetadata('Free AI & ERP Readiness Assessment','Estimate your company’s AI readiness, ERP readiness, automation potential, and data readiness in about five minutes.','/assessment');
export default async function AssessmentPage(){const h=await headers();const raw=h.get('x-nexavoris-locale');const locale:Locale=isLocale(raw)?raw:'en';return <main className="public-tool-page section-shell"><AssessmentTool locale={locale}/></main>}
