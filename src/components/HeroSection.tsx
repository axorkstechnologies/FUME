import React from 'react';
import { motion } from 'motion/react';
import { ThemeMode } from '../types';

interface HeroSectionProps {
  onShopPerfumes: () => void;
  onExploreFume: () => void;
  onOpenQuiz?: () => void;
  themeMode?: ThemeMode;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onShopPerfumes,
  onExploreFume,
  onOpenQuiz
}) => {
  return (
    <section className="relative w-full min-h-screen flex flex-col overflow-hidden bg-shadow">
      {/* 1. Cinematic Full-Bleed Hero Image — top half */}
      <div className="relative w-full flex-1 min-h-[50vh] md:min-h-[65vh]">
        <motion.img
          initial={{ scale: 1.06, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          src="/bottles/hero-three-bottles.jpeg"
          alt="FUME FRAGRANCES — Legend, Bloom, Eternity on marble with dramatic lighting"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="eager"
        />
        {/* Cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-shadow/30 via-transparent to-shadow/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-shadow/20 via-transparent to-shadow/20" />
      </div>

      {/* 2. Content — over the dark lower portion */}
      <div className="relative z-10 w-full bg-gradient-to-b from-shadow to-shadow/95 pb-16 md:pb-24 -mt-32 md:-mt-44 pt-36 md:pt-48">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center text-center">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-8"
          >
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.5em] font-sans text-pearl/80 font-medium">
              YOUR SCENT. YOUR STORY.
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-dusty-rose" />
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-dusty-rose font-sans font-semibold">
              EST. 2024
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-normal uppercase tracking-[0.14em] leading-[0.95] text-pearl mb-6"
          >
            SCENT, <br className="hidden sm:block" />
            <span className="italic text-dusty-rose">REFINED.</span>
          </motion.h1>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-[13px] md:text-sm font-sans text-pearl/80 tracking-wider max-w-lg mb-12 leading-relaxed font-normal"
          >
            An independent Pakistani fragrance house crafting signature and impression Eau de Parfum with uncompromising presence.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="w-full max-w-md sm:max-w-none sm:w-auto flex flex-col sm:flex-row items-center gap-4"
          >
            <button
              onClick={onShopPerfumes}
              className="w-full sm:w-auto px-12 py-[18px] text-[11px] uppercase tracking-[0.3em] font-sans font-semibold transition-all duration-500 bg-dusty-rose text-pearl hover:bg-pearl hover:text-shadow active:scale-[0.97] cursor-pointer"
            >
              SHOP THE COLLECTION
            </button>

            <button
              onClick={onOpenQuiz || onExploreFume}
              className="w-full sm:w-auto px-12 py-[18px] text-[11px] uppercase tracking-[0.3em] font-sans font-medium transition-all duration-500 border border-pearl/25 text-pearl/80 hover:border-dusty-rose hover:text-dusty-rose backdrop-blur-sm active:scale-[0.97] cursor-pointer"
            >
              {onOpenQuiz ? 'FIND YOUR SCENT' : 'EXPLORE FUME'}
            </button>
          </motion.div>

        </div>
      </div>
      
      {/* Bottom transition into Pearl content */}
      <div className="w-full h-24 bg-gradient-to-b from-shadow/95 to-pearl" />
    </section>
  );
};
