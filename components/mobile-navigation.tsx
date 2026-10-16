'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { LanguageSelector } from '@/components/language-runtime';

type Props = { signedIn: boolean; accountHref: string };
const groups = [
  {
    label: 'Solutions',
    links: [
      ['All Solutions', '/solutions'],
      ['Private AI', '/ai-solutions'],
      ['Corporate Culture Intelligence', '/corporate-culture-intelligence'],
      ['Odoo ERP', '/erp-solutions'],
      ['AI + ERP Integration', '/ai-erp'],
      ['Business Automation', '/solutions/business-automation'],
      ['Website Design', '/website-design'],
      ['Equipment', '/equipment'],
    ],
  },
  {
    label: 'Industries',
    links: [
      ['All Industries', '/industries'],
      ['Wholesale Distribution', '/industries/distribution'],
      ['HVAC & Field Service', '/industries/hvac-field-service'],
      ['Construction', '/industries/construction'],
      ['Retail', '/industries/retail'],
      ['Manufacturing', '/industries/manufacturing'],
      ['Professional Services', '/industries/professional-services'],
      ['Restaurant', '/industries/restaurants'],
    ],
  },
  {
    label: 'Resources',
    links: [
      ['All Guides', '/resources'],
      ['Private AI', '/resources/private-ai'],
      ['Odoo ERP', '/resources/odoo-erp'],
      ['AI + ERP', '/resources/ai-erp'],
      ['Comparisons', '/resources/comparisons'],
      ['Business Automation', '/solutions/business-automation'],
      ['Industry Resources', '/industries/distribution'],
      ['Case Studies', '/case-studies'],
      ['How Yudaro Works', '/how-yudaro-works'],
    ],
  },
] as const;

export function MobileNavigation({ signedIn, accountHref }: Props) {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    const trigger = menuButton.current;
    dialog.current?.showModal();
    document.body.style.overflow = 'hidden';
    closeButton.current?.focus();
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', escape);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener('keydown', escape);
      trigger?.focus();
    };
  }, [open]);
  return (
    <>
      <button
        ref={menuButton}
        className="mobile-menu-button"
        type="button"
        aria-label="Open navigation menu"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen(true)}
      >
        <Menu aria-hidden="true" />
      </button>
      {open && (
        <dialog
          ref={dialog}
          className="mobile-menu-backdrop"
          aria-label="Website navigation"
          onCancel={() => setOpen(false)}
        >
          <aside
            id="mobile-navigation"
            className="mobile-menu-drawer"
            aria-label="Mobile navigation"
          >
            <div className="mobile-menu-head">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                aria-label="Yudaro home"
              >
                <Image
                  src="/yudaro-logo-2026.png"
                  alt="Yudaro AI & ERP Systems"
                  width={190}
                  height={95}
                />
              </Link>
              <button
                ref={closeButton}
                type="button"
                aria-label="Close navigation menu"
                onClick={() => setOpen(false)}
              >
                <X aria-hidden="true" />
              </button>
            </div>
            <nav aria-label="Complete website navigation">
              <Link href="/">Home</Link>
              {groups.map((group) => (
                <details key={group.label}>
                  <summary>
                    {group.label}
                    <ChevronDown size={16} />
                  </summary>
                  <div>
                    {group.links.map(([label, href]) => (
                      <Link
                        key={href}
                        href={href}
                        onClick={() => setOpen(false)}
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                </details>
              ))}
              <Link href="/pricing">Pricing</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
            </nav>
            <section className="mobile-member-promo">
              <span>FREE YUDARO BUSINESS TOOLS</span>
              <h2>
                See how ready your business is for AI + ERP and receive your
                personalized recommendations.
              </h2>
              <Link href="/assessment" onClick={() => setOpen(false)}>
                {signedIn
                  ? 'View My Business Assessment'
                  : 'Get My Free AI + ERP Assessment'}
              </Link>
              <small>Free • No credit card required</small>
            </section>
            <section className="mobile-account-controls">
              <b>Account</b>
              {signedIn ? (
                <>
                  <Link href="/account">My Dashboard</Link>
                  <Link href="/account?tool=roadmap">My Roadmap</Link>
                  <Link
                    href="/signout-with-chatgpt?return_to=%2F"
                    target="_top"
                  >
                    Sign Out
                  </Link>
                </>
              ) : (
                <>
                  <Link href={accountHref} target="_top">
                    Sign In
                  </Link>
                  <Link href="/free-account">Create Free Account</Link>
                </>
              )}
            </section>
            <section className="drawer-language">
              <b>Display language</b>
              <LanguageSelector />
            </section>
          </aside>
        </dialog>
      )}
    </>
  );
}
