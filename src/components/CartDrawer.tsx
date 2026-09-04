import React from 'react';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem, ThemeMode } from '../types';
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
          className={`w-screen max-w-md border-l flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300 ${
            isLight
              ? 'bg-[#FAF8F5] text-[#1A1816] border-[#E8DFC9]'
              : 'bg-[#0a0a0a] text-[#f5f4f0] border-[#222222]'
          }`}
        >
          {/* Header */}
          <div
            className={`p-6 md:p-8 border-b flex items-center justify-between ${
              isLight ? 'border-[#E8DFC9]' : 'border-[#1a1a1a]'
            }`}
          >
            <div className="space-y-0.5">
              <span className="text-[9px] uppercase tracking-[0.35em] text-[#C5A059] block font-sans font-medium">
                FUME SHOPPING BAG • SINCE 2024
              </span>
              <h3
                className={`font-serif text-xl font-normal uppercase tracking-[0.16em] ${
                  isLight ? 'text-[#1A1816]' : 'text-white'
                }`}
              >
                YOUR SELECTION ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
              </h3>
            </div>

            <button
              onClick={onClose}
              className={`p-2 transition-colors cursor-pointer ${
                isLight ? 'text-[#7D766E] hover:text-[#1A1816]' : 'text-[#8c8985] hover:text-white'
              }`}
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
            {cartItems.length === 0 ? (
              <div className="py-24 text-center space-y-4">
                <ShoppingBag
                  className={`w-8 h-8 mx-auto ${isLight ? 'text-[#C5A059]' : 'text-[#555555]'}`}
                />
                <p
                  className={`text-xs uppercase tracking-[0.25em] font-sans ${
                    isLight ? 'text-[#7D766E]' : 'text-[#8c8985]'
                  }`}
                >
                  YOUR BAG IS CURRENTLY EMPTY
                </p>
                <button
                  onClick={onClose}
                  className={`px-6 py-2.5 border text-xs uppercase tracking-[0.2em] font-sans transition-colors ${
                    isLight
                      ? 'border-[#1A1816] text-[#1A1816] hover:bg-[#1A1816] hover:text-white'
                      : 'border-[#333333] hover:border-white text-white'
                  }`}
                >
                  EXPLORE PERFUMES
                </button>
              </div>
            ) : (
              cartItems.map((item, idx) => (
                <div
                  key={`${item.fragrance.id}-${item.size}-${idx}`}
                  className={`flex gap-4 pb-6 border-b ${
                    isLight ? 'border-[#E8DFC9]' : 'border-[#1a1a1a]'
                  }`}
                >
                  <div
                    className="w-20 h-24 overflow-hidden rounded-xs shrink-0 border border-[#C5A059]/30 p-1 flex items-center justify-center"
                    style={{
                      backgroundColor: isLight ? item.fragrance.pastelBg : '#111111'
                    }}
                  >
                    <FlaconBottle
                      fragrance={item.fragrance}
                      variant="thumb"
                      themeMode={themeMode}
                      customMonogram={item.monogram}
                      className="w-full h-full"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4
                          className={`font-serif text-base uppercase tracking-wider ${
                            isLight ? 'text-[#1A1816]' : 'text-white'
                          }`}
                        >
                          {item.fragrance.name}
                        </h4>
                        <p className="text-[10px] uppercase tracking-wider text-[#C5A059]">
                          {item.size === '100ml' ? '100 ML / 3.4 FL OZ' : '50 ML / 1.7 FL OZ'}
                        </p>
                      </div>
                      <span
                        className={`text-xs font-medium ${
                          isLight ? 'text-[#1A1816]' : 'text-white'
                        }`}
                      >
                        ${item.price * item.quantity}
                      </span>
                    </div>

                    <div className="flex justify-between items-center pt-3">
                      {/* Quantity Selector */}
                      <div
                        className={`flex items-center border rounded-xs ${
                          isLight ? 'border-[#E0D5C3]' : 'border-[#333333]'
                        }`}
                      >
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                          className={`p-1.5 transition-colors cursor-pointer ${
                            isLight ? 'hover:text-[#C5A059]' : 'hover:text-white text-[#8c8985]'
                          }`}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-sans">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                          className={`p-1.5 transition-colors cursor-pointer ${
                            isLight ? 'hover:text-[#C5A059]' : 'hover:text-white text-[#8c8985]'
                          }`}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(idx)}
                        className="text-[10px] uppercase tracking-wider text-[#8C8377] hover:text-red-500 transition-colors cursor-pointer"
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
              className={`p-6 md:p-8 border-t space-y-4 ${
                isLight ? 'border-[#E8DFC9] bg-[#F5F0E6]' : 'border-[#1a1a1a] bg-[#0d0d0d]'
              }`}
            >
              <div
                className={`flex justify-between text-xs tracking-widest uppercase font-sans ${
                  isLight ? 'text-[#7D766E]' : 'text-[#8c8985]'
                }`}
              >
                <span>COMPLIMENTARY SHIPPING</span>
                <span className="text-[#C5A059]">INCLUDED</span>
              </div>
              <div
                className={`flex justify-between text-sm uppercase tracking-widest font-sans font-medium pt-1 ${
                  isLight ? 'text-[#1A1816]' : 'text-white'
                }`}
              >
                <span>ESTIMATED TOTAL</span>
                <span className="text-base">${subtotal}</span>
              </div>

              <button
                onClick={() => {
                  alert(`Proceeding to FUME Secure Allocation Checkout ($${subtotal}). Thank you.`);
                  onClose();
                }}
                className={`w-full py-4 text-xs uppercase tracking-[0.25em] font-sans font-medium transition-colors cursor-pointer flex items-center justify-center gap-2 ${
                  isLight
                    ? 'bg-[#1A1816] text-[#FAF8F5] hover:bg-[#C5A059]'
                    : 'bg-[#C5A059] text-black hover:bg-white'
                }`}
              >
                <span>SECURE CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p
                className={`text-[9px] uppercase tracking-widest text-center ${
                  isLight ? 'text-[#8C8377]' : 'text-[#666666]'
                }`}
              >
                HAND-POURED IN GRASSE • COMPLIMENTARY SAMPLER INCLUDED
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
