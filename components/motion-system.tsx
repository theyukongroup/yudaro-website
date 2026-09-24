'use client';

import { LazyMotion, MotionConfig, useReducedMotion } from 'motion/react';
import * as m from 'motion/react-m';
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import { usePathname } from 'next/navigation';
import { Pause, Play } from 'lucide-react';
const PausedContext = createContext(false);
const features = () =>
  import('./motion-features').then((module) => module.default);

const subscribeMotion = (callback: () => void) => {
  const query = window.matchMedia('(prefers-reduced-motion: reduce)');
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
};
const motionSnapshot = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const serverMotionSnapshot = () => false;

export function MotionSystem({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduced = useSyncExternalStore(
    subscribeMotion,
    motionSnapshot,
    serverMotionSnapshot,
  );
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    document.documentElement.dataset.motion = paused || reduced ? 'off' : 'on';
    return () => {
      delete document.documentElement.dataset.motion;
    };
  }, [paused, reduced]);
  useEffect(() => {
    const header = document.querySelector('.site-header');
    const onScroll = () =>
      header?.classList.toggle('is-scrolled', window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.classList.toggle('in-view', entry.isIntersecting);
          if (entry.isIntersecting) entry.target.classList.add('revealed');
        }
      },
      { threshold: 0.12 },
    );
    const elements = document.querySelectorAll(
      '[data-flow], .kinetic-words, .section-head, .detail-grid article, .problem-grid article, .about-principle, .industry-story-card, .process-track > div',
    );
    elements.forEach((element, i) => {
      (element as HTMLElement).style.setProperty(
        '--reveal-delay',
        `${(i % 3) * 65}ms`,
      );
      element.classList.add('motion-observed');
      observer.observe(element);
    });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [pathname]);
  return (
    <LazyMotion features={features} strict>
      <MotionConfig reducedMotion="user">
        <PausedContext.Provider value={paused}>
          {children}
          <button
            type="button"
            className="motion-toggle"
            onClick={() => setPaused(!paused)}
            aria-pressed={paused || Boolean(reduced)}
            disabled={Boolean(reduced)}
            aria-label={
              reduced
                ? 'Reduced motion enabled by your device'
                : paused
                  ? 'Resume motion'
                  : 'Pause motion'
            }
          >
            {paused || reduced ? <Play size={14} /> : <Pause size={14} />}
            <span>
              {reduced
                ? 'Reduced motion'
                : paused
                  ? 'Resume motion'
                  : 'Pause motion'}
            </span>
          </button>
        </PausedContext.Provider>
      </MotionConfig>
    </LazyMotion>
  );
}

export function StepTransition({
  children,
  step,
}: {
  children: ReactNode;
  step: string | number;
}) {
  const preference = useReducedMotion();
  const paused = useContext(PausedContext);
  const reduced = preference || paused;
  return (
    <m.div
      key={step}
      className="step-transition"
      initial={false}
      animate={
        reduced ? { opacity: 1, y: 0 } : { opacity: [0.75, 1], y: [8, 0] }
      }
      transition={{ duration: reduced ? 0 : 0.22 }}
    >
      {children}
    </m.div>
  );
}

export function MagneticLink({
  children,
  href,
  className = 'button primary',
}: {
  children: ReactNode;
  href: string;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reset = () => {
    ref.current?.style.setProperty('--mx', '0px');
    ref.current?.style.setProperty('--my', '0px');
  };
  return (
    <a
      ref={ref}
      className={`${className} magnetic-link`}
      href={href}
      onPointerMove={(event) => {
        if (
          event.pointerType !== 'mouse' ||
          !matchMedia(
            '(hover: hover) and (prefers-reduced-motion: no-preference)',
          ).matches ||
          document.documentElement.dataset.motion === 'off'
        )
          return;
        const box = event.currentTarget.getBoundingClientRect();
        ref.current?.style.setProperty(
          '--mx',
          `${((event.clientX - box.left) / box.width - 0.5) * 5}px`,
        );
        ref.current?.style.setProperty(
          '--my',
          `${((event.clientY - box.top) / box.height - 0.5) * 5}px`,
        );
      }}
      onPointerLeave={reset}
      onBlur={reset}
    >
      {children}
    </a>
  );
}
