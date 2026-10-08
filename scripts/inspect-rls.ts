import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('DATABASE_URL is not set');
  process.exit(1);
}

const client = postgres(connectionString, { prepare: false, max: 1 });

async function inspectRLS() {
  console.log('Inspecting Row Level Security in public schema...');

  const tables = await client`
    SELECT tablename, rowsecurity 
    FROM pg_tables 
    WHERE schemaname = 'public'
    ORDER BY tablename;
  `;

  const policies = await client`
    SELECT 
      schemaname, 
      tablename, 
      policyname, 
      permissive, 
      roles, 
      cmd, 
      qual AS using_expr, 
      with_check AS check_expr
    FROM pg_policies 
    WHERE schemaname = 'public'
    ORDER BY tablename, policyname;
  `;

  console.log('\n--- TABLES RLS STATUS ---');
  for (const t of tables) {
    console.log(`Table: ${t.tablename.padEnd(26)} | RLS Enabled: ${t.rowsecurity}`);
  }

  console.log(`\nTotal public tables: ${tables.length}`);
  console.log(`Total policies found: ${policies.length}`);

  if (policies.length > 0) {
    console.log('\n--- EXISTING POLICIES ---');
    for (const p of policies) {
      console.log(`Table: ${p.tablename} | Policy: ${p.policyname} | Cmd: ${p.cmd} | Roles: ${p.roles}`);
      console.log(`  USING: ${p.using_expr}`);
      console.log(`  CHECK: ${p.check_expr}`);
    }
  }

  await client.end();
}

inspectRLS().catch(console.error);
