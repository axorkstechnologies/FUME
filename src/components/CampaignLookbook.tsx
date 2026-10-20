import React from 'react';
import { motion } from 'motion/react';

export const CampaignLookbook: React.FC = () => {
  return (
    <section className="relative w-full py-28 md:py-40 bg-pearl border-y border-shadow/[0.06] overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 space-y-24">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-shadow/10 bg-white/70 backdrop-blur-sm text-[9px] uppercase tracking-[0.4em] text-dusty-rose font-sans font-medium">
            <span>EDITORIAL VISUAL ARCHIVE</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal uppercase tracking-[0.16em] text-shadow leading-tight">
            THE CAMPAIGNS
          </h2>
          <p className="text-xs sm:text-sm font-sans font-normal tracking-wide text-shadow/70 max-w-md mx-auto">
            Cinematic visual chapters capturing the raw poetry and regal depth of FUME creations.
          </p>
        </div>

        {/* Desert Collection Campaign Diptych */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-shadow/[0.08] pb-3 text-[10px] uppercase tracking-[0.3em] font-sans text-dusty-rose font-medium">
            <span>CHAPTER I — DESERT ENIGMA</span>
            <span className="text-shadow/50">AMBER &bull; SMOKED SANDALWOOD</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex items-center justify-center p-6 sm:p-10 bg-oyster/70 crystal-vitrine border border-shadow/[0.06] shadow-[0_15px_35px_-10px_rgba(10,10,10,0.05)] group"
            >
              <img 
                src="/campaigns/desert-girl.jpg" 
                alt="Desert Campaign Storyline"
                className="w-full h-auto max-h-[75vh] object-contain transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
                loading="lazy"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex items-center justify-center p-6 sm:p-10 bg-oyster/70 crystal-vitrine border border-shadow/[0.06] shadow-[0_15px_35px_-10px_rgba(10,10,10,0.05)] group"
            >
              <img 
                src="/campaigns/desert-man.jpg" 
                alt="Desert Collection Detail"
                className="w-full h-auto max-h-[75vh] object-contain transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>

        {/* Arab Collection Campaign Diptych */}
        <div className="space-y-6 pt-6">
          <div className="flex items-center justify-between border-b border-shadow/[0.08] pb-3 text-[10px] uppercase tracking-[0.3em] font-sans text-dusty-rose font-medium">
            <span>CHAPTER II — SULTANATE OF ARAB</span>
            <span className="text-shadow/50">NOBLE OUD &bull; SPICY SAFFRON</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex items-center justify-center p-6 sm:p-10 bg-oyster/70 crystal-vitrine border border-shadow/[0.06] shadow-[0_15px_35px_-10px_rgba(10,10,10,0.05)] group md:order-last"
            >
              <img 
                src="/campaigns/arab-girl-bg.jpg" 
                alt="Arab Collection Inspiration"
                className="w-full h-auto max-h-[75vh] object-contain transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
                loading="lazy"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex items-center justify-center p-6 sm:p-10 bg-oyster/70 crystal-vitrine border border-shadow/[0.06] shadow-[0_15px_35px_-10px_rgba(10,10,10,0.05)] group"
            >
              <img 
                src="/campaigns/arab-man.jpg" 
                alt="Arab Collection Flacon"
                className="w-full h-auto max-h-[75vh] object-contain transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
};
