/**
 * ReelStrip — horizontal scrollable portrait video strip.
 *
 * Videos: autoplay · muted · loop · playsInline (required for iOS Safari).
 * IntersectionObserver drives play/pause so off-screen videos are paused,
 * conserving CPU/battery and satisfying browser autoplay policies.
 * Lazy-loads the <source> element only when the card enters the viewport.
 */
import React, { useRef, useEffect, useCallback } from 'react';
import { Film } from '../types';

interface ReelStripProps {
  films: Film[];
  onOpenReel?: (film: Film) => void;
}

interface ReelCardProps {
  film: Film;
  index: number;
  onOpenReel?: (film: Film) => void;
}

const ReelCard: React.FC<ReelCardProps> = ({ film, index, onOpenReel }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sourceRef = useRef<HTMLSourceElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!loadedRef.current && sourceRef.current && film.src) {
              sourceRef.current.src = film.src;
              video.load();
              loadedRef.current = true;
            }
            const playPromise = video.play();
            if (playPromise !== undefined) {
              playPromise.catch(() => {});
            }
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [film.src]);

  const handleClick = useCallback(() => {
    if (onOpenReel) onOpenReel(film);
  }, [film, onOpenReel]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (onOpenReel) onOpenReel(film);
    }
  }, [film, onOpenReel]);

  return (
    <article
      ref={containerRef}
      aria-label={`${film.title} — ${film.kicker}`}
      className="reel-card group relative flex-none w-[75vw] sm:w-[40vw] md:w-[30vw] lg:w-[18vw] xl:w-[16vw]"
      style={{ aspectRatio: '9/16' }}
    >
      {/* Tappable overlay */}
      <div
        role="button"
        tabIndex={0}
        aria-label={`Watch ${film.title}`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className="absolute inset-0 z-10 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dusty-rose"
      />

      {/* Video container with Crystal Vitrine & Liquid Glass indicator */}
      <div className="relative w-full h-full overflow-hidden border border-shadow/10 shadow-[0_12px_28px_-8px_rgba(10,10,10,0.12)] crystal-vitrine group-hover:border-dusty-rose/40 transition-colors duration-500">
        {/* Watch Film Glass Pill Indicator */}
        <div className="absolute top-3 right-3 z-20 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur-md border border-white/20 text-white text-[8px] uppercase tracking-[0.25em] font-sans font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A59A] animate-pulse" />
            FILM
          </span>
        </div>

        {/* Poster shown until video plays */}
        <img
          src={film.poster}
          alt={`Poster for ${film.title}`}
          loading={index === 0 ? 'eager' : 'lazy'}
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />

        {/* Native video */}
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          autoPlay
          preload="none"
          aria-label={film.title}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 opacity-0 group-[.playing]:opacity-100"
          onCanPlay={(e) => {
            (e.currentTarget as HTMLVideoElement).classList.add('opacity-100');
            (e.currentTarget as HTMLVideoElement).classList.remove('opacity-0');
          }}
        >
          <source ref={sourceRef} type="video/mp4" />
        </video>

        {/* Bottom gradient + meta overlay */}
        <div
          className="absolute inset-x-0 bottom-0 z-20 pointer-events-none"
          aria-hidden="true"
        >
          <div className="h-28 bg-gradient-to-t from-shadow/90 via-shadow/40 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 px-3.5 pb-3.5 space-y-1">
            <p className="text-[9px] uppercase tracking-[0.3em] text-[#D4A59A] drop-shadow-md font-sans font-medium leading-none">
              {film.kicker}
            </p>
            <p className="text-[11px] uppercase tracking-[0.16em] text-white font-sans font-medium drop-shadow-md leading-tight line-clamp-2">
              {film.productName}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export const ReelStrip: React.FC<ReelStripProps> = ({ films, onOpenReel }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      el.scrollBy({ left: 240, behavior: 'smooth' });
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      el.scrollBy({ left: -240, behavior: 'smooth' });
    }
  }, []);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'FUME Fragrances — Real Customer Films',
    description: 'Authentic unboxing, review, and lifestyle videos showcasing FUME fragrances — handcrafted in Pakistan with premium ingredients.',
    numberOfItems: films.length,
    itemListElement: films.map((film, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'VideoObject',
        name: film.title,
        description: film.blurb ?? film.title,
        thumbnailUrl: film.poster,
        contentUrl: film.src,
        uploadDate: '2024-01-01',
      },
    })),
  };

  return (
    <section
      aria-labelledby="reel-strip-heading"
      className="w-full overflow-hidden bg-pearl border-t border-shadow/[0.06] py-14 sm:py-20"
    >
      {/* Section header */}
      <div className="px-5 sm:px-8 lg:px-16 mb-8 sm:mb-10 flex items-end justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A59A]" />
            <p className="text-[10px] uppercase tracking-[0.4em] text-dusty-rose font-sans font-semibold">
              CINEMATIC ARCHIVE
            </p>
          </div>
          <h2
            id="reel-strip-heading"
            className="font-serif text-2xl sm:text-3xl md:text-4xl uppercase tracking-[0.14em] text-shadow font-normal"
          >
            Seen on Film
          </h2>
        </div>
        <p className="hidden sm:block text-xs font-sans text-shadow/80 tracking-wide max-w-[280px] text-right leading-relaxed font-light">
          Authentic client reviews, packaging unboxings, and editorial captures from across Pakistan.
        </p>
      </div>

      {/* Scrollable reel row */}
      <div
        ref={scrollRef}
        role="list"
        aria-label="FUME fragrance films — scroll horizontally to browse"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="flex gap-4 sm:gap-6 lg:gap-8 overflow-x-auto px-6 sm:px-10 lg:px-16 pb-6 scroll-smooth snap-x snap-mandatory
                   [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
                   focus-visible:outline-none"
        style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
      >
        {films.map((film, i) => (
          <div key={film.id} role="listitem" className="snap-start">
            <ReelCard film={film} index={i} onOpenReel={onOpenReel} />
          </div>
        ))}
      </div>

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </section>
  );
};
