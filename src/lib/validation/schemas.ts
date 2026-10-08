import { z } from 'zod';

export const addressSchema = z.object({
  firstName: z.string().min(1).max(255),
  lastName: z.string().min(1).max(255),
  phone: z.string().min(1).max(50).optional(),
  addressLine1: z.string().min(1).max(255),
  addressLine2: z.string().max(255).optional(),
  area: z.string().max(255).optional(),
  city: z.string().min(1).max(255),
  province: z.string().max(255).optional(),
  postalCode: z.string().max(50).optional(),
  country: z.string().min(1).max(255).default('Pakistan'),
  label: z.string().max(100).optional(),
  isDefault: z.boolean().optional(),
});

export const customerInfoSchema = z.object({
  email: z.string().email().max(255),
  phone: z.string().min(1).max(50).optional(),
  firstName: z.string().min(1).max(255),
  lastName: z.string().min(1).max(255),
});

export const checkoutSchema = z.object({
  cartId: z.string().uuid(),
  customer: customerInfoSchema,
  shippingAddress: addressSchema,
  paymentMethod: z.enum(['cod']),
  discountCode: z.string().max(100).optional(),
  idempotencyKey: z.string().max(255).optional(),
});

export const cartItemSchema = z.object({
  variantId: z.string().uuid(),
  quantity: z.number().int().min(1).max(10),
});

export const contactRequestSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email().max(255),
  phone: z.string().max(50).optional(),
  subject: z.string().max(255).optional(),
  message: z.string().min(1).max(5000),
});

export const conciergeRequestSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email().max(255),
  phone: z.string().max(50).optional(),
  requestType: z.string().max(100).optional(),
  message: z.string().min(1).max(5000),
  preferredContactMethod: z.string().max(50).optional(),
});

export const reviewSchema = z.object({
  productId: z.string().uuid(),
  rating: z.number().int().min(1).max(5),
  title: z.string().max(255).optional(),
  body: z.string().max(5000).optional(),
});

export const adminOrderStatusSchema = z.object({
  orderId: z.string().uuid(),
  newStatus: z.string().min(1).max(50),
  note: z.string().max(1000).optional(),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type CartItemInput = z.infer<typeof cartItemSchema>;
export type ContactRequestInput = z.infer<typeof contactRequestSchema>;
export type ConciergeRequestInput = z.infer<typeof conciergeRequestSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
export type AddressInput = z.infer<typeof addressSchema>;
