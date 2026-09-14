import React from 'react';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem, ThemeMode } from '../types';
import { getFragranceTitle } from '../data/fragrances';
import { FlaconBottle } from './FlaconBottle';

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
  onRemoveItem,
  themeMode
}) => {
  if (!isOpen) return null;

  const isLight = themeMode === 'light';
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div
          className="w-screen max-w-md border-l border-white/[0.08] flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300 bg-[#0E0D0C]/95 backdrop-blur-2xl text-[#F5F2EB]"
        >
          {/* Header */}
          <div
            className="p-6 md:p-8 border-b border-white/[0.08] flex items-center justify-between"
          >
            <div className="space-y-0.5">
              <span className="text-[9px] uppercase tracking-[0.35em] text-[#D4AF37] block font-sans font-medium">
                FUME SHOPPING BAG • SINCE 2024
              </span>
              <h3
                className="font-serif text-xl font-normal uppercase tracking-[0.16em] text-[#F5F2EB]"
              >
                YOUR SELECTION ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
              </h3>
            </div>

            <button
              onClick={onClose}
              className="p-2 transition-colors cursor-pointer text-[#9E9589] hover:text-[#D4AF37]"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Luxury Pakistani Trust Strip */}
          <div className="bg-[#141210] px-6 py-2.5 border-b border-white/[0.06] flex items-center justify-between text-[9px] uppercase tracking-wider font-sans text-[#D4AF37]">
            <span>✓ CASH ON DELIVERY NATIONWIDE</span>
            <span className="text-[#9E9589]">FREE 2ML TESTER INCLUDED</span>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
            {cartItems.length === 0 ? (
              <div className="py-24 text-center space-y-4">
                <ShoppingBag
                  className="w-8 h-8 mx-auto text-[#D4AF37]"
                />
                <p
                  className="text-xs uppercase tracking-[0.25em] font-sans text-[#9E9589]"
                >
                  YOUR BAG IS CURRENTLY EMPTY
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 border border-[#D4AF37] text-xs uppercase tracking-[0.2em] font-sans transition-colors text-[#F5F2EB] hover:bg-[#D4AF37] hover:text-black"
                >
                  EXPLORE PERFUMES
                </button>
              </div>
            ) : (
              cartItems.map((item, idx) => (
                <div
                  key={`${item.fragrance.id}-${item.size}-${idx}`}
                  className="flex gap-4 pb-6 border-b border-white/[0.08]"
                >
                  <div
                    className="w-20 h-24 overflow-hidden rounded-xs shrink-0 border border-white/[0.08] p-1 flex items-center justify-center bg-[#141210]"
                  >
                    <FlaconBottle
                      fragrance={item.fragrance}
                      variant="thumb"
                      themeMode="dark"
                      customMonogram={item.monogram}
                      className="w-full h-full"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4
                          className="font-serif text-base uppercase tracking-wider text-[#F5F2EB]"
                        >
                          {getFragranceTitle(item.fragrance)}
                        </h4>
                        <p className="text-[10px] uppercase tracking-wider text-[#D4AF37]">
                          {item.fragrance.id === 'discovery-set'
                            ? '5 × 5 ML / 0.85 FL OZ'
                            : item.size === '100ml'
                            ? '100 ML / 3.4 FL OZ'
                            : '50 ML / 1.7 FL OZ'}
                        </p>
                      </div>
                      <span
                        className="text-xs font-medium text-[#D4AF37]"
                      >
                        Rs {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between items-center pt-3">
                      {/* Quantity Selector */}
                      <div
                        className="flex items-center border border-white/20 rounded-xs bg-black/40"
                      >
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                          className="p-1.5 transition-colors cursor-pointer text-[#9E9589] hover:text-[#D4AF37]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-sans text-[#F5F2EB]">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                          className="p-1.5 transition-colors cursor-pointer text-[#9E9589] hover:text-[#D4AF37]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(idx)}
                        className="text-[10px] uppercase tracking-wider text-[#8C8377] hover:text-[#D4AF37] transition-colors cursor-pointer"
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {cartItems.length > 0 && (
            <div
              className="p-6 md:p-8 border-t border-white/[0.08] bg-[#12100E] space-y-4"
            >
              <div
                className="flex justify-between text-xs tracking-widest uppercase font-sans text-[#9E9589]"
              >
                <span>COMPLIMENTARY SHIPPING</span>
                <span className="text-[#D4AF37]">INCLUDED</span>
              </div>
              <div
                className="flex justify-between text-sm uppercase tracking-widest font-sans font-medium pt-1 text-[#F5F2EB]"
              >
                <span>ESTIMATED TOTAL</span>
                <span className="text-base text-[#D4AF37]">Rs {subtotal.toLocaleString()}</span>
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
                  window.open(`https://wa.me/923132970468?text=${msg}`, '_blank');
                  onClose();
                }}
                className="w-full py-4 text-xs uppercase tracking-[0.25em] font-sans font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 bg-[#D4AF37] text-black hover:bg-[#E5C158] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]"
              >
                <span>PLACE COD ORDER VIA WHATSAPP</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p
                className="text-[9px] uppercase tracking-widest text-center text-[#666666]"
              >
                14+ HOUR PERSISTENCE GUARANTEE • 2ML COMPLIMENTARY TESTER INCLUDED
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
