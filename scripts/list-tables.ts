import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function listTables() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error('DATABASE_URL is not set');
    process.exit(1);
  }

  const client = postgres(connectionString, { prepare: false });
  try {
    const result = await client`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`;
    console.log('Tables in public schema:', result.map(r => r.table_name));
    process.exit(0);
  } catch (err) {
    console.error('Failed to list tables:', err);
    process.exit(1);
  }
}

listTables();
