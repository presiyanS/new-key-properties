/**
 * Unpublishes the Borovo two-room rental listing (NK-1028) — takes it off the live site
 * while keeping it as a draft in Studio (content, images and code preserved) so
 * it can be republished later if needed.
 * Usage: SANITY_API_WRITE_TOKEN=<token> node scripts/unpublish-borovo.mjs
 */

import { createClient } from '@sanity/client'

const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_TOKEN
if (!token) {
  console.error('❌  Missing SANITY_API_WRITE_TOKEN.')
  process.exit(1)
}

const client = createClient({
  projectId: '9gz26s06',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const published = await client.fetch(`*[_type == "listing" && code == "NK-1028"][0]`)
if (!published) {
  console.error('❌  Listing NK-1028 not found (already unpublished or deleted?).')
  process.exit(1)
}

const draftId = `drafts.${published._id}`
const draftDoc = { ...published, _id: draftId }

await client
  .transaction()
  .createIfNotExists(draftDoc)
  .delete(published._id)
  .commit()

console.log(`✅ NK-1028 unpublished — removed from the live site, kept as a draft (${draftId}).`)
console.log('   Find it in /studio under "Имот" if it ever needs to be republished.')
