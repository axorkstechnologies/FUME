import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { db } from '../src/db';
import {
  products,
  productVariants,
  inventory,
  orders,
  orderItems,
  carts,
} from '../src/db/schema';
import { processCheckout } from '../src/db/mutations/checkout';
import { createGuestCart, addItemToCart } from '../src/db/mutations/cart';
import { eq, sql } from 'drizzle-orm';

async function runPoolerStressTest() {
  console.log('================================================================');
  console.log(' SUPABASE TRANSACTION POOLER CONCURRENCY & INTEGRITY STRESS TEST ');
  console.log('================================================================\n');

  // 1. Setup a dedicated temporary test product and variant
  console.log('Step 1: Setting up isolated test product with strictly limited inventory (Stock = 2)...');
  const [testProduct] = await db
    .insert(products)
    .values({
      name: 'POOLER TEST FRAGRANCE',
      slug: `pooler-test-${Date.now()}`,
      price: '5000.00',
      currency: 'PKR',
      published: true,
    })
    .returning();

  const [testVariant] = await db
    .insert(productVariants)
    .values({
      productId: testProduct.id,
      name: '50ml Limited Flacon',
      sizeMl: 50,
      price: '5000.00',
      isActive: true,
      isDefault: true,
    })
    .returning();

  // Set inventory to exactly 2 units
  await db.insert(inventory).values({
    variantId: testVariant.id,
    availableQuantity: 2,
    reservedQuantity: 0,
    lowStockThreshold: 1,
  });

  console.log(`Test variant created [${testVariant.id}] with availableQuantity = 2\n`);

  // 2. Prepare 6 concurrent customer carts attempting to buy 1 unit each
  console.log('Step 2: Preparing 6 concurrent customer carts competing for 2 available units...');
  const concurrentBuyers = 6;
  const cartsList = [];

  for (let i = 0; i < concurrentBuyers; i++) {
    const cart = await createGuestCart();
    await addItemToCart(cart.id, testVariant.id, 1);
    cartsList.push(cart);
  }
  console.log(`Created and prepared ${cartsList.length} distinct carts.\n`);

  // 3. Fire all 6 checkouts simultaneously via Promise.all
  console.log('Step 3: Firing 6 simultaneous checkout transactions against Supabase Transaction Pooler...');
  const startTime = Date.now();

  type TestOutcome =
    | { success: true; index: number; order: any }
    | { success: false; index: number; error: string; code?: string };

  const checkoutPromises: Promise<TestOutcome>[] = cartsList.map((cart, idx) => {
    return processCheckout({
      cartId: cart.id,
      customer: {
        firstName: `Buyer${idx}`,
        lastName: 'Test',
        email: `buyer${idx}_${Date.now()}@test.com`,
        phone: '+923000000000',
      },
      shippingAddress: {
        firstName: `Buyer${idx}`,
        lastName: 'Test',
        addressLine1: `Street ${idx}, Phase 5, DHA`,
        city: 'Karachi',
        country: 'Pakistan',
      },
      paymentMethod: 'cod',
      idempotencyKey: `concurrent-buyer-${idx}-${Date.now()}`,
    })
      .then((res): TestOutcome => ({ success: true, index: idx, order: res.order }))
      .catch((err): TestOutcome => ({ success: false, index: idx, error: String(err.message), code: err.code }));
  });

  const results: TestOutcome[] = await Promise.all(checkoutPromises);
  const duration = Date.now() - startTime;

  console.log(`All 6 concurrent transactions settled in ${duration}ms.\n`);

  // 4. Verify outcomes
  const successful = results.filter((r): r is Extract<TestOutcome, { success: true }> => r.success);
  const failed = results.filter((r): r is Extract<TestOutcome, { success: false }> => !r.success);

  console.log('--- TRANSACTION OUTCOMES ---');
  console.log(`Successful checkouts: ${successful.length}`);
  console.log(`Rejected checkouts:   ${failed.length}`);

  for (const f of failed) {
    console.log(`  Expected Rejection [Buyer #${f.index}]: Code=${f.code}, Reason="${f.error}"`);
  }

  // 5. Inspect DB inventory state
  const [finalInv] = await db
    .select()
    .from(inventory)
    .where(eq(inventory.variantId, testVariant.id));

  console.log('\n--- FINAL DATABASE INVENTORY STATE ---');
  console.log(`Available Quantity: ${finalInv?.availableQuantity} (EXPECTED: 0)`);
  console.log(`Reserved Quantity:  ${finalInv?.reservedQuantity} (EXPECTED: 0)`);

  // 6. Assertions
  let assertionsPassed = true;

  if (successful.length !== 2) {
    console.error(`FAILED: Expected exactly 2 successful checkouts, got ${successful.length}`);
    assertionsPassed = false;
  }

  if (failed.length !== 4) {
    console.error(`FAILED: Expected exactly 4 rejected checkouts, got ${failed.length}`);
    assertionsPassed = false;
  }

  if (finalInv?.availableQuantity !== 0) {
    console.error(`FAILED: Inventory oversold or under-deducted! availableQuantity is ${finalInv?.availableQuantity}`);
    assertionsPassed = false;
  }

  // Cleanup test artifacts
  console.log('\nCleaning up temporary test records...');
  // Delete orders created in this test
  for (const s of successful) {
    if (s.order?.id) {
      await db.delete(orders).where(eq(orders.id, s.order.id));
    }
  }
  await db.delete(inventory).where(eq(inventory.variantId, testVariant.id));
  await db.delete(productVariants).where(eq(productVariants.id, testVariant.id));
  await db.delete(products).where(eq(products.id, testProduct.id));

  if (assertionsPassed) {
    console.log('\n================================================================');
    console.log(' SUCCESS: Supabase Transaction Pooler handles concurrent atomic ');
    console.log(' checkouts flawlessly with zero race conditions or overselling! ');
    console.log('================================================================');
    process.exit(0);
  } else {
    console.error('\nFAILURE: Concurrency assertions did not meet required criteria.');
    process.exit(1);
  }
}

runPoolerStressTest().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
