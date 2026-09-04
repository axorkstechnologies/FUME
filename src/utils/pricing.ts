/**
 * FUME Haute Parfumerie Official Pricing Logic
 *
 * 50 ML:
 * - Most (Rs 1,899): BLOOM, MY WAY, ETERNITY, WANTED, BECKHAM, AQUA, ISSEY, AMS, KHABIB, L'IMM, O'WOOD, LEGEND, V WMN, OPAL IRIS
 * - Prestige (Rs 2,499): BOMB, CREED, SAUVAGE, ROUGE, BLEU, ARAB, DESERT, MILLION, TUSCAN AMBER
 *
 * 100 ML (every SKU):
 * - 1899 -> Rs 3,750
 * - 2499 -> Rs 4,950
 */

export const PRESTIGE_IDS = new Set<string>([
  'bomb',
  'creed',
  'sauvage',
  'rouge',
  'bleu',
  'arab',
  'desert',
  'million',
  'tuscan-amber'
]);

export const getPrice50 = (id: string): number => {
  return PRESTIGE_IDS.has(id.toLowerCase()) ? 2499 : 1899;
};

export const getPrice100 = (price50: number): number => {
  return price50 >= 2400 ? 4950 : 3750;
};

export const getFragrancePrices = (id: string) => {
  const price50 = getPrice50(id);
  const price100 = getPrice100(price50);
  return { price50, price100 };
};

export const formatPrice = (price: number): string => {
  return `Rs ${price.toLocaleString()}`;
};
