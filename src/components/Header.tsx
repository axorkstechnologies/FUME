import React, { useState, useEffect } from 'react';
import { Search, User, ShoppingBag, Menu, X, Sun, Moon } from 'lucide-react';
import { ScreenView, ThemeMode } from '../types';

interface HeaderProps {
  currentView: ScreenView;
  onNavigate: (view: ScreenView) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenAccount: () => void;
  themeMode: ThemeMode;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenAccount,
  themeMode,
  onToggleTheme
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isLight = themeMode === 'light';

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

  // When at the very top of the homepage, the floating perfume hero is dark obsidian.
  // The header should match that dark atmosphere at the top, and transition to ivory & gold when scrolled or on other pages.
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
          ? isLight
            ? 'bg-[#FAF8F5]/92 backdrop-blur-md border-b border-[#E6DDD0] shadow-[0_4px_30px_rgba(0,0,0,0.03)]'
            : 'bg-[#0a0a0a]/92 backdrop-blur-md border-b border-[#222222]'
          : isDarkTop
          ? 'bg-gradient-to-b from-black/85 via-black/35 to-transparent'
          : isLight
          ? 'bg-gradient-to-b from-[#FAF8F5]/90 via-[#FAF8F5]/40 to-transparent'
          : 'bg-gradient-to-b from-[#0a0a0a]/90 via-[#0a0a0a]/40 to-transparent'
      }`}
    >
      <div className="site-header w-full max-w-[1700px] mx-auto px-4 sm:px-6 md:px-8 lg:px-8 xl:px-12 h-20 md:h-24">
        {/* Left Navigation: Mobile Hamburger, Condensed (md), Full (lg) */}
        <div className="nav-left flex items-center min-w-0">
          {/* Mobile Hamburger Toggle (Left on mobile) */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 transition-colors cursor-pointer ${
                isDarkTop
                  ? 'text-[#FAF8F5] hover:text-[#C5A059]'
                  : isLight
                  ? 'text-[#2D2926] hover:text-[#C5A059]'
                  : 'text-[#e5e3dc] hover:text-white'
              }`}
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
                currentView === 'home'
                  ? 'text-[#C5A059] font-medium'
                  : isDarkTop
                  ? 'text-[#A39E95]'
                  : isLight
                  ? 'text-[#7D766E]'
                  : 'text-[#8c8985]'
              }`}
            >
              Shop
            </button>
            <button
              onClick={() => handleLinkClick('perfumes')}
              className={`text-[11px] uppercase tracking-[0.2em] font-sans transition-colors ${
                currentView === 'perfumes'
                  ? 'text-[#C5A059] font-medium'
                  : isDarkTop
                  ? 'text-[#A39E95]'
                  : isLight
                  ? 'text-[#7D766E]'
                  : 'text-[#8c8985]'
              }`}
            >
              Perfumes
            </button>
            <button
              onClick={() => handleLinkClick('collections')}
              className={`text-[11px] uppercase tracking-[0.2em] font-sans transition-colors ${
                currentView === 'collections'
                  ? 'text-[#C5A059] font-medium'
                  : isDarkTop
                  ? 'text-[#A39E95]'
                  : isLight
                  ? 'text-[#7D766E]'
                  : 'text-[#8c8985]'
              }`}
            >
              Collections
            </button>
            <button
              onClick={() => handleLinkClick('story')}
              className={`text-[11px] uppercase tracking-[0.2em] font-sans transition-colors ${
                currentView === 'story'
                  ? 'text-[#C5A059] font-medium'
                  : isDarkTop
                  ? 'text-[#A39E95]'
                  : isLight
                  ? 'text-[#7D766E]'
                  : 'text-[#8c8985]'
              }`}
            >
              Story
            </button>
          </nav>

          {/* Desktop Left Navigation (Shop, Perfumes, Collections, Our Story, Concierge, Client Care) */}
          <nav className="hidden lg:flex items-center justify-start gap-2 lg:gap-2.5 xl:gap-4.5 2xl:gap-6 w-full min-w-0">
            {navLinks.map((item) => {
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => handleLinkClick(item.view)}
                  className={`text-[10px] xl:text-[11px] uppercase tracking-[0.08em] lg:tracking-[0.09em] xl:tracking-[0.16em] font-sans transition-colors cursor-pointer relative py-1 whitespace-nowrap shrink-0 ${
                    isActive
                      ? isDarkTop
                        ? 'text-[#FAF8F5] font-medium after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-[#C5A059]'
                        : isLight
                        ? 'text-[#1A1816] font-medium after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-[#C5A059]'
                        : 'text-white font-medium after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-[#C5A059]'
                      : isDarkTop
                      ? 'text-[#A39E95] hover:text-[#C5A059]'
                      : isLight
                      ? 'text-[#7D766E] hover:text-[#C5A059]'
                      : 'text-[#8c8985] hover:text-[#C5A059]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Center: FUME Wordmark & SINCE 2024 */}
        <div className="brand flex items-center justify-center">
          <button
            onClick={() => handleLinkClick('home')}
            className="cursor-pointer group flex flex-col items-center"
            aria-label="FUME Homepage"
          >
            <span
              className={`font-serif text-2xl md:text-3xl lg:text-[32px] tracking-[0.38em] uppercase font-normal transition-all duration-300 group-hover:opacity-85 select-none ${
                isDarkTop
                  ? 'text-[#FAF8F5]'
                  : isLight
                  ? 'text-[#1A1816]'
                  : 'text-[#f5f4f0]'
              }`}
            >
              FUME
            </span>
            <span className="text-[8px] md:text-[9px] uppercase tracking-[0.45em] text-[#C5A059] font-sans -mt-0.5 font-medium">
              SINCE 2024
            </span>
          </button>
        </div>

        {/* Right Navigation: Theme Toggle, Search, Account, Shopping Bag */}
        <div className="nav-right flex items-center justify-end gap-3 sm:gap-4 md:gap-5 min-w-0">
          {/* Theme Palette Toggle */}
          <button
            onClick={onToggleTheme}
            className={`p-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5 group ${
              isDarkTop
                ? 'text-[#A39E95] hover:text-[#C5A059] hover:bg-white/10'
                : isLight
                ? 'text-[#7D766E] hover:text-[#C5A059] hover:bg-[#F2ECE1]'
                : 'text-[#8c8985] hover:text-[#C5A059] hover:bg-[#1A1A1A]'
            }`}
            title={`Switch to ${isLight ? 'Nocturne Dark' : 'Luminous Ivory & Gold'}`}
            aria-label="Toggle color atmosphere"
          >
            {isLight ? (
              <>
                <Moon className="w-4 h-4 text-[#C5A059] group-hover:text-white" />
                <span
                  className={`hidden xl:inline text-[10px] uppercase tracking-[0.2em] font-sans font-medium ${
                    isDarkTop ? 'text-[#C5A059]' : 'text-[#7D766E]'
                  } group-hover:text-[#C5A059]`}
                >
                  Dark
                </span>
              </>
            ) : (
              <>
                <Sun className="w-4 h-4 text-[#C5A059] group-hover:text-white" />
                <span className="hidden xl:inline text-[10px] uppercase tracking-[0.2em] font-sans font-medium text-[#D4BA7A]">
                  Ivory & Gold
                </span>
              </>
            )}
          </button>

          {/* Search Button */}
          <button
            onClick={onOpenSearch}
            className={`p-1.5 transition-colors cursor-pointer ${
              isDarkTop
                ? 'text-[#A39E95] hover:text-[#C5A059]'
                : isLight
                ? 'text-[#7D766E] hover:text-[#C5A059]'
                : 'text-[#8c8985] hover:text-[#C5A059]'
            }`}
            aria-label="Open search"
          >
            <Search className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          {/* Account / Membership Access */}
          <button
            onClick={onOpenAccount}
            className={`p-1.5 transition-colors cursor-pointer hidden sm:flex items-center gap-2 ${
              isDarkTop
                ? 'text-[#A39E95] hover:text-[#C5A059]'
                : isLight
                ? 'text-[#7D766E] hover:text-[#C5A059]'
                : 'text-[#8c8985] hover:text-[#C5A059]'
            }`}
            aria-label="Open patron account"
          >
            <User className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className={`flex items-center gap-2 transition-colors cursor-pointer group ${
              isDarkTop
                ? 'text-[#FAF8F5] hover:text-[#C5A059]'
                : isLight
                ? 'text-[#1A1816] hover:text-[#C5A059]'
                : 'text-white hover:text-[#C5A059]'
            }`}
            aria-label={`Open shopping bag with ${cartCount} items`}
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 md:w-5 md:h-5 text-[#C5A059]" />
              {cartCount > 0 && (
                <span
                  className={`absolute -top-1.5 -right-2 text-[9px] font-sans font-medium w-3.5 h-3.5 flex items-center justify-center rounded-full ${
                    isDarkTop
                      ? 'bg-[#C5A059] text-black'
                      : isLight
                      ? 'bg-[#1A1816] text-[#FAF8F5]'
                      : 'bg-[#C5A059] text-black'
                  }`}
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
        <div
          className={`md:hidden px-8 py-10 space-y-8 animate-in fade-in duration-200 backdrop-blur-xl border-b ${
            isLight
              ? 'bg-[#FAF8F5]/98 border-[#E6DDD0] text-[#1A1816]'
              : 'bg-[#0a0a0a]/98 border-[#222222] text-[#f5f4f0]'
          }`}
        >
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#C5A059] font-sans font-medium block">
              PAGES & DOSSIERS • SINCE 2024
            </span>
            <div className="w-8 h-[1px] bg-[#C5A059]" />
          </div>

          <nav className="flex flex-col space-y-5 text-sm uppercase tracking-[0.25em] font-sans">
            {navLinks.map((item) => (
              <button
                key={item.view}
                onClick={() => handleLinkClick(item.view)}
                className={`text-left py-2 transition-colors cursor-pointer flex items-center justify-between ${
                  currentView === item.view
                    ? 'text-[#C5A059] font-medium'
                    : isLight
                    ? 'text-[#5C5449] hover:text-[#1A1816]'
                    : 'text-[#8c8985] hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                {currentView === item.view && (
                  <span className="text-xs text-[#C5A059]">✦</span>
                )}
              </button>
            ))}

            <div className="pt-3 border-t border-[#E6DDD0]/50 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAccount();
                }}
                className="text-left py-2 text-[#7D766E] hover:text-[#C5A059] transition-colors flex items-center gap-3"
              >
                <User className="w-4 h-4 text-[#C5A059]" />
                <span>Patron Account</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch();
                }}
                className="text-left py-2 text-[#7D766E] hover:text-[#C5A059] transition-colors flex items-center gap-3"
              >
                <Search className="w-4 h-4 text-[#C5A059]" />
                <span>Archive Search</span>
              </button>
              <button
                onClick={onToggleTheme}
                className="text-left py-2 text-[#C5A059] flex items-center gap-3"
              >
                {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                <span>{isLight ? 'Switch to Nocturne Dark' : 'Switch to Ivory & Gold'}</span>
              </button>
            </div>
          </nav>

          <div
            className={`pt-6 border-t flex items-center justify-between text-[10px] uppercase tracking-[0.25em] ${
              isLight ? 'border-[#E6DDD0] text-[#8C8377]' : 'border-[#222222] text-[#8c8985]'
            }`}
          >
            <span>SCENT, REFINED.</span>
            <span className="text-[#C5A059] font-medium">SINCE 2024</span>
          </div>
        </div>
      )}
    </header>
  );
};
