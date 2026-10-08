import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { db } from '../src/db';
import { getPublishedProducts, getProductBySlug } from '../src/db/queries/products';
import { getPublishedCollections } from '../src/db/queries/collections';
import {
  createGuestCart,
  addItemToCart,
  updateCartItemQuantity,
  removeCartItem,
} from '../src/db/mutations/cart';
import { getCartWithItems } from '../src/db/queries/cart';
import { processCheckout } from '../src/db/mutations/checkout';
import { getOrderById, updateOrderStatus } from '../src/db/mutations/orders';
import { validateTransition } from '../src/lib/commerce/order-state';
import { productVariants, contactRequests, conciergeRequests, reviews } from '../src/db/schema';
import { eq } from 'drizzle-orm';

async function runTests() {
  console.log('====================================================');
  console.log('  FUME ECOMMERCE BACKEND — END-TO-END VERIFICATION  ');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passed++;
    } else {
      console.error(`[FAIL] ${testName}`);
      failed++;
    }
  }

  try {
    // 1. Products test
    const products = await getPublishedProducts();
    assert(products.length >= 22, `Published products retrieved (found ${products.length}, expected >= 22)`);

    const arab = await getProductBySlug('arab');
    assert(arab !== null && arab.name === 'ARAB', 'Product by slug: ARAB retrieved with authentic data');
    assert(arab?.variants.length! > 0, 'ARAB product has at least one active variant');

    // 2. Collections test
    const collections = await getPublishedCollections();
    assert(collections.length >= 3, `Collections retrieved (found ${collections.length}, expected >= 3)`);

    // 3. Cart Lifecycle test
    const guestCart = await createGuestCart();
    assert(!!guestCart.id && !!guestCart.guestToken, 'Guest cart created with secure guest token');

    const firstVariant = arab?.variants[0];
    if (!firstVariant) throw new Error('No variant found for cart test');

    const cartWithItem = await addItemToCart(guestCart.id, firstVariant.id, 2);
    assert(cartWithItem?.items.length === 1, 'Item added to guest cart');
    assert(cartWithItem?.items[0].quantity === 2, 'Item quantity in cart is 2');
    assert(Number(cartWithItem?.subtotal) === Number(firstVariant.price) * 2, 'Server-calculated authoritative subtotal is accurate');

    const updatedCart = await updateCartItemQuantity(cartWithItem!.items[0].id, 3);
    assert(updatedCart?.items[0].quantity === 3, 'Cart item quantity updated to 3');

    // 4. Checkout test (COD)
    const idempotencyKey = `test-${Date.now()}`;
    const checkoutPayload = {
      cartId: guestCart.id,
      customer: {
        firstName: 'Tariq',
        lastName: 'Mansoor',
        email: 'tariq.mansoor@example.com',
        phone: '+923001234567',
      },
      shippingAddress: {
        firstName: 'Tariq',
        lastName: 'Mansoor',
        phone: '+923001234567',
        addressLine1: 'House 42, Street 10, Clifton Block 4',
        city: 'Karachi',
        province: 'Sindh',
        postalCode: '75600',
        country: 'Pakistan',
      },
      paymentMethod: 'cod' as const,
      idempotencyKey,
    };

    const checkoutResult = await processCheckout(checkoutPayload);
    assert(!checkoutResult.isDuplicate, 'First checkout attempt succeeds');
    assert(checkoutResult.order.orderNumber.startsWith('FUME-'), `Order number generated properly (${checkoutResult.order.orderNumber})`);
    assert(checkoutResult.order.orderStatus === 'pending', 'Order status initialized to pending');
    assert(checkoutResult.order.paymentStatus === 'pending', 'COD payment initialized to pending');

    // 5. Idempotency test (repeat identical checkout)
    const duplicateCheckout = await processCheckout(checkoutPayload);
    assert(duplicateCheckout.isDuplicate, 'Duplicate checkout with identical idempotencyKey intercepted');
    assert(duplicateCheckout.order.id === checkoutResult.order.id, 'Idempotent request safely returned original order');

    // 6. Historical order items snapshot test
    const orderDetails = await getOrderById(checkoutResult.order.id);
    assert(orderDetails !== null, 'Order details retrieved by ID');
    assert(orderDetails?.items.length === 1, 'Order has 1 historical line item');
    assert(orderDetails?.items[0].productName === 'ARAB', 'Order item snapshot preserves product name "ARAB"');
    assert(orderDetails?.items[0].unitPrice === firstVariant.price, 'Order item snapshot preserves exact unit price');
    assert(orderDetails?.shippingAddress?.city === 'Karachi', 'Order shipping address snapshot preserves Karachi');

    // 7. Order State Machine test
    assert(validateTransition('pending', 'confirmed'), 'State machine permits pending -> confirmed');
    assert(validateTransition('confirmed', 'processing'), 'State machine permits confirmed -> processing');
    assert(!validateTransition('pending', 'delivered'), 'State machine rejects pending -> delivered without intermediate states');

    await updateOrderStatus(checkoutResult.order.id, 'confirmed', undefined, 'Automated verification check');
    const updatedOrder = await getOrderById(checkoutResult.order.id);
    assert(updatedOrder?.orderStatus === 'confirmed', 'Order transitioned to confirmed and recorded in status history');
    assert(updatedOrder?.history.length! >= 1, 'Order status history contains transition log');

    // 8. Contact & Concierge tables test
    const [contact] = await db
      .insert(contactRequests)
      .values({
        name: 'Sara Khan',
        email: 'sara@example.com',
        message: 'Inquiring about corporate gifting flacons.',
        status: 'new',
      })
      .returning();
    assert(!!contact.id, 'Contact request record inserted');

    const [concierge] = await db
      .insert(conciergeRequests)
      .values({
        name: 'Hamza Sheikh',
        email: 'hamza@example.com',
        message: 'Looking for bespoke flacon engraving.',
        requestType: 'bespoke_atelier',
        status: 'new',
      })
      .returning();
    assert(!!concierge.id, 'Concierge request record inserted');

  } catch (error) {
    console.error('Test execution failed with error:', error);
    failed++;
  }

  console.log('\n====================================================');
  console.log(`  RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================');

  process.exit(failed > 0 ? 1 : 0);
}

runTests();
