import type { EditorialVisual } from '@/lib/editorial-covers';
import styles from './editorial-cover.module.css';

export function EditorialCover({ card }: { card: EditorialVisual }) {
  return (
    <div
      className={[styles.cover, styles[card.tone]].join(' ')}
      aria-hidden="true"
    >
      <span className={styles.coverCategory}>{card.category}</span>
      <span className={styles.coverHeadline}>
        {card.headline.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </span>
      <svg className={styles.geometry} viewBox="0 0 160 160" fill="none">
        {card.tone === 'pilot' ? (
          <>
            <circle cx="92" cy="86" r="60" />
            <circle cx="92" cy="86" r="42" />
            <path d="M18 86h148M92 12v148" />
            <circle className={styles.solid} cx="92" cy="86" r="10" />
          </>
        ) : card.tone === 'migration' ? (
          <>
            <rect x="36" y="24" width="90" height="90" rx="14" />
            <rect x="24" y="38" width="90" height="90" rx="14" />
            <rect
              className={styles.filled}
              x="12"
              y="52"
              width="90"
              height="90"
              rx="14"
            />
            <path d="M34 77h44M34 93h44M34 109h27" />
          </>
        ) : (
          <>
            <rect x="20" y="26" width="120" height="120" rx="12" />
            <path d="M80 26v120M20 86h120" />
            <rect
              className={styles.filled}
              x="32"
              y="38"
              width="36"
              height="36"
              rx="5"
            />
            <rect x="92" y="98" width="36" height="36" rx="5" />
            <path d="M50 74v42h42" />
            <circle className={styles.solid} cx="92" cy="116" r="4" />
          </>
        )}
      </svg>
      <span className={styles.coverBrand}>Yudaro / Field notes</span>
    </div>
  );
}
