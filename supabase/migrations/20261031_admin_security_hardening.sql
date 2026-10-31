-- ====================================================================
-- FUME FRAGRANCES — PRODUCTION-GRADE SECURITY HARDENING MIGRATION
-- Classification: Enterprise-Grade RLS & RBAC Access Control
-- Target Tables: products, orders, inventory, admin_roles
-- ====================================================================

-- 1. Enable Row Level Security (RLS) on all core tables
ALTER TABLE IF EXISTS products ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS admin_roles ENABLE ROW LEVEL SECURITY;

-- 2. Clean up any existing legacy policies
DROP POLICY IF EXISTS "Public can only read products" ON products;
DROP POLICY IF EXISTS "Only verified admins can modify products" ON products;
DROP POLICY IF EXISTS "Only verified admins can manage orders" ON orders;
DROP POLICY IF EXISTS "Users can only read their own admin role" ON admin_roles;
DROP POLICY IF EXISTS "products_public_read" ON products;
DROP POLICY IF EXISTS "products_admin_all" ON products;
DROP POLICY IF EXISTS "orders_admin_all" ON orders;

-- 3. Policy: Public can only read products
CREATE POLICY "Public can only read products" ON products
FOR SELECT USING (true);

-- 4. Policy: Only verified admins can modify products
CREATE POLICY "Only verified admins can modify products" ON products
FOR ALL TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admin_roles
    WHERE user_id = auth.uid() AND role IN ('admin', 'super_admin')
  )
);

-- 5. Policy: Only verified admins can manage orders
CREATE POLICY "Only verified admins can manage orders" ON orders
FOR ALL TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admin_roles
    WHERE user_id = auth.uid() AND role IN ('admin', 'super_admin')
  )
);

-- 6. Policy: Users can only read their own admin role
CREATE POLICY "Users can only read their own admin role" ON admin_roles
FOR SELECT TO authenticated
USING (auth.uid() = user_id);

-- ====================================================================
-- 7. SUPER ADMIN BOOTSTRAP INSTRUCTIONS:
-- Once the store owner creates their user account in Supabase Auth:
-- INSERT INTO admin_roles (user_id, role)
-- VALUES ('<OWNER_SUPABASE_AUTH_USER_UUID>', 'super_admin')
-- ON CONFLICT (user_id) DO UPDATE SET role = 'super_admin';
-- ====================================================================
