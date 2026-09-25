import React from 'react';
import { X, Heart, Award, Compass, MessageCircle } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 bg-pearl/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-3xl border p-6 sm:p-10 md:p-12 shadow-2xl space-y-7 max-h-[88vh] overflow-y-auto ${
          'bg-pearl border-shadow/10 text-shadow'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-5 right-5 p-2 cursor-pointer transition-colors ${
            'text-shadow/60 hover:text-shadow'
          }`}
          aria-label="Close story modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2 text-center">
          <span className="text-[10px] uppercase tracking-[0.4em] text-dusty-rose block font-sans font-medium">
            FOUNDED IN 2024 • PAKISTAN
          </span>
          <h2
            className={`font-serif text-2xl sm:text-3xl md:text-4xl font-normal uppercase tracking-[0.14em] ${
              'text-shadow'
            }`}
          >
            THE STORY OF FUME FRAGRANCES
          </h2>
        </div>

        {/* Visual Hero */}
        <div className="aspect-[16/9] w-full bg-pearl overflow-hidden rounded-xs border border-dusty-rose/30 relative">
          <img
            src={HERO_BOTTLE_IMAGE}
            alt="FUME FRAGRANCES Haute Parfumerie in Pakistan"
            className="w-full h-full object-cover object-center filter brightness-90"
          />
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[9px] uppercase tracking-[0.25em] text-shadow/90 font-sans">
            <span>ARTISANAL EAU DE PARFUM</span>
            <span className="text-dusty-rose">EST. 2024</span>
          </div>
        </div>

        {/* Core Story Content */}
        <div
          className={`space-y-4 text-xs sm:text-sm font-sans font-light leading-relaxed max-w-2xl mx-auto ${
            'text-shadow/60'
          }`}
        >
          <p>
            <strong>I didn’t start FUME FRAGRANCES simply because I wanted to start a business. I started it because I believed in something deeper.</strong>
          </p>
          <p>
            For years, perfume lovers in Pakistan faced an unfair compromise: paying Rs 40,000+ for imported designer bottles that were often counterfeit or diluted, or settling for synthetic body sprays that faded in thirty minutes.
          </p>
          <p>
            At 24, as a young mother holding my child, I set out with a singular conviction: to create an independent luxury fragrance house right here in Pakistan. Hand-testing botanical oil concentrations, perfecting all-day 14-hour sillage, and packaging every scent in heavy flint glass at honest prices.
          </p>

          <div
            className={`p-4 border rounded-xs space-y-2 ${
              'bg-pearl border-shadow/10'
            }`}
          >
            <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] text-dusty-rose font-medium font-sans">
              <Award className="w-3.5 h-3.5 text-dusty-rose" />
              <span>OUR MISSION</span>
            </div>
            <p className="text-xs italic leading-relaxed text-dusty-rose">
              &ldquo;To make authentic, long-lasting luxury fragrances accessible to everyone in Pakistan through honest craftsmanship and direct pricing.&rdquo;
            </p>
          </div>
        </div>

        {/* Footer Meta & WhatsApp Action */}
        <div
          className={`pt-5 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-[0.25em] ${
            'border-shadow/10 text-shadow/60'
          }`}
        >
          <div className="flex items-center gap-2">
            <span>PAKISTAN</span>
            <span>•</span>
            <span className="text-dusty-rose">EST. 2024</span>
            <span>•</span>
            <span>HAUTE PARFUM</span>
          </div>

          <a
            href="https://wa.me/923132970468?text=Hello%20FUME%20FRAGRANCES%2C%20I%20would%20love%20to%20learn%20more%20about%20your%20fragrances."
            target="_blank"
            rel="noopener noreferrer"
            className="text-dusty-rose hover:underline flex items-center gap-1 font-medium cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>TALK TO FOUNDER (+92 313 297 0468)</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default StoryModal;
