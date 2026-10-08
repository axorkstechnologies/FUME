import 'server-only';
import { db } from '../index';
import { orders, orderItems, orderAddresses, orderStatusHistory, payments } from '../schema';
import { eq, and, desc } from 'drizzle-orm';
import { AppError } from '../../lib/errors';
import { validateTransition, OrderStatus } from '../../lib/commerce/order-state';

export async function getOrderById(orderId: string, userId?: string) {
  const conditions = [eq(orders.id, orderId)];
  if (userId) {
    conditions.push(eq(orders.userId, userId));
  }

  const [order] = await db
    .select()
    .from(orders)
    .where(and(...conditions))
    .limit(1);

  if (!order) return null;

  const [items, addresses, paymentRows, history] = await Promise.all([
    db.select().from(orderItems).where(eq(orderItems.orderId, order.id)),
    db.select().from(orderAddresses).where(eq(orderAddresses.orderId, order.id)),
    db.select().from(payments).where(eq(payments.orderId, order.id)),
    db.select().from(orderStatusHistory).where(eq(orderStatusHistory.orderId, order.id)).orderBy(desc(orderStatusHistory.createdAt)),
  ]);

  return {
    ...order,
    items,
    shippingAddress: addresses.find((a) => a.addressType === 'shipping') || null,
    payment: paymentRows[0] || null,
    history,
  };
}

export async function getOrdersByUserId(userId: string, limit = 20, offset = 0) {
  return db
    .select()
    .from(orders)
    .where(eq(orders.userId, userId))
    .orderBy(desc(orders.createdAt))
    .limit(limit)
    .offset(offset);
}

export async function updateOrderStatus(
  orderId: string,
  newStatus: OrderStatus,
  changedByAdminId?: string,
  note?: string
) {
  return db.transaction(async (tx) => {
    const [order] = await tx
      .select()
      .from(orders)
      .where(eq(orders.id, orderId))
      .limit(1);

    if (!order) {
      throw new AppError('NOT_FOUND', 'Order not found', 404);
    }

    const currentStatus = order.orderStatus as OrderStatus;
    if (!validateTransition(currentStatus, newStatus)) {
      throw new AppError(
        'VALIDATION_ERROR',
        `Invalid status transition from '${currentStatus}' to '${newStatus}'`,
        400
      );
    }

    await tx
      .update(orders)
      .set({
        orderStatus: newStatus,
        updatedAt: new Date(),
      })
      .where(eq(orders.id, orderId));

    await tx.insert(orderStatusHistory).values({
      orderId,
      fromStatus: currentStatus,
      toStatus: newStatus,
      changedBy: changedByAdminId || null,
      note: note || null,
    });

    return true;
  });
}
