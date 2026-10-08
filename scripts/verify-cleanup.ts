import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('DATABASE_URL is not set');
  process.exit(1);
}

const sql = postgres(connectionString, { prepare: false, max: 1 });

async function verify() {
  console.log('====================================================');
  console.log('     POST-CLEANUP VERIFICATION REPORT');
  console.log('====================================================\n');

  // Inventory with product names
  const inv = await sql`
    SELECT i.available_quantity, i.reserved_quantity, p.name 
    FROM public.inventory i 
    JOIN public.product_variants v ON i.variant_id = v.id 
    JOIN public.products p ON v.product_id = p.id 
    ORDER BY p.name;
  `;
  console.log(`Inventory (${inv.length} rows):`);
  for (const r of inv) {
    console.log(`  ${String(r.name).padEnd(16)} | Available: ${r.available_quantity} | Reserved: ${r.reserved_quantity}`);
  }

  // Collections
  const cols = await sql`SELECT id, name, slug FROM public.collections ORDER BY name;`;
  console.log(`\nCollections (${cols.length} rows):`);
  for (const c of cols) console.log(`  ${c.name}`);

  // Product Images
  const imgs = await sql`SELECT count(*) as cnt FROM public.product_images;`;
  console.log(`\nProduct Images: ${imgs[0].cnt}`);

  // Product Notes
  const notes = await sql`SELECT count(*) as cnt FROM public.product_notes;`;
  console.log(`Product Notes: ${notes[0].cnt}`);

  // Check each table individually
  console.log('\n--- Tables that should be empty (test artifacts removed) ---');
  let allClean = true;

  const checks = [
    { name: 'orders', q: sql`SELECT count(*) as cnt FROM public.orders` },
    { name: 'order_items', q: sql`SELECT count(*) as cnt FROM public.order_items` },
    { name: 'order_addresses', q: sql`SELECT count(*) as cnt FROM public.order_addresses` },
    { name: 'order_status_history', q: sql`SELECT count(*) as cnt FROM public.order_status_history` },
    { name: 'payments', q: sql`SELECT count(*) as cnt FROM public.payments` },
    { name: 'payment_events', q: sql`SELECT count(*) as cnt FROM public.payment_events` },
    { name: 'carts', q: sql`SELECT count(*) as cnt FROM public.carts` },
    { name: 'cart_items', q: sql`SELECT count(*) as cnt FROM public.cart_items` },
    { name: 'inventory_movements', q: sql`SELECT count(*) as cnt FROM public.inventory_movements` },
    { name: 'inventory_reservations', q: sql`SELECT count(*) as cnt FROM public.inventory_reservations` },
    { name: 'contact_requests', q: sql`SELECT count(*) as cnt FROM public.contact_requests` },
    { name: 'concierge_requests', q: sql`SELECT count(*) as cnt FROM public.concierge_requests` },
    { name: 'discount_usages', q: sql`SELECT count(*) as cnt FROM public.discount_usages` },
    { name: 'reviews', q: sql`SELECT count(*) as cnt FROM public.reviews` },
  ];

  for (const check of checks) {
    const result = await check.q;
    const count = Number(result[0].cnt);
    const status = count === 0 ? '✓ CLEAN' : '✗ HAS DATA';
    if (count !== 0) allClean = false;
    console.log(`  ${check.name.padEnd(28)} | ${count} rows | ${status}`);
  }

  const productCount = (await sql`SELECT count(*) as cnt FROM public.products`)[0].cnt;
  const variantCount = (await sql`SELECT count(*) as cnt FROM public.product_variants`)[0].cnt;
  const collectionCount = cols.length;

  console.log('\n--- Authentic Catalog Summary ---');
  console.log(`Products:    22 expected, ${productCount} found`);
  console.log(`Variants:    22 expected, ${variantCount} found`);
  console.log(`Collections:  3 expected, ${collectionCount} found`);
  console.log(`Images:      22 expected, ${imgs[0].cnt} found`);
  console.log(`Notes:      169 expected, ${notes[0].cnt} found`);
  console.log(`Inventory:   22 expected, ${inv.length} found`);
  console.log(`\nAll test artifacts removed: ${allClean ? '✓ YES' : '✗ NO'}`);

  await sql.end();
}

verify().catch(console.error);
