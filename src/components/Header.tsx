import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { ScreenView } from '../types';

interface HeaderProps {
  currentView: ScreenView;
  onNavigate: (view: ScreenView) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  cartCount,
  onOpenCart,
  onOpenSearch
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isLight = true;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (view: ScreenView) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  const isDarkTop = currentView === 'home' && !isScrolled;

  const navLinks: { view: ScreenView; label: string }[] = [
    { view: 'home', label: 'Shop' },
    { view: 'perfumes', label: 'Perfumes' },
    { view: 'collections', label: 'Collections' },
    { view: 'story', label: 'Our Story' },
    { view: 'contact', label: 'Concierge' },
    { view: 'care', label: 'Client Care' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0B0A09]/92 backdrop-blur-xl border-b border-white/[0.07] shadow-[0_4px_30px_rgba(0,0,0,0.35)]'
          : 'bg-gradient-to-b from-black/75 via-black/25 to-transparent'
      }`}
    >
      <div className="site-header w-full max-w-[1700px] mx-auto px-4 sm:px-6 md:px-8 lg:px-8 xl:px-12 h-20 md:h-24">
        {/* Left Navigation: Mobile Hamburger, Condensed (md), Full (lg) */}
        <div className="nav-left flex items-center min-w-0">
          {/* Mobile Hamburger Toggle (Left on mobile) */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 transition-colors cursor-pointer text-[#D6C7B2] hover:text-[#D4AF37]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Medium Screen Left Navigation (Condensed) */}
          <nav className="hidden md:flex lg:hidden items-center gap-4">
            <button
              onClick={() => handleLinkClick('home')}
              className={`text-[11px] uppercase tracking-[0.2em] font-sans transition-colors ${
                currentView === 'home' ? 'text-[#D4AF37] font-medium' : 'text-[#9E9589] hover:text-[#F5F2EB]'
              }`}
            >
              Shop
            </button>
            <button
              onClick={() => handleLinkClick('perfumes')}
              className={`text-[11px] uppercase tracking-[0.2em] font-sans transition-colors ${
                currentView === 'perfumes' ? 'text-[#D4AF37] font-medium' : 'text-[#9E9589] hover:text-[#F5F2EB]'
              }`}
            >
              Perfumes
            </button>
            <button
              onClick={() => handleLinkClick('collections')}
              className={`text-[11px] uppercase tracking-[0.2em] font-sans transition-colors ${
                currentView === 'collections' ? 'text-[#D4AF37] font-medium' : 'text-[#9E9589] hover:text-[#F5F2EB]'
              }`}
            >
              Collections
            </button>
            <button
              onClick={() => handleLinkClick('story')}
              className={`text-[11px] uppercase tracking-[0.2em] font-sans transition-colors ${
                currentView === 'story' ? 'text-[#D4AF37] font-medium' : 'text-[#9E9589] hover:text-[#F5F2EB]'
              }`}
            >
              Story
            </button>
          </nav>

          {/* Desktop Left Navigation */}
          <nav className="hidden lg:flex items-center justify-start gap-2 lg:gap-2.5 xl:gap-4.5 2xl:gap-6 w-full min-w-0">
            {navLinks.map((item) => {
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => handleLinkClick(item.view)}
                  className={`text-[10px] xl:text-[11px] uppercase tracking-[0.08em] lg:tracking-[0.09em] xl:tracking-[0.16em] font-sans transition-colors cursor-pointer relative py-1 whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-[#F5F2EB] font-medium after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-[#D4AF37]'
                      : 'text-[#9E9589] hover:text-[#D4AF37]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Center: FUME FRAGRANCES Official Master Logo — always white on dark luxury site */}
        <div className="brand flex items-center justify-center">
          <button
            onClick={() => handleLinkClick('home')}
            className="cursor-pointer group flex flex-col items-center justify-center py-1 select-none"
            aria-label="FUME FRAGRANCES Homepage"
          >
            <img
              src="/logo/logo-white.png"
              alt="FUME FRAGRANCES"
              className="h-8 sm:h-9 md:h-11 w-auto object-contain transition-opacity duration-300 group-hover:opacity-85 select-none"
            />
          </button>
        </div>

        {/* Right Navigation: Search & Shopping Bag */}
        <div className="nav-right flex items-center justify-end gap-3 sm:gap-4 md:gap-5 min-w-0">
          {/* Search Button */}
          <button
            onClick={onOpenSearch}
            className="p-2 transition-colors cursor-pointer text-[#D6C7B2] hover:text-[#D4AF37]"
            aria-label="Open search"
          >
            <Search className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 transition-colors cursor-pointer group text-[#F5F2EB] hover:text-[#D4AF37]"
            aria-label={`Open shopping bag with ${cartCount} items`}
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 md:w-5 md:h-5 text-[#D4AF37] group-hover:scale-105 transition-transform" />
              {cartCount > 0 && (
                <span
                  className="absolute -top-1.5 -right-2 text-[9px] font-sans font-medium w-3.5 h-3.5 flex items-center justify-center rounded-full bg-[#D4AF37] text-black"
                >
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline text-[11px] uppercase tracking-[0.2em] font-sans">
              Bag {cartCount > 0 ? `(${cartCount})` : ''}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-8 py-10 space-y-8 animate-in fade-in duration-200 backdrop-blur-xl border-b bg-[#0B0A09]/98 border-white/[0.07] text-[#F5F2EB]">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF37] font-sans font-medium block">
              PAGES & DOSSIERS • SINCE 2024
            </span>
            <div className="w-8 h-[1px] bg-[#D4AF37]" />
          </div>

          <nav className="flex flex-col space-y-5 text-sm uppercase tracking-[0.25em] font-sans">
            {navLinks.map((item) => (
              <button
                key={item.view}
                onClick={() => handleLinkClick(item.view)}
                className={`text-left py-2 transition-colors cursor-pointer flex items-center justify-between ${
                  currentView === item.view
                    ? 'text-[#D4AF37] font-medium'
                    : 'text-[#9E9589] hover:text-[#F5F2EB]'
                }`}
              >
                <span>{item.label}</span>
              </button>
            ))}

            <div className="pt-3 border-t border-white/[0.08] space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch();
                }}
                className="text-left py-2 text-[#9E9589] hover:text-[#D4AF37] transition-colors flex items-center gap-3"
              >
                <Search className="w-4 h-4 text-[#D4AF37]" />
                <span>Archive Search</span>
              </button>
            </div>
          </nav>

          <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-[#9E9589]">
            <span>Your Scent. Your Story.</span>
            <span className="text-[#D4AF37] font-medium">SINCE 2024</span>
          </div>
        </div>
      )}

    </header>
  );
};
