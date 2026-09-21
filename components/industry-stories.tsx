'use client';

import Image from 'next/image';
import { ArrowUpRight, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export type IndustryStory = {
  industry: string;
  industrySubtitle: string;
  image: { src: string; alt: string };
  storytellerRole: string;
  companyType: string;
  shortQuote: string;
  fullStory: string[];
  solutionsUsed: string[];
  cta: string;
};

export function IndustryStories({ stories }: { stories: IndustryStory[] }) {
  const [active, setActive] = useState<IndustryStory | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!active) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.showModal();
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActive(null);
      if (event.key === 'Tab') {
        const items = dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not(:disabled)',
        );
        const first = items?.[0];
        const last = items?.[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      triggerRef.current?.focus();
    };
  }, [active]);

  const openStory = (story: IndustryStory, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setActive(story);
  };
  const industryFlows: Record<string, string> = {
    'Wholesale & Distribution': 'Order → Inventory → Fulfillment',
    'HVAC & Field Service': 'Dispatch → Service → Follow-up',
    Construction: 'Project → Procurement → Cost',
    Retail: 'Customer → POS → Reorder',
    Manufacturing: 'Materials → Production → Quality',
    'Service Companies': 'People → Projects → Billing',
    Restaurants: 'POS → Kitchen → Inventory',
  };
  const guideLinks: Record<string, string> = {
    'Wholesale & Distribution': '/resources/industries/wholesale-distribution',
    'HVAC & Field Service': '/resources/industries/hvac-field-service',
    Construction: '/resources/industries/construction',
    Retail: '/resources/industries/retail',
    Manufacturing: '/resources/industries/manufacturing',
    'Service Companies': '/resources/industries/professional-services',
    Restaurants: '/industries/restaurants',
  };

  return (
    <>
      <section
        className="industry-stories section-shell"
        aria-label="Industry client stories"
      >
        <div className="industry-story-grid">
          {stories.map((story, index) => (
            <button
              className="industry-story-card"
              key={story.industry}
              type="button"
              onClick={(event) => openStory(story, event.currentTarget)}
              aria-haspopup="dialog"
            >
              <Image
                src={story.image.src}
                alt={story.image.alt}
                fill
                sizes="(max-width: 700px) 100vw, 50vw"
                priority={index < 2}
              />
              <span className="industry-story-shade" aria-hidden="true" />
              <span className="industry-story-copy">
                <span className="industry-story-kicker">
                  {story.storytellerRole} · {story.companyType}
                </span>
                <strong>{story.industry}</strong>
                <span className="industry-flow-label">
                  {industryFlows[story.industry]}
                </span>
                <span className="industry-story-subtitle">
                  {story.industrySubtitle}
                </span>
                <q>{story.shortQuote}</q>
                <span className="industry-story-link">
                  Read Their Story <ArrowUpRight size={17} />
                </span>
              </span>
            </button>
          ))}
        </div>
      </section>
      {active && (
        <dialog
          ref={dialogRef}
          className="story-modal-backdrop"
          aria-labelledby="story-modal-title"
          onCancel={() => setActive(null)}
        >
          <article className="story-modal">
            <button
              ref={closeRef}
              className="story-modal-close"
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close client story"
            >
              <X size={22} />
            </button>
            <div className="story-modal-image">
              <Image
                src={active.image.src}
                alt={active.image.alt}
                fill
                sizes="(max-width: 800px) 100vw, 42vw"
              />
              <span aria-hidden="true" />
              <div>
                <small>
                  {active.storytellerRole} · {active.companyType}
                </small>
                <h2 id="story-modal-title">{active.industry}</h2>
                <p>{active.industrySubtitle}</p>
              </div>
            </div>
            <div className="story-modal-content">
              <q>{active.shortQuote}</q>
              <div className="story-modal-narrative">
                {active.fullStory.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <p className="story-confidentiality">
                For privacy protection, company and individual name has been
                blocked intentionaly
              </p>
              <div className="story-solutions">
                <span>Yudaro Solutions Used</span>
                <ul>
                  {active.solutionsUsed.map((solution) => (
                    <li key={solution}>{solution}</li>
                  ))}
                </ul>
              </div>
              <div className="story-modal-footer">
                <a className="text-link" href={guideLinks[active.industry]}>
                  Read the practical industry guide <ArrowUpRight size={16} />
                </a>
                <a className="button primary" href={active.cta}>
                  Talk to Yudaro About Your Workflow <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </article>
        </dialog>
      )}
    </>
  );
}
