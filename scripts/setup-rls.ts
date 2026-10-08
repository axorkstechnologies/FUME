import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('DATABASE_URL is not set');
  process.exit(1);
}

const client = postgres(connectionString, { prepare: false, max: 1 });

async function applyRLS() {
  console.log('Applying comprehensive Row Level Security policies to Supabase PostgreSQL...\n');

  await client.begin(async (sql) => {
    // 1. Create is_admin helper function
    console.log('Creating public.is_admin() helper function...');
    await sql`
      CREATE OR REPLACE FUNCTION public.is_admin()
      RETURNS boolean AS $$
      BEGIN
        RETURN EXISTS (
          SELECT 1 FROM public.admin_roles
          WHERE user_id = auth.uid() AND role IN ('super_admin', 'admin')
        );
      END;
      $$ LANGUAGE plpgsql SECURITY DEFINER STABLE;
    `;

    // 2. Ensure RLS is enabled on all 29 tables
    const tableList = [
      'profiles',
      'addresses',
      'customer_preferences',
      'collections',
      'products',
      'product_variants',
      'product_images',
      'product_notes',
      'product_accords',
      'tags',
      'product_tags',
      'inventory',
      'inventory_movements',
      'inventory_reservations',
      'carts',
      'cart_items',
      'orders',
      'order_items',
      'order_addresses',
      'order_status_history',
      'payments',
      'payment_events',
      'discounts',
      'discount_usages',
      'reviews',
      'concierge_requests',
      'contact_requests',
      'admin_roles',
      'audit_logs',
    ];

    for (const t of tableList) {
      await sql`ALTER TABLE ${sql(t)} ENABLE ROW LEVEL SECURITY;`;
    }

    // 3. CATALOG POLICIES
    console.log('Configuring catalog RLS policies...');
    // collections
    await sql`DROP POLICY IF EXISTS "collections_public_read" ON public.collections;`;
    await sql`CREATE POLICY "collections_public_read" ON public.collections FOR SELECT USING (is_published = true);`;
    await sql`DROP POLICY IF EXISTS "collections_admin_all" ON public.collections;`;
    await sql`CREATE POLICY "collections_admin_all" ON public.collections TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());`;

    // products
    await sql`DROP POLICY IF EXISTS "products_public_read" ON public.products;`;
    await sql`CREATE POLICY "products_public_read" ON public.products FOR SELECT USING (published = true);`;
    await sql`DROP POLICY IF EXISTS "products_admin_all" ON public.products;`;
    await sql`CREATE POLICY "products_admin_all" ON public.products TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());`;

    // product_variants
    await sql`DROP POLICY IF EXISTS "variants_public_read" ON public.product_variants;`;
    await sql`CREATE POLICY "variants_public_read" ON public.product_variants FOR SELECT USING (is_active = true);`;
    await sql`DROP POLICY IF EXISTS "variants_admin_all" ON public.product_variants;`;
    await sql`CREATE POLICY "variants_admin_all" ON public.product_variants TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());`;

    // product_images
    await sql`DROP POLICY IF EXISTS "images_public_read" ON public.product_images;`;
    await sql`CREATE POLICY "images_public_read" ON public.product_images FOR SELECT USING (true);`;
    await sql`DROP POLICY IF EXISTS "images_admin_all" ON public.product_images;`;
    await sql`CREATE POLICY "images_admin_all" ON public.product_images TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());`;

    // product_notes, product_accords, tags, product_tags
    for (const ct of ['product_notes', 'product_accords', 'tags', 'product_tags']) {
      await sql`DROP POLICY IF EXISTS ${sql(`${ct}_public_read`)} ON public.${sql(ct)};`;
      await sql`CREATE POLICY ${sql(`${ct}_public_read`)} ON public.${sql(ct)} FOR SELECT USING (true);`;
      await sql`DROP POLICY IF EXISTS ${sql(`${ct}_admin_all`)} ON public.${sql(ct)};`;
      await sql`CREATE POLICY ${sql(`${ct}_admin_all`)} ON public.${sql(ct)} TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());`;
    }

    // 4. CUSTOMER PRIVATE DATA POLICIES
    console.log('Configuring customer data isolation policies...');
    // profiles
    await sql`DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;`;
    await sql`CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);`;
    await sql`DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;`;
    await sql`CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);`;
    await sql`DROP POLICY IF EXISTS "profiles_admin_all" ON public.profiles;`;
    await sql`CREATE POLICY "profiles_admin_all" ON public.profiles TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());`;

    // addresses
    await sql`DROP POLICY IF EXISTS "addresses_select_own" ON public.addresses;`;
    await sql`CREATE POLICY "addresses_select_own" ON public.addresses FOR SELECT TO authenticated USING (auth.uid() = user_id);`;
    await sql`DROP POLICY IF EXISTS "addresses_insert_own" ON public.addresses;`;
    await sql`CREATE POLICY "addresses_insert_own" ON public.addresses FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);`;
    await sql`DROP POLICY IF EXISTS "addresses_update_own" ON public.addresses;`;
    await sql`CREATE POLICY "addresses_update_own" ON public.addresses FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);`;
    await sql`DROP POLICY IF EXISTS "addresses_delete_own" ON public.addresses;`;
    await sql`CREATE POLICY "addresses_delete_own" ON public.addresses FOR DELETE TO authenticated USING (auth.uid() = user_id);`;
    await sql`DROP POLICY IF EXISTS "addresses_admin_all" ON public.addresses;`;
    await sql`CREATE POLICY "addresses_admin_all" ON public.addresses TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());`;

    // customer_preferences
    await sql`DROP POLICY IF EXISTS "prefs_manage_own" ON public.customer_preferences;`;
    await sql`CREATE POLICY "prefs_manage_own" ON public.customer_preferences FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);`;
    await sql`DROP POLICY IF EXISTS "prefs_admin_all" ON public.customer_preferences;`;
    await sql`CREATE POLICY "prefs_admin_all" ON public.customer_preferences TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());`;

    // 5. CARTS & CART ITEMS
    console.log('Configuring cart security policies...');
    await sql`DROP POLICY IF EXISTS "carts_select" ON public.carts;`;
    await sql`CREATE POLICY "carts_select" ON public.carts FOR SELECT USING ((auth.uid() IS NOT NULL AND user_id = auth.uid()) OR guest_token IS NOT NULL);`;
    await sql`DROP POLICY IF EXISTS "carts_insert" ON public.carts;`;
    await sql`CREATE POLICY "carts_insert" ON public.carts FOR INSERT WITH CHECK ((auth.uid() IS NOT NULL AND user_id = auth.uid()) OR guest_token IS NOT NULL);`;
    await sql`DROP POLICY IF EXISTS "carts_update" ON public.carts;`;
    await sql`CREATE POLICY "carts_update" ON public.carts FOR UPDATE USING ((auth.uid() IS NOT NULL AND user_id = auth.uid()) OR guest_token IS NOT NULL);`;

    await sql`DROP POLICY IF EXISTS "cart_items_manage" ON public.cart_items;`;
    await sql`CREATE POLICY "cart_items_manage" ON public.cart_items FOR ALL USING (
      EXISTS (SELECT 1 FROM public.carts WHERE carts.id = cart_items.cart_id AND ((carts.user_id = auth.uid()) OR (carts.guest_token IS NOT NULL)))
    ) WITH CHECK (
      EXISTS (SELECT 1 FROM public.carts WHERE carts.id = cart_items.cart_id AND ((carts.user_id = auth.uid()) OR (carts.guest_token IS NOT NULL)))
    );`;

    // 6. ORDERS & FULFILLMENT
    console.log('Configuring orders isolation policies...');
    // orders
    await sql`DROP POLICY IF EXISTS "orders_select_own" ON public.orders;`;
    await sql`CREATE POLICY "orders_select_own" ON public.orders FOR SELECT TO authenticated USING (auth.uid() = user_id);`;
    await sql`DROP POLICY IF EXISTS "orders_admin_all" ON public.orders;`;
    await sql`CREATE POLICY "orders_admin_all" ON public.orders TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());`;

    // order_items
    await sql`DROP POLICY IF EXISTS "order_items_select_own" ON public.order_items;`;
    await sql`CREATE POLICY "order_items_select_own" ON public.order_items FOR SELECT TO authenticated USING (
      EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
    );`;
    await sql`DROP POLICY IF EXISTS "order_items_admin_all" ON public.order_items;`;
    await sql`CREATE POLICY "order_items_admin_all" ON public.order_items TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());`;

    // order_addresses
    await sql`DROP POLICY IF EXISTS "order_addresses_select_own" ON public.order_addresses;`;
    await sql`CREATE POLICY "order_addresses_select_own" ON public.order_addresses FOR SELECT TO authenticated USING (
      EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_addresses.order_id AND orders.user_id = auth.uid())
    );`;
    await sql`DROP POLICY IF EXISTS "order_addresses_admin_all" ON public.order_addresses;`;
    await sql`CREATE POLICY "order_addresses_admin_all" ON public.order_addresses TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());`;

    // order_status_history
    await sql`DROP POLICY IF EXISTS "order_history_select_own" ON public.order_status_history;`;
    await sql`CREATE POLICY "order_history_select_own" ON public.order_status_history FOR SELECT TO authenticated USING (
      EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_status_history.order_id AND orders.user_id = auth.uid())
    );`;
    await sql`DROP POLICY IF EXISTS "order_history_admin_all" ON public.order_status_history;`;
    await sql`CREATE POLICY "order_history_admin_all" ON public.order_status_history TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());`;

    // 7. PAYMENTS & FINANCIALS (Strict Admin / Server only)
    console.log('Configuring payments and financial protection policies...');
    await sql`DROP POLICY IF EXISTS "payments_admin_all" ON public.payments;`;
    await sql`CREATE POLICY "payments_admin_all" ON public.payments TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());`;

    await sql`DROP POLICY IF EXISTS "payment_events_admin_all" ON public.payment_events;`;
    await sql`CREATE POLICY "payment_events_admin_all" ON public.payment_events TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());`;

    // 8. INVENTORY & RESERVATIONS
    console.log('Configuring inventory protection policies...');
    await sql`DROP POLICY IF EXISTS "inventory_public_read" ON public.inventory;`;
    await sql`CREATE POLICY "inventory_public_read" ON public.inventory FOR SELECT USING (true);`;
    await sql`DROP POLICY IF EXISTS "inventory_admin_all" ON public.inventory;`;
    await sql`CREATE POLICY "inventory_admin_all" ON public.inventory TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());`;

    await sql`DROP POLICY IF EXISTS "inv_movements_admin_all" ON public.inventory_movements;`;
    await sql`CREATE POLICY "inv_movements_admin_all" ON public.inventory_movements TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());`;

    await sql`DROP POLICY IF EXISTS "inv_reservations_admin_all" ON public.inventory_reservations;`;
    await sql`CREATE POLICY "inv_reservations_admin_all" ON public.inventory_reservations TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());`;

    // 9. DISCOUNTS & REVIEWS
    console.log('Configuring discounts and reviews policies...');
    await sql`DROP POLICY IF EXISTS "discounts_public_read" ON public.discounts;`;
    await sql`CREATE POLICY "discounts_public_read" ON public.discounts FOR SELECT USING (is_active = true);`;
    await sql`DROP POLICY IF EXISTS "discounts_admin_all" ON public.discounts;`;
    await sql`CREATE POLICY "discounts_admin_all" ON public.discounts TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());`;

    await sql`DROP POLICY IF EXISTS "discount_usages_select_own" ON public.discount_usages;`;
    await sql`CREATE POLICY "discount_usages_select_own" ON public.discount_usages FOR SELECT TO authenticated USING (auth.uid() = user_id);`;
    await sql`DROP POLICY IF EXISTS "discount_usages_admin_all" ON public.discount_usages;`;
    await sql`CREATE POLICY "discount_usages_admin_all" ON public.discount_usages TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());`;

    // reviews
    await sql`DROP POLICY IF EXISTS "reviews_public_read" ON public.reviews;`;
    await sql`CREATE POLICY "reviews_public_read" ON public.reviews FOR SELECT USING (status = 'approved');`;
    await sql`DROP POLICY IF EXISTS "reviews_insert_authenticated" ON public.reviews;`;
    await sql`CREATE POLICY "reviews_insert_authenticated" ON public.reviews FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);`;
    await sql`DROP POLICY IF EXISTS "reviews_admin_all" ON public.reviews;`;
    await sql`CREATE POLICY "reviews_admin_all" ON public.reviews TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());`;

    // 10. CONCIERGE & CONTACT
    console.log('Configuring concierge and contact inquiries policies...');
    await sql`DROP POLICY IF EXISTS "concierge_insert_public" ON public.concierge_requests;`;
    await sql`CREATE POLICY "concierge_insert_public" ON public.concierge_requests FOR INSERT WITH CHECK (true);`;
    await sql`DROP POLICY IF EXISTS "concierge_admin_all" ON public.concierge_requests;`;
    await sql`CREATE POLICY "concierge_admin_all" ON public.concierge_requests TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());`;

    await sql`DROP POLICY IF EXISTS "contact_insert_public" ON public.contact_requests;`;
    await sql`CREATE POLICY "contact_insert_public" ON public.contact_requests FOR INSERT WITH CHECK (true);`;
    await sql`DROP POLICY IF EXISTS "contact_admin_all" ON public.contact_requests;`;
    await sql`CREATE POLICY "contact_admin_all" ON public.contact_requests TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());`;

    // 11. ADMIN ROLES & AUDIT LOGS
    console.log('Configuring admin role and audit log policies...');
    await sql`DROP POLICY IF EXISTS "admin_roles_admin_all" ON public.admin_roles;`;
    await sql`CREATE POLICY "admin_roles_admin_all" ON public.admin_roles TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());`;

    await sql`DROP POLICY IF EXISTS "audit_logs_admin_all" ON public.audit_logs;`;
    await sql`CREATE POLICY "audit_logs_admin_all" ON public.audit_logs TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());`;
  });

  console.log('\nAll Row Level Security policies applied successfully!');
  await client.end();
}

applyRLS().catch((err) => {
  console.error('Error applying RLS policies:', err);
  process.exit(1);
});
