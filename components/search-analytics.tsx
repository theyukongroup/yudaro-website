'use client';
import Link from 'next/link';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import { trackSearchEvent } from '@/lib/search-analytics';
const rawId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';
const measurementId = /^G-[A-Z0-9]+$/.test(rawId) ? rawId : '';
type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};
function optedIn() {
  try {
    return (
      localStorage.getItem('yudaro-analytics-consent') === 'granted' &&
      navigator.doNotTrack !== '1' &&
      !(navigator as Navigator & { globalPrivacyControl?: boolean })
        .globalPrivacyControl
    );
  } catch {
    return false;
  }
}
function subscribeConsent(callback: () => void) {
  window.addEventListener('yudaro:consent', callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener('yudaro:consent', callback);
    window.removeEventListener('storage', callback);
  };
}
export function SearchAnalytics() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const consent = useSyncExternalStore(subscribeConsent, optedIn, () => false);
  useEffect(() => {
    const click = (e: MouseEvent) => {
      const a = (e.target as Element)?.closest?.('a[href]');
      if (!a) return;
      const href = a.getAttribute('href') || '';
      if (href.startsWith('tel:')) trackSearchEvent('phone_clicked');
      else if (href.startsWith('mailto:')) trackSearchEvent('email_clicked');
      else if (href.startsWith('/contact'))
        trackSearchEvent('consultation_clicked');
    };
    document.addEventListener('click', click);
    return () => document.removeEventListener('click', click);
  }, []);
  useEffect(() => {
    if (!measurementId || !consent || !optedIn()) return;
    const w = window as AnalyticsWindow;
    w.dataLayer ||= [];
    w.gtag ||= (...args: unknown[]) => {
      w.dataLayer!.push(args);
    };
    w.gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
    if (!document.getElementById('yudaro-ga')) {
      const s = document.createElement('script');
      s.id = 'yudaro-ga';
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.head.appendChild(s);
      w.gtag('js', new Date());
    }
    w.gtag('config', measurementId, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
    const receive = (event: Event) => {
      if (!optedIn()) return;
      const detail = (event as CustomEvent<{ event: string; path: string }>)
        .detail;
      w.gtag?.('event', detail.event, {
        page_location: window.location.origin + detail.path,
        page_path: detail.path,
      });
    };
    window.addEventListener('yudaro:conversion', receive);
    return () => window.removeEventListener('yudaro:conversion', receive);
  }, [consent]);
  useEffect(() => {
    if (!measurementId || !consent || !optedIn()) return;
    const w = window as AnalyticsWindow;
    w.gtag?.('event', 'page_view', {
      page_location: window.location.origin + pathname,
      page_path: pathname,
      page_title: document.title,
    });
    if (pathname === '/pricing') trackSearchEvent('pricing_viewed');
    if (pathname === '/case-studies') trackSearchEvent('case_study_viewed');
  }, [pathname, consent]);
  function choose(granted: boolean) {
    try {
      localStorage.setItem(
        'yudaro-analytics-consent',
        granted ? 'granted' : 'denied',
      );
    } catch {}
    window.dispatchEvent(new Event('yudaro:consent'));
    setOpen(false);
    if (!granted) {
      (window as AnalyticsWindow).gtag?.('consent', 'update', {
        analytics_storage: 'denied',
      });
      window.location.reload();
    }
  }
  if (!measurementId) return null;
  return (
    <div className="analytics-preferences" data-no-translate>
      <button type="button" aria-expanded={open} onClick={() => setOpen(!open)}>
        Analytics preferences
      </button>
      {open && (
        <section aria-label="Optional analytics">
          <h2>Optional website analytics</h2>
          <p>
            Allow Google Analytics to measure page visits and actions. We do not
            send form details, assessment results or query parameters. Declining
            does not affect business tools. Browser privacy signals take
            precedence.
          </p>
          <button type="button" onClick={() => choose(true)}>
            Allow analytics
          </button>
          <button type="button" onClick={() => choose(false)}>
            Decline analytics
          </button>
          <Link prefetch={false} href="/privacy">
            Privacy information
          </Link>
        </section>
      )}
    </div>
  );
}
