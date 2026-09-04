import React from 'react';
import { CAMPAIGN_IMAGE } from '../data/fragrances';

interface CampaignBannerProps {
  onShopNow: () => void;
}

export const CampaignBanner: React.FC<CampaignBannerProps> = ({ onShopNow }) => {
  return (
    <section className="relative w-full h-[75vh] md:h-[85vh] bg-[#0a0a0a] overflow-hidden flex items-center justify-center border-y border-[#C5A059]/20">
      {/* Immersive Full-Width Dark Editorial Image */}
      <img
        src={CAMPAIGN_IMAGE}
        alt="FUME Campaign - Glass, Stone and Smoke"
        className="absolute inset-0 w-full h-full object-cover object-center filter brightness-90 contrast-110 select-none"
        loading="lazy"
      />

      {/* Atmospheric Overlays for cinematic depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/75" />
      <div className="absolute inset-0 bg-[#C5A059]/5 mix-blend-color" />

      {/* Minimal Editorial Text */}
      <div className="relative z-10 text-center space-y-6 max-w-3xl mx-auto px-6">
        <div className="flex items-center justify-center gap-2">
          <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#E5C985] font-sans font-medium block">
            THE CAMPAIGN • EST. 2024
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl font-normal text-[#f5f4f0] uppercase tracking-[0.16em] leading-tight">
          LIGHT, STONE <br />
          <span className="italic font-light text-[#C5A059]">& SHADOW</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#E6DDD0] font-sans font-light tracking-widest max-w-md mx-auto">
          WHERE BOTANICAL DENSITY MEETS NOCTURNAL CLARITY.
        </p>

        <div className="pt-4">
          <button
            onClick={onShopNow}
            className="px-9 py-4 bg-[#FAF8F5] hover:bg-[#C5A059] hover:text-white text-[#1A1816] text-[10px] uppercase tracking-[0.28em] font-sans font-medium transition-all cursor-pointer shadow-lg"
          >
            EXPLORE THE EDITION
          </button>
        </div>
      </div>

      {/* Bottom Subtle Caption */}
      <div className="absolute bottom-6 left-8 right-8 hidden md:flex items-center justify-between text-[9px] uppercase tracking-[0.35em] text-[#A8A196] font-sans">
        <span>FUME ATELIER STUDY</span>
        <span className="text-[#C5A059]">SINCE 2024</span>
        <span>EAU DE PARFUM 50 ML</span>
      </div>
    </section>
  );
};
