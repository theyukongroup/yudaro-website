import Image from 'next/image';

type Screenshot = { src: string; alt: string; title: string; description: string; width?: number; height?: number };

export function ScreenshotGallery({ eyebrow, title, intro, screenshots }: { eyebrow: string; title: string; intro: string; screenshots: Screenshot[] }) {
  const headingId = `${eyebrow.toLowerCase().replaceAll(' ', '-')}-title`;
  return <section className="showcase section-shell" aria-labelledby={headingId}>
    <div className="section-head"><span className="section-index">{eyebrow}</span><h2 id={headingId}>{title}</h2><p>{intro}</p></div>
    <div className="showcase-grid">{screenshots.map((shot,index)=><figure className={index===0?'showcase-card featured':'showcase-card'} key={shot.src} style={shot.width ? { gridColumn: '1 / -1' } : undefined}>
      <a style={shot.width && shot.height ? { aspectRatio: `${shot.width} / ${shot.height}`, height: 'auto', background: '#fff' } : undefined} href={shot.src} target="_blank" rel="noreferrer" aria-label={`Open full-size ${shot.title} screenshot`}><Image src={shot.src} alt={shot.alt} fill sizes={shot.width || index === 0 ? '(max-width: 1600px) 100vw, 1536px' : '(max-width: 640px) 100vw, 50vw'} priority={index===0}/></a>
      <figcaption><span>{String(index+1).padStart(2,'0')}</span><div><h3>{shot.title}</h3><p>{shot.description}</p></div></figcaption>
    </figure>)}</div>
  </section>;
}
