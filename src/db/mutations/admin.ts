import 'server-only';
import { db } from '../index';
import { products, collections, discounts, adminRoles } from '../schema';
import { eq } from 'drizzle-orm';
import { AppError } from '../../lib/errors';

export async function createProduct(data: typeof products.$inferInsert) {
  const [created] = await db.insert(products).values(data).returning();
  return created;
}

export async function updateProduct(id: string, data: Partial<typeof products.$inferInsert>) {
  const [updated] = await db
    .update(products)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(products.id, id))
    .returning();
  return updated;
}

export async function createCollection(data: typeof collections.$inferInsert) {
  const [created] = await db.insert(collections).values(data).returning();
  return created;
}

export async function updateCollection(id: string, data: Partial<typeof collections.$inferInsert>) {
  const [updated] = await db
    .update(collections)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(collections.id, id))
    .returning();
  return updated;
}

export async function createDiscount(data: typeof discounts.$inferInsert) {
  const [created] = await db.insert(discounts).values(data).returning();
  return created;
}

export async function promoteToSuperAdmin(userId: string) {
  const [existing] = await db
    .select()
    .from(adminRoles)
    .where(eq(adminRoles.userId, userId))
    .limit(1);

  if (existing) {
    await db
      .update(adminRoles)
      .set({ role: 'super_admin', updatedAt: new Date() })
      .where(eq(adminRoles.userId, userId));
  } else {
    await db.insert(adminRoles).values({
      userId,
      role: 'super_admin',
    });
  }
  return true;
}
