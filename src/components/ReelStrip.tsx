/**
 * ReelStrip — horizontal scrollable portrait video strip.
 *
 * Videos: autoplay · muted · loop · playsInline (required for iOS Safari).
 * IntersectionObserver drives play/pause so off-screen videos are paused,
 * conserving CPU/battery and satisfying browser autoplay policies.
 * Lazy-loads the <source> element only when the card enters the viewport
 * (avoids downloading all 6 video files upfront).
 */
import React, { useRef, useEffect, useCallback } from 'react';
import { Film } from '../types';

interface ReelStripProps {
  films: Film[];
  /** Called when a card is tapped/clicked so the full reel viewer can open */
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

  // IntersectionObserver: play when ≥30% visible, pause when leaving
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Lazy-inject the <source> src on first visibility
            if (!loadedRef.current && sourceRef.current && film.src) {
              sourceRef.current.src = film.src;
              video.load();
              loadedRef.current = true;
            }
            // Play with promise to swallow any NotAllowedError gracefully
            const playPromise = video.play();
            if (playPromise !== undefined) {
              playPromise.catch(() => {/* autoplay blocked — silently no-op */});
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
      className="reel-card group relative flex-none w-[52vw] sm:w-[38vw] md:w-[30vw] lg:w-[18vw] xl:w-[16vw] 2xl:w-[15vw]"
      style={{ aspectRatio: '9/16' }}
    >
      {/* Tappable / clickable overlay — opens full reel viewer */}
      <div
        role="button"
        tabIndex={0}
        aria-label={`Watch ${film.title}`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className="absolute inset-0 z-10 cursor-pointer rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C49A88]"
      />

      {/* Video container */}
      <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-[0_4px_24px_rgba(26,24,22,0.10)]">
        {/* Poster shown until video plays */}
        <img
          src={film.poster}
          alt={`Poster for ${film.title}`}
          loading={index === 0 ? 'eager' : 'lazy'}
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />

        {/* Native video — source src injected lazily */}
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
          {/* Gradient fade */}
          <div className="h-28 bg-gradient-to-t from-[#1A1816]/80 via-[#1A1816]/30 to-transparent rounded-b-2xl" />
          {/* Text */}
          <div className="absolute bottom-0 inset-x-0 px-3 pb-3 space-y-0.5">
            <p className="text-[9px] uppercase tracking-[0.28em] text-[#C49A88] font-sans font-medium leading-none">
              {film.kicker}
            </p>
            <p className="text-[11px] uppercase tracking-[0.14em] text-white font-sans font-medium leading-tight line-clamp-2">
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

  // Keyboard arrow-key scroll for the strip (accessibility)
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      el.scrollBy({ left: 220, behavior: 'smooth' });
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      el.scrollBy({ left: -220, behavior: 'smooth' });
    }
  }, []);

  // Structured data — VideoObject list (GEO / SEO)
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'FUME Fragrances — Real Customer Films',
    description: 'Authentic unboxing, review, and lifestyle videos showcasing FUME luxury fragrances — handcrafted in Grasse, Pakistan-priced.',
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
      className="w-full overflow-hidden bg-[#F9F6F0] py-10 sm:py-14"
    >
      {/* Section header */}
      <div className="px-5 sm:px-8 lg:px-16 mb-6 sm:mb-8 flex items-end justify-between gap-4">
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-[0.38em] text-[#C49A88] font-sans font-medium">
            Real Stories
          </p>
          <h2
            id="reel-strip-heading"
            className="font-serif text-2xl sm:text-3xl uppercase tracking-[0.12em] text-[#1A1816] font-normal"
          >
            Seen on Film
          </h2>
        </div>
        <p className="hidden sm:block text-xs font-sans text-[#7D766E] tracking-wide max-w-[260px] text-right leading-relaxed">
          Authentic client reviews and unboxing stories from across Pakistan.
        </p>
      </div>

      {/* Scrollable reel row */}
      <div
        ref={scrollRef}
        role="list"
        aria-label="FUME fragrance films — scroll horizontally to browse"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="flex gap-3 sm:gap-4 lg:gap-5 overflow-x-auto px-5 sm:px-8 lg:px-16 pb-4 scroll-smooth snap-x snap-mandatory
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

      {/* Scroll hint dots — mobile only */}
      <div
        className="flex sm:hidden justify-center gap-1.5 mt-4"
        aria-hidden="true"
      >
        {films.map((_, i) => (
          <span
            key={i}
            className={`block rounded-full transition-all duration-300 ${
              i === 0 ? 'w-4 h-1 bg-[#C49A88]' : 'w-1 h-1 bg-[#D6C7B2]'
            }`}
          />
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
