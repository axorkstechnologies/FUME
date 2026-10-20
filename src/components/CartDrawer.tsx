import React, { useState, useEffect } from 'react';
import { X, Minus, Plus, ShoppingBag, ArrowRight, Check, ArrowLeft, ShieldCheck, MapPin, Phone, User, MessageSquare } from 'lucide-react';
import { CartItem, ThemeMode } from '../types';
import { getFragranceTitle } from '../data/fragrances';
import { supabaseClient } from '../lib/supabase/client';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart?: () => void;
  onOpenAccount?: () => void;
  themeMode?: ThemeMode;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenAccount
}) => {
  const [drawerStep, setDrawerStep] = useState<'cart' | 'checkout' | 'confirmation'>('cart');
  
  // Checkout Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Karachi');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<any | null>(null);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Pre-fill from patron profile if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem('fume_patron_session');
      if (saved) {
        const p = JSON.parse(saved);
        if (p.firstName || p.lastName) {
          setFullName(`${p.firstName || ''} ${p.lastName || ''}`.trim());
        }
        if (p.phone) setPhone(p.phone);
      }
      const savedAddrs = localStorage.getItem('fume_saved_addresses');
      if (savedAddrs) {
        const addrs = JSON.parse(savedAddrs);
        if (addrs.length > 0) {
          if (!address) setAddress(addrs[0].addressLine1 || '');
          if (!city && addrs[0].city) setCity(addrs[0].city);
        }
      }
    } catch {}
  }, [isOpen]);

  // Reset step when drawer closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        if (drawerStep === 'confirmation') {
          setDrawerStep('cart');
          setConfirmedOrder(null);
        }
      }, 500);
    }
  }, [isOpen, drawerStep]);

  const handleProceedToCheckout = () => {
    setDrawerStep('checkout');
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !address) return;

    setIsSubmitting(true);
    const orderNumber = `FUME-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const orderRecord = {
      id: `ord_${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
      paymentMethod: 'cod',
      paymentStatus: 'pending',
      totalAmount: subtotal,
      currency: 'PKR',
      customer: {
        fullName,
        phone,
        city,
        address,
        notes
      },
      items: cartItems.map(item => ({
        id: item.fragrance.id,
        name: getFragranceTitle(item.fragrance),
        size: item.size,
        price: item.price,
        quantity: item.quantity,
        customDetails: item.customDetails
      }))
    };

    // 1. Save to local storage orders
    try {
      const existing = JSON.parse(localStorage.getItem('fume_orders') || '[]');
      existing.unshift(orderRecord);
      localStorage.setItem('fume_orders', JSON.stringify(existing));
    } catch (err) {
      console.warn('Local order storage error:', err);
    }

    // 2. Persist to Supabase if available
    try {
      await supabaseClient.from('orders').insert([
        {
          order_number: orderNumber,
          customer_name: fullName,
          customer_phone: phone,
          shipping_city: city,
          shipping_address: address,
          total_price: subtotal,
          payment_method: 'cod',
          status: 'confirmed',
          items: orderRecord.items
        }
      ]);
    } catch {}

    setConfirmedOrder(orderRecord);
    setIsSubmitting(false);
    setDrawerStep('confirmation');

    // Clear cart items
    if (onClearCart) {
      onClearCart();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[100] transition-all duration-500 ${
        isOpen ? 'visible' : 'invisible'
      }`}
      aria-hidden={!isOpen}
    >
      {/* Frosted Glass Backdrop */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Luxury Slide-in Drawer */}
      <div
        className={`absolute top-0 right-0 h-full w-full max-w-lg bg-[#FDFBF7] text-shadow border-l border-white/20 shadow-[-20px_0_50px_rgba(0,0,0,0.3)] transition-transform duration-500 ease-[0.16,1,0.3,1] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 sm:p-8 border-b border-shadow/[0.08] bg-white/50 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              {drawerStep === 'checkout' && (
                <button
                  onClick={() => setDrawerStep('cart')}
                  className="p-1 -ml-1 text-shadow/60 hover:text-shadow transition-colors cursor-pointer"
                  aria-label="Back to bag"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              <h2 className="font-serif text-2xl uppercase tracking-[0.14em]">
                {drawerStep === 'cart' && 'YOUR BAG'}
                {drawerStep === 'checkout' && 'DELIVERY DETAILS'}
                {drawerStep === 'confirmation' && 'ORDER CONFIRMED'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 -mr-2 text-shadow/60 hover:text-shadow transition-colors cursor-pointer"
              aria-label="Close drawer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* STEP 1: CART ITEMS VIEW */}
          {drawerStep === 'cart' && (
            <>
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
                {cartItems.length === 0 ? (
                  <div className="py-32 text-center space-y-6">
                    <ShoppingBag className="w-8 h-8 mx-auto text-shadow/20" />
                    <div className="space-y-2">
                      <p className="font-serif text-xl uppercase tracking-[0.14em] text-shadow">
                        YOUR BAG IS EMPTY
                      </p>
                      <p className="text-xs font-sans text-shadow/50 tracking-widest uppercase font-light">
                        Explore our crown signature & impression flacons.
                      </p>
                    </div>
                    <button
                      onClick={onClose}
                      className="mt-6 px-10 py-4 tactile-button-dark animate-sheen text-[9px] uppercase tracking-[0.25em] font-sans font-semibold cursor-pointer"
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
                        className="flex gap-5 pb-6 border-b border-shadow/[0.08] last:border-b-0 crystal-vitrine"
                      >
                        {/* Flacon Showcase Frame */}
                        <div className={`w-24 h-32 rounded-none shrink-0 p-3 flex items-center justify-center relative overflow-hidden pedestal-light border border-shadow/[0.05] ${
                          isSignature ? 'bg-[#F4EFEB]' : 'bg-oyster/50'
                        }`}>
                          <img
                            src={item.fragrance.image}
                            alt={item.fragrance.name}
                            className="w-full h-full object-contain filter drop-shadow-sm select-none"
                            loading="lazy"
                          />
                        </div>

                        <div className="flex-1 flex flex-col justify-between py-1">
                          <div>
                            <div className="flex justify-between items-start gap-3">
                              <h4 className="font-serif text-base uppercase tracking-[0.14em] text-shadow leading-snug">
                                {getFragranceTitle(item.fragrance)}
                              </h4>
                              <span className="font-serif text-sm tracking-wider text-dusty-rose shrink-0 font-medium">
                                Rs {(item.price * item.quantity).toLocaleString()}
                              </span>
                            </div>

                            <p className="text-[9px] uppercase tracking-[0.22em] text-shadow/60 font-sans mt-1.5">
                              {isDiscoverySet
                                ? '5 × 5 ML TESTERS'
                                : item.size === '100ml'
                                ? '100 ML FLACON'
                                : '50 ML EAU DE PARFUM'}
                            </p>
                            <p className="text-[8px] uppercase tracking-[0.25em] text-[#D4A59A] font-sans mt-0.5 font-medium">
                              {item.customDetails
                                ? `BESPOKE • ${item.customDetails.direction || 'CUSTOM'}`
                                : isSignature ? 'CROWN SIGNATURE' : isDiscoverySet ? 'COFFRET SET' : 'IMPRESSION'}
                            </p>

                            {item.customDetails && (
                              <div className="mt-2 p-2.5 bg-white/80 border border-shadow/10 text-[8px] font-sans text-shadow/80 space-y-1">
                                <span className="block font-semibold uppercase tracking-wider text-shadow">
                                  Formula: {item.customDetails.customName || 'Bespoke Blend'}
                                </span>
                                <span className="block truncate">
                                  Notes: {item.customDetails.topNotes?.join(', ')} &bull; {item.customDetails.heartNotes?.join(', ')} &bull; {item.customDetails.baseNotes?.join(', ')}
                                </span>
                                {item.customDetails.engravingText && (
                                  <span className="block font-mono text-[7px] text-shadow/60 uppercase">
                                    Engraving: "{item.customDetails.engravingText}"
                                  </span>
                                )}
                              </div>
                            )}
                          </div>

                          <div className="flex justify-between items-center mt-4">
                            {/* Quantity Stepper */}
                            <div className="flex items-center border border-shadow/20 bg-white">
                              <button
                                onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center text-shadow/60 hover:text-shadow transition-colors cursor-pointer"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-6 text-center text-[10px] font-sans text-shadow font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center text-shadow/60 hover:text-shadow transition-colors cursor-pointer"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <button
                              onClick={() => onRemoveItem(idx)}
                              className="text-[9px] uppercase tracking-[0.22em] text-shadow/40 hover:text-shadow transition-colors cursor-pointer"
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

              {/* Footer & Checkout Buttons */}
              {cartItems.length > 0 && (
                <div className="p-6 sm:p-8 border-t border-shadow/[0.08] bg-white/70 backdrop-blur-sm space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] tracking-[0.25em] uppercase font-sans text-shadow/60">
                      <span>NATIONWIDE COURIER</span>
                      <span className="text-[#D4A59A] font-medium">COMPLIMENTARY</span>
                    </div>
                    <div className="flex justify-between text-[10px] uppercase tracking-[0.25em] font-sans pt-2 border-t border-shadow/[0.06] text-shadow">
                      <span>TOTAL (CASH ON DELIVERY)</span>
                      <span className="font-serif text-2xl font-medium text-dusty-rose">
                        Rs {subtotal.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    <button
                      onClick={handleProceedToCheckout}
                      className="w-full py-4.5 tactile-button-dark animate-sheen text-[10px] uppercase tracking-[0.3em] font-sans font-semibold transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
                    >
                      <span>PROCEED TO SECURE CHECKOUT</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        const cartDetails = cartItems
                          .map((i) => `• ${getFragranceTitle(i.fragrance)} (${i.size}, qty: ${i.quantity}) - Rs ${(i.price * i.quantity).toLocaleString()}`)
                          .join('\n');
                        const msg = encodeURIComponent(
                          `Hello FUME Concierge, I would like to place an order via WhatsApp (Cash on Delivery):\n\n${cartDetails}\n\nTotal: Rs ${subtotal.toLocaleString()}`
                        );
                        window.open(`https://wa.me/923281825636?text=${msg}`, '_blank');
                        onClose();
                      }}
                      className="w-full py-3 bg-white border border-shadow/20 hover:border-dusty-rose text-[9px] uppercase tracking-[0.24em] font-sans font-medium text-shadow transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-dusty-rose" />
                      <span>ORDER VIA WHATSAPP CONCIERGE</span>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* STEP 2: ON-SITE CASH ON DELIVERY CHECKOUT FORM */}
          {drawerStep === 'checkout' && (
            <form onSubmit={handleSubmitOrder} className="flex-1 flex flex-col justify-between overflow-y-auto">
              <div className="p-6 sm:p-8 space-y-5">
                <div className="p-3.5 bg-oyster/70 border border-shadow/10 text-xs text-shadow/80 space-y-1">
                  <div className="flex items-center gap-2 text-dusty-rose font-medium text-[9px] uppercase tracking-[0.25em]">
                    <ShieldCheck className="w-4 h-4" />
                    <span>NATIONWIDE CASH ON DELIVERY &bull; 2–4 BUSINESS DAYS</span>
                  </div>
                  <p className="text-[10px] text-shadow/60">
                    Pay safely in cash upon flacon inspection at your doorstep.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-wider text-shadow/70 font-sans block font-medium">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Asad Mansoor"
                      className="w-full bg-white border border-shadow/20 px-3.5 py-2.5 text-xs text-shadow focus:outline-none focus:border-dusty-rose shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-wider text-shadow/70 font-sans block font-medium">
                      WhatsApp / Phone Number (For Courier Contact) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0321 1234567"
                      className="w-full bg-white border border-shadow/20 px-3.5 py-2.5 text-xs text-shadow focus:outline-none focus:border-dusty-rose shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-wider text-shadow/70 font-sans block font-medium">
                      Destination City *
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-white border border-shadow/20 px-3.5 py-2.5 text-xs text-shadow focus:outline-none focus:border-dusty-rose"
                    >
                      <option value="Karachi">Karachi (Same Day / 24h Express)</option>
                      <option value="Lahore">Lahore</option>
                      <option value="Islamabad">Islamabad</option>
                      <option value="Rawalpindi">Rawalpindi</option>
                      <option value="Faisalabad">Faisalabad</option>
                      <option value="Peshawar">Peshawar</option>
                      <option value="Multan">Multan</option>
                      <option value="Quetta">Quetta</option>
                      <option value="Sialkot">Sialkot</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Gujranwala">Gujranwala</option>
                      <option value="Other">Other City in Pakistan</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-wider text-shadow/70 font-sans block font-medium">
                      Street Delivery Address *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="House / Apartment #, Street name, Sector / Area"
                      className="w-full bg-white border border-shadow/20 px-3.5 py-2.5 text-xs text-shadow focus:outline-none focus:border-dusty-rose resize-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-wider text-shadow/70 font-sans block font-medium">
                      Delivery Instructions (Optional)
                    </label>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Call before arrival, leave with concierge"
                      className="w-full bg-white border border-shadow/20 px-3.5 py-2 text-xs text-shadow focus:outline-none focus:border-dusty-rose"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="p-6 sm:p-8 border-t border-shadow/[0.08] bg-white/70 backdrop-blur-sm space-y-4">
                <div className="flex justify-between items-baseline text-xs uppercase tracking-widest font-sans">
                  <span className="text-shadow/60">PAYABLE UPON DELIVERY:</span>
                  <span className="font-serif text-2xl font-medium text-dusty-rose">
                    Rs {subtotal.toLocaleString()}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4.5 tactile-button-dark animate-sheen text-[10px] uppercase tracking-[0.3em] font-sans font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Check className="w-4 h-4 text-[#D4A59A]" />
                  <span>{isSubmitting ? 'CONFIRMING ALLOCATION...' : 'CONFIRM CASH ON DELIVERY ORDER'}</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: ORDER CONFIRMATION RECEIPT */}
          {drawerStep === 'confirmation' && confirmedOrder && (
            <div className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto text-center">
              <div className="w-16 h-16 rounded-full bg-black text-pearl flex items-center justify-center mx-auto border border-white/20 shadow-[0_8px_20px_rgba(0,0,0,0.15)]">
                <Check className="w-8 h-8 text-[#D4A59A]" />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.4em] text-dusty-rose font-sans font-semibold block">
                  FLACON ALLOCATION CONFIRMED
                </span>
                <h3 className="font-serif text-3xl uppercase tracking-[0.14em] text-shadow">
                  THANK YOU, {confirmedOrder.customer.fullName.toUpperCase()}
                </h3>
                <p className="text-xs font-sans text-shadow/70 tracking-wider">
                  Your creation has entered compounding and maceration inspection in our Karachi atelier.
                </p>
              </div>

              {/* Order Dossier Plaque */}
              <div className="p-6 luxury-glass-card border border-shadow/15 text-left space-y-4 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)]">
                <div className="flex justify-between items-center border-b border-shadow/10 pb-3">
                  <span className="text-[9px] uppercase tracking-widest text-shadow/60 font-sans">ORDER REFERENCE:</span>
                  <span className="font-mono text-sm tracking-widest font-bold text-shadow">
                    {confirmedOrder.orderNumber}
                  </span>
                </div>

                <div className="space-y-2 text-xs font-sans text-shadow/80 border-b border-shadow/10 pb-3">
                  <div className="flex justify-between">
                    <span className="text-shadow/60">PAYMENT:</span>
                    <span className="font-medium">Cash on Delivery</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-shadow/60">TOTAL PAYABLE:</span>
                    <span className="font-serif text-base font-semibold text-dusty-rose">
                      Rs {confirmedOrder.totalAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-shadow/60">DESTINATION:</span>
                    <span className="font-medium truncate max-w-[200px]">
                      {confirmedOrder.customer.city}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-shadow/60">ESTIMATED TRANSIT:</span>
                    <span className="font-medium text-[#D4A59A]">2–4 Business Days</span>
                  </div>
                </div>

                {/* Items Summary */}
                <div className="space-y-1 text-[11px] font-sans text-shadow/70">
                  <span className="text-[8px] uppercase tracking-widest text-dusty-rose block font-semibold">ALLOCATED FLACONS:</span>
                  {confirmedOrder.items.map((it: any, i: number) => (
                    <div key={i} className="flex justify-between py-0.5">
                      <span className="truncate pr-2">{it.name} ({it.size}) × {it.quantity}</span>
                      <span className="font-mono">Rs {(it.price * it.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => {
                    const msg = encodeURIComponent(
                      `Hello FUME Concierge! I have just confirmed Order #${confirmedOrder.orderNumber} on your website for Rs ${confirmedOrder.totalAmount.toLocaleString()} (Cash on Delivery to ${confirmedOrder.customer.city}). Please confirm receipt and tracking updates!`
                    );
                    window.open(`https://wa.me/923281825636?text=${msg}`, '_blank');
                  }}
                  className="w-full py-4 bg-white border border-shadow/30 hover:border-dusty-rose text-[9px] uppercase tracking-[0.24em] font-sans font-semibold text-shadow transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <MessageSquare className="w-4 h-4 text-dusty-rose" />
                  <span>TRACK VIA WHATSAPP CONCIERGE</span>
                </button>

                {onOpenAccount && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenAccount();
                    }}
                    className="w-full py-3 text-[9px] uppercase tracking-[0.25em] font-sans text-shadow/70 hover:text-shadow transition-colors cursor-pointer"
                  >
                    VIEW IN PATRON SANCTUARY
                  </button>
                )}

                <button
                  onClick={onClose}
                  className="w-full py-4.5 tactile-button-dark animate-sheen text-[10px] uppercase tracking-[0.28em] font-sans font-semibold cursor-pointer"
                >
                  CONTINUE DISCOVERING
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
