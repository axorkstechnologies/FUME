import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FRAGRANCES } from '../data/fragrances';
import { ThemeMode, Fragrance } from '../types';
import { FlaconBottle } from './FlaconBottle';

interface HeroSectionProps {
  onShopPerfumes: () => void;
  onExploreFume: () => void;
  themeMode: ThemeMode;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onShopPerfumes,
  onExploreFume,
  themeMode
}) => {
  const isLight = themeMode === 'light';
  const [activeFragrance, setActiveFragrance] = useState<Fragrance>(FRAGRANCES[0]); // Default BLOOM

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-28 lg:pt-32 bg-[#070707] text-[#f5f4f0]"
    >
      {/* Dynamic Animated Ambient Colors, Scent Dispersion & Floating Flacon Stage */}
      <div className="hero-stage absolute inset-0 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 flex items-center justify-center lg:justify-end pointer-events-none overflow-hidden">
        {/* Right-positioned Hero Bottle Group with Ambient Halo and Aura */}
        <div className="hero-bottle relative w-full max-w-[500px] lg:max-w-[520px] xl:max-w-[560px] h-full flex items-center justify-center lg:justify-end pointer-events-none lg:mr-2 xl:mr-8">
          {/* Animated Moving Gold & Amber Aura Behind the Flacon */}
          <motion.div
            className="absolute w-[450px] h-[450px] md:w-[650px] md:h-[650px] rounded-full blur-[100px] pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(197, 160, 89, 0.38) 0%, rgba(160, 115, 65, 0.22) 40%, rgba(10, 10, 10, 0.85) 75%, transparent 100%)'
            }}
            animate={{
              scale: [1, 1.12, 0.96, 1],
              rotate: [0, 90, 180, 360],
              opacity: [0.55, 0.75, 0.55]
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />

          {/* Floating Warm Shimmer Halo */}
          <motion.div
            className="absolute w-[300px] h-[300px] md:w-[480px] md:h-[480px] rounded-full blur-[85px] pointer-events-none opacity-40"
            style={{
              background: 'radial-gradient(circle, rgba(230, 202, 140, 0.25) 0%, rgba(35, 25, 15, 0.6) 60%, transparent 80%)'
            }}
            animate={{
              x: [-20, 25, -20],
              y: [15, -25, 15]
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />

          {/* Animated Floating Flacon with Luxury Printed Plaque on Glass */}
          <motion.div
            key={activeFragrance.id}
            className="relative w-full h-full flex items-center justify-center lg:justify-end select-none z-10"
            animate={{
              y: [0, -14, 0],
              rotate: [0, 0.35, 0, -0.35, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            <FlaconBottle
              fragrance={activeFragrance}
              variant="hero"
              themeMode="dark"
              className="w-full h-full max-w-[440px] lg:max-w-[480px] xl:max-w-[520px] max-h-[620px] transition-transform duration-700 hover:scale-[1.03]"
            />
          </motion.div>
        </div>
      </div>

      {/* Soft bottom fade blending seamlessly from the dark hero into the page flow */}
      <div
        className={`absolute bottom-0 left-0 w-full h-44 bg-gradient-to-t pointer-events-none z-10 ${
          isLight
            ? 'from-[#FAF8F5] via-[#FAF8F5]/60 to-transparent'
            : 'from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent'
        }`}
      />

      {/* Editorial Content Overlay */}
      <div className="relative z-20 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col justify-between min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-8rem)] py-12 md:py-16">
        {/* Top Minimal Brand Mark & SINCE 2024 */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left flex flex-wrap items-center gap-3 justify-center md:justify-start"
        >
          <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-sans block text-[#A39E95]">
            FUME • HAUTE PARFUMERIE
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#C5A059] font-sans font-medium">
            SINCE 2024
          </span>
        </motion.div>

        {/* Center / Lower Hero Headline & Actions */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-xl mx-auto md:mx-0 mt-auto space-y-6 md:space-y-8 text-center md:text-left"
        >
          <div className="space-y-3">
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal uppercase tracking-[0.14em] leading-[1.08] text-[#FAF8F5]">
              SCENT, <br />
              <span className="italic font-light text-[#C5A059]">REFINED.</span>
            </h1>
            <p className="text-sm md:text-base font-sans font-light tracking-wide max-w-md leading-relaxed text-[#BDB7AB]">
              Luxurious fragrances crafted to leave a lasting impression. Hand-formulated in Grasse with pure botanical distillates and bottled in architectural flint glass.
            </p>
          </div>

          {/* Minimal Rectangular Luxury CTAs with Gold & Ivory Palette */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 justify-center md:justify-start">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onShopPerfumes}
              className="w-full sm:w-auto px-9 py-4 transition-all text-[11px] uppercase tracking-[0.28em] font-sans font-medium cursor-pointer shadow-lg relative overflow-hidden group bg-[#FAF8F5] text-[#070707] hover:bg-[#C5A059] hover:text-black"
            >
              <span className="relative z-10">SHOP PERFUMES</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onExploreFume}
              className="w-full sm:w-auto px-9 py-4 transition-all text-[11px] uppercase tracking-[0.28em] font-sans font-medium cursor-pointer border border-[#C5A059]/70 text-[#FAF8F5] hover:border-[#C5A059] hover:bg-[#C5A059]/15 hover:text-white"
            >
              EXPLORE FUME
            </motion.button>
          </div>

          {/* Minimalist Flacon Scent Switcher */}
          <div className="pt-2">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#C5A059] font-sans font-medium">
                DISCOVERY FLACON ON DISPLAY:
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 justify-center md:justify-start">
              {FRAGRANCES.filter(f => f.discovery).map((frag) => {
                const isCurrent = activeFragrance.id === frag.id;
                return (
                  <button
                    key={frag.id}
                    onClick={() => setActiveFragrance(frag)}
                    className={`px-3 py-1 text-[9px] uppercase tracking-[0.2em] font-sans transition-all cursor-pointer rounded-xs border ${
                      isCurrent
                        ? 'bg-[#C5A059] text-black border-[#C5A059] font-medium shadow-[0_0_12px_rgba(197,160,89,0.3)]'
                        : 'bg-black/40 text-[#A39E95] border-[#222222] hover:border-[#C5A059] hover:text-white'
                    }`}
                  >
                    {frag.name}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Bottom Minimal Indicator with EST. 2024 */}
        <div className="flex items-center justify-between pt-8 border-t border-[#262420] text-[10px] uppercase tracking-[0.3em] font-sans text-[#8C867C]">
          <span>EAU DE PARFUM / 50 ML</span>
          <span className="text-[#C5A059] font-medium hidden sm:inline">
            EST. 2024 • GRASSE & PARIS
          </span>
          <span>HIGH CONCENTRATION</span>
        </div>
      </div>
    </section>
  );
};
