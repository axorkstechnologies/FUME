export type GenderCategory = 'ALL' | 'FOR HIM' | 'FOR HER' | 'UNISEX';
export type OlfactoryFamily = 'ALL' | 'FRESH' | 'WOODY' | 'ORIENTAL';

export interface Fragrance {
  id: string;
  name: string;
  subtitle: string;
  concentration: string; // 'Eau de Parfum'
  volume: string; // '50 ML / 1.7 FL OZ'
  price: number;
  genderCategory: 'FOR HIM' | 'FOR HER' | 'UNISEX';
  olfactoryFamily: 'FRESH' | 'WOODY' | 'ORIENTAL';
  gender: 'him' | 'her' | 'unisex';
  families: string[]; // e.g. ['fresh', 'woody'] — canonical multi-family for filtering
  discovery: boolean; // true for the 5 hero discovery scents
  notesLine: string; // one-liner notes description from catalog
  image: string;
  topNotes: string;
  heartNotes: string;
  baseNotes: string;
  description: string;
  origin?: string;
  inStock: boolean;
  // Pastel luxury aesthetic attributes
  pastelBg: string;
  pastelAccent: string;
  pastelGlow: string;
  cardTone: string;
}

export interface CartItem {
  fragrance: Fragrance;
  quantity: number;
  size: '50ml' | '100ml';
  price: number;
}

export interface Currency {
  code: string;
  symbol: string;
  rate: number;
}

export type ScreenView = 'home' | 'perfumes' | 'collections' | 'story' | 'contact' | 'care' | 'films';
export type ThemeMode = 'light' | 'dark';

export type FilmKind = 'lifestyle' | 'review' | 'house';

export interface Film {
  id: string;
  src: string;
  poster: string;
  title: string;
  kicker: string;
  duration: string; // e.g. '0:43'
  durationSec: number;
  kind: FilmKind;
  productId?: string; // id of associated fragrance, or undefined for house
  productName?: string;
  loop: boolean;
  autoPlayMuted: boolean;
  blurb: string;
  author?: string;
  authorRole?: string;
}
