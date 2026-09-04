import React from 'react';
import { motion } from 'motion/react';
import { Fragrance, ThemeMode } from '../types';
import { CAMPAIGN_IMAGE, EDITORIAL_IMAGE, HERO_BOTTLE_IMAGE } from '../data/fragrances';

interface CollectionsViewProps {
  onShopPerfumes: () => void;
  onSelectFragrance: (fragrance: Fragrance) => void;
  fragrances: Fragrance[];
  themeMode: ThemeMode;
}

export const CollectionsView: React.FC<CollectionsViewProps> = ({
  onShopPerfumes,
  onSelectFragrance,
  fragrances,
  themeMode
}) => {
  const isLight = themeMode === 'light';

  const collections = [
    {
      title: 'THE NOCTURNE TRILOGY',
      tagline: 'SCENT AFTER MIDNIGHT • EST. 2024',
      description: 'Conceived for intimate darkness and low-lit rooms. Formulated with smoked oakmoss, night-blooming jasmine, and charred tonka bean.',
      image: HERO_BOTTLE_IMAGE,
      featuredIds: ['bloom', 'my-way', 'wanted'],
      pastelTag: '#FAF2ED'
    },
    {
      title: 'THE TERRA LEATHER ARCHIVE',
      tagline: 'RARE WOODS & AGED RESINS • EST. 2024',
      description: 'Scorched birch, Tuscan leather, and Virginian tobacco aged in French oak casks for unprecedented longevity.',
      image: EDITORIAL_IMAGE,
      featuredIds: ['bomb', 'creed', 'beckham'],
      pastelTag: '#F6F0E6'
    },
    {
      title: 'THE MINERAL & ALDEHYDE SUITE',
      tagline: 'CRYSTALLINE EQUILIBRIUM • EST. 2024',
      description: 'Frost aldehydes, Florentine iris butter, and raw ambroxan. Razor-sharp elegance that cuts cleanly through cold air.',
      image: CAMPAIGN_IMAGE,
      featuredIds: ['eternity', 'sauvage'],
      pastelTag: '#F0F4F7'
    }
  ];

  return (
    <div
      className={`relative w-full min-h-screen pt-32 pb-32 px-6 md:px-12 lg:px-16 transition-colors duration-500 ${
        isLight ? 'bg-[#FAF8F5]' : 'bg-[#0a0a0a]'
      }`}
    >
      <div className="max-w-[1700px] mx-auto space-y-24">
        {/* Editorial Heading */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#C5A059] font-sans font-medium block">
              SINCE 2024 • CURATED ANTHOLOGIES
            </span>
          </div>

          <h1
            className={`font-serif text-4xl sm:text-5xl md:text-6xl font-normal uppercase tracking-[0.16em] ${
              isLight ? 'text-[#1A1816]' : 'text-[#f5f4f0]'
            }`}
          >
            COLLECTIONS
          </h1>
          <p
            className={`text-xs sm:text-sm font-sans font-light tracking-widest max-w-md mx-auto ${
              isLight ? 'text-[#7D766E]' : 'text-[#8c8985]'
            }`}
          >
            Thematic expressions uniting fragrance, architecture, and enduring emotion.
          </p>
        </div>

        {/* Collection Blocks */}
        <div className="space-y-28">
          {collections.map((col, idx) => (
            <div
              key={col.title}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className={`lg:col-span-7 ${idx % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="aspect-[16/10] bg-[#111111] overflow-hidden relative group rounded-sm border border-[#C5A059]/30 shadow-xl">
                  <img
                    src={col.image}
                    alt={col.title}
                    className="w-full h-full object-cover object-center filter brightness-90 contrast-105 transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/25" />
                </div>
              </div>

              <div className={`lg:col-span-5 space-y-6 ${idx % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-sans block font-medium">
                  {col.tagline}
                </span>
                <h2
                  className={`font-serif text-3xl sm:text-4xl uppercase tracking-[0.16em] ${
                    isLight ? 'text-[#1A1816]' : 'text-white'
                  }`}
                >
                  {col.title}
                </h2>
                <p
                  className={`text-xs sm:text-sm font-sans font-light leading-relaxed ${
                    isLight ? 'text-[#5C5449]' : 'text-[#a9a7a1]'
                  }`}
                >
                  {col.description}
                </p>

                {/* Included Flacons Pills */}
                <div className="pt-2 space-y-2">
                  <span
                    className={`text-[9px] uppercase tracking-[0.25em] block ${
                      isLight ? 'text-[#8C8377]' : 'text-[#666666]'
                    }`}
                  >
                    INCLUDED FLACONS:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {col.featuredIds.map((id) => {
                      const frag = fragrances.find((f) => f.id === id);
                      if (!frag) return null;
                      return (
                        <button
                          key={id}
                          onClick={() => onSelectFragrance(frag)}
                          className={`px-3.5 py-1.5 text-[10px] uppercase tracking-wider transition-colors cursor-pointer rounded-xs border ${
                            isLight
                              ? 'bg-white border-[#E0D5C3] text-[#1A1816] hover:border-[#C5A059]'
                              : 'bg-black/50 border-[#333333] text-white hover:border-[#C5A059]'
                          }`}
                        >
                          {frag.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={onShopPerfumes}
                    className={`px-8 py-3.5 text-[10px] uppercase tracking-[0.25em] font-sans font-medium transition-colors cursor-pointer ${
                      isLight
                        ? 'bg-[#1A1816] text-[#FAF8F5] hover:bg-[#C5A059] hover:text-white'
                        : 'bg-white text-black hover:bg-[#C5A059] hover:text-black'
                    }`}
                  >
                    EXPLORE ALL PERFUMES
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
