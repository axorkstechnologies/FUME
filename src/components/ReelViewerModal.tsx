import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X, Volume2, VolumeX, ChevronLeft, ChevronRight, Play, Pause, ShoppingBag } from 'lucide-react';
import { Film, Fragrance, ThemeMode } from '../types';
import { resetScrollLock } from '../utils/scrollLock';
import { formatPrice } from '../utils/pricing';

export interface ReelViewerModalProps {
  isOpen: boolean;
  films: Film[];
  initialFilmId?: string;
  fragrances: Fragrance[];
  onClose: () => void;
  onSelectFragrance: (fragrance: Fragrance) => void;
  themeMode: ThemeMode;
}

export const ReelViewerModal: React.FC<ReelViewerModalProps> = ({
  isOpen,
  films,
  initialFilmId,
  fragrances,
  onClose,
  onSelectFragrance,
  themeMode
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const touchStartY = useRef<number | null>(null);

  // Sync initial index
  useEffect(() => {
    if (initialFilmId) {
      const idx = films.findIndex((f) => f.id === initialFilmId);
      if (idx !== -1) setCurrentIndex(idx);
    }
  }, [initialFilmId, films]);

  // Lock scroll on open and restore on close
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';
    document.body.classList.add('overlay-open');

    return () => {
      resetScrollLock();
    };
  }, [isOpen]);

  const activeFilm = films[currentIndex] || films[0];
  const matchingFragrance = activeFilm?.productId
    ? fragrances.find((f) => f.id.toLowerCase() === activeFilm.productId?.toLowerCase())
    : null;

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % films.length);
    setIsPlaying(true);
  }, [films.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + films.length) % films.length);
    setIsPlaying(true);
  }, [films.length]);

  // Keyboard navigation (Escape, ArrowUp, ArrowDown, ArrowLeft, ArrowRight)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === ' ') {
        e.preventDefault();
        const v = videoRef.current;
        if (v) {
          if (v.paused) {
            v.play();
            setIsPlaying(true);
          } else {
            v.pause();
            setIsPlaying(false);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleNext, handlePrev, onClose]);

  // Touch swipe support (Up/Down or Left/Right)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const diff = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext(); // swipe up -> next reel
      } else {
        handlePrev(); // swipe down -> prev reel
      }
    }
    touchStartY.current = null;
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    const next = !v.muted;
    v.muted = next;
    setIsMuted(next);
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setProgress((v.currentTime / v.duration) * 100);
  };

  if (!isOpen || !activeFilm) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[1100] flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Top Bar: Close button & Reel count */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-3 pointer-events-auto">
        <span className="text-[10px] uppercase tracking-[0.25em] font-sans text-white/70 bg-black/50 px-3 py-1.5 rounded-full border border-white/10 hidden sm:inline-block">
          REEL {currentIndex + 1} OF {films.length}
        </span>
        <button
          type="button"
          aria-label="Close Reel Viewer"
          onClick={onClose}
          className="w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white hover:text-[#C5A059] flex items-center justify-center border border-white/20 transition-all cursor-pointer shadow-2xl"
        >
          <X className="w-5 h-5" strokeWidth={1.5} />
        </button>
      </div>

      {/* Navigation Arrow Left */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
        aria-label="Previous film"
        className="hidden md:flex absolute left-6 lg:left-12 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-black/50 hover:bg-black text-white hover:text-[#C5A059] items-center justify-center border border-white/15 transition-all cursor-pointer"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Navigation Arrow Right */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        aria-label="Next film"
        className="hidden md:flex absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-black/50 hover:bg-black text-white hover:text-[#C5A059] items-center justify-center border border-white/15 transition-all cursor-pointer"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main 9:16 Vertical Reel Stage */}
      <div
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative w-full max-w-[440px] h-[92dvh] max-h-[860px] aspect-[9/16] bg-black rounded-xs overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.95)] border border-white/15 flex flex-col justify-between select-none"
      >
        {/* Active Video Element */}
        <video
          key={activeFilm.id}
          ref={videoRef}
          src={activeFilm.src}
          poster={activeFilm.poster}
          loop={activeFilm.loop}
          muted={isMuted}
          playsInline
          autoPlay
          onTimeUpdate={handleTimeUpdate}
          onClick={togglePlay}
          className="absolute inset-0 w-full h-full object-cover object-center cursor-pointer"
        />

        {/* Ambient Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/50 pointer-events-none" />

        {/* Top Header Controls within Reel */}
        <div className="relative z-20 p-4 flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-2">
            <span className="text-[9px] uppercase tracking-[0.3em] font-sans font-medium text-[#C5A059] bg-black/60 px-2.5 py-1 rounded-xs border border-[#C5A059]/40 backdrop-blur-md">
              {activeFilm.kicker}
            </span>
            <span className="text-[9px] tracking-widest font-sans text-white/80 bg-black/40 px-2 py-1 rounded-xs border border-white/10">
              {activeFilm.duration}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Toggle */}
            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
              className="w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white hover:text-[#C5A059] flex items-center justify-center border border-white/15 transition-all cursor-pointer backdrop-blur-md"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-[#C5A059]" />
              ) : (
                <Volume2 className="w-4 h-4 text-white animate-pulse" />
              )}
            </button>
          </div>
        </div>

        {/* Center Play indicator on Pause */}
        <div
          onClick={togglePlay}
          className={`absolute inset-0 z-10 flex items-center justify-center transition-opacity cursor-pointer ${
            !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="w-16 h-16 rounded-full bg-black/75 backdrop-blur-md border border-[#C5A059]/70 flex items-center justify-center text-[#C5A059] shadow-2xl">
            <Play className="w-7 h-7 fill-current ml-1" />
          </div>
        </div>

        {/* Bottom Editorial Card & Product Action */}
        <div className="relative z-20 p-4 sm:p-5 flex flex-col space-y-3 pointer-events-auto">
          {/* Author info */}
          {activeFilm.author && (
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
              <span className="text-[10px] uppercase tracking-[0.25em] font-sans text-[#C5A059] font-medium">
                {activeFilm.author} • {activeFilm.authorRole}
              </span>
            </div>
          )}

          {/* Title */}
          <h3 className="font-serif text-lg sm:text-xl uppercase tracking-[0.14em] text-white">
            {activeFilm.title}
          </h3>

          {/* Blurb */}
          <p className="text-xs text-[#FAF8F5]/90 font-sans font-light leading-relaxed drop-shadow-md">
            {activeFilm.blurb}
          </p>

          {/* Product Quick-View CTA */}
          {matchingFragrance && (
            <div className="pt-2 border-t border-white/15 flex items-center justify-between gap-3 bg-black/50 backdrop-blur-md p-3 rounded-xs border">
              <div>
                <span className="text-[8px] uppercase tracking-[0.25em] text-[#C5A059] block font-sans">
                  FEATURED FLACON
                </span>
                <span className="font-serif text-sm uppercase tracking-[0.15em] text-white font-medium">
                  {matchingFragrance.name}
                </span>
                <span className="text-[10px] font-sans text-[#FAF8F5]/80 block">
                  {formatPrice(matchingFragrance.price)}
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  onSelectFragrance(matchingFragrance);
                  onClose();
                }}
                className="px-4 py-2 bg-[#C5A059] hover:bg-[#D4BA7A] text-black text-[10px] uppercase tracking-[0.22em] font-sans font-medium transition-colors cursor-pointer flex items-center gap-1.5 rounded-xs"
              >
                <span>VIEW FLACON</span>
                <ShoppingBag className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {/* Bottom Hairline Timeline Scrubber */}
        <div className="relative z-30 h-1 bg-white/20">
          <div
            className="h-full bg-[#C5A059] transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>,
    document.body
  );
};
