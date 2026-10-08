import crypto from 'crypto';

export function generateOrderNumber(): string {
  // Generates customer-friendly readable format: e.g., FUME-7K9A2X
  const entropy = crypto.randomBytes(4).toString('hex').toUpperCase().slice(0, 6);
  const yearSuffix = new Date().getFullYear().toString().slice(-2);
  return `FUME-${yearSuffix}${entropy}`;
}
