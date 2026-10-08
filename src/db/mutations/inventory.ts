import 'server-only';
import { db } from '../index';
import { inventory, inventoryMovements, inventoryReservations } from '../schema';
import { eq, and, sql } from 'drizzle-orm';
import { AppError } from '../../lib/errors';

export async function reserveInventory(variantId: string, quantity: number, cartId: string, expiresMinutes = 15) {
  return db.transaction(async (tx) => {
    const [inv] = await tx
      .select()
      .from(inventory)
      .where(eq(inventory.variantId, variantId))
      .limit(1);

    if (!inv || inv.availableQuantity < quantity) {
      throw new AppError('INVENTORY_ERROR', 'Insufficient available inventory to reserve', 409);
    }

    // Atomically transfer available -> reserved
    await tx
      .update(inventory)
      .set({
        availableQuantity: sql`${inventory.availableQuantity} - ${quantity}`,
        reservedQuantity: sql`${inventory.reservedQuantity} + ${quantity}`,
        updatedAt: new Date(),
      })
      .where(and(eq(inventory.variantId, variantId), sql`${inventory.availableQuantity} >= ${quantity}`));

    const expiresAt = new Date(Date.now() + expiresMinutes * 60 * 1000);

    const [reservation] = await tx
      .insert(inventoryReservations)
      .values({
        variantId,
        cartId,
        quantity,
        status: 'active',
        expiresAt,
      })
      .returning();

    await tx.insert(inventoryMovements).values({
      variantId,
      movementType: 'reservation',
      quantity,
      referenceType: 'cart',
      referenceId: cartId,
      reason: `Temporary reservation for cart ${cartId}`,
    });

    return reservation;
  });
}

export async function releaseReservation(reservationId: string) {
  return db.transaction(async (tx) => {
    const [reservation] = await tx
      .select()
      .from(inventoryReservations)
      .where(and(eq(inventoryReservations.id, reservationId), eq(inventoryReservations.status, 'active')))
      .limit(1);

    if (!reservation) return null;

    await tx
      .update(inventory)
      .set({
        availableQuantity: sql`${inventory.availableQuantity} + ${reservation.quantity}`,
        reservedQuantity: sql`${inventory.reservedQuantity} - ${reservation.quantity}`,
        updatedAt: new Date(),
      })
      .where(eq(inventory.variantId, reservation.variantId));

    await tx
      .update(inventoryReservations)
      .set({
        status: 'released',
        releasedAt: new Date(),
      })
      .where(eq(inventoryReservations.id, reservationId));

    await tx.insert(inventoryMovements).values({
      variantId: reservation.variantId,
      movementType: 'reservation_release',
      quantity: reservation.quantity,
      referenceType: 'reservation',
      referenceId: reservationId,
      reason: 'Reservation released back to available pool',
    });

    return true;
  });
}

export async function adjustInventory(variantId: string, quantity: number, reason: string, adminUserId?: string) {
  return db.transaction(async (tx) => {
    const [inv] = await tx
      .select()
      .from(inventory)
      .where(eq(inventory.variantId, variantId))
      .limit(1);

    if (inv) {
      await tx
        .update(inventory)
        .set({
          availableQuantity: sql`${inventory.availableQuantity} + ${quantity}`,
          updatedAt: new Date(),
        })
        .where(eq(inventory.variantId, variantId));
    } else {
      await tx.insert(inventory).values({
        variantId,
        availableQuantity: Math.max(0, quantity),
        reservedQuantity: 0,
      });
    }

    await tx.insert(inventoryMovements).values({
      variantId,
      movementType: 'adjustment',
      quantity,
      referenceType: 'manual',
      reason,
      metadata: { adminUserId },
    });

    return true;
  });
}
