import Image from 'next/image';
import Link from 'next/link';
import styles from './restaurant-offer.module.css';

export function RestaurantPromotion() {
  return <section id="restaurant-pos-package" className={`section-shell ${styles.promotion}`} aria-labelledby="restaurant-package-title">
    <div className={styles.offerHeading}><span className="section-index">RESTAURANT POS PROMOTION</span><h2 id="restaurant-package-title">Your restaurant. Ready for service.</h2><p>A restaurant POS system package with hardware, POS software and back-office ERP.</p></div>
    <div className={styles.offerGrid}>
      <a href="/promotions/restaurant-pos-package.webp" target="_blank" rel="noreferrer" aria-label="View full-size restaurant POS promotion flyer"><Image src="/promotions/restaurant-pos-package.webp" alt="Restaurant POS system package promotion: $899 plus tax, $29.99 per user per month maintenance, minimum one-year subscription" width={1448} height={1086} sizes="(max-width: 900px) 100vw, 65vw" /></a>
      <div className={styles.offerCopy}><span className={styles.badge}>COMPLETE SYSTEM PACKAGE</span><p className={styles.price}>$899 <span>+ tax</span></p><ul><li>15.6-inch touchscreen computer</li><li>Cash drawer</li><li>Epson receipt printer</li><li>Credit card reader</li><li>POS software + back-office ERP</li></ul><div className={styles.terms}><strong>$29.99 per user / month</strong><span>Maintenance fee</span><strong>Minimum 1-year subscription required</strong></div><Link className="button primary" href="/contact?service=restaurant-pos">Ask about this package</Link><Link className="text-link" href="/industries/restaurants#odoo-restaurant">Explore Odoo for restaurants →</Link></div>
    </div>
  </section>;
}

const screens = [
  { file: 'floor-plan', width: 2551, height: 1109, title: 'See the dining room at a glance', label: '01 / TABLES & FLOOR PLANS', body: 'Move between the main hall and party room, select a table, and start an order from the seating plan.', wide: true },
  { file: 'guest-seating', width: 826, height: 610, title: 'Seat the whole party', label: '02 / BUFFET GUEST COUNTS', body: 'This buffet configuration groups adults, children, seniors and toddlers by lunch, dinner and weekend service.' },
  { file: 'pos-register', width: 1652, height: 983, title: 'Take the order', label: '03 / RESTAURANT REGISTER', body: 'Add buffet items and drinks, adjust quantities, and review the total before payment.' },
  { file: 'payment-receipt', width: 1638, height: 982, title: 'Close the sale with a clear receipt', label: '04 / PAYMENT & RECEIPTS', body: 'Confirm payment, print an itemized receipt, or prepare a receipt for email delivery.', wide: true },
  { file: 'customer-payments', width: 2542, height: 872, title: 'Follow customer payments', label: '05 / BACK-OFFICE PAYMENTS', body: 'Review payment dates, journals, methods, amounts and processing status in one list.' },
  { file: 'vendor-bills', width: 2557, height: 729, title: 'Keep supplier bills organized', label: '06 / VENDOR BILLS', body: 'Track supplier documents, due dates, totals and bill status alongside your restaurant records.' },
  { file: 'inventory', width: 2538, height: 1104, title: 'Know what is on hand', label: '07 / PRODUCTS & INVENTORY', body: 'See ingredients, drinks and supplies with product references, prices and on-hand quantities.', wide: true },
];

export function OdooRestaurantShowcase() {
  return <section id="odoo-restaurant" className={`section-shell ${styles.showcase}`} aria-labelledby="odoo-restaurant-title">
    <div className="section-head"><span className="section-index">ODOO FOR THE RESTAURANT INDUSTRY</span><h2 id="odoo-restaurant-title">From the first guest to the back office.</h2><p>Bring restaurant service and business operations together with Odoo. Yudaro configures the POS and ERP around your menu, service model and team, connecting the dining room with payments, supplier bills and inventory.</p></div>
    <div className={styles.workflow}><span>Seat guests</span><b>→</b><span>Take orders</span><b>→</b><span>Take payment</span><b>→</b><span>Manage the business</span></div>
    <p className={styles.demoNote}>The Yu Kitchen demonstration shows a configured buffet workflow. Features depend on the installed modules, integrations and setup. Select any screenshot to view it at full size.</p>
    <div className={styles.screens}>{screens.map(s => <figure key={s.file} className={s.wide ? styles.wide : undefined}><a href={`/showcase/restaurant-pos/${s.file}.webp`} target="_blank" rel="noreferrer" aria-label={`View full-size screenshot: ${s.title}`}><Image src={`/showcase/restaurant-pos/${s.file}.webp`} alt={`${s.title}: Odoo restaurant demonstration`} width={s.width} height={s.height} sizes={s.wide ? '(max-width: 1600px) 100vw, 1536px' : '(max-width: 800px) 100vw, 50vw'} /></a><figcaption><span className="section-index">{s.label}</span><h3>{s.title}</h3><p>{s.body}</p></figcaption></figure>)}</div>
    <div className={styles.bottomCta}><div><span className="section-index">START WITH THE POS PACKAGE</span><h3>Equip your counter. Connect your operation.</h3></div><Link className="button primary" href="/pricing#restaurant-pos-package">See the $899 + tax promotion</Link></div>
  </section>;
}
