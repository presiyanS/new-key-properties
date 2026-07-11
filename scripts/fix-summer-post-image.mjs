/**
 * Fixes the externalImageUrl on the Summer 2026 market post — it was
 * mistakenly set to a generic (non-Sofia) stock photo. Replaced with a
 * verified Wikimedia Commons photo of the Sofia skyline from NDK.
 * Usage: SANITY_API_WRITE_TOKEN=<token> node scripts/fix-summer-post-image.mjs
 */
import { createClient } from '@sanity/client'

const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_TOKEN
if (!token) { console.error('❌  Missing SANITY_API_WRITE_TOKEN'); process.exit(1) }

const client = createClient({
  projectId: '9gz26s06',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const doc = await client.fetch(`*[_type=="blogPost" && slug.current=="pazarat-na-imoti-sofia-lyato-2026"][0]{_id}`)
if (!doc) { console.error('❌  Post not found'); process.exit(1) }

await client
  .patch(doc._id)
  .set({ externalImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Sofia_skyline.jpg' })
  .commit()

console.log('✅  Updated image on', doc._id)
