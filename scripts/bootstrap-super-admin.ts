import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import postgres from 'postgres';
import { z } from 'zod';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('[ERROR] DATABASE_URL is not set in environment.');
  process.exit(1);
}

const client = postgres(connectionString, { prepare: false, max: 1 });

async function bootstrapSuperAdmin() {
  console.log('========================================================');
  console.log('   FUME FRAGRANCES — SUPER ADMIN BOOTSTRAP PROCEDURE   ');
  console.log('========================================================\n');

  const targetUuid = process.argv[2]?.trim();

  if (!targetUuid) {
    console.log('USAGE:');
    console.log('  npm run admin:promote <SUPABASE_AUTH_USER_UUID>');
    console.log('\nEXAMPLE:');
    console.log('  npm run admin:promote 8a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d\n');
    console.log('[ABORTED] No User UUID was provided. No changes were made.\n');
    process.exit(1);
  }

  // Validate UUID syntax
  const uuidSchema = z.string().uuid();
  const parsed = uuidSchema.safeParse(targetUuid);
  if (!parsed.success) {
    console.error(`[ERROR] Invalid UUID format: "${targetUuid}".`);
    console.error('Please provide a valid 36-character Supabase Auth User UUID.\n');
    process.exit(1);
  }

  try {
    // 1. Verify user exists in auth.users
    const authUsers = await client`
      SELECT id, email, created_at 
      FROM auth.users 
      WHERE id = ${targetUuid}::uuid
      LIMIT 1
    `;

    if (authUsers.length === 0) {
      console.error(`[ERROR] User with UUID "${targetUuid}" was NOT found in auth.users.`);
      console.error('The target account must exist in Supabase Auth before it can be promoted.');
      console.error('Please have the user sign up on the storefront or create them in the Supabase Dashboard.\n');
      process.exit(1);
    }

    const authUser = authUsers[0];
    const userEmail = authUser.email || 'No email associated';
    console.log(`[VERIFIED] Found authenticated user: ${userEmail} (${targetUuid})`);

    // 2. Ensure public.profiles record exists
    await client`
      INSERT INTO public.profiles (id, email, updated_at)
      VALUES (${targetUuid}::uuid, ${userEmail}, NOW())
      ON CONFLICT (id) DO UPDATE
      SET email = EXCLUDED.email, updated_at = NOW()
    `;

    // 3. Upsert into public.admin_roles
    const existingRoles = await client`
      SELECT role FROM public.admin_roles WHERE user_id = ${targetUuid}::uuid LIMIT 1
    `;

    if (existingRoles.length > 0 && existingRoles[0].role === 'super_admin') {
      console.log(`[NOTICE] Account is ALREADY designated as super_admin.`);
    } else {
      await client`
        INSERT INTO public.admin_roles (user_id, role, updated_at)
        VALUES (${targetUuid}::uuid, 'super_admin', NOW())
        ON CONFLICT (user_id) DO UPDATE
        SET role = 'super_admin', updated_at = NOW()
      `;
      console.log(`[PROMOTED] User account successfully elevated to: super_admin`);
    }

    // 4. Record audit log
    await client`
      INSERT INTO public.audit_logs (user_id, action, entity_type, entity_id, metadata, created_at)
      VALUES (
        ${targetUuid}::uuid, 
        'SUPER_ADMIN_BOOTSTRAP', 
        'admin_roles', 
        ${targetUuid}, 
        ${JSON.stringify({ promotedTo: 'super_admin', email: userEmail })}, 
        NOW()
      )
    `;

    console.log(`[AUDIT] Operational action recorded in public.audit_logs.`);
    console.log('\n========================================================');
    console.log(' SUCCESS: Super Admin bootstrap procedure completed.');
    console.log('========================================================\n');
  } catch (error) {
    console.error('[ERROR] Failed to execute bootstrap procedure:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

bootstrapSuperAdmin();
