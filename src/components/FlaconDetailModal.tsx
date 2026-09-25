import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Check } from 'lucide-react';
import { Fragrance, ThemeMode, Film } from '../types';
import { FlaconBottle } from './FlaconBottle';
import { FilmPlayer } from './FilmPlayer';
import { getPrimaryFilmForProduct } from '../data/films';
import { DISCOVERY_SET, getFragranceTitle } from '../data/fragrances';
import { resetScrollLock } from '../utils/scrollLock';
import { getPrice50, getPrice100 } from '../utils/pricing';

interface FlaconDetailModalProps {
  fragrance: Fragrance | null;
  onClose: () => void;
  onAddToCart: (fragrance: Fragrance, size: '50ml' | '100ml', price: number) => void;
  onOpenReel?: (film: Film) => void;
  themeMode: ThemeMode;
}

export const FlaconDetailModal: React.FC<FlaconDetailModalProps> = ({
  fragrance,
  onClose,
  onAddToCart,
  onOpenReel,
  themeMode
}) => {
  if (!fragrance) return null;

  const isLight = themeMode === 'light';
  const [selectedSize, setSelectedSize] = useState<'50ml' | '100ml'>('50ml');
  const [monogram, setMonogram] = useState('');
  const [added, setAdded] = useState(false);
  const [mediaTab, setMediaTab] = useState<'bottle' | 'film'>('bottle');

  const matchingFilm = getPrimaryFilmForProduct(fragrance.id);

  useEffect(() => {
    setMediaTab('bottle');
  }, [fragrance.id]);

  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previousActiveElement.current = document.activeElement as HTMLElement | null;

    document.body.style.overflow = 'hidden';
    document.body.classList.add('overlay-open');

    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      resetScrollLock();
      previousActiveElement.current?.focus?.();
    };
  }, [onClose]);

  const price50 = getPrice50(fragrance.id);
  const price100 = getPrice100(price50);
  const currentPrice = selectedSize === '50ml' ? price50 : price100;

  const handleAdd = () => {
    onAddToCart(fragrance, selectedSize, currentPrice);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 800);
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-2 sm:p-4 backdrop-blur-xs"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        backgroundColor: 'rgba(44,37,34,0.45)'
      }}
      onClick={onClose}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={`FUME ${fragrance.name} Details`}
        onClick={(e) => e.stopPropagation()}
        className="relative shadow-2xl border overflow-hidden grid grid-cols-1 md:grid-cols-2 grid-rows-[minmax(180px,36%)_1fr] md:grid-rows-1 bg-pearl/98 backdrop-blur-2xl text-shadow border-shadow/[0.08]"
        style={{
          width: 'min(1120px, calc(100vw - 32px))',
          height: 'min(860px, calc(100dvh - 32px))',
          maxHeight: 'calc(100dvh - 32px)',
          overflow: 'hidden'
        }}
      >
        {/* Close Button on panel — 44×44px hit area, full ×, top: 12px, right: 12px, z-index: 50 */}
        <button
          ref={closeButtonRef}
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="pdp-close absolute z-50 w-[44px] h-[44px] min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center transition-all cursor-pointer border border-shadow/20 bg-pearl/70 text-shadow hover:border-dusty-rose hover:text-dusty-rose shadow-lg"
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '44px',
            height: '44px',
            zIndex: 50
          }}
        >
          <X className="w-5 h-5 shrink-0" strokeWidth={1.5} />
        </button>

        {/* Left: Fragrance Bottle Image Pane (min-height: 0; overflow: hidden;) */}
        <div
          className="pdp-media relative overflow-hidden flex items-center justify-center md:justify-end border-b md:border-b-0 md:border-r h-full"
          style={{
            backgroundColor: fragrance.pastelBg,
            borderColor: '#F8F4F0',
            minHeight: 0,
            overflow: 'hidden'
          }}
        >
          {/* Bottle / Film Switcher (Visible when a fragrance film exists) */}
          {matchingFilm && (
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-30 flex items-center bg-pearl/75 backdrop-blur-md rounded-full p-1 border border-shadow/20 shadow-xl pointer-events-auto">
              <button
                type="button"
                onClick={() => setMediaTab('bottle')}
                className={`px-3 py-1 rounded-full text-[9px] uppercase tracking-[0.22em] font-sans font-medium transition-all cursor-pointer ${
                  mediaTab === 'bottle'
                    ? 'bg-dusty-rose text-pearl font-semibold shadow-sm'
                    : 'text-shadow/80 hover:text-shadow'
                }`}
              >
                FLACON
              </button>
              <button
                type="button"
                onClick={() => setMediaTab('film')}
                className={`px-3 py-1 rounded-full text-[9px] uppercase tracking-[0.22em] font-sans font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  mediaTab === 'film'
                    ? 'bg-dusty-rose text-pearl font-semibold shadow-sm'
                    : 'text-shadow/80 hover:text-shadow'
                }`}
              >
                <span>THE FILM</span>
                <span className="w-1.5 h-1.5 rounded-full bg-dusty-rose animate-pulse" />
              </button>
            </div>
          )}

          {mediaTab === 'film' && matchingFilm ? (
            <div className="relative w-full h-full flex items-center justify-center bg-pearl">
              <FilmPlayer
                film={matchingFilm}
                aspectRatio="auto"
                className="w-full h-full"
                autoPlayInView={true}
                initialMuted={false}
                showControls={true}
                showOverlayInfo={true}
                onOpenReel={onOpenReel}
                themeMode={themeMode}
              />
            </div>
          ) : (
            <>
              {/* Soft Ambient Halo */}
              <div
                className="absolute inset-0 opacity-50 blur-[40px] pointer-events-none"
                style={{
                  background: `radial-gradient(circle, ${fragrance.pastelGlow} 0%, transparent 70%)`
                }}
              />

              <FlaconBottle
                fragrance={fragrance}
                variant="detail"
                themeMode={themeMode}
                customMonogram={monogram}
                className="w-full h-full"
                imageClassName="object-contain md:!object-right w-full h-full"
              />

              <div className="absolute bottom-4 left-4 z-20 text-[9px] uppercase tracking-[0.3em] font-sans text-dusty-rose font-medium bg-pearl/40 backdrop-blur-xs px-2.5 py-1 rounded-xs border border-dusty-rose/30 pointer-events-none">
                HAUTE FLACON • SINCE 2024
              </div>
            </>
          )}
        </div>

        {/* Right: Olfactory Details & Actions Pane (min-height: 0; overflow-y: auto; overscroll-behavior: contain; paddingTop: 56px) */}
        <div
          className="relative p-6 sm:p-8 md:p-10 flex flex-col justify-between space-y-8 h-full bg-pearl text-shadow"
          style={{
            minHeight: 0,
            overflowY: 'auto',
            overscrollBehavior: 'contain',
            paddingTop: '56px'
          }}
        >

            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-dusty-rose font-sans font-medium">
                    {fragrance.genderCategory} · {fragrance.olfactoryFamily}
                  </span>
                  <span
                    className="text-[9px] uppercase tracking-[0.2em] font-sans text-shadow/60"
                  >
                    SINCE 2024
                  </span>
                </div>

                <h2
                  className="font-serif text-2xl sm:text-3xl md:text-4xl uppercase tracking-[0.14em] text-shadow"
                >
                  {getFragranceTitle(fragrance)}
                </h2>
                <div className="flex items-center gap-2 pt-0.5">
                  <span className="text-xs text-dusty-rose font-sans tracking-tight">★★★★★</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-sans text-shadow/60">
                    4.9 (140+ Verified Reviews)
                  </span>
                </div>
                <p className="text-xs uppercase tracking-[0.25em] text-dusty-rose font-sans">
                  {fragrance.subtitle}
                </p>
                {matchingFilm && (
                  <button
                    type="button"
                    onClick={() => setMediaTab('film')}
                    className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.25em] text-dusty-rose hover:underline font-sans font-medium transition-colors cursor-pointer pt-1"
                  >
                    <span>Watch Experience on Film ({matchingFilm.kicker})</span>
                  </button>
                )}
              </div>

              <p
                className="text-xs sm:text-sm font-sans font-light leading-relaxed text-shadow/60"
              >
                {fragrance.description}
              </p>

              {/* Olfactory Pyramid */}
              <div
                className="space-y-3 pt-4 border-t border-shadow/[0.08]"
              >
                <div className="space-y-1">
                  <span className="text-[9px] uppercase tracking-[0.25em] text-dusty-rose font-sans font-medium block">
                    TOP NOTES
                  </span>
                  <span
                    className="text-xs font-sans text-shadow"
                  >
                    {fragrance.topNotes}
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] uppercase tracking-[0.25em] text-dusty-rose font-sans font-medium block">
                    HEART NOTES
                  </span>
                  <span
                    className="text-xs font-sans text-shadow"
                  >
                    {fragrance.heartNotes}
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] uppercase tracking-[0.25em] text-dusty-rose font-sans font-medium block">
                    BASE NOTES
                  </span>
                  <span
                    className="text-xs font-sans text-shadow"
                  >
                    {fragrance.baseNotes}
                  </span>
                </div>
              </div>

              {/* Volume Selector / Coffret Contents */}
              {fragrance.id === 'discovery-set' ? (
                <div className="space-y-2 pt-2">
                  <span
                    className={`text-[9px] uppercase tracking-[0.25em] font-sans block ${
                      'text-shadow/60'
                    }`}
                  >
                    COFFRET CONTENTS
                  </span>
                  <div
                    className={`py-3 px-4 text-xs font-sans uppercase tracking-widest border rounded-xs flex items-center justify-between ${
                      'border-dusty-rose bg-pearl text-shadow'
                    }`}
                  >
                    <span className="font-medium">5 × 5 ML LUXURY TESTERS</span>
                    <span className="text-dusty-rose font-semibold">Rs 1,200</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 pt-2">
                  <span
                    className={`text-[9px] uppercase tracking-[0.25em] font-sans block ${
                      'text-shadow/60'
                    }`}
                  >
                    FLACON VOLUME
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setSelectedSize('50ml')}
                      className={`py-2.5 px-4 text-xs font-sans uppercase tracking-widest border transition-all cursor-pointer ${
                        selectedSize === '50ml'
                          ? 'border-shadow/10 bg-oyster text-shadow font-medium'
                          : 'border-sand text-shadow/60 hover:border-dusty-rose'
                      }`}
                    >
                      50 ML (Rs {price50.toLocaleString()})
                    </button>
                    <button
                      onClick={() => setSelectedSize('100ml')}
                      className={`py-2.5 px-4 text-xs font-sans uppercase tracking-widest border transition-all cursor-pointer ${
                        selectedSize === '100ml'
                          ? 'border-shadow/10 bg-oyster text-shadow font-medium'
                          : 'border-sand text-shadow/60 hover:border-dusty-rose'
                      }`}
                    >
                      100 ML (Rs {price100.toLocaleString()})
                    </button>
                  </div>
                </div>
              )}

              {/* Discovery Set Recommendation Upsell */}
              {fragrance.id !== 'discovery-set' && (
                <div
                  className={`p-3.5 rounded-xs border transition-colors flex items-center justify-between gap-3 ${
                    'bg-pearl border-sand'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.25em] text-dusty-rose font-medium">
                      <span>CURIOUS BEFORE YOU COMMIT?</span>
                    </div>
                    <p
                      className={`text-xs font-sans tracking-wide leading-snug pt-0.5 ${
                        'text-shadow/60'
                      }`}
                    >
                      Try our <strong className="font-medium text-[inherit]">Discovery Set</strong> (5 × 5ml testers, Rs. 1,200).
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onAddToCart(DISCOVERY_SET, '50ml', 1200);
                      onClose();
                    }}
                    className="shrink-0 px-3 py-1.5 bg-dusty-rose text-pearl hover:bg-pearl transition-colors text-[9px] uppercase tracking-[0.2em] font-sans font-semibold rounded-xs cursor-pointer shadow-sm"
                  >
                    ADD SET
                  </button>
                </div>
              )}

              {/* Bespoke Monogram Engraving Preview Option */}
              {fragrance.id !== 'discovery-set' && (
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[9px] uppercase tracking-[0.25em] font-sans block ${
                        'text-shadow/60'
                      }`}
                    >
                      BESPOKE GOLD ENGRAVING (OPTIONAL)
                    </span>
                    <span className="text-[8px] uppercase tracking-[0.2em] text-dusty-rose font-medium">
                      COMPLIMENTARY
                    </span>
                  </div>
                  <input
                    type="text"
                    maxLength={4}
                    value={monogram}
                    onChange={(e) => setMonogram(e.target.value.toUpperCase())}
                    placeholder="ENTER INITIALS (E.G. M.M.)"
                    className={`w-full px-3 py-2 text-xs uppercase tracking-widest border focus:outline-none transition-colors rounded-xs ${
                      'bg-pearl border-sand text-shadow focus:border-dusty-rose'
                    }`}
                  />
                </div>
              )}
            </div>

            {/* Price & Add to Bag CTA */}
            <div
              className="pt-6 border-t border-shadow/[0.08] flex items-center justify-between gap-4"
            >
              <div>
                <span
                  className="text-[9px] uppercase tracking-[0.25em] font-sans block text-shadow/60"
                >
                  PRICE
                </span>
                <span
                  className="font-serif text-2xl font-medium text-dusty-rose"
                >
                  Rs {currentPrice.toLocaleString()}
                </span>
              </div>

              <button
                onClick={handleAdd}
                disabled={added}
                className={`px-8 py-4 transition-all text-xs uppercase tracking-[0.25em] font-sans font-semibold flex items-center gap-2 cursor-pointer rounded-xs ${
                  added
                    ? 'bg-dusty-rose/50 text-pearl'
                    : 'bg-dusty-rose text-pearl hover:bg-dusty-rose hover:shadow-[0_0_25px_rgba(201,169,166,0.4)]'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>ADDED TO BAG</span>
                  </>
                ) : (
                  <span>ADD TO BAG</span>
                )}
              </button>
            </div>

            {/* Direct WhatsApp Concierge Order / Query */}
            <div className="pt-2 text-center border-t border-shadow/[0.08]">
              <a
                href={`https://wa.me/923132970468?text=${encodeURIComponent(
                  `Hello FUME Concierge, I would like to inquire / order ${getFragranceTitle(fragrance)} (${fragrance.id === 'discovery-set' ? '5x5ml Testers' : selectedSize} - Rs ${currentPrice.toLocaleString()})${monogram ? ` with bespoke monogram "${monogram}"` : ''}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.22em] font-sans transition-colors py-1 text-shadow/60 hover:text-dusty-rose"
              >
                <span>Order or Inquire via WhatsApp (+92 313 297 0468)</span>
              </a>
            </div>

            {/* Trust Signals: COD, Free 2ml Sample Vial, 14hr Longevity */}
            <div className="pt-3 border-t border-shadow/[0.08] grid grid-cols-2 gap-2 text-left">
              <div className="p-2.5 bg-shadow/5 border border-shadow/[0.06] rounded-xs space-y-0.5">
                <span className="text-[9px] uppercase tracking-[0.2em] font-sans font-medium text-dusty-rose block">
                  CASH ON DELIVERY
                </span>
                <span className="text-[9px] font-sans text-shadow/60 block leading-tight">
                  Nationwide across Pakistan. Pay at your doorstep.
                </span>
              </div>
              <div className="p-2.5 bg-shadow/5 border border-shadow/[0.06] rounded-xs space-y-0.5">
                <span className="text-[9px] uppercase tracking-[0.2em] font-sans font-medium text-dusty-rose block">
                  2ML TEST VIAL INCLUDED
                </span>
                <span className="text-[9px] font-sans text-shadow/60 block leading-tight">
                  Wear test sample first. Keep unopened box for full refund.
                </span>
              </div>
              <div className="p-2.5 bg-shadow/5 border border-shadow/[0.06] rounded-xs space-y-0.5">
                <span className="text-[9px] uppercase tracking-[0.2em] font-sans font-medium text-dusty-rose block">
                  14+ HRS PERSISTENCE
                </span>
                <span className="text-[9px] font-sans text-shadow/60 block leading-tight">
                  High perfume oil concentration tested in warm weather.
                </span>
              </div>
              <div className="p-2.5 bg-shadow/5 border border-shadow/[0.06] rounded-xs space-y-0.5">
                <span className="text-[9px] uppercase tracking-[0.2em] font-sans font-medium text-dusty-rose block">
                  HAND-CRAFTED PURITY
                </span>
                <span className="text-[9px] font-sans text-shadow/60 block leading-tight">
                  Grasse distillates bottled in architectural flint glass.
                </span>
              </div>
            </div>

            {/* Mobile Sticky Add to Bag Bar */}
            <div className="md:hidden sticky -bottom-6 -mx-6 px-6 py-3 bg-pearl/95 backdrop-blur-md border-t border-shadow/[0.08] flex items-center justify-between z-30 shadow-2xl mt-4">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-shadow/60 block font-sans">
                  {selectedSize}
                </span>
                <span className="font-serif text-lg font-medium text-dusty-rose">
                  Rs {currentPrice.toLocaleString()}
                </span>
              </div>
              <button
                onClick={handleAdd}
                disabled={added}
                className="px-6 py-2.5 bg-dusty-rose text-pearl text-[10px] uppercase tracking-[0.2em] font-sans font-semibold rounded-xs cursor-pointer active:scale-95 transition-transform"
              >
                {added ? 'ADDED' : 'ADD TO BAG'}
              </button>
            </div>

            {/* Structured Data: Product JSON-LD for SEO / AEO / GEO */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'Product',
                  name: getFragranceTitle(fragrance),
                  image: `https://fume-six.vercel.app${fragrance.image}`,
                  description: fragrance.description,
                  brand: {
                    '@type': 'Brand',
                    name: 'FUME FRAGRANCES'
                  },
                  sku: `FUME-${fragrance.id.toUpperCase()}-${selectedSize}`,
                  offers: {
                    '@type': 'Offer',
                    url: `https://fume-six.vercel.app/#fragrance-${fragrance.id}`,
                    priceCurrency: 'PKR',
                    price: currentPrice,
                    availability: fragrance.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
                    itemCondition: 'https://schema.org/NewCondition',
                    seller: {
                      '@type': 'Organization',
                      name: 'FUME FRAGRANCES'
                    }
                  },
                  aggregateRating: {
                    '@type': 'AggregateRating',
                    ratingValue: '4.9',
                    reviewCount: '142'
                  }
                })
              }}
            />
          </div>
        </div>
      </div>,
    document.body
  );
};
