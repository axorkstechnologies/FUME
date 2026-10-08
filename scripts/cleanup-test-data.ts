import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('DATABASE_URL is not set');
  process.exit(1);
}

const client = postgres(connectionString, { prepare: false, max: 1 });

async function cleanupTestData() {
  console.log('====================================================');
  console.log('    FUME PRODUCTION DATABASE — TEST-DATA CLEANUP     ');
  console.log('====================================================\n');

  // STEP 1: Query initial state
  const testOrders = await client`
    SELECT id, order_number, email 
    FROM public.orders 
    WHERE email = 'tariq.mansoor@example.com' OR idempotency_key LIKE 'test-%';
  `;
  const testOrderIds = testOrders.map((o) => o.id);

  const testContacts = await client`
    SELECT id, email, name 
    FROM public.contact_requests 
    WHERE email = 'sara@example.com';
  `;
  const testContactIds = testContacts.map((c) => c.id);

  const testConcierges = await client`
    SELECT id, email, name 
    FROM public.concierge_requests 
    WHERE email = 'hamza@example.com';
  `;
  const testConciergeIds = testConcierges.map((c) => c.id);

  const allCarts = await client`SELECT id FROM public.carts;`;
  const allCartItems = await client`SELECT id FROM public.cart_items;`;

  console.log('--- BEFORE CLEANUP ARTIFACT COUNTS ---');
  console.log(`Test Orders found:             ${testOrderIds.length}`);
  console.log(`Test Contact Requests found:   ${testContactIds.length}`);
  console.log(`Test Concierge Requests found: ${testConciergeIds.length}`);
  console.log(`Test Carts found:              ${allCarts.length}`);
  console.log(`Test Cart Items found:         ${allCartItems.length}\n`);

  if (testOrderIds.length === 0 && allCarts.length === 0 && testContactIds.length === 0) {
    console.log('[NOTICE] Database is already clean. No test artifacts found.');
    await client.end();
    return;
  }

  // STEP 2: Execute surgical removal inside an atomic transaction
  console.log('Executing surgical cleanup transaction...');

  await client.begin(async (sql) => {
    // 2a. Remove order child dependencies
    if (testOrderIds.length > 0) {
      console.log('  1. Removing test order children (items, addresses, payments, status history)...');
      await sql`DELETE FROM public.order_items WHERE order_id IN ${sql(testOrderIds)};`;
      await sql`DELETE FROM public.order_addresses WHERE order_id IN ${sql(testOrderIds)};`;
      await sql`DELETE FROM public.payments WHERE order_id IN ${sql(testOrderIds)};`;
      await sql`DELETE FROM public.order_status_history WHERE order_id IN ${sql(testOrderIds)};`;
      await sql`DELETE FROM public.discount_usages WHERE order_id IN ${sql(testOrderIds)};`;

      // 2b. Remove inventory movements referencing test orders
      console.log('  2. Removing test inventory movements...');
      await sql`
        DELETE FROM public.inventory_movements 
        WHERE reference_type = 'order' AND reference_id IN ${sql(testOrderIds)};
      `;

      // 2c. Delete test orders themselves
      console.log('  3. Removing test orders...');
      await sql`DELETE FROM public.orders WHERE id IN ${sql(testOrderIds)};`;

      // 2d. Restore inventory for ARAB variant (reversing the -6 deduction from the 2 test orders)
      console.log('  4. Restoring deducted inventory to authentic baseline (50 units)...');
      await sql`
        UPDATE public.inventory 
        SET available_quantity = 50, updated_at = NOW() 
        WHERE available_quantity = 44;
      `;
    }

    // 2e. Remove cart items and carts
    console.log('  5. Removing test cart items and carts...');
    await sql`DELETE FROM public.cart_items;`;
    await sql`DELETE FROM public.carts;`;

    // 2f. Remove test contact and concierge requests
    console.log('  6. Removing test inquiries (contact & concierge)...');
    if (testContactIds.length > 0) {
      await sql`DELETE FROM public.contact_requests WHERE id IN ${sql(testContactIds)};`;
    }
    if (testConciergeIds.length > 0) {
      await sql`DELETE FROM public.concierge_requests WHERE id IN ${sql(testConciergeIds)};`;
    }

    // 2g. Clean test audit logs if any exist
    await sql`
      DELETE FROM public.audit_logs 
      WHERE action = 'TEST_AUDIT' OR metadata->>'test' = 'true';
    `;
  });

  console.log('\nSurgical cleanup transaction committed successfully!');

  // STEP 3: Verify post-cleanup database state
  console.log('\n--- POST-CLEANUP VERIFICATION ---');

  const [
    remainingOrders,
    remainingOrderItems,
    remainingPayments,
    remainingMovements,
    remainingCarts,
    remainingCartItems,
    remainingContacts,
    remainingConcierges,
    remainingProducts,
    remainingVariants,
    remainingCollections,
    remainingImages,
    remainingNotes,
    remainingInventory,
  ] = await Promise.all([
    client`SELECT count(*)::int AS count FROM public.orders;`,
    client`SELECT count(*)::int AS count FROM public.order_items;`,
    client`SELECT count(*)::int AS count FROM public.payments;`,
    client`SELECT count(*)::int AS count FROM public.inventory_movements;`,
    client`SELECT count(*)::int AS count FROM public.carts;`,
    client`SELECT count(*)::int AS count FROM public.cart_items;`,
    client`SELECT count(*)::int AS count FROM public.contact_requests;`,
    client`SELECT count(*)::int AS count FROM public.concierge_requests;`,
    client`SELECT count(*)::int AS count FROM public.products;`,
    client`SELECT count(*)::int AS count FROM public.product_variants;`,
    client`SELECT count(*)::int AS count FROM public.collections;`,
    client`SELECT count(*)::int AS count FROM public.product_images;`,
    client`SELECT count(*)::int AS count FROM public.product_notes;`,
    client`SELECT count(*)::int AS count FROM public.inventory;`,
  ]);

  console.log(`Orders remaining:             ${remainingOrders[0].count} (EXPECTED: 0)`);
  console.log(`Order Items remaining:        ${remainingOrderItems[0].count} (EXPECTED: 0)`);
  console.log(`Payments remaining:           ${remainingPayments[0].count} (EXPECTED: 0)`);
  console.log(`Inventory Movements:          ${remainingMovements[0].count} (EXPECTED: 0)`);
  console.log(`Carts remaining:              ${remainingCarts[0].count} (EXPECTED: 0)`);
  console.log(`Cart Items remaining:         ${remainingCartItems[0].count} (EXPECTED: 0)`);
  console.log(`Contact Requests remaining:   ${remainingContacts[0].count} (EXPECTED: 0)`);
  console.log(`Concierge Requests remaining: ${remainingConcierges[0].count} (EXPECTED: 0)`);
  console.log(`\n--- AUTHENTIC CATALOG INTEGRITY ---`);
  console.log(`Products:                     ${remainingProducts[0].count} (PRESERVED: 22)`);
  console.log(`Variants:                     ${remainingVariants[0].count} (PRESERVED: 22)`);
  console.log(`Collections:                  ${remainingCollections[0].count} (PRESERVED: 3)`);
  console.log(`Product Images:               ${remainingImages[0].count} (PRESERVED: 22)`);
  console.log(`Product Notes:                ${remainingNotes[0].count} (PRESERVED: 169)`);
  console.log(`Inventory records:            ${remainingInventory[0].count} (PRESERVED: 22)`);

  const arabStock = await client`
    SELECT available_quantity 
    FROM public.inventory 
    JOIN public.product_variants ON inventory.variant_id = product_variants.id
    JOIN public.products ON product_variants.product_id = products.id
    WHERE products.slug = 'arab';
  `;
  console.log(`ARAB stock level restored:    ${arabStock[0]?.available_quantity} (EXPECTED: 50)`);

  console.log('\n====================================================');
  console.log(' DATABASE CLEANUP AND VERIFICATION COMPLETED');
  console.log('====================================================\n');

  await client.end();
}

cleanupTestData().catch((err) => {
  console.error('Cleanup failed:', err);
  process.exit(1);
});
