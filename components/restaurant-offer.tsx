import Image from 'next/image';
import Link from 'next/link';
import { Check, ShoppingCart, Boxes, BrainCircuit } from 'lucide-react';
import styles from './restaurant-offer.module.css';
import offer from '@/lib/restaurant-offer.json';

export function RestaurantLadder() {
  return (
    <section
      className={`section-shell ${styles.ladder}`}
      aria-labelledby="restaurant-ladder-title"
    >
      <span className="section-index">THREE DISTINCT LEVELS</span>
      <h2 id="restaurant-ladder-title">
        POS runs the checkout counter. ERP runs the business.
      </h2>
      <p>
        Choose the service your restaurant needs now. ERP is an optional
        separate purchase. Private AI and automation have their own scope and
        pricing.
      </p>
      <div className={styles.ladderGrid}>
        {[
          {
            title: 'Restaurant POS',
            body: 'Run the checkout counter.',
            price: '$899 + tax',
            service: '$29.99/user/month',
            name: offer.pos.service,
            detail:
              'Hardware, POS setup, orders and checkout. Restaurant ERP implementation is not included.',
            href: '/contact?service=restaurant-pos',
            cta: 'Get the $899 Restaurant POS Package',
            Icon: ShoppingCart,
          },
          {
            title: 'Restaurant ERP',
            body: 'Run the business.',
            price: '$5,000 implementation',
            service: '$300/month',
            name: offer.erp.service,
            detail:
              'Up to 5 users. Back-office workflows according to agreed implementation scope.',
            href: '/contact?service=restaurant-erp',
            cta: 'Schedule an ERP Consultation',
            Icon: Boxes,
          },
          {
            title: 'Private AI + Automation',
            body: 'Understand, automate, and improve the business.',
            price: 'Custom pricing',
            service: 'Separate scope',
            name: 'Private AI + Automation',
            detail:
              'SOP search, business Q&A, approved ERP queries and workflow automation.',
            href: '/ai-solutions',
            cta: 'Explore Private AI & Automation',
            Icon: BrainCircuit,
          },
        ].map(({ Icon, ...x }, i) => (
          <article key={x.title} className={styles['level' + i]}>
            <Icon aria-hidden="true" size={28} />
            <span className="section-index">LEVEL {i + 1}</span>
            <h3>{x.title}</h3>
            <p>{x.body}</p>
            <strong className={styles.ladderPrice}>{x.price}</strong>
            <strong>{x.service}</strong>
            <span>{x.name}</span>
            <p>{x.detail}</p>
            <Link className="text-link" href={x.href}>
              {x.cta} →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
export function RestaurantPromotion() {
  return (
    <section
      id="restaurant-pos-package"
      className={`section-shell ${styles.promotion}`}
      aria-labelledby="restaurant-package-title"
    >
      <div className={styles.offerHeading}>
        <span className="section-index">YUDARO RESTAURANT POS PLATFORM</span>
        <h2 id="restaurant-package-title">
          Restaurant POS Package — $899 + tax
        </h2>
        <p>
          Take orders, process checkout and print receipts with a standalone
          front-of-house POS solution.
        </p>
      </div>
      <div className={styles.offerGrid}>
        <div>
          <Image
            src="/promotions/restaurant-pos-hardware.png"
            alt="Illustration of the restaurant POS hardware: touchscreen computer, cash drawer, receipt printer and card reader"
            width={1536}
            height={1024}
            sizes="(max-width: 900px) 100vw, 60vw"
          />
          <p className={styles.demoNote}>
            Hardware illustration. Final device configuration follows the agreed
            POS package.
          </p>
          <div className={styles.hardwareList}>
            {offer.pos.hardware.map((x) => (
              <span key={x}>
                <Check size={16} aria-hidden="true" />
                {x}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.offerCopy}>
          <span className={styles.badge}>ONE-TIME POS PACKAGE</span>
          <p className={styles.price}>
            $899 <span>+ tax</span>
          </p>
          <p className={styles.exclusion}>
            Restaurant ERP implementation is not included.
          </p>
          <ul>
            {offer.pos.included.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
          <div className={styles.terms}>
            <strong>$29.99/user/month</strong>
            <strong>{offer.pos.service}</strong>
            <span>Ongoing POS platform support and maintenance only.</span>
            <span>Minimum 1-year POS service subscription required.</span>
          </div>
          <Link
            className="button primary"
            href="/contact?service=restaurant-pos"
          >
            Get the $899 Restaurant POS Package
          </Link>
        </div>
      </div>
      <div className={styles.scopeBoundary}>
        <strong>{offer.pos.disclaimer}</strong>
        <p>{offer.pos.longDisclaimer}</p>
        <p>
          ERP inventory, purchasing, vendor management, accounting,
          multi-location ERP, advanced ERP reporting, custom ERP modules, ERP
          automation and Private AI integration require a separate scope.
        </p>
      </div>
    </section>
  );
}
export function RestaurantERP() {
  return (
    <section
      id="restaurant-erp-implementation"
      className={`section-shell ${styles.erp}`}
      aria-labelledby="restaurant-erp-title"
    >
      <div>
        <span className="section-index">OPTIONAL SEPARATE PURCHASE</span>
        <h2 id="restaurant-erp-title">Restaurant ERP Implementation</h2>
        <p className={styles.erpPrice}>
          $5,000 implementation + $300/month for up to 5 users
        </p>
        <p>
          <strong>{offer.erp.service}</strong>
        </p>
        <p>
          The Yudaro Restaurant ERP Implementation Package configures a full
          back-office business management system according to agreed
          implementation scope.
        </p>
        <ul className={styles.erpScope}>
          {offer.erp.scope.map((x) => (
            <li key={x}>
              <Check size={16} aria-hidden="true" />
              {x}
            </li>
          ))}
        </ul>
        <p>
          POS-to-ERP integration, customized modules and advanced workflows
          depend on the agreed scope. Additional customization may be quoted
          separately. Private AI and automation projects have separate pricing.
        </p>
        <div className={styles.scopeBoundary}>
          <strong>{offer.erp.disclaimer}</strong>
        </div>
        <Link className="button primary" href="/contact?service=restaurant-erp">
          Schedule an ERP Consultation
        </Link>
      </div>
    </section>
  );
}
export function RestaurantPackageFAQ() {
  return (
    <section className={`section-shell ${styles.packageFaq}`}>
      <h2>POS and ERP pricing questions</h2>
      {offer.faqs.map(([q, a]) => (
        <details key={q}>
          <summary>{q}</summary>
          <p>{a}</p>
        </details>
      ))}
    </section>
  );
}
const screens = [
  {
    file: 'floor-plan',
    width: 2551,
    height: 1109,
    title: 'See the dining room at a glance',
    label: 'POS / TABLES & FLOOR PLANS',
    body: 'Move between dining areas and start an order from the seating plan. Front-of-house configuration follows the agreed POS scope.',
    wide: true,
  },
  {
    file: 'guest-seating',
    width: 826,
    height: 610,
    title: 'Seat the whole party',
    label: 'POS / GUEST COUNTS',
    body: 'Illustrative buffet configuration groups guests by age and service period. Confirm required configuration during POS setup.',
  },
  {
    file: 'pos-register',
    width: 1652,
    height: 983,
    title: 'Take the order',
    label: 'POS / REGISTER',
    body: 'Add menu items and drinks, adjust quantities and review the total before checkout.',
  },
  {
    file: 'payment-receipt',
    width: 1638,
    height: 982,
    title: 'Close the sale with a clear receipt',
    label: 'POS / PAYMENT & RECEIPTS',
    body: 'Confirm payment and produce an itemized receipt. Payment processing arrangements follow the agreed configuration.',
    wide: true,
  },
  {
    file: 'customer-payments',
    width: 2542,
    height: 872,
    title: 'Review back-office payment records',
    label: 'SEPARATE ERP / PAYMENTS',
    body: 'Payment journals, processing status and accounting-related workflows belong to the separately scoped ERP implementation.',
  },
  {
    file: 'vendor-bills',
    width: 2557,
    height: 729,
    title: 'Keep supplier bills organized',
    label: 'SEPARATE ERP / VENDORS',
    body: 'Supplier documents, due dates and bill status are back-office ERP functions. They are not included in the $899 POS Package.',
  },
  {
    file: 'inventory',
    width: 2538,
    height: 1104,
    title: 'Know what is on hand',
    label: 'SEPARATE ERP / INVENTORY',
    body: 'Ingredient and supply records, stock movements and inventory reporting require the separate Restaurant ERP Implementation Package.',
    wide: true,
  },
];
export function OdooRestaurantShowcase() {
  return (
    <section
      id="odoo-restaurant"
      className={`section-shell ${styles.showcase}`}
      aria-labelledby="odoo-restaurant-title"
    >
      <div className="section-head">
        <span className="section-index">RESTAURANT SYSTEMS / CLEAR SCOPE</span>
        <h2 id="odoo-restaurant-title">
          Front-of-house POS. Separately scoped back-office ERP.
        </h2>
        <p>
          The Yu Kitchen demonstration shows both layers. The first four
          examples show POS workflows. Payment journals, vendor bills and
          inventory are separate ERP capabilities, not inclusions in the $899
          POS Package.
        </p>
      </div>
      <p className={styles.demoNote}>
        Fictional demonstration data. Screens illustrate configured workflows;
        final features depend on modules and agreed scope. Select a screenshot
        to view it at full size.
      </p>
      <div className={styles.screens}>
        {screens.map((s) => (
          <figure key={s.file} className={s.wide ? styles.wide : undefined}>
            <a
              href={`/showcase/restaurant-pos/${s.file}.webp`}
              target="_blank"
              rel="noreferrer"
              aria-label={`View full-size screenshot: ${s.title}`}
            >
              <Image
                src={`/showcase/restaurant-pos/${s.file}.webp`}
                alt={`${s.label}: ${s.title}`}
                width={s.width}
                height={s.height}
                sizes={
                  s.wide
                    ? '(max-width: 1600px) 100vw, 1536px'
                    : '(max-width: 800px) 100vw, 50vw'
                }
              />
            </a>
            <figcaption>
              <span className="section-index">{s.label}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className={styles.bottomCta}>
        <div>
          <span className="section-index">BACK-OFFICE NEEDS</span>
          <h3>Discuss a separate ERP implementation.</h3>
        </div>
        <Link className="button primary" href="/contact?service=restaurant-erp">
          Schedule an ERP Consultation
        </Link>
      </div>
    </section>
  );
}
