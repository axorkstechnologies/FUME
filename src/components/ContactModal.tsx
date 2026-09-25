import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { ThemeMode } from '../types';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  themeMode: ThemeMode;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, themeMode }) => {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const isLight = themeMode === 'light';

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`FUME Concierge Inquiry: ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:jiaaryan20@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-pearl/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-xl border p-8 md:p-12 shadow-2xl space-y-6 ${
          'bg-pearl border-shadow/10 text-shadow'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-6 right-6 p-2 cursor-pointer transition-colors ${
            'text-shadow/60 hover:text-shadow'
          }`}
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <span className="text-[10px] uppercase tracking-[0.35em] text-dusty-rose block font-sans font-medium">
            CLIENT SERVICES & CONCIERGE • SINCE 2024
          </span>
          <h3
            className={`font-serif text-2xl md:text-3xl font-normal uppercase tracking-[0.16em] ${
              'text-shadow'
            }`}
          >
            CONCIERGE INQUIRY
          </h3>
          <p
            className={`text-xs font-light ${
              'text-shadow/60'
            }`}
          >
            Shipping assistance, bespoke flacons, and private appointments.
          </p>
        </div>

        {sent ? (
          <div className="py-12 text-center space-y-3">
            <Check className="w-8 h-8 text-dusty-rose mx-auto" />
            <p className="font-serif text-lg uppercase tracking-wider text-dusty-rose">
              MESSAGE DISPATCHED
            </p>
            <p className={`text-xs ${'text-shadow/60'}`}>
              A FUME olfactory advisor will respond to your dossier within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
            <div className="space-y-1">
              <label
                className={`uppercase tracking-wider text-[10px] ${
                  'text-shadow/60'
                }`}
              >
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Madame / Monsieur"
                className={`w-full border px-3 py-2.5 focus:outline-none rounded-xs ${
                  'border-sand bg-white text-shadow'
                }`}
              />
            </div>

            <div className="space-y-1">
              <label
                className={`uppercase tracking-wider text-[10px] ${
                  'text-shadow/60'
                }`}
              >
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="patron@domain.com"
                className={`w-full border px-3 py-2.5 focus:outline-none rounded-xs ${
                  'border-sand bg-white text-shadow'
                }`}
              />
            </div>

            <div className="space-y-1">
              <label
                className={`uppercase tracking-wider text-[10px] ${
                  'text-shadow/60'
                }`}
              >
                Inquiry Details
              </label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Please describe your inquiry..."
                className={`w-full border px-3 py-2.5 focus:outline-none rounded-xs resize-none ${
                  'border-sand bg-white text-shadow'
                }`}
              />
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="submit"
                className={`w-full py-3.5 transition-colors uppercase tracking-[0.24em] font-medium text-[11px] cursor-pointer ${
                  'bg-oyster text-pearl hover:bg-dusty-rose'
                }`}
              >
                TRANSMIT DOSSIER VIA EMAIL
              </button>

              <a
                href={`https://wa.me/923132970468?text=${encodeURIComponent(
                  `Hello FUME Concierge, my name is ${name || 'Patron'}${email ? ` (${email})` : ''}.\nInquiry: ${message || 'I would like to inquire regarding FUME bespoke services.'}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-3 border transition-colors uppercase tracking-[0.22em] font-medium text-[11px] cursor-pointer text-center block ${
                  'border-dusty-rose text-shadow hover:bg-dusty-rose/10'
                }`}
              >
                DIRECT INQUIRY ON WHATSAPP (+92 313 297 0468)
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
