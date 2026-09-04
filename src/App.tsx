import React, { useState, useEffect } from 'react';
import { Fragrance, CartItem, ScreenView, ThemeMode } from './types';
import { FRAGRANCES } from './data/fragrances';
import { AmbientCanvas } from './components/AmbientCanvas';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { BrandMarquee } from './components/BrandMarquee';
import { FeaturedCollection } from './components/FeaturedCollection';
import { EditorialBrand } from './components/EditorialBrand';
import { FragranceDiscovery } from './components/FragranceDiscovery';
import { CampaignBanner } from './components/CampaignBanner';
import { BrandStatement } from './components/BrandStatement';
import { Footer } from './components/Footer';
import { PerfumesView } from './components/PerfumesView';
import { CollectionsView } from './components/CollectionsView';
import { CartDrawer } from './components/CartDrawer';
import { FlaconDetailModal } from './components/FlaconDetailModal';
import { SearchModal } from './components/SearchModal';
import { AccountModal } from './components/AccountModal';
import { StoryModal } from './components/StoryModal';
import { ContactModal } from './components/ContactModal';
import { StoryView } from './components/StoryView';
import { ContactView } from './components/ContactView';
import { CareView } from './components/CareView';
import { resetScrollLock } from './utils/scrollLock';

export function App() {
  const [currentView, setCurrentView] = useState<ScreenView>('home');
  const [selectedFragrance, setSelectedFragrance] = useState<Fragrance | null>(null);

  // Theme Mode: Default to 'light' (Luminous Ivory & Gold with pastel tones), with instant Nocturne Dark toggle
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('fume_theme');
      if (saved === 'dark' || saved === 'light') return saved;
    } catch {
      // Ignore
    }
    return 'light';
  });

  const toggleTheme = () => {
    setThemeMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      try {
        localStorage.setItem('fume_theme', next);
      } catch {
        // Ignore
      }
      return next;
    });
  };

  // Cart State with Local Persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('fume_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map((item: any) => {
          const match = FRAGRANCES.find((f) => f.id === item.fragrance?.id);
          const basePrice = match ? match.price : item.price;
          const currentPrice = item.size === '100ml' ? 2499 : (basePrice < 500 ? (match ? match.price : 1899) : item.price);
          return { ...item, price: currentPrice };
        });
      }
    } catch {
      // Ignore
    }
    // Start with 1 item so users immediately experience the shopping bag
    return [
      {
        fragrance: FRAGRANCES[0], // Bloom
        quantity: 1,
        size: '50ml',
        price: FRAGRANCES[0].price
      }
    ];
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
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Clean scroll lock reset and native scroll to top on view change
  useEffect(() => {
    resetScrollLock();
  }, [currentView]);

  const handleNavigate = (view: ScreenView) => {
    resetScrollLock();
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleAddToCart = (
    fragrance: Fragrance,
    size: '50ml' | '100ml' = '50ml',
    price: number = fragrance.price
  ) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (i) => i.fragrance.id === fragrance.id && i.size === size
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      }
      return [...prev, { fragrance, quantity: 1, size, price }];
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

  const isLight = themeMode === 'light';

  return (
    <div
      className={`min-h-screen relative flex flex-col font-sans transition-colors duration-500 selection:bg-[#C5A059] selection:text-black ${
        isLight ? 'bg-[#FAF8F5] text-[#1A1816]' : 'bg-[#0a0a0a] text-[#f5f4f0]'
      }`}
    >
      {/* Dynamic Animated Ambient Colors & Moving Particles Canvas */}
      <AmbientCanvas themeMode={themeMode} />

      {/* 1. Header / Navigation with Theme Toggle and Since 2024 */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        themeMode={themeMode}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full relative z-10">
        {currentView === 'home' && (
          <>
            {/* 1. HERO SECTION with Animated Floating Flacon & Aura */}
            <HeroSection
              onShopPerfumes={() => handleNavigate('perfumes')}
              onExploreFume={scrollToEssence}
              themeMode={themeMode}
            />

            {/* ANIMATED LUXURY MARQUEE TICKER */}
            <BrandMarquee themeMode={themeMode} />

            {/* 2. FEATURED PERFUMES (THE COLLECTION) with Pastel Soft Colors & Gold Accents */}
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

            {/* 5. FULL-WIDTH PRODUCT / CAMPAIGN IMAGE */}
            <CampaignBanner
              onShopNow={() => handleNavigate('perfumes')}
            />

            {/* 6. BRAND STATEMENT with Since 2024 */}
            <BrandStatement themeMode={themeMode} />
          </>
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
            onNavigateToCare={() => handleNavigate('care')}
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

      {/* Account Modal */}
      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        themeMode={themeMode}
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
    </div>
  );
}
export default App;
