import React from 'react';
import { motion } from 'motion/react';

export const CampaignLookbook: React.FC = () => {
  return (
    <section className="relative w-full py-28 md:py-40 bg-pearl border-y border-shadow/[0.06]">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 space-y-24">
        
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.4em] text-dusty-rose font-sans font-medium block">
            OLFACTORY LANDSCAPES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal uppercase tracking-[0.16em] text-shadow leading-tight">
            THE CAMPAIGNS
          </h2>
        </div>

        {/* Desert Collection Campaign */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8 }}
            className="w-full flex items-center justify-center p-8 bg-oyster/50"
          >
            <img 
              src="/campaigns/desert-girl.jpg" 
              alt="Desert Campaign Storyline"
              className="w-full h-auto max-h-[80vh] object-contain drop-shadow-xl"
              loading="lazy"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full flex items-center justify-center p-8 bg-oyster/50"
          >
            <img 
              src="/campaigns/desert-man.jpg" 
              alt="Desert Collection Detail"
              className="w-full h-auto max-h-[80vh] object-contain drop-shadow-xl"
              loading="lazy"
            />
          </motion.div>
        </div>

        {/* Arab Collection Campaign */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8 }}
            className="w-full flex items-center justify-center p-8 bg-oyster/50 md:order-last"
          >
            <img 
              src="/campaigns/arab-girl-bg.jpg" 
              alt="Arab Collection Inspiration"
              className="w-full h-auto max-h-[80vh] object-contain drop-shadow-xl"
              loading="lazy"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full flex items-center justify-center p-8 bg-oyster/50"
          >
            <img 
              src="/campaigns/arab-man.jpg" 
              alt="Arab Collection Flacon"
              className="w-full h-auto max-h-[80vh] object-contain drop-shadow-xl"
              loading="lazy"
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
};
