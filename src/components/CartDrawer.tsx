import React from 'react';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
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
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div
      className={`fixed inset-0 z-[100] transition-all duration-500 ${
        isOpen ? 'visible' : 'invisible'
      }`}
      aria-hidden={!isOpen}
    >
      <div
        className={`absolute inset-0 bg-shadow/40 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      <div
        className={`absolute top-0 right-0 h-full w-full max-w-md bg-pearl text-shadow shadow-2xl transition-transform duration-500 ease-[0.16,1,0.3,1] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 sm:p-8 border-b border-shadow/[0.08]">
            <h2 className="font-serif text-2xl uppercase tracking-[0.14em]">
              YOUR BAG
            </h2>
            <button
              onClick={onClose}
              className="p-2 -mr-2 text-shadow/60 hover:text-shadow transition-colors"
              aria-label="Close bag"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
            {cartItems.length === 0 ? (
              <div className="py-32 text-center space-y-6">
                <ShoppingBag className="w-8 h-8 mx-auto text-shadow/20" />
                <div className="space-y-2">
                  <p className="font-serif text-xl uppercase tracking-[0.14em] text-shadow">
                    YOUR BAG IS EMPTY
                  </p>
                  <p className="text-xs font-sans text-shadow/50 tracking-widest uppercase">
                    Explore our signature & impression flacons.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="mt-6 px-10 py-4 border border-shadow text-shadow hover:bg-shadow hover:text-pearl text-[9px] uppercase tracking-[0.25em] font-sans transition-all"
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
                    className="flex gap-6 pb-8 border-b border-shadow/[0.08] last:border-b-0"
                  >
                    {/* Exact Bottle Image Showcase (Uncropped) */}
                    <div className={`w-24 h-32 rounded-none shrink-0 p-3 flex items-center justify-center relative overflow-hidden ${
                      isSignature ? 'bg-[#EAE6DF]' : 'bg-oyster/50'
                    }`}>
                      <img
                        src={item.fragrance.image}
                        alt={item.fragrance.name}
                        className="w-full h-full object-contain filter drop-shadow-sm select-none mix-blend-multiply"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start gap-4">
                          <h4 className="font-serif text-lg uppercase tracking-[0.14em] text-shadow leading-snug">
                            {getFragranceTitle(item.fragrance)}
                          </h4>
                          <span className="font-sans text-sm tracking-widest text-shadow shrink-0">
                            Rs {(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>

                        <p className="text-[9px] uppercase tracking-[0.25em] text-shadow/60 font-sans mt-2">
                          {isDiscoverySet
                            ? '5 X 5 ML TESTERS'
                            : item.size === '100ml'
                            ? '100 ML FLACON'
                            : '50 ML EAU DE PARFUM'}
                        </p>
                        <p className="text-[9px] uppercase tracking-[0.25em] text-shadow/40 font-sans mt-1">
                          {isSignature ? 'SIGNATURE' : isDiscoverySet ? 'COFFRET SET' : 'IMPRESSION'}
                        </p>
                      </div>

                      <div className="flex justify-between items-center mt-6">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-shadow/20">
                          <button
                            onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                            className="px-3 py-2 text-shadow/60 hover:text-shadow transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-[10px] font-sans text-shadow">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                            className="px-3 py-2 text-shadow/60 hover:text-shadow transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(idx)}
                          className="text-[9px] uppercase tracking-[0.25em] text-shadow/40 hover:text-shadow transition-colors"
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
            <div className="p-6 sm:p-8 border-t border-shadow/[0.08] bg-oyster/30">
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-[10px] tracking-[0.25em] uppercase font-sans text-shadow/60">
                  <span>SHIPPING</span>
                  <span>COMPLIMENTARY</span>
                </div>
                <div className="flex justify-between text-[10px] uppercase tracking-[0.25em] font-sans pt-3 border-t border-shadow/[0.05] text-shadow">
                  <span>TOTAL</span>
                  <span className="font-serif text-xl tracking-widest">
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
                    `Hello FUME Concierge, I would like to place an order (Cash on Delivery):\n\n${cartDetails}\n\nTotal: Rs ${subtotal.toLocaleString()}\n\nDelivery Address: `
                  );
                  window.open(`https://wa.me/923281825636?text=${msg}`, '_blank');
                  onClose();
                }}
                className="w-full py-5 text-[10px] uppercase tracking-[0.3em] font-sans transition-all duration-300 flex items-center justify-center gap-4 bg-shadow text-pearl hover:bg-shadow/90"
              >
                <span>CHECKOUT VIA WHATSAPP</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
