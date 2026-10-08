import 'server-only';
import { db } from '../index';
import { collections, products } from '../schema';
import { eq, and, desc } from 'drizzle-orm';

export async function getPublishedCollections() {
  return db
    .select()
    .from(collections)
    .where(eq(collections.isPublished, true))
    .orderBy(collections.sortOrder, collections.name);
}

export async function getCollectionBySlug(slug: string) {
  const rows = await db
    .select()
    .from(collections)
    .where(and(eq(collections.slug, slug), eq(collections.isPublished, true)))
    .limit(1);

  return rows[0] || null;
}

export async function getCollectionProducts(collectionId: string, limit = 20, offset = 0) {
  return db
    .select()
    .from(products)
    .where(and(eq(products.collectionId, collectionId), eq(products.published, true)))
    .limit(limit)
    .offset(offset)
    .orderBy(desc(products.featured), desc(products.createdAt));
}
