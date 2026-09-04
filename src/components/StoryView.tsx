import React from 'react';
import { motion } from 'motion/react';
import { EDITORIAL_IMAGE, HERO_BOTTLE_IMAGE, CAMPAIGN_IMAGE, FRAGRANCES } from '../data/fragrances';
import { ThemeMode } from '../types';
import { Sparkles, Shield, Compass, ArrowRight } from 'lucide-react';
import { FlaconBottle } from './FlaconBottle';

interface StoryViewProps {
  onShopPerfumes: () => void;
  onOpenContact: () => void;
  themeMode: ThemeMode;
}

export const StoryView: React.FC<StoryViewProps> = ({
  onShopPerfumes,
  onOpenContact,
  themeMode
}) => {
  const isLight = themeMode === 'light';

  return (
    <div
      className={`relative w-full min-h-screen pt-32 pb-32 px-6 md:px-12 lg:px-16 transition-colors duration-500 ${
        isLight ? 'bg-[#FAF8F5] text-[#1A1816]' : 'bg-[#0a0a0a] text-[#f5f4f0]'
      }`}
    >
      <div className="max-w-[1600px] mx-auto space-y-28">
        {/* Editorial Page Header with Breadcrumb */}
        <div className="text-center space-y-5 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.4em] text-[#C5A059] font-sans font-medium">
            <span>HOME</span>
            <span>/</span>
            <span>OUR STORY</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] ml-1" />
            <span>EST. 2024</span>
          </div>

          <h1
            className={`font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal uppercase tracking-[0.16em] ${
              isLight ? 'text-[#1A1816]' : 'text-white'
            }`}
          >
            THE HOUSE OF FUME
          </h1>

          <p
            className={`text-sm sm:text-base font-sans font-light tracking-wide leading-relaxed ${
              isLight ? 'text-[#6B6357]' : 'text-[#a9a7a1]'
            }`}
          >
            Born in 2024 from an obsession with physical permanence. Formulated in the sun-drenched floral terraces of Grasse and bottled in architectural European flint glass.
          </p>
        </div>

        {/* Hero Editorial Photography Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 relative">
            <div className="aspect-[16/10] overflow-hidden rounded-xs border border-[#C5A059]/40 relative group">
              <img
                src={EDITORIAL_IMAGE}
                alt="FUME Grasse Atelier"
                className="w-full h-full object-cover object-center filter grayscale-[15%] group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-[#FAF8F5] font-sans">
                <span>TERROIR DE GRASSE, FRANCE</span>
                <span className="text-[#C5A059]">ARCHIVAL BATCH #01</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6 lg:pl-6">
            <div className="flex items-center gap-2">
              <span className="w-8 h-[1px] bg-[#C5A059]" />
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#C5A059] font-sans font-medium">
                CHAPTER I • THE GENESIS
              </span>
            </div>

            <h2
              className={`font-serif text-2xl sm:text-3xl md:text-4xl font-normal uppercase tracking-[0.14em] ${
                isLight ? 'text-[#1A1816]' : 'text-white'
              }`}
            >
              REJECTING THE EPHEMERAL
            </h2>

            <p
              className={`text-xs sm:text-sm font-sans font-light leading-relaxed ${
                isLight ? 'text-[#5C5449]' : 'text-[#a9a7a1]'
              }`}
            >
              In an era dominated by synthetic dilutions and transient body mists, FUME was founded in 2024 with a singular architectural intent: restoring physical presence and heavy silage to haute perfumery.
            </p>

            <p
              className={`text-xs sm:text-sm font-sans font-light leading-relaxed ${
                isLight ? 'text-[#5C5449]' : 'text-[#a9a7a1]'
              }`}
            >
              Our master noses bypass mass-production commercial constraints, allowing pure absolutes of centifolia rose, hand-tapped birch tar, and Bourbon vanilla to steep in aged oak barrels for 90 uninterrupted days.
            </p>

            <div
              className={`p-6 border rounded-xs space-y-2 ${
                isLight
                  ? 'border-[#E6DDD0] bg-[#F5F1E8]/60 text-[#1A1816]'
                  : 'border-[#222222] bg-[#111111]/80 text-[#f5f4f0]'
              }`}
            >
              <div className="text-[10px] uppercase tracking-widest text-[#C5A059] font-medium font-sans">
                FOUNDER S STATEMENT • ÉMILE LAURENT
              </div>
              <blockquote className="font-serif italic text-sm sm:text-base leading-relaxed">
                &ldquo;A great perfume is not merely smelled. It occupies physical architecture in a room and lingers in memory long after you have departed.&rdquo;
              </blockquote>
            </div>
          </div>
        </div>

        {/* 4 Architectural Pillars Grid */}
        <div className="space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#C5A059] font-sans font-medium block">
              OUR ATELIER PILLARS • SINCE 2024
            </span>
            <h3
              className={`font-serif text-3xl sm:text-4xl font-normal uppercase tracking-[0.14em] ${
                isLight ? 'text-[#1A1816]' : 'text-white'
              }`}
            >
              THE FOUR CORNERSTONES
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Compass,
                title: 'TERROIR OF GRASSE',
                tag: 'BOTANICAL HARVEST',
                text: 'Every floral harvest is sourced directly from certified generational growers in the Grasse foothills, picked before sunrise when petal volatiles are peak.'
              },
              {
                icon: Sparkles,
                title: '90-DAY MACERATION',
                tag: 'SLOW PERFUMERY',
                text: 'We mandate a minimum three-month barrel rest to allow raw natural resins and top notes to fuse harmoniously without synthetic masking agents.'
              },
              {
                icon: Shield,
                title: 'OBSIDIAN FLACONS',
                tag: 'ARCHITECTURAL GLASS',
                text: 'Cast from heavy European flint glass with a weighted volcanic textured obsidian cap, engineered to protect precious compounds from light degradation.'
              },
              {
                icon: ArrowRight,
                title: 'INDELIBLE 14HR SILAGE',
                tag: 'EXTRACT CONCENTRATION',
                text: 'Blended at an uncompromising 22% to 28% pure perfume oil concentration for unrivaled sillage and longevity on linen and skin.'
              }
            ].map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className={`p-8 border rounded-xs space-y-4 transition-all duration-300 hover:-translate-y-1 ${
                    isLight
                      ? 'border-[#E6DDD0] bg-white hover:border-[#C5A059] shadow-[0_4px_20px_rgba(0,0,0,0.02)]'
                      : 'border-[#1f1f1f] bg-[#0f0f0f] hover:border-[#C5A059]'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase tracking-widest text-[#C5A059] font-sans font-medium">
                      {pillar.tag}
                    </span>
                    <h4
                      className={`font-serif text-lg uppercase tracking-wider ${
                        isLight ? 'text-[#1A1816]' : 'text-white'
                      }`}
                    >
                      {pillar.title}
                    </h4>
                  </div>
                  <p
                    className={`text-xs font-sans font-light leading-relaxed ${
                      isLight ? 'text-[#6B6357]' : 'text-[#8c8985]'
                    }`}
                  >
                    {pillar.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Secondary Visual Banner & Heritage Milestones */}
        <div
          className={`border p-8 sm:p-14 lg:p-16 rounded-xs relative overflow-hidden ${
            isLight
              ? 'border-[#E6DDD0] bg-[#F5F1E8]/70'
              : 'border-[#222222] bg-[#0f0f0f]'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[10px] uppercase tracking-[0.4em] text-[#C5A059] font-sans font-medium block">
                ATELIER HERITAGE DOSSIER
              </span>
              <h3
                className={`font-serif text-3xl sm:text-4xl font-normal uppercase tracking-[0.14em] ${
                  isLight ? 'text-[#1A1816]' : 'text-white'
                }`}
              >
                THE ARCHIVAL COLLECTION
              </h3>
              <p
                className={`text-xs sm:text-sm font-sans font-light leading-relaxed ${
                  isLight ? 'text-[#5C5449]' : 'text-[#a9a7a1]'
                }`}
              >
                Discover the eight signature creations that define the FUME pantheon. From the velvety floral depth of Bloom to the smoked cedarwood of Beckham, each bottle carries its own verified batch code.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={onShopPerfumes}
                  className="px-8 py-3.5 bg-[#1A1816] text-[#FAF8F5] hover:bg-[#C5A059] hover:text-black transition-colors uppercase tracking-[0.25em] text-[11px] font-sans font-medium cursor-pointer"
                >
                  EXPLORE THE PERFUMES
                </button>
                <button
                  onClick={onOpenContact}
                  className={`px-8 py-3.5 border transition-colors uppercase tracking-[0.25em] text-[11px] font-sans font-medium cursor-pointer ${
                    isLight
                      ? 'border-[#C5A059] text-[#1A1816] hover:bg-[#FAF8F5]'
                      : 'border-[#C5A059] text-[#f5f4f0] hover:bg-white/5'
                  }`}
                >
                  REQUEST CONCIERGE ACCESS
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <FlaconBottle
                fragrance={FRAGRANCES[0]}
                variant="card"
                themeMode={themeMode}
                className="aspect-[4/5] rounded-xs"
              />
              <div className="aspect-[4/5] rounded-xs overflow-hidden border border-[#C5A059]/30">
                <img
                  src={CAMPAIGN_IMAGE}
                  alt="Olfactory Atelier"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
