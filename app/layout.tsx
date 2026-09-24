import Link from 'next/link';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { Manrope, Geist_Mono } from 'next/font/google';
import Image from 'next/image';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import {
  LanguageRuntime,
  LanguageSelector,
} from '@/components/language-runtime';
import { SITE_URL } from '@/lib/seo';
import { chatGPTSignInPath, getChatGPTUser } from '@/app/chatgpt-auth';
import { isBootstrapAdminEmail } from '@/lib/auth';
import { MobileNavigation } from '@/components/mobile-navigation';
import { isLocale, languageTags } from '@/lib/i18n';
import './globals.css';
import './extended.css';
import './pricing.css';
import './equipment.css';
import './theme-v2.css';
import './industries.css';
import './about.css';
import './resources.css';
import './authority.css';
import './member.css';
import './restaurants.css';
import './fixes.css';
import './yudaro.css';
import './momentum.css';
import { MotionSystem } from '@/components/motion-system';
import { DesktopNavigation } from '@/components/desktop-navigation';
import { FlowLine } from '@/components/yudaro-visuals';

const sans = Manrope({ variable: '--font-sans', subsets: ['latin'] });
const mono = Geist_Mono({ variable: '--font-mono', subsets: ['latin'] });
export const metadata: Metadata = {
  title: {
    default: 'Yudaro | Private AI, ERP & Business Automation',
    template: '%s | Yudaro',
  },
  description:
    'Yudaro helps businesses connect private AI, ERP, Odoo, company knowledge and workflow automation to improve operations, reporting and decision-making.',
  metadataBase: new URL(SITE_URL),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  category: 'business technology services',
  icons: {
    icon: [{ url: '/yudaro-mark.png', type: 'image/png' }],
    apple: '/yudaro-mark.png',
  },
  openGraph: {
    title: 'Yudaro AI & ERP Systems',
    description: 'One integrated operating system for your business.',
    url: SITE_URL,
    siteName: 'Yudaro',
    locale: 'en_US',
    alternateLocale: ['zh_CN', 'zh_TW', 'es'],
    type: 'website',
    images: [
      {
        url: '/yudaro-social.png',
        width: 1200,
        height: 630,
        alt: 'Yudaro AI & ERP Systems',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yudaro AI & ERP Systems',
    description: 'Private AI, ERP, and automation for operational businesses.',
    images: ['/yudaro-social.png'],
  },
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const localeHeader = (await headers()).get('x-yudaro-locale');
  const documentLanguage = isLocale(localeHeader)
    ? languageTags[localeHeader]
    : 'en-US';
  const member = await getChatGPTUser();
  return (
    <html lang={documentLanguage} suppressHydrationWarning>
      <body className={`${sans.variable} ${mono.variable} momentum-site`}>
        <Link className="skip-link" href="#main-content">
          Skip to main content
        </Link>
        <MotionSystem>
          <LanguageRuntime />
          <header className="site-header">
            <Link
              className="brand logo-brand"
              href="/"
              aria-label="Yudaro home"
            >
              <Image
                src="/yudaro-logo-2026.png"
                alt="Yudaro AI & ERP Systems"
                width={210}
                height={105}
                priority
              />
            </Link>
            <DesktopNavigation />
            <LanguageSelector />
            <Link
              className="member-header-link"
              href={
                member
                  ? isBootstrapAdminEmail(member.email)
                    ? '/admin'
                    : '/account'
                  : chatGPTSignInPath('/account')
              }
              target={member ? undefined : '_top'}
            >
              {member
                ? isBootstrapAdminEmail(member.email)
                  ? 'Admin'
                  : 'My Account'
                : 'Sign In'}
            </Link>
            <Link className="nav-cta desktop-assessment" href="/assessment">
              Free Assessment <ArrowUpRight size={16} />
            </Link>
            <MobileNavigation
              signedIn={Boolean(member)}
              accountHref={chatGPTSignInPath('/account')}
            />
          </header>
          <div id="main-content">{children}</div>
          <footer className="site-footer">
            <div className="footer-statement">
              <FlowLine />
              <span className="section-index">
                THE NEXT CHAPTER OF YOUR BUSINESS
              </span>
              <h2>
                Your business already has the data.
                <br />
                Let’s turn it into intelligence.
              </h2>
              <Link className="text-link" href="/contact">
                Start the conversation <ArrowUpRight size={20} />
              </Link>
            </div>
            <div className="footer-company">
              <Link
                className="logo-brand footer-logo"
                href="/"
                aria-label="Yudaro home"
              >
                <Image
                  src="/yudaro-logo-2026.png"
                  alt="Yudaro AI & ERP Systems"
                  width={205}
                  height={103}
                />
              </Link>
              <p>AI that understands your business. ERP that runs it.</p>
            </div>
            <address className="footer-contact">
              <Link href="/free-account">Free Business Account</Link>
              <Link href="/how-yudaro-works">How Yudaro Works</Link>
              <Link href="/case-studies">Case Studies</Link>
              <Link href="/trust">Trust &amp; Data Practices</Link>
              <span>
                <MapPin size={16} />
                <span>
                  13366 Murphy Road
                  <br />
                  Stafford, TX 77477
                </span>
              </span>
              <Link href="tel:+12812588000">
                <Phone size={16} />
                281-258-8000
              </Link>
              <Link href="mailto:info@yudaro.com">
                <Mail size={16} />
                Contact our team
              </Link>
            </address>
            <span className="footer-copyright">
              © 2026 Yudaro. All rights reserved.
              {' · '}
              <Link href="/privacy">Privacy</Link>
              {' · '}
              <Link href="/terms">Terms</Link>
            </span>
          </footer>
        </MotionSystem>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': ['Organization', 'ProfessionalService'],
                  '@id': `${SITE_URL}/#organization`,
                  name: 'Yudaro AI & ERP Systems',
                  alternateName: 'Yudaro',
                  sameAs: ['https://www.linkedin.com/company/yudaro/'],
                  url: SITE_URL,
                  logo: `${SITE_URL}/yudaro-logo-2026.png`,
                  image: `${SITE_URL}/yudaro-social.png`,
                  telephone: '+1-281-258-8000',
                  address: {
                    '@type': 'PostalAddress',
                    streetAddress: '13366 Murphy Road',
                    addressLocality: 'Stafford',
                    addressRegion: 'TX',
                    postalCode: '77477',
                    addressCountry: 'US',
                  },
                  areaServed: { '@type': 'Country', name: 'United States' },
                  knowsAbout: [
                    'Private enterprise AI',
                    'ERP consulting and implementation',
                    'Odoo implementation',
                    'AI ERP integration',
                    'Business process automation',
                    'Website design and development',
                  ],
                  hasOfferCatalog: {
                    '@type': 'OfferCatalog',
                    name: 'Yudaro business technology services',
                    itemListElement: [
                      'Private enterprise AI solutions',
                      'ERP consulting and Odoo implementation',
                      'AI and ERP integration',
                      'Business workflow automation',
                      'Website design and development',
                    ].map((name) => ({
                      '@type': 'Offer',
                      itemOffered: { '@type': 'Service', name },
                    })),
                  },
                },
                {
                  '@type': 'WebSite',
                  '@id': `${SITE_URL}/#website`,
                  url: SITE_URL,
                  name: 'Yudaro',
                  publisher: { '@id': `${SITE_URL}/#organization` },
                  inLanguage: ['en-US', 'zh-CN', 'zh-TW', 'es'],
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
