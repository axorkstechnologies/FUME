const fs = require('fs');

const code = `import React, { useState, useEffect } from 'react';
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

  const navLinks: { view: ScreenView; label: string }[] = [
    { view: 'home', label: 'Shop' },
    { view: 'perfumes', label: 'Perfumes' },
    { view: 'collections', label: 'Collections' },
    { view: 'story', label: 'Our Story' },
    { view: 'contact', label: 'Concierge' },
    { view: 'care', label: 'Client Care' }
  ];

  // We rely on CSS variables for a strict monochrome look.
  const headerClasses = isScrolled 
    ? 'bg-pearl border-b border-shadow/[0.05] shadow-none py-1 md:py-2'
    : 'bg-transparent border-b border-transparent py-2 md:py-3';

  // For Hero (Home) transparent state text color
  const isDarkTop = currentView === 'home' && !isScrolled;
  const textColorClass = isDarkTop ? 'text-pearl' : 'text-shadow';
  const logoSrc = isDarkTop ? '/logo/logo-white.png' : '/logo/logo-black.png';

  return (
    <header className={\`fixed top-0 left-0 w-full z-50 transition-all duration-500 \${headerClasses}\`}>
      <div className="site-header w-full max-w-[1700px] mx-auto px-5 sm:px-8 md:px-12 h-20 md:h-24">
        
        {/* Left Navigation */}
        <div className="nav-left flex items-center min-w-0">
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={\`p-2 transition-colors cursor-pointer \${textColorClass}/80 hover:\${textColorClass}\`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          <nav className="hidden lg:flex items-center justify-start gap-5 2xl:gap-8 w-full min-w-0">
            {navLinks.map((item) => {
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => handleLinkClick(item.view)}
                  className={\`text-[10px] xl:text-[10.5px] uppercase tracking-[0.2em] font-sans transition-all duration-300 cursor-pointer relative py-1.5 whitespace-nowrap shrink-0 \${
                    isActive
                      ? \`\${textColorClass} font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-current\`
                      : \`\${textColorClass}/70 hover:\${textColorClass}\`
                  }\`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Center Logo */}
        <div className="brand flex items-center justify-center">
          <button
            onClick={() => handleLinkClick('home')}
            className="cursor-pointer group flex flex-col items-center justify-center py-1 select-none"
          >
            <img
              src={logoSrc}
              alt="FUME FRAGRANCES"
              className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-opacity duration-300 group-hover:opacity-85"
            />
          </button>
        </div>

        {/* Right Navigation */}
        <div className="nav-right flex items-center justify-end gap-5 md:gap-6 min-w-0">
          <button
            onClick={onOpenSearch}
            className={\`p-2 transition-colors cursor-pointer \${textColorClass}/80 hover:\${textColorClass}\`}
          >
            <Search className="w-4 h-4 md:w-[18px] md:h-[18px]" />
          </button>

          <button
            onClick={onOpenCart}
            className={\`flex items-center gap-2 transition-colors cursor-pointer group \${textColorClass}/80 hover:\${textColorClass}\`}
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 md:w-[18px] md:h-[18px] transition-transform duration-300 group-hover:scale-105" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 text-[8px] font-sans font-semibold w-3.5 h-3.5 flex items-center justify-center rounded-full bg-shadow text-pearl">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline text-[10px] uppercase tracking-[0.2em] font-sans">
              BAG {cartCount > 0 ? \`(\${cartCount})\` : ''}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full h-screen bg-pearl text-shadow animate-in fade-in duration-300 border-t border-shadow/[0.05] px-8 py-10">
          <nav className="flex flex-col space-y-6">
            {navLinks.map((item) => (
              <button
                key={item.view}
                onClick={() => handleLinkClick(item.view)}
                className={\`text-left py-2 text-xs uppercase tracking-[0.25em] font-sans transition-colors cursor-pointer \${
                  currentView === item.view ? 'text-shadow font-semibold' : 'text-shadow/60'
                }\`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-6 border-t border-shadow/[0.05]">
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenSearch(); }}
                className="text-left py-2 text-xs uppercase tracking-[0.25em] font-sans text-shadow/60 flex items-center gap-3"
              >
                <Search className="w-4 h-4" />
                <span>ARCHIVE SEARCH</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
`;

fs.writeFileSync('src/components/Header.tsx', code);
console.log('Done replacing Header.tsx');
