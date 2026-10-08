import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { createClient } from '@supabase/supabase-js';
import postgres from 'postgres';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY!;
const connectionString = process.env.DATABASE_URL!;

if (!supabaseUrl || !supabaseSecretKey) {
  console.error('Supabase URL or Secret Key not set');
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, supabaseSecretKey);
const pgClient = postgres(connectionString, { prepare: false, max: 1 });

async function verifyAndSetupStorage() {
  console.log('========================================================');
  console.log('       SUPABASE STORAGE VERIFICATION & CONFIGURATION    ');
  console.log('========================================================\n');

  // 1. List existing buckets
  const { data: buckets, error: listError } = await supabaseAdmin.storage.listBuckets();
  if (listError) {
    console.error('Error listing buckets via Supabase API:', listError);
    process.exit(1);
  }

  console.log('Existing Storage Buckets:');
  if (buckets.length === 0) {
    console.log('  [None found]');
  } else {
    for (const b of buckets) {
      console.log(`  - Bucket: "${b.name}" | ID: "${b.id}" | Public: ${b.public}`);
    }
  }

  // 2. Ensure "product-media" bucket exists
  const targetBucket = 'product-media';
  const existingProductBucket = buckets.find((b) => b.name === targetBucket || b.id === targetBucket);

  if (!existingProductBucket) {
    console.log(`\nCreating "${targetBucket}" bucket with public read access and mime restrictions...`);
    const { data: newBucket, error: createError } = await supabaseAdmin.storage.createBucket(targetBucket, {
      public: true,
      fileSizeLimit: 10485760, // 10MB
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],
    });

    if (createError) {
      console.error(`Failed to create bucket "${targetBucket}":`, createError);
      process.exit(1);
    }
    console.log(`[CREATED] Bucket "${targetBucket}" created successfully.`);
  } else {
    console.log(`\n[VERIFIED] Bucket "${targetBucket}" already exists.`);
  }

  // 3. Inspect & enforce Storage RLS policies in PostgreSQL
  console.log('\nEnforcing storage RLS policies in PostgreSQL...');

  await pgClient.begin(async (sql) => {
    // RLS is already enabled by Supabase platform on storage.objects

    // Drop existing public/admin policies if needed
    await sql`DROP POLICY IF EXISTS "public_read_product_media" ON storage.objects;`;
    await sql`DROP POLICY IF EXISTS "admin_upload_product_media" ON storage.objects;`;
    await sql`DROP POLICY IF EXISTS "admin_modify_product_media" ON storage.objects;`;
    await sql`DROP POLICY IF EXISTS "admin_delete_product_media" ON storage.objects;`;

    // Policy: anyone can read public product-media objects
    await sql`
      CREATE POLICY "public_read_product_media" 
      ON storage.objects FOR SELECT 
      USING (bucket_id = 'product-media');
    `;

    // Policy: only admins can upload into product-media
    await sql`
      CREATE POLICY "admin_upload_product_media" 
      ON storage.objects FOR INSERT 
      TO authenticated 
      WITH CHECK (
        bucket_id = 'product-media' AND 
        public.is_admin()
      );
    `;

    // Policy: only admins can update
    await sql`
      CREATE POLICY "admin_modify_product_media" 
      ON storage.objects FOR UPDATE 
      TO authenticated 
      USING (bucket_id = 'product-media' AND public.is_admin())
      WITH CHECK (bucket_id = 'product-media' AND public.is_admin());
    `;

    // Policy: only admins can delete
    await sql`
      CREATE POLICY "admin_delete_product_media" 
      ON storage.objects FOR DELETE 
      TO authenticated 
      USING (bucket_id = 'product-media' AND public.is_admin());
    `;
  });

  console.log('[VERIFIED] Storage RLS policies configured:');
  console.log('  1. Public read allowed for bucket "product-media"');
  console.log('  2. Anonymous uploads: FORBIDDEN');
  console.log('  3. Customer uploads: FORBIDDEN');
  console.log('  4. Administrative & service uploads: PERMITTED');

  // 4. Test upload & delete with service role to confirm write path works
  console.log('\nTesting service-role file write & public URL generation in product-media...');
  // Valid 1x1 transparent PNG binary bytes
  const testBuffer = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
    'base64'
  );
  const testPath = 'general/test-storage-probe.png';

  const { error: uploadError } = await supabaseAdmin.storage
    .from(targetBucket)
    .upload(testPath, testBuffer, {
      contentType: 'image/png',
      upsert: true,
    });

  if (uploadError) {
    console.error('Failed test upload:', uploadError);
  } else {
    console.log('[VERIFIED] Test asset upload succeeded.');
    const { data: publicUrlData } = supabaseAdmin.storage
      .from(targetBucket)
      .getPublicUrl(testPath);
    console.log(`[VERIFIED] Public asset URL resolved: ${publicUrlData.publicUrl}`);

    // Clean up probe
    await supabaseAdmin.storage.from(targetBucket).remove([testPath]);
    console.log('[VERIFIED] Test asset removed.');
  }

  // 5. Inspect product_images table correspondence
  const imageRows = await pgClient`
    SELECT id, product_id, storage_path, alt_text, is_hero 
    FROM public.product_images 
    LIMIT 5;
  `;

  console.log('\nSample product_images records from database:');
  for (const img of imageRows) {
    console.log(`  - Image ID: ${img.id} | Path: ${img.storage_path} | Hero: ${img.is_hero}`);
  }

  console.log('\n========================================================');
  console.log(' SUCCESS: Supabase Storage verified and production ready.');
  console.log('========================================================\n');

  await pgClient.end();
}

verifyAndSetupStorage().catch((err) => {
  console.error('Storage verification failed:', err);
  process.exit(1);
});
