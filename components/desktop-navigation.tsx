'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  BrainCircuit,
  Boxes,
  Workflow,
  MonitorSmartphone,
  Server,
  Truck,
  Wrench,
  HardHat,
  Store,
  Factory,
  Users,
  UtensilsCrossed,
  ChevronDown,
} from 'lucide-react';
const groups = [
  {
    name: 'Solutions',
    intro: 'Technology that works together.',
    items: [
      [
        'Private AI',
        'Your knowledge, made useful.',
        '/ai-solutions',
        BrainCircuit,
      ],
      ['ERP / Odoo', 'Connect your daily operation.', '/erp-solutions', Boxes],
      ['AI + ERP', 'Turn business data into action.', '/ai-erp', Workflow],
      [
        'Website Design',
        'Your next digital opportunity.',
        '/website-design',
        MonitorSmartphone,
      ],
      ['Equipment', 'Infrastructure for private AI.', '/equipment', Server],
      [
        'Automation',
        'Less repetitive work.',
        '/solutions/business-automation',
        Workflow,
      ],
    ],
  },
  {
    name: 'Industries',
    intro: 'Built around how your business works.',
    items: [
      [
        'Distribution',
        'Inventory to fulfillment.',
        '/industries/distribution',
        Truck,
      ],
      [
        'HVAC & Field Service',
        'Dispatch to service.',
        '/industries/hvac-field-service',
        Wrench,
      ],
      [
        'Construction',
        'Projects to cost visibility.',
        '/industries/construction',
        HardHat,
      ],
      ['Retail', 'Customers to replenishment.', '/industries/retail', Store],
      [
        'Manufacturing',
        'Materials to production.',
        '/industries/manufacturing',
        Factory,
      ],
      [
        'Professional Services',
        'People to projects.',
        '/industries/professional-services',
        Users,
      ],
      [
        'Restaurants',
        'POS to operational insight.',
        '/industries/restaurants',
        UtensilsCrossed,
      ],
    ],
  },
] as const;
export function DesktopNavigation() {
  const [open, setOpen] = useState<string | null>(null);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const close = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(null);
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const button = ref.current?.querySelector<HTMLButtonElement>(
          '[aria-expanded="true"]',
        );
        setOpen(null);
        button?.focus();
      }
    };
    const focus = (e: FocusEvent) => {
      if (
        !ref.current?.contains(e.target as Node) ||
        !(e.target as HTMLElement).closest('.mega-group')
      )
        setOpen(null);
    };
    document.addEventListener('pointerdown', close);
    document.addEventListener('keydown', key);
    document.addEventListener('focusin', focus);
    return () => {
      document.removeEventListener('pointerdown', close);
      document.removeEventListener('keydown', key);
      document.removeEventListener('focusin', focus);
    };
  }, []);
  return (
    <nav
      ref={ref}
      className="desktop-navigation momentum-navigation"
      aria-label="Primary navigation"
    >
      {groups.map((group) => (
        <div className="mega-group" key={group.name}>
          <button
            type="button"
            aria-expanded={open === group.name}
            aria-controls={`nav-${group.name}`}
            onClick={() => setOpen(open === group.name ? null : group.name)}
          >
            {group.name}
            <ChevronDown size={13} />
          </button>
          <div
            className="mega-panel"
            id={`nav-${group.name}`}
            hidden={open !== group.name}
          >
            <div className="mega-intro">
              <span className="section-index">{group.name}</span>
              <strong>{group.intro}</strong>
              <Link
                href={group.name === 'Industries' ? '/industries' : '/ai-erp'}
              >
                Explore {group.name.toLowerCase()} <ArrowUpRight size={16} />
              </Link>
            </div>
            <div className="mega-links">
              {group.items.map(([title, description, href, Icon]) => (
                <Link key={title} href={href} onClick={() => setOpen(null)}>
                  <Icon size={22} />
                  <span>
                    <strong>{title}</strong>
                    <small>{description}</small>
                  </span>
                  <ArrowUpRight size={14} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      ))}
      <Link href="/resources">Resources</Link>
      <Link href="/pricing">Pricing</Link>
      <Link href="/about">About</Link>
    </nav>
  );
}
