import 'server-only';
import { db } from '../index';
import { carts, cartItems, productVariants, products, productImages } from '../schema';
import { eq, and, desc } from 'drizzle-orm';

export async function getCartById(cartId: string) {
  const rows = await db
    .select()
    .from(carts)
    .where(and(eq(carts.id, cartId), eq(carts.status, 'active')))
    .limit(1);

  return rows[0] || null;
}

export async function getCartByUserId(userId: string) {
  const rows = await db
    .select()
    .from(carts)
    .where(and(eq(carts.userId, userId), eq(carts.status, 'active')))
    .orderBy(desc(carts.createdAt))
    .limit(1);

  return rows[0] || null;
}

export async function getCartByGuestToken(guestToken: string) {
  const rows = await db
    .select()
    .from(carts)
    .where(and(eq(carts.guestToken, guestToken), eq(carts.status, 'active')))
    .orderBy(desc(carts.createdAt))
    .limit(1);

  return rows[0] || null;
}

export async function getCartWithItems(cartId: string) {
  const cart = await getCartById(cartId);
  if (!cart) return null;

  const items = await db
    .select({
      cartItem: cartItems,
      variant: productVariants,
      product: products,
    })
    .from(cartItems)
    .innerJoin(productVariants, eq(cartItems.variantId, productVariants.id))
    .innerJoin(products, eq(productVariants.productId, products.id))
    .where(eq(cartItems.cartId, cartId));

  // Compute authoritative server-side subtotal
  let subtotal = 0;
  const enrichedItems = items.map(({ cartItem, variant, product }) => {
    const price = Number(variant.price);
    const lineTotal = price * cartItem.quantity;
    subtotal += lineTotal;

    return {
      id: cartItem.id,
      cartId: cartItem.cartId,
      variantId: variant.id,
      productId: product.id,
      productName: product.name,
      variantName: variant.name,
      sizeMl: variant.sizeMl,
      sku: variant.sku,
      unitPrice: variant.price,
      quantity: cartItem.quantity,
      lineTotal: lineTotal.toFixed(2),
    };
  });

  return {
    ...cart,
    items: enrichedItems,
    itemCount: enrichedItems.reduce((acc, i) => acc + i.quantity, 0),
    subtotal: subtotal.toFixed(2),
  };
}
