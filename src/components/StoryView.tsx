import React from 'react';
import { EDITORIAL_IMAGE } from '../data/fragrances';
import { ThemeMode } from '../types';
import { Compass, Award, MessageCircle, ArrowRight } from 'lucide-react';

interface StoryViewProps {
  onShopPerfumes: () => void;
  onOpenContact: () => void;
  themeMode: ThemeMode;
}

export const StoryView: React.FC<StoryViewProps> = ({
  onShopPerfumes,
  onOpenContact
}) => {
  return (
    <article className="relative w-full min-h-screen pt-32 pb-32 px-5 sm:px-8 md:px-12 lg:px-16 bg-pearl text-shadow">
      <div className="max-w-[1400px] mx-auto space-y-32">
        
        {/* Header */}
        <header className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.4em] text-shadow/60 font-medium">
            <span>MAISON</span>
            <span className="w-1 h-1 rounded-full bg-shadow/40" />
            <span>EST. 2024</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal uppercase tracking-[0.16em] leading-tight text-shadow">
            THE STORY BEHIND FUME
          </h1>

          <p className="text-sm md:text-base font-sans tracking-widest leading-relaxed max-w-2xl mx-auto text-shadow/80 uppercase">
            An independent fragrance house eliminating the divide between hyper-inflated imports and short-lived dilutions.
          </p>
        </header>

        {/* The Core Narrative */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="relative w-full aspect-[4/5] bg-oyster/50 flex items-center justify-center p-8 overflow-hidden">
            <img
              src={EDITORIAL_IMAGE}
              alt="FUME Fragrance Story"
              className="w-full h-full object-cover filter grayscale opacity-90 transition-transform duration-1000 hover:scale-105"
              loading="eager"
            />
          </div>

          <div className="space-y-10 lg:pl-8">
            <div className="flex items-center gap-4">
              <span className="w-12 h-[1px] bg-shadow/20" />
              <span className="text-[10px] uppercase tracking-[0.4em] text-shadow font-semibold">
                THE GENESIS
              </span>
            </div>

            <div className="space-y-6 text-sm md:text-[15px] font-sans font-light leading-[1.8] text-shadow/90">
              <p>
                I didn't start Fume simply because I wanted to start a business.
                I started it because I believed in something.
                A passion that had already been bringing me compliments, questions, and curiosity from people around the world.
              </p>
              <p>
                In 2024, at just 24 years old, I decided to turn that belief into something of my own. At that time, I was also stepping into one of the most beautiful and transformative chapters of my life — becoming a mother.
              </p>
              <p>
                But building a brand while preparing for motherhood taught me that passion alone isn't enough. You have to be willing to do the work — all of it.
                From the very first printing to developing fragrances, working on packaging, managing orders, and personally dispatching them, I was involved in every little detail of Fume.
              </p>
              <p>
                I continued building and growing the brand throughout my journey, right up until my last trimester.
                I attended events, took Fume with me, introduced people to the brand, listened to their feedback, and connected with customers. Every response, every compliment, and every conversation gave me another reason to keep going.
              </p>
              <p>
                For me, Fume was never just about selling perfumes.
                It became a reflection of what I believed a woman could create when she trusted herself enough to begin.
                I was building a brand while preparing for motherhood — balancing ambition with a completely new chapter of life.
              </p>
              <p>
                And perhaps that is what makes Fume so deeply personal to me.
                Because behind every bottle is a part of my journey —
                the risks I took, the hard work, the sleepless nights, the courage to keep going, and above all, the love I put into what I was building.
              </p>
              <p className="font-serif text-lg md:text-xl italic text-shadow pt-6 leading-relaxed">
                This is the story of how Fume began.<br/>
                And this is only the beginning.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="space-y-16 border-t border-shadow/[0.08] pt-24">
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-4">
            <span className="text-[10px] uppercase tracking-[0.4em] text-shadow/50 font-sans font-medium block">
              PURPOSE & DIRECTION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal uppercase tracking-[0.16em] text-shadow">
              MISSION & VISION
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
            
            {/* Mission */}
            <div className="space-y-8">
              <div className="flex items-center justify-between border-b border-shadow/[0.08] pb-6">
                <span className="text-[10px] uppercase tracking-[0.3em] text-shadow font-semibold">
                  OUR MISSION
                </span>
                <span className="text-shadow/30 font-sans text-sm">01</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal uppercase tracking-[0.14em] text-shadow leading-snug">
                MAKING QUALITY ACCESSIBLE TO EVERYONE
              </h3>
              <p className="text-sm font-sans font-light leading-[1.85] text-shadow/80">
                Our mission is to make authentic, high-quality fragrances accessible to everyone. We believe exceptional fragrance should not come with an unreasonable price tag, which is why we are committed to offering beautifully crafted, authentic products at prices that remain genuinely accessible.
              </p>
            </div>

            {/* Vision */}
            <div className="space-y-8">
              <div className="flex items-center justify-between border-b border-shadow/[0.08] pb-6">
                <span className="text-[10px] uppercase tracking-[0.3em] text-shadow font-semibold">
                  OUR VISION
                </span>
                <span className="text-shadow/30 font-sans text-sm">02</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal uppercase tracking-[0.14em] text-shadow leading-snug">
                PAKISTAN'S LEADING FRAGRANCE BRAND
              </h3>
              <p className="text-sm font-sans font-light leading-[1.85] text-shadow/80">
                Our vision is to establish Fume as one of Pakistan's leading fragrance brands — a name recognised for its authenticity, uncompromising quality, accessibility, and the trust we build with every customer.
              </p>
            </div>

          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center pt-16 pb-12">
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 justify-center w-full sm:w-auto">
            <button
              onClick={onShopPerfumes}
              className="w-full sm:w-auto px-12 py-5 bg-shadow text-pearl hover:bg-shadow/90 text-[10px] uppercase tracking-[0.3em] font-sans transition-all cursor-pointer"
            >
              EXPLORE THE COLLECTION
            </button>
            <button
              onClick={onOpenContact}
              className="w-full sm:w-auto px-12 py-5 bg-transparent border border-shadow text-shadow hover:bg-shadow hover:text-pearl text-[10px] uppercase tracking-[0.3em] font-sans transition-all cursor-pointer"
            >
              SPEAK TO AN ADVISOR
            </button>
          </div>
        </section>

      </div>
    </article>
  );
};
