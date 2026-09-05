import React, { useState, useMemo } from 'react';
import { Film, Fragrance, ThemeMode, FilmKind } from '../types';
import { FilmPlayer } from './FilmPlayer';
import { Play, Sparkles, ChevronRight } from 'lucide-react';

interface FilmsSectionProps {
  films: Film[];
  fragrances: Fragrance[];
  onSelectFragrance: (fragrance: Fragrance) => void;
  onOpenReel: (film: Film) => void;
  onViewAllPerfumes?: () => void;
  themeMode: ThemeMode;
}

export const FilmsSection: React.FC<FilmsSectionProps> = ({
  films,
  fragrances,
  onSelectFragrance,
  onOpenReel,
  onViewAllPerfumes,
  themeMode
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'REVIEWS' | 'FLACONS' | 'MAISON'>('ALL');
  const isLight = themeMode === 'light';

  const filteredFilms = useMemo(() => {
    if (selectedFilter === 'REVIEWS') return films.filter((f) => f.kind === 'review');
    if (selectedFilter === 'FLACONS') return films.filter((f) => f.kind === 'lifestyle');
    if (selectedFilter === 'MAISON') return films.filter((f) => f.kind === 'house');
    return films;
  }, [films, selectedFilter]);

  const handleProductClick = (productId: string) => {
    const match = fragrances.find((f) => f.id.toLowerCase() === productId.toLowerCase());
    if (match) {
      onSelectFragrance(match);
    }
  };

  return (
    <section
      id="films-section"
      className={`relative w-full py-24 md:py-32 px-5 sm:px-8 md:px-12 lg:px-16 transition-colors duration-500 border-t ${
        isLight
          ? 'bg-[#FAF8F5] text-[#1A1816] border-[#E8DFC9]'
          : 'bg-[#080808] text-[#f5f4f0] border-[#1a1a1a]'
      }`}
    >
      <div className="max-w-[1700px] mx-auto space-y-12 md:space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#C5A059] font-sans font-medium">
                AUTHENTIC EXPERIENCES • SINCE 2024
              </span>
              <span className="text-xs text-[#C5A059]">✦</span>
            </div>

            <h2
              className={`font-serif text-3xl sm:text-4xl md:text-5xl font-normal uppercase tracking-[0.16em] ${
                isLight ? 'text-[#1A1816]' : 'text-white'
              }`}
            >
              FUME ON FILM
            </h2>

            <p
              className={`text-xs sm:text-sm font-sans font-light tracking-wider leading-relaxed ${
                isLight ? 'text-[#7D766E]' : 'text-[#8c8985]'
              }`}
            >
              Real customer unboxings, all-day sillage impressions, and product beauty films straight from our community.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {[
              { id: 'ALL', label: 'ALL FILMS' },
              { id: 'REVIEWS', label: 'CLIENT REVIEWS' },
              { id: 'FLACONS', label: 'PRODUCT FILMS' },
              { id: 'MAISON', label: 'THE MAISON' }
            ].map((tab) => {
              const active = selectedFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedFilter(tab.id as any)}
                  className={`px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-sans font-medium transition-all rounded-full cursor-pointer whitespace-nowrap border ${
                    active
                      ? isLight
                        ? 'bg-[#1A1816] text-white border-[#1A1816] shadow-sm'
                        : 'bg-[#C5A059] text-black border-[#C5A059] shadow-sm'
                      : isLight
                      ? 'bg-transparent text-[#7D766E] border-[#E0D5C3] hover:border-[#C5A059] hover:text-[#1A1816]'
                      : 'bg-transparent text-[#8c8985] border-[#222222] hover:border-[#C5A059] hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 9:16 Video Cards Carousel / Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFilms.map((film) => (
            <div
              key={film.id}
              className={`group flex flex-col rounded-xs overflow-hidden border transition-all duration-500 hover:shadow-2xl ${
                isLight
                  ? 'bg-[#FFFFFF] border-[#E8DFC9] hover:border-[#C5A059]'
                  : 'bg-[#0E0E0E] border-[#1F1F1F] hover:border-[#C5A059]/60'
              }`}
            >
              {/* 9:16 Video Container */}
              <div className="relative w-full aspect-[9/16] overflow-hidden bg-black">
                <FilmPlayer
                  film={film}
                  aspectRatio="9/16"
                  autoPlayInView={true}
                  playOnHover={true}
                  initialMuted={true}
                  showControls={true}
                  showOverlayInfo={true}
                  onOpenReel={onOpenReel}
                  onProductClick={handleProductClick}
                  themeMode={themeMode}
                  className="w-full h-full"
                />
              </div>

              {/* Bottom Quick Context strip */}
              <div
                className={`p-3.5 flex items-center justify-between border-t transition-colors ${
                  isLight ? 'bg-[#FAF8F5] border-[#EFE8DC]' : 'bg-[#0A0A0A] border-[#1A1A1A]'
                }`}
              >
                <div className="min-w-0 pr-2">
                  <span className="text-[9px] uppercase tracking-[0.25em] text-[#C5A059] font-sans font-medium block truncate">
                    {film.kicker}
                  </span>
                  <span
                    className={`font-serif text-xs uppercase tracking-[0.1em] truncate block ${
                      isLight ? 'text-[#1A1816]' : 'text-[#EAE2D5]'
                    }`}
                  >
                    {film.productName || film.title}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenReel(film)}
                  className={`text-[9px] uppercase tracking-[0.2em] font-sans font-medium transition-colors flex items-center gap-1 shrink-0 ${
                    isLight ? 'text-[#7D766E] hover:text-[#C5A059]' : 'text-[#8c8985] hover:text-[#C5A059]'
                  }`}
                >
                  <span>WATCH FULL</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div
          className={`p-6 sm:p-8 rounded-xs border flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left ${
            isLight
              ? 'bg-[#F5F0E6] border-[#E2D8C6]'
              : 'bg-[#121212] border-[#222222]'
          }`}
        >
          <div className="space-y-1">
            <span className="text-[9px] uppercase tracking-[0.3em] font-sans font-medium text-[#C5A059] block">
              COMMUNITY CURATION
            </span>
            <h4
              className={`font-serif text-xl sm:text-2xl uppercase tracking-[0.14em] ${
                isLight ? 'text-[#1A1816]' : 'text-white'
              }`}
            >
              SHARE YOUR FUME MOMENT
            </h4>
            <p
              className={`text-xs font-sans font-light tracking-wider max-w-xl ${
                isLight ? 'text-[#7D766E]' : 'text-[#8c8985]'
              }`}
            >
              Tag us @fume.official with your unboxing or all-day wear test to be featured in the official Maison archive.
            </p>
          </div>

          {onViewAllPerfumes && (
            <button
              onClick={onViewAllPerfumes}
              className={`px-6 py-3.5 text-xs uppercase tracking-[0.25em] font-sans font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
                isLight
                  ? 'bg-[#1A1816] text-white border-[#1A1816] hover:bg-[#C5A059] hover:border-[#C5A059]'
                  : 'bg-[#C5A059] text-black border-[#C5A059] hover:bg-white hover:border-white'
              }`}
            >
              EXPLORE ALL 23 FLACONS
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
