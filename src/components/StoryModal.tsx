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
            'text-shadow/80 hover:text-shadow'
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
          <img src={HERO_BOTTLE_IMAGE}
            alt="FUME FRAGRANCES Haute Parfumerie in Pakistan"
            className="w-full h-full object-cover object-center filter brightness-90"
           loading="lazy" decoding="async" />
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[9px] uppercase tracking-[0.25em] text-shadow/90 font-sans">
            <span>ARTISANAL EAU DE PARFUM</span>
            <span className="text-dusty-rose">EST. 2024</span>
          </div>
        </div>

        {/* Core Story Content */}
        <div
          className="space-y-4 text-xs sm:text-sm font-sans font-normal leading-relaxed max-w-2xl mx-auto text-shadow"
        >
          <p>
            I didn’t start Fume simply because I wanted to start a business.
            I started it because I believed in something.
            A passion that had already been bringing me compliments, questions, and curiosity from people around the world.
          </p>
          <p>
            In 2024, at just 24 years old, I decided to turn that belief into something of my own. At that time, I was also stepping into one of the most beautiful and transformative chapters of my life — becoming a mother.
          </p>
          <p>
            From the very first printing to developing fragrances, working on packaging, managing orders, and personally dispatching them, I was involved in every little detail of Fume.
          </p>
          <p>
            For me, Fume was never just about selling perfumes. It became a reflection of what I believed a woman could create when she trusted herself enough to begin. Behind every bottle is a part of my journey — the risks I took, the hard work, the sleepless nights, the courage to keep going, and above all, the love I put into what I was building.
          </p>
          <p className="font-medium text-shadow pt-2">
            This is the story of how Fume began. And this is only the beginning.
          </p>
        </div>

        {/* Footer Meta & WhatsApp Action */}
        <div
          className={`pt-5 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-[0.25em] ${
            'border-shadow/10 text-shadow/80'
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
            href="https://wa.me/923281825636?text=Hello%20FUME%20FRAGRANCES%2C%20I%20would%20love%20to%20learn%20more%20about%20your%20fragrances."
            target="_blank"
            rel="noopener noreferrer"
            className="text-dusty-rose hover:underline flex items-center gap-1 font-medium cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>TALK TO FOUNDER (+92 328 182 5636)</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default StoryModal;
