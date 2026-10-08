import 'server-only';
import { db } from '../index';
import { carts, cartItems, productVariants, inventory } from '../schema';
import { eq, and, sql } from 'drizzle-orm';
import crypto from 'crypto';
import { AppError } from '../../lib/errors';
import { getCartWithItems } from '../queries/cart';

export async function createGuestCart() {
  const guestToken = crypto.randomBytes(32).toString('hex');
  const [newCart] = await db
    .insert(carts)
    .values({
      guestToken,
      currency: 'PKR',
      status: 'active',
    })
    .returning();

  return newCart;
}

export async function createUserCart(userId: string) {
  // Check if active cart already exists
  const existing = await db
    .select()
    .from(carts)
    .where(and(eq(carts.userId, userId), eq(carts.status, 'active')))
    .limit(1);

  if (existing.length > 0) {
    return existing[0];
  }

  const [newCart] = await db
    .insert(carts)
    .values({
      userId,
      currency: 'PKR',
      status: 'active',
    })
    .returning();

  return newCart;
}

export async function addItemToCart(cartId: string, variantId: string, quantity: number) {
  if (quantity <= 0 || quantity > 10) {
    throw new AppError('VALIDATION_ERROR', 'Quantity must be between 1 and 10', 400);
  }

  // Verify variant exists and is active
  const [variant] = await db
    .select()
    .from(productVariants)
    .where(and(eq(productVariants.id, variantId), eq(productVariants.isActive, true)))
    .limit(1);

  if (!variant) {
    throw new AppError('NOT_FOUND', 'Selected product variant was not found', 404);
  }

  // Check if cart item already exists
  const [existingItem] = await db
    .select()
    .from(cartItems)
    .where(and(eq(cartItems.cartId, cartId), eq(cartItems.variantId, variantId)))
    .limit(1);

  if (existingItem) {
    const newQty = existingItem.quantity + quantity;
    if (newQty > 10) {
      throw new AppError('VALIDATION_ERROR', 'Maximum 10 items per product permitted in cart', 400);
    }

    await db
      .update(cartItems)
      .set({
        quantity: newQty,
        unitPriceSnapshot: variant.price,
        updatedAt: new Date(),
      })
      .where(eq(cartItems.id, existingItem.id));
  } else {
    await db.insert(cartItems).values({
      cartId,
      variantId,
      quantity,
      unitPriceSnapshot: variant.price,
    });
  }

  return getCartWithItems(cartId);
}

export async function updateCartItemQuantity(cartItemId: string, quantity: number) {
  if (quantity <= 0) {
    return removeCartItem(cartItemId);
  }
  if (quantity > 10) {
    throw new AppError('VALIDATION_ERROR', 'Maximum 10 items per product permitted', 400);
  }

  const [item] = await db
    .select()
    .from(cartItems)
    .where(eq(cartItems.id, cartItemId))
    .limit(1);

  if (!item) {
    throw new AppError('NOT_FOUND', 'Cart item not found', 404);
  }

  await db
    .update(cartItems)
    .set({
      quantity,
      updatedAt: new Date(),
    })
    .where(eq(cartItems.id, cartItemId));

  return getCartWithItems(item.cartId);
}

export async function removeCartItem(cartItemId: string) {
  const [item] = await db
    .select()
    .from(cartItems)
    .where(eq(cartItems.id, cartItemId))
    .limit(1);

  if (!item) return null;

  await db.delete(cartItems).where(eq(cartItems.id, cartItemId));

  return getCartWithItems(item.cartId);
}

export async function mergeGuestCartToUserCart(guestCartId: string, userId: string) {
  const userCart = await createUserCart(userId);
  const guestItems = await db
    .select()
    .from(cartItems)
    .where(eq(cartItems.cartId, guestCartId));

  for (const gItem of guestItems) {
    await addItemToCart(userCart.id, gItem.variantId, gItem.quantity);
  }

  // Expire or mark guest cart as abandoned/merged
  await db
    .update(carts)
    .set({ status: 'merged', updatedAt: new Date() })
    .where(eq(carts.id, guestCartId));

  return getCartWithItems(userCart.id);
}
