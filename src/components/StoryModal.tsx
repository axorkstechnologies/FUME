import React from 'react';
import { X } from 'lucide-react';
import { HERO_BOTTLE_IMAGE } from '../data/fragrances';
import { ThemeMode } from '../types';

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  themeMode: ThemeMode;
}

export const StoryModal: React.FC<StoryModalProps> = ({ isOpen, onClose, themeMode }) => {
  if (!isOpen) return null;
  const isLight = themeMode === 'light';

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-3xl border p-8 md:p-14 shadow-2xl space-y-8 max-h-[85vh] overflow-y-auto ${
          isLight
            ? 'bg-[#FAF8F5] border-[#E8DFC9] text-[#1A1816]'
            : 'bg-[#0c0c0c] border-[#222222] text-[#f5f4f0]'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-6 right-6 p-2 cursor-pointer transition-colors ${
            isLight ? 'text-[#7D766E] hover:text-[#1A1816]' : 'text-[#8c8985] hover:text-white'
          }`}
          aria-label="Close story"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-3 text-center">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#C5A059] block font-sans font-medium">
            OUR GENESIS • SINCE 2024
          </span>
          <h3
            className={`font-serif text-3xl md:text-4xl font-normal uppercase tracking-[0.16em] ${
              isLight ? 'text-[#1A1816]' : 'text-white'
            }`}
          >
            THE STORY OF FUME
          </h3>
        </div>

        <div className="aspect-[16/9] w-full bg-[#111111] overflow-hidden rounded-xs border border-[#C5A059]/30">
          <img
            src={HERO_BOTTLE_IMAGE}
            alt="FUME Atelier"
            className="w-full h-full object-cover object-center filter brightness-90"
          />
        </div>

        <div
          className={`space-y-6 text-xs sm:text-sm font-sans font-light leading-relaxed max-w-2xl mx-auto ${
            isLight ? 'text-[#5C5449]' : 'text-[#a9a7a1]'
          }`}
        >
          <p>
            FUME was established in 2024 on a single conviction: that true luxury fragrance should possess physical presence, emotional resonance, and extraordinary persistence.
          </p>
          <p>
            Rejecting the ephemeral, diluted waters that dominate modern retail, our master perfumers in Grasse formulate each flacon with heightened concentrations of pure botanical absolutes, rare aged resins, and noble woods.
          </p>
          <p>
            Every vessel is crafted from heavy luxury glass, crowned with our signature textured obsidian cap, and hand-packaged with archival precision. Scent, refined.
          </p>
        </div>

        <div
          className={`pt-6 border-t flex items-center justify-between text-[10px] uppercase tracking-[0.3em] ${
            isLight ? 'border-[#E8DFC9] text-[#8C8377]' : 'border-[#1a1a1a] text-[#666666]'
          }`}
        >
          <span>GRASSE • PARIS</span>
          <span className="text-[#C5A059]">EST. 2024</span>
          <span>HAUTE PARFUMERIE</span>
        </div>
      </div>
    </div>
  );
};
