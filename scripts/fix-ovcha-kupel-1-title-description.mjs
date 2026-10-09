/**
 * One-off patch for the Ovcha Kupel listing (NK-1053): removes the "1" index
 * from the title and descriptions (BG + EN), so they say "Овча купел" /
 * "Ovcha Kupel" to match the neighborhood field. Slug is left unchanged so
 * existing links (and running ads) keep working.
 * Usage: SANITY_API_WRITE_TOKEN=<token> node scripts/fix-ovcha-kupel-1-title-description.mjs
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

const listing = await client.fetch(
  `*[_type == "listing" && code == "NK-1053"][0]{ _id, title, titleEn, description, descriptionEn }`
)
if (!listing) {
  console.error('❌  Listing NK-1053 not found.')
  process.exit(1)
}

const fix = (text) => text?.replace(/Овча купел 1/g, 'Овча купел').replace(/Ovcha Kupel 1/g, 'Ovcha Kupel')
const updates = {}
for (const field of ['title', 'titleEn', 'description', 'descriptionEn']) {
  const fixed = fix(listing[field])
  if (fixed !== listing[field]) updates[field] = fixed
}

if (Object.keys(updates).length === 0) {
  console.log('Nothing to change.')
  process.exit(0)
}

await client.patch(listing._id).set(updates).commit()
console.log(`✅ NK-1053 updated fields: ${Object.keys(updates).join(', ')}`)
