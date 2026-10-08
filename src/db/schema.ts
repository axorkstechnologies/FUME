import {
  pgTable,
  uuid,
  text,
  varchar,
  timestamp,
  boolean,
  integer,
  decimal,
  jsonb,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// PROFILES
export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey().notNull(), // References auth.users.id
  email: varchar('email', { length: 255 }).notNull().unique(),
  firstName: varchar('first_name', { length: 255 }),
  lastName: varchar('last_name', { length: 255 }),
  phone: varchar('phone', { length: 50 }),
  dateOfBirth: timestamp('date_of_birth', { withTimezone: true }),
  marketingOptIn: boolean('marketing_opt_in').default(false).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// ADDRESSES
export const addresses = pgTable('addresses', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => profiles.id, { onDelete: 'cascade' }),
  label: varchar('label', { length: 100 }),
  firstName: varchar('first_name', { length: 255 }).notNull(),
  lastName: varchar('last_name', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  addressLine1: varchar('address_line_1', { length: 255 }).notNull(),
  addressLine2: varchar('address_line_2', { length: 255 }),
  area: varchar('area', { length: 255 }),
  city: varchar('city', { length: 255 }).notNull(),
  province: varchar('province', { length: 255 }),
  postalCode: varchar('postal_code', { length: 50 }),
  country: varchar('country', { length: 255 }).notNull().default('Pakistan'),
  isDefault: boolean('is_default').default(false).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// CUSTOMER PREFERENCES
export const customerPreferences = pgTable('customer_preferences', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => profiles.id, { onDelete: 'cascade' }).notNull(),
  preferredScentFamily: varchar('preferred_scent_family', { length: 255 }),
  preferredIntensity: varchar('preferred_intensity', { length: 255 }),
  preferredOccasion: varchar('preferred_occasion', { length: 255 }),
  marketingPreferences: jsonb('marketing_preferences').default({}),
  conciergePreferences: jsonb('concierge_preferences').default({}),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// COLLECTIONS
export const collections = pgTable('collections', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  description: text('description'),
  story: text('story'),
  image: varchar('image', { length: 500 }),
  sortOrder: integer('sort_order').default(0).notNull(),
  isFeatured: boolean('is_featured').default(false).notNull(),
  isPublished: boolean('is_published').default(false).notNull(),
  seoTitle: varchar('seo_title', { length: 255 }),
  seoDescription: text('seo_description'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// PRODUCTS
export const products = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  collectionId: uuid('collection_id').references(() => collections.id, { onDelete: 'set null' }),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  description: text('description'),
  story: text('story'),
  price: decimal('price', { precision: 12, scale: 2 }).notNull(),
  currency: varchar('currency', { length: 3 }).notNull().default('PKR'),
  sku: varchar('sku', { length: 100 }),
  shortDescription: text('short_description'),
  concentration: varchar('concentration', { length: 100 }),
  longevity: varchar('longevity', { length: 100 }),
  projection: varchar('projection', { length: 100 }),
  occasion: varchar('occasion', { length: 255 }),
  season: varchar('season', { length: 255 }),
  scentFamily: varchar('scent_family', { length: 255 }),
  featured: boolean('featured').default(false).notNull(),
  published: boolean('published').default(false).notNull(),
  seoTitle: varchar('seo_title', { length: 255 }),
  seoDescription: text('seo_description'),
  canonicalSlug: varchar('canonical_slug', { length: 255 }),
  ogImage: varchar('og_image', { length: 500 }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// PRODUCT VARIANTS
export const productVariants = pgTable('product_variants', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id').references(() => products.id, { onDelete: 'cascade' }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  sku: varchar('sku', { length: 100 }).unique(),
  sizeMl: integer('size_ml'),
  price: decimal('price', { precision: 12, scale: 2 }).notNull(),
  compareAtPrice: decimal('compare_at_price', { precision: 12, scale: 2 }),
  isDefault: boolean('is_default').default(false).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// PRODUCT IMAGES
export const productImages = pgTable('product_images', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id').references(() => products.id, { onDelete: 'cascade' }).notNull(),
  variantId: uuid('variant_id').references(() => productVariants.id, { onDelete: 'set null' }),
  storagePath: varchar('storage_path', { length: 500 }).notNull(),
  altText: varchar('alt_text', { length: 255 }),
  sortOrder: integer('sort_order').default(0).notNull(),
  isHero: boolean('is_hero').default(false).notNull(),
  width: integer('width'),
  height: integer('height'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// PRODUCT NOTES
export const productNotes = pgTable('product_notes', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id').references(() => products.id, { onDelete: 'cascade' }).notNull(),
  note: varchar('note', { length: 255 }).notNull(),
  noteType: varchar('note_type', { length: 50 }).notNull(), // 'top', 'heart', 'base'
});

// PRODUCT ACCORDS
export const productAccords = pgTable('product_accords', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id').references(() => products.id, { onDelete: 'cascade' }).notNull(),
  accord: varchar('accord', { length: 255 }).notNull(),
  sortOrder: integer('sort_order').default(0).notNull(),
});

// TAGS & PRODUCT TAGS
export const tags = pgTable('tags', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull().unique(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
});

export const productTags = pgTable('product_tags', {
  productId: uuid('product_id').references(() => products.id, { onDelete: 'cascade' }).notNull(),
  tagId: uuid('tag_id').references(() => tags.id, { onDelete: 'cascade' }).notNull(),
});

// INVENTORY
export const inventory = pgTable('inventory', {
  id: uuid('id').primaryKey().defaultRandom(),
  variantId: uuid('variant_id').references(() => productVariants.id, { onDelete: 'cascade' }).notNull().unique(),
  availableQuantity: integer('available_quantity').default(0).notNull(),
  reservedQuantity: integer('reserved_quantity').default(0).notNull(),
  lowStockThreshold: integer('low_stock_threshold').default(5).notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// INVENTORY MOVEMENTS
export const inventoryMovements = pgTable('inventory_movements', {
  id: uuid('id').primaryKey().defaultRandom(),
  variantId: uuid('variant_id').references(() => productVariants.id, { onDelete: 'cascade' }).notNull(),
  movementType: varchar('movement_type', { length: 50 }).notNull(), // received, adjustment, sale, reservation, reservation_release, return, restock
  quantity: integer('quantity').notNull(),
  referenceType: varchar('reference_type', { length: 100 }),
  referenceId: varchar('reference_id', { length: 100 }),
  reason: text('reason'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// INVENTORY RESERVATIONS
export const inventoryReservations = pgTable('inventory_reservations', {
  id: uuid('id').primaryKey().defaultRandom(),
  variantId: uuid('variant_id').references(() => productVariants.id, { onDelete: 'cascade' }).notNull(),
  cartId: uuid('cart_id').notNull(), // Will reference carts.id once created
  orderId: uuid('order_id'), // Will reference orders.id
  quantity: integer('quantity').notNull(),
  status: varchar('status', { length: 50 }).notNull(), // active, released, converted, expired, cancelled
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  releasedAt: timestamp('released_at', { withTimezone: true }),
});

// CARTS
export const carts = pgTable('carts', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => profiles.id, { onDelete: 'set null' }),
  guestToken: varchar('guest_token', { length: 255 }),
  currency: varchar('currency', { length: 3 }).notNull().default('PKR'),
  status: varchar('status', { length: 50 }).notNull().default('active'),
  expiresAt: timestamp('expires_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// CART ITEMS
export const cartItems = pgTable('cart_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  cartId: uuid('cart_id').references(() => carts.id, { onDelete: 'cascade' }).notNull(),
  variantId: uuid('variant_id').references(() => productVariants.id, { onDelete: 'cascade' }).notNull(),
  quantity: integer('quantity').notNull(),
  unitPriceSnapshot: decimal('unit_price_snapshot', { precision: 12, scale: 2 }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// ORDERS
export const orders = pgTable('orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderNumber: varchar('order_number', { length: 100 }).notNull().unique(),
  userId: uuid('user_id').references(() => profiles.id, { onDelete: 'set null' }),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  currency: varchar('currency', { length: 3 }).notNull().default('PKR'),
  subtotal: decimal('subtotal', { precision: 12, scale: 2 }).notNull(),
  discountAmount: decimal('discount_amount', { precision: 12, scale: 2 }).default('0').notNull(),
  shippingAmount: decimal('shipping_amount', { precision: 12, scale: 2 }).default('0').notNull(),
  taxAmount: decimal('tax_amount', { precision: 12, scale: 2 }).default('0').notNull(),
  grandTotal: decimal('grand_total', { precision: 12, scale: 2 }).notNull(),
  paymentStatus: varchar('payment_status', { length: 50 }).notNull(), // pending, paid, failed, refunded
  orderStatus: varchar('order_status', { length: 50 }).notNull(), // pending, confirmed, processing, packed, shipped, out_for_delivery, delivered, cancelled, failed_delivery, returned, refunded
  discountCode: varchar('discount_code', { length: 100 }),
  notes: text('notes'),
  idempotencyKey: varchar('idempotency_key', { length: 255 }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// ORDER ITEMS
export const orderItems = pgTable('order_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderId: uuid('order_id').references(() => orders.id, { onDelete: 'cascade' }).notNull(),
  productId: uuid('product_id').references(() => products.id, { onDelete: 'set null' }),
  variantId: uuid('variant_id').references(() => productVariants.id, { onDelete: 'set null' }),
  productName: varchar('product_name', { length: 255 }).notNull(),
  variantName: varchar('variant_name', { length: 255 }).notNull(),
  sku: varchar('sku', { length: 100 }),
  sizeMl: integer('size_ml'),
  unitPrice: decimal('unit_price', { precision: 12, scale: 2 }).notNull(),
  quantity: integer('quantity').notNull(),
  lineTotal: decimal('line_total', { precision: 12, scale: 2 }).notNull(),
  metadata: jsonb('metadata'),
});

// ORDER ADDRESSES
export const orderAddresses = pgTable('order_addresses', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderId: uuid('order_id').references(() => orders.id, { onDelete: 'cascade' }).notNull(),
  addressType: varchar('address_type', { length: 50 }).notNull(), // shipping, billing
  firstName: varchar('first_name', { length: 255 }).notNull(),
  lastName: varchar('last_name', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  addressLine1: varchar('address_line_1', { length: 255 }).notNull(),
  addressLine2: varchar('address_line_2', { length: 255 }),
  area: varchar('area', { length: 255 }),
  city: varchar('city', { length: 255 }).notNull(),
  province: varchar('province', { length: 255 }),
  postalCode: varchar('postal_code', { length: 50 }),
  country: varchar('country', { length: 255 }).notNull(),
});

// ORDER STATUS HISTORY
export const orderStatusHistory = pgTable('order_status_history', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderId: uuid('order_id').references(() => orders.id, { onDelete: 'cascade' }).notNull(),
  fromStatus: varchar('from_status', { length: 50 }),
  toStatus: varchar('to_status', { length: 50 }).notNull(),
  changedBy: uuid('changed_by').references(() => profiles.id, { onDelete: 'set null' }), // Admin user ID
  note: text('note'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// PAYMENTS
export const payments = pgTable('payments', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderId: uuid('order_id').references(() => orders.id, { onDelete: 'cascade' }).notNull(),
  provider: varchar('provider', { length: 100 }).notNull(), // COD, stripe, jazzcash
  providerPaymentId: varchar('provider_payment_id', { length: 255 }),
  amount: decimal('amount', { precision: 12, scale: 2 }).notNull(),
  currency: varchar('currency', { length: 3 }).notNull().default('PKR'),
  status: varchar('status', { length: 50 }).notNull(), // pending, authorized, paid, failed, refunded, cancelled
  method: varchar('method', { length: 100 }), // COD
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// PAYMENT EVENTS
export const paymentEvents = pgTable('payment_events', {
  id: uuid('id').primaryKey().defaultRandom(),
  paymentId: uuid('payment_id').references(() => payments.id, { onDelete: 'cascade' }).notNull(),
  providerEventId: varchar('provider_event_id', { length: 255 }),
  eventType: varchar('event_type', { length: 255 }).notNull(),
  payload: jsonb('payload'),
  processed: boolean('processed').default(false).notNull(),
  processedAt: timestamp('processed_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// DISCOUNTS
export const discounts = pgTable('discounts', {
  id: uuid('id').primaryKey().defaultRandom(),
  code: varchar('code', { length: 100 }).notNull().unique(),
  type: varchar('type', { length: 50 }).notNull(), // percentage, fixed
  value: decimal('value', { precision: 12, scale: 2 }).notNull(),
  minSubtotal: decimal('min_subtotal', { precision: 12, scale: 2 }),
  startsAt: timestamp('starts_at', { withTimezone: true }),
  endsAt: timestamp('ends_at', { withTimezone: true }),
  maxUses: integer('max_uses'),
  uses: integer('uses').default(0).notNull(),
  perCustomerLimit: integer('per_customer_limit'),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// DISCOUNT USAGES
export const discountUsages = pgTable('discount_usages', {
  id: uuid('id').primaryKey().defaultRandom(),
  discountId: uuid('discount_id').references(() => discounts.id, { onDelete: 'cascade' }).notNull(),
  orderId: uuid('order_id').references(() => orders.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => profiles.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// REVIEWS
export const reviews = pgTable('reviews', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id').references(() => products.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => profiles.id, { onDelete: 'set null' }),
  orderId: uuid('order_id').references(() => orders.id, { onDelete: 'set null' }),
  rating: integer('rating').notNull(), // 1-5
  title: varchar('title', { length: 255 }),
  body: text('body'),
  status: varchar('status', { length: 50 }).notNull().default('pending'), // pending, approved, rejected
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// CONCIERGE REQUESTS
export const conciergeRequests = pgTable('concierge_requests', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  requestType: varchar('request_type', { length: 100 }), // styling, bespoke, etc.
  message: text('message').notNull(),
  preferredContactMethod: varchar('preferred_contact_method', { length: 50 }),
  status: varchar('status', { length: 50 }).notNull().default('new'), // new, in_progress, resolved
  assignedTo: uuid('assigned_to').references(() => profiles.id, { onDelete: 'set null' }), // Admin user
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// CONTACT REQUESTS
export const contactRequests = pgTable('contact_requests', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  subject: varchar('subject', { length: 255 }),
  message: text('message').notNull(),
  status: varchar('status', { length: 50 }).notNull().default('new'), // new, in_progress, resolved
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// ADMIN ROLES
export const adminRoles = pgTable('admin_roles', {
  userId: uuid('user_id').references(() => profiles.id, { onDelete: 'cascade' }).primaryKey(),
  role: varchar('role', { length: 50 }).notNull(), // super_admin, admin, manager, support
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// AUDIT LOGS
export const auditLogs = pgTable('audit_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => profiles.id, { onDelete: 'set null' }), // The admin who did it
  action: varchar('action', { length: 255 }).notNull(),
  entityType: varchar('entity_type', { length: 100 }),
  entityId: varchar('entity_id', { length: 255 }),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});
