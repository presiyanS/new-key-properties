/**
 * One-off patch for the Ovcha Kupel 1 listing (NK-1053):
 * updates the neighborhood/district field from "Овча купел 1" to "Овча купел".
 * Usage: SANITY_API_WRITE_TOKEN=<token> node scripts/fix-ovcha-kupel-1-neighborhood.mjs
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

const listing = await client.fetch(`*[_type == "listing" && code == "NK-1053"][0]{ _id, neighborhood }`)
if (!listing) {
  console.error('❌  Listing NK-1053 not found.')
  process.exit(1)
}

await client.patch(listing._id).set({ neighborhood: 'Овча купел' }).commit()
console.log(`✅ NK-1053 neighborhood updated: "${listing.neighborhood}" → "Овча купел"`)
