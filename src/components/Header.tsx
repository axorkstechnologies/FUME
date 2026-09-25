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
          ? 'bg-pearl/95 backdrop-blur-xl border-b border-shadow/[0.08] shadow-[0_4px_30px_rgba(44,37,34,0.05)]'
          : 'bg-gradient-to-b from-pearl/90 via-pearl/40 to-transparent'
      }`}
    >
      <div className="site-header w-full max-w-[1700px] mx-auto px-4 sm:px-6 md:px-8 lg:px-8 xl:px-12 h-20 md:h-24">
        {/* Left Navigation: Mobile Hamburger, Condensed (md), Full (lg) */}
        <div className="nav-left flex items-center min-w-0">
          {/* Mobile Hamburger Toggle (Left on mobile) */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 transition-colors cursor-pointer text-shadow hover:text-dusty-rose"
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
                currentView === 'home' ? 'text-dusty-rose font-medium' : 'text-shadow/60 hover:text-shadow'
              }`}
            >
              Shop
            </button>
            <button
              onClick={() => handleLinkClick('perfumes')}
              className={`text-[11px] uppercase tracking-[0.2em] font-sans transition-colors ${
                currentView === 'perfumes' ? 'text-dusty-rose font-medium' : 'text-shadow/60 hover:text-shadow'
              }`}
            >
              Perfumes
            </button>
            <button
              onClick={() => handleLinkClick('collections')}
              className={`text-[11px] uppercase tracking-[0.2em] font-sans transition-colors ${
                currentView === 'collections' ? 'text-dusty-rose font-medium' : 'text-shadow/60 hover:text-shadow'
              }`}
            >
              Collections
            </button>
            <button
              onClick={() => handleLinkClick('story')}
              className={`text-[11px] uppercase tracking-[0.2em] font-sans transition-colors ${
                currentView === 'story' ? 'text-dusty-rose font-medium' : 'text-shadow/60 hover:text-shadow'
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
                      ? 'text-shadow font-medium after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-dusty-rose'
                      : 'text-shadow/60 hover:text-dusty-rose'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Center: FUME FRAGRANCES Official Master Logo */}
        <div className="brand flex items-center justify-center">
          <button
            onClick={() => handleLinkClick('home')}
            className="cursor-pointer group flex flex-col items-center justify-center py-1 select-none"
            aria-label="FUME FRAGRANCES Homepage"
          >
            <img
              src="/logo/logo-black.png"
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
            className="p-2 transition-colors cursor-pointer text-shadow hover:text-dusty-rose"
            aria-label="Open search"
          >
            <Search className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 transition-colors cursor-pointer group text-shadow hover:text-dusty-rose"
            aria-label={`Open shopping bag with ${cartCount} items`}
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 md:w-5 md:h-5 text-dusty-rose group-hover:scale-105 transition-transform" />
              {cartCount > 0 && (
                <span
                  className="absolute -top-1.5 -right-2 text-[9px] font-sans font-medium w-3.5 h-3.5 flex items-center justify-center rounded-full bg-dusty-rose text-pearl"
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
        <div className="md:hidden px-8 py-10 space-y-8 animate-in fade-in duration-200 backdrop-blur-xl border-b bg-pearl/98 border-shadow/[0.08] text-shadow">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.35em] text-dusty-rose font-sans font-medium block">
              PAGES & DOSSIERS • SINCE 2024
            </span>
            <div className="w-8 h-[1px] bg-dusty-rose" />
          </div>

          <nav className="flex flex-col space-y-5 text-sm uppercase tracking-[0.25em] font-sans">
            {navLinks.map((item) => (
              <button
                key={item.view}
                onClick={() => handleLinkClick(item.view)}
                className={`text-left py-2 transition-colors cursor-pointer flex items-center justify-between ${
                  currentView === item.view
                    ? 'text-dusty-rose font-medium'
                    : 'text-shadow/70 hover:text-shadow'
                }`}
              >
                <span>{item.label}</span>
              </button>
            ))}

            <div className="pt-3 border-t border-shadow/[0.08] space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch();
                }}
                className="text-left py-2 text-shadow/70 hover:text-dusty-rose transition-colors flex items-center gap-3"
              >
                <Search className="w-4 h-4 text-dusty-rose" />
                <span>Archive Search</span>
              </button>
            </div>
          </nav>

          <div className="pt-6 border-t border-shadow/[0.08] flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-shadow/60">
            <span>Your Scent. Your Story.</span>
            <span className="text-dusty-rose font-medium">SINCE 2024</span>
          </div>
        </div>
      )}

    </header>
  );
};
