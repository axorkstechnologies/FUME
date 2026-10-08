import 'server-only';
import { db } from '../index';
import { products, productVariants, productImages, productNotes, productAccords, collections } from '../schema';
import { eq, and, or, ilike, desc, sql } from 'drizzle-orm';

export interface ProductFilters {
  collectionSlug?: string;
  scentFamily?: string;
  featured?: boolean;
}

export interface Pagination {
  limit?: number;
  offset?: number;
}

export async function getPublishedProducts(filters?: ProductFilters, pagination?: Pagination) {
  const limit = pagination?.limit ?? 50;
  const offset = pagination?.offset ?? 0;

  const conditions = [eq(products.published, true)];

  if (filters?.scentFamily) {
    conditions.push(ilike(products.scentFamily, `%${filters.scentFamily}%`));
  }
  if (filters?.featured !== undefined) {
    conditions.push(eq(products.featured, filters.featured));
  }

  let query = db
    .select({
      product: products,
      collection: collections,
    })
    .from(products)
    .leftJoin(collections, eq(products.collectionId, collections.id))
    .where(and(...conditions))
    .limit(limit)
    .offset(offset)
    .orderBy(desc(products.featured), desc(products.createdAt));

  const rows = await query;

  // Enrich with default variants & primary images
  const productIds = rows.map((r) => r.product.id);
  if (productIds.length === 0) return [];

  const allVariants = await db.select().from(productVariants).where(eq(productVariants.isActive, true));
  const allImages = await db.select().from(productImages).orderBy(desc(productImages.isHero), productImages.sortOrder);
  const allNotes = await db.select().from(productNotes);
  const allAccords = await db.select().from(productAccords).orderBy(productAccords.sortOrder);

  return rows.map(({ product, collection }) => {
    return {
      ...product,
      collection,
      variants: allVariants.filter((v) => v.productId === product.id),
      images: allImages.filter((img) => img.productId === product.id),
      notes: allNotes.filter((n) => n.productId === product.id),
      accords: allAccords.filter((a) => a.productId === product.id),
    };
  });
}

export async function getProductBySlug(slug: string) {
  const rows = await db
    .select({
      product: products,
      collection: collections,
    })
    .from(products)
    .leftJoin(collections, eq(products.collectionId, collections.id))
    .where(and(eq(products.slug, slug), eq(products.published, true)))
    .limit(1);

  if (!rows.length) return null;

  const { product, collection } = rows[0];

  const variants = await db.select().from(productVariants).where(and(eq(productVariants.productId, product.id), eq(productVariants.isActive, true)));
  const images = await db.select().from(productImages).where(eq(productImages.productId, product.id)).orderBy(desc(productImages.isHero), productImages.sortOrder);
  const notes = await db.select().from(productNotes).where(eq(productNotes.productId, product.id));
  const accords = await db.select().from(productAccords).where(eq(productAccords.productId, product.id)).orderBy(productAccords.sortOrder);

  return {
    ...product,
    collection,
    variants,
    images,
    notes,
    accords,
  };
}

export async function getProductById(id: string) {
  const rows = await db
    .select()
    .from(products)
    .where(eq(products.id, id))
    .limit(1);

  return rows[0] || null;
}

export async function searchProducts(searchTerm: string, pagination?: Pagination) {
  const limit = pagination?.limit ?? 20;
  const offset = pagination?.offset ?? 0;
  const term = `%${searchTerm}%`;

  const rows = await db
    .select({
      product: products,
      collection: collections,
    })
    .from(products)
    .leftJoin(collections, eq(products.collectionId, collections.id))
    .where(
      and(
        eq(products.published, true),
        or(
          ilike(products.name, term),
          ilike(products.description, term),
          ilike(products.scentFamily, term),
          ilike(products.shortDescription, term)
        )
      )
    )
    .limit(limit)
    .offset(offset);

  return rows.map((r) => ({ ...r.product, collection: r.collection }));
}

export async function getFeaturedProducts() {
  return getPublishedProducts({ featured: true });
}
