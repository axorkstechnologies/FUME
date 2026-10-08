import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import postgres from 'postgres';
import fs from 'fs';
import path from 'path';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('DATABASE_URL is not set');
  process.exit(1);
}

const client = postgres(connectionString, { prepare: false, max: 1 });

async function dumpDatabase(label = 'snapshot') {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupDir = path.resolve('backups');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  const sqlFilePath = path.join(backupDir, `fume_backup_${label}_${timestamp}.sql`);
  const jsonFilePath = path.join(backupDir, `fume_backup_${label}_${timestamp}.json`);

  console.log('====================================================');
  console.log(`     SUPABASE DATABASE EXPORT / DUMP [${label.toUpperCase()}]    `);
  console.log('====================================================\n');
  console.log(`Target SQL Export:  ${sqlFilePath}`);
  console.log(`Target JSON Export: ${jsonFilePath}\n`);

  // 1. Get all tables in public schema
  const tables = await client`
    SELECT tablename 
    FROM pg_tables 
    WHERE schemaname = 'public' 
    ORDER BY tablename;
  `;

  const fullData: Record<string, any[]> = {};
  let sqlStatements = `-- FUME DATABASE BACKUP [${label.toUpperCase()}]\n-- Generated at: ${new Date().toISOString()}\n-- Schema: public\n\nSET statement_timeout = 0;\nSET client_encoding = 'UTF8';\n\n`;

  console.log('Exporting tables:');

  for (const { tablename } of tables) {
    const rows = await client`SELECT * FROM public.${client(tablename)}`;
    fullData[tablename] = rows;
    console.log(`  - ${tablename.padEnd(26)} : ${rows.length} rows`);

    if (rows.length > 0) {
      sqlStatements += `-- Data for table: public.${tablename} (${rows.length} rows)\n`;
      const columns = Object.keys(rows[0]);
      const colList = columns.map((c) => `"${c}"`).join(', ');

      for (const row of rows) {
        const values = columns
          .map((col) => {
            const val = row[col];
            if (val === null || val === undefined) return 'NULL';
            if (typeof val === 'number' || typeof val === 'bigint') return val;
            if (typeof val === 'boolean') return val ? 'TRUE' : 'FALSE';
            if (val instanceof Date) return `'${val.toISOString()}'::timestamptz`;
            if (typeof val === 'object') return `'${JSON.stringify(val).replace(/'/g, "''")}'::jsonb`;
            return `'${String(val).replace(/'/g, "''")}'`;
          })
          .join(', ');

        sqlStatements += `INSERT INTO public."${tablename}" (${colList}) VALUES (${values}) ON CONFLICT DO NOTHING;\n`;
      }
      sqlStatements += '\n';
    }
  }

  // Write outputs
  fs.writeFileSync(sqlFilePath, sqlStatements, 'utf8');
  fs.writeFileSync(jsonFilePath, JSON.stringify(fullData, null, 2), 'utf8');

  const sqlStat = fs.statSync(sqlFilePath);
  const jsonStat = fs.statSync(jsonFilePath);

  console.log('\n====================================================');
  console.log(' DATABASE BACKUP COMPLETED SUCCESSFULLY');
  console.log(` SQL Dump Size:  ${(sqlStat.size / 1024).toFixed(2)} KB`);
  console.log(` JSON Dump Size: ${(jsonStat.size / 1024).toFixed(2)} KB`);
  console.log(' Location: backups/ (Ignored by Git)');
  console.log('====================================================\n');

  await client.end();
  return { sqlFilePath, jsonFilePath, tableCount: tables.length };
}

dumpDatabase(process.argv[2] || 'pre_cleanup').catch((err) => {
  console.error('Backup failed:', err);
  process.exit(1);
});
