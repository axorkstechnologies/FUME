import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('DATABASE_URL is not set');
  process.exit(1);
}

const client = postgres(connectionString, { prepare: false, max: 1 });

async function inspectTestData() {
  console.log('====================================================');
  console.log('       INSPECTION OF CANDIDATE TEST ARTIFACTS       ');
  console.log('====================================================\n');

  // 1. Orders
  const ordersList = await client`SELECT id, order_number, email, grand_total, idempotency_key, created_at FROM public.orders;`;
  console.log(`Orders (${ordersList.length} rows):`);
  for (const o of ordersList) {
    console.log(`  - ID: ${o.id} | #${o.order_number} | Email: ${o.email} | Total: ${o.grand_total} | Key: ${o.idempotency_key}`);
  }

  // 2. Contact Requests
  const contacts = await client`SELECT id, name, email, subject, message, created_at FROM public.contact_requests;`;
  console.log(`\nContact Requests (${contacts.length} rows):`);
  for (const c of contacts) {
    console.log(`  - ID: ${c.id} | Name: ${c.name} | Email: ${c.email} | Msg: ${c.message}`);
  }

  // 3. Concierge Requests
  const concierges = await client`SELECT id, name, email, request_type, message, created_at FROM public.concierge_requests;`;
  console.log(`\nConcierge Requests (${concierges.length} rows):`);
  for (const c of concierges) {
    console.log(`  - ID: ${c.id} | Name: ${c.name} | Email: ${c.email} | Type: ${c.request_type} | Msg: ${c.message}`);
  }

  // 4. Inventory Movements
  const movements = await client`SELECT id, variant_id, movement_type, quantity, reference_type, reference_id, reason FROM public.inventory_movements;`;
  console.log(`\nInventory Movements (${movements.length} rows):`);
  for (const m of movements) {
    console.log(`  - ID: ${m.id} | Type: ${m.movement_type} | Qty: ${m.quantity} | Ref: ${m.reference_type}:${m.reference_id} | Reason: ${m.reason}`);
  }

  // 5. Carts
  const cartsList = await client`SELECT id, user_id, guest_token, status, created_at FROM public.carts;`;
  console.log(`\nCarts (${cartsList.length} rows):`);
  for (const c of cartsList) {
    console.log(`  - ID: ${c.id} | Status: ${c.status} | Token: ${c.guest_token?.slice(0, 16)}... | Created: ${c.created_at}`);
  }

  // 6. Cart Items
  const cartItemsList = await client`SELECT id, cart_id, variant_id, quantity FROM public.cart_items;`;
  console.log(`\nCart Items (${cartItemsList.length} rows):`);
  for (const ci of cartItemsList) {
    console.log(`  - ID: ${ci.id} | Cart: ${ci.cart_id} | Qty: ${ci.quantity}`);
  }

  // 7. Products check (to ensure all are real FUME catalog)
  const productsList = await client`SELECT id, name, slug, price FROM public.products ORDER BY name;`;
  console.log(`\nProducts (${productsList.length} rows):`);
  for (const p of productsList) {
    console.log(`  - ${p.name.padEnd(16)} | Slug: ${p.slug.padEnd(16)} | ${p.price} PKR`);
  }

  // 8. Product Variants
  const variantsList = await client`SELECT id, product_id, name, size_ml, price FROM public.product_variants;`;
  console.log(`\nProduct Variants (${variantsList.length} rows):`);
  for (const v of variantsList) {
    console.log(`  - ID: ${v.id} | Name: ${v.name} | Size: ${v.size_ml}ml | ${v.price} PKR`);
  }

  await client.end();
}

inspectTestData().catch(console.error);
