# FUME FRAGRANCES — Production Ecommerce Backend

## 1. Architecture Overview

- **Framework**: Next.js 16 App Router + TypeScript (strict)
- **Database**: PostgreSQL hosted on Supabase
- **ORM & Migrations**: Drizzle ORM + Drizzle Kit
- **Authentication**: Supabase Auth (Client & Admin SDK)
- **Payment Infrastructure**: Extensible Payment Abstraction (Active: Real Cash on Delivery / COD)
- **Data Integrity**: Atomic server-side checkout transactions, inventory reservation & locking, idempotency protection, historical order item snapshots.

---

## 2. Environment Variables

Store server-only secrets in `.env.local` (automatically ignored by Git). Never commit secret keys.

| Variable | Scope | Status | Purpose |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | Public (Client + Server) | Required | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Public (Client + Server) | Required | Public browser auth & queries |
| `DATABASE_URL` | Server Only | Required | Supabase Transaction Pooler connection string (`prepare: false`) |
| `SUPABASE_SECRET_KEY` | Server Only | Required | Privileged service/admin key |
| `DIRECT_URL` | Server Only | Optional | Direct Postgres port 5432 (fallback to `DATABASE_URL` if IPV6-only) |

---

## 3. Database Schema (29 Tables)

Managed under [src/db/schema.ts](file:///d:/FUME/FUME/src/db/schema.ts):

- **Customer & Profiles**: `profiles`, `addresses`, `customer_preferences`
- **Catalog**: `collections`, `products`, `product_variants`, `product_images`, `product_notes`, `product_accords`, `tags`, `product_tags`
- **Inventory & Reservations**: `inventory`, `inventory_movements`, `inventory_reservations`
- **Shopping Cart**: `carts`, `cart_items`
- **Orders & Fulfillment**: `orders`, `order_items`, `order_addresses`, `order_status_history`
- **Payments**: `payments`, `payment_events`
- **Promotions & Reviews**: `discounts`, `discount_usages`, `reviews`
- **Luxury Concierge**: `concierge_requests`, `contact_requests`
- **Administration & Audits**: `admin_roles`, `audit_logs`

---

## 4. Drizzle & Migration Workflow

- **Config**: [drizzle.config.ts](file:///d:/FUME/FUME/drizzle.config.ts)
- **Generate Migrations**:
  ```bash
  npx drizzle-kit generate
  ```
- **Apply Migrations**:
  ```bash
  npx tsx scripts/migrate.ts
  ```
- **Seed Authentic Catalog Data**:
  ```bash
  npx tsx src/db/seed.ts
  ```

---

## 5. Security & Boundary Architecture

1. **Client/Server Isolation**:
   - Privileged operations and database drivers use `'server-only'`.
   - The browser only communicates with API endpoints (`/api/*`) or Supabase client via `NEXT_PUBLIC_*`.
2. **Atomic Checkout (`/api/checkout`)**:
   - Server validates cart items and retrieves live database prices. Client price inputs are never trusted.
   - Database transaction verifies inventory, prevents negative quantities, creates order, historical line item snapshots, address snapshot, and pending COD payment record.
   - Idempotency key interceptor prevents duplicate order creation on network retries.
3. **Order State Machine**:
   - `pending` → `confirmed` → `processing` → `packed` → `shipped` → `out_for_delivery` → `delivered`
   - Exception paths (`cancelled`, `returned`, `refunded`, `failed_delivery`) are validated before transitioning.

---

## 6. Admin Roles & First User Promotion

To promote a verified user account to `super_admin`:

```ts
import { promoteToSuperAdmin } from '@/src/db/mutations/admin';

// Execute server-side with verified Supabase Auth user UUID:
await promoteToSuperAdmin('USER_AUTH_UUID_HERE');
```

---

## 7. Running Verification Tests

Run the full end-to-end integration test suite:

```bash
npx tsx --conditions=react-server scripts/test-e2e-backend.ts
```

All 27 integration tests verify:
- Catalog retrieval & filters
- Guest cart creation & mutation
- Server price calculations
- Atomic COD checkout
- Idempotency deduplication
- Order item snapshots
- State machine transition validation
- Contact & Concierge request lodging
