import 'server-only';
import { db } from '../index';
import {
  orders,
  orderItems,
  orderAddresses,
  payments,
  carts,
  cartItems,
  productVariants,
  products,
  discounts,
  discountUsages,
  inventory,
  inventoryMovements,
} from '../schema';
import { eq, and, sql } from 'drizzle-orm';
import { AppError } from '../../lib/errors';
import { generateOrderNumber } from '../../lib/commerce/order-number';
import { CheckoutInput } from '../../lib/validation/schemas';
import { getCartWithItems } from '../queries/cart';

export async function processCheckout(input: CheckoutInput, userId?: string) {
  const { cartId, customer, shippingAddress, paymentMethod, discountCode, idempotencyKey } = input;

  // 1. Idempotency Check
  if (idempotencyKey) {
    const [existingOrder] = await db
      .select()
      .from(orders)
      .where(eq(orders.idempotencyKey, idempotencyKey))
      .limit(1);

    if (existingOrder) {
      return {
        isDuplicate: true,
        order: existingOrder,
      };
    }
  }

  // 2. Fetch cart with authoritative items
  const cart = await getCartWithItems(cartId);
  if (!cart || cart.items.length === 0) {
    throw new AppError('CHECKOUT_ERROR', 'Cart is empty or inactive', 400);
  }

  // 3. Atomically perform checkout inside a database transaction
  const result = await db.transaction(async (tx) => {
    // 3a. Recalculate prices and inventory locks server-side
    let calculatedSubtotal = 0;
    const itemsSnapshot: Array<{
      productId: string;
      variantId: string;
      productName: string;
      variantName: string;
      sku: string | null;
      sizeMl: number | null;
      unitPrice: string;
      quantity: number;
      lineTotal: string;
    }> = [];

    for (const item of cart.items) {
      // Check current authoritative variant price
      const [variant] = await tx
        .select()
        .from(productVariants)
        .where(eq(productVariants.id, item.variantId))
        .limit(1);

      if (!variant || !variant.isActive) {
        throw new AppError('CHECKOUT_ERROR', `Item ${item.productName} is currently unavailable`, 400);
      }

      // Strict concurrency protection: row-level lock on inventory record
      const [inv] = await tx
        .select()
        .from(inventory)
        .where(eq(inventory.variantId, item.variantId))
        .for('update');

      if (inv) {
        if (inv.availableQuantity < item.quantity) {
          throw new AppError(
            'INVENTORY_ERROR',
            `Insufficient stock for ${item.productName} (${item.variantName}). Only ${inv.availableQuantity} left.`,
            409
          );
        }

        // Deduct available quantity atomically and verify affected row
        const [updatedInv] = await tx
          .update(inventory)
          .set({
            availableQuantity: sql`${inventory.availableQuantity} - ${item.quantity}`,
            updatedAt: new Date(),
          })
          .where(and(
            eq(inventory.variantId, item.variantId),
            sql`${inventory.availableQuantity} >= ${item.quantity}`
          ))
          .returning();

        if (!updatedInv) {
          throw new AppError(
            'INVENTORY_ERROR',
            `Insufficient stock for ${item.productName} (${item.variantName}). Concurrent checkout claimed the remaining inventory.`,
            409
          );
        }
      }

      const price = Number(variant.price);
      const lineTotal = price * item.quantity;
      calculatedSubtotal += lineTotal;

      itemsSnapshot.push({
        productId: item.productId,
        variantId: item.variantId,
        productName: item.productName,
        variantName: item.variantName,
        sku: variant.sku,
        sizeMl: variant.sizeMl,
        unitPrice: variant.price,
        quantity: item.quantity,
        lineTotal: lineTotal.toFixed(2),
      });
    }

    // 3b. Authoritative Discount evaluation
    let discountAmount = 0;
    let appliedDiscountId: string | null = null;

    if (discountCode) {
      const [discountRecord] = await tx
        .select()
        .from(discounts)
        .where(and(eq(discounts.code, discountCode.trim().toUpperCase()), eq(discounts.isActive, true)))
        .limit(1);

      if (discountRecord) {
        const now = new Date();
        const isValidDate =
          (!discountRecord.startsAt || discountRecord.startsAt <= now) &&
          (!discountRecord.endsAt || discountRecord.endsAt >= now);

        const meetsMinSubtotal =
          !discountRecord.minSubtotal || calculatedSubtotal >= Number(discountRecord.minSubtotal);

        const hasRemainingUses =
          discountRecord.maxUses === null || discountRecord.uses < discountRecord.maxUses;

        if (isValidDate && meetsMinSubtotal && hasRemainingUses) {
          if (discountRecord.type === 'percentage') {
            discountAmount = (calculatedSubtotal * Number(discountRecord.value)) / 100;
          } else {
            discountAmount = Number(discountRecord.value);
          }
          appliedDiscountId = discountRecord.id;

          // Increment discount usage
          await tx
            .update(discounts)
            .set({ uses: sql`${discounts.uses} + 1` })
            .where(eq(discounts.id, discountRecord.id));
        }
      }
    }

    const shippingAmount = 0; // Complimentary nationwide shipping
    const taxAmount = 0;
    const grandTotal = Math.max(0, calculatedSubtotal - discountAmount + shippingAmount + taxAmount);
    const orderNumber = generateOrderNumber();

    // 3c. Insert Order
    const [createdOrder] = await tx
      .insert(orders)
      .values({
        orderNumber,
        userId: userId || null,
        email: customer.email,
        phone: customer.phone || shippingAddress.phone || null,
        currency: 'PKR',
        subtotal: calculatedSubtotal.toFixed(2),
        discountAmount: discountAmount.toFixed(2),
        shippingAmount: shippingAmount.toFixed(2),
        taxAmount: taxAmount.toFixed(2),
        grandTotal: grandTotal.toFixed(2),
        paymentStatus: 'pending',
        orderStatus: 'pending',
        discountCode: discountCode || null,
        idempotencyKey: idempotencyKey || null,
      })
      .returning();

    // 3d. Insert Historical Order Items
    for (const snap of itemsSnapshot) {
      await tx.insert(orderItems).values({
        orderId: createdOrder.id,
        productId: snap.productId,
        variantId: snap.variantId,
        productName: snap.productName,
        variantName: snap.variantName,
        sku: snap.sku,
        sizeMl: snap.sizeMl,
        unitPrice: snap.unitPrice,
        quantity: snap.quantity,
        lineTotal: snap.lineTotal,
      });

      // Log inventory movement
      await tx.insert(inventoryMovements).values({
        variantId: snap.variantId,
        movementType: 'sale',
        quantity: -snap.quantity,
        referenceType: 'order',
        referenceId: createdOrder.id,
        reason: `Checkout order #${orderNumber}`,
      });
    }

    // 3e. Insert Shipping Address snapshot
    await tx.insert(orderAddresses).values({
      orderId: createdOrder.id,
      addressType: 'shipping',
      firstName: shippingAddress.firstName,
      lastName: shippingAddress.lastName,
      phone: shippingAddress.phone || customer.phone || null,
      addressLine1: shippingAddress.addressLine1,
      addressLine2: shippingAddress.addressLine2 || null,
      area: shippingAddress.area || null,
      city: shippingAddress.city,
      province: shippingAddress.province || null,
      postalCode: shippingAddress.postalCode || null,
      country: shippingAddress.country || 'Pakistan',
    });

    // 3f. Record Payment
    await tx.insert(payments).values({
      orderId: createdOrder.id,
      provider: 'COD',
      amount: grandTotal.toFixed(2),
      currency: 'PKR',
      status: 'pending',
      method: 'COD',
      metadata: { customerNote: 'Cash on Delivery' },
    });

    // 3g. Record Discount Usage if applied
    if (appliedDiscountId) {
      await tx.insert(discountUsages).values({
        discountId: appliedDiscountId,
        orderId: createdOrder.id,
        userId: userId || null,
      });
    }

    // 3h. Transition Cart to checked_out
    await tx
      .update(carts)
      .set({ status: 'checked_out', updatedAt: new Date() })
      .where(eq(carts.id, cartId));

    return createdOrder;
  });

  return {
    isDuplicate: false,
    order: result,
  };
}
