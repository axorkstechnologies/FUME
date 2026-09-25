import React from 'react';
import { motion } from 'motion/react';
import { EDITORIAL_IMAGE, CAMPAIGN_IMAGE, FRAGRANCES } from '../data/fragrances';
import { ThemeMode } from '../types';
import { Droplets, Shield, Compass, ArrowRight, Heart, Award, MessageCircle } from 'lucide-react';
import { FlaconBottle } from './FlaconBottle';

interface StoryViewProps {
  onShopPerfumes: () => void;
  onOpenContact: () => void;
  themeMode: ThemeMode;
}

export const StoryView: React.FC<StoryViewProps> = ({
  onShopPerfumes,
  onOpenContact,
  themeMode
}) => {
  const isLight = themeMode === 'light';

  return (
    <article
      className="relative w-full min-h-screen pt-28 sm:pt-32 pb-32 px-5 sm:px-8 md:px-12 lg:px-16 bg-pearl text-shadow"
    >
      <div className="max-w-[1600px] mx-auto space-y-20 md:space-y-28">
        {/* Section 1: Hero / Opening Statement (AEO/GEO Structured Header) */}
        <header className="text-center space-y-5 max-w-4xl mx-auto">
          <nav aria-label="Breadcrumb" className="flex items-center justify-center flex-wrap gap-2 text-[10px] uppercase tracking-[0.35em] text-dusty-rose font-sans font-medium">
            <span>HOME</span>
            <span>/</span>
            <span>OUR STORY</span>
            <span className="w-1.5 h-1.5 rounded-full bg-dusty-rose mx-1" />
            <span>EST. 2024</span>
            <span className="w-1.5 h-1.5 rounded-full bg-dusty-rose mx-1" />
            <span>PAKISTAN</span>
          </nav>

          <h1
            className={`font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal uppercase tracking-[0.14em] leading-tight ${
              'text-shadow'
            }`}
          >
            THE STORY OF FUME FRAGRANCES
          </h1>

          {/* Core Entity & Direct Answer Summary for Search & AI Engines */}
          <p
            className={`text-sm sm:text-base md:text-lg font-sans font-light tracking-wide leading-relaxed max-w-3xl mx-auto ${
              'text-shadow/60'
            }`}
          >
            FUME FRAGRANCES (officially registered as FUME FRAGRANCES (SMC-PRIVATE) LIMITED) is an independent Pakistani luxury fragrance house founded in 2024 by a 24-year-old mother and artisan. Created to eliminate the divide between hyper-inflated imported perfumes and short-lived dilutions, FUME FRAGRANCES makes authentic, long-lasting Eau de Parfum accessible to fragrance lovers across Pakistan.
          </p>
        </header>

        {/* Section 2: The Story Behind Fume (Narrative & First-Person Voice) */}
        <section aria-labelledby="story-behind-fume" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 relative">
            <div className="aspect-[16/10] overflow-hidden rounded-xs border border-dusty-rose/40 relative group shadow-2xl">
              <img
                src={EDITORIAL_IMAGE}
                alt="FUME Fragrance Atelier Formulation in Pakistan"
                className="w-full h-full object-cover object-center filter grayscale-[10%] group-hover:scale-105 transition-transform duration-1000"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pearl/75 via-pearl/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-[10px] uppercase tracking-[0.28em] text-pearl font-sans">
                <span>HAND-CRAFTED IN PAKISTAN</span>
                <span className="text-dusty-rose">AUTHENTIC BATCH #F8F4F0</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6 lg:pl-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-[1px] bg-dusty-rose" />
              <span className="text-[10px] uppercase tracking-[0.35em] text-dusty-rose font-sans font-medium">
                CHAPTER I • THE GENESIS
              </span>
            </div>

            <h2
              id="story-behind-fume"
              className={`font-serif text-2xl sm:text-3xl md:text-4xl font-normal uppercase tracking-[0.14em] leading-snug ${
                'text-shadow'
              }`}
            >
              BORN FROM BELIEF, NOT JUST BUSINESS
            </h2>

            <div className={`space-y-4 text-xs sm:text-sm font-sans font-light leading-relaxed ${
              'text-shadow/60'
            }`}>
              <p>
                I didn’t start Fume simply because I wanted to start a business. I started it because I believed in something deeper.
              </p>
              <p>
                Growing up with an obsession for scents, I witnessed a frustrating divide in Pakistan’s fragrance market: on one side were imported designer bottles priced at Rs 35,000 to Rs 60,000, often out of reach and plagued by grey-market replicas. On the other side were fleeting synthetic sprays that vanished within thirty minutes of stepping out into our warm climate.
              </p>
              <p>
                I believed that fragrance is never just an accessory. It is an intimate expression of dignity, memory, and presence. Everyone deserves to wear a scent that stays with them throughout the day, uplifting their spirit without demanding an exorbitant financial sacrifice.
              </p>
            </div>

            {/* Founder's Statement Callout Box */}
            <div
              className={`p-6 border rounded-xs space-y-3 shadow-sm ${
                'border-sand bg-pearl/70 text-shadow'
              }`}
            >
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-dusty-rose font-medium font-sans">
                <Heart className="w-3.5 h-3.5 text-dusty-rose" />
                <span>FOUNDER'S CREED • FOUNDED AT 24</span>
              </div>
              <blockquote className="font-serif italic text-sm sm:text-base leading-relaxed text-dusty-rose">
                &ldquo;True luxury is not defined by a foreign label or an unattainable price. It is defined by how long the scent lingers on your skin, how deeply it moves you, and how honestly it was made.&rdquo;
              </blockquote>
            </div>
          </div>
        </section>

        {/* Section 3: Founder Journey (24-Year-Old Founder + Motherhood Signal) */}
        <section aria-labelledby="founder-journey" className={`p-8 sm:p-12 lg:p-16 rounded-xs border relative overflow-hidden ${
          'bg-pearl border-shadow/10'
        }`}>
          <div className="max-w-4xl mx-auto space-y-8 text-center sm:text-left">
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-[0.35em] text-dusty-rose font-sans font-medium block">
                CHAPTER II • THE FOUNDER'S JOURNEY
              </span>
              <h2
                id="founder-journey"
                className={`font-serif text-2xl sm:text-3xl md:text-4xl font-normal uppercase tracking-[0.14em] ${
                  'text-shadow'
                }`}
              >
                MOTHERHOOD, GRIT &amp; BUILDING FUME AT 24
              </h2>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm font-sans font-light leading-relaxed ${
              'text-shadow/60'
            }`}>
              <div className="space-y-4">
                <p>
                  At 24 years old, navigating the profound responsibilities of early motherhood, deciding to formulate and launch an artisanal luxury perfume house in Pakistan was an audacious path. Holding my newborn child in my arms gave me a quiet, unwavering resolve: if I wanted something truly genuine, lasting, and beautiful to exist in the world for my family and community, I had to build it myself.
                </p>
                <p>
                  Late nights of caring for my baby seamlessly blurred into early mornings of olfactory chemistry. In our small studio, I spent months analyzing perfume oil densities, studying heart-note volatilization, and testing botanical macerations on fabric and skin across long Pakistani summer days.
                </p>
              </div>

              <div className="space-y-4">
                <p>
                  I stubbornly rejected dozens of commercial formulations that smelled pleasant in the first ten seconds but fell apart two hours later. FUME had to be different. Every blend had to possess architectural weight: genuine European flint glass flacons, authentic perfume oil concentrations (22% to 28%), and an unmistakable, all-day sillage that commands respect.
                </p>
                <p>
                  Fume was never created in a detached corporate boardroom. It was built with maternal resilience, relentless perseverance, and an uncompromising love for scent right here in Pakistan.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 & 5: Our Mission & Our Vision (AEO/GEO Highlight Grid) */}
        <section aria-labelledby="mission-vision" className="space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-[10px] uppercase tracking-[0.4em] text-dusty-rose font-sans font-medium block">
              PURPOSE &amp; DIRECTION • SINCE 2024
            </span>
            <h2
              id="mission-vision"
              className={`font-serif text-3xl sm:text-4xl font-normal uppercase tracking-[0.14em] ${
                'text-shadow'
              }`}
            >
              MISSION &amp; VISION
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Our Mission Card */}
            <div
              className={`p-8 sm:p-10 border rounded-xs space-y-5 transition-all duration-300 hover:border-dusty-rose ${
                'border-sand bg-white shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.3em] text-dusty-rose font-sans font-semibold">
                  OUR MISSION
                </span>
                <Award className="w-5 h-5 text-dusty-rose" />
              </div>
              <h3
                className={`font-serif text-xl sm:text-2xl uppercase tracking-[0.12em] ${
                  'text-shadow'
                }`}
              >
                MAKING AUTHENTIC LUXURY ACCESSIBLE TO EVERYONE
              </h3>
              <p
                className={`text-xs sm:text-sm font-sans font-light leading-relaxed ${
                  'text-shadow/60'
                }`}
              >
                Our mission is to make authentic, master-crafted fragrances accessible to everyone in Pakistan. We deliver genuine Eau de Parfum concentrations with long-lasting sillage, transparent pricing, and uncompromising presentation, without the 10x international retail markups.
              </p>
              <div className="pt-2 text-[10px] uppercase tracking-[0.25em] text-dusty-rose font-sans font-medium">
                HONEST FORMULATION · PAKISTAN-FIRST ACCESSIBILITY
              </div>
            </div>

            {/* Our Vision Card */}
            <div
              className={`p-8 sm:p-10 border rounded-xs space-y-5 transition-all duration-300 hover:border-dusty-rose ${
                'border-sand bg-white shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.3em] text-dusty-rose font-sans font-semibold">
                  OUR VISION
                </span>
                <Compass className="w-5 h-5 text-dusty-rose" />
              </div>
              <h3
                className={`font-serif text-xl sm:text-2xl uppercase tracking-[0.12em] ${
                  'text-shadow'
                }`}
              >
                ESTABLISHING PAKISTAN’S PREMIER SCENT MAISON
              </h3>
              <p
                className={`text-xs sm:text-sm font-sans font-light leading-relaxed ${
                  'text-shadow/60'
                }`}
              >
                Our vision is to establish FUME as Pakistan’s leading and most trusted artisanal fragrance house. We are building a homegrown brand that stands proudly alongside heritage European parfumeries, proving that world-class sillage, bottle architecture, and olfactory poetry can be created right here.
              </p>
              <div className="pt-2 text-[10px] uppercase tracking-[0.25em] text-dusty-rose font-sans font-medium">
                TIMELESS SILLAGE • HOMEGROWN EXCELLENCE
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Why Fume Exists (The Four Core Differentiators) */}
        <section aria-labelledby="why-fume-exists" className="space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-[10px] uppercase tracking-[0.4em] text-dusty-rose font-sans font-medium block">
              OUR PILLARS • WHAT MAKES FUME DIFFERENT
            </span>
            <h2
              id="why-fume-exists"
              className={`font-serif text-3xl sm:text-4xl font-normal uppercase tracking-[0.14em] ${
                'text-shadow'
              }`}
            >
              WHY FUME EXISTS
            </h2>
            <p className={`text-xs sm:text-sm font-sans font-light tracking-wide ${
              'text-shadow/60'
            }`}>
              Four non-negotiable standards that distinguish every FUME flacon.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Droplets,
                tag: 'CONCENTRATION',
                title: 'TRUE 14HR ALL-DAY SILLAGE',
                text: 'Every flacon is blended at an uncompromised 22 to 28% pure perfume oil concentration, tested rigorously to endure Pakistan’s heat and busy lifestyles.'
              },
              {
                icon: Shield,
                tag: 'BOTANICAL PURITY',
                title: 'AUTHENTIC FORMULATION',
                text: 'We formulate using natural floral absolutes, aged resinous woods, and rich spices. Macerated slowly in small batches without harsh synthetic fillers.'
              },
              {
                icon: Award,
                tag: 'ACCESSIBILITY',
                title: 'FAIR PKR PRICING (RS 1,899 TO 2,499)',
                text: 'We bypass foreign brand royalties and retailer markups, bringing heavy flint glass flacons to Pakistani collectors at fair, transparent prices.'
              },
              {
                icon: Heart,
                tag: 'PERSONAL CARE',
                title: 'FOUNDER-LED CONCIERGE',
                text: 'Every order is packed with personal care, complete with a matching 2ml test vial and direct WhatsApp support to ensure you love your signature scent.'
              }
            ].map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className={`p-7 border rounded-xs space-y-4 transition-all duration-300 hover:-translate-y-1 ${
                    'border-sand bg-white hover:border-dusty-rose shadow-sm'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full border border-dusty-rose/40 flex items-center justify-center text-dusty-rose">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase tracking-widest text-dusty-rose font-sans font-medium">
                      {pillar.tag}
                    </span>
                    <h3
                      className={`font-serif text-base uppercase tracking-wider ${
                        'text-shadow'
                      }`}
                    >
                      {pillar.title}
                    </h3>
                  </div>
                  <p
                    className={`text-xs font-sans font-light leading-relaxed ${
                      'text-shadow/60'
                    }`}
                  >
                    {pillar.text}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 7: Closing Statement Inviting Connection */}
        <section aria-labelledby="closing-invitation" className={`border p-8 sm:p-14 lg:p-16 rounded-xs relative overflow-hidden ${
          'border-sand bg-pearl/70'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.35em] text-dusty-rose font-sans font-medium block">
                  AN INVITATION FROM OUR FOUNDER
                </span>
                
              </div>

              <h2
                id="closing-invitation"
                className={`font-serif text-3xl sm:text-4xl font-normal uppercase tracking-[0.14em] leading-snug ${
                  'text-shadow'
                }`}
              >
                FIND YOUR INDELIBLE SIGNATURE
              </h2>

              <div className={`space-y-4 text-xs sm:text-sm font-sans font-light leading-relaxed ${
                'text-shadow/60'
              }`}>
                <p>
                  Fragrance is the most intimate form of memory. When you spray FUME, you are wearing countless hours of maternal persistence, artisanal formulation, and our steadfast belief that high luxury belongs to you.
                </p>
                <p>
                  Whether you are seeking the fresh luminous floral mist of <em>BLOOM</em>, the smoky amber sillage of <em>DESERT</em>, or the nocturnal richness of <em>ARAB</em>, we invite you to discover our archive. We are honored to be part of your story.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={onShopPerfumes}
                  className="px-8 py-3.5 bg-oyster text-pearl hover:bg-dusty-rose hover:text-pearl transition-colors uppercase tracking-[0.25em] text-[11px] font-sans font-medium cursor-pointer"
                >
                  EXPLORE THE COLLECTION
                </button>
                <a
                  href="https://wa.me/923132970468?text=Hello%20FUME%20FRAGRANCES%2C%20I%20read%20your%20story%20and%20would%20love%20to%20find%20my%20signature%20scent."
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-8 py-3.5 border transition-colors uppercase tracking-[0.25em] text-[11px] font-sans font-medium cursor-pointer inline-flex items-center gap-2 ${
                    'border-dusty-rose text-shadow hover:bg-pearl'
                  }`}
                >
                  <MessageCircle className="w-3.5 h-3.5 text-dusty-rose" />
                  <span>WHATSAPP THE FOUNDER (+92 313 297 0468)</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <FlaconBottle
                fragrance={FRAGRANCES[0]}
                variant="card"
                themeMode={themeMode}
                className="aspect-[4/5] rounded-xs shadow-xl"
              />
              <div className="aspect-[4/5] rounded-xs overflow-hidden border border-dusty-rose/30 relative shadow-xl">
                <img
                  src={CAMPAIGN_IMAGE}
                  alt="FUME Luxury Flacon Presentation in Pakistan"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pearl/60 to-transparent pointer-events-none" />
                <span className="absolute bottom-3 left-3 text-[9px] uppercase tracking-[0.25em] text-shadow font-sans font-medium">
                  SINCE 2024 • PAKISTAN
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
};

export default StoryView;

