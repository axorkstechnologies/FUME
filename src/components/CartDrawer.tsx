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
        className="absolute inset-0 bg-pearl/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div
          className="w-screen max-w-md border-l border-shadow/[0.08] flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300 bg-pearl/95 backdrop-blur-2xl text-shadow"
        >
          {/* Header */}
          <div
            className="p-6 md:p-8 border-b border-shadow/[0.08] flex items-center justify-between"
          >
            <div className="space-y-0.5">
              <span className="text-[9px] uppercase tracking-[0.35em] text-dusty-rose block font-sans font-medium">
                FUME SHOPPING BAG • SINCE 2024
              </span>
              <h3
                className="font-serif text-xl font-normal uppercase tracking-[0.16em] text-shadow"
              >
                YOUR SELECTION ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
              </h3>
            </div>

            <button
              onClick={onClose}
              className="p-2 transition-colors cursor-pointer text-shadow/60 hover:text-dusty-rose"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Luxury Pakistani Trust Strip */}
          <div className="bg-shadow/5 px-6 py-2.5 border-b border-shadow/[0.06] flex items-center justify-between text-[9px] uppercase tracking-wider font-sans text-dusty-rose">
            <span>✓ CASH ON DELIVERY NATIONWIDE</span>
            <span className="text-shadow/60">FREE 2ML TESTER INCLUDED</span>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
            {cartItems.length === 0 ? (
              <div className="py-24 text-center space-y-4">
                <ShoppingBag
                  className="w-8 h-8 mx-auto text-dusty-rose"
                />
                <p
                  className="text-xs uppercase tracking-[0.25em] font-sans text-shadow/60"
                >
                  YOUR BAG IS CURRENTLY EMPTY
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 border border-dusty-rose text-xs uppercase tracking-[0.2em] font-sans transition-colors text-shadow hover:bg-dusty-rose hover:text-pearl"
                >
                  EXPLORE PERFUMES
                </button>
              </div>
            ) : (
              cartItems.map((item, idx) => (
                <div
                  key={`${item.fragrance.id}-${item.size}-${idx}`}
                  className="flex gap-4 pb-6 border-b border-shadow/[0.08]"
                >
                  <div
                    className="w-20 h-24 overflow-hidden rounded-xs shrink-0 border border-shadow/[0.08] p-1 flex items-center justify-center bg-shadow/5"
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
                          className="font-serif text-base uppercase tracking-wider text-shadow"
                        >
                          {getFragranceTitle(item.fragrance)}
                        </h4>
                        <p className="text-[10px] uppercase tracking-wider text-dusty-rose">
                          {item.fragrance.id === 'discovery-set'
                            ? '5 × 5 ML / 0.85 FL OZ'
                            : item.size === '100ml'
                            ? '100 ML / 3.4 FL OZ'
                            : '50 ML / 1.7 FL OZ'}
                        </p>
                      </div>
                      <span
                        className="text-xs font-medium text-dusty-rose"
                      >
                        Rs {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between items-center pt-3">
                      {/* Quantity Selector */}
                      <div
                        className="flex items-center border border-shadow/20 rounded-xs bg-pearl/40"
                      >
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                          className="p-1.5 transition-colors cursor-pointer text-shadow/60 hover:text-dusty-rose"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-sans text-shadow">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                          className="p-1.5 transition-colors cursor-pointer text-shadow/60 hover:text-dusty-rose"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(idx)}
                        className="text-[10px] uppercase tracking-wider text-shadow/60 hover:text-dusty-rose transition-colors cursor-pointer"
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
              className="p-6 md:p-8 border-t border-shadow/[0.08] bg-pearl space-y-4"
            >
              <div
                className="flex justify-between text-xs tracking-widest uppercase font-sans text-shadow/60"
              >
                <span>COMPLIMENTARY SHIPPING</span>
                <span className="text-dusty-rose">INCLUDED</span>
              </div>
              <div
                className="flex justify-between text-sm uppercase tracking-widest font-sans font-medium pt-1 text-shadow"
              >
                <span>ESTIMATED TOTAL</span>
                <span className="text-base text-dusty-rose">Rs {subtotal.toLocaleString()}</span>
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
                className="w-full py-4 text-xs uppercase tracking-[0.25em] font-sans font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 bg-dusty-rose text-pearl hover:bg-dusty-rose hover:shadow-[0_0_25px_rgba(201,169,166,0.4)]"
              >
                <span>PLACE COD ORDER VIA WHATSAPP</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p
                className="text-[9px] uppercase tracking-widest text-center text-shadow/40"
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
