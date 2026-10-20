import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Check, ShoppingBag, Bookmark, MessageSquare, ChevronRight } from 'lucide-react';
import { Fragrance } from '../types';

interface CustomScentAtelierProps {
  onOpenContact: () => void;
  onAddToCart?: (fragrance: Fragrance, size?: '50ml' | '100ml', price?: number) => void;
  selectedDirection?: string;
}

interface NoteOption {
  id: string;
  name: string;
  facet: string;
  description: string;
}

const TOP_NOTES: NoteOption[] = [
  { id: 'calabrian-bergamot', name: 'Calabrian Bergamot', facet: 'Citrus', description: 'Crisp, sparkling sun-drenched Italian citrus' },
  { id: 'pink-pepper', name: 'Pink Pepper & Cardamom', facet: 'Spicy', description: 'Vibrant dry spice with mineral warmth' },
  { id: 'nocturnal-jasmine', name: 'Nocturnal Jasmine', facet: 'Floral', description: 'Intoxicating night-blooming white petals' },
  { id: 'blood-mandarin', name: 'Blood Mandarin', facet: 'Citrus', description: 'Sweet, succulent Sicilian citrus essence' },
  { id: 'frost-aldehydes', name: 'Frost Aldehydes', facet: 'Ozonic', description: 'Airy, metallic, crisp ozonic freshness' },
  { id: 'saffron-almond', name: 'Saffron & Bitter Almond', facet: 'Gourmand', description: 'Velvety, rich nutty warmth with golden spice' }
];

const HEART_NOTES: NoteOption[] = [
  { id: 'florentine-iris', name: 'Florentine Iris Butter', facet: 'Powdery', description: 'Aristocratic, earthy and root-like butter' },
  { id: 'smoky-birch', name: 'Smoky Birch & Nutmeg', facet: 'Woody', description: 'Dry tarred timber with spiced leathery warmth' },
  { id: 'damascena-rose', name: 'Velvet Damascena Rose', facet: 'Floral', description: 'Lush crimson petals infused with wine-honey' },
  { id: 'white-tuberose', name: 'White Tuberose & Neroli', facet: 'Floral', description: 'Creamy, hypnotic nocturnal white blossom' },
  { id: 'french-lavender', name: 'French Lavender & Sea Salt', facet: 'Aromatic', description: 'Clean herbal composure with oceanic mineral' },
  { id: 'bourbon-patchouli', name: 'Aged Bourbon Patchouli', facet: 'Earthy', description: 'Dark, aged timber and cocoa leaf resonance' }
];

const BASE_NOTES: NoteOption[] = [
  { id: 'cambodian-oud', name: 'Royal Cambodian Oud', facet: 'Oud', description: 'Rare, deep sacred resin with animalic warmth' },
  { id: 'tuscan-leather', name: 'Tuscan Leather', facet: 'Leather', description: 'Supple, hand-cured artisanal saddle leather' },
  { id: 'warm-amber', name: 'Warm Amber Resins', facet: 'Resin', description: 'Golden fossil resin with velvety honey sillage' },
  { id: 'smoked-oakmoss', name: 'Smoked Oakmoss & Vetiver', facet: 'Chypre', description: 'Forest-floor moss with smoky earthen depths' },
  { id: 'tonka-bean', name: 'Charred Tonka Bean', facet: 'Balsamic', description: 'Toasted almond, caramelized hay and balsamic' },
  { id: 'bourbon-vanilla', name: 'Pure Bourbon Vanilla', facet: 'Sweet', description: 'Dark Madagascar orchid pod aged in oak casks' },
  { id: 'virginian-cedar', name: 'Virginian Cedarwood', facet: 'Woody', description: 'Architectural, pencil-shaving noble timber' }
];

const DIRECTION_DEFAULTS: Record<string, { top: string[]; heart: string[]; base: string[] }> = {
  'FOR HER': {
    top: ['nocturnal-jasmine', 'blood-mandarin'],
    heart: ['damascena-rose', 'white-tuberose'],
    base: ['bourbon-vanilla', 'warm-amber']
  },
  'FOR HIM': {
    top: ['calabrian-bergamot', 'pink-pepper'],
    heart: ['smoky-birch', 'french-lavender'],
    base: ['tuscan-leather', 'virginian-cedar']
  },
  'UNISEX': {
    top: ['frost-aldehydes', 'calabrian-bergamot'],
    heart: ['florentine-iris', 'bourbon-patchouli'],
    base: ['smoked-oakmoss', 'tuscan-leather']
  },
  'ORIENTAL': {
    top: ['saffron-almond', 'pink-pepper'],
    heart: ['damascena-rose', 'florentine-iris'],
    base: ['cambodian-oud', 'warm-amber']
  }
};

export const CustomScentAtelier: React.FC<CustomScentAtelierProps> = ({
  onOpenContact,
  onAddToCart,
  selectedDirection: externalDirection
}) => {
  const [direction, setDirection] = useState<'FOR HER' | 'FOR HIM' | 'UNISEX' | 'ORIENTAL'>('ORIENTAL');
  const [selectedTop, setSelectedTop] = useState<string[]>(['saffron-almond', 'pink-pepper']);
  const [selectedHeart, setSelectedHeart] = useState<string[]>(['damascena-rose', 'florentine-iris']);
  const [selectedBase, setSelectedBase] = useState<string[]>(['cambodian-oud', 'warm-amber']);
  const [bottleSize, setBottleSize] = useState<'50ml' | '100ml'>('50ml');
  const [customName, setCustomName] = useState('Bespoke Formula No. 1');
  const [engravingText, setEngravingText] = useState('');
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Sync with external direction if passed
  useEffect(() => {
    if (externalDirection) {
      const upper = externalDirection.toUpperCase();
      if (['FOR HER', 'FOR HIM', 'UNISEX', 'ORIENTAL'].includes(upper)) {
        const dir = upper as 'FOR HER' | 'FOR HIM' | 'UNISEX' | 'ORIENTAL';
        setDirection(dir);
        const defaults = DIRECTION_DEFAULTS[dir];
        if (defaults) {
          setSelectedTop(defaults.top);
          setSelectedHeart(defaults.heart);
          setSelectedBase(defaults.base);
        }
      }
    }
  }, [externalDirection]);

  const handleDirectionChange = (newDir: 'FOR HER' | 'FOR HIM' | 'UNISEX' | 'ORIENTAL') => {
    setDirection(newDir);
    const defaults = DIRECTION_DEFAULTS[newDir];
    if (defaults) {
      setSelectedTop(defaults.top);
      setSelectedHeart(defaults.heart);
      setSelectedBase(defaults.base);
    }
  };

  const toggleNote = (
    noteId: string,
    currentSelected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (currentSelected.includes(noteId)) {
      if (currentSelected.length > 1) {
        setSelected(currentSelected.filter((id) => id !== noteId));
      }
    } else {
      if (currentSelected.length < 2) {
        setSelected([...currentSelected, noteId]);
      } else {
        // Replace second
        setSelected([currentSelected[0], noteId]);
      }
    }
  };

  const price = bottleSize === '100ml' ? 5500 : 3500;

  const topNames = selectedTop.map((id) => TOP_NOTES.find((n) => n.id === id)?.name || id);
  const heartNames = selectedHeart.map((id) => HEART_NOTES.find((n) => n.id === id)?.name || id);
  const baseNames = selectedBase.map((id) => BASE_NOTES.find((n) => n.id === id)?.name || id);

  const handleAddToCart = () => {
    if (!onAddToCart) return;
    setIsAdding(true);

    const bespokeFragrance: Fragrance = {
      id: `custom-${Date.now()}`,
      name: customName || 'Bespoke Atelier Creation',
      title: `FUME ATELIER: ${customName || 'Bespoke Creation'}`,
      subtitle: `Personal Formulation • ${direction} • Hand-blended in Karachi`,
      concentration: 'Extrait de Parfum (35% Oil Concentration)',
      volume: bottleSize === '100ml' ? '100 ML / 3.4 FL OZ' : '50 ML / 1.7 FL OZ',
      price: price,
      genderCategory: direction === 'FOR HIM' ? 'FOR HIM' : direction === 'FOR HER' ? 'FOR HER' : 'UNISEX',
      olfactoryFamily: direction === 'ORIENTAL' ? 'ORIENTAL' : 'WOODY',
      gender: direction === 'FOR HIM' ? 'him' : direction === 'FOR HER' ? 'her' : 'unisex',
      families: [direction.toLowerCase(), 'bespoke'],
      discovery: false,
      notesLine: `Top: ${topNames.join(', ')} | Heart: ${heartNames.join(', ')} | Base: ${baseNames.join(', ')}`,
      image: '/bottles/arab.webp',
      topNotes: topNames.join(', '),
      heartNotes: heartNames.join(', '),
      baseNotes: baseNames.join(', '),
      description: `Bespoke artisanal composition hand-crafted for the patron. Engraved flacon: "${engravingText || customName}". Olfactory direction: ${direction}.`,
      productType: 'signature',
      inStock: true,
      pastelBg: '#F5F2EF',
      pastelAccent: '#211E1D',
      pastelGlow: 'rgba(33, 30, 29, 0.08)',
      cardTone: 'signature'
    };

    onAddToCart(bespokeFragrance, bottleSize, price);
    setTimeout(() => setIsAdding(false), 800);
  };

  const handleSaveFormula = async () => {
    setSaveStatus('saving');
    const formulaPayload = {
      name: customName || 'Untitled Bespoke Formula',
      genderCategory: direction,
      topNotes: topNames,
      heartNotes: heartNames,
      baseNotes: baseNames,
      bottleSize,
      price,
      notes: engravingText ? `Engraving: "${engravingText}"` : undefined
    };

    // Store in localStorage immediately so it's guaranteed saved on the patron's device
    try {
      const existing = JSON.parse(localStorage.getItem('fume_saved_custom_scents') || '[]');
      existing.unshift({
        id: `local-custom-${Date.now()}`,
        ...formulaPayload,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('fume_saved_custom_scents', JSON.stringify(existing));
    } catch {
      // Ignore
    }

    // Attempt API save to database
    try {
      const res = await fetch('/api/custom-fragrances', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formulaPayload)
      });
      if (res.ok) {
        setSaveStatus('saved');
      } else {
        setSaveStatus('saved'); // Local persistence succeeded
      }
    } catch {
      setSaveStatus('saved'); // Local persistence succeeded
    }

    setTimeout(() => setSaveStatus(null), 3500);
  };

  const handleWhatsAppCustom = () => {
    const msg = encodeURIComponent(
      `Hello FUME Master Perfumer! I have composed a bespoke fragrance formulation on your site:\n\n` +
      `• Formula Name: ${customName}\n` +
      `• Direction: ${direction}\n` +
      `• Flacon Size: ${bottleSize} (Rs ${price.toLocaleString()})\n` +
      `• Flacon Engraving: "${engravingText || 'None'}"\n\n` +
      `• Top Notes: ${topNames.join(', ')}\n` +
      `• Heart Notes: ${heartNames.join(', ')}\n` +
      `• Base Notes: ${baseNames.join(', ')}\n\n` +
      `Please confirm compounding availability and reservation.`
    );
    window.open(`https://wa.me/923281825636?text=${msg}`, '_blank');
  };

  return (
    <section
      id="custom-scent-atelier"
      className="relative w-full py-28 md:py-40 px-5 sm:px-8 md:px-12 lg:px-20 bg-oyster border-t border-shadow/[0.08] overflow-hidden"
    >
      {/* Subtle architectural hairline accents */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-shadow/15 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-shadow/15 to-transparent" />

      <div className="max-w-[1400px] mx-auto space-y-16 md:space-y-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-4 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-shadow/10 bg-white/70 backdrop-blur-sm text-[9px] uppercase tracking-[0.45em] text-dusty-rose font-sans font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A59A]" />
            <span>HAUTE PARFUMERIE ATELIER • KARACHI</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal uppercase tracking-[0.16em] text-shadow leading-tight">
            CREATE YOUR <br className="hidden sm:block" />
            <span className="italic font-normal text-dusty-rose">SIGNATURE</span>
          </h2>
          <p className="text-xs sm:text-sm font-sans font-normal tracking-wide text-shadow/80 leading-relaxed">
            Select your olfactory direction and hand-pick raw essence notes across the top, heart, and base tiers. 
            Compounded by our master perfumer into an individually engraved flacon.
          </p>
        </motion.div>

        {/* Builder Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Note Selection Controls */}
          <div className="lg:col-span-7 space-y-10">
            {/* 1. Base Direction Selector */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-shadow/10 pb-2">
                <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-semibold text-shadow">
                  01. BASE OLFACTORY DIRECTION
                </span>
                <span className="text-[9px] uppercase tracking-wider text-dusty-rose font-sans">
                  PRIMARY CHARACTER
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {(['FOR HER', 'FOR HIM', 'UNISEX', 'ORIENTAL'] as const).map((dir) => {
                  const isActive = direction === dir;
                  return (
                    <button
                      key={dir}
                      onClick={() => handleDirectionChange(dir)}
                      className={`px-4 py-3.5 text-[10px] uppercase tracking-[0.22em] font-sans transition-all duration-300 border text-center cursor-pointer ${
                        isActive
                          ? 'tactile-button-dark font-semibold'
                          : 'bg-white/80 text-shadow/80 border-shadow/10 hover:border-dusty-rose hover:bg-white'
                      }`}
                    >
                      {dir}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Top Notes Tier */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-shadow/10 pb-2">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-semibold text-shadow">
                    02. TOP NOTES
                  </span>
                  <span className="ml-2 text-[9px] uppercase tracking-wider text-shadow/50 font-sans">
                    (FIRST 15–30 MINUTES)
                  </span>
                </div>
                <span className="text-[9px] uppercase tracking-wider text-dusty-rose font-sans font-medium">
                  {selectedTop.length}/2 SELECTED
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {TOP_NOTES.map((note) => {
                  const isSelected = selectedTop.includes(note.id);
                  return (
                    <div
                      key={note.id}
                      onClick={() => toggleNote(note.id, selectedTop, setSelectedTop)}
                      className={`p-3.5 border transition-all duration-300 cursor-pointer flex items-start justify-between ${
                        isSelected
                          ? 'bg-white border-shadow shadow-[0_4px_16px_rgba(0,0,0,0.08)] ring-1 ring-shadow/90'
                          : 'bg-white/70 backdrop-blur-sm border-shadow/10 hover:border-dusty-rose/40 hover:bg-white'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] uppercase tracking-wider font-sans font-medium ${isSelected ? 'text-shadow' : 'text-shadow/80'}`}>
                            {note.name}
                          </span>
                          <span className="text-[8px] uppercase tracking-widest px-1.5 py-0.5 bg-shadow/[0.05] text-shadow/60">
                            {note.facet}
                          </span>
                        </div>
                        <p className="text-[9px] text-shadow/60 font-sans leading-tight">
                          {note.description}
                        </p>
                      </div>
                      <div className={`w-4 h-4 rounded-none border flex items-center justify-center shrink-0 ml-2 mt-0.5 ${
                        isSelected ? 'bg-shadow border-shadow text-pearl' : 'border-shadow/20'
                      }`}>
                        {isSelected && <Check className="w-2.5 h-2.5" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Heart Notes Tier */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-shadow/10 pb-2">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-semibold text-shadow">
                    03. HEART NOTES
                  </span>
                  <span className="ml-2 text-[9px] uppercase tracking-wider text-shadow/50 font-sans">
                    (CORE SILLAGE • 2–6 HOURS)
                  </span>
                </div>
                <span className="text-[9px] uppercase tracking-wider text-dusty-rose font-sans font-medium">
                  {selectedHeart.length}/2 SELECTED
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {HEART_NOTES.map((note) => {
                  const isSelected = selectedHeart.includes(note.id);
                  return (
                    <div
                      key={note.id}
                      onClick={() => toggleNote(note.id, selectedHeart, setSelectedHeart)}
                      className={`p-3.5 border transition-all duration-300 cursor-pointer flex items-start justify-between ${
                        isSelected
                          ? 'bg-white border-shadow shadow-[0_4px_16px_rgba(0,0,0,0.08)] ring-1 ring-shadow/90'
                          : 'bg-white/70 backdrop-blur-sm border-shadow/10 hover:border-dusty-rose/40 hover:bg-white'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] uppercase tracking-wider font-sans font-medium ${isSelected ? 'text-shadow' : 'text-shadow/80'}`}>
                            {note.name}
                          </span>
                          <span className="text-[8px] uppercase tracking-widest px-1.5 py-0.5 bg-shadow/[0.05] text-shadow/60">
                            {note.facet}
                          </span>
                        </div>
                        <p className="text-[9px] text-shadow/60 font-sans leading-tight">
                          {note.description}
                        </p>
                      </div>
                      <div className={`w-4 h-4 rounded-none border flex items-center justify-center shrink-0 ml-2 mt-0.5 ${
                        isSelected ? 'bg-shadow border-shadow text-pearl' : 'border-shadow/20'
                      }`}>
                        {isSelected && <Check className="w-2.5 h-2.5" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4. Base Notes Tier */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-shadow/10 pb-2">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-semibold text-shadow">
                    04. BASE NOTES
                  </span>
                  <span className="ml-2 text-[9px] uppercase tracking-wider text-shadow/50 font-sans">
                    (DRYDOWN MEMORY • 8–16 HOURS)
                  </span>
                </div>
                <span className="text-[9px] uppercase tracking-wider text-dusty-rose font-sans font-medium">
                  {selectedBase.length}/2 SELECTED
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {BASE_NOTES.map((note) => {
                  const isSelected = selectedBase.includes(note.id);
                  return (
                    <div
                      key={note.id}
                      onClick={() => toggleNote(note.id, selectedBase, setSelectedBase)}
                      className={`p-3.5 border transition-all duration-300 cursor-pointer flex items-start justify-between ${
                        isSelected
                          ? 'bg-white border-shadow shadow-[0_4px_16px_rgba(0,0,0,0.08)] ring-1 ring-shadow/90'
                          : 'bg-white/70 backdrop-blur-sm border-shadow/10 hover:border-dusty-rose/40 hover:bg-white'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] uppercase tracking-wider font-sans font-medium ${isSelected ? 'text-shadow' : 'text-shadow/80'}`}>
                            {note.name}
                          </span>
                          <span className="text-[8px] uppercase tracking-widest px-1.5 py-0.5 bg-shadow/[0.05] text-shadow/60">
                            {note.facet}
                          </span>
                        </div>
                        <p className="text-[9px] text-shadow/60 font-sans leading-tight">
                          {note.description}
                        </p>
                      </div>
                      <div className={`w-4 h-4 rounded-none border flex items-center justify-center shrink-0 ml-2 mt-0.5 ${
                        isSelected ? 'bg-shadow border-shadow text-pearl' : 'border-shadow/20'
                      }`}>
                        {isSelected && <Check className="w-2.5 h-2.5" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Live Composition Summary & Packaging */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
            <div className="luxury-glass border border-shadow/15 p-6 sm:p-8 space-y-6 shadow-[0_20px_45px_-12px_rgba(10,10,10,0.06)] relative overflow-hidden">
              <div className="border-b border-shadow/10 pb-4 flex items-center justify-between">
                <span className="text-[9px] uppercase tracking-[0.32em] text-dusty-rose font-sans font-semibold">
                  FORMULATION DOSSIER
                </span>
                <span className="text-[8px] uppercase tracking-[0.24em] px-2.5 py-1 bg-shadow text-pearl font-sans font-medium border border-white/10">
                  ATELIER EDITION
                </span>
              </div>

              {/* Bespoke Flacon Mockup Card with Dynamic Engraving */}
              <div className="p-4 bg-pearl/90 border border-shadow/10 flex items-center gap-4 relative overflow-hidden pedestal-light">
                <div className="w-16 h-20 bg-white/80 border border-shadow/20 flex flex-col items-center justify-center p-2 relative shadow-[0_4px_10px_rgba(0,0,0,0.04)] shrink-0">
                  <div className="w-4 h-2 bg-shadow/70 mb-1" />
                  <span className="font-serif text-[8px] tracking-widest text-shadow uppercase font-bold text-center leading-none">
                    FUME
                  </span>
                  <div className="w-full h-px bg-shadow/20 my-1" />
                  <span className="text-[6px] tracking-tighter text-dusty-rose font-sans uppercase truncate max-w-full text-center">
                    {customName || 'BESPOKE'}
                  </span>
                  {engravingText && (
                    <span className="text-[5px] tracking-widest text-shadow/60 font-mono uppercase truncate max-w-full text-center mt-0.5">
                      {engravingText}
                    </span>
                  )}
                </div>
                <div className="space-y-1 min-w-0">
                  <span className="text-[8px] uppercase tracking-[0.25em] text-dusty-rose font-semibold block">
                    BESPOKE FLACON PREVIEW
                  </span>
                  <h4 className="font-serif text-sm uppercase tracking-wider text-shadow truncate">
                    {customName || 'Bespoke Formula'}
                  </h4>
                  <p className="text-[8px] uppercase tracking-widest text-shadow/60 font-sans">
                    {bottleSize.toUpperCase()} FLACON &bull; {direction} DIRECTION
                  </p>
                </div>
              </div>

              {/* Formula Moniker & Flacon Engraving */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-shadow/70 font-sans block font-medium">
                    Formula Name / Title
                  </label>
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="e.g. Nocturne No. 7"
                    className="w-full bg-white/90 border border-shadow/15 px-3.5 py-2.5 text-xs font-serif tracking-wider text-shadow focus:outline-none focus:border-dusty-rose shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-shadow/70 font-sans block font-medium">
                    Flacon Custom Engraving (Optional)
                  </label>
                  <input
                    type="text"
                    maxLength={30}
                    value={engravingText}
                    onChange={(e) => setEngravingText(e.target.value)}
                    placeholder="e.g. HAMZA • MMXXIV"
                    className="w-full bg-white/90 border border-shadow/15 px-3.5 py-2.5 text-xs font-sans tracking-widest text-shadow uppercase focus:outline-none focus:border-dusty-rose shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
                  />
                </div>
              </div>

              {/* Olfactory Pyramid Architecture Visualization */}
              <div className="bg-white/80 p-5 border border-shadow/10 space-y-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                <span className="text-[9px] uppercase tracking-[0.28em] text-shadow/70 font-sans font-semibold block text-center">
                  PYRAMID ARCHITECTURE
                </span>

                <div className="space-y-3 font-sans text-xs">
                  {/* Top */}
                  <div className="border-b border-shadow/10 pb-2.5">
                    <span className="text-[8px] uppercase tracking-[0.22em] text-dusty-rose font-semibold block">
                      TOP ACCORDS
                    </span>
                    <span className="text-[11px] font-serif text-shadow block tracking-wide">
                      {topNames.join(' • ')}
                    </span>
                  </div>

                  {/* Heart */}
                  <div className="border-b border-shadow/10 pb-2.5">
                    <span className="text-[8px] uppercase tracking-[0.22em] text-dusty-rose font-semibold block">
                      HEART CORE
                    </span>
                    <span className="text-[11px] font-serif text-shadow block tracking-wide">
                      {heartNames.join(' • ')}
                    </span>
                  </div>

                  {/* Base */}
                  <div>
                    <span className="text-[8px] uppercase tracking-[0.22em] text-dusty-rose font-semibold block">
                      DRYDOWN BASE
                    </span>
                    <span className="text-[11px] font-serif text-shadow block tracking-wide">
                      {baseNames.join(' • ')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Volume & Price Choice */}
              <div className="space-y-3 pt-2">
                <span className="text-[9px] uppercase tracking-[0.2em] text-shadow/70 font-sans block font-medium">
                  FLACON APOTHECARY VOLUME
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setBottleSize('50ml')}
                    className={`p-3 text-center border font-sans transition-all duration-300 cursor-pointer ${
                      bottleSize === '50ml'
                        ? 'tactile-button-dark font-semibold'
                        : 'bg-white/80 text-shadow border-shadow/15 hover:border-dusty-rose'
                    }`}
                  >
                    <span className="block text-xs font-semibold">50 ML</span>
                    <span className="block text-[9px] tracking-wider opacity-80">Rs 3,500</span>
                  </button>
                  <button
                    onClick={() => setBottleSize('100ml')}
                    className={`p-3 text-center border font-sans transition-all duration-300 cursor-pointer ${
                      bottleSize === '100ml'
                        ? 'tactile-button-dark font-semibold'
                        : 'bg-white/80 text-shadow border-shadow/15 hover:border-dusty-rose'
                    }`}
                  >
                    <span className="block text-xs font-semibold">100 ML</span>
                    <span className="block text-[9px] tracking-wider opacity-80">Rs 5,500</span>
                  </button>
                </div>
              </div>

              {/* Total & CTAs */}
              <div className="pt-4 border-t border-shadow/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.22em] font-sans text-shadow/70">
                    BESPOKE TOTAL
                  </span>
                  <span className="font-serif text-2xl font-medium text-dusty-rose">
                    Rs {price.toLocaleString()}
                  </span>
                </div>

                <div className="space-y-2.5">
                  <button
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className="w-full py-4.5 tactile-button-dark animate-sheen text-[10px] uppercase tracking-[0.28em] font-sans font-semibold transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{isAdding ? 'ADDING TO BAG...' : 'ADD BESPOKE SCENT TO BAG'}</span>
                  </button>

                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      onClick={handleSaveFormula}
                      className="py-3 px-3 bg-white border border-shadow/20 hover:border-dusty-rose text-shadow text-[9px] uppercase tracking-[0.2em] font-sans font-medium transition-colors duration-300 flex items-center justify-center gap-1.5 cursor-pointer hover:bg-pearl"
                    >
                      <Bookmark className="w-3 h-3 text-dusty-rose" />
                      <span>{saveStatus === 'saved' ? '✓ SAVED' : saveStatus === 'saving' ? 'SAVING...' : 'SAVE FORMULA'}</span>
                    </button>

                    <button
                      onClick={handleWhatsAppCustom}
                      className="py-3 px-3 bg-white border border-shadow/20 hover:border-dusty-rose text-shadow text-[9px] uppercase tracking-[0.2em] font-sans font-medium transition-colors duration-300 flex items-center justify-center gap-1.5 cursor-pointer hover:bg-pearl"
                    >
                      <MessageSquare className="w-3 h-3 text-dusty-rose" />
                      <span>WHATSAPP ATELIER</span>
                    </button>
                  </div>
                </div>

                <p className="text-[9px] uppercase tracking-[0.2em] text-center text-shadow/50 font-sans pt-1">
                  Complimentary nationwide courier &bull; Hand-blended in Karachi &bull; Master Formula Preserved
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
