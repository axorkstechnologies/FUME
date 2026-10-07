import React from 'react';
import { X, Minus, Plus, ShoppingBag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { CartItem, ThemeMode } from '../types';
import { getFragranceTitle } from '../data/fragrances';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  themeMode: ThemeMode;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem
}) => {
  if (!isOpen) return null;

  const totalQuantity = cartItems.reduce((acc, i) => acc + i.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-shadow/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-8 sm:pl-10">
        <div
          className="w-screen max-w-md bg-pearl border-l border-shadow/[0.08] flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300 text-shadow"
        >
          {/* Header */}
          <div className="p-6 sm:p-8 border-b border-shadow/[0.08] flex items-center justify-between bg-pearl/90 backdrop-blur-md">
            <div className="space-y-1">
              <span className="text-[9px] uppercase tracking-[0.35em] text-dusty-rose block font-medium">
                ATELIER SELECTION • EST. 2024
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-normal uppercase tracking-[0.14em] text-shadow">
                SHOPPING BAG ({totalQuantity})
              </h3>
            </div>

            <button
              onClick={onClose}
              className="p-2 transition-colors cursor-pointer text-shadow/70 hover:text-dusty-rose rounded-full hover:bg-shadow/5"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nationwide Trust Strip */}
          <div className="bg-[#F3EFEA] px-6 py-3 border-b border-shadow/[0.06] flex items-center justify-between text-[9px] uppercase tracking-[0.2em] text-shadow/80 font-medium">
            <span className="flex items-center gap-1.5 text-dusty-rose">
              <Truck className="w-3.5 h-3.5" />
              CASH ON DELIVERY NATIONWIDE
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-dusty-rose" />
              FREE 2ML TEST VIAL
            </span>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
            {cartItems.length === 0 ? (
              <div className="py-24 text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-oyster flex items-center justify-center mx-auto text-dusty-rose">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <p className="font-serif text-lg uppercase tracking-[0.14em] text-shadow">
                    YOUR BAG IS EMPTY
                  </p>
                  <p className="text-xs font-sans text-shadow/60 tracking-wider">
                    Explore our signature &amp; impression flacons.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="mt-2 px-8 py-3.5 bg-shadow text-pearl hover:bg-dusty-rose text-[10px] uppercase tracking-[0.24em] font-semibold transition-all cursor-pointer shadow-sm active:scale-[0.98]"
                >
                  EXPLORE PERFUMES
                </button>
              </div>
            ) : (
              cartItems.map((item, idx) => {
                const isSignature = item.fragrance.productType === 'signature';
                const isDiscoverySet = item.fragrance.id === 'discovery-set';

                return (
                  <div
                    key={`${item.fragrance.id}-${item.size}-${idx}`}
                    className="flex gap-4 sm:gap-5 pb-6 border-b border-shadow/[0.08] last:border-b-0"
                  >
                    {/* Exact Bottle Image Showcase (Uncropped) */}
                    <div className="w-20 h-28 sm:w-24 sm:h-32 rounded-xs bg-[#F4EFEB] shrink-0 border border-shadow/[0.08] p-2 flex items-center justify-center relative overflow-hidden">
                      <img
                        src={item.fragrance.image}
                        alt={item.fragrance.name}
                        className="w-full h-full object-contain filter drop-shadow-sm select-none"
                      />
                      {isSignature && (
                        <span className="absolute bottom-1 left-1 right-1 text-center bg-shadow/90 text-pearl text-[7px] uppercase tracking-[0.2em] font-semibold py-0.5 rounded-2xs">
                          SIGNATURE
                        </span>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-serif text-base uppercase tracking-[0.12em] text-shadow font-normal leading-snug">
                            {getFragranceTitle(item.fragrance)}
                          </h4>
                          <span className="font-serif text-sm font-medium text-dusty-rose shrink-0">
                            Rs {(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>

                        <p className="text-[10px] uppercase tracking-[0.2em] text-dusty-rose font-medium pt-0.5">
                          {isDiscoverySet
                            ? '5 × 5 ML TESTERS'
                            : item.size === '100ml'
                            ? '100 ML FLACON'
                            : '50 ML FLACON'}
                        </p>
                        <p className="text-[9px] uppercase tracking-[0.18em] text-shadow/50 pt-0.5">
                          {isSignature ? 'Maison Original' : isDiscoverySet ? 'Coffret Set' : 'Impression Flacon'}
                        </p>
                      </div>

                      <div className="flex justify-between items-center pt-3 border-t border-shadow/[0.04]">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-shadow/20 rounded-xs bg-white">
                          <button
                            onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                            className="p-1.5 transition-colors cursor-pointer text-shadow/80 hover:text-dusty-rose"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-sans text-shadow font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                            className="p-1.5 transition-colors cursor-pointer text-shadow/80 hover:text-dusty-rose"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(idx)}
                          className="text-[10px] uppercase tracking-[0.2em] text-shadow/50 hover:text-dusty-rose transition-colors cursor-pointer"
                        >
                          REMOVE
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout */}
          {cartItems.length > 0 && (
            <div className="p-6 sm:p-8 border-t border-shadow/[0.08] bg-[#F7F4F0] space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs tracking-widest uppercase font-sans text-shadow/70">
                  <span>SHIPPING (PAKISTAN)</span>
                  <span className="text-dusty-rose font-medium">COMPLIMENTARY</span>
                </div>
                <div className="flex justify-between text-sm uppercase tracking-widest font-sans font-medium pt-1 text-shadow">
                  <span>TOTAL ESTIMATE</span>
                  <span className="font-serif text-xl font-medium text-dusty-rose">
                    Rs {subtotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  const cartDetails = cartItems
                    .map(
                      (i) =>
                        `• ${getFragranceTitle(i.fragrance)} (${i.fragrance.id === 'discovery-set' ? '5x5ml Testers' : i.size}, qty: ${i.quantity}) - Rs ${(
                          i.price * i.quantity
                        ).toLocaleString()}`
                    )
                    .join('\n');
                  const msg = encodeURIComponent(
                    `Hello FUME Concierge, I would like to place an order with FUME FRAGRANCES (Cash on Delivery):\n\n${cartDetails}\n\nTotal: Rs ${subtotal.toLocaleString()}\n\nDelivery Address: `
                  );
                  window.open(`https://wa.me/92381825636?text=${msg}`, '_blank');
                  onClose();
                }}
                className="w-full py-4 text-xs uppercase tracking-[0.26em] font-sans font-semibold transition-all duration-300 cursor-pointer flex items-center justify-center gap-3 bg-shadow text-pearl hover:bg-dusty-rose shadow-md active:scale-[0.98]"
              >
                <span>CONFIRM ORDER VIA WHATSAPP (COD)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-1">
                <p className="text-[9px] uppercase tracking-[0.22em] text-shadow/50">
                  ALL-DAY SILAGE GUARANTEE • 2ML TEST VIAL INCLUDED
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
