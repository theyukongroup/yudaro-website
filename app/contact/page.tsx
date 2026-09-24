import Link from 'next/link';
import ContactContent from '@/components/contact-content';
export default function ContactPage() {
  return (
    <>
      <ContactContent />
      <section className="section-shell search-local">
        <h2>Talk with our Stafford team</h2>
        <p>
          Yudaro AI &amp; ERP Systems · 13366 Murphy Road, Stafford, TX 77477.
        </p>
        <p>
          <a href="tel:+12812588000">281-258-8000</a>
          {' · '}
          <a href="mailto:info@yudaro.com">info@yudaro.com</a>
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
