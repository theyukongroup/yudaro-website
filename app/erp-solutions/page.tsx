import {
  BusinessIllustration,
  type BusinessScene,
} from '@/components/business-illustration';
import Link from 'next/link';
import { RestaurantERP } from '@/components/restaurant-offer';
import { ContentSections } from '@/components/search-content';
import { contentByPath } from '@/lib/search-content';
import { PageSchema, Breadcrumbs } from '@/components/structured-data';
const detail = contentByPath.get('/erp-solutions')!;
import { SolutionPage } from '@/components/solution-page';
import { ScreenshotGallery } from '@/components/screenshot-gallery';
import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata(
  'Yudaro ERP | Odoo ERP Implementation & Consulting',
  detail.description,
  detail.path,
);
const names = [
  'ERP Consulting & Workflow Design',
  'Odoo Implementation',
  'CRM & Sales',
  'Purchasing & Inventory',
  'Accounting Integration',
  'Field Service',
  'Subscriptions & Memberships',
  'Dashboards & Reporting',
  'Custom Modules',
  'Third-Party Integrations',
  'Data Migration & Training',
  'Maintenance & Support',
];
const bodies = [
  'Align technology decisions with how your business actually creates value.',
  'Configure and extend Odoo as one capable platform within the right solution architecture.',
  'Build a consistent process from first opportunity through quote, order, and relationship management.',
  'Create visibility and control across suppliers, stock, replenishment, and fulfillment.',
  'Connect operational workflows with your accounting system and financial processes.',
  'Coordinate scheduling, technicians, work orders, parts, and customer communication.',
  'Manage recurring revenue, renewals, access, and customer lifecycle processes.',
  'Give leaders timely, trustworthy views of performance and exceptions.',
  'Add the capabilities your operation needs without creating unnecessary complexity.',
  'Connect existing platforms, commerce tools, payments, and specialized software.',
  'Move critical records responsibly and prepare employees to work confidently.',
  'Keep the system stable, relevant, and improving as your business evolves.',
];
const scenes: BusinessScene[] = [
  'planning',
  'modules',
  'sales',
  'inventory',
  'finance',
  'service',
  'subscriptions',
  'reporting',
  'development',
  'integration',
  'migration',
  'support',
];
const screenshots = [
  {
    src: '/showcase/odoo/crm.webp',
    alt: 'Odoo CRM pipeline dashboard',
    title: 'CRM',
    description:
      'Track opportunities, priorities, and next actions across a clear visual sales pipeline.',
  },
  {
    src: '/showcase/odoo/sales.webp',
    alt: 'Odoo sales quotation and order workspace',
    title: 'Sales',
    description:
      'Move from quotation to order with consistent pricing, customer records, and approvals.',
  },
  {
    src: '/showcase/odoo/inventory.webp',
    alt: 'Odoo inventory operations dashboard',
    title: 'Inventory',
    description:
      'Coordinate receipts, deliveries, replenishment, and stock movements in one system.',
  },
  {
    src: '/showcase/odoo/manufacturing.webp',
    alt: 'Odoo manufacturing planning interface',
    title: 'Manufacturing',
    description:
      'Plan production, manage work orders, and connect materials to finished goods.',
  },
  {
    src: '/showcase/odoo/ecommerce.webp',
    alt: 'Odoo ecommerce storefront and product page',
    title: 'Ecommerce',
    description:
      'Connect the customer storefront directly to products, inventory, sales, and fulfillment.',
  },
];
export default function Page() {
  return (
    <>
      <Breadcrumbs
        items={[
          { href: '/', label: 'Home' },
          { href: '/solutions', label: 'Solutions' },
          { href: detail.path, label: 'Odoo ERP Implementation & Consulting' },
        ]}
      />
      <PageSchema
        path={detail.path}
        title={detail.title}
        description={detail.description}
        service
      />
      <SolutionPage
        eyebrow="ERP SOLUTIONS"
        title={detail.title}
        intro={detail.intro}
        items={names.map((title, i) => ({
          title,
          body: bodies[i],
          illustration: (
            <BusinessIllustration scene={scenes[i]} label={title} />
          ),
        }))}
      >
        <ContentSections entry={detail} />
        <RestaurantERP />
      </SolutionPage>
      <ScreenshotGallery
        eyebrow="ODOO SHOWCASE"
        title="One platform, connected across your operation."
        intro="Odoo brings customer, sales, inventory, manufacturing, ecommerce, and financial workflows together. We tailor the platform to the way your business actually works."
        screenshots={screenshots}
      />
      <div className="section-shell center-action">
        <Link prefetch={false} className="text-link" href="/resources/odoo-erp">
          Read the practical guide to Odoo ERP
        </Link>
      </div>
    </>
  );
}
