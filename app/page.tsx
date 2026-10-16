import Link from 'next/link';
import { ArrowRight, BrainCircuit, Boxes, Workflow, Zap } from 'lucide-react';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import styles from './home.module.css';
import { Sparkles } from 'lucide-react';
import { HeroSignal, Ecosystem } from '@/components/yudaro-visuals';
import { MagneticLink } from '@/components/motion-system';
import { SocialProfileIcons } from '@/components/official-profile-links';

export const metadata: Metadata = pageMetadata(
  'Yudaro AI + ERP | Private AI & Odoo ERP Implementation',
  'Yudaro provides Private AI, Odoo ERP implementation, AI + ERP integration, and business automation for growing companies.',
  '',
);

const solutions = [
  {
    title: 'Private AI',
    description:
      'Make company documents, knowledge, and SOPs useful to your team.',
    href: '/ai-solutions',
    icon: BrainCircuit,
  },
  {
    title: 'Odoo ERP',
    description:
      'Connect sales, inventory, purchasing, and accounting in one operation.',
    href: '/erp-solutions',
    icon: Boxes,
  },
  {
    title: 'AI + ERP',
    description:
      'Turn business data into answers and actions your team can approve.',
    href: '/ai-erp',
    icon: Workflow,
  },
  {
    title: 'Business Automation',
    description:
      'Reduce repetitive work with connected workflows and approvals.',
    href: '/solutions/business-automation',
    icon: Zap,
  },
];
const industries = [
  ['Distribution', '/industries/distribution'],
  ['HVAC & Field Service', '/industries/hvac-field-service'],
  ['Construction', '/industries/construction'],
  ['Retail', '/industries/retail'],
  ['Manufacturing', '/industries/manufacturing'],
  ['Professional Services', '/industries/professional-services'],
  ['Restaurants', '/industries/restaurants'],
] as const;
const steps = [
  [
    'Discover',
    'We review your workflows, systems, and priorities to define a practical plan.',
  ],
  [
    'Implement',
    'We configure your systems, migrate data, and train your team.',
  ],
  [
    'Support',
    'We help your team adopt the tools and improve them as your business grows.',
  ],
] as const;

export default function Home() {
  return (
    <main className="momentum-home">
      <section className="hero section-shell">
        <div className="hero-grid" />
        <div className="hero-copy">
          <div className="eyebrow">
            <Sparkles size={14} /> Built around your business.
          </div>
          <h1>
            Yudaro
            <br />
            AI + ERP
            <br />
            <span>Systems</span>
          </h1>
          <p>
            Yudaro is an AI + ERP implementation company providing Private AI,
            Odoo ERP implementation, AI + ERP integration, and business
            automation for growing companies.
          </p>
          <div className="actions">
            <MagneticLink href="/assessment">
              Take the Free Assessment <ArrowRight size={17} />
            </MagneticLink>
            <Link className="button secondary" href="/ai-erp">
              Explore AI ERP
            </Link>
          </div>
          <SocialProfileIcons />
          <div className="trust-row">
            <span>PRIVATE BY DESIGN</span>
            <span>BUSINESS-FIRST</span>
            <span>BUILT FOR OPERATIONS</span>
          </div>
        </div>
        <HeroSignal />
      </section>
      <div className={styles.home}>
        <section
          className={`${styles.shell} ${styles.solutions}`}
          id="solutions"
          aria-labelledby="solutions-title"
        >
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>SOLUTIONS</p>
              <h2 id="solutions-title">Find the right starting point.</h2>
            </div>
            <Link className={styles.textLink} href="/solutions">
              All solutions <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className={styles.cards}>
            {solutions.map(({ title, description, href, icon: Icon }) => (
              <Link className={styles.card} key={href} href={href}>
                <Icon size={26} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{description}</p>
                <span className={styles.cardAction}>
                  Explore {title} <ArrowRight size={16} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
          <nav className={styles.additional} aria-label="More Yudaro solutions">
            <span>Also from Yudaro</span>
            <Link href="/website-design">
              Website Design <ArrowRight size={14} aria-hidden="true" />
            </Link>
            <Link href="/equipment">
              AI Equipment <ArrowRight size={14} aria-hidden="true" />
            </Link>
            <Link href="/corporate-culture-intelligence">
              Corporate Culture Intelligence{' '}
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </nav>
        </section>
      </div>
      <section className="ecosystem-section section-shell">
        <div className="section-head centered">
          <span className="section-index">
            ONE BUSINESS. ONE CONNECTED ECOSYSTEM.
          </span>
          <h2>
            Great things happen
            <br />
            when everything connects.
          </h2>
          <p>Your people, knowledge, and operations. Connected by Yudaro.</p>
        </div>
        <Ecosystem />
      </section>
      <div className={styles.home}>
        <section
          className={styles.industryBand}
          aria-labelledby="industries-title"
        >
          <div className={styles.shell}>
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.eyebrow}>YOUR INDUSTRY</p>
                <h2 id="industries-title">Built around how you work.</h2>
              </div>
              <Link className={styles.textLink} href="/industries">
                All industries <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <nav
              className={styles.industryLinks}
              aria-label="Industry solutions"
            >
              {industries.map(([name, href]) => (
                <Link key={href} href={href}>
                  {name}
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              ))}
            </nav>
          </div>
        </section>

        <section
          className={`${styles.shell} ${styles.process}`}
          id="process"
          aria-labelledby="process-title"
        >
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>HOW WE WORK</p>
              <h2 id="process-title">A clear path from plan to progress.</h2>
            </div>
            <Link className={styles.textLink} href="/how-yudaro-works">
              Our approach <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <ol className={styles.steps}>
            {steps.map(([title, description], index) => (
              <li key={title}>
                <span className={styles.stepNumber}>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ol>
          <div className={styles.contact}>
            <div>
              <h2>Let’s find your next step.</h2>
              <p>Talk with our team about your business and where to begin.</p>
            </div>
            <Link className="button primary" href="/contact">
              Book a Consultation <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <p className={styles.local}>
            Based in Stafford, Texas. Serving businesses across the United
            States.{' '}
            <Link href="/locations/houston">
              Houston-area services <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
