import { Film, FilmKind } from '../types';

export const FILMS: Film[] = [
  {
    id: 'desert-unboxing',
    src: '/videos/desert-unboxing.mp4',
    poster: '/videos/posters/desert-unboxing.webp',
    title: 'DESERT UNBOXING & SILLAGE',
    kicker: 'CLIENT UNBOXING',
    duration: '0:43',
    durationSec: 43,
    kind: 'review',
    productId: 'desert',
    productName: 'DESERT',
    loop: true,
    autoPlayMuted: true,
    blurb: '“First spray on the wrist — the amber and smoky sandalwood projection is unbelievable. The packaging is 10/10.”',
    author: 'Hamza K.',
    authorRole: 'Verified Buyer'
  },
  {
    id: 'bloom-review',
    src: '/videos/bloom-review.mp4',
    poster: '/videos/posters/bloom-review.webp',
    title: 'BLOOM: LASTED AN ENTIRE DAY',
    kicker: 'CREATOR REVIEW',
    duration: '0:40',
    durationSec: 40,
    kind: 'review',
    productId: 'bloom',
    productName: 'BLOOM',
    loop: true,
    autoPlayMuted: true,
    blurb: '“Wore it in the morning, went through college all day, and I can still clearly smell the fresh night jasmine on my wrist.”',
    author: 'Areeba M.',
    authorRole: 'Fragrance Enthusiast'
  },
  {
    id: 'arab-beauty',
    src: '/videos/arab-beauty.mp4',
    poster: '/videos/posters/arab-beauty.webp',
    title: 'ARAB LUXURY FLACON AESTHETIC',
    kicker: 'PRODUCT FILM',
    duration: '0:14',
    durationSec: 14,
    kind: 'lifestyle',
    productId: 'arab',
    productName: 'ARAB',
    loop: true,
    autoPlayMuted: true,
    blurb: '“Rich oud and golden saffron captured in heavy flint glass. Pure luxury on the vanity.”',
    author: 'FUME Studio',
    authorRole: 'Art Direction'
  },
  {
    id: 'bloom-unboxing',
    src: '/videos/bloom-unboxing.mp4',
    poster: '/videos/posters/bloom-unboxing.webp',
    title: 'BLOOM SUNLIT UNBOXING',
    kicker: 'LIFESTYLE UNBOXING',
    duration: '0:22',
    durationSec: 22,
    kind: 'lifestyle',
    productId: 'bloom',
    productName: 'BLOOM',
    loop: true,
    autoPlayMuted: true,
    blurb: '“Unwrapping the pristine embossed box and testing the luminous tuberose mist in warm morning sunlight.”',
    author: 'Sana R.',
    authorRole: 'Lifestyle Creator'
  },
  {
    id: 'arab-review',
    src: '/videos/arab-review.mp4',
    poster: '/videos/posters/arab-review.webp',
    title: 'ARAB IMPRESSIONS & LONGEVITY',
    kicker: 'IN-DEPTH REVIEW',
    duration: '0:41',
    durationSec: 41,
    kind: 'review',
    productId: 'arab',
    productName: 'ARAB',
    loop: true,
    autoPlayMuted: true,
    blurb: '“If you love deep oriental woods with spicy warmth that commands attention, ARAB is an absolute masterpiece.”',
    author: 'Zainab H.',
    authorRole: 'Scent Reviewer'
  },
  {
    id: 'fume-boutique-intro',
    src: '/videos/fume-boutique-intro.mp4',
    poster: '/videos/posters/fume-boutique-intro.webp',
    title: 'WELCOME TO THE FUME BOUTIQUE',
    kicker: 'MAISON BOUTIQUE',
    duration: '0:36',
    durationSec: 36,
    kind: 'house',
    productId: undefined,
    productName: 'HAUTE PARFUMERIE',
    loop: true,
    autoPlayMuted: true,
    blurb: '“Experience our hand-poured haute flacons, custom monogram engraving, and personal scent discovery at our flagship.”',
    author: 'FUME Concierge',
    authorRole: 'Flagship Experience'
  }
];

export const getFilmById = (id: string): Film | undefined => {
  return FILMS.find((f) => f.id === id);
};

export const getFilmsByProduct = (productId: string): Film[] => {
  const norm = productId.toLowerCase();
  return FILMS.filter((f) => f.productId?.toLowerCase() === norm);
};

export const getPrimaryFilmForProduct = (productId: string): Film | undefined => {
  const films = getFilmsByProduct(productId);
  return films[0];
};

export const getFilmsByKind = (kind: FilmKind): Film[] => {
  return FILMS.filter((f) => f.kind === kind);
};
