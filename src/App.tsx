import React, { useState, useEffect } from 'react';
import { Fragrance, CartItem, ScreenView, ThemeMode, Film } from './types';
import { FRAGRANCES } from './data/fragrances';
import { FILMS } from './data/films';
import { AmbientCanvas } from './components/AmbientCanvas';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { BrandMarquee } from './components/BrandMarquee';
import { ReelStrip } from './components/ReelStrip';
import { FeaturedCollection } from './components/FeaturedCollection';
import { EditorialBrand } from './components/EditorialBrand';
import { FragranceDiscovery } from './components/FragranceDiscovery';
import { ReelViewerModal } from './components/ReelViewerModal';
import { CampaignLookbook } from './components/CampaignLookbook';
import { BrandStatement } from './components/BrandStatement';
import { Footer } from './components/Footer';
import { PerfumesView } from './components/PerfumesView';
import { CollectionsView } from './components/CollectionsView';
import { CartDrawer } from './components/CartDrawer';
import { FlaconDetailModal } from './components/FlaconDetailModal';
import { SearchModal } from './components/SearchModal';
import { ScentQuizModal } from './components/ScentQuizModal';
import { StoryModal } from './components/StoryModal';
import { ContactModal } from './components/ContactModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { CustomScentAtelier } from './components/CustomScentAtelier';
import { StoryView } from './components/StoryView';
import { ContactView } from './components/ContactView';
import { CareView } from './components/CareView';
import { resetScrollLock } from './utils/scrollLock';
import { getPrice50, getPrice100 } from './utils/pricing';
import { SEOSchema } from './components/SEOSchema';

export function App() {
  const getInitialView = (): ScreenView => {
    if (typeof window === 'undefined') return 'home';
    const hash = window.location.hash.replace('#', '');
    const validViews: ScreenView[] = ['home', 'perfumes', 'collections', 'films', 'story', 'contact', 'care'];
    if (!hash) return 'home';
    return validViews.includes(hash as ScreenView) ? (hash as ScreenView) : 'not-found';
  };
  const [currentView, setCurrentView] = useState<ScreenView>(getInitialView);

  // Sync hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validViews: ScreenView[] = ['home', 'perfumes', 'collections', 'films', 'story', 'contact', 'care'];
      if (hash === '') {
        setCurrentView('home');
      } else if (validViews.includes(hash as ScreenView)) {
        setCurrentView(hash as ScreenView);
      } else {
        setCurrentView('not-found');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const [selectedFragrance, setSelectedFragrance] = useState<Fragrance | null>(null);
  const [activeReelFilm, setActiveReelFilm] = useState<Film | null>(null);

  // Dark premium theme system
  const themeMode: ThemeMode = 'light';

  // Cart State with Local Persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('fume_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map((item: any) => {
          const fid = item.fragrance?.id || '';
          const exactFragrance = FRAGRANCES.find((f) => f.id === fid) || item.fragrance;
          const p50 = getPrice50(fid);
          const p100 = getPrice100(p50);
          const currentPrice = item.size === '100ml' ? p100 : p50;
          return { ...item, fragrance: exactFragrance, price: currentPrice };
        });
      }
    } catch {
      // Ignore
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('fume_cart', JSON.stringify(cartItems));
    } catch {
      // Ignore
    }
  }, [cartItems]);

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Dynamic SEO / AEO / GEO Metadata per view
  useEffect(() => {
    const titles: Record<ScreenView, string> = {
      home: 'FUME FRAGRANCES | Your Scent. Your Story. Eau de Parfum',
      perfumes: 'All Perfumes | FUME FRAGRANCES : Artisanal Parfumerie in Pakistan',
      collections: 'Haute Collections | FUME FRAGRANCES : Curated Scent Families',
      story: 'Our Story & Founder Creed | FUME FRAGRANCES Pakistan',
      contact: 'Concierge & Bespoke Service | FUME FRAGRANCES',
      care: 'Client Care, Shipping & FAQs | FUME FRAGRANCES',
      films: 'FUME on Film | Authentic Customer Experiences & Unboxing',
      'not-found': 'Page Not Found | FUME FRAGRANCES'
    };
    const descriptions: Record<ScreenView, string> = {
      home: 'FUME FRAGRANCES: Authentic premium Eau de Parfum hand-crafted in Pakistan. Crafted with premium ingredients, all-day presence, and nationwide Cash on Delivery.',
      perfumes: 'Explore all 24 premium Eau de Parfum creations by FUME. Hand-formulated in Karachi and bottled in architectural flint glass with free 2ml discovery vials.',
      collections: 'Discover curated fragrance collections across Fresh, Floral, Oriental, and Woody olfactory families. Tested for Pakistan warm climates.',
      story: 'The story behind FUME FRAGRANCES: making authentic, master-crafted fragrances accessible across Pakistan without international retail markups.',
      contact: 'Connect with the FUME Concierge for bespoke flacon engraving, scent consultations, and WhatsApp orders across Pakistan.',
      care: 'Client Care & FAQs: Shipping timelines, nationwide Cash on Delivery, 30-day returns, and our complimentary 2ml discovery vial guarantee.',
      films: 'Watch authentic unboxing and review films from fragrance lovers across Pakistan wearing FUME Eau de Parfum.',
      'not-found': 'The page you are looking for does not exist.'
    };
    document.title = titles[currentView] || titles.home;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', descriptions[currentView] || descriptions.home);
    }
  }, [currentView]);

  // Clean scroll lock reset and native scroll to top on view change
  useEffect(() => {
    resetScrollLock();
  }, [currentView]);

  const handleNavigate = (view: ScreenView) => {
    resetScrollLock();
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'auto' });
    if(view === 'home') {
      window.history.pushState(null, '', window.location.pathname);
    } else {
      window.location.hash = view;
    }
  };

  const handleAddToCart = (
    fragrance: Fragrance,
    size: '50ml' | '100ml' = '50ml',
    price?: number
  ) => {
    const p50 = getPrice50(fragrance.id);
    const p100 = getPrice100(p50);
    const resolvedPrice = price !== undefined ? price : (size === '100ml' ? p100 : p50);

    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (i) => i.fragrance.id === fragrance.id && i.size === size
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      }
      return [...prev, { fragrance, quantity: 1, size, price: resolvedPrice }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCartItems((prev) => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const scrollToEssence = () => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById('essence-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('essence-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };



  return (
    <div
      className="min-h-screen relative flex flex-col font-sans selection:bg-dusty-rose selection:text-shadow bg-pearl text-shadow"
    >
      {/* Dynamic SEO JSON-LD injection */}
      <SEOSchema />
      
      {/* Dynamic Animated Ambient Colors & Moving Particles Canvas */}
      <AmbientCanvas themeMode={themeMode} />

      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full relative z-10">
        {currentView === 'home' && (
          <>
            {/* 1. HERO SECTION with Animated Floating Flacon & Aura */}
            <HeroSection
              onShopPerfumes={() => handleNavigate('perfumes')}
              onExploreFume={scrollToEssence}
              onOpenQuiz={() => setIsQuizOpen(true)}
              themeMode={themeMode}
            />

            {/* ANIMATED premium MARQUEE TICKER */}
            <BrandMarquee themeMode={themeMode} />

            {/* 2. FEATURED PERFUMES (THE COLLECTION) — Dark Glass Cards */}
            <FeaturedCollection
              fragrances={FRAGRANCES}
              onSelectFragrance={(f) => setSelectedFragrance(f)}
              onAddToCart={(f) => handleAddToCart(f)}
              themeMode={themeMode}
            />

            {/* 3. EDITORIAL BRAND SECTION */}
            <EditorialBrand
              onExploreCollection={() => handleNavigate('perfumes')}
              themeMode={themeMode}
            />

            {/* 4. FRAGRANCE DISCOVERY with Category Filters */}
            <FragranceDiscovery
              fragrances={FRAGRANCES}
              onSelectFragrance={(f) => setSelectedFragrance(f)}
              onAddToCart={(f) => handleAddToCart(f)}
              onViewAllPerfumes={() => handleNavigate('perfumes')}
              themeMode={themeMode}
            />

            {/* 5. HIGH-END CAMPAIGN LOOKBOOK (Uncropped Images) */}
            <CampaignLookbook />

            {/* 5.5 CUSTOM SCENT ATELIER */}
            <CustomScentAtelier onOpenContact={() => setIsContactOpen(true)} />

            {/* 6. SEEN ON FILM — horizontal autoplay portrait reel strip */}
            <ReelStrip
              films={FILMS}
              onOpenReel={(film) => setActiveReelFilm(film)}
            />

            {/* 7. VERIFIED CLIENT TESTIMONIALS */}

            {/* 8. BRAND STATEMENT with Since 2024 */}
            <BrandStatement themeMode={themeMode} />
          </>
        )}

        {currentView === 'films' && (
          <div className="pt-40 pb-32 bg-pearl min-h-screen border-t border-shadow/[0.08]">
            <div className="text-center space-y-6 max-w-2xl mx-auto px-6 mb-20">
              <span className="text-[10px] uppercase tracking-[0.4em] text-dusty-rose font-sans font-medium block">
                THE ARCHIVE
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl uppercase tracking-[0.16em] text-shadow leading-tight">
                FUME ON FILM
              </h2>
              <p className="text-[10px] font-sans text-shadow/70 uppercase tracking-widest max-w-md mx-auto leading-relaxed">
                Authentic unboxings, reviews, and editorial captures from the FUME community.
              </p>
            </div>
            <div className="w-full">
              <ReelStrip films={FILMS} onOpenReel={(film) => setActiveReelFilm(film)} />
            </div>
          </div>
        )}

        {currentView === 'perfumes' && (
          <PerfumesView
            fragrances={FRAGRANCES}
            onSelectFragrance={(f) => setSelectedFragrance(f)}
            onAddToCart={(f) => handleAddToCart(f)}
            themeMode={themeMode}
          />
        )}

        {currentView === 'collections' && (
          <CollectionsView
            fragrances={FRAGRANCES}
            onShopPerfumes={() => handleNavigate('perfumes')}
            onSelectFragrance={(f) => setSelectedFragrance(f)}
            themeMode={themeMode}
          />
        )}

        {currentView === 'story' && (
          <StoryView
            onShopPerfumes={() => handleNavigate('perfumes')}
            onOpenContact={() => handleNavigate('contact')}
            themeMode={themeMode}
          />
        )}

        {currentView === 'contact' && (
          <ContactView
            themeMode={themeMode}
          />
        )}

        {currentView === 'care' && (
          <CareView
            onNavigateToContact={() => handleNavigate('contact')}
            onShopPerfumes={() => handleNavigate('perfumes')}
            themeMode={themeMode}
          />
        )}
      </main>

      {/* 7. FOOTER */}
      <Footer
        onNavigate={handleNavigate}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenStory={() => setIsStoryOpen(true)}
        themeMode={themeMode}
      />

      {/* Product Detail Modal */}
      <FlaconDetailModal
        fragrance={selectedFragrance}
        onClose={() => setSelectedFragrance(null)}
        onAddToCart={handleAddToCart}
        onOpenReel={(film) => setActiveReelFilm(film)}
        themeMode={themeMode}
      />

      {/* Full-Screen Vertical Reel Viewer */}
      <ReelViewerModal
        isOpen={Boolean(activeReelFilm)}
        films={FILMS}
        initialFilmId={activeReelFilm?.id}
        fragrances={FRAGRANCES}
        onClose={() => setActiveReelFilm(null)}
        onSelectFragrance={(f) => setSelectedFragrance(f)}
        themeMode={themeMode}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        themeMode={themeMode}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        fragrances={FRAGRANCES}
        onSelectFragrance={(f) => setSelectedFragrance(f)}
        themeMode={themeMode}
      />



      {/* Scent Finder Quiz Modal */}
      <ScentQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSelectFragrance={(f) => setSelectedFragrance(f)}
        onAddToCart={(f) => handleAddToCart(f)}
      />

      {/* Story Modal */}
      <StoryModal
        isOpen={isStoryOpen}
        onClose={() => setIsStoryOpen(false)}
        themeMode={themeMode}
      />

      {/* Contact & Concierge Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        themeMode={themeMode}
      />

      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp />
    </div>
  );
}
export default App;
