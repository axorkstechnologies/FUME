import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as dotenv from 'dotenv';
import {
  collections,
  products,
  productVariants,
  productImages,
  productNotes,
  inventory,
} from './schema';
import { FRAGRANCES } from '../data/fragrances';

dotenv.config({ path: '.env.local' });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('DATABASE_URL is not set');
  process.exit(1);
}

const client = postgres(connectionString, { prepare: false });
const db = drizzle(client);

async function seed() {
  console.log('Seeding FUME catalog into PostgreSQL...');

  // 1. Create Core Collections
  const [signatureColl] = await db
    .insert(collections)
    .values({
      name: 'Signature Collection',
      slug: 'signature',
      description: 'The pinnacle of FUME artisanal perfumery: ARAB & DESERT. Formulated with authentic pure perfume oils.',
      isFeatured: true,
      isPublished: true,
      sortOrder: 1,
    })
    .onConflictDoNothing()
    .returning();

  const [impressionColl] = await db
    .insert(collections)
    .values({
      name: 'Impression Series',
      slug: 'impression',
      description: 'Masterwork olfactory impressions engineered for Pakistani climates with exceptional sillage.',
      isFeatured: false,
      isPublished: true,
      sortOrder: 2,
    })
    .onConflictDoNothing()
    .returning();

  const [discoveryColl] = await db
    .insert(collections)
    .values({
      name: 'Discovery Sets',
      slug: 'discovery',
      description: 'Curated 5x5ml flacon sets designed for personal olfactory exploration.',
      isFeatured: true,
      isPublished: true,
      sortOrder: 3,
    })
    .onConflictDoNothing()
    .returning();

  // Helper collection map
  const collMap: Record<string, string | undefined> = {
    signature: signatureColl?.id,
    impression: impressionColl?.id,
    set: discoveryColl?.id,
  };

  // 2. Insert Products from verified FRAGRANCES catalog
  for (const f of FRAGRANCES) {
    const isSignature = f.productType === 'signature';
    const isSet = f.productType === 'set';
    const collectionId = isSignature
      ? collMap.signature
      : isSet
      ? collMap.set
      : collMap.impression;

    const [prod] = await db
      .insert(products)
      .values({
        collectionId: collectionId || null,
        name: f.name,
        slug: f.id,
        description: f.description,
        shortDescription: f.subtitle,
        price: f.price.toFixed(2),
        currency: 'PKR',
        concentration: f.concentration || 'Eau de Parfum',
        scentFamily: f.olfactoryFamily || null,
        featured: isSignature || f.discovery || false,
        published: true,
      })
      .onConflictDoNothing()
      .returning();

    if (!prod) {
      console.log(`Product ${f.name} already exists or skipped.`);
      continue;
    }

    // Insert Default 50ml or 5x5ml Variant
    const sizeMl = isSet ? 25 : 50;
    const variantName = isSet ? '5 × 5ml Flacon Coffret' : '50ml Eau de Parfum';

    const [variant] = await db
      .insert(productVariants)
      .values({
        productId: prod.id,
        name: variantName,
        sizeMl,
        price: f.price.toFixed(2),
        isDefault: true,
        isActive: true,
      })
      .returning();

    // Initialize initial inventory record (0 stock, admin-editable as required)
    if (variant) {
      await db
        .insert(inventory)
        .values({
          variantId: variant.id,
          availableQuantity: 50, // Initial verified batch stock
          reservedQuantity: 0,
          lowStockThreshold: 5,
        })
        .onConflictDoNothing();
    }

    // Insert Hero Image
    if (f.image) {
      await db
        .insert(productImages)
        .values({
          productId: prod.id,
          variantId: variant?.id || null,
          storagePath: f.image,
          altText: `FUME FRAGRANCES — ${f.name} Flacon`,
          isHero: true,
          sortOrder: 0,
        })
        .onConflictDoNothing();
    }

    // Insert Notes (Top, Heart, Base)
    if (f.topNotes) {
      for (const note of f.topNotes.split(',').map((s) => s.trim())) {
        if (note) {
          await db.insert(productNotes).values({
            productId: prod.id,
            note,
            noteType: 'top',
          });
        }
      }
    }
    if (f.heartNotes) {
      for (const note of f.heartNotes.split(',').map((s) => s.trim())) {
        if (note) {
          await db.insert(productNotes).values({
            productId: prod.id,
            note,
            noteType: 'heart',
          });
        }
      }
    }
    if (f.baseNotes) {
      for (const note of f.baseNotes.split(',').map((s) => s.trim())) {
        if (note) {
          await db.insert(productNotes).values({
            productId: prod.id,
            note,
            noteType: 'base',
          });
        }
      }
    }

    console.log(`Seeded: ${f.name} (${f.price} PKR)`);
  }

  console.log('Seeding completed successfully!');
  await client.end();
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
