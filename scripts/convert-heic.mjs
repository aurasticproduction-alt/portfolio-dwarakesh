/**
 * Run this once: node scripts/convert-heic.mjs
 * It downloads HEIC/ARW files from Supabase storage,
 * converts them to JPG, re-uploads, and updates the DB.
 */

import sharp from 'sharp'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL  = 'https://wwyzktxyczlfkrieeerk.supabase.co'
const ANON_KEY      = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3eXprdHh5Y3psZmtyaWVlZXJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0NzUwMzgsImV4cCI6MjA5OTA1MTAzOH0.5uXOTKTzaFFHtHU7CZ0tPEtpiJcag1GtpeuKXfUmb_s'
// ⚠️  Paste your SERVICE ROLE key below (Project Settings → API → service_role)
const SERVICE_KEY   = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3eXprdHh5Y3psZmtyaWVlZXJrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzQ3NTAzOCwiZXhwIjoyMDk5MDUxMDM4fQ.ai380xT1Pig8Nrdx7FobLJVSQRaKZsA4t6B_33x8HWg'
const BUCKET        = 'gallery'
const BUCKET_URL    = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}`

const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_KEY)
const supabaseAnon  = createClient(SUPABASE_URL, ANON_KEY)

const NON_WEB = /\.(heic|heif|arw|cr2|nef|dng)$/i

async function run() {
  // 1. Fetch all photos with non-web formats
  const { data: photos, error } = await supabaseAnon
    .from('photos')
    .select('id, storage_path')

  if (error) { console.error('DB error:', error.message); process.exit(1) }

  const toConvert = photos.filter(p => NON_WEB.test(p.storage_path))
  console.log(`Found ${toConvert.length} files to convert`)

  for (const photo of toConvert) {
    const originalPath = photo.storage_path
    const newPath      = originalPath.replace(NON_WEB, '.jpg')
    const srcUrl       = `${BUCKET_URL}/${originalPath}`

    console.log(`Converting: ${originalPath} → ${newPath}`)

    try {
      // 2. Download original
      const res = await fetch(srcUrl)
      if (!res.ok) { console.warn(`  ✗ Could not download ${originalPath}`); continue }
      const buffer = Buffer.from(await res.arrayBuffer())

      // 3. Convert to JPG
      const jpgBuffer = await sharp(buffer)
        .rotate()
        .jpeg({ quality: 88 })
        .toBuffer()

      // 4. Upload JPG to storage
      const { error: upErr } = await supabaseAdmin.storage
        .from(BUCKET)
        .upload(newPath, jpgBuffer, {
          contentType: 'image/jpeg',
          upsert: true,
        })

      if (upErr) { console.warn(`  ✗ Upload failed: ${upErr.message}`); continue }

      // 5. Update DB record
      const { error: dbErr } = await supabaseAdmin
        .from('photos')
        .update({ storage_path: newPath })
        .eq('id', photo.id)

      if (dbErr) { console.warn(`  ✗ DB update failed: ${dbErr.message}`); continue }

      console.log(`  ✓ Done: ${newPath}`)
    } catch (err) {
      console.warn(`  ✗ Error processing ${originalPath}:`, err.message)
    }
  }

  console.log('\n✅ Conversion complete! Refresh your gallery.')
}

run()
