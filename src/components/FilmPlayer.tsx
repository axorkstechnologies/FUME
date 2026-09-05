import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import { Film, ThemeMode } from '../types';

export interface FilmPlayerProps {
  film: Film;
  className?: string;
  aspectRatio?: '9/16' | 'auto' | 'square';
  showControls?: boolean;
  showOverlayInfo?: boolean;
  autoPlayInView?: boolean;
  playOnHover?: boolean;
  initialMuted?: boolean;
  onOpenReel?: (film: Film) => void;
  onProductClick?: (productId: string) => void;
  themeMode?: ThemeMode;
}

export const FilmPlayer: React.FC<FilmPlayerProps> = ({
  film,
  className = '',
  aspectRatio = '9/16',
  showControls = true,
  showOverlayInfo = true,
  autoPlayInView = true,
  playOnHover = false,
  initialMuted = true,
  onOpenReel,
  onProductClick,
  themeMode = 'light'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(initialMuted);
  const [progress, setProgress] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const isLight = themeMode === 'light';

  // IntersectionObserver for in-view autoPlay
  useEffect(() => {
    if (!autoPlayInView) return;

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = videoRef.current;
          if (!video) return;

          if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
            video.muted = isMuted;
            video
              .play()
              .then(() => setIsPlaying(true))
              .catch(() => {
                // Auto-play was prevented by browser policy, keep paused or try muted
                video.muted = true;
                setIsMuted(true);
                video.play().then(() => setIsPlaying(true)).catch(() => {});
              });
          } else {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: [0.1, 0.4, 0.8] }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [autoPlayInView, isMuted]);

  const togglePlay = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      const video = videoRef.current;
      if (!video) return;

      setHasInteracted(true);
      if (video.paused) {
        video.play().then(() => setIsPlaying(true)).catch(() => {});
      } else {
        video.pause();
        setIsPlaying(false);
      }
    },
    []
  );

  const toggleMute = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    setHasInteracted(true);
    const next = !video.muted;
    video.muted = next;
    setIsMuted(next);
  }, []);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    setProgress((video.currentTime / video.duration) * 100);
  };

  const handleMouseEnter = () => {
    if (!playOnHover) return;
    const video = videoRef.current;
    if (!video || isPlaying) return;
    video.muted = isMuted;
    video.play().then(() => setIsPlaying(true)).catch(() => {});
  };

  const handleMouseLeave = () => {
    if (!playOnHover) return;
    const video = videoRef.current;
    if (!video || !isPlaying) return;
    video.pause();
    setIsPlaying(false);
  };

  const aspectClass =
    aspectRatio === '9/16'
      ? 'aspect-[9/16]'
      : aspectRatio === 'square'
      ? 'aspect-square'
      : 'aspect-auto h-full';

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        if (onOpenReel) {
          onOpenReel(film);
        } else {
          togglePlay();
        }
      }}
      className={`group relative overflow-hidden select-none cursor-pointer bg-[#0A0A0A] ${aspectClass} ${className}`}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={film.src}
        poster={film.poster}
        loop={film.loop}
        muted={isMuted}
        playsInline
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedData={() => setIsLoaded(true)}
        className="w-full h-full object-cover object-center pointer-events-none transition-transform duration-700 ease-out group-hover:scale-[1.02]"
      />

      {/* Ambient Vignette Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/35 pointer-events-none" />

      {/* Subtle Hairline Luxury Gold Border on Hover */}
      <div className="absolute inset-0 border border-transparent group-hover:border-[#C5A059]/40 transition-colors duration-500 pointer-events-none" />

      {/* Top Header Bar: Kicker, Duration & Sound Control */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-auto">
        <div className="flex items-center gap-2">
          <span className="text-[9px] uppercase tracking-[0.25em] font-sans font-medium text-[#C5A059] bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-xs border border-[#C5A059]/30">
            {film.kicker}
          </span>
          <span className="text-[9px] tracking-widest font-sans text-[#FAF8F5]/80 bg-black/40 backdrop-blur-xs px-2 py-1 rounded-xs border border-white/10 hidden sm:inline-block">
            {film.duration}
          </span>
        </div>

        {/* Audio Toggle Button */}
        {showControls && (
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
            className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md flex items-center justify-center text-white hover:text-[#C5A059] transition-all border border-white/15 hover:border-[#C5A059]/60 cursor-pointer shadow-lg"
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-[#C5A059]" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-white animate-pulse" />
            )}
          </button>
        )}
      </div>

      {/* Center Floating Play / Pause Indicator (shows when paused or on hover) */}
      <div
        className={`absolute inset-0 flex items-center justify-center z-10 transition-opacity duration-300 pointer-events-none ${
          !isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
        }`}
      >
        <div className="w-12 h-12 rounded-full bg-black/65 backdrop-blur-md border border-[#C5A059]/50 flex items-center justify-center text-[#C5A059] shadow-2xl transition-transform duration-300 group-hover:scale-110">
          {isPlaying ? (
            <Pause className="w-5 h-5 fill-current" />
          ) : (
            <Play className="w-5 h-5 fill-current ml-0.5" />
          )}
        </div>
      </div>

      {/* Bottom Information Card & Interactive Product Tag */}
      {showOverlayInfo && (
        <div className="absolute bottom-0 inset-x-0 p-3.5 sm:p-4 z-20 flex flex-col justify-end space-y-2 pointer-events-auto">
          {/* Quote / Blurb */}
          <p className="text-[11px] sm:text-xs text-[#FAF8F5] font-sans font-light leading-snug line-clamp-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            {film.blurb}
          </p>

          {/* Title & Product / Expand actions */}
          <div className="flex items-center justify-between pt-1 gap-2 border-t border-white/15">
            <div className="min-w-0 flex-1">
              <h4 className="font-serif text-xs uppercase tracking-[0.16em] text-white truncate drop-shadow-md">
                {film.title}
              </h4>
              {film.author && (
                <span className="text-[9px] uppercase tracking-[0.2em] font-sans text-[#C5A059] block">
                  {film.author} • {film.authorRole || 'Reviewer'}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              {film.productId && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onProductClick && film.productId) {
                      onProductClick(film.productId);
                    }
                  }}
                  className="px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] font-sans text-white bg-[#C5A059]/25 hover:bg-[#C5A059] hover:text-black border border-[#C5A059]/60 rounded-xs transition-all cursor-pointer font-medium"
                >
                  SHOP {film.productName || 'SCENT'}
                </button>
              )}

              {onOpenReel && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenReel(film);
                  }}
                  aria-label="Expand reel"
                  className="p-1.5 rounded-full bg-black/50 hover:bg-black text-white hover:text-[#C5A059] transition-colors border border-white/10"
                >
                  <Maximize2 className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Progress Bar Timeline at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/20 z-30">
        <div
          className="h-full bg-[#C5A059] transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
