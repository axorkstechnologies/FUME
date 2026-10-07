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
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-pearl">
      {/* 1. Cinematic Full-Bleed Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <motion.img
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="/bottles/hero-three-bottles.jpeg"
          alt="FUME FRAGRANCES - Legend, Bloom, Eternity"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        {/* Soft overlay gradient to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-pearl/90 via-pearl/40 to-black/10" />
      </div>

      {/* 2. Content Overlay */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col items-center text-center mt-32 md:mt-40">
        
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-6"
        >
          <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-sans text-shadow/90 drop-shadow-sm">
            YOUR SCENT. YOUR STORY.
          </span>
          <span className="w-1 h-1 rounded-full bg-dusty-rose" />
          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-dusty-rose font-sans font-medium drop-shadow-sm">
            SINCE 2024
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="space-y-4 mb-10"
        >
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal uppercase tracking-[0.12em] leading-none text-shadow drop-shadow-md">
            SCENT, <br className="hidden sm:block" />
            <span className="italic font-light text-dusty-rose">REFINED.</span>
          </h1>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="w-full max-w-md sm:max-w-none sm:w-auto flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            onClick={onShopPerfumes}
            className="w-full sm:w-auto px-10 py-4 md:py-4.5 text-xs uppercase tracking-[0.28em] font-sans font-semibold transition-all bg-dusty-rose text-pearl hover:bg-shadow hover:text-pearl shadow-lg active:scale-95"
          >
            SHOP THE COLLECTION
          </button>

          <button
            onClick={onOpenQuiz || onExploreFume}
            className="w-full sm:w-auto px-10 py-4 md:py-4.5 text-xs uppercase tracking-[0.28em] font-sans font-medium transition-all bg-pearl/60 backdrop-blur-md border border-sand text-shadow hover:bg-pearl hover:border-dusty-rose shadow-sm active:scale-95"
          >
            {onOpenQuiz ? 'FIND YOUR SCENT' : 'EXPLORE FUME'}
          </button>
        </motion.div>

      </div>
      
      {/* Bottom fade blending into the next section */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-pearl to-transparent pointer-events-none z-10" />
    </section>
  );
};
