import Link from 'next/link';
import ContactContent from '@/components/contact-content';
export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;
  const initialInterest =
    service === 'restaurant-pos'
      ? 'Restaurant POS'
      : service === 'restaurant-erp'
        ? 'Restaurant ERP'
        : '';
  return (
    <>
      <ContactContent key={initialInterest} initialInterest={initialInterest} />
      <section className="section-shell search-local">
        <h2>Talk with our Stafford team</h2>
        <p>
          Yudaro AI &amp; ERP Systems · 13366 Murphy Road, Stafford, TX 77477.
        </p>
        <p>
          <a href="tel:+18328682880">832-868-2880</a>
          {' · '}
          <a href="mailto:info@yudaro.com">info@yudaro.com</a>
          {' · '}
          <a href="https://maps.app.goo.gl/hLXsxHprmSoHsLo88?g_st=ic">
            Yudaro on Google Maps
          </a>
        </p>
        <p>
          Serving Houston-area businesses and projects across Texas and the
          United States. Describe your systems and goals; please do not submit
          passwords or sensitive customer data.
        </p>
        <Link prefetch={false} href="/locations/houston">
          Houston-area consulting and implementation
        </Link>
      </section>
    </>
  );
}
