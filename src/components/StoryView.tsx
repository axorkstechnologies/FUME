import React from 'react';
import { EDITORIAL_IMAGE } from '../data/fragrances';
import { ThemeMode } from '../types';
import { Compass, Award, MessageCircle } from 'lucide-react';

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
    <article
      className="relative w-full min-h-screen pt-32 pb-32 px-5 sm:px-8 md:px-12 lg:px-16 bg-pearl text-shadow font-sans"
    >
      <div className="max-w-[1400px] mx-auto space-y-24 md:space-y-32">
        {/* Section 1: Hero */}
        <header className="text-center space-y-6 max-w-4xl mx-auto">
          <nav aria-label="Breadcrumb" className="flex items-center justify-center flex-wrap gap-2 text-[10px] uppercase tracking-[0.4em] text-dusty-rose font-medium">
            <span>HOME</span>
            <span>/</span>
            <span>OUR STORY</span>
            <span className="w-1.5 h-1.5 rounded-full bg-dusty-rose mx-1" />
            <span>EST. 2024</span>
          </nav>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal uppercase tracking-[0.14em] leading-tight text-shadow">
            THE STORY BEHIND FUME
          </h1>

          <p className="text-sm sm:text-base font-normal tracking-wide leading-relaxed max-w-2xl mx-auto text-shadow/80">
            FUME FRAGRANCES is an independent Pakistani fragrance house founded in 2024. Created to eliminate the divide between hyper-inflated imported perfumes and short-lived dilutions, FUME makes authentic, long-lasting Eau de Parfum accessible to fragrance lovers across Pakistan.
          </p>
        </header>

        {/* Section 2: The Core Narrative */}
        <section aria-labelledby="story-behind-fume" className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative w-full">
            <div className="w-full overflow-hidden rounded-sm relative group shadow-[0_20px_60px_rgba(18,17,16,0.08)] bg-oyster border border-shadow/[0.08]">
              <img
                src={EDITORIAL_IMAGE}
                alt="FUME Fragrance Story Founder Journey"
                className="w-full h-auto object-contain filter transition-transform duration-1000 group-hover:scale-[1.02]"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pearl/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          <div className="space-y-8 lg:pt-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-[1px] bg-dusty-rose" />
              <span className="text-[10px] uppercase tracking-[0.35em] text-dusty-rose font-semibold">
                THE GENESIS
              </span>
            </div>

            <div className="space-y-5 text-sm md:text-base font-normal leading-relaxed text-shadow">
              <p>
                I didn’t start Fume simply because I wanted to start a business.
                I started it because I believed in something.
                A passion that had already been bringing me compliments, questions, and curiosity from people around the world.
              </p>
              <p>
                In 2024, at just 24 years old, I decided to turn that belief into something of my own. At that time, I was also stepping into one of the most beautiful and transformative chapters of my life — becoming a mother.
              </p>
              <p>
                But building a brand while preparing for motherhood taught me that passion alone isn’t enough. You have to be willing to do the work — all of it.
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
              <p className="font-medium text-shadow pt-3 text-base">
                This is the story of how Fume began.<br/>
                And this is only the beginning.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Our Mission & Our Vision */}
        <section aria-labelledby="mission-vision" className="space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-[10px] uppercase tracking-[0.4em] text-dusty-rose font-semibold block">
              PURPOSE &amp; DIRECTION
            </span>
            <h2
              id="mission-vision"
              className="font-serif text-3xl sm:text-4xl font-normal uppercase tracking-[0.14em] text-shadow"
            >
              MISSION &amp; VISION
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Our Mission Card */}
            <div className="p-8 sm:p-10 md:p-12 border border-shadow/[0.1] rounded-sm space-y-6 bg-white shadow-sm transition-all duration-300 hover:border-dusty-rose hover:shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.3em] text-dusty-rose font-semibold">
                  OUR MISSION
                </span>
                <Award className="w-5 h-5 text-dusty-rose" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-normal uppercase tracking-[0.12em] text-shadow leading-snug">
                MAKING QUALITY ACCESSIBLE TO EVERYONE
              </h3>
              <p className="text-xs sm:text-sm font-normal leading-relaxed text-shadow/80">
                Our mission is to make authentic, master-crafted fragrances accessible to everyone in Pakistan. We deliver genuine Eau de Parfum concentrations with long-lasting presence, transparent pricing, and uncompromising presentation.
              </p>
              <div className="pt-2 text-[10px] uppercase tracking-[0.25em] text-dusty-rose font-medium">
                HONEST FORMULATION · PAKISTAN-FIRST ACCESSIBILITY
              </div>
            </div>

            {/* Our Vision Card */}
            <div className="p-8 sm:p-10 md:p-12 border border-shadow/[0.1] rounded-sm space-y-6 bg-white shadow-sm transition-all duration-300 hover:border-dusty-rose hover:shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.3em] text-dusty-rose font-semibold">
                  OUR VISION
                </span>
                <Compass className="w-5 h-5 text-dusty-rose" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-normal uppercase tracking-[0.12em] text-shadow leading-snug">
                ESTABLISHING PAKISTAN’S PREMIER SCENT MAISON
              </h3>
              <p className="text-xs sm:text-sm font-normal leading-relaxed text-shadow/80">
                Our vision is to establish FUME as Pakistan’s leading and most trusted artisanal fragrance house. We are building a homegrown brand that proves world-class formulation and olfactory poetry can be created right here.
              </p>
              <div className="pt-2 text-[10px] uppercase tracking-[0.25em] text-dusty-rose font-medium">
                TIMELESS PRESENCE • HOMEGROWN EXCELLENCE
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center pt-8 pb-4">
          <div className="inline-flex flex-col sm:flex-row items-center gap-5 justify-center">
            <button
              onClick={onShopPerfumes}
              className="w-full sm:w-auto px-10 py-4 bg-shadow text-pearl hover:bg-dusty-rose hover:text-pearl text-[11px] uppercase tracking-[0.25em] font-semibold transition-all shadow-md active:scale-[0.98] cursor-pointer"
            >
              EXPLORE THE COLLECTION
            </button>
            <button
              onClick={onOpenContact}
              className="w-full sm:w-auto px-10 py-4 bg-transparent border border-shadow text-shadow hover:bg-shadow hover:text-pearl text-[11px] uppercase tracking-[0.25em] font-semibold transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-3"
            >
              <MessageCircle className="w-4 h-4" />
              <span>SPEAK TO AN ADVISOR</span>
            </button>
          </div>
        </section>
      </div>
    </article>
  );
};
