import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FRAGRANCES } from '../data/fragrances';
import { ThemeMode, Fragrance } from '../types';
import { FlaconBottle } from './FlaconBottle';

interface HeroSectionProps {
  onShopPerfumes: () => void;
  onExploreFume: () => void;
  onOpenQuiz?: () => void;
  themeMode: ThemeMode;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onShopPerfumes,
  onExploreFume,
  onOpenQuiz,
  themeMode
}) => {
  const isLight = themeMode === 'light';
  const [activeFragrance, setActiveFragrance] = useState<Fragrance>(FRAGRANCES[0]); // Default BLOOM

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-28 lg:pt-32 bg-pearl text-shadow"
    >
      {/* Dynamic Animated Ambient Colors, Scent Dispersion & Floating Flacon Stage */}
      <div className="hero-stage absolute inset-0 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 flex items-center justify-center lg:justify-end pointer-events-none overflow-hidden">
        {/* Right-positioned Hero Bottle Group with Ambient Halo and Aura */}
        <div className="hero-bottle relative w-full max-w-[500px] lg:max-w-[520px] xl:max-w-[560px] h-full flex items-center justify-center lg:justify-end pointer-events-none lg:mr-2 xl:mr-8">
          {/* Animated Moving Rose & Sand Aura Behind the Flacon */}
          <motion.div
            className="absolute w-[450px] h-[450px] md:w-[650px] md:h-[650px] rounded-full blur-[100px] pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(201, 169, 166, 0.38) 0%, rgba(214, 199, 178, 0.22) 40%, rgba(248, 244, 240, 0.6) 75%, transparent 100%)'
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
              background: 'radial-gradient(circle, rgba(227, 221, 211, 0.25) 0%, rgba(248, 244, 240, 0.3) 60%, transparent 80%)'
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
              themeMode="light"
              className="w-full h-full max-w-[440px] lg:max-w-[480px] xl:max-w-[520px] max-h-[620px] transition-transform duration-700 hover:scale-[1.03]"
            />
          </motion.div>
        </div>
      </div>

      {/* Soft bottom fade blending seamlessly from the pearl hero into the page flow */}
      <div
        className="absolute bottom-0 left-0 w-full h-44 bg-gradient-to-t from-pearl via-pearl/80 to-transparent pointer-events-none z-10"
      />

      {/* Editorial Content Overlay */}
      <div className="relative z-20 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col justify-between min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-8rem)] py-12 md:py-16">
        {/* Top Minimal Brand Mark with Official Tagline */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left flex flex-wrap items-center gap-3 justify-center md:justify-start"
        >
          <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-sans block text-shadow/80">
            YOUR SCENT. YOUR STORY.
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-dusty-rose" />
          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-dusty-rose font-sans font-medium">
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
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal uppercase tracking-[0.14em] leading-[1.08] text-shadow">
              SCENT, <br />
              <span className="italic font-light text-dusty-rose">REFINED.</span>
            </h1>
            <p className="text-sm md:text-base font-sans font-light tracking-wide max-w-md leading-relaxed text-shadow/80">
              Artisanal Eau de Parfum hand-crafted for all-day persistence. Formulated with pure botanical distillates and bottled in architectural flint glass.
            </p>
          </div>

          {/* High-Conversion CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 justify-center md:justify-start">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onShopPerfumes}
              className="w-full sm:w-auto px-10 py-4.5 transition-all text-xs uppercase tracking-[0.28em] font-sans font-semibold cursor-pointer shadow-xl relative overflow-hidden group bg-dusty-rose text-pearl hover:bg-shadow hover:text-pearl rounded-xs"
            >
              <span className="relative z-10">SHOP THE COLLECTION</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </motion.button>

            {onOpenQuiz ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenQuiz}
                className="w-full sm:w-auto px-8 py-4.5 transition-all text-xs uppercase tracking-[0.28em] font-sans font-medium cursor-pointer border border-shadow/20 text-shadow hover:border-dusty-rose hover:bg-shadow/5 rounded-xs"
              >
                FIND YOUR SCENT
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onExploreFume}
                className="w-full sm:w-auto px-8 py-4.5 transition-all text-xs uppercase tracking-[0.28em] font-sans font-medium cursor-pointer border border-shadow/20 text-shadow hover:border-dusty-rose hover:bg-shadow/5 rounded-xs"
              >
                EXPLORE FUME
              </motion.button>
            )}
          </div>

          {/* Minimalist Flacon Scent Switcher */}
          <div className="pt-2">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
              <span className="text-[9px] uppercase tracking-[0.3em] text-dusty-rose font-sans font-medium">
                FLACON ON DISPLAY:
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
                        ? 'bg-dusty-rose text-pearl border-dusty-rose font-semibold shadow-[0_0_12px_rgba(201,169,166,0.4)]'
                        : 'bg-pearl/50 text-shadow/80 border-shadow/10 hover:border-dusty-rose hover:text-shadow'
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
        <div className="flex items-center justify-between pt-8 border-t border-shadow/10 text-[10px] uppercase tracking-[0.3em] font-sans text-shadow/80">
          <span>EAU DE PARFUM / 50 ML</span>
          <span className="text-dusty-rose font-medium hidden sm:inline">
            EST. 2024 • YOUR SCENT. YOUR STORY.
          </span>
          <span>14+ HRS PERSISTENCE</span>
        </div>
      </div>
    </section>
  );
};
